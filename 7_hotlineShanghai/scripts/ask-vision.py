#!/usr/bin/env python3
"""Ask the tapsvc gemini-3.1-flash-image multimodal model to describe / QA a
local image via a base64 data URI. Usage: python3 scripts/ask-vision.py <png> "<question>"
"""
import json, urllib.request, urllib.error, yaml, base64, sys
from pathlib import Path

CFG = "C:/Users/XINDONG/AppData/Local/hermes/config.yaml"
def load_cred():
    cfg = yaml.safe_load(open(CFG, encoding="utf-8"))
    prov = next(p for p in cfg.get("custom_providers", []) if "tapsvc" in p.get("base_url", ""))
    return prov["base_url"], prov["api_key"]

def main():
    img_path, question = sys.argv[1], sys.argv[2]
    raw = Path(img_path).read_bytes()
    b64 = base64.b64encode(raw).decode()
    datauri = "data:image/png;base64," + b64
    base, key = load_cred()
    model = sys.argv[3] if len(sys.argv) > 3 else "gemini-3.1-flash-image"
    body = {"model": model, "messages": [{"role": "user", "content": [
        {"type": "text", "text": question},
        {"type": "image_url", "image_url": {"url": datauri}},
    ]}],
    "temperature": 0.2,
    }
    req = urllib.request.Request(base.rstrip("/") + "/chat/completions",
        data=json.dumps(body).encode(),
        headers={"Authorization": "Bearer " + key, "Content-Type": "application/json"})
    try:
        with urllib.request.urlopen(req, timeout=180) as r:
            d = json.loads(r.read().decode())
    except urllib.error.HTTPError as e:
        print("HTTP", e.code, e.read().decode()[:400]); return
    except Exception as e:
        print("ERR", e); return
    msg = d["choices"][0]["message"]["content"]
    if isinstance(msg, list):
        msg = " ".join(x.get("text", "") for x in msg if isinstance(x, dict))
    print(msg)

if __name__ == "__main__":
    main()
