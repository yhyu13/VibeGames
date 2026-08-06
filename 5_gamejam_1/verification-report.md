# 《Boss 的焦虑》verification-report

> 每次里程碑同步更新本报告（仓库 4_chunbai 惯例）。

## M0 — 契约冻结（2026-08-06）

- 提交：`8b1da6d` Frozen contracts（types/constants/events/store/world + 模块 stub）
- 门 1 tsc：绿 ✅
- 内容：TDD v1.0 §5 契约逐字转写，§4.4.2 数值表入 `constants.ts`，SimApi/UiStore/SimEvent 冻结。

## M1/M2 — 代理批次合并（2026-08-06）

- 合并提交：`2bea7bf`(content) · `103ce5f`(audio) · `2be1b61`(engine) · `9aa21a9`(ui) · `98de0b8`(core)
- 代理交付：
  - agent/core `3a4fac0` + `6c283fb`：6 纯模块 + Simulation 编排器（1225 行）
  - agent/content `f1a6e04`：L_* 台词池 123 条 + 2 剧本 18 beats + 日记/档案/弹幕/评分轴
  - agent/engine `a6311c7`：程序化王座厅 + Boss rig 11 动画 + Tween + postfx + 编排器
  - agent/audio `400aa20`：14 种合成音效 + 4 音乐模式 + 声部抢占/ducking（零音频文件）
  - agent/ui `49da23e`：13 组件 + store 桥接
- 门 1 tsc：绿 ✅ 门 2 build：绿 ✅（84 modules）

## M3 — 集成修复（2026-08-06，提交 `c4931eb`）

冒烟测试（Playwright @ localhost:5173）发现并修复：

| # | 缺陷 | 修复 |
|---|---|---|
| F1 | `uiCommand` 事件无人监听 → startRun 不生效，卡 MENU | `createGame` 注册 document 监听 → `engine.queueUi` |
| F2 | 对白显示 line ID（`L_AMB_01`）而非文本 | engine 侧 `findLineText` 从 LINE_POOLS 解析文本 |
| F3 | 台词 ID 不匹配（sim 硬编码 `L_AMB_01` vs data `L_AMB_001`） | 改用 `pickLine` 取池 / 修正硬编码 ID |
| F4 | `resetRunState` 清零 stats → 跨局统计丢失 | 移除重置；`createGame` 传入 `Simulation(storage)` |
| F5 | archive 存成单对象非数组 + 占位符未填充 | `buildArchiveEntry` 返回数组、填 `{round}/{script}/{verdict}` |
| F6 | 旧存档形状导致 engine 初始化崩溃 | 防御性 `Array.isArray` 守卫 |
| F7 | 结局屏"再来一轮"无效（engine 仅接受 MENU 态 startRun） | 接受 ENDING_NORMAL 态 startRun + resetRun |
| F8 | 结局时残留旧对白队列 | phase 变更清空 dialogueAgg |

## 门 3 冒烟清单（Playwright，v1 通过）

| # | 步骤 | 结果 |
|---|---|---|
| S1 | 标题屏 + `__gameManifest`（world/rules/state）+ 0 console error | ✅ |
| S2 | 开始 → intro 跳过 → WAIT（L_AMB 中文自语） | ✅ |
| S3 | WAIT→SENSE（脚步/影子逼近） | ✅ |
| S4 | SENSE→PERFORM（dignity 自动选本、焦虑动态、beat 执行） | ✅ |
| S5 | PERFORM→EVALUATE（10s 自动提交） | ✅ |
| S6 | EVALUATE→DIARY（8s 自动写入） | ✅ |
| S7 | DIARY→ENDING_NORMAL（early 谢幕 + Credits） | ✅ |
| S8 | 刷新后存档保留（stats/archive/diary）+ "再来一轮"重开 | ✅ |
| S9 | 长跑性能（draw calls/tris 预算） | ⏳ 未正式量化（观察：无泄漏、60fps 直觉良好） |

## 已知打磨项（非阻塞）

- 手测无输入时 3 次击倒即 early 谢幕，R1 即结局 —— 难度偏快，playtest 后调 ROUND_TABLE 伤害/闪避。
- `describeRules` 闪避率曾显示浮点尾数（已修）。
- 存档侧栏 presets + 实录合并已生效，但旧形状存档需清除（本报告 S8 已清）。
- chunk >500kB 警告（Three.js 单包），jam 可接受。
