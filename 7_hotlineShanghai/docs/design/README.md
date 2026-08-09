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
| [`MVP-PLAN.md`](../../MVP-PLAN.md) | 里程碑 + agent 拆分 | 209 |
| [`BUGS.md`](../../BUGS.md) | bug tracker | — |

## 1. 概念与设计基础(01-09)

| # | 文档 | 角色 | 状态 |
|---|------|------|------|
| 01 | [`01-concept-core-loop.md`](01-concept-core-loop.md) | 概念 + Why stub(指 GDD §1-§3 + TDD §4.4/§4.6) | ✅ v3.1 |
| 02 | [`02-art-direction.md`](02-art-direction.md) | 美术方向(调色板 / 像素 / 历史敏感度) | ✅ |
| 03 | [`03-audio-direction.md`](03-audio-direction.md) | 音频方向(Web Audio 程序化合成) | ✅ |
| 04 | [`04-radiance-cascades-pipeline.md`](04-radiance-cascades-pipeline.md) | RC 教学层(算法直觉 + 移植源) | ✅ v3.1 |
| 05 | [`05-character-design.md`](05-character-design.md) | 角色设计(8 方向 / 16×16 / 调色板) | ✅ |
| 06 | [`06-blindside-lessons.md`](06-blindside-lessons.md) | BLINDSIDE 评审笔记(7 条提案) | ✅ |
| 06 | [`06-rendering-readability.md`](06-rendering-readability.md) | RC 已知坑附录(D1-D6 + v3.1.1/2) | ✅ v3.1 |
| 07 | [`07-sprite-gen-tasks.md`](07-sprite-gen-tasks.md) | sprite 任务清单(v3.1 走几何光场) | ✅ v3.1 |
| 08 | [`08-level-design-workflow.md`](08-level-design-workflow.md) | 关卡 md 蓝图 → TS 工作流 | ✅ |
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
| 18 | `18-onboarding-30min.md` | 新人 30 分钟路径(读什么 / 跑什么 / 改一行 / 回归) | 🕐 立 |
| 19 | `19-rc-spike-protocol.md` | RC 算法 spike 协议(启动 / D1-D8 / done) | 🕐 立 |
| 20 | `20-bug-fix-checklist.md` | BUGS 修复后跑哪些 scripts / docs 同步 | 🕐 立 |
| 21 | `21-doc-changelog.md` | docs/design/ 变更日志 | 🕐 立 |
| 22 | `22-git-workflow.md` | branch / commit / PR 模板 / monorepo 协调 | 🕐 立 |
| 23 | `23-signoff-protocol.md` | Mavis 签核流程 | 🕐 立 |

## 5. 关卡蓝图(levels/)

| 路径 | 角色 |
|------|------|
| [`m1_workshop_room1.md`](../levels/m1_workshop_room1.md) | M1 spike 房间(码头仓库 lilong,10×9,1 油灯 + 1 `flashlight_patrol` + knife) |

## 6. 归档

| 路径 | 内容 |
|------|------|
| [`_archive-2026-08-09/`](../../_archive-2026-08-09/) | B33 重置前所有模块(关卡 / RC shader / Simulation / SceneManager / InputManager 等);`README.md` 有完整索引 |

## 7. 文档分层契约(规则)

- **AGENTS / GDD / TDD / MVP-PLAN / BUGS** = 顶层权威,改 = `[TDD-CONTRACT-CHANGE]` / `[DESIGN-LAYER-CHANGE]` 流程
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
