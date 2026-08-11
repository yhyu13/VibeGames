# RC Intro Scene Copy Design

**Status:** Approved visual direction, implementation pending  
**Date:** 2026-08-10  
**Route:** `/rc-intro-copy/`

## Goal

Create an isolated copy of `m1_intro_scene` that runs the real 2D `RcPipeline` and provides a safe place to improve Radiance Cascades before porting validated mask and emission generation into the default game. The copy must demonstrate moving enemy light, dynamic entity shadows, solid-cover shadows, deterministic lamp damage, and human-readable debug output.

## Non-goals

- Do not change live combat, simulation, controls, or the default game route.
- Do not introduce Three.js, 2.5D geometry, PBR, fake radial-light replacement, or image assets.
- Do not claim changes are integrated into `RcPresenter` until separately ported and verified.
- Do not delete dither from the shared pipeline in this experiment; force it off in the copied route. Contract-wide deletion remains separate work.

`/rc-intro-copy/` was an explicit experimental exception to the production intro contract when this specification was written. As of the 2026-08-10 v3.7 contract migration, its three-cascade and disabled-dither comparison settings match the production intro's cascade/dither profile; the copy remains an isolated diagnostic workbench rather than a second gameplay contract.

## Source Data

The copy imports the authoritative intro room and RC light constants from `src/core`; it does not duplicate room strings or lamp numbers. It uses a small local visual state:

```ts
interface IntroCopyState {
  lampState: 'intact' | 'damaged' | 'broken';
  playerPosition: { x: number; y: number };
  enemyPosition: { x: number; y: number };
  enemyAngle: number;
  flashlightEnabled: boolean;
  animate: boolean;
  playerBlocker: boolean;
  enemyBlocker: boolean;
  sandbagBlockers: boolean;
  sparkFlashRemainingMs: number;
  debugStage: 'final' | 'scene' | 'occlusion' | 'emission' | 'seed' | 'sdf' | 'radiance';
}
```

Canonical reload defaults are: intact lamp, player `(2,6)`, enemy `(4,4)`, angle `0`, flashlight on, animation off, all blockers on, no spark, and final stage. This state is presentation-only and has no persistence. Automatic sweep is opt-in: angle follows `sin(t * 0.6 * PI) * 0.7` radians around the current center angle. Automated captures force animation off and fixed time zero.

## Frame Planes

All planes are 480x432 RGBA8, top-row-first `ImageData`, matching the current intro renderer and `RcPipeline.render()` contract.

### Scene Color

Render the copied room as crisp Canvas2D pixel art:

- floor and brick walls from room tiles;
- both sandbags from furniture data;
- oil-lamp fixture in intact/damaged/broken state;
- player and flashlight patrol at deterministic positions;
- low-opacity flashlight telegraph for directional readability;
- labels only outside the game frame.

No fake lamp glow is drawn into scene color.

### Occlusion

Start every frame as opaque white. Draw opaque black blockers for:

- `#` wall tiles;
- `X` cover tiles and furniture sandbags;
- lamp fixture;
- player blocker capsule;
- living enemy blocker capsule.

Entity blockers use stable low-resolution capsules rather than sprite alpha. Particles, labels, flashlight telegraph, and broken glass do not block RC.

### Emission

Start every frame as opaque black. Add:

- oil lamp: warm disk while intact or damaged; none while broken;
- damaged lamp: deterministic waveform, never random noise;
- enemy flashlight: a directional cone mask beginning just ahead of the enemy body;
- optional short spark flash controlled by a manual debug action.

The flashlight cone is rasterized directly into emission so the real RC pass, not Canvas blending, produces its illumination and shadows.

## RC Configuration

Use the real `src/engine/RcPipeline.ts` with:

```ts
{
  cascadeCount: 3,
  baseIntervalPx: 1.5,
  twoLoop: true,
  ditherEnabled: false,
  lightScale: 1.6,
  ambientIntensity: 0.01
}
```

Controls may adjust cascade count, light scale, lamp state, animation, and flashlight angle. Defaults must remain deterministic for screenshots.

## Debug Views

The page contains one large final canvas and a compact debug strip:

- scene color;
- occlusion;
- emission;
- scene seed;
- SDF;
- radiance;
- final.

`scene`, `occlusion`, and `emission` are drawn directly from source `ImageData` into 2D debug canvases. Only `seed`, `sdf`, `radiance`, and `final` use the existing `debugShowStage()` API. No `RcPipeline` debug-stage extension is required. Debug captures never enable dither.

Human-readable probes report:

```text
lamp center        final luma
player position    final luma
enemy position     final luma
left sandbag shade final luma
right sandbag shade final luma
RC state           cascades / JFA / frame ms / degraded
```

Canonical pixel mapping is `px = ox + worldX * scale`, `py = oy + worldY * scale`, where `scale = min(480/12, 432/11)`, `ox = floor((480 - room.width*scale)/2)`, and `oy = floor((432 - room.height*scale)/2)`. Named probes use this mapping for lamp `(5,1)`, player `(2,6)`, enemy `(4,4)`, and sandbags `(2,2)` / `(7,2)`. Each reported probe is a 3x3 mean.

## Interaction

- Lamp buttons: intact, damaged, broken.
- Flashlight slider and optional automatic sweep.
- Toggle player blocker, enemy blocker, and sandbag blockers independently for visual comparison.
- Toggle source planes/debug stages.
- A `Spark` button sets `sparkFlashRemainingMs = 75`; the animation loop decrements it by elapsed milliseconds to zero. `getState().sparkFlashActive` is derived as `sparkFlashRemainingMs > 0`.
- Capture state remains URL-independent; reload returns to canonical defaults.

The page is a visual algorithm workbench, not a playable mission copy.

## Files and Command

- `rc-intro-copy/index.html`: Vite multi-page route at `/rc-intro-copy/`.
- `rc-intro-copy/main.ts`: copied-scene plane generation, controls, probes, and RC orchestration.
- `scripts/rc-intro-copy-check.mjs`: browser gate.
- `package.json`: `rc-intro-copy:check` invokes that script.

The browser script uses the same local Playwright resolution policy as the repaired RC lab gate and expects the dev server on port 5184. Adding the route, check script, and package script is part of implementation; they are not expected to exist before implementation.

## Error Handling

- Route initialization wraps `new RcPipeline(...)` in `try/catch`; WebGL2 failure shows a clear blocking message and sets `window.__rcIntroCopy = { status: 'error', error: message, getState }`.
- Plane validation checks dimensions, opaque alpha, binary occlusion, and non-empty emission for enabled lights.
- Console/WebGL errors mark `window.__rcIntroCopy.status = 'error'`.
- The page exposes `window.__rcIntroCopy.getState()` for browser automation.

## Verification

Automated browser checks must prove:

1. `activeCascades > 0`, `jfaPasses > 0`, `degraded === false`.
2. Dither is false.
3. In the lamp-centered radius-6-pixel emission region, intact RGB sum is greater than 1000. With flashlight disabled, broken RGB sum in that same region is zero.
4. Freeze enemy at `(4,4)`. At angle `0`, the 3x3 probe at `(6,4)` exceeds `(2,4)` by at least 0.05 final luma; at angle `PI`, `(2,4)` exceeds `(6,4)` by at least 0.05.
5. For the blocker test only, place the player at `(6,4)` with enemy flashlight origin `(4,4)` and angle `0` (`+X`). Enabling the player blocker lowers the 3x3 probe at `(7,4)` by at least 0.02 final luma relative to blocker-off.
6. With only the lamp active at `(5,1)`, left sandbag `(2,2)` shadow probe `(1.5,2.5)` is at least 0.02 darker than open probe `(1.5,1.5)`; right sandbag `(7,2)` shadow probe `(8,2.5)` is at least 0.02 darker than open probe `(8,1.5)`.
7. Two renders of the same frozen state have zero sampled-pixel differences.
8. Browser console has zero errors.
9. `npm run typecheck` and `npm run build` pass.
10. Existing `rc-lab` and default game files are not modified by the prototype implementation.

## Promotion Rule

After human approval, port only these validated pieces into `RcPresenter`:

- blocker rasterization helpers;
- flashlight emission rasterization;
- deterministic damaged-lamp emission;
- selected no-dither RC configuration.

The copied route remains explicitly experimental until that port is complete. Its rendering code must not silently become a second production renderer.
