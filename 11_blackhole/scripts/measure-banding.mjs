// Measure residual 8-bit banding in a rendered PNG: count runs of identical
// luma level along horizontal + vertical scanlines, bucketed by luma band.
// A smooth gradient with proper TPDF dither should have runs of only 1–3 px;
// banding shows up as runs of 8+ px. Because the starfield floor (~17–22) and
// the shadow interior (~0) are legitimately flat, we report per-band so the
// glow band (30+) is separable from the starfield floor.
import { chromium } from 'playwright-core'

const EXE = 'C:/Users/XINDONG/AppData/Local/ms-playwright/chromium-1234/chrome-win64/chrome.exe'
const PNG = process.argv[2] || 'render/blackhole-4k.png'

const browser = await chromium.launch({ executablePath: EXE, headless: true, args: ['--no-sandbox'] })
const page = await browser.newPage()

const b64 = await (await import('node:fs/promises')).readFile(PNG, 'base64')
const res = await page.evaluate(async (b64) => {
  const img = new Image()
  await new Promise((res, rej) => { img.onload = res; img.onerror = rej; img.src = 'data:image/png;base64,' + b64 })
  const c = document.createElement('canvas')
  c.width = img.width; c.height = img.height
  const x = c.getContext('2d', { willReadFrequently: true })
  x.drawImage(img, 0, 0)
  const d = x.getImageData(0, 0, c.width, c.height).data
  const W = c.width, H = c.height
  const lum = (i) => (d[i * 4] + d[i * 4 + 1] + d[i * 4 + 2]) / 3

  // Per-band: [runLenBucket][lumaBand] = count
  const LEN = ['1-2', '3-4', '5-7', '8-19', '20-49', '50+']
  const BAND = [
    ['starfield', 3, 14],
    ['dark', 15, 29],
    ['glow', 30, 80],
    ['bright', 81, 200],
  ]
  const bandOf = (l) => {
    for (const [name, lo, hi] of BAND) if (l >= lo && l <= hi) return name
    return null
  }
  const counts = {} // `${band}:${len}` -> n
  const longest = []
  const addRun = (len, x, y, dir, l) => {
    if (len < 1) return
    const band = bandOf(l)
    if (!band) return
    const lenB = len <= 2 ? '1-2' : len <= 4 ? '3-4' : len <= 7 ? '5-7' : len <= 19 ? '8-19' : len <= 49 ? '20-49' : '50+'
    const k = `${band}:${lenB}`
    counts[k] = (counts[k] || 0) + 1
    longest.push({ len, x, y, dir, luma: +l.toFixed(1), band })
  }

  // Horizontal
  for (let y = 0; y < H; y++) {
    let run = 0, runStart = 0, runLuma = 0
    for (let xi = 0; xi <= W; xi++) {
      const l = xi < W ? lum(y * W + xi) : -1
      if (xi > 0 && xi < W && Math.round(l) === Math.round(runLuma)) run++
      else {
        if (run > 0) addRun(run, runStart, y, 'h', runLuma)
        run = 1; runStart = xi; runLuma = l
      }
    }
  }
  // Vertical
  for (let xi = 0; xi < W; xi++) {
    let run = 0, runStart = 0, runLuma = 0
    for (let y = 0; y <= H; y++) {
      const l = y < H ? lum(y * W + xi) : -1
      if (y > 0 && y < H && Math.round(l) === Math.round(runLuma)) run++
      else {
        if (run > 0) addRun(run, xi, runStart, 'v', runLuma)
        run = 1; runStart = y; runLuma = l
      }
    }
  }
  longest.sort((a, b) => b.len - a.len)
  return { W, H, counts, longest: longest.slice(0, 15) }
}, b64)

console.log(`image ${PNG} (${res.W}x${res.H})`)
console.log('run-length histogram (identical-luma runs) per band:')
const bands = ['starfield', 'dark', 'glow', 'bright']
const lens = ['1-2', '3-4', '5-7', '8-19', '20-49', '50+']
console.log('  ' + ['band'].concat(lens).join('\t'))
for (const b of bands) {
  const row = [b]
  for (const l of lens) row.push(String(res.counts[`${b}:${l}`] || 0))
  console.log('  ' + row.join('\t'))
}
// Summary: "banding score" = runs ≥8px in the glow+dark+bright bands (excl. starfield floor)
const score = (b) => lens.slice(3).reduce((s, l) => s + (res.counts[`${b}:${l}`] || 0), 0)
const totalScore = score('dark') + score('glow') + score('bright')
console.log(`\nbanding score (runs ≥8px, non-starfield): dark=${score('dark')} glow=${score('glow')} bright=${score('bright')} TOTAL=${totalScore}`)
console.log('longest flat runs (any band):')
for (const r of res.longest) console.log(`  len=${String(r.len).padStart(3)} luma=${String(r.luma).padStart(6)} band=${r.band.padEnd(9)} at (${r.x},${r.y}) ${r.dir}`)
await browser.close()
