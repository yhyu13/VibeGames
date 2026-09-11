#!/usr/bin/env python3
"""Append the three verified §7 prop assets (exit/sandbag/neon_sign) to
references/sprite-samples/approved-intro-assets.json, preserving the existing 9
approved assets exactly. Uses the pipeline-validated layout/sha256. Idempotent:
replaces any prior exit/sandbag/neon_sign entries, keeps everything else.
"""
import json, hashlib
from pathlib import Path

ROOT = Path(r"F:/XD/git-repo/VibeGames/7_hotlineShanghai")
APR = ROOT / "references" / "sprite-samples" / "approved-intro-assets.json"
SRC = ROOT / "references" / "sprite-samples"

def sha(name):
    return hashlib.sha256((SRC / name).read_bytes()).hexdigest()

# validated layout: content bbox from make-sprite-alpha, single tile centered
PROPS = [
  { "id": "exit", "source": "exit-doorway-tile-alpha.png", "role": "tile",
    "layout": { "xBands": [[224,800],[224,800],[224,800]], "yBands": [[224,694]] },
    "output": { "file": "exit.png", "columns": 1, "rows": 1, "cell": 64 }, "required": True },
  { "id": "sandbag", "source": "sandbag-tile-alpha.png", "role": "tile",
    "layout": { "xBands": [[171,854],[171,854],[171,854]], "yBands": [[333,636]] },
    "output": { "file": "sandbag.png", "columns": 1, "rows": 1, "cell": 64 }, "required": True },
  { "id": "neon_sign", "source": "neon-sign-tile-alpha.png", "role": "tile",
    "layout": { "xBands": [[244,669],[244,669],[244,669]], "yBands": [[74,917]] },
    "output": { "file": "neon-sign.png", "columns": 1, "rows": 1, "cell": 64 }, "required": False },
]
for p in PROPS:
    p["sha256"] = sha(p["source"])

data = json.loads(APR.read_text(encoding="utf-8"))
# drop any existing entries with these ids (idempotent)
new_ids = {p["id"] for p in PROPS}
data["assets"] = [a for a in data["assets"] if a["id"] not in new_ids] + PROPS
JSON = json.dumps(data, indent=2, ensure_ascii=False)
APR.write_text(JSON, encoding="utf-8")
print("appended", [p["id"] for p in PROPS])
print("total assets:", len(data["assets"]))
for p in PROPS:
    print(f'  {p["id"]}: sha256={p["sha256"][:16]}… source={p["source"]}')
