/**
 * Kerr physics anchor validation (CPU reference vs analytic results).
 * Run: npx tsx scripts/kerr-validate.ts
 */
import {
  kerrHorizons,
  kerrISCO,
  kerrKeplerianOmega,
  kerrUt,
  kerrRedshift,
  kerrSeed,
  kerrTracePhoton,
  kerrShadowOutline,
} from '../src/core/physics/kerr'
import { v3, norm } from '../src/core/physics/geodesics'

let failures = 0
function check(name: string, got: number, want: number, tol = 1e-3): void {
  const ok = Math.abs(got - want) <= tol * Math.max(1, Math.abs(want))
  if (!ok) failures++
  console.log(`${ok ? '  OK' : 'FAIL'}  ${name}: got ${got.toFixed(5)} want ${want.toFixed(5)}`)
}

console.log('== geometry (bhu, r_s=1) ==')
const h0 = kerrHorizons(0)
check('horizon outer a=0 (=1)', h0.outer, 1)
check('horizon inner a=0 (=0)', h0.inner, 0)
const a05 = 0.5 * 0.5 // a = â·M = 0.5·0.5 = 0.25
const h05 = kerrHorizons(a05)
check('horizon outer a=0.5', h05.outer, 0.5 + Math.sqrt(0.25 - 0.0625))
check('horizon inner a=0.5', h05.inner, 0.5 - Math.sqrt(0.25 - 0.0625))

console.log('\n== ISCO (bhu) ==')
const i0 = kerrISCO(0)
check('ISCO pro a=0 (=3)', i0.pro, 3)
check('ISCO retro a=0 (=3)', i0.retro, 3)
const i05 = kerrISCO(0.5)
check('ISCO pro a=0.5 (=4.233M=2.1165)', i05.pro, 4.233 * 0.5, 1e-2)
check('ISCO retro a=0.5 (=7.555M=3.7773)', i05.retro, 7.555 * 0.5, 1e-2)
const i0998 = kerrISCO(0.998)
console.log(`  (spin 0.998: pro=${i0998.pro.toFixed(4)}, retro=${i0998.retro.toFixed(4)})`)

console.log('\n== Keplerian disk (a=0 Schwarzschild limit) ==')
check('Ω(a=0,r=3)=√(M/r³)', kerrKeplerianOmega(3, 0), Math.sqrt(0.5 / 27))
check('u^t(a=0,r=3)=√2', kerrUt(3, 0), Math.SQRT2)

console.log('\n== shadow capture threshold (bhu) ==')
// Shoot equatorial rays from (30,0,0) toward origin with y-offset = impact param.
// Bisect the captured→escaped boundary (fate is monotonic: captured for small |λ|).
function captureEdge(spin: number, sign: number): number {
  let lo = 0
  let hi = 5
  for (let i = 0; i < 40; i++) {
    const mid = 0.5 * (lo + hi)
    const ro = v3(30, 0, 0)
    const rd = norm(v3(-30, sign * mid, 0))
    const res = kerrTracePhoton(ro, rd, spin, 512, 24, false)
    if (res.fate === 'captured') lo = mid
    else hi = mid
  }
  return 0.5 * (lo + hi)
}
function scan(spin: number, label: string): void {
  const pro = captureEdge(spin, +1)
  const ret = captureEdge(spin, -1)
  console.log(`  ${label}: prograde λ_c≈${pro.toFixed(3)}, retrograde λ_c≈${ret.toFixed(3)}`)
}
scan(0, 'a=0 ')
scan(0.5, 'a=0.5')
scan(0.9, 'a=0.9')
// a=0 must match Schwarzschild b_crit = 3√3/2 ≈ 2.598
check('a=0 capture edge (=2.598)', captureEdge(0, +1), (3 * Math.sqrt(3)) / 2, 2e-2)

console.log('\n== analytic shadow outline ==')
const out = kerrShadowOutline(0.5, Math.PI / 2, 32)
const alphaMin = Math.min(...out.map((p) => p.alpha))
const alphaMax = Math.max(...out.map((p) => p.alpha))
console.log(`  a=0.5 edge-on: α ∈ [${alphaMin.toFixed(3)}, ${alphaMax.toFixed(3)}] (asymmetric → D-shape)`)

console.log('\n== disk crossing smoke ==')
const roD = v3(0, 4, 8) // above the disk (z=8), looking down-ish
const rdD = norm(v3(0, -0.2, -1))
const hit = kerrTracePhoton(roD, rdD, 0.5, 256, 24, true)
console.log(`  fate=${hit.fate}, diskHits=${hit.diskHits.length}`)
if (hit.diskHits.length > 0) {
  const d = hit.diskHits[0]
  console.log(`  first hit r=${d.r.toFixed(3)}, azimuth=${d.azimuth.toFixed(3)}, g=${d.g.toFixed(3)}`)
}

console.log(`\n${failures === 0 ? 'ALL ANCHORS PASS' : failures + ' FAILURES'}`)
process.exit(failures === 0 ? 0 : 1)
