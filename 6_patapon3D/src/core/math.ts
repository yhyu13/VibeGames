/**
 * core/math.ts — 纯数学工具(无副作用,无 THREE 依赖)
 *
 * M1.1 由 agent-core 完成。
 */

import type { Vec3 } from './types';

/** 数值夹紧(返回 lo..hi 之间) */
export function clamp(v: number, lo: number, hi: number): number {
  return v < lo ? lo : v > hi ? hi : v;
}

/** 线性插值(通用) */
export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

/** 帧率无关的线性插值(用 dt + rate 替代固定 t) */
export function damp(a: number, b: number, rate: number, dt: number): number {
  return lerp(a, b, 1 - Math.exp(-rate * dt));
}

/** 符号函数(-1 / 0 / +1) */
export function sign(v: number): number {
  return v > 0 ? 1 : v < 0 ? -1 : 0;
}

/** Vec3 加法 */
export function addVec(a: Vec3, b: Vec3): Vec3 {
  return { x: a.x + b.x, y: a.y + b.y, z: a.z + b.z };
}

/** Vec3 数乘 */
export function scaleVec(a: Vec3, s: number): Vec3 {
  return { x: a.x * s, y: a.y * s, z: a.z * s };
}

/** Vec3 距离平方(避免 sqrt,用于比较) */
export function distSq(a: Vec3, b: Vec3): number {
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  const dz = a.z - b.z;
  return dx * dx + dy * dy + dz * dz;
}

/** Vec3 距离 */
export function dist(a: Vec3, b: Vec3): number {
  return Math.sqrt(distSq(a, b));
}

/** 种子 RNG(可复现 playtest) */
export function makeRng(seed: number): () => number {
  let s = seed >>> 0;
  return () => {
    // mulberry32
    s = (s + 0x6d2b79f5) >>> 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** AABB 相交(轴对齐包围盒,中心点 + 半尺寸) */
export function aabbOverlap(
  a: { center: Vec3; halfSize: Vec3 },
  b: { center: Vec3; halfSize: Vec3 },
): boolean {
  return (
    Math.abs(a.center.x - b.center.x) <= a.halfSize.x + b.halfSize.x &&
    Math.abs(a.center.y - b.center.y) <= a.halfSize.y + b.halfSize.y &&
    Math.abs(a.center.z - b.center.z) <= a.halfSize.z + b.halfSize.z
  );
}

/** 度数转弧度 */
export function deg2rad(d: number): number {
  return (d * Math.PI) / 180;
}
