# TDD — PHASEWALK (四相行者) (current contract v0.9)

| Version | Date | Change |
|---|---|---|
| v0.1 | 2026-08-13 | Initial contract: promoted from 9_3dplatform concept 05; toon-shading 3D (paper-cut style, user preference); 4-phase pure-data switching; 5-floor intro tower; zero assets |
| v0.2 | 2026-08-15 | v4 四相重做：删 `Pipe`/`Vent`/`Wire` + `traverse.ts`；加 `PhaseFluid`/`Bullet`/`Emitter` + `bullets.ts`；四相移动动词（跳/泳/飘/爆冲）+ 物质动词（固化造路/穿过/吸收反弹；分离=冻结）；Tab 圆圈 UI 替换 1/2/3/4 键 |
| v0.3 | 2026-08-15 | M3 相位陷阱（对抗式切相）：加 `Trap`（相锁区/逆相栅）+ `LayerData.traps` + `traps.ts`（`resolveTraps` 前置步 + `isPhaseLocked`）；`collision.ts` 按相门控解析逆相栅；F3 息井教学（井口相锁区 + 井道气栅） |
| v0.4 | 2026-08-15 | M3 相灵守层者（boss）：`Emitter.boss?: boolean`；`gateOpen()` 要求无存活守层者（≥3 相尘 AND 反射摧毁）；F1–F4 各一追踪守门眼（石翁/流姬/息童/焰司）；HUD 守门提示 + 渲染猩红 boss 眼 |
| v0.5 | 2026-08-15 | 打磨轮 14：修 5 项确认发现——暂停用 `clearPressed()`（防同帧 Escape+KeyR 覆盖暂停）；相锁区排队时取消切相；逆相栅无立足点（`fence` 旗标）；F3 气栅 z 覆盖整井；发射器冷却 `+=` 保真实节拍 |
| v0.6 | 2026-08-15 | 打磨轮 15：相尘拾取移到 `stepBullets` 之前（`applyPickups` 前置）——子弹死亡帧不再丢同帧相尘，与危险死亡一致（死亡政策「进度损失 = 通行，非收集」） |
| v0.7 | 2026-08-15 | 打磨轮 16：修 3 项确认发现——主循环 `ev.died` 分支移到 `ev.collected` 之前（同帧死亡不再吞掉相尘拾取的金闪粒子）；`CameraRig.lookAt` y 偏移 0.8→2.4（F1 出生即可见塔顶金门，攀塔目标进 frustum）；`devtools.__shards` 强制收集时同步入账相尘（保持「收集 → 入账」不变量，防 restartLayer 回滚成负） |
| v0.8 | 2026-08-15 | 打磨轮 17：修 4 项确认发现——相弹动量尾迹落地即停（新增 `ParticleSystem.stopTrail`，`ev.landed` 触发，不再在落地静止处堆静态点）；暂停冻结粒子（主循环 `trailPoint`/`update` 仅在非 `paused` 推进，Escape 停住整场景）；`AudioManager.play` 增益节点 tone 结束即 `disconnect`（不再向 destination 累积静默 GainNode）；`SceneManager` 幽灵揭示只在 `playing` 推进（intro 卡片上按 Tab 不再让极致时刻在 55% 暗幕后偷偷放完） |
| v0.9 | 2026-08-15 | 打磨轮 18：修 2 项确认发现——`InputManager.poll` 在径向菜单开启时暂停排空 `switchQueue`（上一次释放排队的切相不再在菜单开启时应用、把相位改到环状高亮快照之外，防高亮失同步 + 释放时误切相）；`storage.saveProgress` 写失败不再静默吞掉（`console.warn` 暴露 quota/私密模式写失败，防相尘/best-switch 无告警丢失） |

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
│   │   │   ├── levels.ts         # F1 tower: per-phase platforms, phaseFluids, emitters, shards, hazards
│   │   │   └── sfx.ts            # SFX recipes (pure data — repo convention)
│   │   └── simulation/
│   │       ├── phasePhysics.ts   # stepPlayer(): per-phase verbs (jump/swim/hover/burst) + 相弹 momentum carry
│   │       ├── collision.ts      # sphere-vs-AABB vs CURRENT phase's collider set + solidifyFluids
│   │       ├── bullets.ts        # 相灵弹: emitters fire, bullets move, phase-decided interaction
│   │       ├── pickups.ts        # 相尘 collection, gate rules, respawn
│   │       ├── traps.ts          # 相位陷阱: resolveTraps (相锁区/逆相栅) + isPhaseLocked (HUD)
│   │       └── GameSim.ts        # orchestrator: reducer over GameState (fixed dt 1/60)
│   ├── engine/                   # platform adapters
│   │   ├── SceneManager.ts       # 4-layer scene graph from LevelData; layer root = phase
│   │   ├── ToonRenderer.ts       # MeshToonMaterial + per-phase 4-stop gradientMap; inverted-hull outline
│   │   │                         # (BackSide scale 1.03, phase ink color); ghost-layer material swap
│   │   ├── PaperFX.ts            # canvas-generated paper grain texture + vignette overlay (no bloom)
│   │   ├── CameraRig.ts          # fixed 3/4 tower-section follow (cutaway view), 1−exp(−k·dt) damping
│   │   ├── InputManager.ts       # WASD/Space + Tab radial (4-quadrant phase select) + Esc; edge-triggered into sim
│   │   ├── AudioManager.ts       # SFX_RECIPES synthesis + per-phase ambient pad layer
│   │   ├── ParticleSystem.ts     # 相弹 sparkles, 相尘 collect burst, reflect/destroy/die bursts, phase-switch trail
│   │   ├── devtools.ts           # DEV: window.__sim / __phase / __teleport / __shards / __beginPlay
│   │   └── storage.ts            # localStorage 10-phasewalk.v1.progress (layer bests + 相尘)
│   ├── store.ts                  # zustand store wrapping GameSim
│   └── components/               # React overlays (CSS)
│       ├── HUD.tsx               # phase wheel (4 shape icons), 相尘 count, layer indicator
│       ├── LayerIntro.tsx        # layer card: name + new phase icon + shape legend
│       ├── LayerClear.tsx        # 登层卡 (layer cleared → next floor; Enter/Space advances)
│       ├── PauseScreen.tsx       # resume / restart layer / quit
│       ├── RadialMenu.tsx        # Tab 四象限切相圆圈菜单（↑气 ↓固 ←液 →焰）
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
  layer: number                 // 1-based
  switches: number              // total phase-switch count this run (min-switch score)
  burstCooldown: number         // plasma 爆冲 cooldown (seconds)
  burstBuffer: number           // plasma air-redirect press buffered across the cooldown (no silent eat)
  dispersed: number             // liquid 被子弹打散 flash timer (visual feedback)
  deaths: number                // death count — respawn ALWAYS at layer spawn (no same-point retry)
}

export interface Platform {
  id: string
  phase: PhaseId                // which layer this geometry belongs to
  min: Vec3; max: Vec3          // AABB collider = visual footprint
  kind: 'static' | 'moving'     // 'moving' = M2+ 暂缓（移动平台未实现；box() 现只发 'static'）
  move?: { axis: 'x' | 'y' | 'z'; range: [number, number]; speed: number; phase: number }  // M2+ 暂缓，未实现
  gold?: boolean                // route platform — golden outline (锁链金, art-direction §3.1)
}

export interface Hazard {
  id: string
  min: Vec3; max: Vec3
  phases: PhaseId[] | 'all'     // which phases it kills (无相区 = 'all')
  name: string                  // 无相区 / 雷云 ...
}

export interface PhaseFluid {    // 相液池 — intangible by default; SOLID freezes it into a walkable platform (固化造路)
  id: string
  min: Vec3; max: Vec3
  solidified: boolean            // frozen → acts as a solid platform (persists this run)
}

export interface Bullet {        // 相灵弹 — neutral projectile; interaction decided by PLAYER's phase
  id: string
  position: Vec3
  velocity: Vec3
  reflected: boolean             // true after plasma absorbs → homes back toward its emitter
  emitterId: string              // source emitter (reflection target)
  life: number                   // seconds remaining before despawn
}

export interface Emitter {       // 相灵眼 — stationary turret firing bullets on an interval
  id: string
  position: Vec3
  aim: Vec3 | 'player'           // fixed aim direction, or track player
  interval: number               // seconds between shots
  speed: number                  // bullet speed
  cooldown: number               // time until next shot
  destroyed: boolean             // destroyed by a reflected bullet
  boss?: boolean                 // 相灵守层者 (M3): guards the gate — must be reflect-destroyed to pass
}

export interface Shard {         // 相尘
  id: string
  phase: PhaseId                 // only visible/collectible in this phase
  position: Vec3
  collected: boolean
  bobPhase: number
}

export type TrapKind = 'phase_lock' | 'phase_fence'   // 相位陷阱 (M3)
export interface Trap {
  id: string
  kind: TrapKind                  // phase_lock=相锁区(禁止切相) / phase_fence=逆相栅(只放行本相)
  phase: PhaseId                  // fence: 放行的相；lock: 未用（区域与相无关）
  min: Vec3; max: Vec3
}

export interface LayerData {
  id: string                     // 'F1_revelation_hall'
  name: string                   // 启示厅
  subtitle: string               // intro card line
  spawn: Vec3
  exit: Vec3                     // golden gate position
  platforms: Platform[]          // all phases' platforms in one array, filtered by phase at runtime
  phaseFluids: PhaseFluid[]
  emitters: Emitter[]
  shards: Shard[]                // exactly 4
  hazards: Hazard[]
  traps: Trap[]                  // 相位陷阱 (M3)
  theme: PhaseId
  hallHalf: [number, number, number]  // visual hall half-extents (x, y, z)
}

export interface InputState {
  x: number; z: number           // -1..1
  jumpPressed: boolean           // edge-triggered
  jumpHeld: boolean
  switchPhase: PhaseId | null    // edge-triggered phase switch request (Tab radial release)
  pause: boolean
}

export interface GameState {
  phase: GamePhase
  player: PlayerState
  layer: LayerData
  layerIndex: number             // 0-based
  shards: Shard[]                // mutable copies
  bullets: Bullet[]              // live 相灵弹
  elapsed: number                // run timer (run-cumulative across floors; deaths keep it running)
  bestSwitches: Record<string, number>  // layerId → min phase-switch count
  totalPhaseDust: number         // persisted across layers
  finished: boolean
  frame: number
}

// pure sim API
export function createInitialState(layerIndex: number, bestSwitches: Record<string, number>, totalPhaseDust: number): GameState
export function step(s: GameState, input: InputState, dt: number): StepEvents
export function stepPlayer(s: GameState, input: InputState, dt: number): void
export function restartLayer(s: GameState): void
export function restartRun(s: GameState): void                        // victory-screen R: fresh climb from F1
export function advanceLayer(s: GameState): void                      // layer_clear → next layer_intro (carries run stats)
export function forcePhase(s: GameState, phase: PhaseId): void
export function resolveTraps(s: GameState, input: InputState): void   // 相锁区取消切相请求 (step() 前置步)
export function isPhaseLocked(s: GameState): boolean                  // 玩家是否在相锁区内 (HUD)
```

## 4. Frozen numeric tables

**四相物理**（`core/constants.ts`）：

| Constant | Value | Notes |
|---|---|---|
| GRAVITY_BASE | 30 | m/s² |
| PHASE_GRAVITY | solid 1.0 / liquid 0.6 / gas 0.18 / plasma 0.9 | × base |
| MOVE_SPEED | solid 5.5 / liquid 6 / gas 6.5 / plasma 8 | m/s |
| JUMP_VELOCITY | solid 11 / liquid 0 / gas 0 / plasma 0 | 只有固相跳（二段跳） |
| GAS_HOVER_ACCEL / MAX_VY | 11 m/s² / 4 m/s | 气相按住跳 = 悬浮（净 +5.6 vs 重力 5.4） |
| GAS_MAX_FALL | 3 | m/s 气相下沉上限（气是浮的） |
| LIQUID_SWIM_ACCEL / MAX_VY | 8 1/s / 5 m/s | 液相按住跳 = 上浮（指数逼近上限的速率常数，非 m/s²；v4 提高以便攀塔） |
| LIQUID_MAX_FALL | 4 | m/s 液相下沉上限 |
| PLASMA_BURST_VY / H | 12 / 8 | 焰相爆冲：垂直 12 m/s + 水平 8×input |
| BURST_COOLDOWN | 0.4 | s 焰相两段爆冲间隔 |
| PHASE_SWITCH_COOLDOWN | 0.15 | s (anti-spam only — 相弹 allowed every cooldown tick) |
| BULLET_RADIUS / LIFE | 0.28 / 6 | m / s（子弹半径 / 存活时长） |
| BULLET_REFLECT_SPEED | 16 | m/s 反射子弹飞回发射器速度 |
| STAGE_MARGIN | 3 | m 场界 = hallHalf + margin（三轴）：子弹越过即销毁、玩家越上即夹回天花（天花板） |
| SOLIDIFY_RADIUS | 1.6 | m 固相凝池半径 |
| COYOTE / JUMP_BUFFER | 0.10 / 0.12 | s |
| MAX_FALL_SPEED | 25 | m/s (solid/plasma) |
| PLAYER_RADIUS / HALF_HEIGHT | 0.35 / 0.60 | m |
| SHARD_COLLECT_RADIUS | 0.7 | m 相尘拾取球半径 |

**相弹法则（评审 D3，frozen）**：切相时**动量守恒**（velocity 不变），重力倍率瞬时切换；无速度乘子、无过渡。液→气自然升腾（重力 0.18 下原动量飞起）、气→固自然急坠、固→液缓落——直觉由物理本身产生，不写特例。

**子弹交互（v4，frozen）**：交互由**玩家当前相**决定——固=中弹死亡（deaths++ 回出生点）；液=被打散（强制切回固相 + 速度清零，不死）；气=子弹穿过（免疫）；焰=吸收反射（子弹掉头飞回发射器，命中即摧毁）。

**相灵弹开火节拍（v4.14）**：发射器冷却用 `em.cooldown += em.interval`（不是 `=`）——`1/60` 非精确表示，绝对复位会把每次循环锚回同一个浮点残差，让每发子弹晚一帧（~1.1% 慢）且永不自校正；`+=` 把亚帧超前量带入下一轮，保持真实节拍。

**相尘拾取先于子弹（v4.15）**：`step()` 里 `applyPickups` 移到 `stepBullets` **之前**——死亡帧上玩家站着的相尘也必须被收下（死亡政策「进度损失 = 通行，非收集」）。重排前子弹死亡（`stepBullets` 内 `respawnAtSpawn` + `step()` 早退）在 `applyPickups` 前返回、静默丢掉同帧拾取，而危险死亡（`applyHazards` 前先 `applyPickups`）会收下——两种死法同帧收尘不一致。现在两路都在玩家仍站原位时先收尘、再由任一种死法传送回出生点。

**死亡帧的粒子顺序（v4.16）**：App.tsx 主循环里 `ev.died` 分支移到 `ev.collected` **之前**——v4.15 让「同帧收尘 + 当帧死亡」成为可能，但主循环先处理 `collected`（发射金色拾取爆闪）再处理 `died`（`particles.reset()` 清场），reset 会在金闪还没被画出来前就把它抹掉。现在先 reset 清掉死亡前残留、再发死亡白闪、最后发金闪，金闪存活到渲染。`CameraRig.lookAt` 的 y 偏移从 `+0.8` 提到 `+2.4`：出生时相机俯角从 ~24° 压到 ~16°，塔顶金门（y≈8.6）从 frustum 上缘外（不可见）回到框内——攀塔目标从一开局就可见（塔=柜式 diorama 意图）。`devtools.__shards` 强制收集时对每个从「未收集→收集」跃迁的相尘同步 `phaseDust++`/`totalPhaseDust++`，保持 `applyPickups` 是唯一正常入账点之外、DEV 作弊也不破坏「收集 → 入账」不变量（否则 restartLayer 回滚 `totalPhaseDust - collectedThisFloor` 会减掉从未入账的尘、强制过门保存虚低相尘）。

**相弹动量尾迹与暂停（v4.17）**：`ParticleSystem` 的 `startTrail` 只把 `trailOn` 置真并定时 0.5s，`trailPoint` 无接地/速度门控——空中切相后立刻落地时，剩余 ~0.3s 会在落地静止处叠 ~18 个静止点（静止团块而非动量缎带）。现新增 `stopTrail()`（清 `trailOn` + `trailTimer`），App 主循环在 `ev.landed` 触发——尾迹止于接地，空中重切相再 `startTrail` 重新武装。同时主循环的 `particles.trailPoint`/`particles.update` 改为仅在 `sim.phase !== 'paused'` 推进：Escape 暂停若落在 0.5s 尾迹中，尾迹会继续在冻结位置发点、`update` 继续老化（暂停没停住整场景）；现在暂停冻结粒子，而 `layer_clear`/`victory` 不冻结（结算金闪在静态覆盖层后继续消散）。`AudioManager.play` 每次调用 `createGain()` 连到 `ctx.destination` 却从不断开——GainNode 不像停掉的 OscillatorNode 那样自动释放，每次 `shot()/burst()/jump()` 都会把一个静默 gain 节点钉在图上直到 `ctx.close()`；现 `osc.onended = () => gain.disconnect()`，音结束即释放。`SceneManager.sync` 的幽灵揭示块原本无 `s.phase` 门控，`reveal()` 在 `layer_intro` 卡片上按 Tab 就会触发（InputManager 允许），0.3s 淡入在 55% 暗幕后放完、极致时刻从未被看到；现揭示只在 `s.phase === 'playing'` 推进，首次真正游玩时开 Tab 才是可见时刻。

**径向菜单开启时不应用排队切相（v4.18）**：`InputManager.poll()` 原本在 `switchQueue` 非空且冷却清零时无条件 `shift()` 应用排队切相，即使 Tab 还按着（菜单开着）——上一次释放 Tab 排队的切相会在玩家重新打开菜单、环状高亮被快照到旧相位之后、菜单开着时落地，把相位改到高亮快照之外（环状高亮失同步）；此时释放 Tab 会把旧高亮相位重新排队（非预期切相 + 虚增 min-switch）。现 `poll()` 的排空条件加 `!tab`：菜单开启时挂起排队切相，相位在开启期间不变，高亮永远与真实相位一致。`storage.saveProgress` 的 catch 原本空吞 `localStorage.setItem` 异常（quota / Safari 私密模式），相尘/best-switch 写失败静默丢失；现 `console.warn` 暴露失败（绝不 crash 游戏循环，但不静默）。

**焰相爆冲缓冲（v4.13）**：`burstBuffer` 在**落地时不清零**——一次在 0.4s 冷却中排队的空中改向按压会在落地后冷却清零时触发地重爆（"the burst never drops"）。落地的 `jumpsUsed=0` 复位不变（只有跳跃动词复位次数）；缓冲按压归玩家所有，碰撞解析（`collision.ts`）不再 reset `burstBuffer`。

**输入边沿清除（v4.14）**：离开 `playing` 的**强制重置**（死亡 / 门 / 重开 / 换层）调 `InputManager.clearQueuedInput()` 清掉待处理的 jump/switch 边沿——否则一个在冷却期排队的相请求会在重生清零冷却的瞬间重放、虚增 min-switch。两处只清跳跃边沿、**保留 switchQueue**：`Enter` 确认 layer_intro 调 `clearJumpEdge()`（保留 Tab 预选相请求进入首帧）；**暂停**调 `clearPressed()`（清 `pressed` + jumpEdge、保留 switchQueue）——v4.13 曾误用 `clearQueuedInput()`（静默吃掉冷却中的合法切相），v4.14 再修 `clearJumpEdge()` 会漏清同帧 `KeyR` 边沿，使 Escape+R 同帧暂停后下一帧被 restart 覆盖。

**相位陷阱（M3 对抗式切相）**：`resolveTraps` 是 `step()` 的**前置步**（在原 frozen 步骤序列之前，不改动既有顺序）——相锁区（`phase_lock`）内 `switchPhase` 请求被取消（切相被锁，须在进入前选好相）；逆相栅（`phase_fence`）在 `collision.ts` 作为按相门控的实心墙解析（只放行本相，其余相被 AABB 推挡）。**v4.14 修两处**：(1) 相锁区在**排队时**就取消——`InputManager.onKeyUp` 释放 Tab 时若玩家在锁区内（`isPhaseLocked`）直接丢弃请求，否则一个在冷却期排队的请求会在玩家离开锁区后重放（`resolveTraps` 只取消已浮出水面的 `switchPhase`，管不到冷却中的 queue）；(2) 逆相栅**无立足点**——`resolveBox` 对 `fence: true` 只推挡不给 grounded/jump 复位，被挡相不会被栅顶接住白嫖二段跳。F3 息井教学：井口相锁区（进井前切气相）+ 井道气栅（气相无实形穿过；z 覆盖整井 [-2.5,-0.3]，不留液相可从井后游上去的后缝）。

**相灵守层者（M3 boss）**：每个守层者 = 该层相反面（石翁/流姬/息童/焰司），是一个 `boss: true` 的追踪相灵眼（`aim: 'player'`）。`gateOpen()` = ≥3 相尘 AND 无存活 boss——守层者必须被焰相反射摧毁才开门（战斗 = 相位解谜的对抗版：boss 出题开火、玩家切焰相解题，非数值对砍）。F1–F4 各一，F5 相核室无 boss（纯四连切终局）。

**Level rules**: 5 layers × 5m；每层 ≤ 24 platforms（**每相 ≤ 8**；F1 启示厅 = 紧凑中央塔 14×14m，四相各一条路线攀塔汇聚塔顶金门、F2–F4 单相为主、F5 四相均衡）；每层 4 相尘（每相路线 1 枚）；出口金门 = 收集该层 ≥3/4 相尘 AND 无存活守层者打开（**探索驱动：必须掌握 ≥3 相**；F1–F4 另有 boss 门，见 §4 相灵守层者）。**死亡政策 v4（2026-08-15 playtest）**：**地面全相实心，坠落永不致死**（v2 虚空吞噬已删除）；死因 = 危险 + 子弹：无相区（`Hazard phases='all'`，无相者吃相）、雷云（气相专属方向护栏——置于路线外侧，路线教学行为永远安全）、**相灵弹（固相中弹死亡）**；死亡 → **出生点重生 + 相位重置固 + deaths 计数**，绝无同点重试，相尘保留。路线平台 = `Platform.gold` 锁链金描边（art-direction §3.1）。教学节奏（世界观先行，`docs/design/00-worldview-first.md`）：F1 前 5 分钟每拍 ≤60s 揭示一个新真相，F2–F4 教学相平台量 ≥ 50%，F5 四相均衡。可达性法则：任意相尘/出口 ≤ 该相移动动词可达（固=2 连跳、液=上浮、气=悬浮、焰=二段爆冲）。

**Toon 参数（frozen，详见 art-direction.md 3.4）**：

| Constant | Value |
|---|---|
| RAMP_STEPS | 4（gradientMap 四阶：暗/背光/受光/高光） |
| OUTLINE_SCALE | 1.03 倒置壳 |
| OUTLINE_INK | 每相墨线色（art-direction 3.2 表） |
| GHOST_ALPHA | 0.15 |
| GHOST_DESAT | −40%（作用于 ramp 每阶降饱和——全 hue ramp 下白色 base color 已无 hue 可降） |
| GHOST_PARALLAX | 0.15m 层间视差 |
| GHOST_RENDER_RADIUS | 8m（玩家半径外幽灵层不渲染） |
| PAPER_GRAIN | 128px canvas 噪声，4% 不透明度混合 |
| VIGNETTE | 0.3（唯一后处理；**无 bloom**） |
| SUN | 主方向光 45° 塔外，2048 BasicShadowMap 硬影 |

**Audio** (`core/data/sfx.ts` 配方): switch（相位音叉：4 相各 1 个基频 220/330/440/660 Hz 短音）、phaseBounce（相弹成功 = 三角上行滑音 300→700）、collect（相尘 = 玻璃磬音）、gate（锁链金 = 双音钟）、death（中弹/被吃相 = 下行）、clear（登层 = 三角 660 平音）、reflect（焰相吸弹反射）、disperse（液被打散）、destroy（反射拆发射器）、solidify（固化造路 = 结晶上行）、jump（固跳 = 正弦 320→520）、burst（焰爆冲 = 三角 200→900）、land（落地 = 正弦 200→90）、shot（发射器开火 = 方波 640→240）。每层 1 个氛围垫（相位根音 drone + 慢 LFO）。

**Persistence**: key `10-phasewalk.v1.progress` → `{ bestSwitches: Record<string, number>, totalPhaseDust: number }`。save 时机（v4.12 起）：每枚相尘拾取、`beforeunload`（退出/重载兜底）、每层 gate、R 重开——中段拾取的相尘在关页前即持久化，不再只靠稀疏的 gate/R save 丢失。

## 5. Toon rendering pipeline (the technical core)

1. **材质**: 全部 `MeshToonMaterial`，每相 1 张 `gradientMap`（`DataTexture`，4 阶相位色 ramp，boot 时 canvas 生成）——材质实例共享，不 per-mesh。**全 hue ramp**：r185 只在 `gradientmap_pars_fragment.glsl` 的 `getGradientIrradiance` 里采样 ramp 的 R 通道作标量，多 hue 4 阶 ramp 会塌成灰阶亮度带。`applyFullHueRamp` 用 `onBeforeCompile` 把采样改写为全 RGB 并配白色 base color。**关键踩坑**：`onBeforeCompile` 拿到的是**尚未展开 `#include <gradientmap_pars_fragment>` 的原始 ShaderLib 源码**（`WebGLRenderer.js:2216`，`resolveIncludes` 在其后才展开），所以不能对「采样器那一行」做 `.replace`（那行只在 include 块里，替换 0 次静默 no-op）——必须替换 `#include <gradientmap_pars_fragment>` 指令本身，内联成一份采样返回 `.rgb` 的该块副本。
2. **轮廓**: 倒置壳——每 mesh 一个 `BackSide` 克隆（scale 1.03，`MeshBasicMaterial` 相位墨线色）；幽灵层壳 alpha 0.25。无 Sobel 后处理。
3. **灯光**: 1 `DirectionalLight`（幕布灯，castShadow 2048）+ 1 `HemisphereLight`（相位 tint）。0 点光 v0.1（皮影只有一盏灯）。
4. **幽灵层**: 非当前相 `Group.visible` 保持 true，材质换 `ghostMat`（alpha 0.15、饱和降阶 ramp、`depthWrite: false`）+ 0.15m 视差偏移；玩家 8m 外 `visible=false`（评审 D2）。切相 = 换当前相 Group 的材质集（引用交换，零 GC）。
5. **纸纹/幕布**: 背景 = 幕布色 `#1a1b2e` + 程序化纸纹贴图叠加（`scene.background` 用大平面 BackSide）；vignette 用 CSS 覆盖层（免后处理 pass）。
6. **性能预算**: 60fps / 每相 ≤8k tris、4 层 ≤32k + 轮廓壳 ×2 顶点 / draw calls ≤ 40 / 冷启动 ≤1s。
7. **渲染循环开销（v4.13）**: `App` 的 `version` bump 是唯一 re-render 触发器（sim 原地变异、引用稳定）——只在 `playing` 每 3 帧 bump 一次（HUD 是唯一实时覆盖层），相态切换时单独 bump 一次（静态屏渲染一次，而非 20Hz 空转）。粒子系统是真对象池：240 个 `Particle` 预分配 + free-list 复用，`burst`/`trailPoint`/`update` 每帧零堆分配，过期用 swap-remove（O(1)）替代 splice。

## 6. Verification gates

```bash
npx tsc -b --noEmit        # 0 errors — the gate (repo convention)
npm run build               # tsc -b && vite build
npm run dev                 # localhost:5187, strictPort
```
Browser playtest (kilo-playwright MCP):
- 全塔 5 层端到端：0 console error；`window.__sim` 存在（DEV）
- 4 层同时渲染截图：随机 10 名测试者 5s 内指对实心层 ≥9/10（art-direction §4 验证门）
- 相弹断言（seeded `__sim`）：气→固切相前后 velocity 相等、重力倍率 0.18→1.0；动量守恒
- F5 极致 case：4 连切 ≤2 次死亡通关（评审 §5 晋升条件）
- 灰度模拟（`__phase` 强制灰度）：4 相形状图标可区分
- 持久化：清层 → 刷新 → bestSwitches 在

## 7. Milestones & branches policy

| Build | Acceptance |
|---|---|
| M1 (vertical slice) | F1–F2 可玩（固/液 + 切相 + 相弹）+ toon 管线全通 + 展位级 HUD |
| M2 (content) | F3–F5 + 20 相尘 + 菜单/暂停/结算 + 音频/粒子 + 持久化 |
| M3 (enemies & polish) | 相灵守层者 ×4（石翁/流姬/息童/焰司）✅ + 相位陷阱 ✅ + polish loop |
| RC | 60fps 全塔 · 新手 15 分钟通关 · verification-report 更新 |

Branches: `master` + `agent/<name>` worktrees (repo convention). Frozen-contract discipline: `types.ts`/`constants.ts`/`levels.ts` immutable after M1 scaffold; coder agents own disjoint file lists (phasePhysics+bullets, collision+pickups, ToonRenderer+PaperFX, SceneManager+CameraRig, Audio+UI) and self-check `tsc`.

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
