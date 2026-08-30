# 23 — Mavis 签核流程

> **本文档 = 跨多人 / 跨 session 决策的标准签核流程**。
> 当前唯一签核人 = Mavis(项目 owner);AI agent 提交变更后,Mavis 评审 / 签收 / 打回。
> 涉及 [`AGENTS.md`](../../AGENTS.md) 重大决策 / [`TDD.md`](../../TDD.md) 契约变更 / 美术人审 / 跨 session 影响 → 必走签核。
> 改本文件 = `[DESIGN-LAYER-CHANGE]`。

## 1. 角色

| 角色 | 谁 | 何时介入 |
|------|-----|---------|
| **Mavis** | 项目 owner(人) | 评审变更 / 决策点 / 签收 |
| **Claude / Kilo / 其他 AI agent** | 提交者(AI) | 改代码 / 改文档 / 跑 spike |
| **并行 session**(本项目多 session) | 6 个并行 AI | 同上,需协调 |

## 2. 哪些变更必须签核(强约束)

### 2.1 顶层文档变更(必签)

| 文档 | 必签条件 |
|------|---------|
| `GDD.md` | 任何 §0 / §1 / §2 / §6 / §12 改 |
| `TDD.md` | 任何 §0 / §5 契约 / §4.4 / §4.6 / §15 改 |
| `MVP-PLAN.md` | 任何 milestone / spike / agent 拆分改 |
| `AGENTS.md` | 任何"硬规则" / "v3.1 范围"段改 |
| `BUGS.md` | `DESIGN` 状态变更(`OPEN ↔ FIXED` 走签) |
| `docs/design/09-blindside-integration.md` | 任何 proposal / 决策改 |
| `docs/design/10-architecture-cat.md` | C.A.T 硬规则改 |
| `docs/design/14-data-table-sop.md` | SOP 改 |

### 2.2 数据表变更(必签)

- 8 张表任何**新增 / 删除**一条
- 任何**字段定义**改(走 [`11-contract-change-procedure.md`](11-contract-change-procedure.md) 流程,Mavis 终审)

### 2.3 美术内容(必签)

- 任何 sprite 加入 `core/data/sprites.ts`(走 07 + 17 checklist)
- 任何任务文本 / 文案 / 截图标题(走 17)
- 任何 references/ 新增图(Mavis 看是否符合 zone 调色)

### 2.4 跨 session 影响(必签)

- 改 6 个子项目共用部分(`AGENTS.md` / 端口 / monorepo 结构)— 走 22
- 改 `package.json` 共享 dependency
- 改 `.gitignore`(影响所有子项目 untracked 处理)

### 2.5 RC / 算法重大决策(必签)

- 09 §11 的 D1-D8 决策点(关 RC 性能 / 改 lightField 实现 / 改 mask 阈值)
- 06-rendering-readability 任何新坑加入
- rc-lab/ 算法变更

## 3. 签核流程

### 3.1 提交前(AI agent 责任)

- [ ] **1. 自查**:本变更是否在 §2 必签列表?
- [ ] **2. 自我评审**:
  - 改 TDD 走 [`11-contract-change-procedure.md`](11-contract-change-procedure.md) §3
  - 改数据表走 [`14-data-table-sop.md`](14-data-table-sop.md) §2
  - 改美术走 [`07-sprite-gen-tasks.md`](07-sprite-gen-tasks.md) §7 + [`17-historical-sensitivity-checklist.md`](17-historical-sensitivity-checklist.md)
- [ ] **3. 跑验证门**(14 §5):
  - `npx tsc -b --noEmit` 0 error
  - `npm run e2e:playtest` 当前维护套件 PASS
  - `node scripts/visual-check.mjs` 0 console error
  - 对应 `*-check.mjs`(player / enemy / lightfield / rc-lab)
- [ ] **4. 写 PR 摘要 / commit message**:
  - 改了什么(代码 / 文档 / 数据)
  - 为什么改(关联 BUGS / TDD / GDD)
  - 验证门结果
  - 风险 / 副作用
- [ ] **5. 等 Mavis 评审**

### 3.2 Mavis 评审(必读项)

- [ ] **1. 走对流程了吗?** — 看 §2 / §3.1
- [ ] **2. TDD 一致性** — 数值 / 字段 / 契约是否与 TDD 一致
- [ ] **3. C.A.T 边界** — `core/` 是否真平台纯净(无 THREE / DOM / zustand)
- [ ] **4. 数据表完整性** — 同步 TDD / GDD / docs/design
- [ ] **5. 历史敏感度** — 是否过 17 checklist(美术 / 文案)
- [ ] **6. 验证门** — tsc / playtest / visual-check 通过?
- [ ] **7. 跨 session 影响** — 是否破坏其他 session 工作

### 3.3 签收 / 打回

**签收**:
- commit message 末尾加 `Signed-off-by: Mavis <...>`
- 或在 PR / 评审记录写"✅ Mavis 2026-08-09 签收"

**打回**:
- 评论说明"打回原因:..."
- AI agent 据此修改 → 重新走 §3.1 → 重新签

## 4. 不需签核的变更(AI agent 自决)

- 文档 typo / 错别字 / 链接修正
- 注释 / 行内说明
- 跑 spike / 实验性代码(spike 完必走签核才能合入)
- `BUGS.md` 标记 `OPEN`(尚未修)
- 测试脚本的 dev iteration

## 5. 跨 session 协调(6 个并行 AI)

### 5.1 避免同时改同一文件

- 改前先 `git status` 看是否已有未提交改动
- 改后**立刻 commit**(避免其他 session 拉错)
- 多个 session 同时改同一文件 = 必然冲突,先沟通

### 5.2 session 间消息

- 用 `SendMessage` 工具(to=`main` 或队友)
- 例:"我正在改 TDD §4.4.1 武器表,你别动这块,30 分钟后好"
- 重要决策 / 文件 lock = 走 Mavis 协调

### 5.3 跨 session commit 冲突

```bash
git pull --rebase         # 拉最新 + 线性
# 若 rebase 失败:
git status                # 看冲突文件
# 解决后:
git add <resolved>
git rebase --continue
```

## 6. 签核登记(本项目跟踪)

| 日期 | 变更 | 签核人 | 备注 |
|------|------|-------|------|
| 2026-08-08 | M0 scaffold(GDD v2 / TDD v2 / 文档 01-04)| Mavis | ✅ |
| 2026-08-09 | v3 reset(B33)— 移除 4 任务 / 13 房间 / 全部场景实现 | Mavis | ✅ |
| 2026-08-09 | v3.1 BLINDSIDE 整合(B29 ADOPTED + B34-B39)+ 9 面具 | Mavis | ✅ |
| 2026-08-09 | v3.1 doc audit(01+04+06 收成 stub + 10-23 流程)| Mavis | ⏳(本次) |

## 7. 紧急签核(夜车 / 阻塞)

- AI agent 阻塞超过 1 小时,无 Mavis 回复:
  - 走"不需签核"项(§4)自决
  - 写清楚"无 Mavis 签核,自决 + 待复审"在 commit message
  - 第二天 Mavis 必审

## 8. 状态

| 项 | 状态 |
|----|------|
| 23 签核流程 | ✅ 2026-08-09 新建 |
| Mavis 角色定义 | ✅ 本文档 §1 |
| 必签变更清单 | ✅ 本文档 §2 |
| 跨 session 协调 | ✅ 本文档 §5 |
| 签核登记表 | ✅ 本文档 §6 |
| 自动化 pre-commit 提醒必签项 | 🕐 待加(目前靠人 + 23 §3.1) |
