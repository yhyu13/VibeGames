// core/simulation/playerModel.ts — 玩家替身生成（TDD §2.6 R10 / §4.4.2 轮次表 / §7 管线）
// 冻结签名：engine 每帧调用 sample() 产出 PlayerPresence（种子 RNG，可复现 playtest）。
// TODO agent-core: 实现逼近/命中/闪避/弹幕调度（轮次表 ROUND_TABLE + S05/S06 判定源）。

import type { BossState, GamePhase, PlayerPresence } from '../types';

export interface PlayerRunCtx {
  round: number;
  time: number;
  phase: GamePhase;
  boss: BossState;
  barrageActive: boolean;
}

export function sample(ctx: PlayerRunCtx, rng?: () => number): PlayerPresence {
  void ctx;
  void rng;
  // TODO agent-core
  return {
    approachSpeed: 0,
    distanceToThrone: 40,
    dodgeCount: 0,
    hitsLanded: 0,
    dodgeTimingQuality: 0,
    barrageActive: false,
    aggression: 0,
    lingerTime: 0,
    state: 'gone',
  };
}
