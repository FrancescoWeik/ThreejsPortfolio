import Experience from '../Experience.js'
import * as THREE from 'three'
import gsap from 'gsap'

export default class Spider{
    constructor(){
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        this.time = this.experience.time;
        this.debug = this.experience.debug
        this.projectNumber = 0;
        this.numberOfProjects = 3;
        this.currentProject = null;
        this.spiderGroup = new THREE.Group();
        this.pip = this.experience.world.pip;
        this.littleGuy = this.experience.world.littleGuy
        this.bikingImprover = this.experience.world.bikingImprover
        this.butler = this.experience.world.butler

        //Debug
        if(this.debug.active){
            this.debugFolder = this.debug.ui.addFolder('Spider');
        }

        //setup
        this.resource = this.resources.items.spiderModel;

        this.setProjects();
        this.setModel()
        this.setAnimation();
    }

    setProjects(){
        this.projectResources = [];
        this.setProjectsTextures();
    }

    setProjectsTextures(){
      this.projectResources.push(this.pip.model)
      this.projectResources.push(this.littleGuy.model)
      this.projectResources.push(this.butler.model)
      this.projectResources.push(this.bikingImprover.model)
    }

    setModel(){
        this.model = this.resource.scene
        this.model.traverse((child) => {
            if(child instanceof THREE.Mesh){
                child.castShadow = true;
                //child.material.roughness = 1
                //child.material.metalness = 0.5
            }
        })
        //this.model.position.set(3, 0, 0)
        this.spiderGroup.position.set(4, 0, 0.3)
        this.spiderGroup.add(this.model);
        this.model.position.set(0, 0, -0.5);
        //this.scene.add(this.model)
        this.spiderGroup.visible = false;
        this.scene.add(this.spiderGroup)
    }

    setAnimation(){
        //console.log(this.resource.animations[1])
        this.animation = {}
        this.animation.mixer = new THREE.AnimationMixer(this.model)

        this.animation.actions = {}
        this.animation.actions.idle = this.animation.mixer.clipAction(this.resource.animations[1]);
        
        this.animation.actions.current = this.animation.actions.idle;
        this.animation.actions.current.play();
    }

    moveToCenter(){
        this.spiderGroup.visible = true;
        console.log("I need to move!")
        gsap.to(this.spiderGroup.position, { duration:1, delay: 0.5, x: 0 })
        gsap.to(this.spiderGroup.position, { 
                duration:1, delay: 1.5, y: -1.6, 
                onComplete: () => this.createProjectObject()
        })
    }

    createProjectObject(){
        console.log("woah");
        //remove current project
        if(this.currentProject){
            console.log(this.currentProject);
            this.scene.remove(this.currentProject);
        }
        this.projectNumber ++;
        if(this.projectNumber > this.numberOfProjects){
            this.projectNumber = 0;
        }
        this.experience.projectNumber = this.projectNumber;
        this.experience.changePictureProject(this.projectNumber);
        //create project based on number
        this.scene.add(this.projectResources[this.projectNumber]);
        this.currentProject = this.projectResources[this.projectNumber]

        //console.log(this.currentProject)
        this.goOut();      
    }

    createProjectFromControls(){
        console.log("changing project via controls buttons");
        //remove current project
        if(this.currentProject){
            console.log(this.currentProject);
            this.scene.remove(this.currentProject);
        }
        this.projectNumber ++;
        if(this.projectNumber > this.numberOfProjects){
            this.projectNumber = 0;
        }
        this.experience.projectNumber = this.projectNumber;
        this.experience.changePictureProject(this.projectNumber);
        //create project based on number
        this.scene.add(this.projectResources[this.projectNumber]);
        this.currentProject = this.projectResources[this.projectNumber]
    }

    goOut(){
        console.log("I need to go out!")
        gsap.to(this.spiderGroup.position, { duration:1, delay: 0.2, y: 0 })
        gsap.to(this.spiderGroup.rotation, {duration:1, delay:0.2, y:-Math.PI/2})
        gsap.to(this.spiderGroup.position, { 
                duration:1, delay: 1.2, z: -5, 
                onComplete: () => {
                    this.resetSpider(); 
                    this.activateBell()
                }
        })
    }

    resetSpider(){
        this.spiderGroup.visible = false;
        this.spiderGroup.position.set(4, 0, 0.3)
        this.spiderGroup.rotation.set(0, 0, 0)
    }

    activateBell(){
        this.experience.activateBell();
    }

    update(){
        //this.projectResources[this.projectNumber].rotation.y += this.time.delta * 0.0001;
        this.animation.mixer.update(this.time.delta * 0.001)
    }
}