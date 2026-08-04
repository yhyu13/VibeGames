class clazz.sobj_phix extends MovieClip
{
   var linelist;
   var objz;
   var _visibleDst = 100;
   var DoVisible = true;
   var FartoVisible = false;
   var _glow = 0;
   var glow_alpha = 50;
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
   var _rW = 0;
   var _rH = 0;
   var _rR = 0;
   var mainact = null;
   function sobj_phix()
   {
      super();
      this.linelist = new Array();
      this.objz = new Object();
      this.objz._sX = this._sX;
      this.objz._sY = this._sY;
      this.objz._sZ = this._sZ;
      this.objz._sW = this._sW;
      this.objz._sH = this._sH;
      this.objz._sR = this._sR;
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
   function drawline()
   {
      var _loc15_ = _global.Cmr.VisibleLV;
      if(this.DoVisible)
      {
         _loc15_ = 85;
      }
      if(this._cY > _loc15_ * this._visibleDst)
      {
         this.FartoVisible = true;
         this.clear();
      }
      else if(Math.abs(this._cX) > this._cY + this._visibleDst || Math.abs(this._cZ) > this._cY + this._visibleDst)
      {
         this.FartoVisible = false;
         this.clear();
      }
      else
      {
         this.FartoVisible = false;
         if(_global.Cmr.isShow >= 0)
         {
            this.clear();
         }
         var _loc3_ = 0;
         while(_loc3_ <= this.linelist.length - 1)
         {
            if(this.linelist[_loc3_].nam != undefined)
            {
               var _loc5_ = new Object();
               _loc5_ = _global.moveobj(this.objz,this.linelist[_loc3_].p1x,this.linelist[_loc3_].p1y,this.linelist[_loc3_].p1z);
               var _loc4_ = new Object();
               _loc4_ = _global.moveobj(this.objz,this.linelist[_loc3_].p2x,this.linelist[_loc3_].p2y,this.linelist[_loc3_].p2z);
               if(this[this.linelist[_loc3_].nam] == undefined)
               {
                  this.attachMovie("sobl",this.linelist[_loc3_].nam,this.getNextHighestDepth(),{flag:this.linelist[_loc3_].flag,_sX:_loc5_.x,_sY:_loc5_.y,_sZ:_loc5_.z,_sX2:_loc4_.x,_sY2:_loc4_.y,_sZ2:_loc4_.z,_siz:this.linelist[_loc3_]._siz,_sizz:this.linelist[_loc3_]._sizz});
               }
               else
               {
                  this[this.linelist[_loc3_].nam]._sX = _loc5_.x;
                  this[this.linelist[_loc3_].nam]._sY = _loc5_.y;
                  this[this.linelist[_loc3_].nam]._sZ = _loc5_.z;
                  this[this.linelist[_loc3_].nam]._sX2 = _loc4_.x;
                  this[this.linelist[_loc3_].nam]._sY2 = _loc4_.y;
                  this[this.linelist[_loc3_].nam]._sZ2 = _loc4_.z;
                  this[this.linelist[_loc3_].nam]._siz = this.linelist[_loc3_]._siz;
                  this[this.linelist[_loc3_].nam]._sizz = this.linelist[_loc3_]._sizz;
                  if(this.linelist[_loc3_].flag != null)
                  {
                     this[this.linelist[_loc3_].nam].flag = this.linelist[_loc3_].flag;
                  }
                  else
                  {
                     this[this.linelist[_loc3_].nam].flag = "";
                  }
                  if(this.linelist[_loc3_]._glow != null)
                  {
                     this[this.linelist[_loc3_].nam]._glow = this.linelist[_loc3_]._glow;
                  }
                  else
                  {
                     this[this.linelist[_loc3_].nam]._glow = 0;
                  }
                  this[this.linelist[_loc3_].nam].showcmr();
               }
            }
            _loc3_ = _loc3_ + 1;
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
      this.setobjz();
   }
   function setobjz()
   {
      var _loc4_ = this._sW;
      var _loc3_ = this._sH;
      var _loc5_ = this._sR;
      if(this._rW != 0 || this._rH != 0 || this._rR != 0)
      {
         _global.objrotate(this,this._rW,this._rH,this._rR);
      }
      this.objz._sW = this._sW;
      this.objz._sH = this._sH;
      this.objz._sR = this._sR;
      this._sW = _loc4_;
      this._sH = _loc3_;
      this._sR = _loc5_;
      this.objz._sX = this._sX;
      this.objz._sY = this._sY;
      this.objz._sZ = this._sZ;
   }
   function hitobj(obj, r)
   {
      var _loc2_ = 0;
      while(_loc2_ <= this.linelist.length - 1)
      {
         var _loc3_ = this[this.linelist[_loc2_].nam].hitobj(obj,r);
         if(_loc3_ != null)
         {
            return _loc3_;
         }
         _loc2_ = _loc2_ + 1;
      }
      return null;
   }
}
