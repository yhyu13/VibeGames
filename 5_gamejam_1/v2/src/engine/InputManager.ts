// engine/InputManager.ts — 键盘/鼠标轮询（WASD 屏幕相对 + LMB 边沿 + 快捷键）

import type { BossControls, UiCommand } from '../core/types';

export interface PollResult {
  controls: BossControls;
  ui: UiCommand[];
  pointer: { x: number; y: number }; // 归一化 0-1（y 上→0）
  clickPressed: boolean;
}

/** 固定设计机位的地面轴映射：W(前)=+z，D(右)=+x（镜头晃动不影响按键方向） */
export function mapCameraRelativeMove(forward: number, right: number): { x: number; y: number; z: number } {
  const len = Math.hypot(forward, right);
  if (len <= 0) return { x: 0, y: 0, z: 0 };
  return { x: right / len, y: 0, z: forward / len };
}

const KEY_UI: Record<string, UiCommand | null> = {
  Digit1: { kind: 'scriptPick', script: 'dignity' },
  Digit2: { kind: 'scriptPick', script: 'tragic' },
  Digit3: { kind: 'scriptPick', script: 'mad' },
  Enter: { kind: 'dialogueNext' },
  Space: { kind: 'dialogueNext' },
};

export class InputManager {
  private keys = new Set<string>();
  private uiQueue: UiCommand[] = [];
  private pointer = { x: 0.5, y: 0.5 };
  private lmbDown = false;
  private lmbPressed = false;
  private disposed = false;

  private onKeyDown = (e: KeyboardEvent): void => {
    if (e.repeat) return;
    if (e.key === 'Escape') {
      this.uiQueue.push({ kind: 'pauseToggle' });
      return;
    }
    const cmd = KEY_UI[e.code];
    if (cmd && !this.isTypingTarget(e)) {
      e.preventDefault();
      this.uiQueue.push(cmd);
    }
    this.keys.add(e.code);
  };

  private onKeyUp = (e: KeyboardEvent): void => {
    this.keys.delete(e.code);
  };

  private onPointerMove = (e: PointerEvent): void => {
    const w = window.innerWidth || 1;
    const h = window.innerHeight || 1;
    this.pointer = { x: e.clientX / w, y: e.clientY / h };
  };

  private onPointerDown = (e: PointerEvent): void => {
    if (e.button !== 0) return;
    this.lmbDown = true;
    this.lmbPressed = true;
  };

  private onPointerUp = (e: PointerEvent): void => {
    if (e.button !== 0) return;
    this.lmbDown = false;
  };

  private isTypingTarget(e: KeyboardEvent): boolean {
    const el = e.target as HTMLElement | null;
    return Boolean(el && (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' || el.isContentEditable));
  }

  attach(): void {
    if (this.disposed) return;
    window.addEventListener('keydown', this.onKeyDown);
    window.addEventListener('keyup', this.onKeyUp);
    window.addEventListener('pointermove', this.onPointerMove);
    window.addEventListener('pointerdown', this.onPointerDown);
    window.addEventListener('pointerup', this.onPointerUp);
  }

  dispose(): void {
    this.disposed = true;
    window.removeEventListener('keydown', this.onKeyDown);
    window.removeEventListener('keyup', this.onKeyUp);
    window.removeEventListener('pointermove', this.onPointerMove);
    window.removeEventListener('pointerdown', this.onPointerDown);
    window.removeEventListener('pointerup', this.onPointerUp);
  }

  /** 每帧轮询：LMB 边沿只存活一帧 */
  poll(): PollResult {
    const right = (this.keys.has('KeyD') ? 1 : 0) - (this.keys.has('KeyA') ? 1 : 0);
    const forward = (this.keys.has('KeyW') ? 1 : 0) - (this.keys.has('KeyS') ? 1 : 0);
    const controls: BossControls = {
      move: mapCameraRelativeMove(forward, right),
      attackPressed: this.lmbPressed,
      attackHeld: this.lmbDown,
    };
    const ui = this.uiQueue.splice(0, this.uiQueue.length);
    this.lmbPressed = false;
    return { controls, ui, pointer: { ...this.pointer }, clickPressed: controls.attackPressed };
  }
}
