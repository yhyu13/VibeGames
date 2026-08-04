class clazz.obj_phix extends MovieClip
{
   var _sX = 0;
   var _sY = 0;
   var _sZ = 0;
   var _sW = 0;
   var _sH = 0;
   var _sR = 0;
   var _cX = 0;
   var _cY = 0;
   var _cZ = 0;
   var _sx = 0;
   var _sy = 0;
   var _sc = 100;
   function obj_phix()
   {
      super();
      this.showcmr();
   }
   function getXYZ()
   {
      this._cX = this._sX - _global.Cmr._sX;
      this._cY = this._sY - _global.Cmr._sY;
      this._cZ = this._sZ - _global.Cmr._sZ;
      var _loc7_ = this._cX;
      var _loc6_ = this._cY;
      var _loc4_ = Math.cos(- _global.Cmr._sW);
      var _loc3_ = Math.sin(- _global.Cmr._sW);
      this._cX = _loc4_ * _loc7_ + _loc3_ * _loc6_;
      this._cY = (- _loc3_) * _loc7_ + _loc4_ * _loc6_;
      _loc6_ = this._cY;
      var _loc5_ = this._cZ;
      _loc4_ = Math.cos(- _global.Cmr._sH);
      _loc3_ = Math.sin(- _global.Cmr._sH);
      this._cY = _loc4_ * _loc6_ - _loc3_ * _loc5_;
      this._cZ = _loc3_ * _loc6_ + _loc4_ * _loc5_;
      _loc7_ = this._cX;
      _loc5_ = this._cZ;
      _loc4_ = Math.cos(- _global.Cmr._sR);
      _loc3_ = Math.sin(- _global.Cmr._sR);
      this._cX = _loc4_ * _loc7_ - _loc3_ * _loc5_;
      this._cZ = _loc3_ * _loc7_ + _loc4_ * _loc5_;
   }
   function getxyz()
   {
      this.getXYZ();
      if(this._cY > 5)
      {
         this._sc = _global.Cmr.Zoom / this._cY;
         this._sy = 0.5 * _global.Cmr._ch - this._cZ * this._sc;
         this._sx = 0.5 * _global.Cmr._cw + this._cX * this._sc;
      }
      else
      {
         this._sc = 0;
         this._sy = 0.5 * _global.Cmr._ch;
         this._sx = 0.5 * _global.Cmr._cw;
      }
   }
   function showcmr()
   {
      this.getxyz();
      this._xscale = 10 * this._sc;
      this._yscale = 10 * this._sc;
      this._y = this._sy;
      this._x = this._sx;
   }
}
