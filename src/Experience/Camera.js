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
        this.experienceControls = null; //initialized on controls...
        this.initialPosition = new THREE.Vector3(0,4,9.57);
        this.initialMinZoom = 2;
        this.initialMaxZoom = 0.8;

        this.checkPcOrPhoneZoom();
        this.setInstance()
        this.setOrbitControls();

        this.mouse = new THREE.Vector2();
        window.addEventListener('mousemove', (event) => {
            this.mouse.x = (event.clientX / this.sizes.width) - 0.5;
            this.mouse.y = (event.clientY / this.sizes.height) - 0.5;
        });

    }

    checkPcOrPhoneZoom(){
        if(this.sizes.width >=969){
            //PC
            this.initialPosition = new THREE.Vector3(-0,5,9.57);
            this.initialMinZoom = 0.5
            this.initialMaxZoom = 2
        }else{
            console.log("PHONE");
            //Phone
            this.initialPosition = new THREE.Vector3(0,9,18);
            this.initialMinZoom = 0.5
            this.initialMaxZoom = 0.8
        }
    }
    
   setInstance() {
    this.frustumSize = 10; 
    const aspect = this.sizes.width / this.sizes.height;

    this.instance = new THREE.OrthographicCamera(
        this.frustumSize * aspect / -2,
        this.frustumSize * aspect / 2,
        this.frustumSize / 2,
        this.frustumSize / -2,
        0.1,
        1000 // Increased Far plane just in case
    );

    this.instance.position.copy(this.initialPosition);
    this.scene.add(this.instance);
}

    setOrbitControls(){
        this.controls = new OrbitControls(this.instance, this.canvas)

        this.controls.enableDamping = true;

        this.controls.enablePan = false
        this.controls.enableRotate = true;
        //this.controls.enableZoom = true;
        //this.controls.rotateSpeed = 1.2
        //this.controls.zoomSpeed = 0.8
        //this.controls.target.z = -1

        this.controls.minDistance = 0
        this.controls.maxDistance = 22
        this.controls.maxZoom = this.initialMaxZoom || 2
        this.controls.minZoom = this.initialMinZoom || 0.5;
        //this.controls.zoom = this.initialZoom;

        const currentPolarAngle = this.controls.getPolarAngle();

        // 4. Lock it
        this.controls.minPolarAngle = currentPolarAngle;
        this.controls.maxPolarAngle = currentPolarAngle;

        this.controls.minPolarAngle = 0.1;
        this.controls.maxPolarAngle =  Math.PI * 0.5 *0.7;
        this.controls.minAzimuthAngle = -Math.PI * 0.5 * 0.7;
        this.controls.maxAzimuthAngle = Math.PI * 0.5 * 0.7;
        /*
        this.controls.minAzimuthAngle = -Math.PI *0.5
        this.controls.maxAzimuthAngle = 0
        //this.controls.minPolarAngle = Math.PI *0.2
        this.controls.maxPolarAngle = Math.PI * 0.5*/
        // --- The fix is here ---
        // Locking the vertical angle to 90 degrees (Math.PI / 2) 
        // keeps the camera strictly on the horizon.
    }

    resize() {
        this.checkPcOrPhoneZoom();
        
        // Update the Orthographic frustum based on new aspect ratio
        const aspect = this.sizes.width / this.sizes.height;
        this.instance.left = this.frustumSize * aspect / -2;
        this.instance.right = this.frustumSize * aspect / 2;
        this.instance.top = this.frustumSize / 2;
        this.instance.bottom = this.frustumSize / -2;
        
        this.instance.updateProjectionMatrix();
    }

    moveToProjects(){
        this.stopCameraMovement()
        //this.experienceControls = this.experience.controls;
        gsap.to(this.instance.position, { 
                    duration:1, x: -1.57, y: 1.57, z: 2.174, 
                    onComplete: () => {
                        //this.experienceControls.removeProjectsCollider();
                        this.experienceControls.changeToProjectButtonsCollider();
                    }
                })
        gsap.to(this.controls.target, {
                    duration:1, x: -1.45, y: 1.46, z: -1.7
                })
    }

    
    moveToAbout(){
        this.stopCameraMovement()
        gsap.to(this.instance.position, { 
                    duration:1, x: -1.31, y: 0.168, z: 1.708,
                    onComplete: () => {
                        //this.experienceControls.removeProjectsCollider();
                        this.experienceControls.changeToAboutButtonsColliders();
                    }
                })
        gsap.to(this.controls.target, {
                    duration:1, x: 1.9, y: 0.38, z: 1.87 
                })
    }

    moveToTelevision(){
        this.stopCameraMovement();
        if(this.sizes.width<980){
            gsap.to(this.instance.position, { 
                duration:1, x: -8.321, y:1.7, z: -2,
                onComplete: () => {
                    //this.experienceControls.removeProjectsCollider();
                    this.experienceControls.changeToTelevisionButtonsColliders();
                }
            })
            gsap.to(this.controls.target, {
                duration:1, x: -3, y: 1.7, z: -1.99
            })
        }else{
            gsap.to(this.instance.position, { 
                duration:1, x: -5.321, y:1.7, z: -2,
                onComplete: () => {
                    //this.experienceControls.removeProjectsCollider();
                    this.experienceControls.changeToTelevisionButtonsColliders();
                }
            })
            gsap.to(this.controls.target, {
                duration:1, x: -3, y: 1.7, z: -1.99
            })
        }
    }

    moveToStart(){
        //this.experienceControls = this.experience.controls;
        gsap.to(this.instance.position, { 
                    duration:1, x: this.initialPosition.x, y:this.initialPosition.y, z: this.initialPosition.z,
                    onComplete: () => {
                        this.experienceControls.changeToInitialSceneColliders();
                        this.enableCameraMovement();
                    }
                })
        gsap.to(this.controls.target, {
                    duration:1, x: 0, y: 0, z: 0.3
                })
    }

    update(){
        this.controls.update();
        //console.log(this.instance.position);
        //console.log(this.controls.target);
        // Subtle parallax sway
        // This shifts the camera slightly based on mouse position
        const parallaxX = this.mouse.x * 0.5;
        const parallaxY = -this.mouse.y * 0.5 * 0.7;
        
        // Smoothly interpolate the camera position for a "weighty" feel
        this.instance.position.x += (this.initialPosition.x + parallaxX - this.instance.position.x) * 0.05;
        this.instance.position.y += (this.initialPosition.y + parallaxY - this.instance.position.y) * 0.05;

    }

    stopCameraMovement(){
        this.controls.enableRotate = false
        this.controls.enableZoom = false
        this.controls.enableDamping = false
        this.controls.enablePan = false
    }

    enableCameraMovement(){
        this.controls.enableRotate = true
        this.controls.enableZoom = true
        this.controls.enableDamping = true
        //this.controls.enablePan = true
    }

    enableFullCameraMovement(){
        this.controls.enableRotate = true
        this.controls.enableZoom = true
        this.controls.enableDamping = true
        this.controls.enablePan = true
        this.controls.minDistance = 0
        this.controls.maxDistance = 22
        this.controls.minAzimuthAngle = Infinity
        this.controls.maxAzimuthAngle = Infinity
        //this.controls.minPolarAngle = Math.PI *0.2
        //this.controls.maxPolarAngle = Math.PI * 0.55
    }

    addDebugValues(){
        this.debugFolder
                .add(this.controls, 'enablePan')
                .name('enableFullCameraMovement')
                .onChange(() =>{
                    this.enableFullCameraMovement()
                })
    }
}