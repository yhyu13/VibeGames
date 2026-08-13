import type { GameState, Origin, ParallelState, PlayerState, SpecialEventResult, StatDelta, TrackId } from '../types'
import { CAMPUS_SEMESTER_WEEKS, INTRO_TURN_LIMIT, type TurnResult } from '../types'
import {
  COGNITION_INFO_THRESHOLD,
  DYNASTY_PAPER_GOAL,
  EXCHANGE_COGNITION_THRESHOLD,
  FINANCE_DYNASTY_START,
  MENTOR_FAVOR_MAX,
  MENTOR_FAVORED_TRACK,
  START_COGNITION,
  START_MOOD,
  START_STAMINA,
  START_WEALTH,
  TOWN_PAPER_GOAL,
} from '../constants'
import { CAMPUS_CELLS, getCellById } from '../data/cells'
import { SPECIAL_EVENT_TRIGGER_PROB, specialEventsFor } from '../data/specialEvents'
import { rollDice, rollAltDice } from './dice'
import {
  applyStatDelta,
  computeAltEventDelta,
  computeAltMentorHit,
  drawLocationEvent,
  mentorHitFromChoiceId,
  resolveEventChoice,
} from './events'
import { ACCOUNT_OPENING_EVENT, ACCOUNT_OPENING_FLAVOR, GYM_DISCOVERY_EVENT, MENTOR_DISCOVERY_EVENT, TRACK_CHOICE_EVENT } from '../data/locationEvents'
import { applyRelationshipChoice, relationshipEventFor } from '../data/relationshipEvents'
import {
  CHRISTMAS_EVENT,
  CHRISTMAS_TURN,
  LOVE_FIRST_EVENT,
  LOVE_SECOND_EVENT,
  LOVE_THIRD_EVENT,
  NEXT_SEMESTER_MENTOR_BLOCKED_EVENT,
  NEXT_SEMESTER_TURN,
  WINTER_GROWTH_EVENT,
  WINTER_GROWTH_TURN,
  WINTER_REFLECTION_EVENT,
  WINTER_REUNION_EVENT,
  WINTER_REUNION_TURN,
  christmasContext,
  christmasImpressionFor,
  loveEventFor,
  loveStageAfterChoice,
  shouldReunite,
} from '../data/seasonEvents'
import { buildMarketView, createPaperAccount, resolveOrder } from './invest'
import { buildCoachOutput } from './attribution'

// v1.2 turn state machine (spec §6): choose_destination → walking → arrival (draw + shock,
// applied immediately) → dice (manual 掷骰子) → event → invest → results → next turn.

// v2.1 world events are rolled once per arrival, independent of location. The weighted table can
// move cognition, body, mood, or wealth; applied deltas are clamped before that turn's dice roll.
// v2.5: the pool is origin-aware (specialEventsFor) — 小镇 life surprises vs 家族 drama.
function rollSpecialEvent(rand: () => number, player: PlayerState, altPlayer: ParallelState): SpecialEventResult | null {
  if (rand() >= SPECIAL_EVENT_TRIGGER_PROB) return null
  const pool = specialEventsFor(player.origin)
  const totalWeight = pool.reduce((sum, event) => sum + event.weight, 0)
  let roll = rand() * totalWeight
  let event = pool[pool.length - 1]!
  for (const candidate of pool) {
    roll -= candidate.weight
    if (roll < 0) {
      event = candidate
      break
    }
  }
  const wealthAbs = Math.round(player.wealth * (event.wealthPct / 100)) + (event.wealthFlat ?? 0)
  const altWealthAbs = Math.round(altPlayer.wealth * (event.wealthPct / 100)) + (event.wealthFlat ?? 0)
  const playerAfter = applyStatDelta(player, { ...event.delta, wealth: wealthAbs })
  const altAfter = applyStatDelta(altPlayer, { ...event.delta, wealth: altWealthAbs })
  const playerDelta: StatDelta = {
    cognition: playerAfter.cognition - player.cognition,
    stamina: playerAfter.stamina - player.stamina,
    mood: playerAfter.mood - player.mood,
  }
  const altDelta: StatDelta = {
    cognition: altAfter.cognition - altPlayer.cognition,
    stamina: altAfter.stamina - altPlayer.stamina,
    mood: altAfter.mood - altPlayer.mood,
  }
  if (wealthAbs !== 0) playerDelta.wealth = wealthAbs
  if (altWealthAbs !== 0) altDelta.wealth = altWealthAbs
  return {
    event,
    wealthAbs,
    altWealthAbs,
    playerDelta,
    altDelta,
  }
}

function oppositeOrigin(origin: Origin): Origin {
  return origin === 'finance_dynasty' ? 'town_exam_kid' : 'finance_dynasty'
}

function originStart(origin: Origin) {
  return origin === 'finance_dynasty'
    ? FINANCE_DYNASTY_START
    : { wealth: START_WEALTH, cognition: START_COGNITION, stamina: START_STAMINA, mood: START_MOOD, relationshipTrust: 0 }
}

// v2.6 贫困逻辑: the two ledgers are EXPLICITLY separate. 生活财富 = 生活费 (小镇 ¥1,000,
// 世家 ¥300,000 — 起点财富,被 wealthFlat/wealthPct 事件推动); 模拟盘 = 试炼场初始资金
// (小镇 ¥100,000 / 世家 ¥300,000 — createPaperAccount 的 initialCapital,与生活费无关)。
// 第一桶金目标 (paperGoal) 只看模拟盘: town ¥200,000 (亏到 5 万再翻盘的 20 万) / dynasty ¥500,000。
export const PAPER_INITIAL_CAPITAL: Record<'town_exam_kid' | 'finance_dynasty', number> = {
  town_exam_kid: 100_000,
  finance_dynasty: 300_000,
}

function paperInitialFor(origin: Origin): number {
  return origin === 'finance_dynasty' ? PAPER_INITIAL_CAPITAL.finance_dynasty : PAPER_INITIAL_CAPITAL.town_exam_kid
}

function paperGoalFor(origin: Origin): number {
  return origin === 'finance_dynasty' ? DYNASTY_PAPER_GOAL : TOWN_PAPER_GOAL
}

function initialAltPlayer(origin: Origin): ParallelState {
  const altOrigin = oppositeOrigin(origin)
  const start = originStart(altOrigin)
  return { origin: altOrigin, wealth: start.wealth, cognition: start.cognition, stamina: start.stamina, mood: start.mood, awakened: false }
}

export function createInitialState(origin: Origin = 'town_exam_kid', financeDynastyUnlocked = false): GameState {
  const start = originStart(origin)
  const player: PlayerState = {
    origin,
    era: 'web2',
    wealth: start.wealth,
    cognition: start.cognition,
    stamina: start.stamina,
    mood: start.mood,
    turn: 1,
    position: 'start',
    awakened: false,
    log: [],
  }
  return {
    player,
    altPlayer: initialAltPlayer(origin),
    phase: 'choose_destination',
    pendingDestinationId: null,
    pendingDice: null,
    pendingEvent: null,
    pendingEventChoiceId: null,
    pendingInvestment: null,
    pendingCoach: null,
    pendingMicroAwakening: false,
    pendingRealEventDelta: null,
    pendingAltFate: null,
    pendingSpecialEvent: null,
    pendingSpecialChoice: null,
    // v2.4/v2.6: the 模拟盘 paper account opens with the ORIGIN'S 初始资金 — 小镇 ¥100,000 /
    // 世家 ¥300,000 — a broker-granted trial fund, EXPLICITLY independent of 生活财富
    // (生活费 小镇 ¥1,000 / 世家 ¥300,000, createPaperAccount's initialCapital is per-ledger).
    // The parallel twin opens with ITS origin's paper capital.
    paper: createPaperAccount(paperInitialFor(origin)),
    altPaper: createPaperAccount(paperInitialFor(oppositeOrigin(origin))),
    shockPct: {},
    investUnlocked: false, // v1.3 §1: the turn-1 开户 beat unlocks the sim account
    mentorUnlocked: false, // v1.4: the library discovery beat reveals 贵人办公室
    gymUnlocked: false, // v1.7 §1: the post-开户 宿舍 visit forces the 办卡 beat
    pendingAssetPreviews: null,
    pendingMarketNews: null,
    pendingMarketAdvices: null,
    reviewCredits: 0, // v1.6 §1: 复盘心得 — advice fidelity is EARNED trade by trade
    track: null, // v1.6 §2: 职业规划课 chosen 方向 (hidden line 2's fork)
    // v1.9: finance-dynasty starts with resources but not relationship trust.
    relationshipTrust: start.relationshipTrust,
    relationshipCrisis: 0,
    relationshipResolved: false,
    loveImpression: 'none',
    loveReunion: false,
    // v2.5: the love line starts on campus (迎新晚会, turn 2+) — set at 'none' until the
    // first beat plays; the 人生目标 (lifeGoalWealth) is established at the opening card.
    loveStage: 'none',
    mentorFavor: 0,
    // v2.6: 人生目标 = 模拟盘翻盘目标 (第一桶金从模拟盘挣,不从生活费涨).
    paperGoal: paperGoalFor(origin),
    financeDynastyUnlocked,
    finished: false,
  }
}

// choose_destination → walking. Clicking the building you're already on = "stay" (allowed,
// redraws a fresh event — time passes, spec §2/§6).
export function chooseDestination(state: GameState, cellId: string): GameState {
  if (state.phase !== 'choose_destination') return state
  if (state.player.turn === NEXT_SEMESTER_TURN) {
    return {
      ...state,
      phase: 'walking',
      pendingDestinationId: state.mentorUnlocked ? 'mentor' : 'library',
    }
  }
  const cell = getCellById(cellId)
  if (cell.locked || cell.zone !== 'campus') return state
  // v1.4: 贵人办公室 is cognition-gated — the map renders it as '???' and rejects clicks
  // until the library discovery beat fires. (Map also no-ops the click; this is the contract.)
  if (cellId === 'mentor' && !state.mentorUnlocked) return state
  // v1.8: both new campus facilities are cognition-gated — the map previews them as ???
  // until the player understands enough to notice/use them. Gym keeps gymUnlocked only as a
  // one-shot story-beat flag: cognition reveals it; the first visit still plays the 办卡 beat.
  if (cellId === 'gym' && state.player.cognition < COGNITION_INFO_THRESHOLD) return state
  if (cellId === 'exchange' && state.player.cognition < EXCHANGE_COGNITION_THRESHOLD) return state
  return { ...state, phase: 'walking', pendingDestinationId: cellId }
}

// v1.6 §2: 贵人信任 = 有能力(认知 ≥ 60)× 对口(押中了代表未来的方向). The twin is
// checked against its OWN cognition — trust is earned, not inherited from 出身.
function mentorTrustedFor(track: TrackId | null, cognition: number): boolean {
  return track === MENTOR_FAVORED_TRACK && cognition >= COGNITION_INFO_THRESHOLD
}

// walking → dice. Arrival is instant and seeded: location draw (or mentor roll) THEN shock
// roll — draw order is part of the deterministic contract. Shock applies immediately.
export function arrive(state: GameState, rand: () => number): GameState {
  if (state.phase !== 'walking' || !state.pendingDestinationId) return state
  const cellId = state.pendingDestinationId
  // v1.3 §1: turn 1 ALWAYS draws the 开户 story beat (investing is a narrative unlock,
  // not a day-one given), flavored by whichever building the player walked to. The
  // forced draw consumes NO rand — the shock roll below keeps its contract position.
  // v1.4: the first library visit AFTER 开户 forces the 发现贵人 beat (also 0 draws) and
  // flips mentorUnlocked — 贵人办公室 is outside an ordinary origin's 认知 until then.
  // v1.6 §2: the first 教学楼 visit forces the 职业规划课 beat (0 draws) — 选方向 is the
  // fork hidden line 2 keys off. Never visit the lecture hall = the line stays invisible.
  // v1.7 §1: the first post-开户 宿舍 visit forces the 办卡 beat (0 draws) and unlocks 健身房.
  // v2.5: love beats (2+/6+/10+) wait for injection like the dynasty relationship line —
  // seasonal and teaching beats outrank them, so the line never breaks a forced story beat.
  const seasonalOffer =
    state.player.turn === CHRISTMAS_TURN
      ? { event: { ...CHRISTMAS_EVENT, ...christmasContext(state.loveStage) } }
      : state.player.turn === WINTER_GROWTH_TURN
        ? { event: WINTER_GROWTH_EVENT }
        : state.player.turn === WINTER_REUNION_TURN
          ? {
              event: shouldReunite(state.loveImpression, state.loveStage)
                ? WINTER_REUNION_EVENT
                : WINTER_REFLECTION_EVENT,
            }
          : state.player.turn === NEXT_SEMESTER_TURN
            ? state.mentorUnlocked
              ? (() => {
                  const draw = drawLocationEvent(
                    'mentor',
                    state.player.origin,
                    rand,
                    mentorTrustedFor(state.track, state.player.cognition),
                    state.mentorFavor,
                    state.track,
                  )
                  // v2.6 贵人女儿 twist: nurture the love line to 'close' and the final
                  // encounter reveals 爱人是贵人的女儿 — pure narrative payoff, the
                  // recognition probability (trusted 90% / favor-boosted) is untouched.
                  const reveal = state.loveStage === 'close'
                    ? '\n\n散场时,他忽然叫住你:"对了——我女儿说,迎新晚会上认识了个挺有意思的人。"\n你愣在原地。原来这一路接住你情绪的人,是贵人的女儿。'
                    : ''
                  return reveal
                    ? { event: { ...draw.event, text: draw.event.text + reveal }, mentorRoll: draw.mentorRoll, mentorTrusted: draw.mentorTrusted }
                    : draw
                })()
              : { event: NEXT_SEMESTER_MENTOR_BLOCKED_EVENT }
            : null
  const forcedOffer =
    seasonalOffer ?? (
      state.player.turn === 1 && !state.investUnlocked
        ? { event: { ...ACCOUNT_OPENING_EVENT, text: ACCOUNT_OPENING_FLAVOR[cellId] ?? ACCOUNT_OPENING_EVENT.text } }
        : cellId === 'library' && !state.mentorUnlocked
          ? { event: MENTOR_DISCOVERY_EVENT }
          : cellId === 'lecture' && state.track === null
            ? { event: TRACK_CHOICE_EVENT }
            : cellId === 'gym' && !state.gymUnlocked
              ? { event: GYM_DISCOVERY_EVENT }
              : null
    )
  // v2.5: the love line's semester beats — the first available arrival from turns 2/6/10,
  // pushed later by teaching beats (same injection semantics as the dynasty relationship line).
  // 优先级: seasonal > 第13周关系收尾 > teaching > 世家关系线 > 爱情线 > 普通抽卡.
  // The week-13 relationship closure is design-08 load-bearing: if stage 3 hasn't played by
  // the semester's last week, it outranks any still-deferred one-shot teaching beat.
  const loveEvent = loveEventFor(state.player.turn, state.loveStage)
  const relationshipEvent =
    state.player.origin === 'finance_dynasty'
      ? relationshipEventFor(state.player.turn, state.relationshipCrisis, state.relationshipResolved)
      : null
  const offer =
    relationshipEvent && state.player.turn === CAMPUS_SEMESTER_WEEKS
      ? { event: relationshipEvent }
      : forcedOffer ??
        (relationshipEvent
          ? { event: relationshipEvent }
          : loveEvent
            ? { event: loveEvent }
            : drawLocationEvent(cellId, state.player.origin, rand, mentorTrustedFor(state.track, state.player.cognition), state.mentorFavor, state.track))
  const discoveredMentor = offer.event.id === MENTOR_DISCOVERY_EVENT.id
  const discoveredGym = offer.event.id === GYM_DISCOVERY_EVENT.id
  const special = state.player.turn <= CAMPUS_SEMESTER_WEEKS
    ? rollSpecialEvent(rand, state.player, state.altPlayer)
    : null
  // v2.4: a choice-based special event waits for the player's decision — the EventModal shows it
  // as a card (icon + text + choices) BEFORE the location card. No banner, no immediate deltas;
  // the chosen option's outcome applies at choice time. The asset shock (if any) still moves
  // this week's market the moment the event hits.
  const choiceEvent = special?.event.choices ? special.event : null
  const playerAfterSpecial = special && !choiceEvent
    ? applyStatDelta(state.player, special.playerDelta)
    : state.player
  const altAfterSpecial = special && !choiceEvent
    ? applyStatDelta(state.altPlayer, special.altDelta)
    : state.altPlayer
  // v2.5: 贵人好感 — a non-choice story event where a benefactor notices you pushes the office
  // hit probability up (capped). Applied at arrival; choice-based events apply at choice time.
  const favorGain = special && !choiceEvent ? (special.event.mentorFavor ?? 0) : 0
  const shockPct = special?.event.assetShock
    ? { ...state.shockPct, [special.event.assetShock.assetId]: special.event.assetShock.pct }
    : state.shockPct
  return {
    ...state,
    phase: 'dice',
    mentorUnlocked: state.mentorUnlocked || discoveredMentor,
    gymUnlocked: state.gymUnlocked || discoveredGym,
    player: { ...state.player, ...playerAfterSpecial, position: cellId },
    altPlayer: { ...state.altPlayer, ...altAfterSpecial },
    mentorFavor: Math.max(0, Math.min(MENTOR_FAVOR_MAX, state.mentorFavor + favorGain)),
    pendingDestinationId: null,
    pendingDice: null,
    pendingEvent: offer,
    pendingMicroAwakening: false, // clear last turn's toast so a fresh one can remount + replay
    pendingSpecialEvent: special && !choiceEvent ? special : null,
    pendingSpecialChoice: choiceEvent ? { event: choiceEvent } : null,
    shockPct,
  }
}

// v2.4: resolve a choice-based special event. The chosen option's delta + wealth% apply to both
// trajectories (same life shock, each origin's own wealth base); the phase stays 'event' so the
// location card that was drawn at arrival follows. v2.5: a choice event can also carry 贵人好感.
export function chooseSpecialChoice(state: GameState, choiceId: string): GameState {
  const pending = state.pendingSpecialChoice
  if (!pending || state.phase !== 'event') return state
  const choice = pending.event.choices?.find((c) => c.id === choiceId)
  if (!choice) return state
  const wealthAbs = Math.round(state.player.wealth * (choice.wealthPct / 100)) + (choice.wealthFlat ?? 0)
  const altWealthAbs = Math.round(state.altPlayer.wealth * (choice.wealthPct / 100)) + (choice.wealthFlat ?? 0)
  const playerAfter = applyStatDelta(state.player, { ...choice.delta, wealth: wealthAbs })
  const altAfter = applyStatDelta(state.altPlayer, { ...choice.delta, wealth: altWealthAbs })
  return {
    ...state,
    player: { ...state.player, ...playerAfter },
    altPlayer: { ...state.altPlayer, ...altAfter },
    mentorFavor: Math.max(0, Math.min(MENTOR_FAVOR_MAX, state.mentorFavor + (pending.event.mentorFavor ?? 0))),
    pendingSpecialChoice: null,
  }
}

// dice (manual 掷骰子 ritual preserved): the formula's eventMod term comes from the DRAWN event
// (destination-event rule, spec §7.2) — the player sees the number before seeing the event.
export function roll(state: GameState, rand: () => number): GameState {
  if (state.phase !== 'dice' || !state.pendingEvent || state.pendingDice) return state
  const eventMod = state.pendingEvent.event.eventMod
  const dice = rollDice(state.player, eventMod, rand)
  const altDice = rollAltDice(dice.rolls, eventMod, state.altPlayer)
  return {
    ...state,
    pendingDice: dice,
    pendingAltFate: {
      diceTotal: altDice.total,
      diceTier: altDice.tier,
      eventDelta: {},
      mentorHit: computeAltMentorHit(state.pendingEvent, state.altPlayer, mentorTrustedFor(state.track, state.altPlayer.cognition)),
      investmentPnlAbs: 0,
    },
  }
}

export function advanceToEvent(state: GameState): GameState {
  if (state.phase !== 'dice' || !state.pendingDice) return state
  return { ...state, phase: 'event' }
}

// resolveEventChoice / computeAltEventDelta return the NEW absolute values, but the
// parallel-fate display wants the CHANGE amount — diff against the pre-choice snapshot.
function toDisplayDelta(before: StatDelta, after: StatDelta): StatDelta {
  const out: StatDelta = {}
  for (const key of Object.keys(after) as (keyof StatDelta)[]) {
    const afterVal = after[key]
    const beforeVal = before[key]
    if (afterVal === undefined || beforeVal === undefined) continue
    out[key] = afterVal - beforeVal
  }
  return out
}

// event → invest. The player's OWN tier scales their outcome; the twin's OWN tier scales theirs
// (spec §3). Distorted asset previews are built HERE (post-event mood) from the seeded stream.
export function chooseEvent(state: GameState, choiceId: string, rand: () => number): GameState {
  if (!state.pendingEvent || !state.pendingDice) return state
  const delta = resolveEventChoice(state.player, state.pendingEvent, choiceId, state.pendingDice.tier)
  const altDelta = computeAltEventDelta(
    state.pendingEvent,
    choiceId,
    state.altPlayer,
    state.pendingAltFate?.diceTier ?? state.pendingDice.tier,
    mentorTrustedFor(state.track, state.altPlayer.cognition),
  )
  const displayDelta = toDisplayDelta(state.player, delta)
  const altDisplayDelta = toDisplayDelta(state.altPlayer, altDelta)
  const playerAfter: PlayerState = { ...state.player, ...delta }
  const relationship = applyRelationshipChoice(state.relationshipTrust, state.relationshipCrisis, choiceId)
  // v2.5: love beats advance the semester stage (初遇 → 期中 → 期末) and grade the
  // impression from CURRENT state — the same 认知 ≥ 60 × 身心健康 ≥ 70 gate as Christmas,
  // so a run that grew during the semester gets the better read; an already-good impression
  // is never downgraded by a later beat.
  const loveStage = loveStageAfterChoice(state.loveStage, choiceId)
  const isLoveBeat =
    state.pendingEvent.event.id === LOVE_FIRST_EVENT.id ||
    state.pendingEvent.event.id === LOVE_SECOND_EVENT.id ||
    state.pendingEvent.event.id === LOVE_THIRD_EVENT.id
  const loveImpression = state.pendingEvent.event.id === CHRISTMAS_EVENT.id
    ? christmasImpressionFor(state.player)
    : isLoveBeat && state.loveImpression !== 'good'
      ? christmasImpressionFor(state.player)
      : state.loveImpression
  const loveReunion = state.loveReunion
    || (state.pendingEvent.event.id === WINTER_REUNION_EVENT.id && choiceId === 'love_keep_walking')

  // v1.9: the relationship line is finance-dynasty-only; each exclusive beat still proceeds
  // through the ordinary invest/coach loop. Closure at stage 3 prevents any later injection.
  if (relationship) {
    const market = buildMarketView(playerAfter, state.reviewCredits, rand)
    return {
      ...state,
      phase: 'invest',
      player: playerAfter,
      altPlayer: { ...state.altPlayer, ...altDelta },
      relationshipTrust: relationship.trust,
      relationshipCrisis: relationship.crisis,
      relationshipResolved: state.relationshipResolved || relationship.resolved,
      pendingEventChoiceId: choiceId,
      pendingRealEventDelta: displayDelta,
      pendingAltFate: state.pendingAltFate ? { ...state.pendingAltFate, eventDelta: altDisplayDelta } : null,
      pendingAssetPreviews: market.candles,
      pendingMarketNews: market.news,
      pendingMarketAdvices: market.advices,
    }
  }
  if (state.pendingEvent.event.id === ACCOUNT_OPENING_EVENT.id) {
    const mentorHit = mentorHitFromChoiceId(choiceId)
    const coach = buildCoachOutput(state.pendingDice, state.pendingEvent.event.cellType, mentorHit)
    return {
      ...state,
      phase: 'results',
      investUnlocked: true,
      player: playerAfter,
      altPlayer: { ...state.altPlayer, ...altDelta },
      pendingEventChoiceId: choiceId,
      pendingRealEventDelta: displayDelta,
      pendingInvestment: null,
      pendingCoach: coach,
      pendingAltFate: state.pendingAltFate
        ? { ...state.pendingAltFate, eventDelta: altDisplayDelta, investmentPnlAbs: 0 }
        : null,
    }
  }

  // v1.6 §2: the 职业规划课 beat records the chosen 方向. Like the library discovery beat
  // it does NOT skip the invest phase — the turn continues into a normal trade.
  const track = choiceId.startsWith('track_') ? (choiceId.slice('track_'.length) as TrackId) : state.track
  // v1.6 §1: advice fidelity keys off reviewCredits as of ENTERING this invest phase —
  // this turn's own trade is only reviewed at turn end (finishCoach).
  const market = buildMarketView(playerAfter, state.reviewCredits, rand)
  return {
    ...state,
    phase: 'invest',
    loveImpression,
    loveReunion,
    loveStage,
    track,
    player: playerAfter,
    altPlayer: { ...state.altPlayer, ...altDelta },
    pendingEventChoiceId: choiceId,
    pendingRealEventDelta: displayDelta,
    pendingAltFate: state.pendingAltFate ? { ...state.pendingAltFate, eventDelta: altDisplayDelta } : null,
    pendingAssetPreviews: market.candles,
    pendingMarketNews: market.news,
    pendingMarketAdvices: market.advices,
  }
}

// v2.4: invest phase → results. The player places ONE spot order this week (buy/sell a specific
// asset, or hold). Executed at the week's open price, then the whole 模拟盘 account is marked to
// the week's close (open × (1 + tick + asset shock)). Trading P&L lives in the paper account —
// 财富 (the life-sim ledger) is untouched.
export function makeInvestment(
  state: GameState,
  assetId: string,
  side: 'buy' | 'sell' | 'hold',
  amount: number,
): GameState {
  const { account: paper, result: investment } = resolveOrder(
    state.paper,
    assetId,
    side,
    amount,
    state.player.turn,
    state.shockPct,
  )
  const { account: altPaper, result: altResult } = resolveOrder(
    state.altPaper,
    assetId,
    side,
    amount,
    state.player.turn,
    state.shockPct,
  )
  const dice = state.pendingDice
  const mentorHit = mentorHitFromChoiceId(state.pendingEventChoiceId)
  // v1.2: attribution keys off the EVENT's cellType (宿舍 events carry 'rest'), not the Cell's.
  const coach = dice && state.pendingEvent ? buildCoachOutput(dice, state.pendingEvent.event.cellType, mentorHit) : null
  return {
    ...state,
    phase: 'results',
    paper,
    altPaper,
    pendingInvestment: investment,
    pendingCoach: coach,
    pendingAltFate: state.pendingAltFate
      ? { ...state.pendingAltFate, investmentPnlAbs: altResult.weekPnlAbs }
      : null,
    pendingAssetPreviews: null, // consumed — the real (undistorted) tick has now resolved
    pendingMarketNews: null,
    pendingMarketAdvices: null,
  }
}

export function finishCoach(state: GameState, rand: () => number): GameState {
  const { pendingDice, pendingEvent, pendingEventChoiceId, pendingInvestment, pendingCoach } = state
  // v1.3 §1: pendingInvestment is legitimately null on the turn-1 开户 beat — not a guard.
  if (!pendingDice || !pendingEvent || !pendingEventChoiceId || !pendingCoach) return state

  const microAwakening = rand() < 0.3
  // v1.6 §1: 复盘 — a turn's trade becomes 心得 only if it was a REAL order (buy or sell with
  // ¥ amount filled) AND cognition ≥ 60 (复盘能力解锁). 认知不够,交易白打;不操作,无可复盘.
  const reviewed =
    pendingInvestment !== null &&
    pendingInvestment.side !== 'hold' &&
    pendingInvestment.amount > 0 &&
    state.player.cognition >= COGNITION_INFO_THRESHOLD
  const mentorRecognized = mentorHitFromChoiceId(pendingEventChoiceId) === true
  const nowAwakened = state.player.awakened || mentorRecognized
  const altNowAwakened = state.altPlayer.awakened || state.pendingAltFate?.mentorHit === true

  const turnResult: TurnResult = {
    turn: state.player.turn,
    cellId: state.player.position,
    locationEvent: pendingEvent.event,
    dice: pendingDice,
    eventChoiceId: pendingEventChoiceId,
    eventDelta: state.pendingRealEventDelta ?? {},
    investment: pendingInvestment,
    coach: pendingCoach,
    microAwakening,
  }

  const nextTurn = state.player.turn + 1
  const finished = nextTurn > INTRO_TURN_LIMIT

  return {
    ...state,
    phase: finished ? 'summary' : 'choose_destination',
    player: {
      ...state.player,
      turn: nextTurn,
      awakened: nowAwakened,
      log: [...state.player.log, turnResult],
    },
    altPlayer: { ...state.altPlayer, awakened: altNowAwakened },
    pendingDestinationId: null,
    pendingDice: null,
    pendingEvent: null,
    pendingEventChoiceId: null,
    pendingInvestment: null,
    pendingCoach: null,
    pendingMicroAwakening: microAwakening,
    pendingRealEventDelta: null,
    pendingAltFate: null,
    pendingSpecialEvent: null,
    pendingSpecialChoice: null,
    shockPct: {}, // v2.4: this week's asset shock is consumed at turn end
    pendingAssetPreviews: null,
    pendingMarketNews: null,
    pendingMarketAdvices: null,
    reviewCredits: state.reviewCredits + (reviewed ? 1 : 0),
    financeDynastyUnlocked: state.financeDynastyUnlocked || mentorRecognized,
    finished,
  }
}

export function allCampusCells() {
  return CAMPUS_CELLS
}
