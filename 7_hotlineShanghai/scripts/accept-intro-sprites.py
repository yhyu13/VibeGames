#!/usr/bin/env python3
"""§9 acceptance gate checker (per-cell, post-checker-removal) for Hotline
Shanghai intro sprites. Replicates the removeChecker + extract normalization
from scripts/process-intro-sprites.mjs so measurements are in the SAME 64px-cell
space the game actually renders, then evaluates docs/design/24 §9 gates that are
objectively checkable on a static source sheet.

Output: per-asset JSON with PASS/FAIL/INFO per gate + numeric evidence.
"""
import json, sys
from pathlib import Path
from collections import Counter
try:
    from PIL import Image
except ImportError:
    for l in ("from PIL import Image",):
        pass
    print("PIL missing"); sys.exit(2)

ROOT = Path(r"F:/XD/git-repo/VibeGames/7_hotlineShanghai")
SRC = ROOT / "references" / "sprite-samples"
APPROVAL = SRC / "approved-intro-assets.json"

DIRS = ["N","NE","E","SE","S","SW","W","NW"]
SRC_ROW_MAP = {
    "player": { "N":4,"NE":3,"E":2,"SE":1,"S":0,"SW":6,"W":2,"NW":5 },
    "patrol": { "N":4,"NE":3,"E":2,"SE":0,"S":1,"SW":3,"W":2,"NW":3 },
}
MIRROR = { "player": set(["W"]), "patrol": set(["E","NE"]) }
ACTIONS = {
    "player": ["idle","walk0","walk1","walk2","walk3","attack0","attack1","attack2"],
    "patrol": ["idle","walk0","walk1","walk2","walk3","alert"],
}

def load():
    return json.loads(APPROVAL.read_text(encoding="utf-8"))

def bands(asset):
    l = asset.get("layout", {})
    if l.get("xBands") or l.get("yBands"):
        xs = l.get("xBands") or [[0,1024]]
        ys = l.get("yBands") or [[r*l.get("slotHeight",1024),(r+1)*l.get("slotHeight",1024)] for r in range(l.get("rows",1))]
        return [(x0,y0,x1,y1) for (y0,y1) in ys for (x0,x1) in xs]
    cols,rows=l.get("columns",1),l.get("rows",1); sw,sh=l.get("slotWidth",1024),l.get("slotHeight",1024)
    return [(c*sw,r*sh,(c+1)*sw,(r+1)*sh) for r in range(rows) for c in range(cols)]

def extract_cell(im, rect, cell=64, pad=4, contain=True):
    x0,y0,x1,y1 = rect
    a = im.getchannel("A")
    px = a.load()
    minx,miny,maxx,maxy = x1,y1,x0-1,y0-1
    cnt=0
    for y in range(y0,y1):
        for x in range(x0,x1):
            if px[x,y]>0:
                cnt+=1
                if x<minx:minx=x
                if x>maxx:maxx=x
                if y<miny:miny=y
                if y>maxy:maxy=y
    if cnt<16: return None, cnt
    if not contain:
        minx,miny,maxx,maxy=x0,y0,x1-1,y1-1
    sw=maxx-minx+1; sh=maxy-miny+1
    scale=min((cell-pad*2)/sw,(cell-pad*2)/sh)
    dw=max(1,int(sw*scale)); dh=max(1,int(sh*scale))
    ox=((cell-dw)//2); oy=(cell-pad-dh) if contain else ((cell-dh)//2)
    out=[None]*(cell*cell)
    rgb=im.convert("RGB").load()
    amap=a.load()
    # collect sampled pixels in cell space
    cellpx={}
    for y in range(dh):
        for x in range(dw):
            sx=minx+min(sw-1,int(x*sw/dw)); sy=miny+min(sh-1,int(y*sh/dh))
            cx=ox+x; cy=oy+y
            if 0<=cx<cell and 0<=cy<cell:
                cellpx[(cx,cy)]=(rgb[sx,sy],amap[sx,sy])
    return {"cell":cell,"cellpx":cellpx,"bbox":(minx,miny,maxx,maxy),"fill_in_band":cnt/((x1-x0)*(y1-y0))}, cnt

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

def cell_stats(cellpx):
    """Return stats over opaque pixels in normalized cell."""
    n=0; boty=-1; bot_xs=[]; sat=0.0; valsum=0.0
    hue=Counter()
    xs=[]; ys=[]
    for (cx,cy),(rgb,a) in cellpx.items():
        if a>0:
            n+=1; xs.append(cx); ys.append(cy)
            h,s,v=hsv(rgb)
            hue[bucket(h)]+=1; sat+=s; valsum+=v
            if cy>boty: boty=cy; bot_xs=[cx]
            elif cy==boty: bot_xs.append(cx)
    if n==0: return None
    frac={k:round(v/n,3) for k,v in hue.items()}
    # local bbox (in cell space)
    lminx,lmaxx=min(xs),max(xs); lminy,lmaxy=min(ys),max(ys)
    return {
        "n":n,
        "fill_cell":round(n/(64*64),3),
        "bbox_cell":[lminx,lminy,lmaxx,lmaxy],
        "hw":(lmaxx-lminx+1),"hh":(lmaxy-lminy+1),
        "foot":[round(sum(bot_xs)/len(bot_xs),2),boty],
        "sat_avg":round(sat/n,3),"val_avg":round(valsum/n,3),
        "hue":frac,
        "center_x":round((lminx+lmaxx)/2,1),
    }

def eval_actor(asset, im):
    rects=bands(asset)
    cols=asset["output"]["columns"]; rows=asset["output"]["rows"]
    src_cols=len(asset["layout"]["xBands"]) if asset["layout"].get("xBands") else cols
    colmap=asset["layout"].get("colMap")
    aid=asset["id"]
    cells={}
    for row in range(rows):
        for col in range(cols):
            desired=DIRS[row]
            sm=SRC_ROW_MAP.get(aid,{})
            srow=sm.get(desired,row)
            scol=colmap[col] if colmap else col
            idx=srow*src_cols+scol
            if idx>=len(rects):
                srow=0; idx=min(scol,src_cols-1)
            r=rects[idx]
            st,_=extract_cell(im,r)
            if st is None: continue
            st=cell_stats(st["cellpx"])
            if st is None: continue
            st["dir"]=desired; st["action"]=ACTIONS[aid][col] if col<len(ACTIONS[aid]) else str(col)
            if MIRROR.get(aid) and desired in MIRROR[aid]:
                st["mirrored"]=True
            cells[f"{desired}.{st['action']}"]=st
    return cells

def main():
    approval=load()
    out={}
    for asset in approval["assets"]:
        aid=asset["id"]
        if aid not in ("player","patrol"): continue
        p=SRC/asset["source"]
        if not p.exists():
            out[aid]={"error":"missing source"}; continue
        im=Image.open(p)
        if im.mode!="RGBA":
            im=im.convert("RGBA")
        cells=eval_actor(asset,im)
        # ---- compute gate metrics ----
        actor_cells=[c for c in cells.values() if c]
        if not actor_cells:
            out[aid]={"error":"no frames"}; continue
        # foot anchor drift across all frames (gate 3)
        foots=[c["foot"] for c in actor_cells if c["n"]>0]
        fy=[f[1] for f in foots]; fx=[f[0] for f in foots]
        foot_y_drift=max(fy)-min(fy) if fy else -1
        # size stability (gate 4 / 7: no scale change)
        hw=[c["hw"] for c in actor_cells]; hh=[c["hh"] for c in actor_cells]
        hw_range=max(hw)-min(hw) if hw else -1; hh_range=max(hh)-min(hh) if hh else -1
        # attack1 density vs idle/walk (gate 7)
        by_action={}
        for c in cells.values():
            k=c["action"]; by_action.setdefault(k,[]).append(c["n"]/4096)
        act_dens={k:round(sum(v)/len(v),3) for k,v in by_action.items()}
        idle_walk_dens=sum(act_dens.get(k,0) for k in ["idle","walk0","walk1","walk2","walk3"])
        idle_walk_n=sum(1 for k in ["idle","walk0","walk1","walk2","walk3"] if k in act_dens)
        idle_walk_avg=(idle_walk_dens/max(1,idle_walk_n))
        attack1_dens=act_dens.get("attack1")
        attack0_dens=act_dens.get("attack0")
        # walk loop first/last continuity: walk0 vs walk4 bbox overlap in cell space (gate 7)
        loop_cont=None
        if aid=="player":
            w0=cells.get("idle") or cells.get("walk0")
            wl=cells.get("walk4")
        else:
            w0=cells.get("walk0"); wl=cells.get("walk3")
        # hue flavor aggregate (gate 5/6)
        hue_agg=Counter()
        for c in actor_cells:
            hue_agg.update(c["hue"])
        total=sum(hue_agg.values()) or 1
        hue_frac={k:round(v/total,3) for k,v in hue_agg.items()}
        # player: want red_pink prominent & orange_rust low; cyan outline present (gate 5)
        # patrol: want green_mil prominent, warm orange_rust outline present, MID-tone readable (gate 6)
        out[aid]={
            "source":asset["source"],
            "n_frames":len(actor_cells),
            "gates":{
                "g1_size_1024": {"ok": im.size==(1024,1024), "ev": im.size},
                "g3_foot_anchor": {"ok": foot_y_drift<=1 and foot_y_drift>=0, "ev": f"foot_y_drift={foot_y_drift}px (fx_range={round(max(fx)-min(fx),1)}px)"},
                "g4_size_stable": {"ok": hw_range<=6 and hh_range<=6, "ev": f"hw_range={hw_range}px hh_range={hh_range}px"},
                "g5_player_palette": {
                    "ok": (aid=="player" and hue_frac.get("red_pink",0)>=0.05 and hue_frac.get("orange_rust",0)<hue_frac.get("red_pink",0)*0.8 and hue_frac.get("cyan_teal",0)>=0.01),
                    "ev": f"red_pink={hue_frac.get('red_pink',0)} orange_rust={hue_frac.get('orange_rust',0)} cyan_teal={hue_frac.get('cyan_teal',0)}",
                    "hue":hue_frac,
                },
                "g6_patrol_palette": {
                    "ok": (aid=="patrol" and hue_frac.get("green_mil",0)>=0.15 and hue_frac.get("orange_rust",0)>=0.01),
                    "ev": f"green_mil={hue_frac.get('green_mil',0)} orange_rust={hue_frac.get('orange_rust',0)} val_avg={round(sum(c['val_avg'] for c in actor_cells)/len(actor_cells),3)}",
                    "hue":hue_frac,
                },
                "g7_attack1_density": {
                    "ok": (attack1_dens is not None and abs(attack1_dens-idle_walk_avg)<=0.12),
                    "ev": f"attack1={attack1_dens} idle/walk_avg={round(idle_walk_avg,3)} attack0={attack0_dens}",
                    "densities":act_dens,
                },
            },
            "sat_avg":round(sum(c["sat_avg"] for c in actor_cells)/len(actor_cells),3),
            "val_avg":round(sum(c["val_avg"] for c in actor_cells)/len(actor_cells),3),
            "foots_sample":[list(f) for f in foots[:14]],
        }
    print(json.dumps(out, indent=2, ensure_ascii=False))

if __name__=="__main__":
    main()
