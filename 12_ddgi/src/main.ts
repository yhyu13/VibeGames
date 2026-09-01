import * as THREE from 'three'
import { WebGPURenderer, MeshBasicNodeMaterial } from 'three/webgpu'
import { positionWorld, normalWorld, cameraPosition, uniform, normalize, dot, texture, uv } from 'three/tsl'
import { DdgiSystem } from './engine/DdgiSystem'
import { DdgiProbeVolume } from './engine/DdgiProbeVolume'
import { buildDdgiQuery, type DdgiQuery } from './engine/DdgiMaterialNode'
import { createLiveParams, type LiveParams } from './engine/LiveParams'
import { PROBE_NUM_RAYS } from './core/constants'
import type { DdgiVolumeConfig } from './core/constants'

/**
 * DDGI probe lab — demo shell.
 * Cornell-box-like scene lit by a custom lambert node material:
 *   color = albedo × ( direct N·L + DDGI indirect irradiance )
 * The emissive card is the only DDGI light source; the thick wall is the leak
 * test (its GI stops at the wall even though the dim sun still lights both sides).
 *
 * P0 (enhancements-100.md): interactive sandbox. Probe X/Y/Z + rays-per-probe
 * rebuild the volume and its kernels (cost-vs-quality); hysteresis + view/normal
 * bias tune live via `uniform()` values with no rebuild (ghosting-vs-noise,
 * bias-vs-light-leak).
 */

const hud = document.getElementById( 'hud' ) as HTMLDivElement

function makeBox( w: number, h: number, d: number, x: number, y: number, z: number, material: THREE.Material ): THREE.Mesh {
	const mesh = new THREE.Mesh( new THREE.BoxGeometry( w, h, d ), material )
	mesh.position.set( x, y, z )
	return mesh
}

/** Custom lambert material: albedo × (direct sun N·L + DDGI indirect). */
function createGiMaterial( query: DdgiQuery, albedoHex: number ): MeshBasicNodeMaterial {
	const albedo = uniform( new THREE.Color( albedoHex ) )
	const sunDir = normalize( uniform( new THREE.Vector3( 0.5, 0.8, 0.35 ) ) )
	const sunColor = uniform( new THREE.Color( 0.45, 0.44, 0.42 ) )
	const ambient = uniform( new THREE.Color( 0.05, 0.05, 0.06 ) )

	const n = normalize( normalWorld )
	const direct = sunColor.mul( dot( n, sunDir ).max( 0 ) ).add( ambient )
	const indirect = query.call( positionWorld, n, cameraPosition )

	const material = new MeshBasicNodeMaterial()
	material.colorNode = direct.add( indirect ).mul( albedo.rgb )
	return material
}

interface SceneKit {
	objects: THREE.Object3D[]
	scene: THREE.Scene
	camera: THREE.PerspectiveCamera
	bvhObjects: THREE.Object3D[]
	card: THREE.Mesh
}

function buildScene( query: DdgiQuery, outputObjects: THREE.Object3D[] ): SceneKit {
	const wall = createGiMaterial( query, 0xcfcfcf )
	const red = createGiMaterial( query, 0xb04a3a )

	const floor = makeBox( 6, 0.1, 6, 0, -0.05, 0, wall )
	const back = makeBox( 6, 3, 0.1, 0, 1.5, -2, wall )
	const left = makeBox( 0.1, 3, 6, -3, 1.5, 0, red )
	const right = makeBox( 0.1, 3, 6, 3, 1.5, 0, wall )

	// Emissive card on the left wall — the light source DDGI ray-traces.
	// Drawn bright (its own color); its BVH emissive is the warm linear value.
	const card = new THREE.Mesh(
		new THREE.PlaneGeometry( 1.4, 1.4 ),
		new THREE.MeshBasicMaterial( { color: 0xff9955, toneMapped: false } ),
	)
	card.position.set( -2.93, 1.8, -0.5 )
	card.rotation.y = Math.PI / 2

	// Thick occluder wall between the card and the box's shadowed side (leak test).
	const thick = makeBox( 0.3, 2, 3, -1.4, 1, 0, wall )

	const scene = new THREE.Scene()
	scene.background = new THREE.Color( 0x0b0b12 )
	scene.add( floor, back, left, right, card, thick )

	outputObjects.push( floor, back, left, right, card, thick )

	const camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 0.1, 100 )
	camera.position.set( 0.6, 1.6, 3.4 )
	camera.lookAt( 0, 1.0, -0.6 )

	return { objects: outputObjects, scene, camera, bvhObjects: [ floor, back, left, right, card, thick ], card }
}

/** A live mount: every GPU / scene resource owned by one config episode. */
interface Mount {
	volume: DdgiProbeVolume
	query: DdgiQuery
	system: DdgiSystem
	kit: SceneKit
	overlay: THREE.Mesh
	disposables: Array<{ dispose(): void }>
}

async function main(): Promise<void> {
	hud.textContent = 'WebGPU: checking…'
	if ( ! navigator.gpu ) {
		hud.textContent = 'WebGPU NOT available — DDGI needs compute shaders.'
		return
	}

	const renderer = new WebGPURenderer( { antialias: true } )
	await renderer.init()
	renderer.setPixelRatio( Math.min( window.devicePixelRatio, 2 ) )
	renderer.setSize( window.innerWidth, window.innerHeight )
	renderer.toneMapping = THREE.ACESFilmicToneMapping
	renderer.toneMappingExposure = 1.0
	document.body.appendChild( renderer.domElement )

	// Single-source live tunables (hysteresis + biases) — mutated by sliders.
	const live: LiveParams = createLiveParams()

	const config: DdgiVolumeConfig = {
		origin: [ 0, 1.2, 0 ],
		probeSpacing: [ 1.5, 1.3, 1.5 ],
		probeCounts: [ 5, 3, 5 ],
		probeNumRays: PROBE_NUM_RAYS,
	}

	// --- slider wiring (probe X/Y/Z + rays rebuild; tuning is live) ---
	function readSlider( id: string ): number {
		return Number( ( document.getElementById( id ) as HTMLInputElement ).value )
	}
	function bindSlider( id: string, labelId: string, fmt: ( n: number ) => string, onChange: ( n: number ) => void ): void {
		const el = document.getElementById( id ) as HTMLInputElement
		const label = document.getElementById( labelId ) as HTMLSpanElement
		el.addEventListener( 'input', () => {
			label.textContent = fmt( Number( el.value ) )
			onChange( Number( el.value ) )
		} )
	}

	// Live tuning sliders — write into the uniform node values, no rebuild.
	bindSlider( 'slot-hysteresis', 'val-hysteresis', ( n ) => n.toFixed( 3 ), ( n ) => { live.hysteresis.value = n } )
	bindSlider( 'slot-view-bias', 'val-view-bias', ( n ) => n.toFixed( 2 ), ( n ) => { live.viewBias.value = n } )
	bindSlider( 'slot-normal-bias', 'val-normal-bias', ( n ) => n.toFixed( 2 ), ( n ) => { live.normalBias.value = n } )

	let mount: Mount | null = null

	function buildVolumeConfig(): DdgiVolumeConfig {
		return {
			...config,
			probeCounts: [
				readSlider( 'slot-probe-x' ),
				readSlider( 'slot-probe-y' ),
				readSlider( 'slot-probe-z' ),
			],
			probeNumRays: readSlider( 'slot-rays' ),
		}
	}

	function disposeMount( m: Mount ): void {
		m.volume.dispose()
		for ( const obj of m.kit.objects ) {
			m.kit.scene.remove( obj )
			const mesh = obj as THREE.Mesh
			mesh.geometry?.dispose()
			const mat = mesh.material as THREE.Material | THREE.Material[] | undefined
			if ( Array.isArray( mat ) ) mat.forEach( ( x ) => x.dispose() )
			else mat?.dispose()
		}
		const debugObj = m.system.debug?.object
		if ( debugObj ) m.kit.scene.remove( debugObj )
		m.kit.scene.remove( m.overlay )
		;( m.overlay.geometry as THREE.BufferGeometry ).dispose()
		;( m.overlay.material as THREE.Material ).dispose()
	}

	function build(): void {
		// Rebuild the whole DDGI episode from the current slider config.
		if ( mount ) {
			disposeMount( mount )
			mount = null
		}

		const cfg = buildVolumeConfig()
		const volume = new DdgiProbeVolume( cfg, live )
		volume.build()
		const query = buildDdgiQuery( volume, live )

		const objects: THREE.Object3D[] = []
		const kit = buildScene( query, objects )

		const emissive = new Map<THREE.Object3D, THREE.Color>()
		emissive.set( kit.card, new THREE.Color( 5, 1.5, 0.5 ) )

		const system = new DdgiSystem( renderer, { config: cfg, objects: kit.bvhObjects, emissive, debugProbes: true, volume } )
		system.debug && kit.scene.add( system.debug.object )

		// Live irradiance-atlas overlay (debug — the octahedral probe field).
		const overlay = new THREE.Mesh(
			new THREE.PlaneGeometry( 1.6, 1.6 ),
			new MeshBasicNodeMaterial( { toneMapped: false } ),
		)
		overlay.position.set( 2.1, 2.2, -1.88 )
		overlay.rotation.y = Math.PI // face the camera
		overlay.material.colorNode = texture( system.volume.irradianceAtlas, uv() )
		kit.scene.add( overlay )

		mount = { volume, query, system, kit, overlay, disposables: [] }
	}

	// Probe X/Y/Z + rays sliders — rebuild the volume live.
	bindSlider( 'slot-probe-x', 'val-probe-x', String, () => { build() } )
	bindSlider( 'slot-probe-y', 'val-probe-y', String, () => { build() } )
	bindSlider( 'slot-probe-z', 'val-probe-z', String, () => { build() } )
	bindSlider( 'slot-rays', 'val-rays', String, () => { build() } )

	build()

	window.addEventListener( 'resize', () => {
		if ( ! mount ) return
		mount.kit.camera.aspect = window.innerWidth / window.innerHeight
		mount.kit.camera.updateProjectionMatrix()
		renderer.setSize( window.innerWidth, window.innerHeight )
	} )

	hud.textContent = 'WebGPU: OK — DDGI M3 (GI applied to surfaces)'

	renderer.setAnimationLoop( () => {
		if ( mount ) {
			mount.system.update()
			renderer.render( mount.kit.scene, mount.kit.camera )
		}
	} )
}

void main()
