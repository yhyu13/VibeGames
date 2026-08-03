import type { ConditionModifier, ConditionProfile, DamageType } from "../core/types";
import { mulberry32 } from "../core/rng";

const CONDITION_POOL: ConditionModifier[] = [
  {
    id: "ionStorm",
    name: "Ion Storm World",
    description: "Energy weapons −50%; radiation +50%.",
    damageMods: { energy: 0.5, radiation: 1.5 },
    propagandaMod: 1,
    virusMod: 1,
    earthBuildMod: 1,
    defenseBonus: 0,
    obstacleCoverage: 0,
    threatSlotsBonus: 0,
    salvageMod: 1,
  },
  {
    id: "septicOceans",
    name: "Septic Oceans",
    description: "Biological weapons +50%; kinetic −25%.",
    damageMods: { biological: 1.5, kinetic: 0.75 },
    propagandaMod: 1,
    virusMod: 1,
    earthBuildMod: 1,
    defenseBonus: 0,
    obstacleCoverage: 0,
    threatSlotsBonus: 0,
    salvageMod: 1,
  },
  {
    id: "resourcePoor",
    name: "Resource-Poor",
    description: "Earth builds 30% slower (easier), but drops less salvage.",
    damageMods: {},
    propagandaMod: 1,
    virusMod: 1,
    earthBuildMod: 0.7,
    defenseBonus: 0,
    obstacleCoverage: 0,
    threatSlotsBonus: 0,
    salvageMod: 0.5,
  },
  {
    id: "ironAge",
    name: "Iron Age Retrograde",
    description: "No orbital tech; primitive ground AA. Easy combat.",
    damageMods: {},
    propagandaMod: 1,
    virusMod: 1,
    earthBuildMod: 0.8,
    defenseBonus: -5,
    obstacleCoverage: 0,
    threatSlotsBonus: -2,
    salvageMod: 1,
  },
  {
    id: "cyberpunk",
    name: "Cyberpunk Megacity",
    description: "Computer viruses +50%; EMP stronger; tougher missile defense.",
    damageMods: { energy: 1.25 },
    propagandaMod: 1,
    virusMod: 1.5,
    earthBuildMod: 1,
    defenseBonus: 2,
    obstacleCoverage: 0,
    threatSlotsBonus: 1,
    salvageMod: 1,
  },
  {
    id: "religiousSchism",
    name: "Religious Schism",
    description: "Propaganda +75%; human factions fight each other.",
    damageMods: {},
    propagandaMod: 1.75,
    virusMod: 1,
    earthBuildMod: 0.9,
    defenseBonus: -2,
    obstacleCoverage: 0,
    threatSlotsBonus: 0,
    salvageMod: 1,
  },
  {
    id: "unifiedEarth",
    name: "Unified Earth",
    description: "Propaganda −50%; defenses fully coordinated. Harder.",
    damageMods: {},
    propagandaMod: 0.5,
    virusMod: 1,
    earthBuildMod: 1.2,
    defenseBonus: 4,
    obstacleCoverage: 0.1,
    threatSlotsBonus: 1,
    salvageMod: 1,
  },
  {
    id: "ringworld",
    name: "Ringworld Defense",
    description: "Permanent orbital obstacle ring; +2 enemy orbital slots.",
    damageMods: {},
    propagandaMod: 1,
    virusMod: 1,
    earthBuildMod: 1,
    defenseBonus: 0,
    obstacleCoverage: 0.25,
    threatSlotsBonus: 2,
    salvageMod: 1,
  },
];

const POOL_BY_ID = new Map(CONDITION_POOL.map((c) => [c.id, c]));

export function getCondition(id: string): ConditionModifier {
  const c = POOL_BY_ID.get(id);
  if (!c) throw new Error(`Unknown condition: ${id}`);
  return c;
}

export function generateConditionProfile(seed: number, count = 3): ConditionProfile {
  const rng = mulberry32(seed);
  const pool = [...CONDITION_POOL];
  const picked: ConditionModifier[] = [];
  for (let i = 0; i < count && pool.length > 0; i++) {
    const idx = Math.floor(rng.next() * pool.length);
    picked.push(pool.splice(idx, 1)[0]);
  }
  return { seed, modifiers: picked, effective: computeEffective(picked) };
}

export function computeEffective(modifiers: ConditionModifier[]): ConditionProfile["effective"] {
  const damageMods: Partial<Record<DamageType, number>> = {};
  let propagandaMod = 1;
  let virusMod = 1;
  let earthBuildMod = 1;
  let defenseBonus = 0;
  let obstacleCoverage = 0;
  let threatSlotsBonus = 0;
  let salvageMod = 1;
  for (const m of modifiers) {
    for (const [k, v] of Object.entries(m.damageMods)) {
      damageMods[k as DamageType] = (damageMods[k as DamageType] ?? 1) * v;
    }
    propagandaMod *= m.propagandaMod;
    virusMod *= m.virusMod;
    earthBuildMod *= m.earthBuildMod;
    defenseBonus += m.defenseBonus;
    obstacleCoverage += m.obstacleCoverage;
    threatSlotsBonus += m.threatSlotsBonus;
    salvageMod *= m.salvageMod;
  }
  return { damageMods, propagandaMod, virusMod, earthBuildMod, defenseBonus, obstacleCoverage, threatSlotsBonus, salvageMod };
}
