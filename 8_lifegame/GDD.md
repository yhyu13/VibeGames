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
- 8 dice turns (v1.1, up from 4 — playtesting found 4 turns too short to feel the swing of fortune; 8 also exactly fills the mocked market's 8-tick price curve with no repeats)
- 3 locked city-zone cells rendered at the board edge (视野门 / visibility gate), non-interactive, the scene's "extreme case" — rendered as an unrevealing ❔/??? placeholder, not the real icon/label under grayscale (a real content-leak bug found in playtesting: greying out the real icon still let you see what was behind the gate, defeating "出身差看不见")
- ⚡ 特殊事件 (v1.1, Ch04 §4.4: 牛市/熊市/政策/黑天鹅, "无预兆"): a 20%/turn chance of a ±15~30% wealth + ±5~20 mood shock, independent of which cell you land on — added because 4 (then 8) turns of only dice-tier-driven outcomes read as too even-keeled ("mediocre life" per playtest feedback); the dice tiers govern pace, this governs shock
- 平行命运 (v1.1, "what if 金融世家" counterfactual, user's own design idea): a second lightweight trajectory for 金融世家 advances every turn using the exact same physical dice, event choice, and investment tick as the real player, resolved through a different origin's coefficients — isolates origin as the only varying input, shown turn-by-turn in a dedicated card and as the summary screen's headline comparison (replacing a purely static reference number with this session's own simulated result)
- **Real campus map + free movement (v1.2, design critique fix)**: the abstract cell ring is gone — buildings are sited on an actual campus map (宿舍 south, 图书馆 the central hub, 教学楼 east, 食堂 west, 社团中心 northwest, 贵人办公室 northeast), the locked city is a grey skyline beyond the north gate, and the player CLICKS a destination each turn (token glides over); dice no longer move the token — tiers scale what happens after you arrive
- **Per-location event tables (v1.2)**: every building has its own weighted table (opportunity ×2 / neutral ×3 / trap ×1) — the same place can hand you a break or a setback; the rolled tier scales the outcome (awaken dodges a trap / doubles a boon, big_fail fumbles a boon / worsens a trap); 贵人办公室 keeps its probability roll
- **Mood → information distortion (v1.2, design critique fix)**: the investment preview is filtered through mood on the frozen 30/60 bands — bad mood paints the market worse than it is, great mood paints it better (overconfidence), only 30–60 (rational) sees the real curve; cognition ≥ 60 narrows the distortion window. Bad mood invests badly, good mood invests badly too — anything but rational is gambling
- Mocked investment (3 assets, deterministic price curve — no live market API)
- Scripted AI coach (班主任型 persona only, template lines keyed to dice-outcome tier + dominant attribution dimension — no live LLM call; the dominant-dimension pick is categorical by cell type + an extreme-state override, not a magnitude race — see §6)
- End-of-intro summary: this run's stats + this run's simulated 平行命运 result + a static "if you'd played the full 32-round game" comparison teaser

**Data-frozen (types exist, not ship-reachable this scope):** other 3 origins (城市中产/海外精英/金融世家), other 3 eras, city/overseas/special zones, real market API, live LLM coach, awakening tiers beyond 微觉醒, seasons/leaderboard, DLC.

**M2+ route (not modeled at all):** Ch07 mentor system, Ch09 investment strategy library, real money/broker integration (explicitly forbidden by source doc — "绝对不接真实券商账户"), multiplayer/leaderboard infra.

## 3. Core loop (Ch05 §5.1, transcribed)

One round = 5 steps, run 8 times for the intro (v1.1 — was 4; see §2):

1. **看地图,选目的地** (v1.2 free movement) — the campus map shows the 6 buildings + the grey city skyline beyond the north gate; the player clicks where to go, the token glides over, and arrival draws that building's event (then rolls the ⚡ shock).
2. **掷骰子** — `final = 2d6 + originMod(-2) + eraMod(0) + stateMod(-2..+3) + eventMod(-1..+1 from the drawn event)`. The tier no longer moves you — it scales what the event does to you. See TDD.md §3 for the exact function contract.
3. **选事件** — the drawn location event offers 2 choices (mentor auto-resolves); the tier-scaled deltas apply.
4. **做投资** — pick 1 of 3 mocked assets, allocate a %, resolve at a scripted tick.
5. **AI 解读** — 班主任 persona names the dominant dimension (origin/era/cognition/emotion) behind that round's numbers, Socratic not prescriptive.

## 4. "Perfect" definition (4-dim checklist — mirrors intro-scene-until-perfect §5.6)

- **Visual**: the locked-cell contrast reads as unfair within the first 5 seconds, no explanation needed.
- **Feel**: every dice roll has a distinct outcome tier (大失败/失败/成功/大成功/觉醒成功) with matching juice; losing never feels like a dead click.
- **Performance**: 60fps on a CSS-grid board (no WebGL needed — this is a card/board UI, not an action scene); cold load ≤ 1s.
- **Replayability**: same 8-turn structure, different dice seed each run; end summary always lands the gap-teaser punchline (now backed by an actual simulated comparison, not just a fixed reference number).

## 5. Next document

Ch07 (贵人系统) + Ch09 (投资策略库) are referenced by the source PDF as "next" but do not exist yet. Not modeled here — tracked as M2+ in `docs/levels/intro_scene.md` §8.

## 6. Playtest-driven fixes (v1.1, real bugs the doc alone couldn't have caught)

Several issues only surfaced once the scene was actually played, not just read:

- **The 'awaken' tier was mathematically unreachable.** stateMod treated "stamina>=60 OR mood>=60"
  as a single +1, capping the max pre-awakening dice total at 12 — one short of the 13+ the
  tier needs. The source doc's own stated range (stateMod: -2~+3) only makes sense if both
  thresholds stack independently; fixed, verified against the compiled function with a crafted
  scenario (forced double-six + full stamina/mood + a mentor-cell departure → total 13, tier
  'awaken').
- **The AI coach's 4D attribution bar only ever showed 出身.** originMod is a *constant* -2 (only
  one origin is playable), while the other three dice-formula terms are usually 0 or small — so
  a magnitude comparison had origin winning almost every roll by construction, not because origin
  actually drove that turn's outcome. Redesigned to attribute categorically by what happened that
  turn (learning cell → 认知, work cell → 出身, rest cell → 情绪, mentor catch → 认知 /
  mentor miss → 出身), with an extreme-stamina/mood override to 情绪 regardless of cell type.
- **A CSS transform conflict silently fought the current-cell highlight.** The cell's position
  (`translate`) and the current-cell highlight (`scale(1.08) !important`) were two separate
  `transform` declarations on the same element — CSS doesn't merge them, one fully replaces the
  other, so the highlighted cell would have snapped to the ring's center. Fixed by composing both
  into one inline `transform` string per cell.
- **Locked city cells revealed their contents under grayscale.** Visually "greyed out" still
  showed the real icon and label — defeating the whole "出身差看不见" premise. Fixed to render a
  mystery placeholder (❔/???) instead of the real cell data.

See `verification-report.md` for the full chronological account, `docs/levels/intro_scene.md` §8
for the corresponding decision-point entries, and `TDD.md`'s changelog for the v1.1 contract diff.
