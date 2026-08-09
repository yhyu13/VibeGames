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
