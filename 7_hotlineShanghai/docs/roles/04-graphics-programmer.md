# 角色需求 — 图形程序（Graphics Programmer）

> 蒸馏自本项目最重的一段历史：B33（shader 编译失败全黑屏 → 两次重置）、B55/B56（prepscene 采样尺度错 + final 采样锚错 = "RC 坏了"主因）、B64（暗环/盘缘台阶/小光丢失三个暗伤）、B65（过曝白斑）、B69（blitFramebuffer 跨驱动 no-op 真机黑屏）。图形程序在本项目的核心是**rc-lab-first：算法在隔离台全绿，才准动游戏**。

## 使命一句话

维护真 2D Radiance Cascades 全管线（prepscene → prepjfa → JFA → distfield → cascade ×3 → final），视觉正确且跨驱动可用，同时永远不让 RC 越权进玩法判定。

## 必读

1. [`GAME-SOP.md`](../../GAME-SOP.md) §4（RC↔玩法分界）+ §6（rc-lab 门）
2. `docs/design/04-radiance-cascades-pipeline.md`（算法直觉 + 移植源）
3. `docs/design/06-rendering-readability.md`（D1-D6 已知坑）
4. `docs/design/15-webgl-state-machine.md`（状态污染：RC 全屏 pass 写状态）
5. `rc-lab/README.md` + `AGENTS.md` "RC 测试台" 节（rc-lab-first 规则）
6. `docs/design/25-intro-scene-lessons.md`（动 Canvas↔WebGL 方向/RC 亮度前必读）

## 技能需求（蒸馏）

| 技能 | 项目内的具体形态 | 验收证据 |
|------|----------------|---------|
| rc-lab-first 流程 | 算法改动先让 `rc-lab/` 7 确定性场景全绿（37/37），再移植 `src/engine/RcPipeline.ts`；`rc-lab/shaders/` 干净 GLSL ES 3.00，禁止运行时字符串补丁 | `AGENTS.md` RC 测试台节 |
| WebGL2 采样调试 | 会用 `__rcPipelineInstance` 阶段纹理 / `debugTint` 染色 / `readUploadTexture` 定位种子落空、采样锚错（B55/B56 方法论） | `BUGS.md` B55-B56 |
| 视觉质量度量 | 光池径向剖面单调无暗环、质心偏移 ≤6px、枪火 ≥ 油灯亮度（B64 新增 radialSmooth + centroid 断言） | `BUGS.md` B64 |
| 色彩保持 | 软膝滚降：中灰线性保对比、高亮渐近 1.0 不触白、色相保持（B65） | B65 实测塔/灯 RGB |
| 跨驱动兼容 | 不信任 `blitFramebuffer`（B69：alpha:false + preserveDrawingBuffer 组合静默 no-op）→ 全屏 passthrough 直出 | B69 |
| 状态机卫生 | RC 全屏 pass 后恢复 WebGL 状态，不污染 Three/Canvas2D 共存渲染 | `docs/design/15-webgl-state-machine.md` |
| 性能预算 | 生产 profile 固定（3 cascades/`baseIntervalPx=6`/half-res/twoLoop）；SwiftShader p95 ≤50ms 是 e2e 门 | JOURNEY 2026-08-13 行 |
| 权威分界 | RC = visual-only；暴露/半盲/拆灯判定只认几何 LOS + LightField，不从像素反推 | `AGENTS.md:41` |

## 交付物

- `src/engine/RcPipeline.ts` + `src/engine/shaders/*`（与 rc-lab 算法一致）
- rc-lab 场景/断言（新视觉质量 → 新确定性断言）
- `__rcPipeline` / `__rcFreezeFrames` 等调试钩子维护（`docs/design/13-dev-hooks.md`）

## 验收门（全链）

`npx tsc -b --noEmit` → `npm run build` → `npm run rc-lab:check`（37+37）→ `npm run light-break:check` → `npm run intro-polish:check` → `npm run e2e:playtest` 4/4 → `npm run self-play:check` 3/3（完整链见 `JOURNEY.md:303`）

## 禁止事项

- 禁止在游戏代码里先调参再回补 rc-lab（顺序倒置 = B33 重演）
- 禁止运行时 shader 字符串补丁
- 禁止改 cascade 数/baseIntervalPx 等生产 profile 而不同步 rc-lab 与 AGENTS 声明
