// Builds concepts2.html: four "One Rose" door hanger concepts (front + back), using the rose art from designs/rose.js
const fs=require('fs');const {head,stem}=require('../designs/rose.js');
let n=0;
// one-colour line rose with occluding petals
function lineRose(color,sw,withStem,vb){
  const id='m'+(n++);
  return `<svg viewBox="${vb}" class="rose"><mask id="${id}" maskUnits="userSpaceOnUse" x="-300" y="-300" width="600" height="800">
  <g fill="#000" stroke="#fff" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round">${withStem?stem:''}${head}</g></mask>
  <rect x="-300" y="-300" width="600" height="800" fill="${color}" mask="url(#${id})"/></svg>`;
}
// filled rose: each petal layer a deeper pink, thin light outline
function filledRose(fills,stroke,vb){
  const ds=[...head.matchAll(/d="([^"]+)"/g)].map(m=>m[1]);
  const paths=ds.map((d,i)=>i<fills.length?`<path d="${d}" fill="${fills[i]}" stroke="${stroke}" stroke-width="1.3" stroke-linejoin="round"/>`:`<path d="${d}" fill="none" stroke="${stroke}" stroke-width="1.3" stroke-linecap="round"/>`).join('');
  return `<svg viewBox="${vb}" class="rose">${paths}</svg>`;
}
const PINKS=['#FDE3EB','#FBC9D8','#F9AFC5','#F897B5','#FC82A7','#E8638E'];
const t=fs.readFileSync(__dirname+'/concepts2.tpl.html','utf8')
  .replace('{{LINE_STEM}}',lineRose('#FC82A7',2.6,true,'-125 -112 250 450'))
  .replace('{{LINE_SMALL_W}}',lineRose('#FC82A7',4,false,'-110 -110 220 220'))
  .replace('{{LINE_SMALL_K}}',lineRose('#151515',4,false,'-110 -110 220 220'))
  .replace('{{FILLED_BIG}}',filledRose(PINKS,'#fff','-110 -110 220 220'))
  .replace('{{FILLED_TOP}}',filledRose(PINKS,'#fff','-104 -104 208 208'))
  .replace('{{FILLED_SMALL}}',filledRose(PINKS,'#fff','-110 -110 220 220'));
fs.writeFileSync(__dirname+'/concepts2.html',t);
