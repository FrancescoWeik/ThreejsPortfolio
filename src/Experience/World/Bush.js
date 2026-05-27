import * as THREE from 'three'
import GUI from 'lil-gui'
import Experience from '../Experience.js'

const WATER_R = 2.5

// ── Vertex shader — instanced planes with wind bend ───────────────────────────
const leafVert = /* glsl */`
uniform float uTime;
uniform float uWindSpeed;
uniform float uWindStr;
varying vec2  vUv;

void main() {
    vUv = uv;
    vec3 pos = position;

    // Bend at tip (top of plane = y positive)
    float tip = (pos.y + 0.275) / 0.55;
    pos.x += sin(uTime * uWindSpeed + pos.z * 5.0) * uWindStr * tip;

#ifdef USE_INSTANCING
    vec3 iPos = vec3(instanceMatrix[3][0], instanceMatrix[3][1], instanceMatrix[3][2]);
    pos.x += sin(uTime * uWindSpeed * 0.7 + iPos.x * 1.7 + iPos.z * 1.4) * uWindStr * 0.6;
    gl_Position = projectionMatrix * modelViewMatrix * instanceMatrix * vec4(pos, 1.0);
#else
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
#endif
}
`

// ── Fragment shader — atlas crop + shared tint ────────────────────────────────
const leafFrag = /* glsl */`
uniform sampler2D map;
uniform sampler2D alphaMap;
uniform vec2      uUvOffset;
uniform float     uBaseBright;
uniform vec3      uTint;
uniform float     uGlobalBright;
varying vec2      vUv;

void main() {
    vec2 uv = uUvOffset + vUv * 0.25;
    if (texture2D(alphaMap, uv).r < 0.35) discard;
    vec3 col = texture2D(map, uv).rgb;
    gl_FragColor = vec4(col * uTint * uBaseBright * uGlobalBright, 1.0);
}
`

// ── Atlas cells (row, col) in the 4×4 leaf texture ───────────────────────────
const LEAF_CELLS = [[0,0],[0,1],[0,2],[1,0],[1,1],[2,0]]

// ── Fibonacci sphere distribution ─────────────────────────────────────────────
function fibonacciSphere(n, radius, cx = 0, cy = 0, cz = 0) {
    const pts = []
    const phi = Math.PI * (3 - Math.sqrt(5))
    for (let i = 0; i < n; i++) {
        const y      = 1 - (i / (n - 1)) * 2
        const r      = Math.sqrt(Math.max(0, 1 - y * y))
        const theta  = phi * i
        const jitter = 0.9 + Math.random() * 0.2
        pts.push(new THREE.Vector3(
            cx + r * Math.cos(theta) * radius * jitter,
            cy + y  * radius * jitter,
            cz + r * Math.sin(theta) * radius * jitter
        ))
    }
    return pts
}

// ── Class ─────────────────────────────────────────────────────────────────────
export default class Bush {
    constructor() {
        this.experience = new Experience()
        this.scene      = this.experience.scene
        this.time       = this.experience.time
        this.resources  = this.experience.resources

        this._meshes = []

        // Shared uniforms updated every frame / by GUI
        this._su = {
            uTime:        { value: 0 },
            uWindSpeed:   { value: 1.3 },
            uWindStr:     { value: 0.05 },
            uTint:        { value: new THREE.Color('#c8ff50') },
            uGlobalBright:{ value: 1.0 },
        }

        this.params = {
            count:      100,
            leafSize:   0.4,
            tint:       '#c8ff50',
            brightness: 0.85,
            windSpeed:  1.3,
            windStr:    0.05,
        }

        this._build()
        this._createGUI()
    }

    // ── Build / rebuild all meshes ────────────────────────────────────────────
    _build() {
        this._meshes.forEach(m => {
            m.geometry.dispose()
            m.material.dispose()
            this.scene.remove(m)
        })
        this._meshes = []

        const baseColor = this.resources.items.leafBaseColor
        const opacity   = this.resources.items.leafOpacity
        const dummy     = new THREE.Object3D()
        const p         = this.params

        // Main leaf cloud
        const leafR  = WATER_R * 1.05
        const allPts = fibonacciSphere(p.count, leafR)
        const perType = Math.ceil(p.count / LEAF_CELLS.length)

        LEAF_CELLS.forEach(([row, col], idx) => {
            const pts = allPts.slice(idx * perType, (idx + 1) * perType)
            if (!pts.length) return
            this._addCluster(pts, row, col, 0.82 + idx * 0.04, p.leafSize,
                             baseColor, opacity, dummy, 0, 0, 0)
        })
    }

    _addCluster(pts, row, col, baseBright, leafSize, baseColor, opacity, dummy, cx, cy, cz) {
        const geo = new THREE.PlaneGeometry(leafSize, leafSize)
        const mat = new THREE.ShaderMaterial({
            uniforms: {
                // shared (same object reference → real-time updates)
                uTime:        this._su.uTime,
                uWindSpeed:   this._su.uWindSpeed,
                uWindStr:     this._su.uWindStr,
                uTint:        this._su.uTint,
                uGlobalBright:this._su.uGlobalBright,
                // per-cluster
                map:         { value: baseColor },
                alphaMap:    { value: opacity },
                uUvOffset:   { value: new THREE.Vector2(col / 4, (3 - row) / 4) },
                uBaseBright: { value: baseBright },
            },
            vertexShader:   leafVert,
            fragmentShader: leafFrag,
            side:           THREE.DoubleSide,
        })

        const center = new THREE.Vector3(cx, cy, cz)
        const mesh   = new THREE.InstancedMesh(geo, mat, pts.length)

        pts.forEach((pt, i) => {
            dummy.position.copy(pt)
            dummy.lookAt(center)
            dummy.rotateX((Math.random() - 0.5) * 1.2)
            dummy.rotateY((Math.random() - 0.5) * 1.2)
            dummy.rotateZ(Math.random() * Math.PI * 2)
            dummy.scale.setScalar(0.7 + Math.random() * 0.6)
            dummy.updateMatrix()
            mesh.setMatrixAt(i, dummy.matrix)
        })

        mesh.instanceMatrix.needsUpdate = true
        this.scene.add(mesh)
        this._meshes.push(mesh)
    }

    // ── GUI ───────────────────────────────────────────────────────────────────
    _createGUI() {
        const gui = new GUI({ title: '🌿 Foglie' })
        const p   = this.params
        const su  = this._su

        const nuvola = gui.addFolder('Nuvola foglie')
        nuvola.add(p, 'count', 0, 1500, 10).name('Numero foglie')
        nuvola.add(p, 'leafSize', 0.2, 1.2, 0.05).name('Dimensione')
        nuvola.addColor(p, 'tint').name('Colore tinta')
            .onChange(v => su.uTint.value.set(v))
        nuvola.add(p, 'brightness', 0.3, 2.0, 0.05).name('Luminosità')
            .onChange(v => { su.uGlobalBright.value = v })
        nuvola.add({ rebuild: () => this._build() }, 'rebuild').name('↺ Ricostruisci')

        const vento = gui.addFolder('Vento')
        vento.add(p, 'windSpeed', 0.0, 3.0, 0.05).name('Velocità')
            .onChange(v => { su.uWindSpeed.value = v })
        vento.add(p, 'windStr', 0.0, 0.15, 0.005).name('Forza')
            .onChange(v => { su.uWindStr.value = v })

    }

    update() {
        this._su.uTime.value = this.time.elapsed * 0.001
    }
}
