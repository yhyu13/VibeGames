import * as THREE from 'three';
import { SceneManager } from './SceneManager';
import { InputManager } from './InputManager';
import { AudioManager } from './AudioManager';
import { useGameStore } from '../store';
import {
  PlayerState, EnemyState, ProjectileState, Particle,
  EnemyType, AIState, ProjectileType, Vector3, InputState, FireMode
} from '../types';
import { getWeapon } from '../data/weapons';
import { getEnemyDef } from '../data/enemies';
import { getBoss } from '../data/bosses';
import { SKILLS, SPECIAL_ATTACKS } from '../data/skills';
import {
  FIXED_TIMESTEP, MAX_PLAYER_HP, MAX_SPECIAL_GAUGE, PLAYER_SPEED, PLAYER_SIZE,
  WORLD_SIZE, WAVE_INTERVAL, BOSS_WAVE_INTERVAL, MAX_ENEMIES, MAX_PROJECTILES,
  SHIELD_DURATION, INVULN_DURATION, BOOST_DURATION, BOOST_SPEED_MULT,
  SLOW_DURATION, SLOW_MULT, COMBO_TIMEOUT, CRUISE_SPEED
} from '../utils/constants';
import { vec3, vec3Add, vec3Sub, vec3Scale, vec3Length, vec3Dist, vec3Normalize, vec3Cross, lerp, clamp, randRange, randInt } from '../utils/math';
import { audioManager } from './AudioManager';

let nextId = 1;
function genId() { return nextId++; }

export class GameEngine {
  scene: SceneManager;
  input: InputManager;
  audio: AudioManager;
  canvas: HTMLCanvasElement;
  players: PlayerState[] = [];
  enemies: EnemyState[] = [];
  projectiles: ProjectileState[] = [];
  particles: Particle[] = [];
  active = false;
  splitScreen = false;
  private raycaster = new THREE.Raycaster();
  private groundPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0.5);
  private accumulator = 0;
  private lastTime = 0;
  private animFrameId = 0;
  private enemySpawnTimer = 0;
  private waveTimer = 0;
  private bossCount = 0;
  private currentBossIndex = -1;
  private bossPhase = 1;
  private bossAttackTimer = 0;
  private comboTimeout: number[] = [0, 0];
  private lockTargets: (number | null)[] = [null, null];

constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.scene = new SceneManager(canvas, canvas.width, canvas.height);
    this.input = new InputManager(0);
    this.input.setCanvasSize(canvas.width, canvas.height);
    this.audio = new AudioManager();
  }

  start(mode: 'pve' | 'pvp') {
    const store = useGameStore.getState();
    this.splitScreen = mode === 'pvp';
    this.players = store.players.map(p => ({ ...p }));
    this.enemies = [];
    this.projectiles = [];
    this.particles = [];
    this.bossCount = 0;
    this.currentBossIndex = -1;
    this.bossPhase = 1;
    this.bossAttackTimer = 0;
    this.enemySpawnTimer = 0;
    this.waveTimer = 0;
    this.active = true;
    this.lastTime = performance.now();
    this.accumulator = 0;
    nextId = 1;

    // Create player meshes
    this.players.forEach((p, i) => {
      const color = i === 0 ? new THREE.Color(0x4488ff) : new THREE.Color(0xff6644);
      const mesh = this.scene.createPlayerMesh(color);
      mesh.position.set(p.pos.x, p.pos.y, p.pos.z);
      this.scene.playerMeshes.set(p.id, mesh);
      this.scene.scene.add(mesh);
    });

    audioManager.init();
    audioManager.startBGM();

    this.gameLoop(performance.now());
  }

  stop() {
    this.active = false;
    cancelAnimationFrame(this.animFrameId);
    audioManager.stopBGM();
    this.scene.playerMeshes.forEach(m => this.scene.scene.remove(m));
    this.scene.enemyMeshes.forEach(m => this.scene.scene.remove(m));
    this.scene.bossMeshes.forEach(m => this.scene.scene.remove(m));
    this.scene.projectileMeshes.forEach(m => this.scene.scene.remove(m));
    this.scene.playerMeshes.clear();
    this.scene.enemyMeshes.clear();
    this.scene.bossMeshes.clear();
    this.scene.projectileMeshes.clear();
  }

resize(width: number, height: number) {
    this.scene.resize(width, height);
    this.input.setCanvasSize(width, height);
  }

  private gameLoop = (time: number) => {
    if (!this.active) return;
    this.animFrameId = requestAnimationFrame(this.gameLoop);

    const dt = Math.min((time - this.lastTime) / 1000, 0.05);
    this.lastTime = time;
    this.accumulator += dt;

    while (this.accumulator >= FIXED_TIMESTEP) {
      this.update(FIXED_TIMESTEP);
      this.accumulator -= FIXED_TIMESTEP;
    }

this.render(dt);
  };

  private update(dt: number) {
    const store = useGameStore.getState();
    const game = store.game;
    const inputs = [this.input.getState()];

    this.updatePlayers(dt, inputs);
    this.updateEnemies(dt);
    this.updateProjectiles(dt);
    this.updateParticles(dt);
    this.checkCollisions();
    this.spawnEnemies(dt);
    this.updateUI(dt);
    this.updateBoss(dt);
  }

private updatePlayers(dt: number, inputs: InputState[]) {
    this.players.forEach((p, i) => {
      if (!p.alive) return;
      const inp = inputs[i] || inputs[0];
      const mesh = this.scene.playerMeshes.get(p.id);
      if (!mesh) return;

      // World-space WASD movement + auto-forward
      const isBoosting = inp.boost;
      let moveDir = new THREE.Vector3(0, 0, 0);

      // Auto-forward in world -Z direction
      if (isBoosting) {
        // When boosting, only auto-forward (no strafe)
        moveDir.z = -1;
      } else {
        // WASD in world-space with auto-forward base
        moveDir.z = -1;
        if (inp.forward) moveDir.z -= 1;
        if (inp.backward) moveDir.z += 1;
        if (inp.right) moveDir.x += 1;
        if (inp.left) moveDir.x -= 1;
      }

      const speed = isBoosting ? p.speed * BOOST_SPEED_MULT : CRUISE_SPEED;
      moveDir.normalize();
      p.pos.x += moveDir.x * speed * dt;
      p.pos.z += moveDir.z * speed * dt;

      // Determine facing direction
      if (isBoosting) {
        // Face movement direction when boosting
        const targetAngle = Math.atan2(moveDir.x, moveDir.z);
        p.rot.y = lerp(p.rot.y, targetAngle, 0.15);
      } else {
        // Face camera direction when not boosting
        const cam = this.scene.camera;
        const dx = p.pos.x - cam.position.x;
        const dz = p.pos.z - cam.position.z;
        const targetAngle = Math.atan2(dx, dz);
        p.rot.y = lerp(p.rot.y, targetAngle, 0.1);
      }

      // Clamp to world
      p.pos.x = clamp(p.pos.x, -WORLD_SIZE, WORLD_SIZE);
      p.pos.z = clamp(p.pos.z, -WORLD_SIZE, WORLD_SIZE);

      // Update mesh position
      mesh.position.set(p.pos.x, p.pos.y, p.pos.z);
      mesh.rotation.y = p.rot.y;

      // Lock target
      const weapon = getWeapon(p.weapon);
      if (inp.lockTarget && weapon.lockRange > 0) {
        let nearest: EnemyState | null = null;
        let nearestDist = weapon.lockRange;
        for (const e of this.enemies) {
          if (e.hp <= 0) continue;
          const d = vec3Dist(p.pos, e.pos);
          if (d < nearestDist) {
            nearestDist = d;
            nearest = e;
          }
        }
        this.lockTargets[i] = nearest ? nearest.id : null;
      } else {
        this.lockTargets[i] = null;
      }

      // Shooting — disabled while boosting
      if (inp.shoot && !isBoosting) {
        this.playerShoot(p, i);
      }

      // Weapon switching
      if (inp.weaponSwitch > 0 && p.weapons.includes(inp.weaponSwitch)) {
        p.weapon = inp.weaponSwitch;
      }

      // Timers
      if (p.shieldTimer > 0) p.shieldTimer -= dt;
      if (p.invulnTimer > 0) p.invulnTimer -= dt;
      if (p.boostTimer > 0) p.boostTimer -= dt;
      if (p.slowTimer > 0) p.slowTimer -= dt;

      // Special gauge
      p.specialGauge = Math.min(p.specialGauge + dt * 2, p.maxSpecialGauge);

      // Special attack
      if (inp.special && p.specialGauge >= 100) {
        this.useSpecial(p, i);
        p.specialGauge = 0;
      }

      // Combo timeout
      if (p.combo > 0) {
        this.comboTimeout[i] -= dt;
        if (this.comboTimeout[i] <= 0) p.combo = 0;
      }
    });
  }

private playerShoot(player: PlayerState, playerIndex: number) {
    const weapon = getWeapon(player.weapon);
    const now = performance.now();
    const mesh = this.scene.playerMeshes.get(player.id);
    if (!mesh) return;

    // Lock check
    const lockTargetId = this.lockTargets[playerIndex];
    const lockEnemy = lockTargetId !== null
      ? this.enemies.find(e => e.id === lockTargetId && e.hp > 0)
      : null;

    if (weapon.fireMode === FireMode.LockRequired && !lockEnemy) {
      return;
    }

    // Determine fire direction: toward lock target if locked, else camera forward
    let fireDir: { x: number; y: number; z: number };
    if (lockEnemy) {
      fireDir = vec3Normalize(vec3Sub(lockEnemy.pos, player.pos));
    } else {
      const cam = this.scene.camera;
      const camDir = new THREE.Vector3(0, 0, -1);
      camDir.applyQuaternion(cam.quaternion);
      camDir.y = 0;
      camDir.normalize();
      fireDir = { x: camDir.x, y: camDir.y, z: camDir.z };
    }

    const isLockShortRange = weapon.fireMode === FireMode.LockShortRange && lockEnemy;

    for (let i = 0; i < (weapon.type === ProjectileType.Spread ? 5 : 1); i++) {
      const spread = weapon.spread * (Math.random() - 0.5) * 2;
      const pdir = vec3Normalize(vec3Add(
        fireDir,
        { x: spread, y: spread * 0.5, z: 0 }
      ));

      const proj: ProjectileState = {
        id: genId(),
        pos: { ...player.pos },
        vel: vec3Scale(pdir, weapon.speed),
        damage: weapon.damage,
        owner: player.id,
        type: weapon.type,
        lifetime: 3,
        radius: 0.3,
        color: weapon.color,
      };

      // LockShortRange bonus: projectiles home toward locked target
      if (isLockShortRange && lockEnemy) {
        proj.vel = vec3Scale(vec3Normalize(vec3Sub(lockEnemy.pos, player.pos)), weapon.speed);
      }

      if (this.projectiles.length < MAX_PROJECTILES) {
        this.projectiles.push(proj);
        const mesh3 = this.scene.createProjectileMesh(weapon.color, weapon.type);
        mesh3.position.set(proj.pos.x, proj.pos.y, proj.pos.z);
        this.scene.projectileMeshes.set(proj.id, mesh3);
        this.scene.scene.add(mesh3);
      }
    }

    audioManager.playShoot(600 + Math.random() * 400);
  }

  private useSpecial(player: PlayerState, playerIndex: number) {
    audioManager.playSpecial();

    // Full screen beam attack
    this.enemies.forEach(e => {
      if (vec3Dist(e.pos, player.pos) < 50) {
        e.hp -= 150;
        this.scene.createExplosion(e.pos, '#00ffff', 2);
      }
    });
  }

  private updateEnemies(dt: number) {
    this.enemies.forEach(e => {
      if (e.hp <= 0) {
        this.scene.createExplosion(e.pos, e.type === EnemyType.Boss ? '#ff4400' : '#ff6644', e.type === EnemyType.Boss ? 3 : 1);
        audioManager.playExplosion();
        // Score
        this.players.forEach(p => {
          const def = getEnemyDef(e.type);
          p.score += def.score;
          p.kills++;
          p.combo++;
          this.comboTimeout[p.id === 0 ? 0 : 1] = COMBO_TIMEOUT;
        });
        return;
      }

      const mesh = e.type === EnemyType.Boss
        ? this.scene.bossMeshes.get(e.id)
        : this.scene.enemyMeshes.get(e.id);
      if (!mesh) return;

// AI
      const target = this.players.find(p => p.alive);
      if (!target) return;
      const dist = vec3Dist(e.pos, target.pos);
      const def = getEnemyDef(e.type);

      // Per-type AI behavior
      switch (e.type) {
        case EnemyType.Scout:
          this.updateAIScout(e, target, dist, def, dt);
          break;
        case EnemyType.Assault:
          this.updateAIAssault(e, target, dist, def, dt);
          break;
        case EnemyType.Sniper:
          this.updateAISniper(e, target, dist, def, dt);
          break;
        case EnemyType.Shield:
          this.updateAIShield(e, target, dist, def, dt);
          break;
        case EnemyType.Bomber:
          this.updateAIBomber(e, target, dist, def, dt);
          break;
        case EnemyType.Commander:
          this.updateAICommander(e, target, dist, def, dt);
          break;
        default:
          this.updateAIDefault(e, target, dist, def, dt);
      }

      // Health check - flee at low HP (except bosses and bombers)
      if (e.hp < def.hp * 0.3 && e.type !== EnemyType.Boss && e.type !== EnemyType.Bomber) {
        if (e.state !== AIState.Flee) e.state = AIState.Flee;
      }

      // Update mesh
      mesh.position.set(e.pos.x, e.pos.y, e.pos.z);
      mesh.rotation.y += dt * 2;

      // Boss rotation
      if (e.type === EnemyType.Boss) {
        mesh.rotation.x += dt * 0.5;
      }
    });

    // Remove dead enemies
    this.enemies = this.enemies.filter(e => {
      if (e.hp <= 0) {
        const mesh = e.type === EnemyType.Boss
          ? this.scene.bossMeshes.get(e.id)
          : this.scene.enemyMeshes.get(e.id);
        if (mesh) {
          this.scene.scene.remove(mesh);
          this.scene.enemyMeshes.delete(e.id);
          this.scene.bossMeshes.delete(e.id);
        }
        return false;
      }
      return true;
    });
  }

private enemyShoot(enemy: EnemyState, target: PlayerState) {
    const dir = vec3Normalize(vec3Sub(target.pos, enemy.pos));
    const def = getEnemyDef(enemy.type);
    const proj: ProjectileState = {
      id: genId(),
      pos: { ...enemy.pos },
      vel: vec3Scale(dir, 25),
      damage: def.damage,
      owner: enemy.id + 10000,
      type: ProjectileType.BossBullet,
      lifetime: 4,
      radius: 0.3,
      color: def.color,
    };
    if (this.projectiles.length < MAX_PROJECTILES) {
      this.projectiles.push(proj);
      const mesh = this.scene.createProjectileMesh(def.color, 'bullet');
      mesh.position.set(proj.pos.x, proj.pos.y, proj.pos.z);
      this.scene.projectileMeshes.set(proj.id, mesh);
      this.scene.scene.add(mesh);
    }
  }

  private updateAIDefault(e: EnemyState, target: PlayerState, dist: number, def: any, dt: number) {
    switch (e.state) {
      case AIState.Patrol:
        if (dist < def.alertRange) e.state = AIState.Chase;
        break;
      case AIState.Chase:
        if (dist < def.attackRange) e.state = AIState.Attack;
        else if (dist > def.alertRange * 1.5) e.state = AIState.Patrol;
        else {
          const dir = vec3Normalize(vec3Sub(target.pos, e.pos));
          e.pos = vec3Add(e.pos, vec3Scale(dir, e.speed * dt));
        }
        break;
      case AIState.Attack:
        if (dist > def.attackRange * 1.2) e.state = AIState.Chase;
        e.attackTimer -= dt;
        if (e.attackTimer <= 0) {
          this.enemyShoot(e, target);
          e.attackTimer = 0.8 + Math.random() * 0.6;
        }
        break;
      case AIState.Flee:
        if (e.hp > def.hp * 0.3) e.state = AIState.Chase;
        const fleeDir = vec3Normalize(vec3Sub(e.pos, target.pos));
        e.pos = vec3Add(e.pos, vec3Scale(fleeDir, e.speed * 1.5 * dt));
        break;
    }
  }

  private updateAIScout(e: EnemyState, target: PlayerState, dist: number, def: any, dt: number) {
    switch (e.state) {
      case AIState.Patrol:
        if (dist < def.alertRange) e.state = AIState.Chase;
        break;
      case AIState.Chase:
        if (dist < def.attackRange) e.state = AIState.Attack;
        else if (dist > def.alertRange * 1.5) e.state = AIState.Patrol;
        else {
          const dir = vec3Normalize(vec3Sub(target.pos, e.pos));
          e.pos = vec3Add(e.pos, vec3Scale(dir, e.speed * dt));
        }
        break;
      case AIState.Attack:
        if (dist > def.attackRange * 1.3) e.state = AIState.Chase;
        // Strafe around target
        const orbitDir = vec3Normalize(vec3Sub(e.pos, target.pos));
        const strafe = { x: -orbitDir.z, y: 0, z: orbitDir.x };
        e.pos = vec3Add(e.pos, vec3Scale(strafe, e.speed * 0.8 * dt));
        e.attackTimer -= dt;
        if (e.attackTimer <= 0) {
          this.enemyShoot(e, target);
          e.attackTimer = 0.5 + Math.random() * 0.5;
        }
        break;
      case AIState.Flee:
        if (e.hp > def.hp * 0.3) e.state = AIState.Chase;
        const fleeDir = vec3Normalize(vec3Sub(e.pos, target.pos));
        e.pos = vec3Add(e.pos, vec3Scale(fleeDir, e.speed * 1.5 * dt));
        break;
    }
  }

  private updateAIAssault(e: EnemyState, target: PlayerState, dist: number, def: any, dt: number) {
    switch (e.state) {
      case AIState.Patrol:
        if (dist < def.alertRange) e.state = AIState.Chase;
        break;
      case AIState.Chase:
        // Rush aggressively toward target
        const dir = vec3Normalize(vec3Sub(target.pos, e.pos));
        e.pos = vec3Add(e.pos, vec3Scale(dir, e.speed * dt));
        if (dist < def.attackRange) e.state = AIState.Attack;
        break;
      case AIState.Attack:
        // Keep moving toward target while shooting
        const atkDir = vec3Normalize(vec3Sub(target.pos, e.pos));
        e.pos = vec3Add(e.pos, vec3Scale(atkDir, e.speed * 0.5 * dt));
        e.attackTimer -= dt;
        if (e.attackTimer <= 0) {
          this.enemyShoot(e, target);
          e.attackTimer = 0.3 + Math.random() * 0.3;
        }
        if (dist > def.attackRange * 1.5) e.state = AIState.Chase;
        break;
      case AIState.Flee:
        if (e.hp > def.hp * 0.3) e.state = AIState.Chase;
        const fleeDir = vec3Normalize(vec3Sub(e.pos, target.pos));
        e.pos = vec3Add(e.pos, vec3Scale(fleeDir, e.speed * 1.5 * dt));
        break;
    }
  }

  private updateAISniper(e: EnemyState, target: PlayerState, dist: number, def: any, dt: number) {
    switch (e.state) {
      case AIState.Patrol:
        if (dist < def.alertRange) e.state = AIState.Chase;
        break;
      case AIState.Chase:
        if (dist < def.attackRange) {
          e.state = AIState.Attack;
        } else {
          // Move toward target but keep distance
          const dir = vec3Normalize(vec3Sub(target.pos, e.pos));
          e.pos = vec3Add(e.pos, vec3Scale(dir, e.speed * dt));
        }
        break;
      case AIState.Attack:
        // Maintain distance - back away if too close
        if (dist < def.attackRange * 0.5) {
          const backDir = vec3Normalize(vec3Sub(e.pos, target.pos));
          e.pos = vec3Add(e.pos, vec3Scale(backDir, e.speed * dt));
        } else if (dist > def.attackRange * 1.2) {
          e.state = AIState.Chase;
        }
        e.attackTimer -= dt;
        if (e.attackTimer <= 0) {
          this.enemyShoot(e, target);
          e.attackTimer = 1.0 + Math.random() * 0.5;
        }
        break;
      case AIState.Flee:
        if (e.hp > def.hp * 0.3) e.state = AIState.Chase;
        const fleeDir = vec3Normalize(vec3Sub(e.pos, target.pos));
        e.pos = vec3Add(e.pos, vec3Scale(fleeDir, e.speed * 1.5 * dt));
        break;
    }
  }

  private updateAIShield(e: EnemyState, target: PlayerState, dist: number, def: any, dt: number) {
    switch (e.state) {
      case AIState.Patrol:
        if (dist < def.alertRange) e.state = AIState.Chase;
        break;
      case AIState.Chase:
        if (dist < def.attackRange) e.state = AIState.Attack;
        else if (dist > def.alertRange * 1.5) e.state = AIState.Patrol;
        else {
          const dir = vec3Normalize(vec3Sub(target.pos, e.pos));
          e.pos = vec3Add(e.pos, vec3Scale(dir, e.speed * dt));
        }
        break;
      case AIState.Attack:
        // Move toward target slowly, body-blocking
        const approach = vec3Normalize(vec3Sub(target.pos, e.pos));
        e.pos = vec3Add(e.pos, vec3Scale(approach, e.speed * 0.3 * dt));
        e.attackTimer -= dt;
        if (e.attackTimer <= 0) {
          this.enemyShoot(e, target);
          e.attackTimer = 1.2 + Math.random() * 0.8;
        }
        if (dist > def.attackRange * 1.5) e.state = AIState.Chase;
        break;
      case AIState.Flee:
        if (e.hp > def.hp * 0.3) e.state = AIState.Chase;
        const fleeDir = vec3Normalize(vec3Sub(e.pos, target.pos));
        e.pos = vec3Add(e.pos, vec3Scale(fleeDir, e.speed * 1.5 * dt));
        break;
    }
  }

  private updateAIBomber(e: EnemyState, target: PlayerState, dist: number, def: any, dt: number) {
    switch (e.state) {
      case AIState.Patrol:
        if (dist < def.alertRange) e.state = AIState.Chase;
        break;
      case AIState.Chase:
      case AIState.Attack:
        // Rush directly at target at full speed
        const dir = vec3Normalize(vec3Sub(target.pos, e.pos));
        e.pos = vec3Add(e.pos, vec3Scale(dir, e.speed * dt));
        break;
    }
    // Bomber explosion on contact
    if (dist < 3) {
      this.scene.createExplosion(e.pos, '#ff4400', 2);
      audioManager.playExplosion();
      target.hp -= def.damage;
      target.invulnTimer = INVULN_DURATION;
      e.hp = 0;
    }
  }

  private updateAICommander(e: EnemyState, target: PlayerState, dist: number, def: any, dt: number) {
    // Buff nearby enemies
    this.enemies.forEach(other => {
      if (other.id === e.id || other.hp <= 0) return;
      const d = vec3Dist(e.pos, other.pos);
      if (d < 30) {
        other.speed = def.speed * 1.3;
      }
    });

    switch (e.state) {
      case AIState.Patrol:
        if (dist < def.alertRange) e.state = AIState.Chase;
        break;
      case AIState.Chase:
        if (dist < def.attackRange) e.state = AIState.Attack;
        else if (dist > def.alertRange * 1.5) e.state = AIState.Patrol;
        else {
          const dir = vec3Normalize(vec3Sub(target.pos, e.pos));
          e.pos = vec3Add(e.pos, vec3Scale(dir, e.speed * dt));
        }
        break;
      case AIState.Attack:
        if (dist > def.attackRange * 1.2) e.state = AIState.Chase;
        e.attackTimer -= dt;
        if (e.attackTimer <= 0) {
          this.enemyShoot(e, target);
          e.attackTimer = 0.6 + Math.random() * 0.4;
        }
        break;
      case AIState.Flee:
        if (e.hp > def.hp * 0.3) e.state = AIState.Chase;
        const fleeDir = vec3Normalize(vec3Sub(e.pos, target.pos));
        e.pos = vec3Add(e.pos, vec3Scale(fleeDir, e.speed * 1.5 * dt));
        break;
    }
  }

  private updateProjectiles(dt: number) {
    this.projectiles.forEach(p => {
      p.pos = vec3Add(p.pos, vec3Scale(p.vel, dt));
      p.lifetime -= dt;

      const mesh = this.scene.projectileMeshes.get(p.id);
      if (mesh) {
        mesh.position.set(p.pos.x, p.pos.y, p.pos.z);
        if (p.type === ProjectileType.Missile) {
          mesh.rotation.x += dt * 5;
        }
      }
    });

    // Remove expired projectiles
    this.projectiles = this.projectiles.filter(p => {
      if (p.lifetime <= 0) {
        const mesh = this.scene.projectileMeshes.get(p.id);
        if (mesh) {
          this.scene.scene.remove(mesh);
          this.scene.projectileMeshes.delete(p.id);
        }
        return false;
      }
      return true;
    });
  }

  private updateParticles(dt: number) {
    // Particle update is handled in SceneManager.createExplosion
  }

  private checkCollisions() {
// Player projectiles hit enemies
    this.projectiles.forEach(p => {
      if (p.owner >= 10000) return; // Enemy projectile

      this.enemies.forEach(e => {
        const hitRadius = e.type === EnemyType.Boss ? 4 : 1.5;
        if (vec3Dist(p.pos, e.pos) < hitRadius) {
          e.hp -= p.damage;
          p.lifetime = 0;
          this.scene.createExplosion(p.pos, '#ffaa00', 0.5);
          audioManager.playHit();
        }
      });
    });

    // Enemy projectiles hit players
    this.projectiles.forEach(p => {
      if (p.owner < 10000) return; // Player projectile

      this.players.forEach(player => {
        if (!player.alive || player.invulnTimer > 0 || player.shieldTimer > 0) return;
        if (vec3Dist(p.pos, player.pos) < PLAYER_SIZE) {
          player.hp -= p.damage;
          p.lifetime = 0;
          player.invulnTimer = INVULN_DURATION;
          this.scene.createExplosion(p.pos, '#ff4444', 0.5);
          audioManager.playHit();

          if (player.hp <= 0) {
            player.alive = false;
            this.scene.createExplosion(player.pos, '#4488ff', 3);
          }
        }
      });
    });
  }

  private spawnEnemies(dt: number) {
    this.enemySpawnTimer += dt;
    const store = useGameStore.getState();
    const game = store.game;

    if (game.gameMode === 'pvp') return;

    if (this.enemySpawnTimer > 2 && this.enemies.length < MAX_ENEMIES) {
      this.enemySpawnTimer = 0;

      // Boss wave
      if (game.wave > 0 && game.wave % BOSS_WAVE_INTERVAL === 0 && this.currentBossIndex < 0) {
        this.spawnBoss();
        return;
      }

      const types = [EnemyType.Scout, EnemyType.Assault, EnemyType.Sniper, EnemyType.Shield, EnemyType.Bomber];
      if (game.wave > 3) types.push(EnemyType.Commander);
      const type = types[randInt(0, types.length - 1)];
      const def = getEnemyDef(type);

      // Spawn at random position away from players
      let pos: Vector3;
      do {
        pos = { x: randRange(-WORLD_SIZE, WORLD_SIZE), y: 0, z: randRange(-WORLD_SIZE, WORLD_SIZE) };
      } while (this.players.some(p => vec3Dist(pos, p.pos) < 20));

      const enemy: EnemyState = {
        id: genId(),
        type,
        pos,
        rot: { x: 0, y: 0, z: 0 },
        hp: def.hp * (1 + game.wave * 0.1),
        maxHp: def.hp,
        speed: def.speed * (1 + game.wave * 0.05),
        state: AIState.Patrol,
        targetId: 0,
        attackTimer: 1 + Math.random(),
      };

this.enemies.push(enemy);
      const mesh = this.scene.createEnemyMesh(new THREE.Color(def.color), def.size, type);
      mesh.position.set(pos.x, pos.y, pos.z);
      this.scene.enemyMeshes.set(enemy.id, mesh);
      this.scene.scene.add(mesh);
    }
  }

  private spawnBoss() {
    const bossIndex = this.bossCount % 3;
    this.currentBossIndex = bossIndex;
    this.bossCount++;
    this.bossPhase = 1;
    this.bossAttackTimer = 0;

    const bossDef = getBoss(bossIndex + 1);
    const pos = { x: randRange(-30, 30), y: 5, z: -50 };

    const enemy: EnemyState = {
      id: genId(),
      type: EnemyType.Boss,
      pos,
      rot: { x: 0, y: 0, z: 0 },
      hp: 200 * (1 + this.bossCount * 0.2),
      maxHp: 200,
      speed: 5,
      state: AIState.Phase1,
      targetId: 0,
      attackTimer: 2,
      phase: 1,
    };

    this.enemies.push(enemy);
    const mesh = this.scene.createBossMesh(new THREE.Color(bossDef.color), bossDef.size);
    mesh.position.set(pos.x, pos.y, pos.z);
    this.scene.bossMeshes.set(enemy.id, mesh);
    this.scene.scene.add(mesh);

    audioManager.playBossWarning();
    useGameStore.getState().setGame({ bossFight: true, bossName: bossDef.name });
  }

  private updateBoss(dt: number) {
    const boss = this.enemies.find(e => e.type === EnemyType.Boss);
    if (!boss) {
      if (useGameStore.getState().game.bossFight) {
        useGameStore.getState().setGame({ bossFight: false, bossName: '' });
      }
      return;
    }

    const bossDef = getBoss(this.currentBossIndex + 1);
    const hpPercent = boss.hp / boss.maxHp;

    // Phase transitions
    bossDef.phases.forEach((phase, i) => {
      if (hpPercent <= phase.hpPercent && (boss.phase || 1) <= i) {
        boss.phase = i + 1;
        boss.speed = phase.speed;
        boss.state = (['phase1', 'phase2', 'phase3', 'phase4'] as AIState[])[i];
      }
    });

    // Boss attacks
    this.bossAttackTimer += dt;
    if (this.bossAttackTimer > 2) {
      this.bossAttackTimer = 0;
      const target = this.players.find(p => p.alive);
      if (!target) return;

      const phase = bossDef.phases[(boss.phase || 1) - 1];
      const pattern = phase.attackPattern;

switch (pattern) {
        case 'spread':
          // Circular bullet spread
          for (let i = 0; i < 12; i++) {
            const angle = (i / 12) * Math.PI * 2;
            const dir = { x: Math.cos(angle), y: 0, z: Math.sin(angle) };
            const proj: ProjectileState = {
              id: genId(), pos: { ...boss.pos }, vel: vec3Scale(dir, 10),
              damage: 5, owner: boss.id + 10000, type: ProjectileType.BossBullet,
              lifetime: 4, radius: 0.3, color: '#ff4444',
            };
            this.projectiles.push(proj);
            const mesh = this.scene.createProjectileMesh('#ff4444', 'bullet');
            mesh.position.set(proj.pos.x, proj.pos.y, proj.pos.z);
            this.scene.projectileMeshes.set(proj.id, mesh);
            this.scene.scene.add(mesh);
          }
          break;
        case 'laser':
case 'finalBeam': {
          const dir = vec3Normalize(vec3Sub(target.pos, boss.pos));
          const proj: ProjectileState = {
            id: genId(), pos: { ...boss.pos }, vel: vec3Scale(dir, 30),
            damage: 25, owner: boss.id + 10000, type: ProjectileType.Laser,
            lifetime: 2, radius: 0.5, color: '#ff0000',
          };
          this.projectiles.push(proj);
          const mesh = this.scene.createProjectileMesh('#ff0000', 'beam');
          mesh.position.set(proj.pos.x, proj.pos.y, proj.pos.z);
          mesh.scale.set(1, 1, 3);
          this.scene.projectileMeshes.set(proj.id, mesh);
          this.scene.scene.add(mesh);
          break;
        }
        case 'missile':
          for (let i = 0; i < 5; i++) {
            const dir = vec3Normalize(vec3Sub(target.pos, boss.pos));
            const spread = { x: (Math.random() - 0.5) * 2, y: 0, z: (Math.random() - 0.5) * 2 };
const proj: ProjectileState = {
              id: genId(), pos: { ...boss.pos }, vel: vec3Scale(vec3Add(dir, spread), 8),
              damage: 10, owner: boss.id + 10000, type: ProjectileType.Missile,
              lifetime: 5, radius: 0.4, color: '#ffaa00',
            };
            this.projectiles.push(proj);
            const mesh = this.scene.createProjectileMesh('#ffaa00', 'missile');
            mesh.position.set(proj.pos.x, proj.pos.y, proj.pos.z);
            this.scene.projectileMeshes.set(proj.id, mesh);
            this.scene.scene.add(mesh);
          }
          break;
        case 'rush':
          boss.speed = 20;
          const rushDir = vec3Normalize(vec3Sub(target.pos, boss.pos));
          boss.pos = vec3Add(boss.pos, vec3Scale(rushDir, boss.speed * dt));
          break;
        case 'spawn':
          if (phase.minionSpawn) {
            for (let i = 0; i < 3; i++) {
              const enemy: EnemyState = {
                id: genId(), type: EnemyType.Scout,
                pos: { x: boss.pos.x + randRange(-5, 5), y: 0, z: boss.pos.z + randRange(-5, 5) },
                rot: { x: 0, y: 0, z: 0 }, hp: 20, maxHp: 20, speed: 10,
                state: AIState.Chase, targetId: 0, attackTimer: 1,
              };
this.enemies.push(enemy);
              const mesh = this.scene.createEnemyMesh(new THREE.Color(0x44aaff), 1, 'scout');
              mesh.position.set(enemy.pos.x, enemy.pos.y, enemy.pos.z);
              this.scene.enemyMeshes.set(enemy.id, mesh);
              this.scene.scene.add(mesh);
            }
          }
          break;
      }
    }

    // Move boss toward player slowly
    const target = this.players.find(p => p.alive);
    if (target && boss.phase && boss.phase > 1) {
      const dir = vec3Normalize(vec3Sub(target.pos, boss.pos));
      boss.pos = vec3Add(boss.pos, vec3Scale(dir, boss.speed * dt * 0.3));
    }
  }

  private updateUI(dt: number) {
    const store = useGameStore.getState();
    const game = store.game;

    // Check game over
    if (game.gameMode === 'pve') {
      const allDead = this.players.every(p => !p.alive);
      if (allDead && !game.gameOver) {
        store.setGame({ gameOver: true, screen: 'result' });
        this.stop();
      }
    } else if (game.gameMode === 'pvp') {
      const p1Dead = !this.players[0]?.alive;
      const p2Dead = !this.players[1]?.alive;
      if (p1Dead || p2Dead) {
        if (p1Dead && p2Dead) store.setGame({ gameOver: true, result: 'draw', screen: 'result' });
        else if (p1Dead) store.setGame({ gameOver: true, result: 'p2win', screen: 'result' });
        else store.setGame({ gameOver: true, result: 'p1win', screen: 'result' });
        this.stop();
      }
    }

    store.setPlayers(this.players);
    store.setGame({
      score: this.players.reduce((s, p) => s + p.score, 0),
      wave: Math.floor(this.waveTimer / WAVE_INTERVAL) + 1,
    });

    this.waveTimer += dt;
  }

private render(dt: number) {
    if (this.splitScreen) {
      // TODO: implement split screen with two cameras
    }
    this.players.forEach((p, i) => {
      this.scene.updateCamera(p.pos, dt, false, i > 0, p.rot.y);

      // Lock indicator
      const lockTargetId = this.lockTargets[i];
      const lockEnemy = lockTargetId !== null
        ? this.enemies.find(e => e.id === lockTargetId && e.hp > 0)
        : null;
      this.scene.updateLockIndicator(p.id, p.pos, lockEnemy ? lockEnemy.pos : null);
    });
    this.scene.render();
  }
}

