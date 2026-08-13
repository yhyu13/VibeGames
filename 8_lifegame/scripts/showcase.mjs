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
await page.evaluate(() => window.__sim.store.setState({ rand: () => 0.5 }))
await shot('01-opening.png')

// ---- seeded contract checks (spec §9) — pure-function pins via the DEV __sim hook ----
const simFails = await page.evaluate(() => {
  const { checks } = window.__sim
  const {
    infoQuality,
    buildCandles,
    investAdvice,
    priceAt,
    endPriceAt,
    accountValue,
    allPrices,
    createPaperAccount,
    executeOrder,
    resolveOrder,
    unrealizedPnl,
    aggregateCandles,
    frameCandlesFor,
    tierFactorFor,
    LOCATION_EVENTS,
    CAMPUS_LOCATION_GUIDES,
    ASSETS,
    MARKET_NEWS,
    SPECIAL_EVENTS,
    SPECIAL_EVENT_TRIGGER_PROB,
    LIFE_TIMELINE,
    SEMESTER_YEAR,
    INTRO_TURN_LIMIT,
    createInitialState,
    chooseDestination,
    arrive,
    finishCoach,
    relationshipEventFor,
    applyRelationshipChoice,
    loveEventFor,
    loveStageAfterChoice,
    shouldReunite,
    christmasContext,
    mentorHitProbFor,
    specialEventsFor,
    mentorEventsFor,
    MENTOR_EVENTS_BY_TRACK,
    LOVE_FIRST_TURN,
    LOVE_SECOND_TURN,
    LOVE_THIRD_TURN,
    TOWN_LIFE_GOAL_WEALTH,
    DYNASTY_LIFE_GOAL_WEALTH,
    MENTOR_FAVOR_HIT_BONUS,
    MENTOR_FAVOR_MAX,
    lifeGoalProgressFor,
  } = checks
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
  const aIndex = ASSETS.find((asset) => asset.id === 'a_index')
  const hkIndex = ASSETS.find((asset) => asset.id === 'hk_index')
  eq('0 reviews → blind', investAdvice(aIndex, 3, 0, () => 0).band, 'blind')
  eq('1 review → noisy', investAdvice(aIndex, 3, 1, () => 0).band, 'noisy')
  eq('2 reviews → clear', investAdvice(aIndex, 3, 2, () => 0).band, 'clear')
  eq('3 reviews → sharp', investAdvice(aIndex, 3, 3, () => 0).band, 'sharp')
  // faithful labels track the coming tick's bucket (a_index t3 = +5, t2 = −3; hk_index t1 = −1)
  eq('faithful up-tick → 适宜投资', investAdvice(aIndex, 3, 3, () => 0).label, '适宜投资')
  eq('faithful down-tick → 不适宜投资', investAdvice(aIndex, 2, 3, () => 0).label, '不适宜投资')
  eq('faithful flat-tick → 谨慎参与', investAdvice(hkIndex, 1, 3, () => 0).label, '谨慎参与')
  eq('unfaithful inverts the label', investAdvice(aIndex, 3, 1, () => 0.99).label, '不适宜投资')
  let adviceDraws = 0
  investAdvice(aIndex, 3, 0, () => (adviceDraws++, 0))
  eq('blind band consumes 0 rand draws', adviceDraws, 0)

  // v2.2: 13 campus weeks + 3 winter-break weeks + next-semester opening.
  eq('intro calendar length', INTRO_TURN_LIMIT, 17)
  eq('campus semester weeks', checks.CAMPUS_SEMESTER_WEEKS, 13)
  eq('winter break weeks', checks.WINTER_BREAK_WEEKS, 3)
  eq('Christmas turn', checks.CHRISTMAS_TURN, 14)
  eq('winter reunion turn', checks.WINTER_REUNION_TURN, 16)
  eq('next semester turn', checks.NEXT_SEMESTER_TURN, 17)
  for (const asset of ASSETS) {
    eq(`${asset.id} has 17 ticks`, asset.ticks.length, INTRO_TURN_LIMIT)
    eq(`${asset.id} has 17 news pairs`, MARKET_NEWS[asset.id]?.length, INTRO_TURN_LIMIT)
  }
  const healthyLove = {
    ...createInitialState().player,
    cognition: checks.LOVE_COGNITION_THRESHOLD,
    stamina: checks.LOVE_WELLBEING_THRESHOLD,
    mood: checks.LOVE_WELLBEING_THRESHOLD,
  }
  eq('healthy Christmas impression', checks.christmasImpressionFor(healthyLove), 'good')
  eq('ordinary Christmas impression', checks.christmasImpressionFor({ ...healthyLove, cognition: 59 }), 'ordinary')
  eq('campus guide covers all event locations plus mentor', Object.keys(CAMPUS_LOCATION_GUIDES).length, 8)

  const christmasBase = createInitialState()
  const christmasReady = {
    ...christmasBase,
    phase: 'walking',
    player: {
      ...christmasBase.player,
      turn: checks.CHRISTMAS_TURN,
      cognition: checks.LOVE_COGNITION_THRESHOLD,
      stamina: checks.LOVE_WELLBEING_THRESHOLD,
      mood: checks.LOVE_WELLBEING_THRESHOLD,
    },
    pendingDestinationId: 'start',
  }
  const christmasArrived = arrive(christmasReady, () => 0.99)
  eq('week 14 forces Christmas event', christmasArrived.pendingEvent?.event.id, 'christmas_encounter')
  eq('winter weeks suppress world shocks', christmasArrived.pendingSpecialEvent, null)
  const christmasChosen = checks.chooseEvent({
    ...christmasArrived,
    phase: 'event',
    pendingDice: {
      rolls: [4, 4], originMod: 0, eraMod: 0, stateMod: 0, eventMod: 0,
      total: 8, tier: 'success', extremeState: false,
    },
  }, 'love_be_present', () => 0.5)
  eq('Christmas stores good impression', christmasChosen.loveImpression, 'good')
  eq('Christmas never awakens player', christmasChosen.player.awakened, false)
  eq('Christmas never unlocks dynasty', christmasChosen.financeDynastyUnlocked, false)

  // v2.5: the love line moved INTO the semester — first encounter at the welcome party
  // (turn 2+), 期中 library meeting (6+), 期末 party (10+); Christmas is a reunion now.
  eq('love first beat waits before turn 2', loveEventFor(1, 'none'), null)
  eq('love first beat fires from turn 2', loveEventFor(2, 'none')?.id, 'love_first_encounter')
  eq('love second beat waits before turn 6', loveEventFor(5, 'met'), null)
  eq('love second beat fires from turn 6', loveEventFor(6, 'met')?.id, 'love_second_meeting')
  eq('love third beat fires from turn 10', loveEventFor(10, 'knowing')?.id, 'love_third_party')
  eq('love close stops the line', loveEventFor(12, 'close'), null)
  eq('love stage none→met', loveStageAfterChoice('none', 'love_first_join'), 'met')
  eq('love stage met→knowing', loveStageAfterChoice('met', 'love_second_share'), 'knowing')
  eq('love stage close on accept', loveStageAfterChoice('knowing', 'love_third_accept'), 'close')
  eq('love stage stays knowing on raincheck', loveStageAfterChoice('knowing', 'love_third_raincheck'), 'knowing')
  eq('close stage reunites at winter', shouldReunite('ordinary', 'close'), true)
  eq('ordinary impression alone reflects', shouldReunite('ordinary', 'none'), false)
  eq('christmas context adapts to stage', christmasContext('met').title.includes('再遇'), true)

  const loveBase = createInitialState()
  const loveArrived = arrive({
    ...loveBase,
    phase: 'walking',
    player: { ...loveBase.player, turn: 2 },
    pendingDestinationId: 'start',
  }, () => 0.99)
  eq('turn 2 arrival forces the love first beat', loveArrived.pendingEvent?.event.id, 'love_first_encounter')
  const loveChosen = checks.chooseEvent({
    ...loveArrived,
    phase: 'event',
    pendingDice: {
      rolls: [4, 4], originMod: 0, eraMod: 0, stateMod: 0, eventMod: 0,
      total: 8, tier: 'success', extremeState: false,
    },
  }, 'love_first_join', () => 0.5)
  eq('love first beat stores met stage', loveChosen.loveStage, 'met')
  eq('love never awakens player', loveChosen.player.awakened, false)

  // v2.5: 贵人多元化 — track personas + 好感 (favor) raises the office hit probability.
  eq('favor 0 keeps the frozen town base', mentorHitProbFor('town_exam_kid', false, 0), 0.1)
  eq('favor raises the town hit prob', mentorHitProbFor('town_exam_kid', false, 2), 0.1 + MENTOR_FAVOR_HIT_BONUS * 2)
  eq('favor caps at MENTOR_FAVOR_MAX', mentorHitProbFor('town_exam_kid', false, 9), 0.1 + MENTOR_FAVOR_HIT_BONUS * MENTOR_FAVOR_MAX)
  eq('trusted stays 0.9 for everyone', mentorHitProbFor('town_exam_kid', true, 0), 0.9)
  eq('dynasty base stays 0.3', mentorHitProbFor('finance_dynasty', false, 0), 0.3)
  eq('mentor persona follows the ai track', mentorEventsFor('ai').hit.title.includes('技术前辈'), true)
  eq('mentor persona follows the finance track', mentorEventsFor('finance').hit.title.includes('券商'), true)
  eq('no track falls back to the generic pair', mentorEventsFor(null).hit.id, 'mentor_hit')
  eq('mentor hit/miss ids stay load-bearing', mentorEventsFor('academia').miss.id, 'mentor_miss')

  // v2.5: 贵人好感 applies at choice time for choice events, clamped to MENTOR_FAVOR_MAX.
  const favorFixture = {
    ...createInitialState(),
    phase: 'event',
    pendingSpecialChoice: {
      event: {
        id: 'fixture_favor', label: '引荐', icon: '👁', weight: 0, wealthPct: 0,
        delta: {}, text: '', unexpected: false, mentorFavor: 2,
        choices: [{ id: 'favor_take', label: '接受', wealthPct: 0, delta: {} }],
      },
    },
  }
  eq('mentor favor applies at choice time', checks.chooseSpecialChoice(favorFixture, 'favor_take').mentorFavor, 2)
  eq('mentor favor clamps at MENTOR_FAVOR_MAX',
    checks.chooseSpecialChoice({
      ...favorFixture,
      mentorFavor: 3,
      pendingSpecialChoice: { event: { ...favorFixture.pendingSpecialChoice.event, mentorFavor: 5 } },
    }, 'favor_take').mentorFavor, MENTOR_FAVOR_MAX)

  // v2.5: 人生目标 — per-origin wealth goal set at the opening card.
  eq('town life goal', createInitialState().lifeGoalWealth, TOWN_LIFE_GOAL_WEALTH)
  eq('dynasty life goal', createInitialState('finance_dynasty', true).lifeGoalWealth, DYNASTY_LIFE_GOAL_WEALTH)
  // v2.5 self-critique: progress is NET of the starting wealth — 0% at the start line,
  // 100% at the goal; a town run at 130k shows 60%, not the misleading 87%.
  eq('town progress starts at 0%', lifeGoalProgressFor('town_exam_kid', 100000), 0)
  eq('town progress 130k = 60% net', lifeGoalProgressFor('town_exam_kid', 130000), 60)
  eq('town progress clamps at 100%', lifeGoalProgressFor('town_exam_kid', 180000), 100)
  eq('dynasty progress starts at 0%', lifeGoalProgressFor('finance_dynasty', 300000), 0)
  eq('dynasty progress 350k = 50% net', lifeGoalProgressFor('finance_dynasty', 350000), 50)

  // v2.5: origin-aware special-event pools — town keeps the 49-event 小镇 pool, dynasty
  // swaps the 小镇 drama for 家族 drama, both share the market/friends/health slices.
  if (specialEventsFor('town_exam_kid').length < 49) fails.push(`town pool shrank to ${specialEventsFor('town_exam_kid').length}`)
  const dynastyPool = specialEventsFor('finance_dynasty')
  if (dynastyPool.length < 30) fails.push(`dynasty pool too small: ${dynastyPool.length}`)
  if (!dynastyPool.some((event) => event.id.startsWith('dy_'))) fails.push('dynasty pool missing 世家 events')
  if (!dynastyPool.some((event) => event.label.includes('信托'))) fails.push('dynasty pool missing 家族信托')
  if (!specialEventsFor('town_exam_kid').some((event) => (event.mentorFavor ?? 0) > 0)) fails.push('no mentor-favor events in the town pool')
  if (!specialEventsFor('finance_dynasty').some((event) => event.id === 'bull_market')) fails.push('dynasty pool lost the shared market shocks')

  const winterGrowthArrived = arrive({
    ...christmasBase,
    phase: 'walking',
    player: { ...christmasBase.player, turn: checks.WINTER_GROWTH_TURN },
    pendingDestinationId: 'library',
  }, () => 0.99)
  eq('week 15 forces winter growth', winterGrowthArrived.pendingEvent?.event.id, 'winter_growth')

  const goodReunionArrived = arrive({
    ...christmasBase,
    phase: 'walking',
    player: { ...christmasBase.player, turn: checks.WINTER_REUNION_TURN },
    loveImpression: 'good',
    pendingDestinationId: 'start',
  }, () => 0.99)
  eq('good impression forces winter reunion', goodReunionArrived.pendingEvent?.event.id, 'winter_reunion')
  const ordinaryReunionArrived = arrive({
    ...christmasBase,
    phase: 'walking',
    player: { ...christmasBase.player, turn: checks.WINTER_REUNION_TURN },
    loveImpression: 'ordinary',
    pendingDestinationId: 'start',
  }, () => 0.99)
  eq('ordinary impression forces reflection', ordinaryReunionArrived.pendingEvent?.event.id, 'winter_reflection')

  const mentorOpening = {
    ...christmasBase,
    phase: 'walking',
    player: { ...christmasBase.player, turn: checks.NEXT_SEMESTER_TURN, cognition: 60 },
    mentorUnlocked: true,
    track: 'ai',
    pendingDestinationId: 'mentor',
  }
  const mentorHitOpening = arrive(mentorOpening, () => 0.89)
  eq('week 17 trusted mentor hit below 90%', mentorHitOpening.pendingEvent?.event.id, 'mentor_hit')
  eq('week 17 exposes trusted mentor flag', mentorHitOpening.pendingEvent?.mentorTrusted, true)
  const mentorMissOpening = arrive(mentorOpening, () => 0.9)
  eq('week 17 trusted mentor remains probabilistic', mentorMissOpening.pendingEvent?.event.id, 'mentor_miss')
  const blockedOpening = arrive({
    ...mentorOpening,
    mentorUnlocked: false,
    pendingDestinationId: 'library',
  }, () => 0)
  eq('undiscovered mentor blocks opening encounter', blockedOpening.pendingEvent?.event.id, 'next_semester_mentor_blocked')

  // v2.4: seven products, real price levels + 2014 pre-history, spot order model, paper accounts.
  eq('seven investment products', ASSETS.length, 7)
  const aShare = ASSETS.find((asset) => asset.id === 'a_index')
  eq('a_index semester open ≈ 2015 level (3203)', Math.round(priceAt(aShare, 1)), 3203)
  eq('a_index price compounds closed ticks', Math.round(priceAt(aShare, 3)),
    Math.round(aShare.basePrice * aShare.preHistory.reduce((p, r) => p * (1 + r / 100), 1) * (1 + aShare.ticks[0] / 100) * (1 + aShare.ticks[1] / 100)))
  eq('pre-history feeds the tape', buildCandles([...aShare.preHistory, ...aShare.ticks], aShare.preHistory.length + 3).length, aShare.preHistory.length + 2)
  eq('every asset has 40 pre-semester weeks', ASSETS.every((a) => a.preHistory.length === 40), true)

  const acct = createPaperAccount(100000)
  const buy = executeOrder(acct, aShare, 'buy', 10000, priceAt(aShare, 3))
  eq('buy executes at the open price', buy.order.amount > 0, true)
  eq('buy units = amount ÷ price', buy.order.units, Math.round(10000 / priceAt(aShare, 3)))
  eq('cash drops by cost + fee', Math.round(buy.account.cash), 100000 - Math.round(buy.order.amount + buy.order.fee))
  const sell = executeOrder(buy.account, aShare, 'sell', 100000, priceAt(aShare, 3))
  eq('sell clamps to held units', sell.order.units, buy.order.units)
  eq('sell empties the position', Object.keys(sell.account.positions).length, 0)
  eq('round trip keeps cash minus double fee', Math.round(accountValue(sell.account, allPrices(3))), 100000 - 2 * Math.round(buy.order.fee))

  const shockPrice = endPriceAt(aShare, 3, { a_index: 4 })
  eq('asset shock moves the week close', Math.round(shockPrice),
    Math.round(priceAt(aShare, 3) * (1 + (aShare.ticks[2] + 4) / 100)))
  const holdRes = resolveOrder(createPaperAccount(100000), 'gold', 'hold', 0, 3, undefined)
  eq('hold executes no order', holdRes.result.side, 'hold')
  eq('hold amount is zero', holdRes.result.amount, 0)
  eq('account total P&L starts at zero', holdRes.result.totalPnlAbs, 0)

  // v2.4 K线周期: daily = 5 × merged weeks; 周K regroups to the weekly count; frames cap bars.
  const btcAsset = ASSETS.find((asset) => asset.id === 'btc')
  const mergedWeeks = btcAsset.preHistory.length + btcAsset.ticks.length
  eq('daily series = 5 × merged weeks', btcAsset.daily.length, 5 * mergedWeeks)
  const fullDaily = buildCandles(btcAsset.daily, btcAsset.daily.length + 1)
  eq('weekly aggregation regroups 5 daily bars', aggregateCandles(fullDaily, 5).length, mergedWeeks)
  eq('day frame caps at 60 bars', frameCandlesFor(btcAsset, 3, 'day', []).length, 60)
  eq('monthly frame caps at 12 bars', frameCandlesFor(btcAsset, 3, 'month', fullDaily).length, 12)
  eq('year frame caps at 2 bars', frameCandlesFor(btcAsset, 3, 'year', fullDaily).length, 2)

  // v2.4: choice-based special events — the card clears, applies the chosen option, stays in 'event'.
  const choiceBase = createInitialState()
  const choiceFixture = {
    ...choiceBase,
    phase: 'event',
    pendingSpecialChoice: { event: SPECIAL_EVENTS.find((e) => e.id === 'fr_friend_borrow') },
  }
  const chosen = checks.chooseSpecialChoice(choiceFixture, 'fr_borrow_all')
  eq('special choice clears the pending card', chosen.pendingSpecialChoice, null)
  eq('special choice applies the chosen wealth%', chosen.player.wealth, Math.round(choiceBase.player.wealth * (1 - 3 / 100)))
  eq('special choice applies the chosen mood delta', chosen.player.mood, Math.min(100, choiceBase.player.mood + 4))
  eq('special choice keeps the event phase', chosen.phase, 'event')

  eq('special-event trigger probability', SPECIAL_EVENT_TRIGGER_PROB, 0.55)
  if (SPECIAL_EVENTS.length < 10) fails.push(`special event pool too small: ${SPECIAL_EVENTS.length}`)
  if (!SPECIAL_EVENTS.some((event) => (event.delta.cognition ?? 0) >= 20)) fails.push('no high-impact cognition event')
  if (!SPECIAL_EVENTS.some((event) => (event.delta.stamina ?? 0) + (event.delta.mood ?? 0) >= 30)) fails.push('no high-impact wellbeing event')
  if (!SPECIAL_EVENTS.some((event) => Object.values(event.delta).some((value) => (value ?? 0) < 0) || event.wealthPct < 0)) fails.push('no setback event')
  eq('timeline begins at 2014 entering university', LIFE_TIMELINE[0]?.year, 2014)
  eq('timeline first milestone is 进入大学', LIFE_TIMELINE[0]?.label, '进入大学')
  eq('semester year', SEMESTER_YEAR, 2014)
  eq('timeline reaches next semester in 2015', LIFE_TIMELINE.at(-1)?.year, 2015)

  // v1.9 / D13: finance-dynasty unlock, origin-aware starts, and typed relationship sequencing.
  const dynasty = createInitialState('finance_dynasty', true)
  eq('dynasty run origin', dynasty.player.origin, 'finance_dynasty')
  eq('dynasty starting wealth', dynasty.player.wealth, 300000)
  eq('dynasty parallel origin', dynasty.altPlayer.origin, 'town_exam_kid')
  eq('relationship week 3 stage 0', relationshipEventFor(3, 0, false)?.id, 'relationship_doubt')
  eq('relationship waits before week 3', relationshipEventFor(2, 0, false), null)
  eq('relationship week 7 stage 1', relationshipEventFor(7, 1, false)?.id, 'relationship_money')
  eq('relationship week 11 stage 2', relationshipEventFor(11, 2, false)?.id, 'relationship_break')
  eq('resolved relationship stops', relationshipEventFor(13, 2, true), null)
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
      player: { ...collision.player, turn: 13 },
      investUnlocked: true,
      relationshipCrisis: 2,
      relationshipResolved: false,
    })
    collision = chooseDestination(collision, cellId)
    const arrived = arrive(collision, () => 0.99)
    eq(`week-13 relationship outranks ${expectedForcedId}`, arrived.pendingEvent?.event.id, 'relationship_break')
  }

  const baseResultState = createInitialState()
  const resultFixture = {
    ...baseResultState,
    phase: 'results',
    player: { ...baseResultState.player, cognition: 60, awakened: false },
    pendingDice: { rolls: [6, 6], originMod: -2, eraMod: 0, stateMod: 2, eventMod: 1, total: 13, tier: 'awaken', extremeState: true },
    pendingEvent: { event: { id: 'fixture', cellType: 'learn', kind: 'opportunity', weight: 0, eventMod: 0, scaledStats: [], title: '', text: '', choices: [] } },
    pendingEventChoiceId: 'fixture_choice',
    pendingCoach: { dominant: 'cognition', dominantShare: 0.7, line: '', hint: '' },
  }
  eq('awaken dice does not awaken player', finishCoach(resultFixture, () => 1).player.awakened, false)
  const noInvestReviewFixture = {
    ...resultFixture,
    pendingInvestment: resolveOrder(createPaperAccount(100000), 'gold', 'hold', 0, 3, undefined).result,
  }
  eq('hold earns no review credit', finishCoach(noInvestReviewFixture, () => 1).reviewCredits, 0)
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
console.log('sim contract checks (17-week calendar, winter romance, probabilistic mentor, seven products): OK')

// ---- playthrough: 13 campus weeks + 3 winter-break weeks + next-semester opening ----
// v2.5: the opening is a 2-step cinematic (出身故事 → 人生目标) before 走进校园.
await page.click('button:has-text("接下来")')
await page.waitForTimeout(350)
await shot('01b-goals.png')
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
await shot('02-map.png') // map still shows ??? at locked facilities

// Visible buildings must state their likely value direction before travel.
const guideFail = await page.evaluate(() => {
  const visible = [...document.querySelectorAll('.building:not(.building-locked)')]
  if (visible.length < 5) return `expected at least 5 visible buildings, got ${visible.length}`
  const missing = visible.filter((el) => !el.querySelector('.building-guide')).map((el) => el.textContent)
  return missing.length ? `missing value chips: ${missing.join(', ')}` : null
})
if (guideFail) throw new Error(`campus guidance: ${guideFail}`)

// Cycle through every building, then play the three forced winter-break beats and opening encounter.
// Week 2's library visit reveals the mentor, week 3 chooses AI, and later visits raise cognition.
const BUILDING_INDEXES = [1, 1, 4, 1, 5, 6, 6, 7, 2, 3, 0, 1, 7, 0, 1, 2, 5]

for (let turn = 1; turn <= 17; turn++) {
  const targetIndex = BUILDING_INDEXES[turn - 1]
  await page.locator('.building').nth(targetIndex).click()
  const afterClick = await page.evaluate(() => ({
    phase: window.__sim.getState().phase,
    pendingDestinationId: window.__sim.getState().pendingDestinationId,
  }))
  if (afterClick.phase !== 'walking') {
    throw new Error(`turn ${turn} click did not choose building ${targetIndex}: ${JSON.stringify(afterClick)}`)
  }
  await page.waitForTimeout(950) // 600ms token glide + arrival draw + shock roll

  // §9a: arrival drew a defined event from the DESTINATION's table (mentor pair excepted)
  const arrivalFail = await page.evaluate((isFirstTurn) => {
    const s = window.__sim.getState()
    const ev = s.pendingEvent?.event
    if (!ev) return `phase ${s.phase}: no pendingEvent after arrival; position=${s.player.position}; cognition=${s.player.cognition}`
    // v1.3 §1: turn 1 ALWAYS forces the 开户 story beat, regardless of building
    if (isFirstTurn) return ev.id === 'open_account' ? null : `turn 1 should force open_account, got ${ev.id}`
    if (s.player.turn === window.__sim.checks.CHRISTMAS_TURN) {
      return ev.id === 'christmas_encounter' ? null : `Christmas week returned ${ev.id}`
    }
    if (s.player.turn === window.__sim.checks.WINTER_GROWTH_TURN) {
      return ev.id === 'winter_growth' ? null : `winter growth week returned ${ev.id}`
    }
    if (s.player.turn === window.__sim.checks.WINTER_REUNION_TURN) {
      return ['winter_reunion', 'winter_reflection'].includes(ev.id) ? null : `winter reunion week returned ${ev.id}`
    }
    if (s.player.turn === window.__sim.checks.NEXT_SEMESTER_TURN) {
      return ['mentor_hit', 'mentor_miss', 'next_semester_mentor_blocked'].includes(ev.id)
        ? null
        : `next-semester opening returned ${ev.id}`
    }
    // v2.5: love beats are semester injections, not location-table draws — accepted anywhere
    // they land (the playthrough's building sequence puts 初遇 at t4, 期中 at t7, 期末 at t10).
    if (['love_first_encounter', 'love_second_meeting', 'love_third_party'].includes(ev.id)) {
      return s.player.turn > 13 ? `love beat leaked into week ${s.player.turn}` : null
    }
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
  // v2.4 robustness: a drawn 人生抉择 card sits BEFORE the location card — resolve it first
  // so the location choice below always targets the right card.
  if (await page.locator('.event-panel-special .btn-choice').first().isVisible()) {
    await page.locator('.event-panel-special .btn-choice').first().click()
    await page.waitForTimeout(300)
  }
  if (turn === 1) await shot('t1-3-event.png')
  if (turn === 3) await shot('t3-3-event.png') // v1.6: the 4-choice 选方向 card
  if (turn === 6) await shot('t6-3-event.png') // v1.7: the 办卡 beat
  if (turn === 8) await shot('t8-3-event.png') // v1.7: the 对外交流中心 table
  if (turn === 13) await shot('t13-3-event.png') // semester's final event
  // v1.6 §2: at the 选方向 beat, bet on 人工智能 (the foresight track) — 贵人信任 needs 对口
  const pendingEventId = await page.evaluate(() => window.__sim.getState().pendingEvent?.event.id)
  if (['love_first_encounter', 'love_second_meeting', 'love_third_party'].includes(pendingEventId)) {
    await shot(`t${turn}-love.png`) // v2.5: the semester love beats get their own screenshots
  }
  if (pendingEventId === 'choose_track') await page.locator('.btn-choice:has-text("人工智能")').click()
  else await page.locator('.btn-choice').first().click()
  await page.waitForTimeout(350)

  // v1.3 §1: turn 1 (开户) skips the invest beat entirely — event → results directly
  if (turn > 1) {
    // v1.6 §1: turn 2 is everyone's FIRST trade — 0 reviewed trades → all advice blind
    if (turn === 2) {
      const reviewStatus = await page.locator('.review-skill-status').innerText()
      if (!reviewStatus.includes('认知达到 60 解锁') || (!reviewStatus.includes('/60') && !reviewStatus.includes('已解锁'))) {
        throw new Error(`review threshold should be visible before trading, got ${reviewStatus}`)
      }
      const bands = await page.evaluate(() =>
        Object.values(window.__sim.getState().pendingMarketAdvices ?? {}).map((a) => a.band),
      )
      if (bands.length !== 7 || bands.some((b) => b !== 'blind')) throw new Error(`turn 2 advice should be all blind, got ${bands}`)
    }
    if (turn === 2 || turn === 4) await shot(`t${turn}-4-invest.png`)
  }

  // Timeline is explanatory, visible throughout the complete 17-week calendar.
  const timelineFail = await page.evaluate((expectedWeek) => {
    const panel = document.querySelector('.timeline-panel')
    if (!panel) return 'timeline panel missing'
    if (!panel.textContent?.includes('2014') || !panel.textContent?.includes('2015')) return `timeline anchors missing: ${panel.textContent}`
    if (!panel.textContent?.includes('进入大学')) return `timeline first milestone missing: ${panel.textContent}`
    if (!panel.textContent?.includes('历史背景 ≠ 投资建议')) return 'timeline disclaimer missing'
    if (panel.querySelectorAll('.semester-track > span').length !== 17) return 'timeline does not show 17 calendar weeks'
    const active = panel.querySelector('.semester-week-current')?.textContent?.trim()
    const expected = expectedWeek === 17 ? '春' : String(expectedWeek)
    return active === expected ? null : `active timeline week ${active}, want ${expected}`
  }, turn)
  if (timelineFail) throw new Error(`turn ${turn} timeline: ${timelineFail}`)

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

  if (turn > 1) {
    const marketUiFail = await page.evaluate(() => {
      if (document.querySelectorAll('.invest-row').length !== 7) return 'investment panel does not show seven rows'
      if (document.querySelectorAll('.risk-chip').length !== 7) return 'risk chips missing'
      if (!document.querySelector('.no-invest-button')) return 'explicit hold action missing'
      if (!document.querySelector('.trade-mode-tabs')) return 'buy/sell tabs missing'
      if (!document.querySelector('.paper-account-bar')) return 'paper account bar missing'
      if (!document.querySelector('.invest-quote')) return 'price quotes missing'
      return null
    })
    if (marketUiFail) throw new Error(`turn ${turn} market UI: ${marketUiFail}`)

    if (turn === 2) {
      // v2.4: the 模拟盘 opens with the origin's starting wealth as 初始资金
      const capitalFail = await page.evaluate(() => {
        const paper = window.__sim.getState().paper
        if (paper.initialCapital !== 100000) return `paper initial capital ${paper.initialCapital}`
        return null
      })
      if (capitalFail) throw new Error(`turn 2 initial capital: ${capitalFail}`)
      await page.click('.no-invest-button')
      const noInvestStateFail = await page.evaluate(() => {
        const investment = window.__sim.getState().pendingInvestment
        if (!investment) return 'hold action produced no result'
        if (investment.side !== 'hold' || investment.amount !== 0 || investment.units !== 0 || investment.fee !== 0) {
          return `bad hold result ${JSON.stringify(investment)}`
        }
        return null
      })
      if (noInvestStateFail) throw new Error(`turn 2 hold: ${noInvestStateFail}`)
    } else {
      // v2.4: buy 50% of available cash every week — positions persist across weeks
      await page.locator('.quick-pct-button:has-text("50%")').click()
      await page.click('.invest-actions .btn-primary')
      const orderFail = await page.evaluate(() => {
        const investment = window.__sim.getState().pendingInvestment
        if (!investment) return 'buy produced no result'
        if (investment.side !== 'buy' || investment.amount <= 0) return `bad buy result ${JSON.stringify(investment)}`
        return null
      })
      if (orderFail) throw new Error(`turn ${turn} buy: ${orderFail}`)
    }
  } // turn 1: 开户 beat, no trade
  await page.waitForTimeout(4000) // coach typewriter (18ms/char) + attribution bar fill
  if (turn === 2) {
    const holdCopy = await page.locator('.invest-result').innerText()
    if (!holdCopy.includes('本周不操作') || !holdCopy.includes('总盈亏')) {
      throw new Error(`turn 2 hold result copy: ${holdCopy}`)
    }
    const parallelCopy = await page.locator('.fate-investment-context').innerText()
    if (!parallelCopy.includes('不操作') || !parallelCopy.includes('继续持有')) {
      throw new Error(`turn 2 parallel hold copy: ${parallelCopy}`)
    }
  } else if (turn > 2) {
    const parallelCopy = await page.locator('.fate-investment-context').innerText()
    if (!parallelCopy.includes('买入') || !parallelCopy.includes('@')) {
      throw new Error(`turn ${turn} parallel order copy: ${parallelCopy}`)
    }
  }
  await shot(`t${turn}-5-results.png`)
  const last = turn === 17
  await page.click(last ? 'button:has-text("查看总结")' : 'button:has-text("下一周")')
  await page.waitForTimeout(500)
}

await shot('18-summary.png')

const summaryOutcomeFail = await page.evaluate(() => {
  const state = window.__sim.getState()
  const pending = document.querySelector('.summary-awakening-pending')
  const success = document.querySelector('.summary-awakening-success')
  if (state.player.awakened) {
    if (!success?.textContent?.includes('本局已觉醒')) return `awakened playthrough missing success notice: ${success?.textContent ?? ''}`
    return pending ? 'awakened playthrough also rendered failure reasons' : null
  }
  if (!pending) return 'unawakened playthrough missing reason notice'
  const copy = pending.textContent ?? ''
  if (!copy.includes('尚未觉醒') || !copy.includes('原因')) return `unawakened heading missing: ${copy}`
  if (!copy.includes('贵人办公室')) return `mentor-recognition reason missing: ${copy}`
  return success ? 'unawakened playthrough also rendered success notice' : null
})
if (summaryOutcomeFail) throw new Error(`summary awakening result: ${summaryOutcomeFail}`)

// v2.5: the summary renders the 人生目标 verdicts set at the opening card.
const goalFail = await page.evaluate(() => {
  const goals = document.querySelector('.summary-goals')
  if (!goals) return 'life goal section missing on the summary'
  const copy = goals.textContent ?? ''
  if (!copy.includes('财富目标')) return `wealth goal missing: ${copy}`
  if (!copy.includes('爱情目标')) return `love goal missing: ${copy}`
  return null
})
if (goalFail) throw new Error(`summary goals: ${goalFail}`)

// v2.5: an awakened run that met its wealth goal renders 达成 on both goals' verdicts.
await page.evaluate(() => {
  const run = window.__sim.checks.createInitialState()
  window.__sim.store.setState({
    state: {
      ...run,
      phase: 'summary',
      finished: true,
      player: { ...run.player, wealth: 180_000, awakened: true },
      loveStage: 'close',
    },
  })
})
await page.waitForTimeout(50)
const goalMetFail = await page.evaluate(() => {
  const goals = document.querySelector('.summary-goals')
  const copy = goals?.textContent ?? ''
  if (!copy.includes('财富目标 · 达成')) return `wealth goal not marked met: ${copy}`
  if (!copy.includes('爱情目标 · 达成')) return `love goal not marked met: ${copy}`
  return null
})
if (goalMetFail) throw new Error(`summary goals met: ${goalMetFail}`)

const summaryOriginFail = await page.evaluate(() => {
  const comparison = document.querySelector('.summary-gap-teaser')
  const lead = comparison?.querySelector('.gap-teaser-label')?.textContent ?? ''
  const bars = Array.from(comparison?.querySelectorAll('.gap-bar') ?? []).map((el) => el.textContent?.trim() ?? '')
  if (!lead.includes('另一种出身')) return `town-run comparison is not origin-neutral: ${lead}`
  if (!bars[0]?.startsWith('小镇做题家:')) return `town-run player mislabeled: ${bars[0]}`
  if (!bars[1]?.startsWith('金融世家:')) return `town-run parallel fate mislabeled: ${bars[1]}`
  return null
})
if (summaryOriginFail) throw new Error(`summary origin labels: ${summaryOriginFail}`)

await page.evaluate(() => {
  const unawakened = window.__sim.checks.createInitialState()
  window.__sim.store.setState({
    state: {
      ...unawakened,
      phase: 'summary',
      finished: true,
      mentorUnlocked: true,
      track: 'ai',
      player: {
        ...unawakened.player,
        cognition: 60,
        awakened: false,
      },
    },
  })
})
await page.waitForTimeout(50)

const eligibleUnawakenedFail = await page.evaluate(() => {
  const notice = document.querySelector('.summary-awakening-pending')
  const copy = notice?.textContent ?? ''
  if (!copy.includes('尚未前往贵人办公室争取认可')) {
    return `eligible unawakened reason missing: ${copy}`
  }
  if (document.querySelector('.summary-awakening-success')) {
    return 'eligible unawakened fixture rendered success notice'
  }
  return null
})
if (eligibleUnawakenedFail) throw new Error(`summary awakening result: ${eligibleUnawakenedFail}`)

await page.evaluate(() => {
  const unawakened = window.__sim.checks.createInitialState()
  window.__sim.store.setState({
    state: {
      ...unawakened,
      phase: 'summary',
      finished: true,
      mentorUnlocked: false,
      track: null,
      player: {
        ...unawakened.player,
        cognition: 25,
        awakened: false,
      },
    },
  })
})
await page.waitForTimeout(50)

const blockedUnawakenedFail = await page.evaluate(() => {
  const copy = document.querySelector('.summary-awakening-pending')?.textContent ?? ''
  const expected = [
    '未发现贵人办公室',
    '尚未选择未来方向',
    '能力未达标',
  ]
  const missing = expected.filter((reason) => !copy.includes(reason))
  return missing.length
    ? `blocked unawakened reasons missing ${missing.join(', ')}: ${copy}`
    : null
})
if (blockedUnawakenedFail) throw new Error(`summary awakening result: ${blockedUnawakenedFail}`)

await page.evaluate(() => {
  const dynasty = window.__sim.checks.createInitialState('finance_dynasty', true)
  window.__sim.store.setState({
    state: {
      ...dynasty,
      phase: 'summary',
      finished: true,
      player: { ...dynasty.player, wealth: 120_000, awakened: true },
      altPlayer: { ...dynasty.altPlayer, wealth: 45_000 },
    },
  })
})
await page.waitForTimeout(50)

const dynastySummaryOriginFail = await page.evaluate(() => {
  const comparison = document.querySelector('.summary-gap-teaser')
  const bars = Array.from(comparison?.querySelectorAll('.gap-bar') ?? []).map((el) => el.textContent?.trim() ?? '')
  if (!bars[0]?.startsWith('金融世家:')) return `dynasty-run player mislabeled: ${bars[0]}`
  if (!bars[1]?.startsWith('小镇做题家:')) return `dynasty-run parallel fate mislabeled: ${bars[1]}`
  return null
})
if (dynastySummaryOriginFail) throw new Error(`summary origin labels: ${dynastySummaryOriginFail}`)

const awakenedSummaryFail = await page.evaluate(() => {
  const notice = document.querySelector('.summary-awakening-success')
  if (!notice?.textContent?.includes('本局已觉醒')) return `awakened success notice missing: ${notice?.textContent ?? ''}`
  if (document.querySelector('.summary-awakening-pending')) return 'awakened summary also rendered failure reasons'
  return null
})
if (awakenedSummaryFail) throw new Error(`summary awakening result: ${awakenedSummaryFail}`)

await browser.close()

if (consoleErrors.length) {
  console.error('CONSOLE ERRORS:\n' + consoleErrors.join('\n'))
  process.exitCode = 1
} else {
  console.log('OK — 17 weeks played with winter romance, next-semester mentor, seven-product market, origin-aware summary, and 0 console errors. Screenshots in 8_lifegame/showcase/')
}
