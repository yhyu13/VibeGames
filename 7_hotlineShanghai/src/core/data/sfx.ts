// src/core/data/sfx.ts — 音频合成配方表(零平台依赖,纯数据)
//
// 约定(详细见 docs/design/03-audio-direction.md):
// - C.A.T 硬规则:本文件不 import AudioContext / window / DOM,只描述"配方",引擎层负责合成。
// - 波形 / 滤波器用自有字面量联合(SfxWaveform / SfxFilterType),引擎层再映射 OscillatorType / BiquadFilterType。
// - 时间单位全部为秒;gain 为 0..1 相对电平。
// - 包络 = ADSR(attack 起音 / decay 衰减 / sustain 保持电平 / release 释音),duration 为单次总时长。
// - volume = 配方基准音量(0..1),实际音量 = settings.volume × 配方 volume × play(volume)。
// - priority = 抢占优先级(voice 上限 6,数值越大越优先保留;同优先级丢最老)。
// - repeat = 循环次数(节拍器 / 电话铃),repeatInterval = 循环间隔(秒)。

export const SFX_RECIPES = [
  // 开火
  'fire_pistol', // 毛瑟 / 盒子炮(手枪短促枪声)
  'fire_rifle', // 莫辛纳甘(步枪厚重枪声)
  'fire_smg', // 汤普森(冲锋枪密集枪声)
  // 近战 / 投掷
  'melee_swing', // 挥刀 / 挥棒(呼啸)
  'throw_weapon', // E 长按投掷(破空呼啸)
  // 爆炸 / 击杀 / 死亡
  'explosion', // 手雷爆炸(noise burst + 低频 thump)
  'thud_hit', // 击杀(低频 thud + 短促小锣)
  'splash_blood', // 血溅(湿噪 + 低频)
  'player_killed', // 玩家死亡(重击 + 下坠)
  // 拾取 / 模式切换
  'pickup_weapon', // 拾武器(两段上行哔哔)
  'pickup_mask', // 拾面具(三音上行琶音)
  'mode_switch', // F 拔刀 / 收刀(金属滑动音,节奏节拍器)
  // 叙事 / 流程
  'phone_ring', // 电话铃(旋转拨号双音)
  'mission_brief_typewriter', // 打字机(每字一次短咔哒)
  'door_open', // 开门(门轴吱呀)
  'room_clear', // 房间清除(C 大调琶音,亮)
  'mission_end_success', // 任务完成(A 小调琶音,小三和弦)
  'mission_end_fail', // 任务失败(下行小调)
] as const;

export type SfxRecipeId = (typeof SFX_RECIPES)[number];

/** 合成波形(引擎层映射 OscillatorType) */
export type SfxWaveform = 'sine' | 'square' | 'sawtooth' | 'triangle';

/** 噪声滤波器类型(引擎层映射 BiquadFilterType) */
export type SfxFilterType = 'lowpass' | 'highpass' | 'bandpass';

/** 单个振荡器声部 */
export interface SfxOscillator {
  type: SfxWaveform; // 波形
  freq: number; // 起始频率(Hz)
  freqEnd?: number; // 终点频率(Hz,滑音;缺省 = 保持起始频率)
  gain: number; // 相对电平 0..1
  delay?: number; // 相对声部起点延迟(秒,多声部错开)
}

/** 噪声 burst(可选) */
export interface SfxNoise {
  duration: number; // 时长(秒)
  gain: number; // 相对电平 0..1
  filterType?: SfxFilterType; // 滤波器类型,默认 lowpass
  filterFreq?: number; // 截止 / 中心频率(Hz)
}

/** 音效配方:id → 合成参数 */
export interface SfxRecipe {
  id: SfxRecipeId;
  duration: number; // 单次总时长(秒)
  attack: number; // 起音(秒)
  decay: number; // 衰减到 sustain 电平(秒)
  sustain: number; // 保持电平 0..1
  release: number; // 释音(秒)
  volume: number; // 配方基准音量 0..1(再乘 settings volume)
  priority: number; // 抢占优先级(voice 上限 6,数值大优先保留)
  oscillators: SfxOscillator[];
  noise?: SfxNoise;
  repeat?: number; // 循环次数(节拍器 / 电话铃),缺省 1
  repeatInterval?: number; // 循环间隔(秒)
}

export const SFX_RECIPE_TABLE: Record<SfxRecipeId, SfxRecipe> = {
  // ─── 开火(短促 noise burst + 方波 / 锯齿波快速下坠)───
  fire_pistol: {
    id: 'fire_pistol',
    duration: 0.05,
    attack: 0.005,
    decay: 0.03,
    sustain: 0,
    release: 0.02,
    volume: 0.5,
    priority: 70,
    oscillators: [{ type: 'square', freq: 180, freqEnd: 70, gain: 0.5 }],
    noise: { duration: 0.04, gain: 0.6, filterType: 'lowpass', filterFreq: 1800 },
  },
  fire_rifle: {
    id: 'fire_rifle',
    duration: 0.08,
    attack: 0.005,
    decay: 0.05,
    sustain: 0,
    release: 0.03,
    volume: 0.6,
    priority: 70,
    oscillators: [{ type: 'sawtooth', freq: 95, freqEnd: 40, gain: 0.6 }],
    noise: { duration: 0.07, gain: 0.7, filterType: 'lowpass', filterFreq: 1200 },
  },
  fire_smg: {
    id: 'fire_smg',
    duration: 0.06,
    attack: 0.004,
    decay: 0.035,
    sustain: 0,
    release: 0.025,
    volume: 0.45,
    priority: 70,
    oscillators: [{ type: 'square', freq: 220, freqEnd: 100, gain: 0.45 }],
    noise: { duration: 0.05, gain: 0.65, filterType: 'lowpass', filterFreq: 2600 },
  },

  // ─── 近战 / 投掷(呼啸感)───
  melee_swing: {
    id: 'melee_swing',
    duration: 0.15,
    attack: 0.01,
    decay: 0.1,
    sustain: 0.15,
    release: 0.04,
    volume: 0.4,
    priority: 65,
    oscillators: [{ type: 'triangle', freq: 320, freqEnd: 140, gain: 0.35 }],
    noise: { duration: 0.12, gain: 0.5, filterType: 'bandpass', filterFreq: 900 },
  },
  throw_weapon: {
    id: 'throw_weapon',
    duration: 0.12,
    attack: 0.008,
    decay: 0.09,
    sustain: 0,
    release: 0.03,
    volume: 0.5,
    priority: 65,
    oscillators: [{ type: 'square', freq: 480, freqEnd: 980, gain: 0.3 }],
    noise: { duration: 0.1, gain: 0.45, filterType: 'bandpass', filterFreq: 1400 },
  },

  // ─── 爆炸 / 击杀 / 死亡 ───
  explosion: {
    id: 'explosion',
    duration: 0.5,
    attack: 0.002,
    decay: 0.32,
    sustain: 0,
    release: 0.2,
    volume: 1.0,
    priority: 95,
    oscillators: [
      { type: 'sine', freq: 130, freqEnd: 28, gain: 0.9 },
      { type: 'square', freq: 70, freqEnd: 24, gain: 0.5, delay: 0.01 },
    ],
    noise: { duration: 0.45, gain: 0.9, filterType: 'lowpass', filterFreq: 420 },
  },
  thud_hit: {
    id: 'thud_hit',
    duration: 0.1,
    attack: 0.003,
    decay: 0.07,
    sustain: 0,
    release: 0.03,
    volume: 0.8,
    priority: 90,
    oscillators: [
      { type: 'sine', freq: 150, freqEnd: 42, gain: 0.8 },
      { type: 'triangle', freq: 1320, freqEnd: 1180, gain: 0.18, delay: 0.005 }, // 短促小锣
    ],
    noise: { duration: 0.06, gain: 0.4, filterType: 'lowpass', filterFreq: 620 },
  },
  splash_blood: {
    id: 'splash_blood',
    duration: 0.3,
    attack: 0.005,
    decay: 0.2,
    sustain: 0,
    release: 0.09,
    volume: 0.4,
    priority: 85,
    oscillators: [{ type: 'sine', freq: 210, freqEnd: 55, gain: 0.25 }],
    noise: { duration: 0.28, gain: 0.5, filterType: 'bandpass', filterFreq: 1100 },
  },
  player_killed: {
    id: 'player_killed',
    duration: 0.7,
    attack: 0.004,
    decay: 0.45,
    sustain: 0,
    release: 0.25,
    volume: 1.0,
    priority: 100,
    oscillators: [
      { type: 'sawtooth', freq: 210, freqEnd: 38, gain: 0.6 },
      { type: 'square', freq: 300, freqEnd: 120, gain: 0.35, delay: 0.03 },
    ],
    noise: { duration: 0.55, gain: 0.6, filterType: 'lowpass', filterFreq: 850 },
  },

  // ─── 拾取 / 模式切换 ───
  pickup_weapon: {
    id: 'pickup_weapon',
    duration: 0.2,
    attack: 0.005,
    decay: 0.12,
    sustain: 0,
    release: 0.06,
    volume: 0.5,
    priority: 50,
    oscillators: [
      { type: 'square', freq: 420, freqEnd: 600, gain: 0.4 },
      { type: 'square', freq: 640, freqEnd: 860, gain: 0.4, delay: 0.07 },
    ],
  },
  pickup_mask: {
    id: 'pickup_mask',
    duration: 0.25,
    attack: 0.008,
    decay: 0.16,
    sustain: 0,
    release: 0.08,
    volume: 0.5,
    priority: 50,
    oscillators: [
      { type: 'triangle', freq: 520, freqEnd: 780, gain: 0.4 },
      { type: 'triangle', freq: 780, freqEnd: 1170, gain: 0.4, delay: 0.08 },
      { type: 'sine', freq: 1560, gain: 0.15, delay: 0.16 },
    ],
  },
  mode_switch: {
    id: 'mode_switch',
    duration: 0.07,
    attack: 0.003,
    decay: 0.045,
    sustain: 0,
    release: 0.03,
    volume: 0.5,
    priority: 60,
    repeat: 3, // 节拍器式三连金属卡嗒
    repeatInterval: 0.07,
    oscillators: [{ type: 'square', freq: 2600, freqEnd: 3400, gain: 0.3 }],
    noise: { duration: 0.05, gain: 0.35, filterType: 'highpass', filterFreq: 3500 },
  },

  // ─── 叙事 / 流程 ───
  phone_ring: {
    id: 'phone_ring',
    duration: 0.2,
    attack: 0.005,
    decay: 0.14,
    sustain: 0.1,
    release: 0.05,
    volume: 0.6,
    priority: 40,
    repeat: 3, // 三声铃
    repeatInterval: 0.55,
    oscillators: [
      { type: 'square', freq: 440, gain: 0.4 },
      { type: 'square', freq: 660, gain: 0.3, delay: 0.02 },
    ],
  },
  mission_brief_typewriter: {
    id: 'mission_brief_typewriter',
    duration: 0.04,
    attack: 0.001,
    decay: 0.025,
    sustain: 0,
    release: 0.015,
    volume: 0.35,
    priority: 25,
    oscillators: [{ type: 'square', freq: 1150, gain: 0.3 }],
    noise: { duration: 0.03, gain: 0.5, filterType: 'lowpass', filterFreq: 3200 },
  },
  door_open: {
    id: 'door_open',
    duration: 0.5,
    attack: 0.03,
    decay: 0.3,
    sustain: 0.2,
    release: 0.15,
    volume: 0.5,
    priority: 45,
    oscillators: [{ type: 'sine', freq: 190, freqEnd: 95, gain: 0.35 }],
    noise: { duration: 0.42, gain: 0.3, filterType: 'lowpass', filterFreq: 520 },
  },
  room_clear: {
    id: 'room_clear',
    duration: 0.8,
    attack: 0.01,
    decay: 0.25,
    sustain: 0,
    release: 0.35,
    volume: 0.6,
    priority: 35,
    oscillators: [
      { type: 'sine', freq: 261.63, gain: 0.4 }, // C4
      { type: 'sine', freq: 329.63, gain: 0.4, delay: 0.09 }, // E4
      { type: 'sine', freq: 392.0, gain: 0.4, delay: 0.18 }, // G4
      { type: 'sine', freq: 523.25, gain: 0.45, delay: 0.27 }, // C5
      { type: 'triangle', freq: 1046.5, gain: 0.15, delay: 0.36 }, // C6 点缀
    ],
  },
  mission_end_success: {
    id: 'mission_end_success',
    duration: 1.0,
    attack: 0.01,
    decay: 0.3,
    sustain: 0,
    release: 0.4,
    volume: 0.7,
    priority: 30,
    oscillators: [
      { type: 'sine', freq: 220.0, gain: 0.45 }, // A3
      { type: 'sine', freq: 261.63, gain: 0.45, delay: 0.11 }, // C4
      { type: 'sine', freq: 329.63, gain: 0.45, delay: 0.22 }, // E4
      { type: 'sine', freq: 440.0, gain: 0.5, delay: 0.33 }, // A4
      { type: 'triangle', freq: 880.0, gain: 0.2, delay: 0.44 }, // A5
    ],
  },
  mission_end_fail: {
    id: 'mission_end_fail',
    duration: 0.8,
    attack: 0.02,
    decay: 0.4,
    sustain: 0,
    release: 0.3,
    volume: 0.7,
    priority: 30,
    oscillators: [
      { type: 'triangle', freq: 220.0, freqEnd: 174.61, gain: 0.5 }, // A3 → F3 下行
      { type: 'sawtooth', freq: 110.0, freqEnd: 82.41, gain: 0.35, delay: 0.12 }, // A2 → E2
    ],
  },
};
