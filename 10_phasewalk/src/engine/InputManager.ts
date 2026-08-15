// engine/InputManager.ts — DOM keyboard → InputState (edge-triggered). Zero deps on three.
//
// v4: Tab + radial 4-quadrant menu replaces the 1/2/3/4 number keys.
//   hold Tab → radial menu; WASD/arrows highlight a quadrant; release Tab → switch.
//   Quadrant map: ↑=气(gas) · ↓=固(solid) · ←=液(liquid) · →=焰(plasma)
import type { InputState, PhaseId } from '../core/types'
import { isPhaseLocked } from '../core/simulation/traps'
import { getSim } from '../store'

const RADIAL: Record<string, PhaseId> = {
  KeyW: 'gas', ArrowUp: 'gas',
  KeyS: 'solid', ArrowDown: 'solid',
  KeyA: 'liquid', ArrowLeft: 'liquid',
  KeyD: 'plasma', ArrowRight: 'plasma',
}

export interface RadialState {
  active: boolean
  highlighted: PhaseId | null
}

export class InputManager {
  private keys = new Set<string>()
  private pressed = new Set<string>()
  private jumpEdge = false
  private switchQueue: PhaseId[] = []
  private tabHeld = false
  private highlighted: PhaseId | null = null
  private onRadial: ((r: RadialState) => void) | null = null

  private emitRadial(): void {
    this.onRadial?.({ active: this.tabHeld, highlighted: this.highlighted })
  }

  // gameplay inputs (jump/radial/switch) are only meaningful while the sim is actively stepping —
  // otherwise keys pressed during pause/victory queue stale switches/jumps that fire on resume.
  private simActive(): boolean {
    const ph = getSim()?.phase
    return ph === 'playing' || ph === 'layer_intro'
  }

  private onKeyDown = (e: KeyboardEvent): void => {
    if (e.code === 'Space' || e.code.startsWith('Arrow') || e.code === 'Tab') e.preventDefault()
    if (e.repeat) return
    this.keys.add(e.code)
    this.pressed.add(e.code)
    if (e.code === 'Space' && this.simActive()) {
      this.jumpEdge = true
    }
    if (e.code === 'Tab' && !this.tabHeld && this.simActive()) {
      this.tabHeld = true
      this.highlighted = getSim()?.player.phase ?? 'solid' // open menu with the current phase pre-selected
      this.emitRadial()
    }
    const dir = RADIAL[e.code]
    if (this.tabHeld && dir) {
      this.highlighted = dir
      this.emitRadial()
    }
  }

  private onKeyUp = (e: KeyboardEvent): void => {
    this.keys.delete(e.code)
    if (e.code === 'Tab' && this.tabHeld) {
      this.tabHeld = false
      if (this.highlighted && this.simActive()) {
        // 相锁区 cancels a switch REQUESTED while inside — check at queue time, not just at application.
        // A request tapped inside the lock while the switch cooldown is still cooling would otherwise sit
        // in switchQueue (poll() only drains once cooldown <= 0), outliving the lock and firing after the
        // player leaves (round 14). resolveTraps still nulls a surfaced request for the queued-outside-
        // fired-inside case.
        const sim = getSim()
        if (!sim || !isPhaseLocked(sim)) this.switchQueue.push(this.highlighted)
      }
      this.highlighted = null
      this.emitRadial()
    }
  }

  private onBlur = (): void => {
    this.keys.clear()
    this.pressed.clear()
    this.switchQueue.length = 0
    this.jumpEdge = false
    if (this.tabHeld) {
      this.tabHeld = false
      this.highlighted = null
      this.emitRadial()
    }
  }

  attach(): void {
    window.addEventListener('keydown', this.onKeyDown)
    window.addEventListener('keyup', this.onKeyUp)
    window.addEventListener('blur', this.onBlur)
  }

  detach(): void {
    window.removeEventListener('keydown', this.onKeyDown)
    window.removeEventListener('keyup', this.onKeyUp)
    window.removeEventListener('blur', this.onBlur)
  }

  setRadialListener(cb: (r: RadialState) => void): void {
    this.onRadial = cb
  }

  isDown(code: string): boolean {
    return this.keys.has(code)
  }

  // Mouse hover on the radial menu (RadialMenu onMouseEnter/onMouseLeave → store → here). Mirrors the
  // WASD/arrow highlight path but is driven by the pointer instead of keys. Only meaningful while the
  // menu is open (tabHeld) — a hover outside that window has no menu to update.
  hoverPhase(phase: PhaseId | null): void {
    if (!this.tabHeld) return
    this.highlighted = phase
    this.emitRadial()
  }

  // edge-triggered consume (poll-independent; used for pause/restart/confirm)
  consume(code: string): boolean {
    if (this.pressed.has(code)) {
      this.pressed.delete(code)
      return true
    }
    return false
  }

  // Drop any pending jump/switch edges queued before a forced reset (death / restart / layer-advance).
  // Without this, a phase request queued mid-cooldown replays the instant respawn zeroes the cooldown,
  // applying a switch the player never made and inflating the min-switch score.
  clearQueuedInput(): void {
    this.switchQueue.length = 0
    this.jumpEdge = false
    // also drop stale edge-triggered UI keys (pause/restart/advance): a Space used to jump mid-floor
    // must not auto-advance the LayerClear screen one frame after the gate opens
    this.pressed.clear()
  }

  // Drop only the latched jump edge, preserving a phase switch queued during layer_intro. Used by the
  // Enter-confirm path: a Space held through the intro must not fire a jump on the first playing frame,
  // but a Tab+W pre-selected switch SHOULD survive into that frame (poll() drains it on the first step).
  clearJumpEdge(): void {
    this.jumpEdge = false
  }

  // Drop edge-triggered UI keys (pause/restart/confirm) + the latched jump edge, but PRESERVE a queued
  // phase switch. Used by pause: a switch requested before pausing must survive into resume (round 13),
  // but a same-frame KeyR latched with the Escape that pauses must not restart the floor one frame later
  // (round 14 — clearJumpEdge() alone leaves that KeyR in `pressed` for the restart consume to catch).
  clearPressed(): void {
    this.pressed.clear()
    this.jumpEdge = false
  }

  // Force-close the radial menu when the sim leaves 'playing' (pause / gate / victory). tabHeld is only
  // cleared on Tab keyup / blur, so a pause pressed while Tab is held would otherwise leave the menu
  // rendered over the pause screen and its highlighted phase still live.
  closeRadial(): void {
    if (this.tabHeld) {
      this.tabHeld = false
      this.highlighted = null
      this.emitRadial()
    }
  }

  poll(): InputState {
    const tab = this.tabHeld
    // while Tab is held, WASD/arrows drive the radial menu, NOT movement
    const x = tab ? 0 : (this.isDown('KeyD') || this.isDown('ArrowRight') ? 1 : 0) - (this.isDown('KeyA') || this.isDown('ArrowLeft') ? 1 : 0)
    const z = tab ? 0 : (this.isDown('KeyW') || this.isDown('ArrowUp') ? -1 : 0) - (this.isDown('KeyS') || this.isDown('ArrowDown') ? -1 : 0)
    // hold the phase request while the switch cooldown is still cooling (no silent input-eat: the
    // queued switch stays in the queue until the cooldown clears, then applies)
    let switchPhase: PhaseId | null = null
    if (this.switchQueue.length > 0) {
      const sim = getSim()
      // drain the queued switch only once the sim is actually stepping 'playing' — a switch requested
      // during layer_intro must survive into the first playing frame, not be eaten by a poll() that
      // runs while step() is gated off. Also hold the drain while the radial menu is OPEN (!tab): a
      // switch queued by a PREVIOUS Tab-release must not apply mid-selection and change the phase under
      // an open menu whose ring was snapshotted to the old phase (round 18 — radial highlight desync;
      // the ring would stay on the stale phase and Tab-release would re-queue it as an unintended switch).
      if (sim && sim.phase === 'playing' && sim.player.switchCooldown <= 0 && !tab) switchPhase = this.switchQueue.shift() ?? null
    }
    const input: InputState = {
      x,
      z,
      // while the radial menu is open (Tab held), gate the jump/swim/hover verb too — not just movement.
      // jumpHeld is derived from the raw key set (like x/z) so a Space held through a pause resumes as a
      // held jump, consistent with held movement keys (the old jumpHeldDown was only set on keydown when
      // simActive(), so a Space first pressed during pause was never tracked as held).
      jumpPressed: tab ? false : this.jumpEdge,
      jumpHeld: tab ? false : this.isDown('Space'),
      switchPhase,
      pause: false,
    }
    this.jumpEdge = false
    return input
  }
}
