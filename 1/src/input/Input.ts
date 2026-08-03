// Input: keyboard + mouse + gamepad. Signal-backed actions.

import { signal } from '../state/signals.js';

export interface InputState {
  fire: boolean;
  altFire: boolean;
  moveLeft: boolean;
  moveRight: boolean;
  laneUp: boolean;
  laneDown: boolean;
  openScan: boolean;
  openMap: boolean;
  pause: boolean;
  cursor: { x: number; y: number };
}

export class Input {
  readonly state = signal<InputState>({
    fire: false, altFire: false,
    moveLeft: false, moveRight: false,
    laneUp: false, laneDown: false,
    openScan: false, openMap: false, pause: false,
    cursor: { x: 0, y: 0 },
  });

  readonly primaryPulse = signal<number>(0);
  readonly secondaryPulse = signal<number>(0);

  private keysDown = new Set<string>();
  private handlers: { type: 'keydown' | 'keyup'; key: string; fn: () => void }[] = [];

  attach(target: Window | HTMLElement): void {
    target.addEventListener('keydown', this.onKeyDown as never);
    target.addEventListener('keyup', this.onKeyUp as never);
    target.addEventListener('mousemove', this.onMouseMove as never);
    target.addEventListener('mousedown', this.onMouseDown as never);
    (target as HTMLElement).addEventListener?.('contextmenu', (e) => e.preventDefault());
  }

  detach(target: Window | HTMLElement): void {
    target.removeEventListener('keydown', this.onKeyDown as never);
    target.removeEventListener('keyup', this.onKeyUp as never);
    target.removeEventListener('mousemove', this.onMouseMove as never);
    target.removeEventListener('mousedown', this.onMouseDown as never);
  }

  private update(): void {
    const cur = this.state.peek();
    this.state.value = {
      ...cur,
      fire: this.keysDown.has('Space') || this.keysDown.has('KeyZ'),
      altFire: this.keysDown.has('KeyX'),
      moveLeft: this.keysDown.has('KeyA') || this.keysDown.has('ArrowLeft'),
      moveRight: this.keysDown.has('KeyD') || this.keysDown.has('ArrowRight'),
      laneUp: this.keysDown.has('KeyW') || this.keysDown.has('ArrowUp'),
      laneDown: this.keysDown.has('KeyS') || this.keysDown.has('ArrowDown'),
      openScan: this.keysDown.has('Tab'),
      openMap: this.keysDown.has('KeyM'),
      pause: this.keysDown.has('Escape'),
    };
  }

  private onKeyDown = (e: KeyboardEvent): void => {
    if (e.repeat) return;
    this.keysDown.add(e.code);
    this.update();
    if (e.code === 'Space' || e.code === 'KeyZ') this.primaryPulse.value++;
    if (e.code === 'KeyX') this.secondaryPulse.value++;
  };

  private onKeyUp = (e: KeyboardEvent): void => {
    this.keysDown.delete(e.code);
    this.update();
  };

  private onMouseMove = (e: MouseEvent): void => {
    const cur = this.state.peek();
    this.state.value = { ...cur, cursor: { x: e.clientX, y: e.clientY } };
  };

  private onMouseDown = (e: MouseEvent): void => {
    if (e.button === 0) this.primaryPulse.value++;
    if (e.button === 2) this.secondaryPulse.value++;
  };
}