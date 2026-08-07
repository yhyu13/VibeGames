/**
 * engine/AudioManager.ts — Web Audio 合成(读 core/data/sfx.ts 配方)
 *
 * M2.1 由 agent-engine 实现。V1 骨架:仅处理 autoplay 策略,不发声。
 */

import { AUDIO_VOLUME_DEFAULT } from '../core/constants';
import type { SfxId } from '../core/types';

export class AudioManager {
  private ctx: AudioContext | null = null;
  private muted = false;
  private volume = AUDIO_VOLUME_DEFAULT;

  /** 用户手势后调用:创建 / 恢复 AudioContext(autoplay 策略) */
  ensureAudio(): void {
    if (!this.ctx) {
      try {
        this.ctx = new AudioContext();
      } catch {
        this.ctx = null;
        return;
      }
    }
    if (this.ctx.state === 'suspended') {
      void this.ctx.resume();
    }
  }

  /** 播放合成音效(V1 不发声,只过静音/音量门) */
  play(_id: SfxId, _volume = 1.0): void {
    if (this.muted || this.volume <= 0 || this.ctx === null) return;
    /* TODO M2.1: 按 sfx.ts 配方实例化节点图,优先级抢占 */
  }

  /** 设置静音 */
  setMuted(muted: boolean): void {
    this.muted = muted;
  }

  /** 设置主音量(0..1) */
  setVolume(volume: number): void {
    this.volume = volume;
  }

  /** 关闭上下文 */
  dispose(): void {
    if (this.ctx) {
      void this.ctx.close();
      this.ctx = null;
    }
  }
}
