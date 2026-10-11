import re, copy
from lxml import etree
NS='http://www.w3.org/2000/svg'; XL='http://www.w3.org/1999/xlink'
NUM=re.compile(r'-?\d*\.?\d+(?:e-?\d+)?')
def mat(s):
    if not s: return (1,0,0,1,0,0)
    m=re.match(r'matrix\(([^)]*)\)',s)
    return tuple(float(x) for x in re.split(r'[ ,]+',m.group(1).strip()))
def mul(a,b):
    return (a[0]*b[0]+a[2]*b[1], a[1]*b[0]+a[3]*b[1], a[0]*b[2]+a[2]*b[3], a[1]*b[2]+a[3]*b[3], a[0]*b[4]+a[2]*b[5]+a[4], a[1]*b[4]+a[3]*b[5]+a[5])
def pts(d):
    n=[float(x) for x in NUM.findall(d)]
    return list(zip(n[0::2],n[1::2]))
def bbox(el, M=(1,0,0,1,0,0)):
    M=mul(M,mat(el.get('transform')))
    tag=etree.QName(el).localname
    P=[]
    if tag=='path':
        for x,y in pts(el.get('d','')):
            P.append((M[0]*x+M[2]*y+M[4], M[1]*x+M[3]*y+M[5]))
    elif tag=='image':
        w,h=float(el.get('width')),float(el.get('height'))
        for x,y in ((0,0),(w,0),(0,h),(w,h)): P.append((M[0]*x+M[2]*y+M[4], M[1]*x+M[3]*y+M[5]))
    elif tag=='use':
        ref=el.getroottree().getroot().find('.//*[@id="%s"]'%el.get('{%s}href'%XL)[1:])
        b=bbox(ref,M); 
        if b: P+= [(b[0],b[1]),(b[2],b[3])]
    for c in el:
        if isinstance(c.tag,str):
            b=bbox(c,M)
            if b: P+= [(b[0],b[1]),(b[2],b[3])]
    if not P: return None
    xs,ys=zip(*P); return (min(xs),min(ys),max(xs),max(ys))
def load(path): return etree.parse(path).getroot()
def items(root):
    return [(c,bbox(c)) for c in root if isinstance(c.tag,str) and etree.QName(c).localname!='defs']
def refs(el):
    s=set()
    for e in el.iter():
        if not isinstance(e.tag,str): continue
        for k,v in e.attrib.items():
            for m in re.findall(r'url\(#([^)]+)\)',v): s.add(m)
            if k=='{%s}href'%XL and v.startswith('#'): s.add(v[1:])
    return s
def build(root, keep, viewbox, extra_defs=None, extra_back=None, extra_front=None, width=None):
    """keep: list of top-level elements to copy (in order)."""
    svg=etree.Element('{%s}svg'%NS, nsmap={None:NS,'xlink':XL})
    x,y,w,h=viewbox
    svg.set('viewBox','%g %g %g %g'%(x,y,w,h))
    svg.set('width','%g'%(width or w)); svg.set('height','%g'%((width or w)*h/w))
    defs=etree.SubElement(svg,'{%s}defs'%NS)
    if extra_defs is not None:
        for e in etree.fromstring('<g xmlns="%s" xmlns:xlink="%s">%s</g>'%(NS,XL,extra_defs)): defs.append(e)
    body=[copy.deepcopy(e) for e in keep]
    # collect defs transitively
    srcdefs=root.find('{%s}defs'%NS); byid={d.get('id'):d for d in srcdefs.iter() if isinstance(d.tag,str) and d.get('id')}
    need=set(); todo=set().union(*[refs(e) for e in body]) if body else set()
    while todo:
        i=todo.pop()
        if i in need or i not in byid: continue
        need.add(i); todo|=refs(byid[i])-need
    for d in srcdefs:
        if d.get('id') in need: defs.append(copy.deepcopy(d))
    def add(frag):
        if frag:
            for e in etree.fromstring('<g xmlns="%s" xmlns:xlink="%s">%s</g>'%(NS,XL,frag)): svg.append(e)
    add(extra_back)
    for e in body: svg.append(e)
    add(extra_front)
    return svg
def write(svg,path):
    s=etree.tostring(svg,xml_declaration=True,encoding='UTF-8').decode()
    # trim float precision to shrink files
    s=re.sub(r' d="[^"]*"', lambda m: re.sub(r'(\d+\.\d{2})\d+',r'\1',m.group(0)), s)
    open(path,'w').write(s)
