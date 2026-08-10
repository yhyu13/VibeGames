# TDD — Stock God Simulator: Intro Scene (frozen contract v1.0)

| Version | Date | Change |
|---|---|---|
| v1.0 | 2026-08-09 | Initial intro-scene contract (campus zone, 小镇做题家 × Web 2.0) |
| v1.0.1 | 2026-08-09 | Fixed unreachable 'awaken' dice tier (stateMod thresholds now stack independently) |
| v1.0.2 | 2026-08-09 | Fixed hidden-city-cell content leak; board layout redesign (explicit per-cell offsets, not CSS nth-child); fixed transform-property conflict on the current-cell highlight |
| **v1.1** | **2026-08-10** | **8-turn sessions (was 4); ⚡ 特殊事件 shock mechanic; 平行命运 ("what if 金融世家") parallel trajectory tracked every turn; AI-coach attribution redesigned from a magnitude race (origin always won) to categorical-by-cell-type** |

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
│   │   ├── cells.ts       # 6 campus cells + 3 locked city cells (static data)
│   │   ├── coachLines.ts  # 班主任 persona template lines by (tier × dimension)
│   │   ├── assets.ts      # 3 mocked investable assets + deterministic price ticks
│   │   └── specialEvents.ts # v1.1: 牛市/熊市/政策/黑天鹅 table + trigger probability
│   └── simulation/
│       ├── dice.ts        # rollDice() + rollAltDice() (v1.1) — pure functions, seeded
│       ├── events.ts      # resolveEvent() + computeAltEventDelta()/computeAltMentorHit() (v1.1)
│       ├── invest.ts      # resolveInvestment() + resolveAltInvestment() (v1.1)
│       ├── attribution.ts # dominantDimension() — categorical-by-cell-type as of v1.1 (see §4)
│       └── Simulation.ts  # orchestrator: reducer over GameState, now also advances altPlayer
├── engine/                # platform adapters
│   └── rng.ts              # seeded PRNG (mulberry32) — the only place Math.random-equivalent lives
├── store.ts                # zustand store wrapping Simulation
└── components/
    ├── IntroScene.tsx       # top-level scene shell + turn sequencing
    ├── Board.tsx            # 6 campus cells + 3 locked city cells, explicit per-cell offsets (v1.0.2)
    ├── Cell.tsx             # single cell (lit / locked / current / visited); locked cells show a
    │                         # ❔/??? placeholder, never the real icon/label (v1.0.2 content-leak fix)
    ├── DiceRoller.tsx       # 2d6 roll animation + formula breakdown
    ├── EventModal.tsx       # 2-choice event picker
    ├── InvestPanel.tsx      # asset pick + allocation slider + resolve
    ├── AICoachPanel.tsx     # typed-reveal coach line + 4D attribution bars
    ├── SpecialEventBanner.tsx # v1.1: ⚡ shock event banner
    ├── ParallelFateCard.tsx   # v1.1: 平行命运 same-dice-different-origin comparison
    ├── HUD.tsx              # wealth / cognition / stamina / mood counters, color-coded pills
    ├── useCountUp.ts        # small shared number tick-up animation hook
    └── SummaryScreen.tsx    # end-of-intro recap + this-run 平行命运 result + static gap-teaser
```

**Why no `engine/AudioManager.ts`**: intro scope has no SFX; deferred if time allows. If added, it goes in `engine/` per C.A.T, never in `core/`.

**Why `altPlayer` lives in `GameState`, not a separate store**: 平行命运 needs to read the SAME
physical dice rolls, event choice, and investment tick as the real player at the exact moment
they're decided — threading it through the same reducer functions (`startRoll`/`chooseEvent`/
`makeInvestment`/`finishCoach`) is what guarantees "same luck, different origin" instead of an
independently-seeded (and therefore incomparable) simulation.

## 3. Data contracts (frozen)

```ts
// core/types.ts
export type Origin = 'town_exam_kid' | 'urban_middle' | 'overseas_elite' | 'finance_dynasty'
export type Era = 'web2' | 'post_mobile' | 'ai_year' | 'next_era'
export type CellType = 'learn' | 'work' | 'mentor' | 'special' | 'rest' | 'start'
export type ZoneId = 'campus' | 'city' | 'overseas' | 'special'

export interface Cell {
  id: string
  zone: ZoneId
  type: CellType
  label: string           // e.g. "图书馆"
  icon: string            // emoji, no asset files
  locked: boolean         // true = greyed, non-interactive (visibility gate)
}

export interface PlayerState {
  origin: Origin
  era: Era
  wealth: number          // ¥, starts 100_000
  cognition: number       // 0-100
  stamina: number         // 0-100
  mood: number            // 0-100
  turn: number            // 1-based, intro caps at 4
  position: string        // current Cell.id
  log: TurnResult[]
}

export interface DiceRollResult {
  rolls: [number, number]      // the 2 physical d6 faces
  originMod: number
  eraMod: number
  stateMod: number
  eventMod: number
  total: number                 // sum of all above
  tier: 'big_fail' | 'fail' | 'success' | 'big_success' | 'awaken'
}

export interface EventChoice {
  id: string
  label: string
  apply: (s: PlayerState) => Partial<PlayerState>   // pure delta
}

export interface InvestmentResult {
  assetId: string
  allocationPct: number     // 0-30 (30% cap per source doc §5.4)
  pnlPct: number             // resolved from deterministic price tick
  pnlAbs: number
}

export type AttributionDimension = 'origin' | 'era' | 'cognition' | 'emotion'

export interface CoachOutput {
  dominant: AttributionDimension
  dominantShare: number      // 0-1, magnitude-normalized
  line: string                // persona-scripted, see data/coachLines.ts
}

export interface TurnResult {
  turn: number
  cellId: string
  dice: DiceRollResult
  eventChoiceId: string
  investment: InvestmentResult
  coach: CoachOutput
}
```

## 4. Frozen numeric tables (Ch04/Ch05, transcribed verbatim from source PDF)

**Dice formula**: `total = d6 + d6 + originMod + eraMod + stateMod + eventMod`
- originMod: 小镇做题家 −2 · 城市中产 0 · 海外精英 +1 · 金融世家 +2 *(only −2 reachable this scope)*
- eraMod: home era +1 · other era 0 · unfamiliar era −1 *(no origin→home-era lookup table exists in any source doc — Ch01+02's "主角时代" concept stays narrative-only; frozen at 0 for the intro, see GDD.md §2)*
- stateMod: stamina≥60 or mood≥60 → +1 · stamina<30 or mood<30 → −1 · post-awaken → +1 extra (once/era)
- eventMod: bull cell +2 · bear cell −1 · mentor cell +1 · else 0

**Outcome tiers**: 2–3 大失败(−2 cells+loss) · 4–6 失败(stay+stamina−10) · 7–9 成功(+1 cell+std gain) · 10–12 大成功(+2 cells+2x gain) · 13+ 觉醒成功(circle jump)

**Event payouts** (per source doc §4.4, 小镇做题家 column only — this scope):
- 学习 (learn): cognition +5~+15 ×1.3 (origin bonus), stamina −5
- 实习/工作 (work): wealth +¥2,000~+¥10,000 ×0.8 (origin penalty), stamina −15
- 贵人 (mentor, free-tier only this scope): free-hit prob 5–15%
- 休息 (rest): stamina +10 (origin: worse recovery than privileged origins)

**Investment**: start wealth ¥100,000, 3 mocked assets, allocation cap 30% per turn, resolved at pre-seeded price tick (no live API — `core/data/assets.ts` ships a fixed 8-tick deterministic curve per asset, replayable by design).

## 5. Verification gates

```bash
npx tsc -b --noEmit        # 0 errors — the gate, no test suite (matches 4_chunbai/6_patapon3D convention)
npm run build               # tsc -b && vite build, must succeed
npm run dev                  # localhost:5185, manual browser playtest via Playwright MCP:
                              #   load → 0 console errors → 4 full turns → summary screen renders
```

## 6. File tree (new files this scope)

New: `package.json`, `vite.config.ts`, `tsconfig*.json`, `index.html`, `src/main.tsx`, `src/App.tsx`, `src/styles.css`, everything under §2's tree. Nothing modified outside `8_lifegame/` except root `AGENTS.md` (append project entry, per repo convention that every top-level project is listed there).
