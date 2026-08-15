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
export const DISK_OUTER_DEFAULT = 10

// ---------------------------------------------------------------------------
// Kerr geometry (rotating). In bhu the black-hole mass is M = 1/2 (since
// r_s = 2M = 1). The user-facing spin is the dimensionless â = a/M ∈ [0, 1).
// ---------------------------------------------------------------------------

/** Black hole mass in bhu (r_s = 2M = 1). */
export const M_BHU = 0.5
/** Default dimensionless spin â = a/M (0 = Schwarzschild). */
export const SPIN_DEFAULT = 0.9
/** Max dimensionless spin (capped below extremal for numerical safety). */
export const SPIN_MAX = 0.998

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
  spin: SPIN_DEFAULT,
  diskTempK: 5500,
  diskBrightness: 1.5,
  diskOuter: DISK_OUTER_DEFAULT,
  starDensity: 0.8,
  bloomStrength: 1.2,
  exposure: 1.15,
  steps: 160,
  autoOrbit: true,
  showDisk: true,
  lensing: true,
}

/** Camera defaults: orbit radius (bhu) and elevation above the disk plane (rad). */
export const CAMERA_DISTANCE_DEFAULT = 14
export const CAMERA_TILT_DEFAULT = 0.05 // ~2.9° above the disk plane (near-edge-on: iconic lensed ring)
export const CAMERA_POLAR_MIN = 0.02
export const CAMERA_POLAR_MAX = Math.PI - 0.06
export const CAMERA_DISTANCE_MIN = 4.5
export const CAMERA_DISTANCE_MAX = 40
export const CAMERA_FOV = 55

/** Geodesic integration escape radius: r beyond which the photon is "at infinity". */
export const ESCAPE_R = 60
