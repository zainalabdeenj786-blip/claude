"""Remove the white background from the RizqPure logo and export print-ready PNGs."""
from pathlib import Path

import numpy as np
from PIL import Image

HERE = Path(__file__).parent
SRC = HERE / "rizqpure-original.png"
LO, HI = 10, 70  # "distance from white" ramp: <=LO fully transparent, >=HI fully opaque
PAD = 24
UPSCALE = 4  # 1248px source -> ~print size at 300 DPI


def make_rgba(rgb):
    c = rgb.astype(np.float32)
    dist = 255 - c.min(axis=2)
    alpha = np.clip((dist - LO) / (HI - LO), 0, 1)
    # Un-mix the white background from semi-transparent edge pixels (no white halo).
    a = np.maximum(alpha, 1e-3)[..., None]
    fg = np.clip((c - (1 - a) * 255) / a, 0, 255)
    fg = np.where(alpha[..., None] >= 1, c, fg)
    return np.dstack([fg, alpha * 255]).astype(np.uint8)


def crop(rgba):
    ys, xs = np.nonzero(rgba[..., 3] > 0)
    y0, y1 = max(ys.min() - PAD, 0), min(ys.max() + PAD, rgba.shape[0])
    x0, x1 = max(xs.min() - PAD, 0), min(xs.max() + PAD, rgba.shape[1])
    return rgba[y0:y1, x0:x1]


def upscale(rgba, k):
    im = Image.fromarray(rgba, "RGBA")
    # Resize premultiplied to avoid dark/white fringes.
    pre = im.convert("RGBa").resize((im.width * k, im.height * k), Image.LANCZOS)
    return pre.convert("RGBA")


def white_text(rgba):
    """Variant for dark garments: navy lettering -> white, gold ribbon unchanged."""
    out = rgba.copy()
    r, g, b = (rgba[..., i].astype(int) for i in range(3))
    navy = (b > r + 15) & (b > g + 15)
    out[navy, :3] = 255
    return out


def main():
    rgb = np.asarray(Image.open(SRC).convert("RGB"))
    logo = crop(make_rgba(rgb))
    variants = {"rizqpure-logo-transparent": logo, "rizqpure-logo-transparent-white-text": white_text(logo)}
    for name, arr in variants.items():
        Image.fromarray(arr, "RGBA").save(HERE / f"{name}.png", dpi=(300, 300))
        upscale(arr, UPSCALE).save(HERE / f"{name}@{UPSCALE}x.png", dpi=(300, 300))


if __name__ == "__main__":
    main()
