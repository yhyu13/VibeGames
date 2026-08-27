// engine/InputManager.ts — wheel/RMB zoom, Space/MMB SAR, LMB click, Esc pause.

export class InputManager {
  zoomDelta = 0
  sarHeld = false
  forceSar = false
  pauseEdge = false
  restartEdge = false
  private click: { x: number; y: number } | null = null
  private rmb = false
  private lastY = 0
  private keys = new Set<string>()
  private mmb = false

  attach(canvas: HTMLCanvasElement): void {
    canvas.addEventListener('wheel', this.onWheel, { passive: false })
    canvas.addEventListener('pointerdown', this.onDown)
    window.addEventListener('pointerup', this.onUp)
    window.addEventListener('pointermove', this.onMove)
    window.addEventListener('keydown', this.onKeyDown)
    window.addEventListener('keyup', this.onKeyUp)
    canvas.addEventListener('contextmenu', (e) => e.preventDefault())
  }

  detach(canvas: HTMLCanvasElement): void {
    canvas.removeEventListener('wheel', this.onWheel)
    canvas.removeEventListener('pointerdown', this.onDown)
    window.removeEventListener('pointerup', this.onUp)
    window.removeEventListener('pointermove', this.onMove)
    window.removeEventListener('keydown', this.onKeyDown)
    window.removeEventListener('keyup', this.onKeyUp)
  }

  consumeClick(): { x: number; y: number } | null {
    const c = this.click
    this.click = null
    return c
  }

  consumeZoom(): number {
    const d = this.zoomDelta
    this.zoomDelta = 0
    return d
  }

  consumePause(): boolean {
    const v = this.pauseEdge
    this.pauseEdge = false
    return v
  }

  consumeRestart(): boolean {
    const v = this.restartEdge
    this.restartEdge = false
    return v
  }

  get sarActive(): boolean {
    return this.sarHeld || this.forceSar
  }

  private onWheel = (e: WheelEvent): void => {
    e.preventDefault()
    this.zoomDelta += e.deltaY > 0 ? -0.06 : 0.06
  }

  private onDown = (e: PointerEvent): void => {
    if (e.button === 0) this.click = { x: e.clientX, y: e.clientY }
    if (e.button === 1) {
      e.preventDefault()
      this.mmb = true
      this.sarHeld = true
    }
    if (e.button === 2) {
      this.rmb = true
      this.lastY = e.clientY
    }
  }

  private onUp = (e: PointerEvent): void => {
    if (e.button === 1) {
      this.mmb = false
      this.sarHeld = this.keys.has('Space')
    }
    if (e.button === 2) this.rmb = false
  }

  private onMove = (e: PointerEvent): void => {
    if (!this.rmb) return
    const dy = e.clientY - this.lastY
    this.lastY = e.clientY
    this.zoomDelta += -dy * 0.004
  }

  private onKeyDown = (e: KeyboardEvent): void => {
    if (e.repeat) return
    if (e.code === 'Space') {
      e.preventDefault()
      this.keys.add('Space')
      this.sarHeld = true
    }
    if (e.code === 'Escape') this.pauseEdge = true
    if (e.code === 'KeyR') this.restartEdge = true
  }

  private onKeyUp = (e: KeyboardEvent): void => {
    if (e.code === 'Space') {
      this.keys.delete('Space')
      this.sarHeld = this.mmb
    }
  }
}
