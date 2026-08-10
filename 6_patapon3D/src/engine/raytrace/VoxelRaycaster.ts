/**
 * engine/raytrace/VoxelRaycaster.ts — 共享体素光线追踪核心(DDA voxel ray marching)
 *
 * 场景体素化到一张 3D 纹理(材质 ID 网格),片段着色器对每像素做
 * Amanatides-Woo DDA 体素遍历:
 * - 真实太阳光 + 确定性 5-tap 软阴影(可降级 1-tap)
 * - 体素 AO(面邻域遮挡采样)
 * - Blinn-Phong 高光(玻璃眼 / 鼓垫 / 金角的 PBR 镜面反射)
 * - 程序化夜空 / 日轮 / 月亮 / 星星 / 远山 / 雾 / ACES 色调映射
 *
 * 零 emissive:一切可见亮度全部来自太阳光 + 环境半球光 + 天空光。
 * 零新增依赖,仅 three.js(Data3DTexture + RawShaderMaterial GLSL3)。
 *
 * 本类是场景无关核心:静态层与动态层网格由调用方通过 writeStatic /
 * beginDynamic+commitDynamic 写入(见 demo/demoScene.ts、raytrace 各场景构建器)。
 * 光照全部经 setLighting 以 uniform 驱动(intro 明暗节拍不得改材质 emissive)。
 */

import * as THREE from 'three';
import type { LightingState } from './SceneContract';

// ─── 网格参数 ───
// 320×128×224 @0.125(四倍密度)≈ 9.2MB/次全量上传;世界范围不变
// x∈[-20,20] y∈[-3,13] z∈[-16,12]。
// 遍历为两级 DDA:4³ 体素一个宏格(80×32×56 占用纹理 ≈143KB),
// 空宏格整格跳过 —— 这是 shader 友好型的层次加速结构(等效 BVH 的
// 空间剪枝:绝大多数光线步进数 ÷4),支撑高密度下的实时帧率。
export const GRID_SIZE: readonly [number, number, number] = [320, 128, 224];
export const GRID_MIN = new THREE.Vector3(-20, -3, -16);
export const GRID_STEP = 0.125;
/** 宏格边长(细体素数);三个维度必须能被它整除 */
export const MACRO_CELL = 4;
export const MACRO_SIZE: readonly [number, number, number] = [
  GRID_SIZE[0] / MACRO_CELL,
  GRID_SIZE[1] / MACRO_CELL,
  GRID_SIZE[2] / MACRO_CELL,
];

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
  FEATHER_VIOLET: 28,
  // ─── intro 场景(暗红 boss / 地形 / 树木 / 箭矢 / 碎屑) ───
  BOSS_DARK: 29,
  BELLY: 30,
  MOUTH: 31,
  INTERIOR: 32,
  TERRAIN_TOP: 33,
  EARTH: 34,
  TREE_TRUNK: 35,
  TREE_BRANCH: 36,
  TREE_ROOT: 37,
  CANOPY_DARK: 38,
  CANOPY_LIGHT: 39,
  BOW_GOLD: 40,
  ARROW_WOOD: 41,
  ARROW_TIP: 42,
  DEBRIS: 43,
} as const;
export type MatId = number;

/** 调色板表容量(uniform 数组大小;材质 ID 必须 < MAT_COUNT) */
export const MAT_COUNT = 64;

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
  [MAT.FEATHER_VIOLET]: { c: '#c83aff', r: 0.45, m: 0, s: 0.2 },
  [MAT.BOSS_DARK]: { c: '#84291f', r: 0.72, m: 0, s: 0.08 },
  [MAT.BELLY]: { c: '#f0db8a', r: 0.52, m: 0, s: 0.1 },
  [MAT.MOUTH]: { c: '#25120f', r: 0.7, m: 0, s: 0.05 },
  [MAT.INTERIOR]: { c: '#35100e', r: 0.94, m: 0, s: 0 },
  [MAT.TERRAIN_TOP]: { c: '#6f9b45', r: 0.9, m: 0, s: 0 },
  [MAT.EARTH]: { c: '#6d4328', r: 0.96, m: 0, s: 0 },
  [MAT.TREE_TRUNK]: { c: '#30251f', r: 0.88, m: 0, s: 0 },
  [MAT.TREE_BRANCH]: { c: '#3d3022', r: 0.88, m: 0, s: 0 },
  [MAT.TREE_ROOT]: { c: '#4a3524', r: 0.88, m: 0, s: 0 },
  [MAT.CANOPY_DARK]: { c: '#326f3d', r: 0.88, m: 0, s: 0 },
  [MAT.CANOPY_LIGHT]: { c: '#579348', r: 0.88, m: 0, s: 0 },
  [MAT.BOW_GOLD]: { c: '#d8aa4c', r: 0.62, m: 0.05, s: 0.3 },
  [MAT.ARROW_WOOD]: { c: '#54351f', r: 0.8, m: 0, s: 0.05 },
  [MAT.ARROW_TIP]: { c: '#d7cfb6', r: 0.35, m: 0.1, s: 0.4 },
  [MAT.DEBRIS]: { c: '#7b251e', r: 0.76, m: 0, s: 0.05 },
};

/** 把 hex 颜色转成 [r,g,b] 0..1 */
function hexToRgb(hex: string): [number, number, number] {
  const n = parseInt(hex.replace('#', ''), 16);
  return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
}

// ─── 网格填充工具(CPU 体素化,供场景构建器使用) ───
function idxOf(x: number, y: number, z: number): number {
  return x + GRID_SIZE[0]! * (y + GRID_SIZE[1]! * z);
}

export function setVoxel(g: Uint8Array, x: number, y: number, z: number, id: number): void {
  if (x < 0 || y < 0 || z < 0 || x >= GRID_SIZE[0] || y >= GRID_SIZE[1] || z >= GRID_SIZE[2]) return;
  g[idxOf(x, y, z)] = id;
}

export function fillBox(
  g: Uint8Array,
  cx: number,
  cy: number,
  cz: number,
  hx: number,
  hy: number,
  hz: number,
  id: number,
): void {
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

export function fillSphere(g: Uint8Array, cx: number, cy: number, cz: number, r: number, id: number): void {
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

export function fillEllipsoid(
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

// ─── 着色器 ───
const VERTEX_SHADER = `in vec3 position;
void main() {
  gl_Position = vec4(position, 1.0);
}
`;

const FRAGMENT_SHADER = `precision highp float;
precision highp sampler3D;

uniform sampler3D uGrid;
uniform sampler3D uMacro;
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
uniform vec3 uMoonDir;
uniform vec3 uMoonColor;
uniform float uMoonIntensity;
uniform float uAmbientScale;
uniform float uSkyExposure;
uniform int uShadowTaps;
uniform int uGiTaps;
uniform float uTime;
uniform float uWaterY;
uniform float uWaveAmp;
uniform float uMoonReflIntensity;
uniform int uWaveLayers;
uniform int uReflQuality;
uniform vec4 uAlbedo[${MAT_COUNT}];
uniform vec4 uMeta[${MAT_COUNT}];

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

const int MACRO = 4;

int macroVoxel(ivec3 mc) {
  ivec3 ms = uGridSize / MACRO;
  if (mc.x < 0 || mc.y < 0 || mc.z < 0 || mc.x >= ms.x || mc.y >= ms.y || mc.z >= ms.z) return 0;
  return int(texture(uMacro, (vec3(mc) + 0.5) / vec3(ms)).r * 255.0 + 0.5);
}

// 细粒度 DDA,限制在单个宏格 [cMin, cMax] 内,t ∈ (tStart, tEnd]
// entryAxis:进入宏格的面轴 —— 首格即命中时以此作为命中面法线
// (否则默认 axis=0 会把顶面命中错当成 ±x 面 → 椒盐噪点)
Hit marchFine(vec3 ro, vec3 rd, float tStart, float tEnd, ivec3 cMin, ivec3 cMax, vec3 inv, int entryAxis) {
  Hit hit;
  hit.hit = false;
  hit.t = 1e9;
  hit.cell = ivec3(0);
  hit.axis = entryAxis;
  hit.id = EMPTY;
  vec3 bmin = uGridMin;
  vec3 pos = ro + rd * tStart;
  ivec3 cell = clamp(ivec3(floor((pos - bmin) / uGridStep)), cMin, cMax);
  ivec3 step = ivec3(sign(rd));
  vec3 nextCell = vec3(cell) + vec3(max(step, ivec3(0)));
  vec3 tMax = (bmin + nextCell * uGridStep - ro) * inv;
  vec3 tDelta = vec3(uGridStep) * abs(inv);
  float t = tStart;
  while (t <= tEnd && t < 300.0) {
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
    if (cell.x < cMin.x || cell.y < cMin.y || cell.z < cMin.z ||
        cell.x > cMax.x || cell.y > cMax.y || cell.z > cMax.z) return hit;
  }
  return hit;
}

// 两级 DDA:宏格占用纹理整格跳过(空域剪枝),占用宏格内做细粒度 DDA
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

  // 进入网格的面轴(slab 最大者);原点已在网格内时保持 0
  int mAxis = 0;
  if (tEnter > 0.0) {
    if (tmin.y >= tmin.x && tmin.y >= tmin.z) mAxis = 1;
    else if (tmin.z >= tmin.x && tmin.z >= tmin.y) mAxis = 2;
  }

  float mstepLen = uGridStep * float(MACRO);
  ivec3 msize = uGridSize / MACRO;
  vec3 pos = ro + rd * tEnter;
  ivec3 mc = clamp(ivec3(floor((pos - bmin) / mstepLen)), ivec3(0), msize - 1);
  ivec3 mstep = ivec3(sign(rd));
  vec3 mNext = vec3(mc) + vec3(max(mstep, ivec3(0)));
  vec3 tMaxM = (bmin + mNext * mstepLen - ro) * inv;
  vec3 tDeltaM = vec3(mstepLen) * abs(inv);
  float t = tEnter;
  while (t <= tExit && t < 300.0) {
    if (macroVoxel(mc) != 0) {
      float tLoc = min(min(tMaxM.x, tMaxM.y), tMaxM.z);
      Hit fh = marchFine(ro, rd, t, min(tLoc, tExit), mc * MACRO, mc * MACRO + (MACRO - 1), inv, mAxis);
      if (fh.hit) return fh;
    }
    if (tMaxM.x < tMaxM.y && tMaxM.x < tMaxM.z) {
      t = tMaxM.x;
      tMaxM.x += tDeltaM.x;
      mc.x += mstep.x;
      mAxis = 0;
    } else if (tMaxM.y < tMaxM.z) {
      t = tMaxM.y;
      tMaxM.y += tDeltaM.y;
      mc.y += mstep.y;
      mAxis = 1;
    } else {
      t = tMaxM.z;
      tMaxM.z += tDeltaM.z;
      mc.z += mstep.z;
      mAxis = 2;
    }
    if (mc.x < 0 || mc.y < 0 || mc.z < 0 || mc.x >= msize.x || mc.y >= msize.y || mc.z >= msize.z) return hit;
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
  // 月亮(uniform 驱动:方向 / 颜色 / 强度)
  float md = dot(rd, uMoonDir);
  col += uMoonColor * uMoonIntensity * smoothstep(cos(0.06), cos(0.057), md) * 0.9;
  col += uMoonColor * uMoonIntensity * pow(max(md, 0.0), 18.0) * 0.35;
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
  return col * uSkyExposure;
}

vec3 mountainColor(vec3 ro, vec3 rd, out float tHit) {
  tHit = -1.0;
  // 单一出口:嵌套 if 内 early-return 会触发 ANGLE X4000(返回值疑似未初始化)
  vec3 result = vec3(0.0);
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
        result = mix(col, vec3(0.16, 0.12, 0.28), fogF);
      }
    }
  }
  return result;
}

// ─── PBR(Cook-Torrance GGX)工具 ───
vec3 backgroundColor(vec3 ro, vec3 rd); // 前向声明(GI miss 用,定义在后方)

float ggxD(float ndh, float rough) {
  float a2 = rough * rough * rough * rough;
  float d = ndh * ndh * (a2 - 1.0) + 1.0;
  return a2 / max(3.14159 * d * d, 1e-5);
}
float smithG(float ndv, float ndl, float rough) {
  float k = (rough + 1.0) * (rough + 1.0) * 0.125;
  return (ndv / (ndv * (1.0 - k) + k)) * (ndl / (ndl * (1.0 - k) + k));
}
vec3 fresnelSchlick(float vdh, vec3 f0) {
  return f0 + (1.0 - f0) * pow(1.0 - vdh, 5.0);
}

vec3 faceNormal(Hit h, vec3 rd) {
  vec3 n = vec3(0.0);
  if (h.axis == 0) n.x = -sign(rd.x);
  else if (h.axis == 1) n.y = -sign(rd.y);
  else n.z = -sign(rd.z);
  return n;
}

vec3 hemiAmbient(vec3 n) {
  return mix(vec3(0.06, 0.05, 0.11), vec3(0.16, 0.15, 0.24), n.y * 0.5 + 0.5) * uAmbientScale;
}

// 间接光二次命中的廉价着色(无阴影/无高光,只保留太阳直射 + 半球环境)
vec3 bounceShade(Hit h, vec3 rd) {
  vec3 n = faceNormal(h, rd);
  vec3 albedo = uAlbedo[h.id].rgb;
  float dif = max(dot(n, uSunDir), 0.0);
  vec3 col = albedo * (uSunColor * (3.0 * dif) + hemiAmbient(n));
  float fogF = 1.0 - exp(-h.t * 0.012);
  return mix(col, vec3(0.16, 0.12, 0.28) * uSkyExposure, fogF);
}

vec3 shadeGrid(Hit h, vec3 ro, vec3 rd) {
  vec3 p = ro + rd * h.t;
  vec3 n = faceNormal(h, rd);

  int id = h.id;
  vec3 albedo = uAlbedo[id].rgb;
  float rough = max(uAlbedo[id].a, 0.05);
  float metal = uMeta[id].x;
  float spec = uMeta[id].y;

  // 太阳软阴影:固定太阳圆盘采样(默认 5-tap,降级 1-tap)。禁止逐像素随机抖动,避免静态颗粒噪声。
  vec3 sun = uSunDir;
  vec3 cns = cross(n, sun); // 先判退化再 normalize:n ∥ sun 时 normalize(0)=NaN
  vec3 b1 = length(cns) < 1e-3 ? vec3(0.0, 1.0, 0.0) : normalize(cns);
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
    if (i >= uShadowTaps) break;
    vec3 shadowDir = normalize(sun + (b1 * sunDisk[i].x + b2 * sunDisk[i].y) * 0.018);
    Hit shHit = marchGrid(p + n * 0.035, shadowDir);
    sh += (shHit.hit && shHit.t < 60.0) ? 0.0 : 1.0;
  }
  sh /= float(uShadowTaps);

  // 体素 AO:面邻域 3 方向遮挡
  ivec3 nv = ivec3(n);
  float occ = 0.0;
  if (voxel(h.cell + nv + ivec3(1, 0, 0)) != EMPTY) occ += 0.35;
  if (voxel(h.cell + nv + ivec3(0, 1, 0)) != EMPTY) occ += 0.35;
  if (voxel(h.cell + nv + ivec3(0, 0, 1)) != EMPTY) occ += 0.35;
  float ao = 1.0 - min(occ, 1.0);

  // ─── 直接光:Cook-Torrance GGX(金属度工作流)───
  vec3 V = -rd;
  vec3 hv = V + sun; // V ≈ -sun 时 normalize(0)=NaN → 高光 NaN 黑斑;先钳长度
  hv = length(hv) < 1e-3 ? n : normalize(hv);
  float ndl = max(dot(n, sun), 0.0);
  float ndv = max(dot(n, V), 1e-3);
  float ndh = max(dot(n, hv), 0.0);
  float vdh = max(dot(V, hv), 0.0);
  vec3 F0 = mix(vec3(0.04), albedo, metal);
  vec3 F = fresnelSchlick(vdh, F0);
  vec3 specC = (ggxD(ndh, rough) * smithG(ndv, max(ndl, 1e-3), rough) * F) / max(4.0 * ndv * ndl, 1e-4);
  vec3 diffC = (vec3(1.0) - F) * (1.0 - metal) * albedo * 0.31831;
  // 漫反射含 1/π → 太阳辐照放大 3π 以维持原曝光
  vec3 col = (diffC + specC * max(spec, 0.05)) * uSunColor * (9.0 * ndl * sh);

  // ─── 间接光:单反弹 GI(3 条确定性余弦瓣次级光线,DDA 追踪)───
  // 命中 → 反弹面廉价着色;未命中 → 天空/远山。方向固定(绕法线 120° 分布),
  // 不做逐像素抖动:静态相机下画面稳定无颗粒。
  // 注:3 tap 手工展开(非 for 循环)—— 嵌套 DDA 的动态 break 循环会让
  // SwiftShader 编译出的超大 CFG 出错(黑斑回归的根因),展开后正常。
  vec3 gi = vec3(0.0);
  if (uGiTaps > 0) {
    vec3 up = abs(n.y) < 0.94 ? vec3(0.0, 1.0, 0.0) : vec3(1.0, 0.0, 0.0);
    vec3 t1 = normalize(cross(n, up));
    vec3 t2 = cross(n, t1);
    vec3 gp = p + n * 0.06;
    vec3 d0 = normalize(t1 * 0.7071 + n * 0.7071);
    vec3 d1 = normalize(t1 * -0.3536 + n * 0.7071 + t2 * 0.6124);
    vec3 d2 = normalize(t1 * -0.3536 + n * 0.7071 - t2 * 0.6124);
    Hit g0 = marchGrid(gp, d0);
    Hit g1 = marchGrid(gp, d1);
    Hit g2 = marchGrid(gp, d2);
    gi += (g0.hit && g0.t < 40.0) ? bounceShade(g0, d0) : backgroundColor(p, d0);
    gi += (g1.hit && g1.t < 40.0) ? bounceShade(g1, d1) : backgroundColor(p, d1);
    gi += (g2.hit && g2.t < 40.0) ? bounceShade(g2, d2) : backgroundColor(p, d2);
    gi /= 3.0;
  }

  // 半球环境 + 单反弹 GI(AO 调制;漫反射部分受金属度衰减)
  col += albedo * (1.0 - metal * 0.7) * hemiAmbient(n) * ao;
  col += albedo * (1.0 - metal) * gi * 0.6 * ao;

  // 玻璃材质:反射方向取一次天空色(廉价 env,眼球/鼓面的镜面通透感)
  if (spec > 0.5) {
    vec3 rv = reflect(rd, n);
    col += albedo * skyColor(rv) * (spec - 0.5) * 0.35;
  }

  // 大气雾(雾色随天空曝光缩放,intro 压暗时不留亮雾)
  float fogF = 1.0 - exp(-h.t * 0.012);
  col = mix(col, vec3(0.16, 0.12, 0.28) * uSkyExposure, fogF);
  return col;
}

vec3 backgroundColor(vec3 ro, vec3 rd) {
  float mt = -1.0;
  vec3 mcol = mountainColor(ro, rd, mt);
  return mt > 0.0 ? mcol * uSkyExposure : skyColor(rd);
}

// ─── 前景月光水面(解析平面,renderer-only;不进体素网格/模拟) ───
// 水池范围 z∈[6.75,16.75]:战斗网格地面(z≤12)自然遮住近段,intro 可见全带
const float WATER_Z_MIN = 6.75;
const float WATER_Z_MAX = 16.75;
const float WATER_X_MAX = 19.75;

// 3 层定向正弦波(uWaveLayers 降级到 1 层);累积位移梯度供法线扰动
vec2 waveGrad(vec2 p) {
  float ph0 = dot(p, vec2(0.94, 0.34)) * 1.3 + uTime * 1.1;
  vec2 g = vec2(0.94, 0.34) * (cos(ph0) * 1.3 * 0.6);
  if (uWaveLayers > 1) {
    float ph1 = dot(p, vec2(-0.42, 0.91)) * 2.3 + uTime * 1.7;
    g += vec2(-0.42, 0.91) * (cos(ph1) * 2.3 * 0.3);
    float ph2 = dot(p, vec2(0.28, -0.96)) * 3.7 + uTime * 2.6;
    g += vec2(0.28, -0.96) * (cos(ph2) * 3.7 * 0.12);
  }
  return g;
}

// 反射命中着色:无 AO、单 tap 阴影、无高光(廉价单次反射,不再二次反弹)
vec3 shadeRefl(Hit h, vec3 ro, vec3 rd) {
  vec3 p = ro + rd * h.t;
  vec3 n = vec3(0.0);
  if (h.axis == 0) n.x = -sign(rd.x);
  else if (h.axis == 1) n.y = -sign(rd.y);
  else n.z = -sign(rd.z);
  vec3 albedo = uAlbedo[h.id].rgb;
  float dif = max(dot(n, uSunDir), 0.0);
  Hit sh = marchGrid(p + n * 0.035, uSunDir);
  float s = (sh.hit && sh.t < 60.0) ? 0.0 : 1.0;
  vec3 ambient = mix(vec3(0.06, 0.05, 0.11), vec3(0.16, 0.15, 0.24), n.y * 0.5 + 0.5) * uAmbientScale;
  vec3 col = albedo * (uSunColor * (3.0 * dif * s) + ambient);
  float fogF = 1.0 - exp(-h.t * 0.012);
  return mix(col, vec3(0.16, 0.12, 0.28) * uSkyExposure, fogF);
}

vec3 shadeWater(vec3 ro, vec3 rd, float t) {
  vec3 p = ro + rd * t;
  vec2 grad = waveGrad(p.xz) * uWaveAmp;
  vec3 n = normalize(vec3(-grad.x, 1.0, -grad.y));
  vec3 rr = reflect(rd, n);
  rr.y = abs(rr.y) + 0.02;
  rr = normalize(rr);
  // 单次反射:体素 DDA(降质时只反射天空/远山)
  vec3 refl;
  if (uReflQuality > 0) {
    Hit rh = marchGrid(p + n * 0.06, rr);
    refl = rh.hit ? shadeRefl(rh, p, rr) : backgroundColor(p, rr);
  } else {
    refl = backgroundColor(p, rr);
  }
  // Fresnel:掠射 → 反射,垂直 → 深蓝紫水体(非 emissive,来自调色)
  float fres = pow(1.0 - max(dot(-rd, n), 0.0), 5.0);
  fres = mix(0.06, 1.0, fres);
  vec3 deep = vec3(0.028, 0.045, 0.115) * (0.35 + 0.65 * uAmbientScale);
  vec3 col = mix(deep, refl * uMoonReflIntensity, fres);
  // 月光带:窄软高光,被波浪法线扭曲
  vec3 hvm = normalize(uMoonDir - rd);
  col += uMoonColor * uMoonIntensity * pow(max(dot(n, hvm), 0.0), 220.0) * 1.6 * uMoonReflIntensity;
  // 日光带(太阳在地平线上时)
  if (uSunDir.y > 0.02) {
    vec3 hvs = normalize(uSunDir - rd);
    col += uSunColor * pow(max(dot(n, hvs), 0.0), 160.0) * 1.2;
  }
  return col;
}

void main() {
  vec2 ndc = (gl_FragCoord.xy - 0.5 * uRes) / (0.5 * uRes.y);
  vec3 rd = normalize(uCamRight * ndc.x + uCamUp * ndc.y + uCamFwd * (1.0 / uTanHalfFov));
  vec3 ro = uCamPos;
  Hit h = marchGrid(ro, rd);

  // 水面解析求交:与网格命中比近,近者胜
  float tWater = -1.0;
  if (rd.y < -1e-5) {
    float t = (uWaterY - ro.y) / rd.y;
    if (t > 0.0) {
      vec2 wp = ro.xz + rd.xz * t;
      if (abs(wp.x) < WATER_X_MAX && wp.y > WATER_Z_MIN && wp.y < WATER_Z_MAX) tWater = t;
    }
  }

  vec3 col;
  if (h.hit && (tWater < 0.0 || h.t < tWater)) {
    col = shadeGrid(h, ro, rd);
  } else if (tWater > 0.0) {
    vec3 wc = shadeWater(ro, rd, tWater);
    // 池缘柔化:边缘淡向被遮内容(网格命中或天空/远山)
    vec3 wp = ro + rd * tWater;
    float edge = smoothstep(WATER_Z_MIN, WATER_Z_MIN + 1.25, wp.z)
      * (1.0 - smoothstep(WATER_Z_MAX - 1.25, WATER_Z_MAX, wp.z))
      * smoothstep(-WATER_X_MAX, -WATER_X_MAX + 1.25, wp.x)
      * (1.0 - smoothstep(WATER_X_MAX - 1.25, WATER_X_MAX, wp.x));
    if (edge < 1.0) {
      vec3 under = h.hit ? shadeGrid(h, ro, rd) : backgroundColor(ro, rd);
      wc = mix(under, wc, edge);
    }
    col = wc;
  } else {
    col = backgroundColor(ro, rd);
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
  uMacro: { value: THREE.Data3DTexture };
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
  uMoonDir: { value: THREE.Vector3 };
  uMoonColor: { value: THREE.Color };
  uMoonIntensity: { value: number };
  uAmbientScale: { value: number };
  uSkyExposure: { value: number };
  uShadowTaps: { value: number };
  uGiTaps: { value: number };
  uTime: { value: number };
  uWaterY: { value: number };
  uWaveAmp: { value: number };
  uMoonReflIntensity: { value: number };
  uWaveLayers: { value: number };
  uReflQuality: { value: number };
  uAlbedo: { value: Float32Array };
  uMeta: { value: Float32Array };
}

export class VoxelRaycaster {
  readonly texture: THREE.Data3DTexture;
  readonly macroTexture: THREE.Data3DTexture;
  readonly scene: THREE.Scene;
  readonly camera: THREE.OrthographicCamera;
  readonly material: THREE.RawShaderMaterial;

  private readonly base: Uint8Array<ArrayBuffer>;
  private readonly work: Uint8Array<ArrayBuffer>;
  private readonly macro: Uint8Array<ArrayBuffer>;
  private readonly geometry: THREE.BufferGeometry;
  private readonly uniforms: RayUniforms;
  private readonly albedoArray = new Float32Array(MAT_COUNT * 4);
  private readonly metaArray = new Float32Array(MAT_COUNT * 4);
  private uploadInterval = 1;
  private commitCounter = 0;

  constructor() {
    this.base = new Uint8Array(GRID_SIZE[0]! * GRID_SIZE[1]! * GRID_SIZE[2]!);
    this.work = new Uint8Array(this.base.length);

    this.texture = new THREE.Data3DTexture(this.work, GRID_SIZE[0], GRID_SIZE[1], GRID_SIZE[2]);
    this.texture.format = THREE.RedFormat;
    this.texture.type = THREE.UnsignedByteType;
    this.texture.minFilter = THREE.NearestFilter;
    this.texture.magFilter = THREE.NearestFilter;
    this.texture.wrapS = THREE.ClampToEdgeWrapping;
    this.texture.wrapT = THREE.ClampToEdgeWrapping;
    this.texture.wrapR = THREE.ClampToEdgeWrapping;
    this.texture.needsUpdate = true;

    // 宏格占用纹理(两级 DDA 的上层;writeStatic/commitDynamic 时从细网格重建)
    this.macro = new Uint8Array(MACRO_SIZE[0]! * MACRO_SIZE[1]! * MACRO_SIZE[2]!);
    this.macroTexture = new THREE.Data3DTexture(this.macro, MACRO_SIZE[0], MACRO_SIZE[1], MACRO_SIZE[2]);
    this.macroTexture.format = THREE.RedFormat;
    this.macroTexture.type = THREE.UnsignedByteType;
    this.macroTexture.minFilter = THREE.NearestFilter;
    this.macroTexture.magFilter = THREE.NearestFilter;
    this.macroTexture.wrapS = THREE.ClampToEdgeWrapping;
    this.macroTexture.wrapT = THREE.ClampToEdgeWrapping;
    this.macroTexture.wrapR = THREE.ClampToEdgeWrapping;
    this.macroTexture.needsUpdate = true;

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
      uMacro: { value: this.macroTexture },
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
      uMoonDir: { value: new THREE.Vector3(-0.42, 0.3, -0.85).normalize() },
      uMoonColor: { value: new THREE.Color(1, 0.95, 0.8) },
      uMoonIntensity: { value: 1 },
      uAmbientScale: { value: 1 },
      uSkyExposure: { value: 1 },
      uShadowTaps: { value: 5 },
      uGiTaps: { value: 3 },
      uTime: { value: 0 },
      uWaterY: { value: -1.6 },
      uWaveAmp: { value: 0.055 },
      uMoonReflIntensity: { value: 1 },
      uWaveLayers: { value: 3 },
      uReflQuality: { value: 1 },
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

  /** 静态层:清空后由 builder 写入,并同步到动态层(场景切换时调用一次) */
  writeStatic(builder: (grid: Uint8Array) => void): void {
    this.base.fill(0);
    builder(this.base);
    this.work.set(this.base);
    this.rebuildMacro();
    this.texture.needsUpdate = true;
  }

  /** 动态层:把静态层拷贝进工作网格并返回,调用方接着画动态体素 */
  beginDynamic(): Uint8Array {
    this.work.set(this.base);
    return this.work;
  }

  /** 提交动态层:按上传节流决定是否真正上传(降级阶梯:隔帧上传) */
  commitDynamic(): void {
    this.commitCounter = (this.commitCounter + 1) % this.uploadInterval;
    if (this.commitCounter === 0) {
      this.rebuildMacro();
      this.texture.needsUpdate = true;
    }
  }

  /** 从工作网格重建宏格占用(任一细体素非空 → 宏格占用) */
  private rebuildMacro(): void {
    const [gx, gy, gz] = GRID_SIZE as [number, number, number];
    const [mx, my] = MACRO_SIZE as [number, number, number];
    this.macro.fill(0);
    for (let z = 0; z < gz; z++) {
      const mz = (z >> 2) * (mx * my);
      for (let y = 0; y < gy; y++) {
        const rowBase = gx * (y + gy * z);
        const mRow = mx * (y >> 2) + mz;
        for (let x = 0; x < gx; x++) {
          if (this.work[rowBase + x] !== 0) this.macro[(x >> 2) + mRow] = 1;
        }
      }
    }
    this.macroTexture.needsUpdate = true;
  }

  /** 动态网格上传节流:1 = 每帧上传,2 = 隔帧上传 */
  setDynamicUploadInterval(interval: number): void {
    this.uploadInterval = Math.max(1, Math.floor(interval));
    this.commitCounter = 0;
  }

  /** 软阴影 tap 数:5(基线)或 1(降级) */
  setShadowTaps(taps: 5 | 1): void {
    this.uniforms.uShadowTaps.value = taps;
  }

  /** GI 次级光线数:3(单反弹间接光)或 0(降级关闭) */
  setGiTaps(taps: 0 | 3): void {
    this.uniforms.uGiTaps.value = taps;
  }

  /** 水面降级:reflQuality 0 = 只反射天空/远山(跳过体素 DDA);waveLayers 1 = 单层波 */
  setWaterQuality(reflQuality: 0 | 1, waveLayers: 1 | 3): void {
    this.uniforms.uReflQuality.value = reflQuality;
    this.uniforms.uWaveLayers.value = waveLayers;
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

  /** 光照统一入口:太阳 / 月亮 / 环境 / 天空曝光全部 uniform 驱动(零 emissive) */
  setLighting(lighting: LightingState): void {
    const u = this.uniforms;
    (u.uSunDir.value as THREE.Vector3).copy(lighting.sunDir).normalize();
    (u.uSunColor.value as THREE.Color).copy(lighting.sunColor);
    (u.uMoonDir.value as THREE.Vector3).copy(lighting.moonDir).normalize();
    (u.uMoonColor.value as THREE.Color).copy(lighting.moonColor);
    u.uMoonIntensity.value = lighting.moonIntensity;
    u.uAmbientScale.value = lighting.ambientScale;
    u.uSkyExposure.value = lighting.skyExposure;
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
    this.macroTexture.dispose();
    this.geometry.dispose();
    this.material.dispose();
  }
}
