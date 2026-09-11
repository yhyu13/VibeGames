#!/usr/bin/env python3
"""Objective direction-consistency check for per-direction strips.

For a set of per-direction strips, extract ONE canonical frame (e.g. idle, the
first content band) from each, normalize to 64x64 through the content bbox, and
compute a pairwise pixel-difference matrix. Signals:
  - HIGH diff | E <=> W pair should be LARGE and roughly mirror-consistent
  - LOW diff between two strips => those two facings were COPY (bad: not 8 real dirs)
  - All 8 pairwise-distinct => 8 real facings
Run: python3 scripts/check-dirs.py player
"""
import sys, numpy as np
from pathlib import Path
from PIL import Image
from itertools import combinations
from collections import Counter

ROOT = Path(r"F:/XD/git-repo/VibeGames/7_hotlineShanghai")
DIRS = ["N","NE","E","SE","S","SW","W","NW"]

def content_bbox(img, thr_alpha=30):
    rgb = np.array(img.convert("RGB")).astype(int); a = np.array(img.getchannel("A"))
    # if opaque bg (alpha 255 everywhere), detect subject from border color dist
    H,W,_ = rgb.shape
    corners = [tuple(rgb[2,2]),tuple(rgb[2,W-3]),tuple(rgb[H-3,2]),tuple(rgb[H-3,W-3])]
    bg = np.array(Counter(corners).most_common(1)[0][0])
    diff = np.abs(rgb - bg).sum(2)
    mask = diff > 60
    ys, xs = np.where(mask)
    if len(xs)==0: return None
    return int(xs.min()), int(ys.min()), int(xs.max()), int(ys.max())

def frame_cell(path, cell=64, pad=4):
    im = Image.open(path).convert("RGBA")
    bbox = content_bbox(im)
    if bbox is None: return None
    x0,y0,x1,y1 = bbox
    sw, sh = x1-x0+1, y1-y0+1
    scale = min((cell-pad*2)/sw, (cell-pad*2)/sh)
    dw, dh = max(1,int(sw*scale)), max(1,int(sh*scale))
    ox = (cell-dw)//2; oy = cell-pad-dh
    crop = im.convert("RGB").crop((x0,y0,x0+dw,y0+dh)).resize((dw,dh), Image.NEAREST)
    out = Image.new("RGB",(cell,cell),(0,0,0))
    out.paste(crop,(ox,oy))
    return np.array(out).astype(int)

def main():
    agent = sys.argv[1] if len(sys.argv)>1 else "player"
    cells={}
    for d in DIRS:
        p = ROOT/"references"/"sprite-samples"/"_perdir"/f"{agent}_{d}.png"
        c = frame_cell(p)
        cells[d]=c
        print(f"{d:3s} bbox-frame extracted={c is not None}")
    print("\n=== pairwise diff matrix (normalized 0-1; LOW = copy/duplicate facing) ===")
    print("      " + "  ".join(f"{d:>4s}" for d in DIRS))
    for a in DIRS:
        row=[]
        for b in DIRS:
            if a==b: row.append("  --"); continue
            ca, cb = cells[a], cells[b]
            if ca is None or cb is None: row.append("  NA"); continue
            d = np.abs(ca-cb).mean()/255
            row.append(f"{d:4.2f}")
        print(f"{a:>4s} " + "  ".join(row))
    # flag near-duplicates (probably copied facings)
    print("\n=== near-duplicate pairs (diff < 0.10 => facing was copied) ===")
    for a,b in combinations(DIRS,2):
        if cells[a] is None or cells[b] is None: continue
        d = np.abs(cells[a]-cells[b]).mean()/255
        if d < 0.10: print(f"  {a} <-> {b}: {d:.3f} COPY?")

if __name__=="__main__":
    main()
