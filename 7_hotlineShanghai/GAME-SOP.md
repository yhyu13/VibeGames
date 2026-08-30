# GAME-SOP — Hotline Shanghai 重规划与一致性标准 v1.0

> **结论先行**:这个游戏能不能收敛？能。混乱不是代码问题，是文档治理问题 —— 5 处证据表明顶层权威与索引已经互相漂移（诊断表见 §1）。解法是：1 条权威链、4 套标准（剧情 / 视觉 / 玩法 / 测试）、1 套变更 SOP。代价：每次改动多花 5 分钟过同步清单，换来不再需要第 4 次重冻结。
>
> **本文档角色**:游戏一致性 SOP = 新会话第一读物。与本文冲突的旧文档，以本文 §2 的权威链为准。
> **生效日期**:2026-08-30。本文由本轮"重新规划"任务产出，验收标准见 §8。

---

## 0. 给新会话的三句话

1. 游戏是什么：Hotline Miami 手感 + 1937 上海孤岛暗战 + 真 2D Radiance Cascades 光影（`GDD.md:3`）。
2. 现在做到哪：单场景 `m1_tower_compound` 闭环可玩（拆电 → 清敌 → 撤离 → score/replay），RC visual-only，几何 LOS/LightField 独占 gameplay 权威（`AGENTS.md:12`）。
3. 下一步做什么之前：先读本文 §2（权威链）和 §7（SOP），再读对应层文档。

## 1. 现状诊断（为什么要这份 SOP，2026-08-30 钉证）

| # | 症状 | 证据（文件:行号） | 根因归类 |
|---|------|------------------|---------|
| D1 | 7 个被索引文档不存在 | `docs/design/README.md:31-32`（07/08-level）、`:50-62`（16/17/21）、`:68`（m1_workshop_room1）、`AGENTS.md:11`（MVP-PLAN.md） | 索引无门禁 |
| D2 | 契约版本三处打架 | `TDD.md:1` = v2；`GDD.md:8` = v3；`AGENTS.md:4` = v3.7 | 版本无唯一声明处 |
| D3 | 冻结范围两套说法 | `AGENTS.md:19` "M1 ship = knife 1 件" vs `GDD.md:5` "C96+掷枪+knife"；`AGENTS.md:20` "6 脸谱" vs `AGENTS.md:42` "9 面具" | 数值双写 |
| D4 | 文档编号失控 | 两个 06、两个 24、两个 25；README 声称 17+ 份（`README.md:3`）、实际 27 份内容 md（不含索引自身） | 无编号分配规则 |
| D5 | 单文件内部矛盾 | `AGENTS.md:53` 布局树写 "GDD 冻结 v2" vs 同文件 `:4` v3.7 | 改动只改头部不改全文 |

**根因**：每次迭代"只加不改"—— 新决策写成新文件，旧权威不回收；引用不校验存在性；数值在多处副本。GDD §0.5 的两次重置（`GDD.md:69-94`）本质都是这个病。

## 2. 权威链（唯一真相源分层，改动必须自上而下）

```
L0 GAME-SOP.md            ← 本文：一致性标准 + 变更 SOP（谁先谁后、怎么验收）
L1 AGENTS.md              ← 项目规则 + 当前状态（唯一状态声明处）
L2 GDD.md                 ← 设计权威（剧情/机制 Why）
L3 TDD.md                 ← 数值与接口契约（所有数字的唯一真相源，GDD 不双写）
L4 docs/design/NN-*.md    ← 细化专题（与 L1-L3 冲突时以 L1-L3 为准）
L5 docs/levels/*.md       ← 关卡蓝图（房间事实源，TS 由蓝图合入）
L5.5 KNOWLEDGE.md         ← 长期记忆（新会话先读）
L6 BUGS.md / JOURNEY.md   ← 过程记录，不承载契约
```

**三条硬规则：**

1. **数值只活在 TDD**。GDD、AGENTS、docs/design 出现数值 = 引用（"见 TDD §x"），出现副本即违规（D3 即此病）。
2. **当前版本号只声明在两处**：`AGENTS.md` 头部 + `TDD.md` 头部。其余文档禁止自报版本号，只写"以 AGENTS.md 为准"。
3. **引用必须存在**。任何文档引用的 `文件路径` 必须真实存在；不存在的引用要么补文件、要么删除引用、要么标注 `待确认`。禁止假称已同步（`AGENTS.md:4` 已有此规则，本轮 D1 证明它没被执行）。

## 3. 剧情标准（Plot Standard）

**定义**：剧情一致性 = 每一段文本都能回答"谁、在 1937 孤岛期的哪里、为什么是电话指令"。

| 项 | 标准 | 事实源 |
|----|------|--------|
| 世界观 | 1937.8 淞沪会战 → 11 月起孤岛期；活动范围限法租界/华界边缘（弄堂/茶馆/舞厅/报馆/诊所/渡船/屋顶） | `GDD.md` §2.1-2.2 |
| 玩家身份 | 地下抵抗组织无名线人，只有代号；叙事入口 = 电话指令（打字机文本 + 合成音，不做中文配音） | `GDD.md` §1 |
| 任务结构 | v1 范围 = 1 + 4：`m1_tower_compound` 唯一可玩 + 孤岛邮差为唯一结构差异点（`GDD.md` §0.5 V4）；夜航船/墨水账已砍，不得复活 | GDD §4.6 |
| 敏感度红线 | 敌对 NPC 按职能命名（占领军/伪警/特务/帮派），不写负面族群刻板；每批新文案过 17 号 checklist（文件待补，见 §8 P1） | `GDD.md` §2.4 |
| 文本出口 | 玩家可见文本（任务简报/HUD/结算）改动 = 剧情 patch，须在 PR 描述列出新旧文本对照 | 本文新增 |

**验收**：任何一批剧情改动，抽 3 条玩家可见文本，能追溯到 GDD §2 的世界观条目，且不含砍掉的任务名。

## 4. 视觉标准（Visual Standard）

**定义**：视觉一致性 = 一张新截图放进截图墙，认得出是同一款游戏。

| 项 | 标准 | 事实源 |
|----|------|--------|
| 像素规格 | 16×16 像素角色 + 8 方向步行；tile-based 房间；禁止 3D 透视/真阴影/Bloom | `docs/design/05-character-design.md`、GDD §7 禁止清单 |
| 光影 | 所有光源走 RcPipeline（6 阶段全管线），生产 profile 固定 3 cascades / `baseIntervalPx=6` / half-res / twoLoop；禁止 additive 假光斑 | `AGENTS.md:41`、`docs/design/04-radiance-cascades-pipeline.md` |
| RC↔玩法分界 | RC 只负责"看起来亮"；暴露/半盲/拆灯判定只认几何 LOS + LightField，禁止从 RC 像素反推玩法 | `AGENTS.md:41` |
| 调色板 | 唯一调色板在 `src/core/data/`，UI（tailwind/index.html）与 sprite 同源；新色值先进调色板再使用（B21 教训） | `docs/design/02-art-direction.md` |
| 外部 PNG 例外 | 仅 intro curated set；清单=`references/sprite-samples/approved-intro-assets.json`，流程=`scripts/process-intro-sprites.mjs`；不得扩展为通用资产政策 | `AGENTS.md:40` |
| 可读性 | 暗部不得吃掉像素颗粒（dither/像素化回压）；亮处不得冲白（B24 实测标准：bright>160 占比 <1%） | `docs/design/06-rendering-readability.md` |

**验收**：新视觉改动跑 `npm run intro-polish:check`，对照 `smoke/hotline-e2e-intact.png` 基线；调色板 diff = 0 除非 PR 显式声明改色。

## 5. 玩法标准（Gameplay Standard）

**定义**：玩法一致性 = 任何一个数值/机制行为，查 TDD 一处即得答案，代码与文档无第二套真相。

| 项 | 标准 | 事实源 |
|----|------|--------|
| 核心张力 | "每开一枪之后，世界怎么亮起来"：光 = 警觉开关非护甲 —— 灯亮看见即 0.4s 电报→敌弹 OHK；灯灭敌人半盲可近身；亮处击杀刷增援 | `GDD.md` §12（v3.8 修正） |
| 手感 | 一击必杀（双向）；F 切换硬直 0s；死亡清空武器/弹药/面具/击杀数，从 Room 1 重开 | GDD §0.5 V5/V6 |
| 武器/面具范围 | M1 ship = C96 + 掷枪 + knife（以 GDD §0.5 V1 为准，`AGENTS.md:19` 的 "knife 1 件" 为 stale，见 §8 P0）；面具不 ship 选择流程 | GDD §0.5 V1 |
| 数据表 | 8 武器 / 6 面具 / 5 敌 archetype 数据冻结；新增走 14 号 SOP；"6 vs 9 面具" 以 6 为准（`AGENTS.md:20` + JOURNEY 特性 19），`AGENTS.md:42` 的 9 为笔误 | `docs/design/14-data-table-sop.md` |
| 未实现特性 | 面具效果/grenade AoE/BOSS/暂停计时器等 21-25 号特性为 ❌ 未接线；任何 PR 声称完成它们须附 e2e 证据 | JOURNEY.md 特性清单 |
| 架构 | C.A.T：`core/` 零 THREE/DOM/zustand；RC 管线只放 engine | `docs/design/10-architecture-cat.md` |

**验收**：改动玩法数值 = 改 TDD → 改 data 表 → 改 Simulation，三处同一 PR；tsc 零 error + `npm run e2e:playtest` 绿。

## 6. 测试标准（Testing Standard）

**定义**：测试一致性 = 每类改动有唯一指定的验证门，门不过不进主干。

| 改动类型 | 必跑门 | 证据物 |
|----------|--------|--------|
| 任何代码 | `npx tsc -b --noEmit` 零 error | 终端输出 |
| RC 算法/shader | `npm run rc-lab:check`（7 确定性场景断言） | `smoke/rc-lab.png` |
| 视觉/sprite | `npm run intro-polish:check` | `smoke/` 新基线图 |
| 战斗/机制 | `npm run combat-loop:check` + `npm run e2e:playtest` | 5 张 e2e 截图（intact/broken/detection-death/retry/score-replay） |
| bug 修复 | 先在 `BUGS.md` 登记 + 复现步骤，修复后按 20 号 checklist 回归 | BUGS.md 状态转 FIXED |
| 契约改动 | `[TDD-CONTRACT-CHANGE]` 流程（11 号文档），TDD 与代码同一 PR | changelog 条目 |

**测试环境已知约束**（不重复踩）：headless Chromium rAF 降频 ~2fps，输入线必须 headed（B17）；DEV 钩子 `__gameManifest()` / `__sim` / `__rcPipeline` 是断言入口（`docs/design/13-dev-hooks.md`）。

## 7. 变更 SOP（制作流程）

**S1 加新内容**（新敌人/武器/任务/房间）：
读 GDD 对应节 → 按 14 号 SOP 改 data 表 → 按 8 号（关卡走 `docs/levels/` 蓝图）→ 跑 §6 对应门 → `docs/design/README.md` 索引加行。不满足"显著手感/玩法差异"的纯数值堆砌，直接拒（GDD §0.2 警惕点）。

**S2 改契约**（类型签名/状态机/冻结数值）：
`[TDD-CONTRACT-CHANGE]`（`docs/design/11-contract-change-procedure.md`）→ TDD 与代码同一 PR → `AGENTS.md` 状态行同步 → JOURNEY.md 记一笔。

**S3 修 bug**：
`BUGS.md` 登记（复现步骤必填）→ 最小修复 → §6 回归门 → 状态转 FIXED + 证据截图路径。与契约冲突的修复必须走 S2，禁止静默改契约。

**S4 加新文档**：
- 编号唯一：先查 `docs/design/README.md`，取最大未用编号；**一个编号一个文件**，专题合并进已有编号，禁止出现第二个 06/24/25。
- 三处同步：README 索引 + 顶层文档（若承载契约则 TDD）+ 本 SOP §8 整改清单（若偿还债务）。
- 存在性自检：写完后 `Test-Path` 验证文中所有反引号路径存在。

**S5 会话开工**：
新会话第一读物 = 本 SOP §0-§2 → `AGENTS.md` 状态 → 任务相关层文档。开工前重读 `docs/design/25-intro-scene-lessons.md`（若任务涉及输入/伤害/视野/atlas/RC 亮度/任务闭环）。

**S6 收尾**：
§6 门全绿 → `AGENTS.md` 状态行更新 → JOURNEY.md checkpoint → （大改）memory 存档。

## 8. 首轮整改清单（偿还 D1-D5，按优先级）

| 级 | 项 | 动作 | 状态 |
|----|----|------|------|
| P0 | D2 版本打架 | `TDD.md:1` 头部对齐 v3.7(正文标注"以已验证代码为准,待 v4 重推");`AGENTS.md` 布局树 "冻结 v2" → "冻结 v3" | ✅ 2026-08-30 |
| P0 | D3 范围矛盾 | `AGENTS.md` "knife 1 件" → C96+掷枪+knife;"9 面具" → 6 | ✅ 2026-08-30 |
| P0 | v4 contract-from-code | 从当前已验证代码 + 门禁结果反向重推 TDD v4(§2-§6 每条带 `文件:行号` 锚点;v2 全文存档 `old/TDD-v2-frozen.md`);AGENTS/README 同步 | ✅ 2026-08-30 |
| P1 | D1 缺失引用 | 7 个缺失文件全部处置:README 索引改指现存等价物(`m1_intro_scene.md`/`08-sprite-spec.md`/roles/),MVP-PLAN.md 裁定废弃;16/17 空壳裁定待 v4 一并处理 | ✅ 2026-08-30 |
| P1 | D4 编号失控 | 重复编号对 + 死流程壳(18/19/22/23)+ docs/superpowers + 一次性报告移入 `old/`;README 索引重生成 | ✅ 2026-08-30 |
| P1 | 范围外过期物 | `rc-showcase/`、`v2/`、`_archive-2026-08-09/` 归入 `old/`;修复 `vite.config.ts` 失效 rc-intro-copy input(build 曾断) | ✅ 2026-08-30 |
| P0 | 全链验证门复跑 | 8 门全绿(rc-lab 37+37 / light-break / combat-loop / intro-polish / e2e 4/4 / self-play 3/3);rc-lab spec 归档页面断言移除;B70 性能阈值 epsilon 修正(50.01→51.0,rAF 量化) | ✅ 2026-08-30 自主轮 |

| P1 | 角色需求文档 | `docs/roles/01-05`(设计/美术/游戏性程序/图形程序/QA,技能蒸馏) | ✅ 2026-08-30 |
| P1 | GDD/01 v2 节号引用清理 | GDD 23 处 + 01 stub 12 处 "TDD §x" 重映射到 v4 节号/代码锚点(映射表 = TDD v4 §9);01 的 `../09-*` 路径层级与截图链接修复 | ✅ 2026-08-30 |
| P1 | docs/design 其余文档 v2 节号引用 | 9 文件 51 处替换(04/06/08/09/14/02/11/03/README);终验 `TDD §<数字>` 残留 = 0;连带修复 17 处断链(../ 多跳 + old/ 归档路径 + MVP-PLAN) | ✅ 2026-08-30 自主轮 |
| P2 | 流程固化 | S1-S6 写入新会话 onboarding:由本文 §0/§7 承担,不再单独立 18 号文件 | ✅ 2026-08-30 裁定 |

> **2026-08-30 移动裁定（为什么 rc-lab / RcPipeline 没有移）**：`package.json:20` 的 `rc-lab:check` 是活验证门、`src/engine/RcPipeline.ts` 是权威实现 —— 与 SOP 无冲突，保留。移入 `old/` 的是与 SOP 冲突项：重复编号文档、一次性报告/评审、被取代的历史 specs、被 intro 取代的 `rc-showcase` 演示、既有存档 `v2/` 与 `_archive-2026-08-09/`、从未生效的死流程壳（18/19/22/23）。移动后 `tsc` 0 error + `vite build` 绿（79 modules）。
>
> **重启裁定（2026-08-30，用户问"要不要推倒重来"）**：不重启代码 —— `src/` 是全项目唯一被 e2e/self-play 验证且与事实一致的部分；重启的是文档层：v4 起 contract-from-code，以代码和门禁为真相反向重推 TDD，文档不再写在代码前面。

## 9. 一致性验收 checklist（每次收尾过一遍）

- [ ] 本次改动涉及的数值，TDD 是唯一副本（grep 无第二处硬编码）
- [ ] 版本号只在 AGENTS 头部 + TDD 头部出现
- [ ] 新增/删除的文档已同步 README 索引，编号无冲突
- [ ] 文中引用的路径全部 `Test-Path` 通过
- [ ] §6 对应验证门全绿，证据物路径可查
- [ ] 玩家可见文本过敏感度红线（§3）
- [ ] JOURNEY.md / BUGS.md（如适用）已更新

---

*本文档取代散落在 GDD/AGENTS/README 里的流程性描述中互相冲突的部分；冲突未列明处仍以 GDD（设计）/TDD（数值）为准。*
