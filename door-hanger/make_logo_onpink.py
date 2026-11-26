# assets/logo-onpink.png: logo for the pink background — white background removed, pink bar turned white (black type kept).
from PIL import Image
lg=Image.open('assets/logo.png').convert('RGB');w,h=lg.size;px=lg.load()
out=Image.new('RGBA',(w,h));op=out.load()
BX0,BX1,BY0,BY1=23,1204,256,439
for y in range(h):
    for x in range(w):
        r,g,b=px[x,y];sat=max(r,g,b)-min(r,g,b);lum=(r+g+b)/3
        inbar=BX0<=x<=BX1 and BY0<=y<=BY1
        if sat>50:  # pink -> white (only the bar is pink)
            op[x,y]=(255,255,255,255) if inbar else (0,0,0,0)
        else:
            a=int(max(0,min(255,(255-lum)*1.15)))
            if inbar and lum>235: op[x,y]=(0,0,0,0)
            else: op[x,y]=(21,21,21,a)
out.save('assets/logo-onpink.png')
