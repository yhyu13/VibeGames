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
  // already solved — the gate is open; further steps must not re-lock it, and the underfoot latch is
  // dropped so no consumer reads a stale pad as "currently underfoot" for the rest of the run.
  if (s.passwordProgress >= password.length) {
    s.passwordPadId = null
    return null
  }

  const p = s.player.position
  // find the NEAREST pad underfoot. Horizontal (x/z) distance only: pads sit flat on the ground, and a
  // player passing over one at any height still "steps" it (consistent with the traverse-vs-collect
  // policy). Pads may have overlapping step circles — pick the closest, not the first in array order.
  let onPad: string | null = null
  let best = PASSWORD_PAD_RADIUS * PASSWORD_PAD_RADIUS
  for (const pad of pads) {
    const dx = p.x - pad.position.x
    const dz = p.z - pad.position.z
    const d2 = dx * dx + dz * dz
    if (d2 < best) {
      best = d2
      onPad = pad.id
    }
  }
  if (!onPad) {
    s.passwordPadId = null
    return null
  }
  // standing still on the same pad — no new step (edge-triggered via the latch)
  if (s.passwordPadId === onPad) return null
  s.passwordPadId = onPad

  const pad = pads.find((x) => x.id === onPad)!
  if (pad.symbol === password[s.passwordProgress]) {
    s.passwordProgress++
    return s.passwordProgress >= password.length ? 'solved' : 'correct'
  }
  // wrong step → reset. If the stepped pad IS the first symbol, it doubles as a fresh start (progress=1,
  // not 0) so a correct re-start never needs an awkward step-off/step-on to re-register.
  if (pad.symbol === password[0]) {
    s.passwordProgress = 1
    return 'correct'
  }
  s.passwordProgress = 0
  return 'wrong'
}
