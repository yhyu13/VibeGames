var t = 0;
var tgt1;
var tgt2;
var rr = 100;
var rs = 8;
var linelist = new Array();
linelist[0] = {nam:"line0",p1x:0,p1y:0,p1z:0,p2x:rr,p2y:0,p2z:rr,_siz:rs,_sizz:0.01};
linelist[1] = {nam:"line1",p1x:0,p1y:0,p1z:0,p2x:rr,p2y:0,p2z:- rr,_siz:rs,_sizz:0.01};
linelist[2] = {nam:"line2",p1x:0,p1y:0,p1z:0,p2x:- rr,p2y:0,p2z:- rr,_siz:rs,_sizz:0.01};
linelist[3] = {nam:"line3",p1x:0,p1y:0,p1z:0,p2x:- rr,p2y:0,p2z:rr,_siz:rs,_sizz:0.01};
this.mainact = function()
{
};
onEnterFrame = function()
{
   if(!stopAll)
   {
      t++;
      linelist[0] = {nam:"line0",p1x:0,p1y:0,p1z:0,p2x:rr,p2y:0,p2z:rr,_siz:rs,_sizz:0.01};
      linelist[1] = {nam:"line1",p1x:0,p1y:0,p1z:0,p2x:rr,p2y:0,p2z:- rr,_siz:rs,_sizz:0.01};
      linelist[2] = {nam:"line2",p1x:0,p1y:0,p1z:0,p2x:- rr,p2y:0,p2z:- rr,_siz:rs,_sizz:0.01};
      linelist[3] = {nam:"line3",p1x:0,p1y:0,p1z:0,p2x:- rr,p2y:0,p2z:rr,_siz:rs,_sizz:0.01};
      rr += 0.4 * (1 - rr);
      rs += 0.4 * (0.1 - rs);
      if(t == 5)
      {
         this.removeMovieClip();
      }
   }
};
