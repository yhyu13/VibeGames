import { wgslFn, uniform, workgroupId, localId } from 'three/tsl'
import type { Node } from 'three/webgpu'
import type { DdgiProbeVolume } from '../DdgiProbeVolume'
import { luminanceFn, maxCompFn, octDecodeFn } from '../wgsl/math'
import {
	PROBE_BRIGHTNESS_THRESHOLD,
	PROBE_DISTANCE_EXPONENT,
	PROBE_ENCODING_GAMMA,
	PROBE_HYSTERESIS,
	PROBE_IRRADIANCE_THRESHOLD,
	PROBE_RANDOM_BACKFACE_THRESHOLD,
} from '../../core/constants'

/**
 * Blend kernels (impl-plan §5, step 3; research.md §5): one thread per interior
 * texel per probe, accumulated over the probe's rays.
 *
 * Radiance mode: Σ(L·cosθ) ÷ (2·Σcosθ), then EMA hysteresis blended in
 * gamma-5 storage space (research.md §7). Backface-reject probes (>10%
 * backfaces) are assumed inside geometry and blend nothing.
 *
 * Distance mode: Σ(d·w), Σ(d²·w), w = cosθ^50, d clamped to ‖spacing‖·1.5,
 * normalized by 2·Σw → raw moments (mean, meanSq), plain-lerp EMA.
 */
export function buildBlendKernels(volume: DdgiProbeVolume) {
	const numRays = volume.numRays
	const numProbes = volume.numProbes
	const probesPerRow = volume.probesPerRow

	// Frozen scalar constants → WGSL literals (closes the CPU/GPU parity drift).
	const hysteresis = PROBE_HYSTERESIS
	const irradianceThreshold = PROBE_IRRADIANCE_THRESHOLD
	const brightnessThreshold = PROBE_BRIGHTNESS_THRESHOLD
	const backfaceThreshold = PROBE_RANDOM_BACKFACE_THRESHOLD
	const distanceExponent = PROBE_DISTANCE_EXPONENT
	const gammaExponent = 1 / PROBE_ENCODING_GAMMA // 1/γ tone-map into storage

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
		fn compute( workgroupSize: vec3u, workgroupId: vec3u, localId: vec3u, irradianceAtlas: texture_storage_2d<rgba16float, read_write> ) -> void {

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

			var h = ${hysteresis};
			if ( dot( history, history ) == 0.0 ) {

				h = 0.0;

			} else if ( ddgi_maxComp( history - result ) > ${irradianceThreshold} ) {

				h = max( 0.0, h - 0.75 );

			}

			var delta = result - history;
			if ( ddgi_luminance( delta ) > ${brightnessThreshold} ) {

				delta = delta * 0.25;

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
	} ).computeKernel( [ 64, 1, 1 ] )

	// --- distance mode: 16×16 interior texels per probe ---
	const maxRay = volume.maxRayDistance.toFixed( 4 )
	const distanceShader = wgslFn(/* wgsl */`
		fn compute( workgroupSize: vec3u, workgroupId: vec3u, localId: vec3u, distanceAtlas: texture_storage_2d<rgba16float, read_write> ) -> void {

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

			let outD = hist.x + ( 1.0 - ${hysteresis} ) * ( mean - hist.x );
			let outD2 = hist.y + ( 1.0 - ${hysteresis} ) * ( meanSq - hist.y );
			textureStore( distanceAtlas, vec2i( ax, ay ), vec4f( outD, outD2, 0.0, 1.0 ) );

		}
	`, includes)

	const distanceKernel = distanceShader( {
		workgroupSize: uniform( volume.workgroupSize ),
		workgroupId,
		localId,
		distanceAtlas: volume.nodes.distance,
	} ).computeKernel( [ 64, 1, 1 ] )

	return { irradiance: irradianceKernel, distance: distanceKernel }
}
