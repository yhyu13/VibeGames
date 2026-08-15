// core/simulation/password.ts — 密文石板 (password pad) stepping. Pure.
// The player steps on floor pads in the order shown on the transparent 相玻 panel. Correct next
// symbol advances the sequence; a wrong pad resets it. Edge-triggered via passwordPadId so a single
// step registers once (not once per frame while standing still).
import { PASSWORD_PAD_RADIUS } from '../constants'
import type { GameState } from '../types'

export type PasswordEvent = 'correct' | 'wrong' | 'solved' | null

// A pad is "stepped" only within this vertical distance above it. Standing (center y≈0.6) and small
// hops trigger; a high jump or gas hover well overhead does not — an airborne player crossing the pad
// row must not accidentally reset the sequence. This bound gates NEW latches only: the underfoot latch
// (passwordPadId) clears on horizontal departure, so hopping in place over a latched pad never re-fires
// it (round 21).
const STEP_HEIGHT = 1.6

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
  // Find the NEAREST pad underfoot by horizontal (x/z) distance ALONE — altitude is handled by the
  // vertical bound below, not here. The latch tracks the pad the player is over and must clear only on
  // HORIZONTAL departure (stepping off), never on a vertical hop: jumping straight up over the same
  // pad and landing must not re-trigger it. Pads may overlap — pick the closest, not first in array.
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
  // still over the same latched pad (or off all pads with no latch) — no new step
  if (s.passwordPadId === onPad) return null
  // stepped off the latched pad — drop the latch so the next landing re-arms
  s.passwordPadId = null
  if (!onPad) return null

  const pad = pads.find((x) => x.id === onPad)!
  // vertical bound — a NEW step must be near the floor. An airborne player flying overhead (e.g. gas
  // hover) crosses pads without stepping; only a near-floor crossing arms the latch and fires.
  if (p.y - pad.position.y > STEP_HEIGHT) return null

  s.passwordPadId = onPad
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
