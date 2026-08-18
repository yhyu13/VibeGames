import * as THREE from 'three'
import { BVHComputeData } from 'three-mesh-bvh/webgpu'
import { StructTypeNode } from 'three/webgpu'

/**
 * three-mesh-bvh `BVHComputeData` subclass that injects a per-object emissive
 * color into the transform buffer (the documented `writeTransformData` override
 * hook). The trace kernel reads `bvh_transforms[hit.objectIndex].emissive` to
 * shade ray hits — this is how the demo's light source (an emissive card) emits.
 */
const ddgiTransformStruct = new StructTypeNode(
	{
		matrixWorld: 'mat4x4f',
		inverseMatrixWorld: 'mat4x4f',
		visible: 'uint',
		emissive: 'vec3f',
	},
	'DDGITransformStruct',
)

// vec3f lands at byte 144 → float slot 36 (16+16 matrix + 1 visible + align)
const EMISSIVE_SLOT = 36

/** Structural view of the BVHComputeData runtime surface we use (its own d.ts is `unknown`-typed). */
interface BvhInstance {
	update(): void
	updateTransforms(): void
	structs: { transform: { getLength(): number } }
	storage: { transforms: unknown }
	fns: { raycastFirstHit: unknown }
	writeTransformData(
		info: unknown,
		premultiplyMatrix: unknown,
		writeOffset: number,
		targetBuffer: ArrayBuffer,
	): void
}

const BvhBase = BVHComputeData as unknown as new (
	objects: unknown,
	options?: { attributes?: Record<string, string>; autogenerateBvh?: boolean },
) => BvhInstance

export class DdgiBvh extends BvhBase {
	private emissiveMap = new Map<THREE.Object3D, [number, number, number]>()

	constructor(
		objects: THREE.Object3D | THREE.BufferGeometry | THREE.Object3D[] | THREE.BufferGeometry[],
		options: { attributes?: Record<string, string>; autogenerateBvh?: boolean } = {},
	) {
		super( objects, options )
		// swap in the extended transform struct BEFORE update() so the buffers are
		// allocated with the 40-float stride (getLength() is alignment-aware)
		this.structs.transform = ddgiTransformStruct
	}

	/** Mark an object as emissive with a linear RGB color (≥1 for emission). */
	setEmissive( object: THREE.Object3D, color: THREE.Color ): this {
		this.emissiveMap.set( object, [ color.r, color.g, color.b ] )
		return this
	}

	writeTransformData(
		info: { object: THREE.Object3D; instanceId: number; compositeId: number; root: number; slot: number },
		premultiplyMatrix: THREE.Matrix4,
		writeOffset: number,
		targetBuffer: ArrayBuffer,
	): void {
		super.writeTransformData( info, premultiplyMatrix, writeOffset, targetBuffer )

		const stride = this.structs.transform.getLength()
		const f32 = new Float32Array( targetBuffer )
		const e = this.emissiveMap.get( info.object ) ?? [ 0, 0, 0 ]
		f32[ writeOffset * stride + EMISSIVE_SLOT + 0 ] = e[ 0 ]
		f32[ writeOffset * stride + EMISSIVE_SLOT + 1 ] = e[ 1 ]
		f32[ writeOffset * stride + EMISSIVE_SLOT + 2 ] = e[ 2 ]
	}
}
