# Hybrid PBR + Radiance Cascades Design

**Status:** Proposed implementation specification  
**Date:** 2026-08-09  
**Scope:** `7_hotlineShanghai` default renderer and intro-scene lighting authoring

## 1. Goal

Replace the default Canvas2D presentation with a Three.js 2.5D top-down PBR renderer, then composite the verified 2D Radiance Cascades (RC) output into that render in linear color space. Preserve the existing fixed camera, simulation, collision model, procedural-content constraint, and BLINDSIDE rule that illumination changes combat state.

Success means:

- walls, floors, and props have readable material form from normals, roughness, and direct light;
- RC adds colored indirect light and soft occlusion without flattening PBR shading;
- the default game frame uses `RcPipeline`, not only `rc-lab` or `rc-showcase`;
- dither becomes a subtle final pixel-art treatment rather than a visible screen-door overlay;
- level designers have one authoritative lighting standard and a repeatable validation procedure;
- `npm run rc-lab:check`, typecheck, build, and the intro-scene browser gate pass.

## 2. Non-goals

- Full 3D character models, free camera movement, perspective aiming, or 3D physics.
- Runtime-loaded textures, models, HDR files, or other asset files.
- Custom BRDFs or invasive Three.js shader-chunk modification.
- Physically exact coupling between RC radiance and each material BRDF.
- Replacing the pure simulation or changing gameplay coordinates from 2D.
- Supporting both Canvas2D and Three.js as permanent production renderers. Canvas2D may remain only as a temporary diagnostic fallback during migration.

## 3. Selected Approach

Use **PBR first, RC composite second**:

```text
Simulation snapshot
  -> SceneManager (Three.js orthographic 2.5D)
     -> linear HDR sceneColor
     -> binary occlusion
     -> linear emission
  -> RcPipeline.renderFrame()
     -> RC radiance
     -> gameplay light-field readout
  -> final linear composite
  -> ACES tone mapping
  -> linear-to-sRGB output
  -> optional pixel-grid dither
  -> default framebuffer
```

This keeps PBR responsibilities in Three.js and RC responsibilities in the existing isolated WebGL2 pipeline. It avoids injecting RC into every material shader and preserves the lab-tested RC implementation.

## 4. Architecture

### 4.1 Context and Ownership

`GameEngine` creates and owns one canvas and one WebGL2 context. Construction order is frozen:

```ts
const canvas = document.createElement('canvas');
const gl = canvas.getContext('webgl2', RC_CONTEXT_ATTRIBUTES);
const renderer = new THREE.WebGLRenderer({ canvas, context: gl });
const scene = new SceneManager(renderer, host);
const rc = new RcPipeline(gl, canvas, config);
```

This changes `RcPipeline` from canvas-created context ownership to injected context ownership. `GameEngine` owns resize, context-loss listeners, subsystem reconstruction, canvas attachment/removal, and final disposal. `SceneManager` owns Three.js objects and Three-owned render targets but neither the renderer nor canvas.

Three.js does not publicly expose backing WebGL textures or support arbitrary external framebuffers. To avoid full-frame CPU readback, this project freezes one version-pinned adapter for Three.js r170: after `renderer.initRenderTarget(target)`, it obtains `renderer.properties.get(target.texture).__webglTexture`, validates the handle, and lends it to RC. Only this adapter may touch that private field. A startup contract test fails to `PBR_ONLY` if it is absent, and Three.js upgrades are blocked until the test passes. RC never deletes, resizes, or reconfigures borrowed textures. Static occlusion is cached.

### 4.2 `GameEngine`

`GameEngine` owns the renderer lifecycle:

- construct `SceneManager` and `RcPipeline` against a compatible WebGL2 context;
- advance simulation at the existing fixed timestep;
- ask `SceneManager` to update procedural geometry and render the three frame inputs;
- pass those inputs to `RcPipeline.renderFrame` once per visible frame;
- publish RC state and light-field state through existing DEV hooks;
- dispose both subsystems in `stop()`.

The frame loop does not read pixels synchronously except through the explicitly budgeted light-field path. RC quality degradation must not alter simulation timing.

### 4.3 `SceneManager`

`SceneManager` becomes a deep rendering module with this public responsibility:

```ts
interface SceneManager {
  renderTargets(snapshot: GameSnapshot, elapsed: number): SceneFrameImages;
  aimAngle(clientX: number, clientY: number, player: Vec2): number;
  handle(event: SimEvent): void;
  destroy(): void;
}
```

Implementation details remain private: Three.js scene graph, procedural mesh factories, render targets, override materials, cameras, and texture handles.

### 4.4 `RcPipeline`

Use this staged input contract:

- `sceneColor`: linear HDR PBR color;
- `occlusion`: white traversable space, black RC blocker;
- `visualEmission`: linear emission for every visible emitter;
- `gameplayEmission`: linear emission for gameplay-classified lights only;
- all targets have identical dimensions and orientation.

The visual RC pass consumes `visualEmission`. A second reduced-resolution gameplay RC pass consumes `gameplayEmission` and writes the light field without final composition or dither. Both use the same occlusion and RC algorithm/config family. The production pipeline owns final composition. Debug display can expose seed, SDF, visual radiance, gameplay radiance, clean PBR, light field, and final output, but diagnostic views bypass dither.

Minimum additions are `RcDebugStage`, `RcDitherMode = 'off' | 'subtle' | 'pixel-art'`, and `RcOutputMode = 'hdr-rgba16f' | 'ldr-rgba8' | 'pbr-only'`. `renderFrame` returns timings, output mode, degradation/failure state, and whether the light field updated. State reports output capability and light-field age. `lightFieldSnapshot()` returns the latest immutable CPU snapshot with dimensions, frame number, and linear values.

### 4.5 WebGL State Contract

Three.js and raw WebGL share one context. Around every raw RC sequence:

1. finish the Three.js render passes;
2. save program, VAO, framebuffer, viewport, active texture, blend, depth, scissor, cull, and color-mask state required by the frozen WebGL state contract;
3. run RC passes;
4. restore state;
5. call `renderer.state.reset()` before the next Three.js operation.

The exact saved state is: current program, VAO, array-buffer binding, draw/read framebuffer, viewport, scissor box, active texture, bindings for every touched texture unit, draw buffers, blend enable/function/equation, depth enable/mask/function, cull enable/mode/front-face, scissor enable, and color mask. Restoration runs in `finally`; `renderer.state.reset()` runs immediately after restoration and before another Three.js call. No subsystem may infer a texture's purpose from its color. Scene color must never double as the occlusion mask.

## 5. 2.5D Scene Representation

### 5.1 Camera and Coordinates

- Fixed orthographic top-down camera with the current gameplay framing.
- Simulation remains in 2D world units `(x, y)`.
- Rendering maps simulation `(x, y)` to Three.js `(x, elevation, y)`.
- Aim conversion raycasts onto the floor plane and returns a 2D simulation angle.
- Geometry and camera movement snap to the internal pixel grid where necessary to avoid crawling edges.

### 5.2 Procedural Geometry

- Floor: plane or shallow slab with generated color/roughness variation.
- Walls: extruded boxes; height must produce readable top and side faces without hiding combatants.
- Furniture: simple procedural boxes, cylinders, and beveled primitives.
- Characters: camera-facing procedural planes or shallow meshes with alpha-tested pixel silhouettes.
- Lights: non-rendering gameplay light nodes plus optional emissive fixture geometry.

All content remains generated in code. Reusable geometry and materials are cached; they are not recreated every frame.

### 5.3 PBR Materials

Use `MeshStandardMaterial` or `MeshPhysicalMaterial` with restrained parameter ranges:

- dielectric architecture: metalness `0`, roughness `0.55-0.95`;
- painted metal: metalness `0.2-0.65`, roughness `0.35-0.75`;
- polished metal accents: metalness `0.75-1`, roughness no lower than `0.2`;
- emissive fixtures may be bright visually, but gameplay illumination comes from the emission target;
- generated normal detail must be low-frequency enough to survive the internal resolution.

Direct lighting establishes form. RC must not be tuned to compensate for missing normals, weak key light, or invalid color space.

## 6. Color and Composition

### 6.1 Color Pipeline

- Author colors as sRGB values through Three.js color APIs.
- Perform PBR shading and RC composition in linear space. This supersedes the stale `SRGBColorSpace` offscreen-target statement and must use the contract-change procedure before implementation.
- Freeze Three.js settings: offscreen scene target `LinearSRGBColorSpace`, offscreen PBR pass `NoToneMapping`, and normal sRGB authoring conversion for `THREE.Color` values.
- Prefer `RGBA16F`. `RGBA8` is an explicit LDR degradation mode, not equivalent HDR: direct/emissive values are clamped to an LDR profile with separately validated exposure and light scale.
- Combine `sceneColor + radiance * lightScale` before tone mapping.
- Apply ACES Filmic tone mapping once.
- The raw final shader performs ACES once and linear-to-sRGB once. No later Three.js or framebuffer conversion is allowed.
- The light-field cache stores linear illumination and must not receive tone mapping or sRGB conversion.

### 6.2 Dither

Dither exists to reduce low-bit gradient banding and return smooth RC gradients to the game's pixel-art texture. It is not part of lighting physics.

Production rules:

- freeze order as `linear composite -> ACES -> linear-to-sRGB -> display-code-space dither -> default framebuffer`;
- anchor the 4x4 Bayer matrix to the internal render pixel grid, not CSS/device pixels;
- `subtle` amplitude is `0.5/255` normalized sRGB and `pixel-art` amplitude is `1/255`;
- multiply amplitude by `1 - smoothstep(0.75, 0.95, max(rgb))`; edge attenuation is deferred unless a deterministic edge input is added;
- disable it in all debug buffers and clean-PBR capture mode;
- expose `off`, `subtle`, and `pixel-art` DEV modes, with `subtle` as production default.

No temporal noise is allowed because it would shimmer and break deterministic captures.

## 7. Rendering Passes

For each visible frame:

1. Update transforms and material state from the immutable simulation snapshot.
2. Render PBR scene color with direct lighting into the scene-color target.
3. Render occlusion with an override material: blockers black, traversable area white, no tone mapping.
4. Render visual and gameplay emission targets with classified override materials in linear color.
5. Borrow the version-pinned Three.js texture handles through the isolated adapter and pass them to `RcPipeline` without CPU readback.
6. Run prepscene, JFA, SDF, direct cascade loop, indirect cascade loop, and final composite.
7. Update the reduced light-field representation at its frozen cadence and budget.
8. Present final output to the default framebuffer.

Static room geometry may cache occlusion. Dynamic blockers and destroyed lights invalidate only the affected target or force a full refresh when partial invalidation is not yet implemented.

## 8. Lighting and Gameplay Contract

RC is both a visual layer and a gameplay input. They use the same occlusion, algorithm, and gameplay-source values, but separate emission/radiance passes so decorative light cannot silently affect mechanics.

- `LIGHT_EXPOSED_THRESHOLD` controls player exposure.
- `LIGHT_SHIELD_THRESHOLD` controls enemy invulnerability.
- Threshold values remain owned by `TDD.md`; this specification does not redefine them.
- A destroyed gameplay light must remove its emission and update the light field quickly enough to satisfy the existing light-smash contract.
- Decorative lights are excluded from gameplay sampling unless explicitly classified as gameplay lights.
- RC-disabled degradation returns the frozen safe fallback: no light shielding and a visible power-loss treatment.

PBR direct lights used only to reveal material shape must not silently create gameplay illumination. Every direct renderer light needs an explicit classification:

```ts
type RenderLightRole = 'material-key' | 'gameplay' | 'decorative';
```

Only `gameplay` lights write to the gameplay emission/light-field path. `material-key` light must remain neutral, restrained, and spatially broad enough not to communicate false safe or dangerous zones.

Gameplay sampling is frozen as `gameplayRadiance = directGameplayRadiance + indirectGameplayRadiance`, then `lightValue = clamp(dot(gameplayRadiance.rgb, vec3(0.2126, 0.7152, 0.0722)), 0, 1)`. It excludes material-key and decorative-only lights before radiance is written.

The gameplay attachment is 240x135 at 1920x1080 and proportionally scaled otherwise. The existing frozen 8x8 `glReadPixels` sample update runs every visible frame and must complete within 0.2 ms target / 0.4 ms hard limit. It reads the most recent gameplay radiance and refreshes the CPU cache. Gameplay radiance is recomputed after a gameplay light change and at least every 100 ms. The destruction frame retains its previous shield result; the refreshed cache becomes authoritative only after the frozen `LIGHT_POOL_DOWN_S = 0.1s` transition. Three consecutive hard readback overruns disable gameplay RC and shielding atomically rather than serving stale protection. The visual RC budget remains the existing TDD budget.

Preferred light-field format is bottom-left-origin `R32F`. Without `EXT_color_buffer_float`, use `RGBA8`, encode `round(clamp(value, 0, 1) * 255)` in R, decode `r/255`, and include `1/255` threshold tolerance. If attachment or deterministic readback validation fails, gameplay RC and shielding disable while visual RC may continue. CPU output is flipped to top-left origin, bilinearly sampled, and mapped through active orthographic room bounds. Threshold decisions use the un-tone-mapped linear value.

## 9. Level Lighting Standard

Create `docs/design/20-level-lighting-standard.md` as the level-authoring entry point. `TDD.md` remains authoritative for numbers and APIs; the new document defines usage and validation.

### 9.1 Classification

Every authored light declares:

- role: gameplay, decorative, or material-key;
- source archetype and owning fixture;
- destructible state and hit points;
- emission color, intensity, radius, and animation;
- whether it participates in the light field;
- expected shadow route or purpose.

### 9.2 Encounter Rules

- Every required kill has a reachable shadow route or a destructible controlling gameplay light.
- No mandatory enemy remains permanently shielded by overlapping indestructible lights.
- Critical traversal alternates readable light, transition, and shadow zones; uniform ambient coverage is invalid.
- Threshold boundaries require visible margins. Do not design success around a value barely crossing a threshold.
- Destruction must visibly and mechanically update within the frozen response budget.
- Decorative emission cannot erase a required shadow route.

### 9.3 PBR Readability Rules

- Characters and interactables retain silhouette contrast in both lit and dark states.
- Material-key lighting may reveal normals but cannot overpower gameplay light colors.
- Avoid roughness and exposure combinations that turn all surfaces into uniform gray.
- Emissive fixture appearance and actual gameplay radius must agree perceptually.
- Tone mapping must preserve warm/cool source separation and shadow readability.

### 9.4 Validation Probes

Each level defines named probes for:

- every enemy's initial position;
- each intended shadow kill position;
- each light-transition boundary;
- player spawn and required route waypoints;
- before/after states for every destructible gameplay light.

The validation report records linear light value, expected state, actual state, controlling lights, and margin from the nearest threshold.

## 10. Failure and Degradation Behavior

- Missing WebGL2: show an explicit unsupported-renderer state; do not silently present incorrect lighting gameplay.
- Missing float color target: use the verified linear RGBA8 fallback and report the mode in DEV state.
- RC shader/FBO failure: disable RC and light shielding together, show the frozen power-loss treatment, and retain playable base PBR rendering.
- Frame-budget pressure: follow the frozen RC cascade/resolution degradation ladder.
- Context loss: pause presentation, rebuild Three.js and RC targets after restoration, then regenerate static targets.
- Target dimension/orientation mismatch: fail the frame in DEV with a precise error rather than sampling undefined textures.

`GameEngine` owns the lifecycle `READY -> CONTEXT_LOST -> REBUILDING -> READY`, with rebuild failure entering `PBR_ONLY`; creation failure enters `UNSUPPORTED`; any state can enter `STOPPED`. Context loss pauses presentation but not fixed simulation and atomically disables shielding. One bounded restoration attempt rebuilds both subsystems. `PBR_ONLY` presents Three.js with ACES/sRGB and the power-loss treatment while RC and shielding remain off.

## 11. Migration Sequence

1. Add a Three.js 2.5D `SceneManager` that can render the intro room as clean PBR without RC.
2. Add explicit scene-color, occlusion, and emission targets plus debug displays.
3. Connect `RcPipeline.renderFrame` in `GameEngine` and preserve WebGL state.
4. Move tone mapping and dither to the final composition contract.
5. Connect light-field output to gameplay without changing threshold ownership.
6. Add degradation/error handling and DEV state.
7. Publish the level-lighting standard and validate the intro scene against it.
8. Remove the Canvas2D production path after parity gates pass.

At every migration step, keep the app runnable. Do not combine geometry migration, RC wiring, and gameplay-light-field changes in one unverified edit.

## 12. Verification

### 12.1 Automated Gates

- `npm run typecheck`
- `npm run build`
- `npm run rc-lab:check`: lab and engine port remain 35/35 with deterministic output
- browser smoke: zero console/page/WebGL errors
- render-target checks: matching dimensions, expected orientation, legal formats, complete framebuffers

### 12.2 Deterministic Reference Room

Add one procedural reference room containing:

- matte floor;
- rough painted wall;
- metallic prop;
- warm destructible lamp;
- cool decorative emitter;
- blocker producing a required shadow route;
- one enemy whose shield state changes when the lamp is destroyed.

Capture clean PBR, occlusion, emission, seed, SDF, radiance, light field, subtle-dither final, and dither-off final.

The gate uses Chromium with SwiftShader, viewport 1280x900, DPR 1, fixed camera, fixed simulation seed/time, and disabled pulse animation. HDR and LDR modes each declare expected probe ranges.

### 12.3 Acceptance Criteria

- with RC disabled, named wall/floor/metal probes differ by at least `0.08` linear luminance or `0.12` local 3x3 contrast as declared by the fixture;
- enabling RC raises the designated bounce probe by at least `0.05` linear luminance while retaining at least 80% of clean-PBR material-edge contrast;
- subtle dither changes each encoded channel by at most `1/255`; debug and dither-off buffers have zero dither delta;
- debug buffers contain no dither;
- the initial enemy state and post-destruction state match sampled light-field values;
- required shadow route has a documented safe margin from thresholds;
- RC degradation never leaves invisible gameplay shielding active;
- a scripted movement/aim/light-smash trace produces the same ordered simulation events and final gameplay snapshot before and after migration;
- HDR/LDR probes remain within declared tolerances, RC total time remains within the TDD budget, and light-field readback remains within its frozen budget.

## 13. Documentation Authority

- `TDD.md`: frozen numeric values, interfaces, performance budgets, and degradation contract.
- `docs/design/04-radiance-cascades-pipeline.md`: RC algorithm explanation.
- `docs/design/06-rendering-readability.md`: color-space and readability details.
- `docs/design/09-blindside-integration.md`: gameplay meaning of light and shadow.
- `docs/design/10-architecture-cat.md`: module boundaries.
- `docs/design/20-level-lighting-standard.md`: level-authoring and acceptance workflow created by this work.
- This specification: migration architecture and implementation scope.

Any required change to a frozen TDD value must use the project's contract-change procedure rather than being introduced implicitly during renderer implementation.

Implementation task zero is the mandatory `[TDD-CONTRACT-CHANGE]` gate. It must update `TDD.md` and obtain the project's required approval for: injected shared context, revised `IRcPipeline` initialization/render interfaces, linear offscreen color space, dual visual/gameplay emission, output/debug/state types, the reduced gameplay-radiance attachment, and the Three.js r170 texture-handle adapter. No production code may change before that gate is approved. Existing 8x8 every-frame light-field readback and 0.1-second light-pool response remain unchanged.
