// 归因 (attribution) contract probe — asserts the coach names the dimension that DRIVED the
// week, against the pure sim via window.__sim.checks (no UI animation), matching the
// mentor-probe.mjs / showcase.mjs §contract pattern.
//
// Why this probe exists (v3.2): the coach's 情绪 override is gated by `dice.extremeState`, and
// that flag was true for the MEDIAN player — its high edge sat exactly on the healthy line a run
// STARTS at (60/60). The override therefore fired on 65.9% of turns and 情绪 became the answer to
// 77.2% of weeks, which is the same "wins by construction" failure the v1.1 categorical
// attribution redesign was written to remove (GDD §6) — re-entering through the override that
// redesign left in place. A comment did not catch that, and neither did the build; only driving
// the sim did. Contract C is the assertion that would have: no single dimension may own the
// majority of weeks.
//
// Run from 8_lifegame/:  npm exec --offline --yes --package=playwright -- node scripts/attribution-probe.mjs
// (dev server must be running on :5185)
import { delimiter, join, resolve } from 'node:path'
import { createRequire } from 'node:module'

const binDir = process.env.PATH.split(delimiter).find((e) => e.includes(`${delimiter === ';' ? '\\' : '/'}_npx${delimiter === ';' ? '\\' : '/'}`))
if (!binDir) throw new Error('npm exec did not expose its cached Playwright package')
const require = createRequire(join(resolve(binDir, '..'), 'noop.js'))
const { chromium } = require('playwright')

const failures = []
const eq = (label, actual, expected) => {
  const ok = JSON.stringify(actual) === JSON.stringify(expected)
  if (!ok) failures.push(`${label}: expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`)
}
const ok = (label, cond, detail) => {
  if (!cond) failures.push(`${label}${detail ? `: ${detail}` : ''}`)
}

const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1366, height: 860 } })
const consoleErrors = []
page.on('pageerror', (err) => consoleErrors.push(String(err)))
await page.goto('http://localhost:5185/', { waitUntil: 'networkidle' })

const results = await page.evaluate(() => {
  const c = window.__sim.checks
  const out = {}

  // ─── A. the gate: is this roll state-DRIVEN? ────────────────────────────────────────
  // The healthy line is where a run BEGINS. A player sitting on it is the ordinary case,
  // not the extreme one; only a state a margin off that line can be said to drive a roll.
  const atDice = (stamina, mood) => {
    const s = c.arrive(c.chooseDestination(c.createInitialState('town_exam_kid', false), 'library'), c.mulberry32(7))
    return { ...s, phase: 'dice', pendingDice: null, player: { ...s.player, stamina, mood } }
  }
  const extreme = (stamina, mood) => c.roll(atDice(stamina, mood), c.mulberry32(1)).pendingDice.extremeState
  out.A_at_start_line = extreme(60, 60) // the value a run starts at
  out.A_one_stat_only = extreme(95, 70) // a ±2 stateMod needs BOTH
  out.A_earned_high = extreme(90, 90)
  out.A_dragging = extreme(20, 20)
  out.A_boundary_low = extreme(30, 30) // 30 is not below 30

  // ─── B. which way the override points ───────────────────────────────────────────────
  // GDD §6: an extreme state overrides the cell type to 情绪; an ordinary one does not.
  const learnEvent = { event: { id: 'x', cellType: 'learn', kind: 'opportunity', weight: 0, eventMod: 0, scaledStats: [], title: '', text: '', choices: [{ id: 'x', label: '', description: '', delta: {}, coefficient: null, coefficientStats: [] }] } }
  const restEvent = { event: { ...learnEvent.event, cellType: 'rest' } }
  const diceWith = (extremeState) => ({ rolls: [3, 4], originMod: -2, eraMod: 0, stateMod: 0, eventMod: 1, total: 6, tier: 'fail', extremeState })
  const dominantFor = (extremeState, offer) => {
    const s = atDice(60, 60)
    const s2 = c.chooseEvent({ ...s, pendingDice: diceWith(extremeState), pendingEvent: offer }, 'x', c.mulberry32(3))
    return c.makeInvestment(s2, []).pendingCoach.dominant
  }
  out.B_extreme_learn = dominantFor(true, learnEvent)
  out.B_ordinary_learn = dominantFor(false, learnEvent)
  out.B_ordinary_rest = dominantFor(false, restEvent)

  // ─── C. the aggregate contract — no dimension may own the majority of weeks ─────────
  // This is the assertion v3.2's bug needed. Drives whole seeded runs through the real
  // pipeline (no UI waits), exactly as scripts/quick-gate.mjs does.
  const DEST = ['library', 'cafeteria', 'club', 'lecture', 'gym', 'exchange']
  const counts = {}
  const cellTypes = {}
  const ends = {}
  let turned = 0
  let overweighted = 0
  for (const seed of [1, 42, 999, 7, 2026, 31337]) {
    const rand = c.mulberry32(seed)
    let s = c.createInitialState('town_exam_kid', false)
    let closed = false
    for (let t = 0; t < 400 && !closed; t++) {
      if (s.phase === 'choose_destination') s = c.chooseDestination(s, DEST[Math.floor(rand() * DEST.length)])
      else if (s.phase === 'walking') s = c.arrive(s, rand)
      else if (s.phase === 'dice') s = c.advanceToEvent(c.roll(s, rand))
      else if (s.phase === 'event') s = c.chooseEvent(s, s.pendingEvent.event.choices[0].id, rand)
      else if (s.phase === 'invest') s = c.makeInvestment(s, [])
      else if (s.phase === 'results') {
        // The coach is built on ENTERING results — by makeInvestment on the ordinary path, and
        // directly by chooseEvent on the one beat that skips the trade (ACCOUNT_OPENING). Counting
        // only after makeInvestment would silently drop those weeks from the tally.
        const d = s.pendingCoach?.dominant
        if (d) {
          counts[d] = (counts[d] ?? 0) + 1
          const ct = s.pendingEvent?.event.cellType ?? '(none)'
          cellTypes[ct] = (cellTypes[ct] ?? 0) + 1
          if (s.pendingDice?.extremeState) overweighted++
          turned++
        }
        const next = c.finishCoach(s, rand)
        if (next === s) { ends['stalled-at-results'] = (ends['stalled-at-results'] ?? 0) + 1; break }
        s = next
      } else {
        // 'summary' is a legitimate finish; any other phase here is a hole in this drive, and it
        // must be visible — a drive that quietly stops early reports a distribution over a
        // handful of weeks and looks exactly like a passing one.
        ends[s.phase] = (ends[s.phase] ?? 0) + 1
        closed = true
      }
    }
  }
  out.C_counts = counts
  out.C_cellTypes = cellTypes
  out.C_overweighted = overweighted
  out.C_ends = ends
  out.C_turns = turned
  return out
})

// ─── evaluate assertions ────────────────────────────────────────────────────────────
eq('A: the healthy line a run starts at is NOT extreme', results.A_at_start_line, false)
eq('A: one stat alone is not an extreme state', results.A_one_stat_only, false)
eq('A: both stats a margin above the line IS extreme', results.A_earned_high, true)
eq('A: both stats dragging IS extreme', results.A_dragging, true)
eq('A: 30 is not below the 30 penalty line', results.A_boundary_low, false)

eq('B: an extreme state overrides a learn cell to 情绪', results.B_extreme_learn, 'emotion')
eq('B: an ordinary week on a learn cell reads 认知', results.B_ordinary_learn, 'cognition')
eq('B: an ordinary week on a rest cell reads 情绪', results.B_ordinary_rest, 'emotion')

const endTally = Object.entries(results.C_ends).map(([k, v]) => `${k} ${v}`).join(', ')
const cCounts = results.C_counts
const cTotal = Object.values(cCounts).reduce((a, b) => a + b, 0)
const share = (k) => (cCounts[k] ?? 0) / cTotal
const pctOf = (n) => `${(n * 100).toFixed(0)}%`
const dimTally = Object.entries(cCounts).map(([k, v]) => `${k} ${pctOf(v / cTotal)}`).join(', ')
const cellTally = Object.entries(results.C_cellTypes).map(([k, v]) => `${k} ${pctOf(v / cTotal)}`).join(', ')
ok(
  'C: the drive produced enough weeks to judge',
  results.C_turns >= 90,
  `only ${results.C_turns} weeks — runs ended: ${endTally}`
)
if (cTotal) {
  // The bug was never "emotion is too high" — it was that the OVERRIDE fired on the median
  // player. This is that quantity directly: a gate that is true most of the time is not a gate.
  ok(
    'C: the 情绪 override is rare, not the ordinary case',
    results.C_overweighted / cTotal <= 0.15,
    `extreme state on ${pctOf(results.C_overweighted / cTotal)} of weeks`
  )
  // A dimension may legitimately lead — 认知 leads when the player spends the term in the library.
  // What it may not do is answer nearly every week regardless of what was chosen, which is the
  // shape 77.2% had.
  ok(
    'C: no dimension is the answer to nearly every week',
    Math.max(...Object.values(cCounts)) / cTotal <= 0.70,
    dimTally
  )
  ok(
    'C: 认知 outranks 情绪 — a week on a learning cell belongs to the cell you chose',
    share('cognition') > share('emotion'),
    `cognition ${pctOf(share('cognition'))} vs emotion ${pctOf(share('emotion'))}`
  )
}

// ─── report ─────────────────────────────────────────────────────────────────────────
await browser.close()
console.log(`\n=== attribution-probe (归因 contract, v3.2) ===`)
console.log(`${results.C_turns} weeks driven across 6 seeds — runs ended: ${endTally}`)
console.log(`dominant: ${dimTally}   (cell types driven: ${cellTally})`)
console.log(`dice.extremeState on ${pctOf(results.C_overweighted / cTotal)} of weeks — was 65.9% before v3.2`)
console.log(`${consoleErrors.length} page errors`)
if (consoleErrors.length) console.log(consoleErrors.join('\n'))
if (failures.length) {
  console.log(`\n${failures.length} RED assertion(s):`)
  failures.forEach((f) => console.log('  ✗ ' + f))
  process.exit(1)
}
console.log('\nALL GREEN — 归因 contracts hold')
