/**
 * engine/storage.ts — localStorage 适配
 *
 * M3.2 由 agent-engine 实现。当前是 M0 骨架(空函数,读不抛错)。
 */

import { STORAGE_KEY_SETTINGS, STORAGE_KEY_STATS } from '../core/constants';
import type { PersistedSettings, PersistedStats } from '../core/types';

const DEFAULT_STATS: PersistedStats = {
  totalMatches: 0,
  p1Wins: 0,
  aiWins: 0,
  longestRally: 0,
  lastMatchAt: 0,
};

const DEFAULT_SETTINGS: PersistedSettings = {
  muted: false,
  volume: 0.5,
};

function safeRead<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw) as unknown;
    if (typeof parsed !== 'object' || parsed === null) return fallback;
    return { ...fallback, ...(parsed as Partial<T>) };
  } catch {
    return fallback;
  }
}

function safeWrite<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // localStorage 不可用(隐私模式 / 配额满)→ 静默降级
  }
}

export function readStats(): PersistedStats {
  return safeRead<PersistedStats>(STORAGE_KEY_STATS, DEFAULT_STATS);
}

export function writeStats(stats: PersistedStats): void {
  safeWrite(STORAGE_KEY_STATS, stats);
}

export function readSettings(): PersistedSettings {
  return safeRead<PersistedSettings>(STORAGE_KEY_SETTINGS, DEFAULT_SETTINGS);
}

export function writeSettings(settings: PersistedSettings): void {
  safeWrite(STORAGE_KEY_SETTINGS, settings);
}
