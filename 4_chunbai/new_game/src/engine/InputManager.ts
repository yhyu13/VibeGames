import { InputState } from '../types';

export class InputManager {
  private keys: Set<string> = new Set();
  private mouseX: number = 0;
  private mouseY: number = 0;
  private mouseNormX: number = 0.5;
  private mouseNormY: number = 0.5;
  private mouseDown: boolean = false;
  private callbacks: Map<string, () => void> = new Map();
  private _weaponSwitch: number = 0;
  private canvasWidth: number = 1;
  private canvasHeight: number = 1;

  constructor(_playerId?: number) {}

  setCanvasSize(w: number, h: number) {
    this.canvasWidth = w;
    this.canvasHeight = h;
  }

  getState(): InputState {
    const ws = this._weaponSwitch;
    this._weaponSwitch = 0;
    return {
      forward: this.keys.has('w') || this.keys.has('ArrowUp'),
      backward: this.keys.has('s') || this.keys.has('ArrowDown'),
      left: this.keys.has('a') || this.keys.has('ArrowLeft'),
      right: this.keys.has('d') || this.keys.has('ArrowRight'),
      up: this.keys.has('q'),
      down: this.keys.has('e'),
      shoot: this.mouseDown,
      aimX: this.mouseNormX, aimY: this.mouseNormY,
      weaponSwitch: ws,
      skill1: this.keys.has('1'),
      skill2: this.keys.has('2'),
      skill3: this.keys.has('3'),
      special: this.keys.has('r'),
      boost: this.keys.has(' '),
      lockTarget: this.keys.has('Tab'),
      pause: this.keys.has('Escape'),
    };
  }

  keyDown(key: string) {
    const k = key.toLowerCase();
    this.keys.add(k);
    if (key === 'Tab') this.keys.add('Tab');
    if (key === 'Escape') this.keys.add('Escape');
    const n = parseInt(key, 10);
    if (n >= 1 && n <= 4) this._weaponSwitch = n;
  }
  keyUp(key: string) {
    const k = key.toLowerCase();
    this.keys.delete(k);
    if (key === 'Tab') this.keys.delete('Tab');
    if (key === 'Escape') this.keys.delete('Escape');
  }
  mouseMove(x: number, y: number) {
    this.mouseX = x;
    this.mouseY = y;
    this.mouseNormX = this.canvasWidth > 0 ? x / this.canvasWidth : 0.5;
    this.mouseNormY = this.canvasHeight > 0 ? y / this.canvasHeight : 0.5;
  }
  mouseDownFn() { this.mouseDown = true; }
  mouseUpFn() { this.mouseDown = false; }
}

export function createGlobalInputManager() {
  const p1 = new InputManager(0);
  const p2 = new InputManager(1);
  const managers = [p1, p2];

  return {
    managers,
    handleKeyDown: (e: KeyboardEvent) => {
      managers.forEach(m => m.keyDown(e.key));
    },
    handleKeyUp: (e: KeyboardEvent) => {
      managers.forEach(m => m.keyUp(e.key));
    },
    handleMouseMove: (e: MouseEvent, canvas: HTMLCanvasElement) => {
      const rect = canvas.getBoundingClientRect();
      managers[0].mouseMove(e.clientX - rect.left, e.clientY - rect.top);
    },
    handleMouseDown: () => managers[0].mouseDownFn(),
    handleMouseUp: () => managers[0].mouseUpFn(),
  };
}
