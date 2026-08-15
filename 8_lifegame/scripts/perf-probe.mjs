// Performance probe — startup latency + animation frame timing + long tasks.
// Closes the "性能 60fps / 启动 ≤1s" dimension of the perfect definition that Day 1 never measured.
// Run from 8_lifegame/:  npm exec --offline --yes --package=playwright -- node scripts/perf-probe.mjs
import { delimiter, join, resolve } from 'node:path'
import { createRequire } from 'node:module'

const binDir = process.env.PATH.split(delimiter).find((e) => e.includes(`${delimiter === ';' ? '\\' : '/'}_npx${delimiter === ';' ? '\\' : '/'}`))
if (!binDir) throw new Error('npm exec did not expose its cached Playwright package')
const require = createRequire(join(resolve(binDir, '..'), 'noop.js'))
const { chromium } = require('playwright')

const fails = []
const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1366, height: 860 } })
page.on('console', (m) => { if (m.type() === 'error') fails.push('console: ' + m.text()) })
page.on('pageerror', (e) => fails.push('pageerror: ' + String(e)))

// ---- 1. startup latency: goto → opening title fully faded in (interactive) ----
const t0 = Date.now()
await page.goto('http://localhost:5185/', { waitUntil: 'domcontentloaded' })
await page.waitForFunction(() => {
  const el = document.querySelector('.opening-title')
  return el && getComputedStyle(el).opacity === '1'
}, { timeout: 10000 })
const startupMs = Date.now() - t0

// ---- 1.5 idle rAF baseline: headless chromium has no real vsync, so raw frame
// intervals are inflated by compositor pacing — measure the opening screen's own
// pacing first and only treat the dice window as janky if it is *worse* than idle. ----
const idleFrames = await page.evaluate(() => new Promise((res) => {
  const f = []; let last = performance.now()
  const loop = (t) => { f.push(t - last); last = t; if (f.length < 120) requestAnimationFrame(loop); else res(f) }
  requestAnimationFrame(loop)
}))
const idleSorted = [...idleFrames].sort((a, b) => a - b)
const idleP95 = idleSorted[Math.floor(idleSorted.length * 0.95)] ?? idleSorted[idleSorted.length - 1] ?? 0

// ---- 2. long tasks (>50ms main-thread blocks) via PerformanceObserver ---------
await page.evaluate(() => {
  window.__longTasks = []
  if ('PerformanceObserver' in window) {
    const po = new PerformanceObserver((list) => {
      for (const e of list.getEntries()) window.__longTasks.push(Math.round(e.duration))
    })
    po.observe({ entryTypes: ['longtask'] })
  }
})

// ---- 3. drive to the dice tumble (heaviest animation) and record rAF frames ---
await page.click('button:has-text("接下来")')
await page.click('button:has-text("走进校园")')
await page.waitForTimeout(400)
await page.locator('.building:has-text("宿舍")').click()
await page.waitForTimeout(950)
await page.evaluate(() => {
  window.__frames = []
  let last = performance.now()
  const loop = (t) => {
    window.__frames.push(t - last)
    last = t
    if (window.__frames.length < 260) requestAnimationFrame(loop)
  }
  requestAnimationFrame(loop)
})
await page.click('button:has-text("掷骰子")')
// tumble + formula type-in ≈2.5s; wait for the dice result to settle (继续 button appears).
await page.waitForSelector('button:has-text("继续")', { state: 'visible', timeout: 10000 })
await page.waitForTimeout(400)
const frames = await page.evaluate(() => window.__frames)
const long = await page.evaluate(() => window.__longTasks || [])

// ---- report -------------------------------------------------------------------
const s = [...frames].sort((a, b) => a - b)
const avg = frames.length ? frames.reduce((a, b) => a + b, 0) / frames.length : 0
const p95 = s[Math.floor(s.length * 0.95)] ?? s[s.length - 1] ?? 0
const max = s[s.length - 1] ?? 0
const dropped = frames.filter((f) => f > 33.4).length
const longTasks = long.filter((d) => d > 50)

console.log(`startup: ${startupMs}ms (budget 1000ms)`)
console.log(`idle rAF: avg=${(idleFrames.reduce((a, b) => a + b, 0) / idleFrames.length).toFixed(1)}ms p95=${idleP95.toFixed(1)}ms (headless baseline)`)
console.log(`frames: n=${frames.length} avg=${avg.toFixed(1)}ms p95=${p95.toFixed(1)}ms max=${max.toFixed(1)}ms dropped(>33.4ms)=${dropped}`)
console.log(`long tasks (>50ms): ${longTasks.length}` + (longTasks.length ? ` [${longTasks.join(',')}ms]` : ''))

await browser.close()

// ---- gates --------------------------------------------------------------------
// Frame gate is calibrated: the dice window must be no worse than the idle baseline
// (headless rAF is inflated by compositor pacing), with a floor of 33.4ms (true 30fps).
const frameBudget = Math.max(33.4, idleP95 * 1.25)
if (startupMs > 1000) fails.push(`startup ${startupMs}ms exceeds 1000ms budget`)
if (frames.length && p95 > frameBudget) fails.push(`p95 frame ${p95.toFixed(1)}ms exceeds budget ${frameBudget.toFixed(1)}ms (idle ${idleP95.toFixed(1)}ms)`)
if (longTasks.length) fails.push(`${longTasks.length} long tasks >50ms: [${longTasks.join(',')}ms]`)

if (fails.length) {
  console.error('PERF FAILURES:\n' + fails.join('\n'))
  process.exit(1)
}
console.log('OK — performance probe passed (startup ≤1s, no sustained frame drops, no >50ms long tasks)')
