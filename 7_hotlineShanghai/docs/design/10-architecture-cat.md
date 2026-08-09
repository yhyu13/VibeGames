# 10 — C.A.T 架构(核心 / 引擎 / 组件)

> **本文档 = 项目架构权威**。新人第一周必读。
> 数据契约: [`TDD.md`](../../TDD.md) §5 契约速写;模块: [`AGENTS.md`](../../AGENTS.md);设计: [`GDD.md`](../../GDD.md);里程碑: [`MVP-PLAN.md`](../../MVP-PLAN.md)。
> 与本文档冲突 = bug,必须修复(改本文件 = `[DESIGN-LAYER-CHANGE]`)。

## 1. 三层架构(沿用 4_chunbai / 5_gamejam_1 / 6_patapong3D)

```
       ┌─────────────────────────────────────────────────────┐
       │              components/  (React UI)                │
       │  DeathScreen / DevPanel / HUD / MainMenu /        │
       │  MaskSelect / MissionSelect / PauseOverlay /       │
       │  ScoreOverlay                                       │
       └────────────────────────┬────────────────────────────┘
                                │ zustand store / UiBridge (单向)
                                ▼
       ┌─────────────────────────────────────────────────────┐
       │              engine/  (平台适配)                    │
       │  GameEngine / AudioManager / InputManager /        │
       │  RcPipeline / SceneManager / PostProcessPipeline / │
       │  PerfWatchdog / sprites/ / shaders/ /              │
       │  devtools / storage                                 │
       └────────────────────────┬────────────────────────────┘
                                │ sim 事件 / state 快照 (单向)
                                ▼
       ┌─────────────────────────────────────────────────────┐
       │              core/  (平台纯净)                      │
       │  types / constants / math /                         │
       │  data/(enemies / lights / masks / missions /       │
       │        palette / sfx / sprites / weapons) /         │
       │  simulation/(Simulation / collision / damage /     │
       │              enemyAI / events / masks / mission /  │
       │              pauseAndDeath / player / rcnodes /     │
       │              weapons) /                             │
       │  world/(WorldManifest / lightField / roomTokenizer │
       │         / tileMap)                                  │
       └─────────────────────────────────────────────────────┘
```

## 2. C.A.T 硬规则(违反 = bug)

### 2.1 `core/` 平台纯净

- ❌ 禁止 `import` `three` / `@react-three/fiber`
- ❌ 禁止 `import` `react` / `react-dom`
- ❌ 禁止 `import` `zustand`
- ❌ 禁止使用 `window` / `document` / `navigator` / `AudioContext` / `WebGL2RenderingContext`
- ❌ 禁止使用 `Date.now()` / `Math.random()`(便于确定性测试)
- ✅ 只允许:TS 基础类型 + 自有 `math.ts`(纯函数)+ 其他 `core/` 文件
- ✅ 时间来源:SimEvent `timestamp`(调用方注入);随机来源:`core/math.ts::rng(seed)`

### 2.2 `engine/` 平台适配

- ✅ 可以 `import` `core/` + 平台 API
- ✅ 可以 `import` `three` / `react` / `zustand`
- ❌ 禁止 `import` 其他 `engine/` 文件做"间接"调用(必须经 GameEngine 协调)
  - 例外:`AudioManager` / `RcPipeline` / `SceneManager` 都是独立子系统,直接 import OK
- ❌ 禁止在 `engine/` 写"游戏逻辑"(移动 / 攻击判定 / 分数)— 那是 `simulation/` 的工作

### 2.3 `components/` React UI

- ✅ 读 zustand store
- ✅ 调 `GameEngine.sendInput(event)` 发输入
- ❌ 禁止直接改 `core/` 状态
- ❌ 禁止直接调 `simulation/` 函数(必须经 engine)
- ❌ 禁止 `useEffect` 里跑 render loop(那是 engine 的工作)

## 3. 单向数据流(强制)

```
键盘 / 鼠标
   ↓ InputManager
   ↓ event
GameEngine.sendInput(event)
   ↓ dispatch
Simulation.apply(event)         ← core 平台纯净
   ↓ produces SimEvent
Simulation.tick(dt)              ← engine 调度
   ↓ updates
engine state (audio / render / camera)
   ↓
zustand store (UI state only)    ← 引擎把"需要 UI 看的"投影到 store
   ↓
React components 读              ← 渲染 HUD / 屏
```

**禁止反向**:
- ❌ components → core(必须经 engine)
- ❌ engine → components 调(单向)
- ❌ zustand store 反推 sim state(只读,不能改)

## 4. 子系统边界

### 4.1 `Simulation`(core/simulation/Simulation.ts)

- **职责**:游戏逻辑协调器。接收 input event,跑 60Hz tick,产生 SimEvent。
- **依赖**:`core/data/*` + `core/simulation/*`(子系统)+ `core/world/*`。
- **不知道**:DOM / React / Three / zustand。

### 4.2 `GameEngine`(engine/GameEngine.ts)

- **职责**:启动 + 调度 Simulation + 维护 render loop + 协调 audio / render / camera。
- **依赖**:Simulation + 全部 `engine/` 子系统。
- **不知道**:具体游戏规则(只调 `sim.tick(dt)`)。

### 4.3 `RcPipeline`(engine/RcPipeline.ts)

- **职责**:WebGL2 framebuffer 编排,跑 6 阶段 RC 管线。
- **依赖**:`engine/shaders/*` + `engine/postfx/*`。
- **不知道**:Three 场景图 / Simulation state(只吃 sceneTexture + lights 列表)。

### 4.4 `SceneManager`(engine/SceneManager.ts)

- **职责**:Three 场景图;管理 roomGroup / spriteGroup / lightGroup。
- **依赖**:Three + `core/data/sprites.ts`(纯数据)。
- **不知道**:Simulation tick(只接 GameEngine 的 setRoom / setSprites 调用)。

### 4.5 `AudioManager`(engine/AudioManager.ts)

- **职责**:Web Audio 合成;管理 voice 池(≤6 上限)。
- **依赖**:`core/data/sfx.ts`(纯数据)+ `AudioContext`。
- **不知道**:任何游戏逻辑(只接 SfxRecipeId + play(volume))。

### 4.6 `InputManager`(engine/InputManager.ts)

- **职责**:键盘 / 鼠标事件捕获 + 派发到 GameEngine。
- **依赖**:DOM event。
- **不知道**:任何游戏逻辑(只产生 raw input event)。

## 5. 数据流图(完整)

```
[PLAY start]
    ↓
GameEngine.start()
    ↓ mount
  ├→ InputManager.attach(window)
  ├→ AudioManager.init(AudioContext)
  ├→ SceneManager.init(canvas)
  ├→ RcPipeline.init(gl)
    ↓
[Game loop - rAF 60Hz]
    ├→ InputManager.poll() → InputEvent[] → GameEngine.sendInput(event)
    │                                ↓
    │                       Simulation.apply(event)
    │                                ↓ produces SimEvent
    │                       SimEvent.broadcast() → engine subscribers
    │
    ├→ Simulation.tick(dt) → reads core/data/*, mutates core/simulation/* state
    │                                ↓
    │                       sceneSnapshot = snapshot()
    │
    ├→ SceneManager.setRoom(sceneSnapshot.room)
    │                                ↓
    │                       sceneTexture = SceneManager.getSceneTexture()
    │
    ├→ RcPipeline.render(sceneTexture, lights)
    │                                ↓
    │                       final canvas 绘制
    │
    └→ zustandStore.setState(snapshot.ui)
                                    ↓
                          React components re-render
```

## 6. 跨层调用"可以/不可以"清单

| 调用方 → 被调方 | ✅ 允许 | ⚠️ 例外 | ❌ 禁止 |
|------------------|--------|---------|--------|
| `core/` → `engine/` | ❌ | — | 全部禁止 |
| `core/` → `components/` | ❌ | — | 全部禁止 |
| `core/` → `core/` | ✅ 同层 | — | — |
| `engine/` → `core/` | ✅ 全部 | — | — |
| `engine/` → `engine/` | ⚠️ | 只允许 GameEngine / 子系统 / 工具类 | ❌ 子系统之间互调必须经 GameEngine |
| `engine/` → `components/` | ❌ | engine 可以 emit React-知道的事件(走 zustand) | engine 不能 import components |
| `components/` → `core/` | ❌ | — | 全部禁止(经 engine) |
| `components/` → `engine/` | ✅ 调 GameEngine.sendInput / zustand store | — | components 不能 import engine 子系统 |
| `components/` → `components/` | ✅ 同层 | — | — |

## 7. 防呆 checklist(改代码前必过)

- [ ] 我改的代码属于 `core/` 吗?→ 不能 import `three` / `react` / `zustand` / DOM
- [ ] 我加的 `core/data/*.ts` 字段走 TDD 契约更新流程了吗?(见 `11-contract-change-procedure.md`)
- [ ] 我改的 `engine/` 子系统是不是被其他 engine 子系统直接调了?→ 改用 GameEngine 协调
- [ ] 我加的 components 直接调 simulation 函数了吗?→ 经 engine
- [ ] 我加的 zustand store 反推 sim state 了吗?→ ❌

## 8. 与本架构的常见违例(BUGS 来源)

| BUGS | 违例 | 修复 |
|------|------|------|
| B22 | engine/InputManager 解引用 sim.input 静默丢失输入 | engine → core 单向改为方法调用 |
| B23 | engine 投掷生成 / 拾取逻辑写在 engine(应 core) | 移至 core/simulation/weapons.ts |
| B24-B28 | SceneManager 假加法 addLampGlow(RC 假实现) | 删假加法,decorative lights 走真 RC |
| B33 整体 | 架构碎片化(SceneManager / RcPipeline / shaders 散落) | B33 重置 + 本文档统一 |

## 9. 状态

| 项 | 状态 |
|----|------|
| 10 架构文档 | ✅ 2026-08-09 新建 |
| C.A.T 硬规则 | ✅ 沿用 4_chunbai / 5_gamejam_1 / 6_patapong3D |
| 数据流图 | ✅ 本文档 §5 |
| 防呆 checklist | ✅ 本文档 §7 |
| lint / pre-commit 自动化卡硬规则 | 🕐 待加(目前靠人审 + 09 §11 + 23-signoff) |
