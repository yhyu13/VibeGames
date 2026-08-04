this.Rtemp = new Array();
var g = 0;
while(g < this.fn)
{
   var gobj = new Object();
   gobj.rx = (random(21) - 10) * 10;
   gobj.rz = (random(21) - 10) * 10;
   this.Rtemp[g] = gobj;
   g++;
}
