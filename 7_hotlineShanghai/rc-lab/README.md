# RC Lab — 2D Radiance Cascades 算法测试台

> 目的：在接入游戏前，用**确定性场景 + 像素级断言**把 RC 全管线（prepscene → prepjfa → JFA → distfield → cascade → final）跑对，
> 保证 M1 集成一次成功（B33 教训：shader 编译失败 / 管线 no-op / 假光自激曾导致全黑屏与灯柱）。

## 参考实现（算法源头，勿丢）

**`C:\Git-repo-3rd\Radiance_Cascade_repos\radiance-cascades-demo`**

- `res/shaders/rc.frag` — probe 数学 / 合并 / propagationRate / mixFactor 原始 GLSL 330
- `res/shaders/{prepscene,prepjfa,jfa,distfield,gi,final}.frag` + `default.vert` — 其余阶段
- `src/demo.cpp` — 执行语义：**两轮 cascade 降序**（直射 uMixFactor=0 → 间接 uMixFactor=config）、
  JFA 跳距 `jfaSteps*2 → 1`、缓冲位深（JFA R32 / distfield R16）
- `res/doc/rc_frag.md` + `res/class*/` — 原理讲解与调试 shader（`rc_debug_*.frag`）

本测试台 `shaders/*` 是上述文件的**干净 GLSL ES 3.00 移植**，仅两处有意修正：
① `uEps` uniform（RGBA8 距离场命中阈值，见“关键发现”第 1 条）；② `uDirectLighting` 用 `uv` 采样（去掉 demo 的 raylib 翻转残留 `-uv.y`）。

## 运行

```powershell
npm run dev
# 打开 http://localhost:5184/rc-lab/
```

页面加载后自动跑全部 6 个场景（跳过压力场景），显示每个断言的 got/want 和四阶段视图。
页面同时自动用**同一套 35 条断言**验证游戏侧移植版 `src/engine/RcPipeline.ts`（port-check），
两套都绿才算 M1.4 移植成功。
自动门禁（headless Chromium + SwiftShader）：

```powershell
npm run rc-lab:check
```

输出 `smoke/rc-lab.png` 截图；任何断言失败或 console error 都会使退出码非 0。
**注意**：本机 headless 必须用 `--use-angle=swiftshader`（`--use-gl=swiftshader` 会触发 WebGL context lost）。

## 游戏侧移植（已完成 M1.4 管线部分）

- `src/engine/RcPipeline.ts` — 本测试台管线的游戏版移植（配置字段对齐 TDD §15.4 +
  新增 `eps` / `twoLoop`），输入契约为三张同尺寸纹理（occlusion / emission / sceneColor），
  可用 `render(ImageData)`（调试）或 `renderFrame(WebGLTexture)`（SceneManager 接入后）。
- `src/engine/shaders/*` — 与 `rc-lab/shaders/*` 同源的干净 GLSL ES 3.00。
- 验证：页面自动 port-check 跑同 35 条断言；`npm run rc-lab:check` 同时断言 lab + 移植版。
- 待办（M1 集成，不动本仓库其他模块）：
  SceneManager 渲染三张输入纹理 → GameEngine 每帧调 `renderFrame` →
  降采样 radiance 喂 `LightFieldCache`（`src/core/world/lightField.ts`）→ 恢复 `__rcPipeline` 钩子 + PerfWatchdog。

## RC 展示场景（rc-showcase/）

- 访问：`npm run dev` 后打开 `http://localhost:5184/rc-showcase/`
- 内容：1937 上海客厅——油灯（暖）、霓虹（青，脉动）、探照灯、桌灯、沙发/书架/茶几遮挡深影；
  四阶段视图（seed / SDF / radiance / final）+ cascade / baseInterval / lightScale / ambient / dither / 两轮开关。
- 用的是游戏侧移植版 `src/engine/RcPipeline`；门禁 `npm run rc-lab:check` 会一并验证该页面
  （fps>0 + cascade>0 + 截图 `smoke/rc-showcase.png`）。

## 场景矩阵

| ID | 场景 | 验证点 |
|----|------|--------|
| `empty-lamp` | 空房单灯 | 径向衰减（灯心>中距>远距）、灯色相、seed 空/光斑、SDF=CPU 参考、确定性 |
| `wall-shadow` | 单墙影 | 光不穿墙（开敞 >> 影区、影区<0.5）、墙/地 seed 语义、SDF、确定性 |
| `two-lights` | 红/青双灯 | 双灯色相分离；3 级合并不劣于单级（回归） |
| `furniture-room` | 家具房间 | 沙发遮挡、油灯/霓虹双光源色相、base 可读、SDF、确定性 |
| `muzzle-flash` | 枪火瞬光 | 小半径高强瞬光 > 常亮油灯、暖黄白色相、远角环境光 |
| `stress` | 16 灯压力 | 640×360 多灯多柱、确定性；页面“运行全部”时包含 |

## 断言怎么写的

- 场景数据（`scenes.ts`）：ASCII 网格 → occlusion（白=空/黑=墙）+ 灯位表 → emission + base 色纹理。
- 断言全部是相对/阈值形式（如 `open > shadow`、`shadow < 0.5`、`sdf ≈ CPU ±0.04`），不做死值黄金图对比。
- 探针取 3×3 均值，抗单像素抖动；确定性用 ~576 点采样网格，要求两帧逐字节一致。
- 所有像素读取走 **1px `readPixels`**：本机 ANGLE/SwiftShader 的整缓冲 readPixels 有陈旧缓存 bug
  （读回旧内容），只有小矩形读取稳定（见“关键发现”）。

## 关键发现（2026-08-09 实测，直接影响 M1 实现）

1. **RGBA8 距离场必须调 EPS**：demo 的 `EPS=0.0005` 只适用于 R16 SDF；
   RGBA8 量化步长 `1/255≈0.0039`，射线永远打不中表面（整屏只有环境光）。
   测试台用 uniform `uEps`，默认 `3/255≈0.0118`（≈3px 命中软化）。建议 M1 前走 `[TDD-CONTRACT-CHANGE]`
   把 `RC_EPS` 语义改为“随距离场格式自适应”。
2. **emission 烘焙的“多灯取亮”必须比亮度而非 alpha**：背景 (0,0,0,255) 若按 alpha 比较，
   所有光斑都会被跳过（灯进不了 seed）。
3. **demo 是两轮 cascade**：第一轮直射（`uMixFactor=0`、无 ambient、`uDirectLighting=sceneSeed`），
   第二轮间接（`uMixFactor=RC_MIX_FACTOR`、有 ambient、`uDirectLighting=第一轮结果`）。
   旧游戏实现砍成单轮导致“墙面不携带光”，光池 ≈ 灯斑本身。测试台默认 `twoLoop=true`（demo 原版），
   `false` 保留旧变体用于对照。**M1 建议按两轮实现。**
4. **覆盖范围（重要性能/调参约束）**：在 480×216、`RC_CASCADE_COUNT=3`、`baseInterval=1.5px` 下，
   光池≈发射体半径（~50px），远处只有环境光；cascade 4/5 级在此尺度无明显改善（合并映射稀疏）。
   对应游戏参数（1080p、`RC_BASE_INTERVAL_PX=0.5`、3 级）最大理论可达仅 128px≈2.1u，
   而油灯半径 3.5u——**M1 前必须验证/调大 baseInterval 或级数**，否则房间照不亮（B24/B27 历史问题的根源）。
5. **`uDirectLighting` 采样必须用 `uv` 本身**：demo 的 `-uv.y` 是 raylib 翻转残留，WebGL 下会钳到边缘行。
6. **shader 零运行时补丁**：`rc-lab/shaders/*` 是干净的 GLSL ES 3.00（显式 int→float 转换），
   可直接复制为 `src/engine/shaders/*` 的起点；禁止回到“字符串替换补丁”方案。

## 关键发现（2026-08-13 第二轮，v3.10/v3.11 光池圆滑化）

1. **环境光必须用 max 地板语义**：`radiance += ambient` 的叠加语义在光池尾部产生暗环
   （池尾 0.03 < 叠加后的环境光 0.078，池子周围一圈暗带——用户"still sharpy"反馈的主因）。
   改 `radiance = max(radiance, ambient)` 后径向剖面单调，暗环消失。环境光不再随 merge 遍数累加，
   每遍传全量。
2. **种子盘形状决定光池质量**：硬边实心盘 → 环形锐缘；软边零亮度盘缘 → 远距级联命中零亮度、
   光池缩到发射体本身；0.3 亮度地板 → 盘缘 0.3→0 硬跳、可见台阶。最终方案 = **两层复合盘**：
   max(核心(0.4r 平台 + 平方衰减尾), 宽软裙(1.7r, 0.4 增益))——处处连续、盘缘保有可传播亮度、
   平台保住小半径强光(枪火)的峰值(平方衰减在 2px 内掉 20%+,10px 小盘被吃掉)。
3. **16 ray/probe**（22.5° 间隔）：4 射线只在 4 条对角线上命中，光池呈星形臂；16 射线的臂
   几乎连成连续圆盘。interval 每 texel = 1 条射线，成本不变，仅探针间距 2→4 工作像素。
4. **final.frag 双线性插值 4 个相邻 probe**：取最近 probe 块角点会在光池边缘产生 4px 楼梯块；
   按 probe 网格坐标(texel/4-0.5)双线性混合 4 个 probe → 平滑渐变。
5. **新增光池质量断言**：`radialSmooth`（径向剖面相邻采样上跳 ≤ 0.02，无环状伪影）+
   `centroid`（亮度加权质心偏移 ≤ 6px）。RC_LAB + PORT 37/37。

## 集成契约（M1 时把 lab 管线搬进游戏）

- 输入三张同尺寸纹理：`occlusion`（白=空/黑=墙）、`emission`（光斑）、`sceneColor`（final 的 base）。
- 中间缓冲全部 RGBA8（TDD §3.5 契约），无需 `EXT_color_buffer_float`。
- cascade 降序执行 `index = cascadeCount → 0`，首遍（`LAST_LEVEL`）不合并，与 demo 一致。
- final 用加法合成 `base + radiance * uLightScale` + 4×4 Bayer dither（06-rendering-readability F3）。
- 接入 Three.js 时保留 GL 状态守卫（program/VAO/纹理单元），并禁止把 sceneTexture 直接当 occlusion 用。


## 2026-08-09 ?????canonical ???GMShaders Bilinear-Fix?

**??**?demo rc.frag ??????????? demo ???? probe ?????? 4 ???????/???????
???? bakeEmission ????????????????????????????? merge?alpha=1??
??????????????????????? 4??????

**???rc_interval.frag + rc_merge.frag?**?
- ?? canonical?position-first????atlas ??? probe ? size?size ???size=2^(c+1)??
  ? texel = ? probe ????????????? ?4?c3 = 256 ?/probe???????? ?2?
- merge ? GMShaders Bilinear-Fix?miss ??????????? 4 ??? probe ? 4 ???????
  ?????? probe ????????
- ???? = interval pass + merge pass?????? interval??atlas ??????????480?224??
  final ? (coord+0.5)/atlasSize ???? = ? probe ???? + ?? probe ???
- ??????? demo ?????**?????**??????????????
  ???????????????? RC ??????

**??**?lab + port-check 35/35 ???empty-lamp mid ?? 0.186 ? 0.260?c3?/ 0.278?c4??
two-lights mid 0.180 ? 0.312?wall-shadow ???????????????

**??**?Yaazarai/GMShaders-Radiance-Cascades?BilinearFix / Shd_RadianceMerging.fsh??
??? smoke/gm-rc-ref???????????
