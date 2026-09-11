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

/**
 * The two numbers the word "converged" is made of, named so both places that use it can
 * point at the same ones. Eight samples is 400 steps at `HISTORY_CADENCE`, and the
 * threshold is in DECADES rather than in loss, so one pair covers a curve at 0.7 and a
 * curve at 0.05 — "the last 400 steps moved it less than 2.3%" means the same at both.
 */
export const CONVERGED_WINDOW = 8
export const CONVERGED_DECADES = 0.01

/**
 * Did the val loss move less than `CONVERGED_DECADES` across the window ending at `end`?
 *
 * Two-sided on purpose. The one-sided `a - b < threshold` this was lifted from is
 * satisfied by a loss that CLIMBS — `a` is the older sample, so a rise makes the
 * difference negative and any rise at all passes. A run whose val loss was climbing at
 * the last frame reported "converged"; movement is movement, and a floor is not a floor
 * if the curve is on its way back up.
 */
function quiet(val: readonly number[], end: number): boolean {
  if (end + 1 < CONVERGED_WINDOW) return false
  const a = Math.log10(Math.max(val[end - CONVERGED_WINDOW + 1], 1e-9))
  const b = Math.log10(Math.max(val[end], 1e-9))
  return Math.abs(a - b) < CONVERGED_DECADES
}

/**
 * Is the run converged NOW? The state the HUD's `— converged` reports, and the question
 * a viewer has once the curve flattens: did the loss stop sliding, or is the run still
 * mid-descent and merely slow this frame?
 *
 * Judged on the VAL series, because the train series oscillates around its own floor from
 * step ~1000 on — judging convergence on it would be judging it on noise.
 */
export function isConverged(val: readonly number[]): boolean {
  return val.length >= CONVERGED_WINDOW && quiet(val, val.length - 1)
}

/**
 * WHERE the descent stopped: the first sample from which a `CONVERGED_WINDOW`-long run
 * moves the val loss by less than `CONVERGED_DECADES`; -1 while the curve is still falling
 * or the series is too short to say.
 *
 * It answers with a POSITION rather than a boolean because the chart has to draw a
 * location, and a boolean plus a private second scan for that location would be two
 * definitions of one event — the class of bug this file has already been fixed for twice
 * (`heldOutVal`, `HISTORY_CADENCE`). So the window test above is defined once and both
 * questions are asked through it: the HUD asks whether the TAIL is quiet, the chart asks
 * where the FIRST quiet window begins.
 *
 * The returned index is stable under appending — the samples in an existing window never
 * change, so a redraw can move the mark neither earlier nor later once it appears.
 */
export function convergedAt(val: readonly number[]): number {
  for (let i = 0; i + CONVERGED_WINDOW <= val.length; i++) {
    if (quiet(val, i + CONVERGED_WINDOW - 1)) return i
  }
  return -1
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
