import sys, math, subprocess, random
import numpy as np
from PIL import Image, ImageFilter, ImageDraw, ImageFont, ImageChops, ImageEnhance
pouch_src, bg_src, out_mp4, frames_dir = sys.argv[1:5]
W,H,FPS,N = 1080,1920,30,180
random.seed(7); np.random.seed(7)

# --- pouch cutout with clean alpha ---
p = Image.open(pouch_src).convert("RGB")
m = p.convert("L").point(lambda v: 255 if v < 235 else 0).filter(ImageFilter.MedianFilter(5))
fm = Image.new("L",(m.width+2,m.height+2),0); fm.paste(m,(1,1)); ImageDraw.floodfill(fm,(0,0),128)
m = fm.point(lambda v: 0 if v==128 else 255).crop((1,1,m.width+1,m.height+1))
m = m.filter(ImageFilter.MinFilter(3)).filter(ImageFilter.GaussianBlur(1.2))
bb = m.getbbox(); p = p.crop(bb); m = m.crop(bb)
# warm it slightly to sit in sunlight
p = ImageEnhance.Brightness(p).enhance(1.05)
POUCH = p.convert("RGBA"); POUCH.putalpha(m)
AR = POUCH.height / POUCH.width

# --- background: crop 9:16 around the path, oversize for handheld shake ---
bg = Image.open(bg_src).convert("RGB")
ch = bg.height; cw = int(ch*9/16); cx = 1383
bg = bg.crop((cx-cw//2, 0, cx+cw//2, ch))
S = 1.06
BG = bg.resize((int(W*S), int(H*S)), Image.LANCZOS)
BG = ImageEnhance.Color(BG).enhance(1.05)

# --- catch target (where the outline sits) ---
CW = 560; CH = int(CW*AR); CX, CY = 540, 1060   # centre of pouch in catch frame
def placed_mask(w, cx, cy):
    h = int(w*AR); L = Image.new("L",(W,H),0)
    L.paste(m.resize((w,h), Image.LANCZOS), (cx-w//2, cy-h//2)); return L
tm = placed_mask(CW, CX, CY).point(lambda v: 255 if v>128 else 0)
ring = ImageChops.subtract(tm.filter(ImageFilter.MaxFilter(21)), tm.filter(ImageFilter.MaxFilter(5))).filter(ImageFilter.GaussianBlur(1))
OUTLINE = Image.new("RGBA",(W,H),(0,0,0,0)); OUTLINE.paste(Image.new("RGBA",(W,H),(235,20,20,255)),(0,0),ring)

font = "/usr/share/fonts/opentype/inter/Inter-ExtraBold.otf"
WHITE=(255,255,255,255); GOLD=(245,197,24,255)
TEXT = Image.new("RGBA",(W,H),(0,0,0,0)); d = ImageDraw.Draw(TEXT); f = ImageFont.truetype(font,64)
for i,parts in enumerate([[("Only ",WHITE),("1%",GOLD),(" can pause",WHITE)],[("at the right time!",WHITE)]]):
    x = (W-sum(d.textlength(t,font=f) for t,_ in parts))/2
    for t,c in parts:
        d.text((x,230+i*72),t,font=f,fill=c,stroke_width=5,stroke_fill=(0,0,0,200)); x += d.textlength(t,font=f)
STICK = Image.new("RGBA",(900,220),(0,0,0,0)); ds = ImageDraw.Draw(STICK)
ds.text((450,60),"ALMOST HAD IT",font=ImageFont.truetype(font,70),fill=WHITE,anchor="mm",stroke_width=5,stroke_fill=(0,0,0,220))
ds.text((450,140),"2 frames off...",font=ImageFont.truetype(font,44),fill=WHITE,anchor="mm",stroke_width=4,stroke_fill=(0,0,0,220))
STICK = STICK.rotate(-8, resample=Image.BICUBIC, expand=True)

# --- flash schedule: (start frame, n frames, width, cx, cy, rot, squeeze, blur dx, dy) ---
FL = [
 (18, 2,  70, 548, 905,  12, 0.8, 0, 0),
 (40, 1, 170, 330, 930, -25, 0.55, 14, 4),
 (66, 3, 470, 655, 1150, -9, 0.95, 6, 2),     # near miss (+ sticker)
 (93, 1, 250, 610, 960,  30, 0.35, 18, -6),
 (117,1, CW,  CX,  CY,    0, 1.0, 0, 0),      # THE catch frame
 (134,2, 660, 380, 1240, 16, 0.85, 22, 8),
 (152,1, 110, 470, 900, -40, 0.6, 8, 0),
 (166,2, 340, 760, 1080, -14, 0.75, 12, 4),
]
STICKER_FRAMES = range(66, 72)
CATCH = 117
def ground_y(w): return 880 + 1.55*w      # perspective: bigger = closer = lower ground

def pouch_layer(fr, w, cx, cy, rot, sq, bdx, bdy):
    h = int(w*AR); sw = max(4,int(w*sq))
    pi = POUCH.resize((sw,h), Image.LANCZOS)
    if sq < 0.98:  # darken the side turned away from the sun
        pi = Image.merge("RGBA", [*ImageEnhance.Brightness(pi.convert("RGB")).enhance(0.6+0.4*sq).split(), pi.split()[3]])
    pi = pi.rotate(rot, resample=Image.BICUBIC, expand=True)
    L = Image.new("RGBA",(W,H),(0,0,0,0))
    # soft ground shadow
    gy = int(ground_y(w)); sh = Image.new("L",(W,H),0); ImageDraw.Draw(sh).ellipse(
        (cx-w*0.45, gy-w*0.06, cx+w*0.45, gy+w*0.06), fill=int(110*min(1,w/300)+30))
    sh = sh.filter(ImageFilter.GaussianBlur(max(3,w*0.05)))
    L.paste(Image.new("RGBA",(W,H),(20,30,10,255)),(0,0),sh)
    # motion blur: average shifted copies
    acc = Image.new("RGBA",(W,H),(0,0,0,0))
    steps = 6 if (bdx or bdy) else 1
    for k in range(steps):
        t = (k/(steps-1)-0.5) if steps>1 else 0
        layer = Image.new("RGBA",(W,H),(0,0,0,0))
        layer.paste(pi,(int(cx-pi.width/2+bdx*t),int(cy-pi.height/2+bdy*t)),pi)
        acc = Image.blend(acc, layer, 1.0/(k+1)) if k else layer
    return Image.alpha_composite(L, acc)

# smooth handheld shake
def smooth(n, amp, seed):
    r = np.random.RandomState(seed); pts = r.uniform(-1,1,n//15+3)
    x = np.interp(np.arange(n)/15, np.arange(len(pts)), pts); return x*amp
SX, SY = smooth(N,14,1), smooth(N,10,2)
MX, MY = (BG.width-W)//2, (BG.height-H)//2

ff = subprocess.Popen(["ffmpeg","-v","error","-y","-f","rawvideo","-pix_fmt","rgb24","-s",f"{W}x{H}","-r",str(FPS),"-i","-",
    "-f","lavfi","-i","anoisesrc=color=pink:amplitude=0.05:d=6,lowpass=f=900,highpass=f=80",
    "-c:v","libx264","-pix_fmt","yuv420p","-crf","18","-preset","slow","-movflags","+faststart",
    "-c:a","aac","-b:a","128k","-shortest", out_mp4], stdin=subprocess.PIPE)
active = {}
for s,n,*args in FL:
    for k in range(n): active[s+k] = args
for fr in range(N):
    ox, oy = int(MX+SX[fr]), int(MY+SY[fr])
    frame = BG.crop((ox,oy,ox+W,oy+H)).convert("RGBA")
    if fr in active:
        a = list(active[fr]); s0 = [s for s,n,*_ in FL if s<=fr<s+n][0]
        if fr != CATCH and fr > s0:   # it keeps flying across multi-frame flashes
            a[1] += int((fr-s0)*a[5]*1.6); a[2] += int((fr-s0)*a[6]*1.6); a[0] = int(a[0]*1.04)
        frame = Image.alpha_composite(frame, pouch_layer(fr, *a))
    frame = Image.alpha_composite(frame, OUTLINE); frame = Image.alpha_composite(frame, TEXT)
    if fr in STICKER_FRAMES: frame.paste(STICK, ((W-STICK.width)//2, 1560), STICK)
    arr = np.asarray(frame.convert("RGB"), dtype=np.int16)
    arr = np.clip(arr + np.random.normal(0,3.5,arr.shape[:2])[...,None], 0, 255).astype(np.uint8)  # phone grain
    if fr in (CATCH, 68, 0): Image.fromarray(arr).save(f"{frames_dir}/frame_{fr:03d}.jpg", quality=90)
    ff.stdin.write(arr.tobytes())
ff.stdin.close(); ff.wait(); print("done", ff.returncode)
