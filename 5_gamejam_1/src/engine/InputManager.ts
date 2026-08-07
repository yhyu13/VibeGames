// engine/InputManager.ts — WASD/LMB/1-2-3/Esc/Enter → BossControls + UiCommand（边沿检测，05 §3）
// poll() 每固定步调用一次：move 为当前按键意图（世界方向，y=0），attackPressed 为 LMB 边沿，
// ui 为待消费的 UI 命令队列（含组件派发的自定义 'uiCommand' 事件）。

import type { BossControls, ScriptId, UiCommand, Vector3 } from '../core/types';
import type { ScreenPoint } from '../core/simulation/mouseRhythm';

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
  pointer: ScreenPoint;
  clickPressed: boolean;
}

const GROUND_FORWARD = { x: -0.877, z: -0.481 };
const GROUND_RIGHT = { x: 0.481, z: -0.877 };

export function mapCameraRelativeMove(forward: number, right: number): Vector3 {
  const x = forward * GROUND_FORWARD.x + right * GROUND_RIGHT.x;
  const z = forward * GROUND_FORWARD.z + right * GROUND_RIGHT.z;
  const len = Math.hypot(x, z);
  return forward !== 0 && right !== 0 && len > 0 ? { x: x / len, y: 0, z: z / len } : { x, y: 0, z };
}

export class InputManager {
  private keys = new Set<string>();
  private move: Vector3 = { x: 0, y: 0, z: 0 };
  private attackPressed = false;
  private attackHeld = false;
  private pointer: ScreenPoint = { x: 0.5, y: 0.5 };
  private clickPressed = false;
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
    this.onMouseMove(e);
    this.attackPressed = true;
    this.attackHeld = true;
    this.clickPressed = true;
  };

  private onMouseMove = (e: MouseEvent): void => {
    this.pointer = {
      x: Math.max(0, Math.min(1, e.clientX / Math.max(1, window.innerWidth))),
      y: Math.max(0, Math.min(1, e.clientY / Math.max(1, window.innerHeight))),
    };
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
    window.addEventListener('mousemove', this.onMouseMove);
    window.addEventListener('uiCommand', this.onUiCommand);
  }

  poll(): PollResult {
    const forward = (this.keys.has('KeyW') ? 1 : 0) - (this.keys.has('KeyS') ? 1 : 0);
    const right = (this.keys.has('KeyD') ? 1 : 0) - (this.keys.has('KeyA') ? 1 : 0);
    this.move = mapCameraRelativeMove(forward, right);
    const controls: BossControls = {
      move: { x: this.move.x, y: 0, z: this.move.z },
      attackPressed: this.attackPressed,
      attackHeld: this.attackHeld,
    };
    this.attackPressed = false;
    const result = {
      controls,
      ui: this.uiQueue.splice(0, this.uiQueue.length),
      pointer: this.pointer,
      clickPressed: this.clickPressed,
    };
    this.clickPressed = false;
    return result;
  }

  dispose(): void {
    window.removeEventListener('keydown', this.onKeyDown);
    window.removeEventListener('keyup', this.onKeyUp);
    window.removeEventListener('mousedown', this.onMouseDown);
    window.removeEventListener('mouseup', this.onMouseUp);
    window.removeEventListener('mousemove', this.onMouseMove);
    window.removeEventListener('uiCommand', this.onUiCommand);
  }
}
