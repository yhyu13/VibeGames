/// <reference types="vite/client" />

interface Window {
  /** demo 调试钩子:kind / setQuality / fps / contextLost */
  __rtDemo?: {
    readonly kind: string;
    setQuality(level: number): void;
    fps: number;
    contextLost: boolean;
  };
}
