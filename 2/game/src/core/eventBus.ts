export type EventHandler<T> = (payload: T) => void;

export interface EventBus {
  emit<T>(type: string, payload: T): void;
  on<T>(type: string, handler: EventHandler<T>): () => void;
  clear(): void;
}

export class EventBusImpl implements EventBus {
  private handlers = new Map<string, Set<EventHandler<unknown>>>();

  emit<T>(type: string, payload: T): void {
    const set = this.handlers.get(type);
    if (!set) return;
    for (const h of set) h(payload);
  }

  on<T>(type: string, handler: EventHandler<T>): () => void {
    let set = this.handlers.get(type);
    if (!set) {
      set = new Set();
      this.handlers.set(type, set);
    }
    const wrapped = handler as EventHandler<unknown>;
    set.add(wrapped);
    return () => set.delete(wrapped);
  }

  clear(): void {
    this.handlers.clear();
  }
}
