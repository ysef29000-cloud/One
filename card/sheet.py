# python3 sheet.py E "E · Editorial" ...  -> png/options/option-<X>.png preview sheets (front + back, trimmed)
import sys
from PIL import Image, ImageFilter, ImageDraw, ImageFont
def trim(p):
    im=Image.open(p).convert('RGB');s=im.width/96
    return im.crop((round(3*s),round(3*s),round(93*s),round(53*s))).resize((900,500),Image.LANCZOS)
W,H,pad,lab=900,500,70,70
f=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',40)
a=sys.argv[1:]
for o,n in zip(a[::2],a[1::2]):
    cv=Image.new('RGB',(2*W+3*pad,H+pad+lab+20),'#EDE7E4');d=ImageDraw.Draw(cv)
    d.text((pad,pad-20),n,fill='#222',font=f)
    for i,side in enumerate(['front','back']):
        x=pad+i*(W+pad);y=pad+lab
        sh=Image.new('L',cv.size,0);sh.paste(80,(x+8,y+14,x+W+8,y+H+14));sh=sh.filter(ImageFilter.GaussianBlur(18))
        cv.paste(Image.new('RGB',cv.size,'#b5a8a8'),(0,0),sh);cv.paste(trim(f'png/options/{o}-{side}.png'),(x,y))
    cv.save(f'png/options/option-{o}.png')
