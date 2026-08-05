import React, { useRef, useEffect } from 'react';
import { GameEngine } from '../engine/GameEngine';
import { useGameStore } from '../store';
import { getWeapon } from '../data/weapons';

const PREVENT_KEYS = [
  'w','W','a','A','s','S','d','D',
  'e','E','z','Z',
  ' ', 'Tab', '1', '2', '3', '4', '5', '6',
  'Shift', 'Control', 'Enter',
];

const GameCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const engineRef = useRef<GameEngine | null>(null);
  const crosshairRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<SVGCircleElement>(null);
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
      const x = engine.input.getMouseNormX() * canvas.width;
      const y = engine.input.getMouseNormY() * canvas.height;
      el.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
    };

    // Crosshair follows the engine aim every frame (locked aim sticks to target)
    let raf = 0;
    const tick = () => {
      updateCrosshair();
      const weapon = getWeapon(useGameStore.getState().players[0]?.weapon || 1);
      if (circleRef.current && circleRef.current.getAttribute('r') !== String(weapon.smartRadius)) {
        circleRef.current.setAttribute('r', String(weapon.smartRadius));
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

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
      cancelAnimationFrame(raf);
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
        style={{ transform: 'translate(-50%, -50%)' }}
      >
        {/* 智能圈：随武器变化的准星捕获范围（绿色虚线，原版风格） */}
        <svg
          className="absolute -translate-x-1/2 -translate-y-1/2 overflow-visible"
          width="0" height="0"
        >
          <circle
            ref={circleRef}
            cx="0" cy="0" r="60"
            fill="none" stroke="#33ff66" strokeOpacity="0.35" strokeWidth="1"
            strokeDasharray="5 4"
          />
        </svg>
        <svg width="28" height="28" viewBox="0 0 28 28">
          <rect x="3" y="3" width="22" height="22" fill="none" stroke="#33ff66" strokeWidth="1.5" />
          <line x1="14" y1="9" x2="14" y2="13" stroke="#33ff66" strokeWidth="1.5" />
          <line x1="14" y1="15" x2="14" y2="19" stroke="#33ff66" strokeWidth="1.5" />
          <line x1="9" y1="14" x2="13" y2="14" stroke="#33ff66" strokeWidth="1.5" />
          <line x1="15" y1="14" x2="19" y2="14" stroke="#33ff66" strokeWidth="1.5" />
        </svg>
      </div>
    </>
  );
};

export default GameCanvas;
