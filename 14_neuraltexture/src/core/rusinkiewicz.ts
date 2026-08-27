/**
 * Rusinkiewicz half/difference parameterization (1998).
 * Course step 03: decoder sees (wh, wd) instead of (wi, wo).
 */
import { MIN_COS } from './constants'
import type { Vec3 } from './types'
import { cross, dot, normalize } from './vec3'

export interface HalfDiff {
  wh: Vec3
  wd: Vec3
}

/**
 * Rotate wi into the half-vector frame.
 * Slang from neural-shading-s26 step 03:
 *   v  = float3(wh.y, -wh.x, 0)
 *   wd = wi * wh.z + cross(v, wi) + dot(v, wi) * v / (1 + wh.z)
 */
export function rusinkiewicz(wi: Vec3, wo: Vec3): HalfDiff {
  const wh = normalize([wi[0] + wo[0], wi[1] + wo[1], wi[2] + wo[2]])
  const v: Vec3 = [wh[1], -wh[0], 0]
  const denom = Math.max(1 + wh[2], 1e-6)
  const dv = dot(v, wi)
  const cx = cross(v, wi)
  const wd: Vec3 = [
    wi[0] * wh[2] + cx[0] + dv * v[0] / denom,
    wi[1] * wh[2] + cx[1] + dv * v[1] / denom,
    wi[2] * wh[2] + cx[2] + dv * v[2] / denom,
  ]
  return { wh, wd }
}

/** Uniform sample of the upper hemisphere (local +Z). */
export function sampleHemisphere(u1: number, u2: number): Vec3 {
  const z = Math.max(u1, MIN_COS)
  const r = Math.sqrt(Math.max(0, 1 - z * z))
  const phi = 2 * Math.PI * u2
  return [r * Math.cos(phi), r * Math.sin(phi), z]
}

/**
 * Uniform Rusinkiewicz (θh, θd, φh, φd) → (wi, wo).
 * Matches course step 02/03: angles in [0, π/2] × [0, 2π].
 */
export function sampleRusinkiewicz(
  u1: number, u2: number, u3: number, u4: number,
): { wi: Vec3, wo: Vec3 } | null {
  const th = u1 * (Math.PI / 2)
  const td = u2 * (Math.PI / 2)
  const ph = u3 * Math.PI * 2
  const pd = u4 * Math.PI * 2

  const sinTh = Math.sin(th)
  const cosTh = Math.cos(th)
  const sinTd = Math.sin(td)
  const cosTd = Math.cos(td)

  // wh in local n=+Z
  const wh: Vec3 = [
    sinTh * Math.cos(ph),
    sinTh * Math.sin(ph),
    cosTh,
  ]
  // wd in half-vector frame, then reconstruct wi/wo
  const wdLocal: Vec3 = [
    sinTd * Math.cos(pd),
    sinTd * Math.sin(pd),
    cosTd,
  ]

  // Build orthonormal frame around wh.
  const t: Vec3 = Math.abs(wh[2]) < 0.999
    ? normalize([-wh[1], wh[0], 0])
    : [1, 0, 0]
  const b = cross(wh, t)
  const wd: Vec3 = [
    t[0] * wdLocal[0] + b[0] * wdLocal[1] + wh[0] * wdLocal[2],
    t[1] * wdLocal[0] + b[1] * wdLocal[1] + wh[1] * wdLocal[2],
    t[2] * wdLocal[0] + b[2] * wdLocal[1] + wh[2] * wdLocal[2],
  ]
  const wi = wd
  const wo: Vec3 = [
    2 * dot(wh, wi) * wh[0] - wi[0],
    2 * dot(wh, wi) * wh[1] - wi[1],
    2 * dot(wh, wi) * wh[2] - wi[2],
  ]
  if (wi[2] <= MIN_COS || wo[2] <= MIN_COS) return null
  return { wi: normalize(wi), wo: normalize(wo) }
}
