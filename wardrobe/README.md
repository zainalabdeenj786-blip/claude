# Wardrobe redesign: matt black doors, walnut decor carcass

Finish: **walnut woodgrain decor** from the client's sample (`swatch_walnut_decor.webp`, product code to confirm) on the end panels, top and plinth. Doors stay matt black.

| File | What it is |
|---|---|
| `redesign_walnut_decor_frame_HD.jpg` | Room photo with the new carcass, 3× upscaled (2112 × 4602) |
| `redesign_walnut_decor_frame.jpg` | Same, at the original photo size |
| `before_after_walnut.png` | Original vs redesign, side by side |
| `renders/3d_*.jpg` | 4K (3840 × 2160) stills of the 3D model: photo angle, front, right run, end panel, doors open |
| `mockup.html` | Interactive 3D model (built from `mockup_src.html` by `build_mockup.py`) |
| `redesign_tobacco_gladstone_oak_frame*.jpg`, `before_after_tobacco.png` | Earlier option in H3325 ST28 Tobacco Gladstone Oak |
| `redesign_casella_oak_frame*.jpg` | Earlier option in H1369 ST40 Marone Casella Oak |

3D model sizes are estimated from the photo (2400 mm high, 600 mm deep, 500 mm doors). Confirm on site.

Regenerate: `python3 recolor.py <scale> <walnut|tobacco|casella>`, `python3 build_mockup.py`, `node render_stills.mjs renders` (with `LIBDIR` pointing at local copies of three.min.js and OrbitControls.js).
