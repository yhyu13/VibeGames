import * as THREE from 'three'
import type { WebGPURenderer } from 'three/webgpu'
import type { DdgiVolumeConfig } from '../core/constants'
import { DdgiBvh } from './DdgiBvh'
import { DdgiProbeVolume } from './DdgiProbeVolume'
import { ProbeDebug } from './ProbeDebug'

export interface DdgiSystemOptions {
	config: DdgiVolumeConfig
	/** Meshes that participate in the BVH (must already be added to the scene). */
	objects: THREE.Object3D[]
	/** Map object → emissive linear RGB (the light sources DDGI sees). */
	emissive?: Map<THREE.Object3D, THREE.Color>
	/** Show probe gizmos colored by readback irradiance. */
	debugProbes?: boolean
}

/**
 * Orchestrator: owns the BVH + volume, runs the per-frame DDGI passes, and
 * exposes `window.__ddgi` debug hooks (repo convention, mirrors 9_3dplatform's
 * `__rt`/`__bvh`).
 */
export class DdgiSystem {
	readonly bvh: DdgiBvh
	readonly volume: DdgiProbeVolume
	readonly debug: ProbeDebug | null = null
	private renderer: WebGPURenderer
	private frame = 0

	constructor( renderer: WebGPURenderer, options: DdgiSystemOptions ) {
		this.renderer = renderer

		this.bvh = new DdgiBvh( options.objects, { attributes: { position: 'vec4f' } } )
		if ( options.emissive ) {
			for ( const [ obj, color ] of options.emissive ) {
				this.bvh.setEmissive( obj, color )
			}
		}
		this.bvh.update()

		this.volume = new DdgiProbeVolume( options.config )
		this.volume.build()
		this.volume.attach( this.bvh )

		if ( options.debugProbes ) {
			this.debug = new ProbeDebug( this )
		}

		this.installDebugHooks()
	}

	/** Per-frame: rebuild transform data (static in M2, kept for M4), then DDGI passes. */
	update(): void {
		this.frame++
		this.bvh.updateTransforms()
		this.volume.update( this.renderer )
		this.debug?.tick( this.renderer, this.frame )
	}

	/** Reads the ray-data buffer back and computes a per-probe summary. */
	async readProbeSummary(): Promise<Float32Array> {
		const attr = this.volume.rayDataAttr
		const buffer = await this.renderer.getArrayBufferAsync( attr )
		const { numProbes, numRays } = this.volume
		const src = new Float32Array( buffer )
		const out = new Float32Array( numProbes * 4 ) // (avgL, avgL, avgL, hitFraction)
		for ( let p = 0; p < numProbes; p++ ) {
			let sumL = 0
			let hits = 0
			for ( let r = 0; r < numRays; r++ ) {
				const o = ( p * numRays + r ) * 4
				if ( src[ o + 3 ] < 1e20 ) hits++
				sumL += ( src[ o ] + src[ o + 1 ] + src[ o + 2 ] ) / 3
			}
			const avg = sumL / numRays
			out[ p * 4 + 0 ] = avg
			out[ p * 4 + 1 ] = avg
			out[ p * 4 + 2 ] = avg
			out[ p * 4 + 3 ] = hits / numRays
		}
		return out
	}

	private installDebugHooks(): void {
		const self = this
		;( window as unknown as Record<string, unknown> ).__ddgi = {
			config: {
				counts: self.volume.config.probeCounts,
				spacing: self.volume.config.probeSpacing,
				origin: self.volume.config.origin,
				numProbes: self.volume.numProbes,
				numRays: self.volume.numRays,
				probesPerRow: self.volume.probesPerRow,
				maxRayDistance: self.volume.maxRayDistance,
			},
			readProbeSummary: () => self.readProbeSummary(),
		}
	}
}
