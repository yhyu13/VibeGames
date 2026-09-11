#!/usr/bin/env python3
"""Gemini facing test: does Gemini generate genuinely different top-down facings?
Outputs 4 orthogonal facing images + a pairwise diff matrix. Uses the tapsvc
gateway Gemini multimodal image endpoint.
"""
import json, urllib.request, urllib.error, yaml, base64, sys, io, time
from pathlib import Path
from PIL import Image
import numpy as np

CFG = "C:/Users/XINDONG/AppData/Local/hermes/config.yaml"
OUT = Path(r"F:/XD/git-repo/VibeGames/7_hotlineShanghai/_gemini")
OUT.mkdir(parents=True, exist_ok=True)

def load_cred():
    cfg = yaml.safe_load(open(CFG, encoding="utf-8"))
    prov = next(p for p in cfg.get("custom_providers", []) if "tapsvc" in p.get("base_url", ""))
    return prov["base_url"], prov["api_key"]

def gen_gemini(prompt, model="gemini-3.1-flash-image"):
    base, key = load_cred()
    body = {"model": model, "messages": [{"role": "user", "content": [
        {"type": "text", "text": prompt}]}],
        "generationConfig": {"responseModalities": ["TEXT", "IMAGE"], "temperature": 0.2}}
    req = urllib.request.Request(base.rstrip("/") + "/chat/completions",
        data=json.dumps(body).encode(),
        headers={"Authorization": "Bearer " + key, "Content-Type": "application/json"})
    with urllib.request.urlopen(req, timeout=150) as r:
        return json.loads(r.read().decode())

def extract_png(resp):
    msg = resp.get("choices", [{}])[0].get("message", {})
    for im in msg.get("images", []):
        url = im.get("image_url", {}).get("url") if isinstance(im, dict) else None
        if url and url.startswith("data:image/png;base64,"):
            return base64.b64decode(url.split(",", 1)[1])
    return None

BASE = ("top-down view pixel-art video-game sprite, single character, 1937 Shanghai "
        "resistance agent, fedora, ivory face wrap, red scarf, knife, transparent background")

DIRS = {
  "up":    BASE + ", the character is facing UP (toward the top edge of the image)",
  "down":  BASE + ", the character is facing DOWN (toward the bottom edge of the image)",
  "left":  BASE + ", the character is facing LEFT (toward the left edge of the image)",
  "right": BASE + ", the character is facing RIGHT (toward the right edge of the image)",
}

def main():
    model = sys.argv[1] if len(sys.argv) > 1 else "gemini-3.1-flash-image"
    cells = {}
    for name, prompt in DIRS.items():
        t0 = time.time()
        try:
            raw = extract_png(gen_gemini(prompt, model))
        except Exception as e:
            print(f"[{name}] ERR {e}"); continue
        if raw is None:
            print(f"[{name}] NO IMAGE"); continue
        im = Image.open(io.BytesIO(raw)).convert("RGB")
        im.save(OUT / f"{name}.png")
        cells[name] = np.array(im.resize((64, 64), Image.NEAREST)).astype(int)
        print(f"[{name}] saved {im.size} {time.time()-t0:.1f}s")
    print("\n=== GEMINI ortho-4 facing diffs (gpt-image baseline: up-down 0.053, left-right 0.091) ===")
    names = list(cells)
    for a in names:
        for b in names:
            if a >= b: continue
            d = np.abs(cells[a] - cells[b]).mean() / 255
            print(f"  {a:6s} vs {b:6s}: {d:.3f}")

if __name__ == "__main__":
    main()
