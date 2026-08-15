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

// Shadow edge: rays with b < b_crit ~2.598 must be captured, above must escape.
const probes = await page.evaluate(() => {
  const b = window.__blackhole
  const out = []
  for (const x of [0.5, 1.0, 2.0, 2.5, 2.6, 2.7, 3.0, 4.0]) {
    const r = b.tracePhoton({ x, y: 50, z: 0 }, { x: 0, y: -1, z: 0 }, 600, 24, false)
    out.push({ b: x, fate: r.fate })
  }
  const isco = b.orbitalSpeedC(3)
  return { probes: out, iscoSpeedC: isco, constants: b.constants }
})

// Screenshots
await page.evaluate(() => window.__store.getState().setParam('showDisk', false))
await page.waitForTimeout(600)
await page.screenshot({ path: 'smoke/shadow.png' }) // pure shadow against starfield

await page.evaluate(() => window.__store.getState().setParam('showDisk', true))
await page.waitForTimeout(600)
await page.screenshot({ path: 'smoke/showcase.png' }) // full image

console.log('=== CONSOLE (errors/warnings) ===')
console.log(consoleMsgs.length ? consoleMsgs.join('\n') : '(clean)')
console.log('=== PHYSICS ===')
console.log(JSON.stringify(probes, null, 2))
console.log('saved smoke/shadow.png, smoke/showcase.png')

await browser.close()
