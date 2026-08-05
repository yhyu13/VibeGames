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
