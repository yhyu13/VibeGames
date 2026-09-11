#!/usr/bin/env python3
"""Generate the player / patrol actor sheets + retry neon_sign via the tapsvc
gpt-image-1.5 gateway. Builds full prompts from docs/design/24 §5/§6/§7.3.
Outputs one 1024x1024 RGBA PNG per asset into references/sprite-samples/.
"""
import json, urllib.request, urllib.error, yaml, base64, io, time, sys, os
from pathlib import Path
from PIL import Image

ROOT = Path(r"F:/XD/git-repo/VibeGames/7_hotlineShanghai")
SRC = ROOT / "references" / "sprite-samples"
CFG = "C:/Users/XINDONG/AppData/Local/hermes/config.yaml"

STYLE = ("Production-ready pixel-art sprite for a top-down 2D action game set in 1937 Shanghai. "
"Visual direction: Hotline Miami energy filtered through restrained Republican-era Shanghai vaporwave. "
"Match the supplied reference image's costume language, silhouette, palette, and atmosphere, but output a "
"clean isolated runtime sprite rather than concept art. Crisp hard-edged pixel clusters, deliberate "
"hand-placed pixel appearance, three-value material ramps, strong silhouette at actual size, transparent "
"background, no antialiasing, no blur, no bloom, no soft glow, no cast shadow, no environment, no text, no "
"UI, no watermark.")

NEGATIVE = ("concept art, illustration, painterly, photorealistic, 3D render, isometric, side view, front "
"portrait, smooth vector art, anti-aliased edges, subpixel detail, blurry pixels, soft brush, gradient "
"background, glow halo, bloom, lens flare, cast shadow, floor plane, scenery, frame, border, labels, "
"typography, UI, watermark, multiple unrelated characters, cropped body, inconsistent scale, inconsistent "
"anchor, extra limbs, malformed hands, oversized head, chibi proportions")

PLAYER = ("Create one coherent top-down sprite sheet for the same underground resistance agent in every "
"frame. Preserve exact costume, proportions, palette, outline, and foot anchor across the entire sheet: "
"fedora, ivory face wrap, dark trench coat, scarlet lantern-red scarf (vivid red, never orange or rust), "
"knife, thin cold-cyan faction outline around the whole silhouette. Minimize warm-orange/rust tones so the "
"player never reads as the orange-outlined enemy.\n\n"
"Directions are rows in this exact order: N, NE, E, SE, S, SW, W, NW.\n"
"Frames are columns in this exact order: idle 1; walk 1; walk 2; walk 3; walk 4; knife attack wind-up; "
"knife attack strike; knife attack recover.\n"
"The result contains 8 rows x 8 columns of 64x64 frames, total 512x512 pixels. Each character occupies "
"roughly the central 60% of the 64x64 cell; feet stay anchored at local cell coordinate (32,54). Walk cycle "
"has clear alternating footwork and scarf motion. Attack cycle has readable anticipation, a FULL-DENSITY "
"knife-extension strike frame (same body scale and pixel density as idle/walk, not sparse), and recovery "
"without changing body scale.\n\nTransparent background. No gutters between cells. No labels or grid lines.")

PATROL = ("Create one coherent top-down sprite sheet for the same flashlight patrol soldier in every frame. "
"Preserve exact uniform, helmet, body proportions, flashlight size, and foot anchor across the entire sheet. "
"Uniform base is military green with a readable dark/light value ramp (not near-black and not teal-blue); "
"mid tones bright enough to read against near-black ground. Thin warm-orange faction outline around the whole "
"silhouette. The flashlight stays attached to the same hand and points with the body direction; do NOT render "
"a light cone.\n\n"
"Directions are rows in this exact order: N, NE, E, SE, S, SW, W, NW.\n"
"Frames are columns in this exact order: idle; walk 1; walk 2; walk 3; walk 4; alert.\n"
"The result contains 8 rows x 6 columns of 64x64 frames, total 384x512 pixels. Each character occupies roughly "
"the central 60% of the 64x64 cell; feet stay anchored at local cell coordinate (32,54). Walk cycle has clear "
"alternating footwork. Alert frame raises the flashlight and stiffens the silhouette without changing body "
"scale.\n\nTransparent background. No gutters between cells. No labels or grid lines.")

NEON = ("One small top-down 1930s Shanghai shop sign: thin glowing neon-tube letters (Chinese characters "
"are fine, rendered as abstract readable tube shapes, no legible legalese) in cyan and lantern-red tubes, "
"mounted on a dark iron bracket. Subtle glow suggested by bright tube cores, not a bloom halo. Single 64x64 "
"cell, transparent background, no people, no character.")

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
    data = resp.get("data", [])
    for d in data:
        b = d.get("b64_json")
        if not b: continue
        try:
            raw = base64.b64decode(b)
            im = Image.open(io.BytesIO(raw)); im.load()
            if im.mode != "RGBA": im = im.convert("RGBA")
            im.save(out)
            return im.size, im.mode, len(raw)
        except Exception:
            continue
    return None, None, 0

def main():
    base, key = load_cred()
    model = sys.argv[1] if len(sys.argv) > 1 else "gpt-image-1.5"
    which = sys.argv[2] if len(sys.argv) > 2 else "all"
    targets = {
        "player": (PLAYER, "player-knife-sheet.png"),
        "patrol": (PATROL, "flashlight-patrol-sheet.png"),
        "neon_sign": (NEON, "neon-sign-tile.png"),
    }
    for pid, (bodytxt, fname) in targets.items():
        if which != "all" and which != pid: continue
        prompt = STYLE + "\n\n" + bodytxt + "\n\n" + NEGATIVE
        t0 = time.time()
        try:
            resp = gen(base, key, model, prompt)
        except Exception as e:
            print(f"[{pid}] GEN ERROR: {e}"); continue
        out = SRC / fname
        sz, mode, rawlen = save_first_png(resp, out)
        print(f"[{pid}] {fname}: size={sz} mode={mode} raw={rawlen}B {time.time()-t0:.1f}s")

if __name__ == "__main__":
    main()
