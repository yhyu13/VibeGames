// src/core/simulation/events.ts — SimEvent 环形队列(最近 64 个,TDD §3.4 / §5.1)
// core/ 平台纯净:零 THREE / 零 DOM / 零 zustand。
import type { SimEvent } from '../types';

// 事件队列容量:TDD §3.4 "最近 64 个 SimEvent"(__simEvents 调试钩子同源)
const MAX_EVENTS = 64;

// SimEvent 环形缓冲队列:push 覆盖最旧,toArray 按时间序返回快照。
export class EventQueue {
  private readonly buf: (SimEvent | null)[] = new Array<SimEvent | null>(MAX_EVENTS).fill(null);
  /** B08:不被 drain 清空的最近事件环(devtools __simEvents 用) */
  private recent: SimEvent[] = [];
  private head = 0;   // 下一个写入位置(环形)
  private count = 0;  // 当前有效元素数

  // 压入一个事件;超出容量时覆盖最旧事件(环形语义)
  push(e: SimEvent): void {
    this.buf[this.head] = e;
    this.head = (this.head + 1) % MAX_EVENTS;
    if (this.count < MAX_EVENTS) this.count += 1;
    this.recent.push(e);
    if (this.recent.length > MAX_EVENTS) this.recent.shift();
  }

  // 取出全部事件(按时间序)并清空队列
  drain(): SimEvent[] {
    const out = this.toArray();
    this.clear();
    return out;
  }

  // 以时间序返回当前全部事件的新数组(读快照,不改动队列)
  toArray(): SimEvent[] {
    const out: SimEvent[] = [];
    const start = this.count < MAX_EVENTS ? 0 : this.head;
    for (let i = 0; i < this.count; i += 1) {
      const e = this.buf[(start + i) % MAX_EVENTS];
      if (e) out.push(e);
    }
    return out;
  }

  /** 最近事件只读快照(drain 不影响;B08) */
  recentEvents(): SimEvent[] {
    return [...this.recent];
  }

  // 只读视图(兼容旧 stub 调用方)
  peek(): readonly SimEvent[] {
    return this.toArray();
  }

  // 清空队列(释放元素引用)
  clear(): void {
    this.buf.fill(null);
    this.head = 0;
    this.count = 0;
  }

  // 当前有效事件数
  get length(): number {
    return this.count;
  }
}
