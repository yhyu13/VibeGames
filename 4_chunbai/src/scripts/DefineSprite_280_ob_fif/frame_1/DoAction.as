function bo()
{
   if(bot == 0)
   {
      bot = 5;
   }
   linelist[0] = {nam:"line0",p1x:0,p1y:0,p1z:20,p2x:-20,p2y:20,p2z:-15,_siz:2,_sizz:1};
   linelist[1] = {nam:"line1",p1x:0,p1y:0,p1z:20,p2x:20,p2y:20,p2z:-15,_siz:2,_sizz:1};
   linelist[2] = {nam:"line2",p1x:0,p1y:0,p1z:20,p2x:-20,p2y:-20,p2z:-15,_siz:2,_sizz:1};
   linelist[3] = {nam:"line3",p1x:0,p1y:0,p1z:20,p2x:20,p2y:-20,p2z:-15,_siz:2,_sizz:1};
   linelist[4] = {nam:"line4",p1x:20,p1y:20,p1z:-15,p2x:-20,p2y:20,p2z:-15,_siz:2,_sizz:1};
   linelist[5] = {nam:"line5",p1x:20,p1y:-20,p1z:-15,p2x:-20,p2y:-20,p2z:-15,_siz:2,_sizz:1};
   linelist[6] = {nam:"line6",p1x:20,p1y:20,p1z:-15,p2x:20,p2y:-20,p2z:-15,_siz:2,_sizz:1};
   linelist[7] = {nam:"line7",p1x:-20,p1y:20,p1z:-15,p2x:-20,p2y:-20,p2z:-15,_siz:2,_sizz:1};
}
var t = 0;
var mst;
var bot = 0;
var linelist = new Array();
linelist[0] = {nam:"line0",p1x:0,p1y:0,p1z:20,p2x:-20,p2y:20,p2z:-15,_siz:0.2,_sizz:1};
linelist[1] = {nam:"line1",p1x:0,p1y:0,p1z:20,p2x:20,p2y:20,p2z:-15,_siz:0.2,_sizz:1};
linelist[2] = {nam:"line2",p1x:0,p1y:0,p1z:20,p2x:-20,p2y:-20,p2z:-15,_siz:0.2,_sizz:1};
linelist[3] = {nam:"line3",p1x:0,p1y:0,p1z:20,p2x:20,p2y:-20,p2z:-15,_siz:0.2,_sizz:1};
linelist[4] = {nam:"line4",p1x:20,p1y:20,p1z:-15,p2x:-20,p2y:20,p2z:-15,_siz:0.2,_sizz:1};
linelist[5] = {nam:"line5",p1x:20,p1y:-20,p1z:-15,p2x:-20,p2y:-20,p2z:-15,_siz:0.2,_sizz:1};
linelist[6] = {nam:"line6",p1x:20,p1y:20,p1z:-15,p2x:20,p2y:-20,p2z:-15,_siz:0.2,_sizz:1};
linelist[7] = {nam:"line7",p1x:-20,p1y:20,p1z:-15,p2x:-20,p2y:-20,p2z:-15,_siz:0.2,_sizz:1};
this.mainact = function()
{
   this._sX = _parent[mst]._sX + _parent[mst].v._sX;
   this._sY = _parent[mst]._sY + _parent[mst].v._sY;
   this._sZ = _parent[mst]._sZ + _parent[mst].v._sZ;
};
onEnterFrame = function()
{
   if(!stopAll)
   {
      if(_parent[mst] != undefined)
      {
         this._sW = _parent[mst]._sW;
         this._sH = _parent[mst]._sH;
         this._sR = _parent[mst]._sR;
         this._rW += 0.1;
         if(bot > 0)
         {
            if(bot <= 3 && bot >= 0)
            {
               linelist[0] = {nam:"line0",p1x:0,p1y:0,p1z:20,p2x:-20,p2y:20,p2z:-15,_siz:0.2,_sizz:1};
               linelist[1] = {nam:"line1",p1x:0,p1y:0,p1z:20,p2x:20,p2y:20,p2z:-15,_siz:0.2,_sizz:1};
               linelist[2] = {nam:"line2",p1x:0,p1y:0,p1z:20,p2x:-20,p2y:-20,p2z:-15,_siz:0.2,_sizz:1};
               linelist[3] = {nam:"line3",p1x:0,p1y:0,p1z:20,p2x:20,p2y:-20,p2z:-15,_siz:0.2,_sizz:1};
               linelist[4] = {nam:"line4",p1x:20,p1y:20,p1z:-15,p2x:-20,p2y:20,p2z:-15,_siz:0.2,_sizz:1};
               linelist[5] = {nam:"line5",p1x:20,p1y:-20,p1z:-15,p2x:-20,p2y:-20,p2z:-15,_siz:0.2,_sizz:1};
               linelist[6] = {nam:"line6",p1x:20,p1y:20,p1z:-15,p2x:20,p2y:-20,p2z:-15,_siz:0.2,_sizz:1};
               linelist[7] = {nam:"line7",p1x:-20,p1y:20,p1z:-15,p2x:-20,p2y:-20,p2z:-15,_siz:0.2,_sizz:1};
            }
            bot--;
         }
      }
      else
      {
         this.removeMovieClip();
      }
   }
};
