# Crops each page to the exact card size (trim + bleed) measured from the TOP-LEFT, removing the
# sub-mm blank strip Chrome leaves at the bottom, and sets TrimBox/BleedBox for the printer.
# usage: python3 fix_pdf_box.py file.pdf trimW_mm trimH_mm bleed_mm
import sys
from pypdf import PdfReader, PdfWriter
from pypdf.generic import RectangleObject
f,tw,th,b=sys.argv[1],*map(float,sys.argv[2:5])
pt=lambda mm:mm*72/25.4
W,H=pt(tw+2*b),pt(th+2*b)-0.75  # shave 0.26mm of bleed: removes the anti-aliased edge row
r=PdfReader(f);w=PdfWriter()
for p in r.pages:
    x0,y0,x1,y1=map(float,p.mediabox)
    W2=min(W,x1-x0)  # never wider than what was drawn
    box=RectangleObject([x0,y1-H,x0+W2,y1])
    p.mediabox=box;p.cropbox=box;p.bleedbox=box
    p.trimbox=RectangleObject([x0+pt(b),y1-pt(th+b),x0+pt(b+tw),y1-pt(b)])  # exact 90x50 from top-left
    w.add_page(p)
w.write(f)
