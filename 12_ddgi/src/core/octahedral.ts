import type { Vec3 } from './vec3'
import { normalize } from './vec3'

/**
 * Octahedral parameterization (Cigolle et al. 2014) — one square texture, no
 * cube-map seams, hardware-bilinear friendly (research.md §3).
 */

/** sign with zero → +1 (matches GLSL `signNotZero`). */
export function signNotZero(x: number): number {
  return x >= 0 ? 1 : -1
}

/** Unit direction → [-1,1]², with the lower hemisphere folded in. */
export function octEncode(direction: Vec3): [number, number] {
  const l1 = Math.abs(direction[0]) + Math.abs(direction[1]) + Math.abs(direction[2])
  if (l1 === 0) return [0, 0]
  let u = direction[0] / l1
  let v = direction[1] / l1
  if (direction[2] < 0) {
    const au = Math.abs(u)
    const av = Math.abs(v)
    u = (1 - av) * signNotZero(u)
    v = (1 - au) * signNotZero(v)
  }
  return [u, v]
}

/** [-1,1]² → unit direction (fold back the lower hemisphere, then normalize). */
export function octDecode(uv: [number, number]): Vec3 {
  let x = uv[0]
  let y = uv[1]
  let z = 1 - Math.abs(x) - Math.abs(y)
  if (z < 0) {
    const nx = (1 - Math.abs(y)) * signNotZero(x)
    const ny = (1 - Math.abs(x)) * signNotZero(y)
    x = nx
    y = ny
  }
  return normalize([x, y, z])
}

/**
 * Texel center → normalized octahedral coords in [-1,1]².
 * `threadCoords` are interior texel indices (0..interior-1); the 1-texel border
 * is handled by the GPU border pass, not by this mapping.
 */
export function octNormalizedCoords(threadCoords: [number, number], interiorTexels: number): [number, number] {
  const scale = 2 / interiorTexels
  return [threadCoords[0] * scale + scale * 0.5 - 1, threadCoords[1] * scale + scale * 0.5 - 1]
}
