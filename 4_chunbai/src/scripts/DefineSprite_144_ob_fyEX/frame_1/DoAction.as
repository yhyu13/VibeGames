var mst;
var dam;
var t = 0;
var wpname;
var fsiz;
var mz = false;
var doit = null;
this.stop();
snd("gpxn3");
onEnterFrame = function()
{
   if(!stopAll)
   {
      this.play();
      if(this._parent[mst] != undefined)
      {
         this._parent[mst].spEX = 30;
         this._parent[mst].AMBAC = 10;
         this._parent[mst].doHy(30);
         this._parent[mst]["weapon" + this._parent[mst].weaponow].xpmax = 30;
         this._parent[mst]["weapon" + this._parent[mst].weaponow].xpon = true;
         this._sX = _parent[mst]._sX;
         this._sY = _parent[mst]._sY;
         this._sZ = _parent[mst]._sZ;
         var _loc3_ = 1;
         while(_loc3_ <= 8)
         {
            _parent[mst]["weapon" + _loc3_].callit();
            _loc3_ = _loc3_ + 1;
         }
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
