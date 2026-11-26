const {chromium}=require('playwright');const fs=require('fs');
(async()=>{const b=await chromium.launch();const p=await b.newPage();
for(const n of JSON.parse(fs.readFileSync('designs.json'))){const s=fs.readFileSync(n+'.svg','utf8');const [,w,h]=s.match(/viewBox="0 0 (\d+) (\d+)"/);
 await p.setContent(`<html><head><style>@page{margin:0}body{margin:0}svg{display:block;width:${w/100}in;height:${h/100}in}</style></head><body>${s}</body></html>`);
 await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(800);
 await p.pdf({path:`pdf/${n}.pdf`,width:`${w/100}in`,height:`${h/100}in`,printBackground:true});}
await b.close();})();
