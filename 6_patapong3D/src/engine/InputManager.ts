/**
 * engine/InputManager.ts — 键盘输入
 *
 * M1.4 由 agent-engine 实现。
 * W/S / Arrow 移动(电平)、Space 发球(边沿)、R 重赛 / Esc 回菜单(边沿回调)、
 * M 静音切换(边沿回调,V3 新增)。
 */

/** UI 命令(与 core/types 冻结契约 UiCommand 镜像;agent-core 并行同步中) */
export type UiCommand = 'startMatch' | 'toMenu' | 'rematch' | 'toggleMute' | 'resetData';

export interface InputState {
  up: boolean;
  down: boolean;
  /** 单帧边沿:按下瞬间为 true,读取一次后复位 */
  launch: boolean;
}

export class InputManager {
  private state: InputState = { up: false, down: false, launch: false };
  private launchPending = false;
  private onCommand: ((cmd: UiCommand) => void) | null = null;
  private cleanup: Array<() => void> = [];

  constructor(onCommand?: (cmd: UiCommand) => void) {
    this.onCommand = onCommand ?? null;
  }

  /** 注入 UI 命令回调(R / Esc 边沿触发时调用) */
  setOnCommand(onCommand: (cmd: UiCommand) => void): void {
    this.onCommand = onCommand;
  }

  attach(target: Window | HTMLElement = window): void {
    const onKey = (e: KeyboardEvent, down: boolean): void => {
      if (e.repeat) return; // 忽略按住重复,只留边沿
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
          if (down) {
            this.launchPending = true;
            e.preventDefault();
          }
          break;
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
    const keyup = (e: Event): void => onKey(e as KeyboardEvent, false);
    target.addEventListener('keydown', keydown);
    target.addEventListener('keyup', keyup);
    this.cleanup.push(() => target.removeEventListener('keydown', keydown));
    this.cleanup.push(() => target.removeEventListener('keyup', keyup));
  }

  /** 读取输入缓冲(launch 为一次性边沿,读取后清空) */
  poll(): InputState {
    const out: InputState = { ...this.state, launch: this.launchPending };
    this.launchPending = false;
    return out;
  }

  dispose(): void {
    for (const fn of this.cleanup) fn();
    this.cleanup = [];
  }
}
