onClipEvent(load){
   this.attachMovie("sobj","it",this.getNextHighestDepth());
   this.showit = function()
   {
      snd("dangX3");
      this.it.removeMovieClip();
      var _loc11_ = undefined;
      if(this._parent.viewMS._size == "L")
      {
         _loc11_ = 160;
      }
      else
      {
         _loc11_ = 80;
      }
      this.attachMovie("sobj","it",this.getNextHighestDepth(),{_sX:0,_sY:_loc11_,_sZ:0,_sW:3.141592653589793,_alpha:50});
      this.it.t = 0;
      if(this._parent.viewMS.dataStr != null)
      {
         this._parent.msdata._visible = true;
         this._parent.msdata.txt.text = this._parent.viewMS.dataStr;
         this._parent.msdata.txt2.text = this._parent.viewMS.dataStr2;
      }
      else
      {
         this._parent.msdata._visible = false;
         this._parent.msdata.txt.text = "";
         this._parent.msdata.txt2.text = "";
      }
      this._parent._info = "";
      this._parent._info += this._parent.viewMS.$TYPE + "\n" + this._parent.viewMS.$NAME;
      if(this._parent.TSon && this._parent.viewMS._type == "TMS")
      {
         this._parent._info += "\r类型: TMA    体积: " + this._parent.viewMS._size;
      }
      else if(this._parent.TSon && this._parent.viewMS._type == "TMA")
      {
         this._parent._info += "\r类型: TMS    体积: " + this._parent.viewMS._size;
      }
      else
      {
         this._parent._info += "\r类型: " + this._parent.viewMS._type + "    体积: " + this._parent.viewMS._size;
      }
      if(this._parent.viewMS._defeq != null || this._parent.viewMS._atteq != null || this._parent.viewMS.coreUnit != null)
      {
         if(this._parent.viewMS._defeq == null)
         {
            var _loc14_ = "";
         }
         else
         {
            _loc14_ = this._parent.viewMS._defeq;
         }
         if(this._parent.viewMS._atteq == null)
         {
            var _loc13_ = "";
         }
         else
         {
            _loc13_ = this._parent.viewMS._atteq;
         }
         if(this._parent.viewMS.coreUnit == null)
         {
            var _loc12_ = "";
         }
         else
         {
            _loc12_ = "爆甲";
         }
         this._parent._info += "\r特殊能力:" + _loc14_ + " " + _loc13_ + " " + _loc12_ + " ";
      }
      var _loc8_ = this._parent.viewMS.maxHP / 50 + this._parent.viewMS.maxEN / 50 + this._parent.viewMS._DF / 10 + this._parent.viewMS.speedlv + this._parent.viewMS.subpowlv + this._parent.viewMS.turnlv + this._parent.viewMS.locklv;
      _loc8_ = Math.round(_loc8_ / 7);
      this._parent.txt_info = "";
      this._parent.wpinfo.loadata();
      this.it.smod = new Array();
      if(this._parent.viewMS._type == "MS" || this._parent.viewMS._type == "TMS" && !this._parent.TSon || this._parent.viewMS._type == "TMA" && this._parent.TSon)
      {
         if(_global[this._parent.viewMS.BDmod + "_1"] != undefined)
         {
            this.it.smod = this.it.smod.concat(_global[this._parent.viewMS.BDmod + "_1"]);
         }
         if(_global[this._parent.viewMS.LGmod + "_1"] != undefined)
         {
            this.it.smod = this.it.smod.concat(_global[this._parent.viewMS.LGmod + "_1"]);
         }
         var _loc7_ = _global[this._parent.viewMS["wp" + this._parent.wpinfo._currentframe]].lap;
         if(_loc7_ == null)
         {
            _loc7_ = 1;
         }
         if(_global[this._parent.viewMS.LAmod + "_" + _loc7_] != undefined)
         {
            this.it.smod = this.it.smod.concat(_global[this._parent.viewMS.LAmod + "_" + _loc7_]);
         }
         var _loc10_ = _global[this._parent.viewMS["wp" + this._parent.wpinfo._currentframe]].rap;
         if(_loc10_ == null)
         {
            _loc10_ = 1;
         }
         if(_global[this._parent.viewMS.RAmod + "_" + _loc10_] != undefined)
         {
            this.it.smod = this.it.smod.concat(_global[this._parent.viewMS.RAmod + "_" + _loc10_]);
         }
         if(_global[this._parent.viewMS.WImod + "_1"] != undefined)
         {
            this.it.smod = this.it.smod.concat(_global[this._parent.viewMS.WImod + "_1"]);
         }
         var _loc9_ = _global[this._parent.viewMS["wp" + this._parent.wpinfo._currentframe]].shdp;
         if(_loc9_ == null)
         {
            _loc9_ = 1;
         }
         if(_global[this._parent.viewMS.SHDmod + "_" + _loc9_] != undefined)
         {
            this.it.smod = this.it.smod.concat(_global[this._parent.viewMS.SHDmod + "_" + _loc9_]);
         }
      }
      else if(_global[this._parent.viewMS.MAmod + "_1"] != undefined)
      {
         this.it.smod = this.it.smod.concat(_global[this._parent.viewMS.MAmod + "_1"]);
      }
      this._parent._info += "\r造价:" + (_loc8_ * 100 + this.it.smod.length);
      this._parent.sklist.reset();
      if(this._parent.viewMS.locklv >= 60)
      {
         this._parent.sklist.sk3.textColor = 6711039;
         this._parent.sklist.skb3._visible = true;
      }
      if(this._parent.viewMS.maxHP >= 4000 && this._parent.viewMS._size == "L")
      {
         this._parent.sklist.sk9.textColor = 6711039;
         this._parent.sklist.skb9._visible = true;
      }
      if(this._parent.viewMS._DF >= 350)
      {
         this._parent.sklist.sk10.textColor = 6711039;
         this._parent.sklist.skb10._visible = true;
      }
      if(this._parent.viewMS._size != "L")
      {
         if(this._parent.viewMS.SHDmod != null)
         {
            this._parent.sklist.sk1.textColor = 6711039;
            this._parent.sklist.skb1._visible = true;
         }
         if(_loc8_ < 50)
         {
            this._parent.sklist.sk12.textColor = 6711039;
            this._parent.sklist.skb12._visible = true;
         }
         else
         {
            this._parent.sklist.sk11.textColor = 6711039;
            this._parent.sklist.skb11._visible = true;
         }
      }
      else
      {
         this._parent.sklist.sk8.textColor = 6711039;
         this._parent.sklist.skb8._visible = true;
      }
      var _loc4_ = 0;
      var _loc6_ = true;
      var _loc5_ = false;
      var _loc3_ = 1;
      while(_loc3_ <= 8)
      {
         if(_global[this._parent.viewMS["wp" + _loc3_]].ftype == "beamX2" || _global[this._parent.viewMS["wp" + _loc3_]].ftype == "beamX" || _global[this._parent.viewMS["wp" + _loc3_]].ftype == "beamXX" || _global[this._parent.viewMS["wp" + _loc3_]].ftype == "msbeamXX" || _global[this._parent.viewMS["wp" + _loc3_]].ftype == "beams")
         {
            _loc4_ = _loc4_ + 1;
         }
         else if(_global[this._parent.viewMS["wp" + _loc3_]].ftype == "sbeam" || _global[this._parent.viewMS["wp" + _loc3_]].ftype == "Ssbeam" || _global[this._parent.viewMS["wp" + _loc3_]].ftype == "sniperbeam" || _global[this._parent.viewMS["wp" + _loc3_]].ftype == "Ccannon")
         {
            _loc6_ = false;
            this._parent.sklist.sk3.textColor = 6711039;
            this._parent.sklist.skb3._visible = true;
         }
         else if(_global[this._parent.viewMS["wp" + _loc3_]].ftype == "cartridge")
         {
            this._parent.sklist.sk5.textColor = 6711039;
            this._parent.sklist.skb5._visible = true;
         }
         else if(_global[this._parent.viewMS["wp" + _loc3_]].ftype == "fds" || _global[this._parent.viewMS["wp" + _loc3_]].ftype == "fd")
         {
            this._parent.sklist.sk4.textColor = 6711039;
            this._parent.sklist.skb4._visible = true;
         }
         else if(_global[this._parent.viewMS["wp" + _loc3_]].ftype == "beam" || _global[this._parent.viewMS["wp" + _loc3_]].ftype == "msbeam")
         {
            _loc4_ = _loc4_ + 1;
            this._parent.sklist.sk6.textColor = 6711039;
            this._parent.sklist.skb6._visible = true;
         }
         else if(_global[this._parent.viewMS["wp" + _loc3_]].ftype == "gj" || _global[this._parent.viewMS["wp" + _loc3_]].ftype == "axe")
         {
            _loc5_ = true;
         }
         else if(_global[this._parent.viewMS["wp" + _loc3_]].ftype == "zd" || _global[this._parent.viewMS["wp" + _loc3_]].ftype == "szd" || _global[this._parent.viewMS["wp" + _loc3_]].ftype == "zdXX")
         {
            this._parent.sklist.sk7.textColor = 6711039;
            this._parent.sklist.skb7._visible = true;
         }
         _loc3_ = _loc3_ + 1;
      }
      if(_loc6_ && _loc5_)
      {
         this._parent.sklist.sk2.textColor = 6711039;
         this._parent.sklist.skb2._visible = true;
      }
      if(this._parent.viewMS.maxEN >= 3000 && _loc4_ >= 2)
      {
         this._parent.sklist.sk8.textColor = 6711039;
         this._parent.sklist.skb8._visible = true;
      }
      this.it.onEnterFrame = function()
      {
         if(this.t > 20 && this.t - 20 <= mblength(this._parent._parent._info))
         {
            this._parent._parent.txt_info = mbsubstring(this._parent._parent._info,1,this.t - 20);
         }
         if(this.t < this.smod.length)
         {
            this.linelist[this.t] = this.smod[this.t];
         }
         else
         {
            this._alpha = 100;
            if(this.t == this.smod.length)
            {
               if(this._parent._parent.viewMS._type == "MS" || this._parent._parent.viewMS._type == "TMS" && !this._parent._parent.TSon || this._parent._parent.viewMS._type == "TMA" && this._parent._parent.TSon || this._parent._parent.viewMS._type == "HMS")
               {
                  if(_global[this._parent._parent.viewMS["wp" + this._parent._parent.wpinfo._currentframe]].wpmod != null && _global[this._parent._parent.viewMS["wp" + this._parent._parent.wpinfo._currentframe]].wpmod != undefined)
                  {
                     this.linelist = this.linelist.concat(_global[this._parent._parent.viewMS["wp" + this._parent._parent.wpinfo._currentframe]].wpmod);
                  }
               }
            }
         }
         this.t = this.t + 1;
         this._sW += 0.031415926535897934;
         this.showcmr();
      };
   };
   this.showit();
}
