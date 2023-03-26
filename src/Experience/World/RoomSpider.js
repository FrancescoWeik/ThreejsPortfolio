import Experience from '../Experience.js'
import * as THREE from 'three'
import { MeshStandardMaterial, sRGBEncoding } from 'three';
import gsap from 'gsap'

export default class RoomSpider{
    constructor(){
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        this.time = this.experience.time;
        this.debug = this.experience.debug
        this.camera = this.experience.camera;
        this.mouse = this.experience.sizes.mouse;
        this.raycaster = new THREE.Raycaster();
        this.currentIntersect = null;
        this.bellObjects = [];
        this.projectPicture = null;
        this.canUpdate = true;

        //Debug
        if(this.debug.active){
            this.debugFolder = this.debug.ui.addFolder('roomSpider');
        }

        //setup
        this.resource = this.resources.items.roomModel;
        this.arrow = this.resources.items.arrowModel;
        this.secondaryFloor = this.resources.items.secondaryFloor;

        this.setModel()
        this.setTexture();
        //this.addClickHandler();
    }

    setModel(){
        this.model = this.resource.scene
        this.model.receiveShadow = true;

        this.arrowModel = this.arrow.scene;
        this.arrowModel.receiveShadow = true;

        this.secondaryFloorModel = this.secondaryFloor.scene;
        this.secondaryFloorModel.scale.x = 1;
        this.secondaryFloorModel.scale.z = 1;


        this.scene.add(this.model, this.arrowModel, this.secondaryFloorModel)
    }

    setTexture(){
        this.textures = {}

        this.textures.floorColor = this.resources.items.floorColorTexture;
        this.textures.floorColor.encoding = THREE.sRGBEncoding
        //do not use displacement fro this type of floor...

        this.textures.wallLeftColor = this.resources.items.wallLeftColor;
        this.textures.wallLeftColor.encoding = THREE.sRGBEncoding

        this.textures.wallRightColor = this.resources.items.wallRightColor;
        this.textures.wallRightColor.encoding = THREE.sRGBEncoding

        this.textures.bellBoxColor = this.resources.items.bellBoxColor;
        this.textures.bellBoxColor.encoding = THREE.sRGBEncoding

        this.textures.aboutColor = this.resources.items.AboutColor;
        this.textures.aboutColor.encoding = THREE.sRGBEncoding

        
        this.projectTextures = [];
        this.setProjectTextures();

        const floorBakedMaterial = new THREE.MeshStandardMaterial({ map: this.textures.floorColor})
        //floorBakedMaterial.side = THREE.DoubleSide;
        const wallLeftBakedMaterial = new THREE.MeshStandardMaterial({ map: this.textures.wallLeftColor})
        const wallRightBakedMaterial = new THREE.MeshStandardMaterial({ map: this.textures.wallRightColor})
        const bellBoxMaterial = new THREE.MeshStandardMaterial({ map: this.textures.bellBoxColor })
        const bellMaterial = new THREE.MeshStandardMaterial({color: "#b68715"})
        bellMaterial.roughness = 0.1;
        bellMaterial.metalness = 1;
        const pictureLeftMaterial = new THREE.MeshStandardMaterial({map: this.projectTextures[0]})
        const bellPlatformMaterial = new THREE.MeshStandardMaterial({color: "#2B2A29"})
        const aboutMaterial =  new THREE.MeshStandardMaterial({map: this.textures.aboutColor})

        this.model.traverse((child) => {
            if(child instanceof THREE.Mesh){
                console.log(child);
                child.receiveShadow = true;
                switch(child.name){
                    case "Floor": child.material = floorBakedMaterial; break;
                    case "WallLeft": child.material = wallLeftBakedMaterial; break;
                    case "WallRight": child.material = wallRightBakedMaterial; break;
                    case "PictureLeft": child.material = pictureLeftMaterial; this.projectPicture = child; break;
                    case "PictureRight": child.material = aboutMaterial; break;
                    case "bellSpehere": child.material = bellMaterial; this.bellObjects.push(child); break;
                    case "bellCylinder": child.material = bellMaterial; this.bellObjects.push(child); break;
                    case "bellBody": child.material = bellMaterial; this.bellObjects.push(child); break;
                    case "BellPlatform": child.material = bellPlatformMaterial; this.bellObjects.push(child); break;
                    case "BellBox": child.material = bellBoxMaterial; break;
                    default: break;
                }
            }
        })

        this.arrowModel.traverse((child) =>{
            if(child instanceof THREE.Mesh){
                child.material = new THREE.MeshStandardMaterial({color: "#ff2400"})
            }
        })

        this.secondaryFloorTexture = this.resources.items.secondaryFloorTexture;
        this.secondaryFloorModel.traverse((child) =>{
            if(child instanceof THREE.Mesh){
                child.material = new THREE.MeshStandardMaterial({map: this.secondaryFloorTexture})
            }
        })
        //console.log(this.bellGroup)
    }
    
    setProjectTextures(){
        //SAME ORDER AS THE ONES IN SPIDER!
        this.projectTextures.push(this.resources.items.PipColor)
        this.projectTextures.push(this.resources.items.LittleGuyColor)
        this.projectTextures.push(this.resources.items.ButlerColor)
        this.projectTextures.push(this.resources.items.BikingImproverColor)

        for(let i of this.projectTextures){
            i.encoding = THREE.sRGBEncoding;
        }
    }  

    changeProjectPicture(position){
        this.projectPicture.material.map = this.projectTextures[position];
        this.projectPicture.material.needsUpdate = true;
    }

    removeArrow(){
        //this.arrowModel.visible = false;
        this.canUpdate = false;
        if(this.arrowModel){
            gsap.to(this.arrowModel.children[0].scale, { 
                duration:1, x: 0, y: 0, z: 0,
                onComplete: () => {
                    this.arrowModel.traverse((child) =>{
                        if(child instanceof THREE.Mesh){
                            child.geometry.dispose();
            
                            for(const key in child.material){
                                const value = child.material[key]
                                if(value && typeof value.dispose === 'function'){
                                    value.dispose();
                                }
                            }
                        }
                    })
                    this.scene.remove(this.arrowModel);
                    this.arrowModel = null;
                }
            })
        }
    }

    update(){
        //change arrowModel position 
        if(this.arrowModel && this.canUpdate){
            //this.arrowModel.position.x = Math.cos(this.time.elapsed * 0.005) * 0.02
            //this.arrowModel.position.y = Math.abs(Math.sin(this.time.elapsed * 0.005) * 0.2)
            //console.log(this.arrowModel.scale);
            this.arrowModel.children[0].scale.x = Math.abs(Math.sin(this.time.elapsed * 0.002) * 0.03) + 0.25 //0.25 is the min size, 0.002 is the speed, 0.03 has to do with the size too
            this.arrowModel.children[0].scale.y = Math.abs(Math.sin(this.time.elapsed * 0.002) * 0.03) + 0.25
            this.arrowModel.children[0].scale.z = Math.abs(Math.sin(this.time.elapsed * 0.002) * 0.03) + 0.25
        }
    }
}