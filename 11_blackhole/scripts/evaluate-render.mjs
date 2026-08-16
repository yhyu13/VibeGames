// Objective render-quality metrics for a swept set of screenshots, scored
// against a "path-tracing quality" bar. Reads render/sweep/ (or a given dir)
// and prints a scorecard per shot + a JSON report.
//
// Metrics:
//   banding  — long runs of identical 8-bit luma in the glow band (30..200).
//              A path tracer has NO banding; dither should push runs to ~1-3px.
//   noise    — local 3×3 std in the glow (dither grain ≈ 1 LSB; real noise is
//              higher / clumpier).
//   aliasing — Sobel edge histogram: "hard" 1px edges (max gradient) vs soft.
//              Our raymarcher is 1 sample/px, so edges are inherently hard.
//   range    — luma percentiles (shadow must be near-black, disk not clipped).
//   detail   — Shannon entropy of the luma histogram.
import { chromium } from 'playwright-core'
import { readdirSync, readFileSync, writeFileSync, existsSync } from 'node:fs'

const EXE = 'C:/Users/XINDONG/AppData/Local/ms-playwright/chromium-1234/chrome-win64/chrome.exe'
const DIR = process.argv[2] || 'render/sweep'
const OUT_JSON = process.argv[3] || `${DIR}/quality.json`

const files = existsSync(`${DIR}/manifest.json`)
  ? JSON.parse(readFileSync(`${DIR}/manifest.json`, 'utf8')).shots.map((s) => s.file)
  : readdirSync(DIR).filter((f) => f.endsWith('.png'))

const browser = await chromium.launch({ executablePath: EXE, headless: true, args: ['--no-sandbox'] })
const page = await browser.newPage()

async function measure(file) {
  const b64 = readFileSync(`${DIR}/${file}`, 'base64')
  return page.evaluate(async (b64) => {
    const img = new Image()
    await new Promise((res, rej) => { img.onload = res; img.onerror = rej; img.src = 'data:image/png;base64,' + b64 })
    const W = img.width, H = img.height
    const c = document.createElement('canvas'); c.width = W; c.height = H
    const x = c.getContext('2d', { willReadFrequently: true }); x.drawImage(img, 0, 0)
    const d = x.getImageData(0, 0, W, H).data
    const lum = new Float32Array(W * H)
    for (let i = 0; i < W * H; i++) lum[i] = (d[i * 4] + d[i * 4 + 1] + d[i * 4 + 2]) / 3

    // --- dynamic range + entropy -------------------------------------------
    const hist = new Uint32Array(256)
    for (let i = 0; i < W * H; i++) hist[Math.round(lum[i])]++
    const pct = (p) => {
      const t = (W * H) * p; let s = 0
      for (let v = 0; v < 256; v++) { s += hist[v]; if (s >= t) return v }
      return 255
    }
    let entropy = 0
    for (let v = 0; v < 256; v++) { const p = hist[v] / (W * H); if (p > 0) entropy -= p * Math.log2(p) }

    // --- banding: identical-luma runs in the glow band (30..200) -----------
    let runs8 = 0, runs20 = 0
    const count = (len) => { if (len >= 8) runs8++; if (len >= 20) runs20++ }
    for (let y = 0; y < H; y++) {
      let run = 0, prev = -1
      for (let xi = 0; xi < W; xi++) {
        const l = Math.round(lum[y * W + xi])
        if (l >= 30 && l <= 200 && l === prev) run++
        else { count(run); run = 1; prev = l }
      }
      count(run)
    }

    // --- noise: local 3×3 std in the glow band ------------------------------
    let sum = 0, sum2 = 0, n = 0
    for (let y = 1; y < H - 1; y++) {
      for (let xi = 1; xi < W - 1; xi++) {
        const l = lum[y * W + xi]
        if (l < 30 || l > 200) continue
        let m = 0
        for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) m += lum[(y + dy) * W + (xi + dx)]
        m /= 9
        const e = l - m
        sum += e; sum2 += e * e; n++
      }
    }
    const noise = n ? Math.sqrt(sum2 / n - (sum / n) ** 2) : 0

    // --- aliasing: Sobel gradient -------------------------------------------
    const sobel = (xi, y) => {
      const gx = -lum[(y - 1) * W + (xi - 1)] - 2 * lum[y * W + (xi - 1)] - lum[(y + 1) * W + (xi - 1)]
        + lum[(y - 1) * W + (xi + 1)] + 2 * lum[y * W + (xi + 1)] + lum[(y + 1) * W + (xi + 1)]
      const gy = -lum[(y - 1) * W + (xi - 1)] - 2 * lum[(y - 1) * W + xi] - lum[(y - 1) * W + (xi + 1)]
        + lum[(y + 1) * W + (xi - 1)] + 2 * lum[(y + 1) * W + xi] + lum[(y + 1) * W + (xi + 1)]
      return Math.sqrt(gx * gx + gy * gy)
    }
    let edgeSum = 0, edgeMax = 0, edgeHard = 0, edgeN = 0
    for (let y = 1; y < H - 1; y++) {
      for (let xi = 1; xi < W - 1; xi++) {
        const g = sobel(xi, y)
        edgeSum += g; edgeN++; if (g > edgeMax) edgeMax = g
        if (g > 64) edgeHard++
      }
    }

    return {
      range: { p01: pct(0.001), p1: pct(0.01), p50: pct(0.5), p99: pct(0.99), p999: pct(0.999) },
      banding: { runs8, runs20 },
      noise: +noise.toFixed(2),
      edge: { mean: +(edgeSum / edgeN).toFixed(2), max: +edgeMax.toFixed(1), hardPct: +(edgeHard / edgeN * 100).toFixed(2) },
      entropy: +entropy.toFixed(2),
    }
  }, b64)
}

const report = { dir: DIR, shots: [] }
console.log(`evaluating ${files.length} shots in ${DIR}/`)
console.log('')
console.log('shot                 band(≥8/≥20)  noiseσ  shadow  mid  disk  hardEdges  entropy')
console.log('─'.repeat(90))
for (const file of files) {
  const m = await measure(file)
  report.shots.push({ file, ...m })
  const { range: r, banding: b, noise, edge, entropy } = m
  const name = file.replace('.png', '').padEnd(20)
  console.log(`${name} ${String(b.runs8).padStart(5)}/${String(b.runs20).padStart(4)}   ${String(noise).padStart(6)}  ${String(r.p01).padStart(4)} ${String(r.p50).padStart(4)} ${String(r.p99).padStart(4)}   ${String(edge.hardPct).padStart(6)}%   ${String(entropy).padStart(6)}`)
}

writeFileSync(OUT_JSON, JSON.stringify(report, null, 2))
console.log(`\nsaved ${OUT_JSON}`)
await browser.close()
