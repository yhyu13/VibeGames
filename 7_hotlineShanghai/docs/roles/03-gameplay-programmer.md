# 角色需求 — 游戏性程序（Gameplay Programmer）

> 蒸馏自本项目实际教训：B22（`sendInput` 解引用后 `this=undefined` 被吞，全输入静默丢失）、B23（投掷物生成在脚边立刻捡回）、B66（枪杀不了敌/捡不了刀，机制有数据没接线）。游戏性程序在本项目的核心是**把机制接线到可被 e2e 证明**。

## 使命一句话

让 Simulation 的每一条冻结契约（`TDD.md` §5）在 core 纯净层真实发生，并被 e2e/self-play 门捕获。

## 必读

1. [`GAME-SOP.md`](../../GAME-SOP.md) §5（玩法标准）+ §7 S2/S3（改契约/修 bug 流程）
2. `TDD.md` §5（契约速写：类型签名/状态名/默认数值 = 最高优先级）
3. `docs/design/10-architecture-cat.md`（core/engine 边界）
4. `docs/design/14-data-table-sop.md`（8 张数据表变更 SOP）
5. `docs/design/13-dev-hooks.md`（`__sim` / `__gameManifest` / `__simEvents` 断言入口）
6. `docs/design/25-intro-scene-lessons.md`（动输入/伤害/视野/任务闭环前必读）

## 技能需求（蒸馏）

| 技能 | 项目内的具体形态 | 验收证据 |
|------|----------------|---------|
| C.A.T 纪律 | `core/` 零 THREE/DOM/zustand；机制写进 `core/simulation/`，engine 只做适配 | `docs/design/10-architecture-cat.md` |
| 契约优先 | 改签名/状态机/数值走 `[TDD-CONTRACT-CHANGE]`（11 号流程），TDD 与代码同一 PR | `docs/design/11-contract-change-procedure.md` |
| 输入链路健壮性 | 方法调用不裸解引用；strict 模式 `this` 绑定；输入丢失不可被 catch 吞掉（B22） | `BUGS.md` B22 |
| 机制接线闭环 | 数据表条目必须有行为落点（grenade `explosionRadius` 有数据无行为 = ❌，JOURNEY 特性 23）；新机制 PR 必须附 e2e 证据 | JOURNEY 特性清单 |
| FSM 实现 | patrol → suspicious → alert 带警告窗口（`DETECTION_WARNING_S`）；tower_guard 静态全状态 | `src/core/simulation/` |
| 数值单副本 | 行为数值引用 data 表，禁止 snapshot 硬编码（`paused:false`/`grenades:[]` 硬编码即反例） | GAME-SOP §9 checklist |

## 交付物

- `src/core/simulation/` 机制 + `src/core/data/` 表条目（同一 PR）
- 契约变更时同步 `TDD.md` + `AGENTS.md` 状态行
- BUGS.md 修复条目（复现步骤必填）

## 验收门

- `npx tsc -b --noEmit` 零 error
- `npm run combat-loop:check` + `npm run e2e:playtest` 4/4 + `npm run self-play:check` 3/3
- 涉拆灯：`npm run light-break:check`

## 禁止事项

- 禁止从 RC 像素反推玩法判定（LOS/LightField 才是权威）
- 禁止静默吞错（empty catch 掩盖输入/模拟故障）
- 禁止绕过 data 表直接写数值
