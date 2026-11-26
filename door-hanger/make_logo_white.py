# Builds assets/logo-white.png: clinic logo for dark backgrounds.
# Black "OR" + "BEAUTY CLINIC" -> white, white background -> transparent, pink bar kept with its black lettering.
from PIL import Image
lg=Image.open('assets/logo.png').convert('RGB');w,h=lg.size;px=lg.load()
out=Image.new('RGBA',(w,h));op=out.load()
BX0,BX1,BY0,BY1=23,1204,256,439   # pink bar bounds (measured)
for y in range(h):
    for x in range(w):
        r,g,b=px[x,y];sat=max(r,g,b)-min(r,g,b);lum=(r+g+b)/3
        if BX0<=x<=BX1 and BY0<=y<=BY1:
            op[x,y]=(255,255,255,0) if (lum>235 and sat<25) else (r,g,b,255)
        elif sat>50: op[x,y]=(r,g,b,255)
        else: op[x,y]=(255,255,255,int(max(0,min(255,(255-lum)*1.15))))
out.save('assets/logo-white.png')
