import type { DdgiVolumeConfig } from './constants'
import { PROBE_MAX_RAY_DISTANCE_FACTOR, WRAP_SHADING_FLOOR } from './constants'
import type { Vec3 } from './vec3'
import { add, dot, length, normalize, scale, sub } from './vec3'

/**
 * DDGI probe grid math (research.md §2): grid layout, trilinear interpolation,
 * wrap-shading weight, surface bias, max ray distance.
 */

/** Shift that centers the grid about `origin`: (spacing·(counts−1))·0.5 per axis. */
export function probeGridShift(spacing: Vec3, counts: Vec3): Vec3 {
  return [
    spacing[0] * (counts[0] - 1) * 0.5,
    spacing[1] * (counts[1] - 1) * 0.5,
    spacing[2] * (counts[2] - 1) * 0.5,
  ]
}

/** World position of the probe at integer grid coords (centered on origin). */
export function probeWorldPosition(cfg: DdgiVolumeConfig, coords: Vec3): Vec3 {
  const shift = probeGridShift(cfg.probeSpacing, cfg.probeCounts)
  return [
    cfg.origin[0] + coords[0] * cfg.probeSpacing[0] - shift[0],
    cfg.origin[1] + coords[1] * cfg.probeSpacing[1] - shift[1],
    cfg.origin[2] + coords[2] * cfg.probeSpacing[2] - shift[2],
  ]
}

/** Continuous grid coordinates of a world point (inverse of the above). */
export function gridCoordsOf(cfg: DdgiVolumeConfig, x: Vec3): Vec3 {
  const shift = probeGridShift(cfg.probeSpacing, cfg.probeCounts)
  return [
    (x[0] - cfg.origin[0] + shift[0]) / cfg.probeSpacing[0],
    (x[1] - cfg.origin[1] + shift[1]) / cfg.probeSpacing[1],
    (x[2] - cfg.origin[2] + shift[2]) / cfg.probeSpacing[2],
  ]
}

export interface TrilinearResult {
  /** The 8 surrounding probe grid coords (base + [0|1] per axis). */
  probeCoords: Vec3[]
  /** Matching trilinear weights (sum to 1). */
  weights: number[]
}

/**
 * Trilinear interpolation at a query point: the 8 probes around `x`, weighted by
 * fractional cell position (clamped so edge queries clamp to boundary probes).
 */
export function trilinearWeights(cfg: DdgiVolumeConfig, x: Vec3): TrilinearResult {
  const g = gridCoordsOf(cfg, x)
  const base: Vec3 = [Math.floor(g[0]), Math.floor(g[1]), Math.floor(g[2])]
  const alpha: Vec3 = [
    clamp01(g[0] - base[0]),
    clamp01(g[1] - base[1]),
    clamp01(g[2] - base[2]),
  ]

  const probeCoords: Vec3[] = []
  const weights: number[] = []
  for (let i = 0; i < 2; i++) {
    for (let j = 0; j < 2; j++) {
      for (let k = 0; k < 2; k++) {
        probeCoords.push([base[0] + i, base[1] + j, base[2] + k])
        const wx = i === 1 ? alpha[0] : 1 - alpha[0]
        const wy = j === 1 ? alpha[1] : 1 - alpha[1]
        const wz = k === 1 ? alpha[2] : 1 - alpha[2]
        weights.push(wx * wy * wz)
      }
    }
  }
  return { probeCoords, weights }
}

/**
 * Wrap-shading / backface weight: favours probes whose direction from the surface
 * point aligns with the normal (kills the "no mutually-visible probe" failure).
 * Returns w² + floor so the weight never reaches 0.
 */
export function wrapShadingWeight(x: Vec3, probePos: Vec3, surfaceNormal: Vec3): number {
  const toProbe = normalize(sub(probePos, x))
  const w = (dot(toProbe, surfaceNormal) + 1) * 0.5
  return w * w + WRAP_SHADING_FLOOR
}

/**
 * Surface bias applied to the QUERY position (not the probe) to avoid
 * self-occlusion: x + normal·normalBias − cameraDir·viewBias.
 * `cameraDirection` = normalized direction from the point toward the camera.
 */
export function biasedQueryPosition(
  x: Vec3,
  surfaceNormal: Vec3,
  cameraDirection: Vec3,
  normalBias: number,
  viewBias: number,
): Vec3 {
  return add(add(x, scale(surfaceNormal, normalBias)), scale(cameraDirection, -viewBias))
}

/** `probeMaxRayDistance = ‖spacing‖·PROBE_MAX_RAY_DISTANCE_FACTOR` — far-hit clamp for distance moments. */
export function probeMaxRayDistance(cfg: DdgiVolumeConfig): number {
  return length(cfg.probeSpacing) * PROBE_MAX_RAY_DISTANCE_FACTOR
}

function clamp01(v: number): number {
  return Math.min(1, Math.max(0, v))
}
