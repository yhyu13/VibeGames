export interface MetaProgress {
  alienium: number;
  unlocks: {
    weapons: string[]; // weapon ids beyond the starting 3
    loadoutSlots: number;
    chassis: number; // 0 = base, 1+ = larger hull
    faction: string | null;
    mutators: string[];
  };
}

export const DEFAULT_META: MetaProgress = {
  alienium: 0,
  unlocks: { weapons: [], loadoutSlots: 3, chassis: 0, faction: null, mutators: [] },
};

export const WEAPON_COSTS: Record<string, number> = {
  naniteSwarm: 30,
  empPulse: 40,
  doomsdayRay: 80,
};

export function awardAlienium(base: number, bloodless: boolean, modifier: number): number {
  const mult = bloodless ? 2 : 1;
  return Math.round(base * mult * modifier);
}

export function canAfford(meta: MetaProgress, cost: number): boolean {
  return meta.alienium >= cost;
}

export function purchaseWeapon(meta: MetaProgress, weaponId: string): MetaProgress {
  const cost = WEAPON_COSTS[weaponId];
  if (cost === undefined || !canAfford(meta, cost)) return meta;
  if (meta.unlocks.weapons.includes(weaponId)) return meta;
  return {
    ...meta,
    alienium: meta.alienium - cost,
    unlocks: { ...meta.unlocks, weapons: [...meta.unlocks.weapons, weaponId] },
  };
}

export function purchaseLoadoutSlot(meta: MetaProgress): MetaProgress {
  const cost = 60;
  if (!canAfford(meta, cost) || meta.unlocks.loadoutSlots >= 5) return meta;
  return {
    ...meta,
    alienium: meta.alienium - cost,
    unlocks: { ...meta.unlocks, loadoutSlots: meta.unlocks.loadoutSlots + 1 },
  };
}

export function purchaseChassis(meta: MetaProgress): MetaProgress {
  const cost = 50;
  if (!canAfford(meta, cost) || meta.unlocks.chassis >= 2) return meta;
  return {
    ...meta,
    alienium: meta.alienium - cost,
    unlocks: { ...meta.unlocks, chassis: meta.unlocks.chassis + 1 },
  };
}

export function hullForChassis(chassis: number): number {
  return 100 + chassis * 25;
}

export function applyMetaToShip(ship: { maxHull: number; hull: number }, meta: MetaProgress): void {
  const target = hullForChassis(meta.unlocks.chassis);
  ship.maxHull = target;
  ship.hull = target;
}
