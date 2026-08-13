/**
 * core/data/patapons.ts - v2.0 character templates
 *
 * 3 army units (all side P1, distinct body tints) + 1 boss (Moloch).
 */

export interface PataCharacter {
  id: string;
  bodyColor: string;
  eyeColor: string;
  featherColors: [string, string, string];
  /** boss-only horn color (ignored for army units) */
  hornColor?: string;
}

export const PATA_CHARACTERS: readonly PataCharacter[] = [
  {
    id: 'pata-emerald',
    bodyColor: '#3affc8',
    eyeColor: '#ffffff',
    featherColors: ['#c83aff', '#3affc8', '#ffd83a'],
  },
  {
    id: 'pata-lime',
    bodyColor: '#9aff3a',
    eyeColor: '#ffffff',
    featherColors: ['#3a8aff', '#9aff3a', '#ffd83a'],
  },
  {
    id: 'pata-teal',
    bodyColor: '#3ac8ff',
    eyeColor: '#ffffff',
    featherColors: ['#ff3a8a', '#3ac8ff', '#ffd83a'],
  },
  {
    id: 'boss-moloch',
    bodyColor: '#ff3a3a',
    eyeColor: '#fff3a0',
    featherColors: ['#ff8a3a', '#ff3a3a', '#3a3aff'],
    hornColor: '#ffd83a',
  },
] as const;

export function getCharacterById(id: string): PataCharacter {
  const found = PATA_CHARACTERS.find((c) => c.id === id);
  if (!found) throw new Error(`No PATA_CHARACTER for id=${id}`);
  return found;
}
