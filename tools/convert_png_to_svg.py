#!/usr/bin/env python3
"""
Convert all img/*.png (white bg, black art) to img/*.svg
Result: transparent bg, #4dff91 phosphor-green art, 310x310, base64 PNG in SVG wrapper.

Usage:
    python tools/convert_png_to_svg.py
"""

import base64
import io
from pathlib import Path
from PIL import Image

IMG_DIR = Path(__file__).parent.parent / "img"
OUT_W, OUT_H = 310, 310
GREEN = (0x4D, 0xFF, 0x91)

SVG_TEMPLATE = (
    '<svg xmlns="http://www.w3.org/2000/svg" '
    'viewBox="0 0 {w} {h}">'
    '<image href="data:image/png;base64,{b64}" width="{w}" height="{h}"/>'
    '</svg>'
)


def png_to_green_transparent(src: Path) -> bytes:
    """Return processed PNG bytes: white->transparent, black->#4dff91."""
    img = Image.open(src).convert("RGBA").resize((OUT_W, OUT_H), Image.LANCZOS)
    pixels = img.load()
    for y in range(OUT_H):
        for x in range(OUT_W):
            r, g, b, a = pixels[x, y]
            brightness = (r + g + b) // 3
            alpha = 255 - brightness          # white(255)->0, black(0)->255
            pixels[x, y] = (*GREEN, alpha)
    buf = io.BytesIO()
    img.save(buf, format="PNG")
    return buf.getvalue()


def make_svg(png_bytes: bytes) -> str:
    b64 = base64.b64encode(png_bytes).decode("ascii")
    return SVG_TEMPLATE.format(w=OUT_W, h=OUT_H, b64=b64)


def main():
    pngs = sorted(IMG_DIR.glob("*.png"))
    if not pngs:
        print("No PNG files found in", IMG_DIR)
        return
    for src in pngs:
        dst = src.with_suffix(".svg")
        print(f"  {src.name} -> {dst.name}", end=" ... ", flush=True)
        png_bytes = png_to_green_transparent(src)
        dst.write_text(make_svg(png_bytes), encoding="ascii")
        print("done")
    print(f"\nConverted {len(pngs)} files.")


if __name__ == "__main__":
    main()
