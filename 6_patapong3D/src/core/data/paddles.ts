/**
 * core/data/paddles.ts — 球拍 character 模板
 *
 * M1.2 由 agent-content 完成。
 * 当前是 M0 骨架:MVP 只需要 2 套(1 P1 + 1 AI)
 *
 * 完整尺寸/眼位详见 02-art-direction §5.1
 */

import type { Side } from '../types';

export interface PaddleCharacter {
  id: string;
  side: Side;
  bodyColor: string;
  eyeColor: string;
  /** 眼睛相对球拍中心的偏移(2 个) */
  eyeOffsets: Array<{ x: number; y: number }>;
}

/** MVP:1 P1 + 1 AI 角色。Stretch 可加 2-3 套皮肤。 */
export const PADDLE_CHARACTERS: readonly PaddleCharacter[] = [
  {
    id: 'pata-emerald',
    side: 'P1',
    bodyColor: '#3affc8',
    eyeColor: '#ffffff',
    eyeOffsets: [
      { x: -0.5, y: 1.2 },
      { x: 0.5, y: 1.2 },
    ],
  },
  {
    id: 'pata-coral',
    side: 'AI',
    bodyColor: '#ff7a3a',
    eyeColor: '#ffffff',
    eyeOffsets: [
      { x: -0.5, y: 1.2 },
      { x: 0.5, y: 1.2 },
    ],
  },
] as const;

/** 根据 side 找 character 模板(返回第一个匹配) */
export function getCharacterBySide(side: Side): PaddleCharacter {
  const found = PADDLE_CHARACTERS.find((c) => c.side === side);
  if (!found) {
    throw new Error(`No PADDLE_CHARACTER for side=${side}`);
  }
  return found;
}
