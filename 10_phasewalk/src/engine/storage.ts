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
      // validate shape before trusting it — a malformed/legacy blob would NaN-poison totalPhaseDust
      if (
        parsed && typeof parsed === 'object' &&
        typeof parsed.totalPhaseDust === 'number' &&
        parsed.bestSwitches && typeof parsed.bestSwitches === 'object'
      ) return parsed as Progress
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
