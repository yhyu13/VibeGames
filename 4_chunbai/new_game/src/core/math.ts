import { Vector3 } from './types';

export function vec3(x: number, y: number, z: number): Vector3 {
  return { x, y, z };
}

export function vec3Add(a: Vector3, b: Vector3): Vector3 {
  return { x: a.x + b.x, y: a.y + b.y, z: a.z + b.z };
}

export function vec3Sub(a: Vector3, b: Vector3): Vector3 {
  return { x: a.x - b.x, y: a.y - b.y, z: a.z - b.z };
}

export function vec3Scale(v: Vector3, s: number): Vector3 {
  return { x: v.x * s, y: v.y * s, z: v.z * s };
}

export function vec3Length(v: Vector3): number {
  return Math.sqrt(v.x * v.x + v.y * v.y + v.z * v.z);
}

export function vec3Dist(a: Vector3, b: Vector3): number {
  return vec3Length(vec3Sub(a, b));
}

export function vec3Normalize(v: Vector3): Vector3 {
  const len = vec3Length(v);
  if (len < 0.0001) return { x: 0, y: 0, z: 0 };
  return { x: v.x / len, y: v.y / len, z: v.z / len };
}

export function vec3Cross(a: Vector3, b: Vector3): Vector3 {
  return {
    x: a.y * b.z - a.z * b.y,
    y: a.z * b.x - a.x * b.z,
    z: a.x * b.y - a.y * b.x
  };
}

export function vec3Dot(a: Vector3, b: Vector3): number {
  return a.x * b.x + a.y * b.y + a.z * b.z;
}

export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

export function clamp(v: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, v));
}

export function randRange(min: number, max: number): number {
  return min + Math.random() * (max - min);
}

export function randInt(min: number, max: number): number {
  return Math.floor(randRange(min, max + 1));
}

export function randVec3(scale: number = 1): Vector3 {
  return vec3Normalize({
    x: Math.random() - 0.5,
    y: Math.random() - 0.5,
    z: Math.random() - 0.5
  });
}

export function angleToVec3(angle: number): Vector3 {
  return { x: Math.cos(angle), y: 0, z: Math.sin(angle) };
}

export function vec3ToAngle(v: Vector3): number {
  return Math.atan2(v.z, v.x);
}
