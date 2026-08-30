# Intro Scene RC Integration Report

**Date:** 2026-08-10  
**Scene:** `m1_intro_scene`  
**Result:** RC active in the default game render path

## What Was Broken

The game already created `RcPresenter` and called it after every Canvas2D scene render, but RC disabled itself on the first mission frame:

```text
[RcPresenter] RC disabled: RC occlusion plane is not binary opaque
```

`ImageData` starts with every byte at zero. `RcPresenter` initialized the occlusion image only when the room topology changed. During development/HMR and cached-frame paths, validation could observe transparent or stale pixels. RC requires every occlusion pixel to be exactly opaque white (open) or opaque black (blocker).

## Fix

`RcPresenter.buildPlanes()` now resets the complete occlusion plane to opaque white before drawing the room's black wall blockers. This guarantees the RC input contract on every frame:

```text
open space = (255, 255, 255, 255)
wall       = (0, 0, 0, 255)
```

The topology cache still identifies room changes, but correctness no longer depends on stale `ImageData` contents.

An unrelated pre-existing TypeScript failure in `HUD.tsx` was also removed: the unused `lampsDestroyed` selector prevented both typecheck and build.

## Default Game Data Flow

```text
Simulation snapshot
  -> SceneManager renders the 480x432 Canvas2D scene
  -> RcPresenter reads sceneColor
  -> RcPresenter builds binary occlusion and lamp emission
  -> RcPipeline runs prepscene, JFA, SDF, cascade, and final
  -> RC canvas is presented above the hidden Canvas2D source
```

If WebGL2, the context, or a frame contract fails, `RcPresenter` reveals the Canvas2D source and reports degraded state instead of leaving a black frame.

## Historical Runtime Evidence (initial port)

Captured from the default game at `http://127.0.0.1:5184/` after pressing **Start Game**. This records the first one-cascade/full-resolution port and is not the current v3.7 production profile:

```json
{
  "activeCascades": 1,
  "resolutionScale": 1,
  "lastFrameTimeMs": 3.6,
  "lightCount": 1,
  "jfaPasses": 9,
  "propagationRate": 0.85,
  "mixFactor": 0.5,
  "lightScale": 2.1,
  "ambientIntensity": 0.012,
  "eps": 0.011764705882352941,
  "twoLoop": true,
  "degraded": false
}
```

Browser console result: zero errors and zero warnings.

Debug frame: `intro-scene-rc-active-debug.png`.

## Historical Verification

At the initial-port milestone:

- `npm run typecheck`: PASS
- `npm run build`: PASS
- Default intro scene: RC active with one authoritative light, one cascade, and nine JFA passes
- Browser console: PASS, zero errors/warnings
- `npm run rc-lab:check`: BLOCKED at that time by a missing directly imported local `playwright` package

## Current Status (2026-08-10)

The v3.7 tower-compound production profile now uses three cascades, four base rays, a six-pixel base interval, two-loop mode, and half-resolution JFA/RC working buffers while preserving full-resolution scene upload and final output. Dither is disabled in production. Emission includes visual-only player, enemy, sight-cone, and melee contributions; authoritative oil-lamp/searchlight seeds are written last. The final composite uses a sparse nine-tap, source-luma-weighted direct-emission halo.

Portable browser validation no longer depends on a hardcoded local package path. `npm run rc-lab:check` resolves cached Playwright through `npm exec --offline --yes --package=playwright`, runs the standalone RC Lab and the production `RcPipeline` adapter through 35 checks, then verifies the Showcase and Intro Copy routes. The adapter intentionally uses a full-resolution algorithm-verification profile (`baseIntervalPx = 1.5`, `resolutionScale = 1`, `ambientIntensity = 0.03`) without forcing cascade count across comparison variants.

The maintained gameplay suite requires the powered-lamp sample to exceed the broken-lamp sample by more than four luminance units at identical player placement. It also enforces average frame interval `< 35 ms`, p95 `<= 50.01 ms`, and latest RC pass `< 50 ms` under SwiftShader.

## Historical Follow-up (resolved for production)

At the initial-port milestone, dither remained enabled in the game adapter and its repository-wide removal was deferred. The shared option and shader branch still exist for lab compatibility, but the production intro configuration now explicitly sets `ditherEnabled: false`; do not infer that the API itself was deleted.
