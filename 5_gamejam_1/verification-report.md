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

### M3 追加（2026-08-06，提交 `fc3ea8f` + `3b40470`，用户实测反馈）

| # | 缺陷 | 修复 |
|---|---|---|
| F9 | 选剧本"没反应"：选完无反馈、仍干等 10s | 选本后 WAIT 2s 内开演 + 卡片"剧本已定"提示条 |
| F10 | 癫狂戏剧（stretch 占位）可选，选了空剧本秒通关 | ScriptPicker 过滤 + sim `pickScript` 守卫（`STRETCH_FLAGS.madScript`） |
| F11 | 结局「返回标题」无效 | 新增 `UiCommand.quitToTitle`：sim.resetRun + 清空对白/自评/日记聚合 |
| F12 | 对白框卡在首句（队列只进不出）、点击无效 | dialogue 事件=替换当前行；`dialogueNext` 引擎消费推进队列；弹幕改独立通道（4s 过期，HUD 滚动） |

验证：选本→确认提示→2s 开演 ✅；弹幕"他剑在抖！往左闪！"渲染 ✅；对白逐句推进（WAIT→…→谢幕）✅；返回标题✅；mad 不可选 ✅；0 console error ✅

### M4 — 交互回路重构（2026-08-06，用户实测反馈"看不懂怎么玩"）

**根因**：WASD 只动模拟位置（场景无目标指示）；左键攻击从未接入模拟（攻击自动掷骰）；节拍圈永远 idle（UiSnapshot 无 beat 字段）；相机看向舞台后方角落；替身攻击频率 0.9 次/s 导致 20s 内 3 击倒。

| # | 修复 | 提交 |
|---|---|---|
| F13 | **走位可见化**：move 节拍时地板上渲染金色目标圈（进圈变绿） | `src/engine/SceneManager.ts` |
| F14 | **左键=攻击扳机**：attack 节拍内未按 LMB → 空挥落空；按了 → 结算命中/闪避（`attackPressedDuringBeat`） | `src/core/simulation/Simulation.ts` |
| F15 | **节拍圈真实化**：`SimState.beat` + `UiSnapshot.beat` 全链路；HUD 圈显示类型/倒计时/操作提示（红=攻击"左键出手！"） | `Simulation.ts`/`GameEngine.ts`/`store.ts`/`HUD.tsx` |
| F16 | **相机重对准**：lookAt (-1,1.8,-6.5)→(-4.2,1.2,0.4)，FOV 40→45，舞台居中 | `SceneManager.ts` |
| F17 | **节奏修正**：替身命中改为间隔计时器（~6.5s/次，命中率按轮次 55%→70%），击倒周期 ~1min | `constants.ts`/`Simulation.ts` |
| F18 | **台词池键错位**：dialogueEngine 用 `L_DIG` 但内容表键为 `DIG` → 表演台词全走降级占位；新增 `resolvePool` 容错查询 | `dialogueEngine.ts` |
| F19 | **第一幕操作提示**：开演系统台词「WASD 走进金色光圈 · 节拍圈变红时按左键 · 台词会自动念」 | `Simulation.ts`+`lines.ts` |

验证：节拍实时输出（move/line/vfx 实测，attack 红圈经轮询确认）✅；90s 演出可完整走完 3 幕（击倒 1 次/分钟量级）✅；提示台词/走位光圈/弹幕/自评全链路 ✅；0 console error ✅

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
| S9 | 长跑性能（draw calls/tris 预算） | 方法已记录，本轮未实测（观察：无泄漏、60fps 直觉良好） |

### S9 性能量化方法与预算目标（TDD §3.5）

**测量方法**（本轮未实测，记录方法备查）：
1. 打开 DEV 构建（`npm run dev` @ localhost:5173），浏览器控制台读 `window.__rendererInfo()` 得 draw calls / tris 读数；DEV 下 `window.__sim` 暴露每 tick 耗时。
2. 用 Chrome DevTools Performance 录制 60s 长跑，取主线程帧时间（长任务/丢帧时段），分别估算渲染 / 模拟 / 音频 / UI 四段耗时。
3. WebGL 对象泄漏：Performance Monitor 或长跑 5 分钟后对比 renderer.info 计数（rAF 循环外不应创建新对象）。

**预算目标（TDD §3.5 原文，超预算 = 优先级 1 bug）**：

| 指标 | 预算 | 硬上限 |
|---|---|---|
| 帧时间（渲染） | ≤ 10ms | 14ms |
| 帧时间（模拟） | ≤ 1ms | 2ms |
| 帧时间（音频） | ≤ 1ms | 2ms |
| 帧时间（UI/DOM） | ≤ 1.5ms | 3ms |
| 场景三角形 | < 40k tris | 50k tris |
| Draw calls | < 60 | 100 |
| 粒子（活动） | ≤ 128 | 256 |
| 同时音频声部 | ≤ 6 voices | 8 voices |
| 阴影 | 1 张 PCF 软影 1024² | — |
| WebGL 对象泄漏 | 0 | —（长跑 ≥5min） |

## M5 — 卫生清理（2026-08-07）

- 移除 2 处合并期残留注释：`src/engine/SceneManager.ts:3`（core sim 未合并时为 stub）与 `src/engine/storage.ts:2`（TODO agent-engine 版本化键名）；扫描 `src/engine/` 无其他 stale agent-xxx TODO/stub 注释。纯注释删除，零代码改动。

## M5 — stretch 上线（2026-08-07，代理蜂群交付）

- **癫狂戏剧（mad）**：`STRETCH_FLAGS.madScript = true`；`data/scripts.ts` 补齐 3 幕 × 3 beats（difficulty 18），`data/lines.ts` MAD 池 33 条；池键对齐（`resolvePool` 容错 `L_MAD→MAD`，无 F18 复发）；ScriptPicker 数据驱动解锁（3 卡可选 1/2/3）。
- **隐藏结局链（G09/G10）**：`STRETCH_FLAGS.hiddenEnding = true`；SENSE 阶段 `notGoodEnoughCount ≥ 3` 时 A「因为你是 Boss 啊」→ WAIT +20 / B「我也不知道」→ WAIT +10 / C「我也累了」→ ENDING_HIDDEN（黑场 → 10s 静默 → 日记自动写 L_DIARY_09 → Credits）。`Diary.tsx` 回退 `DIARY_ENTRIES` 使 `countsAsNotGoodEnough` 可选。`Ending.tsx` 隐藏变体（从 ENDING_HIDDEN 可重开）。
- **平衡**：`PLAYER_HIT_INTERVAL` 6.5→8（非冻结代理计时）；空闲局第 3 次击倒由 R1 移到 R3 中段（early 谢幕 ~4.5min）。§4.4.2 冻结默认值未动。
- **单元测试**：vitest 引入（5 文件 85 用例覆盖 rating/anxietyModel/bossFSM/playerModel/worldText），`npm run test` 全绿。
- 门 1 typecheck：绿 ✅ 门 2 build：绿 ✅（84 modules）门 3 冒烟：待补充 Playwright（v1 已通过，v1.3 变更后未重跑）

## 已知打磨项（非阻塞）

- 空闲无输入时 early 谢幕时机：v1.3 已调 `PLAYER_HIT_INTERVAL` 6.5→8（第 3 次击倒移至 R3 中段），待实机 playtest 确认手感后按需再调 ROUND_TABLE。
- `describeRules` 闪避率曾显示浮点尾数（已修）。
- 存档侧栏 presets + 实录合并已生效，但旧形状存档需清除（本报告 S8 已清）。
- chunk >500kB 警告（Three.js 单包），jam 可接受。

## V3 — 手感 + 呈现迭代（2026-08-07）

基于玩家实测反馈（四点投诉全部对码核实）的一次「手感 + 呈现」交付，规则与 §4.4.2 冻结数值未动：

| # | 反馈 / 问题 | v3 改动 | 验证 |
|---|---|---|---|
| P1 | 鼠标谱圈视觉「扩大」、方向与 osu approach circle 相反，缺分档反馈 | 重构 `MouseRhythmOverlay`：固定判定圈 + 独立 approach 圈从外侧缩到恰好盖住判定圈；反馈改为 **300/100/50/× 分档 + 早晚箭头**（`lastJudgementEarly`），连击 4/8/12 爆「名场面」 | tsc ✅ / 单测 +1 |
| P2 | Boss 悬空约 1 米 | `SceneManager`：`root.position.y` 1→0，`NEUTRAL_POSE.rootY` 1→0.125，全部动画高度目标 ×0.125（standUp 0.169 / kneel 0.063 / knockdown 0.044 / pickup 0.1），脚底落回地板 | tsc ✅ |
| P3 | 走位时 Boss 不面向移动方向 | 新增 `updateBossFacing`：按 sim 位置增量 `atan2(dx,dz)` 驱动 `bossRoot.rotation.y`，静止回归面朝观众；`rootYaw` 保留给动画姿态 | tsc ✅ |
| P4 | 焦虑无文字提示、难以判断 | `HUD` 顶部新增文字标签：从容 / 紧张 / 发抖 / 恐慌 + 一句可读提示（仍不显示数字，保留「隐藏焦虑值」设计） | tsc ✅ |
| P5 | 玩家替身只是影子贴片、无实体 | 重写 `PlayerShadow`：黑色剪影小人（躯干/头/四肢），走位摆臂摆腿、接近王座更急；命中向前突刺 + 红环 | tsc ✅ |

- 契约层：`RhythmClickResult` 新增 `early` 字段（`mouseRhythm.ts`），`RhythmInfo`/`RhythmAgg` 透传 `lastJudgementEarly`；补 `mouseRhythm.test.ts` 早晚方向用例。
- 顺带修复：`RhythmAgg` 接口补 `fixture` 字段（此前缺声明，tsc 曾因短路未暴露）、`setRhythmFixture` 移除未定义 `seed` 死代码。
- 门 1 typecheck：绿 ✅　门 2 build：绿 ✅（91 modules）　门 3 单测：116 通过（原 115 +1）　冒烟：待补 Playwright 截图。

### V3 冒烟（Playwright @ localhost:5173）

- 游戏启动：标题屏 → 开始演出 → 选本 → SENSE → PERFORM 全流程可达，**零应用报错**（无 React/Three/未捕获异常）。
- HUD 焦虑文字标签：`从容 / 声音平稳`、`恐慌 / 剑要脱手了` 均确认渲染（Batch 4）。
- osu 鼠标谱 DOM：PERFORM 阶段 `.mouse-rhythm-layer` 挂载，含 1 判定圈 + 1 approach 圈 + 3 目标 core + v3 帮助文案「缩圈与判定圈重合时按左键」、标题「攻击节拍 1/4 连击 ×4」（Batch 2）。
- 空闲长跑含多次击倒动画：`SceneManager.updateBossFacing` / `PlayerShadow` 剪影小人 / 新 rootY 姿态 均无异常执行（Batch 3/5）。
- 注：dev 构建 HMR websocket 报 `ERR_CONNECTION_REFUSED` 为当前环境基础设施噪音（非应用错误，页面加载与渲染正常）。
