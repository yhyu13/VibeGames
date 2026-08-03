# Alien Invader — Technical Design Document (TDD)

**Status:** Draft v0.1
**Companion:** GDD.md (game design)
**Stack:** TypeScript · Three.js (WebGL) · Vite
**Target:** Desktop web browser (keyboard + mouse), 60fps @ 1080p mid-range GPU

---

## 1. Resolved Technical Decisions

Every GDD open question resolved through design review:

| Branch | Decision | Rationale |
|---|---|---|
| Combat perspective | **3D space scene** | Spectacle + power fantasy; justifies Three.js |
| Rendering style | **PBR-lite** (MeshStandardMaterial, simplified texture workflow) | True photoreal PBR texture pipelines are a solo-dev burden; three.js materials are physically-based by default |
| Combat mode | **Real-time bursts** (30–90s per day) | Hand-rolled physics, best juice, contained per-day scope |
| Engine | **Vanilla Three.js + TS, no framework** | No lock-in, full loop control, no React overhead |
| Game logic architecture | **OOP + Phase State Machine + fixed timestep** | Scales with content, readable, testable |
| UI | **DOM overlay + 2D Canvas minigames** | Menus/cards/meters in DOM; virus minigames in canvas |
| 3D assets | **Procedural-first, few GLTFs** | Zero external tools; consistent art via shared materials |
| Audio | **Procedural Web Audio SFX + royalty-free music** | Zero asset sourcing for SFX; sci-fi synthesizes well |
| Structure | **Standalone Vite project in `3/`** | No coupling; siblings scaffold identically later |
| Testing | **Vitest for pure logic** | Bugs live in balance/state math, not rendering |
| FX | **Bloom + instancing + WebGL, ACES tonemapping** | Juice without a full post stack; WebGPU opt-in later |
| Persistence | **localStorage meta + seeded runs** | Meta progression + daily seeds; no mid-run resume at v1 |

---

## 2. Tech Stack

| Concern | Choice |
|---|---|
| Language | TypeScript (strict mode) |
| Build | Vite 5+ (vanilla-ts template) |
| 3D | Three.js (WebGLRenderer, stable branch) |
| Post FX | EffectComposer + UnrealBloomPass (three/examples) |
| Physics | None — hand-rolled sphere/OBB collision + projectile integration |
| UI | DOM (menus/cards/meters) + one 2D Canvas (virus minigames) |
| Audio | Web Audio API (procedural synth module) |
| State | Plain TS classes + EventBus |
| RNG | mulberry32 (seeded, deterministic) |
| Storage | localStorage (JSON schema, versioned) |
| Tests | Vitest (node environment, no DOM for logic) |
| Lint | ESLint + Prettier (standard config) |

---

## 3. Project Structure

```
3/
├── index.html
├── package.json
├── vite.config.ts
├── tsconfig.json
├── public/
│   └── assets/
│       ├── gltf/          # hero assets: battle moon, capital shield
│       ├── audio/         # royalty-free music loops
│       └── textures/      # optional albedo maps (AI/procedural generated)
└── src/
    ├── main.ts            # bootstrap: renderer, canvas, phase machine
    ├── core/
    │   ├── rng.ts         # mulberry32, seed utilities
    │   ├── events.ts      # EventBus (typed)
    │   ├── storage.ts     # localStorage schema + versioning
    │   ├── fixedTimestep.ts  # 60Hz accumulator loop
    │   └── input.ts       # keyboard/mouse state, raycasting helper
    ├── game/
    │   ├── phaseMachine.ts    # Phase enum + transitions
    │   ├── run.ts             # RunState: days, conditions, factions
    │   ├── earth.ts           # ConditionProfile generation, defense roster
    │   ├── ship.ts            # Hull/WeaponBay/Broadcast/Cortex systems
    │   ├── weapons/           # Weapon base class + arsenal data
    │   ├── mutations/         # Mutation/Bane data + application logic
    │   ├── propaganda/        # segments, conviction/suspicion curves
    │   ├── virus/             # nodes, puzzle generator, compromise effects
    │   └── meta.ts            # Alienium, unlock registry
    ├── combat/
    │   ├── combatScene.ts     # entity spawn/despawn, day battle setup
    │   ├── projectiles.ts     # motion + collision
    │   ├── entities/          # Turret, Fighter, Missile, Obstacle, Station
    │   └── camera.ts          # chase cam + shake
    ├── render/
    │   ├── renderer.ts        # WebGL config, tonemapping, resize
    │   ├── fx.ts              # bloom composer, particles, instancing
    │   ├── atmosphere.ts      # Earth shader (fresnel glow)
    │   └── procedural/        # primitive-based ship/turret builders
    ├── ui/
    │   ├── dom/               # overlay screens (menus, cards, HUD)
    │   └── minigames/         # canvas virus minigames
    ├── audio/
    │   └── synth.ts           # Web Audio procedural SFX
    └── data/                  # balance data as typed constants
        ├── weapons.ts
        ├── conditions.ts
        ├── mutations.ts
        └── messages.ts        # propaganda card pool
```

**Rule:** `game/` (logic) must never import from `render/` or `ui/`. Logic communicates through the EventBus; render/UI subscribe. This keeps Vitest tests free of Three.js.

---

## 4. Runtime Architecture

### 4.1 Game Loop (fixed timestep + rAF)

```
requestAnimationFrame
  └─ accumulate dt (clamp 0.1s)
     └─ while (acc >= 1/60):
          fixedUpdate(1/60)   // deterministic sim: combat, meters, AI
     └─ render(dt)            // display-rate interpolation of visuals only
```

- Simulation runs at exactly 60Hz regardless of display refresh (120Hz monitors).
- Visual entities lerp between previous/current sim positions for smoothness.
- All randomness during a run flows through the seeded RNG (never `Math.random`), so replays of a seed reproduce the exact run.

### 4.2 Phase State Machine

```
MENU ──▶ SCAN ──▶ COMBAT ──▶ PUZZLE ──▶ BUILD ──▶ RESOLVE ──▶ (COMBAT|PUZZLE|BUILD)
                       ▲────────┴──────────────────────┘
                              │
                              ▼
                         RUN_OVER (win / defeat) ──▶ META
```

- Each phase is a class implementing `onEnter(ctx) / fixedUpdate(dt) / onExit()`.
- Phase transitions are the only place run state mutates globally; transitions emit typed events (`phase:entered`, `phase:exited`) for UI/audio.
- Daily loop: `COMBAT` (major action) → `PUZZLE` (minor action) → `BUILD` (upgrades) → `RESOLVE` (Earth counterattack + bane effects) → next day.

### 4.3 Entity Model (OOP composition)

```
GameEntity
 ├─ Transform (position, quaternion, scale)
 ├─ RenderProxy (Mesh | InstancedMesh slot | none)   // render/ side
 ├─ Collider (Sphere | OBB | none)                   // combat/ side
 └─ Behavior (ship, turret, fighter, missile, obstacle, station)
```

- One `CombatScene` owns all combat entities per day battle; cleared on phase exit.
- Swarms (fighters, debris) use `InstancedMesh` — one draw call per type, per-entity matrices updated in the fixed update.

---

## 5. Core Systems

### 5.1 Seeded RNG (core/rng.ts)

- `mulberry32(seed)` → deterministic sequence.
- Seed derivation: run seed = `dailySeed(day)` for daily invasions (e.g., `YYYYMMDD` hashed) or `Math.random()` for free runs; seed stored in run state and shown on the results screen for sharing.
- Convenience API: `rng.int(min,max)`, `rng.pick(arr)`, `rng.shuffle(arr)`, `rng.weighted(entries)` — all pure functions of the sequence, unit-tested for stability across versions (never change mulberry32 implementation after release).

### 5.2 Condition Profile Generation (game/earth.ts)

- Table-driven from `data/conditions.ts`: each condition = `{ id, modifiers: Record<DamageType, number>, defenseAdjust: {...}, propagandaMult, virusMult, tags }`.
- Generation: pick 1 primary + 0–2 secondary conditions weighted by difficulty budget (easier runs exist and pay less Alienium — mirrors GDD's "Resource-Poor" style trade-offs).
- Modifier application is a pure function `applyCondition(baseStats, conditions) → finalStats`, heavily unit-tested.

### 5.3 Weapons (game/weapons/)

- `Weapon` base class: `{ id, type: DamageType, damage, fireRate, projectileSpeed, ammo, special }`.
- All arsenal entries live in `data/weapons.ts` as typed constants — content additions are data-only, no code changes.
- Synthesis combines two weapons into a hybrid at `BUILD` phase (pure function, tested).
- Damage resolution is a pure function: `resolveDamage(weapon, targetDefenses, conditionModifiers, mutationFlags) → result`.

### 5.4 Mutations & Banes (game/mutations/)

- Each mutation entry: `{ id, apply(playerSystems) → diff, bane: { condition-like modifier + scheduling } }`.
- `Bane` = a condition fragment injected into Earth's profile for the *remaining* days (so early mutations hurt longer — natural risk/reward pacing).
- Both sides pure-function application → exhaustive Vitest matrix tests (`every mutation × every damage type`).

### 5.5 Combat Simulation (combat/)

- **Projectiles:** kinematic integration, sphere vs sphere and sphere vs OBB swept checks each fixed step; no physics engine.
- **Missiles (nukes):** slow homing toward ship; interception via hitscan weapons or Point-Defense subsystem; dodgeable by maneuver — hit only if intercept fails and within blast radius.
- **Ship control:** WASD thrust in local space + mouse-look + LMB fire; camera is a smoothed chase cam with recoil/shake feedback.
- **Day battle goal:** destroy assigned target(s) within the day's time budget (or fail forward with damage taken — never soft-lock).
- Difficulty ramp: turrets (d1) → orbital obstacles (d2) → fighters (d3) → nukes (d4) → stations (d5+) — exactly per GDD §7.

### 5.6 Propaganda (game/propaganda/)

- Segments: `Civilian, Military, Scientist, Government` — each `{ conviction, suspicion, converts }`.
- Message cards from `data/messages.ts`; applying one is a pure function `applyMessage(segments, card, conditionMults) → segments'` (tested: conviction up, suspicion up, no negative conviction overflow).
- Jammed state (suspicion ≥ threshold) is a 2-day debuff — `RESOLVE` phase decrements it.

### 5.7 Virus System (game/virus/)

- Nodes: `Power Grid, Defense Grid, Missile Command, Media Net, Orbital Control`.
- Puzzle generator (`virus/puzzleGenerator.ts`) produces difficulty-scaled puzzle instances seeded by run seed + node — so a given seed always shows the same puzzle at that node (shareable, testable).
- Compromise = puzzle solved; effect applied via EventBus (`node:compromised`).
- Win check `systemShutdown()` = 4/5 nodes → pure function, tested.

### 5.8 Meta Progression (game/meta.ts + core/storage.ts)

localStorage schema (versioned, migration on read):

```ts
interface SaveFile {
  version: 1;
  alienium: number;
  unlocks: { weapons: string[]; mutations: string[]; chassis: string[]; factions: string[] };
  stats: { runs: number; wins: number; bloodlessWins: number };
  settings: { audio: { sfx: number; music: number }; gfx: { bloom: boolean; quality: 'low'|'med'|'high' } };
  lastRunSeed?: number;
}
```

- Written on run end + every `BUILD` phase (crash-safe enough for v1).
- Unlocks are *options*, never stat inflation (GDD §9): unlock registry simply adds entries to pick pools.

---

## 6. Rendering Pipeline

### 6.1 Renderer Config

- `WebGLRenderer({ antialias: true, powerPreference: 'high-performance' })`, `ACESFilmicToneMapping`, `SRGBColorSpace`.
- Lights: directional (key) + ambient/hemisphere (fill) + a few point lights for explosions (pooled).
- Environment: procedural gradient environment map (PMREM) for PBR-lite reflections — no external HDR needed.
- EffectComposer: render → UnrealBloomPass (threshold ~0.9, strength configurable) → output.

### 6.2 PBR-lite Material Workflow

- All materials: `MeshStandardMaterial` with `color`, optional procedural albedo (CanvasTexture-generated), flat `roughness/metalness` values per asset family.
- No normal/roughness/metalness texture sets at v1 — properties tuned per material instance.
- Earth: icosphere + custom atmosphere shader (fresnel glow, two-sided shell) + procedural continent/bump via canvas texture; damage states swap in burned materials.

### 6.3 Instancing & Particles

- `InstancedMesh` for: fighter swarms, asteroid/debris rings, missile volleys, turret arrays.
- Particles (`Points`) for: engine trails, explosions, beam impacts — pooled, budgeted (≤ 2k points).
- Draw-call budget: ≤ 60 draw calls in combat (capped via instancing + shared materials).

### 6.4 Performance Budget

| Metric | Budget |
|---|---|
| Framerate | 60fps target, 30fps floor (auto quality drop: disable bloom, halve particles) |
| Draw calls | ≤ 60 combat, ≤ 20 menu/scan |
| Particles | ≤ 2,000 live points |
| Entities in combat | ≤ 200 simulated (fighters/missiles/obstacles) |
| Texture memory | ≤ 64MB (no HDR maps; small procedural textures) |
| Bundle (initial) | ≤ 1MB gzip (three.js + app); GLTFs lazy-loaded |

Quality settings (`low/med/high`) persisted in settings; auto-degrade on sustained frame drops (EMA of frame times).

---

## 7. Audio (audio/synth.ts)

- SFX fully synthesized: laser (oscillator sweep), explosion (noise burst + lowpass decay), alarm (square arpeggio), hack blips, UI clicks. One `Synth` module with a small mixing API (`play('laser', {pitch, gain})`).
- Music: 1–2 royalty-free loops loaded as `<audio>`; volume ducking during combat.
- All audio events fired from the EventBus (`audio:play`), never called directly from logic.

---

## 8. Input

- Keyboard: WASD thrust, Shift boost (metered), Space fire, 1/2/3 weapon swap, Tab pause.
- Mouse: camera look (pointer-locked during combat), LMB fire, ESC unlock.
- UI phases: normal cursor, DOM controls; raycast helper only for menu-to-3D selections (SCAN phase target picking).
- Pause (`Tab`) stops the accumulator; resume is safe because sim state is never mutated during render.

---

## 9. Testing Plan (Vitest)

Pure-logic suites (no DOM, no Three.js imports — enforced by tsconfig path mapping):

| Suite | Covers |
|---|---|
| `rng.test.ts` | mulberry32 determinism, distribution sanity, weighted picks |
| `conditions.test.ts` | modifier application, budget-weighted generation, bounds |
| `weapons.test.ts` | damage resolution vs. every condition × armor type |
| `mutations.test.ts` | every mutation × every damage type (bane correctness matrix) |
| `propaganda.test.ts` | conviction/suspicion curves, jammed states, convert thresholds |
| `virus.test.ts` | puzzle generator determinism (same seed → same puzzle), win check |
| `run.test.ts` | full-run simulation on a fixed seed: day flow, win/lose conditions, no NaN states |
| `storage.test.ts` | save/load roundtrip, version migration, corrupt-file fallback |

CI hook: `npm run test` on commit (or pre-push), `npm run lint` likewise.

---

## 10. Build & Deploy

- `npm run dev` — Vite dev server (HMR).
- `npm run build` — `vite build` → static `dist/`, deployable to any static host (GitHub Pages / Netlify / Vercel).
- Asset loading: GLTF + music lazy-loaded on first use; `index.html` keeps initial parse small.
- No backend, no accounts — the game is fully client-side.

---

## 11. Milestones (aligned with GDD §10)

| Milestone | Scope | Exit criteria |
|---|---|---|
| **M0 — Scaffold** | Vite+TS+Three skeleton, renderer, fixed timestep, phase machine stub, EventBus | Empty scene renders at 60fps; phase transitions log |
| **M1 — Combat prototype** | Ship controls, 3 weapons, turret/fighter targets, projectiles + collision, bloom | Playable day-1 battle vs turrets; Vitest suites green |
| **M2 — Run loop** | Condition Profile gen (5 conditions), day loop, Earth counterattack schedule, defeat/annihilation win | Full 7-day run completable |
| **M3 — Propaganda layer** | Segments, message cards, conviction/suspicion, converts, Total Conversion win | Propaganda puzzle playable in DOM overlay |
| **M4 — Virus layer** | Node puzzles (canvas minigame), compromise effects, System Shutdown win | Virus minigame playable; win condition reachable |
| **M5 — Mutations & meta** | Mutation/bane pool, Alienium, unlocks, storage schema, seeded runs | Two full runs with different mutations; save/load persists |
| **M6 — Polish** | Audio synth pass, particles, camera shake, quality settings, daily seed, results screen | 60fps sustained; bloodless victory achievable; lint+tests clean |
| **Post-1.0** | WebGPU opt-in, mid-run resume, moddable data files, leaderboards | — |

---

## 12. Key Risks & Mitigations

| Risk | Mitigation |
|---|---|
| Combat feels flat without artist assets | Procedural builders + bloom/particles/audio carry juice; art pass deferred |
| Balance matrix explodes combinatorially | All math pure + data-driven; Vitest matrix tests; seeded runs reproduce bugs |
| Fixed timestep + 120Hz monitors desync | Accumulator pattern; render interpolation; tested on high-refresh display |
| Three.js version churn (WebGPU migration) | Renderer isolated behind `render/` facade; WebGL stable until opt-in flag |
| localStorage schema drift | Versioned schema + migration function + corrupt-file fallback |
| Scope creep on puzzle depth | Minigames are v1-simple (pattern/timing), depth added post-1.0 |
