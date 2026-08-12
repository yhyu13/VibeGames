# 8_lifegame - Project AGENTS.md (v2.2, intro scene only)

> Project-level rules for agents working in this directory. The monorepo root
> `../AGENTS.md` is the umbrella rule set; this file is its child.
> 8_lifegame = Stock God Simulator (股神模拟器) intro scene, built from a
> larger, unfinished design series: `ch04-ch05.pdf` (board + core loop),
> `ch01-ch02.pdf` (worldview + era slices, arrived mid-build 2026-08-09),
> and `outline.pdf` (v0.3 business framework). Ch03/06 exist only as a
> condensed section inside `outline.pdf`; Ch07 (mentor system) + Ch09
> (investment strategy library) do not exist anywhere yet.

## 1. One-liner

A Monopoly-style life/investing sim where origin x era gates which board
cells you can even see. This repo ships exactly one scene: a 17-turn opening
calendar (13 campus weeks + 3 winter-break weeks + next-semester opening,
current contract v2.2). 小镇做题家 is the default origin; mentor recognition
unlocks a playable 金融世家 restart with its own「关系不是资产」line. Christmas
adds an independent love line, while three city cells stay locked at the map edge.

## 2. Scope discipline

This is a **from-scratch, intro-scene-only build** — there is no larger
implementation to extend without first re-reading `GDD.md` §2's frozen vs
data-frozen vs M2+ split. In particular:

- Do not wire a real market-data API — investing is intentionally mocked
  (`src/core/data/assets.ts`, seven deterministic 17-tick semester curves).
  The product set and leverage caps are frozen for v2.1: 货币基金/债券/黄金/
  指数基金 at 2×, A股/港股 at 3×, and BTC at 5×. Allocation is posted margin,
  named exposure is allocation × leverage, and losses cap at margin with forced
  liquidation. Live data is explicitly out of scope (see
  `docs/levels/intro_scene.md` §8, decision D2).
- Do not wire a real LLM call for the AI coach — `src/core/data/coachLines.ts`
  is scripted template lines for one persona (班主任) only. Decision D3.
- Do not add the other 2 unplayable origins / 3 eras / 3 zones without first writing a
  new plan doc — the current scope is deliberately one scene, not a demo of
  the full system (see the intro-scene-until-perfect skill's philosophy: one
  complete scene beats many 80%-done ones).

## 3. Stack + commands

Vite 6 + React 19 + TypeScript (strict) + zustand 5. No Three.js — this is a
2D board/card UI, CSS grid + DOM is correct, WebGL would be over-engineering.
No test suite; `npx tsc -b --noEmit` + browser playtest are the verification
gates (matches `4_chunbai`/`6_patapon3D` convention). Dev server: port
**5185** (`npm run dev`), strictPort. `npm run build` = `tsc -b && vite build`.

## 4. Architecture (C.A.T)

`src/core/` is platform-pure (types, constants, data tables, simulation
functions — zero React/DOM). `src/engine/rng.ts` is the only place
`Math.random`-equivalent behavior lives (seeded `mulberry32`); core
simulation functions take `rand: () => number` as a parameter instead of
calling randomness directly, so they stay pure and swappable for tests.
`src/store.ts` (zustand) wraps `core/simulation/Simulation.ts`'s reducer
functions. `src/components/` are the React views: `CampusMap.tsx` is the
always-mounted world layer (v1.2 — replaces v1.1's Board/Cell ring),
`BeatOverlay.tsx` is the single center-overlay shell, and one beat
component per turn phase renders inside it (DiceRoller / EventModal /
InvestPanel / AICoachPanel + ParallelFateCard in the wide results card).

## 5. Known simplifications (see `docs/levels/intro_scene.md` §8 for the trace)

- eraMod frozen at 0 (Ch01-03's origin<->home-era mapping doesn't exist)
- AI-coach attribution maps dice-formula terms to the 4 canonical dimensions
  via a documented, deterministic simplification, not a real inference model
  (see `src/core/simulation/attribution.ts`'s header comment)
- dice tier `'awaken'` (13+) is an exceptional event-result tier only; player awakening and the finance-dynasty unlock require `mentor_hit`
- the explicit `不投资,保留现金` action resolves at zero exposure/P&L, never liquidates, and never earns a review credit
- arrival world events use a 55% trigger followed by a weighted draw from the breakthrough/setback table; cognition, stamina, and mood still clamp to `[0,100]`
- the 1995→2015 timeline and 17-marker seasonal track are presentation context only: they never alter market ticks, headlines, era modifiers, or advice
- weeks 14–16 are deterministic Christmas/winter beats; love requires cognition ≥60 and rounded unified wellbeing ≥70 for a good impression, but love state never affects mentor trust, awakening, unlock, or victory
- week 17 guarantees the final mentor encounter route only when the entrance was discovered; recognition remains probabilistic, and `mentor_hit` stays the sole awakening/unlock source
