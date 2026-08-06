#!/usr/bin/env python3
"""Distance from each label's arrow tip to the nearest ink pixel, in rendered px.

The plate renders at 416px wide, so distances are reported in that space: the
number a reader actually sees. A tip more than ~6px from ink points at paper.
"""
import sys, json
import numpy as np
from PIL import Image

RENDER_W = 416.0

def check(path, labels):
    im = Image.open(path).convert("L")
    a = np.asarray(im).astype(float)
    h, w = a.shape
    ink = a < (a.max() + a.min()) / 2
    ys, xs = np.nonzero(ink)
    scale = RENDER_W / w
    print(f"== {path}")
    for lb in labels:
        tx = (lb["x"] + lb["dx"]) / 100.0 * w
        ty = (lb["y"] + lb["dy"]) / 100.0 * h
        d = np.hypot(xs - tx, ys - ty).min() * scale
        flag = "OK  " if d <= 6 else "MISS"
        print(f"   {flag} {lb['text']:<14} tip=({lb['x']+lb['dx']:.0f}%,{lb['y']+lb['dy']:.0f}%)"
              f"  {d:6.1f}px to nearest ink")

if __name__ == "__main__":
    check(sys.argv[1], json.loads(sys.argv[2]))
