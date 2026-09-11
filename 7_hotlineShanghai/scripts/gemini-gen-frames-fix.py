#!/usr/bin/env python3
"""Regenerate the BROKEN frames (walk cycle + N-back attack) with STRONG pose
descriptions. Reuses per-direction strong references; only writes frames that are
known-bad (resolution-agnostic: we pass action + direction), preserving the good
attack frames from the first pass. Outputs over the same _gemini/player/<d>_<a>.png
names. Usage: python3 scripts/gemini-gen-frames-fix.py player [dirs...]
"""
import json, urllib.request, urllib.error, yaml, base64, sys, io, time
from pathlib import Path
from PIL import Image

CFG = "C:/Users/XINDONG/AppData/Local/hermes/config.yaml"
ROOT = Path(r"F:/XD/git-repo/VibeGames/7_hotlineShanghai")
GEM = ROOT / "_gemini"
PLAYER = GEM / "player"
DIRS8 = ["N","NE","E","SE","S","SW","W","NW"]
STRONG_REF = {d: GEM / f"strong_{d}.png" for d in DIRS8}

# STRONG pose descriptions (per game-asset-art-direction skill).
WALK_POSES = {
  "walk1": "mid-stride: LEFT leg planted forward, RIGHT leg trailing back, hips rotated slightly left, torso counter-twist, arms in opposite swing (left arm back, right arm forward), weight on left foot",
  "walk2": "passing pose: legs together at the hip line, body upright, feet directly under center, arms neutral at the sides, weight centered",
  "walk3": "mid-stride: RIGHT leg planted forward, LEFT leg trailing back, hips rotated slightly right, torso counter-twist, arms in opposite swing (right arm back, left arm forward), weight on right foot",
  "walk4": "passing pose mirror: legs converging, body upright, arms neutral, knees slightly bent, weight centered",
}
ATTACK_POSES = {
  "attack0": "knife ATTACK WINDUP: knife hand pulled back behind the shoulder, elbow bent, shoulder coiled back, torso twisted away from target, blade held vertical, notable anticipation pose",
  "attack1": "knife ATTACK STRIKE: knife arm fully extended straight forward at shoulder height, blade pointing at target, torso rotated into the lunge, full body committed forward — FULL-DENSITY, same character size and pixel weight as idle",
  "attack2": "knife ATTACK RECOVER: knife arm retracting back to the hip, torso straightening back to neutral, weight settling, transition back toward idle stance",
}
FACE = {
  "N":"back of head toward the TOP, face hidden, looking away upward",
  "NE":"back angled toward TOP-RIGHT, face hidden, looking up-right",
  "E":"full side profile facing the RIGHT, nose/brim point right",
  "SE":"three-quarter front-right, face angled toward BOTTOM-RIGHT",
  "S":"front facing the camera, face visible, looking down toward viewer",
  "SW":"three-quarter front-left, face angled toward BOTTOM-LEFT",
  "W":"full side profile facing the LEFT, nose/brim point left",
  "NW":"back angled toward TOP-LEFT, face hidden, looking up-left",
}

def load_cred():
    cfg = yaml.safe_load(open(CFG, encoding="utf-8"))
    prov = next(p for p in cfg.get("custom_providers", []) if "tapsvc" in p.get("base_url", ""))
    return prov["base_url"], prov["api_key"]

def gen(prompt, ref_path, model="gemini-3-pro-image"):
    base, key = load_cred()
    ref = base64.b64encode(ref_path.read_bytes()).decode()
    body = {"model": model, "messages": [{"role": "user", "content": [
        {"type": "text", "text": prompt},
        {"type": "image_url", "image_url": {"url": "data:image/png;base64," + ref}}]}],
        "generationConfig": {"responseModalities": ["TEXT", "IMAGE"], "temperature": 0.25}}
    req = urllib.request.Request(base.rstrip("/") + "/chat/completions", data=json.dumps(body).encode(),
        headers={"Authorization": "Bearer " + key, "Content-Type": "application/json"})
    with urllib.request.urlopen(req, timeout=200) as r:
        return json.loads(r.read().decode())

def extract_png(resp):
    msg = resp.get("choices", [{}])[0].get("message", {})
    for im in msg.get("images", []):
        url = im.get("image_url", {}).get("url") if isinstance(im, dict) else None
        if url and url.startswith("data:image/png;base64,"):
            return base64.b64decode(url.split(",", 1)[1])
    return None

def prompt(d, act):
    poses = WALK_POSES if act.startswith("walk") else ATTACK_POSES
    pose = poses[act]
    return (f"Use this character as the exact subject reference (same costume, proportions, palette, "
            f"outline, same character). Generate ONE single top-down pixel-art frame of the SAME "
            f"character, {FACE[d]}. The pose is EXACTLY: {pose}. Same facing as the reference, same foot "
            f"anchor. Single 64x64 sprite centered. Background is a clean ISOLATED light-grey checkerboard "
            f"ONLY behind the character (two flat tones, no gradient, no vignette, no scene). Character is "
            f"a solid sharp pixel-art figure, hard pixel edges, no labels, no other characters.")

def main():
    agent = sys.argv[1] if len(sys.argv) > 1 else "player"
    dirs = sys.argv[2:] if len(sys.argv) > 2 else DIRS8
    targets = {}
    for d in dirs:
        for act in list(WALK_POSES) + list(ATTACK_POSES):
            # only regen walk (all dirs) + attack (only for the N-back dir where it broke)
            if act.startswith("walk"):
                targets[(d, act)] = True
            elif d == "N":  # N-back attack broke (attack1 reversed); regen all N attacks
                targets[(d, act)] = True
    print(f"regenning {len(targets)} frames")
    for (d, act) in sorted(targets):
        out = PLAYER / f"{d}_{act}.png"
        try:
            raw = extract_png(gen(prompt(d, act), STRONG_REF[d]))
        except Exception as e:
            print(f"[{d}/{act}] ERR {str(e)[:70]}"); continue
        if raw is None:
            print(f"[{d}/{act}] NO IMAGE"); continue
        Image.open(io.BytesIO(raw)).convert("RGBA").save(out)
        print(f"[{d}/{act}] saved")
        time.sleep(0.4)

if __name__ == "__main__":
    main()
