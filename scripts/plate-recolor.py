#!/usr/bin/env python3
"""Deterministic two-ink remap. Spec'd pipeline step, not generative retouching.

Every pixel's darkness is measured against the plate's own black and white
points, then that single scalar is re-rendered between the site's paper and the
site's ink. It is a fixed function of the input: same file in, same file out,
no model, no hand-painting, no content change. Line structure and antialiasing
survive because the scalar is preserved; only the two endpoints move.

    t     = (Lmax - L) / (Lmax - Lmin)        # 0 at paper, 1 at darkest ink
    out   = PAPER * (1 - t) + INK * t

Flattening the ground is a consequence, not a separate operation: every paper
pixel lands on PAPER by construction.
"""
import sys
import numpy as np
from PIL import Image

INK = np.array([0x2E, 0x47, 0xF1], dtype=float)
PAPER = np.array([0xFB, 0xFB, 0xFB], dtype=float)


def recolor(src, dst):
    im = Image.open(src).convert("RGB")
    a = np.asarray(im).astype(float)
    # perceptual luminance
    L = a @ np.array([0.2126, 0.7152, 0.0722])
    lo, hi = np.percentile(L, 0.5), np.percentile(L, 99.5)
    t = np.clip((hi - L) / (hi - lo), 0.0, 1.0)[..., None]
    out = PAPER * (1 - t) + INK * t
    Image.fromarray(np.round(out).astype(np.uint8)).save(dst)
    print(f"recolored {src} -> {dst}  (black point L={lo:.1f}, white point L={hi:.1f})")


if __name__ == "__main__":
    recolor(sys.argv[1], sys.argv[2])
