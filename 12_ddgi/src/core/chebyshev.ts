import { CHEBYSHEV_CRUSH_THRESHOLD, CHEBYSHEV_MIN_WEIGHT } from './constants'

/**
 * Chebyshev visibility test (research.md §6). The depth atlas stores two raw
 * moments E[d], E[d²] per texel; at query time the bound
 *     P(X ≥ μ+v) ≤ σ²/(σ²+v²)  with  σ² = E[d²]−E[d]²
 * rejects probes occluded from the surface point.
 */

/** The raw one-sided Chebyshev bound; 1 when the probe is not farther than the mean. */
export function chebyshevBound(mean: number, meanSq: number, distToProbe: number): number {
  if (distToProbe <= mean) return 1
  const v = distToProbe - mean
  const variance = Math.abs(mean * mean - meanSq) // σ² = E[d²] − E[d]²
  return variance / (variance + v * v)
}

/**
 * Full visibility weight: cube for contrast, crush for continuity of tiny
 * weights, floored at `minWeight` so the fallback never fully vanishes.
 */
export function chebyshevWeight(
  mean: number,
  meanSq: number,
  distToProbe: number,
  minWeight: number = CHEBYSHEV_MIN_WEIGHT,
  crushThreshold: number = CHEBYSHEV_CRUSH_THRESHOLD,
): number {
  let w = chebyshevBound(mean, meanSq, distToProbe)
  w = w * w * w // cube → contrast
  if (w < crushThreshold) w = (w * w * w) / (crushThreshold * crushThreshold) // crush
  return Math.max(minWeight, w)
}
