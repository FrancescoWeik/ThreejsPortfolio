import * as THREE from 'three'
import Experience from '../Experience.js'

const SHIP_R  = 0.30   // slightly bigger than the duck balls (BALL_R = 0.18)
const WATER_R = 2.5

export default class Ship {
    constructor() {
        this.experience = new Experience()
        this.scene      = this.experience.scene

        // Wander-based orbit parameters, same style as the extra balls
        this._orbit = {
            phiBase:        Math.random() * Math.PI * 2,
            phiDrift:       (Math.random() - 0.5) * 0.4,
            phiWanderAmp:   0.3 + Math.random() * 0.4,
            phiWanderFreq:  0.06 + Math.random() * 0.10,
            phiWanderPhase: Math.random() * Math.PI * 2,
            thetaBase:      Math.PI * (0.30 + Math.random() * 0.20),
            thetaAmp:       0.10 + Math.random() * 0.12,
            thetaFreq:      0.12 + Math.random() * 0.18,
            thetaPhase:     Math.random() * Math.PI * 2,
            bobPhase:       Math.random() * Math.PI * 2,
        }

        this._buildMesh()
    }

    _buildMesh() {
        const gradData = new Uint8Array([40, 120, 190, 255])
        const gradMap  = new THREE.DataTexture(gradData, 4, 1, THREE.RedFormat)
        gradMap.magFilter = THREE.NearestFilter
        gradMap.minFilter = THREE.NearestFilter
        gradMap.needsUpdate = true

        const geo  = new THREE.SphereGeometry(SHIP_R, 32, 32)
        const mat  = new THREE.MeshToonMaterial({ color: 0xdd1133, gradientMap: gradMap })
        this.mesh  = new THREE.Mesh(geo, mat)
        // No duck assigned → popup will be skipped automatically
        this.scene.add(this.mesh)
    }

    /**
     * Called every frame by Pond.update().
     * @param {number} t          - elapsed time in seconds
     * @param {number} ballSpeed  - from Pond params
     * @param {number} waterScale - from Pond params
     * @param {number} bobSpeed   - from Pond params
     * @param {number} bobAmp     - from Pond params
     */
    update(t, ballSpeed, waterScale, bobSpeed, bobAmp) {
        const o = this._orbit
        o.phiBase += ballSpeed * o.phiDrift

        const phi   = o.phiBase + Math.sin(t * o.phiWanderFreq + o.phiWanderPhase) * o.phiWanderAmp
        const theta = o.thetaBase + Math.sin(t * o.thetaFreq + o.thetaPhase) * o.thetaAmp
        const bob   = Math.sin(t * bobSpeed + o.bobPhase) * bobAmp
        const dist  = WATER_R * waterScale - SHIP_R * 0.3 + bob

        this.mesh.position.set(
            Math.sin(theta) * Math.cos(phi) * dist,
            Math.cos(theta)                 * dist,
            Math.sin(theta) * Math.sin(phi) * dist,
        )
        this.mesh.rotation.y += 0.01
    }
}
