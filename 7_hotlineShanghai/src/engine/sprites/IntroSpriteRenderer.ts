import { INTRO_SPRITE_MANIFEST, type IntroSpriteAsset, type IntroSpriteFrame } from './intro-manifest';

type AssetId = keyof typeof INTRO_SPRITE_MANIFEST;
type Direction = 'N' | 'NE' | 'E' | 'SE' | 'S' | 'SW' | 'W' | 'NW';

const DIRECTIONS: readonly Direction[] = ['E', 'SE', 'S', 'SW', 'W', 'NW', 'N', 'NE'];

export class IntroSpriteRenderer {
  private images: Partial<Record<AssetId, HTMLImageElement>> = {};
  private curated = false;

  async preload(): Promise<void> {
    const entries = Object.entries(INTRO_SPRITE_MANIFEST) as [AssetId, IntroSpriteAsset][];
    const settled = await Promise.all(entries.map(async ([id, asset]) => {
      try { return [id, await loadImage(asset.url)] as const; }
      catch { return [id, null] as const; }
    }));
    if (settled.some(([id, image]) => INTRO_SPRITE_MANIFEST[id].required && !image)) {
      this.images = {};
      this.curated = false;
      return;
    }
    this.images = Object.fromEntries(settled.filter((entry): entry is readonly [AssetId, HTMLImageElement] => entry[1] !== null));
    this.curated = true;
  }

  get active(): boolean { return this.curated; }

  drawStatic(c: CanvasRenderingContext2D, id: 'ground' | 'brick' | 'shikumen' | 'laundry', x: number, y: number, size: number): boolean {
    if (!this.curated) return false;
    const asset = INTRO_SPRITE_MANIFEST[id];
    const frame = asset.frames[0];
    return this.draw(c, id, frame, x, y, size / frame.width);
  }

  drawActor(c: CanvasRenderingContext2D, id: 'player' | 'patrol', x: number, y: number, angle: number, action: 'idle' | 'walk' | 'attack' | 'alert', elapsed: number, worldScale: number): boolean {
    if (!this.curated) return false;
    const asset = INTRO_SPRITE_MANIFEST[id];
    const direction = directionFor(angle);
    const frameIndex = action === 'walk' ? Math.floor(elapsed * asset.fps) % 4 : action === 'attack' ? Math.floor(elapsed * asset.fps) % 3 : 0;
    const suffix = action === 'walk' ? `walk${frameIndex}` : action === 'attack' ? `attack${frameIndex}` : action;
    const frame = findFrame(asset, `${direction}.${suffix}`);
    return frame ? this.draw(c, id, frame, x, y, worldScale / frame.width) : false;
  }

  drawLamp(c: CanvasRenderingContext2D, x: number, y: number, state: string, worldScale: number): boolean {
    if (!this.curated) return false;
    const index = state === 'dead' ? 2 : state === 'damaged' ? 1 : 0;
    const frame = INTRO_SPRITE_MANIFEST.lamp.frames[index];
    return this.draw(c, 'lamp', frame, x, y, worldScale / frame.width);
  }

  drawEffect(c: CanvasRenderingContext2D, id: 'spark' | 'glass', frameIndex: number, x: number, y: number, size: number): boolean {
    if (!this.curated || !this.images[id]) return false;
    const asset = INTRO_SPRITE_MANIFEST[id];
    const frame = asset.frames[frameIndex % asset.frames.length];
    return this.draw(c, id, frame, x, y, size / frame.width);
  }

  private draw(c: CanvasRenderingContext2D, id: AssetId, frame: IntroSpriteFrame, x: number, y: number, scale: number): boolean {
    const image = this.images[id];
    if (!image) return false;
    c.imageSmoothingEnabled = false;
    c.drawImage(image, frame.x, frame.y, frame.width, frame.height, Math.round(x - frame.pivot[0] * scale), Math.round(y - frame.pivot[1] * scale), Math.round(frame.width * scale), Math.round(frame.height * scale));
    return true;
  }
}

function directionFor(angle: number): Direction {
  const normalized = ((angle + Math.PI * 2) % (Math.PI * 2));
  return DIRECTIONS[Math.round(normalized / (Math.PI / 4)) % 8];
}

function findFrame(asset: IntroSpriteAsset, id: string): IntroSpriteFrame | undefined {
  const frame = asset.frames.find((candidate) => candidate.id === id);
  if (!frame) return undefined;
  return frame.fallback ? asset.frames.find((candidate) => candidate.id === frame.fallback) ?? frame : frame;
}

function loadImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.decoding = 'async';
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error(`Failed to load ${url}`));
    image.src = url;
  });
}
