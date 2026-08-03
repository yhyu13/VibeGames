// Signal helpers built on @preact/signals-core.
// State layer uses signals; render layer subscribes.

import { signal, computed, batch, effect, type Signal, type ReadonlySignal } from '@preact/signals-core';

export { signal, computed, batch, effect };
export type { Signal, ReadonlySignal };

/** Binds a callback to a signal's value changes. Returns an unsubscribe function. */
export function watch<T>(s: ReadonlySignal<T>, fn: (value: T) => void): () => void {
  return effect(() => {
    fn(s.value);
  });
}

/** Reads a signal's value without subscribing. */
export function peek<T>(s: ReadonlySignal<T>): T {
  return s.peek();
}

/** Creates a derived signal from a list of source signals. */
export function derive<T>(sources: ReadonlySignal<unknown>[], fn: () => T): ReadonlySignal<T> {
  return computed(() => {
    for (const s of sources) s.value;
    return fn();
  });
}