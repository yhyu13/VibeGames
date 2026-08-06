// core/simulation/bossFSM.ts — Boss 内部 FSM（TDD §4.4.1 冻结转移表 B01–B09）
// 纯转移函数：计时器与事件判定全部由 Simulation 持有，本模块只做「状态 × 标志 → 状态」。
// 标志语义：Simulation 每次转移后必须清除一次性标志（recoverDone/breakDone/interrupt）。

import type { AnxietyBand, BossInnerState } from '../types';
import {
  PANIC_DROP,
  PANIC_KNEEL_TIME,
  SWORD_DROP_CHANCE,
  SWORD_PICKUP_TIME,
} from '../constants';

export interface BossFlags {
  hpZero: boolean;        // Boss hp ≤ 0（B03 判定源）
  knockdowns: number;     // 当前累计击倒数（B03：<3 才倒地继续）
  inPerform: boolean;     // 全局 Perform 阶段运行中（B02 距离 <12m 由 Simulation 换算成此标志；B08 收尾时置 false）
  interrupt: boolean;     // B06 打断条件命中（line 中命中/弹幕/忘词×2）
  recoverDone: boolean;   // 当前恢复子状态计时完成：HIT 倒地 0.8s 播完（B04）/ RECOVER 整理发型 1.5s 结束（B05）
  breakDone: boolean;     // 出戏动画 0.5s 播完（B07）
}

/**
 * B01–B09 纯转移。默认返回原状态；不合法组合返回原状态（由 Simulation 守门）。
 * - B01 IDLE→ALERT：全局进入 SENSE 即自动（Simulation 在 SENSE 阶段调用）
 * - B09 EVALUATE→IDLE：自评提交后由 Simulation 在轮次重置时复位（本函数 EVALUATE 保持稳定）
 */
export function nextBossState(inner: BossInnerState, flags: BossFlags): BossInnerState {
  switch (inner) {
    case 'IDLE':
      return 'ALERT'; // B01
    case 'ALERT':
      return flags.inPerform ? 'PERFORM' : 'ALERT'; // B02
    case 'PERFORM': {
      if (flags.hpZero && flags.knockdowns < 3) return 'HIT'; // B03
      if (flags.interrupt) return 'BREAK_CHARACTER'; // B06
      if (!flags.inPerform) return 'EVALUATE'; // B08（G04/G05 条件由 Simulation 判定后传 !inPerform）
      return 'PERFORM';
    }
    case 'HIT':
      return flags.recoverDone ? 'RECOVER' : 'HIT'; // B04
    case 'RECOVER':
      return flags.recoverDone ? 'PERFORM' : 'RECOVER'; // B05
    case 'BREAK_CHARACTER':
      return flags.breakDone ? 'PERFORM' : 'BREAK_CHARACTER'; // B07（→ freePlay）
    case 'EVALUATE':
      return 'EVALUATE'; // B09 由 Simulation 轮次复位处理
  }
}

// ============ 恐慌崩溃 / 剑脱手（TDD §4.4.1 特殊行为） ============

export const PANIC_BREAKDOWN = {
  kneelTime: PANIC_KNEEL_TIME, // 跪下喘息 2s
  fallTo: PANIC_DROP,          // 之后焦虑回落至 70
} as const;

export const SWORD_DROP = {
  chance: SWORD_DROP_CHANCE,   // 恐慌带每次攻击 5% 脱手
  pickupTime: SWORD_PICKUP_TIME, // 捡剑 1.2s
} as const;

/** 焦虑达 100 → 触发恐慌崩溃（本 beat 强制取消） */
export function isPanicBreakdown(anxiety: number): boolean {
  return anxiety >= 100;
}

/** 崩溃结束后的回落值 */
export function afterBreakdown(): number {
  return PANIC_DROP;
}

/** 恐慌带攻击掷骰：是否剑脱手（脱手 → 捡剑 SWORD_PICKUP_TIME 秒喜感节拍） */
export function shouldDropSword(band: AnxietyBand, rng: () => number): boolean {
  return band === 'panic' && rng() < SWORD_DROP_CHANCE;
}
