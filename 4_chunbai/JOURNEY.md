# JOURNEY.md — 纯白枪骑兵 Pure White Lancer（决策日志）

> 4 文档底线之一。本文件由现有 `new_game/design-doc.md`、`implementation-plan.md`、`verification-report.md`、`reference/d.md` 的变更记录反推，并对照当前实际代码核实。由于无法还原真实历史顺序，按「文档证据时间线」排序；凡无法核实者标 `[待确认]`。当前阶段：**Production（有代码、无根级文档，本文档即补齐底线的产物）。**

## 项目溯源（de-facto 起点）

- **原作**：phixcat《纯白枪骑兵》，2008 年 Flash 第一人称空战射击，Flash 3D 引擎，机体为高达 UC 系列恶搞版、贴图全白。参考证据：`reference/206206.swf`（2.4MB）、`reference/纯白枪骑兵2011.exe`（Windows 版）、`reference/d.md`（百度百科摘录 + 操作笔记）、`src/`（FFDec 反编译出的 buttons/fonts/frames）。
- **本作定位**：3D 第三人称空战射击**重制版**（非移植）。

## 决策时间线（反推，`[待确认]` 表示无法从代码核实）

| 序 | 决策 / 变更 | 证据 | 当前代码状态 |
|----|------------|------|--------------|
| 1 | 项目初始化：Vite + React + TS + Tailwind + Three.js + Zustand（零资源文件、程序化几何、Web Audio） | `verification-report.md` §1 | 已实现（`package.json`） |
| 2 | 移除 PVP 1v1 / 本地分屏 / ModeSelect / 技能系统，**单玩家化** | `verification-report.md` §6 | 已实现（store 单玩家、屏幕流无 modeSelect） |
| 3 | 全 3D 飞行（WASD + Shift/Ctrl 垂直，速度矢量、助推/闪避/急停） | `implementation-plan.md` §6 | 已实现（`constants.ts`/`Simulation.ts`） |
| 4 | 操作映射定案：鼠标=准星、空格按住助推/双击闪避、E 急停、Tab 锁定、Z 必杀（废弃 R/F/Q/空格拦截飞弹） | `design-doc.md` v1.0-1.3 | 已实现 |
| 5 | 视觉对齐原作：纯白机甲、太空背景（星野/地球/太阳）、无地面网格雾 | `implementation-plan.md` §5 | 已实现 |
| 6 | 速度感：太空尘埃流 + 助推 FOV 外扩 + 摄像机拉远 + 受击震屏 | `design-doc.md` v1.3 | `[待确认]`（尘埃层 `[待确认]`，FOV/震屏见 `constants.ts`/`SceneManager`） |
| 7 | 导弹半制导、浮游炮自动攻击设计 | `design-doc.md` v1.4 | 半制导 `[待确认]`（`ProjectileType.Missile` 存在，转向逻辑待核对 `Simulation.ts`）；浮游炮 `[待确认]` |
| 8 | **Roguelike 选关地图**（4 层节点图、普通/精英/补给/Boss、死亡清零仅保留武器 1-3） | `design-doc.md` v1.5-1.6、`implementation-plan.md` §R2-8 | **未实现**（无 `MapScreen`/`data/map.ts`/`'map'` screen） |
| 9 | Boss 结构：乱入中 Boss + 最终 Boss + 实验体-α 精英变体 | `design-doc.md` v1.7 | **未落地**（地图机制未实现；3 个 Boss 数据表存在） |
| 10 | 美术迁移（v1.8）：去卡通、纯黑虚空、纯白剪影、**移除 Bloom**、蓝描边 HUD | `design-doc.md` v1.8 | **与代码矛盾**：`engine/postfx.ts` 存在 UnrealBloomPass（Bloom 后处理已实现）→ 记录为漂移点 |
| 11 | 修复瞄准/Boss 打不中、敌人冻结、前期难度、Boss 分（计划外修正 1-4） | `verification-report.md` §8 | 已实现 |
| 12 | 玩家反馈修复：朝向乱转、闪避方向、锁定失效、准星指示（提交 `7e9f3e3` 等） | `verification-report.md` §10 | 已实现 |
| 13 | 锁定系统重做：Tab 开关 + 目标自动切换 + 软锁定 + 红绿线 + 吸附只影响开火；镜头软绑定；准星粘滞 | `verification-report.md` §11 | 已实现（`LOCK_*` 常量在 `constants.ts`） |
| 14 | 智能武器（提前量圈 `smartRadius`）+ 自由视角 + YAW/PITCH 限速转向 | `verification-report.md` §12 | 已实现（`smartRadius` 在各武器行） |
| 15 | 机甲手感/模型/描边/提前量落点（苏格拉底定案） | `verification-report.md` §13 | 已实现（`BRAKE_PITCH` 等常量） |
| 16 | C0 开场序列（`bada68e`） | `verification-report.md` §14 | `introActive` 字段在 `types.ts`；开场含「城市」元素 `[待确认]`（当前 src 未检索到 city 字符） |
| 17 | 锁定机制从零重建（`f7a29d7`）：自包含锁定子系统 + 循环防崩 + intro 输入排空 | `verification-report.md` §15 | 已实现 |
| 18 | **C.A.T 架构重构**（未提交）：core/engine 拆分、WorldManifest 事实源、token 化世界、GameEngine 1656→534 行 | `verification-report.md` §16 | **已实现**（当前源码即此结构；Simulation.ts 898 行、GameEngine.ts 534 行） |
| 19 | 已有 `new_game/TDD.md`（技术设计文档，494 行）+ `new_game/design-doc.md` + `verification-report.md` + `implementation-plan.md` | 现有文件 | 保留；本根级 4 文档为其收敛版 |

## 关键决策理由（从文档记载的苏格拉底问答反推）

- **为何鼠标=准星而非相机方向**：第三人称相机下相机射线会穿过玩家（速度退化为 0）且有 ~28° 俯角打低（`verification-report.md` §8 修正 1）。
- **为何纯 Roguelike 死亡清零**：奖励决策导向「下一局」，死亡带走路线经验而非数值（`design-doc.md` v1.6）。
- **为何资源焦虑**：地图只画一个 Boss、乱入消耗资源、补给有限，让「我够不够格」由选路决定（`design-doc.md` v1.7）。

## 记录在案的漂移点（文档 ≠ 代码）

1. **Bloom**：`design-doc.md` v1.8 声明移除，`engine/postfx.ts` 已实现 Bloom。
2. **Roguelike 地图 / 乱入 Boss / 关卡制**：文档详尽设计，代码仍为无限波次竞技场（`WAVE_INTERVAL`/`BOSS_WAVE_INTERVAL`）。
3. **双 TDD 关系**：根级 `TDD.md`（本文件，当前数值权威）与 `new_game/TDD.md`（历史深度记录）并存——为避免数值重复，根级以引用为主、含可核实数值。

## 待核实 / 下一步

- [ ] 核对 `Simulation.ts` 中导弹制导、浮游炮、武器解锁、Boss 追敌的**实际实现状态**，消除 `GDD.md`/`TDD.md` 的 `[待确认]`。
- [ ] 决策 8/9（Roguelike 地图、乱入 Boss）是「仍规划中」还是「已废弃」——由作者确认。
- [ ] 用 `/reverse-document` 或人工核对本文档反推内容是否准确。
