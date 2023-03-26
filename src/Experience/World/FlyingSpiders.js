import Experience from '../Experience.js'
import * as THREE from 'three'

export default class FlyingSpiders{
    constructor(){
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        this.time = this.experience.time;
        this.debug = this.experience.debug
        this.flyingSpidersArray = []

        //Debug
        if(this.debug.active){
            this.debugFolder = this.debug.ui.addFolder('flyingSpiders');
        }

        //setup
        this.resource = this.resources.items.flyingSpiderModel;

        this.setModels()
    }

    setModels(){
        this.model = this.resource.scene
        const material = new THREE.MeshBasicMaterial({ color:"#000000"})

        this.createSingleSpider(new THREE.Vector3(0, 2, -6), new THREE.Vector3(0, Math.PI * 0.2 , Math.PI * 0.1), 0.5,  material)
        this.createSingleSpider(new THREE.Vector3(-3, 0 ,3), new THREE.Vector3(0, - Math.PI * 0.4 , - Math.PI * 0.1), 0.6, material)
        this.createSingleSpider(new THREE.Vector3(3, 1, -3), new THREE.Vector3(0, - Math.PI, 0), 0.7, material)
        this.createSingleSpider(new THREE.Vector3(-1, 4, 0), new THREE.Vector3(0, Math.PI * 0.5, 0), 0.9, material)

        for(let i of this.flyingSpidersArray){
            this.scene.add(i);
        }
    }

    createSingleSpider(position, rotation, scale, material){
        const element = this.model.clone();
        /*element.traverse((child) => {
            if(child instanceof THREE.Mesh){
                child.material = material;
            }
        })*/

        element.position.set(position.x, position.y, position.z);
        element.rotation.set(rotation.x, rotation.y, rotation.z);
        element.scale.set(scale, scale, scale);

        this.flyingSpidersArray.push(element);
    }

    update(){
        //move all spiders
        //First
        this.flyingSpidersArray[0].position.y -= this.time.delta * 0.007;
        this.flyingSpidersArray[0].position.x -= this.time.delta * 0.007;

        if(this.flyingSpidersArray[0].position.y <= -20){
            this.flyingSpidersArray[0].position.x = 50
            this.flyingSpidersArray[0].position.y = 50;
        }

        //Second
        this.flyingSpidersArray[1].position.y += this.time.delta * 0.005;
        this.flyingSpidersArray[1].position.x -= this.time.delta * 0.005;
        this.flyingSpidersArray[1].position.z -= this.time.delta * 0.005;
        //console.log(this.flyingSpidersArray[1].position.z + " " + this.flyingSpidersArray[1].position.x + " " + this.flyingSpidersArray[1].position.y);

        if(this.flyingSpidersArray[1].position.y >= 30){
            this.flyingSpidersArray[1].position.x = 47;
            this.flyingSpidersArray[1].position.y = - 50;
            this.flyingSpidersArray[1].position.z = 53;

        }

        //Third
        this.flyingSpidersArray[2].position.x += this.time.delta * 0.008;
        //console.log(this.flyingSpidersArray[3].position.z)    
        if(this.flyingSpidersArray[2].position.x >= 30){
            this.flyingSpidersArray[2].position.x = -50;
        }
        
        //Fourth
        this.flyingSpidersArray[3].position.z += this.time.delta * 0.01;
        //console.log(this.flyingSpidersArray[3].position.z)
        if(this.flyingSpidersArray[3].position.z >= 20){
            this.flyingSpidersArray[3].position.z = -50;
        }


    }
}