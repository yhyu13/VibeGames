var t;
var o;
var li = 5;
onEnterFrame = function()
{
   if(li == 0)
   {
      this.li = 5;
      this.t = getTimer();
      this.frameRate = Math.round(5000 / (this.t - this.o));
      this.o = this.t;
      if(autoQUA)
      {
         if(this.frameRate < 20 && _global.Cmr.isShow == 0)
         {
            _global.Cmr.isShow = 1;
         }
         else if(this.frameRate > 25)
         {
            _global.Cmr.isShow = 0;
         }
      }
   }
   this.li = this.li - 1;
   _global.Cmr.isShow *= -1;
};
