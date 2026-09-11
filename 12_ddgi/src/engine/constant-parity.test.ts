import { describe, expect, it } from 'vitest'
// `?raw` routes the read through Vite's pipeline (vitest shares it), so this file
// needs no `node:fs` / `@types/node` — the project has neither and must not gain a
// dependency to run a test.
import blendKernelsSrc from './kernels/blendKernels.ts?raw'
import wgslMathSrc from './wgsl/math.ts?raw'
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
