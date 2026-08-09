# Hotline Shanghai / 热线上海 — Technical Design Document (TDD) v2

> ⚠️ **存档**:本文档已被根目录 `TDD.md`(v2 提升版,2026-08-08)取代,仅作 v2 原始版档案,勿作权威引用。

> **本文档是冻结的工程契约(Frozen Contract)**:所有 coder / agent 必须按本文件实现。
> **接口签名、状态机、默认数值一律以本文件为准**。与本文件冲突的实现视为 bug。
> **设计层权威**:`v2/GDD.md`(下文简称 GDD)+ `docs/design/01..04-*.md`(v2 需同步)。
> **变更规则**:v2 起,§5(契约速写)与 §4(FSM / 数据表)中的签名、状态名、默认数值不得擅自修改;需要调整时必须:① 更新本变更日志;② 通知全部 agent 重读本文件;③ 提交一个独立 commit 标注 `[TDD-CONTRACT-CHANGE]`。

---

## 0. 封面与变更日志(Cover & Change Log)

| 项 | 值 |
|---|---|
| 游戏名 | Hotline Shanghai / 热线上海 |
| 团队 | VibeGames(KIMI3 DDD 多代理工作流) |
| 文档角色 | 技术设计 / 契约所有者(Technical Design / Contracts Owner) |
| 引擎 | Three.js 0.170(场景 / 渲染器)+ 原生 WebGL2 framebuffer(RC 管线) |
| 平台 | Web(桌面 Chrome / Edge 优先;1080p 预算) |
| 周期 | M0→M4(共 4 周,非 72h jam) |
| 端口 | **5184**(4_chunbai=3000, 5_gamejam_1=5173, 6_patapong3D=5183,本项目独占 5184) |
| 状态 | M0 设计冻结(v2,2026-08-08) |

| 版本 | 日期 | 作者 | 变更摘要 |
|------|------|------|----------|
| v1 | 2026-08-08 | Mavis (设计阶段) | 初稿:冻结 C.A.T 架构、2D RC 管线契约、FSM、契约速写、Agent 拆分、性能预算 |
| v2 | 2026-08-08 | Mavis (设计阶段) | ① 操作契约加入 **F 切换近战/远程**(§4.5.1)与 **E 长按投掷**;② 武器 8→35 / 面具 6→25 铺量路线(§4.6 扩展表);③ RC 管线按 `radiance-cascades-demo` 真实算法冻结:JFA pass 数 = `log2(min(W,H))`、probe 数学(`spacing=sqrt(baseRayCount^index)`、`rayCount=baseRayCount^(index+1)`、interval 幂级数)、`uPropagationRate`/`uMixFactor` 调参项(§4.4.6/§15);④ 背景对齐淞沪会战 / 血战上海滩(GDD §2);⑤ 契约速写增补 `Mode`/`WeaponMode`/`throwWeapon`/`toggleMode` 输入 |

---

## 1. 目录(Table of Contents)

- §0 封面与变更日志
- §1 目录
- §2 引言(目的 / 技术目标 / 目标平台 / 外部工具 / 团队角色 / 时间线 / 设计层对账与裁决)
- §3 技术总览(命名规范 / 技术栈表 / 数据布局 / DEV 钩子 / 性能预算 / 风险降级)
- §4 游戏机制即架构(机制→模块映射 / 主循环 / 全局 FSM 规格 / 状态转移表 / 默认数值表 / RC 管线规格)
- §5 契约速写(**冻结**,真实 TS)
- §6 模块文件树(完整 src/ 布局)
- §7 每 Tick 数据流
- §8 构建创建(里程碑 M1/M2/M3/M4 + 验收标准)
- §9 资源管理与文件格式
- §10 分支政策
- §11 工具指令
- §12 风险登记册
- §13 验证计划
- §14 代理任务拆分(原子级,文件所有权白名单)
- §15 2D RC 管线契约(本项目最重模块,独立章节,按 demo 真实算法)

---

## 2. 引言(Introduction)

### 2.1 目的(Purpose)

玩家扮演 1937 上海淞沪会战 / 孤岛期地下抵抗组织的一名"线人",接电话 → 进入房间 → 用一击必杀的节奏清除占领军 / 伪警 / 特务 → 拿面具 → 下一任务。整局 3-5 分钟,纯前端,零资产文件。**整局所有灯光 = 真实 2D Radiance Cascades 全管线**(prepscene → JFA → distfield → cascade probes → final composite),不是 fake additive。RC 让枪火 / 油灯 / 霓虹 / 爆炸都是真实软阴影光源,1937 弄堂的"灯下黑"质感是本项目核心辨识度。

### 2.2 技术目标(Technical Goals)

1. **C.A.T 硬规则**:`core/` 平台纯净(零 THREE / 零 DOM / 零 zustand 导入),side effect 只以 `SimEvent` 类型事件泄漏;`engine/` 是平台适配层,包含 WebGL2 RC 管线。
2. **2D RC 必须是真实全管线**:5 阶段(prepscene → prepjfa → JFA → distfield → cascade → final)+ dither 回压,probe 数学与 `radiance-cascades-demo` 对齐(§15),不是单 pass additive。
3. **60 FPS @ 1080p 稳定**(预算见 §3.5),低端集显可跑(降级路径降 cascade 数 / 降分辨率 / 关 RC)。
4. **零资产文件**:全部程序化 sprite + Web Audio 合成(沿用 5_gamejam_1 / 6_patapong3D 惯例)。
5. **一击必杀 + 任务式 + 面具系统 + F 切换武器模式** 全部按 Hotline Miami 范式工作。
6. **DEV 可观测性**:`window.__gameManifest()`(世界即文本)+ `window.__sim`(Simulation 实例只读)+ `window.__rcPipeline`(RC 管线状态只读)。
7. **降级路径自动化**:frame time watchdog 检测到持续超标时,自动降级 RC(§3.6)。

### 2.3 目标平台(Target Platform)

| 项 | 最低 | 推荐 |
|---|---|---|
| 硬件 | 2018+ 集显笔记本 | 独显 / 近五年台式 |
| 浏览器 | Chrome / Edge 108+(WebGL2、`EXT_color_buffer_float` 可选) | Chrome 120+ |
| 分辨率 | 1280×720(降级后) | 1920×1080(预算基准) |
| Node(构建期) | ≥ 18(Vite 6 下限) | 20.19+ / 22 LTS |

### 2.4 外部工具与团队角色(External Tools & Roles)

| 工具 | 用途 | 角色 |
|---|---|---|
| Vite 6 + React 19 | 构建 / HMR / dev server 5184 | agent-ui |
| Three.js 0.170 | 渲染器 / EffectComposer / 着色器基座 | agent-engine |
| 原生 WebGL2 framebuffer | RC 管线的 pass 编排 | agent-engine |
| Web Audio API | 全部音频合成(零文件) | agent-audio |
| zustand 5 | UI 状态(仅 UI) | agent-ui |
| Tailwind 3.4 | HUD/菜单样式 | agent-ui |
| Tweakpane(**可选,仅 DEV**) | RC 参数调参;不写进生产 import 图 | agent-engine |

团队:agent-core(纯核心)/ agent-engine(渲染 + RC 管线 / 最大头)/ agent-audio(音频适配)/ agent-ui(UI 覆盖层)/ agent-qa(集成验证,无文件所有权)。

### 2.5 时间线(M0→M4 Timeline)

| 阶段 | 周期 | 交付 | 签核人 |
|---|---|---|---|
| M0 | 2026-08-08 | GDD v2 / TDD v2 / 项目骨架(`tsc -b` 0 error) | agent-qa + 用户 |
| M1 | M0 后 1 周 | 1 房间 + 1 任务 + 走位 + F 切换 + 开火 + RC 全管线(单房间验证) | agent-qa + 用户 |
| M2 | M1 后 1 周 | 任务 1 全部 3 房间 + BOSS + 评分 + 面具解锁 | agent-qa + 用户 |
| M3 | M2 后 1 周 | 任务 2-4 + 隐藏 + 标题 / 选择 / 死亡流程 | agent-qa + 用户 |
| M4 | M3 后 1 周 | RC 性能调优 / Web Audio 调音 / 浏览器冒烟 + 部署 | agent-qa + 用户 |

### 2.6 设计层对账与裁决(Reconciliation & Adjudication)

设计文档共 4 份:`docs/design/01-concept-core-loop.md`(核心循环与数值)、`02-art-direction.md`(美术)、`03-audio-direction.md`(音频)、`04-radiance-cascades-pipeline.md`(RC 管线),其中 01 + 04 为设计层权威(01 = 游戏层,04 = 渲染层)。GDD v2 §0-§11 数值全部纳入 §4.4 冻结默认表。

| # | 冲突点 | 裁决(技术负责) |
|---|---|---|
| R01 | GDD §4.1 移动加速度 60 / 目标速度 8 | **冻结**:60 / 8(§4.4) |
| R02 | GDD §4.2 一击必杀 | **冻结**:玩家一击毙命 + 任务 BOSS 3 击(§4.4 `BOSS_HITS`) |
| R03 | GDD §4.3 武器 v1 8 件(铺 35) | **冻结**:8(§4.4);扩展表 35 件走 M2+ 里程碑 |
| R04 | GDD §4.4 面具 v1 6 个(铺 25) | **冻结**:6(§4.4);扩展表 25 个走 M2+ 里程碑 |
| R05 | GDD §4.5 敌人视野 8u 锥 60° | **冻结**:8u / 60°(§4.4) |
| R06 | GDD §5.1 RC 光源 8 类 | **冻结**:8 类(§4.4);每类签名在 `core/data/lights.ts` |
| R07 | GDD §5.2 RC cascade 数 = 3 | **冻结**:3 cascades(§4.4);probe 数学按 demo |
| R08 | GDD §5.4 RC 性能预算 | **冻结**:6ms / 8ms(§3.5 + §4.4) |
| R09 | GDD §6.3 任务清单 4 件 | **冻结**:4(任务 4 隐藏) |
| R10 | 端口 | **5184**(本项目独占) |
| R11 | 一击必杀 + 翻滚无敌 0.4s | **冻结**:0.4s(§4.4) |
| R12 | 评分 S/A/B/C | **冻结**:基于"完成时间 + 拾取率 + 受弹数"(§4.4 `MissionScore`) |
| R13 | **F 切换近战/远程(硬直 0.15s)** | **冻结**:0.15s(§4.4 `MODE_SWITCH_DURATION`);手感触手可调走 `[TDD-CONTRACT-CHANGE]` |
| R14 | **E 长按投掷当前武器** | **冻结**:0.25s 长按阈值(§4.4 `THROW_HOLD_DURATION`) |
| R15 | **JFA pass 数** | **冻结**:`log2(min(W,H))`(demo 原式),非固定 5 |

---

## 3. 技术总览(Technical Overview)

### 3.1 命名规范(Naming Conventions)

| 类别 | 规则 | 示例 |
|---|---|---|
| 文件 | core/engine 用 `camelCase.ts`;组件 `PascalCase.tsx`;内容数据 `camelCase.ts`;shader `snake_case.{vert,frag}` | `weapons.ts` / `RcPipeline.ts` / `rc.frag` |
| 类型 / 接口 / 枚举 | `PascalCase` | `GamePhase` / `SimEvent` / `WeaponId` |
| 函数 / 变量 | `camelCase` | `step` / `rallyHits` |
| 常量(调参) | `UPPER_SNAKE_CASE`,集中在 `core/constants.ts` | `PLAYER_SPEED_MAX` |
| 状态名 | 全局 FSM 全大写 | `GamePhase.PLAY` |
| Shader 文件 | `core/data` 不可见 shader;shader 全部在 `engine/shaders/` | `engine/shaders/rc.frag` |
| 注释 | 中文注释;公共接口必须有一行用途说明 | — |

编码标准:TypeScript **strict**(`tsconfig.app.json` 已开 `noUnusedLocals/noUnusedParameters/noFallthroughCasesInSwitch/noImplicitOverride`);`as const` 优先;禁止 `any`(如确需则局部注释豁免并交 agent-qa 复核);禁止硬编码魔法数(一律进 `constants.ts` 或 `data/*.ts`)。

### 3.2 技术栈表(Stack Table — 已锁定版本)

| 依赖 | 版本 | 用途 | 所属代理 |
|---|---|---|---|
| vite | ^6.0.0 | 构建 / HMR / dev server 5184 | agent-ui(构建脚本) |
| typescript | ^5.6.0 | 类型检查门(strict) | 全员 |
| @vitejs/plugin-react | ^4.3.0 | React 插件 | agent-ui |
| react / react-dom | ^19.0.0 | UI 覆盖层 | agent-ui |
| @types/react / @types/react-dom | ^19.0.0 | 类型 | agent-ui |
| three / @types/three | ^0.170.0 | 渲染器 / EffectComposer / ShaderMaterial | agent-engine |
| zustand | ^5.0.0 | UI 状态(仅 UI 层) | agent-ui |
| tailwindcss | ^3.4.0 | UI 样式 | agent-ui |
| autoprefixer / postcss | ^10.4.0 / ^8.4.0 | CSS 管线 | agent-ui |
| tweakpane(**可选,仅 DEV**) | ^4.x | 仅 DEV 调参;RC / 武器 / 面具参数面板 | agent-engine |
| node | ≥ 20.19(推荐 22 LTS) | 运行期 | — |
| npm | ≥ 10 | 包管理 | — |

> 注:`package.json` 已就绪,**禁止**任何 agent 擅自增删依赖;确需新依赖 → 向 TDD 契约所有者提变更(§0 冻结规则)。

### 3.3 数据布局(Data Layout)

**运行时内存布局**:
- 模拟权威状态:`Simulation` 内部(`core/simulation/Simulation.ts`)——单真相源。
- UI 可见状态:`src/store.ts`(zustand)——仅由 `GameEngine` 的事件同步驱动,**禁止 UI 直接改模拟**。
- 持久化(localStorage,引擎适配层 `engine/storage.ts` 读写,`core/types.ts` 冻结键名):

| StorageKey | 键名 | 内容形状 | 说明 |
|---|---|---|---|
| `stats` | `hotline-shanghai.v1.stats` | `PersistedStats` | `totalMissions / bestScoreByMission / bestRatingByMission / lastMissionAt` |
| `settings` | `hotline-shanghai.v1.settings` | `{ muted: boolean; volume: number; rcQuality: 'low' \| 'med' \| 'high' }` | 音频 / RC 质量 |
| `unlocks` | `hotline-shanghai.v1.unlocks` | `{ masks: MaskId[]; missions: MissionId[] }` | 面具 / 任务解锁 |

- 持久化读写只发生在:`SimEvent missionEnd` 事件、菜单"Reset"按钮、settings toggle。版本化键名(`.v1`)为 schema 演进预留。
- **存档兼容策略**:读取失败 / 形状不符 → 静默回退默认值并覆盖,**不抛错**。

### 3.4 DEV 钩子(DEV Hooks)

```ts
// engine/devtools.ts — 仅 import.meta.env.DEV 时注入
declare global {
  interface Window {
    __gameManifest?: () => string;   // describeWorld() + describeRules() + describeEntities() + 当前 sim 快照
    __sim?: unknown;                  // Simulation 实例(只读调试)
    __simEvents?: () => SimEvent[];   // 最近 N 个事件
    __rcPipeline?: unknown;           // RC 管线状态(只读)
  }
}
```

- `__gameManifest()` 返回:`describeWorld()`(当前房间 / 任务 / 光源)+ `describeRules()`(物理常量表)+ `describeEntities()`(id 列表)+ 当前 sim 状态快照(world-as-text)。
- `__simEvents()` 返回:最近 64 个 SimEvent(debug 用)。
- `__rcPipeline` 返回:`{ activeCascades, lastFrameTime, lightCount, viewport, jfaPasses, propagationRate, mixFactor }`(调试用)。
- 生产构建(`import.meta.env.DEV === false`)不注册、不引用。

### 3.5 性能预算表(Performance Budget)

基准 60 FPS @ 1080p(16.67ms/帧)。**超预算 = 优先级 1 bug**,M 里程碑验收硬指标。

| 指标 | 预算 | 硬上限 | 备注 |
|---|---|---|---|
| 帧时间(渲染) | ≤ 10ms | 14ms | 含 RC 全管线 |
| **RC prepscene** | ≤ 1ms | 2ms | 单 pass,写 seed(occlusion + emission 合并) |
| **RC JFA**(`log2(min(W,H))` passes,1080p ≈ 10-11) | ≤ 2.5ms | 4ms | 9 邻域跳距减半;每 pass 可跳过跳距 1 |
| **RC distfield** | ≤ 0.5ms | 1ms | 距离场提取 |
| **RC cascade × 3** | ≤ 4.5ms(3 × 1.5ms) | 6ms(3 × 2ms) | 关键路径 |
| **RC final + dither** | ≤ 1ms | 2ms | 合成 + 4×4 Bayer |
| 帧时间(模拟) | ≤ 0.5ms | 1ms | 固定步 1/60 |
| 帧时间(音频) | ≤ 0.5ms | 1ms | Web Audio 节点调度 |
| 帧时间(UI/DOM) | ≤ 0.5ms | 1ms | 仅覆盖层 |
| 像素 sprite 总数 | ≤ 800 | 1200 | 16×16 像素块 |
| RC 中间 framebuffer | 3 × 1920×1080 RGBA8 | 6 × 1920×1080 | 减少 viewport 见 §3.6 |
| 同时音频声部 | ≤ 6 voices | 8 voices | 优先级抢占(§4.4) |
| 活动 RC 光源 | ≤ 16 | 32 | 超过 → 优先级排序,丢最远 |
| WebGL 对象 | — | 泄漏 0 | rAF 循环外禁用 resize 创建 |
| 内存预算 | ≤ 256 MB | 512 MB | RC 中间 FB 占大头 |

### 3.6 性能降级路径(Performance Degradation,autopilot)

```ts
// engine/PerfWatchdog.ts
if (rollingAvgFrameTime > 14ms for 3 frames) {
  applyDegradation('RC_CASCADE_REDUCE');    // cascade 3 → 2
}
if (rollingAvgFrameTime > 14ms for 6 frames) {
  applyDegradation('RC_HALF_RES');          // 1080p → 540p(仅 RC)
}
if (rollingAvgFrameTime > 14ms for 12 frames) {
  applyDegradation('RC_OFF');              // RC 全关,回退纯 base color(性能优先)
}
if (rollingAvgFrameTime < 10ms for 120 frames) {
  removeDegradation();                       // 自动恢复
}
```

降级状态可由 `__rcPipeline` 读出。**不**写入 localStorage(只在本次会话生效)。

---

## 4. 游戏机制即架构(Mechanics → Architecture)

### 4.1 机制→模块映射

| 机制 | core 模块 | engine 模块 | 触发事件 |
|---|---|---|---|
| 玩家移动 | `simulation/player.ts` | `engine/InputManager.ts`(按键)+ `engine/SceneManager.ts`(渲染) | (无事件) |
| **F 模式切换** | `simulation/player.ts`(mode + 硬直) | `engine/InputManager.ts`(F 键) | `modeSwitch` |
| 玩家攻击(按模式) | `simulation/weapons.ts`(子弹 / 挥砍 / 投掷) | `engine/InputManager.ts`(LMB) | `fire` / `melee` / `throw` |
| **E 拾取 / 长按投掷** | `simulation/weapons.ts` | `engine/InputManager.ts`(E 键 hold) | `weaponPicked` / `weaponThrown` |
| 一击必杀 | `simulation/damage.ts` | — | `enemyKilled` / `playerKilled` |
| 武器拾取 | `simulation/weapons.ts` | — | `weaponPicked` |
| 面具拾取 | `simulation/masks.ts` | — | `maskPicked` |
| 敌人 AI | `simulation/enemyAI.ts` | — | `enemyAlert` / `enemyAttack` |
| 任务进度 | `simulation/mission.ts` | `engine/GameEngine.ts`(FSM) | `roomEnter` / `roomClear` / `missionEnd` |
| 评分 | `simulation/mission.ts` | `engine/GameEngine.ts`(显示) | `missionEnd` |
| **RC 光源触发** | `simulation/rcnodes.ts`(注册光源) | `engine/RcPipeline.ts`(管线渲染) | `fire` / `throw` / `roomEnter` |
| 灯光物理(动 / 静态) | `core/data/lights.ts`(配方)+ `simulation/rcnodes.ts`(活动态) | `engine/RcPipeline.ts` | (持续每帧) |
| 音频合成 | `data/sfx.ts`(配方数据) | `engine/AudioManager.ts` | `sfx` |
| 暂停 / 死亡 | `simulation/pauseAndDeath.ts` | `engine/GameEngine.ts` | `playerKilled` |

### 4.2 主循环(Main Loop)

```
rAF 回调 (engine/GameEngine.ts)
  ↓
  beginFrame()                    // 帧时间累加
  ↓
  while accumulator >= FIXED_DT (1/60) {
    accumulator -= FIXED_DT
    sim.step(FIXED_DT)            // 模拟推进一固定步
  }
  ↓
  // 视觉层使用真实 elapsed dt
  sceneManager.update(elapsedDt)  // camera follow, sprite 位置
  audioManager.update(elapsedDt)  // voice 调度
  ↓
  rcPipeline.render(scene) {      // ⭐ RC 全管线(§15)
    1. prepscene pass: scene → seed 纹理(occlusion + emission)
    2. prepjfa: 种子编码
    3. JFA × log2(min(W,H)): 9 邻域跳距减半 → 最近 seed 距离场
    4. distfield: 距离场提取
    5. cascade × N: SDF + light → radiance(ping-pong)
    6. final pass: scene + radiance + dither → screen
  }
  ↓
  store.sync(sim.snapshot())      // 同步到 zustand(每 2 帧 1 次)
  ↓
  endFrame()
```

**关键点**:
- 模拟固定步 1/60,渲染 rAF 可变。
- 音频节点调度走 Web Audio 内置时间轴。
- 每 2 帧 sync 一次到 zustand(避免 React 过度 re-render)。
- RC 管线独立于主循环的固定步,**按帧**(rAF 节奏)运行,因为它处理的是视觉。

### 4.3 全局 FSM 规格(Global FSM)

```
                    ┌────────────────────────────────┐
                    │                                │
                    ↓                                │
              ┌──────────┐    click "PLAY"           │
   start ────→│  TITLE   │ ──────────────────────┐  │
              └──────────┘                       │  │
                    │ click "CONTINUE" / 选择  │  │
                    ↓                            ↓  │
              ┌──────────┐                     ┌──────────┐
              │  BRIEF   │ Tab / Enter         │  MISSION │
              │(电话文本)│ ──────────────────→ │  SELECT  │
              └──────────┘                     └──────────┘
                    │                                  │ click 任务
                    ↓                                  ↓
              ┌──────────────────────────────────────────────┐
              │  MISSION (FSM 详见 §4.3.1)                  │
              │  LOADING → BRIEF_IN → ROOM_1 → ... → END  │
              └──────────────────────────────────────────────┘
                                  │ missionEnd
                                  ↓
                            ┌──────────┐
                            │ SCORE    │ → Mask Select → Mission Select
                            └──────────┘
```

**GamePhase 枚举**(冻结):
```ts
export const GamePhase = {
  TITLE: 'TITLE',
  BRIEF: 'BRIEF',
  MISSION_SELECT: 'MISSION_SELECT',
  MISSION_LOADING: 'MISSION_LOADING',
  MISSION_BRIEF_IN: 'MISSION_BRIEF_IN',
  MISSION_PLAY: 'MISSION_PLAY',
  MISSION_DEATH: 'MISSION_DEATH',
  MISSION_END: 'MISSION_END',
  SCORE: 'SCORE',
  MASK_SELECT: 'MASK_SELECT',
} as const;
export type GamePhase = (typeof GamePhase)[keyof typeof GamePhase];
```

#### 4.3.1 Mission 子 FSM

```
MISSION_LOADING (load mission, restore stats)
  ↓ load done
MISSION_BRIEF_IN (打字机文本,3-5s)
  ↓ done / Tab
MISSION_PLAY
  ├ ROOM_1 → clear → ROOM_2 → clear → ROOM_3 → clear → END
  └ playerKilled → MISSION_DEATH → 1.2s → ROOM_1(同任务 reset)
MISSION_END
  ↓ 评分
SCORE → Mask Select → Mission Select
```

**Room 子 FSM**:
```
ROOM_ENTER (1s fade-in, 敌人摆位)
  ↓
ROOM_PLAY (走位 / 开火 / 拾取)
  ├ enemies == 0 → ROOM_CLEAR
  └ playerKilled → DEATH
ROOM_CLEAR (0.8s 展示清除效果 + 灯全亮)
  ↓
ROOM_EXIT (0.5s fade-out, 切下一房间)
```

### 4.4 默认数值表(冻结,所有引用 = 这里的值)

#### 4.4.1 玩家

| 字段 | 值 | 字段 | 值 |
|---|---|---|---|
| `PLAYER_SPEED_MAX` | 8 u/s | `PLAYER_ACCEL` | 60 u/s² |
| `PLAYER_DECEL` | 80 u/s² | `PLAYER_BOUND_X` | [-22, +22] u |
| `PLAYER_BOUND_Y` | [-14, +14] u | `PLAYER_RADIUS` | 0.5 u |
| `PLAYER_MELEE_RANGE` | 1.4 u | `PLAYER_MELEE_ARC_DEG` | 60° |
| `PLAYER_MELEE_DURATION` | 0.2s | `PLAYER_DASH_SPEED` | 14 u/s |
| `PLAYER_DASH_DURATION` | 0.2s | `PLAYER_DASH_COOLDOWN` | 1.0s |
| `PLAYER_DODGE_INVULN` | 0.4s | `PLAYER_DODGE_COOLDOWN` | 1.5s |
| `PLAYER_RELOAD_DURATION` | 1.5s | `PLAYER_HITS_TO_KILL_BOSS` | 3 |
| **`MODE_SWITCH_DURATION`** | **0.15s** | **`THROW_HOLD_DURATION`** | **0.25s** |

#### 4.4.2 武器(v1 锁 8 件,冻结)

| ID | `damage` | `ammo` | `fireRate` | `reloadTime` | `range` | `spread` | `type` |
|---|---|---|---|---|---|---|---|
| `knife` | 1 | ∞ | 5.0/s | 0 | 1.4 | 0 | melee |
| `bat` | 1 | ∞ | 1.5/s | 0 | 2.0 | 0 | melee |
| `mauser_c96` | 1 | 10 | 2.0/s | 1.5 | 24 | 0.01 | ranged |
| `boxer` | 1 | 20 | 10.0/s | 2.0 | 18 | 0.05 | ranged |
| `thompson` | 1 | 50 | 12.0/s | 3.0 | 20 | 0.04 | ranged |
| `mosin` | 1 | 5 | 1.0/s | 2.5 | 64 | 0.005 | ranged |
| `grenade` | 1 (AoE) | 3 | 1.0/s | 0 | 12 | 0 | throw |
| `throwing_knife` | 1 (2 backstab) | 5 | 1.5/s | 0 | 16 | 0 | throw |

> 单位:`damage` = 击数(都是 1 击必杀,除 BOSS);`ammo` = 弹匣;`fireRate` = 1/s;`range` = 最大射程 u;`spread` = 0..1 角度标准差。

#### 4.4.2b 武器扩展路线(M2+ 里程碑,非 v1 冻结;签名同 4.4.2)

| 批次 | 新增 ID(草案) | 类型 | 说明 |
|---|---|---|---|
| M2 | `axe` / `stiletto` | melee | 斧(慢 1.0/s,范围 2.4)/ 短刀(极快 8.0/s,范围 1.0) |
| M2 | `shotgun` / `revolver` | ranged | 霰弹(3 弹扇形 0.2 spread)/ 左轮(6 发,1.5/s) |
| M2 | `molotov` / `cleaver` | throw | 燃烧瓶(持续 3s 火场 + 光源)/ 菜刀(抛物线,可回收) |
| M3 | `bayonet` / `nunchaku` / `brick` | melee/throw | 刺刀(冲刺攻击)/ 双截棍(两段)/ 砖头(极速短距) |
| M3 | `browning` / `sniper` / `flare_gun` | ranged | 勃朗宁(中速 8/s)/ 狙击(超长 96u)/ 信号枪(照明 + 点燃) |
| M4+ | 其余至 35 件 | 混合 | 每件必须差异手感,禁止纯数值换皮 |

#### 4.4.3 面具(v1 锁 6 个,冻结)

| ID | 名称 | 效果 | 参数 |
|---|---|---|---|
| `actor` | 戏子 | 进入房间 0.5s 内所有敌人攻击延迟 | `slowMoDuration=0.5s, slowMoFactor=0.3` |
| `runner` | 帮工 | 拾取武器直接满弹 | `ammoRefill=true` |
| `righteous` | 蒙面义士 | 一击必杀范围 +0.5u | `meleeRangeBonus=0.5u` |
| `dancer` | 舞女 | 翻滚冷却 -50% | `dodgeCooldownMult=0.5` |
| `waiter` | 茶馆跑堂 | 敌人视野 / 听觉 -30% | `enemySenseMult=0.7` |
| `officer` | 军爷 | 持枪移动 +20% | `playerSpeedMult=1.2, requiresWeapon='ranged'` |

#### 4.4.3b 面具扩展路线(M2+ 里程碑,非 v1 冻结;签名同 4.4.3,新增 `MaskEffect` kind 需走 `[TDD-CONTRACT-CHANGE]`)

| 批次 | 新增 ID(草案) | 效果 |
|---|---|---|
| M2 | `tiger` | 击杀后 0.5s 移动 +40%(对标 HM 虎头) |
| M2 | `pig` | 枪械掉落率 +50%(对标 HM 猪头) |
| M2 | `owl` | 隐藏密道 / 收集品发光可见(对标 HM 猫头鹰) |
| M3 | `fox` | 枪声传播半径 -50%(潜行) |
| M3 | `wolf` | 敌人视野 +50% 且仇恨锁定玩家(挑战型) |
| M3 | `horse` | 翻滚后 0.3s 内下一击必杀(处决链) |
| M4+ | 其余至 25 个 | 每个都是玩法钩子 |

#### 4.4.4 敌人

| 字段 | 值 | 字段 | 值 |
|---|---|---|---|
| `ENEMY_VIEW_DISTANCE` | 8 u | `ENEMY_VIEW_ARC_DEG` | 60° |
| `ENEMY_HEAR_DISTANCE` | 4 u | `ENEMY_FIRE_DISTANCE` | 14 u |
| `ENEMY_SPEED_PATROL` | 3 u/s | `ENEMY_SPEED_ALERT` | 5 u/s |
| `ENEMY_REACT_TIME` | 0.4s | `ENEMY_FIRE_RATE` | 1.5/s |
| `ENEMY_HITS_TO_KILL` | 1 | `BOSS_HITS` | 3 |

#### 4.4.5 任务 / 房间

| 字段 | 值 | 字段 | 值 |
|---|---|---|---|
| `MISSION_DURATION_TARGET` | 180s | `ROOM_ENTER_FADE` | 1.0s |
| `ROOM_CLEAR_DELAY` | 0.8s | `ROOM_EXIT_FADE` | 0.5s |
| `DEATH_RESPAWN_DELAY` | 1.2s | `BRIEF_TYPEWRITER_SPEED` | 0.04s/字 |
| `TASKS_TOTAL` | 4 | `HIDDEN_TASK_REQUIRED_S` | 3 |
| `SCORE_S_THRESHOLD` | 90 | `SCORE_A_THRESHOLD` | 75 |
| `SCORE_B_THRESHOLD` | 60 | `SCORE_C_THRESHOLD` | 0 |

#### 4.4.6 RC 管线(v2,按 demo 真实算法)

| 字段 | 值 | 字段 | 值 |
|---|---|---|---|
| `RC_CASCADE_COUNT` | 3 | `RC_BASE_RAY_COUNT` | 4 |
| `RC_BASE_INTERVAL_PX` | 0.5 | `RC_JFA_PASSES` | `log2(min(W,H))`(1080p≈10-11) |
| `RC_JFA_RESOLUTION_SCALE` | 1.0 | `RC_LIGHT_RADIUS_FALLOFF` | inverse-square |
| `RC_LIGHT_INTENSITY_GAMMA` | 2.2 | `RC_MAX_ACTIVE_LIGHTS` | 16 |
| `RC_HALF_RES_SCALE` | 0.5 | `RC_DITHER_MATRIX` | 4×4 Bayer |
| `RC_RAY_BUDGET_PER_PIXEL` | 16 | `RC_RAY_BUDGET_TOTAL_HARD_CAP` | 64 |
| `RC_MAX_RAY_STEPS` | 128(demo 常量) | `RC_EPS` | 0.0005(demo 常量) |
| **`RC_PROPAGATION_RATE`** | **0.85**(demo 默认风格) | **`RC_MIX_FACTOR`** | **0.5** |
| `RC_PERF_DEGRADE_FRAMES` | 3 (>10ms) | `RC_RECOVERY_FRAMES` | 120 (<8ms) |

> `RC_PROPAGATION_RATE`(光传播衰减,用于 lighting 合并)与 `RC_MIX_FACTOR`(scene 色 / 上一帧光混合比)对应 demo `rc.frag` / `gi.frag` 同名 uniform,进 Tweakpane 调参面板。

#### 4.4.7 RC 光源(8 类)

| ID | 颜色 | 强度 | 半径 | 触发 | TTL |
|---|---|---|---|---|---|
| `muzzle_flash` | `#ff8a3a` | 1.0 | 8u | 远程开火 | 0.05s |
| `explosion` | `#ff8a3a` | 2.0 | 6u | 手雷爆炸 | 0.2s |
| `oil_lamp` | `#ffc966` | 0.4 | 5u | 静态道具 | static |
| `neon_sign` | `#3ad8ff` | 0.6 | 12u | 静态道具(脉动) | static |
| `searchlight` | `#e0e0ff` | 0.8 | 16u | 静态道具(旋转) | static |
| `surgical` | `#ffffff` | 0.7 | 8u | 静态道具 | static |
| `disco` | `#ff5cb4` ↔ `#3ad8ff` | 0.5 | 10u | 静态道具(脉动) | static |
| `blood_splash` | `#a02020` | 0.3 | 2u | 击杀瞬间 | 0.5s |

#### 4.4.8 调色板(§7 Art Direction 数值)

| 名称 | hex | 用途 |
|---|---|---|
| `PAL_INK` | #0e0d12 | 弄堂深处墨色 / 玩家风衣 |
| `PAL_PLASTER` | #1a1922 | 灰泥墙地面 |
| `PAL_RUST` | #5e2418 | 木门铁锈 / 墙 |
| `PAL_TEAL` | #1c4d4a | 苏州河水 |
| `PAL_LANTERN` | #c8421c | 红灯笼 / 旗袍 |
| `PAL_NEON` | #9c2c2c | 老式霓虹 |
| `PAL_PAPER` | #d8c89a | 黄包车票 / 纸 |
| `PAL_IVORY` | #e8d8b4 | 米色蒙面 / 旗袍边 |
| `PAL_JADE` | #3a8060 | 翡翠配饰 |
| `PAL_STEEL` | #3a3a3a | 步枪 / 玩家帽 |
| `PAL_MUZZLE` | #ff8a3a | 枪火高亮 |
| `PAL_BLOOD` | #a02020 | 血 |

### 4.5 状态转移表(FSM Transition Table)

#### 4.5.1 Global FSM

| From | Event | To | Side Effect |
|---|---|---|---|
| TITLE | click "PLAY" / Enter | MISSION_SELECT | load unlocks from localStorage |
| MISSION_SELECT | click mission card | MISSION_LOADING | reset sim, set current mission |
| MISSION_LOADING | load done | MISSION_BRIEF_IN | show typewriter text |
| MISSION_BRIEF_IN | done / Tab | MISSION_PLAY | enter first room |
| MISSION_PLAY | playerKilled | MISSION_DEATH | freeze sim, start respawn timer |
| MISSION_DEATH | 1.2s | MISSION_PLAY | reset to room 1, keep mission score |
| MISSION_PLAY | roomClear AND last room | MISSION_END | emit `missionEnd` event |
| MISSION_END | 1.5s | SCORE | calculate score |
| SCORE | click "CONTINUE" | MASK_SELECT | unlock mask if S-rank |
| MASK_SELECT | click mask | MISSION_SELECT | persist stats |
| * | Esc | TITLE | (confirm dialog) |

#### 4.5.2 Room FSM

| From | Event | To | Side Effect |
|---|---|---|---|
| ROOM_ENTER | 1.0s timer done | ROOM_PLAY | enable player input, activate enemies |
| ROOM_PLAY | enemies.allDead | ROOM_CLEAR | start 0.8s timer |
| ROOM_PLAY | playerKilled | DEATH | (mission-level handler) |
| ROOM_CLEAR | 0.8s timer done | ROOM_EXIT | start 0.5s timer |
| ROOM_EXIT | 0.5s timer done | (next room) ROOM_ENTER | load next room layout |

#### 4.5.3 玩家模式切换(Player Mode FSM,v2 新增)

```
MODE_MELEE ──F 键──→ MODE_SWITCHING(0.15s 硬直)──→ MODE_RANGED
MODE_RANGED ──F 键──→ MODE_SWITCHING(0.15s 硬直)──→ MODE_MELEE
```

| From | Event | To | Side Effect |
|---|---|---|---|
| MODE_MELEE | F | MODE_SWITCHING | 播放拔枪音,`modeSwitch` 事件 |
| MODE_SWITCHING | 0.15s timer done | MODE_RANGED | 当前武器 = 最近的 ranged;无枪则 MODE_MELEE |
| MODE_RANGED | F | MODE_SWITCHING | 播放收枪音,`modeSwitch` 事件 |
| MODE_SWITCHING | 0.15s timer done | MODE_MELEE | 当前武器 = 最近的 melee |
| * | 空手 | MODE_MELEE | 无武器时强制近战(拳头 1 击) |

---

## 5. 契约速写(冻结,真实 TS)

> **本节是最高优先级**。所有 coder 必须按下面的类型签名实现。
> 完整源码在 `src/core/types.ts` / `src/core/constants.ts` / `src/core/simulation/Simulation.ts`(M1 由 agent-core 实现)。
> **v2 变更**:`WeaponMode` 类型、`Player.mode` / `Player.modeSwitchTimer`、输入 `toggleMode` / `throwWeapon`、`SimEvent.modeSwitch` / `weaponThrown`。

### 5.1 `core/types.ts`(冻结)

```ts
// ─── 基础类型 ───
export type Vec2 = { x: number; y: number };
export type Vec3 = { x: number; y: number; z: number };

export const GamePhase = {
  TITLE: 'TITLE',
  BRIEF: 'BRIEF',
  MISSION_SELECT: 'MISSION_SELECT',
  MISSION_LOADING: 'MISSION_LOADING',
  MISSION_BRIEF_IN: 'MISSION_BRIEF_IN',
  MISSION_PLAY: 'MISSION_PLAY',
  MISSION_DEATH: 'MISSION_DEATH',
  MISSION_END: 'MISSION_END',
  SCORE: 'SCORE',
  MASK_SELECT: 'MASK_SELECT',
} as const;
export type GamePhase = (typeof GamePhase)[keyof typeof GamePhase];

// ─── 武器模式(v2 新增)───
export type WeaponMode = 'melee' | 'ranged' | 'throwing';
//   'throwing' = E 长按投掷当前武器时激活(瞬时,0.25s hold)

// ─── 武器 ───
export type WeaponId =
  | 'knife' | 'bat'
  | 'mauser_c96' | 'boxer' | 'thompson' | 'mosin'
  | 'grenade' | 'throwing_knife';
// M2+ 扩展 ID 通过同类型字面量扩展(axe / shotgun / molotov / ...)

export type WeaponType = 'melee' | 'ranged' | 'throw';

export interface WeaponSpec {
  id: WeaponId;
  nameZh: string;
  nameEn: string;
  type: WeaponType;
  damage: number;          // 击数(1 击必杀,除 BOSS)
  ammo: number;            // 弹匣(∞ 用 Infinity)
  fireRate: number;        // 1/s
  reloadTime: number;      // 秒
  range: number;           // u
  spread: number;          // 0..1 角度标准差
  projectileSpeed?: number; // u/s(ranged 适用,默认 60)
  explosionRadius?: number; // u(throw 适用,手雷)
  silent?: boolean;        // 不触发 ENEMY_HEAR(飞刀)
}

// ─── 面具 ───
export type MaskId =
  | 'actor' | 'runner' | 'righteous' | 'dancer' | 'waiter' | 'officer';
// M2+ 扩展 ID: tiger / pig / owl / fox / wolf / horse / ...

export interface MaskSpec {
  id: MaskId;
  nameZh: string;
  nameEn: string;
  description: string;
  effect: MaskEffect;
}

export type MaskEffect =
  | { kind: 'slowMoOnRoomEnter'; slowMoDuration: number; slowMoFactor: number }
  | { kind: 'ammoRefillOnPickup' }
  | { kind: 'meleeRangeBonus'; bonus: number }
  | { kind: 'dodgeCooldownMult'; multiplier: number }
  | { kind: 'enemySenseMult'; multiplier: number }
  | { kind: 'playerSpeedMult'; multiplier: number; requiresWeapon: 'ranged' | 'melee' | 'any' };
// M2+ 新 kind(如 killSpeedMult / dropRateMult / hiddenReveal)必须走 [TDD-CONTRACT-CHANGE]

// ─── 实体 ───
export interface Player {
  position: Vec2;
  velocity: Vec2;
  facingAngle: number;       // 弧度
  hp: number;                // 1(等于一击毙命)
  ammo: number;
  reloading: number;         // 0..reloadTime
  weapon: WeaponId | null;   // null = 空手(拳头)
  mode: WeaponMode;          // v2:当前模式(melee / ranged)
  modeSwitchTimer: number;   // v2:0..MODE_SWITCH_DURATION(切换硬直)
  activeMask: MaskId | null;
  dodgeTimer: number;        // 0..PLAYER_DODGE_INVULN
  dodgeCooldown: number;     // 0..PLAYER_DODGE_COOLDOWN
  dashTimer: number;
  dashCooldown: number;
  kills: number;             // 本任务
  hitsTaken: number;         // 本任务
}

export type EnemyArchetype = 'soldier' | 'policeman' | 'spy' | 'boss';

export interface Enemy {
  id: string;
  archetype: EnemyArchetype;
  position: Vec2;
  velocity: Vec2;
  facingAngle: number;
  hp: number;                // boss=3, 其他=1
  state: 'patrol' | 'suspicious' | 'alert' | 'engaging';
  weapon: WeaponId;          // 简化:都是单发手枪
  patrolTarget: Vec2 | null; // patrol 时随机选
  lastSeenPlayerAt: Vec2 | null;
  alertTimer: number;
  fireCooldown: number;
}

export interface Bullet {
  id: string;
  ownerId: 'player' | string;  // 'player' 或 enemy.id
  position: Vec2;
  velocity: Vec2;
  damage: number;
  weaponId: WeaponId;
  ttl: number;               // 秒
}

export interface MeleeSwing {
  ownerId: 'player' | string;
  position: Vec2;
  facingAngle: number;
  range: number;
  arcDeg: number;
  ttl: number;
  damage: number;
  weaponId: WeaponId;
}

export interface Grenade {
  id: string;
  position: Vec2;
  velocity: Vec2;
  timer: number;             // 1.5s 后爆
  radius: number;
  damage: number;
}

export interface ThrownWeapon {   // v2:E 长按投掷的武器(地上弹跳物,可被捡回)
  id: string;
  weaponId: WeaponId;
  position: Vec2;
  velocity: Vec2;
  spin: number;              // 渲染旋转
  ttl: number;
}

// ─── 房间 ───
export type TileChar = '.' | '#' | 'D' | 'L' | 'N' | 'S' | 'X';
//   '.' = 地板  '#' = 墙    'D' = 门    'L' = 油灯  'N' = 霓虹  'S' = 探照灯   'X' = 静态掩体

export interface RoomLayout {
  id: string;
  nameZh: string;
  width: number;             // tile
  height: number;            // tile
  tileSize: number;          // u/tile,默认 1
  tiles: string[];           // 每行一字符串
  playerSpawn: Vec2;         // tile coords
  enemySpawns: Vec2[];
  weaponSpawns: { tile: Vec2; weaponId: WeaponId }[];
  maskSpawns: { tile: Vec2; maskId: MaskId }[];
  exitTile: Vec2 | null;
}

export interface Mission {
  id: string;
  nameZh: string;
  rooms: RoomLayout[];
  finalBossId: string;       // 对应某个 enemy.id
  brief: string;             // 打字机文本
  ratingS: number;           // 分
  ratingA: number;
  ratingB: number;
}

// ─── 评分 ───
export type Rating = 'S' | 'A' | 'B' | 'C';

export interface MissionScore {
  missionId: string;
  timeSeconds: number;
  pickupRate: number;        // 0..1
  hitsTaken: number;
  total: number;             // 0..100
  rating: Rating;
}

// ─── RC 光源 ───
export type RcLightKind =
  | 'muzzle_flash' | 'explosion'
  | 'oil_lamp' | 'neon_sign' | 'searchlight' | 'surgical' | 'disco'
  | 'blood_splash';

export interface RcLightSpec {
  kind: RcLightKind;
  colorHex: string;          // '#rrggbb'
  intensity: number;         // 0..N
  radius: number;            // u
  ttl?: number;              // 秒,静态光源不设
  pulse?: 'sine' | 'rotate' | null;  // 静态光源可选脉动 / 旋转
  pulseHz?: number;
}

export interface ActiveRcLight {
  id: string;
  kind: RcLightKind;
  position: Vec2;
  colorRgb: { r: number; g: number; b: number };
  intensity: number;
  radius: number;
  ttl: number;               // 剩余 TTL(秒),静态 = Infinity
}

// ─── 事件(模拟 → 引擎 / UI)───
export type SimEvent =
  | { kind: 'fire'; ownerId: 'player' | string; weaponId: WeaponId; position: Vec2; angle: number }
  | { kind: 'melee'; ownerId: 'player' | string; weaponId: WeaponId; position: Vec2; angle: number }
  | { kind: 'throw'; ownerId: 'player' | string; weaponId: WeaponId; position: Vec2; velocity: Vec2 }
  | { kind: 'explosion'; position: Vec2; radius: number; damage: number }
  | { kind: 'enemyKilled'; enemyId: string; position: Vec2 }
  | { kind: 'playerKilled'; position: Vec2 }
  | { kind: 'weaponPicked'; weaponId: WeaponId }
  | { kind: 'maskPicked'; maskId: MaskId }
  | { kind: 'modeSwitch'; to: WeaponMode }          // v2 新增:F 切换
  | { kind: 'weaponThrown'; weaponId: WeaponId; position: Vec2 } // v2 新增:E 长按投掷
  | { kind: 'enemyAlert'; enemyId: string; position: Vec2 }
  | { kind: 'enemyAttack'; enemyId: string; position: Vec2 }
  | { kind: 'rcLightSpawned'; light: ActiveRcLight }
  | { kind: 'rcLightExpired'; lightId: string }
  | { kind: 'roomEnter'; roomId: string }
  | { kind: 'roomClear'; roomId: string }
  | { kind: 'missionEnd'; score: MissionScore }
  | { kind: 'sfx'; recipeId: string; volume?: number }
  | { kind: 'phaseChanged'; from: GamePhase; to: GamePhase };

// ─── 持久化 ───
export interface PersistedStats {
  totalMissions: number;
  bestScoreByMission: Record<string, number>;
  bestRatingByMission: Record<string, Rating>;
  lastMissionAt: number;       // unix ms
}

export interface PersistedSettings {
  muted: boolean;
  volume: number;              // 0..1
  rcQuality: 'low' | 'med' | 'high';
}

export interface PersistedUnlocks {
  masks: MaskId[];
  missions: MissionId[];
}

export type MissionId = 'm1_workshop' | 'm2_teahouse' | 'm3_print' | 'm4_postman';

// ─── 输入(v2 增补 toggleMode / throwWeapon)───
export type PlayerInput =
  | { kind: 'move'; dir: Vec2 }
  | { kind: 'aim'; angle: number }
  | { kind: 'attackStart' }          // LMB 按下(按当前 mode 攻击)
  | { kind: 'attackEnd' }
  | { kind: 'toggleMode' }           // F:切换近战 / 远程(v2)
  | { kind: 'interactStart' }        // E 按下(v2:拾取 / 开门)
  | { kind: 'throwStart' }           // E 长按 0.25s 后进入投掷(v2)
  | { kind: 'throwEnd' }
  | { kind: 'dash' }
  | { kind: 'dodge' }
  | { kind: 'reload' }
  | { kind: 'pause' }
  | { kind: 'quitToTitle' };

// ─── Simulation 接口 ───
export interface ISimulation {
  readonly phase: GamePhase;
  step(dt: number): void;
  input(action: PlayerInput): void;
  snapshot(): SimSnapshot;
  events: SimEvent[];          // 最近 N 个
}

export interface SimSnapshot {
  phase: GamePhase;
  player: Player;
  enemies: Enemy[];
  bullets: Bullet[];
  melee: MeleeSwing[];
  grenades: Grenade[];
  thrownWeapons: ThrownWeapon[];   // v2 新增
  activeLights: ActiveRcLight[];
  currentRoom: RoomLayout | null;
  currentMission: Mission | null;
  missionScore: MissionScore | null;
  lights: Record<RcLightKind, RcLightSpec>;
}
```

### 5.2 `core/constants.ts`(冻结,节选)

```ts
// 玩家(§4.4.1)
export const PLAYER_SPEED_MAX = 8;
export const PLAYER_ACCEL = 60;
export const PLAYER_DECEL = 80;
export const PLAYER_BOUND_X: [number, number] = [-22, 22];
export const PLAYER_BOUND_Y: [number, number] = [-14, 14];
export const PLAYER_RADIUS = 0.5;
export const PLAYER_MELEE_RANGE = 1.4;
export const PLAYER_MELEE_ARC_DEG = 60;
export const PLAYER_MELEE_DURATION = 0.2;
export const PLAYER_DASH_SPEED = 14;
export const PLAYER_DASH_DURATION = 0.2;
export const PLAYER_DASH_COOLDOWN = 1.0;
export const PLAYER_DODGE_INVULN = 0.4;
export const PLAYER_DODGE_COOLDOWN = 1.5;
export const PLAYER_RELOAD_DURATION = 1.5;
export const PLAYER_HITS_TO_KILL_BOSS = 3;
// v2:模式切换硬直 / E 长按投掷阈值
export const MODE_SWITCH_DURATION = 0.15;
export const THROW_HOLD_DURATION = 0.25;

// 武器(§4.4.2)— 完整数据在 core/data/weapons.ts
export const WEAPON_TABLE: Record<WeaponId, WeaponSpec> = { ... };

// 面具(§4.4.3)— 完整数据在 core/data/masks.ts
export const MASK_TABLE: Record<MaskId, MaskSpec> = { ... };

// 敌人(§4.4.4)
export const ENEMY_VIEW_DISTANCE = 8;
export const ENEMY_VIEW_ARC_DEG = 60;
export const ENEMY_HEAR_DISTANCE = 4;
export const ENEMY_FIRE_DISTANCE = 14;
export const ENEMY_SPEED_PATROL = 3;
export const ENEMY_SPEED_ALERT = 5;
export const ENEMY_REACT_TIME = 0.4;
export const ENEMY_FIRE_RATE = 1.5;
export const ENEMY_HITS_TO_KILL = 1;
export const BOSS_HITS = 3;

// 任务(§4.4.5)
export const MISSION_DURATION_TARGET = 180;
export const ROOM_ENTER_FADE = 1.0;
export const ROOM_CLEAR_DELAY = 0.8;
export const ROOM_EXIT_FADE = 0.5;
export const DEATH_RESPAWN_DELAY = 1.2;
export const BRIEF_TYPEWRITER_SPEED = 0.04;
export const TASKS_TOTAL = 4;
export const HIDDEN_TASK_REQUIRED_S = 3;
export const SCORE_S_THRESHOLD = 90;
export const SCORE_A_THRESHOLD = 75;
export const SCORE_B_THRESHOLD = 60;
export const SCORE_C_THRESHOLD = 0;

// RC 管线(§4.4.6)— v2 按 radiance-cascades-demo 真实算法
export const RC_CASCADE_COUNT = 3;
export const RC_BASE_RAY_COUNT = 4;
export const RC_BASE_INTERVAL_PX = 0.5;
export const RC_JFA_PASSES = -1;     // -1 = 运行时按 log2(min(W,H)) 计算
export const RC_JFA_RESOLUTION_SCALE = 1.0;
export const RC_LIGHT_RADIUS_FALLOFF = 'inverse-square';
export const RC_LIGHT_INTENSITY_GAMMA = 2.2;
export const RC_MAX_ACTIVE_LIGHTS = 16;
export const RC_HALF_RES_SCALE = 0.5;
export const RC_DITHER_MATRIX_SIZE = 4;
export const RC_RAY_BUDGET_PER_PIXEL = 16;
export const RC_RAY_BUDGET_TOTAL_HARD_CAP = 64;
export const RC_MAX_RAY_STEPS = 128;   // demo rc.frag 常量
export const RC_EPS = 0.0005;          // demo rc.frag 常量
export const RC_PROPAGATION_RATE = 0.85;
export const RC_MIX_FACTOR = 0.5;
export const RC_PERF_DEGRADE_FRAMES = 3;
export const RC_RECOVERY_FRAMES = 120;

// RC 光源(§4.4.7)— 完整数据在 core/data/lights.ts
export const RC_LIGHT_TABLE: Record<RcLightKind, RcLightSpec> = { ... };

// 调色板(§4.4.8)
export const PAL_INK = '#0e0d12';
export const PAL_PLASTER = '#1a1922';
export const PAL_RUST = '#5e2418';
export const PAL_TEAL = '#1c4d4a';
export const PAL_LANTERN = '#c8421c';
export const PAL_NEON = '#9c2c2c';
export const PAL_PAPER = '#d8c89a';
export const PAL_IVORY = '#e8d8b4';
export const PAL_JADE = '#3a8060';
export const PAL_STEEL = '#3a3a3a';
export const PAL_MUZZLE = '#ff8a3a';
export const PAL_BLOOD = '#a02020';
```

### 5.3 `engine/RcPipeline.ts` 接口契约(冻结)

```ts
// engine/RcPipeline.ts
import type { RoomLayout, ActiveRcLight } from '../core/types';

export interface RcPipelineConfig {
  cascadeCount: number;       // 1..3
  baseRayCount: number;       // 2..8
  baseIntervalPx: number;     // demo uBaseInterval(像素)
  jfaPasses: number;          // -1 = 自动(log2(min(W,H)))| 0..13 手动
  resolutionScale: number;    // 0.5 | 1.0
  ditherEnabled: boolean;
  propagationRate: number;    // v2 demo uPropagationRate
  mixFactor: number;          // v2 demo uMixFactor
}

export interface RcPipelineState {
  activeCascades: number;
  resolutionScale: number;
  ditherEnabled: boolean;
  lastFrameTimeMs: number;
  lightCount: number;
  jfaPasses: number;          // v2:实际执行的 JFA pass 数
  propagationRate: number;    // v2
  mixFactor: number;          // v2
  degraded: boolean;
}

export interface IRcPipeline {
  init(canvas: HTMLCanvasElement, config: RcPipelineConfig): Promise<void>;
  resize(width: number, height: number): void;
  render(
    sceneTexture: WebGLTexture,        // 来自 SceneManager 的全场景纹理
    lights: ActiveRcLight[],           // 来自 Simulation
    roomGeometry: RoomLayout,          // 用于 mask 生成
  ): void;
  state(): RcPipelineState;
  setConfig(partial: Partial<RcPipelineConfig>): void;
  destroy(): void;
}
```

---

## 6. 模块文件树(完整 src/ 布局)

```
src/
├── core/                                # 平台纯净(零 THREE / 零 DOM / 零 zustand)
│   ├── types.ts                         # 全部类型定义(§5.1 冻结)
│   ├── constants.ts                     # 全部 UPPER_SNAKE 常量(§5.2 冻结)
│   ├── math.ts                          # vec2 / lerp / clamp / distance / angle utils
│   ├── data/
│   │   ├── weapons.ts                   # WEAPON_TABLE(8 件,签名 = §4.4.2;扩展表 35 件路线)
│   │   ├── masks.ts                     # MASK_TABLE(6 个,签名 = §4.4.3;扩展表 25 个路线)
│   │   ├── lights.ts                    # RC_LIGHT_TABLE(8 类,签名 = §4.4.7)
│   │   ├── enemies.ts                   # 敌人 archetype 模板
│   │   ├── missions.ts                  # 4 个任务房间布局
│   │   ├── palette.ts                   # 调色板(§4.4.8 hex 列表)
│   │   └── sfx.ts                       # 音频合成配方
│   ├── world/
│   │   ├── WorldManifest.ts             # describeWorld() / describeRules() / describeEntities()
│   │   ├── roomTokenizer.ts             # string[] → tile grid
│   │   └── tileMap.ts                   # tile 查询(墙 / 灯 / 门)
│   └── simulation/
│       ├── Simulation.ts                # 协调器(实现 ISimulation)
│       ├── player.ts                    # 移动 / 冲刺 / 翻滚 / 模式切换(F)
│       ├── weapons.ts                   # 开火 / 换弹 / 拾取 / E 长按投掷
│       ├── enemyAI.ts                   # patrol → suspicious → alert → engaging
│       ├── damage.ts                    # 一击必杀 + BOSS 3 击
│       ├── masks.ts                     # 面具效果 dispatcher
│       ├── mission.ts                   # 任务 / 房间 / 评分
│       ├── rcnodes.ts                   # RC 光源注册(静态 + 活动)
│       ├── events.ts                    # SimEvent queue
│       └── pauseAndDeath.ts             # 暂停 / 死亡
│
├── engine/                              # 平台适配
│   ├── GameEngine.ts                    # 协调器(rAF 主循环)
│   ├── SceneManager.ts                  # 场景渲染(Three.js + 程序化 sprite)
│   ├── InputManager.ts                  # 键鼠输入(F / E hold / LMB / Shift / Space)
│   ├── AudioManager.ts                  # Web Audio 合成
│   ├── RcPipeline.ts                    # ⭐ 2D Radiance Cascades 全管线(§5.3)
│   ├── PerfWatchdog.ts                  # 帧时间监控 + 降级调度
│   ├── storage.ts                       # localStorage 适配
│   ├── devtools.ts                      # window.__gameManifest() / __sim / __rcPipeline
│   ├── shaders/                         # v2 按 demo 命名对齐
│   │   ├── fullscreen.vert              # GLSL 300 es,RC 通用顶点(demo default.vert)
│   │   ├── prepscene.frag               # 场景 → seed 纹理(occlusion + emission)
│   │   ├── prepjfa.frag                 # 种子编码
│   │   ├── jfa.frag                     # jump flood 单 pass(跳距减半)
│   │   ├── distfield.frag               # 距离场提取
│   │   ├── rc.frag                      # cascade probes(demo 原式)
│   │   ├── gi.frag                      # 单 pass GI 降级备选(demo 原式)
│   │   ├── final.frag                   # composite + dither
│   │   └── broken.frag                  # dev 测试
│   ├── postfx/
│   │   └── PostProcessPipeline.ts       # WebGL2 framebuffer 编排
│   └── sprites/
│       ├── PixelRenderer.ts             # 程序化 sprite 渲染
│       └── LightSprite.ts               # 灯位图块
│
├── store.ts                             # zustand UI 状态(仅 UI 可改)
├── components/
│   ├── HUD.tsx                          # HP / 弹药 / 当前武器+模式 / 任务进度
│   ├── MissionBrief.tsx                 # 电话文本(打字机效果)
│   ├── MissionSelect.tsx                # 任务选择
│   ├── MaskSelect.tsx                   # 面具选择
│   ├── ScoreOverlay.tsx                 # 评分
│   ├── DevPanel.tsx                     # RC 参数调参(DEV only)
│   ├── MainMenu.tsx                     # 标题
│   └── DeathScreen.tsx                  # 死亡 / 重试
│
├── App.tsx                              # 根组件
└── main.tsx                             # 入口
```

---

## 7. 每 Tick 数据流

```
[input] 键鼠 ──→ InputManager ──→ Simulation.input(action)(含 toggleMode / throwStart)
                                              ↓
                                       Simulation.step(FIXED_DT)
                                              ↓
                                       emit SimEvent(含 modeSwitch / weaponThrown)
                                              ↓
                                       events.push(...)
                                              ↓
[render] GameEngine.update()
              ├─ SceneManager.update(dt)         ← camera follow, sprite 位置
              ├─ AudioManager.update(dt)         ← voice 调度
              ├─ RcPipeline.render(sceneTex, lights, room) ← 6-stage(§15)
              │     ├─ prepscene pass
              │     ├─ prepjfa
              │     ├─ JFA × log2(min(W,H))
              │     ├─ distfield
              │     ├─ cascade × 3(ping-pong)
              │     └─ final + dither
              └─ store.sync(sim.snapshot())      ← 每 2 帧 1 次
                                              ↓
[ui]    React 渲染 HUD / 任务简报 / 死亡画面
```

---

## 8. 构建创建(里程碑 + 验收标准)

### 8.1 M0(本次,设计冻结)

- **交付**:`v2/GDD.md` + `v2/TDD.md` + `AGENTS.md` + `package.json` + `vite.config.ts` + `tsconfig.*` + `index.html` + 完整目录结构 stub
- **验收**:`npx tsc -b --noEmit` 0 error + 浏览器加载 `index.html` 渲染占位画面(灰底 + 标题文字)
- **签核**:agent-qa + 用户

### 8.2 M1(单房间 + RC 全管线验证)

- **交付**:
  - 1 个最小房间(8×6 tile,1 盏油灯,1 敌人,玩家可走位 + F 切换 + 开火 + 击杀)
  - RC 全管线 6 阶段跑通(场景 → prepjfa → JFA → distfield → cascade → final)
  - 1 件武器(knife)+ 拳头(空手近战)
  - 简单 HUD
- **验收**:`tsc -b --noEmit` 0 error + 浏览器 60 FPS @ 1080p + 击杀时枪火瞬时亮起 + 油灯常亮 + F 切换拔刀/拔枪音效
- **签核**:agent-qa + 用户

### 8.3 M2(任务 1 完整)

- **交付**:
  - 任务 1 (`m1_workshop`) 3 个房间 + BOSS
  - 8 件武器 + E 长按投掷
  - 6 个面具
  - 评分系统
  - 死亡 / 重试流程
  - RC 性能调优(含 `uPropagationRate` / `uMixFactor` 调参)
- **验收**:`tsc -b --noEmit` 0 error + 任务 1 完整通关 + 评分 S/A/B/C + 0 console error
- **签核**:agent-qa + 用户

### 8.4 M3(全 4 任务)

- **交付**:
  - 任务 2 / 3 / 4(含隐藏)
  - 标题 / 任务选择 / 面具选择 / 死亡 UI
  - 音频完整合成
- **验收**:4 任务可全通 + 隐藏任务可见性条件正确 + 0 console error
- **签核**:agent-qa + 用户

### 8.5 M4(调优 + 部署)

- **交付**:
  - RC 性能调优 + 降级路径
  - Web Audio 调音
  - localStorage 存档
  - 浏览器冒烟测试(零 console error)
  - Vite build 通过 + 部署 preview
- **签核**:agent-qa + 用户

---

## 9. 资源管理与文件格式

- **资源 = 零文件**。所有 sprite / 音频 / 地图全部程序化:
  - sprite:`engine/sprites/PixelRenderer.ts` 程序化绘制 16×16 像素块(用 `ImageData` 写 canvas)。
  - 音频:`core/data/sfx.ts` 配方 + `engine/AudioManager.ts` 实时 `AudioContext` 合成。
  - 地图:`core/data/missions.ts` ASCII 字符串 → `core/world/roomTokenizer.ts` 解析。
- **shader**:GLSL 300 es,放 `engine/shaders/`,运行时通过 Vite `?raw` 导入;**移植源 = `radiance-cascades-demo/res/shaders/`(rc.frag / prepscene.frag / prepjfa.frag / jfa.frag / distfield.frag / gi.frag / final.frag / default.vert)**,按 §15 契约做 GLSL 330 → 300 es 迁移。
- **持久化**:localStorage,3 个键(见 §3.3)。
- **外部网络资源**:无。

---

## 10. 分支政策

- `master` = 部署分支
- `feature/m1-rc-pipeline` = M1 期间 RC 管线开发
- `feature/m2-mission1` = M2 任务 1
- `feature/m3-all-missions` = M3 全任务
- 每次合并必须 `npx tsc -b --noEmit` 0 error
- 每次合并前必须由 agent-qa 跑浏览器冒烟(若 M1+ 有可运行页面)

---

## 11. 工具指令

| 用途 | 命令 |
|------|------|
| 安装 | `npm install`(M1 第一次) |
| 开发 | `npm run dev` → http://localhost:5184 |
| 构建 | `npm run build` |
| 类型检查 | `npx tsc -b --noEmit` |

---

## 12. 风险登记册

| 风险 | 概率 | 影响 | 对策 |
|------|------|------|------|
| **RC WebGL2 1080p 掉帧(JFA 10-11 pass)** | 高 | 高 | M1 必搭降级路径;M1 末强制 playtest;`RC_CASCADE_COUNT` 默认 3,可降到 2;JFA 跳距下限设 2 |
| **RC 软光吃像素颗粒** | 高 | 中 | dither 回压(M2 实现);强度 0.5 兜底 |
| **1937 历史敏感度** | 中 | 高 | GDD §2.4 处理原则;M2 任务文本评审 |
| **一击必杀 → 太难** | 中 | 中 | Room 1 强制教学 + 0.4s 翻滚无敌 |
| **F 切换手感(硬直 0.15s 太慢 / 太快)** | 中 | 中 | `MODE_SWITCH_DURATION` 进调参面板;M1 末 playtest 定案 |
| **E 长按投掷误触(拾取 vs 投掷)** | 中 | 中 | 0.25s hold 阈值 + 投掷时有准星提示;可走 `[TDD-CONTRACT-CHANGE]` |
| **AI 视野冲突(RC 灯下高 / 暗处低)** | 中 | 中 | M1 末实测;不行就 RC 光源 → 视野距离 直接挂钩 |
| **音频刺耳** | 中 | 中 | 短音 + lowpass;M2 末耳机 playtest |
| **DONE 时间不够** | 中 | 中 | §8 + 砍清单硬纪律;每周末 review |
| **Three.js EffectComposer 集成 RC 兼容** | 中 | 中 | M1 优先用 raw WebGL2 framebuffer 编排;Three.js 仅做 SceneManager |

---

## 13. 验证计划

- **M0**:`npx tsc -b --noEmit` 0 error + 占位页面加载
- **M1 起**:`tsc -b --noEmit` 0 error + 浏览器冒烟(60 FPS 验证 + 视觉对比)
- **每个 M 末**:agent-qa 用 kilo-playwright MCP 跑过 5 个测试点 + 截图
- **M4 末**:完整 4 任务通关测试 + RC 性能打点

---

## 14. 代理任务拆分(原子级,文件所有权白名单)

> KIMI3 DDD 多代理工作流:每个 agent 只改白名单内的文件。

### 14.1 agent-core(M1 起)

**职责**:实现 core/ 全部纯逻辑,**零** THREE / 零 DOM / 零 zustand。
**白名单**:
- `src/core/types.ts`(初始化 §5.1 全部类型,含 v2 `WeaponMode` / `ThrownWeapon` / `PlayerInput`)
- `src/core/constants.ts`(初始化 §5.2 全部常量,含 v2 `MODE_SWITCH_DURATION` / `THROW_HOLD_DURATION` / `RC_JFA_PASSES=-1` / `RC_PROPAGATION_RATE` / `RC_MIX_FACTOR`)
- `src/core/math.ts`
- `src/core/data/weapons.ts`
- `src/core/data/masks.ts`
- `src/core/data/lights.ts`
- `src/core/data/enemies.ts`
- `src/core/data/missions.ts`
- `src/core/data/palette.ts`
- `src/core/data/sfx.ts`
- `src/core/world/WorldManifest.ts`
- `src/core/world/roomTokenizer.ts`
- `src/core/world/tileMap.ts`
- `src/core/simulation/Simulation.ts`
- `src/core/simulation/player.ts`(含 F 模式切换 / 硬直)
- `src/core/simulation/weapons.ts`(含 E 长按投掷)
- `src/core/simulation/enemyAI.ts`
- `src/core/simulation/damage.ts`
- `src/core/simulation/masks.ts`
- `src/core/simulation/mission.ts`
- `src/core/simulation/rcnodes.ts`
- `src/core/simulation/events.ts`
- `src/core/simulation/pauseAndDeath.ts`

**M1 子任务**(可拆分):
- **agent-core.1**:types.ts + constants.ts + math.ts(冻结签名,含 v2 增补)
- **agent-core.2**:data/{weapons,masks,lights,palette}.ts
- **agent-core.3**:data/{enemies,missions,sfx}.ts
- **agent-core.4**:simulation/{Simulation,player,weapons,events}.ts(含 mode switch / throw hold)
- **agent-core.5**:simulation/{enemyAI,damage,masks,mission,rcnodes,pauseAndDeath}.ts
- **agent-core.6**:world/{WorldManifest,roomTokenizer,tileMap}.ts

### 14.2 agent-engine(M1 起,**本项目最重**)

**职责**:实现 engine/ 全部平台适配 + RC 管线 + shader(移植 `radiance-cascades-demo` 算法到 WebGL2)。
**白名单**:
- `src/engine/GameEngine.ts`
- `src/engine/SceneManager.ts`
- `src/engine/InputManager.ts`(F / E hold / LMB / Shift / Space)
- `src/engine/AudioManager.ts`
- `src/engine/RcPipeline.ts` ⭐
- `src/engine/PerfWatchdog.ts`
- `src/engine/storage.ts`
- `src/engine/devtools.ts`
- `src/engine/shaders/*.vert`
- `src/engine/shaders/*.frag`
- `src/engine/postfx/PostProcessPipeline.ts`
- `src/engine/sprites/PixelRenderer.ts`
- `src/engine/sprites/LightSprite.ts`

**M1 子任务**:
- **agent-engine.1**:GameEngine + SceneManager + InputManager 骨架
- **agent-engine.2**:RcPipeline + PostProcessPipeline 骨架(6-stage 编排)
- **agent-engine.3**:shader/fullscreen.vert + prepscene.frag + prepjfa.frag + jfa.frag(demo 移植)
- **agent-engine.4**:shader/distfield.frag + rc.frag + gi.frag + final.frag(demo 移植 + dither)
- **agent-engine.5**:AudioManager + storage + devtools + PerfWatchdog

### 14.3 agent-audio(M1 起)

**职责**:Web Audio 合成 + 配方。
**白名单**:
- `src/engine/AudioManager.ts`(与 engine 协作)
- `src/core/data/sfx.ts`(配方数据)
- `docs/design/03-audio-direction.md`

### 14.4 agent-ui(M0 起)

**职责**:React UI 覆盖层。
**白名单**:
- `src/main.tsx`
- `src/App.tsx`
- `src/store.ts`
- `src/components/*.tsx`
- `src/index.html`
- `src/tailwind.config.js`
- `src/postcss.config.js`

**M0 子任务**:
- **agent-ui.0**:**仅写 M0 阶段的占位 `App.tsx` + `main.tsx`**(灰底 + 标题文字 + 加载状态)

### 14.5 agent-qa(M0 起,无文件所有权)

**职责**:集成验证 + 浏览器冒烟。
- M0:`tsc -b` + 页面加载验证
- M1+:kilo-playwright MCP 跑过 5 个测试点 + 截图

---

## 15. 2D RC 管线契约(本项目最重模块,独立章节)

> 详细 RC 管线设计见 `docs/design/04-radiance-cascades-pipeline.md`(v2 需按 demo 更新)。
> **移植源**:`C:\Git-repo-3rd\Radiance_Cascade_repos\radiance-cascades-demo\res\shaders\` — rc.frag / prepscene.frag / prepjfa.frag / jfa.frag / distfield.frag / gi.frag / final.frag / default.vert。
> 本节冻结 agent-engine 的接口、pass 顺序、probe 数学与 Shader 清单;GLSL 330 core → 300 es 迁移时只改语法,不改算法。

### 15.1 RC 管线 6 阶段总览

```
[1] prepscene pass    SceneManager 的全场景纹理(occlusion + emission 两路)→
                       texture: sceneSeed(RGBA: 地板=编码纹理坐标 seed / 墙=空 / 光源=光色)
[2] prepjfa pass      sceneSeed → jfaSeed(统一格式,alpha=有无 seed)
[3] JFA × log2(min(W,H)) passes(跳距 n/2, n/4, ..., 1;9 邻域)
                       → 每像素 RG=最近 seed 的纹理坐标,B=距离
[4] distfield pass    jfaSeed(final) → texture: sceneSdf(R=到最近墙的归一化距离)
[5] cascade × N(默认 3,ping-pong FB)
                       sceneSdf + sceneSeed(光) + 灯位表 →
                       texture: sceneRadiance(RGB=间接光, A=占位)
[6] final pass        sceneTexture + sceneRadiance + dither(4×4 Bayer)→
                       default framebuffer(屏幕)
```

### 15.2 Probe 数学(冻结,demo rc.frag 原式)

```glsl
// 每 pass 计算(索引 index = 0..cascadeCount-1)
probeAmount  = pow(uBaseRayCount, index);            // 该级 probe 总数
spacing      = sqrt(probeAmount);                    // 每维 probe 数
size         = 1.0 / vec2(spacing);                  // probe 屏幕尺寸(uv 域)
position     = mod(fragCoord, size) * spacing;       // 在 probe 内的相对坐标
rayCount     = pow(uBaseRayCount, index + 1);        // 角度分辨率(指数增长)
intervalStart = (index == 0) ? 0.0
              : a * pow(uBaseRayCount, index)   / min(W, H);   // a = uBaseInterval(px)
intervalEnd   = a * pow(uBaseRayCount, index + 1) / min(W, H);

// 每 ray:radiance_interval(uv, dir, a, b)
//   距离场步进,MAX_RAY_STEPS=128,EPS=0.0005
//   命中表面 → 采样 scene 色(可选 mix 上级 lighting + uPropagationRate)
//   未命中 → 从 uLastPass(上级 cascade)采样合并(merge)
radiance = Σ(ray samples) / uBaseRayCount + ambient
```

- `RC_BASE_RAY_COUNT=4` 时:cascade 0 → 4 ray / cascade 1 → 16 ray / cascade 2 → 64 ray。
- 角度按 `(index / rayCount) * TWO_PI` 均分;方向需乘宽高比修正(`vec2(cos(angle) * min(W,H)/max(W,H), sin(angle))`)。
- 合并条件:`deltaRadiance.a == 0.0`(该区间无命中)时从 `uLastPass` 取上级 probe 的对应 uv(`p.position / up.spacing` 偏移,clamp 到像素范围)。

### 15.3 RC Shader 清单(全部 GLSL 300 es,移植自 demo)

| Shader | 职责 | 输入纹理 | 输出纹理 | Uniforms 关键 |
|---|---|---|---|---|
| `fullscreen.vert` | 全屏三角形(demo default.vert) | — | — | `aPosition` |
| `prepscene.frag` | seed 纹理(occlusion + emission 合并) | sceneTexture(RGBA) | sceneSeed RGBA | `uOcclusionMap`, `uEmissionMap`, `uBrushSize`, `uBrushColor`(灯位) |
| `prepjfa.frag` | 种子编码 | sceneSeed | jfaSeed RGBA(UV 编码) | — |
| `jfa.frag` | 单 pass jump flood(9 邻域,跳距减半) | jfaSeed(prev) | jfaSeed(next) | `uJumpSize` |
| `distfield.frag` | 距离场提取 | jfaSeed(final) | sceneSdf R | — |
| `rc.frag` | cascade probes(demo 原式) | sceneSdf + sceneSeed + uLastPass | cascadeBuffer RGBA | `uCascadeIndex`, `uCascadeAmount`, `uBaseRayCount`, `uBaseInterval`, `uPropagationRate`, `uMixFactor`, `uAmbientColor`, `uSrgb` |
| `gi.frag` | 单 pass GI 备选(降级 RC_OFF 前最后一档) | sceneSdf + sceneSeed + uLastFrame | giBuffer RGBA | `uRayCount`, `uNoise`, `uPropagationRate`, `uMixFactor` |
| `final.frag` | composite + dither | sceneTexture + cascadeBuffer | default framebuffer | `uDitherEnabled`, `uTime` |
| `broken.frag` | dev 测试 | — | default framebuffer | — |

### 15.4 RC 管线 API 契约

```ts
// engine/RcPipeline.ts — 完整实现由 agent-engine 负责
// 接口见 §5.3
```

**关键实现要求**:
- **WebGL2 上下文**(不用 WebGL1)
- **3 个 framebuffer 乒乓**(避免 5 个;mask + light 可合并 1 个 seed FB)
- **所有 pass 用全屏三角形**(`fullscreen.vert`)
- **JFA pass 数**:运行时 `log2(min(W,H))` 取整(1080p ≈ 10-11),跳距序列 `2^⌊log2(minW)⌋, ..., 1`;`setConfig({ jfaPasses: n })` 可手动覆盖(截断序列,降级用)
- **降级路径**:cascade 数 3 → 2 → 1 → 0;resolution 1.0 → 0.5;仍超 → `gi.frag` 单 pass → 最后 RC 全关回退 base color
- **dither 回压**:4×4 Bayer matrix,`final.frag` 内置;可被 `setConfig({ ditherEnabled: false })` 关闭
- **PROD 性能**:`tsc -b` 0 error + 浏览器 60 FPS @ 1080p(§3.5 预算)

### 15.5 RC 性能硬约束

- 单帧 RC 全管线 ≤ 6ms(预算)/ 8ms(硬上限),见 §3.5
- cascade 1 / 2 / 3 之间用 ping-pong framebuffer
- `RC_MAX_ACTIVE_LIGHTS = 16`(超过则按"距离屏幕中心"排序丢远)
- JFA 中间 pass 数量是 1080p 的主要成本,降级时**优先截断跳距序列尾部**(跳距 1 的 pass 可跳过,代价是 ±1px 精度)

### 15.6 RC 调试接口(DEV only)

- `__rcPipeline.state()` 返回:`{ activeCascades, resolutionScale, ditherEnabled, lastFrameTimeMs, lightCount, jfaPasses, propagationRate, mixFactor, degraded }`
- DEV 模式下 `DevPanel.tsx` 提供 Tweakpane 调参面板(实时改 `RC_CASCADE_COUNT` / `RC_BASE_RAY_COUNT` / `RC_BASE_INTERVAL_PX` / `RC_PROPAGATION_RATE` / `RC_MIX_FACTOR` / dither 开关 / jfaPasses)

---

## 附录 A:文档版本

| 版本 | 日期 | 作者 | 变更 |
|------|------|------|------|
| v1 | 2026-08-08 | Mavis (设计阶段) | 初稿,与 GDD v1 对账 |
| v2 | 2026-08-08 | Mavis (设计阶段) | F 切换 / E 长按投掷 / 武器面具铺量 / RC 按 demo 真实算法(JFA log2、probe 数学、propagationRate、mixFactor)/ 背景淞沪 |

## 附录 B:依赖文档

- GDD(设计层权威):`v2/GDD.md`
- 设计细节:`docs/design/01..04-*.md`(v2 需同步 01 / 04)
- 里程碑 + agent 拆分:`MVP-PLAN.md`
- 项目级规则:`AGENTS.md`
- RC 技术参考:`C:\Git-repo-3rd\Radiance_Cascade_repos\radiance-cascades-demo`(C++/Raylib;`res/shaders/rc.frag` 等为移植源)
- v1 基线:`../TDD.md`(v1 冻结契约,本文件继承其未改动部分)
