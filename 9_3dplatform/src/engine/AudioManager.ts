// engine/AudioManager.ts — Web Audio synthesis from core/data/sfx.ts recipes (repo convention).
// Zero audio files: every cue is one oscillator + one gain, built per call.
import { SFX, type SfxRecipe } from '../core/data/sfx'
import { JUMP_VELOCITY } from '../core/constants'

export class AudioManager {
  private ctx: AudioContext | null = null

  // MUST be reached from inside a real user gesture. The start press is consumed in the rAF
  // loop, and a context first created there is not a gesture, so Chrome leaves it suspended —
  // the game would be silent while every gate stayed green (main.ts unlocks on first input).
  ensure(): void {
    if (!this.ctx) {
      const AC = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext
      if (AC) this.ctx = new AC()
    }
    if (this.ctx && this.ctx.state === 'suspended') void this.ctx.resume()
  }

  // `intensity` multiplies the recipe's own level, so a recipe stays a pure description of a SOUND
  // and the caller says how much of that sound this beat earned. 1 = exactly as written.
  play(recipe: SfxRecipe, intensity = 1): void {
    this.ensure()
    const ctx = this.ctx
    if (!ctx) return
    const t0 = ctx.currentTime

    const gain = ctx.createGain()
    gain.gain.setValueAtTime(recipe.vol * intensity, t0)
    gain.gain.exponentialRampToValueAtTime(0.001, t0 + recipe.dur)
    gain.connect(ctx.destination)
    const osc = ctx.createOscillator()
    osc.type = recipe.wave
    osc.frequency.setValueAtTime(recipe.from, t0)
    if (recipe.to) osc.frequency.exponentialRampToValueAtTime(recipe.to, t0 + recipe.dur)
    osc.connect(gain)
    osc.start(t0)
    osc.stop(t0 + recipe.dur + 0.02)
    // Release the per-call gain node when its source ends — a GainNode pinned to ctx.destination is
    // NOT auto-released the way a stopped source is, so without this every beat leaves a silent
    // node connected for the session (only ctx.close() would reclaim them).
    osc.onended = () => gain.disconnect()

    // The transient. Its own envelope and its own node, so it decays on its own clock rather than
    // riding the tone's — a thud's weight is in how the noise cuts out, not in the pitch under it.
    const burst = recipe.noise
    if (burst) {
      const src = ctx.createBufferSource()
      src.buffer = this.noiseBuffer(ctx, burst.dur)
      const bg = ctx.createGain()
      bg.gain.setValueAtTime(burst.vol * intensity, t0)
      bg.gain.exponentialRampToValueAtTime(0.001, t0 + burst.dur)
      src.connect(bg).connect(ctx.destination)
      src.start(t0)
      src.stop(t0 + burst.dur)
      src.onended = () => bg.disconnect()
    }
  }

  // One short white-noise buffer, built on first use and reused for the session. Deterministic —
  // a plain LCG rather than Math.random — so the same beat produces the same transient on every
  // run and a probe can assert on the waveform instead of merely counting allocations.
  private noise: AudioBuffer | null = null
  private noiseBuffer(ctx: AudioContext, seconds: number): AudioBuffer {
    if (!this.noise || this.noise.duration < seconds) {
      const n = Math.max(1, Math.ceil(ctx.sampleRate * seconds))
      const buf = ctx.createBuffer(1, n, ctx.sampleRate)
      const data = buf.getChannelData(0)
      let s = 0x9e3779b9
      for (let i = 0; i < n; i++) {
        s = (Math.imul(s, 1664525) + 1013904223) >>> 0
        data[i] = (s / 0xffffffff) * 2 - 1
      }
      this.noise = buf
    }
    return this.noise
  }

  // 跳跃 — the launch beat. The cue is chosen by the jump the SIM reported, never inferred from an
  // amplitude here: the second jump is a distinct verb (GDD §2 freezes 11 and 9.5 m/s as two), and
  // until now it was indistinguishable from the first by eye as well as by ear.
  jump(double: boolean): void {
    this.play(double ? SFX.doubleJump : SFX.jump)
  }

  // 落地 — the thud of GDD §4. Fired on the same impact floor as the landing squash, so the two are
  // one event in two senses; and scaled by the SAME impact the squash is, so they also agree about
  // MAGNITUDE, not merely about which beat fired. A hop off the ground lands at ~11 m/s and a
  // plummet off the floating pad reaches terminal velocity — the eye already told those apart and
  // the ear did not, which on an anchor of 一步有一步的重量 is the wrong sense to be deaf in.
  land(impact: number): void {
    // Scale-free reference: "how many ordinary jumps' worth of fall was that". The sim has already
    // gated this to a real landing (landBeat), so the thud needs no floor of its own — and taking
    // jump speed as unity means it needs no knowledge of the level's geometry either. An earlier
    // cut normalised by terminal velocity instead; nothing in this level can reach terminal, so the
    // entire audible range collapsed into ~1 dB. The squash reads the same `impact` on its own
    // curve — different units, but monotonic in the same signal, so the two agree about direction.
    this.play(SFX.land, Math.min(1.6, impact / JUMP_VELOCITY))
  }

  // 落空 — an air-jump press with both jumps already spent. It moves the body not at all, so it
  // had to be signalled by the sim; this is the audible half of that signal.
  denied(): void {
    this.play(SFX.denied)
  }
}
