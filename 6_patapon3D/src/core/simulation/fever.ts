/**
 * core/simulation/fever.ts — Fever 状态机(冻结,见 TDD §4.4)
 *
 * combo 达 FEVER_TRIGGERS(8/16/24)触发对应层级:slow-mo(只影响 sim dt)
 * + 伤害 ×FEVER_DAMAGE_MULT,持续 FEVER_DURATIONS 秒。MIRACLE 立即触发当前层级。
 */

import { FEVER_DAMAGE_MULT, FEVER_DURATIONS, FEVER_SLOWMO_FACTORS, FEVER_TRIGGERS } from '../constants.js';
import type { FeverState } from '../types.js';

export function makeFever(): FeverState {
  return { active: false, factor: 1, timeLeft: 0, damageMult: 1, level: -1 };
}

/** combo 命中触发层级;未触发返回 -1 */
export function feverLevelForCombo(combo: number): number {
  return FEVER_TRIGGERS.indexOf(combo as (typeof FEVER_TRIGGERS)[number]);
}

/** 启动/刷新 fever 到指定层级 */
export function startFever(fever: FeverState, level: number): void {
  const clamped = Math.min(level, FEVER_TRIGGERS.length - 1);
  fever.active = true;
  fever.level = clamped;
  fever.factor = FEVER_SLOWMO_FACTORS[clamped] ?? 1;
  fever.timeLeft = FEVER_DURATIONS[clamped] ?? 0;
  fever.damageMult = FEVER_DAMAGE_MULT;
}

/** 推进计时;返回 true 表示本帧结束(调用方发 feverEnd) */
export function tickFever(fever: FeverState, dt: number): boolean {
  if (!fever.active) return false;
  fever.timeLeft -= dt;
  if (fever.timeLeft > 0) return false;
  fever.active = false;
  fever.factor = 1;
  fever.timeLeft = 0;
  fever.damageMult = 1;
  return true;
}
