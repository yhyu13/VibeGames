# JOURNEY — 8_lifegame（股神模拟器）intro scene 打磨之旅

> 一份双栏时间轴，记录「我」与「你」在把 1 个 intro scene 打磨到完美的过程中，各自做了什么。
>
> - **我** = 掌舵的人：定方向、给反馈、拍板取舍、立下铁律。
> - **你** = 并肩的人：审计、设计、写代码、自测、写文档、提交。
>
> 共同的信条（起点即定）：**1 个完美的 intro scene > 100 个 80% 的关卡**。停止条件只有一个 —— **我说停**。在那之前，无限循环。

---

## 风险与待办（前置高亮）

- **付费贵人 / 贵人流转 / Ch09 投资策略库** —— 出范围，留 M2+（Ch07 贵人系统 era；付费贵人缺 Token 系统，贵人流转缺多时代）。
- **smoke-seeds / seeds10 在本环境 headless 超时** —— rAF 降频导致多种子回放太慢，非代码问题（单种子 showcase/dynasty 均跑完 0 error）；需有头环境重跑（Ch07 era）。
- **Ch07 收紧了胜利条件** —— 破契约：任何 mentor_hit 都是胜利 → 仅信任命中（认知≥60+AI）才是大觉醒。攻略 §15 推荐路径天然命中信任，不受影响；但低认知侥幸命中从「直接通关」变成「只得中觉醒」（Ch07 era）。
- **Ch09 投资策略库** —— 下一个 spec + test（待办）。

---

## 0. 方法论先于代码（项目之前）

| 我 | 你 |
|---|---|
| 提出「砍到 1 个场景，把它打磨到完美」的理念；整理了 `intro-scene-until-perfect` 这个 skill，把直觉变成可复用的工作流 | 把理念抽象成「标准流程（audit→critic→enumerate→plan→execute）+ intro-scene 4 阶段（single-scene→vertical slice→polish→infinite loop）」 |
| 定下 3 件套铁律：**设计 doc / 美术 doc / 代码 doc** 必须与代码同 commit，缺一件等于没做 | 把 3 件套落成 §5.7 的强制 deliverable，并写下「反模式 6：doc 与代码 drift」作为每次提交的自我检查 |
| 在 VibeGames 仓库里并排养了多个游戏（hotlineShanghai / phasewalk / 8_lifegame …），各自跑各自 | 为每个项目遵守各自的范围边界，本仓只动 `8_lifegame/` |

---

## 1. 项目起源 —— 股神模拟器

| 我 | 你 |
|---|---|
| 想做「股神模拟器」：出身决定命运 → 校园四年 → 模拟盘试炼 → 觉醒 | 定下技术栈：Vite 6 + React 19 + TypeScript(strict) + zustand 5，C.A.T 架构（core 平台纯净 / engine / store / components） |
| 要求「1 个 intro scene 就要能演全部核心机制」 | 把 17 周的日历、骰子、事件、模拟盘全部压进一个 intro scene |

---

## 2. v1.x —— 机制打底

| 我 | 你 |
|---|---|
| 要校园地图可点移动、有事件、能掷骰子；贵人办公室要认知门槛 | 实现 click-to-move + token 滑行、每栋楼 3 事件加权表、骰子 juice（缓动 + 逐字键入） |
| 要求「所有数据收敛到两个统一指标：认知 + 身心健康」，不要散装数值 | 把情商并进认知，实现 mood→信息质量（悲观/理性/亢奋）、双指标体系 |
| 要金融世家可解锁、有专属事件池、有关系线 | 实现 origin-aware 事件池（小镇 60 / 世家 16）、typed 关系线（疑虑→金钱→破裂→收尾） |

---

## 3. v2.x —— 真实化 + 新手教学

| 我 | 你 |
|---|---|
| 拍板「贵人换向」：非 AI 方向在第一次得到指点后，解锁一次改押 AI 的机会 | 实现 `retrackDone` 门 + 浅拷贝 choices（绝不原地改事件常量） |
| 拍板「真实交易规则」：T+1 / 涨跌停 / 佣金 / 最小单位，分资产类别 | 实现 `TRADING_RULES` 表，T+1 机械执行，涨跌停做教学说明（周频 mock 绑不了日 ±10%） |
| 要「?」帮助手册 + 属性卡 + 市场温度 + 渐进提示，给金融新手逐步解读 | 实现 `TradingHelpPanel`、资产属性卡、`marketTemperatureFor`（确定性派生，不加新随机源）、`seenHints` 渐进提示 |
| 拍板「贫困逻辑」：生活费与模拟盘分账，穷学生本能满仓要说破 | 实现 `START_WEALTH` 与 `PAPER_INITIAL_CAPITAL` 分账、小钱用 flat 金额、纸面目标读模拟盘 |

---

## 4. polish days —— 全天打磨（v2.8.1 / v2.9 / v2.10）

| 我 | 你 |
|---|---|
| 下「全天 polish」指令（design 14 / 15 / 16），一路到「完美」 | 三轮全天审计：6 视角 findings → 性能/键盘/对比度/种子探针 → 像素级视觉核验 + a11y + 深水区稳定性 |
| 反复标记「颜色非唯一」「种子边界没人测」「性能没人实测」这些硬缺口 | 关掉三个硬缺口：蜡烛/价格方向加形状/前缀第二线索（a11y 1.4.1）、`layout-probe`/`marathon-probe` 永久探针、`formatYuan` NaN 修复 |

---

## 5. v2.11 —— 多笔委托篮

| 我 | 你 |
|---|---|
| 问：「模拟盘还是只能交易一次？可以交易提交，确认前可以撤回，每个交易品」 | 先用 Workflow 做 49 项评审，确认：**是，此前每周只能下一笔** |
| 开 ultracode（token 不设限，求最完备正确的答案） | 合成最终设计：委托篮 + canonical 成交顺序 + running account 贯穿 + `side:'mixed'` |
| （全程保持铁律：不提问、不加随机源、探针只读） | 实现 `resolveOrders`（按 ASSETS 固有顺序逐笔执行，T+1 门 + 现金钳制对中间态生效）；`resolveOrder` 变薄包装 |
| —— | 委托篮 UI：加入/更新/✕取消/清空/确认 N 笔下单；篮空 = 一键不操作；主按钮保留单笔快速路径（旧探针零改动） |
| —— | 新探针 `basket-probe` 首次点击单个投资行，踩出 **真实布局 bug**：`.invest-rows` 被挤到 95px，属性卡盖住债券行 |
| —— | 修复布局（`min-height:200px` + `overflow-y:auto`），跑 13 道门全绿，写 3 件套 doc，原子提交 `2ab28a3` |

---

## 6. v2.12 / v2.13 —— 两步走 + 任天堂手感（2026-08-15/16）

| 我 | 你 |
|---|---|
| 要投资交易「两步走」强制（先加委托篮再确认），防误点 | 移除单笔快速路径，主按钮永远=「确认 N 笔下单」，篮空 disabled +「①② 两步走」提示 |
| 要交互手感学任天堂（按钮 vivid、有确认感） | `--spring` 回弹 token + hover 浮起 / active 下沉 / 60ms 按压；纯 CSS 零 JS 逻辑改动 |

---

## 7. 文档对账 —— 废弃入 old/（2026-08-30）

| 我 | 你 |
|---|---|
| 指出「8_lifegame 很混乱，标准来自 *.pdf」；要找出废弃文档 + 错误内容，废弃进 old/ | 用 pymupdf 提取 3 份 PDF 文本，逐条对照现有文档与代码 |
| —— | 诊断：版本漂移 10 处（TDD/AGENTS/GDD/intro_scene/journey/art 的 header、杠杆、13周、N8 残留）+ 3 份一次性 day-plan + 死代码 `maxLeverage` |
| 拍板「全部执行（推荐）」 | 3 份 day-plan `git mv` 入 old/；10 处版本漂移就地修正；删除死字段 `Asset.maxLeverage`（types + 7 处数据） |
| —— | 自玩浏览器验证，抓到 2 个真漂移：健身房解锁（攻略说宿舍办卡，实为认知≥60+健身房办卡）+ 骰子档位双标签（失手 vs 失败），修复后 0 console error |

---

## 8. Ch07 贵人系统 —— v3.0（2026-08-31）

| 我 | 你 |
|---|---|
| 问「下一阶段是什么」 | 调查后推荐 Ch07 贵人系统（GDD 标注 next document + 贵人原语已埋），你拍板 |
| 要「draft spec and test」，然后「run 8 hours 自主」 | 写 `docs/design/20-ch07-mentor-system.md` + `scripts/mentor-probe.mjs`（red-first）；按 dev-loop 走完 goal→spec→critic→实现→test→文档 |
| —— | critic #1（spec，fresh-context）抓 3 blocking：§C 统计字段引错（体力非心态）、探针结构性不可能转绿、缺 trusted-hit 正向断言 —— 全修 |
| —— | 实现 3 机制：接住质量（听懂 30%/80%，twin 按自己认知）+ 觉醒 3 层级 + 觉醒双面性（金融世家 restart 心态−5 一次性 + 体力−5/回合） |
| —— | **破契约**：旧「任何 mentor_hit 都是胜利」→ 新「仅信任命中（认知≥60+AI）才是大觉醒」；AGENTS.md §5 同步 |
| —— | critic #2（实现，fresh-context）抓 2 blocking：方法论只实现一半（补 reviewCredits+1）、spec 体力/心态自相矛盾、无 UI 读 tier（AICoachPanel 补中/大觉醒 note）—— 全修 |
| —— | 全门绿：tsc 0 + build + mentor-probe + showcase 小镇/dynasty 回放 + 4 个 DOM 探针，0 console error；demo 总结屏「本局已觉醒」未变 |

---

## 9. 贯穿全程的约定（我们共同的合同）

| 我定的铁律 | 你的执行方式 |
|---|---|
| **不提问** —— 别问，直接做 | 用文档和代码自证，从不用「要不要我做 X」打断 |
| **改代码必带 doc 同 commit** | 每次改代码，3 件套（设计/美术/代码）同步进同一个 commit |
| **不加新随机源** —— 种子确定性不破 | `resolveOrders`/`executeOrder` 永不调 `rand()`，rand 只在既定两处消耗 |
| **事件常量浅拷贝** —— 绝不原地改 | 换向/解锁全部 `{...event, choices:[...]}` 拷贝，杜绝跨种子状态泄漏 |
| **探针只读** —— 观察者，不碰 GameState | 探针经 `window.__sim` 读状态、驱动 DOM，从不 mutate 游戏状态 |

---

## 10. 尾声 —— 循环仍在继续

| 我 | 你 |
|---|---|
| 还没说停 | 继续观察 → 找问题 → 改 → 验证 → 再观察 |

> 这段旅程没有「完成」。它是 **无限 polish loop**：每一次你踩出一个真 bug、跑绿一道门、补齐一份 doc，intro scene 就离「完美」近一寸。下一寸，等下一轮。
