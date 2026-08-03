import type { MetaProgress } from "../logic/meta";
import { DEFAULT_META } from "../logic/meta";

const KEY = "alien-invader-meta-v1";

export function loadMeta(): MetaProgress {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return DEFAULT_META;
    const parsed = JSON.parse(raw) as MetaProgress;
    return { ...DEFAULT_META, ...parsed, unlocks: { ...DEFAULT_META.unlocks, ...parsed.unlocks } };
  } catch {
    return DEFAULT_META;
  }
}

export function saveMeta(meta: MetaProgress): void {
  try {
    localStorage.setItem(KEY, JSON.stringify(meta));
  } catch {
    // storage unavailable; ignore
  }
}

export function clearMeta(): void {
  try {
    localStorage.removeItem(KEY);
  } catch {
    // ignore
  }
}
