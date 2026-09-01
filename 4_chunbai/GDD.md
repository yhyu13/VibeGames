# GDD.md — 纯白枪骑兵 Pure White Lancer（设计权威文档）

> 4 文档底线之一。本文由现存代码、数据表、截图与 `new_game/design-doc.md` 反推生成，仅记录**能从实际文件核实**的设计事实；无法核实的设计意图标注 `[待确认]` 或明确归为「设计愿景（未实现）」。数值一律引用 `TDD.md`，不在本文复制。

## 1. 概念（Elevator Pitch）

一台纯白机甲（取材自高达 UC 系列的恶搞机体，机体贴图全为白色——故得名「纯白枪骑兵」）在黑色虚空中飞行作战。玩家 WASD 全 3D 飞行、鼠标精确瞄准、Tab 锁定目标、发射六种武器、对抗波次敌群与 Boss。改编自 phixcat 2008 年 Flash 第一人称空战射击原作 `reference/206206.swf`，本作改为 **3D 第三人称**视角。

## 2. 核心体验与支柱

（依据 `new_game/design-doc.md` 变更记录与 `implementation-plan.md` 的苏格拉底定案反推）

- **全 3D 自由飞行**：垂直轴（Shift/Ctrl）、助推、闪避冲刺、急停，速度矢量积分（阻尼趋近），机甲随飞行俯仰/横滚。
- **鼠标 = 武器准星（核心）**：屏幕空间瞄准，锁定中可围绕目标扭摆打提前量。
- **全向弹幕对抗**：波次生存 + Boss 战。
- **纯白 vs 虚空**：玩家白底蓝描边；敌人橘/红系；Boss 红白；背景黑幕（无地面/网格，太空星野 + 天体）。

> 支柱在代码中的体现：`constants.ts`（飞行/机动/相机手感参数）、`core/simulation/Simulation.ts`（战斗规则）、`core/world/world.ts`（竞技场/碰撞体事实源）。

## 3. 核心循环（Loops）

**单局**（当前代码）：进入 PVE → 波次刷敌 → 全歼一波 → 间休 2.5s → 下一波 → 每 5 波刷 Boss → 击败 Boss → 继续波次；玩家 HP 归零 → Game Over 结算。

> 反推自 `constants.ts`（`WAVE_INTERVAL=10`、`BOSS_WAVE_INTERVAL=5`）、`core/world/world.ts`（`isBossWave`）、`verification-report.md` §9「关卡/波次清场 + 2.5s 间休」。

**设计愿景（未实现，仅 `implementation-plan.md` §R2-8）**：Roguelike 选关地图（4 层节点图、普通/精英/补给/Boss 节点、死亡清零仅保留初始武器 1-3）。代码中无 `MapScreen`/`data/map.ts`。

## 4. 玩家（Player）

- 属性：HP / EN 能量 / 气力槽（必杀）/ 速度 / 持有的武器组。基础值见 `TDD.md`。
- 初始武器 `weapons: [1,2,3]`（`store.ts` `makePlayer`）；对应原作「初期 3 部弱机体」。武器 4-6 数据表存在，但解锁路径 `[待确认]`（实现文档记录有过 `game.wave >= unlockLevel` 解锁，当前 store 无该逻辑）。
- 命中半径：玩家 `1.5`；碰撞模型为 3D 球体距离判定。

## 5. 武器系统（6 种，数据表在 `TDD.md`）

| # | 名称 | 类型 | 弹道特性 |
|---|------|------|----------|
| 1 | 光束机枪 | Bullet | 快速连射，`fireRate` 冷却，自由射击 |
| 2 | 追踪导弹 | Missile | 半制导（设计意图），需锁定（LockRequired） |
| 3 | 光束加农 | Beam | 高伤穿透，需锁定 |
| 4 | 散射弹幕 | Spread | 扇形扩散，自由射击 |
| 5 | 狙击光束 | Sniper | 远程高伤，需锁定 |
| 6 | 浮游炮 | Funnel | 环绕自动攻击（设计意图），短射程锁定 |

> 半制导 / 浮游炮自动攻击在 `implementation-plan.md` 与 `design-doc.md` 有详细设计，但当前 `ProjectileType` 与数据表定义了 `smartRadius`（智能提前量圈）。导弹制导实现状态 `[待确认]`（文档记载曾实现 Rodrigues 转向，需对照 `Simulation.ts`）。

## 6. 机动系统

| 机动 | 触发 | 效果 |
|------|------|------|
| 引擎助推 | 空格按住 | 速度上限 ×3，消耗 EN |
| 闪避冲刺 | 300ms 内双击空格 | 沿 WASD 输入方向高速位移 + 无敌帧 + 残影，冷却 2.5s |
| 急停 | E | 强阻尼刹停 |
| 必杀技 | Z（气力槽满 100） | 全屏光束（`SPECIAL_ATTACKS.fullBeam`） |

（数值见 `TDD.md`。）

## 7. 敌人 AI

六种常规敌种（Scout/Assault/Sniper/Shield/Bomber/Commander），FSM：`Patrol → Chase → Attack → Flee`（Idle/Alert/Cooldown 为枚举预留）。全 3D：生成带高度差，追击/射击用 3D 向量。数据表（HP/速度/伤害/射程/分数）见 `TDD.md`。

> 每个敌种一个纯函数行为（`core/simulation/enemyAI.ts`）；波次敌种解锁：W1-2 基础三型，W3+ 狙击，W4+ 自爆，W5+ 指挥官（`core/world/world.ts` `enemyTypesForWave`）。

## 8. Boss 战

3 个 Boss（数据表见 `TDD.md`），多相位（`hpPercent` 阈值驱动），每 2s 攻击循环，8 种攻击模式（`core/simulation/bossAttacks.ts`：spread/laser/finalBeam/missile/rush/clone/fullLaser/shield/laserNet/spawn）。

| Boss | 特性 | 角色（design-doc v1.7 愿景） |
|------|------|------|
| 巨型运输舰 | 3 相位，召唤小兵/轨道炮 | 乱入中 Boss `[待确认，代码未实现地图]` |
| 实验体-α | 3 相位，突进/分身/全屏激光 | 精英战变体 `[待确认]` |
| 最终兵器 | 4 相位，多重导弹/护盾/激光网/终极光束 | 最终 Boss `[待确认]` |

## 9. 视觉风格（对齐原作，反推自 `SceneManager.ts` 与截图）

- 玩家纯白机甲（材质白系 + 小面积蓝 accent，保留座舱/面罩/推进器光效蓝）。
- 敌人统一橘/红系；Boss 白身红件。
- 太空背景：黑幕 `0x05050f` + 6000 点星野 + 白/蓝/暖色天体 + 橙色太阳 + 暖点光源；无地面/网格/雾。
- **Bloom 后处理存在**（`engine/postfx.ts`：EffectComposer + UnrealBloomPass + SMAAPass）。注：这与 `design-doc.md` v1.8「移除 UnrealBloom」的记载矛盾——代码以当前实现为准，记为漂移点。
- 残影（Sandevistan 风格）、推进器喷焰、太空尘埃流（速度感）、受击震屏 + HUD 红闪。
- 参考截图：`c0-*.png`（开场序列）、`c1-*.png`（机甲）、`c2-hud.png`/`c2-menu.png`（HUD/菜单）、`c3-*.png`、`c4-edge-pulse.png`（边缘脉冲）、`ingame.png`、`menu-after.png`、`d-space-fight.png`、`pve-scene.png`。

## 10. 音频（Web Audio 程序化合成，零音频文件）

射击/爆炸/命中/助推/闪避扫频/特殊技；BGM 为低频振荡器（`AudioManager.ts`）。Boss 出场播报 / 必杀播报为契约桩（`playBossAnnounce`/`playSpecialAnnounce`），合成语音实现 `[待确认]`。

## 11. 技术架构（C.A.T 分层）

- **core/**：平台无关核心（零 THREE/DOM/store 依赖）——types/constants/math/data/simulation/world；副作用以 `SimEvent` 事件流出。
- **engine/**：适配层——GameEngine（固定步长 1/60 主循环 + Tick 组装 + 事件分发 + mesh 对账）、SceneManager、InputManager、AudioManager、postfx。
- **world/world.ts**：`WorldManifest` = 3D 世界的唯一文本化事实源（竞技场/碰撞体/标记/生成带/数据表）；`worldText.ts` 序列化为 AI 可读 token；DEV 构建暴露 `window.__gameManifest()` / `window.__sim`。

## 12. 已知缺口 / 差距

- **设计文档与代码漂移**：`design-doc.md`（v1.5-1.8）描述的 Roguelike 地图、纯黑无 Bloom、乱入 Boss 在**当前代码中未落地**；当前为波次竞技场 + Bloom 后处理。
- 武器 4-6 解锁路径、导弹制导、浮游炮自动攻击、BGM 升级、合成语音实现状态待核对 `Simulation.ts`（`[待确认]`）。
