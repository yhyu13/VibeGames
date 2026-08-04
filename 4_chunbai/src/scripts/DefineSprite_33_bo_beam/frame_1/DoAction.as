var maxt = random(5);
var t = 0;
onEnterFrame = function()
{
   if(!stopAll)
   {
      if(t <= maxt)
      {
         this._slo += 20;
         t++;
      }
      else
      {
         this.removeMovieClip();
      }
   }
};
