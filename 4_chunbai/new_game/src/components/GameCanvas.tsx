import React, { useRef, useEffect, useCallback } from 'react';
import { GameEngine } from '../engine/GameEngine';
import { useGameStore } from '../store';
import { InputManager } from '../engine/InputManager';

const GameCanvas: React.FC<{ mode: 'pve' | 'pvp' }> = ({ mode }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const engineRef = useRef<GameEngine | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const engine = new GameEngine(canvas);
    engineRef.current = engine;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      engine.resize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

// Input handling
    const handleKeyDown = (e: KeyboardEvent) => {
      engine.input.keyDown(e.key);
      if (e.key === 'Escape') {
        if (document.pointerLockElement === canvas) {
          document.exitPointerLock();
        }
        useGameStore.getState().setGame({ screen: 'pause' });
      }
      if (['w','W','a','A','s','S','d','D','q','Q','e','E','r','R',' ','Tab','1','2','3','4'].includes(e.key)) {
        e.preventDefault();
      }
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      engine.input.keyUp(e.key);
      if (['w','W','a','A','s','S','d','D','q','Q','e','E','r','R',' ','Tab','1','2','3','4'].includes(e.key)) {
        e.preventDefault();
      }
    };
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      engine.input.mouseMove(e.clientX - rect.left, e.clientY - rect.top);
    };
    const handleMouseDown = () => {
      engine.input.mouseDownFn();
      if (document.pointerLockElement !== canvas) {
        canvas.requestPointerLock();
      }
    };
    const handleMouseUp = () => engine.input.mouseUpFn();

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mousedown', handleMouseDown);
    canvas.addEventListener('mouseup', handleMouseUp);

    // Prevent context menu
    const preventCtx = (e: Event) => e.preventDefault();
    canvas.addEventListener('contextmenu', preventCtx);

    // Start game
    engine.start(mode);

    return () => {
      engine.stop();
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mousedown', handleMouseDown);
      canvas.removeEventListener('mouseup', handleMouseUp);
      canvas.removeEventListener('contextmenu', preventCtx);
    };
  }, [mode]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute top-0 left-0 w-full h-full cursor-crosshair"
    />
  );
};

export default GameCanvas;
