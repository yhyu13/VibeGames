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

  // The underfoot latch holds until the player has actually LEFT the latched pad's step circle
  // (horizontal distance > radius) — NOT merely until a different pad is nearest. Collinear adjacent
  // pads' circles overlap by ~0.1–0.2m (spacing 1.6–1.7m vs radius 0.9), and the nearest pad flips
  // across the midpoint, so "nearest changed" alone would clear the latch on sub-centimetre lateral
  // jitter at the boundary and re-fire a step the player never took. (The pad3→pad4 diagonal — 2.14m
  // — leaves a 0.34m dead gap instead; both cases are exit-bounded by the same radius check, so
  // neither re-fires.) Holding until the latched circle is exited keeps the hop-in-place and mid-gap
  // cases edge-stable (round 22).
  const R2 = PASSWORD_PAD_RADIUS * PASSWORD_PAD_RADIUS
  if (s.passwordPadId !== null) {
    const latched = pads.find((x) => x.id === s.passwordPadId)!
    const dx = p.x - latched.position.x
    const dz = p.z - latched.position.z
    if (dx * dx + dz * dz <= R2) return null // still standing over the latched pad — no new step
    s.passwordPadId = null // actually stepped off — the next landing re-arms
  }

  // nearest pad underfoot (horizontal only — altitude is the vertical bound below, not a latch term)
  let onPad: string | null = null
  let best = R2
  for (const pad of pads) {
    const dx = p.x - pad.position.x
    const dz = p.z - pad.position.z
    const d2 = dx * dx + dz * dz
    if (d2 < best) {
      best = d2
      onPad = pad.id
    }
  }
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
