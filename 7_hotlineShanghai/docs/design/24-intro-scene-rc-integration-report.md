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

## Runtime Evidence

Captured from the default game at `http://127.0.0.1:5184/` after pressing **Start Game**:

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

## Verification

- `npm run typecheck`: PASS
- `npm run build`: PASS
- Default intro scene: RC state active, one light, one cascade, nine JFA passes
- Browser console: PASS, zero errors/warnings
- `npm run rc-lab:check`: BLOCKED by missing local `playwright` package; this is a test-runner dependency issue, not an RC assertion failure

## Known Follow-up

Dither remains enabled in the current game adapter (`RcPresenter`) even though the requested target is no dither. Removing dither is a separate contract-wide change because the option exists in `RcPipeline`, lab/showcase controls, store, DEV hooks, shaders, TDD, and visual documentation. Do not report dither removal as complete until all those surfaces and regression screenshots are updated together.
