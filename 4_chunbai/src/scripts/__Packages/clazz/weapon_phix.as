class clazz.weapon_phix extends MovieClip
{
   var onEnterFrame;
   var seths;
   var ln;
   var wpID = null;
   var lockmod = 0;
   var $NAME = "不明";
   var damlv = 0;
   var ddspeedlv = 0;
   var dstlv = 0;
   var maxforce = 0;
   var srlv = 1;
   var lnt = 0;
   var lct = 30;
   var t = 0;
   var ct = 1;
   var cn = 1;
   var cnn = 1;
   var maxcn = 1;
   var maxcnn = 1;
   var en = 0;
   var fn = 1;
   var rg = 1;
   var mod = null;
   var wpmod = null;
   var wpmodon = true;
   var fsiz = 1;
   var ftype = null;
   var fclass = null;
   var fx = 0;
   var fy = 0;
   var fz = 0;
   var fw = 0;
   var fh = 0;
   var fr = 0;
   var lap = 1;
   var rap = 1;
   var shdp = 0;
   var fsound = null;
   var _zt = "nor";
   var confine = null;
   var zdi = 0;
   var zditemp = 0;
   function weapon_phix()
   {
      super();
      this.onEnterFrame = function()
      {
         if(!_global.stopAll)
         {
            if(this.t > 0)
            {
               this.t = this.t - 1;
            }
            this._zt = "nor";
            this.seths();
            if(this.en > 0)
            {
               if(this._parent._EN < this.en)
               {
                  this._zt = "noen";
               }
            }
            else if(this.cn <= 0 && this.ln <= 0)
            {
               this._zt = "emp";
            }
            if(this.confine != null && this._parent._type != this.confine)
            {
               this._zt = "hide";
            }
         }
      };
   }
   function przdi()
   {
      if(this.zdi == 0)
      {
         return 50000;
      }
      return this.zdi - 1;
   }
   function nxzdi()
   {
      if(this.zdi == 50000)
      {
         return 0;
      }
      return this.zdi + 1;
   }
   function linkdata(weapondata)
   {
      for(var _loc3_ in weapondata)
      {
         this[_loc3_] = weapondata[_loc3_];
      }
      if(this.ddspeedlv <= 100)
      {
         this.srlv = 5;
      }
      else
      {
         this.srlv = 1;
      }
      this.zdi = 0;
      this.t = 0;
      this.cn = this.maxcn;
      this.cnn = this.maxcnn;
      if(this._parent.skill_6 > 0)
      {
         if(this.ftype == "beam" || this.ftype == "msbeam")
         {
            var _loc4_ = Math.floor(this.en / 2);
            this.en -= _loc4_;
         }
      }
      if(this.ftype == "tuji" || this.ftype == "qishe")
      {
         this.en = Math.floor(this.en * this._parent._Rank / 100);
         this.damlv = Math.floor(this.damlv * this._parent._Rank / 100);
      }
   }
   function ggCD1(weapondata)
   {
      var _loc2_ = 1;
      while(_loc2_ <= 8)
      {
         if(this._parent["weapon" + _loc2_].ftype == "sgj" || this._parent["weapon" + _loc2_].ftype == "SsbeamEX" || this._parent["weapon" + _loc2_].ftype == "SsbeamEX" || this._parent["weapon" + _loc2_].ftype == "sniperbeamEX" || this._parent["weapon" + _loc2_].ftype == "sniperbeam" || this._parent["weapon" + _loc2_].ftype == "sbeamsEX" || this._parent["weapon" + _loc2_].ftype == "sbeams" || this._parent["weapon" + _loc2_].ftype == "sbeam" || this._parent["weapon" + _loc2_].ftype == "sbeamB")
         {
            this._parent["weapon" + _loc2_].t = this._parent["weapon" + _loc2_].ct;
         }
         _loc2_ = _loc2_ + 1;
      }
   }
}
