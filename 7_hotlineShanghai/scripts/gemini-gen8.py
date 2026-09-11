#!/usr/bin/env python3
"""Generate 8 top-down facings via Gemini, each as a standalone single-direction
sprite, verifying each numeric direction and outputting a composite. This tests
whether prompt-only can reliably produce 8 genuinely different facings (yes per
the ortho-4 probe: up/down 0.12, left/up 0.62 on gpt-image it was all ~0.05).
"""
import json, urllib.request, urllib.error, yaml, base64, sys, io, time
from pathlib import Path
from PIL import Image
import numpy as np

CFG = "C:/Users/XINDONG/AppData/Local/hermes/config.yaml"
OUT = Path(r"F:/XD/git-repo/VibeGames/7_hotlineShanghai/_gemini")
OUT.mkdir(parents=True, exist_ok=True)
DIRS8 = ["N","NE","E","SE","S","SW","W","NW"]
DIR_LABEL = {
  "N":"facing NORTH (toward the top edge / up)", "NE":"facing NORTHEAST (toward top-right corner / diagonal up-right)",
  "E":"facing EAST (toward the right edge / right)", "SE":"facing SOUTHEAST (toward bottom-right corner / diagonal down-right)",
  "S":"facing SOUTH (toward the bottom edge / down)", "SW":"facing SOUTHWEST (toward bottom-left corner / diagonal down-left)",
  "W":"facing WEST (toward the left edge / left)", "NW":"facing NORTHWEST (toward top-left corner / diagonal up-left)",
}
BASE = ("top-down view pixel-art video-game sprite, single character, 1937 Shanghai "
        "resistance agent, fedora, ivory face wrap, scar; red scarf, knife, transparent background, "
        "64x64 cell, hard pixel edges, top-down game camera. The character is clearly ")

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

def main():
    model = sys.argv[1] if len(sys.argv) > 1 else "gemini-3-pro-image"
    dirs = sys.argv[2:] if len(sys.argv) > 2 else DIRS8
    cells = {}
    for d in dirs:
        p = BASE + DIR_LABEL[d]
        t0 = time.time()
        try:
            raw = extract(gen(p, model))
        except Exception as e:
            print(f"[{d}] ERR {str(e)[:80]}"); continue
        if raw is None:
            print(f"[{d}] NO IMAGE"); continue
        im = Image.open(io.BytesIO(raw)).convert("RGB")
        im.save(OUT / f"8_{d}.png")
        cells[d] = np.array(im.resize((64,64), Image.NEAREST)).astype(int)
        print(f"[{d}] saved {im.size} {time.time()-t0:.1f}s")
    print("\n=== 8-dir pairwise diff matrix ===")
    names = [d for d in DIRS8 if d in cells]
    print("      " + " ".join(f"{d:>5s}" for d in names))
    for a in names:
        row=[]
        for b in names:
            if a==b: row.append("   --"); continue
            row.append(f"{np.abs(cells[a]-cells[b]).mean()/255:5.3f}" if a in cells and b in cells else "   NA")
        print(f"{a:>4s} " + " ".join(row))
    # composite
    if len(cells):
        cell = 64
        comp = Image.new("RGB",(cell*len(names), cell),(20,20,26))
        for i,d in enumerate(names):
            comp.paste(Image.fromarray(cells[d].astype('uint8')).resize((cell,cell),Image.NEAREST),(i*cell,0))
        comp.save(OUT/"composite.png")
        print("composite saved")

if __name__ == "__main__":
    main()
