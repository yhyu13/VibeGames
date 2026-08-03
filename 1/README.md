# Alien Invader

Implementation of the GDD + TDD at `../1/GDD.md` and `../1/TDD.md`.

## Stack

- TypeScript 5 (strict) + Vite 5
- Three.js r170+ (orthographic 2.5D, PBR via `MeshPhysicalMaterial`)
- `@preact/signals-core` for reactivity
- `idb` for IndexedDB persistence
- WebAudio native for audio
- Vitest (unit) + Playwright (E2E ready)

## Architecture (matches TDD §1)

> Pure state + signals + orthographic PBR + procedural shaders + custom kinematic math + WebAudio + IndexedDB.

- **State layer** (`src/state/**`) — pure, signal-backed, no Three.js imports.
- **Render layer** (`src/render/**`) — observes signals, no game logic.
- **Audio** (`src/audio/**`) — WebAudio graph + procedural SFX.
- **Input** (`src/input/**`) — keyboard + mouse, signal-backed actions.

## Commands

```bash
npm install          # install deps
npm run dev          # Vite dev server with HMR (including shaders)
npm run build        # production build (typecheck + bundle)
npm run typecheck    # tsc --noEmit
npm run test:unit    # Vitest
npm run test:e2e     # Playwright (requires browsers installed)
```

## Controls

| Key | Action |
|---|---|
| `Z` / `Space` / left-click | Fire |
| `X` / right-click | Cycle weapons / intercept missile |
| `A` / `D` / `←` / `→` | Move along orbit |
| `W` / `S` / `↑` / `↓` | Switch orbital lane |
| `M` | Strategic map |
| `Esc` | Intercept incoming missile |

## MVP Status

The 13 prototype milestones from TDD §21 are wired end-to-end:

- ✅ Boot + Three.js orthographic scene + signal-backed state
- ✅ Fixed 60 Hz loop with render interpolation
- ✅ Plasma / Kinetic / Electric weapons with resistance/weakness math
- ✅ Stylized Earth + 8 randomized regions from 12 hand-crafted defs
- ✅ 6+ planet conditions wired into damage and visuals
- ✅ Defenses + targeting HUD + nuclear missile telegraph
- ✅ 12 adaptations + 8 burdens with Instability tier evaluation
- ✅ Computer Virus + Propaganda puzzle implementations
- ✅ Annihilation + Digital Dominion + Submission + Fracture victory paths
- ✅ Adaptive counter engine (player behavior → counter selection → telegraph)
- ✅ IndexedDB save / load round-trip
- ✅ Burdens drive visible instability FX (chromatic aberration, halftone, grain)
- ✅ WebAudio SFX (fire, hit, explosion, missile launch)
- ✅ Strategic map (DOM overlay, M to toggle)

## Verified

```
npm run typecheck   # passes
npm run test:unit   # 25/25 tests pass
npm run build       # 62 modules, ~565 KB minified
```