import { ENEMY_AIM_TELEGRAPH_S, FLASHLIGHT_CONE_ARC_DEG, FLASHLIGHT_SWEEP_HZ, LIGHT_POOL_DOWN_S, PLAYER_MELEE_ARC_DEG, PLAYER_MELEE_DURATION, PLAYER_MELEE_RANGE, PLAYER_SPEED_MAX, ROOM_START_GRACE_S } from '../constants';
import { createEnemy } from '../data/enemies';
import { RC_LIGHT_TABLE } from '../data/lights';
import { MISSIONS } from '../data/missions';
import { damageEnemy, lightSmash } from './damage';
import { GamePhase as GP } from '../types';
import type { ActiveRcLight, GamePhase, ISimulation, LightSource, Player, PlayerInput, SimEvent, SimSnapshot, Vec2 } from '../types';

const mission = MISSIONS[0];
const room = mission.rooms[0];

function makePlayer(): Player {
  return {
    position: { ...room.playerSpawn }, velocity: { x: 0, y: 0 }, facingAngle: -Math.PI / 2,
    hp: 1, ammo: Infinity, reloading: 0, weapon: 'knife', mode: 'melee', modeSwitchTimer: 0,
    activeMask: null, dodgeTimer: 0, dodgeCooldown: 0, dashTimer: 0, dashCooldown: 0, kills: 0, hitsTaken: 0,
  };
}

function makeLamp(): LightSource {
  return { id: 'oil_lamp_1', kind: 'oil_lamp', position: { x: 5, y: 1 }, state: 'intact', hp: 2, intensity: RC_LIGHT_TABLE.oil_lamp.intensity, breakable: true, invalidated: false };
}

export class Simulation implements ISimulation {
  phase: GamePhase = GP.TITLE;
  readonly events: SimEvent[] = [];
  readonly recentEvents: SimEvent[] = [];
  private player = makePlayer();
  private enemies = [createEnemy('flashlight_patrol', 'patrol_1', room.enemySpawns[0])];
  private lightSources = [makeLamp()];
  private activeLights: ActiveRcLight[] = [];
  private move: Vec2 = { x: 0, y: 0 };
  private invalidationTimer = -1;
  private melee: SimSnapshot['melee'] = [];
  private elapsed = 0;
  private graceRemaining = ROOM_START_GRACE_S;
  private warningRemaining = 0;
  private warningEnemyId: string | null = null;
  private missionScore: SimSnapshot['missionScore'] = null;

  start(): void {
    this.phase = GP.MISSION_PLAY;
    this.player = makePlayer();
    this.enemies = [createEnemy('flashlight_patrol', 'patrol_1', room.enemySpawns[0])];
    this.lightSources = [makeLamp()];
    this.activeLights = [this.lampAsActive()];
    this.move = { x: 0, y: 0 };
    this.invalidationTimer = -1;
    this.melee = [];
    this.elapsed = 0;
    this.graceRemaining = ROOM_START_GRACE_S;
    this.warningRemaining = 0;
    this.warningEnemyId = null;
    this.missionScore = null;
    this.emit({ kind: 'roomEnter', roomId: room.id });
  }

  step(dt: number): void {
    if (this.phase !== GP.MISSION_PLAY) return;
    this.elapsed += dt;
    this.graceRemaining = Math.max(0, this.graceRemaining - dt);
    const len = Math.hypot(this.move.x, this.move.y) || 1;
    const vx = (this.move.x / len) * PLAYER_SPEED_MAX;
    const vy = (this.move.y / len) * PLAYER_SPEED_MAX;
    this.player.velocity = { x: vx, y: vy };
    this.player.position.x = Math.max(1.45, Math.min(room.width - 1.45, this.player.position.x + vx * dt));
    this.player.position.y = Math.max(1.45, Math.min(room.height - 1.45, this.player.position.y + vy * dt));
    this.melee = this.melee.map((s) => ({ ...s, ttl: s.ttl - dt })).filter((s) => s.ttl > 0);
    const enemy = this.enemies[0];
    if (enemy.hp > 0) {
      enemy.facingAngle = Math.PI / 2 + Math.sin(this.elapsed * Math.PI * 2 * FLASHLIGHT_SWEEP_HZ) * Math.PI * 0.75;
      const detected = this.graceRemaining <= 0 && this.inFlashlightCone(enemy.position, enemy.facingAngle, this.player.position);
      if (detected && this.warningEnemyId === null) {
        this.warningEnemyId = enemy.id;
        this.warningRemaining = ENEMY_AIM_TELEGRAPH_S;
        enemy.state = 'alert';
        this.emit({ kind: 'detectionWarning', enemyId: enemy.id, position: { ...this.player.position }, secondsRemaining: ENEMY_AIM_TELEGRAPH_S });
      }
      if (!detected && this.warningEnemyId !== null) {
        this.warningEnemyId = null;
        this.warningRemaining = 0;
        enemy.state = 'patrol';
      } else if (this.warningEnemyId !== null) {
        this.warningRemaining = Math.max(0, this.warningRemaining - dt);
        if (this.warningRemaining === 0) this.killPlayer();
      }
    }
    if (this.invalidationTimer >= 0) {
      this.invalidationTimer -= dt;
      if (this.invalidationTimer <= 0) {
        const lamp = this.lightSources[0];
        lamp.invalidated = true;
        lamp.intensity = 0;
        this.activeLights = [];
        this.invalidationTimer = -1;
        this.emit({ kind: 'invalidateLight', lightId: lamp.id, position: { ...lamp.position } });
      }
    }
  }

  input(action: PlayerInput): void {
    if (action.kind === 'move') this.move = { ...action.dir };
    if (action.kind === 'aim') this.player.facingAngle = action.angle;
    if (action.kind === 'quitToTitle') this.phase = GP.TITLE;
    if (action.kind === 'attackStart' && this.phase === GP.MISSION_PLAY) this.attack();
  }

  snapshot(): SimSnapshot {
    return {
      phase: this.phase, paused: false, player: { ...this.player, position: { ...this.player.position }, velocity: { ...this.player.velocity } },
      enemies: this.enemies.map((e) => ({ ...e, position: { ...e.position }, velocity: { ...e.velocity } })),
      bullets: [], melee: this.melee.map((s) => ({ ...s, position: { ...s.position } })), grenades: [], thrownWeapons: [],
      activeLights: this.activeLights.map((l) => ({ ...l, position: { ...l.position } })),
      lightSources: this.lightSources.map((l) => ({ ...l, position: { ...l.position } })),
      currentRoom: this.phase === GP.TITLE ? null : room, currentMission: this.phase === GP.TITLE ? null : mission,
       missionScore: this.missionScore, elapsedSeconds: this.elapsed, spawnGraceRemaining: this.graceRemaining,
       detectionWarningRemaining: this.warningRemaining, lampsDestroyed: this.lightSources.filter((l) => l.state === 'dead').length,
       lights: RC_LIGHT_TABLE,
    };
  }

  private attack(): void {
    const lamp = this.lightSources[0];
    const dx = lamp.position.x - this.player.position.x;
    const dy = lamp.position.y - this.player.position.y;
    const distance = Math.hypot(dx, dy);
    const aimDelta = Math.abs(Math.atan2(Math.sin(Math.atan2(dy, dx) - this.player.facingAngle), Math.cos(Math.atan2(dy, dx) - this.player.facingAngle)));
    this.melee.push({ ownerId: 'player', weaponId: 'knife', position: { ...this.player.position }, facingAngle: this.player.facingAngle, range: 1.4, arcDeg: PLAYER_MELEE_ARC_DEG, ttl: PLAYER_MELEE_DURATION, damage: 1 });
    this.emit({ kind: 'melee', ownerId: 'player', weaponId: 'knife', position: { ...this.player.position }, angle: this.player.facingAngle });
    const result = lightSmash(lamp, aimDelta <= Math.PI / 6 ? distance : Infinity, 'melee');
    if (result.hit) {
      this.emit({ kind: 'lightSmash', lightId: lamp.id, position: { ...lamp.position }, hp: result.hp, state: result.state, cause: 'melee' });
    }
    if (lamp.state === 'dead' && this.invalidationTimer < 0 && !lamp.invalidated) this.invalidationTimer = LIGHT_POOL_DOWN_S;
    if (result.hit) return;
    const enemy = this.enemies[0];
    if (enemy.hp <= 0 || distanceBetween(this.player.position, enemy.position) > PLAYER_MELEE_RANGE || !this.aimsAt(enemy.position, Math.PI / 6)) return;
    if (!lamp.invalidated) {
      this.emit({ kind: 'attackBlocked', enemyId: enemy.id, position: { ...enemy.position } });
      return;
    }
    if (damageEnemy(enemy, 1)) {
      this.player.kills++;
      enemy.velocity = { x: 0, y: 0 };
      this.emit({ kind: 'enemyKilled', enemyId: enemy.id, position: { ...enemy.position } });
      this.finishMission();
    }
  }

  private lampAsActive(): ActiveRcLight {
    return { id: 'oil_lamp_1', kind: 'oil_lamp', position: { x: 5, y: 1 }, colorRgb: { r: 1, g: 0.79, b: 0.4 }, intensity: RC_LIGHT_TABLE.oil_lamp.intensity, radius: RC_LIGHT_TABLE.oil_lamp.radius, ttl: Infinity };
  }

  private emit(event: SimEvent): void {
    this.events.push(event);
    this.recentEvents.push(event);
    if (this.recentEvents.length > 64) this.recentEvents.shift();
  }

  private aimsAt(target: Vec2, maxDelta: number): boolean {
    const angle = Math.atan2(target.y - this.player.position.y, target.x - this.player.position.x);
    return Math.abs(Math.atan2(Math.sin(angle - this.player.facingAngle), Math.cos(angle - this.player.facingAngle))) <= maxDelta;
  }

  private inFlashlightCone(origin: Vec2, facing: number, target: Vec2): boolean {
    if (distanceBetween(origin, target) > 5) return false;
    const angle = Math.atan2(target.y - origin.y, target.x - origin.x);
    return Math.abs(Math.atan2(Math.sin(angle - facing), Math.cos(angle - facing))) <= FLASHLIGHT_CONE_ARC_DEG * Math.PI / 360;
  }

  private killPlayer(): void {
    if (this.phase !== GP.MISSION_PLAY) return;
    this.player.hp = 0;
    this.phase = GP.MISSION_DEATH;
    this.emit({ kind: 'playerKilled', position: { ...this.player.position }, cause: 'melee' });
  }

  private finishMission(): void {
    const total = Math.max(0, Math.round(100 - this.elapsed * 0.5));
    this.missionScore = { missionId: mission.id, timeSeconds: this.elapsed, pickupRate: 1, hitsTaken: this.player.hitsTaken, total, rating: total >= 90 ? 'S' : total >= 75 ? 'A' : total >= 60 ? 'B' : 'C' };
    this.phase = GP.SCORE;
    this.emit({ kind: 'roomClear', roomId: room.id });
    this.emit({ kind: 'missionEnd', score: this.missionScore });
  }
}

function distanceBetween(a: Vec2, b: Vec2): number { return Math.hypot(a.x - b.x, a.y - b.y); }
