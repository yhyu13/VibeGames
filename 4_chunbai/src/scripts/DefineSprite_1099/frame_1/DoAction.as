onEnterFrame = function()
{
   if(_visible)
   {
      var _loc4_ = 0;
      for(var _loc7_ in _global.UnitList)
      {
         if(_global.UnitList[_loc7_]._force != _root.cmrs[this._parent.mst]._force && _global.UnitList[_loc7_]._zt != "broken")
         {
            if(this[_loc7_] == undefined)
            {
               this.attachMovie("daginfo",_loc7_,this.getNextHighestDepth(),{_x:0,_y:0});
               this[_loc7_].dag._xscale = 0;
               this[_loc7_]._dag._xscale = 0;
            }
            this[_loc7_]._y = _loc4_ * 20;
            this[_loc7_].tgt.text = _root.cmrs[_loc7_].$NAME;
            this[_loc7_]._dag._xscale = Math.floor(_root.cmrs[_loc7_].Danger / 5);
            if(_root.cmrs[this._parent.mst].tgt == _loc7_)
            {
               this[_loc7_].dag._yscale = 200;
            }
            else
            {
               this[_loc7_].dag._yscale = 100;
            }
            _loc4_ = _loc4_ + 1;
         }
         else if(this[_loc7_] != undefined)
         {
            this[_loc7_].removeMovieClip();
         }
      }
   }
};
