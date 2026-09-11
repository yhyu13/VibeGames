import type { Vec3 } from './vec3'

/**
 * Frozen DDGI parameter table (impl-plan §6 / research.md §12).
 * Ported from the RTXGI defaults — pure data, mirrored 1:1 into the GPU kernels.
 */
export const PROBE_NUM_RAYS = 256
export const PROBE_IRRADIANCE_INTERIOR_TEXELS = 6 // → 8×8 with 1-texel border
export const PROBE_DISTANCE_INTERIOR_TEXELS = 16 // → 18×18 with 1-texel border
export const PROBE_HYSTERESIS = 0.97
/**
 * Hysteresis response curve — the two scalars `blendRadiance` applies when the
 * history and the new frame disagree. They are NOT tunables (the sliders never
 * touch them; only `PROBE_HYSTERESIS` is live), so they live here rather than in
 * `LiveParams`: one definition, read by both the CPU reference and the WGSL
 * kernel, which must agree exactly or the reference stops predicting the GPU.
 */
export const PROBE_HYSTERESIS_DROP = 0.75 // large change → h −= drop (forget history fast)
export const PROBE_IMPULSE_CLAMP = 0.25 // brightening impulse → delta ×= clamp
/**
 * BT.709 luma weights. `ddgi_luminance` in the kernel and `luminance` in
 * `core/hysteresis.ts` decide the same branch — whether an update counts as a
 * "brightening impulse" — so they must be the same three numbers, not two
 * transcriptions of them.
 */
export const LUMA_WEIGHTS: Vec3 = [0.2126, 0.7152, 0.0722]
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
