/**
 * core/simulation/squash.ts — 压扁回弹(手感,非冻结)
 *
 * squashAmount 指数衰减回 1;引擎映射到变换矩阵。
 */

import { SQUASH_DECAY_RATE } from '../constants.js';
import { damp } from '../math.js';

export function decaySquash(amount: number, dt: number): number {
  return damp(amount, 1, SQUASH_DECAY_RATE, dt);
}
