# docs/design/ — 设计文档总索引(v3.1 重建)

> **入口**:所有 17+ 份设计 / 流程文档的导航页。**新文档必加进本表**(否则 = 隐藏文档)。
> **优先级**:
> - 新人 30 分钟 → 读 `01` + `02` §4 + `09` §1-§3 + `AGENTS.md`
> - M1 程序员 → 上面 + `10` + `11` + `12` + `13` + `14` + `15`
> - 美术 / 配音 → 上面 + `07` + `17`
> - DEV / QA → 上面 + `13` + `18` + `19` + `20`

## 0. 顶层权威(必读)

| 路径 | 角色 | 行数 |
|------|------|------|
| [`AGENTS.md`](../../AGENTS.md) | 项目级规则 + C.A.T 硬规则 | 130+ |
| [`GDD.md`](../../GDD.md) | 设计层权威(冻结 v3) | 574 |
| [`TDD.md`](../../TDD.md) | 技术契约(冻结 v3.1) | 1829 |
| [`BUGS.md`](../../BUGS.md) | bug tracker | — |
| [`GAME-SOP.md`](../../GAME-SOP.md) | 一致性 SOP + 权威链(2026-08-30 新;里程碑计划由其 §8 承担,MVP-PLAN.md 已废弃) | — |

## 1. 概念与设计基础(01-09)

| # | 文档 | 角色 | 状态 |
|---|------|------|------|
| 01 | [`01-concept-core-loop.md`](01-concept-core-loop.md) | 概念 + Why stub(指 GDD §1-§3 + TDD §4.4/§4.6) | ✅ v3.1 |
| 02 | [`02-art-direction.md`](02-art-direction.md) | 美术方向(调色板 / 像素 / 历史敏感度) | ✅ |
| 03 | [`03-audio-direction.md`](03-audio-direction.md) | 音频方向(Web Audio 程序化合成) | ✅ |
| 04 | [`04-radiance-cascades-pipeline.md`](04-radiance-cascades-pipeline.md) | RC 教学层(算法直觉 + 移植源) | ✅ v3.1 |
| 05 | [`05-character-design.md`](05-character-design.md) | 角色设计(8 方向 / 16×16 / 调色板) | ✅ |
| 06 | [`06-rendering-readability.md`](06-rendering-readability.md) | RC 已知坑附录(D1-D6 + v3.1.1/2) | ✅ v3.1 |
| 06 | ~~06-blindside-lessons.md~~ | 已归档 `old/docs-design/`(被 09 取代) | 🗄 2026-08-30 移出 |
| 07 | 🗑 缺失:sprite 任务由 [`08-sprite-spec.md`](08-sprite-spec.md) + `docs/roles/02-artist.md` 承担 | 2026-08-30 裁定 |
| 08 | [`08-sprite-spec.md`](08-sprite-spec.md) | sprite 规格与生成约定(原 08-level-design-workflow 已废弃,关卡流程由 `GAME-SOP.md` §7 S1 承担) | ✅ |
| 09 | [`09-blindside-integration.md`](09-blindside-integration.md) | v3.1 BLINDSIDE 整合权威(457 行) | ✅ v3.1 |

## 2. 程序 / 制作流程(10-15)

| # | 文档 | 角色 | 状态 |
|---|------|------|------|
| 10 | [`10-architecture-cat.md`](10-architecture-cat.md) | C.A.T 架构 + core/engine 边界 + 数据流图 | ✅ 2026-08-09 新 |
| 11 | [`11-contract-change-procedure.md`](11-contract-change-procedure.md) | `[TDD-CONTRACT-CHANGE]` SOP | ✅ 2026-08-09 新 |
| 12 | [`12-test-playbook.md`](12-test-playbook.md) | 7 个 scripts 使用手册 + 冒烟剧本库 | ✅ 2026-08-09 新 |
| 13 | [`13-dev-hooks.md`](13-dev-hooks.md) | 全窗口调试钩子目录(`__rcPipeline` / `__lightField` / `__sim` / `__gameManifest`) | ✅ 2026-08-09 新 |
| 14 | [`14-data-table-sop.md`](14-data-table-sop.md) | 8 张数据表新增 / 变更 SOP | ✅ 2026-08-09 新 |
| 15 | [`15-webgl-state-machine.md`](15-webgl-state-machine.md) | WebGL2 + Three 状态污染 / RC 全屏 pass 写状态 | ✅ 2026-08-09 新 |

## 3. 美术 / 配音 / 历史(16-17)

| # | 文档 | 角色 | 状态 |
|---|------|------|------|
| 16 | `16-zone-visual-reference.md` | zone 视觉签名(lilong / concession / creek)| 🕐 M2+ 内容(M1 期间先立空壳) |
| 17 | `17-historical-sensitivity-checklist.md` | 1937 历史敏感度统一人审门(美术 / 文案 / 任务文本 / 截图标题) | 🕐 立 |

## 4. 制作流程 / DEV(18-23)

| # | 文档 | 角色 | 状态 |
|---|------|------|------|
| 18-19 · 22-23 | ~~18-onboarding / 19-rc-spike / 22-git-workflow / 23-signoff~~ | 已归档 `old/docs-design/`(标记"立"逾年未生效的死壳,2026-08-30 移出;onboarding 由 `GAME-SOP.md` §0/§7 承担) | 🗄 2026-08-30 移出 |
| 20 | [`20-bug-fix-checklist.md`](20-bug-fix-checklist.md) | BUGS 修复后跑哪些 scripts / docs 同步 | ✅ |
| 21 | `21-doc-changelog.md` | 🗑 缺失:由 git log + `GAME-SOP.md` §8 承担,不再单独立文件 | 2026-08-30 裁定 |
| 25 | [`25-intro-scene-lessons.md`](25-intro-scene-lessons.md) | intro 实战教训(改输入/伤害/视野/atlas/RC 前必读,AGENTS 约束 7) | ✅ |
| 26 | [`26-rc-sprite-visual-standard.md`](26-rc-sprite-visual-standard.md) | RC × sprite 视觉标准 | ✅ |
| 27 | [`27-noise-broadcast-system.md`](27-noise-broadcast-system.md) | 噪声/侦察系统规范(Simulation emitNoise) | ✅ |
| ~~24~~ | ~~24-intro-scene-rc-integration-report.md~~ | 已归档 `old/docs-design/`(一次性集成报告) | 🗄 2026-08-30 移出 |
| ~~25~~ | ~~25-rc-intro-scene-learning.md~~ | 已归档 `old/docs-design/`(被 25-intro-scene-lessons 取代) | 🗄 2026-08-30 移出 |
| ~~28~~ | ~~28-visual-rendering-gameplay-design-critique.md~~ | 已归档 `old/docs-design/`(一次性评审) | 🗄 2026-08-30 移出 |
| roles | [`roles/`](roles/) | 角色需求文档(设计/美术/游戏性程序/图形程序/QA,SOP §2 L4) | ✅ 2026-08-30 新 |

## 5. 关卡蓝图(levels/)

| 路径 | 角色 |
|------|------|
| [`m1_intro_scene.md`](../levels/m1_intro_scene.md) | M1 哨塔大院蓝图(唯一关卡事实源;旧 m1_workshop_room1.md 已废弃移除) |

## 6. 归档

| 路径 | 内容 |
|------|------|
| [`old/_archive-2026-08-09/`](../../old/_archive-2026-08-09/) | B33 重置前所有模块(关卡 / RC shader / Simulation / SceneManager / InputManager 等);`README.md` 有完整索引 |
| [`old/docs-design/`](../../old/docs-design/) · [`old/docs-superpowers/`](../../old/docs-superpowers/) · [`old/docs-levels/`](../../old/docs-levels/) | SOP 一致性清理归档(2026-08-30:重复编号 / 一次性报告 / 历史 specs) |

## 7. 文档分层契约(规则)

- **AGENTS / GDD / TDD / GAME-SOP / BUGS** = 顶层权威(MVP-PLAN.md 已废弃),改 = `[TDD-CONTRACT-CHANGE]` / `[DESIGN-LAYER-CHANGE]` 流程
- **docs/design/01-09** = 设计层详细,改 = 同步顶层文档(冲突以顶层为准)
- **docs/design/10-23** = 制作流程,改 = 在 commit message 注明
- **docs/levels/*.md** = 房间蓝图,事实源(TS 由蓝图合入)
- **_archive/** = 只读,不在编译路径

## 8. 文档版本

| 日期 | 变更 |
|------|------|
| 2026-08-08 | 01-04 初步 |
| 2026-08-09 v3 | B12/B13 同步 + 07 加人审门 + 08 重建 + 09 新建 |
| 2026-08-09 v3.1 | 01+04+06 收成 stub + 10-23 流程文档(本文档为索引) |
