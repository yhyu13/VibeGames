import * as THREE from 'three';

export function createEarth(radius = 150): THREE.Group {
  const group = new THREE.Group();
  const geo = new THREE.IcosahedronGeometry(radius, 4);
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 256;
  const ctx = canvas.getContext('2d')!;
  ctx.fillStyle = '#0a1a3a';
  ctx.fillRect(0, 0, 512, 256);
  let seed = 42;
  const rnd = () => {
    seed = (seed * 1103515245 + 12345) & 0x7fffffff;
    return seed / 0x7fffffff;
  };
  for (let i = 0; i < 60; i++) {
    ctx.fillStyle = rnd() > 0.5 ? '#0d3d2a' : '#1a4a1a';
    ctx.beginPath();
    ctx.ellipse(rnd() * 512, rnd() * 256, 20 + rnd() * 60, 12 + rnd() * 30, rnd() * 3, 0, Math.PI * 2);
    ctx.fill();
  }
  for (let i = 0; i < 40; i++) {
    ctx.fillStyle = 'rgba(255,255,255,0.06)';
    ctx.beginPath();
    ctx.arc(rnd() * 512, rnd() * 256, 4 + rnd() * 12, 0, Math.PI * 2);
    ctx.fill();
  }
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  const mat = new THREE.MeshStandardMaterial({ map: tex, roughness: 0.9, metalness: 0 });
  const earth = new THREE.Mesh(geo, mat);
  group.add(earth);

  const glow = new THREE.Mesh(
    new THREE.SphereGeometry(radius * 1.02, 32, 32),
    new THREE.ShaderMaterial({
      side: THREE.BackSide,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: { uColor: { value: new THREE.Color(0x4a7dff) } },
      vertexShader: `
        varying vec3 vNormal;
        varying vec3 vView;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          vec4 mv = modelViewMatrix * vec4(position, 1.0);
          vView = normalize(-mv.xyz);
          gl_Position = projectionMatrix * mv;
        }
      `,
      fragmentShader: `
        uniform vec3 uColor;
        varying vec3 vNormal;
        varying vec3 vView;
        void main() {
          float f = pow(1.0 - abs(dot(vNormal, vView)), 3.0);
          gl_FragColor = vec4(uColor, f * 0.9);
        }
      `,    }),
  );
  group.add(glow);
  return group;
}

export function createStarfield(scene: THREE.Scene, count = 1200, radius = 1000): void {
  const geo = new THREE.BufferGeometry();
  const pos = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const v = new THREE.Vector3().randomDirection().multiplyScalar(radius);
    pos[i * 3] = v.x;
    pos[i * 3 + 1] = v.y;
    pos[i * 3 + 2] = v.z;
  }
  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  const mat = new THREE.PointsMaterial({ color: 0xffffff, size: 1.4, transparent: true, opacity: 0.8, depthWrite: false });
  scene.add(new THREE.Points(geo, mat));
}
