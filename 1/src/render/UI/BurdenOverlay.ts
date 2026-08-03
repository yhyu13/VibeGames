// Burden overlay: visual artifacts at high Instability tiers.

import { effect } from '@preact/signals-core';
import type { ShipState } from '../../state/types.js';
import { tierOf } from '../../state/ship/Instability.js';

export class BurdenOverlay {
  private layer: HTMLDivElement;
  private currentTier = 'stable';

  constructor(private ship: ShipState) {
    this.layer = document.createElement('div');
    this.layer.id = 'burden-overlay';
    Object.assign(this.layer.style, {
      position: 'fixed',
      inset: '0',
      pointerEvents: 'none',
      mixBlendMode: 'screen',
      opacity: '0',
      transition: 'opacity 0.3s',
    });
    document.body.appendChild(this.layer);

    effect(() => {
      const t = tierOf(ship.instability.value);
      this.currentTier = t;
      const opacityMap: Record<string, number> = { stable: 0, strained: 0.15, volatile: 0.3, critical: 0.5, collapse: 0.7 };
      this.layer.style.opacity = String(opacityMap[t] ?? 0);
      this.applyEffects(t);
    });
  }

  private applyEffects(t: string): void {
    if (t === 'stable' || t === 'strained') {
      this.layer.style.background = 'transparent';
      this.layer.style.boxShadow = 'none';
      this.layer.style.filter = 'none';
    } else if (t === 'volatile') {
      this.layer.style.background = 'radial-gradient(ellipse at center, transparent 30%, rgba(255,91,108,0.15) 100%)';
      this.layer.style.filter = 'hue-rotate(15deg)';
    } else if (t === 'critical') {
      this.layer.style.background = 'radial-gradient(ellipse at center, transparent 20%, rgba(255,91,108,0.3) 100%)';
      this.layer.style.filter = 'hue-rotate(40deg) contrast(1.15)';
      this.layer.style.boxShadow = 'inset 0 0 100px rgba(255,91,108,0.4)';
    } else if (t === 'collapse') {
      this.layer.style.background = 'radial-gradient(ellipse at center, transparent 10%, rgba(155,108,255,0.4) 100%)';
      this.layer.style.filter = 'hue-rotate(80deg) contrast(1.3) saturate(1.5)';
      this.layer.style.boxShadow = 'inset 0 0 200px rgba(255,91,108,0.6)';
    }
  }

  destroy(): void {
    this.layer.remove();
  }
}