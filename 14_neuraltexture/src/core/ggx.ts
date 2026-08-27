/**
 * Cook-Torrance GGX + Lambert teacher. Same equations live in the WGSL shader.
 * Returns f_r * n·l  (the lighting integrand, not a unit-energy BRDF dump).
 */
import type { Surface, Vec3 } from './types'
import { add, dot, mul3, saturate, scale } from './vec3'

const PI = Math.PI
const MIN_R = 0.04

export function F0(albedo: Vec3, metallic: number): Vec3 {
  return [
    mixScalar(MIN_R, albedo[0], metallic),
    mixScalar(MIN_R, albedo[1], metallic),
    mixScalar(MIN_R, albedo[2], metallic),
  ]
}

function mixScalar(a: number, b: number, t: number): number {
  return a + (b - a) * t
}

export function D_GGX(nDotH: number, a: number): number {
  const a2 = a * a
  const d = nDotH * nDotH * (a2 - 1) + 1
  return a2 / (PI * d * d)
}

export function G_Smith(nDotV: number, nDotL: number, a: number): number {
  const k = (a + 1) * (a + 1) / 8
  const gv = nDotV / (nDotV * (1 - k) + k)
  const gl = nDotL / (nDotL * (1 - k) + k)
  return gv * gl
}

export function fresnelSchlick(vDotH: number, f0: Vec3): Vec3 {
  const p = Math.pow(saturate(1 - vDotH), 5)
  return [
    f0[0] + (1 - f0[0]) * p,
    f0[1] + (1 - f0[1]) * p,
    f0[2] + (1 - f0[2]) * p,
  ]
}

/**
 * Shade a local-frame sample. n = +Z. wi/wo are unit vectors in that frame.
 * Returns RGB radiance contribution for a white directional light of intensity 1
 * (caller multiplies by light color). Includes n·l.
 */
export function evalTeacher(s: Surface, wi: Vec3, wo: Vec3): Vec3 {
  const nDotL = saturate(wi[2])
  const nDotV = saturate(wo[2])
  if (nDotL <= 1e-4 || nDotV <= 1e-4) return [0, 0, 0]

  const h = [
    wi[0] + wo[0],
    wi[1] + wo[1],
    wi[2] + wo[2],
  ] as Vec3
  const hLen = Math.hypot(h[0], h[1], h[2])
  if (hLen < 1e-8) return [0, 0, 0]
  const hn: Vec3 = [h[0] / hLen, h[1] / hLen, h[2] / hLen]
  const nDotH = saturate(hn[2])
  const vDotH = saturate(dot(wo, hn))

  const a = Math.max(s.roughness * s.roughness, 1e-4)
  const f0 = F0(s.albedo, s.metallic)
  const D = D_GGX(nDotH, a)
  const G = G_Smith(nDotV, nDotL, a)
  const F = fresnelSchlick(vDotH, f0)
  const specDenom = 4 * nDotV * nDotL + 1e-4
  const spec: Vec3 = [
    D * G * F[0] / specDenom,
    D * G * F[1] / specDenom,
    D * G * F[2] / specDenom,
  ]

  const kd: Vec3 = [
    (1 - F[0]) * (1 - s.metallic),
    (1 - F[1]) * (1 - s.metallic),
    (1 - F[2]) * (1 - s.metallic),
  ]
  const diffuse = scale(mul3(kd, s.albedo), 1 / PI)
  return scale(add(diffuse, spec), nDotL)
}

/** Shade with an explicit light color (RGB intensity). */
export function shadeTeacher(s: Surface, wi: Vec3, wo: Vec3, light: Vec3): Vec3 {
  const r = evalTeacher(s, wi, wo)
  return [r[0] * light[0], r[1] * light[1], r[2] * light[2]]
}
