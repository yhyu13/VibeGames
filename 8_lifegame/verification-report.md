# 8_lifegame - Verification Report (intro scene v1.0)

> Date: 2026-08-09. First build — greenfield project, no prior version.

## 1. TL;DR

Intro scene implemented and verified:

- board renders 6 lit campus cells + 3 greyed/locked city cells from frame 1
  (visibility-gate "extreme case" reads immediately, no explanation needed);
- 2d6 + 4-modifier dice formula produces all 5 outcome tiers across repeated
  playtests (big_fail/fail/success/big_success/awaken all observed);
- full 5-step core loop (map -> dice -> event -> invest -> AI coach) wired
  end-to-end for 4 turns, then a summary screen with a restart button;
- typecheck + production build green;
- 6 full-session browser playtests (Python Playwright, headless chromium),
  0 console errors / 0 warnings across all 6 runs.

## 2. Automated gates

```
npx tsc -b --noEmit   -> 0 errors
npm run build          -> tsc -b && vite build, succeeded (212.76 kB JS / 68.31 kB gzip)
```

## 3. Manual browser playtest (Python Playwright, headless)

6 full 4-turn sessions run via `.playwright-mcp/playtest.py` against
`npm run dev` (port 5185). Each session: load -> roll dice x4 (with the
formula-breakdown + tier-colored panel) -> pick an event choice each turn ->
allocate + resolve a mocked investment each turn -> let the AI coach panel
finish its typed reveal -> advance -> summary screen with gap-teaser.

Result across all 6 runs: 0 console errors, 0 console warnings, summary
panel + restart button + gap-teaser bars all rendered every time.

## 4. Bugs found and fixed during the polish loop

- **Gap-teaser was too subtle**: scaling the 6.4x multiplier off a single
  4-turn session's tiny compounding (~0.5% gain) produced a nearly invisible
  ¥100,498 vs ¥103,187 comparison — undersold the game's entire thesis. Fixed
  by citing the source doc's own 32-round mid-level-player endgame numbers
  directly (¥2,085,000 vs ¥13,300,000) as a "if you kept playing" preview
  instead of a derived estimate. See `src/core/constants.ts`.
- **Micro-awakening toast never replayed**: `pendingMicroAwakening` was set
  `true` in `finishCoach` but never reset, so after the first occurrence
  React never remounted the toast `<div>` and its one-shot CSS animation
  never played again on subsequent turns. Fixed by resetting the flag in
  `startRoll` and keying the toast `<div>` on `player.turn` so each fresh
  occurrence gets a new DOM node. See `src/core/simulation/Simulation.ts`
  and `src/components/HUD.tsx`.
- **Summary screen left-aligned in empty space**: removing `<Board/>` on the
  `finished` branch left `.summary-panel` un-centered in the remaining
  `100vh`. Fixed with a `.summary-stage` flex-center wrapper.

## 5. "Perfect" checklist (GDD.md §4)

- Visual: locked-cell cold/grey vs. lit-campus warm contrast confirmed
  visible from the first screenshot, no interaction needed.
- Feel: all 5 dice tiers have distinct border/text colors + a matching coach
  line; event/invest/coach panels transition without dead ends across 6 runs.
- Performance: no WebGL, pure CSS-grid/DOM UI; build is ~68kB gzip; 0 jank
  observed in any playtest.
- Replayability: restart works, dice seed is fresh (timestamp-based) per
  session, 4-turn shape and gap-teaser punchline are consistent every run.

## 6. Post-commit fix: awaken tier was unreachable

Follow-up review (after the Part 1/2 commits) found a genuine balance bug,
not just a polish nit: the `'awaken'` dice tier (total >= 13) — the game's
intended emotional high point ("我接住了!") — was **mathematically
unreachable** on a first playthrough. Max achievable total pre-awakening
was 12 (double-six + full stamina/mood + departing the mentor cell), one
point short.

Root cause: `stateMod()` in `src/core/simulation/dice.ts` treated
"stamina>=60 OR mood>=60" as a single +1 bonus. The source doc's own stated
range for this modifier (-2~+3) only makes sense if both thresholds stack
independently (+1 each, +1 more post-awakening = +3 max) — the OR reading
caps out at +1 (or +2 with the awaken bonus, still one short).

Fix: split the OR into two independent `+= 1` checks (and correspondingly
for the <30 thresholds). Verified directly against the compiled function
with a crafted scenario (forced double-six + stamina=60 + mood=60 +
eventMod=1 from a mentor-cell departure): `total: 13, tier: "awaken"` —
confirmed reachable. Re-ran 3 more full 4-turn browser playthroughs after
the fix: 0 console errors/warnings, no regressions.

## 7. v2.3 — 小镇 life-surprise event pool (2026-08-12)

User directive: "add a lot of random surprising events for 小镇, like
friends / life / health / wealth". The ⚡ special-event pool grew from 11
world-market shocks to **49 themed events**:

- friends (室友泡面 / 高中同桌 / 社团前夜 / 忘了生日 / 背后的闲话 …)
- family & hometown — the 小镇做题家 identity (妈妈的电话 / 全村的目光 /
  家里的装修款 / 物理老师的孩子 / 期末周的乡愁 …)
- health (第一次夜跑 / 免费流感疫苗 / 连续三晚熬夜 / 视力下降 …)
- small money (一等奖学金 / 笔记卖断货 / 老师的信封 / 顺手刮中的彩票 …)
- everyday surprises (橘猫 / 免单券 / 捡到钱包 / 断网早睡 / 跑调的歌 …)
- 3 rare big breaks at weight 1 (大厂面试通知 / 小镇老房拆迁 / 报名小程序被外校借走)

Every event now carries a required one-line `text` (`SpecialEvent.text`), and
`SpecialEventBanner` renders label + story + deltas — a shock reads as a
story beat, not a stat change. `unexpected` gates the "· 无预兆" suffix to
true no-warning shocks only (market moves, sudden breakdowns; the new
narrative life events drop it). Breakthrough weights re-balanced to 6/6/4/4/3
so per-trigger odds stay ~7% each after the pool grew to 49 events.
`SPECIAL_EVENT_TRIGGER_PROB` unchanged at 0.55.

Verification: `npx tsc -b --noEmit` 0 errors, `npm run build` green
(286.48 kB JS / 94.86 kB gzip), full 17-week showcase playthrough green
with 0 console errors. Pool-level showcase pins (≥10 events, ≥1 cognition
≥20, ≥1 wellbeing ≥30, ≥1 setback) still pass on the 49-event pool.

### 7b. Presentation pass — fancy 平行命运 card + font policy (2026-08-12)

The parallel-fate comparison was a plain grey dashed list. It's now a
face-off card: gold top bar, ⚖️ heading with「同一把骰子 · 两种出身」, two
origin medallions (🧑🎓 warm campus vs 🎩 dark-and-gold 金融世家) against a
center VS badge, per-stat duel bars whose fills are proportional to each
origin's |delta| share with the winner ring glowing gold, and Georgia-serif
ledger numerals. The entrance animates (fade + rise, staggered bar grow);
the results card is unchanged in data/contract — pure presentation.

Font policy: the game stays zero-asset/zero-network (CJK fonts are multi-MB
and would break offline), so no `@font-face`. `body` now declares the best
Chinese system face per OS (`PingFang SC → HarmonyOS Sans SC / MiSans →
Microsoft YaHei → Noto Sans CJK SC`), and ledger numbers use a serif stack.
Fate-card copy asserted by the showcase (`.fate-investment-context` 敞口/×
labels) is unchanged.

**Self-critique pass (2026-08-12):** three follow-up fixes —
(1) medallion STYLE was bound to the you/alt seat, so a 金融世家 run showed
the gold face on the 小镇做题家 alt and vice versa; classes are now
origin-bound (`fate-medallion-town` warm / `fate-medallion-dynasty`
dark-gold) and verified on both runs. (2) the「投胎」callout only rendered
when tiers differed — on same-tier turns the card lost its punchline; it now
ALWAYS lands, switching to「同样的骰子,同样的手气 —— 本金不同,结果已经不同。」
with a slate `fate-callout-flat` variant when tiers match. (3) added
`-webkit-font-smoothing: antialiased` for consistent CJK rendering.

## 8. v2.4 — real trading + choice-based life events (2026-08-12)

User directives: 模拟盘没有初始资金 / 没法买卖具体资产 / 交易面板要像交易面板 /
数据要有 2014 历史 + 周期切换。

**模拟盘 (paper account):** per-origin initial capital (小镇 ¥100,000 /
世家 ¥300,000); spot **buy/sell of specific assets** with persistent
positions (avg-cost basis, unrealized + realized P&L); commission 万三;
margin/leverage/liquidation retired. Trading P&L lives in the paper ledger,
separate from 财富; the summary reports both.

**Real price levels + history:** every asset has a 2015-semester-open price
(沪指 ¥3,203.47, 恒指 ¥24,477.66, BTC ¥2,389.03, 黄金 ¥234.62 …) plus 40
deterministic 2014-plausible weekly returns and a 5-per-week daily series.
Charts show 2014 tape from turn 1, with a **K线周期 selector 日K/周K/月K/
半年K/年K** (day = raw daily tape; coarse frames aggregate the distorted
weekly). World events with `assetShock` move a named asset's week close
(牛市→A股+4% etc.), and 3 events became **人生抉择** choice cards shown before
the location card.

**Verification:** `npx tsc -b --noEmit` 0 errors; `npm run build` green
(298.11 kB JS / 98.45 kB gzip); 17-week showcase green with 0 console
errors — order-model pins (priceAt/executeOrder/resolveOrder/accountValue/
asset shock/choice events/K-line frames) all pass; isolated-Chromium visual
check confirmed the 人生抉择 card, trading panel, holdings, and all five
K-line frames. A hooks-order bug in EventModal (early return skipped a hook)
was caught by that check and fixed.

## 9. v2.5 — 人生目标 + 爱情线前移 + 贵人多元化 + 世家事件池 (2026-08-13)

User directives: judge finish for intro scene / finish 金融世家 gameplay /
polish 小镇做题家 first-5-minutes drama + visual / enhance 贵人 diversity +
move the love first-encounter to campus entry with love & wealth life goals.

**JUDGE FINISH — verdict: 机制完成,叙事与出身差异化已补齐。** The v2.4
surface was mechanically complete (17-week calendar, spot paper trading,
parallel fate, awakening diagnosis) but weak in the first 5 minutes and
wrong-headed for 金融世家 runs. v2.5 closes exactly those gaps:

- **人生目标 (opening cinematic)**: the single 出身定型 card became a 2-step
  movie — 出身故事 (小镇做题家: 高考/绿皮火车/全村的灯; 世家: 季度汇报会/
  后街的车) → 人生目标 (财富 ¥150,000/¥400,000 + 爱情目标). HUD shows a 🎯
  progress chip and a ❤️ stage chip; the summary renders 达成/进行中 verdicts
  for both goals. DOM-verified via `scripts/verify-v25-dom.mjs`.
- **爱情线前移**: first encounter now happens ON CAMPUS — 迎新晚会 (turn 2+)
  → 期中图书馆 (6+) → 期末跨年邀约 (10+, accept → `close`). Teaching beats
  outrank love (playthrough lands 初遇 at t4 after the t2/t3 forced beats);
  Christmas title/text adapts to the stage; week-16 reunion opens on a good
  impression OR `close`. Love still never touches awakening/unlock.
- **贵人多元化**: the office has 4 personas by 方向 (AI 技术前辈/券商经理/
  厂长/退休经济学教授) + a 贵人好感 channel — 5 town story events at +1 each
  raise the base hit prob by 0.12/point (trusted 90% unchanged, twin favor 0).
- **金融世家完成度**: dynasty runs now draw a 16-event 家族 pool (季度汇报会/
  信托分红/董事会/名媛圈/继承人之争/父亲住院/校门口的车…) instead of 小镇's
  hometown/small-money slices; market/friends/health shared; summary +
  FinanceDynastyChoice show relationship trust.

**Verification:** `npx tsc -b --noEmit` 0 errors; `npm run build` green
(316.48 kB JS / 104.88 kB gzip); showcase green with 0 console errors —
new pins (love turn thresholds/stage progression/turn-2 forced beat/
shouldReunite/christmasContext/mentorHitProbFor persona titles/life-goal
values/dynasty pool ≥30 with `dy_*`/town pool ≥49 with favor events) all
pass; the week-13 relationship-closure pins survived the new injection
priority (seasonal > week-13 closure > teaching > relationship > love >
table); `verify-v25-dom.mjs` DOM pass green (opening cinematic, goals card,
HUD chips, love badge + stage, summary verdicts 进行中/达成). A
PowerShell-5.1 `Set-Content -Encoding UTF8` mishap corrupted
locationEvents.ts mid-pass — restored from git and re-applied with the
UTF-8-safe edit tool (lesson: never write CJK files through PS5.1 cmdlets).

**Self-critique pass (2026-08-13, same session) — 8 defects found, all fixed:**

1. `showOpening` gate used `openingStep >= 0` (always true) — the turn-1
   map-hint never rendered. Fixed to `openingStep < 2`; pinned in the
   dynasty playthrough's hint check.
2. 贵人好感 was mechanically applied but invisible — SpecialEventBanner now
   shows `👁 贵人好感 +1`, the HUD shows a favor chip when > 0 (both pinned
   in verify-v25-dom).
3. No full 金融世家 browser playthrough existed — new
   `scripts/showcase-dynasty.mjs` plays all 17 weeks as 金融世家: dynasty
   opening story + goals card, 3 relationship beats (听/承认/坦白 → trust
   50→92, resolved) with the new 世家关系线 badge, 3 love beats with the
   爱情支线 badge, dynasty special pool never serving a town-only event,
   stage-adapted Christmas, winter reunion on `close`, week-17 mentor
   persona, dynasty-labeled summary bars + goals + trust copy. 0 console
   errors.
4. Single-seed testing — new `scripts/smoke-seeds.mjs` runs 3 seeds
   (mulberry32 1/42/999) × 17 weeks end-to-end, 0 console errors each.
5. The showcase loop assumed no 人生抉择 card interrupts the location card —
   loop now resolves `.event-panel-special` first (both playthroughs).
6. winter_reunion badge used 🎄 for 寒假 — now ❄️.
7. 迎新晚会 beat attributed to 出身 (`cellType: 'special'`) — the coach read
   an origin line at a party; now `rest` → 情绪.
8. WINTER_REUNION text credited "圣诞夜的好印象" even for close-stage runs —
   now stage-neutral. Plus: relationship beats gained visual identity
   (dark-gold 世家关系线 badge), HUD side became a 2-column grid, love chip
   `close` label softened 相守 → 并肩, `mulberry32` exposed on the DEV
   `__sim` hook for seed tests, and a deterministic favor pin
   (chooseSpecialChoice clamp at MENTOR_FAVOR_MAX) joined the contract.

**Second self-critique pass (same session, post-push) — 4 more defects, all fixed:**

9. `christmasContext('met')` claimed "已经见过两面" — 'met' means only the
   welcome party played (one meeting). Text now: "一直没有机会好好说话…
   这一次,你终于鼓起勇气走过去".
10. Story beats rendered the destination prefix ("宿舍 · 迎新晚会", "食堂 ·
    世家关系线 · 1/3") — beats are location-INDEPENDENT fiction, so
    badge-carrying cards now drop the cell label entirely (pinned in
    verify-v25-dom).
11. Goal progress was absolute (town started at a misleading 67%: 100k/150k).
    Now net-of-start via `lifeGoalProgressFor` (town ¥50k to earn / dynasty
    ¥100k) — 0% at the start line, 100% at the goal; opening card copy,
    HUD chip, and summary verdict text all reframed ("已挣出 ¥30,000 /
    ¥50,000 (60%)"). Pinned (5 progress pins) in showcase.
12. HUD 5-chip side stack crowded narrow screens — single column + wrap
    under 820px.

All gates re-run green: tsc 0, build green, showcase (town), showcase-dynasty
(金融世家 17w), smoke-seeds (3 seeds), verify-v25-dom (now also asserting the
beat-card heading and the HUD 初识 chip).
