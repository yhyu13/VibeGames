import type { SimEvent, SimSnapshot, Vec2 } from '../core/types';
import { FLASHLIGHT_CONE_ARC_DEG, NOISE_RING_TTL_S, PLAYER_MELEE_DURATION, PLAYER_MELEE_RANGE, PLAYER_MELEE_TARGET_RADIUS } from '../core/constants';
import { IntroSpriteRenderer } from './sprites/IntroSpriteRenderer';

interface Particle { x: number; y: number; vx: number; vy: number; life: number; maxLife: number; kind: 'spark' | 'glass' }

export class SceneManager {
  // RC 合成激活时由 GameEngine 置 true:2D 手电锥 telegraph 让位给 RC 发射锥,避免双重渲染
  rcActive = false;
  readonly canvas = document.createElement('canvas');
  private readonly ctx: CanvasRenderingContext2D;
  private particles: Particle[] = [];
  private readonly sprites = new IntroSpriteRenderer();
  private shake = 0;
  private collapse = 0;
  private elapsed = 0;
  private blockFlash = 0;
  private killFlash = 0;
  // v3.6:aimAngle 不再硬编码 10×9 —— render() 每帧登记当前房间尺寸,瞄准换算用实时值(为双房间铺路)
  private roomDims = { w: 10, h: 9 };
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
    const roomWidth = this.roomDims.w;
    const roomHeight = this.roomDims.h;
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
    this.roomDims = { w: s.currentRoom.width, h: s.currentRoom.height };
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
    for (const f of s.currentRoom.furniture ?? []) {
      if (f.kind === 'sandbag') { if (!this.sprites.drawStatic(c, 'sandbag', f.tile.x * scale, f.tile.y * scale, scale)) this.drawSandbag(c, f.tile, scale); }
      else if (f.kind === 'neon_sign') { if (!this.sprites.drawStatic(c, 'neon_sign', f.tile.x * scale, f.tile.y * scale, scale)) this.drawNeonSign(c, f.tile, scale); }
    }
    if (s.exitActive && s.currentRoom.exitTile) {
      if (!this.sprites.drawStatic(c, 'exit', s.currentRoom.exitTile.x * scale, s.currentRoom.exitTile.y * scale, scale * 1.2)) {
        c.save(); c.translate(s.currentRoom.exitTile.x * scale, s.currentRoom.exitTile.y * scale); c.strokeStyle = '#55d6a2'; c.lineWidth = 3; c.strokeRect(-scale * .35, -scale * .45, scale * .7, scale * .9); c.fillStyle = 'rgba(85,214,162,.15)'; c.fillRect(-scale * .35, -scale * .45, scale * .7, scale * .9); c.restore();
      }
      c.fillStyle = '#55d6a2'; c.font = `${Math.max(10, scale * .22)}px monospace`; c.textAlign = 'center'; c.fillText('撤离', s.currentRoom.exitTile.x * scale, s.currentRoom.exitTile.y * scale - scale * .6);
    }
    const lamp = s.lightSources[0];
    // v3.2:删除手绘光圈/霓虹光晕盒——RC 已提供真实光池,几何描边在合成后读作"悬浮光环/光盒"伪影
    if (distanceBetween(s.player.position, lamp.position) <= PLAYER_MELEE_RANGE + PLAYER_MELEE_TARGET_RADIUS + 0.05 && lamp.state !== 'dead') { c.fillStyle = '#ffd06a'; c.font = `${Math.max(9, scale * .18)}px monospace`; c.textAlign = 'center'; c.fillText(lamp.state === 'damaged' ? '再击一次 · RMB' : '已进入攻击范围 · RMB ×2', lamp.position.x * scale, lamp.position.y * scale - scale * .7); }
    if (!this.sprites.drawLamp(c, lamp.position.x * scale, lamp.position.y * scale, lamp.state, scale * 1.25)) this.drawLamp(c, lamp.position, lamp.state, scale * 1.25);
    // v3.6 S4:遍历全部敌人——锥形 telegraph / 精灵 / 倒地 / 警觉标记逐敌渲染
    for (const enemy of s.enemies) {
    if (enemy.hp > 0 && !this.rcActive) this.drawFlashlightCone(c, enemy.position, enemy.facingAngle, scale, enemy.state);
    const enemyMoving = enemy.velocity.x * enemy.velocity.x + enemy.velocity.y * enemy.velocity.y > .001;
    if (enemy.hp > 0) {
      if (!this.sprites.drawActor(c, 'patrol', enemy.position.x * scale, enemy.position.y * scale, enemy.facingAngle, enemy.state === 'alert' || enemy.state === 'engaging' ? 'alert' : enemyMoving ? 'walk' : 'idle', this.elapsed, scale * 1.55)) this.drawEnemy(c, enemy.position, enemy.facingAngle, scale);
    } else {
      c.save(); c.translate(enemy.position.x * scale, enemy.position.y * scale); c.rotate(enemy.facingAngle + Math.PI / 2); c.globalAlpha = .7; this.sprites.drawActor(c, 'patrol', 0, 0, 0, 'idle', this.elapsed, scale * 1.35); c.restore();
      }
      // v3.5:警觉标记抬到精灵头顶上方(旧偏移 −0.65u 是占位矩形兵时代的值,v2 精灵高 ~1.55u,
      // 标记画在躯干上看不清);加大字号 + 深色描边,黄 '?'=suspicious,红 '!'=detected
      if (enemy.hp > 0 && enemy.awareness !== 'none') { const glyph = enemy.awareness === 'suspicious' ? '?' : '!'; const mx = enemy.position.x * scale, my = enemy.position.y * scale - scale * 1.8; c.save(); c.textAlign = 'center'; c.font = `bold ${Math.max(20, scale * .5)}px monospace`; c.lineWidth = 4; c.strokeStyle = '#0a0910'; c.strokeText(glyph, mx, my); c.fillStyle = enemy.awareness === 'suspicious' ? '#ffd06a' : '#e63a30'; c.fillText(glyph, mx, my); c.restore(); }
    }
    const playerMoving = s.player.velocity.x * s.player.velocity.x + s.player.velocity.y * s.player.velocity.y > .001;
    if (!this.sprites.drawActor(c, 'player', s.player.position.x * scale, s.player.position.y * scale, s.player.facingAngle, s.melee.length > 0 ? 'attack' : playerMoving ? 'walk' : 'idle', this.elapsed, scale * 1.55)) this.drawPlayer(c, s.player.position, s.player.facingAngle, scale, s.melee.length > 0);
    // 挥击扇形提示(v3.2):ttl 内按扇形角/有效触及画渐隐楔形,让"扇形近战"可见
    for (const swing of s.melee) {
      const fade = Math.max(0, Math.min(1, swing.ttl / PLAYER_MELEE_DURATION));
      const half = swing.arcDeg * Math.PI / 360;
      c.save(); c.translate(swing.position.x * scale, swing.position.y * scale); c.rotate(swing.facingAngle);
      c.fillStyle = `rgba(255,170,58,${(.24 * fade).toFixed(3)})`;
      c.beginPath(); c.moveTo(0, 0); c.arc(0, 0, swing.range * scale, -half, half); c.closePath(); c.fill();
      c.strokeStyle = `rgba(255,208,106,${(.55 * fade).toFixed(3)})`; c.lineWidth = 2;
      c.beginPath(); c.arc(0, 0, swing.range * scale, -half, half); c.stroke();
      c.restore();
    }
    // v3.6 S3:噪音扩散环——玩法提示(听觉广播可视化),不是光;同 ?/! 标记走 2D 画布(doc-26 §4)
    for (const noise of s.noises) {
      const progress = 1 - Math.max(0, noise.ttl) / NOISE_RING_TTL_S;
      const alpha = ((1 - progress) * 0.55).toFixed(3);
      c.strokeStyle = noise.kind === 'gunshot' ? `rgba(255,90,58,${alpha})` : noise.kind === 'lamp_smash' ? `rgba(255,208,106,${alpha})` : noise.kind === 'shout' ? `rgba(255,58,102,${alpha})` : `rgba(154,208,192,${alpha})`;
      c.lineWidth = 2;
      c.beginPath(); c.arc(noise.position.x * scale, noise.position.y * scale, Math.max(2, noise.radius * progress * scale), 0, Math.PI * 2); c.stroke();
    }
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
  // v3.5:RC 关闭时的 2D telegraph 锥与 RC 发射锥同状态色(巡逻绿/警觉黄/发现红)
  private drawFlashlightCone(c: CanvasRenderingContext2D, p: Vec2, angle: number, z: number, state: string): void { const half = FLASHLIGHT_CONE_ARC_DEG * Math.PI / 360; const rgb = state === 'alert' || state === 'engaging' ? '214,80,60' : state === 'suspicious' ? '230,190,70' : '110,200,120'; c.save(); c.translate(p.x*z,p.y*z); c.rotate(angle); c.fillStyle=`rgba(${rgb},.12)`; c.beginPath(); c.moveTo(z*.2,0); c.arc(0,0,z*5,-half,half); c.closePath(); c.fill(); c.strokeStyle=`rgba(${rgb},.26)`; c.lineWidth=1.5; c.beginPath(); c.arc(0,0,z*5,-half,half); c.stroke(); c.restore(); }
  // v3.3:视觉中心对齐 SDF——X occluder 占整格 [tile.x,tile.x+1],sprite 以格心为锚,修半格偏移
  private drawSandbag(c: CanvasRenderingContext2D, tile: Vec2, z: number): void { c.save(); c.translate((tile.x+.5)*z,(tile.y+.5)*z); c.fillStyle='#241c12'; c.fillRect(-z*.44,-z*.34,z*.88,z*.72); c.fillStyle='#6d5c38'; c.fillRect(-z*.4,z*.02,z*.38,z*.3); c.fillRect(z*.02,z*.02,z*.38,z*.3); c.fillStyle='#7d6b42'; c.fillRect(-z*.21,-z*.3,z*.42,z*.3); c.strokeStyle='#3a2f1d'; c.lineWidth=2; c.strokeRect(-z*.4,z*.02,z*.38,z*.3); c.strokeRect(z*.02,z*.02,z*.38,z*.3); c.strokeRect(-z*.21,-z*.3,z*.42,z*.3); c.restore(); }
  private drawNeonSign(c: CanvasRenderingContext2D, tile: Vec2, z: number): void { const pulse=.65+.3*Math.sin(this.elapsed*Math.PI); c.save(); c.translate(tile.x*z,tile.y*z); c.fillStyle=`rgba(58,216,255,${.85*pulse})`; c.fillRect(-z*.3,-z*.38,z*.6,z*.16); c.fillRect(-z*.3,-z*.08,z*.6,z*.16); c.fillStyle=`rgba(8,20,26,${.9})`; c.fillRect(-z*.22,-z*.34,z*.2,z*.08); c.fillRect(-z*.22,-z*.04,z*.2,z*.08); c.restore(); }
}

function distanceBetween(a: Vec2, b: Vec2): number { return Math.hypot(a.x - b.x, a.y - b.y); }
