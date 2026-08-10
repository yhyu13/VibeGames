/**
 * core/simulation/matchOver.ts — 胜负判定(冻结,见 TDD §6)
 *
 * boss HP 0 → P1 胜;军队全灭 → BOSS 胜;否则 null。
 */

import type { ArmyState, BossState, Side } from '../types.js';
import { livingUnits } from './combat.js';

export function checkMatchOver(army: ArmyState, boss: BossState): Side | null {
  if (boss.hp <= 0) return 'P1';
  if (livingUnits(army).length === 0) return 'BOSS';
  return null;
}
