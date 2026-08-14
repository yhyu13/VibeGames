// Runtime observation pass: overflow / NaN-undefined leakage / edge-states / contrast / console.
// Run: npm exec --offline --yes --package=playwright -- node scripts/observe-runtime.mjs
import { delimiter, join, resolve } from 'node:path'
import { createRequire } from 'node:module'

const binDir = process.env.PATH.split(delimiter).find((e) => e.includes(`${delimiter === ';' ? '\\' : '/'}_npx${delimiter === ';' ? '\\' : '/'}`))
if (!binDir) throw new Error('npm exec did not expose its cached Playwright package')
const require = createRequire(join(resolve(binDir, '..'), 'noop.js'))
const { chromium } = require('playwright')

const errors = []
const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1366, height: 860 } })
page.on('console', (msg) => { if (msg.type() === 'error') errors.push(msg.text()) })
page.on('pageerror', (err) => errors.push(String(err)))
await page.goto('http://localhost:5185/', { waitUntil: 'networkidle' })
await page.evaluate(() => window.__sim.store.setState({ rand: () => 0.5 }))

const fails = []

// ---- helpers ------------------------------------------------------------------
async function snapshot(label) {
  const r = await page.evaluate(() => {
    const vw = document.documentElement.clientWidth
    const vh = document.documentElement.clientHeight
    const overflowX = document.documentElement.scrollWidth - vw
    const overflowY = document.documentElement.scrollHeight - vh
    // NaN / undefined / null leaking into visible text
    const bad = []
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT)
    let n
    while ((n = walker.nextNode())) {
      const t = n.textContent ?? ''
      if (/(NaN|undefined|null)/.test(t)) bad.push(t.trim().slice(0, 60))
    }
    return { overflowX, overflowY, badText: bad }
  })
  await page.screenshot({ path: `showcase/obs-${label}.png`, fullPage: false })
  if (r.overflowX > 1) fails.push(`[${label}] horizontal overflow ${r.overflowX}px`)
  if (r.overflowY > 1) fails.push(`[${label}] vertical overflow ${r.overflowY}px`)
  if (r.badText.length) fails.push(`[${label}] NaN/undefined/null in visible text: ${r.badText.join(' | ')}`)
  return r
}

// ---- 1. opening cinematic (both beats) ---------------------------------------
await snapshot('opening-step0')
await page.click('button:has-text("接下来")')
await page.waitForTimeout(400)
await snapshot('opening-step1-goals')
await page.click('button:has-text("走进校园")')
await page.waitForTimeout(400)
await snapshot('map')

// ---- 2. turn 1 full loop (town) ----------------------------------------------
await page.locator('.building:has-text("宿舍")').click()
await page.waitForTimeout(950)
await snapshot('turn1-dest')
await page.click('button:has-text("掷骰子")')
await page.waitForTimeout(2600)
await snapshot('turn1-dice')
await page.click('button:has-text("继续")')
await page.waitForTimeout(400)
await snapshot('turn1-event')
await page.locator('.btn-choice').first().click()
await page.waitForTimeout(400)
await snapshot('turn1-invest')
await page.click('button:has-text("下一周")')
await page.waitForTimeout(500)
await snapshot('turn2-map')

// ---- 3. edge-states via direct state injection (summary phase) -----------------
const EDGE_NAMES = ['empty-paper-zero-positions', 'negative-wealth-all-fail', 'dynasty-zero-trust', 'max-wealth-won']

for (const name of EDGE_NAMES) {
  await page.evaluate((name) => {
    const c = window.__sim.checks
    const base = name === 'dynasty-zero-trust'
      ? c.createInitialState('finance_dynasty')
      : c.createInitialState()
    const paperCap = name === 'dynasty-zero-trust' ? 300000 : 100000
    const state = {
      ...base, phase: 'summary', finished: true,
      loveStage: 'none', loveImpression: 'none', mentorUnlocked: false,
      player: { ...base.player, wealth: 0, awakened: false, log: [] },
      paper: { ...c.createPaperAccount(paperCap), cash: 0, positions: [] },
    }
    if (name === 'negative-wealth-all-fail') {
      state.player.wealth = -1200
      state.player.mood = 0
      state.player.cognition = 0
      state.turnOdds = []
    }
    if (name === 'dynasty-zero-trust') state.relationshipTrust = 0
    if (name === 'max-wealth-won') {
      state.player.wealth = 999_999
      state.player.cognition = 100
      state.player.mood = 100
      state.loveStage = 'close'
      state.loveImpression = 'great'
      state.mentorUnlocked = true
      state.awakened = true
      state.awakeningReasons = ['cognition']
      state.paper.cash = 600_000
    }
    window.__sim.store.setState({ state })
  }, name)
  await page.waitForTimeout(150)
  const r = await snapshot('edge-' + name)
  const body = await page.evaluate(() => document.body.textContent ?? '')
  if (/NaN|undefined|\bnull\b/.test(body)) fails.push(`[edge-${name}] leak token in body text`)
}

// ---- 4. contrast: flag text color vs its effective background -----------------
const contrast = await page.evaluate(() => {
  function lum(hex) {
    const m = /^#?([0-9a-f]{6})$/i.exec(hex.trim())
    if (!m) return null
    const v = parseInt(m[1], 16)
    const c = [(v >> 16) & 255, (v >> 8) & 255, v & 255].map((x) => {
      const s = x / 255
      return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4)
    })
    return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2]
  }
  function ratio(fg, bg) {
    const a = lum(fg), b = lum(bg)
    if (a == null || b == null) return null
    const [l, d] = a > b ? [a, b] : [b, a]
    return (l + 0.05) / (d + 0.05)
  }
  const low = []
  document.querySelectorAll('span, p, h1, h2, h3, button, div, a, li, dt, dd').forEach((el) => {
    const cs = getComputedStyle(el)
    const fg = cs.color
    let bg = null, node = el
    while (node && node !== document.body) {
      const b = getComputedStyle(node).backgroundColor
      if (b && b !== 'rgba(0, 0, 0, 0)' && b !== 'transparent') { bg = b; break }
      node = node.parentElement
    }
    if (!bg) return
    const r = ratio(fg, bg)
    const hasText = (el.textContent ?? '').trim().length > 0 && el.children.length === 0
    if (hasText && r != null && r < 3.0) low.push(`${(el.tagName + '.' + (el.className || '')).slice(0, 30)} ratio=${r.toFixed(2)} "${el.textContent.trim().slice(0, 24)}"`)
  })
  return low.slice(0, 30)
})
// contrast is informational only (many intentional low-contrast decorative chips); log but don't fail.
if (contrast.length) console.log('  [contrast-note] ' + contrast.length + ' low-contrast text nodes (informational):\n    ' + contrast.join('\n    '))

await browser.close()
if (errors.length) fails.push(`console errors: ${errors.join(' | ')}`)
if (fails.length) {
  console.error('RUNTIME OBSERVATION FAILURES:\n' + fails.join('\n'))
  process.exit(1)
}
console.log('OK — runtime observation passed (overflow / NaN-undefined / edge-states / console clean)')
