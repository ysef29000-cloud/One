// node export.js laser-form  -> <name>.pdf (A4 print) + <name>-preview.png
const {chromium}=require('playwright');
const name=process.argv[2]||'laser-form';
(async()=>{
  const b=await chromium.launch();
  const p=await b.newPage({viewport:{width:794,height:1123},deviceScaleFactor:2});
  await p.goto('file://'+__dirname+'/'+name+'.html');
  await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(600);
  await p.pdf({path:`${__dirname}/${name}.pdf`,printBackground:true,preferCSSPageSize:true});
  await p.screenshot({path:`${__dirname}/${name}-preview.png`,fullPage:true});
  const overflow=await p.evaluate(()=>{const f=document.querySelector('footer').getBoundingClientRect().top;const s=document.querySelector('.sign').getBoundingClientRect().bottom;return Math.round(s-f)});
  console.log('content bottom minus footer top (px, must be < 0):',overflow);
  await b.close();
})();
