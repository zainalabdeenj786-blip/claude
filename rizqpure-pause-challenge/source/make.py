import sys
from PIL import Image, ImageFilter, ImageDraw, ImageFont, ImageChops
src, out = sys.argv[1], sys.argv[2]
W,H = 1080,1920
pouch = Image.open(src).convert("RGB")
g = pouch.convert("L")
mask = g.point(lambda v: 255 if v < 235 else 0).filter(ImageFilter.MedianFilter(5))
# fill holes (white lettering inside the pouch): flood the outside, keep everything else
fm = Image.new("L",(mask.width+2,mask.height+2),0); fm.paste(mask,(1,1))
ImageDraw.floodfill(fm,(0,0),128)
mask = fm.point(lambda v: 0 if v==128 else 255).crop((1,1,mask.width+1,mask.height+1))
# scale pouch + mask to target size
tw = 560; th = int(mask.height*tw/mask.width)
mask = mask.resize((tw,th), Image.LANCZOS).point(lambda v:255 if v>128 else 0)
pouch_s = pouch.resize((tw,th), Image.LANCZOS)
pad = 40
m = Image.new("L",(tw+2*pad,th+2*pad),0); m.paste(mask,(pad,pad))
inner = m.filter(ImageFilter.MaxFilter(5))
outer = m.filter(ImageFilter.MaxFilter(21))
ring = ImageChops.subtract(outer, inner).filter(ImageFilter.GaussianBlur(1))
ox, oy = (W-tw)//2 - pad - 40, 560 - pad
def outline_layer():
    L = Image.new("RGBA",(W,H),(0,0,0,0))
    red = Image.new("RGBA",ring.size,(235,20,20,255))
    L.paste(red,(ox,oy),ring)
    return L
font = "/usr/share/fonts/opentype/inter/Inter-ExtraBold.otf"
def caption(L, lines, y, size=64):
    d = ImageDraw.Draw(L); f = ImageFont.truetype(font,size)
    for i,parts in enumerate(lines):
        total = sum(d.textlength(t,font=f) for t,_ in parts)
        x = (W-total)/2
        for t,c in parts:
            d.text((x,y+i*(size+8)),t,font=f,fill=c,stroke_width=5,stroke_fill=(0,0,0,200))
            x += d.textlength(t,font=f)
WHITE=(255,255,255,255); GOLD=(245,197,24,255)
cap = [[("Only ",WHITE),("1%",GOLD),(" can pause",WHITE)],[("at the right time!",WHITE)]]
# 1) outline only
L = outline_layer(); L.save(f"{out}/01_pouch_outline.png")
# 2) text only
T = Image.new("RGBA",(W,H),(0,0,0,0)); caption(T,cap,230); T.save(f"{out}/02_hook_text.png")
# 3) combined overlay
C = Image.alpha_composite(L,T); C.save(f"{out}/03_overlay_combined.png")
# 4) "almost had it" sticker
S = Image.new("RGBA",(W,H),(0,0,0,0)); d=ImageDraw.Draw(S)
f1=ImageFont.truetype(font,70); f2=ImageFont.truetype(font,44)
tmp = Image.new("RGBA",(900,220),(0,0,0,0)); dt=ImageDraw.Draw(tmp)
dt.text((450,60),"ALMOST HAD IT",font=f1,fill=WHITE,anchor="mm",stroke_width=5,stroke_fill=(0,0,0,220))
dt.text((450,140),"2 frames off...",font=f2,fill=WHITE,anchor="mm",stroke_width=4,stroke_fill=(0,0,0,220))
tmp = tmp.rotate(-8, resample=Image.BICUBIC, expand=True)
S.paste(tmp,((W-tmp.width)//2, 1560),tmp); S.save(f"{out}/04_almost_had_it_sticker.png")
# 5) preview mock: grey park-ish bg, pouch slightly off the outline
bg = Image.new("RGBA",(W,H),(0,0,0,255)); db=ImageDraw.Draw(bg)
for y in range(H):
    t=y/H; db.line([(0,y),(W,y)],fill=(int(120+60*t),int(170-30*t),int(220-120*t),255))
pm = mask.copy()
bg.paste(pouch_s.convert("RGBA"),(ox+pad+45, oy+pad+30), pm)
prev = Image.alpha_composite(Image.alpha_composite(bg,C),S).convert("RGB")
prev.save(f"{out}/05_preview_mock.jpg", quality=90)
