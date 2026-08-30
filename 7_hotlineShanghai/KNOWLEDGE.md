# KNOWLEDGE.md — Hotline Shanghai 长期记忆

> 软件开发循环 pillar 6:新会话先读本文件;决策/事实/坑在发生的当轮追加。chat 里发现的事实不允许只活在 chat 里。
> 过程叙事见 `JOURNEY.md`;权威链与流程见 `GAME-SOP.md`;契约见 `TDD.md` v4。

## 项目治理状态(2026-08-30)

- **TDD v4 = contract-from-code**:从已验证代码反向重推,每数值带 `文件:行号`;v2 全文 `old/TDD-v2-frozen.md`;v2→v4 节号映射表 = TDD v4 §9。
- **GAME-SOP.md = 一致性权威**:权威链 L0-L6、四套标准(剧情/视觉/玩法/测试)、S1-S6 流程、§8 整改清单、§9 收尾 checklist。
- **冲突归档完成**:重复编号文档、历史 specs、一次性报告、`rc-showcase`、`v2/`、`_archive-2026-08-09/`、死流程壳(18/19/22/23)全部 git mv 入 `old/`;`rc-lab/` + `RcPipeline` 保留(活验证门,不可再生资产)。
- **角色需求文档**:`docs/roles/01-05`(设计/美术/游戏性程序/图形程序/QA),技能蒸馏自真实 B 编号教训。

## 关键事实(带基线)

- 验证门基线:`tsc` 0 error → `build` 79 modules → `rc-lab:check` 37+37 → `light-break` → `combat-loop` → `intro-polish` → `e2e` 4/4 → `self-play` 3/3(2026-08-30 全链复跑全绿)。
- 单场景闭环:`m1_workshop`/`m1_tower_compound` 18×12;油灯 (4,3)、knife (2,9)、撤离 D (15,10)、塔守 (13,1)。
- 光=警觉开关(v3.8):`ENEMY_AIM_TELEGRAPH_S=0.4`、`DARK_VISION_MULT=0.5`、亮处击杀刷增援(2/上限10);几何 LOS + `invalidated` 布尔独占 gameplay 权威,RC visual-only。

## 坑(error signature → fix)

- **vite build 断**:rollup input 引用被归档的 `rc-intro-copy/index.html` → 删 input。移动任何进构建路径的目录前先查 `vite.config.ts`。
- **rc-lab 门红(页面 404)**:spec 里引用已归档页面(`rc-showcase`/`rc-intro-copy`)→ 2026-08-30 移除对应 page-level 断言,37+37 场景断言保留。
- **e2e 性能门假红**:`p95FrameMs > 50.01` 连续 3 次且稳定 50.1ms → 阈值 epsilon(0.01)窄于 SwiftShader rAF 量化噪声(50ms=20fps 地板)→ 放宽到 51.0 并留 B70 注释。**判据:均值 ~30ms 健康 + 数值稳定复现 = 阈值问题;数值大幅漂移 = 回归**。
- **PowerShell 链接审计**:相对链接基准目录 = 文件所在目录(`Split-Path`),不是 cwd;`../` 计数要与文件深度一致(01 曾 `../09-*` 多跳一级)。
- **Set-Content 覆盖**:对含中文的 md 批量替换必须 `-Encoding UTF8 -NoNewline`,否则 BOM/换行损坏。

## 开放项(优先级序)

1. `docs/design/` 深层文档(09/12/14/25-27)内容仍按 v2 语境写的章节需人读校对 —— 节号引用已清零,内容级 stale 未逐段核。
2. 未接线特性启用(需契约变更 + e2e 证据):grenade AoE / BOSS / MaskSelect 流程 / enemyFire 事件 / `pauseAndDeath.ts`。
3. 真机(blit 路径)确认:B69 修复属防御性,需非 SwiftShader 环境复验。
4. GDD §4.4/C5 的"6→9 面具"为 M2+ 计划,启用前过 `[TDD-CONTRACT-CHANGE]`。

## 会话协作规则

- 本仓库并行会话多:4_chunbai 路径勿动;commit 需显式请求;`index.lock` 冲突重试勿删。
- 契约改动 = `[TDD-CONTRACT-CHANGE]`:TDD §2-§6 与 `src/core/` 同 PR + 全链门绿。
