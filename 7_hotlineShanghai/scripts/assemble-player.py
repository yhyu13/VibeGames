#!/usr/bin/env python3
"""Assemble per-frame Gemini sprites into an 8x8 player sheet and register it.
Steps: for each (dir,action) transparentize (checkerboard flood-fill) -> crop the
content to 64px -> pack an 8-row (direction) x 8-col (action) RGBA atlas -> write
a candidate source sheet + xBands/yBands + the pipeline-format band map.

The 8x8 result is NOT yet wired into process-intro-sprites.mjs; this script
produces the assembled sheet + verified bands so the next step is manifest
registration. Output: references/sprite-samples/player-knife-sheet-g3.png and a
JSON of per-cell bands.

Usage: python3 scripts/assemble-player.py
"""
import json, numpy as np, sys
from pathlib import Path
from PIL import Image
from collections import Counter
try:
    from scipy import ndimage
    HAVE_SCIPY = True
except Exception:
    HAVE_SCIPY = False

ROOT = Path(r"F:/XD/git-repo/VibeGames/7_hotlineShanghai")
GEM = ROOT / "_gemini" / "player"
SRC = ROOT / "references" / "sprite-samples"
DIRS8 = ["N","NE","E","SE","S","SW","W","NW"]
ACTIONS8 = ["idle","walk1","walk2","walk3","walk4","attack0","attack1","attack2"]

def remove_checkerboard(im):
    """flood-fill from edges to drop the light-grey checkerboard behind the subject."""
    rgb = np.array(im.convert("RGB")).astype(int); H, W, _ = rgb.shape
    # candidate = near either flat checker tone OR anything connected to the border
    c = Counter()
    edge = np.concatenate([rgb[0], rgb[-1], rgb[:,0], rgb[:,-1]])
    for p in edge:
        c[(p[0]>>3, p[1]>>3, p[2]>>3)] += 1
    dom = [tuple(k) for k, _ in c.most_common(3)]
    cand = np.zeros((H, W), bool)
    for k in dom:
        dc = np.array([k[0]*8+4, k[1]*8+4, k[2]*8+4])
        cand |= np.abs(rgb - np.array([dc])).sum(2) < 60
    # also pure-ish flat greys (160/192 style)
    for g in [np.array([160,160,160]), np.array([192,192,192])]:
        cand |= np.abs(rgb - np.array([g])).sum(2) < 55
    if HAVE_SCIPY:
        lab, n = ndimage.label(cand)
        border = np.unique(np.concatenate([lab[0], lab[-1], lab[:,0], lab[:,-1]]))
        border = border[border != 0]
        bg = np.isin(lab, border)
    else:
        bg = cand
    out = np.array(im)
    out[bg, 3] = 0
    am = out[..., 3]
    # keep only largest opaque connected region (drop stray specks)
    if HAVE_SCIPY and (am > 0).any():
        labf, nf = ndimage.label(am > 0)
        sizes = ndimage.sum(am > 0, labf, range(1, nf+1))
        keep = (np.argmax(sizes)+1)
        if sizes.max() > 10:
            out[(labf != keep), 3] = 0
    return Image.fromarray(out, "RGBA")

def crop_to_cell(im, cell=64, pad=3, global_scale=None, anchor=(32,54)):
    """Normalize a transparentized frame to a 64px cell. If global_scale is given
    (computed from a reference idle frame), use it for ALL frames so attacks/walks
    keep the same character size and only the extending limb may exceed the cell
    (nearest). Anchor = foot-bottom center (x, y) kept fixed per the contract."""
    am = np.array(im.getchannel("A"))
    ys, xs = np.where(am > 0)
    if len(xs) == 0: return None
    x0, y0, x1, y1 = xs.min(), ys.min(), xs.max(), ys.max()
    sw, sh = x1-x0+1, y1-y0+1
    if global_scale is None:
        scale = min((cell-pad*2)/sw, (cell-pad*2)/sh)
    else:
        scale = global_scale
    dw, dh = max(1, int(sw*scale)), max(1, int(sh*scale))
    crop = im.crop((x0, y0, x0+dw, y0+dh)).resize((dw, dh), Image.NEAREST)
    out = Image.new("RGBA", (cell, cell), (0,0,0,0))
    # anchor the SUBJECT's foot line: place crop so its bottom sits at anchor.y+…,
    # and its horizontal center at anchor.x. Keep same baseline across frames.
    ox = max(0, min(cell-dw, anchor[0] - dw//2))
    oy = max(0, min(cell-dh, anchor[1] - dh))
    out.paste(crop, (ox, oy), crop)
    return out, (x0, y0, x1, y1)

def main():
    frames = {}
    t_imgs = {}
    # First pass: transparentize all present frames, keep bbox + gather idle scale.
    for d in DIRS8:
        for act in ACTIONS8:
            p = GEM / f"{d}_{act}.png"
            if not p.exists():
                continue
            tim = remove_checkerboard(Image.open(p).convert("RGBA"))
            am = np.array(tim.getchannel("A"))
            ys, xs = np.where(am > 0)
            if len(xs) == 0:
                print(f"EMPTY {d}/{act}"); continue
            bbox = (int(xs.min()), int(ys.min()), int(xs.max()), int(ys.max()))
            t_imgs[(d, act)] = (tim, bbox)
    # global uniform scale from the N idle frame (reference pose) so all frames share it
    ref = t_imgs.get(("N", "idle"))
    global_scale = None
    if ref is not None:
        x0, y0, x1, y1 = ref[1]
        sw, sh = x1-x0+1, y1-y0+1
        global_scale = min((64-2*3)/sw, (64-2*3)/sh)
        print(f"global_scale (from N idle) = {global_scale:.4f}")
    # Second pass: crop with the SAME scale + fixed foot anchor across all frames
    for d in DIRS8:
        row_cells = []
        for act in ACTIONS8:
            if (d, act) not in t_imgs:
                continue
            tim, bbox = t_imgs[(d, act)]
            cell, _ = crop_to_cell(tim, global_scale=global_scale)
            if cell is None:
                continue
            row_cells.append(cell)
        if row_cells:
            frames[d] = row_cells
    dirs_present = [d for d in DIRS8 if d in frames]
    cols = 8
    atlas = Image.new("RGBA", (cols*64, len(dirs_present)*64), (0,0,0,0))
    for di, d in enumerate(dirs_present):
        for ai in range(cols):
            if ai < len(frames[d]):
                atlas.paste(frames[d][ai], (ai*64, di*64), frames[d][ai])
    out_path = SRC / "player-knife-sheet-g3.png"
    atlas.save(out_path)
    print(f"assembled sheet -> {out_path} {atlas.size}")
    print("dirs present:", dirs_present)
    json.dump({"dirs": dirs_present, "cols": cols, "cell": 64, "global_scale": global_scale},
              open(ROOT / "_gemini" / "player_bands.json", "w"), indent=1)
    print("meta -> _gemini/player_bands.json")
    a = np.array(atlas.getchannel("A"))
    print(f"atlas alpha unique={len(np.unique(a))} semi={int(((a>0)&(a<255)).sum())} transparent={float((a==0).mean()):.3f}")

if __name__ == "__main__":
    main()
