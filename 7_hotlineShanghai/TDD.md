# Hotline Shanghai / 热线上海 — Technical Design Document (TDD) v4

> **v4 = contract-from-code（2026-08-30 重推）**:本文不再是"写在代码前面的预言",而是从当前**已验证代码 + 门禁结果**反向提炼的契约。每一个类型、常量、状态名、数值都带 `文件:行号` 锚点,可逐条对照 `src/` 复核。
> **真相优先级**:已验证代码(附 e2e 证据) > 本文 > 其他文档。发现本文与代码不符 = 本文 bug,按 [`GAME-SOP.md`](GAME-SOP.md) §7 S3 登记。
> **版本声明**:v4(唯一声明处 = 本头部 + `AGENTS.md` 头部)。v2 全文存档 `old/TDD-v2-frozen.md`。
> **变更规则**:改本文任何 §2-§6 条目 = `[TDD-CONTRACT-CHANGE]`(流程见 [`docs/design/11-contract-change-procedure.md`](docs/design/11-contract-change-procedure.md)),类型/常量与本文同步改动,同一 PR。

---

## §0 真相源与验证基线

- **代码**:63 文件(`src/`),tsc strict 0 error,`npm run build` 绿(79 modules,2026-08-30 复跑)。
- **门禁基线**(`package.json:8-26` 定义,完整链见 `JOURNEY.md:303`):`typecheck` → `build` → `rc-lab:check`(37+37)→ `light-break:check` → `combat-loop:check` → `intro-polish:check` → `e2e:playtest`(6/6,M2.2 起含 mask + m2 测试)→ `self-play:check`(3/3)。
- **架构**:C.A.T。`core/` 零 THREE/DOM/zustand(`docs/design/10-architecture-cat.md`);`engine/` 平台适配;`store.ts`+`components/` React 覆盖层。

## §1 分层与文件地图(实际存在,非规划)

| 层 | 文件 | 职责锚点 |
|----|------|---------|
| core 类型 | `src/core/types.ts`(396 行) | §2 全部契约类型 |
| core 常量 | `src/core/constants.ts`(213 行) | §3 全部冻结数值 |
| core 数据 | `src/core/data/{weapons,enemies,masks,lights,missions,palette,sfx,sprites}.ts` | §4 数据表 |
| core 世界 | `src/core/world/{tileMap,roomTokenizer,WorldManifest,lineOfSight,lightField}.ts` | tile 查询 / LOS / 冻结 LightField |
| core 模拟 | `src/core/simulation/Simulation.ts`(44.5kb 协调器)+ 11 个子系统 | §5 行为契约 |
| engine | `GameEngine / SceneManager(Canvas2D) / RcPresenter / RcPipeline(WebGL2) / InputManager / AudioManager / storage / devtools / sprites/` | §6 |
| UI | `store.ts` + `components/`(HUD/DeathScreen/ScoreOverlay/PauseOverlay/MainMenu/MaskSelect/MissionSelect/DevPanel) | 覆盖层,唯一写路径 `sync()` |

## §2 类型契约(锚点 `src/core/types.ts`)

| 契约 | 锚点 | 内容 |
|------|------|------|
| GamePhase | `types.ts:8-20` | TITLE / BRIEF / MISSION_SELECT / MISSION_LOADING / MISSION_BRIEF_IN / MISSION_PLAY / MISSION_DEATH / MISSION_END / SCORE / MASK_SELECT(10 相位,const 对象) |
| WeaponMode | `types.ts:23` | `'melee' \| 'ranged' \| 'throwing'` |
| WeaponId / WeaponSpec | `types.ts:28-55` | 8 ID 字面量;Spec 字段含 `damage/ammo/fireRate/reloadTime/range/spread/projectileSpeed?/explosionRadius?/silent?` |
| MaskId / MaskEffect | `types.ts:58-83` | 6 脸谱;8 种 effect kind 联合(新增 kind 走契约变更) |
| Player | `types.ts:87-104` | `hp:1`(一击必杀)、`weapon: WeaponId\|null`、`mode`、dodge/dash 计时器、`kills/hitsTaken` |
| EnemyArchetype / Enemy | `types.ts:106-126` | 5 archetype;`state: 'patrol'\|'suspicious'\|'alert'\|'engaging'`;`role: 'ground_patrol'\|'tower_guard'`;`awareness: 'none'\|'suspicious'\|'detected'` |
| Bullet / MeleeSwing / ThrownWeapon | `types.ts:128-165` | 弹道/挥击/投掷物实体(Grenade `types.ts:149-156` 数据在、行为未接线) |
| TileChar | `types.ts:168` | `.` 地板 / `#` 墙 / `D` 门 / `L` 油灯 / `N` 霓虹 / `S` 探照灯 / `X` 静态掩体 |
| RoomLayout / Mission | `types.ts:199-229` | 含 `floorPalette/wallPattern/furniture/decorativeLights/reinforcementSpawns?` |
| RcLightKind / RcLightSpec / LightSource / ActiveRcLight | `types.ts:244-287` | 8 灯种;`LightSourceState: 'intact'\|'damaged'\|'flickering'\|'dead'`;**`invalidated: boolean` 是光=警觉开关的核心字段** |
| SimEvent(24 种) | `types.ts:293-317` | 含 `playerKilled{cause}`(B12)、`lightSmash`、`invalidateLight`、`detectionWarning` |
| PlayerInput(15 种) | `types.ts:341-355` | v3.6 键位:LMB=`fireStart` / RMB=`attackStart`(灯优先) / R=`throwStart` / F=`toggleMode` / E=`interactStart` |
| NoiseStimulus | `types.ts:358-359` | 5 类噪声:gunshot / lamp_smash / footsteps / clatter / shout |
| ISimulation / SimSnapshot | `types.ts:362-396` | `step/input/snapshot/events`;snapshot 含 `objective: 'find_lamp'\|'break_lamp'\|'kill_enemy'\|'escape'` |
| M2.x 合同入口(M2.1-2.3) | `Simulation.ts` / `score.ts` | `beginRun()`(标题开局选择门)、`selectMission(id)`、`selectMask(maskId)`、`computeScore(input)`(纯函数,§3 评分行);`MissionScore` 增 `lampBonus?/pickupBonus?` |
| MissionId | `types.ts:338` | `'m1_workshop' \| 'm2_teahouse' \| 'm3_print' \| 'm4_postman'`(后 3 个 M2+) |
| DeathCause / Rating / Persisted* | `types.ts:291,232-241,320-336` | bullet/melee/grenade/unknown;S/A/B/C;stats/settings/unlocks 三键 |

## §3 常量契约(锚点 `src/core/constants.ts`;禁止代码内魔法数)

| 组 | 关键值 | 锚点 |
|----|--------|------|
| 玩家 | `PLAYER_SPEED_MAX=8` `PLAYER_RADIUS=0.5`;近战扇形 v3.2:`PLAYER_MELEE_FAN_ARC_DEG=100` `PLAYER_MELEE_TARGET_RADIUS=0.35`(触及=RANGE+0.35=2.1u) `PLAYER_MELEE_POINT_BLANK=0.9`;翻滚 `PLAYER_DODGE_INVULN=0.4` / `PLAYER_DODGE_SPEED=6` | `constants.ts:6-28` |
| 切换/投掷 | **`MODE_SWITCH_DURATION=0`**(v3 V5 瞬时)、`THROW_HOLD_DURATION=0.25`、`THROWN_PICKUP_DELAY_S=0.5`(B23) | `constants.ts:32-36` |
| 敌人 | 视野 8u/60°、听觉 4u、开火 14u、巡逻 3 警觉 5、反应 0.4s、射速 1.5/s、**`ENEMY_BULLET_SPEED=24`**(慢于玩家冲刺,可躲) | `constants.ts:52-63` |
| 光暗(v3.8 警觉开关) | `ENEMY_AIM_TELEGRAPH_S=0.4`、`DARK_VISION_MULT=0.5`(拆灯后视锥 5u→2.5u/50°→25°)、`BREAKABLE_LIGHT_HP=2`、`LIGHT_POOL_DOWN_S=0.1`、`REINFORCEMENT_WAVE_SIZE=2`/`CAP=10` | `constants.ts:66-93` |
| **已废弃(勿引用)** | `LIGHT_SHIELD_THRESHOLD` / `LIGHT_EXPOSED_THRESHOLD` / `ENEMY_INVULN_WHILE_LIT=true` — 光下无敌护甲 2026-08-15 删除,仅 frozen 模块引用 | `constants.ts:66-67,110` |
| 噪声(v3.6) | gunshot 8 / lamp_smash 6 / clatter 4 / shout 6 / footsteps 4;`INTRO_START_AMMO=6`(覆盖表值 10) | `constants.ts:95-102` |
| 命中/交互 | `BULLET_HIT_RADIUS=0.35`、`LAMP_BULLET_HIT_RADIUS=0.75`(B66 两发拆灯)、`PICKUP_RANGE=1.2` | `constants.ts:103-107` |
| 检测 | `DETECTION_MEMORY_S=0.25`、`DETECTION_WARNING_S=0.55`、`ROOM_START_GRACE_S=1.0`(B01)、`EXIT_REACH_RADIUS=1.2`(B03) | `constants.ts:108-121` |
| 评分 | S≥90 / A≥75 / B≥60 / C≥0;**M2.3 公式**:`total = clamp(0..100, 100 − elapsed×0.5 − hitsTaken×10 + 全拾取+5 + 全拆灯+10)`,纯函数 = `simulation/score.ts:22-35`(S 配方自洽:45s/0受击/全拾取/全拆灯 = 92.5→S) | `constants.ts:131-134` + `score.ts` |
| RC profile(生产冻结) | `RC_CASCADE_COUNT=3` `RC_BASE_INTERVAL_PX=6` `RC_JFA_RESOLUTION_SCALE=0.5` `RC_LIGHT_SCALE=2.0` `RC_AMBIENT_INTENSITY=0.03`(v3.11 地板语义,max 非 add) | `constants.ts:137-161` |
| 主循环 | `FIXED_DT=1/60` `MAX_FRAME_ACCUM=5` `STORE_SYNC_INTERVAL=2` | `constants.ts:168-170` |
| viewport | `VIEWPORT_W/H=32/18` `TILE_PIXELS=60`(注:v1.1 遗留,B11 后相机按房间适配) | `constants.ts:199-201` |

## §4 数据表(锚点 `src/core/data/`)

**WEAPON_TABLE 8 件**(`weapons.ts:4-107`):knife(近战 1.4u/5.0s⁻¹)· bat(2.0u/1.5s⁻¹)· mauser_c96(10 发/24u/60u/s)· boxer(20 发)· thompson(50 发)· mosin(5 发/64u/90u/s)· grenade(throw,`explosionRadius=4` **数据在、AoE 行为未接线**)· throwing_knife(`silent:true`)。

**ENEMY_ARCHETYPES 5 种**(`enemies.ts:50-140`):soldier 占领军(mosin)· policeman 巡捕(mauser)· spy 特务(elite,0.3s 反应)· flashlight_patrol 巡逻兵(视锥 50°/0.6Hz 扫掠,`fireDistance=0` 只 alert 不开火)· boss 头目(3 击,thompson)。`createEnemy()` `enemies.ts:143-165`。

**MASK_TABLE 6 脸谱**(`masks.ts:12-56`):red_face(+0.5 近战距离)· black_face(脚步静音)· white_face(敌感知 ×0.7)· blue_face(翻滚 CD ×0.5)· green_face(速度 ×1.2)· gold_face(增援 ×0.5)。**效果数据冻结;M2.1 起经 MASK_SELECT 流程进入 Simulation 消费(行为契约 §5.9)**。

**RC_LIGHT_TABLE 8 灯种**(`lights.ts`):muzzle_flash 1.4/4u · explosion 2.0/6u · oil_lamp 0.55/3.5u(**breakable hp=2**)· neon_sign 0.75/4.5u · searchlight 0.9/5u · surgical · disco · blood_splash。

**MISSIONS**(`missions.ts:8-123`):`m1_workshop`「只此一院」= `m1_tower_compound`(18×12,蓝图 = `docs/levels/m1_intro_scene.md`):玩家 (2,10)、3 地面巡逻 + 1 塔守 (13,1)、油灯 L (4,3)、knife (2,9)、撤离 D (15,10)、3 增援点;`m2_teahouse`「春申茶馆」= 同名房(M2.2 合入,蓝图 = `docs/levels/m2_teahouse.md`):账房隔断灯 L (4,3)、阁楼哨 (14,1)、**policeman 首次上场**(3 护院 + 1 哨)、撤离 D (15,10)、粉墙(`plaster_white`)+ 深木地板(`PAL_WOOD_DARK`)。评分阈值均 ratingS/A/B=90/75/60;`m3_print`/`m4_postman` 未合入。

## §5 行为契约(锚点 `src/core/simulation/`)

1. **光 = 警觉开关,非护甲**(v3.8 定稿):灯亮 → 看见即 0.4s 电报(`ENEMY_AIM_TELEGRAPH_S`)→ 敌弹 OHK;拆灯 → `LightSource.invalidated` + `DARK_VISION_MULT=0.5` 半盲,可近身安静击杀;**亮处击杀 → `triggerAlarm` 刷增援**(单波 2/上限 10)。判定只认几何 LOS(`world/lineOfSight.ts:12`,vision/sound 双模式)+ `invalidated` 布尔,**禁止从 RC 像素反推**。
2. **敌 FSM**:`patrol → suspicious → alert → engaging`(`enemyAI.ts:67/84/113/139`),带警告窗口;`tower_guard` 破灯后不平移(B51)。
3. **拆灯闭环**(B40/B66):近战或子弹(半径 0.75)两次命中 → `lightSmash`×2 + `invalidateLight` → 0.1s 光池坍缩。**近战无 RC 光**(B67:反馈 = 扇形楔形)。
4. **主循环**:`GameEngine.ts:56-59` 固定步累加(sim step + input.update / render / rc.render / audio.update / store.sync)。
5. **objective 流转**:`Simulation.ts:585` — `灯未死 → break_lamp;有活敌 → kill_enemy;否则 → escape`(find_lamp 为初始态)。
6. **死亡/评分**:OHK 双向;死亡清空武器/弹药/击杀数重开(v3 V6;**M2.2 修订:面具保留**,见 §5.9);**M2.3 评分公式**:`total = clamp(0..100, 100 − elapsed×0.5 − hitsTaken×10 + 全拾取+5(C7 全拆灯+10))`,纯函数 `simulation/score.ts`,`finishMission` 接线(`Simulation.ts:807-820`,pickupRate = 初始 weaponSpawns 已拾比例,全拆灯 = breakable 灯全 dead 空真);`MissionScore` 增 `lampBonus/pickupBonus` 可选字段(types.ts:241-242)。阈值评级(§3)。
7. **持久化**:`storage.ts:131-157` 3 键 `hotline-shanghai.v1.{stats,settings,unlocks}`,type guard 静默失败。**M2.2 起接线**:`GameEngine.recordCompletion` 在 `missionEnd` 写 stats/unlocks 并持久化,`start()` 水合(见 §5.10)。
8. **未接线清单**(数据在、行为不在,启用须走契约变更 + e2e 证据):grenade AoE(`explosionRadius=4` 无爆炸行为)、BOSS(`finalBossId` 空;**P0-16 裁定 2026-08-31**:启用前置 = `finalBossId` 填真实敌 id + BOSS 数值落地 + combat-loop 用例,届时 `missionBossEnemyId` 死导出已删除(2026-08-31)按新契约重建)、`pauseAndDeath.ts`(**P0-01 已接线 2026-08-31**:Tab → store.paused → GameEngine 跳过步进;snapshot `paused` 仍恒 false,属已知冗余字段)、`LightFieldCache`(`world/lightField.ts:22`,仅 `dev/phasePreview.ts` 消费)。注:`enemyFire`/`enemyAttack` **已接线**(`Simulation.ts:756-766` enemyFire + `:483` 电报到期触发,combat-loop 门覆盖,v4 初版误列,2026-08-30 修正;原引 `enemyAI.ts:150-155` 的文件 **P0-02 已删除 2026-08-31**——Simulation 内联 FSM 为唯一权威,该文件全文件零引用)。**未上场武器**:thompson(boxer 配发)/mosin(soldier 配发)/boxer/grenade 4 件随 archetype 落地上场(P1-14/15),knife/C96/掷枪掷出即用。
9. **开局选择流程(M2.1 面具接线 + M2.2 两段选择门,2026-08-30 `[TDD-CONTRACT-CHANGE]`)**:标题"开始游戏" → `GameEngine.startGame` 调 `beginRun()`(`GameEngine.ts:69-73`),`Simulation.beginRun`(`Simulation.ts:184-190`)= `start()` 全量重置后会话首次置 `phase=MISSION_SELECT`(`step()` 门禁 `:216` 世界冻结);`selectMission(id)`(`Simulation.ts:194-202`)切换实例 `mission`(M2.2 前为模块级常量)并全量重置,门态下选完进 `MASK_SELECT`;`selectMask(maskId|null)` 选完(含不勾)进 `MISSION_PLAY`。重开/`sim.start()` 复位直入 `MISSION_PLAY`;`quitToTitle` 清面具并重置选择门。面具 V6 死亡清空 → **M2.2 修订:保留**(start() 回写,`Simulation.ts:168-171`)。e2e 证据 = `hotline-e2e.spec.js` mask 测试(gold_face 增援波 2→1 + 重开保留)。6 种 effect 消费锚点:playerSpeedMult `Simulation.ts:240`、footstepNoiseMult `:252`、dodgeCooldownMult `:530`、meleeRangeBonus `:613/:643`、enemySenseMult `:730`、reinforcementMult `:776`(dispatcher = `simulation/masks.ts:44-70`);`slowMoOnRoomEnter` 无数据行、`ammoRefillOnPickup` 已弃用,均不消费;`maskSpawns` 两关均空 = 面具只经开局选择。
10. **m2_teahouse 合入(M2.2,2026-08-30)**:蓝图 = `docs/levels/m2_teahouse.md`;敌人 3 护院 + 1 阁楼哨,`policeman` archetype 首次上场(`missions.ts` m2 enemySpawns);粉墙 `plaster_white` + 深木地板 `PAL_WOOD_DARK`(constants 新色,B21 纪律)。**通关持久化接线**(storage.ts 首个消费点):`GameEngine.recordCompletion`(`GameEngine.ts:98-115`)在 `missionEnd` 事件写 unlocks 完成表(解锁下一关)+ stats 最佳分/评级,`storage.saveUnlocks/saveStats` 持久化,启动时 `start()` 水合回 store;解锁规则 = `MissionSelect.isUnlocked`(完成表含前一关)。e2e 证据 = `hotline-e2e.spec.js` m2 测试(选择流转 + 房间事实)+ combat-loop m2 用例。

## §6 RC 管线契约(锚点 `src/engine/`)

- **6 阶段全管线**:`prepscene → prepjfa → jfa → distfield → cascade×3 → final`(`engine/shaders/` 9 个干净 GLSL ES 3.00 文件,**禁止运行时字符串补丁**)。
- **生产 profile 冻结**:3 cascades / `baseIntervalPx=6` / half-res work buffers / twoLoop;dither 配置在但生产帧关闭。
- **rc-lab-first**(`rc-lab/`):算法改动先过 7 确定性场景 37/37,再移植 `RcPipeline.ts`;质量断言含 radialSmooth(无暗环)+ centroid(≤6px)(B64)。
- **跨驱动**:呈现走全屏 passthrough 直出,禁 `blitFramebuffer`(B69)。
- **状态隔离**:`saveGlState/restoreGlState`,不污染 Canvas2D 基底(`JOURNEY.md:222`)。
- **权威分界**:RC = visual-only;gameplay 权威 = §5.1 几何判定。
- **坐标对账**:`visualCenter(pos)=pos+0.5` 唯一换算,渲染不得再 +0.5(B66/B68,`JOURNEY.md:223`)。

## §7 验证门(唯一收尾标准;改动类型 → 门,详见 `GAME-SOP.md` §6)

| 门 | 命令 | 基线 |
|----|------|------|
| 类型 | `npx tsc -b --noEmit` | 0 error |
| 构建 | `npm run build` | 绿(79 modules) |
| RC 算法 | `npm run rc-lab:check` | 37+37 |
| 拆灯 | `npm run light-break:check` | PASS |
| 战斗闭环 | `npm run combat-loop:check` | PASS |
| 视觉 | `npm run intro-polish:check` | PASS |
| e2e | `npm run e2e:playtest` | 6/6(M2.2 起含 mask + m2 测试) |
| 真键鼠 | `npm run self-play:check` | 3/3 |

## §8 变更流程

契约改动 = `[TDD-CONTRACT-CHANGE]`:本文 §2-§6 与 `src/core/` 同一 PR → §7 全链 → `AGENTS.md` 状态行同步 → `JOURNEY.md` 记账。bug 走 `BUGS.md` 登记-复现-回归(`docs/design/20-bug-fix-checklist.md`)。制作流程(新增内容/修 bug/加文档)= `GAME-SOP.md` §7 S1-S6。

## §9 v2 章节去向表(v4 重推时有意删除的章节,供旧引用重映射)

| v2 章节 | 内容 | 去向 |
|---------|------|------|
| §0 / §0.1 | 版本 / viewport 契约 | §3(常量)+ §5(viewport 执行在 SceneManager,以 e2e 基线为准) |
| §3.5 | GPU 性能预算表(9.7ms/15ms @1080p) | **未随 v4 重推**(v2 目标值,无代码强制);现行硬门 = §7 `e2e:playtest`(SwiftShader p95 ≤50ms) |
| §3.6 | 性能降级 autopilot 梯度 | 部分:常量在 §3(`RC_PERF_DEGRADE_FRAMES=3` / `RC_RECOVERY_FRAMES=120`);全梯度逻辑未验证实现,标注待确认 |
| §4.1-§4.7 | 数值表全部分散 | §2(类型)/ §3(常量)/ §4(数据表)/ §5(行为) |
| §5 | 契约速写 | §2(本文即契约,不再有独立"速写") |
| §8 | 里程碑表 | `GAME-SOP.md` §8(整改/计划)+ `JOURNEY.md`(实际进度);TDD 不再承载排期 |
| §12 | 风险登记册 | `AGENTS.md` 已知风险 + `BUGS.md` 活 tracker |
| §15 | RC 管线实现契约 | §6 |

> v2 全文:`old/TDD-v2-frozen.md`。引用 v2 节号的文档 = stale,按本表重映射(GDD 已于 2026-08-30 完成)。

---

*v4 由 contract-from-code 重推生成(2026-08-30)。v2 全文:`old/TDD-v2-frozen.md`。本文件为数值唯一真相源;GDD 只写 Why 不双写数值。*
