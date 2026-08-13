/**
 * core/simulation/boss.ts - v2.0 boss turn machine
 *
 * Turn-based: after each player command (or BOSS_AUTO_TURN_S of idle play)
 * the boss telegraphs an attack, then executes it. Defend halves damage,
 * Retreat dodges it. Enrage at BOSS_ENRAGE_HP boosts damage + speed.
 */

import {
  BOSS_ATTACK_DURATION_S,
  BOSS_ENRAGE_DAMAGE_MULT,
  BOSS_ENRAGE_TELEGRAPH_MULT,
  BOSS_FIREBALL_DAMAGE,
  BOSS_SLAM_DAMAGE,
  BOSS_SWIPE_DAMAGE,
  BOSS_TELEGRAPH_S,
  DEFEND_REDUCTION,
} from '../constants';
import type { ArmyState, BossAttack, BossState, SimEvent, Unit } from '../types';
import { damageUnit } from './combat';
import { emitBossAttackJuice, emitBossTelegraphJuice } from './juiceEvents';

export function pickBossAttack(rng: () => number): BossAttack {
  const roll = rng();
  if (roll < 0.4) return 'SWIPE';
  if (roll < 0.75) return 'SLAM';
  return 'FIREBALL';
}

/** Boss commits to an attack (telegraph phase). Only from idle. */
export function startBossTurn(
  boss: BossState,
  rng: () => number,
  emit: (e: SimEvent) => void,
): void {
  const attack = pickBossAttack(rng);
  const duration = boss.enraged
    ? BOSS_TELEGRAPH_S * BOSS_ENRAGE_TELEGRAPH_MULT
    : BOSS_TELEGRAPH_S;
  boss.state = 'telegraph';
  boss.stateTimeLeft = duration;
  boss.telegraph = attack;
  emit({ type: 'bossTelegraph', payload: { attack, duration, position: { ...boss.position } } });
  emitBossTelegraphJuice(attack, { ...boss.position }, emit);
}

/** Advance boss state machine by dt (attack/hit decay back to idle). */
export function tickBoss(boss: BossState, dt: number): void {
  if (boss.state === 'attack' || boss.state === 'hit') {
    boss.stateTimeLeft -= dt;
    if (boss.stateTimeLeft <= 0) {
      boss.state = 'idle';
      boss.stateTimeLeft = 0;
    }
  }
}

/** Resolve the telegraphed attack against the army. */
export function executeBossAttack(
  boss: BossState,
  army: ArmyState,
  rng: () => number,
  emit: (e: SimEvent) => void,
): void {
  const attack = boss.telegraph ?? 'SWIPE';
  const base =
    attack === 'SWIPE'
      ? BOSS_SWIPE_DAMAGE
      : attack === 'SLAM'
        ? BOSS_SLAM_DAMAGE
        : BOSS_FIREBALL_DAMAGE;
  const mult = boss.enraged ? BOSS_ENRAGE_DAMAGE_MULT : 1;
  const evaded = army.retreatTurns > 0;
  army.retreatTurns = 0;

  let dealt = 0;
  if (!evaded) {
    const reduction = army.defendTurns > 0 ? DEFEND_REDUCTION : 1;
    army.defendTurns = 0;
    const damage = base * mult * reduction;
    if (attack === 'FIREBALL') {
      const alive = army.units.filter((u) => u.hp > 0);
      if (alive.length > 0) {
        const target = alive[Math.floor(rng() * alive.length)];
        if (target) damageUnit(target, damage, emit);
      }
    } else {
      for (const unit of army.units) {
        damageUnit(unit, damage, emit);
      }
    }
    dealt = damage;
  }

  boss.state = 'attack';
  boss.stateTimeLeft = BOSS_ATTACK_DURATION_S;
  boss.telegraph = null;
  boss.attackCount += 1;
  emit({
    type: 'bossAttack',
    payload: { attack, damage: dealt, evaded, position: { ...boss.position } },
  });
  emitBossAttackJuice({ ...boss.position }, evaded, emit);
}

export function bossAlive(boss: BossState): boolean {
  return boss.hp > 0;
}

export function pickFireballTarget(units: Unit[], rng: () => number): Unit | null {
  const alive = units.filter((u) => u.hp > 0);
  if (alive.length === 0) return null;
  return alive[Math.floor(rng() * alive.length)] ?? null;
}
