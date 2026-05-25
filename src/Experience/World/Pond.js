import * as THREE from 'three'
import GUI from 'lil-gui'
import Experience from '../Experience.js'

const WATER_R = 2.5
const BALL_R  = 0.18
const PHI_SPD = 0.006

// ── Shaders ───────────────────────────────────────────────────────────────────

const waterVertex = /* glsl */`
varying vec3 vPos;
varying vec3 vNorm;

void main() {
    vPos  = position;
    vNorm = normalize(normal);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`

const waterFragment = /* glsl */`
uniform float uTime;

// Colours
uniform vec3  uDeepColor;
uniform vec3  uMidColor;
uniform vec3  uHighColor;

// Pattern
uniform float uCellScale;
uniform float uCellSpeed;
uniform float uSmoothness;
uniform float uDistortAmt;

// Colour ramp
uniform float uEdgeLow;
uniform float uEdgeHigh;
uniform float uMidPos;

// Ripple
uniform vec3  uBallDir;
uniform float uRippleSpeed;
uniform float uRippleWidth;
uniform float uRippleIntensity;

varying vec3 vPos;
varying vec3 vNorm;

// ── Voronoi 3D (ported from cortiz2894/water-anime-shader, extended to 3D) ───

float smin(float a, float b, float k) {
    float h = max(k - abs(a - b), 0.0) / k;
    return min(a, b) - h * h * h * k / 6.0;
}

vec3 hash3(vec3 p) {
    p = vec3(dot(p, vec3(127.1, 311.7,  74.7)),
             dot(p, vec3(269.5, 183.3, 246.1)),
             dot(p, vec3(113.5, 271.9, 124.6)));
    return fract(sin(p) * 43758.5453);
}

vec3 cellPt3(vec3 seed) {
    return 0.5 + 0.5 * sin(uTime * uCellSpeed + 6.2831 * seed);
}

float voronoiF1(vec3 p) {
    vec3 i = floor(p), f = fract(p);
    float md = 8.0;
    for (int z = -1; z <= 1; z++)
    for (int y = -1; y <= 1; y++)
    for (int x = -1; x <= 1; x++) {
        vec3 n  = vec3(float(x), float(y), float(z));
        vec3 pt = cellPt3(hash3(i + n));
        md = min(md, length(n + pt - f));
    }
    return md;
}

float voronoiSF1(vec3 p) {
    vec3 i = floor(p), f = fract(p);
    float res = 8.0;
    for (int z = -1; z <= 1; z++)
    for (int y = -1; y <= 1; y++)
    for (int x = -1; x <= 1; x++) {
        vec3 n  = vec3(float(x), float(y), float(z));
        vec3 pt = cellPt3(hash3(i + n));
        res = smin(res, length(n + pt - f), uSmoothness);
    }
    return res;
}

// ── fBm for organic distortion ────────────────────────────────────────────────

float nHash(vec2 p) {
    p = fract(p * vec2(127.1, 311.7));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
}
float vnoise(vec2 p) {
    vec2 i = floor(p), f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    return mix(mix(nHash(i),                  nHash(i + vec2(1.0, 0.0)), f.x),
               mix(nHash(i + vec2(0.0, 1.0)), nHash(i + vec2(1.0, 1.0)), f.x), f.y);
}
float fbm(vec2 p) {
    float v = 0.0, a = 0.5;
    for (int i = 0; i < 2; i++) { v += a * vnoise(p); p *= 2.0; a *= 0.5; }
    return v;
}

void main() {
    // fBm distortion along the surface normal (stays on sphere, no pole artefact)
    vec2  noiseUV  = vNorm.xz * 1.5 + vec2(uTime * 0.06, vNorm.y * 0.5);
    float noiseFac = fbm(noiseUV);
    vec3  distort  = vNorm * (noiseFac - 0.5) * uDistortAmt;

    vec3 p3 = vPos * uCellScale + vec3(0.025, 0.01, 0.005) * uTime + distort;

    float f1   = voronoiF1(p3);
    float sf1  = voronoiSF1(p3);
    float edge = f1 - sf1;   // 0 at cell centres → positive at boundaries

    // Ripple rings — added to edge so they inherit the water colour ramp
    float angDist = acos(clamp(dot(normalize(vPos), uBallDir), -1.0, 1.0));
    float ripple = 0.0;
    for (int r = 0; r < 3; r++) {
        float offset = float(r) * 0.13;
        float radius = mod(uTime * uRippleSpeed + offset, 0.28);
        float ring   = smoothstep(uRippleWidth, 0.0, abs(angDist - radius));
        float decay  = exp(-radius * 9.0);
        ripple += ring * decay;
    }
    edge += ripple * uRippleIntensity * 0.18;

    // 3-stop colour ramp
    float t    = smoothstep(uEdgeLow, uEdgeHigh, edge);
    float seg0 = clamp(t / uMidPos, 0.0, 1.0);
    float seg1 = clamp((t - uMidPos) / (1.0 - uMidPos), 0.0, 1.0);
    vec3 col = mix(
        mix(uDeepColor, uMidColor,  seg0),
        mix(uMidColor,  uHighColor, seg1),
        step(uMidPos, t)
    );

    gl_FragColor = vec4(col, 1.0);
}
`

// ── Pond ──────────────────────────────────────────────────────────────────────

export default class Pond {
    constructor() {
        this.experience = new Experience()
        this.scene      = this.experience.scene
        this.time       = this.experience.time
        this.camera     = this.experience.camera

        this.phi = 0

        // Stop the mouse-parallax from fighting OrbitControls
        this.camera.enableParallax = false

        this.params = {
            deepColor:  '#0a4a7a',
            midColor:   '#1d95dc',
            highColor:  '#d1f5ff',
            cellScale:  2.50,
            cellSpeed:  1.50,
            smoothness: 0.60,
            distortAmt: 0.20,
            edgeLow:    0.12,
            edgeHigh:   0.255,
            midPos:     0.21,
            // ball
            rippleSpeed:     0.18,
            rippleWidth:     0.018,
            rippleIntensity: 0.80,
            bobSpeed:        2.5,
            bobAmp:          0.07,
        }

        this.addLights()
        this.createWaterSphere()
        this.createBall()
        this.createGUI()
    }

    addLights() {
        this.scene.add(new THREE.AmbientLight(0xaabbcc, 0.8))
        const dir = new THREE.DirectionalLight(0xffffff, 1.0)
        dir.position.set(5, 8, 4)
        this.scene.add(dir)
    }

    createWaterSphere() {
        const p = this.params
        this.waterUniforms = {
            uTime:       { value: 0 },
            uDeepColor:  { value: new THREE.Color(p.deepColor) },
            uMidColor:   { value: new THREE.Color(p.midColor) },
            uHighColor:  { value: new THREE.Color(p.highColor) },
            uCellScale:  { value: p.cellScale },
            uCellSpeed:  { value: p.cellSpeed },
            uSmoothness: { value: p.smoothness },
            uDistortAmt: { value: p.distortAmt },
            uEdgeLow:    { value: p.edgeLow },
            uEdgeHigh:   { value: p.edgeHigh },
            uMidPos:     { value: p.midPos },
            uBallDir:         { value: new THREE.Vector3(0, 1, 0) },
            uRippleSpeed:     { value: p.rippleSpeed },
            uRippleWidth:     { value: p.rippleWidth },
            uRippleIntensity: { value: p.rippleIntensity },
        }

        const geo = new THREE.SphereGeometry(WATER_R, 128, 128)
        const mat = new THREE.ShaderMaterial({
            vertexShader:   waterVertex,
            fragmentShader: waterFragment,
            uniforms:       this.waterUniforms,
        })

        this.waterSphere = new THREE.Mesh(geo, mat)
        this.scene.add(this.waterSphere)
    }

    createBall() {
        const gradData = new Uint8Array([40, 120, 190, 255])
        const gradMap  = new THREE.DataTexture(gradData, 4, 1, THREE.RedFormat)
        gradMap.magFilter = THREE.NearestFilter
        gradMap.minFilter = THREE.NearestFilter
        gradMap.needsUpdate = true

        const geo = new THREE.SphereGeometry(BALL_R, 32, 32)
        const mat = new THREE.MeshToonMaterial({ color: 0xff6633, gradientMap: gradMap })
        this.ball = new THREE.Mesh(geo, mat)
        this.scene.add(this.ball)
    }

    createGUI() {
        const gui = new GUI({ title: '💧 Acqua' })
        gui.domElement.style.maxHeight = (window.innerHeight - 20) + 'px'
        gui.domElement.style.overflowY = 'auto'
        const u   = this.waterUniforms
        const p   = this.params

        const colori = gui.addFolder('Colori')
        colori.addColor(p, 'deepColor') .name('Blu profondo')    .onChange(v => u.uDeepColor.value.set(v))
        colori.addColor(p, 'midColor')  .name('Blu medio')       .onChange(v => u.uMidColor.value.set(v))
        colori.addColor(p, 'highColor') .name('Schiuma / bordi') .onChange(v => u.uHighColor.value.set(v))

        const onde = gui.addFolder('Onde')
        onde.add(p, 'cellScale',  0.2, 2.5, 0.01).name('Dimensione celle')     .onChange(v => { u.uCellScale.value  = v })
        onde.add(p, 'cellSpeed',  0.0, 2.0, 0.01).name('Velocità animazione')  .onChange(v => { u.uCellSpeed.value  = v })
        onde.add(p, 'smoothness', 0.1, 1.5, 0.01).name('Morbidezza bordi')     .onChange(v => { u.uSmoothness.value = v })
        onde.add(p, 'distortAmt', 0.0, 0.8, 0.01).name('Distorsione / rumore') .onChange(v => { u.uDistortAmt.value = v })

        const ramp = gui.addFolder('Transizione colori')
        ramp.add(p, 'edgeLow',  0.00, 0.30, 0.005).name('Soglia bassa')        .onChange(v => { u.uEdgeLow.value  = v })
        ramp.add(p, 'edgeHigh', 0.05, 0.50, 0.005).name('Soglia alta')         .onChange(v => { u.uEdgeHigh.value = v })
        ramp.add(p, 'midPos',   0.10, 0.90, 0.01) .name('Posizione blu medio') .onChange(v => { u.uMidPos.value   = v })

        const palla = gui.addFolder('Pallina')
        palla.add(p, 'rippleSpeed',     0.05, 1.0,  0.01) .name('Velocità cerchi')   .onChange(v => { u.uRippleSpeed.value     = v })
        palla.add(p, 'rippleWidth',     0.005, 0.06, 0.001).name('Spessore cerchi')   .onChange(v => { u.uRippleWidth.value     = v })
        palla.add(p, 'rippleIntensity', 0.0,  1.0,  0.01) .name('Intensità cerchi')  .onChange(v => { u.uRippleIntensity.value = v })
        palla.add(p, 'bobSpeed',        0.5,  6.0,  0.1)  .name('Velocità ondeggio')
        palla.add(p, 'bobAmp',          0.0,  0.2,  0.005).name('Ampiezza ondeggio')
    }

    update() {
        const t = this.time.elapsed * 0.001
        this.waterUniforms.uTime.value = t

        this.phi += PHI_SPD
        const theta = Math.PI * 0.45 + Math.sin(t * 0.28) * 0.38

        const nx = Math.sin(theta) * Math.cos(this.phi)
        const ny = Math.cos(theta)
        const nz = Math.sin(theta) * Math.sin(this.phi)

        // Embed ball with gentle bobbing — oscillates around the surface
        const bob = Math.sin(t * this.params.bobSpeed) * this.params.bobAmp
        const ballDist = WATER_R - BALL_R * 0.3 + bob
        this.ball.position.set(nx * ballDist, ny * ballDist, nz * ballDist)
        this.ball.rotation.y += 0.015

        // Drive ripple rings toward the ball's direction on the sphere
        this.waterUniforms.uBallDir.value.set(nx, ny, nz)
    }
}
