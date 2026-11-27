# Bakes the front photo + white fades into one opaque image covering the whole sheet (101x251mm),
# so the print PDF has no transparency (some viewers/RIPs render CSS alpha gradients as black).
import sys
from PIL import Image
src,out=sys.argv[1],sys.argv[2]
DPI=300;mm=lambda v:round(v/25.4*DPI)
W,H=mm(101),mm(251)
canvas=Image.new('RGB',(W,H),(255,255,255))
ph=Image.open(src).convert('RGB')
# same as CSS: box top 12mm, height 253mm, full width, object-fit cover, position 50% 0
bw,bh=W,mm(253);s=max(bw/ph.width,bh/ph.height)
ph=ph.resize((round(ph.width*s),round(ph.height*s)),Image.LANCZOS)
x0=(ph.width-bw)//2;ph=ph.crop((x0,0,x0+bw,bh))
canvas.paste(ph,(0,mm(12)))
px=canvas.load()
def blend(y,a):  # a = white opacity
    for x in range(W):
        r,g,b=px[x,y];px[x,y]=(round(r+(255-r)*a),round(g+(255-g)*a),round(b+(255-b)*a))
t0=mm(52)  # top band: solid white to 55%, then fades out
for y in range(min(t0,H)):
    f=y/t0;blend(y,1 if f<=.55 else 1-(f-.55)/.45)
# bottom: smooth fade from 160mm, pure white from 194mm (logo starts ~197mm)
f0,f1=mm(160),mm(194)
for y in range(f0,H):
    f=min(1,(y-f0)/(f1-f0));blend(y,f*f*(3-2*f))
canvas.save(out,quality=95,dpi=(DPI,DPI))
