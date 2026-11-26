const {chromium}=require('playwright');const fs=require('fs');
(async()=>{const b=await chromium.launch();const scale=+process.argv[2]||1;
for(const n of JSON.parse(fs.readFileSync('designs.json'))){
 const s=fs.readFileSync(n+'.svg','utf8');const [,w,h]=s.match(/viewBox="0 0 (\d+) (\d+)"/);
 const p=await b.newPage({viewport:{width:+w,height:+h},deviceScaleFactor:scale});
 await p.setContent(`<html><body style="margin:0;background:transparent">${s}</body></html>`);
 await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(800);
 await p.locator('svg').screenshot({path:`png/${n}${scale>1?'':'-preview'}.png`,omitBackground:true});}
await b.close();})();
