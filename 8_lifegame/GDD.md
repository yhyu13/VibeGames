# GDD — Stock God Simulator (股神模拟器)

Source spec: `ch04-ch05.pdf` (Ch04+05, board + core loop) and `ch01-ch02.pdf` (Ch01+02, worldview + era slices — arrived mid-build, 2026-08-09), plus `outline.pdf` (v0.3 business framework). Ch03/06 exist only as a condensed section inside `outline.pdf`; Ch07 (mentor system) + Ch09 (investment strategy library) do not exist anywhere yet. This GDD extracts what the available chapters establish and freezes the **intro scene** as the entire ship scope for this repo. See `docs/levels/intro_scene.md` for the full 12-section scope plan.

**Confirmation from `outline.pdf` (read after this scope was already chosen)**: the source material's own Q1 roadmap validation milestone is literally "1 出身 x 1 时代 x 1 段大富翁" (1 origin x 1 era x 1 board segment core-loop demo) — independently matching this repo's scope decision.

## 1. One line + why

A Monopoly-style life-and-investing sim where **who you're born as** (origin × era) silently gates which board cells you can even see. One round = one dice roll = one event = one trade = one AI reading of *why* you made that call. The thesis: "投胎差距" (birth-lottery gap) isn't a bug, it's the feature — and the game wants you to *feel* it mechanically, not just be told it.

We build **one scene** — the campus-zone opening for the underprivileged origin — because it's the only slice the source doc fully specifies with concrete numbers (dice formula, event payouts, visibility rule) and it already contains the game's sharpest "wow": three finance cells sitting right next to you, permanently greyed out, because of who your parents are.

## 2. Scope (frozen)

**Ship scope (this repo, this GDD):**
- 1 origin: 小镇做题家 (Town Exam-Kid, origin modifier −2)
- 1 era: Web 2.0 (era modifier 0 — Ch04's dice formula references a "主角时代" (protagonist's advantageous era) bonus, but neither Ch01+02 nor Ch04+05 ever render this into a concrete origin→era lookup table, so it's treated as neutral for the intro. See `docs/levels/intro_scene.md` §8 for this assumption.)
- 1 zone: 校园区 (Campus), 6 cells, fully visible per the source doc's origin-visibility rule ("出身差看不见的是城市区,不是校园区")
- 4 dice turns (one static, non-extending session: look at map → roll 2d6+mods → pick event → invest → AI reads)
- 3 locked city-zone cells rendered at the board edge (视野门 / visibility gate), non-interactive, the scene's "extreme case"
- Mocked investment (3 assets, deterministic price curve — no live market API)
- Scripted AI coach (班主任型 persona only, template lines keyed to dice-outcome tier + dominant attribution dimension — no live LLM call)
- End-of-intro summary: this run's stats + a static "if you'd been born 金融世家" comparison teaser

**Data-frozen (types exist, not ship-reachable this scope):** other 3 origins (城市中产/海外精英/金融世家), other 3 eras, city/overseas/special zones, real market API, live LLM coach, awakening tiers beyond 微觉醒, seasons/leaderboard, DLC.

**M2+ route (not modeled at all):** Ch07 mentor system, Ch09 investment strategy library, real money/broker integration (explicitly forbidden by source doc — "绝对不接真实券商账户"), multiplayer/leaderboard infra.

## 3. Core loop (Ch05 §5.1, transcribed)

One round = 5 steps, run 4 times for the intro:

1. **看地图** — player sees the 6 lit campus cells + 3 greyed city cells at the horizon.
2. **掷骰子** — `final = 2d6 + originMod(-2) + eraMod(0) + stateMod(-2..+3) + eventMod(-1..+2)`. See TDD.md §3 for the exact function contract.
3. **选事件** — landed cell offers 2 choices (except mentor/start cells: 1 auto-resolve).
4. **做投资** — pick 1 of 3 mocked assets, allocate a %, resolve at a scripted tick.
5. **AI 解读** — 班主任 persona names the dominant dimension (origin/era/cognition/emotion) behind that round's numbers, Socratic not prescriptive.

## 4. "Perfect" definition (4-dim checklist — mirrors intro-scene-until-perfect §5.6)

- **Visual**: the locked-cell contrast reads as unfair within the first 5 seconds, no explanation needed.
- **Feel**: every dice roll has a distinct outcome tier (大失败/失败/成功/大成功/觉醒成功) with matching juice; losing never feels like a dead click.
- **Performance**: 60fps on a CSS-grid board (no WebGL needed — this is a card/board UI, not an action scene); cold load ≤ 1s.
- **Replayability**: same 4-turn structure, different dice seed each run; end summary always lands the gap-teaser punchline.

## 5. Next document

Ch07 (贵人系统) + Ch09 (投资策略库) are referenced by the source PDF as "next" but do not exist yet. Not modeled here — tracked as M2+ in `docs/levels/intro_scene.md` §8.
