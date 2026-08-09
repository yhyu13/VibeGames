// src/engine/AudioManager.ts — Web Audio 程序化合成(零资产,全部实时合成)
//
// 职责:
// - AudioContext 懒初始化(首次 play 或 init() 时创建,浏览器手势后自动 resume)
// - play / playSfx(recipeId, volume?) 按 core/data/sfx.ts 配方实时合成
// - update(dt) 每帧声部调度(清理已播完 voice)
// - voice 上限 6(TDD §3.5):超限按优先级抢占,同优先级丢最老(最接近播完,损失最小)
// - mute / volume 从 localStorage 键 hotline-shanghai.v1.settings 读取(TDD §3.3),缺省回退 { muted:false, volume:0.5 }
import {
  SFX_RECIPE_TABLE,
  type SfxNoise,
  type SfxRecipe,
  type SfxRecipeId,
} from '../core/data/sfx';
import type { PersistedSettings } from '../core/types';

/** settings 持久化键名(TDD §3.3 冻结) */
export const SETTINGS_STORAGE_KEY = 'hotline-shanghai.v1.settings';

/** 默认设置(缺省回退;03-audio-direction.md §6:音量默认 0.5) */
const DEFAULT_SETTINGS: PersistedSettings = { muted: false, volume: 0.5, rcQuality: 'med' };

/** 活动 voice 记录(用于上限抢占与清理) */
interface ActiveVoice {
  recipeId: SfxRecipeId;
  priority: number;
  startedAt: number; // ctx.currentTime(秒)
  duration: number; // 实际总时长(含 repeat,秒)
  stop: () => void;
}

export class AudioManager {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private voices: ActiveVoice[] = [];
  private muted: boolean = DEFAULT_SETTINGS.muted;
  private volume: number = DEFAULT_SETTINGS.volume;
  private destroyed = false;

  /** 同时声部上限(TDD §3.5:≤6 voices 预算 / 8 硬上限,这里按预算 6 执行) */
  private static readonly MAX_VOICES = 6;

  constructor() {
    this.loadSettings();
  }

  /** 初始化音频(懒创建 AudioContext 并恢复 suspended;GameEngine 在用户手势时调用) */
  async init(): Promise<void> {
    if (this.destroyed) return;
    const ctx = this.ensureContext();
    if (ctx && ctx.state === 'suspended') {
      try {
        await ctx.resume();
      } catch {
        /* 恢复失败不阻塞后续播放 */
      }
    }
  }

  /** 播放配方音效;volume 为本次调用叠加音量 0..1(默认 1) */
  play(recipeId: SfxRecipeId, volume: number = 1): void {
    if (this.muted || this.destroyed) return;
    const recipe = SFX_RECIPE_TABLE[recipeId];
    if (!recipe) return;
    const ctx = this.ensureContext();
    const master = this.masterGain;
    if (!ctx || !master) return;
    this.stealIfNeeded(recipe.priority);
    this.scheduleRecipe(ctx, master, recipe, ctx.currentTime, Math.min(1, Math.max(0, volume)));
  }

  /** GameEngine 对接接口(与 play 同义,事件 / 逻辑层统一入口) */
  playSfx(recipeId: SfxRecipeId, volume: number = 1): void {
    this.play(recipeId, volume);
  }

  /** 每帧声部调度(清理已播完 voice;dt 预留,后续循环类长音如电台 pad 可在此驱动) */
  update(_dt: number): void {
    this.pruneFinished();
  }

  /** 静音开关(写内存 + 持久化;muted 时 play 直接不调度) */
  setMuted(muted: boolean): void {
    this.muted = muted;
    if (this.masterGain) this.masterGain.gain.value = muted ? 0 : this.volume;
    this.persistSettings();
  }

  /** 主音量 0..1(写内存 + 持久化) */
  setVolume(volume: number): void {
    this.volume = Math.min(1, Math.max(0, volume));
    if (this.masterGain && !this.muted) this.masterGain.gain.value = this.volume;
    this.persistSettings();
  }

  isMuted(): boolean {
    return this.muted;
  }

  getVolume(): number {
    return this.volume;
  }

  /** 释放 AudioContext 与全部 voice(切场景 / 卸载用) */
  destroy(): void {
    this.destroyed = true;
    for (const v of this.voices) v.stop();
    this.voices = [];
    if (this.ctx) {
      void this.ctx.close().catch(() => {
        /* 关闭失败忽略 */
      });
      this.ctx = null;
      this.masterGain = null;
    }
  }

  /** 创建 / 取回 AudioContext;浏览器要求用户手势后才允许出声,suspended 时自动 resume */
  private ensureContext(): AudioContext | null {
    if (this.destroyed) return null;
    if (!this.ctx) {
      try {
        this.ctx = new AudioContext();
        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.value = this.volume;
        this.masterGain.connect(this.ctx.destination);
      } catch {
        this.ctx = null;
        this.masterGain = null;
        return null;
      }
    }
    if (this.ctx.state === 'suspended') {
      void this.ctx.resume().catch(() => {
        /* 自动恢复失败不阻塞播放 */
      });
    }
    return this.ctx;
  }

  /** 按配方调度全部声部(振荡器 + 可选噪声 + 可选重复),并登记 voice */
  private scheduleRecipe(
    ctx: AudioContext,
    master: GainNode,
    recipe: SfxRecipe,
    t0: number,
    playVolume: number,
  ): void {
    const iterations = recipe.repeat ?? 1;
    const interval = recipe.repeatInterval ?? recipe.duration;
    const voiceGain = ctx.createGain();
    voiceGain.gain.value = this.volume * recipe.volume * playVolume;
    voiceGain.connect(master);
    const sources: AudioScheduledSourceNode[] = [];
    const stopAll = (): void => {
      for (const s of sources) {
        try {
          s.stop();
        } catch {
          /* 已停止的节点忽略 */
        }
      }
    };
    for (let i = 0; i < iterations; i++) {
      const t = t0 + i * interval;
      for (const osc of recipe.oscillators) {
        const tStart = t + (osc.delay ?? 0);
        const o = ctx.createOscillator();
        o.type = osc.type as OscillatorType;
        o.frequency.setValueAtTime(osc.freq, tStart);
        if (osc.freqEnd !== undefined) {
          o.frequency.exponentialRampToValueAtTime(Math.max(1, osc.freqEnd), tStart + recipe.duration);
        }
        const g = ctx.createGain();
        this.scheduleEnvelope(g, recipe, tStart, osc.gain);
        o.connect(g);
        g.connect(voiceGain);
        o.start(tStart);
        o.stop(tStart + recipe.duration + 0.05);
        sources.push(o);
      }
      if (recipe.noise) {
        const src = this.scheduleNoise(ctx, recipe, recipe.noise, t, voiceGain);
        if (src) sources.push(src);
      }
    }
    this.voices.push({
      recipeId: recipe.id,
      priority: recipe.priority,
      startedAt: t0,
      duration: recipe.duration + (iterations - 1) * interval + 0.1,
      stop: stopAll,
    });
  }

  /** ADSR 包络(attack 线性爬升,decay 指数落到 sustain,release 指数归零) */
  private scheduleEnvelope(g: GainNode, recipe: SfxRecipe, t0: number, peak: number): void {
    const dur = Math.max(0.01, recipe.duration);
    const attack = Math.min(recipe.attack, dur * 0.5);
    const decay = Math.min(recipe.decay, Math.max(0.002, dur - attack - 0.005));
    const release = Math.min(recipe.release, Math.max(0.002, dur - attack - decay - 0.005));
    const tAttack = t0 + attack;
    const tDecay = tAttack + decay;
    const tRelease = t0 + dur - release;
    const tEnd = t0 + dur;
    const sustainLevel = Math.max(0.0001, peak * recipe.sustain);
    g.gain.setValueAtTime(0.0001, t0);
    g.gain.linearRampToValueAtTime(peak, tAttack);
    g.gain.exponentialRampToValueAtTime(sustainLevel, tDecay);
    g.gain.setValueAtTime(sustainLevel, tRelease);
    g.gain.exponentialRampToValueAtTime(0.0001, tEnd);
  }

  /** 白噪声 burst(经滤波器 + ADSR 包络;所有 noise 必须过 lowpass / bandpass,避免刺耳) */
  private scheduleNoise(
    ctx: AudioContext,
    recipe: SfxRecipe,
    noise: SfxNoise,
    t0: number,
    out: AudioNode,
  ): AudioBufferSourceNode | null {
    const length = Math.max(1, Math.ceil(noise.duration * ctx.sampleRate));
    const buffer = ctx.createBuffer(1, length, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
    const src = ctx.createBufferSource();
    src.buffer = buffer;
    const filter = ctx.createBiquadFilter();
    filter.type = (noise.filterType ?? 'lowpass') as BiquadFilterType;
    filter.frequency.value = noise.filterFreq ?? 1000;
    const g = ctx.createGain();
    this.scheduleEnvelope(g, recipe, t0, noise.gain);
    src.connect(filter);
    filter.connect(g);
    g.connect(out);
    src.start(t0);
    src.stop(t0 + noise.duration + 0.05);
    return src;
  }

  /** voice 上限抢占:超限丢最低优先级;同优先级丢最老(最接近播完,损失最小) */
  private stealIfNeeded(priority: number): void {
    this.pruneFinished();
    if (this.voices.length < AudioManager.MAX_VOICES) return;
    let worstIdx = -1;
    let worstPriority = Number.POSITIVE_INFINITY;
    let oldestStart = Number.POSITIVE_INFINITY;
    for (let i = 0; i < this.voices.length; i++) {
      const v = this.voices[i];
      if (v.priority < worstPriority || (v.priority === worstPriority && v.startedAt < oldestStart)) {
        worstPriority = v.priority;
        oldestStart = v.startedAt;
        worstIdx = i;
      }
    }
    if (priority < worstPriority) return; // 新音比最弱 voice 还低 → 不播
    const victim = this.voices[worstIdx];
    victim.stop();
    this.voices.splice(worstIdx, 1);
  }

  /** 清掉已播完的 voice(update 每帧 + 抢占前调用) */
  private pruneFinished(): void {
    const ctx = this.ctx;
    if (!ctx) {
      this.voices = [];
      return;
    }
    const now = ctx.currentTime;
    this.voices = this.voices.filter((v) => now - v.startedAt < v.duration);
  }

  /** 从 localStorage 读取设置(TDD §3.3 键名);读取失败 / 形状不符 → 静默回退默认值,不抛错 */
  private loadSettings(): void {
    try {
      const raw = window.localStorage.getItem(SETTINGS_STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw) as Partial<PersistedSettings>;
      if (typeof parsed.muted === 'boolean') this.muted = parsed.muted;
      if (typeof parsed.volume === 'number' && parsed.volume >= 0 && parsed.volume <= 1) {
        this.volume = parsed.volume;
      }
    } catch {
      /* 读取失败静默回退默认值 */
    }
  }

  /** 合并写回设置(不覆盖 rcQuality 等其他字段) */
  private persistSettings(): void {
    try {
      const raw = window.localStorage.getItem(SETTINGS_STORAGE_KEY);
      const merged: PersistedSettings = raw
        ? { ...DEFAULT_SETTINGS, ...(JSON.parse(raw) as Partial<PersistedSettings>) }
        : { ...DEFAULT_SETTINGS };
      merged.muted = this.muted;
      merged.volume = this.volume;
      window.localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(merged));
    } catch {
      /* 写失败静默 */
    }
  }
}
