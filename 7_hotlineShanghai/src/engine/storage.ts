// src/engine/storage.ts — localStorage 持久化适配(TDD §3.3)
// 3 键:hotline-shanghai.v1.stats / settings / unlocks。
// 读取失败 / JSON 解析失败 / 形状不符 → 静默回退默认值并覆盖,不抛错。
import type {
  MaskId,
  MissionId,
  PersistedSettings,
  PersistedStats,
  PersistedUnlocks,
  Rating,
} from '../core/types';

const KEYS = {
  stats: 'hotline-shanghai.v1.stats',
  settings: 'hotline-shanghai.v1.settings',
  unlocks: 'hotline-shanghai.v1.unlocks',
} as const;

// ─── 默认值工厂(每次返回新对象,防止调用方误改共享默认值)───
function defaultStats(): PersistedStats {
  return {
    totalMissions: 0,
    bestScoreByMission: {},
    bestRatingByMission: {},
    lastMissionAt: 0,
  };
}

function defaultSettings(): PersistedSettings {
  return { muted: false, volume: 0.5, rcQuality: 'med' };
}

function defaultUnlocks(): PersistedUnlocks {
  return { masks: [], missions: [] };
}

// ─── 形状校验(类型守卫)───
const RATINGS: readonly Rating[] = ['S', 'A', 'B', 'C'];
const MASK_IDS: readonly MaskId[] = [
  'red_face',
  'black_face',
  'white_face',
  'blue_face',
  'green_face',
  'gold_face',
];
const MISSION_IDS: readonly MissionId[] = ['m1_workshop', 'm2_teahouse', 'm3_print', 'm4_postman'];

function isRecord(v: unknown): v is Record<string, unknown> {
  return typeof v === 'object' && v !== null && !Array.isArray(v);
}

function isFiniteNumber(v: unknown): v is number {
  return typeof v === 'number' && Number.isFinite(v);
}

function isRating(v: unknown): v is Rating {
  return typeof v === 'string' && RATINGS.includes(v as Rating);
}

function isMaskId(v: unknown): v is MaskId {
  return typeof v === 'string' && MASK_IDS.includes(v as MaskId);
}

function isMissionId(v: unknown): v is MissionId {
  return typeof v === 'string' && MISSION_IDS.includes(v as MissionId);
}

function isStats(v: unknown): v is PersistedStats {
  if (!isRecord(v)) return false;
  if (!isFiniteNumber(v.totalMissions) || !isFiniteNumber(v.lastMissionAt)) return false;
  if (!isRecord(v.bestScoreByMission)) return false;
  for (const score of Object.values(v.bestScoreByMission)) {
    if (!isFiniteNumber(score)) return false;
  }
  if (!isRecord(v.bestRatingByMission)) return false;
  for (const rating of Object.values(v.bestRatingByMission)) {
    if (!isRating(rating)) return false;
  }
  return true;
}

function isSettings(v: unknown): v is PersistedSettings {
  if (!isRecord(v)) return false;
  if (typeof v.muted !== 'boolean') return false;
  if (!isFiniteNumber(v.volume)) return false;
  if (v.volume < 0 || v.volume > 1) return false;
  return v.rcQuality === 'low' || v.rcQuality === 'med' || v.rcQuality === 'high';
}

function isUnlocks(v: unknown): v is PersistedUnlocks {
  if (!isRecord(v)) return false;
  if (!Array.isArray(v.masks) || !v.masks.every(isMaskId)) return false;
  if (!Array.isArray(v.missions) || !v.missions.every(isMissionId)) return false;
  return true;
}

// ─── 读写(静默容错)───
function load<T>(key: string, factory: () => T, isValid: (v: unknown) => v is T): T {
  let raw: string | null = null;
  try {
    raw = localStorage.getItem(key);
  } catch {
    return factory(); // localStorage 不可用(隐私模式等)→ 默认值
  }
  if (raw === null) return factory(); // 从未写入 → 默认值

  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    write(key, factory()); // 解析失败 → 覆盖为默认值
    return factory();
  }
  if (!isValid(parsed)) {
    write(key, factory()); // 形状不符 → 覆盖为默认值
    return factory();
  }
  return parsed;
}

function write(key: string, value: unknown): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // 静默失败(配额 / 隐私模式)
  }
}

// ─── 公开 API ───
export const storage = {
  loadStats(): PersistedStats {
    return load(KEYS.stats, defaultStats, isStats);
  },
  saveStats(s: PersistedStats): void {
    write(KEYS.stats, s);
  },
  loadSettings(): PersistedSettings {
    return load(KEYS.settings, defaultSettings, isSettings);
  },
  saveSettings(s: PersistedSettings): void {
    write(KEYS.settings, s);
  },
  loadUnlocks(): PersistedUnlocks {
    return load(KEYS.unlocks, defaultUnlocks, isUnlocks);
  },
  saveUnlocks(u: PersistedUnlocks): void {
    write(KEYS.unlocks, u);
  },
};
