# 14 · 全天打磨计划 — Intro Scene Until Perfect

> 一句话: 从 v2.8(渐进投资引导 + 贵人去固定化)继续,把 intro scene 从"能玩且验证全绿"推到"每次玩短时间内有哇瞬间"。本轮 = 1 个完整工作日的 8 个 phase,自动执行、不提问,直到 4 维"完美"达标。

---

## 1. 完美定义(4 维 checklist,唯一验收标准)

| 维度 | 达标标准 |
|---|---|
| **视觉** | 短时间内有"哇"瞬间;暖校园 `#F4E4C1` vs 冷锁定 `#3A3D42` 的冷暖对比保留;锁定 teaser / K线 / 开场电影观感到位;动作真实(掷骰减速、打字机、归因级联) |
| **手感** | 每个输入都有反馈;失败不可怕(重开干净);买入/卖出流无摩擦;键盘可走全程;hover/active/focus 态齐全 |
| **性能** | 60fps;长时间稳定;启动 ≤1s;无布局抖动 |
| **可重玩** | 种子无关(确定性契约不变);分数/进度反馈清晰;无 bug 残留 |

---

## 2. 8 个 Phase(全天)

| # | Phase | 目标 | 验收 |
|---|---|---|---|
| 1 | **全量审计(6 视角)** | 6 并行 reader(视觉/手感/叙事/正确性边界/a11y/文档一致性)产出结构化 findings(file:line + severity) | findings 覆盖全 6 维,去重排序成 backlog |
| 2 | **视觉打磨** | 修视觉 findings: 对比度 ≥4.5:1、间距/排版一致、动画 juice、锁定 teaser 精修、K线渲染、开场电影 | observe-runtime contrast 干净 + 截图核验 |
| 3 | **手感打磨** | 修交互 findings: hover/active/focus、按钮反馈、掷骰 juice、买卖流、键盘导航 | 全按钮有反馈,键盘可走全程 |
| 4 | **叙事/文案打磨** | 修文案 findings: 教练台词、事件文本、引导 beat、开场电影、"三人行必有贵人"主题贯通 | 文案一致、无 typo、主题贯通 |
| 5 | **正确性/边界打磨** | 修 bug findings: 负生活费显示、零持仓、T+1、渐进解锁边界、dynasty 引导节奏 | smoke-seeds + observe-runtime 边缘干净 |
| 6 | **a11y + 性能** | WCAG 审计、reduced-motion、对比度、帧率/启动 | a11y 无 violation,启动 ≤1s |
| 7 | **全量验证** | 7 道门全跑,修回归,重生成截图 | typecheck/build/smoke/verify-v25-dom/showcase×2/observe 全绿 |
| 8 | **收尾 commit** | 3件套 doc 同步 + 原子 commit | 工作树干净,commit 含 doc |

---

## 3. 执行纪律

- **不提问**,每个 finding 直接修(低风险单行/局部改),改完跑对应验证门。
- **改代码必带 doc 同 commit**;若 finding 只影响视觉(styles.css)同步 `01-art-direction.md` 或 design doc。
- **不加新随机源**,保 `rand` 流顺序(种子确定性契约)。
- **事件常量不原地改**,换向/引导一律浅拷贝。

---

## 4. 状态

| # | Phase | 状态 |
|---|---|---|
| 1 | 全量审计 | ✅ 完成(6 视角 findings → backlog) |
| 2 | 视觉打磨 | ✅ 完成(涨跌方向/对比度/文本压暗) |
| 3 | 手感打磨 | ✅ 完成(disabled 三态/focus-visible/按压态) |
| 4 | 叙事/文案 | ✅ 完成(导师第一课/世家引导/全角标点) |
| 5 | 正确性/边界 | ✅ 完成(formatYuan/注释日期) |
| 6 | a11y + 性能 | ✅ 完成(焦点管理/reduced-motion/语义标题/aria) |
| 7 | 全量验证 | ✅ 完成(7 道门全绿) |
| 8 | 收尾 commit | ✅ 完成(3件套 doc 同步 + 原子 commit) |
