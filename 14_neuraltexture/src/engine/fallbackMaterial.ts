/**
 * WebGL2 fallback material. Re-implements the WGSL teacher-GGX / neural-MLP /
 * |error|×8 trio in GLSL for browsers without WebGPU. Mirrors `NeuralMaterial.ts`
 * exactly: same packed weights (uniform float array), same latent atlas texture
 * (8-tile sampler), same procedural kintsugi material from uv, same worldPos.x
 * three-ball view hack. three.js `ShaderMaterial` supplies `cameraPosition`,
 * `modelMatrix`, `modelViewMatrix`, `projectionMatrix`, `normal`, `uv` built-ins.
 */
import * as THREE from 'three'
import {
  BALL_GAP,
  KEY_LIGHT_COLOR,
  KEY_LIGHT_HEIGHT,
  KEY_LIGHT_RADIUS,
  LATENT_RESOLUTION,
  LEAKY_RELU_SLOPE,
  MLP_PARAM_COUNT,
} from '../core/constants'
import { BAKED_LATENT, BAKED_WEIGHTS } from './baked'

export interface GLSLNeuralHandle {
  material: THREE.ShaderMaterial
  setLightAngle: (a: number) => void
}

const VERT = /* glsl */`
varying vec3 vWorldPos;
varying vec3 vWorldNormal;
varying vec2 vUv;

void main() {
  vWorldPos = (modelMatrix * vec4(position, 1.0)).xyz;
  vWorldNormal = normalize(mat3(modelMatrix) * normal);
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`

const FRAG = /* glsl */`
precision highp float;

uniform float uLightAngle;
uniform float uMLP[${MLP_PARAM_COUNT}];
uniform sampler2D u_z;

varying vec3 vWorldPos;
varying vec3 vWorldNormal;
varying vec2 vUv;

const float KEY_R = ${KEY_LIGHT_RADIUS.toFixed(4)};
const float KEY_H = ${KEY_LIGHT_HEIGHT.toFixed(4)};
const vec3 KEY_COL = vec3(${KEY_LIGHT_COLOR.join(', ')});
const float LATRES = ${LATENT_RESOLUTION}.0;
const float GAP = ${BALL_GAP.toFixed(4)};
const float LEAKY = ${LEAKY_RELU_SLOPE.toFixed(4)};

float ntLeaky(float x) { return x > 0.0 ? x : x * LEAKY; }

float ntSmoothstep(float e0, float e1, float x) {
  float t = clamp((x - e0) / (e1 - e0), 0.0, 1.0);
  return t * t * (3.0 - 2.0 * t);
}

float ntVein(float u, float v) {
  float s = abs(sin(u * 22.0 + sin(v * 9.0) * 1.4) * cos(v * 17.0 + u * 3.0));
  return ntSmoothstep(0.14, 0.025, s);
}

float ntClay(float u, float v) {
  float n = 0.5 + 0.5 * sin(u * 6.5) * sin(v * 5.2 + u * 2.1);
  return ntSmoothstep(0.28, 0.72, n);
}

float ntD(float nDotH, float a) {
  float a2 = a * a;
  float d = nDotH * nDotH * (a2 - 1.0) + 1.0;
  return a2 / (3.14159265 * d * d);
}

float ntG(float nDotV, float nDotL, float a) {
  float k = (a + 1.0) * (a + 1.0) / 8.0;
  float gv = nDotV / (nDotV * (1.0 - k) + k);
  float gl = nDotL / (nDotL * (1.0 - k) + k);
  return gv * gl;
}

vec3 ntF(float vDotH, vec3 f0) {
  float p = pow(clamp(1.0 - vDotH, 0.0, 1.0), 5.0);
  return f0 + (vec3(1.0) - f0) * p;
}

vec3 ntTeacher(vec3 albedo, float rough, float metal, vec3 wi, vec3 wo) {
  float nDotL = max(wi.z, 0.0);
  float nDotV = max(wo.z, 0.0);
  if (nDotL <= 1e-4 || nDotV <= 1e-4) return vec3(0.0);
  vec3 h = normalize(wi + wo);
  float nDotH = max(h.z, 0.0);
  float vDotH = max(dot(wo, h), 0.0);
  float a = max(rough * rough, 1e-4);
  vec3 f0 = mix(vec3(0.04), albedo, metal);
  float D = ntD(nDotH, a);
  float G = ntG(nDotV, nDotL, a);
  vec3 F = ntF(vDotH, f0);
  vec3 spec = D * G * F / (4.0 * nDotV * nDotL + 1e-4);
  vec3 kd = (vec3(1.0) - F) * (1.0 - metal);
  vec3 diff = kd * albedo / 3.14159265;
  return (diff + spec) * nDotL;
}

vec3 ntWh(vec3 wi, vec3 wo) { return normalize(wi + wo); }

vec3 ntWd(vec3 wi, vec3 wh) {
  vec3 v = vec3(wh.y, -wh.x, 0.0);
  float denom = max(1.0 + wh.z, 1e-6);
  return wi * wh.z + cross(v, wi) + dot(v, wi) * v / denom;
}

// Latent atlas is laid out as 8 tiles horizontally; tile c spans u in [c/8,(c+1)/8].
float fetchZ(float px, float py, int c) {
  vec2 p = vec2((float(c) * LATRES + px) / (8.0 * LATRES), py / LATRES);
  return texture(u_z, p).r;
}

float ntSampleZ(vec2 uv, int c) {
  float fx = clamp(uv.x * LATRES - 0.5, 0.0, LATRES - 1.001);
  float fy = clamp(uv.y * LATRES - 0.5, 0.0, LATRES - 1.001);
  float x0 = floor(fx); float y0 = floor(fy);
  float x1 = min(x0 + 1.0, LATRES - 1.0);
  float y1 = min(y0 + 1.0, LATRES - 1.0);
  float tx = fx - x0; float ty = fy - y0;
  float a = fetchZ(x0, y0, c); float b = fetchZ(x1, y0, c);
  float d = fetchZ(x0, y1, c); float e = fetchZ(x1, y1, c);
  return mix(mix(a, b, tx), mix(d, e, tx), ty);
}

vec3 ntDecode(float z0, float z1, float z2, float z3, float z4, float z5, float z6, float z7, vec3 wh, vec3 wd) {
  float h0[32]; float h1[32]; float xin[14];
  xin[0] = z0; xin[1] = z1; xin[2] = z2; xin[3] = z3;
  xin[4] = z4; xin[5] = z5; xin[6] = z6; xin[7] = z7;
  xin[8] = wh.x; xin[9] = wh.y; xin[10] = wh.z;
  xin[11] = wd.x; xin[12] = wd.y; xin[13] = wd.z;

  for (int r = 0; r < 32; r++) {
    float s = uMLP[448 + r];
    int row = r * 14;
    for (int c = 0; c < 14; c++) { s += uMLP[row + c] * xin[c]; }
    h0[r] = ntLeaky(s);
  }
  for (int r = 0; r < 32; r++) {
    float s = uMLP[1504 + r];
    int row = 480 + r * 32;
    for (int c = 0; c < 32; c++) { s += uMLP[row + c] * h0[c]; }
    h1[r] = ntLeaky(s);
  }
  float y0p = uMLP[1632]; float y1p = uMLP[1633]; float y2p = uMLP[1634];
  for (int c = 0; c < 32; c++) {
    y0p += uMLP[1536 + c] * h1[c];
    y1p += uMLP[1568 + c] * h1[c];
    y2p += uMLP[1600 + c] * h1[c];
  }
  return vec3(exp(min(y0p, 12.0)), exp(min(y1p, 12.0)), exp(min(y2p, 12.0)));
}

vec3 ntEval(vec3 worldPos, vec3 worldN, vec2 uvCoord, float lightAngle) {
  vec3 n = normalize(worldN);
  vec3 t = cross(n, vec3(0.0, 1.0, 0.0));
  if (dot(t, t) < 1e-8) { t = vec3(1.0, 0.0, 0.0); } else { t = normalize(t); }
  vec3 b = cross(n, t);

  vec3 woW = normalize(cameraPosition - worldPos);
  vec3 wo = vec3(dot(woW, t), dot(woW, b), dot(woW, n));

  vec3 lightPos = vec3(KEY_R * cos(lightAngle), KEY_H, KEY_R * sin(lightAngle));
  vec3 toL = lightPos - worldPos;
  float dist2 = max(dot(toL, toL), 0.25);
  vec3 wiW = normalize(toL);
  vec3 wi = vec3(dot(wiW, t), dot(wiW, b), dot(wiW, n));
  vec3 keyCol = KEY_COL / dist2;

  vec3 fillDirW = normalize(vec3(-0.35, 0.55, 0.4));
  vec3 wiF = vec3(dot(fillDirW, t), dot(fillDirW, b), dot(fillDirW, n));
  vec3 fillCol = vec3(0.18, 0.22, 0.32);
  vec3 amb = vec3(0.03, 0.035, 0.05);

  float u = uvCoord.x; float v = uvCoord.y;
  float vein = ntVein(u, v);
  float clay = ntClay(u, v) * (1.0 - vein);
  vec3 albedo = mix(vec3(0.035, 0.028, 0.032), vec3(0.78, 0.52, 0.14), vein);
  albedo = mix(albedo, vec3(0.22, 0.12, 0.07), clay * 0.85);
  float rough = mix(0.07, 0.72, clay) * mix(1.0, 0.22, vein);
  float metal = vein * 0.96;

  vec3 teacher = ntTeacher(albedo, rough, metal, wi, wo) * keyCol
    + ntTeacher(albedo, rough, metal, wiF, wo) * fillCol
    + albedo * amb;

  float z0 = ntSampleZ(uvCoord, 0); float z1 = ntSampleZ(uvCoord, 1);
  float z2 = ntSampleZ(uvCoord, 2); float z3 = ntSampleZ(uvCoord, 3);
  float z4 = ntSampleZ(uvCoord, 4); float z5 = ntSampleZ(uvCoord, 5);
  float z6 = ntSampleZ(uvCoord, 6); float z7 = ntSampleZ(uvCoord, 7);
  vec3 wh = ntWh(wi, wo); vec3 wd = ntWd(wi, wh);
  vec3 whF = ntWh(wiF, wo); vec3 wdF = ntWd(wiF, whF);
  vec3 neural = ntDecode(z0, z1, z2, z3, z4, z5, z6, z7, wh, wd) * keyCol
    + ntDecode(z0, z1, z2, z3, z4, z5, z6, z7, whF, wdF) * fillCol
    + albedo * amb;

  vec3 err = abs(teacher - neural) * 8.0;
  float which = worldPos.x + GAP;
  if (which < GAP * 0.5) { return teacher; }
  if (which < GAP * 1.5) { return neural; }
  return err;
}

void main() {
  vec3 c = ntEval(vWorldPos, vWorldNormal, vUv, uLightAngle);
  gl_FragColor = vec4(c, 1.0);
}
`

/** Build a WebGL2-compatible maaterial from the baked weight + latent arrays. */
export function createGLSLNeuralMaterial(): GLSLNeuralHandle {
  if (BAKED_WEIGHTS.length !== MLP_PARAM_COUNT) {
    throw new Error(`baked weights ${BAKED_WEIGHTS.length} != ${MLP_PARAM_COUNT}`)
  }
  // Atlas: LATENT_RESOLUTION*8 wide × LATENT_RESOLUTION tall, 8 tiles laid
  // horizontally. Each texel holds one latent float in the R channel.
  const latentTex = new THREE.DataTexture(
    new Uint8Array(BAKED_LATENT.map((z) => Math.max(0, Math.min(255, Math.round(z * 255))))),
    LATENT_RESOLUTION * 8,
    LATENT_RESOLUTION,
    THREE.RedFormat,
  )
  latentTex.needsUpdate = true
  latentTex.magFilter = THREE.NearestFilter
  latentTex.minFilter = THREE.NearestFilter
  latentTex.colorSpace = THREE.NoColorSpace

  const lightAngle = { value: 0.6 }
  const material = new THREE.ShaderMaterial({
    vertexShader: VERT,
    fragmentShader: FRAG,
    uniforms: {
      uLightAngle: lightAngle,
      uMLP: { value: new Float32Array(BAKED_WEIGHTS) },
      u_z: { value: latentTex },
    },
    side: THREE.FrontSide,
  })

  return {
    material,
    setLightAngle: (a: number) => {
      lightAngle.value = a
    },
  }
}
