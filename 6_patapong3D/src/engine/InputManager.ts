/**
 * engine/InputManager.ts — 键盘输入
 *
 * M1.4 由 agent-engine 实现。当前是 M0 骨架。
 */

export interface InputState {
  up: boolean;
  down: boolean;
  launch: boolean;
}

export class InputManager {
  private state: InputState = { up: false, down: false, launch: false };
  private cleanup: Array<() => void> = [];

  attach(target: Window | HTMLElement = window): void {
    const onKey = (e: KeyboardEvent, down: boolean): void => {
      switch (e.code) {
        case 'KeyW':
        case 'ArrowUp':
          this.state.up = down;
          break;
        case 'KeyS':
        case 'ArrowDown':
          this.state.down = down;
          break;
        case 'Space':
          this.state.launch = down;
          if (down) e.preventDefault();
          break;
        default:
          return;
      }
    };
    const keydown = (e: Event): void => onKey(e as KeyboardEvent, true);
    const keyup = (e: Event): void => onKey(e as KeyboardEvent, false);
    target.addEventListener('keydown', keydown);
    target.addEventListener('keyup', keyup);
    this.cleanup.push(() => target.removeEventListener('keydown', keydown));
    this.cleanup.push(() => target.removeEventListener('keyup', keyup));
  }

  poll(): InputState {
    return { ...this.state };
  }

  dispose(): void {
    for (const fn of this.cleanup) fn();
    this.cleanup = [];
  }
}
