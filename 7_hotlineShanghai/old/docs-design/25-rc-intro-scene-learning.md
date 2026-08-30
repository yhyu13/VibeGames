# RC Intro Scene Learning Notes

**Scope:** `m1_intro_scene` 2D render integration  
**Audience:** level designers, rendering programmers, gameplay programmers, and future agents

## Executive Summary

The isolated RC intro copy validated that a 2D room can produce useful radiance when three explicit planes are prepared:

```text
sceneColor + occlusion + emission
             ↓
        RcPipeline
             ↓
     final 2D composite
```

That result is now ported into the live intro scene. The production profile uses three cascades, four base rays, a six-pixel base interval, two-loop mode, and half-resolution RC working buffers with a full-resolution final composite. Dither is disabled. Entity presentation includes subtle body seeds, a visual-only melee flash, and directional state-colored patrol-light emission; gameplay LOS remains geometric.

## What RC Actually Does

RC is not a radial-gradient overlay. It propagates emitted light through a 2D occlusion field:

1. `sceneColor` contains the visible Canvas2D room and characters.
2. `occlusion` contains binary geometry: white open space, black blockers.
3. `emission` contains light energy, not visible lamp art.
4. `prepscene` creates the seed field.
5. JFA and SDF estimate distance from blockers.
6. Cascade passes propagate direct and indirect radiance.
7. The final pass composites radiance over `sceneColor`.

The lamp sprite and the flashlight telegraph are still drawn by `SceneManager`; their actual illumination comes from the emission plane.

## Intro Scene Plane Rules

### Scene Color

Draws:

- red brick walls and dark floor;
- sandbags and room props;
- oil-lamp fixture state;
- player and patrol silhouettes;
- flashlight cone telegraph;
- particles, impact feedback, and UI-independent scene effects.

The visible lamp sprite may remain after destruction as a broken prop, but it must not emit after invalidation.

### Occlusion

Every frame starts opaque white. Black blockers are then painted for:

- wall tiles (`#`);
- static cover (`X` / sandbags);
- lamp fixture;
- player capsule;
- living enemy capsule.

Entity blockers use stable geometric capsules instead of sprite alpha. This is intentional: low-resolution RC needs stable shapes, not noisy per-frame pixel silhouettes.

Particles, text, muzzle trails, and the flashlight telegraph do not block light.

### Emission

The live presenter accepts:

- oil-lamp and searchlight color/intensity from `RC_LIGHT_TABLE`;
- a subtle visual-only warm light centered on the player;
- subdued enemy body seeds and directional, state-colored sight-cone emission;
- a short visual-only warm melee flash;
- no emission from an invalidated authoritative light.

Authoritative scene lights are written last so visual-only effects cannot overwrite the stronger lamp or searchlight seeds.

This separation prevents decorative sprite pixels from accidentally becoming lighting physics.

## Dither Decision

Dither is disabled in the live intro renderer:

```ts
ditherEnabled: false
```

It remains available in the shared pipeline and standalone lab for comparison until a separate contract-wide deletion is approved. The distinction matters: the intro scene is clean now, but the repository has not yet removed every dither API, shader branch, and documentation reference.

## Gameplay Meaning

The simulation owns light-state timing. Rendering consumes the snapshot:

```text
lamp intact → lamp damaged → lamp dead
      → LIGHT_POOL_DOWN_S delay
      → invalidateLight
      → active light removed
```

The destruction-frame delay remains part of the gameplay contract. Renderer integration must not make the enemy vulnerable early merely because the fixture sprite changed.

## Level Design Lessons

### 1. Author blockers separately from art

A beautiful sprite does not automatically cast a useful RC shadow. Every cover object should declare whether it blocks RC. Prefer one stable blocker shape per gameplay object.

### 2. Make shadow pockets intentional

For each required enemy kill, author at least one reachable shadow pocket. Validate the pocket in the final light field, not by looking only at the emission disk.

### 3. Separate gameplay and decorative light

Gameplay lights affect exposure and enemy shielding. Decorative lights may affect appearance only. Do not let a decorative glow silently remove a required kill route.

### 4. Use light destruction as a readable state change

The lamp should communicate three states consistently:

- intact: warm pool and stable fixture;
- damaged: reduced/flickering pool and visibly cracked fixture;
- broken: no emission, broken fixture, and a readable room darkening.

### 5. Keep direct telegraphs and RC contribution distinct

The flashlight cone is a gameplay readability aid. The emission cone is the actual RC source. Both should agree in direction, but the Canvas telegraph should not substitute for RC.

## Debugging Checklist

When RC appears absent:

1. Inspect `window.__rcPipeline`.
2. Confirm `activeCascades > 0`, `jfaPasses > 0`, and the intended `resolutionScale`.
3. Confirm `lightCount` matches active authoritative snapshot lights.
4. Inspect `sceneSeed`, `sceneSdf`, and `radiance` separately.
5. Validate occlusion pixels are only opaque white or opaque black.
6. Validate emission alpha is opaque and RGB is non-zero near enabled lights.
7. Check that lamp invalidation changes both `activeLights` and emission.
8. Treat `degraded` as diagnostic state, not the sole validity gate: the maintained checks require active cascades/JFA, the expected no-dither profile, and zero console/page errors.

The classic integration failure was an invalid reusable `ImageData` occlusion plane. Resetting the full plane to opaque white before painting blockers fixed it.

## Historical Runtime Evidence (initial port)

The following capture records the first live-game port before the v3.7 tower-compound and performance migrations. It is retained as historical evidence, not as the current production profile:

```json
{
  "activeCascades": 1,
  "resolutionScale": 1,
  "ditherEnabled": false,
  "lastFrameTimeMs": 2.1,
  "lightCount": 1,
  "jfaPasses": 9,
  "degraded": false
}
```

Browser console at that milestone: zero errors and zero warnings. Capture: `intro-scene-live-rc-integrated.png`.

## Current Runtime Profile and Verification

The v3.7 production game uses three cascades, `baseRayCount = 4`, `baseIntervalPx = 6`, half-resolution JFA/RC working buffers, and a full-resolution scene upload/final composite. The final shader adds a sparse nine-tap, source-luma-weighted direct-emission halo so powered fixtures brighten their surroundings while bright source cores retain hue.

The isolated experiment remains available at `/rc-intro-copy/`. `npm run rc-lab:check` resolves cached Playwright through `npm exec --offline --yes --package=playwright`, verifies the standalone lab and production pipeline port at full verification resolution, then checks the showcase and intro-copy routes. The algorithm-verification adapter uses `baseIntervalPx = 1.5`, `resolutionScale = 1`, `ambientIntensity = 0.03`, and preserves each scene's requested cascade count.

## Current Limitations

- Shared dither code still exists outside the live intro configuration; production keeps it disabled.
- The enemy sight cone is a visual presentation input only. Gameplay perception remains geometric and must not depend on RC pixels.
- Visual-only player and melee emission must remain weaker than authoritative scene lights.
- Performance remains governed by the browser gate: average frame interval `< 35 ms`, p95 `<= 50.01 ms`, and latest RC pass `< 50 ms` under SwiftShader.

## 2026-08-10 Lighting Revision

Visual review exposed three failures in the first production port: a saturated white flashlight wedge, sprite-like ghost trails, and RC contribution that overwhelmed the base scene.

Root causes and corrections:

- Historical note: the copied workbench's broad white flashlight cone was unsuitable for the former one-cascade prototype. The v3.7 production profile now uses three cascades and feeds a deliberately subdued, state-colored sight-cone emission into RC; gameplay perception remains geometric and independent of those pixels.
- Dynamic character blocker capsules produced unstable low-resolution silhouettes. They were removed from production; static walls remain the reliable RC blockers. Entity-shadow work must return only with a temporal-stability test.
- Final composition previously darkened the entire base and added radiance at full gain. It now preserves the base scene and adds a restrained radiance contribution.
- Scene and radiance sampling used inconsistent half-texel/atlas coordinates. Final composition now uses exact base texels and an explicit bottom-aligned atlas offset.
- ImageData upload orientation was corrected so Canvas top rows map consistently to GL fragment coordinates.
- Production light scale changed from `1.8` to `1.15`; ambient changed from `0.04` to `0.008`; lamp emission size and RGB energy were reduced.

Regression evidence: `intro-lighting-bad-repro.png` captures the original white wedge; `intro-lighting-final-no-ghosting.png` captures the revised restrained result. Typecheck and production build pass, and the browser reports zero runtime errors.

## Promotion Rule

Any future renderer change should first be proven in `/rc-intro-copy/`, then ported into `RcPresenter`, then verified in the live intro scene. Do not make the experiment route the production renderer by accident.
