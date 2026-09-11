#!/usr/bin/env python3
"""Measure §9 acceptance gates on the GENERATED atlas outputs the game actually
renders (public/sprites/intro/*.png). These are post-removeChecker RGBA cells in
64px space — the only ground truth for gate 3-7. Judges each gate PASS/FAIL/INFO
with numeric evidence against docs/design/24 §9 thresholds.
"""
import json, sys
from pathlib import Path
from collections import Counter
try:
    from PIL import Image
except ImportError:
    print("PIL missing"); sys.exit(2)

ROOT = Path(r"F:/XD/git-repo/VibeGames/7_hotlineShanghai")
INTRO = ROOT / "public" / "sprites" / "intro"

def hsv(rgb):
    from colorsys import rgb_to_hsv
    r,g,b=[v/255 for v in rgb]
    return rgb_to_hsv(r,g,b)

def bucket(h):
    d=h*360
    if d>=330 or d<20: return "red_pink"
    if 20<=d<45: return "orange_rust"
    if 45<=d<70: return "yellow"
    if 70<=d<160: return "green_mil"
    if 160<=d<210: return "cyan_teal"
    if 210<=d<255: return "blue"
    return "magenta"

def grid_cells(im, cols, rows, cell):
    out=[]
    for r in range(rows):
        for c in range(cols):
            box=(c*cell,r*cell,(c+1)*cell,(r+1)*cell)
            out.append((r,c,im.crop(box)))
    return out

def cell_stats(cell):
    px=cell.load(); n=0
    hue=Counter(); sat=0.0; vs=0.0; xs=[]; ys=[]
    for y in range(cell.size[1]):
        for x in range(cell.size[0]):
            r,g,b,a=px[x,y]
            if a>0:
                n+=1; xs.append(x); ys.append(y)
                h,s,v=hsv((r,g,b))
                hue[bucket(h)]+=1; sat+=s; vs+=v
    if n==0: return None
    lminx,lmaxx=min(xs),max(xs); lminy,lmaxy=min(ys),max(ys)
    # foot = bottommost opaque row centroid
    boty=max(ys); bot=[x for (x,y) in zip(xs,ys) if y==boty]
    # build foot via iterate
    return {
        "n":n,
        "fill":round(n/(cell.size[0]*cell.size[1]),3),
        "hw":lmaxx-lminx+1,"hh":lmaxy-lminy+1,
        "bbox":[lminx,lminy,lmaxx,lmaxy],
        "foot":[round(sum(bot)/len(bot),2),boty],
        "sat":round(sat/n,3),"val":round(vs/n,3),
        "hue":{k:round(v/n,3) for k,v in hue.items()},
    }

def analyze(file, cols, rows, cell, actions, name):
    im=Image.open(INTRO/file).convert("RGBA")
    cells=grid_cells(im,cols,rows,cell)
    stats={}
    for (r,c,img) in cells:
        st=cell_stats(img)
        if st: stats[f"{r}.{c}"]=st
    allc=list(stats.values())
    # foot anchor drift
    fy=[s["foot"][1] for s in allc]; fx=[s["foot"][0] for s in allc]
    foot_drift=max(fy)-min(fy) if fy else -1
    fx_drift=max(fx)-min(fx) if fx else -1
    hw=[s["hw"] for s in allc]; hh=[s["hh"] for s in allc]
    hw_range=max(hw)-min(hw); hh_range=max(hh)-min(hh)
    # hue aggregate
    ha=Counter()
    for s in allc: ha.update(s["hue"])
    tot=sum(ha.values()) or 1
    huef={k:round(v/tot,3) for k,v in ha.items()}
    # action density: columns are actions for actor sheets
    act_dens={}
    for k in stats:
        c=int(k.split(".")[1])
        act_dens.setdefault(c,[]).append(stats[k]["fill"])
    dens={k:round(sum(v)/len(v),3) for k,v in act_dens.items()}
    # walk loop first/last
    return {
        "file":file,"dims":im.size,"n_cells":len(stats),
        "foot_drift_y":foot_drift,"foot_drift_x":round(fx_drift,1),
        "hw_range":hw_range,"hh_range":hh_range,
        "hue":huef,
        "col_density":dens,
        "sat_avg":round(sum(s["sat"] for s in allc)/len(allc),3),
        "val_avg":round(sum(s["val"] for s in allc)/len(allc),3),
        "min_hw":min(hw),"max_hw":max(hw),"min_hh":min(hh),"max_hh":max(hh),
    }

def main():
    res={}
    # player: 8 cols(actions) x 8 rows(dirs), 64px
    res["player"]=analyze("player-knife.png",8,8,64,None,"player")
    # patrol: 6 cols(actions) x 8 rows(dirs), 64px
    res["patrol"]=analyze("flashlight-patrol.png",6,8,64,None,"patrol")
    print(json.dumps(res,indent=2,ensure_ascii=False))

if __name__=="__main__":
    main()
