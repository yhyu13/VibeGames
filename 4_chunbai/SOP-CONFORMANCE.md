# SOP-CONFORMANCE — 纯白枪骑兵 Pure White Lancer

> 依据 `.claude/docs/GAME-STUDIO-SOP.md` v1.0 的 4-doc 底线审计。生成日期：2026-09-01。

## 底线状态
| 文档 | 审计前 | 审计后 | 备注 |
|---|---|---|---|
| AGENTS.md | ✗ | ✓ | 由代码反推生成 |
| GDD.md | ✗ | ✓ | 由代码反推生成 |
| TDD.md | ✗ | ✓ | 仅含可验证常量，其余 `[待确认]` |
| JOURNEY.md | ✗ | ✓ | 无法还原历史，记录推断状态 |

> 说明：`new_game/` 下原已有 `design-doc.md` / `TDD.md` / `implementation-plan.md` / `verification-report.md` / `docs/how-to-play.md`，但根级 `4_chunbai/` 无 4-doc 底线。本次在根级补齐，并与 `new_game/` 既有文档建立引用关系（根级 TDD 以引用为主、含可核实数值，避免数值重复）。

## 当前所处阶段
- SOP 阶段：Production（有代码、无文档）
- 判断依据：src/ 与 new_game/ 存在可运行代码，但无任何设计/契约文档（根级）

## 本次改动
- 新增 AGENTS.md / GDD.md / TDD.md / JOURNEY.md（根级 4 文档底线）
- 新增本文件 SOP-CONFORMANCE.md

## 剩余差距（下一步）
- [ ] 用 `/reverse-document` 或人工核对反推内容是否准确
- [ ] 补齐 TDD.md 中 `[待确认]` 的数值契约（导弹制导/浮游炮/武器解锁/Boss 追敌实现状态）
- [ ] 走 `/adopt` 生成 epics/stories 以纳入正式生产流程
- [ ] 与作者确认：Roguelike 选关地图 / 乱入 Boss 属「规划中」还是「已废弃」（当前代码为无限波次竞技场）
