var mst;
var IFsiz;
if(this.IFsiz != null)
{
   var sc = this.IFsiz / 0.5;
   this.fw._xscale = sc;
   this.fw._yscale = sc;
}
onEnterFrame = function()
{
   if(!stopAll)
   {
      if(_parent[mst] != undefined)
      {
         this._sX = _parent[mst]._sX;
         this._sY = _parent[mst]._sY;
         this._sZ = _parent[mst]._sZ;
      }
      else
      {
         this.removeMovieClip();
      }
      _alpha = _alpha - 10;
      if(_alpha < 5)
      {
         this.removeMovieClip();
      }
   }
};
