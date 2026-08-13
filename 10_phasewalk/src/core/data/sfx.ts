// core/data/sfx.ts — pure SFX recipes (no AudioContext imports; repo convention).
export interface SfxRecipe {
  id: string
  wave: OscillatorType
  from: number          // Hz
  to?: number           // Hz glide target
  dur: number           // seconds
  vol: number           // 0..1
  when?: number         // delay
}

export const SFX: Record<string, SfxRecipe> = {
  switch: { id: 'switch', wave: 'sine', from: 0, dur: 0.09, vol: 0.5 },          // from = phase freq, set at play
  phaseBounce: { id: 'phaseBounce', wave: 'triangle', from: 300, to: 700, dur: 0.22, vol: 0.4 },
  collect: { id: 'collect', wave: 'sine', from: 880, to: 1320, dur: 0.18, vol: 0.5 },
  gate: { id: 'gate', wave: 'sine', from: 660, dur: 0.35, vol: 0.5, when: 0.08 },
  wire: { id: 'wire', wave: 'sawtooth', from: 120, to: 90, dur: 0.12, vol: 0.15 },
  vent: { id: 'vent', wave: 'sine', from: 200, to: 320, dur: 0.3, vol: 0.2 },
  death: { id: 'death', wave: 'sine', from: 400, to: 80, dur: 0.5, vol: 0.5 },
  clear: { id: 'clear', wave: 'triangle', from: 660, dur: 0.5, vol: 0.5 },
}
