# 12 — 测试 / 冒烟剧本库

> **本文档 = `scripts/*.mjs / *.ts` 7 个测试脚本的使用手册**。
> 验证门: 14 §5 + BUGS 修复后必跑。
> 改本文件 = `[DESIGN-LAYER-CHANGE]`(Mavis 签核)。

## 1. 7 个脚本清单

| # | 脚本 | 用途 | 何时跑 | 跑多久 |
|---|------|------|-------|-------|
| 1 | `scripts/playtest.mjs` | 9 场景端到端 + 截图 | **改 gameplay / RC / 数据表必跑** | ~5 min |
| 2 | `scripts/smoke.mjs` | 基础冒烟(启动 / 输入 / 暂停 / 死亡) | **改 engine / input 必跑** | ~30s |
| 3 | `scripts/visual-check.mjs` | 截图 + RC 状态 + console error | **改 RC / render / sprite 必跑** | ~1 min |
| 4 | `scripts/rc-lab-check.mjs` | RC 算法 7 场景 + 断言 | **改 shader / pipeline 必跑** | ~30s |
| 5 | `scripts/player-check.ts` | 玩家移动 / 攻击 / 投掷 / 拾取 | **改 player.ts / weapons.ts 必跑** | ~10s |
| 6 | `scripts/enemy-check.ts` | 敌人 AI / 视野 / 听觉 / 巡逻 | **改 enemyAI.ts / enemies.ts 必跑** | ~10s |
| 7 | `scripts/lightfield-check.ts` | lightField 几何 + 3 场景 | **改 lightField.ts / 09 §9 必跑** | ~10s |

## 2. 完整回归门(14 §5 + 改 BUGS 必跑)

```bash
# 顺序:轻 → 重
npx tsc -b --noEmit                       # 1. 类型(必须 0)
node scripts/player-check.ts              # 2. 玩家(必须 0 fail)
node scripts/enemy-check.ts               # 3. 敌人(必须 0 fail)
node scripts/lightfield-check.ts          # 4. lightField(必须 3/3 PASS)
node scripts/rc-lab-check.mjs             # 5. RC 算法(必须 7/7 PASS)
node scripts/smoke.mjs                    # 6. 冒烟(必须 0 error)
node scripts/playtest.mjs                 # 7. 端到端(必须 9/9 PASS)
node scripts/visual-check.mjs             # 8. 视觉(必须 0 console error)
```

**总时长**:~7 min(headless 跑 + headed 截图)

## 3. 各脚本详细使用

### 3.1 `playtest.mjs`(9 场景端到端,559 行)

**目的**:跑通 9 个 game-flow 场景,每场景截图 + 状态断言。

**9 场景清单**(看脚本顶部注释):
1. Title → 进入游戏
2. Mission Select → 选 m1_workshop
3. Mask Select → 选 actor
4. Room 1 → 走位 + 拾 knife
5. Room 1 → 拆油灯
6. Room 1 → 杀 flashlight_patrol(暗中)
7. Room 1 → 杀 flashlight_patrol(光下,应被反弹)
8. 任务结束 → S/A/B/C 评分
9. 死亡 → 1.2s 重开

**失败时**:
- 看 `smoke/playtest-NN-<scene>.png` 截图
- 看 `console.log` 状态
- 看 `__rcPipeline.state()` 字段

**入口**:`node scripts/playtest.mjs` → 自动起 dev server + 跑 9 场景

### 3.2 `smoke.mjs`(基础冒烟,135 行)

**目的**:快速验证 engine / input / 暂停 / 死亡 4 大基础通路。

**4 大通路**:
1. dev server 启动 + Vite HMR 正常
2. 输入管线通(WASD / 鼠标 / F / LMB / E / Shift / Tab)
3. PauseOverlay 显隐 + snapshot.paused 状态
4. 死亡 → 1.2s 重开

**失败时**:看 stdout(已 inline 打印),无截图。

**入口**:`node scripts/smoke.mjs`

### 3.3 `visual-check.mjs`(截图 + RC 状态,118 行)

**目的**:截图 + 读 `window.__rcPipeline` 状态 + console error 收集。

**3 步**:
1. 启动 dev + 进 Room 1
2. 截 3 张图(M1-spoke / final-room1-frozen / smoke-04-room1)
3. 读 RC 状态 + console 错误

**判断 PASS**:
- 全屏亮像素分布 mid 60-80%(B27 修复后)
- RC 状态 `activeCascades ≥ 1`
- console 0 error
- 截图与 `references/hotline-miami-screenshots/` 调色板基准一致

**入口**:`node scripts/visual-check.mjs`

### 3.4 `rc-lab-check.mjs`(RC 算法 7 场景,86 行)

**目的**:在 `http://localhost:5184/rc-lab/` 自动跑 7 个 RC 算法测试场景。

**7 场景**(参考 `rc-lab/scenes.ts`):
1. radial falloff
2. wall shadow
3. diffraction
4. dual-color light merge
5. furniture room
6. muzzle flash
7. stress(高光源密度)

**判断 PASS**:每个场景的数据驱动断言全绿(具体阈值看 `rc-lab/verify.ts`)。

**入口**:`npm run rc-lab:check`(= `node scripts/rc-lab-check.mjs`)

### 3.5 `player-check.ts`(玩家子系统,73 行)

**目的**:玩家移动 / 攻击 / 投掷 / 拾取 4 大动作的纯数据模拟。

**4 大动作**:
1. 移动(WASD 任意方向,验证不穿墙)
2. 攻击(LMB 0.5s 间隔,验证 OHK)
3. 投掷(E 长按 0.25s,验证抛出 + 不可立刻拾)
4. 拾取(验证 THROWN_PICKUP_DELAY_S=0.5)

**判断 PASS**:所有断言 0 失败。

**入口**:`node --experimental-strip-types scripts/player-check.ts`

### 3.6 `enemy-check.ts`(敌人子系统,68 行)

**目的**:敌人 AI 状态机 / 视野 / 听觉 / 巡逻 4 大行为的纯数据模拟。

**4 大行为**:
1. patrol → alert(看到玩家)
2. alert → engage(进入开火距离)
3. flashlight_patrol 灯锥扫描
4. 受光护甲(ENEMY_INVULN_WHILE_LIT)状态

**判断 PASS**:所有断言 0 失败。

**入口**:`node --experimental-strip-types scripts/enemy-check.ts`

### 3.7 `lightfield-check.ts`(lightField 几何,70 行)

**目的**:09 §9 几何光场 + 3 场景。

**3 场景**:
1. 单灯 4 角点照度
2. 双灯 merge
3. 灯被拆 → 退化为背景

**判断 PASS**:3/3 PASS。

**入口**:`node --experimental-strip-types scripts/lightfield-check.ts`

## 4. 冒烟剧本库(快速排查模板)

| 症状 | 跑什么 | 看什么 |
|------|-------|-------|
| 玩家不动 / 不攻击 | `smoke.mjs` + `player-check.ts` | input event + sim state |
| 敌人不发现玩家 | `enemy-check.ts` | viewDistance / viewArcDeg |
| RC 全黑 / 灯不亮 | `rc-lab-check.mjs` + `visual-check.mjs` | shader 编译错误 + RC state |
| lightField 不对 | `lightfield-check.ts` | threshold 值 + 几何计算 |
| 帧率掉 | `visual-check.mjs` + `__rcPipeline.state()` | activeCascades / JFA pass 数 |
| 任务打不开 | `playtest.mjs` | Mission Select 截图 |
| 死亡不复位 | `smoke.mjs` | pauseAndDeath.ts |
| 拾取不到 | `player-check.ts` | thrownWeapons 队列 |

## 5. 写新测试脚本的 SOP

加新 `scripts/<feature>-check.mjs` 时:

- [ ] **1. 定位**:放 `scripts/<feature>-check.mjs` 或 `.ts`
- [ ] **2. 注释头**:写明目的 / 何时跑 / 失败如何解读
- [ ] **3. 纯数据**:能纯数据模拟的不依赖 Playwright / dev server(`player-check` / `enemy-check` / `lightfield-check` 都纯数据)
- [ ] **4. 截图 + 状态断言**:需要 dev server 的脚本(playtest / visual)必带截图 + `__*` 状态
- [ ] **5. 加进 §2 完整回归门**
- [ ] **6. 加进 §1 清单**

## 6. CI / 自动化(待加)

| 项 | 状态 |
|----|------|
| 7 脚本入 pre-commit | 🕐 |
| 7 脚本入 GitHub Actions(若 monorepo 加 CI) | 🕐 |
| 性能预算 watch(每 10 min 跑一次 visual-check) | 🕐 |

## 7. 状态

| 项 | 状态 |
|----|------|
| 12 测试手册 | ✅ 2026-08-09 新建 |
| 7 脚本使用说明 | ✅ 本文档 §3 |
| 完整回归门 | ✅ 本文档 §2 |
| 冒烟剧本库 | ✅ 本文档 §4 |
| 写新测试 SOP | ✅ 本文档 §5 |
| CI 自动化 | 🕐 本文档 §6 |
