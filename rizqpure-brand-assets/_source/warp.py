"""Warp flat pouch artwork (RGBA PNG) onto a filled stand-up pouch silhouette with matte lighting.

usage: python3 warp.py flat.png out.png
Shape measured from product photos: straight full-width top seal/zip band, sides tapering ~18%
toward the base, large rounded bottom corners, base curling under.
"""
import sys
import numpy as np
from PIL import Image
from scipy.ndimage import map_coordinates

src = np.asarray(Image.open(sys.argv[1]).convert('RGBA')).astype(np.float32) / 255.0
Hs, Ws = src.shape[:2]

TAPER = 0.14        # total width lost at the base
FLAT_TOP = 0.11     # seal + zip band stays flat and full width
CURL = 0.955        # visible height after the base curls under
RH, RV = 0.13, 0.045  # bottom corner radius: fraction of half-width, fraction of height
BULGE = 0.78        # cylindrical bulge strength of the filled body

Wo = Ws
Ho = int(round(Hs * CURL))
y, x = np.mgrid[0:Ho, 0:Wo].astype(np.float32)
v = (y + 0.5) / Ho

# half-width profile
t = np.clip((v - FLAT_TOP) / (1 - FLAT_TOP), 0, 1)
wf = 1.0 - 0.012 * np.clip(v / FLAT_TOP, 0, 1) - TAPER * t ** 1.12
half = 0.5 * Wo * wf
dx = x + 0.5 - Wo / 2
xn = dx / half
ax = np.abs(xn)

# bottom boundary (rounded corners + slightly convex base)
c0 = 1 - RH
k = np.clip((ax - c0) / RH, 0, 1)
ylim = 1 - 0.004 * xn ** 2 - RV * (1 - np.sqrt(np.clip(1 - k ** 2, 0, 1)))

# soft alpha (analytic edges, ~1px antialias)
a_side = np.clip(half - np.abs(dx) + 0.5, 0, 1)
a_bot = np.clip((ylim - v) * Ho + 0.5, 0, 1)
a_top = np.clip(y + 0.5, 0, 1)
# small rounded top corners
rt = 0.022 * Wo
cx_edge = half - rt
tc = (np.abs(dx) > cx_edge) & (y < rt)
dist = np.sqrt((np.abs(dx) - cx_edge) ** 2 + (rt - y) ** 2)
a_tc = np.where(tc, np.clip(rt - dist + 0.5, 0, 1), 1)
alpha = a_side * a_bot * a_top * a_tc

# source coordinates
b = BULGE * np.clip((v - FLAT_TOP * 0.8) / 0.18, 0, 1) * np.clip((ylim - v) / 0.05 + 0.4, 0.4, 1)
xc = np.clip(xn, -1, 1)
bs = np.maximum(b, 1e-3)
s = np.arcsin(bs * xc) / np.arcsin(bs)
us = (0.5 + 0.5 * s * 0.992) * Ws
v0 = 0.88
vv = np.where(v < v0, v, v0 + (v - v0) / np.maximum(ylim - v0, 1e-3) * (1 - v0))
vs = np.clip(vv, 0, 1) * (Hs - 1)

out = np.empty((Ho, Wo, 4), np.float32)
for ch in range(4):
    out[..., ch] = map_coordinates(src[..., ch], [vs, us], order=1, mode='nearest')

# ---- lighting (matte)
rgb = out[..., :3]
# surface normal x-component ~ xn for the bulged body; flat at top band
nxs = xc * np.clip(b / BULGE, 0, 1)
shade = 1.0 - 0.50 * np.clip(nxs, 0, 1) ** 2.0 - 0.30 * np.clip(-nxs, 0, 1) ** 3
key = 0.10 * np.exp(-(((xn + 0.38) / 0.42) ** 2 + ((v - 0.34) / 0.30) ** 2))
# base curls away from light
curl = np.clip((v - (ylim - 0.13)) / 0.13, 0, 1) ** 1.6
shade *= 1.0 - 0.45 * curl
# fold just below the zip where the filled body starts
fold = np.exp(-((v - FLAT_TOP * 1.12) / 0.018) ** 2)
shade *= 1.0 - 0.18 * fold
top_band = (v < FLAT_TOP * 0.95) * 0.035
# side seal catches light (left) / falls off (right)
edge_px = (half - np.abs(dx))
seal = np.exp(-edge_px / (0.012 * Wo))
light_edge = np.where(dx < 0, 0.10, -0.06) * seal
GRAIN = float(__import__("os").environ.get("GRAIN", "0.012"))
grain = (np.random.default_rng(7).standard_normal((Ho, Wo)).astype(np.float32)) * GRAIN

lum_add = key + top_band + light_edge + grain
rgb = np.clip(rgb * shade[..., None] + lum_add[..., None] * (0.6 + 0.4 * rgb), 0, 1)
out[..., :3] = rgb
out[..., 3] = out[..., 3] * alpha

Image.fromarray((out * 255 + 0.5).astype(np.uint8)).save(sys.argv[2])
print(sys.argv[2], Wo, Ho)
