# 8_lifegame - Project AGENTS.md (v3.1, intro scene only)

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
current contract v3.1). 小镇做题家 is the default origin — 生活费 ¥1,000,被本能使唤;
the 模拟盘 ¥100,000 trial fund is a SEPARATE ledger (双账本), and the 财富目标
is its 翻盘 to ¥200,000 (first pot from the paper account, not the 生活费).
Mentor recognition unlocks a playable 金融世家 restart with its own
「关系不是资产」line and a 世家-flavored event pool. The opening is a 2-step
cinematic (出身故事 → 人生目标); the love line starts at the campus welcome
party (turn 2+), runs through the semester (6+/10+ beats, Christmas reunion
by stage), and at `close` the week-17 mentor reveal says 爱人是贵人的女儿.
The office 贵人 has 4 track personas + a 好感 channel. Three city cells stay
locked at the map edge.

## 2. Scope discipline

This is a **from-scratch, intro-scene-only build** — there is no larger
implementation to extend without first re-reading `GDD.md` §2's frozen vs
data-frozen vs M2+ split. In particular:

- Do not wire a real market-data API — investing is intentionally mocked
  (`src/core/data/assets.ts`, seven deterministic 17-tick semester curves
  with 2014 pre-history price levels). Trading is a spot paper account (v2.4):
  buy/sell specific assets with per-product commission (分品种费率) and T+1;
  margin/leverage/
  liquidation were retired with the v2.4 spot model. Live data is explicitly
  out of scope (see `docs/levels/intro_scene.md` §8, decision D2).
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
- weeks 14–16 are deterministic Christmas/winter beats; the love line lives on the SEMESTER (2/6/10 injections, teaching beats outrank it) and a good impression requires cognition ≥60 and rounded unified wellbeing ≥70, but love state never affects mentor trust, awakening, unlock, or victory
- the office 贵人 hit probability is `0.9` when trusted (AI track × cognition ≥60), else `origin prob + 0.12 × mentorFavor` (cap 0.9, MENTOR_FAVOR_MAX 4); the parallel twin always uses favor 0
- week 17 guarantees the final mentor encounter route only when the entrance was discovered; recognition remains probabilistic. **v3.0 (Ch07): only a TRUSTED `mentor_hit` (AI track + cognition ≥60) is the sole 大觉醒/victory/unlock source — an untrusted hit is 中觉醒 (methodology + favor, no victory).**
- **v3.1 (Ch09): the 模拟盘 has a player-chosen 真实度** — `tradingRealism` 'novice' (免佣金 + 免 T+1 + 无策略, 最简单) / 'real' (默认, 全规则). In 真实档 each order picks a strategy: 买入持有 (default) / 均线择时 (当周内开买收卖 in-out, 趋势上行才买, 统一放大器 1.3, 认知 ≥60 解锁). Commission is per-product (`TRADING_RULES.*.feeRate`), replacing the flat 万三.

## 6. Human-readable docs (3 件套 + 可玩性)

| Doc | 职责 | 更新时机 |
|-----|------|---------|
| `GDD.md` | 设计权威(机制 / 范围 / 世界观) | 机制改 / 范围改 |
| `docs/design/01-art-direction.md` | 美术(调色 / sprite 合同 / forbidden list) | 视觉规范改 |
| `TDD.md` + `docs/levels/intro_scene.md` | 代码(数据契约 / C.A.T / 12 章节 plan) | 契约改 / 架构改 |
| `docs/playability.md` | **可玩性文档**(带 90 张截图 + `dice-roll.gif`,回答"怎么玩/好玩在哪") | 流程或截图回放改 |
| `docs/journey.md` + `verification-report.md` | 开发日志 / 验证记录 | 每次 polish 迭代 |

改代码必带改 doc,同 commit(无 drift 窗口)。截图/动图由确定性种子(0.5)经 `scripts/showcase*.mjs` / `scripts/gifs.mjs` 回放生成。
