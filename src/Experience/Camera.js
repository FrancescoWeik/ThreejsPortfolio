import Experience from './Experience.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as THREE from 'three'
import gsap from 'gsap'

export default class Camera{
    constructor(){
        this.experience = new Experience();
        this.sizes = this.experience.sizes;
        this.scene = this.experience.scene;
        this.canvas = this.experience.canvas;
        this.debug = this.experience.debug;
        this.preLoader = this.experience.preLoader;

        this.introDuration = 1.9; //seconds of the entry camera movement

        //Responsive framing: the perspective FOV is vertical, so on a narrow (portrait/mobile)
        //screen the horizontal field shrinks and the model looks "zoomed in". We keep a constant
        //horizontal framing by widening the vertical FOV once the aspect drops below baseAspect.
        //On landscape/desktop (aspect >= baseAspect) nothing changes.
        this.baseFov = 35;      //design FOV (used at baseAspect and wider)
        this.baseAspect = 1.5;  //at/above this aspect the desktop framing is kept untouched
        this.maxFov = 80;       //cap, to avoid extreme fish-eye on very tall phones

        //Scroll-driven camera move: while the card animation plays (0 -> 1) the camera
        //lerps from its resting pose to this final framing. Enabled after the intro.
        //While followScroll is false, the card scroll/drag input is also blocked.
        this.followScroll = false;
        this.freeRotate = false; //true once the whole scroll journey is done: the user can orbit
        this.freeRotateThreshold = 0.99; //overall progress at which free orbit unlocks (0..1)

        //The scroll drives the camera along ONE smooth Catmull-Rom path through 3 waypoints:
        //  start (resting) -> overview (card just out) -> final framing.
        //The card finishes extracting exactly at the overview waypoint (scroll = 1); the scroll
        //then keeps going to the final framing. A single spline blends the two moves seamlessly.
        this.scrollStartPos    = new THREE.Vector3(0, 15, 7);
        this.scrollEndPos      = new THREE.Vector3(-2.45, 5, 11.3);   //overview
        this.scrollFinalPos    = new THREE.Vector3(-6.03, 2.4, 5.68);
        this.scrollStartTarget = new THREE.Vector3(0, 0, 0);
        this.scrollEndTarget   = new THREE.Vector3(-8.35, 0, 0);      //overview target
        this.scrollFinalTarget = new THREE.Vector3(-6, 0, 0);

        this.posCurve = new THREE.CatmullRomCurve3([this.scrollStartPos, this.scrollEndPos, this.scrollFinalPos]);
        this.targetCurve = new THREE.CatmullRomCurve3([this.scrollStartTarget, this.scrollEndTarget, this.scrollFinalTarget]);

        //Temp vectors reused each frame to avoid allocations
        this._desiredPos = new THREE.Vector3();
        this._desiredTarget = new THREE.Vector3();

        this.setInstance()
        this.setOrbitControls();
        this.setIntro();

        //Debug
        if(this.debug.active){
            this.debugFolder = this.debug.ui.addFolder('Camera');
            this.addDebugValues();
        }
    }

    setInstance(){
        this.instance = new THREE.PerspectiveCamera(this.baseFov, this.sizes.width / this.sizes.height, 0.1, 100)
        //Initial position: high up and far back
        this.instance.position.set(0, 15, 20)
        this.scene.add(this.instance)
        this.updateFov(); //apply the responsive framing right away
    }

    updateFov(){
        //Keep the horizontal field constant on narrow screens by widening the vertical FOV.
        const aspect = this.sizes.width / this.sizes.height;
        let fov = this.baseFov;
        if(aspect < this.baseAspect){
            const half = THREE.MathUtils.degToRad(this.baseFov) * 0.5;
            fov = THREE.MathUtils.radToDeg(2 * Math.atan(Math.tan(half) * (this.baseAspect / aspect)));
            fov = Math.min(fov, this.maxFov);
        }
        this.instance.fov = fov;
        this.instance.updateProjectionMatrix();
    }

    setIntro(){
        //When the site starts (START button), fly the camera to its resting position
        this.preLoader.on('start', () => {
            gsap.to(this.instance.position, {
                duration: this.introDuration,
                x: 0,
                y: 15,
                z: 7,
                ease: 'power2.inOut',
                onComplete: () => {
                    //From now on the camera follows the card animation progress
                    this.followScroll = true;
                }
            })
        })
    }

    setOrbitControls(){
        this.controls = new OrbitControls(this.instance, this.canvas)
        this.controls.target.set(0, 0, 0)

        //First phase: the user cannot move or zoom the camera
        this.controls.enableRotate = false;
        this.controls.enableZoom = false;
        this.controls.enablePan = false;
        this.controls.enableDamping = true;
    }

    resize(){
        this.instance.aspect = this.sizes.width/this.sizes.height;
        this.updateFov(); //re-fit the framing for the new aspect (also updates the projection)
    }

    update(){
        //The scroll moves the camera along one smooth spline. The card-out point (scroll = 1)
        //sits at the curve midpoint (t = 0.5), so the overview happens just as the card finishes
        //coming out; the remaining scroll (1 -> scrollMax) carries on to the final framing.
        if(this.followScroll && this.experience.world && this.experience.world.ironDuckCard){
            const card = this.experience.world.ironDuckCard;
            const sc = card.scrollCurrent;
            const scrollMax = card.scrollMax;

            //At the very end, hand control over to free orbit + zoom (with a small hysteresis)
            const overall = THREE.MathUtils.clamp(sc / scrollMax, 0, 1);
            if(!this.freeRotate && overall >= this.freeRotateThreshold){
                this.enableFreeRotate();
            } else if(this.freeRotate && overall < this.freeRotateThreshold - 0.02){
                this.disableFreeRotate();
            }

            if(!this.freeRotate && !card.suspendSpline){
                //Map scroll to the curve param: [0,1] -> [0,0.5] (start->overview),
                //[1,scrollMax] -> [0.5,1] (overview->final)
                let t;
                if(sc <= 1){
                    t = sc * 0.5;
                } else {
                    t = 0.5 + ((sc - 1) / (scrollMax - 1)) * 0.5;
                }
                t = THREE.MathUtils.clamp(t, 0, 1);

                this.posCurve.getPoint(t, this._desiredPos);
                this.targetCurve.getPoint(t, this._desiredTarget);
                this.instance.position.lerp(this._desiredPos, 0.1);
                this.controls.target.lerp(this._desiredTarget, 0.1);
            }
            //Card out: the user orbits freely (the camera isn't driven anymore).
        }

        this.controls.update();
    }

    enableFreeRotate(){
        //Card fully out: let the user rotate the camera to explore (no zoom).
        this.freeRotate = true;
        this.controls.enableRotate = true;
    }

    disableFreeRotate(){
        //Card going back in: re-take control and resume the scroll-driven framing
        this.freeRotate = false;
        this.controls.enableRotate = false;
    }

    addDebugValues(){
        //Camera position (live: the sliders follow the values at runtime, and you can edit them)
        this.debugFolder.add(this.instance.position, 'x').min(-20).max(20).step(0.01).name('pos x').listen()
        this.debugFolder.add(this.instance.position, 'y').min(-20).max(20).step(0.01).name('pos y').listen()
        this.debugFolder.add(this.instance.position, 'z').min(-20).max(20).step(0.01).name('pos z').listen()

        //Camera target (the point the camera looks at)
        this.debugFolder.add(this.controls.target, 'x').min(-20).max(20).step(0.01).name('target x').listen().onChange(() => this.controls.update())
        this.debugFolder.add(this.controls.target, 'y').min(-20).max(20).step(0.01).name('target y').listen().onChange(() => this.controls.update())
        this.debugFolder.add(this.controls.target, 'z').min(-20).max(20).step(0.01).name('target z').listen().onChange(() => this.controls.update())

        //Field of view (responsive): base FOV, the aspect below which it widens, and the cap
        this.debugFolder.add(this, 'baseFov').min(10).max(90).step(1).name('base fov').onChange(() => this.updateFov())
        this.debugFolder.add(this, 'baseAspect').min(0.5).max(2.5).step(0.05).name('fov base aspect').onChange(() => this.updateFov())
        this.debugFolder.add(this, 'maxFov').min(40).max(120).step(1).name('fov cap (mobile)').onChange(() => this.updateFov())

        //Duration of the intro camera movement (seconds)
        this.debugFolder
            .add(this, 'introDuration')
            .min(0).max(10).step(0.1)
            .name('intro duration (s)')

        //How early the free orbit unlocks while pulling the card out (0..1)
        this.debugFolder
            .add(this, 'freeRotateThreshold')
            .min(0.1).max(1).step(0.01)
            .name('rotate unlock at')

        //Print the current camera + target values to the console
        const debugObject = {
            logCamera: () => {
                console.log('camera.position', this.instance.position)
                console.log('controls.target', this.controls.target)
            }
        }
        this.debugFolder.add(debugObject, 'logCamera').name('log camera values')
    }
}
