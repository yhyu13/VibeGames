#!/usr/bin/env python3
"""Generate an image via the tapsvc gateway's Gemini multimodal endpoint.
Gemini returns images in `choices[0].message.images[].image_url.url` (data: PNG),
NOT `content` — a different field than OpenAI chat. Usage:
  python3 scripts/gemini-gen.py <out.png> "<prompt>" [model]
"""
import json, urllib.request, urllib.error, yaml, base64, sys, io
from pathlib import Path
from PIL import Image

CFG = "C:/Users/XINDONG/AppData/Local/hermes/config.yaml"
def load_cred():
    cfg = yaml.safe_load(open(CFG, encoding="utf-8"))
    prov = next(p for p in cfg.get("custom_providers", []) if "tapsvc" in p.get("base_url", ""))
    return prov["base_url"], prov["api_key"]

def gen_gemini(prompt, model="gemini-3.1-flash-image", size=None, seed=None):
    base, key = load_cred()
    body = {"model": model, "messages": [{"role": "user", "content": [
        {"type": "text", "text": prompt}]}],
        "generationConfig": {"responseModalities": ["TEXT", "IMAGE"], "temperature": 0.2}}
    if size: body["generationConfig"]["imageConfig"] = {"aspectRatio": size}
    if seed is not None: body["generationConfig"]["seed"] = seed
    req = urllib.request.Request(base.rstrip("/") + "/chat/completions",
        data=json.dumps(body).encode(),
        headers={"Authorization": "Bearer " + key, "Content-Type": "application/json"})
    with urllib.request.urlopen(req, timeout=150) as r:
        return json.loads(r.read().decode())

def extract_png(resp):
    msg = resp.get("choices", [{}])[0].get("message", {})
    imgs = msg.get("images", [])
    for im in imgs:
        url = im.get("image_url", {}).get("url") if isinstance(im, dict) else None
        if url and url.startswith("data:image/png;base64,"):
            return base64.b64decode(url.split(",", 1)[1])
    # fallback: content may be a list with image parts
    content = msg.get("content")
    if isinstance(content, list):
        for part in content:
            if isinstance(part, dict) and part.get("type") == "image_url":
                u = part["image_url"].get("url", "")
                if u.startswith("data:image"):
                    return base64.b64decode(u.split(",", 1)[1])
    return None

def main():
    out, prompt = sys.argv[1], sys.argv[2]
    model = sys.argv[3] if len(sys.argv) > 3 else "gemini-3.1-flash-image"
    import time
    t0 = time.time()
    resp = gen_gemini(prompt, model=model)
    raw = extract_png(resp)
    if raw is None:
        print("NO IMAGE. msg keys:", list(resp.get("choices",[{}])[0].get("message",{}).keys()))
        return
    im = Image.open(io.BytesIO(raw))
    if im.mode != "RGBA": im = im.convert("RGBA")
    im.save(out)
    print(f"saved {out} {im.size} {im.mode} {time.time()-t0:.1f}s")

if __name__ == "__main__":
    main()
