// core/simulation/anxietyModel.ts — 焦虑值模型（TDD §4.4.2 S/R 表冻结）
// 纯函数：S01–S13 来源应用、R01 自然衰减、R02 评估安抚、分带派生、台词退化掷骰、分带效果。
// Simulation 负责调用时机与 lastSourceTime 记账。

import type { AnxietyBand, ScriptId } from '../types';
import {
  BAND_EFFECTS,
  BAND_CALM_MIN,
  BAND_NERVOUS_MIN,
  BAND_PANIC_MIN,
  BAND_SHAKY_MIN,
  DEGRADE_PANIC_BROKEN,
  DEGRADE_PANIC_FORGET,
  DEGRADE_PANIC_RATE,
  DEGRADE_SHAKY_FORGET,
  DEGRADE_SHAKY_RATE,
  DEGRADE_SHAKY_STAMMER,
  R_DECAY,
  R_DECAY_DELAY,
  R_EVALUATE,
  R_EVALUATE_CAP,
  R_EVALUATE_FLOOR,
  S_BARRAGE,
  S_BASE,
  S_FIRST_GLIMPSE,
  S_FORGOT,
  S_HESITATE,
  S_HIT,
  S_INTERRUPT,
  S_MISS,
  S_NORMAL_DODGE,
  S_PERFECT_DODGE,
  S_ROUND,
  S_SCRIPT_DIFFICULTY,
  S_STEADY_APPROACH,
} from '../constants';
import { clamp } from '../math';

// ============ 焦虑来源事件（S01–S13） ============
export type AnxietySourceEvent =
  | { kind: 'base' }                         // S01 起始基线 +30
  | { kind: 'round'; round: number }         // S02 轮次疲劳 +4×(R−1)
  | { kind: 'script'; script: ScriptId }     // S03 剧本难度加成
  | { kind: 'firstGlimpse' }                 // S04 首见 +8（单次，Simulation 保证只发一次）
  | { kind: 'steady'; dt: number }           // S05 稳步逼近 +1.4/s
  | { kind: 'hesitate'; dt: number }         // S06 犹豫 +0.6/s
  | { kind: 'barrage' }                      // S07 弹幕 +12/条
  | { kind: 'hit' }                          // S08 命中 +5
  | { kind: 'perfectDodge' }                 // S09 完美闪避 +10
  | { kind: 'normalDodge' }                  // S10 普通闪避 +3
  | { kind: 'miss' }                         // S11 落空 +2
  | { kind: 'forgot' }                       // S12 忘词 +6
  | { kind: 'interrupt' };                   // S13 打断 +15

/** 单条来源增量（Simulation 用 totalDelta 判断「有无焦虑源」以重置 3s 计时） */
export function sourceDelta(e: AnxietySourceEvent): number {
  switch (e.kind) {
    case 'base': return S_BASE;
    case 'round': return S_ROUND * Math.max(0, e.round - 1);
    case 'script': return S_SCRIPT_DIFFICULTY[e.script] ?? 0;
    case 'firstGlimpse': return S_FIRST_GLIMPSE;
    case 'steady': return S_STEADY_APPROACH * e.dt;
    case 'hesitate': return S_HESITATE * e.dt;
    case 'barrage': return S_BARRAGE;
    case 'hit': return S_HIT;
    case 'perfectDodge': return S_PERFECT_DODGE;
    case 'normalDodge': return S_NORMAL_DODGE;
    case 'miss': return S_MISS;
    case 'forgot': return S_FORGOT;
    case 'interrupt': return S_INTERRUPT;
  }
}

/** 批量应用来源，返回 clamp(0,100) 后的新焦虑值 */
export function applySources(anxiety: number, events: readonly AnxietySourceEvent[]): number {
  let total = 0;
  for (const e of events) total += sourceDelta(e);
  return clamp(anxiety + total, 0, 100);
}

/** 本批来源总增量（供 Simulation 判定 lastSourceTime 是否应清零） */
export function totalDelta(events: readonly AnxietySourceEvent[]): number {
  let total = 0;
  for (const e of events) total += sourceDelta(e);
  return total;
}

// ============ 衰减与安抚 ============

/** R01 自然衰减 −2/s：连续 3s 无焦虑源后启动；焦虑 <10 停止（01 §3.4）。lastSourceTime = 距上个来源的秒数 */
export function applyDecay(anxiety: number, dt: number, lastSourceTime: number): number {
  if (lastSourceTime < R_DECAY_DELAY) return anxiety;
  if (anxiety < 10) return anxiety; // 不跌破冷静区底线，避免永远冷静
  return Math.max(anxiety - R_DECAY * dt, BAND_CALM_MIN);
}

/** R02 评估阶段安抚 −4/s：最多 −40，不跌破 10。elapsed = 评估已进行秒数（纯 elapsed 幂等） */
export function evaluateSoothing(anxiety: number, _dt: number, elapsed: number): number {
  void _dt;
  const reduction = Math.min(elapsed * R_EVALUATE, R_EVALUATE_CAP);
  return Math.max(anxiety - reduction, R_EVALUATE_FLOOR);
}

// ============ 分带 ============

/** 由焦虑值派生分带（01 §3.2 区间） */
export function computeBand(anxiety: number): AnxietyBand {
  if (anxiety >= BAND_PANIC_MIN) return 'panic';
  if (anxiety >= BAND_SHAKY_MIN) return 'shaky';
  if (anxiety >= BAND_NERVOUS_MIN) return 'nervous';
  return 'calm';
}

/** 当前分带的效果参数（攻速/台词完整率/威力/散射/落空，逐攻击实时采样） */
export function bandEffects(band: AnxietyBand): (typeof BAND_EFFECTS)[number] {
  const found = BAND_EFFECTS.find((b) => b.band === band);
  if (!found) return BAND_EFFECTS[0];
  return found;
}

// ============ 台词退化掷骰（01 §3.2 逐句掷骰） ============

export interface DegradeRoll {
  degraded: boolean;
  kind: 'forget' | 'stammer' | 'broken' | null;
}

/** 每句独立掷骰。forget = 整句遗忘（S12，静默 1.5s）；stammer/broken = 仍输出但降质 */
export function degradeRoll(band: AnxietyBand, rng: () => number): DegradeRoll {
  switch (band) {
    case 'calm':
      return { degraded: false, kind: null };
    case 'nervous': {
      // 90% 完整；10% 轻微结巴（换一两个词，仍算完整输出）
      if (rng() >= NERVOUS_DEGRADE_RATE) return { degraded: false, kind: null };
      return { degraded: true, kind: 'stammer' };
    }
    case 'shaky': {
      // 35% 退化；退化内部 15/35 遗忘、20/35 结巴（比例归一）
      if (rng() >= DEGRADE_SHAKY_RATE) return { degraded: false, kind: null };
      const total = DEGRADE_SHAKY_FORGET + DEGRADE_SHAKY_STAMMER;
      const roll = rng() * total;
      return roll < DEGRADE_SHAKY_FORGET
        ? { degraded: true, kind: 'forget' }
        : { degraded: true, kind: 'stammer' };
    }
    case 'panic': {
      // 60% 退化；退化内部 30/60 遗忘、30/60 破碎断句
      if (rng() >= DEGRADE_PANIC_RATE) return { degraded: false, kind: null };
      const total = DEGRADE_PANIC_FORGET + DEGRADE_PANIC_BROKEN;
      const roll = rng() * total;
      return roll < DEGRADE_PANIC_FORGET
        ? { degraded: true, kind: 'forget' }
        : { degraded: true, kind: 'broken' };
    }
  }
}

const NERVOUS_DEGRADE_RATE = 0.1; // 01 §3.2：紧张带完整率 90%
