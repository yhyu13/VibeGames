class clazz.unit_phix extends clazz.sobj_phix
{
   var v;
   var tgtdc;
   var objz;
   var weapon5;
   var weapon6;
   var weapon7;
   var weapon8;
   var linelist;
   var BDmod;
   var LGmod;
   var LAmod;
   var RAmod;
   var WImod;
   var SHDmod;
   var MAmod;
   var mainsys;
   var xG;
   var zdi = 0;
   var _protype = null;
   var $NAME = "???";
   var $TYPE = "???";
   var _pilot = null;
   var _type = null;
   var _size = null;
   var _force = 0;
   var _Rank = 0;
   var ctrlmode = "MANUAL";
   var _lv = 0;
   var _defeq = null;
   var _atteq = null;
   var _zt = "nor";
   var _HP = 1000;
   var maxHP = 1000;
   var _EN = 1000;
   var maxEN = 1000;
   var ENcap = 0;
   var _DF = 1000;
   var info2trace = null;
   var Danger = 0;
   var bp_DF = 0;
   var bp_speedlv = 0;
   var bp_subpowlv = 0;
   var bp_turnlv = 0;
   var bp_locklv = 0;
   var bp_DF2 = 0;
   var bp_speedlv2 = 0;
   var bp_subpowlv2 = 0;
   var bp_turnlv2 = 0;
   var bp_locklv2 = 0;
   var vX = 0;
   var vY = 0;
   var vZ = 0;
   var AMBAC = -30;
   var ctrl_x = 0;
   var ctrl_y = 0;
   var _SP = 5000;
   var spadd = 0;
   var spdec = 0;
   var spCD = 0;
   var spEX = 0;
   var SPcap = 0;
   var Bindtgt = null;
   var Bind_X = 0;
   var Bind_Y = 0;
   var Bind_Z = 0;
   var Bind_W = 0;
   var Bind_H = 0;
   var Bind_R = 0;
   var tgt = null;
   var lasttgt = null;
   var tgt_x = 0;
   var tgt_y = 0;
   var firectrlmode = "AUTO";
   var shotw = this._sW;
   var shoth = this._sH;
   var perfectlock = false;
   var lockon = false;
   var covon = false;
   var dston = false;
   var htime = null;
   var ddspeedlv = 100;
   var dstlv = 100000;
   var dst = 100000;
   var srlv = 1;
   var rlv = 0;
   var slv = 0.02;
   var gw = 0;
   var gh = 0;
   var gx = 0;
   var gz = 0;
   var gy = 0;
   var grx = 0;
   var grz = 0;
   var gry = 0;
   var trx = 0;
   var trz = 0;
   var trd = 0;
   var rx = 0;
   var rz = 0;
   var firectrl = null;
   var weaponF1 = 1;
   var weaponF2 = 2;
   var weaponF3 = 3;
   var weaponF4 = 4;
   var weaponTeam = 0;
   var weaponow = 0;
   var weaponFnow = 0;
   var weaponhold = false;
   var weaponCD = 0;
   var act_bd = 1;
   var act_lg = 1;
   var act_wi = 1;
   var act_la = 1;
   var act_ra = 1;
   var act_wp = 0;
   var act_shd = 1;
   var I_Fon = false;
   var IFsiz = 50;
   var hypt = 0;
   var defon = 0;
   var atton = 0;
   var combon = 0;
   var hits = 0;
   var shdon = -1;
   var _SHDP = 1000;
   var coreUnit = null;
   var baojias = 0;
   var onkf = 0;
   var bofg = 0;
   var fenshenon = false;
   var scmrfg = 0;
   var scmrtgt = null;
   var scmrtgtd = 0;
   var _Skill = 0;
   var _Skillon = 0;
   var skill_0 = -1;
   var skill_1 = -1;
   var skill_2 = -1;
   var skill_3 = -1;
   var skill_4 = -1;
   var skill_5 = -1;
   var skill_6 = -1;
   var skill_7 = -1;
   var skill_8 = -1;
   var skill_9 = -1;
   var skill_10 = -1;
   var skill_11 = -1;
   var skill_12 = -1;
   function unit_phix()
   {
      super();
      this.v = new Object();
      this.v._sX = 0;
      this.v._sY = 0;
      this.v._sZ = 0;
      this.v._pt = 0;
      this.tgtdc = new Object();
      this.tgtdc._sX = 0;
      this.tgtdc._sY = 0;
      this.tgtdc._sZ = 0;
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
      };
   }
   function linkdata(unitdata)
   {
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
   function setsp()
   {
      if(this.spEX > 0)
      {
         this.spEX = this.spEX - 1;
      }
      else if(this.SPcap > 0)
      {
         this._SP -= this.SPcap;
         this.SPcap = 0;
      }
      else
      {
         if(this.spdec != 0)
         {
            this._SP -= this.spdec;
            this.spCD = 30;
         }
         if(this.spCD <= 0)
         {
            if(this.skill_11 > 0)
            {
               this._SP += Math.floor(this.spadd);
            }
            else
            {
               this._SP += Math.floor(0.5 * this.spadd);
            }
            if(this.spadd == 0 && this._SP > 5000 && this.defon == 30)
            {
               this._SP -= 20;
               if(this._SP < 5000)
               {
                  this._SP = 5000;
               }
            }
         }
         else
         {
            this.spCD = this.spCD - 1;
         }
      }
      if(this._protype == "hx_78s")
      {
         this._EN += 10;
         this._SP += 100;
      }
      if(this._SP > 10000)
      {
         this._SP = 10000;
      }
      if(this._SP < 0)
      {
         this._SP = 0;
      }
      this.spadd = 0;
      this.spdec = 0;
      this.showSkill();
   }
   function doBind()
   {
      if(this.Bindtgt._sR != undefined)
      {
         if(this.Bind_Y == 0)
         {
            this.Bind_Y = 0.1;
         }
         this.weaponCD = 30;
         var _loc3_ = new Object();
         _loc3_ = _global.moveobj(this.Bindtgt,this.Bind_X,this.Bind_Y,this.Bind_Z);
         this.vX = _loc3_.x - this._sX;
         this.vY = _loc3_.y - this._sY;
         this.vZ = _loc3_.z - this._sZ;
         this.v._sX = this.vX;
         this.v._sY = this.vY;
         this.v._sZ = this.vZ;
         this.v._pt = _global.dist_3d(0,0,0,this.v._sX,this.v._sY,this.v._sZ);
         _loc3_ = _global.daToa(this.Bind_W,this.Bind_H,this.Bind_R,this.Bindtgt._sW,this.Bindtgt._sH,this.Bindtgt._sR);
         this._sW = _loc3_.w;
         this._sH = _loc3_.h;
         this._sR = _loc3_.r;
         this._sX += this.v._sX;
         this._sY += this.v._sY;
         this._sZ += this.v._sZ;
         this.setobjz();
      }
      this.Bindtgt = null;
   }
   function gettgt(tgtid)
   {
      if(tgtid != this.tgt && !this.weaponhold)
      {
         this.tgt = tgtid;
         if(this._parent[this.tgt] == undefined || this._parent[this.tgt]._zt == "broken")
         {
            this.lasttgt = null;
         }
         else if(this._parent[this.tgt]._type != "ff")
         {
            this.lasttgt = this.tgt;
         }
         this.firectrl = function()
         {
            this.firemanual();
         };
         this.firectrlmode = "MANUAL";
         this.shotw = this._sW;
         this.shoth = this._sH;
         this.lockon = false;
         this.perfectlock = false;
         this.htime = null;
         this.rlv = 0;
         this.gw = 0;
         this.gh = 0;
         this.gx = 0;
         this.gz = 0;
         this.gy = 0;
         this.grx = 0;
         this.grz = 0;
         this.gry = 0;
         this.trx = 0;
         this.trz = 0;
         this.trd = 0;
         this.rx = 0;
         this.rz = 0;
         this.scmrfg = 0;
      }
      return this.tgt;
   }
   function fire_calculate()
   {
      this.perfectlock = false;
      if(this._parent[this.tgt]._zt == "broken")
      {
         this.gettgt(null);
      }
      if(this._parent[this.tgt] != undefined)
      {
         this.grx += (this.trx - this.grx) * this.rlv;
         this.grz += (this.trz - this.grz) * this.rlv;
         this.gry += (this.trd - this.gry) * this.rlv;
         var _loc10_ = this._parent[this.tgt]._sX - this._sX;
         var _loc9_ = this._parent[this.tgt]._sY - this._sY;
         var _loc8_ = this._parent[this.tgt]._sZ - this._sZ;
         this.tgtdc._sX = _loc10_;
         this.tgtdc._sY = _loc9_;
         this.tgtdc._sZ = _loc8_;
         this.dst = _global.dist_3d(0,0,0,_loc10_,_loc9_,_loc8_);
         var _loc3_ = new Object();
         _loc3_ = _global.sToc(_loc10_,_loc9_,_loc8_,this._sW,this._sH,this._sR);
         if(_loc3_.y > 5)
         {
            this.tgt_x = _loc3_.x * _global.Cmr.Zoom / _loc3_.y;
            this.tgt_y = (- _loc3_.z) * _global.Cmr.Zoom / _loc3_.y;
         }
         else
         {
            this.tgt_x = null;
            this.tgt_y = null;
         }
         if(_loc3_.y > 5 && Math.abs(_loc3_.x) < _global.Cmr.wrees * _loc3_.y && Math.abs(_loc3_.z) < _global.Cmr.hrees * _loc3_.y)
         {
            if(this.rlv < 1.5)
            {
               this.rlv += this.slv;
            }
            else
            {
               this.rlv = 1.5;
            }
            var _loc14_ = this._parent[this.tgt].v._sX - this.v._sX;
            var _loc13_ = this._parent[this.tgt].v._sY - this.v._sY;
            var _loc12_ = this._parent[this.tgt].v._sZ - this.v._sZ;
            var _loc4_ = new Object();
            _loc4_ = _global.sToc(_loc14_,_loc13_,_loc12_,this._sW,this._sH,this._sR);
            this.gx = _loc3_.x + this.grx;
            this.gz = _loc3_.z + this.grz;
            this.gy = _loc3_.y + this.gry;
            this.gw = Math.atan2(this.gx,this.gy);
            this.gh = Math.atan2(this.gz,_global.distance(0,0,this.gx,this.gy));
            var _loc5_ = new Object();
            _loc5_ = _global.cTos(0,this.ddspeedlv,0,this.gw,this.gh,0);
            var _loc6_ = new Object();
            _loc6_ = _global.cTos(_loc5_.x,_loc5_.y,_loc5_.z,this._sW,this._sH,this._sR);
            this.shotw = Math.atan2(_loc6_.x,_loc6_.y);
            this.shoth = Math.atan2(_loc6_.z,_global.distance(0,0,_loc6_.x,_loc6_.y));
            if(this.dst < this.dstlv && _loc5_.y > _loc4_.y && Math.abs(this.gw) < Math.atan(_global.Cmr.wree) && Math.abs(this.gh) < Math.atan(_global.Cmr.hree))
            {
               this.htime = _loc3_.y / (_loc5_.y - _loc4_.y);
               this.trx = _loc4_.x * this.htime;
               this.trz = _loc4_.z * this.htime;
               this.trd = _loc4_.y * this.htime;
               this.rx = _loc5_.x * this.htime - (_loc3_.x + this.trx);
               this.rz = _loc5_.z * this.htime - (_loc3_.z + this.trz);
               if(Math.abs(this.rx) < this.srlv && Math.abs(this.rz) < this.srlv)
               {
                  var _loc11_ = _global.distance(0,0,_loc4_.x,_loc4_.z);
                  if(_loc11_ < 5)
                  {
                     this.perfectlock = true;
                  }
                  this._parent[this.tgt].onlock(this._name);
                  this.lockon = true;
                  this.covon = true;
                  this.dston = true;
                  this.firectrl = function()
                  {
                     this.firelockon();
                  };
               }
               else
               {
                  this.lockon = false;
                  this.covon = true;
                  this.dston = true;
               }
            }
            else
            {
               this.gw = 0;
               this.gh = 0;
               this.gx = 0;
               this.gz = 0;
               this.gy = 0;
               this.grx = 0;
               this.grz = 0;
               this.gry = 0;
               this.trx = 0;
               this.trz = 0;
               this.trd = 0;
               this.htime = null;
               this.lockon = false;
               this.covon = true;
               if(this.dst < this.dstlv)
               {
                  this.dston = true;
               }
               else
               {
                  this.dston = false;
               }
               this.rlv = 0;
               this.gx = this.ctrl_x;
               this.gz = - this.ctrl_y;
               this.gy = _global.Cmr.Zoom;
               _loc6_ = new Object();
               _loc6_ = _global.cTos(this.gx,this.gy,this.gz,this._sW,this._sH,this._sR);
               this.shotw = Math.atan2(_loc6_.x,_loc6_.y);
               this.shoth = Math.atan2(_loc6_.z,_global.distance(0,0,_loc6_.x,_loc6_.y));
               this.gw = Math.atan2(this.gx,this.gy);
               this.gh = Math.atan2(this.gz,_global.distance(0,0,this.gx,this.gy));
            }
         }
         else
         {
            this.gw = 0;
            this.gh = 0;
            this.gx = 0;
            this.gz = 0;
            this.gy = 0;
            this.grx = 0;
            this.grz = 0;
            this.gry = 0;
            this.trx = 0;
            this.trz = 0;
            this.trd = 0;
            this.htime = null;
            this.lockon = false;
            this.covon = false;
            if(this.dst < this.dstlv)
            {
               this.dston = true;
            }
            else
            {
               this.dston = false;
            }
            this.rlv = 0;
            this.gx = this.ctrl_x;
            this.gz = - this.ctrl_y;
            this.gy = _global.Cmr.Zoom;
            _loc6_ = new Object();
            _loc6_ = _global.cTos(this.gx,this.gy,this.gz,this._sW,this._sH,this._sR);
            this.shotw = Math.atan2(_loc6_.x,_loc6_.y);
            this.shoth = Math.atan2(_loc6_.z,_global.distance(0,0,_loc6_.x,_loc6_.y));
            this.gw = Math.atan2(this.gx,this.gy);
            this.gh = Math.atan2(this.gz,_global.distance(0,0,this.gx,this.gy));
         }
      }
      else
      {
         this.gw = 0;
         this.gh = 0;
         this.gx = 0;
         this.gz = 0;
         this.gy = 0;
         this.grx = 0;
         this.grz = 0;
         this.gry = 0;
         this.trx = 0;
         this.trz = 0;
         this.trd = 0;
         this.htime = null;
         this.lockon = false;
         this.covon = false;
         this.dston = false;
         this.rlv = 0;
         this.gx = this.ctrl_x;
         this.gz = - this.ctrl_y;
         this.gy = _global.Cmr.Zoom;
         _loc6_ = new Object();
         _loc6_ = _global.cTos(this.gx,this.gy,this.gz,this._sW,this._sH,this._sR);
         this.shotw = Math.atan2(_loc6_.x,_loc6_.y);
         this.shoth = Math.atan2(_loc6_.z,_global.distance(0,0,_loc6_.x,_loc6_.y));
         this.gw = Math.atan2(this.gx,this.gy);
         this.gh = Math.atan2(this.gz,_global.distance(0,0,this.gx,this.gy));
         this.tgt = null;
         this.dst = 0;
         var _loc7_ = new Object();
         _loc7_ = _global.moveobj(this.objz,0,this.dstlv,0);
         this.tgtdc._sX = _loc7_.x - this._sX;
         this.tgtdc._sY = _loc7_.y - this._sY;
         this.tgtdc._sY = _loc7_.z - this._sZ;
         this.tgt_x = null;
         this.tgt_y = null;
      }
   }
   function fireauto()
   {
      if(this["weapon" + this.weaponow].lockmod == 1 || this._SP >= 10000 && this.skill_3 > 0 || this._parent[this.tgt]._type == "ff" || this.spEX > 0)
      {
         this.rlv = 1.5;
         var _loc2_ = 0;
         while(_loc2_ < 3)
         {
            this.fire_calculate();
            if(this.lockon)
            {
               break;
            }
            _loc2_ = _loc2_ + 1;
         }
         if(this.htime != null)
         {
            this.lockon = true;
         }
      }
      else
      {
         this.fire_calculate();
      }
      this.firectrlmode = "AUTO";
      this.fireworks();
   }
   function firemanual()
   {
      this.perfectlock = false;
      if(this._parent[this.tgt]._zt == "broken")
      {
         this.gettgt(null);
      }
      this.gx = this.ctrl_x;
      this.gz = - this.ctrl_y;
      this.gy = _global.Cmr.Zoom;
      var _loc5_ = new Object();
      _loc5_ = _global.cTos(this.gx,this.gy,this.gz,this._sW,this._sH,this._sR);
      this.shotw = Math.atan2(_loc5_.x,_loc5_.y);
      this.shoth = Math.atan2(_loc5_.z,_global.distance(0,0,_loc5_.x,_loc5_.y));
      this.gw = Math.atan2(this.gx,this.gy);
      this.gh = Math.atan2(this.gz,_global.distance(0,0,this.gx,this.gy));
      if(this._parent[this.tgt] != undefined)
      {
         var _loc10_ = this._parent[this.tgt]._sX - this._sX;
         var _loc9_ = this._parent[this.tgt]._sY - this._sY;
         var _loc8_ = this._parent[this.tgt]._sZ - this._sZ;
         this.tgtdc._sX = _loc10_;
         this.tgtdc._sY = _loc9_;
         this.tgtdc._sZ = _loc8_;
         this.dst = _global.dist_3d(0,0,0,_loc10_,_loc9_,_loc8_);
         var _loc3_ = new Object();
         _loc3_ = _global.sToc(_loc10_,_loc9_,_loc8_,this._sW,this._sH,this._sR);
         if(_loc3_.y > 5)
         {
            this.tgt_x = _loc3_.x * _global.Cmr.Zoom / _loc3_.y;
            this.tgt_y = (- _loc3_.z) * _global.Cmr.Zoom / _loc3_.y;
         }
         else
         {
            this.tgt_x = null;
            this.tgt_y = null;
         }
         if(_loc3_.y > 5 && Math.abs(_loc3_.x) < _global.Cmr.wrees * _loc3_.y && Math.abs(_loc3_.z) < _global.Cmr.hrees * _loc3_.y)
         {
            var _loc13_ = this._parent[this.tgt].v._sX - this.v._sX;
            var _loc12_ = this._parent[this.tgt].v._sY - this.v._sY;
            var _loc11_ = this._parent[this.tgt].v._sZ - this.v._sZ;
            var _loc4_ = new Object();
            _loc4_ = _global.sToc(_loc13_,_loc12_,_loc11_,this._sW,this._sH,this._sR);
            var _loc6_ = new Object();
            _loc6_ = _global.cTos(0,this.ddspeedlv,0,this.gw,this.gh,0);
            if(this.dst < this.dstlv && _loc6_.y > _loc4_.y)
            {
               this.htime = _loc3_.y / (_loc6_.y - _loc4_.y);
               this.trx = _loc4_.x * this.htime;
               this.trz = _loc4_.z * this.htime;
               this.trd = _loc4_.y * this.htime;
               this.rx = _loc6_.x * this.htime - (_loc3_.x + this.trx);
               this.rz = _loc6_.z * this.htime - (_loc3_.z + this.trz);
               if(Math.abs(this.rx) < this.srlv && Math.abs(this.rz) < this.srlv)
               {
                  this.lockon = false;
                  this.covon = true;
                  this.dston = true;
                  this.rlv = 0;
               }
               else
               {
                  this.lockon = false;
                  this.covon = true;
                  this.dston = true;
                  this.rlv = 0;
               }
            }
            else
            {
               this.gw = 0;
               this.gh = 0;
               this.gx = 0;
               this.gz = 0;
               this.gy = 0;
               this.grx = 0;
               this.grz = 0;
               this.gry = 0;
               this.trx = 0;
               this.trz = 0;
               this.trd = 0;
               this.htime = null;
               this.lockon = false;
               this.covon = true;
               if(this.dst < this.dstlv)
               {
                  this.dston = true;
               }
               else
               {
                  this.dston = false;
               }
               this.rlv = 0;
            }
         }
         else
         {
            this.gw = 0;
            this.gh = 0;
            this.gx = 0;
            this.gz = 0;
            this.gy = 0;
            this.grx = 0;
            this.grz = 0;
            this.gry = 0;
            this.trx = 0;
            this.trz = 0;
            this.trd = 0;
            this.htime = null;
            this.lockon = false;
            this.covon = false;
            if(this.dst < this.dstlv)
            {
               this.dston = true;
            }
            else
            {
               this.dston = false;
            }
            this.rlv = 0;
         }
      }
      else
      {
         this.htime = null;
         this.lockon = false;
         this.covon = false;
         this.dston = false;
         this.rlv = 0;
         this.tgt = null;
         this.dst = 0;
         var _loc7_ = new Object();
         _loc7_ = _global.moveobj(this.objz,0,this.dstlv,0);
         this.tgtdc._sX = _loc7_.x - this._sX;
         this.tgtdc._sY = _loc7_.y - this._sY;
         this.tgtdc._sY = _loc7_.z - this._sZ;
         this.tgt_x = null;
         this.tgt_y = null;
      }
      this.firectrlmode = "MANUAL";
      this.fireworks();
   }
   function firelockon()
   {
      this.rlv = 1.5;
      var _loc2_ = 0;
      while(_loc2_ < 3)
      {
         this.fire_calculate();
         if(this.lockon)
         {
            break;
         }
         _loc2_ = _loc2_ + 1;
      }
      if(this.htime == null)
      {
         this.firectrl = function()
         {
            this.fireauto();
         };
      }
      else
      {
         this.lockon = true;
      }
      this.firectrlmode = "AUTO";
      this.fireworks();
   }
   function loadweapon(num, wpdata, wpid)
   {
      if(this["weapon" + num] != undefined)
      {
         if(this["weapon" + num].wpID == wpid)
         {
            return false;
         }
         for(var _loc4_ in this._parent)
         {
            if(this._parent[_loc4_].mst == this._name && this._parent[_loc4_].wpname == "weapon" + num && this._parent[_loc4_].backmst)
            {
               this._parent[_loc4_].backmst = false;
            }
         }
         this["weapon" + num].removeMovieClip();
      }
      if(wpdata != undefined && wpdata != null)
      {
         if(this["weapon" + num] == undefined)
         {
            this.attachMovie("wp_" + wpdata.ftype,"weapon" + num,this.getNextHighestDepth());
         }
         this["weapon" + num].linkdata(wpdata);
         this["weapon" + num].wpID = wpid;
         this["weapon" + num].wpi = num;
         this["weapon" + num].lockmod = 0;
         if(wpdata.ftype == "lcgd" || wpdata.ftype == "lcdb" || wpdata.ftype == "gj" || wpdata.ftype == "lgj" || wpdata.ftype == "axe" || wpdata.ftype == "hl" || wpdata.ftype == "hphl")
         {
            this["weapon" + num].lockmod = 1;
         }
         else if(wpdata.ftype == "sgj" || wpdata.ftype == "tuji" || wpdata.ftype == "sbeamsEX" || wpdata.ftype == "qishe" || wpdata.ftype == "SsbeamEX" || wpdata.ftype == "sniperbeamEX")
         {
            this["weapon" + num].lockmod = 2;
         }
         else if(wpdata.ftype == "baojia" || wpdata.ftype == "fyEX")
         {
            this["weapon" + num].lockmod = 3;
         }
      }
      return true;
   }
   function unloadweapon(num)
   {
      if(this["weapon" + num] != undefined)
      {
         this["weapon" + num].removeMovieClip();
      }
   }
   function switchweaponT()
   {
      if(this.weaponhold)
      {
         return false;
      }
      if(this.weaponTeam > 0)
      {
         this.weaponF1 = 1;
         this.weaponF2 = 2;
         this.weaponF3 = 3;
         this.weaponF4 = 4;
         this.weaponTeam = 0;
      }
      else
      {
         if(this.weapon5 != undefined)
         {
            this.weaponF1 = 5;
            this.weaponTeam = 1;
         }
         else
         {
            this.weaponF1 = 1;
         }
         if(this.weapon6 != undefined)
         {
            this.weaponF2 = 6;
            this.weaponTeam = 1;
         }
         else
         {
            this.weaponF2 = 2;
         }
         if(this.weapon7 != undefined)
         {
            this.weaponF3 = 7;
            this.weaponTeam = 1;
         }
         else
         {
            this.weaponF3 = 3;
         }
         if(this.weapon8 != undefined)
         {
            this.weaponF4 = 8;
            this.weaponTeam = 1;
         }
         else
         {
            this.weaponF4 = 4;
         }
      }
      return this.selectweaponF(this.weaponFnow);
   }
   function selectweaponF(num)
   {
      if(this.weaponhold)
      {
         return false;
      }
      return this.selectweapon(this["weaponF" + num]);
   }
   function selectweapon(num)
   {
      if(num != this.weaponow && !this.weaponhold)
      {
         if(this["weapon" + num] == undefined)
         {
            var _loc3_ = num % 4;
            if(_loc3_ == 0 && num != 0)
            {
               _loc3_ = 4;
            }
            num = this["weaponF" + _loc3_];
            if(num == this.weaponow)
            {
               return false;
            }
         }
         if(this._SP < 10000 && num % 4 == 0 && this.weaponow % 4 != 0)
         {
            return false;
         }
         if(this["weapon" + num] != undefined)
         {
            this.weaponFnow = num % 4;
            if(this.weaponFnow == 0 && num != 0)
            {
               this.weaponFnow = 4;
            }
            if(num != this["weaponF" + this.weaponFnow])
            {
               if(num > 4)
               {
                  if(this.weapon5 != undefined)
                  {
                     this.weaponF1 = 5;
                     this.weaponTeam = 1;
                  }
                  else
                  {
                     this.weaponF1 = 1;
                  }
                  if(this.weapon6 != undefined)
                  {
                     this.weaponF2 = 6;
                     this.weaponTeam = 1;
                  }
                  else
                  {
                     this.weaponF2 = 2;
                  }
                  if(this.weapon7 != undefined)
                  {
                     this.weaponF3 = 7;
                     this.weaponTeam = 1;
                  }
                  else
                  {
                     this.weaponF3 = 3;
                  }
                  if(this.weapon8 != undefined)
                  {
                     this.weaponF4 = 8;
                     this.weaponTeam = 1;
                  }
                  else
                  {
                     this.weaponF4 = 4;
                  }
               }
               else
               {
                  this.weaponTeam = 0;
                  this.weaponF1 = 1;
                  this.weaponF2 = 2;
                  this.weaponF3 = 3;
                  this.weaponF4 = 4;
               }
            }
            this.firectrl = function()
            {
               this.firemanual();
            };
            this.firectrlmode = "MANUAL";
            this.shotw = this._sW;
            this.shoth = this._sH;
            this.lockon = false;
            this.perfectlock = false;
            this.htime = null;
            this.rlv = 0;
            this.gw = 0;
            this.gh = 0;
            this.gx = 0;
            this.gz = 0;
            this.gy = 0;
            this.grx = 0;
            this.grz = 0;
            this.gry = 0;
            this.trx = 0;
            this.trz = 0;
            this.trd = 0;
            this.rx = 0;
            this.rz = 0;
            this.weaponow = num;
            this.ddspeedlv = this["weapon" + num].ddspeedlv;
            this.dstlv = this["weapon" + num].dstlv;
            this.srlv = this["weapon" + num].srlv * (1 + this.slv / 0.05);
            this.rlv = 0;
            if(this.dst < this.dstlv)
            {
               this.dston = true;
            }
            else
            {
               this.dston = false;
            }
            this.scmrfg = 0;
            if(this._parent[this._name + "_wp"] != undefined)
            {
               this._parent[this._name + "_wp"].removeMovieClip();
            }
            this["weapon" + num].showit();
            if(this["weapon" + num].wpmod != null || this["weapon" + num].lap != this.act_la || this["weapon" + num].rap != this.act_ra || this["weapon" + num].shdp != this.act_shd)
            {
               this.modact(-1,0,0,this["weapon" + num].lap,this["weapon" + num].rap,num,this["weapon" + num].shdp);
            }
            if(this.weaponCD < 3)
            {
               this.weaponCD = 3;
            }
            return true;
         }
         return false;
      }
      return false;
   }
   function doweapon()
   {
      if(this.weaponCD == 0)
      {
         if(this._parent[this.tgt]._type == "ff")
         {
            if(this["weapon" + this.weaponow].fclass == "sboom")
            {
               return false;
            }
            if(this["weapon" + this.weaponow].ftype == "fyzd")
            {
               return false;
            }
            if(this["weapon" + this.weaponow].fclass == "EX")
            {
               return false;
            }
         }
         this["weapon" + this.weaponow].doit();
      }
   }
   function modact(bd, lg, wi, la, ra, wp, shd)
   {
      var _loc3_ = false;
      if(wp == null)
      {
         wp = 0;
      }
      if(shd == null)
      {
         shd = 0;
      }
      if(this["weapon" + this.weaponow].shdp > 0)
      {
         shd = this["weapon" + this.weaponow].shdp;
      }
      if(bd != 0)
      {
         if(this.act_bd != bd)
         {
            _loc3_ = true;
            this.act_bd = Math.abs(bd);
         }
      }
      if(wp > 0)
      {
         if(this["weapon" + wp].wpmod != undefined)
         {
            _loc3_ = true;
            this.act_wp = wp;
         }
      }
      if(this._type == "MS" || this._type == "TMS")
      {
         if(lg > 0)
         {
            if(this.act_lg != lg)
            {
               _loc3_ = true;
               this.act_lg = lg;
            }
         }
         if(wi > 0)
         {
            if(this.act_wi != wi)
            {
               _loc3_ = true;
               this.act_wi = wi;
            }
         }
         if(la > 0)
         {
            if(this.act_la != la)
            {
               _loc3_ = true;
               this.act_la = la;
            }
         }
         if(ra > 0)
         {
            if(this.act_ra != ra)
            {
               _loc3_ = true;
               this.act_ra = ra;
            }
         }
         if(shd > 0)
         {
            if(this.act_shd != shd)
            {
               _loc3_ = true;
               this.act_shd = shd;
            }
         }
         if(_loc3_)
         {
            this.linelist = new Array();
            if(_global[this.BDmod + "_" + this.act_bd] != undefined)
            {
               this.linelist = this.linelist.concat(_global[this.BDmod + "_" + this.act_bd]);
            }
            if(_global[this.LGmod + "_" + this.act_lg] != undefined)
            {
               this.linelist = this.linelist.concat(_global[this.LGmod + "_" + this.act_lg]);
            }
            if(_global[this.LAmod + "_" + this.act_la] != undefined)
            {
               this.linelist = this.linelist.concat(_global[this.LAmod + "_" + this.act_la]);
            }
            if(_global[this.RAmod + "_" + this.act_ra] != undefined)
            {
               this.linelist = this.linelist.concat(_global[this.RAmod + "_" + this.act_ra]);
            }
            if(_global[this.WImod + "_" + this.act_wi] != undefined)
            {
               this.linelist = this.linelist.concat(_global[this.WImod + "_" + this.act_wi]);
            }
            if(_global[this.SHDmod + "_" + this.act_shd] != undefined)
            {
               this.linelist = this.linelist.concat(_global[this.SHDmod + "_" + this.act_shd]);
            }
            if(this["weapon" + this.act_wp].wpmodon)
            {
               this.linelist = this.linelist.concat(this["weapon" + this.act_wp].wpmod);
            }
         }
      }
      else if(_loc3_)
      {
         this.linelist = new Array();
         if(_global[this.MAmod + "_" + this.act_bd] != undefined)
         {
            this.linelist = this.linelist.concat(_global[this.MAmod + "_" + this.act_bd]);
         }
         if(this._type == "HMS" && this["weapon" + this.act_wp].wpmodon)
         {
            this.linelist = this.linelist.concat(this["weapon" + this.act_wp].wpmod);
         }
      }
   }
   function doSHD(dam)
   {
      if(this.shdon >= 0)
      {
         this.modact(0,0,0,0,0,0,2);
         if(this.bofg <= 0 && this.act_shd == 2)
         {
            this.shdon = 10;
            if(this.skill_1 <= 0 || this._HP < 0.5 * this.maxHP)
            {
               this._SHDP -= dam;
               if(this._SHDP < 0)
               {
                  this._SHDP = 0;
                  _global.snd("gppp");
                  this.SHDmod = null;
                  this.shdon = -1;
                  this.modact(0,0,0,0,0,0,1);
               }
            }
            return true;
         }
         return false;
      }
      return false;
   }
   function doIF()
   {
      if(this._parent[this._name + "_fif"] != undefined)
      {
         this.vX = 0;
         this.vY = 0;
         this.vY = 0;
         this.AMBAC = 5;
         this._parent[this._name + "_fif"].bo();
         return true;
      }
      this.vX = 0;
      this.vY = 0;
      this.vY = 0;
      this.AMBAC = 5;
      if(this._parent[this._name + "if"] == undefined)
      {
         _global.snd("if");
         this._parent.attachMovie("i_f",this._name + "if",this._parent.getNextHighestDepth(),{_sX:this._sX,_sY:this._sY,_sZ:this._sZ,mst:this._name,IFsiz:this.IFsiz});
      }
      else
      {
         this._parent[this._name + "if"]._alpha = 50;
      }
   }
   function doHy(t)
   {
      this.hypt = t;
   }
   function setnt()
   {
   }
   function doRelieve()
   {
      if(_global[this.coreUnit] != undefined && this._SP >= 10000)
      {
         if(!this.weaponhold)
         {
            this.baojias = this.baojias + 1;
            this._parent.attachMovie("unit_ms",this._name + "fa" + this.baojias,this._parent.getNextHighestDepth(),{_sX:this._sX,_sY:this._sY,_sZ:this._sZ,_sW:this._sW,_sH:this._sH,_sR:this._sR,_rW:this._rW,_rH:this._rH,_rR:this._rR});
            this._parent[this._name + "fa" + this.baojias].v._sX = 0;
            this._parent[this._name + "fa" + this.baojias].v._sY = 0;
            this._parent[this._name + "fa" + this.baojias].v._sZ = 0;
            this._parent[this._name + "fa" + this.baojias].linelist = this.linelist;
            this._parent[this._name + "fa" + this.baojias]._force = this._force;
            this._parent[this._name + "fa" + this.baojias].mainact = function()
            {
               this._alpha -= 10;
               if(this._alpha <= 20)
               {
                  this._zt = "broken";
               }
               if(this._alpha <= 0)
               {
                  this.removeMovieClip();
               }
            };
            this._parent[this._name + "fa" + this.baojias].onhit = function()
            {
               return false;
            };
            for(var _loc4_ in _global.UnitList)
            {
               if(_global.UnitList[_loc4_]._force != this._force && _global.UnitList[_loc4_].tgt == this._name)
               {
                  _global.UnitList[_loc4_].tgt = this._name + "fa" + this.baojias;
               }
            }
            for(var _loc3_ in this._parent)
            {
               if(this._parent[_loc3_]._type == "ff" && this._parent[_loc3_].tgt == this._name)
               {
                  this._parent[_loc3_].tgt == this._name + "fa" + this.baojias;
               }
            }
            this.linkdata(_global[this.coreUnit]);
            if(this.bofg == 0)
            {
               _global.snd("hjf");
            }
            else
            {
               _global.snd("msdie");
            }
            this.doHy(30);
            this.weaponCD = 30;
            return true;
         }
      }
      return false;
   }
   function onlock(msid)
   {
      if(this._parent[this._name].AI != undefined)
      {
         this._parent[this._name].AI.onlock(msid);
      }
      if(this._name == _root.jiemiam.mst)
      {
         _root.jiemiam.warning.play();
      }
   }
   function fireworks()
   {
      if(this.onkf > 0)
      {
         if(this.firectrlmode != "MANUAL")
         {
            this.firectrl = function()
            {
               this.firemanual();
            };
            this.firectrlmode = "MANUAL";
         }
         this.spadd += 1;
      }
      else
      {
         if(this._parent[this.tgt] == undefined || !this._parent[this.tgt].canlock)
         {
            this.gettgt(this.lasttgt);
         }
         if(this["weapon" + this.weaponow].lockmod == 0)
         {
            var _loc4_ = this.slv * 2000 + 30;
         }
         else
         {
            _loc4_ = 100;
         }
         if(this.tgt_x != null && this.tgt_y != null)
         {
            var _loc3_ = _global.distance(this.ctrl_x,this.ctrl_y,this.tgt_x,this.tgt_y);
            if(_loc3_ < 30 && this.dston && this.covon && this.firectrlmode != "AUTO")
            {
               this.firectrl = function()
               {
                  this.fireauto();
               };
               this.firectrlmode = "AUTO";
            }
            else if(_loc3_ > _loc4_ || !this.dston || !this.covon)
            {
               if(this.firectrlmode != "MANUAL")
               {
                  this.firectrl = function()
                  {
                     this.firemanual();
                  };
                  this.firectrlmode = "MANUAL";
               }
            }
         }
         else if(this.firectrlmode != "MANUAL")
         {
            this.firectrl = function()
            {
               this.firemanual();
            };
            this.firectrlmode = "MANUAL";
         }
         if(this._parent[this.tgt] != undefined)
         {
            if(this.dst < 5000)
            {
               if(this.covon)
               {
                  this.spadd += 1;
               }
               this.spadd += 1;
               this._parent[this.tgt].spadd += 1;
            }
            if(this.firectrlmode == "AUTO")
            {
               this._parent[this.tgt].spadd += 1;
            }
            else if(this.defon == 30)
            {
               this.Danger -= 2;
               if(this.Danger < 0)
               {
                  this.Danger = 0;
               }
            }
         }
         else
         {
            this.Danger -= 5;
            if(this.Danger < 0)
            {
               this.Danger = 0;
            }
         }
      }
   }
   function onhit(dam, msid)
   {
      if(this._parent[msid]._type == "ff")
      {
         if(this.hypt <= 0)
         {
            _global.Battle.BTdata[this._name].behits = _global.Battle.BTdata[this._name].behits + 1;
            var _loc6_ = this._DF;
            if(this.skill_10 > 0 && this._SP >= 10000)
            {
               _loc6_ += Math.floor(0.5 * (1000 - _loc6_));
            }
            if(dam > _loc6_)
            {
               dam = Math.round(dam * (1 - _loc6_ * 0.001) + 0.5 * (dam - _loc6_));
            }
            else
            {
               dam = Math.round(dam * (1 - _loc6_ * 0.001));
            }
            if(this._HP <= dam)
            {
               dam = this._HP;
               if(dam > 0)
               {
                  if(!this.doRelieve())
                  {
                     this.gotohell(true);
                  }
                  else
                  {
                     this._HP += dam;
                  }
               }
            }
            this._HP -= dam;
            _global.Battle.BTdata[this._name].broken = Math.round((1 - this._HP / this.maxHP) * 100);
            this.spadd += dam + Math.round(dam / this.maxHP * 100) * 100;
            if(this._name == _global.Cmr.tgt)
            {
               _root.rocker.gotoAndPlay(2);
            }
            return true;
         }
         if(this._parent[this._name + "hy"] == undefined)
         {
            this._parent.attachMovie("h_yr",this._name + "hy",this._parent.getNextHighestDepth(),{_sX:this._sX,_sY:this._sY,_sZ:this._sZ,mst:this._name,HFsiz:0.5 * this.IFsiz});
         }
         return true;
      }
      if(this._parent[msid].combon == 0)
      {
         this._parent[msid].hits = 1;
      }
      else
      {
         this._parent[msid].hits = this._parent[msid].hits + 1;
      }
      this._parent[msid].combon = 30;
      if(this.hypt <= 0)
      {
         _global.Battle.BTdata[this._name].behits = _global.Battle.BTdata[this._name].behits + 1;
         if(this._parent[msid].spEX <= 0)
         {
            if(random(12000) > this._SP && random(10000) < this._parent[msid]._SP)
            {
               dam = Math.round(dam * 1.5);
               if(msid == _root.jiemiam.mst)
               {
                  _root.jiemiam.tracebox.itrace("会心一击 " + dam + "!!!");
               }
            }
            _global.Battle.BTdata[msid].dam += dam;
            this._parent[msid].Danger += dam;
            _loc6_ = this._DF;
            if(this.skill_10 > 0 && this._SP >= 10000)
            {
               _loc6_ += Math.floor(0.5 * (1000 - _loc6_));
            }
            if(dam > _loc6_)
            {
               dam = Math.round(dam * (1 - _loc6_ * 0.001) + 0.5 * (dam - _loc6_));
            }
            else
            {
               dam = Math.round(dam * (1 - _loc6_ * 0.001));
            }
         }
         else
         {
            _global.Battle.BTdata[msid].dam += dam;
         }
         if(this._HP <= dam)
         {
            dam = this._HP;
            if(dam > 0)
            {
               if(!this.doRelieve())
               {
                  _global.Battle.BTdata[msid].kill += 1;
                  this.gotohell(true);
               }
               else
               {
                  this._HP += dam;
               }
            }
         }
         this._HP -= dam;
         _global.Battle.BTdata[this._name].broken = Math.round((1 - this._HP / this.maxHP) * 100);
         this.spadd += dam + Math.round(dam / this.maxHP * 100) * 100;
         this._parent[msid].spadd += 2 * dam;
         if(this._name == _global.Cmr.tgt)
         {
            _root.rocker.gotoAndPlay(2);
         }
         return true;
      }
      if(this._parent[this._name + "hy"] == undefined)
      {
         this._parent.attachMovie("h_yr",this._name + "hy",this._parent.getNextHighestDepth(),{_sX:this._sX,_sY:this._sY,_sZ:this._sZ,mst:this._name,HFsiz:0.5 * this.IFsiz});
      }
      return true;
   }
   function gotohell(yc)
   {
      _global.Battle.mslost(this._name);
      if(this._parent[this._name].AI != undefined)
      {
         delete this._parent[this._name].AI;
      }
      this._zt = "broken";
      this.weaponCD = 90;
      this.firectrl = null;
      _global.snd("msdie");
      if(yc)
      {
         this.bofg = 90;
      }
      else
      {
         this.bofg = 10;
      }
      this.mainsys = function()
      {
         if(this.Bindtgt != null)
         {
            this.bofg = 90;
         }
         else
         {
            var _loc3_ = 1 - this.v._pt * this.v._pt * this.xG;
            if(_loc3_ < 0.5)
            {
               _loc3_ = 0.5;
            }
            this.vX *= _loc3_;
            this.vY *= _loc3_;
            this.vZ *= _loc3_;
            this.v._pt = _global.dist_3d(0,0,0,this.v._sX,this.v._sY,this.v._sZ);
            if(this.hitbo())
            {
               this._parent.attachMovie("bo_6",this._name + "zbo" + this.zdi,this._parent.getNextHighestDepth(),{_sX:this._sX,_sY:this._sY,_sZ:this._sZ,mst:this._name});
               delete _global.UnitList[this._name];
               this.removeMovieClip();
            }
            else
            {
               this._parent.attachMovie("bo_2",this._name + "zbo" + this.zdi,this._parent.getNextHighestDepth(),{_sX:this._sX + random(11) - 5,_sY:this._sY + random(11) - 5,_sZ:this._sZ + random(11) - 5,mst:this._name});
            }
            this.zdi = this.nxzdi();
         }
         this.setbofg();
         this.setnt();
         this.doBind();
      };
   }
   function hitbo(t)
   {
      if(t == null || t == undefined)
      {
         t = 10;
      }
      if(this.hypt > 0)
      {
         return false;
      }
      if(this.bofg == 0)
      {
         this.bofg = t;
         return true;
      }
      return false;
   }
   function setbofg()
   {
      if(this.bofg > 0)
      {
         this.bofg = this.bofg - 1;
         this.defon = 0;
      }
      if(this.weaponCD > 0)
      {
         this.weaponCD = this.weaponCD - 1;
      }
      if(this.scmrfg > 0)
      {
         this.scmrfg = this.scmrfg - 1;
      }
      else if(this.scmrfg < 0)
      {
         this.scmrfg = this.scmrfg + 1;
      }
      else
      {
         this.scmrtgt = null;
         this.scmrtgtd = 0;
      }
      if(this.fenshenon && this._size != "L" && this._zt == "nor")
      {
         if(this.v._pt > 5)
         {
            if(this._parent[this._name + "fs"] == undefined)
            {
               this._parent.attachMovie("unit_ms",this._name + "fs",this._parent.getNextHighestDepth(),{_sX:this._sX,_sY:this._sY,_sZ:this._sZ,_sW:this._sW,_sH:this._sH,_sR:this._sR,_rW:this._rW,_rH:this._rH,_rR:this._rR});
               this._parent[this._name + "fs"].v._sX = 0;
               this._parent[this._name + "fs"].v._sY = 0;
               this._parent[this._name + "fs"].v._sZ = 0;
               this._parent[this._name + "fs"].linelist = this.linelist;
               this._parent[this._name + "fs"]._force = this._force;
               this._parent[this._name + "fs"].mainact = function()
               {
                  if(this._alpha > 10)
                  {
                     this._alpha -= 15;
                  }
                  else
                  {
                     this._alpha -= 2;
                  }
                  if(this._alpha <= 4)
                  {
                     this._zt = "broken";
                  }
                  if(this._alpha <= 0)
                  {
                     this.removeMovieClip();
                  }
               };
               this._parent[this._name + "fs"].onhit = function()
               {
                  return false;
               };
               for(var _loc3_ in this._parent)
               {
                  if(this._parent[_loc3_]._type == "ff" && this._parent[_loc3_].tgt == this._name)
                  {
                     this._parent[_loc3_].tgt == this._name + "fs";
                  }
               }
               for(var _loc4_ in _global.UnitList)
               {
                  if(_global.UnitList[_loc4_]._force != this._force && _global.UnitList[_loc4_].spEX <= 0 && _global.UnitList[_loc4_].tgt == this._name)
                  {
                     _global.UnitList[_loc4_].tgt = this._name + "fs";
                  }
               }
            }
            else if(this._parent[this._name + "fs"]._alpha <= 10)
            {
               this._parent[this._name + "fs"]._alpha <= 100;
               this._parent[this._name + "fs"]._sX = this._sX;
               this._parent[this._name + "fs"]._sY = this._sY;
               this._parent[this._name + "fs"]._sZ = this._sZ;
               this._parent[this._name + "fs"]._sW = this._sW;
               this._parent[this._name + "fs"]._sH = this._sH;
               this._parent[this._name + "fs"]._sR = this._sR;
               this._parent[this._name + "fs"]._rW = this._rW;
               this._parent[this._name + "fs"]._rH = this._rH;
               this._parent[this._name + "fs"]._rR = this._rR;
               this._parent[this._name + "fs"].v._sX = 0;
               this._parent[this._name + "fs"].v._sY = 0;
               this._parent[this._name + "fs"].v._sZ = 0;
               this._parent[this._name + "fs"].linelist = this.linelist;
               this._parent[this._name + "fs"]._force = this._force;
               for(_loc3_ in this._parent)
               {
                  if(this._parent[_loc3_]._type == "ff" && this._parent[_loc3_].tgt == this._name)
                  {
                     this._parent[_loc3_].tgt == this._name + "fs";
                  }
               }
               for(_loc4_ in _global.UnitList)
               {
                  if(_global.UnitList[_loc4_]._force != this._force && _global.UnitList[_loc4_].spEX <= 0 && _global.UnitList[_loc4_].tgt == this._name)
                  {
                     _global.UnitList[_loc4_].tgt = this._name + "fs";
                  }
               }
            }
         }
      }
      this.fenshenon = false;
   }
   function showSkill()
   {
      this._Skillon = 0;
      if(this.skill_1 > 0)
      {
         this._Skillon = 1;
      }
      if(this.skill_4 > 0)
      {
         this._Skillon = 4;
      }
      if(this.skill_6 > 0)
      {
         this._Skillon = 6;
      }
      if(this.skill_11 > 0)
      {
         this._Skillon = 11;
      }
      if(this._SP >= 7500)
      {
         if(this.skill_2 > 0)
         {
            this._Skillon = 2;
         }
         if(this.skill_7 > 0)
         {
            this._Skillon = 7;
         }
         if(this.skill_12 > 0)
         {
            this._Skillon = 12;
         }
         if(this._SP >= 10000)
         {
            if(this.skill_3 > 0)
            {
               this._Skillon = 3;
            }
            if(this.skill_5 > 0)
            {
               this._Skillon = 5;
            }
            if(this.skill_8 > 0)
            {
               this._Skillon = 8;
            }
            if(this.skill_9 > 0)
            {
               this._Skillon = 9;
            }
            if(this.skill_10 > 0)
            {
               this._Skillon = 10;
            }
         }
      }
   }
}
