/**
 * engine/InputManager.ts — 键盘输入(4 键节奏 + UI 命令)
 *
 * M1.4 由 agent-engine 实现。
 * 4 键节奏:
 *   W → PATA / A → PON / S → DON / D → CHAKA
 *   任一键按下 = 单帧边沿(launch),读取后清空。
 *   注意:Player 必须按"对应"键才命中,按错算 miss(由 rhythm.judgeInput 判定)。
 *
 * UI 命令:
 *   R → rematch / Esc → toMenu / M → toggleMute(在 onCommand 回调里)
 */

import type { NoteType } from '../core/types';

/** UI 命令(与 store.ts 镜像) */
export type UiCommand =
  | 'startMatch'
  | 'toMenu'
  | 'rematch'
  | 'toggleMute'
  | 'resetData'
  | 'skipIntro';

/** 4 键映射表 */
const KEY_TO_NOTE: Record<string, NoteType> = {
  KeyW: 'PATA',
  KeyA: 'PON',
  KeyS: 'DON',
  KeyD: 'CHAKA',
};

/** 单帧输入状态(launch 是按键边沿,读取一次后清空) */
export interface InputState {
  /** 当前帧按下的 4 键之一(同时按多个 = 取最新;只读一次) */
  type: NoteType | null;
  /** 单帧边沿:等同 type,read 后清空 */
  launch: boolean;
}

export class InputManager {
  private state: InputState = { type: null, launch: false };
  private onCommand: ((cmd: UiCommand) => void) | null = null;
  private cleanup: Array<() => void> = [];

  constructor(onCommand?: (cmd: UiCommand) => void) {
    this.onCommand = onCommand ?? null;
  }

  /** 注入 UI 命令回调(R / Esc / M 边沿触发时调用) */
  setOnCommand(onCommand: (cmd: UiCommand) => void): void {
    this.onCommand = onCommand;
  }

  attach(target: Window | HTMLElement = window): void {
    const onKey = (e: KeyboardEvent, down: boolean): void => {
      // 不阻止 W/A/S/D 之外的默认行为(让浏览器原生处理)
      switch (e.code) {
        case 'KeyW':
        case 'KeyA':
        case 'KeyS':
        case 'KeyD': {
          if (down) {
            const note = KEY_TO_NOTE[e.code];
            if (note) {
              this.state.type = note;
              this.state.launch = true;
              e.preventDefault(); // 防止 Ctrl+W 关 tab
            }
          }
          break;
        }
        case 'KeyR':
          if (down) this.onCommand?.('rematch');
          break;
        case 'Escape':
          if (down) this.onCommand?.('toMenu');
          break;
        case 'KeyM':
          if (down) this.onCommand?.('toggleMute');
          break;
        default:
          return;
      }
    };
    const keydown = (e: Event): void => onKey(e as KeyboardEvent, true);
    target.addEventListener('keydown', keydown);
    this.cleanup.push(() => target.removeEventListener('keydown', keydown));
  }

  /** 读取输入缓冲(launch / type 是一次性边沿,读取后清空) */
  poll(): InputState {
    const out: InputState = { type: this.state.type, launch: this.state.launch };
    this.state.type = null;
    this.state.launch = false;
    return out;
  }

  dispose(): void {
    for (const fn of this.cleanup) fn();
    this.cleanup = [];
  }
}
