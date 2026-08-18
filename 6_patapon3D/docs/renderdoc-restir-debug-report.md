# RenderDoc × ReSTIR 调试报告 —— 6_patapon3D(2026-08-18)

> 任务来源："use renderdoc-gpu-debug skill to debug restir algo under 9_3dplatform, dump result to report doc"。
>
> **路径更正**:`9_3dplatform/` 目前只有设计文档(无 `src/`、无 `package.json`),全仓库唯一的 ReSTIR 实现位于 **`6_patapon3D/`**(`src/core/reservoir.ts` + `src/engine/raytrace/VoxelRaycaster.ts`,M2 已落地)。本报告针对 6_patapon3D 的 ReSTIR(Route A:WebGL2 Reservoir-lite)。

---

## 0. TL;DR

- **GPU 帧捕获已成功**:Chromium(Playwright 1234)+ `--in-process-gpu`,RenderDoc 注入浏览器进程,D3D11 抓帧,`restir_frame600.rdc`(198 events / 80 draws;游戏主 pass = EID 33,3 附件 MRT,1061×811)。真 GPU = AMD RX 9070 XT。
- **核心发现(GPU 实锤)**:GI reservoir 历史纹理中有 **279 个非有限像素**(占 0.032%),分两类:
  - **152 px**:radiance 有限 + **weight = +Inf**(fence 顶缘水平带 y≈247-273 + boss 鼓面 x≈835-962);
  - **127 px**:**radiance = (-Inf,-Inf,-Inf) + weight = NaN**(左侧 Patapon 角色区 x≈25-419, y≈326-452)。
- **寄存器级证据**:`rdc debug pixel 33 25 326` trace 末尾,r28 = (-Inf,-Inf,-Inf,-Inf) **直接从上一帧历史纹理(uPrevGi)读入、原样写回** outGiReservoir(o1)——**时间反馈自锁毒化**:一旦某像素的 reservoir 变为非有限值,它永远无法自愈(Inf+x=Inf、NaN 全程传播,M 上限 20 冲不掉)。
- **根因链(2026-08-19 已逐指令定位,闭环)**:
  1. **播种(DDA 退化轴)**:GI 弹射方向 `dg = cosineSampleDir(n, rng)` 某分量恰为 0(轴对齐体素法线 + rng.x≈0 时 dg≈n,极常见)→ `invOrZero` 守卫 = 1e30(`:308`)→ `sign(rd)=0 → step=0` → marchFine 内该轴 `tMax = (bmin+cell·step−ro)·1e30 = −3.1e29` → 被 `min` 选中 → **真实体素命中携带 hit.t = −3.1e29**;
  2. **放行**:调用侧单侧范围检查 `(gh.hit && gh.t < 40.0)`(`:650`)—— −3.1e29 < 40 通过;
  3. **爆炸**:bounceShade 雾项 `fogF = 1−exp(−t·0.012)` = `1−exp(+5.45e27)` = `1−Inf = −Inf` → `mix(col, fog, −Inf)` = **candRadiance = −Inf×3**(`:568-569`);
  4. **合并**:candTargetPdf = lum(−Inf) = −Inf → candContribution = −Inf;weightSum = −Inf + risWeight(已被毒化历史 +Inf) = **NaN**;
  5. **写回自锁**:finalW = NaN/max(1e-6) = NaN → 写 (−Inf³, NaN) 回 RGBA16F 历史 → 下一帧 tempWeightSum 非有限 → **永久毒化,无自愈**(Inf+x=Inf、Inf−Inf=NaN,M 上限 20 冲不掉;帧 30→600 毒化 texel 数稳定 ~280-295,不自愈也不扩散)。
- **放大因子(H1,已与 NVIDIA RTXDI 官方源码对照确认)**:GI 估计器 `candTargetPdf = luminance(candRadiance) + 1e-6`(`:651`)缺少 cosθ 项 → 候选权重 = lum·π/cosθ,掠射角 cosθ 触底 1e-4 时放大 31416×。RTXDI `RAB_LightSampling.hlsli:88` 用 `luminance(Li·BRDFtimesNoL)`(Lambert = cosθ/π),cosθ 对消、权重有界;且参考实现在入 reservoir 前钳制 radiance(`c_MaxIndirectRadiance = 10`)。

## 1. 环境与捕获配方(已验证可用)

| 项 | 值 |
|---|---|
| rdc doctor | ✅(renderdoc.pyd 1.41 @ `%LOCALAPPDATA%\rdc\renderdoc`;renderdoccmd 1.45;rdc-cli 0.5.4) |
| GPU | AMD Radeon RX 9070 XT(另:AMD 核显 + Oray/MuMu 虚拟显示) |
| 浏览器 | `C:\Users\yuhang\AppData\Local\ms-playwright\chromium-1234\chrome-win64\chrome.exe`(Chrome for Testing;正式版 Chrome 151 同样可行) |
| dev server | 6_patapon3D 需先 `npm install`(node_modules 不入库),`npm run dev` → 5183 |
| 捕获文件 | `%TEMP%\kilo\renderdoc\restir_frame600.rdc` |
| 分析脚本 | `%TEMP%\kilo\renderdoc\scan_inf.py`(`rdc script` 在 daemon 内跑,GetTextureData 扫描非有限 texel) |

**可用捕获命令**(关键:`--in-process-gpu` 把 ANGLE D3D11 放进浏览器主进程;**所有路径必须正斜杠**,见 §3-引号 bug;不要加 `--disable-direct-composition`,否则无 present 帧边界):

```
rdc capture -o C:/Users/yuhang/AppData/Local/Temp/kilo/renderdoc/restir.rdc --frame 600 --timeout 90 --keep-alive -- C:/Users/yuhang/AppData/Local/ms-playwright/chromium-1234/chrome-win64/chrome.exe --no-sandbox --in-process-gpu --disable-gpu-sandbox --no-first-run --user-data-dir=C:/Users/yuhang/AppData/Local/Temp/kilo/chrome-rdc-profile10 http://localhost:5183
```

捕获后检查:`rdc open <rdc>` → `rdc passes`(游戏主 pass = "3 Targets" 那个)→ `rdc rt <EID> --target N -o x.png`(0=color, 1=GI reservoir, 2=surface)→ `rdc pick-pixel X Y <EID> --target N --json` → `rdc script scan_inf.py --json` → `rdc debug pixel <EID> X Y --json`。

**帧号语义**:`--frame N` 数的是浏览器进程的 D3D11 present 帧(含页面加载前的空白帧);N=600 ≈ 启动后 10s,游戏已渲染约 2-3s,reservoir 已收敛(M 到上限 20)。

## 2. GPU 实测数据(frame 600,EID 33)

### 2.1 结构验证(全部符合设计)

- 主 pass PS 绑定:3×2D 历史纹理(uPrevGi/uPrevSurface/uPrevColor)+ 2×3D 体素纹理(uGrid/uMacro)✅
- ping-pong 方向正确(读本帧 read 端、写 write 端;blit pass 读 color 附件上屏)✅
- 静态栅栏像素 (400,500):surface=(oct 0,0, **深度 43.03**, **M=20**),reservoir=(radiance≈(0.008,0.013,0.050), finalW=21.6)——M 收敛到上限、权重有限 ✅
- boss 鼓面 (880,430):M=20,finalW=6.28(≈2π,与收敛期 E[π/cosθ]=2π 的理论期望一致)✅
- 天空 (100,30) 与水面 (530,700):reservoir/surface 全零(M=0 门控生效)✅
- surface 纹理全图 0 个非有限值 ✅

### 2.2 毒化定量(scan_inf.py,1061×811 = 860,451 texels)

| 纹理 | 通道 | +Inf | -Inf | NaN | 合计 texel |
|---|---|---|---|---|---|
| reservoir (683) | rgb(radiance) | 0 | 127×3 | 0 | **127** |
| reservoir (683) | a(weight) | 152 | 0 | 127 | (+152 独立 texel) |
| surface (686) | 全通道 | 0 | 0 | 0 | 0 |

- +Inf weight 样本:(874-962, y=247) radiance≈(0.217,0.268,0.175) 有限;同值横跨 5 个采样点——时间复用把同一份已收敛样本铺满栅栏顶缘水平带。
- -Inf radiance 样本:(25,326) (25,352) (138,386) (138,412) (99,438) (380,452)… 全部 (-Inf,-Inf,-Inf,NaN),聚集在左侧角色区。
- `rdc debug pixel 33 25 326`:trace 尾部 r28=(-Inf×4) 在最终化之前**已存在**(来自历史纹理采样),直接写回 o1;另见中间寄存器 r0=(-Inf,-Inf,-Inf,0)。**非有限值跨帧自我维持**,实锤。

### 2.3 根因链(完整,2026-08-19 逐指令闭环)

**-Inf radiance 负号来源已定位**(frame 30 捕获 + `rdc debug pixel` 全 trace `dbg_25_326_f30.json` 15104 步 + DXBC 反汇编 `ps33.dxbc` 3794 行,trace instr N ↔ 反汇编 instr N−1):

```
播种(帧内独立生成,非来自历史):
  dg = cosineSampleDir(n, rng) 某分量恰为 0
    (体素法线轴对齐;rng.x≈0 时 dg≈n —— 系统性高频事件,非边角)
  → invOrZero = 1e30 (:308)
  → sign(rd)=0 → step=0 → 该轴 tMax=(边界−ro)·(−1e30) = −3.1e29
  → marchFine :386-401 的 min 比较选中它 → hit.t = −3.1e29(真实体素命中,垃圾 t)
  → 调用侧 (gh.hit && gh.t < 40.0) (:650) 单侧检查放行
  → bounceShade 雾 fogF = 1−exp(−(−3.1e29)·0.012) = 1−exp(+5.45e27) = 1−Inf = −Inf (:568)
  → mix(col, fog, −Inf) = candRadiance = −Inf×3 (:569)
    [DXBC 证据:listing 1222-1226,r22.w: 5.45243e+27 → +Inf → −Inf;
     trace 13812: r25 = (−Inf,−Inf,−Inf, 0.0106)]

合并毒化(本帧):
  candTargetPdf = lum(−Inf)+1e-6 = −Inf (:651;listing 1389-1390)
  candContribution = candWeightSum·(−Inf) = −Inf (listing 1393)
  历史载入 uPrevGi = (有限 rgb, a=+Inf) —— 更早帧已由同一机制 + H1 溢出毒化
    (listing 1394 sample: r28.a=+Inf)
  risWeight = +Inf·tempTargetPdf·tempM = +Inf (listing 1416-1417)
  weightSum = −Inf + +Inf = NaN (listing 1419;trace 13844: r30.y=NaN)
  finalize finalW = NaN/max(selTargetPdf·M, 1e-6) = NaN (listing 1436-1438)
  写回 o1 = outGiReservoir = (−Inf,−Inf,−Inf, NaN) (listing 1441-1443, 3755-3756)
  o2 = surface = (oct, 29.94, M=4) —— 表面历史反复重建(M 小)但毒化仍跨帧存活:
  种子每帧由 DDA 退化独立再生,不依赖历史存活

自锁(跨帧):tempWeightSum 非有限 → risWeight ±Inf → weightSum ±Inf/NaN → …… 无自愈
```

**注意**:renderdoc 1.41 DXBC 调试器在分支附近显示的部分早期 NaN(instr ~26-32,有限输入 `ge`/`and` 出 NaN,物理上不可能)为调试器产物,分析时只采纳有完整因果链支撑的非有限赋值(1196 起)。

### 2.4 二分定位(毒化起始帧)

| 捕获 | 结果 |
|---|---|
| frame 5(`restir_frame5_frame5.rdc`) | 游戏 canvas 尚未初始化(最大纹理 375×187)——Chrome present 计数下 canvas 约 frame 10-25 才出现 |
| frame 30(`restir_frame30b_frame30.rdc`) | reservoir ping-pong 对 697/719 **已毒化 ~295 texel**;weight 通道为 **−Inf**(帧 60 翻转为 +Inf——合并代数符号漂移,毒化集合稳定) |
| frame 60/600 | ~292/279 texel,与 frame 30 持平 → **毒化在最初 ~30 帧内完成播种,之后自我维持、不扩散** |

### 2.5 RTXDI 官方参考对照(H1 实锤)

- `RAB_LightSampling.hlsli:88`:`RAB_GetGISampleTargetPdfForSurface = luminance(Li · BRDFtimesNoL(surface,L))`;`RAB_Material.hlsli` Lambert BRDF = cosθ/π → 候选 risWeight = targetPdf·(1/pdf)·M = lum·cosθ/π·π/cosθ = **lum(Li),cosθ 对消、有界**。
- GI/TemporalResampling.hlsl:`c_MaxIndirectRadiance = 10` —— radiance 入 reservoir 前钳制(萤火虫/溢出防护)。
- 本项目 `:651` `candTargetPdf = luminance(candRadiance) + 1e-6`、`:654` `candWeightSum = π/cosθ` → 候选贡献 lum·π/cosθ,cosθ 触底 1e-4 时 **31416×**;无 radiance 钳制。H1 既是偏差源也是 +Inf weight 溢出(毒化带 y≈247-273)的推手。

## 3. 捕获过程踩坑记录(9 败 1 成)

| # | 路径 | 结果 | 根因 |
|---|---|---|---|
| 1 | `rdc capture -- chrome.exe <flags> <url>` | ❌ target disconnected | Chrome 浏览器进程拦截第三方 DLL 注入(module allow-listing) |
| 2 | + `--hook-children` | ❌ 同上 | 根进程注入即失败 |
| 3 | 技能文档 `--gpu-startup-dialog` 暂停流 | ❌ 对话框不出现 | Chrome 151 / Chromium-1234 已不弹该调试窗(GPU 进程窗口枚举:只有不可见 Chrome_WidgetWin_0) |
| 4 | 换 Playwright Chromium-1234 | ❌ 同样无对话框 | 版本行为,非品牌差异 |
| 5 | 竞速注入运行中 GPU 进程(发现≈2.5s) | ⚠️ 注入成功、TargetControl 连通 20s,TriggerCapture 无捕获 | D3D11 设备已创建,注入太晚 |
| 6 | `--gpu-launcher=` 挂起包装器(CREATE_SUSPENDED)+ 挂起态注入 | ❌ 恢复即死,Chrome 重生 GPU 进程 | 入口未运行时加载 renderdoc.dll,恢复后崩溃 |
| 7 | 同上,先恢复立刻注入 | ❌ 同样死亡 | chrome_elf 引导期(0~1s)注入必死;窗口 ≈1~2.5s,不可靠 |
| 8 | `rdc capture -- chrome --in-process-gpu --disable-direct-composition` | ⚠️ 注入存活 60s 但零捕获 | 禁 direct composition 后无 swapchain present,无帧边界 |
| 9 | 同上保留 direct composition | ⚠️ overlay 显示 "D3D11 frame XXX"(用户肉眼确认)但页面空白 | rdc-cli 引号 bug:URL 变成 `http://'--user-data-dir=c/Users/...'` |
| 10 | 同 9 + **全部路径改正斜杠** | ✅ **成功**(restir_frame600.rdc) | rdc/commands/capture.py:137 用 POSIX `shlex.join` 拼参:含 `\` 的参数被整套单引号,Windows 侧原样保留 → 参数损毁;`/` 在 shlex 安全集内不加引号 |

**基础设施沉淀**(均在 `%TEMP%\kilo\renderdoc\`):
- `gpu_launcher.py` + `capture_webgl_suspended.py`:GPU 进程 CREATE_SUSPENDED 派生 + pid/token 文件注入控制器(对本场景无效,但对"必须在设备创建前注入"的 Vulkan/WebGPU 场景可能仍有价值)。
- `capture_webgl_race.py`:竞速注入版(证明运行中 GPU 进程可注入、可连 TargetControl)。
- `scan_inf.py`:非有限 texel 扫描器(可复用于任何 RGBA16F 历史纹理)。
- `rdc` 无 inject 子命令;对已注入目标:`rd.EnumerateRemoteTargets('localhost',0)` 查 ident → `rdc attach <ident>` → `rdc capture-trigger` → `rdc capture-list`/`capture-copy`。

## 4. 修复建议(按优先级)

| # | 问题 | 修复 | 位置 |
|---|---|---|---|
| F0a | **种子:DDA 退化轴垃圾 t(根因,已逐指令实锤)** | marchFine/marchGrid 步进选择时跳过 `step==0` 的退化轴(标准做法:该轴 tMax 直接置 +Inf);或命中接受处统一 `hit.t >= 0` | `:362-405`, `:409-469` |
| F0b | 单侧范围检查放行负 t | `(gh.hit && gh.t >= 0.0 && gh.t < 40.0)`(一行护栏,成本最低);阴影/反射/主射线调用点同查 | `:650`, `:592`, `:599`, `:772`, `:797` |
| F0c | 雾项对垃圾 t 不鲁棒(同类漏洞 4 处) | fog 前 `t = clamp(t, 0.0, 300.0)`;bounceShade、shadeGrid 主路径、`:526`、`:758` 同一模式都要改(主射线也可能轴对齐) | `:526`, `:568`, `:711`, `:758` |
| F0d | candRadiance 非有限入合并 | 合并前消毒:`if (any(isnan(candRadiance)) \|\| any(isinf(candRadiance))) candRadiance = vec3(0.0)`(GLSL ES 3.0 有 `isnan/isinf`);并照 RTXDI 钳制上限 `min(candRadiance, vec3(10.0))` | `:650-654` |
| F1 | reservoir 毒化自锁(传播) | **读侧消毒**:temporal 合并前校验 `isnan/isinf(tempWeightSum) \|\| tempWeightSum<=0 → 拒绝复用`;radiance 同样校验。**写侧钳制**:`giResWeight = min(finalW, 6.0e4)`(RGBA16F 上限余量)。RTXDI 同款机制即 `Utils/BoilingFilter.hlsli`(原计划 M3+,此 bug 证明需要提前) | `:675-697` |
| F2 | GI 估计器 1/cosθ 放大(H1,RTXDI 对照确认) | 把 cosθ 折进目标函数:`candTargetPdf = luminance(candRadiance)·cosTheta/π + 1e-6`(temporal 分支无命中点可重算 cosθ,jam 规模下可保持 luminance-only 近似——候选侧修复已消除最大溢出驱动 1/cosθ) | `:647-659` |
| F3 | 首帧历史纹理未清零(H3) | 创建/resetHistory 后对 2×3 附件各 clear 一次(当前依赖 Chrome 零初始化行为,规范上 undefined) | `:1007-1026`, `:1162-1165` |
| F4 | 阴影 EMA 复用无表面校验(H7) | 复用 GI 分支的 validTemporal(法线 dot>0.85 + 深度差),代替仅 `histM>0` | `:601-606` vs `:671-673` |
| F5 | 阴影盘与 GI 方向共用同一 hash(H2) | GI 用 `.yz` 或第二种子,消除每像素采样相关 | `:597` vs `:645` |
| F6 | 帧号 hash 精度(H5) | `mod(uFrameIndex, 1024.0)` 防大种子退化 | `:597`, `:645` |

**依赖关系**:F0 是种子(毒化的起点),F1 是传播锁(毒化的存活性),F2 是放大器(+Inf weight 带)。仅修 F1/F2 而不修 F0,新种子仍会每帧生成;仅修 F0 不修 F1,存量毒化存档仍不自愈(F0d 的消毒同时挡住写侧)。建议 F0a/F0b/F0d + F1 一次落地,F2 单独提交便于 A/B 画面对比。

验证回路:修复后重新捕获(§1 命令)→ `scan_inf.py` 应为 0 非有限 texel → `pick-pixel` 抽查 finalW 量级(收敛期应 ≈2π 量级)→ 肉眼试玩确认掠射角无萤火虫/黑斑。

## 5. 遗留问题

1. ~~-Inf radiance 的负号来源未逐指令定位~~ **已解决**(2026-08-19,§2.3):bounceShade 雾项对 DDA 退化轴垃圾负 t 溢出。
2. ~~RTXDI 参考库不在本机~~ **已解决**:从 GitHub 取得官方源码对照(`RAB_LightSampling.hlsli:88` / `RAB_Material.hlsli` / `GI/TemporalResampling.hlsl`),H1 实锤(§2.5)。
3. 本次捕获为静态相机(intro 运动矢量恒零);**相机运动场景**下的重投影正确性(H6:prevUv clamp 到边缘而非判无效)未验证——需要可动相机场景再抓一次。
4. 真 GPU 帧时(RESTIR.md M2 留待的"方案 1"验收)本次未测;RenderDoc 注入态不适合计时,需正常启动 Chrome + PerfBadge/watchdog 读数。
5. M3 空间重采样未实现(既定路线图项,非 bug)。

## 6. 操作经验补充(2026-08-19)

- **命名会话**:并行会话会劫持默认 `rdc` 会话(本机有 UE 会话在途),一律 `rdc --session restir open ...`;daemon 在脚本抛错后会损坏(GetTextureData 全体返回 0 字节),`rdc --session restir close` 重开即恢复。
- **renderdoc.pyd 1.41 API 缺口**:无 `GetDrawcalls/GetActions`(用 `GetRootActions()`)、无 `ActionDescription.name`、无 `rd.Usage`(枚举是 `rd.ResourceUsage`,打印为 int:32≈ColorTarget 写、35≈创建)、输出描述符属性是 `.resource`;D3D11 下 `GetPipelineState().GetOutputTargets()` 返回空——找写事件用 `GetUsage(rid)`。
- **纹理初始内容为 0 字节**:读历史纹理须先 `controller.SetFrameEvent(写入事件EID, False)` 再 GetTextureData。
- **trace JSON 需 `encoding='utf-8-sig'`**(带 BOM);**trace instr N ↔ DXBC 反汇编 instr N−1**(差一映射)。
- 捕获命名:rdc-cli `capture` 自动输出 `<name>_frame<N>.rdc`。

## 7. 会话清理状态

- 残留的 `chrome-rdc-profile*` Chrome 实例已全部结束(按 CommandLine 匹配清理,未触碰用户正常 Chrome)。
- dev server(5183)仍在后台运行,可直接复用。
- 未改动 `6_patapon3D` 任何源文件;本报告为唯一新增文件。
