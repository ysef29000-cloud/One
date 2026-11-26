// Builds options2.html (editorial-style card options E/F/G) using the rose line art from designs/rose.js
const fs=require('fs');const {head,stem}=require('../designs/rose.js');
let n=0;
// knockout rose: occluding petals via mask, rendered in `color` at `opacity`
function rose(color,opacity,withStem=true){
  const id='r'+(n++);
  return `<svg viewBox="-130 -125 260 ${withStem?470:250}" class="rose"><mask id="${id}" maskUnits="userSpaceOnUse" x="-200" y="-200" width="400" height="600">
  <g fill="#000" stroke="#fff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">${withStem?stem:''}${head}</g></mask>
  <rect x="-200" y="-200" width="400" height="600" fill="${color}" opacity="${opacity}" mask="url(#${id})"/></svg>`;
}
const tpl=fs.readFileSync(__dirname+'/options2.tpl.html','utf8')
  .replace('{{ROSE_F}}',rose('#FC82A7',0.3))
  .replace('{{ROSE_G}}',rose('#FFFFFF',0.6));
fs.writeFileSync(__dirname+'/options2.html',tpl);
