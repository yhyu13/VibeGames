import type { Vec3 } from './vec3'
import { add, dot, maxComponent, scale, sub } from './vec3'
import {
  LUMA_WEIGHTS,
  PROBE_BRIGHTNESS_THRESHOLD,
  PROBE_ENCODING_GAMMA,
  PROBE_HYSTERESIS,
  PROBE_HYSTERESIS_DROP,
  PROBE_IMPULSE_CLAMP,
  PROBE_IRRADIANCE_THRESHOLD,
} from './constants'

/**
 * Per-texel hysteresis / EMA blending (research.md §7). Radiance blends in
 * gamma-encoded storage space with threshold-triggered history drops; distance
 * blends as a plain lerp, at the hysteresis `distanceHysteresis` picks for the
 * texel — which is not always the one the caller passed, because a zero history
 * is an absence of history rather than a measurement of zero.
 */

/** BT.709 luminance of a linear RGB triple. */
export function luminance(v: Vec3): number {
  return LUMA_WEIGHTS[0] * v[0] + LUMA_WEIGHTS[1] * v[1] + LUMA_WEIGHTS[2] * v[2]
}

/** Tone-map into storage: pow(v, 1/gamma). */
export function encodeGamma(v: Vec3, gamma: number = PROBE_ENCODING_GAMMA): Vec3 {
  const g = 1 / gamma
  return [Math.pow(v[0], g), Math.pow(v[1], g), Math.pow(v[2], g)]
}

/** Tone-decode on load: pow(v, gamma·0.5). */
export function decodeGamma(v: Vec3, gamma: number = PROBE_ENCODING_GAMMA): Vec3 {
  const g = gamma * 0.5
  return [Math.pow(v[0], g), Math.pow(v[1], g), Math.pow(v[2], g)]
}

export interface HysteresisParams {
  hysteresis?: number
  irradianceThreshold?: number
  brightnessThreshold?: number
  encodingGamma?: number
}

/**
 * One EMA blend step for an irradiance texel.
 * `newRadiance` is the freshly accumulated linear radiance for this texel;
 * `history` is the previously stored (gamma-encoded) value. Returns the new
 * stored value. A zero history converges in one frame — the first write is the
 * measurement, clamp included (see below).
 */
export function blendRadiance(newRadiance: Vec3, history: Vec3, p: HysteresisParams = {}): Vec3 {
  const gamma = p.encodingGamma ?? PROBE_ENCODING_GAMMA
  const result = encodeGamma(newRadiance, gamma)
  const histZero = dot(history, history) === 0

  let h = p.hysteresis ?? PROBE_HYSTERESIS
  if (histZero) {
    h = 0
  } else if (maxComponent(sub(history, result)) > (p.irradianceThreshold ?? PROBE_IRRADIANCE_THRESHOLD)) {
    h = Math.max(0, h - PROBE_HYSTERESIS_DROP) // LARGE change → drop history fast
  }

  // A zero history is an ABSENCE of history: there is no accumulated frame for an impulse to damage,
  // and `h = 0` has already declared this write to be the measurement. Clamping here overruled that and
  // kept a quarter of it, so the first write advanced by (1 - h) · clamp = 0.75% of the traced value
  // instead of 3%.
  //
  // The clamp is one of TWO throttles on a warming atlas, not the whole of it, and the measured effect
  // is partial accordingly. `DdgiProbeVolume.update()` re-randomises every ray each frame, so each
  // frame is a fresh sample and the atlas averages them at (1 - h) per frame — that second throttle
  // survives this fix. Measured on the most GI-sensitive region of the frame, over three runs each: the
  // recovery to within 5 luminance units of the settled value went from 4024/4113/4291 ms to
  // 3030/3050/3080 ms, while the DEPTH of the dip was unchanged at ~14.2 units. So this buys roughly a
  // quarter of the washed-out time after a rebuild; the remainder is the EMA pacing, not the clamp.
  //
  // Once a texel has any history the clamp applies as before — that is the case it was written for.
  let delta = sub(result, history)
  if (!histZero && luminance(delta) > (p.brightnessThreshold ?? PROBE_BRIGHTNESS_THRESHOLD)) {
    delta = scale(delta, PROBE_IMPULSE_CLAMP) // clamp per-update impulse
  }
  return add(history, scale(delta, 1 - h))
}

/**
 * The hysteresis one distance texel should blend at.
 *
 * A zero history is an ABSENCE of history, not a measurement of zero distance — the reading
 * `blendRadiance` already gives a zero irradiance history. Until this existed the two disagreed: the
 * irradiance atlas snapped to the traced truth on the frame after a rebuild while the distance atlas
 * lerped up from nothing at `hysteresis` per frame. That asymmetry was the entire cost of a rebuild.
 * A zero distance atlas makes `chebyshevBound` 0 for every probe — the variance is 0, and any surface
 * is farther from the probe than a mean of 0 — so every probe is floored at its minimum weight and the
 * GI goes with it. At the shipped 0.97 that is ~220 frames at 56 fps; measured on the frame, a
 * rebuild dropped the most GI-sensitive region 77.63 -> 63.48 and took 4024 ms to come back within 5
 * units.
 *
 * Both raw moments are taken because one thread writes them with one h: they have to snap together.
 */
export function distanceHysteresis(
  historyMean: number,
  historyMeanSq: number,
  hysteresis: number = PROBE_HYSTERESIS,
): number {
  return historyMean === 0 && historyMeanSq === 0 ? 0 : hysteresis
}

/** Plain lerp for distance texels (no thresholds). `hysteresis` comes from `distanceHysteresis`. */
export function blendDistance(newDistance: number, history: number, hysteresis: number = PROBE_HYSTERESIS): number {
  return history + (1 - hysteresis) * (newDistance - history)
}
