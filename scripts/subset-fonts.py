#!/usr/bin/env python3
"""
Subset TTFs to woff2 for self-hosting.

Run via: uv run --with fonttools --with brotli scripts/subset-fonts.py [SRC] [options]

  SRC            source directory of *.ttf (default: public/fonts/gt-sectra-fine)
  --out DIR      write woff2 here (default: alongside the source TTFs)
  --keep-gsub    keep the GSUB table (ligatures). Off by default so the
                 GT Sectra output stays byte-identical to what ships today.

Newsreader (body serif) pipeline, for reproduction. The source variable TTFs
are Google Fonts originals (OFL, license copy at public/fonts/newsreader/OFL.txt)
and are NOT kept in the repo; re-fetch them into a scratch dir when needed:

  curl -sL -o Newsreader.ttf \\
    'https://raw.githubusercontent.com/google/fonts/main/ofl/newsreader/Newsreader%5Bopsz%2Cwght%5D.ttf'
  curl -sL -o Newsreader-Italic.ttf \\
    'https://raw.githubusercontent.com/google/fonts/main/ofl/newsreader/Newsreader-Italic%5Bopsz%2Cwght%5D.ttf'

  # pin static instances (opsz 18 = the family default, tuned for body sizes)
  fonttools varLib.instancer Newsreader.ttf        wght=400 opsz=18 -o static/Newsreader-Regular.ttf
  fonttools varLib.instancer Newsreader.ttf        wght=500 opsz=18 -o static/Newsreader-Medium.ttf
  fonttools varLib.instancer Newsreader.ttf        wght=600 opsz=18 -o static/Newsreader-SemiBold.ttf
  fonttools varLib.instancer Newsreader-Italic.ttf wght=400 opsz=18 -o static/Newsreader-Italic.ttf

  # subset + convert into the served directory
  uv run --with fonttools --with brotli scripts/subset-fonts.py static \\
    --out public/fonts/newsreader --keep-gsub
"""
import argparse
import sys
import pathlib
from fontTools.subset import Subsetter, Options
from fontTools.ttLib import TTFont

ROOT = pathlib.Path(__file__).resolve().parents[1]
DEFAULT_SRC = ROOT / "public" / "fonts" / "gt-sectra-fine"

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


def subset_one(
    ttf_path: pathlib.Path,
    out_dir: pathlib.Path | None = None,
    keep_gsub: bool = False,
) -> pathlib.Path:
    drop = ["DSIG", "EBDT", "EBLC", "EBSC"]
    if not keep_gsub:
        drop.append("GSUB")

    options = Options()
    options.flavor = "woff2"
    options.with_zopfli = False
    options.desubroutinize = True
    options.layout_features = ["kern", "liga", "ss01", "ss02"]
    options.name_IDs = [1, 2, 3, 4, 6, 16, 17]
    options.notdef_outline = True
    options.recalc_bounds = True
    options.drop_tables = drop

    font = TTFont(str(ttf_path))
    subsetter = Subsetter(options=options)
    subsetter.populate(unicodes=parse_unicodes(UNICODE_RANGES))
    subsetter.subset(font)

    target_dir = out_dir or ttf_path.parent
    target_dir.mkdir(parents=True, exist_ok=True)
    woff2_path = target_dir / (ttf_path.stem + ".woff2")
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
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("src", nargs="?", default=str(DEFAULT_SRC),
                        help="directory of source *.ttf files")
    parser.add_argument("--out", default=None,
                        help="output directory (default: alongside the sources)")
    parser.add_argument("--keep-gsub", action="store_true",
                        help="keep GSUB (ligatures and stylistic sets)")
    args = parser.parse_args()

    src = pathlib.Path(args.src)
    if not src.is_absolute():
        src = (ROOT / src).resolve()
    out_dir = None
    if args.out:
        out_dir = pathlib.Path(args.out)
        if not out_dir.is_absolute():
            out_dir = (ROOT / out_dir).resolve()

    if not src.exists():
        print(f"!! source dir not found: {src}", file=sys.stderr)
        return 1
    ttfs = sorted(src.glob("*.ttf"))
    if not ttfs:
        print(f"!! no TTFs under {src}", file=sys.stderr)
        return 1
    total_before = 0
    total_after = 0
    for ttf in ttfs:
        before = ttf.stat().st_size
        out = subset_one(ttf, out_dir=out_dir, keep_gsub=args.keep_gsub)
        after = out.stat().st_size
        total_before += before
        total_after += after
        print(f"  {ttf.name:>34}  {before:>7} B  ->  {after:>7} B  ({100*after/before:5.1f} %)")
    print(f"\n  total: {total_before} B  ->  {total_after} B  ({100*total_after/total_before:.1f} %)")
    return 0


if __name__ == "__main__":
    sys.exit(main())
