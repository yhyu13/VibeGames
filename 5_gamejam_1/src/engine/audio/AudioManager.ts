// engine/audio/AudioManager.ts — Web Audio 编排（TDD §5.3 事件映射 / §3.5 复音 ≤8 / §4.3 ducking / §6.3 手势恢复）
// 事件：sound → Synth；music → musicBus；dialogue → duck + blip；barrage → whoosh；
//       phase → 默认音乐模式回退；settings 经 PersistPort（storage）读写。

import type { EventConsumer, SimEvent } from '../../core/simulation/events';
import { MAX_AUDIO_VOICES } from '../../core/constants';
import type { GamePhase, MusicMode, SoundKind, Speaker } from '../../core/types';
import { storage } from '../storage';
import { Synth, createMasterChain } from './synth';
import type { MasterChain } from './synth';
import { createMusicBus } from './musicBus';
import type { MusicBus } from './musicBus';

export interface AudioSettings {
  muted?: boolean;
  volume?: number;
}

const DUCK_GAIN = 10 ** (-6 / 20); // -6 dB（§4.3）
const DUCK_HOLD = 2.8;             // 台词时长估计 + 0.3s
const SILENCE_DURATION = 13;       // §3.16：3s 渐隐 + 10s 绝对静音 + 唯一 E4

const clamp01 = (v: number): number => Math.min(1, Math.max(0, v));

/** §5.2 游戏 FSM → 音乐模式回退表（Simulation 不发 music 事件时兜底） */
const PHASE_MODE: Partial<Record<GamePhase, { mode: MusicMode; intensity: number }>> = {
  MENU: { mode: 'calm', intensity: 0.25 },
  WAIT: { mode: 'calm', intensity: 0.4 },
  SENSE: { mode: 'tense', intensity: 0.6 },
  PERFORM: { mode: 'freeplay', intensity: 0.8 },
  EVALUATE: { mode: 'calm', intensity: 0.5 },
  DIARY: { mode: 'calm', intensity: 0.3 },
  ENDING_NORMAL: { mode: 'ending', intensity: 1 },
  ENDING_HIDDEN: { mode: 'ending', intensity: 1 },
};

export class AudioManager implements EventConsumer {
  readonly ctx: AudioContext;
  private readonly chain: MasterChain;
  private readonly synth: Synth;
  private readonly musicBus: MusicBus;
  private volume = 1;
  private muted = false;
  private ducking = false;
  private duckUntil = 0;
  private silenceUntil = 0;
  private duckTimer: number | null = null;
  private disposed = false;

  constructor() {
    this.ctx = new AudioContext();
    this.chain = createMasterChain(this.ctx);
    this.synth = new Synth(this.ctx, this.chain);
    this.musicBus = createMusicBus(this.ctx, this.chain, {
      // §2：sense→perform 横移开始 2.0s 处放 riser
      onRiser: () => this.synth.play('barrageWhoosh', { volume: 0.85, rate: 0.9 }),
    });
    const s = storage.load<AudioSettings>('settings');
    this.volume = clamp01(s?.volume ?? 1);
    this.muted = s?.muted ?? false;
    this.applyMasterGain(false);
    this.duckTimer = window.setInterval(() => this.pollDuck(), 200);
    this.registerResume();
  }

  onSimEvent(e: SimEvent): void {
    if (this.disposed) return;
    switch (e.type) {
      case 'sound':
        this.onSound(e.sound, e.volume, e.pan, e.pitch, e.rate);
        break;
      case 'music':
        this.musicBus.setMode(e.mode, clamp01(e.intensity));
        break;
      case 'dialogue':
        this.onDialogue(e.speaker);
        break;
      case 'barrage':
        this.synth.play('barrageWhoosh', { volume: 0.7 });
        break;
      case 'phase': {
        const m = PHASE_MODE[e.phase];
        if (m) this.musicBus.setMode(m.mode, m.intensity);
        break;
      }
      case 'persist':
        if (e.key === 'settings') this.reloadSettings();
        break;
      default:
        break;
    }
  }

  resume(): void {
    if (this.ctx.state !== 'running') void this.ctx.resume();
  }

  setVolume(v: number): void {
    this.volume = clamp01(v);
    this.applyMasterGain(true);
    this.persistSettings();
  }

  setMuted(m: boolean): void {
    this.muted = m;
    this.applyMasterGain(true);
    this.persistSettings();
  }

  getVolume(): number {
    return this.volume;
  }

  isMuted(): boolean {
    return this.muted;
  }

  dispose(): void {
    if (this.disposed) return;
    this.disposed = true;
    if (this.duckTimer !== null) {
      clearInterval(this.duckTimer);
      this.duckTimer = null;
    }
    this.musicBus.dispose();
    this.synth.dispose();
    void this.ctx.close().catch(() => undefined);
  }

  // ---------- 事件处理 ----------

  private onSound(kind: SoundKind, volume?: number, pan?: number, pitch?: number, rate?: number): void {
    const now = this.ctx.currentTime;
    if (now < this.silenceUntil) return; // §3.16：静默期丢弃一切音效
    if (kind === 'silence') {
      this.beginSilence();
      return;
    }
    if (this.synth.getActiveCount() >= MAX_AUDIO_VOICES) this.synth.stealLowestPriority();
    this.synth.play(kind, { volume, pan, pitch, rate });
  }

  private onDialogue(speaker: Speaker): void {
    const now = this.ctx.currentTime;
    this.duckUntil = Math.max(this.duckUntil, now) + DUCK_HOLD;
    if (!this.ducking) {
      this.ducking = true;
      this.chain.musicDuck.gain.cancelScheduledValues(now);
      this.chain.musicDuck.gain.setValueAtTime(Math.max(this.chain.musicDuck.gain.value, 0.0001), now);
      this.chain.musicDuck.gain.linearRampToValueAtTime(DUCK_GAIN, now + 0.15);
    }
    // §3.10 台词 blip：Boss 变体 −2 半音
    this.synth.play('breath', {
      volume: speaker === 'boss' ? 0.05 : 0.07,
      pitch: speaker === 'boss' ? -2 : 0,
      pan: 0,
    });
  }

  private pollDuck(): void {
    if (!this.ducking) return;
    const now = this.ctx.currentTime;
    if (now < this.duckUntil) return;
    this.ducking = false;
    this.chain.musicDuck.gain.cancelScheduledValues(now);
    this.chain.musicDuck.gain.setValueAtTime(DUCK_GAIN, now);
    this.chain.musicDuck.gain.linearRampToValueAtTime(1, now + 0.8);
  }

  /** §3.16 隐藏结局全静音规程 */
  private beginSilence(): void {
    const now = this.ctx.currentTime;
    this.silenceUntil = now + SILENCE_DURATION;
    this.musicBus.silenceAll();
    this.chain.master.gain.cancelScheduledValues(now);
    this.chain.master.gain.setValueAtTime(Math.max(this.chain.master.gain.value, 0.0001), now);
    this.chain.master.gain.linearRampToValueAtTime(0.0001, now + 3);
    const restore = this.normalMasterGain();
    window.setTimeout(() => {
      const c = this.ctx.currentTime;
      this.chain.master.gain.cancelScheduledValues(c);
      this.chain.master.gain.setValueAtTime(0.0001, c);
      this.chain.master.gain.linearRampToValueAtTime(Math.max(restore, 0.0001), c + 0.8);
      // 唯一诚实的音符：E4（64），gain 0.05，R≈4s（rate 0.3 → decay 1.2/0.3）
      this.synth.play('piano', { volume: 0.16, pitch: -5, rate: 0.3, when: c + 0.8, pan: 0 });
    }, SILENCE_DURATION * 1000);
  }

  // ---------- 设置 / 持久化 ----------

  private normalMasterGain(): number {
    return this.volume * (this.muted ? 0 : 1);
  }

  private applyMasterGain(smooth: boolean): void {
    const target = this.normalMasterGain();
    const now = this.ctx.currentTime;
    this.chain.master.gain.cancelScheduledValues(now);
    this.chain.master.gain.setValueAtTime(Math.max(this.chain.master.gain.value, 0.0001), now);
    if (smooth) this.chain.master.gain.setTargetAtTime(Math.max(target, 0.0001), now, 0.05);
    else this.chain.master.gain.value = target;
  }

  private persistSettings(): void {
    const s: AudioSettings = { muted: this.muted, volume: this.volume };
    storage.save('settings', s);
  }

  private reloadSettings(): void {
    const s = storage.load<AudioSettings>('settings');
    this.volume = clamp01(s?.volume ?? this.volume);
    this.muted = s?.muted ?? this.muted;
    this.applyMasterGain(true);
  }

  /** §6.3 用户手势恢复（成功即移除） */
  private registerResume(): void {
    const tryResume = (): void => {
      if (this.ctx.state !== 'running') void this.ctx.resume();
      if (this.ctx.state === 'running') {
        window.removeEventListener('pointerdown', tryResume);
        window.removeEventListener('keydown', tryResume);
      }
    };
    window.addEventListener('pointerdown', tryResume);
    window.addEventListener('keydown', tryResume);
  }
}

/** 工厂：Web Audio 不可用（老浏览器 / SSR）时返回 null */
export function createAudioManager(): AudioManager | null {
  try {
    if (typeof window === 'undefined' || typeof AudioContext === 'undefined') return null;
    return new AudioManager();
  } catch {
    return null;
  }
}
