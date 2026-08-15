import type { PlayerInput } from '../core/types';

export class InputManager {
  private readonly keys = new Set<string>();
  constructor(
    private readonly send: (input: PlayerInput) => void,
    private readonly aimAngle: (clientX: number, clientY: number) => number,
  ) {}

  start(): void {
    window.addEventListener('keydown', this.onDown);
    window.addEventListener('keyup', this.onUp);
    window.addEventListener('mousemove', this.onMove);
    window.addEventListener('mousedown', this.onMouseDown);
    window.addEventListener('contextmenu', this.onContextMenu);
  }
  stop(): void {
    window.removeEventListener('keydown', this.onDown);
    window.removeEventListener('keyup', this.onUp);
    window.removeEventListener('mousemove', this.onMove);
    window.removeEventListener('mousedown', this.onMouseDown);
    window.removeEventListener('contextmenu', this.onContextMenu);
  }
  update(): void {
    this.send({ kind: 'move', dir: { x: Number(this.keys.has('KeyD')) - Number(this.keys.has('KeyA')), y: Number(this.keys.has('KeyS')) - Number(this.keys.has('KeyW')) }, speedMode: this.keys.has('ShiftLeft') || this.keys.has('ShiftRight') ? 'sprint' : 'walk' });
  }
  private onDown = (e: KeyboardEvent): void => {
    this.keys.add(e.code);
    // v3.6:R = 掷出当前武器(一次性;屏蔽长按 repeat 连掷)
    if (e.code === 'KeyR' && !e.repeat) this.send({ kind: 'throwStart' });
    // B66:E = 拾取/交互(与 R 掷出分离,修复"捡不了刀");F = 切换近战/远程
    if (e.code === 'KeyE' && !e.repeat) this.send({ kind: 'interactStart' });
    if (e.code === 'KeyF' && !e.repeat) this.send({ kind: 'toggleMode' });
    // Space = 翻滚(0.4s 无敌帧 + 1.5s 冷却;蓝脸冷却减半)
    if (e.code === 'Space' && !e.repeat) this.send({ kind: 'dodge' });
  };
  private onUp = (e: KeyboardEvent): void => { this.keys.delete(e.code); };
  private onMove = (e: MouseEvent): void => {
    this.send({ kind: 'aim', angle: this.aimAngle(e.clientX, e.clientY) });
  };
  // v3.6:LMB = 射击(持枪时),RMB = 近战挥刀;contextmenu 抑制游戏内右键菜单
  private onMouseDown = (e: MouseEvent): void => {
    if (e.button === 0) this.send({ kind: 'fireStart' });
    if (e.button === 2) this.send({ kind: 'attackStart' });
  };
  private onContextMenu = (e: MouseEvent): void => { e.preventDefault(); };
}
