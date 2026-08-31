# Hotline Shanghai / 热线上海

> Hotline Miami-style 顶视角像素射击 + 1937 上海孤岛期 + **真 2D Radiance Cascades 实时光影**。

## 状态

- **M1 单场景闭环 + M2.1-M2.3 完成**(2026-08-31):m1 哨塔大院 + m2 春申茶馆双任务可选、6 面具选择、死亡保留面具、C7 评分(C7 全拆灯加成)、通关持久化
- GDD v3 / TDD v4(contract-from-code,锚点版;v2 存档 `old/TDD-v2-frozen.md`);进度细节见 `KNOWLEDGE.md` + `docs/TASKS-100.md`
- `npx tsc -b --noEmit` 0 error;验证门 8 条全绿(TDD §0)
- 端口:**5184**
- 下一站:M2.4 BOSS 接线(finalBossId) → M2.5 声景 → m3_print

## 一句话

迈阿密热线手感 + 1937 弄堂暗战 + 真 2D Radiance Cascades — 枪火 / 油灯 / 霓虹 / 爆炸都是真实软阴影光源,不是 fake。

## 快速开始

```powershell
Set-Location C:\Git-repo-my\VibeGames\7_hotlineShanghai
npm install
npm run dev
# 打开 http://localhost:5184
```

## 文档

> 完整 17+ 文档地图见 [`docs/design/README.md`](docs/design/README.md)(2026-08-09 v3.1 立);此处只列顶层 5 份。

| 文件 | 角色 |
|------|------|
| [`AGENTS.md`](AGENTS.md) | 项目级规则 + C.A.T 硬规则(新人 30 分钟入门) |
| [`GDD.md`](GDD.md) | 设计层权威(冻结 v3) |
| [`TDD.md`](TDD.md) | 技术契约(冻结 v3.1) |
| [`MVP-PLAN.md`](MVP-PLAN.md) | 里程碑 + agent 拆分 |
| [`BUGS.md`](BUGS.md) | bug tracker |
| `docs/design/01..09-*.md` | 设计细节 9 份(01 概念 / 02 美术 / 03 音频 / 04 RC / 05 角色 / 06 blindside / 06 RC gotchas / 07 sprite / 08 关卡 / 09 blindside 整合) |

## 架构

C.A.T(沿用 4_chunbai / 5_gamejam_1 / 6_patapong3D):
- `core/` 平台纯净(零 THREE / 零 DOM / 零 zustand)
- `engine/` 平台适配 + **2D Radiance Cascades 全管线**
- `components/` React UI 覆盖层
- `store.ts` zustand UI 状态

## 关键约束

1. C.A.T 硬规则
2. 2D RC 必须是真实全管线(6 阶段 + dither 回压)
3. 零资产文件(程序化 sprite + Web Audio 合成)
4. v1 范围:8 武器 / 6 面具 / 4 任务 / 1 敌人 + 1 BOSS

## 命令

| 用途 | 命令 |
|------|------|
| 安装 | `npm install` |
| 开发 | `npm run dev`(http://localhost:5184) |
| RC 算法测试台 | 打开 http://localhost:5184/rc-lab/（进页面自动跑全部场景 + 断言） |
| RC 自动门禁 | `npm run rc-lab:check`（依赖 dev server + Playwright） |
| 构建 | `npm run build` |
| 类型检查 | `npx tsc -b --noEmit` |

## 依赖

- Three.js 0.170(场景 / 渲染器)
- React 19(UI 覆盖层)
- zustand 5(UI 状态)
- Tailwind 3.4(UI 样式)
- 原生 WebGL2 framebuffer(RC 管线)
- Web Audio API(音频合成)

## License

VibeGames monorepo 子项目,内部 vibe game。
