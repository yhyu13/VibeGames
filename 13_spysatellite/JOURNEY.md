# JOURNEY — 13_spysatellite（EYE-13）

> 两列进度：左 = 人说的 / 拍板的，右 = agent 落地的。不是 GDD，也不是验证稿。

ME = 人。YOU = AI。本文件新建，不覆盖其他项目的 JOURNEY。

---

## 0. 一句话

一夜 SAR 卫星：core 只跑 20 m 院子，engine 负责「你在 412 km 上」这条谎。90 秒、7 拍无线电、点击即答案。

---

## 1. 时间线

### 2026-08-26 · 设计冻结

| ME | YOU |
|----|-----|
| 立项 13_spysatellite；companion 上过 Design §1–§3 | 冻结：1 VIP · 1 街区 · 1 天气窗 · 1 次暗杀；player fantasy = 无线电操作员；镜头 = 真轨道穿云落到院子；lock = click-to-lock；院子 DNA = night SAR/IR |
| §2 数字过关 | SAR +18%/s −12%/s，满则 2.5s drop；树冠 ≥0.4s / 关 SAR ≥0.6s / 过热 / 拉出院子丢 lock；7 拍脚本；2 拍失败 abort |
| §3 架构过关 | C.A.T：core = 20 m sim；engine = OrbitShell（不可点）+ zoom lerp（仅相机）+ CourtyardTile（全部 picking）+ React HUD |
| §4 原计划只写文档 | 会话超时，文档没落盘 |

### 2026-08-27 · 实现 + 自检

| ME | YOU |
|----|-----|
| now impl game `13_spysatellite` | 按冻结契约搭 Vite 6 / React 19 / three 0.185 / zustand 5；core `step()` 1/60；OrbitShell + CourtyardTile + CameraRig |
| （隐式：要能玩） | 端口 5190 已被 `14_neuraltexture` 占用，改 **5191**。Playwright 截图先全黑：`preserveDrawingBuffer` + 去掉 scanlines 的 `mix-blend-mode` |
| | 第一版轨道相机在 50 m 高度，云是 20 m 平面，楼从云里戳出来。改成相机 `(0, 72, 410)`，云包在地平线球上 |
| go | `__sar(true)` 写 `sensor.sarOn`，下一帧 `stepHeat(sarHeld)` 清掉。补 `InputManager.forceSar` + `__holdSar`。长按 Space 5.6s 过热（+18%/s），浏览器里看到 100% + BLIND |
| 1 self critic improve test, dump learning to journey；2 write zhihu doc | 自检：过热后 `heat` 仍为 1，下一帧立刻再盲。补 vitest 20 条钉 `step()` 接缝；过热时 `heat = 0`。空跑到 beat 4 会先 abort（2 拍超时）——测试要预置 1–3 拍结果。写本 JOURNEY + 知乎专栏稿 |

---

## 2. 自检清单（这次真正踩过的）

| # | 现象 | 根因（文件） | 修法 | 谁先抓到 |
|---|------|-------------|------|----------|
| 1 | 过热结束后再按 Space 立刻再盲 | `stepHeat` 满 100% 时 `heat` 停在 1（`sensor.ts`） | 过热瞬间 `heat = 0`，再走 2.5s drop | 测试「after overheat drop, holding SAR does not instantly overheat again」 |
| 2 | `__sar(true)` 一帧后又灭 | DEV 写状态，sim 每拍用 `sarHeld` 覆盖（`devtools.ts` / `sensor.ts`） | `__holdSar` → `InputManager.forceSar` | 浏览器 playtest + 测试 `sarOn is owned by stepHeat` |
| 3 | 截图全黑，HUD 在 a11y 树里 | WebGL 默认不保留 drawing buffer；scanlines `mix-blend-mode: screen` | `preserveDrawingBuffer: true`；HUD `z-index: 5` | Playwright 截图 vs `getBoundingClientRect` |
| 4 | 「轨道」看起来像无人机贴云飞 | 相机 `(0, 52, 26)`，云是院子上方的平面 | 相机拉到地平线外；云 = 包着 limb 的球 | 肉眼截图 `13-orbit.png` |
| 5 | 空跑到 beat 4 测「点 van 算错」失败 | 1–3 拍超时已经 abort | 测试预置 `results[0..2] = pass` 再跳到 t=52 | 测试红了一次 |
| 6 | TDD 写「不要测试框架」 | 设计 §3 当时的门是 tsc + 试玩 | 用户要测之后，vitest 钉 core 接缝；浏览器仍测谎言层 | 自检 |

没改、也不是这次的 bug：90s timeout 在 80s 开枪之后基本走不到。它是安全网，测试钉的是「80s 没 GO → miss，不是 timeout」。

---

## 3. 现在能跑什么

- `npm run typecheck` 0 error
- `npm test` 20/20
- `npm run build` 绿
- `npm run dev` → http://localhost:5191
- DEV：`__sim` `__holdSar` `__zoomTo` `__lock` `__beat` `__click` `__end` `__manifest`

---

## Open items

- 院子 SAR 热斑可读性还要 polish（半径已加大，additive blend 已开）
- 30s 人工试玩：zoom + 短按 SAR + lock VIP + 答一拍，过热路径已见，完整 7/7 还没在浏览器里打完
- 知乎稿在 `docs/zhihu/`（article.md + 12 PNG + PUBLISH.md），未发布
- 工作区未 commit
