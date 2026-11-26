// node export-options.js  -> options/laser-form-<V>.pdf + .png for themes A–D, and a side-by-side overview
const {chromium}=require('playwright');const fs=require('fs');
(async()=>{
  fs.mkdirSync(__dirname+'/options',{recursive:true});
  const b=await chromium.launch();
  const p=await b.newPage({viewport:{width:794,height:1123},deviceScaleFactor:1.5});
  for(const v of ['A','B','C','D']){
    await p.goto('file://'+__dirname+'/laser-form-options.html?v='+v);
    await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(500);
    await p.pdf({path:`${__dirname}/options/laser-form-${v}.pdf`,printBackground:true,preferCSSPageSize:true});
    await p.screenshot({path:`${__dirname}/options/laser-form-${v}.png`});
    const gap=await p.evaluate(()=>Math.round(document.querySelector('footer').getBoundingClientRect().top-document.querySelector('.notes').getBoundingClientRect().bottom));
    console.log(v,'space above footer px:',gap);
  }
  await b.close();
})();
