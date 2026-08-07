/**
 * engine/storage.ts — localStorage 适配
 *
 * M3.2 由 agent-engine 实现。
 * 读取失败 / 形状不符 → 静默回退默认值(不抛错);写入失败 → 静默降级。
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

/** 形状校验:stats(全 number 字段) */
function sanitizeStats(value: unknown): PersistedStats {
  if (typeof value !== 'object' || value === null) return { ...DEFAULT_STATS };
  const o = value as Record<string, unknown>;
  return {
    totalMatches: typeof o.totalMatches === 'number' ? o.totalMatches : DEFAULT_STATS.totalMatches,
    p1Wins: typeof o.p1Wins === 'number' ? o.p1Wins : DEFAULT_STATS.p1Wins,
    aiWins: typeof o.aiWins === 'number' ? o.aiWins : DEFAULT_STATS.aiWins,
    longestRally: typeof o.longestRally === 'number' ? o.longestRally : DEFAULT_STATS.longestRally,
    lastMatchAt: typeof o.lastMatchAt === 'number' ? o.lastMatchAt : DEFAULT_STATS.lastMatchAt,
  };
}

/** 形状校验:settings(muted boolean / volume number) */
function sanitizeSettings(value: unknown): PersistedSettings {
  if (typeof value !== 'object' || value === null) return { ...DEFAULT_SETTINGS };
  const o = value as Record<string, unknown>;
  return {
    muted: typeof o.muted === 'boolean' ? o.muted : DEFAULT_SETTINGS.muted,
    volume: typeof o.volume === 'number' ? o.volume : DEFAULT_SETTINGS.volume,
  };
}

function safeReadStats(): PersistedStats {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_STATS);
    if (!raw) return { ...DEFAULT_STATS };
    return sanitizeStats(JSON.parse(raw) as unknown);
  } catch {
    return { ...DEFAULT_STATS };
  }
}

function safeReadSettings(): PersistedSettings {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_SETTINGS);
    if (!raw) return { ...DEFAULT_SETTINGS };
    return sanitizeSettings(JSON.parse(raw) as unknown);
  } catch {
    return { ...DEFAULT_SETTINGS };
  }
}

function safeWrite(key: string, value: unknown): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // localStorage 不可用(隐私模式 / 配额满)→ 静默降级
  }
}

/** 读取战绩(失败 / 形状不符 → 默认值) */
export function readStats(): PersistedStats {
  return safeReadStats();
}

/** 写入战绩 */
export function writeStats(stats: PersistedStats): void {
  safeWrite(STORAGE_KEY_STATS, stats);
}

/** 读取设置(失败 / 形状不符 → 默认值) */
export function readSettings(): PersistedSettings {
  return safeReadSettings();
}

/** 写入设置 */
export function writeSettings(settings: PersistedSettings): void {
  safeWrite(STORAGE_KEY_SETTINGS, settings);
}

/** 清空全部存档(菜单 Reset) */
export function resetAll(): void {
  try {
    localStorage.removeItem(STORAGE_KEY_STATS);
    localStorage.removeItem(STORAGE_KEY_SETTINGS);
  } catch {
    // 静默
  }
}
