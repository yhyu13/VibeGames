// rc-lab/port-check.ts —— 用同一套 35 条断言验证「游戏侧移植版」RcPipeline。
//
// 目的：rc-lab/pipeline.ts 是算法原型，src/engine/RcPipeline.ts 是要进游戏的移植版；
// 两者都必须跑通全部场景断言（含确定性），才算 M1.4 移植成功。

import { RcPipeline as GameRcPipeline, type RcPipelineConfig } from '../src/engine/RcPipeline';
import { runAll, type LabReport, type RcRunner } from './verify';

export function runPortCheck(): LabReport {
  const canvas = document.createElement('canvas');
  canvas.width = 480;
  canvas.height = 216;
  const pipeline = new GameRcPipeline(canvas);
  const verificationProfile: Partial<RcPipelineConfig> = {
    baseIntervalPx: 1.5,
    resolutionScale: 1,
    ambientIntensity: 0.03,
    ditherEnabled: false,
  };
  const runner: RcRunner = {
    render: (input, config) => pipeline.render(input, {
      ...config,
      ...verificationProfile,
    }),
    readPixel: (stage, x, y) => pipeline.readPixel(stage, x, y),
  };
  // Keep canonical stage-coordinate checks at full resolution. This profile verifies
  // the algorithm independently from the game's half-resolution presentation budget.
  return runAll(runner, new Set(['stress']));
}
