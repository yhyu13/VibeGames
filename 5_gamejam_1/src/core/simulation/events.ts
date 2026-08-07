// core/simulation/events.ts — SimEvent 联合（TDD §5.3 冻结，仿 4_chunbai 模式）
// 平台无关事件：由 Simulation 发出，由适配层（渲染/音频/UI/持久化）消费。

import type { AttackJudgement, AudienceReaction, GamePhase, FxKind, MusicMode, PerformMode, RatingAxisId, SoundKind, Speaker, StorageKey, BossAnimKind, Vector3 } from '../types';

export type SimEvent =
  | { type: 'sound'; sound: SoundKind; volume?: number; pan?: number; pitch?: number; rate?: number }
  | { type: 'explosion'; pos: Vector3; color: string; size: number }
  | { type: 'fx'; fx: FxKind; pos?: Vector3; value?: number }
  | { type: 'dialogue'; lineId: string; pool: string; speaker: Speaker; priority?: number }
  | { type: 'barrage'; text: string; duration: number }          // 攻略弹幕（DOM 层）
  | { type: 'attackJudgement'; judgement: AttackJudgement; hit: boolean; combo: number; maxCombo: number; reaction: AudienceReaction }
  | { type: 'rating'; axis: RatingAxisId; stars: number; evidence?: string } // A4 揭示
  | { type: 'persist'; key: StorageKey; value: unknown }          // 持久化请求
  | { type: 'phase'; phase: GamePhase; performMode?: PerformMode } // 全局状态广播
  | { type: 'bossAnim'; anim: BossAnimKind; once?: boolean; speed?: number }
  | { type: 'music'; mode: MusicMode; intensity: number };        // 音乐层切换

// 事件消费契约（engine 适配器实现）
export interface EventConsumer {
  onSimEvent(e: SimEvent): void;
}
