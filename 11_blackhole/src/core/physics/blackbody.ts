/**
 * Blackbody temperature -> sRGB (0..1) via the Tanner–Helland fit, mirroring
 * the GLSL `blackbody()` in shaders/blackhole.ts. Range [1000 K, 40000 K]:
 * 1000 K deep red → 5500 K warm white → 10000 K blue-white (no cyan artifact).
 */

function clamp01(v: number): number {
  return Math.min(Math.max(v, 0), 1)
}

/** Temperature (kelvin) -> sRGB (0..1) approximating a blackbody spectrum. */
export function blackbody(kelvin: number): { r: number; g: number; b: number } {
  const t = Math.min(Math.max(kelvin, 1000), 40000) / 100

  let r: number
  let g: number
  let b: number

  r = t <= 66 ? 255 : 329.698727446 * Math.pow(t - 60, -0.1332047592)

  g = t <= 66 ? 99.4708025861 * Math.log(t) - 161.1195681661 : 288.1221695283 * Math.pow(t - 60, -0.0755148492)

  b = t >= 66 ? 255 : t <= 19 ? 0 : 138.5177312231 * Math.log(t - 10) - 305.0447927307

  return { r: clamp01(r / 255), g: clamp01(g / 255), b: clamp01(b / 255) }
}
