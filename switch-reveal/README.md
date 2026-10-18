# Switch reveal

Recreates the "light switch" reveal: you walk to a blank wall and tap an
imaginary switch. A phone-style toggle on the wall flips green and your
poster appears behind you.

## 1. Film it (≈10 s, vertical)

- Phone on a tripod, **9:16 vertical**, locked exposure/focus, don't move the camera.
- Plain light wall, nothing on it, about 3 m from the camera.
- Imaginary switch: about **18% down from the top of the frame, centred**. The poster
  fills roughly the middle 75% × 60% of the frame below it.
- Action (copy the original's timing):
  - 0–1 s: walk in from the side and face the wall.
  - 1–4.5 s: stretch up and reach for the switch spot. Go on tip-toe at the end.
  - ~4.7 s: **tap**. Hold for a beat.
  - 5–9 s: turn around, look at the poster, and walk out of frame.
- Note the second your finger touches the wall. That's `--switch-time`.

## 2. Make your poster

Any image works (PNG/JPG). Portrait, about 3:4. It's scaled and cropped to fill the box.

## 3. Render

```bash
pip install mediapipe opencv-python-headless   # once (Linux may also need: apt install libegl1)
python3 switch_reveal.py --video me.mp4 --poster poster.png --switch-time 4.7 --out reveal.mp4
```

Options:
- `--audio song.mp3` swaps in a music track.
- `--toggle-pos 0.5,0.183,0.21` sets the toggle's centre x, centre y and width as fractions of the frame.
- `--poster-box 0.128,0.23,0.744,0.594` sets the poster's x, y, w and h as fractions of the frame.
- `--no-matte` draws the toggle and poster over you instead of behind you.

The segmentation model downloads automatically on first run.
