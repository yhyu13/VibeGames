# RC Demo — 2D Radiance Cascades

A `Three.js + TypeScript + Vite` study project that ports the proven 2D Radiance
Cascades (RC) pipeline from `7_hotlineShanghai/rc-lab/` into a **fully
self-contained** renderer. Three.js owns the GL context and the render targets;
every RC pass runs as a `THREE.RawShaderMaterial` over a single fullscreen
triangle. The shader math is byte-identical to rc-lab — this is a faithful,
low-risk plumbing port whose purpose is to (a) validate the RC technique and
(b) validate three.js offscreen multi-pass rendering.

The rc-lab assertion suite is the oracle: the ported `verify.ts` must reproduce
all ~37 relative/threshold checks (radial decay, wall shadow, hue, SDF vs CPU,
radial smoothness, centroid, and 576-point two-frame determinism) plus the
cross-implementation `port-check`.

## Run

```bash
cd 15_rc_demo
npm install          # creates package-lock.json (required by the framework dep rule)
npm run typecheck    # strict TS, 0 errors
npm run build        # tsc -b && vite build
npm run check        # headless gate: starts vite dev, runs Playwright/SwiftShader
```

`npm run check` asserts the auto-verification report is green (`report.ok ===
true`, all checks pass, determinism `diffPixels === 0`), collects zero console
errors, and writes `smoke/rc-demo.png`.

## Structure — WebGL-first, WebGPU-ready

The demo never talks to a specific GPU API. It consumes a `RcBackend` interface
(`src/backend/RcBackend.ts`), so a future `RcWebgpuBackend` can substitute.

```
src/
  types.ts                   LabPipelineConfig/LabSceneInput/LabStageTimings/LabReadStage + RcRunner
  scenes.ts                  the 6 deterministic scenes + LabSceneInput builder
  verify.ts                  the assertion engine (runScene/runAll → LabReport)
  port-check.ts              cross-implementation check (second self-contained backend instance)
  main.ts                    UI wiring + window.__rcDemo debug hook
  shaders/                   10 GLSL ES 3.00 files (copied verbatim from rc-lab)
  backend/
    RcBackend.ts             the interface + RcBackendKind + backendFactory
    RcWebglBackend.ts        WebGL-first: RawShaderMaterial multi-pass renderer
    RcWebgpuBackend.ts       STUB — three/webgpu + three/tsl compute swap (not implemented)
scripts/smoke.mjs            headless Playwright gate
```

`backendFactory('webgl')` returns the WebGL backend today; the `'webgpu'` branch
is wired but intentionally returns the throwing stub (see the documented TSL
compute plan in `RcWebgpuBackend.ts`).

## How the port works

- **One fullscreen triangle** (`src/backend/RcWebglBackend.ts` → `buildGeometry`):
  a `THREE.BufferGeometry` whose attribute is `aPosition` — exactly the
  `layout(location = 0) in vec2 aPosition` that `fullscreen.vert` declares.
  RawShaderMaterial does **not** auto-map a `position` attribute, so the vert's
  own attribute name is wired directly.
- **Offscreen `THREE.WebGLRenderTarget`s** (RGBA8) mirror rc-lab's sizes /
  filters: `seed`/`jfaA`/`jfaB`/`sdf`/`final` = `W×H`, `cascadeA`/`cascadeB`/
  `interval`/`direct` = `W×atlasH` where `atlasH = ceil(h / 2^(cc+2)) · 2^(cc+2)`.
- **Pass sequence / uniforms / ping-pong** are identical to rc-lab `render()`:
  prepscene → prepjfa → JFA ping-pong → distfield → cascade loop (interval +
  merge, two-loop direct→indirect) → final → blit.
- **Input textures**: `THREE.DataTexture` for occlusion/emission/sceneColor with
  `flipY = true`, mirroring rc-lab's `UNPACK_FLIP_Y_WEBGL = 1` (top row = row 0).
- **Readback**: `renderer.readRenderTargetPixels` with the same y-inversion as
  rc-lab's `readPixel` (the assertion oracle reads the same GL-space coords).

### Gotchas baked in

- Do **not** set `glslVersion` on the RawShaderMaterial — our shaders already
  declare `#version 300 es`; three.js would inject a second `#version`.
- `renderer.autoClear` is disabled; the fullscreen draw covers the whole target.
- Readback uses the public `readRenderTargetPixels`; the raw-GL framebuffer
  handle (`__webglFramebuffer`) is accessed via a typed-erasure helper only for
  the debug probes, never in the assertion path.

## Port notes (file → rc-lab origin)

| This project                          | Origin (`7_hotlineShanghai/rc-lab/`)            | Change                         |
| ------------------------------------- | ----------------------------------------------- | ------------------------------ |
| `src/types.ts`                        | `pipeline.ts` (types + DEFAULT_LAB_CONFIG)      | moved to `src/types.ts`        |
| `src/scenes.ts`                       | `scenes.ts`                                     | verbatim (type import path)    |
| `src/verify.ts`                       | `verify.ts`                                     | verbatim (RcRunner import path)|
| `src/port-check.ts`                   | `port-check.ts`                                 | reference impl is a 2nd backend|
| `src/main.ts`                         | `main.ts`                                       | `RcBackend` + `__rcDemo`       |
| `src/backend/RcBackend.ts`            | `pipeline.ts` (`RcLabPipeline` surface)         | extracted interface           |
| `src/backend/RcWebglBackend.ts`       | `pipeline.ts` (`RcLabPipeline` class)           | raw GL → RawShaderMaterial     |
| `src/backend/RcWebgpuBackend.ts`      | —                                               | new stub (future TSL swap)     |
| `src/shaders/*` (10 files)            | `shaders/*`                                     | byte-identical                 |
| `index.html`                          | `index.html`                                    | controls + header copy         |
| `scripts/smoke.mjs`                   | `6_patapon3D/scripts/smoke.mjs` (pattern)       | redesigned for this demo       |

## Tech

- `three` pinned `0.185.0`, `@types/three` `0.185.0`, `typescript` ^5.6, `vite` ^6.
- Strict TS, `moduleResolution: 'bundler'`, project references (`tsc -b`).
