import type { Cell, EventChoice, EventOffer, ParallelState, PlayerState } from '../types'
import { PARALLEL_FATE_ORIGIN } from '../types'
import {
  ORIGIN_LEARN_MULTIPLIER,
  ORIGIN_WORK_MULTIPLIER,
  ORIGIN_REST_RECOVERY,
  ORIGIN_MENTOR_FREE_HIT_PROB,
} from '../constants'

// Base magnitudes shared by both the real apply() closures below and computeAltEventDelta() —
// single source of truth so "same choice, different origin coefficient" stays exact.
const LEARN_BASE: Record<string, { cognition: number; stamina: number }> = {
  deep_read: { cognition: 12, stamina: -8 },
  cram: { cognition: 6, stamina: -3 },
}
const WORK_BASE: Record<string, { wealth: number; stamina: number }> = {
  extra_shift: { wealth: 8000, stamina: -18 },
  steady_shift: { wealth: 3000, stamina: -8 },
}

// eventMod is a property of the cell the player is CURRENTLY standing on when they roll
// (source doc: "贵人格子+1" etc. — the modifier belongs to the departure cell, not the destination).
export function eventModForCell(cell: Cell): number {
  return cell.type === 'mentor' ? 1 : 0
}

function learnChoices(): EventChoice[] {
  return [
    {
      id: 'deep_read',
      label: '认真啃书',
      description: '认知 +12 x 出身系数,体力 −8',
      apply: (s) => ({
        cognition: s.cognition + Math.round(LEARN_BASE.deep_read!.cognition * (ORIGIN_LEARN_MULTIPLIER[s.origin] ?? 1)),
        stamina: Math.max(0, s.stamina + LEARN_BASE.deep_read!.stamina),
      }),
    },
    {
      id: 'cram',
      label: '刷题应试',
      description: '认知 +6 x 出身系数,体力 −3',
      apply: (s) => ({
        cognition: s.cognition + Math.round(LEARN_BASE.cram!.cognition * (ORIGIN_LEARN_MULTIPLIER[s.origin] ?? 1)),
        stamina: Math.max(0, s.stamina + LEARN_BASE.cram!.stamina),
      }),
    },
  ]
}

function workChoices(): EventChoice[] {
  return [
    {
      id: 'extra_shift',
      label: '多接一单',
      description: '财富 +¥8,000 x 出身系数,体力 −18',
      apply: (s) => ({
        wealth: s.wealth + Math.round(WORK_BASE.extra_shift!.wealth * (ORIGIN_WORK_MULTIPLIER[s.origin] ?? 1)),
        stamina: Math.max(0, s.stamina + WORK_BASE.extra_shift!.stamina),
      }),
    },
    {
      id: 'steady_shift',
      label: '稳定打工',
      description: '财富 +¥3,000 x 出身系数,体力 −8',
      apply: (s) => ({
        wealth: s.wealth + Math.round(WORK_BASE.steady_shift!.wealth * (ORIGIN_WORK_MULTIPLIER[s.origin] ?? 1)),
        stamina: Math.max(0, s.stamina + WORK_BASE.steady_shift!.stamina),
      }),
    },
  ]
}

function restChoices(): EventChoice[] {
  const recovery = ORIGIN_REST_RECOVERY['town_exam_kid'] ?? 10
  return [
    {
      id: 'club_activity',
      label: '参加社团活动',
      description: `心态 +15,体力 +${Math.round(recovery / 2)}`,
      apply: (s) => ({
        mood: Math.min(100, s.mood + 15),
        stamina: Math.min(100, s.stamina + Math.round(recovery / 2)),
      }),
    },
    {
      id: 'stay_in',
      label: '宅一天恢复',
      description: `体力 +${recovery},心态 +5`,
      apply: (s) => ({
        stamina: Math.min(100, s.stamina + recovery),
        mood: Math.min(100, s.mood + 5),
      }),
    },
  ]
}

function mentorChoice(rawRoll: number): EventChoice[] {
  const hit = rawRoll < (ORIGIN_MENTOR_FREE_HIT_PROB['town_exam_kid'] ?? 0.1)
  return [
    {
      id: hit ? 'mentor_hit' : 'mentor_miss',
      label: hit ? '免费贵人接住了你' : '免费贵人只是路过',
      description: hit ? '认知 +10,心态 +10' : '认知 +2(至少认识了个人)',
      apply: (s) =>
        hit
          ? { cognition: Math.min(100, s.cognition + 10), mood: Math.min(100, s.mood + 10) }
          : { cognition: Math.min(100, s.cognition + 2) },
    },
  ]
}

function startChoice(): EventChoice[] {
  return [
    {
      id: 'origin_set',
      label: '出身定型',
      description: '这是你的开局 —— 小镇做题家 × Web 2.0',
      apply: () => ({}),
    },
  ]
}

export function buildEventOffer(cell: Cell, rand: () => number): EventOffer {
  if (cell.type === 'mentor') {
    const mentorRoll = rand()
    return { cellId: cell.id, cellType: cell.type, choices: mentorChoice(mentorRoll), mentorRoll }
  }
  const choices: EventChoice[] =
    cell.type === 'learn' ? learnChoices() : cell.type === 'work' ? workChoices() : cell.type === 'rest' ? restChoices() : startChoice()
  return { cellId: cell.id, cellType: cell.type, choices }
}

export function resolveEventChoice(player: PlayerState, offer: EventOffer, choiceId: string): Partial<PlayerState> {
  const choice = offer.choices.find((c) => c.id === choiceId)
  if (!choice) throw new Error(`unknown event choice id: ${choiceId}`)
  return choice.apply(player)
}

// "平行命运" counterfactual — the SAME cell/choice/mentorRoll, resolved through
// PARALLEL_FATE_ORIGIN's coefficients instead of the real player's. See types.ts's ParallelState doc.
export function computeAltEventDelta(offer: EventOffer, choiceId: string, altPlayer: ParallelState): Partial<ParallelState> {
  const learnMult = ORIGIN_LEARN_MULTIPLIER[PARALLEL_FATE_ORIGIN] ?? 1
  const workMult = ORIGIN_WORK_MULTIPLIER[PARALLEL_FATE_ORIGIN] ?? 1
  const altRecovery = ORIGIN_REST_RECOVERY[PARALLEL_FATE_ORIGIN] ?? 10

  if (offer.cellType === 'learn') {
    const base = LEARN_BASE[choiceId]
    if (!base) return {}
    return {
      cognition: altPlayer.cognition + Math.round(base.cognition * learnMult),
      stamina: Math.max(0, altPlayer.stamina + base.stamina),
    }
  }
  if (offer.cellType === 'work') {
    const base = WORK_BASE[choiceId]
    if (!base) return {}
    return {
      wealth: altPlayer.wealth + Math.round(base.wealth * workMult),
      stamina: Math.max(0, altPlayer.stamina + base.stamina),
    }
  }
  if (offer.cellType === 'rest') {
    return choiceId === 'club_activity'
      ? { mood: Math.min(100, altPlayer.mood + 15), stamina: Math.min(100, altPlayer.stamina + Math.round(altRecovery / 2)) }
      : { stamina: Math.min(100, altPlayer.stamina + altRecovery), mood: Math.min(100, altPlayer.mood + 5) }
  }
  if (offer.cellType === 'mentor') {
    const altHitProb = ORIGIN_MENTOR_FREE_HIT_PROB[PARALLEL_FATE_ORIGIN] ?? 0.3
    const altHit = (offer.mentorRoll ?? 1) < altHitProb
    return altHit
      ? { cognition: Math.min(100, altPlayer.cognition + 10), mood: Math.min(100, altPlayer.mood + 10) }
      : { cognition: Math.min(100, altPlayer.cognition + 2) }
  }
  return {}
}

export function computeAltMentorHit(offer: EventOffer): boolean | null {
  if (offer.cellType !== 'mentor' || offer.mentorRoll === undefined) return null
  const altHitProb = ORIGIN_MENTOR_FREE_HIT_PROB[PARALLEL_FATE_ORIGIN] ?? 0.3
  return offer.mentorRoll < altHitProb
}
