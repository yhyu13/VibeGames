var mst;
var HFsiz;
var damtmp = 0;
if(this.HFsiz != null)
{
   var sc = this.HFsiz / 0.5;
   this.fw._xscale = sc;
   this.fw._yscale = sc;
}
var t = 0;
onEnterFrame = function()
{
   if(!stopAll)
   {
      this._sX = this._parent[this.mst]._sX;
      this._sY = this._parent[this.mst]._sY;
      this._sZ = this._parent[this.mst]._sZ;
      if(t > 10)
      {
         this.sc *= 1.1;
         this.fw._xscale = this.sc;
         this.fw._yscale = this.sc;
         this.fw._alpha -= 10;
         if(this.fw._alpha < 10)
         {
            this.removeMovieClip();
         }
      }
      else
      {
         t++;
      }
   }
};
