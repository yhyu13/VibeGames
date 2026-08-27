import type { Vec3 } from './types'

export function add(a: Vec3, b: Vec3): Vec3 {
  return [a[0] + b[0], a[1] + b[1], a[2] + b[2]]
}

export function sub(a: Vec3, b: Vec3): Vec3 {
  return [a[0] - b[0], a[1] - b[1], a[2] - b[2]]
}

export function scale(a: Vec3, s: number): Vec3 {
  return [a[0] * s, a[1] * s, a[2] * s]
}

export function dot(a: Vec3, b: Vec3): number {
  return a[0] * b[0] + a[1] * b[1] + a[2] * b[2]
}

export function cross(a: Vec3, b: Vec3): Vec3 {
  return [
    a[1] * b[2] - a[2] * b[1],
    a[2] * b[0] - a[0] * b[2],
    a[0] * b[1] - a[1] * b[0],
  ]
}

export function length(a: Vec3): number {
  return Math.sqrt(dot(a, a))
}

export function normalize(a: Vec3): Vec3 {
  const len = length(a)
  if (len === 0) return [0, 0, 0]
  return scale(a, 1 / len)
}

export function clamp(x: number, lo: number, hi: number): number {
  return Math.min(hi, Math.max(lo, x))
}

export function saturate(x: number): number {
  return clamp(x, 0, 1)
}

export function mix(a: number, b: number, t: number): number {
  return a + (b - a) * t
}

export function mix3(a: Vec3, b: Vec3, t: number): Vec3 {
  return [mix(a[0], b[0], t), mix(a[1], b[1], t), mix(a[2], b[2], t)]
}

export function mul3(a: Vec3, b: Vec3): Vec3 {
  return [a[0] * b[0], a[1] * b[1], a[2] * b[2]]
}

export function abs3(a: Vec3): Vec3 {
  return [Math.abs(a[0]), Math.abs(a[1]), Math.abs(a[2])]
}

export function max3(a: Vec3): number {
  return Math.max(a[0], a[1], a[2])
}

export function meanAbs3(a: Vec3): number {
  return (Math.abs(a[0]) + Math.abs(a[1]) + Math.abs(a[2])) / 3
}
