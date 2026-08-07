/**
 * engine/CameraShake.ts — 镜头震动
 *
 * M2.2 由 agent-engine 实现。V1 骨架:offset 恒 (0,0,0)。
 */

import type { Vec3 } from '../core/types';

export class CameraShake {
  private timeLeft = 0;

  /** 触发一次震动(V1 骨架:只记录剩余时间,不做偏移) */
  start(_intensity: number, duration: number): void {
    this.timeLeft = duration;
  }

  /** 每帧推进;返回是否仍在震动 */
  update(dt: number): boolean {
    if (this.timeLeft <= 0) return false;
    this.timeLeft = Math.max(0, this.timeLeft - dt);
    return true;
  }

  /** 当前震动偏移(V1 恒 0,M2.2 填随机抖动) */
  getOffset(): Vec3 {
    return { x: 0, y: 0, z: 0 };
  }
}
