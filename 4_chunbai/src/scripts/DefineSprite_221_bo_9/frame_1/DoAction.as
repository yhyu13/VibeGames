var mst;
this.stop();
_rotation = random(180);
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
   }
   else
   {
      this.stop();
   }
};
