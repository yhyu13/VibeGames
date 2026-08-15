# JOURNEY — 热线上海 / Hotline Shanghai

> 本文是《热线上海》的"制作旅程复盘"：一份可评审的单一真相源。它回答三个问题——**这个游戏是怎么被造出来的**（逻辑脉络）、**现在做到了什么程度**（特性清单 + 状态）、**接下来该做什么/不该做什么**（行动项）。它把 `GDD.md`（设计权威）、`TDD.md`（冻结契约）、`BUGS.md`（bug 与验证证据）以及五层代码子系统（simulation-core / data-tables / world-authority / engine-render / app-ui）串成一条从"为什么"到"哪一行代码"的完整线索，供人审和后续 agent 复用。

---

## 1. 概念 Concept

### 1.1 是什么 What it IS

**一句话**：Hotline Miami 手感 + 1937 上海孤岛抗战背景 + 真 2D Radiance Cascades 实时光影 —— 枪火 / 霓虹 / 油灯 / 爆炸都是真实软阴影光源，不是 fake additive。

逐层拆解：

- **游戏类型**：顶视角（top-down）动作射击 / 任务式 / 一击必杀 / 复古像素。张力轴不是"打不打得过"，而是"每开一枪之后，世界会怎么亮起来、你被谁看见"（GDD §1）。
- **题材**：1937 淞沪会战爆发 → 11 月中国军队撤离 → 法租界/华界进入"孤岛期"（1937.11–1941.12）。玩家是地下抵抗组织的无名"线人"，靠一条电话接指令。与《血战上海滩》同源题材，但视角是顶视角像素暗战，不是第一人称光枪正面战场。
- **核心机制（v3 关键转向）**："**光 = 警觉开关**"——灯亮敌人警觉（看见即 0.4s 电报 → 敌弹 OHK），灯灭敌人半盲（视锥 ×`DARK_VISION_MULT`）可近身安静击杀，亮处击杀刷增援。（2026-08-15 推翻旧"光下无敌/暗中可杀"护甲；实现为全局 `lamp.invalidated` 布尔判定——灯破则全员半盲。）权威规范见 GDD §12。
- **独特性**：真 2D Radiance Cascades（RC）全管线，按 `radiance-cascades-demo`（C++/Raylib）真实算法移植到 WebGL2——prepscene → prepjfa → JFA → distfield → cascade ×N → final，probe 数学 / JFA / cascade merging 全部照 demo 原式，不是单 pass additive。
- **架构 C.A.T**：`core/` 平台纯净（零 THREE / 零 DOM / 零 zustand），`engine/` 平台适配层（WebGL2 / Canvas2D / WebAudio / localStorage），`components/` + `store.ts` 是 React UI 覆盖层。这是沿用 4_chunbai / 5_gamejam_1 / 6_patapong3D 验证过的分层。

**当前可玩范围（v3.7 重冻结，2026-08-10）**：一个连接式哨塔大院 `m1_tower_compound`（单房间）：3 名地面巡逻 + 1 名全状态位置固定的哨塔守卫；可拆油灯（tile (4,3)）是探照灯电源，断电后中和塔守；玩家具 C96 射击、R 掷枪、RMB knife、E 拾取/交换；拆电 → 清敌 → 东南撤离 → score/replay 形成完整闭环。0 面具 / 0 任务选择 UI。

### 1.2 不是什么 What it is NOT

明确划清边界，防止范围漂移：

| 不是 | 说明 | 依据 |
|------|------|------|
| **不是 3D / 真阴影** | 无 Z 轴透视、无 3D 模型、无 Bloom；RC 输出是 2D 后处理光场 | GDD §7 禁止清单 |
| **不是 fake light** | 灯光不是加法光斑贴图；RC 是真实 WebGL2 全管线（B28 曾因"假辉光自激放大成灯箱"而重构） | TDD §15 |
| **不是 Roguelike / 永久死亡** | 死亡清空武器/弹药/面具/击杀数，从任务 Room 1 重开（HM"死了全掉光"范式） | GDD §4.2 / B14 |
| **不是 72h jam** | 4 周单人非 jam 排期；v2 曾"范围超卖 3-5×"被 B33 重置裁决砍回 | GDD §0.5 |
| **不是多任务游戏（现在）** | 只有 `MISSIONS[0]`（intro 单任务）；任务选择 / 面具选择 UI 后置 M2+ | data-tables notDone |
| **不是数值堆砌** | 8 武器 / 6 面具每件必须有手感或玩法差异，禁止纯数值换皮 | GDD §4.3/4.4 |
| **不是特定族群刻板** | 敌对 NPC 按**职能**命名（占领军/伪警/特务/帮派），不写负面族群刻板；美术前先文字评审 + Mavis 签核 | GDD §2.4 |
| **不是 RC 决定玩法** | RC 是 visual-only；几何 LOS + `lamp.invalidated` 布尔独占 gameplay authority（光=警觉开关由核心判定，不从 RC 像素反推；`LightFieldCache` 是冻结但未接线模块，仅 `dev/phasePreview.ts` 消费） | AGENTS §关键约束 3 |

---

## 2. 核心特性清单 Core Feature List

评审用清单。每项 = 特性名 + 一句话 + 状态。状态标记：**✅ 已实现** / **🟡 部分** / **⛔ 未做**。

| # | 特性 | 说明 | 状态 |
|---|------|------|------|
| 1 | **一击必杀 OHK** | 玩家对敌人一击毙命（melee/子弹/投掷）；敌弹：0.4s 瞄准电报（`ENEMY_AIM_TELEGRAPH_S`）→ 子弹（`ENEMY_BULLET_SPEED=24`）→ 命中即 OHK，可闪避/移动躲 | ✅（玩家 OHK ✅，敌回击 ✅） |
| 2 | **光=警觉开关（非护甲）** | 灯亮→敌人警觉（看见即 0.4s 电报→敌弹）；灯灭→敌人半盲（视锥 ×`DARK_VISION_MULT`），可近身安静击杀；亮处击杀→`triggerAlarm` 刷增援；塔守失明由 `destroyTowerPower` 门控 | ✅（`Simulation.ts`） |
| 3 | **拆灯闭环** | 油灯 HP 2→1→0 两次独立 LMB；灯碎 → `invalidateLight` → 0.1s 灯池坍缩 → 敌转可杀；事件 `lightSmash`×2 + `invalidateLight`×1 | ✅（B40） |
| 4 | **真 2D RC 全管线** | 6 阶段（prepscene/prepjfa/JFA/distfield/cascade/final）；生产 profile = 3 cascades / `baseIntervalPx=6` / half-res / `twoLoop=true`（dither 配置启用但生产帧 `ditherEnabled:false` 关闭） | ✅（`RcPipeline.ts`，B55-B65 打磨） |
| 5 | **RC 与玩法正交** | RC 只负责视觉明暗；光下判定在 core `lamp.invalidated` 布尔 + LOS（`LightFieldCache` 未接线） | ✅（架构决策） |
| 6 | **敌人巡逻 FSM** | patrol → suspicious → alert，带警告窗口（`DETECTION_WARNING_S`）；tower_guard 全状态位置固定 | ✅（Simulation 内联简化版） |
| 7 | **哨塔守卫（tower_guard）** | 静态哨塔 + 探照灯光束；破电源灯后转 suspicious（但不平移），光束熄灭 | ✅（B51/B67） |
| 8 | **武器切换 / 投掷** | F 切换近战/远程（0s 硬直）、R 投掷当前武器（可捡回）、E 拾取/交换 | ✅（B66 接线） |
| 9 | **子弹弹道 + 曳光** | 0.25u 子步进防穿墙；速度方向曳光线；命中墙/敌/灯三路分支 | ✅（B66/B68） |
| 10 | **枪口闪光 / RC 瞬时灯** | muzzle_flash 为 0.08s 短寿命 RC 光；锚点 = 视觉中心 + 0.6u 朝向 | ✅（B66 修正） |
| 11 | **噪声/视觉侦测** | 枪声/脚步声/砸灯/落地/呼喊 5 类噪声；`inFlashlightCone`（距离+锥角+视线）判定 | ✅（Simulation `emitNoise`） |
| 12 | **房间推进 / 撤离** | 清空守卫 + 走到撤离点 → 过关；封锁态显示"剩 N 名守卫" | ✅（B03/B67） |
| 13 | **评分 / 重开** | `total = 100 - elapsed*0.5`，S/A/B/C 评级；死亡重开 / 再玩一次 | ✅（`finishMission`） |
| 14 | **程序化音效** | 18 条 WebAudio 合成配方，6 声部优先级抢占，零音频文件 | ✅（`sfx.ts` / `AudioManager.ts`） |
| 15 | **程序化像素 sprite** | 16×16 像素角色 + 8 方向步行动画（`strideFrame`/`lungeFrame` 派生）；intro 精选 PNG 例外 | ✅（`PixelRenderer.ts` / intro-manifest） |
| 16 | **C.A.T 分层** | `core/` 零 THREE/DOM/zustand（28 文件）；`engine/` 适配 | ✅（架构决策） |
| 17 | **DEV 可观测性** | `__gameManifest()` 世界即文本 / `__sim` / `__simEvents` / `__rcPipeline` / `__rcPresenterPlanes` / `__rcFreezeFrames` | ✅（`devtools.ts`） |
| 18 | **持久化** | localStorage 3 键（stats/settings/unlocks），静默失败回退 | ✅（`storage.ts`） |
| 19 | **8 武器 / 6 面具 / 5 敌人数据** | 数据表冻结（8 武器、6 面具、5 archetype、8 RC 光种；+3 v3 原创面具仅设计未入码） | 🟡（数据在，intro 只 ship 部分） |
| 20 | **面具效果系统** | 6 种 `MaskEffect` → `MaskModifiers` | ⛔（`masks.ts` 未接 Simulation） |
| 21 | **敌人回击（enemyFire）** | 敌人开火杀玩家 | ⛔（Simulation 只靠警告窗口杀人，`enemyFire`/`enemyAttack` 从不产生） |
| 22 | **多任务 / 任务选择 UI** | `m2_teahouse`/`m3_print`/`m4_postman` | ⛔（仅 `MISSIONS[0]`） |
| 23 | **手雷 / 爆炸 AoE** | grenade `explosionRadius` 有数据无行为 | ⛔（`snapshot` 硬编码 `grenades: []`） |
| 24 | **BOSS（3 击）** | `finalBossId` 空，boss archetype 未 spawn | ⛔（`missionBossEnemyId` 未用） |
| 25 | **暂停 / 死亡计时器** | `pauseAndDeath.ts` 未接线；snapshot `paused:false` 硬编码 | ⛔ |

---

## 3. 逻辑脉络 Logic Thread

### 3.1 主干 Trunk

主循环是一个固定步长的 `Simulation.step` 主干环，引擎与 UI 都只是它的适配器与投影。

```
                     [键盘/鼠标]  [鼠标 aim]
                          │           │
                          ▼           ▼
              engine/InputManager.ts (WASD/Shift/R/LMB/RMB/E/F)
                          │   sim.input(PlayerInput)
                          ▼
   ┌────────────────────────────────────────────────────────────┐
   │  core/simulation/Simulation.ts  — 唯一协调器(实现 ISimulation) │
   │  GamePhase: TITLE → MISSION_PLAY → MISSION_DEATH → SCORE      │
   │                                                              │
   │  step(FIXED_DT=1/60):                                        │
   │   ├─ elapsed / graceRemaining 倒数                           │
   │   ├─ movePlayer(0.34 半径, 5 点角采样拒绝)                     │
   │   ├─ 冲刺脚步噪声(FOOTSTEP_INTERVAL_S 节流)                    │
   │   ├─ 撤离判定(全敌死 && 近 exitTile → loadRoom+1 / finish)     │
   │   ├─ melee TTL 衰减 / fire 冷却                                │
   │   ├─ 子弹 0.25u 子步进解析(墙/敌视觉中心+0.5/灯 lightSources[0]) │
   │   ├─ 投掷物解析 + 落地(clatter)                                │
   │   ├─ 噪声 TTL 衰减 / activeLight TTL 衰减                       │
   │   ├─ 每敌人 patrol→suspicious→alert FSM                        │
   │   └─ 单持有者警告窗口 / invalidationTimer 坍缩                  │
   │                                                              │
   │  snapshot() → SimSnapshot (player/enemies/bullets/…/lights)  │
   │  emit SimEvent[] (recentEvents 环, 上限 64)                   │
   └────────────────────────────────────────────────────────────┘
                          │ snapshot + events
                          ▼
   ┌────────────────────────────────────────────────────────────┐
   │  engine/GameEngine.ts — 固定步主循环 (rAF)                     │
   │  while(accumulator>=FIXED_DT) { input.update(); sim.step() }  │
   │   ├─ consumeEvents() → scene.handle(e) + playEvent(e→SFX)     │
   │   ├─ SceneManager.render(snap) — Canvas2D 基底场景             │
   │   ├─ RcPresenter.render(snap, shake) — 3 planes(场景/遮挡/发射) │
   │   ├─ RcPipeline.renderFrame() — 6 GL 阶段 → blitToScreen      │
   │   ├─ audio.update() / rc.update()                             │
   │   └─ store.sync(snap) 每 2 帧 1 次 → React 覆盖层               │
   └────────────────────────────────────────────────────────────┘
                          │
                          ▼
        store.ts (zustand) → App.tsx renderOverlay(phase)
        HUD / DeathScreen / ScoreOverlay / MainMenu / MaskSelect
```

**分步说明**：

1. **输入归一化**（`engine/InputManager.ts`）：`WASD` 移动（Shift 冲刺）、鼠标 aim、LMB `fireStart`、RMB `attackStart`、R `throwStart`、E `interactStart`、F `toggleMode`，全部转成 `PlayerInput` 判别联合塞进 `sim.input()`。UI 命令（startGame/retry/quit…）走另一条桥（`setUiBridge` + CustomEvent），永不直接触 Simulation。
2. **模拟权威**（`core/simulation/Simulation.ts`）：唯一可变状态持有者。`step()` 只在 `phase === MISSION_PLAY` 时推进，`start()` 用 `makePlayer` + `loadRoom(0)` 重置。
3. **快照投影**（`snapshot()`）：模拟态 → 纯数据 `SimSnapshot`，引擎与 UI 只读它。核心规则"光=警觉"落在 `isAmbientDark()`（灯被拆→半盲）与 `hasTowerPower`（塔电源→塔守失明）两个布尔判定上。
4. **渲染双平面**（`SceneManager` + `RcPresenter`/`RcPipeline`）：Canvas2D 画基底（地板/墙/敌人/玩家/曳光/噪声环/粒子），RcPresenter 把基底抓成 `sceneColor` 平面、外加二进制 `occlusion` 平面与 `emission` 光种子平面，交给 WebGL2 RC 管线合成，最后 `blitToScreen` 压暗基底。
5. **UI 同步**（`store.ts`）：每 2 帧 `sync(snapshot)` 写 zustand，`App.tsx` 按 `GamePhase` 渲染单一覆盖层组件。

### 3.2 分支 Branches

主要分叉子系统，每个 = 触发条件 + 流程。

#### (a) 战斗三路（melee / bullet / throw）— 共享击杀记账

- **触发**：`attack()`（RMB 近战）、`fire()`（LMB 远程）、`throwWeapon()`（R 投掷）。
- **流程**：三路各自产实体（`MeleeSwing` / `Bullet[]` / `ThrownWeapon[]`），但击杀统一走 `damageEnemy + kills++ + clearWarningIfOwner + enemyKilled`，无光甲。**关键差异**：亮处击杀（`!isAmbientDark()`）追加 `triggerAlarm()` 刷增援；暗处安静击杀不触发（B66 后子弹两发即可拆灯，命中半径 `LAMP_BULLET_HIT_RADIUS=0.75`）。
- **文件**：`core/simulation/damage.ts`（`lightSmash` 状态机 intact/damaged/dead）、`Simulation.ts`。

#### (b) 光暗潜行（光=警觉开关，非护甲）

- **触发**：`isAmbientDark()` = 油灯 `state === 'dead' || invalidated`。当前实现是**全局**判定，不是逐敌 `lightAt(enemy)` 采样——灯破后全员半盲。
- **流程**：灯亮 → 敌人警觉，`inFlashlightCone` 正常（看见即 0.4s 电报 → `enemyFire()` 敌弹）；破灯 `lightSmash`（melee 或子弹）→ `invalidationTimer = LIGHT_POOL_DOWN_S`（0.1s）→ `invalidateLight` + `destroyTowerPower`（探照灯全灭、tower_guard 失明）→ 敌人半盲（视锥 ×`DARK_VISION_MULT`），可近身安静击杀。
- **决策**：几何 LOS + `isAmbientDark()` 布尔是 authority，RC 只做视觉（`LightFieldCache` 未接线）。`lightSources[0]` 被冻结为唯一可拆灯，N/S neon/searchlight 是 `hp:Infinity` 不可拆 decoy，保证灯破后 RC 仍有光源（霓虹随拆灯压暗）。

#### (c) 死亡重启

- **触发**：玩家 `hp<=0`（被警告窗口 `killPlayer()` 击杀，或未来敌弹）。
- **流程**：`phase → MISSION_DEATH` → 1.2s（`DEATH_RESPAWN_DELAY`）→ 重开。注意：`playerDeath.ts` 的 `respawnPlayer`（清武器/弹药/面具/击杀数）当前**未接线**，`killPlayer` 只设 hp=0 + phase；死亡清空装备是 B14 定稿的设计意图，待 M2 重建落实。

#### (d) RC 渲染 6 阶段

- **触发**：每帧 `RcPresenter.render(snap, shake)` → `RcPipeline.renderFrame()`。
- **流程**：`renderPrepscene`（遮挡+发射种子）→ `renderJfa`（ping-pong 跳洪）→ `renderDistfield`（SDF）→ `renderCascades`（直射 twoLoop → 间接）→ `renderFinal`（base+radiance+dither；生产 `RcPresenter` 每帧传 `ditherEnabled:false`，实际无 dither）→ `blitToScreen`。返回 `RcStageTimings`。
- **降级链**：`RC_CASCADE_REDUCE` → `RC_HALF_RES` → `RC_GI_SINGLE_PASS` → `RC_OFF`（回退纯 Canvas2D base color）。WebGL2 失败/context lost 时 `disableRc()` 隐藏 RC canvas、`source.opacity=1`。

#### (e) 音频合成

- **触发**：`GameEngine.playEvent(e)` 把 `SimEvent` kind 映射到 SFX 配方（`lightSmash→explosion/thud_hit`、`melee→melee_swing`、`fire→fire_pistol`…）。
- **流程**：`AudioManager.playSfx()` 懒建 AudioContext → 6 声部优先级抢占 → `scheduleRecipe()` 调度 oscillator+noise 走 ADSR → `update()` 剪掉结束声部。

#### (f) UI 覆盖层

- **触发**：`store.sync(snap)` 每 2 帧 + `App.tsx` 全局 keydown（Esc → quitToTitle）。
- **流程**：`renderOverlay(phase)` switch → MainMenu / MissionSelect / LoadingOverlay / PlayOverlay(+HUD) / DeathScreen / ScoreOverlay / MaskSelect。UI 是纯视图：只读 store、只发 `UiCommand`。

### 3.3 树叶 Leaves

叶子级细节，按模块分组。

#### 3.3.1 模拟核心 `core/simulation/Simulation.ts`

| 类型/函数 | 说明 |
|---|---|
| `makePlayer()` | 初始玩家：hp=1、weapon `mauser_c96`、ammo `INTRO_START_AMMO`、mode `ranged`、knife 为 ∞ 近战 fallback |
| `loadRoom(index)` | 重建房间 + `buildTileMap` + 玩家出生 + 敌人 + patrolLanes + 光源 + activeLights，重置 grace/warning/bullets/noises |
| `step(dt)` | 主 tick，gate 在 `phase===MISSION_PLAY` |
| `input(action)` | move/aim/quitToTitle/attackStart→attack/fireStart→fire/throwStart→throwWeapon/interactStart→tryPickup/toggleMode→togglePlayerMode |
| `buildLightSources(room)` | tokenizeRoom 光瓦片：`lamp` unshift 到 index 0，`neon_sign`/`searchlight` push |
| `movePlayer(dt,vx,vy)` | 轴分离 + 5 点角采样拒绝，半径 0.34 |
| `inFlashlightCone` | 距离 + `FLASHLIGHT_CONE_ARC_DEG` 锥角 + `hasLineOfSight` 视线 |
| `emitNoise` | 双角色：视觉噪声环 TTL 衰减 + 即时 tick-0 听觉判定（仅 patrol，半径 + 声音 LOS） |
| `finishMission()` | `missionScore.total = 100 - elapsed*0.5` → phase SCORE |

**未接线的 legacy 纯模块**（关键认知点）：`enemyAI.ts`（完整 FSM）、`collision.ts`（`moveCircleWithTiles`）、`player.ts`（`updatePlayerMove`）、`playerDeath.ts`（`respawnPlayer`）、`mission.ts`（加权评分公式）、`pauseAndDeath.ts`、`events.ts`（EventQueue）、`masks.ts` —— Simulation 内联了各自的简化版，这些是"冻结契约但尚未 wired"的历史模块。

#### 3.3.2 数据表 `core/data/*.ts`

| 文件 | 关键内容 |
|---|---|
| `weapons.ts` | `WEAPON_TABLE`：knife/bat（melee）、mauser_c96/boxer/thompson/mosin（ranged）、grenade/throwing_knife（throw） |
| `enemies.ts` | `ENEMY_ARCHETYPES` + `createEnemy(archetype,id,pos)` 工厂；5 archetype：soldier/policeman/spy/flashlight_patrol/boss |
| `lights.ts` | `RC_LIGHT_TABLE` 8 种：muzzle_flash/explosion/oil_lamp/neon_sign/searchlight/surgical/disco/blood_splash |
| `masks.ts` | `MASK_TABLE` 6 种（actor/runner/righteous/dancer/waiter/officer）+ themeColor |
| `missions.ts` | `MISSIONS[0]` = `m1_workshop`（`m1_tower_compound`：18×12，4 enemySpawns，exitTile {15,10}） |
| `palette.ts` | 12 色 `PAL_*` 重导出（颜色唯一真相源在 `constants.ts`） |
| `sfx.ts` | `SFX_RECIPE_TABLE` 18 条合成配方（零文件） |

#### 3.3.3 世界权威 `core/world/*` + 契约 `core/{types,constants,math}.ts`

| 类型/函数 | 说明 |
|---|---|
| `RoomLayout` | 房间源码真相（width/height/tiles/playerSpawn/enemySpawns/exitTile + 可选 floorPalette/wallPattern/furniture） |
| `tokenizeRoom` | ASCII → `TokenizedRoom`，容错（非法字符→地板 `.`） |
| `buildTileMap` | 只读查询：`tileAt`（越界=`#`）、`blocksBullet`、`isSolid`、`neighbors4/8` |
| `hasLineOfSight` | Amanatides & Woo 网格 DDA；`vision`（`#`+`X` 挡）vs `sound`（仅 `#` 挡） |
| `LightFieldCache` | 冻结但未接线：`sampleAt` 双线性、`isShielded(>0.30)` / `isExposed(>0.10)`；仅 `dev/phasePreview.ts` 消费，Simulation 未 import |
| `worldToTile`/`tileToWorld` | floor / 中心 +0.5；tileSize<=0 回退 1 |
| `GamePhase` | 10 相枚举（TITLE/BRIEF/MISSION_SELECT/MISSION_LOADING/MISSION_BRIEF_IN/MISSION_PLAY/MISSION_DEATH/MISSION_END/SCORE/MASK_SELECT）；Simulation 实际驱动 TITLE→PLAY→DEATH→SCORE |
| `PlayerInput` / `SimEvent` | 判别联合（输入 14 种 / 事件 23 种） |
| 常量 | `PLAYER_SPEED_MAX=8`、`PLAYER_ACCEL=60`、`BREAKABLE_LIGHT_HP=2`、`LIGHT_POOL_DOWN_S=0.1`、`DARK_VISION_MULT=0.5`、`ENEMY_AIM_TELEGRAPH_S=0.4`、`FIXED_DT=1/60`、`RC_*` 等（`LIGHT_SHIELD_THRESHOLD`/`ENEMY_INVULN_WHILE_LIT` 已于 2026-08-15 废弃） |

#### 3.3.4 引擎渲染 `engine/*`

| 类型/函数 | 说明 |
|---|---|
| `GameEngine.loop` | 固定步累加；`FIXED_DT*MAX_FRAME_ACCUM` 上限；每 `STORE_SYNC_INTERVAL` 帧 sync |
| `SceneManager.render(s,dt)` | Canvas2D 基底：地板/墙/沙袋/霓虹/出口/哨塔/手电锥/敌人/玩家/枪口/曳光/近战楔形/噪声环/粒子/vignette |
| `RcPresenter.render` | `buildPlanes(snapshot, shake)` → 3 ImageData 平面 → `RcPipeline.renderFrame` |
| `RcPipeline.renderFrame` | 6 GL 阶段；`saveGlState/restoreGlState` 隔离 Three 渲染器 |
| `visualCenter(pos)=pos+0.5` | 唯一坐标对账；子弹/枪口已是视觉中心，渲染不得再 +0.5（B66/B68 教训） |
| `InputManager` | 键鼠 → `PlayerInput`；`!e.repeat` 防重 |
| `AudioManager` | `MAX_VOICES=6`；ADSR；oscillator+noise 合成 |
| `storage` | `hotline-shanghai.v1.*` 3 键；type guard 静默失败 |
| `devtools` | `__gameManifest`/`__sim`/`__simEvents`/`__rcPipeline` 等，`import.meta.env.DEV` 守卫 |

#### 3.3.5 应用 UI `src/*` + `components/*`

| 类型/函数 | 说明 |
|---|---|
| `useUiStore` | 单一 zustand store；`sync(snap)` 是唯一写路径 |
| `sendUiCommand` | 桥 + CustomEvent + 上限 32 队列（防双投递） |
| `App.tsx` | 挂 `#game-canvas` → `new Simulation()` + `new GameEngine()`；`renderOverlay(phase)` |
| `HUD.tsx` | 弹药/武器/模式/灯 HP 段/击杀数/宽限与警告覆盖层 |
| `DeathScreen.tsx` | `CAUSE_COPY`（bullet/melee/grenade/unknown → 中文） |
| `ScoreOverlay.tsx` | S/A/B/C → flash/jade/paper/rust 配色 |

---

## 4. 行动项 Action Items

### 4.1 做什么 What we DO

已实现项，及各自产出的东西：

1. **拆灯闭环端到端**：两次独立 LMB → `lightSmash`×2 + `invalidateLight`×1 → 灯池 0.1s 坍缩 → 敌转可杀（B40/B41）。产出：`npm run light-break:check` + `combat-loop:check` 门。
2. **真键鼠 self-play gate**：`scripts/self-play.spec.js` + `npm run self-play:check`，真实 keydown/keyup 走位 + 真实鼠标 aim + RMB 拆灯（池亮度 160→44）+ 走出口 SCORE（B62）。产出：3/3 验证，闭合输入链路。
3. **RC 算法本体在 rc-lab 隔离跑对**：`rc-lab/` 独立 WebGL2 测试台，7 确定性场景 + 数据驱动断言，改算法先 rc-lab 全绿再动游戏（B33 教训）。产出：`npm run rc-lab:check`，RC_LAB+PORT 37/37。
4. **RC 视觉打磨四轮**：B55（种子采样尺度）→ B56（final 采样锚点）→ B57（种子盘尺寸）→ B63（v3.10 圆滑化）→ B64（v3.11 max 环境光地板 + 两层复合盘）→ B65（色相保持软膝防过曝）。产出：灯亮/灭 delta 50、质心偏移 +2px、径向剖面单调无环。
5. **关卡重排（B66）**：电源油灯从 (11,4) 移到 (4,3)（(8,2) 墙阻断塔楼视线），近卫巡逻移 (4,4)（受光护甲教学），小刀移 (2,9)（出生点旁）；加子弹对灯碰撞 + 曳光 + E 拾取/交换。产出：self-play 3/3、e2e 4/4、rc-lab 37+37。
6. **C.A.T 平台纯净强制**：`core/` 28 文件零 THREE/DOM/zustand，helpers 纯函数/query-only。产出：Simulation 单协调器可被引擎无副作用驱动。
7. **程序化资产 + intro 精选 PNG 窄例外**：SHA-256 校验 manifest + `scripts/process-intro-sprites.mjs` 确定性处理，输出仅 `public/sprites/intro/` + `intro-manifest.ts`。产出：`npm run intro-polish:check`。

### 4.2 不做什么 What we do NOT do

砍掉的范围、设计"禁止"清单、后置里程碑：

| 项 | 决定 | 后置 |
|----|------|------|
| **F 切换硬直** | 0s 瞬时（节奏靠音效不靠硬直） | v3 V5 定稿 |
| **M2/m3 任务（夜航船/墨水账）** | 已砍，素材可并入任务 1/4 或 DLC | GDD v3 V4 |
| **S/A/B/C 评分 → M1 通过/失败** | 砍，后置 M2+ | v3 V9 |
| **面具选择流程** | intro 不 ship MaskSelect；6 面具数据冻结但 0 上线（+3 v3 原创面具未入码） | M2+ |
| **敌人回击（enemyFire/enemyAttack）** | Simulation 不产生，只靠警告窗口杀玩家 | 后置 |
| **手雷/爆炸 AoE、BOSS** | 数据在，行为不在 | M2+ |
| **RC gi.frag 单 pass** | `待移植`，仅用 cascadeCount=1 近似降级 | 后置 |
| **游戏手柄/触摸输入** | 键鼠 only | 后置 |
| **扩展 PNG manifest / 增加 RC cascade** | 明确禁止；B42/B44 非阻塞 polish 不授权扩展 | — |
| **历史族群刻板** | 按职能命名；美术前文字评审 + Mavis 签核（V8 敏感度人审门） | — |
| **纯数值换皮武器/面具** | 每件必须有手感/玩法差异 | GDD §4.3/4.4 |
| **3D 透视/真阴影/粒子叠加/外部资源/多字体** | 艺术方向禁止清单 | GDD §7 |

### 4.3 分别什么结果 Respective Results

每项关键决策/行动 → 结果，引 BUGS.md 的 B 编号与 verification 证据。

| 决策/行动 | 结果 | 证据 |
|-----------|------|------|
| **出生宽限 1.0s** | 消除"出生即死"（B01） | `ROOM_START_GRACE_S=1.0`；`M1-smoke-01` 对比图 |
| **碰撞/视线/子弹接入 tileMap** | 消除穿墙/隔墙射（B02） | `collision.ts` + `FURNITURE_SOLID` |
| **走门切房（EXIT_REACH_RADIUS=1.2）** | 清房不再自动推进（B03） | e2e playtest |
| **输入静默丢失修复** | 玩家能动（B22） | 改方法调用，`sim.input` 不再裸解引用 |
| **投掷物原地捡回修复** | 投掷落地成实体（B23） | `THROWN_PICKUP_DELAY_S=0.5` |
| **去伪光 + 装饰灯进真 RC** | 过曝消失、lightCount 对齐（B24/B27/B28） | RC 全关亮度 5 → 开光 48 |
| **blindside 光暗机制采纳** | 光下无敌/暗中可杀成核心（B29）；**2026-08-15 修正为"光=警觉开关"** | `09-blindside-integration.md` 全量落地 |
| **v3 重置（B33）** | 关卡/场景/移动归档 `_archive-2026-08-09/`，退回标题壳 | 设计判决非代码事故（GDD §0.5） |
| **BLINDSIDE 整合入档** | 光盾阈值/拆灯/巡逻手电/面具 6 冻结在码（铺 9 仅设计）/RC lightField 联动（B34-B39） | TDD §4.6/§15.3 冻结 |
| **拆灯闭环 P4/P5** | 两次 LMB 事件序列正确、完整玩法闭环（B40/B41） | `light-break:check` + `combat-loop:check` |
| **塔守全 FSM 位置锚定** | 破灯后塔守不平移（B51） | combat-loop ×5 |
| **塔楼光束可视化强化** | 光束对比 ~11×，不再"boring"（B67） | 光束像素探针 src [42,39,39] vs 背景 [6,5,10] |
| **撤离反馈** | 封锁态显示"剩 N 名守卫"（B67） | e2e 截图 |
| **RC 种子采样尺度修复** | 灯种不再落空（B55） | prepscene `uResolution`；rc-lab PORT 35/35 |
| **final.frag 采样锚点修复** | 光池对位（B56） | 块角点 texel 坐标；S1 mid 探针 172px |
| **v3.10 RC 圆滑化** | 无星形臂/孔洞（B63） | 质心偏移 -14px→+2px |
| **v3.11 max 环境光 + 复合盘** | 消暗环/盘缘台阶（B64） | rc-lab 37/37；灯亮/灭 delta 50 |
| **色相保持软膝** | 油灯/探照灯不再过曝成白斑（B65） | 塔 255→214,210,240；灯 255→245,185,85 |
| **关卡重排 + 曳光 + 子弹拆灯 + E 拾取** | 六问题全修，关卡成立（B66） | self-play 3/3、e2e 4/4、rc-lab 37+37 |
| **RC 抖动跟随** | 打灯/杀敌 0.12s 抖动内光池不脱开（B60） | emission/occlusion 按含抖动原点绘制 |
| **win32 门脚本引号包裹** | intro-polish 门在 Windows 可跑（B58） | `npm run intro-polish:check` PASS |

**当前最终验证门（复跑即可复核）**：`npm run typecheck`（`tsc -b`）→ `npm run build` → `npm run rc-lab:check`（37+37）→ `npm run rc-fix:check`（5/5）→ `npm run light-break:check` → `npm run combat-loop:check` → `npm run intro-polish:check` → `npm run e2e:playtest`（4/4）→ `npm run self-play:check`（3/3）。最终截图见 `smoke/hotline-e2e-{intact,broken,detection-death,retry,score-replay}.png`。
