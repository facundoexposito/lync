#!/usr/bin/env python3
"""Build sharp app icons from public/brand/ICON_BLUE.png.

- icon.png: square, transparent mat (crisp in browser tabs — no gray fog)
- apple-icon.png: square, white mat (iOS / home screen)

Run: python3 scripts/build-favicon.py
"""
from __future__ import annotations

from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
SRC = ROOT / "public" / "brand" / "ICON_BLUE.png"
TRANSPARENT = (0, 0, 0, 0)
APPLE_MAT = (255, 255, 255, 255)


def crop_to_opaque(im: Image.Image) -> Image.Image:
    """Drop excess transparent margin so scaling and centering use real ink bounds."""
    bbox = im.getchannel("A").getbbox()
    return im if bbox is None else im.crop(bbox)


def square_icon(size: int, out: Path, mat: tuple[int, int, int, int], pad_ratio: float = 0.12) -> None:
    im = crop_to_opaque(Image.open(SRC).convert("RGBA"))
    canvas = Image.new("RGBA", (size, size), mat)
    pad = int(size * pad_ratio)
    inner = size - 2 * pad
    w, h = im.size
    scale = min(inner / w, inner / h)
    nw, nh = max(1, int(round(w * scale))), max(1, int(round(h * scale)))
    resized = im.resize((nw, nh), Image.Resampling.LANCZOS)
    x = (size - nw) // 2
    y = (size - nh) // 2
    canvas.paste(resized, (x, y), resized)
    out.parent.mkdir(parents=True, exist_ok=True)
    canvas.save(out, "PNG", optimize=True)


def main() -> None:
    if not SRC.is_file():
        raise SystemExit(f"Missing source: {SRC}")
    # 128px: browsers pick a sharp multiple for 16/32px tabs
    square_icon(128, ROOT / "src" / "app" / "icon.png", TRANSPARENT, pad_ratio=0.03)
    square_icon(180, ROOT / "src" / "app" / "apple-icon.png", APPLE_MAT, pad_ratio=0.03)
    print("Wrote src/app/icon.png (transparent), src/app/apple-icon.png (white mat)")


if __name__ == "__main__":
    main()
