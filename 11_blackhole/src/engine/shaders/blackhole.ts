/**
 * Schwarzschild black hole renderer — per-pixel null-geodesic ray marching.
 *
 * Physics (geometrized G=c=1, r_s = 1):
 *   - Null geodesic in Cartesian Binet form:  x'' = -(3/2) h² x / r⁵,
 *     with conserved h² = |x×v|² (impact parameter squared).
 *   - Capture: r < r_s (=1). Photon-sphere windings that outlast the step
 *     budget (still r < 2) are bucketed as captured (this is the photon ring).
 *   - Accretion disk: thin annulus in the XZ plane, inner edge = ISCO (3 r_s).
 *     Emission ∝ r^-3, temperature ∝ r^-3/4, Doppler+gravitational shift
 *     g = √(1−1.5/r)/(γ(1−βcosθ)), beaming I_ν ∝ g³.
 */

export const blackholeVertex = /* glsl */ `
varying vec2 vNdc;
void main() {
  vNdc = position.xy;
  gl_Position = vec4(position.xy, 0.0, 1.0);
}
`

export const blackholeFragment = /* glsl */ `
precision highp float;

varying vec2 vNdc;

uniform vec3  uCamPos;
uniform vec3  uCamRight;
uniform vec3  uCamUp;
uniform vec3  uCamFwd;
uniform float uTanFov;
uniform float uAspect;

uniform float uDiskTempK;
uniform float uDiskBrightness;
uniform float uDiskOuter;
uniform float uStarDensity;
uniform float uSteps;
uniform float uTime;
uniform float uShowDisk; // 0/1
uniform float uLensing;  // 0/1

#define HORIZON_R2  1.0
#define ISCO_R      3.0
#define B_CRIT      2.5980762
#define ESCAPE_R2   3600.0
#define FAR_B       8.0
#define PHOTON_R2   4.0

// ---------------------------------------------------------------------------
// Hash / noise
// ---------------------------------------------------------------------------

float hash21(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}
float hash13(vec3 p) {
  p = fract(p * 0.1031);
  p += dot(p, p.zyx + 31.32);
  return fract((p.x + p.y) * p.z);
}
float vnoise(vec3 p) {
  vec3 i = floor(p);
  vec3 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  float n000 = hash13(i);
  float n100 = hash13(i + vec3(1,0,0));
  float n010 = hash13(i + vec3(0,1,0));
  float n110 = hash13(i + vec3(1,1,0));
  float n001 = hash13(i + vec3(0,0,1));
  float n101 = hash13(i + vec3(1,0,1));
  float n011 = hash13(i + vec3(0,1,1));
  float n111 = hash13(i + vec3(1,1,1));
  return mix(
    mix(mix(n000,n100,f.x), mix(n010,n110,f.x), f.y),
    mix(mix(n001,n101,f.x), mix(n011,n111,f.x), f.y),
    f.z);
}

// ---------------------------------------------------------------------------
// Blackbody
// ---------------------------------------------------------------------------

float temp01(float kelvin) {
  float lo = 1500.0, hi = 40000.0;
  float t = clamp(kelvin, lo, hi);
  return clamp((log(t) - log(lo)) / (log(hi) - log(lo)), 0.0, 1.0);
}
vec3 blackbody(float kelvin) {
  float t = temp01(kelvin);
  float r = t < 0.66 ? 1.0 : 1.0 - (t - 0.66) / 0.34;
  float g = t < 0.25 ? 0.2 + (0.8 * t) / 0.25 : 1.0;
  float b = t < 0.25 ? 0.0 : (t - 0.25) / 0.75;
  return clamp(vec3(r, g, b), 0.0, 1.0);
}

// ---------------------------------------------------------------------------
// Sky (procedural starfield + nebula), sampled by escaped rays — lensing is free
// ---------------------------------------------------------------------------

vec3 starfield(vec3 d) {
  vec3 dir = normalize(d);
  vec2 sph = vec2(atan(dir.z, dir.x), asin(clamp(dir.y, -1.0, 1.0)));

  // nebula (2 octaves, dim — stays below bloom threshold)
  float n = vnoise(dir * 2.5) * 0.65 + vnoise(dir * 6.0) * 0.35;
  vec3 neb = mix(vec3(0.02, 0.03, 0.06), vec3(0.10, 0.05, 0.15), smoothstep(0.35, 0.85, n));
  vec3 col = neb * 0.22;

  // stars (bright enough that lensed arcs show against the disk)
  vec2 g = sph * 40.0;
  vec2 id = floor(g);
  float h = hash21(id);
  if (h > 0.84) {
    vec2 f = fract(g) - 0.5;
    vec2 off = (vec2(hash21(id + 17.3), hash21(id + 31.7)) - 0.5) * 0.7;
    float spark = smoothstep(0.12, 0.0, length(f - off));
    float tw = 0.7 + 0.3 * sin(uTime * (0.5 + 2.0 * hash21(id + 5.1)) + 40.0 * h);
    vec3 tint = mix(vec3(1.0, 0.82, 0.60), vec3(0.75, 0.85, 1.0), hash21(id + 2.9));
    col += tint * spark * tw * 0.32 * uStarDensity;
  }
  return col;
}

// ---------------------------------------------------------------------------
// Geodesic + disk
// ---------------------------------------------------------------------------

vec3 accel(vec3 x, float h2) {
  float r2 = dot(x, x);
  float r = sqrt(r2);
  return -1.5 * h2 * x / (r2 * r2 * r);
}

float diskEmissivity(float r) { return pow(ISCO_R / r, 3.0); }
float diskTempProfile(float r) { return pow(ISCO_R / r, 0.75); }

// Emission of the disk at radius rc, for a photon leaving toward nhat.
vec3 sampleDisk(float rc, vec3 xc, vec3 nhat) {
  float beta  = 1.0 / sqrt(max(2.0 * (rc - 1.0), 0.2));
  float gamma = 1.0 / sqrt(1.0 - beta * beta);
  float grav  = sqrt(max(1.0 - 1.5 / rc, 0.0));
  vec3 gasdir = normalize(vec3(xc.z, 0.0, -xc.x));
  float g = grav / max(gamma * (1.0 - beta * dot(gasdir, nhat)), 0.05);
  g = clamp(g, 0.05, 3.0);

  float T = uDiskTempK * diskTempProfile(rc) * g;
  vec3 col = blackbody(T);
  float emit = uDiskBrightness * diskEmissivity(rc) * pow(g, 3.0);
  return col * emit;
}

// Straight-line trace (no lensing, or far-field weak deflection).
vec3 straightTrace(vec3 ro, vec3 rd) {
  vec3 col = starfield(rd);
  if (uShowDisk > 0.5 && abs(rd.y) > 1e-5) {
    float t = -ro.y / rd.y;
    if (t > 0.0) {
      vec3 xc = ro + rd * t;
      float rc = length(xc);
      if (rc > ISCO_R && rc < uDiskOuter) {
        col += sampleDisk(rc, xc, rd);
      }
    }
  }
  return col;
}

void main() {
  vec2 ndc = vNdc;
  vec3 ro = uCamPos;
  vec3 rd = normalize(
    uCamFwd + uCamRight * (ndc.x * uTanFov * uAspect) + uCamUp * (ndc.y * uTanFov));

  vec3 col;

  if (uLensing < 0.5) {
    col = straightTrace(ro, rd);
  } else {
    float b = length(cross(ro, rd));
    if (b > FAR_B) {
      col = straightTrace(ro, rd);
    } else {
      vec3 x = ro;
      vec3 vel = rd;
      float h2 = b * b;
      vec3 emitc = vec3(0.0);
      float trans = 1.0;
      bool captured = false;
      bool escaped = false;

      int n = int(uSteps);
      for (int i = 0; i < 512; i++) {
        if (i >= n) break;
        float r2 = dot(x, x);
        if (r2 < HORIZON_R2) { captured = true; break; }
        if (r2 > ESCAPE_R2) { escaped = true; break; }

        float r = sqrt(r2);
        float dt = clamp(0.16 * r, 0.03, 1.5);

        vec3 a = accel(x, h2);
        vel += a * (0.5 * dt);
        vec3 xNew = x + vel * dt;

        if (uShowDisk > 0.5 && x.y * xNew.y < 0.0) {
          float t = x.y / (x.y - xNew.y);
          vec3 xc = x + (xNew - x) * t;
          float rc = length(xc);
          if (rc > ISCO_R && rc < uDiskOuter) {
            vec3 nhat = normalize(vel);
            emitc += trans * sampleDisk(rc, xc, nhat);
            trans *= 0.5;
          }
        }

        a = accel(xNew, h2);
        vel += a * (0.5 * dt);
        x = xNew;
      }

      if (!captured && !escaped && dot(x, x) < PHOTON_R2) captured = true;

      vec3 bg = captured ? vec3(0.0) : starfield(normalize(vel));
      col = bg * trans + emitc;
    }
  }

  gl_FragColor = vec4(col, 1.0);
}
`
