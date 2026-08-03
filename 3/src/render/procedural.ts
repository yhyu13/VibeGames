import * as THREE from 'three';
import type { TargetKind } from '../core/types';

const PALETTE: Record<string, THREE.Color> = {
  hull: new THREE.Color(0x2a3f5f),
  accent: new THREE.Color(0x33ffcc),
  enemy: new THREE.Color(0x994444),
  metal: new THREE.Color(0x8a8f9a),
  dark: new THREE.Color(0x14161c),
  glow: new THREE.Color(0x33ffcc),
  rock: new THREE.Color(0x5a5348),
  shield: new THREE.Color(0x55aaff),
};

function std(color: THREE.Color, opts: Partial<THREE.MeshStandardMaterialParameters> = {}): THREE.MeshStandardMaterial {
  return new THREE.MeshStandardMaterial({ color, roughness: 0.6, metalness: 0.4, ...opts });
}

export function buildShip(): THREE.Group {
  const g = new THREE.Group();
  const body = new THREE.Mesh(new THREE.ConeGeometry(1.2, 5, 6), std(PALETTE.hull, { metalness: 0.7, roughness: 0.35 }));
  body.rotation.x = Math.PI / 2;
  const wingL = new THREE.Mesh(new THREE.BoxGeometry(3.4, 0.18, 1.4), std(PALETTE.hull));
  wingL.position.set(-2.2, 0, 0.6);
  const wingR = wingL.clone();
  wingR.position.x = 2.2;
  const cockpit = new THREE.Mesh(new THREE.SphereGeometry(0.5, 12, 12), std(PALETTE.glow, { emissive: PALETTE.glow, emissiveIntensity: 1.6 }));
  cockpit.position.set(0, 0.55, -1.2);
  const engine = new THREE.Mesh(
    new THREE.CylinderGeometry(0.5, 0.7, 0.8, 10),
    std(PALETTE.glow, { emissive: PALETTE.glow, emissiveIntensity: 2.4, color: 0xffffff }),
  );
  engine.rotation.x = Math.PI / 2;
  engine.position.set(0, 0, 2.7);
  g.add(body, wingL, wingR, cockpit, engine);
  return g;
}

export function buildTurret(): THREE.Group {
  const g = new THREE.Group();
  const base = new THREE.Mesh(new THREE.CylinderGeometry(1.6, 2.2, 1.6, 8), std(PALETTE.dark));
  base.position.y = 0.8;
  const dome = new THREE.Mesh(new THREE.SphereGeometry(1.1, 12, 10), std(PALETTE.enemy, { metalness: 0.6, roughness: 0.3 }));
  dome.position.y = 2;
  const barrel = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.22, 3, 8), std(PALETTE.metal));
  barrel.rotation.x = Math.PI / 2;
  barrel.position.set(0, 2.2, 1.6);
  const core = new THREE.Mesh(new THREE.SphereGeometry(0.45, 8, 8), std(PALETTE.glow, { emissive: PALETTE.enemy, emissiveIntensity: 2 }));
  core.position.y = 2;
  g.add(base, dome, barrel, core);
  return g;
}

export function buildFighter(): THREE.Group {
  const g = new THREE.Group();
  const body = new THREE.Mesh(new THREE.ConeGeometry(0.55, 2.2, 5), std(PALETTE.enemy, { roughness: 0.4 }));
  body.rotation.x = Math.PI / 2;
  const wings = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.1, 0.8), std(PALETTE.dark));
  wings.position.set(0, 0, 0.3);
  g.add(body, wings);
  return g;
}

export function buildMissile(): THREE.Group {
  const g = new THREE.Group();
  const body = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.28, 2.4, 8), std(PALETTE.metal, { roughness: 0.3 }));
  body.rotation.x = Math.PI / 2;
  const nose = new THREE.Mesh(new THREE.ConeGeometry(0.28, 0.8, 8), std(PALETTE.enemy));
  nose.rotation.x = -Math.PI / 2;
  nose.position.z = -1.6;
  const flame = new THREE.Mesh(new THREE.ConeGeometry(0.2, 0.9, 8), std(new THREE.Color(0xff8800), { emissive: 0xff6600, emissiveIntensity: 3 }));
  flame.rotation.x = Math.PI / 2;
  flame.position.z = 1.6;
  g.add(body, nose, flame);
  return g;
}

export function buildObstacle(radius: number): THREE.Mesh {
  const mat = std(PALETTE.rock, { roughness: 0.95, metalness: 0.05 });
  return new THREE.Mesh(new THREE.DodecahedronGeometry(radius, 0), mat);
}

export function buildStation(): THREE.Group {
  const g = new THREE.Group();
  const hub = new THREE.Mesh(new THREE.CylinderGeometry(4, 4, 10, 10), std(PALETTE.metal, { roughness: 0.35 }));
  const ring = new THREE.Mesh(new THREE.TorusGeometry(11, 1.4, 8, 24), std(PALETTE.hull, { roughness: 0.4 }));
  ring.rotation.x = Math.PI / 2;
  const glow = new THREE.Mesh(new THREE.SphereGeometry(1.2, 10, 10), std(new THREE.Color(0xff4444), { emissive: 0xff2222, emissiveIntensity: 2 }));
  glow.position.set(0, 0, 5.5);
  g.add(hub, ring, glow);
  return g;
}

export function buildNexus(): THREE.Group {
  const g = new THREE.Group();
  const p = new THREE.Mesh(new THREE.ConeGeometry(5, 10, 4), std(PALETTE.dark, { roughness: 0.5 }));
  const core = new THREE.Mesh(new THREE.OctahedronGeometry(1.6, 0), std(new THREE.Color(0x66ff66), { emissive: 0x33ff33, emissiveIntensity: 2.5 }));
  core.position.y = 4;
  g.add(p, core);
  return g;
}

export function buildCapital(): THREE.Group {
  const g = new THREE.Group();
  const city = new THREE.Mesh(new THREE.CylinderGeometry(7, 9, 4, 12), std(PALETTE.hull, { roughness: 0.6 }));
  const shield = new THREE.Mesh(
    new THREE.SphereGeometry(12, 20, 16),
    new THREE.MeshStandardMaterial({
      color: PALETTE.shield,
      transparent: true,
      opacity: 0.18,
      roughness: 0.1,
      metalness: 0.6,
      emissive: PALETTE.shield,
      emissiveIntensity: 0.35,
      depthWrite: false,
    }),
  );
  g.add(city, shield);
  return g;
}

export function buildForKind(kind: TargetKind, radius = 1): THREE.Object3D {
  switch (kind) {
    case 'turret':
      return buildTurret();
    case 'fighter':
      return buildFighter();
    case 'missile':
      return buildMissile();
    case 'obstacle':
      return buildObstacle(radius);
    case 'station':
      return buildStation();
    case 'nexus':
      return buildNexus();
    case 'capital':
      return buildCapital();
  }
}
