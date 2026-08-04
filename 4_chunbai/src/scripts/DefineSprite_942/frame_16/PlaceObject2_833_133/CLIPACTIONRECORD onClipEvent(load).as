onClipEvent(load){
   this.loadata = function()
   {
      this.tmp = "";
      this.txt_info = "";
      if(_global[this._parent.viewMS["wp" + this._currentframe]] != undefined)
      {
         var _loc3_ = new Object();
         _loc3_ = _global[this._parent.viewMS["wp" + this._currentframe]];
         tmp += _loc3_.$NAME;
         if(_loc3_.ftype == "gj" || _loc3_.ftype == "lgj" || _loc3_.ftype == "axe")
         {
            tmp += "\r发动距离: " + _loc3_.dstlv;
            if(_loc3_.ct >= 10)
            {
               tmp += "\r冷却: " + Math.round(10 * _loc3_.ct / 30) / 10 + "s";
            }
            tmp += "\r威力: " + _loc3_.damlv + " /HIT";
            tmp += "\rEN消耗: " + _loc3_.en;
         }
         else if(_loc3_.ftype == "sgj" || _loc3_.ftype == "tuji" || _loc3_.ftype == "sbeamsEX" || _loc3_.ftype == "qishe" || _loc3_.ftype == "SsbeamEX" || _loc3_.ftype == "sniperbeamEX")
         {
            tmp += "\r发动距离: " + _loc3_.dstlv;
            if(_loc3_.ct >= 10)
            {
               tmp += "\r冷却: " + Math.round(10 * _loc3_.ct / 30) / 10 + "s";
            }
            if(_loc3_.ftype == "tuji" || _loc3_.ftype == "qishe")
            {
               var _loc5_ = this._parent.viewMS.maxHP / 50 + this._parent.viewMS.maxEN / 50 + this._parent.viewMS._DF / 10 + this._parent.viewMS.speedlv + this._parent.viewMS.subpowlv + this._parent.viewMS.turnlv + this._parent.viewMS.locklv;
               _loc5_ = Math.round(_loc5_ / 7);
               var _loc9_ = Math.floor(_loc3_.en * _loc5_ / 100);
               var _loc11_ = Math.floor(_loc3_.damlv * _loc5_ / 100);
               tmp += "\r威力: " + _loc11_ + " /HIT";
               tmp += "\rEN消耗: " + _loc9_;
            }
            else
            {
               tmp += "\r威力: " + _loc3_.damlv + " /HIT";
               tmp += "\rEN消耗: " + _loc3_.en;
            }
            tmp += "\rSP需求: 200";
         }
         else if(_loc3_.ftype == "baojia" || _loc3_.ftype == "fyEX")
         {
            if(_loc3_.ftype == "fyEX")
            {
               if(_loc3_.ct >= 10)
               {
                  tmp += "\r冷却: " + Math.round(10 * _loc3_.ct / 30) / 10 + "s";
               }
               tmp += "\r忽悠炮残弹需求：3";
            }
            tmp += "\rEN消耗: " + _loc3_.en;
            tmp += "\rSP需求: 200";
         }
         else
         {
            tmp += "\r射程: " + _loc3_.dstlv;
            tmp += "\r弹速: " + 30 * _loc3_.ddspeedlv + " m/s";
            if(_loc3_.ct >= 30)
            {
               tmp += "\r冷却: " + Math.round(10 * _loc3_.ct / 30) / 10 + "s";
            }
            else
            {
               tmp += "\r频率: " + Math.round(300 / _loc3_.ct) / 10 + "/s";
            }
            if(_loc3_.damlv <= 0)
            {
               tmp += "\r定身";
               if(_loc3_.damlv < 0)
               {
                  var _loc8_ = - Math.floor(_loc3_.damlv / 150);
                  tmp += ": " + _loc8_ + "s";
               }
            }
            else
            {
               tmp += "\r威力: " + _loc3_.damlv + " /HIT";
            }
            if(_loc3_.en > 0)
            {
               if(_global.Player.skn == 6 && (_loc3_.ftype == "beam" || _loc3_.ftype == "msbeam"))
               {
                  var _loc10_ = Math.floor(_loc3_.en / 2);
                  tmp += "\rEN消耗: " + (_loc3_.en - _loc10_);
               }
               else
               {
                  tmp += "\rEN消耗: " + _loc3_.en;
               }
            }
            if(_loc3_.maxcn > 0 && _loc3_.maxcnn > 0)
            {
               if(_global.Player.skn == 4 && (_loc3_.ftype == "fyGD" || _loc3_.ftype == "fy" || _loc3_.ftype == "fd" || _loc3_.ftype == "fds"))
               {
                  if(_loc3_.maxcnn == Infinity)
                  {
                     tmp += "\r弹数: " + _loc3_.maxcn + " × ∞";
                  }
                  else
                  {
                     tmp += "\r弹数: " + _loc3_.maxcn + " × " + 2 * _loc3_.maxcnn;
                  }
               }
               else if(_loc3_.maxcnn == Infinity)
               {
                  tmp += "\r弹数: " + _loc3_.maxcn + " × ∞";
               }
               else
               {
                  tmp += "\r弹数: " + _loc3_.maxcn + " × " + _loc3_.maxcnn;
               }
            }
            if(_loc3_.ftype == "fy" || _loc3_.ftype == "fyGD" || _loc3_.ftype == "fyX" || _loc3_.ftype == "fyXX")
            {
               tmp += "\rSP需求: 100";
            }
            else if(_loc3_.ftype == "fj" || _loc3_.ftype == "bsfy" || _loc3_.ftype == "hphl")
            {
               tmp += "\rSP需求: 150";
            }
         }
         this.t = 0;
         this.onEnterFrame = function()
         {
            if(this.t > 5 && this.t - 5 <= mblength(this.tmp))
            {
               this.txt_info = mbsubstring(this.tmp,1,this.t - 5);
            }
            this.t = this.t + 1;
         };
      }
      if(this._parent.shower.it.t != 0)
      {
         this._parent.shower.it.t = 1;
         this._parent.shower.it._alpha = 100;
         this._parent.shower.it.smod = new Array();
         if(this._parent.viewMS._type == "MS" || this._parent.viewMS._type == "TMS" && !this._parent.TSon || this._parent.viewMS._type == "TMA" && this._parent.TSon)
         {
            if(_global[this._parent.viewMS.BDmod + "_1"] != undefined)
            {
               this._parent.shower.it.smod = this._parent.shower.it.smod.concat(_global[this._parent.viewMS.BDmod + "_1"]);
            }
            if(_global[this._parent.viewMS.LGmod + "_1"] != undefined)
            {
               this._parent.shower.it.smod = this._parent.shower.it.smod.concat(_global[this._parent.viewMS.LGmod + "_1"]);
            }
            var _loc4_ = _global[this._parent.viewMS["wp" + this._parent.wpinfo._currentframe]].lap;
            if(_loc4_ == null)
            {
               _loc4_ = 1;
            }
            if(_global[this._parent.viewMS.LAmod + "_" + _loc4_] != undefined)
            {
               this._parent.shower.it.smod = this._parent.shower.it.smod.concat(_global[this._parent.viewMS.LAmod + "_" + _loc4_]);
            }
            var _loc7_ = _global[this._parent.viewMS["wp" + this._parent.wpinfo._currentframe]].rap;
            if(_loc7_ == null)
            {
               _loc7_ = 1;
            }
            if(_global[this._parent.viewMS.RAmod + "_" + _loc7_] != undefined)
            {
               this._parent.shower.it.smod = this._parent.shower.it.smod.concat(_global[this._parent.viewMS.RAmod + "_" + _loc7_]);
            }
            if(_global[this._parent.viewMS.WImod + "_1"] != undefined)
            {
               this._parent.shower.it.smod = this._parent.shower.it.smod.concat(_global[this._parent.viewMS.WImod + "_1"]);
            }
            var _loc6_ = _global[this._parent.viewMS["wp" + this._parent.wpinfo._currentframe]].shdp;
            if(_loc6_ == null)
            {
               _loc6_ = 1;
            }
            if(_global[this._parent.viewMS.SHDmod + "_" + _loc6_] != undefined)
            {
               this._parent.shower.it.smod = this._parent.shower.it.smod.concat(_global[this._parent.viewMS.SHDmod + "_" + _loc6_]);
            }
         }
         else if(_global[this._parent.viewMS.MAmod + "_1"] != undefined)
         {
            this._parent.shower.it.smod = this._parent.shower.it.smod.concat(_global[this._parent.viewMS.MAmod + "_1"]);
         }
         this._parent.shower.it.linelist = this._parent.shower.it.smod;
         if(this._parent.viewMS._type == "MS" || this._parent.viewMS._type == "TMS" && !this._parent.TSon || this._parent.viewMS._type == "TMA" && this._parent.TSon || this._parent.viewMS._type == "HMS")
         {
            this._parent.shower.it.linelist = this._parent.shower.it.linelist.concat(_global[this._parent.viewMS["wp" + this._currentframe]].wpmod);
         }
         this._parent.shower.it.onEnterFrame = function()
         {
            this._sW += 0.031415926535897934;
            this.showcmr();
         };
      }
   };
}
