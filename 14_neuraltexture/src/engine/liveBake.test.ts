/**
 * Guards the split between the two loss series.
 *
 * The bug these tests exist to prevent: the HUD row labelled "bake log-L1" showed
 * the batch-training loss for the whole bake and then silently became the held-out
 * val at the last frame — one label, two quantities, a ~4x value difference, and no
 * indication that the estimator had changed. The in-page chart drew the train curve
 * alone, so the descent a viewer watched was fitting, not generalisation.
 */
import { describe, expect, it } from 'vitest'
import { xavierInit } from '../core/mlp'
import {
  HISTORY_CADENCE, VAL_SAMPLES, VAL_SEED, heldOutVal, mulberry32, trainDecoder,
  validateLogL1,
} from '../core/train'
import { createLiveBake, type BakeSeries } from './liveBake'

/** The loop calls the global `requestAnimationFrame`, which does not exist in Node. */
const rafHost = globalThis as { requestAnimationFrame?: (cb: (t: number) => void) => number }

/**
 * Drives a bake to completion synchronously. The stub QUEUES instead of calling
 * back inline: an inline stub would recurse one frame per chunk and a full-length
 * bake would be 1000 frames deep.
 */
function runBake(opts: { steps: number; seed?: number }): {
  series: BakeSeries
  finalVal: number
  stepsSeen: number[]
} {
  const queue: Array<() => void> = []
  const prev = rafHost.requestAnimationFrame
  const stepsSeen: number[] = []
  let series: BakeSeries = { train: [], val: [] }
  let finalVal = Number.NaN

  rafHost.requestAnimationFrame = (cb) => {
    queue.push(() => cb(0))
    return queue.length
  }
  try {
    const handle = createLiveBake({
      steps: opts.steps,
      seed: opts.seed ?? 1,
      chunks: 8,
      onStep: (step, _loss, _lr, s) => {
        stepsSeen.push(step)
        series = s
      },
      onDone: (v, s) => {
        finalVal = v
        series = s
      },
    })
    handle.start()
    while (queue.length > 0) {
      const next = queue.shift()
      if (next === undefined) break
      next()
    }
  } finally {
    if (prev === undefined) delete rafHost.requestAnimationFrame
    else rafHost.requestAnimationFrame = prev
  }
  return { series, finalVal, stepsSeen }
}

const STEPS = 200

describe('held-out estimator', () => {
  it('is the one definition trainDecoder and the in-page bake both use', () => {
    const w = xavierInit(mulberry32(1))
    // The literal pair the estimator replaced. If these diverge, the demo has two
    // different numbers both called "the val loss".
    expect(heldOutVal(w)).toBe(validateLogL1(w, mulberry32(99), 1024))
    expect(VAL_SEED).toBe(99)
    expect(VAL_SAMPLES).toBe(1024)
    // Golden value for untrained weights: pins the seed, so a silent change to it
    // (which would silently change the number the HUD reports) fails here.
    expect(heldOutVal(w)).toBeCloseTo(0.7077870981649005, 12)
  })
})

describe('live bake reports fit and generalisation as two series', () => {
  it('keeps train and val as different arrays with different values', () => {
    const { series } = runBake({ steps: STEPS })
    expect(series.train.length).toBeGreaterThan(1)
    expect(series.val.length).toBe(series.train.length)
    expect(series.val).not.toBe(series.train)
    // Not merely a different array: a real held-out loss sits well clear of the
    // batch loss once the batch is fit. Aliasing val to train would make this 0.
    const worst = Math.max(...series.val.map((v, i) => Math.abs(v - series.train[i])))
    expect(worst).toBeGreaterThan(0.01)
  })

  it('reports exactly the last val it plotted', () => {
    const { series, finalVal } = runBake({ steps: STEPS })
    expect(finalVal).toBe(series.val[series.val.length - 1])
  })

  it('samples both series on the same steps, so the curves share an x-axis', () => {
    const { series, stepsSeen } = runBake({ steps: STEPS })
    const expected = [0, 50, 100, 150, STEPS - 1]
    expect(stepsSeen).toEqual(expected)
    expect(series.train.length).toBe(expected.length)
    expect(series.val.length).toBe(expected.length)
    expect(HISTORY_CADENCE).toBe(50)
  })

  it('runs the same computation as the offline bake', () => {
    // The file's own claim is "no new math". Sampling the held-out val must not
    // touch the training rng stream — if it drew from `rng`, the train series would
    // diverge from the offline run and this fails on the first element.
    const live = runBake({ steps: STEPS, seed: 1 })
    const offline = trainDecoder({ steps: STEPS, seed: 1 })
    expect(live.series.train).toEqual(offline.history)
    expect(live.finalVal).toBe(offline.finalVal)
  })

  it('measures val on a fixed held-out set, so the curve is learning not noise', () => {
    // Re-calling on the SAME weights must return the SAME number. An implementation
    // that advanced one rng across calls would score every point on a different
    // held-out sample set, and the val curve would be sampling noise on top of any
    // real descent — the one failure mode that looks like learning but is not.
    const w = xavierInit(mulberry32(1))
    expect(heldOutVal(w)).toBe(heldOutVal(w))
    expect(heldOutVal(w, 256)).toBe(heldOutVal(w, 256))

    const a = runBake({ steps: STEPS, seed: 1 })
    const b = runBake({ steps: STEPS, seed: 1 })
    expect(a.series.val).toEqual(b.series.val)
    // A different training seed gives a different val CURVE (the weights differ at
    // every point) while still measuring the same held-out set — asserted above.
    const c = runBake({ steps: STEPS, seed: 2 })
    expect(c.series.val).not.toEqual(a.series.val)
  })
})
