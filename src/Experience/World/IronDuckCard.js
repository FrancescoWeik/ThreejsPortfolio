import Experience from '../Experience.js'
import * as THREE from 'three'
import gsap from 'gsap'
import Duck from './Duck.js'
import ducksMembers from '../ducksMembers.js'
import projects from '../projects.js'

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

        //Selection: clicking a duck folds every OTHER duck back down to its start pose;
        //clicking away stands them all back up.
        this.selectedDuck = null;

        //Projects sequence: clicking the Projects sign blocks interactions, slides the card back
        //into its container (the intro extraction reversed) and spins the whole card 360°.
        this.projectsSequenceActive = false;
        this.spinAngle = 0;            //extra X rotation of the card (driven by the spin)
        this.retractDuration = 2;      //seconds: card slides back in
        this.spinDuration = 1.2;       //seconds: full 360° spin

        //Projects sign, placed local to the card so it follows the extraction
        this.projectsPosition = new THREE.Vector3(3, 0.1, -1.5);
        this.projectsScale = 1;

        this.setModel();
        this.setDucks();
        this.setProjects();
        this.setProjectPanel();
        this.setAnimation();
        this.setScrollControl();
        this.setDragControl();
        this.setHoverControl();
        this.setInfoPanel();
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

    setProjects(){
        //The "Projects" sign sits on a corner of the card. Parent it to FullBiglietto so it moves
        //with the card extraction (and the flip). Clicking it flips the card to show the back.
        this.projects = this.resources.items.projectsModel.scene;
        this.projects.position.copy(this.projectsPosition);
        this.projects.scale.setScalar(this.projectsScale);

        const parent = this.model.getObjectByName('FullBiglietto') || this.model;
        parent.add(this.projects);
    }

    playProjectsSequence(){
        //Clicking the Projects sign: block interactions, slide the card back into its container
        //(reverse extraction, the camera follows the scroll spline back), then spin it 360°.
        if(this.projectsSequenceActive) return;
        this.projectsSequenceActive = true;
        this.deselectDuck();

        //Start the card retract from the card-out point (the clip is identical at 1 and scrollMax,
        //so this is invisible) and drive it to 0 over retractDuration. The camera is moved by its
        //OWN eased tween (the spline is suspended while the sequence plays), so it glides smoothly
        //alongside the card with no snap.
        this.scrollCurrent = Math.min(this.scrollCurrent, 1);
        this.scrollTarget = this.scrollCurrent;
        this.camera.controls.enableRotate = false;

        const cam = this.camera.instance;
        const tgt = this.camera.controls.target;
        const startPos = this.camera.scrollStartPos;
        const startTarget = this.camera.scrollStartTarget;
        const dur = this.retractDuration;
        const ease = 'power1.inOut';

        let halfSpinDone = false;
        const tl = gsap.timeline({
            onComplete: () => {
                this.spinAngle = 0;                 //360° == back to start; reset for next time
                this.projectsSequenceActive = false; //(for now) re-enable; future changes go here
            }
        });

        //Card slides back in (clip), camera glides to the start framing — together, same timing
        tl.to(this, { scrollCurrent: 0, duration: dur, ease, onUpdate: () => { this.scrollTarget = this.scrollCurrent; } }, 0);
        tl.to(cam.position, { x: startPos.x, y: startPos.y, z: startPos.z, duration: dur, ease }, 0);
        tl.to(tgt, { x: startTarget.x, y: startTarget.y, z: startTarget.z, duration: dur, ease }, 0);

        //Then a full 360° spin; fire the half-spin hook once it reaches 180°
        tl.to(this, {
            spinAngle: Math.PI * 2,
            duration: this.spinDuration,
            ease: 'power2.inOut',
            onUpdate: () => {
                if(!halfSpinDone && this.spinAngle >= Math.PI){
                    halfSpinDone = true;
                    this.onSpinHalfway();
                }
            }
        }, '>');
    }

    onSpinHalfway(){
        //Half-way through the 360° spin (card rotated 180°): show the project panel, hide Papera.
        if(this.projectPanel) this.projectPanel.visible = true;
        if(this.paperaObject) this.paperaObject.visible = false;
    }

    setProjectPanel(){
        //The card has a hidden "ProjectImageContainer" panel (on its back) and a "Papera" object.
        //The panel starts off; at the 180° point of the spin it turns on and Papera turns off.
        //For now we just put the first project's image on the panel (unlit).
        this.projectPanel = this.model.getObjectByName('ProjectImageContainer');
        this.paperaObject = this.model.getObjectByName('Papera');

        if(this.projectPanel){
            this.projectPanel.visible = false; //off until the spin reaches 180°

            const first = projects[0];
            const texture = first && this.resources.items[`projectImage_${first.node}`];
            if(texture){
                texture.flipY = false;             //glTF UVs have their origin at the top
                texture.encoding = THREE.sRGBEncoding;
                texture.needsUpdate = true;
                const material = new THREE.MeshBasicMaterial({ map: texture });
                this.projectPanel.traverse((child) => {
                    if(child.isMesh) child.material = material;
                });
            }
        }
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

    selectDuck(duck){
        //The clicked duck stays up; every OTHER (small) duck folds back down to its start pose.
        //The giant duck (not hoverable) never folds.
        if(this.selectedDuck === duck) return;
        this.selectedDuck = duck;
        for(const other of this.ducks){
            if(!other.hoverable) continue;
            other.setFolded(other !== duck);
        }
        this.showInfoPanel(duck.member);
    }

    deselectDuck(){
        //Stand every (small) duck back up and close the info panel
        if(!this.selectedDuck) return;
        this.selectedDuck = null;
        for(const other of this.ducks){
            if(!other.hoverable) continue;
            other.setFolded(false);
        }
        this.hideInfoPanel();
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

    //User input is also blocked while the projects sequence is playing
    inputAllowed(){
        return this.canInteract() && !this.projectsSequenceActive;
    }

    setScrollControl(){
        //Mouse wheel drives the whole journey both ways: scroll down advances it, scroll up
        //(even once arrived) plays it back in reverse.
        window.addEventListener('wheel', (event) => {
            if(!this.inputAllowed()) return;
            this.scrollTarget = THREE.MathUtils.clamp(
                this.scrollTarget + event.deltaY * this.wheelSensitivity,
                0,
                this.scrollMax
            );
        }, { passive: true });

        //Touch: swiping the finger upwards advances the animation
        window.addEventListener('touchstart', (event) => {
            if(!this.inputAllowed()) return;
            this.lastTouchY = event.touches[0].clientY;
        }, { passive: true });

        window.addEventListener('touchmove', (event) => {
            if(!this.inputAllowed()) return;
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
            if(!this.inputAllowed()) return;
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
            //Ignore clicks while the projects sequence plays, and clicks on the info panel
            if(isClick && this.inputAllowed() && this.camera.freeRotate && !this.isPanelTarget(event.target)){
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
            if(this.isDragging || !this.inputAllowed() || !this.camera.freeRotate){
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

        //Clicking the Projects sign plays the projects sequence (retract + 360° spin)
        if(this.projects && this.raycaster.intersectObject(this.projects, true).length > 0){
            this.playProjectsSequence();
            return;
        }

        //Clicking a duck selects it (folds the others); clicking off any duck stands them all up
        const intersects = this.raycaster.intersectObjects(this.duckColliders, true);
        const duck = intersects.length > 0 ? this.getDuckFromObject(intersects[0].object) : null;
        if(duck){
            this.selectDuck(duck);
        } else {
            this.deselectDuck();
        }
    }

    setInfoPanel(){
        this.panel = {};
        this.panel.element = document.getElementById('duckPanel');
        this.panel.name = document.getElementById('duckPanelName');
        this.panel.description = document.getElementById('duckPanelDescription');
        this.panel.link = document.getElementById('duckPanelLink');
        this.panel.image = document.getElementById('duckPanelImage');
        this.panel.media = document.getElementById('duckPanelMedia');
        this.panel.close = document.getElementById('duckPanelClose');

        if(this.panel.close){
            //Closing the panel deselects (stands the ducks back up)
            this.panel.close.addEventListener('click', () => this.deselectDuck());
        }
    }

    isPanelTarget(target){
        //True if a DOM event happened inside the info panel (so it shouldn't deselect)
        return this.panel && this.panel.element && this.panel.element.contains(target);
    }

    showInfoPanel(member){
        if(!this.panel || !this.panel.element) return;
        const m = member || {};

        this.panel.name.textContent = m.name || '';

        this.panel.description.textContent = m.description || '';
        this.panel.description.classList.toggle('is-hidden', !m.description);

        if(m.link){
            this.panel.link.href = m.link;
            this.panel.link.classList.remove('is-hidden');
        } else {
            this.panel.link.classList.add('is-hidden');
        }

        if(m.imagePath){
            this.panel.image.src = m.imagePath;
            this.panel.media.classList.remove('is-empty');
        } else {
            this.panel.image.removeAttribute('src');
            this.panel.media.classList.add('is-empty');
        }

        this.panel.element.classList.add('visible');
    }

    hideInfoPanel(){
        if(!this.panel || !this.panel.element) return;
        this.panel.element.classList.remove('visible');
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

        //Projects sign + flip
        const onProjectsMove = () => this.projects.position.copy(this.projectsPosition);
        this.debugFolder.add(this.projectsPosition, 'x').min(-6).max(6).step(0.05).name('projects x').onChange(onProjectsMove)
        this.debugFolder.add(this.projectsPosition, 'y').min(-2).max(3).step(0.05).name('projects y').onChange(onProjectsMove)
        this.debugFolder.add(this.projectsPosition, 'z').min(-4).max(4).step(0.05).name('projects z').onChange(onProjectsMove)
        this.debugFolder
            .add(this, 'projectsScale').min(0.1).max(3).step(0.05).name('projects scale')
            .onChange(() => this.projects.scale.setScalar(this.projectsScale))
        this.debugFolder.add(this, 'retractDuration').min(0.3).max(4).step(0.1).name('retract duration')
        this.debugFolder.add(this, 'spinDuration').min(0.3).max(4).step(0.1).name('spin duration')
    }

    rebuildDuckColliders(){
        //Rebuild every duck's collider at the new padding
        for(const duck of this.ducks){
            duck.rebuildCollider(this.duckColliderPadding);
        }
        this.refreshColliderList();
    }

    updateParallax(){
        //Drives the card's root rotation: the 360° spin (driven by the projects sequence) on Y,
        //plus a small parallax tilt toward the mouse.
        if(!this.model || !this.modelBaseRotation || !this.canInteract()) return;

        //Parallax tilt (eases to 0 when disabled)
        const mouseX = this.parallaxEnabled ? this.sizes.mouse.x : 0;
        const mouseY = this.parallaxEnabled ? this.sizes.mouse.y : 0;
        this.parallaxCurrentX += (mouseX - this.parallaxCurrentX) * this.parallaxEasing;
        this.parallaxCurrentY += (mouseY - this.parallaxCurrentY) * this.parallaxEasing;

        //mouse x -> tilt around Y; spin + mouse y -> rotation around X
        this.model.rotation.y = this.modelBaseRotation.y + this.parallaxCurrentX * this.parallaxAmount;
        this.model.rotation.x = this.modelBaseRotation.x + this.spinAngle - this.parallaxCurrentY * this.parallaxAmount;
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

        //Smoothly approach the scroll target for a fluid feel (the projects sequence drives
        //scrollCurrent itself via gsap, so don't fight it then)
        if(!this.projectsSequenceActive){
            this.scrollCurrent += (this.scrollTarget - this.scrollCurrent) * this.smoothing;
        }

        //Only the first scroll unit [0 -> 1] drives the clip; beyond that the card stays out
        //(the extra scroll range carries the camera to its final framing).
        const clipProgress = Math.min(this.scrollCurrent, 1);
        this.animation.action.time = clipProgress * this.animation.duration;
        this.animation.mixer.update(0);

        //If the card is being scrolled back in, stand ducks back up
        if(!this.camera.freeRotate && this.selectedDuck){
            this.deselectDuck();
        }

        this.updateParallax();
        this.updateDucks();
    }
}
