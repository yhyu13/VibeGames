import * as THREE from 'three'
import {
	NodeAccess,
	StorageBufferAttribute,
	StorageTexture,
	type ComputeNode,
	type WebGPURenderer,
	type Node,
} from 'three/webgpu'
import { storage, textureStore } from 'three/tsl'
import type { DdgiVolumeConfig } from '../core/constants'
import {
	defaultNumFixedRays,
	defaultProbeNumRays,
	PROBE_DISTANCE_INTERIOR_TEXELS,
	PROBE_IRRADIANCE_INTERIOR_TEXELS,
} from '../core/constants'
import { frameRaySet } from '../core/fibonacci'
import { probeMaxRayDistance, probeWorldPosition } from '../core/probeGrid'
import type { Vec3 } from '../core/vec3'
import { buildBlendKernels } from './kernels/blendKernels'
import { buildBorderKernel } from './kernels/borderKernel'
import { buildTraceKernel } from './kernels/traceKernel'
import type { DdgiBvh } from './DdgiBvh'

const IRRADIANCE_TILE = PROBE_IRRADIANCE_INTERIOR_TEXELS + 2 // 6×6 interior + 1-texel border
const DISTANCE_TILE = PROBE_DISTANCE_INTERIOR_TEXELS + 2 // 16×16 interior + 1-texel border

/**
 * Owns the DDGI GPU resources (probe/ray buffers, octahedral atlases) and the
 * compute kernels. CPU side regenerates the per-probe ray sets from the pure
 * core (fibonacci + Arvo rotation) every frame — CPU/GPU parity by construction.
 */
export class DdgiProbeVolume {
	readonly config: DdgiVolumeConfig
	readonly numProbes: number
	readonly numRays: number
	readonly numFixedRays: number
	readonly probesPerRow: number
	readonly maxRayDistance: number

	/** Derived octahedral tile sizes (interior + 1-texel border), from core constants. */
	readonly irradianceInterior = PROBE_IRRADIANCE_INTERIOR_TEXELS
	readonly irradianceTile = IRRADIANCE_TILE
	readonly distanceInterior = PROBE_DISTANCE_INTERIOR_TEXELS
	readonly distanceTile = DISTANCE_TILE

	readonly workgroupSize = new THREE.Vector3( 64, 1, 1 )

	probeDataAttr!: StorageBufferAttribute
	rayDirAttr!: StorageBufferAttribute
	rayDataAttr!: StorageBufferAttribute
	irradianceAtlas!: StorageTexture
	distanceAtlas!: StorageTexture

	nodes!: {
		probeData: Node
		rayDir: Node
		rayData: Node
		irradiance: Node
		distance: Node
	}

	kernels!: {
		trace: ComputeNode
		blendIrradiance: ComputeNode
		blendDistance: ComputeNode
		border: ComputeNode
	}

	private raySeed = 0xdd211

	constructor( config: DdgiVolumeConfig ) {
		this.config = config
		this.numProbes = config.probeCounts[ 0 ] * config.probeCounts[ 1 ] * config.probeCounts[ 2 ]
		this.numRays = defaultProbeNumRays( config )
		this.numFixedRays = defaultNumFixedRays( config )
		this.probesPerRow = Math.ceil( Math.sqrt( this.numProbes ) )
		this.maxRayDistance = probeMaxRayDistance( config )
	}

	/** Builds GPU resources + kernels. Call once after the renderer is ready. */
	build(): void {
		const { numProbes, numRays } = this
		const rows = Math.ceil( numProbes / this.probesPerRow )

		this.probeDataAttr = new StorageBufferAttribute( new Float32Array( numProbes * 4 ), 4 )
		this.rayDirAttr = new StorageBufferAttribute( new Float32Array( numProbes * numRays * 4 ), 4 )
		this.rayDataAttr = new StorageBufferAttribute( new Float32Array( numProbes * numRays * 4 ), 4 )
		this.irradianceAtlas = new StorageTexture(
			this.probesPerRow * IRRADIANCE_TILE,
			rows * IRRADIANCE_TILE,
		)
		this.irradianceAtlas.format = THREE.RGBAFormat
		this.irradianceAtlas.type = THREE.HalfFloatType
		this.distanceAtlas = new StorageTexture(
			this.probesPerRow * DISTANCE_TILE,
			rows * DISTANCE_TILE,
		)
		this.distanceAtlas.format = THREE.RGBAFormat
		this.distanceAtlas.type = THREE.HalfFloatType

		this.writeProbeData()

		this.nodes = {
			probeData: storage( this.probeDataAttr, 'vec4', numProbes ).setName( 'ddgi_probeData' ).toReadOnly(),
			rayDir: storage( this.rayDirAttr, 'vec4', numProbes * numRays ).setName( 'ddgi_rayDir' ).toReadOnly(),
			rayData: storage( this.rayDataAttr, 'vec4', numProbes * numRays ).setName( 'ddgi_rayData' ),
			irradiance: textureStore( this.irradianceAtlas ).setAccess( NodeAccess.READ_WRITE ),
			distance: textureStore( this.distanceAtlas ).setAccess( NodeAccess.READ_WRITE ),
		}

		// kernels are built per volume config (baked literals); re-build on config change
		this.kernels = {
			trace: ( null as unknown ) as ComputeNode, // filled by attach()
			blendIrradiance: ( null as unknown ) as ComputeNode,
			blendDistance: ( null as unknown ) as ComputeNode,
			border: ( null as unknown ) as ComputeNode,
		}
	}

	/** Builds the kernels that depend on the BVH. Call after build() with the bvh. */
	attach( bvh: DdgiBvh ): void {
		this.kernels.trace = buildTraceKernel( this, bvh ) as unknown as ComputeNode
		const blend = buildBlendKernels( this )
		this.kernels.blendIrradiance = blend.irradiance as unknown as ComputeNode
		this.kernels.blendDistance = blend.distance as unknown as ComputeNode
		this.kernels.border = buildBorderKernel( this ) as unknown as ComputeNode
	}

	/** One DDGI update: regenerate ray sets (CPU), then trace → blend → border. */
	update( renderer: WebGPURenderer ): void {
		this.regenerateRayDirs()

		const raysPerKernel = this.numProbes * this.numRays
		renderer.compute( this.kernels.trace, [ Math.ceil( raysPerKernel / 64 ), 1, 1 ] )
		renderer.compute( this.kernels.blendIrradiance, [ Math.ceil( this.numProbes * 36 / 64 ), 1, 1 ] )
		renderer.compute( this.kernels.blendDistance, [ Math.ceil( this.numProbes * 256 / 64 ), 1, 1 ] )
		renderer.compute( this.kernels.border, [
			Math.ceil( ( this.numProbes * ( IRRADIANCE_TILE * IRRADIANCE_TILE + DISTANCE_TILE * DISTANCE_TILE ) ) / 64 ),
			1,
			1,
		] )
	}

	/** Probe world positions (core math) — used by debug gizmos. */
	probeWorldPositions(): Vec3[] {
		const c = this.config.probeCounts
		const out: Vec3[] = new Array( this.numProbes )
		for ( let i = 0; i < this.numProbes; i++ ) {
			const x = i % c[ 0 ]
			const y = Math.floor( i / c[ 0 ] ) % c[ 1 ]
			const z = Math.floor( i / ( c[ 0 ] * c[ 1 ] ) )
			out[ i ] = probeWorldPosition( this.config, [ x, y, z ] )
		}
		return out
	}

	private writeProbeData(): void {
		const { numProbes, probesPerRow } = this
		const positions = this.probeWorldPositions()
		const arr = this.probeDataAttr.array as Float32Array
		for ( let i = 0; i < numProbes; i++ ) {
			const p = positions[ i ]
			arr[ i * 4 + 0 ] = p[ 0 ]
			arr[ i * 4 + 1 ] = p[ 1 ]
			arr[ i * 4 + 2 ] = p[ 2 ]
			arr[ i * 4 + 3 ] = Math.floor( i / probesPerRow ) // probe atlas row
		}
		this.probeDataAttr.needsUpdate = true
	}

	private regenerateRayDirs(): void {
		const { numRays, numFixedRays, numProbes } = this
		const arr = this.rayDirAttr.array as Float32Array
		for ( let p = 0; p < numProbes; p++ ) {
			const { rotated } = frameRaySet( numRays, numFixedRays, () => this.nextRandom() )
			for ( let r = 0; r < numRays; r++ ) {
				const d = rotated[ r ]
				const o = ( p * numRays + r ) * 4
				arr[ o + 0 ] = d[ 0 ]
				arr[ o + 1 ] = d[ 1 ]
				arr[ o + 2 ] = d[ 2 ]
				arr[ o + 3 ] = 1
			}
		}
		this.rayDirAttr.needsUpdate = true
	}

	/** mulberry32 — deterministic per-run, but decorrelated per probe/frame. */
	private nextRandom(): number {
		let t = ( this.raySeed += 0x6d2b79f5 )
		t = Math.imul( t ^ ( t >>> 15 ), t | 1 )
		t ^= t + Math.imul( t ^ ( t >>> 7 ), t | 61 )
		return ( ( t ^ ( t >>> 14 ) ) >>> 0 ) / 4294967296
	}
}
