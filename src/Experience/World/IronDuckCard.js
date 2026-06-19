import Experience from '../Experience.js'
import * as THREE from 'three'

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

        //Scroll-driven animation progress (0 = start of clip, 1 = end of clip)
        this.scrollTarget = 0;    //where the scroll wants the animation to be
        this.scrollCurrent = 0;   //smoothed value actually applied to the clip
        this.wheelSensitivity = 0.0008;  //how much one wheel notch advances the clip
        this.touchSensitivity = 0.003;   //how much a finger swipe advances the clip
        this.dragSensitivity = 0.004;    //how much dragging the card advances the clip
        this.smoothing = 0.01;    //how fast the clip follows the scroll (0 = slow, 1 = instant)
        this.lastTouchY = null;

        //Drag-on-card state
        this.raycaster = new THREE.Raycaster();
        this.pointer = new THREE.Vector2();
        this.isDragging = false;
        this.lastDragX = null;
        this.pointerDownX = 0;
        this.pointerDownY = 0;

        //Ducks (clickable) — the nodes named after each person in the model
        this.duckNames = ['Arri', 'Davide', 'Fede', 'Fra', 'Henry', 'Lore', 'Lucas', 'Teo', 'Papera'];
        this.ducks = [];
        //Popup content per duck (edit titles/texts here)
        this.duckInfo = {
            Arri:   { title: 'Arri',   text: 'Questa è la papera di Arri!' },
            Davide: { title: 'Davide', text: 'Questa è la papera di Davide!' },
            Fede:   { title: 'Fede',   text: 'Questa è la papera di Fede!' },
            Fra:    { title: 'Fra',    text: 'Questa è la papera di Fra!' },
            Henry:  { title: 'Henry',  text: 'Questa è la papera di Henry!' },
            Lore:   { title: 'Lore',   text: 'Questa è la papera di Lore!' },
            Lucas:  { title: 'Lucas',  text: 'Questa è la papera di Lucas!' },
            Teo:    { title: 'Teo',    text: 'Questa è la papera di Teo!' },
            Papera: { title: 'Papera', text: 'Una papera misteriosa!' }
        }

        //How much bigger than the duck its (invisible) click/hover collider should be
        this.duckColliderPadding = 1.2;

        this.setModel();
        this.setDucks();
        this.setDuckColliders();
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

        this.model.traverse((child) => {
            if(child instanceof THREE.Mesh){
                child.castShadow = true;
                child.receiveShadow = true;
            }
        })
    }

    setDucks(){
        //Find each duck node by name and tag it (and its children) so a raycast hit
        //can be mapped back to the duck name
        for(const name of this.duckNames){
            const duck = this.model.getObjectByName(name);
            if(duck){
                duck.traverse((child) => { child.userData.duckName = name; });
                //Remember the original scale so we can shrink to 0 on hover and restore it
                duck.userData.originalScale = duck.scale.clone();
                duck.userData.hoverFactor = 1;       //current scale multiplier (1 = full, 0 = gone)
                duck.userData.hoverTarget = 1;       //where hoverFactor is heading
                this.ducks.push(duck);
            }
        }
    }

    setDuckColliders(){
        //Build one invisible box per duck that wraps the WHOLE duck, so the raycast hits
        //the full shape instead of just the base mesh. The box is parented to the duck and
        //tagged with the duck name; we raycast against these boxes for hover and click.
        this.duckColliders = [];
        const colliderMaterial = new THREE.MeshBasicMaterial();

        for(const duck of this.ducks){
            //Make sure matrices are current before measuring
            duck.updateWorldMatrix(true, true);
            const invDuck = new THREE.Matrix4().copy(duck.matrixWorld).invert();

            //Union of every child mesh's bounding box, expressed in the duck's LOCAL space
            const box = new THREE.Box3();
            duck.traverse((child) => {
                if(child.isMesh && child.geometry){
                    child.geometry.computeBoundingBox();
                    const childBox = child.geometry.boundingBox.clone();
                    const toLocal = new THREE.Matrix4().multiplyMatrices(invDuck, child.matrixWorld);
                    childBox.applyMatrix4(toLocal);
                    box.union(childBox);
                }
            });
            if(box.isEmpty()) continue;

            const size = box.getSize(new THREE.Vector3());
            const center = box.getCenter(new THREE.Vector3());

            const geometry = new THREE.BoxGeometry(
                size.x * this.duckColliderPadding,
                size.y * this.duckColliderPadding,
                size.z * this.duckColliderPadding
            );
            const collider = new THREE.Mesh(geometry, colliderMaterial);
            collider.visible = false; //invisible, but still hit by the raycaster
            collider.userData.duckName = duck.userData.duckName;
            collider.userData.localCenter = center.clone();
            collider.position.copy(center);

            duck.add(collider);
            duck.userData.collider = collider;
            this.duckColliders.push(collider);
        }
    }

    //Walk up the hierarchy to find which duck (if any) was hit
    getDuckName(object){
        let current = object;
        while(current){
            if(current.userData && current.userData.duckName){
                return current.userData.duckName;
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
        //Mouse wheel: the more you scroll down, the further the animation advances
        window.addEventListener('wheel', (event) => {
            if(!this.canInteract()) return;
            this.scrollTarget = THREE.MathUtils.clamp(
                this.scrollTarget + event.deltaY * this.wheelSensitivity,
                0,
                1
            );
        }, { passive: true });

        //Touch: swiping the finger upwards advances the animation
        window.addEventListener('touchstart', (event) => {
            if(!this.canInteract()) return;
            this.lastTouchY = event.touches[0].clientY;
        }, { passive: true });

        window.addEventListener('touchmove', (event) => {
            if(!this.canInteract()) return;
            if(this.lastTouchY === null) return;
            const currentY = event.touches[0].clientY;
            const deltaY = this.lastTouchY - currentY; //swipe up -> positive -> advances
            this.lastTouchY = currentY;
            this.scrollTarget = THREE.MathUtils.clamp(
                this.scrollTarget + deltaY * this.touchSensitivity,
                0,
                1
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
                1
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
        //Hover smoothing speed (0 = slow, 1 = instant)
        this.hoverSmoothing = 0.15;
        this.hoveredDuckName = null;

        //Track the pointer and figure out which duck (if any) it is over
        window.addEventListener('pointermove', (event) => {
            //Hover only makes sense when the card is out and the ducks are interactive
            if(this.isDragging || !this.canInteract() || !this.camera.freeRotate || this.isPopupOpen()){
                this.hoveredDuckName = null;
                return;
            }

            this.pointer.x = (event.clientX / this.sizes.width) * 2 - 1;
            this.pointer.y = -(event.clientY / this.sizes.height) * 2 + 1;
            this.raycaster.setFromCamera(this.pointer, this.camera.instance);

            const intersects = this.raycaster.intersectObjects(this.duckColliders, true);
            this.hoveredDuckName = intersects.length > 0
                ? this.getDuckName(intersects[0].object)
                : null;
        });
    }

    checkDuckClick(event){
        //Raycast only against the ducks; show a popup if one is hit
        this.pointer.x = (event.clientX / this.sizes.width) * 2 - 1;
        this.pointer.y = -(event.clientY / this.sizes.height) * 2 + 1;
        this.raycaster.setFromCamera(this.pointer, this.camera.instance);

        const intersects = this.raycaster.intersectObjects(this.duckColliders, true);
        if(intersects.length > 0){
            const name = this.getDuckName(intersects[0].object);
            if(name){
                this.showDuckPopup(name);
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

    showDuckPopup(name){
        if(!this.popup || !this.popup.element) return;
        const info = this.duckInfo[name] || {};
        this.popup.title.textContent = info.title || name;
        this.popup.text.textContent = info.text || '';
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
            .add(this, 'duckColliderPadding')
            .min(1).max(3).step(0.05)
            .name('duck collider size')
            .onChange(() => this.rebuildDuckColliders())
    }

    rebuildDuckColliders(){
        //Remove existing colliders, then rebuild them at the new padding
        for(const collider of this.duckColliders){
            if(collider.parent) collider.parent.remove(collider);
            collider.geometry.dispose();
        }
        //Reset hover bookkeeping so freshly built colliders aren't pre-scaled
        for(const duck of this.ducks){
            duck.userData.hoverFactor = 1;
            duck.userData.hoverTarget = 1;
            duck.scale.copy(duck.userData.originalScale);
            duck.userData.collider = null;
        }
        this.setDuckColliders();
    }

    updateDuckHover(){
        //Shrink the hovered duck to 0, let the others grow back to their original scale
        for(const duck of this.ducks){
            duck.userData.hoverTarget = (duck.userData.duckName === this.hoveredDuckName) ? 0 : 1;

            const factor = duck.userData.hoverFactor
                + (duck.userData.hoverTarget - duck.userData.hoverFactor) * this.hoverSmoothing;
            duck.userData.hoverFactor = factor;

            duck.scale.copy(duck.userData.originalScale).multiplyScalar(factor);

            //Keep the invisible collider at a constant world size/position by undoing the
            //hover shrink, so the hover ray still hits even when the duck is nearly gone
            const collider = duck.userData.collider;
            if(collider){
                const inv = 1 / Math.max(factor, 1e-3);
                collider.scale.setScalar(inv);
                collider.position.copy(collider.userData.localCenter).multiplyScalar(inv);
            }
        }
    }

    update(){
        if(!this.animation || !this.animation.action) return;

        //Smoothly approach the scroll target for a fluid feel
        this.scrollCurrent += (this.scrollTarget - this.scrollCurrent) * this.smoothing;

        //Map the scroll progress to a position in time inside the clip and apply it
        this.animation.action.time = this.scrollCurrent * this.animation.duration;
        this.animation.mixer.update(0);

        this.updateDuckHover();
    }
}
