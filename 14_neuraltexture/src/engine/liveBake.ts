/**
 * In-page live bake. A chunked drop-in for the offline `trainDecoder` loop so the
 * decoder trains in the browser, streaming per-step loss via `onStep` and the
 * appended `history[]`. Reuses the exact same primitives as `src/core/train.ts`
 * (trainStep / cosineLr / createAdam / xavierInit / mulberry32 / validateLogL1) —
 * no new math, no MLP restructure. Work is sliced across animation frames so the
 * render loop (and the loss sparkline) stay responsive.
 */
import { TRAIN_BATCH, TRAIN_STEPS } from '../core/constants'
import { xavierInit } from '../core/mlp'
import {
  cosineLr, createAdam, mulberry32, trainStep, validateLogL1,
} from '../core/train'

export interface LiveBakeOptions {
  /** Total steps to run (default TRAIN_STEPS). */
  steps?: number
  /** Batch per training step (default TRAIN_BATCH). */
  batch?: number
  /** RNG seed (default 1, matching trainDecoder). */
  seed?: number
  /** Training steps to run per animation frame (default 8). */
  chunks?: number
  /** Fired each time a point is appended to history (mirrors trainDecoder's 50-step cadence). */
  onStep?: (step: number, trainLoss: number, lr: number, history: number[]) => void
  /** Fired once on completion with the held-out val log-L1 + full history. */
  onDone?: (finalVal: number, history: number[]) => void
}

export interface LiveBakeHandle {
  start: () => void
}

export function createLiveBake(opts: LiveBakeOptions = {}): LiveBakeHandle {
  const steps = opts.steps ?? TRAIN_STEPS
  const batch = opts.batch ?? TRAIN_BATCH
  const seed = opts.seed ?? 1
  const chunks = opts.chunks ?? 8

  const rng = mulberry32(seed)
  const weights = xavierInit(rng)
  const adam = createAdam()
  const history: number[] = []
  let step = 0
  let started = false

  const tick = (): void => {
    const target = Math.min(step + chunks, steps)
    for (let i = step; i < target; i++) {
      const lr = cosineLr(i, steps)
      const loss = trainStep(weights, adam, rng, lr, batch)
      // Same cadence as trainDecoder: a history point every 50 steps + final.
      if (i % 50 === 0 || i === steps - 1) {
        history.push(loss)
        opts.onStep?.(i, loss, lr, history)
      }
    }
    step = target
    if (step < steps) {
      requestAnimationFrame(tick)
    } else {
      const finalVal = validateLogL1(weights, mulberry32(99), 1024)
      opts.onDone?.(finalVal, history)
    }
  }

  return {
    start: () => {
      if (started) return
      started = true
      requestAnimationFrame(tick)
    },
  }
}
