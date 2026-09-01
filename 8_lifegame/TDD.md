# TDD — Stock God Simulator: Intro Scene (current contract v3.1)

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
| **v1.7** | **2026-08-10** | **Unified mind/body indicators + two unlockable buildings (docs/design/07, user directives: 校园解锁健身房(回复心智)/对外交流中心(开拓认知,风险比图书馆高,需要情商) + 所有数据指向两个统一的认知和身心健康指标,人能控制的只有头脑和身体): HUD redesigned around TWO big gauges — 🧠 认知 and 💪 身心健康 (DISPLAY-fused 情绪+体力; data layer untouched, dice stateMod contract intact), 财富 demoted to an outcome chip; 健身房 💪 cognition-gated at 60 (same as exchange) + the first 健身房 visit forces the 办卡 beat (`GYM_DISCOVERY_EVENT`, 0 rand draws, new `GameState.gymUnlocked`), its table restores 心态/体力 (the state-reset spot feeding dice stateMod); 对外交流中心 🌏 cognition-gated at `EXCHANGE_COGNITION_THRESHOLD` 60 (derived gate, no flag — 情商 FOLDS INTO cognition: 社交学习也是认知, a scattered 情商 stat would contradict the unified-indicators directive), its table pays +8~14 cognition vs library's +5~6 but the trap bites 认知 itself; CampusMap generalizes the mentor ??? lock to a 3-way lockHint (mentor/gym/exchange); showcase route: t6 办卡 beat + t8 exchange gate assertion** |
| **v1.9 / D13** | **2026-08-10** | **金融世家可玩路线 +「关系不是资产」(docs/design/08): `mentor_hit` is the intro victory and unlocks the origin; dice `awaken` remains an outcome tier but no longer mutates awakening; `createInitialState(origin, unlocked)` and origin-aware restart add dynasty resources; typed relationship effects replace Simulation choice-id ternaries; dynasty-only beats use the then-current 2/5/8 turn schedule and stop after closure; summary mounts the unlocked-origin choice; deterministic verification pins unlock, sequencing, trust clamps and truthful resolution. v2.0 later rebases the schedule for 13 weeks.** |
| **v2.0 / D14** | **2026-08-10** | **13-week intro semester + visible growth guidance: `INTRO_TURN_LIMIT=13`; every asset curve and news table has 13 entries (no week-9 wrap); finance-dynasty relationship beats rebased to weeks 3/7/11 with week-13 closure priority; InvestPanel persistently states 复盘能力 unlocks at cognition ≥60, requires a nonzero-position trade, and shows review progress; typed `CAMPUS_LOCATION_GUIDES` drives benefit/risk chips and pre-travel details for all eight campus locations without leaking locked content; browser verification now completes all 13 weeks.** |
| **v2.1 / D15** | **2026-08-11** | **Growth/market/history expansion: world-event arrival frequency 20%→55%, weighted 11-event table adds cognition/body breakthroughs and setbacks with clamped `StatDelta`; market expands 3→7 products with `AssetRisk` + per-asset `maxLeverage`, 13 ticks/news each; `InvestmentResult` adds leverage/exposure/liquidation, loss is margin-capped, and allocation 0 is an explicit no-invest result earning no review credit; persistent 1995→2014 timeline + 13-week progress declares `历史背景 ≠ 投资建议`; DEV/showcase pins all new contracts.** |
| **v2.1.1 / D16** | **2026-08-11** | **End-game awakening diagnosis: `SummaryScreen` now receives `mentorUnlocked` and `track`; unawakened runs render `尚未觉醒 · 原因` with state-derived missing discovery, direction, cognition-60 ability, and mentor-recognition guidance; awakened runs render an explicit success notice. This is presentation-only and does not change the `mentor_hit` awakening contract.** |
| **v2.2 / D17** | **2026-08-10** | **Extended calendar and independent love line: `INTRO_TURN_LIMIT=17` = 13 campus weeks + 3 winter-break weeks + next-semester opening; week 14 forces a Christmas first meeting, good impression requires cognition ≥60 and rounded `(stamina+mood)/2` ≥70, week 15 forces personal growth, and week 16 forces reunion or hopeful reflection. Week 17 guarantees a mentor encounter opportunity but reuses the existing probabilistic recognition rule (trusted AI direction + cognition ≥60 = 90%); only `mentor_hit` awakens/unlocks. All seven assets/news tables now have 17 explicit entries and the presentation-only timeline reaches 2015. Romance state never contributes to mentor trust, awakening, or victory.** |
| **v2.3 / D18** | **2026-08-12** | **小镇 life-surprise event pool (user directive: "add a lot of random surprising events, like friends / life / health / wealth"): the ⚡ special-event pool grows from 11 world-market shocks to 49 themed events — friends, family/hometown (the 小镇做题家 identity: mom's calls, village pressure, remittances), health, small-money first buckets, everyday surprises, and 3 rare big breaks (weight 1). `SpecialEvent.text: string` added (required) — every shock carries a one-line narrative so the banner reads as a story beat, not a stat change; `SpecialEvent.unexpected: boolean` added — gates the "· 无预兆" banner suffix to true no-warning shocks only (market moves/sudden breakdowns; narrative life events drop it). Breakthrough weights re-balanced to 6/6/4/4/3 (认知跃迁/作息/三周啃题/世界级公开课/同频伙伴) so per-trigger odds hold ~7% each instead of drowning in the larger pool. `SpecialEventBanner` renders label + story + deltas. `SPECIAL_EVENT_TRIGGER_PROB` stays 0.55; pool-level showcase pins (≥10, cognition ≥20, wellbeing ≥30, ≥1 setback) unchanged.** |
| **v2.4 / D19** | **2026-08-12** | **Real trading system + choice-based life events (user directive: 模拟盘没有初始资金 / 没法买卖具体资产 / 交易面板要像交易面板 / 数据要有 2014 历史 + 周期切换): ⚡ 2.4a `SpecialEvent.choices` + `pendingSpecialChoice` + `chooseSpecialChoice` — 3 life events (朋友借钱/家里的装修款/刮中彩票) become 人生抉择 cards shown BEFORE the location card (choice outcome applies at choice time, incl. alt trajectory). ⚡ 2.4b spot paper-trading: `PaperAccount` (cash/positions/realizedPnl/initialCapital) with per-origin 初始资金 (小镇 ¥100,000 / 世家 ¥300,000); `Asset` gains `basePrice` (2015-semester-open level) + `preHistory` (40 deterministic 2014-plausible weekly returns) + `daily` (5 deterministic daily moves per week) + `decimals`; `priceAt/endPriceAt/executeOrder/accountValue/resolveOrder` replace the weekly margin/leverage model — `InvestmentResult` = one spot order (buy/sell/hold) + account mark-to-market week P&L; margin/leverage/liquidation retired (spot only, commission TRADE_FEE_RATE 万三); trading P&L lives in the paper account, NOT 财富. ⚡ 2.4c market reacts to world events: `SpecialEvent.assetShock` moves a named asset's week close (`GameState.shockPct`, consumed at turn end). ⚡ 2.4d `buildMarketView` merges pre-history + semester so charts never start empty; new K线周期 `ChartFrame` 日K/周K/月K/半年K/年K via `frameCandlesFor` + `aggregateCandles` (day = raw daily tape, coarse frames aggregate the distorted weekly). InvestPanel rebuilt as a trading surface (account bar, buy/sell/hold tabs, quotes, order slider + quick %, holdings, P&L); summary adds 模拟盘 final value. Showcase pins re-keyed to the order model.** |
| **v2.5 / D20+D21** | **2026-08-13** | **人生目标 + 爱情线前移 + 贵人多元化 + 世家事件池 (user directives: judge finish / finish 金融世家 / 小镇前5分钟戏剧化+视觉 / 贵人多样性 + 爱情初次相遇发生在进校园时,开局立下爱与财的目标; design 10): ⚡ 2.5a love line moves INTO the semester — `LoveStage` (none→met→knowing→close), semester beats `LOVE_FIRST_TURN=2` (迎新晚会) / `LOVE_SECOND_TURN=6` (期中图书馆) / `LOVE_THIRD_TURN=10` (期末邀约) via `loveEventFor`/`loveStageAfterChoice`, injection priority seasonal > week-13 relationship closure > teaching > dynasty relationship > love > table draw; Christmas title/text adapts via `christmasContext(stage)` and week-16 reunion opens via `shouldReunite(impression, stage)` (good OR close); love still never touches awakening/unlock. ⚡ 2.5b 人生目标 — `GameState.lifeGoalWealth` (TOWN 150k / DYNASTY 400k ≈ start +50%) set at a new 2-step cinematic opening (出身故事 → 人生目标); HUD 🎯 progress chip + love-stage chip; summary renders 达成/进行中 verdicts for both goals. ⚡ 2.5c 贵人多元化 — `MENTOR_EVENTS_BY_TRACK` (4 personas: AI 技术前辈/券商经理/厂长/退休教授, generic fallback; hit/miss ids and trust switch unchanged) + 贵人好感 `SpecialEvent.mentorFavor` → `GameState.mentorFavor` clamped to MENTOR_FAVOR_MAX=4, `mentorHitProbFor(origin, trusted, favor)` = trusted ? 0.9 : min(0.9, originProb + 0.12×favor); 5 town events carry favor (+1 each); parallel twin always favor 0. ⚡ 2.5d origin-aware event pools — `specialEventsFor(origin)`: town keeps the 49+ 小镇 pool; dynasty swaps 小镇 家乡/小钱/大惊喜 for 16 世家 events (家族汇报会/信托分红/董事会/名媛圈/继承人之争/父亲住院/校门口的车…), sharing market/friends/health slices; trigger prob stays 0.55. Showcase pins all new contracts + a `verify-v25-dom.mjs` DOM pass. (v2.5.1 polish: coach persona emoji, journey doc drift. v2.5.2 animation feel: dice decel, typewriter, attribution cascade, opening cross-fade.)** |
| **v2.6 / D22** | **2026-08-14** | **贫困逻辑 + 认知引擎 + 贵人女儿 (user critique: "怎么可能有 10w 起始? 起始 1k 块最多了,模拟盘 10w" + canonical arc "模拟盘亏到 5w → 翻盘 20w → 遇到贵人,发现爱人是贵人女儿"; design 11): ⚡ 2.6a 双账本分离 — 生活财富 = 生活费 (小镇 ¥1,000 / 世家 ¥300,000, `START_WEALTH`); 模拟盘 = 试炼场初始资金 (小镇 ¥100,000 / 世家 ¥300,000, new `PAPER_INITIAL_CAPITAL` — fixes the latent bug where paper initial derived from life wealth). ⚡ 2.6b 财富目标 = 模拟盘翻盘目标 — `GameState.paperGoal` (小镇 ¥200,000 / 世家 ¥500,000) replaces `lifeGoalWealth`; HUD 🎯 chip + summary verdict read `accountValue(paper)`, progress net-of-paper-capital (`paperGoalProgressFor`; drawdown clamps to 0% — the 5 万 深坑 reads as a floor). ⚡ 2.6c 小镇小钱用 flat 金额 — `SpecialEvent.wealthFlat`/`SpecialEventChoice.wealthFlat` (一等奖学金 ¥2,000, 彩票 ¥50, 装修款 −¥500; 拆迁改纯心态/认知 — 爸妈的钱不是你的钱). ⚡ 2.6d 认知引擎 (user arc: 宝典 + 心理学书 + 爱人接住情绪 → 认知涨得快) — 投资宝典 woven into the 图书馆 discovery beat (+2 认知 both choices), 心理学书 woven into the 期中 love beat (`love_second_share` cognition 3→4); InvestPanel blind-state hint names 本能 (追涨/杀跌/满仓). ⚡ 2.6e 贵人女儿 twist — week-17 mentor encounter appends the reveal ("我女儿说,迎新晚会上认识了个挺有意思的人") when `loveStage === 'close'`; pure narrative, recognition probability untouched. Opening town story + goals card reframed (¥1,000 生活费 / ¥100,000 模拟盘 / 目标翻盘 ¥200,000). Showcase pins re-keyed to the two-ledger model + 5 paper-progress pins; `shot` helper retries transient Windows file locks.** |
| **v2.7 / D23** | **2026-08-15** | **贵人换向 + 真实交易规则 + 新手教学 (user directive: 选非 AI 方向后贵人指点给一次换向机会 / 模拟盘要能交易所有种类且付佣金 + 给出真实规则与限制并在「?」内给金融新手逐步解读; design 12): ⚡ 2.7a 贵人换向 — non-AI track earns ONE post-指点 switch: new `GameState.retrackDone` + `RETRACK_CHOICE` (`retrack_ai`, 改押人工智能) shallow-copied onto the mentor_hit card when `track !== ai && !retrackDone` (`injectRetrackOption`); `chooseEvent` sets track=ai AND consumes the chance (`retrackDone=true`, also consumed on a plain `mentor_hit` while eligible — declined or taken, the one-time offer is gone); `mentorHitFromChoiceId` counts `retrack_ai` as a hit so the awakening/coach/finance-unlock is never forfeited. ⚡ 2.7b 真实交易规则 — `TradingRules` (`market`/`tPlus1`/`priceLimitPct`/`minUnits`/`lotSize`) + frozen `TRADING_RULES` per asset; `resolveOrder` mechanically enforces T+1 (selling a same-turn buy returns an empty fill + `InvestmentResult.blockedReason`); buy fills stamp `PaperPosition.boughtTurn`; 涨跌停 & 1手=100份 are teaching notes only (weekly mock can't bind a daily ±10%). ⚡ 2.7c 新手「?」手册 + 属性卡 + 市场温度 + 渐进提示 — new `TradingHelpPanel` (5 sections: 佣金万三 / T+1 / 涨跌停 / 最小单位 / 产品区别) toggled by a `? 规则` button; per-selected-asset `.asset-attribute-card` (市场/T+1/涨跌停/最小单位 + `ASSET_DISTINCTION` 一句话区别); `marketTemperatureFor(assets, turn)` derives 低迷/震荡/亢奋 from the average week tick (pure function, no new randomness); `GameState.seenHints` + `markHintSeen` drive one-time progressive hints (T+1 sell / BTC 高波动 / 市场温度). ⚡ 2.7d polish — copy-truth (碎屏 −¥800 flat, 16 周小结), numeric-format (生活费 −¥3,000), 标点/emoji 一致性 (贵人好感 🎓, 生活费 💰, 奖学金 🏆, 爱情 fallback ❤️), `EventModal` wealthFlat display, negative-money `formatYuan` (−¥300, never ¥−300), a11y (sr-only h1, BeatOverlay role=dialog aria-modal, opening-hero aria-hidden), contrast (#999/#777→#666, #888→#555), type-contract (TIER_SHORT `Record<DiceTier,…>`, HUD ×`MENTOR_FAVOR_HIT_BONUS`, DiceRoller `ORIGIN_DICE_MOD`, summary `paper.initialCapital`).** |
| **v2.8 / D24** | **2026-08-15** | **渐进投资引导 + 贵人去固定化 (user directive: 模拟盘数据太多冲击太大需循序渐进引导投资 + 有投资导师/损友/骗子/贵人出现指点 / 贵人可能是任何人,三人行必有贵人; design 13): ⚡ 2.8a 渐进解锁资产 — new `GameState.unlockedAssets: string[]` (init `['money_fund','bond']`); the 7-asset panel filters to unlocked and renders locked as 🔒 teasers (name only, no price/K线/新闻). ⚡ 2.8b 三个投资引导 beat — `MENTOR_GUIDE_EVENT`(导师·第一课, 认知+, 解锁 gold+index_fund) / `BAD_FRIEND_EVENT`(损友的怂恿, 追高软后果, 解锁 a_index+hk_index) / `SCAMMER_EVENT`(内幕骗局, 信他一次扣生活费 −¥400 硬后果, 解锁 btc), turn-keyed by `guidanceEventFor(state)` (unlockedAssets.length + turn gate, 0 rand draws), injected in `arrive()` between the dynasty relationship line and the love line. ⚡ 2.8c 贵人去固定化 — the 指点 (unlock/认知/建议) comes from any 路上遇到的人 (导师/损友/骗子), 觉醒 stays office-only (mentor_hit). 投资导师 = the AI coach persona extended into the invest phase.**
| **v2.8.1 / D25** | **2026-08-15** | **Intro-scene 全天 polish (design 14, 8-phase 自动执行): 视觉 — 涨跌方向统一 A股红涨绿跌 (`.quote-up`=`--loss`红 / `.quote-down`=`--gain`绿, 对齐 `InvestPanel` `quote-${change}`), 对比度扫尾 (#888/#777→#666), tier/觉醒文本压暗到 WCAG AA; 手感 — 原生 `disabled` 按钮三态 (`.btn:disabled` / `.trade-mode-button:disabled` / `.quick-pct-button:disabled` + `:focus-visible` 轮廓 + `.rule-hint-dismiss:active`); 叙事 — 导师第一课文案重写 ("别一上来就碰股票…先把波动看懂" + 三人行必有贵人主题贯通), 新增 `DYNASTY_GUIDANCE_TEXT`, locationEvents/specialEvents 全角标点规范化 (Node 安全规则保 `¥8,000` 千分位); 正确性 — `formatYuan` 负号前移 (−¥N), assets 注释日期 (2014-fall); a11y — BeatOverlay 焦点管理 (tabIndex=-1 + open 聚焦), AICoachPanel `prefers-reduced-motion` 跳过打字机, EventModal/InvestPanel/ParallelFateCard 装饰 emoji `aria-hidden`, 语义标题 (event-heading/coach-persona/fate-heading `role=heading aria-level=2`), DuelBar 行身份 `aria-label`. 7 道验证门全绿 (typecheck/build/smoke-seeds×3/verify-v25-dom/showcase/showcase-dynasty/observe-runtime).** |
| **v2.9 / D26** | **2026-08-15** | **Intro-scene 全天 polish Day 2 (design 15, 性能/手感/可及性实测): 新增 4 个永久探针脚本 —— `scripts/perf-probe.mjs`(启动 ≤1s + rAF 帧间隔 idle-baseline 校准门 + 0 个 >50ms 长任务)、`scripts/keyboard-probe.mjs`(纯键盘 Tab/Enter/箭头走完 8 个 beat + 滑块箭头键)、`scripts/contrast-probe.mjs`(computed 对比度 <3.0 硬门, 覆盖 7 个 beat)、`scripts/seeds10.mjs`(10 种子 × 17 周, 比 smoke-seeds 的 3 种子更深)。实测基线: startup 583ms / 0 长任务 / 键盘全程可达 / 对比度 0 违规 —— 证明 Day 1 后 intro scene 已达标, 性能与对比度无需修。a11y — BeatOverlay 焦点陷阱: `aria-modal="true"` 语义承诺背景 inert, 现 Tab/Shift+Tab 循环于 dialog 卡内 (`trapFocus` keydown handler, 不再泄漏到校园地图背景)。** |

| **v2.10 / D27** | **2026-08-15** | **像素级视觉核验 + a11y 颜色非唯一 + 深水区稳定性 (design 16, Day 3): 关闭三个被反复标记却从未关闭的硬缺口。⚡ 2.10a 正确性 — `formatYuan` NaN/Infinity→`¥0`(毒账不再打印 `¥NaN`);`rollSpecialEvent`/`chooseSpecialChoice` 的百分比财富冲击 base `Math.max(0, wealth)`(生活费变负后 +30% 牛市不再反号成负 delta);`executeOrder` 买单按 `maxUnits`(现金/(1+万三)/价 向下取整)截断 + NaN 金额守卫 —— `roundUnits` 四舍五入向上不再把模拟盘现金打成负数。⚡ 2.10b a11y 1.4.1 颜色非唯一 — 蜡烛阳线 HOLLOW(透明填充+红描边)vs 阴线 FILLED(形状第二线索,红涨绿跌配色不动);SummaryScreen 模拟盘 P&L 正号前缀 `+`;SpecialEventBanner 加 `· 利好/利空` 非颜色情感线索。⚡ 2.10c a11y ARIA — BeatOverlay `aria-label="游戏事件"`;InvestPanel `aria-pressed`(chart-frame/trade-mode/quick-pct)+ 滑块 `aria-valuetext`;HUD/InvestPanel/SummaryScreen 装饰 emoji `aria-hidden` span;SummaryScreen 标题 `role="heading" aria-level="2"`。⚡ 2.10d 文案一致性 — SummaryScreen "16 周小结"→"17 周小结(第一学期+寒假+新学期)";6 个 data 文件全角标点扫尾 + `marketNews` a_index 新闻 A股化重写(非 verbatim 复制 index_fund)+ 直引号→弯引号;千分位 `¥8,000` 保半角逗号。⚡ 2.10e 探针基建 — 新增 `layout-probe.mjs`(DOM 几何审计:溢出/截断/越界/字号,0 hard fail;219 tiny-font 装饰标签 info + 9 装饰底图 vertical-clip warn)+ `marathon-probe.mjs`(种子边界 0/−1/uint32-max + 重开重玩确定性 seed 42×2 + active trading seed 7 + 每回合状态不变量);`seeds10`/`smoke-seeds`/`marathon` 三探针加 per-seed `page.goto` 重导航 —— raw `setState` 复位只重建 GameState,留下 React 局部 `openingStep`/`leaving` 旧状态,第二次 run 偶发卡在 opening→map 过渡(探针 bug,非游戏 bug;真实重玩=页面加载)。** |
| **v2.11 / design 17** | **2026-08-15** | **多笔委托篮 (multi-order basket): `invest(orders: DraftOrder[])` → `resolveOrders` 按 canonical ASSETS 顺序逐笔执行, running account 贯穿(T+1 门 + 现金钳制对中间态生效), 返回 `fills`/`blocked` + `side:'mixed'`; `resolveOrder` 变薄包装; 委托篮 UI 加入/更新/✕取消/清空/确认 N 笔下单; 新探针 `basket-probe.mjs`。** |
| **v2.12 / design 18** | **2026-08-16** | **两步走强制 (two-step trade confirmation): 移除单笔快速路径, 主按钮永远 =「确认 N 笔下单」(篮空 disabled + 「①② 两步走」`role="note"` 提示), `.add-draft-button` 描边 accent 成为步骤 1 视觉; 探针每周买入改走 加入委托 → 确认。** |
| **v2.13 / design 19** | **2026-08-16** | **任天堂式交互手感 (Nintendo-style interaction polish): `:root` 新增 `--spring` back-out token + `.btn`/`.building`/`.btn-choice` hover 浮起/active 下沉/按压 60ms 弹簧释放; 描边按钮 hover 填满; `:focus-visible` 统一轮廓; `prefers-reduced-motion` 置 none; 新探针 `interaction-probe.mjs` 断言 computed style 手感上线。纯 CSS, 零 JS 逻辑改动。** |
| **v3.0 / design 20** | **2026-08-30** | **Ch07 贵人系统 (mentor system) — 把单个贵人办公室 beat 系统化成 PDF 贵人系统 (design/20, 三机制, 源锚定 ch01-ch02 + ch04-ch05 §5.7 + outline 承重墙④): ⚡ A 接住质量 — mentor hit 的 cognition delta 按认知分档缩放 (听懂 30%/80%, `mentorComprehensionFor`, 复用 COGNITION_INFO_THRESHOLD=60, 组合顺序 base×originCoeff×tierFactor×comprehension; twin 按自己认知); ⚡ B 觉醒 3 层级 — `awakeningTierFor(track, cognition)`: 信任(认知≥60+AI) mentor hit = 大觉醒(胜利/解锁), 未信任 hit = 中觉醒(方法论+好感 +1, 不胜利), `player.lastAwakeningTier` 记录 micro/mid/big —— 改变「任何 mentor_hit 都是胜利」的旧契约(AGENTS.md §5 同步); ⚡ C 觉醒双面性 — 金融世家 restart 带 旧圈层贬低 心态 −5(一次性) + 新期待压力 体力 −5/回合(finishCoach, 只作用真实玩家). 新探针 `mentor-probe.mjs` (3 契约 red→green); showcase §contract 改覆盖 trusted/untrusted 双路径. 付费贵人/贵人流转出范围(Token/多时代).** |
| **v3.1 / design 21** | **2026-08-31** | **Ch09 投资策略库 + 模拟盘真实度自选 (design/21, 三机制, 源锚定 ch04-ch05 投资流程/策略分级 + outline; 红线「要好玩,简单 — 加选择不加复杂」): ⚡ A 真实度自选 — `GameState.tradingRealism: 'novice'|'real'`(默认 real), InvestPanel 顶部「新手/真实」开关; 新手档免佣金+免 T+1+无策略(纯在 7 条曲线低买高卖), 真实档=现状+B+C; realism 作可选参数(默认 'real')线程进 `resolveOrders`/`executeOrder`, 不挂 PaperAccount. ⚡ B 策略层 — `DraftOrder.strategy: 'buy_hold'|'ma_timing'`; 均线择时=当周内「开买收卖」in-out 波段, 在 resolveOrders 内当场闭合不持仓(避免与同资产 buy_hold 持仓混淆); 趋势信号=开盘价 vs 近 4 周收盘均线(MA4, endPriceAt 序列, 确定性); 上行才买(下行拦单「均线之下不接刀」), 统一放大器 `MA_TIMING_FACTOR`=1.3(择对多赚/假信号多亏); 认知 ≥60 解锁(`maTimingUnlockedFor`); InvestPanel 每行「持有/择时」分段. ⚡ C 分品种费率 — `TRADING_RULES.*.feeRate`(货币/债券 0.01%, 指数 0.05%, 黄金 0.02%, A股 万三, 港股 0.05%, BTC 0.1%)替换万三一刀切; 属性卡+「?」手册+订单预览同步. 新探针 `strategy-probe.mjs`(3 契约 red→green); 穿越AI 拆 Ch10. 金牌 Token 策略出范围(商业模式承重墙⑥).** |

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
│   │   ├── assets.ts      # 7 mocked products + risk + basePrice/preHistory(2014)/ticks(17)/daily — real price levels + history
│   │   ├── specialEvents.ts # v2.1 11-event shocks → v2.3: 49-event 小镇 life-surprise pool (text + unexpected); v2.4: + choices (人生抉择) + assetShock; v2.5: + mentorFavor (贵人好感) + specialEventsFor(origin) 世家池
│   │   ├── seasonEvents.ts # v2.2: Christmas love, winter growth/reunion/reflection, opening mentor fallback; v2.5: semester love beats 2/6/10 + loveEventFor/loveStageAfterChoice/christmasContext/shouldReunite
│   │   ├── timeline.ts    # v2.2: 1995→2015 historical milestones (context only, never a signal)
│   │   ├── locationEvents.ts # v1.2: per-location weighted event tables (opportunity/neutral/trap) + mentor pair; v1.3: + 开户 story beat; v2.5: MENTOR_EVENTS_BY_TRACK 4 贵人人格
│   │   └── marketNews.ts  # v1.3: per-asset per-turn 热点新闻 headline pairs (up/down)
│   └── simulation/
│       ├── dice.ts        # rollDice() + rollAltDice() + tierForTotal() — pure functions, seeded
│       ├── events.ts      # v1.2: drawLocationEvent() + tier-scaled resolveEventChoice() + computeAltEventDelta()/computeAltMentorHit()
│       ├── invest.ts      # v2.4 spot order model: priceAt/endPriceAt/executeOrder/accountValue/resolveOrder + PaperAccount; infoQuality + buildMarketView (merged 2014+semester tape); ChartFrame 日/周/月/半年/年 via frameCandlesFor + aggregateCandles
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
    ├── InvestPanel.tsx      # v2.1: 7-row market, risk chips, margin slider, capped leverage, no-invest
    ├── TimelinePanel.tsx    # v2.2: 1995→2015 context + active 17-week seasonal strip
    ├── AICoachPanel.tsx     # typed-reveal coach line + 4D attribution bars + 下次试试 hint (v1.2)
    ├── SpecialEventBanner.tsx # v1.1 ⚡ shock banner; v2.3: label + narrative text + deltas
    ├── ParallelFateCard.tsx   # v1.1: 平行命运 same-dice-different-origin comparison
    ├── tierLabels.ts          # v1.1.1: shared DiceTier→中文 label map (DiceRoller + ParallelFateCard)
    ├── HUD.tsx                # wealth / cognition / stamina / mood counters, color-coded pills
    ├── useCountUp.ts        # small shared number tick-up animation hook
    └── SummaryScreen.tsx    # end-of-intro recap + state-derived awakening result/reasons + origin-aware gap teaser
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
  wealth: number          // 生活费, starts ¥1,000 (小镇) / ¥300,000 (世家) — the 模拟盘 is a separate ledger (paper.initialCapital)
  cognition: number       // 0-100
  stamina: number         // 0-100
  mood: number            // 0-100
  turn: number            // 1-based, intro caps at INTRO_TURN_LIMIT (17 weeks as of v2.2)
  position: string        // current Cell.id
  awakened: boolean       // v3.0: latches true only after a TRUSTED mentor_hit (大觉醒); an 'awaken'-tier roll or an untrusted hit (中觉醒) does not set it
  lastAwakeningTier: 'micro' | 'mid' | 'big' | null  // v3.0: the most recent awakening tier (微/中/大)
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

export type AssetRisk = 'cash' | 'low' | 'medium' | 'high'
// v2.4: real price levels + history — basePrice = semester-open price (2015-plausible),
// preHistory = 40 deterministic 2014 weekly returns, ticks = 17 semester weekly returns,
// daily = 5 deterministic daily returns per merged week (K线周期, presentation only).
// price(turn k) = basePrice × ∏(1+preHistory) × ∏(1+ticks[0..k-1]).
export interface Asset {
  id: string
  label: string
  icon: string
  risk: AssetRisk
  basePrice: number
  preHistory: number[]
  ticks: number[]
  daily: number[]
  decimals: number
}

// v2.4: one held position (avg-cost basis) and the 模拟盘 paper account.
export interface PaperPosition {
  units: number
  costBasis: number
  boughtTurn?: number           // v2.7: the 1-based turn last bought — T+1 sell gate
}
export interface PaperAccount {
  cash: number
  positions: Partial<Record<string, PaperPosition>>
  realizedPnl: number
  initialCapital: number // 小镇做题家 ¥100,000 / 金融世家 ¥300,000
}

// v2.11: multi-order basket. One draft per asset (buy OR sell), executed in canonical
// ASSETS order; rule blocks (T+1) get an explicit reason instead of a silent zero fill.
// v3.1 (Ch09): 模拟盘真实度自选 + 交易策略.
export type TradingRealism = 'novice' | 'real'
export type StrategyId = 'buy_hold' | 'ma_timing'
export interface DraftOrder { assetId: string; side: 'buy' | 'sell'; amount: number; strategy?: StrategyId }
export interface BlockedOrder { assetId: string; side: 'buy' | 'sell'; reason: string }
export interface OrderResult {
  assetId: string
  side: 'buy' | 'sell'
  units: number
  price: number
  amount: number // ¥ notional of the executed fill
  fee: number
}

export interface InvestmentResult {
  assetId: string
  side: 'buy' | 'sell' | 'hold' | 'mixed' // 'hold' = no orders; 'mixed' = buy(s) + sell(s) both filled
  fills: OrderResult[]                    // v2.11: executed fills, canonical product order
  blocked: BlockedOrder[]                 // v2.11: rule-blocked (T+1) orders, inline reason
  units: number                           // Σ filled units (only meaningful when fills.length <= 1)
  price: number                           // open price of the first fill (0 when no fill)
  amount: number                          // Σ ¥ notional filled; the review gate keys off > 0
  fee: number                             // Σ fees across fills
  weekPnlAbs: number                      // account mark-to-market at week close (incl. asset shocks)
  totalValue: number                      // 总资产 at week close
  totalPnlAbs: number                     // vs initialCapital
  initialCapital: number
  blockedReason?: string                  // legacy single-order inline reason (= blocked[0]?.reason)
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

// v2.2: independent romance state. It is presentation/narrative progression only and never
// contributes to mentor trust, awakening, finance-dynasty unlock, or intro victory.
export type LoveImpression = 'none' | 'ordinary' | 'good'
// v2.5: the love line's semester progression — 迎新晚会初次相遇(2+) → 期中图书馆偶遇(6+)
// → 期末跨年邀约(10+). Christmas is a reunion or first meeting depending on the stage.
export type LoveStage = 'none' | 'met' | 'knowing' | 'close'

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

// v2.1: weighted world event, independent of location. v2.3: + `text` + `unexpected`.
  // v2.4: + `choices` (becomes a 人生抉择 card) + `assetShock` (moves one asset's week close).
  // v2.6: + `wealthFlat` — flat 生活费 amounts for the ¥1,000 poor-student ledger.
export interface SpecialEvent {
  id: string
  label: string
  icon: string
  weight: number
  wealthPct: number
  delta: StatDelta
  text: string       // v2.3: required narrative — what actually happened, shown in the banner
  unexpected: boolean // v2.3: true = no-warning shock → banner shows "· 无预兆"
  choices?: SpecialEventChoice[]
  assetShock?: { assetId: string; pct: number }
  // v2.5: 贵人好感 — a story event where a benefactor notices you; each point raises the
  // office hit probability (MENTOR_FAVOR_HIT_BONUS), capped at MENTOR_FAVOR_MAX.
  mentorFavor?: number
}

export interface SpecialEventChoice {
  id: string
  label: string
  wealthPct: number
  delta: StatDelta
}

export interface SpecialEventResult {
  event: SpecialEvent
  wealthAbs: number
  altWealthAbs: number
  playerDelta: StatDelta // actual clamped change applied to the real trajectory
  altDelta: StatDelta    // actual clamped change applied to the parallel trajectory
}

export interface TimelineMilestone {
  year: number           // four-digit historical year, e.g. 1995/2014
  label: string
  detail: string
  icon: string
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
  pendingSpecialChoice: { event: SpecialEvent } | null // v2.4: choice-based 人生抉择卡, shown before the location card
  paper: PaperAccount                                  // v2.4: 模拟盘 paper-trading account (player); P&L lives here, NOT in wealth
  altPaper: PaperAccount                               // v2.4: the parallel-fate twin's paper account
  shockPct: Partial<Record<string, number>>            // v2.4: one-time asset price shocks this week (assetId → %)
  investUnlocked: boolean                              // v1.3: false until the turn-1 开户 beat resolves
  mentorUnlocked: boolean                              // v1.4: false until the library discovery beat (贵人办公室 cognition gate)
  pendingAssetPreviews: Record<string, Candle[]> | null // v1.3: mood-distorted K-line history (past turns only)
  pendingMarketNews: Record<string, MarketNews> | null  // v1.3: per-asset hot news, same lifecycle as the candles
  pendingMarketAdvices: Record<string, InvestAdvice> | null // v1.5: per-asset advice, same lifecycle as the candles
  reviewCredits: number                              // v1.6: reviewed-trade count — drives advice fidelity (REVIEW_BAND_CREDITS)
  track: TrackId | null                              // v1.6: 职业规划课 chosen 方向 (贵人信任 对口 check)
  retrackDone: boolean                               // v2.7: 贵人换向 — non-AI track gets ONE 改押 AI chance after the first mentor hit
  seenHints: string[]                                // v2.7: 新手渐进提示去重 — first-seen hint ids (T+1/BTC/市场温度) show once
  gymUnlocked: boolean                               // v1.7: 首次进健身房 办卡 beat (认知 ≥ 60 先 reveal 健身房; exchange gate 同为 derived cognition ≥ 60)
  relationshipTrust: number                          // v1.9: 金融世家 relationship line — hidden until that origin unlocks
  relationshipCrisis: number
  relationshipResolved: boolean
  loveImpression: LoveImpression                     // v2.2: Christmas state-derived impression
  loveReunion: boolean                               // v2.2: latches after the positive winter reunion choice
  loveStage: LoveStage                               // v2.5: none→met→knowing→close semester progression
  mentorFavor: number                                // v2.5: 贵人好感 0..MENTOR_FAVOR_MAX — raises the office hit prob
  paperGoal: number                                  // v2.6: 模拟盘翻盘目标 (小镇 ¥200,000 / 世家 ¥500,000); love goal is stage-derived
  unlockedAssets: string[]                           // v2.8: 渐进解锁资产 — 开户解锁 money_fund+bond; 导师/损友/骗子 beats 解锁其余
  tradingRealism: TradingRealism                     // v3.1 (Ch09): 模拟盘真实度自选 — 'real'(默认,全规则)/'novice'(免佣免T+1免策略)
  financeDynastyUnlocked: boolean                    // v2.0: latches when 金融世家 origin is unlocked (mentor hit)
  finished: boolean
}

export const INTRO_TURN_LIMIT = 17
export const CAMPUS_SEMESTER_WEEKS = 13
export const WINTER_BREAK_WEEKS = 3
export const PARALLEL_FATE_ORIGIN: Origin = 'finance_dynasty'
export const LOVE_FIRST_TURN = 2                      // v2.5: 迎新晚会 · 初次相遇
export const LOVE_SECOND_TURN = 6                     // v2.5: 期中 · 图书馆偶遇
export const LOVE_THIRD_TURN = 10                     // v2.5: 期末 · 跨年邀约
export const TOWN_PAPER_GOAL = 200_000                // v2.6: 小镇 模拟盘翻盘目标 (100k → 200k)
export const DYNASTY_PAPER_GOAL = 500_000             // v2.6: 世家 模拟盘翻盘目标 (300k → 500k)
export const MENTOR_FAVOR_HIT_BONUS = 0.12            // v2.5: 每点好感提升的办公室命中率
export const MENTOR_FAVOR_MAX = 4                     // v2.5: 好感上限 (小镇 0.1 → 最高 0.58)
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

**Investment (v2.4 spot-order model)**: 模拟盘 = a paper account (`PaperAccount` cash/positions/realizedPnl/initialCapital) seeded per origin (小镇 ¥100,000 / 世家 ¥300,000, `PAPER_INITIAL_CAPITAL`); trading P&L lives in the paper account, NOT in 财富. 7 products (`money_fund`, `bond`, `gold`, `index_fund`, `a_index`, `hk_index`, `btc`), each with `basePrice` (2015-semester-open), `preHistory` (40 deterministic 2014-plausible weekly returns), `daily` (5 deterministic daily moves/week), and `decimals`. One spot order per week (buy/sell/hold): `executeOrder`/`resolveOrder` charge a **per-product commission** `TRADING_RULES.*.feeRate` (v3.1 真实档: 货币/债券 0.01%, 指数 0.05%, 黄金 0.02%, A股 万三 0.03%, 港股 0.05%, BTC 0.1%; both sides) — replacing the flat `TRADE_FEE_RATE` 万三; and round via `roundUnits`; `resolveOrder` mechanically enforces T+1 (`PaperPosition.boughtTurn`), returning an empty fill + `InvestmentResult.blockedReason` on a same-turn sell. Hold is the explicit no-trade result: zero P&L, no review credit. Review ability remains cognition ≥60; only nonzero-position trades earn review credits (0/1/2/3+ → blind/noisy/clear/sharp). v2.8 progressive unlock: `GameState.unlockedAssets` starts `['money_fund','bond']`; the 导师/损友/骗子 guidance beats unlock gold/index_fund, a_index/hk_index, and btc. **v2.11 multi-order basket**: `invest(orders: DraftOrder[])` → `resolveOrders` executes a whole basket of `{assetId, side:'buy'|'sell', amount}` in **canonical ASSETS order** (not user add order), threading a running account through each fill so the T+1 gate and cash clamp read the mid-basket state; it returns `result.fills` (per-fill `OrderResult`) + `result.blocked` (per-blocked `BlockedOrder{reason}`), deriving `side` `'hold'|'buy'|'sell'|'mixed'` and keeping the legacy aggregate scalars (`units`=Σfills.units, `amount`=Σfills.amount, `fee`=Σfills.fee, `price`=first fill, `blockedReason`=blocked[0].reason). `resolveOrder` is now a thin wrapper over `resolveOrders` (empty basket = hold). `makeInvestment` mirrors the same basket on `altPaper` (parallel twin) for `investmentPnlAbs` only. The panel's 委托篮 lets a player add/withdraw/clear drafts before `确认 N 笔下单`; `invest([])` is the explicit one-click hold. No new rand source (resolveOrders/executeOrder never call rand). **v2.12 两步走强制**: the single-order fast path (`确认买入/卖出 ¥金额` executing exactly one asset immediately, no basket) is removed — every trade, including a single one, now goes 加入委托(提交) → 确认 N 笔下单(生效); the primary button is disabled while the basket is empty (label 「先加入委托,再确认」) and a 「①② 两步走」hint shows until the first draft lands. The 委托篮 itself is unchanged (add/update/✕/清空) — it just can no longer be bypassed, so a player can never mistake the paper account for a one-trade-per-week toy.

**v3.1 (Ch09) 真实度自选 + 策略层**: `GameState.tradingRealism` ('novice'/'real', default 'real') 是玩家的纸盘真实度设置; `resolveOrders`/`executeOrder` 收它为可选参数(默认 'real'),纯函数按它门控费率/T+1/策略。新手档免佣金(fee=0)+免 T+1+无策略选择;真实档 = 全规则。**策略层**(真实档): `DraftOrder.strategy` 'buy_hold'(默认) / 'ma_timing'(均线择时)。均线择时 = 当周内「开盘价买+收盘价卖」in-out 波段,在 `resolveOrders` 内当场闭合、不落 `PaperPosition`(避免与同资产买入持有持仓混淆); 趋势信号 = 开盘价 vs 近 4 周收盘均线(MA4, `endPriceAt` 序列, 确定性 0 新随机源); 上行才买(下行拦单「均线之下不接刀」), 统一放大器 `MA_TIMING_FACTOR`=1.3(择对多赚/假信号多亏); 认知 ≥60 解锁(`maTimingUnlockedFor`)。

**World events (v2.1)**: arrival trigger probability `0.55`; on hit, a second seeded draw selects by positive integer weights from 11 events. `delta` can move cognition/stamina/mood and `wealthPct` moves each trajectory from its own principal. Both trajectories use `applyStatDelta`; the result stores actual clamped deltas. The table contains both large positive breakthroughs and negative burnout/illness/market shocks. World-event rolls apply only during campus weeks 1–13; deterministic seasonal events own weeks 14–17.

**Calendar, love, and final encounter (v2.2, v2.5)**: weeks 1–13 keep the ordinary campus loop. v2.5 moves the love line INTO the semester: week 2+ forces `love_first_encounter` (迎新晚会), stage `met` from week 6+ forces `love_second_meeting` (期中图书馆), stage `knowing` from week 10+ forces `love_third_party` (期末跨年邀约; `love_third_accept` → `close`, raincheck stays `knowing`); teaching beats and the week-13 relationship closure outrank love, which rolls to the next available arrival. Every beat grades `loveImpression` from current state (cognition ≥60 and `Math.round((stamina + mood) / 2) ≥ 70` → good, else ordinary; good never downgrades). Week 14 forces `christmas_encounter` with title/text adapted to `loveStage` (`christmasContext`); week 15 forces `winter_growth`. Week 16 forces `winter_reunion` when `shouldReunite(loveImpression, loveStage)` — a good impression OR a 'close' semester stage — otherwise `winter_reflection`; choosing `love_keep_walking` latches `loveReunion=true`. Week 17 routes to the discovered mentor office (track persona `MENTOR_EVENTS_BY_TRACK`, favor-boosted `mentorHitProbFor`), or to the library presentation fallback `next_semester_mentor_blocked` when the entrance was never discovered. A discovered mentor uses the existing draw: AI track + cognition ≥60 gives 90% (`MENTOR_TRUST_HIT_PROB`); all other states keep the origin free-hit probability plus `MENTOR_FAVOR_HIT_BONUS × mentorFavor` (cap `MENTOR_FAVOR_MAX=4`, total capped 0.9; parallel twin always favor 0). The comparison is strict (`roll < probability`), so 0.89 hits and 0.9 misses at 90%. **v3.0 (Ch07): only a TRUSTED `mentor_hit` (AI track + cognition ≥60) awakens and unlocks the finance-dynasty origin (大觉醒); an untrusted hit is 中觉醒 (methodology + favor +1, no victory); the hit's cognition delta scales by 听懂质量 `mentorComprehensionFor` (30%/80%).** Love state never enters those calculations.

**人生目标 (v2.5, v2.6 改口径)**: the opening cinematic's second card establishes the goals. v2.6 贫困逻辑 splits the ledgers — 生活财富 = 生活费 (小镇 ¥1,000 / 世家 ¥300,000, `START_WEALTH`), 模拟盘 = 试炼场初始资金 (小镇 ¥100,000 / 世家 ¥300,000, `PAPER_INITIAL_CAPITAL`, explicitly independent of life wealth). The 财富目标 therefore reads the PAPER account: `GameState.paperGoal` 小镇 ¥200,000 (亏到 5 万再翻盘的 20 万) / 世家 ¥500,000 (证明你自己), verdict 达成 when `accountValue(paper) ≥ paperGoal`; progress is net-of-paper-capital (`paperGoalProgressFor`) so a drawdown clamps to 0% — the 5 万 深坑 reads as a floor. 小镇小钱 events use flat `wealthFlat` amounts (一等奖学金 ¥2,000 / 彩票 ¥50 / 装修款 −¥500) instead of percentages of a ¥1,000 base. The love goal is stage-derived (达成 when `loveStage === 'close' || loveReunion`). Goals are read-only presentation state; they never change any probability, delta, or unlock.

**贵人多元化 (v2.5)**: the office persona follows the chosen 方向 — ai 码农出身的技术前辈 / finance 券商营业部经理 / industry 制造业厂长 / academia 退休经济学教授, generic `MENTOR_EVENTS` fallback when `track === null`. Mechanics identical (hit/miss choice ids, eventMod +1, `mentorTrusted` flag); only title/text change. 贵人好感 events (`SpecialEvent.mentorFavor`, 5 town entries at +1 each: 图书馆的老教授/学长的内推/物理老师的孩子/世界级公开课/大厂面试通知) raise the base hit probability by `0.12` per point. The parallel-fate twin never inherits favor.

**Origin-aware event pools (v2.5)**: `specialEventsFor(origin)` — 小镇 keeps the 60-event 小镇 life pool (market 11 + friends 10 + hometown 12 + health 6 + small-money 9 + everyday 9 + big-breaks 3); 金融世家 runs swap the hometown/small-money/big-surprise slices for 16 世家 events (家族季度汇报会、父亲的电话、母亲的电话、家族信托分红、私人银行经理、董事会交锋、名媛圈、"不过是投了个好胎"、海归交换生夜聊、慈善晚宴签单、父亲住院、第一笔自己挣的钱、继承人之争短信、私募酒会真话、校门口的车、老宅照片), sharing the market shocks, friends, and health slices. Both pools keep `assetShock`/`choices`; trigger probability stays 0.55.

**Timeline (v2.2)**: static `LIFE_TIMELINE` anchors 1995 birth → 2001/2008/2011/2013 context → 2014 university/Christmas/winter break → 2015 next-semester opening. `TimelinePanel` highlights `player.turn` across 17 markers: 13 campus weeks, 3 winter-break weeks, and opening. It must display `历史背景 ≠ 投资建议`. Timeline data has no simulation side effects and must never change `eraMod`, ticks, news, or advice.

**End-game awakening diagnosis (v2.1.1)**: `SummaryScreen` receives the final `mentorUnlocked` and `track` alongside `player`. If `player.awakened` is false, it renders `尚未觉醒 · 原因` and derives actionable reasons from state: undiscovered mentor office, no career choice, non-AI direction, cognition below 60, and whether the player never attempted recognition or attempted it and missed. If awakened, it renders an explicit success notice. This UI must not mutate state or treat a dice-tier `awaken` as character awakening.

## 5. Verification gates

```bash
npx tsc -b --noEmit        # 0 errors — the gate, no test suite (matches 4_chunbai/6_patapon3D convention)
npm run build               # tsc -b && vite build, must succeed
npm run dev                  # localhost:5185, manual browser playtest via Playwright MCP:
                              #   load → 0 console errors → 17 full weeks → summary screen renders
                              # v1.2: plus seeded page.evaluate checks on window.__sim (DEV-only
                              # hook, store.ts): drawn event defined per arrival; forced mood
                              # 25/45/75 → pessimistic/rational/overconfident; forced-tier factor
                              # spot-checks (big_success boon ×1.5, awaken trap ×0)

# v2.9 (design 15) — 4 permanent probe scripts, run against `npm run dev` (port 5185):
#   node scripts/perf-probe.mjs      startup ≤1s + rAF frame gate (dice window p95 ≤ idle-baseline ×1.25) + 0 long tasks >50ms
#   node scripts/keyboard-probe.mjs  pure-keyboard walkthrough (Tab/Enter/arrows) through all 8 beats + slider arrow keys, 0 console errors
#   node scripts/contrast-probe.mjs  every leaf text node ≥3.0:1 vs effective background (0 FAIL across 7 beats)
#   node scripts/seeds10.mjs         10 seeds × 17 weeks, summary panel every run, 0 console errors
# v2.11 (design 17) — basket probes:
#   node scripts/basket-probe.mjs    multi-order 委托篮 UI: add 2 drafts → withdraw 1 before confirm → 1 fill;
#                                    add 2 drafts → 确认 2 笔 → 2 fills, 0 console errors
#   scripts/showcase.mjs §contract    resolveOrders pins (empty=hold / canonical order / mixed / T+1 block / Σ aggregates)
#   (each invoked via: npm exec --offline --yes --package=playwright -- node scripts/X.mjs)
# v2.12 (design 18) — 两步走强制: showcase.mjs / showcase-dynasty.mjs / marathon-probe.mjs 的每周买入
#   现走 加入委托 → 确认(不再点单笔快速路径); basket-probe.mjs 验证篮空时主按钮禁用 + 提示。
# v2.13 (design 19) — 任天堂式交互手感: scripts/interaction-probe.mjs 断言 --spring token 存在 +
#   .btn/.building/.btn-choice 的 hover 与 press(active)transform 各自生效(按压是独立于悬停的状态,
#   :active 把 transition-duration 翻到 60ms),0 console errors。
# v3.0 (design 20) — Ch07 贵人系统: scripts/mentor-probe.mjs 断言三契约 —
#   A 接住质量 (mentorComprehensionFor 50→0.3 / 70→0.8); B 觉醒 3 层级 (awakeningTierFor 未信任→mid
#   /信任→big; finishCoach 未信任 hit 不觉醒不解锁、信任 hit 仍觉醒+解锁+lastAwakeningTier);
#   C 觉醒双面性 (金融世家 restart 心态 75→70 一次性 + 体力 −5/回合, 小镇无此代价)。纯 sim, 0 console errors。
# v3.1 (design 21) — Ch09 投资策略库 + 真实度自选: scripts/strategy-probe.mjs 断言三契约 —
#   A 真实度自选 (novice 免佣 fee=0 + 免 T+1 / real 收费+T+1 / 缺省 realism=real); C 分品种费率
#   (btc feeRate > money_fund feeRate, 且 ≠ 旧万三一刀切); B 策略层 (均线择时 in-out 不持仓跨周,
#   趋势上行+tick正→放大 / 假信号→多亏 / 下行拦单「均线之下不接刀」/ 认知<60 禁用)。0 console errors。
# v3.1+ (P0 roadmap) — 验证门分级: `scripts/quick-gate.mjs` 是本环境可用的快速门 (纯 sim 驱动
#   window.__sim.checks, 无 UI 动画等待, 3 种子 × 17 周秒级, 断言相位/钳制/无 NaN); 重的 UI 回放探针
#   (smoke-seeds/seeds10/marathon) 在 headless Chromium rAF 降频下会超时, 留作有头环境的完整门。
```

## 6. File tree (new files this scope)

New: `package.json`, `vite.config.ts`, `tsconfig*.json`, `index.html`, `src/main.tsx`, `src/App.tsx`, `src/styles.css`, everything under §2's tree. Nothing modified outside `8_lifegame/` except root `AGENTS.md` (append project entry, per repo convention that every top-level project is listed there).
