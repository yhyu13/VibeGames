import * as THREE from "three";

export class ParticleSystem {
  private readonly group = new THREE.Group();
  private readonly pool: THREE.Sprite[] = [];
  private readonly lifetimes: number[] = [];
  private readonly velocities: THREE.Vector3[] = [];

  constructor() {
    this.max = max;
  }

  get object3D(): THREE.Group {
    return this.group;
  }

  spawn(position: THREE.Vector3, color: number, count: number, speed: number, life: number): void {
    for (let i = 0; i < count; i++) {
      let sprite = this.pool[i];
      if (!sprite) {
        const mat = new THREE.SpriteMaterial({ color, transparent: true, opacity: 1 });
        sprite = new THREE.Sprite(mat);
        this.group.add(sprite);
        this.pool.push(sprite);
        this.lifetimes.push(0);
        this.velocities.push(new THREE.Vector3());
      }
      sprite.visible = true;
      sprite.position.copy(position);
      const dir = new THREE.Vector3(
        (Math.random() - 0.5) * 2,
        (Math.random() - 0.5) * 2,
        (Math.random() - 0.5) * 2
      ).normalize();
      this.velocities[i].copy(dir).multiplyScalar(speed * (0.3 + Math.random() * 0.7));
      this.lifetimes[i] = life;
      sprite.scale.setScalar(0.5 + Math.random());
    }
  }

  update(dt: number): void {
    for (let i = 0; i < this.pool.length; i++) {
      const sprite = this.pool[i];
      if (!sprite.visible) continue;
      this.lifetimes[i] -= dt;
      if (this.lifetimes[i] <= 0) {
        sprite.visible = false;
        continue;
      }
      sprite.position.addScaledVector(this.velocities[i], dt);
      const t = Math.min(1, this.lifetimes[i] / 1);
      (sprite.material as THREE.SpriteMaterial).opacity = Math.max(0, t);
      sprite.scale.multiplyScalar(1 + dt * 2);
    }
  }
}
