export interface GameEventMap {
  'phase:entered': { phase: string };
  'day:started': { day: number };
  'hull:changed': { hull: number; maxHull: number };
  'target:destroyed': { id: string; name: string };
  'target:hit': { id: string; hp: number; maxHp: number };
  'node:compromised': { id: string };
  'segment:converted': { id: string };
  'audio:play': { id: string };
  'log': { text: string };
  'run:ended': { outcome: string };
  'combat:end': { victory: boolean };
  'salvage:changed': { salvage: number };
}

export class EventBus {
  private listeners = new Map<string, Set<(payload: never) => void>>();

  on<K extends keyof GameEventMap>(event: K, fn: (payload: GameEventMap[K]) => void): () => void {
    let set = this.listeners.get(event);
    if (!set) {
      set = new Set();
      this.listeners.set(event, set);
    }
    set.add(fn as (payload: never) => void);
    return () => this.off(event, fn);
  }

  off<K extends keyof GameEventMap>(event: K, fn: (payload: GameEventMap[K]) => void): void {
    this.listeners.get(event)?.delete(fn as (payload: never) => void);
  }

  emit<K extends keyof GameEventMap>(event: K, payload: GameEventMap[K]): void {
    const set = this.listeners.get(event);
    if (!set) return;
    for (const fn of [...set]) {
      try {
        fn(payload as never);
      } catch (err) {
        console.error(`EventBus handler error for "${event}"`, err);
      }
    }
  }
}
