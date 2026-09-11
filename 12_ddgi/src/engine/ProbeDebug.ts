import * as THREE from 'three'
import type { WebGPURenderer } from 'three/webgpu'
import type { DdgiSystem } from './DdgiSystem'

/**
 * Below this average ray radiance a probe counts as unlit, and the heat map leaves it at the cold end.
 *
 * It sits in a measured gap rather than at a round number: in the shipped scene 64 of the 75 probes
 * read exactly 0 (no ray reaches the emissive card) and the smallest non-zero reading is 0.0091, so
 * any threshold between those two separates "no light arrived" from "some did". A probe that reads
 * below the floor is not dim — it is in shadow — and painting it as a mid-ramp colour would be the
 * map inventing light.
 */
const LIT_FLOOR = 0.005

/**
 * M2 visual proof: instanced spheres at probe positions, colored by the
 * read-back average ray radiance (throttled). Probes that see the emissive card
 * glow; probes occluded by the thick wall stay dark — the leak test on screen.
 */
export class ProbeDebug {
	private mesh: THREE.InstancedMesh
	private colors: THREE.InstancedBufferAttribute
	private readonly positions: THREE.Vector3[]
	private readonly color = new THREE.Color()

	constructor( private system: DdgiSystem ) {
		const positions = system.volume.probeWorldPositions()
		this.positions = positions.map( ( [ x, y, z ] ) => new THREE.Vector3( x, y, z ) )

		const geometry = new THREE.SphereGeometry( 0.07, 10, 8 )
		const material = new THREE.MeshBasicMaterial( { toneMapped: false } )
		this.mesh = new THREE.InstancedMesh( geometry, material, positions.length )
		this.colors = new THREE.InstancedBufferAttribute( new Float32Array( positions.length * 3 ), 3 )

		const dummy = new THREE.Object3D()
		for ( let i = 0; i < positions.length; i++ ) {
			dummy.position.copy( this.positions[ i ] )
			dummy.updateMatrix()
			this.mesh.setMatrixAt( i, dummy.matrix )
			this.colors.setXYZ( i, 0.08, 0.1, 0.12 )
		}
		this.mesh.instanceColor = this.colors
		this.mesh.frustumCulled = false
	}

	get object(): THREE.Object3D {
		return this.mesh
	}

	/**
	 * Called from DdgiSystem.update(); readback is throttled to ~4 Hz.
	 *
	 * The heat map is scaled to the range the frame actually contains, not to a fixed ceiling. It
	 * used to saturate at `l / 3`, but a probe's average ray radiance here is nowhere near 3: measured
	 * on the shipped build (`.vts-probes/ddgi-layers.mjs`, via this class's own read-back), 75 probes
	 * span 0 → 0.0911 with 64 of them exactly 0, so every sphere landed in the bottom 3% of the ramp
	 * and the whole cloud painted one colour — `[13,13,51]` from the darkest probe to the 90th
	 * percentile, `[20,15,49]` at the brightest. The layer whose docstring calls itself "the leak test
	 * on screen" showed a flat field: the probes the thick wall shades and the probes the card reaches
	 * were the same colour. Scaling to the observed maximum separates them, and it survives the
	 * probe-count / ray-count sliders, which move the absolute radiance but not the shape.
	 *
	 * The floor is what keeps that honest: below `LIT_FLOOR` nothing is lit, and the ramp must not
	 * invent a gradient out of rounding error. If no probe clears the floor, every sphere reads dark —
	 * which is the true answer, not a failure to draw.
	 */
	tick( _renderer: WebGPURenderer, frame: number ): void {
		if ( frame % 15 !== 0 ) return
		void this.system.readProbeSummary().then( ( summary ) => {
			const count = summary.length / 4
			let maxL = 0
			for ( let i = 0; i < count; i++ ) if ( summary[ i * 4 ] > maxL ) maxL = summary[ i * 4 ]
			const span = maxL - LIT_FLOOR
			for ( let i = 0; i < count; i++ ) {
				const l = summary[ i * 4 + 0 ]
				// heat map: dark blue (occluded) → warm (lit)
				const t = span > 0 ? Math.min( 1, Math.max( 0, ( l - LIT_FLOOR ) / span ) ) : 0
				this.color.setRGB( 0.05 + 0.95 * t, 0.05 + 0.35 * t, 0.2 * ( 1 - t ) )
				this.colors.setXYZ( i, this.color.r, this.color.g, this.color.b )
			}
			this.colors.needsUpdate = true
		} ).catch( () => undefined )
	}
}
