// Frozen numeric tables — transcribed verbatim from ch04-ch05.pdf. See ../../TDD.md §4.

import type { Origin, TrackId } from './types'

export const START_WEALTH = 100_000
export const START_COGNITION = 50
export const START_STAMINA = 60
export const START_MOOD = 60

export const FINANCE_DYNASTY_START = {
  wealth: 300_000,
  cognition: 45,
  stamina: 75,
  mood: 75,
  relationshipTrust: 50,
} as const

// v2.5: 人生目标 established at the opening card — a wealth goal per origin (≈ starting
// wealth + 50%), checked on the summary screen. The love goal is stage-derived instead
// (loveStage 'close' or the winter reunion), because love is never a number.
export const TOWN_LIFE_GOAL_WEALTH = 150_000
export const DYNASTY_LIFE_GOAL_WEALTH = 400_000

export function originStartWealthFor(origin: Origin): number {
  return origin === 'finance_dynasty' ? FINANCE_DYNASTY_START.wealth : START_WEALTH
}

// v2.5 self-critique: progress is NET of the origin's starting wealth — "第一桶金" means
// EARNING your first pot, not inheriting it. Town starts at 0% (¥0 of ¥50k earned), not a
// silly 67% (100k/150k); dynasty at 0% (¥0 of ¥100k). The goal verdict stays an absolute
// threshold (wealth >= goal); only the progress bar reads net.
export function lifeGoalProgressFor(origin: Origin, wealth: number): number {
  const start = originStartWealthFor(origin)
  const goal = origin === 'finance_dynasty' ? DYNASTY_LIFE_GOAL_WEALTH : TOWN_LIFE_GOAL_WEALTH
  const span = goal - start
  if (span <= 0) return 0
  return Math.max(0, Math.min(100, Math.round(((wealth - start) / span) * 100)))
}

// v2.5: the love line's semester beats — 初次相遇 at the welcome party (turn 2+), 期中
// library meeting (6+), 期末 party (10+). Teaching beats outrank them; the line rolls
// forward to the next available arrival (same injection semantics as the dynasty line).
export const LOVE_FIRST_TURN = 2
export const LOVE_SECOND_TURN = 6
export const LOVE_THIRD_TURN = 10

// v2.5: 贵人好感 — each story event with `mentorFavor` raises the office hit probability
// by this much, capped at MENTOR_FAVOR_MAX. The 信任 (有能力 × 对口 = 90%) switch stays the
// dominant lever; 好感 is the "推你一把" diversity channel.
export const MENTOR_FAVOR_HIT_BONUS = 0.12
export const MENTOR_FAVOR_MAX = 4

// This scope only supports origin = 'town_exam_kid'; other rows kept for the frozen contract's completeness.
export const ORIGIN_DICE_MOD: Record<string, number> = {
  town_exam_kid: -2,
  urban_middle: 0,
  overseas_elite: 1,
  finance_dynasty: 2,
}

// Frozen at 0 for the intro scene — Ch01-03 (origin<->home-era mapping) do not exist yet.
// See GDD.md §2 and docs/levels/intro_scene.md §8 (decision D1).
export const ERA_DICE_MOD = 0

export const ORIGIN_LEARN_MULTIPLIER: Record<string, number> = {
  town_exam_kid: 1.3,
  urban_middle: 0.9,
  overseas_elite: 1.0,
  finance_dynasty: 0.9,
}

export const ORIGIN_WORK_MULTIPLIER: Record<string, number> = {
  town_exam_kid: 0.8,
  urban_middle: 1.0,
  overseas_elite: 1.1,
  finance_dynasty: 1.3,
}

export const ORIGIN_REST_RECOVERY: Record<string, number> = {
  town_exam_kid: 10,
  urban_middle: 20,
  overseas_elite: 25,
  finance_dynasty: 30,
}

// Free-tier mentor hit probability. Source doc gives only the two endpoints (Ch04 4.4):
// town_exam_kid 5-15% (mid used) and finance_dynasty's free-tier 30% (out of 出身好's stated
// "免费概率30%,付费概率95%" - paid tier is out of scope, no Token system this build). The middle
// two rows have no doc numbers at all; linearly interpolated and NOT ship-reachable this scope
// (only town_exam_kid vs finance_dynasty are ever compared, for the parallel-fate feature).
export const ORIGIN_MENTOR_FREE_HIT_PROB: Record<string, number> = {
  town_exam_kid: 0.1,
  urban_middle: 0.17,
  overseas_elite: 0.23,
  finance_dynasty: 0.3,
}

// v2.4: 模拟盘 spot trading — margin/leverage retired, so the panel is a real trading surface.
// Commission = 0.03% (A股 万三) of the fill notional; positions are held, not re-allocated weekly.
export const TRADE_FEE_RATE = 0.0003

// v1.2 §4: cognition at/above this narrows mood-driven preview distortion from last-3 ticks
// to last-1 — learning literally improves information. See docs/design/02-v1.2 §4.
export const COGNITION_INFO_THRESHOLD = 60

// v1.6 §1 (supersedes v1.5's cognition-direct bands): advice fidelity is driven by
// REVIEWED-TRADE count — the hidden loop 提高认知 → 获得复盘能力(认知 ≥ 60, reusing the
// frozen COGNITION_INFO_THRESHOLD) → 模拟盘试错 → 复盘得到建议. 0 reviews = blind for
// everyone (「看不懂」, 0 rand draws): nobody is born with 预判能力.
export const REVIEW_BAND_CREDITS = { noisy: 1, clear: 2, sharp: 3 } as const

// v1.6 §2: 贵人信任 (hidden line 2) — trusted = 有能力(认知 ≥ 60)× 对口(chose the
// MENTOR_FAVORED_TRACK). The favored track is AI: in 2013 金融 is the 显学 (no prediction
// needed); the 贵人 backs people who see the NEXT wave, not the current one.
export const MENTOR_TRUST_HIT_PROB = 0.9
export const MENTOR_FAVORED_TRACK: TrackId = 'ai'

// v1.7: 对外交流中心's gate — 开拓认知 requires enough cognition to keep up. 社交学习也是
// 认知: v1.7 folds 情商 INTO cognition rather than adding a scattered stat (user directive:
// all data converges on two unified indicators — 认知 and 身心健康).
export const EXCHANGE_COGNITION_THRESHOLD = 60

// Gap-teaser reference numbers for the summary screen — transcribed verbatim from ch04-ch05.pdf
// page 11 (Ch05 5.6), mid-level-player 32-round full-game net worth. A 4-turn intro session's own
// compounding is too small to feel dramatic (~0.5% gain) — the teaser instead previews what the full
// game's economics look like, which is the doc's own headline number, not a derived/scaled estimate.
export const TOWN_EXAM_KID_FULL_GAME_WEALTH = 2_085_000
export const FINANCE_DYNASTY_FULL_GAME_WEALTH = 13_300_000
