# verification-report — 14_neuraltexture

## M1 intro scene

- [x] `npm run typecheck` — tsc --noEmit 零错误
- [x] `npm run test` — vitest 11/11 通过
- [x] `npm run bake` — 8000 步写 `src/engine/baked.ts`（见下）
- [x] `npm run build` — tsc --noEmit && vite build 成功（1.08 MB / gzip 307 KB）
- [x] Playwright：`window.__neural` 存在且可调用、`evalNeural([0.5,0.5],[0,0,1],[0,0,1])` = `[0.1292, 0.1073, 0.0957]`（有限值）、baked 权重 1635 参数加载
- [x] WebGPU 三球渲染：经 kilo-playwright MCP 截图验证（`../neuraltexture-fixed.png` / `../14-neuraltexture-intro.png`）
- [ ] 人工：8 秒内高光对齐（待人工）

Bake val L1: **0.045921** @ 8000 steps（Xavier 初值 log-L1 ≈ 0.69，见 `baked.ts` BAKED_HISTORY）
FPS: _待测_（headless SwiftShader 无 WebGPU adapter，需真 GPU；CPU 侧烟测正常）

## 说明

- 本机 headless Chromium（chromium-1234, Chrome 151）`navigator.gpu` 为真但 `requestAdapter()` 返回 null，three 回退 WebGL2——而 WGSL `fn` 语法在 WebGL2 无法编译，属项目 AGENTS.md 已声明的「WebGL2 回退未实现」限制，非代码缺陷。
- WebGPU 渲染门禁由上一 session 的 kilo-playwright MCP 完成，本 session 无该 MCP 可用。
