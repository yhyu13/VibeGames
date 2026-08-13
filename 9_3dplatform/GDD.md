# GDD — PRISM LEDGE (棱镜断崖) v0.1.1

Rendering provenance: this game's look is inherited from `6_patapong3D`'s PBR art direction (warm rim-lit "Patapon" ceramic figures on dramatic dark stages, `RoomEnvironment` IBL + ACES Filmic tone mapping) — but the renderer is rebuilt on **real PBR meshes** (procedural beveled geometry + `MeshPhysicalMaterial`, no voxels) and takes the lighting two steps further with a **ray-traced tier**: true reflections, refractions-of-light, and bounced indirect light via a WebGPU TSL ray tracer, layered on top of a guaranteed raster PBR fallback. See `TDD.md` §5 for the two-tier pipeline and `docs/design/01-art-direction.md` for the art bible.

## 1. One line + why

A 3-minute-per-island **precision 3D platformer collectathon** where you are the last lantern keeper climbing three sinking dusk islands to relight the great lighthouse, and where **the ray tracer is the selling point**: mirror-smooth tide pools, glass prisms and burnished brass aren't decoration — they are the light physics that makes every jump readable and every scene a screenshot. The thesis: *platformers are read through light and shadow; so we render them with actual light* — real-time ray tracing on meshes, not voxels, not faked screen-space.

We build it because:
- The repo already proved the PBR pipeline on `6_patapong3D`; this project keeps that art DNA and upgrades the geometry from voxels to real meshes + an experimental WebGPU ray-tracing tier — a genuine technical differentiator for a web jam game.
- A **fixed 3/4 camera + bounded island arenas** is the smallest camera/gameplay surface that still makes ray-traced reflections visible every second (you can't RT-showcase a top-down view).
- RT is scoped as a **progressive enhancement**: the game is fully playable and beautiful on the raster tier; the RT tier is a feature-flagged bonus on WebGPU browsers.

## 2. Scope (frozen)

**Ship scope (this repo, this GDD):**
- **3 islands × 1 playable keeper** — 灯塔岛 (Lighthouse Isle, tutorial + first mirror pools), 雾港 (Mist Harbor, moving platforms + glass prisms), 顶灯室 (The Lantern Room, vertical ascent in near-dark, lit by the RT tier's own light). Each island ≈ 2–3 min, 8 required 光棱 (light prisms) + **2 bonus 幽光棱 (ghost prisms, v0.1.1) visible ONLY in reflective surfaces** (SSR on raster, true bounce on RT — the same read on both tiers, parity by construction) — **30 prisms total**; ghost prisms never gate the exit, they count toward 100%/S-rank.
- **Movement kit**: move (WASD/arrows, 8 m/s), jump (11 m/s), double jump (9.5 m/s), **dash (v0.1.1, Shift, 14 m/s × 0.18 s = 2.5 m horizontal burst, 0.5 s cooldown, no i-frames — fall is the only death)**, coyote time 0.10 s, jump buffer 0.12 s, variable jump height (release = velocity × 0.5), max fall 25 m/s. No wall-jump (frozen out; see M2+). Air control 0.85.
- **慢镜 slow-mo (v0.1.1, accessibility + double-jump timing aid)**: hold L — time scales to 0.5× for up to 2 s, 8 s cooldown; the sim dt scales but the island timer keeps REAL time (speedrun-honest).
- **Collectathon + speedrun loop**: 8 required prisms per island open the exit gate (prism counter); 2 ghost prisms per island are the 100% chase. Best times + total prisms persist in localStorage (`9-3dplatform.v1.progress`). Death = fall below island → respawn at last checkpoint (prisms already collected stay collected; the timer keeps real time — speedrun-honest).
- **Rendering: two tiers, one art direction** (the heart of this project):
  - **Tier 1 — Raster PBR (ship guarantee, every browser)**: real mesh geometry (beveled platforms, lathe lighthouse, icosahedron glass shards, mirror-metal tide pools), `MeshPhysicalMaterial` (clearcoat ceramic keeper, transmission glass, metalness brass/water), `RoomEnvironment` IBL, ACES Filmic tone mapping exposure 1.1, low-angle warm sun with 2048 soft shadows, SSAO, **SSR (screen-space ray traced reflections — literally screen-space ray tracing)**, bloom, vignette + film grain.
  - **Tier 2 — WebGPU TSL ray tracing (progressive enhancement, auto-on when `STRETCH_FLAGS.rayTracer && navigator.gpu`; `?rt=1`/`?rt=0` force on/off for testing)**: a hand-rolled compute ray tracer over the level's real triangle meshes (CPU median-split BVH built at level load, flat storage buffers), primary ray + up to 2 bounces, GGX sun sampling, emissive lanterns as light sources, 1 sample/frame with temporal reprojection accumulation + bilateral denoise, 0.75× resolution scale. Reflective water and brass are *actually* ray traced. HUD shows an `RT` badge when active.
  - Feature flag `STRETCH_FLAGS.rayTracer` (default **on** with graceful fallback), mirroring the `5_gamejam_1` `STRETCH_FLAGS` convention.
- **Procedural everything**: zero runtime network calls — geometry is procedural by default (beveled boxes, lathe, spheres, icosahedra), all audio Web Audio synthesized (`core/data/sfx.ts` recipes), sky/sea/fog procedural. **Optional build-time Tripo pipeline (v0.1.1, user-added)**: hero meshes may be generated offline via `scripts/tripo.ps1` (Tripo v3 P-series → PBR GLB, committed as local assets); the running game stays offline.
- **Fixed 3/4 low-angle follow camera** (Patapon homage): position = player + (0, 4.2, 6.5), damped spring, lookAt player + (0, 1, 0). No camera control — this freezes the camera's motion budget for the RT tier and keeps the game readable.
- **UI**: menu → level intro card → playing (HUD: prism counter, timer, checkpoint, RT badge) → pause → level clear (time + prisms, best-time delta) → victory (all 3 islands: total time, total prisms, rank S/A/B by time). Chinese-first UI text (repo convention).
- **Audio**: SFX catalogue in `core/data/sfx.ts` (jump, double jump, land, collect, checkpoint, gate, clear, UI, fall) + 3 procedural ambient pads, one per island (sea/dawn, harbor/dusk, lantern/night). Zero audio files.

**Data-frozen (types exist, not ship-reachable this scope):** more keeper skins, shard magnet power-up, dash/wall-jump mechanics, moving hazards, boss/clock-tower finale, leaderboard backend, full Chinese/English i18n.

**M2+ route (not modeled):** 4th island, ghost replay (best-run ghost), RT denoiser upgrade (SVGF), SSR/Ray-tracing parity cleanup, gamepad support, mobile touch.

## 3. Core loop

One island = 5 beats, run in `GamePhase` order `level_intro → playing → (paused) → level_clear → victory`:

1. **进场 (landing)** — level intro card: island name, prism count, current best time; the keeper lands on the spawn platform.
2. **跳跃 (move/jump/dash)** — move + (double) jump + dash across beveled platforms; the camera holds its 3/4 frame so every jump is read against the warm backlit horizon; tide-pool reflections and prism glints are the pathfinding language (mirrors show hidden platform edges; glowing prisms mark the route).
3. **收集 (collect)** — touching a 光棱 collects it (+chime, +sparkle burst); 8/8 opens the island gate with a light-beam reveal; 幽光棱 ghost prisms hide in reflections only (+rare chime, the 100% chase).
4. **坠落/重生 (fall/respawn)** — falling below the island → respawn at last checkpoint (prisms kept, timer keeps running — speedrun-honest).
5. **登顶 (clear)** — through the gate → `level_clear` card: time, prisms, best-time delta; island 3 → `victory` with total time/prisms and S/A/B rank (S ≤ 1:30 / A ≤ 2:15 / B else per island).

## 4. "Perfect" definition (4-dim checklist, mirrors intro-scene-until-perfect §5.6)

- **Visual**: within the first 5 seconds the player sees *their own reflection* in a tide pool under a warm dusk sun — no explanation needed why this game is ray traced; the raster tier must look 90% as good (the "wow" is the pipeline's, not the player's hardware).
- **Feel**: jump distance/height readouts (2.02 m single, 3.5 m total) make every gap fair; landing has squash + dust + soft thud; collection has chime + burst + HUD pop.
- **Performance**: 60 fps on the raster tier on a mid desktop (≤ 30 draw calls, ≤ 40k tris/level, ≤ 8 dynamic lights); RT tier at 0.75× scale, temporal accumulation, adaptive drop to 30 fps target on weak GPUs; cold load ≤ 1.5 s.
- **Replayability**: 24 required + 6 ghost prisms across 3 islands with per-island best times; S-rank (time) + 100% (ghost prisms) chasing; the RT tier doubles as a "screenshot mode" — every island is a vista.

## 5. Next document

`TDD.md` v0.1 freezes: the two-tier renderer contract (`SceneManager` / `RayTracer` / `RasterRenderer`), the pure physics/collision core, level data format, numeric tables, and the verification gates. `docs/design/01-art-direction.md` freezes the palette, material cheat-sheet and the raster↔RT equivalence matrix.

## 6. Design provenance & playtest-driven fixes

- Rendering reference: `6_patapong3D` (AGENTS.md entry) — PBR Patapon art, `RoomEnvironment` + ACES Filmic; this project's `docs/design/01-art-direction.md` transcribes that look for real meshes.
- `claude/` holds the alternative **Aurora Ascent** proposal (reviewed 2026-08-13): its ray-tracing plan rests on APIs that do not exist in any shipped three build (browser-native `RayTracingPipeline`, `trace()`/`.attenuation()` TSL nodes) and on CDN HDR/GLB/DRACO/KTX2 assets that break the repo's zero-asset/zero-network convention — not implementable as written. Three ideas were salvaged and merged (v0.1.1): **dash as 4th verb, slow-mo toggle, reflection-only ghost prisms**. Canonical docs are the files at this directory's root, not `claude/`.
- Control reference: precision platformer conventions (variable jump, coyote, buffer) — these are frozen in `TDD.md` §4 before any code.
- This section records real bugs once playtesting starts (8_lifegame convention: doc-only design can't catch what play reveals).

## 7. Terminology

- 光棱 = light prism (collectible, required). 幽光棱 = ghost prism (reflection-only bonus). 守灯人 = the lantern keeper (player). 顶灯室 = the Lantern Room (island 3).
