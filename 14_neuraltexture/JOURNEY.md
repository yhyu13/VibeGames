# JOURNEY — 14_neuraltexture

| ME | YOU |
|---|---|
| 丢来知乎长文「从 PBR 贴图到潜变量 + MLP」+「research and demo」「no question until perfection」 | 对照 SIGGRAPH 2026 课程仓库 / Zeltner 2024 / WebGPU 现状做了 primary-source 笔记（见 `从-PBR-贴图到潜变量-plus-MLP：拆解-SIGGRAPH-2026.md`）。砍掉 CoopVec、MDL、4K latent、页内 100k 训练。冻结 intro：三球 GGX vs `8+6→32→32→3`，端口 5190。 |
| impl game | 落地 C.A.T：`src/core/`（ggx/material/rusinkiewicz/mlp/train，纯数学）+ `src/engine/`（NeuralMaterial.ts wgslFn 标量 MLP、SceneManager、devtools）。门禁全绿：typecheck 0 错、vitest 11/11、build 成功、bake val log-L1=0.045921 @ 8000 步。WebGPU 渲染经 kilo-playwright MCP 截图验证。 |
| self critic improve test, dump learning to journey | 自检 `mlp.test.ts`：11 条测试缺四块——反传梯度无数值校验、端到端训练未证「胜过 Xavier 随机初值」、rusinkiewicz 无黄金向量与镜像对称、bake 无确定性 + 材质区边界未扫掠。补 7 条（现 18 条）。**梯度校验抓出真 bug**：`backwardLogL1` 返回均值 loss 却累加「和」梯度（漏 `1/DECODER_OUT`），等效学习率 ×3；已修（`mlp.ts`）。教训：梯度检查比「loss 下降」可信得多——scale 因子错 3 倍，loss 照样降。 |
| write zhihu doc | 按 tech-design-to-zhihu skill 把设计稿改写成知乎专栏，交付 `zhihu-article/`（article.md + 7 张 1240×700 PNG + PUBLISH.md）。主线＝命题（潜变量纹理 + 共享 MLP ≈ BRDF，浏览器标量实现）；树根→四分支（teacher/encoder+latent/rusinkiewicz/decoder+bake）；收获 7 条 + 讨论口（误差球该不该 ×8）。 |
