# Alien Invader — Game Design Document

**Status:** Draft v0.1
**Genre:** Sci-fi Roguelike / Action-Puzzle Hybrid
**Platform:** PC (keyboard + mouse)
**Session Length:** 20–40 min per run

---

## 1. Elevator Pitch

You are the **Alien Invader**. Your fleet has one job: **destroy planet Earth**. But Earth is not defenseless — it builds orbital defenses, launches nuclear missiles, and rigs its planetside defenses to shred your ship. Every invasion is a fresh run: Earth's conditions, resistances, and defenses are randomly generated, so no two invasions are alike.

Brute force alone will fail. Between bombing runs, you must use your alien intellect — deploying **propaganda** to turn humanity against itself and injecting **computer viruses** to cripple their military from within. Sometimes the most efficient invasion has zero casualties... on your side.

---

## 2. Design Pillars

1. **Power Fantasy, Earned** — Level weapons and abilities that feel devastating, but every power spike is countered by Earth's escalating response.
2. **Roguelike Replayability** — Randomized Earth conditions, mutations, and defense archetypes make every run a new puzzle.
3. **Brains over Brute Force** — Non-destructive win paths (propaganda, virus, infiltration) are always viable and often optimal, with bonus rewards.
4. **Risk / Reward Trade-offs** — Every rogue mutation you stack makes you stronger but gives Earth new ways to hurt you.
5. **Escalating Tension** — Earth's military-industrial complex gets smarter and meaner as the invasion drags on.

---

## 3. Core Loop

```
Run Start
  ├─ Choose Invasion Package (loadout + starting mutation)
  ├─ Orbit Phase: Scan Earth → read its condition modifiers
  ├─ Day 1–7: Attack / Infiltrate / Manage defenses
  │    └─ each "day" = pick 1 action per ship
  │         • Weapons phase (real-time combat vs. defense grid)
  │         • Puzzle phase (propaganda broadcast / virus injection)
  │         • Build phase (upgrade ship, repair, synthesize new weapons)
  ├─ Earth counterattacks escalate each day (missiles, fighters, space stations)
  └─ Win = destroy all key Earth targets OR surrender via infiltration
       Lose = ship destroyed
          └─ Meta progression: unlock new weapons/abilities between runs
```

---

## 4. The Player: Invader Ship

The ship has four core systems that can be upgraded in-run (with salvage) and between runs (with meta-currency):

| System | Function |
|---|---|
| **Hull** | HP, armor vs. kinetic/energy/radiation |
| **Weapon Bay** | Active weapons (max 3 equipped, from a larger arsenal) |
| **Broadcast Array** | Propaganda power, message slots, audience penetration |
| **Cortex** | Virus payloads, hacking speed, number of deployable drones |

### 4.1 Weapon Arsenal (examples)

| Weapon | Type | Effect | Notes |
|---|---|---|---|
| Plasma Lance | Energy | Pierces multiple targets in a line | Weak vs. shields |
| Kinetic Rods | Kinetic | Massive single-target damage from orbit | Countered by point-defense |
| Radiation Cloud | Radiation | Area denial, slowly melts defenses | Weak vs. shielded bunkers |
| Nanite Swarm | Biological | Consumes organic targets, spreads | Ineffective vs. machines |
| EMP Pulse | Energy | Disables electronics, harms computers | Useless vs. pure physical |
| Doomsday Ray | Hybrid | Charged mega-beam, long cooldown | Signature ultimate |

Weapons are obtained/upgraded via:
- **Salvage drops** from destroyed defenses (in-run)
- **Synthesis** (combine 2 weapons → stronger hybrid, in-run)
- **Meta unlocks** between runs with victory currency

---

## 5. Roguelike: Earth Condition System

At run start, Earth rolls a **Condition Profile** that defines the planet's strengths and weaknesses. This is the core replayability driver.

### 5.1 Condition Modifiers (examples)

| Condition | Effect |
|---|---|
| **Ion Storm World** | Energy weapons -50% damage; radiation +50% |
| **Septic Oceans** | Biological weapons +50%; kinetic -25% |
| **Resource-Poor** | Earth builds 30% slower (easier), but drops less salvage |
| **Iron Age Retrograde** | No orbital tech; ground AA is primitive (easy combat) |
| **Cyberpunk Megacity** | Computer viruses +50% effective; EMP stronger; harder missile defense |
| **Religious Schism** | Propaganda +75% effective; factions fight each other |
| **Unified Earth** | Propaganda -50% effective; defenses coordinated (harder) |
| **Ringworld Defense** | Permanent orbital obstacle ring; +2 enemy orbital slots |

The Condition Profile is shown **before** loadout selection, encouraging smart counter-builds (deck-building logic applied to invasion prep).

### 5.2 Mutations: Power with a Price

During a run you are offered **Mutations** (rogue abilities). Each grants power but attaches a **Bane** — a negative Earth modifier that appears in future days.

| Mutation | Benefit | Bane |
|---|---|---|
| **Viral Spores** | Nanite weapons spread 2x | Earth gains "Plague Defenses": auto-purge nanites after 2 turns |
| **Overclocked Cortex** | Virus actions take 1 less turn | Earth hacks you back: lose 1 system point per 3 days |
| **Black Sun Core** | Doomsday Ray cooldown halved | Earth detects the charge: missile interception chance +40% |
| **Mind Static** | Propaganda affects 2x population | Unrest spread to your crew: morale decays |
| **Hull Weavers** | Auto-repair 10% hull/day | Earth mines orbit: random hazard strikes each day |
| **Quantum Shielding** | Immune to one attack type (choose) | Earth retrofits all defenses against that type in 2 days |

**Design rule:** the strongest mutations must have the most punishing banes. The player should never feel "pure upside."

---

## 6. Puzzle Layer: Non-Destructive Invasion

A core pillar: the player can win by **infiltrating** instead of annihilating. This is where the 益智 (puzzle) gameplay lives.

### 6.1 Propaganda System (Social Puzzle)

- Broadcast **message cards** (Slogans, Doctored Footage, Deepfake Drops, Defector Calls) into population segments (Civilians / Military / Scientists / Government).
- Each segment has a **conviction meter** and a **suspicion meter**. Messages raise conviction but also suspicion; too much suspicion → broadcast array jammed for 2 days.
- Reaching 100% conviction in a segment grants **converts**: military converts disarm one defense, scientist converts leak tech (upgrade drops), government converts lower Earth's coordination.
- Solve order matters: e.g., seeding doubt in scientists first makes military messages 2x stronger.

### 6.2 Computer Virus System (Logic Puzzle)

- Inject virus payloads into Earth's network nodes: **Power Grid, Defense Grid, Missile Command, Media Net, Orbital Control**.
- Each node is a small **logic puzzle** (hacking mini-game: pattern matching, routing, timing chains) whose difficulty scales with Earth's tech level.
- Compromising nodes grants tactical effects:
  - Power Grid: disable 1 defense per day
  - Defense Grid: auto-disable turrets in combat
  - Missile Command: sabotage incoming nukes → redirect to another city
  - Media Net: +propaganda effectiveness
  - Orbital Control: lower orbital obstacle coverage
- **Full compromise of 4/5 nodes = "System Shutdown"** win condition: humanity surrenders without the ship firing a shot.

### 6.3 Both paths reward

- **Bloodless Victory Bonus:** 2x meta currency + unique "Diplomatic Terror" trophy unlocks.
- Hybrid runs (destroy some, convert others) are encouraged; destroying a converted segment costs reputation and shrinks future rewards.

---

## 7. Earth's Countermeasures (Enemy Design)

| Threat | Appears | Behavior |
|---|---|---|
| **Point-Defense Turrets** | Day 1+ | Shoots down kinetic rods; weak to EMP |
| **Orbital Obstacles** (satellites, debris rings, mine fields) | Day 2+ | Block weapon lanes; must be cleared or routed around |
| **Fighter Squadrons** | Day 3+ | Intercept your ordinance; fightable in combat phase |
| **Ground AA Nets** | Day 2+ | Damage your ship on weapon actions |
| **Nuclear Missiles** | Day 4+ | Fired at YOUR ship — must be intercepted, dodged, or sabotaged via Missile Command |
| **Space Stations / Battle Moons** | Day 5+ | Boss-tier targets with shields; main victory targets |
| **Global Rally** | Day 6+ | If propaganda < 50% across segments, all defenses +1 tier |

---

## 8. Run Structure (Win Conditions)

**Day 1 → 7 (or until resolved).** Each day: choose 1 major action + 1 minor action.

- **Major:** Weapon assault on a target / Propaganda broadcast / Virus injection / Doomsday event
- **Minor:** Repair hull / Resupply / Deploy drone / Scrap salvage for upgrades

**Victory:**
1. **Annihilation:** Destroy all 3 primary targets (Space Station, Defense Nexus, Capital City shield).
2. **System Shutdown:** Compromise 4 of 5 network nodes.
3. **Total Conversion:** Reach 100% conviction in all 4 population segments.

**Defeat:**
- Hull reaches 0.
- Ship captured (hull < 20% AND Missile Command hit).

---

## 9. Meta Progression (Between Runs)

Victory currency (**Alienium**) + bonus for bloodless wins.

| Unlock Category | Examples |
|---|---|
| Weapons | New arsenal entries, starting loadout slots |
| Mutations | New options in the mutation pool |
| Ship Chassis | Hull size, base system points |
| Faction Bonuses | Pick a starting faction trait (e.g., "Cortex-focused", "Doomsday enthusiast") |
| Run Mutators | "Harder Earth" sliders that multiply rewards |

No permanent stat inflation — unlocks are *options*, not power creep.

---

## 10. Content Roadmap

- **v0.1 (Prototype):** Combat phase only; 3 weapons, 5 Earth conditions, 1 boss type.
- **v0.2:** Propaganda puzzle layer; 2 population segments.
- **v0.3:** Virus puzzle layer; network nodes; System Shutdown win.
- **v0.4:** Mutations + banes; full Condition Profile table; meta progression.
- **v1.0:** All segments, hybrid endings, run mutators, sound/music, tutorial.
- **Post-1.0:** Mod support, daily invasions (seeded runs), leaderboards (bloodless rating).

---

## 11. Open Questions

1. Combat phase: real-time (Galaga-like / shoot 'em up) vs. turn-based (XCOM-lite) vs. timing-based (mini-game style)?
2. Ship perspective: overhead 2D vs. side-view 2D vs. 3D?
3. Tone: comedic (Destroy All Humans style), grim sci-fi, or satirical?
4. Do Earthlings have named characters/factions, or faceless global systems?
5. Length of a full "campaign" (multi-run arc) if any?

---

## 12. Key Terms

- **Condition Profile** — randomized Earth modifiers for a run
- **Mutation / Bane** — power you take on with a downside Earth gains
- **Segment** — population group targeted by propaganda
- **Node** — network system targeted by viruses
- **Bloodless Victory** — win with zero destruction actions taken
