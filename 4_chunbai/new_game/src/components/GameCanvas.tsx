import React, { useRef, useEffect } from 'react';
import { GameEngine } from '../engine/GameEngine';
import { useGameStore } from '../store';

const PREVENT_KEYS = [
  'w','W','a','A','s','S','d','D',
  'e','E','z','Z',
  ' ', 'Tab', '1', '2', '3', '4',
  'Shift', 'Control', 'Enter',
];

const GameCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const engineRef = useRef<GameEngine | null>(null);
  const crosshairRef = useRef<HTMLDivElement>(null);
  const aimRef = useRef({ x: 0, y: 0 });

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

    const updateCrosshair = () => {
      const el = crosshairRef.current;
      if (!el) return;
      el.style.transform = `translate(${aimRef.current.x}px, ${aimRef.current.y}px) translate(-50%, -50%)`;
    };

    // Input handling
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey) e.preventDefault();
      engine.input.keyDown(e.key);
      if (e.key === 'Escape') {
        if (document.pointerLockElement === canvas) {
          document.exitPointerLock();
        }
        useGameStore.getState().setGame({ screen: 'pause' });
      }
      if (PREVENT_KEYS.includes(e.key)) {
        e.preventDefault();
      }
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      engine.input.keyUp(e.key);
      if (PREVENT_KEYS.includes(e.key)) {
        e.preventDefault();
      }
    };
    const handleMouseMove = (e: MouseEvent) => {
      const aim = aimRef.current;
      if (document.pointerLockElement === canvas) {
        aim.x = Math.max(0, Math.min(canvas.width, aim.x + e.movementX));
        aim.y = Math.max(0, Math.min(canvas.height, aim.y + e.movementY));
      } else {
        const rect = canvas.getBoundingClientRect();
        aim.x = e.clientX - rect.left;
        aim.y = e.clientY - rect.top;
      }
      engine.input.mouseMove(aim.x, aim.y);
      updateCrosshair();
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
    engine.start();

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
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full cursor-none"
      />
      <div
        ref={crosshairRef}
        className="absolute top-0 left-0 z-20 pointer-events-none"
        style={{ transform: 'translate(-50%, -50%)', filter: 'drop-shadow(0 0 3px rgba(0,240,255,0.9))' }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24">
          <line x1="12" y1="3" x2="12" y2="8" stroke="#00f0ff" strokeWidth="2" />
          <line x1="12" y1="16" x2="12" y2="21" stroke="#00f0ff" strokeWidth="2" />
          <line x1="3" y1="12" x2="8" y2="12" stroke="#00f0ff" strokeWidth="2" />
          <line x1="16" y1="12" x2="21" y2="12" stroke="#00f0ff" strokeWidth="2" />
          <circle cx="12" cy="12" r="1.6" fill="#00f0ff" />
        </svg>
      </div>
    </>
  );
};

export default GameCanvas;
