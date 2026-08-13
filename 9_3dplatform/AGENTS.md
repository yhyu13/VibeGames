# 9_3dplatform — Project AGENTS.md

> Project-level rules for agents working in this directory. The monorepo root `../AGENTS.md` is the umbrella rule set; this file is its child.

## 1. One-liner

PRISM LEDGE (棱镜断崖) — a 3-minute-per-island precision 3D platformer collectathon with the `6_patapong3D` PBR art DNA rebuilt on **real PBR meshes** (procedural geometry + `MeshPhysicalMaterial`, no voxels), plus an experimental **WebGPU TSL ray-traced tier** on top of a guaranteed raster PBR fallback. Ship scope: 3 islands × (8 required 光棱 + 2 reflection-only 幽光棱) = 30 prisms, one keeper, fixed 3/4 camera, dash + slow-mo (v0.1.1).

## 2. Scope discipline

- `concepts/` (2026-08-13) holds **12 drafted alternative 3D platformer concepts**, each structured per the intro-scene-until-perfect skill (1 intro scene + 命题证明 + 极致 case + 范围三分法 + 4 维完美定义 + P0–P7 + 先例诚实标注). **05 PHASEWALK is PROMOTED (2026-08-13)** → `10_phasewalk/` (toon-shading 3D, paper-cut style — the PBR/RT tiers of this project do NOT apply to it). Promoting another one = split into GDD/Art Book/TDD + top-level `NN_xxx/` project dir (port 5188+). README.md has the comparison matrix and the pick recommendation. `showcase/` + `docs/exhibition.md` (2026-08-13) = the visual companion: a three-0.170-core procedural diorama app (`showcase/index.html?scene=1..12`, import path points at `6_patapong3D/node_modules`, serve from repo root) with one frozen 极致-case screenshot per concept in `showcase/screens/`, assembled into a game-exhibition doc.

- **Two render tiers, one game**: Tier 1 raster PBR (WebGL2, `RoomEnvironment` IBL + ACES 1.1, SSAO + SSR + bloom) is the ship baseline and the reviewable/testable path. Tier 2 is a **self-authored TSL compute ray tracer** behind `STRETCH_FLAGS.rayTracer` + `navigator.gpu` detection with a seamless fallback ladder. RT must NEVER be a gameplay dependency — identical sim, identical collision, identical level data on both tiers.
- **Verified fact (2026-08-13)**: neither three r170 nor r185 ships an official realtime raytracing example — do not look for `TSL.rtScene()` or a `webgpu_raytracing` example; the RT pass is custom (BVH in storage buffers, 1 spp + temporal reprojection + bilateral denoise). The `claude/` alternative proposal's `trace()`/`.attenuation()` TSL nodes and browser-native `RayTracingPipeline` do not exist — do not implement against them (see GDD.md §6). Scope RT to M3; M1/M2 must not depend on it.
- Three pinned to **0.185.0** (not 6_patapong3D's 0.170). Reference `node_modules/three/examples/jsm/` of the installed package for addons (`RoundedBoxGeometry`, `RoomEnvironment`, `SSRPass`).
- Zero runtime assets: procedural geometry + Web Audio recipes (`core/data/sfx.ts` pure data, synthesis in `engine/AudioManager.ts`) — repo convention. Runtime stays zero-network.
- **Optional Tripo build-time asset pipeline (user-added, v0.1.1)**: hero meshes may be generated offline via `scripts/tripo.ps1` (Tripo v3 P-series text-to-model → PBR GLB, `https://openapi.tripo3d.com/v3`). Key source: env `TRIPOD_API_KEY` else repo-root `tripo.md` (**gitignored at root — never commit keys**). Generated GLBs are local build-time assets; the running game makes no API calls.
- No test suite: `npx tsc -b --noEmit` + browser playtest are the gates (matches `6_patapong3D`/`8_lifegame`).

## 3. Stack + commands

Vite 6 + React 19 + TypeScript strict + zustand 5 + three 0.185.0. Dev server port **5186** (strictPort — 3000/5173/5183/5185 taken). `npm run dev` / `npm run build` (= `tsc -b && vite build`). `node_modules/`/`dist/` NOT committed (own `.gitignore`); first run needs `npm install`.

## 4. Architecture (C.A.T)

`src/core/` is platform-pure (types, constants, `data/levels.ts` + `data/sfx.ts`, `simulation/` = playerPhysics/collision/pickups/bvh/GameSim — zero three/react/zustand). `src/engine/` adapters: SceneManager, MeshFactory (procedural real-PBR meshes), RasterRenderer (Tier 1), RayTracer (Tier 2), RenderGateway (tier selection + RT badge), PostFX, CameraRig (fixed 3/4: player + (0,4.2,6.5), spring), InputManager, AudioManager, ParticleSystem, devtools (`window.__sim` / `__scene` / `__rt` / `__bvh`), storage. `src/store.ts` (zustand) wraps `core/simulation/GameSim.ts`; `src/components/` are thin overlays. Fixed-timestep 1/60 sim decoupled from rAF render.

## 5. Frozen contracts (do not change signatures without a TDD bump)

`types.ts` / `constants.ts` / `data/levels.ts` are immutable after M1 scaffolding (kimi3 workflow): `GameState`, `PlayerState`, `LevelData`, `InputState`, `stepPlayer()`, `buildBvh()`, and the §4 numeric tables of `TDD.md` (physics constants incl. DASH_*/SLOWMO_*, renderer constants, RT constants). Level content lives in `data/levels.ts` data only — never mutate physics to fit a level. `claude/` (Aurora Ascent) is an archived alternative proposal, not a second spec — canonical contracts live only in root `TDD.md`.

## 6. Known simplifications (see TDD.md for the trace)

- SSR (screen-space ray tracing) is the raster stand-in for the RT tier's true reflections; equivalence bar is "90% at a glance" (art-direction.md §5)
- RT transmission glass is not ray traced — shards are emissive + tinted bounce in Tier 2
- No dash/wall-jump (frozen out; M2+), no leaderboard, no i18n — Chinese-first UI text
- `rtMode` picks the tier at boot; mid-run it may flip rt→raster on fallback (never raster→rt) — the switch reloads only the render path, never game state
