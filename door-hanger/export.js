// Exports: print PDF (2 pages, bleed), dieline PDF (cut lines only), previews with dieline overlay.
const {chromium}=require('playwright');const fs=require('fs');
(async()=>{
  const b=await chromium.launch();const url='file://'+__dirname+'/door-hanger.html';
  const p=await b.newPage();
  await p.goto(url);await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(600);
  await p.pdf({path:__dirname+'/One-Rose-Door-Hanger-print.pdf',printBackground:true,preferCSSPageSize:true});
  // dieline only
  await p.setContent(`<style>@page{size:101mm 251mm;margin:0}body{margin:0}</style><svg width="101mm" height="251mm" viewBox="-3 -3 101 251"><g fill="none" stroke="#EC008C" stroke-width=".3">
  <path d="M8,0 H87 A8,8 0 0 1 95,8 V241 A4,4 0 0 1 91,245 H4 A4,4 0 0 1 0,241 V8 A8,8 0 0 1 8,0 Z"/><circle cx="47.5" cy="30" r="17"/><path d="M63.5,24 L95,8"/></g>
  <text x="47.5" y="120" font-size="3" text-anchor="middle" fill="#EC008C" font-family="sans-serif">DIELINE — FRONT view · cut / do not print · trim 95x245mm · hole 34mm</text></svg>`);
  await p.pdf({path:__dirname+'/One-Rose-Door-Hanger-dieline.pdf',preferCSSPageSize:true});
  // previews
  const q=await b.newPage({viewport:{width:382,height:2000},deviceScaleFactor:3});
  await q.goto(url+'?guides=1');await q.evaluate(()=>document.fonts.ready);await q.waitForTimeout(600);
  fs.mkdirSync(__dirname+'/png',{recursive:true});
  const s=await q.$$('.sheet');
  await s[0].screenshot({path:__dirname+'/png/front-guides.png'});await s[1].screenshot({path:__dirname+'/png/back-guides.png'});
  // overflow check
  const o=await q.evaluate(()=>[...document.querySelectorAll('.sheet')].map(sh=>{const bd=sh.querySelector('.body');const last=bd.lastElementChild.getBoundingClientRect().bottom;return Math.round(sh.querySelector('.bottom').getBoundingClientRect().top-last)}));
  console.log('gap above bottom band (px, must be >0):',o);
  await b.close();
})();
