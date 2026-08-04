var mst;
var tgt;
var dam;
var dst = 10000;
var Sdst = 10000;
var t = 0;
var maxforce;
var maxt = 240;
var hq = 20;
var wpname;
var fsiz;
var mz = false;
var dbmz = false;
var fx;
var fy;
var fz;
var fn;
var txsz;
var wptx;
if(this._parent[tgt]._size == "L")
{
   this.hq = 25;
}
else if(this._parent[tgt]._size == "S")
{
   this.hq = 15;
}
this.stop();
snd("gpxn3");
onEnterFrame = function()
{
   if(tgt == _root.jiemiam.mst)
   {
      _root.jiemiam.hkxsq[mst].jiantou.play();
   }
   if(!stopAll)
   {
      this.play();
      if(this._parent[mst] != undefined)
      {
         this._parent[mst].spEX = 30;
         this._parent[mst].doHy(30);
         this._parent[mst]["weapon" + this._parent[mst].weaponow].xpmax = 30;
         this._parent[mst]["weapon" + this._parent[mst].weaponow].xpon = true;
         this._sX = _parent[mst]._sX;
         this._sY = _parent[mst]._sY;
         this._sZ = _parent[mst]._sZ;
         this._parent[mst].AMBAC = 10;
         this._parent[mst].vZ *= 0.5;
         this._parent[mst].vX *= 0.5;
         this._parent[mst].vY *= 0.5;
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
