#!/usr/bin/env python3
"""Generate per-direction 1x8 action strips for a top-down actor via Gemini with
subject_reference (img2img) to lock the character. Each call: one direction, a
single row of 8 frames (idle, walk1-4, attack0-2). Uses a reference PNG as the
subject-consistency anchor, and asks for a checkerboard/transparent background.

Outputs _gemini/player_strip_<dir>.png (1408x768 RGBA). Usage:
  python3 scripts/gemini-gen-strips.py player [dirs...]
"""
import json, urllib.request, urllib.error, yaml, base64, sys, io, time
from pathlib import Path
from PIL import Image

CFG = "C:/Users/XINDONG/AppData/Local/hermes/config.yaml"
ROOT = Path(r"F:/XD/git-repo/VibeGames/7_hotlineShanghai")
GEM = ROOT / "_gemini"
GEM.mkdir(parents=True, exist_ok=True)
DIRS8 = ["N","NE","E","SE","S","SW","W","NW"]
STRONG_REF = {  # per-direction reference from the verified 8-dir strong batch
  "N":"strong_N.png","NE":"strong_NE.png","E":"strong_E.png","SE":"strong_SE.png",
  "S":"strong_S.png","SW":"strong_SW.png","W":"strong_W.png","NW":"strong_NW.png",
}

def load_cred():
    cfg = yaml.safe_load(open(CFG, encoding="utf-8"))
    prov = next(p for p in cfg.get("custom_providers", []) if "tapsvc" in p.get("base_url", ""))
    return prov["base_url"], prov["api_key"]

def gen_reference(prompt, ref_path, model="gemini-3-pro-image"):
    base, key = load_cred()
    ref = base64.b64encode((GEM / ref_path).read_bytes()).decode()
    body = {"model": model, "messages": [{"role": "user", "content": [
        {"type": "text", "text": prompt},
        {"type": "image_url", "image_url": {"url": "data:image/png;base64," + ref}}]}],
        "generationConfig": {"responseModalities": ["TEXT", "IMAGE"], "temperature": 0.25}}
    req = urllib.request.Request(base.rstrip("/") + "/chat/completions", data=json.dumps(body).encode(),
        headers={"Authorization": "Bearer " + key, "Content-Type": "application/json"})
    with urllib.request.urlopen(req, timeout=220) as r:
        return json.loads(r.read().decode())

def extract_png(resp):
    msg = resp.get("choices", [{}])[0].get("message", {})
    for im in msg.get("images", []):
        url = im.get("image_url", {}).get("url") if isinstance(im, dict) else None
        if url and url.startswith("data:image/png;base64,"):
            return base64.b64decode(url.split(",", 1)[1])
    return None

def strip_prompt(d):
    return ("Use this character as the exact subject reference (same costume, proportions, "
            "palette, outline). Create ONE horizontal strip of 8 frames of the SAME character: "
            "idle, walk1, walk2, walk3, walk4, knife attack windup, knife attack strike, knife "
            "attack recover. All 8 frames face the same direction and keep the same foot anchor. "
            "1 row x 8 frames, each 64x64, total 512x64 centered in the canvas. Hard-edged pixel "
            "art, transparent background shown as a light checkerboard, no gutters, no labels, no "
            "grid lines. Keep the same character facing, same proportions, same foot anchor across "
            "all frames.")

def main():
    agent = sys.argv[1] if len(sys.argv) > 1 else "player"
    dirs = sys.argv[2:] if len(sys.argv) > 2 else DIRS8
    model = "gemini-3-pro-image"
    for d in dirs:
        if agent != "player":
            print(f"[{agent}] only player refs wired; skip {d}"); continue
        out = GEM / f"{agent}_strip_{d}.png"
        t0 = time.time()
        try:
            raw = extract_png(gen_reference(strip_prompt(d), STRONG_REF[d], model))
        except Exception as e:
            print(f"[{agent}/{d}] ERR {str(e)[:80]}"); continue
        if raw is None:
            print(f"[{agent}/{d}] NO IMAGE"); continue
        im = Image.open(io.BytesIO(raw)).convert("RGBA")
        im.save(out)
        print(f"[{agent}/{d}] saved {im.size} {time.time()-t0:.1f}s")

if __name__ == "__main__":
    main()
