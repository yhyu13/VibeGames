#!/usr/bin/env python3
"""Deterministically make gpt-image AI sprite sheets transparent by removing the
near-white (or checkerboard) backdrop via color-distance from the border color,
keeping only the subject opaque. Reliable replacement for relying on
process-intro-sprites.mjs removeChecker, which is tuned for hand-graded images.

Outputs an RGBA png (1024x1024, transparent bg) to references/sprite-samples/
with suffix '-alpha.png', prints content bbox + sha256.
"""
import numpy as np, hashlib, sys
from pathlib import Path
from PIL import Image
from collections import Counter

ROOT = Path(r"F:/XD/git-repo/VibeGames/7_hotlineShanghai")
SRC = ROOT / "references" / "sprite-samples"

def make_alpha(src_name, dist_thr=70):
    im = Image.open(SRC / src_name).convert("RGB")
    rgb = np.array(im).astype(int)
    H, W, _ = rgb.shape
    # dominant border color from edges
    c = Counter()
    edge = np.concatenate([rgb[0], rgb[-1], rgb[:, 0], rgb[:, -1]])
    for p in edge:
        c[(p[0] >> 3, p[1] >> 3, p[2] >> 3)] += 1
    bg_bucket = c.most_common(1)[0][0]
    bg = np.array([bg_bucket[0] * 8 + 4, bg_bucket[1] * 8 + 4, bg_bucket[2] * 8 + 4])
    dist = np.abs(rgb - bg).sum(2)
    mask = dist > dist_thr  # subject = far from bg
    # keep only the largest connected foreground region (drop specks)
    from scipy import ndimage  # may be absent
    try:
        lab, n = ndimage.label(mask)
        if n > 1:
            sizes = ndimage.sum(mask, lab, range(1, n + 1))
            keep = (np.argmax(sizes) + 1)
            mask = lab == keep
    except Exception:
        pass
    out = np.zeros((H, W, 4), dtype=np.uint8)
    out[..., :3] = rgb
    # alpha 255 for subject, smooth 1px edge from distance (feather falloff)
    a = np.clip((dist - dist_thr * 0.4) / (dist_thr * 0.6), 0, 1) * 255
    out[..., 3] = np.where(mask, a.astype(np.uint8), 0).astype(np.uint8)
    res = Image.fromarray(out, "RGBA")
    name = SRC / (src_name.replace(".png", "-alpha.png"))
    res.save(name)
    # report bbox of opaque
    am = np.array(res.getchannel("A"))
    ys, xs = np.where(am > 0)
    bbox = [int(xs.min()), int(ys.min()), int(xs.max()), int(ys.max())] if len(xs) else None
    h = hashlib.sha256(Path(name).read_bytes()).hexdigest()
    print(f"{src_name} -> {name.name}  size={W}x{H}  bbox={bbox}  opaque_px={int((am>0).sum())}  sha256={h}")
    return name

if __name__ == "__main__":
    for n in sys.argv[1:]:
        make_alpha(n)
