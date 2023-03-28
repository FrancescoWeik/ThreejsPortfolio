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
        this.initialPosition = new THREE.Vector3(-4,4,8);

        this.checkPcOrPhoneZoom();
        this.setInstance()
        this.setOrbitControls();

        //Debug
        if(this.debug.active){
            this.debugFolder = this.debug.ui.addFolder('Camera');
            this.addDebugValues();
        }

    }

    checkPcOrPhoneZoom(){
        if(this.sizes.width >=969){
            //PC
            this.initialPosition = new THREE.Vector3(-4,4,8);
        }else{
            //Phone
            this.initialPosition = new THREE.Vector3(-4,9,18);
        }
    }

    setInstance(){
        this.instance = new THREE.PerspectiveCamera(35, this.sizes.width / this.sizes.height, 0.1, 100)
        this.instance.position.set(this.initialPosition.x,this.initialPosition.y,this.initialPosition.z)
        this.scene.add(this.instance)
    }

    setOrbitControls(){
        this.controls = new OrbitControls(this.instance, this.canvas)
        this.controls.enableDamping = true;

        this.controls.enablePan = false
        this.controls.enableRotate = true;
        this.controls.enableZoom = true;
        //this.controls.rotateSpeed = 1.2
        //this.controls.zoomSpeed = 0.8
        //this.controls.target.z = -1

        this.controls.minDistance = 0
        this.controls.maxDistance = 22
        this.controls.minAzimuthAngle = -Math.PI *0.5
        this.controls.maxAzimuthAngle = 0
        //this.controls.minPolarAngle = Math.PI *0.2
        this.controls.maxPolarAngle = Math.PI * 0.5

    }

    resize(){
        this.checkPcOrPhoneZoom();
        this.instance.aspect = this.sizes.width/this.sizes.height;
        this.instance.updateProjectionMatrix()
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
        this.controls.maxDistance = Infinity
        this.controls.minAzimuthAngle = Infinity
        this.controls.maxAzimuthAngle = Infinity
        console.log("yeah")
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