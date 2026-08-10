import type { DiceTier } from '../core/types'

// Single source for tier display labels — shared by DiceRoller (the roll readout) and
// ParallelFateCard (both trajectories' tier readouts) so the 5 tier names can't drift.
export const TIER_LABEL: Record<DiceTier, string> = {
  big_fail: '大失败',
  fail: '失败',
  success: '成功',
  big_success: '大成功',
  awaken: '觉醒成功',
}
