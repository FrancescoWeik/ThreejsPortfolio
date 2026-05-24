import * as THREE from 'three'
import Experience from '../Experience.js'

// ── Duck sprite bounds (Duck.png, 2816×1536 canvas) ───────────────────────────
const IMG_W = 2816, IMG_H = 1536
const SPR_X = 15,  SPR_Y = 3          // top-left corner of the sprite in pixels
const SPR_W = 216, SPR_H = 172        // sprite dimensions in pixels

// Use the canvas WIDTH as the single pixel→world reference so the sprite keeps
// its correct aspect ratio (216:172) regardless of the canvas' non-square shape.
// Both lake planes are 10×10 world units for this 2816×1536 canvas.
const PX_PER_UNIT = IMG_W / 10        // 281.6 px = 1 world unit

// Increase DUCK_SCALE to make ducks bigger / decrease to shrink them
const DUCK_SCALE = 2.0
const PLANE_W = (SPR_W / PX_PER_UNIT) * DUCK_SCALE  // ≈ 1.53 world units wide
const PLANE_H = (SPR_H / PX_PER_UNIT) * DUCK_SCALE  // ≈ 1.22 world units tall

// The duck is a vertical billboard.  Its Y centre must be high enough that the
// bottom edge clears the outer lake surface (y = 0.01) with a small margin.
const DUCK_Y = PLANE_H / 2 + 0.05    // ≈ 0.66  (bottom sits just above y = 0.05)

// UV crop: window the texture to show only the sprite region.
// Three.js UV: v = 0 → image bottom, v = 1 → image top  (Y is flipped)
const TEX_REPEAT_X = SPR_W / IMG_W                   // 0.0767
const TEX_REPEAT_Y = SPR_H / IMG_H                   // 0.112
const TEX_OFFSET_X = SPR_X / IMG_W                   // 0.00533
const TEX_OFFSET_Y = 1.0 - (SPR_Y + SPR_H) / IMG_H  // 0.886

// ── Swim zone ─────────────────────────────────────────────────────────────────
// Water hole is centred at world (0, 0) with half-extents ≈ 3 on both axes.
// Use a radius of 2 to stay comfortably away from the shore edges.
const SWIM_RADIUS = 2.0

export default class Duck {
    constructor(duckName, duckTitle, duckDescription, duckLink, duckTexture) {
        this.experience = new Experience();
        this.scene      = this.experience.scene;
        this.sizes      = this.experience.sizes;
        this.resources  = this.experience.resources;

        this.duckName        = duckName;
        this.duckTitle       = duckTitle;
        this.duckDescription = duckDescription;
        this.duckLink        = duckLink;

        this.speed    = 0.008;
        this.isFrozen = false;
        this.targetPosition = this.getRandomWaterPosition();

        this.spawnDuck(duckTexture);
    }

    spawnDuck(duckTexture) {
        // Crop the texture so the plane shows only the duck sprite
        

        const geo = new THREE.PlaneGeometry(1, 1);
        const mat = new THREE.MeshBasicMaterial({
            map:         duckTexture,
            transparent: true,
            alphaTest:   0.5,
            depthTest: false,
            depthWrite: false,
        });

        this.duck = new THREE.Mesh(geo, mat);
        this.duck.rotation.x = 0;   // vertical billboard facing the camera
        this.duck.renderOrder = 999;

        // Spawn at a random water position — Y is already set to DUCK_Y
        this.duck.position.copy(this.getRandomWaterPosition());
        this.scene.add(this.duck);
    }

    // Called when clicked — stops movement (placeholder for future animation)
    HideDuckOnClick() { this.isFrozen = true; }

    // Called when camera zooms back out
    resumeMovement() { this.isFrozen = false; }

    // Returns a uniformly-distributed position inside the circular swim zone
    getRandomWaterPosition() {
        const angle = Math.random() * Math.PI * 2;
        const r     = Math.sqrt(Math.random()) * SWIM_RADIUS;
        return new THREE.Vector3(
            Math.cos(angle) * r,   // X
            -0.6,                // Y: bottom edge clears the lake surface
            Math.sin(angle) * r    // Z
        );
    }

    update() {
        if (this.isFrozen) return;

        this.duck.position.lerp(this.targetPosition, this.speed);

        if (this.duck.position.distanceTo(this.targetPosition) < 0.1) {
            const next = this.getRandomWaterPosition();
            this.targetPosition.x = next.x;
            this.targetPosition.z = next.z;
            // Y stays fixed at DUCK_Y — don't lerp vertically
        }
    }
}
