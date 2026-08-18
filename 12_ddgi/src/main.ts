import * as THREE from 'three'
import { WebGPURenderer, MeshBasicNodeMaterial } from 'three/webgpu'
import { positionWorld, normalWorld, cameraPosition, uniform, normalize, dot, texture, uv } from 'three/tsl'
import { DdgiSystem } from './engine/DdgiSystem'
import { DdgiProbeVolume } from './engine/DdgiProbeVolume'
import { buildDdgiQuery, type DdgiQuery } from './engine/DdgiMaterialNode'
import type { DdgiVolumeConfig } from './core/constants'

/**
 * DDGI probe lab — demo shell.
 * Cornell-box-like scene lit by a custom lambert node material:
 *   color = albedo × ( direct N·L + DDGI indirect irradiance )
 * The emissive card is the only DDGI light source; the thick wall is the leak
 * test (its GI stops at the wall even though the dim sun still lights both sides).
 */

const hud = document.getElementById( 'hud' ) as HTMLDivElement

function makeBox( w: number, h: number, d: number, x: number, y: number, z: number, material: THREE.Material ): THREE.Mesh {
	const mesh = new THREE.Mesh( new THREE.BoxGeometry( w, h, d ), material )
	mesh.position.set( x, y, z )
	return mesh
}

interface SceneKit {
	scene: THREE.Scene
	camera: THREE.PerspectiveCamera
	bvhObjects: THREE.Object3D[]
	card: THREE.Mesh
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

function buildScene( query: DdgiQuery ): SceneKit {
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

	const camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 0.1, 100 )
	camera.position.set( 0.6, 1.6, 3.4 )
	camera.lookAt( 0, 1.0, -0.6 )

	return { scene, camera, bvhObjects: [ floor, back, left, right, card, thick ], card }
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

	// --- DDGI volume: 5×3×5 probes ≈ 1.5 m spacing over the Cornell box ---
	const config: DdgiVolumeConfig = {
		origin: [ 0, 1.2, 0 ],
		probeSpacing: [ 1.5, 1.3, 1.5 ],
		probeCounts: [ 5, 3, 5 ],
	}

	// Build the volume first so the M3 query node exists before the scene meshes.
	const volume = new DdgiProbeVolume( config )
	volume.build()
	const query = buildDdgiQuery( volume )

	const { scene, camera, bvhObjects, card } = buildScene( query )

	const emissive = new Map()
	emissive.set( card, new THREE.Color( 5, 1.5, 0.5 ) )

	const ddgi = new DdgiSystem( renderer, { config, objects: bvhObjects, emissive, debugProbes: true, volume } )
	ddgi.debug && scene.add( ddgi.debug.object )

	// Live irradiance-atlas overlay (debug — the octahedral probe field).
	const overlay = new THREE.Mesh(
		new THREE.PlaneGeometry( 1.6, 1.6 ),
		new MeshBasicNodeMaterial( { toneMapped: false } ),
	)
	overlay.position.set( 2.1, 2.2, -1.88 )
	overlay.rotation.y = Math.PI // face the camera
	overlay.material.colorNode = texture( ddgi.volume.irradianceAtlas, uv() )
	scene.add( overlay )

	window.addEventListener( 'resize', () => {
		camera.aspect = window.innerWidth / window.innerHeight
		camera.updateProjectionMatrix()
		renderer.setSize( window.innerWidth, window.innerHeight )
	} )

	hud.textContent = 'WebGPU: OK — DDGI M3 (GI applied to surfaces)'

	renderer.setAnimationLoop( () => {
		ddgi.update()
		renderer.render( scene, camera )
	} )
}

void main()
