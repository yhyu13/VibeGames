// 9_3dplatform concept exhibition — 12 procedural dioramas of each concept's 极致 case.
// Zero assets: every mesh is procedural. three 0.170 core only (no addons → no importmap).
import * as THREE from '/6_patapong3D/node_modules/three/build/three.module.js';

const W = 1280, H = 720;

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(W, H);
renderer.setPixelRatio(1);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.15;
renderer.outputColorSpace = THREE.SRGBColorSpace;
document.getElementById('stage').appendChild(renderer.domElement);

// ---------- shared helpers ----------
function skyGradient(top, bottom) {
  const c = document.createElement('canvas'); c.width = 4; c.height = 256;
  const ctx = c.getContext('2d');
  const gr = ctx.createLinearGradient(0, 0, 0, 256);
  gr.addColorStop(0, top); gr.addColorStop(1, bottom);
  ctx.fillStyle = gr; ctx.fillRect(0, 0, 4, 256);
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; return t;
}
function makeEnv(top, bottom) {
  const tex = skyGradient(top, bottom);
  const sky = new THREE.Scene();
  sky.add(new THREE.Mesh(new THREE.SphereGeometry(400, 16, 12),
    new THREE.MeshBasicMaterial({ map: tex, side: THREE.BackSide })));
  const env = new THREE.PMREMGenerator(renderer).fromScene(sky).texture;
  return { env, background: tex };
}
function std(color, rough = 0.9, metal = 0, extra = {}) {
  return new THREE.MeshStandardMaterial({ color, roughness: rough, metalness: metal, ...extra });
}
function glow(color, intensity = 2) {
  return new THREE.MeshStandardMaterial({ color: 0x000000, emissive: color, emissiveIntensity: intensity, roughness: 1 });
}
function box(scene, x, y, z, w, h, d, mat, shadow = true) {
  const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
  m.position.set(x, y, z);
  if (shadow) { m.castShadow = true; m.receiveShadow = true; }
  scene.add(m); return m;
}
function keeper(scale = 1, bodyColor = 0xffd166) {
  const g = new THREE.Group();
  const body = new THREE.Mesh(new THREE.CapsuleGeometry(0.28 * scale, 0.5 * scale, 6, 12),
    new THREE.MeshPhysicalMaterial({ color: bodyColor, roughness: 0.35, metalness: 0, clearcoat: 1 }));
  body.position.y = 0.8 * scale; body.castShadow = true; g.add(body);
  const head = new THREE.Mesh(new THREE.SphereGeometry(0.22 * scale, 24, 16), glow(0xffd166, 2.2));
  head.position.y = 1.25 * scale; g.add(head);
  return g;
}
function line3(scene, pts, color, opacity = 0.7) {
  const g = new THREE.BufferGeometry().setFromPoints(pts.map(p => new THREE.Vector3(...p)));
  const l = new THREE.Line(g, new THREE.LineBasicMaterial({ color, transparent: true, opacity }));
  scene.add(l); return l;
}
function dashed(scene, pts, color) {
  const g = new THREE.BufferGeometry().setFromPoints(pts.map(p => new THREE.Vector3(...p)));
  const m = new THREE.LineDashedMaterial({ color, dashSize: 0.3, gapSize: 0.2 });
  const l = new THREE.Line(g, m); l.computeLineDistances(); scene.add(l); return l;
}
function points(scene, positions, color, size = 0.08, opacity = 1) {
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(positions.flat(), 3));
  const p = new THREE.Points(g, new THREE.PointsMaterial({ color, size, transparent: true, opacity, sizeAttenuation: true }));
  scene.add(p); return p;
}
function lowSun(scene, color, pos) {
  const sun = new THREE.DirectionalLight(color, 3);
  sun.position.set(...pos); sun.castShadow = true;
  sun.shadow.mapSize.set(2048, 2048);
  const s = 34;
  sun.shadow.camera.left = -s; sun.shadow.camera.right = s;
  sun.shadow.camera.top = s; sun.shadow.camera.bottom = -s;
  sun.shadow.camera.far = 90;
  scene.add(sun); return sun;
}

// ---------- 12 scenes (each = the concept's 极致 case, frozen) ----------

function s01_shadowstep() {
  const scene = new THREE.Scene();
  const { env, background } = makeEnv('#ff9a5c', '#1a1b2e');
  scene.background = background; scene.environment = env;
  scene.fog = new THREE.Fog(0x2a2440, 20, 62);
  const ground = new THREE.Mesh(new THREE.PlaneGeometry(70, 70), std(0xf2c57c, 0.95));
  ground.rotation.x = -Math.PI / 2; ground.receiveShadow = true; scene.add(ground);
  lowSun(scene, 0xffb347, [20, 7, 8]);
  scene.add(new THREE.HemisphereLight(0x3a3f5c, 0x0d0e18, 0.5));
  const rock = std(0xf2c57c, 0.95);
  box(scene, -7, 1, -5, 4, 2, 4, rock);
  box(scene, -7, 3, -5, 2.6, 2, 4, rock);
  box(scene, 5, 1, 4, 5, 2, 5, rock);
  // the sun pool = the pit (intangible light)
  const pool = new THREE.Mesh(new THREE.CircleGeometry(2.4, 48), glow(0xfff2d0, 2.6));
  pool.rotation.x = -Math.PI / 2; pool.position.set(5, 0.02, -4); scene.add(pool);
  // lamp post with light cone
  box(scene, 0, 1.6, 0, 0.18, 3.2, 0.18, std(0x8c6a3f, 0.6, 0.8));
  const lamp = new THREE.Mesh(new THREE.SphereGeometry(0.3, 20, 14), glow(0xffd166, 3));
  lamp.position.set(0, 3.3, 0); scene.add(lamp);
  const spot = new THREE.SpotLight(0xffd166, 60, 15, 0.9, 0.5, 1.4);
  spot.position.set(0, 3.3, 0); spot.target.position.set(0, 0, 4.5); spot.castShadow = true;
  scene.add(spot, spot.target);
  const k = keeper(1); k.position.set(-2.4, 0, 2.6); scene.add(k);
  return { scene, target: [0, 1.4, 1], radius: 11.5, height: 4.4, angle0: 1.05 };
}

function s02_echoForge() {
  const scene = new THREE.Scene();
  const { env, background } = makeEnv('#7a5cff', '#140a26');
  scene.background = background; scene.environment = env;
  scene.fog = new THREE.Fog(0x140a26, 14, 48);
  const cliff = std(0x3a3f5c, 0.95);
  box(scene, -8.5, 1.5, 0, 6, 3, 10, cliff);
  box(scene, 8.5, 1.5, 0, 6, 3, 10, cliff);
  box(scene, 0, -14, 0, 44, 1, 20, std(0x0d0e18, 1), false);
  const echoMat = new THREE.MeshStandardMaterial({ color: 0x9be8ff, roughness: 0.1, metalness: 0.2, transparent: true, opacity: 0.42, emissive: 0x3fd4ff, emissiveIntensity: 0.8 });
  for (let i = 0; i < 3; i++) {
    const e = new THREE.Mesh(new THREE.BoxGeometry(1.7, 0.12, 1.2), echoMat);
    e.position.set(-5.4 + i * 3.6, 2.15 - i * 0.5, 0); scene.add(e);
  }
  const trail = [];
  for (let i = 0; i < 10; i++) trail.push([-7.6 + i * 1.5, 1.0 + Math.sin(i * 0.55) * 1.5, 0]);
  points(scene, trail, 0x9be8ff, 0.13, 0.75);
  const k = keeper(0.9); k.position.set(1.8, 1.32, 0); k.rotation.z = -0.28; scene.add(k);
  return { scene, target: [0, 2, 0], radius: 12.5, height: 2.8, angle0: 0.12 };
}

function s03_ferro() {
  const scene = new THREE.Scene();
  const { env, background } = makeEnv('#10131f', '#05060c');
  scene.background = background; scene.environment = env;
  const metal = std(0x3a4156, 0.35, 0.5);
  box(scene, 0, -1.6, 0, 26, 0.6, 26, metal, false);
  box(scene, -12.5, 3.5, 0, 0.8, 10, 26, metal, false);
  box(scene, 12.5, 3.5, 0, 0.8, 10, 26, metal, false);
  box(scene, 0, 12, -12.5, 26, 0.8, 0.8, metal, false);
  const N = new THREE.Mesh(new THREE.ConeGeometry(0.45, 1.2, 24), glow(0xff4444, 2.4));
  N.position.set(-9, 1.1, -4); scene.add(N);
  const S = new THREE.Mesh(new THREE.ConeGeometry(0.45, 1.2, 24), glow(0x4488ff, 2.4));
  S.position.set(9, 1.1, 3); scene.add(S);
  const T = new THREE.Mesh(new THREE.ConeGeometry(0.45, 1.2, 24), glow(0x4488ff, 2.4));
  T.position.set(0, 11.4, 0); T.rotation.z = Math.PI; scene.add(T);
  const crack = new THREE.Mesh(new THREE.PlaneGeometry(1.7, 12), glow(0xff2e6b, 2.2));
  crack.rotation.x = -Math.PI / 2; crack.position.y = 0.02; scene.add(crack);
  line3(scene, [[-9, 1, -4], [0, 6, 0], [9, 1, 3]], 0x66aaff, 0.55);
  line3(scene, [[0, 11.4, 0], [-4, 6, 2], [9, 1, 3]], 0xff8866, 0.45);
  const blob = new THREE.Group();
  const core = new THREE.Mesh(new THREE.IcosahedronGeometry(0.9, 2), std(0x9aa4c0, 0.08, 1.0));
  core.scale.set(1, 1.5, 0.7); blob.add(core);
  for (let i = 0; i < 14; i++) {
    const sp = new THREE.Mesh(new THREE.ConeGeometry(0.07, 0.5 + Math.random() * 0.6, 6), std(0x9aa4c0, 0.12, 1.0));
    const dir = new THREE.Vector3(Math.random() - 0.5, 1, Math.random() - 0.5).normalize();
    sp.position.copy(dir).multiplyScalar(1.1);
    sp.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir);
    blob.add(sp);
  }
  blob.position.set(0, 3.2, 0); blob.rotation.z = 0.5; scene.add(blob);
  scene.add(new THREE.HemisphereLight(0x3a3f5c, 0x05060c, 1.2));
  const fill = new THREE.PointLight(0x8899cc, 800, 24); fill.position.set(0, 4.5, 0); scene.add(fill);
  return { scene, target: [0, 3.4, 0], radius: 13.5, height: 2.8, angle0: 0.6 };
}

function s04_kaleido() {
  const scene = new THREE.Scene();
  const { env, background } = makeEnv('#2b1e4a', '#0a0716');
  scene.background = background; scene.environment = env;
  const wallMat = std(0x8899bb, 0.08, 0.7);
  for (let i = 0; i < 6; i++) {
    const a = (i / 6) * Math.PI * 2;
    const w = new THREE.Mesh(new THREE.PlaneGeometry(8.4, 7), wallMat);
    w.position.set(Math.cos(a) * 4.6, 3.5, Math.sin(a) * 4.6);
    w.lookAt(0, 3.5, 0); scene.add(w);
  }
  const petal = std(0xf2c57c, 0.6);
  for (let i = 0; i < 6; i++) {
    const a = (i / 6) * Math.PI * 2 + Math.PI / 6;
    const p = new THREE.Mesh(new THREE.BoxGeometry(3.4, 0.3, 1.5), petal);
    p.position.set(Math.cos(a) * 2.4, 0, Math.sin(a) * 2.4);
    p.rotation.y = -a; p.receiveShadow = true; scene.add(p);
  }
  const col = new THREE.Mesh(new THREE.CylinderGeometry(0.25, 0.25, 5, 16), glow(0xffd166, 3));
  col.position.set(0, 2.5, 0); scene.add(col);
  scene.add(new THREE.HemisphereLight(0x2b1e4a, 0x0a0716, 1.3));
  const centerLight = new THREE.PointLight(0xffd166, 600, 18); centerLight.position.set(0, 2.5, 0); scene.add(centerLight);
  for (let i = 0; i < 6; i++) {
    const a = (i / 6) * Math.PI * 2 + Math.PI / 6;
    const k = keeper(0.72);
    k.position.set(Math.cos(a) * 3.2, 0.15, Math.sin(a) * 3.2);
    k.lookAt(0, 1, 0); scene.add(k);
  }
  return { scene, target: [0, 2.2, 0], radius: 10.5, height: 4.6, angle0: 0.35 };
}

function s05_phasewalk() {
  const scene = new THREE.Scene();
  const { env, background } = makeEnv('#1a1040', '#060414');
  scene.background = background; scene.environment = env;
  scene.fog = new THREE.Fog(0x0a0620, 14, 52);
  const stone = std(0xf2c57c, 0.9);
  box(scene, 0, 0.6, 0, 3, 1.2, 3, stone);
  box(scene, 0, 2.2, 2.6, 2.2, 1.2, 2.2, stone);
  box(scene, 0, 3.8, 5.2, 1.6, 1.2, 1.6, stone);
  const tubeMat = new THREE.MeshStandardMaterial({ color: 0x2ec4b6, transparent: true, opacity: 0.14, roughness: 0.2, emissive: 0x2ec4b6, emissiveIntensity: 0.4 });
  const tube = new THREE.Mesh(new THREE.TorusGeometry(1.7, 0.35, 12, 32), tubeMat);
  tube.position.set(0, 2.6, 5.8); tube.rotation.x = Math.PI / 2; scene.add(tube);
  const gas = new THREE.Mesh(new THREE.TorusGeometry(2.3, 0.5, 10, 36),
    new THREE.MeshStandardMaterial({ color: 0xffffff, transparent: true, opacity: 0.12, emissive: 0xffffff, emissiveIntensity: 0.5 }));
  gas.position.set(0, 4.8, 2.8); gas.rotation.x = Math.PI / 2; scene.add(gas);
  const wcurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-1.8, 3.2, 3.6), new THREE.Vector3(0, 5.4, 4.4),
    new THREE.Vector3(1.8, 3.2, 5.2), new THREE.Vector3(0, 6.8, 6.2),
  ]);
  const wtube = new THREE.Mesh(new THREE.TubeGeometry(wcurve, 40, 0.07, 8),
    new THREE.MeshStandardMaterial({ color: 0x000000, emissive: 0xb26bff, emissiveIntensity: 2.4, transparent: true, opacity: 0.5 }));
  scene.add(wtube);
  const k = keeper(0.85); k.position.set(0, 4.45, 5.2); scene.add(k);
  return { scene, target: [0, 3.6, 2], radius: 11, height: 3, angle0: 0.5 };
}

function s06_sonar() {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x000000);
  const cave = new THREE.Mesh(new THREE.CylinderGeometry(9.5, 9.5, 44, 32, 1, true), std(0x0a0c14, 1));
  cave.position.set(0, 9, -12); scene.add(cave);
  const exitGlow = new THREE.Mesh(new THREE.SphereGeometry(1.7, 24, 16), glow(0xaef4ff, 5));
  exitGlow.position.set(0, 3.4, -31); scene.add(exitGlow);
  const exitPlane = new THREE.Mesh(new THREE.CircleGeometry(2.7, 32), glow(0xd8fbff, 4));
  exitPlane.position.set(0, 3.4, -30.8); exitPlane.lookAt(0, 3.4, -18); scene.add(exitPlane);
  const plat = std(0x10121e, 1);
  box(scene, -3, 1, -4, 3, 2, 3, plat, false);
  box(scene, 3.4, 2.4, -12, 3.4, 2.4, 3.4, plat, false);
  box(scene, -3.2, 4.4, -20, 3.2, 2.2, 3.2, plat, false);
  const ring = new THREE.Mesh(new THREE.TorusGeometry(5.2, 0.09, 8, 72), glow(0x39f0ff, 6));
  ring.position.set(0, 2.4, -10); ring.lookAt(0, 2.4, 4); scene.add(ring);
  const ring2 = new THREE.Mesh(new THREE.TorusGeometry(3.3, 0.08, 8, 64), glow(0x39f0ff, 3));
  ring2.position.set(0, 2.4, -10); ring2.lookAt(0, 2.4, 4); scene.add(ring2);
  const pl = new THREE.PointLight(0x39f0ff, 900, 22); pl.position.set(0, 2.4, -10); scene.add(pl);
  const k = keeper(0.85); k.position.set(0, 2.1, -4.2); scene.add(k);
  return { scene, target: [0, 2.8, -10], radius: 7.5, height: 0.6, angle0: 0 };
}

function s07_boneTower() {
  const scene = new THREE.Scene();
  const { env, background } = makeEnv('#ff9a5c', '#241a2e');
  scene.background = background; scene.environment = env;
  scene.fog = new THREE.Fog(0x241a2e, 20, 70);
  const ground = new THREE.Mesh(new THREE.PlaneGeometry(60, 60), std(0x3a2f26, 0.95));
  ground.rotation.x = -Math.PI / 2; ground.receiveShadow = true; scene.add(ground);
  lowSun(scene, 0xffb347, [22, 12, 8]);
  const boneMat = std(0xe8e0d0, 0.5);
  for (let i = 0; i < 7; i++) {
    const rib = new THREE.Mesh(new THREE.TorusGeometry(2.4 - i * 0.18, 0.3, 10, 32, Math.PI), boneMat);
    rib.position.set(0, 0.7 + i * 1.9, 0); rib.castShadow = true; scene.add(rib);
  }
  const skull = new THREE.Mesh(new THREE.SphereGeometry(0.7, 20, 14), glow(0xffd166, 3.4));
  skull.position.set(0, 14.2, 0); scene.add(skull);
  box(scene, -5, 1, 0, 3, 2, 3, std(0x3a2f26, 0.95));
  box(scene, 5, 3, 0, 3, 2, 3, std(0x3a2f26, 0.95));
  const bridge = new THREE.Mesh(new THREE.CapsuleGeometry(0.18, 1.6, 6, 12), boneMat);
  bridge.rotation.z = Math.PI / 2; bridge.position.set(0, 2.9, 0); bridge.castShadow = true; scene.add(bridge);
  const k = new THREE.Group();
  const torso = new THREE.Mesh(new THREE.CapsuleGeometry(0.22, 0.5, 6, 12), boneMat);
  torso.position.y = 1.05; k.add(torso);
  const kskull = new THREE.Mesh(new THREE.SphereGeometry(0.2, 18, 12), boneMat); kskull.position.y = 1.5; k.add(kskull);
  const leg = new THREE.Mesh(new THREE.CapsuleGeometry(0.09, 0.5, 6, 10), boneMat); leg.position.set(0.12, 0.45, 0); k.add(leg);
  const arm = new THREE.Mesh(new THREE.CapsuleGeometry(0.07, 0.6, 6, 10), boneMat); arm.position.set(0.3, 1.15, 0); arm.rotation.z = -1.1; k.add(arm);
  k.position.set(-4.6, 2.05, 0); scene.add(k);
  return { scene, target: [0, 5, 0], radius: 13.5, height: 3.4, angle0: 0.5 };
}

function s08_compassRot() {
  const scene = new THREE.Scene();
  const { env, background } = makeEnv('#0d1226', '#04060f');
  scene.background = background; scene.environment = env;
  // wheel room: partial cylinder with a 80° opening toward the camera (+x) — diorama cutaway
  const wall = new THREE.Mesh(new THREE.CylinderGeometry(11, 11, 16, 64, 1, true, Math.PI / 2 + 0.7, Math.PI * 2 - 1.4),
    std(0x4a5170, 0.35, 0.55));
  wall.position.y = 8; scene.add(wall);
  const floorRing = new THREE.Mesh(new THREE.CylinderGeometry(10.8, 10.8, 0.5, 48, 1, true), std(0x3a3f5c, 0.3, 0.6));
  floorRing.position.y = 0.25; scene.add(floorRing);
  const rim = new THREE.Mesh(new THREE.TorusGeometry(10.9, 0.12, 8, 72), glow(0xffd166, 2.6));
  rim.position.y = 8; rim.rotation.x = Math.PI / 2; scene.add(rim);
  const rim2 = new THREE.Mesh(new THREE.TorusGeometry(4.4, 0.1, 8, 56), glow(0x2ec4b6, 2.0));
  rim2.position.y = 2; rim2.rotation.x = Math.PI / 2; scene.add(rim2);
  const exit = new THREE.Mesh(new THREE.CircleGeometry(1.7, 32), glow(0xd8fbff, 4));
  exit.position.set(0, 16, 0); exit.rotation.x = Math.PI / 2; scene.add(exit);
  const k = keeper(0.8);
  k.position.set(0, 8, 10.15); k.rotation.z = -Math.PI / 2; scene.add(k);
  const pin = new THREE.Mesh(new THREE.ConeGeometry(0.3, 1.2, 16), glow(0xff4444, 3));
  pin.position.set(0, 11, 9.4); pin.rotation.z = Math.PI / 2; scene.add(pin);
  const pRing = new THREE.Mesh(new THREE.TorusGeometry(0.85, 0.06, 8, 40), glow(0xffd166, 2));
  pRing.position.set(0, 11, 9.4); scene.add(pRing);
  dashed(scene, [[0, 8, 10.1], [0, 5, 9], [0, 2, 7.5]], 0xff4444);
  const key = new THREE.DirectionalLight(0xffffff, 1.8); key.position.set(0, 15, 6); scene.add(key);
  scene.add(new THREE.HemisphereLight(0x3a3f5c, 0x0d0e18, 1.5));
  const fill = new THREE.PointLight(0x2ec4b6, 700, 20); fill.position.set(0, 8, 0); scene.add(fill);
  return { scene, target: [0, 8, 0], radius: 14.5, height: 0, angle0: 0 };
}

function s09_jenga() {
  const scene = new THREE.Scene();
  const { env, background } = makeEnv('#ffb37a', '#2a1c33');
  scene.background = background; scene.environment = env;
  scene.fog = new THREE.Fog(0x2a1c33, 26, 95);
  const ground = new THREE.Mesh(new THREE.PlaneGeometry(90, 90), std(0x241d2e, 0.95));
  ground.rotation.x = -Math.PI / 2; ground.receiveShadow = true; scene.add(ground);
  lowSun(scene, 0xffb347, [26, 20, 12]);
  const brickMat = std(0xc9a26b, 0.8);
  const tower = new THREE.Group();
  for (let l = 0; l < 12; l++) {
    for (let i = 0; i < 3; i++) {
      const b = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.5, 0.9), brickMat);
      b.castShadow = true;
      if (l % 2 === 0) b.position.set(-0.9 + i * 0.92, 0.25 + l * 0.5, 0);
      else { b.position.set(0, 0.25 + l * 0.5, -0.9 + i * 0.92); b.rotation.y = Math.PI / 2; }
      tower.add(b);
    }
  }
  tower.rotation.z = 0.24;
  scene.add(tower);
  const pull = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.5, 0.9), std(0xffd166, 0.5, 0.2));
  pull.position.set(-4.2, 2.6, 0); pull.rotation.z = -0.3; pull.castShadow = true; scene.add(pull);
  const beam = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 3.6, 8), glow(0xffd166, 2));
  beam.position.set(-3, 2.2, 0); beam.rotation.z = 1.25; scene.add(beam);
  for (let i = 0; i < 6; i++) {
    const f = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.5, 0.9), brickMat);
    f.position.set(2 + i * 0.5, 0.25, 2.6 + (i % 3) * 0.4);
    f.rotation.set(0.3 * i, i * 0.8, 0.2 * i);
    f.castShadow = true; scene.add(f);
  }
  const dust = [];
  for (let i = 0; i < 60; i++) dust.push([-2 + Math.random() * 9, 0.2 + Math.random() * 3, -1 + Math.random() * 9]);
  points(scene, dust, 0xc9a26b, 0.07, 0.8);
  const k = keeper(0.8); k.position.set(-2.6, 1.7, 1.2); scene.add(k);
  return { scene, target: [0, 4.2, 0], radius: 14.5, height: 2.4, angle0: 0.7 };
}

function s10_weathervane() {
  const scene = new THREE.Scene();
  const { env, background } = makeEnv('#8fd3ff', '#1a2a4a');
  scene.background = background; scene.environment = env;
  scene.fog = new THREE.Fog(0x9fc8e8, 32, 95);
  const ice = new THREE.Mesh(new THREE.PlaneGeometry(130, 130), std(0xbfe8f2, 0.02, 0.95));
  ice.rotation.x = -Math.PI / 2; scene.add(ice);
  const rim = new THREE.Mesh(new THREE.TorusGeometry(9, 1.4, 12, 48), std(0xf2c57c, 0.9));
  rim.position.set(0, 0.4, 0); rim.rotation.x = Math.PI / 2; rim.receiveShadow = true; scene.add(rim);
  const towerMat = std(0x8c6a3f, 0.6);
  for (let i = 0; i < 5; i++) box(scene, 0, 0.75 + i * 1.1, 0, 3.4 - i * 0.45, 1.1, 3.4 - i * 0.45, towerMat);
  const top = new THREE.Mesh(new THREE.CylinderGeometry(0.4, 0.9, 1.6, 16), std(0xf2c57c, 0.5));
  top.position.set(0, 6.6, 0); scene.add(top);
  const lantern = new THREE.Mesh(new THREE.SphereGeometry(0.5, 20, 14), glow(0xffd166, 4));
  lantern.position.set(0, 7.5, 0); scene.add(lantern);
  const crack = new THREE.Mesh(new THREE.RingGeometry(4.5, 4.62, 40), glow(0xdff6ff, 1.2));
  crack.rotation.x = -Math.PI / 2; crack.position.set(4, 0.03, -6); scene.add(crack);
  const crack2 = new THREE.Mesh(new THREE.RingGeometry(2.8, 2.9, 40), glow(0xdff6ff, 1.2));
  crack2.rotation.x = -Math.PI / 2; crack2.position.set(-7, 0.03, -2); scene.add(crack2);
  const k = keeper(0.8); k.position.set(6.5, 0.1, -3); k.rotation.y = -0.6; scene.add(k);
  const trail = [];
  for (let i = 0; i < 40; i++) trail.push([8.6 - i * 0.28, 0.12, -2.2 - i * 0.1 + Math.sin(i) * 0.3]);
  points(scene, trail, 0xd8fbff, 0.09, 0.9);
  lowSun(scene, 0xffe9c9, [-22, 18, -14]);
  scene.add(new THREE.HemisphereLight(0x9fc8e8, 0x1a2a4a, 0.9));
  return { scene, target: [1.5, 4, -2], radius: 15, height: 3.2, angle0: 0.55 };
}

function s11_inkline() {
  const scene = new THREE.Scene();
  const { env, background } = makeEnv('#d8c8b8', '#6b5a48');
  scene.background = background; scene.environment = env;
  scene.fog = new THREE.Fog(0x9c8a74, 24, 85);
  const cliff = new THREE.Mesh(new THREE.PlaneGeometry(32, 62), std(0xefe6d8, 0.95));
  cliff.position.set(0, 18, -14); scene.add(cliff);
  box(scene, 0, -2.5, -14, 34, 2, 2, std(0x6b5a48, 0.9), false);
  function blob(x, y, color, n, r) {
    const g = new THREE.Group();
    for (let i = 0; i < n; i++) {
      const s = new THREE.Mesh(new THREE.SphereGeometry(r * (0.7 + Math.random() * 0.5), 18, 12), std(color, 0.12, 0.4));
      s.position.set((Math.random() - 0.5) * 1.4, (Math.random() - 0.5) * 0.8, (Math.random() - 0.5) * 0.7);
      g.add(s);
    }
    g.position.set(x, y, 0); scene.add(g); return g;
  }
  blob(0, 5, 0xff3b3b, 7, 0.5);
  blob(2.6, 2.2, 0x3b6bff, 6, 0.45);
  const inkTrail = new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3([
    new THREE.Vector3(0, 0.4, -1), new THREE.Vector3(1.2, 2.6, 0), new THREE.Vector3(1.8, 4.4, 0.2),
  ]), 30, 0.12, 8), std(0x2ecc6a, 0.1, 0.5));
  scene.add(inkTrail);
  const k = keeper(0.8); k.position.set(-1.6, 3.4, 0.6); k.rotation.z = 0.5; scene.add(k);
  lowSun(scene, 0xfff0dd, [16, 24, 8]);
  scene.add(new THREE.HemisphereLight(0xd8c8b8, 0x3a2f26, 1.0));
  return { scene, target: [0.6, 4, 4], radius: 9, height: 1.6, angle0: 0.2 };
}

function s12_orbitfall() {
  const scene = new THREE.Scene();
  const { env, background } = makeEnv('#0a0e2a', '#00030d');
  scene.background = background; scene.environment = env;
  const pgeo = new THREE.IcosahedronGeometry(2.6, 4);
  const pos = pgeo.attributes.position;
  for (let i = 0; i < pos.count; i++) {
    const v = new THREE.Vector3().fromBufferAttribute(pos, i).normalize();
    const n = 1 + Math.sin(v.x * 7) * Math.sin(v.y * 7) * Math.sin(v.z * 7) * 0.07;
    pos.setXYZ(i, v.x * n * 2.6, v.y * n * 2.6, v.z * n * 2.6);
  }
  pgeo.computeVertexNormals();
  const planet = new THREE.Mesh(pgeo, std(0x4a6b8a, 0.8));
  scene.add(planet);
  const ringCols = [0xffd166, 0x2ec4b6, 0xb26bff];
  for (let r = 0; r < 3; r++) {
    const pts = [];
    const R = 5 + r * 2.2;
    for (let i = 0; i < 260; i++) {
      const a = (i / 260) * Math.PI * 2;
      pts.push([Math.cos(a) * (R + (Math.random() - 0.5) * 0.5), (Math.random() - 0.5) * 0.25, Math.sin(a) * (R + (Math.random() - 0.5) * 0.5)]);
    }
    points(scene, pts, ringCols[r], 0.06, 0.85);
  }
  const k = keeper(0.55); k.position.set(6.0, 0.12, 3.2); scene.add(k);
  const trail = [];
  for (let i = 0; i < 30; i++) { const a = Math.atan2(3.2, 6.0) - i * 0.06; trail.push([Math.cos(a) * 6.9, 0.1, Math.sin(a) * 6.9]); }
  points(scene, trail, 0xffd166, 0.05, 0.7);
  const orbitPts = [];
  for (let i = 0; i <= 60; i++) { const a = (i / 60) * Math.PI * 2; orbitPts.push([Math.cos(a) * 6.9, 0, Math.sin(a) * 6.9]); }
  dashed(scene, orbitPts, 0xffd166);
  const gate = new THREE.Mesh(new THREE.TorusGeometry(1.1, 0.12, 8, 40), glow(0xd8fbff, 4));
  gate.position.set(9.3, 0, 0); gate.lookAt(0, 0, 0); scene.add(gate);
  const stars = [];
  for (let i = 0; i < 700; i++) {
    const a = Math.random() * Math.PI * 2, el = Math.random() * Math.PI;
    stars.push([Math.cos(a) * Math.sin(el) * 90, Math.cos(el) * 90, Math.sin(a) * Math.sin(el) * 90]);
  }
  points(scene, stars, 0xffffff, 0.06, 0.9);
  const sun = new THREE.DirectionalLight(0xffe9c9, 3); sun.position.set(30, 8, 10); scene.add(sun);
  scene.add(new THREE.HemisphereLight(0x1a2440, 0x00030d, 0.5));
  return { scene, target: [0, 0, 0], radius: 13, height: 2.2, angle0: -0.4 };
}

// ---------- boot ----------
const META = [
  { en: 'SHADOWSTEP', zh: '影跃', thesis: '影子是唯一的地面——转动手里的灯，整个世界的地形重写一遍。光斑是深渊，阴影是路。', verbs: 'MOVE/JUMP · ROTATE LIGHT · WICK ECONOMY · RT: SHADOW = COLLISION' },
  { en: 'ECHO FORGE', zh: '回声铸台', thesis: '你的过去是实体的——把 2 秒前的跳跃铸成真实平台，站上自己的过去过谷。', verbs: 'MOVE/JUMP · E = FORGE ECHO · 3 ECHOES · DETERMINISTIC REPLAY' },
  { en: 'FERRO', zh: '铁磁滴', thesis: '你不是在走路，你是被磁力弯曲的液态金属——钉下磁极，沿自己画的场线拉丝荡过虚空。', verbs: 'PLACE N/S POLES · SURF FIELD LINES · SPLIT/MERGE · LIQUID-METAL MIRROR' },
  { en: 'KALEIDO', zh: '万花镜', thesis: '你同时是 6 个人——6 面镜子的你共享一命；站定 1 秒，六瓣平台合拢，世界才为你显形。', verbs: 'SYNCED MIRROR SELVES · ALIGNMENT LOCK · 1 LIFE × 6 · RT: TRUE MIRRORS' },
  { en: 'PHASEWALK', zh: '四相行者', thesis: '世界有 4 层重叠——固/液/气/等离子同时半透明地叠在眼前，空中换相就是换关卡。', verbs: '4 PHASES · MID-AIR SWITCH · MOMENTUM CARRIES · 4 GHOST LAYERS VISIBLE' },
  { en: 'SONAR', zh: '声呐', thesis: '世界是纯黑的，你是盲的——每一次 ping 把洞穴照亮 2 秒，然后在黑暗中凭记忆跳跃。', verbs: 'PING HI/LO FREQ · 98% BLACK · MEMORY NAVIGATION · TSL WAVE FRONT' },
  { en: 'BONE TOWER', zh: '骨塔', thesis: '你的身体就是关卡建材——拆下腿骨搭桥、卸下肋骨当梯；你爬的每一米都是用自己换的。', verbs: 'DETACH BONES · THROW/BRIDGE · ABILITY = BODY PART · 6 BONES' },
  { en: 'COMPASS ROT', zh: '罗盘坠', thesis: '重力不再向下——它指向你罗盘的方向。转罗盘，墙变地板；跳跃变成甩鞭。', verbs: 'ROTATE GRAVITY · WHIPLASH MOMENTUM · WALL = FLOOR · CAMERA ROLL' },
  { en: 'JENGA REACH', zh: '拆塔攀', thesis: '破坏即建造——抽掉一块砖，塔倾斜 15°，一整面墙变成你向上的斜坡。', verbs: 'PULL BLOCKS · PHYSICS DEBRIS · TOWER TILT · CLIMB THE WRECK' },
  { en: 'WEATHERVANE', zh: '四季水灵', thesis: '一座岛，四张地图——一键换季：夏天的湖是深渊，冬天整面湖 0.5 秒冻成镜子。', verbs: '4 SEASONS · WATER STATE MACHINE · ICE = MIRROR · RT SHOWCASE' },
  { en: 'INKLINE', zh: '墨线', thesis: '路不是找到的，是画出来的——在坠落的 1.2 秒里连画三笔，把自己接住。', verbs: 'PAINT SOLID/BOUNCE/SLICK · 100 INK · DRY 40s · AIRBORNE RESCUE' },
  { en: 'ORBITFALL', zh: '轨道坠', thesis: '你不是在跳，你是在变轨——吃掉陨石碎屑轨道收缩，甩掉质量轨道扩张。跳跃 = 开普勒。', verbs: 'KEPLERIAN JUMP · EAT/SPIT MASS · 3 RINGS · ORBIT = LEVEL' },
];

const q = new URLSearchParams(location.search);
const idx = Math.min(12, Math.max(1, parseInt(q.get('scene') || '1', 10))) - 1;
const meta = META[idx];
document.getElementById('booth-title').textContent = `BOOTH ${String(idx + 1).padStart(2, '0')} · ${meta.en} ${meta.zh}`;
document.getElementById('booth-thesis').textContent = meta.thesis;
document.getElementById('booth-verbs').textContent = meta.verbs;

const BUILDERS = [s01_shadowstep, s02_echoForge, s03_ferro, s04_kaleido, s05_phasewalk, s06_sonar,
  s07_boneTower, s08_compassRot, s09_jenga, s10_weathervane, s11_inkline, s12_orbitfall];
const { scene, target, radius, height, angle0 } = BUILDERS[idx]();

const camera = new THREE.PerspectiveCamera(55, W / H, 0.1, 400);
const start = performance.now();
function frame(now) {
  requestAnimationFrame(frame);
  const t = (now - start) / 1000;
  const a = angle0;
  camera.position.set(
    target[0] + Math.cos(a) * radius,
    target[1] + height + Math.sin(t * 0.5) * 0.25,
    target[2] + Math.sin(a) * radius,
  );
  camera.lookAt(target[0], target[1], target[2]);
  renderer.render(scene, camera);
}
requestAnimationFrame(frame);
