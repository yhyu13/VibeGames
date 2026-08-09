# 15 — WebGL2 状态机 / RC + Three 状态污染

> **本文档 = WebGL2 + Three 状态污染 / RC 全屏 pass 写状态的完整规则**。
> 入门 6 条见 [`06-rendering-readability.md`](06-rendering-readability.md) §2.1-§2.6。
> 改本文件 = `[DESIGN-LAYER-CHANGE]`(Mavis 签核)。

## 1. WebGL2 全局状态清单

`WebGL2RenderingContext` 共有 ~80 个可写状态,本项目只用其中 ~15 个:

| 类别 | 状态 | 本项目值 | 改后必做 |
|------|------|---------|---------|
| **程序** | `CURRENT_PROGRAM` | Three / RC 各管 | save/restore |
| **顶点数组** | `VERTEX_ARRAY_BINDING` | Three = `null`,RC = `vaoFullscreenQuad` | save/restore |
| **帧缓冲** | `FRAMEBUFFER_BINDING` | 切换 framebuffer 时设 | 用完 `bindFramebuffer(FRAMEBUFFER, null)` |
| **绘制缓冲** | `DRAW_BUFFER0` | `COLOR_ATTACHMENT0`(默认) | 切到 MRT 时 `drawBuffers([..., ...])` |
| **混合** | `BLEND` | Three 开,RC 关 | disable |
| **深度测试** | `DEPTH_TEST` | Three 开,RC 关 | disable |
| **模板** | `STENCIL_TEST` | 全程关 | disable |
| **剪切** | `SCISSOR_TEST` | 全程关 | disable |
| **面剔除** | `CULL_FACE` | Three 开,RC 关(全屏 pass 不需要) | disable |
| **视口** | `VIEWPORT` | Three = canvas,RC = 1920×1080 | save/restore |
| **颜色掩码** | `COLOR_WRITEMASK` | 全 true(默认) | 不动 |
| **深度掩码** | `DEPTH_WRITEMASK` | Three true,RC false | disable depth test 时一并 false |
| **混合函数** | `BLEND_FUNC` | Three `SRC_ALPHA, ONE_MINUS_SRC_ALPHA` | RC 不混合 |
| **清屏色** | `CLEAR_COLOR` | Three `0x0a0910`,RC `0x000000` | 各自 clear |
| **像素存储** | `PACK_ALIGNMENT` | `4` | glReadPixels 前设 `1` |

## 2. Three ↔ 裸 GL 状态污染(D3 教训)

### 2.1 现象

Three.js 内部维护自己的 WebGL state manager。直接调裸 GL 后:

- Three 下次 draw 用错 program(显示 RC shader)
- vertex array 错乱(显示错位 / 缺图)
- blend 状态不对(全帧 50% 透明)

### 2.2 根因

Three 在每次 draw 前 set state,但**不**保存裸 GL 改的状态。

### 2.3 解决:save / restore

**进入 RC 全屏 pass 前**:
```ts
gl.saveStates = () => {
  const save = {
    program: gl.getParameter(gl.CURRENT_PROGRAM),
    vao: gl.getParameter(gl.VERTEX_ARRAY_BINDING),
    viewport: gl.getParameter(gl.VIEWPORT),
    blend: gl.isEnabled(gl.BLEND),
    depthTest: gl.isEnabled(gl.DEPTH_TEST),
    scissor: gl.isEnabled(gl.SCISSOR_TEST),
    cullFace: gl.isEnabled(gl.CULL_FACE),
    framebuffer: gl.getParameter(gl.FRAMEBUFFER_BINDING),
    drawBuffers: gl.getParameter(gl.DRAW_BUFFER0),
  };
  return save;
};
```

**RC pass 退出前**:
```ts
gl.restoreStates = (save) => {
  gl.useProgram(save.program);
  gl.bindVertexArray(save.vao);
  gl.viewport(...save.viewport);
  save.blend ? gl.enable(gl.BLEND) : gl.disable(gl.BLEND);
  save.depthTest ? gl.enable(gl.DEPTH_TEST) : gl.disable(gl.DEPTH_TEST);
  save.scissor ? gl.enable(gl.SCISSOR_TEST) : gl.disable(gl.SCISSOR_TEST);
  save.cullFace ? gl.enable(gl.CULL_FACE) : gl.disable(gl.CULL_FACE);
  gl.bindFramebuffer(gl.FRAMEBUFFER, save.framebuffer);
  // drawBuffers 恢复较复杂,通常是 None
};
```

### 2.4 必走的顺序

1. `save = gl.saveStates()`
2. `gl.useProgram(rcProgram)`
3. `gl.bindVertexArray(vaoFullscreenQuad)`
4. `gl.disable(BLEND | DEPTH_TEST | SCISSOR_TEST | CULL_FACE)`
5. `gl.bindFramebuffer(FRAMEBUFFER, fb)`
6. `gl.drawBuffers([COLOR_ATTACHMENT0])`
7. `gl.viewport(0, 0, w, h)`
8. `gl.drawArrays(TRIANGLES, 0, 3)`
9. `gl.restoreStates(save)`

**漏任何一步 = bug**。

## 3. RC 全屏 pass 写状态(D4 教训 / 白屏)

### 3.1 现象

`gl.checkFramebufferStatus` 返 `FRAMEBUFFER_COMPLETE`,但屏幕全黑 / 全白 / 只显示第一个 pass 输出。

### 3.2 根因

- 漏 `gl.drawBuffers([COLOR_ATTACHMENT0])` — 默认是 `NONE`,draw 完不写任何 attachment
- 漏 `gl.viewport(0, 0, w, h)` — 用 Three 的 viewport = canvas 尺寸,但 RC 写的是 framebuffer 1920×1080,坐标错位
- 漏 `gl.disable(BLEND | DEPTH_TEST | SCISSOR_TEST | CULL_FACE)` — 全屏三角形被 cull 掉

### 3.3 解决:全屏 pass 模板

参考 [`src/engine/RcPipeline.ts`](../../src/engine/RcPipeline.ts) 的 `runFullscreenPass` 方法。

```ts
function runFullscreenPass(program: WebGLProgram, fbo: WebGLFramebuffer | null) {
  const save = gl.saveStates();
  gl.useProgram(program);
  gl.bindVertexArray(vaoFullscreenQuad);
  gl.disable(gl.BLEND);
  gl.disable(gl.DEPTH_TEST);
  gl.disable(gl.SCISSOR_TEST);
  gl.disable(gl.CULL_FACE);
  gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
  gl.drawBuffers([gl.COLOR_ATTACHMENT0]);
  gl.viewport(0, 0, fbWidth, fbHeight);
  gl.drawArrays(gl.TRIANGLES, 0, 3);
  gl.restoreStates(save);
}
```

## 4. v3.1 lightField 缓存的状态机

### 4.1 写入端(`final.frag`)

```glsl
// 写 lightField cache framebuffer(attachment 1)
gl_FragData[0] = vec4(finalColor, 1.0);
gl_FragData[1] = vec4(cascadeBuffer.a, 0.0, 0.0, 1.0);  // v3.1 R32F
```

CPU 端绑定:
```ts
gl.framebufferTexture2D(FRAMEBUFFER, COLOR_ATTACHMENT1, TEXTURE_2D, lightFieldTex, 0);
gl.drawBuffers([COLOR_ATTACHMENT0, COLOR_ATTACHMENT1]);
```

**注意**:
- lightFieldTex 内部格式 = `R32F`(`gl.R32F`,`gl.RED`,`gl.FLOAT`)
- 不要 sRGB 转换(linear cache,06 §3.1.2)
- 写完 `gl.drawBuffers` 立刻恢复成 `[COLOR_ATTACHMENT0]`(避免下一个 pass 写错)

### 4.2 读取端(CPU)

```ts
const data = new Float32Array(240 * 135);
gl.readBuffer(COLOR_ATTACHMENT1);  // ⚠️ 必须先 readBuffer,默认是 0
gl.readPixels(0, 0, 240, 135, gl.RED, gl.FLOAT, data);
```

**注意**:
- `gl.readPixels` 前必 `gl.readBuffer(COLOR_ATTACHMENT1)`,否则读 0
- `gl.PACK_ALIGNMENT = 1`(lightField 240 不是 4 倍数,默认 4 会 padding)
- 数据是 Y-flip(OpenGL 原点在左下,JS 数组左上),GameEngine 自己 flip
- 0.2ms / 帧(实测),8×8 downsample

### 4.3 disabled 模式

`activeCascades === 0` 时:
- `lightField.setMode('disabled')` → `downsample` 全部填 0
- `glReadPixels` 仍可调(0.2ms 固定开销)
- 或:直接 skip `glReadPixels`,downsample 缓存返 0(更省)

## 5. Three 资源 vs 裸 GL 资源

| 资源 | Three | 裸 GL |
|------|-------|-------|
| 程序 | `WebGLProgram`(Three 包装)| `gl.createProgram()` |
| VBO | `BufferGeometry.attributes` | `gl.createBuffer()` |
| 纹理 | `THREE.Texture` / `DataTexture` | `gl.createTexture()` |
| FBO | `WebGLRenderTarget` | `gl.createFramebuffer()` |
| VAO | Three 自动(WebGL2) | `gl.createVertexArray()` |

**混用规则**:
- ✅ Three 资源传给裸 GL:可(`gl.bindTexture(gl.TEXTURE_2D, threeTexture.image?.__webglTexture)`)— 不优雅但可用
- ❌ 裸 GL 资源给 Three:不推荐(Three 不认识,需要 wrapper)
- ✅ RC framebuffer / 纹理完全独立于 Three
- ✅ SceneManager 的 sceneTexture 是裸 GL 创建,Three 通过 `WebGLRenderTarget` 包装

## 6. 调试技巧

### 6.1 抓状态污染

```js
// 浏览器 console
__rcPipeline.state().lastFrameTime  // 帧时间(> 16ms = 状态污染或 RC bug)
__rcPipeline.state().activeCascades  // 0 = 降级,1-3 = 正常
```

### 6.2 抓白屏

```js
// browser devtools → rendering → WebGL Inspector
// 看 framebuffer 状态,或:
// 跑 visual-check.mjs + 看 console error
```

### 6.3 抓 shader 编译错误

```js
// browser console
const gl = canvas.getContext('webgl2');
// compile / link 错误在编译时 throw,会出现在 console
```

### 6.4 抓 R32F 不支持

```js
// 浏览器 console
const ext = gl.getExtension('EXT_color_buffer_float');
console.log(ext);  // null = 不支持(无 R32F 渲染)
```

## 7. 与本主题相关的 BUGS

| BUGS | 教训 |
|------|------|
| B22 | GameEngine.sendInput 解引用 sim.input — 输入管线静默丢失 |
| B24 | shader 编译失败(int / float 混淆)— GLSL 300 es 迁移 |
| B28 | 假加法光晕(addLampGlow)走 prepscene → 假光自激放大 |
| **v3.1 新坑(06 §3.1.1)** | cascade=0 时 lightField 必硬底禁用 |
| **v3.1 新坑(06 §3.1.2)** | lightField linear cache ≠ sRGB 转换 |

## 8. 状态

| 项 | 状态 |
|----|------|
| 15 WebGL 状态机 | ✅ 2026-08-09 新建 |
| 全局状态清单 | ✅ 本文档 §1 |
| Three ↔ GL 状态污染解 | ✅ 本文档 §2 |
| 全屏 pass 模板 | ✅ 本文档 §3.3 |
| v3.1 lightField 状态机 | ✅ 本文档 §4 |
| 调试技巧 | ✅ 本文档 §6 |
| Three 资源 + 裸 GL 资源混用规则 | ✅ 本文档 §5 |
| pre-commit 查"save/restore 配对" | 🕐 |
