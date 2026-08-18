# AGENTS — 12_ddgi 开发约定

## 项目

DDGI（Dynamic Diffuse Global Illumination）探针系统的独立工程（三.js r185 + WebGPU + TSL），构建于 `three-mesh-bvh/webgpu`。零运行时资源。开发端口 5189（strictPort）。

## 命令

```bash
npm run dev         # 开发服务器（端口 5189，strictPort）
npm run typecheck   # tsc --noEmit
npm run test        # vitest run（core 黄金向量单测）
npm run build       # tsc --noEmit && vite build
```

## 架构规则

- **C.A.T 分层**：`src/core/` 纯数学（禁止 import THREE/WebGPU/DOM）：octahedral、fibonacci（Arvo 旋转）、probeGrid、chebyshev、hysteresis、moments、constants。`src/engine/` WebGPU 适配器；`src/engine/wgsl/` WGSL 辅助函数。
- **CPU/GPU 数值一致**：每帧射线方向集由 `core/fibonacci.ts` 在 CPU 生成并上传，GPU kernel 只消费；改 core 数学必须同步改 WGSL。
- **缓冲访问语法**：three r185 把非 struct storage buffer 包成 `{ value: array<T> }`，WGSL 里必须写 `ddgi_xxx.value[i]`（包括 `bvh_transforms.value[...]`）。
- **`// fn` 标记只属于 `three-mesh-bvh/webgpu` 的 `wgslTagFn`**；three 自带 `wgslFn` 的 WGSL 解析器不剥注释，kernel 字符串必须直接以 `fn compute(` 开头。
- **只读 storage**：probeData/rayDir 用 `.toReadOnly()`；rayData 保持 read_write。atlas 是 `rgba16float` read_write（RG16F 不是 WGSL 可写存储格式）。
- **参数表**：冻结于 `src/core/constants.ts`（与 `references/ddgi/research.md` §12 一致）。

## 门禁

1. `npm run typecheck` 零错误。
2. `npm run test` 全绿（黄金向量）。
3. `npm run build` 成功。
4. 浏览器 smoke（Playwright）：场景渲染、`window.__ddgi.readProbeSummary()` 可调用、控制台零 GPU 错误。

## 调试

- `window.__ddgi`：`config`（网格/射线配置）、`readProbeSummary()`（每探针平均辐射 + 命中率，读回 rayData buffer）。
- 场景：Cornell 盒 + 自发光卡片（BVH transform 缓冲注入 emissive，见 `DdgiBvh`）+ 厚墙（漏光测试）+ 探针 gizmo（按读回着色）+ 屏幕四角的八面体辐照度 atlas 叠层。
- 已知限制：间接反弹项（trace 只取 emissive，探针采样探针）未做；border 是 same-edge clamp（research §3 要求 wrapped opposite edge，`borderKernel.ts` 有 NOTE，M3+ 修）；WebGL2 回退（baked LightProbeGrid）未实现。
