// core/simulation/playerModel.ts — 玩家替身（影子勇者）确定性采样

import { WORLD } from '../world/world';
import { ROUND_TABLE, PLAYER_WINDUP_TIME } from '../constants';
import type { BossState, PlayerPresence, Vector3 } from '../types';
import { damp, lerp } from '../math';

export interface PlayerSampleInput {
  round: number;
  phaseTime: number;            // 当前阶段内时间
  phase: string;
  boss: BossState;
  barrageActive: boolean;
  beatType?: string | null;     // 攻击节拍中替身停手围观（不打断演出）
}

const HIT_INTERVAL_BY_ROUND = [9.5, 8.5, 7.5, 6.5];
const APPROACH_SPAN = 14.4;     // z: 16 → 1.6

function clamp01(v: number): number {
  return v < 0 ? 0 : v > 1 ? 1 : v;
}

/** 影子位置：走廊 → 王座（逼近 / 缠斗 / 撤退围观） */
export function sample(input: PlayerSampleInput): PlayerPresence {
  const { round, phaseTime, phase, boss } = input;
  const table = ROUND_TABLE[Math.min(round, ROUND_TABLE.length) - 1];
  const from = WORLD.shadowPath.from;
  const to = WORLD.shadowPath.to;

  let pos: Vector3 = { x: from.x, y: 0, z: from.z };
  let state: PlayerPresence['state'] = 'approaching';
  let windup = 0;
  let attacking = false;
  let lingerTime = 0;

  if (phase === 'MENU' || phase === 'ENDING_NORMAL' || phase === 'ENDING_HIDDEN') {
    state = 'gone';
    pos = { x: from.x, y: 0, z: from.z };
  } else if (phase === 'WAIT' || phase === 'SENSE') {
    // 走廊逼近，带小幅横向摇曳
    const progress = clamp01((table.approachSpeed * 0.95 * phaseTime) / APPROACH_SPAN);
    const sway = Math.sin(phaseTime * 1.7) * 0.35;
    pos = { x: lerp(from.x, to.x, progress) + sway, y: 0, z: lerp(from.z, to.z, progress) };
    if (progress >= 1) state = 'engaging';
  } else if (phase === 'PERFORM') {
    // 缠斗：绕 Boss 前场机动，周期性前摇出招
    state = 'engaging';
    const targetX = boss.pos.x + Math.sin(phaseTime * 0.55) * 2.2 + Math.sin(phaseTime * 0.9) * 0.6;
    const targetZ = boss.pos.z - 2.6;
    pos = {
      x: damp(boss.pos.x + Math.sin(phaseTime * 0.55) * 2.2 + Math.sin(phaseTime * 0.9) * 0.6, targetX, 2.5, 1 / 60),
      y: 0,
      z: damp(boss.pos.z - 2.6, targetZ, 2.5, 1 / 60),
    };
    // 出招节奏：间隔随轮次缩短，前摇窗口内可反制；开演 3.5s 缓冲后再出第一刀。
    // 攻击节拍中停手围观（windup=0, attacking=false）
    const interval = HIT_INTERVAL_BY_ROUND[Math.min(round, 4) - 1] * (1 + Math.sin(phaseTime * 0.13) * 0.15);
    const attackTime = phaseTime + 3.5;
    const phaseIn = attackTime % interval;
    if (input.beatType === 'attack') {
      windup = 0;
      attacking = false;
    } else if (phaseIn < PLAYER_WINDUP_TIME) {
      windup = clamp01(phaseIn / PLAYER_WINDUP_TIME);
    } else if (phaseIn < PLAYER_WINDUP_TIME + 0.35) {
      windup = 1;
      attacking = true;
    }
  } else if (phase === 'EVALUATE' || phase === 'DIARY') {
    // 评估/日记：影子退到走廊口围观
    state = 'retreating';
    const retreat = clamp01(phaseTime / 6);
    pos = { x: lerp(boss.pos.x * 0.2, from.x, retreat), y: 0, z: lerp(boss.pos.z - 3, from.z, retreat) };
    lingerTime = 2 + retreat * 2;
  }

  const distanceToThrone = Math.hypot(pos.x - WORLD.thronePos.x, pos.z - WORLD.thronePos.z);
  const aggression = 0.5 * table.approachSpeed + 0.5 * (table.damage / 30);

  return {
    pos,
    approachSpeed: table.approachSpeed,
    distanceToThrone,
    dodgeCount: 0,
    hitsLanded: 0,
    dodgeTimingQuality: 0,
    barrageActive: input.barrageActive,
    aggression,
    lingerTime,
    state,
    windup,
    attacking,
  };
}
