import type { Vec3 } from './vec3'
import { add, dot, maxComponent, scale, sub } from './vec3'
import {
  PROBE_BRIGHTNESS_THRESHOLD,
  PROBE_ENCODING_GAMMA,
  PROBE_HYSTERESIS,
  PROBE_IRRADIANCE_THRESHOLD,
} from './constants'

/**
 * Per-texel hysteresis / EMA blending (research.md §7). Radiance blends in
 * gamma-encoded storage space with threshold-triggered history drops; distance
 * blends as a plain lerp.
 */

/** BT.709 luminance of a linear RGB triple. */
export function luminance(v: Vec3): number {
  return 0.2126 * v[0] + 0.7152 * v[1] + 0.0722 * v[2]
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
 * stored value. First frame (zero history) converges instantly.
 */
export function blendRadiance(newRadiance: Vec3, history: Vec3, p: HysteresisParams = {}): Vec3 {
  const gamma = p.encodingGamma ?? PROBE_ENCODING_GAMMA
  const result = encodeGamma(newRadiance, gamma)
  const histZero = dot(history, history) === 0

  let h = p.hysteresis ?? PROBE_HYSTERESIS
  if (histZero) {
    h = 0
  } else if (maxComponent(sub(history, result)) > (p.irradianceThreshold ?? PROBE_IRRADIANCE_THRESHOLD)) {
    h = Math.max(0, h - 0.75) // LARGE change → drop history fast
  }

  let delta = sub(result, history)
  if (luminance(delta) > (p.brightnessThreshold ?? PROBE_BRIGHTNESS_THRESHOLD)) {
    delta = scale(delta, 0.25) // clamp per-update impulse
  }
  return add(history, scale(delta, 1 - h))
}

/** Plain lerp for distance texels (no thresholds). */
export function blendDistance(newDistance: number, history: number, hysteresis: number = PROBE_HYSTERESIS): number {
  return history + (1 - hysteresis) * (newDistance - history)
}
