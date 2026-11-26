const fs=require('fs');const {head,stem}=require('./rose.js');
const INK='#111111', ROSE='#B3122E';
const FONTS=`@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,500;0,800;1,500&amp;family=Anton&amp;family=Aref+Ruqaa:wght@700&amp;display=swap');`;
let uid=0;
// knockout rose: mask (white strokes, black fills) -> one-colour line art with occlusion, transparent elsewhere
function rose(x,y,s,color,sw,withStem=true){
  const id='m'+(uid++);const w=sw/s;
  return `<mask id="${id}" maskUnits="userSpaceOnUse" x="-200" y="-200" width="400" height="600">
  <g fill="#000" stroke="#fff" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round">${withStem?stem:''}${head}</g></mask>
  <g transform="translate(${x},${y}) scale(${s})"><rect x="-200" y="-200" width="400" height="600" fill="${color}" mask="url(#${id})"/></g>`;
}
const svg=(w,h,body)=>`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}"><style>${FONTS}</style>${body}</svg>`;
const ar=(x,y,size,c,t)=>`<text x="${x}" y="${y}" text-anchor="middle" direction="rtl" font-family="'Aref Ruqaa'" font-weight="700" font-size="${size}" fill="${c}">${t}</text>`;
const D={};

D['01-minimal-back']=svg(1200,1600,`
${rose(600,360,2.3,INK,7)}
<text x="600" y="1330" text-anchor="middle" font-family="Playfair Display" font-weight="500" font-size="140" letter-spacing="36" fill="${INK}">ONE ROSE</text>
<line x1="420" y1="1390" x2="780" y2="1390" stroke="${INK}" stroke-width="3"/>
<text x="600" y="1460" text-anchor="middle" font-family="Playfair Display" font-style="italic" font-size="50" fill="${INK}">only one is enough</text>`);

D['02-chest-logo']=svg(1000,1000,`
<circle cx="500" cy="500" r="470" fill="none" stroke="${INK}" stroke-width="12"/>
${rose(500,370,2.1,INK,10,false)}
<text x="500" y="740" text-anchor="middle" font-family="Playfair Display" font-weight="800" font-size="96" letter-spacing="16" fill="${INK}">ONE ROSE</text>
<text x="500" y="830" text-anchor="middle" font-family="Playfair Display" font-size="42" letter-spacing="20" fill="${INK}">EST. 2026</text>`);

D['03-street-back']=svg(1200,1600,`
<text x="600" y="380" text-anchor="middle" font-family="Anton" font-size="380" fill="${INK}">ONE</text>
${rose(600,660,1.95,ROSE,12,false)}
<text x="600" y="970" text-anchor="middle" font-family="Anton" font-size="52" letter-spacing="30" fill="${INK}">— ONLY ONE —</text>
${ar(600,1110,92,ROSE,'وردة واحدة تكفي')}
<text x="600" y="1520" text-anchor="middle" font-family="Anton" font-size="380" fill="${INK}">ROSE</text>`);

D['04-badge']=svg(1200,1200,`
<defs><path id="arcT" d="M190,600 A410,410 0 0 1 1010,600"/><path id="arcB" d="M140,600 A460,460 0 0 0 1060,600"/></defs>
<circle cx="600" cy="600" r="560" fill="none" stroke="${INK}" stroke-width="16"/>
<circle cx="600" cy="600" r="520" fill="none" stroke="${INK}" stroke-width="5"/>
<circle cx="600" cy="600" r="330" fill="none" stroke="${INK}" stroke-width="5"/>
<text font-family="Playfair Display" font-weight="800" font-size="116" letter-spacing="34" fill="${INK}"><textPath href="#arcT" startOffset="50%" text-anchor="middle">ONE ROSE</textPath></text>
<text font-family="Playfair Display" font-size="56" letter-spacing="16" fill="${INK}" dominant-baseline="hanging"><textPath href="#arcB" startOffset="50%" text-anchor="middle">BLOOM YOUR OWN WAY</textPath></text>
<circle cx="155" cy="600" r="13" fill="${INK}"/><circle cx="1045" cy="600" r="13" fill="${INK}"/>
${rose(600,560,2.3,INK,8,false)}
<text x="600" y="860" text-anchor="middle" font-family="Playfair Display" font-size="46" letter-spacing="16" fill="${INK}">EST · 2026</text>`);

D['05-arabic']=svg(1200,1380,`
${rose(600,280,1.65,ROSE,9)}
${ar(600,1060,230,INK,'وان روز')}
<text x="600" y="1220" text-anchor="middle" font-family="Playfair Display" font-size="64" letter-spacing="36" fill="${INK}">ONE ROSE</text>`);

for(const [k,v] of Object.entries(D)) fs.writeFileSync(`${k}.svg`,v);
fs.writeFileSync('designs.json',JSON.stringify(Object.keys(D)));
