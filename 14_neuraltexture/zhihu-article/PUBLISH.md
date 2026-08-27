# PUBLISH — 发布说明（知乎专栏）

## 标题

把 GGX 材质装进 1635 个参数：神经材质的浏览器最小实现

## 导语（可贴到编辑器开头，或作回答摘要）

SIGGRAPH 2026 的神经着色课程，靠 Slang 自动微分、Cooperative Vector 和 MDL 陶瓷材质讲「潜变量纹理 + 小 MLP ≈ BRDF」。这三样浏览器一个都没有。这篇把命题单独搬过来，用标量 WGSL、GGX teacher、固定编码器和离线 bake，在 WebGPU 里重做了一遍——还顺手用梯度检查抓出一个「均值 loss 配和梯度」的真 bug。

## 上传顺序（先在编辑器里按序插图，再贴正文）

1. `images/fig1-proposition.png` — 命题是什么
2. `images/fig2-wrong-right.png` — 错路 / 正路
3. `images/fig3-thread.png` — 脉络五步
4. `images/fig4-tree.png` — 树全貌
5. `images/fig5-rusinkiewicz.png` — Rusinkiewicz
6. `images/fig6-decoder.png` — 解码器数据流
7. `images/fig7-takeaways.png` — 收获总图

## 粘贴清单

- [ ] 无 ` ```mermaid ` 围栏
- [ ] 无 `.svg` 引用
- [ ] 图片均为 PNG（7 张，1240×700）
- [ ] 标题层级 ≤ `####`
- [ ] `[作者补一句：…]` 占位已替换为真实开场

## 注意

- `article.md` 里图片是相对路径 `images/*.png`；知乎不会拉取本地路径，需逐张手动上传。
- 正文约 3200 字（3202 汉字），在专栏可读区间内。
