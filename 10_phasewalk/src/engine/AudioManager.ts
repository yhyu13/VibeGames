// engine/AudioManager.ts — Web Audio synthesis from core/data/sfx.ts recipes (repo convention).
import { PHASE_FREQ } from '../core/constants'
import { SFX, SfxRecipe } from '../core/data/sfx'
import type { PhaseId } from '../core/types'

export class AudioManager {
  private ctx: AudioContext | null = null

  ensure(): void {
    if (!this.ctx) {
      const AC = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext
      if (AC) this.ctx = new AC()
    }
    if (this.ctx && this.ctx.state === 'suspended') void this.ctx.resume()
  }

  play(recipe: SfxRecipe, opts?: { from?: number; when?: number }): void {
    this.ensure()
    const ctx = this.ctx
    if (!ctx) return
    const t0 = ctx.currentTime + (opts?.when ?? recipe.when ?? 0)
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.type = recipe.wave
    osc.frequency.setValueAtTime(opts?.from ?? recipe.from, t0)
    if (recipe.to) osc.frequency.exponentialRampToValueAtTime(recipe.to, t0 + recipe.dur)
    gain.gain.setValueAtTime(recipe.vol, t0)
    gain.gain.exponentialRampToValueAtTime(0.001, t0 + recipe.dur)
    osc.connect(gain).connect(ctx.destination)
    osc.start(t0)
    osc.stop(t0 + recipe.dur + 0.02)
    // Release the per-call gain node when the tone ends — a GainNode pinned to ctx.destination is NOT
    // auto-released the way a stopped OscillatorNode is, so without this every shot()/burst()/jump()
    // leaves a silent gain node connected for the session (only ctx.close() would reclaim them).
    osc.onended = () => gain.disconnect()
  }

  switchTone(phase: PhaseId): void {
    this.play({ ...SFX.switch, from: PHASE_FREQ[phase] })
  }

  // 相弹成功 = 上行滑音 300→700 (TDD §4 audio; SFX.phaseBounce)
  phaseBounce(): void {
    this.play(SFX.phaseBounce)
  }

  // 四相同现 极致时刻①: 三连音 arpeggio over the three revealed ghost phases (worldview-first §4 ⭐①)
  fourPhaseReveal(): void {
    ;(['liquid', 'gas', 'plasma'] as PhaseId[]).forEach((p, i) => {
      this.play({ ...SFX.switch, dur: 0.16, vol: 0.42 }, { from: PHASE_FREQ[p], when: i * 0.1 })
    })
  }

  collect(): void {
    this.play(SFX.collect)
  }

  gate(): void {
    this.play(SFX.gate)
    this.play({ ...SFX.gate, when: 0.22 })
  }

  death(): void {
    this.play(SFX.death)
  }

  clear(): void {
    this.play(SFX.clear)
  }

  // v4 相灵弹
  reflect(): void {
    this.play(SFX.reflect)
  }

  disperse(): void {
    this.play(SFX.disperse)
  }

  destroy(): void {
    this.play(SFX.destroy)
  }

  solidify(): void {
    this.play(SFX.solidify)
  }

  // v4 movement-verb feedback (each verb = its phase's identity)
  jump(): void {
    this.play(SFX.jump)
  }

  burst(): void {
    this.play(SFX.burst)
  }

  land(): void {
    this.play(SFX.land)
  }

  shot(): void {
    this.play(SFX.shot)
  }

  // ---- per-phase ambient pad (TDD §2/§4: 相位根音 drone + 慢 LFO) ----
  private padOsc: OscillatorNode | null = null
  private padGain: GainNode | null = null
  private padLfo: OscillatorNode | null = null
  private padLfoGain: GainNode | null = null
  private padLevel = 0.05

  // Start the drone at the phase's root note (one octave down) with a slow gain LFO so it breathes.
  startPad(phase: PhaseId): void {
    this.ensure()
    const ctx = this.ctx
    if (!ctx || this.padOsc) return
    const osc = ctx.createOscillator()
    osc.type = 'sine'
    osc.frequency.setValueAtTime(PHASE_FREQ[phase] / 2, ctx.currentTime)
    const gain = ctx.createGain()
    gain.gain.setValueAtTime(this.padLevel, ctx.currentTime)
    const lfo = ctx.createOscillator()
    lfo.type = 'sine'
    lfo.frequency.setValueAtTime(0.18, ctx.currentTime)
    const lfoGain = ctx.createGain()
    lfoGain.gain.setValueAtTime(this.padLevel * 0.4, ctx.currentTime)
    lfo.connect(lfoGain).connect(gain.gain)
    osc.connect(gain).connect(ctx.destination)
    osc.start()
    lfo.start()
    this.padOsc = osc
    this.padGain = gain
    this.padLfo = lfo
    this.padLfoGain = lfoGain
  }

  // Retune the drone to the newly-selected phase's root (slow glide so the switch reads as one voice).
  setPadPhase(phase: PhaseId): void {
    const ctx = this.ctx
    if (ctx && this.padOsc) this.padOsc.frequency.setTargetAtTime(PHASE_FREQ[phase] / 2, ctx.currentTime, 0.2)
  }

  // Duck the drone while paused (silence is narrative only at spawn, not while the game is held).
  setPadMuted(muted: boolean): void {
    const ctx = this.ctx
    if (!ctx) return
    // Duck BOTH the main gain and the LFO depth — the LFO is wired lfo→lfoGain→gain.gain, so zeroing
    // only the automation value leaves a ±0.02 breathing tone bleeding through the pause (the LFO
    // signal sums on top of the AudioParam's intrinsic value).
    if (this.padGain) this.padGain.gain.setTargetAtTime(muted ? 0 : this.padLevel, ctx.currentTime, 0.1)
    if (this.padLfoGain) this.padLfoGain.gain.setTargetAtTime(muted ? 0 : this.padLevel * 0.4, ctx.currentTime, 0.1)
  }

  stopPad(): void {
    const ctx = this.ctx
    if (!ctx) return
    if (this.padOsc) { this.padOsc.stop(); this.padOsc.disconnect(); this.padOsc = null }
    if (this.padLfo) { this.padLfo.stop(); this.padLfo.disconnect(); this.padLfo = null }
    if (this.padGain) { this.padGain.disconnect(); this.padGain = null }
    if (this.padLfoGain) { this.padLfoGain.disconnect(); this.padLfoGain = null }
  }

  // Full teardown: stop the drone AND release the AudioContext. App's unmount cleanup must close the
  // context — otherwise every remount (Vite HMR / re-entry) abandons a live context and accumulates
  // toward the browser's ~6-AudioContext ceiling, after which AudioContext/resume throws and audio is
  // silent for the rest of the session.
  dispose(): void {
    this.stopPad()
    if (this.ctx) {
      void this.ctx.close()
      this.ctx = null
    }
  }
}
