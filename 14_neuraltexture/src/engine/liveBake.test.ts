/**
 * Guards the split between the two loss series.
 *
 * The bug these tests exist to prevent: the HUD row labelled "bake log-L1" showed
 * the batch-training loss for the whole bake and then silently became the held-out
 * val at the last frame — one label, two quantities, a 1.4x value difference at the
 * moment of the swap, and no indication that the estimator had changed. The in-page chart drew the train curve
 * alone, so the descent a viewer watched was fitting, not generalisation.
 */
import { describe, expect, it } from 'vitest'
import { xavierInit } from '../core/mlp'
import {
  HISTORY_CADENCE, VAL_SAMPLES, VAL_SEED, heldOutVal, mulberry32, trainDecoder,
  validateLogL1,
} from '../core/train'
import {
  CONVERGED_DECADES, CONVERGED_WINDOW, convergedAt, createLiveBake, isConverged,
  type BakeSeries,
} from './liveBake'

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

/**
 * "Converged" is the one word in this demo that can be true or false without anyone
 * noticing, so it gets the treatment a control gets: a case where it must be FALSE.
 *
 * The pair also has a second job now. The HUD prints the word and the chart draws a mark
 * at the point in the curve where the descent stopped, and a mark is only worth drawing
 * if it is the same claim the word makes — so these pin the shared window test, not just
 * the boolean.
 */
describe('where the val curve stopped descending', () => {
  /** Falls by ~10% a step: louder than the threshold at every window, so never quiet. */
  const DESCENDING = Array.from({ length: 20 }, (_, i) => 0.7 * 0.8 ** i)
  /** Falls hard for the first nine samples, then holds 0.02 exactly. */
  const SETTLES = [0.7, 0.5, 0.3, 0.2, 0.1, 0.05, 0.04, 0.03, 0.02, 0.02, 0.02, 0.02, 0.02, 0.02, 0.02, 0.02]

  it('says NOT converged while the curve is still falling', () => {
    // Without this case the word could be a constant and every other test here would
    // still pass — the failure mode is an instrument that can only report one answer.
    expect(convergedAt(DESCENDING)).toBe(-1)
    expect(isConverged(DESCENDING)).toBe(false)
    // Not vacuous: the same curve IS called converged once it holds still.
    expect(isConverged(DESCENDING.concat(Array.from({ length: 20 }, () => 0.02)))).toBe(true)
  })

  it('does not call a RISING val loss converged', () => {
    // Lifted from a one-sided test (`a - b < threshold`), which a climbing loss satisfies:
    // the older sample is the smaller one, so the difference goes negative and every rise
    // passes. A diverging run read as "converged" — the word's opposite.
    const rising = Array.from({ length: CONVERGED_WINDOW }, (_, i) => 0.05 + i * 0.03)
    expect(isConverged(rising)).toBe(false)
    expect(convergedAt(rising)).toBe(-1)
  })

  it('marks the first sample of the run that stopped moving, not the last one that did', () => {
    // The descent's final movement is 0.03 -> 0.02 at index 8, so index 8 is where the
    // curve becomes flat and where the mark belongs. Reporting the window's far end
    // instead would put the mark seven samples into the plateau it is there to explain.
    expect(SETTLES[8]).toBe(0.02)
    expect(convergedAt(SETTLES)).toBe(8)
    expect(convergedAt(SETTLES)).toBe(SETTLES.indexOf(0.02))
  })

  it('reads the threshold in decades, so the same curve at another scale marks the same place', () => {
    // The chart plots log10, and a held-out loss can be 0.05 or 5. If the threshold were
    // absolute, the mark would depend on the units of a quantity nobody fixed.
    expect(convergedAt(SETTLES.map((v) => v * 100))).toBe(convergedAt(SETTLES))
    expect(CONVERGED_DECADES).toBe(0.01)
    expect(CONVERGED_WINDOW).toBe(8)
  })

  it('refuses to answer on a series too short to contain one window', () => {
    expect(convergedAt([0.05, 0.05, 0.05])).toBe(-1)
    expect(isConverged([0.05, 0.05, 0.05])).toBe(false)
    expect(convergedAt(Array(CONVERGED_WINDOW).fill(0.05))).toBe(0)
  })

  it('never moves once it has appeared, however many samples are appended', () => {
    // The chart redraws on every cadence point, so a mark that could move would flicker
    // its way across the plot. Samples inside a window never change, so the FIRST quiet
    // window cannot stop being quiet — this is that argument, checked on a series that
    // is quiet in the middle and loud at the end.
    let seen = -1
    for (let n = 1; n <= SETTLES.length; n++) {
      const at = convergedAt(SETTLES.slice(0, n))
      if (at < 0) continue
      if (seen < 0) seen = at
      expect(at).toBe(seen)
    }
    expect(seen).toBe(8)
    // A series that converges and then moves again keeps the mark where it was: the mark
    // is the event, and the word is the state. They are allowed to differ, and here they
    // do — but only in the direction the event can defend.
    const relapsed = SETTLES.concat([0.05, 0.08, 0.11, 0.14, 0.17, 0.2, 0.23, 0.26])
    expect(convergedAt(relapsed)).toBe(8)
    expect(isConverged(relapsed)).toBe(false)
  })

  it('agrees with the HUD on a real bake that has not finished converging', () => {
    const { series } = runBake({ steps: STEPS })
    // 200 steps is 5 points — short of one window, and still falling. Both consumers
    // must say so rather than defaulting to the reassuring answer.
    expect(isConverged(series.val)).toBe(false)
    expect(convergedAt(series.val)).toBe(-1)
  })
})
