# 13_spysatellite — Project AGENTS.md

> Project-level rules. Root `../AGENTS.md` is the umbrella. Design frozen 2026-08-26 (brainstorm §1–§3).

## 1. One-liner

**EYE-13** — you are a night SAR satellite. Zoom from orbit, hold-pierce cloud, click-lock a VIP, and click what the kill team asks about until they take the shot. You never pull a trigger.

## 2. Scope

- **Ship:** 1 courtyard · 1 VIP · 1 weather (hold SAR) · 1 assassination · 7 scripted radio beats · dual-scale orbit lerp · night SAR/IR · 90s · instant restart.
- **Data-frozen:** extra beats / 2nd VIP path / walking police car / co-op radio / LLM paraphrase.
- **M2+ (not modeled):** city / multiple blocks / live LLM / continuous globe / player pulls the trigger (JTAC).

## 3. Stack + commands

Vite 6 + React 19 + TypeScript strict + zustand 5 + three **0.185.0** + WebGL2 + Web Audio. Zero runtime assets. Dev server port **5191** (strictPort; 5190 taken by 14_neuraltexture).

```bash
npm install          # first time (node_modules NOT committed)
npm run dev          # :5191
npm run typecheck    # tsc --noEmit
npm test             # vitest run (core step() seam)
npm run build        # tsc --noEmit && vite build
```

Gates: typecheck + `npm test` + build + browser playtest (30s). DEV: `window.__sim` / `__sar` / `__holdSar` / `__zoomTo` / `__lock` / `__beat` / `__end` / `__manifest`.

## 4. Architecture (C.A.T)

- **C** `src/core/` platform-pure. Zero three/react/zustand/DOM. Core never knows orbit, FOV, or clouds. `zoom01` is a 0..1 input that only gates “are we on the tile?”.
- **A** `src/engine/` owns the lie that you are 412 km up: OrbitShell (sky/limb/cloud, no picking), CourtyardTile (20×20 m SAR swap, heat blobs, all picking), CameraRig (zoom lerp only), Input, Audio, React HUD.
- **T** courtyard layout + 7-beat script live in `src/core/data/courtyard.ts`. DEV `__manifest()` dumps live state as text.

Click identity is an `entityId` from engine raycast → core `step(TickInput.clickId)`. Core decides if that id answers the live beat.

## 5. Frozen numbers (playtest may retune percents, not the shape)

- SAR heat +18%/s, −12%/s, 100% → heat resets to 0, 2.5s drop + lock lost.
- Lock: click VIP while SAR-on. Lost if canopy ≥0.4s · SAR off ≥0.6s · overheat · zoomed out past `COURTYARD_ZOOM` 0.72.
- Shot at 80s requires lock held for last 2s + beat 7 GO.
- 2 failed beats = abort. Wrong click / timeout / overheat during a live beat = fail that beat.

## 6. Forbidden

No LLM. No network. No planet mesh. No orbit picking. No you-pull-the-trigger. Optical silhouettes are not clickable.
