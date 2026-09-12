import { wgslFn, uniform, workgroupId, localId } from 'three/tsl'
import type { Node } from 'three/webgpu'
import type { DdgiProbeVolume } from '../DdgiProbeVolume'
import type { LiveParams } from '../LiveParams'
import { luminanceFn, maxCompFn, octDecodeFn } from '../wgsl/math'
import {
	PROBE_BRIGHTNESS_THRESHOLD,
	PROBE_DISTANCE_EXPONENT,
	PROBE_ENCODING_GAMMA,
	PROBE_HYSTERESIS_DROP,
	PROBE_IMPULSE_CLAMP,
	PROBE_IRRADIANCE_THRESHOLD,
	PROBE_RANDOM_BACKFACE_THRESHOLD,
} from '../../core/constants'

/**
 * Blend kernels (impl-plan §5, step 3; research.md §5): one thread per interior
 * texel per probe, accumulated over the probe's rays.
 *
 * NO BACKTICKS IN A WGSL COMMENT HERE. These shaders are template literals, so a
 * backtick inside one closes it early and `tsc` then parses the rest of the prose
 * as TypeScript — five TS1005 errors on comment lines, naming nothing that looks
 * wrong (bug-680). Backticks belong in the `//` comments outside the templates.
 *
 * Radiance mode: Σ(L·cosθ) ÷ (2·Σcosθ), then EMA hysteresis blended in
 * gamma-5 storage space (research.md §7). Backface-reject probes (>10%
 * backfaces) are assumed inside geometry and blend nothing. A texel whose
 * irradiance history is still zero writes the traced value outright: the `h = 0`
 * snap and the impulse clamp would otherwise disagree about the first write, and
 * the clamp wins (`core/hysteresis.ts:blendRadiance`).
 *
 * Distance mode: Σ(d·w), Σ(d²·w), w = cosθ^50, d clamped to ‖spacing‖·1.5,
 * normalized by 2·Σw → raw moments (mean, meanSq), plain-lerp EMA — except on a
 * texel whose history is still zero, which snaps like the radiance mode does,
 * because a zero history is an absence of history and not a distance of zero
 * (`core/hysteresis.ts:distanceHysteresis`).
 */
export function buildBlendKernels(volume: DdgiProbeVolume, live: LiveParams) {
	const numRays = volume.numRays
	const numProbes = volume.numProbes
	const probesPerRow = volume.probesPerRow

	// Frozen scalar constants → WGSL literals (closes the CPU/GPU parity drift).
	// `hysteresis` is NOT frozen: it is threaded as a live uniform so the P0
	// hysteresis slider can tune ghosting-vs-noise without a rebuild.
	const irradianceThreshold = PROBE_IRRADIANCE_THRESHOLD
	const brightnessThreshold = PROBE_BRIGHTNESS_THRESHOLD
	const backfaceThreshold = PROBE_RANDOM_BACKFACE_THRESHOLD
	const distanceExponent = PROBE_DISTANCE_EXPONENT
	const gammaExponent = 1 / PROBE_ENCODING_GAMMA // 1/γ tone-map into storage
	// The two response scalars below are read by `core/hysteresis.ts` as well, so
	// they are interpolated from the same constants rather than typed twice.
	const hysteresisDrop = PROBE_HYSTERESIS_DROP
	const impulseClamp = PROBE_IMPULSE_CLAMP

	// Derived octahedral tile sizes (interior + 1-texel border).
	const irrI = volume.irradianceInterior // 6
	const irrT = volume.irradianceTile // 8
	const distI = volume.distanceInterior // 16
	const distT = volume.distanceTile // 18

	const includes: Node[] = [
		volume.nodes.probeData,
		volume.nodes.rayDir,
		volume.nodes.rayData,
		octDecodeFn,
		luminanceFn,
		maxCompFn,
	]

	// --- radiance (irradiance) mode: 6×6 interior texels per probe ---
	const irradianceShader = wgslFn(/* wgsl */`
		fn compute( workgroupSize: vec3u, workgroupId: vec3u, localId: vec3u, irradianceAtlas: texture_storage_2d<rgba16float, read_write>, hys: f32 ) -> void {

			let gid = workgroupSize.x * workgroupId.x + localId.x;
			let probeIdx = gid / ${irrI * irrI}u;
			if ( probeIdx >= ${numProbes}u ) { return; }
			let t = gid % ${irrI * irrI}u;
			let tx = t % ${irrI}u;
			let ty = t / ${irrI}u;
			let probeCol = probeIdx % ${probesPerRow}u;
			let probeRow = probeIdx / ${probesPerRow}u;

			let uv = vec2f( ( f32( tx ) + 0.5 ) * ( 2.0 / ${irrI}.0 ) - 1.0, ( f32( ty ) + 0.5 ) * ( 2.0 / ${irrI}.0 ) - 1.0 );
			let dir = ddgi_octDecode( uv );

			var sumL = vec3f( 0.0 );
			var sumW = 0.0;
			var backfaces = 0u;
			for ( var r = 0u; r < ${numRays}u; r = r + 1u ) {

				let idx = probeIdx * ${numRays}u + r;
				let rd = ddgi_rayData.value[ idx ];
				let cosW = max( dot( dir, ddgi_rayDir.value[ idx ].xyz ), 0.0 );
				if ( rd.w < 0.0 ) {

					backfaces = backfaces + 1u;
					continue;

				}

				sumL = sumL + rd.xyz * cosW;
				sumW = sumW + cosW;

			}

			if ( f32( backfaces ) > ${backfaceThreshold} * f32( ${numRays}u ) ) {

				return;

			}

			let irradiance = sumL / max( sumW * 2.0, 1e-6 );
			let result = pow( irradiance, vec3f( ${gammaExponent} ) ); // gamma-5 tone map into storage

			let ax = i32( probeCol * ${irrT}u + tx + 1u );
			let ay = i32( probeRow * ${irrT}u + ty + 1u );
			let history = textureLoad( irradianceAtlas, vec2i( ax, ay ) ).rgb;

			let histZero = dot( history, history ) == 0.0;
			var h = hys;
			if ( histZero ) {

				h = 0.0;

			} else if ( ddgi_maxComp( history - result ) > ${irradianceThreshold} ) {

				h = max( 0.0, h - ${hysteresisDrop} );

			}

			// A zero history is an ABSENCE of history: there is no accumulated frame for an impulse to
			// damage, and h = 0.0 above has already declared this write to be the measurement. The
			// clamp used to overrule that and keep a quarter of it, so the first write advanced by
			// ( 1.0 - h ) * clamp = 0.75% of the traced value instead of 3%. It is one of two throttles
			// on a warming atlas: update() re-randomises every ray each frame, so the frames being
			// averaged are each a fresh sample. Measured over three runs each, the recovery of the most
			// GI-sensitive region went from 4024/4113/4291 ms to 3030/3050/3080 ms and the depth of the
			// dip was unchanged, so this buys about a quarter of the washed-out time, not all of it.
			var delta = result - history;
			if ( !histZero && ddgi_luminance( delta ) > ${brightnessThreshold} ) {

				delta = delta * ${impulseClamp};

			}

			let out = history + ( 1.0 - h ) * delta;
			textureStore( irradianceAtlas, vec2i( ax, ay ), vec4f( out, 1.0 ) );

		}
	`, includes)

	const irradianceKernel = irradianceShader( {
		workgroupSize: uniform( volume.workgroupSize ),
		workgroupId,
		localId,
		irradianceAtlas: volume.nodes.irradiance,
		hys: live.hysteresis,
	} ).computeKernel( [ volume.workgroupSize.x, 1, 1 ] )

	// --- distance mode: 16×16 interior texels per probe ---
	const maxRay = volume.maxRayDistance.toFixed( 4 )
	const distanceShader = wgslFn(/* wgsl */`
		fn compute( workgroupSize: vec3u, workgroupId: vec3u, localId: vec3u, distanceAtlas: texture_storage_2d<rgba16float, read_write>, hys: f32 ) -> void {

			let gid = workgroupSize.x * workgroupId.x + localId.x;
			let probeIdx = gid / ${distI * distI}u;
			if ( probeIdx >= ${numProbes}u ) { return; }
			let t = gid % ${distI * distI}u;
			let tx = t % ${distI}u;
			let ty = t / ${distI}u;
			let probeCol = probeIdx % ${probesPerRow}u;
			let probeRow = probeIdx / ${probesPerRow}u;

			let uv = vec2f( ( f32( tx ) + 0.5 ) * ( 2.0 / ${distI}.0 ) - 1.0, ( f32( ty ) + 0.5 ) * ( 2.0 / ${distI}.0 ) - 1.0 );
			let dir = ddgi_octDecode( uv );

			var sumD = 0.0;
			var sumD2 = 0.0;
			var sumW = 0.0;
			for ( var r = 0u; r < ${numRays}u; r = r + 1u ) {

				let idx = probeIdx * ${numRays}u + r;
				let rd = ddgi_rayData.value[ idx ];
				let d = min( abs( rd.w ), ${maxRay}f );
				let w = pow( max( dot( dir, ddgi_rayDir.value[ idx ].xyz ), 0.0 ), ${distanceExponent}.0 );
				sumD = sumD + d * w;
				sumD2 = sumD2 + d * d * w;
				sumW = sumW + w;

			}

			let mean = sumD / max( sumW * 2.0, 1e-6 );
			let meanSq = sumD2 / max( sumW * 2.0, 1e-6 );

			let ax = i32( probeCol * ${distT}u + tx + 1u );
			let ay = i32( probeRow * ${distT}u + ty + 1u );
			let hist = textureLoad( distanceAtlas, vec2i( ax, ay ) ).xy;

			// A zero history is an ABSENCE of history, not a measurement of zero distance — the same
			// reading the radiance branch above gives a zero history, and mirrored in
			// core/hysteresis.ts:distanceHysteresis. Both moments are written by this one thread
			// with this one h, so they snap together or not at all. Without the snap the sampled
			// distance and its variance stay 0 for ~220 frames after a rebuild, and the visibility
			// test in DdgiMaterialNode takes its distToProbe > filtD.x branch with variance 0:
			// every probe's Chebyshev weight reads 0 and is floored at CHEBYSHEV_MIN_WEIGHT.
			// Measured on the frame, that cost the most GI-sensitive region 14.1 luminance units
			// (77.63 -> 63.48) and 4024 ms to come back within 5 of them.
			// No backticks in a WGSL comment: one closes this template literal, and tsc then parses
			// the rest of the prose as TypeScript.
			var h = hys;
			if ( dot( hist, hist ) == 0.0 ) {

				h = 0.0;

			}

			let outD = hist.x + ( 1.0 - h ) * ( mean - hist.x );
			let outD2 = hist.y + ( 1.0 - h ) * ( meanSq - hist.y );
			textureStore( distanceAtlas, vec2i( ax, ay ), vec4f( outD, outD2, 0.0, 1.0 ) );

		}
	`, includes)

	const distanceKernel = distanceShader( {
		workgroupSize: uniform( volume.workgroupSize ),
		workgroupId,
		localId,
		distanceAtlas: volume.nodes.distance,
		hys: live.hysteresis,
	} ).computeKernel( [ volume.workgroupSize.x, 1, 1 ] )

	return { irradiance: irradianceKernel, distance: distanceKernel }
}
