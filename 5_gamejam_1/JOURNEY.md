# JOURNEY.md — 《Boss 的焦虑》决策日志

> 记录"我们决定了什么、为什么、按什么顺序"。以下时间线依据 `verification-report.md` 与 git 历史反推；
> 无法从仓库确认的日期 / 理由标 `[待确认]`。生成日期：2026-09-01。

## 项目时间线

| 日期 | 里程碑 / 提交 | 决策与理由 |
|---|---|---|
| 2026-08-06 | 起点（`29c2927`） | 立项：Boss 焦虑 GDD 基线 + 项目骨架；确立"表演焦虑"核心命题 |
| 2026-08-06 | M0 契约冻结（`8b1da6d`，`1364ba3`） | 先冻结 types/constants/events/store/world 与模块 stub；门 1 tsc 绿。决策：文档驱动、先契约后实现 |
| 2026-08-06 | M1/M2 代理批次（`3a4fac0` `a6311c7` `49da23e` `f1a6e04` `400aa20` + 合并提交） | 按部门拆 6 个代理并行交付（core/content/engine/audio/ui），TDD §14 文件所有权白名单；门 2 build 绿（84 modules）。决策：多代理蜂群工作流 |
| 2026-08-06 | M3 集成修复（`c4931eb`） | 冒烟测试发现 F1–F8（uiCommand 无监听、台词 ID 错位、存档形状、结局重开等），全部修复；契约签名与 §4.4.2 数值未变 |
| 2026-08-06 | M3 追加（`fc3ea8f` `3b40470`） | 用户实测反馈 F9–F12：选本无反馈、癫狂戏剧可选导致秒通关、结局返回标题无效、对白卡首句；修复并加入 `STRETCH_FLAGS.madScript` 门控 |
| 2026-08-06 | M4 交互回路重构（`1c1f6be`，`ef19253`） | 用户反馈"看不懂怎么玩"：走位可见化（金色光圈）、左键=攻击扳机、节拍圈真实化、相机重对准、节奏修正（替身 ~6.5s/次）、台词池键容错（F18）、第一幕操作提示 |
| 2026-08-07 | M5 卫生清理 + stretch 上线（`d652bc1`） | 移除合并期残留注释；上线癫狂戏剧 + 隐藏结局链（G09/G10，`STRETCH_FLAGS.hiddenEnding`）；`PLAYER_HIT_INTERVAL` 6.5→8；vitest 引入（85 用例） |
| 2026-08-07 | TDD v1.2 同步（`be764ea`） | 设计文档 01–05 产出，重建 dist 修正与源码脱节 |
| 2026-08-07 | V3 手感 + 呈现迭代（verification-report §V3） | 玩家四点投诉：osu 缩圈方向相反（改 300/100/50 分档 + 早晚箭头）、Boss 悬空 1m（rootY 落地）、走位不转身（updateBossFacing）、焦虑无文字提示（HUD 文字标签）、替身影子无实体（PlayerShadow 剪影小人）。规则与冻结数值未动 |
| 2026-08-07 后 | v2 重制版启动（`e6f50e5` 起） | 在 v1/v2 玩法之上从零重写引擎与 UI，独立项目 `v2/`（端口 5174）。理由：修复旧版手感问题并加入新机制 |
| 2026-08-13 前后 | v2 迭代（`0af8d06` `2de4bfb` `8e086fe`，`b73e7a2` `3d51abb`） | v2 引擎 + UI；live playtest 修复（osu 缩圈方向、HIT 恢复、结局事件、Enter 开始、存档键唯一、逐轮评分事实）；黑屏修复 + 相机相对 WASD + 更紧节奏（bpm 88–120）。三样验证门全绿 |

## 关键决策记录（含 01 对账，见 TDD §2.6 R01–R10 摘要）

- **技术栈全换**（R01）：GDD 原写的 GSAP / Howler / Tone.js / Tweakpane 全部替换为手写 `Tween.ts` / Web Audio 合成 / DEV-only devtools。
- **FSM 大写枚举**（R02）：采用大写 `GamePhase` 枚举为冻结名，01 命名仅注释引用。
- **接口更名**（R03）：`PlayerSurrogateSnapshot` → `PlayerPresence`。
- **击倒语义**（R04）：击倒 1–2 次 → HIT → RECOVER → 继续；第 3 次击倒强制收尾进 EVALUATE（提前谢幕）。
- **freeMode 降级**（R05）：freeMode 为 PERFORM 内部子模式，recover 由 HIT/RECOVER 表达。
- **剧本与隐藏结局门控**（R06/R07）：mad 剧本与隐藏结局为 stretch，由 `STRETCH_FLAGS` 门控；v1.3 已交付。
- **替身不可操作**（R10）：人类不操作替身，由 `core/simulation/playerModel.ts` 模拟（种子 RNG 可复现）。

## 遗留待确认

- v2 与 v1 的归属已定（2026-09-01）：v2（2.0.0）为活跃主线，v1（0.1.0）为 shipped 遗留；契约迁移仍为后续项。
- 门 3 冒烟在 v1.3 变更后是否已重跑 Playwright（verification-report 记录"待补充"）`[待确认]`。
- 空闲局早期谢幕时机（`PLAYER_HIT_INTERVAL` 8）的手感是否已实机确认 `[待确认]`。
