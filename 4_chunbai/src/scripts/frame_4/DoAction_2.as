function shooit()
{
   var _loc4_ = undefined;
   if(_global[Player.MS].mod == undefined)
   {
      _loc4_ = _root.maxmdb[random(_root.maxmdb.length)];
   }
   else
   {
      _loc4_ = Player.MS;
   }
   cmrs.attachMovie("sobj","shower",cmrs.getNextHighestDepth(),{_sX:10,_sY:Cmr.Zoom / 20,_sZ:0,_sW:-2.5132741228718345,_sH:-0.6283185307179586});
   cmrs.shower.linelist = _global[_loc4_].mod;
   if(_global[_loc4_]._size == "L")
   {
      cmrs.shower._sY = Cmr.Zoom / 10;
      cmrs.shower._sX = 25;
   }
   cmrs.shower.onEnterFrame = function()
   {
      objrotate(this,0.06283185307179587,0,0);
      this.showcmr();
   };
}
ctrl.doint();
_global.Cmr._sX = 0;
_global.Cmr._sY = 0;
_global.Cmr._sZ = 0;
_global.Cmr._sH = 0;
_global.Cmr._sW = 0;
_global.Cmr._sR = 0;
_global.Battle = null;
onEnterFrame = null;
