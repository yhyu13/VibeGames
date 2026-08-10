/**
 * core/simulation/boss.ts — Moloch 回合机器(冻结,见 TDD §4.3 / §6)
 *
 * 回合模型:每个命令结算后,预告中的攻击落地 → 新预告开始;
 * 玩家停滞 BOSS_AUTO_TURN_S 也会强制出手。HP ≤ BOSS_ENRAGE_HP 进入
 * enrage(伤害 ×1.5)。RNG 只走构造注入的种子 rng。
 */

import {
  BOSS_ENRAGE_DAMAGE_MULT,
  BOSS_ENRAGE_HP,
  BOSS_FIREBALL_DAMAGE,
  BOSS_SLAM_DAMAGE,
  BOSS_SWIPE_DAMAGE,
  UNIT_STATE_FLASH_S,
} from '../constants.js';
import type { ArmyState, BossAttack, BossState } from '../types.js';
import { damageUnit, livingUnits } from './combat.js';

const ATTACKS: readonly BossAttack[] = ['SWIPE', 'SLAM', 'FIREBALL'];

/** 选下一个预告攻击(种子 RNG) */
export function pickBossAttack(rng: () => number): BossAttack {
  return ATTACKS[Math.floor(rng() * ATTACKS.length)] ?? 'SWIPE';
}

/** 开始新预告(enrage 后闪态更短 = 更快出手) */
export function startTelegraph(boss: BossState, attack: BossAttack): void {
  boss.telegraph = attack;
  boss.state = 'telegraph';
  boss.stateTimeLeft = boss.enraged ? UNIT_STATE_FLASH_S / 2 : UNIT_STATE_FLASH_S;
}

export interface BossAttackResult {
  attack: BossAttack;
  damage: number;
  dodged: boolean;
}

/**
 * 落地已预告的攻击。DEFEND(defendTurns>0)减半;RETREAT(retreatTurns>0)闪避。
 * SWIPE/SLAM 打全体存活单位,FIREBALL 打随机一个存活单位(种子 RNG)。
 */
export function executeBossAttack(
  boss: BossState,
  army: ArmyState,
  rng: () => number,
): BossAttackResult | null {
  const attack = boss.telegraph;
  boss.telegraph = null;
  if (!attack) return null;

  let damage =
    attack === 'FIREBALL' ? BOSS_FIREBALL_DAMAGE : attack === 'SLAM' ? BOSS_SLAM_DAMAGE : BOSS_SWIPE_DAMAGE;
  if (boss.enraged) damage *= BOSS_ENRAGE_DAMAGE_MULT;

  const dodged = army.retreatTurns > 0;
  if (army.defendTurns > 0) damage *= 0.5; // DEFEND_REDUCTION

  boss.state = 'attack';
  boss.stateTimeLeft = UNIT_STATE_FLASH_S;
  boss.attackCount += 1;

  if (!dodged) {
    const targets =
      attack === 'FIREBALL'
        ? (() => {
            const alive = livingUnits(army);
            const picked = alive[Math.floor(rng() * alive.length)];
            return picked ? [picked] : [];
          })()
        : livingUnits(army);
    for (const unit of targets) damageUnit(unit, damage);
  }

  return { attack, damage, dodged };
}

/** 扣血后检查 enrage 阈值(幂等) */
export function updateEnrage(boss: BossState): void {
  if (!boss.enraged && boss.hp <= BOSS_ENRAGE_HP) boss.enraged = true;
}
