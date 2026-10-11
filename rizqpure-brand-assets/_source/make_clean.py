"""Step 1: pdftocairo -svg original-print-artwork.pdf art.svg && python3 make_clean.py
Removes the cyan dieline/dimension guides, keeping the navy panels they outline."""
from lxml import etree
t = etree.parse('art.svg'); r = t.getroot()
G = ('rgb(0%, 63.529968%, 91.372681%)', 'rgb(0%, 43.136597%, 70.980835%)')
for el in list(r.iter()):
    if not isinstance(el.tag, str): continue
    f, s = el.get('fill'), el.get('stroke')
    if f in G: el.getparent().remove(el); continue
    if s in G:
        if f and f != 'none':
            for a in ('stroke', 'stroke-width', 'stroke-linecap', 'stroke-linejoin', 'stroke-opacity', 'stroke-miterlimit', 'stroke-dasharray'):
                el.attrib.pop(a, None)
        else:
            el.getparent().remove(el)
t.write('clean.svg')
