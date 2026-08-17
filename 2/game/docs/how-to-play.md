# Alien Invader (zustand) — How to Play

> The same invasion as `1/`, rebuilt as an engine experiment on Three.js +
> zustand. You are the invader; Earth is the target — and it fights back.

## Quick start

```bash
npm install
npm run dev      # open the printed localhost URL
```

The game opens on a **title + upgrade menu**: pick a seed (or roll a new one),
buy Alienium upgrades (Nanite Swarm, EMP Pulse, Doomsday Ray, Loadout Slot,
Chassis Upgrade), then press **Start Invasion**.

## Controls

| Input | Action |
|---|---|
| `W` / `S` / `↑` / `↓` | Yaw / pitch the ship |
| `A` / `D` / `←` / `→` | Strafe |
| `R` | Fire |
| `1` / `2` / `3` | Cycle weapons |
| Mouse | Aim (in-combat view) |

## How a run works

Seven escalating days against an adaptive counter-engine that reads your habits
and telegraphs its answer. Keep the core loop: real-time weapon phase, then the
choice between annihilation and infiltration.

*Design: `../GDD.md` · contract: `../TDD.md`.*
