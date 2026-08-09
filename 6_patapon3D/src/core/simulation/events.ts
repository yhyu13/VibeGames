/**
 * core/simulation/events.ts — 事件队列与订阅
 *
 * M1.3 由 agent-core 完成。当前是 M0 骨架。
 *
 * 设计:SimEvent 由核心 emit,被 engine 消费(SimEvent 是 core 与 engine 之间的桥)。
 * 不允许 engine 直接修改 sim 内部状态。
 */

import type { SimEvent } from '../types';

export class EventBus {
  private queue: SimEvent[] = [];
  private subscribers: Array<(e: SimEvent) => void> = [];
  /** 仅用于 devtools 显示 */
  private history: SimEvent[] = [];
  private readonly historyMax = 64;

  emit(event: SimEvent): void {
    this.queue.push(event);
    this.history.push(event);
    if (this.history.length > this.historyMax) {
      this.history.shift();
    }
  }

  /** 引擎每帧调用,排空队列并通知所有订阅者 */
  drain(): SimEvent[] {
    const out = this.queue;
    this.queue = [];
    for (const sub of this.subscribers) {
      for (const e of out) sub(e);
    }
    return out;
  }

  /** 直接订阅(不等 drain,实时) */
  subscribe(handler: (e: SimEvent) => void): () => void {
    this.subscribers.push(handler);
    return () => {
      this.subscribers = this.subscribers.filter((s) => s !== handler);
    };
  }

  recent(n: number): SimEvent[] {
    return this.history.slice(-n);
  }
}
