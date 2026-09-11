# raytrace-demo

A standalone, self-contained **Three.js + TypeScript + Vite** demo that pulls
`patapon3D`'s global voxel raytracer out of the game and shows it running on its
own. The raytracer core is copied **verbatim** from `6_patapon3D` — nothing in it
was modified or re-implemented.

**WebGL-first.** CPU voxelization builds a material-ID grid into a
`Data3DTexture`; a GPU GLSL3 fragment shader does Amanatides-Woo DDA voxel
marching with real sun light, deterministic soft shadows, voxel AO, Blinn-Phong
highlights, and **ReSTIR** temporal-resampling GI. **WebGPU-ready.** The whole
path sits behind a `RaytraceBackend` interface so a `three/webgpu` +
`three/tsl` compute raytracer can be swapped in later (see the stub and its block
comment) without touching `main.ts`.

## Run

```bash
npm install
npm run dev     # dev server (http://localhost:5210)
```

The page headers a small info panel noting this is the standalone voxel ray-trace
demo. Orbit the scene — a rolling procedural terrain, a voxel sun, a castle, and
a tree cluster — under a day/night sun.

## Scripts

| command           | what it does                                             |
| ----------------- | -------------------------------------------------------- |
| `npm run dev`     | Vite dev server (port 5210, `strictPort`)                |
| `npm run typecheck` | `tsc -b --noEmit` — strict TS, 0 errors required         |
| `npm run check`   | `node scripts/smoke.mjs` — headless Playwright smoke gate |
| `npm run build`   | `tsc -b && vite build`                                   |
| `npm run preview` | serve the `dist/` build                                  |

The smoke gate (`npm run check`) spawns Vite, launches headless Chromium under
SwiftShader, waits for `window.__rtDemo`, asserts `kind === 'raytrace'` and
`fps > 0`, verifies zero console errors, and writes a screenshot to
`smoke/raytrace-demo.png`. It exits non-zero on any failure.

## Structure

```
src/engine/raytrace/        ← copied verbatim from 6_patapon3D (the raytracer core)
src/backend/                ← the WebGL-first / WebGPU-ready seam
src/scene/demoWorld.ts      ← the standalone demo scene (VoxelSceneBuilder)
src/snapshot.ts             ← RcSnapshot + camera (orbit) / lighting (day-night) factories
src/main.ts                 ← bootstrap: probe → pick backend → animate → __rtDemo
scripts/smoke.mjs           ← headless smoke gate
```

## Port-notes (copied files → 6_patapon3D origin)

| this project                                | origin (6_patapon3D/src/engine/raytrace/)      | notes                                            |
| ------------------------------------------- | ---------------------------------------------- | ------------------------------------------------ |
| `src/engine/raytrace/VoxelRaycaster.ts`      | `VoxelRaycaster.ts`                            | verbatim — CPU voxelize + GPU DDA/ReSTIR, GLSL3  |
| `src/engine/raytrace/SceneContract.ts`       | `SceneContract.ts`                             | verbatim — `SceneRenderer` / `VoxelSceneBuilder` / camera / lighting |
| `src/engine/raytrace/capability.ts`          | `capability.ts`                                | verbatim — `probeCapabilities()`                  |
| `src/engine/raytrace/RaytraceAdapter.ts`     | `RaytraceAdapter.ts`                           | verbatim — WebGL-owned `SceneRenderer` impl      |

Everything else in this folder is new demo glue (backend seam, scene, bootstrap,
smoke gate).

## Backend seam

`src/backend/RaytraceBackend.ts` defines the demo-facing surface: `init`,
`render`, `setSize`, `setQuality`, `dispose`, plus `readonly kind` and a
`capability` result. `RaytraceWebglBackend.ts` owns a `THREE.WebGLRenderer` + the
copied `VoxelRaycaster` + a `VoxelSceneBuilder` (mirroring how `RaytraceAdapter.ts`
wires them). `RaytraceWebgpuBackend.ts` is a stub: `kind: 'webgpu'`, its
constructor throws a clear "not implemented" error, and a block comment sketches
the planned TSL compute swap (DDA + ReSTIR as `wgslFn` compute kernels).
