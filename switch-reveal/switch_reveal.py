#!/usr/bin/env python3
"""Recreate the "light switch" reveal trend on your own footage.

You film yourself walking to a blank wall and tapping an imaginary switch.
This script draws the iOS-style toggle on the wall, flips it green at the
moment you tap it, makes your poster appear on the wall, and keeps you in
front of both (person segmentation), exactly like the original clip.

Example:
    python3 switch_reveal.py --video me.mp4 --poster poster.png --switch-time 4.7 --out reveal.mp4
"""
import argparse
import os
import subprocess
import tempfile

import cv2
import mediapipe as mp
import numpy as np
from mediapipe.tasks.python import BaseOptions, vision

HERE = os.path.dirname(os.path.abspath(__file__))
MODEL_URL = ("https://storage.googleapis.com/mediapipe-models/image_segmenter/"
             "selfie_multiclass_256x256/float32/latest/selfie_multiclass_256x256.tflite")

OFF_TRACK = (196, 190, 190)   # BGR, light grey
ON_TRACK = (20, 255, 0)       # BGR, bright green
KNOB = (255, 255, 255)
FLIP_SECONDS = 0.12           # knob slide duration


def fractions(n):
    def parse(s):
        vals = [float(v) for v in s.split(",")]
        if len(vals) != n:
            raise argparse.ArgumentTypeError(f"expected {n} comma-separated fractions of the frame")
        return vals
    return parse


def ensure_model(path):
    if not os.path.exists(path):
        print(f"Downloading segmentation model to {path} ...")
        subprocess.run(["curl", "-sSfL", "-o", path, MODEL_URL], check=True)
    return path


def draw_toggle(frame, cx, cy, w, progress):
    """Draw the pill toggle; progress 0 = off, 1 = on (knob slides, colour blends)."""
    h = int(w * 0.46)
    r = h // 2
    x0, x1 = int(cx - w / 2), int(cx + w / 2)
    y0 = int(cy - r)
    color = tuple(int(a + (b - a) * progress) for a, b in zip(OFF_TRACK, ON_TRACK))
    # Supersample for smooth edges.
    s = 4
    layer = np.zeros(((h + 4) * s, (w + 4) * s, 3), np.uint8)
    alpha = np.zeros(layer.shape[:2], np.uint8)
    rs, ox, oy = r * s, 2 * s, 2 * s
    for img, c in ((layer, color), (alpha, 255)):
        cv2.rectangle(img, (ox + rs, oy), (ox + w * s - rs, oy + h * s), c, -1)
        cv2.circle(img, (ox + rs, oy + rs), rs, c, -1, cv2.LINE_AA)
        cv2.circle(img, (ox + w * s - rs, oy + rs), rs, c, -1, cv2.LINE_AA)
    knob_r = int(rs * 0.82)
    kx = int(ox + rs + (w * s - 2 * rs) * progress)
    cv2.circle(layer, (kx, oy + rs), knob_r, KNOB, -1, cv2.LINE_AA)
    layer = cv2.resize(layer, (w + 4, h + 4), interpolation=cv2.INTER_AREA)
    alpha = cv2.resize(alpha, (w + 4, h + 4), interpolation=cv2.INTER_AREA)
    paste(frame, layer, alpha, x0 - 2, y0 - 2)


def paste(frame, img, alpha, x, y):
    H, W = frame.shape[:2]
    h, w = img.shape[:2]
    fx0, fy0, fx1, fy1 = max(x, 0), max(y, 0), min(x + w, W), min(y + h, H)
    if fx0 >= fx1 or fy0 >= fy1:
        return
    sub = img[fy0 - y:fy1 - y, fx0 - x:fx1 - x].astype(np.float32)
    a = (alpha[fy0 - y:fy1 - y, fx0 - x:fx1 - x].astype(np.float32) / 255.0)[..., None]
    roi = frame[fy0:fy1, fx0:fx1].astype(np.float32)
    frame[fy0:fy1, fx0:fx1] = (sub * a + roi * (1 - a)).astype(np.uint8)


def fit_cover(img, w, h):
    """Scale and centre-crop img to exactly w x h."""
    ih, iw = img.shape[:2]
    scale = max(w / iw, h / ih)
    img = cv2.resize(img, (max(w, round(iw * scale)), max(h, round(ih * scale))),
                     interpolation=cv2.INTER_AREA)
    ih, iw = img.shape[:2]
    x, y = (iw - w) // 2, (ih - h) // 2
    return img[y:y + h, x:x + w]


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--video", required=True, help="your clip (vertical 9:16 recommended)")
    ap.add_argument("--poster", required=True, help="image that appears on the wall")
    ap.add_argument("--switch-time", type=float, required=True,
                    help="second at which your hand touches the switch")
    ap.add_argument("--out", default="reveal.mp4")
    ap.add_argument("--toggle-pos", type=fractions(3), default=[0.5, 0.183, 0.21],
                    help="centre x, centre y, width of the toggle as frame fractions")
    ap.add_argument("--poster-box", type=fractions(4), default=[0.128, 0.23, 0.744, 0.594],
                    help="x,y,w,h of the poster as frame fractions")
    ap.add_argument("--audio", help="optional music track to use instead of the clip's own sound")
    ap.add_argument("--no-matte", action="store_true",
                    help="skip segmentation; poster/toggle drawn over you")
    ap.add_argument("--model", default=os.path.join(HERE, "selfie_multiclass.tflite"))
    args = ap.parse_args()

    cap = cv2.VideoCapture(args.video)
    if not cap.isOpened():
        raise SystemExit(f"cannot open {args.video}")
    fps = cap.get(cv2.CAP_PROP_FPS) or 30
    W = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
    H = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))

    tcx, tcy, tw = args.toggle_pos
    tcx, tcy, tw = int(tcx * W), int(tcy * H), int(tw * W)
    px, py, pw, ph = args.poster_box
    px, py, pw, ph = int(px * W), int(py * H), int(pw * W), int(ph * H)

    poster = cv2.imread(args.poster, cv2.IMREAD_COLOR)
    if poster is None:
        raise SystemExit(f"cannot read {args.poster}")
    poster = fit_cover(poster, pw, ph)

    segmenter = None
    if not args.no_matte:
        opts = vision.ImageSegmenterOptions(
            base_options=BaseOptions(model_asset_path=ensure_model(args.model)),
            running_mode=vision.RunningMode.VIDEO,
            output_confidence_masks=True)
        segmenter = vision.ImageSegmenter.create_from_options(opts)

    tmp = tempfile.mkdtemp()
    silent = os.path.join(tmp, "video.mp4")
    enc = subprocess.Popen(
        ["ffmpeg", "-v", "error", "-y", "-f", "rawvideo", "-pix_fmt", "bgr24",
         "-s", f"{W}x{H}", "-r", str(fps), "-i", "-",
         "-c:v", "libx264", "-pix_fmt", "yuv420p", "-crf", "18", silent],
        stdin=subprocess.PIPE)

    i = 0
    while True:
        ok, frame = cap.read()
        if not ok:
            break
        t = i / fps
        original = frame.copy()
        progress = float(np.clip((t - args.switch_time) / FLIP_SECONDS, 0, 1))

        if t >= args.switch_time:
            frame[py:py + ph, px:px + pw] = poster
        draw_toggle(frame, tcx, tcy, tw, progress)

        if segmenter is not None:
            rgb = mp.Image(image_format=mp.ImageFormat.SRGB,
                           data=cv2.cvtColor(original, cv2.COLOR_BGR2RGB))
            res = segmenter.segment_for_video(rgb, int(t * 1000))
            person = 1.0 - res.confidence_masks[0].numpy_view()   # mask 0 = background
            person = cv2.resize(person, (W, H))
            person = cv2.GaussianBlur(np.clip((person - 0.3) / 0.4, 0, 1), (5, 5), 0)[..., None]
            frame = (original * person + frame * (1 - person)).astype(np.uint8)

        enc.stdin.write(frame.tobytes())
        i += 1

    cap.release()
    enc.stdin.close()
    enc.wait()

    # Mux audio: chosen track, else the clip's own sound (if any).
    audio_src = args.audio or args.video
    subprocess.run(
        ["ffmpeg", "-v", "error", "-y", "-i", silent, "-i", audio_src,
         "-map", "0:v", "-map", "1:a?", "-c:v", "copy", "-c:a", "aac", "-shortest", args.out],
        check=True)
    print(f"Done: {args.out} ({i} frames, switch at {args.switch_time}s)")


if __name__ == "__main__":
    main()
