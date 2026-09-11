#!/usr/bin/env python3
"""Per-direction actor sheet generation (fixes the '8 rows != 8 facings' problem).

Instead of asking the model to lay out 8 directions in one sheet (it only
produces 2-3 facings then copies), generate ONE 1xN strip per direction:
  player: per dir -> idle, walk1, walk2, walk3, walk4, attack0, attack1, attack2  (8 cols)
  patrol: per dir -> idle, walk1, walk2, walk3, walk4, alert                          (6 cols)
Each strip is a single row of frames for ONE facing, which models can do reliably.
Then verify facing with the gemini vision model, alpha-clean, and assemble a full
8-row sheet via the existing pipeline (defining x/y bands per row).

Outputs to references/sprite-samples/_perdir/<dir>.png (1024x1024 strips).
Usage: python3 scripts/gen-perdir.py <agent> [dirs...]
"""
import json, urllib.request, urllib.error, yaml, base64, io, time, sys, os
from pathlib import Path
from PIL import Image

ROOT = Path(r"F:/XD/git-repo/VibeGames/7_hotlineShanghai")
SRC = ROOT / "references" / "sprite-samples"
CFG = "C:/Users/XINDONG/AppData/Local/hermes/config.yaml"
OUTDIR = SRC / "_perdir"
DIRS = ["N","NE","E","SE","S","SW","W","NW"]

STYLE = ("Production-ready pixel-art sprite for a top-down 2D action game set in 1937 Shanghai. "
"Hotline Miami energy filtered through restrained Republican-era Shanghai vaporwave. Clean isolated "
"runtime sprite. Crisp hard-edged pixel clusters, three-value material ramps, strong silhouette at actual "
"size, transparent background, no antialiasing, no blur, no bloom, no cast shadow, no environment, no "
"text, no UI, no watermark.")
NEGATIVE = ("concept art, illustration, painterly, photorealistic, 3D render, isometric, side view, front "
"portrait, smooth vector art, anti-aliased edges, blurry pixels, soft brush, gradient background, glow "
"halo, bloom, lens flare, cast shadow, floor plane, scenery, frame, border, labels, typography, UI, "
"watermark, multiple unrelated characters, cropped body, inconsistent scale, inconsistent anchor, extra "
"limbs, malformed hands, oversized head, chibi proportions")

PLAYER_MID = ("underground resistance agent: fedora, ivory face wrap, dark trench coat, scarlet "
"lantern-red scarf (vivid red, never orange or rust), knife, thin cold-cyan faction outline. Minimize "
"warm-orange tones so the player never reads as the orange-outlined enemy.")
PATROL_MID = ("flashlight patrol soldier: military-green uniform with a readable dark/light value ramp "
"(not near-black, not teal-blue), mid tones bright enough to read against near-black ground, thin "
"warm-orange faction outline, flashlight attached to the same hand pointing with the body, NO light cone.")
ACTIONS = {
  "player": ["idle","walk1","walk2","walk3","walk4","attack0","attack1","attack2"],
  "patrol": ["idle","walk1","walk2","walk3","walk4","alert"],
}

def load_cred():
    cfg = yaml.safe_load(open(CFG, encoding="utf-8"))
    prov = next(p for p in cfg.get("custom_providers", []) if "tapsvc" in p.get("base_url", ""))
    return prov["base_url"], prov["api_key"]

def gen(base, key, model, prompt):
    body = {"model": model, "prompt": prompt, "n": 1, "size": "1024x1024"}
    req = urllib.request.Request(base.rstrip("/") + "/images/generations",
        data=json.dumps(body).encode(),
        headers={"Authorization": "Bearer " + key, "Content-Type": "application/json"})
    with urllib.request.urlopen(req, timeout=240) as r:
        return json.loads(r.read().decode())

def save_first_png(resp, out):
    for d in resp.get("data", []):
        b = d.get("b64_json")
        if not b: continue
        try:
            raw = base64.b64decode(b)
            im = Image.open(io.BytesIO(raw)); im.load()
            if im.mode != "RGBA": im = im.convert("RGBA")
            im.save(out)
            return im.size, len(raw)
        except Exception: continue
    return None, 0

def build_prompt(agent, dir):
    mind = PLAYER_MID if agent == "player" else PATROL_MID
    acts = ", ".join(ACTIONS[agent])
    n = len(ACTIONS[agent])
    return (STYLE + "\n\n"
        f"Create ONE horizontal pixel-art sprite strip: the same single {mind} "
        f"facing exactly {dir} direction (top-down). It is ONE row of {n} frames in this exact order: "
        f"{acts}. All {n} frames are the SAME character, same facing {dir}, same costume/proportions/outline/"
        f"foot anchor. Feet anchored at local cell (32,54). Walk cycle has alternating footwork. Attack has "
        f"full-density knife-extension strike (attack1) at the SAME pixel density as idle/walk. The result is "
        f"a 1 x {n} grid of 64x64 frames, total {n*64}x64 pixels centered in the canvas, transparent background, "
        f"no gutters, no labels, no grid lines.\n\n" + NEGATIVE)

def main():
    agent = sys.argv[1] if len(sys.argv) > 1 else "player"
    dirs = sys.argv[2:] if len(sys.argv) > 2 else DIRS
    model = os.environ.get("GEN_MODEL", "gpt-image-1.5")
    base, key = load_cred()
    OUTDIR.mkdir(parents=True, exist_ok=True)
    dirname = f"{agent}_perdir"
    for d in dirs:
        out = OUTDIR / f"{agent}_{d}.png"
        prompt = build_prompt(agent, d)
        t0 = time.time()
        try:
            resp = gen(base, key, model, prompt)
        except Exception as e:
            print(f"[{agent}/{d}] GEN ERR {e}"); continue
        sz, rawlen = save_first_png(resp, out)
        print(f"[{agent}/{d}] {out.name} size={sz} raw={rawlen}B {time.time()-t0:.1f}s")

if __name__ == "__main__":
    main()
