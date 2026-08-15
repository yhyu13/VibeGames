# AGENTS — 11_blackhole 开发约定

## 项目

Schwarzschild 黑洞引力透镜实时可视化。Vite + React 19 + TS strict + zustand + three（0.185）。开发端口 5188。

## 命令

```bash
npm run dev         # 开发服务器（端口 5188，strictPort）
npm run typecheck   # tsc --noEmit
npm run build       # 生产构建
```

## 架构规则

- **C.A.T 分层**：`core/` 纯物理（禁止 import THREE/React/zustand）；`engine/` THREE 适配器；`components/` React；`store.ts` 唯一状态。
- **双实现一致性**：改 `core/physics/geodesics.ts` 与 `engine/shaders/blackhole.ts` 时，必须同步改（数值保持一致）。
- **零运行时资源**：星空/星云/盘全部程序化生成，不引入图片/模型/字体。
- **物理量单位**：几何单位 G=c=1，r_s=1（"bhu"）；质量只影响 HUD SI 读数，不改几何。

## 门禁

1. `npm run typecheck` 零错误。
2. `npm run build` 成功。
3. 浏览器 smoke：画面渲染出黑洞影子 + 光子环；`window.__blackhole.traceCenter(...)` 可调用。

## 调试

- `window.__blackhole`：`tracePhoton` / `impactParameter` / `orbitalSpeedC` / `frequencyShift` / `computeReadout` / `traceCenter` / `constants`。
- 验证锚点：影子半径 `B_CRIT ≈ 2.598`，ISCO 速度 `0.5c`，光子球 `1.5`。
