// engine/ToonRenderer.ts — toon pipeline: 4-stop gradientMap ramps, phase materials, inverted-hull
// outlines, ghost-layer variants (art-direction.md §3.4 + TDD §5).
import * as THREE from 'three'
import type { PhaseId } from '../core/types'

export interface PhasePalette {
  paper: string
  lit: string
  dark: string
  ink: string
  highlight: string
}

export const PHASE_PALETTE: Record<PhaseId, PhasePalette> = {
  solid: { paper: '#f2c57c', lit: '#ffe1a8', dark: '#b98e4e', ink: '#2a1f14', highlight: '#fff4d8' },
  liquid: { paper: '#2ec4b6', lit: '#6fe3d8', dark: '#17857a', ink: '#0d2a33', highlight: '#d8fffb' },
  // gas = cool cloud-white (polish U1: old #f4f2ea read as yellow — now pure cool white)
  gas: { paper: '#eef4f8', lit: '#ffffff', dark: '#9fb2c8', ink: '#3a4a5c', highlight: '#ffffff' },
  // plasma highlight: was #ffe9a8 (yellow) — now cool lavender-white so plasma never reads yellow
  plasma: { paper: '#b26bff', lit: '#d9a6ff', dark: '#7a3fd0', ink: '#1c0f2e', highlight: '#f2e4ff' },
}

function rampTexture(colors: [string, string, string, string]): THREE.DataTexture {
  const data = new Uint8Array(4 * 4)
  colors.forEach((hex, i) => {
    const c = new THREE.Color(hex)
    data[i * 4] = Math.round(c.r * 255)
    data[i * 4 + 1] = Math.round(c.g * 255)
    data[i * 4 + 2] = Math.round(c.b * 255)
    data[i * 4 + 3] = 255
  })
  const tex = new THREE.DataTexture(data, 4, 1, THREE.RGBAFormat)
  tex.minFilter = THREE.NearestFilter
  tex.magFilter = THREE.NearestFilter
  tex.needsUpdate = true
  return tex
}

function desaturate(hex: string, amount = 0.45): string {
  const c = new THREE.Color(hex).lerp(new THREE.Color(0x888888), amount)
  return `#${c.getHexString()}`
}

export interface PhaseMaterials {
  solid: THREE.MeshToonMaterial
  ghost: THREE.MeshToonMaterial
  outline: THREE.MeshBasicMaterial
}

export function makePhaseMaterials(phase: PhaseId): PhaseMaterials {
  const pal = PHASE_PALETTE[phase]
  const ramp = rampTexture([pal.dark, pal.paper, pal.lit, pal.highlight])
  const ghostRamp = rampTexture([pal.dark, pal.paper, pal.lit, pal.highlight].map((c) => desaturate(c, 0.3)) as [string, string, string, string])
  return {
    solid: new THREE.MeshToonMaterial({ color: pal.paper, gradientMap: ramp }),
    ghost: new THREE.MeshToonMaterial({
      color: desaturate(pal.paper, 0.35),
      gradientMap: ghostRamp,
      transparent: true,
      opacity: 0.15,
      depthWrite: false,
    }),
    outline: new THREE.MeshBasicMaterial({ color: pal.ink, side: THREE.BackSide, transparent: true }),
  }
}

// Inverted-hull outline as a child of the mesh (scale 1.03).
export function addOutline(mesh: THREE.Mesh, mats: PhaseMaterials, scale = 1.035): THREE.Mesh {
  const shell = new THREE.Mesh(mesh.geometry, mats.outline)
  shell.scale.setScalar(scale)
  mesh.add(shell)
  return shell
}

export function createRenderer(): THREE.WebGLRenderer {
  const renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.shadowMap.enabled = true
  renderer.shadowMap.type = THREE.BasicShadowMap // 皮影 = 硬影 (art-direction §3.4; r185 deprecates PCFSoft)
  renderer.outputColorSpace = THREE.SRGBColorSpace
  return renderer
}
