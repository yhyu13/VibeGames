# verification-report — 13_spysatellite

v0.1 first playable + core tests (2026-08-27).

| Gate | Result |
|------|--------|
| `npm run typecheck` | pass (`tsc --noEmit`, 0 errors) |
| `npm test` | pass — 20/20 in `src/core/simulation/GameSim.test.ts` |
| `npm run build` | pass (`tsc --noEmit && vite build`, ~2s; three chunk ~732 kB gzip ~199 kB) |
| DEV hooks | `__sim` / `__holdSar` / `__zoomTo` / `__lock` / `__beat` / `__click` / `__end` / `__manifest` wired |
| 30s playtest | boot card + orbit limb + courtyard lock-band HUD live on `:5191`. SAR overheat path observed in-browser (heat 100% → 2.5s drop). Console: 0 errors on 5191 (do not mix with 5190 neuraltexture WebGPU logs). |

## Bugs caught by tests (not by screenshots)

1. Overheat left `heat = 1` → next held frame immediately re-tripped. Fixed: `heat = 0` on trip (`sensor.ts`).
2. `__sar(true)` wrote `sensor.sarOn`; `stepHeat(sarHeld)` cleared it next tick. Fixed: `InputManager.forceSar` + `__holdSar`.
3. Advancing wall-clock to beat 4 without answering 1–3 aborts at 2 fails. Tests now seed prior results.

## Still polish (not blockers)

- Courtyard optical blobs were too small at nadir; radii bumped, additive blend on SAR-on.
- Orbit camera must sit outside the limb (`(0, 72, 410)`), not 50 m UAV height.
- Cloud is a sphere around the limb, not a 20 m plane.
