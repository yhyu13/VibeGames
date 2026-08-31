# 8_lifegame - Verification Report (intro scene v2.13)

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

## 12. v2.6 — 贫困逻辑 + 认知引擎 + 贵人女儿 (2026-08-14)

User critique: "怎么可能有 10w 起始? 起始 1k 块最多了,模拟盘 10w" + canonical
arc "模拟盘亏到 5w → 翻盘 20w → 遇到贵人,发现爱人是贵人女儿".

**Rework (design 11 / TDD v2.6 / D22):**

- **双账本分离**: 生活财富 = 生活费 (小镇 ¥1,000, `START_WEALTH`); 模拟盘 =
  试炼场初始资金 (小镇 ¥100,000 / 世家 ¥300,000, `PAPER_INITIAL_CAPITAL`)。
  顺带修复潜伏 bug: v2.4 的 `createPaperAccount(start.wealth)` 让模拟盘初始
  资金派生自生活财富 —— 若直接改 START_WEALTH 会把纸盘缩成 ¥1,000。
- **财富目标 = 模拟盘翻盘**: `paperGoal` 小镇 ¥200,000 / 世家 ¥500,000 取代
  `lifeGoalWealth`; HUD 🎯 chip 与总结 verdict 读纸盘市值; `paperGoalProgressFor`
  净口径,深坑 clamp 0%(5 万深坑读作进度地板)。总结: "已翻盘 ¥X / ¥100,000 (Y%)"。
- **小镇小钱 flat 金额**: `wealthFlat`(奖学金 ¥2,000 / 彩票 ¥50 / 装修款 −¥500);
  拆迁改纯心态+认知(爸妈的钱不是你的钱)。
- **认知引擎保证化**: 投资宝典织入图书馆发现拍(+2 认知),心理学书织入期中爱情拍
  (认知 3→4),爱人接住情绪 = 爱情三拍;复盘未解锁时交易面板点名新手三坑。
- **贵人女儿 twist**: 爱情 `close` → 第 17 周贵人正文追加 "我女儿说,迎新晚会上
  认识了个挺有意思的人" —— 纯叙事,认可概率不动(pin: close 有 reveal / none 无)。

**Verification:** tsc 0 / build green (319.37 kB JS / 106.08 kB gzip) /
showcase green (双账本 pins: 生活 ¥1,000 + 纸盘 ¥100,000/¥300,000, paperGoal
pins ×2, paperGoalProgressFor pins ×5, reveal pins ×2, flat-amount +2000 pin,
17-week playthrough 0 console errors) / showcase-dynasty green (¥500,000 goal) /
smoke-seeds 3×17w green / verify-v25-dom green (¥1,000 + ¥200,000 opening copy,
paper 150k → 50% summary, 翻盘 chip). `shot` helper now retries transient
Windows file locks (UNKNOWN/EPERM from indexer/viewer).

## 10. v2.5.1 — 收尾 polish pass (2026-08-13, same session)

Post-v2.5 无限 polish loop 的一次收尾观察(全量源码复读 + DOM 校验),发现并修复 3 处遗留:

1. **AI 教练 persona 表情错误**: `.coach-persona` 用 🏚️(破败房屋)标注"班主任"—— 教师人设配了危房图标,明显是 🏫/🧑🏫 的错版。改为 🧑🏫(教师,与既有 🧑🎓 学生 emoji 一致)。
2. **docs/journey.md 文档漂移**: 该 note 仍写着"特殊事件池是纯被动冲击,没有选择权",但 v2.4 已加入 3 个带选项的人生抉择事件。已改写为"已解决 (v2.4)"。
3. **JSX 换行对齐**: IntroScene summary 分支 `<div className="summary-stage">` 后跟 `<SummaryScreen>` 挤在同一行,已换行(纯空白)。

另删除临时诊断脚本 scripts/_diag.mjs。

Verification: tsc 0 / build green (317.50 kB JS · 105.21 kB gzip) / showcase (town) + showcase-dynasty (金融世家 17w) + smoke-seeds (3 seeds) + verify-v25-dom 全绿,0 console errors。

## 11. v2.5.1 — 可玩性文档 + 动图 (2026-08-13, same session)

新增 `docs/playability.md`(12 节中文可玩性文档,嵌入 `showcase/` 目录 90 张确定性回放截图 + 1 张动图),回答"这游戏怎么玩、每一步看到什么、好玩在哪":

- **结构**: §1 核心循环(5 步)→ §2 开场电影(2 步)→ §3 校园地图 → §4 骰子(核心 juice)→ §5 事件/人生抉择 → §6 模拟盘交易+K线 → §7 AI 教练+平行命运 → §8 三条隐藏线 → §9 两种出身对比表 → §10 结局 → §11 截图索引 → §12 动图。
- **动图 `showcase/dice-roll.gif`**(708 KB, 51 帧 @ 20fps): 由 `scripts/gifs.mjs` 用 Playwright `recordVideo` 录 `dice.webm`(比逐帧截图快 ~6×,且 30fps 原生平滑),再 ffmpeg 两段式 palette 合成。首版逐帧截图只到 3.4 fps 太卡,已弃用。骰子起点偏移由脚本打印(`dice-start offset ~1542ms`),`-ss` 精确裁剪掉导航前导。
- **门内验证**: 动图由固定种子(0.5)+ `big_success`(骰 5+6,总 10)驱动,完整覆盖「减速翻滚 → 第 1/2 颗先后锁停 → 公式逐项打字 → ✦ 大成功爆粒子」。

Verification: tsc 0 / build green / showcase (town) + showcase-dynasty (金融世家 17w) + smoke-seeds (3 seeds) + verify-v25-dom 全绿,0 console errors。

## 12. v2.5.2 — 动画手感精修 (2026-08-13, same session)

一次 5 镜头 Workflow 手感审计(视觉 / 节奏 / 反馈 / 一致性 / 可及性)产出 21 条发现,逐条对照源码验证全部属实后分两批落地 —— 目标是把 intro scene 的手感动效从「能用」推到「带感」。改 5 个文件(4 组件 + styles.css)。

**骰子 (DiceRoller.tsx + styles.css)**
1. 翻滚晃动与减速同步: 新增 `rollDur(f)` 把 `die-tumble` 周期随帧数从 120ms 拉伸到 440ms,骰面的物理晃动和数字减速一起"慢下来",而非只有数字在停。
2. 公式逐项打字 65ms → 120ms: 对齐美术文档「120ms/项」,6 项 + 总和第 7 拍不再"机枪连发"。
3. 判定爆裂方向修正: `dice-particle` 由「内爆」改「爆裂」(`--dx/--dy` 自定义属性 + `particle-fly` from→to 翻转),大成功粒子向外喷而非向内缩。
4. 失败判定不再消失: `verdict-shake` 拆开 0%/100% 关键帧,失败(✕)面板淡入后定格可见,不再"闪一下就没"。

**AI 教练 (AICoachPanel.tsx + styles.css)**
5. 打字机重写为双 effect: 中文是整词,旧 18ms/字读成"机关枪";现 40ms/字 + 标点后 260ms 换气,让每个分句落地后才出归因。
6. 归因条逐个入列: 4 条 `attribution-fill` 从 `transition` 改为 `attrib-grow` 动画 + `animation-delay: i*90ms` 从左到右依次长出来;`coach-hint`/按钮以 `coach-reveal` 240ms 淡入(按钮 360ms 延迟,避免抢跑)。

**HUD (HUD.tsx)**
7. 🎯 目标进度与 💰 同步跳动: `goalPct` 改由 count-up 的 `Math.round(wealth)` 推导,目标芯片跟钱数字同拍,不再抢先 400ms ease。

**开场电影 (IntroScene.tsx + styles.css)**
8. 卡间退出动效: 新增 `leaving` 状态 + `goNext`(160ms `opening-exit` 上移+淡出)再切 step,两张开场卡从"瞬间硬切"变"交叉淡出"。

**收尾 (styles.css)**
9. 汇总 / 流程节奏统一: `.gap-bar` 500→400ms、`.summary-goal-fill` 700→400ms、`.review-skill-track span` 250→400ms。
10. 交互反馈补齐: `.btn:active` 按压缩放 + `.btn:focus-visible` 焦点描边、`.invest-row` hover/focus 过渡、按钮组 / `.season-context` 颜色过渡、`.map-hint` / `.beat-backdrop` / `.hud-goal` 入场动效。
11. `prefers-reduced-motion` 归一: 合并散落的两段 reduced-motion 规则为一段,覆盖所有新增动画选择器,动画减少偏好用户零动效。

Verification: tsc 0 / build green (318.02 kB JS · 105.42 kB gzip) / verify-v25-dom 全绿 / smoke-seeds (3 seeds × 17 weeks, summary every run, 0 console errors) 全绿。

## 13. v2.6 — 贫困逻辑 polish 收尾 (2026-08-14)

v2.6 由 yhyu13 落地(双账本分离、模拟盘翻盘目标、认知引擎、贵人女儿 reveal),设计契约另见
`docs/design/11-v2.6-poverty-logic-cognition-engine.md`。本次在 v2.6 之上做一轮运行时观察
(DOM 溢出测量 + 全量源码复读),发现并修复 4 处遗留:

1. **summary 平行命运条横向溢出(真 bug)**: 旧 `gap-bar-dynasty` 宽度公式 `100 + wealthGap/100`
   (clamp 20..150)在 ¥1,000 生活费基数下,¥299,000 的财富差把条宽顶到 150%,配合
   `.gap-bar { white-space: nowrap }`,标签「金融世家: ¥300,000 (多 ¥299,000)」溢出 640px 面板
   (sw=893 > cw=638)。改为按较大财富等比缩放两条(`youGapPct`/`altGapPct`,`max(8, round(x/maxWealth*100))`):
   ¥1,000 基数仍是可见细条,且任一条永不超过 100%。同时修正了旧公式「你是满条、对方 150%」的失真 ——
   现在小镇玩家 = 8% 细条 vs 世家 100% 满条,与第二个「完整局参考」teaser 的等比缩放(15.7% vs 100%)一致。
   sw/cw 回落到 638/638,溢出探针返回 `[]`。
2. **Simulation.ts:179 过期注释**: 仍写「人生目标 (lifeGoalWealth)」,v2.6 已改名 `paperGoal`,更正为
   「(paperGoal, set below)」。
3. **文案标点一致性**: v2.6 新增的两条 `season-context` 提示(「新学期开学」「寒假」)误用全角逗号「,」,
   而全文件其余均为半角「,」,统一为半角;另 `¥1,000,模拟盘` 的千分位逗号与并列逗号撞车(视觉上
   「1,000,模拟」),改用顿号 `¥1,000、模拟盘` 消除歧义。
4. **HUD 财富芯片 tooltip 术语漂移**: 工具提示写「人生目标 · 模拟盘翻盘」,但「人生目标」是开场卡整卡
   标题(内含财富目标 + 爱情目标),财富芯片应沿用开场/汇总的「财富目标」—— 改为「财富目标 · 模拟盘翻盘」。

Verification: tsc 0 / build green (319.43 kB JS · 106.09 kB gzip) / smoke-seeds (3 seeds × 17 weeks,
summary every run, 0 console errors) 全绿 / verify-v25-dom 全绿 / showcase-dynasty (金融世家 17w) 全绿 /
溢出探针 `[]`(summary-panel sw=638 cw=638,无横向溢出)。

## 14. v2.6 无限 polish — 7 镜头审计 + 术语/出身一致性/可及性 收尾 (2026-08-14, 本次会话)

一次 7 镜头 Workflow 代码审计(视觉 / 手感 / 节奏 / 一致性 / 可及性 / 死代码 / 文档)产出 38 条发现,
逐条对照源码 + 对抗验证后 **35 条确认 / 3 条驳回**(驳回的是「全角标点 → 半角」转换建议 —— 中文全角
标点 ，。、 是排版正确,非缺陷)。全部确认项落地,纯 polish、无逻辑 bug。

**gap-bar 标签解耦(真 bug,§13 宽度公式的补完)**: §13 把条宽公式改为 `youGapPct`/`altGapPct` 等比
缩放,但标签文字仍嵌在 `.gap-bar` 内部(`white-space: nowrap`),当标签比条宽长时(如小镇「¥1,000 vs
¥300,000」)仍会横向溢出。本次把标签拆成兄弟节点 `.gap-bar-label`,`.gap-bar` 退化为纯填充色块 ——
填充宽 = 条宽,标签永不与条冲突,溢出探针 `[]` 稳定。

**术语归一**(canonical = 生活费 / 模拟盘):
- 「财富」→「生活费」: cells.ts / locationEvents.ts / relationshipEvents.ts / EventModal /
  SpecialEventBanner / ParallelFateCard(DuelBar label)等 6 处;
- 「模拟户」/「模拟盘账户」/「纸面上」→「模拟盘」: locationEvents.ts、InvestPanel、AICoachPanel、
  SummaryScreen verdict、design/11 同步;
- 「身心状态」→「身心健康」: SummaryScreen 两处(与 HUD 双表盘术语一致)。

**出身一致性**(v2.6 贫困逻辑的遗留硬编码):
- SummaryScreen verdict 的 `lifeStart` 与「先亏到 5 万」drawdown 提示按 origin 分支(世家 ¥300,000
  起点 / 「先亏到本金近半」,不再对世家硬编码 ¥1,000 / 5 万);
- HUD 💰 tooltip 标题按 origin 写「世家 ¥300,000 / 小镇 ¥1,000」,并点明「大钱的故事在模拟盘上」。

**标点 / 去重**: 中文破折号前补空格(「数字 —— 本能」「手都在抖 —— 机会」)、开场卡目标文案补括号
前空格 + 删掉重复句「你从来没见过这么大的数字」。

**可及性**: 校园地图 `role="group"`、学期轨道 `role="group"`、timeline `aria-label`、解锁建筑
`aria-disabled` + `aria-label`、事件面板 `role="status"`、表盘 emoji `aria-hidden`、新增
`.building`/`.chart-frame-button`/`.trade-mode-button`/`.quick-pct-button` 的 `:focus-visible` 描边、
`prefers-reduced-motion` 补齐 `.opening-cinematic-leaving`/`.coach-hint`/`.coach-panel>.btn` 动画
开关 + `.summary-goal-fill`/`.gap-bar`/`.review-skill-track span` 的 `transition:none`。

**死 CSS + 重复选择器**: 删除 `.invest-heading`、`.invest-result-liquidated`;合并 7 处重复选择器
(`.campus-map` 的 perspective/isolation、`.campus-paths line` 的 drop-shadow、`.building` 的基础
box-shadow 折入 v1.2 块;v1.8 的 rotateX/hover-lift/token drop-shadow 均为已被覆盖的死属性,直接删)。

**测试同步**: 3 处 `.gap-bar` 标签断言更新为 `.gap-bar-label`(showcase.mjs ×2 + showcase-dynasty.mjs),
1 处 showcase.mjs 解锁建筑点击改 `force: true`(解锁建筑现在带 `aria-disabled`,Playwright 视为不可点,
但该测试的意图正是「点击锁定建筑是 no-op」,force 跳过可及性门保留回归断言)。

**用户可读 doc 同步**: docs/playability.md 三处 v2.6 漂移(§2 目标 ¥150,000/¥400,000 → 模拟盘翻盘
¥100,000→¥200,000 / ¥300,000→¥500,000;§9 出身表「开局财富」拆成 生活费 + 模拟盘初始 两行;§10
「财富目标」→「模拟盘翻盘目标」);design/11 达成文案「纸面上」→「模拟盘上」。

Verification: tsc 0 / build green / smoke-seeds (3 seeds × 17 weeks, summary every run, 0 console
errors) 全绿 / verify-v25-dom 全绿 / showcase (小镇 17w) 全绿 / showcase-dynasty (金融世家 17w) 全绿。

## 15. v2.8.1 全天 polish — design 14 (2026-08-15, 本次会话)

按 docs/design/14-polish-day-plan.md 的 8-phase 全天计划自动执行(不提问),在 v2.8(渐进投资引导 +
贵人去固定化)之上做 intro scene 的视觉/手感/叙事/正确性/可及性收尾。全部纯 polish,无逻辑 bug,
种子确定性契约未动。

**视觉**: 涨跌方向统一 A股红涨绿跌 —— 新增 `.quote-up { color: var(--loss) }` / `.quote-down
{ color: var(--gain) }` 对齐 `InvestPanel` 的 `quote-${change}`(此前 quote 方向与行情色反了);
对比度扫尾 #888/#777 → #666(12 处);tier/觉醒/占优文本压暗到 WCAG AA(`.tier-text-big_success`
→ #1f6e42、`.tier-text-awaken` → #8a6a1f 且 glow 0.6→0.35、`.attribution-dominant`/`.fate-callout`
→ #9a4a1f)。

**手感**: 原生 `disabled` 按钮三态 —— `.btn:disabled`(cursor/opacity/shadow)+ `.trade-mode-button
:disabled` + `.quick-pct-button:disabled`(InvestPanel 的 trade-mode/slider/quick-pct 改为真实
`disabled`,不再只 `aria-disabled`);`:focus-visible` 轮廓 + `.rule-hint-dismiss:active` 按压态。

**叙事**: 导师第一课文案重写(「别一上来就碰股票…先把波动看懂」+ 三人行必有贵人主题贯通);
新增 `DYNASTY_GUIDANCE_TEXT`(世家引导文案);locationEvents/specialEvents 全角标点规范化
(Node 安全规则,保 `¥8,000` 千分位)。

**正确性**: `formatYuan` 负号前移(−¥N,永不 ¥−N);assets 注释日期 2015-spring → 2014-fall。

**可及性**: BeatOverlay 焦点管理(tabIndex=-1 + 打开时聚焦);AICoachPanel `prefers-reduced-motion`
跳过打字机;EventModal/InvestPanel 装饰 emoji `aria-hidden`;语义标题(event-heading/coach-persona/
fate-heading `role=heading aria-level=2`);ParallelFateCard DuelBar 行身份 `aria-label`(你·X / 世家)。

**文档一致性**: TDD.md §4 投资模型 v2.2 保证金 → v2.4 现货订单(v2.4 已弃用 margin/leverage,
§4 文本滞后);§4 事件池 51 → 60 小镇池;GameState 字段数 37 → 38(docs/journey.md、
docs/design/13);新增 TDD.md v2.8.1 changelog。

Verification: tsc 0 / build green (332.81 kB JS · 110.35 kB gzip) / smoke-seeds (3 seeds × 17
weeks, summary every run, 0 console errors) 全绿 / verify-v25-dom 全绿 / showcase (小镇 17w) 全绿
/ showcase-dynasty (金融世家 17w) 全绿 / observe-runtime (overflow/NaN/edge/console clean) 全绿。

## 16. v2.9 全天 polish Day 2 — design 15 (性能/手感/可及性实测, 2026-08-15, 本次会话)

按 docs/design/15-perf-feel-day2.md 的 8-phase 全天计划自动执行。Day 1(design 14)已把 intro
scene 推到"完美"4 维(视觉/手感/性能/可重玩)达标,但**性能**与**键盘手感**两维从未实测(observe-runtime
只查 overflow/NaN/console,不测 fps/启动;键盘从未纯键盘走过全程)。Day 2 补上这两块硬缺口,并把
可重玩从 3 种子扩到 10 种子、视觉从肉眼扫尾升级为系统化 computed 对比度审计。**全部纯 polish +
探针基建,无逻辑 bug,种子确定性契约未动。**

**新增 4 个永久探针脚本**(`scripts/`,经 `npm exec --offline --yes --package=playwright -- node scripts/X.mjs` 运行):

| 脚本 | 测什么 | 门(硬失败条件) |
|---|---|---|
| `perf-probe.mjs` | 启动耗时 + rAF 帧间隔 + >50ms 长任务 | startup ≤1s; 骰子窗 p95 帧间隔 ≤ max(33.4ms, idle 基线 ×1.25); 0 个 >50ms longtask |
| `keyboard-probe.mjs` | 纯键盘(Tab/Enter/箭头)走完 8 个 beat | 任一 beat 不可达或滑块箭头键失效 |
| `contrast-probe.mjs` | 每个叶子文本节点 vs 有效背景的 WCAG 对比度 | 任一节点 <3.0:1(0 FAIL) |
| `seeds10.mjs` | 10 种子 × 17 周全流程 | summary 每轮渲染 + 0 console error |

**实测基线(全部达标,无需修性能/对比度):**

- **性能**: startup **583ms**(预算 1000ms); **0 个 >50ms 长任务**(主线程无 JS 卡顿); rAF 帧间隔
  骰子窗 p95 **50.1ms** ≤ idle 基线 p95 66.7ms —— headless chromium 无真实 vsync,raw 帧间隔被
  compositor pacing 放大(~44ms),故用 idle 基线校准:骰子窗不劣于 idle 即无真实掉帧。
- **键盘**: 8 个 beat 全部 Tab/Enter 可达 + 滑块 ArrowRight 增值,0 console error。
- **对比度**: 7 个 beat 采样 **0 FAIL / 0 WARN**(Day 1 的 #888/#777→#666 + tier 压暗已把全部文本
  推到 WCAG AA)。
- **可重玩**: seeds10 10 种子 × 17 周全绿(见下)。

**唯一真实修复 — BeatOverlay 焦点陷阱(可及性)**: v2.8.1 已给 BeatOverlay 加 `tabIndex=-1` +
打开时聚焦 + `role="dialog" aria-modal="true"`,但 `aria-modal` 语义承诺背景 inert,实际未落实 ——
Tab 会从 dialog 内泄漏到校园地图背景(背景建筑仍是 tabbable button)。v2.9 加 `trapFocus` keydown
handler:Tab/Shift+Tab 循环于 dialog 卡内(`button:not(:disabled)/[href]/input/…/[tabindex]:not(-1)`
首尾循环),卡内无焦点元素时焦点保持在卡上,不再泄漏。纯 presentation,不动 GameState 契约。

**探针自纠(诚实)**: keyboard-probe 首跑报 6 个"unreachable" + "slider not found",逐条排查发现是
探针自身 bug 而非 app bug —— (1) `el.textContent.includes(...)` 匹配到 `tabIndex=-1` 的 dialog 壳
div(其 textContent 含子孙文本),Enter 打在非交互 div 上;修 = 谓词要求 `el.tagName === 'BUTTON'`。
(2) 未等 AI 教练打字机播完就找「下一周」(该按钮 `done` 后才渲染);修 = 先 `waitForSelector` 再 tab。
修完 6 个"失败"全部消失,证明 app 本就键盘可走全程。

Verification: tsc 0 / build green (333.29 kB JS · 110.57 kB gzip) / perf-probe 全绿 (startup 583ms /
0 长任务 / 帧间隔 ≤ idle 基线) / keyboard-probe 全绿 (8 beat 全程可达) / contrast-probe 全绿 (0 FAIL) /
seeds10 全绿 (10 seeds × 17 weeks, summary every run) / smoke-seeds (3 seeds) / verify-v25-dom /
showcase (小镇 17w) / showcase-dynasty (金融世家 17w) / observe-runtime 全绿 —— **11 道门全绿, 0
console errors**。

## 17. v2.10 全天 polish Day 3 — design 16 (像素级视觉核验 + a11y 颜色非唯一 + 深水区稳定性, 2026-08-15, 本次会话)

按 docs/design/16-visual-pixel-a11y-color-stability.md 的 8-phase 全天计划自动执行。Day 1(design 14)修
6 视角 findings,Day 2(design 15)把性能/键盘/对比度/种子从"未实测"变"实测达标"。Day 3 关闭三个被反复
标记却从未关闭的硬缺口 —— ① 像素级视觉核验(截图本环境无法直读,改程序化 DOM 几何审计)② a11y 1.4.1
颜色非唯一(蜡烛/价格方向只靠颜色)③ 深水区稳定性(从未跑种子边界/重开重玩/主动交易)。

**新增 2 个永久探针脚本**(`scripts/`,经 `npm exec --offline --yes --package=playwright -- node scripts/X.mjs` 运行):

| 脚本 | 测什么 | 门(硬失败条件) |
|---|---|---|
| `layout-probe.mjs` | 每个 distinct beat 的 DOM 几何:横向溢出/纵向裁剪/越出 viewport/`text-overflow:ellipsis` 实际截断/字号 <10px/元素重叠 | 任一交互元素静默 clip / truncation / offscreen |
| `marathon-probe.mjs` | 深水区稳定性:mulberry32 种子边界(0/−1/0.5/int32-max/uint32-max/1e15)+ 3 个边界种子 ×17 周 + 重开重玩确定性(seed 42×2)+ 主动交易(seed 7 每周买 50%)+ 每回合状态不变量(NaN/Infinity/数值域) | 任一不变量违反 / 确定性漂移 / console error |

**四项修复(诚实分类:0 游戏逻辑 bug,全部为正确性边界 + a11y + 探针基建):**

- **正确性(2.10a)**:`formatYuan` 对 NaN/Infinity 返回 `¥0`(此前毒账会打印 `¥NaN`);`rollSpecialEvent`/`chooseSpecialChoice`
  的百分比财富冲击 base `Math.max(0, wealth)`(生活费被 flat 扣到负数后,+30% 牛市会算成负 delta 反号);
  `executeOrder` 买单按 `maxUnits` 向下取整截断 + NaN 金额守卫(`roundUnits` 四舍五入向上会把模拟盘现金打成负数)。
- **a11y 1.4.1 颜色非唯一(2.10b)**:蜡烛阳线改 HOLLOW(透明填充 + 红描边)/阴线 FILLED —— 形状第二线索,红涨绿跌配色不动;
  SummaryScreen 模拟盘 P&L 正号前缀 `+`;SpecialEventBanner 加 `· 利好/利空` 非颜色情感线索。
- **a11y ARIA(2.10c)**:BeatOverlay `aria-label="游戏事件"`;InvestPanel `aria-pressed`(chart-frame/trade-mode/quick-pct)
  + 滑块 `aria-valuetext`;HUD/InvestPanel/SummaryScreen 装饰 emoji `aria-hidden`;SummaryScreen 标题 `role="heading" aria-level="2"`。
- **文案一致性(2.10d)**:SummaryScreen "16 周小结"→"17 周小结";6 个 data 文件全角标点扫尾 + `marketNews` a_index 新闻 A股化重写
  + 直引号→弯引号;千分位 `¥8,000` 保半角逗号。

**探针自纠(诚实,深水区稳定性)**:marathon-probe 首跑 seed −1 在 turn 1 的"掷骰子"click 超时 30s。逐条排查:
(1) fresh page 上 seed −1 单独跑 17 周全绿(逐回合 phase 恒为 'dice',hasDiceBtn=1),证明游戏本身无负种子 bug;
(2) 复现出同一 page 连续 seed 0 → seed −1 时,第二次 run 卡在 opening→map 过渡 —— 根因是 raw `setState` 复位只重建
GameState,留下 React 局部 `openingStep`/`leaving` 旧状态(真实重玩 = 页面加载,不会走这条路)。修 = 三探针(marathon/
seeds10/smoke-seeds)加 per-seed `page.goto` 重导航,给每个 seed 干净 DOM。修完 6 run 全绿。

**layout-probe 软发现(已审阅,保留)**:219 个 tiny-font(9px)装饰标签(timeline 周数 / building guide chip /
risk chip / lock chip)+ 9 处校园地图装饰底图 vertical-clip(scrollHeight 超 clientHeight ~19px,纯装饰 emoji,
非交互)。均非硬失败,不阻塞;risk/lock chip 的 9px 属既有设计选择,对比度已由 contrast-probe 单独验证,留待未来
polish 轮。

Verification: tsc 0 / build green (335.76 kB JS · 111.09 kB gzip) / layout-probe 全绿 (0 hard fail) /
marathon-probe 全绿 (种子边界 + 重开重玩确定性 + active trading, 0 console errors) / perf-probe 全绿
(startup 567ms / 0 长任务) / keyboard-probe 全绿 / contrast-probe 全绿 (0 FAIL) / seeds10 全绿 (10 seeds ×
17 weeks) / smoke-seeds (3 seeds) / verify-v25-dom / showcase (小镇 17w) / showcase-dynasty (金融世家 17w) /
observe-runtime 全绿 —— **12 道门全绿, 0 console errors**。

## 18. v2.11 多笔委托篮 (multi-order basket, 2026-08-15, 本次会话)

用户需求:"模拟盘还是只能交易一次?可以交易提交,确认前可以撤回,每个交易品"。结论:**是,此前每周只能下一笔**
(`resolveOrder`/`executeOrder` 单笔入口,`InvestPanel` 单品种单方向单金额直接提交)。本轮实现**多笔委托篮**:一周可下多笔
委托(每品种一笔),确认前逐笔撤回,确认后一次性成交。

**设计** 见 `docs/design/17-v2.11-multi-order-basket.md`。核心:① 委托篮 `Record<assetId, DraftOrder>`(key 去重,后委托
覆盖先委托);② `resolveOrders(accountBefore, orders[], turn, shockPct?)` 按 **canonical ASSETS 序**(非用户添加序)逐笔
`executeOrder` + T+1 门 + running account 贯穿,返回 `result.fills`/`result.blocked`,派生 `side` `hold|buy|sell|mixed`;
③ `resolveOrder` 变薄包装,`makeInvestment` 用同一篮对 `paper`/`altPaper`(平行命运孪生)各跑一次;④ 主按钮篮空时保留
单笔快速路径(showcase/marathon 探针零改动),篮非空时 `确认 N 笔下单`;`.no-invest-button` 一键不操作。**不新增随机源**。

**发现并修复的真实布局 bug(由新探针 basket-probe 触发)**:`InvestPanel` 的 `.invest-rows`(`flex:1; min-height:0;
overflow-y:auto`)在 panel 被头部内容挤占后塌缩到 **95px**(一行都装不下),导致 `.asset-attribute-card`(v2.7 加的属性卡)
直接盖在债券行下半部 —— 用户点债券会点到属性卡,Playwright actionability 也报 `intercepts pointer events`。这是
v2.7 属性卡叠加挤压后一直潜伏、但从未被探针踩到的 bug(旧探针从不点单个 `.invest-row`)。修复:
`.invest-rows { min-height: 200px }`(不再塌成一条缝)+ `.invest-panel { overflow-y: auto }`(总内容超高时整卡滚动,
底部操作区不再被裁)。几何诊断(`_diag-overlap.mjs`,用完即删)确认债券行中心命中自身,属性卡 no longer 覆盖;layout-probe
无新增 hard fail,`.invest-row` 纵向裁剪从警告列表消失。

**探针新增/扩展**:
- `scripts/basket-probe.mjs`(新):驱动 UI —— turn2 两笔入篮(货币基金 50% + 债券 25%)→ ✕ 撤掉货币基金 → 确认 → 断言
  恰好 1 笔成交(证明"确认前可撤回"真的不成交);turn3 两笔入篮 → 主按钮文案 `确认 2 笔下单` → 确认 → 断言 `fills=2 /
  side='buy' / blocked=0`,结果卡 `.invest-fill-line` = 2。
- `scripts/showcase.mjs` §contract(扩):`resolveOrders` 纯函数 pins —— 空篮=hold / canonical 顺序不敏感(正反添加同结果)/
  mixed(买入+卖出)=`side:'mixed'` 且 fills=2 / T+1 同周买→卖被拦(blocked=1、amount=0、reason 含 'T+1')/ Σ 聚合
  (units/amount = Σ fills)。showcase 原有 buy(quick-pct 50% + btn-primary)与 hold(no-invest-button)路径**零改动通过**。

Verification: tsc 0 / build green (338.46 kB JS · 112.11 kB gzip) / basket-probe 全绿 / showcase (含 resolveOrders
pins) 全绿 / showcase-dynasty 全绿 / layout-probe 全绿 (0 hard fail) / marathon-probe 全绿 / perf-probe 全绿
(startup 575ms) / keyboard-probe 全绿 / contrast-probe 全绿 (0 FAIL) / seeds10 全绿 / smoke-seeds 全绿 /
verify-v25-dom 全绿 / observe-runtime 全绿 —— **13 道门全绿, 0 console errors**。

## 19. v2.12 两步走强制 (two-step confirmation, 2026-08-16, 本次会话)

用户反馈:"模拟盘还是只能买卖一次,需要能够提交交易,中间可以改,玩家确认后生效,两步走"。排查结论:**不是缺功能,是
UX 被单笔快速路径掩盖** —— v2.11 委托篮已能多笔下单(basket-probe 全绿),但主按钮在篮空时保留 `invest([单笔])`
直接成交的 fallback(标签 `确认买入/卖出 ¥金额`),玩家点它只成交一笔、零确认,永远发现不了「加入委托」,于是误以为
每周只能买卖一次。

**设计** 见 `docs/design/18-v2.12-two-step-confirmation.md`。改动:① 主按钮 `onClick={confirmOrders}`、
`disabled={basketEntries.length === 0}`(篮空 label「先加入委托,再确认」);② 篮空时渲染「①② 两步走」`role="note"`
提示;③ `.add-draft-button` 升级为描边 accent(步骤 1 更醒目,与实心「确认」形成"提交→确认"层级)。委托篮
add/update/✕/清空 逻辑零改动,只是不再可被绕过。**不新增随机源**(纯 UI 交互)。

**探针适配**:showcase.mjs / showcase-dynasty.mjs / marathon-probe.mjs 的每周买入,从「点 50% → 点主按钮」改为
「点 50% → 点 .add-draft-button → 点主按钮」;basket-probe.mjs / smoke-seeds.mjs(仅 no-invest)/ keyboard-probe.mjs
(仅键盘)不受影响。

Verification: tsc 0 / build green (338.59 kB JS · 112.19 kB gzip) / basket-probe 全绿 / showcase 全绿 /
showcase-dynasty 全绿 / marathon-probe 全绿(含 active trading seed 7 走 加入委托→确认)/ smoke-seeds 全绿 /
keyboard-probe 全绿 —— **0 console errors**。

## 20. v2.13 任天堂式交互手感 (Nintendo-style interaction polish, 2026-08-16, 本次会话)

用户需求:"polish the interaction, learn from nintendo way of button and UI interaction (vivid)"。排查结论:
此前按钮只有最基础 hover(`filter: brightness(1.05)`,无位移缩放)、无 `:active` 按压态、无弹簧回弹,整体手感"软"——
点击没有确认感,悬停没有层级感。本轮套用任天堂式交互语言:按下瞬间回弹、悬停浮起、实体按键沉下去、描边按钮填满。

**设计** 见 `docs/design/19-v2.13-nintendo-interaction.md`。核心:① `:root` 新增 `--spring:
cubic-bezier(0.34, 1.56, 0.64, 1)`(back-out 回弹过冲);② 按压态 `transition-duration: 60ms`(秒按)+ 释放走基态
160/200ms `--spring`(弹回);③ `.btn` hover 浮起 `translateY(-2px) scale(1.02)`+提亮 / active 下沉 `translateY(1px)
scale(0.94)`+变暗;④ `.building` 实体按键——基态底座阴影 `0 7px 0` 按压压成 `0 2px 0`,hover `-4px` → active `+3px`
+ `scale(0.96)`;⑤ `.btn-choice` hover 浮起填白 / active 下沉 `scale(0.97)`;⑥ `.add-draft-button` hover 描边填满
accent;⑦ `.invest-row`+分段控件轻微浮起+按压缩放;⑧ 所有可点元素 `:focus-visible` 统一 accent 轮廓(键盘可达性不回退);
⑨ `prefers-reduced-motion` 下 null 掉全部弹簧 transition。**纯 CSS,零 JS 逻辑改动,不新增随机源**,`rand` 流顺序与
种子确定性完全不变。

**新增探针** `scripts/interaction-probe.mjs`:用 computed style 断言手感上线(不看像素)——`--spring` token 存在 +
`.btn`/`.building`/`.btn-choice` 的 hover 与 press(active)transform 各自不同(按压是独立于悬停的状态,`:active` 把
`transition-duration` 翻到 `0.06s`),全程 0 console errors。按压用 `mouse.down` 按住 → 移到 (0,0) → `mouse.up`
释放,永不触发点击;active 读取等 400ms(headless Chromium 合成器惰性推进 transition,80ms 会落在 `cubic-bezier` 的
慢启动段而误报)。

Verification: tsc 0 / build green / interaction-probe 全绿 / smoke-seeds 全绿 (3 seeds × 17 weeks) ——
**0 console errors**。

## 21. v3.0 Ch07 贵人系统 (mentor system, 2026-08-30, 本次会话)

用户需求:"8_lifegame 下一阶段 = Ch07 贵人系统;draft spec and test"。按 software-dev-loop 走:
goal 持久化 → plan doc 写纸面 → critic 硬化 → 实现 → red-green → 全门验证。

**设计** 见 `docs/design/20-ch07-mentor-system.md`。Ch07 章节正文不存在于任何 PDF,但机制分散在
ch01-ch02(觉醒流程 5 步)、ch04-ch05 §5.7(觉醒 3 层级/双面性)、outline 承重墙④(贵人系统/听懂 30%/80%)。
由这些 + 现有代码原语合成,补 3 个缺口:

- **A 接住质量**:mentor hit 的 cognition delta 按认知分档缩放(听懂 30%/80%,`mentorComprehensionFor`,
  复用 `COGNITION_INFO_THRESHOLD=60`;组合顺序 base×originCoeff×tierFactor×comprehension;twin 按自己认知)。
  接缝:`events.ts` 的 `applyMentorComprehension`,0 新随机源。
- **B 觉醒 3 层级**(⚡ 破契约):`awakeningTierFor(track, cognition)` = 信任(认知≥60+AI)→大觉醒(胜利/解锁),
  未信任→中觉醒(方法论+好感 +1,不胜利);`player.lastAwakeningTier` 记录 micro/mid/big。**改变旧契约
  「任何 mentor_hit 都是胜利」→「trusted mentor_hit 才是大觉醒」**。胜利可达性不破(认知≥60+AI 后信任命中 90%)。
  契约同步:AGENTS.md §5 末条 + TDD §3/§4 + showcase §contract(改覆盖 trusted/untrusted 双路径)。
- **C 觉醒双面性**:金融世家 restart 带 旧圈层贬低 心态 −5(一次性,`createInitialState`)+ 新期待压力
  体力 −5/回合(`finishCoach`,只作用真实玩家,twin 不带)。

**critic 硬化(fresh-context 子代理)**:抓到 3 个 blocking——① §C 统计字段引错(PDF 是 体力 −5/回合,
非心态);② 探针 §B 结构性不可能转绿(finishCoach 需 4 个 pending 字段齐+相位对,改用手搓合法 fixture);
③ §B 缺 trusted-hit 正向断言 + 契约同步清单。全部修复后再实现。

**新增探针** `scripts/mentor-probe.mjs`:3 契约 red→green(接住质量 30%/80%;中觉醒不觉醒不解锁、
信任命中仍觉醒+解锁+tier;金融世家 restart 心态 75→70 + 体力 −5/回合、小镇无代价),0 console errors。

Verification: tsc 0 / build green (339.11 kB JS · 112.38 kB gzip) / mentor-probe 全绿 / showcase 全绿
(§contract + 小镇 17 周回放,总结屏「本局已觉醒」——回放达信任故 demo 结局未变)/ showcase-dynasty 全绿 /
interaction + basket + layout + contrast 四探针全绿 —— **0 console errors**。
⚠️ `smoke-seeds`/`seeds10`(3-10 种子×17 周)在本会话 headless 环境超时(rAF 降频,与改动无关——单种子
showcase/dynasty 均跑完 0 error),历史报告中它们在同环境正常通过;如需可在有头环境重跑。

