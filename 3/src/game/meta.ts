import type { SaveFile } from '../core/types';
import { ALL_WEAPONS, STARTING_WEAPONS } from '../core/types';
import { loadSave, saveSave } from '../core/storage';

export const WEAPON_COSTS: Record<string, number> = {
  'plasma-lance': 0,
  'kinetic-rods': 0,
  'radiation-cloud': 15,
  'nanite-swarm': 20,
  'emp-pulse': 25,
  'graviton-lance': 35,
  'solar-flare': 30,
  'doomsday-ray': 60,
};

export const MUTATION_COSTS: Record<string, number> = {
  'viral-spores': 12,
  'overclocked-cortex': 12,
  'black-sun-core': 18,
  'mind-static': 10,
  'hull-weavers': 12,
  'quantum-shielding': 16,
  'chrono-accelerators': 14,
  'hollow-points': 15,
};

export interface MetaStore {
  save: SaveFile;
  buyWeapon(id: string): boolean;
  buyMutation(id: string): boolean;
  ownedWeapons(): string[];
  recordRun(outcome: string, alienium: number, bloodless: boolean): void;
  persist(): void;
}

export function createMetaStore(): MetaStore {
  const save = loadSave();
  const owned = (): Set<string> => new Set(save.unlocks.weapons);
  const persist = (): void => saveSave(save);
  const spend = (cost: number): boolean => {
    if (cost > save.alienium) return false;
    save.alienium -= cost;
    return true;
  };
  return {
    save,
    buyWeapon(id: string): boolean {
      if (!(id in WEAPON_COSTS)) return false;
      if (owned().has(id)) return false;
      const cost = WEAPON_COSTS[id];
      if (!spend(cost)) return false;
      save.unlocks.weapons.push(id);
      persist();
      return true;
    },
    buyMutation(id: string): boolean {
      if (!(id in MUTATION_COSTS)) return false;
      if (save.unlocks.mutations.includes(id)) return false;
      const cost = MUTATION_COSTS[id];
      if (!spend(cost)) return false;
      save.unlocks.mutations.push(id);
      persist();
      return true;
    },
    ownedWeapons(): string[] {
      const set = owned();
      return ALL_WEAPONS.filter((id) => set.has(id) || STARTING_WEAPONS.includes(id));
    },
    recordRun(outcome: string, alienium: number, bloodless: boolean): void {
      save.alienium += alienium;
      save.stats.runs += 1;
      if (outcome === 'annihilation' || outcome === 'shutdown' || outcome === 'conversion') save.stats.wins += 1;
      if (bloodless) save.stats.bloodlessWins += 1;
      persist();
    },
    persist,
  };
}
