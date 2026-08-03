// Entry point: mount canvas, hide boot, boot Game.

import { Game } from './app/Game.js';

const app = document.getElementById('app');
if (!app) throw new Error('#app not found');

const canvas = document.createElement('canvas');
canvas.id = 'game-canvas';
app.appendChild(canvas);

const game = new Game(canvas);
game.start();

// Hide boot screen once first frame is ready
requestAnimationFrame(() => {
  requestAnimationFrame(() => {
    const boot = document.getElementById('boot');
    if (boot) boot.classList.add('hidden');
    setTimeout(() => boot?.remove(), 500);
  });
});

// Expose for debugging
(window as unknown as { game: Game }).game = game;