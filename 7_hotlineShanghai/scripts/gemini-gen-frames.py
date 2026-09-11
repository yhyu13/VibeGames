#!/usr/bin/env python3
"""Per-frame per-direction generation for a top-down actor via Gemini with
subject_reference. Each call = ONE (direction, action) frame, so layout is always
a clean single sprite (no grid-layout unreliability). Locked to the per-direction
strong reference for character+facing consistency. Resumable: skips frames whose
output file already exists.

Outputs  _gemini/player/<dir>_<action>.png   (RGBA, 1408x768 single frame)
Usage: python3 scripts/gemini-gen-frames.py player [N E SE ...]
"""
import json, urllib.request, urllib.error, yaml, base64, sys, io, time
from pathlib import Path
from PIL import Image

CFG = "C:/Users/XINDONG/AppData/Local/hermes/config.yaml"
ROOT = Path(r"F:/XD/git-repo/VibeGames/7_hotlineShanghai")
GEM = ROOT / "_gemini"
DIRS8 = ["N","NE","E","SE","S","SW","W","NW"]
ACTIONS8 = ["idle","walk1","walk2","walk3","walk4","attack0","attack1","attack2"]
STRONG_REF = {d: GEM/ f"strong_{d}.png" for d in DIRS8}
# action semantic description (high-leverage per game-asset-art-direction skill)
ACTION_DESC = {
  "idle":"standing still, neutral stance", "walk1":"walking, left foot forward",
  "walk2":"walking, feet together passing", "walk3":"walking, right foot forward",
  "walk4":"walking, feet together passing", "attack0":"knife attack windup, arm cocked back",
  "attack1":"knife attack strike, knife fully extended forward (full density, same as idle)",
  "attack2":"knife attack recover, returning to stance",
}
FACE_DESC = {
  "N":"back of head toward the TOP, face hidden, looking away upward",
  "NE":"back angled toward TOP-RIGHT, face hidden, looking up-right",
  "E":"full side profile facing the RIGHT, nose/brim point right",
  "SE":"three-quarter front-right, face angled toward BOTTOM-RIGHT",
  "S":"front facing the camera, face visible, looking down toward viewer",
  "SW":"three-quarter front-left, face angled toward BOTTOM-LEFT",
  "W":"full side profile facing the LEFT, nose/brim point left",
  "NW":"back angled toward TOP-LEFT, face hidden, looking up-left",
}

def load_cred():
    cfg = yaml.safe_load(open(CFG, encoding="utf-8"))
    prov = next(p for p in cfg.get("custom_providers", []) if "tapsvc" in p.get("base_url", ""))
    return prov["base_url"], prov["api_key"]

def gen_frame(prompt, ref_path, model="gemini-3-pro-image"):
    base, key = load_cred()
    ref = base64.b64encode(ref_path.read_bytes()).decode()
    body = {"model": model, "messages": [{"role": "user", "content": [
        {"type": "text", "text": prompt},
        {"type": "image_url", "image_url": {"url": "data:image/png;base64," + ref}}]}],
        "generationConfig": {"responseModalities": ["TEXT", "IMAGE"], "temperature": 0.25}}
    req = urllib.request.Request(base.rstrip("/") + "/chat/completions", data=json.dumps(body).encode(),
        headers={"Authorization": "Bearer " + key, "Content-Type": "application/json"})
    with urllib.request.urlopen(req, timeout=200) as r:
        return json.loads(r.read().decode())

def extract_png(resp):
    msg = resp.get("choices", [{}])[0].get("message", {})
    for im in msg.get("images", []):
        url = im.get("image_url", {}).get("url") if isinstance(im, dict) else None
        if url and url.startswith("data:image/png;base64,"):
            return base64.b64decode(url.split(",", 1)[1])
    return None

def frame_prompt(d, act):
    return (f"Use this character as the exact subject reference (same costume, proportions, palette, "
            f"outline, same character). Generate ONE single top-down pixel-art frame of the SAME "
            f"character, {FACE_DESC[d]}. The pose is: {ACTION_DESC[act]}. Same facing as the reference, "
            f"same foot anchor. Single 64x64 sprite centered in the canvas. The background is a clean "
            f"ISOLATED light-grey checkerboard pattern ONLY behind the character (two flat alternation "
            f"tones, no gradient, no vignette, no dark border, no scene). Character is a solid sharp "
            f"pixel-art figure, hard pixel edges, no labels, no other characters.")

def main():
    agent = sys.argv[1] if len(sys.argv) > 1 else "player"
    dirs = sys.argv[2:] if len(sys.argv) > 2 else DIRS8
    outdir = GEM / agent
    outdir.mkdir(parents=True, exist_ok=True)
    for d in dirs:
        for act in ACTIONS8:
            out = outdir / f"{d}_{act}.png"
            if out.exists():  # resumable
                continue
            try:
                raw = extract_png(gen_frame(frame_prompt(d, act), STRONG_REF[d]))
            except Exception as e:
                print(f"[{agent}/{d}/{act}] ERR {str(e)[:80]}"); continue
            if raw is None:
                print(f"[{agent}/{d}/{act}] NO IMAGE"); continue
            im = Image.open(io.BytesIO(raw)).convert("RGBA")
            im.save(out)
            print(f"[{agent}/{d}/{act}] saved {im.size}")
            time.sleep(0.5)  # gentle throttle
    print("done")

if __name__ == "__main__":
    main()
