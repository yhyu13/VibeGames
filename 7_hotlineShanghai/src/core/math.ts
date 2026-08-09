// src/core/math.ts — 纯数学工具(零外部依赖,vec2 / lerp / clamp / distance / angle)
// 全部函数无副作用、无平台依赖;公共函数均有一行用途说明。

import type { Vec2 } from './types';

// 零向量判定阈值(长度平方低于此值视为零向量)
const VEC_LEN_SQ_EPS = 1e-9;
// 点重合判定阈值(距离低于此值视为同一点)
const POINT_DIST_EPS = 1e-6;

// 构造二维向量
export const v2 = (x: number, y: number): Vec2 => ({ x, y });

// 构造二维向量(与 v2 等价,别名;契约名 vec2)
export const vec2 = v2;

// 向量加法
export const v2Add = (a: Vec2, b: Vec2): Vec2 => ({ x: a.x + b.x, y: a.y + b.y });

// 向量减法
export const v2Sub = (a: Vec2, b: Vec2): Vec2 => ({ x: a.x - b.x, y: a.y - b.y });

// 向量数乘
export const v2Scale = (a: Vec2, s: number): Vec2 => ({ x: a.x * s, y: a.y * s });

// 向量长度平方(避免开根,性能友好)
export const v2LenSq = (a: Vec2): number => a.x * a.x + a.y * a.y;

// 向量长度
export const v2Len = (a: Vec2): number => Math.sqrt(v2LenSq(a));

// 两点间距离(契约名 distance)
export const v2Dist = (a: Vec2, b: Vec2): number => v2Len(v2Sub(a, b));

// 两点间距离(别名,契约名)
export const distance = v2Dist;

// 向量点积
export const v2Dot = (a: Vec2, b: Vec2): number => a.x * b.x + a.y * b.y;

// 归一化向量;零向量返回 (0, 0)
export const v2Normalize = (a: Vec2): Vec2 => {
  const l = v2Len(a);
  return l > VEC_LEN_SQ_EPS ? v2Scale(a, 1 / l) : { x: 0, y: 0 };
};

// 向量线性插值
export const v2Lerp = (a: Vec2, b: Vec2, t: number): Vec2 => ({
  x: a.x + (b.x - a.x) * t,
  y: a.y + (b.y - a.y) * t,
});

// 数值钳制到 [lo, hi]
export const clamp = (n: number, lo: number, hi: number): number =>
  Math.max(lo, Math.min(hi, n));

// 数值线性插值
export const lerp = (a: number, b: number, t: number): number => a + (b - a) * t;

// 角度(弧度)转为单位向量
export const angleToVec = (angle: number): Vec2 => ({ x: Math.cos(angle), y: Math.sin(angle) });

// 向量转为角度(弧度,atan2;契约名 angle)
export const vecToAngle = (v: Vec2): number => Math.atan2(v.y, v.x);

// 向量转为角度(别名,契约名)
export const angle = vecToAngle;

// 两角度(弧度)之差,归一化到 (-PI, PI]
export const angleBetween = (a: number, b: number): number => {
  let d = b - a;
  while (d > Math.PI) d -= 2 * Math.PI;
  while (d < -Math.PI) d += 2 * Math.PI;
  return d;
};

// 角度制转弧度制
export const degToRad = (d: number): number => (d * Math.PI) / 180;

// 弧度制转角度制
export const radToDeg = (r: number): number => (r * 180) / Math.PI;

// 判断 target 是否位于 source 朝向 facing 的扇形弧内(半角 arcDeg/2,最远 dist)
export const isPointInArc = (source: Vec2, facing: number, target: Vec2, arcDeg: number, dist: number): boolean => {
  const dx = target.x - source.x;
  const dy = target.y - source.y;
  const d = Math.sqrt(dx * dx + dy * dy);
  if (d > dist) return false;
  if (d < POINT_DIST_EPS) return true;
  const ang = Math.atan2(dy, dx);
  const half = degToRad(arcDeg) / 2;
  return Math.abs(angleBetween(facing, ang)) <= half;
};

// '#rrggbb' → 0..1 的 RGB 分量
export const hexToRgb = (hex: string): { r: number; g: number; b: number } => {
  const s = hex.replace('#', '');
  const n = parseInt(s, 16);
  return { r: ((n >> 16) & 0xff) / 255, g: ((n >> 8) & 0xff) / 255, b: (n & 0xff) / 255 };
};
