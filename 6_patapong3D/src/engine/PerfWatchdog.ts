/**
 * engine/PerfWatchdog.ts — 性能监控 + 自动降级(参见 TDD §3.6)
 *
 * M3.3 由 agent-engine 实现。V1 骨架:不降级,恒返回 []。
 */

import type { PerfDegradation } from '../core/types';

export class PerfWatchdog {
  /** 每帧上报帧时间(V1 只接收,不触发降级) */
  tick(_frameTimeMs: number): void {
    /* TODO M3.3: 滚动帧时间 + 降级/恢复(§3.6) */
  }

  /** 当前激活的降级路径(V1 恒空) */
  degradation(): PerfDegradation[] {
    return [];
  }
}
