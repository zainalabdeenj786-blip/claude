"""Build RizqPure vector assets from the cleaned CorelDRAW print artwork."""
import sys, os, re, copy, colorsys
sys.path.insert(0, os.path.dirname(__file__))
from svglib import *

OUT = sys.argv[1]
os.makedirs(OUT + '/svg', exist_ok=True)
root = load(os.path.join(os.path.dirname(__file__), 'clean.svg'))
IT = items(root)
SRCDEFS = root.find('{%s}defs' % NS)
BYID = {d.get('id'): d for d in SRCDEFS.iter() if isinstance(d.tag, str) and d.get('id')}
NAVY_FILL = 'rgb(0.392151%, 10.588074%, 28.234863%)'
NAVY = '#011B48'

def within(b, box):
    return b and b[0] >= box[0] - 1 and b[1] >= box[1] - 1 and b[2] <= box[2] + 1 and b[3] <= box[3] + 1

panels = [(e, b) for e, b in IT if e.get('fill') == NAVY_FILL]
FRONT = [b for e, b in panels if b[0] < 620 and b[3] - b[1] > 600][0]
BACK = [b for e, b in panels if b[0] > 620][0]
PW, PH = FRONT[2] - FRONT[0], FRONT[3] - FRONT[1]
MM = PW / 160.0
R = 14.2

front_els = [e for e, b in IT if within(b, FRONT)]
back_els = [e for e, b in IT if within(b, BACK)]
idx = {id(e): i for i, (e, b) in enumerate(IT)}
logo_els = [e for e, b in IT if 4 <= idx[id(e)] <= 248]
wordmark_els = [e for e, b in IT if 4 <= idx[id(e)] <= 18]
headline_els = [e for e, b in IT if idx[id(e)] in (405, 406)]
tagline_els = [e for e, b in IT if idx[id(e)] == 407]
LOGO_BOX = (204, 352, 557, 541)  # visual bounds of logo (from render)


def fmt(c):
    return '#%02X%02X%02X' % tuple(max(0, min(255, round(v))) for v in c)

def parse(c):
    m = re.match(r'rgb\(([\d.]+)%, ([\d.]+)%, ([\d.]+)%\)', c or '')
    if m: return tuple(float(x) * 2.55 for x in m.groups())
    m = re.match(r'rgb\(([\d.]+), ([\d.]+), ([\d.]+)\)', c or '')
    if m: return tuple(float(x) for x in m.groups())
    return None


class Doc:
    """Accumulates defs + body, pulling source defs on demand."""
    def __init__(self, vb, width=None, title=None):
        self.svg = etree.Element('{%s}svg' % NS, nsmap={None: NS, 'xlink': XL})
        x, y, w, h = vb
        self.svg.set('viewBox', '%g %g %g %g' % vb)
        self.svg.set('width', '%g' % round(width or w, 2))
        self.svg.set('height', '%g' % round((width or w) * h / w, 2))
        if title:
            t = etree.SubElement(self.svg, '{%s}title' % NS); t.text = title
        self.defs = etree.SubElement(self.svg, '{%s}defs' % NS)
        self.have = set()
        self.recolor = None

    def frag(self, s, parent):
        for e in etree.fromstring('<g xmlns="%s" xmlns:xlink="%s">%s</g>' % (NS, XL, s)):
            parent.append(e)

    def adddefs(self, s): self.frag(s, self.defs)
    def add(self, s): self.frag(s, self.svg)

    def pull(self, els):
        todo = set().union(*[refs(e) for e in els]) if els else set()
        while todo:
            i = todo.pop()
            if i in self.have or i not in BYID: continue
            self.have.add(i)
            d = copy.deepcopy(BYID[i])
            if self.recolor: apply_recolor(d, self.recolor)
            self.defs.append(d)
            todo |= refs(BYID[i]) - self.have

    def group(self, els, gid=None, transform=None, into=None, recolor=None):
        g = etree.SubElement(into if into is not None else self.svg, '{%s}g' % NS)
        if gid: g.set('id', gid)
        if transform: g.set('transform', transform)
        sfx = '-rc%d' % (abs(hash(recolor)) % 100000) if recolor else ''
        for e in els:
            c = copy.deepcopy(e)
            if recolor:
                apply_recolor(c, recolor)
                for x in c.iter():
                    if isinstance(x.tag, str) and x.get('fill', '').startswith('url(#'):
                        gid_ = x.get('fill')[5:-1]
                        if 'Gradient' in etree.QName(BYID[gid_]).localname: x.set('fill', 'url(#%s%s)' % (gid_, sfx))
            g.append(c)
        if recolor:
            for e in els:
                for x in e.iter():
                    if isinstance(x.tag, str) and x.get('fill', '').startswith('url(#'):
                        gid_ = x.get('fill')[5:-1]
                        if 'Gradient' in etree.QName(BYID[gid_]).localname and gid_ + sfx not in self.have:
                            self.have.add(gid_ + sfx)
                            gd = copy.deepcopy(BYID[gid_]); gd.set('id', gid_ + sfx)
                            apply_recolor(gd, recolor); self.defs.append(gd)
        saved, self.recolor = self.recolor, None
        self.pull(els)
        self.recolor = saved
        return g

    def save(self, name):
        write(self.svg, os.path.join(OUT, 'svg', name))


def apply_recolor(el, fn):
    for e in el.iter():
        if not isinstance(e.tag, str): continue
        for k in ('fill', 'stroke', 'stop-color'):
            c = parse(e.get(k))
            if c is not None: e.set(k, fn(c))


# ---------------------------------------------------------------- logos
def logo_doc(name, title, recolor=None, bg=None, pad=18):
    x0, y0, x1, y1 = LOGO_BOX
    vb = (x0 - pad, y0 - pad, x1 - x0 + 2 * pad, y1 - y0 + 2 * pad)
    d = Doc(vb, width=1200, title=title)
    d.recolor = recolor
    if bg:
        d.add('<rect x="%g" y="%g" width="%g" height="%g" fill="%s"/>' % (vb + (bg,)))
    d.group(logo_els, recolor=recolor)
    d.save(name)

WORD = parse('rgb(89.411926%, 86.66687%, 85.882568%)')
def is_word(c): return all(abs(a - b) < 1 for a, b in zip(c, WORD))

def for_light(c):
    if is_word(c): return NAVY
    h, l, s = colorsys.rgb_to_hls(*(v / 255 for v in c))
    # darken the pale silver/champagne end of the ribbon so it holds up on white
    l2 = min(l, 0.36 + 0.55 * (l - 0.35)) if l > 0.35 else l
    s2 = max(s, 0.35)
    if s < 0.3 or l > 0.6: h = 0.105  # pull pale silver toward the brand gold instead of tinting pink
    return fmt(tuple(v * 255 for v in colorsys.hls_to_rgb(h, l2, s2)))

logo_doc('logo-color-on-dark-transparent.svg', 'RizqPure logo – for dark backgrounds')
logo_doc('logo-color-on-navy.svg', 'RizqPure logo on navy', bg=NAVY, pad=40)
logo_doc('logo-color-on-light-transparent.svg', 'RizqPure logo – for light backgrounds', recolor=for_light)
logo_doc('logo-mono-white.svg', 'RizqPure logo – white', recolor=lambda c: '#FFFFFF')
logo_doc('logo-mono-navy.svg', 'RizqPure logo – navy', recolor=lambda c: NAVY)
logo_doc('logo-mono-gold.svg', 'RizqPure logo – gold', recolor=lambda c: '#B8945C')
logo_doc('logo-mono-black.svg', 'RizqPure logo – black', recolor=lambda c: '#000000')

# ---------------------------------------------------------------- flat panels
def flat(name, box, els, title):
    d = Doc((box[0], box[1], box[2] - box[0], box[3] - box[1]), width=1600, title=title)
    d.group(els)
    d.save(name)

flat('pouch-front-artwork-flat.svg', FRONT, front_els, 'RizqPure pouch – front artwork (flat)')
flat('pouch-back-artwork-flat.svg', BACK, back_els, 'RizqPure pouch – back artwork (flat)')

# ---------------------------------------------------------------- 3D-shaded pouch
W, H = PW, PH
SEAL = 15 * MM; NOTCH = 20 * MM; ZIP = 33 * MM; SIDE = 7.5 * MM

def pouch_defs(d):
    rr = 'M%g,0 H%g Q%g,0 %g,%g V%g Q%g,%g %g,%g H%g Q0,%g 0,%g V%g Q0,0 %g,0 Z' % (
        R, W - R, W, W, R, H - R, W, H, W - R, H, R, H, H - R, R, R)
    notch = 'M-1,{a} L7,{b} L-1,{c} Z M{w1},{a} L{w7},{b} L{w1},{c} Z'.format(
        a=NOTCH - 5, b=NOTCH, c=NOTCH + 5, w1=W + 1, w7=W - 7)
    d.adddefs(f'''
<path id="pouch-shape" d="{rr}"/>
<mask id="pouch-mask" maskUnits="userSpaceOnUse" x="-2" y="-2" width="{W+4}" height="{H+4}">
  <use xlink:href="#pouch-shape" fill="#fff"/><path d="{notch}" fill="#000"/>
</mask>
<linearGradient id="sh-x" x1="0" y1="0" x2="1" y2="0">
  <stop offset="0" stop-color="#000" stop-opacity=".55"/>
  <stop offset=".035" stop-color="#000" stop-opacity=".22"/>
  <stop offset=".12" stop-color="#fff" stop-opacity=".02"/>
  <stop offset=".24" stop-color="#fff" stop-opacity=".10"/>
  <stop offset=".36" stop-color="#fff" stop-opacity="0"/>
  <stop offset=".72" stop-color="#000" stop-opacity="0"/>
  <stop offset=".93" stop-color="#000" stop-opacity=".22"/>
  <stop offset="1" stop-color="#000" stop-opacity=".55"/>
</linearGradient>
<linearGradient id="sh-y" x1="0" y1="0" x2="0" y2="1">
  <stop offset="0" stop-color="#fff" stop-opacity=".06"/>
  <stop offset=".07" stop-color="#fff" stop-opacity="0"/>
  <stop offset=".80" stop-color="#000" stop-opacity="0"/>
  <stop offset=".955" stop-color="#000" stop-opacity=".22"/>
  <stop offset="1" stop-color="#000" stop-opacity=".45"/>
</linearGradient>
<linearGradient id="zip-shadow" x1="0" y1="0" x2="0" y2="1">
  <stop offset="0" stop-color="#000" stop-opacity=".30"/>
  <stop offset="1" stop-color="#000" stop-opacity="0"/>
</linearGradient>
<radialGradient id="sheen" cx=".3" cy=".42" r=".55" gradientTransform="translate(.3 .42) scale(.75 1.25) translate(-.3 -.42)">
  <stop offset="0" stop-color="#fff" stop-opacity=".09"/>
  <stop offset="1" stop-color="#fff" stop-opacity="0"/>
</radialGradient>
<pattern id="seal-ribs" width="6" height="2.2" patternUnits="userSpaceOnUse">
  <rect width="6" height="1" fill="#fff" fill-opacity=".045"/>
</pattern>
<linearGradient id="silver-foil" gradientUnits="userSpaceOnUse" x1="60" y1="185" x2="370" y2="280">
  <stop offset="0" stop-color="#C9CBD3"/><stop offset=".22" stop-color="#F7F7FA"/>
  <stop offset=".45" stop-color="#A9ACB8"/><stop offset=".62" stop-color="#ECEDF2"/>
  <stop offset=".85" stop-color="#B7B9C4"/><stop offset="1" stop-color="#E6E7EC"/>
</linearGradient>
<radialGradient id="pillow" cx=".42" cy=".42" r=".72">
  <stop offset=".55" stop-color="#000" stop-opacity="0"/>
  <stop offset=".85" stop-color="#000" stop-opacity=".16"/>
  <stop offset="1" stop-color="#000" stop-opacity=".38"/>
</radialGradient>
<linearGradient id="key-light" x1="0" y1="0" x2="1" y2="1">
  <stop offset="0" stop-color="#fff" stop-opacity=".13"/>
  <stop offset=".45" stop-color="#fff" stop-opacity="0"/>
  <stop offset=".7" stop-color="#000" stop-opacity="0"/>
  <stop offset="1" stop-color="#000" stop-opacity=".22"/>
</linearGradient>
<filter id="matte-grain" x="0" y="0" width="100%" height="100%">
  <feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="2" seed="7" result="n"/>
  <feColorMatrix in="n" type="matrix" values="0 0 0 0 .5  0 0 0 0 .5  0 0 0 0 .5  0 0 0 .9 -.35"/>
  <feComposite operator="in" in2="SourceGraphic"/>
</filter>
<filter id="soft-shadow" x="-30%" y="-300%" width="160%" height="700%"><feGaussianBlur stdDeviation="9"/></filter>
<filter id="contact-shadow" x="-30%" y="-300%" width="160%" height="700%"><feGaussianBlur stdDeviation="2.5"/></filter>
''')

def overlays():
    gus = H - 22
    return f'''
<rect width="{W}" height="{SEAL}" fill="url(#seal-ribs)"/>
<rect y="{SEAL-0.6}" width="{W}" height="1.2" fill="#000" fill-opacity=".30"/>
<rect y="{SEAL+0.6}" width="{W}" height="0.8" fill="#fff" fill-opacity=".10"/>
<rect y="{ZIP-3}" width="{W}" height="1.4" fill="#000" fill-opacity=".35"/>
<rect y="{ZIP-1.6}" width="{W}" height="1.6" fill="#fff" fill-opacity=".13"/>
<rect y="{ZIP}" width="{W}" height="1.6" fill="#000" fill-opacity=".40"/>
<rect y="{ZIP+1.6}" width="{W}" height="1.2" fill="#fff" fill-opacity=".08"/>
<rect y="{ZIP+2.8}" width="{W}" height="22" fill="url(#zip-shadow)"/>
<rect x="{SIDE}" y="{SEAL}" width="0.9" height="{H-SEAL}" fill="#000" fill-opacity=".14"/>
<rect x="{W-SIDE-0.9}" y="{SEAL}" width="0.9" height="{H-SEAL}" fill="#000" fill-opacity=".14"/>
<path d="M{SIDE},{gus-6} C{W*0.3},{gus+12} {W*0.7},{gus+12} {W-SIDE},{gus-6}" fill="none" stroke="#fff" stroke-opacity=".10" stroke-width="1.6"/>
<path d="M{SIDE},{gus-4} C{W*0.3},{gus+14} {W*0.7},{gus+14} {W-SIDE},{gus-4}" fill="none" stroke="#000" stroke-opacity=".25" stroke-width="1.4"/>
<rect width="{W}" height="{H}" fill="url(#sheen)" opacity="{.45 if PRINT else 1}"/>
{'<rect width="%g" height="%g" fill="url(#key-light)"/><rect width="%g" height="%g" fill="url(#pillow)"/><rect width="%g" height="%g" fill="#fff" filter="url(#matte-grain)" opacity=".10"/>' % (W, H, W, H, W, H) if PRINT else ''}
<rect width="{W}" height="{H}" fill="url(#sh-x)"/>
<rect width="{W}" height="{H}" fill="url(#sh-y)"/>
<use xlink:href="#pouch-shape" fill="none" stroke="#000" stroke-opacity=".55" stroke-width="1.2"/>
'''

def shadow_svg(cx, by, w, scale=1.0):
    return (f'<ellipse cx="{cx}" cy="{by+3}" rx="{w*0.56}" ry="{11*scale}" fill="#000" fill-opacity=".38" filter="url(#soft-shadow)"/>'
            f'<ellipse cx="{cx}" cy="{by}" rx="{w*0.47}" ry="{2.6*scale}" fill="#000" fill-opacity=".55" filter="url(#contact-shadow)"/>')

PRINT = os.environ.get('PRINT', '1') == '1'
PRINT_NAVY = (44, 47, 102)         # #2C2F66 – sampled from photos of the printed matte pouch
SILVER_KEY = '#E4DDDC'
def print_recolor(c):
    if abs(c[0] - 1) < 3 and abs(c[1] - 27) < 3 and abs(c[2] - 72) < 3: return fmt(PRINT_NAVY)
    if is_word(c): return SILVER_KEY
    if min(c) > 245: return '#F1F1F5'
    if c[0] > c[2] + 40 and c[0] > 120:   # gold inks print a touch lighter/warmer on matte film
        return fmt(tuple(min(255, v * 1.08 + 6) for v in c))
    return fmt(c)

def pouch_symbol(d, side, gid):
    box, els = (FRONT, front_els) if side == 'front' else (BACK, back_els)
    g = etree.SubElement(d.defs, '{%s}g' % NS); g.set('id', gid)
    inner = etree.SubElement(g, '{%s}g' % NS); inner.set('mask', 'url(#pouch-mask)')
    if PRINT:
        g2 = d.group(els, transform='translate(%g %g)' % (-box[0], -box[1]), into=inner, recolor=print_recolor)
        for x in g2.iter():
            if isinstance(x.tag, str) and x.get('fill') == SILVER_KEY: x.set('fill', 'url(#silver-foil)')
    else:
        d.group(els, transform='translate(%g %g)' % (-box[0], -box[1]), into=inner)
    d.frag(overlays(), inner)

def single(name, side, shadow=True, title=''):
    pad = 28
    d = Doc((-pad, -pad, W + 2 * pad, H + 2 * pad + (24 if shadow else 0)), width=1400, title=title)
    pouch_defs(d)
    pouch_symbol(d, side, 'pouch')
    if shadow: d.add(shadow_svg(W / 2, H, W))
    d.add('<use xlink:href="#pouch"/>')
    d.save(name)

single('pouch-front-3d.svg', 'front', True, 'RizqPure pouch – front (with shadow)')
single('pouch-front-3d-no-shadow.svg', 'front', False, 'RizqPure pouch – front')
single('pouch-back-3d.svg', 'back', True, 'RizqPure pouch – back (with shadow)')

def multi(name, layout, title, extra_w=0):
    """layout: list of (side, x, y_bottom, scale, dim) back-to-front."""
    xs = [x for _, x, _, s, _ in layout] + [x + W * s for _, x, _, s, _ in layout]
    ys = [yb - H * s for _, _, yb, s, _ in layout] + [yb for _, _, yb, _, _ in layout]
    pad = 30
    vb = (min(xs) - pad, min(ys) - pad, max(xs) - min(xs) + 2 * pad, max(ys) - min(ys) + 2 * pad + 22)
    d = Doc(vb, width=2000, title=title)
    pouch_defs(d)
    for side in sorted({l[0] for l in layout}):
        pouch_symbol(d, side, 'pouch-' + side)
    for side, x, yb, s, dim in layout:
        d.add(shadow_svg(x + W * s / 2, yb, W * s, s))
        d.add(f'<use xlink:href="#pouch-{side}" transform="translate({x} {yb - H*s}) scale({s})"/>')
        if dim:
            d.add(f'<path d="M{x+R*s},{yb-H*s} H{x+(W-R)*s} Q{x+W*s},{yb-H*s} {x+W*s},{yb-(H-R)*s} V{yb-R*s} '
                  f'Q{x+W*s},{yb} {x+(W-R)*s},{yb} H{x+R*s} Q{x},{yb} {x},{yb-R*s} V{yb-(H-R)*s} Q{x},{yb-H*s} {x+R*s},{yb-H*s} Z" '
                  f'fill="#000" fill-opacity="{dim}"/>')
    d.save(name)

multi('pouch-duo-front.svg', [('front', 0, H, 1, 0), ('front', W + 40, H, 1, 0)], 'RizqPure – two pouches')
multi('pouch-front-and-back.svg', [('back', W * 0.62, H - 14, 0.94, 0.12), ('front', 0, H, 1, 0)], 'RizqPure – front and back')
multi('pouch-trio.svg', [('front', 0, H - 10, 0.86, 0.16), ('front', W * 1.02, H - 10, 0.86, 0.16),
                         ('front', W * 0.43, H + 18, 1, 0)], 'RizqPure – pouch trio')

# ---------------------------------------------------------------- type lockups (from pack's outlined lettering)
def lockup(name, els, title, recolor=None, pad=12):
    bs = [bbox(e) for e in els]
    x0, y0 = min(b[0] for b in bs), min(b[1] for b in bs)
    x1, y1 = max(b[2] for b in bs), max(b[3] for b in bs)
    d = Doc((x0 - pad, y0 - pad, x1 - x0 + 2 * pad, y1 - y0 + 2 * pad), width=1600, title=title)
    d.recolor = recolor
    d.group(els, recolor=recolor)
    d.save(name)

lockup('text-halal-collagen-protein-white.svg', headline_els, 'Halal Collagen Protein – white')
lockup('text-halal-collagen-protein-navy.svg', headline_els, 'Halal Collagen Protein – navy', recolor=lambda c: NAVY)
lockup('text-tagline-white.svg', tagline_els, 'Supports Skin, Hair & Nail Vitality – white')
lockup('text-tagline-navy.svg', tagline_els, 'Supports Skin, Hair & Nail Vitality – navy', recolor=lambda c: NAVY)

# ---------------------------------------------------------------- marketing layouts (vector, with background)
def marketing(name, size, bgkind, title, place_pouches, place_text):
    Wc, Hc = size
    d = Doc((0, 0, Wc, Hc), width=Wc, title=title)
    pouch_defs(d)
    pouch_symbol(d, 'front', 'pouch-front')
    if bgkind == 'navy':
        d.adddefs('<radialGradient id="bg" cx=".68" cy=".45" r=".85"><stop offset="0" stop-color="#3A3E86"/>'
                  '<stop offset=".55" stop-color="#24285E"/><stop offset="1" stop-color="#121433"/></radialGradient>'
                  '<radialGradient id="glow" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#E9C27A" stop-opacity=".28"/>'
                  '<stop offset="1" stop-color="#E9C27A" stop-opacity="0"/></radialGradient>')
        d.add(f'<rect width="{Wc}" height="{Hc}" fill="url(#bg)"/>')
    elif bgkind == 'cream':
        d.adddefs('<linearGradient id="bg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FBF7F0"/>'
                  '<stop offset="1" stop-color="#EFE5D3"/></linearGradient>'
                  '<radialGradient id="glow" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#fff" stop-opacity=".9"/>'
                  '<stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient>')
        d.add(f'<rect width="{Wc}" height="{Hc}" fill="url(#bg)"/>')
    else:
        d.add(f'<rect width="{Wc}" height="{Hc}" fill="#FFFFFF"/>')
    place_pouches(d, Wc, Hc)
    place_text(d, Wc, Hc)
    d.save(name)

def put_pouch(d, x, yb, s, dim=0):
    d.add(shadow_svg(x + W * s / 2, yb, W * s, s))
    d.add(f'<use xlink:href="#pouch-front" transform="translate({x:.1f} {yb - H*s:.1f}) scale({s:.4f})"/>')
    if dim:
        d.add(f'<rect x="{x}" y="{yb-H*s}" width="{W*s}" height="{H*s}" rx="{R*s}" fill="#000" fill-opacity="{dim}"/>')

def put_els(d, els, box, x, y, w, recolor=None):
    s = w / (box[2] - box[0])
    d.group(els, transform='translate(%.2f %.2f) scale(%.5f) translate(%.2f %.2f)' % (x, y, s, -box[0], -box[1]), recolor=recolor)
    return (box[3] - box[1]) * s

def ebox(els):
    bs = [bbox(e) for e in els]
    return (min(b[0] for b in bs), min(b[1] for b in bs), max(b[2] for b in bs), max(b[3] for b in bs))

HEAD, TAG = ebox(headline_els), ebox(tagline_els)
SUB_ELS = [e for e, b in IT if idx[id(e)] in (401, 402, 403, 404)]
SUB = ebox(SUB_ELS)
GOLD_LINE = '#C9A35E'

def text_stack(d, x, y, w, light=False, center=False):
    rc = (lambda c: NAVY) if light else None
    def cx(width): return x + (w - width) / 2 if center else x
    lw = w
    lh = (LOGO_BOX[3] - LOGO_BOX[1]) * lw / (LOGO_BOX[2] - LOGO_BOX[0])
    d.recolor = for_light if light else None
    put_els(d, logo_els, LOGO_BOX, cx(lw), y, lw, recolor=for_light if light else None)
    y += lh + w * 0.08
    tw = w * 0.82
    y += put_els(d, tagline_els, TAG, cx(tw), y, tw, recolor=rc) + w * 0.05
    hw = w * 0.98
    y += put_els(d, headline_els, HEAD, cx(hw), y, hw, recolor=rc) + w * 0.05
    d.add(f'<rect x="{cx(hw)}" y="{y}" width="{hw}" height="{max(1.5, w/300)}" fill="{GOLD_LINE}"/>')
    y += w * 0.035
    sw = hw * 0.86
    y += put_els(d, SUB_ELS, SUB, cx(sw), y, sw, recolor=rc) + w * 0.035
    d.add(f'<rect x="{cx(hw)}" y="{y}" width="{hw}" height="{max(1.5, w/300)}" fill="{GOLD_LINE}"/>')
    d.recolor = None
    return y

marketing('web-hero-1920x1080.svg', (1920, 1080), 'navy', 'RizqPure – website hero',
          lambda d, Wc, Hc: (d.add(f'<ellipse cx="1330" cy="560" rx="620" ry="470" fill="url(#glow)"/>'),
                             put_pouch(d, 980, 950, 1.02, .18), put_pouch(d, 1330, 950, 1.02, .18),
                             put_pouch(d, 1110, 990, 1.18)),
          lambda d, Wc, Hc: text_stack(d, 150, 250, 640))
marketing('social-square-1080x1080-navy.svg', (1080, 1080), 'navy', 'RizqPure – square post (navy)',
          lambda d, Wc, Hc: (d.add(f'<ellipse cx="540" cy="560" rx="520" ry="460" fill="url(#glow)"/>'),
                             put_pouch(d, 170, 960, 1.0, .15), put_pouch(d, 456, 960, 1.0, .15),
                             put_pouch(d, 300, 1000, 1.1)),
          lambda d, Wc, Hc: None)
marketing('social-square-1080x1080-cream.svg', (1080, 1080), 'cream', 'RizqPure – square post (cream)',
          lambda d, Wc, Hc: (d.add(f'<ellipse cx="540" cy="600" rx="520" ry="440" fill="url(#glow)"/>'),
                             put_pouch(d, 300, 1000, 1.06)),
          lambda d, Wc, Hc: None)
marketing('social-story-1080x1920.svg', (1080, 1920), 'navy', 'RizqPure – story / reel cover',
          lambda d, Wc, Hc: (d.add(f'<ellipse cx="540" cy="1320" rx="560" ry="560" fill="url(#glow)"/>'),
                             put_pouch(d, 190, 1760, 1.0, .15), put_pouch(d, 436, 1760, 1.0, .15),
                             put_pouch(d, 286, 1800, 1.12)),
          lambda d, Wc, Hc: text_stack(d, 160, 130, 760, center=True))
marketing('og-share-1200x630.svg', (1200, 630), 'navy', 'RizqPure – link preview',
          lambda d, Wc, Hc: (d.add(f'<ellipse cx="880" cy="330" rx="380" ry="300" fill="url(#glow)"/>'),
                             put_pouch(d, 720, 590, 0.74, .15), put_pouch(d, 900, 590, 0.74, .15),
                             put_pouch(d, 790, 610, 0.84)),
          lambda d, Wc, Hc: text_stack(d, 80, 120, 470))
marketing('ecommerce-main-2000x2000-white.svg', (2000, 2000), 'white', 'RizqPure – store main image (white)',
          lambda d, Wc, Hc: put_pouch(d, (2000 - W * 2.55) / 2, 1820, 2.55),
          lambda d, Wc, Hc: None)
marketing('banner-light-1920x700.svg', (1920, 700), 'cream', 'RizqPure – light banner',
          lambda d, Wc, Hc: (d.add(f'<ellipse cx="1350" cy="360" rx="560" ry="330" fill="url(#glow)"/>'),
                             put_pouch(d, 1060, 640, 0.82), put_pouch(d, 1350, 640, 0.82)),
          lambda d, Wc, Hc: text_stack(d, 170, 110, 560, light=True))
print('done')

# ---------------------------------------------------------------- as-printed metallic logo
def metallic_logo(name, title, bg=None, pad=18):
    x0, y0, x1, y1 = LOGO_BOX
    vb = (x0 - pad, y0 - pad, x1 - x0 + 2 * pad, y1 - y0 + 2 * pad)
    d = Doc(vb, width=1200, title=title)
    d.adddefs('<linearGradient id="silver-foil" gradientUnits="userSpaceOnUse" x1="210" y1="420" x2="510" y2="505">'
              '<stop offset="0" stop-color="#C9CBD3"/><stop offset=".22" stop-color="#F7F7FA"/><stop offset=".45" stop-color="#A9ACB8"/>'
              '<stop offset=".62" stop-color="#ECEDF2"/><stop offset=".85" stop-color="#B7B9C4"/><stop offset="1" stop-color="#E6E7EC"/></linearGradient>')
    if bg:
        d.add('<rect x="%g" y="%g" width="%g" height="%g" fill="%s"/>' % (vb + (bg,)))
    g = d.group(logo_els, recolor=print_recolor)
    for x in g.iter():
        if isinstance(x.tag, str) and x.get('fill') == SILVER_KEY: x.set('fill', 'url(#silver-foil)')
    d.save(name)

metallic_logo('logo-metallic-as-printed-transparent.svg', 'RizqPure logo – metallic silver/gold as printed')
metallic_logo('logo-metallic-as-printed-on-navy.svg', 'RizqPure logo – metallic on printed navy', bg=fmt(PRINT_NAVY), pad=40)
