export class Input {
  keys = new Set<string>();
  mouseDelta = { x: 0, y: 0 };
  mouseButtons = { left: false, right: false };
  private listeners: Array<() => void> = [];
  private locked = false;
  private onLockChange?: (locked: boolean) => void;

  attach(el: HTMLElement): void {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.repeat) return;
      this.keys.add(e.code);
    };
    const onKeyUp = (e: KeyboardEvent) => this.keys.delete(e.code);
    const onMouseMove = (e: MouseEvent) => {
      this.mouseDelta.x += e.movementX;
      this.mouseDelta.y += e.movementY;
    };
    const onMouseDown = (e: MouseEvent) => {
      if (e.button === 0) this.mouseButtons.left = true;
      if (e.button === 2) this.mouseButtons.right = true;
    };
    const onMouseUp = (e: MouseEvent) => {
      if (e.button === 0) this.mouseButtons.left = false;
      if (e.button === 2) this.mouseButtons.right = false;
    };
    const onLockChange = () => {
      this.locked = document.pointerLockElement === el;
      if (!this.locked) {
        this.mouseButtons.left = false;
        this.mouseButtons.right = false;
      }
      this.onLockChange?.(this.locked);
    };
    const onBlur = () => {
      this.keys.clear();
      this.mouseButtons.left = false;
      this.mouseButtons.right = false;
    };

    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    document.addEventListener('pointerlockchange', onLockChange);
    window.addEventListener('blur', onBlur);
    this.listeners.push(() => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('pointerlockchange', onLockChange);
      window.removeEventListener('blur', onBlur);
    });
  }

  get pointerLocked(): boolean {
    return this.locked;
  }

  requestLock(el: HTMLElement): void {
    el.requestPointerLock?.();
  }

  releaseLock(): void {
    document.exitPointerLock?.();
  }

  consumeMouseDelta(): { x: number; y: number } {
    const d = { ...this.mouseDelta };
    this.mouseDelta.x = 0;
    this.mouseDelta.y = 0;
    return d;
  }

  isDown(code: string): boolean {
    return this.keys.has(code);
  }

  dispose(): void {
    for (const off of this.listeners) off();
    this.listeners = [];
  }
}
