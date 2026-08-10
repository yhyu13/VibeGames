import type { SimSnapshot } from '../core/types';
import { RcPipeline, type RcFrameImages, type RcPipelineState } from './RcPipeline';
import { RC_LIGHT_TABLE } from '../core/data/lights';

const WIDTH = 480;
const HEIGHT = 432;

export class RcPresenter {
  readonly canvas = document.createElement('canvas');
  readonly state: RcPipelineState;
  private pipeline: RcPipeline | null = null;
  private lost = false;
  private occlusion = new ImageData(WIDTH, HEIGHT);
  private emission = new ImageData(WIDTH, HEIGHT);

  constructor(
    private readonly host: HTMLElement,
    private readonly source: HTMLCanvasElement,
  ) {
    this.canvas.width = WIDTH;
    this.canvas.height = HEIGHT;
    for (const canvas of [source, this.canvas]) {
      canvas.style.position = 'absolute';
      canvas.style.inset = '50% auto auto 50%';
      canvas.style.width = 'min(92vw, calc(92vh * 10 / 9))';
      canvas.style.height = 'min(92vh, calc(92vw * 9 / 10))';
      canvas.style.aspectRatio = '10 / 9';
      canvas.style.transform = 'translate(-50%, -50%)';
      canvas.style.imageRendering = 'pixelated';
    }
    this.canvas.style.zIndex = '0';
    this.canvas.style.pointerEvents = 'none';
    this.canvas.addEventListener('webglcontextlost', this.onContextLost);
    this.canvas.addEventListener('webglcontextrestored', this.onContextRestored);
    this.host.appendChild(this.canvas);
    this.pipeline = this.createPipeline();
    this.state = this.pipeline?.state() ?? this.fallbackState();
    this.source.style.opacity = this.pipeline === null ? '1' : '0';
  }

  render(snapshot: SimSnapshot): void {
    if (this.pipeline === null || this.lost) return;
    try {
      const frame = this.buildPlanes(snapshot);
      this.pipeline.render(frame, { cascadeCount: 1, twoLoop: true, ditherEnabled: false, lightScale: 1.15, ambientIntensity: 0.008 });
      Object.assign(this.state, this.pipeline.state());
    } catch (error) {
      console.warn('[RcPresenter] RC disabled:', error);
      this.disableRc();
    }
  }

  setConfig(config: { lightScale?: number; ambientIntensity?: number }): void {
    this.pipeline?.setConfig(config);
  }

  destroy(): void {
    this.canvas.removeEventListener('webglcontextlost', this.onContextLost);
    this.canvas.removeEventListener('webglcontextrestored', this.onContextRestored);
    this.pipeline?.destroy();
    this.pipeline = null;
    this.canvas.remove();
    this.source.style.opacity = '1';
  }

  private buildPlanes(snapshot: SimSnapshot): RcFrameImages {
    const sceneCtx = this.source.getContext('2d');
    if (sceneCtx === null) throw new Error('Canvas2D scene source unavailable');
    const sceneColor = sceneCtx.getImageData(0, 0, WIDTH, HEIGHT);
    const occlusion = this.occlusion;
    occlusion.data.fill(255);
    const emission = this.emission;
    emission.data.fill(0);
    for (let i = 3; i < emission.data.length; i += 4) emission.data[i] = 255;
    const room = snapshot.currentRoom;
    if (room !== null) {
      const scale = Math.min(WIDTH / 12, HEIGHT / 11);
      const ox = Math.floor((WIDTH - room.width * scale) / 2);
      const oy = Math.floor((HEIGHT - room.height * scale) / 2);
      for (let y = 0; y < room.height; y += 1) for (let x = 0; x < room.width; x += 1) {
        if (room.tiles[y][x] !== '#') continue;
        this.fillRect(occlusion, ox + x * scale, oy + y * scale, scale, scale, 0, 0, 0);
      }
      for (const light of snapshot.lightSources) {
        if (light.invalidated) continue;
        const cx = ox + light.position.x * scale;
        const cy = oy + light.position.y * scale;
        const hex = (RC_LIGHT_TABLE[light.kind as keyof typeof RC_LIGHT_TABLE]?.colorHex ?? '#ffc966').slice(1);
        const r = parseInt(hex.slice(0, 2), 16);
        const g = parseInt(hex.slice(2, 4), 16);
        const b = parseInt(hex.slice(4, 6), 16);
        this.fillDisk(emission, cx, cy, Math.max(2, scale * 0.08), Math.round(r * 0.55), Math.round(g * 0.55), Math.round(b * 0.55));
      }
    }
    const frame = {
      width: WIDTH,
      height: HEIGHT,
      sceneColor,
      occlusion,
      emission,
      lightCount: snapshot.lightSources.filter((light) => !light.invalidated).length,
    };
    if (import.meta.env.DEV) this.validatePlanes(frame);
    return frame;
  }

  private validatePlanes(frame: RcFrameImages): void {
    for (const image of [frame.sceneColor, frame.occlusion, frame.emission]) {
      if (image.width !== WIDTH || image.height !== HEIGHT) throw new Error('RC plane dimensions mismatch');
    }
    for (let i = 0; i < frame.occlusion.data.length; i += 4) {
      const r = frame.occlusion.data[i];
      if ((r !== 0 && r !== 255) || frame.occlusion.data[i + 1] !== r || frame.occlusion.data[i + 2] !== r || frame.occlusion.data[i + 3] !== 255) throw new Error('RC occlusion plane is not binary opaque');
      if (frame.emission.data[i + 3] !== 255) throw new Error('RC emission plane is not opaque');
    }
  }

  private fillRect(image: ImageData, x: number, y: number, w: number, h: number, r: number, g: number, b: number): void {
    const x0 = Math.max(0, Math.floor(x)); const y0 = Math.max(0, Math.floor(y));
    const x1 = Math.min(image.width, Math.ceil(x + w)); const y1 = Math.min(image.height, Math.ceil(y + h));
    for (let py = y0; py < y1; py += 1) for (let px = x0; px < x1; px += 1) this.setPixel(image, px, py, r, g, b);
  }

  private fillDisk(image: ImageData, cx: number, cy: number, radius: number, r: number, g: number, b: number): void {
    const rr = radius * radius;
    for (let y = Math.max(0, Math.floor(cy - radius)); y <= Math.min(image.height - 1, Math.ceil(cy + radius)); y += 1) {
      for (let x = Math.max(0, Math.floor(cx - radius)); x <= Math.min(image.width - 1, Math.ceil(cx + radius)); x += 1) {
        if ((x - cx) ** 2 + (y - cy) ** 2 <= rr) this.setPixel(image, x, y, r, g, b);
      }
    }
  }

  private setPixel(image: ImageData, x: number, y: number, r: number, g: number, b: number): void {
    if (x < 0 || y < 0 || x >= image.width || y >= image.height) return;
    const i = (y * image.width + x) * 4;
    image.data[i] = r; image.data[i + 1] = g; image.data[i + 2] = b; image.data[i + 3] = 255;
  }

  private createPipeline(): RcPipeline | null {
    try { return new RcPipeline(this.canvas, { cascadeCount: 1, twoLoop: true, ditherEnabled: true, lightScale: 1.8, ambientIntensity: 0.04 }); }
    catch (error) { console.warn('[RcPresenter] WebGL2 unavailable, using Canvas2D:', error); return null; }
  }

  private disableRc(): void {
    this.pipeline?.destroy();
    this.pipeline = null;
    this.canvas.style.visibility = 'hidden';
    this.source.style.opacity = '1';
    Object.assign(this.state, this.fallbackState());
  }

  private onContextLost = (event: Event): void => {
    event.preventDefault();
    this.lost = true;
    this.source.style.opacity = '1';
    this.canvas.style.visibility = 'hidden';
    Object.assign(this.state, this.fallbackState());
  };

  private onContextRestored = (): void => {
    this.pipeline = this.createPipeline();
    this.lost = false;
    if (this.pipeline !== null) {
      this.canvas.style.visibility = 'visible';
      this.source.style.opacity = '0';
      Object.assign(this.state, this.pipeline.state());
    } else {
      Object.assign(this.state, this.fallbackState());
    }
  };

  private fallbackState(): RcPipelineState {
    return { activeCascades: 0, resolutionScale: 1, ditherEnabled: false, lastFrameTimeMs: 0, lightCount: 0, jfaPasses: 0, propagationRate: 0, mixFactor: 0, lightScale: 0, ambientIntensity: 0, eps: 0, twoLoop: true, degraded: true };
  }
}
