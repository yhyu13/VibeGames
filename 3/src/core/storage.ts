import type { SaveFile } from './types';

const KEY = 'alien-invader-save-v1';

export const DEFAULT_SAVE: SaveFile = {
  version: 1,
  alienium: 0,
  unlocks: { weapons: ['plasma-lance', 'kinetic-rods'], mutations: [], chassis: [], factions: [] },
  stats: { runs: 0, wins: 0, bloodlessWins: 0 },
  settings: { audio: { sfx: 0.8, music: 0.5 }, gfx: { bloom: true, quality: 'high' } },
};

export function loadSave(): SaveFile {
  if (typeof localStorage === 'undefined') return structuredClone(DEFAULT_SAVE);
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return structuredClone(DEFAULT_SAVE);
    const parsed = JSON.parse(raw) as Partial<SaveFile>;
    return migrate(parsed);
  } catch {
    return structuredClone(DEFAULT_SAVE);
  }
}

export function saveSave(save: SaveFile): void {
  if (typeof localStorage === 'undefined') return;
  try {
    localStorage.setItem(KEY, JSON.stringify(save));
  } catch {
    // storage full / private mode — ignore, meta loss only
  }
}

export function migrate(parsed: Partial<SaveFile>): SaveFile {
  const base = structuredClone(DEFAULT_SAVE);
  if (parsed.version !== 1) return base;
  const save: SaveFile = { ...base, ...parsed, unlocks: { ...base.unlocks, ...parsed.unlocks } };
  save.settings = { ...base.settings, ...parsed.settings };
  save.settings.audio = { ...base.settings.audio, ...parsed.settings?.audio };
  save.settings.gfx = { ...base.settings.gfx, ...parsed.settings?.gfx };
  save.stats = { ...base.stats, ...parsed.stats };
  return save;
}
