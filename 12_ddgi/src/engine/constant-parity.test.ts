import { describe, expect, it } from 'vitest'
// `?raw` routes the read through Vite's pipeline (vitest shares it), so this file
// needs no `node:fs` / `@types/node` — the project has neither and must not gain a
// dependency to run a test.
import blendKernelsSrc from './kernels/blendKernels.ts?raw'
import wgslMathSrc from './wgsl/math.ts?raw'
import ddgiVolumeSrc from './DdgiProbeVolume.ts?raw'
import {
	LUMA_WEIGHTS,
	PROBE_ENCODING_GAMMA,
	PROBE_HYSTERESIS,
	PROBE_HYSTERESIS_DROP,
	PROBE_IMPULSE_CLAMP,
} from '../core/constants'
import type { Vec3 } from '../core/vec3'
import { blendRadiance, luminance } from '../core/hysteresis'

/**
 * The iron law this file guards: `src/core/` holds the truth and the WGSL kernels
 * only *interpolate* it. That law held for everything in `constants.ts` the
 * kernels imported — and was silently false for the three scalars that decide the
 * hysteresis response, which were typed out by hand in both `core/hysteresis.ts`
 * and the WGSL. Editing one copy and not the other desynchronized the reference
 * from the GPU with all 50 core tests still green, because those tests only ever
 * exercise the CPU copy.
 *
 * So this is two instruments, and neither is sufficient alone:
 *
 *   CPU  — behavioural. Recomputes the expected glow from the constants and
 *          compares it to what `blendRadiance` actually returns. Fails if the
 *          CPU copy stops being driven by the constant (someone types 0.75 back
 *          in while the table says something else).
 *
 *   GPU  — textual, because a shader string cannot execute here. Asserts the
 *          kernel binds the constant and interpolates *that binding* into the
 *          WGSL body. Fails if the literal is typed back in, which is the only
 *          way the two sides can drift.
 *
 * A file with only the textual half would be a lint that cannot see values; with
 * only the behavioural half it could not see the shaders at all. Both halves were
 * shown to fail on injected drift before this was committed.
 */

describe('the hysteresis response curve is single-source', () => {
	it('CPU: a large darkening drops h by exactly PROBE_HYSTERESIS_DROP', () => {
		// history 1.5, new frame 0.5: the history/result gap clears the irradiance
		// threshold so h falls by the drop, and the delta is negative so the impulse
		// clamp is skipped (the asymmetric branch, by design).
		const result = Math.pow(0.5, 1 / PROBE_ENCODING_GAMMA)
		const h = PROBE_HYSTERESIS - PROBE_HYSTERESIS_DROP
		const expected = 1.5 + (1 - h) * (result - 1.5)

		const out = blendRadiance([0.5, 0.5, 0.5], [1.5, 1.5, 1.5])
		expect(out[0]).toBeCloseTo(expected, 9)

		// A guard that agrees with every value measures nothing: assert the drop is
		// load-bearing, i.e. that ignoring it would land somewhere else entirely.
		expect(expected).not.toBeCloseTo(1.5 + (1 - PROBE_HYSTERESIS) * (result - 1.5), 9)
	})

	it('CPU: a brightening impulse is clamped by exactly PROBE_IMPULSE_CLAMP', () => {
		// history 0.5, new frame 0.8 (encoded 0.8⁵ decodes back to 0.8): the gap is
		// negative so there is no drop, but the positive delta clears the brightness
		// threshold → clamp.
		const clamped = (0.8 - 0.5) * PROBE_IMPULSE_CLAMP
		const expected = 0.5 + (1 - PROBE_HYSTERESIS) * clamped

		const raw: Vec3 = [Math.pow(0.8, 5), Math.pow(0.8, 5), Math.pow(0.8, 5)]
		const out = blendRadiance(raw, [0.5, 0.5, 0.5])
		expect(out[0]).toBeCloseTo(expected, 9)

		// Same negative control: an unclamped delta must give a different answer, or
		// the clamp is not what the assertion above is actually measuring.
		expect(expected).not.toBeCloseTo(0.5 + (1 - PROBE_HYSTERESIS) * (0.8 - 0.5), 9)
	})

	it('CPU: luminance is the table, not a transcription of it', () => {
		expect(luminance([1, 0, 0])).toBeCloseTo(LUMA_WEIGHTS[0], 12)
		expect(luminance([0, 1, 0])).toBeCloseTo(LUMA_WEIGHTS[1], 12)
		expect(luminance([0, 0, 1])).toBeCloseTo(LUMA_WEIGHTS[2], 12)
	})
})

describe('the WGSL kernels interpolate that source rather than restating it', () => {
	it('irradiance kernel binds both scalars and interpolates those bindings', () => {
		expect(blendKernelsSrc).toMatch(/const hysteresisDrop = PROBE_HYSTERESIS_DROP/)
		expect(blendKernelsSrc).toMatch(/const impulseClamp = PROBE_IMPULSE_CLAMP/)
		expect(blendKernelsSrc).toMatch(/\$\{\s*hysteresisDrop\s*\}/)
		expect(blendKernelsSrc).toMatch(/\$\{\s*impulseClamp\s*\}/)

		// The regression this file exists for: the literals coming back.
		expect(blendKernelsSrc).not.toMatch(/h - 0\.75/)
		expect(blendKernelsSrc).not.toMatch(/delta \* 0\.25\b/)
	})

	it('ddgi_luminance interpolates the same three weights the CPU uses', () => {
		expect(wgslMathSrc).toMatch(/import \{ LUMA_WEIGHTS \} from '\.\.\/\.\.\/core\/constants'/)
		for (let i = 0; i < LUMA_WEIGHTS.length; i++) {
			expect(wgslMathSrc).toContain(`\${LUMA_WEIGHTS[${i}]}`)
		}
		expect(wgslMathSrc).not.toMatch(/vec3f\( 0\.2126, 0\.7152, 0\.0722 \)/)
	})
})

/**
 * The same iron law, at the other half of the same seam. The kernels above are
 * handed a workgroup size and read their texel counts *off the volume*; the grid
 * that launches them is decided here on the CPU. That grid used to type the counts
 * out as literals — `this.numProbes * 36 / 64`, `* 256 / 64` — which agreed with
 * 6² and 16² because someone had already done the multiplication, and the border
 * dispatch two lines below derived properly, so the file disagreed with itself.
 *
 * This half has to be textual for the same reason the WGSL half is: `update()`
 * takes a live `WebGPURenderer`, so no test here can execute it. What *can* be
 * checked is that the grid names the quantities and restates nothing.
 */
describe('the dispatch grid is sized by the volume, not by literals beside it', () => {
	/** The body of `update()`, or '' if the signature moved. */
	const updateBody = (): string =>
		/update\( renderer: WebGPURenderer \): void \{([\s\S]*?)\n\t\}/.exec(ddgiVolumeSrc)?.[1] ?? ''

	/** Each dispatch's grid expression, keyed by the kernel it launches. */
	const grids = (): Record<string, string> => {
		const out: Record<string, string> = {}
		for (const m of updateBody().matchAll(/renderer\.compute\( this\.kernels\.(\w+), \[([\s\S]*?)\] \)/g)) out[m[1]] = m[2]
		return out
	}

	it('extracts the method it claims to be reading', () => {
		// The extractor is an instrument too. If `update` is renamed or moves, this
		// must go red rather than quietly asserting nothing against an empty string.
		expect(updateBody()).toContain('this.regenerateRayDirs()')
		expect(Object.keys(grids()).sort()).toEqual(['blendDistance', 'blendIrradiance', 'border', 'trace'])
	})

	it('sizes each grid from the counts its own kernel reads', () => {
		// Asserted against each kernel's OWN grid, never against the file. "The
		// identifier appears somewhere in the method" is how a guard passes on a grid
		// that dispatches a look-alike: write `this.numRays` into the distance grid
		// while still naming `this.distanceInterior` on the line above, and a
		// contains-the-word check stays green. Read the grid, not the neighbourhood.
		const g = grids()
		expect(g.blendIrradiance).toContain('this.irradianceInterior')
		expect(g.blendDistance).toContain('this.distanceInterior')
		expect(g.border).toContain('this.irradianceTile')
		expect(g.border).toContain('this.distanceTile')

		// Two quantities reach their grids through a local binding rather than a
		// chain of `this.`: the trace grid takes `raysPerKernel`. Pin the binding AND
		// its use in the same test — asserting the grid contains `this.numRays` would
		// fail on correct code, which is how a guard starts getting loosened.
		const body = updateBody()
		expect(body).toMatch(/const raysPerKernel = this\.numProbes \* this\.numRays/)
		expect(g.trace).toContain('raysPerKernel')

		// The workgroup size the kernels are handed as a uniform, bound once and used
		// by every grid — one binding, four readers.
		expect(body).toMatch(/const wg = this\.workgroupSize\.x/)
		for (const grid of Object.values(g)) expect(grid).toContain('wg')
	})

	it('leaves no numeric literal in the grid but the axis dimensions', () => {
		// `1` is the y/z dimension of every dispatch. Every other number in this grid
		// belongs to the volume, and reading it from there is the whole point.
		const literals = updateBody().match(/(?<![\w.$])\d+(?:\.\d+)?/g) ?? []
		expect(literals.filter((n) => Number(n) !== 1)).toEqual([])
	})
})
