import { uniform } from 'three/tsl'
import {
	PROBE_HYSTERESIS,
	PROBE_NORMAL_BIAS,
	PROBE_VIEW_BIAS,
} from '../core/constants'

/**
 * Live sandbox params (enhancements-100.md P0). The three tunable scalars that
 * used to be baked as WGSL literals are now `uniform()` nodes created once and
 * threaded into the WGSL function calls, so a slider can mutate `.value` and
 * the effect is visible next frame — no kernel rebuild needed.
 *
 * Defaults are seeded from the single-source core constants; the sandbox UI
 * only ever writes `.value`, never the constants themselves, so
 * `constants.ts` stays the reference.
 *
 * Value type is a struct type that mirrors `UniformNode<'float', number>` so
 * `three/tsl` stays the only THREE-typed import surface; `Node` is the base the
 * WGSL-call binding accepts.
 */
export interface LiveParams {
	hysteresis: ReturnType<typeof uniform> & { value: number }
	normalBias: ReturnType<typeof uniform> & { value: number }
	viewBias: ReturnType<typeof uniform> & { value: number }
}

/** Seed the three live uniforms from `constants.ts` defaults. */
export function createLiveParams(): LiveParams {
	return {
		hysteresis: uniform( PROBE_HYSTERESIS ),
		normalBias: uniform( PROBE_NORMAL_BIAS ),
		viewBias: uniform( PROBE_VIEW_BIAS ),
	}
}

