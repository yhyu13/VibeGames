// Screenshot the black hole from a set of meaningful camera angles, saving each
// to render/sweep/<name>.png plus a manifest.json with the shot metadata.
//
// Default sweep = canonical Kerr angles: near-edge-on (Gargantua lensed ring,
// D-shaped shadow, Doppler asymmetry) through 3/4 to face-on (symmetric shadow,
// full disk), plus a spin sweep at the iconic edge-on angle. Override with a
// custom manifest:
//   node scripts/screenshot-sweep.mjs --manifest my-shots.json
//   node scripts/screenshot-sweep.mjs --dsf 1            # 1080p (faster)
//
// Requires the dev server on port 5188 (npm run dev).
import { chromium } from 'playwright-core'
import { mkdirSync, writeFileSync } from 'node:fs'

const EXE = 'C:/Users/XINDONG/AppData/Local/ms-playwright/chromium-1234/chrome-win64/chrome.exe'
const URL = 'http://localhost:5188/'
const OUT_DIR = 'render/sweep'

// --- CLI args ---------------------------------------------------------------
const args = process.argv.slice(2)
const arg = (k, d) => {
  const i = args.indexOf(k)
  return i >= 0 ? args[i + 1] : d
}
const DSF = Number(arg('--dsf', 2)) // device scale factor (2 = 4K)
const MANIFEST = arg('--manifest', null)

// --- Canonical Kerr sweep (tilt = polar angle above the disk plane, rad) ----
// tilt 0.05 ≈ 2.9° = near-edge-on; tilt π/2 ≈ 90° = face-on (spin axis).
const FIXED = { dist: 14, steps: 512, bloomStrength: 1.2, exposure: 1.15, diskBrightness: 1.5, diskTempK: 5500 }
const DEFAULT_SHOTS = [
  // Edge-on regime — lensing + Doppler asymmetry dominant (the "Gargantua" look)
  { name: 'edge-03deg', tilt: 0.05, spin: 0.998 },
  { name: 'edge-09deg', tilt: 0.15, spin: 0.998 },
  { name: 'edge-17deg', tilt: 0.3, spin: 0.998 },
  { name: 'edge-29deg', tilt: 0.5, spin: 0.998 },
  // 3/4 regime — disk opens up, lensing still visible
  { name: '3q-40deg', tilt: 0.7, spin: 0.998 },
  { name: '3q-57deg', tilt: 1.0, spin: 0.998 },
  // Face-on regime — symmetric shadow, full face-on disk
  { name: 'face-80deg', tilt: 1.4, spin: 0.998 },
  { name: 'face-89deg', tilt: 1.55, spin: 0.998 },
  // Spin sweep at the iconic edge-on angle (frame-dragging D-shape)
  { name: 'edge-spin0', tilt: 0.05, spin: 0.0 },
  { name: 'edge-spin05', tilt: 0.05, spin: 0.5 },
  { name: 'edge-spin09', tilt: 0.05, spin: 0.9 },
]

function loadShots() {
  if (MANIFEST) {
    const raw = JSON.parse(require('node:fs').readFileSync(MANIFEST, 'utf8'))
    return raw.shots ?? raw
  }
  return DEFAULT_SHOTS
}

const shots = loadShots().map((s) => ({ ...FIXED, ...s }))

async function launch(swiftShader) {
  const args = ['--no-sandbox', '--disable-dev-shm-usage', '--enable-webgl']
  if (swiftShader) args.push('--use-angle=swiftshader')
  return chromium.launch({ executablePath: EXE, headless: true, args })
}

let browser = await launch(false)
let page = await browser.newPage({ viewport: { width: 1920, height: 1080 }, deviceScaleFactor: DSF })
await page.goto(URL, { waitUntil: 'networkidle' })
await page.waitForFunction(() => window.__scene && window.__store, null, { timeout: 10000 })

// Baseline quality params (frozen camera, max steps)
await page.evaluate(() => {
  const s = window.__store.getState()
  s.setParam('autoOrbit', false)
  s.setParam('steps', 512)
})

mkdirSync(OUT_DIR, { recursive: true })
const manifest = { deviceScaleFactor: DSF, viewport: [1920, 1080], fixed: FIXED, shots: [] }

for (const shot of shots) {
  const { name, tilt, spin, dist } = shot
  await page.evaluate(({ tilt, spin, dist }) => {
    const s = window.__store.getState()
    s.setParam('spin', spin)
    window.__scene.setCameraPose(dist, tilt)
  }, { tilt, spin, dist })
  await page.waitForTimeout(1400) // let the raymarcher + bloom settle at the new angle

  const buf = await page.screenshot({ type: 'png' })
  const file = `${name}.png`
  writeFileSync(`${OUT_DIR}/${file}`, buf)

  // brightness guard (blank → swiftshader fallback)
  const avg = await page.evaluate(async (b64) => {
    const img = new Image()
    await new Promise((res, rej) => { img.onload = res; img.onerror = rej; img.src = 'data:image/png;base64,' + b64 })
    const c = document.createElement('canvas'); c.width = 64; c.height = 36
    const x = c.getContext('2d'); x.drawImage(img, 0, 0, 64, 36)
    const d = x.getImageData(0, 0, 64, 36).data
    let sum = 0; for (let i = 0; i < d.length; i += 4) sum += (d[i] + d[i + 1] + d[i + 2]) / 3
    return sum / (d.length / 4)
  }, buf.toString('base64'))

  manifest.shots.push({ name, file, tiltRad: tilt, tiltDeg: +(tilt * 180 / Math.PI).toFixed(1), spin, dist, avgLuma: +avg.toFixed(2) })
  console.log(`  [${name}] tilt ${(tilt * 180 / Math.PI).toFixed(1)}° spin ${spin} → avg ${avg.toFixed(2)}`)
}

writeFileSync(`${OUT_DIR}/manifest.json`, JSON.stringify(manifest, null, 2))
console.log(`\nsaved ${shots.length} shots → ${OUT_DIR}/ + manifest.json`)
await browser.close()
