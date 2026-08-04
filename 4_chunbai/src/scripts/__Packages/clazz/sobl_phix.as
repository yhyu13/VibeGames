class clazz.sobl_phix extends MovieClip
{
   var flag = "";
   var _sX = 0;
   var _sY = 0;
   var _sZ = 0;
   var _sW = 0;
   var _sH = 0;
   var _siz = 10;
   var _siz1 = 1;
   var _siz2 = 1;
   var _sizz = 1;
   var _slo = 0;
   var _colo = 16777215;
   var _glow = 0;
   var glow_alpha = 50;
   var _cX = 0;
   var _cY = 0;
   var _cZ = 0;
   var _sX2 = null;
   var _sY2 = null;
   var _sZ2 = null;
   var _uX = 0;
   var _uY = 0;
   var _uZ = 0;
   var _ucX = 0;
   var _ucY = 0;
   var _ucZ = 0;
   var p1X = 0;
   var p1Y = 0;
   var p1Z = 0;
   var p2X = 0;
   var p2Y = 0;
   var p2Z = 0;
   var p1x = 0;
   var p1c = 100;
   var p1y = 0;
   var p2x = 0;
   var p2c = 100;
   var p2y = 0;
   function sobl_phix()
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
   function getU()
   {
      if(this._sX2 != null && this._sY2 != null && this._sZ2 != null)
      {
         this._uZ = this._sZ2;
         this._uX = this._sX2;
         this._uY = this._sY2;
      }
      else
      {
         var _loc4_ = Math.cos(this._sH);
         var _loc3_ = Math.sin(this._sH);
         this._uZ = this._slo * _loc3_;
         var _loc2_ = this._slo * _loc4_;
         this._uX = _loc2_ * Math.sin(this._sW);
         this._uY = _loc2_ * Math.cos(this._sW);
         this._uZ += this._sZ;
         this._uX += this._sX;
         this._uY += this._sY;
      }
   }
   function getuXYZ()
   {
      this.getU();
      this._ucX = this._uX - _global.Cmr._sX;
      this._ucY = this._uY - _global.Cmr._sY;
      this._ucZ = this._uZ - _global.Cmr._sZ;
      var _loc7_ = this._ucX;
      var _loc6_ = this._ucY;
      var _loc4_ = Math.cos(- _global.Cmr._sW);
      var _loc3_ = Math.sin(- _global.Cmr._sW);
      this._ucX = _loc4_ * _loc7_ + _loc3_ * _loc6_;
      this._ucY = (- _loc3_) * _loc7_ + _loc4_ * _loc6_;
      _loc6_ = this._ucY;
      var _loc5_ = this._ucZ;
      _loc4_ = Math.cos(- _global.Cmr._sH);
      _loc3_ = Math.sin(- _global.Cmr._sH);
      this._ucY = _loc4_ * _loc6_ - _loc3_ * _loc5_;
      this._ucZ = _loc3_ * _loc6_ + _loc4_ * _loc5_;
      _loc7_ = this._ucX;
      _loc5_ = this._ucZ;
      _loc4_ = Math.cos(- _global.Cmr._sR);
      _loc3_ = Math.sin(- _global.Cmr._sR);
      this._ucX = _loc4_ * _loc7_ - _loc3_ * _loc5_;
      this._ucZ = _loc3_ * _loc7_ + _loc4_ * _loc5_;
   }
   function getp()
   {
      this.getXYZ();
      this.getuXYZ();
      if(this._cY > 5 && this._ucY > 5)
      {
         this.p1X = this._cX;
         this.p1Y = this._cY;
         this.p1Z = this._cZ;
         this._siz1 = 1;
         this.p2X = this._ucX;
         this.p2Y = this._ucY;
         this.p2Z = this._ucZ;
         this._siz2 = this._sizz;
      }
      else if(this._cY <= 5 && this._ucY <= 5)
      {
         this.p1X = null;
         this.p1Y = null;
         this.p1Z = null;
         this._siz1 = null;
         this.p2X = null;
         this.p2Y = null;
         this.p2Z = null;
         this._siz2 = null;
      }
      else if(this._cY > 5)
      {
         this.p1X = this._cX;
         this.p1Y = this._cY;
         this.p1Z = this._cZ;
         this._siz1 = 1;
         this.p2X = (this._cX * (this._ucY - 5) - this._ucX * (this._cY - 5)) / (this._ucY - this._cY);
         this.p2Y = 5;
         this.p2Z = (this._cZ * (this._ucY - 5) - this._ucZ * (this._cY - 5)) / (this._ucY - this._cY);
         this._siz2 = (this._ucY - 5 - this._sizz * (this._cY - 5)) / (this._ucY - this._cY);
      }
      else if(this._ucY > 5)
      {
         this.p1X = (this._cX * (this._ucY - 5) - this._ucX * (this._cY - 5)) / (this._ucY - this._cY);
         this.p1Y = 5;
         this.p1Z = (this._cZ * (this._ucY - 5) - this._ucZ * (this._cY - 5)) / (this._ucY - this._cY);
         this._siz1 = (this._ucY - 5 - this._sizz * (this._cY - 5)) / (this._ucY - this._cY);
         this.p2X = this._ucX;
         this.p2Y = this._ucY;
         this.p2Z = this._ucZ;
         this._siz2 = this._sizz;
      }
      if(this._siz1 != null)
      {
         this.p1c = _global.Cmr.Zoom / this.p1Y;
         this.p1y = 0.5 * _global.Cmr._ch - this.p1Z * this.p1c;
         this.p1x = 0.5 * _global.Cmr._cw + this.p1X * this.p1c;
         this.p2c = _global.Cmr.Zoom / this.p2Y;
         this.p2y = 0.5 * _global.Cmr._ch - this.p2Z * this.p2c;
         this.p2x = 0.5 * _global.Cmr._cw + this.p2X * this.p2c;
      }
      else
      {
         this.p1c = null;
         this.p1y = null;
         this.p1x = null;
         this.p2c = null;
         this.p2y = null;
         this.p2x = null;
      }
   }
   function showcmr()
   {
      this.getp();
      if(_global.Cmr.isShow >= 0 && this._visible)
      {
         var _loc5_ = 0;
         var _loc4_ = 0;
         var _loc11_ = 0;
         var _loc10_ = 0;
         var _loc22_ = 0;
         var _loc17_ = 0;
         var _loc18_ = 0;
         var _loc15_ = 0;
         var _loc9_ = 0;
         var _loc8_ = 0;
         var _loc13_ = 0;
         var _loc12_ = 0;
         var _loc23_ = 0;
         var _loc19_ = 0;
         var _loc24_ = 0;
         var _loc20_ = 0;
         var _loc26_ = 0;
         var _loc25_ = 0;
         var _loc21_ = 0;
         var _loc16_ = 0;
         if(this.p2y != null && this.p1y != null && this.p2x != null && this.p1x != null)
         {
            if(this._siz > 0)
            {
               var _loc3_ = Math.atan2(this.p2y - this.p1y,this.p2x - this.p1x);
               var _loc7_ = 0.5 * this.p1c * this._siz * this._siz1;
               var _loc6_ = 0.5 * this.p2c * this._siz * this._siz2;
               var _loc14_ = _global.distance(this.p2x,this.p2y,this.p1x,this.p1y);
               var _loc29_ = this.p1x;
               var _loc28_ = this.p2x;
               var _loc27_ = this.p1y;
               var _loc30_ = this.p2y;
               if(_loc7_ - _loc6_ > _loc14_)
               {
                  this.p2x = 0.99 * this.p1x + 0.01 * this.p2x;
                  this.p2y = 0.99 * this.p1y + 0.01 * this.p2y;
                  _loc5_ = _loc7_ * Math.cos(_loc3_ + 1.5707963267948966);
                  _loc4_ = _loc7_ * Math.sin(_loc3_ + 1.5707963267948966);
                  _loc9_ = _loc7_ * Math.cos(_loc3_ + 3.141592653589793);
                  _loc8_ = _loc7_ * Math.sin(_loc3_ + 3.141592653589793);
                  _loc11_ = _loc5_;
                  _loc10_ = _loc4_;
                  _loc13_ = - _loc9_;
                  _loc12_ = - _loc8_;
               }
               else if(_loc6_ - _loc7_ > _loc14_)
               {
                  this.p1x = 0.99 * this.p2x + 0.01 * this.p1x;
                  this.p1y = 0.99 * this.p2y + 0.01 * this.p1y;
                  _loc5_ = _loc6_ * Math.cos(_loc3_ + 1.5707963267948966);
                  _loc4_ = _loc6_ * Math.sin(_loc3_ + 1.5707963267948966);
                  _loc9_ = _loc6_ * Math.cos(_loc3_ + 3.141592653589793);
                  _loc8_ = _loc6_ * Math.sin(_loc3_ + 3.141592653589793);
                  _loc11_ = _loc5_;
                  _loc10_ = _loc4_;
                  _loc13_ = - _loc9_;
                  _loc12_ = - _loc8_;
               }
               else
               {
                  _loc5_ = _loc7_ * Math.cos(_loc3_ + 1.5707963267948966);
                  _loc4_ = _loc7_ * Math.sin(_loc3_ + 1.5707963267948966);
                  _loc9_ = _loc7_ * Math.cos(_loc3_ + 3.141592653589793);
                  _loc8_ = _loc7_ * Math.sin(_loc3_ + 3.141592653589793);
                  _loc11_ = _loc6_ * Math.cos(_loc3_ + 1.5707963267948966);
                  _loc10_ = _loc6_ * Math.sin(_loc3_ + 1.5707963267948966);
                  _loc13_ = (- _loc6_) * Math.cos(_loc3_ + 3.141592653589793);
                  _loc12_ = (- _loc6_) * Math.sin(_loc3_ + 3.141592653589793);
               }
               _loc9_ = this.p1x + _loc9_;
               _loc8_ = this.p1y + _loc8_;
               _loc13_ = this.p2x + _loc13_;
               _loc12_ = this.p2y + _loc12_;
               _loc23_ = _loc13_ + 0.8 * _loc11_;
               _loc19_ = _loc12_ + 0.8 * _loc10_;
               _loc24_ = _loc13_ - 0.8 * _loc11_;
               _loc20_ = _loc12_ - 0.8 * _loc10_;
               _loc26_ = _loc9_ - 0.8 * _loc5_;
               _loc25_ = _loc8_ - 0.8 * _loc4_;
               _loc21_ = _loc9_ + 0.8 * _loc5_;
               _loc16_ = _loc8_ + 0.8 * _loc4_;
               _loc18_ = this.p1x - _loc5_;
               _loc15_ = this.p1y - _loc4_;
               _loc5_ = this.p1x + _loc5_;
               _loc4_ = this.p1y + _loc4_;
               _loc22_ = this.p2x - _loc11_;
               _loc17_ = this.p2y - _loc10_;
               _loc11_ = this.p2x + _loc11_;
               _loc10_ = this.p2y + _loc10_;
               this._parent.beginFill(this._colo,this._alpha);
               this._parent.lineStyle();
               this._parent.moveTo(_loc11_,_loc10_);
               this._parent.curveTo(_loc23_,_loc19_,_loc13_,_loc12_);
               this._parent.curveTo(_loc24_,_loc20_,_loc22_,_loc17_);
               this._parent.lineTo(_loc18_,_loc15_);
               this._parent.curveTo(_loc26_,_loc25_,_loc9_,_loc8_);
               this._parent.curveTo(_loc21_,_loc16_,_loc5_,_loc4_);
               this._parent.endFill();
               if(this._parent._glow > 0)
               {
                  this.p1x = _loc29_;
                  this.p2x = _loc28_;
                  this.p1y = _loc27_;
                  this.p2y = _loc30_;
                  _loc7_ += 0.5 * this.p1c * this._parent._glow;
                  _loc6_ += 0.5 * this.p2c * this._parent._glow;
                  if(_loc7_ - _loc6_ > _loc14_)
                  {
                     this.p2x = 0.99 * this.p1x + 0.01 * this.p2x;
                     this.p2y = 0.99 * this.p1y + 0.01 * this.p2y;
                     _loc5_ = _loc7_ * Math.cos(_loc3_ + 1.5707963267948966);
                     _loc4_ = _loc7_ * Math.sin(_loc3_ + 1.5707963267948966);
                     _loc9_ = _loc7_ * Math.cos(_loc3_ + 3.141592653589793);
                     _loc8_ = _loc7_ * Math.sin(_loc3_ + 3.141592653589793);
                     _loc11_ = _loc5_;
                     _loc10_ = _loc4_;
                     _loc13_ = - _loc9_;
                     _loc12_ = - _loc8_;
                  }
                  else if(_loc6_ - _loc7_ > _loc14_)
                  {
                     this.p1x = 0.99 * this.p2x + 0.01 * this.p1x;
                     this.p1y = 0.99 * this.p2y + 0.01 * this.p1y;
                     _loc5_ = _loc6_ * Math.cos(_loc3_ + 1.5707963267948966);
                     _loc4_ = _loc6_ * Math.sin(_loc3_ + 1.5707963267948966);
                     _loc9_ = _loc6_ * Math.cos(_loc3_ + 3.141592653589793);
                     _loc8_ = _loc6_ * Math.sin(_loc3_ + 3.141592653589793);
                     _loc11_ = _loc5_;
                     _loc10_ = _loc4_;
                     _loc13_ = - _loc9_;
                     _loc12_ = - _loc8_;
                  }
                  else
                  {
                     _loc5_ = _loc7_ * Math.cos(_loc3_ + 1.5707963267948966);
                     _loc4_ = _loc7_ * Math.sin(_loc3_ + 1.5707963267948966);
                     _loc9_ = _loc7_ * Math.cos(_loc3_ + 3.141592653589793);
                     _loc8_ = _loc7_ * Math.sin(_loc3_ + 3.141592653589793);
                     _loc11_ = _loc6_ * Math.cos(_loc3_ + 1.5707963267948966);
                     _loc10_ = _loc6_ * Math.sin(_loc3_ + 1.5707963267948966);
                     _loc13_ = (- _loc6_) * Math.cos(_loc3_ + 3.141592653589793);
                     _loc12_ = (- _loc6_) * Math.sin(_loc3_ + 3.141592653589793);
                  }
                  _loc9_ = this.p1x + _loc9_;
                  _loc8_ = this.p1y + _loc8_;
                  _loc13_ = this.p2x + _loc13_;
                  _loc12_ = this.p2y + _loc12_;
                  _loc23_ = _loc13_ + 0.8 * _loc11_;
                  _loc19_ = _loc12_ + 0.8 * _loc10_;
                  _loc24_ = _loc13_ - 0.8 * _loc11_;
                  _loc20_ = _loc12_ - 0.8 * _loc10_;
                  _loc26_ = _loc9_ - 0.8 * _loc5_;
                  _loc25_ = _loc8_ - 0.8 * _loc4_;
                  _loc21_ = _loc9_ + 0.8 * _loc5_;
                  _loc16_ = _loc8_ + 0.8 * _loc4_;
                  _loc18_ = this.p1x - _loc5_;
                  _loc15_ = this.p1y - _loc4_;
                  _loc5_ = this.p1x + _loc5_;
                  _loc4_ = this.p1y + _loc4_;
                  _loc22_ = this.p2x - _loc11_;
                  _loc17_ = this.p2y - _loc10_;
                  _loc11_ = this.p2x + _loc11_;
                  _loc10_ = this.p2y + _loc10_;
                  this._parent.beginFill(this._colo,this._parent.glow_alpha);
                  this._parent.lineStyle();
                  this._parent.moveTo(_loc11_,_loc10_);
                  this._parent.curveTo(_loc23_,_loc19_,_loc13_,_loc12_);
                  this._parent.curveTo(_loc24_,_loc20_,_loc22_,_loc17_);
                  this._parent.lineTo(_loc18_,_loc15_);
                  this._parent.curveTo(_loc26_,_loc25_,_loc9_,_loc8_);
                  this._parent.curveTo(_loc21_,_loc16_,_loc5_,_loc4_);
                  this._parent.endFill();
               }
               if(this._glow > 0)
               {
                  this.p1x = _loc29_;
                  this.p2x = _loc28_;
                  this.p1y = _loc27_;
                  this.p2y = _loc30_;
                  _loc7_ += 0.5 * this.p1c * this._glow;
                  _loc6_ += 0.5 * this.p2c * this._glow;
                  if(_loc7_ - _loc6_ > _loc14_)
                  {
                     this.p2x = 0.99 * this.p1x + 0.01 * this.p2x;
                     this.p2y = 0.99 * this.p1y + 0.01 * this.p2y;
                     _loc5_ = _loc7_ * Math.cos(_loc3_ + 1.5707963267948966);
                     _loc4_ = _loc7_ * Math.sin(_loc3_ + 1.5707963267948966);
                     _loc9_ = _loc7_ * Math.cos(_loc3_ + 3.141592653589793);
                     _loc8_ = _loc7_ * Math.sin(_loc3_ + 3.141592653589793);
                     _loc11_ = _loc5_;
                     _loc10_ = _loc4_;
                     _loc13_ = - _loc9_;
                     _loc12_ = - _loc8_;
                  }
                  else if(_loc6_ - _loc7_ > _loc14_)
                  {
                     this.p1x = 0.99 * this.p2x + 0.01 * this.p1x;
                     this.p1y = 0.99 * this.p2y + 0.01 * this.p1y;
                     _loc5_ = _loc6_ * Math.cos(_loc3_ + 1.5707963267948966);
                     _loc4_ = _loc6_ * Math.sin(_loc3_ + 1.5707963267948966);
                     _loc9_ = _loc6_ * Math.cos(_loc3_ + 3.141592653589793);
                     _loc8_ = _loc6_ * Math.sin(_loc3_ + 3.141592653589793);
                     _loc11_ = _loc5_;
                     _loc10_ = _loc4_;
                     _loc13_ = - _loc9_;
                     _loc12_ = - _loc8_;
                  }
                  else
                  {
                     _loc5_ = _loc7_ * Math.cos(_loc3_ + 1.5707963267948966);
                     _loc4_ = _loc7_ * Math.sin(_loc3_ + 1.5707963267948966);
                     _loc9_ = _loc7_ * Math.cos(_loc3_ + 3.141592653589793);
                     _loc8_ = _loc7_ * Math.sin(_loc3_ + 3.141592653589793);
                     _loc11_ = _loc6_ * Math.cos(_loc3_ + 1.5707963267948966);
                     _loc10_ = _loc6_ * Math.sin(_loc3_ + 1.5707963267948966);
                     _loc13_ = (- _loc6_) * Math.cos(_loc3_ + 3.141592653589793);
                     _loc12_ = (- _loc6_) * Math.sin(_loc3_ + 3.141592653589793);
                  }
                  _loc9_ = this.p1x + _loc9_;
                  _loc8_ = this.p1y + _loc8_;
                  _loc13_ = this.p2x + _loc13_;
                  _loc12_ = this.p2y + _loc12_;
                  _loc23_ = _loc13_ + 0.8 * _loc11_;
                  _loc19_ = _loc12_ + 0.8 * _loc10_;
                  _loc24_ = _loc13_ - 0.8 * _loc11_;
                  _loc20_ = _loc12_ - 0.8 * _loc10_;
                  _loc26_ = _loc9_ - 0.8 * _loc5_;
                  _loc25_ = _loc8_ - 0.8 * _loc4_;
                  _loc21_ = _loc9_ + 0.8 * _loc5_;
                  _loc16_ = _loc8_ + 0.8 * _loc4_;
                  _loc18_ = this.p1x - _loc5_;
                  _loc15_ = this.p1y - _loc4_;
                  _loc5_ = this.p1x + _loc5_;
                  _loc4_ = this.p1y + _loc4_;
                  _loc22_ = this.p2x - _loc11_;
                  _loc17_ = this.p2y - _loc10_;
                  _loc11_ = this.p2x + _loc11_;
                  _loc10_ = this.p2y + _loc10_;
                  this._parent.beginFill(this._colo,this.glow_alpha);
                  this._parent.lineStyle();
                  this._parent.moveTo(_loc11_,_loc10_);
                  this._parent.curveTo(_loc23_,_loc19_,_loc13_,_loc12_);
                  this._parent.curveTo(_loc24_,_loc20_,_loc22_,_loc17_);
                  this._parent.lineTo(_loc18_,_loc15_);
                  this._parent.curveTo(_loc26_,_loc25_,_loc9_,_loc8_);
                  this._parent.curveTo(_loc21_,_loc16_,_loc5_,_loc4_);
                  this._parent.endFill();
               }
            }
            else if(this._siz < 0)
            {
               this._parent.beginFill(this._colo,this.glow_alpha);
               this._parent.lineStyle(-1 * this._siz,this._colo);
               this._parent.moveTo(this.p1x,this.p1y);
               this._parent.lineTo(this.p2x,this.p2y);
               this._parent.endFill();
            }
         }
      }
   }
   function hitobj(obj, r)
   {
      if(obj != undefined && obj != null)
      {
         var _loc5_ = _global.dist_3d(this._sX,this._sY,this._sZ,obj._sX,obj._sY,obj._sZ);
         if(this._slo >= 0 && this._slo <= r || this._slo < 0 && this._slo >= - r)
         {
            if(_loc5_ <= r)
            {
               var _loc3_ = new Object();
               _loc3_._sZ = this._sZ;
               _loc3_._sX = this._sX;
               _loc3_._sY = this._sY;
               return _loc3_;
            }
         }
         if(this._slo > 0 && _loc5_ <= this._slo)
         {
            _loc3_ = new Object();
            var _loc9_ = Math.cos(this._sH);
            var _loc8_ = Math.sin(this._sH);
            _loc3_._sZ = _loc5_ * _loc8_;
            var _loc7_ = _loc5_ * _loc9_;
            _loc3_._sX = _loc7_ * Math.sin(this._sW);
            _loc3_._sY = _loc7_ * Math.cos(this._sW);
            _loc3_._sZ += this._sZ;
            _loc3_._sX += this._sX;
            _loc3_._sY += this._sY;
            if(_global.dist_3d(_loc3_._sX,_loc3_._sY,_loc3_._sZ,obj._sX,obj._sY,obj._sZ) <= r)
            {
               return _loc3_;
            }
            return null;
         }
         if(this._slo < 0 && - _loc5_ >= this._slo)
         {
            _loc3_ = new Object();
            _loc9_ = Math.cos(this._sH);
            _loc8_ = Math.sin(this._sH);
            _loc3_._sZ = (- _loc5_) * _loc8_;
            _loc7_ = (- _loc5_) * _loc9_;
            _loc3_._sX = _loc7_ * Math.sin(this._sW);
            _loc3_._sY = _loc7_ * Math.cos(this._sW);
            _loc3_._sZ += this._sZ;
            _loc3_._sX += this._sX;
            _loc3_._sY += this._sY;
            if(_global.dist_3d(_loc3_._sX,_loc3_._sY,_loc3_._sZ,obj._sX,obj._sY,obj._sZ) <= r)
            {
               return _loc3_;
            }
            return null;
         }
         return null;
      }
      return null;
   }
}
