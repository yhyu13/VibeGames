/**
 * core/simulation/combat.ts - v2.0 HP damage / heal (army units + boss)
 */

import { HIT_DURATION, UNIT_HP_MAX } from '../constants';
import type { ArmyState, BossState, SimEvent, Unit } from '../types';

export function damageUnit(unit: Unit, amount: number, emit: (e: SimEvent) => void): void {
  if (unit.hp <= 0) return;
  unit.hp = Math.max(0, unit.hp - amount);
  unit.state = unit.hp <= 0 ? 'defeat' : 'hit';
  unit.stateTimeLeft = HIT_DURATION;
  emit({ type: 'damageDealt', payload: { to: unit.side, amount, from: 'BOSS' } });
}

export function healUnit(unit: Unit, amount: number, emit: (e: SimEvent) => void): void {
  if (unit.hp <= 0) return;
  const healed = Math.min(UNIT_HP_MAX - unit.hp, amount);
  if (healed <= 0) return;
  unit.hp += healed;
  emit({ type: 'healApplied', payload: { to: unit.side, amount: healed } });
}

export function damageBoss(boss: BossState, amount: number, emit: (e: SimEvent) => void): void {
  if (boss.hp <= 0) return;
  boss.hp = Math.max(0, boss.hp - amount);
  // do NOT clobber a pending 'telegraph' (the attack must still land)
  if (boss.state === 'idle') {
    boss.state = 'hit';
    boss.stateTimeLeft = HIT_DURATION;
  }
  emit({ type: 'damageDealt', payload: { to: 'BOSS', amount, from: 'P1' } });
  emit({ type: 'bossHit', payload: { damage: amount, position: { ...boss.position } } });
}

export function armyTotalHp(army: ArmyState): number {
  return army.units.reduce((sum, u) => sum + u.hp, 0);
}

export function armyAliveCount(army: ArmyState): number {
  return army.units.filter((u) => u.hp > 0).length;
}
