import { wgslFn, texture } from 'three/tsl'
import type { Node } from 'three/webgpu'
import {
	CHEBYSHEV_MIN_WEIGHT,
	PROBE_ENCODING_GAMMA,
	WRAP_SHADING_FLOOR,
} from '../core/constants'
import type { LiveParams } from './LiveParams'
import { probeGridShift } from '../core/probeGrid'
import type { DdgiProbeVolume } from './DdgiProbeVolume'
import { octEncodeFn, sampleBilinearFn } from './wgsl/math'

/**
 * M3 — the shading-time query (research.md §6): trilinear interpolation over
 * the 8 surrounding probes, wrap-shading, Chebyshev visibility rejection against
 * the distance atlas, octahedral bilinear atlas sampling, then the decode chain
 * (pow(sample, γ·0.5) → normalize → square → ×2π). Pure WGSL — no sampler
 * dependency (manual bilinear via textureLoad).
 */
export interface DdgiQuery {
	/** worldPos/normal/cameraPos nodes → indirect irradiance (vec3). */
	call: ( worldPos: Node, normal: Node, cameraPos: Node ) => Node<'vec3'>
	irradianceTexture: Node
	distanceTexture: Node
}

export function buildDdgiQuery( volume: DdgiProbeVolume, live: LiveParams ): DdgiQuery {
	const cfg = volume.config
	const shift = probeGridShift( cfg.probeSpacing, cfg.probeCounts )
	const [ nx, ny, nz ] = cfg.probeCounts
	const { probesPerRow } = volume
	const irrI = volume.irradianceInterior
	const irrT = volume.irradianceTile
	const distI = volume.distanceInterior
	const distT = volume.distanceTile

	const v = ( x: number ): string => x.toFixed( 4 )
	const origin = `vec3f( ${ v( cfg.origin[ 0 ] ) }, ${ v( cfg.origin[ 1 ] ) }, ${ v( cfg.origin[ 2 ] ) } )`
	const shiftLit = `vec3f( ${ v( shift[ 0 ] ) }, ${ v( shift[ 1 ] ) }, ${ v( shift[ 2 ] ) } )`
	const invSpacing = `vec3f( ${ v( 1 / cfg.probeSpacing[ 0 ] ) }, ${ v( 1 / cfg.probeSpacing[ 1 ] ) }, ${ v( 1 / cfg.probeSpacing[ 2 ] ) } )`
	const gridMax = `vec3f( ${ nx - 1 }.0, ${ ny - 1 }.0, ${ nz - 1 }.0 )`
	const wrapFloor = v( WRAP_SHADING_FLOOR )
	const chebMin = v( CHEBYSHEV_MIN_WEIGHT )
	const gammaHalf = v( PROBE_ENCODING_GAMMA * 0.5 )

	const queryFn = wgslFn(/* wgsl */`
		fn ddgiQuery(
			worldPos: vec3f,
			normal: vec3f,
			cameraPos: vec3f,
			irradianceAtlas: texture_2d<f32>,
			distanceAtlas: texture_2d<f32>,
			normalBias: f32,
			viewBias: f32
		) -> vec3f {

			let n = normalize( normal );
			let viewRay = normalize( worldPos - cameraPos );
			let biasedPos = worldPos + n * normalBias + viewRay * viewBias;

			let grid = clamp( ( biasedPos - ${ origin } + ${ shiftLit } ) * ${ invSpacing }, vec3f( 0.0 ), ${ gridMax } );
			let base = min( floor( grid ), ${ gridMax } - vec3f( 1.0 ) );
			let alpha = clamp( grid - base, vec3f( 0.0 ), vec3f( 1.0 ) );

			var sum = vec3f( 0.0 );
			var sumW = 0.0;

			for ( var c = 0u; c < 8u; c = c + 1u ) {

				let ox = f32( c & 1u );
				let oy = f32( ( c >> 1u ) & 1u );
				let oz = f32( ( c >> 2u ) & 1u );
				let w = mix( 1.0 - alpha.x, alpha.x, ox ) * mix( 1.0 - alpha.y, alpha.y, oy ) * mix( 1.0 - alpha.z, alpha.z, oz );
				if ( w <= 0.0 ) { continue; }

				let gc = base + vec3f( ox, oy, oz );
				let probeIdx = u32( gc.z ) * ${ nx * ny }u + u32( gc.y ) * ${ nx }u + u32( gc.x );
				let probePos = ddgi_probeData.value[ probeIdx ].xyz;
				let probeDir = normalize( probePos - biasedPos );
				let wrap = ( dot( probeDir, n ) + 1.0 ) * 0.5;
				let wrapW = wrap * wrap + ${ wrapFloor };

				let octUv = ddgi_octEncode( -probeDir );
				let tileCol = f32( probeIdx % ${ probesPerRow }u );
				let tileRow = ddgi_probeData.value[ probeIdx ].w;

				// Chebyshev visibility (distance atlas, ×2 undo blend ÷2)
				let dpx = tileCol * ${ distT }.0 + ( octUv.x + 1.0 ) * ${ distI }.0 * 0.5 + 1.0;
				let dpy = tileRow * ${ distT }.0 + ( octUv.y + 1.0 ) * ${ distI }.0 * 0.5 + 1.0;
				let filtD = 2.0 * ddgi_sampleBilinear( distanceAtlas, dpx, dpy ).rg;
				let variance = abs( filtD.x * filtD.x - filtD.y );
				let distToProbe = length( probePos - biasedPos );

				var cheb = 1.0;
				if ( distToProbe > filtD.x ) {

					let dv = distToProbe - filtD.x;
					cheb = variance / ( variance + dv * dv );
					cheb = max( cheb * cheb * cheb, 0.0 );

				}

				let weight = w * wrapW * max( ${ chebMin }, cheb );

				// Irradiance (decode pow(sample, γ·0.5), then normalize → square → ×2π)
				let ipx = tileCol * ${ irrT }.0 + ( octUv.x + 1.0 ) * ${ irrI }.0 * 0.5 + 1.0;
				let ipy = tileRow * ${ irrT }.0 + ( octUv.y + 1.0 ) * ${ irrI }.0 * 0.5 + 1.0;
				let irrSample = ddgi_sampleBilinear( irradianceAtlas, ipx, ipy ).rgb;
				let irrDecoded = pow( irrSample, vec3f( ${ gammaHalf } ) );

				sum = sum + weight * irrDecoded;
				sumW = sumW + weight;

			}

			var irr = sum / max( sumW, 1e-6 );
			irr = irr * irr;
			irr = irr * 6.28318530718;
			return irr;

		}
	`, [ volume.nodes.probeData, octEncodeFn, sampleBilinearFn ] )

	const irradianceTexture = texture( volume.irradianceAtlas )
	const distanceTexture = texture( volume.distanceAtlas )

	const callable = queryFn as unknown as ( params: Record<string, unknown> ) => Node<'vec3'>

	return {
		call: ( worldPos: Node, normal: Node, cameraPos: Node ): Node<'vec3'> =>
			callable( {
				worldPos,
				normal,
				cameraPos,
				irradianceAtlas: irradianceTexture,
				distanceAtlas: distanceTexture,
				normalBias: live.normalBias,
				viewBias: live.viewBias,
			} ),
		irradianceTexture,
		distanceTexture,
	}
}
