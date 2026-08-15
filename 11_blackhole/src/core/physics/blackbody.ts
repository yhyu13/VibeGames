/**
 * Blackbody temperature -> linear RGB (CPU reference; mirrors the GLSL
 * `blackbody()` function). Uses a Tanner-Helland-style fit over the
 * [1500 K, 40000 K] range so the disk reads white-hot inner -> warm outer.
 */

/** Normalise a kelvin temperature to a 0..1 curve coordinate. */
export function temp01(kelvin: number): number {
  const lo = 1500
  const hi = 40000
  const t = Math.min(Math.max(kelvin, lo), hi)
  const v = (Math.log(t) - Math.log(lo)) / (Math.log(hi) - Math.log(lo))
  return Math.min(Math.max(v, 0), 1)
}

/** Temperature (kelvin) -> linear RGB (approx blackbody, may exceed 1 in HDR use). */
export function blackbody(kelvin: number): { r: number; g: number; b: number } {
  const t = temp01(kelvin)
  let r: number
  let g: number
  let b: number

  r = t < 0.66 ? 1.0 : 1.0 - (t - 0.66) / 0.34
  g = t < 0.25 ? 0.2 + (0.8 * t) / 0.25 : 1.0
  b = t < 0.25 ? 0.0 : (t - 0.25) / 0.75

  return {
    r: Math.min(Math.max(r, 0), 1),
    g: Math.min(Math.max(g, 0), 1),
    b: Math.min(Math.max(b, 0), 1),
  }
}
