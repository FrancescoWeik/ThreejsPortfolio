import * as THREE from 'three'
import Experience from '../Experience.js'
import gsap from 'gsap'
import duckData from '../ducks.js'
import Duck from "./Duck.js"
import DuckPopup from "./DuckPopup.js"

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
        this.popup = new DuckPopup();

        this.createPond();
        this.setupClickHandler();
    }

    createPond() {
        // ── Outer lake (background) ─────────────────────────────────────────
        const outerLakeTexture = this.resources.items.outerLakeTexture;
        const outerLakeMaterial = new THREE.MeshBasicMaterial({
            map: outerLakeTexture,
            transparent: true
        });
        // Both textures are 2816×1536 px — same canvas, same world size.
        // Aspect ratio 2816/1536 = 11/6  →  PlaneGeometry(22, 12)
        const W = 22, H = 12;

        // Inner lake first (lower y = rendered below outer lake)
        const lakeTexture = this.resources.items.lakeTexture;
        const lakeMaterial = new THREE.MeshBasicMaterial({
            map: lakeTexture,
            transparent: true
        });
        this.lake = new THREE.Mesh(new THREE.PlaneGeometry(10, 10), lakeMaterial);
        this.lake.rotation.x = -Math.PI * 0.5;
        this.lake.position.y = 0.0;
        this.scene.add(this.lake);

        // Outer lake on top (higher y = rendered over the water so shore/grass overlaps edges)
        this.outerLake = new THREE.Mesh(new THREE.PlaneGeometry(10, 10), outerLakeMaterial);
        this.outerLake.rotation.x = -Math.PI * 0.5;
        this.outerLake.position.y = 0.01;
        this.scene.add(this.outerLake);

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

                // If we were already zoomed on a different duck, dismiss its card and unfreeze it
                if (this.zoomedDuck && this.zoomedDuck !== clickedDuck) {
                    this.popup.hide();
                    this.zoomedDuck.resumeMovement();
                }

                this.zoomedDuck = clickedDuck;
                this.zoomedDuck.HideDuckOnClick();

                this.popup.show(clickedDuck); // card slides in while camera zooms
                this.zoomState = ZOOMING_IN;
                this.experience.camera.zoomToDuck(clickedDuck.duck.position, () => {
                    this.zoomState = ZOOMED_IN;
                });
            } else if (this.zoomState === ZOOMED_IN) {
                // Clicked outside while zoomed in — dismiss card, zoom back out
                this.popup.hide();

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
