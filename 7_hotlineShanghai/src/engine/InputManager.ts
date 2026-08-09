import type { PlayerInput } from '../core/types';

export class InputManager {
  private readonly keys = new Set<string>();
  constructor(
    private readonly canvas: HTMLCanvasElement,
    private readonly send: (input: PlayerInput) => void,
    private readonly aimAngle: (clientX: number, clientY: number) => number,
  ) {}

  start(): void {
    window.addEventListener('keydown', this.onDown);
    window.addEventListener('keyup', this.onUp);
    this.canvas.addEventListener('mousemove', this.onMove);
    this.canvas.addEventListener('mousedown', this.onMouseDown);
  }
  stop(): void {
    window.removeEventListener('keydown', this.onDown);
    window.removeEventListener('keyup', this.onUp);
    this.canvas.removeEventListener('mousemove', this.onMove);
    this.canvas.removeEventListener('mousedown', this.onMouseDown);
  }
  update(): void {
    this.send({ kind: 'move', dir: { x: Number(this.keys.has('KeyD')) - Number(this.keys.has('KeyA')), y: Number(this.keys.has('KeyS')) - Number(this.keys.has('KeyW')) } });
  }
  private onDown = (e: KeyboardEvent): void => { this.keys.add(e.code); };
  private onUp = (e: KeyboardEvent): void => { this.keys.delete(e.code); };
  private onMove = (e: MouseEvent): void => {
    this.send({ kind: 'aim', angle: this.aimAngle(e.clientX, e.clientY) });
  };
  private onMouseDown = (e: MouseEvent): void => { if (e.button === 0) this.send({ kind: 'attackStart' }); };
}
