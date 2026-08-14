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

