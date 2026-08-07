# 玩法文档维护手册（Playbook）

> 本文记录《Boss 的焦虑》玩法文档（how-to-play）与截图管线的完整做法，供未来复用/重制。
> 适用：更新截图、重建 HTML 版本、给其他项目做类似玩法文档。

## 1. 产物清单

| 文件 | 说明 |
|---|---|
| `docs/v1/how-to-play.md` | v1 玩法文档归档 |
| `docs/v1/how-to-play.html` | v1 一页速览 HTML 归档 |
| `docs/v1/how-to-play-slides.html` | v1 PPT 幻灯片归档（11 页，键盘翻页） |
| `docs/v1/playguide/*.png` | v1 干净截图（1280×720，已统一 gamma 提亮） |
| `docs/v1/playguide/annotated-*.png` | v1 标注版（单个红色箭头指向关键 UI，无红框） |

截图文件名与文档引用保持一致：`title / wait / perform-move / perform-line / evaluate / diary / ending`（各有 `annotated-` 前缀版）。

## 2. 截图管线（如何重新截图）

环境：Python 3 + `pip install playwright` + `playwright install chromium`；游戏 dev server `npm run dev` → http://localhost:5173（用 `webapp-testing` skill 的 `scripts/with_server.py` 托管 server 生命周期）。

关键调试钩子（仅 DEV 构建暴露）：
- `window.__sim` — `Simulation` 实例（运行时私有字段可直接读写，如 `__sim.state.phase`、`__sim.state.beat`）。
- `await import('/src/store.ts')` → `useUiStore` — zustand UI store，可用 `setState()` 临时控制 overlay。

### 2.1 状态推进顺序

1. 加载页面 → 清 `localStorage` 再 reload（保证无存档污染）。
2. `document.dispatchEvent(new CustomEvent("uiCommand", {detail:{kind:"startRun"}}))` → MENU → WAIT。
3. 键盘按 `1`（选庄重威严）→ WAIT 约 2s → SENSE 约 10s（影子逼近）→ PERFORM。
4. PERFORM 按剧本推进节拍（move 8s / line 10s / attack 10s / vfx 6-8s），一轮约 2-3 分钟。

### 2.2 每张截图的做法与时机

| 截图 | 做法 |
|---|---|
| title | 加载后直接拍（Menu 覆盖层） |
| wait | startRun 后约 2.5s（ScriptPicker 三卡在底部居中，右侧是档案侧栏） |
| perform-move | 等 `beat.type=='move'`；WASD 把 boss 走到光圈边缘（距 target >2.4 保持橙色）；拍前隐藏对白（见 2.3）；注入满弧线 beat（见 2.3） |
| perform-line | 等 `beat.type=='line'` 后约 2s（让打字机填字），保留对白框 |
| evaluate | 等 phase==EVALUATE；隐藏对白；按 `3`↓`4`↓`4` 打星后拍 |
| diary | 空格提交评分 → 等 phase==DIARY → 拍 |
| ending | 注入 `__sim.state.phase='ENDING_NORMAL'`、`round=4`、`boss.seen=70`（curtainA）→ 2.5s 后拍 |

### 2.3 三个关键坑（务必注意）

1. **Round-1 系统提示对白框会遮住节拍圈**（L_HINT 对白直到下一条台词才被替换）。
   解决：拍前 `useUiStore.setState({ dialogue: { active: null, queue: [] } })`；引擎约 0.5s 后回写，所以注入后 0.12-0.15s 内立即截图。
2. **move beat 的节拍圈弧线随时间消耗**（走位走到位时弧线可能已空）。
   解决：拍前注入满弧线 —— `useUiStore.setState({ beat: { type:'move', duration:8, remaining:7.5, targetPos } })`。
3. **场景整体很暗**（剧院暗场，旧截图同样暗）。截图后统一 gamma 提亮：
   `arr = (arr/255.0)**(1/1.65)*255`。提亮会让 UI（paper/candle 色）与场景都更可读。

### 2.4 标注管线（PIL）

- 纯红 `#ff0000` 单箭头：`ImageDraw.line(width=5)` + 三角头多边形（头长 16、半宽 8），**不要画红框**（用户明确不要红框）。
- 箭头指向（沿用当前构建的坐标）：
  - title → 「开始演出」按钮 `(555, 400)`，起自 `(380, 530)`
  - wait → 剧本卡片 `(645, 492)`，起自 `(430, 400)`
  - perform-move → 金色光圈 `(885, 445)`，起自 `(650, 560)`
  - perform-line → 对白框 `(640, 600)`，起自 `(640, 500)`
  - evaluate → 自评面板 `(408, 420)`，起自 `(230, 540)`
  - diary → 日记纸 `(920, 470)`，起自 `(680, 570)`
  - ending → 「再来一轮」`(505, 430)`，起自 `(320, 550)`
- 箭头路径选暗色背景以保证可见；画完后无需清除残留（干净截图无其他红色）。

## 3. HTML 版本约定

- **一页版** `docs/v1/how-to-play.html`：暗色主题，`--abyss:#0b1024 / --cold:#1a2a4a / --paper:#e8e0cc / --candle:#ff9a3c`，分节卡片布局，截图路径相对于 `docs/v1/`。
- **PPT 版** `docs/v1/how-to-play-slides.html`：`.slide` + `.active` 切换，`← → / 空格 / Home / End` 翻页，顶部进度条 + 右下页码。
- 两个 HTML 都是单文件自包含（无外部依赖），直接用浏览器打开 `file:///` 即可。

## 4. 验证

```bash
# Playwright 检查两个 HTML 图片全部加载（broken=0）
# 用 page.goto('file:///.../docs/v1/how-to-play.html') + 数 document.images 中 naturalWidth===0 的个数
```

v1 已冻结归档；后续修改只进入 `docs/how-to-play.md` 和 v2 资产，不覆盖此目录。

## 5. 与本项目其他约定的关系

- 截图来自当前构建（不是旧 0.1.0），文档页脚写「截图来自当前构建」。
- 存档相关：`localStorage` 存 diary/archive/stats；截图前清空保证可复现。
- 本项目无测试套件，typecheck 是验证门槛：`npx tsc -b --noEmit`。
