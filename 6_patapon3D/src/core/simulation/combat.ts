/**
 * core/simulation/combat.ts — 伤害结算(冻结数值,见 TDD §4.2/§4.3)
 *
 * 伤害 = base × quality × fever × berserk × proximity(VOLLEY 不吃 proximity)。
 * 注意:damageBoss **不得**覆盖 boss.telegraph(否则预告攻击丢失,
 * 见 CLAUDE.md「状态推进契约」)。
 */

import { PROXIMITY_FULL_RANGE, PROXIMITY_MAX_BONUS, UNIT_STATE_FLASH_S } from '../constants.js';
import { clamp } from '../math.js';
import type { ArmyState, BossState, Unit } from '../types.js';

export interface DamageMods {
  quality: number;
  feverMult: number;
  berserkMult: number;
  /** false = VOLLEY(不吃近身加成) */
  useProximity: boolean;
}

/** 阵型前沿(formationOffset)到 boss 的近身加成:0 .. PROXIMITY_MAX_BONUS */
export function proximityBonus(armyX: number, bossX: number): number {
  const distance = Math.max(0, bossX - armyX);
  return PROXIMITY_MAX_BONUS * clamp(1 - distance / PROXIMITY_FULL_RANGE, 0, 1);
}

/** 结算一次对 boss 的命令伤害 */
export function commandDamage(base: number, mods: DamageMods, armyX: number, bossX: number): number {
  const prox = mods.useProximity ? proximityBonus(armyX, bossX) : 0;
  return base * mods.quality * mods.feverMult * mods.berserkMult * (1 + prox);
}

/**
 * 对 boss 扣血并进入受击闪态。**刻意不写 telegraph 字段**:
 * 预告中的攻击必须在下个命令结算时照常落地。
 */
export function damageBoss(boss: BossState, damage: number): void {
  boss.hp = Math.max(0, boss.hp - damage);
  boss.state = 'hit';
  boss.stateTimeLeft = UNIT_STATE_FLASH_S;
}

/** 对单位扣血;归零 = defeat */
export function damageUnit(unit: Unit, damage: number): void {
  if (unit.state === 'defeat') return;
  unit.hp = Math.max(0, unit.hp - damage);
  unit.state = unit.hp <= 0 ? 'defeat' : 'hit';
  unit.stateTimeLeft = UNIT_STATE_FLASH_S;
}

/** 治疗单位(RALLY);defeat 单位不复活 */
export function healUnit(unit: Unit, amount: number): void {
  if (unit.state === 'defeat') return;
  unit.hp = Math.min(unit.maxHp, unit.hp + amount);
}

export function livingUnits(army: ArmyState): Unit[] {
  return army.units.filter((u) => u.state !== 'defeat');
}
