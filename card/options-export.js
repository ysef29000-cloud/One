// node options-export.js          -> preview sheets for every option (png/options/*.png)
// node options-export.js pdf B    -> print PDF + 300dpi PNGs for option B
const {chromium}=require('playwright');
const [mode,opt]=process.argv.slice(2);
(async()=>{
  const b=await chromium.launch();
  const base='file://'+__dirname+'/options.html';
  if(mode==='pdf'){
    const p=await b.newPage();
    await p.goto(base+'?opt='+opt);await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(500);
    await p.pdf({path:`${__dirname}/Menna-Khaled-Card-${opt}-print.pdf`,printBackground:true,preferCSSPageSize:true});
  }
  const q=await b.newPage({viewport:{width:400,height:1800},deviceScaleFactor:300/96});
  await q.goto(base+(opt?'?opt='+opt:''));await q.evaluate(()=>document.fonts.ready);await q.waitForTimeout(500);
  for(const c of await q.$$('.card')){
    const o=await c.getAttribute('data-opt');const side=(await c.getAttribute('class')).includes('front')?'front':'back';
    await c.screenshot({path:`${__dirname}/png/options/${o}-${side}.png`});
  }
  await b.close();
})();
