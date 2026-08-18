import type { Vec3 } from './vec3'

/**
 * Frozen DDGI parameter table (impl-plan §6 / research.md §12).
 * Ported from the RTXGI defaults — pure data, mirrored 1:1 into the GPU kernels.
 */
export const PROBE_NUM_RAYS = 256
export const PROBE_IRRADIANCE_INTERIOR_TEXELS = 6 // → 8×8 with 1-texel border
export const PROBE_DISTANCE_INTERIOR_TEXELS = 16 // → 18×18 with 1-texel border
export const PROBE_HYSTERESIS = 0.97
export const PROBE_DISTANCE_EXPONENT = 50
export const PROBE_ENCODING_GAMMA = 5
export const PROBE_IRRADIANCE_THRESHOLD = 0.25
export const PROBE_BRIGHTNESS_THRESHOLD = 0.1
export const PROBE_RANDOM_BACKFACE_THRESHOLD = 0.1
export const PROBE_FIXED_BACKFACE_THRESHOLD = 0.25
export const PROBE_VIEW_BIAS = 0.1 // world units, scale-dependent
export const PROBE_NORMAL_BIAS = 0.1 // world units, scale-dependent
export const PROBE_MIN_FRONTFACE_DISTANCE = 1.0 // world units
export const PROBE_MAX_RAY_DISTANCE_FACTOR = 1.5 // × length(spacing)
export const NUM_FIXED_RAYS = 32 // relocation/classification ray subset
export const CHEBYSHEV_MIN_WEIGHT = 0.05 // never fully zero (fallback)
export const CHEBYSHEV_CRUSH_THRESHOLD = 0.2 // small-weight shaping
export const WRAP_SHADING_FLOOR = 0.2 // weight never → 0

/** A DDGIVolume: axis-aligned grid of probes (research.md §2). */
export interface DdgiVolumeConfig {
  /** World position of the volume center. */
  origin: Vec3
  /** Per-axis spacing between probes (world units). */
  probeSpacing: Vec3
  /** Per-axis probe counts (integers ≥ 1). */
  probeCounts: Vec3
  /** Rays per probe per frame. */
  probeNumRays?: number
  /** Fixed (unrotated) ray count for relocation/classification. */
  numFixedRays?: number
}

export function defaultProbeNumRays(cfg: DdgiVolumeConfig): number {
  return cfg.probeNumRays ?? PROBE_NUM_RAYS
}

export function defaultNumFixedRays(cfg: DdgiVolumeConfig): number {
  return cfg.numFixedRays ?? NUM_FIXED_RAYS
}
