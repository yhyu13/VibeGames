# DDGI 算法调试报告（RenderDoc + 代码审计）

项目：`C:\Git-repo-my\VibeGames\12_ddgi`  
时间：2026-08-20  
工具：`.claude\skills\renderdoc-gpu-debug`（RenderDoc 1.41/1.45 + rdc-cli）、Playwright 运行时探针、代码审计  

---

## 1. 执行摘要

- **类型检查 / 单元测试**：`npm run typecheck` 0 错误，`npm run test` 50/50 通过。
- **浏览器冒烟测试**：`http://localhost:5189/` 正常渲染，`WebGPU: OK`，控制台 0 错误；`window.__ddgi.readProbeSummary()` 返回 75 探针 × 4 通道数据。
- **RenderDoc GPU 捕获**：在本地环境中**未能生成可用 `.rdc`**。根本原因是 RenderDoc 注入 Chrome GPU 进程后，始终未能注册任何图形 API（`GetAPI` 为空，无 `RegisterAPI` 消息），因此无法触发 D3D12 帧捕获。已尝试 Chrome for Testing 151、Chrome Canary 153，结果一致。
- **Fallback 审计**：在无法做 GPU 帧捕获的情况下，按照 Recipe 7 的思路对 DDGI 管线做了逐文件代码审计，定位到 3 个可修复的算法/调试 bug 和 3 个已知功能缺口。

---

## 2. RenderDoc 捕获过程与失败根因

### 2.1 环境检查

```bash
rdc doctor
```

结果：Python 模块 1.41、renderdoccmd 1.45、Vulkan layer 已注册；唯一失败项是 VC++ build tools（不影响捕获）。

### 2.2 已尝试的捕获流程

1. 启动 12_ddgi dev server（`npm run dev`，端口 5189）。
2. 使用 skill 中的 `capture_webgpu.py` 思路，通过 Chrome D3D12 注入捕获：
   - `--no-sandbox --disable-gpu-sandbox --disable-direct-composition --gpu-startup-dialog`
   - `--enable-dawn-features=enable_renderdoc_process_injection,use_user_defined_labels_in_backend,emit_hlsl_debug_symbols,disable_symbol_renaming`
3. 发现本机 GPU startup dialog 标题为 `Chromium Gpu`（稳定版 Chrome for Testing）或 `Google Chrome Gpu`（Canary），而非 skill 默认的 `Google Chrome GPU`，已调整匹配逻辑。
4. `rd.InjectIntoProcess(pid, ...)` 均返回非零 ident，注入本身成功；但目标控制连接后 `GetAPI()` 始终为空，也收不到 `RegisterAPI`/`NewCapture` 消息，最终超时无 `.rdc`。

### 2.3 关键观察

- 稳定版为 **Google Chrome for Testing 151.0.7922.76**，该构建可能未启用 Dawn 的 RenderDoc 注入路径。
- 随后通过 winget 安装 **Chrome Canary 153.0.8010.0**，行为完全一致：注入成功但无 API 注册。
- 环境变量 `RENDERDOC_HOOK_EGL=0` 已设置；GPU 进程命令行中 `enable_renderdoc_process_injection` 已通过 `--gpu-preferences` 传入。
- RenderDoc Python 模块版本（1.41）与系统 renderdoccmd（1.45）不一致，可能是 API 握手失败的原因之一；升级 RenderDoc 到与 pyd 匹配的 1.45+ 或最新 nightly 后再试，是最有可能解除阻塞的动作。

### 2.4 结论

**当前无法提供 GPU 帧捕获级的像素/纹理/流水线证据。** 本报告后续分析全部基于源码审计 + 运行时 `readProbeSummary()` 数据。

---

## 3. 运行时探针数据

```js
await window.__ddgi.readProbeSummary()
```

- 配置：`5×3×5 = 75` 探针，`256 rays/probe`，`probesPerRow=9`，`maxRayDistance≈3.73`。
- 数据长度：300（75 × 4：avgL × 3 + hitFraction）。
- 前 4 个探针示例：avgL = 0，hitFraction = 1.0。
- 最后 4 个探针示例：avgL ≈ 0.009，hitFraction ≈ 0.28–0.29。

> 注意：hitFraction 的高值与极低的 avgL 并存，暗示大量 backface 射线被错误计为“命中”（见 4.2）。

---

## 4. 代码审计发现的问题

### 4.1 BUG — 每探针独立随机旋转破坏空间/时间一致性

**位置**：`src/engine/DdgiProbeVolume.ts:173-188`  
**代码**：

```ts
private regenerateRayDirs(): void {
  for (let p = 0; p < numProbes; p++) {
    const { rotated } = frameRaySet(numRays, numFixedRays, () => this.nextRandom())
    // ...写入当前 probe 的 rayDir...
  }
}
```

**问题**：`nextRandom()` 的种子每调用一次就前进，导致 **每个 probe 在每帧使用不同的随机四元数**。DDGI 的 temporal AA 和空间插值要求同一帧内所有 probe 共享同一组旋转后的 Fibonacci 方向；否则相邻 probe 的 irradiance 估计来自不同方向分布，会产生噪声、闪烁和插值伪影。

**修复建议**：

```ts
private regenerateRayDirs(): void {
  const { rotated } = frameRaySet(numRays, numFixedRays, () => this.nextRandom())
  for (let p = 0; p < numProbes; p++) {
    for (let r = 0; r < numRays; r++) {
      const d = rotated[r]
      const o = (p * numRays + r) * 4
      arr[o + 0] = d[0]; arr[o + 1] = d[1]; arr[o + 2] = d[2]; arr[o + 3] = 1
    }
  }
}
```

这样所有 probe 共享同一 frame-wide rotation，同时保留 temporal jitter。

---

### 4.2 BUG — `readProbeSummary()` 把 backface 也计入 hitFraction

**位置**：`src/engine/DdgiSystem.ts:65-86`  
**代码**：

```ts
if (src[o + 3] < 1e20) hits++
```

**问题**：trace kernel 对 backface 写 `ddgi_rayData.w = -hit.dist * 0.2`（负数），对 miss 写 `1e27`。当前条件 `src[o+3] < 1e20` 会把**负数 backface 也当作命中**，导致 hitFraction 偏高，debug gizmo 颜色和数值不可信。

**修复建议**：

```ts
if (src[o + 3] > 0.0 && src[o + 3] < 1e20) hits++
```

---

### 4.3 BUG — backface 距离污染 distance/Chebyshev 场

**位置**：

- `src/engine/kernels/traceKernel.ts:43-46`：backface 写 `-hit.dist * 0.2`
- `src/engine/kernels/blendKernels.ts:150-161`：distance blend 用 `d = min(abs(rd.w), maxRay)` 和 `pow(cos, 50)` 累加

**问题**：irradiance blend 会跳过 backface（`rd.w < 0 continue`），但 distance blend 把 backface 当作正距离（`abs`）并赋予高权重。这会让 distance atlas 低估真实遮挡距离，导致 Chebyshev visibility 在厚墙/凹角处失效，产生漏光。

**修复建议**：在 distance blend 中同样跳过 backface：

```wgsl
if (rd.w < 0.0) { continue; }
```

或者为 distance 单独写入一个“有效命中”标记，避免把 backface 几何距离混进 moments。

---

### 4.4 疑似问题 — distance 归一化仍使用 `2·Σw`

**位置**：

- `src/engine/kernels/blendKernels.ts:165-166`
- `src/core/moments.ts:61`

**问题**：distance 权重是 `cos^50`，已经非常尖锐，其半球均值远小于 0.5。继续用 `2·Σw` 做归一化会把平均距离放大数倍。虽然 CPU/GPU 保持一致，但与 DDGI 原始论文中“按 Σw 归一化”的惯例不符。query 端虽然乘以 2 补偿，但偏差仍会影响 moments 的方差估计。

**修复建议**：验证 `sumW` 的统计均值；若确认当前归一化导致 distance moments 系统性偏大，应改为 `sumD / sumW` 并在 query 端去掉 `*2.0`。

---

### 4.5 已知限制 — border 使用 same-edge clamp

**位置**：`src/engine/kernels/borderKernel.ts:42-46`、`65-68`  
**问题**：border 像素复制的是同侧最近 interior 像素（clamp），而 octahedral mapping 要求折叠到对侧边缘（wrapped opposite edge）。M2 直接显示 atlas 时问题不大，但 M3 bilinear 采样跨 seam 时会出现接缝。

**修复建议**：按 research.md §3 实现正确的 octahedral fold wrap：角复制对角邻居，边复制对边邻居。

---

### 4.6 已知限制 — 仅支持直接光照（emissive），无间接反弹

**位置**：`src/engine/kernels/traceKernel.ts:50`  
**代码**：

```wgsl
let emissive = bvh_transforms.value[hit.objectIndex].emissive;
ddgi_rayData.value[gid] = vec4f(emissive, hit.dist);
```

**问题**：trace 只把自发光卡片当作光源，非自发光表面不反射任何 radiance。因此 Cornell box 的彩色墙面不会把颜色反弹到地板上，GI 效果退化为直接光近似。

**修复建议**：M3/M4 需要实现“探针采样探针”的间接反弹：在 trace 阶段先用当前 irradiance atlas 对命中点做一次 probe query，把反射 radiance = albedo/π × irradiance 写回 rayData。

---

### 4.7 次要差异 — query 端未做 Chebyshev crush

**位置**：

- `src/engine/DdgiMaterialNode.ts:95-104`
- `src/core/chebyshev.ts:22-33`

**问题**：CPU 参考实现包含 crush（小权重按 `w³ / crushThreshold²` 塑形），GPU query 仅做 `max(chebMin, cheb)` 并立方，缺少 crush 阶段。在薄遮挡处可能让权重过渡偏硬。

---

## 5. 推荐修复优先级

| 优先级 | 问题 | 影响 | 文件 |
|---|---|---|---|
| P0 | 每探针独立随机旋转 | 噪声/闪烁/插值伪影 | `src/engine/DdgiProbeVolume.ts` |
| P0 | backface 污染 distance moments | 漏光、Chebyshev 失效 | `src/engine/kernels/blendKernels.ts` |
| P1 | `readProbeSummary()` backface 误计 | debug 数据失真 | `src/engine/DdgiSystem.ts` |
| P1 | border wrap 错误 | atlas seam | `src/engine/kernels/borderKernel.ts` |
| P2 | distance 归一化因子 | distance moments 系统性偏差 | `src/engine/kernels/blendKernels.ts`、`src/core/moments.ts` |
| P2 | query 端 Chebyshev crush | 权重过渡 | `src/engine/DdgiMaterialNode.ts` |
| M3+ | 间接反弹 | 真实 GI / 颜色渗色 | `src/engine/kernels/traceKernel.ts` |

---

## 6. 复现命令

```bash
# 1. 启动 dev server
cd C:\Git-repo-my\VibeGames\12_ddgi
npm run dev          # port 5189

# 2. 类型检查 / 单元测试
npm run typecheck
npm run test

# 3. RenderDoc 环境检查
rdc doctor

# 4. 浏览器运行时探针
#    打开 http://localhost:5189/，等待 "WebGPU: OK"
#    在控制台执行：
#    const s = await window.__ddgi.readProbeSummary()
#    console.log(s)
```

---

## 7. 后续解锁 GPU 捕获的建议步骤

1. 升级 RenderDoc 到最新 nightly（当前环境 Python 模块 1.41 与 renderdoccmd 1.45 不匹配）。
2. 使用升级后的 `rdc doctor` 重新确认 `renderdoc.pyd`/`renderdoc.dll`/`renderdoccmd` 版本一致。
3. 保留 Chrome Canary 153，重新运行 WebGPU 注入流程；确认 `CreateTargetControl(...).GetAPI()` 返回 `D3D11/D3D12` 且收到 `RegisterAPI` 消息。
4. 一旦 `.rdc` 可用，按 skill Recipe 7 重点检查：
   - `ddgi_rayData` buffer 的 hit/miss/backface 分布；
   - irradiance/distance atlas 的 1-texel border；
   - blend dispatch 的 Chebyshev reject 分支与 distance moments 数值。

---

*报告生成：Kilo / renderdoc-gpu-debug skill，2026-08-20*
