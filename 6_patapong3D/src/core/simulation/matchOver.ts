/**
 * core/simulation/matchOver.ts - v2.0 win/lose evaluation
 */

import type { ArmyState, BossState, SimEvent } from '../types';
import { armyAliveCount, armyTotalHp } from './combat';

export function checkMatchOver(army: ArmyState, boss: BossState): SimEvent | null {
  if (armyAliveCount(army) <= 0) {
    return {
      type: 'matchOver',
      payload: { winner: 'BOSS', finalHp: { p1: armyTotalHp(army), boss: boss.hp } },
    };
  }
  if (boss.hp <= 0) {
    return {
      type: 'matchOver',
      payload: { winner: 'P1', finalHp: { p1: armyTotalHp(army), boss: boss.hp } },
    };
  }
  return null;
}
