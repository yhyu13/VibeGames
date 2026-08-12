#version 300 es
precision highp float;

// 阶段 [6] final：base * mix(0.50, 1.0, illumination) + radiance*uLightScale（深暗部 + 光池全色）
// + 4x4 Bayer dither 回压光贡献项（仅影响 light contribution，不清洗 base）。

out vec4 fragColor;

uniform sampler2D uSceneMap;    // base 场景色
uniform sampler2D uRadianceMap; // cascade 输出
uniform sampler2D uEmissionMap; // direct scene-light seeds; final bloom keeps source lights visibly bright
uniform vec2   uRadianceAtlasSize; // cascade atlas size
uniform vec2   uRadianceScreenSize; // RC working screen size (may be half resolution)
uniform vec4   uRoomRect;          // 房间矩形(归一化)；房间外虚空压制光贡献
uniform int   uDitherEnabled;
uniform float uLightScale;
uniform float uTime;
uniform vec3  uDebugTint;          // 调试染色:(0,0,0)=关;非 0 = RC radiance 层纯色覆盖压暗 base

// 4x4 Bayer（列主序：BAYER4x4[col][row]）
const mat4 BAYER4x4 = mat4(
  vec4( 0.0, 12.0,  3.0, 15.0),
  vec4( 8.0,  4.0, 11.0,  7.0),
  vec4( 2.0, 14.0,  1.0, 13.0),
  vec4(10.0,  6.0,  9.0,  5.0)
);

void main() {
  vec2 uv = (gl_FragCoord.xy - 0.5) / vec2(textureSize(uSceneMap, 0));
  vec3 base = texelFetch(uSceneMap, ivec2(gl_FragCoord.xy - 0.5), 0).rgb;
  vec3 radiance;
  if (uRadianceAtlasSize.x > 0.0 && uRadianceAtlasSize.y > 0.0) {
    // Atlas: screen content bottom-aligned; c0 block = 4x4 atlas texels (16 rays/probe).
    // 每个 probe 的 4×4 方向 texel 块,其角点(texel 坐标 block*4+2.0)经 LINEAR
    // 恰好等于全部 16 个方向的平均 → 单 probe 值 = texture(uv=(block*4+2.5)/atlasSize)。
    // 双线性插值 4 个相邻 probe(替代"取最近块角点")→ 光池边缘平滑渐变。
    vec2 sceneSize = vec2(textureSize(uSceneMap, 0));
    vec2 rcCoord = (gl_FragCoord.xy - vec2(0.5)) * (uRadianceScreenSize / sceneSize);
    vec2 texel = clamp(rcCoord, vec2(0.0), uRadianceScreenSize - vec2(1.0));
    // probe 网格坐标:probe 中心在整数格点(texel/4 - 0.5)
    vec2 p = texel * 0.25 - vec2(0.5);
    vec2 p00 = floor(p);
    vec2 f = clamp(p - p00, 0.0, 1.0);
    vec2 s = uRadianceAtlasSize;
    vec2 uv00 = clamp((p00 * 4.0 + 2.5) / s, 0.0, 1.0);
    vec2 uv10 = clamp(((p00 + vec2(1.0, 0.0)) * 4.0 + 2.5) / s, 0.0, 1.0);
    vec2 uv01 = clamp(((p00 + vec2(0.0, 1.0)) * 4.0 + 2.5) / s, 0.0, 1.0);
    vec2 uv11 = clamp(((p00 + vec2(1.0, 1.0)) * 4.0 + 2.5) / s, 0.0, 1.0);
    vec3 r00 = texture(uRadianceMap, uv00).rgb;
    vec3 r10 = texture(uRadianceMap, uv10).rgb;
    vec3 r01 = texture(uRadianceMap, uv01).rgb;
    vec3 r11 = texture(uRadianceMap, uv11).rgb;
    radiance = mix(mix(r00, r10, f.x), mix(r01, r11, f.x), f.y);
  } else {
    radiance = texture(uRadianceMap, uv).rgb;
  }

  float illumination = clamp(dot(radiance, vec3(0.299, 0.587, 0.114)) * uLightScale, 0.0, 1.0);
  vec3 lit = base * mix(0.50, 1.0, illumination) + radiance * uLightScale;

  // Keep direct-source reinforcement compact. The former 14 px sparse grid stamped
  // nine displaced copies of every emitter into dark pixels, which read as ghost
  // squares/rings after half-resolution RC upscaling.
  vec3 source = texture(uEmissionMap, uv).rgb;
  float emissionLuma = dot(source, vec3(0.299, 0.587, 0.114));
  float bloomWeight = (0.145 - 0.105 * smoothstep(0.12, 0.50, emissionLuma))
    * smoothstep(0.22, 0.55, emissionLuma);
  lit += source * (uLightScale * bloomWeight);

  if (uDitherEnabled == 1) {
    ivec2 cell = ivec2(mod(gl_FragCoord.xy, 4.0));
    float threshold = BAYER4x4[cell.x][cell.y] / 16.0;
    float luma = dot(radiance, vec3(0.299, 0.587, 0.114));
    vec3 quantizedLight = step(vec3(threshold), vec3(luma)) * radiance;
    vec3 light = mix(radiance, quantizedLight, 0.5) * uLightScale;
    float ditheredIllumination = clamp(dot(light, vec3(0.299, 0.587, 0.114)), 0.0, 1.0);
    lit = base * mix(0.50, 1.0, ditheredIllumination) + light + source * (uLightScale * bloomWeight);
  }

  // 房间外虚空：压制 radiance/emission 贡献，只留压暗的 base（≈近黑夜空）。
  // RC ambient 在虚空处也会被累加，不加这个矩形压制会在画面四周读出灰带。
  if (uv.x < uRoomRect.x || uv.x > uRoomRect.z || uv.y < uRoomRect.y || uv.y > uRoomRect.w) {
    lit = base * 0.5;
  }

  // 调试染色：把 RC 光层以纯色显示在压暗的 base 上，光斑位置/偏移可直接肉眼和
  // 像素级测量（__rcSetConfig({ debugTint: [r,g,b] })；RC 关闭时不染色）。
  if (uDebugTint != vec3(0.0)) {
    lit = uRadianceAtlasSize.x > 0.0 ? base * 0.12 + radiance * uDebugTint * 3.0 : base;
  }

  fragColor = vec4(lit, 1.0);
}
