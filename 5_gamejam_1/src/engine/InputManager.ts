// engine/InputManager.ts — WASD/LMB/1-2-3/Esc/Enter 采样 → BossControls + UiCommand（边沿检测）
// 05-ux-pacing.md §3 输入方案：WASD 走位、LMB 出招、1/2/3 选剧本、Enter 开始、Esc 暂停。
// poll() 每帧调用一次：返回 controls（含 attackPressed 边沿）与累积的 ui 命令队列。

import type { BossControls, UiCommand, Vector3 } from '../core/types';

/** WASD 四键（e.code） */
const MOVE_KEYS = new Set(['KeyW', 'KeyA', 'KeyS', 'KeyD']);

export class InputManager {
  private keys = new Set<string>();
  private uiQueue: UiCommand[] = [];
  private mouseDown = false;
  private attackEdge = false;
  private disposed = false;

  constructor() {
    window.addEventListener('keydown', this.onKeyDown, { passive: false });
    window.addEventListener('keyup', this.onKeyUp);
    window.addEventListener('mousedown', this.onMouseDown);
    window.addEventListener('mouseup', this.onMouseUp);
    window.addEventListener('blur', this.onBlur);
  }

  private onKeyDown = (e: KeyboardEvent): void => {
    if (e.repeat) return;
    if (MOVE_KEYS.has(e.code)) {
      this.keys.add(e.code);
      return;
    }
    switch (e.code) {
      case 'Digit1':
        e.preventDefault();
        this.uiQueue.push({ kind: 'scriptPick', script: 'dignity' });
        break;
      case 'Digit2':
        e.preventDefault();
        this.uiQueue.push({ kind: 'scriptPick', script: 'tragic' });
        break;
      case 'Digit3':
        e.preventDefault();
        this.uiQueue.push({ kind: 'scriptPick', script: 'mad' });
        break;
      case 'Enter':
        e.preventDefault();
        this.uiQueue.push({ kind: 'startRun' });
        break;
      case 'Escape':
        e.preventDefault();
        this.uiQueue.push({ kind: 'pauseToggle' });
        break;
      default:
        break;
    }
  };

  private onKeyUp = (e: KeyboardEvent): void => {
    this.keys.delete(e.code);
  };

  private onMouseDown = (e: MouseEvent): void => {
    if (e.button !== 0) return;
    this.mouseDown = true;
    this.attackEdge = true;
  };

  private onMouseUp = (e: MouseEvent): void => {
    if (e.button !== 0) return;
    this.mouseDown = false;
  };

  private onBlur = (): void => {
    this.keys.clear();
    this.mouseDown = false;
  };

  /** 每帧采样：controls 快照 + 自上次 poll 以来累积的 ui 边沿命令。 */
  poll(): { controls: BossControls; ui: UiCommand[] } {
    const move = this.readMove();
    const ui = this.uiQueue.splice(0, this.uiQueue.length);
    const controls: BossControls = {
      move,
      attackPressed: this.attackEdge,
      attackHeld: this.mouseDown,
    };
    this.attackEdge = false;
    return { controls, ui };
  }

  private readMove(): Vector3 {
    let x = 0;
    let z = 0;
    if (this.keys.has('KeyW')) z -= 1;
    if (this.keys.has('KeyS')) z += 1;
    if (this.keys.has('KeyA')) x -= 1;
    if (this.keys.has('KeyD')) x += 1;
    if (x !== 0 || z !== 0) {
      const len = Math.hypot(x, z);
      x /= len;
      z /= len;
    }
    return { x, y: 0, z };
  }

  /** 供 UI 按钮等外部路径注入命令（组件→engine 转发，不直改模拟）。 */
  queueUi(cmd: UiCommand): void {
    this.uiQueue.push(cmd);
  }

  dispose(): void {
    if (this.disposed) return;
    this.disposed = true;
    window.removeEventListener('keydown', this.onKeyDown);
    window.removeEventListener('keyup', this.onKeyUp);
    window.removeEventListener('mousedown', this.onMouseDown);
    window.removeEventListener('mouseup', this.onMouseUp);
    window.removeEventListener('blur', this.onBlur);
  }
}
