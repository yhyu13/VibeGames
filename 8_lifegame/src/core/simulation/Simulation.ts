import type { GameState, PlayerState } from '../types'
import { INTRO_TURN_LIMIT, type TurnResult } from '../types'
import { START_COGNITION, START_MOOD, START_STAMINA, START_WEALTH } from '../constants'
import { CAMPUS_CELLS, campusCellAtOffset, getCellById } from '../data/cells'
import { rollDice } from './dice'
import { buildEventOffer, eventModForCell, resolveEventChoice } from './events'
import { resolveInvestment } from './invest'
import { buildCoachOutput } from './attribution'

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
    phase: 'map',
    pendingDice: null,
    pendingEvent: null,
    pendingEventChoiceId: null,
    pendingInvestment: null,
    pendingCoach: null,
    pendingMicroAwakening: false,
    finished: false,
  }
}

export function startRoll(state: GameState, rand: () => number): GameState {
  const currentCell = getCellById(state.player.position)
  const eventMod = eventModForCell(currentCell)
  const dice = rollDice(state.player, eventMod, rand)
  const destCell = campusCellAtOffset(state.player.position, dice.cellsToMove)
  const eventOffer = buildEventOffer(destCell, rand)
  return {
    ...state,
    phase: 'dice',
    player: { ...state.player, position: destCell.id },
    pendingDice: dice,
    pendingEvent: eventOffer,
    pendingMicroAwakening: false, // clear last turn's toast so a fresh one can remount + replay
  }
}

export function advanceToEvent(state: GameState): GameState {
  return { ...state, phase: 'event' }
}

export function chooseEvent(state: GameState, choiceId: string): GameState {
  if (!state.pendingEvent) return state
  const delta = resolveEventChoice(state.player, state.pendingEvent, choiceId)
  return {
    ...state,
    phase: 'invest',
    player: { ...state.player, ...delta },
    pendingEventChoiceId: choiceId,
  }
}

export function makeInvestment(state: GameState, assetId: string, allocationPct: number): GameState {
  const investment = resolveInvestment(state.player, assetId, allocationPct)
  const dice = state.pendingDice
  const coach = dice ? buildCoachOutput(dice, dice.tier) : null
  return {
    ...state,
    phase: 'coach',
    player: { ...state.player, wealth: state.player.wealth + investment.pnlAbs },
    pendingInvestment: investment,
    pendingCoach: coach,
  }
}

export function finishCoach(state: GameState, rand: () => number): GameState {
  const { pendingDice, pendingEvent, pendingEventChoiceId, pendingInvestment, pendingCoach } = state
  if (!pendingDice || !pendingEvent || !pendingEventChoiceId || !pendingInvestment || !pendingCoach) return state

  const microAwakening = rand() < 0.3
  const nowAwakened = state.player.awakened || pendingDice.tier === 'awaken'

  const turnResult: TurnResult = {
    turn: state.player.turn,
    cellId: state.player.position,
    dice: pendingDice,
    eventChoiceId: pendingEventChoiceId,
    eventDelta: {},
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
    pendingDice: null,
    pendingEvent: null,
    pendingEventChoiceId: null,
    pendingInvestment: null,
    pendingCoach: null,
    pendingMicroAwakening: microAwakening,
    finished,
  }
}

export function allCampusCells() {
  return CAMPUS_CELLS
}
