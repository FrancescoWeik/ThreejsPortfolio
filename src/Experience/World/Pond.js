import * as THREE from 'three'
import Experience from '../Experience.js'
import gsap from 'gsap'
import duckData from '../ducks.js'
import Duck from "./Duck.js"

// Zoom state machine values
const IDLE        = 'IDLE';
const ZOOMING_IN  = 'ZOOMING_IN';
const ZOOMED_IN   = 'ZOOMED_IN';
const ZOOMING_OUT = 'ZOOMING_OUT';

export default class Pond {
    constructor(scene) {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        this.duckList = [];

        this.zoomState = IDLE;
        this.zoomedDuck = null;
        this.raycaster = new THREE.Raycaster();
        this.mouse = new THREE.Vector2();

        this.createPond();
        this.setupClickHandler();
    }

    createPond() {
        const lakeTexture = this.resources.items.lakeTexture;

        const lakeGeometry = new THREE.PlaneGeometry(10, 10);
        const lakeMaterial = new THREE.MeshBasicMaterial({
            map: lakeTexture,
            transparent: true
        });
        this.lake = new THREE.Mesh(lakeGeometry, lakeMaterial);
        this.lake.rotation.x = -Math.PI * 0.5;
        this.lake.position.y = 0.01;
        this.scene.add(this.lake);

        for (const singleDuck of duckData) {
            const duckTexture = this.resources.duckItems[singleDuck.name];
            const newDuck = new Duck(
                singleDuck.name,
                singleDuck.title,
                singleDuck.description,
                singleDuck.profileLink,
                duckTexture
            );
            this.duckList.push(newDuck);
        }
    }

    setupClickHandler() {
        window.addEventListener('click', (event) => {
            // Ignore clicks while an animation is running
            if (this.zoomState === ZOOMING_IN || this.zoomState === ZOOMING_OUT) return;

            this.mouse.x = (event.clientX / this.experience.sizes.width) * 2 - 1;
            this.mouse.y = -(event.clientY / this.experience.sizes.height) * 2 + 1;

            this.raycaster.setFromCamera(this.mouse, this.experience.camera.instance);

            const duckMeshes = this.duckList.map(d => d.duck);
            const intersects = this.raycaster.intersectObjects(duckMeshes);

            if (intersects.length > 0) {
                // Clicked a duck — zoom in regardless of whether already zoomed
                const clickedDuck = this.duckList.find(d => d.duck === intersects[0].object);

                // If we were already zoomed on a different duck, unfreeze it first
                if (this.zoomedDuck && this.zoomedDuck !== clickedDuck) {
                    this.zoomedDuck.resumeMovement();
                }

                this.zoomedDuck = clickedDuck;
                this.zoomedDuck.HideDuckOnClick();

                this.zoomState = ZOOMING_IN;
                this.experience.camera.zoomToDuck(clickedDuck.duck.position, () => {
                    this.zoomState = ZOOMED_IN;
                });
            } else if (this.zoomState === ZOOMED_IN) {
                // Clicked outside while zoomed in — zoom back out
                if (this.zoomedDuck) {
                    this.zoomedDuck.resumeMovement();
                    this.zoomedDuck = null;
                }

                this.zoomState = ZOOMING_OUT;
                this.experience.camera.zoomOut(() => {
                    this.zoomState = IDLE;
                });
            }
        });
    }

    update() {
        for (const singleDuck of this.duckList) {
            singleDuck.update();
        }
    }
}
