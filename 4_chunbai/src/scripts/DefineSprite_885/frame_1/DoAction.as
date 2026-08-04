stop();
var t = 0;
this._alpha = 0;
onEnterFrame = function()
{
   if(t <= 0)
   {
      if(this._alpha > 0)
      {
         this._alpha -= 5;
      }
      else
      {
         this._alpha = 0;
      }
   }
   else
   {
      t--;
   }
};
