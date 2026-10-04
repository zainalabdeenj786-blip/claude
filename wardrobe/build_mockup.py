# Inline the oak texture and swatch as data URIs so the mockup is a single self-contained file.
import base64, cv2
def uri(img, q):
    ok, buf = cv2.imencode('.jpg', img, [cv2.IMWRITE_JPEG_QUALITY, q])
    return 'data:image/jpeg;base64,' + base64.b64encode(buf).decode()
oak = cv2.imread('oak_texture.jpg')
sw = cv2.imread('swatch_walnut_decor.webp')
sw = cv2.resize(sw, (240, 180), interpolation=cv2.INTER_AREA)
s = open('mockup_src.html').read().replace('__OAK__', uri(oak, 88)).replace('__SWATCH__', uri(sw, 85))
open('mockup.html', 'w').write(s)
print(len(s) // 1024, 'KB')
