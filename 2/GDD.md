# ALIEN INVADER — Game Design Document

**Status:** Draft v0.1
**Genre:** Sci-fi Roguelike / Action-Puzzle Hybrid
**Platform:** PC (keyboard + mouse)
**Session Length:** 20–40 min per run

---

## 1. Elevator Pitch

You are the **Alien Invader**. Your warship has one objective: **destroy planet Earth**. Earth is not defenseless — it builds orbital defenses, lays obstacle fields, and eventually fires nuclear missiles straight at your ship. Every invasion is a fresh roguelike run: Earth's conditions, resistances, and defense archetypes are randomized, so no two invasions play the same.

But destruction is not the only tool in your arsenal. Between bombing runs you deploy **propaganda** to turn humanity against itself and inject **computer viruses** to cripple Earth's networks from within. The most elegant invasions are **puzzle-solved**, not brute-forced. Sometimes the winning move is a weapon that is never fired.

---

## 2. Design Pillars

1. **Earned Power Fantasy** — Weapons and ship systems are upgraded both in-run and between runs; every power spike is answered by Earth escalating.
2. **Roguelike Replayability** — Randomized Earth conditions, mutation offers, and defense archetypes make every run a fresh puzzle.
3. **Brains over Brute Force** — Non-destructive win paths (propaganda, computer virus, infiltration) are always viable and often optimal, rewarding intelligence with bonus meta-currency.
4. **Power Has a Price** — Every rogue mutation you stack makes you stronger but hands Earth a new way to hurt you. No pure upside.
5. **Escalating Tension** — Earth's military-industrial complex gets smarter, faster, and meaner the longer the invasion drags on.

---

## 3. Core Loop

```
Run Start
  ├─ Scan Earth → read Condition Profile (before loadout)
  ├─ Choose Invasion Package (loadout + starting mutation)
  ├─ Day 1–7: each day pick 1 Major + 1 Minor action
  │    ├─ Major: Weapon Assault / Propaganda Broadcast / Virus Injection / Doomsday Event
  │    ├─ Minor: Repair / Resupply / Deploy Drone / Scrap for Upgrades
  │    └─ Earth counterattacks escalate each day
  ├─ Mutation offers every 2–3 days (power + bane)
  └─ Win OR Lose
       ├─ Win: Annihilation / System Shutdown / Total Conversion
       ├─ Lose: ship destroyed or captured
       └─ Meta: spend Alienium to unlock new options between runs
```

---

## 4. The Player: Invader Ship

Four core systems, upgradeable in-run (with salvage) and between runs (with meta-currency):

| System | Function |
|---|---|
| **Hull** | HP and armor vs. kinetic / energy / radiation |
| **Weapon Bay** | Active weapons (max 3 equipped from a larger arsenal) |
| **Broadcast Array** | Propaganda power, message slots, audience penetration |
| **Cortex** | Virus payloads, hacking speed, deployable drone count |

### 4.1 Weapon Arsenal (examples)

| Weapon | Type | Effect | Countered By |
|---|---|---|---|
| Plasma Lance | Energy | Pierces multiple targets in a line | Shields |
| Kinetic Rods | Kinetic | Massive single-target damage from orbit | Point-defense |
| Radiation Cloud | Radiation | Area denial; slowly melts defenses | Shielded bunkers |
| Nanite Swarm | Biological | Consumes organic targets and spreads | Machine / auto-purge defenses |
| EMP Pulse | Energy | Disables electronics; hurts computers | Pure physical targets |
| Doomsday Ray | Hybrid | Charged mega-beam, long cooldown | Signature ultimate |

**Upgrade sources:**
- **Salvage drops** from destroyed defenses (in-run)
- **Synthesis**: combine 2 weapons into a stronger hybrid (in-run)
- **Meta unlocks** between runs with Alienium

---

## 5. Roguelike Layer

### 5.1 Earth Condition Profile

At run start Earth rolls a **Condition Profile** — the core replayability driver. It is revealed **before** loadout selection, enabling smart counter-builds (deck-building logic applied to invasion prep).

| Condition | Effect |
|---|---|
| **Ion Storm World** | Energy weapons −50%; radiation +50% |
| **Septic Oceans** | Biological weapons +50%; kinetic −25% |
| **Resource-Poor** | Earth builds 30% slower (easier) but drops less salvage |
| **Iron Age Retrograde** | No orbital tech; primitive ground AA (easy combat) |
| **Cyberpunk Megacity** | Computer viruses +50%; EMP stronger; tougher missile defense |
| **Religious Schism** | Propaganda +75%; human factions fight each other |
| **Unified Earth** | Propaganda −50%; defenses fully coordinated (harder) |
| **Ringworld Defense** | Permanent orbital obstacle ring; +2 enemy orbital slots |

### 5.2 Mutations: Power with a Price

Every 2–3 days the player is offered **Mutations** (rogue abilities). Each grants power but attaches a **Bane** — a negative Earth modifier that appears in subsequent days. The stronger the mutation, the more punishing the bane.

| Mutation | Benefit | Bane |
|---|---|---|
| **Viral Spores** | Nanite weapons spread 2x | Earth gains "Plague Defenses": auto-purge nanites after 2 turns |
| **Overclocked Cortex** | Virus actions take 1 less turn | Earth hacks back: lose 1 system point per 3 days |
| **Black Sun Core** | Doomsday Ray cooldown halved | Earth detects the charge: missile interception +40% |
| **Mind Static** | Propaganda affects 2x population | Unrest spreads to your crew: morale decays |
| **Hull Weavers** | Auto-repair 10% hull/day | Earth mines orbit: random hazard strikes daily |
| **Quantum Shielding** | Immune to one attack type | Earth retrofits all defenses against that type in 2 days |

**Design rule:** the best mutations carry the worst banes. The player should never feel a "pure upside" choice.

---

## 6. Puzzle Layer: Non-Destructive Invasion

The 益智 (puzzle) heart of the game. Two parallel systems give the player an intellectual route to victory that complements (or replaces) firepower.

### 6.1 Propaganda System (Social Puzzle)

- Broadcast **message cards** (Slogans, Doctored Footage, Deepfake Drops, Defector Calls) into population **segments**: Civilians / Military / Scientists / Government.
- Each segment has a **conviction** meter and a **suspicion** meter. Messages raise conviction but also suspicion; exceeding the suspicion threshold jams your broadcast array for 2 days.
- 100% conviction in a segment grants **converts**:
  - Military converts disarm one defense each.
  - Scientist converts leak technology (free upgrade drops).
  - Government converts lower Earth's coordination (slower counterattack build).
- **Order matters:** e.g., seeding doubt in scientists first makes military messages 2x stronger.

### 6.2 Computer Virus System (Logic Puzzle)

- Inject virus payloads into Earth's network **nodes**: Power Grid, Defense Grid, Missile Command, Media Net, Orbital Control.
- Each node is a small **logic puzzle** (pattern matching / routing / timing chains) whose difficulty scales with Earth's tech level.
- Compromising nodes grants tactical effects:
  - **Power Grid:** disable 1 defense per day
  - **Defense Grid:** auto-disable turrets in combat
  - **Missile Command:** sabotage incoming nukes (redirect or disarm)
  - **Media Net:** +propaganda effectiveness
  - **Orbital Control:** lower orbital obstacle coverage
- Compromising **4 of 5 nodes** triggers **System Shutdown**: humanity surrenders without your ship firing a shot.

### 6.3 Hybrid & Bloodless Rewards

- **Bloodless Victory Bonus:** 2x meta-currency + unique "Diplomatic Terror" trophies.
- **Hybrid runs** (destroy some, convert others) are encouraged. Destroying a segment you converted costs reputation and shrinks future rewards.

---

## 7. Earth's Countermeasures

| Threat | Appears | Behavior |
|---|---|---|
| **Point-Defense Turrets** | Day 1+ | Shoot down kinetic rods; weak to EMP |
| **Orbital Obstacles** (satellites, debris rings, minefields) | Day 2+ | Block weapon lanes; clear or route around |
| **Ground AA Nets** | Day 2+ | Damage your ship on weapon actions |
| **Fighter Squadrons** | Day 3+ | Intercept ordinance; fightable in combat phase |
| **Nuclear Missiles** | Day 4+ | Fired at YOUR ship — intercept, dodge, or sabotage via Missile Command |
| **Space Stations / Battle Moons** | Day 5+ | Boss-tier shielded targets; primary victory targets |
| **Global Rally** | Day 6+ | If propaganda < 50% across segments, all defenses +1 tier |

---

## 8. Run Structure & Win Conditions

Each day (Day 1–7 or until resolved): **1 Major action + 1 Minor action**.

**Victory:**
1. **Annihilation** — destroy all 3 primary targets (Space Station, Defense Nexus, Capital City shield).
2. **System Shutdown** — compromise 4 of 5 network nodes.
3. **Total Conversion** — reach 100% conviction in all 4 population segments.

**Defeat:**
- Hull reaches 0.
- Ship captured (hull < 20% AND Missile Command hit).

---

## 9. Meta Progression (Between Runs)

Earn **Alienium** per run; bloodless wins pay 2x.

| Unlock Category | Examples |
|---|---|
| Weapons | New arsenal entries, starting loadout slots |
| Mutations | New options in the mutation pool |
| Ship Chassis | Hull size, base system points |
| Faction Traits | "Cortex-focused", "Doomsday enthusiast", etc. |
| Run Mutators | "Harder Earth" sliders that multiply rewards |

No permanent stat inflation — unlocks are **options**, not power creep.

---

## 10. Content Roadmap

- **v0.1 (Prototype):** Combat phase only; 3 weapons, 5 Earth conditions, 1 boss type.
- **v0.2:** Propaganda puzzle layer; 2 population segments.
- **v0.3:** Virus puzzle layer; network nodes; System Shutdown win.
- **v0.4:** Mutations + banes; full Condition Profile table; meta progression.
- **v1.0:** All segments, hybrid endings, run mutators, sound/music, tutorial.
- **Post-1.0:** Mod support, daily seeded invasions, bloodless-rating leaderboards.

---

## 11. Open Questions

1. Combat phase: real-time (Galaga-like) vs. turn-based (XCOM-lite) vs. timing-based mini-games?
2. Ship perspective: overhead 2D, side-view 2D, or 3D?
3. Tone: comedic (Destroy All Humans style), grim sci-fi, or satirical?
4. Named Earthling factions/characters, or faceless global systems?
5. Multi-run campaign arc, or standalone runs only?

---

## 12. Key Terms

- **Condition Profile** — randomized Earth modifiers for a run
- **Mutation / Bane** — power you take on plus the downside Earth gains
- **Segment** — population group targeted by propaganda
- **Node** — network system targeted by viruses
- **Bloodless Victory** — win with zero destruction actions taken
