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

  play(recipe: SfxRecipe, opts?: { from?: number }): void {
    this.ensure()
    const ctx = this.ctx
    if (!ctx) return
    const t0 = ctx.currentTime + (recipe.when ?? 0)
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
  }

  switchTone(phase: PhaseId): void {
    this.play({ ...SFX.switch, from: PHASE_FREQ[phase] })
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
}
