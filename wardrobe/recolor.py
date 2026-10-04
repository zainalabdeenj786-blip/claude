import cv2, numpy as np
import sys
SCALE = int(sys.argv[1]) if len(sys.argv) > 1 else 1
room = cv2.imread('original.jpg')
if SCALE > 1:
    room = cv2.resize(room, None, fx=SCALE, fy=SCALE, interpolation=cv2.INTER_LANCZOS4)
    room = cv2.addWeighted(room, 1.5, cv2.GaussianBlur(room, (0, 0), 1.2 * SCALE), -0.5, 0)
    room = cv2.bilateralFilter(room, 5, 20, 3)
room = room.astype(np.float32)
# finish: (swatch photo, crop inside the sample edges, output name)
FINISHES = {
    'casella':  ('swatch_H1369_ST40_marone_casella_oak.jpg', (70, 510, 200, 870), 'redesign_casella_oak_frame'),
    'tobacco':  ('swatch_sheet_H3325_ST28.jpg', (600, 1290, 40, 1130), 'redesign_tobacco_gladstone_oak_frame'),
    'walnut':   ('swatch_H3702_ST10_tobacco_pacific_walnut.webp', (0, 1152, 0, 1536), 'redesign_tobacco_pacific_walnut_frame'),
    'tonsberg': ('swatch_H309_ST12_brown_tonsberg_oak.webp', (0, 1152, 0, 1536), 'redesign_brown_tonsberg_oak_frame'),   # flat decor scan, grain runs horizontally
}
FINISH = sys.argv[2] if len(sys.argv) > 2 else 'tonsberg'
sw_file, (y0, y1, x0, x1), OUT_NAME = FINISHES[FINISH]
sw = cv2.imread(sw_file).astype(np.float32)[y0:y1, x0:x1]
if FINISH in ('walnut', 'tonsberg'):
    sw = cv2.rotate(sw, cv2.ROTATE_90_CLOCKWISE)   # grain vertical, like the other samples
H, W = room.shape[:2]

# flatten the swatch photo's uneven lighting, keep the grain + colour
lum = sw.mean(2, keepdims=True)
sw_flat = sw / (cv2.GaussianBlur(lum, (0, 0), 60)[..., None] if lum.ndim == 2 else cv2.GaussianBlur(lum, (0, 0), 60)[..., None]) * lum.mean()
sw_flat = np.clip(sw_flat, 0, 255)
SW_MEAN = sw_flat.reshape(-1, 3).mean(0)
GRAIN = {'casella': 1.0, 'tobacco': 0.7, 'walnut': 1.0, 'tonsberg': 1.0}[FINISH]   # tame the swatch photo's harsh pore shadows at panel scale
sw_flat = SW_MEAN + (sw_flat - SW_MEAN) * GRAIN
# colour of the original walnut under neutral daylight (right end panel, BGR), to recover the room's light colour
WALNUT = np.float32([118, 135, 147]); WALNUT /= WALNUT.mean()

# mild stretch along the grain only, and how much of the sample's width one 600 mm panel shows
STRETCH, CW = {'casella': (1.6, 0.6), 'tobacco': (1.6, 0.6), 'walnut': (1.4, 0.45), 'tonsberg': (1.4, 0.45)}[FINISH]

def texture(w, h, seed=0, horizontal=False):
    t = sw_flat
    if horizontal:
        t = cv2.rotate(t, cv2.ROTATE_90_CLOCKWISE); w, h = h, w
    rng = np.random.default_rng(seed)
    th, tw = t.shape[:2]
    cw = int(tw * CW); x0 = rng.integers(0, tw - cw)
    t = t[:, x0:x0 + cw]
    need = int(np.ceil(cw * h / w / STRETCH))
    tiles = [t if i % 2 == 0 else t[::-1] for i in range(need // th + 1)]   # mirror-tile along the grain
    t = np.vstack(tiles)[:need]
    t = cv2.resize(t, (w, h), interpolation=cv2.INTER_AREA)
    return cv2.rotate(t, cv2.ROTATE_90_COUNTERCLOCKWISE) if horizontal else t

def warp_tex(quad, tw, th, seed, horizontal=False):
    tex = texture(tw, th, seed, horizontal)
    src = np.float32([[0, 0], [tw, 0], [tw, th], [0, th]])
    M = cv2.getPerspectiveTransform(src, np.float32(quad))
    return cv2.warpPerspective(tex, M, (W, H), flags=cv2.INTER_LINEAR, borderMode=cv2.BORDER_REFLECT)

def S(q): return [(x * SCALE, y * SCALE) for x, y in q]

def poly_mask(quad):
    m = np.zeros((H, W), np.uint8); cv2.fillPoly(m, [np.int32(quad)], 255); return m

gray = room.mean(2)
bgr = room
warm = (bgr[..., 2] - bgr[..., 0])            # R - B
# panels: TL, TR, BR, BL
left_panel  = S([(91, 522), (141, 511), (141, 929), (91, 913)])
right_panel = S([(610, 518), (661, 530), (661, 910), (610, 923)])
# plinth / bottom-rail bands (colour-gated)
left_plinth  = S([(141, 902), (352, 880), (352, 900), (141, 931)])
right_plinth = S([(352, 878), (610, 912), (610, 925), (352, 892)])
# open shelving unit carcass (optional variant)
open_unit = S([(256, 538), (350, 545), (350, 902), (256, 912)])

def apply(out, mask, tex, ref_lum, blur=None):
    m = cv2.GaussianBlur(mask.astype(np.float32) / 255, (0, 0), 0.7 * SCALE)[..., None]
    blur = blur or 9 * SCALE
    if FINISH == 'casella':
        shade = cv2.GaussianBlur(gray, (0, 0), blur)[..., None] / ref_lum   # keep original lighting
    else:   # keep original lighting, including its colour (warm bulb vs daylight)
        shade = cv2.GaussianBlur(bgr, (0, 0), blur) / (ref_lum * WALNUT)
    new = np.clip(tex * shade, 0, 255)
    return out * (1 - m) + new * m

# brightness of the new board relative to the original walnut (Casella reads a touch darker/greyer)
REF = 95.0 if FINISH == 'casella' else float(SW_MEAN.mean())
def build(include_interior):
    out = room.copy()
    for quad, seed in [(left_panel, 1), (right_panel, 2)]:
        out = apply(out, poly_mask(quad), warp_tex(quad, 140 * SCALE, 520 * SCALE, seed), REF)
    for quad, seed in [(left_plinth, 3), (right_plinth, 4)]:
        m = poly_mask(quad) * ((warm > 10) & (gray < 75))
        m = cv2.morphologyEx(m.astype(np.uint8), cv2.MORPH_CLOSE, np.ones((3 * SCALE, 3 * SCALE), np.uint8))
        out = apply(out, m, warp_tex(quad, 500 * SCALE, 30 * SCALE, seed, horizontal=True), REF, blur=3 * SCALE)
    if include_interior:
        m = poly_mask(open_unit)
        # wood only: warm pixels, skip bright LED strips / folded clothes / shoes / metal basket
        sat = (warm / (bgr.max(2) + 1))
        wood = (warm > 10) & (sat > 0.25) & (gray < 150)
        m = (m * wood).astype(np.uint8)
        m = cv2.morphologyEx(m, cv2.MORPH_OPEN, np.ones((2, 2), np.uint8))
        out = apply(out, m, warp_tex(open_unit, 160, 600, 5), REF * 1.05, blur=4)
    return np.clip(out, 0, 255).astype(np.uint8)

a = build(False)
name = OUT_NAME + ('_HD.jpg' if SCALE > 1 else '.jpg')
cv2.imwrite(name, a, [cv2.IMWRITE_JPEG_QUALITY, 95])
print(name, a.shape)
