import * as THREE from 'three'
import Experience from '../Experience.js'
import { MeshStandardMaterial, sRGBEncoding } from 'three';
import gsap from 'gsap'
import duckData from '../ducks.js'
import Duck from "./Duck.js"

export default class Pond {
    constructor(scene) {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        this.duckList = [];

        this.createPond();
    }

    createPond() {
        // 1. Load the textures
        //const grassTexture = this.loader.load('/textures/grass.png');
        const lakeTexture = this.resources.items.lakeTexture;   
        // 2. Create the Ground (Grass)
        //const groundGeometry = new THREE.PlaneGeometry(20, 20);
        //const groundMaterial = new THREE.MeshBasicMaterial({ map: grassTexture });
        //this.ground = new THREE.Mesh(groundGeometry, groundMaterial);
        
        // Rotate it to lie flat on the floor
        //this.ground.rotation.x = -Math.PI * 0.5; 
        //this.scene.add(this.ground);

        // 3. Create the Lake
        // We make it slightly smaller than the ground
        const lakeGeometry = new THREE.PlaneGeometry(10, 10);
        const lakeMaterial = new THREE.MeshBasicMaterial({ 
            map: lakeTexture, 
            transparent: true // Crucial if your lake isn't a perfect square
        });
        this.lake = new THREE.Mesh(lakeGeometry, lakeMaterial);

        // Position it just slightly above the grass (Z-stacking)
        // In Three.js, since we rotated the ground, "up" is now the Y axis
        this.lake.rotation.x = -Math.PI * 0.5;
        this.lake.position.y = 0.01; 
        

        this.scene.add(this.lake);
        console.log(this.resources.duckItems);
        for(const singleDuck of duckData){
            const textureName = singleDuck.name
            console.log("duck name is " + singleDuck.name + " texture is " + this.resources.duckItems[textureName]);
            const duckTexture = this.resources.duckItems[textureName];

            const newDuck = new Duck(singleDuck.name, singleDuck.title, singleDuck.description, singleDuck.profileLink, duckTexture, this.scene);
            this.duckList.push(newDuck);
        }
    }

    update(){
        for(const singleDuck of this.duckList){
            singleDuck.update();
        }
    }
}