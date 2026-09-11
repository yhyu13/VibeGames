#!/usr/bin/env python3
"""Make a Gemini top-down actor frame transparent. Gemini single frames are
1024x1024 fully-opaque with a DARK background (bright subject on near-black/lum<64
bg), unlike the prop sheets. Use a LUMINANCE threshold + largest-connected-region
to separate subject from background, then hard alpha. Outputs <same path>_a.png.
Try: python3 scripts/gemini-transparent.py _gemini/player/N_idle.png
"""
import numpy as np, sys
from pathlib import Path
from PIL import Image
try:
    from scipy import ndimage
    HAS_SCIPY = True
except Exception:
    HAS_SCIPY = False

def make_transparent(src, lum_thr=60, dist_from_bg=24, feather=2):
    im = Image.open(src).convert("RGB")
    a = np.array(im).astype(int)
    H, W, _ = a.shape
    lum = 0.2126*a[...,0] + 0.7152*a[...,1] + 0.0722*a[...,2]
    # subject = brighter than threshold; use edge-estimated bg to recenter
    edge = np.concatenate([a[0], a[-1], a[:,0], a[:,-1]])
    bg = edge.mean(0)
    dist = np.abs(a - np.array([bg])).sum(2)
    mask = (lum > lum_thr) | (dist > 60)
    # keep largest connected foreground; else whole mask
    if HAS_SCIPY:
        lab, n = ndimage.label(mask)
        if n > 1:
            sizes = ndimage.sum(mask, lab, range(1, n+1))
            mask = lab == (np.argmax(sizes)+1)
    # remove border-touching thin sliver: fill from edges that are NOT subject
    out = np.zeros((H, W, 4), dtype=np.uint8)
    out[..., :3] = a
    out[..., 3] = np.where(mask, 255, 0).astype(np.uint8)
    res = Image.fromarray(out, "RGBA")
    dst = Path(src).with_name(Path(src).stem + "_a.png")
    res.save(dst)
    am = np.array(res.getchannel("A"))
    ys, xs = np.where(am > 0)
    print(f"{Path(src).name} -> {dst.name} size={W}x{H} opaque={(am>0).sum()} bbox={[int(xs.min()),int(ys.min()),int(xs.max()),int(ys.max())] if len(xs) else None}")
    return dst

if __name__ == "__main__":
    for s in sys.argv[1:]:
        make_transparent(s)
