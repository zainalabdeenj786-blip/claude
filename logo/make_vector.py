"""Trace the transparent RizqPure logo into vector SVG/PDF/EPS files.

Run make_transparent.py first; this reads its 4x PNG output.
"""
from pathlib import Path

import cairosvg
import numpy as np
import potrace
from PIL import Image, ImageFilter

HERE = Path(__file__).parent
OUT = HERE / "vector"
SRC = HERE / "rizqpure-logo-transparent@4x.png"

NAVY = "#05065A"
GOLD_FLAT = "#C9A24E"
GOLD_DARK = "#8A6516"  # one-colour gold ribbon reads better slightly darker on light fabric


def mask(arr, sel):
    """Smooth a boolean mask before tracing so curves come out clean."""
    m = Image.fromarray((sel * 255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(5))
    return np.asarray(m) > 127


def to_path(bitmap):
    # potracer treats False as ink, so invert.
    traced = potrace.Bitmap(~bitmap).trace(turdsize=150, alphamax=1.2, opticurve=True, opttolerance=0.6)
    parts = []
    for curve in traced:
        s = curve.start_point
        parts.append(f"M{s.x:.1f},{s.y:.1f}")
        for seg in curve.segments:
            e = seg.end_point
            if seg.is_corner:
                parts.append(f"L{seg.c.x:.1f},{seg.c.y:.1f}L{e.x:.1f},{e.y:.1f}")
            else:
                parts.append(
                    f"C{seg.c1.x:.1f},{seg.c1.y:.1f} {seg.c2.x:.1f},{seg.c2.y:.1f} {e.x:.1f},{e.y:.1f}"
                )
        parts.append("Z")
    return "".join(parts)


def gold_gradient(arr, gold, width, stops=14):
    """Horizontal gradient built from the ribbon's average colour across its width."""
    xs = np.nonzero(gold.any(axis=0))[0]
    x0, x1 = xs.min(), xs.max()
    out = []
    for i in range(stops):
        lo = x0 + (x1 - x0) * i // stops
        hi = x0 + (x1 - x0) * (i + 1) // stops
        px = arr[:, lo:hi][gold[:, lo:hi]][:, :3]
        r, g, b = np.median(px, axis=0).astype(int)
        out.append(f'<stop offset="{(lo + hi) / 2 / width:.3f}" stop-color="#{r:02X}{g:02X}{b:02X}"/>')
    return "".join(out)


def svg(w, h, navy_d, gold_d, text_fill, ribbon_fill, defs=""):
    return (
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}" width="{w}" height="{h}">'
        f"<title>RizqPure</title>{defs}"
        f'<path fill="{text_fill}" fill-rule="evenodd" d="{navy_d}"/>'
        f'<path fill="{ribbon_fill}" fill-rule="evenodd" d="{gold_d}"/>'
        "</svg>"
    )


def main():
    OUT.mkdir(exist_ok=True)
    arr = np.asarray(Image.open(SRC).convert("RGBA")).astype(int)
    r, g, b, a = (arr[..., i] for i in range(4))
    solid = a >= 128
    navy_sel = solid & (b > r + 15) & (b > g + 15)
    gold_sel = solid & ~navy_sel
    gold, navy = mask(arr, gold_sel), mask(arr, navy_sel)
    h, w = gold.shape
    navy_d, gold_d = to_path(navy), to_path(gold)

    grad = f'<defs><linearGradient id="gold" x1="0" y1="0" x2="1" y2="0">{gold_gradient(arr, gold, w)}</linearGradient></defs>'
    grad = grad.replace('x2="1"', f'x2="{w}"').replace('<linearGradient', '<linearGradient gradientUnits="userSpaceOnUse"')
    variants = {
        "rizqpure-logo-full-colour": (NAVY, "url(#gold)", grad),
        "rizqpure-logo-flat-gold": (NAVY, GOLD_FLAT, ""),
        "rizqpure-logo-white-text": ("#FFFFFF", "url(#gold)", grad),
        "rizqpure-logo-white-text-flat-gold": ("#FFFFFF", GOLD_FLAT, ""),
        "rizqpure-logo-black": ("#000000", "#000000", ""),
        "rizqpure-logo-white": ("#FFFFFF", "#FFFFFF", ""),
        "rizqpure-logo-gold": (GOLD_DARK, GOLD_DARK, ""),
    }
    for name, (text, ribbon, defs) in variants.items():
        doc = svg(w, h, navy_d, gold_d, text, ribbon, defs)
        (OUT / f"{name}.svg").write_text(doc)
        cairosvg.svg2pdf(bytestring=doc.encode(), write_to=str(OUT / f"{name}.pdf"))
        cairosvg.svg2eps(bytestring=doc.encode(), write_to=str(OUT / f"{name}.eps"))


if __name__ == "__main__":
    main()
