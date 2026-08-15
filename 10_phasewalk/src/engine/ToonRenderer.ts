// engine/ToonRenderer.ts — toon pipeline: 4-stop gradientMap ramps, phase materials, inverted-hull
// outlines, ghost-layer variants (art-direction.md §3.4 + TDD §5).
import * as THREE from 'three'
import type { PhaseId } from '../core/types'
import { GHOST_ALPHA, GHOST_DESAT, OUTLINE_SCALE } from '../core/constants'

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

export function desaturate(hex: string, amount: number): string {
  // desaturate while PRESERVING luminance — lerping toward mid-gray 0x888888 drags light colors toward
  // 50% (gas paper #eef4f8 → grey, not cool-white). Reduce only saturation via HSL.
  const c = new THREE.Color(hex)
  const hsl = { h: 0, s: 0, l: 0 }
  c.getHSL(hsl)
  hsl.s = Math.max(0, hsl.s * (1 - amount))
  c.setHSL(hsl.h, hsl.s, hsl.l)
  return `#${c.getHexString()}`
}

// three r185 samples only the gradientMap's R channel as a scalar (gradientmap_pars_fragment.glsl:
// `return vec3( texture2D( gradientMap, coord ).r );`), so a multi-hue 4-stop ramp collapses to
// paper-hue × R-brightness bands and every stop's distinct hue is discarded. Rewrite the sampler to
// return the full RGB so each stop's hue survives; pair it with a white base color so the ramp IS the
// hue (not ramp × paper).
export function applyFullHueRamp(mat: THREE.MeshToonMaterial): THREE.MeshToonMaterial {
  mat.onBeforeCompile = (shader) => {
    shader.fragmentShader = shader.fragmentShader.replace(
      'return vec3( texture2D( gradientMap, coord ).r );',
      'return texture2D( gradientMap, coord ).rgb;',
    )
  }
  return mat
}

export interface PhaseMaterials {
  solid: THREE.MeshToonMaterial
  ghost: THREE.MeshToonMaterial
  outline: THREE.MeshBasicMaterial
}

export function makePhaseMaterials(phase: PhaseId, paperGrain?: THREE.Texture): PhaseMaterials {
  const pal = PHASE_PALETTE[phase]
  const ramp = rampTexture([pal.dark, pal.paper, pal.lit, pal.highlight])
  // ghost = each stop desaturated −GHOST_DESAT: with a full-hue ramp the −40% saturation must live on
  // the ramp itself (a white base color carries no hue to desaturate).
  const ghostRamp = rampTexture([
    desaturate(pal.dark, GHOST_DESAT),
    desaturate(pal.paper, GHOST_DESAT),
    desaturate(pal.lit, GHOST_DESAT),
    desaturate(pal.highlight, GHOST_DESAT),
  ])
  return {
    // paper grain as `map` = multiply blend (~4% swing) → surface reads as paper, not flat paint (art-direction §3.4)
    solid: applyFullHueRamp(new THREE.MeshToonMaterial({ color: 0xffffff, gradientMap: ramp, map: paperGrain })),
    ghost: applyFullHueRamp(new THREE.MeshToonMaterial({
      color: 0xffffff,
      gradientMap: ghostRamp,
      map: paperGrain,
      transparent: true,
      opacity: GHOST_ALPHA,
      depthWrite: false,
    })),
    outline: new THREE.MeshBasicMaterial({ color: pal.ink, side: THREE.BackSide, transparent: true }),
  }
}

// Inverted-hull outline as a child of the mesh (scale 1.03).
export function addOutline(mesh: THREE.Mesh, mats: PhaseMaterials, scale = OUTLINE_SCALE): THREE.Mesh {
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
