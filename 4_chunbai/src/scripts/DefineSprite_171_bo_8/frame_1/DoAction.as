function subhit()
{
   for(var _loc8_ in _root.cmrs)
   {
      if(_root.cmrs[_loc8_]._force == this.tgt_force)
      {
         var _loc7_ = _parent[_loc8_]._sX - this._sX;
         var _loc6_ = _parent[_loc8_]._sY - this._sY;
         var _loc4_ = _parent[_loc8_]._sZ - this._sZ;
         var _loc5_ = dist_3d(0,0,0,_loc7_,_loc6_,_loc4_);
         if(_loc5_ < hqq)
         {
            if(this._parent[_loc8_]._type != "ff")
            {
               this._parent[_loc8_].hitbo();
            }
         }
      }
   }
}
var i = 1;
while(i <= 15)
{
   this.attachMovie("hxxx","hsx" + i,this.getNextHighestDepth(),{_rotation:3.6 * random(100),_xscale:150 + random(100)});
   i++;
}
this.stop();
var hqq = 30;
var sndon;
if(sndon == null)
{
   sndon = 0;
}
onEnterFrame = function()
{
   if(!stopAll)
   {
      hqq += 10;
      this.boo._xscale = hqq * 10;
      this.boo._yscale = hqq * 10;
      this.boo._alpha -= 10;
      this.play();
   }
   else
   {
      this.stop();
   }
};
