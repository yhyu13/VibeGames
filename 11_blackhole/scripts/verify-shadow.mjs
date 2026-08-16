// Objective physics check: compare the analytic Kerr shadow silhouette
// (kerrShadowOutline) at edge-on high-spin (should be D-shaped) vs spin-0
// (should be a perfect circle). Confirms the D-shape asymmetry is present.
import { chromium } from 'playwright-core'
const EXE = 'C:/Users/XINDONG/AppData/Local/ms-playwright/chromium-1234/chrome-win64/chrome.exe'
const browser = await chromium.launch({ executablePath: EXE, headless: true, args: ['--no-sandbox'] })
const page = await browser.newPage()
await page.goto('http://localhost:5188/', { waitUntil: 'networkidle' })
await page.waitForFunction(() => window.__blackhole, null, { timeout: 10000 })
const res = await page.evaluate(() => {
  const bh = window.__blackhole
  function extents(spin, inc) {
    const pts = bh.kerrShadowOutline(spin, inc, 128).filter(Boolean)
    let amin = Infinity, amax = -Infinity, bmax = -Infinity
    for (const p of pts) { amin = Math.min(amin, p.alpha); amax = Math.max(amax, p.alpha); bmax = Math.max(bmax, p.beta) }
    return { amin: +amin.toFixed(3), amax: +amax.toFixed(3), bmax: +bmax.toFixed(3), width: +(amax-amin).toFixed(3) }
  }
  return {
    spin0_edge: extents(0, 1.55),
    spin998_edge: extents(0.998, 1.55),
    spin998_face: extents(0.998, 0.05),
    isco: { spin0: +bh.kerrISCO(0).pro.toFixed(3), spin998: +bh.kerrISCO(0.998).pro.toFixed(3) },
  }
})
console.log(JSON.stringify(res, null, 2))
await browser.close()
