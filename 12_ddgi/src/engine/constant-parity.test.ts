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
 * takes a live `WebGPURenderer`, so no test here can execute it.
 *
 * The first cut of this guard asserted that each grid *contained* its own quantity.
 * That is a presence test, and presence is not agreement: `numProbes *
 * irradianceInterior * distanceInterior / wg` keeps the asserted `distanceInterior`
 * as the second factor while `irradianceInterior` takes over the first, shrinking
 * the grid from 300 workgroups to 113 — and the kernel divides by `distanceInterior²`
 * = 256, so probes 29..74 are then never blended at all. All 58 tests stayed green
 * on that line (bug-384). A trailing `// this.distanceInterior` inside the array
 * satisfied it too, because the "grid" the guard captured was a slice of the file,
 * comments and all.
 *
 * So this reads the grid as code, after stripping comments, and pins the whole
 * arithmetic — which quantities, how many times each, and the operators between
 * them — rather than just checking that the right names appear somewhere in it.
 */
describe('the dispatch grid is sized by the volume, not by literals beside it', () => {
	/**
	 * `ddgiVolumeSrc` with `//` and block comments blanked to spaces. Offsets and line
	 * numbers survive; only comments go. String literals are left alone.
	 */
	const stripComments = (src: string): string => {
		const out = [...src]
		let i = 0
		let line = false
		let block = false
		let quote = ''
		while (i < src.length) {
			const c = src[i]
			const n = src[i + 1]
			if (line) { if (c === '\n') line = false; else out[i] = ' '; i += 1; continue }
			if (block) {
				if (c === '*' && n === '/') { out[i] = ' '; out[i + 1] = ' '; block = false; i += 2; continue }
				if (c !== '\n') out[i] = ' '
				i += 1
				continue
			}
			if (quote) { if (c === '\\') { i += 2; continue } if (c === quote) quote = ''; i += 1; continue }
			if (c === '/' && n === '/') { line = true; continue }
			if (c === '/' && n === '*') { block = true; continue }
			if (c === '"' || c === "'" || c === '`') { quote = c; i += 1; continue }
			i += 1
		}
		return out.join('')
	}

	const strippedSrc = stripComments(ddgiVolumeSrc)

	/** The body of `update()`, comments already removed, or '' if the signature moved. */
	const updateBody = (): string =>
		/update\( renderer: WebGPURenderer \): void \{([\s\S]*?)\n\t\}/.exec(strippedSrc)?.[1] ?? ''

	/** Each dispatch's grid expression, keyed by the kernel it launches. */
	const grids = (): Record<string, string> => {
		const out: Record<string, string> = {}
		for (const m of updateBody().matchAll(/renderer\.compute\( this\.kernels\.(\w+), \[([\s\S]*?)\] \)/g)) out[m[1]] = m[2]
		return out
	}

	/**
	 * Whitespace and the trailing comma are the formatter's business; the arithmetic is
	 * not. A single-line dispatch captures without that comma and a wrapped one with it,
	 * so keeping it would make the four goldens differ by layout rather than by maths.
	 */
	const geometry = (grid: string): string => grid.replace(/\s+/g, ' ').trim().replace(/,$/, '')

	it('extracts the method it claims to be reading', () => {
		// The extractor is an instrument too. If `update` is renamed or moves, this
		// must go red rather than quietly asserting nothing against an empty string.
		expect(updateBody()).toContain('this.regenerateRayDirs()')
		expect(Object.keys(grids()).sort()).toEqual(['blendDistance', 'blendIrradiance', 'border', 'trace'])
	})

	it('the comment stripper works in both directions', () => {
		// Nothing inside `update()` is commented today, so the file itself cannot show
		// that the stripper is load-bearing — and a broken one would let a trailing
		// `// this.distanceInterior` inside the array satisfy the arithmetic below.
		// So it is exercised on literals, in both directions it can fail.
		expect(stripComments('const a = 1 // this.distanceInterior')).not.toContain('distanceInterior')
		expect(stripComments('/* x */ const a = 1')).not.toContain('/*')
		expect(stripComments('const a = "// still a string"')).toContain('"// still a string"')
	})

	it('sizes each grid with its own arithmetic, and with nothing else', () => {
		// A whole-expression comparison, not a contains-the-word one. Names, how many
		// times each appears, and the operators between them are all pinned, because
		// the multiset is what a name-only guard throws away: `numProbes * dI * dI / wg`
		// and `numProbes * iI * dI / wg` name the same `distanceInterior` and only this
		// comparison separates them (bug-384). It also separates `iT * iT + dT * dT`
		// from `iT * dT`, which has the same names with different weights.
		const g = grids()
		expect(geometry(g.trace)).toBe('Math.ceil( raysPerKernel / wg ), 1, 1')
		expect(geometry(g.blendIrradiance)).toBe(
			'Math.ceil( this.numProbes * this.irradianceInterior * this.irradianceInterior / wg ), 1, 1'
		)
		expect(geometry(g.blendDistance)).toBe(
			'Math.ceil( this.numProbes * this.distanceInterior * this.distanceInterior / wg ), 1, 1'
		)
		expect(geometry(g.border)).toBe(
			'Math.ceil( ( this.numProbes * ( this.irradianceTile * this.irradianceTile + this.distanceTile * this.distanceTile ) ) / wg ), 1, 1'
		)
	})

	it('pins the two locals those grids read through to their definitions', () => {
		// The arithmetic above names `raysPerKernel` and `wg` instead of spelling them
		// out, so a grid could be right about the formula and still be sized by the
		// wrong number if either binding were redefined. Pin both, in the same method.
		const body = updateBody()
		expect(body).toMatch(/const raysPerKernel = this\.numProbes \* this\.numRays/)
		expect(body).toMatch(/const wg = this\.workgroupSize\.x/)
	})

	it('leaves no numeric literal in the grid but the axis dimensions', () => {
		// `1` is the y/z dimension of every dispatch. Every other number in this grid
		// belongs to the volume, and reading it from there is the whole point.
		const literals = updateBody().match(/(?<![\w.$])\d+(?:\.\d+)?/g) ?? []
		expect(literals.filter((n) => Number(n) !== 1)).toEqual([])
	})
})
