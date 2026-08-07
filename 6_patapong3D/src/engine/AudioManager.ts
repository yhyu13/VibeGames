/**
 * engine/AudioManager.ts — Web Audio 合成(读 core/data/sfx.ts 配方)
 *
 * M2.1 由 agent-engine 实现。当前是 M0 骨架。
 */

import type { SfxId } from '../core/types';

export class AudioManager {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  play(_id: SfxId, _volume = 1.0): void {
    /* TODO M2.1: 实例化节点图,优先级抢占 */
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setMuted(_muted: boolean): void {
    /* TODO M3.2: 读 settings */
  }

  resume(): void {
    /* TODO M2.1: AudioContext.resume() 首次用户交互后 */
  }

  dispose(): void {
    /* TODO M2.1: 关闭所有 active voice + 关闭 context */
  }
}
