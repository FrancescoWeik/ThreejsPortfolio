import Experience from '../Experience.js'
import * as THREE from 'three'

export default class ButlerModel{
    constructor(){
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        this.time = this.experience.time;
        this.debug = this.experience.debug

        //setup
        this.resource = this.resources.items.ButlerModel;
        this.model = new THREE.Group();

        this.setModel()
    }

    setModel(){
        this.model.position.set(0.1,-1,0.14);

        const textures = {}
        textures.knifeTexture = this.resources.items.KnifeTexture;
        textures.cameraTexture = this.resources.items.CameraTexture;
        
        textures.knifeTexture.encoding = THREE.sRGBEncoding
        textures.cameraTexture.encoding = THREE.sRGBEncoding

        const knifeMaterial = new THREE.MeshStandardMaterial({map: textures.knifeTexture})
        const cameraMaterial = new THREE.MeshStandardMaterial({map: textures.cameraTexture})

        console.log(this.resource.scene);

        this.resource.scene.traverse((child) => {
            if(child instanceof THREE.Mesh){
                child.castShadow = true;
                switch(child.name){
                    case "Knife": console.log(child.name); child.material = knifeMaterial; break;
                    case "Camera":  console.log(child.name); child.material = cameraMaterial; break;
                }
            }
        })

        this.model.add(this.resource.scene);
    }
}