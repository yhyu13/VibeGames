import type { SimEvent, SimSnapshot, Vec2 } from '../core/types';
import { FLASHLIGHT_CONE_ARC_DEG, NOISE_RING_TTL_S, PLAYER_MELEE_DURATION, PLAYER_MELEE_RANGE, PLAYER_MELEE_TARGET_RADIUS } from '../core/constants';
import { IntroSpriteRenderer } from './sprites/IntroSpriteRenderer';
import { visualCenter } from './renderCoordinates';

interface Particle { x: number; y: number; vx: number; vy: number; life: number; maxLife: number; kind: 'spark' | 'glass' }

export class SceneManager {
  // RC 合成激活时由 GameEngine 置 true:视线锥 telegraph 提高透明度补偿 final 的 base 压暗
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
  private jx = 0;
  private jy = 0;
  // v3.6:aimAngle 不再硬编码 10×9 —— render() 每帧登记当前房间尺寸,瞄准换算用实时值(为双房间铺路)
  private roomDims = { w: 10, h: 9 };

  constructor(host: HTMLElement) {
    const ctx = this.canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) throw new Error('Canvas2D unavailable');
    this.ctx = ctx;
    this.canvas.width = 720; this.canvas.height = 480; this.canvas.style.imageRendering = 'pixelated';
    host.appendChild(this.canvas);
    void this.sprites.preload();
  }

  handle(event: SimEvent): void {
    if (event.kind === 'lightSmash') {
      this.shake = 0.12;
      const impact = visualCenter(event.position);
      for (let i = 0; i < 8; i++) this.particles.push({ x: impact.x, y: impact.y, vx: Math.cos(i * Math.PI / 4) * (1 + i % 3), vy: Math.sin(i * Math.PI / 4) * (1 + i % 2), life: 0.35, maxLife: 0.35, kind: 'spark' });
      if (event.state === 'dead') for (let i = 0; i < 6; i++) this.particles.push({ x: impact.x, y: impact.y, vx: Math.cos(i * Math.PI / 3 + .2) * (1.2 + i % 2), vy: Math.sin(i * Math.PI / 3 + .2) * (1.2 + i % 3), life: 0.5, maxLife: 0.5, kind: 'glass' });
    }
    if (event.kind === 'invalidateLight') this.collapse = 0.3;
    if (event.kind === 'attackBlocked') this.blockFlash = 0.1;
    if (event.kind === 'enemyKilled') { this.killFlash = 0.1; this.shake = 0.12; }
  }

  /** RC 合成需要房间实际位置(含屏幕抖动)来压制房间外虚空的光贡献 */
  get shakeOffset(): { x: number; y: number } { return { x: this.jx, y: this.jy }; }

  /** v3.7:重开/继续时清除残留的全屏特效(白闪/红闪/抖动),避免 restart 首帧被覆盖增强 */
  clearTransientEffects(): void {
    this.shake = 0;
    this.collapse = 0;
    this.blockFlash = 0;
    this.killFlash = 0;
    this.jx = 0;
    this.jy = 0;
    this.particles = [];
  }

  aimAngle(clientX: number, clientY: number, player: Vec2): number {
    const roomWidth = this.roomDims.w;
    const roomHeight = this.roomDims.h;
    const rect = this.canvas.getBoundingClientRect();
    const scaleCss = Math.min(rect.width / (roomWidth + 2), rect.height / (roomHeight + 2));
    const originX = (rect.width - roomWidth * scaleCss) / 2;
    const originY = (rect.height - roomHeight * scaleCss) / 2;
    const worldX = (clientX - rect.left - originX) / scaleCss;
    const worldY = (clientY - rect.top - originY) / scaleCss;
    return Math.atan2(worldY - player.y - .5, worldX - player.x - .5);
  }

  render(s: SimSnapshot, dt: number): void {
    const c = this.ctx, w = this.canvas.width, h = this.canvas.height;
    this.elapsed += dt;
    c.setTransform(1, 0, 0, 1, 0, 0); c.fillStyle = '#08070c'; c.fillRect(0, 0, w, h);
    if (!s.currentRoom) return;
    this.roomDims = { w: s.currentRoom.width, h: s.currentRoom.height };
    const scale = Math.min(w / (s.currentRoom.width + 2), h / (s.currentRoom.height + 2)), ox = (w - s.currentRoom.width * scale) / 2, oy = (h - s.currentRoom.height * scale) / 2;
    this.shake = Math.max(0, this.shake - dt); this.collapse = Math.max(0, this.collapse - dt); this.blockFlash = Math.max(0, this.blockFlash - dt); this.killFlash = Math.max(0, this.killFlash - dt);
    const jx = this.shake > 0 ? Math.sin(this.shake * 870) * 5 : 0, jy = this.shake > 0 ? Math.cos(this.shake * 690) * 4 : 0;
    this.jx = jx; this.jy = jy;
    c.save(); c.translate(ox + jx, oy + jy);

    this.drawFloor(c, s, scale);
    this.drawWalls(c, s, scale);

    const searchlight = s.lightSources.find((light) => light.kind === 'searchlight');
    const tower = s.enemies.find((enemy) => enemy.role === 'tower_guard');
    const towerPowered = searchlight !== undefined && !searchlight.invalidated && searchlight.intensity > 0;

    for (let y = 0; y < s.currentRoom.height; y += 1) {
      for (let x = 0; x < s.currentRoom.width; x += 1) {
        const token = s.currentRoom.tiles[y][x];
        const tile = { x, y };
        if (token === 'X') this.drawSandbag(c, tile, scale);
        else if (token === 'N') this.drawNeonSign(c, tile, scale);
        else if (token === 'D') this.drawExit(c, tile, scale, s.exitActive);
      }
    }

    for (const spawn of s.currentRoom.weaponSpawns) this.drawWeaponPickup(c, spawn.tile, scale, spawn.weaponId);

    if (tower && searchlight) this.drawWatchtower(c, tower.position, tower.facingAngle, scale, tower.state, towerPowered);

    const lamp = s.lightSources.find((light) => light.kind === 'oil_lamp');
    if (lamp) {
      const lampVisual = visualCenter(lamp.position);
      // v3.2:删除手绘光圈/霓虹光晕盒——RC 已提供真实光池,几何描边在合成后读作"悬浮光环/光盒"伪影
      if (distanceBetween(s.player.position, lamp.position) <= PLAYER_MELEE_RANGE + PLAYER_MELEE_TARGET_RADIUS + 0.05 && lamp.state !== 'dead') {
        c.fillStyle = '#ffd06a'; c.font = `${Math.max(9, scale * .18)}px monospace`; c.textAlign = 'center';
        c.fillText(lamp.state === 'damaged' ? '再击一次 · RMB' : '已进入攻击范围 · RMB ×2', lampVisual.x * scale, lampVisual.y * scale - scale * .7);
      }
      if (!this.sprites.drawLamp(c, lampVisual.x * scale, lampVisual.y * scale, lamp.state, scale * 1.25)) this.drawLamp(c, lampVisual, lamp.state, scale * 1.25);
    }

    // v3.6 S4:遍历全部敌人——锥形 telegraph / 精灵 / 倒地 / 警觉标记逐敌渲染
    // 视线锥永远走 2D 场景 telegraph(低饱和),不参与 RC 发射平面:发射锥会读成独立发光层。
    // 先单独画锥并裁剪到房间内(含墙),避免 12u 塔楼锥伸到房间外虚空("出图")。
    c.save();
    c.beginPath(); c.rect(scale, scale, (s.currentRoom.width - 2) * scale, (s.currentRoom.height - 2) * scale); c.clip();
    for (const enemy of s.enemies) {
      if (enemy.hp > 0 && (enemy.role !== 'tower_guard' || towerPowered)) this.drawFlashlightCone(c, enemy.position, enemy.facingAngle, scale, enemy.state, enemy.role === 'tower_guard' ? 12 : 5);
    }
    c.restore();
    for (const enemy of s.enemies) {
      const enemyMoving = enemy.velocity.x * enemy.velocity.x + enemy.velocity.y * enemy.velocity.y > .001;
      if (enemy.role !== 'tower_guard') {
        if (enemy.hp > 0) {
          const enemyVisual = visualCenter(enemy.position);
          if (!this.sprites.drawActor(c, 'patrol', enemyVisual.x * scale, enemyVisual.y * scale, enemy.facingAngle, enemy.state === 'alert' || enemy.state === 'engaging' ? 'alert' : enemyMoving ? 'walk' : 'idle', this.elapsed, scale * 1.55)) this.drawEnemy(c, enemyVisual, enemy.facingAngle, scale);
        } else {
          const enemyVisual = visualCenter(enemy.position);
          c.save(); c.translate(enemyVisual.x * scale, enemyVisual.y * scale); c.rotate(enemy.facingAngle + Math.PI / 2); c.globalAlpha = .7; this.sprites.drawActor(c, 'patrol', 0, 0, 0, 'idle', this.elapsed, scale * 1.35); c.restore();
        }
      }
      // v3.5:警觉标记抬到精灵头顶上方(旧偏移 −0.65u 是占位矩形兵时代的值,v2 精灵高 ~1.55u,
      // 标记画在躯干上看不清);加大字号 + 深色描边,黄 '?'=suspicious,红 '!'=detected
      if (enemy.hp > 0 && enemy.awareness !== 'none') {
        const glyph = enemy.awareness === 'suspicious' ? '?' : '!';
        const markerVisual = visualCenter(enemy.position);
        const mx = markerVisual.x * scale, my = markerVisual.y * scale - scale * (enemy.role === 'tower_guard' ? .72 : 1.8);
        c.save(); c.textAlign = 'center'; c.font = `bold ${Math.max(20, scale * .5)}px monospace`; c.lineWidth = 4; c.strokeStyle = '#0a0910'; c.strokeText(glyph, mx, my); c.fillStyle = enemy.awareness === 'suspicious' ? '#ffd06a' : '#e63a30'; c.fillText(glyph, mx, my); c.restore();
      }
    }

    const playerMoving = s.player.velocity.x * s.player.velocity.x + s.player.velocity.y * s.player.velocity.y > .001;
    if (!this.sprites.drawActor(c, 'player', visualCenter(s.player.position).x * scale, visualCenter(s.player.position).y * scale, s.player.facingAngle, s.melee.length > 0 ? 'attack' : playerMoving ? 'walk' : 'idle', this.elapsed, scale * 1.55)) this.drawPlayer(c, visualCenter(s.player.position), s.player.facingAngle, scale, s.melee.length > 0);
    // v3.7: 枪口 2D 闪光
    const muzzleLights = s.activeLights.filter((light) => light.kind === 'muzzle_flash' && light.ttl !== Infinity && light.ttl > 0);
    if (muzzleLights.length > 0) {
      const mz = visualCenter(muzzleLights[0].position);
      const intensity = Math.min(1, muzzleLights[0].ttl / 0.08);
      c.save();
      c.translate(mz.x * scale, mz.y * scale);
      c.globalCompositeOperation = 'lighter';
      c.fillStyle = `rgba(255,180,80,${(0.9 * intensity).toFixed(3)})`;
      c.beginPath(); c.arc(0, 0, scale * 0.45, 0, Math.PI * 2); c.fill();
      c.fillStyle = `rgba(255,240,180,${(0.75 * intensity).toFixed(3)})`;
      c.beginPath(); c.arc(0, 0, scale * 0.2, 0, Math.PI * 2); c.fill();
      c.restore();
    }
    // 挥击扇形提示(v3.2):ttl 内按扇形角/有效触及画渐隐楔形,让"扇形近战"可见
    for (const swing of s.melee) {
      const fade = Math.max(0, Math.min(1, swing.ttl / PLAYER_MELEE_DURATION));
      const half = swing.arcDeg * Math.PI / 360;
      const swingVisual = visualCenter(swing.position);
      c.save(); c.translate(swingVisual.x * scale, swingVisual.y * scale); c.rotate(swing.facingAngle);
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
      const center = visualCenter(noise.position);
      c.beginPath(); c.arc(center.x * scale, center.y * scale, Math.max(2, noise.radius * progress * scale), 0, Math.PI * 2); c.stroke();
    }
    this.particles = this.particles.filter((p) => (p.life -= dt) > 0);
    for (const p of this.particles) {
      p.x += p.vx * dt; p.y += p.vy * dt;
      const frame = Math.floor((1 - p.life / p.maxLife) * 4);
      if (!this.sprites.drawEffect(c, p.kind, frame, p.x * scale, p.y * scale, scale * .65)) { c.fillStyle = p.kind === 'glass' ? '#b8dce8' : p.life > .15 ? '#ffd06a' : '#8d3a20'; c.fillRect(p.x * scale - 3, p.y * scale - 3, 6, 6); }
    }
    c.restore();
    const vignette = c.createRadialGradient(w * .5, h * .48, h * .18, w * .5, h * .48, h * .68);
    vignette.addColorStop(0, 'rgba(5,4,8,0)'); vignette.addColorStop(1, 'rgba(5,4,8,.48)');
    c.fillStyle = vignette; c.fillRect(0, 0, w, h);
    if (this.blockFlash > 0) { c.fillStyle = 'rgba(255,255,255,.55)'; c.fillRect(0, 0, w, h); }
    if (this.killFlash > 0) { c.fillStyle = 'rgba(216,32,26,.42)'; c.fillRect(0, 0, w, h); }
  }

  destroy(): void { this.canvas.remove(); }

  private drawFloor(c: CanvasRenderingContext2D, s: SimSnapshot, z: number): void {
    const room = s.currentRoom;
    if (!room) return;
    c.fillStyle = '#171218';
    c.fillRect(0, 0, room.width * z, room.height * z);
    for (let y = 1; y < room.height - 1; y += 1) {
      c.fillStyle = y % 2 === 0 ? '#24161a' : '#1e1418';
      c.fillRect(z, y * z, (room.width - 2) * z, z + 1);
      c.fillStyle = 'rgba(128,72,54,.12)';
      c.fillRect(z, y * z + z * .82, (room.width - 2) * z, Math.max(1, z * .05));
    }
    for (let y = 1; y < room.height - 1; y += 1) for (let x = 1; x < room.width - 1; x += 1) {
      if (room.tiles[y][x] === '#') continue;
      const detail = (x * 13 + y * 7) % 11;
      if (detail === 0) { c.fillStyle = 'rgba(220,139,83,.1)'; c.fillRect((x + .18) * z, (y + .28) * z, z * .48, Math.max(1, z * .04)); }
      else if (detail === 5) { c.fillStyle = 'rgba(6,5,8,.28)'; c.fillRect((x + .66) * z, (y + .18) * z, Math.max(1, z * .04), z * .48); }
    }
  }

  private drawWalls(c: CanvasRenderingContext2D, s: SimSnapshot, z: number): void {
    const room = s.currentRoom;
    if (!room) return;
    for (let y = 0; y < room.height; y += 1) for (let x = 0; x < room.width; x += 1) {
      if (room.tiles[y][x] !== '#') continue;
      const outer = x === 0 || y === 0 || x === room.width - 1 || y === room.height - 1;
      // v3.7: 右侧墙体不再用与左侧相同的暖亮红砖 —— 右上区域曾因墙块+霓虹+塔楼
      // 叠加读成 4/3 亮区。右侧统一用更暗的砖色，保留外墙红色剪影但压低高亮块。
      const rightHalf = x >= room.width / 2;
      c.fillStyle = outer
        ? (rightHalf ? '#2a1516' : '#32191b')
        : (rightHalf ? '#3a1c1a' : '#45211f');
      c.fillRect(x * z, y * z, z + 1, z + 1);
      c.fillStyle = outer
        ? (rightHalf ? '#45201c' : '#552822')
        : (rightHalf ? '#54271f' : '#6b3025');
      c.fillRect(x * z, y * z, z + 1, Math.max(2, z * .16));
      c.fillStyle = 'rgba(9,7,10,.48)';
      c.fillRect(x * z, (y + .82) * z, z + 1, z * .18);
      // 红砖高光细节：右侧降低强度，避免整片右侧墙块亮于左侧
      if ((x + y) % 3 === 0) {
        c.fillStyle = rightHalf ? 'rgba(150,66,42,.10)' : 'rgba(191,82,49,.18)';
        c.fillRect((x + .12) * z, (y + .34) * z, z * .54, Math.max(1, z * .05));
      }
    }
  }

  private drawWatchtower(c: CanvasRenderingContext2D, p: Vec2, angle: number, z: number, state: string, powered: boolean): void {
    p = visualCenter(p);
    c.save(); c.translate(p.x * z, p.y * z);
    c.fillStyle = '#09080c'; c.fillRect(-z * .6, -z * .54, z * 1.2, z * 1.08);
    c.fillStyle = '#39211d'; c.fillRect(-z * .5, -z * .44, z, z * .88);
    c.strokeStyle = powered ? '#f0a43d' : '#614945'; c.lineWidth = Math.max(2, z * .07); c.strokeRect(-z * .52, -z * .46, z * 1.04, z * .92);
    c.strokeStyle = '#8e563b'; c.lineWidth = Math.max(1, z * .035);
    c.beginPath(); c.moveTo(-z * .38, z * .42); c.lineTo(-z * .38, z * 1.08); c.moveTo(z * .38, z * .42); c.lineTo(z * .38, z * 1.08); c.stroke();
    c.fillStyle = '#cdb887'; c.beginPath(); c.arc(0, 0, z * .17, 0, Math.PI * 2); c.fill();
    c.save(); c.rotate(angle); c.fillStyle = powered ? '#cdd8e8' : '#443b3c'; c.fillRect(z * .05, -z * .13, z * .65, z * .26); c.fillStyle = powered ? '#d8c990' : '#171318'; c.fillRect(z * .55, -z * .09, z * .16, z * .18); c.restore();
    c.fillStyle = powered ? '#ffcc68' : '#80625b'; c.font = `bold ${Math.max(9, z * .2)}px monospace`; c.textAlign = 'center'; c.fillText(state === 'alert' || state === 'engaging' ? '警戒哨塔' : '哨塔', 0, -z * .68);
    c.restore();
  }

  private drawExit(c: CanvasRenderingContext2D, tile: Vec2, z: number, active: boolean): void {
    const p = tileCenter(tile);
    c.save(); c.translate(p.x * z, p.y * z);
    c.fillStyle = active ? 'rgba(50,118,91,.5)' : '#21171a'; c.fillRect(-z * .39, -z * .48, z * .78, z * .96);
    c.strokeStyle = active ? '#55d6a2' : '#8e5945'; c.lineWidth = Math.max(2, z * .06); c.strokeRect(-z * .39, -z * .48, z * .78, z * .96);
    c.fillStyle = active ? '#caffdc' : '#c69666'; c.beginPath(); c.arc(z * .23, 0, Math.max(2, z * .055), 0, Math.PI * 2); c.fill();
    c.font = `bold ${Math.max(9, z * .18)}px monospace`; c.textAlign = 'center'; c.fillStyle = active ? '#8ff0bd' : '#be9273'; c.fillText(active ? '撤离' : '封锁', 0, -z * .65);
    c.restore();
  }

  private drawWeaponPickup(c: CanvasRenderingContext2D, tile: Vec2, z: number, weaponId: string): void {
    const p = tileCenter(tile);
    c.save(); c.translate(p.x * z, p.y * z); c.rotate(-Math.PI / 5);
    c.fillStyle = 'rgba(255,192,76,.12)'; c.beginPath(); c.arc(0, 0, z * .38, 0, Math.PI * 2); c.fill();
    c.strokeStyle = '#ffe2a0'; c.lineWidth = Math.max(2, z * .075); c.beginPath(); c.moveTo(-z * .28, 0); c.lineTo(z * .24, 0); c.stroke();
    c.fillStyle = '#a34b2d'; c.fillRect(-z * .35, -z * .09, z * .16, z * .18); c.restore();
    c.save(); c.font = `${Math.max(8, z * .16)}px monospace`; c.textAlign = 'center'; c.fillStyle = '#e8c98c'; c.fillText(weaponId === 'knife' ? '小刀' : weaponId, p.x * z, (p.y + .68) * z); c.restore();
  }

  private drawPlayer(c: CanvasRenderingContext2D, p: Vec2, a: number, z: number, swing: boolean): void { c.save(); c.translate(p.x*z,p.y*z); c.rotate(a); c.fillStyle='#e8dca0'; c.fillRect(-z*.22,-z*.28,z*.44,z*.56); c.fillStyle='#d8201a'; c.fillRect(-z*.18,-z*.32,z*.36,z*.13); c.strokeStyle='#eaf4ff'; c.lineWidth=4; c.beginPath(); c.moveTo(z*.18,0); c.lineTo(z*(swing?.9:.55),swing?z*.28:0); c.stroke(); c.restore(); }
  private drawEnemy(c: CanvasRenderingContext2D, p: Vec2, a: number, z: number): void { c.save(); c.translate(p.x*z,p.y*z); c.rotate(a); c.fillStyle='#586a52'; c.fillRect(-z*.25,-z*.3,z*.5,z*.6); c.fillStyle='#ded2a0'; c.fillRect(-z*.18,-z*.38,z*.36,z*.18); c.fillStyle='rgba(220,235,255,.16)'; c.beginPath(); c.moveTo(z*.2,0); c.arc(0,0,z*2,-.43,.43); c.fill(); c.restore(); }
  private drawLamp(c: CanvasRenderingContext2D, p: Vec2, state: string, z: number): void { c.save(); c.translate(p.x*z,p.y*z); c.fillStyle=state==='dead'?'#382e2b':state==='damaged'?'#e07932':'#ffcf62'; c.fillRect(-z*.14,-z*.24,z*.28,z*.38); c.strokeStyle='#1d1515'; c.lineWidth=3; c.strokeRect(-z*.14,-z*.24,z*.28,z*.38); if(state==='damaged'){c.beginPath();c.moveTo(-z*.12,-z*.15);c.lineTo(z*.1,z*.08);c.stroke();} if(state==='dead'){c.fillStyle='#171318';c.fillRect(-z*.2,-z*.05,z*.4,z*.08);} c.restore(); }
  // 低饱和 gameplay telegraph;不把视野状态画成主环境光。RC 合成时 base 暗区被 final 压到 0.5,
  // 用 rcActive 补偿系数保持暗场可读,但仍是场景内嵌 tint,不是发光层。
  private drawFlashlightCone(c: CanvasRenderingContext2D, p: Vec2, angle: number, z: number, state: string, length = 5): void { p=visualCenter(p); const half = FLASHLIGHT_CONE_ARC_DEG * Math.PI / 360; const rgb = state === 'alert' || state === 'engaging' ? '168,112,102' : state === 'suspicious' ? '176,158,104' : '126,146,134'; const k = this.rcActive ? 1.8 : 1; c.save(); c.translate(p.x*z,p.y*z); c.rotate(angle); c.fillStyle=`rgba(${rgb},${(.08*k).toFixed(3)})`; c.beginPath(); c.moveTo(z*.2,0); c.arc(0,0,z*length,-half,half); c.closePath(); c.fill(); c.strokeStyle=`rgba(${rgb},${(.2*k).toFixed(3)})`; c.lineWidth=1.5; c.beginPath(); c.arc(0,0,z*length,-half,half); c.stroke(); c.restore(); }
  // v3.3:视觉中心对齐 SDF——X occluder 占整格 [tile.x,tile.x+1],sprite 以格心为锚,修半格偏移
  private drawSandbag(c: CanvasRenderingContext2D, tile: Vec2, z: number): void { const p = tileCenter(tile); c.save(); c.translate(p.x*z,p.y*z); c.fillStyle='#241c12'; c.fillRect(-z*.44,-z*.34,z*.88,z*.72); c.fillStyle='#6d5c38'; c.fillRect(-z*.4,z*.02,z*.38,z*.3); c.fillRect(z*.02,z*.02,z*.38,z*.3); c.fillStyle='#7d6b42'; c.fillRect(-z*.21,-z*.3,z*.42,z*.3); c.strokeStyle='#3a2f1d'; c.lineWidth=2; c.strokeRect(-z*.4,z*.02,z*.38,z*.3); c.strokeRect(z*.02,z*.02,z*.38,z*.3); c.strokeRect(-z*.21,-z*.3,z*.42,z*.3); c.restore(); }
  // v3.7: 霓虹发光体缩到半格内、脉冲上限从 .9 降到 .62,避免右上霓虹与墙块/塔楼叠加过亮
  private drawNeonSign(c: CanvasRenderingContext2D, tile: Vec2, z: number): void {
    const p = tileCenter(tile);
    const alpha = (0.5 + 0.12 * Math.sin(this.elapsed * Math.PI)).toFixed(3);
    c.save();
    c.translate(p.x * z, p.y * z);
    c.fillStyle = '#101419';
    c.fillRect(-z * .34, -z * .38, z * .68, z * .76);
    c.strokeStyle = `rgba(58,216,255,${alpha})`;
    c.lineWidth = Math.max(2, z * .05);
    c.strokeRect(-z * .26, -z * .28, z * .52, z * .56);
    c.fillStyle = `rgba(58,216,255,${alpha})`;
    c.font = `bold ${Math.max(10, z * .24)}px sans-serif`;
    c.textAlign = 'center';
    c.fillText('舞', 0, z * .08);
    c.restore();
  }
}

function tileCenter(tile: Vec2): Vec2 { return visualCenter(tile); }
function distanceBetween(a: Vec2, b: Vec2): number { return Math.hypot(a.x - b.x, a.y - b.y); }
