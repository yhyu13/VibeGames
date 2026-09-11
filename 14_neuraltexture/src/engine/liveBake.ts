/**
 * In-page live bake. A chunked drop-in for the offline `trainDecoder` loop so the
 * decoder trains in the browser, streaming the loss series via `onStep` and the
 * appended `series`. Reuses the exact same primitives as `src/core/train.ts`
 * (trainStep / cosineLr / createAdam / xavierInit / mulberry32 / heldOutVal /
 * HISTORY_CADENCE) — no new math, no MLP restructure. Work is sliced across
 * animation frames so the render loop (and the loss sparkline) stay responsive.
 */
import { TRAIN_BATCH, TRAIN_STEPS } from '../core/constants'
import { xavierInit } from '../core/mlp'
import {
  HISTORY_CADENCE, cosineLr, createAdam, heldOutVal, mulberry32, trainStep,
} from '../core/train'

/**
 * The two curves, kept in one object so neither can be drawn without the other.
 *
 * They are different quantities with different meanings and — measured on a full
 * 8000-step bake — visibly different shapes: `train` only reaches its 0.009 minimum
 * at step 7100 and then climbs back to 0.033, ending ABOVE its own minimum, while
 * `val` descends 0.700 → 0.046, falling on 83% of the steps it is sampled at.
 * Reporting one under the other's name is how a fitting curve gets read as
 * convergence.
 */
export interface BakeSeries {
  /**
   * Mean log-L1 of the last training batch — what the optimizer is descending.
   * Measures how well the MLP has fit the batch it is training on, NOT the decoder.
   */
  train: number[]
  /**
   * Held-out val log-L1 at the SAME step as `train[i]`, on a fixed held-out set.
   * The only series that measures the decoder; `val.at(-1)` IS the number `onDone`
   * reports and the number the HUD shows, so the readout and the last plotted point
   * cannot be two different quantities.
   */
  val: number[]
}

export interface LiveBakeOptions {
  /** Total steps to run (default TRAIN_STEPS). */
  steps?: number
  /** Batch per training step (default TRAIN_BATCH). */
  batch?: number
  /** RNG seed (default 1, matching trainDecoder). */
  seed?: number
  /** Training steps to run per animation frame (default 8). */
  chunks?: number
  /** Fired each time a point is appended to both series (trainDecoder's cadence). */
  onStep?: (step: number, trainLoss: number, lr: number, series: BakeSeries) => void
  /** Fired once on completion with the held-out val log-L1 + the full series. */
  onDone?: (finalVal: number, series: BakeSeries) => void
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
  const series: BakeSeries = { train: [], val: [] }
  let step = 0
  let started = false

  const tick = (): void => {
    const target = Math.min(step + chunks, steps)
    for (let i = step; i < target; i++) {
      const lr = cosineLr(i, steps)
      const loss = trainStep(weights, adam, rng, lr, batch)
      // Same cadence as trainDecoder: a point every HISTORY_CADENCE steps + final.
      if (i % HISTORY_CADENCE === 0 || i === steps - 1) {
        series.train.push(loss)
        // The held-out set is fixed (heldOutVal seeds its own rng), so consecutive
        // val points are paired measurements on the same points — the curve shows
        // learning, not sampling noise. It costs ~4% of the bake.
        series.val.push(heldOutVal(weights))
        opts.onStep?.(i, loss, lr, series)
      }
    }
    step = target
    if (step < steps) {
      requestAnimationFrame(tick)
    } else {
      // Read off the series rather than re-deriving it: the last cadence point is
      // already a held-out val of these exact weights, so recomputing it would be a
      // second definition of the reported number and a chance for the two to differ.
      const finalVal = series.val[series.val.length - 1]
      opts.onDone?.(finalVal, series)
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
