import { describe, expect, it } from 'vitest';
import { DEFAULT_SAVE, loadSave, migrate, saveSave } from '../src/core/storage';
import { createMetaStore } from '../src/game/meta';

describe('storage', () => {
  it('loadSave returns defaults when no storage exists', () => {
    const save = loadSave();
    expect(save.version).toBe(1);
    expect(save.alienium).toBe(0);
    expect(save.unlocks.weapons).toContain('plasma-lance');
  });

  it('saveSave is a no-op without storage', () => {
    expect(() => saveSave(loadSave())).not.toThrow();
  });

  it('migrate fills missing fields from defaults', () => {
    const save = migrate({ version: 1, alienium: 50 });
    expect(save.alienium).toBe(50);
    expect(save.unlocks.weapons).toEqual(DEFAULT_SAVE.unlocks.weapons);
    expect(save.settings.gfx.bloom).toBe(true);
    expect(save.stats.runs).toBe(0);
  });

  it('migrate rejects unknown versions', () => {
    const save = migrate({ version: 99 } as unknown as Parameters<typeof migrate>[0]);
    expect(save.alienium).toBe(0);
  });

  it('meta store records runs and awards alienium', () => {
    const store = createMetaStore();
    store.save.alienium = 0;
    store.recordRun('annihilation', 30, false);
    expect(store.save.alienium).toBe(30);
    expect(store.save.stats.runs).toBe(1);
    expect(store.save.stats.wins).toBe(1);
    store.recordRun('conversion', 40, true);
    expect(store.save.stats.bloodlessWins).toBe(1);
    expect(store.save.stats.wins).toBe(2);
  });

  it('buyWeapon respects cost and duplicates', () => {
    const store = createMetaStore();
    store.save.alienium = 100;
    expect(store.buyWeapon('radiation-cloud')).toBe(true);
    expect(store.save.alienium).toBe(85);
    expect(store.buyWeapon('radiation-cloud')).toBe(false);
    expect(store.buyWeapon('unknown-weapon')).toBe(false);
  });

  it('buyWeapon rejects when alienium is insufficient', () => {
    const store = createMetaStore();
    store.save.alienium = 5;
    expect(store.buyWeapon('doomsday-ray')).toBe(false);
  });

  it('ownedWeapons lists purchased weapons', () => {
    const store = createMetaStore();
    store.save.alienium = 100;
    store.buyWeapon('emp-pulse');
    expect(store.ownedWeapons()).toContain('emp-pulse');
    expect(store.ownedWeapons()).toContain('plasma-lance');
  });
});
