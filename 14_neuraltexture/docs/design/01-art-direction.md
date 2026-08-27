# Art Book — 14_neuraltexture

## 调色

| 角色 | sRGB hex / linear | 用途 |
|---|---|---|
| 夜空 | `#05060a` | 背景 + fog |
| 釉墨 | linear `(0.035, 0.028, 0.032)` | 陶瓷本体 |
| 金缮 | linear `(0.78, 0.52, 0.14)` | 金属脉 |
| 粘土 | linear `(0.22, 0.12, 0.07)` | 哑光岛 |
| key | `(8.0, 6.4, 4.2)` / r² | 钨丝点光 |
| fill | `(0.18, 0.22, 0.32)` | 冷蓝半球补 |
| 误差 | `\|T−N\| × 8` | 右球；黑 = 对齐 |

## Forbidden

- 贴图文件、HDRI、glTF shaderball（零运行时资源）。
- Bloom / SSAO / SSR（MLP 命题会被后处理洗掉）。
- 彩色噪声潜变量可视化当「最终画面」。
- 把 NTC 的彩虹 feature-grid 误当成神经材质。

## 资产 4 tier

### Tier 1 MUST

- UV 球 × 3，同一几何同一材质函数
- 圆柱基座 × 3
- 程序化陶瓷 SVBRDF（釉 / 金 / 粘土）
- 绕转 key light 指示球
- 8 通道 latent atlas 条

### Tier 2 juice

- ACES + exposure 0.85
- fog 压远场
- HUD 等宽数字
- 误差 ×8 热图

### Tier 3 装饰

- 半球光、地面圆盘

### Tier 4 可选（M2+）

- 潜变量通道假色切换
- 训练 loss sparkline
- shaderball 网格（课程 `shaderball.glb` 是 CC0，但 intro 不引入网格文件）

## 极致 case

釉面 roughness 0.07 的高光宽度只有几个像素。如果 Rusinkiewicz 没进网络，中间球的高光会糊成胖斑 —— 那就是 intro 失败。
