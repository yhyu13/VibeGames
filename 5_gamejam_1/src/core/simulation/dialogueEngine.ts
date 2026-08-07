// core/simulation/dialogueEngine.ts — 台词引擎（TDD §4.4.2 退化掷骰 / 02 内容池）
// 纯函数：按焦虑带逐句掷骰 → 完整 / 结巴 / 遗忘（静默 1.5s + 60% 补 L_PANIC）/ 破碎。
// LINE_POOLS 可能为空（content 未合入）→ 优雅返回 null。

import type { AnxietyBand, DialogueLine } from '../types';
import {
  DEGRADE_PANIC_BROKEN,
  DEGRADE_PANIC_FORGET,
  DEGRADE_PANIC_RATE,
  DEGRADE_SHAKY_FORGET,
  DEGRADE_SHAKY_RATE,
  DEGRADE_SHAKY_STAMMER,
  PANIC_FILL_CHANCE,
} from '../constants';
import { pick } from '../math';
import { HIDDEN_CHAIN_CHOICES, HIDDEN_CHAIN_QUESTION_ID, LINE_POOLS } from '../data/lines';

/** 容错取池：调用方可能用 'L_DIG' 或 'DIG'（内容表统一无 L_ 前缀键） */
function resolvePool(poolKey: string): DialogueLine[] | undefined {
  return LINE_POOLS[poolKey] ?? LINE_POOLS[poolKey.replace(/^L_/, '')];
}

export interface LinePick {
  line: DialogueLine | null; // 实际输出的台词（遗忘且未补 → null）
  forgot: boolean;           // 整句遗忘（触发 S12 +6；Simulation 负责 1.5s 静默计时）
  fill: boolean;             // 遗忘后是否补 L_PANIC 即兴
}

/** 隐藏结局链选项（01 §6 步骤 3 / TDD G09-G10）：当前对白为提问行时返回 A/B/C，否则 null */
export function hiddenChainChoices(lineId: string): ReadonlyArray<{ key: 'A' | 'B' | 'C'; text: string }> | null {
  return lineId === HIDDEN_CHAIN_QUESTION_ID ? HIDDEN_CHAIN_CHOICES : null;
}

export function pickBloopLine(rng: () => number): DialogueLine | null {
  const pool = resolvePool('L_BLOOP');
  return pool && pool.length > 0 ? pick(rng, pool) : null;
}

/**
 * 选一句台词。
 * @param poolKey 池前缀，如 'L_DIG' / 'L_TRG' / 'L_FREE' / 'L_PANIC' / 'L_SELFDOUBT'
 * @param forgotten 同阶段已遗忘次数（Simulation 记账；≥2 时由 director 触发打断）
 */
export function pickLine(poolKey: string, rng: () => number, band: AnxietyBand, forgotten: number): LinePick {
  void forgotten; // 预留：S12 记账/打断计数由 Simulation 汇总
  const pool = resolvePool(poolKey);
  if (!pool || pool.length === 0) return { line: null, forgot: false, fill: false };

  // L_FREE 自由发挥 100% 完整；L_SELFDOUBT 首句替换标记 → 直接给出替换句（完整）
  if (poolKey === 'L_FREE' || poolKey === 'L_SELFDOUBT' || band === 'calm') {
    return { line: pick(rng, pool), forgot: false, fill: false };
  }

  if (band === 'nervous') {
    // 10% 轻微结巴：仍完整输出（换词降质由 engine 表现层处理）
    return { line: pick(rng, pool), forgot: false, fill: false };
  }

  if (band === 'shaky') {
    if (rng() >= DEGRADE_SHAKY_RATE) return { line: pick(rng, pool), forgot: false, fill: false };
    const total = DEGRADE_SHAKY_FORGET + DEGRADE_SHAKY_STAMMER;
    if (rng() * total < DEGRADE_SHAKY_FORGET) {
      // 整句遗忘 → 静默 1.5s，60% 概率补一句 L_PANIC（无论补不补都触发 S12）
      const fill = rng() < PANIC_FILL_CHANCE;
      const panic = resolvePool('L_PANIC');
      return { line: fill && panic && panic.length > 0 ? pick(rng, panic) : null, forgot: true, fill };
    }
    return { line: pick(rng, pool), forgot: false, fill: false }; // 结巴换词
  }

  // panic：60% 退化（30% 遗忘 / 30% 破碎断句）
  if (rng() >= DEGRADE_PANIC_RATE) return { line: pick(rng, pool), forgot: false, fill: false };
  const total = DEGRADE_PANIC_FORGET + DEGRADE_PANIC_BROKEN;
  if (rng() * total < DEGRADE_PANIC_FORGET) {
    const fill = rng() < PANIC_FILL_CHANCE;
    const panic = resolvePool('L_PANIC');
    return { line: fill && panic && panic.length > 0 ? pick(rng, panic) : null, forgot: true, fill };
  }
  return { line: pick(rng, pool), forgot: false, fill: false }; // 破碎断句（engine 渲染破碎效果）
}
