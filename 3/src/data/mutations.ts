import type { MutationDef } from '../core/types';

export const MUTATIONS: Record<string, MutationDef> = {
  'viral-spores': {
    id: 'viral-spores',
    name: 'Viral Spores',
    benefit: 'Bio weapons spread 2x between targets.',
    bane: 'Earth gains Plague Defenses: nanites auto-purge after 2 days.',
    baneDelay: 2,
    damageMod: { bio: 1.5 },
    baneHpMod: 0.2,
  },
  'overclocked-cortex': {
    id: 'overclocked-cortex',
    name: 'Overclocked Cortex',
    benefit: 'Virus puzzles get 2 extra seconds.',
    bane: 'Earth hacks you back: lose 5 hull every 3 days.',
    baneDelay: 3,
    damageMod: {},
    baneHpMod: 0,
  },
  'black-sun-core': {
    id: 'black-sun-core',
    name: 'Black Sun Core',
    benefit: 'Doomsday Ray cooldown halved, +25% all damage.',
    bane: 'Earth detects the charge: missile interception chance drops 40%.',
    baneDelay: 1,
    damageMod: { kinetic: 1.25, energy: 1.25, radiation: 1.25, bio: 1.25, emp: 1.25 },
    baneHpMod: 0.15,
  },
  'mind-static': {
    id: 'mind-static',
    name: 'Mind Static',
    benefit: 'Propaganda affects 2x population per broadcast.',
    bane: 'Unrest spreads to your crew: morale decays, -10 max hull.',
    baneDelay: 1,
    hullBonus: -10,
    damageMod: {},
    baneHpMod: 0.1,
  },
  'hull-weavers': {
    id: 'hull-weavers',
    name: 'Hull Weavers',
    benefit: 'Auto-repair 8% of max hull per day.',
    bane: 'Earth mines orbit: random hull damage each day.',
    baneDelay: 1,
    repairBonus: 8,
    damageMod: {},
    baneHpMod: 0.1,
  },
  'quantum-shielding': {
    id: 'quantum-shielding',
    name: 'Quantum Shielding',
    benefit: 'Start each combat with a 30% shield absorbing one hit.',
    bane: 'Earth retrofits defenses: all target HP +25%.',
    baneDelay: 2,
    damageMod: {},
    baneHpMod: 0.25,
  },
  'chrono-accelerators': {
    id: 'chrono-accelerators',
    name: 'Chrono Accelerators',
    benefit: 'Assault window extended by +30 seconds each combat.',
    bane: 'Earth tracks your drift: one extra nuclear missile per day.',
    baneDelay: 2,
    damageMod: {},
    baneHpMod: 0.1,
  },
  'hollow-points': {
    id: 'hollow-points',
    name: 'Hollow-Point Munitions',
    benefit: 'Kinetic and energy weapons +40%.',
    bane: 'Living tissue resists: bio weapons -50%.',
    baneDelay: 1,
    damageMod: { kinetic: 1.4, energy: 1.4, bio: 0.5 },
    baneHpMod: 0.15,
  },
};

export const MUTATION_IDS = Object.keys(MUTATIONS);

export function getMutation(id: string): MutationDef {
  const m = MUTATIONS[id];
  if (!m) throw new Error(`Unknown mutation: ${id}`);
  return m;
}
