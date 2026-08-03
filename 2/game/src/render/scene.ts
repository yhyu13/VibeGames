import * as THREE from "three";
import type { RunSim } from "../logic/sim";
import type { DefenseUnit, PrimaryTarget, Projectile } from "../core/types";
import { PLANET_RADIUS } from "../core/types";
import { createPlanet, createAtmosphere } from "./planet";
import { createShipMesh, createTurretMesh, createStationMesh, createProjectileMesh } from "./meshes";

interface DefenseView {
  sim: DefenseUnit;
  group: THREE.Group;
  kind: DefenseUnit["kind"];
}

interface TargetView {
  sim: PrimaryTarget;
  group: THREE.Group;
}

interface ProjectileView {
  sim: Projectile;
  mesh: THREE.Mesh;
}

export class GameScene {
  readonly group = new THREE.Group();
  private shipView: THREE.Group;
  private readonly shipObj: THREE.Object3D;
  private defenseViews = new Map<string, DefenseView>();
  private targetViews = new Map<string, TargetView>();
  private projectileViews: ProjectileView[] = [];
  private temp = new THREE.Vector3();

  constructor() {
    this.group.add(createPlanet(0x4080ff));
    this.group.add(createAtmosphere());
    this.shipView = createShipMesh();
    this.shipObj = new THREE.Object3D();
    this.group.add(this.shipObj);
    this.shipObj.add(this.shipView);
  }

  get shipObject(): THREE.Object3D {
    return this.shipObj;
  }

  sync(sim: RunSim, alpha: number): void {
    this.syncShip(sim, alpha);
    this.syncDefenses(sim);
    this.syncTargets(sim);
    this.syncProjectiles(sim, alpha);
  }

  private syncShip(sim: RunSim, _alpha: number): void {
    const cosP = Math.cos(sim.ship.pitch);
    this.shipObj.position.set(
      PLANET_RADIUS * 1.6 * cosP * Math.cos(sim.ship.yaw),
      PLANET_RADIUS * 1.6 * Math.sin(sim.ship.pitch),
      -PLANET_RADIUS * 1.6 * cosP * Math.sin(sim.ship.yaw)
    );
    const forward = new THREE.Vector3(cosP * Math.cos(sim.ship.yaw + Math.PI / 2), 0, -cosP * Math.sin(sim.ship.yaw + Math.PI / 2)).normalize();
    this.shipObj.up.copy(this.shipObj.position).normalize();
    this.shipObj.lookAt(this.shipObj.position.clone().add(forward));
    const scale = 1 + Math.sin(sim.combatTime * 4) * 0.02;
    this.shipView.scale.setScalar(scale);
  }

  private syncDefenses(sim: RunSim): void {
    const aliveIds = new Set(sim.defenses.map((d) => d.id));
    for (const [id, view] of this.defenseViews) {
      if (!aliveIds.has(id)) {
        this.group.remove(view.group);
        this.defenseViews.delete(id);
      }
    }
    for (const d of sim.defenses) {
      let view = this.defenseViews.get(d.id);
      if (!view) {
        const group = d.kind === "spaceStation" ? createStationMesh() : createTurretMesh();
        view = { sim: d, group, kind: d.kind };
        this.group.add(group);
        this.defenseViews.set(d.id, view);
      }
      view.group.position.set(d.position.x, d.position.y, d.position.z);
      view.group.lookAt(0, 0, 0);
      view.group.visible = d.hp > 0;
      if (d.disabled) {
        view.group.traverse((o) => {
          const m = o as THREE.Mesh;
          if (m.isMesh) m.material = this.disabledMat;
        });
      }
    }
  }

  private disabledMat = new THREE.MeshStandardMaterial({ color: 0x333333, roughness: 0.9 });

  private syncTargets(sim: RunSim): void {
    for (const t of sim.primaryTargets) {
      let view = this.targetViews.get(t.id);
      if (!view) {
        const group = createStationMesh();
        view = { sim: t, group };
        this.group.add(group);
        this.targetViews.set(t.id, view);
      }
      view.group.position.set(t.position.x, t.position.y, t.position.z);
      view.group.visible = t.hp > 0;
      const scale = 1 + (t.hp / t.maxHp) * 0.3;
      view.group.scale.setScalar(Math.max(0.2, scale));
    }
  }

  private syncProjectiles(sim: RunSim, _alpha: number): void {
    const live = new Map(sim.projectiles.map((p) => [p.id, p]));
    for (const pv of this.projectileViews) {
      if (!live.has(pv.sim.id)) {
        this.group.remove(pv.mesh);
      }
    }
    this.projectileViews = this.projectileViews.filter((pv) => live.has(pv.sim.id));
    for (const p of sim.projectiles) {
      let pv = this.projectileViews.find((x) => x.sim.id === p.id);
      if (!pv) {
        const mesh = createProjectileMesh(p.type);
        pv = { sim: p, mesh };
        this.projectileViews.push(pv);
        this.group.add(mesh);
      }
      pv.mesh.position.set(p.position.x, p.position.y, p.position.z);
    }
  }
}
