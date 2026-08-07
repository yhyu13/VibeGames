# 《Boss 的焦虑》— 技术设计文档（TDD）v1.0

> 本文件是**冻结的工程契约（Frozen Contract）**：所有 coder 代理必须按本文件实现，接口签名与默认数值一律以本文件为准。与本文件冲突的实现视为 bug。
> 设计层权威：`docs/design/01-concept-core-loop.md`（下文简称 **01**）；概念层：`boss-anxiety-gdd.md`（下文简称 **GDD**）。

---

## 0. 封面与变更日志（Cover & Change Log）

| 项 | 值 |
|---|---|
| 游戏名 | 《Boss 的焦虑》（Boss Anxiety） |
| 团队 | VibeGames jam 小队（KIMI3 DDD 多代理工作流） |
| 文档角色 | 技术设计 / 契约所有者（Technical Design / Contracts Owner） |
| 引擎 | 自研轻量：Three.js（渲染）+ Vite（构建）+ Web Audio（音频） |
| 平台 | Web（桌面 Chrome / Edge 优先；1080p） |
| 周期 | 72h game jam（3 天） |

| 版本 | 日期 | 作者 | 变更摘要 |
|---|---|---|---|
| v0.1 | 2026-08-06 | TDD Agent | 初稿：GDD v0.1 + 01 v0.1 对账、冻结架构、FSM、契约速写、代理拆分 |
| v1.0 | 2026-08-06 | TDD Agent | 首个冻结版（本版）；后续每次更新递增版本号并追加一行 |
| v1.1 | 2026-08-06 | 主代理 | 冒烟修复 8 项（F1–F8，见 verification-report.md M3）：uiCommand 桥接、台词 ID 对齐、stats/archive 持久化形状、结局重开、防御性守卫。契约签名与 §4.4.2 数值未变 |
| v1.2 | 2026-08-07 | 主代理 | 文档同步：§2.6 设计文档 02–05 已产出（v1.8 art 迁移）；重建 dist 修正与源码脱节。契约签名与 §4.4.2 数值未变 |
| v1.3 | 2026-08-07 | 主代理 | stretch 上线：`STRETCH_FLAGS.madScript/hiddenEnding = true`（癫狂戏剧 + 隐藏结局链 G09/G10，01 §5.3/§6）；平衡调整 `PLAYER_HIT_INTERVAL` 6.5→8（空闲局第 3 次击倒由 R1 移到 R3 中段，verification-report M5）；新增 vitest 单元测试套件（5 文件 85 用例，`npm run test`）。§4.4.2 冻结默认值未变（非冻结代理计时已调，§2.6 记录） |

**冻结规则**：v1.0 起，§5（契约速写）与 §4（FSM 转移表）中的签名、状态名、默认数值**不得擅自修改**；需要调整时必须：① 更新本变更日志；② 在 §2.6 记录裁决理由；③ 通知全部代理重读本文件。

---

## 1. 目录（Table of Contents）

- §0 封面与变更日志
- §1 目录
- §2 引言（目的 / 技术目标 / 目标平台 / 外部工具 / 团队角色 / 时间线 / 设计层对账与裁决）
- §3 技术总览（命名规范 / 技术栈表 / 数据布局 / DEV 钩子 / 性能预算 / 分析平台）
- §4 游戏机制即架构（机制→模块映射 / 主循环 / 全局 FSM 规格 / Boss 内部 FSM 规格 / 状态转移表）
- §5 契约速写（冻结，真实 TS）
- §6 模块文件树（完整 src/ 布局）
- §7 每 Tick 数据流
- §8 构建创建（里程碑 M1/M2/M3 + 验收标准 + dist 提交约定）
- §9 资源管理与文件格式
- §10 分支政策
- §11 工具指令
- §12 风险登记册
- §13 验证计划
- §14 代理任务拆分（原子级，文件所有权白名单）

---

## 2. 引言（Introduction）

### 2.1 目的（Purpose）

玩家扮演 RPG 最终 Boss，在 5–8 分钟循环中经历 `等 → 察觉 → 上场 → 自评` 四轮演出，体验"我是否被看见"的焦虑叙事。游戏无 Game Over；每轮必有结果，循环持续到结局条件。

### 2.2 技术目标（Technical Goals）

1. **C.A.T 硬规则**：`core/` 平台纯净（零 THREE / 零 DOM / 零 zustand 导入），side effect 只以 `SimEvent` 类型事件泄漏；`engine/` 是平台适配层。
2. 60 FPS @ 1080p 稳定（预算见 §3.5），低端集显可跑。
3. 零资产文件：全部程序化几何 + Web Audio 合成（沿用仓库 4_chunbai 惯例）。
4. DEV 可观测性：`window.__gameManifest()`（世界即文本）+ `window.__sim`。
5. 全部内容为 JSON 形态数据（`src/core/data/*.ts`），零硬编码进逻辑。

### 2.3 目标平台（Target Platform）

| 项 | 最低 | 推荐 |
|---|---|---|
| 硬件 | 2015+ 集显笔记本 | 独显 / 近五年台式 |
| 浏览器 | Chrome / Edge 108+（WebGL2、AudioContext 自动播放策略已处理） | Chrome 120+ |
| 分辨率 | 1280×720 | 1920×1080（预算基准） |
| Node（构建期） | ≥ 18（Vite 6 下限） | 20.19+ / 22 LTS |

### 2.4 外部工具与团队角色（External Tools & Roles）

| 工具 | 用途 | 角色 |
|---|---|---|
| Vite 6 + React 19 | 构建 / UI 覆盖层 | agent-ui |
| Three.js 0.170 | 场景 / 程序化建模 / 后处理 | agent-engine |
| Web Audio API | 全部音频合成（零文件） | agent-audio |
| zustand 5 | UI 状态（仅 UI） | agent-ui |
| Tailwind 3.4 | HUD/菜单样式 | agent-ui |
| Playwright（MCP） | 冒烟验证 | agent-qa（集成/验证） |
| Tweakpane（可选，仅 DEV） | 调参面板，默认值 = 01 数值 | agent-core（devtools 桥接） |

团队：agent-content（内容数据）/ agent-core（纯核心）/ agent-engine（渲染适配）/ agent-audio（音频适配）/ agent-ui（UI 覆盖层）/ agent-qa（集成验证、无文件所有权）。

### 2.5 时间线（72h Timeline）

| 日 | 里程碑 | 交付 | 签核人 |
|---|---|---|---|
| D1 | M1 | 场景 + Boss 立绘 + IDLE 循环（§8.1） | agent-qa + 用户 |
| D2 | M2 | 战斗 + 焦虑模型 + 2 剧本（§8.2）；**D2 晚上强制 playtest**（GDD §8） | 用户 |
| D3 | M3 | 自评表 + 日记 + 结局 + 音频全量 + 调手感（§8.3） | 用户 |

### 2.6 设计层对账与裁决（Reconciliation & Adjudication）

设计文档共 5 份：`docs/design/01-concept-core-loop.md`（核心循环）、`02-content-narrative.md`（台词/内容）、`03-art-direction.md`（美术）、`04-audio-direction.md`（音频）、`05-ux-pacing.md`（UX 与节奏），01 为设计层权威，GDD 被 01 数值细化处**以 01 为准**（01 §3.3 已声明 GDD 五项焦虑数值全部验证保留）。以下为技术层裁决：

| # | 冲突点 | 裁决（技术负责） |
|---|---|---|
| R01 | GDD §6.1 技术栈（GSAP / Howler / Tone.js / Tweakpane） | **全部替换**：GSAP → `src/engine/Tween.ts` 手写 lerp/timeline 工具；Howler/Tone.js → `AudioManager` + `audio/synth.ts` Web Audio 合成；Tweakpane → 仅 DEV 可选依赖，不进生产栈 |
| R02 | 01 状态名小写（wait/sense/…） vs 本文档大写 FSM | 采用 **大写 `GamePhase` 枚举**（本文件冻结名）；等价映射表见 §4.2.1，01 命名仅作注释引用 |
| R03 | 01 §10.2 接口名 `PlayerSurrogateSnapshot` | 更名 **`PlayerPresence`**（本文件冻结名）；字段一一对应，01 命名在注释保留 |
| R04 | 01 §9"HP 归零 → evaluate" vs 01 §7"死亡不终止轮次" | 击倒 1–2 次 → HIT → RECOVER → 继续 PERFORM；**第 3 次击倒 → 强制收尾进 EVALUATE**（提前谢幕结局，§4.3.4），与 01 §8 一致 |
| R05 | 01 §9 freeMode/recover 为顶层状态 vs 本文件 9 态 FSM | freeMode 降为 **PERFORM 的内部子模式**（`performMode: 'scripted'|'freePlay'`），recover 由 Boss 内部状态 HIT/RECOVER 表达（§4.3.2） |
| R06 | 剧本 3 癫狂戏剧（01 §5.3 ⛔ cut-first） | 数据结构支持 3 本（`SCRIPT_COUNT ≥ 2` 自适应），**M2 只交付 dignity + tragic**；mad 内容 + 隐藏结局（01 §6 ⛔）为 M3 stretch，由 `STRETCH_FLAGS` 门控。**v1.3 已交付**：mad 3 幕 × 3 beats + MAD 台词池 33 条，`STRETCH_FLAGS.madScript = true` |
| R07 | 隐藏结局（01 §6）⛔ stretch | `ENDING_HIDDEN` 状态常驻枚举（廉价），触发链被 `STRETCH_FLAGS.hiddenEnding` 门控；砍掉时日记回落为 1 条预设自动写入（01 §6 降级路径）。**v1.3 已交付**：G09/G10 链（A/B/C 选项 → WAIT+20/+10 或 ENDING_HIDDEN 黑场→静默→Credits），`STRETCH_FLAGS.hiddenEnding = true` |
| R08 | 端口 | 5173（`vite.config.ts` 已锁定；4_chunbai 用 3000，无冲突） |
| R09 | 01 §12.1 Tweakpane 默认值约束 | 采纳：`constants.ts` 默认值必须等于 01 数值表（§4.4 全表抄录为冻结默认） |
| R10 | 玩家替身控制 | 采纳 01 §10：人类不操作替身；替身由 `core/simulation/playerModel.ts` 模拟（种子 RNG，可复现 playtest） |

---

## 3. 技术总览（Technical Overview）

### 3.1 命名规范（Naming Conventions）

| 类别 | 规则 | 示例 |
|---|---|---|
| 文件 | core/engine 用 `camelCase.ts`；组件 `PascalCase.tsx`；内容数据 `camelCase.ts` | `bossFSM.ts`、`RatingSheet.tsx`、`scripts.ts` |
| 类型 / 接口 / 枚举 | `PascalCase` | `BossState`、`GamePhase` |
| 函数 / 变量 | `camelCase` | `advanceBeat`、`anxiety` |
| 常量（调参） | `UPPER_SNAKE_CASE`，集中在 `core/constants.ts` | `BAND_PANIC_MIN` |
| 内容 ID | 沿用 01 §11：`前缀_编号`，唯一 | `L_DIG_101`、`L_DIARY_02` |
| 状态名 | 全局 FSM 全大写；Boss 内部 FSM 全大写；01 小写名仅注释引用 | `GamePhase.WAIT`、`BossInnerState.IDLE` |
| 注释 | 中文注释；公共接口必须有一行用途说明 | — |

编码标准：TypeScript **strict**（`tsconfig.app.json` 已开 `noUnusedLocals/noUnusedParameters/noFallthroughCasesInSwitch`）；`as const` 优先；禁止 `any`（如确需则局部注释豁免并交 agent-qa 复核）；禁止硬编码魔法数（一律进 `constants.ts` 或 `data/*.ts`）。

### 3.2 技术栈表（Stack Table — 已锁定版本）

| 依赖 | 版本 | 用途 | 所属代理 |
|---|---|---|---|
| vite | ^6.0.0 | 构建 / HMR / dev server 5173 | agent-ui（构建脚本） |
| typescript | ^5.6.0 | 类型检查门（strict） | 全员 |
| @vitejs/plugin-react | ^4.3.0 | React 插件 | agent-ui |
| react / react-dom | ^19.0.0 | UI 覆盖层 | agent-ui |
| @types/react / @types/react-dom | ^19.0.0 | 类型 | agent-ui |
| three / @types/three | ^0.170.0 | 渲染 / 后处理 | agent-engine |
| zustand | ^5.0.0 | UI 状态（仅 UI 层） | agent-ui |
| tailwindcss | ^3.4.0 | UI 样式 | agent-ui |
| autoprefixer / postcss | ^10.4.0 / ^8.4.0 | CSS 管线 | agent-ui |
| tweakpane（**可选**） | ^4.x | 仅 DEV 调参；不写进生产 import 图（由 devtools 动态 import） | agent-core |
| node | ≥ 20.19（推荐 22 LTS） | 运行期 | — |
| npm | ≥ 10 | 包管理（**不新装依赖**，`node_modules` 已提交惯例同 4_chunbai，见 §10） | — |

> 注：`package.json` 已就绪，**禁止**任何代理擅自增删依赖；确需新依赖 → 向 TDD 契约所有者提变更（§0 冻结规则）。

### 3.3 数据布局（Data Layout）

**运行时内存布局**：
- 模拟权威状态：`Simulation` 内部（`core/simulation/Simulation.ts`）——单真相源。
- UI 可见状态：`src/store.ts`（zustand）——仅由 `GameEngine` 的事件同步驱动，**禁止 UI 直接改模拟**。
- 持久化（localStorage，引擎适配层 `engine/storage.ts` 读写，`core/types.ts` 冻结键名）：

| StorageKey | 键名 | 内容形状 | 说明 |
|---|---|---|---|
| `diary` | `bossAnxiety.v1.diary` | `DiaryEntry[]` | 日记条目（含"我不够好"计数）；跨会话保留 |
| `archive` | `bossAnxiety.v1.archive` | `ArchiveEntry[]` | 挑战者档案：预设 10 条 + 每轮生成的实录档案 |
| `stats` | `bossAnxiety.v1.stats` | `PersistedStats` | `totalRounds / notGoodEnoughCount / seenEndings[] / lastVerdicts[]` |
| `settings` | `bossAnxiety.v1.settings` | `{ muted: boolean; volume: number }` | 音频设置 |

- 持久化读写只发生在：`SimEvent persist` 事件、EVALUATE/DIARY 提交点、结局落定。版本化键名（`.v1`）为 schema 演进预留。

**存档兼容策略**：读取失败 / 形状不符 → 静默回退默认值并覆盖，**不抛错**。

### 3.4 DEV 钩子（DEV Hooks）

```ts
// engine/devtools.ts — 仅 import.meta.env.DEV 时注入
declare global {
  interface Window {
    __gameManifest?: () => string;  // worldText.buildPromptContext(sim) 全文
    __sim?: unknown;                // Simulation 实例（只读调试）
  }
}
```
- `__gameManifest()` 返回：`describeWorld()` + `describeRules()` + `describeEntities()` + 当前模拟状态快照（world-as-text，为 AI/调试可读）。
- 生产构建（`import.meta.env.DEV === false`）不注册、不引用。

### 3.5 性能预算表（Performance Budget）

基准 60 FPS @ 1080p（16.67ms/帧）。**超预算 = 优先级 1 bug**，M 里程碑验收硬指标。

| 指标 | 预算 | 硬上限 | 备注 |
|---|---|---|---|
| 帧时间（渲染） | ≤ 10ms | 14ms | 单 pass 主渲染 + 后处理 |
| 帧时间（模拟） | ≤ 1ms | 2ms | 固定步 1/60，最多 5 步积压 |
| 帧时间（音频） | ≤ 1ms | 2ms | Web Audio 节点调度 |
| 帧时间（UI/DOM） | ≤ 1.5ms | 3ms | 仅覆盖层，React 不渲染游戏内容 |
| 场景三角形 | < 40k tris | 50k tris | GDD §6.4：场景 <50k |
| Boss 网格 | < 6k tris | 8k tris | 单 mesh + 顶点动画，无骨骼 |
| 材质实例 | < 15 | 20 | 复用 MeshStandardMaterial（GDD §6.5） |
| Draw calls | < 60 | 100 | 合并几何 / 实例化粒子 |
| 粒子（攻击 VFX / 尘埃） | ≤ 128 活动 | 256 | Points 实例化，不逐个 Mesh |
| 阴影 | 1 张 PCF 软影 1024² | — | 仅烛火主光方向 |
| 后处理 | Bloom（轻）+ Vignette | — | 无 SSR / 无 SSAO / 无动态天空 |
| 同时音频声部 | ≤ 6 voices | 8 voices | 优先级抢占（§引擎音频说明） |
| WebGL 对象 | — | 泄漏 0 | rAF 循环外禁用 resize 创建 |

**分析平台**：Chrome DevTools Performance + `renderer.info`（devtools 暴露 draw calls/tris 读数）；DEV 下 `__sim` 暴露每 tick 耗时。

---

## 4. 游戏机制即架构（Game Mechanics as Architecture）

### 4.1 机制 → 模块映射（Mechanic → Module Map）

| 机制（01 章节） | 核心模块 | 适配模块 | 备注 |
|---|---|---|---|
| 核心循环 Wait→Sense→Perform→Evaluate→Diary（01 §2） | `Simulation.ts`（GamePhase FSM） | `GameEngine.ts`（节奏驱动） | §4.2 |
| 焦虑值模型（01 §3） | `anxietyModel.ts`（S01–S13 / R01–R11 / 分带） | `AudioManager`（走音代理）+ `SceneManager`（手抖动画） | §4.4 冻结数值 |
| 表演评分（01 §4） | `rating.ts`（A1–A4 计算 + 总评 + verdict） | `RatingSheet.tsx`（UI）+ `Dialogue.tsx`（L_EVAL 反应） | §4.5 |
| 剧本选择与执行（01 §5） | `scriptDirector.ts` + `data/scripts.ts` | `HUD.tsx`（beat 提示圈）+ `InputManager` | §4.6 |
| 出戏 / 自由发挥（01 §5.4） | `bossFSM.ts`（BREAK_CHARACTER） | 灯光（暖色）+ 观众席阴影 | §4.3.2 |
| 玩家抽象（01 §10） | `playerModel.ts`（PlayerPresence 生成） | `PlayerShadow.ts`（影子贴片）+ 脚步声合成 | 概念非实体 |
| 自我关怀 / 隐藏结局（01 §6 ⛔） | `Simulation.ts`（计数链） | `Dialogue.tsx`（选项 A/B/C）+ `Ending.tsx` | `STRETCH_FLAGS` 门控 |
| 弹幕（01 §7） | `playerModel.ts`（调度） | `HUD.tsx`（CSS 滚动文本） | S07 焦虑源 |
| 日记（01 §2.1） | `Simulation.ts`（提交点） | `Diary.tsx` + `storage.ts` | R09/R10 |
| 情感节拍表（01 §7） | 各模型按事件表挂钩 | 灯光 / 音乐 / 台词联动 | 见 §4.4 注释 |

### 4.2 主循环（Main Loop）

```
requestAnimationFrame → GameEngine.tick(now)
  ├─ 输入采样：InputManager.poll() → BossControls + UiCommand
  ├─ 玩家替身：playerModel.sample() → PlayerPresence（每帧，轻量）
  ├─ 固定步：accumulator += dt；while (acc >= 1/60 且 steps < 5) Simulation.update(fixedDt)
  │     └─ 内部：anxiety → bossFSM 转移 → scriptDirector 推进 → dialogueEngine → events[]
  ├─ 事件分发：GameEngine.dispatch(events) → SceneManager / AudioManager / store.sync
  ├─ 渲染：SceneManager.render() → postfx → present
  └─ DEV：__sim 快照 + renderer.info 读数
```
固定步 1/60；积压 > 5 步时丢弃多余时间（spiral-of-death 保护）。PAUSE 阶段不推进模拟、音频 suspend、弹幕/脚步冻结（01 §9 任意→pause）。

### 4.3 全局 FSM 规格（GamePhase — 冻结）

#### 4.3.1 状态表

| 状态 | 01 等价 | 允许 | 禁止 |
|---|---|---|---|
| `MENU` | menu | 标题 / 开始按钮 / 简介字幕（≤8s 可跳过） | 模拟推进 |
| `WAIT` | wait | Boss 独坐自语（L_AMB）、档案 UI、剧本选择（1/2/3） | 攻击、玩家逼近 |
| `SENSE` | sense | 脚步渐强、影子逼近、首见事件 S04、弹幕可能刷新 | 剧本执行 |
| `PERFORM` | perform / freeMode | 剧本执行；`performMode: 'scripted'|'freePlay'`；内部含 HIT/RECOVER 子行为 | 自评 |
| `EVALUATE` | evaluate | 自评表（10s 倒计时）、A4 自动揭示、玩家涂鸦评分 | 攻击 |
| `DIARY` | diary | 日记选择（8s）或自动写入降级 | 攻击 |
| `ENDING_NORMAL` | ending A/B/early | 谢幕文 + 纪念物 / 空房间 / 提前谢幕 | 输入 |
| `ENDING_HIDDEN` | hidden ⛔ | 黑场 → 沉默 10s → 灯光熄灭 → Credits | 输入 |
| `PAUSE` | pause | Esc 恢复 / 重开 | 一切模拟推进 |

#### 4.3.2 全局状态转移表（From, To, Condition, Action — 冻结）

| # | From | To | Condition | Action |
|---|---|---|---|---|
| G01 | `MENU` | `WAIT` | 点击"开始"（或跳过 intro 后） | 初始化 Run（R1：焦虑 30，seen 0，HP 100）；播放 L_AMB_01；灯光 20%；发 `phase` + `dialogue` 事件 |
| G02 | `WAIT` | `SENSE` | Wait 计时 ≥8s（最短保护）且（倒计时到 10–12s 或音频 cue 早触发） | 存档 UI 隐藏；`playerModel.beginApproach()`；首见 S04 `+8`；盔甲整理动画；发 `sound(step)` |
| G03 | `SENSE` | `PERFORM` | `PlayerPresence.distanceToThrone < 12m` | 剧本开演：`performMode='scripted'`；stage 0 / beat 0；首个 beat 提示亮起 |
| G04 | `PERFORM` | `EVALUATE` | 任一：阶段 3/3 完成 ｜ 第 3 次击倒（`knockdownCount ≥ 3`）｜ 阶段计时器 90s 强制收尾 | 计算 `RoundResult`；`rating.compute()`；自评表弹出；发 `rating` / `dialogue`(L_EVAL) 事件 |
| G05 | `PERFORM`(freePlay) | `EVALUATE` | 出戏脚本剩余时间播完 ｜ 第 3 次击倒 | 同 G04（剧本完成度按出戏时点冻结） |
| G06 | `EVALUATE` | `DIARY` | 自评提交（确认按钮）或 10s 倒计时到 | 应用 R05–R08 焦虑修正；玩家涂鸦评分概率判定（总评 ≥4★ 时 30%）；写 `RoundResult` 到 archive/存档；发 `persist` |
| G07 | `DIARY` | `WAIT` | 第 1–3 轮且无结局条件 | 应用 R09/R10；`notGoodEnoughCount` 计数；nextRound 升级（§4.4.1 轮次表）；发 `phase(WAIT)` |
| G08 | `DIARY` | `ENDING_NORMAL` | 第 4 轮结束 ｜ 提前谢幕条件已满足（第 3 次击倒收尾后） | 结局分支：`seen ≥ 60` → variant `curtainA`；否则 `curtainB`；击倒 3 次 → variant `early`；灯光随 seen 定格；发 `phase` |
| G09 | `SENSE` | `ENDING_HIDDEN` | `STRETCH_FLAGS.hiddenEnding` 且 `notGoodEnoughCount ≥ 3` 且对话选项选 C「我也累了」 | 黑场渐入 10s 沉默 → 日记自动写入 L_DIARY_09 → 灯光全熄 → Credits（01 §6 链） |
| G10 | `SENSE` | `WAIT` | 同 G09 前置但选 A「因为你是 Boss 啊」/ B「我也不知道」 | 本轮按"未演出"计（A：焦虑 +20；B：+10）；计数保留；回 WAIT |
| G11 | 任意 | `PAUSE` | Esc | 音频 suspend；弹幕/脚步冻结；`runState.paused=true` |
| G12 | `PAUSE` | 任意 | Esc（恢复） | 音频 resume；继续原状态 |
| G13 | `PAUSE` | `MENU` | 菜单点"重新开始" | 重置 Run（持久化数据保留） |

> 冻结说明：G09/G10 的隐藏链在 `STRETCH_FLAGS.hiddenEnding = false` 时**不可达**（分支不注册）。

### 4.4 Boss 内部 FSM 规格（BossInnerState — 冻结）

#### 4.4.1 状态与转移表（From, To, Condition, Action）

| # | From | To | Condition | Action |
|---|---|---|---|---|
| B01 | `IDLE` | `ALERT` | 全局进入 SENSE（G02） | 盔甲整理动画；`S04 +8`（首见，单次） |
| B02 | `ALERT` | `PERFORM` | `distanceToThrone < 12m`（G03 同步） | 拔剑起立动画；stage 0 开始；发 `bossAnim` |
| B03 | `PERFORM` | `HIT` | `boss.hp ≤ 0` 且 `knockdownCount < 3` | 倒地动画；HP 恢复至 maxHp；发 `sound(impact)` + `fx(screenFlash)` |
| B04 | `HIT` | `RECOVER` | 倒地动画播完（0.8s） | 整理发型动画 1.5s（GDD §4 情感节拍 3:00）；发 `bossAnim(hairTidy)` |
| B05 | `RECOVER` | `PERFORM` | 整理动画结束 | 恢复当前 beat（或跳到下一 beat）；继续 PERFORM |
| B06 | `PERFORM` | `BREAK_CHARACTER` | 打断条件任一（01 §5.4）：① line beat 中玩家命中；② 弹幕在 line beat 中刷新；③ 同阶段内忘词 2 次 | `S13 +15`；焦虑带下限提升（最低 61）；剩余剧本时间 ×0.8；威力随机 ×[1.2–1.6] / 散射 ×2 / 落空 ×1.5；台词池切 L_FREE；灯光转暖；观众席阴影事件（seen +10）；发 `music(freeplay)` |
| B07 | `BREAK_CHARACTER` | `PERFORM` | 出戏动画 0.5s 播完 | `performMode='freePlay'`；自由发挥脚本接管（L_FREE 台词 100% 完整） |
| B08 | `PERFORM` | `EVALUATE` | G04/G05 条件 | 收剑定格；发 `phase(EVALUATE)` |
| B09 | `EVALUATE` | `IDLE` | 自评提交（G06） | 应用星级修正（R05–R08）与心态结转（§4.5.4）；回王座；发 `dialogue`（评语自述） |

**特殊行为（非转移）**：
- **恐慌崩溃**：焦虑达 100 时，当前 beat 强制取消，Boss 原地跪下喘息 2s，之后焦虑回落至 70（01 §3.4）；期间攻击判定冻结。
- **剑脱手**：恐慌带（86–100）每次攻击 5% 概率剑脱手 → 捡剑 1.2s 喜感节拍（01 §3.2）。
- 焦虑 <10 时自然衰减停止（01 §3.4）。

#### 4.4.2 冻结数值表（01 §2.2/§3 — 全部为 `core/constants.ts` 默认值）

**轮次升级（01 §2.2）**：

| 参数 | R1 | R2 | R3 | R4 |
|---|---|---|---|---|
| 逼近速度 m/s | 1.0 | 1.15 | 1.30 | 1.50 |
| 玩家伤害 / Boss HP 100 | 20 | 22 | 25 | 30 |
| 普通闪避率 | 20% | 30% | 40% | 50% |
| 完美闪避率 | 10% | 15% | 20% | 25% |
| 弹幕数上限/轮 | 0–1 | 1–2 | 2–3 | 3 |
| 焦虑基线 | 30 | 34 | 38 | 42 |
| 被看见度轮末继承 | — | ×0.6 | ×0.6 | ×0.6 |
| 档案解锁 | 2 预设 | +1 生成 | +1 生成 | +1 生成 |
| Boss 磨损 | — | 护甲划痕 | +裂纹 | +披风破口 |

**焦虑来源 S01–S13（01 §3.1）**：S01 基线 30；S02 +4×(R−1)；S03 庄重 +8 / 悲情 +12 / 癫狂 +18；S04 首见 +8；S05 稳步逼近 +1.4/s（速度 0.9–1.4 且直线）；S06 犹豫 +0.6/s（<0.9 m/s）；S07 弹幕 +12/条；S08 命中 +5；S09 完美闪避 +10（窗口 ±0.18s）；S10 普通闪避 +3（±0.35s）；S11 落空 +2；S12 忘词 +6；S13 打断 +15。

**衰减与安抚 R01–R11（01 §3.3）**：R01 自然 −2/s（3s 无源后）；R02 评估 −4/s（不跌破 10，最多 −40）；R03 阶段完成 −8；R04 全本 −10；R05 自评 5★ −15（总评 ≥4.5）；R06 4★ −6；R07 3★ −2；R08 ≤2★ +4；R09 日记正面 −10；R10 日记负面 +8；R11 玩家 5★ −12（附 L_P5STAR 困惑台词）。

**焦虑效果分带（01 §3.2）**：

| 带 | 区间 | 攻速 | 台词完整率 | 威力 | 散射 | 落空 | 附加 |
|---|---|---|---|---|---|---|---|
| calm | 0–30 | ×1.00 | 100% | ×1.00 | 0° | 0% | — |
| nervous | 31–60 | ×0.95 | 90% | ×1.05 | 2° | 5% | 起手犹豫 +0.1s |
| shaky | 61–85 | ×0.85 | 65% | ×1.15 | 5° | 15% | 拔剑僵直 +0.3s |
| panic | 86–100 | ×0.70 | 40% | ×1.30 | 10° | 30% | 5% 脱手 |

台词退化掷骰：shaky 每句 35% 退化（15% 整句遗忘 → 静默 1.5s + 60% 补 L_PANIC；20% 结巴）；panic 每句 60% 退化（30% 遗忘、30% 破碎断句）；遗忘必触发 S12。

**评分阈值（01 §4.1）**：A1 走位（站位命中 ≥90% 且抖动 <5%→5★ …）；A2 台词（完整率 ≥95% 且忘词 0→5★）；A3 视觉（3/3 阶段且连击 ≥4→5★）；A4 被看见（≥80→5★ …）；总评 = 四轴均值：≥4.5 完美 / ≥3.5 合格 / <3.5 失格。

**心态结转（01 §4.4）**：完美 → 下轮起始焦虑 −5、完整率 +5%；合格 → 无修正；失格 → +4、首句 30% 替换 L_SELFDOUBT。

**胜/负定义（01 §8）**：完美一轮 = 3/3 阶段且总评 ≥4.5（下轮 −5、seen +10）；合格 = 2/3 且 ≥3.5 或击败玩家未演全；失格 = 击倒后第 3 阶段未完成或总评 <3.5（下轮 +4、30% 自我怀疑首句）。累计击倒 3 次 → 提前谢幕（~4 分钟总时长）。无 Game Over。

---

## 5. 契约速写（Contract Sketches — 冻结）

> 以下 TS 为**契约正文**。`agent-core` 首个任务 = 将 §5 逐字转写为 `src/core/types.ts` / `src/core/constants.ts`，其余代理一律以本文件为准（核心代理合并前即可并行开工）。
> 所有数值常量名（`ANXIETY_*`、`BAND_*`、`TIMER_*`、`SPEED_*`、`RATING_*`）由 agent-core 依据 §4.4.2 与下表命名导出，**默认值必须等于 §4.4.2**。

### 5.1 核心枚举与基础类型（core/types.ts 节选）

```ts
// ============ 基础 ============
export interface Vector3 { x: number; y: number; z: number; }

// ============ 全局 FSM（冻结名，01 小写名见注释） ============
export type GamePhase =
  | 'MENU'    // 01: menu
  | 'WAIT'    // 01: wait
  | 'SENSE'   // 01: sense
  | 'PERFORM' // 01: perform / freeMode（performMode 区分）
  | 'EVALUATE'// 01: evaluate
  | 'DIARY'   // 01: diary
  | 'ENDING_NORMAL' // 01: ending A/B/early
  | 'ENDING_HIDDEN' // 01: hidden ⛔ stretch
  | 'PAUSE';

export type PerformMode = 'scripted' | 'freePlay';
export type EndingVariant = 'curtainA' | 'curtainB' | 'early';

// ============ Boss 内部 FSM（冻结名） ============
export type BossInnerState =
  | 'IDLE' | 'ALERT' | 'PERFORM' | 'HIT' | 'RECOVER'
  | 'BREAK_CHARACTER' | 'EVALUATE';

// ============ 焦虑 / 评分 ============
export type AnxietyBand = 'calm' | 'nervous' | 'shaky' | 'panic';
export type Verdict = 'perfect' | 'qualified' | 'fail';
export type RatingAxisId = 'mobility' | 'delivery' | 'visual' | 'remembered'; // A1..A4

// ============ 内容 / 剧本 ============
export type ScriptId = 'dignity' | 'tragic' | 'mad' | 'freePlay';
export type BeatType = 'move' | 'attack' | 'line' | 'vfx';

// ============ 事件载荷类型 ============
export type SoundKind =
  | 'step' | 'throneCreak' | 'armorRattle' | 'swordSwing' | 'swordDrop'
  | 'impact' | 'dodgeWhiff' | 'paper' | 'breath' | 'gong'
  | 'piano' | 'stringTremolo' | 'barrageWhoosh' | 'silence';
export type FxKind = 'bloomPulse' | 'vignette' | 'screenFlash' | 'shake' | 'lightSweep' | 'dust';
export type BossAnimKind =
  | 'idleSway' | 'armorFiddle' | 'standUp' | 'swordRaise' | 'attack'
  | 'knockdown' | 'hairTidy' | 'breakCharacter' | 'kneelPanic' | 'pickUpSword' | 'bow';
export type MusicMode = 'calm' | 'tense' | 'freeplay' | 'ending';
export type Speaker = 'boss' | 'system';

// ============ 持久化键（冻结键名，见 §3.3） ============
export type StorageKey = 'diary' | 'archive' | 'stats' | 'settings';
export const STORAGE_KEY: Record<StorageKey, string> = {
  diary: 'bossAnxiety.v1.diary',
  archive: 'bossAnxiety.v1.archive',
  stats: 'bossAnxiety.v1.stats',
  settings: 'bossAnxiety.v1.settings',
} as const;
```

### 5.2 实体接口（Entities）

```ts
// ============ BossState（模拟权威实体，engine 按 id 调和 mesh） ============
export interface BossState {
  id: 'boss';
  innerState: BossInnerState;
  pos: Vector3;
  rot: Vector3;
  hp: number;
  maxHp: number;            // 100
  anxiety: number;          // 0-100，隐藏值
  seen: number;             // 被看见度 0-100（A4 轴，灯光代理）
  band: AnxietyBand;        // 派生缓存，每 tick 更新
  script: ScriptId | null;
  stageIndex: number;       // 0-2（3 阶段）
  beatIndex: number;
  performMode: PerformMode;
  recovering: boolean;      // HIT→RECOVER 子行为中
  knockdownCount: number;   // ≥3 → 提前谢幕
  breakdownTimer: number;   // 恐慌崩溃/捡剑等特殊计时
  anim: BossAnimKind;       // 当前动画请求（engine 消费）
}

// ============ PlayerPresence（01 §10.2 更名，字段不变，冻结） ============
export interface PlayerPresence {
  approachSpeed: number;        // 0.6-1.5 m/s（S05/S06 判定源）
  distanceToThrone: number;     // 0-40 m（Sense→Perform 转移条件）
  dodgeCount: number;           // 本轮闪避次数
  hitsLanded: number;           // 本轮命中次数
  dodgeTimingQuality: 0 | 0.5 | 1; // 完美 ±0.18s=1 / 普通 ±0.35s=0.5 / 其余 0
  barrageActive: boolean;       // 弹幕是否显示中（S07 源）
  aggression: number;           // 派生：0.5×approachSpeed + 0.5×hitRate
  lingerTime: number;           // 轮末停留秒数（A4 证据）
  state: 'approaching' | 'engaging' | 'retreating' | 'gone';
}

// ============ 输入 / 单帧命令 ============
export interface BossControls {
  move: Vector3;            // WASD 走位意图（世界方向，y=0）
  attackPressed: boolean;   // LMB 边沿触发（beat 提示圈内出招）
  attackHeld: boolean;
}
export type UiCommand =
  | { kind: 'scriptPick'; script: ScriptId }         // 1/2/3
  | { kind: 'ratingSubmit'; stars: Record<RatingAxisId, number> }
  | { kind: 'diaryPick'; entryId: string | null }
  | { kind: 'dialogueChoice'; choice: 'A' | 'B' | 'C' } // 隐藏结局链
  | { kind: 'archiveFlip'; index: number }
  | { kind: 'pauseToggle' }
  | { kind: 'startRun' };

export interface TickInput {
  time: number;             // 模拟时间（秒）
  dt: number;               // 固定 1/60
  player: PlayerPresence;   // 替身快照（playerModel 采样）
  controls: BossControls;   // 人类玩家（扮演 Boss）
  ui: UiCommand | null;     // 单帧 UI 命令（边沿）
}

// ============ 评分 / 轮次结果 ============
export interface RatingFacts {
  stanceAccuracy: number;   // 站位命中率 %
  jitterRatio: number;      // 移动抖动率 %
  lineCompleteness: number; // 台词完整率 %
  forgotLines: number;      // 忘词数
  maxCombo: number;         // 最大连击
  stagesCompleted: number;  // 0-3
  lingerTime: number;       // A4 证据
  barrageCount: number;     // A4 证据
}
export interface RoundResult {
  round: number;
  script: ScriptId;
  stagesCompleted: number;
  knockdowns: number;       // 本轮击倒数
  broken: boolean;          // 是否出戏
  axisRatings: Record<RatingAxisId, number>; // 1-5
  totalRating: number;      // 四轴均值 1-5
  verdict: Verdict;
  facts: RatingFacts;
  anxietyDelta: number;     // 本轮净变化（诊断用）
  playerScore: number | null; // 玩家涂鸦 1-5（可选）
}
export interface PersistedStats {
  totalRounds: number;
  notGoodEnoughCount: number;  // 3 → 隐藏链
  seenEndings: EndingVariant[];
  lastVerdicts: Verdict[];
}
```

### 5.3 SimEvent 联合（core/simulation/events.ts — 冻结，仿 4_chunbai 模式）

```ts
// 平台无关事件：由 Simulation 发出，由适配层（渲染/音频/UI/持久化）消费。
export type SimEvent =
  | { type: 'sound'; sound: SoundKind; volume?: number; pan?: number; pitch?: number; rate?: number }
  | { type: 'explosion'; pos: Vector3; color: string; size: number }
  | { type: 'fx'; fx: FxKind; pos?: Vector3; value?: number }
  | { type: 'dialogue'; lineId: string; pool: string; speaker: Speaker; priority?: number }
  | { type: 'barrage'; text: string; duration: number }          // 攻略弹幕（DOM 层）
  | { type: 'rating'; axis: RatingAxisId; stars: number; evidence?: string } // A4 揭示
  | { type: 'persist'; key: StorageKey; value: unknown }          // 持久化请求
  | { type: 'phase'; phase: GamePhase; performMode?: PerformMode } // 全局状态广播
  | { type: 'bossAnim'; anim: BossAnimKind; once?: boolean; speed?: number }
  | { type: 'music'; mode: MusicMode; intensity: number };        // 音乐层切换

// 事件消费契约（engine 适配器实现）
export interface EventConsumer {
  onSimEvent(e: SimEvent): void;
}
```

### 5.4 内容数据接口（core/data — 冻结）

```ts
// ============ 台词 ============
export interface DialogueLine {
  id: string;            // 'L_DIG_101'（01 §11 前缀_编号）
  text: string;          // 中文口语化，≤2 行
  speaker: Speaker;
  emotion?: string;      // 'calm'|'nervous'|'shaky'|'panic' 带内变体
  duration?: number;     // 展示秒数，默认按字数
}

// ============ 剧本（01 §5 结构） ============
export interface Beat {
  type: BeatType;
  duration: number;             // 秒
  targetPos?: Vector3;          // move：目标站位
  tolerance?: number;           // move 判定容差（默认 0.8m，A1 用）
  lineId?: string;              // line：台词锚点
  vfx?: FxKind;                 // vfx：仪式光效
  power?: number;               // attack：威力系数
}
export interface ScriptStage { id: string; beats: Beat[]; }
export interface ScriptDef {
  id: ScriptId;
  name: string;                 // 庄重威严 / 悲情独白 / 癫狂戏剧 ⛔
  difficulty: number;           // S03：8 / 12 / 18
  stages: ScriptStage[];        // 3 阶段 × 2-3 beats
}

// ============ 档案 / 弹幕 / 日记 / 评分轴 ============
export interface ArchiveEntry {
  id: string;            // 'L_ARCH_01' | 'L_ARCH_GEN_1'
  name: string;
  lines: string[];
  generated?: boolean;   // true = 上轮实录生成（模板填数）
}
export interface BarrageLine { id: string; text: string; }        // L_BARRAGE_*
export interface DiaryEntry {
  id: string;            // L_DIARY_01..09
  text: string;
  mood: 'positive' | 'negative' | 'neutral';  // R09 / R10 / 无修正
  countsAsNotGoodEnough?: boolean;            // 01 §6：L_DIARY_02/05/07 同计数
}
export interface RatingAxisDef {
  id: RatingAxisId;
  label: string;         // 走位流畅度 / 台词感染力 / 视觉效果 / 有没有让玩家记住
  auto: boolean;         // A4 = true（系统代填）
  thresholds: Record<1 | 2 | 3 | 4 | 5, string>; // 星级证据文案
}

// ============ 世界清单（core/world/world.ts） ============
export interface WorldManifest {
  roomBounds: { min: Vector3; max: Vector3 };   // 王座厅边界
  thronePos: Vector3;
  stageMarkers: Vector3[];   // 剧本 move 目标点（站位锚）
  shadowPath: { from: Vector3; to: Vector3 };   // 走廊→王座 影子路径
  colliders: { center: Vector3; radius: number }[]; // 立柱
  lightAnchors: { candle: Vector3; spot: Vector3 }[];
}
```

### 5.5 Store 切片（src/store.ts — 冻结键，仅 UI 状态）

```ts
// zustand UI store；由 GameEngine 事件同步写入；UI 只读消费。
export interface UiStore {
  // runState：当前阶段与轮次（镜像 sim.phase）
  runState: { phase: GamePhase; round: number; paused: boolean; runActive: boolean };
  // anxiety：HUD 代理（弦乐走音/手抖指示），不显示数字
  anxiety: { band: AnxietyBand; shakeIntensity: number; stringDetune: number };
  // rating：自评表
  rating: {
    sheetOpen: boolean;
    axes: Record<RatingAxisId, { stars: number; auto: boolean; evidence?: string }>;
    facts: RatingFacts | null;
    submitted: boolean;
    countdown: number;
  };
  // dialogue：对白队列（排队播放）
  dialogue: { queue: { lineId: string; text: string; speaker: Speaker }[]; active: { lineId: string; text: string; speaker: Speaker } | null };
  // diary：日记 UI
  diary: { open: boolean; options: DiaryEntry[]; writeCount: number; countdown: number };
  // archive：挑战者档案侧栏
  archive: { entries: ArchiveEntry[]; unread: number };
  // menu：标题/暂停/结局屏
  menu: { screen: 'title' | 'intro' | 'pause' | 'ending'; endingVariant?: EndingVariant };
  // actions（由组件调用，转发为 engine 命令，不直改模拟）
  setPhase(p: GamePhase): void;
  pushDialogue(d: UiStore['dialogue']['active']): void;
  openRating(r: UiStore['rating']): void;
  openDiary(d: UiStore['diary']): void;
  setMenu(s: UiStore['menu']['screen']): void;
  syncFromEngine(snapshot: UiSnapshot): void;  // 引擎事件聚合后的批量同步
}
```

### 5.6 模拟公开 API（core/simulation/Simulation.ts — 冻结签名）

```ts
export interface SimApi {
  update(input: TickInput): SimEvent[];   // 推进一固定步，返回本步事件（engine 分发）
  getState(): Readonly<SimState>;          // { boss: BossState; phase: GamePhase; round: number; ... }
  beginRun(seed?: number): void;           // MENU→WAIT，注入 RNG 种子（可复现）
  getManifestText(): string;               // worldText.buildPromptContext 入口
  resetRun(): void;                        // 重开（持久化保留）
}
export interface PersistPort {             // engine/storage.ts 实现
  load<T>(key: StorageKey): T | null;
  save(key: StorageKey, value: unknown): void;
}
```

---

## 6. 模块文件树（Module File Tree — 完整 src/ 布局）

> 每文件一行用途；`[所有权代理]` 见 §14。禁止创建未列文件；确需新增 → 契约变更流程。

```
src/
├── main.tsx                    [ui] 入口：React 挂载 + GameEngine 生命周期
├── App.tsx                     [ui] 顶层组件（canvas 容器 + 覆盖层编排）
├── index.css                   [ui] Tailwind 指令 + 全局样式（弹幕滚动/黑场动画）
├── vite-env.d.ts               [ui] Vite 类型引用
├── store.ts                    [ui] zustand UiStore（§5.5 冻结切片）
├── core/                       # ==== 平台纯净层（零 THREE/DOM/zustand 导入） ====
│   ├── types.ts                [core] §5.1–5.5 全部接口/枚举/常量键（契约转写）
│   ├── constants.ts            [core] 调参常量：S01–S13/R01–R11、分带、计时器、速度表（§4.4.2 冻结默认）
│   ├── math.ts                 [core] clamp/lerp/ease/rand/角度工具（无第三方）
│   ├── data/                   # 内容数据（JSON 形态 TS 模块，零逻辑）
│   │   ├── scripts.ts          [content] 3 本剧本 ScriptDef（mad ⛔ M3 stretch）
│   │   ├── lines.ts            [content] L_* 全部台词池（DIG/TRG/MAD/FREE/PANIC/SELFDOUBT/AMB/EVAL/P5STAR/END_N/END_H）
│   │   ├── archives.ts         [content] L_ARCH_01..10 预设 + L_ARCH_GEN 模板 ×3
│   │   ├── diary.ts            [content] L_DIARY_01..09（含"我不够好"×3 同计数、正面 ≥3）
│   │   ├── barrage.ts          [content] L_BARRAGE_01..06
│   │   └── ratingAxes.ts       [content] A1–A4 RatingAxisDef（阈值文案）
│   ├── simulation/             # 纯核心模拟
│   │   ├── Simulation.ts       [core] SimApi 实现：固定步推进、事件队列、轮次/结局编排
│   │   ├── events.ts           [core] SimEvent 联合 + EventConsumer（§5.3 逐字转写）
│   │   ├── bossFSM.ts          [core] BossInnerState 转移表（§4.4.1）+ 恐慌崩溃/脱手
│   │   ├── anxietyModel.ts     [core] S/R 表应用、分带派生、衰减计时
│   │   ├── scriptDirector.ts   [core] beat 推进、站位判定、attack 时机窗口、连击、打断检测
│   │   ├── playerModel.ts      [core] PlayerPresence 替身生成（种子 RNG、弹幕调度、命中/闪避判定）
│   │   ├── rating.ts           [core] A1–A4 计算、总评、verdict、心态结转
│   │   ├── dialogueEngine.ts   [core] 台词选择、完整率掷骰、忘词→L_PANIC 补白、L_FREE 池
│   │   └── worldState.ts       [core] 轮次状态机（升级表、seen 继承、结局条件判定）※ 可并入 Simulation
│   └── world/                  # 世界即文本
│       ├── world.ts            [core] WorldManifest（§5.4，冻结）
│       └── worldText.ts        [core] describeWorld/describeRules/describeEntities/buildPromptContext
├── engine/                     # ==== 平台适配层 ====
│   ├── GameEngine.ts           [engine] 编排器：rAF→固定步累加器→TickInput 组装→sim.update→事件分发→store 同步→render
│   ├── SceneManager.ts         [engine] 程序化王座厅/烛火/相机（固定对角线）/Boss 单 mesh+顶点动画/mesh 调和（id→对象）
│   ├── PlayerShadow.ts         [engine] 影子贴片（长度=f(1/距离)）+ 攻击光效爆发点
│   ├── InputManager.ts         [engine] WASD/LMB/1-2-3/Esc/Enter 采样→BossControls+UiCommand（边沿检测）
│   ├── Tween.ts                [engine] 手写 lerp/timeline 补间（替代 GSAP：tween(target, key, from, to, dur, ease)）
│   ├── postfx.ts               [engine] Bloom（轻）+ Vignette 合成器
│   ├── storage.ts              [engine] PersistPort 实现（localStorage，§3.3 键名）
│   ├── devtools.ts             [engine] __gameManifest/__sim 注入（仅 DEV）+ 可选 Tweakpane 桥
│   └── audio/
│       ├── AudioManager.ts     [audio] Web Audio 编排：事件→声音映射、声部抢占（≤8）、ducking、静音/音量
│       ├── synth.ts            [audio] 合成器：钢琴/走音弦乐/脚步/盔甲摩擦/水声混响（零文件）
│       └── musicBus.ts         [audio] 音乐分层：calm/tense/freeplay/ending 强度插值 + 走音代理（焦虑带→detune）
└── components/                 # UI 覆盖层（React，仅 DOM）
    ├── GameCanvas.tsx          [ui] <canvas> 容器 + 引擎挂载点
    ├── HUD.tsx                 [ui] 焦虑代理指示（弦/抖）、beat 提示圈、连击、弹幕滚动条
    ├── Dialogue.tsx            [ui] 对白队列打字机渲染 + 选项（A/B/C）
    ├── ScriptPicker.tsx        [ui] 剧本选择 1/2/3（SCRIPT_COUNT ≥2 自适应）
    ├── RatingSheet.tsx         [ui] 四轴自评 + 事实数据卡 + A4 自动揭示证据 + 倒计时
    ├── Diary.tsx               [ui] 日记书写（预设选项 + 降级自动写）
    ├── Archive.tsx             [ui] 历任挑战者档案侧栏（可翻阅）
    ├── Menu.tsx                [ui] 标题/开始/intro 字幕（可跳过）
    ├── PauseOverlay.tsx        [ui] 暂停遮罩（恢复/重开）
    └── Ending.tsx              [ui] 谢幕屏（curtainA/B/early/hidden + Credits）
```

---

## 7. 每 Tick 数据流（Data Flow per Tick — 冻结管线）

```
rAF(now)
  → GameEngine.tick
    1. InputManager.poll()                → controls: BossControls（边沿缓存）
    2. playerModel.sample(runCtx)         → player: PlayerPresence
    3. accumulator += min(now-prev, 0.25)  // 钳制防跳帧
    4. while (accumulator ≥ 1/60 && steps < 5):
         input = { time, dt: 1/60, player, controls, ui: pendingUi.pop() }
         events = sim.update(input)        // 唯一模拟写入口
         GameEngine.dispatch(events)       // 同步分发（顺序保证）
       accumulator -= 1/60 × steps
    5. dispatch 内部路由（按事件 type）：
         sound      → AudioManager.play(e)        （含 music 分支）
         explosion  → SceneManager.spawnFx(e)     （Points 实例化）
         fx         → postfx / SceneManager
         dialogue   → store.pushDialogue + UI 打字机
         barrage    → store 弹幕队列 → HUD 滚动
         rating     → store.rating（A4 揭示）
         persist    → storage.save(key, value)
         phase      → store.setPhase + SceneManager(灯光/相机状态)
         bossAnim   → SceneManager 动画请求（Tween 队列）
         music      → musicBus 目标强度
    6. store 聚合 sync（事件批后一次性 setState，避免每事件重渲染）
    7. SceneManager.render() → postfx → present
  → DEV: __sim 暴露上一步 input + state；renderer.info 读数
```

**约束**：① UI 命令只能经 `TickInput.ui` 进入模拟（组件→store action→engine 转发）；② `SimEvent` 是模拟→世界的**唯一**通道；③ store 不写模拟；④ 事件顺序 = 生成顺序（先 phase 后 dialogue 等，适配层不得重排）。

---

## 8. 构建创建（Build Creation）

**约定**：每次里程碑完成 = 源码 + 重建 `dist/` 一并提交（沿用 4_chunbai：dist 已提交）。验收由 agent-qa 执行（tsc → build → Playwright 冒烟 §13），签核人 = 用户。

### 8.1 M1 — 场景与 IDLE 循环（D1 末）

**交付**：菜单 → 进入 Wait：王座厅程序化场景（对角线固定相机、烛火单点暖光+冷蓝环境、哥特立柱 4 根）、Boss 王座 IDLE 动画（呼吸浮动/头盔）、Wait 自语（L_AMB ≥3 条生效）、档案侧栏 UI（2 条预设）、剧本选择 UI（1/2/3 至少 2 本可选）、Tween 工具可用、AudioManager 基础（王座吱呀+钢琴 calm）、DEV 钩子就绪。
**验收**：`npm run typecheck` 绿；`npm run build` 绿；60fps@1080p（renderer.info draw calls <60）；Playwright：菜单 → 开始 → 进入 Wait，`__gameManifest()` 含 world+rules+state；零 console error。

### 8.2 M2 — 战斗与焦虑（D2 末）

**交付**：Sense 阶段（脚步合成渐强、影子逼近、首见 S04、弹幕 0–1 条）、Perform 完整执行（dignity + tragic 两本 3 阶段 × beats；WASD 走位 + LMB 攻击 + line 自动念白）、焦虑模型全量（S/R 表、分带影响攻速/威力/散射/完整率、忘词→L_PANIC、恐慌崩溃、脱手）、玩家命中/闪避/落空判定与焦虑挂钩、击倒 HIT→RECOVER（整理发型）→继续、打断→BREAK_CHARACTER→freePlay（L_FREE 池）、阶段完成焦虑回落、90s 强制收尾、EVALUATE 进入。
**验收**：一轮完整 Perform→EVALUATE 可跑通；焦虑值在 playtest 中按表增减可观测；**D2 晚 playtest 通过**（GDD §8：不通则砍战斗时长/加台词）；tsc + build 绿；无泄漏（性能面板长跑 5min 无上涨）。

### 8.3 M3 — 叙事与结局（D3 末）

**交付**：自评表（四轴 + 事实数据卡 + A4 自动揭示 + 10s 倒计时 + 星级焦虑修正 + 心态结转）、玩家涂鸦评分（≥4★ 30% 概率 + L_P5STAR）、日记（预设池 + 写后焦虑修正 + 持久化）、档案生成（上轮实录模板填数）、正常结局 curtainA/curtainB（seen 分支）、提前谢幕（3 击倒）、隐藏结局（`STRETCH_FLAGS.hiddenEnding=true` 时全链）、音频全量（弦乐走音代理 + freeplay 暖灯音乐 + 结局钢琴）、灯光叙事（seen→亮度 60%→100% 定格）。
**验收**：完整 6 分钟循环可跑通（4 轮 + 结局）；结局三分支各自可达；持久化跨刷新保留；tsc + build 绿；§13 全清单冒烟通过。
**stretch（时间不足则砍）**：mad 剧本内容、隐藏结局、玩家打字回复日记（GDD §7.2）。

---

## 9. 资源管理与文件格式（Resource Management & File Formats）

| 类别 | 格式 | 规则 |
|---|---|---|
| 源码 | `.ts` / `.tsx` | strict TS；无资产导入 |
| 内容 | `src/core/data/*.ts`（`as const` 导出对象数组） | **不用 .json 文件**（Vite 下 TS 模块即可，类型保真）；形状一律 §5.4 |
| 样式 | `.css` + Tailwind 类 | 弹幕动画/黑场/打字机光标样式集中在 `index.css` |
| 音频 | 无文件 | Web Audio 合成（`synth.ts` 参数化：频率/包络/混响） |
| 纹理 | 无文件 | 程序化 CanvasTexture（如需要磨损划痕用噪声函数） |
| 构建产物 | `dist/` | 提交仓库（§8 约定）；禁止手改 |
| 文档 | `.md` | GDD/TDD/01 为契约源，改动需走变更流程 |
| 图片 | 引用性 | `cdn-yingshi-*.png` 等根目录杂项**禁止引用**（非资产） |

**命名**：内容 ID 唯一（`L_*`/`L_ARCH_*`/`L_DIARY_*`/`L_BARRAGE_*`）；动画 `camelCase`；事件名全小写单词。
**压缩策略**：代码压缩 = Vite 默认；运行时零下载资产；localStorage 每键 ≤ 50KB（超出截断历史）。

---

## 10. 分支政策（Branches Policy）

```
master                    ← 稳定主分支（仅通过合并进入）
├── agent/core/*          ← 纯核心（types/constants/simulation/world）
├── agent/content/*       ← 内容数据（data/）
├── agent/engine/*        ← 渲染适配（engine/ 非 audio）
├── agent/audio/*         ← 音频适配（engine/audio/）
├── agent/ui/*            ← UI 覆盖层（store/components/样式）
└── agent/qa/*            ← 集成验证（无文件所有权，只读 + dist 重建）
```

- **合并顺序（feitian 批次）**：`agent/core` → `agent/content`（+`agent/engine`、`agent/audio` 并行）→ `agent/ui` → `agent/qa` 验证 → master。core 合并前，其他代理以 **TDD §5 冻结签名**为编译基准（允许 `// TODO core merge` 占位导出）。
- **主代理合并制**：agent-qa（集成代理）负责合并与冲突仲裁；冲突裁决规则：core 签名 > engine 适配 > UI 展示。
- **提交门（每次提交必过）**：`npx tsc -b --noEmit` 绿；一个批次 = 一个提交（feitian-style）；提交信息 `[M2] chore: ...` 风格（中文说明）。
- **禁止**：直接 push master；跨代理文件写入（写他人文件 = 分支冲突 → 交回该代理）；提交未过 tsc 的代码。
- **node_modules**：`4_chunbai/new_game/node_modules` 已提交属该子项目；本目录 `node_modules` 同样保持提交态，不执行 npm install 增删（§3.2 注）。

---

## 11. 工具指令（Tool Instructions）

| 命令 | 位置 | 说明 |
|---|---|---|
| `npm run dev` | `5_gamejam_1/` | Vite dev server，端口 **5173**（与 4_chunbai 3000 无冲突）；HMR |
| `npm run build` | `5_gamejam_1/` | `tsc -b && vite build` → `dist/`（提交产物） |
| `npx tsc -b --noEmit` | `5_gamejam_1/` | **提交前强制门**（= `npm run typecheck`） |
| `npm run test` | `5_gamejam_1/` | vitest 单元套件（纯核心 5 文件 85 用例，v1.3 引入；类型检查仍为主门） |
| `npm run preview` | `5_gamejam_1/` | 预览 dist 产物 |
| Playwright（MCP） | agent-qa | 冒烟脚本（§13） |

版本：Node ≥ 20.19（推荐 22 LTS）、npm ≥ 10、TypeScript ^5.6（strict，见 tsconfig.app.json）。根目录**无 package.json**——所有命令必须在 `5_gamejam_1/` 内执行（仓库 AGENTS.md 规则）。工具更新：升级依赖需契约变更（§0）。

---

## 12. 风险登记册（Risk Register）

| # | 风险 | 类别 | 概率/影响 | 缓解 |
|---|---|---|---|---|
| K01 | 战斗无聊（玩家是 AI 替身） | GDD §8 | 高/高 | 玩家抽象化呈现（脚步/影子/飞回剑/弹幕），"概念而非实体"；D2 晚强制 playtest，不通砍时长加台词 |
| K02 | 情感不到位 | GDD §8 | 中/高 | 情感节拍表（01 §7）数值挂钩；台词密度优先于战斗复杂度；M3 前情绪走查 |
| K03 | Three.js 性能吃紧 | GDD §8 | 中/高 | 单 mesh + 顶点动画（无骨骼）；几何合并；粒子实例化；§3.5 预算即验收 |
| K04 | 模拟/渲染状态漂移（C.A.T 双份状态） | 技术 | 中/高 | 单真相源 `Simulation`；engine 只做 id→mesh 调和；每 tick 全量同步 + store 批量 setState；`__sim` 可观测 |
| K05 | 内容量过大（L_* 池约 60+ 条 + 3 剧本） | 技术 | 高/中 | 砍单（mad ⛔、隐藏结局 ⛔、日记 1 条降级）；data 表按 §5.4 形状一次定型，content 代理可并行 |
| K06 | 音频时序不同步（台词/打击/忘词） | 技术 | 中/中 | 音频全事件驱动（SimEvent sound）；voice 抢占 ≤8；音乐强度用插值而非硬切 |
| K07 | 固定步 + 事件顺序 bug（对话与动画错位） | 技术 | 中/中 | dispatch 顺序保证（§7）；同帧事件按生成序路由；qa 冒烟覆盖每状态转移 |
| K08 | 隐藏结局链路复杂（A/B/C 选项 + 计数跨轮） | 技术 | 中/中 | 枚举常驻 + `STRETCH_FLAGS` 门控；计数在 `PersistedStats` 持久化，跨刷新可测 |
| K09 | 手写 Tween 取代 GSAP 导致动画质感不足 | 技术 | 低/中 | 封装 ease 曲线库（cubic/elastic/back）+ timeline 链式 API；Boss 动画全部 Tween 驱动，M1 就做手感验证 |
| K10 | 多代理并行合并冲突（types/constants 被改） | 流程 | 高/中 | §5 冻结 + 单所有权（types 仅 core 可写）；合并顺序 §10；冲突按签名裁决 |

---

## 13. 验证计划（Verification Plan）

**门 1 — 静态**：`npx tsc -b --noEmit` 绿（每次提交）。
**门 2 — 构建**：`npm run build` 绿，`dist/` 提交。
**门 3 — 冒烟（Playwright，agent-qa 执行）**：

| # | 步骤 | 期望 |
|---|---|---|
| S1 | 打开 `http://localhost:5173` | 标题屏渲染；`window.__gameManifest` 存在且含 `world`/`rules`/`state` 三段；控制台 **0 error** |
| S2 | 点击开始 | 进入 Wait：Boss 自语文本出现（L_AMB）；档案侧栏可见 |
| S3 | 等待 Wait 结束（≥8s）或触发音频 cue | 进入 Sense：脚步/影子代理出现 |
| S4 | 影子到达 <12m | 进入 Perform：beat 提示圈亮起；按 WASD/LMB 可操作 |
| S5 | 完成/强制收尾 | 进入 Evaluate：自评表渲染（四轴 + 事实卡 + A4 证据） |
| S6 | 提交自评（或 10s 超时） | 进入 Diary：可写/自动写入 |
| S7 | 第 4 轮后 | 进入 Ending（curtainA/B）；Credits 可见 |
| S8 | 刷新页面 | 存档（diary/archive/stats）保留；继续可复现 |
| S9 | 长跑 5 分钟 | 性能：draw calls <60、帧率 ≥55fps、无 WebGL 对象泄漏（renderer.info 读数上报） |

**门 4 — 可观测性**：DEV 下 `__gameManifest()` 输出 ≥200 词世界描述；`__sim` 暴露当前 phase/boss/anxiety。
**门 5 — playtest**：D2 晚用户主观验收（情感达标、不无聊），结果记入变更日志。

---

## 14. 代理任务拆分（Agent Task Breakdown — 原子级）

> 所有权 = **写入白名单**（只读/导入不受限）。合并顺序见 §10。所有代理开工前必读：本文件 §4/§5/§6/§10。

| 代理 | 分支 | 所有权（写入） | 原子任务 | 完成判据 |
|---|---|---|---|---|
| **agent-core** | `agent/core` | `src/core/**`（不含 `data/**`） | ① 转写 §5 → `types.ts`+`constants.ts`（默认值=§4.4.2）② `math.ts` ③ `simulation/events.ts` ④ `bossFSM.ts` ⑤ `anxietyModel.ts` ⑥ `scriptDirector.ts` ⑦ `playerModel.ts` ⑧ `rating.ts` ⑨ `dialogueEngine.ts` ⑩ `world/world.ts`+`worldText.ts` ⑪ `Simulation.ts`（含轮次状态机/结局判定/STRETCH_FLAGS） | tsc 绿；`SimApi` 行为与 §5.6 一致；devtools 可读 `__sim` 状态 |
| **agent-content** | `agent/content` | `src/core/data/**` | ① `ratingAxes.ts` ② `diary.ts`（L_DIARY_01..09 + 降级）③ `archives.ts`（10 预设 + 3 模板）④ `barrage.ts` ⑤ `lines.ts`（DIG/TRG/FREE/PANIC/SELFDOUBT/AMB/EVAL/P5STAR/END_N/END_H + MAD stretch 位）⑥ `scripts.ts`（dignity+tragic 全量；mad 占位） | 形状 = §5.4；ID 唯一符合 01 §11；tsc 绿 |
| **agent-engine** | `agent/engine` | `src/engine/**`（不含 `audio/**`） | ① `Tween.ts` ② `SceneManager.ts`（房间/光/相机/Boss mesh+顶点动画/mesh 调和）③ `PlayerShadow.ts` ④ `InputManager.ts` ⑤ `postfx.ts` ⑥ `storage.ts`（PersistPort）⑦ `GameEngine.ts`（固定步/分发/§7 管线）⑧ `devtools.ts`（__gameManifest/__sim + Tweakpane 桥） | tsc 绿；M1 场景可见；事件路由覆盖 §7 全表 |
| **agent-audio** | `agent/audio` | `src/engine/audio/**` | ① `synth.ts`（钢琴/走音弦/脚步/盔甲摩擦/水声/打击）② `musicBus.ts`（4 模式强度插值 + 焦虑→detune 代理）③ `AudioManager.ts`（SimEvent sound 映射、voice ≤8 抢占、ducking、settings 持久化） | tsc 绿；M3 前全事件可发声；无音频文件 |
| **agent-ui** | `agent/ui` | `src/store.ts`、`src/components/**`、`src/App.tsx`、`src/main.tsx`、`src/index.css`、`index.html`、Tailwind/PostCSS 配置 | ① `store.ts`（§5.5 切片 + syncFromEngine）② `Menu.tsx`+intro ③ `HUD.tsx`（焦虑代理/beat 圈/弹幕）④ `Dialogue.tsx`（打字机+A/B/C）⑤ `ScriptPicker.tsx` ⑥ `RatingSheet.tsx` ⑦ `Diary.tsx` ⑧ `Archive.tsx` ⑨ `PauseOverlay.tsx` ⑩ `Ending.tsx` ⑪ `GameCanvas.tsx` 挂载引擎 | tsc 绿；M1 UI 全组件占位可用；零直接模拟写入 |
| **agent-qa** | `agent/qa` | 无（只读 + 重建 dist） | ① 按 §10 顺序合并 ② 每里程碑跑 §13 门 1–4 ③ Playwright 冒烟 S1–S9 ④ 性能长跑 ⑤ playtest 组织 | 各里程碑验收清单全绿；master 可用 |

**依赖关系**：core↔content 互不依赖（只依赖 §5 契约）；engine 依赖 core+content（API 先行，可占位实现）；audio 依赖 events.ts（core 合并后对齐签名）；ui 依赖 core types + store（store 自身无 core 依赖）。每代理首批提交必须在 **1 个固定步内**完成 tsc 绿（先空实现 + 签名，后填充）。

---

*TDD v1.2 · 冻结契约 · 2026-08-07 · 配套：《Boss 的焦虑》GDD v0.1 + docs/design/01-concept-core-loop.md v0.1*
