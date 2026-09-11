// Keyboard input → per-frame Input snapshot + phase-control events.
// WASD/arrows move, Space jump (variable height), P/Esc toggle pause,
// Enter begins the level. Edge signals are consumed once per frame.
import type { Input } from '../core/types'

export class InputManager {
  private held = new Set<string>()
  private down = false
  private prevDown = false
  private startQueued = false
  private pauseQueued = false
  // Set when a press is spent BEGINNING the level, so the same physical Space edge
  // is not delivered a second time as a jump (see consumeJumpEdge).
  private jumpEdgeSpent = false

  // Wire state to the browser.
  attach(el: Window): void {
    el.addEventListener('keydown', (e) => this.onKey(e, true))
    el.addEventListener('keyup', (e) => this.onKey(e, false))
    el.addEventListener('blur', () => this.held.clear())
  }

  private onKey(e: KeyboardEvent, isDown: boolean): void {
    const c = e.code
    if (c === 'Space' || c.startsWith('Arrow')) e.preventDefault()
    if (c === 'Space') {
      this.down = isDown
      if (isDown && !this.prevDown) this.startQueued = true // jumpPressed edge lives in snapshot
    }
    if (isDown && !e.repeat) {
      if (c === 'Enter' || c === 'NumpadEnter') this.startQueued = true
      if (c === 'KeyP' || c === 'Escape') this.pauseQueued = true
    }
    if (isDown) this.held.add(c)
    else this.held.delete(c)
  }

  getMove(): { x: number; z: number } {
    const h = this.held
    let x = 0
    let z = 0
    if (h.has('KeyA') || h.has('ArrowLeft')) x -= 1
    if (h.has('KeyD') || h.has('ArrowRight')) x += 1
    if (h.has('KeyW') || h.has('ArrowUp')) z += 1
    if (h.has('KeyS') || h.has('ArrowDown')) z -= 1
    return { x, z }
  }

  // Build the snapshot for this frame; jumpPressed is edge-triggered and
  // consumed here, jumpReleased is the release edge used to cut jump height.
  sample(): Input {
    const move = this.getMove()
    // Cleared here, so a spend can only ever suppress the ONE frame in which the
    // caller actually began a level — never a later, deliberate jump press.
    const jumpPressed = this.down && !this.prevDown && !this.jumpEdgeSpent
    this.jumpEdgeSpent = false
    const input: Input = {
      moveX: move.x,
      moveZ: move.z,
      jumpPressed,
      jumpReleased: !this.down && this.prevDown
    }
    this.prevDown = this.down
    return input
  }

  // Consumed once by the loop; resets the one-shot phase events.
  takeStart(): boolean {
    const v = this.startQueued
    this.startQueued = false
    return v
  }

  // Space does two jobs: it begins the level AND it jumps, and both are derived
  // from the SAME keydown edge. A caller that actually spent a press starting a
  // level must say so, or sample() delivers that identical edge as a jump on the
  // same frame and the run opens with an unasked-for hop the player never asked
  // for — the press meant "start". Only call this when a level really began: a
  // caller that merely dropped a start press (Space during play) must NOT, or
  // Space would stop jumping for the rest of the run.
  consumeJumpEdge(): void {
    this.jumpEdgeSpent = true
  }

  takePause(): boolean {
    const v = this.pauseQueued
    this.pauseQueued = false
    return v
  }
}
