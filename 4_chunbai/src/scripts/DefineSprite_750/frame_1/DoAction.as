onEnterFrame = function()
{
   if(this._x < 450)
   {
      this._x += 2;
   }
   else
   {
      this._x = -450;
   }
   if(this._y < 350)
   {
      this._y += 2;
   }
   else
   {
      this._y = -350;
   }
};
stop();
