import { wgslFn, uniform, workgroupId, localId } from 'three/tsl'
import type { Node } from 'three/webgpu'
import type { DdgiBvh } from '../DdgiBvh'
import type { DdgiProbeVolume } from '../DdgiProbeVolume'

/**
 * Trace kernel (impl-plan §5, step 2): one thread per (probe, ray).
 * Raycasts against the three-mesh-bvh TLAS/BLAS, classifies the hit
 * (miss → dist 1e27; backface → −dist·0.2; frontface → emissive + dist)
 * and writes vec4(emissive.rgb, dist) to the ray-data buffer.
 */
export function buildTraceKernel(volume: DdgiProbeVolume, bvh: DdgiBvh) {
	const numRays = volume.numRays
	const numProbes = volume.numProbes
	const includes: Node[] = [
		volume.nodes.probeData,
		volume.nodes.rayDir,
		volume.nodes.rayData,
		asNode(bvh.storage.transforms),
		asNode(bvh.fns.raycastFirstHit),
	]

	const shader = wgslFn(/* wgsl */`
		fn compute( workgroupSize: vec3u, workgroupId: vec3u, localId: vec3u ) -> void {

			let gid = workgroupSize.x * workgroupId.x + localId.x;
			if ( gid >= ${numProbes * numRays}u ) { return; }
			let probeIdx = gid / ${numRays}u;

			var ray: Ray;
			ray.origin = ddgi_probeData.value[ probeIdx ].xyz;
			ray.direction = ddgi_rayDir.value[ gid ].xyz;

			var hit: IntersectionResult;
			let didHit = bvh_RaycastFirstHit( ray, &hit );
			if ( ! didHit ) {

				ddgi_rayData.value[ gid ] = vec4f( 0.0, 0.0, 0.0, 1e27 );
				return;

			}

			if ( hit.side < 0.0 ) {

				ddgi_rayData.value[ gid ] = vec4f( 0.0, 0.0, 0.0, - hit.dist * 0.2 );
				return;

			}

			let emissive = bvh_transforms.value[ hit.objectIndex ].emissive;
			ddgi_rayData.value[ gid ] = vec4f( emissive, hit.dist );

		}
	`, includes)

	const kernel = shader( {
		workgroupSize: uniform( volume.workgroupSize ),
		workgroupId,
		localId,
	} ).computeKernel( [ 64, 1, 1 ] )

	return kernel
}

function asNode(value: unknown): Node {
	return value as Node
}
