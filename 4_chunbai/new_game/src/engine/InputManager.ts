import { InputState } from '../core/types';

export class InputManager {
  private keys: Set<string> = new Set();
  private mouseNormX: number = 0.5;
  private mouseNormY: number = 0.5;
  private aimNormX: number = 0.5;
  private aimNormY: number = 0.5;
  private mouseDown: boolean = false;
  private _weaponSwitch: number = 0;
  private _dodge: boolean = false;
  private _special: boolean = false;
  private _lockToggle: boolean = false;
  private lastSpaceTime: number = 0;
  private canvasWidth: number = 1;
  private canvasHeight: number = 1;

  constructor(_playerId?: number) {}

  setCanvasSize(w: number, h: number) {
    this.canvasWidth = w;
    this.canvasHeight = h;
  }

  getMouseNormX(): number {
    return this.aimNormX;
  }

  getMouseNormY(): number {
    return this.aimNormY;
  }

  getRawMouseNormX(): number {
    return this.mouseNormX;
  }

  getRawMouseNormY(): number {
    return this.mouseNormY;
  }

  setAimNorm(x: number, y: number) {
    this.aimNormX = x;
    this.aimNormY = y;
  }

  private has(key: string): boolean {
    return this.keys.has(key) || this.keys.has(key.toLowerCase()) || this.keys.has(key.toUpperCase());
  }

  getState(): InputState {
    const ws = this._weaponSwitch;
    this._weaponSwitch = 0;
    const dodge = this._dodge;
    this._dodge = false;
    const special = this._special;
    this._special = false;
    const lockToggle = this._lockToggle;
    this._lockToggle = false;
    return {
      forward: this.has('w') || this.keys.has('ArrowUp'),
      backward: this.has('s') || this.keys.has('ArrowDown'),
      left: this.has('a') || this.keys.has('ArrowLeft'),
      right: this.has('d') || this.keys.has('ArrowRight'),
      up: this.has('Shift'),
      down: this.has('Control'),
      shoot: this.mouseDown,
      aimX: this.aimNormX, aimY: this.aimNormY,
      weaponSwitch: ws,
      boost: this.has(' '),
      brake: this.has('e'),
      dodge,
      special,
      lockToggle,
      pause: this.has('Escape') || this.has('Enter'),
    };
  }

  keyDown(key: string) {
    this.keys.add(key);
    if (key === ' ') {
      const now = performance.now();
      if (now - this.lastSpaceTime < 300) this._dodge = true;
      this.lastSpaceTime = now;
    }
    if (key === 'z' || key === 'Z') this._special = true;
    if (key === 'Tab') this._lockToggle = true;
    const n = parseInt(key, 10);
    if (n >= 1 && n <= 9) this._weaponSwitch = n;
  }
  keyUp(key: string) {
    this.keys.delete(key);
    this.keys.delete(key.toLowerCase());
    this.keys.delete(key.toUpperCase());
  }
  mouseMove(x: number, y: number) {
    this.mouseNormX = this.canvasWidth > 0 ? x / this.canvasWidth : 0.5;
    this.mouseNormY = this.canvasHeight > 0 ? y / this.canvasHeight : 0.5;
  }  mouseDownFn() { this.mouseDown = true; }
  mouseUpFn() { this.mouseDown = false; }
}
