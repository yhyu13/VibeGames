# 19 — RC 算法 spike 协议

> **本文档 = 改 RC 算法 / pipeline / shader / lightField 的标准 spike 协议**。
> 启动 / 进展 / 决策点 / done / 收尾 全流程。
> MVP-PLAN §M1.0 spike 已用本协议(参考)。
> 改本文件 = `[DESIGN-LAYER-CHANGE]`(Mavis 签核)。

## 1. spike 启动 5 步

### 1.1 Step 1 — 命名

`spike/7hs-<feature>-<approach>`

例:
- `spike/7hs-rc-cascade-3`
- `spike/7hs-lightfield-geometric`
- `spike/7hs-shader-port-demo`

### 1.2 Step 2 — 写 spike 文档

`docs/spikes/<name>.md`,内容:

```markdown
# Spike: <一句话>

## 目标
- 想验证什么?
- 答完什么问题后转 dev?

## 假设
- H1: <假设 1>
- H2: <假设 2>

## 不做
- ❌ 不做 <范围外的事>

## 决策点
- D1: <必须答的问题 1>
- D2: <必须答的问题 2>
- ...

## 时间盒
- Day 1: <目标>
- Day 2: <目标>
- Day 3: 收尾 + Mavis 评审

## 风险
- <最大风险>
```

### 1.3 Step 3 — 隔离分支

`git checkout -b spike/7hs-<name>`

### 1.4 Step 4 — 起跑模板

- 复制 [`_archive-2026-08-09/src/engine/RcPipeline.ts`](../../_archive-2026-08-09/) v2 起点(若改 RC)
- 复制 [`rc-lab/`](../../rc-lab/) 测试场景(若改算法)
- 起 rc-lab:`npm run dev` → `/rc-lab/`

### 1.5 Step 5 — 跑通 7 场景

`npm run rc-lab:check` 7/7 PASS 才算 spike 启动成功(若改 RC)

## 2. 进展 3 步

### 2.1 每日 stand-up(spike 期间)

每天写一段:
- 昨天做了啥
- 今天做啥
- 卡点(若有)

放 spike 文档末尾,或 commit message。

### 2.2 决策点(D1-D8)记录

每答一个 D,在 spike 文档加:

```markdown
## D1 决策: <题目>
- **答**: <结论>
- **依据**: <数据 / 截图 / 测试结果>
- **影响**: TDD §X.Y / 代码 / 文档
- **日期**: 2026-08-09
- **Mavis 签**: ✅ / ⏳ / ❌
```

### 2.3 每日跑维护 RC + gameplay 浏览器门

`npm run rc-lab:check && npm run e2e:playtest`

任意失败 = 立刻修,不能"明天再说"(回归会飘)

## 3. spike done 5 条件

- [ ] **1. 算法全绿**:`npm run rc-lab:check` standalone + production port 35/35，showcase/intro-copy clean
- [ ] **2. 生产性能达标**:`npm run e2e:playtest` average `<35ms` / p95 `<=50.01ms` / latest RC `<50ms`(当前 720×480 + SwiftShader 门)
- [ ] **3. 决策点全答完**:D1-D8 全部决策落地
- [ ] **4. 文档同步**:TDD / 04 / 06 / 09 / 12 全部更新
- [ ] **5. Mavis 签收**:走 23 §3.2

**未达任一 = spike 没收尾,继续做或归档失败**。

## 4. spike 收尾 3 路径

### 4.1 成功(shipped to dev)

```bash
git checkout master
git merge --no-ff spike/7hs-<name>      # 合入 master
git tag spike-7hs-<name>-done           # 标记完成
# 更新 spike 文档 → docs/spikes/<name>-DONE.md
```

### 4.2 部分成功(分阶段 ship)

- 拆 spike → 1 个 dev commit + 1 个 spike 分支继续
- dev commit 必须 shippable
- spike 剩余部分进 spike/<name>-phase2

### 4.3 失败(归档)

- spike 文档加"## 失败原因"段
- 任何有用产物留 spike 分支(可复现)
- 不合入 master
- 90 天后无动作可删分支

## 5. RC 决策点历史(MVP-PLAN M1.0 spike 09 §11)

| ID | 题目 | 答 | 状态 |
|----|------|-----|------|
| D1 | RC 管线如何在 WebGL2 跑通(sRGB / state 污染) | sRGBColorSpace + save/restore states | ✅(B24/B28) |
| D2 | GLSL 330 → 300 es 迁移 | int → float 显式化 | ✅(B24) |
| D3 | Three ↔ 裸 GL 状态污染 | save/restore CURRENT_PROGRAM + VERTEX_ARRAY_BINDING | ✅(15 §2) |
| D4 | 全屏 pass 写状态 | `gl.drawBuffers([COLOR_ATTACHMENT0])` | ✅(白屏修复) |
| D5 | v3.1 lightField 实现 | 几何光场(暂)/ RC linear cache(待 RC 恢复) | 🕐(09 §13) |
| D6 | v3.1 14 个光暗常量阈值 | 0.30 / 0.10 / 2.0u / 0.5u / 等(09 §13) | ✅(B34) |
| D7 | flashlight_patrol 灯锥参数 | 50° / 0.6Hz | ✅(B36) |
| D8 | cascade=0 降级时光暗机制 | lightField disabled + 停电动画 | ✅(09 §9) |

## 6. spike 期间文档同步清单

| 改 RC | 必同步文档 |
|------|---------|
| 改算法(probe / cascade) | 04 §3 + TDD §15 |
| 改数值常量 | TDD §15.3 + 04 §5 |
| 加新 shader | TDD §15.3 shader 表 + 04 §4 |
| 改 lightField 实现 | TDD §4.6 + 09 §9 + 04 §3.4 + 13 §2.6 + 15 §4 |
| 改降级路径 | TDD §3.6 + 04 §6 |
| 加新已知坑 | 06 §2 + BUGS.md(若严重) |

## 7. spike 期间禁做

- ❌ 改其他模块(集中精力)
- ❌ 改 TDD 契约不走 11 流程
- ❌ 提交未跑通 7 场景的代码
- ❌ 删 spike 文档(失败也要留)
- ❌ 合并未达 done 5 条件的 spike

## 8. 当前活跃 spike

| spike | 启动 | 状态 | 负责人 |
|-------|------|------|-------|
| M1.0 spike(09 §13)| 2026-08-09 | 进行中(Day 1 ✅ / Day 2-3 待)| Mavis + AI |
| _(其他)_ | — | — | — |

## 9. 状态

| 项 | 状态 |
|----|------|
| 19 spike 协议 | ✅ 2026-08-09 新建 |
| 启动 5 步 | ✅ 本文档 §1 |
| 进展 3 步 | ✅ 本文档 §2 |
| done 5 条件 | ✅ 本文档 §3 |
| 收尾 3 路径 | ✅ 本文档 §4 |
| D1-D8 决策历史 | ✅ 本文档 §5 |
| 当前活跃 spike | ✅ 本文档 §8 |
| spike 模板 | 🕐(可加 `docs/spikes/_template.md`) |
