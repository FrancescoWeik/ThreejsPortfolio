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

        //Scroll-driven camera move: while the card animation plays (0 -> 1) the camera
        //lerps from its resting pose to this final framing. Enabled after the intro.
        //While followScroll is false, the card scroll/drag input is also blocked.
        this.followScroll = false;
        this.freeRotate = false; //true once the card is (almost) out: the user can orbit
        this.freeRotateThreshold = 0.9; //progress at which free orbit unlocks (0..1)
        this.scrollStartPos = new THREE.Vector3(0, 15, 7);
        this.scrollEndPos = new THREE.Vector3(-2.45, 5, 11.3);
        this.scrollStartTarget = new THREE.Vector3(0, 0, 0);
        this.scrollEndTarget = new THREE.Vector3(-8.35, 0, 0);

        //Once the card is fully out, the scroll becomes a zoom. The maximum distance is the
        //one reached at the end of the animation (can't pull further back); the minimum is
        //up to the user, so they can only zoom IN to explore, never out past the end framing.
        this.minZoomDistance = 5;

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
        this.instance = new THREE.PerspectiveCamera(35, this.sizes.width / this.sizes.height, 0.1, 100)
        //Initial position: high up and far back
        this.instance.position.set(0, 15, 20)
        this.scene.add(this.instance)
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
        this.instance.updateProjectionMatrix()
    }

    update(){
        //While following the scroll, lerp the camera toward its final framing
        //using the card's (already smoothed) animation progress
        if(this.followScroll && this.experience.world && this.experience.world.ironDuckCard){
            const progress = THREE.MathUtils.clamp(this.experience.world.ironDuckCard.scrollCurrent, 0, 1);

            //When the card is (almost) out, hand control over to free orbit + zoom (and back).
            //A small hysteresis avoids flickering around the threshold.
            if(!this.freeRotate && progress >= this.freeRotateThreshold){
                this.enableFreeRotate();
            } else if(this.freeRotate && progress < this.freeRotateThreshold - 0.02){
                this.disableFreeRotate();
            }

            //While not exploring, the camera follows the animation with a smoothed lerp
            if(!this.freeRotate){
                this._desiredPos.lerpVectors(this.scrollStartPos, this.scrollEndPos, progress);
                this._desiredTarget.lerpVectors(this.scrollStartTarget, this.scrollEndTarget, progress);
                this.instance.position.lerp(this._desiredPos, 0.1);
                this.controls.target.lerp(this._desiredTarget, 0.1);
            }
        }

        this.controls.update();
    }

    enableFreeRotate(){
        //Card fully out: let the user rotate the camera AND zoom to explore the scene.
        this.freeRotate = true;
        this.controls.enableRotate = true;

        //Scroll now zooms. Maximum = the distance reached at the end of the animation (the
        //user can't pull further back); minimum = user-configurable, so they can only zoom IN.
        this.controls.maxDistance = this.instance.position.distanceTo(this.controls.target);
        this.controls.minDistance = this.minZoomDistance;
        this.controls.enableZoom = true;
    }

    disableFreeRotate(){
        //Card going back in: re-take control and resume the scroll-driven framing
        this.freeRotate = false;
        this.controls.enableRotate = false;
        this.controls.enableZoom = false;
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

        //Field of view
        this.debugFolder
            .add(this.instance, 'fov')
            .min(10).max(90).step(1)
            .onChange(() => this.instance.updateProjectionMatrix())

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

        //Closest zoom-in distance once the card is fully out
        this.debugFolder
            .add(this, 'minZoomDistance')
            .min(1).max(20).step(0.5)
            .name('min zoom distance')
            .onChange(() => { this.controls.minDistance = this.minZoomDistance })

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
