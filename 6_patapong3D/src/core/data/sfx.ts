/**
 * core/data/sfx.ts — 合成音效配方(详见 03-audio-direction §3)
 *
 * M1.2 由 agent-content 完成(数据),M2.1 由 agent-engine 实例化节点图。
 */

import type { SfxId } from '../types';

export interface SfxVoice {
  /** seconds from recipe start */
  startAt: number;
  type: 'square' | 'noise' | 'sine' | 'triangle';
  /** Hz */
  freq: number;
  /** 可选:频率线性 ramp */
  freqRamp?: { to: number; duration: number };
  /** seconds */
  duration: number;
  /** ADSR 包络(简化为 attack + decay + release) */
  envelope: { attack: number; decay: number; release: number };
  /** 可选:滤波器 */
  filter?: { type: 'lowpass' | 'highpass' | 'bandpass'; cutoff: number; q: number };
  /** 0..1 峰值音量 */
  volume: number;
}

export interface SfxRecipe {
  id: SfxId;
  voices: SfxVoice[];
  /** seconds */
  totalDuration: number;
  baseVolume: number;
  /** 优先级(5 最高,0 最低),TDD §3 / 03-audio §4 */
  priority: 0 | 1 | 2 | 3 | 4 | 5;
}

/** PATA!(单拍,主反馈) */
const PATA: SfxRecipe = {
  id: 'pata',
  priority: 1,
  baseVolume: 0.8,
  totalDuration: 0.08,
  voices: [
    {
      startAt: 0,
      type: 'square',
      freq: 80,
      duration: 0.08,
      envelope: { attack: 0.005, decay: 0.06, release: 0.015 },
      filter: { type: 'lowpass', cutoff: 1500, q: 1 },
      volume: 0.6,
    },
    {
      startAt: 0,
      type: 'square',
      freq: 120,
      duration: 0.08,
      envelope: { attack: 0.005, decay: 0.06, release: 0.015 },
      filter: { type: 'lowpass', cutoff: 1500, q: 1 },
      volume: 0.3,
    },
    {
      startAt: 0,
      type: 'noise',
      freq: 0,
      duration: 0.015,
      envelope: { attack: 0.001, decay: 0.01, release: 0.004 },
      filter: { type: 'bandpass', cutoff: 600, q: 2 },
      volume: 0.5,
    },
  ],
};

/** PATA-PATA!(3 拍 milestone) */
const PATA_PATA: SfxRecipe = {
  id: 'pataPata',
  priority: 2,
  baseVolume: 0.8,
  totalDuration: 0.24,
  voices: [
    { ...PATA.voices[0]!, startAt: 0 },
    { ...PATA.voices[0]!, startAt: 0.08, freq: 100 },
  ],
};

/** PATA-PATA-PATA!(5 拍 milestone) */
const PATA_3: SfxRecipe = {
  id: 'pata3',
  priority: 3,
  baseVolume: 0.8,
  totalDuration: 0.4,
  voices: [
    { ...PATA.voices[0]!, startAt: 0 },
    { ...PATA.voices[0]!, startAt: 0.08, freq: 100 },
    { ...PATA.voices[0]!, startAt: 0.16, freq: 130 },
  ],
};

/** PATA-PATA-PATA-PONG!(7 拍 milestone,高潮) */
const PATA_PATA_PONG: SfxRecipe = {
  id: 'pataPataPong',
  priority: 4,
  baseVolume: 0.9,
  totalDuration: 0.6,
  voices: [
    { ...PATA.voices[0]!, startAt: 0 },
    { ...PATA.voices[0]!, startAt: 0.08, freq: 100 },
    { ...PATA.voices[0]!, startAt: 0.16, freq: 130 },
    {
      startAt: 0.3,
      type: 'square',
      freq: 50,
      duration: 0.2,
      envelope: { attack: 0.005, decay: 0.18, release: 0.015 },
      filter: { type: 'lowpass', cutoff: 800, q: 1 },
      volume: 0.7,
    },
    {
      startAt: 0.3,
      type: 'noise',
      freq: 0,
      duration: 0.08,
      envelope: { attack: 0.001, decay: 0.06, release: 0.019 },
      filter: { type: 'bandpass', cutoff: 2000, q: 2 },
      volume: 0.5,
    },
  ],
};

/** Win(胜利,上升琶音 C-E-G-C) */
const WIN: SfxRecipe = {
  id: 'win',
  priority: 5,
  baseVolume: 0.7,
  totalDuration: 0.7,
  voices: [
    { ...PATA.voices[0]!, startAt: 0, freq: 261.6 },
    { ...PATA.voices[0]!, startAt: 0.1, freq: 329.6 },
    { ...PATA.voices[0]!, startAt: 0.2, freq: 392.0 },
    { ...PATA.voices[0]!, startAt: 0.3, freq: 523.2, duration: 0.4 },
  ],
};

/** Lose(失败,下降音 G-E-C) */
const LOSE: SfxRecipe = {
  id: 'lose',
  priority: 5,
  baseVolume: 0.6,
  totalDuration: 0.8,
  voices: [
    { ...PATA.voices[0]!, startAt: 0, freq: 392.0, duration: 0.2 },
    { ...PATA.voices[0]!, startAt: 0.2, freq: 329.6, duration: 0.2 },
    { ...PATA.voices[0]!, startAt: 0.4, freq: 261.6, duration: 0.4 },
  ],
};

/** Audience Cheer(milestone 背景) */
const AUDIENCE_CHEER: SfxRecipe = {
  id: 'audienceCheer',
  priority: 2,
  baseVolume: 0.4,
  totalDuration: 0.3,
  voices: [
    {
      startAt: 0,
      type: 'noise',
      freq: 0,
      duration: 0.3,
      envelope: { attack: 0.01, decay: 0.25, release: 0.04 },
      filter: { type: 'bandpass', cutoff: 1400, q: 3 },
      volume: 0.4,
      freqRamp: { to: 2000, duration: 0.3 },
    },
  ],
};

/** BG Pad(M3 stretch,持续背景) */
const BG_PAD: SfxRecipe = {
  id: 'bgPad',
  priority: 0,
  baseVolume: 0.1,
  totalDuration: 1.0, // 循环
  voices: [
    {
      startAt: 0,
      type: 'square',
      freq: 50,
      duration: 1.0,
      envelope: { attack: 0.3, decay: 0.4, release: 0.3 },
      filter: { type: 'lowpass', cutoff: 400, q: 1 },
      volume: 0.1,
    },
  ],
};

export const SFX_RECIPES: Record<SfxId, SfxRecipe> = {
  pata: PATA,
  pataPata: PATA_PATA,
  pata3: PATA_3,
  pataPataPong: PATA_PATA_PONG,
  win: WIN,
  lose: LOSE,
  audienceCheer: AUDIENCE_CHEER,
  bgPad: BG_PAD,
};
