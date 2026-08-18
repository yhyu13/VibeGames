import type { Vec3 } from './vec3'
import { dot } from './vec3'

/**
 * Spherical Fibonacci ray distribution + per-frame rotation (research.md §4).
 * Low-discrepancy, uniform on the sphere; NOT cosine-weighted at trace time
 * (cosine weighting happens in the blend pass).
 */

/** golden-ratio conjugate ≈ 0.6180339887 */
const GOLDEN_RATIO_CONJUGATE = Math.sqrt(5) * 0.5 + 0.5 - 1

/** Ray `i` of the N-ray spherical Fibonacci set. Unit length. */
export function sphericalFibonacci(i: number, n: number): Vec3 {
  const phi = Math.PI * 2 * frac(i * GOLDEN_RATIO_CONJUGATE)
  const cosTheta = 1 - (2 * i + 1) / n
  const sinTheta = Math.sqrt(Math.max(0, 1 - cosTheta * cosTheta))
  return [Math.cos(phi) * sinTheta, Math.sin(phi) * sinTheta, cosTheta]
}

function frac(x: number): number {
  return x - Math.floor(x)
}

/** Uniform random unit quaternion [x,y,z,w] (James Arvo, Graphics Gems III). */
export function randomUnitQuaternion(rng: () => number): [number, number, number, number] {
  const u1 = rng()
  const u2 = rng()
  const u3 = rng()
  const t = Math.sqrt(1 - u1)
  const s = Math.sqrt(u1)
  return [
    Math.cos(Math.PI * 2 * u2) * t,
    Math.sin(Math.PI * 2 * u2) * t,
    Math.cos(Math.PI * 2 * u3) * s,
    Math.sin(Math.PI * 2 * u3) * s,
  ]
}

/** Rotate a direction by unit quaternion q = [x,y,z,w]. Preserves unit length. */
export function rotateByQuaternion(dir: Vec3, q: [number, number, number, number]): Vec3 {
  const [qx, qy, qz, qw] = q
  const [vx, vy, vz] = dir
  // t = 2 * cross(q.xyz, v)
  const tx = 2 * (qy * vz - qz * vy)
  const ty = 2 * (qz * vx - qx * vz)
  const tz = 2 * (qx * vy - qy * vx)
  // v' = v + w·t + cross(q.xyz, t)
  return [
    vx + qw * tx + (qy * tz - qz * ty),
    vy + qw * ty + (qz * tx - qx * tz),
    vz + qw * tz + (qx * ty - qy * tx),
  ]
}

/**
 * The probe's ray set for one frame:
 * - `rotated`: full Fibonacci set rotated by a fresh random quaternion (temporal AA);
 * - `fixed`: the first `numFixed` Fibonacci rays, unrotated — stable across frames
 *   for relocation/classification (research.md §4 "Fixed rays").
 */
export function frameRaySet(
  numRays: number,
  numFixed: number,
  rng: () => number,
): { rotated: Vec3[]; fixed: Vec3[] } {
  const quaternion = randomUnitQuaternion(rng)
  const rotated: Vec3[] = new Array(numRays)
  for (let i = 0; i < numRays; i++) rotated[i] = rotateByQuaternion(sphericalFibonacci(i, numRays), quaternion)
  const fixed: Vec3[] = new Array(numFixed)
  for (let i = 0; i < numFixed; i++) fixed[i] = sphericalFibonacci(i, numFixed)
  return { rotated, fixed }
}

/** Average cosine between a direction and the ray set — sanity metric for tests. */
export function averageCosine(dir: Vec3, rays: Vec3[]): number {
  let sum = 0
  for (const r of rays) sum += Math.max(0, dot(dir, r))
  return sum / rays.length
}
