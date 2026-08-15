# 18 — 新人 30 分钟入门路径

> **本文档 = 新人 / 平行 session / Mavis 临时替班 30 分钟可达"改一行" 的标准路径**。
> 改本文件 = `[DESIGN-LAYER-CHANGE]`(Mavis 签核)。

## 1. 5 分钟:读什么

按顺序读这 5 份,只看必读段:

| 顺序 | 文档 | 看什么 | 时间 |
|------|------|-------|------|
| 1 | [`README.md`](../../README.md) | 全文 | 1 min |
| 2 | [`AGENTS.md`](../../AGENTS.md) | 全文 | 2 min |
| 3 | [`docs/design/01-concept-core-loop.md`](01-concept-core-loop.md) | §1 一句话 + §1.1 视觉参照 + §6 Why | 1 min |
| 4 | [`docs/design/09-blindside-integration.md`](09-blindside-integration.md) | §1 概述 + §2-§9 提案摘要 | 1 min |

**之后**:
- 已知道:本项目做什么 / 范围 / v3.1 变更 / 核心机制
- 不知道:具体代码 / RC 算法 / 数据表(下面补)

## 2. 10 分钟:跑什么

```bash
# 1. clone + install(若没做)
cd C:\Git-repo-my\VibeGames
cd 7_hotlineShanghai
npm install

# 2. 启动 dev server
npm run dev
# → http://localhost:5184

# 3. 看标题壳 + 进游戏(目前 M1 spike 期间只有标题壳 + Room 1 stub)
# 4. 跑 RC 算法测试台
# 浏览器: http://localhost:5184/rc-lab/
# 自动跑 7 场景 + 数据驱动断言

# 5. 跑当前维护门
npm run typecheck
npm run build
npm run combat-loop:check
npm run light-break:check
npm run intro-polish:check
npm run intro-assets:check
npm run rc-lab:check
npm run e2e:playtest

# 全部应 PASS
```

**之后**:
- 知道:本地能跑 / 当前维护门通过 / RC standalone 与 production port 共 35/35
- 不知道:怎么改一行(下面)

## 3. 10 分钟:改一行

### 3.1 找一行可改的

打开 [`src/core/constants.ts`](../../src/core/constants.ts),找一个 safe 数字:

```ts
// 例:PLAYER_SPEED = 4 → 改 4.5
export const PLAYER_SPEED = 4;
```

### 3.2 改

```ts
export const PLAYER_SPEED = 4.5;
```

### 3.3 跑回归(改一行 → 看效果)

```bash
npx tsc -b --noEmit                       # 0 error
node scripts/player-check.ts              # 验证玩家移动速度变化
node scripts/visual-check.mjs             # 截图
```

### 3.4 commit

```bash
git add src/core/constants.ts
git commit -m "feat(7hs): tweak PLAYER_SPEED 4 → 4.5 (test)

- TDD §4.4.1: PLAYER_SPEED 4 → 4.5
- 验证: tsc ✅ / player-check ✅ / visual-check ✅

Co-Authored-By: Claude <noreply@anthropic.com>"
```

**之后**:
- 知道:改一行 → 跑测试 → 提交,流程完整
- 不知道:改 RC 怎么改(下面)

## 4. 5 分钟:再读 3 份(走深)

| 文档 | 看什么 |
|------|-------|
| [`10-architecture-cat.md`](10-architecture-cat.md) | §1 三层架构 + §5 数据流图 |
| [`12-test-playbook.md`](12-test-playbook.md) | §1 7 脚本清单 + §2 完整回归门 |
| [`14-data-table-sop.md`](14-data-table-sop.md) | §1 8 张表清单 + §2 通用 SOP |

**之后**:
- 知道:本项目所有 docs(17+) / 7 测试 / 8 数据表 / 6 调试钩子
- 知道:要走变更走 11 契约流程
- 可以:改任何模块 / 加新功能 / 提 PR

## 5. 常见新手问题

| 问题 | 答案 |
|------|------|
| RC 是真实现吗? | M2 性能目标是真实现;M1 spike 期间**几何光场**(09 §13),原因 RC 暂不可用 |
| 一击必杀 = ? | damage = 1(任何武器) |
| 怎么加新武器? | 14 §3.2 |
| 怎么加新房间? | 14 §3.6 + 08 §2(先建 md 蓝图,再合入 TS) |
| 怎么调 RC 参数? | `window.__rcSetConfig({ baseRayCount: 8 })` |
| 灯被拆了什么发生? | 0.1s 后灯池坍缩,敌人半盲(视锥 ×DARK_VISION_MULT),可近身安静击杀 |
| 灯亮时敌人看见我会怎样? | 0.4s 瞄准电报后敌弹 OHK;亮处击杀会刷增援 |
| 历史敏感度怎么审? | 17(本文档成稿时已立) |
| 怎么从归档找旧实现? | `_archive-2026-08-09/README.md` |
| 怎么 ship? | MVP-PLAN v3.1 M1.0 spike 完成 = 命题证明 ship |
| 怎么 debug? | 13 调试钩子总览 |
| RC shader 编译失败 | 06 §2.2 D2(GLSL 300 es)+ 15 §2.3 save/restore |
| 帧率掉到 30 以下 | 06 §6 降级 + 13 §2.4 看 `activeCascades` |

## 6. 新人禁区(避免)

- ❌ 改 `core/` 任何文件不加 [DESIGN-LAYER-CHANGE] 注释
- ❌ 改 TDD §5 契约字段不走 11 流程
- ❌ 改数据表不加同步 TDD / GDD / docs/design
- ❌ 跑 `git push --force` master
- ❌ 删 `_archive-2026-08-09/`
- ❌ 用 `git clean -fd`(误删 untracked)
- ❌ 在 `core/` 写 import three / react / zustand
- ❌ 提交 `console.log` debug 代码(用 13 钩子)

## 7. 24 小时 follow-up(第一周该做的)

- [ ] 跑 12 §2 完整回归门 1 次(必)
- [ ] 读 `TDD.md` §5 契约速写(10 min,理解类型)
- [ ] 读 `04-radiance-cascades-pipeline.md`(15 min,理解算法)
- [ ] 改 1 个武器数值(走 14 §3.2)
- [ ] 改 1 个面具描述(走 14 §3.3)
- [ ] 加 1 个 RC 已知坑到 06(走 23 §3.1)
- [ ] 跟 1 个 Mavis 评审(走 23 §3.2)

## 8. 状态

| 项 | 状态 |
|----|------|
| 18 新人入门 | ✅ 2026-08-09 新建 |
| 30 分钟路径 | ✅ 本文档 §1-§4 |
| 常见问题 | ✅ 本文档 §5 |
| 禁区清单 | ✅ 本文档 §6 |
| 24h follow-up | ✅ 本文档 §7 |
| onboarding buddy 配对 | 🕐 |
