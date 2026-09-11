// core/data/sfx.ts — pure SFX recipes (no AudioContext imports; repo convention).
// GDD §2 freezes this exact path and this catalogue; the game ships zero audio files.
// The four shapes this catalogue uses, spelled out rather than borrowing the DOM's
// OscillatorType — core/ is platform-pure (TDD §2: zero three/react/DOM), and a lib reference
// to satisfy a 4-value union would be the only DOM name in the whole directory.
export type SfxWave = 'sine' | 'square' | 'sawtooth' | 'triangle'

export interface SfxRecipe {
  id: string
  wave: SfxWave
  from: number // Hz
  to?: number // Hz glide target
  dur: number // seconds
  vol: number // 0..1
}

// One cue per movement beat, and only for beats the sim actually SIGNALS — the ear is never
// told about an event the eye was not, so the two can never disagree. 跳跃 rises (tall-and-thin
// at takeoff), 落地 falls (the squash), 落空 is a dry click (the denied press, which moves
// nothing and is therefore invisible to the position stream). Movement verbs must be audible,
// not silent — the same rule 10_phasewalk's core/data/sfx.ts states for its own verbs.
export const SFX: Record<string, SfxRecipe> = {
  jump: { id: 'jump', wave: 'sine', from: 330, to: 500, dur: 0.1, vol: 0.26 }, // 一段跳 11 m/s
  doubleJump: { id: 'doubleJump', wave: 'triangle', from: 430, to: 680, dur: 0.11, vol: 0.24 }, // 二段跳 9.5 m/s, lighter and higher
  land: { id: 'land', wave: 'sine', from: 190, to: 80, dur: 0.09, vol: 0.24 }, // the soft thud (GDD §4)
  denied: { id: 'denied', wave: 'square', from: 170, to: 120, dur: 0.06, vol: 0.13 },
}
