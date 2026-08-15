// Headless smoke test: physics API + console errors + screenshots.
// Requires `playwright-core` and a Chromium at the path below. Run:
//   npm run dev        (in another terminal, port 5188)
//   node smoke/verify.mjs
import { chromium } from 'playwright-core'

const EXE = 'C:/Users/XINDONG/AppData/Local/ms-playwright/chromium-1234/chrome-win64/chrome.exe'
const URL = 'http://localhost:5188/'

const browser = await chromium.launch({
  executablePath: EXE,
  headless: true,
  args: ['--no-sandbox', '--disable-dev-shm-usage', '--use-angle=swiftshader', '--enable-webgl'],
})

const page = await browser.newPage({ viewport: { width: 1280, height: 720 } })

const consoleMsgs = []
page.on('console', (m) => {
  if (m.type() === 'error' || m.type() === 'warning') consoleMsgs.push(`[${m.type()}] ${m.text()}`)
})
page.on('pageerror', (e) => consoleMsgs.push(`[pageerror] ${e.message}`))

await page.goto(URL, { waitUntil: 'networkidle' })
await page.waitForTimeout(2500)

// ---- Physics probes (Schwarzschild regression + Kerr) ---------------------
const probes = await page.evaluate(() => {
  const b = window.__blackhole
  // Schwarzschild shadow edge: rays with b < b_crit ~2.598 must be captured.
  const edge = []
  for (const x of [0.5, 1.0, 2.0, 2.5, 2.6, 2.7, 3.0, 4.0]) {
    const r = b.tracePhoton({ x, y: 50, z: 0 }, { x: 0, y: -1, z: 0 }, 600, 24, false)
    edge.push({ b: x, fate: r.fate })
  }

  // Kerr shadow outline: symmetric at spin 0, D-shaped (asymmetric) at high spin.
  const outline = (spin) => {
    const pts = b.kerrShadowOutline(spin, Math.PI / 2, 64)
    const a = pts.map((p) => p.alpha)
    return { min: Math.min(...a), max: Math.max(...a), n: pts.length }
  }
  const s0 = outline(0)
  const s05 = outline(0.5)
  const s998 = outline(0.998)
  const iso = b.kerrISCO(0.998)
  const hor = b.kerrHorizons(0.5 * 0.5)
  return { edge, s0, s05, s998, iscoPro998: iso.pro, horOuter05: hor.outer }
})

// ---- Screenshots -----------------------------------------------------------
await page.evaluate(() => window.__store.getState().setParam('showDisk', false))
await page.waitForTimeout(600)
await page.screenshot({ path: 'smoke/shadow.png' }) // pure shadow against starfield (spin 0)

await page.evaluate(() => window.__store.getState().setParam('spin', 0.998))
await page.waitForTimeout(600)
await page.screenshot({ path: 'smoke/shadow-spin998.png' }) // D-shaped shadow at high spin

await page.evaluate(() => window.__store.getState().setParam('showDisk', true))
await page.waitForTimeout(800)
await page.screenshot({ path: 'smoke/showcase.png' }) // full image (spin 0.998 + dragged disk)

// ---- Pixel sample: confirm the render is not blank -------------------------
const buf = await page.screenshot({ type: 'png' })
const b64 = buf.toString('base64')
const stats = await page.evaluate(async (b64) => {
  const img = new Image()
  await new Promise((res, rej) => { img.onload = res; img.onerror = rej; img.src = 'data:image/png;base64,' + b64 })
  const c = document.createElement('canvas')
  c.width = img.width; c.height = img.height
  const ctx = c.getContext('2d', { willReadFrequently: true })
  ctx.drawImage(img, 0, 0)
  const lum = []
  for (let y = 90; y < img.height; y += 90) {
    for (let x = 90; x < img.width; x += 90) {
      const d = ctx.getImageData(x, y, 1, 1).data
      lum.push((d[0] + d[1] + d[2]) / 3)
    }
  }
  const avg = lum.reduce((a, b) => a + b, 0) / lum.length
  return { avg, max: Math.max(...lum), min: Math.min(...lum) }
}, b64)

// ---- Assertions -------------------------------------------------------------
let failures = 0
const check = (name, ok) => { if (!ok) { failures++; console.log(`  FAIL ${name}`) } else console.log(`  OK   ${name}`) }

console.log('=== CONSOLE (errors/warnings) ===')
console.log(consoleMsgs.length ? consoleMsgs.join('\n') : '(clean)')

console.log('=== PHYSICS ===')
check('Schwarzschild edge: b=2.5 captured', probes.edge.find((e) => e.b === 2.5).fate === 'captured')
check('Schwarzschild edge: b=2.6 escaped', probes.edge.find((e) => e.b === 2.6).fate === 'escaped')
check('Kerr shadow symmetric at spin 0', Math.abs(probes.s0.max + probes.s0.min) < 0.2)
check('Kerr shadow radius at spin 0 ≈ 2.598', Math.abs(probes.s0.max - 2.598) < 0.05)
check('Kerr shadow asymmetric at spin 0.998', Math.abs(probes.s998.max + probes.s998.min) > 0.5)
check('Kerr shadow D-shape (prograde flattened)', Math.abs(probes.s998.min) < Math.abs(probes.s998.max) - 0.3)
check('Kerr ISCO pro(0.998) ≈ 0.62 bhu', Math.abs(probes.iscoPro998 - 0.6185) < 0.05)
check('Kerr horizon outer(â=0.5) ≈ 0.933 bhu', Math.abs(probes.horOuter05 - 0.93301) < 1e-3)
console.log('  shadow spin0:', JSON.stringify(probes.s0), ' spin0.998:', JSON.stringify(probes.s998))

console.log('=== RENDER ===')
console.log('  pixel stats:', JSON.stringify(stats))
check('render not blank (avg brightness > 3)', stats.avg > 3)
check('render has contrast (max - min > 20)', stats.max - stats.min > 20)

console.log('saved smoke/shadow.png, smoke/shadow-spin998.png, smoke/showcase.png')
console.log(failures ? `\n${failures} FAILURES` : '\nSMOKE PASS')

await browser.close()
process.exit(failures ? 1 : 0)
