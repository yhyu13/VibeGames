/**
 * core/simulation/juiceEvents.ts — Juice 事件发射(冻结接口,见 TDD §5.6)
 *
 * M1 占位(M1 hit 仅 0 juice),M2 实际填充。
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

export function emitPointJuice(_winner: Side, _emit: (e: SimEvent) => void): void {
  // M2 填充:失分 A 小调琶音(由 AudioManager 自行处理,SimEvent 仅 'sfx' for 'lose' hint)
}

export function emitMatchOverJuice(winner: Side, _emit: (e: SimEvent) => void): void {
  _emit({ type: 'sfx', payload: { id: winner === 'P1' ? 'win' : 'lose', volume: 1.0 } });
}
