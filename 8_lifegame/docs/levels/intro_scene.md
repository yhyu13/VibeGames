# Intro Scene Plan — Campus Zone (小镇做题家 / 金融世家 × Web 2.0)

## 1. One line + why

一个 13 周校园学期：玩家选择地点，骰子改变事件结果，模拟盘把“认知 → 复盘 → 试错 → 建议”变成可学习的循环。小镇做题家通过贵人认可赢得开局并解锁金融世家；金融世家则用“关系不是资产”的情感危机回应资源优势。

## 2. Current scope

- 1 era: Web 2.0，`eraMod = 0`。
- 1 zone: campus，8 个地点；3 个城市地点只以锁定天际线出现。
- 2 playable origins: 小镇做题家默认；`mentor_hit` 解锁金融世家。
- 13 weeks，7 个 mocked products（货币基金、债券、黄金、指数基金、A股指数、港股指数、BTC），每个产品 13 个确定性 tick 与 13 组新闻。
- 1995 出生 → 2014 年 19 岁进入大学的历史时间线只提供时代语境，不改变市场 tick、新闻或建议。
- Scripted coach，无实时市场 API，无实时 LLM。

## 3. Scene contract

每周流程：选目的地 → 到达并抽事件 → 掷骰子 → 选事件 → 模拟盘 → 复盘/教练。第一周先开户，不交易；第 14 周状态进入总结。

地图在旅行前公开：

- 可见建筑：短收益/风险 chip + 完整的主要有利/代价说明 + 可能事件名。
- 未解锁建筑：只显示解锁条件，不泄露名称、收益或事件。
- 城市区：保持 `???`，不可进入。

投资成长线：

1. 认知达到 60，解锁复盘能力。
2. 只有非零仓位交易会形成复盘心得；`不投资,保留现金` 永远不增加复盘数。
3. 复盘数 0/1/2/3+ 对应 blind/noisy/clear/sharp 建议。
4. 投资面板必须持续显示阈值、当前进度、复盘数与下一档建议。
5. 配置比例是保证金；名义敞口 = 配置比例 × 杠杆；盈亏 = 保证金 × 杠杆 × 当周 tick。
6. 货币基金/债券/黄金/指数基金最高 2×，A股/港股最高 3×，BTC 最高 5×；亏损最多为保证金，耗尽时显示强制平仓。

世界随机事件：

- 每次到达有 55% 概率触发一次加权事件，命中时再抽一次事件表。
- 事件池是 **49 个**（v2.3）：市场冲击（牛市/熊市/黑天鹅）、认知跃迁/身心突破、透支/生病等代价，以及大量 **小镇生活惊喜** —— 朋友（室友泡面/高中同桌/社团前夜）、家庭与家乡（妈妈的电话/全村的目光/家里的装修款/物理老师的孩子）、健康（夜跑/流感疫苗/熬夜报警）、小钱（奖学金/笔记卖断/老师的信封）、日常运气（橘猫/免单券/捡到钱包/断网早睡）和 3 个罕见大惊喜（大厂面试/小镇拆迁/小程序被外校借走）。
- 每个事件带一行叙述文字 `text`，横幅显示“发生了什么”，让每一次冲击都像一个故事节拍，而不是纯数字变化；`unexpected` 标记真正的“无预兆”冲击（市场波动、突发崩溃），只有它们才显示“· 无预兆”后缀，日常生活事件靠文字本身传达意外。
- 突破事件权重 6/6/4/4/3（认知跃迁/作息正轨/三周啃题/世界级公开课/同频伙伴），单次触发概率约 7%，保证扩池后突破感仍在。
- 允许数月内出现“超过多年积累”的大幅成长，但认知、体力、心态仍夹在 `[0,100]`。
- v2.4：带 `choices` 的事件（朋友借钱/家里的装修款/刮中彩票）以「人生抉择」卡片形式出现，在地点事件卡之前让玩家做决定；带 `assetShock` 的事件（牛市→A股+4% 等）会真实推动对应资产的本周收盘价。
- v2.4：模拟盘为独立纸质账户，初始资金按出身（小镇 ¥100,000 / 世家 ¥300,000）；现金买卖具体资产，持仓跨周持有，平均成本法计盈亏，佣金万三；K线支持 日K/周K/月K/半年K/年K 切换。

## 4. Implementation map

- Pure contracts/data: `src/core/types.ts`, `src/core/constants.ts`, `src/core/data/`。
- Turn reducer: `src/core/simulation/Simulation.ts`。
- Seeded randomness: `src/engine/rng.ts`。
- Store/DEV verification hook: `src/store.ts`。
- World UI: `CampusMap.tsx`, `HUD.tsx`。
- Beat UI: `DiceRoller.tsx`, `EventModal.tsx`, `InvestPanel.tsx`, `AICoachPanel.tsx`, `ParallelFateCard.tsx`。
- Historical context: `TimelinePanel.tsx`, `src/core/data/timeline.ts`。
- End state: `SummaryScreen.tsx`, `FinanceDynastyChoice.tsx`。`尚未觉醒` must list state-derived reasons (贵人入口、未来方向、认知 60、是否争取过认可); awakened runs show explicit success.

## 5. Verification gates

```bash
npm run typecheck
npm run build
npm exec --offline --yes --package=playwright -- node scripts/showcase.mjs
git diff --check
```

The showcase must pin 13-week asset/news lengths, all seven product and leverage caps, margin-capped liquidation, explicit no-invest/no-review behavior, advice bands, cognition-60 review gating, 55% weighted breakthrough/setback coverage, 1995→2014 timeline semantics, location-guide coverage, relationship sequencing, mentor awakening/unlock, actionable `尚未觉醒` reasons plus awakened success rendering, trust clamping, all 13 browser weeks, origin-aware summary rendering, and zero console errors.

## 6. Perfect definition

- **Visual:** locked content remains unreadable; every visible location states what it helps and what it risks.
- **Feel:** dice outcomes have distinct effects; each week resolves without dead clicks.
- **Learning:** the review threshold is impossible to miss before trading.
- **Performance:** 60fps CSS/DOM scene, no network dependency.
- **Replayability:** stable 13-week structure, seeded/random variation, origin-aware restart.

## 7. Known conflicts + decision points

| # | Conflict/gap | Decision | Trace |
|---|---|---|---|
| D1 | No origin↔home-era numeric lookup exists | Freeze intro `eraMod` at 0 | 2026-08-09 |
| D2 | Source investment assumes long-range real market data | Use deterministic mocked curves; live API deferred | TDD.md §4 |
| D3 | Source coach assumes a live LLM | Use scripted 班主任 lines | TDD.md §2 |
| D5 | Ring board did not read as a campus | Site buildings geographically; player chooses destination; dice scales events | design 02 |
| D6 | Fixed one-event locations lacked texture | Weighted opportunity/neutral/trap tables | design 02 |
| D7 | Mood did not affect investment judgment | Mood distorts preview; cognition narrows distortion | design 02 |
| D8 | Investing had no narrative cause and leaked future ticks | Week-1 account-opening beat; history-only K-lines; noisy headlines | design 03 |
| D9 | Mentor office was visible too early; dice lacked impact | Library discovery gate; rebuilt dice animation | design 04 |
| D10 | Advice and asset selection were fragmented | One panel with all assets and per-asset advice | design 05 |
| D11 | Nobody should start with prediction ability | Advice depends on reviewed trades; review unlocks at cognition ≥60; mentor trust requires AI track + ability | design 06 |
| D12 | Stats were scattered; gym/exchange needed clear roles | Two visible indicators; gym restores mind/body; exchange is high-risk cognition growth | design 07 |
| D13 | Mentor recognition should be the victory and unlock a contrasting origin | `mentor_hit` awakens/unlocks finance dynasty; typed “关系不是资产” route; opposite-origin parallel fate | design 08 |
| D14 | Eight turns were too short; thresholds and campus value were too hidden | 13 weeks; 13 ticks/news; relationship weeks 3/7/11 with week-13 closure; visible review and typed location guidance | TDD.md v2.0 |
| D15 | Growth felt too slow and the three-asset simulator too narrow | 55% weighted breakthroughs/setbacks; seven products; margin-based leverage and liquidation; explicit no-invest; 1995→2014 contextual timeline | design 09 |
| D16 | End-game `尚未觉醒` gave no explanation | Summary diagnoses missing mentor discovery, career direction, cognition-60 ability, and recognition attempt; awakened runs get explicit success | TDD.md v2.1.1 |
| D17 | 17-week calendar + independent love line | 13 campus + 3 winter + opening; Christmas/reunion/re/ection beats; love never touches awakening | TDD.md v2.2 |
| D18 | The 11-event shock pool felt like market news, not a 小镇 life | Expand to a 49-event pool of friends/family/health/small-money/everyday surprises, each with a one-line `text`; banner shows the story | TDD.md v2.3 |
| D19 | 模拟盘没有初始资金 / 没法买卖具体资产 / 面板不像交易面板 / 数据从第 1 周才开始 | Per-origin 模拟盘账户 (初始资金 ¥100k/¥300k), spot buy/sell of specific assets with persistent positions + avg-cost P&L, real 2014-pre-history price levels, K线周期 日/周/月/半年/年, `assetShock` so world events move prices, 3 choice-based 人生抉择 events | TDD.md v2.4 |

## 8. Status

v2.3 implementation target: one complete 13-week campus semester with the seven-product leveraged simulator, explicit cash preservation, a 49-event 小镇 life-surprise pool (friends/family/health/wealth/everyday + rare big breaks, narrative `text` on every shock), 1995→2014 context, deterministic contract checks green, browser route green, and no changes outside `8_lifegame/` included in the scoped feature diff.
