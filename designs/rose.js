// Top-view rose: layered petals drawn outside-in. Each petal is a closed shape
// whose fill uses var "paper" (knock-out) so inner petals hide outer lines.
const P=(r,a)=>(r*Math.cos(a)).toFixed(2)+','+(r*Math.sin(a)).toFixed(2);
function petal(rin,R,m,w){
  return `M${P(rin,m-w)} C${P(R*0.92,m-w*1.2)} ${P(R*1.02,m-w*0.5)} ${P(R,m)}`+
         ` C${P(R*1.02,m+w*0.5)} ${P(R*0.92,m+w*1.2)} ${P(rin,m+w)} Z`;
}
function bloom(){
  const L=[[5,100,0.0,0.78],[5,82,0.63,0.74],[5,64,0.05,0.70],[4,47,0.9,0.84],[3,32,0.3,1.0],[3,20,1.4,1.05]];
  let s='';
  for(const [n,R,off,wf] of L){
    let d='';
    for(let i=0;i<n;i++){const m=off+i*2*Math.PI/n; d+=petal(R*0.25,R,m,Math.PI/n*wf*1.25)+' ';}
    s+=`<path d="${d}"/>`;
  }
  s+=`<path d="M-2,-2 C2,-8 10,-4 8,3 C6,10 -6,10 -9,2 C-12,-6 -4,-13 5,-12"/>`;
  return s;
}
module.exports.head=`<g class="rose-head">${bloom()}</g>`;
module.exports.stem=`
<g class="rose-stem">
  <path d="M0,60 C-6,170 8,240 0,330"/>
  <path d="M-2,190 C-24,158 -78,150 -108,176 C-80,212 -30,214 -2,190 Z"/>
  <path d="M-2,190 C-36,182 -70,176 -100,178"/>
  <path d="M4,252 C26,220 80,212 110,238 C82,274 32,276 4,252 Z"/>
  <path d="M4,252 C38,244 72,238 102,240"/>
  <path d="M-3,144 L-17,134 L-2,136"/>
  <path d="M4,222 L18,212 L5,214"/>
  <path d="M2,300 L-12,292 L1,292"/>
</g>`;
