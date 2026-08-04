class clazz.splane_phix extends MovieClip
{
   var P1;
   var P2;
   var P3;
   var _colo = 16777215;
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
   var _PN = 3;
   var A_x = 0;
   var A_y = 0;
   var A_z = 0;
   var B_x = 0;
   var B_y = 0;
   var B_z = 0;
   var C_x = 0;
   var C_y = 0;
   var C_z = 0;
   var D_x = 0;
   var D_y = 0;
   var D_z = 0;
   var mainact = null;
   function splane_phix()
   {
      super();
      this.P1 = new Object();
      this.P2 = new Object();
      this.P3 = new Object();
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
         this._parent[this._name].mm._x = this._sx;
         this._parent[this._name].mm._y = this._sy;
      }
   }
   function drawline()
   {
      if(this._cY > 8000 || this._cY < -8000 || this._cX > 8000 || this._cX < -8000 || this._cZ > 8000 || this._cZ < -8000)
      {
         if(_global.Cmr.isShow >= 0)
         {
            this.clear();
         }
      }
      else
      {
         this.clear();
         this.P1 = _global.moveobj(this,this.A_x,this.A_y,this.A_z);
         this.P2 = _global.moveobj(this,this.B_x,this.B_y,this.B_z);
         this.P3 = _global.moveobj(this,this.C_x,this.C_y,this.C_z);
         this.draw3p();
         if(this._PN == 4)
         {
            this.P1 = _global.moveobj(this,this.C_x,this.C_y,this.C_z);
            this.P2 = _global.moveobj(this,this.D_x,this.D_y,this.D_z);
            this.P3 = _global.moveobj(this,this.A_x,this.A_y,this.A_z);
            this.draw3p();
         }
      }
   }
   function draw3p()
   {
      if(_global.Cmr.isShow >= 0)
      {
         var _loc9_ = 0;
         var _loc3_ = 1;
         while(_loc3_ <= 3)
         {
            this["P" + _loc3_].x -= _global.Cmr._sX;
            this["P" + _loc3_].y -= _global.Cmr._sY;
            this["P" + _loc3_].z -= _global.Cmr._sZ;
            var _loc8_ = this["P" + _loc3_].x;
            var _loc7_ = this["P" + _loc3_].y;
            var _loc5_ = Math.cos(- _global.Cmr._sW);
            var _loc4_ = Math.sin(- _global.Cmr._sW);
            this["P" + _loc3_].x = _loc5_ * _loc8_ + _loc4_ * _loc7_;
            this["P" + _loc3_].y = (- _loc4_) * _loc8_ + _loc5_ * _loc7_;
            _loc7_ = this["P" + _loc3_].y;
            var _loc6_ = this["P" + _loc3_].z;
            _loc5_ = Math.cos(- _global.Cmr._sH);
            _loc4_ = Math.sin(- _global.Cmr._sH);
            this["P" + _loc3_].y = _loc5_ * _loc7_ - _loc4_ * _loc6_;
            this["P" + _loc3_].z = _loc4_ * _loc7_ + _loc5_ * _loc6_;
            _loc8_ = this["P" + _loc3_].x;
            _loc6_ = this["P" + _loc3_].z;
            _loc5_ = Math.cos(- _global.Cmr._sR);
            _loc4_ = Math.sin(- _global.Cmr._sR);
            this["P" + _loc3_].x = _loc5_ * _loc8_ - _loc4_ * _loc6_;
            this["P" + _loc3_].z = _loc4_ * _loc8_ + _loc5_ * _loc6_;
            if(this["P" + _loc3_].y > 5)
            {
               this["P" + _loc3_].$x = 0.5 * _global.Cmr._cw + this["P" + _loc3_].x * _global.Cmr.Zoom / this["P" + _loc3_].y;
               this["P" + _loc3_].$y = 0.5 * _global.Cmr._ch - this["P" + _loc3_].z * _global.Cmr.Zoom / this["P" + _loc3_].y;
            }
            else
            {
               _loc9_ += _loc3_ + 1;
            }
            _loc3_ = _loc3_ + 1;
         }
         switch(_loc9_)
         {
            case 0:
               this.beginFill(this._colo);
               this._parent.lineStyle();
               this.moveTo(this.P1.$x,this.P1.$y);
               this.lineTo(this.P2.$x,this.P2.$y);
               this.lineTo(this.P3.$x,this.P3.$y);
               this.lineTo(this.P1.$x,this.P1.$y);
               this.endFill();
               break;
            case 2:
               var _loc20_ = (this.P1.x * (this.P2.y - 5) - this.P2.x * (this.P1.y - 5)) / (this.P2.y - this.P1.y);
               var _loc11_ = 5;
               var _loc17_ = (this.P1.z * (this.P2.y - 5) - this.P2.z * (this.P1.y - 5)) / (this.P2.y - this.P1.y);
               var _loc32_ = 0.5 * _global.Cmr._cw + _loc20_ * _global.Cmr.Zoom / _loc11_;
               var _loc29_ = 0.5 * _global.Cmr._ch - _loc17_ * _global.Cmr.Zoom / _loc11_;
               var _loc19_ = (this.P1.x * (this.P3.y - 5) - this.P3.x * (this.P1.y - 5)) / (this.P3.y - this.P1.y);
               var _loc10_ = 5;
               var _loc16_ = (this.P1.z * (this.P3.y - 5) - this.P3.z * (this.P1.y - 5)) / (this.P3.y - this.P1.y);
               var _loc30_ = 0.5 * _global.Cmr._cw + _loc19_ * _global.Cmr.Zoom / _loc10_;
               var _loc28_ = 0.5 * _global.Cmr._ch - _loc16_ * _global.Cmr.Zoom / _loc10_;
               this.beginFill(this._colo);
               this._parent.lineStyle();
               this.moveTo(_loc30_,_loc28_);
               this.lineTo(_loc32_,_loc29_);
               this.lineTo(this.P2.$x,this.P2.$y);
               this.lineTo(this.P3.$x,this.P3.$y);
               this.lineTo(_loc30_,_loc28_);
               this.endFill();
               break;
            case 3:
               var _loc21_ = (this.P2.x * (this.P3.y - 5) - this.P3.x * (this.P2.y - 5)) / (this.P3.y - this.P2.y);
               var _loc12_ = 5;
               var _loc18_ = (this.P2.z * (this.P3.y - 5) - this.P3.z * (this.P2.y - 5)) / (this.P3.y - this.P2.y);
               var _loc33_ = 0.5 * _global.Cmr._cw + _loc21_ * _global.Cmr.Zoom / _loc12_;
               var _loc31_ = 0.5 * _global.Cmr._ch - _loc18_ * _global.Cmr.Zoom / _loc12_;
               var _loc25_ = (this.P2.x * (this.P1.y - 5) - this.P1.x * (this.P2.y - 5)) / (this.P1.y - this.P2.y);
               var _loc13_ = 5;
               var _loc22_ = (this.P2.z * (this.P1.y - 5) - this.P1.z * (this.P2.y - 5)) / (this.P1.y - this.P2.y);
               var _loc36_ = 0.5 * _global.Cmr._cw + _loc25_ * _global.Cmr.Zoom / _loc13_;
               var _loc34_ = 0.5 * _global.Cmr._ch - _loc22_ * _global.Cmr.Zoom / _loc13_;
               this.beginFill(this._colo);
               this._parent.lineStyle();
               this.moveTo(this.P1.$x,this.P1.$y);
               this.lineTo(_loc36_,_loc34_);
               this.lineTo(_loc33_,_loc31_);
               this.lineTo(this.P3.$x,this.P3.$y);
               this.lineTo(this.P1.$x,this.P1.$y);
               this.endFill();
               break;
            case 4:
               var _loc26_ = (this.P3.x * (this.P2.y - 5) - this.P2.x * (this.P3.y - 5)) / (this.P2.y - this.P3.y);
               var _loc14_ = 5;
               var _loc23_ = (this.P3.z * (this.P2.y - 5) - this.P2.z * (this.P3.y - 5)) / (this.P2.y - this.P3.y);
               var _loc37_ = 0.5 * _global.Cmr._cw + _loc26_ * _global.Cmr.Zoom / _loc14_;
               var _loc35_ = 0.5 * _global.Cmr._ch - _loc23_ * _global.Cmr.Zoom / _loc14_;
               var _loc27_ = (this.P3.x * (this.P1.y - 5) - this.P1.x * (this.P3.y - 5)) / (this.P1.y - this.P3.y);
               var _loc15_ = 5;
               var _loc24_ = (this.P3.z * (this.P1.y - 5) - this.P1.z * (this.P3.y - 5)) / (this.P1.y - this.P3.y);
               var _loc39_ = 0.5 * _global.Cmr._cw + _loc27_ * _global.Cmr.Zoom / _loc15_;
               var _loc38_ = 0.5 * _global.Cmr._ch - _loc24_ * _global.Cmr.Zoom / _loc15_;
               this.beginFill(this._colo);
               this._parent.lineStyle();
               this.moveTo(this.P1.$x,this.P1.$y);
               this.lineTo(this.P2.$x,this.P2.$y);
               this.lineTo(_loc37_,_loc35_);
               this.lineTo(_loc39_,_loc38_);
               this.lineTo(this.P1.$x,this.P1.$y);
               this.endFill();
               break;
            case 5:
               _loc26_ = (this.P3.x * (this.P2.y - 5) - this.P2.x * (this.P3.y - 5)) / (this.P2.y - this.P3.y);
               _loc14_ = 5;
               _loc23_ = (this.P3.z * (this.P2.y - 5) - this.P2.z * (this.P3.y - 5)) / (this.P2.y - this.P3.y);
               _loc37_ = 0.5 * _global.Cmr._cw + _loc26_ * _global.Cmr.Zoom / _loc14_;
               _loc35_ = 0.5 * _global.Cmr._ch - _loc23_ * _global.Cmr.Zoom / _loc14_;
               _loc27_ = (this.P3.x * (this.P1.y - 5) - this.P1.x * (this.P3.y - 5)) / (this.P1.y - this.P3.y);
               _loc15_ = 5;
               _loc24_ = (this.P3.z * (this.P1.y - 5) - this.P1.z * (this.P3.y - 5)) / (this.P1.y - this.P3.y);
               _loc39_ = 0.5 * _global.Cmr._cw + _loc27_ * _global.Cmr.Zoom / _loc15_;
               _loc38_ = 0.5 * _global.Cmr._ch - _loc24_ * _global.Cmr.Zoom / _loc15_;
               this.beginFill(this._colo);
               this._parent.lineStyle();
               this.moveTo(this.P3.$x,this.P3.$y);
               this.lineTo(_loc37_,_loc35_);
               this.lineTo(_loc39_,_loc38_);
               this.lineTo(this.P3.$x,this.P3.$y);
               this.endFill();
               break;
            case 6:
               _loc21_ = (this.P2.x * (this.P3.y - 5) - this.P3.x * (this.P2.y - 5)) / (this.P3.y - this.P2.y);
               _loc12_ = 5;
               _loc18_ = (this.P2.z * (this.P3.y - 5) - this.P3.z * (this.P2.y - 5)) / (this.P3.y - this.P2.y);
               _loc33_ = 0.5 * _global.Cmr._cw + _loc21_ * _global.Cmr.Zoom / _loc12_;
               _loc31_ = 0.5 * _global.Cmr._ch - _loc18_ * _global.Cmr.Zoom / _loc12_;
               _loc25_ = (this.P2.x * (this.P1.y - 5) - this.P1.x * (this.P2.y - 5)) / (this.P1.y - this.P2.y);
               _loc13_ = 5;
               _loc22_ = (this.P2.z * (this.P1.y - 5) - this.P1.z * (this.P2.y - 5)) / (this.P1.y - this.P2.y);
               _loc36_ = 0.5 * _global.Cmr._cw + _loc25_ * _global.Cmr.Zoom / _loc13_;
               _loc34_ = 0.5 * _global.Cmr._ch - _loc22_ * _global.Cmr.Zoom / _loc13_;
               this.beginFill(this._colo);
               this._parent.lineStyle();
               this.moveTo(this.P2.$x,this.P2.$y);
               this.lineTo(_loc36_,_loc34_);
               this.lineTo(_loc33_,_loc31_);
               this.lineTo(this.P2.$x,this.P2.$y);
               this.endFill();
               break;
            case 7:
               _loc20_ = (this.P1.x * (this.P2.y - 5) - this.P2.x * (this.P1.y - 5)) / (this.P2.y - this.P1.y);
               _loc11_ = 5;
               _loc17_ = (this.P1.z * (this.P2.y - 5) - this.P2.z * (this.P1.y - 5)) / (this.P2.y - this.P1.y);
               _loc32_ = 0.5 * _global.Cmr._cw + _loc20_ * _global.Cmr.Zoom / _loc11_;
               _loc29_ = 0.5 * _global.Cmr._ch - _loc17_ * _global.Cmr.Zoom / _loc11_;
               _loc19_ = (this.P1.x * (this.P3.y - 5) - this.P3.x * (this.P1.y - 5)) / (this.P3.y - this.P1.y);
               _loc10_ = 5;
               _loc16_ = (this.P1.z * (this.P3.y - 5) - this.P3.z * (this.P1.y - 5)) / (this.P3.y - this.P1.y);
               _loc30_ = 0.5 * _global.Cmr._cw + _loc19_ * _global.Cmr.Zoom / _loc10_;
               _loc28_ = 0.5 * _global.Cmr._ch - _loc16_ * _global.Cmr.Zoom / _loc10_;
               this.beginFill(this._colo);
               this._parent.lineStyle();
               this.moveTo(this.P1.$x,this.P1.$y);
               this.lineTo(_loc32_,_loc29_);
               this.lineTo(_loc30_,_loc28_);
               this.lineTo(this.P1.$x,this.P1.$y);
               this.endFill();
               break;
            case 9:
         }
      }
   }
   function showcmr()
   {
      this.getxyz();
      this.drawline();
      if(!_global.stopAll)
      {
         this.mainact();
      }
   }
}
