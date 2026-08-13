// engine/storage.ts — localStorage wrapper (key 10-phasewalk.v1.progress).
export interface Progress {
  bestSwitches: Record<string, number>
  totalPhaseDust: number
}

const KEY = '10-phasewalk.v1.progress'

export function loadProgress(): Progress {
  try {
    const raw = localStorage.getItem(KEY)
    if (raw) return JSON.parse(raw) as Progress
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
