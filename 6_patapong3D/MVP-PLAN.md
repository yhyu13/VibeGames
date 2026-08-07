# Patapong 3D — MVP 计划 & Agent 派工表

> **本文档是 `GDD.md` + `TDD.md` 的执行层落地**。
> **作用**:把 72h 工作切成原子级 sub-batch,每个 batch 1 commit + 1 个 tsc 验证门。
> **适用周期**:Vibe Game Jam 72h(2026-08-07 ~ 2026-08-10)
> **冻结级别**:执行纪律(不是设计);TDD 变更仍需走 §0 流程。

---

## 0. Scope 摘要(给执行者看)

- **做什么**:3D 体素版 Pong,1P vs AI,先到 7 分胜;每击拍 = 完整 juice(camera shake + particle + SFX + squash)
- **不做什么**(MVP 边界):
  - ❌ 联机
  - ❌ 多模式(单人剧情 / 锦标赛 / 排行)
  - ❌ 复杂 AI 训练
  - ❌ 移动端 touch 适配
  - ❌ 国际化(M1 用中文,英文可后置)
- **可后置**(如果时间不够):
  - Stretch:2P 本地
  - Stretch:难度选择
  - Stretch:皮肤系统
  - Stretch:Steam / itch 发布

---

## 1. 总体时间线(72h,3 天)

```
D1 (24h)            D2 (24h)            D3 (24h)
┌──────────────┐   ┌──────────────┐   ┌──────────────┐
│ M1: 能玩     │   │ M2: 有手感   │   │ M3: 能发     │
│ (无 juice)   │ → │ (juice 全部) │ → │ (菜单+存储)  │
│ 09:00-21:00  │   │ 09:00-21:00  │   │ 09:00-18:00  │
│ 14 提交      │   │ 14 提交      │   │ 14 提交      │
└──────────────┘   └──────────────┘   └──────────────┘
                    D2 21:00 强制        D3 18:00 提交
                    playtest & review     dist + report
```

**D1 末必交付**:能玩的 Pong(无 juice,但能完整打 1 局到 MATCH_OVER)
**D2 末必交付**:完整 juice 体验
**D3 末必交付**:能发版(可独立 build,可上传 itch)

---

## 2. M1 详细 sub-batch(D1 09:00 - D2 02:00,~17h)

> **核心原则**:每一批 1 commit,commit gate = `npx tsc -b --noEmit` 通过;agent 之间靠 git + types 解耦,不靠口头协调。

### 2.1 M1.1 — 09:00-11:00 — agent-core 冻结契约骨架(2h,串行)

**任务**:
- [ ] 写 `src/core/types.ts`(全部 §5.1 类型,完整,带中文注释)
- [ ] 写 `src/core/constants.ts`(§4.4 全部常量,完整)
- [ ] 写 `src/core/math.ts`(`lerp / clamp / rng(seeded) / aabbIntersect`)

**commit gate**:
```bash
npx tsc -b --noEmit  # 0 error
git add src/core/types.ts src/core/constants.ts src/core/math.ts
git commit -m "M1.1: core contract skeleton (types + constants + math)"
```

**产出文件**:3 个 TS 文件,共 ~250 行
**风险**:`types.ts` 是 frozen,任何后续变更走 TDD 流程

### 2.2 M1.2 — 11:00-13:00 — agent-content 数据文件(2h,可与 M1.1 并行启动)

**任务**:
- [ ] 写 `src/core/data/colors.ts`(§4.5 配色表 + 6 色 audience pool)
- [ ] 写 `src/core/data/paddles.ts`(2 套 character: P1 + AI,各 1 character)
- [ ] 写 `src/core/data/court.ts`(球场体素 ~800 个,程序生成;floor + decoration)
- [ ] 写 `src/core/data/audience.ts`(12 个观众位置 + 颜色)
- [ ] 写 `src/core/data/sfx.ts`(音效合成配方 — frequency / duration / harmonics)

**commit gate**:
```bash
npx tsc -b --noEmit
git add src/core/data/*.ts
git commit -m "M1.2: data files (colors + paddles + court + audience + sfx)"
```

**产出文件**:5 个 TS 文件,共 ~600 行
**并行友好**:M1.2 完全不依赖 M1.1(都是 const 数据),可与 M1.1 并行执行

### 2.3 M1.3 — 13:00-17:00 — agent-core 模拟实现(4h,依赖 1.1+1.2)

**任务**:
- [ ] 写 `src/core/simulation/Simulation.ts`(主类,5.3 接口)
- [ ] 写 `src/core/simulation/events.ts`(`SimEvent` 类型定义)
- [ ] 写 `src/core/simulation/ballPhysics.ts`(5.4 接口,实现:移动 + 反弹 + paddle hit + out-of-bounds)
- [ ] 写 `src/core/simulation/paddleControl.ts`(P1 加速度模型,W/S 输入)
- [ ] 写 `src/core/simulation/aiPaddle.ts`(5.5 接口,实现:追踪 + 5% 错位)
- [ ] 写 `src/core/simulation/scoreTracker.ts`(5.7 接口,实现:7 分胜判定)
- [ ] 写 `src/core/simulation/rallyCounter.ts`(rally hits 累加 + milestone 触发,**M2 实际消费,M1 仅占位**)
- [ ] 写 `src/core/simulation/juiceEvents.ts`(5.6 接口,**M1 仅空实现,M2 填 juice**)
- [ ] 写 `src/core/simulation/describe.ts`(`describeWorld/Rules/Entities`)

**commit gate**:
```bash
npx tsc -b --noEmit
git add src/core/simulation/
git commit -m "M1.3: simulation core (no juice, paddle/ball/AI/score all working)"
```

**产出文件**:8 个 TS 文件,共 ~600 行
**M1 状态**:核心模拟完整,ball hit 正常反弹,失分 + 重 spawn + 7 分胜都能跑通
**风险**:球拍撞击物理最容易踩坑,建议 M1.3 末自己写个 node 脚本测 1000 局不崩溃

### 2.4 M1.4 — 17:00-20:00 — agent-engine 渲染骨架(3h,依赖 M1.3)

**任务**:
- [ ] 写 `src/engine/SceneManager.ts`(scene + camera + 3 lights + 后处理)
- [ ] 写 `src/engine/VoxelRenderer.ts`(4 个 InstancedMesh: court / paddle / ball / particles(M2 填))
- [ ] 写 `src/engine/InputManager.ts`(W/S/Space/R/Esc 键监听)
- [ ] 写 `src/engine/GameEngine.ts`(rAF + 固定步 sim + render 编排)
- [ ] 写 `src/engine/postfx.ts`(UnrealBloom + Vignette,M1 可不开)
- [ ] 写 `src/engine/devtools.ts`(`window.__gameManifest / __sim`)
- [ ] 写 `src/engine/storage.ts`(M3 填,M1 仅骨架)
- [ ] 写 `src/engine/PerfWatchdog.ts`(M2 填,M1 仅骨架)
- [ ] 写 `src/engine/CameraShake.ts`(M2 填,M1 仅骨架)
- [ ] 写 `src/engine/ParticleSystem.ts`(M2 填,M1 仅骨架)
- [ ] 写 `src/engine/AudioManager.ts`(M2 填,M1 仅骨架)

**commit gate**:
```bash
npx tsc -b --noEmit
npm run dev  # 视觉确认球场 + 球拍 + 球在
git add src/engine/
git commit -m "M1.4: engine shell (scene + voxel renderer + game loop, no juice)"
```

**产出文件**:11 个 TS 文件,共 ~700 行
**M1 状态**:dev server 起得来,能看见球场和球拍,球会反弹(没有 juice,没有 milestone)

### 2.5 M1.5 — 17:00-19:00 — agent-ui UI 骨架(2h,与 M1.4 并行)

**任务**:
- [ ] 写 `src/main.tsx`(React 入口)
- [ ] 写 `src/App.tsx`(顶层 FSM:MENU/READY/PLAY/POINT/MATCH_OVER,简单切换)
- [ ] 写 `src/components/Menu.tsx`(M1 仅"PLAY"按钮,无装饰)
- [ ] 写 `src/components/HUD.tsx`(比分 + rally hits 显示)
- [ ] 写 `src/components/ReadyCountdown.tsx`("3 / 2 / 1" 大字)
- [ ] 写 `src/components/PointOverlay.tsx`(得分 +1 飘字,M1 简化版)
- [ ] 写 `src/components/WinScreen.tsx`(M1 仅占位,文字 "MATCH OVER")
- [ ] 写 `src/components/PerfBadge.tsx`(M2 填,M1 仅骨架)
- [ ] 写 `src/store.ts`(zustand,读 sim snapshot,1 字段: `phase / score / rallyHits`)
- [ ] 写 `src/styles.css`(Tailwind 入口 + 一些基础 utility)

**commit gate**:
```bash
npx tsc -b --noEmit
git add src/components/ src/App.tsx src/main.tsx src/store.ts src/styles.css
git commit -m "M1.5: UI shell (FSM routing + HUD + Menu/Win placeholder)"
```

**产出文件**:10 个 TS/TSX 文件,共 ~400 行
**并行友好**:agent-ui 完全可与 agent-engine 并行(都只依赖 core/types.ts + store 形状)

### 2.6 M1.6 — 20:00-22:00 — 集成 + 验证(2h,串行,所有 agent 协作)

**任务**:
- [ ] agent-qa 跑全量 tsc: `npx tsc -b --noEmit` 0 error
- [ ] agent-qa 启动 dev server,Chrome 打开,确认:
  - 球场 + 球拍 + 球可见
  - W/S 控制 P1
  - 球被拍到反弹
  - 球出 X 边界 → 1.2s 后 spawn
  - 比分到 7 → MATCH_OVER
- [ ] agent-core 修复 playtest 暴露的 bug(通常 2-5 个小 bug,例如反弹角度不对)
- [ ] agent-engine 调帧率到稳定 60 FPS

**commit gate**:
```bash
npx tsc -b --noEmit
# 手动 60 FPS 验证(DevTools Performance 10s)
git add .
git commit -m "M1.6: integration + playtest fixes (M1 ready)"
```

**D1 末必须达到**:
- ✅ dev server 起得来
- ✅ 完整 1 局能玩(打到 7 分)
- ✅ 60 FPS
- ✅ tsc 0 error
- ✅ 0 console error

**D1 末 commit 数**:6(M1.1 ~ M1.6)

---

## 3. M2 详细 sub-batch(D2 09:00 - D2 23:00,~14h)

> **核心**:把 juice 全部填进去,调手感到爽。

### 3.1 M2.1 — 09:00-11:00 — agent-engine ParticleSystem + AudioManager 骨架(2h,串行)

**任务**:
- [ ] 写 `src/engine/ParticleSystem.ts`(`InstancedMesh<BoxGeometry>` + TTL + 重力 + 矩阵 lerp)
- [ ] 写 `src/engine/AudioManager.ts`(AudioContext + 节点图实例化)
- [ ] 在 `GameEngine.ts` 串接 SimEvent → ParticleSystem / AudioManager

**commit gate**:
```bash
npx tsc -b --noEmit
# 手动:hit 球时看到粒子 + 听到 PATA
git commit -m "M2.1: particle system + audio synth (per-hit feedback)"
```

**风险**:AudioContext 在用户首次交互前不能 play(autoplay policy),需要 first-click bootstrap

### 3.2 M2.2 — 11:00-13:00 — agent-engine CameraShake + Squash(2h)

**任务**:
- [ ] 写 `src/engine/CameraShake.ts`(start / update / 随机偏移 lerp)
- [ ] 在 `VoxelRenderer.ts` 加 paddle squash matrix 写入
- [ ] 串接 `cameraShake` / `paddleSquash` SimEvent

**commit gate**:
```bash
npx tsc -b --noEmit
git commit -m "M2.2: camera shake + paddle squash & stretch"
```

### 3.3 M2.3 — 13:00-15:00 — agent-core Milestone 触发 + Rally counter(2h)

**任务**:
- [ ] 在 `core/simulation/rallyCounter.ts` 填入 milestone 触发逻辑(3/5/7/10)
- [ ] 在 `core/simulation/juiceEvents.ts` 填入 `emitMilestoneJuice`(慢镜 + audience cheer + SFX)
- [ ] 在 `core/simulation/Simulation.ts` 主循环加 slowMo 状态机
- [ ] 同步 `GameEngine.ts` 影响 sim dt

**commit gate**:
```bash
npx tsc -b --noEmit
git commit -m "M2.3: milestone slowmo + rally counter integration"
```

### 3.4 M2.4 — 15:00-17:00 — agent-engine 观众 + 灯光(2h)

**任务**:
- [ ] 在 `SceneManager.ts` 加 12 个 `AudienceMember`(M1 占位,本批激活)
- [ ] 加 milestone 灯光闪烁(materials.emissiveIntensity 短促 bump)
- [ ] 串接 `audienceCheer` SimEvent

**commit gate**:
```bash
npx tsc -b --noEmit
git commit -m "M2.4: audience reaction + milestone light flash"
```

### 3.5 M2.5 — 17:00-20:00 — 调手 playtest(3h,所有 agent 协作)

**任务**:
- [ ] agent-core 调 AI 参数(5% 错位 / lerp rate)
- [ ] agent-engine 调 shake intensity / particle count
- [ ] agent-audio 调 PATA 频率 / loudness
- [ ] agent-core 调 ball 速度曲线(让 rally 1-12 拍都有玩点)
- [ ] agent-qa 打 5 局 + 收集反馈

**commit gate**:
```bash
npx tsc -b --noEmit
# 手动 5 局 playtest
git commit -m "M2.5: feel tuning + AI balance (5-round playtest)"
```

**D2 21:00 强制 playtest**(用户在场):
- [ ] 跑 3 局,记录手感问题
- [ ] 决定是否砍 §8.1 任何项
- [ ] 决定 M3 stretch 优先级

**D2 末必须达到**:
- ✅ hit 即时看到 shake + 听到 PATA
- ✅ 3 拍 rally = 慢镜 + 观众 + PATA-PATA!
- ✅ 5 拍 = 大慢镜
- ✅ 7 拍 = PATA-PATA-PATA-PONG!
- ✅ AI 不碾压(平均每局 P1 赢 60%)

**D2 末 commit 数**:5(M2.1 ~ M2.5)

---

## 4. M3 详细 sub-batch(D3 09:00 - D3 18:00,~9h)

### 4.1 M3.1 — 09:00-11:00 — agent-ui 完整菜单(2h)

**任务**:
- [ ] 完善 `Menu.tsx`(标题 + 按钮 + 配色)
- [ ] 完善 `ReadyCountdown.tsx`(大字 + 倒计时)
- [ ] 完善 `PointOverlay.tsx`(`+1` 飘字 + 渐隐)
- [ ] 完善 `WinScreen.tsx`("VICTORY" / "DEFEAT" + rematch / menu 按钮)
- [ ] 在 `App.tsx` FSM 完整实现 5 个 phase 切换

**commit gate**:
```bash
npx tsc -b --noEmit
git commit -m "M3.1: full menu FSM (MENU/READY/PLAY/POINT/MATCH_OVER UI)"
```

### 4.2 M3.2 — 11:00-13:00 — agent-engine 存储 + 设置(2h)

**任务**:
- [ ] 写 `src/engine/storage.ts` 完整实现(读 `patapong.v1.stats / .settings`)
- [ ] 串接 `persist` SimEvent
- [ ] 在 `Menu.tsx` 加"重置数据"按钮(二次确认)

**commit gate**:
```bash
npx tsc -b --noEmit
git commit -m "M3.2: localStorage persistence (stats + settings)"
```

### 4.3 M3.3 — 13:00-15:00 — agent-engine 后处理 + PerfWatchdog(2h)

**任务**:
- [ ] 在 `postfx.ts` 加 UnrealBloom(若 M1/M2 性能余量)
- [ ] 完善 `PerfWatchdog.ts`(rolling avg + 降级路径 + 自动恢复)
- [ ] 在 `PerfBadge.tsx` 显示降级状态(DEV only)

**commit gate**:
```bash
npx tsc -b --noEmit
# 手动 60 FPS 验证
git commit -m "M3.3: post-fx + perf watchdog (with auto-degradation)"
```

### 4.4 M3.4 — 15:00-17:00 — Final 调优(2h,所有 agent)

**任务**:
- [ ] agent-qa 跑 Playwright smoke test(打开页面无 console error,sim ready)
- [ ] agent-core 修复最后一轮 playtest 暴露的 bug
- [ ] agent-engine 跑 production build 验证
- [ ] 更新 `verification-report.md`(M1/M2/M3 三个里程碑的证据)

**commit gate**:
```bash
npx tsc -b --noEmit
npm run build  # 验证 production build
git add .
git commit -m "M3.4: final tuning + verification report"
```

### 4.5 M3.5 — 17:00-18:00 — 提交 + 收尾(1h)

**任务**:
- [ ] 跑 `npm run build`,确认 `dist/` 生成
- [ ] 跑 `git status` 确认所有 M1/M2/M3 commit 都已 push
- [ ] 更新顶层 `AGENTS.md`(标记 6_patapong3D 为 active project)
- [ ] 写 `6_patapong3D/README.md` 完整体(如何跑、玩法、控件)
- [ ] **本项目 `dist/` 不提交**(与 5_gamejam_1 / 4_chunbai 约定不同;VibeGame 项目是私部署,见 §10)

**commit gate**:
```bash
git add .
git commit -m "M3.5: ship — production build verified + README final"
```

**D3 末必须达到**:
- ✅ 完整 5 phase FSM
- ✅ localStorage 跨刷新保留
- ✅ perf watchdog 降级 + 恢复
- ✅ `npm run build` 0 error
- ✅ 60 FPS 稳定
- ✅ verification-report.md 完整

**D3 末 commit 数**:5(M3.1 ~ M3.5)
**项目总 commit 数**:16(6 + 5 + 5)

---

## 5. Agent 角色 & 责任矩阵

| Agent | 负责 | 不负责 | 沟通 |
|---|---|---|---|
| **mavis(orchestrator)** | 派工 + 协调 + 决策 | 写代码 | 与用户 |
| **agent-core** | `src/core/**` 全集(含 simulation + data) | engine 渲染 / UI 像素 | 走 PR 描述提交 |
| **agent-engine** | `src/engine/**` 全集(渲染 / 音频 / 相机) | core 模拟逻辑 / UI 组件 | 走 PR 描述提交 |
| **agent-ui** | `src/components/**` + `src/App.tsx` + `src/main.tsx` + `src/store.ts` | core / engine 逻辑 | 走 PR 描述提交 |
| **agent-qa** | 验证(无所有权) | 写代码 | 直接在 verification-report.md 写证据 |

> **本项目规模小**:`core / engine / ui` 三方 + qa,不需要 content / audio 单独 agent(并入 engine)。
> **5_gamejam_1 的多代理拆分是 5+ agent**:本项目小,3 agent 即可。

---

## 6. 协调 & 沟通机制

### 6.1 Commit 命名约定(严格)

```
M{x}.{y}: <一句话描述>

示例:
M1.1: core contract skeleton (types + constants + math)
M2.3: milestone slowmo + rally counter integration
M3.5: ship — production build verified + README final
```

### 6.2 冲突处理

- **同一文件冲突** → 立即 escalate 到 mavis(我);按 §6.3 优先级处理
- **TDD 契约变更** → 走 §0 流程,所有 agent 重读 TDD
- **新依赖** → mavis 决策,默认拒绝(72h 禁装新包)
- **性能不达标** → 优先走 §3.6 降级路径,不阻塞 M 提交

### 6.3 优先级(冲突时)

1. **C.A.T 硬规则**(`core/` 零 THREE / DOM / zustand) > 一切
2. **TDD 冻结契约签名** > 实现细节
3. **性能预算** > 视觉细节
4. **D2 末 playtest 通过** > M2 末完美
5. **M3 末可发版** > 一切 stretch

### 6.4 git 行为

- 每一批 1 commit,commit gate = tsc 通过
- **不**用 `git push --force` 或 `git rebase` 已 push 的 commit
- **不**用 `git commit --amend` 已 push 的 commit
- commit message 用英文(便于跨工具搜索),PR 描述用中文

---

## 7. 验证门(每个 sub-batch)

| 门 | 命令 | 通过条件 |
|---|---|---|
| **类型门** | `npx tsc -b --noEmit` | 0 error |
| **启动门** | `npm run dev` | 端口 5183 监听,无 crash |
| **视觉门** | Chrome 打开 | 无 console error,关键元素可见 |
| **性能门**(D2+) | DevTools Performance 10s | 60 FPS 稳定 |
| **存储门**(M3+) | 刷新页面 | highscore 保留 |
| **冒烟门**(M2+) | Playwright | `window.__sim != null` |

---

## 8. 风险应急(Plan B)

| 风险触发 | 应急动作 |
|---|---|
| M1.3 ball physics 出 bug 且调试超过 2h | 走 GDD §3.1 简化:取消 spin,只用 AABB |
| M1.4 InstancedMesh 性能不达标 | 降级方案:球场用单 Mesh(800 cube 共享),球拍用 2 个独立 mesh |
| M2.1 AudioContext autoplay 限制导致首次没声音 | 加 start screen 显示"Click to start" |
| M2.5 AI 5% 错位调不好 | 改 3 难度预设(easy/normal/hard),MVP 只保留 normal |
| M3.2 localStorage 序列化 bug | 退化为 M2-only 内存版,放弃跨刷新 |
| 整体 72h 干不完 | 启用 GDD §8.1 砍单:先砍 audience + 后处理 + 背景 pad |
| 性能持续超标 | 启用 §3.6 降级路径,关 bloom + 砍粒子 |

---

## 9. 沟通节奏

| 时点 | 事件 | 触发 |
|---|---|---|
| M 末(D1 22:00 / D2 22:00 / D3 18:00) | mavis 给用户演示 + 收集反馈 | cron 提醒 |
| D2 21:00 | **强制 playtest**(用户在) | D2 必到 |
| 每次 sub-batch 提交 | agent 自跑 tsc + 简短 PR 描述 | commit hook |
| 冲突时 | 立即拉 mavis | 任意 agent escalate |

---

## 10. 附录:本项目与 5_gamejam_1 的差异(防误用约定)

| 项 | 5_gamejam_1 | 6_patapong3D(本项目) | 备注 |
|---|---|---|---|
| 端口 | 5173 | 5183 | 不冲突 |
| 提交 dist | ✅ 提交 | ❌ 不提交 | vibe game jam 私部署,dist 可重 build |
| 提交 node_modules | ❌ 不提交 | ❌ 不提交 | 本项目首次需 `npm install` |
| 测试套件 | ✅ vitest 5 文件 85 用例 | ❌ 无(72h 决策) | 沿用 5_gamejam_1 末决策 |
| Lint | ❌ 无 | ❌ 无 | 同上 |
| 多代理拆分 | 5+ agent | 3 agent(core/engine/ui) + qa | 规模小 |
| Stretch 实际 | madScript + hiddenEnding = ON | 2P + 难度选择 + 皮肤 = OFF(M3 末视情况) | 72h 干完就胜利 |
| 文档驱动 | GDD + TDD v1.3 + 5 份 design doc | GDD + TDD v0.1 + 4 份 design doc(01-04) | 一致 |

---

## 11. 一句话总结

> **16 个 sub-batch,3 天,16 个 commit,3 agent 协作,16:67 行 TS,72h 后能发版**。

---

*文档版本 v0.1 · 2026-08-07 · 适用 72h vibe game jam*
