# 9_3dplatform — 概念草稿库 (Concept Vault)

12 个「几乎没见过」的 Three.js 3D 平台游戏概念草稿，全部按 **intro-scene-until-perfect** skill 的结构书写：

- 每个概念 = **1 个 intro scene**（命题证明 + 教学节奏 ≤60s + 极致 case）——不是 3 岛 × 8 关
- 每个概念 = **设计/美术/代码三件套合并草稿**（晋升为正式项目时才拆成 GDD / Art Book / TDD）
- 每个概念诚实标注**最接近的先例**——novelty claim 必须经得起查
- **零 Tripo、零外部资产**：全部程序化几何 + Web Audio（遵守仓库约定；Tripo 仅作可选构建期工具，见 `../scripts/tripo.ps1`）
- 渲染默认复用 `../TDD.md` 的双层管线（光栅 PBR 保底 + WebGPU TSL 光追增强），每个概念标注 RT 收益

## 对比矩阵

| # | 概念 | 命题证明 (thesis) | intro scene + 极致 case | 核心动词 | RT 收益 | 最接近的先例 (差异) |
|---|---|---|---|---|---|---|
| 01 | SHADOWSTEP 影跃 | 影子是唯一的地面 | 黄昏庭院 + 可转油灯；90% 地面暗处不可走 | 转灯 | ★★★ 光影=碰撞 | Contre Jour (2D) |
| 02 | ECHO FORGE 回声铸台 | 你的过去是实体的 | 断崖峡谷；4 连跳 = 你 3 个回声当平台 | 铸回声 | ★☆ 回声半透明 | Super Time Force (2D 合体) |
| 03 | FERRO 铁磁滴 | 你是被磁力弯曲的液体 | 磁阱房间；磁弧荡过虚空裂缝 | 放磁极/分身 | ★★ 液态金属反射 | Gravity Ghost (2D) |
| 04 | KALEIDO 万花镜 | 你同时是 N 个人 | 6 折镜廊；6 镜像同步跳 | 同步锁 | ★★★ 真镜面 | Splitter Critters (2D) |
| 05 | PHASEWALK 四相行者 ✅ **已晋升 → `10_phasewalk/`** (2026-08-13, toon 3D 纸叠风) | 世界有 4 层重叠 | 四相塔；80% 幽灵层同时可见 | 相位切换 | ★☆ 玻璃相位 | Quantum Conundrum |
| 06 | SONAR 声呐 | 你的 ping 是唯一的光 | 深渊洞穴；98% 纯黑 2 秒脉冲 | 声呐 ping | ★★ ping 波纹 TSL | Devil's Tuning Fork (2D) |
| 07 | BONE TOWER 骨塔 | 你的身体就是建材 | 断裂骨塔；拆腿骨当桥 | 拆骨/接回 | ★☆ 骨面高光 | Skeleton Boomerang (2D) |
| 08 | COMPASS ROT 罗盘坠 | 重力向你的罗盘指的方向 | 离心轮房；每 0.8s 转 90° | 转罗盘 | ★★ 镜面墙 | Gravity Rush / And Yet It Moves |
| 09 | JENGA REACH 拆塔攀 | 拆塔就是造路 | 40 层积木塔；抽 1 块塔倾 15° | 抽块借力 | ★☆ 废墟反射 | Noita (2D) / Besiege |
| 10 | WEATHERVANE 四季水灵 | 一座岛四张地图 | 环礁湖岛；一键全湖冻成镜 | 换季 | ★★★ 冰镜 | Oracle of Seasons (2D) / BotW |
| 11 | INKLINE 墨线 | 路是画出来的 | 30m 空白断崖；坠落中画 3 笔自救 | 射墨 | ★☆ 湿墨光泽 | Unfinished Swan / Splasher (2D) |
| 12 | ORBITFALL 轨道坠 | 你不是跳，是变轨 | 1 星球 + 3 碎环；吃陨石轨道收缩弹出 | 质量交易 | ★★ 星面反射 | Mario Galaxy / Kerbal |

## 决策建议（intro-scene-until-perfect Phase 0 决策树）

选 1 个晋升的标准（按 skill）：**命题证明力 > 教学力 > 极致 case**。

- **RT 主题契合度最高**：01 SHADOWSTEP（光追阴影 = 玩法本身）、04 KALEIDO（真镜面）、10 WEATHERVANE（冰镜）——与 `9_3dplatform/TDD.md` 的双层管线形成互证。
- **程序化最便宜**：05 PHASEWALK、12 ORBITFALL（纯数学 sim，零物理引擎风险）。
- **最"几乎没见过"**：02 ECHO FORGE、03 FERRO、07 BONE TOWER、09 JENGA REACH。
- **不建议首选**：06 SONAR（黑暗可读性风险高）、08 COMPASS ROT（晕动风险）、09 JENGA REACH（物理抖动风险）。

每个文件自包含；晋升流程 = 该文件 → 拆成 3 件套（GDD/Art Book/TDD，skill §5.7）→ 顶层建项目目录（`NN_xxx/`，端口 5187+）。
