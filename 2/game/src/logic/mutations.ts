import type { DamageType, MutatorDefinition, MutationOffer } from "../core/types";
import { mulberry32 } from "../core/rng";

const MUTATION_POOL: MutatorDefinition[] = [
  {
    id: "viralSpores",
    name: "Viral Spores",
    benefitDescription: "Nanite weapons spread 2x.",
    baneDescription: "Earth gains Plague Defenses: auto-purge nanites after 2 turns.",
    benefit: { biological: 2 },
    bane: { plagueDefenses: true },
  },
  {
    id: "overclockedCortex",
    name: "Overclocked Cortex",
    benefitDescription: "Virus actions take 1 less turn.",
    baneDescription: "Earth hacks you back: lose 1 system point per 3 days.",
    benefit: { virusSpeed: 1 },
    bane: { hackBack: true },
  },
  {
    id: "blackSunCore",
    name: "Black Sun Core",
    benefitDescription: "Doomsday Ray cooldown halved.",
    baneDescription: "Earth detects the charge: missile interception chance +40%.",
    benefit: { doomsdayCooldownMod: 0.5 },
    bane: { missileInterceptionBonus: 0.4 },
  },
  {
    id: "mindStatic",
    name: "Mind Static",
    benefitDescription: "Propaganda affects 2x population.",
    baneDescription: "Unrest spreads to your crew: morale decays.",
    benefit: { propagandaPower: 2 },
    bane: { crewMoraleDecay: true },
  },
  {
    id: "hullWeavers",
    name: "Hull Weavers",
    benefitDescription: "Auto-repair 10% hull per day.",
    baneDescription: "Earth mines orbit: random hazard strikes each day.",
    benefit: { repairPerDay: 0.1 },
    bane: { orbitMines: true },
  },
  {
    id: "quantumShielding",
    name: "Quantum Shielding",
    benefitDescription: "Immune to one attack type.",
    baneDescription: "Earth retrofits all defenses against that type in 2 days.",
    benefit: { immunityType: "kinetic" },
    bane: { retrofittedType: "kinetic" },
  },
];

const POOL_BY_ID = new Map(MUTATION_POOL.map((m) => [m.id, m]));

export function getMutation(id: string): MutatorDefinition {
  const m = POOL_BY_ID.get(id);
  if (!m) throw new Error(`Unknown mutation: ${id}`);
  return m;
}

export function generateMutationOffers(seed: number, day: number, takenIds: string[]): MutationOffer[] {
  const rng = mulberry32(seed * 7919 + day * 31);
  const available = MUTATION_POOL.filter((m) => !takenIds.includes(m.id));
  const offers = rng.shuffle(available).slice(0, 3);
  return offers.map((m) => ({ mutation: m, offeredDay: day }));
}

export function benefitForType(mutation: MutatorDefinition, type: DamageType): number {
  return mutation.benefit[type] ?? 1;
}

export function mutationPool(seed: number): MutatorDefinition[] {
  return mulberry32(seed).shuffle(MUTATION_POOL);
}
