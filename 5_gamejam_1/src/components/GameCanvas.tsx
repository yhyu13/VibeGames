import { useEffect, useRef } from 'react';
import { createGame } from '../engine/GameEngine';
import type { UiCommand } from '../core/types';

/**
 * 命令桥（TDD §7 约束①）：UI 命令只能经 TickInput.ui 进入模拟。
 * GameCanvas 是本文件模块级导出 —— 其他组件统一从这里 import。
 * 额外扩展 dialogueNext（冻结 UiCommand 之外由 InputManager 独立处理的语义，
 * 引擎侧监听 'uiCommand' 事件后按 kind 分发，未知 kind 忽略）。
 */
export type UiCommandBridge = UiCommand | { kind: 'dialogueNext' };

export function sendUiCommand(cmd: UiCommandBridge): void {
  document.dispatchEvent(new CustomEvent<UiCommandBridge>('uiCommand', { detail: cmd }));
}

export default function GameCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const gameRef = useRef<{ dispose(): void } | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || gameRef.current) return;
    const game = createGame(canvas);
    gameRef.current = game;
    return () => {
      gameRef.current = null;
      game.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 block h-full w-full"
      aria-label="Boss 的焦虑 游戏场景"
    />
  );
}
