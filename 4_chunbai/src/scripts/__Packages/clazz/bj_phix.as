class clazz.bj_phix extends MovieClip
{
   var _sW = 0;
   var _sH = 0;
   var _sR = 0;
   var _sX = 0;
   var _sY = 0;
   var _sZ = 0;
   var _cX = 0;
   var _cY = 0;
   var _cZ = 0;
   var _sx = 0;
   var _sy = 0;
   var _sc = 0;
   var _sr = 0;
   var ryes = false;
   function bj_phix()
   {
      super();
      this._sZ = 1000 * Math.sin(this._sH);
      var _loc3_ = 1000 * Math.cos(this._sH);
      this._sX = _loc3_ * Math.sin(this._sW);
      this._sY = _loc3_ * Math.cos(this._sW);
      this.showcmr();
   }
   function getXYZ()
   {
      this._cZ = this._sZ;
      this._cX = this._sX;
      this._cY = this._sY;
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
      if(this.ryes)
      {
         var _loc6_ = 0;
         var _loc5_ = 0;
         var _loc4_ = 1;
         var _loc3_ = new Object();
         _loc3_ = _global.cTos(_loc6_,_loc5_,_loc4_,this._sW,this._sH,this._sR);
         _loc3_ = _global.sToc(_loc3_.x,_loc3_.y,_loc3_.z,_global.Cmr._sW,_global.Cmr._sH,_global.Cmr._sR);
         this._sr = Math.atan2(- _loc3_.x,_loc3_.z);
         this._rotation = -180 * this._sr / 3.141592653589793;
      }
      this._visible = true;
      if(this._cY > 500)
      {
         this._sc = _global.Cmr.Zoom / this._cY;
         this._sy = this._cZ * this._sc;
         this._sx = this._cX * this._sc;
      }
      else
      {
         this._visible = false;
      }
   }
   function showcmr()
   {
      this.getxyz();
      this._y = 0.5 * _global.Cmr._ch - this._sy;
      this._x = 0.5 * _global.Cmr._cw + this._sx;
   }
   function reset(w, h, r)
   {
      this._sW = w;
      this._sH = h;
      this._sR = r;
      this._sZ = 1000 * Math.sin(this._sH);
      var _loc2_ = 1000 * Math.cos(this._sH);
      this._sX = _loc2_ * Math.sin(this._sW);
      this._sY = _loc2_ * Math.cos(this._sW);
   }
}
