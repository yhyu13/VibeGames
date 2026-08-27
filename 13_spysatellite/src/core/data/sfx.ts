// core/data/sfx.ts — pure SFX recipes (no AudioContext).
export interface SfxRecipe {
  id: string
  wave: OscillatorType
  from: number
  to?: number
  dur: number
  vol: number
  when?: number
}

export const SFX: Record<string, SfxRecipe> = {
  sarOn: { id: 'sarOn', wave: 'sine', from: 180, to: 420, dur: 0.12, vol: 0.22 },
  sarOff: { id: 'sarOff', wave: 'sine', from: 320, to: 120, dur: 0.1, vol: 0.16 },
  lock: { id: 'lock', wave: 'square', from: 880, to: 1320, dur: 0.14, vol: 0.28 },
  lockDrop: { id: 'lockDrop', wave: 'sawtooth', from: 240, to: 70, dur: 0.28, vol: 0.3 },
  overheat: { id: 'overheat', wave: 'sawtooth', from: 160, to: 40, dur: 0.45, vol: 0.35 },
  tx: { id: 'tx', wave: 'triangle', from: 640, to: 980, dur: 0.11, vol: 0.3 },
  beatFail: { id: 'beatFail', wave: 'square', from: 180, to: 90, dur: 0.22, vol: 0.28 },
  beatAsk: { id: 'beatAsk', wave: 'sine', from: 520, dur: 0.08, vol: 0.2 },
  shot: { id: 'shot', wave: 'triangle', from: 90, to: 40, dur: 0.55, vol: 0.4 },
  win: { id: 'win', wave: 'sine', from: 440, to: 880, dur: 0.4, vol: 0.32 },
  lose: { id: 'lose', wave: 'sine', from: 220, to: 70, dur: 0.5, vol: 0.32 },
}
