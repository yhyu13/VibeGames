/**
 * engine/AudioManager.ts — Web Audio 合成(读 core/data/sfx.ts 配方)
 *
 * M2.1 由 agent-engine 实现:按 SfxRecipe 实例化节点图
 * (osc/noise → filter → ADSR gain → master),用 AudioContext 时间轴调度(startAt);
 * voice 抢占:活跃 ≥ AUDIO_VOICE_LIMIT 时杀最低优先级,硬上限 AUDIO_VOICE_HARD_LIMIT。
 */

import {
  AUDIO_VOICE_HARD_LIMIT,
  AUDIO_VOICE_LIMIT,
  AUDIO_VOLUME_DEFAULT,
} from '../core/constants';
import { SFX_RECIPES } from '../core/data/sfx';
import type { SfxRecipe, SfxVoice } from '../core/data/sfx';
import type { SfxId } from '../core/types';

/** 包络 decay 终点电平(相对峰值,sustain 段) */
const ENVELOPE_SUSTAIN_RATIO = 0.5;
/** 抢占强停时的渐出时长(s,防爆音) */
const VOICE_KILL_FADE = 0.01;
/** 共享白噪声 buffer 时长(s) */
const NOISE_BUFFER_SECONDS = 2;
/** 指数频率 ramp 的下限(Hz,避免非法 0 值) */
const RAMP_FREQ_FLOOR = 1;
/** master gain 淡变时长(s,防爆音) */
const MASTER_FADE_SECONDS = 0.02;

/** 一个活跃 voice 的记录(用于抢占与清理) */
interface ActiveVoice {
  /** 配方优先级(0 最低 .. 5 最高) */
  priority: number;
  /** 抢占时立即停止该 voice */
  stop(): void;
}

export class AudioManager {
  private ctx: AudioContext | null = null;
  private master: GainNode | null = null;
  private noiseBuffer: AudioBuffer | null = null;
  private readonly activeVoices: ActiveVoice[] = [];
  private muted = false;
  private volume = AUDIO_VOLUME_DEFAULT;

  /** 用户手势后调用:创建 / 恢复 AudioContext(autoplay 策略),并建立 master 总线 */
  ensureAudio(): void {
    if (!this.ctx) {
      try {
        this.ctx = new AudioContext();
        this.master = this.ctx.createGain();
        this.master.gain.value = this.muted ? 0 : this.volume;
        this.master.connect(this.ctx.destination);
      } catch {
        this.ctx = null;
        this.master = null;
        return;
      }
    }
    if (this.ctx.state === 'suspended') {
      void this.ctx.resume();
    }
  }

  /** 播放合成音效(按配方实例化节点图,含 voice 抢占) */
  play(id: SfxId, volume = 1.0): void {
    if (this.muted || this.volume <= 0 || this.ctx === null || this.master === null) return;
    const recipe = SFX_RECIPES[id];
    if (!recipe || recipe.voices.length === 0) return;
    if (!this.reserveVoices(recipe)) return;
    const playVolume = Math.min(1, Math.max(0, volume));
    const t0 = this.ctx.currentTime;
    for (const voice of recipe.voices) {
      this.scheduleVoice(recipe, voice, playVolume, t0);
    }
  }

  /** 设置静音(作用于 master gain) */
  setMuted(muted: boolean): void {
    this.muted = muted;
    this.applyMasterGain();
  }

  /** 设置主音量(0..1,作用于 master gain) */
  setVolume(volume: number): void {
    this.volume = volume;
    this.applyMasterGain();
  }

  /** 关闭上下文 */
  dispose(): void {
    this.activeVoices.length = 0;
    if (this.ctx) {
      void this.ctx.close();
      this.ctx = null;
    }
    this.master = null;
    this.noiseBuffer = null;
  }

  // ─── 抢占 ───

  /**
   * 抢占判定:活跃 voice 达到 AUDIO_VOICE_LIMIT 时杀最低优先级(新配方更高才抢,否则丢弃);
   * 达到 AUDIO_VOICE_HARD_LIMIT 直接丢弃。
   */
  private reserveVoices(recipe: SfxRecipe): boolean {
    if (this.activeVoices.length >= AUDIO_VOICE_HARD_LIMIT) return false;
    while (this.activeVoices.length >= AUDIO_VOICE_LIMIT) {
      const lowest = this.lowestPriorityVoice();
      if (recipe.priority <= lowest.priority) return false;
      lowest.stop();
    }
    return true;
  }

  /** 活跃 voice 中优先级最低者(同优先级取最早加入者) */
  private lowestPriorityVoice(): ActiveVoice {
    let lowest = this.activeVoices[0]!;
    for (const voice of this.activeVoices) {
      if (voice.priority < lowest.priority) lowest = voice;
    }
    return lowest;
  }

  // ─── 节点图实例化 ───

  /** 实例化单个 voice:源(osc/noise)→ filter → ADSR gain → master */
  private scheduleVoice(recipe: SfxRecipe, voice: SfxVoice, playVolume: number, t0: number): void {
    const ctx = this.ctx!;
    const startAt = t0 + voice.startAt;
    const endAt = startAt + voice.duration;
    const peak = voice.volume * recipe.baseVolume * playVolume;

    const source = this.createSource(voice);
    let lastNode: AudioNode = source.node;

    let filter: BiquadFilterNode | null = null;
    if (voice.filter) {
      filter = ctx.createBiquadFilter();
      filter.type = voice.filter.type;
      filter.frequency.value = voice.filter.cutoff;
      filter.Q.value = voice.filter.q;
      lastNode.connect(filter);
      lastNode = filter;
    }
    if (voice.freqRamp) {
      if (voice.type !== 'noise') {
        this.applyFreqRamp((source.node as OscillatorNode).frequency, voice, startAt, endAt);
      }
      if (filter) this.applyFreqRamp(filter.frequency, voice, startAt, endAt);
    }

    const gain = ctx.createGain();
    this.scheduleEnvelope(gain, voice, startAt, endAt, peak);
    lastNode.connect(gain);
    gain.connect(this.master!);

    const active: ActiveVoice = {
      priority: recipe.priority,
      stop: () => this.stopVoice(active, source.node, gain),
    };
    this.activeVoices.push(active);
    source.node.addEventListener('ended', () => this.releaseVoice(active));
    source.node.start(startAt);
    source.node.stop(endAt + VOICE_KILL_FADE);
  }

  /** 创建音源:振荡器或共享噪声 buffer */
  private createSource(voice: SfxVoice): { node: AudioScheduledSourceNode } {
    const ctx = this.ctx!;
    if (voice.type === 'noise') {
      const buffer = this.getNoiseBuffer();
      const source = ctx.createBufferSource();
      source.buffer = buffer;
      return { node: source };
    }
    const osc = ctx.createOscillator();
    osc.type = voice.type;
    osc.frequency.value = voice.freq;
    return { node: osc };
  }

  /** 懒创建共享白噪声 buffer(所有 noise voice 复用) */
  private getNoiseBuffer(): AudioBuffer {
    const ctx = this.ctx!;
    if (!this.noiseBuffer) {
      const length = Math.floor(ctx.sampleRate * NOISE_BUFFER_SECONDS);
      this.noiseBuffer = ctx.createBuffer(1, length, ctx.sampleRate);
      const data = this.noiseBuffer.getChannelData(0);
      for (let i = 0; i < length; i++) data[i] = Math.random() * 2 - 1;
    }
    return this.noiseBuffer;
  }

  /** 调度 ADSR 包络:attack 升至峰值 → decay 落至 sustain → release 归零 */
  private scheduleEnvelope(
    gain: GainNode,
    voice: SfxVoice,
    startAt: number,
    endAt: number,
    peak: number,
  ): void {
    const { attack, decay, release } = voice.envelope;
    const sustain = peak * ENVELOPE_SUSTAIN_RATIO;
    const attackEnd = Math.min(startAt + attack, endAt);
    const decayEnd = Math.min(startAt + attack + decay, endAt);
    const releaseStart = Math.max(decayEnd, endAt - release);
    gain.gain.setValueAtTime(0, startAt);
    gain.gain.linearRampToValueAtTime(peak, attackEnd);
    gain.gain.linearRampToValueAtTime(sustain, decayEnd);
    gain.gain.setValueAtTime(sustain, releaseStart);
    gain.gain.linearRampToValueAtTime(0, endAt);
  }

  /** 频率指数 ramp(freqRamp.to 在 startAt..endAt 区间内到达,含 0 值下限防护) */
  private applyFreqRamp(param: AudioParam, voice: SfxVoice, startAt: number, endAt: number): void {
    if (!voice.freqRamp) return;
    const to = Math.max(RAMP_FREQ_FLOOR, voice.freqRamp.to);
    const rampEnd = Math.min(startAt + voice.freqRamp.duration, endAt);
    param.setValueAtTime(Math.max(RAMP_FREQ_FLOOR, param.value), startAt);
    param.exponentialRampToValueAtTime(to, rampEnd);
  }

  /** 抢占强停:先移出活跃列表,再短渐出 + stop(防爆音) */
  private stopVoice(active: ActiveVoice, node: AudioScheduledSourceNode, gain: GainNode): void {
    this.releaseVoice(active);
    const ctx = this.ctx!;
    const t = ctx.currentTime;
    gain.gain.cancelScheduledValues(t);
    gain.gain.setValueAtTime(gain.gain.value, t);
    gain.gain.linearRampToValueAtTime(0, t + VOICE_KILL_FADE);
    try {
      node.stop(t + VOICE_KILL_FADE);
    } catch {
      /* 已自然结束的节点忽略 */
    }
  }

  /** 从活跃列表移除 voice(自然结束 / 抢占都走这里,幂等) */
  private releaseVoice(active: ActiveVoice): void {
    const index = this.activeVoices.indexOf(active);
    if (index >= 0) this.activeVoices.splice(index, 1);
  }

  /** 将 muted / volume 应用到 master gain(短淡变防爆音) */
  private applyMasterGain(): void {
    if (!this.ctx || !this.master) return;
    const t = this.ctx.currentTime;
    const target = this.muted ? 0 : this.volume;
    this.master.gain.cancelScheduledValues(t);
    this.master.gain.setValueAtTime(this.master.gain.value, t);
    this.master.gain.linearRampToValueAtTime(target, t + MASTER_FADE_SECONDS);
  }
}
