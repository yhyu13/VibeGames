# 11 — `[TDD-CONTRACT-CHANGE]` 契约变更流程

> **本文档 = 改 `TDD.md` 任何契约 / 数值 / 字段 / 状态名 的标准流程**。
> 顶层权威: [`TDD.md`](../../TDD.md);架构: [`10-architecture-cat.md`](10-architecture-cat.md);设计: [`GDD.md`](../../GDD.md)。
> 改本文件 = `[DESIGN-LAYER-CHANGE]`(Mavis 签核)。

## 1. 什么是 TDD 契约

`TDD.md` §5 契约速写 + §4.4 / §4.6 / §4.7 / §15 系列中的:

- **类型签名**:`MaskSpec.effect.kind` / `EnemyArchetype` / `WeaponSpec` 等
- **状态名**:`'patrol' | 'alert' | 'engage' | 'flee'` 等枚举
- **默认数值**:`PLAYER_SPEED = 4` / `LMB_LIGHT_PRIORITY_RANGE = 2.0` / `RC_BASE_RAY_COUNT = 4` 等
- **接口**:`LightField.sampleAt(worldPos) → 0..1` / `SimEvent.broadcast() → engine subscribers` 等
- **字段**:`Enemy.invulnWhileLit: boolean`(v3.1 新增)
- **shader uniforms**:`uLightShieldThreshold` / `uLightExposedThreshold`(B39)

**改任一 = 必须走本文档 §3 流程**。

## 2. 不算契约变更(可直接改)

- §0 / §1 序言 / 章节标题
- §3.x 性能预算(改值前先确认 v3.1 范围不变)— 走本文档
- §15.x 已修复的 known gotchas(走 BUGS)
- 注释 / 排版 / 错别字
- 把表格重新对齐

## 3. `[TDD-CONTRACT-CHANGE]` 流程(7 步)

### 3.1 Step 1 — 提案(Propose)

写一个变更提案(Mavis / AI agent 都可发起),内容:

```markdown
## 提案: <一句话改什么>

### 原因
- 关联 BUGS / design 决策 / 玩家反馈
- 不改会有什么后果

### 改什么
- TDD §X.Y 字段 / 数值 / 签名(具体行号)
- 旧值 → 新值
- 旧类型 → 新类型(若是类型变更)

### 影响范围
- 代码:`src/core/types.ts` / `src/core/constants.ts` / `src/core/data/*` / `src/engine/*`
- 文档:`GDD.md` / `MVP-PLAN.md` / `docs/design/01-09` / `BUGS.md` / `references/*`
- 归档:`_archive-2026-08-09/`
- 测试:`scripts/*-check.mjs` / `scripts/playtest.mjs` / `scripts/visual-check.mjs`

### 回归
- 跑 14 §5 全部验证门
- 手工 playtest N 次(若涉及玩法)
- 跑 rc-lab:check(若涉及 RC)
```

### 3.2 Step 2 — 评审(Review)

- **Mavis 评审** — 必走 [`23-signoff-protocol.md`](23-signoff-protocol.md) §2.1
- **并行 session 影响** — 任何 6 个并行 AI agent 都要 ack(走 23 §5)
- **TDD 上下游** — TDD 改后影响的所有文档都要列出

### 3.3 Step 3 — 改 TDD(Edit TDD)

- 改 [`TDD.md`](../../TDD.md) 对应章节
- **TDD 顶部 changelog 加一行**:`| 2026-08-09 | <提案摘要> | <作者> |`
- 若改类型签名,同步 `src/core/types.ts`(**TDD 改后立刻改**)

### 3.4 Step 4 — 改代码(Implement)

- 改 `src/core/types.ts` / `src/core/constants.ts`(签名 / 数值)
- 改 `src/core/data/*.ts`(数据表)
- 改 `src/core/simulation/*.ts`(实现)
- 改 `src/engine/*.ts`(engine 适配)

### 3.5 Step 5 — 同步下游文档(Sync)

| 文档 | 何时必改 |
|------|---------|
| `GDD.md` | 任何机制 / 数值 / 关卡 |
| `MVP-PLAN.md` | 任何 milestone / spike 范围 |
| `docs/design/01-concept-core-loop.md` | §2 核心循环 / §3 房间内循环 / §4 击杀瞬间 |
| `docs/design/02-art-direction.md` | 调色板 / 风格 |
| `docs/design/03-audio-direction.md` | 音效配方 |
| `docs/design/04-radiance-cascades-pipeline.md` | RC 数值 / shader |
| `docs/design/05-character-design.md` | 角色 / 调色板 |
| `docs/design/06-rendering-readability.md` | 已知坑 / 性能 |
| `docs/design/07-sprite-gen-tasks.md` | sprite 任务 |
| `docs/design/09-blindside-integration.md` | BLINDSIDE 整合 |
| `docs/design/10-architecture-cat.md` | 架构 / 子系统边界 |
| `docs/design/14-data-table-sop.md` | SOP 字段 |
| `BUGS.md` | 若修复 bug,标记 FIXED |

### 3.6 Step 6 — 跑验证门(Verify)

走 [`14-data-table-sop.md`](14-data-table-sop.md) §5:

- [ ] `npx tsc -b --noEmit` 0 error
- [ ] `node scripts/playtest.mjs` 9/9 PASS
- [ ] `node scripts/visual-check.mjs` 0 console error
- [ ] 对应 `*-check.mjs`(player / enemy / lightfield / rc-lab)
- [ ] **手工 playtest** ≥ 3 次(若涉及玩法)
- [ ] **rc-lab:check** ≥ 3 场景(若涉及 RC)

### 3.7 Step 7 — 提交(Commit)

```
<type>(7hs): TDD §X.Y <change> (<reason>)

Refs: TDD §X.Y, BUGS B<NN>, [docs/design/YY](若适用)

- TDD §X.Y: <old> → <new>(field / value / type)
- 同步: <list of synced docs>
- 验证: tsc ✅ / playtest 9/9 ✅ / visual-check ✅ / rc-lab:check ✅
- 提案: <proposal URL or local path>

Co-Authored-By: Claude <noreply@anthropic.com>
Signed-off-by: Mavis <...>
```

## 4. 紧急契约变更(夜车 / spike 期间)

- AI agent 阻塞超过 1 小时,无 Mavis 回复:
  - 走 §3.1-§3.4(提案 + 改 TDD + 改代码)— 自决
  - 跳 §3.2 / §3.5 / §3.7 中需 Mavis 签部分
  - 提交 message 末尾:`[EMERGENCY-CONTRACT-CHANGE: 无 Mavis 签核,自决 + 待复审]`
  - 第二天 Mavis 必审
  - 走 [`23-signoff-protocol.md`](23-signoff-protocol.md) §7

## 5. 反契约变更(降级 / 撤销)

- 已 ship 的契约若要撤销 / 降级,走 §3 流程(提案说明"为什么撤销")
- 撤销的契约**不**直接删 TDD,加 `[DEPRECATED <date>]` 标记,保留 1 个 milestone 看回滚效果
- 1 个 milestone 后无回滚 = 正式删 TDD,changelog 加 `[REMOVED]`

## 6. TDD 自身维护(TDD 作为文档的更新)

- **TDD changelog**(顶部表):每次 TDD 改都加一行
- **TDD §0.1 范围声明**:每次大改同步
- **TDD §0.5 reset 标志**:B33 / 未来重置时加
- **TDD 章节 vs 实现**:每章开头列"对应实现位置 `src/...`",反之亦然

## 7. 状态

| 项 | 状态 |
|----|------|
| 11 契约变更流程 | ✅ 2026-08-09 新建 |
| 7 步流程 | ✅ 本文档 §3 |
| 紧急流程 | ✅ 本文档 §4 |
| 反契约变更流程 | ✅ 本文档 §5 |
| TDD 自身维护 | ✅ 本文档 §6 |
| pre-commit 检查 TDD 改后是否同步 docs | 🕐 待加 |
