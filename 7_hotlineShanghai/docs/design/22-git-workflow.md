# 22 — Git 工作流(branch / commit / PR / monorepo 协调)

> **本文档 = 本项目 Git 使用规则**。
> 项目结构:子项目 `7_hotlineShanghai/` 嵌在 monorepo `C:\Git-repo-my\VibeGames\`(无独立 .git)。
> 顶层权威: [`AGENTS.md`](../../AGENTS.md);本文档 = Git 操作细则。
> 与本文档冲突 = bug,改本文件 = `[DESIGN-LAYER-CHANGE]`。

## 1. monorepo 现实

- **唯一 git 根** = `C:\Git-repo-my\VibeGames\`(子项目无 .git)
- 6 个并行子项目:`1_*` ... `7_hotlineShanghai`
- 同一 branch 可同时改 6 个子项目(常态)
- **本项目变更必须用 `git -C "C:\Git-repo-my\VibeGames"` 或在子项目目录中操作**;不用 cd 到 monorepo 根

## 2. branch 命名

```
<type>/<subproject>-<short-desc>
```

| type | 用途 | 例 |
|------|------|-----|
| `feat/` | 新功能 | `feat/7hs-blindsight-lightfield` |
| `fix/` | 修 bug | `fix/7hs-b22-input-loss` |
| `docs/` | 文档 | `docs/7hs-v31-doc-audit` |
| `refactor/` | 重构(无行为变化) | `refactor/7hs-simulation-extract-rcnodes` |
| `spike/` | 技术探索(不 ship) | `spike/7hs-rc-geometric-lightfield` |

**规则**:
- 默认在 `master` 上工作(单提交 short-lived)
- 长任务(>1 小时)开 branch,PR 回 master
- `master` 总是 shippable(任何 commit = 可启动)
- **不**用 `develop` / `release-*`(太重)

## 3. commit message

### 3.1 格式

```
<type>(<scope>): <subject>            (≤72 字符,祈使句)

<body>                                 (可选,wrap 72 列,解释"为什么")

Refs: <BUGS / TDD / GDD / MVP refs>
Co-Authored-By: Claude <noreply@anthropic.com>   (如果用了 AI)
```

### 3.2 type

| type | 用途 |
|------|------|
| `feat` | 新功能(用户可见) |
| `fix` | 修 bug |
| `docs` | 文档(无代码) |
| `style` | 格式化(无行为) |
| `refactor` | 重构(无行为) |
| `test` | 加测试 |
| `chore` | 杂项(版本号 / gitignore 等) |

### 3.3 scope

- `7hs` = 本项目(子项目编号,vs `4chunbai` / `5gj1` / `6pong3d`)
- 例:`feat(7hs):` / `fix(7hs-b22):` / `docs(7hs):`

### 3.4 subject

- 中文或英文都行(本项目偏好中文 + 关键英文术语)
- 例:`feat(7hs): M0 scaffold + v3.1 BLINDSIDE integration (光下无敌/暗中可杀)`
- 例:`docs(7hs): audit pass 1 — AGENTS/README/07 + archive index`

### 3.5 body

- 解释"为什么"和"改了什么",不重复 subject
- 长变更用 bullet 列表
- 必含:**Refs**(指 BUGS / TDD / GDD / MVP 章节)
- 必含:**验证门**(typecheck ✅ / build ✅ / e2e:playtest ✅ / 对应子系统门 ✅)

## 4. 提交粒度(强约束)

- ✅ **每 commit = 一个独立可 shippable 单元**:
  - 一份文档(可独立合并)
  - 一个 BUGS 修复(可独立验证)
  - 一个数据表变更(可独立回归)
  - 一个新功能 spike 阶段(可独立 demo)
- ❌ **禁止 megacommit**:
  - "feat(7hs): 文档 + 数据 + 引擎 + 美术" = 拆 4 commit
  - 跨 6 子项目 = 拆 6 commit
- ❌ **禁止无说明 commit**:
  - "wip" / "fix" / "test" 必带 body 说明

## 5. PR / merge

### 5.1 单人项目(常态)

- `master` 直推(无 PR)
- 提交前本地跑:`npm run typecheck` + `npm run build` + `npm run e2e:playtest` + 对应子系统门
- commit 后:**不** rebase(其他并行 session 可能在同 branch)

### 5.2 branch 模式(长任务)

- `git checkout -b feat/7hs-<desc>` 从 `master`
- 中间 commit 可以 WIP(不强制 shippable)
- 完成时:`git checkout master && git merge --no-ff feat/7hs-<desc>`
- merge 后保留 branch(可追溯),不删
- 不 rebase 已 push 的 commit(其他 session 可能已 pull)

## 6. monorepo 多子项目协调

### 6.1 同时改 6 个子项目

- 一个 commit 只改 1 个子项目(用 scope 区分)
- 例:`fix(6pong3d): ...` 和 `feat(7hs): ...` = 2 commit,不要合

### 6.2 子项目间的引用

- 子项目**禁止** import 另一个子项目的 `src/`
- 子项目**禁止** import 另一个子项目的 `core/`(就算同结构)
- 共用代码:提到 monorepo 根 `lib/`(目前没有,需要时新建)

### 6.3 端口协调

| 子项目 | 端口 | 状态 |
|--------|------|------|
| 1_ | - | - |
| 2_ | - | - |
| 3_ | - | - |
| 4_chunbai | 3000 | npm run dev |
| 5_gamejam_1 | 5173 | npm run dev |
| 6_patapong3D | 5183 | npm run dev |
| **7_hotlineShanghai** | **5184** | **npm run dev** |

> 选 5184(避 3000/5173/5183)。**不**用 8000(子项目内部 dev server)。

### 6.4 跨子项目 PR

- 一般不发生(子项目独立)
- 若发生(共用 `lib/`):`feat(shared):` scope,需 6 个子项目 owner 评审

## 7. 危险操作禁令

| 操作 | 禁止原因 | 替代 |
|------|---------|------|
| `git push --force` master | 破坏其他 session 拉的 history | 永远不用(用 revert) |
| `git rebase -i master` 已 push | 同上 | 不用 |
| `git clean -fd` | 误删 untracked(尤其是 `_archive/`) | 不用,手动删 |
| `git reset --hard HEAD@{n}` | 误丢 commit | 不用,`git reset HEAD@{n}` 保留 working copy |
| `rm -rf _archive/` | 归档可恢复(B33 教训) | 永远不用 |
| `git checkout -- .` | 误丢未提交修改 | 不用,先 `git stash` |

## 8. 撤销 / 回滚

### 8.1 撤销 last commit(未 push)

```bash
git reset --soft HEAD~1       # 保留修改,撤 commit
git reset HEAD~1              # 保留 working copy,撤 staging
```

### 8.2 撤销已 push commit

```bash
git revert <sha>              # 新 commit 反向,不破坏 history
```

### 8.3 误删文件

```bash
git checkout HEAD -- <path>   # 从 HEAD 恢复
```

### 8.4 误删 commit

```bash
git reflog                    # 找 sha
git reset --hard <sha>        # 回到该 commit
```

## 9. 子模块 / 子项目(目前无)

- 目前 monorepo 6 个子项目都是平铺(无 git submodule)
- 若未来拆分:`git subtree` 不用 `git submodule`(后者体验差)
- 若加 .gitignore:`.gitignore` 在子项目根 + monorepo 根各一份

## 10. 提交者 / 签核

- 提交者 = `yhyu13`(git config)
- 涉及 RC 重大决策 / 历史敏感度内容 → 走 [`23-signoff-protocol.md`](23-signoff-protocol.md)
- 涉及 TDD 契约变更 → 走 [`11-contract-change-procedure.md`](11-contract-change-procedure.md)

## 11. 状态

| 项 | 状态 |
|----|------|
| 22 Git 工作流 | ✅ 2026-08-09 新建 |
| monorepo 协调规则 | ✅ 本文档 §6 |
| 端口分配表 | ✅ 本文档 §6.3 |
| 提交模板 | ✅ 本文档 §3 |
| 强制 shippable commit | ✅ 14 SOP §5 验证门 |
| 自动化 pre-commit(跑 tsc / playtest) | 🕐 待加(目前靠人跑) |
