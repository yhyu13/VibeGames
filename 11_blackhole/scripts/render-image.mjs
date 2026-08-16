// Best-quality single-frame render: max geodesic steps + high spin + 4K.
import { chromium } from 'playwright-core'
import { mkdirSync } from 'node:fs'

const EXE = 'C:/Users/XINDONG/AppData/Local/ms-playwright/chromium-1234/chrome-win64/chrome.exe'
const URL = 'http://localhost:5188/'
const OUT = 'render/blackhole-4k.png'
mkdirSync('render', { recursive: true })

// Try hardware GPU first (fast); fall back to swiftshader if the render is blank.
async function shot(swiftShader) {
  const args = ['--no-sandbox', '--disable-dev-shm-usage', '--enable-webgl']
  if (swiftShader) args.push('--use-angle=swiftshader')
  const browser = await chromium.launch({ executablePath: EXE, headless: true, args })
  const ctx = await browser.newContext({ viewport: { width: 1920, height: 1080 }, deviceScaleFactor: 2 })
  const page = await ctx.newPage()
  await page.goto(URL, { waitUntil: 'networkidle' })
  await page.waitForTimeout(1500)

  // Best-quality params: max steps, extreme spin, frozen camera.
  await page.evaluate(() => {
    const s = window.__store.getState()
    s.setParam('spin', 0.998)
    s.setParam('steps', 512)
    s.setParam('autoOrbit', false)
    s.setParam('bloomStrength', 1.2)
    s.setParam('exposure', 1.15)
    s.setParam('diskBrightness', 1.5)
    s.setParam('diskTempK', 5500)
  })
  await page.waitForTimeout(2500) // several frames for bloom + stable ray marching

  const buf = await page.screenshot({ type: 'png' })
  const b64 = buf.toString('base64')
  // brightness check
  const stats = await page.evaluate(async (b64) => {
    const img = new Image()
    await new Promise((res, rej) => { img.onload = res; img.onerror = rej; img.src = 'data:image/png;base64,' + b64 })
    const c = document.createElement('canvas'); c.width = img.width; c.height = img.height
    const x = c.getContext('2d', { willReadFrequently: true }); x.drawImage(img, 0, 0)
    const d = x.getImageData(0, 0, c.width, c.height).data
    let sum = 0; for (let i = 0; i < d.length; i += 40) sum += d[i] + d[i+1] + d[i+2]
    return { w: img.width, h: img.height, avg: sum / (d.length / 40 * 3) }
  }, b64)
  await browser.close()
  return { buf, b64, stats }
}

let result = await shot(false)
if (result.stats.avg < 2) { // blank → software fallback
  console.log('hardware blank (avg ' + result.stats.avg.toFixed(2) + '), falling back to swiftshader')
  result = await shot(true)
}
await (await import('node:fs/promises')).writeFile(OUT, result.buf)
console.log('saved', OUT, result.stats.w + 'x' + result.stats.h, 'avg luma', result.stats.avg.toFixed(2))
