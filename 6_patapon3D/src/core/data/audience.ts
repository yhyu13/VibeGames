/**
 * core/data/audience.ts — 12 个观众位置
 *
 * M1.2 由 agent-content 完成(M1 占位,M3 激活)
 */

import { AUDIENCE_COUNT, AUDIENCE_BOUND_BACK } from '../constants.js';
import { COLORS } from './colors.js';
import type { AudienceMember } from '../types.js';

const ROWS = 4;
const COLS = 3;
const Y_POSITIONS = [5, 2, -2, -5];
const X_POSITIONS = [-8, 0, 8];

/**
 * 程序化生成 12 个观众(4 行 × 3 列)
 */
export function generateAudience(): AudienceMember[] {
  const members: AudienceMember[] = [];
  let id = 0;
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      const yPos = Y_POSITIONS[r] ?? 0;
      const xPos = X_POSITIONS[c] ?? 0;
      const colorIdx = id % COLORS.AUDIENCE_POOL.length;
      members.push({
        id: `audience-${id}`,
        position: { x: xPos, y: yPos, z: AUDIENCE_BOUND_BACK },
        color: COLORS.AUDIENCE_POOL[colorIdx] ?? '#ffffff',
        bounceAmount: 0,
      });
      id++;
    }
  }
  return members;
}

export const DEFAULT_AUDIENCE = generateAudience();
export { AUDIENCE_COUNT };
