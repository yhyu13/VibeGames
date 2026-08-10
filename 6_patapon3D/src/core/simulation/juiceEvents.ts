/**
 * core/simulation/juiceEvents.ts — v2.0 juice 事件发射器
 *
 * 把「手感」副作用统一成 SimEvent(cameraShake / particleBurst / sfx /
 * audienceCheer)。core 唯一的副作用出口。
 * 数值一律取自 constants.ts / data/colors.ts,无硬编码魔法数。
 */

import {
  CAMERA_SHAKE_DURATION,
  CAMERA_SHAKE_INTENSITY_BASE,
  PARTICLE_COUNT_MAX,
  PARTICLE_COUNT_MIN,
  SQUASH_APPLY_AMOUNT,
} from '../constants.js';
import { COLORS } from '../data/colors.js';
import type { CommandName, Judgement, NoteType, Side, SimEvent, Vec3 } from '../types.js';

type Emit = (e: SimEvent) => void;

const DRUM_SFX: Record<NoteType, 'pata' | 'pon' | 'don' | 'chaka'> = {
  PATA: 'pata',
  PON: 'pon',
  DON: 'don',
  CHAKA: 'chaka',
};

/** 鼓击命中:鼓声 + 判定越好粒子越多 + 每 4 连击观众小欢呼 */
export function emitBeatJuice(note: NoteType, judgement: Judgement, combo: number, at: Vec3, emit: Emit): void {
  emit({ type: 'sfx', payload: { id: DRUM_SFX[note], volume: 1 } });
  const count = PARTICLE_COUNT_MIN + Math.round((PARTICLE_COUNT_MAX - PARTICLE_COUNT_MIN) * (judgement / 300));
  const color =
    note === 'PATA'
      ? COLORS.NOTE_PATA
      : note === 'PON'
        ? COLORS.NOTE_PON
        : note === 'DON'
          ? COLORS.NOTE_DON
          : COLORS.NOTE_CHAKA;
  emit({ type: 'particleBurst', payload: { position: at, count, color } });
  if (combo > 0 && combo % 4 === 0) {
    emit({ type: 'audienceCheer', payload: { intensity: 'small' } });
  }
}

/** 命令结算:提示音 + 欢呼 */
export function emitCommandJuice(command: CommandName, emit: Emit): void {
  emit({ type: 'sfx', payload: { id: 'commandResolve', volume: 1 } });
  emit({ type: 'audienceCheer', payload: { intensity: command === 'MIRACLE' ? 'max' : 'large' } });
}

/** boss 预告:咆哮 */
export function emitTelegraphJuice(emit: Emit): void {
  emit({ type: 'sfx', payload: { id: 'bossRoar', volume: 1 } });
}

/** boss 出手:震屏 + 命中单位位置爆粒 */
export function emitBossAttackJuice(dodged: boolean, unitPositions: Vec3[], emit: Emit): void {
  emit({
    type: 'cameraShake',
    payload: {
      intensity: dodged ? CAMERA_SHAKE_INTENSITY_BASE : CAMERA_SHAKE_INTENSITY_BASE * 2,
      duration: CAMERA_SHAKE_DURATION,
    },
  });
  if (!dodged) {
    emit({ type: 'sfx', payload: { id: 'bossHit', volume: 1 } });
    for (const position of unitPositions) {
      emit({ type: 'particleBurst', payload: { position, count: PARTICLE_COUNT_MIN, color: COLORS.BOSS_BODY } });
    }
  }
}

/** boss 受击:闷响 + 震动 + 爆粒 */
export function emitBossHitJuice(damage: number, bossPos: Vec3, emit: Emit): void {
  emit({ type: 'sfx', payload: { id: 'bossHit', volume: 1 } });
  emit({
    type: 'cameraShake',
    payload: { intensity: CAMERA_SHAKE_INTENSITY_BASE * Math.min(2, damage / 2), duration: CAMERA_SHAKE_DURATION },
  });
  emit({ type: 'particleBurst', payload: { position: bossPos, count: PARTICLE_COUNT_MAX, color: COLORS.HIGHLIGHT } });
}

/** 终局:胜/负 jingle + 全员反应 */
export function emitMatchOverJuice(winner: Side, emit: Emit): void {
  emit({ type: 'sfx', payload: { id: winner === 'P1' ? 'win' : 'lose', volume: 1 } });
  emit({ type: 'audienceCheer', payload: { intensity: winner === 'P1' ? 'max' : 'small' } });
}

/** 单位受击 squash 事件 */
export function emitUnitSquash(unitId: string, emit: Emit): void {
  emit({ type: 'unitSquash', payload: { unitId, amount: SQUASH_APPLY_AMOUNT } });
}
