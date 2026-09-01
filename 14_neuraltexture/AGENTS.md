# AGENTS — 14_neuraltexture 开发约定

## 项目

神经材质 intro lab：一张 8 维潜变量纹理 + 共享 Decoder MLP（`8+6 → 32 → 32 → 3`）近似 `BRDF(uv, ωi, ωo)`。命题来自 SIGGRAPH 2026 *Introduction to Neural Shading* / Zeltner 2024，浏览器端口是 **标量 WGSL MLP**（无 Cooperative Vector、无 Slang autodiff、无 MDL ceramic）。开发端口 **5190**（strictPort）。

## 命令

```bash
npm install         # 第一次
npm run bake        # CPU Adam 蒸馏 GGX teacher → src/engine/baked.ts
npm run dev         # 开发服务器（端口 5190）
npm run typecheck   # tsc --noEmit
npm run test        # vitest run（core 黄金向量）
npm run build       # tsc --noEmit && vite build
```

## 架构规则

- **C.A.T 分层**：`src/core/` 纯数学（禁止 import THREE/WebGPU/DOM）：GGX teacher、Rusinkiewicz、MLP 前向/反向、陶瓷 SVBRDF、Adam。`src/engine/` WebGPU 适配器。
- **CPU/GPU 数值一致**：teacher / encoder / Rusinkiewicz / leaky ReLU / exp 输出必须在 `core/*.ts` 与 `engine/NeuralMaterial.ts` WGSL 里用同一公式。改一边必须改另一边。
- **缓冲访问语法**：three r185 把非 struct storage buffer 包成 `{ value: array<T> }`，WGSL 里必须写 `nt_w.value[i]` / `nt_z.value[i]`。
- **`wgslFn` 入口**：three r185 的 `wgslFn` 把字符串里**第一个** `fn` 当 callable，并且 `CodeNode` 还会把整段源再 emit 一遍。kernel 字符串只能有一个 `fn compute(...)`；辅助函数放独立 `wgsl()` include。
- **参数表**：冻结于 `src/core/constants.ts`（来源见 `从-PBR-贴图到潜变量-plus-MLP：拆解-SIGGRAPH-2026.md`）。
- **权重来源**：只承认 `scripts/bake.ts` 写出的 `src/engine/baked.ts`。不要 vendor RTXNS `disney.ns.bin`。

## 门禁

1. `npm run typecheck` 零错误。
2. `npm run test` 全绿。
3. `npm run build` 成功。
4. 浏览器 smoke（Playwright）：三球渲染、`window.__neural.evalNeural(...)` 可调用、控制台零 GPU 错误。

## 调试

- `window.__neural`：`evalTeacher` / `evalNeural` / `materialAt` / `encodeLatent` / `bakedValL1`。
- 场景：三颗同一陶瓷球 — 左 teacher GGX、中 neural MLP、右 `|error|×8`。底下一张 8 通道潜变量 atlas。暖色 key light 绕球公转。
- 已知限制：没有 importance sampling / PDF；没有能量守恒硬约束；没有 learned shading frame（course step 06）；没有 Material Encoder 网络（固定打包 encoder）；WebGL2 回退未实现。

## 明确不做

- Cooperative Vector / Slang / 4096² latent / 在页面里跑 100k Adam。
- NTC（那是另一篇论文：压缩 PBR 贴图，不是近似 BRDF）。
