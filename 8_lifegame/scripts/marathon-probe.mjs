// Deep-water stability probe: the intro scene was only ever tested as a single 17-week
// run (seeds10). This exercises what a marathon of replays hits — seed edge coercion,
// replay determinism (no state leakage between runs), per-turn state invariants (no
// NaN/Infinity, player stats stay in [0,100]), and one active-trading run through the
// invest code paths (T+1 / fees / positions).
// Run from 8_lifegame/:  npm exec --offline --yes --package=playwright -- node scripts/marathon-probe.mjs
import { delimiter, join, resolve } from 'node:path'
import { createRequire } from 'node:module'

const binDir = process.env.PATH.split(delimiter).find((e) => e.includes(`${delimiter === ';' ? '\\' : '/'}_npx${delimiter === ';' ? '\\' : '/'}`))
if (!binDir) throw new Error('npm exec did not expose its cached Playwright package')
const require = createRequire(join(resolve(binDir, '..'), 'noop.js'))
const { chromium } = require('playwright')

const fails = []
const consoleErrors = []
const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1366, height: 860 } })
page.on('console', (msg) => { if (msg.type() === 'error') consoleErrors.push(msg.text()) })
page.on('pageerror', (err) => consoleErrors.push(String(err)))
await page.goto('http://localhost:5185/', { waitUntil: 'networkidle' })

// ---- Part 1: mulberry32 seed edges (direct, no browser interaction) ----------
const seedEdge = await page.evaluate(() => {
  const { mulberry32 } = window.__sim.checks
  const bad = []
  const edges = [0, -1, 0.5, 2147483647, 4294967295, 1e15, -1e15, 42]
  for (const seed of edges) {
    const r = mulberry32(seed)
    const a = r()
    const b = r()
    const r2 = mulberry32(seed)
    if (!Number.isFinite(a) || a < 0 || a >= 1) bad.push(`seed ${seed}: out of range ${a}`)
    if (a !== r2()) bad.push(`seed ${seed}: not deterministic`)
    if (a === b && a === r2()) bad.push(`seed ${seed}: stuck (same value 3×)`)
  }
  return bad
})
if (seedEdge.length) fails.push('mulberry32 edges: ' + seedEdge.join(' | '))
else console.log('mulberry32 seed edges (0 / -1 / 0.5 / int32-max / uint32-max / 1e15 / -1e15): OK')

// ---- helpers: per-turn state invariants -------------------------------------
// NOTE: this runs inside page.evaluate (browser context) — must be fully self-contained.
const invariant = () => {
  const assertFinite = (o, path = 'state') => {
    if (typeof o === 'number') return Number.isFinite(o) ? null : `non-finite ${path}=${o}`
    if (Array.isArray(o)) { for (let i = 0; i < o.length; i++) { const r = assertFinite(o[i], `${path}[${i}]`); if (r) return r } return null }
    if (o && typeof o === 'object') { for (const [k, v] of Object.entries(o)) { const r = assertFinite(v, `${path}.${k}`); if (r) return r } return null }
    return null
  }
  const s = window.__sim.getState()
  const finite = assertFinite(s)
  if (finite) return finite
  const p = s.player
  for (const k of ['cognition', 'mood']) {
    if (typeof p[k] === 'number' && (p[k] < 0 || p[k] > 100)) return `player.${k} out of [0,100]: ${p[k]}`
  }
  if (typeof p.wealth === 'number' && (p.wealth < -1e9 || p.wealth > 1e9)) return `player.wealth absurd: ${p.wealth}`
  return null
}
const checkInvariant = async (label) => {
  const r = await page.evaluate(invariant)
  if (r) fails.push(`[${label}] ${r}`)
}

// one full 17-week run; if `trade` is true, buy 50% weekly (turns > 1) instead of holding.
async function fullRun(seed, trade) {
  // Re-navigate before each run: the raw setState reset below rebuilds GameState but leaves
  // React's local UI state (openingStep / leaving) stale from the prior run, which hangs the
  // second run's opening→map transition. A real replay is a page load, so give each seed a
  // clean DOM. Determinism (Part 3) compares the re-built GameState, which setState still owns.
  await page.goto('http://localhost:5185/', { waitUntil: 'networkidle' })
  await page.evaluate((s) => {
    window.__sim.store.setState({
      state: window.__sim.checks.createInitialState(),
      rand: window.__sim.checks.mulberry32(s),
      runId: window.__sim.store.getState().runId + 1,
    })
  }, seed)
  await page.click('button:has-text("接下来")')
  await page.waitForTimeout(400) // > 160ms opening cross-fade — else "走进校园" is swallowed by the leaving guard
  await page.click('button:has-text("走进校园")')
  await page.waitForTimeout(400) // > 160ms cross-fade — map must be clear of the opening backdrop before clicking a building
  for (let turn = 1; turn <= 17; turn++) {
    await page.locator('.building:not(:disabled):not(.building-locked)').first().click()
    await page.waitForTimeout(950)
    await checkInvariant(`seed ${seed} turn ${turn} arrive`)
    await page.click('button:has-text("掷骰子")')
    await page.waitForTimeout(3000)
    await page.click('button:has-text("继续")')
    await page.waitForTimeout(350)
    if (await page.locator('.event-panel-special .btn-choice').first().isVisible()) {
      await page.locator('.event-panel-special .btn-choice').first().click()
      await page.waitForTimeout(250)
    }
    await page.locator('.btn-choice').first().click()
    await page.waitForTimeout(300)
    if (turn > 1) {
      if (trade) {
        await page.locator('.quick-pct-button:has-text("50%")').click()
        await page.locator('.add-draft-button').click()
        await page.click('.invest-actions .btn-primary')
      } else {
        await page.click('.no-invest-button')
      }
    }
    await page.waitForTimeout(3800)
    await checkInvariant(`seed ${seed} turn ${turn} results`)
    const last = turn === 17
    await page.click(last ? 'button:has-text("查看总结")' : 'button:has-text("下一周")')
    await page.waitForTimeout(400)
  }
  const fp = await page.evaluate(() => {
    const s = window.__sim.getState()
    return JSON.stringify({ wealth: s.player.wealth, cash: s.paper.cash, cognition: Math.round(s.player.cognition), mood: Math.round(s.player.mood), awakened: s.player.awakened, loveStage: s.loveStage, trust: s.relationshipTrust })
  })
  return fp
}

// ---- Part 2: full 17-week runs under edge seeds -----------------------------
for (const seed of [0, -1, 4294967295]) {
  await fullRun(seed, false)
  console.log(`seed ${seed}: 17 weeks OK`)
}

// ---- Part 3: replay determinism (same seed → identical final state) ----------
const runA = await fullRun(42, false)
const runB = await fullRun(42, false)
if (runA !== runB) fails.push(`replay drift: seed 42 produced different finals\nA: ${runA}\nB: ${runB}`)
else console.log('replay determinism (seed 42 × 2): OK')

// ---- Part 4: active-trading run (exercises invest / T+1 / fees / positions) --
await fullRun(7, true)
console.log('active trading (seed 7, buy 50% weekly): OK')

await browser.close()
if (consoleErrors.length) fails.push('console errors: ' + consoleErrors.join(' | '))
if (fails.length) {
  console.error('MARATHON FAILURES:\n' + fails.join('\n'))
  process.exit(1)
}
console.log('OK — marathon probe passed (seed edges / replay determinism / per-turn invariants / active trading, 0 console errors)')
