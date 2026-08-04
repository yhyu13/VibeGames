this.attachMovie("hxxx","hx" + i,this.getNextHighestDepth(),{_rotation:3.6 * random(100),_xscale:100 + random(100)});
var mst;
this.stop();
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
