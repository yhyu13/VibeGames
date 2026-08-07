/**
 * core/simulation/juiceEvents.ts — Juice 事件发射(冻结接口,见 TDD §5.6)
 *
 * M2 由 agent-core 实现:击拍完整 juice 包(shake + particle + sfx + squash)、
 * milestone 慢镜 + 观众反应、失分方反馈、终局 win/lose。
 */

import { CAMERA_SHAKE_INTENSITY_BASE, CAMERA_SHAKE_INTENSITY_MAX, CAMERA_SHAKE_INTENSITY_PER_SPEED, CAMERA_SHAKE_DURATION, PARTICLE_COUNT_MAX, PARTICLE_COUNT_MIN } from '../constants';
import { clamp } from '../math';
import type { Ball, Side, SimEvent } from '../types';

export function emitHitJuice(
  side: Side,
  ball: Ball,
  _emit: (e: SimEvent) => void,
): void {
  // M2 填充:cameraShake + particleBurst + sfx + paddleSquash
  const intensity = clamp(
    CAMERA_SHAKE_INTENSITY_BASE + (ball.speed - 8) * CAMERA_SHAKE_INTENSITY_PER_SPEED,
    CAMERA_SHAKE_INTENSITY_BASE,
    CAMERA_SHAKE_INTENSITY_MAX,
  );
  _emit({ type: 'cameraShake', payload: { intensity, duration: CAMERA_SHAKE_DURATION } });
  _emit({ type: 'paddleSquash', payload: { side, amount: 1.0 } });
  _emit({
    type: 'particleBurst',
    payload: {
      position: { x: ball.position.x, y: ball.position.y, z: ball.position.z },
      count: PARTICLE_COUNT_MIN,
      color: side === 'P1' ? '#3affc8' : '#ff7a3a',
    },
  });
  _emit({ type: 'sfx', payload: { id: 'pata', volume: 1.0 } });
  // Suppress unused param hint when M2 expands
  void PARTICLE_COUNT_MAX;
}

export function emitMilestoneJuice(
  hits: number,
  index: number,
  _emit: (e: SimEvent) => void,
): void {
  // M2 填充:slowmo + audienceCheer + 累积 SFX
  void hits;
  const factor = [0.6, 0.5, 0.4, 0.4][index] ?? 0.4;
  const duration = [0.2, 0.25, 0.3, 0.3][index] ?? 0.3;
  _emit({ type: 'slowmo', payload: { factor, duration } });
  _emit({
    type: 'audienceCheer',
    payload: { intensity: index >= 2 ? 'max' : index === 1 ? 'large' : 'small' },
  });
  const sfxId: 'pataPata' | 'pata3' | 'pataPataPong' = index === 0 ? 'pataPata' : index === 1 ? 'pata3' : 'pataPataPong';
  _emit({ type: 'sfx', payload: { id: sfxId, volume: 1.0 } });
}

/** 失分反馈音量(低于击拍 1.0,避免刺耳) */
const POINT_SFX_VOLUME = 0.6;

/** 失分方反馈:玩家失分(AI 得分)→ 'lose' 小调琶音;玩家得分 → 同音量 'pata' 正向音 */
export function emitPointJuice(winner: Side, emit: (e: SimEvent) => void): void {
  const sfxId = winner === 'AI' ? 'lose' : 'pata';
  emit({ type: 'sfx', payload: { id: sfxId, volume: POINT_SFX_VOLUME } });
}

export function emitMatchOverJuice(winner: Side, _emit: (e: SimEvent) => void): void {
  _emit({ type: 'sfx', payload: { id: winner === 'P1' ? 'win' : 'lose', volume: 1.0 } });
}
