# Patapong 3D — Technical Design Document (TDD) v0.1

> **本文档是冻结的工程契约(Frozen Contract)**:所有 coder / agent 必须按本文件实现。
> **接口签名、状态机、默认数值一律以本文件为准**。与本文件冲突的实现视为 bug。
> **设计层权威**:`GDD.md`(下文简称 GDD) + `docs/design/01..04-*.md`。
> **变更规则**:v0.1 起,§5(契约速写)与 §4(FSM / 数据表)中的签名、状态名、默认数值不得擅自修改;需要调整时必须:① 更新本变更日志;② 通知全部 agent 重读本文件;③ 提交一个独立 commit 标注 `[TDD-CONTRACT-CHANGE]`。

---

## 0. 封面与变更日志(Cover & Change Log)

| 项 | 值 |
|---|---|
| 游戏名 | Patapong 3D |
| 团队 | VibeGames jam 小队(KIMI3 DDD 多代理工作流) |
| 文档角色 | 技术设计 / 契约所有者(Technical Design / Contracts Owner) |
| 引擎 | Three.js 0.170(渲染)+ Vite 6(构建)+ Web Audio(音频) |
| 平台 | Web(桌面 Chrome / Edge 优先;1080p) |
| 周期 | 72h Vibe Game Jam(3 天) |
| 端口 | **5183**(5_gamejam_1=5173, 4_chunbai/new_game=3000,本项目独占 5183) |

| 版本 | 日期 | 作者 | 变更摘要 |
|------|------|------|----------|
| v0.1 | 2026-08-07 | Mavis (设计阶段) | 初稿:与 GDD v0.1 对账、冻结 C.A.T 架构、FSM、契约速写、Agent 拆分、性能预算 |

---

## 1. 目录(Table of Contents)

- §0 封面与变更日志
- §1 目录
- §2 引言(目的 / 技术目标 / 目标平台 / 外部工具 / 团队角色 / 时间线 / 设计层对账与裁决)
- §3 技术总览(命名规范 / 技术栈表 / 数据布局 / DEV 钩子 / 性能预算 / 风险降级)
- §4 游戏机制即架构(机制→模块映射 / 主循环 / 全局 FSM 规格 / 状态转移表 / 默认数值表)
- §5 契约速写(**冻结**,真实 TS)
- §6 模块文件树(完整 src/ 布局)
- §7 每 Tick 数据流
- §8 构建创建(里程碑 M1/M2/M3 + 验收标准)
- §9 资源管理与文件格式
- §10 分支政策
- §11 工具指令
- §12 风险登记册
- §13 验证计划
- §14 代理任务拆分(原子级,文件所有权白名单)

---

## 2. 引言(Introduction)

### 2.1 目的(Purpose)

玩家扮演左侧体素 P1,在 3D 街机场中与 AI 击拍对决;先到 7 分者胜。每一次击拍触发完整 juice 层(camera shake + 粒子 + 合成音效 + squash & stretch),rally 累积到 3/5/7/10 拍时触发 milestone 慢镜与观众反应。整局 2-5 分钟,纯前端,零资产文件,无 Game Over 之外的状态。

### 2.2 技术目标(Technical Goals)

1. **C.A.T 硬规则**:`core/` 平台纯净(零 THREE / 零 DOM / 零 zustand 导入),side effect 只以 `SimEvent` 类型事件泄漏;`engine/` 是平台适配层。
2. **60 FPS @ 1080p 稳定**(预算见 §3.5),低端集显可跑。
3. **零资产文件**:全部程序化几何 + Web Audio 合成(沿用 5_gamejam_1 惯例)。
4. **DEV 可观测性**:`window.__gameManifest()`(世界即文本) + `window.__sim`(Simulation 实例只读)。
5. **体素渲染 = 单 InstancedMesh**:所有静态体素 / 动态体素 / 粒子分别用 1 个 InstancedMesh,总 draw call < 10。
6. **降级路径自动化**:frame time watchdog 检测到持续超标时,自动关闭部分 juice(§3.6)。

### 2.3 目标平台(Target Platform)

| 项 | 最低 | 推荐 |
|---|---|---|
| 硬件 | 2015+ 集显笔记本 | 独显 / 近五年台式 |
| 浏览器 | Chrome / Edge 108+(WebGL2、AudioContext 自动播放策略已处理) | Chrome 120+ |
| 分辨率 | 1280×720 | 1920×1080(预算基准) |
| Node(构建期) | ≥ 18(Vite 6 下限) | 20.19+ / 22 LTS |

### 2.4 外部工具与团队角色(External Tools & Roles)

| 工具 | 用途 | 角色 |
|---|---|---|
| Vite 6 + React 19 | 构建 / HMR / dev server 5183 | agent-ui |
| Three.js 0.170 | 场景 / 程序化建模 / 后处理 | agent-engine |
| Web Audio API | 全部音频合成(零文件) | agent-audio |
| zustand 5 | UI 状态(仅 UI) | agent-ui |
| Tailwind 3.4 | HUD/菜单样式 | agent-ui |
| Playwright(MCP) | 冒烟验证 | agent-qa |
| Tweakpane(**可选,仅 DEV**) | 调参面板,默认值 = §4.4 数值表 | agent-core(devtools 桥接) |

团队:agent-core(纯核心)/ agent-engine(渲染适配)/ agent-audio(音频适配)/ agent-ui(UI 覆盖层)/ agent-qa(集成验证,无文件所有权)。

### 2.5 时间线(72h Timeline)

| 日 | 里程碑 | 交付 | 签核人 |
|---|---|---|---|
| D1 | M1 | 球场 + 球拍 + 球 + 基础反弹 + 分数 + 1P vs AI(§8.1) | agent-qa + 用户 |
| D2 | M2 | Juice 全部 + milestone + AI 调优(§8.2);**D2 晚强制 playtest** | 用户 |
| D3 | M3 | 菜单 + 观众 + Win/Lose + localStorage + post-fx(§8.3) | agent-qa + 用户 |

### 2.6 设计层对账与裁决(Reconciliation & Adjudication)

设计文档共 4 份:`docs/design/01-concept-core-loop.md`(核心循环与数值)、`02-art-direction.md`(美术)、`03-audio-direction.md`(音频)、`04-ux-pacing.md`(UX 与节奏),其中 01 为设计层权威。GDD v0.1 §0/§1/§3.1-3.5/§4.1-4.5 数值全部纳入 §4.4 冻结默认表。

| # | 冲突点 | 裁决(技术负责) |
|---|---|---|
| R01 | GDD §3.1 球速 8 起 +0.6/rally | **冻结**:0.6/rally(§4.4);上限 18(GDD 一致) |
| R02 | GDD §3.2 P1 加速度 60 / 目标速度 12 | **冻结**:60 / 12(§4.4) |
| R03 | GDD §3.3 AI 速度 8 + 5% 错位 | **冻结**:8 / 5%(§4.4);预判 0.2s(§4.4) |
| R04 | GDD §4.1 camera shake 0.25s | **冻结**:0.25s 线性(§4.4) |
| R05 | GDD §4.2 粒子 12-20 颗 | **冻结**:8-20(性能可调下限;§4.4) |
| R06 | GDD §4.3 audio 80ms | **冻结**:80ms attack 5ms(§4.4) |
| R07 | GDD §4.4 milestone 3/5/7/10 | **冻结**:3/5/7/10(§4.4);10+ 重复 |
| R08 | GDD §6 配色 / 灯光 | **冻结**:hex 列表在 `core/data/colors.ts`(§4.5) |
| R09 | 端口 | **5183**(本项目独占,5_gamejam_1=5173 / 4_chunbai=3000) |
| R10 | 切 7 分胜 | **冻结**:7(§4.4) |

---

## 3. 技术总览(Technical Overview)

### 3.1 命名规范(Naming Conventions)

| 类别 | 规则 | 示例 |
|---|---|---|
| 文件 | core/engine 用 `camelCase.ts`;组件 `PascalCase.tsx`;内容数据 `camelCase.ts` | `ballPhysics.ts`、`HUD.tsx`、`colors.ts` |
| 类型 / 接口 / 枚举 | `PascalCase` | `GamePhase`、`SimEvent` |
| 函数 / 变量 | `camelCase` | `step`、`rallyHits` |
| 常量(调参) | `UPPER_SNAKE_CASE`,集中在 `core/constants.ts` | `BALL_SPEED_INITIAL` |
| 状态名 | 全局 FSM 全大写 | `GamePhase.PLAY` |
| 注释 | 中文注释;公共接口必须有一行用途说明 | — |

编码标准:TypeScript **strict**(`tsconfig.app.json` 已开 `noUnusedLocals/noUnusedParameters/noFallthroughCasesInSwitch`);`as const` 优先;禁止 `any`(如确需则局部注释豁免并交 agent-qa 复核);禁止硬编码魔法数(一律进 `constants.ts` 或 `data/*.ts`)。

### 3.2 技术栈表(Stack Table — 已锁定版本)

| 依赖 | 版本 | 用途 | 所属代理 |
|---|---|---|---|
| vite | ^6.0.0 | 构建 / HMR / dev server 5183 | agent-ui(构建脚本) |
| typescript | ^5.6.0 | 类型检查门(strict) | 全员 |
| @vitejs/plugin-react | ^4.3.0 | React 插件 | agent-ui |
| react / react-dom | ^19.0.0 | UI 覆盖层 | agent-ui |
| @types/react / @types/react-dom | ^19.0.0 | 类型 | agent-ui |
| three / @types/three | ^0.170.0 | 渲染 / 后处理 | agent-engine |
| zustand | ^5.0.0 | UI 状态(仅 UI 层) | agent-ui |
| tailwindcss | ^3.4.0 | UI 样式 | agent-ui |
| autoprefixer / postcss | ^10.4.0 / ^8.4.0 | CSS 管线 | agent-ui |
| tweakpane(**可选**) | ^4.x | 仅 DEV 调参;不写进生产 import 图(由 devtools 动态 import) | agent-core |
| node | ≥ 20.19(推荐 22 LTS) | 运行期 | — |
| npm | ≥ 10 | 包管理(不新装依赖,`node_modules` 由 `npm install` 初始化) | — |

> 注:`package.json` 已就绪,**禁止**任何 agent 擅自增删依赖;确需新依赖 → 向 TDD 契约所有者提变更(§0 冻结规则)。

### 3.3 数据布局(Data Layout)

**运行时内存布局**:
- 模拟权威状态:`Simulation` 内部(`core/simulation/Simulation.ts`)——单真相源。
- UI 可见状态:`src/store.ts`(zustand)——仅由 `GameEngine` 的事件同步驱动,**禁止 UI 直接改模拟**。
- 持久化(localStorage,引擎适配层 `engine/storage.ts` 读写,`core/types.ts` 冻结键名):

| StorageKey | 键名 | 内容形状 | 说明 |
|---|---|---|---|
| `stats` | `patapong.v1.stats` | `PersistedStats` | `totalMatches / p1Wins / aiWins / longestRally / lastMatchAt` |
| `settings` | `patapong.v1.settings` | `{ muted: boolean; volume: number }` | 音频设置 |

- 持久化读写只发生在:`SimEvent matchOver` 事件、菜单"Reset"按钮、settings toggle。版本化键名(`.v1`)为 schema 演进预留。
- **存档兼容策略**:读取失败 / 形状不符 → 静默回退默认值并覆盖,**不抛错**。

### 3.4 DEV 钩子(DEV Hooks)

```ts
// engine/devtools.ts — 仅 import.meta.env.DEV 时注入
declare global {
  interface Window {
    __gameManifest?: () => string;  // describeWorld() + describeRules() + describeEntities() + 当前 sim 快照
    __sim?: unknown;                // Simulation 实例(只读调试)
    __simEvents?: () => SimEvent[]; // 最近 N 个事件
  }
}
```

- `__gameManifest()` 返回:`describeWorld()`(球场 + 球拍 + 球 + 观众)+ `describeRules()`(物理常量表)+ `describeEntities()`(id 列表)+ 当前 sim 状态快照(world-as-text)。
- `__simEvents()` 返回:最近 64 个 SimEvent(debug 用)。
- 生产构建(`import.meta.env.DEV === false`)不注册、不引用。

### 3.5 性能预算表(Performance Budget)

基准 60 FPS @ 1080p(16.67ms/帧)。**超预算 = 优先级 1 bug**,M 里程碑验收硬指标。

| 指标 | 预算 | 硬上限 | 备注 |
|---|---|---|---|
| 帧时间(渲染) | ≤ 8ms | 12ms | 单 pass 主渲染 + 后处理 |
| 帧时间(模拟) | ≤ 0.5ms | 1ms | 固定步 1/60,最多 5 步积压 |
| 帧时间(音频) | ≤ 0.5ms | 1ms | Web Audio 节点调度 |
| 帧时间(UI/DOM) | ≤ 0.5ms | 1ms | 仅覆盖层,React 不渲染游戏内容 |
| 体素总数(活跃) | ≤ 1500 | 2000 | 球场 ~800 + 装饰 ~200 + 观众 ~80 + 动态 ~50 + 粒子峰值 ~256 |
| 三角形预算 | < 30k tris | 40k | 一个 cube = 12 tris;InstancedMesh 共享 |
| 材质实例 | < 8 | 12 | 复用 MeshStandardMaterial + 1 个 Points material |
| Draw calls | < 10 | 15 | InstancedMesh + post-fx + UI = 9-10 |
| 粒子活跃数 | ≤ 200 | 256 | 超过 → 旧粒子优先淡出 |
| 阴影 | 无 | — | 性能优先,无 shadow acne 烦恼 |
| 后处理 | UnrealBloom(轻) + Vignette | — | 无 SSR / SSAO / 动态天空 |
| 同时音频声部 | ≤ 6 voices | 8 voices | 优先级抢占(§4.4) |
| WebGL 对象 | — | 泄漏 0 | rAF 循环外禁用 resize 创建 |

### 3.6 性能降级路径(Performance Degradation,autopilot)

```ts
// engine/PerfWatchdog.ts
// 监控最近 30 帧的 frame time,如果 > 14ms 持续 3 帧,自动降级 juice
if (rollingAvgFrameTime > 14ms for 3 frames) {
  applyDegradation('PARTICLE_BURST_HALF');  // 20 → 10 颗
}
if (rollingAvgFrameTime > 14ms for 6 frames) {
  applyDegradation('BLOOM_OFF');           // 关闭后处理 bloom
}
if (rollingAvgFrameTime < 10ms for 120 frames) {
  removeDegradation();                       // 自动恢复
}
```

降级状态可由 `__sim` 读出。**不**写入 localStorage(只在本次会话生效)。

---

## 4. 游戏机制即架构(Mechanics → Architecture)

### 4.1 机制→模块映射

| 机制 | core 模块 | engine 模块 | 触发事件 |
|---|---|---|---|
| 球物理 | `simulation/ballPhysics.ts` | `engine/VoxelRenderer.ts`(更新 ball matrix) | `hit` / `point` |
| 球拍移动 | `simulation/paddleControl.ts`(P1) | `engine/InputManager.ts`(按键) | (无事件) |
| AI 追踪 | `simulation/aiPaddle.ts` | — | (无事件) |
| 计分 | `simulation/scoreTracker.ts` | `engine/GameEngine.ts`(同步 UI) | `point` / `matchOver` |
| Rally 累积 | `simulation/rallyCounter.ts`(合并入 scoreTracker) | — | `milestone` |
| 相机震动 | (在 `JuiceDirector` 收集) | `engine/CameraShake.ts` | `cameraShake` |
| 粒子爆发 | (在 `JuiceDirector` 收集) | `engine/ParticleSystem.ts` | `particleBurst` |
| 音频合成 | `data/sfx.ts`(配方数据) | `engine/AudioManager.ts` | `sfx` |
| Squash & Stretch | `simulation/juiceEvents.ts` | `engine/VoxelRenderer.ts`(更新 paddle matrix) | `paddleSquash` |
| 慢镜 | `simulation/juiceEvents.ts` | `engine/GameEngine.ts`(影响 `dt`) | `slowmo` |
| 观众跳 | (collected in `JuiceDirector`) | `engine/SceneManager.ts` | `audienceCheer` |
| 灯光闪烁 | (collected in `JuiceDirector`) | `engine/SceneManager.ts` | `audienceCheer` |

### 4.2 主循环(Main Loop)

```
rAF 回调 (engine/GameEngine.ts)
  ↓
  beginFrame()
  ↓
  while accumulator >= FIXED_DT (1/60) {
    accumulator -= FIXED_DT
    sim.step(FIXED_DT * slowMoFactor)  // ← 慢镜影响 sim dt
  }
  ↓
  // 视觉层使用真实 elapsed dt(不慢),保证 UI / 相机平滑
  renderer.update(elapsedDt)  // camera shake、paddle squash lerp、particle TTL
  composer.render()            // post-fx
  ↓
  store.sync(sim.snapshot())   // 同步到 zustand(每 2 帧 1 次,省 React re-render)
  ↓
  endFrame()
```

**关键点**:
- 模拟固定步 1/60,渲染 rAF 可变;不慢 UI,只慢 sim
- 音频节点调度走 Web Audio 内置时间轴,**不**被 sim slowMoFactor 影响
- 每 2 帧 sync 一次到 zustand(避免 React 过度 re-render)

### 4.3 全局 FSM 规格(Global FSM)

```
                    ┌────────────────────────────────┐
                    │                                │
                    ↓                                │
              ┌──────────┐    Space (READY → PLAY)   │
   start ────→│  MENU    │ ──────────────────────┐  │
              └──────────┘                       │  │
                    │ click "PLAY"               │  │
                    ↓                            │  │
              ┌──────────┐   3s countdown        │  │
              │  READY   │ ──────────────────┐    │  │
              └──────────┘                   │    │  │
                    │ countdown done         │    │  │
                    ↓                        ↓    ↓  │
              ┌──────────┐   X = ±10   ┌──────────┐ │
              │  PLAY    │ ───────────→│  POINT   │ │
              └──────────┘             └──────────┘ │
                    │  ↑                       │    │
                    │  ball respawn           │    │
                    │  (1.2s)                1.2s  │
                    │  ↓                       ↓    │
                    │  ┌────────────┐   score >= 7│
                    └──│ POINT end  │─────────────┘
                       └────────────┘           ↓
                                            ┌──────────┐
   R / click ───────────────────────────────→│ MATCH_OVER│
                                            └──────────┘
                                                  │
                                                  ↓
                                            (back to MENU)
```

**GamePhase 枚举**(冻结):
```ts
export const GamePhase = {
  MENU: 'MENU',
  READY: 'READY',
  PLAY: 'PLAY',
  POINT: 'POINT',
  MATCH_OVER: 'MATCH_OVER',
} as const;
export type GamePhase = (typeof GamePhase)[keyof typeof GamePhase];
```

### 4.4 默认数值表(冻结,所有引用 = 这里的值)

| 字段 | 值 | 字段 | 值 |
|---|---|---|---|
| `BALL_SPEED_INITIAL` | 8.0 u/s | `BALL_SPEED_INCREMENT` | 0.6 u/hit |
| `BALL_SPEED_MAX` | 18.0 u/s | `BALL_ANGLE_MAX` | 60° |
| `BALL_VZ_FIXED` | 14.0 u/s | `BALL_VZ` 计算 | `±V_total * cos(angle)` |
| `BALL_VY_RANGE` | [-7, +7] | `BALL_X_FAIL` | ±10 |
| `BALL_SIZE` | 1.0 u | `BALL_RESTITUTION_Y` | 1.0(完美反弹) |
| `PADDLE_SIZE_X/Y/Z` | 3 / 4 / 1 | `PADDLE_TARGET_SPEED_P1` | 12 u/s |
| `PADDLE_ACCEL_P1` | 60 u/s² | `PADDLE_DECEL_P1` | 80 u/s² |
| `PADDLE_BOUND_Y` | [-6, +6] | `PADDLE_SQUASH_AMOUNT` | 1.2(× 宽) |
| `PADDLE_SQUASH_DURATION` | 0.08s | `PADDLE_REBOUND_DURATION` | 0.08s |
| `AI_TARGET_SPEED` | 8 u/s | `AI_LERP_RATE` | 4(/s) |
| `AI_PREDICT_TIME` | 0.2s | `AI_MISALIGN_PROB` | 0.05 |
| `AI_MISALIGN_DURATION` | 0.5s | `AI_MISALIGN_RANGE` | [-2, +2] u |
| `SCORE_TO_WIN` | 7 | `POINT_DURATION` | 1.2s |
| `READY_COUNTDOWN` | 3.0s | `RALLY_HITS_RESET_ON_POINT` | true |
| `CAMERA_SHAKE_DURATION` | 0.25s | `CAMERA_SHAKE_INTENSITY_BASE` | 0.15 |
| `CAMERA_SHAKE_INTENSITY_PER_SPEED` | 0.04 | `CAMERA_SHAKE_INTENSITY_MAX` | 0.5 |
| `PARTICLE_COUNT_MIN` | 8 | `PARTICLE_COUNT_MAX` | 20 |
| `PARTICLE_LIFE_MIN` | 0.5s | `PARTICLE_LIFE_MAX` | 0.8s |
| `PARTICLE_GRAVITY` | 9.8 u/s² | `PARTICLE_SIZE` | 0.3 u |
| `MILESTONE_THRESHOLDS` | [3, 5, 7, 10] | `SLOWMO_FACTORS` | [0.6, 0.5, 0.4, 0.4] |
| `SLOWMO_DURATIONS` | [0.2, 0.25, 0.3, 0.3]s | `AUDIO_VOICE_LIMIT` | 6 |
| `AUDIO_VOICE_HARD_LIMIT` | 8 | `FIXED_DT` | 1/60 s |
| `MAX_FRAME_ACCUM` | 5 步 | `STORE_SYNC_INTERVAL` | 2 帧 |
| `COURT_SIZE_X/Y/Z` | 24 / 16 / 10 u | `AUDIENCE_COUNT` | 12 |
| `AUDIENCE_BOUND_BACK` | z = -8 | `BALL_EMISSIVE_INTENSITY` | 1.0 |
| `PERF_DEGRADATION_FRAMES` | 3 帧 > 14ms | `PERF_RECOVERY_FRAMES` | 120 帧 < 10ms |

### 4.5 配色冻结表(§6 Art Direction 数值)

| 名称 | hex | 用途 |
|---|---|---|
| `COLOR_FLOOR_BASE` | #2a1a4a | 球场地面基底 |
| `COLOR_FLOOR_LINE` | #ff3aaa | 球场边线(霓虹粉) |
| `COLOR_BG_TOP` | #0a0a2a | 背景渐变顶 |
| `COLOR_BG_BOTTOM` | #1a0a3a | 背景渐变底 |
| `COLOR_P1_BODY` | #3affc8 | P1 球拍身体(青绿) |
| `COLOR_P1_EYE` | #ffffff | P1 眼睛(emissive) |
| `COLOR_AI_BODY` | #ff7a3a | AI 球拍身体(橙红) |
| `COLOR_AI_EYE` | #ffffff | AI 眼睛(emissive) |
| `COLOR_BALL` | #ffd83a | 球(emissive 1.0) |
| `COLOR_AUDIENCE` | 6 色随机 | 观众(色池在 data/colors.ts) |

### 4.6 状态转移表(FSM Transition Table)

| From | Event | To | Side Effect |
|---|---|---|---|
| MENU | click "PLAY" | READY | reset score, reset ball, reset rally |
| READY | countdown done | PLAY | spawn ball at center, velocity = (+8, 0, 14) |
| READY | Esc | MENU | (no-op) |
| PLAY | ball.x = ±10 | POINT | emit `point` event (winner), start 1.2s timer |
| PLAY | paddle hit | (stay PLAY) | emit `hit` event, update ball velocity, increment rally |
| PLAY | rally hits ∈ thresholds | (stay PLAY) | emit `milestone` event (slowmo + audience) |
| PLAY | Esc | MENU | (confirm dialog) |
| POINT | 1.2s timer done, score < 7 | PLAY | respawn ball at center, velocity toward loser |
| POINT | 1.2s timer done, score >= 7 | MATCH_OVER | emit `matchOver` event, persist stats |
| MATCH_OVER | R / click "Rematch" | READY | reset score, reset rally |
| MATCH_OVER | click "Menu" | MENU | (no-op) |
| MATCH_OVER | Esc | MENU | (no-op) |

---

## 5. 契约速写(冻结,真实 TS)

> **本节是最高优先级**。所有 coder 必须按下面的类型签名实现。
> 完整源码在 `src/core/types.ts` / `src/core/constants.ts` / `src/core/simulation/Simulation.ts`(M1 由 agent-core 实现)。

### 5.1 `core/types.ts`(冻结)

```ts
// ─── 基础类型 ───
export type Vec3 = { x: number; y: number; z: number };

export const GamePhase = {
  MENU: 'MENU',
  READY: 'READY',
  PLAY: 'PLAY',
  POINT: 'POINT',
  MATCH_OVER: 'MATCH_OVER',
} as const;
export type GamePhase = (typeof GamePhase)[keyof typeof GamePhase];

export type Side = 'P1' | 'AI';

// ─── 实体 ───
export interface Ball {
  position: Vec3;
  velocity: Vec3;
  speed: number;        // |velocity|
  lastHitBy: Side | null;
  rallyHits: number;    // 递增,point 时清零
}

export interface Paddle {
  side: Side;
  position: Vec3;
  velocity: Vec3;
  targetY: number;       // AI only, P1 不用
  squashAmount: number;  // 0..1
  characterId: string;   // data lookup
}

export interface Court {
  bounds: {
    minY: number; maxY: number;  // Y 上下界(球反弹)
    minX: number; maxX: number;  // X 左右界(球出界 = 失分)
    minZ: number; maxZ: number;  // Z 前后界(球在 [minZ, maxZ] 之间飞)
  };
  audience: AudienceMember[];
  floorVoxels: Voxel[];     // 球场地面体素
  decorationVoxels: Voxel[]; // 装饰(背景墙、灯柱)
}

export interface Voxel {
  position: Vec3;
  size: number;
  color: string;  // hex
  emissive?: string;
  emissiveIntensity?: number;
}

export interface AudienceMember {
  id: string;
  position: Vec3;
  color: string;
  bounceAmount: number;  // 0..1,audienceCheer 事件驱动的跳
}

// ─── 计分 ───
export interface Score {
  p1: number;
  ai: number;
  bestOf: number;       // 7
  rallyHits: number;    // 当前 rally
  milestonesHit: number[];  // 本局已经触发的 milestone 阈值(避免重复)
}

// ─── Juice 状态 ───
export interface JuiceState {
  cameraShake: { intensity: number; timeLeft: number };
  slowMo: { factor: number; timeLeft: number };
  paddleSquash: { P1: number; AI: number };  // 当前 squash 量
}

// ─── 模拟事件 ───
export type SimEvent =
  | { type: 'hit'; payload: { side: Side; hitPoint: Vec3; hitForce: number } }
  | { type: 'point'; payload: { winner: Side; loserScore: number } }
  | { type: 'milestone'; payload: { hits: number; index: number } }
  | { type: 'matchOver'; payload: { winner: Side; finalScore: { p1: number; ai: number } } }
  | { type: 'paddleSquash'; payload: { side: Side; amount: number } }
  | { type: 'ballLaunch'; payload: { direction: Side } }
  | { type: 'cameraShake'; payload: { intensity: number; duration: number } }
  | { type: 'particleBurst'; payload: { position: Vec3; count: number; color: string } }
  | { type: 'sfx'; payload: { id: SfxId; volume: number } }
  | { type: 'audienceCheer'; payload: { intensity: 'small' | 'large' | 'max' } }
  | { type: 'slowmo'; payload: { factor: number; duration: number } }
  | { type: 'persist'; payload: { key: 'stats' | 'settings'; value: unknown } };

export type SfxId = 'pata' | 'pataPata' | 'pataPataPong' | 'pata3' | 'win' | 'lose' | 'audienceCheer' | 'bgPad';

// ─── 模拟快照(UI 读这个,不是直接读 sim 内部) ───
export interface SimSnapshot {
  phase: GamePhase;
  ball: Ball;
  p1: Paddle;
  ai: Paddle;
  score: Score;
  juice: JuiceState;
  // ── 调试用 ──
  perfDegradation: PerfDegradation[];
}

export type PerfDegradation = 'PARTICLE_BURST_HALF' | 'BLOOM_OFF';

// ─── 配置 ───
export interface SimulationConfig {
  seed: number;  // RNG seed,可复现 playtest
  audioMuted: boolean;
  audioVolume: number;  // 0..1
}

// ─── 持久化 ───
export interface PersistedStats {
  totalMatches: number;
  p1Wins: number;
  aiWins: number;
  longestRally: number;
  lastMatchAt: number;  // timestamp
}

export interface PersistedSettings {
  muted: boolean;
  volume: number;
}
```

### 5.2 `core/constants.ts`(冻结默认值,见 §4.4)

> 完整表见 §4.4。本文件导出所有 `UPPER_SNAKE_CASE` 常量,严格 1:1 对应。

### 5.3 `core/simulation/Simulation.ts`(冻结接口)

```ts
export class Simulation {
  constructor(config: SimulationConfig);
  
  // 主步进
  step(dt: number): void;
  
  // 读取快照(UI 读这个)
  snapshot(): SimSnapshot;
  
  // 输入(来自 InputManager,只接受 P1 控制)
  setP1Input(input: { up: boolean; down: boolean; launch: boolean }): void;
  
  // 事件订阅
  onEvent(handler: (event: SimEvent) => void): () => void;
  
  // 调试
  describeWorld(): string;     // 球场 + 球拍 + 球 + 观众
  describeRules(): string;     // 物理常量表
  describeEntities(): string;  // id 列表
  recentEvents(n: number): SimEvent[];  // 最近 N 个事件
}
```

### 5.4 `core/simulation/ballPhysics.ts`(冻结接口)

```ts
// 纯函数,无副作用(除了 emit event)
export function ballStep(
  ball: Ball,
  court: Court,
  p1: Paddle,
  ai: Paddle,
  dt: number,
  emit: (event: SimEvent) => void,
): void;
```

### 5.5 `core/simulation/aiPaddle.ts`(冻结接口)

```ts
// 纯函数,无副作用(只读 ball + 写 ai)
export function aiStep(
  ai: Paddle,
  ball: Ball,
  dt: number,
  rng: () => number,
): void;
```

### 5.6 `core/simulation/juiceEvents.ts`(冻结接口)

```ts
// 收集 juice 触发,合并多个事件为最少必要集
// 例如:hit → 1 个 cameraShake + 1 个 particleBurst + 1 个 sfx
export function emitHitJuice(
  side: Side,
  ball: Ball,
  emit: (event: SimEvent) => void,
): void;

export function emitMilestoneJuice(
  hits: number,
  index: number,
  emit: (event: SimEvent) => void,
): void;

export function emitPointJuice(
  winner: Side,
  emit: (event: SimEvent) => void,
): void;

export function emitMatchOverJuice(
  winner: Side,
  emit: (event: SimEvent) => void,
): void;
```

### 5.7 `core/simulation/scoreTracker.ts`(冻结接口)

```ts
export function pointScored(
  side: Side,
  score: Score,
  emit: (event: SimEvent) => void,
): { newScore: Score; matchOver: boolean };
```

### 5.8 `core/data/*.ts`(冻结数据 ID)

> 所有内容数据(球拍、球场、观众、配色、合成音效配方)以 `camelCase.ts` 形态集中,禁止散落 magic number / 硬编码。

---

## 6. 模块文件树(完整 src/ 布局)

```
6_patapong3D/
├── AGENTS.md                      # 项目级规则(本仓库 §顶层 AGENTS.md 的下级)
├── README.md                      # 快速开始
├── GDD.md                         # 设计文档(权威)
├── TDD.md                         # 本文件(契约所有者)
├── MVP-PLAN.md                    # Agent 执行计划
├── verification-report.md         # 里程碑验证
├── package.json                   # 已锁版本
├── vite.config.ts                 # 端口 5183
├── tsconfig.json / .app.json / .node.json
├── index.html
├── postcss.config.js / tailwind.config.js
├── docs/
│   └── design/
│       ├── 01-concept-core-loop.md
│       ├── 02-art-direction.md
│       ├── 03-audio-direction.md
│       └── 04-ux-pacing.md
└── src/
    ├── main.tsx                   # React 入口
    ├── App.tsx                    # 顶层路由(MENU / READY / PLAY / POINT / MATCH_OVER)
    ├── store.ts                   # zustand 状态
    ├── styles.css                 # Tailwind 入口
    ├── core/                      # ─── 平台纯净,零 THREE/DOM/store ───
    │   ├── types.ts               # 冻结(§5.1)
    │   ├── constants.ts           # 冻结默认值(§4.4)
    │   ├── math.ts                # lerp / clamp / rng(seeded)
    │   ├── data/
    │   │   ├── colors.ts          # 配色表(§4.5)
    │   │   ├── paddles.ts         # 球拍模板(2 套,各 characterId)
    │   │   ├── court.ts           # 球场体素定义(800+ voxels)
    │   │   ├── audience.ts        # 12 个观众位置
    │   │   └── sfx.ts             # 合成音效配方(频率/时长/谐波)
    │   └── simulation/
    │       ├── Simulation.ts      # 冻结(§5.3)
    │       ├── ballPhysics.ts     # 冻结(§5.4)
    │       ├── paddleControl.ts   # P1 加速度模型
    │       ├── aiPaddle.ts        # 冻结(§5.5)
    │       ├── scoreTracker.ts    # 冻结(§5.7)
    │       ├── rallyCounter.ts    # rally hits + milestone 触发
    │       ├── juiceEvents.ts     # 冻结(§5.6)
    │       └── events.ts          # SimEvent 类型定义
    ├── engine/                    # ─── 平台适配层,Three.js/DOM 在此 ───
    │   ├── GameEngine.ts          # 编排:rAF + fixed-step sim + render
    │   ├── SceneManager.ts        # scene / camera / lights / 后处理
    │   ├── InputManager.ts        # 键盘 + 鼠标
    │   ├── AudioManager.ts        # Web Audio 合成(读 core/data/sfx.ts)
    │   ├── VoxelRenderer.ts       # InstancedMesh 管理(球场/球拍/球/粒子 4 个 mesh)
    │   ├── ParticleSystem.ts      # 粒子 TTL 更新 + matrix 写入
    │   ├── CameraShake.ts         # 镜头震动
    │   ├── PerfWatchdog.ts        # 性能监控 + 降级
    │   ├── postfx.ts              # UnrealBloom + Vignette
    │   ├── devtools.ts            # window.__gameManifest / __sim
    │   └── storage.ts             # localStorage 适配(读 core/types.ts 键名)
    └── components/                # ─── React UI 覆盖层 ───
        ├── HUD.tsx                # 比分 / rally / milestone 提示
        ├── Menu.tsx               # 主菜单
        ├── ReadyCountdown.tsx     # 3-2-1
        ├── PointOverlay.tsx       # 得分飘字
        ├── WinScreen.tsx          # 胜利 / 失败弹窗
        └── PerfBadge.tsx          # DEV: 显示 perf degradation 状态
```

---

## 7. 每 Tick 数据流(Per-Tick Data Flow)

```
rAF 回调
  ├─ InputManager.poll()                    → 输入缓冲
  ├─ sim.setP1Input(buffer)                 → 注入 sim
  ├─ while accumulator >= FIXED_DT:         ← 固定步循环
  │   ├─ accumulator -= FIXED_DT * slowMoFactor  ← 慢镜影响
  │   ├─ sim.step(FIXED_DT)                 → 更新 ball/paddle/score/juice
  │   │   ├─ ballPhysics.ballStep(...)      → 球物理(emit hit/point/milestone)
  │   │   ├─ paddleControl.p1Step(...)      → P1 加速度模型
  │   │   ├─ aiPaddle.aiStep(...)           → AI 追踪
  │   │   ├─ scoreTracker.pointScored(...)  → 计分(matchOver?)
  │   │   └─ juiceEvents.emitXxx(...)       → juice 事件
  │   └─ events: 收集到 sim 事件队列
  ├─ renderer.update(elapsedDt)             → 视觉层(用真实 dt,不快不慢)
  │   ├─ CameraShake.update(dt)             → 镜头偏移
  │   ├─ ParticleSystem.update(dt)          → 粒子 TTL + matrix
  │   ├─ VoxelRenderer.sync(sim)            → ball/paddle matrix 写入
  │   └─ SceneManager.updateAudience(dt)    → 观众 bounce
  ├─ for event in sim.drainEvents():        → 引擎消费
  │   ├─ switch event.type:
  │   │   ├─ 'cameraShake' → CameraShake.start(...)
  │   │   ├─ 'particleBurst' → ParticleSystem.spawn(...)
  │   │   ├─ 'sfx' → AudioManager.play(event.payload.id)
  │   │   ├─ 'audienceCheer' → SceneManager.cheer(...)
  │   │   └─ 'persist' → storage.write(...)
  ├─ composer.render()                      → post-fx 渲染
  ├─ if frameCount % STORE_SYNC_INTERVAL == 0:
  │   └─ store.setState(sim.snapshot())     → React 同步
  └─ PerfWatchdog.tick(frameTime)           → 性能监控
```

---

## 8. 构建创建(Build Milestones)

### 8.1 M1 — D1 — "能玩"

**范围**:
- ✅ 球场 + 球拍 + 球 + 基础反弹 + 分数 + 1P vs AI
- ❌ 全部 juice 不做(无 shake / 无 particle / 无 SFX / 无 squash)
- ❌ milestone 不做
- ❌ 观众不做
- ❌ 菜单只占位

**交付标准**:
- `npm run dev` 起服务 5183,Chrome 打开 https://localhost:5183
- 看到球场 + 2 个球拍 + 球
- W/S 控制 P1 上下移动
- AI 跟着球移动
- 球被拍到时反弹正确(Y 边界 + paddle 撞击)
- 球出 X 边界时,1.2s 后重新 spawn
- 比分先到 7 显示 "MATCH OVER"
- `npx tsc -b --noEmit` 通过
- 60 FPS 稳定(无 juice,无装饰,容易达标)

**提交纪律**:
- 1 commit: "M1: core contract + simulation + bare engine (no juice)" + tsc 通过
- 1 commit: "M1: UI shell (HUD/Menu 占位) + dev server bootable" + 视觉验证通过
- 1 commit: "M1: 修复 playtest 暴露的 N 个 bug" + 再 playtest

### 8.2 M2 — D2 — "有手感"

**范围**:
- ✅ 全部 juice(camera shake + particle burst + SFX + squash)
- ✅ milestone 慢镜 + 观众跳
- ✅ AI 调优(playtest 5 局)
- ❌ 菜单留占位
- ❌ localStorage 不做
- ❌ 后处理 Bloom 可选(若性能余量)

**交付标准**:
- 击拍 = 立即看到 shake + particle + 听到 PATA!
- 3 拍 rally = 听到 PATA-PATA! + 慢镜 + 观众跳
- 5 拍 = PATA-PATA-PATA! + 大慢镜
- 7 拍 = PATA-PATA-PATA-PONG! + 全场爆
- D2 晚强制 playtest(自己打 5 局 + 调 AI + 调手)

**提交纪律**:
- 1 commit: "M2: particle system + audio synth" + tsc 通过
- 1 commit: "M2: camera shake + squash & stretch" + tsc 通过
- 1 commit: "M2: milestone slowmo + audience cheer" + tsc 通过
- 1 commit: "M2: 调手 playtest fixes" + tsc 通过

### 8.3 M3 — D3 — "能发"

**范围**:
- ✅ 完整菜单(MENU/READY/PLAY/POINT/MATCH_OVER)
- ✅ 观众反应
- ✅ Win/Lose 弹窗 + rematch
- ✅ localStorage(高分局 + 设置)
- ✅ 后处理 Bloom(若性能允许)
- ✅ 调优 + final playtest

**交付标准**:
- 完整流程:menu → 3-2-1 → play → 比分 → win/lose → rematch
- 观众在 milestone 跳
- Win/Lose 弹窗 + 音效
- localStorage 跨刷新保留
- `npm run build` 通过,`dist/` 提交
- Playwright smoke:打开 /,无 console error

**提交纪律**:
- 1 commit: "M3: full menu FSM + Win/Lose UI" + tsc 通过
- 1 commit: "M3: localStorage + settings" + tsc 通过
- 1 commit: "M3: post-fx + final tuning" + tsc 通过
- 1 commit: "M3: dist build + verification report" + agent-qa 签核

### 8.4 验证硬指标

每个 M 验收必须:
1. `npx tsc -b --noEmit` 通过(0 error)
2. `npm run dev` 启动,Chrome 打开无 console error
3. Playwright 冒烟(可选,D1 可省):
   ```ts
   await page.goto('http://localhost:5183');
   const errors = await page.evaluate(() => window.__sim != null);
   expect(errors).toBe(true);
   ```
4. 60 FPS 持续 10s(打开 DevTools Performance)
5. memory < 200MB(打开 DevTools Memory)

---

## 9. 资源管理与文件格式

- **零资产文件**:不引入 .glb / .png / .mp3 / .wav / .ogg / .json(数据除外)。
- **数据文件**:TypeScript 字面量(`as const`),在 `core/data/*.ts`。
- **球拍 / 球场 / 观众**:程序化几何(`BoxGeometry` + `InstancedMesh`)。
- **音效**:Web Audio 节点即时合成(节点图在 `core/data/sfx.ts` 描述,`AudioManager` 实例化)。
- **贴图**:无。`MeshStandardMaterial.color + emissive` 纯色,`roughness = 0.5`,`metalness = 0.2`。

---

## 10. 分支政策(Branch Policy)

- **默认分支**:`master`,remote `github.com/yhyu13/VibeGames`。
- **M1/M2/M3 commit 直推 master**(本项目规模小,无 review);commit message 严格按 §8 提交纪律。
- **禁止 force push / rebase 已 push 的 commit**。

---

## 11. 工具指令(Tool Commands)

| 命令 | 说明 |
|---|---|
| `npm install` | 一次性安装(5_gamejam_1 / 4_chunbai node_modules 提交;本项目**不**提交,首次运行需此命令) |
| `npm run dev` | 启动 dev server,端口 5183 |
| `npm run build` | `tsc -b && vite build`,输出到 `dist/`(本项目**不**提交 dist,见 §10) |
| `npm run preview` | 预览生产构建 |
| `npx tsc -b --noEmit` | 类型检查门(不输出文件) |
| `npx vite --port 5183` | 显式指定端口(dev 默认 5183) |

**禁止**:
- 任何 `npm install <新包>` — 需向 TDD 所有者提变更
- `npm test` — 本项目无测试套件(DDD 决策,72h 内不写)
- 任何 `npm run lint` — 同上(沿用 5_gamejam_1 决策)

---

## 12. 风险登记册(Risk Register)

| # | 风险 | 概率 | 影响 | 对策 |
|---|------|------|------|------|
| R1 | 球拍移动手感受限 | 中 | 高 | M2 中段 playtest,不通就调 lerp;预留 0.5 天调手 |
| R2 | 体素性能超标 | 低 | 中 | M1 用 InstancedMesh(不返工);PerfWatchdog 降级 |
| R3 | AI 太弱(0/7 碾压) | 中 | 中 | 5% 错位 + 反应调优;3 难度参数 |
| R4 | 音频刺耳(PATA 频率) | 中 | 中 | 100ms 短音 + lowpass;M2 playtest 必带耳机 |
| R5 | 72h 干不完 | 中 | 中 | GDD §8.1 砍单硬纪律;M2 末 review |
| R6 | 玩家不知道怎么玩 | 低 | 中 | 标题屏 "PLAY" 大按钮 + 5 行说明 |
| R7 | React 19 + zustand 5 兼容性问题 | 低 | 中 | 沿用 5_gamejam_1 验证过的版本,无新探索 |
| R8 | Three.js 0.170 + React 19 集成 | 低 | 低 | 5_gamejam_1 已验证,直接复用模式 |

---

## 13. 验证计划(Validation Plan)

每个 M 必须:
1. **自动化门**:`npx tsc -b --noEmit` 0 error。
2. **手动门**:dev server 启动 → 视觉验证(见 §8.x 交付标准)。
3. **性能门**:DevTools Performance,60 FPS 持续 10s。
4. **存储门**(M3+):localStorage 写入/读取验证。
5. **跨刷新门**(M3):刷新后高分保留。

**Playwright smoke**(D2+ 起):
```ts
test('M2 smoke: dev server boots, sim ready', async ({ page }) => {
  await page.goto('http://localhost:5183');
  await page.waitForFunction(() => window.__sim != null, { timeout: 5000 });
  const errors = await page.evaluate(() => 
    // @ts-expect-error dev only
    window.__sim?.snapshot?.().phase);
  expect(errors).toBe('MENU');
});
```

---

## 14. 代理任务拆分(原子级,文件所有权白名单)

> **M1 阶段**的所有权分配。冲突文件必须先在 TDD 变更日志登记。

| Agent | 文件所有权 | 依赖 |
|---|---|---|
| **agent-core** | `src/core/**` 全集(冻结契约) | 无(第一批) |
| **agent-engine** | `src/engine/**` 全集(InstancedMesh / Audio / Camera / postfx) | 依赖 core 类型完成(等 agent-core M1.1) |
| **agent-ui** | `src/components/**`、`src/App.tsx`、`src/main.tsx`、`src/store.ts`、`src/styles.css` | 依赖 core 快照结构(等 agent-core M1.1) |
| **agent-content** | `src/core/data/paddles.ts`、`audience.ts`、`court.ts`、`colors.ts`、`sfx.ts` | 无(可与 core 并行) |
| **agent-audio**(合并入 engine) | `src/engine/AudioManager.ts` + 读 `core/data/sfx.ts` | 依赖 content 完成 sfx 数据 |
| **agent-qa** | 无文件所有权;每 M 末跑 tsc + Playwright smoke | 依赖所有 M |

**M1 子批**:
- M1.1(并行):agent-core 写 `core/types.ts` + `core/constants.ts` + `core/math.ts`(冻结契约骨架)
- M1.2(并行):agent-content 写 `core/data/*.ts`(colors / paddles / court / audience / sfx)
- M1.3(依赖 1.1+1.2):agent-core 写 `core/simulation/*.ts`(Simulation + 4 子模块)
- M1.4(依赖 1.3):agent-engine 写 `engine/GameEngine.ts` + `SceneManager.ts` + `VoxelRenderer.ts` + `InputManager.ts`(无 juice,只有渲染)
- M1.5(依赖 1.3):agent-ui 写 `App.tsx` + `HUD.tsx` + `Menu.tsx`(占位)+ `main.tsx` + `store.ts`
- M1.6(依赖 1.4+1.5):集成 + tsc + dev server boot + 视觉验证

**每个子批 1 commit,commit gate = `npx tsc -b --noEmit` 通过**。

---

## 附录:文档版本

| 版本 | 日期 | 作者 | 变更 |
|------|------|------|------|
| v0.1 | 2026-08-07 | Mavis (设计阶段) | 初稿 |

