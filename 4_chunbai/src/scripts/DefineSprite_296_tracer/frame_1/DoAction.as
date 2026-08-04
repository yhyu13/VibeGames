var fni = false;
var txt;
var n;
stop();
onEnterFrame = function()
{
   if(this._parent["txter_" + (this.n - 1)].fni || this.n == 0)
   {
      play();
      onEnterFrame = function()
      {
         if(this._parent.t <= 0)
         {
            gotoAndPlay(11);
            onEnterFrame = function()
            {
            };
         }
      };
   }
   if(this._parent.t <= 0)
   {
      gotoAndPlay(11);
      onEnterFrame = function()
      {
      };
   }
};
