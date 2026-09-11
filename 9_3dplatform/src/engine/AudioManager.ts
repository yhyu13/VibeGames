// engine/AudioManager.ts — Web Audio synthesis from core/data/sfx.ts recipes (repo convention).
// Zero audio files: every cue is one oscillator + one gain, built per call.
import { SFX, type SfxRecipe } from '../core/data/sfx'

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

  play(recipe: SfxRecipe): void {
    this.ensure()
    const ctx = this.ctx
    if (!ctx) return
    const t0 = ctx.currentTime
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.type = recipe.wave
    osc.frequency.setValueAtTime(recipe.from, t0)
    if (recipe.to) osc.frequency.exponentialRampToValueAtTime(recipe.to, t0 + recipe.dur)
    gain.gain.setValueAtTime(recipe.vol, t0)
    gain.gain.exponentialRampToValueAtTime(0.001, t0 + recipe.dur)
    osc.connect(gain).connect(ctx.destination)
    osc.start(t0)
    osc.stop(t0 + recipe.dur + 0.02)
    // Release the per-call gain node when the tone ends — a GainNode pinned to ctx.destination is
    // NOT auto-released the way a stopped OscillatorNode is, so without this every beat leaves a
    // silent node connected for the session (only ctx.close() would reclaim them).
    osc.onended = () => gain.disconnect()
  }

  // 跳跃 — the launch beat. The cue is chosen by the jump the SIM reported, never inferred from an
  // amplitude here: the second jump is a distinct verb (GDD §2 freezes 11 and 9.5 m/s as two), and
  // until now it was indistinguishable from the first by eye as well as by ear.
  jump(double: boolean): void {
    this.play(double ? SFX.doubleJump : SFX.jump)
  }

  // 落地 — the soft thud of GDD §4. Fired on the same impact floor as the landing squash, so the
  // thud and the squash are one event in two senses and cannot drift apart.
  land(): void {
    this.play(SFX.land)
  }

  // 落空 — an air-jump press with both jumps already spent. It moves the body not at all, so it
  // had to be signalled by the sim; this is the audible half of that signal.
  denied(): void {
    this.play(SFX.denied)
  }
}
