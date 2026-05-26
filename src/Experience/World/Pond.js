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
uniform float uGlowRadius;  // world-space radius of central glow
void main() {
    float t   = clamp(vWorldPos.y / 18.0 * 0.5 + 0.5, 0.0, 1.0);
    vec3  col = mix(uBotColor, uTopColor, t);
    // Soft radial glow toward scene centre (the water sphere)
    float dist  = length(vWorldPos.xz);          // horizontal distance
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
void main() {
    vec3  v       = normalize(-vViewPos);
    float fresnel = pow(1.0 - max(dot(vNorm, v), 0.0), 2.5);
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

// ── Hash ──────────────────────────────────────────────────────────────────────
vec3 h3b(vec3 p) {
    p = vec3(dot(p, vec3(127.1, 311.7,  74.7)),
             dot(p, vec3(269.5, 183.3, 246.1)),
             dot(p, vec3(113.5, 271.9, 124.6)));
    return fract(sin(p) * 43758.5453);
}

// ── Voronoi: returns (f2-f1, cellHash) ───────────────────────────────────────
// f2-f1 = 0 at crack borders, larger inside pebble
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

// ── 2D value noise for surface texture ───────────────────────────────────────
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
    float edge = vr.x;    // 0 = crack, larger = inside pebble
    float ch   = vr.y;    // per-pebble random [0,1]

    // Surface micro-noise (slight color variation inside each pebble)
    float surf = n2b(vNorm.xz * uPebbleScale * 5.0) * 0.12 - 0.06;

    // Three stone types blended via step — no branching
    vec3 grayStone  = mix(vec3(0.52, 0.57, 0.62), vec3(0.67, 0.70, 0.73), ch * 4.0);
    vec3 warmStone  = mix(uStoneA,                 uStoneB,                 (ch - 0.25) * 2.5);
    vec3 darkStone  = uStoneA * mix(0.60, 0.82, (ch - 0.65) * 5.0);
    vec3 algaeStone = mix(vec3(0.36, 0.50, 0.25), vec3(0.48, 0.60, 0.32), (ch - 0.85) * 6.7);

    vec3 pebCol = grayStone  * (1.0 - step(0.25, ch))
                + warmStone  * step(0.25, ch) * (1.0 - step(0.65, ch))
                + darkStone  * step(0.65, ch) * (1.0 - step(0.85, ch))
                + algaeStone * step(0.85, ch);
    pebCol = clamp(pebCol + surf, 0.0, 1.0);

    // Crack: dark line at cell borders
    float crack = 1.0 - smoothstep(0.03, 0.10, edge);
    vec3  col   = mix(pebCol, uCrackColor, crack);

    // Anime cel-shading: 2 discrete light bands
    vec3  ld     = normalize(vec3(5.0, 8.0, 4.0));
    float diff   = dot(vNorm, ld);
    float shadow = smoothstep(-0.05, 0.10, diff);
    float light  = smoothstep( 0.35, 0.50, diff);
    float hilite = smoothstep( 0.72, 0.82, diff);
    float lum    = 0.28 + shadow * 0.22 + light * 0.32 + hilite * 0.18;

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
varying float vWaveCrest;   // normalised height → crest-foam in fragment shader

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

    vWaveCrest  = h0 / max(uWaveAmp, 0.001);   // roughly -1 … +1
    vPos        = dispPos;
    vNorm       = dispN;
    vec4 mvPos  = modelViewMatrix * vec4(dispPos, 1.0);
    vViewPos    = mvPos.xyz;
    gl_Position = projectionMatrix * mvPos;
}
`

// ── Water fragment ────────────────────────────────────────────────────────────

const waterFragment = /* glsl */`
uniform float uTime;

uniform vec3  uDeepColor;
uniform vec3  uMidColor;
uniform vec3  uHighColor;

uniform float uCellScale;
uniform float uCellSpeed;
uniform float uSmoothness;
uniform float uDistortAmt;

uniform float uEdgeLow;
uniform float uEdgeHigh;
uniform float uMidPos;

uniform vec3  uBallDir;
uniform float uRippleSpeed;
uniform float uRippleWidth;
uniform float uRippleIntensity;

uniform float uFoamRadius;
uniform float uFoamAmount;

uniform float uSpecStr;
uniform float uShininess;
uniform float uBaseOpacity;
uniform float uMicroStr;

uniform float uFlowSpeed;
uniform float uFlowAngle;
uniform float uStreakStr;
uniform float uGlintScale;
uniform float uGlintSize;

varying vec3  vPos;
varying vec3  vNorm;
varying vec3  vViewPos;
varying float vWaveCrest;

// ── Voronoi 3D ────────────────────────────────────────────────────────────────

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
    vec3 i = floor(p), f = fract(p); float md = 8.0;
    for (int z=-1;z<=1;z++) for (int y=-1;y<=1;y++) for (int x=-1;x<=1;x++) {
        vec3 n = vec3(float(x),float(y),float(z));
        md = min(md, length(n + cellPt3(hash3(i+n)) - f));
    }
    return md;
}
float voronoiSF1(vec3 p) {
    vec3 i = floor(p), f = fract(p); float res = 8.0;
    for (int z=-1;z<=1;z++) for (int y=-1;y<=1;y++) for (int x=-1;x<=1;x++) {
        vec3 n = vec3(float(x),float(y),float(z));
        res = smin(res, length(n + cellPt3(hash3(i+n)) - f), uSmoothness);
    }
    return res;
}
// Returns vec2(f1, cellHash) — cellHash is stable per Voronoi cell (nearest-site hash)
vec2 voronoiF1H(vec3 p) {
    vec3 i = floor(p), f = fract(p); float md = 8.0; float ch = 0.0;
    for (int z=-1;z<=1;z++) for (int y=-1;y<=1;y++) for (int x=-1;x<=1;x++) {
        vec3  n    = vec3(float(x), float(y), float(z));
        vec3  seed = hash3(i + n);
        float d    = length(n + cellPt3(seed) - f);
        if (d < md) { md = d; ch = fract(dot(seed, vec3(0.39, 0.27, 0.34))); }
    }
    return vec2(md, ch);
}

// ── fBm ───────────────────────────────────────────────────────────────────────

float nHash(vec2 p) {
    p = fract(p * vec2(127.1, 311.7)); p += dot(p, p + 45.32);
    return fract(p.x * p.y);
}
float vnoise(vec2 p) {
    vec2 i=floor(p), f=fract(p); f=f*f*(3.0-2.0*f);
    return mix(mix(nHash(i),nHash(i+vec2(1,0)),f.x),
               mix(nHash(i+vec2(0,1)),nHash(i+vec2(1,1)),f.x),f.y);
}
float fbm(vec2 p) {
    float v=0.0,a=0.5;
    for(int i=0;i<3;i++){v+=a*vnoise(p);p*=2.0;a*=0.5;}
    return v;
}

void main() {
    vec3  viewDir = normalize(-vViewPos);

    // Directional flow vector
    vec2  flowVec = vec2(cos(uFlowAngle), sin(uFlowAngle)) * uFlowSpeed;

    // fBm distortion — scrolls in flow direction so distortion moves with water
    vec2  nuv  = vNorm.xz * 1.5 + flowVec * uTime * 1.5 + vec2(0.0, vNorm.y * 0.5);
    vec3  dist = vNorm * (fbm(nuv) - 0.5) * uDistortAmt;

    // Primary Voronoi layer — drives colour ramp + cell hash for reflections
    vec3  p3    = vPos * uCellScale + vec3(flowVec.x, 0.0, flowVec.y) * uTime + dist;
    vec2  vF1H  = voronoiF1H(p3);
    float f1    = vF1H.x;
    float cHash = vF1H.y;   // stable per Voronoi cell
    float sf1   = voronoiSF1(p3);
    float edge  = f1 - sf1;

    // Ripple rings from ball
    float angDist = acos(clamp(dot(normalize(vPos), uBallDir), -1.0, 1.0));
    float ripple  = 0.0;
    for (int r=0; r<3; r++) {
        float off    = float(r) * 0.13;
        float radius = mod(uTime * uRippleSpeed + off, 0.28);
        ripple += smoothstep(uRippleWidth, 0.0, abs(angDist - radius)) * exp(-radius * 9.0);
    }
    edge += ripple * uRippleIntensity * 0.18;

    // Foam near ball
    float fp = smoothstep(uFoamRadius, 0.0, angDist);
    edge += fp * (fbm(vNorm.xz*13.0+vec2(uTime*1.1, vNorm.y*3.5))*0.65
                + fbm(vNorm.xz*27.0+vec2(uTime*2.3,-vNorm.y*6.0))*0.35) * uFoamAmount;

    // Toon colour ramp (sharp bands, anime style)
    float t    = smoothstep(uEdgeLow, uEdgeHigh, edge);
    float seg0 = clamp(t / uMidPos, 0.0, 1.0);
    float seg1 = clamp((t - uMidPos) / (1.0 - uMidPos), 0.0, 1.0);
    vec3  col  = mix(mix(uDeepColor, uMidColor, seg0),
                     mix(uMidColor,  uHighColor, seg1), step(uMidPos, t));

    // Micro-ripple normal perturbation for subtle surface detail
    vec2  microUV = vPos.xz * 12.0 + vec2(uTime * 0.8, uTime * 0.6);
    float microN  = (fbm(microUV) - 0.5) * uMicroStr;
    vec3  pertN   = normalize(vNorm + vec3(microN, 0.0, microN));

    // Voronoi-cell reflections: the interior of certain cells flashes to highColor,
    // like mirror patches on water (anime style). cHash is stable per Voronoi cell
    // so each cell has its own consistent phase — no circle geometry needed.
    // uGlintScale = fraction of cells that reflect (0=nessuna, 1=tutte).
    // uGlintSize  = quanto dentro la cella si illumina (soglia su 'edge').
    float cellInside = 1.0 - smoothstep(0.0, uGlintSize, edge);
    float rPhase  = cHash * 6.2831 + (1.0 - cHash) * 11.3;
    float rRaw    = 0.5 + 0.5 * sin(uTime * (0.22 + cHash * 0.38) + rPhase);
    float rFade   = smoothstep(0.52, 0.88, rRaw);
    float rActive = step(1.0 - uGlintScale, cHash);
    col += uHighColor * cellInside * rActive * rFade * uSpecStr;

    // Flow streaks — small directional dashes (anime water marks)
    // Inline tiled approach: two layers, each with per-cell random dashes
    float stCA = cos(uFlowAngle), stSA = sin(uFlowAngle);

    // Layer A (coarser)
    vec2  stUVa   = vNorm.xz * 4.5 + flowVec * uTime;
    vec2  stCella = floor(stUVa);
    vec2  stFraca = fract(stUVa);
    float stRa    = fract(sin(dot(stCella, vec2(127.1, 311.7))) * 43758.5453);
    float stRa2   = fract(sin(dot(stCella, vec2(269.5, 183.3))) * 43758.5453);
    vec2  stDa    = stFraca - vec2(0.3 + stRa * 0.4, 0.3 + stRa2 * 0.4);
    float stAa    =  stDa.x * stCA + stDa.y * stSA;
    float stBa    = -stDa.x * stSA + stDa.y * stCA;
    float stLena  = 0.11 + stRa2 * 0.08;
    float stMarka = (1.0 - smoothstep(0.0, 0.028, abs(stBa)))
                  * (1.0 - smoothstep(stLena * 0.4, stLena, abs(stAa)))
                  * step(0.42, stRa) * (0.4 + stRa2 * 0.6);

    // Layer B (finer)
    vec2  stUVb   = vNorm.xz * 7.0 + flowVec * uTime * 1.3;
    vec2  stCellb = floor(stUVb);
    vec2  stFracb = fract(stUVb);
    float stRb    = fract(sin(dot(stCellb, vec2(127.1, 311.7))) * 43758.5453);
    float stRb2   = fract(sin(dot(stCellb, vec2(269.5, 183.3))) * 43758.5453);
    vec2  stDb    = stFracb - vec2(0.3 + stRb * 0.4, 0.3 + stRb2 * 0.4);
    float stAb    =  stDb.x * stCA + stDb.y * stSA;
    float stBb    = -stDb.x * stSA + stDb.y * stCA;
    float stLenb  = 0.11 + stRb2 * 0.08;
    float stMarkb = (1.0 - smoothstep(0.0, 0.028, abs(stBb)))
                  * (1.0 - smoothstep(stLenb * 0.4, stLenb, abs(stAb)))
                  * step(0.42, stRb) * (0.4 + stRb2 * 0.6);

    col += uHighColor * clamp(stMarka + stMarkb, 0.0, 1.0) * uStreakStr;

    // Alpha: uniform base opacity, foam/edges slightly more opaque
    // Deliberately no Fresnel → transparency is consistent across the whole sphere
    float foamMask = smoothstep(uEdgeLow, uEdgeHigh, edge);
    float alpha    = clamp(uBaseOpacity + foamMask * (0.92 - uBaseOpacity), 0.0, 1.0);

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
            deepColor:  '#1a6fa0',
            midColor:   '#6dd0ef',
            highColor:  '#eaf8ff',
            cellScale:  4.61,
            cellSpeed:  0.48,
            smoothness: 0.61,
            distortAmt: 0.45,
            edgeLow:    0.19,
            edgeHigh:   0.25,
            midPos:     0.21,
            crackColor:  '#0d0a07',
            stoneA:      '#9e7a50',
            stoneB:      '#c8a06a',
            pebbleScale: 3.5,
            rippleSpeed:     0.25,
            rippleWidth:     0.06,
            rippleIntensity: 1.0,
            bobSpeed:        1.9,
            bobAmp:          0.055,
            foamRadius:  0.15,
            foamAmount:  1.20,
            waveAmp:     0.14,
            waveFreq:    1.2,
            waveSpeed:   1.25,
            specStr:     2.0,
            shininess:   108,
            glintScale:  0.40,
            glintSize:   0.15,
            baseOpacity: 0.40,
            streakStr:   0.70,
            microStr:    0.4,
            // background
            bgBot:       '#050d1a',
            bgTop:       '#0d2035',
            bgGlowColor: '#1a4a7a',
            bgGlowRad:   8.0,
            // halo
            glowColor:   '#3399ff',
            glowStr:     0.07,
            // ball
            ballSpeed:   0.0045,
            // flow & sparkles
            flowSpeed:    0.9,
            flowAngle:    0.3,
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
            uGlowColor: { value: new THREE.Color(p.glowColor) },
            uGlowStr:   { value: p.glowStr },
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
        this.scene.add(new THREE.Mesh(geo, mat))
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
            uFoamRadius:  { value: p.foamRadius },
            uFoamAmount:  { value: p.foamAmount },
            uWaveAmp:     { value: p.waveAmp },
            uWaveFreq:    { value: p.waveFreq },
            uWaveSpeed:   { value: p.waveSpeed },
            uSpecStr:     { value: p.specStr },
            uShininess:   { value: p.shininess },
            uGlintScale:  { value: p.glintScale },
            uGlintSize:   { value: p.glintSize },
            uBaseOpacity: { value: p.baseOpacity },
            uStreakStr:   { value: p.streakStr },
            uMicroStr:    { value: p.microStr },
            uFlowSpeed:    { value: p.flowSpeed },
            uFlowAngle:    { value: p.flowAngle },
        }

        const geo = new THREE.SphereGeometry(WATER_R, 128, 128)
        const mat = new THREE.ShaderMaterial({
            vertexShader:   waterVertex,
            fragmentShader: waterFragment,
            uniforms:       this.waterUniforms,
            transparent:    true,
            side:           THREE.FrontSide,
            depthWrite:     false,
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
        const u = this.waterUniforms
        const p = this.params

        const colori = gui.addFolder('Colori')
        colori.addColor(p, 'deepColor') .name('Blu profondo')    .onChange(v => u.uDeepColor.value.set(v))
        colori.addColor(p, 'midColor')  .name('Blu medio')       .onChange(v => u.uMidColor.value.set(v))
        colori.addColor(p, 'highColor') .name('Schiuma / bordi') .onChange(v => u.uHighColor.value.set(v))

        const onde = gui.addFolder('Onde')
        onde.add(p, 'cellScale',  0.2, 5.0,  0.01).name('Dimensione celle')     .onChange(v => { u.uCellScale.value  = v })
        onde.add(p, 'cellSpeed',  0.0, 2.0,  0.01).name('Velocità animazione')  .onChange(v => { u.uCellSpeed.value  = v })
        onde.add(p, 'smoothness', 0.1, 1.5,  0.01).name('Morbidezza bordi')     .onChange(v => { u.uSmoothness.value = v })
        onde.add(p, 'distortAmt', 0.0, 0.8,  0.01).name('Distorsione / rumore') .onChange(v => { u.uDistortAmt.value = v })
        onde.add(p, 'waveAmp',    0.0, 0.5,  0.01).name('Altezza onde')         .onChange(v => { u.uWaveAmp.value    = v })
        onde.add(p, 'waveFreq',   0.3, 8.0,  0.1) .name('Frequenza onde')       .onChange(v => { u.uWaveFreq.value   = v })
        onde.add(p, 'waveSpeed',  0.0, 3.0,  0.05).name('Velocità onde')        .onChange(v => { u.uWaveSpeed.value  = v })

        const ramp = gui.addFolder('Transizione colori')
        ramp.add(p, 'edgeLow',  0.00, 0.50, 0.005).name('Soglia bassa')        .onChange(v => { u.uEdgeLow.value  = v })
        ramp.add(p, 'edgeHigh', 0.05, 0.80, 0.005).name('Soglia alta')         .onChange(v => { u.uEdgeHigh.value = v })
        ramp.add(p, 'midPos',   0.10, 0.90, 0.01) .name('Posizione blu medio') .onChange(v => { u.uMidPos.value   = v })

        const palla = gui.addFolder('Pallina')
        palla.add(p, 'ballSpeed',       0.0,  0.03,  0.0005).name('Velocità rotazione')
        palla.add(p, 'rippleSpeed',     0.05, 1.0,   0.01) .name('Velocità cerchi')   .onChange(v => { u.uRippleSpeed.value     = v })
        palla.add(p, 'rippleWidth',     0.005, 0.08, 0.001).name('Spessore cerchi')   .onChange(v => { u.uRippleWidth.value     = v })
        palla.add(p, 'rippleIntensity', 0.0,  1.0,   0.01) .name('Intensità cerchi')  .onChange(v => { u.uRippleIntensity.value = v })
        palla.add(p, 'bobSpeed',        0.5,  6.0,   0.1)  .name('Velocità ondeggio')
        palla.add(p, 'bobAmp',          0.0,  0.2,   0.005).name('Ampiezza ondeggio')

        const schiuma = gui.addFolder('Schiuma pallina')
        schiuma.add(p, 'foamRadius', 0.05, 1.5, 0.01).name('Raggio schiuma')   .onChange(v => { u.uFoamRadius.value = v })
        schiuma.add(p, 'foamAmount', 0.0,  3.0, 0.05).name('Quantità schiuma') .onChange(v => { u.uFoamAmount.value = v })

        const riflessi = gui.addFolder('Riflessi')
        riflessi.add(p, 'specStr',   0.0, 4.0,  0.05).name('Intensità')            .onChange(v => { u.uSpecStr.value    = v })
        riflessi.add(p, 'glintScale',0.0, 1.0,  0.01).name('Celle riflettenti')   .onChange(v => { u.uGlintScale.value = v })
        riflessi.add(p, 'glintSize', 0.0, 0.40, 0.01).name('Area interna cella')  .onChange(v => { u.uGlintSize.value  = v })
        riflessi.add(p, 'streakStr', 0.0, 2.0,  0.05).name('Segni flusso')      .onChange(v => { u.uStreakStr.value = v })
        riflessi.add(p, 'microStr',  0.0, 0.4,  0.01).name('Micro-increspature').onChange(v => { u.uMicroStr.value  = v })

        const sfondo = gui.addFolder('Sfondo')
        sfondo.addColor(p, 'bgBot')      .name('Colore basso')    .onChange(v => { this.bgUniforms.uBotColor.value.set(v) })
        sfondo.addColor(p, 'bgTop')      .name('Colore alto')     .onChange(v => { this.bgUniforms.uTopColor.value.set(v) })
        sfondo.addColor(p, 'bgGlowColor').name('Bagliore centro') .onChange(v => { this.bgUniforms.uGlowColor.value.set(v) })
        sfondo.add(p, 'bgGlowRad', 1.0, 20.0, 0.5).name('Raggio bagliore').onChange(v => { this.bgUniforms.uGlowRadius.value = v })

        const halo = gui.addFolder('Alone sfera')
        halo.addColor(p, 'glowColor').name('Colore alone').onChange(v => { this.glowUniforms.uGlowColor.value.set(v) })
        halo.add(p, 'glowStr', 0.0, 1.0, 0.01).name('Intensità alone').onChange(v => { this.glowUniforms.uGlowStr.value = v })

        const trasparenza = gui.addFolder('Trasparenza')
        trasparenza.add(p, 'baseOpacity', 0.0, 1.0, 0.01).name('Opacità base').onChange(v => { u.uBaseOpacity.value = v })

        const flusso = gui.addFolder('Flusso')
        flusso.add(p, 'flowSpeed', 0.0, 2.0,  0.01).name('Velocità flusso') .onChange(v => { u.uFlowSpeed.value = v })
        flusso.add(p, 'flowAngle', 0.0, 6.28, 0.05).name('Direzione flusso').onChange(v => { u.uFlowAngle.value = v })

        const fondo = gui.addFolder('Fondo')
        const bu = this.bottomUniforms
        fondo.addColor(p, 'crackColor') .name('Crepe')        .onChange(v => { bu.uCrackColor.value.set(v) })
        fondo.addColor(p, 'stoneA')     .name('Pietra scura') .onChange(v => { bu.uStoneA.value.set(v) })
        fondo.addColor(p, 'stoneB')     .name('Pietra chiara').onChange(v => { bu.uStoneB.value.set(v) })
        fondo.add(p, 'pebbleScale', 0.5, 8.0, 0.1).name('Scala sassi').onChange(v => { bu.uPebbleScale.value = v })
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
