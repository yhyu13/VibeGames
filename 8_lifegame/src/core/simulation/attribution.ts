import type { AttributionDimension, CellType, CoachOutput, DiceRollResult, DiceTier } from '../types'
import { getCoachLine } from '../data/coachLines'

// Which dimension actually drove THIS turn's outcome, tied to what happened (cell type landed
// on, whether a mentor-catch landed) rather than the dice-roll modifiers' raw magnitudes.
//
// Earlier version compared |originMod|/|eraMod|/|stateMod|/|eventMod| directly — but originMod
// is a CONSTANT -2 every single roll (only one origin is playable this scope) while the others
// are usually 0 or small, so origin won almost every comparison by construction, not because
// origin was actually what mattered that turn. Real playtesting caught this ("为什么出身一直增
// 加" — the bar never moved off origin). Fixed by attributing categorically:
//   - an extreme stamina/mood swing (both thresholds hit, |stateMod|>=2) overrides everything —
//     a clearly state-driven roll should read as 情绪, regardless of which cell it happened on;
//   - otherwise, the cell type you're resolving IS the dimension that turn is "about": a
//     learning cell foregrounds 认知, a work cell foregrounds 出身 (the doc's sharpest asymmetry
//     — origin's work-multiplier penalty, per GDD.md's "工作收益-20%更狠"), a rest cell
//     foregrounds 情绪, and a mentor cell foregrounds 认知 on a catch (读懂了多少) or 出身 on a
//     miss (谁被出身挡在门外);
//   - 时代 is never dominant this scope — eraMod is frozen at 0 (see GDD.md §2), so there is
//     truthfully nothing era-driven happening yet. That's an honest silence, not a bug.
function categoryFor(cellType: CellType, mentorHit: boolean | null): AttributionDimension {
  if (cellType === 'learn') return 'cognition'
  if (cellType === 'work') return 'origin'
  if (cellType === 'rest') return 'emotion'
  if (cellType === 'mentor') return mentorHit ? 'cognition' : 'origin'
  return 'origin' // 'start' / 'special' — the origin-defining beat
}

function shareForTier(tier: DiceTier): number {
  if (tier === 'big_fail' || tier === 'awaken') return 0.7
  if (tier === 'fail' || tier === 'big_success') return 0.6
  return 0.5
}

export function dominantDimension(
  dice: DiceRollResult,
  cellType: CellType,
  mentorHit: boolean | null,
): { dominant: AttributionDimension; dominantShare: number } {
  if (Math.abs(dice.stateMod) >= 2) {
    return { dominant: 'emotion', dominantShare: shareForTier(dice.tier) }
  }
  return { dominant: categoryFor(cellType, mentorHit), dominantShare: shareForTier(dice.tier) }
}

export function buildCoachOutput(dice: DiceRollResult, cellType: CellType, mentorHit: boolean | null): CoachOutput {
  const { dominant, dominantShare } = dominantDimension(dice, cellType, mentorHit)
  return { dominant, dominantShare, line: getCoachLine(dice.tier, dominant) }
}
