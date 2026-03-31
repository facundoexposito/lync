#!/usr/bin/env python3
"""Build square favicons from wide ICON_BLUE.png (gray mat, centered)."""
from __future__ import annotations

from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
SRC = ROOT / "public" / "brand" / "ICON_BLUE.png"
# Light gray mat — matches brand QA / tab contrast (~Tailwind gray-200)
MAT = (229, 231, 235, 255)  # #e5e7eb


def square_icon(size: int, out: Path, pad_ratio: float = 0.12) -> None:
    im = Image.open(SRC).convert("RGBA")
    canvas = Image.new("RGBA", (size, size), MAT)
    # Fit entire asset inside square with padding
    pad = int(size * pad_ratio)
    inner = size - 2 * pad
    w, h = im.size
    scale = min(inner / w, inner / h)
    nw, nh = int(w * scale), int(h * scale)
    resized = im.resize((nw, nh), Image.Resampling.LANCZOS)
    x = (size - nw) // 2
    y = (size - nh) // 2
    canvas.paste(resized, (x, y), resized)
    out.parent.mkdir(parents=True, exist_ok=True)
    canvas.save(out, "PNG", optimize=True)


def main() -> None:
    if not SRC.is_file():
        raise SystemExit(f"Missing source: {SRC}")
    square_icon(512, ROOT / "src" / "app" / "icon.png")
    square_icon(180, ROOT / "src" / "app" / "apple-icon.png", pad_ratio=0.14)
    print("Wrote src/app/icon.png, src/app/apple-icon.png")


if __name__ == "__main__":
    main()
