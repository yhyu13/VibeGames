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
  // A noise transient riding the tone. An impact's weight lives almost entirely here — a bare
  // tone reads as a beep however low it is, which is why TDD §4 spells the landing as
  // "triangle 90 Hz thud + noise burst". Level follows the tone's, so the whole thud carries the
  // intensity the fall earned rather than the recipe alone.
  noise?: { dur: number; vol: number }
}

// One cue per movement beat, and only for beats the sim actually SIGNALS — the ear is never
// told about an event the eye was not, so the two can never disagree. 跳跃 rises (tall-and-thin
// at takeoff), 落地 falls (the squash), 落空 is a dry click (the denied press, which moves
// nothing and is therefore invisible to the position stream). Movement verbs must be audible,
// not silent — the same rule 10_phasewalk's core/data/sfx.ts states for its own verbs.
export const SFX: Record<string, SfxRecipe> = {
  jump: { id: 'jump', wave: 'sine', from: 330, to: 500, dur: 0.1, vol: 0.26 }, // 一段跳 11 m/s
  doubleJump: { id: 'doubleJump', wave: 'triangle', from: 430, to: 680, dur: 0.11, vol: 0.24 }, // 二段跳 9.5 m/s, lighter and higher
  // 落地 — TDD §4's thud taken literally: triangle 90 Hz + a 40 ms noise burst. The tone carries
  // the pitch of the impact, the burst carries the transient; together they read as something
  // heavy setting down, where the sine glide alone read as a boop. How LOUD this lands is
  // deliberately not the recipe's business — AudioManager scales it by the fall that earned it.
  land: { id: 'land', wave: 'triangle', from: 90, dur: 0.09, vol: 0.24, noise: { dur: 0.04, vol: 0.3 } },
  denied: { id: 'denied', wave: 'square', from: 170, to: 120, dur: 0.06, vol: 0.13 },
  // 坠落 — TDD §4's "descending sine 400→80, 500 ms", and the longest cue in the set by a factor of
  // four, which is the point: the other beats are transient (an impact, a press) and this one is a
  // slide with no transient at all, because a fall out of the world does not end in an impact. It
  // has to carry the whole beat on pitch alone, so it is the one cue whose meaning is its DIRECTION.
  fall: { id: 'fall', wave: 'sine', from: 400, to: 80, dur: 0.5, vol: 0.2 },
}
