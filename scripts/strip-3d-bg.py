#!/usr/bin/env python3
"""Remove solid studio background from 3D event illustrations (WebP).

Uses edge-connected flood fill keyed to median border RGB so interior bright
details stay opaque. Overwrites files in public/brand/3D-ELEMENTS/.

Run: python3 scripts/strip-3d-bg.py
"""
from __future__ import annotations

import math
from collections import deque
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
DIR = ROOT / "public" / "brand" / "3D-ELEMENTS"
FILES = ("DINNER.webp", "WELLNESS.webp", "ADVENTURE.webp")


def median_rgb(px, w: int, h: int) -> tuple[int, int, int]:
    rlst, glst, blst = [], [], []
    for x in range(w):
        for y in (0, h - 1):
            r, g, b, _ = px[x, y]
            rlst.append(r)
            glst.append(g)
            blst.append(b)
    for y in range(h):
        for x in (0, w - 1):
            r, g, b, _ = px[x, y]
            rlst.append(r)
            glst.append(g)
            blst.append(b)

    def med(vals: list[int]) -> int:
        s = sorted(vals)
        return s[len(s) // 2]

    return med(rlst), med(glst), med(blst)


def strip_edge_flood(im: Image.Image, threshold: float) -> Image.Image:
    im = im.convert("RGBA")
    w, h = im.size
    px = im.load()
    mr, mg, mb = median_rgb(px, w, h)

    def near_bg(x: int, y: int) -> bool:
        r, g, b, _ = px[x, y]
        return math.sqrt((r - mr) ** 2 + (g - mg) ** 2 + (b - mb) ** 2) < threshold

    vis = bytearray(w * h)

    def i(x: int, y: int) -> int:
        return y * w + x

    q: deque[tuple[int, int]] = deque()
    for x in range(w):
        for y in (0, h - 1):
            if near_bg(x, y):
                ii = i(x, y)
                if not vis[ii]:
                    vis[ii] = 1
                    q.append((x, y))
    for y in range(h):
        for x in (0, w - 1):
            if near_bg(x, y):
                ii = i(x, y)
                if not vis[ii]:
                    vis[ii] = 1
                    q.append((x, y))

    while q:
        x, y = q.popleft()
        r, g, b, _ = px[x, y]
        px[x, y] = (r, g, b, 0)
        for nx, ny in ((x - 1, y), (x + 1, y), (x, y - 1), (x, y + 1)):
            if nx < 0 or nx >= w or ny < 0 or ny >= h:
                continue
            ii = i(nx, ny)
            if vis[ii]:
                continue
            if near_bg(nx, ny):
                vis[ii] = 1
                q.append((nx, ny))
    return im


def main() -> None:
    if not DIR.is_dir():
        raise SystemExit(f"Missing directory: {DIR}")

    threshold = 38.0
    for name in FILES:
        path = DIR / name
        if not path.is_file():
            raise SystemExit(f"Missing file: {path}")
        out = strip_edge_flood(Image.open(path), threshold)
        out.save(path, "WEBP", quality=92, method=6)
        print(f"Wrote {path}")


if __name__ == "__main__":
    main()
