# GDD — Stock God Simulator (股神模拟器)

Source spec: `ch04-ch05.pdf` (Ch04+05, board + core loop) and `ch01-ch02.pdf` (Ch01+02, worldview + era slices — arrived mid-build, 2026-08-09), plus `outline.pdf` (v0.3 business framework). Ch03/06 exist only as a condensed section inside `outline.pdf`; Ch07 (mentor system) + Ch09 (investment strategy library) do not exist anywhere yet. This GDD extracts what the available chapters establish and freezes the **intro scene** as the entire ship scope for this repo. See `docs/levels/intro_scene.md` for the full 12-section scope plan.

**Confirmation from `outline.pdf` (read after this scope was already chosen)**: the source material's own Q1 roadmap validation milestone is literally "1 出身 x 1 时代 x 1 段大富翁" (1 origin x 1 era x 1 board segment core-loop demo) — independently matching this repo's scope decision.

## 1. One line + why

A Monopoly-style life-and-investing sim where **who you're born as** (origin × era) silently gates which board cells you can even see. One round = one dice roll = one event = one trade = one AI reading of *why* you made that call. The thesis: "投胎差距" (birth-lottery gap) isn't a bug, it's the feature — and the game wants you to *feel* it mechanically, not just be told it.

We build **one scene** — the campus-zone opening for the underprivileged origin — because it's the only slice the source doc fully specifies with concrete numbers (dice formula, event payouts, visibility rule) and it already contains the game's sharpest "wow": three finance cells sitting right next to you, permanently greyed out, because of who your parents are.

## 2. Scope (frozen)

**Ship scope (this repo, this GDD):**
- 2 playable origins: 小镇做题家 by default; 金融世家 unlocks after mentor recognition. 城市中产/海外精英 remain data-only.
- 1 era: Web 2.0 (era modifier 0 — Ch04's dice formula references a "主角时代" (protagonist's advantageous era) bonus, but neither Ch01+02 nor Ch04+05 ever render this into a concrete origin→era lookup table, so it's treated as neutral for the intro. See `docs/levels/intro_scene.md` §8 for this assumption.)
- 1 zone: 校园区 (Campus), 8 locations (6 base + unlockable 健身房/对外交流中心); the source-doc visibility rule still keeps city content hidden
- **17-week opening calendar (v2.2)**: 13 campus-semester weeks + 3 winter-break weeks + next-semester opening. The seven market curves and headline tables have 17 explicit entries, so Christmas, cross-year, winter break, and opening never silently wrap to week 1.
- 3 locked city-zone cells rendered at the board edge (视野门 / visibility gate), non-interactive, the scene's "extreme case" — rendered as an unrevealing ❔/??? placeholder, not the real icon/label under grayscale (a real content-leak bug found in playtesting: greying out the real icon still let you see what was behind the gate, defeating "出身差看不见")
- ⚡ **世界随机事件 (v2.1, v2.3 扩池)**: every arrival has a 55% trigger chance and then a weighted draw from a **49-event pool** — market shocks (牛市/熊市/黑天鹅), cognition/body breakthroughs, setbacks, and **小镇 life surprises (v2.3): friends, family/hometown (妈妈的电话、全村的目光、家里的装修款), health, small-money first buckets, everyday luck, plus 3 rare big breaks**. Every event carries a one-line `text` so each shock reads as a story, not a stat change; the "· 无预兆" suffix shows only for true no-warning shocks (`unexpected`), while narrative daily-life events drop it. Breakthrough weights (6/6/4/4/3) keep per-trigger odds at ~7% each so growth spikes don't drown in the bigger pool. Events move cognition, stamina, mood, or wealth; high-impact gains (+20~30 cognition or +30~40 combined body/mood) make “十年没有进步,几个月超过十年” mechanically visible, while burnout/illness/market crashes preserve downside.
- 平行命运 (v1.1, "what if 金融世家" counterfactual, user's own design idea): a second lightweight trajectory for 金融世家 advances every turn using the exact same physical dice, event choice, and investment tick as the real player, resolved through a different origin's coefficients — isolates origin as the only varying input, shown turn-by-turn in a dedicated card and as the summary screen's headline comparison (replacing a purely static reference number with this session's own simulated result)
- **Real campus map + free movement (v1.2, design critique fix)**: the abstract cell ring is gone — buildings are sited on an actual campus map (宿舍 south, 图书馆 the central hub, 教学楼 east, 食堂 west, 社团中心 northwest, 贵人办公室 northeast), the locked city is a grey skyline beyond the north gate, and the player CLICKS a destination each turn (token glides over); dice no longer move the token — tiers scale what happens after you arrive
- **Per-location event tables (v1.2)**: every building has its own weighted table (opportunity ×2 / neutral ×3 / trap ×1) — the same place can hand you a break or a setback; the rolled tier scales the outcome (awaken dodges a trap / doubles a boon, big_fail fumbles a boon / worsens a trap); 贵人办公室 keeps its probability roll
- **Mood → information distortion (v1.2, design critique fix)**: the investment preview is filtered through mood on the frozen 30/60 bands — bad mood paints the market worse than it is, great mood paints it better (overconfidence), only 30–60 (rational) sees the real curve; cognition ≥ 60 narrows the distortion window. Bad mood invests badly, good mood invests badly too — anything but rational is gambling
- **Expanded simulated market (v2.2 calendar, v2.4 real trading)**: a real trading surface — 💼 **模拟盘账户** with per-origin 初始资金 (小镇做题家 ¥100,000 / 金融世家 ¥300,000), 7 products (货币基金/债券/黄金/指数基金/A股指数/港股指数/BTC) each with a **2015 price level + 40 weeks of deterministic 2014 history + 17 semester ticks**, so quotes show ¥3,203.47 (沪指) and charts never start empty. The player **buys/sells specific assets** (spot, commission 万三), positions persist across weeks with avg-cost P&L; every asset lists 风险 + 周期 selector 日K/周K/月K/半年K/年K. Margin/leverage/liquidation retired — this is a paper account, not a margin desk. Trading P&L lives in the 模拟盘 ledger, separate from life 财富; the summary reports both.
- **Explicit no-invest action (v2.1, v2.4 hold)**: `不操作,继续持有` keeps the week's positions and cash, resolves at zero order/P&L from the trade itself, and earns no review credit.
- **Choice-based life events (v2.4)**: 3 pool entries (朋友借钱/家里的装修款/刮中彩票) carry `choices` — they arrive as **人生抉择** cards shown BEFORE the location card, and the chosen option sets the wealth/mood outcome (parallel fate resolves the same option on its own base).
- **Market reacts to the world (v2.4)**: market/life events with `assetShock` (牛市→A股+4%, 熊市→A股−5%, 黑天鹅→BTC−14%, …) move the named asset's week close — 世界随机事件 now physically moves the tape, not just your wallet.
- **1995→2015 timeline (v2.2)**: a persistent historical strip starts at the protagonist's 1995 birth, reaches university/Christmas/winter break in 2014 and next-semester opening in 2015, and highlights all 17 calendar markers. It explicitly says `历史背景 ≠ 投资建议` and never changes eraMod, ticks, news, or advice.
- **Hidden line ① — 认知 → 复盘 → 试错 → 建议 (v1.6, user directive)**: investment advice is EARNED, never starting equipment — 0 reviewed trades = 「看不懂」 for everyone, so the first trade is always a blind 试错; 复盘能力 itself unlocks at cognition ≥ 60 (below it, trades teach nothing and the coach says 这笔交易没有复盘); each reviewed real trade sharpens next turn's advice (70% → 85% → 95% faithful)
- **Hidden line ② — 贵人信任 (v1.6, user directive)**: trusted = 有能力 (cognition ≥ 60) × 对口 (chose the track the FUTURE rewards — 人工智能, picked at the 职业规划课 beat on the first 教学楼 visit; 金融 is the 显学 needing no foresight, so it doesn't impress); trusted swaps the mentor hit prob 10% → 90%. Never walk into the lecture hall and this line stays invisible all game
- **Independent love line (v2.2)**: week 14 Christmas introduces a future girlfriend. Cognition ≥60 and rounded unified wellbeing `(stamina + mood) / 2` ≥70 leaves a good impression; week 16 then provides a second winter-break meeting, while a lower impression receives a hopeful dream reflection. Love never affects mentor trust, awakening, the finance-dynasty unlock, or victory.
- **Next-semester mentor opportunity (v2.2)**: week 17 guarantees the final encounter route when the mentor entrance has been discovered; recognition remains probabilistic through the existing origin/trust mechanism (trusted AI direction + cognition ≥60 = 90%). Undiscovered entrance yields an explicit blocked encounter. Only `mentor_hit` awakens/unlocks.
- **Two unified indicators (v1.7, user directive: 人能控制的只有头脑和身体)**: the HUD converges on 🧠 认知 (mind) and 💪 身心健康 (body — the display-fusion of 情绪+体力); 财富 is framed as an OUTCOME, demoted to a chip
- **健身房 💪 (v1.7)**: unlocks at the first post-开户 dorm visit (室友的健身卡 beat); the campus state-reset spot — restores 心态/体力, feeding the dice 状态加成
- **对外交流中心 🌏 (v1.7)**: unlocks at 认知 ≥ 60 (社交学习也是认知 — 情商 folds into cognition); high-risk 开拓认知 — +8~14 vs the library's +5~6, but its trap bites 认知 itself
- **Visible progression guidance (v2.0)**: the invest panel persistently states the cognition-60 review threshold, current progress, nonzero-position requirement, reviewed-trade count, and next advice band; every visible campus building carries benefit/risk chips, with fuller pre-travel guidance alongside possible events. Locked buildings reveal only their unlock condition.
- **Finance-dynasty route (v1.9)**: mentor recognition is the intro victory and unlocks a playable finance-dynasty restart. Its higher wealth/body resources are offset by the staged “关系不是资产” crisis, while the parallel trajectory switches to the opposite origin. The end-game panel makes failure legible: `尚未觉醒 · 原因` lists the missing discovery, direction, cognition-60 ability threshold, and/or mentor-recognition attempt instead of showing an unexplained binary result.
- Scripted AI coach (班主任型 persona only, template lines keyed to dice-outcome tier + dominant attribution dimension — no live LLM call; the dominant-dimension pick is categorical by cell type + an extreme-state override, not a magnitude race — see §6)
- End-of-intro summary: this run's stats + this run's simulated 平行命运 result + a static "if you'd played the full 32-round game" comparison teaser

**Data-frozen (types exist, not ship-reachable this scope):** other 2 origins (城市中产/海外精英), other 3 eras, city/overseas/special zones, real market API, live LLM coach, awakening tiers beyond 微觉醒, seasons/leaderboard, DLC.

**M2+ route (not modeled at all):** Ch07 mentor system, Ch09 investment strategy library, real money/broker integration (explicitly forbidden by source doc — "绝对不接真实券商账户"), finance-dynasty 真盘 mode (real-account trading as a playable origin — v1.3 critique #4, deferred per user decision 2026-08-10), multiplayer/leaderboard infra.

## 3. Core loop (Ch05 §5.1, transcribed)

One week = 5 steps, run across 13 campus weeks, 3 winter-break weeks, and the next-semester opening (17 turns total, v2.2):

1. **看地图,选目的地** (v1.2 free movement) — the campus map shows the 6 buildings + the grey city skyline beyond the north gate; the player clicks where to go, the token glides over, and arrival draws that building's event (then rolls the ⚡ shock).
2. **掷骰子** — `final = 2d6 + originMod(-2) + eraMod(0) + stateMod(-2..+3) + eventMod(-1..+1 from the drawn event)`. The tier no longer moves you — it scales what the event does to you. See TDD.md §3 for the exact function contract.
3. **选事件** — the drawn location event offers 2 choices (mentor auto-resolves); the tier-scaled deltas apply.
4. **做投资或保留现金** — choose one of 7 products, set posted margin and an asset-capped 1×/2×/3×/5× leverage, or use the one-click no-invest action. The result shows exposure, P&L, and forced liquidation when margin is exhausted.
5. **AI 解读** — 班主任 persona names the dominant dimension (origin/era/cognition/emotion) behind that round's numbers, Socratic not prescriptive.

## 4. "Perfect" definition (4-dim checklist — mirrors intro-scene-until-perfect §5.6)

- **Visual**: the locked-cell contrast reads as unfair within the first 5 seconds, no explanation needed.
- **Feel**: every dice roll has a distinct outcome tier (大失败/失败/成功/大成功/觉醒成功) with matching juice; losing never feels like a dead click.
- **Performance**: 60fps on a CSS-grid board (no WebGL needed — this is a card/board UI, not an action scene); cold load ≤ 1s.
- **Replayability**: same 17-turn calendar structure (13 campus + 3 winter-break + opening), different dice seed each run; end summary always lands the gap-teaser punchline (now backed by an actual simulated comparison, not just a fixed reference number).

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
