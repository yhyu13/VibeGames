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

That result is now ported into the live intro scene. The default game still uses the production profile of one cascade and two-loop mode, but it now runs with dither disabled and includes entity blockers plus a directional patrol-light emission.

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

The live presenter now accepts:

- oil-lamp color and intensity from `RC_LIGHT_TABLE`;
- directional enemy flashlight cone from enemy position and facing angle;
- no emission from an invalidated lamp.

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
2. Confirm `activeCascades > 0` and `degraded === false`.
3. Confirm `lightCount` matches active snapshot lights.
4. Inspect `sceneSeed`, `sceneSdf`, and `radiance` separately.
5. Validate occlusion pixels are only opaque white or opaque black.
6. Validate emission alpha is opaque and RGB is non-zero near enabled lights.
7. Check that lamp invalidation changes both `activeLights` and emission.

The classic integration failure was an invalid reusable `ImageData` occlusion plane. Resetting the full plane to opaque white before painting blockers fixed it.

## Runtime Evidence

The live game was verified at `http://127.0.0.1:5184/` after starting the intro mission:

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

Browser console: zero errors and zero warnings. Capture: `intro-scene-live-rc-integrated.png`.

The isolated experiment remains available at `/rc-intro-copy/` for visual iteration and comparison.

## Current Limitations

- The default production profile remains one cascade for budget compliance.
- Shared dither code still exists outside the live intro configuration.
- The live presenter currently uses a fixed enemy position from the snapshot and its facing angle for the flashlight cone; future patrol-light tuning should add explicit light angle/arc data to the light contract.
- `npm run rc-lab:check` and `npm run rc-intro-copy:check` require the local Playwright package, which is not currently resolvable in this checkout.

## Promotion Rule

Any future renderer change should first be proven in `/rc-intro-copy/`, then ported into `RcPresenter`, then verified in the live intro scene. Do not make the experiment route the production renderer by accident.
