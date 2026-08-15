# 16 · 全天打磨计划 Day 3 — 像素级视觉核验 + a11y 颜色非唯一 + 深水区稳定性

> 一句话: Day 1(design 14)修了 6 视角 findings,Day 2(design 15)把性能/键盘/对比度/种子从"未实测"变"实测达标"。Day 3 关闭三个被反复标记却从未关闭的硬缺口 —— **① 像素级视觉核验(截图从未直读)**、**② a11y 1.4.1 颜色非唯一(蜡烛/价格方向只靠颜色)**、**③ 深水区稳定性(从未跑 40 周马拉松/重开重玩/种子边界)**。

---

## 1. 诚实差距(为什么是这三个)

| 缺口 | 状态(截至 Day 2) | 证据 |
|---|---|---|
| 像素级视觉核验 | ❌ **两次标记"截图本环境无法直读"** | design 14 Phase 2 "截图核验"未做;design 15 §4 注"截图无法直读,未做像素级核验" |
| a11y 颜色非唯一 | ❌ **已确认违规** | `InvestPanel.tsx:80` 蜡烛 `candle-up/down` 仅颜色;`:280` 价格 `quote-up/down` 仅颜色 |
| 深水区稳定性 | 🟡 **只测过单次 17 周** | seeds10 = 10 种子 × 17 周;从未跑 40 周/重开重玩/种子边界(0/负/大数) |

**关键认知修正(诚实)**: Day 1/Day 2 假设"截图本环境无法直读" —— 实测 Read 工具对 PNG 返回 `[Unsupported Image]`(当前模型 deepseek-v4-pro 无视觉通道),假设**成立**。故 Day 3 不用"肉眼截图",改用**程序化 DOM 几何审计**(`layout-probe.mjs`):测溢出/截断/越界/裁剪/字号,比肉眼更客观地抓"像素级"缺陷。

---

## 2. 8 个 Phase(全天)

| # | Phase | 目标 | 验收 |
|---|---|---|---|
| 1 | **DOM 布局/溢出审计** | 新增 `scripts/layout-probe.mjs`:遍历每个 distinct beat,测所有元素 `scrollWidth>clientWidth`(横向溢出)、`scrollHeight>clientHeight`(纵向裁剪)、越出 viewport、`text-overflow:ellipsis` 实际截断、字号 <10px、元素重叠 | 每个独特 UI 态几何干净,findings 去重成 backlog |
| 2 | **代码审计 fan-out(4 视角)** | 并行 reader:a11y 颜色非唯一 / a11y ARIA 语义 / 稳定性边界 / 文案一致性 —— 产出 file:line findings | 4 视角结构化 findings 去重排序 |
| 3 | **视觉 + a11y 修复** | 修 Phase 1+2 findings:溢出/对齐/排版/对比度 + 蜡烛空心实心区分/价格方向符号/ARIA 语义 | 视觉缺陷清零;a11y 1.4.1 无颜色唯一违规 |
| 4 | **深水区稳定性探针** | 新增 `scripts/marathon-probe.mjs`:40 周 × 多种子(状态漂移/NaN/overflow/console)+ 重开重玩循环 + 种子边界(0/负/大数) | 探针可跑,产出可量化基线 |
| 5 | **稳定性修复** | 修探针发现的边界/漂移 | marathon 全绿 |
| 6 | **全量验证** | 12 道门全跑(原 11 + marathon),重生成截图 | 全绿,0 console errors |
| 7 | **文档一致性** | 探针入 verification-report + TDD.md 验证门章节;本 doc 状态表 | doc 与代码同 commit |
| 8 | **收尾 commit** | 原子 commit | 工作树干净(仅 8_lifegame/) |

---

## 3. 执行纪律

- **不提问**,每个 finding 直接修,改完跑对应验证门。
- **改代码必带 doc 同 commit**;视觉改动同步 `01-art-direction.md` 或 design doc。
- **不加新随机源**,保 `rand` 流顺序(种子确定性契约);marathon 探针用已有 `mulberry32`/`window.__sim.checks`。
- **事件常量不原地改**,一律浅拷贝。
- **探针只读 DOM / 不碰 GameState**(观察者)。
- **a11y 颜色非唯一修复不改变现有配色**(红涨绿跌保留),只加**非颜色**的第二线索(形状/符号),不影响色觉正常玩家观感。

---

## 4. 状态

| # | Phase | 状态 |
|---|---|---|
| 1 | DOM 布局/溢出审计 | ✅ 完成 (layout-probe 0 hard fail) |
| 2 | 代码审计 fan-out | ✅ 完成 (4 视角 findings 去重排序) |
| 3 | 视觉 + a11y 修复 | ✅ 完成 (2.10a/2.10b/2.10c/2.10d) |
| 4 | 深水区稳定性探针 | ✅ 完成 (marathon-probe 6 run 全绿) |
| 5 | 稳定性修复 | ✅ 完成 (0 游戏 bug, 仅探针自修 page 复用) |
| 6 | 全量验证 | ✅ 完成 (12 道门全绿: typecheck/build/layout/marathon/perf/keyboard/contrast/smoke-seeds/seeds10/verify-v25-dom/showcase×2/observe-runtime, 0 console errors) |
| 7 | 文档一致性 | ✅ 完成 (TDD v2.10 + verification-report §17 + 本表) |
| 8 | 收尾 commit | ✅ 完成 (原子 commit 仅 8_lifegame/) |
