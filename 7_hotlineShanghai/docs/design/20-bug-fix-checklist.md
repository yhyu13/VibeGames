# 20 — BUGS 修复后跑哪些 scripts / docs 同步

> **本文档 = BUGS 修复后必跑的回归 + 必同步的文档清单**。
> 引用 [`BUGS.md`](../../BUGS.md) + [`12-test-playbook.md`](12-test-playbook.md) + [`11-contract-change-procedure.md`](11-contract-change-procedure.md)。
> 改本文件 = `[DESIGN-LAYER-CHANGE]`(Mavis 签核)。

## 1. 修 BUGS 必跑回归门

### 1.1 必跑(任何 BUGS)

```bash
npm run typecheck                            # 类型 0 error
npm run build                                # 生产构建
npm run combat-loop:check                    # 关卡 / AI / tower 结构
npm run e2e:playtest                         # 当前浏览器契约
npm run rc-lab:check                         # RC standalone + production port
```

### 1.2 按 BUGS 区域跑(必)

| BUGS 区域 | 必跑额外测试 |
|----------|------------|
| `gameplay` | `player-check.ts` + `enemy-check.ts` + `lightfield-check.ts` |
| `input` | `smoke.mjs` + `player-check.ts` |
| `render` / `visual` | `intro-polish:check` + `rc-lab:check` + `e2e:playtest` |
| `engine` | `combat-loop:check` + `e2e:playtest` |
| `engine/shaders` | `rc-lab:check` + `e2e:playtest` |
| `simulation/*` | `combat-loop:check` + 对应纯数据 check |
| `data/*` | `combat-loop:check` + `e2e:playtest` |
| `UI` / `components` | `intro-polish:check` + `e2e:playtest` |
| `audio` | `e2e:playtest` + 手测音效 |
| `RC` | `rc-lab:check` + `e2e:playtest` + `lightfield-check.ts` |
| `content` / `level` | `combat-loop:check` + `e2e:playtest` + 手工跑该房间 |

## 2. 必同步的文档(按 BUGS 类型)

### 2.1 gameplay 类

- [ ] `TDD.md` §4.4 / §4.6(数值 / 机制)
- [ ] `GDD.md` §6 / §12(机制叙事)
- [ ] `docs/design/01-concept-core-loop.md` §3 / §4
- [ ] `docs/design/09-blindside-integration.md` §X(v3.1 机制)
- [ ] `MVP-PLAN.md`(若影响 milestone)

### 2.2 input / engine 类

- [ ] `TDD.md` §3 / §15(性能 / RC)
- [ ] `docs/design/06-rendering-readability.md`(若新坑)
- [ ] `docs/design/15-webgl-state-machine.md`(若 WebGL 状态)

### 2.3 render / visual 类

- [ ] `TDD.md` §4.4.8(调色板)+ §15(RC 数值)
- [ ] `docs/design/02-art-direction.md` §4(色值)
- [ ] `docs/design/04-radiance-cascades-pipeline.md` §5(性能预算)+ §6(降级)
- [ ] `docs/design/05-character-design.md` §2.2(动画帧)+ §3(色)
- [ ] `docs/design/06-rendering-readability.md`(加新坑)
- [ ] `docs/design/15-webgl-state-machine.md`(若 WebGL)

### 2.4 simulation / data 类

- [ ] `TDD.md` §5 契约速写(类型)+ §4.4 数值表
- [ ] `docs/design/14-data-table-sop.md`(SOP 字段)
- [ ] 对应 `core/data/*.ts` 文件顶注释
- [ ] `docs/design/01-concept-core-loop.md` §5(数值对账)

### 2.5 UI / components 类

- [ ] `TDD.md` §3.x(性能)+ §5(类型)
- [ ] `docs/design/06-rendering-readability.md` §2(D 条目)
- [ ] 必要时 `docs/design/13-dev-hooks.md`(若加新钩子)

### 2.6 audio 类

- [ ] `TDD.md` §5(配方类型)
- [ ] `docs/design/03-audio-direction.md` §3(配方清单)+ §5(性能)
- [ ] `src/core/data/sfx.ts` 顶部注释

### 2.7 RC 类

- [ ] `TDD.md` §15(管线)+ §3.5(性能)+ §3.6(降级)
- [ ] `docs/design/04-radiance-cascades-pipeline.md` 全部
- [ ] `docs/design/06-rendering-readability.md`(加新坑)
- [ ] `docs/design/15-webgl-state-machine.md`(若状态)
- [ ] `docs/design/09-blindside-integration.md` §X(若机制)

### 2.8 content / level 类

- [ ] `TDD.md` §4.4.5(关卡)+ §4.4.6 / §4.4.7(光 / 调色)
- [ ] `docs/design/08-level-design-workflow.md`(若工作流)
- [ ] `docs/levels/<room-id>.md`(蓝图)
- [ ] `src/core/data/missions.ts` 顶部注释
- [ ] `references/palette-12-v3.png`(若改 zone 调色)

### 2.9 DOC 类(本身就是文档 bug)

- [ ] 同步引用该文档的所有其他文档

## 3. 提交格式

```
fix(7hs): BUGS B<NN> <一句话> (<area>)

- 根因: <1-2 句>
- 修复: <改了什么>
- BUGS B<NN>: OPEN → FIXED

Refs: TDD §X.Y, BUGS B<NN>

- 同步: [docs/design/01..09](按 §2 列表)
- 验证: typecheck ✅ / build ✅ / e2e:playtest ✅
        + <按 §1.2 区域跑的额外测试>

Co-Authored-By: Claude <noreply@anthropic.com>
```

## 4. BUGS 严重度 → 评审深度

| 严重度 | 必走 |
|--------|------|
| `HIGH` | Mavis 全程评审 + 多次跑 1.1 |
| `MED` | Mavis 评审 + 1 次跑 1.1 |
| `LOW` | AI 自决 + 1 次跑 1.1 |
| `DESIGN` | Mavis 终审(走 23 §2.1)+ 关联文档全改 |
| `TEST` / `INFRA` | AI 自决 + 测试本身 |
| `DOC` | 文档本身改 + 引用链全改 |

## 5. 修复后 24h follow-up

- [ ] 跑 12 §2 完整回归门 1 次
- [ ] 看 `__simEvents()` 看新事件是否正常触发
- [ ] 看 `__rcPipeline.state().lastFrameTime` 性能无回退
- [ ] 看 `BUGS.md` 同类 bug 是否有重复 pattern(若有,加进 06 §2)

## 6. 与本文档相关的 BUGS 案例

| BUGS | 修后跑什么 |
|------|----------|
| B01(死亡出生点) | smoke + playtest + player-check |
| B02(碰撞) | playtest + player-check + enemy-check |
| B22(输入丢失) | smoke + player-check + 全 12 §2 |
| B23(投掷原地) | player-check + playtest |
| B24/B28(灯光) | visual-check + rc-lab-check + lightfield-check + playtest |
| B25(像素对齐) | visual-check + playtest |
| B26(动画) | visual-check + playtest |
| B27(灰 void) | visual-check |
| B29/B34-B39(BLINDSIDE 整合) | 全 12 §2 + rc-lab-check |

## 7. 状态

| 项 | 状态 |
|----|------|
| 20 BUGS 修复 checklist | ✅ 2026-08-09 新建 |
| 按区域必跑测试 | ✅ 本文档 §1.2 |
| 按类型必同步文档 | ✅ 本文档 §2 |
| 提交格式 | ✅ 本文档 §3 |
| 24h follow-up | ✅ 本文档 §5 |
| 案例索引 | ✅ 本文档 §6 |
| pre-commit 提示跑回归 | 🕐 |
