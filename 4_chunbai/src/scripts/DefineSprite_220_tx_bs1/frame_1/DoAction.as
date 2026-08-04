var mst;
var sz;
this.stop();
this.rt._rotation = 3.6 * random(100);
if(random(2) == 1)
{
   this.rt._xscale = 100 * this.sz;
}
else
{
   this.rt._xscale = -100 * this.sz;
}
if(random(2) == 1)
{
   this.rt._yscale = 100 * this.sz;
}
else
{
   this.rt._yscale = -100 * this.sz;
}
onEnterFrame = function()
{
   if(!stopAll)
   {
      this.play();
      if(this._parent[mst] != undefined)
      {
         this._sX += this._parent[mst].v._sX;
         this._sY += this._parent[mst].v._sY;
         this._sZ += this._parent[mst].v._sZ;
      }
      this.rt.play();
   }
   else
   {
      this.rt.stop();
      this.stop();
   }
};
