import Experience from '../Experience.js'
import * as THREE from 'three'
import Duck from './Duck.js'

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

        //Drag / raycast state
        this.raycaster = new THREE.Raycaster();
        this.pointer = new THREE.Vector2();
        this.isDragging = false;
        this.lastDragX = null;
        this.pointerDownX = 0;
        this.pointerDownY = 0;

        //Ducks — the nodes named after each person in the model
        this.duckNames = ['Arri', 'Davide', 'Fede', 'Fra', 'Henry', 'Lore', 'Lucas', 'Teo', 'Papera'];
        this.ducks = [];            //Duck instances
        this.duckColliders = [];    //their invisible colliders, for raycasting
        this.hoveredDuck = null;    //the Duck currently under the pointer (or null)

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

        //How much bigger than the duck its (invisible) collider should be
        this.duckColliderPadding = 1.2;

        //Ducks that must NOT react to hover (e.g. the giant duck). They stay full size.
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

        this.model.traverse((child) => {
            if(child instanceof THREE.Mesh){
                child.castShadow = true;
                child.receiveShadow = true;
            }
        })
    }

    setDucks(){
        //Wrap each duck node in a Duck instance (which builds its collider, emissive look, etc.)
        for(const name of this.duckNames){
            const node = this.model.getObjectByName(name);
            if(!node) continue;
            const duck = new Duck(node, {
                info: this.duckInfo[name],
                hoverable: !this.hoverExcluded.includes(name),
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
            //Only hoverable ducks trigger the effect (the giant duck does nothing)
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
        const info = duck.info || {};
        this.popup.title.textContent = info.title || duck.name;
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
        //Rebuild every duck's collider at the new padding
        for(const duck of this.ducks){
            duck.rebuildCollider(this.duckColliderPadding);
        }
        this.refreshColliderList();
    }

    updateDuckHover(){
        //The hovered duck shrinks to 0, every other duck stays at full size.
        //With nothing hovered, they all sit at 1. Excluded ducks never change.
        for(const duck of this.ducks){
            if(!duck.hoverable){
                duck.hoverTarget = 1;
            } else {
                duck.hoverTarget = (duck === this.hoveredDuck) ? 0 : 1;
            }
            duck.update(this.hoverSmoothing);
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
