# 12 — 测试 / 冒烟剧本库

> **本文档 = 当前维护的脚本与浏览器门禁使用手册**。
> 验证门:14 §5 + BUGS 修复后必跑。
> 改本文件 = `[DESIGN-LAYER-CHANGE]`(Mavis 签核)。

## 1. 当前维护入口

| # | 入口 | 用途 | 何时跑 | 跑多久 |
|---|------|------|-------|-------|
| 1 | `npm run e2e:playtest` | 4 组哨塔大院浏览器契约 + 截图 | **改 gameplay / RC / 数据表必跑** | ~30s |
| 2 | `node scripts/playtest.mjs` | 上述门禁的兼容启动器；旧单场景参数会警告后跑完整套件 | 旧文档 / 自动化兼容 | ~30s |
| 3 | `npm run rc-lab:check` | RC Lab + 生产管线 port 共 35 checks，并检查 showcase / intro-copy | **改 shader / pipeline 必跑** | ~30s |
| 4 | `npm run combat-loop:check` | 地图、碰撞、巡逻、塔守锚定与战斗结构契约 | **改 simulation / mission 必跑** | ~10s |
| 5 | `npm run light-break:check` | 拆灯与 power-gate 契约 | **改 light / tower gate 必跑** | ~10s |
| 6 | `npm run intro-polish:check` | intro 表现与 UI 静态契约 | **改 render / UI 必跑** | ~10s |
| 7 | `npm run intro-assets:check` | approved intro sprite manifest / 处理结果 | **改 sprite 必跑** | ~10s |
| 8 | `scripts/visual-check.mjs` / `scripts/smoke.mjs` | 历史诊断入口，非当前冻结浏览器门禁 | 定点排查 | 视环境 |

Playwright 不写入 `package.json`。两个维护的浏览器入口都通过 `npm exec --offline --yes --package=playwright` 解析本机 npm cache，并由 `scripts/run-e2e.mjs` 把实际模块路径传给 spec；禁止恢复机器专属绝对路径。

## 2. 完整回归门

```bash
# 顺序:轻 → 重
npm run typecheck
npm run build
npm run combat-loop:check                # 关卡 / AI / 塔守 / cover 结构
npm run light-break:check                 # 拆灯与 power gate
npm run intro-polish:check                # UI / 表现静态门
npm run intro-assets:check                # approved sprites
npm run rc-lab:check                      # standalone + production port 35/35，showcase，intro-copy
npm run e2e:playtest                      # 当前 4 组浏览器契约
```

涉及巡逻 / cover / tower FSM 时，`combat-loop:check` 连续跑 5 次。涉及浏览器性能时，重复 `e2e:playtest` 并如实报告任何 p95 flake，不得放宽预算。

## 3. 浏览器 gameplay 门

**入口**:`npm run e2e:playtest`。`node scripts/playtest.mjs` 只作为兼容别名委托到同一套件。

当前四组契约位于 `scripts/hotline-e2e.spec.js`:

1. darkness combat loop + visual light gate
   - 出生安全、玩家随身微光、塔守 power gate
   - powered lamp 相对 broken lamp 的定向亮度差 `> 4`
   - RC 半分辨率工作缓冲
   - performance:average `< 35 ms`,p95 `<= 50.01 ms`,latest RC `< 50 ms`
2. flashlight detection → death → retry
3. 哨塔大院远程射击仍可用
4. gunshot suspicion + alert shout propagation

失败时优先查看:

- stdout 的 `RC_PERF` / `RC_LAMP_LUMA`
- `smoke/hotline-e2e-*.png`
- Playwright trace / `test-results`
- `window.__sim.snapshot()` 与 `window.__rcPipeline`

旧的 Title → Mission Select → Mask Select → 九场景多房流程已从当前产品删除。任何仍写“9/9”的文档都是历史漂移，不是验收标准。

## 4. RC 算法 / 展示门

**入口**:`npm run rc-lab:check`。

同一个 Playwright worker 验证:

1. `/rc-lab/` standalone reference:35/35
2. `src/engine/RcPipeline` port:同一套 35/35
3. `/rc-showcase/`:active cascade + FPS + 无 console/page error
4. `/rc-intro-copy/`:active cascades、JFA passes、dither off、无 console/page error

生产 port 通过 adapter 使用 full-resolution 算法验证 profile:

```ts
{
  baseIntervalPx: 1.5,
  resolutionScale: 1,
  ambientIntensity: 0.03,
  ditherEnabled: false,
}
```

adapter 不强制 `cascadeCount`:比较多 cascade 与单 cascade 的 case 必须保留各自变体。生产游戏本身使用 3 cascades、`baseIntervalPx = 6`、半分辨率工作缓冲和 full-resolution final output。

`scripts/rc-lab-check.mjs` 是旧的 direct-import runner，保留作历史参考但不是 package script 的执行路径；不得把它描述为 `npm run rc-lab:check` 的等价实现。

## 5. 纯数据 / 定点诊断脚本

- `node --experimental-strip-types scripts/player-check.ts`
- `node --experimental-strip-types scripts/enemy-check.ts`
- `node --experimental-strip-types scripts/lightfield-check.ts`
- `node scripts/smoke.mjs`
- `node scripts/visual-check.mjs`

这些脚本用于子系统定位；当其假设与当前单一 connected tower-compound 不一致时，先修脚本或改用维护门，不得据旧 mission/mask 流程判定当前产品失败。

## 6. 失败处理

1. 先保留完整错误与环境信息。
2. 用户报告、build/type/test failure 都登记 `BUGS.md` 和 `.wolf/buglog.json`。
3. 修复后重跑失败门以及相邻门。
4. RC 灯光比较必须保持同一玩家位置并断言 `intact - broken > 4`；不得改成绝对值。
5. 性能 gate 不得通过提高阈值或删除慢帧来“修复”。若调整 fixture，必须仍代表稳定 gameplay 且保留原预算。
6. 不删除来源不明的 `test-results`；先确认所有权。

## 7. 提交前记录

记录实际执行的命令、pass 数、性能样本、灯光 delta、未解决 flake 和截图路径。涉及冻结契约的提交仍必须走 `11-contract-change-procedure.md` 并取得 Mavis / 项目 owner 签核；仅测试通过不等于可以提交。
