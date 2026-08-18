import { wgslFn, uniform, workgroupId, localId } from 'three/tsl'
import type { DdgiProbeVolume } from '../DdgiProbeVolume'

/**
 * Border kernel (impl-plan §5, step 6): fills the 1-texel octahedral rim of every
 * probe tile by mirroring the interior edge. Handles both atlases in one dispatch:
 * the first `numProbes·irrT·irrT` threads do the irradiance tiles (8×8, interior
 * 6×6), the remainder the distance tiles (18×18, interior 16×16).
 *
 * NOTE (known deviation): research.md §3 specifies corners copy diagonal neighbors
 * and edges copy the *wrapped opposite edge* (the octahedral fold). This kernel
 * currently clamps each border texel to the same-side interior edge
 * (`min(max(bx,1), irrT-2)`), which is correct for raw atlas display in M2 but
 * under-resolves the fold once the M3 query node bilinear-samples across the seam.
 * Resolve before M3: implement the wrap mapping (or amend research.md §3).
 */
export function buildBorderKernel(volume: DdgiProbeVolume) {
	const numProbes = volume.numProbes
	const probesPerRow = volume.probesPerRow
	const irrT = volume.irradianceTile // 8
	const distT = volume.distanceTile // 18
	const irrTexels = numProbes * irrT * irrT // irradiance tiles come first

	const shader = wgslFn(/* wgsl */`
		fn compute( workgroupSize: vec3u, workgroupId: vec3u, localId: vec3u, irradianceAtlas: texture_storage_2d<rgba16float, read_write>, distanceAtlas: texture_storage_2d<rgba16float, read_write> ) -> void {

			let gid = workgroupSize.x * workgroupId.x + localId.x;

			if ( gid < ${irrTexels}u ) {

				let probeIdx = gid / ${irrT * irrT}u;
				if ( probeIdx >= ${numProbes}u ) { return; }
				let t = gid % ${irrT * irrT}u;
				let bx = t % ${irrT}u;
				let by = t / ${irrT}u;
				if ( bx != 0u && by != 0u && bx != ${irrT - 1}u && by != ${irrT - 1}u ) {

					return;

				}

				let probeCol = probeIdx % ${probesPerRow}u;
				let probeRow = probeIdx / ${probesPerRow}u;
				let ix = min( max( bx, 1u ), ${irrT - 2}u );
				let iy = min( max( by, 1u ), ${irrT - 2}u );
				let v = textureLoad( irradianceAtlas, vec2i( i32( probeCol * ${irrT}u + ix ), i32( probeRow * ${irrT}u + iy ) ) );
				textureStore( irradianceAtlas, vec2i( i32( probeCol * ${irrT}u + bx ), i32( probeRow * ${irrT}u + by ) ), v );

			} else {

				let g = gid - ${irrTexels}u;
				let probeIdx = g / ${distT * distT}u;
				if ( probeIdx >= ${numProbes}u ) { return; }
				let t = g % ${distT * distT}u;
				let bx = t % ${distT}u;
				let by = t / ${distT}u;
				if ( bx != 0u && by != 0u && bx != ${distT - 1}u && by != ${distT - 1}u ) {

					return;

				}

				let probeCol = probeIdx % ${probesPerRow}u;
				let probeRow = probeIdx / ${probesPerRow}u;
				let ix = min( max( bx, 1u ), ${distT - 2}u );
				let iy = min( max( by, 1u ), ${distT - 2}u );
				let v = textureLoad( distanceAtlas, vec2i( i32( probeCol * ${distT}u + ix ), i32( probeRow * ${distT}u + iy ) ) );
				textureStore( distanceAtlas, vec2i( i32( probeCol * ${distT}u + bx ), i32( probeRow * ${distT}u + by ) ), v );

			}

		}
	`, [])

	return shader( {
		workgroupSize: uniform( volume.workgroupSize ),
		workgroupId,
		localId,
		irradianceAtlas: volume.nodes.irradiance,
		distanceAtlas: volume.nodes.distance,
	} ).computeKernel( [ 64, 1, 1 ] )
}
