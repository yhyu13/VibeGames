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
  death: { id: 'death', wave: 'sine', from: 400, to: 80, dur: 0.5, vol: 0.5 },
  clear: { id: 'clear', wave: 'triangle', from: 660, dur: 0.5, vol: 0.5 },
  // v4 相灵弹
  reflect: { id: 'reflect', wave: 'triangle', from: 520, to: 1040, dur: 0.18, vol: 0.45 },   // plasma absorb + reflect
  disperse: { id: 'disperse', wave: 'sine', from: 330, to: 110, dur: 0.35, vol: 0.4 },       // liquid 被打散
  destroy: { id: 'destroy', wave: 'sawtooth', from: 220, to: 60, dur: 0.4, vol: 0.5 },       // emitter 拆塔
}
