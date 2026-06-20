import Experience from '../Experience.js'
import * as THREE from 'three'
import Duck from './Duck.js'
import ducksMembers from './ducksMembers.js'

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

        //Ducks that must NOT react to hover (e.g. the giant duck). They show no bubble.
        this.hoverExcluded = ['Papera'];

        this.setModel();
        this.setDucks();
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
        //Raycast only against the ducks; show a popup if one is hit
        this.pointer.x = (event.clientX / this.sizes.width) * 2 - 1;
        this.pointer.y = -(event.clientY / this.sizes.height) * 2 + 1;
        this.raycaster.setFromCamera(this.pointer, this.camera.instance);

        const intersects = this.raycaster.intersectObjects(this.duckColliders, true);
        if(intersects.length > 0){
            const duck = this.getDuckFromObject(intersects[0].object);
            if(duck){
                this.showDuckPopup(duck);
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
        //Show the hovered duck's bubble, hide the others, run each duck's hover wobble,
        //and keep each bubble positioned above its duck.
        const delta = this.time.delta * 0.001; //ms -> seconds
        for(const duck of this.ducks){
            duck.setHovered(duck === this.hoveredDuck);
            duck.update(this.camera.instance, this.sizes, delta);
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

        this.updateParallax();
        this.updateDucks();
    }
}
