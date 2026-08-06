// core/simulation/scriptDirector.ts — 剧本导演（TDD §4.6 / B06 打断规则）
// 纯 beat 模型：推进 stage/beat 索引、攻击时机窗口命中、站位容差（A1）、打断检测。
// 注：玩家真实输入（LMB）由 Simulation 汇总为 rng 采样的命中判定；未来可替换为真实输入通道。

import type { Beat, ScriptDef, Vector3 } from '../types';
import { BREAK_ON_BARRAGE, BREAK_ON_FORGET_TWICE, BREAK_ON_HIT } from '../constants';
import { clamp } from '../math';

export const STANCE_TOLERANCE_DEFAULT = 0.8; // 站位容差默认值（TDD A1：beat 要求站位 ±0.8m 内）
export const ATTACK_HIT_BASE = 0.85;         // 攻击窗口命中基础率（受抖动惩罚）

export interface DirectorStance {
  pos: Vector3;        // Boss 当前位置
  jitterRatio: number; // 移动抖动率 0–100（每 0.5s 位置突变幅度占比）
}

export interface DirectorInterrupts {
  hitDuringLine: boolean;   // ① line beat 中玩家命中（B06）
  barrageDuringLine: boolean; // ② 弹幕在 line beat 中刷新（B06）
  forgotCount: number;      // ③ 同阶段内忘词次数（B06：≥2 打断）
}

export interface DirectorResult {
  stageIndex: number;   // 推进后的阶段索引（done 时停在最后一阶段）
  beatIndex: number;    // 推进后的 beat 索引
  done: boolean;        // 剧本全 3 阶段播完
  broke: boolean;       // 本 tick 触发打断（→ Simulation 转 BREAK_CHARACTER + S13）
  attackHit: boolean;   // 本 tick 完成的 attack beat 是否命中
  combo: number;        // 连击片段：完成的 attack beat 命中 → 1，否则 0（Simulation 累加 streak/maxCombo）
}

/** 站位容差判定（A1 依据）：move beat 目标站位 ±0.8m（或 beat.tolerance）；无目标站位视为满足 */
export function stanceInTolerance(beat: Beat, pos: Vector3): boolean {
  const t = beat.targetPos;
  if (!t) return true;
  const tol = beat.tolerance ?? STANCE_TOLERANCE_DEFAULT;
  const dx = pos.x - t.x;
  const dz = pos.z - t.z;
  return Math.sqrt(dx * dx + dz * dz) <= tol;
}

/** 攻击时机窗口命中：站位稳（抖动小）→ 命中率高；纯 rng 采样（可复现 playtest） */
export function attackRoll(rng: () => number, jitterRatio: number): boolean {
  const penalty = clamp(jitterRatio / 100, 0, 1) * 0.4;
  return rng() < clamp(ATTACK_HIT_BASE - penalty, 0.35, 0.95);
}

/**
 * 推进一帧。elapsed = 当前 beat 已耗时（秒）。
 * 返回下一 (stageIndex, beatIndex)；空剧本/越界 → 立即 done。
 */
export function advanceBeat(
  script: ScriptDef,
  stageIndex: number,
  beatIndex: number,
  elapsed: number,
  stance: DirectorStance,
  interrupts: DirectorInterrupts,
  rng: () => number,
): DirectorResult {
  // 空剧本 / 阶段越界 → 立即完成
  if (!script || script.stages.length === 0 || stageIndex < 0 || stageIndex >= script.stages.length) {
    return { stageIndex: Math.max(0, stageIndex), beatIndex: 0, done: true, broke: false, attackHit: false, combo: 0 };
  }
  let sIdx = stageIndex;
  let bIdx = beatIndex;
  const stage = script.stages[sIdx];

  // 空阶段 → 跳过到下一阶段（递归安全：最多跳一次）
  if (!stage || stage.beats.length === 0) {
    const next = { ...advanceBeat(script, sIdx + 1, 0, 0, stance, interrupts, rng) };
    next.stageIndex = Math.min(next.stageIndex, script.stages.length - 1);
    return next;
  }
  if (bIdx < 0 || bIdx >= stage.beats.length) {
    const next = { ...advanceBeat(script, sIdx + 1, 0, 0, stance, interrupts, rng) };
    next.stageIndex = Math.min(next.stageIndex, script.stages.length - 1);
    return next;
  }

  const beat = stage.beats[bIdx];

  // 打断检测（B06）：仅在 line beat 中生效
  if (beat.type === 'line') {
    const hitBreak = BREAK_ON_HIT && interrupts.hitDuringLine;
    const barrageBreak = BREAK_ON_BARRAGE && interrupts.barrageDuringLine;
    const forgetBreak = BREAK_ON_FORGET_TWICE && interrupts.forgotCount >= 2;
    if (hitBreak || barrageBreak || forgetBreak) {
      // 打断即取消本 beat：索引不前进（Simulation 转入 BREAK_CHARACTER + S13 +15）
      return { stageIndex: sIdx, beatIndex: bIdx, done: false, broke: true, attackHit: false, combo: 0 };
    }
  }

  // beat 未完成 → 原地等待
  if (elapsed < beat.duration) {
    return { stageIndex: sIdx, beatIndex: bIdx, done: false, broke: false, attackHit: false, combo: 0 };
  }

  // beat 完成：attack 在此刻判定时机窗口命中
  let attackHit = false;
  let combo = 0;
  if (beat.type === 'attack') {
    attackHit = attackRoll(rng, stance.jitterRatio);
    combo = attackHit ? 1 : 0;
  }

  // 推进索引
  bIdx += 1;
  if (bIdx >= stage.beats.length) {
    bIdx = 0;
    sIdx += 1;
  }
  if (sIdx >= script.stages.length) {
    sIdx = Math.max(0, script.stages.length - 1);
    return { stageIndex: sIdx, beatIndex: Math.max(0, stage.beats.length - 1), done: true, broke: false, attackHit, combo };
  }
  return { stageIndex: sIdx, beatIndex: bIdx, done: false, broke: false, attackHit, combo };
}
