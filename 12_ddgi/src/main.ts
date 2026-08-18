import * as THREE from 'three'
import { WebGPURenderer, MeshBasicNodeMaterial } from 'three/webgpu'
import { texture, uv } from 'three/tsl'
import { DdgiSystem } from './engine/DdgiSystem'
import type { DdgiVolumeConfig } from './core/constants'

/**
 * DDGI probe lab — demo shell.
 * Cornell-box-like scene: emissive card (the light source DDGI ray-traces),
 * thick occluder wall (the M2 leak-test target), probe gizmos colored by
 * readback, and a live octahedral irradiance-atlas overlay.
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
	/** Objects that participate in the BVH (excludes debug overlays). */
	bvhObjects: THREE.Object3D[]
	card: THREE.Mesh
}

function buildScene(): SceneKit {
	const wall = new THREE.MeshStandardMaterial( { color: 0xcfcfcf, roughness: 0.9, metalness: 0 } )
	const red = new THREE.MeshStandardMaterial( { color: 0xb04a3a, roughness: 0.9, metalness: 0 } )

	const floor = makeBox( 6, 0.1, 6, 0, -0.05, 0, wall )
	const back = makeBox( 6, 3, 0.1, 0, 1.5, -2, wall )
	const left = makeBox( 0.1, 3, 6, -3, 1.5, 0, red )
	const right = makeBox( 0.1, 3, 6, 3, 1.5, 0, wall )

	// Emissive card on the left wall — the light source DDGI must see.
	const card = new THREE.Mesh(
		new THREE.PlaneGeometry( 1.4, 1.4 ),
		new THREE.MeshBasicMaterial( { color: 0xffffff, toneMapped: false } ),
	)
	card.position.set( -2.93, 1.8, -0.5 )
	card.rotation.y = Math.PI / 2

	// Thick occluder wall between the card and the box's shadowed side (M2 leak test).
	const thick = makeBox( 0.3, 2, 3, -1.4, 1, 0, wall )

	const scene = new THREE.Scene()
	scene.background = new THREE.Color( 0x0b0b12 )
	scene.add( floor, back, left, right, card, thick )

	const sun = new THREE.DirectionalLight( 0xffffff, 2.5 )
	sun.position.set( 2, 4, 3 )
	scene.add( sun, new THREE.AmbientLight( 0xffffff, 0.12 ) )

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

	const { scene, camera, bvhObjects, card } = buildScene()

	// --- DDGI volume: 5×3×5 probes ≈ 1.5 m spacing over the Cornell box ---
	const config: DdgiVolumeConfig = {
		origin: [ 0, 1.2, 0 ],
		probeSpacing: [ 1.5, 1.3, 1.5 ],
		probeCounts: [ 5, 3, 5 ],
	}

	const emissive = new Map()
	emissive.set( card, new THREE.Color( 6, 6, 6 ) )

	const ddgi = new DdgiSystem( renderer, { config, objects: bvhObjects, emissive, debugProbes: true } )
	ddgi.debug && scene.add( ddgi.debug.object )

	// Live irradiance-atlas overlay (probes visualizable — M2 gate).
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

	hud.textContent = 'WebGPU: OK — DDGI M2 pipeline running'

	renderer.setAnimationLoop( () => {
		ddgi.update()
		renderer.render( scene, camera )
	} )
}

void main()
