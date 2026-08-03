# Alien Invader — Technical Design Document

| Field | Value |
|---|---|
| Status | v0.1 — implementation blueprint, companion to `GDD.md` v0.1 |
| Stack | TypeScript 5 (strict) · Three.js r170+ · Vite · Vitest · Playwright · WebAudio · IndexedDB |
| Rendering | Orthographic 2.5D, PBR via `MeshPhysicalMaterial`, `EffectComposer` post-FX |
| Time model | Fixed 60 Hz logic + interpolated render |
| Reactivity | Signals (fine-grained) |
| Physics | Custom kinematic math only (no physics library) |
| Assets | 100% procedural geometry + custom GLSL shaders; no external models |
| Persistence | IndexedDB via a thin typed wrapper |
| Target | Modern Chromium/Firefox/Edge on desktop, mouse + keyboard + gamepad, 60 FPS |

---

## 1. Architectural Identity

> **Alien Invader is an orthographic 2.5D Three.js game where plain TypeScript state, advanced by a fixed 60 Hz simulation loop, projects itself onto a thin render layer of PBR quads via signals. Every asset is procedural. Every visual decision is in service of the three pillars: adaptive Earth, power-with-price, force-or-cunning.**

Three single-line rules drive every module:

1. **State is pure, render is a function of state.** No `THREE.Object3D` may mutate game logic. No game logic may reach into a Three.js scene.
2. **Time is fixed at 60 Hz, render is interpolated.** Every visible transform interpolates between the previous and current logical tick.
3. **PBR + post-FX is the visual language, signals are the seams.** Material parameters and Instability mutations are exposed as signals that the render layer reads.

---

## 2. Stack and Dependencies

### 2.1 Runtime

| Concern | Choice | Rationale |
|---|---|---|
| 3D engine | `three` r170+ | Latest stable, WebGPU-ready, stable `EffectComposer` |
| Language | TypeScript 5 strict (`strict`, `noUncheckedIndexedAccess`, `exactOptionalPropertyTypes`) | Catches roguelite state-graph bugs at compile time |
| Reactivity | `@preact/signals-core` (or hand-rolled equivalent) | Fine-grained, no virtual DOM, plays well with hot reload |
| Build | Vite 5 | Fast HMR, native ESM, mature GLSL loader plugins |
| Test | Vitest (unit) + Playwright (browser smoke) | 1:1 dev/test ergonomics; browser coverage for boot path |
| Lint/format | ESLint + `@typescript-eslint` + Prettier | Standard |
| Shader loader | `vite-plugin-glsl` (or `?raw` GLSL imports) | HMR for shaders, `#include` support |
| Persistence | Native IndexedDB via `idb` (Jake Archibald's thin wrapper) | Typed, minimal, async |
| Audio | Native WebAudio + custom mixer | No dependency, full control for Instability distortion |
| RNG | Hand-rolled Mulberry32 + helpers | Deterministic seeded runs |

### 2.2 Why no physics library

The GDD's combat is almost entirely kinematic (projectiles on rails, lane movement, missile intercepts, gravity pulls). A WASM physics engine would add bundle weight and a determinism tax for capabilities we do not need.

### 2.3 Why no glTF, no sprite atlas

The alien visual language is defined by shader-driven displacement, iridescence, and Instability mutations. Procedural geometry + shaders is the cheapest path that gives full artistic control and matches the GDD's Instability visual system.

---

## 3. Project Layout

```
1/
  GDD.md
  TDD.md
  package.json
  tsconfig.json
  vite.config.ts
  playwright.config.ts
  index.html
  public/
    audio/                       # raw .ogg/.wav assets loaded by WebAudio
    hri/                         # HDRI envmaps (RoomEnvironment baked)
  src/
    main.ts
    app/
      App.ts                     # bootstrap, mount canvas
      Game.ts                    # top-level orchestration
      Loop.ts                    # requestAnimationFrame + fixed-60 accumulator
      Env.ts                     # build-time/runtime constants
    state/                       # PURE STATE LAYER (no Three.js imports)
      signals.ts                 # signal helpers, computed, batch
      rng.ts                     # Mulberry32, weighted pick, shuffle
      types.ts                   # all state interfaces
      id.ts                      # typed id brands
      earth/
        EarthState.ts
        regions.ts               # 10–14 hand-crafted region definitions
        conditions.ts            # planet condition generators
        faction.ts
        counter.ts               # adaptive counter engine
      ship/
        ShipState.ts
        weapons.ts               # weapon families, branches, overcharges
        modules.ts
        adaptations.ts
        burdens.ts
      combat/
        Projectile.ts
        Defense.ts
        Missile.ts
        Targeting.ts
        Damage.ts                # formulas, resistances, weaknesses
      puzzle/
        PropagandaNet.ts
        VirusInfiltration.ts
        SignalDecryption.ts
      progression/
        VictoryPaths.ts
        Escalation.ts
        Events.ts
      save/
        SaveSchema.ts
        Store.ts                 # IndexedDB wrapper
    render/                      # THIN RENDER LAYER (no game logic)
      Scene.ts                   # Three.js scene + ortho rig
      OrthographicRig.ts         # camera, viewport scaling, layers
      Lighting.ts                # env map, key/fill/rim, tone mapping
      PostFX.ts                  # EffectComposer chain
      InstabilityFX.ts           # post-FX uniforms fed by Instability signal
      Earth/
        EarthView.ts             # stylized Earth, persistent damage
        RegionView.ts
      Ship/
        ShipView.ts
        WeaponView.ts
        ProjectilePool.ts        # reusable mesh pool
      Combat/
        DefenseView.ts
        MissileView.ts
        TargetMarker.ts          # weakness/resistance HUD
      Puzzle/
        PropagandaView.ts
        VirusView.ts
        SignalView.ts
      UI/
        Hud.ts                   # in-canvas HUD, signal-driven
        StrategicMap.ts
        BurdenOverlay.ts
        EndScreen.ts
    audio/
      AudioGraph.ts              # AudioContext + master bus
      Mixer.ts                   # gain/filter/delay helper nodes
      Music.ts                   # layered stems by escalation
      Sfx.ts                     # weapon + defense + ui SFX
      Voices.ts                  # human radio chatter
    input/
      Input.ts                   # keyboard + mouse + gamepad
      Bindings.ts                # rebinding, save to settings
    data/
      weapons.json
      regions.json
      adaptations.json
      burdens.json
      events.json
    shaders/
      common.glsl                # shared utils
      noise.glsl                 # simplex + value noise
      iridescence.glsl
      energy.glsl                # alien energy shader chunks
      earthAtmosphere.glsl
      instability.glsl
      postfx/
        halftone.frag
        chromatic.frag
        grain.frag
        bloom-selective.frag
    tests/
      unit/
        damage.test.ts
        rng.test.ts
        instability.test.ts
        counter.test.ts
        victoryPaths.test.ts
        puzzle.test.ts
        escalation.test.ts
      e2e/
        boot.spec.ts
        first-shot.spec.ts
        scene-mounts.spec.ts
        save-load.spec.ts
```

---

## 4. Rendering Pipeline

### 4.1 Orthographic Rig

- `OrthographicCamera` with viewport-aware frustum.
- 1 world unit = 1 ship length; orthographic zoom rescales for screen size.
- Coordinate convention: **+X right, +Y up, +Z toward camera**. All gameplay quads sit at z=0; orbital depth comes from layered quads at small z-offsets and from material parallax in shaders, not from camera depth.
- Layer masks (Three.js Layers) for selective bloom: `LAYER_ALIEN_ENERGY`, `LAYER_GROUND_FX`, `LAYER_UI`.

### 4.2 Lighting

- `RoomEnvironment` baked to PMREM for default IBL (no external HDR file required for MVP).
- One key directional light (cool white), one fill (warm violet), one rim (alien green).
- Tone mapping: `ACESFilmicToneMapping`, exposure 1.0 baseline (animated by escalation).
- Color space: output `SRGBColorSpace`.

### 4.3 Materials

| Material | Use | Key params |
|---|---|---|
| `MeshPhysicalMaterial` | Ship, alien structures, energy beams | `iridescence`, `clearcoat`, `transmission` for energy quads |
| `MeshStandardMaterial` | Earth, defenses, region props | `metalness`, `roughness`, PBR-driven |
| `ShaderMaterial` | Earth atmosphere, instability FX, custom regions | PBR-like lighting computed in-shader |
| `LineBasicMaterial` | Targeting lines, network edges | Cheap, always crisp |
| `SpriteMaterial` | One-shot explosions, decals | Pooled |

Hero objects (ship, Earth) use `MeshPhysicalMaterial` for iridescence and clearcoat. Bulk objects (debris, projectile trails) use `MeshStandardMaterial` or `InstancedMesh` for performance.

### 4.4 Post-FX (EffectComposer)

Order:

1. `RenderPass` — main scene.
2. **Selective Bloom** — UnrealBloomPass on `LAYER_ALIEN_ENERGY` only (alien weapons glow without washing out HUD).
3. **Halftone** — subtle, propaganda visual language cue.
4. **Chromatic Aberration** — uniform `intensity` driven by Instability signal (0 → 1.5%).
5. **Grain** — always-on, low intensity (0.05).
6. **Output Pass** — tone-mapped sRGB output.

The `InstabilityFX` module owns the uniforms for passes 3–5 and reads from the `instability` signal.

### 4.5 Render Loop Discipline

- Render layer only reads signals.
- Per-frame work: clear pool slots, sync visible transforms (interpolated), update uniforms from signal-backed params, render.
- No allocations in hot path: pools for projectiles, missiles, decals, sparks.

---

## 5. Procedural Asset Pipeline

### 5.1 Geometry Catalog

A small library of parameterized builders, all using Three.js primitives:

| Builder | Output | Used by |
|---|---|---|
| `icosahedron(radius, detail)` | Subdivided sphere | Ship hull, alien cores |
| `lathe(points, segments)` | Revolved profile | Beams, energy conduits, missiles |
| `tube(curve, segments, radius)` | Swept tube | Region networks, signal chains |
| `shapeExtrude(shape, depth)` | Extruded shape | Region bases, base plates |
| `instanced(geo, count)` | Instanced mesh | Debris, satellite clouds, damage marks |
| `lineStrip(points)` | `LineSegments` | Targeting lines, network edges |
| `proceduralCity(seed)` | Custom `BufferGeometry` | Stylized cityscape per region |
| `shieldBubble(radius)` | Custom `BufferGeometry` | Defense shields |

### 5.2 Region Definitions (10–14 hand-crafted)

Each region is a JSON entry describing:

```ts
interface RegionDef {
  id: RegionId;
  name: string;
  silhouette: 'ice-cap' | 'megacity' | 'plains' | 'archipelago' | 'mountain' | 'desert' | 'forest' | 'volcanic' | 'oceanic-trench' | 'orbital-hub';
  resistance: ElementId;       // primary resistance
  weakness: ElementId;          // primary weakness
  environmentalBonus: EffectId;
  defense: DefenseArchetype;
  factionSeed: FactionId;
  resourceWeights: Partial<Record<ResourceId, number>>;
  visual: {
    primaryColor: string;
    accentColor: string;
    geometryHints: GeometryHint[];
    shaderUniforms: Record<string, number | [number, number]>;
  };
}
```

10–14 entries ship in MVP. Each is hand-tuned for silhouette, color, and gameplay signature.

### 5.3 Shader Library

Modular GLSL chunks composed via `#include`:

- `noise.glsl` — simplex 2D/3D, FBM.
- `iridescence.glsl` — thin-film color shift for alien materials.
- `energy.glsl` — animated UVs + emissive ramp for weapon quads.
- `earthAtmosphere.glsl` — fresnel rim glow, day/night terminator on stylized Earth.
- `instability.glsl` — UV displacement, hue shift, edge flicker — gated by Instability tier.

### 5.4 Instability Visual System

`InstabilityFX` exposes tiered uniforms:

| Tier | Threshold | Visual |
|---|---|---|
| Stable | 0–24 | None |
| Strained | 25–49 | Subtle UI misalignment, faint chromatic aberration |
| Volatile | 50–74 | Halftone intensifies, ship material hue drift |
| Critical | 75–99 | Strong chromatic aberration, weapon quads glitch, audio crackle |
| Collapse | 100 | Continuous UV displacement, screen tear, alarm overlays |

All tiers preserve readability — the HUD must remain legible at 100.

---

## 6. State Schema (Sketch)

```ts
// ids
type RegionId = string & { __brand: 'RegionId' };
type WeaponId = string & { __brand: 'WeaponId' };
type AdaptationId = string & { __brand: 'AdaptationId' };
type BurdenId = string & { __brand: 'BurdenId' };

// Earth
interface EarthState {
  planetaryIntegrity: number; // 0..100
  humanResolve: number;      // 0..100
  globalPanic: number;       // 0..100
  humanUnity: number;        // 0..100
  networkControl: number;    // 0..100
  alienExposure: number;     // 0..100
  biosphereStability: number;// 0..100
  escalationPhase: 1 | 2 | 3 | 4 | 5;
  responseClock: number;     // 0..100
  regions: Record<RegionId, RegionState>;
  activeConditions: ReadonlyArray<ConditionId>;
  activeCounter: CounterDef | null;
  nextCounter: CounterDef | null; // telegraphed 1 phase ahead
}

interface RegionState {
  id: RegionId;
  visualState: 'intact' | 'damaged' | 'occupied' | 'compromised' | 'rebelling' | 'destroyed';
  defense: DefenseSpec;
  resourceStockpile: number;
  network: NetworkSpec;
  factionAttitude: FactionAttitude;
}

// Ship
interface ShipState {
  hull: number;
  hullMax: number;
  shield: number;
  shieldMax: number;
  energy: number;
  energyMax: number;
  heat: number;             // 0..100
  signal: number;           // 0..100
  instability: number;      // 0..100
  position: { lane: OrbitalLane; arc: number; zOffset: number };
  weapons: WeaponSlot[];    // 3 slots MVP
  modules: ShipModule[];    // 4 slots MVP
  adaptations: Set<AdaptationId>;
  activeBurdens: Set<BurdenId>;
}

// Combat
interface Projectile {
  id: string;
  archetype: WeaponId;
  lane: OrbitalLane;
  arc: number;
  vArc: number;             // angular velocity
  element: ElementId;
  baseDamage: number;
  ttl: number;
  owner: 'player' | 'earth';
  flags: ProjectileFlags;
}

interface Defense { /* id, type, lane, position, hp, shield, resistance, weakness, behavior */ }
interface Missile { /* id, sourceRegion, target, phase, eta, warheadType */ }

// Progression
interface RunState {
  seed: number;
  commander: CommanderId;
  archetype: ArchetypeId;
  earth: EarthState;
  ship: ShipState;
  victory: { annihilation: number; submission: number; digital: number; fracture: number };
  events: GameEvent[];
  encounter: EncounterState | null;
  clock: number;            // sim ticks elapsed
}
```

All numeric fields that change during play are signals. Read-only aggregates are `computed()`.

---

## 7. Reactivity Conventions

- **Mutators** live in `state/**` and only touch signals.
- **Read-only derivations** use `computed()` (e.g., `effectiveDamage = computed(() => baseDamage * elementMultiplier(...))`).
- **Render nodes** subscribe via `effect()` or per-frame batched reads.
- **Events** are signal-backed: a tiny `eventBus` of `signal<State>` style channels (e.g., `missilesLaunched`, `regionDestroyed`) so render can animate consequences without polling.
- **Hot reload** discipline: state modules must not capture module-scope non-signal singletons; pass `Env` explicitly.

---

## 8. Time and Loop

```ts
class Loop {
  private acc = 0;
  private readonly step = 1000 / 60; // 16.666ms
  private readonly maxDt = 100;      // spiral-of-death guard

  start() {
    requestAnimationFrame(this.frame);
  }

  private frame = (now: number) => {
    const realDt = Math.min(now - this.last, this.maxDt);
    this.last = now;
    this.acc += realDt;
    while (this.acc >= this.step) {
      this.tick(this.step / 1000);   // logical update, dt in seconds
      this.acc -= this.step;
    }
    const alpha = this.acc / this.step;
    this.render(alpha);              // interpolated render
    requestAnimationFrame(this.frame);
  };
}
```

- Logical tick: advance state, run AI, run physics math, evaluate conditions.
- Render: read interpolated positions, draw.
- Determinism: logical ticks must be pure functions of `(state, input)` so replays/seeds work.

---

## 9. Damage, Resistances, and Counters

```ts
function computeDamage(p: Projectile, t: Defense, ctx: CombatCtx): number {
  const elem = elementMultiplier(p.element, t.resistance, t.weakness);
  const branch = branchMultiplier(p.archetype, t.archetype);
  const inst = instabilityPenalty(ctx.instability);
  const adapt = adaptationDamageBonus(ctx.adaptations, p.element);
  return p.baseDamage * elem * branch * inst + adapt;
}
```

### 9.1 Earth Counter Engine

- Track per-run histograms: most-used weapon family, preferred lane, most-targeted region type, destruction/infiltration ratio, shield/drone/cloak reliance.
- At each escalation transition, Earth selects a counter from a pool whose `triggerCondition` matches the player's history.
- Player sees `nextCounter` in HUD before it activates.
- Counter can be sabotaged via puzzle (Computer Virus) or baited by deliberately feigning a strategy.

---

## 10. Instability Math

```ts
function evaluateBurdens(instability: number, owned: Set<AdaptationId>): BurdenId[] {
  // tiers: 25, 50, 75, 100
  const out: BurdenId[] = [];
  if (instability >= 25) out.push(pickBurden('minor'));
  if (instability >= 50) out.push(pickBurden('major'));
  if (instability >= 75) out.push(pickBurden('volatile-event'));
  if (instability >= 100) out.push('collapse-countdown');
  return out;
}
```

- Adaptation choice UI shows Instability cost up front and the Burden it may trigger.
- Purging Instability: sacrifice an adaptation, destroy a ship module, complete a stabilization puzzle, or spend Dark Matter.
- Burdens are build-defining when possible (player can lean into them).

---

## 11. Victory Paths and Hybrid Endings

Each path tracks a 0..1 progress signal:

- `annihilation` rises with destroyed infrastructure and reduced `planetaryIntegrity`.
- `submission` rises with `globalPanic` and reduced `humanResolve`.
- `digital` rises with `networkControl`.
- `fracture` rises as `humanUnity` collapses.

Final ending = (highest path at 1.0) OR (hybrid rule). Hybrid rules are declared as data:

```ts
interface EndingRule {
  id: string;
  description: string;
  requires: (v: VictoryProgress, e: EarthState) => boolean;
  variant: 'annihilation' | 'submission' | 'digital' | 'fracture';
}
```

This lets us add endings without code changes.

---

## 12. Puzzle Subsystem

Puzzles are **state machines with a fixed rule interface**:

```ts
interface Puzzle<R> {
  init(rng: RNG): R;
  tick(state: R, dt: number, input: InputFrame): R;
  isComplete(state: R): boolean;
  outcome(state: R): PuzzleOutcome;
  renderState(state: R): RenderHints;
}
```

Earth conditions modify rules via a wrapper:

```ts
function withConditions<R>(p: Puzzle<R>, conditions: ConditionId[]): Puzzle<R>;
```

- Computer Virus and Propaganda Network ship in MVP.
- Outcomes write to Earth signals directly (e.g., `networkControl += 0.1`, `humanUnity -= 0.05`).

---

## 13. Audio Architecture

- One `AudioContext`, lazily resumed on first input.
- Master mixer → { music bus, sfx bus, voice bus, ui bus } → destination.
- Music: layered stems (bass, pad, percussion, lead). Stems fade in/out by `escalationPhase`.
- SFX: pool of `AudioBufferSourceNode`, parameter-driven (`playbackRate` rises with Instability).
- Voices: synthesized radio chatter (oscillator + formant filter) for prototyping; can swap to recorded takes later.
- Distortion on the master bus rises with `instability`.

All audio is reactive: it reads signals. No `setTimeout`-driven audio scheduling.

---

## 14. Input

- Single `Input` module owns keyboard, mouse, and gamepad state.
- Bindings table maps actions (`fire`, `laneUp`, `openScan`, …) to physical inputs.
- Rebinding writes to IndexedDB settings.
- All actions publish to `inputBus` (signal); game logic and render subscribe.

---

## 15. Persistence (IndexedDB)

Three object stores:

| Store | Key | Value | Use |
|---|---|---|---|
| `settings` | `string` | `Settings` | Volume, controls, accessibility |
| `meta` | `string` | `MetaProgress` | Unlocks, commander history, intel |
| `runs` | `runId` | `RunSummary` | Completed/abandoned runs (history) |
| `live` | `'current'` | `RunState` | Single in-progress run (auto-saved) |

Schema is versioned; `Store` has a `migrate()` method.

---

## 16. Performance Budget

| Metric | Target |
|---|---|
| Frame time | ≤ 16.6 ms (60 FPS) on integrated GPU @ 1080p |
| Active projectiles | ≤ 200 |
| Active missiles | ≤ 6 |
| Draw calls | ≤ 250 |
| Active signals read by render | ≤ 60 |
| Post-FX passes | 4 visible at once |
| Memory | ≤ 350 MB heap |

`InstancedMesh` is mandatory for debris, satellite clouds, and damage marks.

---

## 17. Determinism and RNG

- All run content is seeded by a single `seed`.
- Mulberry32 implementation; helpers: `pickWeighted`, `shuffle`, `range`, `chance`.
- Procedural city/region variants also seeded per-region.
- RNG is passed explicitly — never use `Math.random()` in `state/**`.

---

## 18. Testing Strategy

### 18.1 Unit (Vitest)

Required coverage:

- `damage.test.ts` — resistances, weaknesses, branch multipliers, edge cases.
- `rng.test.ts` — determinism, distribution sanity.
- `instability.test.ts` — tier transitions, Burden assignment, purge.
- `counter.test.ts` — counter selection matches player history.
- `victoryPaths.test.ts` — progress math, hybrid endings.
- `puzzle.test.ts` — every puzzle rule under at least 3 conditions.
- `escalation.test.ts` — phase transitions, response clock.

### 18.2 E2E (Playwright)

Smoke tests (one per PR):

- `boot.spec.ts` — page loads, canvas mounts, first frame renders.
- `first-shot.spec.ts` — pressing fire spawns a projectile.
- `scene-mounts.spec.ts` — Earth, ship, HUD all visible.
- `save-load.spec.ts` — IndexedDB write/read round-trip.

### 18.3 Visual Regression (optional)

Snapshot screenshots of Earth at fixed seeds. Tolerate per-pixel noise; flag major diffs.

---

## 19. Build and Deploy

- `npm run dev` — Vite dev server with HMR (including shaders).
- `npm run build` — production bundle to `dist/`.
- `npm run test` — Vitest watch.
- `npm run test:unit` — Vitest CI mode.
- `npm run test:e2e` — Playwright.
- `npm run lint` / `npm run format` — ESLint + Prettier.
- `npm run typecheck` — `tsc --noEmit`.

Deploy target: static host (Vercel/Netlify/GH Pages). All assets self-contained; no SSR.

---

## 20. Risk Register

| Risk | Mitigation |
|---|---|
| Shader HMR pain | `vite-plugin-glsl` with HMR enabled; GLSL errors surface in Vite overlay |
| Instability FX breaking readability | Tiered intensity; HUD legibility test at each tier |
| Procedural Earth feels samey | Per-region variant seeds + 4 region variants per silhouette |
| Signal overuse / perf | Batch signal reads at render time; cache `computed` per frame |
| PBR cost on ortho | Use `MeshStandardMaterial` for bulk objects; reserve `MeshPhysicalMaterial` for hero objects |
| Save schema drift | Versioned schema + `migrate()` |
| Procedural condition combos creating impossible runs | Validator at run-start guarantees ≥ 2 counters per condition |
| Shader compilation hitches on first load | Compile shaders during boot screen; show progress |

---

## 21. Prototype Milestones (mapped to GDD §22)

1. **Boot** — Three.js orthographic scene + 1 ship quad + signal-backed `ShipState` + render sync.
2. **Loop** — Fixed 60 Hz accumulator + interpolated ship movement.
3. **Weapons v1** — Plasma + Kinetic + EMP with resistance/weakness math.
4. **Earth v1** — Stylized sphere + 4 regions + persistent damage layer.
5. **Conditions** — 6 planet conditions wired into damage and visuals.
6. **Defenses v1** — 8 defense types + targeting HUD.
7. **Nuclear missile** — Telegraph, countdown, interception, redirection.
8. **Adaptations + Burdens** — 12 adaptations + 8 burdens with Instability math.
9. **Puzzles v1** — Virus + Propaganda with Earth state effects.
10. **Victory paths v1** — Annihilation + Digital Dominion.
11. **Counter engine** — Player history → counter selection → telegraph.
12. **Boss** — Orbital Defense Ring with multiple defeat paths.
13. **Full 30-min run balance pass.**

---

## 22. Open Questions for v0.2

These are deliberately deferred and will be resolved before the next TDD revision:

- Do we want a `WebGPU` renderer path in addition to WebGL, or stay WebGL-only for MVP?
- Final commander roster for MVP (GDD currently says "one commander for MVP").
- Specific HDRI choice for the cinematic combat environment (RoomEnvironment is the safe MVP default).
- Audio: synthesized vs recorded radio chatter for MVP.
- Accessibility: do we provide an untimed puzzle mode in MVP, or post-MVP?

---

## 23. Closing Statement

The GDD defines what Alien Invader is. This TDD defines how it is built.

The architecture is intentionally small: **pure state + signals + orthographic PBR + procedural shaders + custom kinematic math + WebAudio + IndexedDB**. Every other decision flows from those eight choices. If a future feature cannot be expressed inside them, that is a signal to revise the architecture, not to bolt on a new layer.