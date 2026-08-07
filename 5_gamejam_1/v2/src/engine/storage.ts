// engine/storage.ts — localStorage 持久化（模拟端 StoragePort）

import type { StoragePort } from '../core/simulation/Simulation';

function safeGet(key: string): string | null {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

function safeSet(key: string, value: string): void {
  try {
    localStorage.setItem(key, value);
  } catch {
    // 隐私模式等场景静默降级
  }
}

export const storage: StoragePort = {
  load<T>(key: string): T | null {
    const raw = safeGet(key);
    if (raw === null) return null;
    try {
      return JSON.parse(raw) as T;
    } catch {
      return null;
    }
  },
  save(key: string, value: unknown): void {
    safeSet(key, JSON.stringify(value));
  },
};
