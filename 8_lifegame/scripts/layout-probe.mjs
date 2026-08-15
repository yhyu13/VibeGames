// Layout-geometry audit: walk every distinct intro-scene beat and flag per-element
// defects that a document-level overflow check misses — silent text clipping, ellipsis
// truncation without an accessible title, vertical clipping, interactive elements pushed
// offscreen, and unreadable font sizes. Complements observe-runtime.mjs (document-level
// scrollWidth only) and contrast-probe.mjs (color only). The pixel-level "eyeball the
// screenshot" pass is impossible in this headless/text-only env, so DOM geometry is the
// objective proxy: any content that scrolls past its clip box is content a player can't see.
// Run from 8_lifegame/:  npm exec --offline --yes --package=playwright -- node scripts/layout-probe.mjs
import { delimiter, join, resolve } from 'node:path'
import { createRequire } from 'node:module'

const binDir = process.env.PATH.split(delimiter).find((e) => e.includes(`${delimiter === ';' ? '\\' : '/'}_npx${delimiter === ';' ? '\\' : '/'}`))
if (!binDir) throw new Error('npm exec did not expose its cached Playwright package')
const require = createRequire(join(resolve(binDir, '..'), 'noop.js'))
const { chromium } = require('playwright')

const high = [] // fail the run
const warn = [] // log, manual review
const info = [] // log only
const seen = new Set()

const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1366, height: 860 } })
page.on('console', (msg) => { if (msg.type() === 'error') high.push('console: ' + msg.text()) })
page.on('pageerror', (err) => high.push('pageerror: ' + String(err)))
await page.goto('http://localhost:5185/', { waitUntil: 'networkidle' })
await page.evaluate(() => window.__sim.store.setState({ rand: () => 0.5 }))

async function snap(label) {
  const r = await page.evaluate(() => {
    const vw = document.documentElement.clientWidth
    const vh = document.documentElement.clientHeight
    const high = []
    const warn = []
    const info = []
    const interactive = (el) => {
      const t = el.tagName
      return t === 'BUTTON' || t === 'A' || t === 'INPUT' || t === 'SELECT' || t === 'TEXTAREA' ||
        el.getAttribute('role') === 'button' || Number(el.tabIndex) >= 0
    }
    const scrollableAncestor = (el) => {
      let node = el.parentElement
      while (node && node !== document.body) {
        const oy = getComputedStyle(node).overflowY
        if (oy === 'auto' || oy === 'scroll') return true
        node = node.parentElement
      }
      return false
    }
    document.querySelectorAll('body *').forEach((el) => {
      if (el.closest('svg')) return
      if (el.clientWidth <= 1 && el.clientHeight <= 1) return // .sr-only / visually-hidden (intentional clip)
      const cs = getComputedStyle(el)
      if (cs.display === 'none' || cs.visibility === 'hidden') return
      const rect = el.getBoundingClientRect()
      if (rect.width <= 0 && rect.height <= 0) return

      const text = (el.textContent || '').trim()
      const isLeaf = el.children.length === 0 && text.length > 0
      const overX = el.scrollWidth > el.clientWidth + 1
      const overY = el.scrollHeight > el.clientHeight + 1
      const overflowX = cs.overflowX
      const overflowY = cs.overflowY
      const cls = (typeof el.className === 'string' ? el.className : el.getAttribute('class') || '').split(' ')[0]
      const desc = () => `${el.tagName.toLowerCase()}.${cls}:"${text.slice(0, 22)}"`

      // A. silent clip: overflow hidden + content wider + no ellipsis affordance (text cut off)
      if ((overflowX === 'hidden' || overflowX === 'clip') && overX && cs.textOverflow !== 'ellipsis' && isLeaf) {
        high.push(`silent-clip ${desc()} scrollWidth=${el.scrollWidth} clientWidth=${el.clientWidth}`)
      }
      // B. ellipsis / line-clamp truncation with no title (content unreachable to hover + AT)
      const clamped = cs.webkitLineClamp && cs.webkitLineClamp !== 'none'
      if ((cs.textOverflow === 'ellipsis' || clamped) && overX && isLeaf && !el.getAttribute('title')) {
        high.push(`truncated-no-title ${desc()} scrollWidth=${el.scrollWidth} clientWidth=${el.clientWidth}`)
      }
      // C. interactive element pushed offscreen with no scrollable ancestor to reveal it
      //    (below the fold but scrollable is fine — clipped by overflow:hidden is not)
      if (interactive(el) && (rect.right > vw + 1 || rect.left < -1 || rect.bottom > vh + 1 || rect.top < -1) && !scrollableAncestor(el)) {
        high.push(`interactive-offscreen ${desc()} rect=[${Math.round(rect.left)},${Math.round(rect.top)},${Math.round(rect.right)},${Math.round(rect.bottom)}] vs ${vw}x${vh}`)
      }
      // D. vertical clip: overflow hidden + content taller (warn — some masked areas are intended)
      const clipsY = overflowY === 'hidden' || overflowY === 'clip' || cs.overflow === 'hidden' || cs.overflow === 'clip'
      if (clipsY && overY && el.clientHeight > 0) {
        warn.push(`vertical-clip ${desc()} scrollHeight=${el.scrollHeight} clientHeight=${el.clientHeight}`)
      }
      // E. unreadable font (info — some tiny labels are decorative)
      if (isLeaf && parseFloat(cs.fontSize) < 10) {
        info.push(`tiny-font ${desc()} font-size=${cs.fontSize}`)
      }
    })
    return { high, warn, info }
  })
  for (const f of r.high) { const k = label + '|' + f; if (!seen.has(k)) { seen.add(k); high.push(`[${label}] ${f}`) } }
  for (const f of r.warn) { const k = label + '|' + f; if (!seen.has(k)) { seen.add(k); warn.push(`[${label}] ${f}`) } }
  for (const f of r.info) { const k = label + '|' + f; if (!seen.has(k)) { seen.add(k); info.push(`[${label}] ${f}`) } }
}

// ---- 1. opening cinematic + map ---------------------------------------------
await snap('opening-step0')
await page.click('button:has-text("接下来")')
await page.waitForTimeout(400)
await snap('opening-step1-goals')
await page.click('button:has-text("走进校园")')
await page.waitForTimeout(400)
await snap('map')

// ---- 2. turn 1 (开户 — event → results, no invest) --------------------------
await page.locator('.building:has-text("宿舍")').click()
await page.waitForTimeout(950)
await snap('turn1-dest')
await page.click('button:has-text("掷骰子")')
await page.waitForTimeout(2600)
await snap('turn1-dice')
await page.click('button:has-text("继续")')
await page.waitForTimeout(400)
await snap('turn1-event')
await page.locator('.btn-choice').first().click()
await page.waitForTimeout(400)
await snap('turn1-results')
await page.click('button:has-text("下一周")')
await page.waitForTimeout(500)
await snap('turn2-map')

// ---- 3. turn 2 (first trade — real invest panel with candles + quotes) ------
await page.locator('.building:has-text("教学楼")').click()
await page.waitForTimeout(950)
await page.click('button:has-text("掷骰子")')
await page.waitForTimeout(2600)
await page.click('button:has-text("继续")')
await page.waitForTimeout(400)
await page.locator('.btn-choice').first().click()
await page.waitForTimeout(400)
await snap('turn2-invest')

// ---- 4. summary screen + edge states ---------------------------------------
async function injectSummary(name) {
  await page.evaluate((name) => {
    const c = window.__sim.checks
    const base = c.createInitialState()
    const state = { ...base, phase: 'summary', finished: true, mentorUnlocked: true, track: 'ai', player: { ...base.player, cognition: 60 } }
    if (name === 'edge-empty-paper') {
      state.paper = { ...c.createPaperAccount(100000), cash: 0, positions: [] }
    } else if (name === 'edge-negative-wealth') {
      state.player = { ...state.player, wealth: -1200, mood: 0, cognition: 0 }
      state.turnOdds = []
    } else if (name === 'edge-dynasty-zero-trust') {
      state.relationshipTrust = 0
      state.player = { ...state.player, origin: 'finance_dynasty' }
    } else if (name === 'edge-max-wealth') {
      state.player = { ...state.player, wealth: 999999, cognition: 100, mood: 100 }
      state.loveStage = 'close'
      state.loveImpression = 'great'
      state.awakened = true
      state.paper = { ...c.createPaperAccount(100000), cash: 600000 }
    }
    window.__sim.store.setState({ state })
  }, name)
  await page.waitForTimeout(150)
}
await injectSummary('summary')
await snap('summary')
for (const name of ['edge-empty-paper', 'edge-negative-wealth', 'edge-dynasty-zero-trust', 'edge-max-wealth']) {
  await injectSummary(name)
  await snap(name)
}

await browser.close()

if (info.length) console.log('  [info] ' + info.length + ' tiny-font nodes (decorative labels):\n    ' + info.join('\n    '))
if (warn.length) console.log('  [warn] ' + warn.length + ' vertical clips (masked areas, review):\n    ' + warn.join('\n    '))
if (high.length) {
  console.error('LAYOUT GEOMETRY FAILURES:\n' + high.join('\n'))
  process.exit(1)
}
console.log('OK — layout geometry audit passed (no silent clip / truncation / offscreen interactive across all beats)')
