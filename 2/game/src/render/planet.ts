import * as THREE from "three";
import { PLANET_RADIUS } from "../core/types";

function makeNoiseTexture(size: number, fn: (x: number, y: number) => [number, number, number], label: string): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  const img = ctx.createImageData(size, size);
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const [r, g, b] = fn(x / size, y / size);
      const i = (y * size + x) * 4;
      img.data[i] = r;
      img.data[i + 1] = g;
      img.data[i + 2] = b;
      img.data[i + 3] = 255;
    }
  }
  ctx.putImageData(img, 0, 0);
  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.name = label;
  return tex;
}

function valueNoise(x: number, y: number): number {
  let n = Math.sin(x * 127.1 + y * 311.7) * 43758.5453;
  n -= Math.floor(n);
  return n;
}

function fbm(x: number, y: number, octaves: number): number {
  let amp = 0.5;
  let freq = 1;
  let sum = 0;
  for (let i = 0; i < octaves; i++) {
    sum += amp * valueNoise(x * freq, y * freq);
    amp *= 0.5;
    freq *= 2;
  }
  return sum;
}

export function createPlanet(profileTint: number): THREE.Mesh {
  const colorFn = (x: number, y: number): [number, number, number] => {
    const e = fbm(x * 3, y * 3, 5);
    const tint = profileTint;
    if (e < 0.35) {
      const d = e / 0.35;
      return [Math.round(18 + 40 * d * (tint / 255)), Math.round(38 + 60 * d), Math.round(80 + 60 * d)];
    }
    const land = Math.min(1, (e - 0.35) / 0.65);
    return [
      Math.round(40 + 90 * land + 20 * (tint / 255)),
      Math.round(60 + 70 * land),
      Math.round(30 + 30 * land),
    ];
  };
  const roughFn = (x: number, y: number): [number, number, number] => {
    const e = fbm(x * 2, y * 2, 4);
    const v = Math.round(60 + e * 80);
    return [v, v, v];
  };
  const metalFn = (): [number, number, number] => [10, 10, 10];
  const emissiveFn = (x: number, y: number): [number, number, number] => {
    const city = fbm(x * 12, y * 12, 3);
    const v = city > 0.72 ? Math.round((city - 0.72) * 900) : 0;
    return [v, Math.round(v * 0.9), Math.round(v * 0.7)];
  };

  const geom = new THREE.SphereGeometry(PLANET_RADIUS, 96, 96);
  const mat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    map: makeNoiseTexture(1024, colorFn, "planet-color"),
    roughnessMap: makeNoiseTexture(512, roughFn, "planet-roughness"),
    metalnessMap: makeNoiseTexture(256, metalFn, "planet-metalness"),
    emissiveMap: makeNoiseTexture(1024, emissiveFn, "planet-citylights"),
    emissive: new THREE.Color(1, 0.95, 0.7),
    emissiveIntensity: 1.2,
    roughness: 0.9,
    metalness: 0.05,
  });
  const mesh = new THREE.Mesh(geom, mat);
  mesh.rotation.y = 0.6;
  return mesh;
}

export function createAtmosphere(): THREE.Mesh {
  const geom = new THREE.SphereGeometry(PLANET_RADIUS * 1.03, 64, 64);
  const mat = new THREE.ShaderMaterial({
    transparent: true,
    side: THREE.BackSide,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    uniforms: {
      uColor: { value: new THREE.Color(0x4488ff) },
      uIntensity: { value: 1.0 },
    },
    vertexShader: `
      varying vec3 vNormal;
      varying vec3 vView;
      void main() {
        vNormal = normalize(normalMatrix * normal);
        vec4 mv = modelViewMatrix * vec4(position, 1.0);
        vView = -mv.xyz;
        gl_Position = projectionMatrix * mv;
      }
    `,
    fragmentShader: `
      uniform vec3 uColor;
      uniform float uIntensity;
      varying vec3 vNormal;
      varying vec3 vView;
      void main() {
        float fresnel = pow(1.0 - abs(dot(normalize(vNormal), normalize(vView))), 3.0);
        gl_FragColor = vec4(uColor * fresnel * uIntensity, fresnel * 0.8);
      }
    `,
  });
  const mesh = new THREE.Mesh(geom, mat);
  return mesh;
}

export function updatePlanetTint(mesh: THREE.Mesh, tint: number): void {
  const mat = mesh.material as THREE.MeshStandardMaterial;
  mat.emissiveIntensity = 0.8 + (tint / 255) * 0.8;
}
