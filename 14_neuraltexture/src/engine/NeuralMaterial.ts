/**
 * TSL/WGSL fragment: teacher GGX / neural MLP / |error|×8.
 * Scalar 14→32→32→3 decoder. No Cooperative Vector.
 *
 * three r185 wgslFn parses the FIRST `fn` as the callable and also emits the
 * raw source via CodeNode — a string with extra `fn`s therefore declares
 * `compute` twice. Helpers live in a `wgsl()` CodeNode include; the kernel
 * string is exactly one function.
 */
import { MeshBasicNodeMaterial, StorageBufferAttribute } from 'three/webgpu'
import {
  cameraPosition,
  normalWorld,
  positionWorld,
  storage,
  uniform,
  uv,
  wgsl,
  wgslFn,
} from 'three/tsl'
import type { Node } from 'three/webgpu'
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

function asNode(value: unknown): Node {
  return value as Node
}

const HELPERS = /* wgsl */`
fn nt_leaky(x: f32) -> f32 {
  return select(x * ${LEAKY_RELU_SLOPE}, x, x > 0.0);
}

fn nt_smoothstep(e0: f32, e1: f32, x: f32) -> f32 {
  let t = clamp((x - e0) / (e1 - e0), 0.0, 1.0);
  return t * t * (3.0 - 2.0 * t);
}

fn nt_vein(u: f32, v: f32) -> f32 {
  let s = abs(sin(u * 22.0 + sin(v * 9.0) * 1.4) * cos(v * 17.0 + u * 3.0));
  return nt_smoothstep(0.14, 0.025, s);
}

fn nt_clay(u: f32, v: f32) -> f32 {
  let n = 0.5 + 0.5 * sin(u * 6.5) * sin(v * 5.2 + u * 2.1);
  return nt_smoothstep(0.28, 0.72, n);
}

fn nt_D(nDotH: f32, a: f32) -> f32 {
  let a2 = a * a;
  let d = nDotH * nDotH * (a2 - 1.0) + 1.0;
  return a2 / (3.14159265 * d * d);
}

fn nt_G(nDotV: f32, nDotL: f32, a: f32) -> f32 {
  let k = (a + 1.0) * (a + 1.0) / 8.0;
  let gv = nDotV / (nDotV * (1.0 - k) + k);
  let gl = nDotL / (nDotL * (1.0 - k) + k);
  return gv * gl;
}

fn nt_F(vDotH: f32, f0: vec3f) -> vec3f {
  let p = pow(clamp(1.0 - vDotH, 0.0, 1.0), 5.0);
  return f0 + (vec3f(1.0) - f0) * p;
}

fn nt_teacher(albedo: vec3f, roughness: f32, metallic: f32, wi: vec3f, wo: vec3f) -> vec3f {
  let nDotL = max(wi.z, 0.0);
  let nDotV = max(wo.z, 0.0);
  if (nDotL <= 1e-4 || nDotV <= 1e-4) { return vec3f(0.0); }
  let h = normalize(wi + wo);
  let nDotH = max(h.z, 0.0);
  let vDotH = max(dot(wo, h), 0.0);
  let a = max(roughness * roughness, 1e-4);
  let f0 = mix(vec3f(0.04), albedo, metallic);
  let D = nt_D(nDotH, a);
  let G = nt_G(nDotV, nDotL, a);
  let F = nt_F(vDotH, f0);
  let spec = D * G * F / (4.0 * nDotV * nDotL + 1e-4);
  let kd = (vec3f(1.0) - F) * (1.0 - metallic);
  let diffuse = kd * albedo / 3.14159265;
  return (diffuse + spec) * nDotL;
}

fn nt_wh(wi: vec3f, wo: vec3f) -> vec3f {
  return normalize(wi + wo);
}

fn nt_wd(wi: vec3f, wh: vec3f) -> vec3f {
  let v = vec3f(wh.y, -wh.x, 0.0);
  let denom = max(1.0 + wh.z, 1e-6);
  return wi * wh.z + cross(v, wi) + dot(v, wi) * v / denom;
}

fn nt_decode(z0: f32, z1: f32, z2: f32, z3: f32, z4: f32, z5: f32, z6: f32, z7: f32, wh: vec3f, wd: vec3f) -> vec3f {
  var h0: array<f32, 32>;
  var xin: array<f32, 14>;
  xin[0] = z0; xin[1] = z1; xin[2] = z2; xin[3] = z3;
  xin[4] = z4; xin[5] = z5; xin[6] = z6; xin[7] = z7;
  xin[8] = wh.x; xin[9] = wh.y; xin[10] = wh.z;
  xin[11] = wd.x; xin[12] = wd.y; xin[13] = wd.z;

  for (var r = 0u; r < 32u; r++) {
    var s = nt_w.value[448u + r];
    let row = r * 14u;
    for (var c = 0u; c < 14u; c++) { s = s + nt_w.value[row + c] * xin[c]; }
    h0[r] = nt_leaky(s);
  }

  var h1: array<f32, 32>;
  for (var r = 0u; r < 32u; r++) {
    var s = nt_w.value[1504u + r];
    let row = 480u + r * 32u;
    for (var c = 0u; c < 32u; c++) { s = s + nt_w.value[row + c] * h0[c]; }
    h1[r] = nt_leaky(s);
  }

  var y = vec3f(0.0);
  for (var r = 0u; r < 3u; r++) {
    var s = nt_w.value[1632u + r];
    let row = 1536u + r * 32u;
    for (var c = 0u; c < 32u; c++) { s = s + nt_w.value[row + c] * h1[c]; }
    y[r] = exp(min(s, 12.0));
  }
  return y;
}

fn nt_sample_z(u: f32, v: f32, c: u32) -> f32 {
  let fx = clamp(u * ${LATENT_RESOLUTION}.0 - 0.5, 0.0, ${LATENT_RESOLUTION}.0 - 1.001);
  let fy = clamp(v * ${LATENT_RESOLUTION}.0 - 0.5, 0.0, ${LATENT_RESOLUTION}.0 - 1.001);
  let x0 = u32(floor(fx));
  let y0 = u32(floor(fy));
  let x1 = min(x0 + 1u, ${LATENT_RESOLUTION - 1}u);
  let y1 = min(y0 + 1u, ${LATENT_RESOLUTION - 1}u);
  let tx = fx - f32(x0);
  let ty = fy - f32(y0);
  let a = nt_z.value[(y0 * ${LATENT_RESOLUTION}u + x0) * 8u + c];
  let b = nt_z.value[(y0 * ${LATENT_RESOLUTION}u + x1) * 8u + c];
  let d = nt_z.value[(y1 * ${LATENT_RESOLUTION}u + x0) * 8u + c];
  let e = nt_z.value[(y1 * ${LATENT_RESOLUTION}u + x1) * 8u + c];
  return mix(mix(a, b, tx), mix(d, e, tx), ty);
}

fn nt_eval(
  worldPos: vec3f,
  worldN: vec3f,
  camPos: vec3f,
  uvCoord: vec2f,
  lightAngle: f32
) -> vec3f {
  let n = normalize(worldN);
  var t = cross(n, vec3f(0.0, 1.0, 0.0));
  if (dot(t, t) < 1e-8) { t = vec3f(1.0, 0.0, 0.0); } else { t = normalize(t); }
  let b = cross(n, t);
  let woW = normalize(camPos - worldPos);
  let wo = vec3f(dot(woW, t), dot(woW, b), dot(woW, n));

  let lightPos = vec3f(
    ${KEY_LIGHT_RADIUS} * cos(lightAngle),
    ${KEY_LIGHT_HEIGHT},
    ${KEY_LIGHT_RADIUS} * sin(lightAngle)
  );
  let toL = lightPos - worldPos;
  let dist2 = max(dot(toL, toL), 0.25);
  let wiW = normalize(toL);
  let wi = vec3f(dot(wiW, t), dot(wiW, b), dot(wiW, n));
  let keyCol = vec3f(${KEY_LIGHT_COLOR[0]}, ${KEY_LIGHT_COLOR[1]}, ${KEY_LIGHT_COLOR[2]}) / dist2;

  let fillDirW = normalize(vec3f(-0.35, 0.55, 0.4));
  let wiF = vec3f(dot(fillDirW, t), dot(fillDirW, b), dot(fillDirW, n));
  let fillCol = vec3f(0.18, 0.22, 0.32);
  let amb = vec3f(0.03, 0.035, 0.05);

  let u = uvCoord.x;
  let v = uvCoord.y;
  let vein = nt_vein(u, v);
  let clay = nt_clay(u, v) * (1.0 - vein);
  var albedo = mix(vec3f(0.035, 0.028, 0.032), vec3f(0.78, 0.52, 0.14), vein);
  albedo = mix(albedo, vec3f(0.22, 0.12, 0.07), clay * 0.85);
  let roughness = mix(0.07, 0.72, clay) * mix(1.0, 0.22, vein);
  let metallic = vein * 0.96;

  let teacher = nt_teacher(albedo, roughness, metallic, wi, wo) * keyCol
    + nt_teacher(albedo, roughness, metallic, wiF, wo) * fillCol
    + albedo * amb;

  let z0 = nt_sample_z(u, v, 0u);
  let z1 = nt_sample_z(u, v, 1u);
  let z2 = nt_sample_z(u, v, 2u);
  let z3 = nt_sample_z(u, v, 3u);
  let z4 = nt_sample_z(u, v, 4u);
  let z5 = nt_sample_z(u, v, 5u);
  let z6 = nt_sample_z(u, v, 6u);
  let z7 = nt_sample_z(u, v, 7u);
  let wh = nt_wh(wi, wo);
  let wd = nt_wd(wi, wh);
  let whF = nt_wh(wiF, wo);
  let wdF = nt_wd(wiF, whF);
  let neural = nt_decode(z0, z1, z2, z3, z4, z5, z6, z7, wh, wd) * keyCol
    + nt_decode(z0, z1, z2, z3, z4, z5, z6, z7, whF, wdF) * fillCol
    + albedo * amb;

  let err = abs(teacher - neural) * 8.0;
  let which = worldPos.x + ${BALL_GAP};
  if (which < ${BALL_GAP * 0.5}) { return teacher; }
  if (which < ${BALL_GAP * 1.5}) { return neural; }
  return err;
}
`

const KERNEL = /* wgsl */`
fn compute(worldPos: vec3f, worldN: vec3f, camPos: vec3f, uvCoord: vec2f, lightAngle: f32) -> vec3f {
  return nt_eval(worldPos, worldN, camPos, uvCoord, lightAngle);
}
`

export interface NeuralMaterialHandle {
  material: MeshBasicNodeMaterial
  setLightAngle: (a: number) => void
}

export function createNeuralMaterial(): NeuralMaterialHandle {
  if (BAKED_WEIGHTS.length !== MLP_PARAM_COUNT) {
    throw new Error(`baked weights ${BAKED_WEIGHTS.length} != ${MLP_PARAM_COUNT}`)
  }
  const wAttr = new StorageBufferAttribute(new Float32Array(BAKED_WEIGHTS), 1)
  const zAttr = new StorageBufferAttribute(new Float32Array(BAKED_LATENT), 1)
  const wNode = storage(wAttr, 'float', MLP_PARAM_COUNT).setName('nt_w').toReadOnly()
  const zNode = storage(zAttr, 'float', BAKED_LATENT.length).setName('nt_z').toReadOnly()
  const helpers = wgsl(HELPERS)

  const kernel = wgslFn(KERNEL, [asNode(helpers), asNode(wNode), asNode(zNode)])

  const lightAngle = uniform(0.6)

  const material = new MeshBasicNodeMaterial()
  material.colorNode = kernel({
    worldPos: positionWorld,
    worldN: normalWorld,
    camPos: cameraPosition,
    uvCoord: uv(),
    lightAngle,
  }) as Node<'vec3'>
  material.toneMapped = true

  return {
    material,
    setLightAngle: (a: number) => {
      lightAngle.value = a
    },
  }
}
