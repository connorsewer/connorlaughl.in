#!/usr/bin/env python3
"""
Subset and convert GT Sectra Fine TTFs to woff2.

Run via: uv run --with fonttools --with brotli scripts/subset-fonts.py
The script reads public/fonts/gt-sectra-fine/*.ttf, subsets to a Latin-plus
unicode range, converts to woff2, writes alongside the source TTFs.
"""
import sys
import pathlib
from fontTools.subset import Subsetter, Options
from fontTools.ttLib import TTFont

ROOT = pathlib.Path(__file__).resolve().parents[1]
SRC = ROOT / "public" / "fonts" / "gt-sectra-fine"

# Unicode coverage:
#   U+0020-007F  Basic Latin
#   U+00A0-00FF  Latin-1 Supplement (À-ÿ for accented characters)
#   U+0100-017F  Latin Extended-A (Ā-ſ, includes Ć / Š etc.)
#   U+2000-206F  General Punctuation (em-dash, en-dash, smart quotes, …)
#   U+2070-209F  Super/subscripts
#   U+20A0-20CF  Currency Symbols ($, €, £, ¥)
#   U+2190-21FF  Arrows (→, ←, ↑, ↓)
#   U+2200-22FF  Math (×, ÷, ±, ≈, ≠, ≤, ≥)
#   U+2500-257F  Box drawing
#   U+25A0-25FF  Geometric shapes (▌▪▴)
UNICODE_RANGES = ",".join([
    "U+0020-007F",
    "U+00A0-00FF",
    "U+0100-017F",
    "U+2000-206F",
    "U+2070-209F",
    "U+20A0-20CF",
    "U+2190-21FF",
    "U+2200-22FF",
    "U+2500-257F",
    "U+25A0-25FF",
])


def subset_one(ttf_path: pathlib.Path) -> pathlib.Path:
    options = Options()
    options.flavor = "woff2"
    options.with_zopfli = False
    options.desubroutinize = True
    options.layout_features = ["kern", "liga", "ss01", "ss02"]
    options.name_IDs = [1, 2, 3, 4, 6, 16, 17]
    options.notdef_outline = True
    options.recalc_bounds = True
    options.drop_tables = ["DSIG", "EBDT", "EBLC", "EBSC", "GSUB"]

    font = TTFont(str(ttf_path))
    subsetter = Subsetter(options=options)
    subsetter.populate(unicodes=parse_unicodes(UNICODE_RANGES))
    subsetter.subset(font)

    woff2_path = ttf_path.with_suffix(".woff2")
    font.flavor = "woff2"
    font.save(str(woff2_path))
    return woff2_path


def parse_unicodes(spec: str) -> list[int]:
    out: list[int] = []
    for chunk in spec.split(","):
        chunk = chunk.strip().removeprefix("U+")
        if "-" in chunk:
            start, end = chunk.split("-")
            out.extend(range(int(start, 16), int(end, 16) + 1))
        elif chunk:
            out.append(int(chunk, 16))
    return out


def main() -> int:
    if not SRC.exists():
        print(f"!! source dir not found: {SRC}", file=sys.stderr)
        return 1
    ttfs = sorted(SRC.glob("*.ttf"))
    if not ttfs:
        print(f"!! no TTFs under {SRC}", file=sys.stderr)
        return 1
    total_before = 0
    total_after = 0
    for ttf in ttfs:
        before = ttf.stat().st_size
        out = subset_one(ttf)
        after = out.stat().st_size
        total_before += before
        total_after += after
        print(f"  {ttf.name:>34}  {before:>7} B  ->  {after:>7} B  ({100*after/before:5.1f} %)")
    print(f"\n  total: {total_before} B  ->  {total_after} B  ({100*total_after/total_before:.1f} %)")
    return 0


if __name__ == "__main__":
    sys.exit(main())
