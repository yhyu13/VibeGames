/**
 * Physical + render constants (frozen after M1 scaffold).
 * All spatial quantities are in "black hole units" (bhu) where r_s = 1.
 * The Schwarzschild image is scale-free: these never change with mass.
 */
import type { RenderParams } from './types'

// ---------------------------------------------------------------------------
// Schwarzschild geometry (r_s = 1)
// ---------------------------------------------------------------------------

/** Event horizon radius. */
export const HORIZON_R = 1
/** Photon sphere = 3 GM/c^2 = 1.5 r_s. */
export const PHOTON_SPHERE_R = 1.5
/** Innermost stable circular orbit = 6 GM/c^2 = 3 r_s (disk inner edge). */
export const ISCO_R = 3
/** Critical impact parameter = (3*sqrt(3)/2) r_s ≈ 2.598 r_s. */
export const B_CRIT = (3 * Math.sqrt(3)) / 2
/** Apparent shadow radius (same as b_crit). */
export const SHADOW_R = B_CRIT

/** Default outer disk radius (bhu). */
export const DISK_OUTER_DEFAULT = 24

// ---------------------------------------------------------------------------
// SI conversion (scale-free geometry -> physical ruler)
// ---------------------------------------------------------------------------

/** Gravitational constant, m^3 kg^-1 s^-2. */
export const G = 6.674e-11
/** Speed of light, m/s. */
export const C = 2.99792458e8
/** Solar mass, kg. */
export const M_SUN = 1.98892e30
/** Schwarzschild radius per solar mass = 2 G M_sun / c^2, metres. */
export const RS_PER_MSUN_M = (2 * G * M_SUN) / (C * C)
/** Schwarzschild radius per solar mass, km (≈ 2.954 km). */
export const RS_PER_MSUN_KM = RS_PER_MSUN_M / 1000

// ---------------------------------------------------------------------------
// Render defaults
// ---------------------------------------------------------------------------

export const DEFAULT_PARAMS: RenderParams = {
  massMsun: 1e8, // Gargantua-scale (readout only)
  diskTempK: 9000,
  diskBrightness: 1.0,
  diskOuter: DISK_OUTER_DEFAULT,
  starDensity: 0.6,
  bloomStrength: 0.4,
  exposure: 1.05,
  steps: 128,
  autoOrbit: true,
  showDisk: true,
  lensing: true,
}

/** Camera defaults: orbit radius (bhu) and elevation above the disk plane (rad). */
export const CAMERA_DISTANCE_DEFAULT = 14
export const CAMERA_TILT_DEFAULT = 0.16 // ~9° above the disk plane (edge-on-ish: shadow pokes above the disk band)
export const CAMERA_POLAR_MIN = 0.06
export const CAMERA_POLAR_MAX = Math.PI - 0.06
export const CAMERA_DISTANCE_MIN = 4.5
export const CAMERA_DISTANCE_MAX = 40
export const CAMERA_FOV = 55

/** Geodesic integration escape radius: r beyond which the photon is "at infinity". */
export const ESCAPE_R = 60
