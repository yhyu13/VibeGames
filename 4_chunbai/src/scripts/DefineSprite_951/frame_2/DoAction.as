bgm(0);
onEnterFrame = function()
{
   i = 1;
   while(i <= 8)
   {
      if(_global.btcs["ms_" + i] != null)
      {
         var _loc4_ = undefined;
         if(_global[_global.btcs["ms_" + i].msdata]._size == "L")
         {
            _loc4_ = 200;
         }
         else
         {
            _loc4_ = 60;
         }
         var _loc3_ = _global.btcs["ms_" + i]._force;
         if(_loc3_ == 1)
         {
            this.shower2["it" + i].removeMovieClip();
         }
         else if(_loc3_ == 2)
         {
            this.shower1["it" + i].removeMovieClip();
         }
         if(this["shower" + _loc3_]["it" + i] == undefined)
         {
            this["shower" + _loc3_].attachMovie("sobj","it" + i,this["shower" + _loc3_].getNextHighestDepth(),{_sX:0,_sY:_loc4_,_sZ:0,_sW:(1.25 - _loc3_) * 3.141592653589793,_sH:(1.5 - _loc3_) * 0.3 * 3.141592653589793});
         }
         this["shower" + _loc3_]["it" + i]._sY = _loc4_;
         this["shower" + _loc3_]["it" + i]._sW = (1.25 - _loc3_) * 3.141592653589793;
         this["shower" + _loc3_]["it" + i]._sH = (1.5 - _loc3_) * 0.3 * 3.141592653589793;
         this["shower" + _loc3_]["it" + i].linelist = _global[_global.btcs["ms_" + i].msdata].mod;
      }
      else
      {
         this.shower1["it" + i].removeMovieClip();
         this.shower2["it" + i].removeMovieClip();
      }
      i++;
   }
   var _loc5_ = 0;
   i = 1;
   while(i <= 8)
   {
      if(this.shower1["it" + i] != undefined)
      {
         this.shower1["it" + i]._sX = _loc5_ * 10 * (1 + (this.shower1["it" + i]._sY - 60) / 60);
         this.shower1["it" + i].showcmr();
         _loc5_ = _loc5_ + 1;
      }
      i++;
   }
   _loc5_ = 0;
   i = 1;
   while(i <= 8)
   {
      if(this.shower2["it" + i] != undefined)
      {
         this.shower2["it" + i]._sX = _loc5_ * 10 * (1 + (this.shower2["it" + i]._sY - 60) / 60);
         this.shower2["it" + i].showcmr();
         _loc5_ = _loc5_ - 1;
      }
      i++;
   }
};
