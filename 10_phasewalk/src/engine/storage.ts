// engine/storage.ts — localStorage wrapper (key 10-phasewalk.v1.progress).
export interface Progress {
  bestSwitches: Record<string, number>
  totalPhaseDust: number
}

const KEY = '10-phasewalk.v1.progress'

export function loadProgress(): Progress {
  try {
    const raw = localStorage.getItem(KEY)
    if (raw) {
      const parsed = JSON.parse(raw)
      // validate shape before trusting it — a malformed/legacy blob would NaN-poison totalPhaseDust.
      // Per-entry switch scores must be finite numbers too: `Math.min(score ?? Infinity, switches)`
      // only null-coalesces null/undefined, so a string like "fast" would coerce to NaN and poison
      // the min-switch display. Strip any non-finite entries instead of trusting the blob.
      if (
        parsed && typeof parsed === 'object' &&
        typeof parsed.totalPhaseDust === 'number' && Number.isFinite(parsed.totalPhaseDust) &&
        parsed.bestSwitches && typeof parsed.bestSwitches === 'object'
      ) {
        const best: Record<string, number> = {}
        for (const [k, v] of Object.entries(parsed.bestSwitches as Record<string, unknown>)) {
          if (typeof v === 'number' && Number.isFinite(v)) best[k] = v
        }
        return { bestSwitches: best, totalPhaseDust: parsed.totalPhaseDust as number }
      }
    }
  } catch {
    // corrupted storage — fall through
  }
  return { bestSwitches: {}, totalPhaseDust: 0 }
}

export function saveProgress(p: Progress): void {
  try {
    localStorage.setItem(KEY, JSON.stringify(p))
  } catch {
    // storage unavailable — ignore
  }
}
