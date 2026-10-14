import sys, glob, subprocess
import numpy as np
from PIL import Image, ImageFilter, ImageDraw, ImageFont, ImageChops
frames_dir, mask_png, out_mp4, still_dir = sys.argv[1:5]
W,H,FPS = 1080,1920,30
CATCH = 101; TAUNT = {99, 103}
m = Image.open(mask_png).convert("L").resize((W,H)).point(lambda v: 255 if v>128 else 0)
ring = ImageChops.subtract(m.filter(ImageFilter.MaxFilter(21)), m.filter(ImageFilter.MaxFilter(5))).filter(ImageFilter.GaussianBlur(1))
OUT = Image.new("RGBA",(W,H),(0,0,0,0)); OUT.paste(Image.new("RGBA",(W,H),(235,20,20,255)),(0,0),ring)
font = "/usr/share/fonts/opentype/inter/Inter-ExtraBold.otf"
WHITE=(255,255,255,255); GOLD=(245,197,24,255)
TXT = Image.new("RGBA",(W,H),(0,0,0,0)); d = ImageDraw.Draw(TXT); f = ImageFont.truetype(font,64)
for i,parts in enumerate([[("Only ",WHITE),("1%",GOLD),(" can pause",WHITE)],[("at the right time!",WHITE)]]):
    x = (W-sum(d.textlength(t,font=f) for t,_ in parts))/2
    for t,c in parts:
        d.text((x,250+i*72),t,font=f,fill=c,stroke_width=6,stroke_fill=(0,0,0,230)); x += d.textlength(t,font=f)
ST = Image.new("RGBA",(900,220),(0,0,0,0)); ds = ImageDraw.Draw(ST)
ds.text((450,60),"ALMOST HAD IT",font=ImageFont.truetype(font,70),fill=WHITE,anchor="mm",stroke_width=5,stroke_fill=(0,0,0,220))
ds.text((450,140),"2 frames off...",font=ImageFont.truetype(font,44),fill=WHITE,anchor="mm",stroke_width=4,stroke_fill=(0,0,0,220))
ST = ST.rotate(-8, resample=Image.BICUBIC, expand=True)
files = sorted(glob.glob(f"{frames_dir}/f_*.png")); N = len(files)
# audio: treadmill motor hum + belt hiss, swelling as the pouch nears, then a soft thud as it drops off
sr = 48000; t = np.arange(int(sr*N/FPS))/sr; rng = np.random.RandomState(1)
hiss = np.convolve(rng.randn(len(t)), np.ones(40)/40, "same")
hum = 0.5*np.sin(2*np.pi*98*t) + 0.25*np.sin(2*np.pi*196*t) + 0.1*np.sin(2*np.pi*31*t)
near = np.clip(1 - np.abs(t - CATCH/FPS)/1.2, 0, 1)**3
aud = 0.10*hum + 0.6*hiss*(0.5 + 1.2*near)
th = t - 108/FPS; thud = np.where(th > 0, np.exp(-th*35)*np.sin(2*np.pi*70*th), 0)
aud = aud + 0.7*thud
aud = (aud/np.abs(aud).max()*0.5*32767).astype(np.int16)
wav = f"{still_dir}/audio.wav"
import wave
with wave.open(wav,"wb") as wf: wf.setnchannels(1); wf.setsampwidth(2); wf.setframerate(sr); wf.writeframes(aud.tobytes())
ff = subprocess.Popen(["ffmpeg","-v","error","-y","-f","rawvideo","-pix_fmt","rgb24","-s",f"{W}x{H}","-r",str(FPS),"-i","-","-i",wav,
    "-c:v","libx264","-pix_fmt","yuv420p","-crf","17","-preset","slow","-movflags","+faststart","-c:a","aac","-b:a","128k","-shortest",out_mp4],
    stdin=subprocess.PIPE)
for i,fp in enumerate(files):
    fr = i+1
    im = Image.open(fp).convert("RGB").resize((W,H), Image.LANCZOS).filter(ImageFilter.UnsharpMask(1.2, 40, 2)).convert("RGBA")
    im = Image.alpha_composite(Image.alpha_composite(im, OUT), TXT)
    if fr in TAUNT: im.paste(ST, ((W-ST.width)//2, 1560), ST)
    a = np.asarray(im.convert("RGB"), dtype=np.int16)
    a = np.clip(a + np.random.normal(0,3,a.shape[:2])[...,None], 0, 255).astype(np.uint8)
    if fr in (1, 90, 99, CATCH, 103): Image.fromarray(a).save(f"{still_dir}/frame_{fr:03d}.jpg", quality=92)
    ff.stdin.write(a.tobytes())
ff.stdin.close(); ff.wait(); print("frames", N, "rc", ff.returncode)
