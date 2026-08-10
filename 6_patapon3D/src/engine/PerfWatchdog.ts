/**
 * engine/PerfWatchdog.ts — 性能监控 + 自动降级(参见 TDD §3.6)
 *
 * M3.3 由 agent-engine 实现:滚动均值(30 帧)超预算持续 N 帧 → 叠加降级,
 * 低于恢复预算持续 PERF_RECOVERY_FRAMES 帧 → 清空降级。
 */

import {
  PERF_DEGRADATION_FRAMES,
  PERF_FRAME_BUDGET_MS,
  PERF_RECOVERY_BUDGET_MS,
  PERF_RECOVERY_FRAMES,
} from '../core/constants';
import type { PerfDegradation } from '../core/types';

/** 滚动均值窗口帧数 */
const WATCHDOG_WINDOW_FRAMES = 30;
/** 连续超预算帧数达到该值才关 bloom(比粒子降级更激进) */
const PERF_BLOOM_OFF_FRAMES = 6;

/**
 * raytrace 质量阶梯的慢帧阈值(连续超预算帧数 → qualityLevel 1..6)。
 * 前两级复用冻结常量(粒子减半 / 关 bloom 的既有节奏),后四级逐级加码;
 * 恢复仍走既有整体清空(fastFrames ≥ PERF_RECOVERY_FRAMES → slowFrames=0 → level 0)。
 */
const LEVEL_STEP_FRAMES = [PERF_DEGRADATION_FRAMES, PERF_BLOOM_OFF_FRAMES, 12, 18, 24, 48] as const;

export class PerfWatchdog {
  private readonly frameTimes: number[] = [];
  /** 连续超预算(>14ms)帧数 */
  private slowFrames = 0;
  /** 连续低于恢复预算(<10ms)帧数 */
  private fastFrames = 0;
  private active: PerfDegradation[] = [];

  /** 每帧上报帧时间,驱动降级 / 恢复状态机 */
  tick(frameTimeMs: number): void {
    this.frameTimes.push(frameTimeMs);
    if (this.frameTimes.length > WATCHDOG_WINDOW_FRAMES) this.frameTimes.shift();
    const avg = this.averageFrameTime();
    if (avg > PERF_FRAME_BUDGET_MS) {
      this.slowFrames++;
      this.fastFrames = 0;
      if (this.slowFrames >= PERF_DEGRADATION_FRAMES) this.addDegradation('PARTICLE_BURST_HALF');
      if (this.slowFrames >= PERF_BLOOM_OFF_FRAMES) this.addDegradation('BLOOM_OFF');
    } else if (avg < PERF_RECOVERY_BUDGET_MS) {
      this.fastFrames++;
      this.slowFrames = 0;
      if (this.fastFrames >= PERF_RECOVERY_FRAMES) this.active = [];
    } else {
      this.slowFrames = 0;
      this.fastFrames = 0;
    }
  }

  /** 当前激活的降级路径(副本,调用方可安全持有) */
  degradation(): PerfDegradation[] {
    return [...this.active];
  }

  /**
   * raytrace 适配器质量等级 0..6(由连续慢帧数推导,恢复时随 slowFrames 清零):
   * 1-2 渲染分辨率 0.8/0.66 · 3-4 水面反射降质/波浪单层 · 5 阴影 1-tap · 6 隔帧上传
   */
  qualityLevel(): number {
    let level = 0;
    for (const threshold of LEVEL_STEP_FRAMES) {
      if (this.slowFrames >= threshold) level++;
    }
    return level;
  }

  /** 滚动窗口均值(ms) */
  private averageFrameTime(): number {
    let sum = 0;
    for (const t of this.frameTimes) sum += t;
    return this.frameTimes.length > 0 ? sum / this.frameTimes.length : 0;
  }

  /** 追加降级路径(去重) */
  private addDegradation(deg: PerfDegradation): void {
    if (!this.active.includes(deg)) this.active.push(deg);
  }
}
