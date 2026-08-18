import * as THREE from 'three'
import type { WebGPURenderer } from 'three/webgpu'
import type { DdgiSystem } from './DdgiSystem'

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

	/** Called from DdgiSystem.update(); readback is throttled to ~4 Hz. */
	tick( _renderer: WebGPURenderer, frame: number ): void {
		if ( frame % 15 !== 0 ) return
		void this.system.readProbeSummary().then( ( summary ) => {
			for ( let i = 0; i < summary.length / 4; i++ ) {
				const l = summary[ i * 4 + 0 ]
				// heat map: dark blue (occluded) → warm (lit)
				const t = Math.min( 1, l / 3 )
				this.color.setRGB( 0.05 + 0.95 * t, 0.05 + 0.35 * t, 0.2 * ( 1 - t ) )
				this.colors.setXYZ( i, this.color.r, this.color.g, this.color.b )
			}
			this.colors.needsUpdate = true
		} ).catch( () => undefined )
	}
}
