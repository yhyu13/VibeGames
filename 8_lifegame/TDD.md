# TDD — Stock God Simulator: Intro Scene (current contract v2.0)

| Version | Date | Change |
|---|---|---|
| v1.0 | 2026-08-09 | Initial intro-scene contract (campus zone, 小镇做题家 × Web 2.0) |
| v1.0.1 | 2026-08-09 | Fixed unreachable 'awaken' dice tier (stateMod thresholds now stack independently) |
| v1.0.2 | 2026-08-09 | Fixed hidden-city-cell content leak; board layout redesign (explicit per-cell offsets, not CSS nth-child); fixed transform-property conflict on the current-cell highlight |
| **v1.1** | **2026-08-10** | **8-turn sessions (was 4); ⚡ 特殊事件 shock mechanic; 平行命运 ("what if 金融世家") parallel trajectory tracked every turn; AI-coach attribution redesigned from a magnitude race (origin always won) to categorical-by-cell-type** |
| v1.1.1 | 2026-08-10 | Post-review contract repair: §3 re-transcribed in full (it had drifted from types.ts — missing `awakened`, `cellsToMove`, `EventOffer`, all v1.1 types); `DiceRollResult.extremeState` added so the coach's 情绪 override keys off the actual extreme stamina/mood state, not \|stateMod\|≥2 (the post-awaken +1 could false-trigger it); `StatDelta` type born for display deltas (was loose `Partial<PlayerState>`); SpecialEventBanner now shows the mood shock; TIER_LABEL/mentor-hit decode deduplicated |
| **v1.2** | **2026-08-10** | **Campus-world redesign (docs/design/02 rev.4, user design critique): free movement — player picks the destination, `cellsToMove` retired, dice tiers now scale event outcomes (boon ×0–2 / trap ×1.5–0); per-location weighted event tables (`LocationEvent` + `locationEvents.ts`, opportunity/neutral/trap); `EventChoice` closures retired → data `delta`+`coefficient`+`coefficientStats`; `EventOffer` = `{event, mentorRoll?}`; eventMod comes from the drawn destination event; mood→info distortion (`InfoQuality`, `COGNITION_INFO_THRESHOLD=60`, `pendingAssetPreviews`) — bad mood AND overconfidence both distort, only 30–60 sees straight; coach gains `hint`; TurnPhase = `choose_destination\|walking\|dice\|event\|invest\|results\|summary`; `TurnResult.locationEvent`; Board/Cell retired → CampusMap + BeatOverlay** |
| **v1.3** | **2026-08-10** | **Invest fiction (docs/design/03, user critique: 为什么直接开始模拟盘 / 没有K线 / 没有热点新闻 / 金融世家应操盘真盘): turn-1 forced 开户 story beat (`ACCOUNT_OPENING_EVENT` + per-building flavor text) unlocks the sim account — new `GameState.investUnlocked`, both choices unlock (no soft-lock), turn 1 skips the invest phase so `TurnResult.investment` is now NULLABLE; K-line candles replace the numeric tick row (`Candle`, `buildCandles` — HISTORY ONLY, fixing the future-tick leak; mood distortion reshapes the last 3/1 candles, rational consumes no rand); per-asset per-turn 热点新闻 (`MarketNews`, `data/marketNews.ts`, headline 80% faithful to the tick it PRECEDES, mood shows as a spin subline); `pendingAssetPreviews: Record<string, Candle[]>`, new `pendingMarketNews`; `buildAssetPreviews`/`distortTicks` retired → `buildMarketView`; 真盘 (finance-dynasty real account) deferred to M2+ per user decision** |
| **v1.4** | **2026-08-10** | **Mentor cognition gate + dice juice (docs/design/04, user critique: 贵人办公室在普通出身认知之外,需在图书馆浏览才能解锁 / 丢骰子不够带感): new `GameState.mentorUnlocked` — 贵人办公室 renders as greyed ❓「???」 and `chooseDestination` rejects it until the first post-开户 library visit forces the `MENTOR_DISCOVERY_EVENT` beat (0 rand draws, both choices unlock, invest phase NOT skipped); DiceRoller rebuilt for 带感 — decelerating tumble (delay ramp 50→420ms), die 1 locks 3 frames before die 2, slam settle, formula terms pop in at 120ms/term with the total slamming last (presentation-only, `Math.random()` visual scramble never touches the seeded roll)** |
| **v1.5** | **2026-08-10** | **Cognition advice + single-panel invest UI (docs/design/05, user critique: 建议需要根据认知来走,适宜/不适宜 / 所有投资类型一个面板,减少按钮和切换): new `InvestAdvice` + `investAdvice()` — cognition bands <40 blind(「看不懂」, 0 rand draws) / 40–59 noisy(70%) / 60–79 clear(85%, reuses frozen `COGNITION_INFO_THRESHOLD`) / ≥80 sharp(95%, `COGNITION_ADVICE_SHARP`); faithful labels track the coming tick's bucket (≥+2 适宜投资 / ≤−2 不适宜投资 / else 谨慎参与), unfaithful invert; 1 rand draw per non-blind asset, appended AFTER distortion+news draws in `buildMarketView`; new `GameState.pendingMarketAdvices`; InvestPanel rebuilt as ONE panel — all 3 assets as clickable rows (mini 44px K-line + news + advice tag each), the 3-button `.btn-asset` tab strip retired, one slider + one 确认交易** |
| **v1.6** | **2026-08-10** | **Hidden progression lines (docs/design/06, user directive: 不可能一开始就拥有模拟盘预判投资能力 —— 认知→复盘→试错→建议循环 + 贵人信任需有能力且对口): advice fidelity re-keyed from raw cognition to REVIEWED-TRADE count — new `GameState.reviewCredits`, +1 at turn end for REAL trades (仓位>0) with cognition ≥ 60 (复盘能力, reuses the frozen threshold; below it the coach line says 这笔交易没有复盘), bands 0/1/2/3+ credits → blind/noisy/clear/sharp via `REVIEW_BAND_CREDITS` (v1.5's `COGNITION_ADVICE_BLIND/SHARP` retired same-day); 选方向 beat — first 教学楼 visit forces `TRACK_CHOICE_EVENT` (4 tracks 金融/传统行业/人工智能/读研, 0 rand draws, no deltas), new `GameState.track: TrackId \| null`; 贵人信任 — `mentorTrustedFor(track, cognition)` = track `ai` (`MENTOR_FAVORED_TRACK`, the 2013 foresight bet) AND cognition ≥ 60 → mentor hit prob swaps origin-gated for `MENTOR_TRUST_HIT_PROB` 0.9 (twin checked on its OWN cognition — trust is earned, not inherited), `EventOffer.mentorTrusted` surfaces the 同道中人 line in EventModal; `buildMarketView(player, reviewCredits, rand)`** |
| **v1.7** | **2026-08-10** | **Unified mind/body indicators + two unlockable buildings (docs/design/07, user directives: 校园解锁健身房(回复心智)/对外交流中心(开拓认知,风险比图书馆高,需要情商) + 所有数据指向两个统一的认知和身心健康指标,人能控制的只有头脑和身体): HUD redesigned around TWO big gauges — 🧠 认知 and 💪 身心健康 (DISPLAY-fused 情绪+体力; data layer untouched, dice stateMod contract intact), 财富 demoted to an outcome chip; 健身房 💪 unlocks via the first post-开户 宿舍 visit (`GYM_DISCOVERY_EVENT` 办卡 beat, 0 rand draws, new `GameState.gymUnlocked`), its table restores 心态/体力 (the state-reset spot feeding dice stateMod); 对外交流中心 🌏 cognition-gated at `EXCHANGE_COGNITION_THRESHOLD` 70 (derived gate, no flag — 情商 FOLDS INTO cognition: 社交学习也是认知, a scattered 情商 stat would contradict the unified-indicators directive), its table pays +8~14 cognition vs library's +5~6 but the trap bites 认知 itself; CampusMap generalizes the mentor ??? lock to a 3-way lockHint (mentor/gym/exchange); showcase route: t6 办卡 beat + t8 exchange gate assertion** |
| **v1.9 / D13** | **2026-08-10** | **金融世家可玩路线 +「关系不是资产」(docs/design/08): `mentor_hit` is the intro victory and unlocks the origin; dice `awaken` remains an outcome tier but no longer mutates awakening; `createInitialState(origin, unlocked)` and origin-aware restart add dynasty resources; typed relationship effects replace Simulation choice-id ternaries; dynasty-only beats use the then-current 2/5/8 turn schedule and stop after closure; summary mounts the unlocked-origin choice; deterministic verification pins unlock, sequencing, trust clamps and truthful resolution. v2.0 later rebases the schedule for 13 weeks.** |
| **v2.0 / D14** | **2026-08-10** | **13-week intro semester + visible growth guidance: `INTRO_TURN_LIMIT=13`; every asset curve and news table has 13 entries (no week-9 wrap); finance-dynasty relationship beats rebased to weeks 3/7/11 with week-13 closure priority; InvestPanel persistently states 复盘能力 unlocks at cognition ≥60, requires a nonzero-position trade, and shows review progress; typed `CAMPUS_LOCATION_GUIDES` drives benefit/risk chips and pre-travel details for all eight campus locations without leaking locked content; browser verification now completes all 13 weeks.** |

## 1. Stack (locked)

| Dep | Version | Use |
|---|---|---|
| vite | ^6.0.0 | build / dev server **5185** (strictPort — 5173/5174/5183/5184 taken by sibling projects) |
| typescript | ^5.6.0 | strict typecheck |
| react / react-dom | ^19.0.0 | UI (this is a 2D board/card UI — no Three.js, no WebGL; CSS grid + DOM is the correct fit) |
| zustand | ^5.0.0 | UI state |

No Tailwind — plain CSS module (`styles.css`) is enough for a board-game UI this size. No test runner — `tsc -b --noEmit` is the verification gate (matches `4_chunbai`/`6_patapon3D` convention: no test suite, typecheck + browser playtest are the gates). No runtime asset files — all art is CSS/emoji/procedural (matches repo-wide "zero asset files" convention); zero network calls (market data + AI coach are both mocked, see GDD.md §2).

## 2. Architecture (C.A.T)

```
src/
├── core/                  # platform-pure: zero react/zustand/DOM
│   ├── types.ts           # frozen contracts (this doc §3)
│   ├── constants.ts       # frozen numeric tables (dice mods, event payouts, mentor-hit probs)
│   ├── data/
│   │   ├── cells.ts       # 6 campus buildings + 3 locked city skyline towers (static data)
│   │   ├── coachLines.ts  # 班主任 persona template lines by (tier × dimension) + v1.2 下次试试 hints
│   │   ├── assets.ts      # 3 mocked investable assets + deterministic price ticks
│   │   ├── specialEvents.ts # v1.1: 牛市/熊市/政策/黑天鹅 table + trigger probability
│   │   ├── locationEvents.ts # v1.2: per-location weighted event tables (opportunity/neutral/trap) + mentor pair; v1.3: + 开户 story beat
│   │   └── marketNews.ts  # v1.3: per-asset per-turn 热点新闻 headline pairs (up/down)
│   └── simulation/
│       ├── dice.ts        # rollDice() + rollAltDice() + tierForTotal() — pure functions, seeded
│       ├── events.ts      # v1.2: drawLocationEvent() + tier-scaled resolveEventChoice() + computeAltEventDelta()/computeAltMentorHit()
│       ├── invest.ts      # resolveInvestment() + resolveAltInvestment() + infoQuality() + v1.3 buildMarketView() (K-line candles + mood distortion + hot news)
│       ├── attribution.ts # dominantDimension() — categorical-by-cell-type as of v1.1 (see §4)
│       └── Simulation.ts  # orchestrator: reducer over GameState, now also advances altPlayer
├── engine/                # platform adapters
│   └── rng.ts              # seeded PRNG (mulberry32) — the only place Math.random-equivalent lives
├── store.ts                # zustand store wrapping Simulation
└── components/
    ├── IntroScene.tsx       # top-level scene shell: world layer + one beat overlay per phase (v1.2)
    ├── CampusMap.tsx        # v1.2: real campus map — sited buildings, hub paths, gliding token,
    │                         # north-gate locked-city skyline (replaces v1.1's Board.tsx/Cell.tsx ring)
    ├── BeatOverlay.tsx      # v1.2: the single center-overlay shell (dim backdrop + card, wide variant)
    ├── DiceRoller.tsx       # 2d6 roll animation + formula breakdown
    ├── EventModal.tsx       # location-event picker + kind badge 机会/日常/麻烦 (v1.2)
    ├── InvestPanel.tsx      # asset pick + slider + mood-distorted preview ticks + info badge (v1.2)
    ├── AICoachPanel.tsx     # typed-reveal coach line + 4D attribution bars + 下次试试 hint (v1.2)
    ├── SpecialEventBanner.tsx # v1.1: ⚡ shock event banner (wealth + mood readout)
    ├── ParallelFateCard.tsx   # v1.1: 平行命运 same-dice-different-origin comparison
    ├── tierLabels.ts          # v1.1.1: shared DiceTier→中文 label map (DiceRoller + ParallelFateCard)
    ├── HUD.tsx                # wealth / cognition / stamina / mood counters, color-coded pills
    ├── useCountUp.ts        # small shared number tick-up animation hook
    └── SummaryScreen.tsx    # end-of-intro recap + this-run 平行命运 result + static gap-teaser
```

**Why no `engine/AudioManager.ts`**: intro scope has no SFX; deferred if time allows. If added, it goes in `engine/` per C.A.T, never in `core/`.

**Why `altPlayer` lives in `GameState`, not a separate store**: 平行命运 needs to read the SAME
physical dice rolls, event choice, and investment tick as the real player at the exact moment
they're decided — threading it through the same reducer functions (`roll`/`chooseEvent`/
`makeInvestment`/`finishCoach`) is what guarantees "same luck, different origin" instead of an
independently-seeded (and therefore incomparable) simulation.

## 3. Data contracts (frozen)

```ts
// core/types.ts
export type Origin = 'town_exam_kid' | 'urban_middle' | 'overseas_elite' | 'finance_dynasty'
export type Era = 'web2' | 'post_mobile' | 'ai_year' | 'next_era'
export type CellType = 'learn' | 'work' | 'mentor' | 'special' | 'rest' | 'start'
export type ZoneId = 'campus' | 'city' | 'overseas' | 'special'
export type DiceTier = 'big_fail' | 'fail' | 'success' | 'big_success' | 'awaken'
export type AttributionDimension = 'origin' | 'era' | 'cognition' | 'emotion'
export type TurnPhase = 'choose_destination' | 'walking' | 'dice' | 'event' | 'invest' | 'results' | 'summary' // v1.2 (was map|dice|event|invest|coach|summary)

export interface Cell {
  id: string
  zone: ZoneId
  type: CellType
  label: string           // e.g. "图书馆"
  icon: string            // emoji, no asset files
  locked: boolean         // true = ❔/??? placeholder, non-interactive (visibility gate)
}

export interface PlayerState {
  origin: Origin
  era: Era
  wealth: number          // ¥, starts 100_000
  cognition: number       // 0-100
  stamina: number         // 0-100
  mood: number            // 0-100
  turn: number            // 1-based, intro caps at INTRO_TURN_LIMIT (13 weeks as of v2.0)
  position: string        // current Cell.id
  awakened: boolean       // latches true after the first 'awaken'-tier roll (post-awaken stateMod +1)
  log: TurnResult[]
}

// v1.1: 平行命运 — second trajectory for PARALLEL_FATE_ORIGIN, SAME dice/event/investment as
// the real player, different origin coefficients. No board position or log of its own.
export interface ParallelState {
  wealth: number
  cognition: number
  stamina: number
  mood: number
  awakened: boolean
}

// v1.1.1: display deltas ("+12/-8" rows) — never Partial<PlayerState>; a delta can't touch
// origin/position/log/awakened.
export type NumericStat = 'wealth' | 'cognition' | 'stamina' | 'mood'
export type StatDelta = Partial<Record<NumericStat, number>>

export interface DiceRollResult {
  rolls: [number, number]      // the 2 physical d6 faces
  originMod: number
  eraMod: number
  stateMod: number
  eventMod: number
  total: number                 // sum of all above
  tier: DiceTier                // v1.2: scales the drawn event's outcome — no longer moves the token
  extremeState: boolean         // v1.1.1: stamina AND mood both ≥60, or both <30 — drives the
                                // coach's 情绪 override (replaces the |stateMod|≥2 proxy)
}

// v1.2: choices are DATA, not closures — deltas resolve through the §4 pipeline
// (base × origin coefficient × tier factor → round → add → clamp).
export type LocationEventKind = 'opportunity' | 'neutral' | 'trap'

export interface LocationEventChoice {
  id: string
  label: string
  description: string
  delta: StatDelta
  coefficient: 'learn' | 'work' | 'rest' | null  // which ORIGIN_* table applies…
  coefficientStats: NumericStat[]                // …but ONLY to these stats (side-effects stay flat)
}

export interface LocationEvent {
  id: string
  cellType: CellType          // attribution key — 宿舍 events carry 'rest' though the Cell is 'start'
  kind: LocationEventKind
  weight: number              // 2 opportunity / 3 neutral / 1 trap; mentor entries 0 (probability roll)
  eventMod: number            // v1.2: feeds the dice formula at THIS destination (traps −1, mentor +1)
  scaledStats: NumericStat[]  // stats the dice tier factor multiplies
  title: string
  text: string
  choices: LocationEventChoice[]
}

// v1.2: the drawn event IS the offer — no cellId (the player already arrived; position says where).
export interface EventOffer {
  event: LocationEvent
  mentorRoll?: number  // raw rand() draw, mentor office only — shared with the parallel-fate hit check
}

// v1.2 §4: mood → information quality (the 30/60 bands frozen from the dice stateMod thresholds).
export interface InfoQuality {
  quality: 'pessimistic' | 'rational' | 'overconfident'
  narrowed: boolean           // cognition ≥ COGNITION_INFO_THRESHOLD (60): distortion window 3→1 ticks
}

export interface Asset {
  id: string
  label: string
  icon: string
  ticks: number[]       // deterministic % price curve, indexed by turn (0-based), 13 ticks
}

export interface InvestmentResult {
  assetId: string
  allocationPct: number     // 0-30 (30% cap per source doc §5.4)
  pnlPct: number            // resolved from deterministic price tick
  pnlAbs: number
}

// v1.3: K-line candle — synthesized from tick history (base ¥100), PAST turns only
export interface Candle { open: number; close: number; high: number; low: number }

// v1.3: 热点新闻 — headline + mood spin subline
export interface MarketNews { headline: string; spin: 'bearish' | 'neutral' | 'bullish' }

// v1.6: 复盘-driven 投资建议 — fidelity keys off REVIEWED-TRADE count (0 credits = blind
// 「看不懂」, 0 rand draws), NOT raw cognition (v1.5 superseded same-day); faithful labels
// track the coming tick's bucket (≥+2 适宜 / ≤−2 不适宜 / else 谨慎), unfaithful invert
export type AdviceLabel = '适宜投资' | '谨慎参与' | '不适宜投资' | '看不懂'
export interface InvestAdvice { band: 'blind' | 'noisy' | 'clear' | 'sharp'; label: AdviceLabel; faithful: boolean }

// v1.6: 选方向 — career-track bet at the 职业规划课 beat; 贵人信任's 对口 check keys off it
export type TrackId = 'finance' | 'industry' | 'ai' | 'academia'

export interface CoachOutput {
  dominant: AttributionDimension
  dominantShare: number      // tier-bucketed conviction: 0.5 success / 0.6 fail|big_success /
                             // 0.7 big_fail|awaken (v1.1 — was magnitude-normalized, which the
                             // constant originMod −2 won by construction)
  line: string               // persona-scripted, see data/coachLines.ts
  hint: string               // v1.2 §5: forward-looking "下次试试…" keyed to the dominant dimension
}

export interface TurnResult {
  turn: number
  cellId: string
  locationEvent: LocationEvent  // v1.2: which event this turn drew (was implicit in cell type)
  dice: DiceRollResult
  eventChoiceId: string
  eventDelta: StatDelta        // v1.1.1 (was Partial<PlayerState>)
  investment: InvestmentResult | null // v1.3: null on the turn-1 开户 beat (no trade yet)
  coach: CoachOutput
  microAwakening: boolean
}

// v1.1: one turn of the parallel trajectory, snapshotted for ParallelFateCard.
export interface ParallelFateSnapshot {
  diceTotal: number
  diceTier: DiceTier
  eventDelta: StatDelta
  mentorHit: boolean | null    // null when this turn's cell wasn't a mentor cell
  investmentPnlAbs: number
}

// v1.1: ⚡特殊事件 (Ch04 §4.4: 牛市/熊市/政策/黑天鹅, 无预兆) — per-turn shock, cell-independent.
export interface SpecialEvent {
  id: string
  label: string
  icon: string
  wealthPct: number            // ±15~30 per GDD.md §2
  moodDelta: number            // ±5~20
}

export interface SpecialEventResult {
  event: SpecialEvent
  wealthAbs: number            // real player's ¥ shock (own wealth base)
  altWealthAbs: number         // parallel trajectory's ¥ shock (its own wealth base)
}

export interface GameState {
  player: PlayerState
  altPlayer: ParallelState
  phase: TurnPhase
  pendingDestinationId: string | null   // v1.2: free movement — where the token is gliding to
  pendingDice: DiceRollResult | null
  pendingEvent: EventOffer | null
  pendingEventChoiceId: string | null
  pendingInvestment: InvestmentResult | null
  pendingCoach: CoachOutput | null
  pendingMicroAwakening: boolean
  pendingRealEventDelta: StatDelta | null
  pendingAltFate: ParallelFateSnapshot | null
  pendingSpecialEvent: SpecialEventResult | null
  investUnlocked: boolean                              // v1.3: false until the turn-1 开户 beat resolves
  mentorUnlocked: boolean                              // v1.4: false until the library discovery beat (贵人办公室 cognition gate)
  pendingAssetPreviews: Record<string, Candle[]> | null // v1.3: mood-distorted K-line history (past turns only)
  pendingMarketNews: Record<string, MarketNews> | null  // v1.3: per-asset hot news, same lifecycle as the candles
  pendingMarketAdvices: Record<string, InvestAdvice> | null // v1.5: per-asset advice, same lifecycle as the candles
  reviewCredits: number                              // v1.6: reviewed-trade count — drives advice fidelity (REVIEW_BAND_CREDITS)
  track: TrackId | null                              // v1.6: 职业规划课 chosen 方向 (贵人信任 对口 check)
  gymUnlocked: boolean                               // v1.7: 宿舍 办卡 beat unlocks 健身房 (exchange gate is derived: cognition ≥ 60)
  finished: boolean
}

export const INTRO_TURN_LIMIT = 13
export const PARALLEL_FATE_ORIGIN: Origin = 'finance_dynasty'
```

## 4. Frozen numeric tables (Ch04/Ch05, transcribed verbatim from source PDF)

**Dice formula**: `total = d6 + d6 + originMod + eraMod + stateMod + eventMod`
- originMod: 小镇做题家 −2 · 城市中产 0 · 海外精英 +1 · 金融世家 +2 *(only −2 reachable this scope)*
- eraMod: home era +1 · other era 0 · unfamiliar era −1 *(no origin→home-era lookup table exists in any source doc — Ch01+02's "主角时代" concept stays narrative-only; frozen at 0 for the intro, see GDD.md §2)*
- stateMod: stamina≥60 → +1 · mood≥60 → +1 · stamina<30 → −1 · mood<30 → −1 (each threshold stacks independently — the only reading under which the doc's stated range −2~+3 is reachable, v1.0.1) · post-awaken → +1 extra (once/era)
- eventMod: v1.2 — from the DRAWN destination event (trap −1 · mentor hit/miss +1 · else 0); was departure-cell-based in v1.1

**Outcome tiers** (boundaries unchanged): 2–3 大失败 · 4–6 失败 · 7–9 成功 · 10–12 大成功 · 13+ 觉醒成功. v1.2: tiers no longer move the token (`cellsToMove` retired) — they scale the drawn event's `scaledStats`: boon ×0/0.5/1/1.5/2, trap ×1.5/1/0.5/0.25/0 (big_fail→awaken; awaken dodges a trap entirely, big_fail fumbles a boon to nothing); stats outside `scaledStats` stay flat. The alt trajectory scales by the ALT tier (rollAltDice — same physical dice, different total).

**v1.2 event tables** (per-location, in `core/data/locationEvents.ts`): each campus building has 3 events — opportunity (weight 2) / neutral (3) / trap (1, eventMod −1); 贵人办公室 is the exception (probability roll, `ORIGIN_MENTOR_FREE_HIT_PROB`, both entries eventMod +1, choice ids `mentor_hit`/`mentor_miss` load-bearing). v1.1 payouts above are preserved inside the tables (深读 +12/−8, 加班 +¥8,000/−18, etc.); rest stamina bases encode the origin's reciprocal divisor as fractions (0.5/1.0/1.2/0.8 × ORIGIN_REST_RECOVERY).

**Event payouts** (per source doc §4.4, 小镇做题家 column only — this scope):
- 学习 (learn): cognition +5~+15 ×1.3 (origin bonus), stamina −5
- 实习/工作 (work): wealth +¥2,000~+¥10,000 ×0.8 (origin penalty), stamina −15
- 贵人 (mentor, free-tier only this scope): free-hit prob 5–15%
- 休息 (rest): stamina +10 (origin: worse recovery than privileged origins)

**Investment**: start wealth ¥100,000, 3 mocked assets, allocation cap 30% per week, resolved at a pre-seeded price tick (no live API — `core/data/assets.ts` ships a fixed 13-tick deterministic curve per asset, one unique tick for every semester week). Review ability unlocks at cognition ≥60; only nonzero-position trades earn review credits (0/1/2/3+ credits → blind/noisy/clear/sharp advice).

## 5. Verification gates

```bash
npx tsc -b --noEmit        # 0 errors — the gate, no test suite (matches 4_chunbai/6_patapon3D convention)
npm run build               # tsc -b && vite build, must succeed
npm run dev                  # localhost:5185, manual browser playtest via Playwright MCP:
                              #   load → 0 console errors → 13 full weeks → summary screen renders
                              # v1.2: plus seeded page.evaluate checks on window.__sim (DEV-only
                              # hook, store.ts): drawn event defined per arrival; forced mood
                              # 25/45/75 → pessimistic/rational/overconfident; forced-tier factor
                              # spot-checks (big_success boon ×1.5, awaken trap ×0)
```

## 6. File tree (new files this scope)

New: `package.json`, `vite.config.ts`, `tsconfig*.json`, `index.html`, `src/main.tsx`, `src/App.tsx`, `src/styles.css`, everything under §2's tree. Nothing modified outside `8_lifegame/` except root `AGENTS.md` (append project entry, per repo convention that every top-level project is listed there).
