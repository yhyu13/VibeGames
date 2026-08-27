# Intro scene plan — one block, 90s

Canonical SoT for polish. 12 sections.

## 1. One line + why

EYE-13: prove “I am a satellite, and the click is the answer” in 90 seconds.

## 2. Range (frozen)

Ship = this courtyard. Data-frozen = extra beats / police car / 2P / LLM. M2+ = city / globe / JTAC.

## 3. Scene spec

20×20 m. Origin at courtyard center. +X east, +Z south. VIP path crosses the north canopy (lock-break teaching) twice before the GO window.

## 4. Art assets (tier)

- T1 MUST: orbit limb+cloud, courtyard wings, canopy, 5 heat blobs, 2 alley markers, HUD heat/lock/radio, end card.
- T2 juice: scanlines, lock pip, TX chirp, overheat drop.
- T3: star field, cloud drift.
- T4: more radio log chrome.

## 5. Implementation (done as v0.1)

P0 orbit shell · P1 courtyard tile · P2 SAR heat + lock · P3 7-beat radio · P4 shot/end · P5 HUD · P6 audio · P7 playtest.

## 6. Verification gates

`tsc --noEmit` · `vite build` · 30s playtest · 0 console errors · DEV `__sim` readable.

## 7. “完美”

See GDD §8. Stop only when the user says stop.

## 8. Known conflicts

None open. Optical-not-clickable vs “find the thing” is resolved: SAR-on is required to tag.

## 9. Order

Orbit wow (0–10s) → lock (18s) → radio (22–80s) → shot.

## 10. Polish loop

Observe 90s → note visual/feel/perf → change one number or one mesh → replay.

## 11. Files

`src/core/data/courtyard.ts` is the layout+script SoT. Docs live next to GDD/TDD.

## 12. Status

v0.1 implemented. Polish infinite until user says stop.
