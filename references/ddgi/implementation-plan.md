# DDGI in three.js — Implementation Plan

> Companion to [research.md](research.md). This plan turns the algorithm research into a concrete, milestone-ordered build for **three.js r185 (WebGPU + TSL)**, reusing this repo's prior art (`9_3dplatform`'s frozen WebGPU BVH ray-tracer contract — design-doc-only, no code yet; `7_hotlineShanghai` Radiance Cascades) and the mature `three-mesh-bvh` GPU-BVH layer.

## 0. Objective & scope

Build a **self-authored DDGI probe system** for three.js: a `DDGIVolume` that ray-traces per-probe irradiance + depth-moments on the GPU each frame and exposes the result to materials as world-space diffuse GI (infinite bounce). Deliver a reusable addon (`DdgiProbeVolume` / `DdgiSystem`) that a VibeGames project can drop in, plus a demo scene proving it works.

**Explicit non-goals (v1):** pixel-accurate specular reflections (DDGI is diffuse-only), multi-volume cascades / infinite scrolling, surfel GI, WebGL2 compute (no such thing). These are deferred.

---

## 1. Key decisions

| Decision | Choice | Rationale |
|---|---|---|
| Ray-tracing substrate | **`three-mesh-bvh/webgpu` → `BVHComputeData.getShapecastFn()`** | Mature (3.5k stars, MIT), generates WGSL TLAS+BLAS traversal, already powers a WebGPU path tracer. Avoids hand-writing a stackless WGSL BVH walk. |
| Compute layer | **three.js TSL compute** (`Fn().compute()` + `renderer.compute()`) | Real compute, real atomics, `StorageTexture`/`Storage3DTexture`, `atomicAdd`, `storageBarrier()`. |
| three version | **r185** (locked) | Matches `9_3dplatform`; `three-mesh-bvh/webgpu` requires r185+. |
| Irradiance encoding | Octahedral atlas, gamma-5 storage (port RTXGI) | Proven, low-res, hardware-bilinear-friendly. |
| Fallback | WebGPU → **baked `LightProbeGrid`** → raster/no-GI | `WebGPURenderer` can't auto-fallback to WebGL2; `LightProbeGrid` is a real (static) GI fallback that ships in three core. |
| Build-vs-buy | **Build** (port technique, don't copy RTXGI code — proprietary license) | Matches repo philosophy (self-authored RT in `9_3dplatform`); `speedball-gi` too immature (v0.6.7, ~11 stars, leaks). |

**Why not `speedball-gi`:** it is the only drop-in three.js DDGI, but at v0.6.7 / ~1 month old / single-author with documented leaking and a sharp install-order footgun, it is not a safe dependency for this repo. We reference its API as prior art, not as a dependency.

**Why not `three-mesh-bvh`'s WebGL2 path only:** WebGL2 has no compute shaders (only fragment-shader tricks, no general atomics), so probe accumulation would need additive-blend render targets — ~20× slower and much more plumbing. WebGPU compute is the right home; WebGL2 is a fallback tier, not the primary.

---

## 2. Prior art in this repo (reuse, don't reinvent)

- **[9_3dplatform/TDD.md](../../9_3dplatform/TDD.md)** — *design-doc only* (no `src/` exists yet). Its TDD **freezes a contract** for a self-authored WebGPU TSL BVH ray tracer: flat `triangles` (9 floats/tri) + `nodes` (10 floats/node: aabbMin/Max.xyz, leftChild, rightChild, leafStart, leafCount) storage buffers, 1 spp + temporal reprojection + bilateral denoise, `STRETCH_FLAGS`-gated with a raster fallback ladder. **Decision:** for a *standalone* DDGI addon we use `three-mesh-bvh/webgpu` (faster to correct); if DDGI lands *inside* `9_3dplatform`, that means **writing the BVH first** — its `core/bvh.ts` is a frozen contract in TDD.md, not existing code. Either way the "pure core math + engine adapter" split below holds.
- **[7_hotlineShanghai/rc-lab/pipeline.ts](../../7_hotlineShanghai/rc-lab/pipeline.ts)** — a working **WebGL2 6-stage Radiance Cascades** pipeline (prepscene → JFA → distfield → cascade interval → merge → final). This is the repo's *fallback* GI pattern (fragment-shader ping-pong, no compute) and the algorithmic cousin of DDGI. If a non-WebGPU browser needs dynamic GI, RC is the fallback, not a WebGL2 DDGI.
- **[11_blackhole](../../11_blackhole/)** — analytic per-pixel Kerr ray tracing (shader-as-TS-string). Confirms the repo's full-screen ray-march shader style.

---

## 3. Architecture (C.A.T split, matches repo convention)

```
src/
├── core/                          # platform-pure: zero three/WebGPU/DOM
│   ├── octahedral.ts              # octEncode()/octDecode()/octNormalizedCoords() — pure, unit-tested
│   ├── fibonacci.ts               # sphericalFibonacci(i, N) + frame rotation (Arvo) — pure
│   ├── probeGrid.ts               # gridWorldPos(), baseProbeCoords(), trilinear weights, wrapShading — pure
│   ├── chebyshev.ts               # chebyshevWeight(mean, meanSq, dist) — pure
│   ├── hysteresis.ts              # EMA blend step (radiance + distance), thresholds — pure
│   └── constants.ts               # frozen DDGI param table (§6) — pure data
├── engine/                        # Web platform adapters
│   ├── BvhProvider.ts             # builds BVHComputeData from scene (three-mesh-bvh/webgpu) + .update()
│   ├── DdgiProbeVolume.ts         # owns probe atlas textures + ray-data + config; dispatches passes
│   ├── kernels/
│   │   ├── traceKernel.ts         # TSL: one thread per probe-ray → shapecast → ray-data buffer
│   │   ├── blendKernel.ts         # TSL: per texel → irradiance/distance moment accumulation + EMA
│   │   ├── relocateKernel.ts      # TSL: fixed-ray backface → probe offsets (optional M3)
│   │   ├── classifyKernel.ts      # TSL: active/inactive flag (optional M3)
│   │   └── borderKernel.ts        # TSL: copy 1-texel octahedral border
│   ├── DdgiMaterialNode.ts        # TSL node: samples probe atlas → irradiance → feeds indirect diffuse
│   └── DdgiSystem.ts              # orchestrator: update() per frame, resource lifecycle, debug probes
└── demo/
    └── (Cornell-box-like scene with an emissive card + moving light, live-updating GI)
```

**Pure-core discipline:** `core/` is a set of pure functions over plain numbers/arrays — octahedral encode/decode, Fibonacci sampling, Chebyshev, EMA — so they are trivially unit-testable and identical in CPU debug paths and the GPU kernels. This is the same "frozen math first" discipline `9_3dplatform` uses for its BVH.

---

## 4. Data structures & buffers

**Scene (via `three-mesh-bvh/webgpu`):** `BVHComputeData(objects, { autogenerateBvh: true })` → TLAS + per-object BLAS storage buffers, exposed as `.storage`/`.fns`. `.update()` on scene change, `.updateTransforms()` on transform-only change.

**DDGI-owned GPU resources (WebGPU):**

| Resource | Type / format | Size (defaults) |
|---|---|---|
| Probe ray data | `StorageBuffer` / `StorageTexture` `F32x4` | `numProbes × 256 × 16 B` (radiance RGB + hitT) |
| Irradiance atlas | `StorageTexture`/`DataArrayTexture` `RGBA16F` (or R10G10B10A2) | `numProbes × 8×8` texels |
| Distance atlas | `StorageTexture`/`DataArrayTexture` `RG16F` (mean, meanSq) | `numProbes × 18×18` texels |
| Probe data | `StorageBuffer` | `numProbes × vec4` (offset.xyz + state W) |

**Volume config (host-side):** `{ origin, probeSpacing (per-axis), probeCounts (per-axis), probeNumRays=256, ... }` → maps 1:1 to `constants.ts`.

---

## 5. Per-frame pass sequence

```
1. BvhProvider.updateTransforms()            // if anything moved
2. traceKernel      → ray-data               // numProbes × 256 threads; shapecast; classify hit/miss/backface
3. blendKernel      → irradiance + distance  // per texel per probe; moment accumulation; EMA hysteresis
4. [relocateKernel] → probe offsets          // optional, M3
5. [classifyKernel] → probe state            // optional, M3
6. borderKernel     → fill octahedral border // per atlas
7. render pass      → DdgiMaterialNode samples atlas (trilinear + Chebyshev) → indirect diffuse
```

Kernels 2–6 dispatch via `renderer.compute(node)`; kernel 7 is the normal material pass with the DDGI node injected into indirect lighting. Bounce > 1 is implicit (probes sample other probes next frame), giving infinite bounce without extra passes.

---

## 6. Frozen parameter table (start here, tune later)

| Parameter | Value | Notes |
|---|---|---|
| `PROBE_NUM_RAYS` | 256 | RTXGI default |
| `PROBE_IRRADIANCE_INTERIOR` | 6 (→ 8×8 w/ border) | low angular res |
| `PROBE_DISTANCE_INTERIOR` | 16 (→ 18×18 w/ border) | high angular res for visibility |
| `PROBE_HYSTERESIS` | 0.97 | EMA history weight |
| `PROBE_DISTANCE_EXPONENT` | 50 | depth-discontinuity sharpening |
| `PROBE_ENCODING_GAMMA` | 5 | storage tone curve |
| `PROBE_IRRADIANCE_THRESHOLD` | 0.25 | large-change detection |
| `PROBE_BRIGHTNESS_THRESHOLD` | 0.10 | impulse clamp |
| `PROBE_RANDOM_BACKFACE_THRESHOLD` | 0.10 | inside-geometry reject |
| `PROBE_FIXED_BACKFACE_THRESHOLD` | 0.25 | relocation/classification |
| `PROBE_VIEW_BIAS` / `PROBE_NORMAL_BIAS` | 0.1 / 0.1 | world units |
| `PROBE_MAX_RAY_DISTANCE` | `‖spacing‖·1.5` | far-hit clamp |
| `PROBE_SPACING` | 2–3 m (scene-tuned) | sparser often leaks less |
| `NUM_FIXED_RAYS` | 32 | relocation/classification |

---

## 7. Milestones

| Milestone | Deliverable | Acceptance |
|---|---|---|
| **M1 — Core math (pure)** | `core/` modules + unit tests | Blocked on the §10.0 consumer gate; then `npx tsc -b --noEmit` green; oct/Fibonacci/Chebyshev/EMA reference-tested against hand-computed values (golden vectors). No GPU yet. |
| **M2 — Trace + blend (WebGPU)** | `BVHComputeData` + `traceKernel` + `blendKernel` + `borderKernel`; static scene | A Cornell-box-like scene shows converging irradiance with **zero light leaks through a thick wall**; `window.__ddgi` debug probes visualizable. |
| **M3 — Query / material integration** | `DdgiMaterialNode` samples the atlas in a lit material | Indirect diffuse visibly responds to a **moving emissive light**; Chebyshev rejection verified (wall blocks light). |
| **M4 — Dynamic + robustness** | `relocateKernel` + `classifyKernel`; `updateTransforms()`; fallback ladder | Probe relocation removes interior probes; hysteresis converges with no flicker; `?gi=0` falls back cleanly. |
| **RC — Demo + docs** | Demo scene + `references/ddgi/README.md` + verification report | 30 fps floor (mid desktop) at medium scale; 0 console errors; leak test passes; docs synced. |

---

## 8. Verification gates

```bash
npx tsc -b --noEmit        # 0 errors (repo gate)
npm run build               # tsc -b && vite build
npm run dev                 # localhost, strictPort
```

Browser playtest (kilo-playwright MCP):
- **Leak test:** a thick wall between an emissive card and a shadowed volume → shadowed side stays dark (Chebyshev + depth moments reject through-wall light). This is the *defining* DDGI correctness check.
- **Dynamic test:** move the light → GI updates within a few frames *when the threshold-drop path fires* (α=0.97 alone is a ~33-frame time constant); no flicker.
- **Off-screen test:** an off-screen emissive card still lights the visible floor (proves world-space, not screen-space).
- **Fallback test:** `?gi=0` (or no `navigator.gpu`) → `LightProbeGrid` baked path or raster, no crash, no state loss.
- **Debug hooks:** `window.__ddgi` exposes probe atlas readback + per-probe state (mirrors `9_3dplatform` `__rt`/`__bvh` convention).

---

## 9. Risk register

| Risk | Mitigation |
|---|---|
| `three-mesh-bvh/webgpu` API is marked "unstable" | Pin exact version; isolate behind `BvhProvider`; watch CHANGELOG. Note: `getShapecastFn()` returns WGSL **source strings** to compose into a TSL `Fn` — the coupling is the compute-kernel plumbing itself, so a swap is a shader rewrite, not a one-file adapter. |
| No workgroup shared memory in TSL | RTXGI's blend pass reduces over rays *within* a probe using groupshared memory. TSL exposes `workgroupBarrier()` but no groupshared-array helper — a faithful port is an **algorithmic rewrite of the hot-path reduction** (`numProbes × 256` rays, every frame), not a small note. Plan a per-ray scatter + `atomicAdd`/`storageBarrier()` reduce, or drop to `wgslFn()` (which doesn't take struct params — pass scalars). |
| Material integration is bigger than one node | `MeshStandardMaterial` has no "indirect diffuse GI" injection point — needs a custom node material or a patched standard material, **plus** keeping the `three-mesh-bvh` scene in sync with the visible scene (double bookkeeping for dynamic objects). |
| Light leaking (inherent to DDGI) | Thick walls in test scenes; 2–3 m spacing; 16×16 distance texels; Chebyshev cube + crush; depth clamp `‖spacing‖·1.5`; tune `probeViewBias`. |
| WebGPU availability (Firefox/Safari/headless) | `navigator.gpu` gate → baked `LightProbeGrid` → raster. GI is cosmetic, never gameplay-critical (repo rule). |
| `atomicAdd` ordering / race at high dispatch | DDGI probe accumulation is small (per-probe texels), far below the documented 100M–1B atomic race threshold; if hit, use dual counters. |
| RTXGI license | **Port the technique, never copy HLSL** — all math re-expressed in WGSL from the paper's public formulas. |
| Hysteresis latency on fast lighting changes | Threshold-triggered hysteresis drop (`h −= 0.75`); document the trade-off. |

---

## 10. Gates & open questions

Question 0 is a hard gate — **M1 must not start until it is answered**. Questions 1–4 are design decisions to settle before M2.

0. **Does any project actually need DDGI *now*?** No VibeGames project has asked for it, and the only plausible host (`9_3dplatform`) is design-doc-only — its Tier-2 ray tracer doesn't exist yet either. **Gate: don't start M1 until a concrete consumer (a scene that needs world-space off-screen / infinite-bounce diffuse) is named.** DDGI's value is marginal for stylized platformers — `10_phasewalk` explicitly rejects ray tracing — so the correct order is raster tier → RT tier → then decide whether a specific scene needs world-space dynamic bounce GI at all.
1. **Where does this land?** Standalone `references/ddgi/`-scoped addon (portable, reusable) vs. inside `9_3dplatform`'s RT tier (which would require **writing the BVH first** — `core/bvh.ts` is a TDD contract, not existing code). Affects the `BvhProvider` decision in §2.
2. **Bounce budget:** v1 infinite-bounce (probes sample probes) is free; do we need an explicit bounce cap for art control?
3. **Multi-volume / cascades:** out of scope for v1, but the grid config should not preclude a second `DDGIVolume` later.
4. **Specular add-on:** `speedball-gi` reuses DDGI rays for rough reflections — a possible M4+ stretch, not v1.

---

## Sources

See [research.md](research.md) — full bibliography and the algorithm/parameter source notes live there.
