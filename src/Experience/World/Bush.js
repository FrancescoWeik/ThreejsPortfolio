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

// ── Fibonacci sphere — used for the foliage ring around the pond ──────────────
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

// ── Random volume hemisphere — used for large side bushes ─────────────────────
function randomHemiVolume(n, radius, cx = 0, cy = 0, cz = 0) {
    const outDir = new THREE.Vector3(cx, cy, cz).normalize()
    const quat   = new THREE.Quaternion().setFromUnitVectors(
        new THREE.Vector3(0, 1, 0), outDir
    )
    const pts = []
    for (let i = 0; i < n; i++) {
        const u    = Math.random() * Math.PI * 2
        const cosV = Math.random()
        const sinV = Math.sqrt(1 - cosV * cosV)
        const r    = radius * Math.pow(Math.random(), 0.55)
        const local = new THREE.Vector3(
            r * sinV * Math.cos(u),
            r * cosV,
            r * sinV * Math.sin(u)
        )
        local.applyQuaternion(quat)
        pts.push(new THREE.Vector3(cx + local.x, cy + local.y, cz + local.z))
    }
    return pts
}

// ── Spherical cap — leaves placed ON the sphere surface, following curvature ──
// centerDir: normalized direction of cap center (e.g. (-1,0,0) for left bush)
// sphereR:   sphere radius to hug (WATER_R)
// capAngle:  angular half-width in radians (e.g. 1.0 ≈ 57°)
// bushH:     max height of leaves above sphere surface
function sphericalCapVolume(n, centerDir, sphereR, capAngle, bushH) {
    const quat = new THREE.Quaternion().setFromUnitVectors(
        new THREE.Vector3(0, 1, 0), centerDir
    )
    const pts = []
    for (let i = 0; i < n; i++) {
        const u    = Math.random() * Math.PI * 2
        // Uniform distribution within spherical cap
        const cosP = 1 - Math.random() * (1 - Math.cos(capAngle))
        const sinP = Math.sqrt(1 - cosP * cosP)

        // Direction on sphere surface within cap
        const local = new THREE.Vector3(sinP * Math.cos(u), cosP, sinP * Math.sin(u))
        local.applyQuaternion(quat)

        // Place at sphere surface + random height above it (dense at base, sparse at top)
        const h = sphereR + Math.pow(Math.random(), 2.0) * bushH
        pts.push(local.multiplyScalar(h))
    }
    return pts
}

// ── Class ─────────────────────────────────────────────────────────────────────
export default class Bush {
    constructor(config = {}) {
        this.experience = new Experience()
        this.scene      = this.experience.scene
        this.time       = this.experience.time
        this.resources  = this.experience.resources

        this._cfg = {
            position:   config.position   || new THREE.Vector3(0, 0, 0),
            radius:     config.radius     || WATER_R * 1.05,
            hemisphere: config.hemisphere || false,
            sphereCap:  config.sphereCap  || false,
            capAngle:   config.capAngle   || 1.0,
            bushHeight: config.bushHeight || 1.5,
            guiTitle:   config.guiTitle   || '🌿 Foglie',
        }

        this._meshes = []

        // Shared uniforms updated every frame / by GUI
        this._su = {
            uTime:        { value: 0 },
            uWindSpeed:   { value: 1.3 },
            uWindStr:     { value: 0.05 },
            uTint:        { value: new THREE.Color(config.tint || '#c8ff50') },
            uGlobalBright:{ value: 1.0 },
        }

        this.params = {
            count:      config.count      || 100,
            leafSize:   config.leafSize   || 0.4,
            tint:       config.tint       || '#c8ff50',
            brightness: 0.85,
            windSpeed:  1.3,
            windStr:    0.05,
            capAngle:   config.capAngle   || 1.0,
            bushHeight: config.bushHeight || 1.5,
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
        const cfg       = this._cfg
        let cx = cfg.position.x, cy = cfg.position.y, cz = cfg.position.z
        let allPts

        if (cfg.sphereCap) {
            const centerDir = cfg.position.clone().normalize()
            allPts = sphericalCapVolume(p.count, centerDir, WATER_R * 0.80, p.capAngle, p.bushHeight)
            cx = 0; cy = 0; cz = 0  // leaves face sphere center (origin)
        } else if (cfg.hemisphere) {
            allPts = randomHemiVolume(p.count, cfg.radius, cx, cy, cz)
        } else {
            allPts = fibonacciSphere(p.count, cfg.radius, cx, cy, cz)
        }

        const perType = Math.ceil(p.count / LEAF_CELLS.length)

        LEAF_CELLS.forEach(([row, col], idx) => {
            const pts = allPts.slice(idx * perType, (idx + 1) * perType)
            if (!pts.length) return
            this._addCluster(pts, row, col, 0.82 + idx * 0.04, p.leafSize,
                             baseColor, opacity, dummy, cx, cy, cz)
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
        const gui = new GUI({ title: this._cfg.guiTitle })
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

        if (this._cfg.sphereCap) {
            const forma = gui.addFolder('Forma cespuglio')
            forma.add(p, 'capAngle', 0.2, 1.8, 0.05).name('Larghezza (rad)')
                .onChange(() => this._build())
            forma.add(p, 'bushHeight', 0.0, 3.0, 0.05).name('Altezza foglie')
                .onChange(() => this._build())
        }

    }

    update() {
        this._su.uTime.value = this.time.elapsed * 0.001
    }
}
