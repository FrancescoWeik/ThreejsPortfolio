import * as THREE from 'three'
import Experience from '../Experience.js'
import { MeshStandardMaterial, sRGBEncoding } from 'three';
import gsap from 'gsap'
import Pond from "./Pond.js"

export default class Duck {
    constructor(duckName, duckTitle, duckDescription, duckLink, duckTexture, scene) {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.sizes = this.experience.sizes;
        this.resources = this.experience.resources;
        this.duckName = duckName;
        this.duckTitle = duckTitle;
        this.duckDescription = duckDescription;
        this.duckLink = duckLink;

        this.speed = 0.01;
        this.targetPosition = new THREE.Vector3(this.getRandomBound(), 0.53, this.getRandomBound());

        this.spawnDuck(duckTexture);
    }

    spawnDuck(duckTexture) {
        // 1. Load the textures
        //const grassTexture = this.loader.load('/textures/grass.png');

        // 2. Create the Ground (Grass)
        //const groundGeometry = new THREE.PlaneGeometry(20, 20);
        //const groundMaterial = new THREE.MeshBasicMaterial({ map: grassTexture });
        //this.ground = new THREE.Mesh(groundGeometry, groundMaterial);
        
        // Rotate it to lie flat on the floor
        //this.ground.rotation.x = -Math.PI * 0.5; 
        //this.scene.add(this.ground);

        // 3. Create the Lake
        // We make it slightly smaller than the ground
        const duckGeometry = new THREE.PlaneGeometry(2, 2);
        const duckMaterial = new THREE.MeshBasicMaterial({ 
            map: duckTexture, 
            transparent: true, // Crucial if your lake isn't a perfect square,
            alphaTest: 0.5
        });
        this.duck = new THREE.Mesh(duckGeometry, duckMaterial);

        // Position it just slightly above the grass (Z-stacking)
        // In Three.js, since we rotated the ground, "up" is now the Y axis
        this.duck.rotation.x = 0;//-Math.PI * 0.5;
        this.duck.position.y = 0.53; 
        
        this.scene.add(this.duck);
    }

    getRandomBound() {
        return (Math.random() - 0.5) * 4; // Returns a value between -2 and 2
    }

    update(){
        console.log("move duck to position " + this.targetPosition);
        this.duck.position.lerp(this.targetPosition, this.speed);   

        if (this.duck.position.distanceTo(this.targetPosition) < 0.1) {
            // 3. Pick a new random target
            this.targetPosition.x = this.getRandomBound();
            this.targetPosition.z = this.getRandomBound();
        }
    }
}