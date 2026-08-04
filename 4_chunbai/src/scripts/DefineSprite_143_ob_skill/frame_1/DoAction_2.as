var mst;
var t = 0;
this.stop();
onEnterFrame = function()
{
   if(!stopAll)
   {
      this.play();
      if(this._parent[mst] != undefined)
      {
         this._sX = _parent[mst]._sX;
         this._sY = _parent[mst]._sY;
         this._sZ = _parent[mst]._sZ;
         this.xg.nextFrame();
      }
      else
      {
         this.removeMovieClip();
      }
   }
   else
   {
      this.stop();
   }
};
