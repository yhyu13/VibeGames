import type { GameState, ParallelState, PlayerState, SpecialEventResult, StatDelta } from '../types'
import { INTRO_TURN_LIMIT, type TurnResult } from '../types'
import { START_COGNITION, START_MOOD, START_STAMINA, START_WEALTH } from '../constants'
import { CAMPUS_CELLS, campusCellAtOffset, getCellById } from '../data/cells'
import { SPECIAL_EVENTS, SPECIAL_EVENT_TRIGGER_PROB } from '../data/specialEvents'
import { rollDice, rollAltDice } from './dice'
import { buildEventOffer, computeAltEventDelta, computeAltMentorHit, eventModForCell, mentorHitFromChoiceId, resolveEventChoice } from './events'
import { resolveAltInvestment, resolveInvestment } from './invest'
import { buildCoachOutput } from './attribution'

// Ch04 4.4 "无预兆" (no warning) -- rolled once per turn, BEFORE the dice roll, independent
// of which cell you're on. Applies immediately to both the real and parallel-fate wealth/mood
// (same % shock, each origin's own wealth base -- the market crash doesn't care who you are,
// but how much cushion you have does).
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

function initialAltPlayer(): ParallelState {
  return { wealth: START_WEALTH, cognition: START_COGNITION, stamina: START_STAMINA, mood: START_MOOD, awakened: false }
}

export function createInitialState(): GameState {
  const player: PlayerState = {
    origin: 'town_exam_kid',
    era: 'web2',
    wealth: START_WEALTH,
    cognition: START_COGNITION,
    stamina: START_STAMINA,
    mood: START_MOOD,
    turn: 1,
    position: 'start',
    awakened: false,
    log: [],
  }
  return {
    player,
    altPlayer: initialAltPlayer(),
    phase: 'map',
    pendingDice: null,
    pendingEvent: null,
    pendingEventChoiceId: null,
    pendingInvestment: null,
    pendingCoach: null,
    pendingMicroAwakening: false,
    pendingRealEventDelta: null,
    pendingAltFate: null,
    pendingSpecialEvent: null,
    finished: false,
  }
}

export function startRoll(state: GameState, rand: () => number): GameState {
  const special = rollSpecialEvent(rand, state.player.wealth, state.altPlayer.wealth)
  const wealthAfterSpecial = state.player.wealth + (special?.wealthAbs ?? 0)
  const altWealthAfterSpecial = state.altPlayer.wealth + (special?.altWealthAbs ?? 0)
  const moodAfterSpecial = special ? Math.max(0, Math.min(100, state.player.mood + special.event.moodDelta)) : state.player.mood
  const altMoodAfterSpecial = special
    ? Math.max(0, Math.min(100, state.altPlayer.mood + special.event.moodDelta))
    : state.altPlayer.mood

  const currentCell = getCellById(state.player.position)
  const eventMod = eventModForCell(currentCell)
  const dice = rollDice({ ...state.player, mood: moodAfterSpecial }, eventMod, rand)
  const destCell = campusCellAtOffset(state.player.position, dice.cellsToMove)
  const eventOffer = buildEventOffer(destCell, rand)
  const altDice = rollAltDice(dice.rolls, eventMod, { ...state.altPlayer, mood: altMoodAfterSpecial })
  return {
    ...state,
    phase: 'dice',
    player: { ...state.player, position: destCell.id, wealth: wealthAfterSpecial, mood: moodAfterSpecial },
    altPlayer: { ...state.altPlayer, wealth: altWealthAfterSpecial, mood: altMoodAfterSpecial },
    pendingDice: dice,
    pendingEvent: eventOffer,
    pendingMicroAwakening: false, // clear last turn's toast so a fresh one can remount + replay
    pendingAltFate: {
      diceTotal: altDice.total,
      diceTier: altDice.tier,
      eventDelta: {},
      mentorHit: computeAltMentorHit(eventOffer),
      investmentPnlAbs: 0,
    },
    pendingSpecialEvent: special,
  }
}

export function advanceToEvent(state: GameState): GameState {
  return { ...state, phase: 'event' }
}

// resolveEventChoice / computeAltEventDelta return the NEW absolute values (e.g.
// {cognition: s.cognition + 12}), which is what's needed to merge into state -- but the
// parallel-fate display wants the CHANGE amount, not the new absolute value. This diffs
// against the pre-choice snapshot to get an actual delta dict for display only.
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

export function chooseEvent(state: GameState, choiceId: string): GameState {
  if (!state.pendingEvent) return state
  const delta = resolveEventChoice(state.player, state.pendingEvent, choiceId)
  const altDelta = computeAltEventDelta(state.pendingEvent, choiceId, state.altPlayer)
  const displayDelta = toDisplayDelta(state.player, delta)
  const altDisplayDelta = toDisplayDelta(state.altPlayer, altDelta)
  return {
    ...state,
    phase: 'invest',
    player: { ...state.player, ...delta },
    altPlayer: { ...state.altPlayer, ...altDelta },
    pendingEventChoiceId: choiceId,
    pendingRealEventDelta: displayDelta,
    pendingAltFate: state.pendingAltFate ? { ...state.pendingAltFate, eventDelta: altDisplayDelta } : null,
  }
}

export function makeInvestment(state: GameState, assetId: string, allocationPct: number): GameState {
  const investment = resolveInvestment(state.player, assetId, allocationPct)
  const altPnlAbs = resolveAltInvestment(state.altPlayer.wealth, investment.allocationPct, investment.pnlPct)
  const dice = state.pendingDice
  const mentorHit = mentorHitFromChoiceId(state.pendingEventChoiceId)
  const coach = dice && state.pendingEvent ? buildCoachOutput(dice, state.pendingEvent.cellType, mentorHit) : null
  return {
    ...state,
    phase: 'coach',
    player: { ...state.player, wealth: state.player.wealth + investment.pnlAbs },
    altPlayer: { ...state.altPlayer, wealth: state.altPlayer.wealth + altPnlAbs },
    pendingInvestment: investment,
    pendingCoach: coach,
    pendingAltFate: state.pendingAltFate ? { ...state.pendingAltFate, investmentPnlAbs: altPnlAbs } : null,
  }
}

export function finishCoach(state: GameState, rand: () => number): GameState {
  const { pendingDice, pendingEvent, pendingEventChoiceId, pendingInvestment, pendingCoach } = state
  if (!pendingDice || !pendingEvent || !pendingEventChoiceId || !pendingInvestment || !pendingCoach) return state

  const microAwakening = rand() < 0.3
  const nowAwakened = state.player.awakened || pendingDice.tier === 'awaken'
  const altNowAwakened = state.altPlayer.awakened || state.pendingAltFate?.diceTier === 'awaken'

  const turnResult: TurnResult = {
    turn: state.player.turn,
    cellId: state.player.position,
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
    phase: finished ? 'summary' : 'map',
    player: {
      ...state.player,
      turn: nextTurn,
      awakened: nowAwakened,
      log: [...state.player.log, turnResult],
    },
    altPlayer: { ...state.altPlayer, awakened: altNowAwakened },
    pendingDice: null,
    pendingEvent: null,
    pendingEventChoiceId: null,
    pendingInvestment: null,
    pendingCoach: null,
    pendingMicroAwakening: microAwakening,
    pendingRealEventDelta: null,
    pendingAltFate: null,
    pendingSpecialEvent: null,
    finished,
  }
}

export function allCampusCells() {
  return CAMPUS_CELLS
}
