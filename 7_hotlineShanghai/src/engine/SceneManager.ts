import type { SimEvent, SimSnapshot, Vec2 } from '../core/types';

interface Particle { x: number; y: number; vx: number; vy: number; life: number }

export class SceneManager {
  readonly canvas = document.createElement('canvas');
  private readonly ctx: CanvasRenderingContext2D;
  private particles: Particle[] = [];
  private shake = 0;
  private collapse = 0;
  constructor(host: HTMLElement) {
    const ctx = this.canvas.getContext('2d');
    if (!ctx) throw new Error('Canvas2D unavailable');
    this.ctx = ctx;
    this.canvas.style.width = '100%'; this.canvas.style.height = '100%'; this.canvas.style.imageRendering = 'pixelated';
    host.appendChild(this.canvas);
    this.resize(); window.addEventListener('resize', this.resize);
  }
  handle(event: SimEvent): void {
    if (event.kind === 'lightSmash') {
      this.shake = 0.12;
      for (let i = 0; i < 8; i++) this.particles.push({ x: event.position.x, y: event.position.y, vx: Math.cos(i * Math.PI / 4) * (1 + i % 3), vy: Math.sin(i * Math.PI / 4) * (1 + i % 2), life: 0.35 });
    }
    if (event.kind === 'invalidateLight') this.collapse = 0.3;
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
    c.setTransform(1, 0, 0, 1, 0, 0); c.fillStyle = '#08070c'; c.fillRect(0, 0, w, h);
    if (!s.currentRoom) return;
    const scale = Math.min(w / 12, h / 11), ox = (w - s.currentRoom.width * scale) / 2, oy = (h - s.currentRoom.height * scale) / 2;
    this.shake = Math.max(0, this.shake - dt); this.collapse = Math.max(0, this.collapse - dt);
    const jx = this.shake > 0 ? Math.sin(this.shake * 870) * 5 : 0, jy = this.shake > 0 ? Math.cos(this.shake * 690) * 4 : 0;
    c.save(); c.translate(ox + jx, oy + jy);
    for (let y = 0; y < s.currentRoom.height; y++) for (let x = 0; x < s.currentRoom.width; x++) {
      const wall = s.currentRoom.tiles[y][x] === '#'; c.fillStyle = wall ? ((x + y) % 2 ? '#64261f' : '#773126') : (y % 2 ? '#281217' : '#35161a');
      c.fillRect(x * scale, y * scale, scale + 1, scale + 1);
      if (wall) { c.strokeStyle = '#a64a30'; c.strokeRect(x * scale + 2, y * scale + 2, scale - 4, scale - 4); }
    }
    const lamp = s.lightSources[0];
    if (!lamp.invalidated || this.collapse > 0) {
      const radius = scale * 3.5 * (this.collapse > 0 ? this.collapse / 0.3 : 1);
      const g = c.createRadialGradient(lamp.position.x * scale, lamp.position.y * scale, 0, lamp.position.x * scale, lamp.position.y * scale, radius);
      g.addColorStop(0, 'rgba(255,190,80,.62)'); g.addColorStop(1, 'rgba(255,100,20,0)'); c.fillStyle = g; c.fillRect(0, 0, s.currentRoom.width * scale, s.currentRoom.height * scale);
    }
    this.drawLamp(c, lamp.position, lamp.state, scale);
    const enemy = s.enemies[0]; this.drawEnemy(c, enemy.position, enemy.facingAngle, scale);
    this.drawPlayer(c, s.player.position, s.player.facingAngle, scale, s.melee.length > 0);
    this.particles = this.particles.filter((p) => (p.life -= dt) > 0);
    for (const p of this.particles) { p.x += p.vx * dt; p.y += p.vy * dt; c.fillStyle = p.life > .15 ? '#ffd06a' : '#8d3a20'; c.fillRect(p.x * scale - 3, p.y * scale - 3, 6, 6); }
    c.restore();
  }
  destroy(): void { window.removeEventListener('resize', this.resize); this.canvas.remove(); }
  private resize = (): void => { const dpr = Math.min(devicePixelRatio, 2); this.canvas.width = Math.floor(this.canvas.clientWidth * dpr); this.canvas.height = Math.floor(this.canvas.clientHeight * dpr); };
  private drawPlayer(c: CanvasRenderingContext2D, p: Vec2, a: number, z: number, swing: boolean): void { c.save(); c.translate(p.x*z,p.y*z); c.rotate(a); c.fillStyle='#e8dca0'; c.fillRect(-z*.22,-z*.28,z*.44,z*.56); c.fillStyle='#d8201a'; c.fillRect(-z*.18,-z*.32,z*.36,z*.13); c.strokeStyle='#eaf4ff'; c.lineWidth=4; c.beginPath(); c.moveTo(z*.18,0); c.lineTo(z*(swing?.9:.55),swing?z*.28:0); c.stroke(); c.restore(); }
  private drawEnemy(c: CanvasRenderingContext2D, p: Vec2, a: number, z: number): void { c.save(); c.translate(p.x*z,p.y*z); c.rotate(a); c.fillStyle='#586a52'; c.fillRect(-z*.25,-z*.3,z*.5,z*.6); c.fillStyle='#ded2a0'; c.fillRect(-z*.18,-z*.38,z*.36,z*.18); c.fillStyle='rgba(220,235,255,.16)'; c.beginPath(); c.moveTo(z*.2,0); c.arc(0,0,z*2,-.43,.43); c.fill(); c.restore(); }
  private drawLamp(c: CanvasRenderingContext2D, p: Vec2, state: string, z: number): void { c.save(); c.translate(p.x*z,p.y*z); c.fillStyle=state==='dead'?'#382e2b':state==='damaged'?'#e07932':'#ffcf62'; c.fillRect(-z*.14,-z*.24,z*.28,z*.38); c.strokeStyle='#1d1515'; c.lineWidth=3; c.strokeRect(-z*.14,-z*.24,z*.28,z*.38); if(state==='damaged'){c.beginPath();c.moveTo(-z*.12,-z*.15);c.lineTo(z*.1,z*.08);c.stroke();} if(state==='dead'){c.fillStyle='#171318';c.fillRect(-z*.2,-z*.05,z*.4,z*.08);} c.restore(); }
}
