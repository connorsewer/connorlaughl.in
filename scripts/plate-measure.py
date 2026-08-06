#!/usr/bin/env python3
"""Objective plate gate. Reports the numbers the judge measured, not impressions."""
import sys
import numpy as np
from PIL import Image


def srgb_to_lab(rgb):
    """rgb: (...,3) float 0-255 -> Lab (D65)."""
    c = rgb / 255.0
    c = np.where(c <= 0.04045, c / 12.92, ((c + 0.055) / 1.055) ** 2.4)
    m = np.array([[0.4124, 0.3576, 0.1805],
                  [0.2126, 0.7152, 0.0722],
                  [0.0193, 0.1192, 0.9505]])
    xyz = c @ m.T
    white = np.array([0.95047, 1.0, 1.08883])
    t = xyz / white
    t = np.where(t > 0.008856, np.cbrt(t), 7.787 * t + 16 / 116)
    L = 116 * t[..., 1] - 16
    a = 500 * (t[..., 0] - t[..., 1])
    b = 200 * (t[..., 1] - t[..., 2])
    return np.stack([L, a, b], axis=-1)


def report(path):
    im = Image.open(path).convert("RGB")
    arr = np.asarray(im).astype(float)
    h, w = arr.shape[:2]
    lab = srgb_to_lab(arr)
    L = lab[..., 0]

    # --- ink: darkest 2% by lightness ---
    thresh = np.percentile(L, 2)
    ink_core = L <= thresh
    ink_rgb = arr[ink_core].mean(axis=0)
    ink_lab = srgb_to_lab(ink_rgb)
    ink_chroma = float(np.hypot(ink_lab[1], ink_lab[2]))
    ink_hue = float(np.degrees(np.arctan2(ink_lab[2], ink_lab[1])) % 360)

    # --- ink mask for coverage / stroke / bbox: midpoint split ---
    ink = L < (L.max() + L.min()) / 2
    coverage = 100.0 * ink.mean()

    ys, xs = np.nonzero(ink)
    bbox_w = (xs.max() - xs.min() + 1) / w * 100 if len(xs) else 0.0
    bbox_h = (ys.max() - ys.min() + 1) / h * 100 if len(ys) else 0.0
    # margins, to check centering
    ml, mr = xs.min() / w * 100, (w - 1 - xs.max()) / w * 100
    mt, mb = ys.min() / h * 100, (h - 1 - ys.max()) / h * 100

    # --- stroke weight: horizontal run lengths of ink ---
    runs = []
    for y in range(0, h, 3):
        row = ink[y]
        if not row.any():
            continue
        d = np.diff(row.astype(np.int8))
        starts = np.nonzero(d == 1)[0]
        ends = np.nonzero(d == -1)[0]
        if len(starts) and len(ends):
            n = min(len(starts), len(ends))
            r = ends[:n] - starts[:n]
            runs.extend(r[(r > 0) & (r < 40)])
    stroke = float(np.median(runs)) if runs else 0.0

    # --- ground: brightest 25%, tiled flatness ---
    gthresh = np.percentile(L, 75)
    ground = L >= gthresh
    paper = ~ink  # all non-ink pixels, including any falloff the bright quartile hides
    ground_rgb = arr[ground].mean(axis=0)
    TIL = 8
    tile_means = []
    for i in range(TIL):
        for j in range(TIL):
            sl = (slice(i * h // TIL, (i + 1) * h // TIL),
                  slice(j * w // TIL, (j + 1) * w // TIL))
            m = paper[sl]
            if m.sum() > 50:
                tile_means.append(L[sl][m].mean())
    tile_means = np.array(tile_means)
    flatness = float((tile_means.max() - tile_means.min()) / tile_means.max() * 100)
    # warmth: how far the ground is from neutral
    g_lab = srgb_to_lab(ground_rgb)
    ground_chroma = float(np.hypot(g_lab[1], g_lab[2]))

    print(f"== {path}  ({w}x{h})")
    print(f"   ink rgb        {tuple(int(round(v)) for v in ink_rgb)}   "
          f"chroma {ink_chroma:6.1f}  hue {ink_hue:5.1f}deg")
    print(f"   ground rgb     {tuple(int(round(v)) for v in ground_rgb)}   "
          f"chroma {ground_chroma:5.1f} (neutral<6)")
    # directional corner falloff: mean ground L of the four corner blocks
    ch_, cw_ = h // 4, w // 4
    corners = {}
    for name, sl in {
        "TL": (slice(0, ch_), slice(0, cw_)),
        "TR": (slice(0, ch_), slice(w - cw_, w)),
        "BL": (slice(h - ch_, h), slice(0, cw_)),
        "BR": (slice(h - ch_, h), slice(w - cw_, w)),
    }.items():
        m = paper[sl]
        corners[name] = L[sl][m].mean() if m.sum() > 50 else float("nan")
    cv = np.array(list(corners.values()))
    falloff = float((np.nanmax(cv) - np.nanmin(cv)) / np.nanmax(cv) * 100)
    print(f"   ground flatness {flatness:5.1f}%  variation across 8x8 tiles (gate <10)")
    print(f"   corner falloff  {falloff:5.1f}%  " +
          "  ".join(f"{k}{v:.0f}" for k, v in corners.items()) + "  (gate <10)")
    print(f"   ink coverage   {coverage:5.2f}%")
    print(f"   stroke median  {stroke:5.1f}px")
    print(f"   object bbox    {bbox_w:5.1f}% w  x {bbox_h:5.1f}% h   "
          f"margins L{ml:.0f} R{mr:.0f} T{mt:.0f} B{mb:.0f}")


# reference: the site's own ink
ref = srgb_to_lab(np.array([0x2E, 0x47, 0xF1], dtype=float))
print(f"reference ink #2E47F1 -> chroma {np.hypot(ref[1], ref[2]):.1f} "
      f"hue {np.degrees(np.arctan2(ref[2], ref[1])) % 360:.1f}deg\n")
for p in sys.argv[1:]:
    report(p)
