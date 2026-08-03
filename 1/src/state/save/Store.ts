// IndexedDB store via idb wrapper.

import { openDB, type IDBPDatabase } from 'idb';
import type { SaveSchemaV1, RunStateSnapshot, RunSummary, Settings, MetaProgress } from '../types.js';
import { Env } from '../../app/Env.js';

const DB_NAME = 'alien-invader';
const DB_VERSION = 1;

export class Store {
  private dbPromise: Promise<IDBPDatabase> | null = null;

  private async db(): Promise<IDBPDatabase> {
    if (!this.dbPromise) {
      this.dbPromise = openDB(DB_NAME, DB_VERSION, {
        upgrade(db) {
          if (!db.objectStoreNames.contains(Env.SAVE_KEY_SETTINGS)) db.createObjectStore(Env.SAVE_KEY_SETTINGS);
          if (!db.objectStoreNames.contains(Env.SAVE_KEY_META)) db.createObjectStore(Env.SAVE_KEY_META);
          if (!db.objectStoreNames.contains(Env.SAVE_KEY_RUNS)) db.createObjectStore(Env.SAVE_KEY_RUNS);
          if (!db.objectStoreNames.contains(Env.SAVE_KEY_LIVE)) db.createObjectStore(Env.SAVE_KEY_LIVE);
        },
      });
    }
    return this.dbPromise;
  }

  async loadSettings(): Promise<Settings | null> {
    const db = await this.db();
    return (await db.get(Env.SAVE_KEY_SETTINGS, 'current')) as Settings | null;
  }

  async saveSettings(settings: Settings): Promise<void> {
    const db = await this.db();
    await db.put(Env.SAVE_KEY_SETTINGS, settings, 'current');
  }

  async loadMeta(): Promise<MetaProgress | null> {
    const db = await this.db();
    return (await db.get(Env.SAVE_KEY_META, 'current')) as MetaProgress | null;
  }

  async saveMeta(meta: MetaProgress): Promise<void> {
    const db = await this.db();
    await db.put(Env.SAVE_KEY_META, meta, 'current');
  }

  async appendRun(run: RunSummary): Promise<void> {
    const db = await this.db();
    await db.put(Env.SAVE_KEY_RUNS, run, run.id);
  }

  async listRuns(): Promise<RunSummary[]> {
    const db = await this.db();
    return (await db.getAll(Env.SAVE_KEY_RUNS)) as RunSummary[];
  }

  async saveLive(state: RunStateSnapshot): Promise<void> {
    const db = await this.db();
    await db.put(Env.SAVE_KEY_LIVE, state, Env.SAVE_KEY_LIVE);
  }

  async loadLive(): Promise<RunStateSnapshot | null> {
    const db = await this.db();
    return (await db.get(Env.SAVE_KEY_LIVE, Env.SAVE_KEY_LIVE)) as RunStateSnapshot | null;
  }

  async clearLive(): Promise<void> {
    const db = await this.db();
    await db.delete(Env.SAVE_KEY_LIVE, Env.SAVE_KEY_LIVE);
  }
}

export const store = new Store();

export function defaultSettings(): Settings {
  return {
    volume: 0.8,
    musicVolume: 0.6,
    sfxVolume: 0.8,
    voiceVolume: 0.5,
    screenShake: 1.0,
    flashes: 1.0,
    distortion: 1.0,
    aimAssist: true,
    untimedPuzzles: false,
    bindings: {},
  };
}

export function defaultMeta(): MetaProgress {
  return {
    unlockedArchetypes: [],
    unlockedCommanders: [],
    unlockedAdaptations: [],
    unlockedWeapons: [],
    intel: [],
  };
}