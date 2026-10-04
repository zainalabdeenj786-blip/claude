# Wardrobe redesign: matt black doors, Tobacco Gladstone Oak carcass

Finish: Egger **H3325 ST28 Tobacco Gladstone Oak** on the end panels, top and plinth. Doors stay matt black.

| File | What it is |
|---|---|
| `redesign_tobacco_gladstone_oak_frame_HD.jpg` | Room photo with the new carcass, 3× upscaled (2112 × 4602) |
| `redesign_tobacco_gladstone_oak_frame.jpg` | Same, at the original photo size |
| `before_after_tobacco.png` | Original vs redesign, side by side |
| `renders/3d_*.jpg` | 4K (3840 × 2160) stills of the 3D model: photo angle, front, right run, end panel, doors open |
| `mockup.html` | Interactive 3D model (built from `mockup_src.html` by `build_mockup.py`) |
| `redesign_casella_oak_frame*.jpg` | Earlier option in H1369 ST40 Marone Casella Oak |

3D model sizes are estimated from the photo (2400 mm high, 600 mm deep, 500 mm doors). Confirm on site.

Regenerate: `python3 recolor.py <scale> <tobacco|casella>`, `python3 build_mockup.py`, `node render_stills.mjs renders` (with `LIBDIR` pointing at local copies of three.min.js and OrbitControls.js).
