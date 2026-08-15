# TDD — 技术设计 (11_blackhole)

## 架构（VibeGames C.A.T 约定）

```
src/
  core/          # 纯物理，无 THREE / React 依赖，可被 CPU/浏览器直接调试验证
    constants.ts     # 几何 + 渲染 + 相机常量、DEFAULT_PARAMS
    types.ts         # Vec3 / PhotonFate / TraceResult / RenderParams / PhysicalReadout
    physics/
      blackbody.ts   # 温度 -> RGB（Tanner-Helland 拟合）
      geodesics.ts   # 测地线 CPU 参考实现 + 频率移动 + 发射率
      readouts.ts    # 质量 -> SI 物理读数
  engine/        # THREE 适配器
    shaders/blackhole.ts  # 全屏三角形 GLSL（顶点 + 片段）
    SceneManager.ts       # 渲染器/相机/OrbitControls/合成器/动画循环
    devtools.ts           # window.__blackhole 调试句柄
  components/    # React UI
    HUD.tsx / ControlPanel.tsx
  store.ts       # zustand：params / readout / fps / setParam / reset
  App.tsx        # 挂载 SceneManager + UI
```

## 关键决策

1. **逐像素零测地线光线追踪**（而非廉价环 + 二次像近似）：这是唯一能正确产生环绕吸积盘、光子环、爱因斯坦环与透镜星场的方案。
2. **尺度无关**：Schwarzschild 像与质量无关，质量只影响 HUD 的 SI 读数，几何不变。
3. **CPU/GLSL 双实现**：`core/physics/geodesics.ts` 与 `engine/shaders/blackhole.ts` 数值一致，前者用于验证与 devtools。
4. **远场直线近似**：`b > FAR_B=8` 走直线，节省绝大多数像素的积分成本。

## 数值一致性锚点

- 影子半径 = `b_crit = (3√3/2)`：撞击参数恰好在此值的射线螺旋收敛到光子球。
- ISCO 轨道速度 = `1/√(2(3−1))` = 0.5 c。
- 光子球 = 1.5 r_s，事件视界 = 1 r_s。

## 性能

- 分辨率受 devicePixelRatio 上限 2 约束。
- 测地线步数默认 128，滑杆 16–256 可调（精度 vs 帧率）。
- HalfFloat 渲染目标使 bloom 在 HDR 下工作，避免色带。

## 构建门禁

- `tsc --noEmit`（strict + noUnusedLocals + noUnusedParameters）。
- `npm run build`。
- 浏览器 smoke（Playwright 截图 + `window.__blackhole` 断言）。
