/**
 * Kerr (rotating) black hole photon geodesics — CPU reference.
 *
 * Boyer–Lindquist coordinates, Carter separation, affine-time integration.
 * Geometrized units with G = c = 1 and r_s = 2M = 1 ("bhu"), so M = 1/2.
 * The user-facing spin is the dimensionless â = a/M ∈ [0, 1); the dimensionful
 * spin parameter is `a = â · M`.
 *
 * Key numerical choices (per the computational-relativity research):
 *   - Δ(r) factored as (r−r₊)(r−r₋) to avoid catastrophic cancellation of
 *     r² − 2Mr + a² near the horizon (float32-safe).
 *   - Polar coordinate integrated as u = cosθ (not θ), which is regular at the
 *     poles and turns the angular potential into a clean biquadratic.
 *   - Turning points located by exact root bisection, not sign-clamping.
 *   - Conserved quantities (E, L_z, Q) are fixed at the seed — they never
 *     drift, since the Carter form hardcodes them.
 *
 * The GPU shader mirrors this module's RK4 stepper; the CPU additionally
 * offers a DOPRI5(4) adaptive stepper for high-accuracy validation.
 */
import { M_BHU, ESCAPE_R } from '../constants'
import type { DiskHit, PhotonFate, TraceResult, Vec3 } from '../types'
import { v3, dot, cross, len, norm, scale, add } from './geodesics'

// ---------------------------------------------------------------------------
// Geometry (bhu, M = 1/2)
// ---------------------------------------------------------------------------

/** Event horizons (bhu): outer r₊ and inner r₋. */
export function kerrHorizons(a: number): { outer: number; inner: number } {
  const s = Math.sqrt(Math.max(M_BHU * M_BHU - a * a, 0))
  return { outer: M_BHU + s, inner: M_BHU - s }
}

// ---------------------------------------------------------------------------
// Orbital physics (prograde Keplerian thin disk)
// ---------------------------------------------------------------------------

/** Bardeen–Press–Teukolsky ISCO (bhu). `spin` = dimensionless â ∈ [0, 1). */
export function kerrISCO(spin: number): { pro: number; retro: number } {
  const s = Math.min(Math.max(spin, 0), 0.9999)
  const c1 = Math.cbrt(1 - s * s)
  const Z1 = 1 + c1 * (Math.cbrt(1 + s) + Math.cbrt(1 - s))
  const Z2 = Math.sqrt(3 * s * s + Z1 * Z1)
  const root = Math.sqrt(Math.max((3 - Z1) * (3 + Z1 + 2 * Z2), 0))
  // r_isco / M = 3 + Z2 ∓ root  (minus = prograde); × M_BHU → bhu.
  return { pro: (3 + Z2 - root) * M_BHU, retro: (3 + Z2 + root) * M_BHU }
}

/** Keplerian angular velocity Ω = M^{1/2} / (r^{3/2} + a M^{1/2}), prograde. */
export function kerrKeplerianOmega(r: number, a: number): number {
  const sm = Math.sqrt(M_BHU)
  return sm / (Math.pow(r, 1.5) + a * sm)
}

/** Keplerian 4-velocity time component u^t (prograde, bhu). */
export function kerrUt(r: number, a: number): number {
  const M = M_BHU
  const sm = Math.sqrt(M)
  const r15 = Math.pow(r, 1.5)
  const num = r15 + a * sm
  const rad = Math.max(r15 - 3 * M * Math.sqrt(r) + 2 * a * sm, 1e-9)
  return num / (Math.pow(r, 0.75) * Math.sqrt(rad))
}

/**
 * Doppler + gravitational redshift g = ν_obs/ν_em for a photon hitting the
 * prograde disk at radius r with conserved impact parameter λ = L_z/E.
 * g = 1 / [ u^t (1 − Ω λ) ].
 */
export function kerrRedshift(r: number, lam: number, a: number): number {
  const Omega = kerrKeplerianOmega(r, a)
  const ut = kerrUt(r, a)
  const g = 1 / Math.max(ut * (1 - Omega * lam), 0.05)
  return Math.min(Math.max(g, 0.05), 3)
}

/** Shakura–Sunyaev disk emissivity (zero-torque inner edge). */
export function kerrDiskEmissivity(r: number, isco: number): number {
  const x = isco / r
  return x * x * x * (1 - Math.sqrt(x))
}

/** Shakura–Sunyaev disk temperature profile (normalized to 1 at peak). */
export function kerrDiskTemperature(r: number, isco: number): number {
  const x = isco / r
  return Math.pow(x, 0.75) * Math.pow(Math.max(1 - Math.sqrt(x), 0), 0.25)
}

// ---------------------------------------------------------------------------
// Seed: camera ray → conserved (λ, η) via the ZAMO tetrad (exact at finite r)
// ---------------------------------------------------------------------------

export interface KerrSeed {
  r: number
  u: number // cosθ
  phi: number
  sr: number // sign of dr/dλ
  su: number // sign of du/dλ
  lam: number // L_z / E (impact parameter, bhu)
  eta: number // Q / E² (bhu²)
  b: number // flat-space impact parameter (far-field cutoff)
  horizons: { outer: number; inner: number }
}

export function kerrSeed(ro: Vec3, rd: Vec3, a: number): KerrSeed {
  const M = M_BHU
  const r = len(ro)
  const ir = 1 / r

  // Orthonormal spherical basis at the camera (spin axis = +z).
  const er = scale(ro, ir)
  const zAxis = v3(0, 0, 1)
  const ephiRaw = cross(zAxis, er)
  const ephiLen = len(ephiRaw)
  const ephi = ephiLen > 1e-9 ? scale(ephiRaw, 1 / ephiLen) : v3(0, 1, 0)
  const etheta = cross(ephi, er)

  // Ray direction in the ZAMO (orthonormal) frame.
  const nR = dot(rd, er)
  const nTheta = dot(rd, etheta)
  const nPhi = dot(rd, ephi)

  const u = ro.z * ir // cosθ
  const st2 = Math.max(1 - u * u, 1e-12)
  const st = Math.sqrt(st2)
  const r2 = r * r
  const a2 = a * a
  const Sigma = r2 + a2 * u * u

  const { outer: rp, inner: rm } = kerrHorizons(a)
  const Delta = (r - rp) * (r - rm)
  const A = (r2 + a2) * (r2 + a2) - a2 * Delta * st2

  // Contravariant photon 4-momentum k^μ in the ZAMO frame (ω = 1).
  const kt = Math.sqrt(A / (Sigma * Delta))
  const kphi = (2 * a * M * r) / Math.sqrt(Sigma * Delta * A) + (nPhi * Math.sqrt(Sigma / A)) / st

  // Equatorial-free metric components.
  const gtt = -(1 - (2 * M * r) / Sigma)
  const gtphi = (-2 * a * M * r * st2) / Sigma
  const gphiphi = (r2 + a2 + (2 * a2 * M * r * st2) / Sigma) * st2

  // Covariant momentum p_μ = g_μν k^ν.
  const pt = gtt * kt + gtphi * kphi
  const pphi = gtphi * kt + gphiphi * kphi
  const ptheta = nTheta * Math.sqrt(Sigma) // = k^θ · Σ

  const E = -pt
  const Lz = pphi
  // Carter constant Q = p_θ² − a²E²cos²θ + Lz²cot²θ (finite form).
  const Q = ptheta * ptheta - a2 * E * E * u * u + (Lz * Lz * u * u) / st2

  const lam = Lz / E
  const eta = Q / (E * E)
  const sr = nR < 0 ? -1 : 1
  const su = nTheta > 0 ? -1 : 1
  const b = len(cross(ro, rd))

  return { r, u, phi: Math.atan2(ro.y, ro.x), sr, su, lam, eta, b, horizons: { outer: rp, inner: rm } }
}

// ---------------------------------------------------------------------------
// Geodesic RHS (affine time λ)
// ---------------------------------------------------------------------------

interface KerrState {
  r: number
  u: number // cosθ
  phi: number
  sr: number
  su: number
}

function kerrRhs(
  s: KerrState,
  a: number,
  lam: number,
  eta: number,
  rp: number,
  rm: number,
): { dr: number; du: number; dphi: number } {
  const u2 = s.u * s.u
  const sin2 = Math.max(1 - u2, 1e-6)
  const r2 = s.r * s.r
  const Delta = (s.r - rp) * (s.r - rm)
  const Sigma = r2 + a * a * u2
  const P = r2 + a * a - a * lam

  const R = P * P - Delta * (eta + (lam - a) * (lam - a))
  const ThetaU = eta + (a * a - eta - lam * lam) * u2 - a * a * u2 * u2

  const dr = (s.sr * Math.sqrt(Math.max(R, 0))) / Sigma
  const du = (s.su * Math.sqrt(Math.max(ThetaU, 0))) / Sigma
  const dphi = (a * P / Delta - a + lam / sin2) / Sigma
  return { dr, du, dphi }
}

/** 4th-order Runge–Kutta on the (r, u, φ) state (mirrors the GLSL stepper). */
function kerrRk4Step(
  s: KerrState,
  dL: number,
  a: number,
  lam: number,
  eta: number,
  rp: number,
  rm: number,
): KerrState {
  const k1 = kerrRhs(s, a, lam, eta, rp, rm)
  const s2: KerrState = { r: s.r + 0.5 * dL * k1.dr, u: s.u + 0.5 * dL * k1.du, phi: s.phi + 0.5 * dL * k1.dphi, sr: s.sr, su: s.su }
  const k2 = kerrRhs(s2, a, lam, eta, rp, rm)
  const s3: KerrState = { r: s.r + 0.5 * dL * k2.dr, u: s.u + 0.5 * dL * k2.du, phi: s.phi + 0.5 * dL * k2.dphi, sr: s.sr, su: s.su }
  const k3 = kerrRhs(s3, a, lam, eta, rp, rm)
  const s4: KerrState = { r: s.r + dL * k3.dr, u: s.u + dL * k3.du, phi: s.phi + dL * k3.dphi, sr: s.sr, su: s.su }
  const k4 = kerrRhs(s4, a, lam, eta, rp, rm)

  const dr = (dL / 6) * (k1.dr + 2 * k2.dr + 2 * k3.dr + k4.dr)
  const du = (dL / 6) * (k1.du + 2 * k2.du + 2 * k3.du + k4.du)
  const dphi = (dL / 6) * (k1.dphi + 2 * k2.dphi + 2 * k3.dphi + k4.dphi)
  return { r: s.r + dr, u: s.u + du, phi: s.phi + dphi, sr: s.sr, su: s.su }
}

/** Bisect R(r) = 0 on [rLo, rHi] where R(rLo) ≥ 0 and R(rHi) < 0. */
function bisectRadial(
  rLo: number,
  rHi: number,
  a: number,
  lam: number,
  eta: number,
  rp: number,
  rm: number,
): number {
  for (let i = 0; i < 8; i++) {
    const mid = 0.5 * (rLo + rHi)
    const Delta = (mid - rp) * (mid - rm)
    const P = mid * mid + a * a - a * lam
    const R = P * P - Delta * (eta + (lam - a) * (lam - a))
    if (R < 0) rHi = mid
    else rLo = mid
  }
  // Return the allowed-side endpoint (R ≥ 0), not the midpoint: the midpoint
  // can land inside the forbidden region, trapping the ray at the turning point.
  return rLo
}

/** Bisect Θ_u(u) = 0 on [uLo, uHi] (Θ_u(uLo) ≥ 0, Θ_u(uHi) < 0). */
function bisectPolar(uLo: number, uHi: number, a: number, lam: number, eta: number): number {
  const a2 = a * a
  for (let i = 0; i < 8; i++) {
    const mid = 0.5 * (uLo + uHi)
    const m2 = mid * mid
    const ThetaU = eta + (a2 - eta - lam * lam) * m2 - a2 * m2 * m2
    if (ThetaU < 0) uHi = mid
    else uLo = mid
  }
  return uLo
}

// ---------------------------------------------------------------------------
// Escape direction (BL momentum → asymptotic Cartesian)
// ---------------------------------------------------------------------------

function escapeDirection(s: KerrState, a: number, lam: number, eta: number, rp: number, rm: number): Vec3 {
  const u = s.u
  const u2 = u * u
  const st = Math.sqrt(Math.max(1 - u2, 1e-12))
  const r2 = s.r * s.r
  const Delta = (s.r - rp) * (s.r - rm)
  const Sigma = r2 + a * a * u2
  const P = r2 + a * a - a * lam
  const R = P * P - Delta * (eta + (lam - a) * (lam - a))
  const ThetaU = eta + (a * a - eta - lam * lam) * u2 - a * a * u2 * u2

  const pR = (s.sr * Math.sqrt(Math.max(R, 0))) / Sigma
  const pTheta = (-s.su * Math.sqrt(Math.max(ThetaU, 0))) / (Sigma * st) // dθ/dλ = −s_u√Θ_u/(Σ sinθ)
  const pPhi = (a * P / Delta - a + lam / Math.max(1 - u2, 1e-6)) / Sigma

  // Orthonormal components → Cartesian (flat asymptotic frame).
  const nr = pR
  const nTheta = s.r * pTheta
  const nPhi = s.r * st * pPhi

  const cp = Math.cos(s.phi)
  const sp = Math.sin(s.phi)
  const ct = u
  const er = v3(st * cp, st * sp, ct)
  const etheta = v3(ct * cp, ct * sp, -st)
  const ephi = v3(-sp, cp, 0)

  return norm(
    add(add(scale(er, nr), scale(etheta, nTheta)), scale(ephi, nPhi)),
  )
}

// ---------------------------------------------------------------------------
// Tracer (RK4 fixed-step, mirrors the GLSL)
// ---------------------------------------------------------------------------

/** Weak-field cutoff: rays with b > FAR_B are treated as straight. */
export const KERR_FAR_B = 8

export function kerrTracePhoton(
  ro: Vec3,
  rd: Vec3,
  spin: number,
  steps: number,
  diskOuter: number,
  diskOn: boolean,
): TraceResult {
  const rdUnit = norm(rd)
  const a = Math.min(Math.max(spin, 0), 0.9999) * M_BHU
  const seed = kerrSeed(ro, rdUnit, a)
  const { outer: rp, inner: rm } = seed.horizons

  if (seed.b > KERR_FAR_B) {
    return kerrTraceStraight(ro, rdUnit, spin, diskOuter, diskOn)
  }

  const isco = kerrISCO(spin).pro
  const diskHits: DiskHit[] = []
  const s: KerrState = { r: seed.r, u: seed.u, phi: seed.phi, sr: seed.sr, su: seed.su }
  let fate: 'captured' | 'escaped' = 'escaped'
  let winds = 0

  const rCapture = rp + 1e-3

  for (let i = 0; i < steps; i++) {
    if (s.r < rCapture) {
      fate = 'captured'
      break
    }
    if (s.r > ESCAPE_R) break

    const dL = Math.min(Math.max(0.16 * s.r, 0.03), 1.5)
    const prevU = s.u
    const prevR = s.r
    const next = kerrRk4Step(s, dL, a, seed.lam, seed.eta, rp, rm)

    // Radial turning point.
    let r1 = next.r
    const Rnext = (() => {
      const P = r1 * r1 + a * a - a * seed.lam
      const Delta = (r1 - rp) * (r1 - rm)
      return P * P - Delta * (seed.eta + (seed.lam - a) * (seed.lam - a))
    })()
    if (Rnext < 0) {
      r1 = bisectRadial(prevR, r1, a, seed.lam, seed.eta, rp, rm)
      s.sr = -s.sr
      winds++
    }

    // Polar turning point.
    let u1 = next.u
    const ThetaUnext = (() => {
      const m2 = u1 * u1
      return seed.eta + (a * a - seed.eta - seed.lam * seed.lam) * m2 - a * a * m2 * m2
    })()
    if (ThetaUnext < 0) {
      u1 = bisectPolar(s.u, u1, a, seed.lam, seed.eta)
      s.su = -s.su
    }

    // Disk crossing (u = cosθ crosses 0 ⇔ θ = π/2).
    if (diskOn && prevU * u1 < 0) {
      const t = prevU / (prevU - u1)
      const rCross = prevR + (r1 - prevR) * t
      const phiCross = s.phi + (next.phi - s.phi) * t
      if (rCross > isco && rCross < diskOuter) {
        const g = kerrRedshift(rCross, seed.lam, a)
        diskHits.push({ r: rCross, azimuth: phiCross, g })
      }
    }

    s.r = r1
    s.u = u1
    s.phi = next.phi

    if (winds > 8) {
      // Near-critical orbit (winding on the photon shell): treat as captured.
      fate = 'captured'
      break
    }
  }

  if (fate !== 'captured' && s.r < rp + 1) fate = 'captured'

  const finalDir = escapeDirection(s, a, seed.lam, seed.eta, rp, rm)
  return { fate, finalDir, diskHits }
}

// ---------------------------------------------------------------------------
// Adaptive Mino-time tracer (DOPRI5(4) + PI step control)
// ---------------------------------------------------------------------------
//
// In Mino time (dτ = Σ dλ) the RHS drops the stiff 1/Σ prefactor:
//   dr/dλ = s_r √R,  du/dλ = s_u √Θ_u,  dφ/dλ = a(r²+a²−aλ)/Δ − a + λ/sin²θ.
// √R and √Θ_u vanish smoothly at the turning points, so a high-order adaptive
// integrator is well-conditioned. DOPRI5(4) is the 7-stage Dormand–Prince pair
// (5th-order solution + 4th-order error estimate) with a proportional-integral
// step-size controller — the standard high-accuracy choice for geodesics.

interface KerrRhsMino {
  dr: number
  du: number
  dphi: number
}

/** Radial potential R(r) (factored Δ). */
function radialPotential(r: number, a: number, lam: number, eta: number, rp: number, rm: number): number {
  const Delta = (r - rp) * (r - rm)
  const P = r * r + a * a - a * lam
  return P * P - Delta * (eta + (lam - a) * (lam - a))
}

/** Polar potential Θ_u(u) (u = cosθ, pole-regular biquadratic). */
function polarPotential(u: number, a: number, lam: number, eta: number): number {
  const u2 = u * u
  return eta + (a * a - eta - lam * lam) * u2 - a * a * u2 * u2
}

/** Mino-time RHS (no 1/Σ). */
function kerrRhsMino(
  r: number,
  u: number,
  sr: number,
  su: number,
  a: number,
  lam: number,
  eta: number,
  rp: number,
  rm: number,
): KerrRhsMino {
  const u2 = u * u
  const sin2 = Math.max(1 - u2, 1e-6)
  const r2 = r * r
  const Delta = (r - rp) * (r - rm)
  const P = r2 + a * a - a * lam
  return {
    dr: sr * Math.sqrt(Math.max(radialPotential(r, a, lam, eta, rp, rm), 0)),
    du: su * Math.sqrt(Math.max(polarPotential(u, a, lam, eta), 0)),
    dphi: (a * P) / Delta - a + lam / sin2,
  }
}

// Dormand–Prince 5(4) Butcher tableau (7 stages; b5 = 5th order, b4 = 4th).
const DOPRI_A: number[][] = [
  [],
  [1 / 5],
  [3 / 40, 9 / 40],
  [44 / 45, -56 / 15, 32 / 9],
  [19372 / 6561, -25360 / 2187, 64448 / 6561, -212 / 729],
  [9017 / 3168, -355 / 33, 46732 / 5247, 49 / 176, -5103 / 18656],
  [35 / 384, 0, 500 / 1113, 125 / 192, -2187 / 6784, 11 / 84],
]
const DOPRI_B5 = [35 / 384, 0, 500 / 1113, 125 / 192, -2187 / 6784, 11 / 84, 0]
const DOPRI_B4 = [5179 / 57600, 0, 7571 / 16695, 393 / 640, -92097 / 339200, 187 / 2100, 1 / 40]

interface DopriStepResult {
  r5: number
  u5: number
  phi5: number
  r4: number
  u4: number
  phi4: number
}

/** One DOPRI5(4) step in Mino time; returns 5th- and 4th-order solutions. */
function dopriStep(
  r: number,
  u: number,
  phi: number,
  sr: number,
  su: number,
  ds: number,
  a: number,
  lam: number,
  eta: number,
  rp: number,
  rm: number,
): DopriStepResult {
  const k: KerrRhsMino[] = new Array(7)
  for (let i = 0; i < 7; i++) {
    let rr = r
    let uu = u
    const row = DOPRI_A[i]
    for (let j = 0; j < row.length; j++) {
      rr += ds * row[j] * k[j].dr
      uu += ds * row[j] * k[j].du
    }
    k[i] = kerrRhsMino(rr, uu, sr, su, a, lam, eta, rp, rm)
  }
  let r5 = r
  let u5 = u
  let phi5 = phi
  let r4 = r
  let u4 = u
  let phi4 = phi
  for (let i = 0; i < 7; i++) {
    r5 += ds * DOPRI_B5[i] * k[i].dr
    u5 += ds * DOPRI_B5[i] * k[i].du
    phi5 += ds * DOPRI_B5[i] * k[i].dphi
    r4 += ds * DOPRI_B4[i] * k[i].dr
    u4 += ds * DOPRI_B4[i] * k[i].du
    phi4 += ds * DOPRI_B4[i] * k[i].dphi
  }
  return { r5, u5, phi5, r4, u4, phi4 }
}

export interface KerrAdaptiveOptions {
  rtol?: number
  atol?: number
  maxSteps?: number
  maxWinds?: number
}

/**
 * High-accuracy photon trace in Mino time with DOPRI5(4) + PI step control.
 * Disk crossings are tagged with `index` (0 = direct image, n ≥ 1 = n-th
 * photon ring). `maxWinds` bounds near-critical photon-shell windings.
 */
export function kerrTracePhotonAdaptive(
  ro: Vec3,
  rd: Vec3,
  spin: number,
  diskOuter: number,
  diskOn: boolean,
  opts: KerrAdaptiveOptions = {},
): TraceResult {
  const rdUnit = norm(rd)
  const a = Math.min(Math.max(spin, 0), 0.9999) * M_BHU
  const seed = kerrSeed(ro, rdUnit, a)
  const { outer: rp, inner: rm } = seed.horizons

  if (seed.b > KERR_FAR_B) {
    return kerrTraceStraight(ro, rdUnit, spin, diskOuter, diskOn)
  }

  const isco = kerrISCO(spin).pro
  const diskHits: DiskHit[] = []
  const rtol = opts.rtol ?? 1e-8
  const atol = opts.atol ?? 1e-12
  const maxSteps = opts.maxSteps ?? 40000
  const maxWinds = opts.maxWinds ?? 64

  let r = seed.r
  let u = seed.u
  let phi = seed.phi
  let sr = seed.sr
  let su = seed.su
  let fate: PhotonFate = 'escaped'
  let winds = 0
  let crossingCount = 0
  let ds = 0.5
  let errPrev = 0
  const rCapture = rp + 1e-3
  const clampScale = (x: number) => Math.min(5, Math.max(0.2, x))

  for (let i = 0; i < maxSteps; i++) {
    if (r < rCapture) {
      fate = 'captured'
      break
    }
    if (r > ESCAPE_R) break

    const step = dopriStep(r, u, phi, sr, su, ds, a, seed.lam, seed.eta, rp, rm)

    // Scaled error (r and u drive the physics; φ follows the same steps).
    const errR = Math.abs(step.r5 - step.r4) / (atol + rtol * Math.max(Math.abs(r), Math.abs(step.r5)))
    const errU = Math.abs(step.u5 - step.u4) / (atol + rtol * Math.max(Math.abs(u), Math.abs(step.u5)))
    const err = Math.max(errR, errU)

    if (err > 1) {
      // Reject: shrink and retry (no state change).
      ds *= clampScale(0.9 * Math.pow(1 / err, 0.2))
      errPrev = 0
      if (ds < 1e-9) ds = 1e-9
      continue
    }

    // Accept: resolve turning points, then the disk crossing.
    let rNext = step.r5
    let uNext = step.u5
    if (radialPotential(rNext, a, seed.lam, seed.eta, rp, rm) < 0) {
      rNext = bisectRadial(r, rNext, a, seed.lam, seed.eta, rp, rm)
      sr = -sr
      winds++
    }
    if (polarPotential(uNext, a, seed.lam, seed.eta) < 0) {
      uNext = bisectPolar(u, uNext, a, seed.lam, seed.eta)
      su = -su
    }
    if (diskOn && u * uNext < 0) {
      const t = u / (u - uNext)
      const rCross = r + (rNext - r) * t
      const phiCross = phi + (step.phi5 - phi) * t
      if (rCross > isco && rCross < diskOuter) {
        diskHits.push({ r: rCross, azimuth: phiCross, g: kerrRedshift(rCross, seed.lam, a), index: crossingCount })
      }
      crossingCount++
    }
    r = rNext
    u = uNext
    phi = step.phi5

    // PI step-size controller (proportional + integral on the error ratio).
    const pi = errPrev > 0 ? Math.pow(errPrev / err, 0.08) : 1
    ds *= clampScale(0.9 * Math.pow(1 / err, 0.2) * pi)
    errPrev = err

    if (winds > maxWinds) {
      fate = 'captured'
      break
    }
  }

  if (fate !== 'captured' && r < rp + 1) fate = 'captured'

  const finalDir = escapeDirection({ r, u, phi, sr, su }, a, seed.lam, seed.eta, rp, rm)
  return { fate, finalDir, diskHits }
}

/** Straight-line trace for far rays (no bending; disk at z = 0). */
function kerrTraceStraight(ro: Vec3, rd: Vec3, spin: number, diskOuter: number, diskOn: boolean): TraceResult {
  const a = Math.min(Math.max(spin, 0), 0.9999) * M_BHU
  const isco = kerrISCO(spin).pro
  const diskHits: DiskHit[] = []
  if (diskOn && rd.z !== 0) {
    const t = -ro.z / rd.z
    if (t > 0) {
      const xc = add(ro, scale(rd, t))
      const rc = len(xc)
      if (rc > isco && rc < diskOuter) {
        const g = kerrRedshift(rc, seedLamStraight(ro, rd, a), a)
        diskHits.push({ r: rc, azimuth: Math.atan2(xc.y, xc.x), g })
      }
    }
  }
  return { fate: 'escaped', finalDir: rd, diskHits }
}

/** λ for a straight (flat-space) ray hitting the disk — used by the straight trace. */
function seedLamStraight(ro: Vec3, rd: Vec3, a: number): number {
  // Flat-space approximation: reuse the ZAMO seed (a-term negligible at large b).
  return kerrSeed(ro, rd, a).lam
}

// ---------------------------------------------------------------------------
// Shadow outline (analytic critical curve → sky coordinates) for validation
// ---------------------------------------------------------------------------

export interface ShadowPoint {
  alpha: number
  beta: number
}

/**
 * Kerr shadow silhouette at observer inclination `i` (i = 0 pole-on, π/2
 * edge-on), as sky coordinates (α, β). `spin` = dimensionless â ∈ (0, 1).
 * Returns points tracing the D-shaped boundary (β ≥ 0 half; mirror in β).
 */
export function kerrShadowOutline(spin: number, inclination: number, samples = 64): ShadowPoint[] {
  const M = M_BHU
  // Schwarzschild limit: a perfect circle of radius b_crit = 3√3 M. The
  // r-parameterization below degenerates (λ → 0) as spin → 0, so special-case it.
  if (spin < 1e-3) {
    const bCrit = 3 * Math.sqrt(3) * M
    const pts: ShadowPoint[] = []
    for (let i = 0; i <= samples; i++) {
      const th = (i / samples) * Math.PI
      pts.push({ alpha: bCrit * Math.cos(th), beta: bCrit * Math.sin(th) })
    }
    return pts
  }
  const a = Math.min(Math.max(spin, 1e-4), 0.9999) * M
  // Photon-region endpoints (where the critical curve's η_c vanishes).
  const rpMin = 2 * M * (1 + Math.cos((2 / 3) * Math.acos(-spin)))
  const rpMax = 2 * M * (1 + Math.cos((2 / 3) * Math.acos(spin)))

  const sinI = Math.sin(inclination)
  const cosI = Math.cos(inclination)
  const cotI2 = (cosI * cosI) / Math.max(sinI * sinI, 1e-9)

  const pts: ShadowPoint[] = []
  for (let i = 0; i <= samples; i++) {
    const t = i / samples
    const r = rpMin + (rpMax - rpMin) * t
    const a2 = a * a
    const num = r * r * (r - 3 * M) + a2 * (r + M)
    const lam = num / (a * (M - r))
    const eta = (r * r * r * (4 * a2 * M - r * (r - 3 * M) * (r - 3 * M))) / (a2 * (r - M) * (r - M))

    const alpha = -lam / sinI
    const beta2 = eta + a2 * cosI * cosI - lam * lam * cotI2
    if (beta2 < 0) continue
    const beta = Math.sqrt(beta2)
    pts.push({ alpha, beta })
  }
  return pts
}
