// Quick-gate — a fast headless-environment verification gate. Drives the PURE sim via
// window.__sim.checks (chooseDestination → arrive → roll → advanceToEvent → chooseEvent /
// chooseSpecialChoice → makeInvestment → finishCoach) with NO UI animation waits, asserting
// per-turn invariants (stat clamps, no NaN, phase sanity) across N seeds × 17 weeks.
//
// Why this exists: the UI-driven probes (smoke-seeds/seeds10/marathon) time out in this
// headless environment (Chromium rAF throttling makes the per-turn animation waits ~9s ×
// 17 weeks × N seeds). This quick-gate covers the same correctness surface at the sim level
// in milliseconds. The heavy UI probes remain the headed-environment gates (TDD §5).
//
// Run from 8_lifegame/:  npm exec --offline --yes --package=playwright -- node scripts/quick-gate.mjs
import { delimiter, join, resolve } from 'node:path'
import { createRequire } from 'node:module'

const binDir = process.env.PATH.split(delimiter).find((e) => e.includes(`${delimiter === ';' ? '\\' : '/'}_npx${delimiter === ';' ? '\\' : '/'}`))
if (!binDir) throw new Error('npm exec did not expose its cached Playwright package')
const require = createRequire(join(resolve(binDir, '..'), 'noop.js'))
const { chromium } = require('playwright')

const SEEDS = [1, 42, 999]
const failures = []
const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1366, height: 860 } })
const consoleErrors = []
page.on('pageerror', (err) => consoleErrors.push(String(err)))
await page.goto('http://localhost:5185/', { waitUntil: 'networkidle' })

for (const seed of SEEDS) {
  const result = await page.evaluate((s) => {
    const c = window.__sim.checks
    const rand = c.mulberry32(s)
    let st = c.createInitialState('town_exam_kid', false)
    const issues = []
    const cells = ['library', 'lecture', 'start', 'cafeteria', 'club'] // always-available campus cells
    let cellIdx = 0
    let guard = 0
    let turns = 0
    while (st.phase !== 'summary' && guard++ < 400) {
      const prevPhase = st.phase
      if (st.phase === 'choose_destination') st = c.chooseDestination(st, cells[cellIdx++ % cells.length])
      else if (st.phase === 'walking') st = c.arrive(st, rand)
      else if (st.phase === 'dice') st = st.pendingDice ? c.advanceToEvent(st) : c.roll(st, rand)
      else if (st.phase === 'event') {
        if (st.pendingSpecialChoice) st = c.chooseSpecialChoice(st, st.pendingSpecialChoice.event.choices[0].id)
        else if (st.pendingEvent) st = c.chooseEvent(st, st.pendingEvent.event.choices[0].id, rand)
        else break
      }
      else if (st.phase === 'invest') st = c.makeInvestment(st, []) // hold (不操作)
      else if (st.phase === 'results') { st = c.finishCoach(st, rand); turns++ }
      else { issues.push(`unknown phase ${st.phase}`); break }
      if (st.phase === prevPhase && prevPhase === 'choose_destination') { issues.push(`chooseDestination rejected all cells at turn ${st.player.turn}`); break }
      // per-step invariants
      const p = st.player
      for (const k of ['cognition', 'stamina', 'mood']) {
        const v = p[k]
        if (!Number.isFinite(v) || v < 0 || v > 100) issues.push(`turn ${p.turn} ${prevPhase}: ${k}=${v}`)
      }
      if (!Number.isFinite(p.wealth)) issues.push(`turn ${p.turn} ${prevPhase}: wealth=${p.wealth}`)
      if (!Number.isFinite(st.paper.cash)) issues.push(`turn ${p.turn} ${prevPhase}: paper.cash=${st.paper.cash}`)
    }
    return {
      seed: s,
      reachedSummary: st.phase === 'summary',
      turns,
      finalTurn: st.player.turn,
      awakened: st.player.awakened,
      lastAwakeningTier: st.player.lastAwakeningTier,
      paperValue: Math.round(st.paper.cash + Object.entries(st.paper.positions).reduce((a, [id, pos]) => a + (pos ? pos.units * (c.priceAt(c.ASSETS.find((a2) => a2.id === id), st.player.turn) ?? 0) : 0), 0)),
      issues,
    }
  }, seed)
  console.log(`seed ${seed}: ${result.turns} turns, phase=${result.reachedSummary ? 'summary' : 'STUCK'}, awakened=${result.awakened}, tier=${result.lastAwakeningTier}, paper=¥${result.paperValue}`)
  if (!result.reachedSummary) failures.push(`seed ${seed}: never reached summary (stuck at turn ${result.finalTurn})`)
  if (result.turns !== 17) failures.push(`seed ${seed}: expected 17 turns, got ${result.turns}`)
  result.issues.forEach((i) => failures.push(`seed ${seed}: ${i}`))
}

await browser.close()
console.log(`\n=== quick-gate (pure-sim, ${SEEDS.length} seeds × 17 weeks) ===`)
console.log(`${consoleErrors.length} page errors`)
if (consoleErrors.length) console.log(consoleErrors.join('\n'))
if (failures.length) {
  console.log(`\n${failures.length} FAILURE(s):`)
  failures.forEach((f) => console.log('  ✗ ' + f))
  process.exit(1)
}
console.log('ALL GREEN — full loop + invariants hold across all seeds')
