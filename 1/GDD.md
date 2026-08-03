# Alien Invader

## Game Design Document

| Field | Value |
|---|---|
| Status | Concept draft v0.1 |
| Genre | Single-player action-strategy roguelite with puzzle interludes |
| Perspective | 2D/2.5D orbital battlefield |
| Target platform | PC first; controller and mouse/keyboard support |
| Session length | 30–45 minutes per invasion |
| Core fantasy | Become an evolving alien invader and defeat Earth through destruction, manipulation, or a hybrid strategy |

---

## 1. High Concept

The player commands an alien invasion ship orbiting Earth. During each run, they attack the planet, adapt their ship, and react to an increasingly coordinated human defense. Earth is not a passive health bar: nations build defenses, fill orbit with hazards, launch nuclear missiles, harden infrastructure, and change their tactics in response to the player.

Raw firepower is only one path to victory. Between combat phases, short real-time puzzle encounters let the player spread propaganda, compromise communication networks, infiltrate computer systems, and turn human factions against one another. A successful invader must decide when to destroy, when to deceive, and how much unstable alien power the ship can safely carry.

## 2. Design Pillars

### 2.1 Earth Fights Back

Earth observes the player's behavior and develops counters. Repeatedly using one damage type, attacking one region, or relying on one strategy makes that approach less effective over time.

### 2.2 Power Has a Price

Alien adaptations can radically change a run, but every additional adaptation increases **Instability**. High Instability creates stronger drawbacks, system failures, and dangerous events. Powerful builds should feel exciting without becoming consequence-free.

### 2.3 Force or Cunning

The player can win through planetary destruction, social collapse, digital domination, or a hybrid of all three. Puzzle systems are strategically meaningful rather than optional minigames.

### 2.4 Fast Decisions, Clear Consequences

Combat, upgrades, and puzzles all emphasize quick tactical decisions. The interface must clearly communicate Earth's weaknesses, upcoming threats, and the risks attached to every choice.

---

## 3. Player Experience

The intended emotional arc of a run is:

1. **Predatory confidence** — early human resistance is scattered and vulnerable.
2. **Escalation** — Earth begins coordinating defenses and countering the player's build.
3. **Adaptation pressure** — the player takes stronger abilities and accepts increasingly severe drawbacks.
4. **Controlled chaos** — weapons, orbital hazards, cyber operations, and global events overlap.
5. **Final gambit** — the player completes an invasion plan before Earth launches its ultimate counterattack.

The game should make the player feel intelligent as well as powerful. The best outcome comes from reading the planet, creating openings, and exploiting them—not simply dealing the highest damage.

---

## 4. Core Game Loop

### 4.1 Run Loop

1. Scan the current Earth and reveal regional conditions.
2. Choose a target region and an invasion operation.
3. Fight through an orbital action encounter or complete an infiltration puzzle.
4. Gain resources, alien adaptations, and intelligence.
5. Watch Earth construct or upgrade its countermeasures.
6. Repair, upgrade, reroute power, and choose the next operation.
7. Defeat Earth's final defense or complete a non-destructive takeover objective.

### 4.2 Moment-to-Moment Combat Loop

1. Read target resistances and incoming threats.
2. Move between orbital lanes and aim weapon systems.
3. Break shields or defenses with the correct damage type.
4. Exploit exposed targets before the opening closes.
5. Intercept missiles and avoid debris, satellites, and traps.
6. Collect energy and salvage released by destroyed targets.
7. Decide whether to continue the assault or retreat before taking critical damage.

### 4.3 Strategic Loop

Each action advances the **Earth Response Clock**. The player cannot complete every available operation. Choosing one target allows other regions to build, recover, research counters, or launch attacks.

---

## 5. Win and Loss Conditions

### 5.1 Victory Paths

#### Annihilation

Reduce **Planetary Integrity** to zero by destroying critical infrastructure and completing the final planetary strike.

- Fastest and most direct route.
- Creates high Panic and rapid military escalation.
- Produces abundant salvage but the strongest physical defenses.

#### Submission

Raise **Global Panic** while lowering **Human Resolve** until Earth accepts alien rule.

- Uses selective strikes, propaganda, and demonstrations of power.
- Requires managing public perception and preventing human unity.
- Excessive civilian destruction can turn fear into permanent resistance.

#### Digital Dominion

Compromise enough network nodes to control Earth's command, finance, energy, and communication systems.

- Relies heavily on infiltration puzzles and cyber upgrades.
- Leaves much of the planet intact.
- Triggers air-gapped networks, analog countermeasures, and cyber hunter teams.

#### Fracture

Manipulate factions until Earth can no longer coordinate a unified defense.

- Uses propaganda, misinformation, diplomacy, and targeted sabotage.
- Slower but weakens every category of defense.
- Poorly managed operations can expose alien interference and reunify humanity.

#### Hybrid Victory

Combine progress from multiple paths to unlock special endings, such as forcing surrender after disabling nuclear command or destroying military defenses while preserving useful infrastructure.

### 5.2 Defeat Conditions

A run ends when one of the following occurs:

- Ship Hull reaches zero.
- The Earth Response Clock reaches the final stage and the player fails to stop the last counterattack.
- Instability reaches critical mass and the ship collapses.
- A mission-specific failure makes the selected victory path impossible.

---

## 6. Earth as an Adaptive Opponent

### 6.1 Global Earth States

| State | Meaning | Gameplay Effect |
|---|---|---|
| Planetary Integrity | Physical condition of Earth and its infrastructure | Reaching zero enables Annihilation |
| Human Resolve | Willingness to continue resisting | Low Resolve enables Submission |
| Global Panic | Fear caused by visible alien actions | Helps coercion but accelerates unstable events |
| Human Unity | Coordination between factions | Improves shared defenses and counterattacks |
| Network Control | Percentage of key systems compromised | Enables Digital Dominion abilities |
| Alien Exposure | How well humanity understands the ship | Unlocks counters tailored to the player's build |
| Biosphere Stability | Condition of the planet's environment | Changes weather, visibility, and some endings |

### 6.2 Regions

Earth is divided into large strategic regions. Each region contains:

- One defensive specialization.
- One resource reward.
- One infrastructure target.
- One social or digital network.
- One environmental condition.
- One faction attitude toward the invasion.

A region can be **intact**, **damaged**, **occupied**, **compromised**, **rebelling**, or **destroyed**. Its state changes future missions and the ending.

### 6.3 Planet Conditions

Each run generates a combination of global and regional modifiers. Conditions create elemental strengths and weaknesses without making a weapon completely unusable.

| Condition | Resistance | Weakness | Additional Effect |
|---|---|---|---|
| Perpetual Storms | Thermal | Electric | Lightning may chain to nearby targets or the ship |
| Reinforced Megacities | Kinetic | Corrosive | Buildings create dangerous debris when destroyed |
| Solar Shield Network | Plasma | EMP | Periodically blocks orbital targeting |
| Dense Satellite Web | Digital intrusion | Gravity | Orbit contains more obstacles and salvage |
| Polarized Atmosphere | Electric | Kinetic | Projectiles curve near magnetic zones |
| Global Blackout Protocol | Digital | Thermal | Networks disappear until power sites are restored |
| Subterranean Command | Plasma | Seismic/Gravity | Key targets appear only during short scan windows |
| Fragmented Governments | Propaganda resistance | Cyber infiltration | Factions act independently and unpredictably |

### 6.4 Adaptation and Counterplay

Earth tracks major player behaviors during a run:

- Most-used weapon family.
- Preferred orbital lane.
- Most-targeted region type.
- Destruction versus infiltration ratio.
- Dependence on shields, drones, or cloaking.

After each phase, Earth may develop a counter. The player sees a warning before the counter becomes active and can diversify, sabotage the research site, or deliberately bait Earth into researching the wrong defense.

---

## 7. Orbital Combat

### 7.1 Battlefield

Combat takes place around a curved section of Earth with three orbital lanes:

- **High Orbit** — safest from ground weapons, crowded with satellites and long-range missiles.
- **Low Orbit** — best accuracy and resource collection, but highest exposure to defenses.
- **Atmospheric Edge** — enables special weapons and infiltration drops, but causes heat buildup.

The ship can move laterally, switch lanes, rotate firing arcs, and temporarily retreat behind the planet. Movement consumes energy or creates heat depending on the installed engine.

### 7.2 Ship Resources

| Resource | Use |
|---|---|
| Hull | Ship health; difficult to restore during combat |
| Shield | Regenerating protection that can be specialized by damage type |
| Energy | Powers weapons, movement, hacking, and active defenses |
| Heat | Generated by high-output systems; excessive Heat disables modules |
| Signal | Spent on propaganda, cyber abilities, and battlefield deception |
| Biomass/Salvage | Run currency used for upgrades and adaptations |
| Instability | Permanent run-wide risk created by alien adaptations |

### 7.3 Weapon Families

#### Plasma

- High direct damage and strong against exposed infrastructure.
- Builds significant Heat.
- Weak against thermal shielding and atmospheric interference.

#### Kinetic

- Reliable, low-energy projectiles with armor-breaking upgrades.
- Creates orbital debris that can hurt either side.
- Less effective against reinforced structures.

#### Electric/EMP

- Disables shields, satellites, and missile guidance.
- Low physical damage.
- Can spread through connected defense networks.

#### Corrosive Nanites

- Damage increases over time and strips armor.
- Can be cleansed by human countermeasure facilities.
- Raises Alien Exposure quickly.

#### Gravity

- Repositions enemies, redirects missiles, and weaponizes debris.
- Expensive and difficult to control.
- Supports high-skill combination attacks.

#### Signal Weapons

- Create decoys, false orders, and targeting errors.
- Scale with Network Control rather than physical damage.
- Weak against analog and isolated systems.

### 7.4 Weapon Structure

Each weapon has:

- A basic firing behavior.
- An element or attack type.
- A tactical role.
- Two upgrade branches.
- One overcharge ability.
- One possible unstable mutation.

Example:

**Gravity Lance**

- Base: Pulls a target toward the impact point.
- Control branch: Larger pull radius and lower collateral damage.
- Destruction branch: Collisions create damaging shockwaves.
- Overcharge: Temporarily reverses gravity in one orbital lane.
- Mutation: Infinite Mass greatly increases force but also pulls the player ship.

### 7.5 Earth Defenses

- Ground-to-orbit railguns.
- Missile batteries.
- Anti-plasma shield towers.
- Satellite laser grids.
- Interceptor drones.
- Orbital mines.
- Decoy infrastructure.
- Repair swarms.
- Signal jammers.
- Cyber hunter satellites.
- Experimental nuclear launch sites.

### 7.6 Nuclear Missile Threat

Nuclear missiles are major telegraphed attacks rather than random instant kills.

1. Earth constructs or reveals a launch facility.
2. The player receives intelligence about the launch window.
3. A launch countdown appears on the strategic map.
4. Once launched, the missile crosses orbital lanes in stages.
5. The player can destroy it, hack its guidance, redirect it, disable its warhead, or hide behind a decoy.

Redirecting a nuclear missile can devastate Earth but greatly increases Human Unity, Alien Exposure, and long-term environmental damage.

---

## 8. Roguelite Systems

### 8.1 Run Generation

Each invasion randomizes:

- Planet conditions.
- Regional strengths and weaknesses.
- Human faction relationships.
- Defense research priorities.
- Orbital obstacle patterns.
- Available weapons and adaptations.
- Puzzle layouts and network rules.
- Major global events.
- Final Earth countermeasure.

Randomness should change strategy, not determine success before the run begins. Every difficult condition must have at least two possible counters.

### 8.2 Alien Adaptations

Adaptations are powerful run-specific abilities chosen after major operations. Examples:

| Adaptation | Benefit | Instability Risk |
|---|---|---|
| Recursive Reactor | Energy generation increases after every weapon combo | Missed attacks create Heat spikes |
| Living Armor | Hull slowly regenerates | Fire damage permanently reduces maximum Hull for the encounter |
| Split Consciousness | Control two drones independently | Input delays occur during high Instability events |
| Memory Parasite | Failed puzzles reveal one correct step | Human cyber defenses learn faster |
| Void Stomach | Consume orbital debris for resources | Nearby pickups are pulled in as dangerous projectiles |
| Mimetic Signal | Copy one Earth defense ability | Repeated use may target the wrong faction |

### 8.3 Instability and Burdens

Every adaptation has an **Instability value**. Crossing thresholds adds a Burden:

- **Stable (0–24):** No global penalty.
- **Strained (25–49):** Choose one minor Burden.
- **Volatile (50–74):** Choose one major Burden and trigger unstable events.
- **Critical (75–99):** Systems periodically mutate during missions.
- **Collapse (100):** The ship begins a short final countdown unless Instability is purged.

Example Burdens:

- One weapon slot changes element after every operation.
- Shield regeneration also restores a small amount of Human Resolve.
- Puzzle timers are shorter, but successful puzzles grant more Signal.
- High Heat creates false warning indicators.
- Destroyed satellites have a chance to become hostile debris.
- Repairs increase Earth's Alien Exposure.

The player can purge Instability by sacrificing an adaptation, destroying a ship module, completing a difficult stabilization puzzle, or spending rare resources.

### 8.4 Upgrade Layers

#### During a Run

- Weapons and weapon branches.
- Ship modules.
- Alien adaptations.
- Consumable tactics.
- Regional intelligence.
- Temporary faction assets.

#### Between Runs

Meta-progression expands options rather than granting unlimited permanent power:

- Unlock new weapon families.
- Discover new adaptations and Burdens.
- Unlock starting ship archetypes.
- Gain intelligence that reveals more information during scans.
- Unlock alternate invasion commanders and story routes.
- Add new Earth conditions, bosses, puzzles, and endings.

---

## 9. Puzzle and Infiltration Interludes (益智解谜)

Puzzle operations are short, high-pressure encounters lasting approximately 60–180 seconds. They use the same strategic resources and affect the same Earth systems as combat.

### 9.1 Design Rules

- Explain a puzzle's core rule in under 15 seconds.
- Reward pattern recognition, prioritization, and planning rather than hidden knowledge.
- Allow partial success instead of only pass/fail outcomes.
- Connect every result to the strategic map.
- Add rule variations through Earth conditions and countermeasures.
- Never require real-world hacking knowledge.

### 9.2 Propaganda Network

The player deploys messages through a shifting social graph.

- Nodes represent audiences, institutions, and influential figures.
- Each audience reacts differently to fear, hope, division, or proof.
- The player chains compatible messages while avoiding fact-check and counter-propaganda nodes.
- Overusing one message type makes populations resistant to it.

Possible outcomes:

- Reduce Human Resolve.
- Lower Human Unity.
- Create a temporary rebellion.
- Hide responsibility for a destructive attack.
- Convince a faction to reveal defense locations.

### 9.3 Computer Virus Infiltration

The player routes an alien program through a network while Earth actively isolates nodes.

- Capture access points to gain processing power.
- Match or transform data keys to pass security gates.
- Choose between stealth and rapid replication.
- Defend the core payload from tracing programs.
- Exit before detection or risk converting the mission into combat.

Possible outcomes:

- Disable a defense network.
- Redirect missiles or drones.
- Steal research and reveal future counters.
- Take control of energy infrastructure.
- Add permanent progress toward Digital Dominion.

### 9.4 Signal Decryption

The player reconstructs a changing pattern from incomplete transmissions.

- Rotate and align signal fragments.
- Distinguish real orders from decoys.
- Spend Signal to freeze or reveal part of the pattern.
- Faster solutions provide more detailed intelligence.

### 9.5 Social Engineering

The player impersonates human authorities by assembling convincing orders from limited phrases, credentials, and context clues.

- Correct orders make factions attack false targets or delay construction.
- Suspicious wording increases Alien Exposure.
- Previously stolen intelligence unlocks safer dialogue options.

### 9.6 Hybrid Operations

Some missions combine puzzles and action:

- Maintain a cyber connection while dodging orbital defenses.
- Protect hacked satellites until propaganda finishes broadcasting.
- Use gravity weapons to align a physical satellite network.
- Disable a nuclear missile's security layers before it reaches the ship.

---

## 10. Economy and Rewards

### 10.1 Resources

| Resource | Earned From | Spent On |
|---|---|---|
| Salvage | Destroyed defenses and orbital objects | Mechanical weapons, armor, repairs |
| Biomass | Living targets, special events, peaceful extraction deals | Organic modules and adaptations |
| Signal | Infiltration, scanning, communication nodes | Cyber actions, propaganda, deception |
| Intelligence | Puzzles, captured research, reconnaissance | Revealing counters and mission information |
| Dark Matter | Bosses, elite objectives, high-risk events | Rare upgrades and Instability control |

### 10.2 Reward Choice

After major operations, offer three readable reward categories whenever possible:

- Immediate strength.
- Long-term strategic advantage.
- High-power adaptation with an Instability cost.

This ensures the central risk/reward decision appears throughout the run.

---

## 11. Ship Archetypes

### Harvester

- Balanced combat and resource collection.
- Begins with a tractor beam and additional salvage capacity.
- Suitable for new players.

### Whisper

- Specializes in cloaking, propaganda, and network intrusion.
- Low Hull and weak direct weapons.
- Best for Submission and Digital Dominion victories.

### Worldbreaker

- Heavy weapons, armor, and Heat capacity.
- Slow lane changes and rapid Earth escalation.
- Best for Annihilation victories.

### Shapeless One

- Gains stronger benefits from alien adaptations.
- Starts with higher Instability and unpredictable modules.
- Designed for advanced players.

---

## 12. Earth Escalation

### Phase 1: Detection

- Civilian satellites and basic missiles.
- Nations act independently.
- Player learns the run's planetary conditions.

### Phase 2: Mobilization

- Specialized defense sites appear.
- Earth begins studying the player's favorite attack type.
- Propaganda and cyber defense teams become active.

### Phase 3: Unification

- Shared shield networks and coordinated orbital attacks.
- Elite defenders protect critical regions.
- Nuclear launch sites may enter construction.

### Phase 4: Retaliation

- Earth launches global counter-operations.
- Orbital lanes become crowded and dangerous.
- The final defense project is revealed.

### Phase 5: Final Countermeasure

One run-specific final threat becomes active:

- Planetary nuclear salvo.
- Artificial moon railgun.
- Global quantum firewall.
- Captured alien weapon.
- Coordinated false-signal trap.
- Evacuation fleet that preserves human resistance after Earth falls.

The player must destroy, infiltrate, redirect, or politically neutralize the final countermeasure.

---

## 13. Boss Encounters

Bosses represent Earth's major projects rather than individual characters.

### Orbital Defense Ring

A multi-part structure spanning all orbital lanes. The player can destroy its generators, hack its targeting network, or cause its sections to collide.

### Unified Command Bunker

A hidden subterranean target protected by decoys. The encounter alternates signal decryption with short precision-strike windows.

### Nuclear Ark

A mobile launch platform carrying multiple warheads. Individual systems can be destroyed, disabled, or captured, producing different strategic consequences.

### GAIA Defense Intelligence

An adaptive AI that mirrors the player's weapon patterns and actively changes puzzle rules. Defeating it through cyber infiltration may unlock it as a dangerous ship adaptation.

---

## 14. Events

Events force decisions that express the player's invasion style.

Examples:

- A human faction offers surrender in exchange for protection.
- Scientists request time to build a translator but may be preparing a weapon.
- A damaged alien scout contains an adaptation and a contagious instability.
- A region launches a false nuclear alarm, raising global Panic.
- A hacked broadcaster asks whether to spread fear, hope, or division.
- Orbital debris threatens both the player and a valuable Earth network.

Choices should change systems, not only narrative text.

---

## 15. Difficulty and Balance

### 15.1 Difficulty Principles

- Difficulty increases the complexity and coordination of counters, not only enemy health.
- Earth should punish repetitive strategies while leaving time to react.
- Every major attack must be telegraphed.
- Puzzle difficulty should add interactions and pressure rather than obscure rules.
- A failed operation should usually create a new problem instead of ending the run immediately.

### 15.2 Initial Balance Targets

- Standard run: 8–12 major operations.
- First adaptation choice: within 5 minutes.
- First meaningful Earth counter: by operation 3.
- First puzzle opportunity: within 8 minutes.
- Final escalation phase: approximately 25–35 minutes into a standard run.
- A successful run should normally use at least two weapon or operation types.
- Non-destructive victories should be as reliable as Annihilation after the player learns their systems.

---

## 16. Controls and Interface

### 16.1 Combat Controls

- Move along orbit.
- Switch orbital lane.
- Aim primary weapon.
- Fire primary and secondary weapons.
- Activate ship module.
- Open tactical scan.
- Cycle priority targets.

### 16.2 HUD Priorities

The combat HUD must show:

- Hull, Shield, Energy, Heat, and Instability.
- Weapon cooldowns and current elements.
- Current target weaknesses and resistances.
- Incoming missile paths and impact timing.
- Orbital lane hazards.
- Earth Response progress.
- Active adaptation benefits and Burdens.

### 16.3 Strategic Map

The map shows:

- Regional state and available operations.
- Construction and launch countdowns.
- Known defenses and uncertain intelligence.
- Progress toward each victory path.
- Predicted consequence of selecting an operation.

Information can be incomplete, but the interface must distinguish **unknown** from **random**.

---

## 17. Art Direction

### 17.1 Visual Style

- Graphic science-fiction with strong silhouettes and readable effects.
- Earth is beautiful, detailed, and visibly transformed by player choices.
- Alien technology uses organic geometry, impossible motion, and shifting colors.
- Human technology evolves from familiar machinery into desperate experimental weapons.
- Destructive, social, and digital actions each have distinct visual languages.

### 17.2 Color Language

- Alien energy: violet and iridescent green.
- Human defenses: white, steel blue, and warning red.
- Cyber operations: cyan with geometric signal patterns.
- Propaganda operations: amber with branching social links.
- Instability: colors split, misalign, and intrude into the interface.

### 17.3 Planet Persistence

Visible changes to Earth should persist throughout a run:

- City lights disappear after blackouts or destruction.
- Shield networks create glowing regional grids.
- Storms, fires, and atmospheric damage alter the planet.
- Compromised regions display alien signal patterns.
- Rebellions interrupt normal defense activity.

---

## 18. Audio Direction

- Alien weapons combine deep pressure, organic resonance, and spatial distortion.
- Human radio chatter evolves from confusion to organized resistance or panic.
- Music layers respond to Earth escalation, ship Instability, and victory-path progress.
- Puzzle music emphasizes rhythm and urgency without masking information cues.
- Critical attacks use unique warning sounds that remain recognizable during chaotic combat.

---

## 19. Narrative Framework

The player chooses or unlocks an alien commander with a distinct reason for invading:

- Resource extraction.
- Survival of a dying species.
- Religious transformation.
- Scientific experimentation.
- Revenge against a hidden human action.
- Liberation from an alien empire that already controls Earth indirectly.

Narrative is delivered through intercepted broadcasts, ship intelligence, faction messages, event choices, and endings. Earth factions should feel human and varied rather than uniformly heroic or villainous.

The condition of Earth, chosen victory path, surrendered factions, Biosphere Stability, and final Instability determine the ending.

---

## 20. Accessibility

- Full control remapping.
- Controller and mouse/keyboard parity.
- Adjustable game speed during strategic and puzzle phases.
- Optional aim assist and target snapping.
- Colorblind-safe element icons and patterns.
- Separate sliders for screen shake, flashes, distortion, and interface instability.
- Puzzle timer extensions or untimed mode.
- Clear subtitles and visual equivalents for important audio warnings.
- Difficulty assists can be changed without restarting a run.

---

## 21. MVP Scope

The first playable version should prove the interaction between combat, adaptive Earth defenses, Instability, and puzzles.

### Included

- One ship archetype: Harvester.
- Three weapon families: Plasma, Kinetic, and EMP.
- Three orbital lanes.
- Four Earth regions.
- Six planet conditions.
- Eight standard defense types.
- One nuclear missile sequence.
- Twelve alien adaptations.
- Eight Burdens.
- Two puzzle types: Computer Virus and Propaganda Network.
- Two victory paths: Annihilation and Digital Dominion.
- One final boss: Orbital Defense Ring.
- One complete 30-minute run.

### Excluded Until Later

- Multiplayer.
- Open-world planetary exploration.
- Detailed city-level simulation.
- User-generated content.
- More than one alien commander.
- Submission and Fracture endings.
- Full narrative campaign.

### MVP Success Criteria

- Players change tactics in response to Earth conditions.
- Players understand why Earth developed a specific counter.
- Adaptation choices create meaningful risk through Instability.
- Puzzle success materially changes the following combat encounter.
- Both MVP victory paths feel intentional and viable.
- A full run remains readable during the final escalation.

---

## 22. Prototype Priorities

1. Ship movement and combat across three orbital lanes.
2. Weapon resistance and weakness interactions.
3. Earth Response Clock and one adaptive counter system.
4. Upgrade selection with Instability thresholds and Burdens.
5. Nuclear missile telegraph, interception, and redirection.
6. Computer Virus puzzle linked to a combat defense network.
7. Strategic map with two competing victory paths.
8. Full run balance and final boss.

## 23. Key Risks

| Risk | Mitigation |
|---|---|
| Combat and puzzles feel like separate games | Share resources, targets, upgrades, and consequences between both modes |
| Earth counters feel unfair | Telegraph research, show causes, and provide multiple counterplay options |
| Instability discourages exciting upgrades | Make Burdens build-defining and sometimes exploitable rather than purely punitive |
| Destruction path is always easiest | Give intact networks and factions unique strategic value |
| Too many global statistics overwhelm players | Reveal systems gradually and group them by victory path |
| Procedural conditions create impossible runs | Validate generated combinations and guarantee accessible counters |
| Puzzle repetition | Use modular rules, changing objectives, and hybrid combat-puzzle encounters |

## 24. Core Design Statement

**Alien Invader is a roguelite about defeating an adaptive planet. The player becomes more powerful by accepting dangerous flaws, and wins by combining spectacular alien weapons with fast, intelligent manipulation of Earth's physical, digital, and social systems.**
