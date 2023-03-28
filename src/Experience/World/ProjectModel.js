import Experience from '../Experience.js'
import * as THREE from 'three'

export default class ProjectModel{
    constructor(resource, resourceTexture, position){
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.sizes = this.experience.sizes;
        this.resources = this.experience.resources;
        this.time = this.experience.time;
        this.debug = this.experience.debug
        this.position = position;

        //setup
        this.resource = resource;
        
        resourceTexture.encoding = THREE.sRGBEncoding
        this.setModel(resourceTexture)
    }

    setModel(resourceTexture){
        this.model = this.resource.scene
        console.log(this.position);
        this.model.position.set(this.position.x, this.position.y, this.position.z);

        this.model.traverse((child) => {
            if(child instanceof THREE.Mesh){
                child.castShadow = true;
                child.material = new THREE.MeshStandardMaterial({map:resourceTexture}) 
            }
        })
    }
}