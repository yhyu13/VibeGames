// core/simulation/password.ts — 密文石板 (password pad) stepping. Pure.
// The player steps on floor pads in the order shown on the transparent 相玻 panel. Correct next
// symbol advances the sequence; a wrong pad resets it. Edge-triggered via passwordPadId so a single
// step registers once (not once per frame while standing still).
import { PASSWORD_PAD_RADIUS } from '../constants'
import type { GameState } from '../types'

export type PasswordEvent = 'correct' | 'wrong' | 'solved' | null

export function stepPassword(s: GameState): PasswordEvent {
  const pads = s.layer.passwordPads
  const password = s.layer.password
  if (!pads || pads.length === 0 || !password || password.length === 0) return null
  // already solved — the gate is open; further steps must not re-lock it
  if (s.passwordProgress >= password.length) return null

  const p = s.player.position
  // find the pad underfoot. Horizontal (x/z) distance only: pads sit flat on the ground, and a player
  // passing over one at any height still "steps" it (consistent with the traverse-vs-collect policy).
  let onPad: string | null = null
  for (const pad of pads) {
    const dx = p.x - pad.position.x
    const dz = p.z - pad.position.z
    if (dx * dx + dz * dz < PASSWORD_PAD_RADIUS * PASSWORD_PAD_RADIUS) {
      onPad = pad.id
      break
    }
  }
  if (!onPad) {
    s.passwordPadId = null
    return null
  }
  // standing still on the same pad — no new step
  if (s.passwordPadId === onPad) return null
  s.passwordPadId = onPad

  const pad = pads.find((x) => x.id === onPad)!
  if (pad.symbol === password[s.passwordProgress]) {
    s.passwordProgress++
    return s.passwordProgress >= password.length ? 'solved' : 'correct'
  }
  s.passwordProgress = 0
  return 'wrong'
}
