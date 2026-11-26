// Photo version: print PDF (bleed) + previews with dieline overlay + overlap check on the back.
const {chromium}=require('playwright');const fs=require('fs');
const TH=process.argv[2]||'';  // '', W, P or N
const SUF=TH?'-'+TH:'';
(async()=>{
  const b=await chromium.launch();const url='file://'+__dirname+'/door-hanger-photo.html?theme='+TH;
  const p=await b.newPage();
  await p.goto(url);await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(800);
  await p.pdf({path:__dirname+'/One-Rose-Door-Hanger-photo'+SUF+'-print.pdf',printBackground:true,preferCSSPageSize:true});
  const q=await b.newPage({viewport:{width:382,height:2000},deviceScaleFactor:3});
  await q.goto(url+'&guides=1');await q.evaluate(()=>document.fonts.ready);await q.waitForTimeout(800);
  const s=await q.$$('.sheet');
  await s[0].screenshot({path:__dirname+'/png/photo'+SUF+'-front.png'});await s[1].screenshot({path:__dirname+'/png/photo'+SUF+'-back.png'});
  const gap=await q.evaluate(()=>{const a=document.querySelector('.back .scan').getBoundingClientRect().bottom;const c=document.querySelector('.back .addr').getBoundingClientRect().top;return Math.round(c-a)});
  console.log('back: gap between QR text and address (px, must be >0):',gap);
  await b.close();
})();
