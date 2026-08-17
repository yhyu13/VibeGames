# Patapong 3D — How to Play

> You are the divine drummer. W/A/S/D are PATA / PON / DON / CHAKA — tap any
> drum on the beat, string four beats into a command grammar, and your three
> tiny voxel Patapons march, attack, defend, and rally against Moloch.

## Quick start

```bash
npm install
npm run dev      # open http://localhost:5183
```

## Current build: the awakening ritual (intro showcase)

The active build is an intro-only dense-voxel PBR showcase:

1. **CLICK TO START** → title.
2. Tap any drum on the beat (**timing-only** judgement, ±60/120/200 ms) for
   **4 successful beats** — the army awakens, Moloch roars back.
3. Enter the ATTACK command `W A W A` to make the three minions dance and fire
   a ballistic arrow into Moloch: it opens a persistent dark crater with pooled
   physical voxel debris and a warm impact light.
4. `R` / **PLAY AGAIN** restores the cached stage.

## Drum commands (battle design, currently dormant)

| Sequence | Command | Effect |
|---|---|---|
| P-P-P-PON | MARCH | advance toward the boss |
| P-O-P-O | ATTACK | standard attack |
| O-O-P-P | DEFEND | halve next boss damage |
| P-P-P-CHAKA | CHARGE | heavy attack |
| O-O-O-O | RALLY | heal the army |
| C-C-P-P | VOLLEY | ranged barrage |
| O-O-C-C | RETREAT | dodge next attack |
| P-P-O-O | BERSERK | double damage 2 turns |
| O-P-O-C | HEAVY | slow smash |
| C-D-P-O | MIRACLE | instant Fever |

## The battle loop (when battle ships)

- 3-unit army (5 HP each) vs **Moloch** (24 HP): SWIPE / SLAM / FIREBALL,
  enrage below 12 HP. First to 0 HP loses.
- Combo 8/16/24 = **Fever** (slow-mo + 1.5× damage).

*Design: `GDD.md` · frozen contract: `TDD.md` · art: `docs/design/`.*
