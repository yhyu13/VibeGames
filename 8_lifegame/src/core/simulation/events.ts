import type {
  DiceTier,
  EventOffer,
  LocationEventKind,
  LocationEventChoice,
  NumericStat,
  Origin,
  ParallelState,
  PlayerState,
  StatDelta,
} from '../types'
import {
  ORIGIN_LEARN_MULTIPLIER,
  ORIGIN_WORK_MULTIPLIER,
  ORIGIN_REST_RECOVERY,
  ORIGIN_MENTOR_FREE_HIT_PROB,
  MENTOR_TRUST_HIT_PROB,
  MENTOR_FAVOR_HIT_BONUS,
  MENTOR_FAVOR_MAX,
} from '../constants'
import { LOCATION_EVENTS, MENTOR_EVENTS, mentorEventsFor } from '../data/locationEvents'

// v1.2 §3 tier-factor table — tiers no longer move the token (spec §7.1); they scale the drawn
// event's outcome: awaken DODGES a trap / DOUBLES a boon, big_fail fumbles a boon / worsens a trap.
const BOON_FACTOR: Record<DiceTier, number> = { big_fail: 0, fail: 0.5, success: 1, big_success: 1.5, awaken: 2 }
const TRAP_FACTOR: Record<DiceTier, number> = { big_fail: 1.5, fail: 1, success: 0.5, big_success: 0.25, awaken: 0 }

export function tierFactorFor(tier: DiceTier, kind: LocationEventKind): number {
  return kind === 'trap' ? TRAP_FACTOR[tier] : BOON_FACTOR[tier]
}

// v2.5: 贵人好感 — story events with `mentorFavor` raise the office hit probability by
// MENTOR_FAVOR_HIT_BONUS per point, capped at MENTOR_FAVOR_MAX. The 信任 switch (有能力 ×
// 对口 → 90%) stays the dominant lever; 好感 is the "有人推了你一把" diversity channel.
export function mentorHitProbFor(origin: Origin, mentorTrusted: boolean, mentorFavor = 0): number {
  if (mentorTrusted) return MENTOR_TRUST_HIT_PROB
  const base = ORIGIN_MENTOR_FREE_HIT_PROB[origin] ?? 0.1
  return Math.min(0.9, base + MENTOR_FAVOR_HIT_BONUS * Math.max(0, Math.min(MENTOR_FAVOR_MAX, mentorFavor)))
}

// Weighted draw on arrival (spec §3) — one rand() draw against the location's weight table.
// The mentor office is the exception: the v1.1 probability roll decides hit/miss instead.
// v1.6 §2: 贵人信任 — 有能力 × 对口 swaps the origin-gated hit prob for the trust prob.
// v2.5: the office persona follows the chosen 方向 (mentorEventsFor) and 好感 raises the
// base hit prob. The parallel twin keeps favor 0 (favor is earned by YOUR story, not inherited).
export function drawLocationEvent(
  cellId: string,
  origin: Origin,
  rand: () => number,
  mentorTrusted = false,
  mentorFavor = 0,
  track: string | null = null,
): EventOffer {
  if (cellId === 'mentor') {
    const mentorRoll = rand()
    const hitProb = mentorHitProbFor(origin, mentorTrusted, mentorFavor)
    const hit = mentorRoll < hitProb
    const pair = mentorEventsFor(track)
    return { event: hit ? pair.hit : pair.miss, mentorRoll, mentorTrusted }
  }
  const table = LOCATION_EVENTS[cellId]
  if (!table || table.length === 0) throw new Error(`no location event table for cell: ${cellId}`)
  const totalWeight = table.reduce((sum, e) => sum + e.weight, 0)
  let roll = rand() * totalWeight
  for (const event of table) {
    roll -= event.weight
    if (roll < 0) return { event }
  }
  return { event: table[table.length - 1]! }
}

function originCoefficient(coefficient: LocationEventChoice['coefficient'], origin: Origin): number {
  if (coefficient === 'learn') return ORIGIN_LEARN_MULTIPLIER[origin] ?? 1
  if (coefficient === 'work') return ORIGIN_WORK_MULTIPLIER[origin] ?? 1
  if (coefficient === 'rest') return ORIGIN_REST_RECOVERY[origin] ?? 10
  return 1
}

// Spec §3 resolution pipeline, per stat: base × (stat ∈ coefficientStats ? ORIGIN_*[origin] : 1)
// × (stat ∈ scaledStats ? tierFactor : 1) → round. The add + clamp happens in applyStatDelta.
export function computeScaledDelta(
  choice: LocationEventChoice,
  scaledStats: NumericStat[],
  tierFactor: number,
  origin: Origin,
): StatDelta {
  const out: StatDelta = {}
  const coeff = originCoefficient(choice.coefficient, origin)
  for (const key of Object.keys(choice.delta) as NumericStat[]) {
    const base = choice.delta[key]
    if (base === undefined) continue
    const withCoeff = choice.coefficientStats.includes(key) ? base * coeff : base
    const withTier = scaledStats.includes(key) ? withCoeff * tierFactor : withCoeff
    // Round symmetrically: JS Math.round(-7.5) → -7 (half toward +∞) would bias negative
    // trap/boon deltas toward zero vs their positive counterparts. Abs-then-sign gives -8.
    out[key] = Math.round(Math.abs(withTier)) * (withTier < 0 ? -1 : 1)
  }
  return out
}

// Canonical clamps (spec §7.6): cognition/stamina/mood clamp to [0,100]; wealth is unclamped.
export function applyStatDelta(
  stats: { wealth: number; cognition: number; stamina: number; mood: number },
  delta: StatDelta,
): { wealth: number; cognition: number; stamina: number; mood: number } {
  const merge = (key: NumericStat, clamp: boolean): number => {
    const d = delta[key]
    if (d === undefined) return stats[key]
    const v = stats[key] + d
    return clamp ? Math.max(0, Math.min(100, v)) : v
  }
  return { wealth: merge('wealth', false), cognition: merge('cognition', true), stamina: merge('stamina', true), mood: merge('mood', true) }
}

// Real trajectory: the player's OWN tier scales the outcome (spec §3).
export function resolveEventChoice(
  player: PlayerState,
  offer: EventOffer,
  choiceId: string,
  tier: DiceTier,
): Partial<PlayerState> {
  const choice = offer.event.choices.find((c) => c.id === choiceId)
  if (!choice) throw new Error(`unknown event choice id: ${choiceId}`)
  const factor = tierFactorFor(tier, offer.event.kind)
  return applyStatDelta(player, computeScaledDelta(choice, offer.event.scaledStats, factor, player.origin))
}

// "平行命运" counterfactual — the SAME drawn event + SAME choice, resolved through
// PARALLEL_FATE_ORIGIN's coefficients and the twin's OWN tier (from rollAltDice — same physical
// dice, different total, possibly different tier; the card shows the alt tier next to these
// deltas, so they must agree). Mentor office: the twin's hit/miss is checked independently
// against the SAME mentorRoll (v1.1 semantics preserved — 30% vs 10% catch rate).
export function computeAltEventDelta(
  offer: EventOffer,
  choiceId: string,
  altPlayer: ParallelState,
  altTier: DiceTier,
  altMentorTrusted = false,
): Partial<ParallelState> {
  if (offer.event.cellType === 'mentor' && offer.mentorRoll !== undefined) {
    const altProb = altMentorTrusted ? MENTOR_TRUST_HIT_PROB : (ORIGIN_MENTOR_FREE_HIT_PROB[altPlayer.origin] ?? 0.3)
    const altHit = offer.mentorRoll < altProb
    const entry = altHit ? MENTOR_EVENTS.hit : MENTOR_EVENTS.miss
    const choice = entry.choices[0]!
    const factor = tierFactorFor(altTier, entry.kind)
    return applyStatDelta(altPlayer, computeScaledDelta(choice, entry.scaledStats, factor, altPlayer.origin))
  }
  const choice = offer.event.choices.find((c) => c.id === choiceId)
  if (!choice) throw new Error(`unknown event choice id: ${choiceId}`)
  const factor = tierFactorFor(altTier, offer.event.kind)
  return applyStatDelta(altPlayer, computeScaledDelta(choice, offer.event.scaledStats, factor, altPlayer.origin))
}

export function computeAltMentorHit(offer: EventOffer, altPlayer: ParallelState, altMentorTrusted = false): boolean | null {
  if (offer.event.cellType !== 'mentor' || offer.mentorRoll === undefined) return null
  const altHitProb = altMentorTrusted ? MENTOR_TRUST_HIT_PROB : (ORIGIN_MENTOR_FREE_HIT_PROB[altPlayer.origin] ?? 0.3)
  return offer.mentorRoll < altHitProb
}

// Mentor outcome is encoded in the choice id ('mentor_hit'/'mentor_miss') — decode it in ONE
// place instead of re-parsing magic strings at every consumer (Simulation coach build + the
// IntroScene parallel-fate card).
export function mentorHitFromChoiceId(choiceId: string | null): boolean | null {
  // v2.7: 'retrack_ai' is ALSO a mentor hit — 贵人指点 happened, the player just also switched
  // direction. The awakening/coach/finance-unlock must count it (otherwise choosing to 改押 AI
  // would silently forfeit the recognition the hit card is supposed to grant).
  if (choiceId === 'mentor_hit' || choiceId === 'retrack_ai') return true
  if (choiceId === 'mentor_miss') return false
  return null
}
