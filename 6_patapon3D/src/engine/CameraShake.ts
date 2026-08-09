/**
 * engine/CameraShake.ts — 镜头震动
 *
 * M2.2 由 agent-engine 实现:随机 3D 抖动 × intensity × 线性衰减(剩余时间占比)。
 */

import type { Vec3 } from '../core/types';

export class CameraShake {
  private timeLeft = 0;
  private duration = 0;
  private intensity = 0;

  /** 触发一次震动:intensity 为最大偏移幅度(世界单位) */
  start(intensity: number, duration: number): void {
    this.intensity = intensity;
    this.duration = duration;
    this.timeLeft = duration;
  }

  /** 每帧推进;返回是否仍在震动 */
  update(dt: number): boolean {
    if (this.timeLeft <= 0) return false;
    this.timeLeft = Math.max(0, this.timeLeft - dt);
    return this.timeLeft > 0;
  }

  /** 当前震动偏移:X/Y/Z 各 ±1 随机 × intensity × 线性衰减 */
  getOffset(): Vec3 {
    if (this.timeLeft <= 0 || this.duration <= 0) return { x: 0, y: 0, z: 0 };
    const amplitude = this.intensity * (this.timeLeft / this.duration);
    return {
      x: (Math.random() * 2 - 1) * amplitude,
      y: (Math.random() * 2 - 1) * amplitude,
      z: (Math.random() * 2 - 1) * amplitude,
    };
  }
}
