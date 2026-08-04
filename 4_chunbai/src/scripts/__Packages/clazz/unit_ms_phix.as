class clazz.unit_ms_phix extends clazz.unit_phix
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
   var v;
   var mainsys;
   var objz;
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
   var powCD = 0;
   var xunhangon = false;
   var turnlv = 0;
   var wwill = 0;
   var hwill = 0;
   var rwill = 0;
   var FDon = 0;
   var GDon = false;
   var GDdst = 0;
   var GDtgt = null;
   var GDdd = 0;
   var ntact = 0;
   var ntcd = 0;
   var lockont = 0;
   var skill_12on = false;
   var SkillCaston = 0;
   var Tranon = false;
   var _DF2 = 1000;
   var maxspeed2 = 0;
   var turnlv2 = 0;
   var subpow2 = 0;
   var slv2 = 0.02;
   var killffon = false;
   var ffrx = 0;
   var ffrz = 0;
   var ffry = 0;
   var ffdst = 10000;
   var fftgt = null;
   var ffcovon = false;
   function unit_ms_phix()
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
         this.maxspeed = unitdata.speedlv / 2;
         this.maxpow = unitdata.speedlv / 8;
         if(this.maxspeed > 0)
         {
            this.xG = 1.5 * this.maxpow / (this.maxspeed * this.maxspeed * this.maxspeed);
         }
         else
         {
            this.xG = 0;
         }
         this.turnlv = 0.01 * unitdata.turnlv;
         this.mpow = 0.5 * this.maxpow;
         this.subpow = 0.01 * unitdata.subpowlv * this.mpow;
         this.slv = 0.0005 * unitdata.locklv;
         if(this._type == "TMA" || this._type == "TMS")
         {
            this.bp_DF2 = unitdata._DF2;
            this.bp_speedlv2 = unitdata.speedlv2;
            this.bp_subpowlv2 = unitdata.subpowlv2;
            this.bp_turnlv2 = unitdata.turnlv2;
            this.bp_locklv2 = unitdata.locklv2;
            this._DF2 = unitdata._DF2;
            this.maxspeed2 = unitdata.speedlv2 / 2;
            this.turnlv2 = 0.01 * unitdata.turnlv2;
            this.subpow2 = 0.01 * unitdata.subpowlv2 * unitdata.speedlv2 / 16;
            this.slv2 = 0.0005 * unitdata.locklv2;
         }
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
         if((this._type == "MS" || this._type == "TMS") && this.SHDmod != null)
         {
            this.shdon = 0;
         }
         else
         {
            this.shdon = -1;
         }
         if(_global[unitdata.coreUnit] != undefined)
         {
            this.coreUnit = unitdata.coreUnit;
         }
         else
         {
            this.coreUnit = null;
         }
      }
   }
   function init()
   {
      this.mainact = function()
      {
         if(this.Bindtgt == null)
         {
            this.v._sX = this.vX;
            this.v._sY = this.vY;
            this.v._sZ = this.vZ;
            this.v._pt = _global.dist_3d(0,0,0,this.v._sX,this.v._sY,this.v._sZ);
            this._sX += this.v._sX;
            this._sY += this.v._sY;
            this._sZ += this.v._sZ;
         }
         if(this._name == _root.ctrl.mst || this._name == this._parent[_root.ctrl.mst].tgt)
         {
            this.DoVisible = true;
         }
         else
         {
            this.DoVisible = false;
            if(this.FartoVisible)
            {
               if(this._parent[this._name + "wj"] == undefined)
               {
                  var _loc4_ = 20;
                  if(this._size = "S")
                  {
                     _loc4_ = 10;
                  }
                  else if(this._size = "L")
                  {
                     _loc4_ = 50;
                  }
                  this._parent.attachMovie("line",this._name + "wj",this._parent.getNextHighestDepth(),{_sX:this._sX,_sY:this._sY,_sZ:this._sZ,_sX2:this._sX - this.v._sX,_sY2:this._sY - this.v._sY,_sZ2:this._sZ - this.v._sZ,_siz:_loc4_,_sizz:0.01});
                  this._parent[this._name + "wj"].onEnterFrame = function()
                  {
                     if(!_global.stopAll)
                     {
                        this._alpha -= 40;
                        if(this._alpha <= 0)
                        {
                           this.removeMovieClip();
                        }
                     }
                  };
               }
               else
               {
                  this._parent[this._name + "wj"]._sX = this._sX;
                  this._parent[this._name + "wj"]._sY = this._sY;
                  this._parent[this._name + "wj"]._sZ = this._sZ;
                  this._parent[this._name + "wj"]._sX2 = this._sX - this.v._sX;
                  this._parent[this._name + "wj"]._sY2 = this._sY - this.v._sY;
                  this._parent[this._name + "wj"]._sZ2 = this._sZ - this.v._sZ;
                  if(this._parent[this._name + "wj"]._alpha < 25)
                  {
                     this._parent[this._name + "wj"]._alpha = 100;
                  }
               }
            }
         }
      };
      this.mainsys = function()
      {
         if(this.Bindtgt != null)
         {
            this.ensys();
            this.GDon = false;
            this.GDdst = this.dst;
            this.GDtgt = this.tgt;
         }
         else if(this.GDon && this.covon)
         {
            this.doGD();
         }
         else
         {
            this.ensys();
            this.GDon = false;
            this.GDdst = this.dst;
            this.GDtgt = this.tgt;
            this.turnsys();
            this.powsys();
         }
         if(this.AMBAC > -30)
         {
            this.AMBAC = this.AMBAC - 1;
         }
         if(this.GDdd > 0)
         {
            this.GDdd = this.GDdd - 1;
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
   function powsys()
   {
      if(this.powCD > 0)
      {
         this.powCD = this.powCD - 1;
      }
      if(this.xG == 0)
      {
         this.vX = 0;
         this.vY = 0;
         this.vZ = 0;
      }
      else
      {
         if(this.fpowon && this.ypow > 0 && this._EN >= 1 + Math.round(this.maxpow))
         {
            this._EN -= 1 + Math.round(this.maxpow);
            if(this.fpow > this.maxpow)
            {
               this.fpow = this.maxpow;
            }
            else
            {
               this.fpow += 0.01 * this.maxpow;
            }
            if(this._type == "TMS")
            {
               this.doTran();
            }
         }
         else if(this.fpow > 0)
         {
            this.fpow -= 0.05 * this.maxpow;
         }
         else
         {
            this.fpow = 0;
         }
         if(this.bofg > 0)
         {
            var _loc3_ = 1 - this.v._pt * this.v._pt * this.xG;
            if(_loc3_ < 0.25)
            {
               _loc3_ = 0.25;
            }
            this.vX *= _loc3_;
            this.vY *= _loc3_;
            this.vZ *= _loc3_;
         }
         else if(this.AMBAC > 0)
         {
            if(this.AMBAC > 5)
            {
               var _loc5_ = 0;
               if(this._rR > 0)
               {
                  _loc5_ = - this.subpow;
               }
               else if(this._rR < 0)
               {
                  _loc5_ = this.subpow;
               }
               _loc3_ = 1 - this.v._pt * this.v._pt * this.xG;
               if(_loc3_ < 0.25)
               {
                  _loc3_ = 0.25;
               }
               this.vX *= _loc3_;
               this.vY *= _loc3_;
               this.vZ *= _loc3_;
               var _loc4_ = new Object();
               _loc4_ = _global.getobjv(this.objz,_loc5_,0,0);
               this.vX += _loc4_.x;
               this.vY += _loc4_.y;
               this.vZ += _loc4_.z;
            }
         }
         else if(this.stopow)
         {
            _loc3_ = 1 - 1.5 * this.maxpow / this.maxspeed;
            this.vX *= _loc3_;
            this.vY *= _loc3_;
            this.vZ *= _loc3_;
         }
         else if(this.fpowon && this.ypow == 0)
         {
            this.vX = this.v._sX;
            this.vY = this.v._sY;
            this.vZ = this.v._sZ;
         }
         else
         {
            _loc3_ = 1 - this.v._pt * this.v._pt * this.xG;
            if(_loc3_ < 0.25)
            {
               _loc3_ = 0.25;
            }
            this.vX *= _loc3_;
            this.vY *= _loc3_;
            this.vZ *= _loc3_;
            if(this._type == "TMA" && this.ypow < 0)
            {
               this.doTran();
            }
            _loc4_ = new Object();
            _loc4_ = _global.getobjv(this,this.xpow,this.ypow + this.fpow,this.zpow);
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
         st = false;
         fp = false;
      }
      else if(this.GDon)
      {
         fb = 1;
         lr = 0;
         ud = 0;
         st = false;
         fp = false;
      }
      this.fpowon = fp;
      if(st)
      {
         fb = 0;
         lr = 0;
         ud = 0;
         if(!this.stopow)
         {
            this.doAMBAC();
         }
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
            if(fb < 0)
            {
               fb == 0;
            }
         }
      }
      if(this.maxpow > 0)
      {
         var _loc6_ = false;
         if(this.ypow * fb < 0 || this.ypow == 0 && fb != 0)
         {
            _loc6_ = true;
         }
         if(this.xpow * lr < 0 || this.xpow == 0 && lr != 0)
         {
            _loc6_ = true;
         }
         if(this.zpow * ud < 0 || this.zpow == 0 && ud != 0)
         {
            _loc6_ = true;
         }
         if(_loc6_)
         {
            if(this.lockon && this["weapon" + this.weaponow].fclass != "shoot" && this.scmrfg == 0)
            {
               this.grx = 0;
               this.grz = 0;
               this.gry = 0;
               this.rlv = 0;
               this.firectrl = function()
               {
                  this.fireauto();
               };
            }
            if(this.powCD == 0)
            {
               this.powCD = 5;
               if(this._name == _root.ctrl.mst)
               {
                  _global.snd("pow");
               }
            }
         }
      }
      var _loc4_ = 0;
      switch(lr)
      {
         case 0:
            this.xpow = 0;
            break;
         case 1:
            this.stopow = false;
            this.xpow = this.subpow;
            _loc4_ = 5;
            break;
         case -1:
            this.stopow = false;
            this.xpow = - this.subpow;
            _loc4_ = 4;
      }
      switch(fb)
      {
         case 0:
            this.ypow = 0;
            break;
         case 1:
            this.stopow = false;
            this.ypow = this.mpow;
            _loc4_ = 2;
            break;
         case -1:
            this.stopow = false;
            this.ypow = -0.5 * this.subpow;
            _loc4_ = 3;
      }
      if(fb == 0 && lr == 0)
      {
         _loc4_ = 1;
      }
      switch(ud)
      {
         case 0:
            this.zpow = 0;
            break;
         case 1:
            this.stopow = false;
            this.zpow = this.subpow;
            break;
         case -1:
            this.stopow = false;
            this.zpow = - this.subpow;
      }
      switch(_loc4_)
      {
         case 0:
            break;
         case 1:
            if(this.bofg > 0)
            {
               this.modact(0,0,0,0,0,0,1);
            }
            else if(this.stopow)
            {
               if(this.shdon >= 0)
               {
                  this.modact(1,1,1,0,0,0,2);
                  if(this.shdon >= 0 && this.bofg <= 0 && this.act_shd == 2 && _loc4_ > 1)
                  {
                     this.shdon = 10;
                  }
               }
               else
               {
                  this.modact(1,1,1,0,0,0,0);
               }
            }
            else if(this.shdon <= 0)
            {
               this.modact(1,1,1,0,0,0,1);
            }
            else
            {
               this.modact(1,1,1,0,0,0,0);
            }
            break;
         case 2:
            if(this.bofg > 0 || _loc6_ && this.shdon <= 0)
            {
               this.modact(2,2,2,0,0,0,1);
            }
            else
            {
               this.modact(2,2,2,0,0);
            }
            break;
         case 3:
            if(this.bofg > 0)
            {
               this.modact(1,3,3,0,0,0,1);
            }
            else if(this.shdon >= 0)
            {
               this.modact(1,3,3,0,0,0,2);
               if(this.shdon >= 0 && this.bofg <= 0 && this.act_shd == 2 && _loc4_ > 1)
               {
                  this.shdon = 10;
               }
            }
            else
            {
               this.modact(1,3,3,0,0,0,0);
            }
            break;
         case 4:
            if(this.bofg > 0)
            {
               this.modact(1,4,4,0,0,0,1);
            }
            else if(this.shdon >= 0 && fb == -1)
            {
               this.modact(1,4,4,0,0,0,2);
               if(this.shdon >= 0 && this.bofg <= 0 && this.act_shd == 2 && _loc4_ > 1)
               {
                  this.shdon = 10;
               }
            }
            else if(_loc6_ && this.shdon <= 0)
            {
               this.modact(1,4,4,0,0,0,1);
            }
            else
            {
               this.modact(1,4,4,0,0);
            }
            break;
         case 5:
            if(this.bofg > 0)
            {
               this.modact(1,5,5,0,0,0,1);
            }
            else if(this.shdon >= 0 && fb == -1)
            {
               this.modact(1,5,5,0,0,0,2);
               if(this.shdon >= 0 && this.bofg <= 0 && this.act_shd == 2 && _loc4_ > 1)
               {
                  this.shdon = 10;
               }
            }
            else if(_loc6_ && this.shdon <= 0)
            {
               this.modact(1,5,5,0,0,0,1);
            }
            else
            {
               this.modact(1,5,5,0,0);
            }
      }
   }
   function torR()
   {
      var _loc2_ = - this._rR;
      if(this.xpow > 0)
      {
         _loc2_ = -0.3141592653589793 - this._rR;
      }
      else if(this.xpow < 0)
      {
         _loc2_ = 0.3141592653589793 - this._rR;
      }
      if(Math.abs(_loc2_) > 1.5707963267948966)
      {
         this._rR += 0.1 * _loc2_;
      }
      else if(Math.abs(_loc2_) > 0.01)
      {
         this._rR += 0.5 * _loc2_;
      }
      else
      {
         this._rR += _loc2_;
      }
   }
   function turnsys()
   {
      if(this.FDon > 0 && this.covon)
      {
         _global.objrotate(this,this.wwill,this.hwill,0);
         if(Math.abs(this._rH) > 1.5707963267948966)
         {
            this._rH *= 0.9;
         }
         else if(Math.abs(this._rH) > 0.01)
         {
            this._rH *= 0.5;
         }
         else
         {
            this._rH = 0;
         }
         if(Math.abs(this._rR) > 1.5707963267948966)
         {
            this._rR *= 0.9;
         }
         else if(Math.abs(this._rR) > 0.01)
         {
            this._rR *= 0.5;
         }
         else
         {
            this._rR = 0;
         }
         if(Math.abs(this._rW) > 1.5707963267948966)
         {
            this._rW *= 0.9;
         }
         else if(Math.abs(this._rW) > 0.01)
         {
            this._rW *= 0.5;
         }
         else
         {
            this._rW = 0;
         }
      }
      else if(this.wwill != 0 || this.hwill != 0 || this.rwill != 0)
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
            var _loc4_ = 0.5 * this.wwill - this._rW;
            if(Math.abs(_loc4_) > 1.5707963267948966)
            {
               this._rW += 0.1 * _loc4_;
            }
            else if(Math.abs(_loc4_) > 0.01)
            {
               this._rW += 0.5 * _loc4_;
            }
            else
            {
               this._rW += _loc4_;
            }
            var _loc3_ = 0.5 * this.hwill - this._rH;
            if(Math.abs(_loc3_) > 1.5707963267948966)
            {
               this._rH += 0.1 * _loc3_;
            }
            else if(Math.abs(_loc3_) > 0.01)
            {
               this._rH += 0.5 * _loc3_;
            }
            else
            {
               this._rH += _loc3_;
            }
            this.torR();
         }
         else
         {
            if(this.AMBAC > 5)
            {
               _loc6_ = this.wwill / (this.AMBAC - 5);
               this.wwill = (1 - 1 / (this.AMBAC - 5)) * this.wwill;
               _loc5_ = this.hwill / (this.AMBAC - 5);
               this.hwill = (1 - 1 / (this.AMBAC - 5)) * this.hwill;
            }
            if(Math.abs(this._rW) > 1.5707963267948966)
            {
               this._rW *= 0.9;
            }
            else if(Math.abs(this._rW) > 0.01)
            {
               this._rW *= 0.5;
            }
            else
            {
               this._rW = 0;
            }
            _loc3_ = 0.5 * this.hwill - this._rH;
            if(Math.abs(_loc3_) > 1.5707963267948966)
            {
               this._rH += 0.1 * _loc3_;
            }
            else if(Math.abs(_loc3_) > 0.01)
            {
               this._rH += 0.5 * _loc3_;
            }
            else
            {
               this._rH += _loc3_;
            }
            this.torR();
         }
         _global.objrotate(this,_loc6_,_loc5_,this.turnlv * this.rwill * 3.141592653589793 / 10);
      }
      else
      {
         if(Math.abs(this._rW) > 1.5707963267948966)
         {
            this._rW *= 0.9;
         }
         else if(Math.abs(this._rW) > 0.01)
         {
            this._rW *= 0.5;
         }
         else
         {
            this._rW = 0;
         }
         _loc3_ = 0.5 * this.hwill - this._rH;
         if(Math.abs(_loc3_) > 1.5707963267948966)
         {
            this._rH += 0.1 * _loc3_;
         }
         else if(Math.abs(_loc3_) > 0.01)
         {
            this._rH += 0.5 * _loc3_;
         }
         else
         {
            this._rH += _loc3_;
         }
         this.torR();
      }
   }
   function setwill(setx, sety)
   {
      if(this.bofg == 0)
      {
         var _loc12_ = this._parent[this.tgt];
         if(this.stopow || this.scmrfg > 0 || this.GDon && this.covon || this.FDon > 0 && this.covon)
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
      if(this.covon)
      {
         if(this.FDon > 0)
         {
            this.FDon = this.FDon - 1;
         }
      }
      else
      {
         this.FDon = 0;
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
   function doAMBAC(tgt)
   {
      if(this._type == "MS" || this._type == "TMS")
      {
         if(tgt == null || tgt == undefined)
         {
            tgt = this._parent[this.tgt];
         }
         if(tgt != undefined)
         {
            if(this.AMBAC <= -30 && tgt != undefined && this.bofg == 0)
            {
               if(this._name == _root.ctrl.mst)
               {
                  _global.snd("ambac");
               }
               if(this.covon)
               {
                  this._rH = -6.283185307179586;
               }
               else if(this.ctrl_x > 0)
               {
                  this._rR = -6.283185307179586;
               }
               else if(this.ctrl_x < 0)
               {
                  this._rR = 6.283185307179586;
               }
               var _loc5_ = new Object();
               _loc5_ = _global.sToc(tgt._sX - this._sX,tgt._sY - this._sY,tgt._sZ - this._sZ,this._sW,this._sH,this._sR);
               var _loc7_ = _loc5_.x;
               var _loc8_ = _loc5_.z;
               var _loc6_ = _loc5_.y;
               this.wwill = Math.atan2(_loc7_,_loc6_);
               this.hwill = Math.atan2(_loc8_,_global.distance(0,0,_loc7_,_loc6_));
               this.AMBAC = 10;
            }
         }
      }
   }
   function doGD()
   {
      _global.objrotate(this,this.wwill,this.hwill,0);
      if(this.fpow > this.maxpow)
      {
         this.fpow = this.maxpow;
      }
      else
      {
         this.fpow += 0.01 * this.maxpow;
      }
      this._rW = 0;
      if(Math.abs(this._rH) > 1.5707963267948966)
      {
         this._rH *= 0.9;
      }
      else if(Math.abs(this._rH) > 0.01)
      {
         this._rH *= 0.5;
      }
      else
      {
         this._rH = 0;
      }
      if(Math.abs(this._rR) > 1.5707963267948966)
      {
         this._rR *= 0.9;
      }
      else if(Math.abs(this._rR) > 0.01)
      {
         this._rR *= 0.5;
      }
      else
      {
         this._rR = 0;
      }
      if(Math.abs(this._rW) > 1.5707963267948966)
      {
         this._rW *= 0.9;
      }
      else if(Math.abs(this._rW) > 0.01)
      {
         this._rW *= 0.5;
      }
      else
      {
         this._rW = 0;
      }
      this.ypow = this.mpow;
      this.stopow = false;
      if(this.bofg > 0)
      {
         this.GDdst = this.dst;
         var _loc3_ = 1 - this.v._pt * this.v._pt * this.xG;
         if(_loc3_ < 0.25)
         {
            _loc3_ = 0.25;
         }
         this.vX *= _loc3_;
         this.vY *= _loc3_;
         this.vZ *= _loc3_;
      }
      else if(this.AMBAC > 0)
      {
         this.GDdst = this.dst;
      }
      else if(this._parent[this.tgt] != undefined)
      {
         var _loc7_ = this._parent[this.tgt]._sX - this._sX;
         var _loc6_ = this._parent[this.tgt]._sY - this._sY;
         var _loc5_ = this._parent[this.tgt]._sZ - this._sZ;
         if(this.GDtgt != this.tgt)
         {
            this.dst = _global.dist_3d(0,0,0,_loc7_,_loc6_,_loc5_);
            this.GDdst = this.dst;
            this.GDtgt = this.tgt;
         }
         this.modact(2,2,2,0,0);
         if(this.dst == 0)
         {
            this.dst = 1;
         }
         if(this.dst < this.GDdst)
         {
            this.GDdst = this.dst;
         }
         this.GDdst -= this.maxspeed;
         var _loc4_ = 1 - this.GDdst / this.dst;
         this.vX = _loc4_ * _loc7_;
         this.vY = _loc4_ * _loc6_;
         this.vZ = _loc4_ * _loc5_;
         if(this.skill_2 > 0 && this._SP >= 7500 || this.hypt > 0)
         {
            if(this.GDdst <= - this.maxspeed)
            {
               this.GDon = false;
            }
         }
         else if(this.GDdst <= 0)
         {
            this.GDon = false;
         }
      }
      else
      {
         this.GDon = false;
      }
      this.VG = _global.dist_3d(0,0,0,this.vX - this.v._sX,this.vY - this.v._sY,this.vZ - this.v._sZ);
   }
   function setnt()
   {
      if(!this.skill_12on && this.skill_12 > 0 && this._SP >= 7500)
      {
         this.skill_12on = true;
         var _loc4_ = 0.5 * (1000 - this.bp_DF) + this.bp_DF;
         var _loc2_ = 0.5 * (100 - this.bp_speedlv) + this.bp_speedlv;
         var _loc9_ = 0.5 * (100 - this.bp_subpowlv) + this.bp_subpowlv;
         var _loc5_ = 0.5 * (100 - this.bp_turnlv) + this.bp_turnlv;
         var _loc7_ = 0.5 * (100 - this.bp_locklv) + this.bp_locklv;
         this._DF = _loc4_;
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
         this.turnlv = 0.01 * _loc5_;
         this.mpow = 0.5 * this.maxpow;
         this.subpow = 0.01 * _loc9_ * this.mpow;
         this.slv = 0.0005 * _loc7_;
         if(this._type == "TMA" || this._type == "TMS")
         {
            var _loc10_ = 0.5 * (1000 - this.bp_DF2) + this.bp_DF2;
            var _loc3_ = 0.5 * (100 - this.bp_speedlv2) + this.bp_speedlv2;
            var _loc6_ = 0.5 * (100 - this.bp_subpowlv2) + this.bp_subpowlv2;
            var _loc11_ = 0.5 * (100 - this.bp_turnlv2) + this.bp_turnlv2;
            var _loc8_ = 0.5 * (100 - this.bp_locklv2) + this.bp_locklv2;
            this._DF2 = _loc10_;
            this.maxspeed2 = _loc3_ / 2;
            this.turnlv2 = 0.01 * _loc11_;
            this.subpow2 = 0.01 * _loc6_ * _loc3_ / 16;
            this.slv2 = 0.0005 * _loc8_;
         }
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
         if(this._type == "TMA" || this._type == "TMS")
         {
            this._DF2 = this.bp_DF2;
            this.maxspeed2 = this.bp_speedlv2 / 2;
            this.turnlv2 = 0.01 * this.bp_turnlv2;
            this.subpow2 = 0.01 * this.bp_subpowlv2 * this.bp_speedlv2 / 16;
            this.slv2 = 0.0005 * this.bp_locklv2;
         }
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
      if(this.atton == 0 && this.bofg <= 0 && !this.weaponhold && this.fpow == 0 && !this.GDon)
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
            if(this._parent[this.fftgt] != undefined && !this.ffcovon)
            {
               this.doAMBAC(this._parent[this.fftgt]);
            }
            else if(!this.covon)
            {
               this.doAMBAC();
            }
         }
      }
      this.SkillCaston = 5;
      this.scmrfg = 0;
   }
   function doTran()
   {
      if(this.AMBAC > -15 || this.GDon || this.weaponhold)
      {
         return false;
      }
      if(this._type == "TMS")
      {
         this.AMBAC = 0;
         if(this.ctrl_x > 0)
         {
            this._rR = -6.283185307179586;
         }
         else if(this.ctrl_x < 0)
         {
            this._rR = 6.283185307179586;
         }
         if(this._name == _root.ctrl.mst)
         {
            _global.snd("ambac");
         }
         this.Tranon = true;
         this._type = "TMA";
         var _loc5_ = this._DF;
         var _loc8_ = this.maxspeed;
         var _loc7_ = this.turnlv;
         var _loc6_ = this.subpow;
         var _loc4_ = this.slv;
         this._DF = this._DF2;
         this.maxspeed = this.maxspeed2;
         this.turnlv = this.turnlv2;
         this.subpow = this.subpow2;
         this.slv = this.slv2;
         this._DF2 = _loc5_;
         this.maxspeed2 = _loc8_;
         this.turnlv2 = _loc7_;
         this.subpow2 = _loc6_;
         this.slv2 = _loc4_;
         this.maxpow = this.maxspeed / 4;
         if(this.maxspeed > 0)
         {
            this.xG = 1.5 * this.maxpow / (this.maxspeed * this.maxspeed * this.maxspeed);
         }
         else
         {
            this.xG = 0;
         }
         this.mpow = 0.5 * this.maxpow;
         this.act_bd = 1;
         this.act_lg = 1;
         this.act_wi = 1;
         this.act_la = 1;
         this.act_ra = 1;
         this.act_shd = 1;
         this.modact(-1,0,0,0,0);
         this.shdon = -1;
      }
      else if(this._type == "TMA")
      {
         this.AMBAC = 0;
         this._rH = -6.283185307179586;
         if(this._name == _root.ctrl.mst)
         {
            _global.snd("ambac");
         }
         this.Tranon = false;
         this._type = "TMS";
         _loc5_ = this._DF;
         _loc8_ = this.maxspeed;
         _loc7_ = this.turnlv;
         _loc6_ = this.subpow;
         _loc4_ = this.slv;
         this._DF = this._DF2;
         this.maxspeed = this.maxspeed2;
         this.turnlv = this.turnlv2;
         this.subpow = this.subpow2;
         this.slv = this.slv2;
         this._DF2 = _loc5_;
         this.maxspeed2 = _loc8_;
         this.turnlv2 = _loc7_;
         this.subpow2 = _loc6_;
         this.slv2 = _loc4_;
         this.maxpow = this.maxspeed / 4;
         if(this.maxspeed > 0)
         {
            this.xG = 1.5 * this.maxpow / (this.maxspeed * this.maxspeed * this.maxspeed);
         }
         else
         {
            this.xG = 0;
         }
         this.mpow = 0.5 * this.maxpow;
         this.modact(-1,0,0,0,0);
         if(this.SHDmod != null)
         {
            this.shdon = 0;
         }
      }
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
