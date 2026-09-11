#!/usr/bin/env python3
"""Generate intro sprites via the tapsvc OpenAI-compatible image gateway
(gpt-image-1.5). Builds each full prompt from docs/design/24 §common prefix +
body + negative, saves the decoded 1024x1024 PNG to references/sprite-samples/,
and reports size/mode. Resolves gpt-image-1.5's multi-frame/C2PA quirk (may
return a multi-image asset; we take the first b64_json that decodes to a PNG).
"""
import json, urllib.request, urllib.error, yaml, base64, io, time, sys, os
from pathlib import Path
from PIL import Image

ROOT = Path(r"F:/XD/git-repo/VibeGames/7_hotlineShanghai")
SRC = ROOT / "references" / "sprite-samples"

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

PROMPTS = {
  "exit": ("One top-down doorway prop: a dark carved wooden double door set into an aged red-brick frame "
           "with a narrow stone lintel, and a small green lantern/glow accent as the exit goal anchor. "
           "Readable from a top-down game camera. Single 64x64 cell, transparent background, hard pixel "
           "edges, no people, no street scene."),
  "sandbag": ("One top-down stack of sandbags: two layered rows of bulging tan/khaki sandbags with dark "
              "stitch seams and worn patches, crisp hard-edged pixel clusters, strong silhouette at actual "
              "size. Single 64x64 cell, transparent background."),
  "neon_sign": ("One small top-down 1930s Shanghai shop sign: thin glowing neon-tube letters (Chinese "
                "characters are fine, rendered as abstract readable tube shapes, no legible legalese) in "
                "cyan and lantern-red tubes, mounted on a dark iron bracket. Subtle glow suggested by bright "
                "tube cores, not a bloom halo. Single 64x64 cell, transparent background."),
}

def load_cred():
    cfg = yaml.safe_load(open(Path(os.environ.get("HERMES_HOME", Path.home()/".hermes"))/"config.yaml", encoding="utf-8"))
    prov = next(p for p in cfg.get("custom_providers", []) if "tapsvc" in p.get("base_url", ""))
    return prov["base_url"], prov["api_key"]

def gen(base, key, model, prompt):
    body = {"model": model, "prompt": prompt, "n": 1, "size": "1024x1024"}
    req = urllib.request.Request(base.rstrip("/") + "/images/generations",
        data=json.dumps(body).encode(),
        headers={"Authorization": "Bearer " + key, "Content-Type": "application/json"})
    with urllib.request.urlopen(req, timeout=180) as r:
        return json.loads(r.read().decode())

def decode_first_png(b64_jsons):
    for b in b64_jsons:
        try:
            raw = base64.b64decode(b)
            # gpt-image-1.5 may return a multi-image jar; split on PNG signature
            sig = b"\x89PNG\r\n\x1a\n"
            chunks = raw.split(sig)
            if len(chunks) > 1:
                cand = sig + chunks[1]
                for c in chunks[1:]:
                    pass
            im = Image.open(io.BytesIO(raw))
            im.load()
            return raw, im
        except Exception as e:
            continue
    return None, None

def main():
    model = sys.argv[1] if len(sys.argv) > 1 else "gpt-image-1.5"
    only = sys.argv[2] if len(sys.argv) > 2 else None
    base, key = load_cred()
    for pid, body in PROMPTS.items():
        if only and pid != only:
            continue
        prompt = STYLE + "\n\n" + body + "\n\n" + NEGATIVE
        t0 = time.time()
        try:
            resp = gen(base, key, model, prompt)
        except Exception as e:
            print(f"[{pid}] ERROR: {e}")
            continue
        data = resp.get("data", [])
        b64s = [d.get("b64_json") for d in data if d.get("b64_json")]
        raw, im = decode_first_png(b64s)
        if raw is None:
            print(f"[{pid}] FAILED decode. resp keys={list(resp.keys())} data0={list(data[0].keys()) if data else 'none'}")
            continue
        if im.mode != "RGBA":
            im = im.convert("RGBA")
        out = SRC / f"{pid}-doorway-tile.png" if pid == "exit" else SRC / f"{pid}-tile.png"
        im.save(out)
        print(f"[{pid}] SAVED {out.name}  size={im.size} mode={im.mode}  {time.time()-t0:.1f}s  raw={len(raw)}B")

if __name__ == "__main__":
    main()
