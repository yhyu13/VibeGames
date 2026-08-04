onEnterFrame = function()
{
   if(this._cY < 0)
   {
      this._sX = - this._sX;
      this._sY = - this._sY;
      this._sZ = - this._sZ;
   }
};
