// Entry point: mount canvas, hide boot, boot Game.
// Surfaces errors visibly so "stuck at initializing" is debuggable.

import { Game } from './app/Game.js';

function showBootError(err: unknown): void {
  const boot = document.getElementById('boot');
  if (!boot) return;
  const panel = boot.querySelector('.panel');
  if (panel) {
    panel.innerHTML = `<div style="color:#ff5b6c;font-weight:bold">INITIALIZATION FAILED</div>
      <pre style="margin-top:12px;max-width:80vw;white-space:pre-wrap;text-align:left;color:#ffaa4a">${String(err instanceof Error ? (err.stack ?? err.message) : err).replace(/[<&>]/g, (c) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;' }[c] ?? c))}</pre>
      <div style="margin-top:12px;opacity:0.6">Check browser DevTools console for details.</div>`;
  }
}

function bootGame(): void {
  const app = document.getElementById('app');
  if (!app) {
    showBootError('#app element missing in index.html');
    return;
  }
  const canvas = document.createElement('canvas');
  canvas.id = 'game-canvas';
  app.appendChild(canvas);

  let game: Game;
  try {
    game = new Game(canvas);
  } catch (err) {
    console.error('[alien-invader] Game constructor threw:', err);
    showBootError(err);
    return;
  }

  try {
    game.start();
  } catch (err) {
    console.error('[alien-invader] game.start() threw:', err);
    showBootError(err);
    return;
  }

  // Hide boot only after the first frame actually rendered.
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      const boot = document.getElementById('boot');
      if (boot) boot.classList.add('hidden');
      setTimeout(() => boot?.remove(), 500);
    });
  });

  // Expose for debugging
  (window as unknown as { game: Game }).game = game;
}

// Surface any uncaught error to the boot panel.
window.addEventListener('error', (e) => showBootError(e.error ?? e.message));
window.addEventListener('unhandledrejection', (e) => showBootError(e.reason));

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', bootGame);
} else {
  bootGame();
}