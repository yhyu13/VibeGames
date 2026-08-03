import * as THREE from "three";

export function createShipMesh(): THREE.Group {
  const group = new THREE.Group();

  const hull = new THREE.Mesh(
    new THREE.ConeGeometry(0.7, 2.4, 6),
    new THREE.MeshStandardMaterial({ color: 0x333a44, metalness: 0.7, roughness: 0.35 })
  );
  hull.rotation.x = Math.PI / 2;
  group.add(hull);

  const cockpit = new THREE.Mesh(
    new THREE.SphereGeometry(0.35, 12, 12),
    new THREE.MeshStandardMaterial({ color: 0x33ff99, emissive: 0x22cc77, emissiveIntensity: 1.5, roughness: 0.2 })
  );
  cockpit.position.set(0, 0.25, 0.5);
  group.add(cockpit);

  const wingMat = new THREE.MeshStandardMaterial({ color: 0x2a2f38, metalness: 0.8, roughness: 0.4 });
  const wingL = new THREE.Mesh(new THREE.BoxGeometry(0.15, 2.4, 0.6), wingMat);
  wingL.position.set(-1.0, 0, 0.2);
  group.add(wingL);
  const wingR = new THREE.Mesh(new THREE.BoxGeometry(0.15, 2.4, 0.6), wingMat);
  wingR.position.set(1.0, 0, 0.2);
  group.add(wingR);

  const engineMat = new THREE.MeshStandardMaterial({ color: 0x223, emissive: 0x3399ff, emissiveIntensity: 2 });
  const engL = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.2, 0.5, 8), engineMat);
  engL.position.set(-0.6, 0, -1.0);
  group.add(engL);
  const engR = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.2, 0.5, 8), engineMat);
  engR.position.set(0.6, 0, -1.0);
  group.add(engR);

  return group;
}

export function createTurretMesh(): THREE.Group {
  const g = new THREE.Group();
  const base = new THREE.Mesh(
    new THREE.CylinderGeometry(0.6, 0.9, 1.2, 8),
    new THREE.MeshStandardMaterial({ color: 0x555b66, metalness: 0.6, roughness: 0.5 })
  );
  base.position.y = 0.6;
  g.add(base);
  const barrel = new THREE.Mesh(
    new THREE.CylinderGeometry(0.12, 0.12, 2, 8),
    new THREE.MeshStandardMaterial({ color: 0x77808c, metalness: 0.8, roughness: 0.3 })
  );
  barrel.rotation.x = Math.PI / 2;
  barrel.position.set(0, 1.4, 0.8);
  g.add(barrel);
  return g;
}

export function createStationMesh(): THREE.Group {
  const g = new THREE.Group();
  const core = new THREE.Mesh(
    new THREE.SphereGeometry(1.8, 24, 24),
    new THREE.MeshStandardMaterial({ color: 0x8a93a0, metalness: 0.9, roughness: 0.3, emissive: 0x224466, emissiveIntensity: 0.6 })
  );
  g.add(core);
  const ring = new THREE.Mesh(
    new THREE.TorusGeometry(3.2, 0.25, 12, 32),
    new THREE.MeshStandardMaterial({ color: 0x555e6a, metalness: 0.7, roughness: 0.5 })
  );
  ring.rotation.x = Math.PI / 2;
  g.add(ring);
  const antenna = new THREE.Mesh(
    new THREE.CylinderGeometry(0.08, 0.08, 3, 6),
    new THREE.MeshStandardMaterial({ color: 0x99a3b0, metalness: 0.8, roughness: 0.4 })
  );
  antenna.position.y = 3;
  g.add(antenna);
  return g;
}

export function createProjectileMesh(type: string): THREE.Mesh {
  const color = type === "energy" ? 0x33ffcc : type === "radiation" ? 0x88ff44 : type === "biological" ? 0xff44cc : 0xffcc44;
  const mat = new THREE.MeshBasicMaterial({ color });
  const mesh = new THREE.Mesh(new THREE.SphereGeometry(0.25, 8, 8), mat);
  return mesh;
}
