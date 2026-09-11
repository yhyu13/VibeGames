# JOURNEY — raytrace-demo

Two-column ME/YOU record of the decisions made standing this demo up.

## Goal

| ME | YOU |
| -- | -- |
| Extract patapon3D's global voxel raytracer (DDA + ReSTIR) into a fully self-contained Three.js + TS + Vite demo. | Keep the raytracer core **verbatim** — battle-tested, don't touch internals. |

## WebGL-first choice

| ME | YOU |
| -- | -- |
| The raytracer is GLSL3 + `Data3DTexture` + `WebGLRenderer` — a WebGL-first project. Pin `three` 0.185.0 (and `@types/three` 0.185.0). | No `three/webgpu`. WebGPU could come later; for now WebGL is the working path, WebGPU is just the seam. |

## Backend seam

| ME | YOU |
| -- | -- |
| Wrap the path in `RaytraceBackend` so a WebGPU backend can substitute. Reuse `SceneContract.ts`'s `SceneRenderer` / `VoxelSceneBuilder` / `CameraState` / `LightingState` rather than inventing a parallel interface. | `RaytraceWebgpuBackend.ts` is a **stub** in this pass — constructor throws a clear "not implemented" error, with a block comment describing the planned TSL compute swap (DDA + ReSTIR as `wgslFn` compute kernels). |

## Scene choice

| ME | YOU |
| -- | -- |
| Standalone `demoWorld` scene: procedural rolling terrain (with a couple of manual bumps), a voxel sun, a voxel castle, and a tree cluster — so sun/moon lighting and soft shadows are visibly exercised. | No imports from patapon (`introScene`, `store`, `stageVisuals`, …). Everything the demo draws only needs the copied `MAT` ids + grid fill helpers. |

## Lighting drive

| ME | YOU |
| -- | -- |
| `visual.lighting` (sunDir / sunColor / moonDir / moonColor / moonIntensity / ambientScale / skyExposure) is driven by the demo, not patapon state. `snapshot.ts` owns the day/night + orbit factories; `demoWorld.drawDynamic` calls the day/night update each frame. | Sun goes below the horizon → moon takes over; ambient and sky exposure scale with sun height. |

## Gotchas

| ME | YOU |
| -- | -- |
| The grid y-axis tops out at world y≈13 — a "sun in the sky" voxel placed too high silently does nothing (fill helpers clamp). Put the voxel sun at y≈10.5. | The shader also draws its own procedural sun/moon in `skyColor`; the voxel sun is an extra lit object on top — that's intentional. |
| `noUnusedLocals` / `noUnusedParameters` are on in strict TS — every helper must be actually used (dropped a `window.__fft` crutch). | A comment-only placeholder is not enough; use `void x` or remove. |
| Project refs follow patapon shape: `tsconfig.json` solution → `tsconfig.app.json` (src) + `tsconfig.node.json` (vite config). | `tsc -b` is used for both typecheck and the build step. |
| Smoke gate spawns Vite itself (port 5210, strictPort) and loads Playwright from the machine-wide bun cache — no project-level playwright dep, mirrors patapon. | Headless Chromium + SwiftShader → works without a real GPU; `--use-gl=swiftshader` + `--enable-webgl`. |
| Don't run `npm` at the repo root — root has no package.json. All npm commands happen inside `16_raytrace_demo`. | — |

## How it ran

- `npm install` → `package-lock.json` created (required by the framework dependency rule).
- `npm run typecheck` → clean.
- `npm run check` → smoke gate, screenshot to `smoke/raytrace-demo.png`.
- `npm run build` → success.
