// core/simulation/events.ts — 模拟事件（V2 契约）

import type {
  AnxietyBand, AttackJudgement, AudienceReaction, BossAnimKind, EndingVariant,
  FxKind, PersistedStats, RatingAxisId, RoundResult, SoundKind, Speaker, StorageKey,
} from '../types';

export type SimEvent =
  | { type: 'phase'; phase: string }
  | { type: 'dialogue'; lineId: string; text: string; speaker: Speaker; pool?: string }
  | { type: 'barrage'; text: string; scene: string; style: string }
  | { type: 'attackJudgement'; judgement: AttackJudgement; reaction: AudienceReaction; early: boolean; combo: number }
  | { type: 'rhythmComplete'; perfectCount: number; maxCombo: number; misses: number }
  | { type: 'bossAnim'; anim: BossAnimKind }
  | { type: 'anxietyBand'; band: AnxietyBand; prompt: string }
  | { type: 'rating'; axis: RatingAxisId; stars: number; evidence: string }
  | { type: 'persist'; key: StorageKey; value: unknown }
  | { type: 'roundStart'; round: number }
  | { type: 'roundEnd'; result: RoundResult }
  | { type: 'ending'; variant: EndingVariant; stats: PersistedStats }
  | { type: 'fx'; fx: FxKind; strength: number }
  | { type: 'sound'; kind: SoundKind }
  | { type: 'viewers'; count: number }
  | { type: 'beat'; beat: { type: string; duration: number; remaining: number; targetPos?: { x: number; y: number; z: number } } | null };

export type EventConsumer = { onSimEvent(e: SimEvent): void };
