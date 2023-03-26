import Experience from '../Experience.js'
import * as THREE from 'three'

export default class Television{
    constructor(){
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        this.time = this.experience.time;
        this.debug = this.experience.debug
        this.televisionObjects = []
        this.televisionButton = null;
        this.televisionBackButton = null;
        this.open = true;
        this.clickTime = 0;
        this.maxClicks = 11;
        this.monitor = null;
        this.broken = false;

        //setup
        this.resource = this.resources.items.TelevisionModel;
        this.texture = this.resources.items.VideoTexture;
        this.blackTexture = this.resources.items.BlackTexture;
        this.notFoundTexture = this.resources.items.NotFoundTexture;
        console.log(this.notFoundTexture);
        this.setModel();
    }

    setModel(){
        const material = new THREE.MeshBasicMaterial({map:this.texture});
        this.model = this.resource.scene
        this.model.traverse((child) => {
            if(child instanceof THREE.Mesh){
                console.log(child);
                //child.receiveShadow = true;
                switch(child.name){
                    case "ButtonTV": child.material = new THREE.MeshStandardMaterial({color: "#ff2400"}); this.televisionButton=child; break;
                    case "MonitorTv": child.material = material; this.televisionObjects.push(child); this.monitor = child; break;
                    case "ReturnTV": child.material = new THREE.MeshStandardMaterial({color: "#ff2400"}); this.televisionBackButton = child; break;
                    case "AntennaTV": child.material = new THREE.MeshStandardMaterial({color: "#000000"}); this.televisionObjects.push(child); break;
                    case "OuterMonitorTV": child.material = new THREE.MeshStandardMaterial({color: "#000000"}); this.televisionObjects.push(child); break;
                    case "cableTV": child.material = new THREE.MeshStandardMaterial({color: "#000000"}); this.televisionObjects.push(child); break;
                    default: break;
                }
            }
        })
        this.scene.add(this.model)
    }

    changeTexture(){
        this.clickTime++;
        if(!this.broken){
            if(this.clickTime>this.maxClicks){
                //Chjange to broken tv
                this.broken = true;
                console.log("changingToBroken....");
                this.monitor.material.map = this.notFoundTexture;
                this.monitor.material.needsUpdate = true;
            }else{
                this.open = !this.open;
                if(this.open){
                    //change to video texture
                    this.monitor.material.map = this.texture;
                    this.monitor.material.needsUpdate = true;
                }else{
                    //change to close texture
                    this.monitor.material.map = this.blackTexture;
                    this.monitor.material.needsUpdate = true;
                }
            }
        }

        console.log("change texture...");
    }
}