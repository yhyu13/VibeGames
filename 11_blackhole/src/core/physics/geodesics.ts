/**
 * CPU reference for the Schwarzschild photon geodesic integrator. Mirrors the
 * GLSL `blackhole.frag` exactly (Cartesian Binet-form ODE + leapfrog), so the
 * two stay numerically consistent. Used for devtools validation, HUD readouts,
 * and to confirm analytic anchors (shadow radius = b_crit, photon sphere, ISCO).
 */
import { ESCAPE_R, HORIZON_R, ISCO_R } from '../constants'
import type { DiskHit, TraceResult, Vec3 } from '../types'

// ---------------------------------------------------------------------------
// vec3 helpers (pure, no THREE)
// ---------------------------------------------------------------------------

export function v3(x: number, y: number, z: number): Vec3 {
  return { x, y, z }
}
export function dot(a: Vec3, b: Vec3): number {
  return a.x * b.x + a.y * b.y + a.z * b.z
}
export function cross(a: Vec3, b: Vec3): Vec3 {
  return v3(a.y * b.z - a.z * b.y, a.z * b.x - a.x * b.z, a.x * b.y - a.y * b.x)
}
export function len(a: Vec3): number {
  return Math.sqrt(dot(a, a))
}
export function norm(a: Vec3): Vec3 {
  const l = len(a) || 1
  return v3(a.x / l, a.y / l, a.z / l)
}
export function scale(a: Vec3, s: number): Vec3 {
  return v3(a.x * s, a.y * s, a.z * s)
}
export function sub(a: Vec3, b: Vec3): Vec3 {
  return v3(a.x - b.x, a.y - b.y, a.z - b.z)
}
export function add(a: Vec3, b: Vec3): Vec3 {
  return v3(a.x + b.x, a.y + b.y, a.z + b.z)
}

// ---------------------------------------------------------------------------
// Orbital + radiative physics
// ---------------------------------------------------------------------------

/** Impact parameter b = |ro × rd| for a unit ray direction rd. */
export function impactParameter(ro: Vec3, rd: Vec3): number {
  return len(cross(ro, rd))
}

/** GR circular-orbit speed (fraction of c): β = 1/√(2(r−1)), r in bhu. */
export function orbitalSpeedC(r: number): number {
  return 1 / Math.sqrt(2 * (r - 1))
}

/** Lorentz factor. */
export function lorentzFactor(beta: number): number {
  return 1 / Math.sqrt(1 - beta * beta)
}

/**
 * Combined Doppler + gravitational frequency shift g = ν_obs/ν_em for a
 * circularly-orbiting emitter. `gasdir` = orbital velocity direction (unit),
 * `nhat` = photon direction from emitter toward observer (unit).
 * g = √(1 − 1.5/r) / (γ(1 − β·n̂)); approaching (β·n̂ > 0) → g > grav (bluer).
 */
export function frequencyShift(r: number, gasdir: Vec3, nhat: Vec3): number {
  const beta = orbitalSpeedC(r)
  const gamma = lorentzFactor(beta)
  const grav = Math.sqrt(Math.max(1 - 1.5 / r, 0))
  const cosLos = dot(gasdir, nhat)
  const g = grav / Math.max(gamma * (1 - beta * cosLos), 0.05)
  return Math.min(Math.max(g, 0.05), 3)
}

/** Shakura–Sunyaev radial temperature profile, normalized to 1 at the ISCO. */
export function diskTemperatureProfile(r: number): number {
  return Math.pow(ISCO_R / r, 0.75)
}

/** Radial emissivity ∝ T⁴ ∝ r^-3 (power-law body; zero-torque edge omitted). */
export function diskEmissivity(r: number): number {
  return Math.pow(ISCO_R / r, 3)
}

// ---------------------------------------------------------------------------
// Geodesic tracer (leapfrog kick–drift–kick, mirrors the GLSL)
// ---------------------------------------------------------------------------

/** Weak-field cutoff: rays with b > FAR_B are treated as straight (deflection ≲ 15°). */
export const FAR_B = 8

function accel(x: Vec3, h2: number): Vec3 {
  const r2 = dot(x, x)
  const r = Math.sqrt(r2)
  // a = -1.5 * h2 * x / r^5
  const k = (-1.5 * h2) / (r2 * r2 * r)
  return scale(x, k)
}

function clampStep(r: number): number {
  return Math.min(Math.max(0.16 * r, 0.03), 1.5)
}

/** Orbital velocity direction (unit) for a circular orbit in the XZ disk plane. */
export function gasDirection(pos: Vec3): Vec3 {
  return norm(v3(pos.z, 0, -pos.x))
}

/**
 * Trace a photon from `ro` along unit `rd`. `diskOuter` bounds the accretion
 * disk annulus [ISCO, diskOuter]. Returns fate, escape direction, and all disk
 * crossings in integration order.
 */
export function tracePhoton(
  ro: Vec3,
  rd: Vec3,
  steps: number,
  diskOuter: number,
  diskOn: boolean,
): TraceResult {
  const rdUnit = norm(rd)
  const b = impactParameter(ro, rdUnit)

  // Far-field: weak deflection, treat as a straight ray (only a disk-plane test).
  if (b > FAR_B) {
    return traceStraight(ro, rdUnit, diskOuter, diskOn)
  }

  let x = { ...ro }
  let vel = { ...rdUnit }
  const h2 = b * b
  const diskHits: DiskHit[] = []
  let fate: 'captured' | 'escaped' = 'escaped'

  for (let i = 0; i < steps; i++) {
    const r2 = dot(x, x)
    if (r2 < HORIZON_R * HORIZON_R) {
      fate = 'captured'
      break
    }
    if (r2 > ESCAPE_R * ESCAPE_R) break

    const r = Math.sqrt(r2)
    const dt = clampStep(r)

    // kick
    vel = add(vel, scale(accel(x, h2), 0.5 * dt))
    // drift
    const xNew = add(x, scale(vel, dt))

    // disk-plane crossing (sign change of y)
    if (diskOn && x.y * xNew.y < 0) {
      const t = x.y / (x.y - xNew.y)
      const xc = add(x, scale(sub(xNew, x), t))
      const rc = len(xc)
      if (rc > ISCO_R && rc < diskOuter) {
        const nhat = norm(vel)
        const g = frequencyShift(rc, gasDirection(xc), nhat)
        diskHits.push({ r: rc, azimuth: Math.atan2(xc.x, xc.z), g })
      }
    }

    // kick
    vel = add(vel, scale(accel(xNew, h2), 0.5 * dt))
    x = xNew
  }

  // Rays still wound near the photon sphere when the budget runs out are captured.
  if (fate !== 'captured' && dot(x, x) < 4) fate = 'captured'

  return { fate, finalDir: norm(vel), diskHits }
}

/** Straight-line trace for far rays (no bending). */
function traceStraight(ro: Vec3, rd: Vec3, diskOuter: number, diskOn: boolean): TraceResult {
  const diskHits: DiskHit[] = []
  if (diskOn && rd.y !== 0) {
    const t = -ro.y / rd.y // ray-plane intersection with y = 0
    if (t > 0) {
      const xc = add(ro, scale(rd, t))
      const rc = len(xc)
      if (rc > ISCO_R && rc < diskOuter) {
        const g = frequencyShift(rc, gasDirection(xc), rd)
        diskHits.push({ r: rc, azimuth: Math.atan2(xc.x, xc.z), g })
      }
    }
  }
  return { fate: 'escaped', finalDir: rd, diskHits }
}
