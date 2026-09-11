import * as THREE from 'three'
import type { WebGPURenderer } from 'three/webgpu'
import type { DdgiSystem } from './DdgiSystem'

/**
 * How much of each read-back the heat map keeps, per read-back (~4 Hz) — a ~1 s time constant.
 *
 * The ray set is re-rotated every frame (`core/fibonacci.ts frameRaySet`), so one read-back is one
 * noisy sample of the quantity the blur pass hysteresis-filters. This panel reads the ray buffer
 * directly and so bypasses that filter, and it then divided by the maximum of the same noisy
 * sample, which carried the sampling noise into the colour of every sphere at once. Measured on the
 * shipped scene by `.vts-probes/ddgi-heatmap.mjs` — 8 consecutive frames with the layer on against
 * 8 with it off, the second being the null test that says how much this scene's GI drifts by itself:
 * 12.1% of the layer's own pixels moved more than 8 levels between consecutive frames against a
 * null of 3.5%, mean swing 5.3 levels against 1.46. The layer was drawing its own sampling noise.
 */
const SMOOTHING = 0.25

/**
 * The ramp's upper anchor is a peak hold: it rises to the brightest probe at once and falls by this
 * factor per read-back (~6 s) when that probe dims. This is what stops one noisy read-back from
 * moving the divisor for every sphere. It costs nothing in honesty — a brightness change still
 * rescales the ramp, just over seconds instead of frames.
 */
const CEILING_DECAY = 0.97

/**
 * Where the ramp starts for a probe light reached, as a fraction of the ramp.
 *
 * Without it the faintest lit probe sits a few percent up the ramp, within a dozen green levels of
 * the unlit colour, so the leak test this layer exists to show — which probes the card reaches and
 * which the thick wall shades — is illegible for exactly the marginal probes. Reserving the bottom
 * of the ramp for "a ray arrived" spends range on the classification instead of on brightness; the
 * trade is that the top 85% carries the whole spread between the faintest and the brightest probe.
 */
const LIT_BOTTOM = 0.15

/**
 * M2 visual proof: instanced spheres at probe positions, colored by the
 * read-back average ray radiance (throttled). Probes that see the emissive card
 * glow; probes occluded by the thick wall stay dark — the leak test on screen.
 *
 * The colour is a function of how much light arrived and of nothing else. Two things used to break
 * that, and both were measured before they were changed:
 *
 * NOISE. The colour was scaled to the maximum of the frame being drawn, and that maximum is the
 * noisiest number in the frame. Blending the read-back and peak-holding the ceiling (`SMOOTHING`,
 * `CEILING_DECAY`) is the fix; the before/after is in the header of `SMOOTHING`.
 *
 * THE SLIDER. The unlit test was `l < 0.005`, a bare radiance number, while the read-back divides
 * by `numRays` — so the smallest reading a single ray of light can produce is `1/numRays`, which the
 * `Rays / probe` slider moves from 1/16 to 1/512. Measured across the sweep: one probe reads
 * 0.145833 at 16 rays and 0.004557 at 512, both of them exactly 2.33 rays' worth of light, and the
 * constant called the first lit and the second unlit — the control panel decided what the panel said
 * about light that did not change. The test is now half a ray's worth of average radiance: a reading
 * below that cannot be one ray carrying light, so it is rounding error, and the claim is the same
 * one at every slider setting. If no probe clears it, every sphere reads dark — which is the true
 * answer, not a failure to draw.
 *
 * This docstring used to quote the pixel triples `[13,13,51]` and `[20,15,49]` as measurements of
 * the old ramp. They were not measured; they were re-derived from the formula the round before had
 * just deleted, and it kept printing them as readings after the formula was gone. Nothing here
 * quotes a colour that was not read off a frame — `.vts-probes/ddgi-heatmap.mjs` decodes the
 * screenshots and reports what the spheres actually paint.
 */
export class ProbeDebug {
	private mesh: THREE.InstancedMesh
	private colors: THREE.InstancedBufferAttribute
	private readonly positions: THREE.Vector3[]
	private readonly color = new THREE.Color()
	/** Average ray radiance per probe, blended across read-backs — see `SMOOTHING`. */
	private readonly smoothed: Float32Array
	/** Upper anchor of the ramp: a peak hold with a slow fall — see `CEILING_DECAY`. */
	private ceiling = 0

	constructor( private system: DdgiSystem ) {
		const positions = system.volume.probeWorldPositions()
		this.positions = positions.map( ( [ x, y, z ] ) => new THREE.Vector3( x, y, z ) )
		this.smoothed = new Float32Array( positions.length )

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
			// One volume, one panel: `readProbeSummary` reads the same volume the spheres were laid
			// out from, so the read-back cannot be a different length than `smoothed`.
			const count = this.smoothed.length
			// Half a ray's worth of average radiance. The read-back divides by the ray count, so this
			// is the same physical claim at every setting of the `Rays / probe` slider.
			const floor = 0.5 / this.system.volume.numRays

			// Pass 1 — blend this read-back into the running estimate, and find the brightest probe
			// of the blended frame (not of the raw one: the ceiling must not carry the noise either).
			let brightest = 0
			for ( let i = 0; i < count; i++ ) {
				this.smoothed[ i ] += ( summary[ i * 4 ] - this.smoothed[ i ] ) * SMOOTHING
				if ( this.smoothed[ i ] > brightest ) brightest = this.smoothed[ i ]
			}
			this.ceiling = Math.max( brightest, this.ceiling * CEILING_DECAY )

			// Pass 2 — paint. The unlit test comes first: a probe below the floor is in shadow, and
			// the ramp must not invent a gradient out of rounding error.
			const span = this.ceiling - floor
			for ( let i = 0; i < count; i++ ) {
				const l = this.smoothed[ i ]
				const t = l < floor
					? 0
					: LIT_BOTTOM + ( 1 - LIT_BOTTOM ) * Math.min( 1, ( l - floor ) / span )
				// heat map: dark blue (occluded) → warm (lit)
				this.color.setRGB( 0.05 + 0.95 * t, 0.05 + 0.35 * t, 0.2 * ( 1 - t ) )
				this.colors.setXYZ( i, this.color.r, this.color.g, this.color.b )
			}
			this.colors.needsUpdate = true
		} ).catch( () => undefined )
	}
}
