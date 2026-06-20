import Experience from '../Experience.js'
import * as THREE from 'three'
import gsap from 'gsap'
import Duck from './Duck.js'
import ducksMembers from '../ducksMembers.js'

export default class IronDuckCard{
    constructor(){
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        this.time = this.experience.time;
        this.debug = this.experience.debug;
        this.sizes = this.experience.sizes;
        this.camera = this.experience.camera;

        //setup
        this.resource = this.resources.items.ironDuckCardModel;

        //Scroll-driven progress. [0 -> 1] plays the card extraction (the camera reaches its
        //overview here); [1 -> scrollMax] keeps scrolling to bring the camera to its final framing.
        this.scrollTarget = 0;    //where the scroll wants to be
        this.scrollCurrent = 0;   //smoothed value actually applied
        this.scrollMax = 1.5;     //total scroll range (1 = card out, the rest = camera approach)
        this.wheelSensitivity = 0.0006;  //how much one wheel notch advances the scroll
        this.touchSensitivity = 0.003;   //how much a finger swipe advances the scroll
        this.dragSensitivity = 0.004;    //how much dragging the card advances the scroll
        this.smoothing = 0.01;    //how fast it follows the scroll (0 = slow, 1 = instant)
        this.lastTouchY = null;

        //Parallax: the card eases a little toward the mouse (top-right, bottom-left, ...)
        this.parallaxEnabled = true;
        this.parallaxAmount = 0.015;  //max tilt in radians
        this.parallaxEasing = 0.01;   //how fast it follows the mouse (0 = slow, 1 = instant)
        this.parallaxCurrentX = 0;    //smoothed mouse x actually applied
        this.parallaxCurrentY = 0;    //smoothed mouse y actually applied

        //Drag / raycast state
        this.raycaster = new THREE.Raycaster();
        this.pointer = new THREE.Vector2();
        this.isDragging = false;
        this.lastDragX = null;
        this.pointerDownX = 0;
        this.pointerDownY = 0;

        //Ducks
        this.members = ducksMembers;   //per-duck data (name, description, link, imagePath)
        this.ducks = [];               //Duck instances
        this.duckColliders = [];       //their invisible colliders, for raycasting
        this.hoveredDuck = null;       //the Duck currently under the pointer (or null)

        //How much bigger than the duck its (invisible) collider should be
        this.duckColliderPadding = 1.2;

        //Ducks that must NOT react to hover (e.g. the giant duck).
        this.hoverExcluded = ['Papera'];

        //Selection: clicking a duck shrinks it away and grows the "Cartello" sign in its place,
        //while the camera zooms in and focuses on it. All eased over selectDuration seconds.
        this.selectedDuck = null;
        this.selectDuration = 0.5;  //seconds for the whole select animation
        this.cartelloScale = 1;     //scale the Cartello grows to
        this._tmpVec = new THREE.Vector3();
        this._focusVec = new THREE.Vector3();

        this.setModel();
        this.setDucks();
        this.setCartello();
        this.setAnimation();
        this.setScrollControl();
        this.setDragControl();
        this.setHoverControl();
        this.setPopup();
        this.setDebug();
    }

    setModel(){
        this.model = this.resource.scene;
        this.scene.add(this.model);

        //Base rotation we add the parallax tilt on top of (the root isn't animated)
        this.modelBaseRotation = this.model.rotation.clone();

        this.model.traverse((child) => {
            if(child instanceof THREE.Mesh){
                child.castShadow = true;
                child.receiveShadow = true;
            }
        })
    }

    setDucks(){
        //Build a Duck per member (it wires its collider, emissive look and hover bubble)
        for(const member of this.members){
            const node = this.model.getObjectByName(member.node);
            if(!node) continue;
            const duck = new Duck(node, {
                member,
                hoverable: !this.hoverExcluded.includes(member.node),
                colliderPadding: this.duckColliderPadding
            });
            this.ducks.push(duck);
        }
        this.refreshColliderList();
    }

    refreshColliderList(){
        this.duckColliders = this.ducks.map((duck) => duck.collider).filter(Boolean);
    }

    //Walk up the hierarchy to find which Duck (if any) was hit
    getDuckFromObject(object){
        let current = object;
        while(current){
            if(current.userData && current.userData.duck){
                return current.userData.duck;
            }
            current = current.parent;
        }
        return null;
    }

    setCartello(){
        //The sign that replaces a duck when it's clicked. One shared instance, hidden until used.
        this.cartello = this.resources.items.cartelloModel.scene;
        this.cartello.scale.set(0, 0, 0);
        this.cartello.visible = false;
        this.scene.add(this.cartello);

        this.setCartelloText();
    }

    setCartelloText(){
        //Build a canvas-texture text plane and stick it on the sign's front face, so the clicked
        //duck's name shows up on the Cartello.
        this.cartelloTextColor = '#000000';

        const canvas = document.createElement('canvas');
        canvas.width = 512;
        canvas.height = 256;
        this.cartelloCanvas = canvas;
        this.cartelloCtx = canvas.getContext('2d');
        this.cartelloTexture = new THREE.CanvasTexture(canvas);
        this.cartelloTexture.encoding = THREE.sRGBEncoding;

        //Find the board mesh and measure it to place/scale the text on its front face
        let board = null;
        this.cartello.traverse((child) => { if(child.isMesh && !board) board = child; });
        if(!board) return;

        board.geometry.computeBoundingBox();
        const box = board.geometry.boundingBox;
        const size = box.getSize(new THREE.Vector3());
        const center = box.getCenter(new THREE.Vector3());

        //Depth = thinnest axis; the text sits on the +face of that axis
        const planeMat = new THREE.MeshBasicMaterial({ map: this.cartelloTexture, transparent: true });
        let planeW, planeH;
        const mesh = (w, h) => new THREE.Mesh(new THREE.PlaneGeometry(w, h), planeMat);

        if(size.z <= size.x && size.z <= size.y){
            planeW = size.x * 0.8; planeH = size.y * 0.5;
            this.cartelloTextMesh = mesh(planeW, planeH);
            this.cartelloTextMesh.position.set(center.x, center.y, box.max.z + 0.01);
        } else if(size.x <= size.y && size.x <= size.z){
            planeW = size.z * 0.8; planeH = size.y * 0.5;
            this.cartelloTextMesh = mesh(planeW, planeH);
            this.cartelloTextMesh.position.set(box.max.x + 0.01, center.y, center.z);
            this.cartelloTextMesh.rotation.y = Math.PI * 0.5;
        } else {
            planeW = size.x * 0.8; planeH = size.z * 0.5;
            this.cartelloTextMesh = mesh(planeW, planeH);
            this.cartelloTextMesh.position.set(center.x, box.max.y + 0.01, center.z);
            this.cartelloTextMesh.rotation.x = -Math.PI * 0.5;
        }

        board.add(this.cartelloTextMesh);
    }

    drawCartelloText(name){
        if(!this.cartelloCtx) return;
        const ctx = this.cartelloCtx;
        const { width, height } = this.cartelloCanvas;
        ctx.clearRect(0, 0, width, height);
        ctx.fillStyle = this.cartelloTextColor;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.font = 'bold 120px sans-serif';
        ctx.fillText(name || '', width / 2, height / 2);
        this.cartelloTexture.needsUpdate = true;
    }

    selectDuck(duck){
        if(this.selectedDuck === duck) return;
        const dur = this.selectDuration;

        //Restore a previously selected duck (if any) back to its size
        if(this.selectedDuck){
            const prev = this.selectedDuck;
            gsap.to(prev.object.scale, { duration: dur, x: prev.originalScale.x, y: prev.originalScale.y, z: prev.originalScale.z });
        }

        this.selectedDuck = duck;

        //The duck shrinks away
        gsap.to(duck.object.scale, { duration: dur, x: 0, y: 0, z: 0, ease: 'power2.inOut' });

        //The Cartello appears in its place (at the duck's position) with zero rotation,
        //growing from 0 to its scale, showing the duck's name
        this.drawCartelloText((duck.member && duck.member.name) || duck.name);
        duck.object.getWorldPosition(this._tmpVec);
        this.cartello.position.copy(this._tmpVec);
        this.cartello.rotation.set(0, 0, 0);
        this.cartello.visible = true;
        gsap.killTweensOf(this.cartello.scale);
        this.cartello.scale.set(0, 0, 0);
        gsap.to(this.cartello.scale, { duration: dur, x: this.cartelloScale, y: this.cartelloScale, z: this.cartelloScale, ease: 'power2.inOut' });

        //The camera zooms in and focuses on the Cartello
        duck.getFocusPoint(this._focusVec);
        this.camera.focusOnPoint(this._focusVec, dur);
    }

    deselectDuck(easeCamera = true){
        //Restore the selected duck, shrink the Cartello away, and bring the camera back.
        //easeCamera = true lerps the camera to the previous framing (click outside the Cartello);
        //easeCamera = false releases it immediately (the card is being scrolled back in).
        if(!this.selectedDuck) return;
        const dur = this.selectDuration;
        const prev = this.selectedDuck;
        this.selectedDuck = null;

        gsap.to(prev.object.scale, { duration: dur, x: prev.originalScale.x, y: prev.originalScale.y, z: prev.originalScale.z });
        gsap.killTweensOf(this.cartello.scale);
        gsap.to(this.cartello.scale, {
            duration: dur, x: 0, y: 0, z: 0,
            onComplete: () => { this.cartello.visible = false; }
        });

        if(easeCamera){
            this.camera.returnToFraming(dur);
        } else {
            this.camera.clearSelectionFocus();
        }
    }

    setAnimation(){
        //Log how many animations the model contains (expected: 1)
        console.log("IronDuckCard animations length:", this.resource.animations.length);

        this.animation = {};
        this.animation.mixer = new THREE.AnimationMixer(this.model);

        if(this.resource.animations.length > 0){
            this.animation.clip = this.resource.animations[0];
            this.animation.duration = this.animation.clip.duration;

            //Activate the action but freeze it: we drive its time manually with the scroll
            this.animation.action = this.animation.mixer.clipAction(this.animation.clip);
            this.animation.action.play();
            this.animation.action.paused = true;
        }
    }

    //Input is only allowed once the intro camera flight is over
    canInteract(){
        return this.camera && this.camera.followScroll;
    }

    setScrollControl(){
        //Mouse wheel drives the whole journey both ways: scroll down advances it, scroll up
        //(even once arrived) plays it back in reverse.
        window.addEventListener('wheel', (event) => {
            if(!this.canInteract()) return;
            this.scrollTarget = THREE.MathUtils.clamp(
                this.scrollTarget + event.deltaY * this.wheelSensitivity,
                0,
                this.scrollMax
            );
        }, { passive: true });

        //Touch: swiping the finger upwards advances the animation
        window.addEventListener('touchstart', (event) => {
            if(!this.canInteract()) return;
            this.lastTouchY = event.touches[0].clientY;
        }, { passive: true });

        window.addEventListener('touchmove', (event) => {
            if(!this.canInteract()) return;
            if(this.camera.freeRotate) return; //card out: gestures rotate/zoom the camera instead
            if(this.lastTouchY === null) return;
            const currentY = event.touches[0].clientY;
            const deltaY = this.lastTouchY - currentY; //swipe up -> positive -> advances
            this.lastTouchY = currentY;
            this.scrollTarget = THREE.MathUtils.clamp(
                this.scrollTarget + deltaY * this.touchSensitivity,
                0,
                this.scrollMax
            );
        }, { passive: true });

        window.addEventListener('touchend', () => {
            this.lastTouchY = null;
        }, { passive: true });
    }

    setDragControl(){
        //Press on the card and drag left to pull it out, drag right to push it back in
        window.addEventListener('pointerdown', (event) => {
            if(!this.canInteract()) return;
            this.pointerDownX = event.clientX;
            this.pointerDownY = event.clientY;

            //When the card is out, dragging rotates the camera (OrbitControls), not the scrub
            if(this.camera.freeRotate) return;

            //Normalized device coordinates of the pointer
            this.pointer.x = (event.clientX / this.sizes.width) * 2 - 1;
            this.pointer.y = -(event.clientY / this.sizes.height) * 2 + 1;

            //Only start dragging if the pointer is actually over the card
            this.raycaster.setFromCamera(this.pointer, this.camera.instance);
            const intersects = this.raycaster.intersectObject(this.model, true);
            if(intersects.length > 0){
                this.isDragging = true;
                this.lastDragX = event.clientX;
            }
        });

        window.addEventListener('pointermove', (event) => {
            if(!this.isDragging) return;
            const deltaX = this.lastDragX - event.clientX; //drag left -> positive -> pulls the card out
            this.lastDragX = event.clientX;
            this.scrollTarget = THREE.MathUtils.clamp(
                this.scrollTarget + deltaX * this.dragSensitivity,
                0,
                this.scrollMax
            );
        });

        const onPointerUp = (event) => {
            //If the pointer barely moved it counts as a click: check for a duck
            const moved = Math.abs(event.clientX - this.pointerDownX) + Math.abs(event.clientY - this.pointerDownY);
            const isClick = moved < 6;
            if(isClick && this.canInteract() && this.camera.freeRotate && !this.isPopupOpen()){
                this.checkDuckClick(event);
            }
            this.isDragging = false;
            this.lastDragX = null;
        }
        window.addEventListener('pointerup', onPointerUp);
        window.addEventListener('pointercancel', () => {
            this.isDragging = false;
            this.lastDragX = null;
        });
    }

    setHoverControl(){
        //Track the pointer and figure out which duck (if any) it is over
        window.addEventListener('pointermove', (event) => {
            //Hover only makes sense when the card is out and the ducks are interactive
            if(this.isDragging || !this.canInteract() || !this.camera.freeRotate || this.isPopupOpen()){
                this.hoveredDuck = null;
                return;
            }

            this.pointer.x = (event.clientX / this.sizes.width) * 2 - 1;
            this.pointer.y = -(event.clientY / this.sizes.height) * 2 + 1;
            this.raycaster.setFromCamera(this.pointer, this.camera.instance);

            const intersects = this.raycaster.intersectObjects(this.duckColliders, true);
            const duck = intersects.length > 0 ? this.getDuckFromObject(intersects[0].object) : null;
            //Only hoverable ducks trigger the bubble (the giant duck does nothing)
            this.hoveredDuck = (duck && duck.hoverable) ? duck : null;
        });
    }

    checkDuckClick(event){
        this.pointer.x = (event.clientX / this.sizes.width) * 2 - 1;
        this.pointer.y = -(event.clientY / this.sizes.height) * 2 + 1;
        this.raycaster.setFromCamera(this.pointer, this.camera.instance);

        //If a Cartello is shown, clicking anywhere OFF it returns to the previous situation
        if(this.selectedDuck){
            const onCartello = this.cartello.visible &&
                this.raycaster.intersectObject(this.cartello, true).length > 0;
            if(!onCartello){
                this.deselectDuck();
            }
            return;
        }

        //Otherwise, selecting a duck swaps it for the Cartello and focuses the camera
        const intersects = this.raycaster.intersectObjects(this.duckColliders, true);
        if(intersects.length > 0){
            const duck = this.getDuckFromObject(intersects[0].object);
            if(duck){
                this.selectDuck(duck);
            }
        }
    }

    setPopup(){
        this.popup = {};
        this.popup.element = document.getElementById('duckPopup');
        this.popup.title = document.getElementById('duckPopupTitle');
        this.popup.text = document.getElementById('duckPopupText');
        this.popup.close = document.getElementById('duckPopupClose');

        if(this.popup.close){
            this.popup.close.addEventListener('click', () => this.hideDuckPopup());
        }
        if(this.popup.element){
            //Click on the dark backdrop (outside the card) closes the popup
            this.popup.element.addEventListener('click', (event) => {
                if(event.target === this.popup.element){
                    this.hideDuckPopup();
                }
            });
        }
    }

    isPopupOpen(){
        return this.popup && this.popup.element && this.popup.element.classList.contains('visible');
    }

    showDuckPopup(duck){
        if(!this.popup || !this.popup.element) return;
        const member = duck.member || {};
        this.popup.title.textContent = member.name || duck.name;
        this.popup.text.textContent = member.description || '';
        this.popup.element.classList.add('visible');
    }

    hideDuckPopup(){
        if(!this.popup || !this.popup.element) return;
        this.popup.element.classList.remove('visible');
    }

    setDebug(){
        if(!this.debug.active) return;

        this.debugFolder = this.debug.ui.addFolder('IronDuckCard - scroll');
        this.debugFolder
            .add(this, 'wheelSensitivity')
            .min(0).max(0.01).step(0.0001)
            .name('wheel speed')
        this.debugFolder
            .add(this, 'touchSensitivity')
            .min(0).max(0.02).step(0.0001)
            .name('touch speed')
        this.debugFolder
            .add(this, 'dragSensitivity')
            .min(0).max(0.02).step(0.0001)
            .name('drag speed')
        this.debugFolder
            .add(this, 'smoothing')
            .min(0.01).max(1).step(0.01)
            .name('smoothing')
        this.debugFolder
            .add(this, 'scrollMax')
            .min(1).max(3).step(0.05)
            .name('scroll max (phase 2)')
        this.debugFolder
            .add(this, 'duckColliderPadding')
            .min(1).max(3).step(0.05)
            .name('duck collider size')
            .onChange(() => this.rebuildDuckColliders())

        //Parallax
        this.debugFolder.add(this, 'parallaxEnabled').name('parallax on')
        this.debugFolder
            .add(this, 'parallaxAmount')
            .min(0).max(0.4).step(0.005)
            .name('parallax amount')
        this.debugFolder
            .add(this, 'parallaxEasing')
            .min(0.01).max(0.3).step(0.005)
            .name('parallax easing')

        //Selection (duck -> Cartello)
        this.debugFolder
            .add(this, 'selectDuration')
            .min(0.1).max(3).step(0.05)
            .name('select duration (s)')
        this.debugFolder
            .add(this, 'cartelloScale')
            .min(0.1).max(5).step(0.1)
            .name('cartello scale')
    }

    rebuildDuckColliders(){
        //Rebuild every duck's collider at the new padding
        for(const duck of this.ducks){
            duck.rebuildCollider(this.duckColliderPadding);
        }
        this.refreshColliderList();
    }

    updateParallax(){
        //Tilt the whole card a little toward the mouse position (eased), for a parallax feel
        if(!this.parallaxEnabled || !this.model || !this.modelBaseRotation) return;
        if(!this.canInteract()) return; //only after the intro

        const mouse = this.sizes.mouse; //x,y in [-1, 1], y up
        this.parallaxCurrentX += (mouse.x - this.parallaxCurrentX) * this.parallaxEasing;
        this.parallaxCurrentY += (mouse.y - this.parallaxCurrentY) * this.parallaxEasing;

        //mouse x -> tilt around Y, mouse y -> tilt around X
        this.model.rotation.y = this.modelBaseRotation.y + this.parallaxCurrentX * this.parallaxAmount;
        this.model.rotation.x = this.modelBaseRotation.x - this.parallaxCurrentY * this.parallaxAmount;
    }

    updateDucks(){
        //Drive each duck's hover state and wobble. A selected duck stops reacting to hover.
        const delta = this.time.delta * 0.001; //ms -> seconds
        for(const duck of this.ducks){
            duck.setHovered(duck === this.hoveredDuck && duck !== this.selectedDuck);
            duck.update(delta);
        }
    }

    update(){
        if(!this.animation || !this.animation.action) return;

        //Smoothly approach the scroll target for a fluid feel
        this.scrollCurrent += (this.scrollTarget - this.scrollCurrent) * this.smoothing;

        //Only the first scroll unit [0 -> 1] drives the clip; beyond that the card stays out
        //(the extra scroll range carries the camera to its final framing).
        const clipProgress = Math.min(this.scrollCurrent, 1);
        this.animation.action.time = clipProgress * this.animation.duration;
        this.animation.mixer.update(0);

        //If the card is being scrolled back in, drop any active selection (camera handled by scroll)
        if(this.selectedDuck && !this.camera.freeRotate){
            this.deselectDuck(false);
        }

        this.updateParallax();
        this.updateDucks();
    }
}
