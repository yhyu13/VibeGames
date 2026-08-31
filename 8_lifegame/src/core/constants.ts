// Frozen numeric tables — transcribed verbatim from ch04-ch05.pdf. See ../../TDD.md §4.

import type { Origin, TrackId, TradingRules } from './types'

// v2.6 贫困逻辑: 小镇做题家的生活财富 = 生活费 ¥1,000 —— 从来没见过大钱,被本能使唤。
// 大钱故事发生在模拟盘 (¥100,000 试炼场) 上: 第一桶金 = 模拟盘翻盘到 ¥200,000。
export const START_WEALTH = 1_000
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
// v2.6: the goal is the PAPER-ACCOUNT 翻盘 target — the user's canonical arc
// "模拟盘亏到 5 万,再翻盘到 20 万" sets the town goal at ¥200,000 (dynasty: prove
// yourself, ¥300,000 → ¥500,000). 生活费 stays ¥1,000 and is never the goal number.
export const TOWN_PAPER_GOAL = 200_000
export const DYNASTY_PAPER_GOAL = 500_000

// v2.6: paper-account 翻盘 progress — NET of the origin's paper starting capital
// (小镇 ¥100,000 → ¥100,000 to earn; 世家 ¥300,000 → ¥200,000). Start 0%, a drawdown
// clamps to 0% (the 5 万 深坑 shows as a flat floor), 翻盘 back above start climbs.
export function paperGoalProgressFor(origin: Origin, paperValue: number): number {
  const start = origin === 'finance_dynasty' ? 300_000 : 100_000
  const goal = origin === 'finance_dynasty' ? DYNASTY_PAPER_GOAL : TOWN_PAPER_GOAL
  const span = goal - start
  if (span <= 0) return 0
  return Math.max(0, Math.min(100, Math.round(((paperValue - start) / span) * 100)))
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

// v2.7: 分资产类别完整规则 (用户拍板). T+1 / 最小单位 / 佣金 mechanically bind; 涨跌停 is
// 说明性 (weekly mock can't bind a daily ±10%). A股/港股 1手=100份 as a teaching note, but the
// indexes trade at 1份 min here (point-level price × 100 shares would lock 港股 out entirely).
export const TRADING_RULES: Record<string, TradingRules> = {
  money_fund: { market: '基金', tPlus1: true, priceLimitPct: null, minUnits: 1, lotSize: 1 },
  bond: { market: '基金', tPlus1: true, priceLimitPct: null, minUnits: 1, lotSize: 1 },
  index_fund: { market: '基金', tPlus1: true, priceLimitPct: null, minUnits: 1, lotSize: 1 },
  gold: { market: '商品', tPlus1: true, priceLimitPct: null, minUnits: 1, lotSize: 1 },
  a_index: { market: 'A股', tPlus1: true, priceLimitPct: 10, minUnits: 1, lotSize: 1 },
  hk_index: { market: '港股', tPlus1: true, priceLimitPct: null, minUnits: 1, lotSize: 1 },
  btc: { market: 'Crypto', tPlus1: false, priceLimitPct: null, minUnits: 0.0001, lotSize: 0.0001 },
}

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

// Ch07 (docs/design/20): 贵人系统 — 接住质量 + 觉醒双面性.
// A. 接住质量 (outline 承重墙④): 认知低听懂 30%, 认知高听懂 80%, gated at COGNITION_INFO_THRESHOLD.
export const MENTOR_COMPREHENSION_LOW = 0.3
export const MENTOR_COMPREHENSION_HIGH = 0.8
// C. 觉醒双面性 (ch04-ch05 §5.7): 觉醒后的圈层跃迁带代价 — 新期待压力 体力 −5/回合,
// 旧圈层贬低 心态 −5 (restart 一次性). Only the real 金融世家 player run carries these, not the twin.
export const AWAKENING_STAMINA_COST_PER_TURN = 5
export const AWAKENING_MOOD_COST_ONCE = 5

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
