# TDD — PHASEWALK (四相行者) (current contract v0.1)

| Version | Date | Change |
|---|---|---|
| v0.1 | 2026-08-13 | Initial contract: promoted from 9_3dplatform concept 05; toon-shading 3D (paper-cut style, user preference); 4-phase pure-data switching; 5-floor intro tower; zero assets |

## 1. Stack (locked)

| Dep | Version | Use |
|---|---|---|
| vite | ^6.0.0 | build / dev server **5187** (strictPort — 3000/5173/5183/5185/5186 taken) |
| typescript | ^5.6.0 | strict typecheck |
| react / react-dom | ^19.0.0 | UI overlays (HUD phase wheel / menus / settle) |
| zustand | ^5.0.0 | UI state |
| three | 0.185.0 | WebGL2 renderer + `MeshToonMaterial` toon pipeline (core only; no WebGPU needed — toon has no RT requirement) |

**Renderer choice (locked rationale)**: toon shading needs no ray tracing — WebGL2 raster + `MeshToonMaterial` (gradientMap ramp) + inverted-hull outlines is the entire pipeline. This is the *anti-9_3dplatform*: color legibility over light physics (art-direction.md 3.4). No Tailwind (plain CSS, matches `8_lifegame`). No test runner — `tsc -b --noEmit` + browser playtest are the gates (repo convention). Zero runtime asset files; zero network calls (paper grain + ramp maps are canvas-generated at boot).

## 2. Architecture (C.A.T)

```
10_phasewalk/
├── src/
│   ├── core/                     # platform-pure: zero three/react/zustand/DOM
│   │   ├── types.ts              # frozen contracts (this doc §3)
│   │   ├── constants.ts          # frozen numeric tables (§4): phase physics, toon params, level rules
│   │   ├── data/
│   │   │   ├── levels.ts         # 5-floor tower: per-phase platforms, pipes, vents, wires, shards, gates
│   │   │   └── sfx.ts            # SFX recipes (pure data — repo convention)
│   │   └── simulation/
│   │       ├── phasePhysics.ts   # stepPlayer(): per-phase gravity/move/jump + 相弹 momentum carry
│   │       ├── collision.ts      # sphere-vs-AABB vs CURRENT phase's collider set only
│   │       ├── traverse.ts       # liquid pipes (tube-follow), wind zones (impulse), plasma wires (rail-follow)
│   │       ├── pickups.ts        # 相尘 collection, gate rules, respawn
│   │       └── GameSim.ts        # orchestrator: reducer over GameState (fixed dt 1/60)
│   ├── engine/                   # platform adapters
│   │   ├── SceneManager.ts       # 4-layer scene graph from LevelData; layer root = phase
│   │   ├── ToonRenderer.ts       # MeshToonMaterial + per-phase 4-stop gradientMap; inverted-hull outline
│   │   │                         # (BackSide scale 1.03, phase ink color); ghost-layer material swap
│   │   ├── PaperFX.ts            # canvas-generated paper grain texture + vignette overlay (no bloom)
│   │   ├── CameraRig.ts          # fixed 3/4 tower-section follow (cutaway view), 1−exp(−k·dt) damping
│   │   ├── InputManager.ts       # WASD/Space + 1/2/3/4 phase keys + Esc; edge-triggered into sim
│   │   ├── AudioManager.ts       # SFX_RECIPES synthesis + per-phase ambient pad layer
│   │   ├── ParticleSystem.ts     # 相弹 sparkles, 相尘 collect burst, wind streaks, wire arcs
│   │   ├── devtools.ts           # DEV: window.__sim / __scene / __phase (force phase, seed)
│   │   └── storage.ts            # localStorage 10-phasewalk.v1.progress (layer bests + 相尘)
│   ├── store.ts                  # zustand store wrapping GameSim
│   └── components/               # React overlays (CSS)
│       ├── HUD.tsx               # phase wheel (4 shape icons), 相尘 count, layer indicator
│       ├── LayerIntro.tsx        # layer card: name + new phase icon + shape legend
│       ├── PauseScreen.tsx       # resume / restart layer / quit
│       ├── LayerClear.tsx        # time, 相尘, min-switch-count delta
│       └── VictoryScreen.tsx     # total 相尘, min-switch total, ending-direction teaser
├── GDD.md / TDD.md / AGENTS.md / verification-report.md
└── docs/ (review.md, expansion-plan.md, design/01-art-direction.md, design/02-story-world.md)
```

**Why collision filters by phase instead of a physics engine**: 切相 = swap `LevelData.phases[phase].colliders` — a pure-data array swap in core. Zero physics engine (no Rapier), deterministic at fixed dt 1/60. The 4× content cost is absorbed by level design (each floor teaches ONE phase — see §4 level rules).

## 3. Data contracts (frozen)

```ts
// core/types.ts
export type PhaseId = 'solid' | 'liquid' | 'gas' | 'plasma'
export type GamePhase = 'boot' | 'menu' | 'layer_intro' | 'playing' | 'paused' | 'layer_clear' | 'victory'
export type Vec3 = { x: number; y: number; z: number }

export interface PlayerState {
  position: Vec3
  velocity: Vec3
  phase: PhaseId
  switchCooldown: number        // seconds remaining (PHASE_SWITCH_COOLDOWN)
  grounded: boolean
  jumpsUsed: 0 | 1 | 2
  coyote: number
  jumpBuffer: number
  phaseDust: number             // 相尘 collected this run
  checkpoint: Vec3
  layer: number                 // 1..5
  dead: boolean
  wireReleased: boolean         // true after wire exit-jump until grounded/phase-switch (no re-capture)
}

export interface Platform {
  id: string
  phase: PhaseId                // which layer this geometry belongs to
  min: Vec3; max: Vec3          // AABB collider = visual footprint
  liquidOnly?: boolean          // grate: solid-phase pass-through point (liquid traversal)
  kind: 'static' | 'moving'
  move?: { axis: 'x' | 'y' | 'z'; range: [number, number]; speed: number; phase: number }
}

export interface Pipe {          // liquid phase traversal
  id: string
  points: Vec3[]                 // tube centerline
  radius: number                 // 0.5 fixed
  flowSpeed: number              // + = downstream
}

export interface Vent {          // gas phase traversal
  id: string
  position: Vec3
  radius: number                 // 1.2 fixed
  impulse: Vec3                  // per-second velocity added while inside
}

export interface Wire {          // plasma phase traversal
  id: string
  points: Vec3[]
  slideSpeed: number             // 12 m/s fixed
}

export interface Shard {         // 相尘
  id: string
  phase: PhaseId                 // only visible/collectible in this phase
  position: Vec3
  collected: boolean
  bobPhase: number
}

export interface LayerData {
  id: string                     // 'F1_stone_hall' ... 'F5_core_room'
  name: string                   // 石厅 / 流廊 / 息井 / 焰网 / 相核室
  spawn: Vec3
  exit: Vec3                     // golden gate position (opens when this layer's shards are 0/4 or 4/4 — see §4)
  platforms: Platform[]          // all phases' platforms in one array, filtered by phase at runtime
  pipes: Pipe[]
  vents: Vent[]
  wires: Wire[]
  shards: Shard[]                // exactly 4
  theme: PhaseId                 // teaching phase for this floor
}

export interface InputState {
  x: number; z: number           // -1..1
  jumpPressed: boolean           // edge-triggered
  jumpHeld: boolean
  switchPhase: PhaseId | null    // edge-triggered phase switch request (1/2/3/4 keys)
  pause: boolean
}

export interface GameState {
  phase: GamePhase
  player: PlayerState
  layer: LayerData
  layerIndex: number             // 0..4
  shards: Shard[]                // mutable copies
  elapsed: number                // layer timer (real time; deaths keep it running)
  bestSwitches: Record<string, number>  // layerId → min phase-switch count
  totalPhaseDust: number         // persisted across layers
  finished: boolean
  frame: number
}

// pure sim API
export function createInitialState(layerIndex: number): GameState
export function stepPlayer(s: GameState, input: InputState, dt: number): GameState
export function switchPhase(s: GameState, next: PhaseId): GameState
export function restartLayer(s: GameState): GameState
export function layerCleared(s: GameState): GameState
export function toVictory(s: GameState): GameState
```

## 4. Frozen numeric tables

**四相物理**（`core/constants.ts`）：

| Constant | Value | Notes |
|---|---|---|
| GRAVITY_BASE | 30 | m/s² |
| PHASE_GRAVITY | solid 1.0 / liquid 0.6 / gas 0.18 / plasma 0.9 | × base；plasma 离线时坠落（乘线时电线接管速度） |
| MOVE_SPEED | solid 8 / liquid 7 / gas 7 / plasma 8（离线） | m/s |
| JUMP_VELOCITY | solid 11 / liquid 9 / gas 8.5 | m/s; jump height solid 2.02m |
| GAS_HOVER_ACCEL / MAX_VY | 11 m/s² / 4 m/s | 气相按住跳 = 悬停（polish U1"乘风感"；净 +5.6 vs 重力 5.4） |
| GAS_MAX_FALL | 3 | m/s 气相下沉上限（气是浮的，不是石头） |
| LIQUID_MAX_FALL | 4 | m/s 液相下沉上限（polish U2 可控制） |
| LIQUID_SWIM_ACCEL / MAX_VY | 3 m/s² / 2.5 m/s | 液相按住跳 = 上游 |
| PHASE_SWITCH_COOLDOWN | 0.15 | s (anti-spam only — 相弹 is allowed every cooldown tick) |
| PIPE_FLOW_SPEED | 4 | m/s downstream drift |
| VENT_IMPULSE | 14 | m/s² upward wind |
| WIRE_SLIDE_SPEED | 12 | m/s, direction = travel direction at wire enter |
| WIRE_EXIT_JUMP | 8.5 | m/s when jumping off a wire |
| COYOTE / JUMP_BUFFER | 0.10 / 0.12 | s |
| MAX_FALL_SPEED | 25 | m/s (solid/plasma) |
| PLAYER_RADIUS / HALF_HEIGHT | 0.35 / 0.60 | m |

**相弹法则（评审 D3，frozen）**：切相时**动量守恒**（velocity 不变），重力倍率瞬时切换；无速度乘子、无过渡。液→气自然升腾（重力 0.25 下原动量飞起）、气→固自然急坠、固→液缓落——直觉由物理本身产生，不写特例。

**Level rules**: 5 layers × 5m；每层 ≤ 24 platforms（**每相 ≤ 8**；F1 启示厅四相各 1 段、F2–F4 单相为主、F5 四相均衡）；每层 4 相尘（1 枚只在本层教学相可见）；出口金门 = 收集该层 ≥3/4 相尘打开（硬核线允许漏 1 枚）。教学节奏（世界观先行，`docs/design/00-worldview-first.md`）：F1 前 5 分钟每拍 ≤60s 揭示一个新真相，F2–F4 教学相平台量 ≥ 50%，F5 四相均衡。可达性法则：任意相尘/出口 ≤ 该相 2 连跳可达（水平 ≤6.5m、垂直 ≤3.4m）。

**Toon 参数（frozen，详见 art-direction.md 3.4）**：

| Constant | Value |
|---|---|
| RAMP_STEPS | 4（gradientMap 四阶：暗/背光/受光/高光） |
| OUTLINE_SCALE | 1.03 倒置壳 |
| OUTLINE_INK | 每相墨线色（art-direction 3.2 表） |
| GHOST_ALPHA | 0.15 |
| GHOST_SATURATION | −40%（通过 ramp 色预降实现） |
| GHOST_PARALLAX | 0.15m 层间视差 |
| GHOST_RENDER_RADIUS | 8m（玩家半径外幽灵层不渲染） |
| PAPER_GRAIN | 128px canvas 噪声，4% 不透明度混合 |
| VIGNETTE | 0.3（唯一后处理；**无 bloom**） |
| SUN | 主方向光 45° 塔外，2048 PCF 硬影 |

**Audio** (`core/data/sfx.ts` 配方): switch（相位音叉：4 相各 1 个基频 220/330/440/660 Hz 短音）、phase-bounce（相弹成功 = 上行滑音 300→700，失败坠地 = 下行）、collect（相尘 = 玻璃磬音）、gate（锁链金 = 双音钟）、wire（电流嗞 30ms）、vent（风噪带通）、layer-clear（三音上行）。每层 1 个氛围垫（相位根音 drone + 慢 LFO）。

**Persistence**: key `10-phasewalk.v1.progress` → `{ bestSwitches: Record<string, number>, totalPhaseDust: number }`。

## 5. Toon rendering pipeline (the technical core)

1. **材质**: 全部 `MeshToonMaterial`，每相 1 张 `gradientMap`（`DataTexture`，4 阶相位色 ramp，boot 时 canvas 生成）——材质实例共享，不 per-mesh。
2. **轮廓**: 倒置壳——每 mesh 一个 `BackSide` 克隆（scale 1.03，`MeshBasicMaterial` 相位墨线色）；幽灵层壳 alpha 0.25。无 Sobel 后处理。
3. **灯光**: 1 `DirectionalLight`（幕布灯，castShadow 2048）+ 1 `HemisphereLight`（相位 tint）。0 点光 v0.1（皮影只有一盏灯）。
4. **幽灵层**: 非当前相 `Group.visible` 保持 true，材质换 `ghostMat`（alpha 0.15、饱和降阶 ramp、`depthWrite: false`）+ 0.15m 视差偏移；玩家 8m 外 `visible=false`（评审 D2）。切相 = 换当前相 Group 的材质集（引用交换，零 GC）。
5. **纸纹/幕布**: 背景 = 幕布色 `#1a1b2e` + 程序化纸纹贴图叠加（`scene.background` 用大平面 BackSide）；vignette 用 CSS 覆盖层（免后处理 pass）。
6. **性能预算**: 60fps / 每相 ≤8k tris、4 层 ≤32k + 轮廓壳 ×2 顶点 / draw calls ≤ 40 / 冷启动 ≤1s。

## 6. Verification gates

```bash
npx tsc -b --noEmit        # 0 errors — the gate (repo convention)
npm run build               # tsc -b && vite build
npm run dev                 # localhost:5187, strictPort
```
Browser playtest (kilo-playwright MCP):
- 全塔 5 层端到端：0 console error；`window.__sim` 存在（DEV）
- 4 层同时渲染截图：随机 10 名测试者 5s 内指对实心层 ≥9/10（art-direction §4 验证门）
- 相弹断言（seeded `__sim`）：气→固切相前后 velocity 相等、重力倍率 0.25→1.0；动量守恒
- F5 极致 case：4 连切 ≤2 次死亡通关（评审 §5 晋升条件）
- 灰度模拟（`__phase` 强制灰度）：4 相形状图标可区分
- 持久化：清层 → 刷新 → bestSwitches 在

## 7. Milestones & branches policy

| Build | Acceptance |
|---|---|
| M1 (vertical slice) | F1–F2 可玩（固/液 + 切相 + 相弹）+ toon 管线全通 + 展位级 HUD |
| M2 (content) | F3–F5 + 20 相尘 + 菜单/暂停/结算 + 音频/粒子 + 持久化 |
| M3 (enemies & polish) | 相灵 mini-boss ×4 + 相位陷阱 + polish loop |
| RC | 60fps 全塔 · 新手 15 分钟通关 · verification-report 更新 |

Branches: `master` + `agent/<name>` worktrees (repo convention). Frozen-contract discipline: `types.ts`/`constants.ts`/`levels.ts` immutable after M1 scaffold; coder agents own disjoint file lists (phasePhysics+traverse, collision+pickups, ToonRenderer+PaperFX, SceneManager+CameraRig, Audio+UI) and self-check `tsc`.

## 8. Risk register

| Risk | Mitigation |
|---|---|
| 4 层视觉噪音（评审 S/W①） | toon 平涂 + 相位墨线 + 幽灵层 15% alpha/饱和降阶 + 8m 渲染半径（D2） |
| 相弹手感别扭 | 动量守恒零特例（D3）+ M1 P2 起 playtest 数字（`docs/review.md` §5 晋升条件 3） |
| 4× 内容成本 | 每层单相教学（F1–F4）+ 只有 F5 四相均衡（§4 level rules） |
| 相位色混淆 | 形状图标编码（方/环/点/折线）+ 色弱灰度验证门 |
| 倒置壳轮廓在 4 层叠加下的排序 | 壳用 `MeshBasicMaterial` + 显式 renderOrder（当前相 > 幽灵 > 背景） |
| 与 Quantum Conundrum 的对比 | 差异化锚点 = "同时看见 4 个世界"（评审 D6）；营销/介绍语锁定此句 |

## 9. File tree (new files this scope)

New: `package.json`, `vite.config.ts`, `tsconfig*.json`, `index.html`, `src/main.tsx`, `src/App.tsx`, `src/styles.css`, everything under §2's tree, `GDD.md`, `TDD.md`, `AGENTS.md`, `verification-report.md`, `docs/review.md`, `docs/expansion-plan.md`, `docs/design/01-art-direction.md`, `docs/design/02-story-world.md`. Modified outside `10_phasewalk/`: root `AGENTS.md` (append project entry) and `9_3dplatform/concepts/README.md` + `9_3dplatform/AGENTS.md` (mark concept 05 promoted). `node_modules/`/`dist/` NOT committed (own `.gitignore`).
