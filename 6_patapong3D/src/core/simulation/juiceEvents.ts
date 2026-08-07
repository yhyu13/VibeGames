/**
 * core/simulation/juiceEvents.ts — Juice 事件发射(冻结接口,见 TDD §5.6)
 *
 * M3 由 agent-core 实现:击拍完整 juice 包(shake + particle + sfx + squash)、
 * milestone 慢镜 + 观众反应、失分方反馈、终局 win/lose。
 * 数值一律取自 constants.ts / data/colors.ts,无硬编码魔法数。
 */

import {
  BALL_SPEED_INITIAL,
  CAMERA_SHAKE_DURATION,
  CAMERA_SHAKE_INTENSITY_BASE,
  CAMERA_SHAKE_INTENSITY_MAX,
  CAMERA_SHAKE_INTENSITY_PER_SPEED,
  PARTICLE_COUNT_MIN,
  SLOWMO_DURATIONS,
  SLOWMO_FACTORS,
} from '../constants';
import { COLORS } from '../data/colors';
import { clamp } from '../math';
import type { Ball, Side, SimEvent } from '../types';

/** 击拍 / milestone / 终局 sfx 全音量 */
const FULL_SFX_VOLUME = 1.0;
/** 失分反馈音量(低于全音量,避免刺耳) */
const POINT_SFX_VOLUME = 0.6;
/** paddleSquash 事件量 1.0 = 满 squash(VoxelRenderer 按 0..1 插值缩放) */
const SQUASH_AMOUNT_FULL = 1.0;
/** 慢镜参数回退:index 越界时用最后一档(与「10+ 拍重复 7 拍档」语义一致) */
const SLOWMO_FACTOR_FALLBACK = SLOWMO_FACTORS[SLOWMO_FACTORS.length - 1]!; // 冻结表非空
const SLOWMO_DURATION_FALLBACK = SLOWMO_DURATIONS[SLOWMO_DURATIONS.length - 1]!; // 冻结表非空

export function emitHitJuice(
  side: Side,
  ball: Ball,
  emit: (e: SimEvent) => void,
): void {
  // cameraShake + particleBurst + sfx + paddleSquash(全部同帧触发,设计文档 §6)
  const intensity = clamp(
    CAMERA_SHAKE_INTENSITY_BASE + (ball.speed - BALL_SPEED_INITIAL) * CAMERA_SHAKE_INTENSITY_PER_SPEED,
    CAMERA_SHAKE_INTENSITY_BASE,
    CAMERA_SHAKE_INTENSITY_MAX,
  );
  emit({ type: 'cameraShake', payload: { intensity, duration: CAMERA_SHAKE_DURATION } });
  emit({ type: 'paddleSquash', payload: { side, amount: SQUASH_AMOUNT_FULL } });
  emit({
    type: 'particleBurst',
    payload: {
      position: { x: ball.position.x, y: ball.position.y, z: ball.position.z },
      count: PARTICLE_COUNT_MIN,
      color: side === 'P1' ? COLORS.P1_BODY : COLORS.AI_BODY,
    },
  });
  emit({ type: 'sfx', payload: { id: 'pata', volume: FULL_SFX_VOLUME } });
}

export function emitMilestoneJuice(
  hits: number,
  index: number,
  emit: (e: SimEvent) => void,
): void {
  // slowmo + audienceCheer + 累积 SFX;慢镜数值按档取 constants,越界回退最后一档
  void hits;
  const factor = SLOWMO_FACTORS[index] ?? SLOWMO_FACTOR_FALLBACK;
  const duration = SLOWMO_DURATIONS[index] ?? SLOWMO_DURATION_FALLBACK;
  emit({ type: 'slowmo', payload: { factor, duration } });
  emit({
    type: 'audienceCheer',
    payload: { intensity: index >= 2 ? 'max' : index === 1 ? 'large' : 'small' },
  });
  const sfxId: 'pataPata' | 'pata3' | 'pataPataPong' = index === 0 ? 'pataPata' : index === 1 ? 'pata3' : 'pataPataPong';
  emit({ type: 'sfx', payload: { id: sfxId, volume: FULL_SFX_VOLUME } });
}

/** 失分方反馈:玩家失分(AI 得分)→ 'lose' 小调琶音;玩家得分 → 同音量 'pata' 正向音 */
export function emitPointJuice(winner: Side, emit: (e: SimEvent) => void): void {
  const sfxId = winner === 'AI' ? 'lose' : 'pata';
  emit({ type: 'sfx', payload: { id: sfxId, volume: POINT_SFX_VOLUME } });
}

export function emitMatchOverJuice(winner: Side, emit: (e: SimEvent) => void): void {
  emit({ type: 'sfx', payload: { id: winner === 'P1' ? 'win' : 'lose', volume: FULL_SFX_VOLUME } });
}
