#!/usr/bin/env python3
"""Gemini 8-direction generation with STRONG spatial-view descriptions.
Standard "facing NORTH" prompts fail the back-facing dirs (model reads it as
front/S). This uses explicit camera+anatomy semantics per direction:
  - N/NE/NW: viewed from above, BACK of head toward top, FACE HIDDEN, looking away
  - S/SE/SW: face/front toward camera (bottom), slight angling for diagonals
  - E/W: full side profile (mirror pair)
Outputs _gemini/strong_<dir>.png. Usage: python3 scripts/gemini-gen8-strong.py [dirs...]
"""
import json, urllib.request, urllib.error, yaml, base64, sys, io, time
from pathlib import Path
from PIL import Image

CFG = "C:/Users/XINDONG/AppData/Local/hermes/config.yaml"
OUT = Path(r"F:/XD/git-repo/VibeGames/7_hotlineShanghai/_gemini")
OUT.mkdir(parents=True, exist_ok=True)
DIRS8 = ["N","NE","E","SE","S","SW","W","NW"]

# Each: strict top-down camera + explicit anatomy so the model can't collapse to 'front-facing viewer'.
DIR_DIRECTION = {
 "N": ("viewed from directly above, the BACK of the head and shoulders facing the TOP of the image, "
       "face completely hidden, looking away upward, hat back visible, scarf knot at back of neck"),
 "NE": ("an angled above view, back-of-head/shoulders facing the TOP-RIGHT, face hidden, looking away "
        "upward-right, back partly visible"),
 "E": ("a full SIDE profile facing the RIGHT edge, one shoulder and face visible in profile, nose/hat "
       "brim point right, knife arm toward right"),
 "SE": ("a three-quarter view, face angled toward the BOTTOM-RIGHT, front-right of body visible, looking "
        "down-right"),
 "S": ("viewed from above, the FACE and chest toward the BOTTOM edge (toward camera), front visible, "
       "scarf knot at front"),
 "SW": ("a three-quarter view, face angled toward the BOTTOM-LEFT, front-left of body visible, looking "
        "down-left"),
 "W": ("a full SIDE profile facing the LEFT edge, one shoulder and face visible in profile, nose/hat brim "
       "point left, knife arm toward left"),
 "NW": ("an angled above view, back-of-head/shoulders facing the TOP-LEFT, face hidden, looking away "
        "upward-left, back partly visible"),
}

def load_cred():
    cfg = yaml.safe_load(open(CFG, encoding="utf-8"))
    prov = next(p for p in cfg.get("custom_providers", []) if "tapsvc" in p.get("base_url", ""))
    return prov["base_url"], prov["api_key"]

def gen(prompt, model):
    base, key = load_cred()
    body = {"model": model, "messages": [{"role": "user", "content": [{"type": "text", "text": prompt}]}],
            "generationConfig": {"responseModalities": ["TEXT", "IMAGE"], "temperature": 0.25}}
    req = urllib.request.Request(base.rstrip("/") + "/chat/completions", data=json.dumps(body).encode(),
        headers={"Authorization": "Bearer " + key, "Content-Type": "application/json"})
    with urllib.request.urlopen(req, timeout=180) as r:
        return json.loads(r.read().decode())

def extract(resp):
    msg = resp.get("choices", [{}])[0].get("message", {})
    for im in msg.get("images", []):
        url = im.get("image_url", {}).get("url") if isinstance(im, dict) else None
        if url and url.startswith("data:image/png;base64,"):
            return base64.b64decode(url.split(",", 1)[1])
    return None

def prompt_for(d):
    view = DIR_DIRECTION[d]
    return (f"Top-down pixel-art video-game sprite, single character, 1937 Shanghai resistance agent: "
            f"fedora, ivory face wrap, scarlet scarf, dark trench coat, knife. Seen from a straight-down "
            f"game camera. The character is {view}. Hard-edged pixel clusters, 64x64 cell in a 1024x1024 "
            f"canvas, transparent background, no people, no scene, no text.")

def main():
    model = sys.argv[1] if len(sys.argv) > 1 else "gemini-3-pro-image"
    dirs = sys.argv[2:] if len(sys.argv) > 2 else DIRS8
    for d in dirs:
        t0 = time.time()
        try:
            raw = extract(gen(prompt_for(d), model))
        except Exception as e:
            print(f"[{d}] ERR {str(e)[:80]}"); continue
        if raw is None:
            print(f"[{d}] NO IMAGE"); continue
        im = Image.open(io.BytesIO(raw)).convert("RGBA")
        im.save(OUT / f"strong_{d}.png")
        print(f"[{d}] saved {im.size} {time.time()-t0:.1f}s")

if __name__ == "__main__":
    main()
