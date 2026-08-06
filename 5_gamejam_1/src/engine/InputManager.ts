// engine/InputManager.ts — WASD/LMB/1-2-3/Esc/Enter → BossControls + UiCommand（边沿检测，05 §3）
// poll() 每固定步调用一次：move 为当前按键意图（世界方向，y=0），attackPressed 为 LMB 边沿，
// ui 为待消费的 UI 命令队列（含组件派发的自定义 'uiCommand' 事件）。

import type { BossControls, ScriptId, UiCommand, Vector3 } from '../core/types';

const SCRIPT_KEYS: Record<string, ScriptId> = {
  Digit1: 'dignity',
  Numpad1: 'dignity',
  Digit2: 'tragic',
  Numpad2: 'tragic',
  Digit3: 'mad',
  Numpad3: 'mad',
};

export interface PollResult {
  controls: BossControls;
  ui: UiCommand[];
}

export class InputManager {
  private keys = new Set<string>();
  private move: Vector3 = { x: 0, y: 0, z: 0 };
  private attackPressed = false;
  private attackHeld = false;
  private uiQueue: UiCommand[] = [];

  private onKeyDown = (e: KeyboardEvent): void => {
    if (e.repeat) return;
    this.keys.add(e.code);
    if (e.code === 'Escape') this.uiQueue.push({ kind: 'pauseToggle' });
    if (e.code === 'Enter' || e.code === 'NumpadEnter') this.uiQueue.push({ kind: 'startRun' });
    const script = SCRIPT_KEYS[e.code];
    if (script) this.uiQueue.push({ kind: 'scriptPick', script });
  };

  private onKeyUp = (e: KeyboardEvent): void => {
    this.keys.delete(e.code);
  };

  private onMouseDown = (e: MouseEvent): void => {
    if (e.button !== 0) return;
    this.attackPressed = true;
    this.attackHeld = true;
  };

  private onMouseUp = (e: MouseEvent): void => {
    if (e.button === 0) this.attackHeld = false;
  };

  private onUiCommand = (e: Event): void => {
    const detail = (e as CustomEvent<UiCommand>).detail;
    if (detail && typeof detail === 'object' && 'kind' in detail) {
      this.uiQueue.push(detail);
    }
  };

  constructor() {
    window.addEventListener('keydown', this.onKeyDown);
    window.addEventListener('keyup', this.onKeyUp);
    window.addEventListener('mousedown', this.onMouseDown);
    window.addEventListener('mouseup', this.onMouseUp);
    window.addEventListener('uiCommand', this.onUiCommand);
  }

  poll(): PollResult {
    // W = +x（朝玩家方向），S = -x，A = -z，D = +z（Boss 面向 +z 的左手/右手系）
    const x = (this.keys.has('KeyW') ? 1 : 0) - (this.keys.has('KeyS') ? 1 : 0);
    const z = (this.keys.has('KeyD') ? 1 : 0) - (this.keys.has('KeyA') ? 1 : 0);
    const len = Math.hypot(x, z);
    this.move.x = len > 0 ? x / len : 0;
    this.move.z = len > 0 ? z / len : 0;
    const controls: BossControls = {
      move: { x: this.move.x, y: 0, z: this.move.z },
      attackPressed: this.attackPressed,
      attackHeld: this.attackHeld,
    };
    this.attackPressed = false;
    return { controls, ui: this.uiQueue.splice(0, this.uiQueue.length) };
  }

  dispose(): void {
    window.removeEventListener('keydown', this.onKeyDown);
    window.removeEventListener('keyup', this.onKeyUp);
    window.removeEventListener('mousedown', this.onMouseDown);
    window.removeEventListener('mouseup', this.onMouseUp);
    window.removeEventListener('uiCommand', this.onUiCommand);
  }
}
