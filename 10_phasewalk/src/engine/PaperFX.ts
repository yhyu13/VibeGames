// engine/PaperFX.ts — procedural paper grain + backdrop curtain textures (art-direction §3.4, TDD §5.5).
// Zero asset files: canvas-generated at boot (repo convention — paper grain + ramp maps are never on disk).
import * as THREE from 'three'

function makeCanvas(size: number): HTMLCanvasElement {
  const c = document.createElement('canvas')
  c.width = size
  c.height = size
  return c
}

// 128px fine noise, luminance centered near-white with a ~±4% swing → subtle paper grain.
// Applied as a `map` (multiply blend) on the toon material so the surface reads as paper, not flat paint.
export function makePaperGrainTexture(size = 128): THREE.CanvasTexture {
  const c = makeCanvas(size)
  const ctx = c.getContext('2d')!
  const img = ctx.createImageData(size, size)
  for (let i = 0; i < size * size; i++) {
    const v = 236 + Math.floor(Math.random() * 19) // 236..255 (~92%..100% white) → subtle grain
    img.data[i * 4] = v
    img.data[i * 4 + 1] = v
    img.data[i * 4 + 2] = v
    img.data[i * 4 + 3] = 255
  }
  ctx.putImageData(img, 0, 0)
  const tex = new THREE.CanvasTexture(c)
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping
  tex.colorSpace = THREE.SRGBColorSpace
  tex.needsUpdate = true
  return tex
}

// Backdrop curtain = 幕布色 #1a1b2e + baked paper grain (one texture, screen-space scene.background).
export function makeBackdropTexture(size = 512): THREE.CanvasTexture {
  const c = makeCanvas(size)
  const ctx = c.getContext('2d')!
  ctx.fillStyle = '#1a1b2e'
  ctx.fillRect(0, 0, size, size)
  const img = ctx.getImageData(0, 0, size, size)
  const d = img.data
  for (let i = 0; i < d.length; i += 4) {
    const n = (Math.random() - 0.5) * 12 // ±6 luminance jitter → faint woven-paper mottle
    d[i] = Math.max(0, Math.min(255, d[i] + n))
    d[i + 1] = Math.max(0, Math.min(255, d[i + 1] + n))
    d[i + 2] = Math.max(0, Math.min(255, d[i + 2] + n))
  }
  ctx.putImageData(img, 0, 0)
  const tex = new THREE.CanvasTexture(c)
  tex.colorSpace = THREE.SRGBColorSpace
  tex.needsUpdate = true
  return tex
}
