/**
 * Core type contracts (frozen after M1 scaffold).
 * A Schwarzschild black hole image is scale-free: mass sets only the SI ruler,
 * never the geometry. All spatial quantities are in "black hole units" (bhu)
 * where the Schwarzschild radius r_s = 1.
 */

/** 3-vector (pure, no THREE dependency). */
export interface Vec3 {
  x: number
  y: number
  z: number
}

/** Which fate a traced photon meets. */
export type PhotonFate = 'captured' | 'escaped' | 'escaped_unbent'

/** One accretion-disk crossing of a traced geodesic (for CPU validation). */
export interface DiskHit {
  /** Radius at crossing, in bhu (r_s = 1). */
  r: number
  /** Azimuth around the polar axis (radians, XZ-plane, +Z = 0). */
  azimuth: number
  /** Total frequency-shift factor g = nu_obs / nu_emit (Doppler * gravity). */
  g: number
}

/** Result of a single photon trace (mirrors the GLSL integrator). */
export interface TraceResult {
  fate: PhotonFate
  /** For 'escaped': unit direction the photon departs toward (starfield sample). */
  finalDir: Vec3
  /** Disk crossings encountered along the path (in integration order). */
  diskHits: DiskHit[]
}

/** User-tunable render parameters. */
export interface RenderParams {
  /** Black hole mass in solar masses (SI readout only). */
  massMsun: number
  /** Dimensionless Kerr spin â = a/M in [0, 1) (0 = Schwarzschild). */
  spin: number
  /** Disk temperature at the inner edge, kelvin. */
  diskTempK: number
  /** Disk emissivity brightness multiplier. */
  diskBrightness: number
  /** Outer disk radius, in bhu (inner edge = ISCO = 3 r_s). */
  diskOuter: number
  /** Starfield density (0..1). */
  starDensity: number
  /** Bloom strength (0 = off). */
  bloomStrength: number
  /** Tone-mapping exposure. */
  exposure: number
  /** Geodesic integration steps per ray (perf vs accuracy). */
  steps: number
  /** Auto-orbit the camera. */
  autoOrbit: boolean
  /** Toggle the accretion disk. */
  showDisk: boolean
  /** Toggle gravitational lensing (flat-space fallback for comparison). */
  lensing: boolean
}

/** Derived SI readouts shown in the HUD (computed from mass + spin). */
export interface PhysicalReadout {
  /** Dimensionless spin â = a/M (0..1). */
  spin: number
  /** Schwarzschild radius 2M in km. */
  rsKm: number
  /** Outer event horizon r₊ = M + √(M²−a²), km. */
  outerHorizonKm: number
  /** Inner (Cauchy) horizon r₋ = M − √(M²−a²), km. */
  innerHorizonKm: number
  /** Equatorial ergosphere (static limit) radius = 2M, km. */
  ergosphereKm: number
  /** Prograde ISCO, km. */
  iscoProKm: number
  /** Retrograde ISCO, km. */
  iscoRetroKm: number
  /** Accretion radiative efficiency η = 1 − E(ISCO), 0..~0.42. */
  accretionEfficiency: number
}
