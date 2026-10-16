// Hand-drawn flat cartoon: hijabi woman, split "before / after" halves. Pure SVG.
// cartoon({id, variant:'skin'|'hair'|'joints', w, h}) -> <svg> string (viewBox 600x800)
function person(id, mood, opt) {
  const bad = mood === 'bad';
  const skin = bad ? '#C79C7E' : '#F2C7A5', skinSh = bad ? '#A97F63' : '#E3AE8A';
  const hij = (opt.hijab && !bad) ? opt.hijab[0] : opt.older ? (bad ? '#7C7466' : '#3E4486') : (bad ? '#B9946A' : '#F3E9DC');
  const hijSh = (opt.hijab && !bad) ? opt.hijab[1] : opt.older ? (bad ? '#5E574B' : '#2C2F66') : (bad ? '#8E6D49' : '#E2D3C0');
  const robe = (opt.hijab && !bad) ? opt.hijab[2] : opt.older ? (bad ? '#6A6358' : '#2C2F66') : (bad ? '#A3845F' : '#EADFCF');
  const tex = bad ? `url(#rope-${id})` : `url(#satin-${id}-${opt.older ? 'o' : 'y'})`;
  const brow = bad
    ? '<path d="M222 285 Q250 268 282 282" /><path d="M318 282 Q350 268 378 285"/>'
    : '<path d="M220 290 Q252 272 284 286"/><path d="M316 286 Q348 272 380 290"/>';
  const browBad = '<path d="M224 292 Q252 266 284 276"/><path d="M316 276 Q348 266 376 292"/>';
  const mouth = bad
    ? '<path d="M250 434 Q272 416 300 432 Q328 448 350 428" fill="none" stroke="#5A2E25" stroke-width="7" stroke-linecap="round"/><rect x="278" y="425" width="30" height="13" rx="4" fill="#fff" stroke="#5A2E25" stroke-width="2"/>'
    : '<path d="M246 418 Q300 482 354 418 Q300 440 246 418Z" fill="#9C3D3A"/><path d="M256 422 Q300 444 344 422 L338 432 Q300 452 262 432Z" fill="#fff"/>';
  const eye = (cx) => `
    <ellipse cx="${cx}" cy="345" rx="34" ry="${bad ? 30 : 38}" fill="#fff"/>
    <circle cx="${cx}" cy="${bad ? 348 : 348}" r="24" fill="#6B3E21"/><circle cx="${cx}" cy="350" r="13" fill="#1E120B"/>
    <circle cx="${cx - 9}" cy="338" r="7" fill="#fff"/><circle cx="${cx + 8}" cy="356" r="3" fill="#fff"/>
    <path d="M${cx - 38} ${bad ? 334 : 330} Q${cx} ${bad ? 300 : 296} ${cx + 38} ${bad ? 334 : 330}" fill="none" stroke="#2A1810" stroke-width="7" stroke-linecap="round"/>
    <path d="M${cx + 30} 318 l12 -10 M${cx + 36} 326 l14 -6 M${cx - 30} 318 l-12 -10" stroke="#2A1810" stroke-width="4" stroke-linecap="round"/>`;
  return `
  <g>
    <path d="M40 800 C60 650 190 610 300 610 C410 610 540 650 560 800Z" fill="${robe}"/>
    <path d="M40 800 C60 650 190 610 300 610 C410 610 540 650 560 800Z" fill="${tex}" opacity=".9"/>
    <path d="M300 82 C160 82 100 200 106 330 C112 455 140 560 104 660 C190 628 248 650 300 650 C352 650 410 628 496 660 C460 560 488 455 494 330 C500 200 440 82 300 82Z" fill="${hij}"/>
    <path d="M300 82 C160 82 100 200 106 330 C112 455 140 560 104 660 C190 628 248 650 300 650 C352 650 410 628 496 660 C460 560 488 455 494 330 C500 200 440 82 300 82Z" fill="${tex}"/>
    <ellipse cx="300" cy="350" rx="128" ry="160" fill="${hijSh}"/>
    <ellipse cx="300" cy="352" rx="116" ry="148" fill="${skin}"/>
    ${bad ? `<ellipse cx="300" cy="352" rx="116" ry="148" fill="url(#dry-${id})"/>` : `<ellipse cx="300" cy="300" rx="80" ry="60" fill="#fff" opacity=".18"/>`}
    <path d="M196 432 C226 528 374 528 404 432 C420 506 384 572 300 578 C216 572 180 506 196 432Z" fill="${hij}"/>
    <path d="M196 432 C226 528 374 528 404 432 C420 506 384 572 300 578 C216 572 180 506 196 432Z" fill="${tex}"/>
    <g fill="none" stroke="#3A2318" stroke-width="7" stroke-linecap="round">${bad ? browBad : brow}</g>
    ${eye(252)}${eye(348)}
    <path d="M298 360 Q290 392 300 398 Q310 400 314 394" fill="none" stroke="${skinSh}" stroke-width="5" stroke-linecap="round"/>
    ${bad ? '' : '<ellipse cx="226" cy="400" rx="26" ry="15" fill="#F08C8C" opacity=".45"/><ellipse cx="374" cy="400" rx="26" ry="15" fill="#F08C8C" opacity=".45"/>'}
    ${opt.older ? `<path d="M232 420 q-6 18 4 32 M368 420 q6 18 -4 32" fill="none" stroke="${skinSh}" stroke-width="3" opacity=".7"/>
       <path d="M262 258 q38 -8 76 0" fill="none" stroke="${skinSh}" stroke-width="3" opacity=".6"/>` : ''}
    ${mouth}
    ${bad ? '' : `<path d="M372 660 C384 600 398 548 410 512 L452 500 C464 556 452 616 440 664Z" fill="${robe}"/>
       <path d="M372 660 C384 600 398 548 410 512 L452 500 C464 556 452 616 440 664Z" fill="${tex}"/>
       <g fill="${skin}" stroke="${skinSh}" stroke-width="3" stroke-linejoin="round">
       <path d="M404 520 C396 488 398 452 410 426 C418 408 432 400 446 404 C462 408 468 428 464 452 C460 482 452 506 446 520Z"/>
       <path d="M412 432 C404 420 404 404 414 398" fill="none"/><path d="M424 404 l-2 30 M438 404 l0 32 M452 410 l-2 30" fill="none" opacity=".6"/></g>`}
    ${bad && opt.hair ? `<g fill="none" stroke="#2E1F17" stroke-width="2.4" opacity=".85">
       <path d="M150 640 C170 600 140 580 170 540"/><path d="M180 660 C200 610 165 590 196 560"/><path d="M130 690 C150 660 120 640 150 600"/>
       <path d="M210 700 C226 666 200 640 230 610"/></g>` : ''}
    ${bad ? `<g stroke="${hijSh}" stroke-width="3" stroke-linecap="round" opacity=".9">
       ${Array.from({ length: 14 }, (_, i) => { const y = 160 + i * 34, x = 112 - (i % 3) * 6; return `<path d="M${x} ${y} l-${16 + (i % 4) * 6} ${-6 + (i % 3) * 6}"/>`; }).join('')}
       ${Array.from({ length: 8 }, (_, i) => `<path d="M${140 + i * 20} ${640 + (i % 2) * 6} l-${6 + i % 3 * 4} 22"/>`).join('')}</g>` : ''}
  </g>`;
}

function cartoon({ id = 'c', variant = 'skin', w = 600, h = 800 } = {}) {
  const opt = { older: variant === 'joints', hair: variant === 'hair' };
  return `<svg width="${w}" height="${h}" viewBox="0 0 600 800" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <pattern id="rope-${id}" width="26" height="26" patternUnits="userSpaceOnUse" patternTransform="rotate(35)">
      <rect width="26" height="26" fill="rgba(0,0,0,0)"/>
      <path d="M0 6 Q6 0 13 6 T26 6" stroke="rgba(70,45,20,.55)" stroke-width="5" fill="none"/>
      <path d="M0 19 Q6 13 13 19 T26 19" stroke="rgba(255,235,200,.35)" stroke-width="4" fill="none"/></pattern>
    <linearGradient id="satin-${id}-y" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".55"/><stop offset=".4" stop-color="#fff" stop-opacity="0"/>
      <stop offset=".7" stop-color="#fff" stop-opacity=".3"/><stop offset="1" stop-color="#C9B49A" stop-opacity=".25"/></linearGradient>
    <linearGradient id="satin-${id}-o" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".25"/><stop offset=".45" stop-color="#fff" stop-opacity="0"/>
      <stop offset=".75" stop-color="#fff" stop-opacity=".15"/><stop offset="1" stop-color="#000" stop-opacity=".2"/></linearGradient>
    <pattern id="dry-${id}" width="22" height="22" patternUnits="userSpaceOnUse">
      <circle cx="5" cy="6" r="2.2" fill="rgba(90,55,35,.35)"/><circle cx="15" cy="15" r="1.8" fill="rgba(90,55,35,.3)"/>
      <path d="M2 16 l6 -3 l4 4" stroke="rgba(110,70,45,.35)" stroke-width="1.4" fill="none"/></pattern>
    <clipPath id="L-${id}"><rect x="0" y="0" width="300" height="800"/></clipPath>
    <clipPath id="R-${id}"><rect x="300" y="0" width="300" height="800"/></clipPath>
  </defs>
  <g clip-path="url(#L-${id})">${person(id, 'bad', opt)}</g>
  <g clip-path="url(#R-${id})">${person(id, 'good', opt)}</g>
</svg>`;
}
module.exports = { cartoon, person };
// avatar: glowing version only, cropped to the head
function avatar(id, size) {
  const full = cartoon({ id, variant: 'skin' });
  const defs = full.slice(full.indexOf('<defs>'), full.indexOf('</defs>') + 7);
  return `<svg width="${size}" height="${size}" viewBox="150 120 300 300" xmlns="http://www.w3.org/2000/svg">${defs}${person(id, 'good', {})}</svg>`;
}
module.exports.avatar = avatar;

// head-and-shoulders portrait of one "glowing" person, for family/avatars
function portrait(id, size, opt = {}) {
  const full = cartoon({ id, variant: 'skin' });
  const defs = full.slice(full.indexOf('<defs>'), full.indexOf('</defs>') + 7);
  return `<svg width="${size}" height="${size * 1.1}" viewBox="60 60 480 528" xmlns="http://www.w3.org/2000/svg">${defs}${person(id, 'good', opt)}</svg>`;
}
module.exports.portrait = portrait;
