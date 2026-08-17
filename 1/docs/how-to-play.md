# Alien Invader — How to Play

> You are the invader. An alien warship hangs in orbit over a stylized Earth, and
> the planet is not a passive health bar — it hardens infrastructure, fills orbit
> with hazards, and eventually fires nuclear missiles straight up your hull.

## Quick start

```bash
npm install
npm run dev      # open the printed localhost URL
```

The game boots straight into Phase 1 of a run. Earth's conditions, resistances,
and defense archetypes are randomized every run — no two invasions are the same.

## Controls

| Input | Action |
|---|---|
| `Z` / `Space` / left-click | Fire primary weapon |
| `X` / right-click | Cycle weapons / intercept missile |
| `A` / `D` / `←` / `→` | Move along orbit |
| `W` / `S` / `↑` / `↓` | Switch orbital lane |
| `M` | Strategic map (DOM overlay) |
| `Esc` | Intercept incoming missile |

## How a run works

1. **Bombard** — a real-time combat phase against Earth's defense grid; three
   weapon types (Plasma / Kinetic / Electric) with resistance/weakness math.
2. **Counter-intelligence** — between bombardments, broadcast **propaganda** to
   turn humanity against itself and inject **computer viruses** to cripple
   Earth's networks (Power Grid, Defense Grid, Missile Command, Media Net,
   Orbital Control).
3. **Survive the counterattack** — Earth escalates each day: missiles, fighters,
   and space stations. Track `INSTABILITY` on the HUD — burdens drive visible
   instability FX (chromatic aberration, halftone, grain).
4. **Win** — four victory paths: **Annihilation** (destroy all key targets),
   **Digital Dominion** (win the network war), **Submission** (break resolve
   via propaganda), or **Fracture** (rogue mutations stacking against Earth).

The most elegant invasions are **puzzle-solved, not brute-forced** — sometimes
the winning move is a weapon that is never fired.

## Meta

- Runs persist to IndexedDB — `M` map and save/load round-trip are wired.
- After a run, unlock weapons/mutations that make you stronger while handing
  Earth a new way to hurt you.

*Full design: `GDD.md` · frozen contract: `TDD.md`.*
