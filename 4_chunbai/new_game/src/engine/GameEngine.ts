import * as THREE from 'three';
import { SceneManager } from './SceneManager';
import { InputManager } from './InputManager';
import { audioManager } from './AudioManager';
import { useGameStore } from '../store';
import { Simulation, TickInput } from '../core/simulation/Simulation';
import { SimEvent } from '../core/simulation/events';
import {
  EnemyType, ProjectileType, Vector3, InputState, GameState, PlayerState,
} from '../core/types';
import { getWeapon } from '../core/data/weapons';
import { getEnemyDef } from '../core/data/enemies';
import { getBoss } from '../core/data/bosses';
import {
  FIXED_TIMESTEP, LOCK_RANGE, LOCK_DROP_RANGE, CAMERA_SPRING_STIFFNESS,
  CAMERA_BRAKE_STIFFNESS, BRAKE_PITCH, BRAKE_PITCH_RAMP, BRAKE_PITCH_EASE,
  IDLE_BOB_AMP, IDLE_BOB_SPEED,
} from '../core/constants';
import { vec3Add, vec3Sub, vec3Scale, vec3Dist, vec3Normalize, clamp } from '../core/math';
import { buildPromptContext } from '../core/world/worldText';

/**
 * 适配层编排器（C.A.T「A」）：把平台无关的 Simulation 绑定到
 * Three.js 场景 / DOM 输入 / Web Audio / React store。
 * 职责：固定步长主循环、Tick 组装（相机投影数据）、事件分发、mesh 对账、渲染侧视觉。
 * 游戏规则与状态全部在 core/simulation/Simulation.ts。
 */
export class GameEngine {
  scene: SceneManager;
  input: InputManager;
  canvas: HTMLCanvasElement;
  sim: Simulation;
  active = false;

  private accumulator = 0;
  private lastTime = 0;
  private animFrameId = 0;
  private lastInput: InputState | null = null;
  private brakePitch = 0;
  private cameraStiffness = CAMERA_SPRING_STIFFNESS;
  private cameraShake = 0;
  private lastLoopError = 0;
  private enemyOutlineRef: { enemyId: number; parent: THREE.Group; group: THREE.Group } | null = null;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.scene = new SceneManager(canvas, canvas.width, canvas.height);
    this.input = new InputManager(0);
    this.input.setCanvasSize(canvas.width, canvas.height);
    this.sim = new Simulation();
  }

  start() {
    const store = useGameStore.getState();
    this.sim.start(store.players);
    this.active = true;
    this.lastTime = performance.now();
    this.accumulator = 0;
    this.cameraShake = 0;
    this.brakePitch = 0;
    this.cameraStiffness = CAMERA_SPRING_STIFFNESS;
    this.lastInput = null;

    // Create player meshes
    this.sim.players.forEach((p, i) => {
      const color = i === 0 ? new THREE.Color(0x4488ff) : new THREE.Color(0xff6644);
      const mesh = this.scene.createPlayerMesh(color);
      mesh.position.set(p.pos.x, p.pos.y, p.pos.z);
      this.scene.playerMeshes.set(p.id, mesh);
      this.scene.scene.add(mesh);
      // 自己蓝色描边（常显）
      const selfOutline = this.scene.createOutline(mesh, '#4488ff');
      selfOutline.name = 'self-outline';
      mesh.add(selfOutline);
    });

    audioManager.init();
    audioManager.startBGM();
    audioManager.playIntroSting();

    // C0 — 启动 3 秒开场序列：黑屏 → 城市亮起 → 镜头俯冲到 chase cam → 解锁输入
    store.setGame({ introActive: true });
    this.scene.startIntro(this.sim.players[0].pos, () => {
      useGameStore.getState().setGame({ introActive: false });
    });

    // T 原则 DEV 钩子：浏览器控制台可读取世界 token 清单（生产构建无此接口）
    if (import.meta.env.DEV) {
      (window as unknown as Record<string, unknown>).__gameManifest = () => buildPromptContext(this.sim);
      (window as unknown as Record<string, unknown>).__sim = this.sim;
    }

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
    try {
      const dt = Math.min((time - this.lastTime) / 1000, 0.05);
      this.lastTime = time;

      // C4: 子弹时间 — 在 timeDilationUntil 之前，accumulator 缩小为 0.3x
      const dilationUntil = useGameStore.getState().game.timeDilationUntil;
      const inDilation = time < dilationUntil;
      const scaledDt = inDilation ? dt * 0.3 : dt;
      this.accumulator += scaledDt;

      while (this.accumulator >= FIXED_TIMESTEP) {
        this.step(FIXED_TIMESTEP);
        this.accumulator -= FIXED_TIMESTEP;
      }

      this.render(dt);
    } catch (err) {
      // 防御：单帧异常不杀死游戏循环
      if (Date.now() - this.lastLoopError > 1000) {
        this.lastLoopError = Date.now();
        console.error('[gameLoop]', err);
      }
    }
  };

  /** 单个固定步：组装 Tick → 仿真 → 事件分发 → mesh 对账 → store 同步。 */
  private step(dt: number) {
    // C0: 开场动画期间冻结游戏逻辑，只消费输入边沿避免残留误触发
    if (useGameStore.getState().game.introActive) {
      this.input.getState();
      return;
    }

    const input = this.input.getState();
    this.lastInput = input;
    const rawAim = {
      x: this.input.getRawMouseNormX(),
      y: this.input.getRawMouseNormY(),
    };
    const player = this.sim.players[0];
    const camPos = this.scene.camera.position;

    const tick: TickInput = {
      input,
      rawAim,
      crosshairDir: this.computeCrosshairDir(player),
      aimOrigin: { x: camPos.x, y: camPos.y, z: camPos.z },
      smartTargetId: this.pickSmartTarget(player),
      lockStickPoint: this.lockStickPoint(),
    };

    const events = this.sim.update(dt, tick);
    // 锁定粘滞结果回写到输入（后续渲染帧与下个 tick 的准星以此为基准）
    this.input.setAimNorm(this.sim.aimNormX, this.sim.aimNormY);

    this.dispatch(events);
    this.syncMeshes();
    this.syncStore();
  }

  // === 事件分发：仿真副作用 → 音频 / 场景 / store ===
  private dispatch(events: SimEvent[]) {
    for (const ev of events) {
      switch (ev.type) {
        case 'sound':
          switch (ev.sound) {
            case 'shoot': audioManager.playShoot(ev.freq); break;
            case 'hit': audioManager.playHit(); break;
            case 'explosion': audioManager.playExplosion(); break;
            case 'dodge': audioManager.playDodge(); break;
            case 'special': audioManager.playSpecial(); break;
            case 'specialAnnounce': audioManager.playSpecialAnnounce(); break;
            case 'glitch': audioManager.playGlitch(); break;
            case 'bossWarning': audioManager.playBossWarning(); break;
            case 'bossAnnounce': audioManager.playBossAnnounce(ev.param || ''); break;
          }
          break;
        case 'explosion':
          this.scene.createExplosion(ev.pos, ev.color, ev.size);
          break;
        case 'fx':
          switch (ev.fx) {
            case 'edgePulse': useGameStore.getState().triggerEdgePulse(); break;
            case 'timeDilation': useGameStore.getState().triggerTimeDilation(ev.value ?? 0.2); break;
            case 'shake': this.cameraShake = Math.max(this.cameraShake, ev.value ?? 0); break;
          }
          break;
      }
    }
  }

  // === Mesh 对账：以仿真实体为事实源，创建/回收渲染对象 ===
  private syncMeshes() {
    // Enemies（含 Boss）
    for (const e of this.sim.enemies) {
      if (e.type === EnemyType.Boss) {
        if (!this.scene.bossMeshes.has(e.id)) {
          const bossDef = getBoss(this.sim.currentBossIndex + 1);
          const mesh = this.scene.createBossMesh(new THREE.Color(bossDef.color), bossDef.size);
          mesh.position.set(e.pos.x, e.pos.y, e.pos.z);
          this.scene.bossMeshes.set(e.id, mesh);
          this.scene.scene.add(mesh);
        }
      } else if (!this.scene.enemyMeshes.has(e.id)) {
        const def = getEnemyDef(e.type);
        const mesh = this.scene.createEnemyMesh(new THREE.Color(def.color), def.size, e.type);
        mesh.position.set(e.pos.x, e.pos.y, e.pos.z);
        this.scene.enemyMeshes.set(e.id, mesh);
        this.scene.scene.add(mesh);
      }
    }
    for (const [id, mesh] of this.scene.enemyMeshes) {
      if (!this.sim.enemies.some(e => e.id === id)) {
        this.scene.scene.remove(mesh);
        this.scene.enemyMeshes.delete(id);
      }
    }
    for (const [id, mesh] of this.scene.bossMeshes) {
      if (!this.sim.enemies.some(e => e.id === id)) {
        this.scene.scene.remove(mesh);
        this.scene.bossMeshes.delete(id);
      }
    }

    // Projectiles
    for (const p of this.sim.projectiles) {
      if (!this.scene.projectileMeshes.has(p.id)) {
        const mesh = this.scene.createProjectileMesh(p.color, this.projectileGeometry(p.type));
        mesh.position.set(p.pos.x, p.pos.y, p.pos.z);
        if (p.type === ProjectileType.Laser) mesh.scale.set(1, 1, 3);
        this.scene.projectileMeshes.set(p.id, mesh);
        this.scene.scene.add(mesh);
      }
    }
    for (const [id, mesh] of this.scene.projectileMeshes) {
      if (!this.sim.projectiles.some(p => p.id === id)) {
        this.scene.scene.remove(mesh);
        this.scene.projectileMeshes.delete(id);
      }
    }
  }

  /** ProjectileType → SceneManager 几何变体。 */
  private projectileGeometry(type: ProjectileType): string {
    switch (type) {
      case ProjectileType.Beam:
      case ProjectileType.Sniper:
      case ProjectileType.Laser:
        return 'beam';
      case ProjectileType.Missile:
        return 'missile';
      default:
        return 'bullet';
    }
  }

  // === store 同步（React UI 事实源）===
  private syncStore() {
    const store = useGameStore.getState();
    const g = store.game;

    // Check game over
    if (!this.sim.players[0].alive && !g.gameOver) {
      store.setGame({ gameOver: true, screen: 'result' });
      this.stop();
      return;
    }

    const boss = this.sim.enemies.find(e => e.type === EnemyType.Boss);
    const bossName = boss ? getBoss(this.sim.currentBossIndex + 1).name : '';
    const patch: Partial<GameState> = {};
    if (g.wave !== this.sim.wave) patch.wave = this.sim.wave;
    if (g.lockOn !== this.sim.lockOn) patch.lockOn = this.sim.lockOn;
    if (g.bossFight !== !!boss) patch.bossFight = !!boss;
    if (g.bossName !== bossName) patch.bossName = bossName;
    const score = this.sim.players.reduce((s, p) => s + p.score, 0);
    if (g.score !== score) patch.score = score;
    patch.time = g.time + FIXED_TIMESTEP;
    if (Object.keys(patch).length > 0) {
      store.setGame(patch);
    }
    store.setPlayers(this.sim.players);
  }

  // 世界坐标 → 画布像素坐标（用于锁定准星粘滞 / 智能圈 / HUD 落点）
  private worldToScreen(pos: Vector3): { x: number; y: number } | null {
    const cam = this.scene.camera;
    const view = cam.matrixWorldInverse.elements;
    const proj = cam.projectionMatrix.elements;
    const x = pos.x, y = pos.y, z = pos.z;
    const vx = view[0] * x + view[4] * y + view[8] * z + view[12];
    const vy = view[1] * x + view[5] * y + view[9] * z + view[13];
    const vz = view[2] * x + view[6] * y + view[10] * z + view[14];
    const vw = view[3] * x + view[7] * y + view[11] * z + view[15];
    const cx = proj[0] * vx + proj[4] * vy + proj[8] * vz + proj[12] * vw;
    const cy = proj[1] * vx + proj[5] * vy + proj[9] * vz + proj[13] * vw;
    const cz = proj[2] * vx + proj[6] * vy + proj[10] * vz + proj[14] * vw;
    const cw = proj[3] * vx + proj[7] * vy + proj[11] * vz + proj[15] * vw;
    if (cw <= 0) return null;
    const ndx = cx / cw, ndy = cy / cw;
    if (Math.abs(ndx) > 1.2 || Math.abs(ndy) > 1.2) return null;
    return { x: (ndx * 0.5 + 0.5) * this.canvas.width, y: (-ndy * 0.5 + 0.5) * this.canvas.height };
  }

  // 智能圈：准星圆圈内最近的目标（屏幕距离 ≤ 武器 smartRadius）— 适配层投影，结果交给仿真
  private pickSmartTarget(player: PlayerState): number | null {
    const weapon = getWeapon(player.weapon);
    const radius = weapon.smartRadius;
    const cx = this.input.getMouseNormX() * this.canvas.width;
    const cy = this.input.getMouseNormY() * this.canvas.height;
    let bestId: number | null = null;
    let bestDist = Infinity;
    for (const e of this.sim.enemies) {
      if (e.hp <= 0) continue;
      const screen = this.worldToScreen(e.pos);
      if (!screen) continue;
      const dx = screen.x - cx, dy = screen.y - cy;
      if (dx * dx + dy * dy > radius * radius) continue;
      const d = vec3Dist(player.pos, e.pos);
      if (d < bestDist) {
        bestDist = d;
        bestId = e.id;
      }
    }
    return bestId;
  }

  // 当前锁定目标的归一化屏幕坐标（锁定粘滞输入）
  private lockStickPoint(): { x: number; y: number } | null {
    if (!this.sim.lockOn || this.sim.lockTargetId === null) return null;
    const e = this.sim.enemies.find(x => x.id === this.sim.lockTargetId && x.hp > 0);
    if (!e) return null;
    const s = this.worldToScreen(e.pos);
    if (!s) return null;
    return {
      x: clamp(s.x / this.canvas.width, 0, 1),
      y: clamp(s.y / this.canvas.height, 0, 1),
    };
  }

  // Crosshair-only direction at the player's height — 相机偏航与 Tick 输入共用
  private computeCrosshairDir(player: PlayerState): Vector3 {
    const cam = this.scene.camera;
    const ndcX = (this.input.getMouseNormX() - 0.5) * 2;
    const ndcY = (0.5 - this.input.getMouseNormY()) * 2;
    const fwd = new THREE.Vector3(0, 0, -1).applyQuaternion(cam.quaternion);
    const right = new THREE.Vector3(1, 0, 0).applyQuaternion(cam.quaternion);
    const up = new THREE.Vector3(0, 1, 0).applyQuaternion(cam.quaternion);
    const tanFov = Math.tan((cam.fov * Math.PI) / 360);
    const dir = new THREE.Vector3()
      .addScaledVector(fwd, 1)
      .addScaledVector(right, ndcX * tanFov * cam.aspect)
      .addScaledVector(up, ndcY * tanFov)
      .normalize();

    // Fire horizontally in the crosshair's direction at the player's height
    const depth = 120;
    const target = new THREE.Vector3(
      cam.position.x + dir.x * depth,
      player.pos.y,
      cam.position.z + dir.z * depth
    );
    return vec3Normalize({ x: target.x - player.pos.x, y: target.y - player.pos.y, z: target.z - player.pos.z });
  }

  // 锁定目标的提前量落点（屏幕像素，用于 HUD 指示器）；未锁定/超射程/离屏返回 null
  getLeadScreenPoint(): { x: number; y: number } | null {
    if (!this.sim.lockOn || this.sim.lockTargetId === null) return null;
    const p = this.sim.players[0];
    if (!p) return null;
    const enemy = this.sim.enemies.find(e => e.id === this.sim.lockTargetId && e.hp > 0);
    if (!enemy) return null;
    const weapon = getWeapon(p.weapon);
    const effectiveRange = Math.max(weapon.lockRange, LOCK_RANGE);
    if (vec3Dist(enemy.pos, p.pos) > effectiveRange) return null;
    const vel = this.sim.enemyVels.get(enemy.id) || { x: 0, y: 0, z: 0 };
    const speed = weapon.speed;
    let t = speed > 0.001 ? vec3Dist(p.pos, enemy.pos) / speed : 0;
    let lead = vec3Add(enemy.pos, vec3Scale(vel, t));
    const d1 = vec3Dist(p.pos, lead);
    if (speed > 0.001 && d1 > 0.001) lead = vec3Add(enemy.pos, vec3Scale(vel, d1 / speed));
    return this.worldToScreen(lead);
  }

  // 渲染侧锁定视觉：指示线（绿/红）+ 目标橘红脉冲描边（防御式遍历，绝不抛错）
  private renderLockVisuals(p: PlayerState, i: number) {
    const lockEnemy = this.sim.getLockEnemy();
    if (lockEnemy) {
      const weapon = getWeapon(this.sim.players[0].weapon);
      const effectiveRange = Math.max(weapon.lockRange, LOCK_RANGE);
      const color = vec3Dist(lockEnemy.pos, p.pos) <= effectiveRange ? '#00ff88' : '#ff4444';
      this.scene.updateLockIndicator(i, p.pos, lockEnemy.pos, color);
    } else {
      this.scene.updateLockIndicator(i, p.pos, null);
    }

    const enemyMesh = lockEnemy ? this.scene.enemyMeshes.get(lockEnemy.id) : null;
    if (enemyMesh && lockEnemy) {
      if (!this.enemyOutlineRef || this.enemyOutlineRef.enemyId !== lockEnemy.id) {
        if (this.enemyOutlineRef) {
          this.enemyOutlineRef.parent.remove(this.enemyOutlineRef.group);
        }
        const outline = this.scene.createOutline(enemyMesh, '#ff5a3c');
        enemyMesh.add(outline);
        this.enemyOutlineRef = { enemyId: lockEnemy.id, parent: enemyMesh, group: outline };
      }
      const pulse = 0.35 + 0.2 * Math.sin(performance.now() * 0.001 * Math.PI * 6);
      this.enemyOutlineRef.group.children.forEach(c => {
        if (!(c instanceof THREE.Mesh)) return;
        const mat = c.material;
        if (!mat || Array.isArray(mat)) return;
        mat.opacity = pulse;
      });
      this.enemyOutlineRef.group.visible = true;
    } else if (this.enemyOutlineRef) {
      this.enemyOutlineRef.group.visible = false;
    }
  }

  private render(dt: number) {
    const introActive = useGameStore.getState().game.introActive;
    this.sim.players.forEach((p, i) => {
      // 自由视角：镜头偏航跟随准星方向（不跟随机甲朝向，也不被锁定目标拖拽）
      // C0: intro 期 SceneManager.updateAtmosphere 已接管摄像机，跳过 updateCamera
      const camDir = this.computeCrosshairDir(p);
      if (!introActive) {
        this.scene.updateCamera(p.pos, dt, Math.atan2(camDir.x, camDir.z), this.cameraStiffness);
      }

      // 速度感：FOV 随速度呼吸
      const v = this.sim.velocities[i];
      const speedRatio = Math.min(1, Math.hypot(v.x, v.y, v.z) / p.speed);
      this.scene.setSpeedRatio(speedRatio);

      // 受击镜头轻震
      if (this.cameraShake > 0) {
        const cam = this.scene.camera;
        const amp = this.cameraShake * 2.5;
        cam.position.x += (Math.random() - 0.5) * amp;
        cam.position.y += (Math.random() - 0.5) * amp;
        this.cameraShake -= dt;
      }

      // Lock indicator + 目标描边（锁定子系统渲染）
      this.renderLockVisuals(p, i);

      // 玩家 mesh 同步：悬停浮沉 + 制动仰角（仅叠加在 mesh 上，不污染 rot.x）+ 推进器火苗
      const mesh = this.scene.playerMeshes.get(p.id);
      if (mesh) {
        this.updateBrakePitch(dt);
        const bob = Math.sin(performance.now() * 0.001 * IDLE_BOB_SPEED) * IDLE_BOB_AMP;
        mesh.position.set(p.pos.x, p.pos.y + bob, p.pos.z);
        mesh.rotation.set(p.rot.x + BRAKE_PITCH * this.brakePitch, p.rot.y, p.rot.z);

        const inp = this.lastInput;
        if (inp) {
          const ax = (inp.right ? 1 : 0) - (inp.left ? 1 : 0);
          const ay = (inp.up ? 1 : 0) - (inp.down ? 1 : 0);
          const az = (inp.forward ? 1 : 0) - (inp.backward ? 1 : 0);
          const inputLen = Math.sqrt(ax * ax + ay * ay + az * az);
          this.scene.updateThrusters(p.id, inputLen, inp.boost);
          // B1: 推进器火苗 — 缩放随 boost/输入伸缩 + 闪烁 + 助推时转白蓝
          const isBoosting = inp.boost && p.energy > 0;
          const t = performance.now() * 0.001;
          const flicker = 0.85 + 0.15 * Math.sin(t * 12 + Math.sin(t * 7) * 2);
          const lengthScale = isBoosting ? 2.2 : (inputLen > 0.001 ? 1.3 : 0.8);
          const r = isBoosting ? 0.55 : 1.0;
          const g = isBoosting ? 0.85 : 0.67;
          const b = isBoosting ? 1.0 : 0.27;
          mesh.children.forEach(child => {
            if ((child as THREE.Object3D).name === 'thruster') {
              child.scale.y = lengthScale * flicker;
              const mat = (child as THREE.Mesh).material as THREE.MeshBasicMaterial;
              mat.color.setRGB(r, g, b);
              mat.opacity = isBoosting ? 0.95 * flicker : 0.8 * flicker;
            }
          });
        }
      }
    });

    // 敌人/弹体 mesh 位置与自转（对账后每帧同步）
    for (const e of this.sim.enemies) {
      const mesh = e.type === EnemyType.Boss
        ? this.scene.bossMeshes.get(e.id)
        : this.scene.enemyMeshes.get(e.id);
      if (!mesh) continue;
      mesh.position.set(e.pos.x, e.pos.y, e.pos.z);
      mesh.rotation.y += dt * 2;
      if (e.type === EnemyType.Boss) {
        mesh.rotation.x += dt * 0.5;
      }
    }
    for (const p of this.sim.projectiles) {
      const mesh = this.scene.projectileMeshes.get(p.id);
      if (!mesh) continue;
      mesh.position.set(p.pos.x, p.pos.y, p.pos.z);
      if (p.type === ProjectileType.Missile) {
        mesh.rotation.x += dt * 5;
      }
    }

    this.scene.render(dt);
  }

  // 制动仰角：急停时机身抬头（0.2s 起效 / 0.4s 回落）；刹车时相机弹簧变硬
  private updateBrakePitch(dt: number) {
    const inp = this.lastInput;
    if (inp && inp.brake) {
      this.brakePitch = Math.min(1, this.brakePitch + dt / BRAKE_PITCH_RAMP);
      this.cameraStiffness = CAMERA_BRAKE_STIFFNESS;
    } else {
      this.brakePitch = Math.max(0, this.brakePitch - dt / BRAKE_PITCH_EASE);
      this.cameraStiffness = CAMERA_SPRING_STIFFNESS;
    }
  }
}
