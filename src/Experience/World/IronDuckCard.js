import Experience from '../Experience.js'
import * as THREE from 'three'
import gsap from 'gsap'
import Duck from './Duck.js'
import ducksMembers from '../ducksMembers.js'
import projects from '../projects.js'
import Project from './Project.js'
import ContactMail from './ContactMail.js'

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

        //Projects data (one Project per entry in projects.js) + which one is shown on the panel.
        //Once in the projects section the card scroll is locked; scrolling cycles the project image.
        this.projectList = projects.map((data) => new Project(data, this.resources));
        this.currentProjectIndex = 0;
        this.inProjectsSection = false;

        //Carousel: the panel shows one slice of a wide atlas texture; sliding the texture offset
        //(carouselCurrent eased toward carouselTarget) scrolls the images, with wrap + snap.
        this.carouselCurrent = 0;
        this.carouselTarget = 0;
        this.carouselEase = 0.12;             //how fast the slide follows the target
        this.carouselDragSensitivity = 0.004; //image units per dragged pixel
        this.carouselDragging = false;
        this.carouselDragStartX = 0;
        this.carouselDragStartTarget = 0;

        //Projects sequence: clicking the Projects sign blocks interactions, slides the card back
        //into its container (the intro extraction reversed) and spins the whole card 360°.
        this.projectsSequenceActive = false; //blocks user input during a sequence
        this.suspendSpline = false;          //suspends the camera scroll-spline (so gsap can drive it)
        this.spinAngle = 0;            //extra X rotation of the card (driven by the spin)
        this.retractDuration = 2;      //seconds: card slides back in
        this.automaticExtractDuration = 3;
        this.spinDuration = 1.2;       //seconds: full 360° spin

        //Navigation panels (General/Projects/Mail): pop in when the card is fully out, pop out
        //when it goes back in. Clicking ProjectsInfoPanel opens the projects section.
        this.navPanelsShown = false;

        //General section: clicking GeneralInfoPanel folds the ducks, hides the nav panels and
        //rotates the card's hinge ("BigliettoPivot", authored on the edge nearest the container)
        //180° so the card falls flat onto the container. A back arrow returns.
        this.inGeneralSection = false;
        this.fallDuration = 1.4;     //seconds: the fall (and its reverse)
        this.fallTarget = -Math.PI;  //hinge angle once fallen onto the container (180°, clockwise)
        this.fallAxis = 'z';         //BigliettoPivot local axis to rotate around
        this.generalPreRoll = 0.5;   //seconds: ducks fold + cartelli scale to 0 before the card turns

        //Mail section: clicking MailInfoPanel retracts the card into the container and spins it 180°
        //(half of the projects spin), stopping on the ContactPlane / contact form. The back arrow
        //reverses it (spin back, card re-extracts) like the other sections.
        this.inMailSection = false;

        this.setModel();
        this.setDucks();
        this.setNavPanels();
        this.setGeneralFall();
        this.setInfoPlane();
        this.setContactMail();
        this.setProjectPanel();
        this.setProjectText();
        this.setBackArrow();
        this.setAnimation();
        this.setScrollControl();
        this.setDragControl();
        this.setHoverControl();
        this.setInfoPanel();
        this.setScrollHint();
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

    setNavPanels(){
        //The "NavigateInfoPanel" group (child of FullBiglietto) holds 3 panels authored at scale 0.
        //They pop in once the card is fully out and pop out when it goes back in. ProjectsInfoPanel
        //opens the projects section; General/Mail have placeholder click hooks for now.
        this.generalInfoPanel = this.model.getObjectByName('GeneralInfoPanel');
        this.projectsInfoPanel = this.model.getObjectByName('ProjectsInfoPanel');
        this.mailInfoPanel = this.model.getObjectByName('MailInfoPanel');

        //Pop order (staggered): General -> Projects -> Mail. Each is hidden (scale 0) until shown.
        this.navPanels = [this.generalInfoPanel, this.projectsInfoPanel, this.mailInfoPanel].filter(Boolean);
        this._navPanelProxies = this.navPanels.map(() => ({ s: 0 }));
        this.navPanels.forEach((panel) => panel.scale.setScalar(0));

        //Hover "paper wobble" (same as the ducks): a damped tilt that settles back to the rest pose.
        this.navWobbleAmplitude = 0.35; //radians of the first swing
        this.navWobbleFrequency = 35;   //rad/s — how fast it flaps
        this.navWobbleDecay = 8;        //how quickly it settles back
        this._navWobbleAxis = new THREE.Vector3(1, 0, 0);
        this._navWobbleQuat = new THREE.Quaternion();
        this._navPanelRest = this.navPanels.map((p) => p.quaternion.clone());
        this._navPanelWobble = this.navPanels.map(() => ({ active: false, time: 0 }));
        this.hoveredNavPanel = null;       //index of the panel under the pointer (or null)
        this._prevHoveredNavPanel = null;  //to fire the wobble only on hover-enter
    }

    applyNavPanelScale(index){
        this.navPanels[index].scale.setScalar(this._navPanelProxies[index].s);
    }

    animateNavPanelsIn(){
        //Each panel bounces 0 -> 1.2 -> 0.9 -> 1, started staggered (overlapping, not waiting)
        this.navPanels.forEach((panel, i) => {
            const proxy = this._navPanelProxies[i];
            gsap.killTweensOf(proxy);
            proxy.s = 0;
            gsap.timeline({ delay: i * 0.12, onUpdate: () => this.applyNavPanelScale(i) })
                .to(proxy, { s: 1.2, duration: 0.3, ease: 'power2.out' })
                .to(proxy, { s: 0.9, duration: 0.12, ease: 'power1.inOut' })
                .to(proxy, { s: 1, duration: 0.12, ease: 'power1.inOut' });
        });
    }

    animateNavPanelsOut(){
        //Each panel scales back to 0 (slightly staggered)
        this.navPanels.forEach((panel, i) => {
            const proxy = this._navPanelProxies[i];
            gsap.killTweensOf(proxy);
            gsap.to(proxy, {
                s: 0, duration: 0.25, delay: i * 0.05, ease: 'power2.in',
                onUpdate: () => this.applyNavPanelScale(i)
            });
        });
    }

    setGeneralFall(){
        //"BigliettoPivot" wraps the whole card and is hinged on the edge nearest the container.
        //It isn't touched by the extraction clip (which only moves FullBiglietto inside it), so we
        //can just tween its rotation to flip the card 180° flat onto the container (and back).
        this.bigliettoPivot = this.model.getObjectByName('BigliettoPivot');
    }

    setInfoPlane(){
        //"InformationPlane" sits on the card; it's lit up (with the info.js content) when the card
        //flips into the general section, and switched off again on the way back.
        this.informationPlane = this.model.getObjectByName('InformationPlane');
        if(!this.informationPlane) return;
        this.informationPlane.visible = false;

        //Pre-made info screen (textures/PanelInfo.png). The card flips 180° and we see the plane's
        //back face, so the texture is flipped vertically (flipY) + horizontally (negative repeat.x).
        const texture = new THREE.TextureLoader().load('textures/PanelInfo.png');
        texture.flipY = true;
        texture.wrapS = THREE.RepeatWrapping;
        texture.repeat.x = -1;
        texture.offset.x = 1;
        texture.encoding = THREE.sRGBEncoding;

        //Unlit material showing the image (visible from both faces; transparent if the PNG has alpha)
        this.infoPlaneMaterial = new THREE.MeshBasicMaterial({ map: texture, transparent: true, side: THREE.DoubleSide });
        this.informationPlane.traverse((child) => { if(child.isMesh) child.material = this.infoPlaneMaterial; });
    }

    foldAllDucks(folded){
        //Fold every duck down to its lying pose (or stand them back up). In the general section the
        //giant Papera folds too (unlike normal selection, where it stays put), so don't skip it.
        for(const duck of this.ducks){
            duck.setFolded(folded);
        }
    }

    onGeneralClick(){
        this.playGeneralSequence();
    }

    playGeneralSequence(){
        //Clicking GeneralInfoPanel: block input, stand the ducks down, hide the nav panels and
        //rotate the hinge so the card falls onto the container. While it rotates, the camera glides
        //(eased) to the same framing the projects sequence uses. Then pop in the back arrow.
        if(this.projectsSequenceActive || this.inProjectsSection || this.inGeneralSection) return;
        if(!this.bigliettoPivot) return;
        this.projectsSequenceActive = true;
        this.suspendSpline = true;       //gsap drives the camera (no spline fight)
        this.camera.controls.enableRotate = false;

        //Light up the info plane right away (it stays on for the whole general section)
        if(this.informationPlane) this.informationPlane.visible = true;

        //Pre-roll: first the ducks fold down and the cartelli scale to 0 (like the projects retract)
        this.selectedDuck = null;
        this.hideInfoPanel();
        this.foldAllDucks(true);
        this.navPanelsShown = false;
        this.animateNavPanelsOut();

        const cam = this.camera.instance;
        const tgt = this.camera.controls.target;
        const startPos = this.camera.scrollStartPos;       //same destination as the projects sequence
        const startTarget = this.camera.scrollStartTarget;
        const dur = this.fallDuration;
        const lead = this.generalPreRoll;                  //let the ducks/cartelli animate first
        const ease = 'power2.inOut';

        gsap.killTweensOf(this.bigliettoPivot.rotation);
        gsap.killTweensOf(cam.position);
        gsap.killTweensOf(tgt);

        const tl = gsap.timeline({
            onComplete: () => {
                this.projectsSequenceActive = false;
                this.inGeneralSection = true; //locked in the general section now
                this.animateBackArrowIn();    //pop in the back arrow
            }
        });
        //After the pre-roll: card falls onto the container; camera glides to the projects framing
        tl.to(this.bigliettoPivot.rotation, { [this.fallAxis]: this.fallTarget, duration: dur, ease }, lead);
        tl.to(cam.position, { x: startPos.x, y: startPos.y, z: startPos.z, duration: dur, ease }, lead);
        tl.to(tgt, { x: startTarget.x, y: startTarget.y, z: startTarget.z, duration: dur, ease }, lead);
    }

    exitGeneralSequence(){
        //Back from the general section: shrink the arrow, lift the card back off the container and
        //glide the camera back to the card-out framing, then restore the normal state.
        if(this.projectsSequenceActive || !this.inGeneralSection) return;
        if(!this.bigliettoPivot) return;
        this.projectsSequenceActive = true;
        this.inGeneralSection = false;

        const cam = this.camera.instance;
        const tgt = this.camera.controls.target;
        const finalPos = this.camera.scrollFinalPos;       //the card-out (open card) framing
        const finalTarget = this.camera.scrollFinalTarget;
        const dur = this.fallDuration;
        const ease = 'power2.inOut';

        gsap.killTweensOf(this.bigliettoPivot.rotation);
        gsap.killTweensOf(cam.position);
        gsap.killTweensOf(tgt);

        const tl = gsap.timeline({
            onComplete: () => {
                this.projectsSequenceActive = false;
                this.suspendSpline = false;               //camera spline resumes (no snap: already at final)
                this.camera.controls.enableRotate = true; //card out again: free orbit
                this.foldAllDucks(false);                 //ducks (and giant Papera) stand back up
                if(this.informationPlane) this.informationPlane.visible = false; //info plane off on arrival
                this.navPanelsShown = true;
                this.animateNavPanelsIn();                //the cartelli pop back in
            }
        });

        //Back arrow shrinks away while the card lifts and the camera glides back
        if(this.backArrow){
            gsap.killTweensOf(this._backArrowProxy);
            tl.to(this._backArrowProxy, { s: 0, duration: 0.3, ease: 'power2.in', onUpdate: () => this.applyBackArrowScale() }, 0);
        }
        tl.to(this.bigliettoPivot.rotation, { [this.fallAxis]: 0, duration: dur, ease }, 0);
        tl.to(cam.position, { x: finalPos.x, y: finalPos.y, z: finalPos.z, duration: dur, ease }, 0);
        tl.to(tgt, { x: finalTarget.x, y: finalTarget.y, z: finalTarget.z, duration: dur, ease }, 0);
    }

    setContactMail(){
        //The contact screen (ContactPlane backdrop + DOM mail form) lives in its own class.
        this.contactPlane = this.model.getObjectByName('ContactPlane');
        this.contactMail = new ContactMail({
            plane: this.contactPlane,
            onBack: () => this.exitMailSequence()
        });
    }

    onMailClick(){
        this.playMailSequence();
    }

    playMailSequence(){
        //Clicking MailInfoPanel: like the projects sequence, but the spin stops at 180° on the
        //contact screen. Retract the card into the container, glide the camera to the start framing,
        //then spin 180° (revealing the ContactPlane/form halfway through) and stay there.
        if(this.projectsSequenceActive || this.inProjectsSection || this.inGeneralSection || this.inMailSection) return;
        this.projectsSequenceActive = true;
        this.suspendSpline = true;
        this.deselectDuck();
        this.navPanelsShown = false;
        this.animateNavPanelsOut();

        this.scrollCurrent = Math.min(this.scrollCurrent, 1);
        this.scrollTarget = this.scrollCurrent;
        this.camera.controls.enableRotate = false;

        const cam = this.camera.instance;
        const tgt = this.camera.controls.target;
        const startPos = this.camera.scrollStartPos;
        const startTarget = this.camera.scrollStartTarget;
        const dur = this.retractDuration;
        const ease = 'power1.inOut';

        let revealed = false;
        const tl = gsap.timeline({
            onComplete: () => {
                this.projectsSequenceActive = false;
                this.suspendSpline = false;    //spline holds the camera at the start framing
                this.inMailSection = true;     //locked in the mail section (spin stays at 180°)
                this.animateBackArrowIn();
            }
        });

        //Card retracts; camera glides to the start framing — together, same timing
        tl.to(this, { scrollCurrent: 0, duration: dur, ease, onUpdate: () => { this.scrollTarget = this.scrollCurrent; } }, 0);
        tl.to(cam.position, { x: startPos.x, y: startPos.y, z: startPos.z, duration: dur, ease }, 0);
        tl.to(tgt, { x: startTarget.x, y: startTarget.y, z: startTarget.z, duration: dur, ease }, 0);

        //Then a HALF spin (180°), revealing the contact screen as the back comes into view
        tl.to(this, {
            spinAngle: Math.PI,
            duration: this.spinDuration,
            ease: 'power2.inOut',
            onUpdate: () => { if(!revealed && this.spinAngle >= Math.PI / 2){ revealed = true; this.onMailReveal(); } }
        }, '>');
    }

    onMailReveal(){
        //Half-way through the 180° turn: show the contact screen, hide Papera
        if(this.paperaObject) this.paperaObject.visible = false;
        if(this.contactMail) this.contactMail.show();
    }

    onMailHide(){
        //Reverse of onMailReveal: back to the original card
        if(this.contactMail) this.contactMail.hide();
        if(this.paperaObject) this.paperaObject.visible = true;
    }

    exitMailSequence(){
        //Back from the mail section: shrink the arrow, spin the 180° back (hiding the contact screen
        //halfway), then re-extract the card via the spline — exactly like the projects exit.
        if(this.projectsSequenceActive || !this.inMailSection) return;
        this.projectsSequenceActive = true;
        this.inMailSection = false;
        const dur = this.automaticExtractDuration;
        const ease = 'power1.inOut';

        if(this.backArrow){
            gsap.killTweensOf(this._backArrowProxy);
            gsap.to(this._backArrowProxy, { s: 0, duration: 0.3, ease: 'power2.in', onUpdate: () => this.applyBackArrowScale() });
        }

        let hidden = false;
        const tl = gsap.timeline({
            onComplete: () => {
                this.spinAngle = 0;
                this.projectsSequenceActive = false;
                this.scrollTarget = this.scrollCurrent; //stays open (= scrollMax)
            }
        });

        //Spin the 180° back; hide the contact screen as the front comes back into view
        tl.to(this, {
            spinAngle: 0, duration: this.spinDuration, ease: 'power2.inOut',
            onUpdate: () => { if(!hidden && this.spinAngle <= Math.PI / 2){ hidden = true; this.onMailHide(); } }
        }, 0);

        //Then the card re-extracts on its own, the spline driving the camera (like the projects exit)
        tl.to(this, { scrollCurrent: this.scrollMax, duration: dur, ease, onUpdate: () => { this.scrollTarget = this.scrollCurrent; } }, '>');
    }

    playProjectsSequence(){
        //Clicking the Projects sign: block interactions, slide the card back into its container
        //(reverse extraction, the camera follows the scroll spline back), then spin it 360°.
        if(this.projectsSequenceActive) return;
        this.projectsSequenceActive = true;
        this.suspendSpline = true; //gsap drives the camera straight back (avoids a spline snap)
        this.deselectDuck();
        this.navPanelsShown = false;
        this.animateNavPanelsOut(); //the cartelli switch off as the card retracts

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
                this.spinAngle = 0;                  //360° == back to start; reset for next time
                this.projectsSequenceActive = false;
                this.suspendSpline = false;
                this.inProjectsSection = true;       //locked in the projects section now
                this.animateBackArrowIn();           //pop in the back arrow
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
        //Half-way through the 360° spin (card rotated 180°): show the project image + text panels,
        //hide Papera.
        if(this.projectPanel) this.projectPanel.visible = true;
        if(this.projectTextPanel) this.projectTextPanel.visible = true;
        if(this.paperaObject) this.paperaObject.visible = false;
    }

    showCardContent(){
        //Reverse of onSpinHalfway: back to the original card (Papera on, project panels off)
        if(this.projectPanel) this.projectPanel.visible = false;
        if(this.projectTextPanel) this.projectTextPanel.visible = false;
        if(this.paperaObject) this.paperaObject.visible = true;
    }

    setBackArrow(){
        //"Back" arrow shown in the projects page; clicking it returns to the open card.
        //The group "BackArrow_Project" is the one we animate, but BOTH it and its inner mesh
        //"Project_BackArrow" were authored at scale 0 — so give the inner mesh its real scale (1)
        //and animate only the group, otherwise the group's 0 keeps everything invisible.
        this.backArrow = this.model.getObjectByName('BackArrow_Project');
        if(!this.backArrow) return;
        //The inner mesh was authored at scale 0 AND with a leftover translation (x ≈ -32) that
        //scale-0 was hiding. Reset its local transform so it sits at the group's origin.
        this.backArrow.traverse((child) => {
            if(child !== this.backArrow){
                child.position.set(0, 0, 0);
                child.scale.setScalar(1);
            }
        });
        this.backArrowBaseScale = 1;
        this.backArrow.scale.setScalar(0); //group hidden until the projects page opens
        this._backArrowProxy = { s: 0 };
    }

    applyBackArrowScale(){
        if(this.backArrow) this.backArrow.scale.setScalar(this.backArrowBaseScale * this._backArrowProxy.s);
    }

    animateBackArrowIn(){
        //Pop in: 0 -> 1.2 -> 0.9 -> 1 (relative to its authored scale)
        if(!this.backArrow) return;
        gsap.killTweensOf(this._backArrowProxy);
        this._backArrowProxy.s = 0;
        gsap.timeline({ onUpdate: () => this.applyBackArrowScale() })
            .to(this._backArrowProxy, { s: 1.2, duration: 0.3, ease: 'power2.out' })
            .to(this._backArrowProxy, { s: 0.9, duration: 0.12, ease: 'power1.inOut' })
            .to(this._backArrowProxy, { s: 1, duration: 0.12, ease: 'power1.inOut' });
    }

    clickedBackArrow(event){
        if(!this.backArrow) return false;
        this.pointer.x = (event.clientX / this.sizes.width) * 2 - 1;
        this.pointer.y = -(event.clientY / this.sizes.height) * 2 + 1;
        this.raycaster.setFromCamera(this.pointer, this.camera.instance);
        return this.raycaster.intersectObject(this.backArrow, true).length > 0;
    }

    exitProjectsSequence(){
        //Back from the projects page: shrink the arrow, spin 360° swapping back to the original
        //card (at 180°), then auto re-open the card to the open-card framing.
        if(this.projectsSequenceActive || !this.inProjectsSection) return;
        this.projectsSequenceActive = true; //blocks input, but the spline stays active so the
        this.inProjectsSection = false;     //camera re-opens exactly like the initial scroll
        const dur = this.automaticExtractDuration;
        const ease = 'power1.inOut';

        let halfSpinDone = false;
        const tl = gsap.timeline({
            onComplete: () => {
                this.spinAngle = 0;
                this.projectsSequenceActive = false;
                this.scrollTarget = this.scrollCurrent; //stays open (= scrollMax)
            }
        });

        //Back arrow shrinks away (together with the spin start)
        if(this.backArrow){
            gsap.killTweensOf(this._backArrowProxy);
            tl.to(this._backArrowProxy, {
                s: 0, duration: 0.3, ease: 'power2.in',
                onUpdate: () => this.applyBackArrowScale()
            }, 0);
        }

        //360° spin; at 180° swap back to the original card content
        tl.to(this, {
            spinAngle: Math.PI * 2, duration: this.spinDuration, ease: 'power2.inOut',
            onUpdate: () => {
                if(!halfSpinDone && this.spinAngle >= Math.PI){ halfSpinDone = true; this.showCardContent(); }
            }
        }, 0);

        //Then the card re-extracts on its own. The camera is NOT tweened directly: the scroll
        //spline drives it (start -> overview -> final) exactly like the initial extraction, just
        //automatic. The spline stays active (suspendSpline is false) and follows scrollCurrent.
        tl.to(this, { scrollCurrent: this.scrollMax, duration: dur, ease, onUpdate: () => { this.scrollTarget = this.scrollCurrent; } }, '>');
    }

    setProjectPanel(){
        //The card has a hidden "ProjectImageContainer" panel (on its back) and a "Papera" object.
        //The panel starts off; at the 180° point of the spin it turns on and Papera turns off.
        this.projectPanel = this.model.getObjectByName('ProjectImageContainer');
        this.paperaObject = this.model.getObjectByName('Papera');

        if(this.projectPanel){
            this.projectPanel.visible = false; //off until the spin reaches 180°

            //One shared unlit material; its map is a wide atlas slid via the texture offset
            this.projectPanelMaterial = new THREE.MeshBasicMaterial();
            this.projectPanel.traverse((child) => {
                if(child.isMesh) child.material = this.projectPanelMaterial;
            });
            this.buildProjectsAtlas();
        }
    }

    buildProjectsAtlas(){
        //One wide canvas with every project image side by side; we show one slice and slide it.
        const count = this.projectList.length;
        if(count === 0) return;

        const sample = this.projectList[0].texture && this.projectList[0].texture.image;
        const slotW = (sample && sample.naturalWidth) || 1024;
        const slotH = (sample && sample.naturalHeight) || 1024;

        const canvas = document.createElement('canvas');
        canvas.width = slotW * count;
        canvas.height = slotH;
        const ctx = canvas.getContext('2d');

        this.projectList.forEach((project, i) => {
            const img = project.texture && project.texture.image;
            if(img) this.drawImageCover(ctx, img, i * slotW, 0, slotW, slotH);
        });

        const texture = new THREE.CanvasTexture(canvas);
        texture.flipY = false;
        texture.encoding = THREE.sRGBEncoding;
        texture.wrapS = THREE.RepeatWrapping;     //seamless wrap from last image to first
        texture.repeat.set(1 / count, 1);         //show one image at a time
        texture.needsUpdate = true;

        this.projectPanelMaterial.map = texture;
        this.projectPanelMaterial.needsUpdate = true;
        this.updateCarouselOffset();
    }

    drawImageCover(ctx, img, x, y, w, h){
        //Draw img into the (x,y,w,h) slot scaled to cover (center-crop), preserving aspect
        const iw = img.naturalWidth || img.width;
        const ih = img.naturalHeight || img.height;
        const scale = Math.max(w / iw, h / ih);
        const dw = iw * scale;
        const dh = ih * scale;
        ctx.drawImage(img, x + (w - dw) / 2, y + (h - dh) / 2, dw, dh);
    }

    setProjectText(){
        //Dedicated "ProjectTextContainer" plane shows each project's text, sliding with the same
        //carousel offset as the image. We keep the plane's OWN material as the background and add
        //a transparent text overlay on top (so only the text is drawn, the plane shows through).
        this.projectTextPanel = this.model.getObjectByName('ProjectTextContainer');
        if(!this.projectTextPanel) return;

        this.projectTextPanel.visible = false; //off until the spin reaches 180°

        let planeMesh = null;
        this.projectTextPanel.traverse((child) => { if(child.isMesh && !planeMesh) planeMesh = child; });
        if(!planeMesh) return;

        //Transparent overlay sharing the plane's geometry; pulled slightly forward to sit on top
        this.projectTextMaterial = new THREE.MeshBasicMaterial({
            transparent: true,
            depthWrite: false,
            side: THREE.DoubleSide,
            polygonOffset: true,
            polygonOffsetFactor: -1,
            polygonOffsetUnits: -1
        });
        const overlay = new THREE.Mesh(planeMesh.geometry, this.projectTextMaterial);
        overlay.renderOrder = 1;
        planeMesh.add(overlay);

        this.buildProjectsTextAtlas();
    }

    buildProjectsTextAtlas(){
        const count = this.projectList.length;
        if(count === 0) return;

        //Slot aspect = the panel's two largest (planar) dimensions
        let aspect = 1.2;
        this.projectTextPanel.traverse((child) => {
            if(child.isMesh && child.geometry){
                child.geometry.computeBoundingBox();
                const s = child.geometry.boundingBox.getSize(new THREE.Vector3());
                const dims = [s.x, s.y, s.z].sort((a, b) => b - a);
                if(dims[1] > 0) aspect = dims[0] / dims[1];
            }
        });
        const slotH = 1024;
        const slotW = Math.round(slotH * aspect);

        const canvas = document.createElement('canvas');
        canvas.width = slotW * count;
        canvas.height = slotH;
        const ctx = canvas.getContext('2d');

        this.projectList.forEach((project, i) => {
            this.drawProjectTextSlot(ctx, project, i * slotW, slotW, slotH);
        });

        const texture = new THREE.CanvasTexture(canvas);
        texture.flipY = false;
        texture.encoding = THREE.sRGBEncoding;
        texture.wrapS = THREE.RepeatWrapping;
        texture.repeat.set(1 / count, 1);
        texture.needsUpdate = true;

        this.projectTextMaterial.map = texture;
        this.projectTextMaterial.needsUpdate = true;
        this.updateCarouselOffset();
    }

    drawProjectTextSlot(ctx, project, x, w, h){
        //Transparent background (the plane's own material shows through) — only text is drawn.
        const pad = w * 0.09;
        const maxWidth = w - pad * 2;
        const accent = project.titleColor || '#4a76f9';
        ctx.textAlign = 'left';
        ctx.textBaseline = 'top';

        //Title (bold, project's color, wrapped to at most 2 lines so long titles don't overflow)
        ctx.fillStyle = accent;
        const titleSize = Math.round(h * 0.10);
        ctx.font = `bold ${titleSize}px sans-serif`;
        const titleLines = this.wrapText(ctx, project.title || '', maxWidth).slice(0, 2);
        const titleLineH = titleSize * 1.18;
        let y = h * 0.08;
        for(const line of titleLines){
            ctx.fillText(line, x + pad, y);
            y += titleLineH;
        }

        //Description (white, wrapped), placed just below the title
        ctx.fillStyle = '#ffffff';
        ctx.font = `${Math.round(h * 0.055)}px sans-serif`;
        const descLineH = h * 0.075;
        y += h * 0.05; //gap after the title
        const descLines = this.wrapText(ctx, project.description || '', maxWidth);
        for(const line of descLines){
            ctx.fillText(line, x + pad, y);
            y += descLineH;
        }

        //Link prompt (bottom, project's color)
        if(project.link){
            ctx.fillStyle = accent;
            ctx.font = `italic ${Math.round(h * 0.05)}px sans-serif`;
            ctx.textBaseline = 'bottom';
            ctx.fillText('Apri il progetto  →', x + pad, h - pad * 0.6);
        }
    }

    wrapText(ctx, text, maxWidth){
        if(!text) return [];
        const words = text.split(' ');
        const lines = [];
        let current = '';
        for(const word of words){
            const test = current ? current + ' ' + word : word;
            if(ctx.measureText(test).width > maxWidth && current){
                lines.push(current);
                current = word;
            } else {
                current = test;
            }
        }
        if(current) lines.push(current);
        return lines;
    }

    updateCarousel(){
        //Ease the slide toward its target and apply the texture offset
        if(!this.inProjectsSection) return;
        this.carouselCurrent += (this.carouselTarget - this.carouselCurrent) * this.carouselEase;
        this.updateCarouselOffset();
    }

    updateCarouselOffset(){
        const count = this.projectList.length;
        if(count === 0) return;
        const offset = this.carouselCurrent / count;
        if(this.projectPanelMaterial && this.projectPanelMaterial.map){
            this.projectPanelMaterial.map.offset.x = offset;
        }
        if(this.projectTextMaterial && this.projectTextMaterial.map){
            this.projectTextMaterial.map.offset.x = offset; //text slides in sync with the image
        }
        this.currentProjectIndex = ((Math.round(this.carouselCurrent) % count) + count) % count;
    }

    carouselStepByScroll(deltaY){
        //One image per wheel notch (the slide itself is smoothed in updateCarousel)
        if(this.projectList.length <= 1) return;
        this.carouselTarget = Math.round(this.carouselTarget) + Math.sign(deltaY);
    }

    carouselDragStart(clientX){
        this.carouselDragging = true;
        this.carouselDragStartX = clientX;
        this.carouselDragStartTarget = this.carouselTarget;
    }

    carouselDragMove(clientX){
        if(!this.carouselDragging) return;
        //Drag left -> advance to the next image. Follow the finger 1:1 (no lag) while dragging.
        this.carouselTarget = this.carouselDragStartTarget + (this.carouselDragStartX - clientX) * this.carouselDragSensitivity;
        this.carouselCurrent = this.carouselTarget;
        this.updateCarouselOffset();
    }

    carouselDragEnd(){
        if(!this.carouselDragging) return;
        this.carouselDragging = false;
        this.carouselTarget = Math.round(this.carouselTarget); //snap to the nearest image
    }

    checkProjectLinkClick(event){
        //A tap on the text panel opens the current project's link
        if(!this.projectTextPanel) return;
        this.pointer.x = (event.clientX / this.sizes.width) * 2 - 1;
        this.pointer.y = -(event.clientY / this.sizes.height) * 2 + 1;
        this.raycaster.setFromCamera(this.pointer, this.camera.instance);
        if(this.raycaster.intersectObject(this.projectTextPanel, true).length > 0){
            const project = this.projectList[this.currentProjectIndex];
            if(project && project.link) window.open(project.link, '_blank', 'noopener');
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

    //Card scroll is blocked while the sequence plays AND once we're locked in the projects section
    inputAllowed(){
        return this.canInteract() && !this.projectsSequenceActive && !this.inProjectsSection && !this.inGeneralSection && !this.inMailSection;
    }

    setScrollControl(){
        //Mouse wheel drives the whole journey both ways: scroll down advances it, scroll up
        //(even once arrived) plays it back in reverse.
        window.addEventListener('wheel', (event) => {
            //In the projects section, the wheel slides the carousel (the card is locked)
            if(this.inProjectsSection){
                this.carouselStepByScroll(event.deltaY);
                return;
            }
            if(!this.inputAllowed()) return;
            this.scrollTarget = THREE.MathUtils.clamp(
                this.scrollTarget + event.deltaY * this.wheelSensitivity,
                0,
                this.scrollMax
            );
        }, { passive: true });

        //Touch: swiping advances the animation, or drags the carousel in the projects section
        window.addEventListener('touchstart', (event) => {
            if(this.inProjectsSection){
                this.carouselDragStart(event.touches[0].clientX); //horizontal drag of the carousel
                return;
            }
            if(!this.canInteract()) return;
            this.lastTouchY = event.touches[0].clientY;
        }, { passive: true });

        window.addEventListener('touchmove', (event) => {
            if(this.inProjectsSection){
                this.carouselDragMove(event.touches[0].clientX);
                return;
            }
            if(this.lastTouchY === null) return;
            const currentY = event.touches[0].clientY;
            const deltaY = this.lastTouchY - currentY; //swipe up -> positive
            this.lastTouchY = currentY;

            if(!this.inputAllowed()) return;
            if(this.camera.freeRotate) return; //card out: gestures rotate/zoom the camera instead
            this.scrollTarget = THREE.MathUtils.clamp(
                this.scrollTarget + deltaY * this.touchSensitivity,
                0,
                this.scrollMax
            );
        }, { passive: true });

        window.addEventListener('touchend', () => {
            if(this.inProjectsSection) this.carouselDragEnd();
            this.lastTouchY = null;
        }, { passive: true });
    }

    setDragControl(){
        //Press on the card and drag left to pull it out, drag right to push it back in
        window.addEventListener('pointerdown', (event) => {
            //In the projects section, dragging slides the carousel
            if(this.inProjectsSection){
                this.carouselDragStart(event.clientX);
                return;
            }
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
            if(this.inProjectsSection){
                this.carouselDragMove(event.clientX);
                return;
            }
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
            //In the general section, only the back arrow is interactive (it lifts the card back up)
            if(this.inGeneralSection){
                if(this.clickedBackArrow(event)) this.exitGeneralSequence();
                return;
            }
            //In the mail section: the 3D back arrow returns; otherwise forward the click onto the
            //ContactPlane so the in-plane form can focus a field / press its buttons.
            if(this.inMailSection){
                if(this.clickedBackArrow(event)){ this.exitMailSequence(); return; }
                this.pointer.x = (event.clientX / this.sizes.width) * 2 - 1;
                this.pointer.y = -(event.clientY / this.sizes.height) * 2 + 1;
                this.raycaster.setFromCamera(this.pointer, this.camera.instance);
                const hit = this.contactPlane ? this.raycaster.intersectObject(this.contactPlane, true)[0] : null;
                if(this.contactMail) this.contactMail.handleHit(hit ? hit.uv : null);
                return;
            }
            if(this.inProjectsSection){
                const moved = Math.abs(event.clientX - this.carouselDragStartX);
                this.carouselDragEnd();
                if(moved < 6){
                    //A tap on the back arrow returns to the card; otherwise on the text opens the link
                    if(this.clickedBackArrow(event)) this.exitProjectsSequence();
                    else this.checkProjectLinkClick(event);
                }
                return;
            }
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
            this.carouselDragEnd();
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
                this.hoveredNavPanel = null;
                return;
            }

            this.pointer.x = (event.clientX / this.sizes.width) * 2 - 1;
            this.pointer.y = -(event.clientY / this.sizes.height) * 2 + 1;
            this.raycaster.setFromCamera(this.pointer, this.camera.instance);

            const intersects = this.raycaster.intersectObjects(this.duckColliders, true);
            const duck = intersects.length > 0 ? this.getDuckFromObject(intersects[0].object) : null;
            //Only hoverable ducks trigger the bubble (the giant duck does nothing)
            this.hoveredDuck = (duck && duck.hoverable) ? duck : null;

            //Nav panels wobble on hover too (only while they're visible)
            this.hoveredNavPanel = null;
            if(this.navPanelsShown){
                for(let i = 0; i < this.navPanels.length; i++){
                    if(this.raycaster.intersectObject(this.navPanels[i], true).length > 0){
                        this.hoveredNavPanel = i;
                        break;
                    }
                }
            }
        });
    }

    checkDuckClick(event){
        this.pointer.x = (event.clientX / this.sizes.width) * 2 - 1;
        this.pointer.y = -(event.clientY / this.sizes.height) * 2 + 1;
        this.raycaster.setFromCamera(this.pointer, this.camera.instance);

        //Clicking a navigation panel: Projects opens the projects section; General/Mail are hooks
        if(this.projectsInfoPanel && this.raycaster.intersectObject(this.projectsInfoPanel, true).length > 0){
            this.playProjectsSequence();
            return;
        }
        if(this.generalInfoPanel && this.raycaster.intersectObject(this.generalInfoPanel, true).length > 0){
            this.onGeneralClick();
            return;
        }
        if(this.mailInfoPanel && this.raycaster.intersectObject(this.mailInfoPanel, true).length > 0){
            this.onMailClick();
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

    setScrollHint(){
        //The "Scroll" hint under the card: shown after the intro, hidden once the user starts scrolling.
        this.scrollHint = document.getElementById('scrollHint');
        this.scrollHintShown = false;
        this.scrollHintDismissed = false;
    }

    updateScrollHint(){
        if(!this.scrollHint || this.scrollHintDismissed) return;
        //Appear once the intro is over (scroll is interactive)
        if(!this.scrollHintShown && this.canInteract()){
            this.scrollHintShown = true;
            this.scrollHint.classList.add('visible');
        }
        //Fade out as soon as any scrolling begins
        if(this.scrollHintShown && (this.scrollTarget > 0.03 || this.scrollCurrent > 0.03)){
            this.scrollHintDismissed = true;
            this.scrollHint.classList.remove('visible');
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

        //Projects sequence
        this.debugFolder.add(this, 'retractDuration').min(0.3).max(4).step(0.1).name('retract duration')
        this.debugFolder.add(this, 'spinDuration').min(0.3).max(4).step(0.1).name('spin duration')
        this.debugFolder.add(this, 'carouselEase').min(0.02).max(0.5).step(0.01).name('carousel ease')
        this.debugFolder.add(this, 'carouselDragSensitivity').min(0.001).max(0.02).step(0.001).name('carousel drag')

        //General fall: flip the card onto its container via the BigliettoPivot hinge
        this.debugFolder.add(this, 'fallAxis', ['x', 'y', 'z']).name('fall axis')
        this.debugFolder.add(this, 'fallTarget').min(-Math.PI).max(Math.PI).step(0.01).name('fall angle')
        this.debugFolder.add(this, 'fallDuration').min(0.3).max(4).step(0.1).name('fall duration')
        this.debugFolder.add(this, 'generalPreRoll').min(0).max(2).step(0.05).name('fall pre-roll')
        const fallActions = {
            play: () => this.inGeneralSection ? this.exitGeneralSequence() : this.playGeneralSequence()
        }
        this.debugFolder.add(fallActions, 'play').name('play / reverse general')
    }

    rebuildDuckColliders(){
        //Rebuild every duck's collider at the new padding
        for(const duck of this.ducks){
            duck.rebuildCollider(this.duckColliderPadding);
        }
        this.refreshColliderList();
    }

    updateParallax(){
        //Drives the card's root rotation: the 360° spin (driven by the projects sequence) on X,
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

    updateNavPanels(){
        //Same paper wobble as the ducks: fire it on hover-enter, then let it decay back to rest.
        if(!this.navPanels || this.navPanels.length === 0) return;
        const delta = this.time.delta * 0.001; //ms -> seconds

        //Start a fresh wobble only when the pointer newly enters a panel
        if(this.hoveredNavPanel !== this._prevHoveredNavPanel){
            const i = this.hoveredNavPanel;
            if(i !== null){
                const w = this._navPanelWobble[i];
                if(!w.active){
                    this._navPanelRest[i].copy(this.navPanels[i].quaternion); //rest pose to return to
                    w.active = true;
                    w.time = 0;
                }
            }
            this._prevHoveredNavPanel = this.hoveredNavPanel;
        }

        //Advance every active wobble (damped oscillation around the captured rest pose)
        for(let i = 0; i < this.navPanels.length; i++){
            const w = this._navPanelWobble[i];
            if(!w.active) continue;
            w.time += delta;
            const envelope = this.navWobbleAmplitude * Math.exp(-this.navWobbleDecay * w.time);
            if(envelope < 0.005){
                this.navPanels[i].quaternion.copy(this._navPanelRest[i]); //snap back, stop
                w.active = false;
            } else {
                const angle = envelope * Math.sin(this.navWobbleFrequency * w.time);
                this._navWobbleQuat.setFromAxisAngle(this._navWobbleAxis, angle);
                this.navPanels[i].quaternion.copy(this._navPanelRest[i]).multiply(this._navWobbleQuat);
            }
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

        //Nav panels pop in once the card is fully out, pop out when it goes back in (hysteresis).
        //Only auto-manage them in the normal browsing state; the section sequences drive them
        //explicitly (so they stay hidden in projects/general even though the card is still "out").
        const sectionActive = this.inProjectsSection || this.inGeneralSection || this.inMailSection || this.projectsSequenceActive;
        if(!sectionActive){
            if(!this.navPanelsShown && this.scrollCurrent >= 0.99){
                this.navPanelsShown = true;
                this.animateNavPanelsIn();
            } else if(this.navPanelsShown && this.scrollCurrent < 0.9){
                this.navPanelsShown = false;
                this.animateNavPanelsOut();
            }
        }

        this.updateScrollHint();
        this.updateParallax();
        this.updateDucks();
        this.updateNavPanels();
        this.updateCarousel();
    }
}
