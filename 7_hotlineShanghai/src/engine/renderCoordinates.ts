import type { Vec2 } from '../core/types';

// Gameplay coordinates stay authoritative at their simulation origin. Canvas2D/WebGL
// art uses the center of the authored tile so sprites, halos, and telegraphs overlap.
export function visualCenter(position: Vec2): Vec2 {
  return { x: position.x + 0.5, y: position.y + 0.5 };
}
