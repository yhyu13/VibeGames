// Event log + event bus.

import { signal } from '../signals.js';
import type { GameEvent } from '../types.js';

export function createEventLog() {
  return signal<GameEvent[]>([]);
}

export function logEvent(events: ReturnType<typeof signal<GameEvent[]>>, kind: string, tick: number, payload?: unknown): void {
  const cur = events.peek();
  const ev: GameEvent = { tick, kind };
  if (payload !== undefined) ev.payload = payload;
  const arr = cur ? cur.slice() : [];
  arr.push(ev);
  if (arr.length > 200) arr.shift();
  events.value = arr;
}