import * as THREE from 'three'
import Experience from '../Experience.js'

export default class Duck {
    constructor(duckName, duckTitle, duckDescription, duckLink, duckTexture) {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.sizes = this.experience.sizes;
        this.resources = this.experience.resources;
        this.duckName = duckName;
        this.duckTitle = duckTitle;
        this.duckDescription = duckDescription;
        this.duckLink = duckLink;

        this.speed = 0.008;
        this.isFrozen = false;
        this.targetPosition = new THREE.Vector3(this.getRandomBound(), 0.53, this.getRandomBound());

        this.spawnDuck(duckTexture);
    }

    spawnDuck(duckTexture) {
        const duckGeometry = new THREE.PlaneGeometry(1, 1);
        const duckMaterial = new THREE.MeshBasicMaterial({
            map: duckTexture,
            transparent: true,
            alphaTest: 0.5
        });
        this.duck = new THREE.Mesh(duckGeometry, duckMaterial);
        this.duck.rotation.x = 0;
        this.duck.position.set(this.getRandomBound(), 0.53, this.getRandomBound());
        this.scene.add(this.duck);
    }

    // Called when this duck is clicked and the camera zooms in on it.
    // Placeholder for future animations — stops movement for now.
    HideDuckOnClick() {
        this.isFrozen = true;
    }

    // Called when the camera zooms back out so the duck resumes wandering.
    resumeMovement() {
        this.isFrozen = false;
    }

    getRandomBound() {
        // -3 to 3, well within the 10x10 lake
        return (Math.random() - 0.5) * 6;
    }

    update() {
        if (this.isFrozen) return;

        this.duck.position.lerp(this.targetPosition, this.speed);

        if (this.duck.position.distanceTo(this.targetPosition) < 0.1) {
            this.targetPosition.x = this.getRandomBound();
            this.targetPosition.z = this.getRandomBound();
        }
    }
}
