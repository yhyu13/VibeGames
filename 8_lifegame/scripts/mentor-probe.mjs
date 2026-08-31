// Ch07 贵人系统 (mentor system) contract probe — RED-first draft.
// Asserts the three Ch07 mechanics against the pure sim via window.__sim.checks
// (no UI animation), matching the showcase.mjs §contract pattern.
//
// STATUS: written BEFORE the Ch07 implementation. Assertions are EXPECTED TO
// FAIL (red) until design/20-ch07-mentor-system.md is built — that red state is
// the point (it pins the contract before any code exists).
//
// Run from 8_lifegame/:  npm exec --offline --yes --package=playwright -- node scripts/mentor-probe.mjs
// (dev server must be running on :5185)
import { delimiter, join, resolve } from 'node:path'
import { createRequire } from 'node:module'
import { fileURLToPath } from 'node:url'

const binDir = process.env.PATH.split(delimiter).find((e) => e.includes(`${delimiter === ';' ? '\\' : '/'}_npx${delimiter === ';' ? '\\' : '/'}`))
if (!binDir) throw new Error('npm exec did not expose its cached Playwright package')
const require = createRequire(join(resolve(binDir, '..'), 'noop.js'))
const { chromium } = require('playwright')

const failures = []
const eq = (label, actual, expected) => {
  const ok = JSON.stringify(actual) === JSON.stringify(expected)
  if (!ok) failures.push(`${label}: expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`)
}

const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1366, height: 860 } })
const consoleErrors = []
page.on('pageerror', (err) => consoleErrors.push(String(err)))
await page.goto('http://localhost:5185/', { waitUntil: 'networkidle' })

const results = await page.evaluate(() => {
  const c = window.__sim.checks
  const out = { missing: [] }

  // ─── A. 接住质量 (cognition-gated comprehension) ─────────────────────
  // outline 承重墙④: 认知低听懂 30% / 认知高听懂 80%. New checks helper
  // mentorComprehensionFor(cognition) -> 0.3 (<60) / 0.8 (>=60).
  if (typeof c.mentorComprehensionFor !== 'function') {
    out.missing.push('mentorComprehensionFor')
  } else {
    out.A_low = c.mentorComprehensionFor(50)
    out.A_high = c.mentorComprehensionFor(70)
    out.A_boundary = c.mentorComprehensionFor(60)
  }

  // ─── B. 觉醒 3 层级 (micro / mid / big) ──────────────────────────────
  // ch04-ch05 §5.7: 中觉醒 needs a mentor dice roll (untrusted hit); 大觉醒 =
  // 圈层跃迁 (trusted hit = victory). New checks helper
  // awakeningTierFor(track, cognition) -> 'mid' | 'big' (big iff trusted:
  // track==='ai' && cognition>=60). Behavior via a VALID finishCoach fixture
  // (modeled on showcase.mjs §contract: needs pendingDice/pendingEvent/
  // pendingEventChoiceId/pendingCoach all set + phase 'results').
  if (typeof c.awakeningTierFor !== 'function') {
    out.missing.push('awakeningTierFor')
  } else {
    out.B_tier_untrusted = c.awakeningTierFor(null, 50)   // no track, low cognition
    out.B_tier_trusted = c.awakeningTierFor('ai', 70)      // ai + cognition>=60
    out.B_tier_wrongtrack = c.awakeningTierFor('finance', 70) // cognition high, wrong track
  }
  const mentorFixture = (cognition, track) => {
    const base = c.createInitialState('town_exam_kid', false)
    return {
      ...base,
      phase: 'results',
      track,
      player: { ...base.player, cognition },
      pendingDice: { rolls: [3, 4], originMod: -2, eraMod: 0, stateMod: 0, eventMod: 1, total: 6, tier: 'fail', extremeState: false },
      pendingEvent: { event: { id: 'mentor_hit', cellType: 'mentor', kind: 'opportunity', weight: 0, eventMod: 1, scaledStats: [], title: '', text: '', choices: [] } },
      pendingEventChoiceId: 'mentor_hit',
      pendingCoach: { dominant: 'cognition', dominantShare: 0.5, line: '', hint: '' },
    }
  }
  const midRes = c.finishCoach(mentorFixture(50, null), () => 1)     // untrusted hit -> mid
  const bigRes = c.finishCoach(mentorFixture(70, 'ai'), () => 1)      // trusted hit -> big
  out.B_mid_awakened = midRes.player.awakened
  out.B_mid_unlocked = midRes.financeDynastyUnlocked
  out.B_mid_tier = midRes.player.lastAwakeningTier
  out.B_mid_reviewCredits = midRes.reviewCredits
  out.B_mid_favor = midRes.mentorFavor
  out.B_big_awakened = bigRes.player.awakened
  out.B_big_unlocked = bigRes.financeDynastyUnlocked
  out.B_big_tier = bigRes.player.lastAwakeningTier

  // ─── C. 觉醒双面性 (awakening carries a per-turn cost) ───────────────
  // ch04-ch05 §5.7: 新期待压力 体力 −5/回合 (per-turn STAMINA, applied in
  // finishCoach), 旧圈层贬低 心态 −5 (one-shot at restart, in createInitialState).
  // Isolate the cost with a zero-delta rest fixture called straight into
  // finishCoach (skipping chooseEvent so the event delta can't confound it).
  const awakeningCostFixture = (origin, unlocked) => {
    const base = c.createInitialState(origin, unlocked)
    return { ...base, phase: 'results',
      pendingDice: { rolls: [2, 2], originMod: 0, eraMod: 0, stateMod: 0, eventMod: 0, total: 4, tier: 'fail', extremeState: false },
      pendingEvent: { event: { id: 'x', cellType: 'rest', kind: 'neutral', weight: 0, eventMod: 0, scaledStats: [], title: '', text: '', choices: [] } },
      pendingEventChoiceId: 'x',
      pendingCoach: { dominant: 'cognition', dominantShare: 0.5, line: '', hint: '' },
    }
  }
  const dynAfter = c.finishCoach(awakeningCostFixture('finance_dynasty', true), () => 1)
  const townAfter = c.finishCoach(awakeningCostFixture('town_exam_kid', false), () => 1)
  out.C_dyn_stamina_start = c.createInitialState('finance_dynasty', true).player.stamina
  out.C_dyn_stamina_after = dynAfter.player.stamina
  out.C_town_stamina_after = townAfter.player.stamina
  out.C_dyn_mood_start = c.createInitialState('finance_dynasty', true).player.mood
  return out
})

// ─── evaluate assertions ───────────────────────────────────────────────
if (results.missing.length) {
  results.missing.forEach((m) => failures.push(`checks.${m} not implemented (expected red)`))
}
if (results.A_low !== undefined) {
  eq('A: cognition 50 hears 30%', results.A_low, 0.3)
  eq('A: cognition 70 hears 80%', results.A_high, 0.8)
  eq('A: 60 is the high band', results.A_boundary, 0.8)
}
if (results.B_tier_untrusted !== undefined) {
  eq('B: untrusted hit tier is mid', results.B_tier_untrusted, 'mid')
  eq('B: trusted hit tier is big', results.B_tier_trusted, 'big')
  eq('B: high cognition + wrong track is mid', results.B_tier_wrongtrack, 'mid')
}
eq('B: mid awakening does NOT awaken', results.B_mid_awakened, false)
eq('B: mid awakening does NOT unlock dynasty', results.B_mid_unlocked, false)
eq('B: mid awakening tier recorded', results.B_mid_tier, 'mid')
eq('B: mid awakening grants 方法论 reviewCredits +1 (advice fidelity bump)', results.B_mid_reviewCredits, 1)
eq('B: mid awakening grants 长期友谊 favor +1', results.B_mid_favor, 1)
eq('B: trusted hit STILL awakens (victory preserved)', results.B_big_awakened, true)
eq('B: trusted hit STILL unlocks dynasty', results.B_big_unlocked, true)
eq('B: trusted hit tier is big', results.B_big_tier, 'big')

// C: 觉醒双面性 — dynasty restart carries a per-turn stamina cost + a one-shot
// mood hit; the town run carries neither. Isolated via a zero-delta fixture.
eq('C: dynasty restart one-shot mood −5 (旧圈层贬低: 75 → 70)', results.C_dyn_mood_start, 70)
eq('C: dynasty turn applies 新期待压力 体力 −5 (75 → 70)', results.C_dyn_stamina_after, 70)
eq('C: town turn carries no awakening cost (stamina unchanged)', results.C_town_stamina_after, 60)

// ─── report ────────────────────────────────────────────────────────────
await browser.close()
console.log(`\n=== mentor-probe (Ch07 contract) ===`)
console.log(`${consoleErrors.length} page errors`)
if (consoleErrors.length) console.log(consoleErrors.join('\n'))
if (failures.length) {
  console.log(`\n${failures.length} RED assertion(s):`)
  failures.forEach((f) => console.log('  ✗ ' + f))
  process.exit(1)
}
console.log('\nALL GREEN — Ch07 contracts hold')
