// rc-lab/port-check.ts —— 用同一套 35 条断言验证「游戏侧移植版」RcPipeline。
//
// 目的：rc-lab/pipeline.ts 是算法原型，src/engine/RcPipeline.ts 是要进游戏的移植版；
// 两者都必须跑通全部场景断言（含确定性），才算 M1.4 移植成功。

import { RcPipeline as GameRcPipeline } from '../src/engine/RcPipeline';
import { runAll, type LabReport } from './verify';

export function runPortCheck(): LabReport {
  const canvas = document.createElement('canvas');
  canvas.width = 480;
  canvas.height = 216;
  const pipeline = new GameRcPipeline(canvas);
  // dither 关闭以匹配 lab 断言（dither 是单像素量化，会干扰 luma 比较）
  return runAll(pipeline, new Set(['stress']), { ditherEnabled: false });
}
