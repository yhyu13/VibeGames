class clazz.unit_craft_phix extends clazz.unit_phix
{
   var dodef;
   var linelist;
   var BDmod;
   var LGmod;
   var LAmod;
   var RAmod;
   var WImod;
   var MAmod;
   var SHDmod;
   var mainsys;
   var Gobj;
   var objz;
   var v;
   var maxspeed = 0;
   var maxpow = 0;
   var subpow = 0;
   var xG = 0;
   var VG = 0;
   var mpow = 0;
   var fpow = 0;
   var fpowon = false;
   var stopow = false;
   var ypow = 0;
   var zpow = 0;
   var xpow = 0;
   var turnlv = 0;
   var wwill = 0;
   var hwill = 0;
   var ntact = 0;
   var ntcd = 0;
   var lockont = 0;
   var skill_12on = false;
   var SkillCaston = 0;
   var killffon = false;
   var ffrx = 0;
   var ffrz = 0;
   var ffry = 0;
   var ffdst = 10000;
   var fftgt = null;
   var ffcovon = false;
   function unit_craft_phix()
   {
      super();
      this.init();
   }
   function linkdata(unitdata)
   {
      if(unitdata != null && unitdata != undefined)
      {
         this.bp_DF = unitdata._DF;
         this.bp_speedlv = unitdata.speedlv;
         this.bp_subpowlv = unitdata.subpowlv;
         this.bp_turnlv = unitdata.turnlv;
         this.bp_locklv = unitdata.locklv;
         this._Rank = Math.round((unitdata.maxHP / 50 + unitdata.maxEN / 50 + unitdata._DF / 10 + unitdata.speedlv + unitdata.subpowlv + unitdata.turnlv + unitdata.locklv) / 7);
         var _loc5_ = 1;
         while(_loc5_ <= 12)
         {
            this["skill_" + _loc5_] = -1;
            _loc5_ = _loc5_ + 1;
         }
         if(unitdata.locklv >= 60)
         {
            this.skill_3 = 0;
         }
         if(unitdata.maxHP >= 4000 && unitdata._size == "L")
         {
            this.skill_9 = 0;
         }
         if(unitdata._DF >= 350)
         {
            this.skill_10 = 0;
         }
         if(unitdata._size != "L")
         {
            if(unitdata.SHDmod != null)
            {
               this.skill_1 = 0;
            }
            if(this._Rank < 50)
            {
               this.skill_12 = 0;
            }
            else
            {
               this.skill_11 = 0;
            }
         }
         else
         {
            this.skill_8 = 0;
         }
         var _loc6_ = 0;
         var _loc7_ = true;
         var _loc4_ = 1;
         while(_loc4_ <= 8)
         {
            if(_global[unitdata["wp" + _loc4_]].ftype == "beamX" || _global[unitdata["wp" + _loc4_]].ftype == "beamXX" || _global[unitdata["wp" + _loc4_]].ftype == "beamX2" || _global[unitdata["wp" + _loc4_]].ftype == "msbeamXX" || _global[unitdata["wp" + _loc4_]].ftype == "beams")
            {
               _loc6_ = _loc6_ + 1;
            }
            else if(_global[unitdata["wp" + _loc4_]].ftype == "sbeam" || _global[unitdata["wp" + _loc4_]].ftype == "Ssbeam" || _global[unitdata["wp" + _loc4_]].ftype == "sniperbeam" || _global[unitdata["wp" + _loc4_]].ftype == "Ccannon")
            {
               _loc7_ = false;
               this.skill_3 = 0;
            }
            else if(_global[unitdata["wp" + _loc4_]].ftype == "cartridge")
            {
               this.skill_5 = 0;
            }
            else if(_global[unitdata["wp" + _loc4_]].ftype == "fds" || _global[unitdata["wp" + _loc4_]].ftype == "fd")
            {
               this.skill_4 = 0;
            }
            else if(_global[unitdata["wp" + _loc4_]].ftype == "beam" || _global[unitdata["wp" + _loc4_]].ftype == "msbeam")
            {
               _loc6_ = _loc6_ + 1;
               this.skill_6 = 0;
            }
            else if(_global[unitdata["wp" + _loc4_]].ftype == "gj" || _global[unitdata["wp" + _loc4_]].ftype == "axe")
            {
               this.skill_2 = 0;
            }
            else if(_global[unitdata["wp" + _loc4_]].ftype == "zd" || _global[unitdata["wp" + _loc4_]].ftype == "szd" || _global[unitdata["wp" + _loc4_]].ftype == "zdXX")
            {
               this.skill_7 = 0;
            }
            _loc4_ = _loc4_ + 1;
         }
         if(!_loc7_)
         {
            this.skill_2 = -1;
         }
         if(unitdata.maxEN >= 3000 && _loc6_ >= 2)
         {
            this.skill_8 = 0;
         }
         if(this["skill_" + this._Skill] == 0)
         {
            this["skill_" + this._Skill] += 1;
         }
         this._protype = unitdata._protype;
         this.$NAME = unitdata.$NAME;
         this.$TYPE = unitdata.$TYPE;
         this._type = unitdata._type;
         this._size = unitdata._size;
         if(this._size == "L")
         {
            this.IFsiz = 50;
            this._visibleDst = 120;
         }
         else if(this._size == "M")
         {
            this.IFsiz = 25;
            this._visibleDst = 80;
         }
         else if(this._size == "S")
         {
            this.IFsiz = 15;
            this._visibleDst = 60;
         }
         this._atteq = unitdata._atteq;
         this._defeq = unitdata._defeq;
         if(this._defeq == "IF")
         {
            this.dodef = function()
            {
               if(this._HP / this.maxHP >= 0.5 && this._EN > 1000)
               {
                  this.I_Fon = true;
               }
               else
               {
                  this.I_Fon = false;
               }
            };
         }
         else
         {
            this.dodef = null;
         }
         this.maxHP = unitdata.maxHP;
         this.maxEN = unitdata.maxEN;
         this._HP = this.maxHP;
         this._SHDP = Math.round(0.3 * this.maxHP);
         this._EN = this.maxEN;
         this._DF = unitdata._DF;
         this.maxspeed = unitdata.speedlv / 4;
         this.maxpow = unitdata.speedlv / 8;
         if(this.maxspeed > 0)
         {
            this.xG = 0.5 * this.maxpow / (this.maxspeed * this.maxspeed * this.maxspeed);
         }
         else
         {
            this.xG = 0;
         }
         this.turnlv = 0.01 * unitdata.turnlv;
         this.mpow = 0.5 * this.maxpow;
         this.subpow = 0.01 * unitdata.subpowlv * this.mpow;
         this.slv = 0.0005 * unitdata.locklv;
         this.loadweapon(1,_global[unitdata.wp1],unitdata.wp1);
         this.loadweapon(2,_global[unitdata.wp2],unitdata.wp2);
         this.loadweapon(3,_global[unitdata.wp3],unitdata.wp3);
         this.loadweapon(4,_global[unitdata.wp4],unitdata.wp4);
         this.loadweapon(5,_global[unitdata.wp5],unitdata.wp5);
         this.loadweapon(6,_global[unitdata.wp6],unitdata.wp6);
         this.loadweapon(7,_global[unitdata.wp7],unitdata.wp7);
         this.loadweapon(8,_global[unitdata.wp8],unitdata.wp8);
         this.selectweapon(8);
         this.selectweapon(7);
         this.selectweapon(6);
         this.selectweapon(5);
         this.selectweapon(4);
         this.selectweapon(3);
         this.selectweapon(2);
         this.selectweapon(1);
         this.linelist = unitdata.mod;
         this.BDmod = unitdata.BDmod;
         this.LGmod = unitdata.LGmod;
         this.LAmod = unitdata.LAmod;
         this.RAmod = unitdata.RAmod;
         this.WImod = unitdata.WImod;
         this.MAmod = unitdata.MAmod;
         this.SHDmod = unitdata.SHDmod;
      }
   }
   function init()
   {
      this.mainsys = function()
      {
         if(this.Bindtgt != null)
         {
            this.ensys();
         }
         else
         {
            this.ensys();
            this.turnsys();
            this.powsys();
         }
         if(this.AMBAC > -30)
         {
            this.AMBAC = this.AMBAC - 1;
         }
         this.setbofg();
         this.setnt();
         this.doBind();
      };
      this.firectrl = function()
      {
         this.firemanual();
      };
      this.firectrlmode = "MANUAL";
      this.Gobj = new Object();
      this.Gobj._sW = 0;
      this.Gobj._sH = 0;
      this.Gobj._sR = 0;
   }
   function ensys()
   {
      if(this._EN < this.maxEN)
      {
         if(this._EN < 0)
         {
            this._EN = 0;
         }
         if(this.skill_8 > 0 && this._SP >= 10000)
         {
            this.ENcap += 1 + Math.round(0.004 * this.maxEN);
            if(this.ENcap >= this.maxEN - this._EN)
            {
               this._EN = this.maxEN;
               this.ENcap = 0;
            }
         }
         else if(this.defon == 30)
         {
            this.ENcap += 1 + Math.round(0.002 * this.maxEN);
            if(this.ENcap >= this.maxEN - this._EN)
            {
               this._EN = this.maxEN;
               this.ENcap = 0;
            }
         }
      }
      else
      {
         this._EN = this.maxEN;
         this.ENcap = 0;
      }
      if(this._SP >= 10000 && this.defon == 30 && this.skill_9 > 0 && this.maxHP - this._HP > 0)
      {
         this._HP += 2;
         if(this._HP > this.maxHP)
         {
            this._HP = this.maxHP;
         }
      }
   }
   function setobjz()
   {
      this.objz._sX = this._sX;
      this.objz._sY = this._sY;
      this.objz._sZ = this._sZ;
   }
   function powsys()
   {
      if(this.xG == 0)
      {
         this.vX = 0;
         this.vY = 0;
         this.vZ = 0;
      }
      else
      {
         if(this.ypow > 0)
         {
            if(this.fpow > this.maxpow)
            {
               this.fpow = this.maxpow;
            }
            else
            {
               this.fpow += 0.005 * this.maxpow;
            }
         }
         else if(this.ypow < 0)
         {
            if(this.fpow < 0)
            {
               this.fpow = 0;
            }
            else
            {
               this.fpow -= 0.005 * this.maxpow;
            }
         }
         if(this.bofg > 0)
         {
            var _loc3_ = 1 - this.v._pt * this.v._pt * this.xG;
            if(_loc3_ < 0.75)
            {
               _loc3_ = 0.75;
            }
            this.vX *= _loc3_;
            this.vY *= _loc3_;
            this.vZ *= _loc3_;
         }
         else if(this.stopow)
         {
            _loc3_ = 1 - 0.5 * this.maxpow / this.maxspeed;
            this.vX *= _loc3_;
            this.vY *= _loc3_;
            this.vZ *= _loc3_;
         }
         else if(this.fpow == 0)
         {
            this.vX = this.v._sX;
            this.vY = this.v._sY;
            this.vZ = this.v._sZ;
         }
         else
         {
            _loc3_ = 1 - this.v._pt * this.v._pt * this.xG;
            if(_loc3_ < 0.75)
            {
               _loc3_ = 0.75;
            }
            this.vX *= _loc3_;
            this.vY *= _loc3_;
            this.vZ *= _loc3_;
            var _loc4_ = new Object();
            _loc4_ = _global.getobjv(this.objz,this.xpow,this.ypow + 0.5 * this.fpow,this.zpow);
            this.vX += _loc4_.x;
            this.vY += _loc4_.y;
            this.vZ += _loc4_.z;
         }
      }
      this.VG = _global.dist_3d(0,0,0,this.vX - this.v._sX,this.vY - this.v._sY,this.vZ - this.v._sZ);
   }
   function dopow(fb, lr, ud, st, fp)
   {
      if(this.AMBAC > 0 || this.bofg > 0)
      {
         fb = 0;
         lr = 0;
         ud = 0;
         this.stopow = false;
         fp = false;
      }
      this.fpowon = fp;
      if(st)
      {
         fb = 0;
         lr = 0;
         ud = 0;
         this.stopow = true;
         this.fpowon = false;
      }
      else
      {
         this.stopow = false;
         if(fp)
         {
            lr = 0;
            ud = 0;
         }
      }
      switch(fb)
      {
         case 0:
            this.ypow = 0;
            break;
         case 1:
            this.stopow = false;
            this.ypow = 0.5 * this.subpow;
            break;
         case -1:
            this.stopow = false;
            this.ypow = -0.5 * this.subpow;
      }
      switch(lr)
      {
         case 0:
            this.xpow = 0;
            break;
         case 1:
            this.stopow = false;
            this.xpow = 0.5 * this.subpow;
            break;
         case -1:
            this.stopow = false;
            this.xpow = -0.5 * this.subpow;
      }
      switch(ud)
      {
         case 0:
            this.zpow = 0;
            break;
         case 1:
            this.stopow = false;
            this.zpow = 0.5 * this.subpow;
            break;
         case -1:
            this.stopow = false;
            this.zpow = -0.5 * this.subpow;
      }
      var _loc3_ = this._parent[this.tgt];
      if(_loc3_ != undefined && this.fpowon)
      {
         var _loc6_ = new Object();
         _loc6_ = _global.sToc(_loc3_._sX + _loc3_.v._sX - this._sX,_loc3_._sY + _loc3_.v._sY - this._sY,_loc3_._sZ + _loc3_.v._sZ - this._sZ,this.objz._sW,0,0);
         var _loc10_ = _loc6_.x;
         var _loc13_ = _loc6_.z;
         var _loc9_ = _loc6_.y;
         var _loc4_ = Math.atan2(_loc10_,_loc9_);
         if(_loc4_ > 0.06283185307179587)
         {
            _loc4_ = 0.06283185307179587 * this.turnlv;
         }
         else if(_loc4_ < -0.06283185307179587)
         {
            _loc4_ = -0.06283185307179587 * this.turnlv;
         }
         else
         {
            _loc4_ = 0;
         }
         var _loc5_ = Math.atan2(_loc13_,_global.distance(0,0,_loc10_,_loc9_));
         if(_loc5_ > 0.06283185307179587)
         {
            _loc5_ = 0.06283185307179587 * this.turnlv;
         }
         else if(_loc5_ < -0.06283185307179587)
         {
            _loc5_ = -0.06283185307179587 * this.turnlv;
         }
         else
         {
            _loc5_ = 0;
         }
         this.objz._sW += _loc4_;
         this.objz._sH = 0;
         this.objz._sR = 0;
      }
      else
      {
         this.objz._sW += lr * 0.02 * 3.141592653589793 * this.turnlv;
         this.objz._sH = 0;
         this.objz._sR = 0;
      }
   }
   function turnsys()
   {
      if(this.wwill != 0 || this.hwill != 0)
      {
         var _loc6_ = 0;
         var _loc5_ = 0;
         if(this.AMBAC <= 0)
         {
            if(Math.abs(this.wwill) < 0.005)
            {
               this.wwill = 0;
            }
            else
            {
               _loc6_ = 0.15 * this.turnlv * this.wwill;
               this.wwill -= _loc6_;
            }
            if(Math.abs(this.hwill) < 0.005)
            {
               this.hwill = 0;
            }
            else
            {
               _loc5_ = 0.15 * this.turnlv * this.hwill;
               this.hwill -= _loc5_;
            }
         }
         if(_loc6_ != 0 || _loc5_ != 0)
         {
            _global.objrotate(this.Gobj,_loc6_,_loc5_,0);
            this.Gobj._sR = 0;
            if(this.Gobj._sH > 0.3141592653589793)
            {
               this.Gobj._sH = 0.3141592653589793;
            }
            else if(this.Gobj._sH < -0.3141592653589793)
            {
               this.Gobj._sH = -0.3141592653589793;
            }
            if(this.Gobj._sW > 1.5707963267948966 || this.Gobj._sW < -1.5707963267948966)
            {
               var _loc3_ = 1;
               while(_loc3_ <= 8)
               {
                  if(this["weapon" + _loc3_].fclass == "cannon")
                  {
                     if(this["weapon" + _loc3_].t < 5)
                     {
                        this["weapon" + _loc3_].t += 5;
                     }
                  }
                  _loc3_ = _loc3_ + 1;
               }
            }
            var _loc4_ = new Object();
            _loc4_ = _global.rotateobj(this.objz,this.Gobj._sW,this.Gobj._sH,this.Gobj._sR);
            this._sW = _loc4_.w;
            this._sH = _loc4_.h;
            this._sR = _loc4_.r;
         }
      }
   }
   function setwill(setx, sety)
   {
      if(this.bofg == 0)
      {
         var _loc12_ = this._parent[this.tgt];
         if(this.stopow || this.scmrfg > 0)
         {
            if(this._parent[this.tgt] != undefined)
            {
               var _loc10_ = new Object();
               _loc10_ = _global.sToc(_loc12_._sX - this._sX,_loc12_._sY - this._sY,_loc12_._sZ - this._sZ,this._sW,this._sH,this._sR);
               var _loc4_ = _loc10_.x;
               var _loc3_ = _loc10_.z;
               var _loc11_ = _loc10_.y;
               var _loc9_ = _global.Cmr.Zoom / _loc11_;
               if(_loc9_ < 0)
               {
                  _loc9_ = - _loc9_;
                  _loc11_ = - _global.Cmr.Zoom;
               }
               else
               {
                  _loc11_ = _global.Cmr.Zoom;
               }
               _loc4_ *= _loc9_;
               _loc3_ *= _loc9_;
               var _loc8_ = Math.abs(_global.Cmr.wree * _global.Cmr.Zoom / _loc4_);
               var _loc7_ = Math.abs(_global.Cmr.hree * _global.Cmr.Zoom / _loc3_);
               if(_loc8_ < 1 || _loc7_ < 1)
               {
                  if(Math.abs(_loc8_) < Math.abs(_loc7_))
                  {
                     setx = _loc4_ * _loc8_;
                     sety = (- _loc3_) * _loc8_;
                  }
                  else
                  {
                     setx = _loc4_ * _loc7_;
                     sety = (- _loc3_) * _loc7_;
                  }
               }
               else if(_loc11_ < 0)
               {
                  if(_loc4_ == 0 && _loc3_ == 0)
                  {
                     setx = 0;
                     sety = (- _global.Cmr.hree) * _global.Cmr.Zoom;
                  }
                  else if(Math.abs(_loc8_) < Math.abs(_loc7_))
                  {
                     setx = _loc4_ * _loc8_;
                     sety = (- _loc3_) * _loc8_;
                  }
                  else
                  {
                     setx = _loc4_ * _loc7_;
                     sety = (- _loc3_) * _loc7_;
                  }
               }
               else
               {
                  setx = _loc4_;
                  sety = - _loc3_;
               }
               if(!isNaN(setx) && !isNaN(sety))
               {
                  this.ctrl_x = setx;
                  this.ctrl_y = sety;
               }
               else
               {
                  trace("setwill:mtgt._sX:" + _loc12_._sX);
               }
               this.wwill = Math.atan2(this.ctrl_x,_global.Cmr.Zoom);
               this.hwill = Math.atan2(- this.ctrl_y,_global.distance(0,0,this.ctrl_x,_global.Cmr.Zoom));
            }
            else
            {
               this.ctrl_x = 0;
               this.ctrl_y = 0;
               if(this.AMBAC <= -5)
               {
                  this.wwill = 2 * Math.atan2(this.ctrl_x,_global.Cmr.Zoom);
                  this.hwill = 2 * Math.atan2(- this.ctrl_y,_global.distance(0,0,this.ctrl_x,_global.Cmr.Zoom));
               }
            }
         }
         else
         {
            this.ctrl_x += (setx - this.ctrl_x) * 0.5;
            this.ctrl_y += (sety - this.ctrl_y) * 0.5;
            if(this.AMBAC <= -5)
            {
               this.wwill = 2 * Math.atan2(this.ctrl_x,_global.Cmr.Zoom);
               this.hwill = 2 * Math.atan2(- this.ctrl_y,_global.distance(0,0,this.ctrl_x,_global.Cmr.Zoom));
            }
         }
      }
   }
   function turntoXYZ(tx, ty, tz)
   {
      if(tx != undefined && ty != undefined && tz != undefined)
      {
         var _loc3_ = new Object();
         _loc3_ = _global.sToc(tx - this._sX,ty - this._sY,tz,this._sW,this._sH,this._sR);
         var _loc5_ = _loc3_.x;
         var _loc6_ = _loc3_.z;
         var _loc4_ = _loc3_.y;
         this.wwill = Math.atan2(_loc5_,_loc4_);
         this.hwill = Math.atan2(_loc6_,_global.distance(0,0,_loc5_,_loc4_));
      }
   }
   function turnto(tgt, lv)
   {
      if(tgt != undefined)
      {
         if(lv == null || lv == undefined)
         {
            lv = 1;
         }
         var _loc3_ = new Object();
         _loc3_ = _global.sToc(tgt._sX - this._sX,tgt._sY - this._sY,tgt._sZ - this._sZ,this._sW,this._sH,this._sR);
         var _loc7_ = _loc3_.x;
         var _loc8_ = _loc3_.z;
         var _loc6_ = _loc3_.y;
         this.wwill = lv * Math.atan2(_loc7_,_loc6_);
         this.hwill = lv * Math.atan2(_loc8_,_global.distance(0,0,_loc7_,_loc6_));
      }
   }
   function turnback(tgt, lv)
   {
      if(tgt != undefined)
      {
         if(lv == null || lv == undefined)
         {
            lv = 1;
         }
         var _loc3_ = new Object();
         _loc3_ = _global.sToc(tgt._sX - this._sX,tgt._sY - this._sY,tgt._sZ - this._sZ,this._sW,this._sH,this._sR);
         var _loc7_ = - _loc3_.x;
         var _loc8_ = - _loc3_.z;
         var _loc6_ = - _loc3_.y;
         this.wwill = lv * Math.atan2(_loc7_,_loc6_);
         this.hwill = lv * Math.atan2(_loc8_,_global.distance(0,0,_loc7_,_loc6_));
      }
   }
   function pointo(tgt)
   {
      if(tgt != undefined)
      {
         var _loc4_ = new Object();
         _loc4_ = _global.sToc(tgt._sX + tgt.v._sX - this._sX,tgt._sY + tgt.v._sY - this._sY,tgt._sZ + tgt.v._sZ - this._sZ,this._sW,this._sH,this._sR);
         var _loc6_ = _loc4_.x;
         var _loc7_ = _loc4_.z;
         var _loc5_ = _loc4_.y;
         this.setwill(Math.atan2(_loc6_,_loc5_),Math.atan2(_loc7_,_global.distance(0,0,_loc6_,_loc5_)));
         _global.objrotate(this,this.wwill,this.hwill,0);
      }
   }
   function setnt()
   {
      if(!this.skill_12on && this.skill_12 > 0 && this._SP >= 7500)
      {
         this.skill_12on = true;
         var _loc3_ = 0.5 * (1000 - this.bp_DF) + this.bp_DF;
         var _loc2_ = 0.5 * (100 - this.bp_speedlv) + this.bp_speedlv;
         var _loc6_ = this.bp_subpowlv;
         var _loc4_ = 0.5 * (100 - this.bp_turnlv) + this.bp_turnlv;
         var _loc5_ = 0.5 * (100 - this.bp_locklv) + this.bp_locklv;
         this._DF = _loc3_;
         this.maxspeed = _loc2_ / 2;
         this.maxpow = _loc2_ / 8;
         if(this.maxspeed > 0)
         {
            this.xG = 1.5 * this.maxpow / (this.maxspeed * this.maxspeed * this.maxspeed);
         }
         else
         {
            this.xG = 0;
         }
         this.turnlv = 0.01 * _loc4_;
         this.mpow = 0.5 * this.maxpow;
         this.subpow = 0.01 * _loc6_ * this.mpow;
         this.slv = 0.0005 * _loc5_;
      }
      else if(this.skill_12on && (this.skill_12 <= 0 || this._SP < 7500))
      {
         this.skill_12on = false;
         this._DF = this.bp_DF;
         this.maxspeed = this.bp_speedlv / 2;
         this.maxpow = this.bp_speedlv / 8;
         if(this.maxspeed > 0)
         {
            this.xG = 1.5 * this.maxpow / (this.maxspeed * this.maxspeed * this.maxspeed);
         }
         else
         {
            this.xG = 0;
         }
         this.turnlv = 0.01 * this.bp_turnlv;
         this.mpow = 0.5 * this.maxpow;
         this.subpow = 0.01 * this.bp_subpowlv * this.mpow;
         this.slv = 0.0005 * this.bp_locklv;
      }
      if(this.lockon && this.atton == 0)
      {
         this.lockont = this.lockont + 1;
      }
      else
      {
         this.lockont = 0;
      }
      if(this.ntact > 0)
      {
         this.ntact = this.ntact - 1;
      }
      else if(this.ntact < 0)
      {
         this.ntact = this.ntact + 1;
      }
      if(this.hypt > 0)
      {
         this.hypt = this.hypt - 1;
         this._glow += 1;
         if(this._glow > 1)
         {
            this._glow = 0;
         }
      }
      else
      {
         this._glow = 0;
         if(this.hypt < 0)
         {
            this.hypt = this.hypt + 1;
         }
      }
      if(this.onkf > 0)
      {
         this.onkf = this.onkf - 1;
      }
      if(this.ntcd > 0)
      {
         this.ntcd = this.ntcd - 1;
      }
      else
      {
         this.ntcd = 0;
      }
      if(this.shdon > 0)
      {
         this.shdon = this.shdon - 1;
      }
      if(this.atton > 0)
      {
         this.atton = this.atton - 1;
      }
      if(this.SkillCaston > 0)
      {
         this.SkillCaston = this.SkillCaston - 1;
      }
      if(this.combon > 0)
      {
         this.combon = this.combon - 1;
      }
      else
      {
         this.hits = 0;
      }
      if(this.atton == 0 && this.bofg <= 0 && !this.weaponhold)
      {
         this.defon = this.defon + 1;
         if(this.defon >= 30)
         {
            this.defon = 30;
            this.dodef();
         }
      }
      else
      {
         this.defon = 0;
         this.I_Fon = false;
      }
      if(this._parent[this._name + "_fif"] != undefined)
      {
         this.I_Fon = true;
      }
      this.setsp();
   }
   function CastSkill()
   {
      this.killffs();
      if(this.firectrlmode != "AUTO")
      {
         if(this.SkillCaston == 0)
         {
         }
      }
      this.SkillCaston = 5;
      this.scmrfg = 0;
   }
   function onkillff(ff)
   {
      if(this._parent[this._name].AI != undefined)
      {
         this._parent[this._name].AI.onkillff(ff);
      }
      if(this.onkf > 0)
      {
         if(this._name == _root.jiemiam.mst)
         {
            _root.jiemiam.showff(ff);
         }
      }
   }
   function killffs()
   {
      this.onkf = 5;
      if(this.weaponhold)
      {
         this.doweapon();
         return false;
      }
      if(this._parent[this.fftgt] == undefined)
      {
         this.ffdst = 10000;
         var _loc11_ = null;
         var _loc8_ = 10000;
         for(var _loc12_ in this._parent)
         {
            if(this._parent[_loc12_].fclss == "sboom" && this._parent[_loc12_]._force != this._force)
            {
               var _loc7_ = this._parent[_loc12_]._sX - this._sX;
               var _loc6_ = this._parent[_loc12_]._sY - this._sY;
               var _loc5_ = this._parent[_loc12_]._sZ - this._sZ;
               var _loc4_ = _global.dist_3d(0,0,0,_loc7_,_loc6_,_loc5_);
               var _loc3_ = new Object();
               _loc3_ = _global.sToc(_loc7_,_loc6_,_loc5_,this._sW,this._sH,this._sR);
               if(_loc4_ < 10000 && _loc3_.y > 0 && Math.abs(_loc3_.x) < _global.Cmr.wrees * _loc3_.y && Math.abs(_loc3_.z) < _global.Cmr.hrees * _loc3_.y)
               {
                  this.fftgt = _loc12_;
                  break;
               }
            }
            if(this._parent[_loc12_]._type == "ff" && this._parent[_loc12_].tgt == this._name)
            {
               _loc7_ = this._parent[_loc12_]._sX - this._sX;
               _loc6_ = this._parent[_loc12_]._sY - this._sY;
               _loc5_ = this._parent[_loc12_]._sZ - this._sZ;
               _loc4_ = _global.dist_3d(0,0,0,_loc7_,_loc6_,_loc5_);
               if(this._atteq == "NTR" && this._SP >= 10000 && _loc4_ < 2000 && this._parent[_loc12_]._HP == 0 && this._parent[_loc12_].tgt != this._parent[_loc12_].mst)
               {
                  if(this._parent[_loc12_].fclss == "shoot" || this._parent[_loc12_].fclss == "gd")
                  {
                     this._parent[_loc12_].tgt = this._parent[_loc12_].mst;
                     this._parent[_loc12_].tgt_main = this._parent[_loc12_].mst;
                     this._parent[_loc12_].backmst = false;
                     _global.snd("snd_launch2");
                     this._parent.attachMovie("bo_8",_loc12_ + "_ntr",this._parent.getNextHighestDepth(),{_sX:this._parent[_loc12_]._sX,_sY:this._parent[_loc12_]._sY,_sZ:this._parent[_loc12_]._sZ,_mst:_loc12_,sndon:1});
                  }
               }
               if(_loc4_ < this.ffdst)
               {
                  _loc3_ = new Object();
                  _loc3_ = _global.sToc(_loc7_,_loc6_,_loc5_,this._sW,this._sH,this._sR);
                  if(_loc3_.y > 0 && Math.abs(_loc3_.x) < _global.Cmr.wrees * _loc3_.y && Math.abs(_loc3_.z) < _global.Cmr.hrees * _loc3_.y)
                  {
                     this.fftgt = _loc12_;
                     this.ffdst = _loc4_;
                  }
               }
               if(_loc4_ < _loc8_)
               {
                  _loc11_ = _loc12_;
                  _loc8_ = _loc4_;
               }
            }
         }
         if(this._parent[this.fftgt] == undefined)
         {
            this.fftgt = _loc11_;
         }
      }
      if(this._parent[this.fftgt] != undefined)
      {
         this.killff(this.fftgt);
      }
      else
      {
         this.ffcovon = false;
         this.fftgt == null;
      }
   }
   function killff(ff)
   {
      if(this.fftgt != ff)
      {
         if(this._parent[ff] == undefined)
         {
            return false;
         }
         this.fftgt = ff;
         this.ffrx = 0;
         this.ffrz = 0;
         this.ffry = 0;
      }
      this.ffcovon = false;
      var _loc14_ = this._parent[ob]._sX - this._sX;
      var _loc13_ = this._parent[ob]._sY - this._sY;
      var _loc12_ = this._parent[ob]._sZ - this._sZ;
      var _loc10_ = new Object();
      _loc10_ = _global.sToc(_loc14_,_loc13_,_loc12_,this._sW,this._sH,this._sR);
      if(_loc10_.y > 0 && Math.abs(_loc10_.x) < _global.Cmr.wrees * _loc10_.y && Math.abs(_loc10_.z) < _global.Cmr.hrees * _loc10_.y)
      {
         this.ffcovon = true;
      }
      if(this["weapon" + this.weaponow].ftype == "fy" || this["weapon" + this.weaponow].ftype == "fyGD")
      {
         if(this._parent[this._parent[ff].onlock] == undefined && this.weaponCD == 0)
         {
            this["weapon" + this.weaponow].callit(ff);
            return true;
         }
         return false;
      }
      if(this.weaponhold || this.tgt == this.fftgt)
      {
         this.firectrlmode = "AUTO";
         var _loc4_ = 0;
         while(_loc4_ < 3)
         {
            this.fire_calculate();
            if(this.lockon || _loc4_ == 2)
            {
               this.doweapon();
               break;
            }
            _loc4_ = _loc4_ + 1;
         }
         this.firectrlmode = "MANUAL";
         return false;
      }
      if(this["weapon" + this.weaponow].t <= 0 && this["weapon" + this.weaponow]._zt == "nor")
      {
         var _loc17_ = this.tgt;
         var _loc18_ = this.covon;
         var _loc15_ = this.dston;
         var _loc16_ = this.dst;
         this.rlv = 1.5;
         this.grx = this.ffrx;
         this.grz = this.ffrz;
         this.gry = this.ffry;
         this.trx = this.ffrx;
         this.trz = this.ffrz;
         this.trd = this.ffry;
         this.tgt = ff;
         var _loc9_ = false;
         this.firectrlmode = "AUTO";
         _loc4_ = 0;
         while(_loc4_ < 3)
         {
            this.fire_calculate();
            if(this.lockon)
            {
               this.doweapon();
               this._parent[this.tgt].bofg = 5;
               _loc9_ = true;
               this.ffcovon = true;
               break;
            }
            _loc4_ = _loc4_ + 1;
         }
         if(this.htime == null)
         {
            this.ffdst = 10000;
            for(var ob in this._parent)
            {
               if(this._parent[ob].fclss == "sboom" && this._parent[ob]._force != this._force)
               {
                  var _loc8_ = this._parent[ob]._sX - this._sX;
                  var _loc7_ = this._parent[ob]._sY - this._sY;
                  var _loc6_ = this._parent[ob]._sZ - this._sZ;
                  var _loc5_ = _global.dist_3d(0,0,0,_loc8_,_loc7_,_loc6_);
                  var _loc3_ = new Object();
                  _loc3_ = _global.sToc(_loc8_,_loc7_,_loc6_,this._sW,this._sH,this._sR);
                  if(_loc5_ < 10000 && _loc3_.y > 0 && Math.abs(_loc3_.x) < _global.Cmr.wrees * _loc3_.y && Math.abs(_loc3_.z) < _global.Cmr.hrees * _loc3_.y)
                  {
                     this.fftgt = ob;
                     this.ffcovon = true;
                     break;
                  }
               }
               if(this._parent[ob]._type == "ff" && this._parent[ob].tgt == this._name)
               {
                  _loc8_ = this._parent[ob]._sX - this._sX;
                  _loc7_ = this._parent[ob]._sY - this._sY;
                  _loc6_ = this._parent[ob]._sZ - this._sZ;
                  _loc5_ = _global.dist_3d(0,0,0,_loc8_,_loc7_,_loc6_);
                  _loc3_ = new Object();
                  _loc3_ = _global.sToc(_loc8_,_loc7_,_loc6_,this._sW,this._sH,this._sR);
                  if(_loc5_ < this.ffdst && _loc3_.y > 0 && Math.abs(_loc3_.x) < _global.Cmr.wrees * _loc3_.y && Math.abs(_loc3_.z) < _global.Cmr.hrees * _loc3_.y)
                  {
                     this.fftgt = ob;
                     this.ffdst = _loc5_;
                     this.ffcovon = true;
                  }
               }
            }
         }
         else if(this["weapon" + this.weaponow].ct <= 5 && this["weapon" + this.weaponow].cn > 5)
         {
            this.doweapon();
            _loc9_ = true;
         }
         this.ffrx = this.trx;
         this.ffrz = this.trz;
         this.ffry = this.trd;
         if(!this.weaponhold)
         {
            this.grx = 0;
            this.grz = 0;
            this.gry = 0;
            this.trx = 0;
            this.trz = 0;
            this.trd = 0;
            this.htime = null;
            this.lockon = false;
            this.covon = _loc18_;
            this.dston = _loc15_;
            this.dst = _loc16_;
            this.tgt = _loc17_;
            this.rlv = 0;
         }
         this.firectrl = function()
         {
            this.firemanual();
         };
         this.firectrlmode = "MANUAL";
         return _loc9_;
      }
   }
}
