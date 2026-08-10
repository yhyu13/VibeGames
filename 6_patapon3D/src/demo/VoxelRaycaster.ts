/**
 * demo/VoxelRaycaster.ts — 实时体素光线追踪(DDA voxel ray marching)
 *
 * 场景体素化到一张 3D 纹理(材质 ID 网格),片段着色器对每像素做
 * Amanatides-Woo DDA 体素遍历:
 * - 真实太阳光 + 软阴影(3 条抖动遮挡光线)
 * - 体素 AO(面邻域遮挡采样)
 * - Blinn-Phong 高光(玻璃眼 / 鼓垫 / 金角的 PBR 镜面反射)
 * - 程序化夜空 / 日轮 / 月亮 / 星星 / 远山 / 雾 / ACES 色调映射
 *
 * 零 emissive:一切可见亮度全部来自太阳光 + 环境半球光。
 * 零新增依赖,仅 three.js(Data3DTexture + RawShaderMaterial GLSL3)。
 */

import * as THREE from 'three';

// ─── 网格参数 ───
export const GRID_SIZE: readonly [number, number, number] = [64, 32, 48];
export const GRID_MIN = new THREE.Vector3(-16, -3, -12);
export const GRID_STEP = 0.5;

// ─── 材质 ID ───
export const MAT = {
  EMPTY: 0,
  GROUND: 1,
  FLOOR: 2,
  RING_PATA: 3,
  RING_PON: 4,
  RING_DON: 5,
  RING_CHAKA: 6,
  PAD_PATA: 7,
  PAD_PON: 8,
  PAD_DON: 9,
  PAD_CHAKA: 10,
  ARMY_BODY: 11,
  EYE_WHITE: 12,
  PUPIL: 13,
  FEATHER_RED: 14,
  FEATHER_TEAL: 15,
  FEATHER_LIME: 16,
  FEATHER_CYAN: 17,
  FEATHER_GOLD: 18,
  LIMB: 19,
  BOSS_BODY: 20,
  HORN: 21,
  BOSS_EYE: 22,
  BOSS_PUPIL: 23,
  AUD_PATA: 24,
  AUD_PON: 25,
  AUD_DON: 26,
  AUD_CHAKA: 27,
} as const;
export type MatId = number;

interface PalEntry {
  c: string;
  r: number;
  m: number;
  s: number;
}

/** albedo 色 + roughness + metalness + specular 强度(无 emissive) */
const PALETTE: Record<number, PalEntry> = {
  [MAT.GROUND]: { c: '#0d0a20', r: 0.95, m: 0, s: 0 },
  [MAT.FLOOR]: { c: '#121830', r: 0.6, m: 0.1, s: 0.05 },
  [MAT.RING_PATA]: { c: '#3affc8', r: 0.3, m: 0.05, s: 0.6 },
  [MAT.RING_PON]: { c: '#ffd83a', r: 0.3, m: 0.05, s: 0.6 },
  [MAT.RING_DON]: { c: '#3a8aff', r: 0.3, m: 0.05, s: 0.6 },
  [MAT.RING_CHAKA]: { c: '#ff3a8a', r: 0.3, m: 0.05, s: 0.6 },
  [MAT.PAD_PATA]: { c: '#3affc8', r: 0.15, m: 0.15, s: 0.9 },
  [MAT.PAD_PON]: { c: '#ffd83a', r: 0.15, m: 0.15, s: 0.9 },
  [MAT.PAD_DON]: { c: '#3a8aff', r: 0.15, m: 0.15, s: 0.9 },
  [MAT.PAD_CHAKA]: { c: '#ff3a8a', r: 0.15, m: 0.15, s: 0.9 },
  [MAT.ARMY_BODY]: { c: '#14100e', r: 0.35, m: 0, s: 0.1 },
  [MAT.EYE_WHITE]: { c: '#f4eed7', r: 0.1, m: 0, s: 1 },
  [MAT.PUPIL]: { c: '#0a0a0a', r: 0.3, m: 0, s: 0.3 },
  [MAT.FEATHER_RED]: { c: '#db4c34', r: 0.45, m: 0, s: 0.2 },
  [MAT.FEATHER_TEAL]: { c: '#3ac8ff', r: 0.45, m: 0, s: 0.2 },
  [MAT.FEATHER_LIME]: { c: '#9aff3a', r: 0.45, m: 0, s: 0.2 },
  [MAT.FEATHER_CYAN]: { c: '#3affc8', r: 0.45, m: 0, s: 0.2 },
  [MAT.FEATHER_GOLD]: { c: '#e0b62e', r: 0.45, m: 0.1, s: 0.4 },
  [MAT.LIMB]: { c: '#17130f', r: 0.7, m: 0, s: 0.05 },
  [MAT.BOSS_BODY]: { c: '#b8241f', r: 0.4, m: 0.05, s: 0.15 },
  [MAT.HORN]: { c: '#ffd83a', r: 0.25, m: 0.15, s: 0.8 },
  [MAT.BOSS_EYE]: { c: '#ffe9a0', r: 0.1, m: 0, s: 1 },
  [MAT.BOSS_PUPIL]: { c: '#1a0d08', r: 0.4, m: 0, s: 0.2 },
  [MAT.AUD_PATA]: { c: '#3affc8', r: 0.6, m: 0, s: 0.15 },
  [MAT.AUD_PON]: { c: '#ffd83a', r: 0.6, m: 0, s: 0.15 },
  [MAT.AUD_DON]: { c: '#3a8aff', r: 0.6, m: 0, s: 0.15 },
  [MAT.AUD_CHAKA]: { c: '#ff3a8a', r: 0.6, m: 0, s: 0.15 },
};

// ─── 舞台 / 军队 / boss 数据 ───
const STAGE_RADIUS = 9.5;
const FLOOR_Y = -2.25;
const PAD_Z = 3.4;
const PAD_X = [-4.5, -1.5, 1.5, 4.5] as const;
const PAD_ID = [MAT.PAD_PATA, MAT.PAD_PON, MAT.PAD_DON, MAT.PAD_CHAKA] as const;
const ARMY_ROOT_Y = -0.35;
const ARMY = [
  { x: -7.9, z: 0.8, accent: MAT.FEATHER_CYAN },
  { x: -6.8, z: -1.1, accent: MAT.FEATHER_LIME },
  { x: -5.4, z: 0.9, accent: MAT.FEATHER_TEAL },
] as const;
const BOSS_X = 6.8;
const BOSS_Y = 0.55;
const BOSS_Z = -0.3;
const HORN_BOXES = [
  { dz: 1.15, dy: 2.8, hx: 0.22, hy: 0.75 },
  { dz: 1.3, dy: 3.7, hx: 0.19, hy: 0.7 },
  { dz: 1.45, dy: 4.6, hx: 0.16, hy: 0.6 },
] as const;
const AUDIENCE_Y = [-1.72, -1.02, -0.32] as const;

/** 把 hex 颜色转成 [r,g,b] 0..1 */
function hexToRgb(hex: string): [number, number, number] {
  const n = parseInt(hex.replace('#', ''), 16);
  return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
}

// ─── 网格填充工具(CPU 体素化) ───
function idxOf(x: number, y: number, z: number): number {
  return x + GRID_SIZE[0]! * (y + GRID_SIZE[1]! * z);
}

function setVoxel(g: Uint8Array, x: number, y: number, z: number, id: number): void {
  if (x < 0 || y < 0 || z < 0 || x >= GRID_SIZE[0] || y >= GRID_SIZE[1] || z >= GRID_SIZE[2]) return;
  g[idxOf(x, y, z)] = id;
}

function fillBox(g: Uint8Array, cx: number, cy: number, cz: number, hx: number, hy: number, hz: number, id: number): void {
  const x0 = Math.floor((cx - hx - GRID_MIN.x) / GRID_STEP);
  const x1 = Math.floor((cx + hx - GRID_MIN.x) / GRID_STEP);
  const y0 = Math.floor((cy - hy - GRID_MIN.y) / GRID_STEP);
  const y1 = Math.floor((cy + hy - GRID_MIN.y) / GRID_STEP);
  const z0 = Math.floor((cz - hz - GRID_MIN.z) / GRID_STEP);
  const z1 = Math.floor((cz + hz - GRID_MIN.z) / GRID_STEP);
  for (let z = z0; z <= z1; z++) {
    for (let y = y0; y <= y1; y++) {
      for (let x = x0; x <= x1; x++) {
        setVoxel(g, x, y, z, id);
      }
    }
  }
}

function fillSphere(g: Uint8Array, cx: number, cy: number, cz: number, r: number, id: number): void {
  const x0 = Math.floor((cx - r - GRID_MIN.x) / GRID_STEP);
  const x1 = Math.floor((cx + r - GRID_MIN.x) / GRID_STEP);
  const y0 = Math.floor((cy - r - GRID_MIN.y) / GRID_STEP);
  const y1 = Math.floor((cy + r - GRID_MIN.y) / GRID_STEP);
  const z0 = Math.floor((cz - r - GRID_MIN.z) / GRID_STEP);
  const z1 = Math.floor((cz + r - GRID_MIN.z) / GRID_STEP);
  for (let z = z0; z <= z1; z++) {
    for (let y = y0; y <= y1; y++) {
      for (let x = x0; x <= x1; x++) {
        const wx = GRID_MIN.x + (x + 0.5) * GRID_STEP;
        const wy = GRID_MIN.y + (y + 0.5) * GRID_STEP;
        const wz = GRID_MIN.z + (z + 0.5) * GRID_STEP;
        const ddx = wx - cx;
        const ddy = wy - cy;
        const ddz = wz - cz;
        if (ddx * ddx + ddy * ddy + ddz * ddz <= r * r) setVoxel(g, x, y, z, id);
      }
    }
  }
}

function fillEllipsoid(
  g: Uint8Array,
  cx: number,
  cy: number,
  cz: number,
  rx: number,
  ry: number,
  rz: number,
  id: number,
): void {
  const x0 = Math.floor((cx - rx - GRID_MIN.x) / GRID_STEP);
  const x1 = Math.floor((cx + rx - GRID_MIN.x) / GRID_STEP);
  const y0 = Math.floor((cy - ry - GRID_MIN.y) / GRID_STEP);
  const y1 = Math.floor((cy + ry - GRID_MIN.y) / GRID_STEP);
  const z0 = Math.floor((cz - rz - GRID_MIN.z) / GRID_STEP);
  const z1 = Math.floor((cz + rz - GRID_MIN.z) / GRID_STEP);
  for (let z = z0; z <= z1; z++) {
    for (let y = y0; y <= y1; y++) {
      for (let x = x0; x <= x1; x++) {
        const wx = GRID_MIN.x + (x + 0.5) * GRID_STEP;
        const wy = GRID_MIN.y + (y + 0.5) * GRID_STEP;
        const wz = GRID_MIN.z + (z + 0.5) * GRID_STEP;
        const ddx = (wx - cx) / rx;
        const ddy = (wy - cy) / ry;
        const ddz = (wz - cz) / rz;
        if (ddx * ddx + ddy * ddy + ddz * ddz <= 1) setVoxel(g, x, y, z, id);
      }
    }
  }
}

function audId(color: string): number {
  switch (color) {
    case '#3affc8':
      return MAT.AUD_PATA;
    case '#ffd83a':
      return MAT.AUD_PON;
    case '#3a8aff':
      return MAT.AUD_DON;
    default:
      return MAT.AUD_CHAKA;
  }
}

// ─── 静态场景(地面 + 舞台 + 霓虹环 + 观众) ───
function buildStatic(g: Uint8Array): void {
  // 地面层(全场)
  for (let x = 0; x < GRID_SIZE[0]; x++) {
    for (let z = 0; z < GRID_SIZE[2]; z++) {
      setVoxel(g, x, 0, z, MAT.GROUND);
    }
  }
  // 舞台圆盘 + 四色霓虹环
  const iy = Math.floor((FLOOR_Y - GRID_MIN.y) / GRID_STEP);
  for (let x = 0; x < GRID_SIZE[0]; x++) {
    for (let z = 0; z < GRID_SIZE[2]; z++) {
      const wx = GRID_MIN.x + (x + 0.5) * GRID_STEP;
      const wz = GRID_MIN.z + (z + 0.5) * GRID_STEP;
      if (wx * wx + wz * wz > STAGE_RADIUS * STAGE_RADIUS) continue;
      const edge =
        (wx + GRID_STEP) * (wx + GRID_STEP) + wz * wz > STAGE_RADIUS * STAGE_RADIUS ||
        (wx - GRID_STEP) * (wx - GRID_STEP) + wz * wz > STAGE_RADIUS * STAGE_RADIUS ||
        wx * wx + (wz + GRID_STEP) * (wz + GRID_STEP) > STAGE_RADIUS * STAGE_RADIUS ||
        wx * wx + (wz - GRID_STEP) * (wz - GRID_STEP) > STAGE_RADIUS * STAGE_RADIUS;
      if (edge) {
        const quadrant = Math.floor(((Math.atan2(wz, wx) + Math.PI + Math.PI / 4) % (Math.PI * 2)) / (Math.PI / 2));
        setVoxel(g, x, iy, z, MAT.RING_PATA + quadrant);
      } else {
        setVoxel(g, x, iy, z, MAT.FLOOR);
      }
    }
  }
  // 观众(12 个 mini 体素)
  for (let i = 0; i < 12; i++) {
    const col = i % 4;
    const row = Math.floor(i / 4);
    const color = ['#3affc8', '#ffd83a', '#3a8aff', '#ff3a8a'][col]!;
    fillBox(g, -5.5 + col * 3.6, AUDIENCE_Y[row]!, -5.5, 0.275, 0.275, 0.275, audId(color));
  }
}

// ─── 每帧动画(鼓垫脉冲 + 军队上下浮 + boss 呼吸) ───
function drawPatapon(g: Uint8Array, x: number, rootY: number, z: number, accent: number): void {
  fillEllipsoid(g, x, rootY, z, 1.05, 1.02, 0.72, MAT.ARMY_BODY);
  fillSphere(g, x, rootY + 0.05, z + 0.62, 0.55, MAT.EYE_WHITE);
  fillSphere(g, x, rootY + 0.05, z + 1.0, 0.15, MAT.PUPIL);
  const feathers: ReadonlyArray<readonly [number, number, number]> = [
    [-0.42, 1.8, MAT.FEATHER_RED],
    [0, 2.05, accent],
    [0.42, 1.82, MAT.FEATHER_GOLD],
  ];
  for (const [px, h, id] of feathers) {
    fillBox(g, x + px, rootY + (1.05 + h) / 2, z, 0.07, (h - 1.05) / 2, 0.07, id);
  }
  fillBox(g, x - 0.92, rootY + 0.05, z, 0.08, 0.45, 0.08, MAT.LIMB);
  fillBox(g, x + 0.92, rootY + 0.05, z, 0.08, 0.45, 0.08, MAT.LIMB);
  fillBox(g, x - 0.43, rootY - 1.15, z, 0.08, 0.6, 0.08, MAT.LIMB);
  fillBox(g, x + 0.43, rootY - 1.15, z, 0.08, 0.6, 0.08, MAT.LIMB);
}

function drawBoss(g: Uint8Array, bx: number, breath: number): void {
  fillEllipsoid(g, bx, BOSS_Y, BOSS_Z, 3.2, 4.45 * breath, 2.15, MAT.BOSS_BODY);
  for (const side of [-1, 1] as const) {
    for (const horn of HORN_BOXES) {
      fillBox(g, bx, BOSS_Y + horn.dy, BOSS_Z + side * horn.dz, horn.hx, horn.hy, horn.hx, MAT.HORN);
    }
  }
  fillSphere(g, bx - 3.15, 1.3, -0.95, 0.5, MAT.BOSS_EYE);
  fillSphere(g, bx - 3.15, 1.3, 0.35, 0.5, MAT.BOSS_EYE);
  fillSphere(g, bx - 3.5, 1.3, -0.95, 0.17, MAT.BOSS_PUPIL);
  fillSphere(g, bx - 3.5, 1.3, 0.35, 0.17, MAT.BOSS_PUPIL);
}

// ─── 着色器 ───
const VERTEX_SHADER = `in vec3 position;
void main() {
  gl_Position = vec4(position, 1.0);
}
`;

const FRAGMENT_SHADER = `precision highp float;
precision highp sampler3D;

uniform sampler3D uGrid;
uniform ivec3 uGridSize;
uniform vec3 uGridMin;
uniform float uGridStep;
uniform vec3 uCamPos;
uniform vec3 uCamRight;
uniform vec3 uCamUp;
uniform vec3 uCamFwd;
uniform float uTanHalfFov;
uniform vec2 uRes;
uniform vec3 uSunDir;
uniform vec3 uSunColor;
uniform float uTime;
uniform vec4 uAlbedo[32];
uniform vec4 uMeta[32];

out vec4 outColor;

const int EMPTY = 0;

float hash11(float n) { return fract(sin(n * 127.1) * 43758.5453); }
vec3 hash33(vec3 p) {
  p = fract(p * vec3(443.8975, 441.4232, 409.6011));
  p += dot(p, p.yzx + 19.19);
  return fract((p.xxy + p.yxx) * p.zyx);
}
float invOrZero(float v) { return v == 0.0 ? 1e30 : 1.0 / v; }

vec3 gridToUv(ivec3 c) { return (vec3(c) + 0.5) / vec3(uGridSize); }

int voxel(ivec3 c) {
  if (c.x < 0 || c.y < 0 || c.z < 0 || c.x >= uGridSize.x || c.y >= uGridSize.y || c.z >= uGridSize.z) return EMPTY;
  return int(texture(uGrid, gridToUv(c)).r * 255.0 + 0.5);
}

struct Hit { bool hit; float t; ivec3 cell; int axis; int id; };

Hit marchGrid(vec3 ro, vec3 rd) {
  Hit hit;
  hit.hit = false;
  hit.t = 1e9;
  hit.cell = ivec3(0);
  hit.axis = 0;
  hit.id = EMPTY;
  vec3 bmin = uGridMin;
  vec3 bmax = uGridMin + vec3(uGridSize) * uGridStep;
  vec3 inv = vec3(invOrZero(rd.x), invOrZero(rd.y), invOrZero(rd.z));
  vec3 t0 = (bmin - ro) * inv;
  vec3 t1 = (bmax - ro) * inv;
  vec3 tmin = min(t0, t1);
  vec3 tmax = max(t0, t1);
  float tEnter = max(max(tmin.x, tmin.y), tmin.z);
  float tExit = min(min(tmax.x, tmax.y), tmax.z);
  if (tEnter > tExit) return hit;
  tEnter = max(tEnter, 0.0);
  vec3 pos = ro + rd * tEnter;
  ivec3 cell = ivec3(floor((pos - bmin) / uGridStep));
  cell = clamp(cell, ivec3(0), uGridSize - 1);
  ivec3 step = ivec3(sign(rd));
  vec3 nextCell = vec3(cell) + vec3(max(step, ivec3(0)));
  vec3 tMax = (bmin + nextCell * uGridStep - ro) * inv;
  vec3 tDelta = vec3(uGridStep) * abs(inv);
  float t = tEnter;
  while (t <= tExit && t < 300.0) {
    int id = voxel(cell);
    if (id != EMPTY) {
      hit.hit = true;
      hit.t = t;
      hit.cell = cell;
      hit.id = id;
      return hit;
    }
    if (tMax.x < tMax.y && tMax.x < tMax.z) {
      t = tMax.x;
      tMax.x += tDelta.x;
      cell.x += step.x;
      hit.axis = 0;
    } else if (tMax.y < tMax.z) {
      t = tMax.y;
      tMax.y += tDelta.y;
      cell.y += step.y;
      hit.axis = 1;
    } else {
      t = tMax.z;
      tMax.z += tDelta.z;
      cell.z += step.z;
      hit.axis = 2;
    }
  }
  return hit;
}

vec3 skyColor(vec3 rd) {
  float ty = clamp(rd.y * 0.5 + 0.5, 0.0, 1.0);
  vec3 top = vec3(0.016, 0.026, 0.1);
  vec3 mid = vec3(0.1, 0.075, 0.21);
  vec3 horizon = vec3(0.16, 0.12, 0.28);
  vec3 col = mix(horizon, mid, smoothstep(0.0, 0.25, ty));
  col = mix(col, top, smoothstep(0.25, 0.8, ty));
  // 日轮 + 光晕
  float sd = dot(rd, uSunDir);
  col += uSunColor * smoothstep(cos(0.045), cos(0.013), sd) * 5.0;
  col += uSunColor * pow(max(sd, 0.0), 28.0) * 0.9;
  // 月亮
  vec3 moonDir = normalize(vec3(-0.42, 0.3, -0.85));
  float md = dot(rd, moonDir);
  col += vec3(1.0, 0.95, 0.8) * smoothstep(cos(0.06), cos(0.057), md) * 0.9;
  col += vec3(1.0, 0.9, 0.72) * pow(max(md, 0.0), 18.0) * 0.35;
  // 星星(闪烁)
  if (rd.y > 0.05) {
    vec3 sp = rd * 600.0;
    vec3 cell = floor(sp);
    vec3 f = fract(sp) - 0.5;
    float star = hash33(cell).x;
    if (star > 0.996) {
      vec3 tint = mix(vec3(1.0), vec3(0.7, 0.85, 1.0), hash33(cell).y);
      float tw = 0.8 + 0.4 * sin(uTime * 2.0 + hash33(cell).z * 40.0);
      col += tint * tw * smoothstep(0.42, 0.05, length(f));
    }
  }
  return col;
}

vec3 mountainColor(vec3 ro, vec3 rd, out float tHit) {
  tHit = -1.0;
  float R = 29.0;
  vec2 rx = ro.xz;
  vec2 dx = rd.xz;
  float a = dot(dx, dx);
  float b = dot(rx, dx);
  float c = dot(rx, rx) - R * R;
  float disc = b * b - a * c;
  if (a > 1e-6 && disc > 0.0) {
    float t = (-b - sqrt(disc)) / a;
    if (t > 0.0) {
      vec2 p = rx + dx * t;
      float ang = atan(p.y, p.x);
      float ridge = 5.0 + 6.5 * sin(ang * 3.0 + 1.3) + 4.5 * sin(ang * 7.0 + 4.0) + 3.0 * sin(ang * 13.0 + 8.0)
        + (hash11(floor(ang * 6.0)) - 0.5) * 3.0;
      float y = ro.y + rd.y * t;
      if (y < ridge) {
        tHit = t;
        vec3 n = normalize(vec3(-p.x * 0.5, 1.0, -p.y * 0.5));
        float dif = max(dot(n, uSunDir), 0.0);
        float hFac = clamp((ridge - y) / 3.0, 0.0, 1.0);
        vec3 col = vec3(0.13, 0.09, 0.24) * (0.3 + 0.55 * dif) * (0.6 + 0.4 * hFac);
        float fogF = 1.0 - exp(-t * 0.015);
        return mix(col, vec3(0.16, 0.12, 0.28), fogF);
      }
    }
  }
  return vec3(0.0);
}

vec3 shadeGrid(Hit h, vec3 ro, vec3 rd) {
  vec3 p = ro + rd * h.t;
  vec3 n = vec3(0.0);
  if (h.axis == 0) n.x = -sign(rd.x);
  else if (h.axis == 1) n.y = -sign(rd.y);
  else n.z = -sign(rd.z);

  int id = h.id;
  vec3 albedo = uAlbedo[id].rgb;
  float rough = uAlbedo[id].a;
  float metal = uMeta[id].x;
  float spec = uMeta[id].y;

  // 太阳软阴影:固定 5-tap 太阳圆盘采样。禁止逐像素随机抖动，避免静态颗粒噪声。
  vec3 sun = uSunDir;
  vec3 b1 = normalize(cross(n, sun));
  if (length(b1) < 1e-3) b1 = vec3(0.0, 1.0, 0.0);
  vec3 b2 = cross(sun, b1);
  float sh = 0.0;
  const vec2 sunDisk[5] = vec2[5](
    vec2(0.0, 0.0),
    vec2(0.8, 0.0),
    vec2(-0.8, 0.0),
    vec2(0.0, 0.8),
    vec2(0.0, -0.8)
  );
  for (int i = 0; i < 5; i++) {
    vec3 shadowDir = normalize(sun + (b1 * sunDisk[i].x + b2 * sunDisk[i].y) * 0.018);
    Hit shHit = marchGrid(p + n * 0.035, shadowDir);
    sh += (shHit.hit && shHit.t < 60.0) ? 0.0 : 1.0;
  }
  sh /= 5.0;

  // 体素 AO:面邻域 3 方向遮挡
  ivec3 nv = ivec3(n);
  float occ = 0.0;
  if (voxel(h.cell + nv + ivec3(1, 0, 0)) != EMPTY) occ += 0.35;
  if (voxel(h.cell + nv + ivec3(0, 1, 0)) != EMPTY) occ += 0.35;
  if (voxel(h.cell + nv + ivec3(0, 0, 1)) != EMPTY) occ += 0.35;
  float ao = 1.0 - min(occ, 1.0);

  float dif = max(dot(n, sun), 0.0);
  vec3 ambient = mix(vec3(0.06, 0.05, 0.11), vec3(0.16, 0.15, 0.24), n.y * 0.5 + 0.5);
  vec3 col = albedo * (uSunColor * (3.0 * dif * sh) + ambient) * ao;

  // Blinn-Phong 高光(玻璃眼 / 鼓垫 / 金角)
  if (spec > 0.01 && dif > 0.0) {
    vec3 hv = normalize(sun - rd);
    float ndh = max(dot(n, hv), 0.0);
    float shin = 4.0 + (1.0 - rough) * 60.0;
    vec3 scol = mix(vec3(1.0), albedo, metal);
    col += scol * spec * pow(ndh, shin) * sh * uSunColor * 1.8;
  }
  // 玻璃材质:反射方向取一次天空色(廉价 env)
  if (spec > 0.5) {
    vec3 rv = reflect(rd, n);
    col += albedo * skyColor(rv) * (spec - 0.5) * 0.35;
  }

  // 大气雾
  float fogF = 1.0 - exp(-h.t * 0.012);
  col = mix(col, vec3(0.16, 0.12, 0.28), fogF);
  return col;
}

void main() {
  vec2 ndc = (gl_FragCoord.xy - 0.5 * uRes) / (0.5 * uRes.y);
  vec3 rd = normalize(uCamRight * ndc.x + uCamUp * ndc.y + uCamFwd * (1.0 / uTanHalfFov));
  vec3 ro = uCamPos;
  Hit h = marchGrid(ro, rd);
  vec3 col;
  if (h.hit) {
    col = shadeGrid(h, ro, rd);
  } else {
    float mt = -1.0;
    vec3 mcol = mountainColor(ro, rd, mt);
    col = mt > 0.0 ? mcol : skyColor(rd);
  }
  // ACES + gamma
  col = clamp(col, 0.0, 1.0);
  col = (col * (2.51 * col + 0.03)) / (col * (2.43 * col + 0.59) + 0.14);
  col = pow(clamp(col, 0.0, 1.0), vec3(1.0 / 2.2));
  outColor = vec4(col, 1.0);
}
`;

interface RayUniforms {
  [uniform: string]: THREE.IUniform;
  uGrid: { value: THREE.Data3DTexture };
  uGridSize: { value: THREE.Vector3 };
  uGridMin: { value: THREE.Vector3 };
  uGridStep: { value: number };
  uCamPos: { value: THREE.Vector3 };
  uCamRight: { value: THREE.Vector3 };
  uCamUp: { value: THREE.Vector3 };
  uCamFwd: { value: THREE.Vector3 };
  uTanHalfFov: { value: number };
  uRes: { value: THREE.Vector2 };
  uSunDir: { value: THREE.Vector3 };
  uSunColor: { value: THREE.Color };
  uTime: { value: number };
  uAlbedo: { value: Float32Array };
  uMeta: { value: Float32Array };
}

export class VoxelRaycaster {
  readonly texture: THREE.Data3DTexture;
  readonly scene: THREE.Scene;
  readonly camera: THREE.OrthographicCamera;
  readonly material: THREE.RawShaderMaterial;

  private readonly base: Uint8Array<ArrayBuffer>;
  private readonly work: Uint8Array<ArrayBuffer>;
  private readonly geometry: THREE.BufferGeometry;
  private readonly uniforms: RayUniforms;
  private readonly albedoArray = new Float32Array(32 * 4);
  private readonly metaArray = new Float32Array(32 * 4);

  constructor() {
    this.base = new Uint8Array(GRID_SIZE[0]! * GRID_SIZE[1]! * GRID_SIZE[2]!);
    this.work = new Uint8Array(this.base.length);
    buildStatic(this.base);
    this.work.set(this.base);

    this.texture = new THREE.Data3DTexture(this.work, GRID_SIZE[0], GRID_SIZE[1], GRID_SIZE[2]);
    this.texture.format = THREE.RedFormat;
    this.texture.type = THREE.UnsignedByteType;
    this.texture.minFilter = THREE.NearestFilter;
    this.texture.magFilter = THREE.NearestFilter;
    this.texture.wrapS = THREE.ClampToEdgeWrapping;
    this.texture.wrapT = THREE.ClampToEdgeWrapping;
    this.texture.wrapR = THREE.ClampToEdgeWrapping;
    this.texture.needsUpdate = true;

    // 填充调色板 uniform
    for (const [rawId, entry] of Object.entries(PALETTE)) {
      const id = Number(rawId);
      const [r, g, b] = hexToRgb(entry.c);
      this.albedoArray[id * 4] = r;
      this.albedoArray[id * 4 + 1] = g;
      this.albedoArray[id * 4 + 2] = b;
      this.albedoArray[id * 4 + 3] = entry.r;
      this.metaArray[id * 4] = entry.m;
      this.metaArray[id * 4 + 1] = entry.s;
    }

    this.uniforms = {
      uGrid: { value: this.texture },
      uGridSize: { value: new THREE.Vector3(GRID_SIZE[0], GRID_SIZE[1], GRID_SIZE[2]) },
      uGridMin: { value: GRID_MIN },
      uGridStep: { value: GRID_STEP },
      uCamPos: { value: new THREE.Vector3() },
      uCamRight: { value: new THREE.Vector3(1, 0, 0) },
      uCamUp: { value: new THREE.Vector3(0, 1, 0) },
      uCamFwd: { value: new THREE.Vector3(0, 0, -1) },
      uTanHalfFov: { value: 1 },
      uRes: { value: new THREE.Vector2(1, 1) },
      uSunDir: { value: new THREE.Vector3(0.6, 0.55, 0.6).normalize() },
      uSunColor: { value: new THREE.Color(1, 0.95, 0.85) },
      uTime: { value: 0 },
      uAlbedo: { value: this.albedoArray },
      uMeta: { value: this.metaArray },
    };

    this.material = new THREE.RawShaderMaterial({
      glslVersion: THREE.GLSL3,
      vertexShader: VERTEX_SHADER,
      fragmentShader: FRAGMENT_SHADER,
      uniforms: this.uniforms,
      depthTest: false,
      depthWrite: false,
      side: THREE.DoubleSide,
    });

    this.geometry = new THREE.BufferGeometry();
    this.geometry.setAttribute(
      'position',
      new THREE.BufferAttribute(new Float32Array([-1, -1, 0, 3, -1, 0, -1, 3, 0]), 3),
    );

    const mesh = new THREE.Mesh(this.geometry, this.material);
    mesh.frustumCulled = false;
    this.scene = new THREE.Scene();
    this.scene.add(mesh);
    this.camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
  }

  /** 每帧重体素化(动画)并上传网格 */
  animate(dt: number, t: number): void {
    void dt;
    this.work.set(this.base);
    // 鼓垫厚度脉冲
    for (let i = 0; i < 4; i++) {
      const phase = 0.5 + 0.5 * Math.sin(t * 1.8 - i * Math.PI * 0.5);
      fillBox(this.work, PAD_X[i]!, FLOOR_Y + 0.7, PAD_Z, 0.675, 0.12 + 0.06 * phase, 0.675, PAD_ID[i]!);
    }
    // 军队上下浮动
    ARMY.forEach((unit, i) => {
      const rootY = ARMY_ROOT_Y + 0.06 * Math.sin(t * 2.2 + i * 2.1);
      drawPatapon(this.work, unit.x, rootY, unit.z, unit.accent);
    });
    // boss 呼吸 + 侧移
    const bx = BOSS_X + 0.05 * Math.sin(t * 0.7);
    const breath = 1 + 0.02 * Math.sin(t * 1.3);
    drawBoss(this.work, bx, breath);
    this.texture.needsUpdate = true;
  }

  setCamera(
    pos: THREE.Vector3,
    right: THREE.Vector3,
    up: THREE.Vector3,
    fwd: THREE.Vector3,
    tanHalfFov: number,
  ): void {
    const u = this.uniforms;
    (u.uCamPos.value as THREE.Vector3).copy(pos);
    (u.uCamRight.value as THREE.Vector3).copy(right);
    (u.uCamUp.value as THREE.Vector3).copy(up);
    (u.uCamFwd.value as THREE.Vector3).copy(fwd);
    u.uTanHalfFov.value = tanHalfFov;
  }

  setSun(dir: THREE.Vector3, color: THREE.Color): void {
    (this.uniforms.uSunDir.value as THREE.Vector3).copy(dir).normalize();
    (this.uniforms.uSunColor.value as THREE.Color).copy(color);
  }

  setSize(width: number, height: number): void {
    (this.uniforms.uRes.value as THREE.Vector2).set(width, height);
  }

  setTime(t: number): void {
    this.uniforms.uTime.value = t;
  }

  render(renderer: THREE.WebGLRenderer): void {
    renderer.render(this.scene, this.camera);
  }

  dispose(): void {
    this.texture.dispose();
    this.geometry.dispose();
    this.material.dispose();
  }
}
