# ALIEN INVADER — Technical Design Document

**Status:** Draft v0.1
**Companion doc:** `2/GDD.md` (or `3/GDD.md` — merge into one before implementing)
**Stack:** TypeScript + Three.js (WebGL2) + Vite + Zustand + Vitest + Playwright

---

## 1. Technical Vision

A browser-based, real-time 3D shoot-'em-up roguelike rendered with Three.js **WebGL2** and **PBR** materials, with the GDD's puzzle layers (propaganda, computer virus) presented as **2D overlay UI** over the 3D canvas. The simulation runs on a **fixed timestep** with seeded randomness so every invasion is deterministic and reproducible. All art is **procedurally generated** (code + shaders) — no external asset pipeline.

**Platform target (v0.1):** static web host, desktop browser (keyboard + mouse).

---

## 2. Tech Stack

| Concern | Choice | Rationale |
|---|---|---|
| Language | TypeScript (strict) | Safety for a large game-state surface |
| Renderer | Three.js r150+ **WebGL2** | Mature, universal PBR support; WebGPU deferred |
| Build tool | Vite 5+ | Fast HMR for shader iteration, static deploy |
| State | **Zustand** | Shared run state between sim and 2D overlay, selector-based, TS-friendly |
| Entity model | Three.js **scene graph + classes** | Right-sized for ~hundreds of entities; no ECS ceremony |
| Simulation loop | **Fixed timestep** (60 Hz) + interpolation | Deterministic seeded runs, stable physics |
| Randomness | **mulberry32** (seeded PRNG) | Deterministic Condition Profiles / mutations |
| Collision | **Hand-rolled primitives** (sphere/box/ray) | Deterministic, zero deps, shmup-adequate |
| Audio | **Web Audio API synthesized** | No assets; procedural sfx/music |
| Tests | **Vitest** (unit) + **Playwright** (E2E smoke) | Covers sim logic + renderer boot |
| Persistence | localStorage | Meta currency, unlocks, settings |

**Deferred:** WebGPU renderer, ECS, physics engine (rapier), glTF asset pipeline, backend.

---

## 3. Architecture Overview

```
┌─────────────────────────── Browser ───────────────────────────┐
│                                                               │
│  ┌──────────────────────┐        ┌──────────────────────────┐ │
│  │    Three.js Canvas   │        │   2D Overlay (HTML/CSS)  │ │
│  │  PBR scene, camera,  │        │  Propaganda UI, Virus    │ │
│  │  shaders, FX         │        │  mini-games, HUD, menus  │ │
│  └──────────┬───────────┘        └────────────┬─────────────┘ │
│             │ renders                         │ reads/writes  │
│  ┌──────────▼─────────────────────────────────▼─────────────┐ │
│  │              Zustand Run Store (single source of truth)   │ │
│  └──────────────────────────────┬───────────────────────────┘ │
│                                 │ subscribes                   │
│  ┌──────────────────────────────▼───────────────────────────┐ │
│  │              Fixed-Step Simulation (60 Hz)                │ │
│  │  Ship / Weapons / Defenses / Countermeasures / Roguelike │ │
│  └──────────────────────────────┬───────────────────────────┘ │
│                                 │ pure functions, seeded RNG   │
│  ┌──────────────────────────────▼───────────────────────────┐ │
│  │         Game Logic Modules (framework-free, testable)     │ │
│  │  weapons · conditions · mutations · propaganda · virus · │ │
│  │  countermeasures · meta                                   │ │
│  └───────────────────────────────────────────────────────────┘ │
└───────────────────────────────────────────────────────────────┘
```

**Rule:** all logic modules are pure TypeScript with no Three.js imports. They operate on plain data and are unit-testable headlessly. Three.js objects are *views* over simulation entities.

---

## 4. Directory Layout

```
vibegames/
└── 2/
    ├── GDD.md
    └── TDD.md
    └── game/                     # (v0.1 implementation scaffold)
        ├── index.html
        ├── package.json
        ├── tsconfig.json
        ├── vite.config.ts
        ├── vitest.config.ts
        ├── playwright.config.ts
        └── src/
            ├── main.ts                    # bootstrap, game loop wiring
            ├── core/
            │   ├── rng.ts                 # mulberry32 seeded PRNG
            │   ├── fixedLoop.ts           # fixed-step accumulator + interpolation
            │   ├── eventBus.ts            # decoupled sim→UI events
            │   └── types.ts               # shared domain types
            ├── state/
            │   ├── store.ts               # Zustand run store
            │   ├── selectors.ts           # derived state for UI/render
            │   └── persistence.ts         # localStorage meta layer
            ├── logic/
            │   ├── weapons.ts             # arsenal, damage, synthesis
            │   ├── conditions.ts          # Earth Condition Profile generation
            │   ├── mutations.ts           # mutation/bane offers
            │   ├── propaganda.ts          # conviction/suspicion model
            │   ├── virus.ts               # node compromise logic
            │   ├── countermeasures.ts     # Earth escalation + AI
            │   ├── combat.ts              # fixed-step combat resolution
            │   └── meta.ts                # Alienium, unlocks
            ├── render/
            │   ├── renderer.ts            # WebGL2 renderer setup
            │   ├── scene.ts               # scene graph construction
            │   ├── planet.ts              # procedural planet + PBR
            │   ├── atmosphere.ts          # shader-based atmosphere
            │   ├── ship.ts                # ship view + flight model
            │   ├── weaponsView.ts         # projectile/laser FX views
            │   ├── defenseViews.ts        # turret/station/obstacle views
            │   ├── camera.ts              # follow cam, transitions
            │   ├── effects.ts             # particles, trails, explosions
            │   └── interpolator.ts        # render interpolation from sim state
            ├── audio/
            │   └── synth.ts               # Web Audio synthesized sfx/music
            ├── ui/
            │   ├── overlay.ts             # root overlay mount
            │   ├── hud.ts
            │   ├── propagandaPanel.ts
            │   ├── virusPanel.ts
            │   ├── mutationModal.ts
            │   └── menus.ts               # run start, condition reveal, meta
            └── render/main.ts etc.
```

---

## 5. Core Simulation Design

### 5.1 Fixed Timestep Loop

- `fixedLoop.ts` runs an accumulator at **60 Hz** (`dt = 1/60`).
- All game state mutation happens only inside the fixed step (deterministic).
- Rendering runs at display refresh rate and **interpolates** between previous/current sim state (`interpolator.ts`) to avoid judder.
- The loop is seeded: `new Run(seed)` → identical playthrough given identical inputs.

### 5.2 Seeded RNG — `mulberry32`

- Single PRNG for the whole run: Condition Profile, mutation offers, countermeasure scheduling, spawn patterns.
- The seed is displayed/shared (daily invasions, replays).
- `rng.ts` exposes `next()`, `range()`, `pick()`, `shuffle()` — all pure.

### 5.3 World Model — Sphere-Locked Orbit

- Planet is a unit-radius sphere (scaled up); ship orbits at **fixed radius** `R_orbit`.
- Ship position = `direction * R_orbit`; movement is **2.5D**: yaw (orbit) + pitch (latitude), constrained to a playable band (e.g. ±45°).
- Orientation: ship always faces tangent-forward, "up" = away from planet center.
- Camera orbits the planet from behind the ship; depth-aiming confusion is avoided because all combat entities live on/near the same orbital shell.
- Targets (turrets, stations) are placed on the sphere surface or in orbit lanes (fixed radius shell / obstacle rings).

### 5.4 Collision (hand-rolled)

| Collider | Use |
|---|---|
| Sphere–Sphere | projectiles vs. defenses, ship vs. hazards |
| Ray–Sphere / Ray–Box | point-defense shooting down kinetic rods |
| Sphere–Shell distance check | orbital obstacle coverage |

All in sim space (unit-consistent), resolved inside the fixed step.

---

## 6. Roguelike Generation

### 6.1 Condition Profile

- `conditions.ts` rolls N modifiers from a weighted pool using the run seed.
- The profile is written to the store **before** loadout selection (GDD: counter-build).
- Profile data is plain serializable data — render layer reads it only for visuals (sky color, storm particles, etc.).

### 6.2 Mutations & Banes

- Every 2–3 sim days, `mutations.ts` offers 3 mutation/bane pairs (seeded).
- Accepting mutates the store: buff system + Earth modifier record.
- Banes are first-class store entries with day-activated triggers (e.g. "Plague Defenses activate day 4").

---

## 7. Combat Design (Real-Time)

### 7.1 Input → Sim

- Keyboard/mouse input is captured in the browser, converted to **intents** (move yaw/pitch, fire, weapon switch, activate).
- Intents are consumed by the fixed step only. No input mutates state outside the step.

### 7.2 Weapons

- Each weapon is a data-driven spec: damage, type (kinetic/energy/radiation/biological), fire rate, projectile speed, cooldown, special behavior (pierce, spread, DoT).
- `combat.ts` steps projectiles, applies type multipliers from the Condition Profile and Banes.
- Point-defense/EMP interactions are resolved as deterministic rule checks.

### 7.3 Countermeasures (Earth AI)

- Scheduled by day + seed in `countermeasures.ts`:
  - Day 1+ turrets, Day 2+ obstacles/AA, Day 3+ fighters, Day 4+ nukes, Day 5+ stations, Day 6+ Global Rally.
- Fighters are simple state machines (approach → intercept → retreat) evaluated in the fixed step; no external AI lib.

---

## 8. Puzzle Layers (2D Overlay)

### 8.1 State Flow

- The overlay UI reads the Zustand store; interactions dispatch actions (e.g. `broadcastMessage`, `beginHack(node)`).
- Virus mini-games are **pure, testable puzzle solvers** in `logic/virus.ts` (pattern matching / routing / timing chains) exposed to UI via the store; the UI renders the puzzle, the logic validates.

### 8.2 Propaganda

- `logic/propaganda.ts`: conviction/suspicion math, segment state, message card effects, order synergies (scientist-first multiplier).
- UI: `propagandaPanel.ts` renders segment meters and card hands.

### 8.3 Virus

- `logic/virus.ts`: node states, puzzle generators (seeded by node difficulty), validation, compromise effects.
- UI: `virusPanel.ts` renders mini-game canvases; on success dispatches node compromise.

---

## 9. Rendering (WebGL2 + PBR)

### 9.1 Renderer Setup

- `WebGLRenderer({ antialias: true, powerPreference: "high-performance" })`, `outputColorSpace = SRGBColorSpace`, `toneMapping = ACESFilmicToneMapping`, `toneMappingExposure` tuned for space scene.
- Scene uses a single directional (sun) light + ambient; PBR materials respond to the GDD's energy/radiation weapons via emissive pulses.

### 9.2 Procedural Planet (PBR)

- `planet.ts` builds a `SphereGeometry` with a custom `MeshStandardMaterial`: procedural noise-based roughness/metalness/color maps (canvas textures generated at load) — no external textures.
- Ocean/land via noise; city night-lights as emissive texels on the dark side (visual payoff for propaganda/annihilation).
- `atmosphere.ts`: custom `ShaderMaterial` fresnel rim glow (blue), plus optional volumetric-ish corona via sprite billboards.

### 9.3 Ship & Entities

- Ship: low-poly procedural mesh group; engine trails via `effects.ts` particle system.
- Defenses/obstacles: generated primitives with emissive status colors (alive/damaged/disabled).
- Projectiles: `Line`/`Mesh` with additive blending; laser colors map to weapon damage type.

### 9.4 Effects

- Particle pool (explosions, debris), screen-space hit flashes, shield ripple shader on stations.

---

## 10. Audio (Web Audio Synthesized)

- `synth.ts` builds a small synth: oscillator-per-sfx, noise buffers, ADSR envelopes.
- API: `playSfx('laser' | 'explosion' | 'nukeWarning' | ...)`, ambient music loop via scheduler.
- All audio is triggered by store events (`eventBus`); deterministic sim stays untouched.

---

## 11. UI/Overlay

- Single overlay root (`#app` + canvas mount) — Zustand selectors drive React-free DOM updates (or a tiny view layer; no framework mandated, but **must** stay decoupled from sim).
- Screens: main menu → condition reveal → loadout → run (HUD + panels) → mutation modal → victory/defeat → meta.
- The overlay never mutates sim state directly; it dispatches actions.

---

## 12. Testing Strategy

### 12.1 Unit Tests (Vitest)

Must cover, headlessly (no Three.js imports in these modules):

- `rng.ts` — determinism (same seed → same sequence), distribution sanity.
- `conditions.ts` — profile generation respects seed + weight rules.
- `mutations.ts` — offers unique, banes present.
- `propaganda.ts` — conviction/suspicion thresholds, order synergies.
- `virus.ts` — puzzle generators solvable, validators reject wrong solutions, compromise effects.
- `combat.ts` — damage-type multipliers, point-defense interception, nuke sabotage.
- `countermeasures.ts` — escalation schedule matches GDD day table.
- `meta.ts` — unlock rules, bloodless bonus math.
- `fixedLoop.ts` — accumulator correctness, no drift, determinism across runs.

### 12.2 E2E Smoke (Playwright)

- Boot `vite dev`; assert canvas mounts and WebGL context is created.
- Start a seeded run; assert HUD renders; fire a weapon; assert store hull changes.
- Open virus panel; solve one puzzle via stub logic; assert node compromised.
- Full run to a win condition (seeded easy profile) — smoke only, no flaky timing asserts.

### 12.3 Determinism check (test)

- Run the same seed twice through the whole sim → identical final state.

---

## 13. Milestones

| Milestone | Scope | Exit criteria |
|---|---|---|
| **M0 — Scaffold** | Vite+TS+Three.js+Zustand, fixed loop, seeded RNG | `npm run dev` boots; determinism unit test green |
| **M1 — Combat core** | Planet + ship + 3 weapons + turrets, real-time input | Playwright fires weapon; damage applies; tests green |
| **M2 — Roguelike** | Condition Profile gen, mutation modal, Earth schedule | Seeded run differs across seeds; mutation+bane applied |
| **M3 — Puzzle layers** | Propaganda panel, virus mini-games, overlay UI | Unit tests for both solvers; E2E compromise flow |
| **M4 — Meta + polish** | Alienium, unlocks, audio synth, effects, PBR pass | Bloodless victory grants 2x; full run E2E passes |
| **M5 — Hardening** | Seeded replay, perf pass (draw calls, particles), packaging | Static build deploys; 60 fps on reference hardware |

---

## 14. Risks & Mitigations

| Risk | Mitigation |
|---|---|
| WebGL2-only devices excluded | Feature-detect; graceful message + WebGL1 fallback later |
| Fixed-step determinism broken by float drift | All sim math in consistent units (float32 tolerance in tests); no Date/random in sim |
| Shader/particle perf in long runs | Object pooling, capped particle counts, LOD on distant stations |
| Puzzle layer feels disconnected from 3D | Shared Zustand store drives both; in-scene visual states reflect node compromises |
| Overlay framework creep | View layer stays thin; all logic in `logic/` modules |

---

## 15. Open Questions (carried from GDD §11)

1. Real-time combat tuning: fixed 60 Hz assumed — confirm enemy density for mid-range hardware.
2. Full 3D + sphere-locked orbit: validate readability of depth cues (shadows, size attenuation) in prototype M1.
3. Tone (comedic vs. grim) affects shader palette and UI copy — decide before M4 polish pass.

---

## 16. Key Terms

- **Sim** — deterministic fixed-step game logic (no rendering concerns)
- **View** — Three.js objects that present sim entities
- **Store** — Zustand run state; single source of truth
- **Seed** — run identifier; determines Condition Profile, mutations, and spawns
- **Intent** — player input normalized for the fixed step
