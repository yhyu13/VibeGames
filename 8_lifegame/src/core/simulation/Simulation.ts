import type { GameState, Origin, ParallelState, PlayerState, SpecialEventResult, StatDelta, TrackId } from '../types'
import { INTRO_TURN_LIMIT, type TurnResult } from '../types'
import { COGNITION_INFO_THRESHOLD, EXCHANGE_COGNITION_THRESHOLD, FINANCE_DYNASTY_START, MENTOR_FAVORED_TRACK, START_COGNITION, START_MOOD, START_STAMINA, START_WEALTH } from '../constants'
import { CAMPUS_CELLS, getCellById } from '../data/cells'
import { SPECIAL_EVENTS, SPECIAL_EVENT_TRIGGER_PROB } from '../data/specialEvents'
import { rollDice, rollAltDice } from './dice'
import {
  computeAltEventDelta,
  computeAltMentorHit,
  drawLocationEvent,
  mentorHitFromChoiceId,
  resolveEventChoice,
} from './events'
import { ACCOUNT_OPENING_EVENT, ACCOUNT_OPENING_FLAVOR, GYM_DISCOVERY_EVENT, MENTOR_DISCOVERY_EVENT, TRACK_CHOICE_EVENT } from '../data/locationEvents'
import { applyRelationshipChoice, relationshipEventFor } from '../data/relationshipEvents'
import { buildMarketView, resolveAltInvestment, resolveInvestment } from './invest'
import { buildCoachOutput } from './attribution'

// v1.2 turn state machine (spec §6): choose_destination → walking → arrival (draw + shock,
// applied immediately) → dice (manual 掷骰子) → event → invest → results → next turn.

// Ch04 4.4 "无预兆" (no warning) -- rolled once per turn at ARRIVAL, before the dice roll,
// independent of location. Applies immediately to both the real and parallel-fate wealth/mood
// (same % shock, each origin's own wealth base) so post-shock mood feeds that turn's stateMod.
function rollSpecialEvent(rand: () => number, wealth: number, altWealth: number): SpecialEventResult | null {
  if (rand() >= SPECIAL_EVENT_TRIGGER_PROB) return null
  const idx = Math.floor(rand() * SPECIAL_EVENTS.length)
  const event = SPECIAL_EVENTS[Math.min(idx, SPECIAL_EVENTS.length - 1)]!
  return {
    event,
    wealthAbs: Math.round(wealth * (event.wealthPct / 100)),
    altWealthAbs: Math.round(altWealth * (event.wealthPct / 100)),
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
    financeDynastyUnlocked,
    finished: false,
  }
}

// choose_destination → walking. Clicking the building you're already on = "stay" (allowed,
// redraws a fresh event — time passes, spec §2/§6).
export function chooseDestination(state: GameState, cellId: string): GameState {
  if (state.phase !== 'choose_destination') return state
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
  const forcedOffer =
    state.player.turn === 1 && !state.investUnlocked
      ? { event: { ...ACCOUNT_OPENING_EVENT, text: ACCOUNT_OPENING_FLAVOR[cellId] ?? ACCOUNT_OPENING_EVENT.text } }
      : cellId === 'library' && !state.mentorUnlocked
        ? { event: MENTOR_DISCOVERY_EVENT }
        : cellId === 'lecture' && state.track === null
          ? { event: TRACK_CHOICE_EVENT }
          : cellId === 'gym' && !state.gymUnlocked
            ? { event: GYM_DISCOVERY_EVENT }
            : null
  const relationshipEvent =
    state.player.origin === 'finance_dynasty'
      ? relationshipEventFor(state.player.turn, state.relationshipCrisis, state.relationshipResolved)
      : null
  const offer = forcedOffer ?? (relationshipEvent ? { event: relationshipEvent } : drawLocationEvent(cellId, state.player.origin, rand, mentorTrustedFor(state.track, state.player.cognition)))
  const discoveredMentor = offer.event.id === MENTOR_DISCOVERY_EVENT.id
  const discoveredGym = offer.event.id === GYM_DISCOVERY_EVENT.id
  const special = rollSpecialEvent(rand, state.player.wealth, state.altPlayer.wealth)
  const wealthAfterSpecial = state.player.wealth + (special?.wealthAbs ?? 0)
  const altWealthAfterSpecial = state.altPlayer.wealth + (special?.altWealthAbs ?? 0)
  const moodAfterSpecial = special ? Math.max(0, Math.min(100, state.player.mood + special.event.moodDelta)) : state.player.mood
  const altMoodAfterSpecial = special
    ? Math.max(0, Math.min(100, state.altPlayer.mood + special.event.moodDelta))
    : state.altPlayer.mood
  return {
    ...state,
    phase: 'dice',
    mentorUnlocked: state.mentorUnlocked || discoveredMentor,
    gymUnlocked: state.gymUnlocked || discoveredGym,
    player: { ...state.player, position: cellId, wealth: wealthAfterSpecial, mood: moodAfterSpecial },
    altPlayer: { ...state.altPlayer, wealth: altWealthAfterSpecial, mood: altMoodAfterSpecial },
    pendingDestinationId: null,
    pendingDice: null,
    pendingEvent: offer,
    pendingMicroAwakening: false, // clear last turn's toast so a fresh one can remount + replay
    pendingSpecialEvent: special,
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

export function makeInvestment(state: GameState, assetId: string, allocationPct: number): GameState {
  const investment = resolveInvestment(state.player, assetId, allocationPct)
  const altPnlAbs = resolveAltInvestment(state.altPlayer.wealth, investment.allocationPct, investment.pnlPct)
  const dice = state.pendingDice
  const mentorHit = mentorHitFromChoiceId(state.pendingEventChoiceId)
  // v1.2: attribution keys off the EVENT's cellType (宿舍 events carry 'rest'), not the Cell's.
  const coach = dice && state.pendingEvent ? buildCoachOutput(dice, state.pendingEvent.event.cellType, mentorHit) : null
  return {
    ...state,
    phase: 'results',
    player: { ...state.player, wealth: state.player.wealth + investment.pnlAbs },
    altPlayer: { ...state.altPlayer, wealth: state.altPlayer.wealth + altPnlAbs },
    pendingInvestment: investment,
    pendingCoach: coach,
    pendingAltFate: state.pendingAltFate ? { ...state.pendingAltFate, investmentPnlAbs: altPnlAbs } : null,
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
  // v1.6 §1: 复盘 — a turn's trade becomes 心得 only if it was a REAL trade (仓位 > 0)
  // AND cognition ≥ 60 (复盘能力解锁). 认知不够,交易白打;仓位为 0,无可复盘.
  const reviewed =
    pendingInvestment !== null && pendingInvestment.allocationPct > 0 && state.player.cognition >= COGNITION_INFO_THRESHOLD
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
