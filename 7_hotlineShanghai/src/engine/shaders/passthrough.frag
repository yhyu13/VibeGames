#version 300 es
precision highp float;

// 调试视图：把任意 FBO 纹理直出到屏幕（uBoost 增强显示）。

out vec4 fragColor;

uniform sampler2D uTex;
uniform float uBoost;

void main() {
  vec2 uv = gl_FragCoord.xy / vec2(textureSize(uTex, 0));
  fragColor = vec4(texture(uTex, uv).rgb * uBoost, 1.0);
}
