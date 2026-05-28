import * as THREE from 'three'
import GUI from 'lil-gui'
import gsap from 'gsap'
import Experience from '../Experience.js'
import ducks from '../ducks.js'

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
uniform sampler2D uGroundMap;
uniform sampler2D uRockyMap;
uniform float uTexScale;
uniform float uRockyBlend;
uniform vec3  uDarkColor;
uniform vec3  uMidColor;
uniform vec3  uLightColor;
uniform float uBand1;
uniform float uBand2;
uniform float uBrightness;

varying vec3 vPos;
varying vec3 vNorm;

vec3 triplanar(sampler2D tex, vec3 pos, vec3 norm, float scale) {
    vec3 w = pow(abs(norm), vec3(4.0));
    w /= w.x + w.y + w.z;
    vec3 cx = texture2D(tex, pos.yz * scale).rgb;
    vec3 cy = texture2D(tex, pos.xz * scale).rgb;
    vec3 cz = texture2D(tex, pos.xy * scale).rgb;
    return cx * w.x + cy * w.y + cz * w.z;
}

void main() {
    vec3 norm = normalize(vNorm);

    // Sample texture only as a pattern/variation source
    vec3 raw = mix(
        triplanar(uGroundMap, vPos, norm, uTexScale),
        triplanar(uRockyMap,  vPos, norm, uTexScale * 1.3),
        uRockyBlend
    );

    // Posterize luminance → 3 discrete toon bands (Blender ColorRamp style)
    float luma = dot(raw, vec3(0.299, 0.587, 0.114));
    float b1 = smoothstep(uBand1 - 0.025, uBand1 + 0.025, luma);
    float b2 = smoothstep(uBand2 - 0.025, uBand2 + 0.025, luma);
    vec3 col = mix(uDarkColor, uMidColor, b1);
    col      = mix(col, uLightColor, b2);

    // Cel-shading lighting: 3 bands matching water sphere style
    vec3  ld     = normalize(vec3(5.0, 8.0, 4.0));
    float diff   = dot(norm, ld);
    float shadow = smoothstep(-0.05, 0.10, diff);
    float light  = smoothstep( 0.35, 0.50, diff);
    float hilite = smoothstep( 0.72, 0.82, diff);
    float lum    = 0.45 + shadow * 0.20 + light * 0.25 + hilite * 0.10;

    gl_FragColor = vec4(col * lum * uBrightness, 1.0);
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
            noiseScale:  4.0,
            flowSpeed:   0.5,
            flowAngle:   4.35,
            causticThresh: 0.72,
            causticSharp:  0.06,
            waveAmp:     0.06,
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
            bobAmp:          0.0,
            // bottom
            groundTexScale:   0.82,
            groundRockyBlend: 1.0,
            groundDarkColor:  '#040e53',
            groundMidColor:   '#0a2b76',
            groundLightColor: '#4867f7',
            groundBand1:      0.4,
            groundBand2:      0.62,
            groundBrightness: 1.0,
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
            // sphere size
            waterScale:  0.83,
            // ball
            ballSpeed:   0.002,
            // ripple rings
            ringCount:     3,
            ringSpeed:     0.22,
            ringMaxRadius: 0.4,
            ringOpacity:   0.39,
            ringColor:     '#ffffff',
        }

        this.addLights()
        this.createBackground()
        this.createBottom()
        this.createWaterSphere()
        this.createGlow()
        this.createBall()
        this.createRippleRings()
        this.createGUI()

        // Apply default waterScale
        const s = this.params.waterScale
        this.waterSphere.scale.setScalar(s)
        this.glowMesh.scale.setScalar(s * this.params.glowSize)

        // Ball click / zoom state
        this._ballPaused = false
        this._origTarget = new THREE.Vector3()
        this._origCamPos = new THREE.Vector3()
        this._origZoom   = 1
        this._raycaster  = new THREE.Raycaster()
        this._mouse      = new THREE.Vector2()
        this._createPopup()
        this._setupBallClick()
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

        const groundTex = this.resources.items.groundAlbedo
        const rockyTex  = this.resources.items.groundRocky
        groundTex.wrapS = groundTex.wrapT = THREE.RepeatWrapping
        rockyTex.wrapS  = rockyTex.wrapT  = THREE.RepeatWrapping

        this.bottomUniforms = {
            uGroundMap:   { value: groundTex },
            uRockyMap:    { value: rockyTex },
            uTexScale:    { value: p.groundTexScale },
            uRockyBlend:  { value: p.groundRockyBlend },
            uDarkColor:   { value: new THREE.Color(p.groundDarkColor) },
            uMidColor:    { value: new THREE.Color(p.groundMidColor) },
            uLightColor:  { value: new THREE.Color(p.groundLightColor) },
            uBand1:       { value: p.groundBand1 },
            uBand2:       { value: p.groundBand2 },
            uBrightness:  { value: p.groundBrightness },
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
            depthTest:      true,
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

        // Main ball → first duck
        this.ball = new THREE.Mesh(geo, mat)
        this.ball.userData.duck = ducks[0]
        this.scene.add(this.ball)

        // 6 extra balls — wander-based orbit so they drift in different directions
        this._extraBalls = []
        for (let i = 0; i < 6; i++) {
            const extra = new THREE.Mesh(geo, mat)
            extra.userData = {
                duck:           ducks[i + 1],
                phiBase:        (i / 6) * Math.PI * 2,         // evenly pre-spread
                phiDrift:       (Math.random() - 0.5) * 0.6,   // slow drift, can be + or − (clockwise/counter)
                phiWanderAmp:   0.3 + Math.random() * 0.5,     // oscillation amplitude in radians
                phiWanderFreq:  0.07 + Math.random() * 0.13,   // oscillation frequency
                phiWanderPhase: Math.random() * Math.PI * 2,
                thetaBase:      Math.PI * (0.25 + Math.random() * 0.25),
                thetaAmp:       0.08 + Math.random() * 0.15,
                thetaFreq:      0.15 + Math.random() * 0.25,
                thetaPhase:     Math.random() * Math.PI * 2,
                bobPhase:       Math.random() * Math.PI * 2,
            }
            this.scene.add(extra)
            this._extraBalls.push(extra)
        }
    }

    createRippleRings() {
        const p = this.params

        this._ringsColor = new THREE.Color(p.ringColor)
        this._ringQuat   = new THREE.Quaternion()
        this._ringNorm   = new THREE.Vector3()
        this._ringZAxis  = new THREE.Vector3(0, 0, 1)
        this._lastRingT  = 0
        this._ringPool   = []

        // Unit circle in XY plane, shared across all ring lines
        const N = 80
        const pos = new Float32Array((N + 1) * 3)
        for (let i = 0; i <= N; i++) {
            const a = (i / N) * Math.PI * 2
            pos[i * 3]     = Math.cos(a)
            pos[i * 3 + 1] = Math.sin(a)
            pos[i * 3 + 2] = 0
        }
        const geo = new THREE.BufferGeometry()
        geo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3))

        for (let i = 0; i < 5; i++) {
            const mat = new THREE.LineBasicMaterial({
                color:       new THREE.Color(p.ringColor),
                transparent: true,
                opacity:     0,
                depthWrite:  false,
                blending:    THREE.AdditiveBlending,
            })
            const line = new THREE.LineLoop(geo, mat)
            line.renderOrder = 3
            this.scene.add(line)
            this._ringPool.push({
                mesh:  line,
                phase: i / Math.max(1, p.ringCount),
            })
        }
    }

    updateRippleRings() {
        const p = this.params
        const t  = this.time.elapsed
        const dt = Math.min((t - this._lastRingT) * 0.001, 0.05)
        this._lastRingT = t

        this._ringNorm.copy(this.ball.position).normalize()
        this._ringQuat.setFromUnitVectors(this._ringZAxis, this._ringNorm)

        for (let i = 0; i < this._ringPool.length; i++) {
            const ring = this._ringPool[i]
            if (i >= p.ringCount) {
                ring.mesh.visible = false
                continue
            }
            ring.mesh.visible = true
            ring.phase = (ring.phase + dt * p.ringSpeed) % 1.0

            const r = Math.max(0.001, ring.phase * p.ringMaxRadius)
            ring.mesh.scale.setScalar(r)
            ring.mesh.material.opacity = (1.0 - ring.phase) * p.ringOpacity
            ring.mesh.position.copy(this.ball.position)
            ring.mesh.quaternion.copy(this._ringQuat)
        }
    }

    _setupBallClick() {
        const canvas   = this.experience.renderer.instance.domElement
        const allBalls = () => [this.ball, ...this._extraBalls]

        canvas.addEventListener('mousemove', (e) => {
            const r = canvas.getBoundingClientRect()
            this._mouse.set(
                ((e.clientX - r.left) / r.width)  *  2 - 1,
               -((e.clientY - r.top)  / r.height) *  2 + 1
            )
            this._raycaster.setFromCamera(this._mouse, this.camera.instance)
            canvas.style.cursor = this._raycaster.intersectObjects(allBalls()).length > 0
                ? 'pointer' : ''
        })

        canvas.addEventListener('click', (e) => {
            const r = canvas.getBoundingClientRect()
            this._mouse.set(
                ((e.clientX - r.left) / r.width)  *  2 - 1,
               -((e.clientY - r.top)  / r.height) *  2 + 1
            )
            this._raycaster.setFromCamera(this._mouse, this.camera.instance)
            const hits = this._raycaster.intersectObjects(allBalls())

            if (!this._ballPaused) {
                // Not zoomed: click a ball to zoom in on it
                if (hits.length === 0) return
                this._zoomToTarget(hits[0].object)
            } else {
                // Zoomed: click anywhere outside any ball to zoom out
                if (hits.length > 0) return
                this._zoomOut()
            }
        })
    }

    _zoomToTarget(targetBall) {
        this._ballPaused = true
        const controls = this.camera.controls
        const cam      = this.camera.instance

        // Save originals (only on fresh zoom, not when switching balls)
        this._origTarget.copy(controls.target)
        this._origCamPos.copy(cam.position)
        this._origZoom = cam.zoom

        // Camera swings horizontally to face the clicked ball, keeps Y elevation
        const bx = targetBall.position.x
        const bz = targetBall.position.z
        const horizMag     = Math.sqrt(bx * bx + bz * bz)
        const camHorizDist = Math.sqrt(cam.position.x ** 2 + cam.position.z ** 2)
        const zoomCamPos   = new THREE.Vector3(
            horizMag > 0.001 ? (bx / horizMag) * camHorizDist : cam.position.x,
            cam.position.y,
            horizMag > 0.001 ? (bz / horizMag) * camHorizDist : cam.position.z,
        )

        this.camera.stopCameraMovement()

        gsap.killTweensOf(controls.target)
        gsap.killTweensOf(cam.position)
        gsap.killTweensOf(cam)

        gsap.to(controls.target, {
            x: targetBall.position.x, y: targetBall.position.y, z: targetBall.position.z,
            duration: 1.0, ease: 'power2.inOut',
        })
        gsap.to(cam.position, {
            x: zoomCamPos.x, y: zoomCamPos.y, z: zoomCamPos.z,
            duration: 1.0, ease: 'power2.inOut',
        })
        gsap.to(cam, {
            zoom: this._origZoom * 2.5,
            duration: 1.0, ease: 'power2.inOut',
            onUpdate: () => cam.updateProjectionMatrix(),
            onComplete: () => this._showPopup(targetBall.userData.duck, targetBall),
        })
    }

    _zoomOut() {
        this._ballPaused = false
        this._hidePopup()
        const controls = this.camera.controls
        const cam      = this.camera.instance

        gsap.killTweensOf(controls.target)
        gsap.killTweensOf(cam.position)
        gsap.killTweensOf(cam)

        gsap.to(controls.target, {
            x: this._origTarget.x, y: this._origTarget.y, z: this._origTarget.z,
            duration: 1.0, ease: 'power2.inOut',
        })
        gsap.to(cam.position, {
            x: this._origCamPos.x, y: this._origCamPos.y, z: this._origCamPos.z,
            duration: 1.0, ease: 'power2.inOut',
        })
        gsap.to(cam, {
            zoom: this._origZoom,
            duration: 1.0, ease: 'power2.inOut',
            onUpdate:   () => cam.updateProjectionMatrix(),
            onComplete: () => this.camera.enableCameraMovement(),
        })
    }

    _createPopup() {
        if (!document.getElementById('duck-popup-style')) {
            const style = document.createElement('style')
            style.id = 'duck-popup-style'
            style.textContent = `
                #duck-popup {
                    position: fixed;
                    z-index: 200;
                    pointer-events: none;
                    opacity: 0;
                    transform: scale(0.86);
                    transition: opacity 0.32s cubic-bezier(.4,0,.2,1),
                                transform 0.32s cubic-bezier(.4,0,.2,1);
                }
                #duck-popup.visible {
                    opacity: 1;
                    transform: scale(1);
                    pointer-events: auto;
                }
                #duck-popup .dp-card {
                    position: relative;
                    background: rgba(6, 18, 38, 0.88);
                    backdrop-filter: blur(20px);
                    -webkit-backdrop-filter: blur(20px);
                    border: 1px solid rgba(80, 160, 255, 0.25);
                    border-radius: 18px;
                    padding: 1.4rem 1.6rem 1.2rem;
                    width: 240px;
                    box-shadow: 0 16px 48px rgba(0,0,80,0.6),
                                inset 0 1px 0 rgba(120,200,255,0.1);
                    color: #e8f4ff;
                    font-family: system-ui, sans-serif;
                }
                /* small dot connector toward the ball */
                #duck-popup .dp-dot {
                    position: absolute;
                    width: 8px;
                    height: 8px;
                    background: #ff8c55;
                    border-radius: 50%;
                    box-shadow: 0 0 6px #ff8c55;
                }
                #duck-popup .dp-avatar {
                    font-size: 2rem;
                    margin-bottom: 0.5rem;
                    line-height: 1;
                }
                #duck-popup .dp-title {
                    font-size: 1.1rem;
                    font-weight: 700;
                    color: #ff8c55;
                    margin: 0 0 0.12rem;
                    letter-spacing: 0.01em;
                }
                #duck-popup .dp-name {
                    font-size: 0.68rem;
                    color: rgba(120,190,255,0.65);
                    margin: 0 0 0.7rem;
                    letter-spacing: 0.07em;
                    text-transform: uppercase;
                }
                #duck-popup .dp-desc {
                    font-size: 0.85rem;
                    color: rgba(220,238,255,0.82);
                    line-height: 1.55;
                    margin: 0 0 1rem;
                }
                #duck-popup .dp-link {
                    display: inline-block;
                    font-size: 0.78rem;
                    font-weight: 600;
                    color: #60b8ff;
                    text-decoration: none;
                    border: 1px solid rgba(80,160,255,0.35);
                    border-radius: 8px;
                    padding: 0.32rem 0.8rem;
                    transition: background 0.2s, color 0.2s;
                }
                #duck-popup .dp-link:hover {
                    background: rgba(80,160,255,0.15);
                    color: #a8d8ff;
                }
                #duck-popup .dp-hint {
                    margin-top: 0.75rem;
                    font-size: 0.64rem;
                    color: rgba(150,200,255,0.3);
                    text-align: center;
                    letter-spacing: 0.04em;
                }
            `
            document.head.appendChild(style)
        }

        const el = document.createElement('div')
        el.id = 'duck-popup'
        el.innerHTML = `
            <div class="dp-card">
                <div class="dp-dot" id="dp-dot"></div>
                <div class="dp-avatar">🦆</div>
                <p class="dp-title" id="dp-title"></p>
                <p class="dp-name"  id="dp-name"></p>
                <p class="dp-desc"  id="dp-desc"></p>
                <a class="dp-link"  id="dp-link" href="#" target="_blank">Profilo →</a>
                <p class="dp-hint">clicca fuori per chiudere</p>
            </div>
        `
        document.body.appendChild(el)
        this._popupEl = el
    }

    // Project a THREE.Vector3 world position → { x, y } screen pixels
    _worldToScreen(worldPos) {
        const v   = worldPos.clone().project(this.camera.instance)
        const el  = this.experience.renderer.instance.domElement
        return {
            x: ( v.x * 0.5 + 0.5) * el.clientWidth,
            y: (-v.y * 0.5 + 0.5) * el.clientHeight,
        }
    }

    _showPopup(duck, ball) {
        if (!duck || !this._popupEl) return

        // Fill content
        this._popupEl.querySelector('#dp-title').textContent = duck.title || duck.name
        this._popupEl.querySelector('#dp-name').textContent  = duck.name
        this._popupEl.querySelector('#dp-desc').textContent  = duck.description
        const link = this._popupEl.querySelector('#dp-link')
        link.href = duck.profileLink || '#'

        // Position next to the ball on screen
        const POPUP_W = 240, POPUP_H = 210, GAP = 22
        const sc = this._worldToScreen(ball.position)
        const vw = window.innerWidth, vh = window.innerHeight

        // Prefer right side; flip left if near right edge
        const onRight = sc.x + GAP + POPUP_W < vw - 10
        let left = onRight ? sc.x + GAP : sc.x - GAP - POPUP_W
        let top  = sc.y - POPUP_H / 2
        top = Math.max(10, Math.min(top, vh - POPUP_H - 10))

        this._popupEl.style.left = left + 'px'
        this._popupEl.style.top  = top  + 'px'

        // Position the connector dot on the edge facing the ball
        const dot = this._popupEl.querySelector('#dp-dot')
        if (onRight) {
            dot.style.left = '-5px'
            dot.style.top  = (sc.y - top - 4) + 'px'
        } else {
            dot.style.left = (POPUP_W - 3) + 'px'
            dot.style.top  = (sc.y - top - 4) + 'px'
        }

        // Grow from the ball side
        this._popupEl.style.transformOrigin = onRight ? 'left center' : 'right center'
        this._popupEl.classList.add('visible')
    }

    _hidePopup() {
        if (this._popupEl) this._popupEl.classList.remove('visible')
    }

    _updateCameraZoom() {
        // Zoom is handled by GSAP in _setupBallClick — nothing to do here
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
        fondo.add(p, 'groundTexScale',   0.10, 1.5,  0.01).name('Scala texture')    .onChange(v => { bu.uTexScale.value  = v })
        fondo.add(p, 'groundRockyBlend', 0.0,  1.0,  0.01).name('Roccia/Terra')     .onChange(v => { bu.uRockyBlend.value = v })
        fondo.addColor(p, 'groundDarkColor') .name('Colore scuro') .onChange(v => { bu.uDarkColor.value.set(v)  })
        fondo.addColor(p, 'groundMidColor')  .name('Colore medio') .onChange(v => { bu.uMidColor.value.set(v)   })
        fondo.addColor(p, 'groundLightColor').name('Colore chiaro').onChange(v => { bu.uLightColor.value.set(v) })
        fondo.add(p, 'groundBand1',      0.10, 0.60, 0.01).name('Soglia 1 (scuro→medio)') .onChange(v => { bu.uBand1.value = v })
        fondo.add(p, 'groundBand2',      0.40, 0.90, 0.01).name('Soglia 2 (medio→chiaro)').onChange(v => { bu.uBand2.value = v })
        fondo.add(p, 'groundBrightness', 0.30, 2.0,  0.05).name('Luminosità')              .onChange(v => { bu.uBrightness.value = v })


        // ── Sfondo ────────────────────────────────────────────────────────────
        const sfondo = gui.addFolder('Sfondo')
        sfondo.addColor(p, 'bgBot')      .name('Colore basso')    .onChange(v => { this.bgUniforms.uBotColor.value.set(v) })
        sfondo.addColor(p, 'bgTop')      .name('Colore alto')     .onChange(v => { this.bgUniforms.uTopColor.value.set(v) })
        sfondo.addColor(p, 'bgGlowColor').name('Bagliore centro') .onChange(v => { this.bgUniforms.uGlowColor.value.set(v) })
        sfondo.add(p, 'bgGlowRad', 1.0, 20.0, 0.5).name('Raggio bagliore').onChange(v => { this.bgUniforms.uGlowRadius.value = v })

        // ── Cerchi acqua ─────────────────────────────────────────────────────
        const cerchi = gui.addFolder('Cerchi acqua')
        cerchi.add(p, 'ringCount',     1,   5,    1)   .name('Numero cerchi').onChange(v => {
            for (let i = 0; i < this._ringPool.length; i++)
                this._ringPool[i].phase = i / Math.max(1, v)
        })
        cerchi.add(p, 'ringSpeed',     0.05, 1.5, 0.01).name('Velocità espansione')
        cerchi.add(p, 'ringMaxRadius', 0.1,  2.0, 0.05).name('Raggio massimo')
        cerchi.add(p, 'ringOpacity',   0.0,  1.0, 0.01).name('Opacità')
        cerchi.addColor(p, 'ringColor').name('Colore cerchi').onChange(v => {
            this._ringPool.forEach(r => r.mesh.material.color.set(v))
        })

        // ── Alone ─────────────────────────────────────────────────────────────
        const halo = gui.addFolder('Alone sfera')
        halo.addColor(p, 'glowColor').name('Colore alone').onChange(v => { this.glowUniforms.uGlowColor.value.set(v) })
        halo.add(p, 'glowStr',     0.0, 2.0,  0.01).name('Intensità alone') .onChange(v => { this.glowUniforms.uGlowStr.value     = v })
        halo.add(p, 'glowSize',    0.5, 3.0,  0.01).name('Dimensione alone').onChange(v => { this.glowMesh.scale.setScalar(v * p.waterScale) })
        halo.add(p, 'glowFalloff', 0.5, 8.0,  0.1) .name('Diffusione alone').onChange(v => { this.glowUniforms.uGlowFalloff.value = v })

        // ── Dimensione sfera ─────────────────────────────────────────────────
        const sfera = gui.addFolder('Dimensione sfera')
        sfera.add(p, 'waterScale', 0.3, 2.5, 0.01).name('Raggio acqua').onChange(v => {
            this.waterSphere.scale.setScalar(v)
            this.glowMesh.scale.setScalar(v * p.glowSize)
        })
    }

    update() {
        const t = this.time.elapsed * 0.001
        this.waterUniforms.uTime.value = t

        // Full orbit — pauses on ball click
        if (!this._ballPaused) this.phi += this.params.ballSpeed
        const theta = Math.PI * 0.35 + Math.sin(t * 0.25) * 0.15

        const nx = Math.sin(theta) * Math.cos(this.phi)
        const ny = Math.cos(theta)
        const nz = Math.sin(theta) * Math.sin(this.phi)

        const bob      = Math.sin(t * this.params.bobSpeed) * this.params.bobAmp
        const ballDist = WATER_R * this.params.waterScale - BALL_R * 0.3 + bob
        this.ball.position.set(nx * ballDist, ny * ballDist, nz * ballDist)
        if (!this._ballPaused) this.ball.rotation.y += 0.015

        // Extra balls — wander: slow drift (±direction) + sinusoidal oscillation
        for (const extra of this._extraBalls) {
            const d = extra.userData
            if (!this._ballPaused) d.phiBase += this.params.ballSpeed * d.phiDrift
            const ePhi   = d.phiBase + Math.sin(t * d.phiWanderFreq + d.phiWanderPhase) * d.phiWanderAmp
            const eTheta = d.thetaBase + Math.sin(t * d.thetaFreq + d.thetaPhase) * d.thetaAmp
            const eBob   = Math.sin(t * this.params.bobSpeed + d.bobPhase) * this.params.bobAmp
            const eDist  = WATER_R * this.params.waterScale - BALL_R * 0.3 + eBob
            extra.position.set(
                Math.sin(eTheta) * Math.cos(ePhi) * eDist,
                Math.cos(eTheta)                  * eDist,
                Math.sin(eTheta) * Math.sin(ePhi) * eDist,
            )
            if (!this._ballPaused) extra.rotation.y += 0.015
        }

        this.waterUniforms.uBallDir.value.set(nx, ny, nz)
        this.updateRippleRings()
        this._updateCameraZoom()
    }
}
