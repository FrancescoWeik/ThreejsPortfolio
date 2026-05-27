import * as THREE from 'three'
import GUI from 'lil-gui'
import Experience from '../Experience.js'

const WATER_R = 2.5
const BALL_R  = 0.18

// ── Background ────────────────────────────────────────────────────────────────

const bgVertex = /* glsl */`
varying vec3 vWorldPos;
void main() {
    vWorldPos   = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`
const bgFragment = /* glsl */`
varying vec3 vWorldPos;
uniform vec3  uBotColor;
uniform vec3  uTopColor;
uniform vec3  uGlowColor;
uniform float uGlowRadius;
void main() {
    float t   = clamp(vWorldPos.y / 18.0 * 0.5 + 0.5, 0.0, 1.0);
    vec3  col = mix(uBotColor, uTopColor, t);
    float dist  = length(vWorldPos.xz);
    float glow  = exp(-dist * dist / (uGlowRadius * uGlowRadius));
    col += uGlowColor * glow * 0.18;
    gl_FragColor = vec4(col, 1.0);
}
`

// ── Glow halo ─────────────────────────────────────────────────────────────────

const glowVertex = /* glsl */`
varying vec3 vNorm;
varying vec3 vViewPos;
void main() {
    vNorm       = normalize(normalMatrix * normal);
    vec4 mvPos  = modelViewMatrix * vec4(position, 1.0);
    vViewPos    = mvPos.xyz;
    gl_Position = projectionMatrix * mvPos;
}
`
const glowFragment = /* glsl */`
varying vec3  vNorm;
varying vec3  vViewPos;
uniform vec3  uGlowColor;
uniform float uGlowStr;
uniform float uGlowFalloff;
void main() {
    vec3  v       = normalize(-vViewPos);
    float fresnel = pow(1.0 - max(dot(vNorm, v), 0.0), uGlowFalloff);
    float a       = fresnel * uGlowStr;
    gl_FragColor  = vec4(uGlowColor * a, a);
}
`

// ── Bottom ground ─────────────────────────────────────────────────────────────

const bottomVertex = /* glsl */`
varying vec3 vPos;
varying vec3 vNorm;
void main() {
    vPos        = position;
    vNorm       = normalize(normalMatrix * normal);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`

const bottomFragment = /* glsl */`
uniform vec3  uCrackColor;
uniform vec3  uStoneA;
uniform vec3  uStoneB;
uniform float uPebbleScale;

varying vec3 vPos;
varying vec3 vNorm;

vec3 h3b(vec3 p) {
    p = vec3(dot(p, vec3(127.1, 311.7,  74.7)),
             dot(p, vec3(269.5, 183.3, 246.1)),
             dot(p, vec3(113.5, 271.9, 124.6)));
    return fract(sin(p) * 43758.5453);
}
vec2 pebVoronoi(vec3 p) {
    vec3  i = floor(p), f = fract(p);
    float d1 = 8.0, d2 = 8.0, ch = 0.0;
    for (int z=-1;z<=1;z++) for (int y=-1;y<=1;y++) for (int x=-1;x<=1;x++) {
        vec3  n = vec3(float(x), float(y), float(z));
        vec3  h = h3b(i + n);
        float d = length(n + 0.5 + 0.45 * sin(6.2831 * h) - f);
        if (d < d1) { d2 = d1; d1 = d; ch = fract(dot(h, vec3(0.31, 0.47, 0.22))); }
        else if (d < d2) { d2 = d; }
    }
    return vec2(d2 - d1, ch);
}
float n2b(vec2 p) {
    vec2  i = floor(p), f = fract(p); f = f*f*(3.0-2.0*f);
    float a = fract(sin(dot(i,            vec2(127.1, 311.7))) * 43758.5453);
    float b = fract(sin(dot(i+vec2(1,0),  vec2(127.1, 311.7))) * 43758.5453);
    float c = fract(sin(dot(i+vec2(0,1),  vec2(127.1, 311.7))) * 43758.5453);
    float d = fract(sin(dot(i+vec2(1,1),  vec2(127.1, 311.7))) * 43758.5453);
    return mix(mix(a,b,f.x), mix(c,d,f.x), f.y);
}

void main() {
    vec3  p3   = vPos * uPebbleScale;
    vec2  vr   = pebVoronoi(p3);
    float edge = vr.x;
    float ch   = vr.y;

    float surf = n2b(vNorm.xz * uPebbleScale * 5.0) * 0.12 - 0.06;

    // Pietre: tono caldo/neutro — chiaramente diverso dall'acqua teal
    vec3 grayStone  = mix(vec3(0.76, 0.74, 0.72), vec3(0.88, 0.86, 0.83), ch * 4.0);
    vec3 warmStone  = mix(uStoneA,                 uStoneB,                 (ch - 0.25) * 2.5);
    vec3 darkStone  = uStoneA * mix(0.60, 0.85, (ch - 0.65) * 5.0);
    vec3 algaeStone = mix(vec3(0.66, 0.66, 0.64), vec3(0.76, 0.74, 0.72), (ch - 0.85) * 6.7);

    vec3 pebCol = grayStone  * (1.0 - step(0.25, ch))
                + warmStone  * step(0.25, ch) * (1.0 - step(0.65, ch))
                + darkStone  * step(0.65, ch) * (1.0 - step(0.85, ch))
                + algaeStone * step(0.85, ch);
    pebCol = clamp(pebCol + surf, 0.0, 1.0);

    float crack = 1.0 - smoothstep(0.03, 0.10, edge);
    vec3  col   = mix(pebCol, uCrackColor, crack);

    // Anime cel-shading: 2 discrete light bands (brighter overall for submerged look)
    vec3  ld     = normalize(vec3(5.0, 8.0, 4.0));
    float diff   = dot(vNorm, ld);
    float shadow = smoothstep(-0.05, 0.10, diff);
    float light  = smoothstep( 0.35, 0.50, diff);
    float hilite = smoothstep( 0.72, 0.82, diff);
    float lum    = 0.45 + shadow * 0.20 + light * 0.25 + hilite * 0.10;

    gl_FragColor = vec4(col * lum, 1.0);
}
`

// ── Water vertex ──────────────────────────────────────────────────────────────

const waterVertex = /* glsl */`
uniform float uTime;
uniform float uWaveAmp;
uniform float uWaveFreq;
uniform float uWaveSpeed;

varying vec3  vPos;
varying vec3  vNorm;
varying vec3  vViewPos;
varying float vWaveCrest;

float waveH(vec3 p, float t) {
    float f = uWaveFreq, s = uWaveSpeed;
    float w1 = sin(p.y                            * f        + t * s);
    float w2 = sin((p.x * 0.866 + p.z * 0.5)   * f * 1.4   + t * s * 0.85);
    float w3 = sin((p.x * 0.5   - p.z * 0.866) * f * 0.8   + t * s * 1.3);
    float w4 = sin(p.y * f * 1.9 + p.x * 0.4    + t * s * 0.65);
    return (w1 * 0.35 + w2 * 0.28 + w3 * 0.22 + w4 * 0.15) * uWaveAmp;
}

void main() {
    vec3 n  = normalize(normal);
    vec3 up = abs(n.y) < 0.98 ? vec3(0.0, 1.0, 0.0) : vec3(1.0, 0.0, 0.0);
    vec3 T  = normalize(cross(up, n));
    vec3 B  = cross(n, T);

    float eps = 0.04;
    float h0  = waveH(position,           uTime);
    float hT  = waveH(position + T * eps, uTime);
    float hB  = waveH(position + B * eps, uTime);

    vec3 dispPos = position + n * h0;
    vec3 dSdT    = T + n * ((hT - h0) / eps);
    vec3 dSdB    = B + n * ((hB - h0) / eps);
    vec3 dispN   = normalize(cross(dSdT, dSdB));
    if (dot(dispN, n) < 0.0) dispN = -dispN;

    vWaveCrest  = h0 / max(uWaveAmp, 0.001);
    vPos        = dispPos;
    vNorm       = dispN;
    vec4 mvPos  = modelViewMatrix * vec4(dispPos, 1.0);
    vViewPos    = mvPos.xyz;
    gl_Position = projectionMatrix * mvPos;
}
`

// ── Water fragment — fBm caustic (no Voronoi) ─────────────────────────────────

const waterFragment = /* glsl */`
uniform float uTime;

uniform vec3  uDeepColor;
uniform vec3  uMidColor;
uniform vec3  uHighColor;

uniform float uNoiseScale;
uniform float uFlowSpeed;
uniform float uFlowAngle;
uniform float uPatchThresh;
uniform float uPatchSharp;

uniform vec3  uBallDir;
uniform float uRippleSpeed;
uniform float uRippleWidth;
uniform float uRippleIntensity;

uniform float uSpecStr;
uniform float uShininess;
uniform float uBaseOpacity;
uniform float uPatchStr;
uniform float uSparkleStr;
uniform float uBlobStr;

varying vec3  vPos;
varying vec3  vNorm;
varying vec3  vViewPos;
varying float vWaveCrest;

// ── 3D value noise ──────────────────────────────────────────────────────────
float h1w(vec3 p) {
    p = fract(p * 0.3183099 + 0.1);
    p *= 17.0;
    return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
}
float vn3w(vec3 p) {
    vec3 i = floor(p), f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    return mix(
        mix(mix(h1w(i),              h1w(i+vec3(1,0,0)), f.x),
            mix(h1w(i+vec3(0,1,0)),  h1w(i+vec3(1,1,0)), f.x), f.y),
        mix(mix(h1w(i+vec3(0,0,1)),  h1w(i+vec3(1,0,1)), f.x),
            mix(h1w(i+vec3(0,1,1)),  h1w(i+vec3(1,1,1)), f.x), f.y), f.z);
}
float fbm3w(vec3 p) {
    float v = 0.0, a = 0.5;
    vec3 sh = vec3(5.2, 1.3, 7.8);
    for(int i = 0; i < 5; i++) { v += a * vn3w(p); p = p * 2.0 + sh; a *= 0.5; }
    return v;
}

// ── 2D noise for sparkles ───────────────────────────────────────────────────
float h2w(vec2 p) {
    p = fract(p * vec2(127.1, 311.7));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
}
float vn2w(vec2 p) {
    vec2 i = floor(p), f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    return mix(mix(h2w(i), h2w(i+vec2(1,0)), f.x),
               mix(h2w(i+vec2(0,1)), h2w(i+vec2(1,1)), f.x), f.y);
}
float fbm2w(vec2 p) {
    float v = 0.0, a = 0.5;
    for(int i = 0; i < 4; i++) { v += a * vn2w(p); p *= 2.0; a *= 0.5; }
    return v;
}

void main() {
    vec3  viewDir = normalize(-vViewPos);
    vec3  norm    = normalize(vNorm);

    // Fresnel — abs() funziona correttamente sia da dentro che da fuori la sfera
    float fresnel = pow(1.0 - abs(dot(norm, viewDir)), 3.0);

    // ── Coordinate elongate nella direzione del flusso (effetto "fiume") ──────
    // Ruota le coordinate sferiche nell'asse del flusso, poi
    // comprime il perpendicolare (features strette) e allunga il parallelo
    // (features lunghe) → bande fluenti anziché blob circolari
    float ca = cos(uFlowAngle), sa = sin(uFlowAngle);
    vec2  fp  = vec2( vPos.x * ca + vPos.z * sa,   // lungo il flusso
                     -vPos.x * sa + vPos.z * ca);   // perpendicolare
    // Scala: 0.32 lungo flusso (features larghe = lunghe bande),
    //        1.70 perpendicolare (features strette)
    vec3 flowCoord = vec3(fp.x * 0.32, vPos.y * 0.90, fp.y * 1.70) * uNoiseScale;

    // Animazione: scorrimento lungo il flusso
    vec3 p1 = flowCoord + vec3(uFlowSpeed * uTime, uTime * 0.02, 0.0);
    float n1 = fbm3w(p1);

    // smoothstep DIRETTO: chiaro dove n1 è ALTO (riflessi di superficie, caustica)
    // corrisponde alla reference: macchie luminose su teal scuro
    float caustic = smoothstep(uPatchThresh - uPatchSharp,
                              uPatchThresh + uPatchSharp, n1);

    // (micro layer rimosso: non usato dopo il refactor alpha)

    // ── Blob di luce circolari (White circle groups di Blender) ─────────────
    vec3 ns = normalize(vPos);
    vec3 blobDir1 = normalize(vec3(
         0.55 + 0.18 * sin(uTime * 0.20),
         0.65 + 0.12 * cos(uTime * 0.15),
         0.40 + 0.15 * sin(uTime * 0.25 + 1.0)
    ));
    vec3 blobDir2 = normalize(vec3(
        -0.40 + 0.20 * cos(uTime * 0.18 + 2.0),
         0.50 + 0.10 * sin(uTime * 0.22),
         0.60 + 0.18 * cos(uTime * 0.17)
    ));
    float blob1    = smoothstep(0.20, 0.72, pow(max(dot(ns, blobDir1), 0.0), 3.0));
    float blob2    = smoothstep(0.15, 0.62, pow(max(dot(ns, blobDir2), 0.0), 2.5));
    float lightBlob = clamp(blob1 * 0.85 + blob2 * 0.65, 0.0, 1.0);

    // ── Colore acqua — schema 3 bande ────────────────────────────────────────
    // dark (fondali) → teal medio → bianco riflessi
    // le soglie hardcoded usano n1 direttamente (non combined) per massimo contrasto
    vec3 col = uDeepColor;
    col = mix(col, uMidColor,  smoothstep(0.30, 0.52, n1));
    col = mix(col, uHighColor, pow(smoothstep(0.52, 0.72, n1), 1.5));

    // Blob di luce
    col = mix(col, uHighColor, lightBlob * uBlobStr);

    // Profondità vista (bordi più chiari, centro più scuro)
    float viewDepth = 1.0 - max(dot(norm, viewDir), 0.0);
    col = mix(col, uDeepColor * 0.70, viewDepth * 0.16);

    // ── Sparkle ───────────────────────────────────────────────────────────────
    vec2  spUV = fp * 14.0 + vec2(uFlowSpeed * uTime * 0.4, 0.0);
    float spN  = fbm2w(spUV);
    float spark = pow(max(spN - 0.68, 0.0) * 5.0, 2.5);
    float spPh  = h2w(floor(spUV));
    spark *= 0.25 + 0.75 * sin(uTime * 4.2 + spPh * 6.2831);
    col   += uHighColor * max(spark, 0.0) * uSparkleStr;

    // ── Speculare Blinn-Phong ─────────────────────────────────────────────────
    vec3  ld  = normalize(vec3(5.0, 8.0, 4.0));
    vec3  hv  = normalize(ld + viewDir);
    float sp2 = pow(max(dot(norm, hv), 0.0), uShininess);
    col += uHighColor * sp2 * uSpecStr;

    // ── Shimmer cresta onda ───────────────────────────────────────────────────
    col += uHighColor * max(vWaveCrest - 0.75, 0.0) * 0.06;

    // ── Cerchi dalla pallina ──────────────────────────────────────────────────
    float angDist = acos(clamp(dot(ns, uBallDir), -1.0, 1.0));
    float ripple  = 0.0;
    for(int r = 0; r < 3; r++) {
        float off    = float(r) * 0.13;
        float radius = mod(uTime * uRippleSpeed + off, 0.28);
        ripple += smoothstep(uRippleWidth, 0.0, abs(angDist - radius))
                * exp(-radius * 9.0);
    }
    col = mix(col, uHighColor, ripple * uRippleIntensity * 0.35);

    // ── Alpha: trasparenza guidata dal noise ──────────────────────────────────
    // Zone dark (caustic≈0): quasi trasparenti → fondale chiaramente visibile
    // Zone bright (caustic≈1): quasi opache → caustica brillante
    // Il CONTRASTO che si sposta nel tempo = effetto acqua che scorre
    float alpha = uBaseOpacity               // minimo controllabile (GUI)
                + caustic * uPatchStr          // noise guida opacità principale (GUI)
                + fresnel * 0.20             // bordo glass/vetro
                + lightBlob * 0.08;
    alpha = clamp(alpha, 0.0, 1.0);

    gl_FragColor = vec4(col, alpha);
}
`

// ── Pond ──────────────────────────────────────────────────────────────────────

export default class Pond {
    constructor() {
        this.experience = new Experience()
        this.scene      = this.experience.scene
        this.time       = this.experience.time
        this.camera     = this.experience.camera
        this.resources  = this.experience.resources

        this.phi = 0
        this.camera.enableParallax = false

        this.params = {
            // water
            deepColor:   '#0e4060',
            midColor:    '#1ab0d0',
            highColor:   '#b8f3ff',
            noiseScale:  2.65,
            flowSpeed:   0.295,
            flowAngle:   4.35,
            causticThresh: 0.72,
            causticSharp:  0.13,
            waveAmp:     0.10,
            waveFreq:    2.1,
            waveSpeed:   0.65,
            specStr:     3.0,
            shininess:   295,
            baseOpacity: 0.23,
            causticStr:  1.48,
            sparkleStr:  5.0,
            blobStr:     1.35,
            rippleSpeed:     0.22,
            rippleWidth:     0.06,
            rippleIntensity: 0.9,
            bobSpeed:        1.9,
            bobAmp:          0.055,
            // bottom
            crackColor:  '#2a3038',
            stoneA:      '#a8b0b4',
            stoneB:      '#d4d8d8',
            pebbleScale: 3.5,
            // background
            bgBot:       '#050d1a',
            bgTop:       '#0d2035',
            bgGlowColor: '#1a4a7a',
            bgGlowRad:   8.0,
            // halo
            glowColor:   '#3399ff',
            glowStr:     0.29,
            glowSize:    1.0,    // scala mesh alone (1.0 = normale)
            glowFalloff: 2.5,   // esponente Fresnel: basso = alone largo, alto = alone stretto
            // ball
            ballSpeed:   0.0045,
        }

        this.addLights()
        this.createBackground()
        this.createBottom()
        this.createWaterSphere()
        this.createGlow()
        this.createBall()
        this.createGUI()
    }

    addLights() {
        this.scene.add(new THREE.AmbientLight(0xaabbcc, 0.8))
        const dir = new THREE.DirectionalLight(0xffffff, 1.0)
        dir.position.set(5, 8, 4)
        this.scene.add(dir)
    }

    createBackground() {
        const p = this.params
        this.bgUniforms = {
            uBotColor:   { value: new THREE.Color(p.bgBot) },
            uTopColor:   { value: new THREE.Color(p.bgTop) },
            uGlowColor:  { value: new THREE.Color(p.bgGlowColor) },
            uGlowRadius: { value: p.bgGlowRad },
        }
        const geo  = new THREE.SphereGeometry(18, 32, 16)
        const mat  = new THREE.ShaderMaterial({
            vertexShader:   bgVertex,
            fragmentShader: bgFragment,
            uniforms:       this.bgUniforms,
            side:           THREE.BackSide,
            depthWrite:     false,
        })
        const mesh = new THREE.Mesh(geo, mat)
        mesh.renderOrder = -1
        this.scene.add(mesh)
    }

    createBottom() {
        const p = this.params
        this.bottomUniforms = {
            uCrackColor:  { value: new THREE.Color(p.crackColor) },
            uStoneA:      { value: new THREE.Color(p.stoneA) },
            uStoneB:      { value: new THREE.Color(p.stoneB) },
            uPebbleScale: { value: p.pebbleScale },
        }
        const geo = new THREE.SphereGeometry(WATER_R * 0.80, 128, 64)
        const mat = new THREE.ShaderMaterial({
            vertexShader:   bottomVertex,
            fragmentShader: bottomFragment,
            uniforms:       this.bottomUniforms,
        })
        this.bottomMesh = new THREE.Mesh(geo, mat)
        this.scene.add(this.bottomMesh)
    }

    createGlow() {
        const p = this.params
        this.glowUniforms = {
            uGlowColor:   { value: new THREE.Color(p.glowColor) },
            uGlowStr:     { value: p.glowStr },
            uGlowFalloff: { value: p.glowFalloff },
        }
        const geo = new THREE.SphereGeometry(WATER_R * 1.12, 64, 32)
        const mat = new THREE.ShaderMaterial({
            vertexShader:   glowVertex,
            fragmentShader: glowFragment,
            uniforms:       this.glowUniforms,
            transparent:    true,
            side:           THREE.FrontSide,
            depthWrite:     false,
            blending:       THREE.AdditiveBlending,
        })
        this.glowMesh = new THREE.Mesh(geo, mat)
        this.scene.add(this.glowMesh)
    }

    createWaterSphere() {
        const p = this.params
        this.waterUniforms = {
            uTime:        { value: 0 },
            uDeepColor:   { value: new THREE.Color(p.deepColor) },
            uMidColor:    { value: new THREE.Color(p.midColor) },
            uHighColor:   { value: new THREE.Color(p.highColor) },
            uNoiseScale:  { value: p.noiseScale },
            uFlowSpeed:   { value: p.flowSpeed },
            uFlowAngle:   { value: p.flowAngle },
            uPatchThresh: { value: p.causticThresh },
            uPatchSharp:  { value: p.causticSharp },
            uBallDir:         { value: new THREE.Vector3(0, 1, 0) },
            uRippleSpeed:     { value: p.rippleSpeed },
            uRippleWidth:     { value: p.rippleWidth },
            uRippleIntensity: { value: p.rippleIntensity },
            uWaveAmp:    { value: p.waveAmp },
            uWaveFreq:   { value: p.waveFreq },
            uWaveSpeed:  { value: p.waveSpeed },
            uSpecStr:    { value: p.specStr },
            uShininess:  { value: p.shininess },
            uBaseOpacity:{ value: p.baseOpacity },
            uPatchStr:   { value: p.causticStr },
            uSparkleStr: { value: p.sparkleStr },
            uBlobStr:    { value: p.blobStr },
        }

        const geo = new THREE.SphereGeometry(WATER_R, 128, 128)
        const mat = new THREE.ShaderMaterial({
            vertexShader:   waterVertex,
            fragmentShader: waterFragment,
            uniforms:       this.waterUniforms,
            transparent:    true,
            side:           THREE.DoubleSide,   // funziona sia da dentro che da fuori la sfera
            depthWrite:     false,
            depthTest:      false,              // non bloccare per problemi depth-buffer
        })
        this.waterSphere = new THREE.Mesh(geo, mat)
        this.waterSphere.renderOrder = 1        // render dopo tutti gli opaque
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
        const gui = new GUI({ title: '💧 Acqua Anime' })
        gui.domElement.style.maxHeight = (window.innerHeight - 20) + 'px'
        gui.domElement.style.overflowY = 'auto'
        const u = this.waterUniforms
        const p = this.params

        // ── Colori acqua ────────────────────────────────────────────────────
        const colori = gui.addFolder('Colori acqua')
        colori.addColor(p, 'deepColor') .name('Blu profondo')  .onChange(v => u.uDeepColor.value.set(v))
        colori.addColor(p, 'midColor')  .name('Ciano medio')   .onChange(v => u.uMidColor.value.set(v))
        colori.addColor(p, 'highColor') .name('Riflesso chiaro').onChange(v => u.uHighColor.value.set(v))

        // ── Macchie caustica ─────────────────────────────────────────────────
        const caustic = gui.addFolder('Macchie caustica')
        caustic.add(p, 'noiseScale',  0.4, 4.0, 0.05).name('Scala macchie')   .onChange(v => { u.uNoiseScale.value  = v })
        caustic.add(p, 'causticThresh', 0.2, 0.8, 0.01).name('Soglia macchie')  .onChange(v => { u.uPatchThresh.value = v })
        caustic.add(p, 'causticSharp',  0.01,0.20,0.01).name('Nitidezza bordi') .onChange(v => { u.uPatchSharp.value  = v })
        caustic.add(p, 'flowSpeed',   0.0, 0.5, 0.005).name('Velocità flusso').onChange(v => { u.uFlowSpeed.value   = v })
        caustic.add(p, 'flowAngle',   0.0, 6.28, 0.05).name('Direzione flusso').onChange(v => { u.uFlowAngle.value  = v })
        caustic.add(p, 'blobStr',     0.0, 1.5, 0.05) .name('Blob luce')       .onChange(v => { u.uBlobStr.value    = v })

        // ── Onde ─────────────────────────────────────────────────────────────
        const onde = gui.addFolder('Onde')
        onde.add(p, 'waveAmp',   0.0, 0.5,  0.01).name('Altezza onde')   .onChange(v => { u.uWaveAmp.value   = v })
        onde.add(p, 'waveFreq',  0.3, 8.0,  0.1) .name('Frequenza onde') .onChange(v => { u.uWaveFreq.value  = v })
        onde.add(p, 'waveSpeed', 0.0, 3.0,  0.05).name('Velocità onde')  .onChange(v => { u.uWaveSpeed.value = v })

        // ── Riflessi ─────────────────────────────────────────────────────────
        const riflessi = gui.addFolder('Riflessi & Sparkle')
        riflessi.add(p, 'specStr',    0.0, 4.0, 0.05).name('Speculare')   .onChange(v => { u.uSpecStr.value    = v })
        riflessi.add(p, 'shininess',  10,  300,  5)  .name('Lucentezza')  .onChange(v => { u.uShininess.value  = v })
        riflessi.add(p, 'sparkleStr', 0.0, 5.0, 0.1) .name('Sparkle')     .onChange(v => { u.uSparkleStr.value = v })

        // ── Trasparenza ───────────────────────────────────────────────────────
        const alpha = gui.addFolder('Trasparenza')
        alpha.add(p, 'baseOpacity', 0.0, 0.60, 0.01).name('Opacità minima') .onChange(v => { u.uBaseOpacity.value = v })
        alpha.add(p, 'causticStr',    0.0, 1.50, 0.01).name('Intensità acqua').onChange(v => { u.uPatchStr.value   = v })

        // ── Pallina ───────────────────────────────────────────────────────────
        const palla = gui.addFolder('Pallina')
        palla.add(p, 'ballSpeed',       0.0,  0.03,  0.0005).name('Velocità rotazione')
        palla.add(p, 'rippleSpeed',     0.05, 1.0,   0.01)  .name('Velocità cerchi')   .onChange(v => { u.uRippleSpeed.value     = v })
        palla.add(p, 'rippleWidth',     0.005,0.08,  0.001) .name('Spessore cerchi')   .onChange(v => { u.uRippleWidth.value     = v })
        palla.add(p, 'rippleIntensity', 0.0,  1.0,   0.01)  .name('Intensità cerchi')  .onChange(v => { u.uRippleIntensity.value = v })
        palla.add(p, 'bobSpeed',        0.5,  6.0,   0.1)   .name('Velocità ondeggio')
        palla.add(p, 'bobAmp',          0.0,  0.2,   0.005) .name('Ampiezza ondeggio')

        // ── Fondo ─────────────────────────────────────────────────────────────
        const fondo = gui.addFolder('Fondo')
        const bu = this.bottomUniforms
        fondo.addColor(p, 'crackColor') .name('Crepe')        .onChange(v => { bu.uCrackColor.value.set(v) })
        fondo.addColor(p, 'stoneA')     .name('Pietra scura') .onChange(v => { bu.uStoneA.value.set(v) })
        fondo.addColor(p, 'stoneB')     .name('Pietra chiara').onChange(v => { bu.uStoneB.value.set(v) })
        fondo.add(p, 'pebbleScale', 0.5, 8.0, 0.1).name('Scala sassi').onChange(v => { bu.uPebbleScale.value = v })


        // ── Sfondo ────────────────────────────────────────────────────────────
        const sfondo = gui.addFolder('Sfondo')
        sfondo.addColor(p, 'bgBot')      .name('Colore basso')    .onChange(v => { this.bgUniforms.uBotColor.value.set(v) })
        sfondo.addColor(p, 'bgTop')      .name('Colore alto')     .onChange(v => { this.bgUniforms.uTopColor.value.set(v) })
        sfondo.addColor(p, 'bgGlowColor').name('Bagliore centro') .onChange(v => { this.bgUniforms.uGlowColor.value.set(v) })
        sfondo.add(p, 'bgGlowRad', 1.0, 20.0, 0.5).name('Raggio bagliore').onChange(v => { this.bgUniforms.uGlowRadius.value = v })

        // ── Alone ─────────────────────────────────────────────────────────────
        const halo = gui.addFolder('Alone sfera')
        halo.addColor(p, 'glowColor').name('Colore alone').onChange(v => { this.glowUniforms.uGlowColor.value.set(v) })
        halo.add(p, 'glowStr',     0.0, 2.0,  0.01).name('Intensità alone') .onChange(v => { this.glowUniforms.uGlowStr.value     = v })
        halo.add(p, 'glowSize',    0.5, 3.0,  0.01).name('Dimensione alone').onChange(v => { this.glowMesh.scale.setScalar(v) })
        halo.add(p, 'glowFalloff', 0.5, 8.0,  0.1) .name('Diffusione alone').onChange(v => { this.glowUniforms.uGlowFalloff.value = v })
    }

    update() {
        const t = this.time.elapsed * 0.001
        this.waterUniforms.uTime.value = t

        this.phi += this.params.ballSpeed
        const theta = Math.PI * 0.45 + Math.sin(t * 0.28) * 0.38

        const nx = Math.sin(theta) * Math.cos(this.phi)
        const ny = Math.cos(theta)
        const nz = Math.sin(theta) * Math.sin(this.phi)

        const bob      = Math.sin(t * this.params.bobSpeed) * this.params.bobAmp
        const ballDist = WATER_R - BALL_R * 0.3 + bob
        this.ball.position.set(nx * ballDist, ny * ballDist, nz * ballDist)
        this.ball.rotation.y += 0.015

        this.waterUniforms.uBallDir.value.set(nx, ny, nz)
    }
}
