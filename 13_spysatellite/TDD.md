# EYE-13 — TDD (frozen contract v0.1)

## 1. Stack

Vite 6 · TS strict · React 19 · zustand 5 · three 0.185 · WebGL2 · Web Audio recipes · zero runtime assets · port **5191** (strictPort; 5190 taken by 14_neuraltexture).

Gates: `tsc --noEmit` · `npm test` (vitest, `src/core/simulation/GameSim.test.ts`) · `vite build` · 30s browser playtest.

## 2. C.A.T split

| Layer | Owns | Must not |
|-------|------|----------|
| `src/core/` | 20 m courtyard sim, heat, lock, radio, scripted paths | import three/react/zustand/DOM; know FOV/orbit/clouds |
| `src/engine/` | OrbitShell, CourtyardTile, CameraRig, Input, Audio | decide win/lose or beat pass |
| `src/store.ts` + `components/` | HUD / RadioLog / EndCard / Pause | simulate |

`zoom01` is a 0..1 input. `COURTYARD_ZOOM = 0.72` gates picking + lock.

Click: engine raycast → `TickInput.clickId` → core `step()`.

## 3. Types (signatures)

See `src/core/types.ts`. Load-bearing:

- `EntityId` = vip / guard_w1 / guard_w2 / van / kt / canopy / east_alley / west_alley
- `TickInput` = `{ zoom01, sarHeld, clickId }`
- `step(s, input, dt): SimEvent[]`
- `SimEvent` = sound | beatStart/Pass/Fail | lockAcquire/Drop | overheat | shot | end

## 4. Numeric tables

| Name | Value |
|------|-------|
| FIXED_DT | 1/60 |
| MISSION_TIME | 90 s |
| SHOT_TIME | 80 s |
| LOCK_SHOT_HOLD | 2 s |
| FAILS_TO_ABORT | 2 |
| COURTYARD_SIZE | 20 m |
| COURTYARD_ZOOM | 0.72 |
| SAR_HEAT_RISE | +18 %/s |
| SAR_HEAT_COOL | −12 %/s |
| SAR_OVERHEAT_DROP | 2.5 s (heat resets to 0 on trip; otherwise the next held frame re-blinds) |
| LOCK_CANOPY_DROP | 0.4 s |
| LOCK_SAR_OFF_DROP | 0.6 s |

### Radio deck

| # | t | click | TX | window |
|---|---|-------|----|--------|
| 1 | 22 | vip | VISUAL | 8 |
| 2 | 32 | a west guard | 2 GDS | 8 |
| 3 | 42 | van | IDLE | 8 |
| 4 | 52 | east_alley | CLEAR / LATE | 8 |
| 5 | 62 | canopy | COVER | 8 |
| 6 | 70 | west_alley | LOS OK | 6 |
| 7 | 78 | vip (lock must already hold) | GO | 4 |

Beat 4: no police car in v0. Clicking van/guards is wrong. Timeout = LATE.

## 5. Fail rules

- Wrong entity during a beat = FAIL that beat.
- Timeout with no click = FAIL.
- Overheat during a live beat = FAIL (forced 2.5s blind).
- 2 fails = abort (VIP walks, no shot).
- Beat 7 fail OR lock not held ≥2s at 80.0s = miss.

## 6. DEV hooks

`window.__sim` · `__sar(on)` / `__holdSar(on)` · `__zoomTo(v)` · `__lock()` · `__beat(n)` · `__click(id)` · `__end` · `__manifest()` · `__beginPlay()` · `__perf`

`__sar` must go through `InputManager.forceSar`. Writing `sensor.sarOn` is overwritten by `stepHeat(sarHeld)` on the next tick.

## 7. File map

Matches Design §3: `core/types|constants|data|simulation` + `engine/OrbitShell|CourtyardTile|CameraRig|InputManager|AudioManager|devtools` + `store` + `components/{HUD,RadioLog,EndCard,Pause}`.
