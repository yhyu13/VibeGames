import type { SimEvent, SimSnapshot, Vec2 } from '../core/types';
import { IntroSpriteRenderer } from './sprites/IntroSpriteRenderer';

interface Particle { x: number; y: number; vx: number; vy: number; life: number; maxLife: number; kind: 'spark' | 'glass' }

export class SceneManager {
  readonly canvas = document.createElement('canvas');
  private readonly ctx: CanvasRenderingContext2D;
  private particles: Particle[] = [];
  private readonly sprites = new IntroSpriteRenderer();
  private shake = 0;
  private collapse = 0;
  private elapsed = 0;
  private blockFlash = 0;
  private killFlash = 0;
  constructor(host: HTMLElement) {
    const ctx = this.canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) throw new Error('Canvas2D unavailable');
    this.ctx = ctx;
    this.canvas.width = 480; this.canvas.height = 432; this.canvas.style.imageRendering = 'pixelated';
    host.appendChild(this.canvas);
    void this.sprites.preload();
  }
  handle(event: SimEvent): void {
    if (event.kind === 'lightSmash') {
      this.shake = 0.12;
      for (let i = 0; i < 8; i++) this.particles.push({ x: event.position.x, y: event.position.y, vx: Math.cos(i * Math.PI / 4) * (1 + i % 3), vy: Math.sin(i * Math.PI / 4) * (1 + i % 2), life: 0.35, maxLife: 0.35, kind: 'spark' });
      if (event.state === 'dead') for (let i = 0; i < 6; i++) this.particles.push({ x: event.position.x, y: event.position.y, vx: Math.cos(i * Math.PI / 3 + .2) * (1.2 + i % 2), vy: Math.sin(i * Math.PI / 3 + .2) * (1.2 + i % 3), life: 0.5, maxLife: 0.5, kind: 'glass' });
    }
    if (event.kind === 'invalidateLight') this.collapse = 0.3;
    if (event.kind === 'attackBlocked') this.blockFlash = 0.1;
    if (event.kind === 'enemyKilled') { this.killFlash = 0.1; this.shake = 0.12; }
  }
  aimAngle(clientX: number, clientY: number, player: Vec2): number {
    const roomWidth = 10;
    const roomHeight = 9;
    const rect = this.canvas.getBoundingClientRect();
    const scaleCss = Math.min(rect.width / 12, rect.height / 11);
    const originX = (rect.width - roomWidth * scaleCss) / 2;
    const originY = (rect.height - roomHeight * scaleCss) / 2;
    const worldX = (clientX - rect.left - originX) / scaleCss;
    const worldY = (clientY - rect.top - originY) / scaleCss;
    return Math.atan2(worldY - player.y, worldX - player.x);
  }
  render(s: SimSnapshot, dt: number): void {
    const c = this.ctx, w = this.canvas.width, h = this.canvas.height;
    this.elapsed += dt;
    c.setTransform(1, 0, 0, 1, 0, 0); c.fillStyle = '#08070c'; c.fillRect(0, 0, w, h);
    if (!s.currentRoom) return;
    const scale = Math.min(w / 12, h / 11), ox = (w - s.currentRoom.width * scale) / 2, oy = (h - s.currentRoom.height * scale) / 2;
    this.shake = Math.max(0, this.shake - dt); this.collapse = Math.max(0, this.collapse - dt); this.blockFlash = Math.max(0, this.blockFlash - dt); this.killFlash = Math.max(0, this.killFlash - dt);
    const jx = this.shake > 0 ? Math.sin(this.shake * 870) * 5 : 0, jy = this.shake > 0 ? Math.cos(this.shake * 690) * 4 : 0;
    c.save(); c.translate(ox + jx, oy + jy);
    for (let y = 0; y < s.currentRoom.height; y++) for (let x = 0; x < s.currentRoom.width; x++) {
      const wall = s.currentRoom.tiles[y][x] === '#';
      if (!this.sprites.drawStatic(c, wall ? 'brick' : 'ground', (x + .5) * scale, (y + .5) * scale, scale + 1)) {
        c.fillStyle = wall ? ((x + y) % 2 ? '#64261f' : '#773126') : (y % 2 ? '#281217' : '#35161a'); c.fillRect(x * scale, y * scale, scale + 1, scale + 1);
        if (wall) { c.strokeStyle = '#a64a30'; c.strokeRect(x * scale + 2, y * scale + 2, scale - 4, scale - 4); }
      }
    }
    this.sprites.drawStatic(c, 'shikumen', 5 * scale, .72 * scale, scale * 1.65);
    if (s.exitActive && s.currentRoom.exitTile) {
      c.save(); c.translate(s.currentRoom.exitTile.x * scale, s.currentRoom.exitTile.y * scale); c.strokeStyle = '#55d6a2'; c.lineWidth = 3; c.strokeRect(-scale * .35, -scale * .45, scale * .7, scale * .9); c.fillStyle = 'rgba(85,214,162,.15)'; c.fillRect(-scale * .35, -scale * .45, scale * .7, scale * .9); c.restore();
      c.fillStyle = '#55d6a2'; c.font = `${Math.max(10, scale * .22)}px monospace`; c.textAlign = 'center'; c.fillText('撤离', s.currentRoom.exitTile.x * scale, s.currentRoom.exitTile.y * scale - scale * .6);
    }
    const lamp = s.lightSources[0];
    if (lamp.state !== 'dead') { c.save(); c.translate(lamp.position.x * scale, lamp.position.y * scale); c.strokeStyle = lamp.state === 'damaged' ? '#ff9b52' : '#ffd06a'; c.globalAlpha = .55 + Math.sin(this.elapsed * 5) * .2; c.lineWidth = 2; c.beginPath(); c.arc(0, 0, scale * .58, 0, Math.PI * 2); c.stroke(); c.restore(); }
    if (distanceBetween(s.player.position, lamp.position) <= 2.05 && lamp.state !== 'dead') { c.fillStyle = '#ffd06a'; c.font = `${Math.max(9, scale * .18)}px monospace`; c.textAlign = 'center'; c.fillText(lamp.state === 'damaged' ? '再击一次 · LMB' : '瞄准油灯 · LMB ×2', lamp.position.x * scale, lamp.position.y * scale - scale * .7); }
    if (!this.sprites.drawLamp(c, lamp.position.x * scale, lamp.position.y * scale, lamp.state, scale * 1.25)) this.drawLamp(c, lamp.position, lamp.state, scale * 1.25);
    const enemy = s.enemies[0];
    if (enemy.hp > 0 && !lamp.invalidated) this.drawFlashlightCone(c, enemy.position, enemy.facingAngle, scale);
    const enemyMoving = enemy.velocity.x * enemy.velocity.x + enemy.velocity.y * enemy.velocity.y > .001;
    if (enemy.hp > 0) {
      if (!this.sprites.drawActor(c, 'patrol', enemy.position.x * scale, enemy.position.y * scale, enemy.facingAngle, enemy.state === 'alert' || enemy.state === 'engaging' ? 'alert' : enemyMoving ? 'walk' : 'idle', this.elapsed, scale * 1.35)) this.drawEnemy(c, enemy.position, enemy.facingAngle, scale);
    } else {
      c.save(); c.translate(enemy.position.x * scale, enemy.position.y * scale); c.rotate(enemy.facingAngle + Math.PI / 2); c.globalAlpha = .7; this.sprites.drawActor(c, 'patrol', 0, 0, 0, 'idle', this.elapsed, scale * 1.35); c.restore();
    }
    const playerMoving = s.player.velocity.x * s.player.velocity.x + s.player.velocity.y * s.player.velocity.y > .001;
    if (!this.sprites.drawActor(c, 'player', s.player.position.x * scale, s.player.position.y * scale, s.player.facingAngle, s.melee.length > 0 ? 'attack' : playerMoving ? 'walk' : 'idle', this.elapsed, scale * 1.35)) this.drawPlayer(c, s.player.position, s.player.facingAngle, scale, s.melee.length > 0);
    this.particles = this.particles.filter((p) => (p.life -= dt) > 0);
    for (const p of this.particles) { p.x += p.vx * dt; p.y += p.vy * dt; const frame = Math.floor((1 - p.life / p.maxLife) * 4); if (!this.sprites.drawEffect(c, p.kind, frame, p.x * scale, p.y * scale, scale * .65)) { c.fillStyle = p.kind === 'glass' ? '#b8dce8' : p.life > .15 ? '#ffd06a' : '#8d3a20'; c.fillRect(p.x * scale - 3, p.y * scale - 3, 6, 6); } }
    c.restore();
    const vignette = c.createRadialGradient(w * .5, h * .48, h * .18, w * .5, h * .48, h * .68);
    vignette.addColorStop(0, 'rgba(5,4,8,0)'); vignette.addColorStop(1, 'rgba(5,4,8,.48)');
    c.fillStyle = vignette; c.fillRect(0, 0, w, h);
    if (this.blockFlash > 0) { c.fillStyle = 'rgba(255,255,255,.55)'; c.fillRect(0, 0, w, h); }
    if (this.killFlash > 0) { c.fillStyle = 'rgba(216,32,26,.42)'; c.fillRect(0, 0, w, h); }
  }
  destroy(): void { this.canvas.remove(); }
  private drawPlayer(c: CanvasRenderingContext2D, p: Vec2, a: number, z: number, swing: boolean): void { c.save(); c.translate(p.x*z,p.y*z); c.rotate(a); c.fillStyle='#e8dca0'; c.fillRect(-z*.22,-z*.28,z*.44,z*.56); c.fillStyle='#d8201a'; c.fillRect(-z*.18,-z*.32,z*.36,z*.13); c.strokeStyle='#eaf4ff'; c.lineWidth=4; c.beginPath(); c.moveTo(z*.18,0); c.lineTo(z*(swing?.9:.55),swing?z*.28:0); c.stroke(); c.restore(); }
  private drawEnemy(c: CanvasRenderingContext2D, p: Vec2, a: number, z: number): void { c.save(); c.translate(p.x*z,p.y*z); c.rotate(a); c.fillStyle='#586a52'; c.fillRect(-z*.25,-z*.3,z*.5,z*.6); c.fillStyle='#ded2a0'; c.fillRect(-z*.18,-z*.38,z*.36,z*.18); c.fillStyle='rgba(220,235,255,.16)'; c.beginPath(); c.moveTo(z*.2,0); c.arc(0,0,z*2,-.43,.43); c.fill(); c.restore(); }
  private drawLamp(c: CanvasRenderingContext2D, p: Vec2, state: string, z: number): void { c.save(); c.translate(p.x*z,p.y*z); c.fillStyle=state==='dead'?'#382e2b':state==='damaged'?'#e07932':'#ffcf62'; c.fillRect(-z*.14,-z*.24,z*.28,z*.38); c.strokeStyle='#1d1515'; c.lineWidth=3; c.strokeRect(-z*.14,-z*.24,z*.28,z*.38); if(state==='damaged'){c.beginPath();c.moveTo(-z*.12,-z*.15);c.lineTo(z*.1,z*.08);c.stroke();} if(state==='dead'){c.fillStyle='#171318';c.fillRect(-z*.2,-z*.05,z*.4,z*.08);} c.restore(); }
  private drawFlashlightCone(c: CanvasRenderingContext2D, p: Vec2, angle: number, z: number): void { c.save(); c.translate(p.x*z,p.y*z); c.rotate(angle); const gradient=c.createLinearGradient(0,0,z*5,0); gradient.addColorStop(0,'rgba(255,230,150,.3)'); gradient.addColorStop(1,'rgba(255,230,150,0)'); c.fillStyle=gradient; c.beginPath(); c.moveTo(0,0); c.arc(0,0,z*5,-25*Math.PI/180,25*Math.PI/180); c.closePath(); c.fill(); c.restore(); }
}

function distanceBetween(a: Vec2, b: Vec2): number { return Math.hypot(a.x - b.x, a.y - b.y); }
