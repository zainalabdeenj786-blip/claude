import cv2, numpy as np
room = cv2.imread('original.jpg').astype(np.float32)
sw = cv2.imread('swatch_H1369_ST40_marone_casella_oak.jpg').astype(np.float32)[70:510, 200:870]   # swatch only, inside the sample edges
H, W = room.shape[:2]

# flatten the swatch photo's uneven lighting, keep the grain + colour
lum = sw.mean(2, keepdims=True)
sw_flat = sw / (cv2.GaussianBlur(lum, (0, 0), 60)[..., None] if lum.ndim == 2 else cv2.GaussianBlur(lum, (0, 0), 60)[..., None]) * lum.mean()
sw_flat = np.clip(sw_flat, 0, 255)
SW_MEAN = sw_flat.reshape(-1, 3).mean(0)

def texture(w, h, seed=0, horizontal=False):
    t = sw_flat
    if horizontal: t = cv2.rotate(t, cv2.ROTATE_90_CLOCKWISE)
    rng = np.random.default_rng(seed)
    th, tw = t.shape[:2]
    cw = int(tw * 0.55); x0 = rng.integers(0, tw - cw)
    t = t[:, x0:x0 + cw] if not horizontal else t[x0 % (th//2):, :]
    return cv2.resize(t, (w, h), interpolation=cv2.INTER_AREA)

def warp_tex(quad, tw, th, seed, horizontal=False):
    tex = texture(tw, th, seed, horizontal)
    src = np.float32([[0, 0], [tw, 0], [tw, th], [0, th]])
    M = cv2.getPerspectiveTransform(src, np.float32(quad))
    return cv2.warpPerspective(tex, M, (W, H), flags=cv2.INTER_LINEAR, borderMode=cv2.BORDER_REFLECT)

def poly_mask(quad):
    m = np.zeros((H, W), np.uint8); cv2.fillPoly(m, [np.int32(quad)], 255); return m

gray = room.mean(2)
bgr = room
warm = (bgr[..., 2] - bgr[..., 0])            # R - B
# panels: TL, TR, BR, BL
left_panel  = [(91, 522), (141, 511), (141, 929), (91, 913)]
right_panel = [(610, 518), (661, 530), (661, 910), (610, 923)]
# plinth / bottom-rail bands (colour-gated)
left_plinth  = [(141, 902), (352, 880), (352, 900), (141, 931)]
right_plinth = [(352, 878), (610, 912), (610, 925), (352, 892)]
# open shelving unit carcass (optional variant)
open_unit = [(256, 538), (350, 545), (350, 902), (256, 912)]

def apply(out, mask, tex, ref_lum, blur=9):
    m = cv2.GaussianBlur(mask.astype(np.float32) / 255, (0, 0), 0.7)[..., None]
    shade = cv2.GaussianBlur(gray, (0, 0), blur)[..., None] / ref_lum   # keep original lighting
    new = np.clip(tex / SW_MEAN.mean() * SW_MEAN.mean() * shade, 0, 255)
    return out * (1 - m) + new * m

REF = 95.0   # albedo ratio: walnut -> Marone Casella Oak (greyer, slightly darker)
def build(include_interior):
    out = room.copy()
    for quad, seed in [(left_panel, 1), (right_panel, 2)]:
        out = apply(out, poly_mask(quad), warp_tex(quad, 140, 520, seed), REF)
    for quad, seed in [(left_plinth, 3), (right_plinth, 4)]:
        m = poly_mask(quad) * ((warm > 10) & (gray < 75))
        m = cv2.morphologyEx(m.astype(np.uint8), cv2.MORPH_CLOSE, np.ones((3, 3), np.uint8))
        out = apply(out, m, warp_tex(quad, 500, 30, seed, horizontal=True), REF, blur=3)
    if include_interior:
        m = poly_mask(open_unit)
        # wood only: warm pixels, skip bright LED strips / folded clothes / shoes / metal basket
        sat = (warm / (bgr.max(2) + 1))
        wood = (warm > 10) & (sat > 0.25) & (gray < 150)
        m = (m * wood).astype(np.uint8)
        m = cv2.morphologyEx(m, cv2.MORPH_OPEN, np.ones((2, 2), np.uint8))
        out = apply(out, m, warp_tex(open_unit, 160, 600, 5), REF * 1.05, blur=4)
    return np.clip(out, 0, 255).astype(np.uint8)

a = build(False); b = build(True)
cv2.imwrite('wardrobe_casella_frame.jpg', a, [cv2.IMWRITE_JPEG_QUALITY, 95])
cv2.imwrite('wardrobe_casella_frame_and_interior.jpg', b, [cv2.IMWRITE_JPEG_QUALITY, 95])
for n, im in [('za', a), ('zb', b)]:
    c = im[480:940, 60:680]; cv2.imwrite(n + '.png', cv2.resize(c, None, fx=2, fy=2, interpolation=cv2.INTER_CUBIC))
