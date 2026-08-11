// Drive the v1.2 intro scene end-to-end and screenshot every beat, for visual review.
// Run from 8_lifegame/:  npm exec --offline --yes --package=playwright -- node scripts/showcase.mjs
// (same npx-cache resolution trick as 7_hotlineShanghai/scripts/run-e2e.mjs — no local playwright dep)
//
// v1.2 flow per turn: click a building (free movement) → token glides → arrival draws the
// location event (+ shock roll) → 掷骰子 → 继续 → pick a choice → 确认交易 → wide results card.
// Seeded contract checks (spec §9) run against the DEV-only window.__sim hook.
import { delimiter, join, resolve } from 'node:path'
import { createRequire } from 'node:module'
import { fileURLToPath } from 'node:url'
import { mkdirSync } from 'node:fs'

const binDir = process.env.PATH.split(delimiter).find((e) => e.includes(`${delimiter === ';' ? '\\' : '/'}_npx${delimiter === ';' ? '\\' : '/'}`))
if (!binDir) throw new Error('npm exec did not expose its cached Playwright package')
const require = createRequire(join(resolve(binDir, '..'), 'noop.js'))
const { chromium } = require('playwright')

const outDir = fileURLToPath(new URL('../showcase/', import.meta.url))
mkdirSync(outDir, { recursive: true })

const consoleErrors = []
const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1366, height: 860 } })
page.on('console', (msg) => { if (msg.type() === 'error') consoleErrors.push(msg.text()) })
page.on('pageerror', (err) => consoleErrors.push(String(err)))

const shot = (name) => page.screenshot({ path: join(outDir, name) })

await page.goto('http://localhost:5185/', { waitUntil: 'networkidle' })
await shot('01-opening.png')

// ---- seeded contract checks (spec §9) — pure-function pins via the DEV __sim hook ----
const simFails = await page.evaluate(() => {
  const { checks } = window.__sim
  const { infoQuality, buildCandles, investAdvice, tierFactorFor, LOCATION_EVENTS, ASSETS, createInitialState, chooseDestination, arrive, finishCoach, relationshipEventFor, applyRelationshipChoice } = checks
  const fails = []
  const eq = (name, actual, expected) => {
    if (actual !== expected) fails.push(`${name}: expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`)
  }

  // (b) mood → info quality on the frozen 30/60 bands; cognition ≥ 60 narrows the window
  eq('mood 25 → pessimistic', infoQuality({ mood: 25, cognition: 60 }).quality, 'pessimistic')
  eq('mood 45 → rational', infoQuality({ mood: 45, cognition: 60 }).quality, 'rational')
  eq('mood 60 → rational (sweet spot)', infoQuality({ mood: 60, cognition: 60 }).quality, 'rational')
  eq('mood 75 → overconfident', infoQuality({ mood: 75, cognition: 60 }).quality, 'overconfident')
  eq('cognition 60 → narrowed', infoQuality({ mood: 25, cognition: 60 }).narrowed, true)
  eq('cognition 59 → not narrowed', infoQuality({ mood: 25, cognition: 59 }).narrowed, false)

  // v1.3 §2: candles are HISTORY ONLY — no future ticks leak into the chart
  eq('candles history-only (turn 3 → 2 candles)', buildCandles([2, -3, 5, 1, 4, -2, 3, 6], 3).length, 2)
  eq('candles clamp at curve length', buildCandles([2, -3], 8).length, 2)
  eq('turn 2 → exactly 1 candle', buildCandles([2, -3, 5], 2).length, 1)

  // v1.6 §1: advice fidelity is driven by REVIEWED trades (0 blind / 1 noisy / 2 clear / 3+ sharp)
  eq('0 reviews → blind', investAdvice(ASSETS[0], 3, 0, () => 0).band, 'blind')
  eq('1 review → noisy', investAdvice(ASSETS[0], 3, 1, () => 0).band, 'noisy')
  eq('2 reviews → clear', investAdvice(ASSETS[0], 3, 2, () => 0).band, 'clear')
  eq('3 reviews → sharp', investAdvice(ASSETS[0], 3, 3, () => 0).band, 'sharp')
  // faithful labels track the coming tick's bucket (a_index t3 = +5, t2 = −3; hk_index t1 = −1)
  eq('faithful up-tick → 适宜投资', investAdvice(ASSETS[0], 3, 3, () => 0).label, '适宜投资')
  eq('faithful down-tick → 不适宜投资', investAdvice(ASSETS[0], 2, 3, () => 0).label, '不适宜投资')
  eq('faithful flat-tick → 谨慎参与', investAdvice(ASSETS[1], 1, 3, () => 0).label, '谨慎参与')
  eq('unfaithful inverts the label', investAdvice(ASSETS[0], 3, 1, () => 0.99).label, '不适宜投资')
  let adviceDraws = 0
  investAdvice(ASSETS[0], 3, 0, () => (adviceDraws++, 0))
  eq('blind band consumes 0 rand draws', adviceDraws, 0)

  // v1.9 / D13: finance-dynasty unlock, origin-aware starts, and typed relationship sequencing.
  const dynasty = createInitialState('finance_dynasty', true)
  eq('dynasty run origin', dynasty.player.origin, 'finance_dynasty')
  eq('dynasty starting wealth', dynasty.player.wealth, 300000)
  eq('dynasty parallel origin', dynasty.altPlayer.origin, 'town_exam_kid')
  eq('relationship turn 2 stage 0', relationshipEventFor(2, 0, false)?.id, 'relationship_doubt')
  eq('relationship waits before turn 2', relationshipEventFor(1, 0, false), null)
  eq('resolved relationship stops', relationshipEventFor(8, 2, true), null)
  eq('trust clamps low', applyRelationshipChoice(3, 0, 'rel_test')?.trust, 0)
  eq('trust clamps high', applyRelationshipChoice(95, 2, 'rel_truth')?.trust, 100)
  eq('truth resolves', applyRelationshipChoice(50, 2, 'rel_truth')?.resolved, true)
  eq('leave closes unresolved', applyRelationshipChoice(50, 2, 'rel_leave')?.resolved, false)

  // Final-turn relationship closure outranks deferred one-shot teaching beats.
  for (const [cellId, expectedForcedId, prepare] of [
    ['lecture', 'choose_track', (s) => ({ ...s, track: null })],
    ['library', 'discover_mentor', (s) => ({ ...s, mentorUnlocked: false })],
    ['gym', 'discover_gym', (s) => ({ ...s, gymUnlocked: false, player: { ...s.player, cognition: 60 } })],
  ]) {
    let collision = createInitialState('finance_dynasty', true)
    collision = prepare({
      ...collision,
      player: { ...collision.player, turn: 8 },
      investUnlocked: true,
      relationshipCrisis: 2,
      relationshipResolved: false,
    })
    collision = chooseDestination(collision, cellId)
    const arrived = arrive(collision, () => 0.99)
    eq(`turn-8 relationship outranks ${expectedForcedId}`, arrived.pendingEvent?.event.id, 'relationship_break')
  }

  const baseResultState = createInitialState()
  const resultFixture = {
    ...baseResultState,
    phase: 'results',
    player: { ...baseResultState.player, awakened: false },
    pendingDice: { rolls: [6, 6], originMod: -2, eraMod: 0, stateMod: 2, eventMod: 1, total: 13, tier: 'awaken', extremeState: true },
    pendingEvent: { event: { id: 'fixture', cellType: 'learn', kind: 'opportunity', weight: 0, eventMod: 0, scaledStats: [], title: '', text: '', choices: [] } },
    pendingEventChoiceId: 'fixture_choice',
    pendingCoach: { dominant: 'cognition', dominantShare: 0.7, line: '', hint: '' },
  }
  eq('awaken dice does not awaken player', finishCoach(resultFixture, () => 1).player.awakened, false)
  const mentorFixture = {
    ...resultFixture,
    pendingEvent: { event: { ...resultFixture.pendingEvent.event, id: 'mentor_hit', cellType: 'mentor' } },
    pendingEventChoiceId: 'mentor_hit',
  }
  const mentorFinished = finishCoach(mentorFixture, () => 1)
  eq('mentor hit awakens player', mentorFinished.player.awakened, true)
  eq('mentor hit unlocks dynasty', mentorFinished.financeDynastyUnlocked, true)

  // (c) tier-factor table pinned (spec §3): awaken dodges traps, big_fail fumbles boons
  eq('big_success × boon', tierFactorFor('big_success', 'opportunity'), 1.5)
  eq('awaken × boon', tierFactorFor('awaken', 'opportunity'), 2)
  eq('big_fail × boon', tierFactorFor('big_fail', 'opportunity'), 0)
  eq('awaken × trap', tierFactorFor('awaken', 'trap'), 0)
  eq('big_success × trap', tierFactorFor('big_success', 'trap'), 0.25)
  eq('big_fail × trap', tierFactorFor('big_fail', 'trap'), 1.5)
  eq('neutral follows the boon ladder', tierFactorFor('awaken', 'neutral'), 2)

  // every non-mentor campus location has a 3-event weighted table
  for (const [cellId, table] of Object.entries(LOCATION_EVENTS)) {
    if (table.length !== 3) fails.push(`${cellId}: table has ${table.length} events, want 3`)
    if (table.some((e) => e.weight <= 0)) fails.push(`${cellId}: non-positive weight`)
    if (!table.some((e) => e.kind === 'trap')) fails.push(`${cellId}: no trap event`)
  }
  return fails
})
if (simFails.length) {
  console.error('SIM CONTRACT FAILURES:\n' + simFails.join('\n'))
  await browser.close()
  process.exit(1)
}
console.log('sim contract checks (infoQuality bands, tier factors, event tables): OK')

// ---- playthrough: 8 turns of click-to-move ----
await page.click('button:has-text("走进校园")')
await page.waitForTimeout(350)

// v1.4 §1: 贵人办公室 starts cognition-locked — clicking it must be a no-op
await page.click('.building:has-text("???")')
await page.waitForTimeout(300)
const lockFail = await page.evaluate(() => {
  const s = window.__sim.getState()
  if (s.phase !== 'choose_destination') return `clicked locked 贵人办公室 → phase moved to ${s.phase}`
  return s.mentorUnlocked ? 'mentorUnlocked should be false before any library visit' : null
})
if (lockFail) throw new Error(`mentor lock: ${lockFail}`)
await shot('02-map.png') // map still shows ??? at the northeast corner

// Cycle every building (mentor included) so each location's table is exercised.
// v1.4: turn 2 = second library visit → forces the 发现贵人 beat, so 贵人办公室 (turn 5)
// is unlocked by the time we click it. Turn 1 library is consumed by the 开户 beat.
// v1.6: turn 3 = first 教学楼 visit → forces the 选方向 beat (we pick 人工智能 — the
// foresight track — so the turn-5 mentor visit exercises the 贵人信任 path).
// v1.8: turn 4 = third library visit; cognition ≥ 60 reveals both new facilities. Turn 6 =
// first gym visit → 办卡 beat, turn 7 = gym table, turn 8 = exchange table.
const BUILDINGS = ['图书馆', '图书馆', '教学楼', '图书馆', '贵人办公室', '健身房', '健身房', '对外交流中心']

for (let turn = 1; turn <= 8; turn++) {
  const target = BUILDINGS[turn - 1]
  await page.click(`.building:has-text("${target}")`)
  await page.waitForTimeout(950) // 600ms token glide + arrival draw + shock roll

  // §9a: arrival drew a defined event from the DESTINATION's table (mentor pair excepted)
  const arrivalFail = await page.evaluate((isFirstTurn) => {
    const s = window.__sim.getState()
    const ev = s.pendingEvent?.event
    if (!ev) return `phase ${s.phase}: no pendingEvent after arrival`
    // v1.3 §1: turn 1 ALWAYS forces the 开户 story beat, regardless of building
    if (isFirstTurn) return ev.id === 'open_account' ? null : `turn 1 should force open_account, got ${ev.id}`
    // v1.4 §1: the first post-开户 library visit forces the 发现贵人 beat
    if (ev.id === 'discover_mentor') {
      if (s.player.position !== 'library') return `discovery fired outside the library`
      return s.mentorUnlocked ? null : 'discovery fired but mentorUnlocked stayed false'
    }
    // v1.6 §2: the first 教学楼 visit forces the 选方向 beat
    if (ev.id === 'choose_track') return s.player.position === 'lecture' ? null : `choose_track outside lecture: ${s.player.position}`
    // v1.7 §1: the first post-开户 宿舍 visit forces the 办卡 beat
    if (ev.id === 'discover_gym') {
      if (s.player.position !== 'gym') return `discover_gym fired outside 健身房: ${s.player.position}`
      return s.gymUnlocked ? null : 'gym beat fired but gymUnlocked stayed false'
    }
    if (s.player.position === 'mentor') {
      if (!ev.id.startsWith('mentor_')) return `mentor draw returned ${ev.id}`
      // v1.6 §2: the mentorTrusted flag must agree with the 有能力 × 对口 rule
      const trusted = s.track === 'ai' && s.player.cognition >= 60
      return (s.pendingEvent.mentorTrusted ?? false) === trusted ? null : 'mentorTrusted flag mismatch'
    }
    // v1.8 §2: both new facilities are cognition-gated; arrival proves the threshold opened.
    if ((s.player.position === 'gym' || s.player.position === 'exchange') && s.player.cognition < 60) {
      return `${s.player.position} visited below the cognition gate: ${s.player.cognition}`
    }
    const table = window.__sim.checks.LOCATION_EVENTS[s.player.position] ?? []
    return table.some((e) => e.id === ev.id) ? null : `event ${ev.id} not in ${s.player.position} table`
  }, turn === 1)
  if (arrivalFail) throw new Error(`turn ${turn} arrival: ${arrivalFail}`)

  await page.click('button:has-text("掷骰子")')
  await page.waitForTimeout(3000) // v1.4 dice juice: ~1.6s decel tumble + 7×120ms formula type-in + margin
  await shot(`t${turn}-2-dice.png`)
  await page.click('button:has-text("继续")')
  await page.waitForTimeout(400)
  if (turn === 1) await shot('t1-3-event.png')
  if (turn === 3) await shot('t3-3-event.png') // v1.6: the 4-choice 选方向 card
  if (turn === 6) await shot('t6-3-event.png') // v1.7: the 办卡 beat
  if (turn === 8) await shot('t8-3-event.png') // v1.7: the 对外交流中心 table
  // v1.6 §2: at the 选方向 beat, bet on 人工智能 (the foresight track) — 贵人信任 needs 对口
  const pendingEventId = await page.evaluate(() => window.__sim.getState().pendingEvent?.event.id)
  if (pendingEventId === 'choose_track') await page.locator('.btn-choice:has-text("人工智能")').click()
  else await page.locator('.btn-choice').first().click()
  await page.waitForTimeout(350)

  // v1.3 §1: turn 1 (开户) skips the invest beat entirely — event → results directly
  if (turn > 1) {
    // v1.6 §1: turn 2 is everyone's FIRST trade — 0 reviewed trades → all advice blind
    if (turn === 2) {
      const bands = await page.evaluate(() =>
        Object.values(window.__sim.getState().pendingMarketAdvices ?? {}).map((a) => a.band),
      )
      if (bands.length !== 3 || bands.some((b) => b !== 'blind')) throw new Error(`turn 2 advice should be all blind, got ${bands}`)
    }
    if (turn === 2 || turn === 4) await shot(`t${turn}-4-invest.png`)
  }

  // §9a (×0 pairings): the alt trajectory's scaled stats must zero out on awaken×trap /
  // big_fail×boon — exact zeros, unaffected by clamping. Mentor turns use their own rule.
  const pairingFail = await page.evaluate(() => {
    const s = window.__sim.getState()
    const ev = s.pendingEvent?.event
    const alt = s.pendingAltFate
    if (!ev || !alt) return 'missing pendingEvent/pendingAltFate after choice'
    for (const [k, v] of Object.entries(alt.eventDelta)) {
      if (typeof v !== 'number' || !Number.isFinite(v)) return `alt delta ${k} is ${v}`
    }
    if (ev.cellType === 'mentor') return null
    const zeroPairing =
      (alt.diceTier === 'awaken' && ev.kind === 'trap') ||
      (alt.diceTier === 'big_fail' && ev.kind === 'opportunity')
    if (zeroPairing) {
      for (const stat of ev.scaledStats) {
        if ((alt.eventDelta[stat] ?? 0) !== 0) {
          return `${alt.diceTier}×${ev.kind} should zero scaled stat ${stat}, got ${alt.eventDelta[stat]}`
        }
      }
    }
    return null
  })
  if (pairingFail) throw new Error(`turn ${turn} pairing: ${pairingFail}`)

  if (turn > 1) await page.click('button:has-text("确认交易")') // turn 1: 开户 beat, no trade
  await page.waitForTimeout(4000) // coach typewriter (18ms/char) + attribution bar fill
  await shot(`t${turn}-5-results.png`)
  const last = turn === 8
  await page.click(last ? 'button:has-text("查看总结")' : 'button:has-text("下一回合")')
  await page.waitForTimeout(500)
}

await shot('09-summary.png')
await browser.close()

if (consoleErrors.length) {
  console.error('CONSOLE ERRORS:\n' + consoleErrors.join('\n'))
  process.exitCode = 1
} else {
  console.log('OK — 8 turns played (click-to-move), arrival + ×0-pairing checks passed, 0 console errors. Screenshots in 8_lifegame/showcase/')
}
