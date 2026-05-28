import * as THREE from 'three'
import GUI from 'lil-gui'
import Experience from '../Experience.js'

export default class LargeBush {
    constructor({ position, radius = 1.8, color = 0x3a8c2f, guiTitle = '🌳 Cespuglio' }) {
        this.experience = new Experience()
        this.scene      = this.experience.scene

        this.params = {
            radius,
            color: '#' + new THREE.Color(color).getHexString(),
        }

        this._position = position.clone()
        this._mesh     = null
        this._buildMesh()
        this._createGUI(guiTitle)
    }

    _buildMesh() {
        const geo = new THREE.SphereGeometry(1, 32, 24)
        const pos = geo.attributes.position

        for (let i = 0; i < pos.count; i++) {
            const x = pos.getX(i)
            const y = pos.getY(i)
            const z = pos.getZ(i)
            const bump = 1.0
                + 0.12 * Math.sin(x * 3.7 + 0.4) * Math.sin(y * 2.9) * Math.sin(z * 4.1)
                + 0.08 * Math.sin(x * 6.3 - 1.1) * Math.cos(z * 5.2 + 0.8)
                + 0.06 * Math.cos(y * 8.1 + x * 3.0)
            pos.setXYZ(i, x * bump, y * bump, z * bump)
        }
        pos.needsUpdate = true
        geo.computeVertexNormals()

        const gradData = new Uint8Array([40, 120, 190, 255])
        const gradMap  = new THREE.DataTexture(gradData, 4, 1, THREE.RedFormat)
        gradMap.magFilter = THREE.NearestFilter
        gradMap.minFilter = THREE.NearestFilter
        gradMap.needsUpdate = true

        const mat = new THREE.MeshToonMaterial({
            color:       new THREE.Color(this.params.color),
            gradientMap: gradMap,
        })

        if (this._mesh) {
            this.scene.remove(this._mesh)
            this._mesh.geometry.dispose()
            this._mesh.material.gradientMap.dispose()
            this._mesh.material.dispose()
        }

        this._mesh = new THREE.Mesh(geo, mat)
        this._applyScale()
        this._mesh.position.copy(this._position)
        this.scene.add(this._mesh)
    }

    _applyScale() {
        const r = this.params.radius
        this._mesh.scale.set(r * 1.25, r * 0.80, r * 1.25)
    }

    _createGUI(title) {
        const gui = new GUI({ title })
        const p   = this.params

        gui.addColor(p, 'color').name('Colore').onChange(v => {
            this._mesh.material.color.set(v)
        })
        gui.add(p, 'radius', 0.5, 4.0, 0.05).name('Dimensione').onChange(() => {
            this._applyScale()
        })
    }
}
