import * as THREE from 'three';

const MAX = 1500;

export class ParticleFx {
  private points: THREE.Points;
  private positions: Float32Array;
  private colors: Float32Array;
  private sizes: Float32Array;
  private vel: Float32Array;
  private life: Float32Array;
  private maxLife: Float32Array;
  private cursor = 0;
  private geometry: THREE.BufferGeometry;

  constructor(scene: THREE.Scene) {
    this.positions = new Float32Array(MAX * 3);
    this.colors = new Float32Array(MAX * 3);
    this.sizes = new Float32Array(MAX);
    this.vel = new Float32Array(MAX * 3);
    this.life = new Float32Array(MAX);
    this.maxLife = new Float32Array(MAX);
    this.geometry = new THREE.BufferGeometry();
    this.geometry.setAttribute('position', new THREE.BufferAttribute(this.positions, 3));
    this.geometry.setAttribute('color', new THREE.BufferAttribute(this.colors, 3));
    this.geometry.setAttribute('size', new THREE.BufferAttribute(this.sizes, 1));
    const mat = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: { uScale: { value: 8 } },
      vertexShader: `
        uniform float uScale;
        attribute float size;
        varying vec3 vColor;
        void main() {
          vColor = color;
          vec4 mv = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = size * uScale / -mv.z;
          gl_Position = projectionMatrix * mv;
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        void main() {
          float d = length(gl_PointCoord - 0.5);
          float a = smoothstep(0.5, 0.0, d);
          gl_FragColor = vec4(vColor, a);
        }
      `,
      vertexColors: true,
    });
    this.points = new THREE.Points(this.geometry, mat);
    this.points.frustumCulled = false;
    scene.add(this.points);
  }

  emit(pos: THREE.Vector3, color: THREE.Color, count: number, speed: number, life: number): void {
    for (let i = 0; i < count; i++) {
      const idx = this.cursor;
      this.cursor = (this.cursor + 1) % MAX;
      const i3 = idx * 3;
      this.positions[i3] = pos.x + (Math.random() - 0.5) * 1.5;
      this.positions[i3 + 1] = pos.y + (Math.random() - 0.5) * 1.5;
      this.positions[i3 + 2] = pos.z + (Math.random() - 0.5) * 1.5;
      const dir = new THREE.Vector3(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5).normalize();
      const s = speed * (0.3 + Math.random());
      this.vel[i3] = dir.x * s;
      this.vel[i3 + 1] = dir.y * s;
      this.vel[i3 + 2] = dir.z * s;
      this.colors[i3] = color.r;
      this.colors[i3 + 1] = color.g;
      this.colors[i3 + 2] = color.b;
      this.life[idx] = life * (0.5 + Math.random() * 0.5);
      this.maxLife[idx] = this.life[idx];
      this.sizes[idx] = 1.5 + Math.random() * 3;
    }
  }

  update(dt: number): void {
    for (let i = 0; i < MAX; i++) {
      if (this.life[i] <= 0) {
        this.sizes[i] = 0;
        continue;
      }
      this.life[i] -= dt;
      const i3 = i * 3;
      this.positions[i3] += this.vel[i3] * dt;
      this.positions[i3 + 1] += this.vel[i3 + 1] * dt;
      this.positions[i3 + 2] += this.vel[i3 + 2] * dt;
      const t = this.life[i] / this.maxLife[i];
      this.sizes[i] = (1.5 + Math.random() * 3) * t;
      this.colors[i3] *= 0.995;
      this.colors[i3 + 1] *= 0.995;
      this.colors[i3 + 2] *= 0.995;
    }
    this.geometry.attributes.position.needsUpdate = true;
    this.geometry.attributes.color.needsUpdate = true;
    this.geometry.attributes.size.needsUpdate = true;
  }
}
