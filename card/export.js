// Exports the card: print PDF (96x56mm incl. 3mm bleed) + 300dpi PNGs + guide previews.
const {chromium}=require('playwright');
(async()=>{
  const b=await chromium.launch();
  const url='file://'+__dirname+'/card.html';
  const p=await b.newPage();
  await p.goto(url);await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(500);
  await p.pdf({path:__dirname+'/One-Rose-Card-Menna-Khaled-print.pdf',printBackground:true,preferCSSPageSize:true});
  const q=await b.newPage({viewport:{width:400,height:460},deviceScaleFactor:300/96});
  await q.goto(url);await q.evaluate(()=>document.fonts.ready);await q.waitForTimeout(500);
  const c=await q.$$('.card');
  await c[0].screenshot({path:__dirname+'/png/front-300dpi.png'});
  await c[1].screenshot({path:__dirname+'/png/back-300dpi.png'});
  await q.evaluate(()=>document.querySelectorAll('.card').forEach(e=>e.classList.add('guides')));
  await c[0].screenshot({path:__dirname+'/png/front-guides.png'});
  await c[1].screenshot({path:__dirname+'/png/back-guides.png'});
  await b.close();
})();
