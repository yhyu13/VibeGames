# KNOWLEDGE.md — Hotline Shanghai 长期记忆

> 软件开发循环 pillar 6:新会话先读本文件;决策/事实/坑在发生的当轮追加。chat 里发现的事实不允许只活在 chat 里。
> 过程叙事见 `JOURNEY.md`;权威链与流程见 `GAME-SOP.md`;契约见 `TDD.md` v4。

## 项目治理状态(2026-08-30)

- **TDD v4 = contract-from-code**:从已验证代码反向重推,每数值带 `文件:行号`;v2 全文 `old/TDD-v2-frozen.md`;v2→v4 节号映射表 = TDD v4 §9。
- **GAME-SOP.md = 一致性权威**:权威链 L0-L6、四套标准(剧情/视觉/玩法/测试)、S1-S6 流程、§8 整改清单、§9 收尾 checklist。
- **冲突归档完成**:重复编号文档、历史 specs、一次性报告、`rc-showcase`、`v2/`、`_archive-2026-08-09/`、死流程壳(18/19/22/23)全部 git mv 入 `old/`;`rc-lab/` + `RcPipeline` 保留(活验证门,不可再生资产)。
- **角色需求文档**:`docs/roles/01-05`(设计/美术/游戏性程序/图形程序/QA),技能蒸馏自真实 B 编号教训。

## 关键事实(带基线)

- 验证门基线:`tsc` 0 error → `build` → `rc-lab:check` 37+37 → `light-break` → `combat-loop` → `intro-polish` → `e2e` 6/6(M2.2 起含 mask + m2)→ `self-play` 3/3(2026-08-31 M2.3 轮全链复跑全绿)。
- 单场景闭环:`m1_workshop`/`m1_tower_compound` 18×12;油灯 (4,3)、knife (2,9)、撤离 D (15,10)、塔守 (13,1)。
- **M2.3 评分(2026-08-31 `[TDD-CONTRACT-CHANGE]`)**:`total = clamp(0..100, 100 − elapsed×0.5 − hitsTaken×10 + 全拾取+5 + 全拆灯+10)`,纯函数 `simulation/score.ts`,`finishMission` 接线;S 级配方(45s/0受击/全拾取/全拆灯 = 92.5→S)与 ScoreOverlay 文案、C7 对齐——修掉了"公式隐含 S≤20s vs 配方写 45s"的矛盾。`MissionScore` 增 `lampBonus/pickupBonus`。
- 光=警觉开关(v3.8):`ENEMY_AIM_TELEGRAPH_S=0.4`、`DARK_VISION_MULT=0.5`、亮处击杀刷增援(2/上限10);几何 LOS + `invalidated` 布尔独占 gameplay 权威,RC visual-only。
- 面具流程(M2.1,2026-08-30 `[TDD-CONTRACT-CHANGE]`):标题开局 `beginRun()` → `MASK_SELECT`(世界冻结)→ `selectMask` 选完即开打;`start()` 语义不变(重开/门禁复位直入,面具按 V6 死亡清空);`maskSpawns:[]` 仍空 = 只经开局选择不经拾取。契约 = TDD §5.9。
- **M2.2(2026-08-31)**:① 死亡保留面具(V6 修订,start() 回写 activeMask);② `m2_teahouse`「春申茶馆」合入(policeman 首发 / 粉墙 plaster_white + `PAL_WOOD_DARK` 深木地板 / 账房隔断);③ 开局选择门升级两段:beginRun → MISSION_SELECT → selectMission → MASK_SELECT → selectMask → PLAY;④ 通关持久化接线(`GameEngine.recordCompletion` → unlocks/stats → storage.save*,启动水合)—— storage.ts 从死代码变活。
- 坑:`MissionScore.missionId` 是宽 string,写 unlocks 前要收窄成 `MissionId`;`selectMission` 里 `start()` 会覆盖门态相位,先存 inGate 再复位。

## 坑(error signature → fix)

- **vite build 断**:rollup input 引用被归档的 `rc-intro-copy/index.html` → 删 input。移动任何进构建路径的目录前先查 `vite.config.ts`。
- **rc-lab 门红(页面 404)**:spec 里引用已归档页面(`rc-showcase`/`rc-intro-copy`)→ 2026-08-30 移除对应 page-level 断言,37+37 场景断言保留。
- **e2e 性能门假红**:`p95FrameMs > 50.01` 连续 3 次且稳定 50.1ms → 阈值 epsilon(0.01)窄于 SwiftShader rAF 量化噪声(50ms=20fps 地板)→ 放宽到 51.0 并留 B70 注释。**判据:均值 ~30ms 健康 + 数值稳定复现 = 阈值问题;数值大幅漂移 = 回归**。
- **e2e 负载假红(B72)**:并行会话抢机时 perf 断言偶红(均值 36.5/p95 66.7),安静复跑即绿;仅 perf 断言红 + 数值随负载漂移 = 环境问题,不放宽门。
- **e2e 探针必须冻结时间源(B71)**:凡在 evaluate 里手动 `sim.step` 的探针,先 `window.__rcFreezeFrames = true` 冻结实况循环再 `sim.start()` 复位,否则 evaluate 之间的实况帧会把巡逻/FSM 推到未知态;另注意 `emitNoise` 是**发射 tick 瞬时判定**(Simulation.ts:677),半径内所有 patrol 敌同时起疑——探针别把"恰好也在半径内"的原生敌人当断言对象。
- **PowerShell 链接审计**:相对链接基准目录 = 文件所在目录(`Split-Path`),不是 cwd;`../` 计数要与文件深度一致(01 曾 `../09-*` 多跳一级)。
- **Set-Content 覆盖**:对含中文的 md 批量替换必须 `-Encoding UTF8 -NoNewline`,否则 BOM/换行损坏。

## 开放项(优先级序)

1. `docs/design/` 深层文档(09/12/14/25-27)内容仍按 v2 语境写的章节需人读校对 —— 节号引用已清零,内容级 stale 未逐段核。
2. 未接线特性启用(需契约变更 + e2e 证据):grenade AoE / BOSS / `pauseAndDeath.ts`。(enemyFire 已接线,v4 初版误列已修正;~~MaskSelect 流程~~ M2.1 已接线 2026-08-30,契约 = TDD §5.9)
3. ~~真机(blit 路径)确认~~ B69 修复属防御性,需非 SwiftShader 环境复验。
4. GDD §4.4/C5 的"6→9 面具"为 M2+ 计划,启用前过 `[TDD-CONTRACT-CHANGE]`。
5. ~~M2.2 蓝图已立~~ **M2.2 已合入**(2026-08-31,全链绿);蓝图开放裁定已拍板:policeman 上场 / 粉墙+深木地板。
6. M2.0 债务:~~17 号 checklist~~ 已落地 2026-08-30;16 号(zone 视觉参考)仍空壳,M2 内容产出前补。
7. 下一里程碑:M2.3 评分完整化(C7 全拆灯 S 加成)→ M2.4 BOSS(`m3_print` 前可先用 m1/m2 finalBossId)→ M2.5 声景。

## 会话协作规则

- 本仓库并行会话多:4_chunbai 路径勿动;commit 需显式请求;`index.lock` 冲突重试勿删。
- 契约改动 = `[TDD-CONTRACT-CHANGE]`:TDD §2-§6 与 `src/core/` 同 PR + 全链门绿。
