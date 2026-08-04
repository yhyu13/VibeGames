class clazz.AI_phix
{
   var mst;
   var _lv;
   var uncovon = 0;
   var wsp = 0;
   var adp = 0;
   var rfp = 0;
   var qep = 0;
   var onzj = 0;
   var uucd = 0;
   var doatt = null;
   var maxlockont = 0;
   var maxfft = 0;
   var fftest = 0;
   var onkillffX = false;
   var onkf = 0;
   var onlockt = 0;
   var onlockX = true;
   var intaihi = 0;
   var indanger = 0;
   var Msetx = 0;
   var Msety = 0;
   var Rsetx = 0;
   var Rsety = 0;
   var CturnCD = 0;
   function AI_phix(mst)
   {
      this.mst = mst;
      if(_root.cmrs[this.mst]._lv == null)
      {
         this._lv = 9;
      }
      else
      {
         this._lv = _root.cmrs[this.mst]._lv;
      }
      if(_root.cmrs[this.mst]["skill_" + _root.cmrs[this.mst]._Skill] < 1)
      {
         var _loc5_ = new Array();
         var _loc4_ = 0;
         var _loc3_ = 1;
         while(_loc3_ <= 12)
         {
            if(_root.cmrs[this.mst]["skill_" + _loc3_] == 0)
            {
               _loc5_[_loc4_] = _loc3_;
               _loc4_ = _loc4_ + 1;
            }
            _loc3_ = _loc3_ + 1;
         }
         if(_loc4_ > 0)
         {
            _root.cmrs[this.mst]._Skill = _loc5_[random(_loc4_)];
            _root.cmrs[this.mst]["skill_" + _root.cmrs[this.mst]._Skill] += 1;
         }
      }
   }
   function beatit()
   {
      if(this.onlockt > 0)
      {
         this.onlockt = this.onlockt - 1;
      }
      if(this.onkf > 0)
      {
         this.onkf = this.onkf - 1;
      }
      if(this.onzj > 0)
      {
         this.onzj = this.onzj - 1;
      }
      _root.cmrs[this.mst].xunhangon = false;
      if(!_root.cmrs[this.mst].weaponhold && (random(30) == 0 || _root.cmrs[_root.cmrs[this.mst].tgt] == undefined))
      {
         this.Stgt();
      }
      var _loc5_ = random(60 - 3 * this._lv);
      if(this.uucd <= 0)
      {
         if(_loc5_ == 0)
         {
            this.uucd = 5;
            this.wsp = random(3) - 1;
            this.adp = random(3) - 1;
            this.rfp = random(3) - 1;
            this.qep = random(11) - 5;
         }
      }
      else
      {
         this.uucd = this.uucd - 1;
      }
      if(_loc5_ == 0)
      {
         if(_root.cmrs[_root.cmrs[this.mst].tgt].bofg == 0)
         {
            this.resetatt();
         }
         if(random(9) < this._lv)
         {
            this.onkillffX = true;
         }
         else
         {
            this.onkillffX = false;
         }
         if(random(9) < this._lv)
         {
            this.onlockX = true;
         }
         else
         {
            this.onlockX = false;
         }
         this.onhd = function(zid, dst)
         {
            if(_root.cmrs[zid].mst != this.mst)
            {
               this.tuoli(zid,dst);
            }
         };
         if(random(9) < this._lv + 3)
         {
            this.ongp = function(zid)
            {
               this.huibi(40);
            };
         }
         else
         {
            this.ongp = null;
         }
         if(random(9) < this._lv)
         {
            this.onzd = function(zid)
            {
               this.huibi(20);
            };
         }
         else
         {
            this.onzd = null;
         }
         if(random(9) < this._lv + 3)
         {
            this.onfy = function(zid)
            {
               this.huibi(25);
            };
         }
         else
         {
            this.onfy = null;
         }
         if(random(9) < this._lv)
         {
            this.ongd = function(zid)
            {
               this.huibi(30);
            };
         }
         else
         {
            this.ongd = null;
         }
         if(random(9) < this._lv)
         {
            this.onshoot = function(msid)
            {
               if(this.onlockt == 0)
               {
                  this.huibi(20);
                  this.onlockt = 10;
               }
            };
         }
         else
         {
            this.onshoot = null;
         }
         if(random(9) < this._lv + 3)
         {
            this.onfd = function(zid, dst)
            {
               this.baituo(dst);
            };
         }
         else
         {
            this.onfd = null;
         }
      }
      if(_loc5_ < 6)
      {
         if(_root.cmrs[_root.cmrs[this.mst].tgt].spEX > 0)
         {
            var _loc7_ = random(2) * 4 + 4;
            _root.cmrs[this.mst].selectweapon(_loc7_);
            this.doatt = function()
            {
               if(_root.cmrs[this.mst].htime != null && _root.cmrs[this.mst].firectrlmode == "AUTO" && _root.cmrs[this.mst].scmrfg <= 25 || _root.cmrs[this.mst].perfectlock || _root.cmrs[this.mst].lockont > 60 || _root.cmrs[this.mst].covon && _root.cmrs[this.mst].weaponhold)
               {
                  _root.cmrs[this.mst].doweapon();
               }
            };
         }
         else if(_root.cmrs[this.mst]["weapon" + _root.cmrs[this.mst].weaponow]._zt != "nor" || !_root.cmrs[this.mst].dston && _root.cmrs[this.mst]["weapon" + _root.cmrs[this.mst].weaponow].dstlv < 5000)
         {
            this.resetatt();
         }
      }
      if(this.intaihi > 0)
      {
         this.intaihi = this.intaihi - 1;
         if(this.indanger > 0)
         {
            this.indanger = this.indanger - 1;
         }
         else if(this.onkf == 0)
         {
            this.Cturnto(_root.cmrs[_root.cmrs[this.mst].tgt]);
         }
         else
         {
            this.Cturnto(_root.cmrs[_root.cmrs[this.mst].fftgt]);
         }
      }
      else if(_root.cmrs[_root.cmrs[this.mst].tgt] == undefined)
      {
         if(this.indanger > 0)
         {
            this.indanger = this.indanger - 1;
         }
         if(this.mst != _global.Cmr.tgt)
         {
            var _loc11_ = _global.Cmr._sX - _root.cmrs[this.mst]._sX;
            var _loc10_ = _global.Cmr._sY - _root.cmrs[this.mst]._sY;
            var _loc9_ = _global.Cmr._sZ - _root.cmrs[this.mst]._sZ;
            var _loc8_ = _global.dist_3d(0,0,0,_loc11_,_loc10_,_loc9_);
            this.Cturnto(_global.Cmr);
            if(_loc8_ > 2000)
            {
               _root.cmrs[this.mst].dopow(1,0,0,false,false);
            }
            else
            {
               _root.cmrs[this.mst].dopow(0,0,0,false,true);
            }
         }
         else
         {
            this.Msetx = 0;
            this.Msety = 0;
            _root.cmrs[this.mst].dopow(1,0,0,false,false);
         }
         this.uncovon = 0;
      }
      else
      {
         if(this.indanger > 0)
         {
            this.indanger = this.indanger - 1;
         }
         this.Cturnto(_root.cmrs[_root.cmrs[this.mst].tgt]);
         if(_root.cmrs[this.mst].dston && this.onzj == 0)
         {
            var _loc6_ = false;
            var _loc4_ = false;
            if(_root.cmrs[this.mst].covon)
            {
               this.uncovon = 0;
               if(this.qep >= 5)
               {
                  _loc6_ = false;
                  _loc4_ = true;
               }
               else if(this.qep <= -5)
               {
                  _loc4_ = false;
                  _loc6_ = true;
               }
            }
            else
            {
               this.uncovon = this.uncovon + 1;
            }
            _root.cmrs[this.mst].dopow(this.wsp,this.adp,this.rfp,_loc6_,_loc4_);
         }
         else
         {
            this.uncovon = 0;
            if(this.onzj == 0)
            {
               this.onzj = 30;
            }
            if(_root.cmrs[this.mst].covon)
            {
               if(_root.cmrs[this.mst]._EN > 0.5 * _root.cmrs[this.mst].maxEN)
               {
                  _root.cmrs[this.mst].dopow(1,0,0,false,true);
                  this.wsp = 1;
                  this.adp = 0;
                  this.rfp = 0;
               }
               else
               {
                  _root.cmrs[this.mst].dopow(1,0,0,false,false);
                  this.wsp = 1;
                  this.adp = 0;
                  this.rfp = 0;
               }
            }
            else
            {
               _root.cmrs[this.mst].dopow(-1,0,0,false,false);
               this.wsp = -1;
               this.adp = 0;
               this.rfp = 0;
            }
         }
      }
      _root.cmrs[this.mst].setwill(this.Msetx,this.Msety);
      if((this.onkf > 0 || this.uncovon > 60 && (_root.cmrs[this.mst]._type == "MS" || _root.cmrs[this.mst]._type == "TMS")) && this.indanger == 0)
      {
         _root.cmrs[this.mst].CastSkill();
      }
      else
      {
         this.doatt();
      }
   }
   function doGDLJ()
   {
      if(random(9) < this._lv)
      {
         if(_root.cmrs[this.mst].weaponow <= 4)
         {
            var _loc6_ = random(4) + 1;
         }
         else
         {
            _loc6_ = random(4) + 5;
         }
         var _loc5_ = 0;
         while(_loc5_ < 5)
         {
            var _loc4_ = random(8) + 1;
            if(_root.cmrs[this.mst]["weapon" + _loc4_].t <= 0 && _root.cmrs[this.mst]["weapon" + _loc4_]._zt == "nor")
            {
               var _loc3_ = _root.cmrs[this.mst]["weapon" + _loc4_].ftype;
               if(_loc3_ != "fyXX" && _loc3_ != "fyX" && _loc3_ != "fyGD" && _loc3_ != "fy" && _loc3_ != "bsfy" && _loc3_ != "fd" && _loc3_ != "fds" && _loc3_ != "baojia" && _loc3_ != "hd")
               {
                  _loc6_ = _loc4_;
                  break;
               }
            }
            _loc5_ = _loc5_ + 1;
         }
         if(_root.cmrs[this.mst].selectweapon(_loc6_))
         {
            this.maxlockont = 0;
            this.maxfft = 0;
            this.fftest = 0;
            this.doatt = function()
            {
               if(_root.cmrs[this.mst].htime != null && _root.cmrs[this.mst].firectrlmode == "AUTO" && _root.cmrs[this.mst].scmrfg <= 25 || _root.cmrs[this.mst].perfectlock || _root.cmrs[this.mst].lockont > 60 || _root.cmrs[this.mst].weaponhold && _root.cmrs[this.mst].htime != null)
               {
                  _root.cmrs[this.mst].doweapon();
               }
            };
            return true;
         }
      }
   }
   function hwq()
   {
      if(_root.cmrs[this.mst]["weapon" + _root.cmrs[this.mst].weaponow].xp > 0 || this.fftest > 0 && this.fftest != 150 && _root.cmrs[this.mst]["weapon" + _root.cmrs[this.mst].weaponow].cn > 0)
      {
         return false;
      }
      var _loc3_ = 0;
      if(random(3) > 0)
      {
         var _loc5_ = 0;
         while(_loc5_ < 2)
         {
            _loc3_ = random(4) + 1;
            if(_root.cmrs[this.mst].dst < _root.cmrs[this.mst]["weapon" + _root.cmrs[this.mst]["weaponF" + _loc3_]].dstlv && _root.cmrs[this.mst]["weapon" + _root.cmrs[this.mst]["weaponF" + _loc3_]]._zt == "nor")
            {
               if(_root.cmrs[this.mst].selectweaponF(_loc3_))
               {
                  this.maxlockont = 0;
                  this.maxfft = 0;
                  this.fftest = 0;
                  var _loc6_ = _root.cmrs[this.mst]["weapon" + _root.cmrs[this.mst].weaponow].ftype;
                  if(_loc6_ == "fy" || _loc6_ == "fyGD")
                  {
                     this.fftest = 150;
                     this.maxfft = 30 * (_root.cmrs[this.mst]["weapon" + _root.cmrs[this.mst].weaponow].maxcn - 1);
                  }
                  return true;
               }
            }
            _loc5_ = _loc5_ + 1;
         }
         _loc5_ = 0;
         while(_loc5_ < 5)
         {
            var _loc4_ = random(8) + 1;
            if(_root.cmrs[this.mst].dst < _root.cmrs[this.mst]["weapon" + _loc4_].dstlv && _root.cmrs[this.mst]["weapon" + _loc4_]._zt == "nor")
            {
               _loc3_ = _loc4_;
               break;
            }
            _loc5_ = _loc5_ + 1;
         }
         if(_root.cmrs[this.mst].selectweapon(_loc3_))
         {
            this.maxlockont = 0;
            this.maxfft = 0;
            this.fftest = 0;
            _loc6_ = _root.cmrs[this.mst]["weapon" + _root.cmrs[this.mst].weaponow].ftype;
            if(_loc6_ == "fy" || _loc6_ == "fyGD")
            {
               this.fftest = 150;
               this.maxfft = 30 * (_root.cmrs[this.mst]["weapon" + _root.cmrs[this.mst].weaponow].maxcn - 1);
            }
            return true;
         }
      }
      else
      {
         _loc5_ = 0;
         while(_loc5_ < 5)
         {
            _loc4_ = random(8) + 1;
            if(_root.cmrs[this.mst].dst < _root.cmrs[this.mst]["weapon" + _loc4_].dstlv && _root.cmrs[this.mst]["weapon" + _loc4_]._zt == "nor")
            {
               _loc3_ = _loc4_;
               break;
            }
            _loc5_ = _loc5_ + 1;
         }
         if(_root.cmrs[this.mst].selectweapon(_loc3_))
         {
            this.maxlockont = 0;
            this.maxfft = 0;
            this.fftest = 0;
            _loc6_ = _root.cmrs[this.mst]["weapon" + _root.cmrs[this.mst].weaponow].ftype;
            if(_loc6_ == "fy" || _loc6_ == "fyGD")
            {
               this.fftest = 150;
               this.maxfft = 30 * (_root.cmrs[this.mst]["weapon" + _root.cmrs[this.mst].weaponow].maxcn - 1);
            }
            return true;
         }
      }
      return false;
   }
   function resetatt()
   {
      this.hwq();
      if(this.maxfft > 0)
      {
         this.doatt = function()
         {
            if(_root.cmrs[this.mst].lockont >= this.maxlockont)
            {
               if(this.fftest > 120)
               {
                  this.maxlockont = _root.cmrs[this.mst].lockont;
               }
            }
            else
            {
               this.fftest -= 1;
            }
            if(this.fftest < -30 || _root.cmrs[this.mst].lockont >= this.maxfft || this.fftest < 120 && _root.cmrs[this.mst].lockont >= this.maxlockont)
            {
               _root.cmrs[this.mst].doweapon();
            }
            if(_root.cmrs[this.mst]["weapon" + _root.cmrs[this.mst].weaponow].fyBn + _root.cmrs[this.mst]["weapon" + _root.cmrs[this.mst].weaponow].cn <= 0)
            {
               this.fftest = 0;
            }
         };
      }
      else if(random(9) < this._lv && (_root.cmrs[this.mst]._EN > 0.5 * _root.cmrs[this.mst].maxEN && _root.cmrs[this.mst]._EN > 1000))
      {
         this.doatt = function()
         {
            if(_root.cmrs[this.mst].htime != null && _root.cmrs[this.mst].firectrlmode == "AUTO" && _root.cmrs[this.mst].scmrfg <= 25 || _root.cmrs[this.mst].perfectlock || _root.cmrs[this.mst].lockont > 60 || _root.cmrs[this.mst].covon && _root.cmrs[this.mst].weaponhold)
            {
               _root.cmrs[this.mst].doweapon();
            }
         };
      }
      else
      {
         this.doatt = function()
         {
            if(_root.cmrs[this.mst].perfectlock || _root.cmrs[this.mst].lockont > 60 || _root.cmrs[this.mst].covon && _root.cmrs[this.mst].weaponhold || _root.cmrs[this.mst].lockon && _root.cmrs[this.mst].scmrfg <= 25 && _root.cmrs[this.mst]._EN + _root.cmrs[this.mst].ENcap > 0.5 * _root.cmrs[this.mst].maxEN)
            {
               _root.cmrs[this.mst].doweapon();
            }
         };
      }
   }
   function killffs()
   {
      if(!this.onkillffX)
      {
         return false;
      }
      this.onkf = 5;
      if(_root.cmrs[this.mst]["weapon" + _root.cmrs[this.mst].weaponow].fclass == "EX" || _root.cmrs[this.mst]["weapon" + _root.cmrs[this.mst].weaponow].fclass == "fyzd" || _root.cmrs[this.mst]["weapon" + _root.cmrs[this.mst].weaponow].fclass == "sboom" || _root.cmrs[this.mst]["weapon" + _root.cmrs[this.mst].weaponow]._zt != "nor")
      {
         if(_root.cmrs[this.mst]["weapon" + _root.cmrs[this.mst].weaponow].t > 30)
         {
            var _loc3_ = random(6) + 1;
            if(_loc3_ > 3)
            {
               _loc3_ += 1;
            }
            _root.cmrs[this.mst].selectweapon(_loc3_);
            if(_root.cmrs[this.mst]["weapon" + _root.cmrs[this.mst].weaponow].fclass == "EX" || _root.cmrs[this.mst]["weapon" + _root.cmrs[this.mst].weaponow].fclass == "fyzd" || _root.cmrs[this.mst]["weapon" + _root.cmrs[this.mst].weaponow].fclass == "sboom" || _root.cmrs[this.mst]["weapon" + _root.cmrs[this.mst].weaponow]._zt != "nor")
            {
               if(_root.cmrs[this.mst]["weapon" + _root.cmrs[this.mst].weaponow].t > 30)
               {
                  _root.cmrs[this.mst].selectweapon(random(2) + 1);
               }
            }
         }
      }
      if(this.intaihi <= 5)
      {
         if(_root.cmrs[this.mst].ffdst < 0.5 * _root.cmrs[this.mst].dstlv)
         {
            this.intaihi = 5;
            _root.cmrs[this.mst].dopow(-1,0,0,false,false);
            this.wsp = -1;
            this.adp = 0;
            this.rfp = 0;
         }
         else
         {
            this.intaihi = 5;
            this.wsp = 0;
            if(this.adp == 0)
            {
               this.adp = random(3) - 1;
            }
            this.rfp = 0;
            _root.cmrs[this.mst].dopow(0,this.adp,0,false,false);
         }
      }
   }
   function huibi(et)
   {
      if(this.intaihi <= et - 5)
      {
         this.intaihi = et;
         var _loc4_ = 0;
         if(_root.cmrs[this.mst].ypow > 0)
         {
            _loc4_ = random(2) - 1;
         }
         else if(_root.cmrs[this.mst].ypow < 0)
         {
            _loc4_ = random(2);
         }
         else
         {
            _loc4_ = random(3) - 1;
         }
         if(_root.cmrs[this.mst]._type == "TMA")
         {
            _loc4_ = 0;
         }
         var _loc3_ = 0;
         if(_root.cmrs[this.mst].xpow > 0)
         {
            _loc3_ = random(2) - 1;
         }
         else if(_root.cmrs[this.mst].xpow < 0)
         {
            _loc3_ = random(2);
         }
         else
         {
            _loc3_ = random(3) - 1;
         }
         var _loc5_ = 0;
         if(_root.cmrs[this.mst].zpow > 0)
         {
            _loc5_ = random(2) - 1;
         }
         else if(_root.cmrs[this.mst].zpow < 0)
         {
            _loc5_ = random(2);
         }
         else
         {
            _loc5_ = random(3) - 1;
         }
      }
      else
      {
         _loc4_ = 0;
         if(_root.cmrs[this.mst].ypow > 0)
         {
            _loc4_ = 1;
         }
         else if(_root.cmrs[this.mst].ypow < 0)
         {
            _loc4_ = -1;
         }
         _loc3_ = 0;
         if(_root.cmrs[this.mst].xpow > 0)
         {
            _loc3_ = 1;
         }
         else if(_root.cmrs[this.mst].xpow < 0)
         {
            _loc3_ = -1;
         }
         _loc5_ = 0;
         if(_root.cmrs[this.mst].zpow > 0)
         {
            _loc5_ = 1;
         }
         else if(_root.cmrs[this.mst].zpow < 0)
         {
            _loc5_ = -1;
         }
      }
      _root.cmrs[this.mst].dopow(_loc4_,_loc3_,_loc5_,false,false);
   }
   function baituo(dst)
   {
      if(dst > 150 && this.intaihi <= 30)
      {
         this.indanger = 5;
         if(this.intaihi <= 20)
         {
            this.intaihi = 30;
            var _loc3_ = 0;
            if(this.Msetx > 0)
            {
               _loc3_ = -1;
            }
            else if(this.Msetx < 0)
            {
               _loc3_ = 1;
            }
            var _loc4_ = 0;
            if(_loc3_ > 0)
            {
               _loc4_ = random(2) - 1;
            }
            else if(_loc3_ < 0)
            {
               _loc4_ = random(2);
            }
            else
            {
               _loc4_ = random(3) - 1;
            }
            var _loc5_ = 0;
            if(_root.cmrs[this.mst].zpow > 0)
            {
               _loc5_ = random(2) - 1;
            }
            else if(_root.cmrs[this.mst].zpow < 0)
            {
               _loc5_ = random(2);
            }
            else
            {
               _loc5_ = random(3) - 1;
            }
         }
         else
         {
            _loc3_ = 0;
            if(this.Msetx > 0)
            {
               _loc3_ = 1;
            }
            else if(this.Msetx < 0)
            {
               _loc3_ = -1;
            }
            _loc4_ = 0;
            if(_root.cmrs[this.mst].xpow > 0)
            {
               _loc4_ = 1;
            }
            else if(_root.cmrs[this.mst].xpow < 0)
            {
               _loc4_ = -1;
            }
            _loc5_ = 0;
            if(_root.cmrs[this.mst].zpow > 0)
            {
               _loc5_ = 1;
            }
            else if(_root.cmrs[this.mst].zpow < 0)
            {
               _loc5_ = -1;
            }
         }
         _loc3_ *= 300;
         this.Msetx += (_loc3_ - this.Msetx) * 0.6;
         this.Msety += (- this.Msety) * 0.6;
         _root.cmrs[this.mst].dopow(1,_loc4_,_loc5_,false,true);
      }
      else
      {
         if(this.intaihi <= 30)
         {
            this.intaihi = 35;
            var _loc6_ = 0;
            if(_root.cmrs[this.mst].ypow > 0)
            {
               _loc6_ = random(2) - 1;
            }
            else if(_root.cmrs[this.mst].ypow < 0)
            {
               _loc6_ = random(2);
            }
            else
            {
               _loc6_ = random(3) - 1;
            }
            if(_root.cmrs[this.mst]._type == "TMA")
            {
               _loc6_ = 0;
            }
            _loc4_ = 0;
            if(_root.cmrs[this.mst].xpow > 0)
            {
               _loc4_ = random(2) - 1;
            }
            else if(_root.cmrs[this.mst].xpow < 0)
            {
               _loc4_ = random(2);
            }
            else
            {
               _loc4_ = random(3) - 1;
            }
            _loc5_ = 0;
            if(_root.cmrs[this.mst].zpow > 0)
            {
               _loc5_ = random(2) - 1;
            }
            else if(_root.cmrs[this.mst].zpow < 0)
            {
               _loc5_ = random(2);
            }
            else
            {
               _loc5_ = random(3) - 1;
            }
         }
         else
         {
            _loc6_ = 0;
            if(_root.cmrs[this.mst].ypow > 0)
            {
               _loc6_ = 1;
            }
            else if(_root.cmrs[this.mst].ypow < 0)
            {
               _loc6_ = -1;
            }
            _loc4_ = 0;
            if(_root.cmrs[this.mst].xpow > 0)
            {
               _loc4_ = 1;
            }
            else if(_root.cmrs[this.mst].xpow < 0)
            {
               _loc4_ = -1;
            }
            _loc5_ = 0;
            if(_root.cmrs[this.mst].zpow > 0)
            {
               _loc5_ = 1;
            }
            else if(_root.cmrs[this.mst].zpow < 0)
            {
               _loc5_ = -1;
            }
         }
         _root.cmrs[this.mst].dopow(_loc6_,_loc4_,_loc5_,false,false);
      }
   }
   function tuoli(ff, dst)
   {
      this.indanger = 5;
      if(this.intaihi <= 20)
      {
         this.intaihi = 30;
      }
      if(dst > 2000)
      {
         this.Cturnto(_root.cmrs[ff]);
         _root.cmrs[this.mst].dopow(0,0,0,false,false);
      }
      else
      {
         this.Cturnback(_root.cmrs[ff]);
         _root.cmrs[this.mst].dopow(1,0,0,false,true);
      }
   }
   function tuili(ff)
   {
      this.indanger = 5;
      if(this.intaihi <= 20)
      {
         this.intaihi = 30;
      }
      this.Cturnto(_root.cmrs[ff]);
      _root.cmrs[this.mst].dopow(-1,0,0,false,false);
   }
   function Stgt()
   {
      var _loc11_ = null;
      var _loc7_ = 0;
      for(var _loc12_ in _global.UnitList)
      {
         if(_global.UnitList[_loc12_]._force != _root.cmrs[this.mst]._force && _global.UnitList[_loc12_]._zt != "broken")
         {
            var _loc10_ = _global.UnitList[_loc12_]._sX - _root.cmrs[this.mst]._sX;
            var _loc9_ = _global.UnitList[_loc12_]._sY - _root.cmrs[this.mst]._sY;
            var _loc8_ = _global.UnitList[_loc12_]._sZ - _root.cmrs[this.mst]._sZ;
            var _loc4_ = _global.dist_3d(0,0,0,_loc10_,_loc9_,_loc8_);
            var _loc5_ = 1;
            if(_root.cmrs[this.mst].tgt == _loc12_)
            {
               _loc5_ += 0.1;
            }
            if(_global.UnitList[_loc12_].tgt == this.mst)
            {
               _loc5_ += 0.1;
            }
            if(_global.UnitList[_loc12_]._HP <= 1000 || _global.UnitList[_loc12_].maxHP - _global.UnitList[_loc12_]._HP <= 500)
            {
               _loc5_ += 0.2;
            }
            if(_loc4_ < 3000)
            {
               _loc5_ += 0.2;
            }
            _loc4_ = 10000 - _loc4_;
            if(_loc4_ < 0)
            {
               _loc4_ = 0;
            }
            var _loc6_ = (_loc4_ + _global.UnitList[_loc12_].Danger * 5) * _loc5_;
            if(this.mst == _root.jiemiam.mst)
            {
               _root.jiemiam.Daglist[_loc12_].dag._xscale = Math.floor(_loc6_ / 100);
            }
            if(_loc6_ > _loc7_ || _loc7_ == 0 && random(4) == 0)
            {
               _loc7_ = _loc6_;
               _loc11_ = _loc12_;
            }
         }
      }
      _root.cmrs[this.mst].gettgt(_loc11_);
   }
   function Cturnto(tgt)
   {
      if(this.CturnCD < 0)
      {
         this.CturnCD = this.CturnCD + 1;
         return false;
      }
      if(tgt._sX != undefined)
      {
         var _loc9_ = new Object();
         _loc9_ = _global.sToc(tgt._sX - _root.cmrs[this.mst]._sX,tgt._sY - _root.cmrs[this.mst]._sY,tgt._sZ - _root.cmrs[this.mst]._sZ,_root.cmrs[this.mst]._sW,_root.cmrs[this.mst]._sH,_root.cmrs[this.mst]._sR);
         var _loc5_ = _loc9_.x;
         var _loc4_ = _loc9_.z;
         var _loc10_ = _loc9_.y;
         var _loc8_ = _global.Cmr.Zoom / _loc10_;
         if(_loc8_ < 0)
         {
            _loc8_ = - _loc8_;
            _loc10_ = - _global.Cmr.Zoom;
         }
         else
         {
            _loc10_ = _global.Cmr.Zoom;
         }
         _loc5_ *= _loc8_;
         _loc4_ *= _loc8_;
         var _loc13_ = undefined;
         var _loc12_ = undefined;
         var _loc7_ = Math.abs(_global.Cmr.wree * _global.Cmr.Zoom / _loc5_);
         var _loc6_ = Math.abs(_global.Cmr.hree * _global.Cmr.Zoom / _loc4_);
         if(_loc7_ < 1 || _loc6_ < 1)
         {
            if(Math.abs(_loc7_) < Math.abs(_loc6_))
            {
               _loc13_ = _loc5_ * _loc7_;
               _loc12_ = (- _loc4_) * _loc7_;
            }
            else
            {
               _loc13_ = _loc5_ * _loc6_;
               _loc12_ = (- _loc4_) * _loc6_;
            }
         }
         else if(_loc10_ < 0)
         {
            if(_loc5_ == 0 && _loc4_ == 0)
            {
               _loc13_ = 0;
               _loc12_ = (- _global.Cmr.hree) * _global.Cmr.Zoom;
            }
            else if(Math.abs(_loc7_) < Math.abs(_loc6_))
            {
               _loc13_ = _loc5_ * _loc7_;
               _loc12_ = (- _loc4_) * _loc7_;
            }
            else
            {
               _loc13_ = _loc5_ * _loc6_;
               _loc12_ = (- _loc4_) * _loc6_;
            }
         }
         else
         {
            _loc13_ = _loc5_;
            _loc12_ = - _loc4_;
            if(!_root.cmrs[this.mst].dston && Math.abs(_loc13_) < 150 && Math.abs(_loc12_) < 150)
            {
               _loc13_ += this.Rsetx;
               _loc12_ += this.Rsety;
               if(Math.abs(this.Msetx) < 10 && Math.abs(this.Msety) < 10)
               {
                  this.Rsetx = random(201) - 100;
                  this.Rsety = random(201) - 100;
               }
            }
         }
      }
      else
      {
         _loc13_ = 0;
         _loc12_ = 0;
         this.Msetx = 0;
         this.Msety = 0;
      }
      if(!isNaN(_loc13_) && !isNaN(_loc12_))
      {
         this.Msetx += (_loc13_ - this.Msetx) * (0.1 + 0.02 * this._lv);
         this.Msety += (_loc12_ - this.Msety) * (0.1 + 0.02 * this._lv);
      }
      else
      {
         trace("AI");
      }
      if(Math.abs(this.Msetx) > 300 || Math.abs(this.Msety) > 200)
      {
         this.CturnCD = this.CturnCD + 1;
         if(this.CturnCD > 30 + 3 * this._lv)
         {
            this.CturnCD = -30 + this._lv;
         }
      }
      else if(this.CturnCD > 0)
      {
         this.CturnCD = this.CturnCD - 1;
      }
   }
   function Cturnback(tgt)
   {
      if(tgt._sX != undefined)
      {
         var _loc9_ = new Object();
         _loc9_ = _global.sToc(tgt._sX - _root.cmrs[this.mst]._sX,tgt._sY - _root.cmrs[this.mst]._sY,tgt._sZ - _root.cmrs[this.mst]._sZ,_root.cmrs[this.mst]._sW,_root.cmrs[this.mst]._sH,_root.cmrs[this.mst]._sR);
         var _loc5_ = - _loc9_.x;
         var _loc4_ = - _loc9_.z;
         var _loc10_ = - _loc9_.y;
         var _loc8_ = _global.Cmr.Zoom / _loc10_;
         if(_loc8_ < 0)
         {
            _loc8_ = - _loc8_;
            _loc10_ = - _global.Cmr.Zoom;
         }
         else
         {
            _loc10_ = _global.Cmr.Zoom;
         }
         _loc5_ *= _loc8_;
         _loc4_ *= _loc8_;
         var _loc13_ = undefined;
         var _loc12_ = undefined;
         var _loc7_ = Math.abs(_global.Cmr.wree * _global.Cmr.Zoom / _loc5_);
         var _loc6_ = Math.abs(_global.Cmr.hree * _global.Cmr.Zoom / _loc4_);
         if(_loc7_ < 1 || _loc6_ < 1)
         {
            if(Math.abs(_loc7_) < Math.abs(_loc6_))
            {
               _loc13_ = _loc5_ * _loc7_;
               _loc12_ = (- _loc4_) * _loc7_;
            }
            else
            {
               _loc13_ = _loc5_ * _loc6_;
               _loc12_ = (- _loc4_) * _loc6_;
            }
         }
         else if(_loc10_ < 0)
         {
            if(_loc5_ == 0 && _loc4_ == 0)
            {
               _loc13_ = 0;
               _loc12_ = (- _global.Cmr.hree) * _global.Cmr.Zoom;
            }
            else if(Math.abs(_loc7_) < Math.abs(_loc6_))
            {
               _loc13_ = _loc5_ * _loc7_;
               _loc12_ = (- _loc4_) * _loc7_;
            }
            else
            {
               _loc13_ = _loc5_ * _loc6_;
               _loc12_ = (- _loc4_) * _loc6_;
            }
         }
         else
         {
            _loc13_ = _loc5_;
            _loc12_ = - _loc4_;
         }
      }
      else
      {
         _loc13_ = 0;
         _loc12_ = 0;
         this.Msetx = 0;
         this.Msety = 0;
      }
      if(!isNaN(_loc13_) && !isNaN(_loc12_))
      {
         this.Msetx += (_loc13_ - this.Msetx) * (0.1 + 0.02 * this._lv);
         this.Msety += (_loc12_ - this.Msety) * (0.1 + 0.02 * this._lv);
      }
      else
      {
         trace("AI");
      }
   }
   function doit()
   {
      this.beatit();
   }
   function onkillff(ff)
   {
      if(_root.cmrs[_root.cmrs[this.mst].tgt]._type != "ff" && _root.cmrs[ff].canlock)
      {
         _root.cmrs[this.mst].gettgt(ff);
         this.onkf = 5;
      }
      else if(_root.cmrs[_root.cmrs[this.mst].tgt]._type != "ff" || _root.cmrs[ff]._HP == 0)
      {
         this.killffs();
      }
   }
   function ongp(zid)
   {
      this.huibi(40);
   }
   function onzd(zid)
   {
      this.huibi(20);
   }
   function onhd(zid, dst)
   {
      if(_root.cmrs[zid].mst != this.mst)
      {
         this.tuoli(zid,dst);
      }
   }
   function onfy(zid)
   {
      this.huibi(30);
   }
   function ongd(zid)
   {
      this.huibi(30);
   }
   function onfd(zid, dst)
   {
      this.baituo(dst);
   }
   function onshoot(msid)
   {
      if(this.onlockt == 0)
      {
         this.huibi(20);
         this.onlockt = 10;
      }
   }
   function onlock(msid)
   {
      if(_root.cmrs[msid] != undefined && random(10) == 0 && _root.cmrs[this.mst].tgt != msid)
      {
         var _loc7_ = 0;
         var _loc8_ = 0;
         var _loc11_ = _root.cmrs[msid]._sX - _root.cmrs[this.mst]._sX;
         var _loc10_ = _root.cmrs[msid]._sY - _root.cmrs[this.mst]._sY;
         var _loc9_ = _root.cmrs[msid]._sZ - _root.cmrs[this.mst]._sZ;
         var _loc4_ = _global.dist_3d(0,0,0,_loc11_,_loc10_,_loc9_);
         var _loc6_ = 1;
         if(_root.cmrs[msid].tgt == this.mst)
         {
            _loc6_ += 0.1;
         }
         if(_root.cmrs[msid]._HP <= 1000 || _root.cmrs[msid].maxHP - _root.cmrs[msid]._HP <= 500)
         {
            _loc6_ += 0.2;
         }
         if(_loc4_ < 3000)
         {
            _loc6_ += 0.2;
         }
         _loc4_ = 10000 - _loc4_;
         if(_loc4_ < 0)
         {
            _loc4_ = 0;
         }
         _loc7_ = (_loc4_ + _root.cmrs[msid].Danger * 5) * _loc6_;
         _loc11_ = _root.cmrs[_root.cmrs[this.mst].tgt]._sX - _root.cmrs[this.mst]._sX;
         _loc10_ = _root.cmrs[_root.cmrs[this.mst].tgt]._sY - _root.cmrs[this.mst]._sY;
         _loc9_ = _root.cmrs[_root.cmrs[this.mst].tgt]._sZ - _root.cmrs[this.mst]._sZ;
         _loc4_ = _global.dist_3d(0,0,0,_loc11_,_loc10_,_loc9_);
         _loc6_ = 1;
         _loc6_ += 0.1;
         if(_root.cmrs[_root.cmrs[this.mst].tgt].tgt == this.mst)
         {
            _loc6_ += 0.1;
         }
         if(_root.cmrs[_root.cmrs[this.mst].tgt]._HP <= 1000 || _root.cmrs[_root.cmrs[this.mst].tgt].maxHP - _root.cmrs[_root.cmrs[this.mst].tgt]._HP <= 500)
         {
            _loc6_ += 0.2;
         }
         if(_loc4_ < 3000)
         {
            _loc6_ += 0.2;
         }
         _loc4_ = 10000 - _loc4_;
         if(_loc4_ < 0)
         {
            _loc4_ = 0;
         }
         _loc8_ = (_loc4_ + _root.cmrs[msid].Danger * 5) * _loc6_;
         if(this.mst == _root.jiemiam.mst)
         {
            _root.jiemiam.Daglist[msid].dag._xscale = Math.floor(_loc7_ / 100);
            _root.jiemiam.Daglist[_root.cmrs[this.mst].tgt].dag._xscale = Math.floor(_loc8_ / 100);
         }
         if(_loc7_ > _loc8_)
         {
            _root.cmrs[this.mst].gettgt(msid);
         }
      }
      if(!this.onlockX)
      {
         return false;
      }
      if(this.onlockt == 0)
      {
         this.huibi(15);
         this.onlockt = 30;
      }
   }
}
