// src/engine/GameEngine.ts — 最小 stub(2026-08-09 重置)
// 场景渲染(SceneManager / RcPipeline / shaders / postfx / sprites / PerfWatchdog)
// 与输入(InputManager)已移除并归档至 `_archive-2026-08-09/`。
// 当前只保留构造 / 启停空壳:app 停在标题层,不创建 canvas、不消费 UI 命令。
import type { ISimulation } from '../core/types';

export class GameEngine {
  constructor(
    _sim: ISimulation,
    _host: HTMLElement,
  ) {}

  start(): void {
    // 重置期无主循环 / 无场景。
  }

  stop(): void {
    // 重置期无资源可释放。
  }
}
