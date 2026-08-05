// engine/storage.ts — PersistPort 实现（localStorage，TDD §3.3 冻结键名）
// TODO agent-engine: load/save 版本化键名 + 读取失败静默回退。

import type { PersistPort } from '../core/simulation/Simulation';
import { STORAGE_KEY } from '../core/types';
import type { StorageKey } from '../core/types';

export const storage: PersistPort = {
  load<T>(key: StorageKey): T | null {
    try {
      const raw = localStorage.getItem(STORAGE_KEY[key]);
      return raw ? (JSON.parse(raw) as T) : null;
    } catch {
      return null;
    }
  },
  save(key: StorageKey, value: unknown): void {
    try {
      localStorage.setItem(STORAGE_KEY[key], JSON.stringify(value));
    } catch {
      // 静默失败（隐私模式/超限）
    }
  },
};
