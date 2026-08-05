# 4_chunbai 验证报告与整改记录

> 验证日期：2026-08-05
> 范围：`new_game/`（纯白枪骑兵 重制版，Vite + React 19 + Three.js + Zustand）
> 依据：`kimi3-game-gen` skill（GDD 模板 + DDD 流程）、`technical-design-document` skill（TDD 结构）、`reference/d.md`（原作玩法/操作）

## 1. 构建与运行验证

| 检查项 | 结果 | 备注 |
|--------|------|------|
| `npm run build`（`tsc -b && vite build`） | ✅ 通过 | 50 modules；主包 734 kB（含 three.js，可接受） |
| 浏览器冒烟：Menu → 模式选择 → PVE → 暂停 → 返回 | ✅ 通过 | 无 console/page error |
| 60s PVE 连续射击 | ⚠️ 严重 | 波次正常推进（W1→W7）、W5 刷出 Boss，但 **score 恒为 0** |
| PVP 模式 | ❌ 不可用 | 无分屏、无伤害来源、无计时/局数，**永远不会结束** |

## 2. GDD 合规（对照 `kimi3-game-gen/references/gdd-template.md`）

**已有**：§3 概念/操作、§4 武器/技能/必杀表、§8 敌人 AI + FSM、§9 架构、§7 视觉、§8 音频（SFX 目录）。

**缺失**：§3 类型/受众/游戏流程；§4 进程曲线/目标/屏幕流/经济闭环；§5-6 故事/世界观/关卡；§7 HUD/摄像机细节；§9 风险登记/开发流程；§13 资源清单。且设计文档为单文件，未按 `design-doc-template.md` 拆分 per-concern 文档（无 TS 契约、文件归属、验收标准）。

**设计文档与代码漂移（文档标记 `[x]` 但未实现）**：

| 文档声明 | 代码事实 |
|----------|----------|
| Phase 5 分屏渲染 `[x]` | `GameEngine.ts:947` 为 `// TODO: implement split screen with two cameras` |
| Phase 6 后处理特效 `[x]` | 全工程无 `EffectComposer`/`UnrealBloomPass` |
| 技能系统（3.4 节，Q/E + 1-3） | `skill1/2/3`、`SKILLS`、`SPECIAL_ATTACKS` 仅定义/导入，引擎从不消费 |
| 6 种武器 | `store.ts` 初始 `weapons:[1,2,3]`，`unlockLevel` 无任何检查，4/5/6 号永远拿不到 |
| 追踪导弹「自动追踪」 | 导弹直线飞行，无任何制导逻辑 |

## 3. TDD 合规（对照 `technical-design-document` skill）

**项目内不存在 `TDD.md`**（glob 零命中）。§0-§8 全部缺失：变更日志、技术总览（命名规范/性能预算/分析工具）、机制结构（类图/状态机）、构建验收、资源文件格式、**分支策略**（仓库仅 `master`）、工具说明。

## 4. kimi3-game-gen 合规

- ✅ TS strict / React 19 / Tailwind / Vite / Zustand / Web Audio（零资源文件）/ 固定步长 1/60 / 程序化几何
- ✅ `types.ts`、`store.ts` 集中契约；tsc 为验证门禁
- ⚠️ skill 声明「3D 游戏请用 Three.js 栈」——本项目按设计使用 Three.js，属有意偏离
- ⚠️ `registered_agents.json` / `task_agent_mapping.json` 均为空 `{}`，并行 coder 工作流未启用
- ⚠️ BGM 为单一 55Hz 锯齿波低频嗡鸣，非文档所述「循环音序（节奏+和弦）」

## 5. 运行时缺陷（带证据）

1. **Boss 近乎无敌**：子弹生成于 y=0 且 `camDir.y = 0`（`GameEngine.ts:266-271`），Boss 悬于 y=5（命中半径 4）→ 光束枪永远打不中；Boss1 停留 z=-50，超出 W1 子弹 120 寿命距离与锁定范围 60，默认 AI 又回退到侦察兵定义（`getEnemyDef(Boss)` → `ENEMY_DEFS[0]`），全程不动。Boss 2/3 因 `currentBossIndex < 0` 门控**不可达**。
2. **分数/击杀 ≈ 0**：玩家自动巡航 -Z 且子弹只朝摄像机前方（水平）发射；敌人从后方追击 → 60 秒实测 0 击杀（仅 Boss 召唤的正面杂兵贡献 30 分）。追尾敌人既打不到，其子弹也几乎打不中玩家 → 无进度、无压力。
3. **PVP 无胜利条件**：无分屏渲染、P1/P2 共享同一输入与坐标、无敌人、`PVP_MATCH_TIME`/`PVP_ROUNDS` 未使用，结果画面永不出现。
4. **`fireRate` 未使用** → 所有武器 60 发/秒。
5. **技能无效果**：护盾/减速/EMP/修复/推进均未接线；`BOOST_DURATION`/`SHIELD_DURATION`/`SLOW_*`/`WARP_*` 仅导入未使用。
6. **PVE 幻影 P2**：HUD 同时渲染两名玩家，P2 与 P1 同坐标同输入，且 PVE 判负需「两名玩家都死」。

## 6. 整改措施（本次变更）

- **移除特性**：PVP 1v1 模式、本地分屏渲染、ModeSelect 界面、技能系统（未实现部分）。对应 `types.ts` / `store.ts` / `GameEngine.ts` / `SceneManager.ts` / 组件 / 设计文档同步删除。
- **全 3D 飞行移动**（对齐原作空战；v1.0 方案为 R/F 垂直，v1.1 改 Shift/Ctrl）：WASD 水平 + Shift/Ctrl 垂直升降，速度矢量积分（阻尼/急停/助推/闪避），机甲随飞行方向俯仰与横滚；鼠标屏幕空间瞄准（含垂直分量）；移除地面/网格（2D 平面残留）；敌人生成与追击改为 3D。
- **操作映射**（最终方案，v1.1）：WASD 移动、**Shift/Ctrl 上下**、**空格按住助推 / 双击空格闪避**（无敌帧 + 冷却）、E 急停、1-4 切换武器、Tab 锁定、Z 必杀（复用气力槽）、Esc/Enter 暂停。~~R/F 垂直、Q 助推、空格拦截飞弹~~ 已废弃。
- **视觉向原作靠拢**：机甲改纯白涂装（原作「机体贴图全为白色」）、太空背景（黑幕 + 星野 + 白色云地球 + 橙色太阳 + 暖色点光源），移除地面网格与雾效。
- **顺带修复**：`fireRate` 生效（武器按表冷却）；锁定/射击方向含垂直分量（Boss 可被击中）；移除幻影 P2；PVE 单玩家判负。

## 7. 遗留问题（后续迭代）

- [ ] 编写 `TDD.md`（技术设计文档，含分支策略与性能预算）
- [ ] Boss 行为重做：3 个 Boss 全部可达、阶段攻击（clone/fullLaser/shield/laserNet 模式当前无实现）、Boss 追敌移动
- [ ] 武器 4/5/6 解锁路径（原作：每通关解锁新机体）
- [ ] BGM 升级为循环音序；合成语音（Boss 出场/必杀播报）
- [ ] 浮游炮（Funnel）自动攻击行为、导弹制导
- [ ] 关卡结构（原作：消灭全部敌人过关，非无限波次）

## 8. 实施结果（2026-08-05 按 `implementation-plan.md` 执行）

**已完成**：PVP/分屏/ModeSelect/技能系统移除；全 3D 飞行（WASD + Shift/Ctrl 垂直 + 速度矢量阻尼 + 空格助推/双击闪避/E 急停）；屏幕空间瞄准（含垂直）；`fireRate` 生效；单玩家化；太空视觉（星野 6000 点 + 地球 + 太阳 + 纯白机甲 + 无地面/雾）；`AudioManager.playDodge`。

**验证**（dev server + Playwright，引擎内省）：
- `npm run build` 通过（49 modules）。
- Menu → START GAME 直进 PVE；Esc 暂停/继续、QUIT 回菜单 ✅
- **60s PVE 连续射击：score 150、9 击杀、存活至 Wave 6**（score > 0 ✅）
- Shift 升（y 0→19.5）、Ctrl 降（19.5→5.1）；空格助推（45.8 u/s vs 基础 ~20）；双击空格闪避（位移 37.6u + 无敌帧 + 2.5s 冷却内二次双击被拦截）；E 急停（19.8→0.01 @700ms）✅
- Boss：Wave 5 刷出（hp 240 @52u）；垂直瞄准命中（240→160，导弹 20/发）；Tab 锁定生效；Boss 击杀分已修正为 `getBoss().score`（+500）✅
- 视觉：无 GridHelper/地面平面/雾；背景 `0x05050f`；星野 6000；地球（r90/92/97 @(-320,120,-650)）与太阳（r55/80 @(520,320,-900)）在场；机甲材质白（f4f6fa/d8dce4/b8bcc6/cfd3da）✅
- Ctrl+W / Ctrl+R 在游戏中不触发（preventDefault 组合键拦截）✅

**计划外修正（实现过程中发现并修复，均为验证门禁必需）**：
1. **瞄准算法**：计划 §6.4 的「相机射线方向」在第三人称相机（camera 位于玩家后上方、注视玩家）下有两个致命缺陷——屏幕中心射线恰好穿过玩家 → 平面求交退化为零向量（子弹速度 0）；且相机射线相对玩家水平线有 28° 俯角（子弹全部打低）。改为**准星射线对敌人球体求交**（命中准星下的敌人即精确瞄准，含垂直），无目标时沿准星水平方向（玩家高度）发射。
2. **敌人冻结**：敌人仅在 `alertRange` 内进入 Chase，而生成距离可达 200+ → 大多敌人永远不动（旧缺陷仍在）。改为**按敌种感知范围生成**（`randRange(30, min(alertRange+25, 80))`，随机 3D 方向绕玩家）+ **Patrol 状态向玩家漂移**（0.4×speed）。
3. **前期难度**：轰炸机（接触 40 伤）从 Wave 1 就在 25-30u 内刷出，2 只即秒杀。改为**按波次解锁敌种**（W1-2 仅 scout/assault/shield，W3+ 狙击，W4+ 自爆，W5+ 指挥官）。
4. **Boss 击杀分**：`getEnemyDef(Boss)` 回退到侦察兵定义（10 分）→ 改用 `getBoss(currentBossIndex+1).score`（+500）。

**遗留（本次范围外，见 §7）**：Boss 1 相位 1 不追敌（静止于 z=-50）；锁定为「最近敌人」而非准星指向（Tab 锁定会被近身杂兵抢走）；导弹无制导（直线飞行）。

## 9. 下次迭代（swarm 并行实现，2026-08-05）

按 `implementation-plan.md` §10 以 6 路并行 agent（git worktree 分支隔离 + tsc 自校验）实现，主 agent 合并：

| 分支 | 交付 | 合并 |
|------|------|------|
| `agent/tdd-doc` | `TDD.md`（494 行：变更日志/技术总览/机制结构 mermaid/构建验收/分支策略/工具说明） | ✅ |
| `agent/boss-patterns` | Boss 2/3 可达（`currentBossIndex` 门控改为「场上有 Boss 则不刷」）；全相位追敌；clone/fullLaser/shield/laserNet 攻击模式；`EnemyState.shieldTimer` | ✅ |
| `agent/weapons-456` | 武器 4/5/6 按 `game.wave >= unlockLevel` 解锁；导弹制导（玩家 4 rad/s / Boss 1.5 rad/s，Rodrigues 转向）；浮游炮（环绕 0.6s → 突击）；`ProjectileState.phase/phaseTimer/orbitAngle` | ✅ |
| `agent/audio-bgm-voice` | BGM lookahead 音序器（120 BPM，Am-F-Dm-Em，bass+pad+噪声 hi-hat）；`playBossAnnounce`/`playSpecialAnnounce` 合成语音 | ✅ |
| `agent/bloom-postfx` | `postfx.ts`：EffectComposer + RenderPass + UnrealBloomPass(0.75/0.6/0.85) + SMAAPass + OutputPass（`three/addons` 导入路径） | ✅ |
| `agent/level-clear` | 关卡制：固定敌群刷出 → 清场过关 → 2.5s 间歇；`game.wave` = 关卡号（通关递增，武器解锁依赖）；HUD 改 `LEVEL` | ✅ |

**合并冲突**：仅 `spawnEnemies` 一处（boss 门控 vs 关卡重写），已解决。

**集成后验证**（Playwright 引擎内省）：
- 关卡流程：L1 敌群 7 只（类型门控正确）→ 清场 → L2/L3；`maxEnemyDist` 维持 ≤33（敌人不再逃逸出界）
- 武器解锁：L4 → `weapons:[1,2,3,4]`；L5 → `[1,2,3,4,5]` ✅
- Boss：L5 刷出（hp 240 @37u）→ W1 垂直瞄准命中 → 击杀 +500 → 关卡推进至 L6（间歇 2.5s）✅
- Bloom/BGM/语音运行无 console error；`npm run build` 通过

**集成期发现并修复的 2 个问题**（commit `92359b4`）：
1. **逃逸软锁**：旧 flee 逻辑让低血敌人无限远离（无时限、无边界钳制）——时间波次下被掩盖，关卡制下导致清场永不达成。修复：flee 每敌仅一次（`FLEE_DURATION=2`）后转 Chase 死战；敌人位置钳制在 `±WORLD_SIZE/±WORLD_SIZE_Y`。
2. **Boss 关不清场**：`spawnEnemies` 的 Boss 刷出分支先 `return`，Boss 死亡后下一 tick 直接再刷 Boss（`currentBossIndex` 从未重置、关卡永远停在 5）。修复：Boss 已刷且已死时落入清场检查（wave+1、重置索引、2.5s 间歇）。

## 10. 玩家反馈修复（2026-08-05，commit `7e9f3e3`）

| 反馈 | 根因 | 修复 | 验证 |
|------|------|------|------|
| 1. 无故逆时针自转 | 机甲**朝向**使用了带敌人射线拾取的 `computeAimDir`——敌人穿过准星线时朝向被拉向敌人（可达 180° 反向），多敌围攻时持续乱转 | 拆分 `computeCrosshairDir`（纯准星方向，仅含水平分量）：朝向/俯仰只跟准星；射线拾取仅用于**开火** | 静态鼠标 + 7 敌全攻击 10s：`rotY` 恒定 3.142（spread 0） |
| 2. 闪避不跟 WASD | 闪避速度强制推向瞄准方向 | 闪避方向 = WASD 输入方向（相机相对），无输入时回退准星方向 | W 闪避 (0,0,-29)、D 闪避 (+18,+17) 均沿各自输入方向 |
| 3. Tab 锁定无效 | 锁定门控 `weapon.lockRange > 0`——默认武器 1（lockRange 0）永远无法锁定 | 锁定距离改为 `max(weapon.lockRange, LOCK_RANGE=60)`，任意武器可锁定（绿线指示、Tab 松开解除、锁定后开火自动指向目标） | 武器 1 + Tab：lock 1（盾兵）、指示线存在、松开即解除 |
| 4. 瞄准无光标指示 | 指针锁定后系统光标隐藏，且 `clientX/Y` 在锁定后冻结（瞄准卡死） | `GameCanvas` 新增准星 SVG（青色 24px，`cursor-none`）；指针锁定时用 `movementX/Y` 累积瞄准位置（钳制画布内） | 准星元素随鼠标移动，引擎 aim 同步（0.23, 0.35） |

**附带修复**：计划 §6.3 的「世界空间 WASD」公式把 W 映射到 +Z（朝向相机 = 后退）。改为**相机相对移动**：W 朝准星方向（屏幕内侧）、A/D 侧移、Shift/Ctrl 垂直（`moveWorld` 基向量 = 准星方向 × 侧向）；闪避同步采用相机相对方向。实测 W 位移 -Z（前进）。

## 11. 锁定系统重做（2026-08-05，commit `c12dc43`）

需求澄清（中文问答确认）：Tab 切换 + 目标丢失自动切换下一个 + 软锁定 70% + 红/绿线按武器锁定距离 + 吸附只影响开火。

| 需求 | 实现 | 验证 |
|------|------|------|
| Tab 为开关（非按住） | `InputState.lockTarget` → `lockToggle`（边沿触发）；引擎 `lockOn` 状态切换；松开 Tab 锁定保持 | Tab 按下→lockOn=true 锁定；再按→解除 |
| 目标丢失自动切换 | 当前目标死亡或超出 `LOCK_DROP_RANGE=150` 时，自动锁定范围内最近敌人（≤150 自动补获） | 击杀锁定目标（id 3）→ 自动切换到 id 6，锁定保持 |
| 软锁定 70% | 锁定且目标在射程内时，开火方向 = normalize(0.3×准星 + 0.7×目标)，保留鼠标自由度；LockRequired 武器仅射程内可开火；超射程（红线）不吸附 | 目标方向 (0.45,-0.89) + 准星 (0,-1) → 实测弹道 (0.33,-0.94) ≈ 理论 70% 混合 (0.32,-0.95) |
| 红/绿线指示 | `updateLockIndicator` 支持颜色参数：`dist ≤ max(weapon.lockRange, LOCK_RANGE)` 绿 `#00ff88`，否则红 `#ff4444`（锁定保持，仅颜色变化） | 20u 绿 rgb(0,255,136) → 118u 红 rgb(255,68,68)，仍保持锁定 |
| 吸附只影响开火 | 机甲朝向仍跟随准星（`computeCrosshairDir`），软锁定仅作用于 `playerShoot` 弹道方向 | 机甲朝向不受锁定影响 |

**镜头软绑定（后续反馈，commit `8ab670a`）**：`SceneManager.updateCamera` 新增 `lockTarget` 参数——锁定时注视点从玩家向目标偏移 `pull = 0.4 × max(0, 1 - dist/150)`（近强远弱，超出保持距离渐隐为 0）；镜头位置仍锚定玩家身后，鼠标可随时自由转向。验证：目标 (10,0,-20)、dist 22.4 → pull 0.34，镜头前向与混合点方向余弦 = 1.0（精确指向）；移鼠标后视角自由摆动而锁定保持。

**准星粘滞（后续反馈，commit `cbcb8d3`）**：锁定期间准星本身被软粘滞到目标的屏幕位置，无法拖离——`InputManager` 分离「原始鼠标」与「有效准星」（`mouseNorm`/`aimNorm`）；引擎每帧以原始鼠标为基准向目标屏幕位置吸附 `pull = 0.9 × max(0, 1 - dist/150)`（保留 ~10-20% 微调自由度，不随时间收敛为硬锁定）；`GameCanvas` 改为 rAF 循环按引擎 aim 定位准星 DOM。验证：鼠标拖至 (80,80) 时准星仍贴目标（aim 0.46,0.38，理论值 0.46,0.38，误差 0.003）；拖至对角 (1100,600) 准星依旧 (0.54,0.50)。

## 12. 智能武器 + 自由视角（2026-08-05，commit `7d41a49`）

**① 所有武器智能化（提前量圈）**：
- `WeaponDef.smartRadius`（屏幕像素）：准星旁绘制随武器变化的虚线圆圈——光束机枪 60 / 导弹 95 / 加农 80 / 散射 110 / 狙击 45 / 浮游炮 130；`GameCanvas` rAF 按当前武器更新半径。
- 引擎速度估计：`enemyVels`/`enemyLastPos` 每帧由位置差分更新（死亡清理）。
- `pickSmartTarget`：圈内（屏幕距离 ≤ smartRadius）最近目标；`computeLeadDir`：目标位置 + 速度 × 飞行时间（迭代一次收敛）——对直线运动目标**保证命中**。
- `playerShoot`：锁定目标（射程内）优先，否则圈内最近目标，均计算提前量开火；无目标按准星。原 70% 软锁定混合被提前量取代。
- 顺带修复：武器切换门控 `n >= 1 && n <= 4` → `n <= 9`（武器 5/6 此前永远切不过去）；`GameCanvas` 按键名单补 '5'/'6'。
- 验证：六武器圈半径 60/95/80/110/45/130 随切换变化；`computeLeadDir` 数学（vel 8、dist 30、speed 40 → dir (0.2, 0, -0.98) 与理论 (0.196, 0, -0.981) 一致）；端到端：冻结圈内目标注入速度后开火，子弹方向与同刻 `computeLeadDir` 一致（含散布误差 0.024）。

**② 锁定不强制机甲朝向 + 最大转体速度 + 自由视角**：
- 新增 `YAW_TURN_RATE=3.5` / `PITCH_TURN_RATE=2.2`（rad/s）：机甲偏航/俯仰以限速转向准星方向（最短路径钳制），不再瞬移、不再被锁定目标强制朝向。
- 镜头偏航改由**准星方向**驱动（`render` 传 `atan2(crosshairDir)`），鼠标即时控制视角；移除锁定注视点偏移（`updateCamera` 恢复只注视玩家）。
- 验证：甩动鼠标 150ms 内镜头（准星）转 -2.08 rad（即时跟随），机甲仅转 -0.58 rad（≈ 3.5 rad/s × 0.15s 钳制）。

**附带**：修复 `src/index.css` 中 `//` 行注释导致的 PostCSS 解析失败（改为 `/* */`，主题内容未动）。

## 13. 机甲手感 / 模型 / 描边 / 提前量指示（2026-08-05，commit `11448ea`/`75907cd`/`f2c3044`/`1935b04` + `01b8679`）

按苏格拉底式问答（费曼式总结）确认的规格分四批实现：

| 批次 | 内容 | 验证 |
|------|------|------|
| **B1 手感** | `CONTROL_K 4→2.5`（更重惯性）；气动阻力 `vel×exp(-1.2dt)`（松键自然减速）；制动仰角 +8°（0.2s 起 0.4s 回落，仅叠加 mesh 不污染 `rot.x`）；悬停浮沉 ±0.05m；推进器火苗（足底×2+背包×1，加法混合，随输入伸缩、boost 转白蓝）；FOV 呼吸 60→66°；制动时镜头弹簧 8→20；受击镜头轻震 | 火苗 [0→1→0] 随 W 输入；E 按住 meshRotX=0.14（8°）松开回落；高速 FOV 63.9° |
| **B2 模型** | 独眼面罩（玩家色）、单根后掠 25° V 天线、前倾尖角肩甲、胸口反应堆（玩家色细环）、反关节跖行足（大腿前倾/小腿后折/楔形足板）、右臂长枪保留 | 3 推进器 + 自描边 + 彩色部件齐全 |
| **B3 描边** | 反向膨胀壳（BackSide+加法，1.04 缩放）随子对象运动：自己蓝色 `#4488ff` 常显；Tab 锁定目标橘红 `#ff5a3c` 3Hz 脉冲 | 锁定后 outline 出现、opacity 0.35→0.15 脉冲 |
| **B4 提前量落点** | 引擎 `getLeadScreenPoint()`（锁定+射程内+在屏）→ GameCanvas 橘色小圆点（pipper） | pipper (643,359) ≈ 引擎落点 (636,361) |

**修复**：制动仰角原实现逐帧累加进 `rot.x`（0.14/帧 → 2.51 rad 翻转），改为 mesh 旋转叠加；描边 `traverse` 访问 Group（无 material）抛错，加守卫后 0 console error。

## 14. C0 开场序列（2026-08-05，commit `bada68e`）

Ask 模式分析确认两缺口，实况核查后：①`updateAtmosphere` 已由 `SceneManager.render(dt)` 内部调用且引擎传真实 dt（分析基于旧状态）；②`playIntroSting` 缺失（已补：~3s Web Audio——55→110Hz 低音上升铺底（低通 200→900Hz）、0.8s 合成器上滑 220→880Hz、0.8s 次低音重击 90→40Hz）；③HUD 协调滑入已在工作区实现（各区块 800-1500ms 错峰 opacity+translateY transition）。GameEngine.ts 同时承载视觉接线与音频调用，无法干净拆分，按 β 单提交落地。

流程验证（浏览器）：t=0.5s 开场中（introActive、镜头 y=35 高位、城市暗 opacity 0、游戏冻结 nEnemies=0、HUD opacity 0）→ t=2.4s 完成（城市 opacity 1、镜头到追击位 y=8、解除冻结敌兵刷出、HUD opacity 1），0 console errors。

## 15. 锁定机制从零重建（2026-08-05，commit `f7a29d7`）

**根因**：`GameEngine.render` 中锁定描边 `traverse` 每帧抛异常（`Cannot set properties of undefined`，用户并发编辑覆盖了守卫）→ 异常在 `scene.render(dt)` 之前逃出 → `updateAtmosphere` 永不执行 → intro 永不完成 → `update()` 提前 return → 输入边沿永不消费 → **Tab 锁定与整个游戏逻辑一起死锁**（表现为"锁定完全失效"）。

**重建内容**：
1. **自包含锁定子系统**：`updateLock(inp, p)`（Tab 边沿切换 + store 同步 `lockOn` + 目标保持/自动切换 + 准星粘滞）、`getLockEnemy(p)`、`renderLockVisuals(p)`（绿/红指示线 + 橘红脉冲描边，`children` 直接遍历 + `instanceof` 守卫，绝不抛错）；`lockTargets[]` 数组简化为单值 `lockTargetId`。
2. **循环防崩**：`gameLoop` 整体 try/catch（单帧异常只记录不杀循环，限频 1s 一次）。
3. **intro 输入排空**：开场期间 `input.getState()` 消费边沿，避免 Tab/空格残留误触发。
4. **HUD 反馈**：`GameState.lockOn` + 顶部帧状态位（LOCK 绿 / ENGAGE 黄，Boss 时红）。
5. **`SceneManager.createOutline` 加固**：`instanceof THREE.Mesh` 过滤。

**验证**（浏览器，0 console errors）：intro 2.4s 完成 → 敌兵刷出 → Tab 开锁（lockOn、目标 id、绿线、描边、HUD "LOCK"）→ 击杀自动切换目标 → Tab 关闭 → 开火 1.5s 击杀锁定目标（+20 分）。
