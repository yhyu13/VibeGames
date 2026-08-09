# Patapong 3D - Game Design Document (GDD) v2.0

> **Pitch**: a drum-driven god game. You are the divine drummer commanding an
> army of small Patapons against one big boss monster (Moloch). 4 drums
> (W/A/S/D = PATA/PON/DON/CHAKA); every 4 successful beats resolve a command.
>
> **Status**: v2.0 (real Patapon DNA: combos + army + boss). Supersedes v1.0
> (1v1 rhythm fighter) and v0.1 (Pong clone).
>
> **Design authority**: this file. Numeric authority: TDD 4.4. Implementation
> source of truth: `src/core/types.ts` + `src/core/constants.ts`.

## 1. What the player actually is

The player is **NOT a Patapon**. The player is a god/drummer standing behind
the army. The army (3 Patapons) marches, attacks, defends, and rallies based
on 4-beat drum commands the player taps on the beat.

This is the Patapon DNA that v1.0 punted:

| Patapon element | v2.0 |
|---|---|
| 4 drum names as input vocabulary | ✅ W/A/S/D |
| 4-beat command grammar (8+ commands) | ✅ 10 commands |
| Army of small units commanded by rhythm | ✅ 3 voxel Patapons |
| One big asymmetric boss | ✅ Moloch (24 HP, 3 attacks, enrage) |
| March / attack / defend commands | ✅ MARCH / ATTACK / DEFEND |
| Side-scrolling levels / waves | ❌ (arena MVP) |
| Class evolution / progression | ❌ (stretch) |

## 2. Core loop

```
Menu → PLAY → Song (drum chart) → command (4 beats) → army acts + boss attacks
      → Song continues → Moloch HP 0 = VICTORY | army wiped = DEFEAT
```

1. Beats scroll toward the hit zone. Any drum tapped inside the +/-200ms
   window counts (timing-only judgement; the lane glyph is decorative).
2. Perfect / good / normal quality affect command power (1.0 / 0.7 / 0.4).
3. The 4th successful beat resolves the sequence:
   - known sequence -> command effect;
   - unknown sequence -> failed command (no effect, bar resets).
4. A miss (out-of-window tap or beat expiry) resets the combo and the bar.
5. After every command the boss's telegraphed attack lands (DEFEND halves it,
   RETREAT dodges it), then a new telegraph starts. The boss also attacks on
   its own if the player stalls 6s.
6. Combo 8/16/24 triggers Fever (slow-mo + 1.5x damage for 3s).

## 3. Commands (frozen table, `src/core/data/commands.ts`)

| Sequence | Command | Effect |
|---|---|---|
| PATA PATA PATA PON | **MARCH** | army advances 0.8u toward the boss (closer = more melee damage) |
| PATA PON PATA PON | **ATTACK** | 2.0 x quality damage |
| PON PON PATA PATA | **DEFEND** | next boss attack deals 50% damage |
| PATA PATA PATA CHAKA | **CHARGE** | 4.0 x quality damage |
| PON PON PON PON | **RALLY** | heal every living unit +3 HP |
| CHAKA CHAKA PATA PATA | **VOLLEY** | 1.5 x damage, no proximity bonus |
| PON PON CHAKA CHAKA | **RETREAT** | fall back 0.8u, dodge the next attack |
| PATA PATA PON PON | **BERSERK** | attack damage x2 for 2 boss turns |
| PON PATA PON CHAKA | **HEAVY** | 3.0 x quality damage |
| CHAKA DON PATA PON | **MIRACLE** | instant Fever |

Quality = average of the 4 beat judgments (1.0/0.7/0.4). Damage commands are
scaled by Fever (x1.5), BERSERK (x2), and proximity (up to +50% when the army
has marched next to the boss). VOLLEY ignores proximity.

## 4. Army

- 3 units, 5 HP each (15 total army HP).
- Units are small voxel Patapons (emerald / lime / teal).
- MARCH/RETREAT move the formation (x from -5 to +4.5); unit world positions
  are derived from the formation offset (kept in the snapshot for rendering).
- A unit at 0 HP is defeated; all defeated = DEFEAT.

## 5. Boss: Moloch

- One large voxel monster, 24 HP, enrages below 12 HP (x1.5 damage, faster
  telegraph, glow).
- Attacks: SWIPE (1 to all units), SLAM (1 to all units), FIREBALL (2 to one
  random unit). Seeded RNG.
- Turn model: the boss telegraphs during the player's command window; the
  attack lands when the next command resolves (so DEFEND/RETREAT can react).
  If the player stalls 6s, the attack fires anyway.

## 6. Feel / juice

- Every drum hit: drum SFX + particle burst at the hit zone.
- Command resolve: rising chord + boss-hit thump/particles for damage commands.
- Boss telegraph: roar + shake + red particles. Boss attack: thump + shake.
- Fever: slow-mo (visuals only; audio stays on the Web Audio clock) + cheer.
- Squash on hits/misses, camera shake, VICTORY/DEFEAT screen with stats.

### 6.1 Active intro showcase

The shipped build is intro-only. A warm, fully 3D dense surface-voxel 2.5D
stage presents three fixed-X Patapons against giant Moloch. The UI lists all
ten commands and teaches W/A/S/D. The player performs ATTACK (`W A W A`) on a
restrained one-second white edge pulse. Every correct tap makes the formation
hop, dance, and squash. Tap four releases a ballistic arrow; impact permanently
opens a dark body crater, throws 20-64 pooled physical voxel fragments, and
adds only a localized warm light. The title resolves over the crater and the
shot can be replayed with R or PLAY AGAIN.

## 7. Scope cuts (still true for the jam)

- No side-scrolling levels, no waves, no classes/evolution, no 2P.
- No real songs (charts are procedural beats; SFX are synthesized).
- No save games beyond localStorage stats.

## Changelog

| Version | Date | Change |
|---|---|---|
| v0.1 | 2026-08-07 | Pong clone (abandoned) |
| v1.0 | 2026-08-09 | 4-key 1v1 rhythm fighter (shallow "Patapon-style") |
| **v2.0** | **2026-08-09** | **Real Patapon DNA: divine drummer + 4-beat command grammar (10 commands) + 3-unit army vs one boss (Moloch) with telegraph/defend/retreat/enrage. Timing-only drum judgement.** |
| v2.0.1 | 2026-08-09 | Intro scene: awakening ritual (darkness -> 4-beat awaken -> Moloch roar -> menu) |
| v2.1 | 2026-08-09 | Replaced awakening runtime with approved dense-voxel ATTACK/crater physics intro. |
