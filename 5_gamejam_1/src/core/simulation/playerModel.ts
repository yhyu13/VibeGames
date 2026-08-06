// core/simulation/playerModel.ts — 玩家替身生成（TDD §2.6 R10 / §4.4.2 轮次表 / §7 管线）
// 冻结签名：engine 每帧调用 sample() 产出 PlayerPresence（种子 RNG，可复现 playtest）。
// 纯函数：逼近速度/距离/命中/闪避/弹幕/停留全部由 (ctx, rng) 确定性派生。

import type { BossState, GamePhase, PlayerPresence } from '../types';
import {
  BARRAGE_ACTIVE_WINDOW,
  MAX_ROUNDS,
  PLAYER_AGGR_WEIGHT_HIT,
  PLAYER_AGGR_WEIGHT_SPEED,
  PLAYER_APPROACH_MAX,
  PLAYER_APPROACH_MIN,
  PLAYER_ATTACK_RATE,
  PLAYER_DODGE_NORMAL_WINDOW,
  PLAYER_DODGE_PERFECT_WINDOW,
  PLAYER_LINGER_BASE,
  PERFORM_MAX_TIME,
  ROUND_TABLE,
  SENSE_TRIGGER_DIST,
} from '../constants';
import { clamp, mulberry32, randRange } from '../math';

export interface PlayerRunCtx {
  round: number;
  time: number;
  phase: GamePhase;
  boss: BossState;
  barrageActive: boolean;
}

/** 每轮时长估算（轮次状态机真实时长由 Simulation 驱动；此处仅作确定性时间轴） */
const ROUND_CYCLE = PERFORM_MAX_TIME + 30;

export function sample(ctx: PlayerRunCtx, rng?: () => number): PlayerPresence {
  // 种子 RNG：优先外部注入（可复现 playtest），否则由时间+轮次派生
  const roll = rng ?? mulberry32((((ctx.time * 1000) | 0) ^ ((ctx.round * 2654435761) | 0)) >>> 0);

  const roundIdx = clamp(ctx.round - 1, 0, MAX_ROUNDS - 1);
  const table = ROUND_TABLE[roundIdx];
  const roundStart = Math.max(0, (ctx.round - 1)) * ROUND_CYCLE;
  const elapsed = Math.max(0, ctx.time - roundStart);

  const waiting = ctx.phase === 'WAIT';
  const sensing = ctx.phase === 'SENSE';
  const engaging = ctx.phase === 'PERFORM';
  const leaving = ctx.phase === 'EVALUATE' || ctx.phase === 'DIARY';
  const gone = ctx.phase === 'MENU' || ctx.phase === 'ENDING_NORMAL' || ctx.phase === 'ENDING_HIDDEN' || ctx.phase === 'PAUSE';

  // 逼近速度：轮次表基础值 ±10% 抖动（S05/S06 判定源）；非逼近态为 0
  const moving = waiting || sensing || engaging;
  const approachSpeed = moving
    ? clamp(randRange(roll, table.approachSpeed * 0.9, table.approachSpeed * 1.05), PLAYER_APPROACH_MIN, PLAYER_APPROACH_MAX)
    : 0;

  // 距离：40m 走廊起点 → 王座（boss.pos 代理王座位置）；engage 后贴近至 1.5m
  const from = 40;
  const to = engaging ? 1.5 : 8;
  const progress = clamp(elapsed / SENSE_TRIGGER_DIST, 0, 1);
  const distanceToThrone = gone || leaving ? from : Math.max(0, from - (from - to) * progress);

  // 弹幕调度：ctx 判定透传（S07 源），仅 engage 期间显示，窗口 4s
  const barrageActive = ctx.barrageActive && engaging && Math.floor(elapsed / BARRAGE_ACTIVE_WINDOW) % 2 === 0;

  // 攻击尝试率 ~0.12 次/s（每 ~8s 一次尝试）；命中/闪避按轮次表概率（确定性派生自时间）
  const attempts = engaging ? Math.floor(elapsed * PLAYER_ATTACK_RATE) : 0;
  const dodgeProb = clamp(table.dodgeNormal + table.dodgePerfect, 0, 1);
  const dodgeCount = Math.max(0, Math.round(attempts * dodgeProb + (roll() - 0.5)));
  const hitsLanded = Math.max(0, attempts - dodgeCount);

  // 闪避时机质量：最近一次闪避误差采样（±0.18s 完美=1 / ±0.35s 普通=0.5 / 其余 0）
  let dodgeTimingQuality: 0 | 0.5 | 1 = 0;
  if (engaging && dodgeCount > 0) {
    const err = Math.abs(randRange(roll, -0.5, 0.5));
    dodgeTimingQuality = err <= PLAYER_DODGE_PERFECT_WINDOW ? 1 : err <= PLAYER_DODGE_NORMAL_WINDOW ? 0.5 : 0;
  }

  // 命中率（派生）+ 攻击性 = 0.5×approachSpeed + 0.5×hitRate
  const hitRate = attempts > 0 ? clamp(hitsLanded / attempts, 0, 1) : 0;
  const aggression = PLAYER_AGGR_WEIGHT_SPEED * approachSpeed + PLAYER_AGGR_WEIGHT_HIT * hitRate;

  // 轮末停留（A4 证据）：EVALUATE/DIARY 期间 2–4s
  const lingerTime = leaving ? PLAYER_LINGER_BASE + randRange(roll, 0, 2) : 0;

  let state: PlayerPresence['state'] = 'gone';
  if (waiting || sensing) state = 'approaching';
  else if (engaging) state = 'engaging';
  else if (leaving) state = 'retreating';

  return {
    approachSpeed,
    distanceToThrone,
    dodgeCount,
    hitsLanded,
    dodgeTimingQuality,
    barrageActive,
    aggression,
    lingerTime,
    state,
  };
}
