import * as THREE from 'three';
import type { EventBus } from '../core/events';
import type { Input } from '../core/input';
import type { RunState, TargetState, WeaponStats } from '../core/types';
import { findWeapon, damageTarget, effectiveDamage } from '../game/arsenal';
import { destroyTarget } from '../game/run';
import { ProjectilePool } from './projectiles';
import { ChaseCam } from './camera';
import { ParticleFx } from '../render/fx';
import { buildForKind, buildShip } from '../render/procedural';

interface Actor {
  target: TargetState;
  obj: THREE.Object3D;
  radius: number;
  cooldown: number;
  orbitAngle: number;
  orbitRadius: number;
  orbitSpeed: number;
  removed: boolean;
}

interface Nuke {
  obj: THREE.Object3D;
  pos: THREE.Vector3;
  vel: THREE.Vector3;
}

export interface CombatHud {
  setHull(hull: number, max: number): void;
  setTimer(t: number, max: number): void;
  setWeapons(weapons: WeaponStats[], active: number): void;
  setTargets(targets: { name: string; hp: number; maxHp: number; kind: string }[]): void;
  addLog(text: string): void;
  onEnd(result: { victory: boolean; hullLoss: number; destroyedIds: string[] }): void;
}

export class CombatScene {
  readonly group = new THREE.Group();
  private player: THREE.Object3D;
  private playerPos = new THREE.Vector3(0, 0, 8);
  private playerVel = new THREE.Vector3();
  private yaw = 0;
  private pitch = -0.05;
  private actors: Actor[] = [];
  private nukes: Nuke[] = [];
  private pool = new ProjectilePool();
  private cam: ChaseCam;
  private weaponCooldowns: number[] = [];
  private weapons: WeaponStats[];
  private activeWeapon = 0;
  private shieldUsed = false;
  private timeLeft: number;
  private timeMax: number;
  private nukeSpawnTimer = 6;
  private nukesToSpawn: number;
  private ended = false;
  private destroyedIds: string[] = [];
  private hullLoss = 0;
  private bounds = 160;

  constructor(
    private run: RunState,
    private bus: EventBus,
    private fx: ParticleFx,
    camera: THREE.PerspectiveCamera,
    private hud: CombatHud,
    private input: Input,
  ) {
    this.timeMax = Math.max(40, 70 - run.day * 2 + (run.combatTimeBonus ?? 0));
    this.timeLeft = this.timeMax;
    this.weapons = run.ship.weaponIds.map(findWeapon);
    this.weaponCooldowns = this.weapons.map(() => 0);
    this.nukesToSpawn = run.nukesIncoming;
    this.cam = new ChaseCam(camera);

    this.player = buildShip();
    this.player.position.copy(this.playerPos);
    this.group.add(this.player);

    this.placeTargets();
    this.spawnInitialNukes();
  }

  private placeTargets(): void {
    const targets = this.run.targets.filter((t) => !t.destroyed);
    const primaries = targets.filter((t) => t.isPrimary);
    const dayDefs = targets.filter((t) => !t.isPrimary);
    const primPos = new Map<string, THREE.Vector3>();
    primaries.forEach((t, i) => {
      const pos = new THREE.Vector3(-90 + i * 90, 6 - i * 8, -150 - i * 20);
      primPos.set(t.id, pos);
      const obj = buildForKind(t.kind);
      obj.position.copy(pos);
      if (t.kind === 'station') obj.rotation.x = Math.PI / 2;
      this.actors.push({ target: t, obj, radius: t.kind === 'station' ? 14 : 10, cooldown: 2, orbitAngle: 0, orbitRadius: 0, orbitSpeed: 0, removed: false });
      this.group.add(obj);
    });
    dayDefs.forEach((t, i) => {
      const prim = primaries[i % Math.max(1, primaries.length)];
      const base = prim ? (primPos.get(prim.id) ?? new THREE.Vector3()) : new THREE.Vector3();
      let pos: THREE.Vector3;
      let radius = 2.4;
      if (t.kind === 'obstacle') {
        const angle = (i / Math.max(1, dayDefs.length)) * Math.PI * 2;
        pos = new THREE.Vector3(Math.cos(angle) * 190, Math.sin(angle) * 190 * 0.6, -140);
        radius = 6;
      } else {
        pos = base.clone().add(new THREE.Vector3(((i % 3) - 1) * 24, (i % 5) * 6 - 12, 16 + (i % 4) * 16));
      }
      const obj = buildForKind(t.kind, 3 + (i % 3));
      obj.position.copy(pos);
      this.actors.push({
        target: t,
        obj,
        radius,
        cooldown: 2 + (i % 3),
        orbitAngle: (i * 1.7) % (Math.PI * 2),
        orbitRadius: 26 + (i % 3) * 9,
        orbitSpeed: 0.3 + (i % 5) * 0.08,
        removed: false,
      });
      this.group.add(obj);
    });
  }

  private spawnInitialNukes(): void {
    const count = Math.min(2, this.nukesToSpawn);
    for (let i = 0; i < count; i++) {
      this.nukesToSpawn--;
      this.spawnNuke();
    }
  }

  private spawnNuke(): void {
    const obj = buildForKind('missile');
    const start = new THREE.Vector3((Math.random() - 0.5) * 220, (Math.random() - 0.5) * 120, 230);
    obj.position.copy(start);
    this.nukes.push({ obj, pos: start.clone(), vel: new THREE.Vector3(0, 0, -16) });
    this.group.add(obj);
    this.hud.addLog('INCOMING: nuclear missile detected.');
  }

  fixedUpdate(dt: number): void {
    if (this.ended) return;
    this.timeLeft -= dt;

    this.handlePlayerInput(dt);
    this.updateWeapons(dt);
    this.updateActors(dt);
    this.updateNukes(dt);
    this.pool.update(dt);
    this.resolveCollisions();
    this.cam.update(dt, this.playerPos, this.forward());

    this.hud.setHull(this.run.ship.hull, this.run.ship.maxHull);
    this.hud.setTimer(Math.max(0, this.timeLeft), this.timeMax);
    this.hud.setTargets(this.hudTargets());

    const remaining = this.run.targets.filter((t) => !t.destroyed);
    if (remaining.length === 0) {
      this.end(true);
      return;
    }
    if (this.run.ship.hull <= 0) {
      this.end(false);
      return;
    }
    if (this.timeLeft <= 0) {
      this.hullLoss = Math.min(24, remaining.filter((t) => !t.isPrimary).length * 3 + remaining.length);
      this.run.ship.hull = Math.max(0, this.run.ship.hull - this.hullLoss);
      this.bus.emit('hull:changed', { hull: this.run.ship.hull, maxHull: this.run.ship.maxHull });
      this.end(false);
    }
  }

  private handlePlayerInput(dt: number): void {
    const md = this.input.consumeMouseDelta();
    const sens = 0.0022;
    this.yaw -= md.x * sens;
    this.pitch = THREE.MathUtils.clamp(this.pitch - md.y * sens, -1.2, 1.2);
    const boost = this.input.isDown('ShiftLeft') || this.input.isDown('ShiftRight') ? 2.2 : 1;
    const accel = 46 * boost;
    const fwd = this.forward();
    const right = new THREE.Vector3().crossVectors(fwd, new THREE.Vector3(0, 1, 0)).normalize();
    const up = new THREE.Vector3().crossVectors(right, fwd).normalize();
    const thrust = new THREE.Vector3();
    if (this.input.isDown('KeyW')) thrust.add(fwd);
    if (this.input.isDown('KeyS')) thrust.sub(fwd);
    if (this.input.isDown('KeyA')) thrust.sub(right);
    if (this.input.isDown('KeyD')) thrust.add(right);
    if (this.input.isDown('Space')) thrust.add(up);
    if (this.input.isDown('KeyC')) thrust.sub(up);
    if (thrust.lengthSq() > 0) thrust.normalize();
    this.playerVel.addScaledVector(thrust, accel * dt);
    this.playerVel.multiplyScalar(Math.pow(0.25, dt));
    const maxSpeed = 30 * boost;
    if (this.playerVel.length() > maxSpeed) this.playerVel.setLength(maxSpeed);
    this.playerPos.addScaledVector(this.playerVel, dt);
    this.playerPos.x = THREE.MathUtils.clamp(this.playerPos.x, -this.bounds, this.bounds);
    this.playerPos.y = THREE.MathUtils.clamp(this.playerPos.y, -40, 80);
    this.playerPos.z = THREE.MathUtils.clamp(this.playerPos.z, -this.bounds, this.bounds);
    this.player.position.copy(this.playerPos);
    this.player.quaternion.setFromEuler(new THREE.Euler(this.pitch, this.yaw, 0, 'YXZ'));
  }

  private forward(): THREE.Vector3 {
    return new THREE.Vector3(0, 0, -1).applyEuler(new THREE.Euler(this.pitch, this.yaw, 0, 'YXZ'));
  }

  private updateWeapons(dt: number): void {
    if (this.input.isDown('Digit1')) this.activeWeapon = 0;
    if (this.input.isDown('Digit2')) this.activeWeapon = Math.min(1, this.weapons.length - 1);
    if (this.input.isDown('Digit3')) this.activeWeapon = Math.min(2, this.weapons.length - 1);
    for (let i = 0; i < this.weaponCooldowns.length; i++) {
      this.weaponCooldowns[i] = Math.max(0, this.weaponCooldowns[i] - dt);
    }
    this.hud.setWeapons(this.weapons, this.activeWeapon);
    if (!this.input.mouseButtons.left) return;
    const w = this.weapons[this.activeWeapon];
    if (this.weaponCooldowns[this.activeWeapon] > 0) return;
    this.weaponCooldowns[this.activeWeapon] = 1 / w.fireRate;
    const fwd = this.forward();
    const origin = this.playerPos.clone().addScaledVector(fwd, 4);
    const dmg = effectiveDamage(w, {}, this.run);
    const speed = w.projectileSpeed + this.playerVel.length() * 0.4;
    const scatter = (1 - w.accuracy) * 0.12;
    const vel = fwd
      .clone()
      .add(new THREE.Vector3((Math.random() - 0.5) * scatter, (Math.random() - 0.5) * scatter, (Math.random() - 0.5) * scatter))
      .normalize()
      .multiplyScalar(speed);
    this.pool.spawn(origin, vel, 1, dmg, true, w, w.range / speed);
    this.bus.emit('audio:play', { id: w.type === 'kinetic' ? 'rail' : 'laser' });
    this.fx.emit(origin, new THREE.Color(0x66ccff), 4, 6, 0.3);
  }

  private updateActors(dt: number): void {
    for (const a of this.actors) {
      if (a.removed) continue;
      a.cooldown -= dt;
      if (a.target.kind === 'fighter') {
        a.orbitAngle += a.orbitSpeed * dt;
        a.obj.position.set(
          this.playerPos.x + Math.cos(a.orbitAngle) * a.orbitRadius,
          Math.max(-20, this.playerPos.y + Math.sin(a.orbitAngle * 1.3) * 8),
          this.playerPos.z - 30 + Math.sin(a.orbitAngle) * a.orbitRadius,
        );
        a.obj.lookAt(this.playerPos);
        if (a.cooldown <= 0 && a.obj.position.distanceTo(this.playerPos) < 90) {
          a.cooldown = 3;
          this.enemyFire(a.obj.position.clone(), 14);
        }
      } else if (a.target.kind === 'turret') {
        const dir = this.playerPos.clone().sub(a.obj.position).normalize();
        a.obj.rotation.y = Math.atan2(-dir.x, -dir.z);
        if (a.cooldown <= 0 && this.playerPos.distanceTo(a.obj.position) < 130) {
          a.cooldown = 2.4;
          this.enemyFire(a.obj.position.clone().add(new THREE.Vector3(0, 2.2, 0)), 10);
        }
      }
    }
  }

  private enemyFire(from: THREE.Vector3, speed: number): void {
    const dir = this.playerPos.clone().sub(from).normalize();
    this.pool.spawn(from, dir.multiplyScalar(speed), 0.9, 6, false, null, 4);
    this.bus.emit('audio:play', { id: 'enemy' });
  }

  private updateNukes(dt: number): void {
    this.nukeSpawnTimer -= dt;
    if (this.nukeSpawnTimer <= 0 && this.nukesToSpawn > 0) {
      this.nukeSpawnTimer = 9;
      this.nukesToSpawn--;
      this.spawnNuke();
    }
    for (const n of this.nukes) {
      const toPlayer = this.playerPos.clone().sub(n.pos);
      const dist = toPlayer.length();
      const dir = toPlayer.normalize();
      n.vel.lerp(dir.multiplyScalar(26), Math.min(2.2 * dt, 1));
      n.pos.addScaledVector(n.vel, dt);
      n.obj.position.copy(n.pos);
      n.obj.lookAt(this.playerPos);
      if (dist < 6) {
        this.group.remove(n.obj);
        this.nukeDetonate(n);
      }
    }
    this.nukes = this.nukes.filter((n) => n.obj.parent === this.group);
  }

  private nukeDetonate(n: Nuke): void {
    const dmg = 8 + Math.floor(Math.random() * 9);
    if (!this.shieldUsed && this.run.mutations.some((m) => m.id === 'quantum-shielding')) {
      this.shieldUsed = true;
      this.hud.addLog('Quantum shielding absorbed the blast.');
    } else {
      this.run.ship.hull = Math.max(0, this.run.ship.hull - dmg);
      this.bus.emit('hull:changed', { hull: this.run.ship.hull, maxHull: this.run.ship.maxHull });
      this.hud.addLog(`Nuclear detonation: -${dmg} hull.`);
    }
    this.explode(n.pos, 0xff8800, 26);
    this.cam.shake = 0.8;
  }

  private resolveCollisions(): void {
    const weapons = this.weapons;
    this.pool.forEach((p) => {
      if (!p.alive) return;
      if (p.friendly) {
        for (const a of this.actors) {
          if (a.removed || p.hitIds.has(a.target.id)) continue;
          const r = a.radius + p.radius;
          if (p.pos.distanceToSquared(a.obj.position) < r * r) {
            const weapon = p.weapon ?? weapons[this.activeWeapon];
            const res = damageTarget(a.target, weapon, this.run);
            this.explode(p.pos, 0x66ccff, 5);
            if (res.destroyed) {
              a.removed = true;
              this.group.remove(a.obj);
              this.destroyedIds.push(a.target.id);
              destroyTarget(this.run, a.target, this.bus);
              this.explode(a.obj.position.clone(), a.target.kind === 'obstacle' ? 0xbb9966 : 0xff5533, 18);
              this.cam.shake = 0.5;
              this.hud.addLog(`${a.target.name} destroyed.`);
              this.bus.emit('audio:play', { id: 'boom' });
            } else if (!p.pierce) {
              p.alive = false;
            } else {
              p.hitIds.add(a.target.id);
            }
            break;
          }
        }
      } else if (p.pos.distanceToSquared(this.playerPos) < 9) {
        p.alive = false;
        if (!this.shieldUsed && this.run.mutations.some((m) => m.id === 'quantum-shielding')) {
          this.shieldUsed = true;
          this.hud.addLog('Quantum shielding absorbed the hit.');
        } else {
          this.run.ship.hull = Math.max(0, this.run.ship.hull - p.damage);
          this.bus.emit('hull:changed', { hull: this.run.ship.hull, maxHull: this.run.ship.maxHull });
        }
        this.explode(p.pos, 0xff5533, 8);
        this.bus.emit('audio:play', { id: 'hit' });
      }
    });
  }

  private hudTargets(): { name: string; hp: number; maxHp: number; kind: string }[] {
    return this.run.targets
      .filter((t) => !t.destroyed)
      .map((t) => ({ name: t.name, hp: Math.max(0, Math.round(t.hp)), maxHp: t.maxHp, kind: t.kind }));
  }

  private explode(pos: THREE.Vector3, color: number, count: number): void {
    this.fx.emit(pos, new THREE.Color(color), count, 14, 0.8);
  }

  private end(victory: boolean): void {
    if (this.ended) return;
    this.ended = true;
    this.hud.onEnd({ victory, hullLoss: this.hullLoss, destroyedIds: this.destroyedIds });
  }

  dispose(): void {
    this.group.parent?.remove(this.group);
    this.actors = [];
    this.nukes = [];
  }
}
