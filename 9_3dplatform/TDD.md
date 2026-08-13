# TDD — PRISM LEDGE (棱镜断崖) (current contract v0.1.1)

| Version | Date | Change |
|---|---|---|
| v0.1 | 2026-08-13 | Initial contract: two-tier renderer (raster PBR ship-guarantee + WebGPU TSL ray tracing feature-flagged), pure physics core, 3-island collectathon scope, procedural PBR meshes + procedural audio, zero assets |
| v0.1.1 | 2026-08-13 | Review pass + `claude/` (Aurora Ascent) idea merge: dash 4th verb + slow-mo toggle; 幽光棱 ghost prisms (reflection-only bonus); RT temporal reprojection (accumulation survives the moving camera); BVH split (core pure `buildBvh(triangles)` + engine `BvhBuilder`); unified 10-float BVH node layout; `?rt` flag semantics; `rtMode` rt→raster mid-run flip; DPR cap 1.0; seeded VFX; exponential camera damping |

## 1. Stack (locked)

| Dep | Version | Use |
|---|---|---|
| vite | ^6.0.0 | build / dev server **5186** (strictPort — 3000/5173/5183/5185 taken by sibling projects) |
| typescript | ^5.6.0 | strict typecheck |
| react / react-dom | ^19.0.0 | UI overlays (menu/HUD/pause/clear/victory) |
| zustand | ^5.0.0 | UI state |
| three | **0.185.0** | WebGL2 renderer (raster tier) + `three/webgpu` `WebGPURenderer` + TSL (`three/webgpu` build includes TSL node system) |

**Version note (locked rationale)**: three is pinned to the latest stable r185 — newer than `6_patapong3D`'s 0.170.0 because the WebGPU renderer + TSL maturity is required for the RT tier, and r185's `examples/jsm` is the reference source for `RoundedBoxGeometry`, `RoomEnvironment`, `SSRPass` (WebGL); the WebGPU SSR example (`webgpu_postprocessing_ssr.html`) is the reference for a TSL SSR node. **Verified fact: neither r170 nor r185 ship an official realtime ray-tracing example** (only offline `webgl_renderer_pathtracer`), and no browser WebGPU exposes a native `RayTracingPipeline` — the `claude/` alternative proposal's `trace()`/`.attenuation()`/`.distance()` TSL API claims do not exist in any shipped three build. The RT tier is therefore a self-authored TSL compute ray tracer — that is the core engineering risk and is why it sits behind `STRETCH_FLAGS.rayTracer` with an auto-fallback.

No Tailwind — a small plain CSS file for overlays (matches `8_lifegame`). No test runner — `tsc -b --noEmit` + browser playtest are the gates (repo convention). Zero runtime network calls; geometry is procedural by default, with an optional **build-time Tripo pipeline** (`scripts/tripo.ps1`, PBR GLBs committed as local assets — the running game stays offline).

## 2. Architecture (C.A.T)

```
9_3dplatform/
├── src/
│   ├── core/                     # platform-pure: zero three/react/zustand/DOM
│   │   ├── types.ts              # frozen contracts (this doc §3)
│   │   ├── constants.ts          # frozen numeric tables (§4): physics, level rules, renderer, RT
│   │   ├── data/
│   │   │   ├── levels.ts         # 3 island layouts: platforms/shards/checkpoints/gate/visual
│   │   │   └── sfx.ts            # SFX recipes (pure data, no AudioContext) — repo convention
│   │   └── simulation/
│   │       ├── playerPhysics.ts  # stepPlayer() — pure integrator: gravity/move/jump/coyote/buffer
│   │       ├── collision.ts      # sphere-vs-AABB resolution + ground/step detection (pure)
│   │       ├── pickups.ts        # shard collection, gate open rule, fall/respawn rule
│   │       ├── bvh.ts            # buildBvh(triangles)/raycastBvh — pure functions over flat arrays
│   │       └── GameSim.ts        # orchestrator: reducer over GameState (sim step + phase machine)
│   ├── engine/                   # platform adapters
│   │   ├── SceneManager.ts       # scene graph from LevelData via MeshFactory; RoomEnvironment IBL
│   │   ├── MeshFactory.ts        # procedural real-PBR meshes (beveled platforms, lathe lighthouse,
│   │   │                         # icosahedron glass shards, mirror water, keeper character)
│   │   ├── RasterRenderer.ts     # Tier 1: WebGLRenderer + PBR materials + ACES + SSAO + SSR + bloom
│   │   ├── RayTracer.ts          # Tier 2: WebGPU WebGPURenderer + TSL compute RT (BVH storage
│   │   │                         # buffers, 1 spp + temporal reprojection + bilateral denoise)
│   │   ├── BvhBuilder.ts         # walks the scene graph at level load → bakes world-space triangles
│   │   │                         # → core buildBvh() → WebGPU storage buffers (RT tier + debug rays)
│   │   ├── RenderGateway.ts      # capability detect (navigator.gpu) + tier switch + RT badge signal
│   │   ├── PostFX.ts             # bloom/vignette/grain (WebGL EffectComposer OR WebGPU TSL)
│   │   ├── CameraRig.ts          # fixed 3/4 follow: pos = player + (0,4.2,6.5), spring, lookAt+ (0,1,0)
│   │   ├── InputManager.ts       # WASD/arrows + Space + P/Esc pause; queue into sim
│   │   ├── AudioManager.ts       # SFX_RECIPES synthesis + 3 procedural ambient pads
│   │   ├── ParticleSystem.ts     # collect sparkles, landing dust, gate beam, fall streaks
│   │   ├── devtools.ts           # DEV: window.__sim / __scene / __rt / __bvh stats
│   │   └── storage.ts            # localStorage 9-3dplatform.v1.progress (best times + total prisms)
│   ├── store.ts                  # zustand store wrapping GameSim (phase, HUD data, persistence)
│   └── components/               # React overlays (CSS, no Tailwind)
│       ├── MenuScreen.tsx        # title, island select (locked state), RT badge + browser info
│       ├── HUD.tsx               # prism counter (x/8), timer, checkpoint flag, RT badge
│       ├── LevelIntro.tsx        # island name card + best time
│       ├── PauseScreen.tsx       # resume / restart island / quit to menu
│       ├── LevelClear.tsx        # time, prisms, best-time delta
│       └── VictoryScreen.tsx     # total time/prisms, S/A/B rank
├── GDD.md / TDD.md / AGENTS.md / verification-report.md
└── docs/design/01-art-direction.md
```

**Why the BVH is split (`core/bvh.ts` pure + `engine/BvhBuilder.ts`)**: `LevelData` stores collider AABBs, not triangles — triangles exist only once `MeshFactory` generates the real meshes, so `BvhBuilder` (engine) bakes world-space triangles from the scene graph and `core/buildBvh()` stays a pure array-in/array-out function that the RT tier (and `devtools` debug rays) consume. It is still `STRETCH_FLAGS`-scoped work; the raster tier never touches it.

**Why two renderers instead of one WebGPU renderer with fallback**: `WebGPURenderer` cannot fall back to WebGL2 automatically, and the raster tier must run on any browser (including headless Playwright). `RenderGateway` owns tier selection; all game logic stays renderer-agnostic.

**Loop shape**: fixed-timestep `1/60` sim (`GameSim.step(dt, input)`, repo convention) decoupled from rAF render; render reads `GameState` every frame.

## 3. Data contracts (frozen)

```ts
// core/types.ts
export type GamePhase = 'boot' | 'menu' | 'level_intro' | 'playing' | 'paused' | 'level_clear' | 'victory'
export type Vec3 = { x: number; y: number; z: number }

export interface PlayerState {
  position: Vec3
  velocity: Vec3
  grounded: boolean
  jumpsUsed: 0 | 1 | 2
  dashCooldown: number  // seconds remaining (DASH_COOLDOWN)
  coyote: number        // seconds remaining (COYOTE_TIME)
  jumpBuffer: number    // seconds remaining (JUMP_BUFFER_TIME)
  facing: number        // +1 / -1 (render-only)
  shards: number        // collected in this island
  checkpoint: Vec3
  dead: boolean         // fell below island → respawn at checkpoint
}

export type MaterialId =
  | 'sandstone' | 'brass' | 'ceramic' | 'glass' | 'water' | 'lantern' | 'wood'

export interface Platform {
  id: string
  min: Vec3             // AABB, frozen — the collider IS the visual footprint
  max: Vec3
  material: MaterialId
  kind: 'static' | 'moving'
  move?: { axis: 'x' | 'y' | 'z'; range: [number, number]; speed: number; phase: number }
  // moving platforms sweep between min+move.range on the frozen axis; phase = sine offset
}

export interface Shard {
  id: string
  kind: 'prism' | 'ghost'  // prism = required (8/level, opens the gate); ghost 幽光棱 = bonus,
                           // visible ONLY in reflective surfaces (SSR on raster, bounce on RT — parity holds)
  position: Vec3
  collected: boolean
  bobPhase: number      // render-only
}

export interface Checkpoint { id: string; position: Vec3 }

export interface LevelVisual {
  id: string            // 'lighthouse' | 'harbor' | 'lantern_room'
  sunAzimuth: number    // degrees, per-level dusk
  sunElevation: number  // degrees, 5..14 (interior 顶灯室 uses the low end)
  fogColor: string      // hex, per-level
  seaReflectivity: number // 0.7..0.95 (drives water metalness in raster + bounce count in RT)
}

export interface LevelData {
  id: string            // 'isle_1' | 'isle_2' | 'isle_3'
  name: string          // 灯塔岛 / 雾港 / 顶灯室
  spawn: Vec3
  islands: Vec3         // fall-out boundary (island + margin)
  platforms: Platform[]
  shards: Shard[]       // exactly SHARDS_PER_LEVEL (8)
  checkpoints: Checkpoint[]
  gate: Vec3            // gate position; opens when shards == SHARDS_PER_LEVEL
  visual: LevelVisual
}

export interface InputState {
  x: number             // -1..1
  z: number             // -1..1 (mapped onto camera plane by the sim, not the renderer)
  jumpPressed: boolean  // edge-triggered by InputManager (buffer starts here)
  jumpHeld: boolean     // variable jump height (release × 0.5)
  dashPressed: boolean  // edge-triggered; horizontal burst only, no i-frames (no damage hazards in v0.1)
  slowmoHeld: boolean   // level; SLOWMO_SCALE × for SLOWMO_DURATION, SLOWMO_COOLDOWN
  pause: boolean
}

export interface GameState {
  phase: GamePhase
  levelIndex: number            // 0..2
  player: PlayerState
  level: LevelData
  shards: Shard[]               // mutable copies for collection
  elapsed: number               // island timer, seconds (keeps running through deaths)
  bestTimes: Record<string, number>   // levelId → seconds (persisted)
  totalPrisms: number           // persisted cumulative across islands
  finished: boolean             // all 3 islands cleared
  rtMode: 'raster' | 'rt'       // initial tier chosen at boot; may flip rt→raster mid-run on
                                // fallback (never raster→rt) — render path only, game state untouched
  frame: number
}

// pure sim API (GameSim.ts)
export function createInitialState(levelIndex: number, bestTimes: Record<string, number>): GameState
export function stepPlayer(s: GameState, input: InputState, dt: number): GameState
export function restartLevel(s: GameState): GameState          // keep bestTimes/totalPrisms
export function levelCleared(s: GameState): GameState           // persist best time, advance index
export function toVictory(s: GameState): GameState

// core/bvh.ts — flat arrays for upload to WebGPU storage buffers (Tier 2) and debug ray casts
export interface Bvh {
  triangles: Float32Array   // 9 * N (3 verts × xyz per triangle) — baked world-space by BvhBuilder
  nodes: Float32Array       // 10 * M per node: aabbMin.xyz, aabbMax.xyz, leftChild, rightChild, leafStart, leafCount
  root: number              // node index (0)
}
export function buildBvh(triangles: Float32Array): Bvh  // median-split on centroids, leaf ≤ 8 tris
export function raycastBvh(bvh: Bvh, origin: Vec3, dir: Vec3, maxT: number): { t: number; triIndex: number } | null
```

## 4. Frozen numeric tables

**Physics** (`core/constants.ts`, all m/s² / m/s / s — tuned for the jump-ability ceiling below):

| Constant | Value | Notes |
|---|---|---|
| GRAVITY | 30 | m/s² |
| MOVE_SPEED | 8 | m/s, ground |
| AIR_CONTROL | 0.85 | × ground accel in air |
| JUMP_VELOCITY | 11 | m/s → max jump height v²/2g = **2.02 m** |
| DOUBLE_JUMP_VELOCITY | 9.5 | m/s → combined ceiling ≈ **3.50 m** |
| DASH_SPEED | 14 | m/s horizontal burst |
| DASH_TIME | 0.18 | s → dash distance ≈ **2.5 m** (no i-frames — fall is the only death in v0.1) |
| DASH_COOLDOWN | 0.5 | s |
| SLOWMO_SCALE | 0.5 | time scale while held (L key) |
| SLOWMO_DURATION | 2 | s per hold |
| SLOWMO_COOLDOWN | 8 | s |
| JUMP_RELEASE_FACTOR | 0.5 | velocity × 0.5 on jump release (variable height) |
| COYOTE_TIME | 0.10 | s |
| JUMP_BUFFER_TIME | 0.12 | s |
| MAX_FALL_SPEED | 25 | m/s |
| PLAYER_RADIUS | 0.35 | m, horizontal capsule |
| PLAYER_HALF_HEIGHT | 0.60 | m |
| STEP_HEIGHT | 0.30 | m, auto-step up low ledges |
| FALL_DEATH_Y_OFFSET | 4 | m below island min-y |

Slow-mo scales the **sim dt**; `GameState.elapsed` accumulates REAL time (speedrun-honest — the island timer never benefits from slow-mo).

**Level rules**: `SHARDS_PER_LEVEL = 8` required prisms + `GHOST_SHARDS_PER_LEVEL = 2` bonus 幽光棱, `LEVELS = 3` (24 required + 6 ghost = **30 prisms total**). Ghost prisms are visible ONLY in reflective surfaces (SSR on raster, true bounce on RT — parity holds, art-direction.md §5) and never gate the exit; they count toward 100%/S-rank only. Reachability design law (frozen, applies to required prisms): every shard must be reachable with at most double jump from some platform edge — horizontal reach budget `MOVE_SPEED × 2 × (JUMP + DOUBLE)/GRAVITY × 0.6 ≈ 6.6 m`, vertical step ≤ 3.4 m, gap ≤ 6.5 m. Moving platforms never carry the player more than 12 m horizontal per cycle. Every island ≤ 24 platforms, ≤ 10 shards, ≤ 3 checkpoints, ≤ 12 moving platforms.

**Renderer (Tier 1 raster, ship-guaranteed)**:

| Constant | Value |
|---|---|
| ACES_EXPOSURE | 1.1 |
| SUN_COLOR | #ffb347 (warm dusk), intensity per level |
| SUN_SHADOW_MAP | 2048, PCFSoft |
| SSR_MAX_STEPS | 32, thickness 0.10, blur 3 |
| SSAO_RADIUS | 0.6, intensity 0.8 |
| BLOOM_THRESHOLD / STRENGTH | 1.0 / 0.35 |
| VIGNETTE / GRAIN | 0.35 / 0.04 |
| DPR_CAP | 1.0 (never auto-scale to `devicePixelRatio` — integrated GPUs lie about this) |
| CAMERA_DAMP_POS / ROT | `1 − exp(−8·dt)` / `1 − exp(−20·dt)` (frame-rate independent, replaced the spring-k wording) |
| WATER_METALNESS / ROUGHNESS | 0.9 / 0.02 (mirror pools — the RT showcase in raster) |
| GLASS_TRANSMISSION / ROUGHNESS | 1.0 / 0.05 |

**Ray tracer (Tier 2, WebGPU TSL, `STRETCH_FLAGS.rayTracer`)**:

| Constant | Value |
|---|---|
| RT_RESOLUTION_SCALE | 0.75 |
| RT_MAX_BOUNCES | 2 |
| RT_SAMPLES_PER_FRAME | 1 (temporal accumulation) |
| RT_ACCUM_FRAMES | 16 (accumulation resets on camera/object motion > threshold) |
| RT_LEAF_MAX_TRIS | 8 |
| RT_MAX_MATERIALS | 16 (mapped from MaterialId + emissive lanterns) |
| RT_DENOISE_RADIUS | 3 × 3 bilateral (σ_r = 0.05) |
| RT_PERF_GUARD | auto drop to 30 fps target + 0.6× scale when frame > 33 ms sustained |

**Audio** (`core/data/sfx.ts` — pure data recipes): jump (square 300→520 Hz, 90 ms), double jump (440→880, 110 ms), land (triangle 90 Hz thud + noise burst 40 ms), collect (sine chime 880→1320, 160 ms + sparkle noise), checkpoint (two-note bell 660/990), gate open (rising saw 220→880, 600 ms + beam noise), clear (3-note major arpeggio), fall (descending sine 400→80, 500 ms), UI (click 1200 Hz, 30 ms). 3 ambient pads: 2 detuned oscillators + slow LFO through lowpass, per-island root (sea D3, harbor A2, lantern room G#2).

**Persistence** (`engine/storage.ts`): key `9-3dplatform.v1.progress` → `{ bestTimes: Record<string, number>, totalPrisms: number }`.

**Determinism discipline**: sim runs at fixed dt 1/60 and is fully deterministic; visual-only randomness (particles, sea wobble, shard bob) is seeded from `level.id + elapsed` (8_lifegame rng convention — no `Math.random` in the hot path).

## 5. Rendering pipeline (two tiers — the technical core)

### 5.1 Tier 1 — Raster PBR (always-on)

`WebGLRenderer` (r185) + `sRGBColorSpace` + `ACESFilmicToneMapping` exposure 1.1 + `RoomEnvironment` PMREM IBL + 1 directional sun (per-level azimuth/elevation, warm) with 2048 PCFSoft shadow. All geometry from `MeshFactory` (real meshes, no voxels):

- platforms: `RoundedBoxGeometry` (bevel radius 0.08) with per-`MaterialId` `MeshPhysicalMaterial` (sandstone roughness 0.9 / brass metalness 1 roughness 0.25 / wood roughness 0.7)
- keeper: lathe + capsule ceramic figure (clearcoat 1.0, roughness 0.35, emissive lantern core)
- glass shards: `IcosahedronGeometry` + transmission 1.0, roughness 0.05, emissive 0.35
- tide pool: large plane, metalness 0.9 roughness 0.02 + `SSRPass` (screen-space ray traced reflections)
- lighthouse: `LatheGeometry` sandstone/brass; lantern: emissive sphere + point light (≤ 8 dynamic lights total)

Post: SSAO → SSR → bloom → vignette + grain. This tier must hit 60 fps ≤ 30 draw calls, ≤ 40k tris per level.

### 5.2 Tier 2 — WebGPU TSL ray tracing (feature-flagged, `RenderGateway`)

Enables when `STRETCH_FLAGS.rayTracer && navigator.gpu` and no `?rt=0` override. `WebGPURenderer` renders the identical scene graph; the RT pass replaces the material pass:

1. **Bake**: at level load, `BvhBuilder` (engine) walks the scene graph — the `MeshFactory` meshes — and bakes world-space triangles, then `buildBvh()` (core, §3) uploads `triangles` + `nodes` as storage buffers; one material buffer per `MaterialId` (color, metalness, roughness, emissive×intensity); dynamic objects (keeper capsule, shards, moving platforms, lanterns) upload per frame as small instance buffers (sphere/box/quad implicit primitives).
2. **Trace** (fullscreen compute, TSL): per pixel primary ray from the 3/4 camera; stackless BVH traversal (explicit leftChild/rightChild/leafStart/leafCount node layout, §3); GGX BRDF direct sun sample + emissive contribution + 1–2 bounce recursion (mirror/glossy only when material metalness ≥ 0.5 or roughness ≤ 0.35 — water and brass bounce, sandstone does not); 1 sample per frame.
3. **Accumulate/denoise**: ping-pong accumulation buffer (1/N blend) with **temporal reprojection** — per-pixel motion vectors derived from the frame-to-frame camera transform + depth, so accumulation survives the moving follow camera; reset only on teleport/respawn/level load. 3×3 bilateral denoise; output at 0.75× then upscale (bilinear) into the post chain (bloom/vignette/grain run in TSL).
4. **Fallback ladder**: RT unavailable / shader compile failure / sustained > 33 ms → seamless switch to Tier 1 for the same level state. `GameState.rtMode` + HUD `RT` badge always reflect the active tier. **RT is never a gameplay dependency** — identical sim, identical collision, identical level data.

## 6. Verification gates

```bash
npx tsc -b --noEmit        # 0 errors — the gate (repo convention, no test suite)
npm run build               # tsc -b && vite build, must succeed
npm run dev                 # localhost:5186, strictPort
```
Browser playtest (kilo-playwright MCP):
- load → 0 console errors; menu renders; `window.__sim` present (DEV)
- raster path (headless): play all 3 islands start→victory via seeded `__sim` pokes, 0 console errors; every shard reachable by the §4 design law (scripted A* over platform graph asserts it)
- RT path (auto-on when `STRETCH_FLAGS.rayTracer && navigator.gpu`; `?rt=1` forces RT for testing, `?rt=0` forces raster): `__rt` reports `rtMode='rt'`, BVH triangle count matches scene geometry, reprojection accumulation runs while the camera moves, RT badge shows; force `?rt=0` mid-run → `rtMode='raster'` with no state loss
- persistence: clear island → reload → best time present

## 7. Milestones & branches policy

| Build | Acceptance |
|---|---|
| M1 (vertical slice) | Isle 1 fully playable on Tier 1: move/jump/collect/gate/respawn/clear, HUD, procedural meshes + water SSR, SFX |
| M2 (content) | 3 islands complete, menus/pause/victory, persistence, ambient pads, particles, devtools |
| M3 (RT tier) | BVH + TSL compute RT on isle 1 + all 3, accumulation/denoise, fallback ladder, perf guard |
| RC | Full 3-island run on raster 60 fps (mid desktop) + RT 30 fps floor; 0 console errors; verification-report.md updated |

Branches: `master` (integration) + `agent/<name>` worktree branches for parallel coders (repo convention; no develop/release/hotfix ceremony). Frozen-contract discipline per the kimi3 workflow: `types.ts`/`constants.ts`/`levels.ts` signatures are immutable after M1 scaffolding; coder agents own disjoint file lists (e.g. physics+collision, MeshFactory+SceneManager, RasterRenderer+PostFX, RayTracer, Audio+UI) and self-check `tsc` before commit.

## 8. Risk register

| Risk | Mitigation |
|---|---|
| RT tier scope (self-authored TSL ray tracer, no official three example) | Tier 1 ships the full experience; RT is `STRETCH_FLAGS`-gated, feature-flagged, with a fallback ladder; M3 is an isolated milestone that cannot block M1/M2 |
| WebGPU availability (Firefox/Safari gaps, headless) | Tier 1 is the testable baseline; RT is progressive enhancement with a `RT` badge |
| RT perf on integrated GPUs | 0.75× scale + temporal reprojection accumulation + perf guard (0.6× / 30 fps) |
| Temporal reprojection complexity (RT tier) | Medium | reproject with camera-transform motion vectors; reset on teleport; worst case = 1 spp + stronger bilateral denoise |
| SSR artifacts on water (raster tier) | thickness/step tuning frozen in §4; water stays near-planar so SSR is stable |
| Transmission glass cost in WebGL2 | 8 shards max per level, emissive fallback when fps guard trips |
| Parallel-session git discipline (repo-wide) | Never stage/commit other projects' paths; `index.lock` collisions retried, never deleted |
| three 0.185 API drift during dev | Pin exact version; reference `examples/jsm` shipped in the same npm package |

## 9. File tree (new files this scope)

New: `package.json`, `vite.config.ts`, `tsconfig*.json`, `index.html`, `src/main.tsx`, `src/App.tsx`, `src/styles.css`, everything under §2's tree, `GDD.md`, `TDD.md`, `AGENTS.md`, `verification-report.md`, `docs/design/01-art-direction.md`. Nothing modified outside `9_3dplatform/` except root `AGENTS.md` (append project entry, per repo convention). `node_modules/`/`dist/` NOT committed (own `.gitignore`, matches `6_patapong3D`/`8_lifegame`).
