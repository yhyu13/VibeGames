/**
 * Minimal pure 3D vector math over [number, number, number] tuples.
 * Zero dependencies — the platform-agnostic foundation for probeGrid/hysteresis/etc.
 */
export type Vec3 = [number, number, number]

export function vec3(x: number, y: number, z: number): Vec3 {
  return [x, y, z]
}

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

export function lengthSq(a: Vec3): number {
  return dot(a, a)
}

/** Unit vector; returns [0,0,0] for the zero vector. */
export function normalize(a: Vec3): Vec3 {
  const len = length(a)
  if (len === 0) return [0, 0, 0]
  return scale(a, 1 / len)
}

export function lerp(a: Vec3, b: Vec3, t: number): Vec3 {
  return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t]
}

export function maxComponent(a: Vec3): number {
  return Math.max(a[0], a[1], a[2])
}
