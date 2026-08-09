import type { AttributionDimension, CoachOutput, DiceRollResult, DiceTier } from '../types'
import { getCoachLine } from '../data/coachLines'

// Deterministic mapping from the 4 dice-roll modifier terms to the 4 canonical attribution
// dimensions (出身 x 时代 x 认知 x 情绪, source doc §5.5). originMod/eraMod map directly.
// stateMod (driven by stamina/mood thresholds) maps to emotion; eventMod (driven by which
// cell-type you departed from, e.g. mentor cells) maps to cognition — the closest honest
// reading available without a live-LLM attribution model. Documented simplification for the
// intro scene scope; see docs/levels/intro_scene.md §8.
export function dominantDimension(dice: DiceRollResult): { dominant: AttributionDimension; dominantShare: number } {
  const weights: Record<AttributionDimension, number> = {
    origin: Math.abs(dice.originMod),
    era: Math.abs(dice.eraMod),
    emotion: Math.abs(dice.stateMod),
    cognition: Math.abs(dice.eventMod),
  }
  const total = weights.origin + weights.era + weights.emotion + weights.cognition
  const entries = Object.entries(weights) as [AttributionDimension, number][]
  entries.sort((a, b) => b[1] - a[1])
  const [dominant, weight] = entries[0]!
  const dominantShare = total > 0 ? weight / total : 0.25
  return { dominant, dominantShare }
}

export function buildCoachOutput(dice: DiceRollResult, tier: DiceTier): CoachOutput {
  const { dominant, dominantShare } = dominantDimension(dice)
  return { dominant, dominantShare, line: getCoachLine(tier, dominant) }
}
