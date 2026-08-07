/**
 * engine/PerfWatchdog.ts — 性能监控 + 自动降级(参见 TDD §3.6)
 *
 * M3.3 由 agent-engine 实现。当前是 M0 骨架。
 */

import {
  PERF_DEGRADATION_FRAMES,
  PERF_FRAME_BUDGET_MS,
  PERF_RECOVERY_BUDGET_MS,
  PERF_RECOVERY_FRAMES,
} from '../core/constants';
import type { PerfDegradation } from '../core/types';

export class PerfWatchdog {
  private recent: number[] = [];
  private activeDegradations: PerfDegradation[] = [];

  tick(frameTimeMs: number): void {
    this.recent.push(frameTimeMs);
    if (this.recent.length > Math.max(PERF_DEGRADATION_FRAMES, PERF_RECOVERY_FRAMES)) {
      this.recent.shift();
    }
    if (
      this.recent.length >= PERF_DEGRADATION_FRAMES &&
      this.recent.slice(-PERF_DEGRADATION_FRAMES).every((t) => t > PERF_FRAME_BUDGET_MS)
    ) {
      this.applyDegradation('PARTICLE_BURST_HALF');
    }
    if (
      this.recent.length >= PERF_RECOVERY_FRAMES &&
      this.recent.slice(-PERF_RECOVERY_FRAMES).every((t) => t < PERF_RECOVERY_BUDGET_MS)
    ) {
      this.activeDegradations = [];
    }
  }

  private applyDegradation(d: PerfDegradation): void {
    if (!this.activeDegradations.includes(d)) {
      this.activeDegradations.push(d);
    }
  }

  getActiveDegradations(): readonly PerfDegradation[] {
    return this.activeDegradations;
  }
}
