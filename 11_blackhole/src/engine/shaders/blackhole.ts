/**
 * Kerr (rotating) black hole renderer — per-pixel null-geodesic ray marching.
 *
 * Physics (geometrized G=c=1, r_s = 2M = 1, so M = 1/2):
 *   - Boyer–Lindquist coordinates with spin axis = +z, accretion disk in the
 *     z = 0 (θ = π/2) plane.
 *   - Carter-separated null geodesics, integrated in affine time with RK4 in
 *     u = cosθ (pole-regular). Conserved impact parameters (λ, η) are fixed at
 *     the seed via the ZAMO tetrad.
 *   - Δ(r) = (r−r₊)(r−r₋) factored to avoid float32 cancellation near r₊.
 *   - Capture at r = r₊; near-critical photon-shell windings bucketed as captured.
 *   - Disk: prograde Keplerian, Shakura–Sunyaev emissivity/temperature, Doppler
 *     + gravitational redshift g = 1/[u^t(1 − Ωλ)], beaming I_ν ∝ g³.
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

uniform float uSpin;      // dimensionless â = a/M
uniform float uDiskTempK;
uniform float uDiskBrightness;
uniform float uDiskOuter;
uniform float uStarDensity;
uniform float uSteps;
uniform float uTime;
uniform float uShowDisk; // 0/1
uniform float uLensing;  // 0/1

#define M_BHU       0.5
#define ESCAPE_R    60.0
#define FAR_B       8.0
// Schwarzschild ISCO = 6M = 3 bhu. Spin-independent emissivity/temperature
// reference: the disk's radial profile is measured from THIS fixed radius, not
// the (spin-dependent) ISCO, so total luminosity scales as L ∝ 1/isco.
#define R_REF       (6.0 * M_BHU)

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

// Tanner–Helland blackbody fit: kelvin -> sRGB (0..1) over 1000..40000 K.
// 1000 K deep red → 5500 K warm white → 10000 K blue-white (no cyan artifact).
vec3 blackbody(float kelvin) {
  float t = clamp(kelvin, 1000.0, 40000.0) / 100.0;
  float r = t <= 66.0 ? 255.0 : 329.698727446 * pow(t - 60.0, -0.1332047592);
  float g = t <= 66.0
    ? 99.4708025861 * log(t) - 161.1195681661
    : 288.1221695283 * pow(t - 60.0, -0.0755148492);
  float b = t >= 66.0 ? 255.0
    : (t <= 19.0 ? 0.0 : 138.5177312231 * log(t - 10.0) - 305.0447927307);
  return clamp(vec3(r, g, b) / 255.0, 0.0, 1.0);
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

  // stars (dim enough to stay pinpoints below the disk, bright enough that lensed
  // arcs still show against the disk body)
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
// Kerr geodesic machinery (Boyer–Lindquist, u = cosθ)
// ---------------------------------------------------------------------------

float kerrR(float r, float a, float lam, float eta, float rp, float rm) {
  float P = r * r + a * a - a * lam;
  float Delta = (r - rp) * (r - rm);
  return P * P - Delta * (eta + (lam - a) * (lam - a));
}
float kerrThetaU(float u, float a, float lam, float eta) {
  float u2 = u * u;
  return eta + (a * a - eta - lam * lam) * u2 - a * a * u2 * u2;
}

// dr/dλ, du/dλ, dφ/dλ (affine time). φ is not needed by the RHS (axisymmetric).
void kerrRhs(float r, float u, float sr, float su, float a, float lam, float eta,
             float rp, float rm, out float dr, out float du, out float dphi) {
  float u2 = u * u;
  float sin2 = max(1.0 - u2, 1e-6);
  float r2 = r * r;
  float Delta = (r - rp) * (r - rm);
  float Sigma = r2 + a * a * u2;
  float P = r2 + a * a - a * lam;
  float R = P * P - Delta * (eta + (lam - a) * (lam - a));
  float ThetaU = eta + (a * a - eta - lam * lam) * u2 - a * a * u2 * u2;
  dr = sr * sqrt(max(R, 0.0)) / Sigma;
  du = su * sqrt(max(ThetaU, 0.0)) / Sigma;
  dphi = (a * P / Delta - a + lam / sin2) / Sigma;
}

void kerrStep(float r, float u, float phi, float dt, float a,
              float lam, float eta, float rp, float rm, float sr, float su,
              out float nr, out float nu, out float np) {
  float k1r, k1u, k1p, k2r, k2u, k2p, k3r, k3u, k3p, k4r, k4u, k4p;
  kerrRhs(r, u, sr, su, a, lam, eta, rp, rm, k1r, k1u, k1p);
  kerrRhs(r + 0.5 * dt * k1r, u + 0.5 * dt * k1u, sr, su, a, lam, eta, rp, rm, k2r, k2u, k2p);
  kerrRhs(r + 0.5 * dt * k2r, u + 0.5 * dt * k2u, sr, su, a, lam, eta, rp, rm, k3r, k3u, k3p);
  kerrRhs(r + dt * k3r, u + dt * k3u, sr, su, a, lam, eta, rp, rm, k4r, k4u, k4p);
  nr = r + (dt / 6.0) * (k1r + 2.0 * k2r + 2.0 * k3r + k4r);
  nu = u + (dt / 6.0) * (k1u + 2.0 * k2u + 2.0 * k3u + k4u);
  np = phi + (dt / 6.0) * (k1p + 2.0 * k2p + 2.0 * k3p + k4p);
}

// Reflect at a radial turning point; returns the allowed-side endpoint (R ≥ 0).
float reflectR(float rPrev, float rNext, float a, float lam, float eta, float rp, float rm) {
  float lo = min(rPrev, rNext);
  float hi = max(rPrev, rNext);
  if (kerrR(lo, a, lam, eta, rp, rm) < 0.0) { float tmp = lo; lo = hi; hi = tmp; }
  for (int i = 0; i < 8; i++) {
    float mid = 0.5 * (lo + hi);
    if (kerrR(mid, a, lam, eta, rp, rm) < 0.0) hi = mid; else lo = mid;
  }
  return lo;
}
float reflectU(float uPrev, float uNext, float a, float lam, float eta) {
  float lo = min(uPrev, uNext);
  float hi = max(uPrev, uNext);
  if (kerrThetaU(lo, a, lam, eta) < 0.0) { float tmp = lo; lo = hi; hi = tmp; }
  for (int i = 0; i < 8; i++) {
    float mid = 0.5 * (lo + hi);
    if (kerrThetaU(mid, a, lam, eta) < 0.0) hi = mid; else lo = mid;
  }
  return lo;
}

// Seed: camera ray → conserved (λ, η) + integration state, via the ZAMO tetrad.
struct Seed {
  float r, u, phi, sr, su, lam, eta, rp, rm;
};
Seed makeSeed(vec3 ro, vec3 rd, float a) {
  float r = length(ro);
  vec3 er = ro / r;
  vec3 ephi = normalize(cross(vec3(0.0, 0.0, 1.0), er));
  vec3 etheta = cross(ephi, er);
  float nR = dot(rd, er);
  float nTheta = dot(rd, etheta);
  float nPhi = dot(rd, ephi);

  float u = ro.z / r;
  float st2 = max(1.0 - u * u, 1e-12);
  float st = sqrt(st2);
  float r2 = r * r;
  float a2 = a * a;
  float Sigma = r2 + a2 * u * u;
  float rp = M_BHU + sqrt(max(M_BHU * M_BHU - a2, 0.0));
  float rm = M_BHU - sqrt(max(M_BHU * M_BHU - a2, 0.0));
  float Delta = (r - rp) * (r - rm);
  float A = (r2 + a2) * (r2 + a2) - a2 * Delta * st2;

  float kt = sqrt(A / (Sigma * Delta));
  float kphi = (2.0 * a * M_BHU * r) / sqrt(Sigma * Delta * A) + (nPhi * sqrt(Sigma / A)) / st;
  float gtt = -(1.0 - 2.0 * M_BHU * r / Sigma);
  float gtphi = (-2.0 * a * M_BHU * r * st2) / Sigma;
  float gphiphi = (r2 + a2 + 2.0 * a2 * M_BHU * r * st2 / Sigma) * st2;

  float pt = gtt * kt + gtphi * kphi;
  float pphi = gtphi * kt + gphiphi * kphi;
  float ptheta = nTheta * sqrt(Sigma);

  float E = -pt;
  float Lz = pphi;
  float Q = ptheta * ptheta - a2 * E * E * u * u + Lz * Lz * u * u / st2;

  Seed sd;
  sd.r = r;
  sd.u = u;
  sd.phi = atan(ro.y, ro.x);
  sd.sr = nR < 0.0 ? -1.0 : 1.0;
  sd.su = nTheta > 0.0 ? -1.0 : 1.0;
  sd.lam = Lz / E;
  sd.eta = Q / (E * E);
  sd.rp = rp;
  sd.rm = rm;
  return sd;
}

// Escape direction (BL momentum → asymptotic Cartesian) for the starfield.
vec3 escapeDir(float r, float u, float phi, float sr, float su, float a,
               float lam, float eta, float rp, float rm) {
  float u2 = u * u;
  float st = sqrt(max(1.0 - u2, 1e-12));
  float r2 = r * r;
  float Delta = (r - rp) * (r - rm);
  float Sigma = r2 + a * a * u2;
  float P = r2 + a * a - a * lam;
  float R = P * P - Delta * (eta + (lam - a) * (lam - a));
  float ThetaU = eta + (a * a - eta - lam * lam) * u2 - a * a * u2 * u2;
  float pR = sr * sqrt(max(R, 0.0)) / Sigma;
  float pTheta = -su * sqrt(max(ThetaU, 0.0)) / (Sigma * st);
  float pPhi = (a * P / Delta - a + lam / max(1.0 - u2, 1e-6)) / Sigma;
  float nr = pR;
  float nTheta = r * pTheta;
  float nPhi = r * st * pPhi;
  float cp = cos(phi);
  float sp = sin(phi);
  vec3 er = vec3(st * cp, st * sp, u);
  vec3 etheta = vec3(u * cp, u * sp, -st);
  vec3 ephi = vec3(-sp, cp, 0.0);
  return normalize(er * nr + etheta * nTheta + ephi * nPhi);
}

// ---------------------------------------------------------------------------
// Prograde Keplerian disk (Bardeen–Press–Teukolsky ISCO + redshift)
// ---------------------------------------------------------------------------

float kerrIscoPro(float s) {
  float c1 = pow(max(1.0 - s * s, 0.0), 1.0 / 3.0);
  float Z1 = 1.0 + c1 * (pow(1.0 + s, 1.0 / 3.0) + pow(1.0 - s, 1.0 / 3.0));
  float Z2 = sqrt(3.0 * s * s + Z1 * Z1);
  float root = sqrt(max((3.0 - Z1) * (3.0 + Z1 + 2.0 * Z2), 0.0));
  return (3.0 + Z2 - root) * M_BHU;
}

vec3 sampleDiskKerr(float rc, float lam, float a) {
  float sqM = sqrt(M_BHU);
  float rc15 = pow(rc, 1.5);
  float Omega = sqM / (rc15 + a * sqM);
  float ut = (rc15 + a * sqM) / (pow(rc, 0.75) * sqrt(max(rc15 - 3.0 * M_BHU * sqrt(rc) + 2.0 * a * sqM, 1e-9)));
  float g = 1.0 / max(ut * (1.0 - Omega * lam), 0.05);
  g = clamp(g, 0.05, 3.0);

  // Emissivity ∝ r⁻³ and temperature ∝ r⁻³ᐟ⁴ measured from the FIXED reference
  // radius R_REF (Schwarzschild ISCO), NOT the spin-dependent ISCO. Using
  // Using isco/rc would make total luminosity ∝ isco² and render low-spin disks
  // ~24× brighter (inverted). With R_REF fixed, L ∝ 1/isco — higher spin is
  // brighter — and the inner-rim temperature T_in = uDiskTempK·(R_REF/isco)^0.75
  // rises with spin (the physically-correct blazing rim).
  // No zero-torque (1−√(r_in/r)) factor: the inner edge is hottest AND brightest,
  // feeding the photon ring (Gargantua's blazing inner rim, not a black hole).
  float x = R_REF / rc;
  float em = x * x * x;
  float Tp = pow(x, 0.75);
  float T = uDiskTempK * Tp * g; // Doppler-shifted temperature T_obs = g·T
  vec3 col = blackbody(T);
  return col * (uDiskBrightness * em * pow(g, 3.0));
}

// Straight-line trace (no lensing, or far-field weak deflection); disk at z = 0.
vec3 straightTraceKerr(vec3 ro, vec3 rd, float lam, float a, float isco) {
  vec3 col = starfield(rd);
  if (uShowDisk > 0.5 && abs(rd.z) > 1e-5) {
    float t = -ro.z / rd.z;
    if (t > 0.0) {
      vec3 xc = ro + rd * t;
      float rc = length(xc);
      if (rc > isco && rc < uDiskOuter) {
        col += sampleDiskKerr(rc, lam, a);
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

  float a = uSpin * M_BHU;
  float isco = kerrIscoPro(uSpin);
  Seed sd = makeSeed(ro, rd, a);
  float b = length(cross(ro, rd));

  vec3 col;

  if (uLensing < 0.5 || b > FAR_B) {
    col = straightTraceKerr(ro, rd, sd.lam, a, isco);
  } else {
    float r = sd.r, u = sd.u, phi = sd.phi;
    float sr = sd.sr, su = sd.su;
    float lam = sd.lam, eta = sd.eta, rp = sd.rp, rm = sd.rm;
    vec3 emitc = vec3(0.0);
    float trans = 1.0;
    bool captured = false;
    bool escaped = false;
    int winds = 0;

    int n = int(uSteps);
    for (int i = 0; i < 512; i++) {
      if (i >= n) break;
      if (r < rp + 0.001) { captured = true; break; }
      if (r > ESCAPE_R) { escaped = true; break; }

      float dt = clamp(0.16 * r, 0.03, 1.5);
      float prevU = u;
      float prevR = r;
      float nr, nu, np;
      kerrStep(r, u, phi, dt, a, lam, eta, rp, rm, sr, su, nr, nu, np);

      if (kerrR(nr, a, lam, eta, rp, rm) < 0.0) {
        nr = reflectR(r, nr, a, lam, eta, rp, rm);
        sr = -sr;
        winds++;
      }
      if (kerrThetaU(nu, a, lam, eta) < 0.0) {
        nu = reflectU(u, nu, a, lam, eta);
        su = -su;
      }
      if (uShowDisk > 0.5 && prevU * nu < 0.0) {
        float tt = prevU / (prevU - nu);
        float rc = prevR + (nr - prevR) * tt;
        if (rc > isco && rc < uDiskOuter) {
          emitc += trans * sampleDiskKerr(rc, lam, a);
          trans *= 0.1; // ~90% opaque disk: strong lensed far-side wrap
        }
      }

      r = nr; u = nu; phi = np;
      if (winds > 32) { captured = true; break; }
    }

    if (!captured && !escaped && r < rp + 1.0) captured = true;
    vec3 bg = captured ? vec3(0.0) : starfield(escapeDir(r, u, phi, sr, su, a, lam, eta, rp, rm));
    col = bg * trans + emitc;
  }

  gl_FragColor = vec4(col, 1.0);
}
`
