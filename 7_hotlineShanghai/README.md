# Hotline Shanghai / 热线上海

> Hotline Miami-style 顶视角像素射击 + 1937 上海孤岛期 + **真 2D Radiance Cascades 实时光影**。

## 状态

- **M0 设计冻结**(2026-08-08)
- GDD v2 / TDD v2 已就位(v1/v2 原始版存档于 `v2/`)
- 代码 stub 已就位,`npx tsc -b --noEmit` 0 error
- 端口:**5184**
- 下一站:M1 — 1 房间 + 1 任务 + 2D RC 全管线跑通

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

| 文件 | 角色 |
|------|------|
| `GDD.md` | 设计层权威(冻结 v2) |
| `TDD.md` | 技术契约(冻结 v2) |
| `MVP-PLAN.md` | 里程碑 + agent 拆分 |
| `AGENTS.md` | 项目级规则 |
| `docs/design/01..04-*.md` | 设计细节 |

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
