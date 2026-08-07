# Patapong 3D — Verification Report

> **每 M 末必填一份**(M1 / M2 / M3)。`agent-qa` 负责填证据,`mavis` 负责签核。

---

## 模板

### 里程碑:Mx

**日期**:YYYY-MM-DD
**签核人**:agent-qa / mavis
**commit range**:`M{x}.1` ~ `M{x}.y`(具体 commit hash)

#### 1. 自动化门

| 门 | 命令 | 结果 | 证据 |
|---|---|---|---|
| 类型门 | `npx tsc -b --noEmit` | ☐ PASS / ☐ FAIL | 见 commit 时的 terminal 输出 |
| 启动门 | `npm run dev` | ☐ PASS / ☐ FAIL | 端口 5183 监听,无 crash |
| 构建门(M3) | `npm run build` | ☐ PASS / ☐ FAIL | dist/ 生成,无 error |

#### 2. 视觉门(手动)

| 检查项 | 通过 | 备注 |
|---|---|---|
| 球场可见 | ☐ | |
| 球拍可见 | ☐ | |
| 球可见 | ☐ | |
| 配色正确 | ☐ | (对比 `TDD.md` §4.5) |
| 0 console error | ☐ | DevTools Console |

#### 3. 功能门(手动)

| 检查项 | 通过 | 备注 |
|---|---|---|
| W/S 控制 P1 | ☐ | |
| 球反弹 | ☐ | |
| 球出 X 边界 → 失分 | ☐ | |
| 比分到 7 → MATCH_OVER | ☐ | |
| (M2) Hit 触发 juice | ☐ | shake + particle + SFX + squash |
| (M2) Milestone 触发慢镜 | ☐ | 3 / 5 / 7 / 10 拍 |
| (M3) 完整 5 phase 流程 | ☐ | menu → ready → play → point → match_over → rematch |
| (M3) localStorage 跨刷新 | ☐ | stats + settings 保留 |

#### 4. 性能门

| 指标 | 目标 | 实测 | 备注 |
|---|---|---|---|
| FPS(主场景) | 60 | ___ | DevTools Performance 10s |
| Memory | < 200MB | ___ | DevTools Memory |
| Draw call | < 10 | ___ | `renderer.info.render.calls` |
| 三角形 | < 30k | ___ | `renderer.info.render.triangles` |

#### 5. 已知问题 / 砍单(If Any)

列出 M 末遗留的 bug / 设计妥协,及是否在后续 M 修复。

#### 6. Sign-off

- agent-qa:___________
- mavis:___________
- 用户(M1/M3 必):___________

---

## M1 Verification(2026-08-08 待填)

> M1 末填。预期:能玩,无 juice,无菜单精修。

**待填字段**:见模板

## M2 Verification(2026-08-09 待填)

> M2 末填。预期:完整 juice 体验,AI 调好。

**待填字段**:见模板

## M3 Verification(2026-08-10 待填)

> M3 末填。预期:可发版。

**待填字段**:见模板

---

*模板 v0.1 · 2026-08-07*
