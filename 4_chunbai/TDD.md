# TDD.md — 纯白枪骑兵 Pure White Lancer（数值与契约权威）

> 4 文档底线之一。本文件是**数值唯一事实源**（SOP 硬规则 #1）。以下数值全部核实自 `new_game/src/core/` 的实际源代码（`constants.ts` / `types.ts` / `data/*` / `world/world.ts`）。无法从代码核实者标 `[待确认]`。
> 历史深度记录（变更日志/性能预算/类图 mermaid/分支策略）见 `new_game/TDD.md`；验证证据见 `new_game/verification-report.md`。
> 当前版本：**1.0.0**（与 `AGENTS.md` 头部一致）。

## §1 引擎/运行时与构建契约

| 项 | 值 | 来源 |
|----|----|------|
| 固定步长 | `FIXED_TIMESTEP = 1/60` s | `constants.ts` |
| 开发端口 | 3000（host 0.0.0.0） | `vite.config.ts`（经 `package.json`/文档核实） |
| 构建 | `tsc -b && vite build`（`npm run build`） | `package.json` |
| 类型门禁 | `npx tsc -b --noEmit` 0 错误 | `verification-report.md` |
| 屏幕流 | `'menu' \| 'pve' \| 'pause' \| 'result'` | `types.ts` `GameState.screen` / `store.ts` |

## §2 世界常量（`core/constants.ts`）

| 常量 | 值 | 含义 |
|------|----|----|
| `FIXED_TIMESTEP` | 1/60 | 模拟步长（秒） |
| `MAX_PLAYER_HP` | 100 | 玩家最大 HP |
| `MAX_PLAYER_EN` | 100 | 玩家最大 EN |
| `BOOST_EN_DRAIN` | 35 | 助推 EN 消耗（单位/秒 `[待确认]`） |
| `MAX_SPECIAL_GAUGE` | 100 | 气力槽上限 |
| `PLAYER_SPEED` | 20 | 基础速度上限 |
| `PLAYER_SIZE` | 1.5 | 玩家碰撞半径 |
| `WORLD_SIZE` | 200 | 竞技场水平半宽（±200） |
| `WORLD_SIZE_Y` | 60 | 垂直半高（±60） |
| `WAVE_INTERVAL` | 10 | 波次间隔（秒 `[待确认]` 语义） |
| `BOSS_WAVE_INTERVAL` | 5 | 每 N 波一个 Boss 关 |
| `INVULN_DURATION` | 1.5 | 受击无敌时长（秒） |
| `BOOST_SPEED_MULT` | 3 | 助推速度倍率 |
| `COMBO_TIMEOUT` | 2 | 连击超时（秒） |
| `MAX_ENEMIES` | 30 | 敌人数量上限 |
| `MAX_PROJECTILES` | 200 | 弹体数量上限 |
| `LOCK_RANGE` | 60 | 锁定基准射程 |
| `LOCK_DROP_RANGE` | 150 | 锁定丢失距离 |
| `LOCK_AIM_STICK` | 0.9 | 锁定准星粘滞系数 |
| `YAW_TURN_RATE` | 3.5 | 偏航角速度（rad/s） |
| `PITCH_TURN_RATE` | 2.2 | 俯仰角速度（rad/s） |
| `CAMERA_DISTANCE` | 15 | 相机距离 |
| `CAMERA_HEIGHT` | 8 | 相机高度 |
| `CAMERA_SPRING_STIFFNESS` | 8 | 相机弹簧刚度（制动时 20） |
| `CAMERA_BRAKE_STIFFNESS` | 20 | 制动相机刚度 |
| `CONTROL_K` | 2.5 | 速度趋近阻尼系数 |
| `BRAKE_K` | 10 | 急停阻尼系数 |
| `AIR_DRAG` | 1.2 | 气动阻力系数 |
| `BRAKE_PITCH` | 0.14 | 制动仰角幅度（rad） |
| `FOV_BASE` | 60 | 基础 FOV（度） |
| `FOV_BOOST` | 6 | 助推 FOV 增量 |
| `FLEE_DURATION` | 2 | 敌人逃跑时长（秒） |
| `DODGE_SPEED_MULT` | 4 | 闪避速度倍率 |
| `DODGE_DURATION` | 0.3 | 闪避持续（秒） |
| `DODGE_COOLDOWN` | 2.5 | 闪避冷却（秒） |
| `DODGE_INVULN` | 0.4 | 闪避无敌帧（秒） |

## §3 武器数据表（`core/data/weapons.ts`）

`WeaponDef { id, name, type:ProjectileType, damage, fireRate, speed, spread, color, unlockLevel, description, lockRange, fireMode, smartRadius }`

| id | 名称 | type | damage | fireRate(s) | speed | spread | lockRange | fireMode | smartRadius |
|----|------|------|--------|-------------|-------|--------|-----------|----------|-------------|
| 1 | 光束机枪 | Bullet | 5 | 0.1 | 40 | 0.05 | 0 | FreeFire | 60 |
| 2 | 追踪导弹 | Missile | 20 | 0.8 | 20 | 0 | 60 | LockRequired | 95 |
| 3 | 光束加农 | Beam | 50 | 1.2 | 60 | 0 | 80 | LockRequired | 80 |
| 4 | 散射弹幕 | Spread | 8 | 0.4 | 30 | 0.3 | 0 | FreeFire | 110 |
| 5 | 狙击光束 | Sniper | 80 | 1.5 | 100 | 0 | 120 | LockRequired | 45 |
| 6 | 浮游炮 | Funnel | 12 | 0.3 | 15 | 0.1 | 40 | LockShortRange | 130 |

`getWeapon(id)` 查表，未命中回退 `WEAPONS[0]`。

## §4 敌人数据表（`core/data/enemies.ts`）

`EnemyDef { type:EnemyType, name, hp, speed, damage, attackRange, alertRange, score, color, size }`

| type | 名称 | hp | speed | damage | attackRange | alertRange | score | color |
|------|------|----|-------|--------|-------------|------------|-------|-------|
| scout | 侦察兵 | 20 | 12 | 5 | 20 | 40 | 10 | #44aaff |
| assault | 突击兵 | 40 | 18 | 10 | 15 | 35 | 20 | #ff6644 |
| sniper | 狙击手 | 15 | 8 | 25 | 50 | 60 | 25 | #ff00ff |
| shield | 护盾兵 | 60 | 10 | 8 | 18 | 30 | 30 | #00ffff |
| bomber | 自爆兵 | 10 | 25 | 40 | 3 | 30 | 15 | #ff0000 |
| commander | 指挥官 | 80 | 8 | 15 | 25 | 50 | 50 | #ffaa00 |

`getEnemyDef(type)` 查表，未命中回退 `ENEMY_DEFS[0]`。命中半径：常规敌人 `1.5`，Boss `4`（`world.ts` `hitRadiusFor`）。

## §5 Boss 数据表（`core/data/bosses.ts`）

`BossDef { id, name, phases, score, color, size }`；相位 `BossPhase { hpPercent, speed, attacks[], minionSpawn, attackPattern }`。分阶段阈值按 `hpPercent`：

| id | 名称 | score | size | 相位阈值 hp% → 攻击模式 |
|----|------|-------|------|--------------------------|
| 1 | 巨型运输舰 | 500 | 4 | 100% spread → 60% spawn → 30% laser |
| 2 | 实验体-α | 1000 | 3 | 100% rush → 60% clone → 30% fullLaser |
| 3 | 最终兵器 | 2000 | 5 | 100% missile → 75% shield → 50% laserNet → 25% finalBeam |

`getBoss(id)` 未命中回退 `BOSSES[0]`。攻击模式分派（`simulation/bossAttacks.ts` `runBossAttack`）：`spread/laser/finalBeam/missile/rush/clone/fullLaser/shield/laserNet/spawn`。

## §6 技能/必杀数据表（`core/data/skills.ts`）

`SkillDef { id, name, description, cooldown, duration, icon }` — 6 个技能（护盾 15s/时间减速 20s/全弹发射 30s/修复 25s/电磁脉冲 25s/推进爆发 20s）。**当前未接线**（技能系统已从引擎移除，`implementation-plan.md`），仅数据表保留。

`SPECIAL_ATTACKS`：
- `fullBeam`：全屏光束，damage 200，range 100，gaugeCost 100
- `orbitalStrike`：卫星轨道炮，damage 500，range 20，gaugeCost 100
- `mirage`：分身突击，damage 50，count 3，gaugeCost 100

## §7 类型契约（`core/types.ts`）

关键枚举：`EnemyType`（scout/assault/sniper/shield/bomber/commander/boss）、`AIState`（idle/patrol/alert/chase/attack/cooldown/flee/phase1-4）、`ProjectileType`（bullet/missile/beam/spread/sniper/funnel/laser/bossBullet）、`FireMode`（freeFire/lockShortRange/lockRequired）、`GameState.screen`（menu/pve/pause/result）。

核心接口：`PlayerState`（pos/rot/hp/maxHp/energy/weapon/weapons[]/specialGauge/score/kills/combo/...）、`EnemyState`（type/hp/speed/state/targetId/...）、`ProjectileState`（pos/vel/damage/owner/type/lifetime/radius/...）、`InputState`（forward/backward/left/right/up/down/shoot/aimX/aimY/weaponSwitch/boost/brake/dodge/special/lockToggle/pause）。

## §8 WorldManifest 事实源（`core/world/world.ts`）

- 竞技场半长：`{x:200, y:60, z:200}`（硬钳制每 tick）。
- 碰撞体半径：玩家 1.5、常规敌 1.5、Boss 4、弹体 0.3（Laser 0.5）。
- 命名标记：玩家出生点 `(0,0,0)`、相机位 `(0,8,15)`、Boss 竞技场 `(0,5,-50)`。
- 生成带：敌兵环 `dist 30..80`（按 `min(alertRange+25, 80)` 收紧）；Boss 区 `x∈[-30,30], y=5, z=-50`。
- caps：`maxEnemies 30`、`maxProjectiles 200`。
- pacing：`bossWaveInterval 5`、`intermissionSeconds 2.5`、`fleeDurationSeconds 2`。
- locks：`baseRange 60`、`dropRange 150`、`aimStick 0.9`。
- 函数：`hitRadiusFor(type)`、`projectileRadiusFor(type)`、`playerHitRadius()`、`enemyTypesForWave(wave)`（W1-2 基础三型，W3+ 狙击，W4+ 自爆，W5+ 指挥官）、`isBossWave(wave)`（`wave % 5 === 0`）、`playerBaseline()`（hp 100/energy 100/speed 20/specialGaugeMax 100）。

## §9 Token 化 / dev 钩子（`core/world/worldText.ts`）

`describeWorld` / `describeRules` / `describeEntities` / `buildPromptContext`（精确签名 `[待确认]`，未全文核实；功能见 `verification-report.md` §16）。DEV 构建暴露 `window.__gameManifest()`（83 行 token 文本）与 `window.__sim`（仿真内省）；生产构建无此接口。

## §10 构建验收基线（`verification-report.md`）

- `npm run build` 通过；主包 ~734-757 kB（含 three.js）。
- 冒烟数值：60s 连续射击 score>0（基线 150/9 击杀）；Shift 升/Ctrl 降；助推 ~46 u/s；闪避位移 ~37.6u + 无敌帧；E 急停 ~0.01 @700ms；Boss 可命中（hp 240→160）、击杀 +500。
- 集成后：L1 敌群 7 只 → 清场 → L2/L3；L4 解锁武器 4、L5 解锁武器 5。

## §11 遗留 / `[待确认]` 清单

- `BOOST_EN_DRAIN=35`、`WAVE_INTERVAL=10` 的精确语义（秒/单位）`[待确认]`。
- 武器 4-6 解锁路径当前实现状态（文档记载过 `wave >= unlockLevel`，`store.ts` 现无此逻辑）`[待确认]`。
- 导弹制导 / 浮游炮自动攻击实现状态 `[待确认]`。
- `worldText.ts` 四个导出函数精确签名 `[待确认]`。
- 当前代码无 Roguelike 地图（`data/map.ts`、`MapScreen`）——数值契约不存在，`[待确认]` 是否纳入后续版本。
