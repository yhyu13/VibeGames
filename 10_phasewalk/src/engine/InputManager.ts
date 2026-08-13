// engine/InputManager.ts — DOM keyboard → InputState (edge-triggered). Zero deps on three/store.
import type { InputState, PhaseId } from '../core/types'

const PHASE_KEYS: Record<string, PhaseId> = {
  Digit1: 'solid', Digit2: 'liquid', Digit3: 'gas', Digit4: 'plasma',
  Numpad1: 'solid', Numpad2: 'liquid', Numpad3: 'gas', Numpad4: 'plasma',
}

export class InputManager {
  private keys = new Set<string>()
  private pressed = new Set<string>()
  private jumpEdge = false
  private switchQueue: PhaseId[] = []
  private jumpHeldDown = false

  private onKeyDown = (e: KeyboardEvent): void => {
    if (e.code === 'Space' || e.code.startsWith('Arrow')) e.preventDefault()
    if (e.repeat) return
    this.keys.add(e.code)
    this.pressed.add(e.code)
    if (e.code === 'Space') {
      this.jumpEdge = true
      this.jumpHeldDown = true
    }
    const phase = PHASE_KEYS[e.code]
    if (phase) this.switchQueue.push(phase)
  }

  private onKeyUp = (e: KeyboardEvent): void => {
    this.keys.delete(e.code)
    if (e.code === 'Space') this.jumpHeldDown = false
  }

  private onBlur = (): void => {
    this.keys.clear()
    this.jumpHeldDown = false
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

  isDown(code: string): boolean {
    return this.keys.has(code)
  }

  // edge-triggered consume (poll-independent; used for pause/restart/confirm)
  consume(code: string): boolean {
    if (this.pressed.has(code)) {
      this.pressed.delete(code)
      return true
    }
    return false
  }

  poll(): InputState {
    const x = (this.isDown('KeyD') || this.isDown('ArrowRight') ? 1 : 0) - (this.isDown('KeyA') || this.isDown('ArrowLeft') ? 1 : 0)
    const z = (this.isDown('KeyW') || this.isDown('ArrowUp') ? -1 : 0) - (this.isDown('KeyS') || this.isDown('ArrowDown') ? -1 : 0)
    const input: InputState = {
      x,
      z,
      jumpPressed: this.jumpEdge,
      jumpHeld: this.jumpHeldDown,
      switchPhase: this.switchQueue.shift() ?? null,
      pause: false,
    }
    this.jumpEdge = false
    return input
  }
}
