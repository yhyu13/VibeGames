# PUBLISH — EYE-13 知乎专栏发布包

> 只列上传顺序，不自动发布。先上传图片，再粘贴正文。

## 标题

别造地球了：我的卫星游戏，只模拟了一块 20×20 米的院子

## 导语（可选，粘贴到知乎摘要栏）

一个 90 秒的夜间 SAR 卫星游戏，核心逻辑其实只模拟了一块 20×20 米的院子。轨道、云、地平线都是引擎层画出来的谎，输赢由一条只有三个字段的纯函数接缝决定。

## 上传顺序（图片按文中出现顺序）

| # | 文件 | 对应段落 |
|---|------|---------|
| 1 | `images/01-probe.png` | 为什么 / 接缝 |
| 2 | `images/02-wrong-right.png` | 错路 / 正路 |
| 3 | `images/03-thread.png` | 脉络 |
| 4 | `images/04-tree.png` | 整棵树 |
| 5 | `images/05-dual-scale.png` | 双尺度谎 |
| 6 | `images/06-zoom-gate.png` | zoom01 门 |
| 7 | `images/07-sar-heat.png` | SAR 热机 |
| 8 | `images/08-lock-drop.png` | lock 四种死法 |
| 9 | `images/09-radio-7beats.png` | 7 拍无线电 |
| 10 | `images/10-shot-winlose.png` | 80 秒胜负 |
| 11 | `images/11-harvest.png` | 收获和结论 |

## 粘贴步骤

1. 在知乎编辑器里按上表顺序逐一插入 PNG（本地 `images/` 路径知乎不会自动读取，需手动上传或走图床）。
2. 粘贴 `article.md` 正文；文中的 `![alt](images/xx.png)` 会被替换成你插入的图片。
3. 发布前替换两处占位：正文「我维护这套系统时……[作者补一句：…]」这一段换成你自己的第一人称经历。

## 检查

- `article.md` 无 mermaid、无 SVG。
- 图片全部为 PNG，长边 ≤ 1600px。
