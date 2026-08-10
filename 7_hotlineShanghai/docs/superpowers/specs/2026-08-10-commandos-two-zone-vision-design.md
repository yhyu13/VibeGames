# Commandos-Style Two-Zone Vision

## Goal

Add readable stealth perception to the single intro scene: far fast movement creates suspicion (`?`), near exposure guarantees detection (`!`), and far slow movement remains hidden.

## Rules

- Gameplay sight uses the existing deterministic patrol cone, expanded from 5 to 8 world units for this feature. RC is never queried by core perception. Lamp state remains a separate combat shield/light rule; this two-zone feature intentionally makes sight readable rather than making rendered RC authoritative.
- Near zone: 0–2.5 world units. Any player position inside the patrol cone is discoverable, regardless of walk/sprint state or player facing. Icon latency is one simulation tick; the existing death telegraph remains 0.55 seconds.
- Far zone: 2.5–8 world units. Only sprinting (`Shift + WASD`) inside the patrol sight cone creates suspicion. Far walking and standing are hidden.
- Far slow movement and standing do not create suspicion.
- Suspicion pauses patrol, stores the last fast movement position, rotates toward that residual, and shows `?` for a 1-second suspicion episode. Sprinting while still in the far cone refreshes the episode; stopping, leaving the cone, or moving slowly lets it decay and return to patrol after 1 second. Entering near range during suspicion immediately promotes to alert.
- Near exposure creates alert, rotates toward the player, shows `!` on the next simulation tick, and uses the existing 0.55-second death telegraph. Far sprint suspicion never directly kills; it only promotes to alert if the player enters near range or remains sprinting in the far cone for 1.5 seconds.
- Lamp blocking/dark assassination and exit completion remain unchanged.

## Implementation

- `PlayerInput.move` gains required `speedMode: 'walk' | 'sprint'`; InputManager maps Shift to sprint on every fixed-timestep movement update. Existing callers/tests must pass `walk` explicitly.
- Core owns classification, suspicion memory, residual position, and alert transitions.
- Enemy state remains the existing `patrol | suspicious | alert | engaging` union.
- Snapshot exposes per-enemy `awareness: 'none' | 'suspicious' | 'detected'` and nullable `lastSuspiciousPosition`; the field is core gameplay telemetry, not RC output. `lastSuspiciousPosition` is cleared when returning to patrol, retained during suspicion, and replaced by the player position on alert.
- RC remains presentation-only.

## Acceptance

- Far walk for 5 seconds: no suspicion or detection event.
- Far sprint through the cone: `?` within 0.3 seconds; enemy facing converges toward the last sprint position; `?` expires after 1 second.
- Near walk or sprint: `!` on the next fixed tick (≤16.7ms at 60Hz) and death after 0.55 seconds while exposed.
- Far sprint continuously exposed for 1.5 seconds: promotes from `?` to `!` and starts the same 0.55-second telegraph.
- Boundary cases at 2.5 and 8 units are deterministic.
- Existing light break, dark kill, exit, retry, typecheck, build, and browser tests remain green.

## Visual correction record

The first implementation review exposed four presentation defects. The RC upload now flips all Canvas ImageData planes into WebGL orientation; the final shader preserves 58–100% of base color with ambient 0.04; patrol source rows are remapped from their actual `S,SE,E,NE,N,NW,W,SW` order; and the sight cone draws a pale 8u far wedge plus a denser amber 2.5u near wedge. These are required parts of the feature, not optional polish.
