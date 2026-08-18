import { PROBE_DISTANCE_EXPONENT } from './constants'
import type { Vec3 } from './vec3'
import { scale } from './vec3'

/**
 * Blend-pass accumulation math (research.md §5). Both radiance and distance
 * accumulate cosine-weighted sums over the probe's rays and normalize by
 * 2·Σcosθ (variance-reduced: E[cosθ]=1/2, so ÷(2Σcosθ) ≈ ÷N). The hemisphere
 * solid angle ×2π is applied at QUERY time, not here.
 */

/**
 * Normalize a radiance sum: Σ(L·cosθ) ÷ (2·Σcosθ).
 * `weightSum` is the Σcosθ accumulator; returns the normalized irradiance.
 */
export function normalizeIrradiance(sum: Vec3, weightSum: number, epsilon = 1e-6): Vec3 {
  return scale(sum, 1 / (2 * Math.max(weightSum, epsilon)))
}

export interface DistanceSample {
  /** Ray hit distance (may be negative for backface hits — sign is a marker). */
  distance: number
  /** Cosine weight for this ray (≥ 0). */
  weight: number
}

export interface DistanceMomentsOptions {
  /** Sharpens depth discontinuities (default 50). */
  exponent?: number
  /** Far-hit clamp: d = min(|distance|, maxRayDistance). */
  maxRayDistance?: number
}

export interface DistanceMoments {
  /** E[d] */
  mean: number
  /** E[d²] — variance = meanSq − mean². */
  meanSq: number
}

/**
 * Distance-mode accumulation: pow(cosθ, exponent) weighting, depth clamped to
 * maxRayDistance, both raw moments normalized by 2·Σw.
 */
export function accumulateDistanceMoments(
  samples: DistanceSample[],
  opts: DistanceMomentsOptions = {},
): DistanceMoments {
  const exponent = opts.exponent ?? PROBE_DISTANCE_EXPONENT
  const maxD = opts.maxRayDistance ?? Infinity
  let sumD = 0
  let sumD2 = 0
  let sumW = 0
  for (const s of samples) {
    const d = Math.min(Math.abs(s.distance), maxD)
    const w = Math.pow(Math.max(0, s.weight), exponent)
    sumD += d * w
    sumD2 += d * d * w
    sumW += w
  }
  const inv = 1 / (2 * Math.max(sumW, 1e-6))
  return { mean: sumD * inv, meanSq: sumD2 * inv }
}
