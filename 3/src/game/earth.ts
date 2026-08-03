import type { ConditionDef, ConditionProfile, DamageType, RunState, TargetKind, TargetState } from '../core/types';
import { CONDITION_IDS, getCondition } from '../data/conditions';
import type { RNG } from '../core/rng';

export function computeProfile(defs: ConditionDef[]): ConditionProfile {
  const damageMod: Record<DamageType, number> = { kinetic: 1, energy: 1, radiation: 1, bio: 1, emp: 1 };
  let defenseHpMod = 0;
  let propagandaMult = 1;
  let virusMult = 1;
  let salvageMult = 1;
  let difficulty = 0;
  for (const c of defs) {
    for (const t of Object.keys(c.damageMod) as DamageType[]) {
      damageMod[t] *= c.damageMod[t] ?? 1;
    }
    defenseHpMod += c.defenseHpMod;
    propagandaMult *= c.propagandaMult;
    virusMult *= c.virusMult;
    salvageMult *= c.salvageMult;
    difficulty += c.difficulty;
  }
  return {
    primary: defs[0] ?? getCondition('iron-age'),
    secondary: defs.slice(1),
    damageMod,
    defenseHpMod,
    propagandaMult,
    virusMult,
    salvageMult,
    difficulty,
  };
}

export function generateProfile(rng: RNG, budget: number): ConditionProfile {
  const weights: Array<readonly [string, number]> = [
    ['ion-storm', 10],
    ['septic-oceans', 10],
    ['resource-poor', 6],
    ['iron-age', 4],
    ['cyberpunk', 10],
    ['religious-schism', 8],
    ['unified-earth', 8],
    ['ringworld-defense', 8],
  ];
  const primaryId = rng.weighted(weights);
  const defs: ConditionDef[] = [getCondition(primaryId)];
  let remaining = budget - getCondition(primaryId).difficulty;
  const pool = CONDITION_IDS.filter((id) => id !== primaryId);
  rng.shuffle(pool);
  let count = 0;
  for (const id of pool) {
    if (count >= 2 || remaining <= 0) break;
    const c = getCondition(id);
    if (c.difficulty > remaining + 0.5) continue;
    defs.push(c);
    remaining -= c.difficulty;
    count++;
  }
  return computeProfile(defs);
}

const EARTH_NAMES = [
  'Terra-7',
  'Sol Minor',
  'Verdant Prime',
  'Aquarius IV',
  'Haven Cluster',
  'Gaia-2',
  'Blue Marble',
  'Eden B',
];

const ARMOR: Record<TargetKind, Partial<Record<DamageType, number>>> = {
  turret: { emp: 2, bio: 0.4, energy: 0.9, kinetic: 1, radiation: 0.8 },
  fighter: { emp: 2, kinetic: 1.1, bio: 0.8, radiation: 0.5 },
  missile: { emp: 1.5, kinetic: 1, radiation: 0.6 },
  obstacle: { kinetic: 1.3, emp: 0.3, bio: 0.5, radiation: 1 },
  station: { kinetic: 0.7, emp: 0.5, bio: 1.2 },
  nexus: { bio: 0.5, energy: 0.9, kinetic: 1.1 },
  capital: { kinetic: 0.5, energy: 0.8, radiation: 0.6, bio: 1.3 },
};

export interface EarthDef {
  name: string;
  targets: TargetState[];
}

export function generateEarth(rng: RNG, profile: ConditionProfile): EarthDef {
  const name = rng.pick(EARTH_NAMES);
  const hpMult = 1 + profile.defenseHpMod;
  const mk = (id: string, kind: TargetKind, label: string, baseHp: number): TargetState => ({
    id,
    kind,
    name: label,
    hp: Math.round(baseHp * hpMult),
    maxHp: Math.round(baseHp * hpMult),
    armor: ARMOR[kind],
    isPrimary: true,
    destroyed: false,
  });
  return {
    name,
    targets: [
      mk('primary-station', 'station', 'Orbital Battle Station', 340),
      mk('primary-nexus', 'nexus', 'Defense Nexus', 240),
      mk('primary-capital', 'capital', 'Capital Shield City', 280),
    ],
  };
}

export function baneHpMod(run: RunState): number {
  let mod = 0;
  for (const m of run.mutations) {
    if (m.baneDelay + 1 <= run.day) mod += m.baneHpMod;
  }
  return mod;
}

export function defenseHpMultiplier(run: RunState): number {
  return 1 + run.profile.defenseHpMod + baneHpMod(run);
}

export function escalation(day: number, run: RunState): { turrets: number; fighters: number; obstacles: number; nukes: number } {
  const obstaclePenalty = run.nodes.find((n) => n.id === 'orbital')?.compromised ? 2 : 0;
  return {
    turrets: Math.min(2 + day, 6),
    fighters: day >= 3 ? Math.min(2 + Math.floor((day - 2) / 2), 6) : 0,
    obstacles: day >= 2 ? Math.max(0, 2 + Math.floor(day / 2) - obstaclePenalty) : 0,
    nukes: day >= 4 ? day - 3 : 0,
  };
}

export function generateDayDefenses(run: RunState): TargetState[] {
  const esc = escalation(run.day, run);
  const hpMult = defenseHpMultiplier(run);
  const out: TargetState[] = [];
  const mk = (id: string, kind: TargetKind, label: string, baseHp: number): TargetState => ({
    id,
    kind,
    name: label,
    hp: Math.round(baseHp * hpMult),
    maxHp: Math.round(baseHp * hpMult),
    armor: ARMOR[kind],
    isPrimary: false,
    destroyed: false,
  });
  for (let i = 0; i < esc.turrets; i++) out.push(mk(`turret-${run.day}-${i}`, 'turret', `Point-Defense Turret ${i + 1}`, 70));
  for (let i = 0; i < esc.fighters; i++) out.push(mk(`fighter-${run.day}-${i}`, 'fighter', `Interceptor ${i + 1}`, 45));
  for (let i = 0; i < esc.obstacles; i++) out.push(mk(`obstacle-${run.day}-${i}`, 'obstacle', `Orbital Debris ${i + 1}`, 80));
  return out;
}
