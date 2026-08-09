import type { Cell, EventChoice, EventOffer, PlayerState } from '../types'
import { ORIGIN_LEARN_MULTIPLIER, ORIGIN_WORK_MULTIPLIER, ORIGIN_REST_RECOVERY } from '../constants'

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
        cognition: s.cognition + Math.round(12 * (ORIGIN_LEARN_MULTIPLIER[s.origin] ?? 1)),
        stamina: Math.max(0, s.stamina - 8),
      }),
    },
    {
      id: 'cram',
      label: '刷题应试',
      description: '认知 +6 x 出身系数,体力 −3',
      apply: (s) => ({
        cognition: s.cognition + Math.round(6 * (ORIGIN_LEARN_MULTIPLIER[s.origin] ?? 1)),
        stamina: Math.max(0, s.stamina - 3),
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
        wealth: s.wealth + Math.round(8000 * (ORIGIN_WORK_MULTIPLIER[s.origin] ?? 1)),
        stamina: Math.max(0, s.stamina - 18),
      }),
    },
    {
      id: 'steady_shift',
      label: '稳定打工',
      description: '财富 +¥3,000 x 出身系数,体力 −8',
      apply: (s) => ({
        wealth: s.wealth + Math.round(3000 * (ORIGIN_WORK_MULTIPLIER[s.origin] ?? 1)),
        stamina: Math.max(0, s.stamina - 8),
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

function mentorChoice(rand: () => number): EventChoice[] {
  const hit = rand() < 0.1 // town_exam_kid free-tier hit prob, mid of 5-15% per source doc §4.4
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
  const choices: EventChoice[] =
    cell.type === 'learn'
      ? learnChoices()
      : cell.type === 'work'
        ? workChoices()
        : cell.type === 'rest'
          ? restChoices()
          : cell.type === 'mentor'
            ? mentorChoice(rand)
            : startChoice()
  return { cellId: cell.id, cellType: cell.type, choices }
}

export function resolveEventChoice(player: PlayerState, offer: EventOffer, choiceId: string): Partial<PlayerState> {
  const choice = offer.choices.find((c) => c.id === choiceId)
  if (!choice) throw new Error(`unknown event choice id: ${choiceId}`)
  return choice.apply(player)
}
