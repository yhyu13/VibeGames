import { useEffect, useRef } from 'react';
import { createGame } from '../engine/GameEngine';
import type { UiCommand } from '../core/types';

export function sendUiCommand(cmd: UiCommand): void {
  document.dispatchEvent(new CustomEvent('uiCommand', { detail: cmd }));
}

export default function GameCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const game = createGame(canvas);
    return () => game.dispose();
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 h-full w-full" />;
}
