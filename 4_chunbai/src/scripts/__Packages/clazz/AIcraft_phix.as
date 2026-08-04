class clazz.AIcraft_phix extends clazz.AI_phix
{
   var mst;
   var _lv;
   var wsp = 0;
   var adp = 0;
   var rfp = 0;
   var qep = 0;
   var onzj = 0;
   var uucd = 0;
   var onkillffX = false;
   var onkf = 0;
   function AIcraft_phix(mst)
   {
      super();
      this.mst = mst;
      if(_root.cmrs[this.mst]._lv == null)
      {
         this._lv = 9;
      }
      else
      {
         this._lv = _root.cmrs[this.mst]._lv;
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
      if(!_root.cmrs[this.mst].weaponhold && (random(150) == 0 || _root.cmrs[_root.cmrs[this.mst].tgt] == undefined))
      {
         this.Stgt();
      }
      var _loc4_ = random(60 - 3 * this._lv);
      if(this.uucd <= 0)
      {
         if(_loc4_ == 0)
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
      if(_loc4_ == 0)
      {
         if(_root.cmrs[_root.cmrs[this.mst].tgt].bofg == 0)
         {
            this.resetatt();
         }
         if(random(9) < this._lv + 3)
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
         if(random(9) < this._lv + 3)
         {
            this.ongp = function(zid)
            {
               this.huibi(40);
            };
            this.onzd = function(zid)
            {
               this.huibi(20);
            };
            this.onhd = function(zid, dst)
            {
               if(_root.cmrs[zid].mst != this.mst)
               {
                  this.tuoli(zid);
               }
            };
            this.onfy = function(zid)
            {
               this.huibi(30);
            };
            this.ongd = function(zid)
            {
               this.huibi(30);
            };
            this.onshoot = function(msid)
            {
               if(this.onlockt == 0)
               {
                  this.huibi(20);
                  this.onlockt = 10;
               }
            };
            this.onfd = function(zid, dst)
            {
               if(dst > 150)
               {
                  this.baituo();
               }
               else
               {
                  this.shuaidan(40,zid);
                  this.Cturnto(_root.cmrs[zid]);
               }
            };
         }
         else
         {
            this.ongp = null;
            this.onzd = null;
            this.onhd = null;
            this.onfy = null;
            this.ongd = null;
            this.onshoot = null;
            this.onfd = null;
         }
      }
      if(_root.cmrs[this.mst]["weapon" + _root.cmrs[this.mst].weaponow]._zt != "nor" && _loc4_ < 6)
      {
         this.resetatt();
      }
      if(this.intaihi > 0)
      {
         this.intaihi = this.intaihi - 1;
         if(this.indanger > 0)
         {
            this.indanger = this.indanger - 1;
         }
         if(this.onkf == 0)
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
         this.uncovon = 0;
         _root.cmrs[this.mst].dopow(0,0,0,false,false);
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
            var _loc5_ = false;
            var _loc3_ = false;
            if(_root.cmrs[this.mst].covon)
            {
               this.uncovon = 0;
               if(this.qep >= 5)
               {
                  _loc5_ = false;
                  _loc3_ = true;
               }
               else if(this.qep <= -5)
               {
                  _loc3_ = false;
                  _loc5_ = true;
               }
            }
            else
            {
               this.uncovon = this.uncovon + 1;
            }
            _root.cmrs[this.mst].dopow(this.wsp,this.adp,this.rfp,_loc5_,_loc3_);
         }
         else
         {
            this.uncovon = 0;
            if(this.onzj == 0)
            {
               this.onzj = 30;
            }
            _root.cmrs[this.mst].dopow(1,0,0,false,true);
            this.wsp = 1;
            this.adp = 0;
            this.rfp = 0;
         }
      }
      _root.cmrs[this.mst].setwill(this.Msetx,this.Msety);
      if((this.onkf > 0 || this.uncovon > 60) && this.indanger == 0)
      {
         _root.cmrs[this.mst].CastSkill();
      }
      else
      {
         this.doatt();
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
      if(_root.cmrs[this.mst].ffdst < 0.5 * _root.cmrs[this.mst].dstlv)
      {
         if(this.intaihi <= 5)
         {
            this.intaihi = 5;
            _root.cmrs[this.mst].dopow(0,0,0,false,false);
            this.wsp = 0;
            this.adp = 0;
            this.rfp = 0;
         }
      }
   }
   function shuaidan(et, ff)
   {
      this.indanger = 5;
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
   function baituo()
   {
      this.indanger = 5;
      if(this.intaihi <= 20)
      {
         this.intaihi = 30;
      }
      _root.cmrs[this.mst].dopow(1,0,0,false,true);
   }
   function tuoli(ff)
   {
      this.indanger = 5;
      if(this.intaihi <= 20)
      {
         this.intaihi = 30;
      }
      _root.cmrs[this.mst].dopow(1,0,0,false,true);
   }
   function tuili(ff)
   {
      this.indanger = 5;
      if(this.intaihi <= 20)
      {
         this.intaihi = 30;
      }
      _root.cmrs[this.mst].dopow(-1,0,0,false,true);
   }
   function doit()
   {
      this.beatit();
   }
   function onkillff(ff)
   {
      this.killffs();
   }
}
