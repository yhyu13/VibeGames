/**
 * Intro-scene SVBRDF: night ceramic with kintsugi gold veins and matte clay islands.
 * Closed-form sines only — CPU and WGSL share the same formulas.
 */
import type { Latent8, Surface, Vec2 } from './types'
import { mix, mix3, saturate } from './vec3'

function smoothstep(edge0: number, edge1: number, x: number): number {
  const t = saturate((x - edge0) / (edge1 - edge0))
  return t * t * (3 - 2 * t)
}

/** Gold-vein mask ∈ [0,1]. Tight ridges = kintsugi. */
export function veinMask(u: number, v: number): number {
  const s = Math.abs(
    Math.sin(u * 22 + Math.sin(v * 9) * 1.4) * Math.cos(v * 17 + u * 3),
  )
  return smoothstep(0.14, 0.025, s)
}

/** Clay-island mask ∈ [0,1]. Broad blobs of matte body. */
export function clayMask(u: number, v: number): number {
  const n = 0.5 + 0.5 * Math.sin(u * 6.5) * Math.sin(v * 5.2 + u * 2.1)
  return smoothstep(0.28, 0.72, n)
}

const INK: [number, number, number] = [0.035, 0.028, 0.032]
const GOLD: [number, number, number] = [0.78, 0.52, 0.14]
const CLAY: [number, number, number] = [0.22, 0.12, 0.07]

export function materialAt(uv: Vec2): Surface {
  const u = uv[0]
  const v = uv[1]
  const vein = veinMask(u, v)
  const clay = clayMask(u, v) * (1 - vein)

  let albedo = mix3(INK, GOLD, vein)
  albedo = mix3(albedo, CLAY, clay * 0.85)

  // Glaze is sharp (0.07); clay is dusty (0.72); gold is polished metal (0.18).
  const roughness = mix(0.07, 0.72, clay) * mix(1, 0.22, vein)
  const metallic = vein * 0.96

  return { albedo, roughness: saturate(roughness), metallic: saturate(metallic) }
}

/**
 * Fixed encoder: pack the teacher surface into 8-D latent.
 * Runtime decoder never sees albedo/roughness/metallic names — only these codes.
 */
export function encodeLatent(s: Surface): Latent8 {
  const gloss = 1 - s.roughness
  const clayish = saturate((s.roughness - 0.3) * (1 - s.metallic) * 1.6)
  return [
    s.albedo[0],
    s.albedo[1],
    s.albedo[2],
    s.roughness,
    s.metallic,
    s.albedo[0] * s.metallic,
    gloss,
    clayish,
  ]
}
