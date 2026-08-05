// engine/GameEngine.ts — 编排器（TDD §7 冻结管线）
// rAF → 固定步累加器 → TickInput 组装（playerModel.sample + InputManager）→ sim.update
// → 事件分发 → store 批量同步（UiSnapshot）→ SceneManager.render → DEV 钩子。
// 冻结导出：createGame —— UI 层唯一挂载入口。

import type { SimApi } from '../core/simulation/Simulation';
import type { EventConsumer, SimEvent } from '../core/simulation/events';

export class GameEngine {
  constructor(
    private sim: SimApi,
    private consumers: EventConsumer[],
  ) {}

  tick(now: number): void {
    void this.sim;
    // TODO agent-engine: 固定步 1/60 累加器（MAX_SIM_STEPS 保护）+ §7 全管线
    void now;
  }

  dispatch(events: SimEvent[]): void {
    for (const e of events) {
      for (const c of this.consumers) c.onSimEvent(e);
    }
  }

  start(): void {
    // TODO agent-engine: rAF 循环启动
  }

  stop(): void {
    // TODO agent-engine: 停止循环 + 清理
  }
}

/** UI 层唯一挂载入口：创建完整游戏（内部装配 SceneManager/AudioManager/InputManager/devtools）。 */
export function createGame(canvas: HTMLCanvasElement, opts?: { sim?: SimApi }): { dispose(): void } {
  void canvas;
  void opts;
  // TODO agent-engine
  return { dispose: () => undefined };
}
