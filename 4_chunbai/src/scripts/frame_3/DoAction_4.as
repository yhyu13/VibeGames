function msdbmax()
{
   _root.msmdb = new Array();
   var _loc2_ = 0;
   while(_loc2_ <= _root.maxmdb.length - 1)
   {
      _root.msmdb[_loc2_] = _root.maxmdb[_loc2_];
      _loc2_ = _loc2_ + 1;
   }
   _root.bossmdb = new Array();
}
function msdbint()
{
   _root.msmdb = new Array();
   msmdb[0] = "phix_0";
   _root.msdbdebug();
}
function msdbdebug()
{
   var _loc5_ = new Array();
   _root.bossmdb = new Array();
   var _loc4_ = 0;
   while(_loc4_ <= _root.maxmdb.length - 1)
   {
      var _loc2_ = _root.maxmdb[_loc4_];
      var _loc3_ = 0;
      while(_loc3_ <= _root.msmdb.length - 1)
      {
         if(_root.msmdb[_loc3_] == _loc2_)
         {
            _loc5_.push(_loc2_);
            _loc2_ = null;
         }
         _loc3_ = _loc3_ + 1;
      }
      if(_loc2_ != null)
      {
         _root.bossmdb.push(_loc2_);
      }
      _loc4_ = _loc4_ + 1;
   }
   _root.msmdb = new Array();
   _loc3_ = 0;
   while(_loc3_ <= _loc5_.length - 1)
   {
      _root.msmdb[_loc3_] = _loc5_[_loc3_];
      _loc3_ = _loc3_ + 1;
   }
}
function Srandom(i, n)
{
   if(n == null)
   {
      n = 1;
   }
   var _loc3_ = random(i);
   var _loc1_ = "" + _loc3_;
   while(_loc1_.length < n)
   {
      _loc1_ = "0" + _loc1_;
   }
   dataTmp += _loc1_;
   return _loc3_;
}
function Zrandom(dats, n)
{
   if(n == null)
   {
      n = 1;
   }
   dats = dats.substr(Zindex,n);
   if(dats == "")
   {
      trace("位置：" + Zindex + " 步长：" + n + " 数据：缺失");
      return 0;
   }
   var _loc3_ = Number(dats);
   trace("位置：" + Zindex + " 步长：" + n + " 数据：" + _loc3_);
   Zindex += n;
   return _loc3_;
}
function randomMS(i)
{
   dataTmp = "";
   _global["phix_" + i] = new Object();
   _global["phix_" + i]._protype = "phix_" + i;
   _global["phix_" + i].$NAME = "试作机" + i + "号";
   _global["phix_" + i].$TYPE = "PHIX-" + i;
   _global["phix_" + i]._type = "MS";
   _global["phix_" + i]._size = "M";
   _global["phix_" + i].maxHP = 1000 + 10 * Srandom(351,3);
   _global["phix_" + i].maxEN = 1000 + 10 * Srandom(351,3);
   _global["phix_" + i]._DF = 200 + 10 * Srandom(51,2);
   _global["phix_" + i].speedlv = 35 + Srandom(61,2);
   _global["phix_" + i].subpowlv = 35 + Srandom(61,2);
   _global["phix_" + i].turnlv = 35 + Srandom(61,2);
   _global["phix_" + i].locklv = 35 + Srandom(61,2);
   var _loc5_ = 0;
   var _loc6_ = 0;
   _global["phix_" + i]._defeq = null;
   _global["phix_" + i]._atteq = null;
   _global["phix_" + i].wp1 = "Hvulcan_2";
   _global["phix_" + i].wp2 = "Brifle_2";
   _global["phix_" + i].wp3 = "SBazooka_1";
   _loc5_ = _global["phix_" + i].speedlv % weapon_db4.length;
   _loc6_ = _global["phix_" + i].subpowlv % weapon_db4[_loc5_].length;
   _global["phix_" + i].wp4 = weapon_db4[_loc5_][_loc6_];
   _global["phix_" + i].wp5 = null;
   _global["phix_" + i].wp6 = null;
   _global["phix_" + i].wp7 = "LBsword_0";
   _loc5_ = _global["phix_" + i].turnlv % weapon_db4.length;
   _loc6_ = _global["phix_" + i].locklv % weapon_db4[_loc5_].length;
   _global["phix_" + i].wp8 = weapon_db4[_loc5_][_loc6_];
   if(_global["phix_" + i].wp8 == _global["phix_" + i].wp4)
   {
      _global["phix_" + i].wp8 = null;
   }
   var _loc3_ = new Object();
   var _loc4_ = new Object();
   _loc3_ = load_weapon(Srandom(9) + 1,1);
   if(_loc3_ != null)
   {
      _global["phix_" + i].wp1 = _loc3_.id;
   }
   _loc4_ = load_weapon(Srandom(9) + 1,1);
   if(_loc3_.ci != _loc4_.ci)
   {
      if(_loc4_ != null)
      {
         _global["phix_" + i].wp5 = _loc4_.id;
      }
   }
   _loc3_ = load_weapon(Srandom(9) + 1,2);
   if(_loc3_ != null)
   {
      _global["phix_" + i].wp2 = _loc3_.id;
   }
   _loc4_ = load_weapon(Srandom(9) + 1,2);
   if(_loc3_.ci != _loc4_.ci)
   {
      if(_loc4_ != null)
      {
         _global["phix_" + i].wp6 = _loc4_.id;
      }
   }
   _loc3_ = load_weapon(Srandom(9) + 1,3);
   if(_loc3_ != null)
   {
      _global["phix_" + i].wp3 = _loc3_.id;
   }
   _loc4_ = load_weapon(Srandom(9) + 1,3);
   if(_loc3_.ci != _loc4_.ci)
   {
      if(_loc4_ != null)
      {
         _global["phix_" + i].wp7 = _loc4_.id;
      }
   }
   _global["phix_" + i].BDmod = "mod_bd" + (Srandom(31,2) + 1);
   _global["phix_" + i].LGmod = "mod_lg" + (Srandom(9,2) + 1);
   _global["phix_" + i].LAmod = "mod_la" + (Srandom(22,2) + 1);
   _global["phix_" + i].RAmod = "mod_ra" + (Srandom(22,2) + 1);
   _global["phix_" + i].WImod = "mod_wi" + (Srandom(33,2) + 1);
   _global["phix_" + i].SHDmod = "mod_shd" + (Srandom(14,2) + 1);
   _global["phix_" + i].MAmod = null;
   _global["phix_" + i].mod = new Array();
   if(_global[_global["phix_" + i].BDmod + "_1"] != undefined)
   {
      _global["phix_" + i].mod = _global["phix_" + i].mod.concat(_global[_global["phix_" + i].BDmod + "_1"]);
   }
   if(_global[_global["phix_" + i].LGmod + "_1"] != undefined)
   {
      _global["phix_" + i].mod = _global["phix_" + i].mod.concat(_global[_global["phix_" + i].LGmod + "_1"]);
   }
   if(_global[_global["phix_" + i].LAmod + "_1"] != undefined)
   {
      _global["phix_" + i].mod = _global["phix_" + i].mod.concat(_global[_global["phix_" + i].LAmod + "_1"]);
   }
   if(_global[_global["phix_" + i].RAmod + "_1"] != undefined)
   {
      _global["phix_" + i].mod = _global["phix_" + i].mod.concat(_global[_global["phix_" + i].RAmod + "_1"]);
   }
   if(_global[_global["phix_" + i].WImod + "_1"] != undefined)
   {
      _global["phix_" + i].mod = _global["phix_" + i].mod.concat(_global[_global["phix_" + i].WImod + "_1"]);
   }
   if(_global[_global["phix_" + i].SHDmod + "_1"] != undefined)
   {
      _global["phix_" + i].mod = _global["phix_" + i].mod.concat(_global[_global["phix_" + i].SHDmod + "_1"]);
   }
   _global["phix_" + i].dataStr = ihex(dataTmp);
   _global["phix_" + i].dataStr2 = dataTmp;
   dataTmp = "";
}
function setMS(da, ms)
{
   Zindex = 0;
   var _loc3_ = ohex(da);
   if(_loc3_.length == 0)
   {
      return false;
   }
   var _loc4_ = 0;
   while(_loc4_ <= _loc3_.length - 1)
   {
      if(isNaN(Number(_loc3_.charAt(_loc4_))))
      {
         trace("=======================================");
         trace(_loc3_.charAt(_loc4_));
         trace("=======================================");
         return false;
      }
      _loc4_ = _loc4_ + 1;
   }
   if(ms.$NAME.charAt(ms.$NAME.length - 1) != "改")
   {
      ms.$NAME += "·改";
   }
   ms.$NAME = oID(da) + "专用机";
   if(ms.$TYPE.charAt(ms.$TYPE.length - 1) != "R")
   {
      ms.$TYPE += ".R";
   }
   ms._type = "MS";
   ms._size = "M";
   ms.maxHP = 1000 + 10 * Zrandom(_loc3_,3);
   ms.maxEN = 1000 + 10 * Zrandom(_loc3_,3);
   ms._DF = 200 + 10 * Zrandom(_loc3_,2);
   ms.speedlv = 35 + Zrandom(_loc3_,2);
   ms.subpowlv = 35 + Zrandom(_loc3_,2);
   ms.turnlv = 35 + Zrandom(_loc3_,2);
   ms.locklv = 35 + Zrandom(_loc3_,2);
   ms._defeq = null;
   ms._atteq = null;
   var _loc7_ = 0;
   var _loc8_ = 0;
   ms.wp1 = "Hvulcan_2";
   ms.wp2 = "Brifle_2";
   ms.wp3 = "SBazooka_1";
   _loc7_ = ms.speedlv % weapon_db4.length;
   _loc8_ = ms.subpowlv % weapon_db4[_loc7_].length;
   ms.wp4 = weapon_db4[_loc7_][_loc8_];
   ms.wp5 = null;
   ms.wp6 = null;
   ms.wp7 = "LBsword_0";
   _loc7_ = ms.turnlv % weapon_db4.length;
   _loc8_ = ms.locklv % weapon_db4[_loc7_].length;
   ms.wp8 = weapon_db4[_loc7_][_loc8_];
   if(ms.wp8 == ms.wp4)
   {
      ms.wp8 = null;
   }
   var _loc5_ = new Object();
   var _loc6_ = new Object();
   _loc5_ = set_weapon(Zrandom(_loc3_) + 1,1,_loc3_);
   if(_loc5_ != null)
   {
      ms.wp1 = _loc5_.id;
   }
   _loc6_ = set_weapon(Zrandom(_loc3_) + 1,1,_loc3_);
   if(_loc5_.ci != _loc6_.ci)
   {
      if(_loc6_ != null)
      {
         ms.wp5 = _loc6_.id;
      }
   }
   _loc5_ = set_weapon(Zrandom(_loc3_) + 1,2,_loc3_);
   if(_loc5_ != null)
   {
      ms.wp2 = _loc5_.id;
   }
   _loc6_ = set_weapon(Zrandom(_loc3_) + 1,2,_loc3_);
   if(_loc5_.ci != _loc6_.ci)
   {
      if(_loc6_ != null)
      {
         ms.wp6 = _loc6_.id;
      }
   }
   _loc5_ = set_weapon(Zrandom(_loc3_) + 1,3,_loc3_);
   if(_loc5_ != null)
   {
      ms.wp3 = _loc5_.id;
   }
   _loc6_ = set_weapon(Zrandom(_loc3_) + 1,3,_loc3_);
   if(_loc5_.ci != _loc6_.ci)
   {
      if(_loc6_ != null)
      {
         ms.wp7 = _loc6_.id;
      }
   }
   ms.BDmod = "mod_bd" + (Zrandom(_loc3_,2) + 1);
   ms.LGmod = "mod_lg" + (Zrandom(_loc3_,2) + 1);
   ms.LAmod = "mod_la" + (Zrandom(_loc3_,2) + 1);
   ms.RAmod = "mod_ra" + (Zrandom(_loc3_,2) + 1);
   ms.WImod = "mod_wi" + (Zrandom(_loc3_,2) + 1);
   ms.SHDmod = "mod_shd" + (Zrandom(_loc3_,2) + 1);
   ms.MAmod = null;
   ms.mod = new Array();
   if(_global[ms.BDmod + "_1"] != undefined)
   {
      ms.mod = ms.mod.concat(_global[ms.BDmod + "_1"]);
   }
   if(_global[ms.LGmod + "_1"] != undefined)
   {
      ms.mod = ms.mod.concat(_global[ms.LGmod + "_1"]);
   }
   if(_global[ms.LAmod + "_1"] != undefined)
   {
      ms.mod = ms.mod.concat(_global[ms.LAmod + "_1"]);
   }
   if(_global[ms.RAmod + "_1"] != undefined)
   {
      ms.mod = ms.mod.concat(_global[ms.RAmod + "_1"]);
   }
   if(_global[ms.WImod + "_1"] != undefined)
   {
      ms.mod = ms.mod.concat(_global[ms.WImod + "_1"]);
   }
   if(_global[ms.SHDmod + "_1"] != undefined)
   {
      ms.mod = ms.mod.concat(_global[ms.SHDmod + "_1"]);
   }
   ms.dataStr = da;
   _global.MSdata = _global.phix_0.dataStr;
   return true;
}
function ihex(txt)
{
   var _loc2_ = 0;
   while(_loc2_ < 10)
   {
      var _loc3_ = "" + random(1000);
      while(_loc3_.length < 3)
      {
         _loc3_ = "0" + _loc3_;
      }
      var _loc6_ = _loc3_ + _global.Player.ID;
      if(_global.Player.ID != null && _global.Player.ID != "")
      {
         _loc6_ = _loc3_ + _global.Player.ID;
      }
      else
      {
         _loc6_ = _loc3_ + "Phixcat";
      }
      var _loc4_ = 200;
      var _loc5_ = "";
      _loc2_ = 0;
      while(_loc2_ <= Math.floor(txt.length / _loc4_))
      {
         _loc5_ += printHex(des(_loc6_,txt.substring(_loc2_ * _loc4_,_loc2_ * _loc4_ + _loc4_),1));
         _loc2_ = _loc2_ + 1;
      }
      _loc5_ = _loc6_ + "·" + _loc5_;
      if(txt == ohex(_loc5_))
      {
         return _loc5_;
      }
      _loc2_ = _loc2_ + 1;
   }
   return "节操掉了！";
}
function ohex(txt)
{
   var _loc5_ = txt.split("·");
   var _loc4_ = _loc5_[0];
   var _loc2_ = _loc5_[1].split("0x");
   var _loc3_ = "";
   var _loc1_ = 1;
   while(_loc1_ <= _loc2_.length - 1)
   {
      _loc3_ += des(_loc4_,unHex("0x" + _loc2_[_loc1_]),0);
      _loc1_ = _loc1_ + 1;
   }
   return _loc3_;
}
function oID(txt)
{
   var _loc3_ = txt.split("·");
   var _loc1_ = _loc3_[0];
   var _loc2_ = _loc1_.substring(3);
   return _loc2_;
}
_global.mod_Sbd1_1 = new Array();
mod_Sbd1_1[0] = {nam:"BDline0",p1x:0,p1y:0,p1z:0.3,p2x:0,p2y:-8.25,p2z:3.75,_siz:2.25,_sizz:0.1};
mod_Sbd1_1[1] = {nam:"BDline1",p1x:0,p1y:-0.45,p1z:1.2,p2x:0,p2y:-5.25,p2z:4.2,_siz:0.75,_sizz:0.1};
mod_Sbd1_1[2] = {nam:"BDline2",p1x:0,p1y:-3,p1z:-1.5,p2x:0,p2y:-6,p2z:-7.5,_siz:6,_sizz:0.1};
mod_Sbd1_1[3] = {nam:"BDline3",p1x:0,p1y:-1.5,p1z:-3.75,p2x:0,p2y:7.5,p2z:-8.25,_siz:4.5,_sizz:0.5};
mod_Sbd1_1[4] = {nam:"BDline4",p1x:0,p1y:5.25,p1z:-2.25,p2x:3,p2y:-3,p2z:-0.75,_siz:0.3,_sizz:15};
mod_Sbd1_1[5] = {nam:"BDline5",p1x:0,p1y:5.25,p1z:-2.25,p2x:-3,p2y:-3,p2z:-0.75,_siz:0.3,_sizz:15};
mod_Sbd1_1[6] = {nam:"BDline6",p1x:3,p1y:-5.25,p1z:-4.5,p2x:0.3,p2y:-17.25,p2z:-8,_siz:6,_sizz:0.2};
mod_Sbd1_1[7] = {nam:"BDline7",p1x:-3,p1y:-5.25,p1z:-4.5,p2x:-0.3,p2y:-17.25,p2z:-8,_siz:6,_sizz:0.2};
_global.mod_Sbd1_2 = new Array();
mod_Sbd1_2[0] = {nam:"BDline0",p1x:0,p1y:0,p1z:0.3,p2x:0,p2y:-8.25,p2z:3.75,_siz:2.25,_sizz:0.1};
mod_Sbd1_2[1] = {nam:"BDline1",p1x:0,p1y:-0.45,p1z:1.2,p2x:0,p2y:-5.25,p2z:4.2,_siz:0.75,_sizz:0.1};
mod_Sbd1_2[2] = {nam:"BDline2",p1x:0,p1y:-3,p1z:-1.5,p2x:0,p2y:-6,p2z:-7.5,_siz:6,_sizz:0.1};
mod_Sbd1_2[3] = {nam:"BDline3",p1x:0,p1y:-1.5,p1z:-3.75,p2x:0,p2y:7.5,p2z:-8.25,_siz:4.5,_sizz:0.5};
mod_Sbd1_2[4] = {nam:"BDline4",p1x:0,p1y:5.25,p1z:-2.25,p2x:3,p2y:-3,p2z:-0.75,_siz:0.3,_sizz:15};
mod_Sbd1_2[5] = {nam:"BDline5",p1x:0,p1y:5.25,p1z:-2.25,p2x:-3,p2y:-3,p2z:-0.75,_siz:0.3,_sizz:15};
mod_Sbd1_2[6] = {nam:"BDline6",p1x:3,p1y:-5.25,p1z:-4.5,p2x:0.3,p2y:-17.25,p2z:-8,_siz:6,_sizz:0.2};
mod_Sbd1_2[7] = {nam:"BDline7",p1x:-3,p1y:-5.25,p1z:-4.5,p2x:-0.3,p2y:-17.25,p2z:-8,_siz:6,_sizz:0.2};
_global.mod_Sbd2_1 = new Array();
mod_Sbd2_1[0] = {nam:"BDline0",p1x:0,p1y:-0.2,p1z:3,p2x:0,p2y:-0.5,p2z:3.2,_siz:1.5,_sizz:1};
mod_Sbd2_1[1] = {nam:"BDline1",p1x:0,p1y:-1,p1z:1,p2x:0,p2y:-1,p2z:-1,_siz:3.5,_sizz:0.2};
mod_Sbd2_1[2] = {nam:"BDline2",p1x:0,p1y:0,p1z:1,p2x:0,p2y:-0.5,p2z:-2,_siz:3,_sizz:1.8};
mod_Sbd2_1[3] = {nam:"BDline3",p1x:1,p1y:0.5,p1z:1,p2x:1.5,p2y:-1,p2z:1.5,_siz:4,_sizz:1};
mod_Sbd2_1[4] = {nam:"BDline4",p1x:-1,p1y:0.5,p1z:1,p2x:-1.5,p2y:-1,p2z:1.5,_siz:4,_sizz:1};
mod_Sbd2_1[5] = {nam:"BDline5",p1x:0,p1y:0,p1z:2.5,p2x:0,p2y:0.3,p2z:6.5,_siz:1,_sizz:0.1};
mod_Sbd2_1[6] = {nam:"BDline6",p1x:0,p1y:-0.5,p1z:-2,p2x:0,p2y:-6,p2z:-4,_siz:5.4,_sizz:0.01};
_global.mod_Sbd2_2 = new Array();
mod_Sbd2_2[0] = {nam:"BDline0",p1x:0,p1y:1,p1z:1.7,p2x:0,p2y:1.5,p2z:2,_siz:1.5,_sizz:1};
mod_Sbd2_2[1] = {nam:"BDline1",p1x:0,p1y:-0.5,p1z:1.5,p2x:0,p2y:-4.5,p2z:1,_siz:3.5,_sizz:0.2};
mod_Sbd2_2[2] = {nam:"BDline2",p1x:0,p1y:0,p1z:0.5,p2x:0,p2y:-4,p2z:0,_siz:3,_sizz:1.8};
mod_Sbd2_2[3] = {nam:"BDline3",p1x:1,p1y:0,p1z:0,p2x:1.5,p2y:0,p2z:2,_siz:4,_sizz:1};
mod_Sbd2_2[4] = {nam:"BDline4",p1x:-1,p1y:0,p1z:0,p2x:-1.5,p2y:0,p2z:2,_siz:4,_sizz:1};
mod_Sbd2_2[5] = {nam:"BDline5",p1x:0,p1y:1.5,p1z:1.5,p2x:0,p2y:5.5,p2z:2,_siz:1,_sizz:0.1};
mod_Sbd2_2[6] = {nam:"BDline6",p1x:0,p1y:-4,p1z:0,p2x:0,p2y:-8,p2z:4,_siz:5.4,_sizz:0.01};
_global.mod_bd1_1 = new Array();
mod_bd1_1[0] = {nam:"BDline0",p1x:0,p1y:0,p1z:2,p2x:0,p2y:0,p2z:2.5,_siz:1.5,_sizz:1};
mod_bd1_1[1] = {nam:"BDline1",p1x:0,p1y:0.5,p1z:2.5,p2x:0.8,p2y:0.5,p2z:3.6,_siz:0.5,_sizz:0.1};
mod_bd1_1[2] = {nam:"BDline2",p1x:0,p1y:0.5,p1z:2.5,p2x:-0.8,p2y:0.5,p2z:3.6,_siz:0.5,_sizz:0.1};
mod_bd1_1[3] = {nam:"BDline3",p1x:0,p1y:0,p1z:1,p2x:0,p2y:-0.5,p2z:-2,_siz:3,_sizz:0.7};
mod_bd1_1[4] = {nam:"BDline4",p1x:1.2,p1y:-0.5,p1z:-2,p2x:-1.2,p2y:-0.5,p2z:-2,_siz:2,_sizz:1};
mod_bd1_1[5] = {nam:"BDline5",p1x:1,p1y:0,p1z:1.2,p2x:-1,p2y:0,p2z:1.2,_siz:2.5,_sizz:1};
mod_bd1_1[6] = {nam:"BDline6",p1x:1,p1y:-1.2,p1z:1.2,p2x:0.8,p2y:-0.5,p2z:-1,_siz:2.5,_sizz:1};
mod_bd1_1[7] = {nam:"BDline7",p1x:-1,p1y:-1.2,p1z:1.2,p2x:-0.8,p2y:-0.5,p2z:-1,_siz:2.5,_sizz:1};
_global.mod_bd1_2 = new Array();
mod_bd1_2[0] = {nam:"BDline0",p1x:0,p1y:1.3,p1z:1.5,p2x:0,p2y:1.3,p2z:2.2,_siz:1.5,_sizz:1};
mod_bd1_2[1] = {nam:"BDline1",p1x:0,p1y:1.8,p1z:2,p2x:0.8,p2y:1.8,p2z:3.2,_siz:0.5,_sizz:0.1};
mod_bd1_2[2] = {nam:"BDline2",p1x:0,p1y:1.8,p1z:2,p2x:-0.8,p2y:1.8,p2z:3.2,_siz:0.5,_sizz:0.1};
mod_bd1_2[3] = {nam:"BDline3",p1x:0,p1y:0.5,p1z:1,p2x:0,p2y:-4,p2z:-0.5,_siz:3,_sizz:0.7};
mod_bd1_2[4] = {nam:"BDline4",p1x:1.2,p1y:-4,p1z:-0.5,p2x:-1.2,p2y:-4,p2z:-0.5,_siz:2,_sizz:1};
mod_bd1_2[5] = {nam:"BDline5",p1x:1,p1y:0.5,p1z:0.5,p2x:-1,p2y:0.5,p2z:0.5,_siz:2.5,_sizz:1};
mod_bd1_2[6] = {nam:"BDline6",p1x:1,p1y:-0.2,p1z:1.9,p2x:0.8,p2y:-3,p2z:0.5,_siz:2.5,_sizz:1};
mod_bd1_2[7] = {nam:"BDline7",p1x:-1,p1y:-0.2,p1z:1.9,p2x:-0.8,p2y:-3,p2z:0.5,_siz:2.5,_sizz:1};
_global.mod_bd2_1 = new Array();
mod_bd2_1[0] = {nam:"BDline0",p1x:0,p1y:-0.5,p1z:2,p2x:0,p2y:-0.5,p2z:2.5,_siz:1.5,_sizz:1};
mod_bd2_1[1] = {nam:"BDline1",p1x:0,p1y:0,p1z:2.5,p2x:0.8,p2y:0,p2z:3.2,_siz:0.5,_sizz:0.1};
mod_bd2_1[2] = {nam:"BDline2",p1x:0,p1y:0,p1z:2.5,p2x:-0.8,p2y:0,p2z:3.2,_siz:0.5,_sizz:0.1};
mod_bd2_1[3] = {nam:"BDline3",p1x:0,p1y:0,p1z:1,p2x:0,p2y:-0.5,p2z:-2,_siz:3,_sizz:0.7};
mod_bd2_1[4] = {nam:"BDline4",p1x:1,p1y:-0.5,p1z:-2,p2x:-1,p2y:-0.5,p2z:-2,_siz:3,_sizz:1};
mod_bd2_1[5] = {nam:"BDline5",p1x:1,p1y:0,p1z:1.2,p2x:-1,p2y:0,p2z:1.2,_siz:2.5,_sizz:1};
mod_bd2_1[6] = {nam:"BDline6",p1x:1,p1y:-1.5,p1z:1.5,p2x:1,p2y:-1,p2z:-1,_siz:2.5,_sizz:1};
mod_bd2_1[7] = {nam:"BDline7",p1x:-1,p1y:-1.5,p1z:1.5,p2x:-1,p2y:-1,p2z:-1,_siz:2.5,_sizz:1};
_global.mod_bd2_2 = new Array();
mod_bd2_2[0] = {nam:"BDline0",p1x:0,p1y:1.3,p1z:1.5,p2x:0,p2y:1.3,p2z:2.2,_siz:1.5,_sizz:1};
mod_bd2_2[1] = {nam:"BDline1",p1x:0,p1y:1.8,p1z:2,p2x:0.8,p2y:1.8,p2z:2.7,_siz:0.5,_sizz:0.1};
mod_bd2_2[2] = {nam:"BDline2",p1x:0,p1y:1.8,p1z:2,p2x:-0.8,p2y:1.8,p2z:2.7,_siz:0.5,_sizz:0.1};
mod_bd2_2[3] = {nam:"BDline3",p1x:0,p1y:0.5,p1z:1,p2x:0,p2y:-4,p2z:-0.5,_siz:3,_sizz:0.7};
mod_bd2_2[4] = {nam:"BDline4",p1x:1.2,p1y:-4,p1z:-0.5,p2x:-1.2,p2y:-4,p2z:-0.5,_siz:3,_sizz:1};
mod_bd2_2[5] = {nam:"BDline5",p1x:1,p1y:0.5,p1z:0.5,p2x:-1,p2y:0.5,p2z:0.5,_siz:2.5,_sizz:1};
mod_bd2_2[6] = {nam:"BDline6",p1x:1,p1y:-0.2,p1z:1.9,p2x:1,p2y:-3.5,p2z:0.5,_siz:2.5,_sizz:1};
mod_bd2_2[7] = {nam:"BDline7",p1x:-1,p1y:-0.2,p1z:1.9,p2x:-1,p2y:-3.5,p2z:0.5,_siz:2.5,_sizz:1};
_global.mod_bd3_1 = new Array();
mod_bd3_1[0] = {nam:"BDline0",p1x:0,p1y:0,p1z:2,p2x:0,p2y:-0.5,p2z:2.5,_siz:1.5,_sizz:1};
mod_bd3_1[1] = {nam:"BDline1",p1x:-0.2,p1y:0,p1z:2,p2x:-1,p2y:-1.5,p2z:4.5,_siz:0.5,_sizz:0.1};
mod_bd3_1[2] = {nam:"BDline2",p1x:0,p1y:-2,p1z:1,p2x:0,p2y:-4,p2z:-3,_siz:4,_sizz:0.1};
mod_bd3_1[3] = {nam:"BDline3",p1x:0,p1y:0,p1z:1,p2x:0,p2y:-0.5,p2z:-2,_siz:3,_sizz:0.7};
mod_bd3_1[4] = {nam:"BDline4",p1x:1,p1y:0.5,p1z:0.5,p2x:2,p2y:-2,p2z:2,_siz:1,_sizz:3};
mod_bd3_1[5] = {nam:"BDline5",p1x:-1,p1y:0.5,p1z:0.5,p2x:-2,p2y:-2,p2z:2,_siz:1,_sizz:3};
_global.mod_bd3_2 = new Array();
mod_bd3_2[0] = {nam:"BDline0",p1x:0,p1y:2,p1z:1.5,p2x:0,p2y:1.5,p2z:2,_siz:1.5,_sizz:1};
mod_bd3_2[1] = {nam:"BDline1",p1x:-0.2,p1y:1.5,p1z:1.5,p2x:-1,p2y:1.5,p2z:4.5,_siz:0.5,_sizz:0.1};
mod_bd3_2[2] = {nam:"BDline2",p1x:0,p1y:0,p1z:2,p2x:0,p2y:-5,p2z:1,_siz:4,_sizz:0.1};
mod_bd3_2[3] = {nam:"BDline3",p1x:0,p1y:1,p1z:1,p2x:0,p2y:-4.5,p2z:-0.5,_siz:3,_sizz:0.7};
mod_bd3_2[4] = {nam:"BDline4",p1x:1,p1y:1,p1z:0.5,p2x:2,p2y:-0.5,p2z:3,_siz:1,_sizz:3};
mod_bd3_2[5] = {nam:"BDline5",p1x:-1,p1y:1,p1z:0.5,p2x:-2,p2y:-0.5,p2z:3,_siz:1,_sizz:3};
_global.mod_bd4_1 = new Array();
mod_bd4_1[0] = {nam:"BDline0",p1x:0,p1y:0,p1z:2,p2x:0,p2y:-0.5,p2z:2.5,_siz:1.5,_sizz:1};
mod_bd4_1[1] = {nam:"BDline1",p1x:0,p1y:0.5,p1z:2.5,p2x:0,p2y:-1.5,p2z:4.5,_siz:0.5,_sizz:0.1};
mod_bd4_1[2] = {nam:"BDline2",p1x:0,p1y:-2,p1z:1,p2x:0,p2y:-4,p2z:-3,_siz:4,_sizz:0.1};
mod_bd4_1[3] = {nam:"BDline3",p1x:0,p1y:0,p1z:1,p2x:0,p2y:-0.5,p2z:-2,_siz:3,_sizz:0.7};
mod_bd4_1[4] = {nam:"BDline4",p1x:1,p1y:0.5,p1z:0.5,p2x:2,p2y:-2,p2z:2,_siz:1,_sizz:3};
mod_bd4_1[5] = {nam:"BDline5",p1x:-1,p1y:0.5,p1z:0.5,p2x:-2,p2y:-2,p2z:2,_siz:1,_sizz:3};
mod_bd4_1[6] = {nam:"BDline6",p1x:2,p1y:-4,p1z:1.2,p2x:-2,p2y:-4,p2z:1.2,_siz:4,_sizz:1};
_global.mod_bd4_2 = new Array();
mod_bd4_2[0] = {nam:"BDline0",p1x:0,p1y:2,p1z:1.5,p2x:0,p2y:1.5,p2z:2,_siz:1.5,_sizz:1};
mod_bd4_2[1] = {nam:"BDline1",p1x:0,p1y:1.5,p1z:1.5,p2x:0,p2y:1.5,p2z:4.5,_siz:0.5,_sizz:0.1};
mod_bd4_2[2] = {nam:"BDline2",p1x:0,p1y:0,p1z:2,p2x:0,p2y:-5,p2z:1,_siz:4,_sizz:0.1};
mod_bd4_2[3] = {nam:"BDline3",p1x:0,p1y:1,p1z:1,p2x:0,p2y:-4.5,p2z:-0.5,_siz:3,_sizz:0.7};
mod_bd4_2[4] = {nam:"BDline4",p1x:1,p1y:1,p1z:0.5,p2x:2,p2y:-0.5,p2z:3,_siz:1,_sizz:3};
mod_bd4_2[5] = {nam:"BDline5",p1x:-1,p1y:1,p1z:0.5,p2x:-2,p2y:-0.5,p2z:3,_siz:1,_sizz:3};
mod_bd4_2[6] = {nam:"BDline6",p1x:2,p1y:-2,p1z:2.2,p2x:-2,p2y:-2,p2z:2.2,_siz:4,_sizz:1};
_global.mod_bd5_1 = new Array();
mod_bd5_1[0] = {nam:"BDline0",p1x:0,p1y:0,p1z:2.4,p2x:0,p2y:-4.5,p2z:3.5,_siz:1.5,_sizz:0.2};
mod_bd5_1[1] = {nam:"BDline1",p1x:0,p1y:-1.5,p1z:1,p2x:0,p2y:-1.5,p2z:-3,_siz:4,_sizz:0.1};
mod_bd5_1[2] = {nam:"BDline2",p1x:0,p1y:0,p1z:1,p2x:0,p2y:-0.5,p2z:-2,_siz:3,_sizz:1};
mod_bd5_1[3] = {nam:"BDline3",p1x:1,p1y:0.2,p1z:0.5,p2x:1.5,p2y:-1,p2z:1.5,_siz:2,_sizz:1};
mod_bd5_1[4] = {nam:"BDline4",p1x:-1,p1y:0.2,p1z:0.5,p2x:-1.5,p2y:-1,p2z:1.5,_siz:2,_sizz:1};
mod_bd5_1[5] = {nam:"BDline5",p1x:1.5,p1y:-2,p1z:-2,p2x:0,p2y:-3,p2z:-6,_siz:3,_sizz:0.2};
mod_bd5_1[6] = {nam:"BDline6",p1x:-1.5,p1y:-2,p1z:-2,p2x:0,p2y:-3,p2z:-6,_siz:3,_sizz:0.2};
_global.mod_bd5_2 = new Array();
mod_bd5_2[0] = {nam:"BDline0",p1x:0,p1y:2,p1z:1.5,p2x:0,p2y:-1,p2z:5,_siz:1.5,_sizz:0.2};
mod_bd5_2[1] = {nam:"BDline1",p1x:0,p1y:0,p1z:1.5,p2x:0,p2y:-4.5,p2z:1,_siz:4,_sizz:0.1};
mod_bd5_2[2] = {nam:"BDline2",p1x:0,p1y:1,p1z:0.7,p2x:0,p2y:-4,p2z:-0.3,_siz:3,_sizz:1};
mod_bd5_2[3] = {nam:"BDline3",p1x:1,p1y:0.5,p1z:1,p2x:1.5,p2y:0.5,p2z:2,_siz:2,_sizz:1};
mod_bd5_2[4] = {nam:"BDline4",p1x:-1,p1y:0.5,p1z:1,p2x:-1.5,p2y:0.5,p2z:2,_siz:2,_sizz:1};
mod_bd5_2[5] = {nam:"BDline5",p1x:1.5,p1y:-3.7,p1z:0.5,p2x:0,p2y:-8.5,p2z:1,_siz:3,_sizz:0.2};
mod_bd5_2[6] = {nam:"BDline6",p1x:-1.5,p1y:-3.7,p1z:0.5,p2x:0,p2y:-8.5,p2z:1,_siz:3,_sizz:0.2};
_global.mod_bd6_1 = new Array();
mod_bd6_1[0] = {nam:"BDline0",p1x:0,p1y:0,p1z:2.5,p2x:0,p2y:-0.5,p2z:2.7,_siz:1.5,_sizz:1};
mod_bd6_1[1] = {nam:"BDline1",p1x:0,p1y:-1.5,p1z:1,p2x:0,p2y:-1.5,p2z:-3,_siz:4,_sizz:0.1};
mod_bd6_1[2] = {nam:"BDline2",p1x:0,p1y:0,p1z:1,p2x:0,p2y:-0.5,p2z:-2,_siz:3,_sizz:1};
mod_bd6_1[3] = {nam:"BDline3",p1x:1,p1y:0.2,p1z:0.5,p2x:1.5,p2y:-1,p2z:1.5,_siz:2,_sizz:1};
mod_bd6_1[4] = {nam:"BDline4",p1x:-1,p1y:0.2,p1z:0.5,p2x:-1.5,p2y:-1,p2z:1.5,_siz:2,_sizz:1};
_global.mod_bd6_2 = new Array();
mod_bd6_2[0] = {nam:"BDline0",p1x:0,p1y:1.5,p1z:1.5,p2x:0,p2y:1.5,p2z:2,_siz:1.5,_sizz:1};
mod_bd6_2[1] = {nam:"BDline1",p1x:0,p1y:-0.5,p1z:1.5,p2x:0,p2y:-4.5,p2z:1,_siz:4,_sizz:0.1};
mod_bd6_2[2] = {nam:"BDline2",p1x:0,p1y:0.25,p1z:1,p2x:0,p2y:-4,p2z:-0.3,_siz:3,_sizz:1};
mod_bd6_2[3] = {nam:"BDline3",p1x:1,p1y:0,p1z:1,p2x:1.5,p2y:0,p2z:2,_siz:2,_sizz:1};
mod_bd6_2[4] = {nam:"BDline4",p1x:-1,p1y:0,p1z:1,p2x:-1.5,p2y:0,p2z:2,_siz:2,_sizz:1};
_global.mod_bd7_1 = new Array();
mod_bd7_1[0] = {nam:"BDline0",p1x:0,p1y:-0.5,p1z:2,p2x:0,p2y:-0.5,p2z:2.5,_siz:1.5,_sizz:1};
mod_bd7_1[1] = {nam:"BDline1",p1x:0.3,p1y:-1,p1z:0.5,p2x:0,p2y:-0.5,p2z:-2,_siz:3.5,_sizz:0.5};
mod_bd7_1[2] = {nam:"BDline2",p1x:-0.3,p1y:-1,p1z:0.5,p2x:0,p2y:-0.5,p2z:-2,_siz:3.5,_sizz:0.5};
mod_bd7_1[3] = {nam:"BDline3",p1x:1,p1y:0.2,p1z:0.5,p2x:2,p2y:-1.2,p2z:1,_siz:2,_sizz:1.3};
mod_bd7_1[4] = {nam:"BDline4",p1x:-1,p1y:0.2,p1z:0.5,p2x:-2,p2y:-1.2,p2z:1,_siz:2,_sizz:1.3};
mod_bd7_1[5] = {nam:"BDline5",p1x:0.5,p1y:0,p1z:2.5,p2x:1.5,p2y:-0.5,p2z:3,_siz:0.5,_sizz:0.1};
mod_bd7_1[6] = {nam:"BDline6",p1x:-0.5,p1y:0,p1z:2.5,p2x:-1.5,p2y:-0.5,p2z:3,_siz:0.5,_sizz:0.1};
mod_bd7_1[7] = {nam:"BDline7",p1x:0.2,p1y:0.25,p1z:2.5,p2x:1.5,p2y:-0.25,p2z:4,_siz:0.5,_sizz:0.1};
mod_bd7_1[8] = {nam:"BDline8",p1x:-0.2,p1y:0.25,p1z:2.5,p2x:-1.5,p2y:-0.25,p2z:4,_siz:0.5,_sizz:0.1};
_global.mod_bd7_2 = new Array();
mod_bd7_2[0] = {nam:"BDline0",p1x:0,p1y:1,p1z:1.2,p2x:0,p2y:1.2,p2z:1.5,_siz:1.5,_sizz:1};
mod_bd7_2[1] = {nam:"BDline1",p1x:0.3,p1y:-0.5,p1z:1,p2x:0,p2y:-4.5,p2z:-0.5,_siz:3.5,_sizz:0.5};
mod_bd7_2[2] = {nam:"BDline2",p1x:-0.3,p1y:-0.5,p1z:1,p2x:0,p2y:-4.5,p2z:-0.5,_siz:3.5,_sizz:0.5};
mod_bd7_2[3] = {nam:"BDline3",p1x:1,p1y:-1,p1z:0,p2x:2,p2y:-1.5,p2z:1.5,_siz:2,_sizz:1.3};
mod_bd7_2[4] = {nam:"BDline4",p1x:-1,p1y:-1,p1z:0,p2x:-2,p2y:-1.5,p2z:1.5,_siz:2,_sizz:1.3};
mod_bd7_2[5] = {nam:"BDline5",p1x:0.5,p1y:1.5,p1z:1,p2x:1.5,p2y:1.5,p2z:1.5,_siz:0.5,_sizz:0.1};
mod_bd7_2[6] = {nam:"BDline6",p1x:-0.5,p1y:1.5,p1z:1,p2x:-1.5,p2y:1.5,p2z:1.5,_siz:0.5,_sizz:0.1};
mod_bd7_2[7] = {nam:"BDline7",p1x:0.2,p1y:1.75,p1z:1,p2x:1.5,p2y:1.75,p2z:2.5,_siz:0.5,_sizz:0.1};
mod_bd7_2[8] = {nam:"BDline8",p1x:-0.2,p1y:1.75,p1z:1,p2x:-1.5,p2y:1.75,p2z:2.5,_siz:0.5,_sizz:0.1};
_global.mod_bd8_1 = new Array();
mod_bd8_1[0] = {nam:"BDline0",p1x:0,p1y:-0.5,p1z:2,p2x:0,p2y:-0.5,p2z:2.5,_siz:1.5,_sizz:1};
mod_bd8_1[1] = {nam:"BDline1",p1x:0.2,p1y:0,p1z:2.8,p2x:0.5,p2y:0,p2z:3.5,_siz:0.5,_sizz:0.1};
mod_bd8_1[2] = {nam:"BDline2",p1x:-0.2,p1y:0,p1z:2.8,p2x:-0.5,p2y:0,p2z:3.5,_siz:0.5,_sizz:0.1};
mod_bd8_1[3] = {nam:"BDline3",p1x:0.3,p1y:-1,p1z:0.5,p2x:0,p2y:-0.5,p2z:-2,_siz:3.5,_sizz:0.5};
mod_bd8_1[4] = {nam:"BDline4",p1x:-0.3,p1y:-1,p1z:0.5,p2x:0,p2y:-0.5,p2z:-2,_siz:3.5,_sizz:0.5};
mod_bd8_1[5] = {nam:"BDline5",p1x:1,p1y:0.2,p1z:0.5,p2x:2,p2y:-1.2,p2z:1,_siz:2,_sizz:1.3};
mod_bd8_1[6] = {nam:"BDline6",p1x:-1,p1y:0.2,p1z:0.5,p2x:-2,p2y:-1.2,p2z:1,_siz:2,_sizz:1.3};
_global.mod_bd8_2 = new Array();
mod_bd8_2[0] = {nam:"BDline0",p1x:0,p1y:1,p1z:1,p2x:0,p2y:1,p2z:1.5,_siz:1.5,_sizz:1};
mod_bd8_2[1] = {nam:"BDline1",p1x:0.2,p1y:1.5,p1z:1.8,p2x:0.5,p2y:1.5,p2z:2.5,_siz:0.5,_sizz:0.1};
mod_bd8_2[2] = {nam:"BDline2",p1x:-0.2,p1y:1.5,p1z:1.8,p2x:-0.5,p2y:1.5,p2z:2.5,_siz:0.5,_sizz:0.1};
mod_bd8_2[3] = {nam:"BDline3",p1x:0.3,p1y:-0.5,p1z:1,p2x:0,p2y:-4.5,p2z:-0.5,_siz:3.5,_sizz:0.5};
mod_bd8_2[4] = {nam:"BDline4",p1x:-0.3,p1y:-0.5,p1z:1,p2x:0,p2y:-4.5,p2z:-0.5,_siz:3.5,_sizz:0.5};
mod_bd8_2[5] = {nam:"BDline5",p1x:1,p1y:-1,p1z:0,p2x:2,p2y:-1.5,p2z:1.5,_siz:2,_sizz:1.3};
mod_bd8_2[6] = {nam:"BDline6",p1x:-1,p1y:-1,p1z:0,p2x:-2,p2y:-1.5,p2z:1.5,_siz:2,_sizz:1.3};
_global.mod_bd9_1 = new Array();
mod_bd9_1[0] = {nam:"BDline0",p1x:0,p1y:0,p1z:2.5,p2x:0,p2y:-0.5,p2z:2.5,_siz:1.5,_sizz:0.8};
mod_bd9_1[1] = {nam:"BDline1",p1x:0.5,p1y:-1.5,p1z:1.5,p2x:0.5,p2y:-1.5,p2z:0,_siz:2,_sizz:1};
mod_bd9_1[2] = {nam:"BDline2",p1x:-0.5,p1y:-1.5,p1z:1.5,p2x:-0.5,p2y:-1.5,p2z:0,_siz:2,_sizz:1};
mod_bd9_1[3] = {nam:"BDline3",p1x:0,p1y:0,p1z:1,p2x:0,p2y:-0.5,p2z:-2,_siz:3,_sizz:0.7};
mod_bd9_1[4] = {nam:"BDline4",p1x:1,p1y:-0.5,p1z:-2,p2x:-1,p2y:-0.5,p2z:-2,_siz:2,_sizz:1};
mod_bd9_1[5] = {nam:"BDline5",p1x:1,p1y:0,p1z:1.2,p2x:-1,p2y:0,p2z:1.2,_siz:2.5,_sizz:1};
mod_bd9_1[6] = {nam:"BDline6",p1x:0.5,p1y:-0.5,p1z:1.2,p2x:0.5,p2y:-0.3,p2z:-1,_siz:2.5,_sizz:1};
mod_bd9_1[7] = {nam:"BDline7",p1x:-0.5,p1y:-0.5,p1z:1.2,p2x:-0.5,p2y:-0.3,p2z:-1,_siz:2.5,_sizz:1};
mod_bd9_1[8] = {nam:"BDline8",p1x:0,p1y:0,p1z:2.2,p2x:0,p2y:1,p2z:4,_siz:0.5,_sizz:0.1};
_global.mod_bd9_2 = new Array();
mod_bd9_2[0] = {nam:"BDline0",p1x:0,p1y:1.8,p1z:1.2,p2x:0,p2y:1.3,p2z:1.5,_siz:1.5,_sizz:0.8};
mod_bd9_2[1] = {nam:"BDline1",p1x:0.5,p1y:0,p1z:2,p2x:0.5,p2y:-1.5,p2z:1.5,_siz:2.5,_sizz:1};
mod_bd9_2[2] = {nam:"BDline2",p1x:-0.5,p1y:0,p1z:2,p2x:-0.5,p2y:-1.5,p2z:1.5,_siz:2.5,_sizz:1};
mod_bd9_2[3] = {nam:"BDline3",p1x:0,p1y:0.5,p1z:1,p2x:0,p2y:-4,p2z:-0.5,_siz:3,_sizz:0.7};
mod_bd9_2[4] = {nam:"BDline4",p1x:1.2,p1y:-4,p1z:-0.5,p2x:-1.2,p2y:-4,p2z:-0.5,_siz:2,_sizz:1};
mod_bd9_2[5] = {nam:"BDline5",p1x:1,p1y:0.5,p1z:0.5,p2x:-1,p2y:0.5,p2z:0.5,_siz:2.5,_sizz:1};
mod_bd9_2[6] = {nam:"BDline6",p1x:0.5,p1y:-0.2,p1z:1,p2x:0.5,p2y:-3.5,p2z:0,_siz:2,_sizz:1};
mod_bd9_2[7] = {nam:"BDline7",p1x:-0.5,p1y:-0.2,p1z:1,p2x:-0.5,p2y:-3.5,p2z:0,_siz:2,_sizz:1};
mod_bd9_2[8] = {nam:"BDline8",p1x:0,p1y:1.8,p1z:1.2,p2x:0,p2y:2.8,p2z:3,_siz:0.5,_sizz:0.1};
_global.mod_bd10_1 = new Array();
mod_bd10_1[0] = {nam:"BDline0",p1x:0,p1y:0,p1z:2.5,p2x:0,p2y:-0.5,p2z:2.7,_siz:1.5,_sizz:1};
mod_bd10_1[1] = {nam:"BDline1",p1x:0,p1y:-1.5,p1z:1,p2x:0,p2y:-1.5,p2z:-3,_siz:4,_sizz:0.1};
mod_bd10_1[2] = {nam:"BDline2",p1x:0,p1y:0,p1z:1,p2x:0,p2y:-0.5,p2z:-2,_siz:3,_sizz:1};
mod_bd10_1[3] = {nam:"BDline3",p1x:1,p1y:0.2,p1z:0.5,p2x:1.5,p2y:-1,p2z:1.5,_siz:2,_sizz:1};
mod_bd10_1[4] = {nam:"BDline4",p1x:-1,p1y:0.2,p1z:0.5,p2x:-1.5,p2y:-1,p2z:1.5,_siz:2,_sizz:1};
mod_bd10_1[5] = {nam:"BDline5",p1x:0,p1y:0.5,p1z:2.5,p2x:0,p2y:0,p2z:4.5,_siz:0.5,_sizz:0.1};
_global.mod_bd10_2 = new Array();
mod_bd10_2[0] = {nam:"BDline0",p1x:0,p1y:1.5,p1z:1.5,p2x:0,p2y:1.5,p2z:2,_siz:1.5,_sizz:1};
mod_bd10_2[1] = {nam:"BDline1",p1x:0,p1y:-0.5,p1z:1.5,p2x:0,p2y:-4.5,p2z:1,_siz:4,_sizz:0.1};
mod_bd10_2[2] = {nam:"BDline2",p1x:0,p1y:0.25,p1z:1,p2x:0,p2y:-4,p2z:-0.3,_siz:3,_sizz:1};
mod_bd10_2[3] = {nam:"BDline3",p1x:1,p1y:0,p1z:1,p2x:1.5,p2y:0,p2z:2,_siz:2,_sizz:1};
mod_bd10_2[4] = {nam:"BDline4",p1x:-1,p1y:0,p1z:1,p2x:-1.5,p2y:0,p2z:2,_siz:2,_sizz:1};
mod_bd10_2[5] = {nam:"BDline5",p1x:0,p1y:1.5,p1z:1,p2x:0,p2y:3.5,p2z:2,_siz:0.5,_sizz:0.1};
_global.mod_bd11_1 = new Array();
mod_bd11_1[0] = {nam:"BDline0",p1x:0,p1y:-0.5,p1z:2,p2x:0,p2y:0,p2z:2.5,_siz:1.5,_sizz:1};
mod_bd11_1[1] = {nam:"BDline1",p1x:0,p1y:-1,p1z:1,p2x:0,p2y:-1.5,p2z:-3,_siz:3.5,_sizz:0.2};
mod_bd11_1[2] = {nam:"BDline2",p1x:0,p1y:0,p1z:1,p2x:0,p2y:-0.5,p2z:-2,_siz:3,_sizz:1.5};
mod_bd11_1[3] = {nam:"BDline3",p1x:1,p1y:0.2,p1z:0.5,p2x:1.5,p2y:-1,p2z:1.5,_siz:2,_sizz:1};
mod_bd11_1[4] = {nam:"BDline4",p1x:-1,p1y:0.2,p1z:0.5,p2x:-1.5,p2y:-1,p2z:1.5,_siz:2,_sizz:1};
_global.mod_bd11_2 = new Array();
mod_bd11_2[0] = {nam:"BDline0",p1x:0,p1y:1.5,p1z:1.7,p2x:0,p2y:1,p2z:2,_siz:1.5,_sizz:1};
mod_bd11_2[1] = {nam:"BDline1",p1x:0,p1y:-0.5,p1z:1.5,p2x:0,p2y:-4.5,p2z:1,_siz:3.5,_sizz:0.2};
mod_bd11_2[2] = {nam:"BDline2",p1x:0,p1y:0.25,p1z:1,p2x:0,p2y:-4,p2z:0,_siz:3,_sizz:1.5};
mod_bd11_2[3] = {nam:"BDline3",p1x:1,p1y:0,p1z:1,p2x:1.5,p2y:0,p2z:2,_siz:2,_sizz:1};
mod_bd11_2[4] = {nam:"BDline4",p1x:-1,p1y:0,p1z:1,p2x:-1.5,p2y:0,p2z:2,_siz:2,_sizz:1};
_global.mod_bd12_1 = new Array();
mod_bd12_1[0] = {nam:"BDline0",p1x:0,p1y:0,p1z:2.7,p2x:0,p2y:0,p2z:3,_siz:1.5,_sizz:1};
mod_bd12_1[1] = {nam:"BDline1",p1x:0,p1y:0.4,p1z:3.4,p2x:0,p2y:-0.4,p2z:3.4,_siz:1,_sizz:0.5};
mod_bd12_1[2] = {nam:"BDline2",p1x:-1,p1y:-1.5,p1z:1.5,p2x:-2,p2y:-1.5,p2z:3.5,_siz:0.5,_sizz:1};
mod_bd12_1[3] = {nam:"BDline3",p1x:0,p1y:0,p1z:1,p2x:0,p2y:-0.5,p2z:-2,_siz:3,_sizz:0.7};
mod_bd12_1[4] = {nam:"BDline4",p1x:1.2,p1y:-0.5,p1z:-2,p2x:-1.2,p2y:-0.5,p2z:-2,_siz:2,_sizz:1};
mod_bd12_1[5] = {nam:"BDline5",p1x:1,p1y:0,p1z:1.2,p2x:-1,p2y:0,p2z:1.2,_siz:2.5,_sizz:1};
mod_bd12_1[6] = {nam:"BDline6",p1x:1,p1y:-1,p1z:1.2,p2x:0.8,p2y:-0.5,p2z:-1,_siz:2.5,_sizz:1};
mod_bd12_1[7] = {nam:"BDline7",p1x:-1,p1y:-1,p1z:1.2,p2x:-0.8,p2y:-0.5,p2z:-1,_siz:2.5,_sizz:1};
_global.mod_bd12_2 = new Array();
mod_bd12_2[0] = {nam:"BDline0",p1x:0,p1y:1.5,p1z:1.5,p2x:0,p2y:1.5,p2z:1.8,_siz:1.5,_sizz:1};
mod_bd12_2[1] = {nam:"BDline1",p1x:0,p1y:1.9,p1z:2.2,p2x:0,p2y:1.1,p2z:2.2,_siz:1,_sizz:0.5};
mod_bd12_2[2] = {nam:"BDline2",p1x:-1,p1y:0,p1z:2.5,p2x:-2,p2y:2,p2z:3,_siz:0.5,_sizz:1};
mod_bd12_2[3] = {nam:"BDline3",p1x:0,p1y:0.5,p1z:1,p2x:0,p2y:-4,p2z:-0.5,_siz:3,_sizz:0.7};
mod_bd12_2[4] = {nam:"BDline4",p1x:1.2,p1y:-4,p1z:-0.5,p2x:-1.2,p2y:-4,p2z:-0.5,_siz:2,_sizz:1};
mod_bd12_2[5] = {nam:"BDline5",p1x:1,p1y:0.5,p1z:0.5,p2x:-1,p2y:0.5,p2z:0.5,_siz:2.5,_sizz:1};
mod_bd12_2[6] = {nam:"BDline6",p1x:1,p1y:-0.2,p1z:1.9,p2x:0.8,p2y:-3,p2z:0.5,_siz:2.5,_sizz:1};
mod_bd12_2[7] = {nam:"BDline7",p1x:-1,p1y:-0.2,p1z:1.9,p2x:-0.8,p2y:-3,p2z:0.5,_siz:2.5,_sizz:1};
_global.mod_bd13_1 = new Array();
mod_bd13_1[0] = {nam:"BDline0",p1x:0,p1y:-0.4,p1z:2.5,p2x:0,p2y:-0.5,p2z:2.5,_siz:1.5,_sizz:1};
mod_bd13_1[1] = {nam:"BDline1",p1x:0,p1y:-1,p1z:1,p2x:0,p2y:-1,p2z:-1,_siz:3.5,_sizz:0.2};
mod_bd13_1[2] = {nam:"BDline2",p1x:0,p1y:0,p1z:1,p2x:0,p2y:-0.5,p2z:-2,_siz:2.5,_sizz:1.5};
mod_bd13_1[3] = {nam:"BDline3",p1x:1,p1y:0.2,p1z:0.5,p2x:1.5,p2y:-1,p2z:1.5,_siz:2,_sizz:1};
mod_bd13_1[4] = {nam:"BDline4",p1x:-1,p1y:0.2,p1z:0.5,p2x:-1.5,p2y:-1,p2z:1.5,_siz:2,_sizz:1};
mod_bd13_1[5] = {nam:"BDline5",p1x:0,p1y:0.5,p1z:2.5,p2x:0,p2y:0,p2z:4.5,_siz:0.5,_sizz:0.1};
mod_bd13_1[6] = {nam:"BDline6",p1x:0,p1y:0,p1z:2,p2x:0,p2y:-1.2,p2z:4,_siz:2,_sizz:0.1};
_global.mod_bd13_2 = new Array();
mod_bd13_2[0] = {nam:"BDline0",p1x:0,p1y:1.4,p1z:1.7,p2x:0,p2y:1.3,p2z:2,_siz:1.5,_sizz:1};
mod_bd13_2[1] = {nam:"BDline1",p1x:0,p1y:-0.5,p1z:1.5,p2x:0,p2y:-4.5,p2z:1,_siz:3.5,_sizz:0.2};
mod_bd13_2[2] = {nam:"BDline2",p1x:0,p1y:0,p1z:1,p2x:0,p2y:-4,p2z:0,_siz:2.5,_sizz:1.5};
mod_bd13_2[3] = {nam:"BDline3",p1x:1,p1y:0,p1z:1,p2x:1.5,p2y:0,p2z:2,_siz:2,_sizz:1};
mod_bd13_2[4] = {nam:"BDline4",p1x:-1,p1y:0,p1z:1,p2x:-1.5,p2y:0,p2z:2,_siz:2,_sizz:1};
mod_bd13_2[5] = {nam:"BDline5",p1x:0,p1y:1.5,p1z:1,p2x:0,p2y:3.5,p2z:2,_siz:0.5,_sizz:0.1};
mod_bd13_2[6] = {nam:"BDline6",p1x:0,p1y:1.2,p1z:1.7,p2x:0,p2y:2.1,p2z:3.3,_siz:2,_sizz:0.1};
_global.mod_bd14_1 = new Array();
mod_bd14_1[0] = {nam:"BDline0",p1x:0,p1y:0,p1z:1.5,p2x:0,p2y:0,p2z:4.5,_siz:1.8,_sizz:0.1};
mod_bd14_1[1] = {nam:"BDline1",p1x:0,p1y:-1,p1z:1,p2x:0,p2y:-1,p2z:-1,_siz:3.5,_sizz:1};
mod_bd14_1[2] = {nam:"BDline2",p1x:0,p1y:0,p1z:0,p2x:0,p2y:-0.5,p2z:-3,_siz:4,_sizz:1.5};
mod_bd14_1[3] = {nam:"BDline3",p1x:1,p1y:0.2,p1z:0.5,p2x:-1,p2y:0.2,p2z:0.5,_siz:3.5,_sizz:1};
mod_bd14_1[4] = {nam:"BDline4",p1x:0,p1y:-2,p1z:2,p2x:0,p2y:-4,p2z:6,_siz:1,_sizz:0.1};
_global.mod_bd14_2 = new Array();
mod_bd14_2[0] = {nam:"BDline0",p1x:0,p1y:0.5,p1z:1,p2x:0,p2y:3.5,p2z:2,_siz:1.8,_sizz:0.1};
mod_bd14_2[1] = {nam:"BDline1",p1x:0,p1y:-0.5,p1z:1.5,p2x:0,p2y:-2.5,p2z:0.5,_siz:3.5,_sizz:1};
mod_bd14_2[2] = {nam:"BDline2",p1x:0,p1y:0,p1z:1,p2x:0,p2y:-4,p2z:0,_siz:4,_sizz:1.5};
mod_bd14_2[3] = {nam:"BDline3",p1x:1,p1y:0,p1z:0,p2x:-1,p2y:0,p2z:0,_siz:3.5,_sizz:1};
mod_bd14_2[4] = {nam:"BDline4",p1x:0,p1y:1.2,p1z:3,p2x:0,p2y:4,p2z:5.5,_siz:1,_sizz:0.1};
_global.mod_bd15_1 = new Array();
mod_bd15_1[0] = {nam:"BDline0",p1x:0,p1y:-0.5,p1z:2,p2x:0,p2y:-0.5,p2z:2.5,_siz:1.5,_sizz:1};
mod_bd15_1[1] = {nam:"BDline1",p1x:-0.5,p1y:-0.5,p1z:2,p2x:-0.5,p2y:-0.5,p2z:4,_siz:0.2,_sizz:1};
mod_bd15_1[2] = {nam:"BDline2",p1x:0,p1y:0,p1z:2.8,p2x:0,p2y:0,p2z:3.5,_siz:0.5,_sizz:0.1};
mod_bd15_1[3] = {nam:"BDline3",p1x:0.3,p1y:-1,p1z:0.5,p2x:0,p2y:-0.5,p2z:-2,_siz:3.5,_sizz:0.5};
mod_bd15_1[4] = {nam:"BDline4",p1x:-0.3,p1y:-1,p1z:0.5,p2x:0,p2y:-0.5,p2z:-2,_siz:3.5,_sizz:0.5};
mod_bd15_1[5] = {nam:"BDline5",p1x:1,p1y:0.2,p1z:0.5,p2x:2,p2y:-1.2,p2z:1,_siz:2,_sizz:1.3};
mod_bd15_1[6] = {nam:"BDline6",p1x:-1,p1y:0.2,p1z:0.5,p2x:-2,p2y:-1.2,p2z:1,_siz:2,_sizz:1.3};
_global.mod_bd15_2 = new Array();
mod_bd15_2[0] = {nam:"BDline0",p1x:0,p1y:1,p1z:1,p2x:0,p2y:1.2,p2z:1.5,_siz:1.5,_sizz:1};
mod_bd15_2[1] = {nam:"BDline1",p1x:-0.5,p1y:1,p1z:1,p2x:-0.5,p2y:2.3,p2z:2.3,_siz:0.2,_sizz:1};
mod_bd15_2[2] = {nam:"BDline2",p1x:0,p1y:1.8,p1z:1.5,p2x:0,p2y:1.7,p2z:2.2,_siz:0.5,_sizz:0.1};
mod_bd15_2[3] = {nam:"BDline3",p1x:0.3,p1y:-0.5,p1z:1,p2x:0,p2y:-4.5,p2z:-0.5,_siz:3.5,_sizz:0.5};
mod_bd15_2[4] = {nam:"BDline4",p1x:-0.3,p1y:-0.5,p1z:1,p2x:0,p2y:-4.5,p2z:-0.5,_siz:3.5,_sizz:0.5};
mod_bd15_2[5] = {nam:"BDline5",p1x:1,p1y:-1,p1z:0,p2x:2,p2y:-1.5,p2z:1.5,_siz:2,_sizz:1.3};
mod_bd15_2[6] = {nam:"BDline6",p1x:-1,p1y:-1,p1z:0,p2x:-2,p2y:-1.5,p2z:1.5,_siz:2,_sizz:1.3};
_global.mod_bd16_1 = new Array();
mod_bd16_1[0] = {nam:"BDline0",p1x:0,p1y:0,p1z:1.5,p2x:0,p2y:0,p2z:5,_siz:2,_sizz:0.1};
mod_bd16_1[1] = {nam:"BDline1",p1x:0,p1y:-1,p1z:1,p2x:0,p2y:-1,p2z:-1,_siz:2.5,_sizz:1};
mod_bd16_1[2] = {nam:"BDline2",p1x:0,p1y:0,p1z:0,p2x:0,p2y:-0.5,p2z:-3,_siz:3,_sizz:0.5};
mod_bd16_1[3] = {nam:"BDline3",p1x:1,p1y:0.2,p1z:0.5,p2x:-1,p2y:0.2,p2z:0.5,_siz:3,_sizz:1};
_global.mod_bd16_2 = new Array();
mod_bd16_2[0] = {nam:"BDline0",p1x:0,p1y:0.5,p1z:1,p2x:0,p2y:4,p2z:2,_siz:2,_sizz:0.1};
mod_bd16_2[1] = {nam:"BDline1",p1x:0,p1y:-0.5,p1z:1.5,p2x:0,p2y:-2.5,p2z:0.5,_siz:2.5,_sizz:1};
mod_bd16_2[2] = {nam:"BDline2",p1x:0,p1y:0,p1z:1,p2x:0,p2y:-4,p2z:0,_siz:3,_sizz:0.5};
mod_bd16_2[3] = {nam:"BDline3",p1x:1,p1y:0,p1z:0.5,p2x:-1,p2y:0,p2z:0.5,_siz:3,_sizz:1};
_global.mod_bd17_1 = new Array();
mod_bd17_1[0] = {nam:"BDline0",p1x:0,p1y:0,p1z:1.5,p2x:0,p2y:0,p2z:3.5,_siz:2,_sizz:0.7};
mod_bd17_1[1] = {nam:"BDline1",p1x:0,p1y:-1,p1z:1,p2x:0,p2y:-1,p2z:-1,_siz:2.5,_sizz:1};
mod_bd17_1[2] = {nam:"BDline2",p1x:0,p1y:0,p1z:0,p2x:0,p2y:-0.5,p2z:-3,_siz:3,_sizz:0.5};
mod_bd17_1[3] = {nam:"BDline3",p1x:1,p1y:0.2,p1z:0.5,p2x:-1,p2y:0.2,p2z:0.5,_siz:3,_sizz:1};
_global.mod_bd17_2 = new Array();
mod_bd17_2[0] = {nam:"BDline0",p1x:0,p1y:0.5,p1z:1,p2x:0,p2y:2.5,p2z:2,_siz:2,_sizz:0.7};
mod_bd17_2[1] = {nam:"BDline1",p1x:0,p1y:-0.5,p1z:1.5,p2x:0,p2y:-2.5,p2z:0.5,_siz:2.5,_sizz:1};
mod_bd17_2[2] = {nam:"BDline2",p1x:0,p1y:0,p1z:1,p2x:0,p2y:-4,p2z:0,_siz:3,_sizz:0.5};
mod_bd17_2[3] = {nam:"BDline3",p1x:1,p1y:0,p1z:0.5,p2x:-1,p2y:0,p2z:0.5,_siz:3,_sizz:1};
_global.mod_bd18_1 = new Array();
mod_bd18_1[0] = {nam:"BDline0",p1x:0,p1y:0,p1z:2.5,p2x:0,p2y:2,p2z:1.5,_siz:2,_sizz:0.1};
mod_bd18_1[1] = {nam:"BDline1",p1x:0.5,p1y:0,p1z:3,p2x:1.5,p2y:1,p2z:5,_siz:0.5,_sizz:0.1};
mod_bd18_1[2] = {nam:"BDline2",p1x:-0.5,p1y:0,p1z:3,p2x:-1.5,p2y:1,p2z:5,_siz:0.5,_sizz:0.1};
mod_bd18_1[3] = {nam:"BDline3",p1x:0,p1y:0,p1z:0,p2x:0,p2y:-0.5,p2z:-3,_siz:3,_sizz:0.5};
mod_bd18_1[4] = {nam:"BDline4",p1x:1,p1y:0.2,p1z:0.5,p2x:-1,p2y:0.2,p2z:0.5,_siz:3,_sizz:1};
mod_bd18_1[5] = {nam:"BDline5",p1x:1.5,p1y:0,p1z:-3,p2x:0,p2y:-9,p2z:-4,_siz:4,_sizz:0.05};
mod_bd18_1[6] = {nam:"BDline6",p1x:-1.5,p1y:0,p1z:-3,p2x:0,p2y:-9,p2z:-4,_siz:4,_sizz:0.05};
mod_bd18_1[7] = {nam:"BDline7",p1x:0,p1y:1,p1z:-3,p2x:0,p2y:-9,p2z:-4,_siz:4,_sizz:0.05};
_global.mod_bd18_2 = new Array();
mod_bd18_2[0] = {nam:"BDline0",p1x:0,p1y:1,p1z:1.5,p2x:0,p2y:3,p2z:0.5,_siz:2,_sizz:0.1};
mod_bd18_2[1] = {nam:"BDline1",p1x:0.5,p1y:1,p1z:2,p2x:1.5,p2y:2,p2z:4,_siz:0.5,_sizz:0.1};
mod_bd18_2[2] = {nam:"BDline2",p1x:-0.5,p1y:1,p1z:2,p2x:-1.5,p2y:2,p2z:4,_siz:0.5,_sizz:0.1};
mod_bd18_2[3] = {nam:"BDline3",p1x:0,p1y:0,p1z:0,p2x:0,p2y:-3,p2z:0.5,_siz:3,_sizz:0.5};
mod_bd18_2[4] = {nam:"BDline4",p1x:1,p1y:0.2,p1z:0.5,p2x:-1,p2y:0.2,p2z:0.5,_siz:3,_sizz:1};
mod_bd18_2[5] = {nam:"BDline5",p1x:1.5,p1y:-4,p1z:0,p2x:0,p2y:-10,p2z:5,_siz:4,_sizz:0.05};
mod_bd18_2[6] = {nam:"BDline6",p1x:-1.5,p1y:-4,p1z:0,p2x:0,p2y:-10,p2z:5,_siz:4,_sizz:0.05};
mod_bd18_2[7] = {nam:"BDline7",p1x:0,p1y:-3.5,p1z:-0.5,p2x:0,p2y:-10,p2z:5,_siz:4,_sizz:0.05};
_global.mod_bd19_1 = new Array();
mod_bd19_1[0] = {nam:"BDline0",p1x:0,p1y:-0.4,p1z:2.5,p2x:0,p2y:-0.5,p2z:2.5,_siz:1.5,_sizz:1};
mod_bd19_1[1] = {nam:"BDline1",p1x:0,p1y:-1,p1z:1,p2x:0,p2y:-1,p2z:-1,_siz:3.5,_sizz:0.2};
mod_bd19_1[2] = {nam:"BDline2",p1x:0,p1y:0,p1z:1,p2x:0,p2y:-0.5,p2z:-2,_siz:2.5,_sizz:1.8};
mod_bd19_1[3] = {nam:"BDline3",p1x:1,p1y:0.5,p1z:1,p2x:1.5,p2y:-1,p2z:1.5,_siz:2,_sizz:1};
mod_bd19_1[4] = {nam:"BDline4",p1x:-1,p1y:0.5,p1z:1,p2x:-1.5,p2y:-1,p2z:1.5,_siz:2,_sizz:1};
mod_bd19_1[5] = {nam:"BDline5",p1x:0,p1y:0.2,p1z:2.5,p2x:0,p2y:-0.5,p2z:4.5,_siz:0.8,_sizz:0.1};
mod_bd19_1[6] = {nam:"BDline6",p1x:0.3,p1y:0.2,p1z:2.6,p2x:0.5,p2y:0.2,p2z:4,_siz:0.5,_sizz:0.1};
mod_bd19_1[7] = {nam:"BDline7",p1x:-0.3,p1y:0.2,p1z:2.6,p2x:-0.5,p2y:0.2,p2z:4,_siz:0.5,_sizz:0.1};
mod_bd19_1[8] = {nam:"BDline8",p1x:1.2,p1y:-1,p1z:-2,p2x:0,p2y:-2,p2z:-5,_siz:3,_sizz:0.2};
mod_bd19_1[9] = {nam:"BDline9",p1x:-1.2,p1y:-1,p1z:-2,p2x:0,p2y:-2,p2z:-5,_siz:3,_sizz:0.2};
_global.mod_bd19_2 = new Array();
mod_bd19_2[0] = {nam:"BDline0",p1x:0,p1y:1.4,p1z:1.7,p2x:0,p2y:1.3,p2z:2,_siz:1.5,_sizz:1};
mod_bd19_2[1] = {nam:"BDline1",p1x:0,p1y:-0.5,p1z:1.5,p2x:0,p2y:-4.5,p2z:1,_siz:3.5,_sizz:0.2};
mod_bd19_2[2] = {nam:"BDline2",p1x:0,p1y:0,p1z:0.5,p2x:0,p2y:-4,p2z:0,_siz:2.5,_sizz:1.8};
mod_bd19_2[3] = {nam:"BDline3",p1x:1,p1y:0,p1z:0,p2x:1.5,p2y:0,p2z:2,_siz:2,_sizz:1};
mod_bd19_2[4] = {nam:"BDline4",p1x:-1,p1y:0,p1z:0,p2x:-1.5,p2y:0,p2z:2,_siz:2,_sizz:1};
mod_bd19_2[5] = {nam:"BDline5",p1x:0,p1y:1.5,p1z:1,p2x:0,p2y:3.5,p2z:2,_siz:0.8,_sizz:0.1};
mod_bd19_2[6] = {nam:"BDline6",p1x:0.3,p1y:1.5,p1z:1,p2x:0.5,p2y:3,p2z:1.2,_siz:0.5,_sizz:0.1};
mod_bd19_2[7] = {nam:"BDline7",p1x:-0.3,p1y:1.5,p1z:1,p2x:-0.5,p2y:3,p2z:1.2,_siz:0.5,_sizz:0.1};
mod_bd19_2[8] = {nam:"BDline8",p1x:1.2,p1y:-3.7,p1z:1,p2x:0,p2y:-8,p2z:0.5,_siz:3,_sizz:0.2};
mod_bd19_2[9] = {nam:"BDline9",p1x:-1.2,p1y:-3.7,p1z:1,p2x:0,p2y:-8,p2z:0.5,_siz:3,_sizz:0.2};
_global.mod_bd20_1 = new Array();
mod_bd20_1[0] = {nam:"BDline0",p1x:0,p1y:0.5,p1z:2.2,p2x:0,p2y:-1.5,p2z:4.5,_siz:1,_sizz:0.1};
mod_bd20_1[1] = {nam:"BDline1",p1x:0,p1y:0.8,p1z:2.2,p2x:0,p2y:1.5,p2z:4,_siz:0.5,_sizz:0.1};
mod_bd20_1[2] = {nam:"BDline2",p1x:0,p1y:-1,p1z:1,p2x:0,p2y:-0.5,p2z:-2,_siz:3.5,_sizz:0.7};
mod_bd20_1[3] = {nam:"BDline3",p1x:1,p1y:0.5,p1z:0.5,p2x:1.5,p2y:-1.5,p2z:2,_siz:2,_sizz:1.5};
mod_bd20_1[4] = {nam:"BDline4",p1x:-1,p1y:0.5,p1z:0.5,p2x:-1.5,p2y:-1.5,p2z:2,_siz:2,_sizz:1.5};
mod_bd20_1[5] = {nam:"BDline5",p1x:-1,p1y:-0.5,p1z:-2,p2x:-3,p2y:-0.5,p2z:-3,_siz:2,_sizz:1.5};
mod_bd20_1[6] = {nam:"BDline6",p1x:0,p1y:0.5,p1z:-3,p2x:-2.5,p2y:1,p2z:-4,_siz:1,_sizz:2.5};
mod_bd20_1[7] = {nam:"BDline7",p1x:0,p1y:-1.5,p1z:-3,p2x:-2.5,p2y:-2,p2z:-4,_siz:1,_sizz:2.5};
mod_bd20_1[8] = {nam:"BDline8",p1x:1,p1y:-0.5,p1z:-2,p2x:3,p2y:-0.5,p2z:-3,_siz:2,_sizz:1.5};
mod_bd20_1[9] = {nam:"BDline9",p1x:0,p1y:0.5,p1z:-3,p2x:2.5,p2y:1,p2z:-4,_siz:1,_sizz:2.5};
mod_bd20_1[10] = {nam:"BDline10",p1x:0,p1y:-1.5,p1z:-3,p2x:2.5,p2y:-2,p2z:-4,_siz:1,_sizz:2.5};
_global.mod_bd20_2 = new Array();
mod_bd20_2[0] = {nam:"BDline0",p1x:0,p1y:1.5,p1z:1.5,p2x:0,p2y:0.5,p2z:4.5,_siz:1,_sizz:0.1};
mod_bd20_2[1] = {nam:"BDline1",p1x:0,p1y:1.5,p1z:1.2,p2x:0,p2y:3,p2z:3,_siz:0.5,_sizz:0.1};
mod_bd20_2[2] = {nam:"BDline2",p1x:0,p1y:0,p1z:1.5,p2x:0,p2y:-4.5,p2z:0,_siz:3.5,_sizz:0.7};
mod_bd20_2[3] = {nam:"BDline3",p1x:1,p1y:-0.5,p1z:0.5,p2x:1.5,p2y:0,p2z:2,_siz:2,_sizz:1.5};
mod_bd20_2[4] = {nam:"BDline4",p1x:-1,p1y:-0.5,p1z:0.5,p2x:-1.5,p2y:0,p2z:2,_siz:2,_sizz:1.5};
mod_bd20_2[5] = {nam:"BDline5",p1x:-1,p1y:-3.5,p1z:0,p2x:-3,p2y:-5,p2z:0,_siz:2,_sizz:1.5};
mod_bd20_2[6] = {nam:"BDline6",p1x:0,p1y:-4.5,p1z:1,p2x:-2.5,p2y:-5.5,p2z:1,_siz:1,_sizz:2.5};
mod_bd20_2[7] = {nam:"BDline7",p1x:0,p1y:-4.5,p1z:-1,p2x:-2.5,p2y:-5.5,p2z:-1,_siz:1,_sizz:2.5};
mod_bd20_2[8] = {nam:"BDline8",p1x:1,p1y:-3.5,p1z:0,p2x:3,p2y:-5,p2z:0,_siz:2,_sizz:1.5};
mod_bd20_2[9] = {nam:"BDline9",p1x:0,p1y:-4.5,p1z:1,p2x:2.5,p2y:-5.5,p2z:1,_siz:1,_sizz:2.5};
mod_bd20_2[10] = {nam:"BDline10",p1x:0,p1y:-4.5,p1z:-1,p2x:2.5,p2y:-5.5,p2z:-1,_siz:1,_sizz:2.5};
_global.mod_bd21_1 = new Array();
mod_bd21_1[0] = {nam:"BDline0",p1x:0,p1y:-0.4,p1z:2.5,p2x:0,p2y:-0.5,p2z:2.5,_siz:1.5,_sizz:1};
mod_bd21_1[1] = {nam:"BDline1",p1x:0,p1y:-1,p1z:1,p2x:0,p2y:-1,p2z:-1,_siz:3.5,_sizz:0.2};
mod_bd21_1[2] = {nam:"BDline2",p1x:0,p1y:0,p1z:1,p2x:0,p2y:-0.5,p2z:-2,_siz:2.5,_sizz:1.8};
mod_bd21_1[3] = {nam:"BDline3",p1x:1,p1y:0.5,p1z:1,p2x:1.5,p2y:-1,p2z:1.5,_siz:2,_sizz:1};
mod_bd21_1[4] = {nam:"BDline4",p1x:-1,p1y:0.5,p1z:1,p2x:-1.5,p2y:-1,p2z:1.5,_siz:2,_sizz:1};
mod_bd21_1[5] = {nam:"BDline5",p1x:0,p1y:-1,p1z:2.5,p2x:0,p2y:0.7,p2z:4.5,_siz:0.5,_sizz:0.1};
mod_bd21_1[6] = {nam:"BDline6",p1x:1.2,p1y:-1,p1z:-2,p2x:0,p2y:-2,p2z:-5,_siz:3,_sizz:0.2};
mod_bd21_1[7] = {nam:"BDline7",p1x:-1.2,p1y:-1,p1z:-2,p2x:0,p2y:-2,p2z:-5,_siz:3,_sizz:0.2};
_global.mod_bd21_2 = new Array();
mod_bd21_2[0] = {nam:"BDline0",p1x:0,p1y:1.4,p1z:1.7,p2x:0,p2y:1.3,p2z:2,_siz:1.5,_sizz:1};
mod_bd21_2[1] = {nam:"BDline1",p1x:0,p1y:-0.5,p1z:1.5,p2x:0,p2y:-4.5,p2z:1,_siz:3.5,_sizz:0.2};
mod_bd21_2[2] = {nam:"BDline2",p1x:0,p1y:0,p1z:0.5,p2x:0,p2y:-4,p2z:0,_siz:2.5,_sizz:1.8};
mod_bd21_2[3] = {nam:"BDline3",p1x:1,p1y:0,p1z:0,p2x:1.5,p2y:0,p2z:2,_siz:2,_sizz:1};
mod_bd21_2[4] = {nam:"BDline4",p1x:-1,p1y:0,p1z:0,p2x:-1.5,p2y:0,p2z:2,_siz:2,_sizz:1};
mod_bd21_2[5] = {nam:"BDline5",p1x:0,p1y:1.5,p1z:2.5,p2x:0,p2y:3.5,p2z:1.5,_siz:0.5,_sizz:0.1};
mod_bd21_2[6] = {nam:"BDline6",p1x:1.2,p1y:-3.7,p1z:1,p2x:0,p2y:-8,p2z:0.5,_siz:3,_sizz:0.2};
mod_bd21_2[7] = {nam:"BDline7",p1x:-1.2,p1y:-3.7,p1z:1,p2x:0,p2y:-8,p2z:0.5,_siz:3,_sizz:0.2};
_global.mod_bd22_1 = new Array();
mod_bd22_1[0] = {nam:"BDline0",p1x:0,p1y:-0.2,p1z:2.2,p2x:0,p2y:-0.5,p2z:2.5,_siz:1.5,_sizz:1};
mod_bd22_1[1] = {nam:"BDline1",p1x:0,p1y:-1,p1z:1,p2x:0,p2y:-1,p2z:-1,_siz:3.5,_sizz:0.2};
mod_bd22_1[2] = {nam:"BDline2",p1x:0,p1y:0,p1z:1,p2x:0,p2y:-0.5,p2z:-2,_siz:2,_sizz:1.8};
mod_bd22_1[3] = {nam:"BDline3",p1x:1,p1y:0.5,p1z:1,p2x:1.5,p2y:-1,p2z:1.5,_siz:2,_sizz:1};
mod_bd22_1[4] = {nam:"BDline4",p1x:-1,p1y:0.5,p1z:1,p2x:-1.5,p2y:-1,p2z:1.5,_siz:2,_sizz:1};
mod_bd22_1[5] = {nam:"BDline5",p1x:0,p1y:-1,p1z:2.5,p2x:0,p2y:0.3,p2z:4.5,_siz:1,_sizz:0.1};
_global.mod_bd22_2 = new Array();
mod_bd22_2[0] = {nam:"BDline0",p1x:0,p1y:0.7,p1z:1.5,p2x:0,p2y:1,p2z:1.5,_siz:1.5,_sizz:1};
mod_bd22_2[1] = {nam:"BDline1",p1x:0,p1y:-0.5,p1z:1.5,p2x:0,p2y:-4.5,p2z:0,_siz:3.5,_sizz:0.2};
mod_bd22_2[2] = {nam:"BDline2",p1x:0,p1y:0,p1z:0.5,p2x:0,p2y:-4,p2z:0,_siz:2,_sizz:1.8};
mod_bd22_2[3] = {nam:"BDline3",p1x:1,p1y:0,p1z:0,p2x:1.5,p2y:0,p2z:2,_siz:2,_sizz:1};
mod_bd22_2[4] = {nam:"BDline4",p1x:-1,p1y:0,p1z:0,p2x:-1.5,p2y:0,p2z:2,_siz:2,_sizz:1};
mod_bd22_2[5] = {nam:"BDline5",p1x:0,p1y:1.2,p1z:2,p2x:0,p2y:3.5,p2z:1.7,_siz:1,_sizz:0.1};
_global.mod_bd23_1 = new Array();
mod_bd23_1[0] = {nam:"BDline0",p1x:0,p1y:0,p1z:1,p2x:0,p2y:-0.5,p2z:-2,_siz:2,_sizz:1};
mod_bd23_1[1] = {nam:"BDline1",p1x:1.5,p1y:0.5,p1z:0,p2x:1.5,p2y:-1,p2z:0,_siz:3.5,_sizz:1};
mod_bd23_1[2] = {nam:"BDline2",p1x:-1.5,p1y:0.5,p1z:0,p2x:-1.5,p2y:-1,p2z:0,_siz:3.5,_sizz:1};
mod_bd23_1[3] = {nam:"BDline3",p1x:1.5,p1y:0.5,p1z:0,p2x:-1.5,p2y:0.5,p2z:0,_siz:3.5,_sizz:1};
mod_bd23_1[4] = {nam:"BDline4",p1x:1.5,p1y:-1,p1z:0,p2x:-1.5,p2y:-1,p2z:0,_siz:3.5,_sizz:1};
mod_bd23_1[5] = {nam:"BDline5",p1x:2.5,p1y:1,p1z:2,p2x:2.5,p2y:-5,p2z:2,_siz:3,_sizz:0.5};
mod_bd23_1[6] = {nam:"BDline6",p1x:-2.5,p1y:1,p1z:2,p2x:-2.5,p2y:-5,p2z:2,_siz:3,_sizz:0.5};
mod_bd23_1[7] = {nam:"BDline7",p1x:2.5,p1y:1,p1z:1,p2x:2.5,p2y:-2,p2z:1,_siz:3,_sizz:1};
mod_bd23_1[8] = {nam:"BDline8",p1x:-2.5,p1y:1,p1z:1,p2x:-2.5,p2y:-2,p2z:1,_siz:3,_sizz:1};
_global.mod_bd23_2 = new Array();
mod_bd23_2[0] = {nam:"BDline0",p1x:0,p1y:0,p1z:0.5,p2x:0,p2y:-4,p2z:0,_siz:2,_sizz:1};
mod_bd23_2[1] = {nam:"BDline1",p1x:1.5,p1y:-0.5,p1z:0,p2x:1.5,p2y:-0.5,p2z:1.5,_siz:3.5,_sizz:1};
mod_bd23_2[2] = {nam:"BDline2",p1x:-1.5,p1y:-0.5,p1z:0,p2x:-1.5,p2y:-0.5,p2z:1.5,_siz:3.5,_sizz:1};
mod_bd23_2[3] = {nam:"BDline3",p1x:1.5,p1y:-0.5,p1z:0,p2x:-1.5,p2y:-0.5,p2z:0,_siz:3.5,_sizz:1};
mod_bd23_2[4] = {nam:"BDline4",p1x:-1.5,p1y:-0.5,p1z:1.5,p2x:-1.5,p2y:-0.5,p2z:1.5,_siz:3.5,_sizz:1};
mod_bd23_2[5] = {nam:"BDline5",p1x:2.5,p1y:1,p1z:2,p2x:2.5,p2y:-5,p2z:2,_siz:3,_sizz:0.5};
mod_bd23_2[6] = {nam:"BDline6",p1x:-2.5,p1y:1,p1z:2,p2x:-2.5,p2y:-5,p2z:2,_siz:3,_sizz:0.5};
mod_bd23_2[7] = {nam:"BDline7",p1x:2.5,p1y:1,p1z:1,p2x:2.5,p2y:-2,p2z:1,_siz:3,_sizz:1};
mod_bd23_2[8] = {nam:"BDline8",p1x:-2.5,p1y:1,p1z:1,p2x:-2.5,p2y:-2,p2z:1,_siz:3,_sizz:1};
_global.mod_bd24_1 = new Array();
mod_bd24_1[0] = {nam:"BDline0",p1x:0,p1y:-0.4,p1z:2.5,p2x:0,p2y:-0.5,p2z:2.5,_siz:1.5,_sizz:1};
mod_bd24_1[1] = {nam:"BDline1",p1x:0,p1y:-1,p1z:1,p2x:0,p2y:-1,p2z:-1,_siz:3.5,_sizz:0.2};
mod_bd24_1[2] = {nam:"BDline2",p1x:0,p1y:0,p1z:1,p2x:0,p2y:-0.5,p2z:-2,_siz:2.5,_sizz:1.8};
mod_bd24_1[3] = {nam:"BDline3",p1x:1,p1y:0.5,p1z:1,p2x:1.5,p2y:-1,p2z:1.5,_siz:2,_sizz:1};
mod_bd24_1[4] = {nam:"BDline4",p1x:-1,p1y:0.5,p1z:1,p2x:-1.5,p2y:-1,p2z:1.5,_siz:2,_sizz:1};
mod_bd24_1[5] = {nam:"BDline5",p1x:0,p1y:0.2,p1z:2.5,p2x:0,p2y:-0.5,p2z:4.5,_siz:0.4,_sizz:0.1};
mod_bd24_1[6] = {nam:"BDline6",p1x:1,p1y:-2,p1z:1,p2x:-1,p2y:-2,p2z:1,_siz:3,_sizz:1};
_global.mod_bd24_2 = new Array();
mod_bd24_2[0] = {nam:"BDline0",p1x:0,p1y:1.4,p1z:1.7,p2x:0,p2y:1.3,p2z:2,_siz:1.5,_sizz:1};
mod_bd24_2[1] = {nam:"BDline1",p1x:0,p1y:-0.5,p1z:1.5,p2x:0,p2y:-4.5,p2z:1,_siz:3.5,_sizz:0.2};
mod_bd24_2[2] = {nam:"BDline2",p1x:0,p1y:0,p1z:0.5,p2x:0,p2y:-4,p2z:0,_siz:2.5,_sizz:1.8};
mod_bd24_2[3] = {nam:"BDline3",p1x:1,p1y:0,p1z:0,p2x:1.5,p2y:0,p2z:2,_siz:2,_sizz:1};
mod_bd24_2[4] = {nam:"BDline4",p1x:-1,p1y:0,p1z:0,p2x:-1.5,p2y:0,p2z:2,_siz:2,_sizz:1};
mod_bd24_2[5] = {nam:"BDline5",p1x:0,p1y:1.5,p1z:1,p2x:0,p2y:3.5,p2z:2,_siz:0.4,_sizz:0.1};
mod_bd24_2[6] = {nam:"BDline6",p1x:1,p1y:-1,p1z:2,p2x:-1,p2y:-1,p2z:2,_siz:3,_sizz:1};
_global.mod_bd25_1 = new Array();
mod_bd25_1[0] = {nam:"BDline0",p1x:0,p1y:0,p1z:1.5,p2x:0,p2y:0,p2z:2.5,_siz:2,_sizz:0.7};
mod_bd25_1[1] = {nam:"BDline1",p1x:0,p1y:-1,p1z:1,p2x:0,p2y:-2,p2z:0,_siz:3,_sizz:1};
mod_bd25_1[2] = {nam:"BDline2",p1x:0,p1y:0,p1z:0,p2x:0,p2y:-0.5,p2z:-2,_siz:3,_sizz:0.5};
mod_bd25_1[3] = {nam:"BDline3",p1x:1,p1y:0.2,p1z:1,p2x:-1,p2y:0.2,p2z:1,_siz:2.5,_sizz:1};
mod_bd25_1[4] = {nam:"BDline4",p1x:-0.5,p1y:0,p1z:2,p2x:-0.5,p2y:-1,p2z:3.5,_siz:0.2,_sizz:1};
_global.mod_bd25_2 = new Array();
mod_bd25_2[0] = {nam:"BDline0",p1x:0,p1y:0.5,p1z:1,p2x:0,p2y:1.5,p2z:2,_siz:2,_sizz:0.7};
mod_bd25_2[1] = {nam:"BDline1",p1x:0,p1y:-0.5,p1z:1.5,p2x:0,p2y:-1.5,p2z:0.5,_siz:3,_sizz:1};
mod_bd25_2[2] = {nam:"BDline2",p1x:0,p1y:0,p1z:1,p2x:0,p2y:-4,p2z:0,_siz:3,_sizz:0.5};
mod_bd25_2[3] = {nam:"BDline3",p1x:1,p1y:0.5,p1z:0.5,p2x:-1,p2y:0.5,p2z:0.5,_siz:2.5,_sizz:1};
mod_bd25_2[4] = {nam:"BDline4",p1x:-0.5,p1y:1.5,p1z:2,p2x:-0.5,p2y:2,p2z:3.5,_siz:0.2,_sizz:1};
_global.mod_bd26_1 = new Array();
mod_bd26_1[0] = {nam:"BDline0",p1x:0,p1y:-0.5,p1z:2.5,p2x:0,p2y:-0.5,p2z:2.8,_siz:1.5,_sizz:1};
mod_bd26_1[1] = {nam:"BDline1",p1x:0.3,p1y:-1,p1z:0.5,p2x:0,p2y:-0.5,p2z:-2,_siz:3.5,_sizz:0.5};
mod_bd26_1[2] = {nam:"BDline2",p1x:-0.3,p1y:-1,p1z:0.5,p2x:0,p2y:-0.5,p2z:-2,_siz:3.5,_sizz:0.5};
mod_bd26_1[3] = {nam:"BDline3",p1x:1,p1y:0.2,p1z:0.5,p2x:2,p2y:-1.2,p2z:1,_siz:2,_sizz:1.3};
mod_bd26_1[4] = {nam:"BDline4",p1x:-1,p1y:0.2,p1z:0.5,p2x:-2,p2y:-1.2,p2z:1,_siz:2,_sizz:1.3};
mod_bd26_1[5] = {nam:"BDline5",p1x:0.2,p1y:0.2,p1z:2.7,p2x:0.5,p2y:-0.25,p2z:3.8,_siz:0.5,_sizz:0.1};
mod_bd26_1[6] = {nam:"BDline6",p1x:-0.2,p1y:0.2,p1z:2.7,p2x:-0.5,p2y:-0.25,p2z:3.8,_siz:0.5,_sizz:0.1};
mod_bd26_1[7] = {nam:"BDline7",p1x:0.2,p1y:0.2,p1z:2.7,p2x:1.2,p2y:0,p2z:3.2,_siz:0.5,_sizz:0.1};
mod_bd26_1[8] = {nam:"BDline8",p1x:-0.2,p1y:0.2,p1z:2.7,p2x:-1.2,p2y:0,p2z:3.2,_siz:0.5,_sizz:0.1};
_global.mod_bd26_2 = new Array();
mod_bd26_2[0] = {nam:"BDline0",p1x:0,p1y:1,p1z:1.2,p2x:0,p2y:1.2,p2z:1.5,_siz:1.5,_sizz:1};
mod_bd26_2[1] = {nam:"BDline1",p1x:0.3,p1y:-0.5,p1z:1,p2x:0,p2y:-4.5,p2z:-0.5,_siz:3.5,_sizz:0.5};
mod_bd26_2[2] = {nam:"BDline2",p1x:-0.3,p1y:-0.5,p1z:1,p2x:0,p2y:-4.5,p2z:-0.5,_siz:3.5,_sizz:0.5};
mod_bd26_2[3] = {nam:"BDline3",p1x:1,p1y:-1,p1z:0,p2x:2,p2y:-1.5,p2z:1.5,_siz:2,_sizz:1.3};
mod_bd26_2[4] = {nam:"BDline4",p1x:-1,p1y:-1,p1z:0,p2x:-2,p2y:-1.5,p2z:1.5,_siz:2,_sizz:1.3};
mod_bd26_2[5] = {nam:"BDline5",p1x:0.2,p1y:1.8,p1z:1,p2x:0.5,p2y:2.3,p2z:2.1,_siz:0.5,_sizz:0.1};
mod_bd26_2[6] = {nam:"BDline6",p1x:-0.2,p1y:1.8,p1z:1,p2x:-0.5,p2y:2.3,p2z:2.1,_siz:0.5,_sizz:0.1};
mod_bd26_2[7] = {nam:"BDline7",p1x:0.2,p1y:1.75,p1z:1,p2x:1.2,p2y:2,p2z:1.5,_siz:0.5,_sizz:0.1};
mod_bd26_2[8] = {nam:"BDline8",p1x:-0.2,p1y:1.75,p1z:1,p2x:-1.2,p2y:2,p2z:1.5,_siz:0.5,_sizz:0.1};
_global.mod_bd27_1 = new Array();
mod_bd27_1[0] = {nam:"BDline0",p1x:0,p1y:0,p1z:2.5,p2x:0,p2y:-0.5,p2z:2.5,_siz:1.5,_sizz:0.8};
mod_bd27_1[1] = {nam:"BDline1",p1x:1,p1y:-1.5,p1z:1.5,p2x:1,p2y:-1.5,p2z:0,_siz:2.5,_sizz:1};
mod_bd27_1[2] = {nam:"BDline2",p1x:-1,p1y:-1.5,p1z:1.5,p2x:-1,p2y:-1.5,p2z:0,_siz:2.5,_sizz:1};
mod_bd27_1[3] = {nam:"BDline3",p1x:0,p1y:0,p1z:1,p2x:0,p2y:-0.5,p2z:-2,_siz:3,_sizz:0.7};
mod_bd27_1[4] = {nam:"BDline4",p1x:1,p1y:-0.5,p1z:-2,p2x:-1,p2y:-0.5,p2z:-2,_siz:2,_sizz:1};
mod_bd27_1[5] = {nam:"BDline5",p1x:1,p1y:0,p1z:1.2,p2x:-1,p2y:0,p2z:1.2,_siz:2.5,_sizz:1};
mod_bd27_1[6] = {nam:"BDline6",p1x:0.5,p1y:-0.5,p1z:1.2,p2x:0.5,p2y:-0.3,p2z:-1,_siz:2,_sizz:1};
mod_bd27_1[7] = {nam:"BDline7",p1x:-0.5,p1y:-0.5,p1z:1.2,p2x:-0.5,p2y:-0.3,p2z:-1,_siz:2,_sizz:1};
mod_bd27_1[8] = {nam:"BDline8",p1x:0.2,p1y:0.5,p1z:2.5,p2x:1.5,p2y:0.5,p2z:4,_siz:0.5,_sizz:0.1};
mod_bd27_1[9] = {nam:"BDline9",p1x:-0.2,p1y:0.5,p1z:2.5,p2x:-1.5,p2y:0.5,p2z:4,_siz:0.5,_sizz:0.1};
_global.mod_bd27_2 = new Array();
mod_bd27_2[0] = {nam:"BDline0",p1x:0,p1y:1.8,p1z:1.2,p2x:0,p2y:1.3,p2z:1.5,_siz:1.5,_sizz:0.8};
mod_bd27_2[1] = {nam:"BDline1",p1x:1,p1y:0,p1z:2,p2x:1,p2y:-1.5,p2z:1.5,_siz:2.5,_sizz:1};
mod_bd27_2[2] = {nam:"BDline2",p1x:-1,p1y:0,p1z:2,p2x:-1,p2y:-1.5,p2z:1.5,_siz:2.5,_sizz:1};
mod_bd27_2[3] = {nam:"BDline3",p1x:0,p1y:0.5,p1z:1,p2x:0,p2y:-4,p2z:-0.5,_siz:3,_sizz:0.7};
mod_bd27_2[4] = {nam:"BDline4",p1x:1.2,p1y:-4,p1z:-0.5,p2x:-1.2,p2y:-4,p2z:-0.5,_siz:2,_sizz:1};
mod_bd27_2[5] = {nam:"BDline5",p1x:1,p1y:0.5,p1z:0.5,p2x:-1,p2y:0.5,p2z:0.5,_siz:2.5,_sizz:1};
mod_bd27_2[6] = {nam:"BDline6",p1x:0.5,p1y:-0.2,p1z:1,p2x:0.5,p2y:-3.5,p2z:0,_siz:2,_sizz:1};
mod_bd27_2[7] = {nam:"BDline7",p1x:-0.5,p1y:-0.2,p1z:1,p2x:-0.5,p2y:-3.5,p2z:0,_siz:2,_sizz:1};
mod_bd27_2[8] = {nam:"BDline8",p1x:0.2,p1y:2,p1z:0.7,p2x:1.5,p2y:3.5,p2z:1.3,_siz:0.5,_sizz:0.1};
mod_bd27_2[9] = {nam:"BDline9",p1x:-0.2,p1y:2,p1z:0.7,p2x:-1.5,p2y:3.5,p2z:1.3,_siz:0.5,_sizz:0.1};
_global.mod_bd28_1 = new Array();
mod_bd28_1[0] = {nam:"BDline0",p1x:0,p1y:-0.5,p1z:2,p2x:0,p2y:-0.5,p2z:2.5,_siz:1.5,_sizz:1};
mod_bd28_1[1] = {nam:"BDline1",p1x:0,p1y:1.5,p1z:-1.5,p2x:0,p2y:1.5,p2z:-1,_siz:0.75,_sizz:1};
mod_bd28_1[2] = {nam:"BDline2",p1x:0,p1y:0,p1z:-2.5,p2x:0,p2y:1.5,p2z:-1.5,_siz:1.5,_sizz:0.5};
mod_bd28_1[3] = {nam:"BDline3",p1x:0.3,p1y:-1,p1z:0.5,p2x:0,p2y:-0.5,p2z:-2,_siz:3.5,_sizz:0.5};
mod_bd28_1[4] = {nam:"BDline4",p1x:-0.3,p1y:-1,p1z:0.5,p2x:0,p2y:-0.5,p2z:-2,_siz:3.5,_sizz:0.5};
mod_bd28_1[5] = {nam:"BDline5",p1x:1,p1y:0.2,p1z:0.5,p2x:2,p2y:-1.2,p2z:1,_siz:2,_sizz:1.3};
mod_bd28_1[6] = {nam:"BDline6",p1x:-1,p1y:0.2,p1z:0.5,p2x:-2,p2y:-1.2,p2z:1,_siz:2,_sizz:1.3};
_global.mod_bd28_2 = new Array();
mod_bd28_2[0] = {nam:"BDline0",p1x:0,p1y:1,p1z:1,p2x:0,p2y:1,p2z:1.5,_siz:1.5,_sizz:1};
mod_bd28_2[1] = {nam:"BDline1",p1x:0,p1y:-3,p1z:-2,p2x:0,p2y:-2,p2z:-1.8,_siz:0.75,_sizz:1};
mod_bd28_2[2] = {nam:"BDline2",p1x:0,p1y:-4.5,p1z:-1,p2x:0,p2y:-3,p2z:-2,_siz:1.5,_sizz:0.5};
mod_bd28_2[3] = {nam:"BDline3",p1x:0.3,p1y:-0.5,p1z:1,p2x:0,p2y:-4.5,p2z:-0.5,_siz:3.5,_sizz:0.5};
mod_bd28_2[4] = {nam:"BDline4",p1x:-0.3,p1y:-0.5,p1z:1,p2x:0,p2y:-4.5,p2z:-0.5,_siz:3.5,_sizz:0.5};
mod_bd28_2[5] = {nam:"BDline5",p1x:1,p1y:-1,p1z:0,p2x:2,p2y:-1.5,p2z:1.5,_siz:2,_sizz:1.3};
mod_bd28_2[6] = {nam:"BDline6",p1x:-1,p1y:-1,p1z:0,p2x:-2,p2y:-1.5,p2z:1.5,_siz:2,_sizz:1.3};
_global.mod_bd29_1 = new Array();
mod_bd29_1[0] = {nam:"BDline0",p1x:0,p1y:0,p1z:2,p2x:0,p2y:-2.5,p2z:3.5,_siz:2,_sizz:0.2};
mod_bd29_1[1] = {nam:"BDline1",p1x:0,p1y:-1.5,p1z:1,p2x:0,p2y:-1.5,p2z:-3,_siz:4,_sizz:0.1};
mod_bd29_1[2] = {nam:"BDline2",p1x:0,p1y:0,p1z:1,p2x:0,p2y:-0.5,p2z:-2,_siz:3,_sizz:1};
mod_bd29_1[3] = {nam:"BDline3",p1x:1,p1y:0.2,p1z:0.5,p2x:1.5,p2y:-1,p2z:1.5,_siz:2,_sizz:1};
mod_bd29_1[4] = {nam:"BDline4",p1x:-1,p1y:0.2,p1z:0.5,p2x:-1.5,p2y:-1,p2z:1.5,_siz:2,_sizz:1};
mod_bd29_1[5] = {nam:"BDline5",p1x:1.5,p1y:-2,p1z:-2,p2x:0,p2y:-3,p2z:-6,_siz:3,_sizz:0.2};
mod_bd29_1[6] = {nam:"BDline6",p1x:-1.5,p1y:-2,p1z:-2,p2x:0,p2y:-3,p2z:-6,_siz:3,_sizz:0.2};
mod_bd29_1[7] = {nam:"BDline7",p1x:0,p1y:0.5,p1z:2.5,p2x:0,p2y:-1.5,p2z:4.5,_siz:0.5,_sizz:0.1};
mod_bd29_1[8] = {nam:"BDline8",p1x:-1.5,p1y:-2,p1z:1.5,p2x:-3.5,p2y:-5,p2z:-4,_siz:1,_sizz:0.5};
mod_bd29_1[9] = {nam:"BDline9",p1x:1.5,p1y:-2,p1z:1.5,p2x:3.5,p2y:-5,p2z:-4,_siz:1,_sizz:0.5};
_global.mod_bd29_2 = new Array();
mod_bd29_2[0] = {nam:"BDline0",p1x:0,p1y:2,p1z:1.5,p2x:0,p2y:0,p2z:4,_siz:2,_sizz:0.2};
mod_bd29_2[1] = {nam:"BDline1",p1x:0,p1y:0,p1z:1.5,p2x:0,p2y:-4.5,p2z:1,_siz:4,_sizz:0.1};
mod_bd29_2[2] = {nam:"BDline2",p1x:0,p1y:1,p1z:0.7,p2x:0,p2y:-4,p2z:-0.3,_siz:3,_sizz:1};
mod_bd29_2[3] = {nam:"BDline3",p1x:1,p1y:0.5,p1z:1,p2x:1.5,p2y:0.5,p2z:2,_siz:2,_sizz:1};
mod_bd29_2[4] = {nam:"BDline4",p1x:-1,p1y:0.5,p1z:1,p2x:-1.5,p2y:0.5,p2z:2,_siz:2,_sizz:1};
mod_bd29_2[5] = {nam:"BDline5",p1x:1.5,p1y:-3.7,p1z:0.5,p2x:0,p2y:-8.5,p2z:1,_siz:3,_sizz:0.2};
mod_bd29_2[6] = {nam:"BDline6",p1x:-1.5,p1y:-3.7,p1z:0.5,p2x:0,p2y:-8.5,p2z:1,_siz:3,_sizz:0.2};
mod_bd29_2[7] = {nam:"BDline7",p1x:0,p1y:1.5,p1z:1.5,p2x:0,p2y:1.5,p2z:4.5,_siz:0.5,_sizz:0.1};
mod_bd29_2[8] = {nam:"BDline8",p1x:1.5,p1y:-1,p1z:2.5,p2x:3.5,p2y:-6,p2z:4,_siz:1,_sizz:0.5};
mod_bd29_2[9] = {nam:"BDline9",p1x:-1.5,p1y:-1,p1z:2.5,p2x:-3.5,p2y:-6,p2z:4,_siz:1,_sizz:0.5};
_global.mod_bd30_1 = new Array();
mod_bd30_1[0] = {nam:"BDline0",p1x:0,p1y:-0.2,p1z:2.2,p2x:0,p2y:-0.5,p2z:2.5,_siz:1.5,_sizz:1};
mod_bd30_1[1] = {nam:"BDline1",p1x:0,p1y:-1,p1z:1,p2x:0,p2y:-1,p2z:-1,_siz:3.5,_sizz:0.2};
mod_bd30_1[2] = {nam:"BDline2",p1x:0,p1y:0,p1z:1,p2x:0,p2y:-0.5,p2z:-2,_siz:2,_sizz:1.8};
mod_bd30_1[3] = {nam:"BDline3",p1x:1,p1y:0.5,p1z:1,p2x:1.5,p2y:-1,p2z:1.5,_siz:2,_sizz:1};
mod_bd30_1[4] = {nam:"BDline4",p1x:-1,p1y:0.5,p1z:1,p2x:-1.5,p2y:-1,p2z:1.5,_siz:2,_sizz:1};
mod_bd30_1[5] = {nam:"BDline5",p1x:0,p1y:0.2,p1z:2.5,p2x:0,p2y:-0.5,p2z:4.5,_siz:0.4,_sizz:0.1};
_global.mod_bd30_2 = new Array();
mod_bd30_2[0] = {nam:"BDline0",p1x:0,p1y:0.7,p1z:1.5,p2x:0,p2y:1,p2z:1.5,_siz:1.5,_sizz:1};
mod_bd30_2[1] = {nam:"BDline1",p1x:0,p1y:-0.5,p1z:1.5,p2x:0,p2y:-4.5,p2z:0,_siz:3.5,_sizz:0.2};
mod_bd30_2[2] = {nam:"BDline2",p1x:0,p1y:0,p1z:0.5,p2x:0,p2y:-4,p2z:0,_siz:2,_sizz:1.8};
mod_bd30_2[3] = {nam:"BDline3",p1x:1,p1y:0,p1z:0,p2x:1.5,p2y:0,p2z:2,_siz:2,_sizz:1};
mod_bd30_2[4] = {nam:"BDline4",p1x:-1,p1y:0,p1z:0,p2x:-1.5,p2y:0,p2z:2,_siz:2,_sizz:1};
mod_bd30_2[5] = {nam:"BDline5",p1x:0,p1y:1.2,p1z:1,p2x:0,p2y:3.2,p2z:2,_siz:0.4,_sizz:0.1};
_global.mod_bd31_1 = new Array();
mod_bd31_1[0] = {nam:"BDline0",p1x:1,p1y:0,p1z:1.2,p2x:-1,p2y:0,p2z:1.2,_siz:2.5,_sizz:1};
mod_bd31_1[1] = {nam:"BDline1",p1x:1,p1y:-1.2,p1z:1.2,p2x:0.8,p2y:-0.5,p2z:-1,_siz:2.5,_sizz:1};
mod_bd31_1[2] = {nam:"BDline2",p1x:-1,p1y:-1.2,p1z:1.2,p2x:-0.8,p2y:-0.5,p2z:-1,_siz:2.5,_sizz:1};
mod_bd31_1[3] = {nam:"BDline3",p1x:0,p1y:0,p1z:1,p2x:0,p2y:-0.5,p2z:-2,_siz:3,_sizz:0.7};
mod_bd31_1[4] = {nam:"BDline4",p1x:1.2,p1y:-0.5,p1z:-2,p2x:-1.2,p2y:-0.5,p2z:-2,_siz:2,_sizz:1};
_global.mod_bd31_2 = new Array();
mod_bd31_2[0] = {nam:"BDline0",p1x:1,p1y:0.5,p1z:0.5,p2x:-1,p2y:0.5,p2z:0.5,_siz:2.5,_sizz:1};
mod_bd31_2[1] = {nam:"BDline1",p1x:1,p1y:-0.2,p1z:1.9,p2x:0.8,p2y:-3,p2z:0.5,_siz:2.5,_sizz:1};
mod_bd31_2[2] = {nam:"BDline2",p1x:-1,p1y:-0.2,p1z:1.9,p2x:-0.8,p2y:-3,p2z:0.5,_siz:2.5,_sizz:1};
mod_bd31_2[3] = {nam:"BDline3",p1x:0,p1y:0.5,p1z:1,p2x:0,p2y:-4,p2z:-0.5,_siz:3,_sizz:0.7};
mod_bd31_2[4] = {nam:"BDline4",p1x:1.2,p1y:-4,p1z:-0.5,p2x:-1.2,p2y:-4,p2z:-0.5,_siz:2,_sizz:1};
_global.mod_Slg1_1 = new Array();
mod_Slg1_1[0] = {nam:"LGline0",p1x:3,p1y:-1.5,p1z:-9,p2x:2,p2y:-0.75,p2z:-4.5,_siz:4.5,_sizz:0.4};
mod_Slg1_1[1] = {nam:"LGline1",p1x:-3,p1y:-1.5,p1z:-9,p2x:-2,p2y:-0.75,p2z:-4.5,_siz:4.5,_sizz:0.4};
_global.mod_Slg1_2 = new Array();
mod_Slg1_2[0] = {nam:"LGline0",p1x:3,p1y:-4.5,p1z:-7.5,p2x:2,p2y:-0.75,p2z:-4.5,_siz:4.5,_sizz:0.4};
mod_Slg1_2[1] = {nam:"LGline1",p1x:-3,p1y:-4.5,p1z:-7.5,p2x:-2,p2y:-0.75,p2z:-4.5,_siz:4.5,_sizz:0.4};
_global.mod_Slg1_3 = new Array();
mod_Slg1_3[0] = {nam:"LGline0",p1x:3,p1y:1.5,p1z:-7.5,p2x:2,p2y:-0.75,p2z:-4.5,_siz:4.5,_sizz:0.4};
mod_Slg1_3[1] = {nam:"LGline1",p1x:-3,p1y:1.5,p1z:-7.5,p2x:-2,p2y:-0.75,p2z:-4.5,_siz:4.5,_sizz:0.4};
_global.mod_Slg1_4 = new Array();
mod_Slg1_4[0] = {nam:"LGline0",p1x:5.75,p1y:-1.5,p1z:-7.5,p2x:2,p2y:-0.75,p2z:-4.5,_siz:4.5,_sizz:0.4};
mod_Slg1_4[1] = {nam:"LGline1",p1x:-1.25,p1y:-1.5,p1z:-9,p2x:-2,p2y:-0.75,p2z:-4.5,_siz:4.5,_sizz:0.4};
_global.mod_Slg1_5 = new Array();
mod_Slg1_5[0] = {nam:"LGline0",p1x:1.25,p1y:-1.5,p1z:-9,p2x:2,p2y:-0.75,p2z:-4.5,_siz:4.5,_sizz:0.4};
mod_Slg1_5[1] = {nam:"LGline1",p1x:-5.75,p1y:-1.5,p1z:-7.5,p2x:-2,p2y:-0.75,p2z:-4.5,_siz:4.5,_sizz:0.4};
_global.mod_Slg2_1 = new Array();
mod_Slg2_1[0] = {nam:"LGline0",p1x:1,p1y:-0.5,p1z:-2,p2x:3,p2y:-0.5,p2z:-7.5,_siz:2.5,_sizz:0.8};
mod_Slg2_1[1] = {nam:"LGline1",p1x:-1,p1y:-0.5,p1z:-2,p2x:-3,p2y:-0.5,p2z:-7.5,_siz:2.5,_sizz:0.8};
mod_Slg2_1[2] = {nam:"LGline2",p1x:4,p1y:-2,p1z:-12,p2x:3,p2y:-0.5,p2z:-7.5,_siz:4,_sizz:0.7};
mod_Slg2_1[3] = {nam:"LGline3",p1x:-4,p1y:-2,p1z:-12,p2x:-3,p2y:-0.5,p2z:-7.5,_siz:4,_sizz:0.7};
_global.mod_Slg2_2 = new Array();
mod_Slg2_2[0] = {nam:"LGline0",p1x:1,p1y:-4,p1z:-0.5,p2x:3,p2y:-9,p2z:-1,_siz:2.5,_sizz:0.8};
mod_Slg2_2[1] = {nam:"LGline1",p1x:-1,p1y:-4,p1z:-0.5,p2x:-3,p2y:-9,p2z:-1,_siz:2.5,_sizz:0.8};
mod_Slg2_2[2] = {nam:"LGline2",p1x:4,p1y:-15,p1z:-1,p2x:3,p2y:-9,p2z:-1,_siz:4,_sizz:0.7};
mod_Slg2_2[3] = {nam:"LGline3",p1x:-4,p1y:-15,p1z:-1,p2x:-3,p2y:-9,p2z:-1,_siz:4,_sizz:0.7};
_global.mod_Slg2_3 = new Array();
mod_Slg2_3[0] = {nam:"LGline0",p1x:1,p1y:0.5,p1z:-3,p2x:3,p2y:4.5,p2z:-4,_siz:2.5,_sizz:0.8};
mod_Slg2_3[1] = {nam:"LGline1",p1x:-1,p1y:0.5,p1z:-3,p2x:-3,p2y:4.5,p2z:-4,_siz:2.5,_sizz:0.8};
mod_Slg2_3[2] = {nam:"LGline2",p1x:4.5,p1y:8.5,p1z:-7.5,p2x:3,p2y:4.5,p2z:-4,_siz:4,_sizz:0.7};
mod_Slg2_3[3] = {nam:"LGline3",p1x:-4.5,p1y:8.5,p1z:-7.5,p2x:-3,p2y:4.5,p2z:-4,_siz:4,_sizz:0.7};
_global.mod_Slg2_4 = new Array();
mod_Slg2_4[0] = {nam:"LGline0",p1x:-0.5,p1y:-0.5,p1z:-2,p2x:0,p2y:-0.5,p2z:-7.8,_siz:2.5,_sizz:0.8};
mod_Slg2_4[1] = {nam:"LGline1",p1x:1.5,p1y:-0.5,p1z:-2,p2x:4,p2y:-0.5,p2z:-6.8,_siz:2.5,_sizz:0.8};
mod_Slg2_4[2] = {nam:"LGline2",p1x:0.5,p1y:-1,p1z:-13,p2x:0,p2y:-0.5,p2z:-7.8,_siz:4,_sizz:0.7};
mod_Slg2_4[3] = {nam:"LGline3",p1x:6.5,p1y:-1,p1z:-11,p2x:4,p2y:-0.5,p2z:-6.8,_siz:4,_sizz:0.7};
_global.mod_Slg2_5 = new Array();
mod_Slg2_5[0] = {nam:"LGline0",p1x:-1.5,p1y:-0.5,p1z:-2,p2x:-4,p2y:-0.5,p2z:-7,_siz:2.5,_sizz:0.8};
mod_Slg2_5[1] = {nam:"LGline1",p1x:0.5,p1y:-0.5,p1z:-2,p2x:0,p2y:-0.5,p2z:-7.8,_siz:2.5,_sizz:0.8};
mod_Slg2_5[2] = {nam:"LGline2",p1x:-6.5,p1y:-1,p1z:-11,p2x:-4,p2y:-0.5,p2z:-7,_siz:4,_sizz:0.7};
mod_Slg2_5[3] = {nam:"LGline3",p1x:-0.5,p1y:-1,p1z:-13,p2x:0,p2y:-0.5,p2z:-7.8,_siz:4,_sizz:0.7};
_global.mod_lg1_1 = new Array();
mod_lg1_1[0] = {nam:"LGline0",p1x:1,p1y:-0.5,p1z:-2,p2x:2,p2y:-0.5,p2z:-5.5,_siz:1.5,_sizz:0.8};
mod_lg1_1[1] = {nam:"LGline1",p1x:-1,p1y:-0.5,p1z:-2,p2x:-2,p2y:-0.5,p2z:-5.5,_siz:1.5,_sizz:0.8};
mod_lg1_1[2] = {nam:"LGline2",p1x:2.5,p1y:-2,p1z:-9,p2x:2,p2y:-0.5,p2z:-5.5,_siz:2.5,_sizz:0.8};
mod_lg1_1[3] = {nam:"LGline3",p1x:-2.5,p1y:-2,p1z:-9,p2x:-2,p2y:-0.5,p2z:-5.5,_siz:2.5,_sizz:0.8};
_global.mod_lg1_2 = new Array();
mod_lg1_2[0] = {nam:"LGline0",p1x:1,p1y:-4,p1z:-0.5,p2x:2,p2y:-7.5,p2z:-1,_siz:1.5,_sizz:0.8};
mod_lg1_2[1] = {nam:"LGline1",p1x:-1,p1y:-4,p1z:-0.5,p2x:-2,p2y:-7.5,p2z:-1,_siz:1.5,_sizz:0.8};
mod_lg1_2[2] = {nam:"LGline2",p1x:2.5,p1y:-12.5,p1z:-1,p2x:2,p2y:-7.5,p2z:-1,_siz:2.5,_sizz:0.8};
mod_lg1_2[3] = {nam:"LGline3",p1x:-2.5,p1y:-12.5,p1z:-1,p2x:-2,p2y:-7.5,p2z:-1,_siz:2.5,_sizz:0.8};
_global.mod_lg1_3 = new Array();
mod_lg1_3[0] = {nam:"LGline0",p1x:1,p1y:0.5,p1z:-2,p2x:2,p2y:2.5,p2z:-4,_siz:1.5,_sizz:0.8};
mod_lg1_3[1] = {nam:"LGline1",p1x:-1,p1y:0.5,p1z:-2,p2x:-2,p2y:2.5,p2z:-4,_siz:1.5,_sizz:0.8};
mod_lg1_3[2] = {nam:"LGline2",p1x:3,p1y:4.5,p1z:-7.5,p2x:2,p2y:2.5,p2z:-4,_siz:2.5,_sizz:0.8};
mod_lg1_3[3] = {nam:"LGline3",p1x:-3,p1y:4.5,p1z:-7.5,p2x:-2,p2y:2.5,p2z:-4,_siz:2.5,_sizz:0.8};
_global.mod_lg1_4 = new Array();
mod_lg1_4[0] = {nam:"LGline0",p1x:-0.5,p1y:-0.5,p1z:-2,p2x:0,p2y:-0.5,p2z:-5.8,_siz:1.5,_sizz:0.8};
mod_lg1_4[1] = {nam:"LGline1",p1x:1.5,p1y:-0.5,p1z:-2,p2x:3,p2y:-0.5,p2z:-5,_siz:1.5,_sizz:0.8};
mod_lg1_4[2] = {nam:"LGline2",p1x:0.5,p1y:-1,p1z:-10,p2x:0,p2y:-0.5,p2z:-5.8,_siz:2.5,_sizz:0.8};
mod_lg1_4[3] = {nam:"LGline3",p1x:5.5,p1y:-1,p1z:-9,p2x:3,p2y:-0.5,p2z:-5,_siz:2.5,_sizz:0.8};
_global.mod_lg1_5 = new Array();
mod_lg1_5[0] = {nam:"LGline0",p1x:-1.5,p1y:-0.5,p1z:-2,p2x:-3,p2y:-0.5,p2z:-5,_siz:1.5,_sizz:0.8};
mod_lg1_5[1] = {nam:"LGline1",p1x:0.5,p1y:-0.5,p1z:-2,p2x:0,p2y:-0.5,p2z:-5.8,_siz:1.5,_sizz:0.8};
mod_lg1_5[2] = {nam:"LGline2",p1x:-5.5,p1y:-1,p1z:-9,p2x:-3,p2y:-0.5,p2z:-5,_siz:2.5,_sizz:0.8};
mod_lg1_5[3] = {nam:"LGline3",p1x:-0.5,p1y:-1,p1z:-10,p2x:0,p2y:-0.5,p2z:-5.8,_siz:2.5,_sizz:0.8};
_global.mod_lg2_1 = new Array();
mod_lg2_1[0] = {nam:"LGline0",p1x:1,p1y:-0.5,p1z:-2,p2x:2,p2y:-0.5,p2z:-5.5,_siz:1.8,_sizz:0.8};
mod_lg2_1[1] = {nam:"LGline1",p1x:-1,p1y:-0.5,p1z:-2,p2x:-2,p2y:-0.5,p2z:-5.5,_siz:1.8,_sizz:0.8};
mod_lg2_1[2] = {nam:"LGline2",p1x:2.5,p1y:-2,p1z:-9,p2x:2,p2y:-0.5,p2z:-5.5,_siz:4.5,_sizz:0.6};
mod_lg2_1[3] = {nam:"LGline3",p1x:-2.5,p1y:-2,p1z:-9,p2x:-2,p2y:-0.5,p2z:-5.5,_siz:4.5,_sizz:0.6};
_global.mod_lg2_2 = new Array();
mod_lg2_2[0] = {nam:"LGline0",p1x:1,p1y:-4,p1z:-0.5,p2x:2,p2y:-7.5,p2z:-1,_siz:1.8,_sizz:0.8};
mod_lg2_2[1] = {nam:"LGline1",p1x:-1,p1y:-4,p1z:-0.5,p2x:-2,p2y:-7.5,p2z:-1,_siz:1.8,_sizz:0.8};
mod_lg2_2[2] = {nam:"LGline2",p1x:2.5,p1y:-12,p1z:-1,p2x:2,p2y:-7.5,p2z:-1,_siz:4.5,_sizz:0.6};
mod_lg2_2[3] = {nam:"LGline3",p1x:-2.5,p1y:-12,p1z:-1,p2x:-2,p2y:-7.5,p2z:-1,_siz:4.5,_sizz:0.6};
_global.mod_lg2_3 = new Array();
mod_lg2_3[0] = {nam:"LGline0",p1x:1,p1y:0.5,p1z:-2,p2x:2,p2y:2.5,p2z:-4,_siz:1.8,_sizz:0.8};
mod_lg2_3[1] = {nam:"LGline1",p1x:-1,p1y:0.5,p1z:-2,p2x:-2,p2y:2.5,p2z:-4,_siz:1.8,_sizz:0.8};
mod_lg2_3[2] = {nam:"LGline2",p1x:3,p1y:4.5,p1z:-7.5,p2x:2,p2y:2.5,p2z:-4,_siz:4.5,_sizz:0.6};
mod_lg2_3[3] = {nam:"LGline3",p1x:-3,p1y:4.5,p1z:-7.5,p2x:-2,p2y:2.5,p2z:-4,_siz:4.5,_sizz:0.6};
_global.mod_lg2_4 = new Array();
mod_lg2_4[0] = {nam:"LGline0",p1x:-0.5,p1y:-0.5,p1z:-2,p2x:0,p2y:-0.5,p2z:-5.8,_siz:1.8,_sizz:0.8};
mod_lg2_4[1] = {nam:"LGline1",p1x:1.5,p1y:-0.5,p1z:-2,p2x:3,p2y:-0.5,p2z:-5,_siz:1.8,_sizz:0.8};
mod_lg2_4[2] = {nam:"LGline2",p1x:0.5,p1y:-1,p1z:-10,p2x:0,p2y:-0.5,p2z:-5.8,_siz:4.5,_sizz:0.6};
mod_lg2_4[3] = {nam:"LGline3",p1x:5.5,p1y:-1,p1z:-9,p2x:3,p2y:-0.5,p2z:-5,_siz:4.5,_sizz:0.6};
_global.mod_lg2_5 = new Array();
mod_lg2_5[0] = {nam:"LGline0",p1x:-1.5,p1y:-0.5,p1z:-2,p2x:-3,p2y:-0.5,p2z:-5,_siz:1.8,_sizz:0.8};
mod_lg2_5[1] = {nam:"LGline1",p1x:0.5,p1y:-0.5,p1z:-2,p2x:0,p2y:-0.5,p2z:-5.8,_siz:1.8,_sizz:0.8};
mod_lg2_5[2] = {nam:"LGline2",p1x:-5.5,p1y:-1,p1z:-9,p2x:-3,p2y:-0.5,p2z:-5,_siz:4.5,_sizz:0.6};
mod_lg2_5[3] = {nam:"LGline3",p1x:-0.5,p1y:-1,p1z:-10,p2x:0,p2y:-0.5,p2z:-5.8,_siz:4.5,_sizz:0.6};
_global.mod_lg3_1 = new Array();
mod_lg3_1[0] = {nam:"LGline0",p1x:1,p1y:-0.5,p1z:-2,p2x:2,p2y:-0.5,p2z:-5,_siz:2,_sizz:0.8};
mod_lg3_1[1] = {nam:"LGline1",p1x:-1,p1y:-0.5,p1z:-2,p2x:-2,p2y:-0.5,p2z:-5,_siz:2,_sizz:0.8};
mod_lg3_1[2] = {nam:"LGline2",p1x:2.5,p1y:-2,p1z:-10,p2x:2,p2y:-0.5,p2z:-5,_siz:3,_sizz:0.5};
mod_lg3_1[3] = {nam:"LGline3",p1x:-2.5,p1y:-2,p1z:-10,p2x:-2,p2y:-0.5,p2z:-5,_siz:3,_sizz:0.5};
_global.mod_lg3_2 = new Array();
mod_lg3_2[0] = {nam:"LGline0",p1x:1,p1y:-4.5,p1z:-0.5,p2x:2,p2y:-7.5,p2z:-1,_siz:2,_sizz:0.8};
mod_lg3_2[1] = {nam:"LGline1",p1x:-1,p1y:-4.5,p1z:-0.5,p2x:-2,p2y:-7.5,p2z:-1,_siz:2,_sizz:0.8};
mod_lg3_2[2] = {nam:"LGline2",p1x:2.5,p1y:-13,p1z:-1,p2x:2,p2y:-7.5,p2z:-1,_siz:3,_sizz:0.5};
mod_lg3_2[3] = {nam:"LGline3",p1x:-2.5,p1y:-13,p1z:-1,p2x:-2,p2y:-7.5,p2z:-1,_siz:3,_sizz:0.5};
_global.mod_lg3_3 = new Array();
mod_lg3_3[0] = {nam:"LGline0",p1x:1,p1y:0.5,p1z:-2,p2x:2,p2y:2.5,p2z:-4,_siz:2,_sizz:0.8};
mod_lg3_3[1] = {nam:"LGline1",p1x:-1,p1y:0.5,p1z:-2,p2x:-2,p2y:2.5,p2z:-4,_siz:2,_sizz:0.8};
mod_lg3_3[2] = {nam:"LGline2",p1x:3,p1y:5,p1z:-8,p2x:2,p2y:2.5,p2z:-4,_siz:3,_sizz:0.5};
mod_lg3_3[3] = {nam:"LGline3",p1x:-3,p1y:5,p1z:-8,p2x:-2,p2y:2.5,p2z:-4,_siz:3,_sizz:0.5};
_global.mod_lg3_4 = new Array();
mod_lg3_4[0] = {nam:"LGline0",p1x:-0.5,p1y:-0.5,p1z:-2,p2x:0,p2y:-0.5,p2z:-5.8,_siz:2,_sizz:0.8};
mod_lg3_4[1] = {nam:"LGline1",p1x:1.5,p1y:-0.5,p1z:-2,p2x:3,p2y:-0.5,p2z:-5,_siz:2,_sizz:0.8};
mod_lg3_4[2] = {nam:"LGline2",p1x:0.5,p1y:-1,p1z:-10,p2x:0,p2y:-0.5,p2z:-5.8,_siz:3,_sizz:0.5};
mod_lg3_4[3] = {nam:"LGline3",p1x:5.5,p1y:-1,p1z:-9,p2x:3,p2y:-0.5,p2z:-5,_siz:3,_sizz:0.5};
_global.mod_lg3_5 = new Array();
mod_lg3_5[0] = {nam:"LGline0",p1x:0.5,p1y:-0.5,p1z:-2,p2x:0,p2y:-0.5,p2z:-5.8,_siz:2,_sizz:0.8};
mod_lg3_5[1] = {nam:"LGline1",p1x:-1.5,p1y:-0.5,p1z:-2,p2x:-3,p2y:-0.5,p2z:-5,_siz:2,_sizz:0.8};
mod_lg3_5[2] = {nam:"LGline2",p1x:-0.5,p1y:-1,p1z:-10,p2x:0,p2y:-0.5,p2z:-5.8,_siz:3,_sizz:0.5};
mod_lg3_5[3] = {nam:"LGline3",p1x:-5.5,p1y:-1,p1z:-9,p2x:-3,p2y:-0.5,p2z:-5,_siz:3,_sizz:0.5};
_global.mod_lg4_1 = new Array();
mod_lg4_1[0] = {nam:"LGline0",p1x:1,p1y:-0.5,p1z:-2,p2x:2,p2y:-0.5,p2z:-4,_siz:1.5,_sizz:1.5};
mod_lg4_1[1] = {nam:"LGline1",p1x:-1,p1y:-0.5,p1z:-2,p2x:-2,p2y:-0.5,p2z:-4,_siz:1.5,_sizz:1.52};
mod_lg4_1[2] = {nam:"LGline2",p1x:2.5,p1y:-2,p1z:-7,p2x:2,p2y:-0.5,p2z:-4,_siz:4,_sizz:0.4};
mod_lg4_1[3] = {nam:"LGline3",p1x:-2.5,p1y:-2,p1z:-7,p2x:-2,p2y:-0.5,p2z:-4,_siz:4,_sizz:0.4};
_global.mod_lg4_2 = new Array();
mod_lg4_2[0] = {nam:"LGline0",p1x:1,p1y:-4.5,p1z:-0.5,p2x:2,p2y:-6,p2z:-1,_siz:1.5,_sizz:1.5};
mod_lg4_2[1] = {nam:"LGline1",p1x:-1,p1y:-4.5,p1z:-0.5,p2x:-2,p2y:-6,p2z:-1,_siz:1.5,_sizz:1.5};
mod_lg4_2[2] = {nam:"LGline2",p1x:2.5,p1y:-10,p1z:-1,p2x:2,p2y:-6,p2z:-1,_siz:4,_sizz:0.4};
mod_lg4_2[3] = {nam:"LGline3",p1x:-2.5,p1y:-10,p1z:-1,p2x:-2,p2y:-6,p2z:-1,_siz:4,_sizz:0.4};
_global.mod_lg4_3 = new Array();
mod_lg4_3[0] = {nam:"LGline0",p1x:1,p1y:0.5,p1z:-2.5,p2x:2,p2y:2,p2z:-3,_siz:1.5,_sizz:1.5};
mod_lg4_3[1] = {nam:"LGline1",p1x:-1,p1y:0.5,p1z:-2.5,p2x:-2,p2y:2,p2z:-3,_siz:1.5,_sizz:1.5};
mod_lg4_3[2] = {nam:"LGline2",p1x:3,p1y:4,p1z:-5,p2x:2,p2y:2,p2z:-3,_siz:4,_sizz:0.4};
mod_lg4_3[3] = {nam:"LGline3",p1x:-3,p1y:4,p1z:-5,p2x:-2,p2y:2,p2z:-3,_siz:4,_sizz:0.4};
_global.mod_lg4_4 = new Array();
mod_lg4_4[0] = {nam:"LGline0",p1x:-0.5,p1y:-0.5,p1z:-2,p2x:0,p2y:-0.5,p2z:-4.8,_siz:1.5,_sizz:1.5};
mod_lg4_4[1] = {nam:"LGline1",p1x:1.5,p1y:-0.5,p1z:-2,p2x:3,p2y:-0.5,p2z:-4,_siz:1.5,_sizz:1.5};
mod_lg4_4[2] = {nam:"LGline2",p1x:0.5,p1y:-1,p1z:-8,p2x:0,p2y:-0.5,p2z:-4.8,_siz:4,_sizz:0.4};
mod_lg4_4[3] = {nam:"LGline3",p1x:4.5,p1y:-1,p1z:-7,p2x:3,p2y:-0.5,p2z:-4,_siz:4,_sizz:0.4};
_global.mod_lg4_5 = new Array();
mod_lg4_5[0] = {nam:"LGline0",p1x:0.5,p1y:-0.5,p1z:-2,p2x:0,p2y:-0.5,p2z:-4.8,_siz:1.5,_sizz:1.5};
mod_lg4_5[1] = {nam:"LGline1",p1x:-1.5,p1y:-0.5,p1z:-2,p2x:-3,p2y:-0.5,p2z:-4,_siz:1.5,_sizz:1.5};
mod_lg4_5[2] = {nam:"LGline2",p1x:-0.5,p1y:-1,p1z:-8,p2x:0,p2y:-0.5,p2z:-4.8,_siz:4,_sizz:0.4};
mod_lg4_5[3] = {nam:"LGline3",p1x:-4.5,p1y:-1,p1z:-7,p2x:-3,p2y:-0.5,p2z:-4,_siz:4,_sizz:0.4};
_global.mod_lg5_1 = new Array();
mod_lg5_1[0] = {nam:"LGline0",p1x:1,p1y:-0.5,p1z:-2,p2x:2,p2y:-0.5,p2z:-5.5,_siz:2,_sizz:0.8};
mod_lg5_1[1] = {nam:"LGline1",p1x:-1,p1y:-0.5,p1z:-2,p2x:-2,p2y:-0.5,p2z:-5.5,_siz:2,_sizz:0.8};
mod_lg5_1[2] = {nam:"LGline2",p1x:2.5,p1y:-2,p1z:-9,p2x:2,p2y:-0.5,p2z:-5.5,_siz:3.5,_sizz:0.6};
mod_lg5_1[3] = {nam:"LGline3",p1x:-2.5,p1y:-2,p1z:-9,p2x:-2,p2y:-0.5,p2z:-5.5,_siz:3.5,_sizz:0.6};
_global.mod_lg5_2 = new Array();
mod_lg5_2[0] = {nam:"LGline0",p1x:1,p1y:-4.5,p1z:-0.5,p2x:2,p2y:-7,p2z:-1,_siz:2,_sizz:0.8};
mod_lg5_2[1] = {nam:"LGline1",p1x:-1,p1y:-4.5,p1z:-0.5,p2x:-2,p2y:-7,p2z:-1,_siz:2,_sizz:0.8};
mod_lg5_2[2] = {nam:"LGline2",p1x:2.5,p1y:-12,p1z:-1,p2x:2,p2y:-7,p2z:-1,_siz:3.5,_sizz:0.6};
mod_lg5_2[3] = {nam:"LGline3",p1x:-2.5,p1y:-12,p1z:-1,p2x:-2,p2y:-7,p2z:-1,_siz:3.5,_sizz:0.6};
_global.mod_lg5_3 = new Array();
mod_lg5_3[0] = {nam:"LGline0",p1x:1,p1y:0.5,p1z:-2.5,p2x:2,p2y:2.7,p2z:-4.3,_siz:2,_sizz:0.8};
mod_lg5_3[1] = {nam:"LGline1",p1x:-1,p1y:0.5,p1z:-2.5,p2x:-2,p2y:2.7,p2z:-4.3,_siz:2,_sizz:0.8};
mod_lg5_3[2] = {nam:"LGline2",p1x:3,p1y:5,p1z:-8,p2x:2,p2y:2.7,p2z:-4.3,_siz:3.5,_sizz:0.6};
mod_lg5_3[3] = {nam:"LGline3",p1x:-3,p1y:5,p1z:-8,p2x:-2,p2y:2.7,p2z:-4.3,_siz:3.5,_sizz:0.6};
_global.mod_lg5_4 = new Array();
mod_lg5_4[0] = {nam:"LGline0",p1x:-0.5,p1y:-0.5,p1z:-2,p2x:0,p2y:-0.5,p2z:-6,_siz:2,_sizz:0.8};
mod_lg5_4[1] = {nam:"LGline1",p1x:1.5,p1y:-0.5,p1z:-2,p2x:3,p2y:-0.5,p2z:-5.2,_siz:2,_sizz:0.8};
mod_lg5_4[2] = {nam:"LGline2",p1x:0.5,p1y:-1,p1z:-10,p2x:0,p2y:-0.5,p2z:-6,_siz:3.5,_sizz:0.6};
mod_lg5_4[3] = {nam:"LGline3",p1x:5.5,p1y:-1,p1z:-9,p2x:3,p2y:-0.5,p2z:-5.2,_siz:3.5,_sizz:0.6};
_global.mod_lg5_5 = new Array();
mod_lg5_5[0] = {nam:"LGline0",p1x:0.5,p1y:-0.5,p1z:-2,p2x:0,p2y:-0.5,p2z:-6,_siz:2,_sizz:0.8};
mod_lg5_5[1] = {nam:"LGline1",p1x:-1.5,p1y:-0.5,p1z:-2,p2x:-3,p2y:-0.5,p2z:-5.2,_siz:2,_sizz:0.8};
mod_lg5_5[2] = {nam:"LGline2",p1x:-0.5,p1y:-1,p1z:-10,p2x:0,p2y:-0.5,p2z:-6,_siz:3.5,_sizz:0.6};
mod_lg5_5[3] = {nam:"LGline3",p1x:-5.5,p1y:-1,p1z:-9,p2x:-3,p2y:-0.5,p2z:-5.2,_siz:3.5,_sizz:0.6};
_global.mod_lg6_1 = new Array();
mod_lg6_1[0] = {nam:"LGline0",p1x:1,p1y:-0.5,p1z:-2,p2x:2,p2y:-0.5,p2z:-5.5,_siz:2,_sizz:1};
mod_lg6_1[1] = {nam:"LGline1",p1x:-1,p1y:-0.5,p1z:-2,p2x:-2,p2y:-0.5,p2z:-5.5,_siz:2,_sizz:1};
mod_lg6_1[2] = {nam:"LGline2",p1x:2.5,p1y:-2,p1z:-9,p2x:2,p2y:-0.5,p2z:-5.5,_siz:2.5,_sizz:0.8};
mod_lg6_1[3] = {nam:"LGline3",p1x:-2.5,p1y:-2,p1z:-9,p2x:-2,p2y:-0.5,p2z:-5.5,_siz:2.5,_sizz:0.8};
_global.mod_lg6_2 = new Array();
mod_lg6_2[0] = {nam:"LGline0",p1x:1,p1y:-4,p1z:-0.5,p2x:2,p2y:-7.5,p2z:-1,_siz:2,_sizz:1};
mod_lg6_2[1] = {nam:"LGline1",p1x:-1,p1y:-4,p1z:-0.5,p2x:-2,p2y:-7.5,p2z:-1,_siz:2,_sizz:1};
mod_lg6_2[2] = {nam:"LGline2",p1x:2.5,p1y:-12.5,p1z:-1,p2x:2,p2y:-7.5,p2z:-1,_siz:2.5,_sizz:0.8};
mod_lg6_2[3] = {nam:"LGline3",p1x:-2.5,p1y:-12.5,p1z:-1,p2x:-2,p2y:-7.5,p2z:-1,_siz:2.5,_sizz:0.8};
_global.mod_lg6_3 = new Array();
mod_lg6_3[0] = {nam:"LGline0",p1x:1,p1y:0.5,p1z:-2,p2x:2,p2y:2.5,p2z:-4,_siz:2,_sizz:1};
mod_lg6_3[1] = {nam:"LGline1",p1x:-1,p1y:0.5,p1z:-2,p2x:-2,p2y:2.5,p2z:-4,_siz:2,_sizz:1};
mod_lg6_3[2] = {nam:"LGline2",p1x:3,p1y:4.5,p1z:-7.5,p2x:2,p2y:2.5,p2z:-4,_siz:2.5,_sizz:0.8};
mod_lg6_3[3] = {nam:"LGline3",p1x:-3,p1y:4.5,p1z:-7.5,p2x:-2,p2y:2.5,p2z:-4,_siz:2.5,_sizz:0.8};
_global.mod_lg6_4 = new Array();
mod_lg6_4[0] = {nam:"LGline0",p1x:-0.5,p1y:-0.5,p1z:-2,p2x:0,p2y:-0.5,p2z:-5.8,_siz:2,_sizz:1};
mod_lg6_4[1] = {nam:"LGline1",p1x:1.5,p1y:-0.5,p1z:-2,p2x:3,p2y:-0.5,p2z:-5,_siz:2,_sizz:1};
mod_lg6_4[2] = {nam:"LGline2",p1x:0.5,p1y:-1,p1z:-10,p2x:0,p2y:-0.5,p2z:-5.8,_siz:2.5,_sizz:0.8};
mod_lg6_4[3] = {nam:"LGline3",p1x:5.5,p1y:-1,p1z:-9,p2x:3,p2y:-0.5,p2z:-5,_siz:2.5,_sizz:0.8};
_global.mod_lg6_5 = new Array();
mod_lg6_5[0] = {nam:"LGline0",p1x:-1.5,p1y:-0.5,p1z:-2,p2x:-3,p2y:-0.5,p2z:-5,_siz:2,_sizz:1};
mod_lg6_5[1] = {nam:"LGline1",p1x:0.5,p1y:-0.5,p1z:-2,p2x:0,p2y:-0.5,p2z:-5.8,_siz:2,_sizz:1};
mod_lg6_5[2] = {nam:"LGline2",p1x:-5.5,p1y:-1,p1z:-9,p2x:-3,p2y:-0.5,p2z:-5,_siz:2.5,_sizz:0.8};
mod_lg6_5[3] = {nam:"LGline3",p1x:-0.5,p1y:-1,p1z:-10,p2x:0,p2y:-0.5,p2z:-5.8,_siz:2.5,_sizz:0.8};
_global.mod_lg7_1 = new Array();
mod_lg7_1[0] = {nam:"LGline0",p1x:1,p1y:-0.5,p1z:-2,p2x:2,p2y:-0.5,p2z:-5,_siz:1.5,_sizz:0.8};
mod_lg7_1[1] = {nam:"LGline1",p1x:-1,p1y:-0.5,p1z:-2,p2x:-2,p2y:-0.5,p2z:-5,_siz:1.5,_sizz:0.8};
mod_lg7_1[2] = {nam:"LGline2",p1x:2.5,p1y:-2,p1z:-10,p2x:2,p2y:-0.5,p2z:-5,_siz:3,_sizz:0.5};
mod_lg7_1[3] = {nam:"LGline3",p1x:-2.5,p1y:-2,p1z:-10,p2x:-2,p2y:-0.5,p2z:-5,_siz:3,_sizz:0.5};
_global.mod_lg7_2 = new Array();
mod_lg7_2[0] = {nam:"LGline0",p1x:1,p1y:-4.5,p1z:-0.5,p2x:2,p2y:-7.5,p2z:-1,_siz:1.5,_sizz:0.8};
mod_lg7_2[1] = {nam:"LGline1",p1x:-1,p1y:-4.5,p1z:-0.5,p2x:-2,p2y:-7.5,p2z:-1,_siz:1.5,_sizz:0.8};
mod_lg7_2[2] = {nam:"LGline2",p1x:2.5,p1y:-13,p1z:-1,p2x:2,p2y:-7.5,p2z:-1,_siz:3,_sizz:0.5};
mod_lg7_2[3] = {nam:"LGline3",p1x:-2.5,p1y:-13,p1z:-1,p2x:-2,p2y:-7.5,p2z:-1,_siz:3,_sizz:0.5};
_global.mod_lg7_3 = new Array();
mod_lg7_3[0] = {nam:"LGline0",p1x:1,p1y:0.5,p1z:-2,p2x:2,p2y:2.5,p2z:-4,_siz:1.5,_sizz:0.8};
mod_lg7_3[1] = {nam:"LGline1",p1x:-1,p1y:0.5,p1z:-2,p2x:-2,p2y:2.5,p2z:-4,_siz:1.5,_sizz:0.8};
mod_lg7_3[2] = {nam:"LGline2",p1x:3,p1y:5,p1z:-8,p2x:2,p2y:2.5,p2z:-4,_siz:3,_sizz:0.5};
mod_lg7_3[3] = {nam:"LGline3",p1x:-3,p1y:5,p1z:-8,p2x:-2,p2y:2.5,p2z:-4,_siz:3,_sizz:0.5};
_global.mod_lg7_4 = new Array();
mod_lg7_4[0] = {nam:"LGline0",p1x:-0.5,p1y:-0.5,p1z:-2,p2x:0,p2y:-0.5,p2z:-5.8,_siz:1.5,_sizz:0.8};
mod_lg7_4[1] = {nam:"LGline1",p1x:1.5,p1y:-0.5,p1z:-2,p2x:3,p2y:-0.5,p2z:-5,_siz:1.5,_sizz:0.8};
mod_lg7_4[2] = {nam:"LGline2",p1x:0.5,p1y:-1,p1z:-10,p2x:0,p2y:-0.5,p2z:-5.8,_siz:3,_sizz:0.5};
mod_lg7_4[3] = {nam:"LGline3",p1x:5.5,p1y:-1,p1z:-9,p2x:3,p2y:-0.5,p2z:-5,_siz:3,_sizz:0.5};
_global.mod_lg7_5 = new Array();
mod_lg7_5[0] = {nam:"LGline0",p1x:0.5,p1y:-0.5,p1z:-2,p2x:0,p2y:-0.5,p2z:-5.8,_siz:1.5,_sizz:0.8};
mod_lg7_5[1] = {nam:"LGline1",p1x:-1.5,p1y:-0.5,p1z:-2,p2x:-3,p2y:-0.5,p2z:-5,_siz:1.5,_sizz:0.8};
mod_lg7_5[2] = {nam:"LGline2",p1x:-0.5,p1y:-1,p1z:-10,p2x:0,p2y:-0.5,p2z:-5.8,_siz:3,_sizz:0.5};
mod_lg7_5[3] = {nam:"LGline3",p1x:-5.5,p1y:-1,p1z:-9,p2x:-3,p2y:-0.5,p2z:-5,_siz:3,_sizz:0.5};
_global.mod_lg8_1 = new Array();
mod_lg8_1[0] = {nam:"LGline0",p1x:1,p1y:-0.5,p1z:-2,p2x:2,p2y:-0.5,p2z:-5.5,_siz:1.5,_sizz:0.8};
mod_lg8_1[1] = {nam:"LGline1",p1x:-1,p1y:-0.5,p1z:-2,p2x:-2,p2y:-0.5,p2z:-5.5,_siz:1.5,_sizz:0.8};
mod_lg8_1[2] = {nam:"LGline2",p1x:2.5,p1y:-2,p1z:-9,p2x:2,p2y:-0.5,p2z:-5.5,_siz:3,_sizz:0.8};
mod_lg8_1[3] = {nam:"LGline3",p1x:-2.5,p1y:-2,p1z:-9,p2x:-2,p2y:-0.5,p2z:-5.5,_siz:3,_sizz:0.8};
mod_lg8_1[4] = {nam:"LGline4",p1x:2,p1y:0.5,p1z:-5.5,p2x:1.8,p2y:2.5,p2z:-3,_siz:1,_sizz:0.5};
mod_lg8_1[5] = {nam:"LGline5",p1x:-2,p1y:0.5,p1z:-5.5,p2x:-1.8,p2y:2.5,p2z:-3,_siz:1,_sizz:0.5};
_global.mod_lg8_2 = new Array();
mod_lg8_2[0] = {nam:"LGline0",p1x:1,p1y:-4,p1z:-0.5,p2x:2,p2y:-7.5,p2z:-1,_siz:1.5,_sizz:0.8};
mod_lg8_2[1] = {nam:"LGline1",p1x:-1,p1y:-4,p1z:-0.5,p2x:-2,p2y:-7.5,p2z:-1,_siz:1.5,_sizz:0.8};
mod_lg8_2[2] = {nam:"LGline2",p1x:2.5,p1y:-12,p1z:-1,p2x:2,p2y:-7.5,p2z:-1,_siz:3,_sizz:0.8};
mod_lg8_2[3] = {nam:"LGline3",p1x:-2.5,p1y:-12,p1z:-1,p2x:-2,p2y:-7.5,p2z:-1,_siz:3,_sizz:0.8};
mod_lg8_2[4] = {nam:"LGline4",p1x:2,p1y:-7.5,p1z:-2,p2x:1.8,p2y:-3.5,p2z:-3,_siz:1,_sizz:0.5};
mod_lg8_2[5] = {nam:"LGline5",p1x:-2,p1y:-7.5,p1z:-2,p2x:-1.8,p2y:-3.5,p2z:-3,_siz:1,_sizz:0.5};
_global.mod_lg8_3 = new Array();
mod_lg8_3[0] = {nam:"LGline0",p1x:1,p1y:0.5,p1z:-2,p2x:2,p2y:2.5,p2z:-4,_siz:1.5,_sizz:0.8};
mod_lg8_3[1] = {nam:"LGline1",p1x:-1,p1y:0.5,p1z:-2,p2x:-2,p2y:2.5,p2z:-4,_siz:1.5,_sizz:0.8};
mod_lg8_3[2] = {nam:"LGline2",p1x:3,p1y:4.5,p1z:-7.5,p2x:2,p2y:2.5,p2z:-4,_siz:3,_sizz:0.8};
mod_lg8_3[3] = {nam:"LGline3",p1x:-3,p1y:4.5,p1z:-7.5,p2x:-2,p2y:2.5,p2z:-4,_siz:3,_sizz:0.8};
mod_lg8_3[4] = {nam:"LGline4",p1x:2,p1y:3.5,p1z:-4,p2x:1.8,p2y:2.5,p2z:-1,_siz:1,_sizz:0.5};
mod_lg8_3[5] = {nam:"LGline5",p1x:-2,p1y:3.5,p1z:-4,p2x:-1.8,p2y:2.5,p2z:-1,_siz:1,_sizz:0.5};
_global.mod_lg8_4 = new Array();
mod_lg8_4[0] = {nam:"LGline0",p1x:-0.5,p1y:-0.5,p1z:-2,p2x:0,p2y:-0.5,p2z:-5.8,_siz:1.5,_sizz:0.8};
mod_lg8_4[1] = {nam:"LGline1",p1x:1.5,p1y:-0.5,p1z:-2,p2x:3,p2y:-0.5,p2z:-5,_siz:1.5,_sizz:0.8};
mod_lg8_4[2] = {nam:"LGline2",p1x:0.5,p1y:-1,p1z:-10,p2x:0,p2y:-0.5,p2z:-5.8,_siz:3,_sizz:0.8};
mod_lg8_4[3] = {nam:"LGline3",p1x:5.5,p1y:-1,p1z:-9,p2x:3,p2y:-0.5,p2z:-5,_siz:3,_sizz:0.8};
mod_lg8_4[4] = {nam:"LGline4",p1x:3,p1y:0.5,p1z:-5.2,p2x:1.8,p2y:2.5,p2z:-3.2,_siz:1,_sizz:0.5};
mod_lg8_4[5] = {nam:"LGline5",p1x:0,p1y:0.5,p1z:-6,p2x:0,p2y:2.5,p2z:-3.5,_siz:1,_sizz:0.5};
_global.mod_lg8_5 = new Array();
mod_lg8_5[0] = {nam:"LGline0",p1x:-1.5,p1y:-0.5,p1z:-2,p2x:-3,p2y:-0.5,p2z:-5,_siz:1.5,_sizz:0.8};
mod_lg8_5[1] = {nam:"LGline1",p1x:0.5,p1y:-0.5,p1z:-2,p2x:0,p2y:-0.5,p2z:-5.8,_siz:1.5,_sizz:0.8};
mod_lg8_5[2] = {nam:"LGline2",p1x:-5.5,p1y:-1,p1z:-9,p2x:-3,p2y:-0.5,p2z:-5,_siz:3,_sizz:0.8};
mod_lg8_5[3] = {nam:"LGline3",p1x:-0.5,p1y:-1,p1z:-10,p2x:0,p2y:-0.5,p2z:-5.8,_siz:3,_sizz:0.8};
mod_lg8_5[4] = {nam:"LGline4",p1x:0,p1y:0.5,p1z:-6,p2x:0,p2y:2.5,p2z:-3.5,_siz:1,_sizz:0.5};
mod_lg8_5[5] = {nam:"LGline5",p1x:-3,p1y:0.5,p1z:-5.2,p2x:-1.8,p2y:2.5,p2z:-3.2,_siz:1,_sizz:0.5};
_global.mod_lg9_1 = new Array();
mod_lg9_1[0] = {nam:"LGline0",p1x:1,p1y:-0.5,p1z:-2,p2x:2,p2y:0,p2z:-5,_siz:2,_sizz:1.5};
mod_lg9_1[1] = {nam:"LGline1",p1x:-1,p1y:-0.5,p1z:-2,p2x:-2,p2y:0,p2z:-5,_siz:2,_sizz:1.5};
mod_lg9_1[2] = {nam:"LGline2",p1x:2.5,p1y:-2,p1z:-10,p2x:2,p2y:-0.5,p2z:-5.5,_siz:1.5,_sizz:1.5};
mod_lg9_1[3] = {nam:"LGline3",p1x:-2.5,p1y:-2,p1z:-10,p2x:-2,p2y:-0.5,p2z:-5.5,_siz:1.5,_sizz:1.5};
_global.mod_lg9_2 = new Array();
mod_lg9_2[0] = {nam:"LGline0",p1x:1,p1y:-4,p1z:-0.5,p2x:2,p2y:-7.5,p2z:-1,_siz:2,_sizz:1.5};
mod_lg9_2[1] = {nam:"LGline1",p1x:-1,p1y:-4,p1z:-0.5,p2x:-2,p2y:-7.5,p2z:-1,_siz:2,_sizz:1.5};
mod_lg9_2[2] = {nam:"LGline2",p1x:2.5,p1y:-13,p1z:-1,p2x:2,p2y:-7.5,p2z:-1,_siz:1.5,_sizz:1.5};
mod_lg9_2[3] = {nam:"LGline3",p1x:-2.5,p1y:-13,p1z:-1,p2x:-2,p2y:-7.5,p2z:-1,_siz:1.5,_sizz:1.5};
_global.mod_lg9_3 = new Array();
mod_lg9_3[0] = {nam:"LGline0",p1x:1,p1y:0.5,p1z:-2,p2x:2,p2y:2.5,p2z:-4,_siz:2,_sizz:1.5};
mod_lg9_3[1] = {nam:"LGline1",p1x:-1,p1y:0.5,p1z:-2,p2x:-2,p2y:2.5,p2z:-4,_siz:2,_sizz:1.5};
mod_lg9_3[2] = {nam:"LGline2",p1x:3,p1y:5,p1z:-8,p2x:2,p2y:2.5,p2z:-4,_siz:1.5,_sizz:1.5};
mod_lg9_3[3] = {nam:"LGline3",p1x:-3,p1y:5,p1z:-8,p2x:-2,p2y:2.5,p2z:-4,_siz:1.5,_sizz:1.5};
_global.mod_lg9_4 = new Array();
mod_lg9_4[0] = {nam:"LGline0",p1x:-0.5,p1y:-0.5,p1z:-2,p2x:0,p2y:-0.5,p2z:-5.8,_siz:2,_sizz:1.5};
mod_lg9_4[1] = {nam:"LGline1",p1x:1.5,p1y:-0.5,p1z:-2,p2x:3,p2y:-0.5,p2z:-5,_siz:2,_sizz:1.5};
mod_lg9_4[2] = {nam:"LGline2",p1x:0.5,p1y:-1,p1z:-11,p2x:0,p2y:-0.5,p2z:-5.8,_siz:1.5,_sizz:1.5};
mod_lg9_4[3] = {nam:"LGline3",p1x:5.5,p1y:-1,p1z:-10,p2x:3,p2y:-0.5,p2z:-5,_siz:1.5,_sizz:1.5};
_global.mod_lg9_5 = new Array();
mod_lg9_5[0] = {nam:"LGline0",p1x:-1.5,p1y:-0.5,p1z:-2,p2x:-3,p2y:-0.5,p2z:-5,_siz:2,_sizz:1.5};
mod_lg9_5[1] = {nam:"LGline1",p1x:0.5,p1y:-0.5,p1z:-2,p2x:0,p2y:-0.5,p2z:-5.8,_siz:2,_sizz:1.5};
mod_lg9_5[2] = {nam:"LGline2",p1x:-5.5,p1y:-1,p1z:-10,p2x:-3,p2y:-0.5,p2z:-5,_siz:1.5,_sizz:1.5};
mod_lg9_5[3] = {nam:"LGline3",p1x:-0.5,p1y:-1,p1z:-11,p2x:0,p2y:-0.5,p2z:-5.8,_siz:1.5,_sizz:1.5};
_global.mod_Sla1_1 = new Array();
mod_Sla1_1[0] = {nam:"LAline0",p1x:-4.5,p1y:-3,p1z:-0.75,p2x:-3.5,p2y:2.25,p2z:-2.25,_siz:1.8,_sizz:1.2};
_global.mod_Sla1_2 = new Array();
mod_Sla1_2[0] = {nam:"LAline0",p1x:-4.5,p1y:-1.5,p1z:0,p2x:-3.5,p2y:1.5,p2z:1.25,_siz:1.8,_sizz:1.2};
_global.mod_Sra1_1 = new Array();
mod_Sra1_1[0] = {nam:"RAline0",p1x:4.5,p1y:-3,p1z:-0.75,p2x:3.5,p2y:2.25,p2z:-2.25,_siz:1.8,_sizz:1.2};
_global.mod_Sra1_2 = new Array();
mod_Sra1_2[0] = {nam:"RAline0",p1x:4.5,p1y:-1.5,p1z:0,p2x:3.5,p2y:1.5,p2z:1.25,_siz:1.8,_sizz:1.2};
_global.mod_Sla2_1 = new Array();
mod_Sla2_1[0] = {nam:"LAline0",p1x:-3.5,p1y:-0.5,p1z:-2,p2x:-3.5,p2y:-0.5,p2z:1.5,_siz:2,_sizz:1.2};
mod_Sla2_1[1] = {nam:"LAline1",p1x:-3.5,p1y:-0.5,p1z:-2,p2x:-3.5,p2y:3,p2z:-2,_siz:2,_sizz:1.2};
_global.mod_Sla2_2 = new Array();
mod_Sla2_2[0] = {nam:"LAline0",p1x:-3.5,p1y:1.2,p1z:-1.3,p2x:-3.5,p2y:-0.5,p2z:1.5,_siz:2,_sizz:1.2};
mod_Sla2_2[1] = {nam:"LAline1",p1x:-3.5,p1y:1.2,p1z:-1.3,p2x:-3.5,p2y:4,p2z:1.5,_siz:2,_sizz:1.2};
_global.mod_Sra2_1 = new Array();
mod_Sra2_1[0] = {nam:"RAline0",p1x:3.5,p1y:-0.5,p1z:-2,p2x:3.5,p2y:-0.5,p2z:1.5,_siz:2,_sizz:1.2};
mod_Sra2_1[1] = {nam:"RAline1",p1x:3.5,p1y:-0.5,p1z:-2,p2x:3.5,p2y:3,p2z:-2,_siz:2,_sizz:1.2};
_global.mod_Sra2_2 = new Array();
mod_Sra2_2[0] = {nam:"RAline0",p1x:3.5,p1y:1.2,p1z:-1.3,p2x:3.5,p2y:-0.5,p2z:1.5,_siz:2,_sizz:1.2};
mod_Sra2_2[1] = {nam:"RAline1",p1x:3.5,p1y:1.2,p1z:-1.3,p2x:3.5,p2y:4,p2z:1.5,_siz:2,_sizz:1.2};
_global.mod_la1_1 = new Array();
mod_la1_1[0] = {nam:"LAline0",p1x:-3,p1y:-0.5,p1z:-1,p2x:-3,p2y:-0.5,p2z:1.5,_siz:1.5,_sizz:1.2};
mod_la1_1[1] = {nam:"LAline1",p1x:-3,p1y:-0.5,p1z:-1,p2x:-3,p2y:3,p2z:-1.5,_siz:1.5,_sizz:1.2};
_global.mod_la1_2 = new Array();
mod_la1_2[0] = {nam:"LAline0",p1x:-3,p1y:1.2,p1z:-0.3,p2x:-3,p2y:-0.5,p2z:1.5,_siz:1.5,_sizz:1.2};
mod_la1_2[1] = {nam:"LAline1",p1x:-3,p1y:1.2,p1z:-0.3,p2x:-3,p2y:4,p2z:1.5,_siz:1.5,_sizz:1.2};
_global.mod_ra1_1 = new Array();
mod_ra1_1[0] = {nam:"RAline0",p1x:3,p1y:-0.5,p1z:-1,p2x:3,p2y:-0.5,p2z:1.5,_siz:1.5,_sizz:1.2};
mod_ra1_1[1] = {nam:"RAline1",p1x:3,p1y:-0.5,p1z:-1,p2x:3,p2y:3,p2z:-1.5,_siz:1.5,_sizz:1.2};
_global.mod_ra1_2 = new Array();
mod_ra1_2[0] = {nam:"RAline0",p1x:3,p1y:1.2,p1z:-0.3,p2x:3,p2y:-0.5,p2z:1.5,_siz:1.5,_sizz:1.2};
mod_ra1_2[1] = {nam:"RAline1",p1x:3,p1y:1.2,p1z:-0.3,p2x:3,p2y:4,p2z:1.5,_siz:1.5,_sizz:1.2};
_global.mod_la2_1 = new Array();
mod_la2_1[0] = {nam:"LAline0",p1x:-3,p1y:-0.5,p1z:-1,p2x:-3,p2y:-0.5,p2z:1.5,_siz:1.5,_sizz:1.2};
mod_la2_1[1] = {nam:"LAline1",p1x:-3,p1y:-0.5,p1z:-1,p2x:-3,p2y:3,p2z:-1.5,_siz:1.5,_sizz:1.2};
mod_la2_1[2] = {nam:"LAline2",p1x:-4.5,p1y:2,p1z:2,p2x:-4.5,p2y:2,p2z:-6,_siz:4,_sizz:1};
mod_la2_1[3] = {nam:"LAline3",p1x:-3,p1y:4,p1z:2,p2x:-3,p2y:4,p2z:-6,_siz:4,_sizz:1};
_global.mod_la2_2 = new Array();
mod_la2_2[0] = {nam:"LAline0",p1x:-3,p1y:1.2,p1z:-0.3,p2x:-3,p2y:-0.5,p2z:1.5,_siz:1.5,_sizz:1.2};
mod_la2_2[1] = {nam:"LAline1",p1x:-3,p1y:1.2,p1z:-0.3,p2x:-3,p2y:4,p2z:1.5,_siz:1.5,_sizz:1.2};
mod_la2_2[2] = {nam:"LAline2",p1x:-4.5,p1y:0.5,p1z:2,p2x:-4.5,p2y:0.5,p2z:-6,_siz:4,_sizz:1};
mod_la2_2[3] = {nam:"LAline3",p1x:-4.5,p1y:3,p1z:2,p2x:-4.5,p2y:3,p2z:-6,_siz:4,_sizz:1};
_global.mod_ra2_1 = new Array();
mod_ra2_1[0] = {nam:"RAline0",p1x:3,p1y:-0.5,p1z:-1,p2x:3,p2y:-0.5,p2z:1.5,_siz:1.5,_sizz:1.2};
mod_ra2_1[1] = {nam:"RAline1",p1x:3,p1y:-0.5,p1z:-1,p2x:3,p2y:3,p2z:-1.5,_siz:1.5,_sizz:1.2};
mod_ra2_1[2] = {nam:"RAline2",p1x:4.5,p1y:2,p1z:2,p2x:4.5,p2y:2,p2z:-6,_siz:4,_sizz:1};
mod_ra2_1[3] = {nam:"RAline3",p1x:3,p1y:4,p1z:2,p2x:3,p2y:4,p2z:-6,_siz:4,_sizz:1};
_global.mod_ra2_2 = new Array();
mod_ra2_2[0] = {nam:"RAline0",p1x:3,p1y:1.2,p1z:-0.3,p2x:3,p2y:-0.5,p2z:1.5,_siz:1.5,_sizz:1.2};
mod_ra2_2[1] = {nam:"RAline1",p1x:3,p1y:1.2,p1z:-0.3,p2x:3,p2y:4,p2z:1.5,_siz:1.5,_sizz:1.2};
mod_ra2_2[2] = {nam:"RAline2",p1x:4.5,p1y:0.5,p1z:2,p2x:4.5,p2y:0.5,p2z:-6,_siz:4,_sizz:1};
mod_ra2_2[3] = {nam:"RAline3",p1x:4.5,p1y:3,p1z:2,p2x:4.5,p2y:3,p2z:-6,_siz:4,_sizz:1};
_global.mod_la3_1 = new Array();
mod_la3_1[0] = {nam:"LAline0",p1x:-3,p1y:-2,p1z:-1,p2x:-3,p2y:-2,p2z:1.5,_siz:1.5,_sizz:1.2};
mod_la3_1[1] = {nam:"LAline1",p1x:-3,p1y:-2,p1z:-1,p2x:-3,p2y:2,p2z:-1.5,_siz:1.5,_sizz:1.2};
_global.mod_la3_2 = new Array();
mod_la3_2[0] = {nam:"LAline0",p1x:-3,p1y:-0.3,p1z:-0.3,p2x:-3,p2y:-2,p2z:1.5,_siz:1.5,_sizz:1.2};
mod_la3_2[1] = {nam:"LAline1",p1x:-3,p1y:-0.3,p1z:-0.3,p2x:-3,p2y:2.5,p2z:1.5,_siz:1.5,_sizz:1.2};
_global.mod_ra3_1 = new Array();
mod_ra3_1[0] = {nam:"RAline0",p1x:3,p1y:-2,p1z:-1,p2x:3,p2y:-2,p2z:1.5,_siz:1.5,_sizz:1.2};
mod_ra3_1[1] = {nam:"RAline1",p1x:3,p1y:-2,p1z:-1,p2x:3,p2y:2,p2z:-1.5,_siz:1.5,_sizz:1.2};
_global.mod_ra3_2 = new Array();
mod_ra3_2[0] = {nam:"RAline0",p1x:3,p1y:-0.3,p1z:-0.3,p2x:3,p2y:-2,p2z:1.5,_siz:1.5,_sizz:1.2};
mod_ra3_2[1] = {nam:"RAline1",p1x:3,p1y:-0.3,p1z:-0.3,p2x:3,p2y:2.5,p2z:1.5,_siz:1.5,_sizz:1.2};
_global.mod_la4_1 = new Array();
mod_la4_1[0] = {nam:"LAline0",p1x:-3,p1y:-1,p1z:-1,p2x:-3,p2y:-1,p2z:1.5,_siz:1.5,_sizz:1.2};
mod_la4_1[1] = {nam:"LAline1",p1x:-3,p1y:-1,p1z:-1,p2x:-3,p2y:2.5,p2z:-1.5,_siz:1.5,_sizz:1.2};
_global.mod_la4_2 = new Array();
mod_la4_2[0] = {nam:"LAline0",p1x:-3,p1y:0.8,p1z:-0.3,p2x:-3,p2y:-1,p2z:1.5,_siz:1.5,_sizz:1.2};
mod_la4_2[1] = {nam:"LAline1",p1x:-3,p1y:0.8,p1z:-0.3,p2x:-3,p2y:3.2,p2z:1.5,_siz:1.5,_sizz:1.2};
_global.mod_ra4_1 = new Array();
mod_ra4_1[0] = {nam:"RAline0",p1x:3,p1y:-1,p1z:-1,p2x:3,p2y:-1,p2z:1.5,_siz:1.5,_sizz:1.2};
mod_ra4_1[1] = {nam:"RAline1",p1x:3,p1y:-1,p1z:-1,p2x:3,p2y:2.5,p2z:-1.5,_siz:1.5,_sizz:1.2};
_global.mod_ra4_2 = new Array();
mod_ra4_2[0] = {nam:"RAline0",p1x:3,p1y:0.8,p1z:-0.3,p2x:3,p2y:-1,p2z:1.5,_siz:1.5,_sizz:1.2};
mod_ra4_2[1] = {nam:"RAline1",p1x:3,p1y:0.8,p1z:-0.3,p2x:3,p2y:3.2,p2z:1.5,_siz:1.5,_sizz:1.2};
_global.mod_la5_1 = new Array();
mod_la5_1[0] = {nam:"LAline0",p1x:-3,p1y:-1,p1z:-1,p2x:-3,p2y:-1,p2z:1.5,_siz:1.5,_sizz:1.2};
mod_la5_1[1] = {nam:"LAline1",p1x:-3,p1y:-1,p1z:-1,p2x:-3,p2y:3,p2z:-1.5,_siz:1.5,_sizz:1.2};
mod_la5_1[2] = {nam:"LAline2",p1x:-4,p1y:-0.3,p1z:2.5,p2x:-4,p2y:-1.7,p2z:2.5,_siz:1,_sizz:1};
mod_la5_1[3] = {nam:"LAline3",p1x:-4.5,p1y:-0.3,p1z:2.5,p2x:-4.5,p2y:-0.3,p2z:-2,_siz:1,_sizz:1};
mod_la5_1[4] = {nam:"LAline4",p1x:-4.5,p1y:-1,p1z:2.5,p2x:-4.5,p2y:-1,p2z:-2,_siz:1,_sizz:1};
mod_la5_1[5] = {nam:"LAline5",p1x:-4.5,p1y:-1.7,p1z:2.5,p2x:-4.5,p2y:-1.7,p2z:-2,_siz:1,_sizz:1};
_global.mod_la5_2 = new Array();
mod_la5_2[0] = {nam:"LAline0",p1x:-3,p1y:0.8,p1z:-0.3,p2x:-3,p2y:-1,p2z:1.5,_siz:1.5,_sizz:1.2};
mod_la5_2[1] = {nam:"LAline1",p1x:-3,p1y:0.8,p1z:-0.3,p2x:-3,p2y:3.2,p2z:1.5,_siz:1.5,_sizz:1.2};
mod_la5_2[2] = {nam:"LAline2",p1x:-4,p1y:-0.3,p1z:2.5,p2x:-4,p2y:-1.7,p2z:2.5,_siz:1,_sizz:1};
mod_la5_2[3] = {nam:"LAline3",p1x:-4.5,p1y:-0.3,p1z:2.5,p2x:-4.5,p2y:-0.3,p2z:-2,_siz:1,_sizz:1};
mod_la5_2[4] = {nam:"LAline4",p1x:-4.5,p1y:-1,p1z:2.5,p2x:-4.5,p2y:-1,p2z:-2,_siz:1,_sizz:1};
mod_la5_2[5] = {nam:"LAline5",p1x:-4.5,p1y:-1.7,p1z:2.5,p2x:-4.5,p2y:-1.7,p2z:-2,_siz:1,_sizz:1};
_global.mod_ra5_1 = new Array();
mod_ra5_1[0] = {nam:"RAline0",p1x:3,p1y:-1,p1z:-1,p2x:3,p2y:-1,p2z:1.5,_siz:1.5,_sizz:1.2};
mod_ra5_1[1] = {nam:"RAline1",p1x:3,p1y:-1,p1z:-1,p2x:3,p2y:3,p2z:-1.5,_siz:1.5,_sizz:1.2};
mod_ra5_1[2] = {nam:"RAline2",p1x:4,p1y:-0.3,p1z:2.5,p2x:4,p2y:-1.7,p2z:2.5,_siz:1,_sizz:1};
mod_ra5_1[3] = {nam:"RAline3",p1x:4.5,p1y:-0.3,p1z:2.5,p2x:4.5,p2y:-0.3,p2z:-2,_siz:1,_sizz:1};
mod_ra5_1[4] = {nam:"RAline4",p1x:4.5,p1y:-1,p1z:2.5,p2x:4.5,p2y:-1,p2z:-2,_siz:1,_sizz:1};
mod_ra5_1[5] = {nam:"RAline5",p1x:4.5,p1y:-1.7,p1z:2.5,p2x:4.5,p2y:-1.7,p2z:-2,_siz:1,_sizz:1};
_global.mod_ra5_2 = new Array();
mod_ra5_2[0] = {nam:"RAline0",p1x:3,p1y:0.8,p1z:-0.3,p2x:3,p2y:-1,p2z:1.5,_siz:1.5,_sizz:1.2};
mod_ra5_2[1] = {nam:"RAline1",p1x:3,p1y:0.8,p1z:-0.3,p2x:3,p2y:3.2,p2z:1.5,_siz:1.5,_sizz:1.2};
mod_ra5_2[2] = {nam:"RAline2",p1x:4,p1y:-0.3,p1z:2.5,p2x:4,p2y:-1.7,p2z:2.5,_siz:1,_sizz:1};
mod_ra5_2[3] = {nam:"RAline3",p1x:4.5,p1y:-0.3,p1z:2.5,p2x:4.5,p2y:-0.3,p2z:-2,_siz:1,_sizz:1};
mod_ra5_2[4] = {nam:"RAline4",p1x:4.5,p1y:-1,p1z:2.5,p2x:4.5,p2y:-1,p2z:-2,_siz:1,_sizz:1};
mod_ra5_2[5] = {nam:"RAline5",p1x:4.5,p1y:-1.7,p1z:2.5,p2x:4.5,p2y:-1.7,p2z:-2,_siz:1,_sizz:1};
_global.mod_la6_1 = new Array();
mod_la6_1[0] = {nam:"LAline0",p1x:-3,p1y:-1,p1z:-1,p2x:-3,p2y:-1,p2z:1.5,_siz:1.5,_sizz:1.2};
mod_la6_1[1] = {nam:"LAline1",p1x:-3,p1y:-1,p1z:-1,p2x:-3,p2y:3,p2z:-1.5,_siz:1.5,_sizz:1.2};
mod_la6_1[2] = {nam:"LAline2",p1x:-3.2,p1y:-1,p1z:1.5,p2x:-3.2,p2y:-1,p2z:1.6,_siz:2.5,_sizz:1};
mod_la6_1[3] = {nam:"LAline3",p1x:-3,p1y:-1,p1z:1.5,p2x:-4.8,p2y:-1,p2z:3.5,_siz:1.5,_sizz:0.1};
_global.mod_la6_2 = new Array();
mod_la6_2[0] = {nam:"LAline0",p1x:-3,p1y:0.8,p1z:-0.3,p2x:-3,p2y:-1,p2z:1.5,_siz:1.5,_sizz:1.2};
mod_la6_2[1] = {nam:"LAline1",p1x:-3,p1y:0.8,p1z:-0.3,p2x:-3,p2y:3.2,p2z:1.5,_siz:1.5,_sizz:1.2};
mod_la6_2[2] = {nam:"LAline2",p1x:-3.2,p1y:-1,p1z:1.5,p2x:-3.2,p2y:-1,p2z:1.6,_siz:2.5,_sizz:1};
mod_la6_2[3] = {nam:"LAline3",p1x:-3,p1y:-1,p1z:1.5,p2x:-4.8,p2y:-1,p2z:3.5,_siz:1.5,_sizz:0.1};
_global.mod_ra6_1 = new Array();
mod_ra6_1[0] = {nam:"RAline0",p1x:3,p1y:-1,p1z:-1,p2x:3,p2y:-1,p2z:1.5,_siz:1.5,_sizz:1.2};
mod_ra6_1[1] = {nam:"RAline1",p1x:3,p1y:-1,p1z:-1,p2x:3,p2y:3,p2z:-1.5,_siz:1.5,_sizz:1.2};
mod_ra6_1[2] = {nam:"RAline2",p1x:3.2,p1y:-1,p1z:1.5,p2x:3.2,p2y:-1,p2z:1.6,_siz:2.5,_sizz:1};
mod_ra6_1[3] = {nam:"RAline3",p1x:3,p1y:-1,p1z:1.5,p2x:4.8,p2y:-1,p2z:3.5,_siz:1.5,_sizz:0.1};
_global.mod_ra6_2 = new Array();
mod_ra6_2[0] = {nam:"RAline0",p1x:3,p1y:0.8,p1z:-0.3,p2x:3,p2y:-1,p2z:1.5,_siz:1.5,_sizz:1.2};
mod_ra6_2[1] = {nam:"RAline1",p1x:3,p1y:0.8,p1z:-0.3,p2x:3,p2y:3.2,p2z:1.5,_siz:1.5,_sizz:1.2};
mod_ra6_2[2] = {nam:"RAline2",p1x:3.2,p1y:-1,p1z:1.5,p2x:3.2,p2y:-1,p2z:1.6,_siz:2.5,_sizz:1};
mod_ra6_2[3] = {nam:"RAline3",p1x:3,p1y:-1,p1z:1.5,p2x:4.8,p2y:-1,p2z:3.5,_siz:1.5,_sizz:0.1};
_global.mod_la7_1 = new Array();
mod_la7_1[0] = {nam:"LAline0",p1x:-3,p1y:-1,p1z:-1,p2x:-3,p2y:-1,p2z:1.5,_siz:1.5,_sizz:1.2};
mod_la7_1[1] = {nam:"LAline1",p1x:-3,p1y:-1,p1z:-1,p2x:-3,p2y:3,p2z:-1.5,_siz:1.5,_sizz:1.2};
mod_la7_1[2] = {nam:"LAline2",p1x:-3.2,p1y:-1,p1z:1.5,p2x:-3.2,p2y:-1,p2z:1.6,_siz:2.5,_sizz:1};
mod_la7_1[3] = {nam:"LAline3",p1x:-3,p1y:-1,p1z:1.5,p2x:-4.2,p2y:-1,p2z:2.5,_siz:1.5,_sizz:0.6};
mod_la7_1[4] = {nam:"LAline3",p1x:-4.2,p1y:-1,p1z:2.5,p2x:-3.8,p2y:-1,p2z:3.5,_siz:0.9,_sizz:0.1};
_global.mod_la7_2 = new Array();
mod_la7_2[0] = {nam:"LAline0",p1x:-3,p1y:0.8,p1z:-0.3,p2x:-3,p2y:-1,p2z:1.5,_siz:1.5,_sizz:1.2};
mod_la7_2[1] = {nam:"LAline1",p1x:-3,p1y:0.8,p1z:-0.3,p2x:-3,p2y:3.2,p2z:1.5,_siz:1.5,_sizz:1.2};
mod_la7_2[2] = {nam:"LAline2",p1x:-3.2,p1y:-1,p1z:1.5,p2x:-3.2,p2y:-1,p2z:1.6,_siz:2.5,_sizz:1};
mod_la7_2[3] = {nam:"LAline3",p1x:-3,p1y:-1,p1z:1.5,p2x:-4.2,p2y:-1,p2z:2.5,_siz:1.5,_sizz:0.6};
mod_la7_2[4] = {nam:"LAline3",p1x:-4.2,p1y:-1,p1z:2.5,p2x:-3.8,p2y:-1,p2z:3.5,_siz:0.9,_sizz:0.1};
_global.mod_ra7_1 = new Array();
mod_ra7_1[0] = {nam:"RAline0",p1x:3,p1y:-1,p1z:-1,p2x:3,p2y:-1,p2z:1.5,_siz:1.5,_sizz:1.2};
mod_ra7_1[1] = {nam:"RAline1",p1x:3,p1y:-1,p1z:-1,p2x:3,p2y:3,p2z:-1.5,_siz:1.5,_sizz:1.2};
mod_ra7_1[2] = {nam:"RAline2",p1x:3.2,p1y:-1,p1z:1.5,p2x:3.2,p2y:-1,p2z:1.6,_siz:2.5,_sizz:1};
mod_ra7_1[3] = {nam:"RAline3",p1x:3,p1y:-1,p1z:1.5,p2x:4.2,p2y:-1,p2z:2.5,_siz:1.5,_sizz:0.6};
mod_ra7_1[4] = {nam:"RAline3",p1x:4.2,p1y:-1,p1z:2.5,p2x:3.8,p2y:-1,p2z:3.5,_siz:0.9,_sizz:0.1};
_global.mod_ra7_2 = new Array();
mod_ra7_2[0] = {nam:"RAline0",p1x:3,p1y:0.8,p1z:-0.3,p2x:3,p2y:-1,p2z:1.5,_siz:1.5,_sizz:1.2};
mod_ra7_2[1] = {nam:"RAline1",p1x:3,p1y:0.8,p1z:-0.3,p2x:3,p2y:3.2,p2z:1.5,_siz:1.5,_sizz:1.2};
mod_ra7_2[2] = {nam:"RAline2",p1x:3.2,p1y:-1,p1z:1.5,p2x:3.2,p2y:-1,p2z:1.6,_siz:2.5,_sizz:1};
mod_ra7_2[3] = {nam:"RAline3",p1x:3,p1y:-1,p1z:1.5,p2x:4.2,p2y:-1,p2z:2.5,_siz:1.5,_sizz:0.6};
mod_ra7_2[4] = {nam:"RAline3",p1x:4.2,p1y:-1,p1z:2.5,p2x:3.8,p2y:-1,p2z:3.5,_siz:0.9,_sizz:0.1};
_global.mod_la8_1 = new Array();
mod_la8_1[0] = {nam:"LAline0",p1x:-3,p1y:-0.5,p1z:-2,p2x:-3,p2y:-0.5,p2z:1.5,_siz:2,_sizz:1.2};
mod_la8_1[1] = {nam:"LAline1",p1x:-3,p1y:-0.5,p1z:-2,p2x:-3.5,p2y:3,p2z:-2,_siz:2,_sizz:1.5};
_global.mod_la8_2 = new Array();
mod_la8_2[0] = {nam:"LAline0",p1x:-3,p1y:1.2,p1z:-1.3,p2x:-3,p2y:-0.5,p2z:1.5,_siz:2,_sizz:1.2};
mod_la8_2[1] = {nam:"LAline1",p1x:-3,p1y:1.2,p1z:-1.3,p2x:-3.5,p2y:4,p2z:1.5,_siz:2,_sizz:1.5};
_global.mod_ra8_1 = new Array();
mod_ra8_1[0] = {nam:"RAline0",p1x:3,p1y:-0.5,p1z:-2,p2x:3,p2y:-0.5,p2z:1.5,_siz:2,_sizz:1.2};
mod_ra8_1[1] = {nam:"RAline1",p1x:3,p1y:-0.5,p1z:-2,p2x:3.5,p2y:3,p2z:-2,_siz:2,_sizz:1.5};
_global.mod_ra8_2 = new Array();
mod_ra8_2[0] = {nam:"RAline0",p1x:3,p1y:1.2,p1z:-1.3,p2x:3,p2y:-0.5,p2z:1.5,_siz:2,_sizz:1.2};
mod_ra8_2[1] = {nam:"RAline1",p1x:3,p1y:1.2,p1z:-1.3,p2x:3.5,p2y:4,p2z:1.5,_siz:2,_sizz:1.5};
_global.mod_la9_1 = new Array();
mod_la9_1[0] = {nam:"LAline0",p1x:-3.5,p1y:-1,p1z:1.5,p2x:-0.5,p2y:-1,p2z:1,_siz:3,_sizz:0.5};
mod_la9_1[1] = {nam:"LAline1",p1x:-3,p1y:-1,p1z:-1,p2x:-3,p2y:-1,p2z:1.5,_siz:1.5,_sizz:1.2};
mod_la9_1[2] = {nam:"LAline2",p1x:-3,p1y:-1,p1z:-1,p2x:-3,p2y:2.5,p2z:-1.5,_siz:1.5,_sizz:1.2};
_global.mod_la9_2 = new Array();
mod_la9_2[0] = {nam:"LAline0",p1x:-3.5,p1y:-1,p1z:1.5,p2x:-0.5,p2y:-1,p2z:1,_siz:3,_sizz:0.5};
mod_la9_2[1] = {nam:"LAline1",p1x:-3,p1y:0.8,p1z:-0.3,p2x:-3,p2y:-1,p2z:1.5,_siz:1.5,_sizz:1.2};
mod_la9_2[2] = {nam:"LAline2",p1x:-3,p1y:0.8,p1z:-0.3,p2x:-3,p2y:3.2,p2z:1.5,_siz:1.5,_sizz:1.2};
_global.mod_ra9_1 = new Array();
mod_ra9_1[0] = {nam:"RAline0",p1x:3.5,p1y:-1,p1z:1.5,p2x:0.5,p2y:-1,p2z:1,_siz:3,_sizz:0.5};
mod_ra9_1[1] = {nam:"RAline1",p1x:3,p1y:-1,p1z:-1,p2x:3,p2y:-1,p2z:1.5,_siz:1.5,_sizz:1.2};
mod_ra9_1[2] = {nam:"RAline2",p1x:3,p1y:-1,p1z:-1,p2x:3,p2y:2.5,p2z:-1.5,_siz:1.5,_sizz:1.2};
_global.mod_ra9_2 = new Array();
mod_ra9_2[0] = {nam:"RAline0",p1x:3.5,p1y:-1,p1z:1.5,p2x:0.5,p2y:-1,p2z:1,_siz:3,_sizz:0.5};
mod_ra9_2[1] = {nam:"RAline1",p1x:3,p1y:0.8,p1z:-0.3,p2x:3,p2y:-1,p2z:1.5,_siz:1.5,_sizz:1.2};
mod_ra9_2[2] = {nam:"RAline2",p1x:3,p1y:0.8,p1z:-0.3,p2x:3,p2y:3.2,p2z:1.5,_siz:1.5,_sizz:1.2};
_global.mod_la10_1 = new Array();
mod_la10_1[0] = {nam:"LAline0",p1x:-3.5,p1y:-1,p1z:1.5,p2x:-0.5,p2y:-1,p2z:1,_siz:3,_sizz:0.5};
mod_la10_1[1] = {nam:"LAline1",p1x:-3,p1y:-1,p1z:-1,p2x:-3,p2y:-1,p2z:1.5,_siz:1.5,_sizz:1.2};
mod_la10_1[2] = {nam:"LAline2",p1x:-5,p1y:-5,p1z:2,p2x:-4,p2y:2.5,p2z:-2.5,_siz:1,_sizz:4};
_global.mod_la10_2 = new Array();
mod_la10_2[0] = {nam:"LAline0",p1x:-3.5,p1y:-1,p1z:1.5,p2x:-0.5,p2y:-1,p2z:1,_siz:3,_sizz:0.5};
mod_la10_2[1] = {nam:"LAline1",p1x:-3,p1y:0.8,p1z:-0.3,p2x:-3,p2y:-1,p2z:1.5,_siz:1.5,_sizz:1.2};
mod_la10_2[2] = {nam:"LAline2",p1x:-5,p1y:-5,p1z:-3.5,p2x:-4,p2y:2.5,p2z:1,_siz:1,_sizz:4};
_global.mod_ra10_1 = new Array();
mod_ra10_1[0] = {nam:"RAline0",p1x:3.5,p1y:-1,p1z:1.5,p2x:0.5,p2y:-1,p2z:1,_siz:3,_sizz:0.5};
mod_ra10_1[1] = {nam:"RAline1",p1x:3,p1y:-1,p1z:-1,p2x:3,p2y:-1,p2z:1.5,_siz:1.5,_sizz:1.2};
mod_ra10_1[2] = {nam:"RAline2",p1x:5,p1y:-5,p1z:2,p2x:4,p2y:2.5,p2z:-2.5,_siz:1,_sizz:4};
_global.mod_ra10_2 = new Array();
mod_ra10_2[0] = {nam:"RAline0",p1x:3.5,p1y:-1,p1z:1.5,p2x:0.5,p2y:-1,p2z:1,_siz:3,_sizz:0.5};
mod_ra10_2[1] = {nam:"RAline1",p1x:3,p1y:0.8,p1z:-0.3,p2x:3,p2y:-1,p2z:1.5,_siz:1.5,_sizz:1.2};
mod_ra10_2[2] = {nam:"RAline2",p1x:5,p1y:-5,p1z:-3.5,p2x:4,p2y:2.5,p2z:1,_siz:1,_sizz:4};
_global.mod_la11_1 = new Array();
mod_la11_1[0] = {nam:"LAline0",p1x:-3,p1y:-0.5,p1z:-1,p2x:-3,p2y:-0.5,p2z:1.5,_siz:1.2,_sizz:1.2};
mod_la11_1[1] = {nam:"LAline1",p1x:-3,p1y:-0.5,p1z:-1,p2x:-3,p2y:2.5,p2z:-1.5,_siz:1.8,_sizz:1};
_global.mod_la11_2 = new Array();
mod_la11_2[0] = {nam:"LAline0",p1x:-3,p1y:1.2,p1z:-0.3,p2x:-3,p2y:-0.5,p2z:1.5,_siz:1.2,_sizz:1.2};
mod_la11_2[1] = {nam:"LAline1",p1x:-3,p1y:1.2,p1z:-0.3,p2x:-3,p2y:3,p2z:1.5,_siz:1.8,_sizz:1};
_global.mod_ra11_1 = new Array();
mod_ra11_1[0] = {nam:"RAline0",p1x:3,p1y:-0.5,p1z:-1,p2x:3,p2y:-0.5,p2z:1.5,_siz:1.2,_sizz:1.2};
mod_ra11_1[1] = {nam:"RAline1",p1x:3,p1y:-0.5,p1z:-1,p2x:3,p2y:2.5,p2z:-1.5,_siz:1.8,_sizz:1};
_global.mod_ra11_2 = new Array();
mod_ra11_2[0] = {nam:"RAline0",p1x:3,p1y:1.2,p1z:-0.3,p2x:3,p2y:-0.5,p2z:1.5,_siz:1.2,_sizz:1};
mod_ra11_2[1] = {nam:"RAline1",p1x:3,p1y:1.2,p1z:-0.3,p2x:3,p2y:3,p2z:1.5,_siz:1.8,_sizz:1};
_global.mod_la12_1 = new Array();
mod_la12_1[0] = {nam:"LAline0",p1x:-3.2,p1y:-1,p1z:2,p2x:-0.5,p2y:-1,p2z:1.5,_siz:2,_sizz:0.8};
mod_la12_1[1] = {nam:"LAline1",p1x:-3,p1y:-1,p1z:-1,p2x:-3,p2y:-1,p2z:1.5,_siz:1.2,_sizz:1};
mod_la12_1[2] = {nam:"LAline2",p1x:-3,p1y:-1,p1z:-1,p2x:-3,p2y:2.5,p2z:-1.5,_siz:1.5,_sizz:1.2};
_global.mod_la12_2 = new Array();
mod_la12_2[0] = {nam:"LAline0",p1x:-3.2,p1y:-1,p1z:2,p2x:-0.5,p2y:-1,p2z:1.5,_siz:2,_sizz:0.8};
mod_la12_2[1] = {nam:"LAline1",p1x:-3,p1y:0.8,p1z:-0.3,p2x:-3,p2y:-1,p2z:1.5,_siz:1.2,_sizz:1};
mod_la12_2[2] = {nam:"LAline2",p1x:-3,p1y:0.8,p1z:-0.3,p2x:-3,p2y:3.2,p2z:1.5,_siz:1.5,_sizz:1.2};
_global.mod_ra12_1 = new Array();
mod_ra12_1[0] = {nam:"RAline0",p1x:3.2,p1y:-1,p1z:2,p2x:0.5,p2y:-1,p2z:1.5,_siz:2,_sizz:0.8};
mod_ra12_1[1] = {nam:"RAline1",p1x:3,p1y:-1,p1z:-1,p2x:3,p2y:-1,p2z:1.5,_siz:1.2,_sizz:1};
mod_ra12_1[2] = {nam:"RAline2",p1x:3,p1y:-1,p1z:-1,p2x:3,p2y:2.5,p2z:-1.5,_siz:1.5,_sizz:1.2};
_global.mod_ra12_2 = new Array();
mod_ra12_2[0] = {nam:"RAline0",p1x:3.2,p1y:-1,p1z:2,p2x:0.5,p2y:-1,p2z:1.5,_siz:2,_sizz:0.8};
mod_ra12_2[1] = {nam:"RAline1",p1x:3,p1y:0.8,p1z:-0.3,p2x:3,p2y:-1,p2z:1.5,_siz:1.2,_sizz:1};
mod_ra12_2[2] = {nam:"RAline2",p1x:3,p1y:0.8,p1z:-0.3,p2x:3,p2y:3.2,p2z:1.5,_siz:1.5,_sizz:1.2};
_global.mod_la13_1 = new Array();
mod_la13_1[0] = {nam:"LAline0",p1x:-3.2,p1y:-1,p1z:2,p2x:-0.5,p2y:-1,p2z:1.5,_siz:2,_sizz:0.8};
mod_la13_1[1] = {nam:"LAline1",p1x:-3,p1y:-1,p1z:-1,p2x:-3,p2y:-1,p2z:1.5,_siz:1.2,_sizz:1};
mod_la13_1[2] = {nam:"LAline2",p1x:-3,p1y:-1,p1z:-1,p2x:-3,p2y:2.5,p2z:-1.5,_siz:1.5,_sizz:1.2};
mod_la13_1[3] = {nam:"LAline3",p1x:-5,p1y:-1,p1z:2.5,p2x:-2,p2y:-1,p2z:2.5,_siz:1,_sizz:1};
_global.mod_la13_2 = new Array();
mod_la13_2[0] = {nam:"LAline0",p1x:-3.2,p1y:-1,p1z:2,p2x:-0.5,p2y:-1,p2z:1.5,_siz:2,_sizz:0.8};
mod_la13_2[1] = {nam:"LAline1",p1x:-3,p1y:0.8,p1z:-0.3,p2x:-3,p2y:-1,p2z:1.5,_siz:1.2,_sizz:1};
mod_la13_2[2] = {nam:"LAline2",p1x:-3,p1y:0.8,p1z:-0.3,p2x:-3,p2y:3.2,p2z:1.5,_siz:1.5,_sizz:1.2};
mod_la13_2[3] = {nam:"LAline3",p1x:-5,p1y:-1,p1z:2.5,p2x:-2,p2y:-1,p2z:2.5,_siz:1,_sizz:1};
_global.mod_ra13_1 = new Array();
mod_ra13_1[0] = {nam:"RAline0",p1x:3.2,p1y:-1,p1z:2,p2x:0.5,p2y:-1,p2z:1.5,_siz:2,_sizz:0.8};
mod_ra13_1[1] = {nam:"RAline1",p1x:3,p1y:-1,p1z:-1,p2x:3,p2y:-1,p2z:1.5,_siz:1.2,_sizz:1};
mod_ra13_1[2] = {nam:"RAline2",p1x:3,p1y:-1,p1z:-1,p2x:3,p2y:2.5,p2z:-1.5,_siz:1.5,_sizz:1.2};
mod_ra13_1[3] = {nam:"RAline3",p1x:5,p1y:-1,p1z:2.5,p2x:2,p2y:-1,p2z:2.5,_siz:1,_sizz:1};
_global.mod_ra13_2 = new Array();
mod_ra13_2[0] = {nam:"RAline0",p1x:3.2,p1y:-1,p1z:2,p2x:0.5,p2y:-1,p2z:1.5,_siz:2,_sizz:0.8};
mod_ra13_2[1] = {nam:"RAline1",p1x:3,p1y:0.8,p1z:-0.3,p2x:3,p2y:-1,p2z:1.5,_siz:1.2,_sizz:1};
mod_ra13_2[2] = {nam:"RAline2",p1x:3,p1y:0.8,p1z:-0.3,p2x:3,p2y:3.2,p2z:1.5,_siz:1.5,_sizz:1.2};
mod_ra13_2[3] = {nam:"RAline3",p1x:5,p1y:-1,p1z:2.5,p2x:2,p2y:-1,p2z:2.5,_siz:1,_sizz:1};
_global.mod_la14_1 = new Array();
mod_la14_1[0] = {nam:"LAline0",p1x:-4,p1y:-1,p1z:2,p2x:-2.5,p2y:-1,p2z:2,_siz:3,_sizz:1};
mod_la14_1[1] = {nam:"LAline1",p1x:-3,p1y:-1,p1z:-1,p2x:-3,p2y:-1,p2z:1.5,_siz:1.2,_sizz:1};
mod_la14_1[2] = {nam:"LAline2",p1x:-3,p1y:-1,p1z:-1,p2x:-3,p2y:2.5,p2z:-1.5,_siz:1.5,_sizz:1.2};
mod_la14_1[3] = {nam:"LAline3",p1x:-4,p1y:-1,p1z:1,p2x:-5,p2y:-1,p2z:-1.5,_siz:1,_sizz:0.5};
_global.mod_la14_2 = new Array();
mod_la14_2[0] = {nam:"LAline0",p1x:-4,p1y:-1,p1z:2,p2x:-2.5,p2y:-1,p2z:2,_siz:3,_sizz:1};
mod_la14_2[1] = {nam:"LAline1",p1x:-3,p1y:0.8,p1z:-0.3,p2x:-3,p2y:-1,p2z:1.5,_siz:1.2,_sizz:1};
mod_la14_2[2] = {nam:"LAline2",p1x:-3,p1y:0.8,p1z:-0.3,p2x:-3,p2y:3.2,p2z:1.5,_siz:1.5,_sizz:1.2};
mod_la14_2[3] = {nam:"LAline3",p1x:-4,p1y:-1,p1z:1,p2x:-5,p2y:-1,p2z:-1.5,_siz:1,_sizz:0.5};
_global.mod_ra14_1 = new Array();
mod_ra14_1[0] = {nam:"RAline0",p1x:4,p1y:-1,p1z:2,p2x:2.5,p2y:-1,p2z:2,_siz:3,_sizz:1};
mod_ra14_1[1] = {nam:"RAline1",p1x:3,p1y:-1,p1z:-1,p2x:3,p2y:-1,p2z:1.5,_siz:1.2,_sizz:1};
mod_ra14_1[2] = {nam:"RAline2",p1x:3,p1y:-1,p1z:-1,p2x:3,p2y:2.5,p2z:-1.5,_siz:1.5,_sizz:1.2};
mod_ra14_1[3] = {nam:"RAline3",p1x:4,p1y:-1,p1z:1,p2x:5,p2y:-1,p2z:-1.5,_siz:1,_sizz:0.5};
_global.mod_ra14_2 = new Array();
mod_ra14_2[0] = {nam:"RAline0",p1x:4,p1y:-1,p1z:2,p2x:2.5,p2y:-1,p2z:2,_siz:3,_sizz:1};
mod_ra14_2[1] = {nam:"RAline1",p1x:3,p1y:0.8,p1z:-0.3,p2x:3,p2y:-1,p2z:1.5,_siz:1.2,_sizz:1};
mod_ra14_2[2] = {nam:"RAline2",p1x:3,p1y:0.8,p1z:-0.3,p2x:3,p2y:3.2,p2z:1.5,_siz:1.5,_sizz:1.2};
mod_ra14_2[3] = {nam:"RAline3",p1x:4,p1y:-1,p1z:1,p2x:5,p2y:-1,p2z:-1.5,_siz:1,_sizz:0.5};
_global.mod_la15_1 = new Array();
mod_la15_1[0] = {nam:"LAline0",p1x:-3.2,p1y:-1,p1z:1.5,p2x:-0.5,p2y:-1,p2z:1.5,_siz:2.5,_sizz:1};
mod_la15_1[1] = {nam:"LAline1",p1x:-3,p1y:-1,p1z:-1,p2x:-3,p2y:-1,p2z:1.5,_siz:1.2,_sizz:1};
mod_la15_1[2] = {nam:"LAline2",p1x:-3,p1y:-1,p1z:-1,p2x:-3,p2y:2.5,p2z:-1.5,_siz:2,_sizz:1};
mod_la15_1[3] = {nam:"LAline3",p1x:-6,p1y:-1,p1z:2.5,p2x:-2,p2y:-1,p2z:2.5,_siz:1,_sizz:1};
mod_la15_1[4] = {nam:"LAline4",p1x:-4,p1y:1,p1z:-1.2,p2x:-5,p2y:-2,p2z:-1.2,_siz:1.5,_sizz:0.5};
mod_la15_1[5] = {nam:"LAline5",p1x:-4,p1y:1,p1z:-1.2,p2x:-5,p2y:4,p2z:-1.2,_siz:1.5,_sizz:0.5};
_global.mod_la15_2 = new Array();
mod_la15_2[0] = {nam:"LAline0",p1x:-3.2,p1y:-1,p1z:1.5,p2x:-0.5,p2y:-1,p2z:1.5,_siz:2.5,_sizz:1};
mod_la15_2[1] = {nam:"LAline1",p1x:-3,p1y:0.8,p1z:-0.3,p2x:-3,p2y:-1,p2z:1.5,_siz:1.2,_sizz:1};
mod_la15_2[2] = {nam:"LAline2",p1x:-3,p1y:0.8,p1z:-0.3,p2x:-3,p2y:3.2,p2z:1.5,_siz:2,_sizz:1};
mod_la15_2[3] = {nam:"LAline3",p1x:-6,p1y:-1,p1z:2.5,p2x:-2,p2y:-1,p2z:2.5,_siz:1,_sizz:1};
mod_la15_2[4] = {nam:"LAline4",p1x:-4,p1y:2,p1z:0.6,p2x:-5,p2y:0,p2z:-1,_siz:1.5,_sizz:0.5};
mod_la15_2[5] = {nam:"LAline5",p1x:-4,p1y:2,p1z:0.6,p2x:-5,p2y:4,p2z:2.2,_siz:1.5,_sizz:0.5};
_global.mod_ra15_1 = new Array();
mod_ra15_1[0] = {nam:"RAline0",p1x:3.2,p1y:-1,p1z:1.5,p2x:0.5,p2y:-1,p2z:1.5,_siz:2.5,_sizz:0.8};
mod_ra15_1[1] = {nam:"RAline1",p1x:3,p1y:-1,p1z:-1,p2x:3,p2y:-1,p2z:1.5,_siz:1.2,_sizz:1};
mod_ra15_1[2] = {nam:"RAline2",p1x:3,p1y:-1,p1z:-1,p2x:3,p2y:2.5,p2z:-1.5,_siz:1.5,_sizz:1.2};
mod_ra15_1[3] = {nam:"RAline3",p1x:6,p1y:-1,p1z:2.5,p2x:2,p2y:-1,p2z:2.5,_siz:1,_sizz:1};
mod_ra15_1[4] = {nam:"RAline4",p1x:4,p1y:1,p1z:-1.2,p2x:5,p2y:-2,p2z:-1.2,_siz:1.5,_sizz:0.5};
mod_ra15_1[5] = {nam:"RAline5",p1x:4,p1y:1,p1z:-1.2,p2x:5,p2y:4,p2z:-1.2,_siz:1.5,_sizz:0.5};
_global.mod_ra15_2 = new Array();
mod_ra15_2[0] = {nam:"RAline0",p1x:3.2,p1y:-1,p1z:1.5,p2x:0.5,p2y:-1,p2z:1.5,_siz:2.5,_sizz:1};
mod_ra15_2[1] = {nam:"RAline1",p1x:3,p1y:0.8,p1z:-0.3,p2x:3,p2y:-1,p2z:1.5,_siz:1.2,_sizz:1};
mod_ra15_2[2] = {nam:"RAline2",p1x:3,p1y:0.8,p1z:-0.3,p2x:3,p2y:3.2,p2z:1.5,_siz:2,_sizz:1};
mod_ra15_2[3] = {nam:"RAline3",p1x:6,p1y:-1,p1z:2.5,p2x:2,p2y:-1,p2z:2.5,_siz:1,_sizz:1};
mod_ra15_2[4] = {nam:"RAline4",p1x:4,p1y:2,p1z:0.6,p2x:5,p2y:0,p2z:-1,_siz:1.5,_sizz:0.5};
mod_ra15_2[5] = {nam:"RAline5",p1x:4,p1y:2,p1z:0.6,p2x:5,p2y:4,p2z:2.2,_siz:1.5,_sizz:0.5};
_global.mod_la16_1 = new Array();
mod_la16_1[0] = {nam:"LAline0",p1x:-3,p1y:-1,p1z:-1,p2x:-3,p2y:-1,p2z:1.5,_siz:1.5,_sizz:1.2};
mod_la16_1[1] = {nam:"LAline1",p1x:-3,p1y:-1,p1z:-1,p2x:-3,p2y:3,p2z:-1.5,_siz:1.5,_sizz:1.2};
mod_la16_1[2] = {nam:"LAline2",p1x:-3,p1y:-1,p1z:1.5,p2x:-4.5,p2y:-1,p2z:2,_siz:2.5,_sizz:0.6};
mod_la16_1[3] = {nam:"LAline3",p1x:-4.7,p1y:-1,p1z:2,p2x:-5.5,p2y:-1,p2z:3,_siz:1.5,_sizz:0.1};
_global.mod_la16_2 = new Array();
mod_la16_2[0] = {nam:"LAline0",p1x:-3,p1y:0.8,p1z:-0.3,p2x:-3,p2y:-1,p2z:1.5,_siz:1.5,_sizz:1.2};
mod_la16_2[1] = {nam:"LAline1",p1x:-3,p1y:0.8,p1z:-0.3,p2x:-3,p2y:3.2,p2z:1.5,_siz:1.5,_sizz:1.2};
mod_la16_2[2] = {nam:"LAline2",p1x:-3,p1y:-1,p1z:1.5,p2x:-4.5,p2y:-1,p2z:2,_siz:2.5,_sizz:0.6};
mod_la16_2[3] = {nam:"LAline3",p1x:-4.7,p1y:-1,p1z:2,p2x:-5.5,p2y:-1,p2z:3,_siz:1.5,_sizz:0.1};
_global.mod_ra16_1 = new Array();
mod_ra16_1[0] = {nam:"RAline0",p1x:3,p1y:-1,p1z:-1,p2x:3,p2y:-1,p2z:1.5,_siz:1.5,_sizz:1.2};
mod_ra16_1[1] = {nam:"RAline1",p1x:3,p1y:-1,p1z:-1,p2x:3,p2y:3,p2z:-1.5,_siz:1.5,_sizz:1.2};
mod_ra16_1[2] = {nam:"RAline2",p1x:3,p1y:-1,p1z:1.5,p2x:4.5,p2y:-1,p2z:2,_siz:2.5,_sizz:0.6};
mod_ra16_1[3] = {nam:"RAline3",p1x:4.7,p1y:-1,p1z:2,p2x:5.5,p2y:-1,p2z:3,_siz:1.5,_sizz:0.1};
_global.mod_ra16_2 = new Array();
mod_ra16_2[0] = {nam:"RAline0",p1x:3,p1y:0.8,p1z:-0.3,p2x:3,p2y:-1,p2z:1.5,_siz:1.5,_sizz:1.2};
mod_ra16_2[1] = {nam:"RAline1",p1x:3,p1y:0.8,p1z:-0.3,p2x:3,p2y:3.2,p2z:1.5,_siz:1.5,_sizz:1.2};
mod_ra16_2[2] = {nam:"RAline2",p1x:3,p1y:-1,p1z:1.5,p2x:4.5,p2y:-1,p2z:2,_siz:2.5,_sizz:0.6};
mod_ra16_2[3] = {nam:"RAline3",p1x:4.7,p1y:-1,p1z:2,p2x:5.5,p2y:-1,p2z:3,_siz:1.5,_sizz:0.1};
_global.mod_la17_1 = new Array();
mod_la17_1[0] = {nam:"LAline0",p1x:-3,p1y:-0.5,p1z:-1,p2x:-3,p2y:-0.5,p2z:1.5,_siz:1.5,_sizz:1.2};
mod_la17_1[1] = {nam:"LAline1",p1x:-3,p1y:-0.5,p1z:-1,p2x:-3,p2y:3,p2z:-1.5,_siz:1.5,_sizz:1.2};
mod_la17_1[2] = {nam:"LAline2",p1x:-4.5,p1y:0.5,p1z:3,p2x:-5,p2y:-3,p2z:-3,_siz:2.5,_sizz:0.1};
mod_la17_1[3] = {nam:"LAline3",p1x:-4.5,p1y:1,p1z:2.5,p2x:-5,p2y:-3,p2z:-3,_siz:2.5,_sizz:0.1};
_global.mod_la17_2 = new Array();
mod_la17_2[0] = {nam:"LAline0",p1x:-3,p1y:1.2,p1z:-0.3,p2x:-3,p2y:-0.5,p2z:1.5,_siz:1.5,_sizz:1.2};
mod_la17_2[1] = {nam:"LAline1",p1x:-3,p1y:1.2,p1z:-0.3,p2x:-3,p2y:4,p2z:1.5,_siz:1.5,_sizz:1.2};
mod_la17_2[2] = {nam:"LAline2",p1x:-4.5,p1y:0.5,p1z:3,p2x:-5,p2y:-3,p2z:-3,_siz:2.5,_sizz:0.1};
mod_la17_2[3] = {nam:"LAline3",p1x:-4.5,p1y:1,p1z:2.5,p2x:-5,p2y:-3,p2z:-3,_siz:2.5,_sizz:0.1};
_global.mod_ra17_1 = new Array();
mod_ra17_1[0] = {nam:"RAline0",p1x:3,p1y:-0.5,p1z:-1,p2x:3,p2y:-0.5,p2z:1.5,_siz:1.5,_sizz:1.2};
mod_ra17_1[1] = {nam:"RAline1",p1x:3,p1y:-0.5,p1z:-1,p2x:3,p2y:3,p2z:-1.5,_siz:1.5,_sizz:1.2};
mod_ra17_1[2] = {nam:"RAline2",p1x:4.5,p1y:0.5,p1z:3,p2x:5,p2y:-3,p2z:-3,_siz:2.5,_sizz:0.1};
mod_ra17_1[3] = {nam:"RAline3",p1x:4.5,p1y:1,p1z:2.5,p2x:5,p2y:-3,p2z:-3,_siz:2.5,_sizz:0.1};
_global.mod_ra17_2 = new Array();
mod_ra17_2[0] = {nam:"RAline0",p1x:3,p1y:1.2,p1z:-0.3,p2x:3,p2y:-0.5,p2z:1.5,_siz:1.5,_sizz:1.2};
mod_ra17_2[1] = {nam:"RAline1",p1x:3,p1y:1.2,p1z:-0.3,p2x:3,p2y:4,p2z:1.5,_siz:1.5,_sizz:1.2};
mod_ra17_2[2] = {nam:"RAline2",p1x:4.5,p1y:0.5,p1z:3,p2x:5,p2y:-3,p2z:-3,_siz:2.5,_sizz:0.1};
mod_ra17_2[3] = {nam:"RAline3",p1x:4.5,p1y:1,p1z:2.5,p2x:5,p2y:-3,p2z:-3,_siz:2.5,_sizz:0.1};
_global.mod_la18_1 = new Array();
mod_la18_1[0] = {nam:"LAline0",p1x:-3.5,p1y:-0.5,p1z:-1,p2x:-3.5,p2y:-0.5,p2z:1.5,_siz:1.5,_sizz:1.2};
mod_la18_1[1] = {nam:"LAline1",p1x:-3.5,p1y:-0.5,p1z:-1,p2x:-3,p2y:3.5,p2z:-1.5,_siz:1.5,_sizz:1.2};
mod_la18_1[2] = {nam:"LAline2",p1x:-2,p1y:-0.5,p1z:2,p2x:-5,p2y:-0.5,p2z:2.5,_siz:2.5,_sizz:1.5};
mod_la18_1[3] = {nam:"LAline3",p1x:-1,p1y:0.5,p1z:1,p2x:-4.5,p2y:1,p2z:1.5,_siz:1.5,_sizz:2.5};
mod_la18_1[4] = {nam:"LAline4",p1x:-1,p1y:-1.5,p1z:1,p2x:-4.5,p2y:-2,p2z:1.5,_siz:1.5,_sizz:2.5};
_global.mod_la18_2 = new Array();
mod_la18_2[0] = {nam:"LAline0",p1x:-3.5,p1y:1.2,p1z:-0.3,p2x:-3.5,p2y:-0.5,p2z:1.5,_siz:1.5,_sizz:1.2};
mod_la18_2[1] = {nam:"LAline1",p1x:-3.5,p1y:1.2,p1z:-0.3,p2x:-3.5,p2y:4,p2z:1.5,_siz:1.5,_sizz:1.2};
mod_la18_2[2] = {nam:"LAline2",p1x:-2,p1y:-0.5,p1z:2,p2x:-5,p2y:-0.5,p2z:2.5,_siz:2.5,_sizz:1.5};
mod_la18_2[3] = {nam:"LAline3",p1x:-1,p1y:0.5,p1z:1,p2x:-4.5,p2y:1,p2z:1.5,_siz:1.5,_sizz:2.5};
mod_la18_2[4] = {nam:"LAline4",p1x:-1,p1y:-1.5,p1z:1,p2x:-4.5,p2y:-2,p2z:1.5,_siz:1.5,_sizz:2.5};
_global.mod_ra18_1 = new Array();
mod_ra18_1[0] = {nam:"RAline0",p1x:3.5,p1y:-0.5,p1z:-1,p2x:3.5,p2y:-0.5,p2z:1.5,_siz:1.5,_sizz:1.2};
mod_ra18_1[1] = {nam:"RAline1",p1x:3.5,p1y:-0.5,p1z:-1,p2x:3.5,p2y:3,p2z:-1.5,_siz:1.5,_sizz:1.2};
mod_ra18_1[2] = {nam:"RAline2",p1x:2,p1y:-0.5,p1z:2,p2x:5,p2y:-0.5,p2z:2.5,_siz:2.5,_sizz:1.5};
mod_ra18_1[3] = {nam:"RAline3",p1x:1,p1y:0.5,p1z:1,p2x:4.5,p2y:1,p2z:1.5,_siz:1.5,_sizz:2.5};
mod_ra18_1[4] = {nam:"RAline4",p1x:1,p1y:-1.5,p1z:1,p2x:4.5,p2y:-2,p2z:1.5,_siz:1.5,_sizz:2.5};
_global.mod_ra18_2 = new Array();
mod_ra18_2[0] = {nam:"RAline0",p1x:3.5,p1y:1.2,p1z:-0.3,p2x:3.5,p2y:-0.5,p2z:1.5,_siz:1.5,_sizz:1.2};
mod_ra18_2[1] = {nam:"RAline1",p1x:3.5,p1y:1.2,p1z:-0.3,p2x:3.5,p2y:4,p2z:1.5,_siz:1.5,_sizz:1.2};
mod_ra18_2[2] = {nam:"RAline2",p1x:2,p1y:-0.5,p1z:2,p2x:5,p2y:-0.5,p2z:2.5,_siz:2.5,_sizz:1.5};
mod_ra18_2[3] = {nam:"RAline3",p1x:1,p1y:0.5,p1z:1,p2x:4.5,p2y:1,p2z:1.5,_siz:1.5,_sizz:2.5};
mod_ra18_2[4] = {nam:"RAline4",p1x:1,p1y:-1.5,p1z:1,p2x:4.5,p2y:-2,p2z:1.5,_siz:1.5,_sizz:2.5};
_global.mod_la19_1 = new Array();
mod_la19_1[0] = {nam:"LAline0",p1x:-3,p1y:-1,p1z:2,p2x:-2.5,p2y:-1,p2z:2,_siz:3,_sizz:1};
mod_la19_1[1] = {nam:"LAline1",p1x:-3,p1y:-1,p1z:-1,p2x:-3,p2y:-1,p2z:1.5,_siz:1.2,_sizz:1};
mod_la19_1[2] = {nam:"LAline2",p1x:-3,p1y:-1,p1z:-1,p2x:-3,p2y:2.5,p2z:-1.5,_siz:1.5,_sizz:1.2};
mod_la19_1[3] = {nam:"LAline3",p1x:-2,p1y:-1,p1z:1,p2x:-6,p2y:-1,p2z:5.5,_siz:1,_sizz:0.05};
_global.mod_la19_2 = new Array();
mod_la19_2[0] = {nam:"LAline0",p1x:-3,p1y:-1,p1z:2,p2x:-2.5,p2y:-1,p2z:2,_siz:3,_sizz:1};
mod_la19_2[1] = {nam:"LAline1",p1x:-3,p1y:0.8,p1z:-0.3,p2x:-3,p2y:-1,p2z:1.5,_siz:1.2,_sizz:1};
mod_la19_2[2] = {nam:"LAline2",p1x:-3,p1y:0.8,p1z:-0.3,p2x:-3,p2y:3.2,p2z:1.5,_siz:1.5,_sizz:1.2};
mod_la19_2[3] = {nam:"LAline3",p1x:-2,p1y:-1,p1z:1,p2x:-6,p2y:-1,p2z:5.5,_siz:1,_sizz:0.05};
_global.mod_ra19_1 = new Array();
mod_ra19_1[0] = {nam:"RAline0",p1x:3,p1y:-1,p1z:2,p2x:2.5,p2y:-1,p2z:2,_siz:3,_sizz:1};
mod_ra19_1[1] = {nam:"RAline1",p1x:3,p1y:-1,p1z:-1,p2x:3,p2y:-1,p2z:1.5,_siz:1.2,_sizz:1};
mod_ra19_1[2] = {nam:"RAline2",p1x:3,p1y:-1,p1z:-1,p2x:3,p2y:2.5,p2z:-1.5,_siz:1.5,_sizz:1.2};
mod_ra19_1[3] = {nam:"RAline3",p1x:2,p1y:-1,p1z:1,p2x:6,p2y:-1,p2z:5.5,_siz:1,_sizz:0.05};
_global.mod_ra19_2 = new Array();
mod_ra19_2[0] = {nam:"RAline0",p1x:3,p1y:-1,p1z:2,p2x:2.5,p2y:-1,p2z:2,_siz:3,_sizz:1};
mod_ra19_2[1] = {nam:"RAline1",p1x:3,p1y:0.8,p1z:-0.3,p2x:3,p2y:-1,p2z:1.5,_siz:1.2,_sizz:1};
mod_ra19_2[2] = {nam:"RAline2",p1x:2,p1y:-1,p1z:1,p2x:6,p2y:-1,p2z:5.5,_siz:1,_sizz:0.05};
mod_ra19_2[3] = {nam:"RAline3",p1x:2,p1y:-1,p1z:1,p2x:5,p2y:-1,p2z:-1.5,_siz:1,_sizz:0.5};
_global.mod_la20_1 = new Array();
mod_la20_1[0] = {nam:"LAline0",p1x:-3,p1y:-1,p1z:-1,p2x:-3,p2y:-1,p2z:1.5,_siz:1.5,_sizz:1.2};
mod_la20_1[1] = {nam:"LAline1",p1x:-3,p1y:-1,p1z:-1,p2x:-3,p2y:3,p2z:-1.5,_siz:1.5,_sizz:1.2};
mod_la20_1[2] = {nam:"LAline2",p1x:-2,p1y:-1,p1z:1.5,p2x:-5.5,p2y:-0.5,p2z:2.5,_siz:2.5,_sizz:0.1};
mod_la20_1[3] = {nam:"LAline3",p1x:-2,p1y:-1,p1z:1.5,p2x:-5.5,p2y:-1.5,p2z:2.5,_siz:2.5,_sizz:0.1};
_global.mod_la20_2 = new Array();
mod_la20_2[0] = {nam:"LAline0",p1x:-3,p1y:0.8,p1z:-0.3,p2x:-3,p2y:-1,p2z:1.5,_siz:1.5,_sizz:1.2};
mod_la20_2[1] = {nam:"LAline1",p1x:-3,p1y:0.8,p1z:-0.3,p2x:-3,p2y:3.2,p2z:1.5,_siz:1.5,_sizz:1.2};
mod_la20_2[2] = {nam:"LAline2",p1x:-2,p1y:-1,p1z:1.5,p2x:-5.5,p2y:-0.5,p2z:2.5,_siz:2.5,_sizz:0.1};
mod_la20_2[3] = {nam:"LAline3",p1x:-2,p1y:-1,p1z:1.5,p2x:-5.5,p2y:-1.5,p2z:2.5,_siz:2.5,_sizz:0.1};
_global.mod_ra20_1 = new Array();
mod_ra20_1[0] = {nam:"RAline0",p1x:3,p1y:-1,p1z:-1,p2x:3,p2y:-1,p2z:1.5,_siz:1.5,_sizz:1.2};
mod_ra20_1[1] = {nam:"RAline1",p1x:3,p1y:-1,p1z:-1,p2x:3,p2y:3,p2z:-1.5,_siz:1.5,_sizz:1.2};
mod_ra20_1[2] = {nam:"RAline2",p1x:2,p1y:-1,p1z:1.5,p2x:5.5,p2y:-0.5,p2z:2.5,_siz:2.5,_sizz:0.1};
mod_ra20_1[3] = {nam:"RAline3",p1x:2,p1y:-1,p1z:1.5,p2x:5.5,p2y:-1.5,p2z:2.5,_siz:2.5,_sizz:0.1};
_global.mod_ra20_2 = new Array();
mod_ra20_2[0] = {nam:"RAline0",p1x:3,p1y:0.8,p1z:-0.3,p2x:3,p2y:-1,p2z:1.5,_siz:1.5,_sizz:1.2};
mod_ra20_2[1] = {nam:"RAline1",p1x:3,p1y:0.8,p1z:-0.3,p2x:3,p2y:3.2,p2z:1.5,_siz:1.5,_sizz:1.2};
mod_ra20_2[2] = {nam:"RAline2",p1x:2,p1y:-1,p1z:1.5,p2x:5.5,p2y:-0.5,p2z:2.5,_siz:2.5,_sizz:0.1};
mod_ra20_2[3] = {nam:"RAline3",p1x:2,p1y:-1,p1z:1.5,p2x:5.5,p2y:-1.5,p2z:2.5,_siz:2.5,_sizz:0.1};
_global.mod_la21_1 = new Array();
mod_la21_1[0] = {nam:"LAline0",p1x:-3,p1y:-0.5,p1z:-1,p2x:-3,p2y:-0.5,p2z:1.5,_siz:1.5,_sizz:1.2};
mod_la21_1[1] = {nam:"LAline1",p1x:-3,p1y:-0.5,p1z:-1,p2x:-3,p2y:3,p2z:-1.5,_siz:1.5,_sizz:1.2};
mod_la21_1[2] = {nam:"LAline2",p1x:-3,p1y:0.5,p1z:2.5,p2x:-4.5,p2y:0,p2z:-1,_siz:2.5,_sizz:0.5};
mod_la21_1[3] = {nam:"LAline3",p1x:-3,p1y:-1.5,p1z:2.5,p2x:-4.5,p2y:-1,p2z:-1,_siz:2.5,_sizz:0.5};
_global.mod_la21_2 = new Array();
mod_la21_2[0] = {nam:"LAline0",p1x:-3,p1y:1.2,p1z:-0.3,p2x:-3,p2y:-0.5,p2z:1.5,_siz:1.5,_sizz:1.2};
mod_la21_2[1] = {nam:"LAline1",p1x:-3,p1y:1.2,p1z:-0.3,p2x:-3,p2y:4,p2z:1.5,_siz:1.5,_sizz:1.2};
mod_la21_2[2] = {nam:"LAline2",p1x:-3,p1y:0.5,p1z:2.5,p2x:-4.5,p2y:0,p2z:-1,_siz:2.5,_sizz:0.5};
mod_la21_2[3] = {nam:"LAline3",p1x:-3,p1y:-1.5,p1z:2.5,p2x:-4.5,p2y:-1,p2z:-1,_siz:2.5,_sizz:0.5};
_global.mod_ra21_1 = new Array();
mod_ra21_1[0] = {nam:"RAline0",p1x:3,p1y:-0.5,p1z:-1,p2x:3,p2y:-0.5,p2z:1.5,_siz:1.5,_sizz:1.2};
mod_ra21_1[1] = {nam:"RAline1",p1x:3,p1y:-0.5,p1z:-1,p2x:3,p2y:3,p2z:-1.5,_siz:1.5,_sizz:1.2};
mod_ra21_1[2] = {nam:"RAline2",p1x:3,p1y:0.5,p1z:2.5,p2x:4.5,p2y:0,p2z:-1,_siz:2.5,_sizz:0.5};
mod_ra21_1[3] = {nam:"RAline3",p1x:3,p1y:-1.5,p1z:2.5,p2x:4.5,p2y:-1,p2z:-1,_siz:2.5,_sizz:0.5};
_global.mod_ra21_2 = new Array();
mod_ra21_2[0] = {nam:"RAline0",p1x:3,p1y:1.2,p1z:-0.3,p2x:3,p2y:-0.5,p2z:1.5,_siz:1.5,_sizz:1.2};
mod_ra21_2[1] = {nam:"RAline1",p1x:3,p1y:1.2,p1z:-0.3,p2x:3,p2y:4,p2z:1.5,_siz:1.5,_sizz:1.2};
mod_ra21_2[2] = {nam:"RAline2",p1x:3,p1y:0.5,p1z:2.5,p2x:4.5,p2y:0,p2z:-1,_siz:2.5,_sizz:0.5};
mod_ra21_2[3] = {nam:"RAline3",p1x:3,p1y:-1.5,p1z:2.5,p2x:4.5,p2y:-1,p2z:-1,_siz:2.5,_sizz:0.5};
_global.mod_la22_1 = new Array();
mod_la22_1[0] = {nam:"LAline0",p1x:-3.5,p1y:-1,p1z:1.5,p2x:-0.5,p2y:-1,p2z:1,_siz:3,_sizz:0.5};
mod_la22_1[1] = {nam:"LAline1",p1x:-3,p1y:-1,p1z:-1,p2x:-3,p2y:-1,p2z:1.5,_siz:1.5,_sizz:1.2};
mod_la22_1[2] = {nam:"LAline2",p1x:-3,p1y:-1,p1z:-1,p2x:-3,p2y:2.5,p2z:-1.5,_siz:1.5,_sizz:1.2};
mod_la22_1[3] = {nam:"LAline3",p1x:-4,p1y:-2,p1z:-1,p2x:-4,p2y:5.5,p2z:-2.5,_siz:3,_sizz:0.25};
_global.mod_la22_2 = new Array();
mod_la22_2[0] = {nam:"LAline0",p1x:-3.5,p1y:-1,p1z:1.5,p2x:-0.5,p2y:-1,p2z:1,_siz:3,_sizz:0.5};
mod_la22_2[1] = {nam:"LAline1",p1x:-3,p1y:0.8,p1z:-0.3,p2x:-3,p2y:-1,p2z:1.5,_siz:1.5,_sizz:1.2};
mod_la22_2[2] = {nam:"LAline2",p1x:-3,p1y:0.8,p1z:-0.3,p2x:-3,p2y:3.2,p2z:1.5,_siz:1.5,_sizz:1.2};
mod_la22_2[3] = {nam:"LAline3",p1x:-4,p1y:0,p1z:-1,p2x:-4,p2y:4,p2z:4,_siz:3,_sizz:0.25};
_global.mod_ra22_1 = new Array();
mod_ra22_1[0] = {nam:"RAline0",p1x:3.5,p1y:-1,p1z:1.5,p2x:0.5,p2y:-1,p2z:1,_siz:3,_sizz:0.5};
mod_ra22_1[1] = {nam:"RAline1",p1x:3,p1y:-1,p1z:-1,p2x:3,p2y:-1,p2z:1.5,_siz:1.5,_sizz:1.2};
mod_ra22_1[2] = {nam:"RAline2",p1x:3,p1y:-1,p1z:-1,p2x:3,p2y:2.5,p2z:-1.5,_siz:1.5,_sizz:1.2};
mod_ra22_1[3] = {nam:"RAline3",p1x:4,p1y:-2,p1z:-1,p2x:4,p2y:5.5,p2z:-2.5,_siz:3,_sizz:0.25};
_global.mod_ra22_2 = new Array();
mod_ra22_2[0] = {nam:"RAline0",p1x:3.5,p1y:-1,p1z:1.5,p2x:0.5,p2y:-1,p2z:1,_siz:3,_sizz:0.5};
mod_ra22_2[1] = {nam:"RAline1",p1x:3,p1y:0.8,p1z:-0.3,p2x:3,p2y:-1,p2z:1.5,_siz:1.5,_sizz:1.2};
mod_ra22_2[2] = {nam:"RAline2",p1x:3,p1y:0.8,p1z:-0.3,p2x:3,p2y:3.2,p2z:1.5,_siz:1.5,_sizz:1.2};
mod_ra22_2[3] = {nam:"RAline3",p1x:4,p1y:0,p1z:-1,p2x:4,p2y:4,p2z:4,_siz:3,_sizz:0.25};
_global.mod_Swi1_1 = new Array();
mod_Swi1_1[0] = {nam:"WIline0",p1x:3,p1y:-3,p1z:0.75,p2x:9.75,p2y:-8.25,p2z:3,_siz:3,_sizz:2};
mod_Swi1_1[1] = {nam:"WIline1",p1x:-3,p1y:-3,p1z:0.75,p2x:-9.75,p2y:-8.25,p2z:3,_siz:3,_sizz:2};
mod_Swi1_1[2] = {nam:"WIline2",p1x:9.75,p1y:-8.25,p1z:3,p2x:15,p2y:-13.75,p2z:1.5,_siz:6,_sizz:0.2};
mod_Swi1_1[3] = {nam:"WIline3",p1x:-9.75,p1y:-8.25,p1z:3,p2x:-15,p2y:-13.75,p2z:1.5,_siz:6,_sizz:0.2};
mod_Swi1_1[4] = {nam:"WIline4",p1x:1.5,p1y:-6,p1z:0,p2x:3,p2y:-12,p2z:-3,_siz:1.5,_sizz:1};
mod_Swi1_1[5] = {nam:"WIline5",p1x:-1.5,p1y:-6,p1z:0,p2x:-3,p2y:-12,p2z:-3,_siz:1.5,_sizz:1};
mod_Swi1_1[6] = {nam:"WIline6",p1x:0,p1y:-3,p1z:1.5,p2x:0,p2y:-15,p2z:2.25,_siz:1.5,_sizz:1};
_global.mod_Swi1_2 = new Array();
mod_Swi1_2[0] = {nam:"WIline0",p1x:3,p1y:-3,p1z:0.75,p2x:9.75,p2y:-8.25,p2z:3,_siz:3,_sizz:2};
mod_Swi1_2[1] = {nam:"WIline1",p1x:-3,p1y:-3,p1z:0.75,p2x:-9.75,p2y:-8.25,p2z:3,_siz:3,_sizz:2};
mod_Swi1_2[2] = {nam:"WIline2",p1x:9.75,p1y:-8.25,p1z:3,p2x:15,p2y:-13.75,p2z:1.5,_siz:6,_sizz:0.2};
mod_Swi1_2[3] = {nam:"WIline3",p1x:-9.75,p1y:-8.25,p1z:3,p2x:-15,p2y:-13.75,p2z:1.5,_siz:6,_sizz:0.2};
mod_Swi1_2[4] = {nam:"WIline4",p1x:1.5,p1y:-6,p1z:0,p2x:3,p2y:-12,p2z:-3,_siz:1.5,_sizz:1};
mod_Swi1_2[5] = {nam:"WIline5",p1x:-1.5,p1y:-6,p1z:0,p2x:-3,p2y:-12,p2z:-3,_siz:1.5,_sizz:1};
mod_Swi1_2[6] = {nam:"WIline6",p1x:0,p1y:-3,p1z:1.5,p2x:0,p2y:-15,p2z:2.25,_siz:1.5,_sizz:1};
_global.mod_Swi1_3 = new Array();
mod_Swi1_3[0] = {nam:"WIline0",p1x:3,p1y:-3,p1z:0.75,p2x:11.25,p2y:-3,p2z:3,_siz:3,_sizz:2};
mod_Swi1_3[1] = {nam:"WIline1",p1x:-3,p1y:-3,p1z:0.75,p2x:-11.25,p2y:-3,p2z:3,_siz:3,_sizz:2};
mod_Swi1_3[2] = {nam:"WIline2",p1x:11.25,p1y:-3,p1z:3,p2x:18,p2y:0,p2z:2.25,_siz:6,_sizz:0.2};
mod_Swi1_3[3] = {nam:"WIline3",p1x:-11.25,p1y:-3,p1z:3,p2x:-18,p2y:0,p2z:2.25,_siz:6,_sizz:0.2};
mod_Swi1_3[4] = {nam:"WIline4",p1x:1.5,p1y:-6,p1z:0,p2x:3,p2y:-12,p2z:-3,_siz:1.5,_sizz:1};
mod_Swi1_3[5] = {nam:"WIline5",p1x:-1.5,p1y:-6,p1z:0,p2x:-3,p2y:-12,p2z:-3,_siz:1.5,_sizz:1};
mod_Swi1_3[6] = {nam:"WIline6",p1x:0,p1y:-3,p1z:1.5,p2x:0,p2y:-15,p2z:2.25,_siz:1.5,_sizz:1};
_global.mod_Swi1_4 = new Array();
mod_Swi1_4[0] = {nam:"WIline0",p1x:3,p1y:-3,p1z:0.75,p2x:11.25,p2y:-3,p2z:3,_siz:3,_sizz:2};
mod_Swi1_4[1] = {nam:"WIline1",p1x:-3,p1y:-3,p1z:0.75,p2x:-9.75,p2y:-8.25,p2z:3,_siz:3,_sizz:2};
mod_Swi1_4[2] = {nam:"WIline2",p1x:11.25,p1y:-3,p1z:3,p2x:18,p2y:-3,p2z:3,_siz:6,_sizz:0.2};
mod_Swi1_4[3] = {nam:"WIline3",p1x:-9.75,p1y:-8.25,p1z:3,p2x:-15,p2y:-11.25,p2z:1.5,_siz:6,_sizz:0.2};
mod_Swi1_4[4] = {nam:"WIline4",p1x:1.5,p1y:-6,p1z:0,p2x:3,p2y:-12,p2z:-3,_siz:1.5,_sizz:1};
mod_Swi1_4[5] = {nam:"WIline5",p1x:-1.5,p1y:-6,p1z:0,p2x:-3,p2y:-12,p2z:-3,_siz:1.5,_sizz:1};
mod_Swi1_4[6] = {nam:"WIline6",p1x:0,p1y:-3,p1z:1.5,p2x:0,p2y:-15,p2z:2.25,_siz:1.5,_sizz:1};
_global.mod_Swi1_5 = new Array();
mod_Swi1_5[0] = {nam:"WIline0",p1x:3,p1y:-3,p1z:0.75,p2x:9.75,p2y:-8.25,p2z:3,_siz:3,_sizz:2};
mod_Swi1_5[1] = {nam:"WIline1",p1x:-3,p1y:-3,p1z:0.75,p2x:-11.25,p2y:-3,p2z:3,_siz:3,_sizz:2};
mod_Swi1_5[2] = {nam:"WIline2",p1x:9.75,p1y:-8.25,p1z:3,p2x:15,p2y:-11.25,p2z:1.5,_siz:6,_sizz:0.2};
mod_Swi1_5[3] = {nam:"WIline3",p1x:-11.25,p1y:-3,p1z:3,p2x:-18,p2y:-3,p2z:3,_siz:6,_sizz:0.2};
mod_Swi1_5[4] = {nam:"WIline4",p1x:1.5,p1y:-6,p1z:0,p2x:3,p2y:-12,p2z:-3,_siz:1.5,_sizz:1};
mod_Swi1_5[5] = {nam:"WIline5",p1x:-1.5,p1y:-6,p1z:0,p2x:-3,p2y:-12,p2z:-3,_siz:1.5,_sizz:1};
mod_Swi1_5[6] = {nam:"WIline6",p1x:0,p1y:-3,p1z:1.5,p2x:0,p2y:-15,p2z:2.25,_siz:1.5,_sizz:1};
_global.mod_Swi2_1 = new Array();
mod_Swi2_1[0] = {nam:"WIline0",p1x:4,p1y:-5,p1z:3,p2x:12.5,p2y:-12,p2z:-9,_siz:7,_sizz:0.1};
mod_Swi2_1[1] = {nam:"WIline1",p1x:-4,p1y:-5,p1z:3,p2x:-12.5,p2y:-12,p2z:-9,_siz:7,_sizz:0.1};
mod_Swi2_1[2] = {nam:"WIline2",p1x:5,p1y:2,p1z:3,p2x:12.5,p2y:6,p2z:-10,_siz:7,_sizz:0.1};
mod_Swi2_1[3] = {nam:"WIline3",p1x:-5,p1y:2,p1z:3,p2x:-12.5,p2y:6,p2z:-10,_siz:7,_sizz:0.1};
_global.mod_Swi2_2 = new Array();
mod_Swi2_2[0] = {nam:"WIline0",p1x:4,p1y:0,p1z:5,p2x:12.5,p2y:-7,p2z:17,_siz:7,_sizz:0.1};
mod_Swi2_2[1] = {nam:"WIline1",p1x:-4,p1y:0,p1z:5,p2x:-12.5,p2y:-7,p2z:17,_siz:7,_sizz:0.1};
mod_Swi2_2[2] = {nam:"WIline2",p1x:6,p1y:1,p1z:-2,p2x:13.5,p2y:-3,p2z:-15,_siz:7,_sizz:0.1};
mod_Swi2_2[3] = {nam:"WIline3",p1x:-6,p1y:1,p1z:-2,p2x:-13.5,p2y:-3,p2z:-15,_siz:7,_sizz:0.1};
_global.mod_Swi2_3 = new Array();
mod_Swi2_3[0] = {nam:"WIline0",p1x:4,p1y:-3,p1z:1,p2x:12.5,p2y:4,p2z:-11,_siz:7,_sizz:0.1};
mod_Swi2_3[1] = {nam:"WIline1",p1x:-4,p1y:-3,p1z:1,p2x:-12.5,p2y:4,p2z:-11,_siz:7,_sizz:0.1};
mod_Swi2_3[2] = {nam:"WIline2",p1x:5,p1y:0,p1z:5,p2x:12.5,p2y:11,p2z:12,_siz:7,_sizz:0.1};
mod_Swi2_3[3] = {nam:"WIline3",p1x:-5,p1y:0,p1z:5,p2x:-12.5,p2y:11,p2z:12,_siz:7,_sizz:0.1};
_global.mod_Swi2_4 = new Array();
mod_Swi2_4[0] = {nam:"WIline0",p1x:4,p1y:-5,p1z:4,p2x:16.5,p2y:-12,p2z:9,_siz:7,_sizz:0.1};
mod_Swi2_4[1] = {nam:"WIline1",p1x:-4,p1y:-5,p1z:3,p2x:-8.5,p2y:-15,p2z:-9,_siz:7,_sizz:0.1};
mod_Swi2_4[2] = {nam:"WIline2",p1x:5,p1y:2,p1z:4,p2x:17.5,p2y:6,p2z:9,_siz:7,_sizz:0.1};
mod_Swi2_4[3] = {nam:"WIline3",p1x:-5,p1y:2,p1z:3,p2x:-8.5,p2y:9,p2z:-10,_siz:7,_sizz:0.1};
_global.mod_Swi2_5 = new Array();
mod_Swi2_5[0] = {nam:"WIline0",p1x:4,p1y:-5,p1z:3,p2x:8.5,p2y:-15,p2z:-9,_siz:7,_sizz:0.1};
mod_Swi2_5[1] = {nam:"WIline1",p1x:-4,p1y:-5,p1z:4,p2x:-16.5,p2y:-12,p2z:9,_siz:7,_sizz:0.1};
mod_Swi2_5[2] = {nam:"WIline2",p1x:5,p1y:2,p1z:3,p2x:8.5,p2y:9,p2z:-10,_siz:7,_sizz:0.1};
mod_Swi2_5[3] = {nam:"WIline3",p1x:-5,p1y:2,p1z:4,p2x:-17.5,p2y:6,p2z:9,_siz:7,_sizz:0.1};
_global.mod_wi1_1 = new Array();
mod_wi1_1[0] = {nam:"WIline0",p1x:2,p1y:-1.5,p1z:2.5,p2x:3,p2y:-3.5,p2z:3.7,_siz:1,_sizz:2.5};
mod_wi1_1[1] = {nam:"WIline1",p1x:-2,p1y:-1.5,p1z:2.5,p2x:-3,p2y:-3.5,p2z:3.7,_siz:1,_sizz:2.5};
mod_wi1_1[2] = {nam:"WIline2",p1x:3,p1y:-3.5,p1z:3.7,p2x:3.2,p2y:-5,p2z:1.5,_siz:2,_sizz:0.2};
mod_wi1_1[3] = {nam:"WIline3",p1x:-3,p1y:-3.5,p1z:3.7,p2x:-3.2,p2y:-5,p2z:1.5,_siz:2,_sizz:0.2};
_global.mod_wi1_2 = new Array();
mod_wi1_2[0] = {nam:"WIline0",p1x:2,p1y:0.5,p1z:2.5,p2x:3,p2y:1,p2z:5.2,_siz:1,_sizz:2.5};
mod_wi1_2[1] = {nam:"WIline1",p1x:-2,p1y:0.5,p1z:2.5,p2x:-3,p2y:1,p2z:5.2,_siz:1,_sizz:2.5};
mod_wi1_2[2] = {nam:"WIline2",p1x:3,p1y:1,p1z:5.2,p2x:3,p2y:-1.5,p2z:5.8,_siz:2,_sizz:0.2};
mod_wi1_2[3] = {nam:"WIline0",p1x:-3,p1y:1,p1z:5.2,p2x:-3,p2y:-1.5,p2z:5.8,_siz:2,_sizz:0.2};
_global.mod_wi1_3 = new Array();
mod_wi1_3[0] = {nam:"WIline17",p1x:2,p1y:-1.5,p1z:2.5,p2x:4,p2y:-3.5,p2z:3,_siz:1,_sizz:2.5};
mod_wi1_3[1] = {nam:"WIline18",p1x:-2,p1y:-1.5,p1z:2.5,p2x:-4,p2y:-3.5,p2z:3,_siz:1,_sizz:2.5};
mod_wi1_3[2] = {nam:"WIline19",p1x:4,p1y:-3.5,p1z:3,p2x:6.5,p2y:-2.5,p2z:3.5,_siz:2,_sizz:0.2};
mod_wi1_3[3] = {nam:"WIline20",p1x:-4,p1y:-3.5,p1z:3,p2x:-6.5,p2y:-2.5,p2z:3.5,_siz:2,_sizz:0.2};
_global.mod_wi1_4 = new Array();
mod_wi1_4[0] = {nam:"WIline0",p1x:2,p1y:-1.5,p1z:2.5,p2x:3,p2y:-3.5,p2z:3.7,_siz:1,_sizz:2.5};
mod_wi1_4[1] = {nam:"WIline1",p1x:-2,p1y:-1.5,p1z:2.5,p2x:-3,p2y:-3.5,p2z:3.7,_siz:1,_sizz:2.5};
mod_wi1_4[2] = {nam:"WIline2",p1x:3,p1y:-3.5,p1z:3.7,p2x:4.5,p2y:-4.5,p2z:2.5,_siz:2,_sizz:0.2};
mod_wi1_4[3] = {nam:"WIline3",p1x:-3,p1y:-3.5,p1z:3.7,p2x:-2,p2y:-5.5,p2z:2.5,_siz:2,_sizz:0.2};
_global.mod_wi1_5 = new Array();
mod_wi1_5[0] = {nam:"WIline0",p1x:2,p1y:-1.5,p1z:2.5,p2x:3,p2y:-3.5,p2z:3.7,_siz:1,_sizz:2.5};
mod_wi1_5[1] = {nam:"WIline1",p1x:-2,p1y:-1.5,p1z:2.5,p2x:-3,p2y:-3.5,p2z:3.7,_siz:1,_sizz:2.5};
mod_wi1_5[2] = {nam:"WIline2",p1x:3,p1y:-3.5,p1z:3.7,p2x:2,p2y:-5.5,p2z:2.5,_siz:2,_sizz:0.2};
mod_wi1_5[3] = {nam:"WIline3",p1x:-3,p1y:-3.5,p1z:3.7,p2x:-4.5,p2y:-4.5,p2z:2.5,_siz:2,_sizz:0.2};
_global.mod_wi2_1 = new Array();
mod_wi2_1[0] = {nam:"WIline0",p1x:3.5,p1y:-0.5,p1z:2,p2x:5,p2y:-0.5,p2z:-3,_siz:4.5,_sizz:0.5};
mod_wi2_1[1] = {nam:"WIline1",p1x:-3.5,p1y:-0.5,p1z:2,p2x:-5,p2y:-0.5,p2z:-3,_siz:4.5,_sizz:0.5};
mod_wi2_1[2] = {nam:"WIline2",p1x:4.5,p1y:-0.5,p1z:0,p2x:5,p2y:-0.5,p2z:-3,_siz:0.5,_sizz:5};
mod_wi2_1[3] = {nam:"WIline3",p1x:-4.5,p1y:-0.5,p1z:0,p2x:-5,p2y:-0.5,p2z:-3,_siz:0.5,_sizz:5};
_global.mod_wi2_2 = new Array();
mod_wi2_2[0] = {nam:"WIline0",p1x:3.5,p1y:-0.5,p1z:2,p2x:9.5,p2y:-0.5,p2z:1,_siz:4.5,_sizz:0.5};
mod_wi2_2[1] = {nam:"WIline1",p1x:-3.5,p1y:-0.5,p1z:2,p2x:-9.5,p2y:-0.5,p2z:1,_siz:4.5,_sizz:0.5};
mod_wi2_2[2] = {nam:"WIline2",p1x:9.5,p1y:1.5,p1z:2,p2x:9.5,p2y:-2,p2z:1,_siz:0.5,_sizz:5};
mod_wi2_2[3] = {nam:"WIline3",p1x:-9.5,p1y:1.5,p1z:2,p2x:-9.5,p2y:-2,p2z:1,_siz:0.5,_sizz:5};
_global.mod_wi2_3 = new Array();
mod_wi2_3[0] = {nam:"WIline0",p1x:3.5,p1y:-0.5,p1z:2,p2x:9.5,p2y:-0.5,p2z:1,_siz:4.5,_sizz:0.5};
mod_wi2_3[1] = {nam:"WIline1",p1x:-3.5,p1y:-0.5,p1z:2,p2x:-9.5,p2y:-0.5,p2z:1,_siz:4.5,_sizz:0.5};
mod_wi2_3[2] = {nam:"WIline2",p1x:9.5,p1y:-0.5,p1z:3,p2x:9.5,p2y:-0.5,p2z:0,_siz:0.5,_sizz:5};
mod_wi2_3[3] = {nam:"WIline3",p1x:-9.5,p1y:-0.5,p1z:3,p2x:-9.5,p2y:-0.5,p2z:0,_siz:0.5,_sizz:5};
_global.mod_wi2_4 = new Array();
mod_wi2_4[0] = {nam:"WIline0",p1x:3.5,p1y:-0.5,p1z:2,p2x:5,p2y:-0.5,p2z:-3,_siz:4.5,_sizz:0.5};
mod_wi2_4[1] = {nam:"WIline1",p1x:-3.5,p1y:-0.5,p1z:2,p2x:-5,p2y:-0.5,p2z:-3,_siz:4.5,_sizz:0.5};
mod_wi2_4[2] = {nam:"WIline2",p1x:4.5,p1y:-0.5,p1z:0,p2x:5,p2y:-0.5,p2z:-3,_siz:0.5,_sizz:5};
mod_wi2_4[3] = {nam:"WIline3",p1x:-4.5,p1y:-0.5,p1z:0,p2x:-5,p2y:-0.5,p2z:-3,_siz:0.5,_sizz:5};
_global.mod_wi2_5 = new Array();
mod_wi2_5[0] = {nam:"WIline0",p1x:3.5,p1y:-0.5,p1z:2,p2x:5,p2y:-0.5,p2z:-3,_siz:4.5,_sizz:0.5};
mod_wi2_5[1] = {nam:"WIline1",p1x:-3.5,p1y:-0.5,p1z:2,p2x:-5,p2y:-0.5,p2z:-3,_siz:4.5,_sizz:0.5};
mod_wi2_5[2] = {nam:"WIline2",p1x:4.5,p1y:-0.5,p1z:0,p2x:5,p2y:-0.5,p2z:-3,_siz:0.5,_sizz:5};
mod_wi2_5[3] = {nam:"WIline3",p1x:-4.5,p1y:-0.5,p1z:0,p2x:-5,p2y:-0.5,p2z:-3,_siz:0.5,_sizz:5};
_global.mod_wi3_1 = new Array();
mod_wi3_1[0] = {nam:"WIline0",p1x:3.5,p1y:-2,p1z:2,p2x:5.5,p2y:-2,p2z:1,_siz:3,_sizz:1.2};
mod_wi3_1[1] = {nam:"WIline1",p1x:-3.5,p1y:-2,p1z:2,p2x:-5.5,p2y:-2,p2z:1,_siz:3,_sizz:1.2};
_global.mod_wi3_2 = new Array();
mod_wi3_2[0] = {nam:"WIline0",p1x:3.5,p1y:0.5,p1z:1.5,p2x:5.5,p2y:-0.5,p2z:0.5,_siz:3,_sizz:1.2};
mod_wi3_2[1] = {nam:"WIline1",p1x:-3.5,p1y:0.5,p1z:1.5,p2x:-5.5,p2y:-0.5,p2z:0.5,_siz:3,_sizz:1.2};
_global.mod_wi3_3 = new Array();
mod_wi3_3[0] = {nam:"WIline0",p1x:3.5,p1y:-2,p1z:2,p2x:5.5,p2y:-2,p2z:1,_siz:3,_sizz:1.2};
mod_wi3_3[1] = {nam:"WIline1",p1x:-3.5,p1y:-2,p1z:2,p2x:-5.5,p2y:-2,p2z:1,_siz:3,_sizz:1.2};
_global.mod_wi3_4 = new Array();
mod_wi3_4[0] = {nam:"WIline0",p1x:3.5,p1y:-2,p1z:2,p2x:6,p2y:-1.5,p2z:1,_siz:3,_sizz:1.2};
mod_wi3_4[1] = {nam:"WIline1",p1x:-3.5,p1y:-2,p1z:2,p2x:-4.5,p2y:-2.5,p2z:1,_siz:3,_sizz:1.2};
_global.mod_wi3_5 = new Array();
mod_wi3_5[0] = {nam:"WIline0",p1x:3.5,p1y:-2,p1z:2,p2x:4.5,p2y:-2.5,p2z:1,_siz:3,_sizz:1.2};
mod_wi3_5[1] = {nam:"WIline1",p1x:-3.5,p1y:-2,p1z:2,p2x:-6,p2y:-1.5,p2z:1,_siz:3,_sizz:1.2};
_global.mod_wi4_1 = new Array();
mod_wi4_1[0] = {nam:"WIline0",p1x:3.5,p1y:-2,p1z:2,p2x:5.5,p2y:-2,p2z:1,_siz:3,_sizz:1};
mod_wi4_1[1] = {nam:"WIline1",p1x:-3.5,p1y:-2,p1z:2,p2x:-5.5,p2y:-2,p2z:1,_siz:3,_sizz:1};
mod_wi4_1[2] = {nam:"WIline2",p1x:2,p1y:-3,p1z:2.5,p2x:5,p2y:-8,p2z:8,_siz:3,_sizz:0.05};
mod_wi4_1[3] = {nam:"WIline3",p1x:-2,p1y:-3,p1z:2.5,p2x:-5,p2y:-8,p2z:8,_siz:3,_sizz:0.05};
_global.mod_wi4_2 = new Array();
mod_wi4_2[0] = {nam:"WIline0",p1x:3.5,p1y:0.5,p1z:1.5,p2x:5.5,p2y:-0.5,p2z:0.5,_siz:3,_sizz:1};
mod_wi4_2[1] = {nam:"WIline1",p1x:-3.5,p1y:0.5,p1z:1.5,p2x:-5.5,p2y:-0.5,p2z:0.5,_siz:3,_sizz:1};
mod_wi4_2[2] = {nam:"WIline2",p1x:2,p1y:0,p1z:3,p2x:5,p2y:0,p2z:10,_siz:3,_sizz:0.05};
mod_wi4_2[3] = {nam:"WIline3",p1x:-2,p1y:0,p1z:3,p2x:-5,p2y:0,p2z:10,_siz:3,_sizz:0.05};
_global.mod_wi4_3 = new Array();
mod_wi4_3[0] = {nam:"WIline0",p1x:3.5,p1y:-2,p1z:2,p2x:5.5,p2y:-2,p2z:1,_siz:3,_sizz:1};
mod_wi4_3[1] = {nam:"WIline1",p1x:-3.5,p1y:-2,p1z:2,p2x:-5.5,p2y:-2,p2z:1,_siz:3,_sizz:1};
mod_wi4_3[2] = {nam:"WIline2",p1x:2,p1y:-3,p1z:2.5,p2x:5,p2y:-8,p2z:8,_siz:3,_sizz:0.05};
mod_wi4_3[3] = {nam:"WIline3",p1x:-2,p1y:-3,p1z:2.5,p2x:-5,p2y:-8,p2z:8,_siz:3,_sizz:0.05};
_global.mod_wi4_4 = new Array();
mod_wi4_4[0] = {nam:"WIline0",p1x:3.5,p1y:-2,p1z:2,p2x:6,p2y:-1.5,p2z:1,_siz:3,_sizz:1};
mod_wi4_4[1] = {nam:"WIline1",p1x:-3.5,p1y:-2,p1z:2,p2x:-4.5,p2y:-2.5,p2z:1,_siz:3,_sizz:1};
mod_wi4_4[2] = {nam:"WIline2",p1x:2,p1y:-3,p1z:2.5,p2x:6,p2y:-8,p2z:8,_siz:3,_sizz:0.05};
mod_wi4_4[3] = {nam:"WIline3",p1x:-2,p1y:-3,p1z:2.5,p2x:-4,p2y:-8,p2z:8,_siz:3,_sizz:0.05};
_global.mod_wi4_5 = new Array();
mod_wi4_5[0] = {nam:"WIline0",p1x:3.5,p1y:-2,p1z:2,p2x:4.5,p2y:-2.5,p2z:1,_siz:3,_sizz:1};
mod_wi4_5[1] = {nam:"WIline1",p1x:-3.5,p1y:-2,p1z:2,p2x:-6,p2y:-1.5,p2z:1,_siz:3,_sizz:1};
mod_wi4_5[2] = {nam:"WIline2",p1x:2,p1y:-3,p1z:2.5,p2x:4,p2y:-8,p2z:8,_siz:3,_sizz:0.05};
mod_wi4_5[3] = {nam:"WIline3",p1x:-2,p1y:-3,p1z:2.5,p2x:-6,p2y:-8,p2z:8,_siz:3,_sizz:0.05};
_global.mod_wi5_1 = new Array();
mod_wi5_1[0] = {nam:"WIline0",p1x:-2.2,p1y:-1,p1z:1.5,p2x:-5,p2y:-1,p2z:2,_siz:3,_sizz:1.2};
mod_wi5_1[1] = {nam:"WIline1",p1x:-5,p1y:-1,p1z:2,p2x:-10,p2y:1,p2z:2.5,_siz:3.6,_sizz:0.1};
mod_wi5_1[2] = {nam:"WIline2",p1x:-5,p1y:-1,p1z:2,p2x:-10,p2y:-3,p2z:3,_siz:3.6,_sizz:0.1};
mod_wi5_1[3] = {nam:"WIline3",p1x:2.2,p1y:-1,p1z:1.5,p2x:5,p2y:-1,p2z:2,_siz:3,_sizz:1.2};
mod_wi5_1[4] = {nam:"WIline4",p1x:5,p1y:-1,p1z:2,p2x:10,p2y:1,p2z:2.5,_siz:3.6,_sizz:0.1};
mod_wi5_1[5] = {nam:"WIline5",p1x:5,p1y:-1,p1z:2,p2x:10,p2y:-3,p2z:3,_siz:3.6,_sizz:0.1};
_global.mod_wi5_2 = new Array();
mod_wi5_2[0] = {nam:"WIline0",p1x:-2.2,p1y:0,p1z:2,p2x:-5,p2y:-1,p2z:2,_siz:3,_sizz:1.2};
mod_wi5_2[1] = {nam:"WIline1",p1x:-5,p1y:-1,p1z:2,p2x:-10,p2y:-1,p2z:1,_siz:3.6,_sizz:0.1};
mod_wi5_2[2] = {nam:"WIline2",p1x:-5,p1y:-1,p1z:2,p2x:-10,p2y:-3,p2z:3,_siz:3.6,_sizz:0.1};
mod_wi5_2[3] = {nam:"WIline3",p1x:2.2,p1y:0,p1z:2,p2x:5,p2y:-1,p2z:2,_siz:3,_sizz:1.2};
mod_wi5_2[4] = {nam:"WIline4",p1x:5,p1y:-1,p1z:2,p2x:10,p2y:-1,p2z:1,_siz:3.6,_sizz:0.1};
mod_wi5_2[5] = {nam:"WIline5",p1x:5,p1y:-1,p1z:2,p2x:10,p2y:-3,p2z:3,_siz:3.6,_sizz:0.1};
_global.mod_wi5_3 = new Array();
mod_wi5_3[0] = {nam:"WIline0",p1x:-2.2,p1y:-1,p1z:1.5,p2x:-5,p2y:-1,p2z:2,_siz:3,_sizz:1.2};
mod_wi5_3[1] = {nam:"WIline1",p1x:-5,p1y:-1,p1z:2,p2x:-10,p2y:1,p2z:2.5,_siz:3.6,_sizz:0.1};
mod_wi5_3[2] = {nam:"WIline2",p1x:-5,p1y:-1,p1z:2,p2x:-10,p2y:-3,p2z:3,_siz:3.6,_sizz:0.1};
mod_wi5_3[3] = {nam:"WIline3",p1x:2.2,p1y:-1,p1z:1.5,p2x:5,p2y:-1,p2z:2,_siz:3,_sizz:1.2};
mod_wi5_3[4] = {nam:"WIline4",p1x:5,p1y:-1,p1z:2,p2x:10,p2y:1,p2z:2.5,_siz:3.6,_sizz:0.1};
mod_wi5_3[5] = {nam:"WIline5",p1x:5,p1y:-1,p1z:2,p2x:10,p2y:-3,p2z:3,_siz:3.6,_sizz:0.1};
_global.mod_wi5_4 = new Array();
mod_wi5_4[0] = {nam:"WIline0",p1x:-2.2,p1y:-1,p1z:1.5,p2x:-5,p2y:-1,p2z:2,_siz:3,_sizz:1.2};
mod_wi5_4[1] = {nam:"WIline1",p1x:-5,p1y:-1,p1z:2,p2x:-10,p2y:1,p2z:2.5,_siz:3.6,_sizz:0.1};
mod_wi5_4[2] = {nam:"WIline2",p1x:-5,p1y:-1,p1z:2,p2x:-10,p2y:-3,p2z:3,_siz:3.6,_sizz:0.1};
mod_wi5_4[3] = {nam:"WIline3",p1x:2.2,p1y:-1,p1z:1.5,p2x:5,p2y:-1,p2z:3,_siz:3,_sizz:1.2};
mod_wi5_4[4] = {nam:"WIline4",p1x:5,p1y:-1,p1z:3,p2x:10,p2y:1,p2z:4.5,_siz:3.6,_sizz:0.1};
mod_wi5_4[5] = {nam:"WIline5",p1x:5,p1y:-1,p1z:3,p2x:10,p2y:-3,p2z:5,_siz:3.6,_sizz:0.1};
_global.mod_wi5_5 = new Array();
mod_wi5_5[0] = {nam:"WIline0",p1x:-2.2,p1y:-1,p1z:1.5,p2x:-5,p2y:-1,p2z:3,_siz:3,_sizz:1.2};
mod_wi5_5[1] = {nam:"WIline1",p1x:-5,p1y:-1,p1z:3,p2x:-10,p2y:1,p2z:4.5,_siz:3.6,_sizz:0.1};
mod_wi5_5[2] = {nam:"WIline2",p1x:-5,p1y:-1,p1z:3,p2x:-10,p2y:-3,p2z:5,_siz:3.6,_sizz:0.1};
mod_wi5_5[3] = {nam:"WIline3",p1x:2.2,p1y:-1,p1z:1.5,p2x:5,p2y:-1,p2z:2,_siz:3,_sizz:1.2};
mod_wi5_5[4] = {nam:"WIline4",p1x:5,p1y:-1,p1z:2,p2x:10,p2y:1,p2z:2.5,_siz:3.6,_sizz:0.1};
mod_wi5_5[5] = {nam:"WIline5",p1x:5,p1y:-1,p1z:2,p2x:10,p2y:-3,p2z:3,_siz:3.6,_sizz:0.1};
_global.mod_wi6_1 = new Array();
mod_wi6_1[0] = {nam:"WIline0",p1x:1,p1y:-1.5,p1z:1.5,p2x:2,p2y:-1.5,p2z:3.5,_siz:0.5,_sizz:1};
mod_wi6_1[1] = {nam:"WIline1",p1x:-1,p1y:-1.5,p1z:1.5,p2x:-2,p2y:-1.5,p2z:3.5,_siz:0.5,_sizz:1};
mod_wi6_1[2] = {nam:"WIline2",p1x:1,p1y:-1.5,p1z:1.5,p2x:1,p2y:-1.5,p2z:0,_siz:2,_sizz:1};
mod_wi6_1[3] = {nam:"WIline3",p1x:-1,p1y:-1.5,p1z:1.5,p2x:-1,p2y:-1.5,p2z:0,_siz:2,_sizz:1};
_global.mod_wi6_2 = new Array();
mod_wi6_2[0] = {nam:"WIline0",p1x:1,p1y:0,p1z:1.5,p2x:2,p2y:2,p2z:2.2,_siz:0.5,_sizz:1};
mod_wi6_2[1] = {nam:"WIline1",p1x:-1,p1y:0,p1z:1.5,p2x:-2,p2y:2,p2z:2.2,_siz:0.5,_sizz:1};
mod_wi6_2[2] = {nam:"WIline2",p1x:1,p1y:0,p1z:2,p2x:1,p2y:-1.5,p2z:1.5,_siz:2,_sizz:1};
mod_wi6_2[3] = {nam:"WIline3",p1x:-1,p1y:0,p1z:2,p2x:-1,p2y:-1.5,p2z:1.5,_siz:2,_sizz:1};
_global.mod_wi6_3 = new Array();
mod_wi6_3[0] = {nam:"WIline0",p1x:1,p1y:-1.5,p1z:1.5,p2x:2,p2y:-1.5,p2z:3.5,_siz:0.5,_sizz:1};
mod_wi6_3[1] = {nam:"WIline1",p1x:-1,p1y:-1.5,p1z:1.5,p2x:-2,p2y:-1.5,p2z:3.5,_siz:0.5,_sizz:1};
mod_wi6_3[2] = {nam:"WIline2",p1x:1,p1y:-1.5,p1z:1.5,p2x:1,p2y:-1.5,p2z:0,_siz:2,_sizz:1};
mod_wi6_3[3] = {nam:"WIline3",p1x:-1,p1y:-1.5,p1z:1.5,p2x:-1,p2y:-1.5,p2z:0,_siz:2,_sizz:1};
_global.mod_wi6_4 = new Array();
mod_wi6_4[0] = {nam:"WIline0",p1x:1,p1y:-1.5,p1z:1.5,p2x:2,p2y:-1.5,p2z:3.5,_siz:0.5,_sizz:1};
mod_wi6_4[1] = {nam:"WIline1",p1x:-1,p1y:-1.5,p1z:1.5,p2x:-2,p2y:-1.5,p2z:3.5,_siz:0.5,_sizz:1};
mod_wi6_4[2] = {nam:"WIline2",p1x:1,p1y:-1.5,p1z:1.5,p2x:1,p2y:-1.5,p2z:0,_siz:2,_sizz:1};
mod_wi6_4[3] = {nam:"WIline3",p1x:-1,p1y:-1.5,p1z:1.5,p2x:-1,p2y:-1.5,p2z:0,_siz:2,_sizz:1};
_global.mod_wi6_5 = new Array();
mod_wi6_5[0] = {nam:"WIline0",p1x:1,p1y:-1.5,p1z:1.5,p2x:2,p2y:-1.5,p2z:3.5,_siz:0.5,_sizz:1};
mod_wi6_5[1] = {nam:"WIline1",p1x:-1,p1y:-1.5,p1z:1.5,p2x:-2,p2y:-1.5,p2z:3.5,_siz:0.5,_sizz:1};
mod_wi6_5[2] = {nam:"WIline2",p1x:1,p1y:-1.5,p1z:1.5,p2x:1,p2y:-1.5,p2z:0,_siz:2,_sizz:1};
mod_wi6_5[3] = {nam:"WIline3",p1x:-1,p1y:-1.5,p1z:1.5,p2x:-1,p2y:-1.5,p2z:0,_siz:2,_sizz:1};
_global.mod_wi7_1 = new Array();
mod_wi7_1[0] = {nam:"WIline0",p1x:1.5,p1y:-1,p1z:3,p2x:1,p2y:-2.5,p2z:0,_siz:2,_sizz:1.5};
mod_wi7_1[1] = {nam:"WIline1",p1x:-1.5,p1y:-1,p1z:3,p2x:-1,p2y:-2.5,p2z:0,_siz:2,_sizz:1.5};
mod_wi7_1[2] = {nam:"WIline2",p1x:1.5,p1y:-1,p1z:2.5,p2x:2,p2y:8,p2z:3.5,_siz:1.5,_sizz:0.8};
mod_wi7_1[3] = {nam:"WIline3",p1x:-1.5,p1y:-1,p1z:2.5,p2x:-2,p2y:8,p2z:3.5,_siz:1.5,_sizz:0.8};
_global.mod_wi7_2 = new Array();
mod_wi7_2[0] = {nam:"WIline0",p1x:1.5,p1y:0,p1z:3,p2x:1,p2y:-3,p2z:2.5,_siz:2,_sizz:1.5};
mod_wi7_2[1] = {nam:"WIline1",p1x:-1.5,p1y:0,p1z:3,p2x:-1,p2y:-3,p2z:2.5,_siz:2,_sizz:1.5};
mod_wi7_2[2] = {nam:"WIline2",p1x:1.5,p1y:0,p1z:3,p2x:2,p2y:9,p2z:3.5,_siz:1.5,_sizz:0.8};
mod_wi7_2[3] = {nam:"WIline3",p1x:-1.5,p1y:0,p1z:3,p2x:-2,p2y:9,p2z:3.5,_siz:1.5,_sizz:0.8};
_global.mod_wi7_3 = new Array();
mod_wi7_3[0] = {nam:"WIline0",p1x:1.5,p1y:-1,p1z:3,p2x:1,p2y:-2.5,p2z:0,_siz:2,_sizz:1.5};
mod_wi7_3[1] = {nam:"WIline1",p1x:-1.5,p1y:-1,p1z:3,p2x:-1,p2y:-2.5,p2z:0,_siz:2,_sizz:1.5};
mod_wi7_3[2] = {nam:"WIline2",p1x:1.5,p1y:-1,p1z:2.5,p2x:2,p2y:8,p2z:3.5,_siz:1.5,_sizz:0.8};
mod_wi7_3[3] = {nam:"WIline3",p1x:-1.5,p1y:-1,p1z:2.5,p2x:-2,p2y:8,p2z:3.5,_siz:1.5,_sizz:0.8};
_global.mod_wi7_4 = new Array();
mod_wi7_4[0] = {nam:"WIline0",p1x:1.5,p1y:-1,p1z:3,p2x:1,p2y:-2.5,p2z:0,_siz:2,_sizz:1.5};
mod_wi7_4[1] = {nam:"WIline1",p1x:-1.5,p1y:-1,p1z:3,p2x:-1,p2y:-2.5,p2z:0,_siz:2,_sizz:1.5};
mod_wi7_4[2] = {nam:"WIline2",p1x:1.5,p1y:-1,p1z:2.5,p2x:2,p2y:8,p2z:3.5,_siz:1.5,_sizz:0.5};
mod_wi7_4[3] = {nam:"WIline3",p1x:-1.5,p1y:-1,p1z:2.5,p2x:-2,p2y:8,p2z:3.5,_siz:1.5,_sizz:0.8};
_global.mod_wi7_5 = new Array();
mod_wi7_5[0] = {nam:"WIline0",p1x:1.5,p1y:-1,p1z:3,p2x:1,p2y:-2.5,p2z:0,_siz:2,_sizz:1.5};
mod_wi7_5[1] = {nam:"WIline1",p1x:-1.5,p1y:-1,p1z:3,p2x:-1,p2y:-2.5,p2z:0,_siz:2,_sizz:1.5};
mod_wi7_5[2] = {nam:"WIline2",p1x:1.5,p1y:-1,p1z:2.5,p2x:2,p2y:8,p2z:3.5,_siz:1.5,_sizz:0.8};
mod_wi7_5[3] = {nam:"WIline3",p1x:-1.5,p1y:-1,p1z:2.5,p2x:-2,p2y:8,p2z:3.5,_siz:1.5,_sizz:0.8};
_global.mod_wi8_1 = new Array();
mod_wi8_1[0] = {nam:"WIline0",p1x:0,p1y:-2.5,p1z:1.5,p2x:0,p2y:-4.5,p2z:-4,_siz:2.5,_sizz:0.2};
mod_wi8_1[1] = {nam:"WIline1",p1x:2,p1y:-2,p1z:3,p2x:1,p2y:-3,p2z:-4,_siz:2,_sizz:0.5};
mod_wi8_1[2] = {nam:"WIline2",p1x:-2,p1y:-2,p1z:3,p2x:-1,p2y:-3,p2z:-4,_siz:2,_sizz:0.5};
mod_wi8_1[3] = {nam:"WIline3",p1x:3.5,p1y:-2,p1z:2,p2x:1.5,p2y:-3,p2z:-4,_siz:2,_sizz:0.5};
mod_wi8_1[4] = {nam:"WIline4",p1x:-3.5,p1y:-2,p1z:2,p2x:-1.5,p2y:-3,p2z:-4,_siz:2,_sizz:0.5};
_global.mod_wi8_2 = new Array();
mod_wi8_2[0] = {nam:"WIline0",p1x:0,p1y:-1,p1z:3.5,p2x:0,p2y:-5,p2z:9,_siz:2.5,_sizz:0.2};
mod_wi8_2[1] = {nam:"WIline1",p1x:2,p1y:-0.5,p1z:3.5,p2x:1,p2y:-7,p2z:0,_siz:2,_sizz:0.5};
mod_wi8_2[2] = {nam:"WIline2",p1x:-2,p1y:-0.5,p1z:3.5,p2x:-1,p2y:-7,p2z:0,_siz:2,_sizz:0.5};
mod_wi8_2[3] = {nam:"WIline3",p1x:3.5,p1y:-1,p1z:2.5,p2x:1.5,p2y:-7,p2z:0,_siz:2,_sizz:0.5};
mod_wi8_2[4] = {nam:"WIline4",p1x:-3.5,p1y:-1,p1z:2.5,p2x:-1.5,p2y:-7,p2z:0,_siz:2,_sizz:0.5};
_global.mod_wi8_3 = new Array();
mod_wi8_3[0] = {nam:"WIline0",p1x:0,p1y:-2.5,p1z:1.5,p2x:0,p2y:-4.5,p2z:-4,_siz:2.5,_sizz:0.2};
mod_wi8_3[1] = {nam:"WIline1",p1x:2,p1y:-2,p1z:3,p2x:1,p2y:-3,p2z:-4,_siz:2,_sizz:0.5};
mod_wi8_3[2] = {nam:"WIline2",p1x:-2,p1y:-2,p1z:3,p2x:-1,p2y:-3,p2z:-4,_siz:2,_sizz:0.5};
mod_wi8_3[3] = {nam:"WIline3",p1x:3.5,p1y:-2,p1z:2,p2x:1.5,p2y:-3,p2z:-4,_siz:2,_sizz:0.5};
mod_wi8_3[4] = {nam:"WIline4",p1x:-3.5,p1y:-2,p1z:2,p2x:-1.5,p2y:-3,p2z:-4,_siz:2,_sizz:0.5};
_global.mod_wi8_4 = new Array();
mod_wi8_4[0] = {nam:"WIline0",p1x:0,p1y:-2.5,p1z:1.5,p2x:0,p2y:-4.5,p2z:-4,_siz:2.5,_sizz:0.2};
mod_wi8_4[1] = {nam:"WIline1",p1x:2,p1y:-2,p1z:3,p2x:1,p2y:-3,p2z:-4,_siz:2,_sizz:0.5};
mod_wi8_4[2] = {nam:"WIline2",p1x:-2,p1y:-2,p1z:3,p2x:-1,p2y:-3,p2z:-4,_siz:2,_sizz:0.5};
mod_wi8_4[3] = {nam:"WIline3",p1x:3.5,p1y:-2,p1z:2,p2x:1.5,p2y:-3,p2z:-4,_siz:2,_sizz:0.5};
mod_wi8_4[4] = {nam:"WIline4",p1x:-3.5,p1y:-2,p1z:2,p2x:-1.5,p2y:-3,p2z:-4,_siz:2,_sizz:0.5};
_global.mod_wi8_5 = new Array();
mod_wi8_5[0] = {nam:"WIline0",p1x:0,p1y:-2.5,p1z:1.5,p2x:0,p2y:-4.5,p2z:-4,_siz:2.5,_sizz:0.2};
mod_wi8_5[1] = {nam:"WIline1",p1x:2,p1y:-2,p1z:3,p2x:1,p2y:-3,p2z:-4,_siz:2,_sizz:0.5};
mod_wi8_5[2] = {nam:"WIline2",p1x:-2,p1y:-2,p1z:3,p2x:-1,p2y:-3,p2z:-4,_siz:2,_sizz:0.5};
mod_wi8_5[3] = {nam:"WIline3",p1x:3.5,p1y:-2,p1z:2,p2x:1.5,p2y:-3,p2z:-4,_siz:2,_sizz:0.5};
mod_wi8_5[4] = {nam:"WIline4",p1x:-3.5,p1y:-2,p1z:2,p2x:-1.5,p2y:-3,p2z:-4,_siz:2,_sizz:0.5};
_global.mod_wi9_1 = new Array();
mod_wi9_1[0] = {nam:"WIline0",p1x:1,p1y:-1.5,p1z:2.5,p2x:2,p2y:-3.5,p2z:3.7,_siz:1,_sizz:1.5};
mod_wi9_1[1] = {nam:"WIline1",p1x:-1,p1y:-1.5,p1z:2.5,p2x:-2,p2y:-3.5,p2z:3.7,_siz:1,_sizz:1.5};
mod_wi9_1[2] = {nam:"WIline2",flag:"fy1",p1x:1.3,p1y:-2.1,p1z:2,p2x:2,p2y:-4.5,p2z:-5.7,_siz:1.5,_sizz:0.2};
mod_wi9_1[3] = {nam:"WIline3",flag:"fy2",p1x:-1.3,p1y:-2.1,p1z:2,p2x:-2,p2y:-4.5,p2z:-5.7,_siz:1.5,_sizz:0.2};
mod_wi9_1[4] = {nam:"WIline4",flag:"fy3",p1x:1.6,p1y:-2.7,p1z:2.2,p2x:2.4,p2y:-5.8,p2z:-5.1,_siz:1.5,_sizz:0.2};
mod_wi9_1[5] = {nam:"WIline5",flag:"fy4",p1x:-1.6,p1y:-2.7,p1z:2.2,p2x:-2.4,p2y:-5.8,p2z:-5.1,_siz:1.5,_sizz:0.2};
mod_wi9_1[6] = {nam:"WIline6",flag:"fy5",p1x:1.9,p1y:-3.5,p1z:2.3,p2x:2.8,p2y:-8,p2z:-4.2,_siz:1.5,_sizz:0.2};
mod_wi9_1[7] = {nam:"WIline7",flag:"fy6",p1x:-1.9,p1y:-3.5,p1z:2.3,p2x:-2.8,p2y:-8,p2z:-4.2,_siz:1.5,_sizz:0.2};
mod_wi9_1[8] = {nam:"WIline8",p1x:0.5,p1y:-1.5,p1z:1,p2x:1,p2y:-6,p2z:-5,_siz:1,_sizz:1.2};
mod_wi9_1[9] = {nam:"WIline9",p1x:-0.5,p1y:-1.5,p1z:1,p2x:-1,p2y:-6,p2z:-5,_siz:1,_sizz:1.2};
_global.mod_wi9_2 = new Array();
mod_wi9_2[0] = {nam:"WIline1",p1x:1,p1y:0.5,p1z:1.9,p2x:2,p2y:1,p2z:4.5,_siz:1,_sizz:1.5};
mod_wi9_2[1] = {nam:"WIline2",p1x:-1,p1y:0.5,p1z:1.9,p2x:-2,p2y:1,p2z:4.5,_siz:1,_sizz:1.5};
mod_wi9_2[2] = {nam:"WIline2",flag:"fy1",p1x:1.3,p1y:-0.5,p1z:2.6,p2x:3,p2y:-8.5,p2z:2.7,_siz:1.5,_sizz:0.2};
mod_wi9_2[3] = {nam:"WIline3",flag:"fy2",p1x:-1.3,p1y:-0.5,p1z:2.6,p2x:-3,p2y:-8.5,p2z:2.7,_siz:1.5,_sizz:0.2};
mod_wi9_2[4] = {nam:"WIline4",flag:"fy3",p1x:1.6,p1y:0,p1z:3.3,p2x:3.5,p2y:-7.9,p2z:4.8,_siz:1.5,_sizz:0.2};
mod_wi9_2[5] = {nam:"WIline5",flag:"fy4",p1x:-1.6,p1y:0,p1z:3.3,p2x:-3.5,p2y:-7.9,p2z:4.8,_siz:1.5,_sizz:0.2};
mod_wi9_2[6] = {nam:"WIline6",flag:"fy5",p1x:1.9,p1y:0.5,p1z:4,p2x:4,p2y:-7.2,p2z:8.2,_siz:1.5,_sizz:0.2};
mod_wi9_2[7] = {nam:"WIline7",flag:"fy6",p1x:-1.9,p1y:0.5,p1z:4,p2x:-4,p2y:-7.2,p2z:8.2,_siz:1.5,_sizz:0.2};
mod_wi9_2[8] = {nam:"WIline8",p1x:0.5,p1y:-1.5,p1z:2,p2x:1.5,p2y:-10,p2z:2,_siz:1,_sizz:1.2};
mod_wi9_2[9] = {nam:"WIline9",p1x:-0.5,p1y:-1.5,p1z:2,p2x:-1.5,p2y:-10,p2z:2,_siz:1,_sizz:1.2};
_global.mod_wi9_3 = new Array();
mod_wi9_3[0] = {nam:"WIline0",p1x:1,p1y:-1.5,p1z:2.5,p2x:4.2,p2y:-2,p2z:3.7,_siz:1,_sizz:1.5};
mod_wi9_3[1] = {nam:"WIline1",p1x:-1,p1y:-1.5,p1z:2.5,p2x:-4.2,p2y:-2,p2z:3.7,_siz:1,_sizz:1.5};
mod_wi9_3[2] = {nam:"WIline2",flag:"fy1",p1x:2,p1y:-1.6,p1z:2,p2x:5,p2y:-2.5,p2z:-5.7,_siz:1.5,_sizz:0.2};
mod_wi9_3[3] = {nam:"WIline3",flag:"fy2",p1x:-2,p1y:-1.6,p1z:2,p2x:-5,p2y:-2.5,p2z:-5.7,_siz:1.5,_sizz:0.2};
mod_wi9_3[4] = {nam:"WIline4",flag:"fy3",p1x:3,p1y:-1.7,p1z:2.2,p2x:6.5,p2y:-2.8,p2z:-5.1,_siz:1.5,_sizz:0.2};
mod_wi9_3[5] = {nam:"WIline5",flag:"fy4",p1x:-3,p1y:-1.7,p1z:2.2,p2x:-6.5,p2y:-2.8,p2z:-5.1,_siz:1.5,_sizz:0.2};
mod_wi9_3[6] = {nam:"WIline6",flag:"fy5",p1x:4,p1y:-1.9,p1z:2.3,p2x:8,p2y:-3,p2z:-4.2,_siz:1.5,_sizz:0.2};
mod_wi9_3[7] = {nam:"WIline7",flag:"fy6",p1x:-4,p1y:-1.9,p1z:2.3,p2x:-8,p2y:-3,p2z:-4.2,_siz:1.5,_sizz:0.2};
mod_wi9_3[8] = {nam:"WIline8",p1x:0.5,p1y:-1.5,p1z:1,p2x:1.5,p2y:-6,p2z:-4.5,_siz:1,_sizz:1.2};
mod_wi9_3[9] = {nam:"WIline9",p1x:-0.5,p1y:-1.5,p1z:1,p2x:-1.5,p2y:-6,p2z:-4.5,_siz:1,_sizz:1.2};
_global.mod_wi9_4 = new Array();
mod_wi9_4[0] = {nam:"WIline0",p1x:1,p1y:-1.5,p1z:2.5,p2x:2.4,p2y:-3.2,p2z:3.7,_siz:1,_sizz:1.5};
mod_wi9_4[1] = {nam:"WIline1",p1x:-1,p1y:-1.5,p1z:2.5,p2x:-2,p2y:-3.5,p2z:3.7,_siz:1,_sizz:1.5};
mod_wi9_4[2] = {nam:"WIline2",flag:"fy1",p1x:1.4,p1y:-2,p1z:2,p2x:4,p2y:-4.3,p2z:-5,_siz:1.5,_sizz:0.2};
mod_wi9_4[3] = {nam:"WIline3",flag:"fy2",p1x:-1.3,p1y:-2.1,p1z:2,p2x:-2,p2y:-4.5,p2z:-5.7,_siz:1.5,_sizz:0.2};
mod_wi9_4[4] = {nam:"WIline4",flag:"fy3",p1x:1.7,p1y:-2.6,p1z:2.2,p2x:5,p2y:-5.2,p2z:-4.4,_siz:1.5,_sizz:0.2};
mod_wi9_4[5] = {nam:"WIline5",flag:"fy4",p1x:-1.6,p1y:-2.7,p1z:2.2,p2x:-2.4,p2y:-5.8,p2z:-5.1,_siz:1.5,_sizz:0.2};
mod_wi9_4[6] = {nam:"WIline6",flag:"fy5",p1x:2,p1y:-3.4,p1z:2.3,p2x:6.8,p2y:-6.5,p2z:-3.5,_siz:1.5,_sizz:0.2};
mod_wi9_4[7] = {nam:"WIline7",flag:"fy6",p1x:-1.9,p1y:-3.5,p1z:2.3,p2x:-2.8,p2y:-8,p2z:-4.2,_siz:1.5,_sizz:0.2};
mod_wi9_4[8] = {nam:"WIline8",p1x:0.5,p1y:-1.5,p1z:1,p2x:1,p2y:-6,p2z:-5,_siz:1,_sizz:1.2};
mod_wi9_4[9] = {nam:"WIline9",p1x:-0.5,p1y:-1.5,p1z:1,p2x:-1,p2y:-6,p2z:-5,_siz:1,_sizz:1.2};
_global.mod_wi9_5 = new Array();
mod_wi9_5[0] = {nam:"WIline0",p1x:1,p1y:-1.5,p1z:2.5,p2x:2,p2y:-3.5,p2z:3.7,_siz:1,_sizz:1.5};
mod_wi9_5[1] = {nam:"WIline1",p1x:-1,p1y:-1.5,p1z:2.5,p2x:-2.4,p2y:-3.2,p2z:3.7,_siz:1,_sizz:1.5};
mod_wi9_5[2] = {nam:"WIline2",flag:"fy1",p1x:1.3,p1y:-2.1,p1z:2,p2x:2,p2y:-4.5,p2z:-5.7,_siz:1.5,_sizz:0.2};
mod_wi9_5[3] = {nam:"WIline3",flag:"fy2",p1x:-1.4,p1y:-2,p1z:2,p2x:-4,p2y:-4.3,p2z:-5,_siz:1.5,_sizz:0.2};
mod_wi9_5[4] = {nam:"WIline4",flag:"fy3",p1x:1.6,p1y:-2.7,p1z:2.2,p2x:2.4,p2y:-5.8,p2z:-5.1,_siz:1.5,_sizz:0.2};
mod_wi9_5[5] = {nam:"WIline5",flag:"fy4",p1x:-1.7,p1y:-2.6,p1z:2.2,p2x:-5,p2y:-5.2,p2z:-4.4,_siz:1.5,_sizz:0.2};
mod_wi9_5[6] = {nam:"WIline6",flag:"fy5",p1x:1.9,p1y:-3.5,p1z:2.3,p2x:2.8,p2y:-8,p2z:-4.2,_siz:1.5,_sizz:0.2};
mod_wi9_5[7] = {nam:"WIline7",flag:"fy6",p1x:-2,p1y:-3.4,p1z:2.3,p2x:-6.8,p2y:-6.5,p2z:-3.5,_siz:1.5,_sizz:0.2};
mod_wi9_5[8] = {nam:"WIline8",p1x:0.5,p1y:-1.5,p1z:1,p2x:1,p2y:-6,p2z:-5,_siz:1,_sizz:1.2};
mod_wi9_5[9] = {nam:"WIline9",p1x:-0.5,p1y:-1.5,p1z:1,p2x:-1,p2y:-6,p2z:-5,_siz:1,_sizz:1.2};
_global.mod_wi10_1 = new Array();
mod_wi10_1[0] = {nam:"WIline0",p1x:1.2,p1y:-1.5,p1z:2,p2x:1.7,p2y:-2,p2z:4,_siz:1,_sizz:0.8};
mod_wi10_1[1] = {nam:"WIline1",p1x:-1.2,p1y:-1.5,p1z:2,p2x:-1.7,p2y:-2,p2z:4,_siz:1,_sizz:0.8};
_global.mod_wi10_2 = new Array();
mod_wi10_2[0] = {nam:"WIline0",p1x:1.2,p1y:-0.3,p1z:2.5,p2x:1.7,p2y:2.5,p2z:4.2,_siz:1,_sizz:0.8};
mod_wi10_2[1] = {nam:"WIline1",p1x:-1.2,p1y:-0.3,p1z:2.5,p2x:-1.7,p2y:2.5,p2z:4.2,_siz:1,_sizz:0.8};
_global.mod_wi10_3 = new Array();
mod_wi10_3[0] = {nam:"WIline0",p1x:1.2,p1y:-1.5,p1z:2,p2x:1.7,p2y:-2,p2z:4,_siz:1,_sizz:0.8};
mod_wi10_3[1] = {nam:"WIline1",p1x:-1.2,p1y:-1.5,p1z:2,p2x:-1.7,p2y:-2,p2z:4,_siz:1,_sizz:0.8};
_global.mod_wi10_4 = new Array();
mod_wi10_4[0] = {nam:"WIline0",p1x:1.2,p1y:-1.5,p1z:2,p2x:1.7,p2y:-2,p2z:4,_siz:1,_sizz:0.8};
mod_wi10_4[1] = {nam:"WIline1",p1x:-1.2,p1y:-1.5,p1z:2,p2x:-1.7,p2y:-2,p2z:4,_siz:1,_sizz:0.8};
_global.mod_wi10_5 = new Array();
mod_wi10_5[0] = {nam:"WIline0",p1x:1.2,p1y:-1.5,p1z:2,p2x:1.7,p2y:-2,p2z:4,_siz:1,_sizz:0.8};
mod_wi10_5[1] = {nam:"WIline1",p1x:-1.2,p1y:-1.5,p1z:2,p2x:-1.7,p2y:-2,p2z:4,_siz:1,_sizz:0.8};
_global.mod_wi11_1 = new Array();
mod_wi11_1[0] = {nam:"WIline0",p1x:1,p1y:-1.5,p1z:1.5,p2x:2,p2y:-1.5,p2z:3.5,_siz:0.5,_sizz:1};
mod_wi11_1[1] = {nam:"WIline1",flag:"fy1",p1x:-1.2,p1y:-2.1,p1z:2,p2x:-0.6,p2y:0,p2z:9.1,_siz:1.5,_sizz:0.2};
mod_wi11_1[2] = {nam:"WIline2",flag:"fy5",p1x:-1.2,p1y:-2.1,p1z:2,p2x:-2,p2y:-4.5,p2z:-5.7,_siz:1.5,_sizz:0.2};
mod_wi11_1[3] = {nam:"WIline3",flag:"fy2",p1x:-2.2,p1y:-2.2,p1z:2.1,p2x:-1,p2y:0,p2z:9.1,_siz:1.5,_sizz:0.2};
mod_wi11_1[4] = {nam:"WIline4",flag:"fy2",p1x:-2.2,p1y:-2.2,p1z:2.1,p2x:-3.3,p2y:-4.7,p2z:-5.1,_siz:1.5,_sizz:0.2};
mod_wi11_1[5] = {nam:"WIline5",flag:"fy3",p1x:-3.2,p1y:-2.3,p1z:2.2,p2x:-1.4,p2y:0,p2z:9.1,_siz:1.5,_sizz:0.2};
mod_wi11_1[6] = {nam:"WIline6",flag:"fy6",p1x:-3.2,p1y:-2.3,p1z:2.2,p2x:-5.5,p2y:-4.9,p2z:-4.5,_siz:1.5,_sizz:0.2};
mod_wi11_1[7] = {nam:"WIline7",flag:"fy4",p1x:-4.2,p1y:-2.4,p1z:2.3,p2x:-1.8,p2y:0,p2z:9.1,_siz:1.5,_sizz:0.2};
mod_wi11_1[8] = {nam:"WIline8",flag:"fy4",p1x:-4.2,p1y:-2.4,p1z:2.3,p2x:-6.8,p2y:-5.1,p2z:-3.9,_siz:1.5,_sizz:0.2};
_global.mod_wi11_2 = new Array();
mod_wi11_2[0] = {nam:"WIline0",p1x:1,p1y:0,p1z:1.9,p2x:2,p2y:2,p2z:3,_siz:0.5,_sizz:1};
mod_wi11_2[1] = {nam:"WIline1",flag:"fy1",p1x:-1.2,p1y:-2.1,p1z:2,p2x:-0.6,p2y:5,p2z:4.1,_siz:1.5,_sizz:0.2};
mod_wi11_2[2] = {nam:"WIline2",flag:"fy5",p1x:-1.2,p1y:-2.1,p1z:2,p2x:-2,p2y:-9.5,p2z:-0.7,_siz:1.5,_sizz:0.2};
mod_wi11_2[3] = {nam:"WIline3",flag:"fy2",p1x:-2.2,p1y:-2.2,p1z:2.1,p2x:-1,p2y:5,p2z:4.1,_siz:1.5,_sizz:0.2};
mod_wi11_2[4] = {nam:"WIline4",flag:"fy2",p1x:-2.2,p1y:-2.2,p1z:2.1,p2x:-3.3,p2y:-9.7,p2z:-0.1,_siz:1.5,_sizz:0.2};
mod_wi11_2[5] = {nam:"WIline5",flag:"fy3",p1x:-3.2,p1y:-2.3,p1z:2.2,p2x:-1.4,p2y:5,p2z:4.1,_siz:1.5,_sizz:0.2};
mod_wi11_2[6] = {nam:"WIline6",flag:"fy6",p1x:-3.2,p1y:-2.3,p1z:2.2,p2x:-5.5,p2y:-9.9,p2z:0.5,_siz:1.5,_sizz:0.2};
mod_wi11_2[7] = {nam:"WIline7",flag:"fy4",p1x:-4.2,p1y:-2.4,p1z:2.3,p2x:-1.8,p2y:5,p2z:4.1,_siz:1.5,_sizz:0.2};
mod_wi11_2[8] = {nam:"WIline8",flag:"fy4",p1x:-4.2,p1y:-2.4,p1z:2.3,p2x:-6.8,p2y:-10.1,p2z:1.1,_siz:1.5,_sizz:0.2};
_global.mod_wi11_3 = new Array();
mod_wi11_3[0] = {nam:"WIline0",p1x:1,p1y:-1.5,p1z:1.5,p2x:2,p2y:-1.5,p2z:3.5,_siz:0.5,_sizz:1};
mod_wi11_3[1] = {nam:"WIline1",flag:"fy1",p1x:-1.2,p1y:-2.1,p1z:2,p2x:-0.6,p2y:0,p2z:9.1,_siz:1.5,_sizz:0.2};
mod_wi11_3[2] = {nam:"WIline2",flag:"fy5",p1x:-1.2,p1y:-2.1,p1z:2,p2x:-2,p2y:-4.5,p2z:-5.7,_siz:1.5,_sizz:0.2};
mod_wi11_3[3] = {nam:"WIline3",flag:"fy2",p1x:-2.2,p1y:-2.2,p1z:2.1,p2x:-1,p2y:0,p2z:9.1,_siz:1.5,_sizz:0.2};
mod_wi11_3[4] = {nam:"WIline4",flag:"fy2",p1x:-2.2,p1y:-2.2,p1z:2.1,p2x:-3.3,p2y:-4.7,p2z:-5.1,_siz:1.5,_sizz:0.2};
mod_wi11_3[5] = {nam:"WIline5",flag:"fy3",p1x:-3.2,p1y:-2.3,p1z:2.2,p2x:-1.4,p2y:0,p2z:9.1,_siz:1.5,_sizz:0.2};
mod_wi11_3[6] = {nam:"WIline6",flag:"fy6",p1x:-3.2,p1y:-2.3,p1z:2.2,p2x:-5.5,p2y:-4.9,p2z:-4.5,_siz:1.5,_sizz:0.2};
mod_wi11_3[7] = {nam:"WIline7",flag:"fy4",p1x:-4.2,p1y:-2.4,p1z:2.3,p2x:-1.8,p2y:0,p2z:9.1,_siz:1.5,_sizz:0.2};
mod_wi11_3[8] = {nam:"WIline8",flag:"fy4",p1x:-4.2,p1y:-2.4,p1z:2.3,p2x:-6.8,p2y:-5.1,p2z:-3.9,_siz:1.5,_sizz:0.2};
_global.mod_wi11_4 = new Array();
mod_wi11_4[0] = {nam:"WIline0",p1x:1,p1y:-1.5,p1z:1.5,p2x:2,p2y:-1.5,p2z:3.5,_siz:0.5,_sizz:1};
mod_wi11_4[1] = {nam:"WIline1",flag:"fy1",p1x:-1.2,p1y:-2.1,p1z:2,p2x:-0.6,p2y:0,p2z:9.1,_siz:1.5,_sizz:0.2};
mod_wi11_4[2] = {nam:"WIline2",flag:"fy5",p1x:-1.2,p1y:-2.1,p1z:2,p2x:-2,p2y:-4.5,p2z:-5.7,_siz:1.5,_sizz:0.2};
mod_wi11_4[3] = {nam:"WIline3",flag:"fy2",p1x:-2.2,p1y:-2.2,p1z:2.1,p2x:-1,p2y:0,p2z:9.1,_siz:1.5,_sizz:0.2};
mod_wi11_4[4] = {nam:"WIline4",flag:"fy2",p1x:-2.2,p1y:-2.2,p1z:2.1,p2x:-3.3,p2y:-4.7,p2z:-5.1,_siz:1.5,_sizz:0.2};
mod_wi11_4[5] = {nam:"WIline5",flag:"fy3",p1x:-3.2,p1y:-2.3,p1z:2.2,p2x:-1.4,p2y:0,p2z:9.1,_siz:1.5,_sizz:0.2};
mod_wi11_4[6] = {nam:"WIline6",flag:"fy6",p1x:-3.2,p1y:-2.3,p1z:2.2,p2x:-5.5,p2y:-4.9,p2z:-4.5,_siz:1.5,_sizz:0.2};
mod_wi11_4[7] = {nam:"WIline7",flag:"fy4",p1x:-4.2,p1y:-2.4,p1z:2.3,p2x:-1.8,p2y:0,p2z:9.1,_siz:1.5,_sizz:0.2};
mod_wi11_4[8] = {nam:"WIline8",flag:"fy4",p1x:-4.2,p1y:-2.4,p1z:2.3,p2x:-6.8,p2y:-5.1,p2z:-3.9,_siz:1.5,_sizz:0.2};
_global.mod_wi11_5 = new Array();
mod_wi11_5[0] = {nam:"WIline0",p1x:1,p1y:-1.5,p1z:1.5,p2x:2,p2y:-1.5,p2z:3.5,_siz:0.5,_sizz:1};
mod_wi11_5[1] = {nam:"WIline1",flag:"fy1",p1x:-1.2,p1y:-2.1,p1z:2,p2x:-0.6,p2y:0,p2z:9.1,_siz:1.5,_sizz:0.2};
mod_wi11_5[2] = {nam:"WIline2",flag:"fy5",p1x:-1.2,p1y:-2.1,p1z:2,p2x:-2,p2y:-4.5,p2z:-5.7,_siz:1.5,_sizz:0.2};
mod_wi11_5[3] = {nam:"WIline3",flag:"fy2",p1x:-2.2,p1y:-2.2,p1z:2.1,p2x:-1,p2y:0,p2z:9.1,_siz:1.5,_sizz:0.2};
mod_wi11_5[4] = {nam:"WIline4",flag:"fy2",p1x:-2.2,p1y:-2.2,p1z:2.1,p2x:-3.3,p2y:-4.7,p2z:-5.1,_siz:1.5,_sizz:0.2};
mod_wi11_5[5] = {nam:"WIline5",flag:"fy3",p1x:-3.2,p1y:-2.3,p1z:2.2,p2x:-1.4,p2y:0,p2z:9.1,_siz:1.5,_sizz:0.2};
mod_wi11_5[6] = {nam:"WIline6",flag:"fy6",p1x:-3.2,p1y:-2.3,p1z:2.2,p2x:-5.5,p2y:-4.9,p2z:-4.5,_siz:1.5,_sizz:0.2};
mod_wi11_5[7] = {nam:"WIline7",flag:"fy4",p1x:-4.2,p1y:-2.4,p1z:2.3,p2x:-1.8,p2y:0,p2z:9.1,_siz:1.5,_sizz:0.2};
mod_wi11_5[8] = {nam:"WIline8",flag:"fy4",p1x:-4.2,p1y:-2.4,p1z:2.3,p2x:-6.8,p2y:-5.1,p2z:-3.9,_siz:1.5,_sizz:0.2};
_global.mod_wi12_1 = new Array();
mod_wi12_1[0] = {nam:"WIline0",p1x:0,p1y:-2.5,p1z:2,p2x:0,p2y:-4.5,p2z:-5,_siz:3,_sizz:0.2};
mod_wi12_1[1] = {nam:"WIline1",p1x:1.5,p1y:-2,p1z:1.5,p2x:1.5,p2y:-2.5,p2z:0,_siz:3,_sizz:1};
mod_wi12_1[2] = {nam:"WIline2",p1x:-1.5,p1y:-2,p1z:1.5,p2x:-1.5,p2y:-2.5,p2z:0,_siz:3,_sizz:1};
mod_wi12_1[3] = {nam:"WIline3",p1x:2.5,p1y:-2,p1z:5,p2x:2.5,p2y:-2,p2z:0,_siz:0.8,_sizz:1};
mod_wi12_1[4] = {nam:"WIline4",p1x:-2.5,p1y:-2,p1z:5,p2x:-2.5,p2y:-2,p2z:0,_siz:0.8,_sizz:1};
mod_wi12_1[5] = {nam:"WIline5",p1x:3.5,p1y:-4,p1z:2,p2x:3.5,p2y:-3,p2z:-3,_siz:3.5,_sizz:0.5};
mod_wi12_1[6] = {nam:"WIline6",p1x:-3.5,p1y:-4,p1z:2,p2x:-3.5,p2y:-3,p2z:-3,_siz:3.5,_sizz:0.5};
_global.mod_wi12_2 = new Array();
mod_wi12_2[0] = {nam:"WIline0",p1x:0,p1y:0,p1z:3,p2x:0,p2y:-5,p2z:9,_siz:3,_sizz:0.2};
mod_wi12_2[1] = {nam:"WIline1",p1x:1.5,p1y:-0.5,p1z:2,p2x:1.5,p2y:-3,p2z:1.5,_siz:3,_sizz:1};
mod_wi12_2[2] = {nam:"WIline2",p1x:-1.5,p1y:-0.5,p1z:2,p2x:-1.5,p2y:-3,p2z:1.5,_siz:3,_sizz:1};
mod_wi12_2[3] = {nam:"WIline3",p1x:2.5,p1y:4,p1z:2.5,p2x:2.5,p2y:-0.5,p2z:2.2,_siz:0.8,_sizz:1};
mod_wi12_2[4] = {nam:"WIline4",p1x:-2.5,p1y:4,p1z:2.5,p2x:-2.5,p2y:-0.5,p2z:2.2,_siz:0.8,_sizz:1};
mod_wi12_2[5] = {nam:"WIline5",p1x:3.5,p1y:0,p1z:3,p2x:3.5,p2y:-6,p2z:2,_siz:3.5,_sizz:0.5};
mod_wi12_2[6] = {nam:"WIline6",p1x:-3.5,p1y:0,p1z:3,p2x:-3.5,p2y:-6,p2z:2,_siz:3.5,_sizz:0.5};
_global.mod_wi12_3 = new Array();
mod_wi12_3[0] = {nam:"WIline0",p1x:0,p1y:-2.5,p1z:2,p2x:0,p2y:-4.5,p2z:-5,_siz:3,_sizz:0.2};
mod_wi12_3[1] = {nam:"WIline1",p1x:1.5,p1y:-2,p1z:1.5,p2x:1.5,p2y:-2.5,p2z:0,_siz:3,_sizz:1};
mod_wi12_3[2] = {nam:"WIline2",p1x:-1.5,p1y:-2,p1z:1.5,p2x:-1.5,p2y:-2.5,p2z:0,_siz:3,_sizz:1};
mod_wi12_3[3] = {nam:"WIline3",p1x:2.5,p1y:-2,p1z:5,p2x:2.5,p2y:-2,p2z:0,_siz:0.8,_sizz:1};
mod_wi12_3[4] = {nam:"WIline4",p1x:-2.5,p1y:-2,p1z:5,p2x:-2.5,p2y:-2,p2z:0,_siz:0.8,_sizz:1};
mod_wi12_3[5] = {nam:"WIline5",p1x:3.5,p1y:-4,p1z:2,p2x:3.5,p2y:-3,p2z:-3,_siz:3.5,_sizz:0.5};
mod_wi12_3[6] = {nam:"WIline6",p1x:-3.5,p1y:-4,p1z:2,p2x:-3.5,p2y:-3,p2z:-3,_siz:3.5,_sizz:0.5};
_global.mod_wi12_4 = new Array();
mod_wi12_4[0] = {nam:"WIline0",p1x:0,p1y:-2.5,p1z:2,p2x:0,p2y:-4.5,p2z:-5,_siz:3,_sizz:0.2};
mod_wi12_4[1] = {nam:"WIline1",p1x:1.5,p1y:-2,p1z:1.5,p2x:1.5,p2y:-2.5,p2z:0,_siz:3,_sizz:1};
mod_wi12_4[2] = {nam:"WIline2",p1x:-1.5,p1y:-2,p1z:1.5,p2x:-1.5,p2y:-2.5,p2z:0,_siz:3,_sizz:1};
mod_wi12_4[3] = {nam:"WIline3",p1x:2.5,p1y:-2,p1z:5,p2x:2.5,p2y:-2,p2z:0,_siz:0.8,_sizz:1};
mod_wi12_4[4] = {nam:"WIline4",p1x:-2.5,p1y:-2,p1z:5,p2x:-2.5,p2y:-2,p2z:0,_siz:0.8,_sizz:1};
mod_wi12_4[5] = {nam:"WIline5",p1x:3.5,p1y:-4,p1z:2,p2x:6.5,p2y:-4,p2z:-1,_siz:3.5,_sizz:0.5};
mod_wi12_4[6] = {nam:"WIline6",p1x:-3.5,p1y:-4,p1z:2,p2x:-3.5,p2y:-3,p2z:-3,_siz:3.5,_sizz:0.5};
_global.mod_wi12_5 = new Array();
mod_wi12_5[0] = {nam:"WIline0",p1x:0,p1y:-2.5,p1z:2,p2x:0,p2y:-4.5,p2z:-5,_siz:3,_sizz:0.2};
mod_wi12_5[1] = {nam:"WIline1",p1x:1.5,p1y:-2,p1z:1.5,p2x:1.5,p2y:-2.5,p2z:0,_siz:3,_sizz:1};
mod_wi12_5[2] = {nam:"WIline2",p1x:-1.5,p1y:-2,p1z:1.5,p2x:-1.5,p2y:-2.5,p2z:0,_siz:3,_sizz:1};
mod_wi12_5[3] = {nam:"WIline3",p1x:2.5,p1y:-2,p1z:5,p2x:2.5,p2y:-2,p2z:0,_siz:0.8,_sizz:1};
mod_wi12_5[4] = {nam:"WIline4",p1x:-2.5,p1y:-2,p1z:5,p2x:-2.5,p2y:-2,p2z:0,_siz:0.8,_sizz:1};
mod_wi12_5[5] = {nam:"WIline5",p1x:3.5,p1y:-4,p1z:2,p2x:3.5,p2y:-3,p2z:-3,_siz:3.5,_sizz:0.5};
mod_wi12_5[6] = {nam:"WIline6",p1x:-3.5,p1y:-4,p1z:2,p2x:-6.5,p2y:-4,p2z:-1,_siz:3.5,_sizz:0.5};
_global.mod_wi13_1 = new Array();
mod_wi13_1[0] = {nam:"WIline0",p1x:1.2,p1y:-2,p1z:3.5,p2x:1.2,p2y:-2.5,p2z:-1,_siz:2,_sizz:1.8};
mod_wi13_1[1] = {nam:"WIline1",p1x:-1.2,p1y:-2,p1z:3.5,p2x:-1.2,p2y:-2.5,p2z:-1,_siz:2,_sizz:1.8};
mod_wi13_1[2] = {nam:"WIline2",p1x:3.5,p1y:-2,p1z:5,p2x:2,p2y:-2,p2z:0,_siz:0.8,_sizz:1};
mod_wi13_1[3] = {nam:"WIline3",p1x:-3.5,p1y:-2,p1z:5,p2x:-2,p2y:-2,p2z:0,_siz:0.8,_sizz:1};
_global.mod_wi13_2 = new Array();
mod_wi13_2[0] = {nam:"WIline0",p1x:1.2,p1y:2,p1z:3,p2x:1.2,p2y:-3,p2z:1.5,_siz:2,_sizz:1.8};
mod_wi13_2[1] = {nam:"WIline1",p1x:-1.2,p1y:2,p1z:3,p2x:-1.2,p2y:-3,p2z:1.5,_siz:2,_sizz:1.8};
mod_wi13_2[2] = {nam:"WIline2",p1x:3.5,p1y:4,p1z:2.5,p2x:2.5,p2y:-0.5,p2z:2.2,_siz:0.8,_sizz:1};
mod_wi13_2[3] = {nam:"WIline3",p1x:-3.5,p1y:4,p1z:2.5,p2x:-2.5,p2y:-0.5,p2z:2.2,_siz:0.8,_sizz:1};
_global.mod_wi13_3 = new Array();
mod_wi13_3[0] = {nam:"WIline0",p1x:1.2,p1y:-2,p1z:3.5,p2x:1.2,p2y:-2.5,p2z:-1,_siz:2,_sizz:1.8};
mod_wi13_3[1] = {nam:"WIline1",p1x:-1.2,p1y:-2,p1z:3.5,p2x:-1.2,p2y:-2.5,p2z:-1,_siz:2,_sizz:1.8};
mod_wi13_3[2] = {nam:"WIline2",p1x:3.5,p1y:-2,p1z:5,p2x:2,p2y:-2,p2z:0,_siz:0.8,_sizz:1};
mod_wi13_3[3] = {nam:"WIline3",p1x:-3.5,p1y:-2,p1z:5,p2x:-2,p2y:-2,p2z:0,_siz:0.8,_sizz:1};
_global.mod_wi13_4 = new Array();
mod_wi13_4[0] = {nam:"WIline0",p1x:1.2,p1y:-2,p1z:3.5,p2x:1.2,p2y:-2.5,p2z:-1,_siz:2,_sizz:1.8};
mod_wi13_4[1] = {nam:"WIline1",p1x:-1.2,p1y:-2,p1z:3.5,p2x:-1.2,p2y:-2.5,p2z:-1,_siz:2,_sizz:1.8};
mod_wi13_4[2] = {nam:"WIline2",p1x:3.5,p1y:-2,p1z:5,p2x:2,p2y:-2,p2z:0,_siz:0.8,_sizz:1};
mod_wi13_4[3] = {nam:"WIline3",p1x:-3.5,p1y:-2,p1z:5,p2x:-2,p2y:-2,p2z:0,_siz:0.8,_sizz:1};
_global.mod_wi13_5 = new Array();
mod_wi13_5[0] = {nam:"WIline0",p1x:1.2,p1y:-2,p1z:3.5,p2x:1.2,p2y:-2.5,p2z:-1,_siz:2,_sizz:1.8};
mod_wi13_5[1] = {nam:"WIline1",p1x:-1.2,p1y:-2,p1z:3.5,p2x:-1.2,p2y:-2.5,p2z:-1,_siz:2,_sizz:1.8};
mod_wi13_5[2] = {nam:"WIline2",p1x:3.5,p1y:-2,p1z:5,p2x:2,p2y:-2,p2z:0,_siz:0.8,_sizz:1};
mod_wi13_5[3] = {nam:"WIline3",p1x:-3.5,p1y:-2,p1z:5,p2x:-2,p2y:-2,p2z:0,_siz:0.8,_sizz:1};
_global.mod_wi14_1 = new Array();
mod_wi14_1[0] = {nam:"WIline0",p1x:1.5,p1y:-2.5,p1z:1.5,p2x:-4,p2y:-2,p2z:4,_siz:2,_sizz:0.1};
mod_wi14_1[1] = {nam:"WIline1",p1x:-1.5,p1y:-2.5,p1z:-1.5,p2x:-4,p2y:-2,p2z:4,_siz:2,_sizz:0.1};
mod_wi14_1[2] = {nam:"WIline2",p1x:1.5,p1y:-2.5,p1z:1.5,p2x:4,p2y:-2,p2z:-4,_siz:2,_sizz:0.1};
mod_wi14_1[3] = {nam:"WIline3",p1x:-1.5,p1y:-2.5,p1z:-1.5,p2x:4,p2y:-2,p2z:-4,_siz:2,_sizz:0.1};
mod_wi14_1[4] = {nam:"WIline4",p1x:0,p1y:-2.5,p1z:0,p2x:4,p2y:-2,p2z:-4,_siz:2.5,_sizz:0.1};
mod_wi14_1[5] = {nam:"WIline5",p1x:0,p1y:-2.5,p1z:0,p2x:-4,p2y:-2,p2z:4,_siz:2.5,_sizz:0.1};
_global.mod_wi14_2 = new Array();
mod_wi14_2[0] = {nam:"WIline0",p1x:1.5,p1y:-0.5,p1z:2.8,p2x:-3.8,p2y:2,p2z:3,_siz:2,_sizz:0.1};
mod_wi14_2[1] = {nam:"WIline1",p1x:-1.5,p1y:-3.5,p1z:2.6,p2x:-3.8,p2y:2,p2z:3,_siz:2,_sizz:0.1};
mod_wi14_2[2] = {nam:"WIline2",p1x:1.5,p1y:-0.5,p1z:2.8,p2x:3.8,p2y:-6,p2z:1,_siz:2,_sizz:0.1};
mod_wi14_2[3] = {nam:"WIline3",p1x:-1.5,p1y:-3.5,p1z:2.6,p2x:3.8,p2y:-6,p2z:1,_siz:2,_sizz:0.1};
mod_wi14_2[4] = {nam:"WIline4",p1x:0,p1y:-2,p1z:2.7,p2x:-3.8,p2y:2,p2z:3,_siz:2.5,_sizz:0.1};
mod_wi14_2[5] = {nam:"WIline5",p1x:0,p1y:-2,p1z:2.7,p2x:3.8,p2y:-6,p2z:1,_siz:2.5,_sizz:0.1};
_global.mod_wi14_3 = new Array();
mod_wi14_3[0] = {nam:"WIline0",p1x:1.5,p1y:-2.5,p1z:1.5,p2x:-4,p2y:-2,p2z:4,_siz:2,_sizz:0.1};
mod_wi14_3[1] = {nam:"WIline1",p1x:-1.5,p1y:-2.5,p1z:-1.5,p2x:-4,p2y:-2,p2z:4,_siz:2,_sizz:0.1};
mod_wi14_3[2] = {nam:"WIline2",p1x:1.5,p1y:-2.5,p1z:1.5,p2x:4,p2y:-2,p2z:-4,_siz:2,_sizz:0.1};
mod_wi14_3[3] = {nam:"WIline3",p1x:-1.5,p1y:-2.5,p1z:-1.5,p2x:4,p2y:-2,p2z:-4,_siz:2,_sizz:0.1};
mod_wi14_3[4] = {nam:"WIline4",p1x:0,p1y:-2.5,p1z:0,p2x:4,p2y:-2,p2z:-4,_siz:2.5,_sizz:0.1};
mod_wi14_3[5] = {nam:"WIline5",p1x:0,p1y:-2.5,p1z:0,p2x:-4,p2y:-2,p2z:4,_siz:2.5,_sizz:0.1};
_global.mod_wi14_4 = new Array();
mod_wi14_4[0] = {nam:"WIline0",p1x:1.5,p1y:-2.5,p1z:1.5,p2x:-4,p2y:-2,p2z:4,_siz:2,_sizz:0.1};
mod_wi14_4[1] = {nam:"WIline1",p1x:-1.5,p1y:-2.5,p1z:-1.5,p2x:-4,p2y:-2,p2z:4,_siz:2,_sizz:0.1};
mod_wi14_4[2] = {nam:"WIline2",p1x:1.5,p1y:-2.5,p1z:1.5,p2x:4,p2y:-2,p2z:-4,_siz:2,_sizz:0.1};
mod_wi14_4[3] = {nam:"WIline3",p1x:-1.5,p1y:-2.5,p1z:-1.5,p2x:4,p2y:-2,p2z:-4,_siz:2,_sizz:0.1};
mod_wi14_4[4] = {nam:"WIline4",p1x:0,p1y:-2.5,p1z:0,p2x:4,p2y:-2,p2z:-4,_siz:2.5,_sizz:0.1};
mod_wi14_4[5] = {nam:"WIline5",p1x:0,p1y:-2.5,p1z:0,p2x:-4,p2y:-2,p2z:4,_siz:2.5,_sizz:0.1};
_global.mod_wi14_5 = new Array();
mod_wi14_5[0] = {nam:"WIline0",p1x:1.5,p1y:-2.5,p1z:1.5,p2x:-4,p2y:-2,p2z:4,_siz:2,_sizz:0.1};
mod_wi14_5[1] = {nam:"WIline1",p1x:-1.5,p1y:-2.5,p1z:-1.5,p2x:-4,p2y:-2,p2z:4,_siz:2,_sizz:0.1};
mod_wi14_5[2] = {nam:"WIline2",p1x:1.5,p1y:-2.5,p1z:1.5,p2x:4,p2y:-2,p2z:-4,_siz:2,_sizz:0.1};
mod_wi14_5[3] = {nam:"WIline3",p1x:-1.5,p1y:-2.5,p1z:-1.5,p2x:4,p2y:-2,p2z:-4,_siz:2,_sizz:0.1};
mod_wi14_5[4] = {nam:"WIline4",p1x:0,p1y:-2.5,p1z:0,p2x:4,p2y:-2,p2z:-4,_siz:2.5,_sizz:0.1};
mod_wi14_5[5] = {nam:"WIline5",p1x:0,p1y:-2.5,p1z:0,p2x:-4,p2y:-2,p2z:4,_siz:2.5,_sizz:0.1};
_global.mod_wi15_1 = new Array();
mod_wi15_1[0] = {nam:"WIline0",p1x:2,p1y:-3,p1z:1.5,p2x:2,p2y:-4,p2z:6,_siz:2,_sizz:0.05};
mod_wi15_1[1] = {nam:"WIline1",p1x:-2,p1y:-3,p1z:1.5,p2x:-2,p2y:-4,p2z:6,_siz:2,_sizz:0.05};
mod_wi15_1[2] = {nam:"WIline2",p1x:2,p1y:-3,p1z:1.5,p2x:2,p2y:-4,p2z:-6,_siz:2,_sizz:0.05};
mod_wi15_1[3] = {nam:"WIline3",p1x:-2,p1y:-3,p1z:1.5,p2x:-2,p2y:-4,p2z:-6,_siz:2,_sizz:0.05};
_global.mod_wi15_2 = new Array();
mod_wi15_2[0] = {nam:"WIline0",p1x:2,p1y:0,p1z:3,p2x:2,p2y:4,p2z:5,_siz:2,_sizz:0.05};
mod_wi15_2[1] = {nam:"WIline1",p1x:-2,p1y:0,p1z:3,p2x:-2,p2y:4,p2z:5,_siz:2,_sizz:0.05};
mod_wi15_2[2] = {nam:"WIline2",p1x:2,p1y:0,p1z:3,p2x:2,p2y:-9,p2z:1,_siz:2,_sizz:0.05};
mod_wi15_2[3] = {nam:"WIline3",p1x:-2,p1y:0,p1z:3,p2x:-2,p2y:-9,p2z:1,_siz:2,_sizz:0.05};
_global.mod_wi15_3 = new Array();
mod_wi15_3[0] = {nam:"WIline0",p1x:2,p1y:-3,p1z:1.5,p2x:2,p2y:-4,p2z:6,_siz:2,_sizz:0.05};
mod_wi15_3[1] = {nam:"WIline1",p1x:-2,p1y:-3,p1z:1.5,p2x:-2,p2y:-4,p2z:6,_siz:2,_sizz:0.05};
mod_wi15_3[2] = {nam:"WIline2",p1x:2,p1y:-3,p1z:1.5,p2x:2,p2y:-4,p2z:-6,_siz:2,_sizz:0.05};
mod_wi15_3[3] = {nam:"WIline3",p1x:-2,p1y:-3,p1z:1.5,p2x:-2,p2y:-4,p2z:-6,_siz:2,_sizz:0.05};
_global.mod_wi15_4 = new Array();
mod_wi15_4[0] = {nam:"WIline0",p1x:2,p1y:-3,p1z:1.5,p2x:2,p2y:-4,p2z:6,_siz:2,_sizz:0.05};
mod_wi15_4[1] = {nam:"WIline1",p1x:-2,p1y:-3,p1z:1.5,p2x:-2,p2y:-4,p2z:6,_siz:2,_sizz:0.05};
mod_wi15_4[2] = {nam:"WIline2",p1x:2,p1y:-3,p1z:1.5,p2x:2,p2y:-4,p2z:-6,_siz:2,_sizz:0.05};
mod_wi15_4[3] = {nam:"WIline3",p1x:-2,p1y:-3,p1z:1.5,p2x:-2,p2y:-4,p2z:-6,_siz:2,_sizz:0.05};
_global.mod_wi15_5 = new Array();
mod_wi15_5[0] = {nam:"WIline0",p1x:2,p1y:-3,p1z:1.5,p2x:2,p2y:-4,p2z:6,_siz:2,_sizz:0.05};
mod_wi15_5[1] = {nam:"WIline1",p1x:-2,p1y:-3,p1z:1.5,p2x:-2,p2y:-4,p2z:6,_siz:2,_sizz:0.05};
mod_wi15_5[2] = {nam:"WIline2",p1x:2,p1y:-3,p1z:1.5,p2x:2,p2y:-4,p2z:-6,_siz:2,_sizz:0.05};
mod_wi15_5[3] = {nam:"WIline3",p1x:-2,p1y:-3,p1z:1.5,p2x:-2,p2y:-4,p2z:-6,_siz:2,_sizz:0.05};
_global.mod_wi16_1 = new Array();
mod_wi16_1[0] = {nam:"WIline0",p1x:1.5,p1y:-1,p1z:2.5,p2x:1.5,p2y:-3,p2z:1,_siz:2,_sizz:1};
mod_wi16_1[1] = {nam:"WIline1",p1x:-1.5,p1y:-1,p1z:2.5,p2x:-1.5,p2y:-3,p2z:1,_siz:2,_sizz:1};
mod_wi16_1[2] = {nam:"WIline2",p1x:1.5,p1y:-2,p1z:-1,p2x:2.5,p2y:-6,p2z:-6,_siz:2.5,_sizz:0.05};
mod_wi16_1[3] = {nam:"WIline3",p1x:-1.5,p1y:-2,p1z:-1,p2x:-2.5,p2y:-6,p2z:-6,_siz:2.5,_sizz:0.05};
_global.mod_wi16_2 = new Array();
mod_wi16_2[0] = {nam:"WIline0",p1x:1.5,p1y:1,p1z:2,p2x:1.5,p2y:-1,p2z:3,_siz:2,_sizz:1};
mod_wi16_2[1] = {nam:"WIline1",p1x:-1.5,p1y:1,p1z:2,p2x:-1.5,p2y:-1,p2z:3,_siz:2,_sizz:1};
mod_wi16_2[2] = {nam:"WIline2",p1x:1.5,p1y:-3.5,p1z:1.5,p2x:2.5,p2y:-9,p2z:3,_siz:2.5,_sizz:0.05};
mod_wi16_2[3] = {nam:"WIline3",p1x:-1.5,p1y:-3.5,p1z:1.5,p2x:-2.5,p2y:-9,p2z:3,_siz:2.5,_sizz:0.05};
_global.mod_wi16_3 = new Array();
mod_wi16_3[0] = {nam:"WIline0",p1x:1.5,p1y:-1,p1z:2.5,p2x:1.5,p2y:-3,p2z:1,_siz:2,_sizz:1};
mod_wi16_3[1] = {nam:"WIline1",p1x:-1.5,p1y:-1,p1z:2.5,p2x:-1.5,p2y:-3,p2z:1,_siz:2,_sizz:1};
mod_wi16_3[2] = {nam:"WIline2",p1x:1.5,p1y:-2,p1z:-1,p2x:2.5,p2y:-6,p2z:-6,_siz:2.5,_sizz:0.05};
mod_wi16_3[3] = {nam:"WIline3",p1x:-1.5,p1y:-2,p1z:-1,p2x:-2.5,p2y:-6,p2z:-6,_siz:2.5,_sizz:0.05};
_global.mod_wi16_4 = new Array();
mod_wi16_4[0] = {nam:"WIline0",p1x:1.5,p1y:-1,p1z:2.5,p2x:1.5,p2y:-3,p2z:1,_siz:2,_sizz:1};
mod_wi16_4[1] = {nam:"WIline1",p1x:-1.5,p1y:-1,p1z:2.5,p2x:-1.5,p2y:-3,p2z:1,_siz:2,_sizz:1};
mod_wi16_4[2] = {nam:"WIline2",p1x:1.5,p1y:-2,p1z:-1,p2x:2.5,p2y:-6,p2z:-6,_siz:2.5,_sizz:0.05};
mod_wi16_4[3] = {nam:"WIline3",p1x:-1.5,p1y:-2,p1z:-1,p2x:-2.5,p2y:-6,p2z:-6,_siz:2.5,_sizz:0.05};
_global.mod_wi16_5 = new Array();
mod_wi16_5[0] = {nam:"WIline0",p1x:1.5,p1y:-1,p1z:2.5,p2x:1.5,p2y:-3,p2z:1,_siz:2,_sizz:1};
mod_wi16_5[1] = {nam:"WIline1",p1x:-1.5,p1y:-1,p1z:2.5,p2x:-1.5,p2y:-3,p2z:1,_siz:2,_sizz:1};
mod_wi16_5[2] = {nam:"WIline2",p1x:1.5,p1y:-2,p1z:-1,p2x:2.5,p2y:-6,p2z:-6,_siz:2.5,_sizz:0.05};
mod_wi16_5[3] = {nam:"WIline3",p1x:-1.5,p1y:-2,p1z:-1,p2x:-2.5,p2y:-6,p2z:-6,_siz:2.5,_sizz:0.05};
_global.mod_wi17_1 = new Array();
mod_wi17_1[0] = {nam:"WIline0",p1x:1,p1y:-2,p1z:1,p2x:8,p2y:-3,p2z:2,_siz:2.5,_sizz:0.05};
mod_wi17_1[1] = {nam:"WIline1",p1x:-1,p1y:-2,p1z:1,p2x:-8,p2y:-3,p2z:2,_siz:2.5,_sizz:0.05};
mod_wi17_1[2] = {nam:"WIline2",p1x:1,p1y:-2,p1z:-1.5,p2x:8,p2y:-3,p2z:2,_siz:2.5,_sizz:0.05};
mod_wi17_1[3] = {nam:"WIline3",p1x:-1,p1y:-2,p1z:-1.5,p2x:-8,p2y:-3,p2z:2,_siz:2.5,_sizz:0.05};
_global.mod_wi17_2 = new Array();
mod_wi17_2[0] = {nam:"WIline0",p1x:1,p1y:-1,p1z:2,p2x:8,p2y:0,p2z:3,_siz:2.5,_sizz:0.05};
mod_wi17_2[1] = {nam:"WIline1",p1x:-1,p1y:-1,p1z:2,p2x:-8,p2y:0,p2z:3,_siz:2.5,_sizz:0.05};
mod_wi17_2[2] = {nam:"WIline2",p1x:1,p1y:-3.5,p1z:1.5,p2x:8,p2y:0,p2z:3,_siz:2.5,_sizz:0.05};
mod_wi17_2[3] = {nam:"WIline3",p1x:-1,p1y:-3.5,p1z:1.5,p2x:-8,p2y:0,p2z:3,_siz:2.5,_sizz:0.05};
_global.mod_wi17_3 = new Array();
mod_wi17_3[0] = {nam:"WIline0",p1x:2,p1y:-2,p1z:1,p2x:8,p2y:-3,p2z:2,_siz:2.5,_sizz:0.05};
mod_wi17_3[1] = {nam:"WIline1",p1x:-2,p1y:-2,p1z:1,p2x:-8,p2y:-3,p2z:2,_siz:2.5,_sizz:0.05};
mod_wi17_3[2] = {nam:"WIline2",p1x:2,p1y:-2,p1z:-1.5,p2x:8,p2y:-3,p2z:2,_siz:2.5,_sizz:0.05};
mod_wi17_3[3] = {nam:"WIline3",p1x:-2,p1y:-2,p1z:-1.5,p2x:-8,p2y:-3,p2z:2,_siz:2.5,_sizz:0.05};
_global.mod_wi17_4 = new Array();
mod_wi17_4[0] = {nam:"WIline0",p1x:2,p1y:-2,p1z:1,p2x:8,p2y:-3,p2z:2,_siz:2.5,_sizz:0.05};
mod_wi17_4[1] = {nam:"WIline1",p1x:-2,p1y:-2,p1z:1,p2x:-8,p2y:-3,p2z:2,_siz:2.5,_sizz:0.05};
mod_wi17_4[2] = {nam:"WIline2",p1x:2,p1y:-2,p1z:-1.5,p2x:8,p2y:-3,p2z:2,_siz:2.5,_sizz:0.05};
mod_wi17_4[3] = {nam:"WIline3",p1x:-2,p1y:-2,p1z:-1.5,p2x:-8,p2y:-3,p2z:2,_siz:2.5,_sizz:0.05};
_global.mod_wi17_5 = new Array();
mod_wi17_5[0] = {nam:"WIline0",p1x:2,p1y:-2,p1z:1,p2x:8,p2y:-3,p2z:2,_siz:2.5,_sizz:0.05};
mod_wi17_5[1] = {nam:"WIline1",p1x:-2,p1y:-2,p1z:1,p2x:-8,p2y:-3,p2z:2,_siz:2.5,_sizz:0.05};
mod_wi17_5[2] = {nam:"WIline2",p1x:2,p1y:-2,p1z:-1.5,p2x:8,p2y:-3,p2z:2,_siz:2.5,_sizz:0.05};
mod_wi17_5[3] = {nam:"WIline3",p1x:-2,p1y:-2,p1z:-1.5,p2x:-8,p2y:-3,p2z:2,_siz:2.5,_sizz:0.05};
_global.mod_wi18_1 = new Array();
mod_wi18_1[0] = {nam:"WIline0",p1x:0,p1y:-2,p1z:7,p2x:0,p2y:-2,p2z:-2,_siz:2.5,_sizz:1};
mod_wi18_1[1] = {nam:"WIline1",p1x:0,p1y:-2,p1z:-2,p2x:0,p2y:-5,p2z:-5,_siz:2,_sizz:0.5};
mod_wi18_1[2] = {nam:"WIline2",p1x:1,p1y:-1.5,p1z:7,p2x:1,p2y:-1.5,p2z:9,_siz:0.5,_sizz:1};
mod_wi18_1[3] = {nam:"WIline3",p1x:-1,p1y:-1.5,p1z:7,p2x:-1,p2y:-1.5,p2z:9,_siz:0.5,_sizz:1};
_global.mod_wi18_2 = new Array();
mod_wi18_2[0] = {nam:"WIline0",p1x:0,p1y:5.5,p1z:4,p2x:0,p2y:-3,p2z:2,_siz:2.5,_sizz:1};
mod_wi18_2[1] = {nam:"WIline1",p1x:0,p1y:-3,p1z:2,p2x:0,p2y:-6.5,p2z:4,_siz:2,_sizz:0.5};
mod_wi18_2[2] = {nam:"WIline2",p1x:1,p1y:5.5,p1z:3.5,p2x:1,p2y:7,p2z:4,_siz:0.5,_sizz:1};
mod_wi18_2[3] = {nam:"WIline3",p1x:-1,p1y:5.5,p1z:3.5,p2x:-1,p2y:7,p2z:4,_siz:0.5,_sizz:1};
_global.mod_wi18_3 = new Array();
mod_wi18_3[0] = {nam:"WIline0",p1x:0,p1y:-2,p1z:7,p2x:0,p2y:-2,p2z:-2,_siz:2.5,_sizz:1};
mod_wi18_3[1] = {nam:"WIline1",p1x:0,p1y:-2,p1z:-2,p2x:0,p2y:-5,p2z:-5,_siz:2,_sizz:0.5};
mod_wi18_3[2] = {nam:"WIline2",p1x:1,p1y:-1.5,p1z:7,p2x:1,p2y:-1.5,p2z:9,_siz:0.5,_sizz:1};
mod_wi18_3[3] = {nam:"WIline3",p1x:-1,p1y:-1.5,p1z:7,p2x:-1,p2y:-1.5,p2z:9,_siz:0.5,_sizz:1};
_global.mod_wi18_4 = new Array();
mod_wi18_4[0] = {nam:"WIline0",p1x:0,p1y:-2,p1z:7,p2x:0,p2y:-2,p2z:-2,_siz:2.5,_sizz:1};
mod_wi18_4[1] = {nam:"WIline1",p1x:0,p1y:-2,p1z:-2,p2x:0,p2y:-5,p2z:-5,_siz:2,_sizz:0.5};
mod_wi18_4[2] = {nam:"WIline2",p1x:1,p1y:-1.5,p1z:7,p2x:1,p2y:-1.5,p2z:9,_siz:0.5,_sizz:1};
mod_wi18_4[3] = {nam:"WIline3",p1x:-1,p1y:-1.5,p1z:7,p2x:-1,p2y:-1.5,p2z:9,_siz:0.5,_sizz:1};
_global.mod_wi18_5 = new Array();
mod_wi18_5[0] = {nam:"WIline0",p1x:0,p1y:-2,p1z:7,p2x:0,p2y:-2,p2z:-2,_siz:2.5,_sizz:1};
mod_wi18_5[1] = {nam:"WIline1",p1x:0,p1y:-2,p1z:-2,p2x:0,p2y:-5,p2z:-5,_siz:2,_sizz:0.5};
mod_wi18_5[2] = {nam:"WIline2",p1x:1,p1y:-1.5,p1z:7,p2x:1,p2y:-1.5,p2z:9,_siz:0.5,_sizz:1};
mod_wi18_5[3] = {nam:"WIline3",p1x:-1,p1y:-1.5,p1z:7,p2x:-1,p2y:-1.5,p2z:9,_siz:0.5,_sizz:1};
_global.mod_wi19_1 = new Array();
mod_wi19_1[0] = {nam:"WIline0",p1x:1.5,p1y:-1.5,p1z:2,p2x:2.5,p2y:-3.5,p2z:3,_siz:2,_sizz:1.2};
mod_wi19_1[1] = {nam:"WIline1",p1x:-1.5,p1y:-1.5,p1z:2,p2x:-2.5,p2y:-3.5,p2z:3,_siz:2,_sizz:1.2};
mod_wi19_1[2] = {nam:"WIline2",p1x:1,p1y:-1.5,p1z:1,p2x:2,p2y:-6,p2z:-4,_siz:1,_sizz:1.2};
mod_wi19_1[3] = {nam:"WIline3",p1x:-1,p1y:-1.5,p1z:1,p2x:-2,p2y:-6,p2z:-4,_siz:1,_sizz:1.2};
_global.mod_wi19_2 = new Array();
mod_wi19_2[0] = {nam:"WIline1",p1x:1.5,p1y:0.5,p1z:1.9,p2x:2.5,p2y:1,p2z:4.5,_siz:2,_sizz:1.2};
mod_wi19_2[1] = {nam:"WIline2",p1x:-1.5,p1y:0.5,p1z:1.9,p2x:-2.5,p2y:1,p2z:4.5,_siz:2,_sizz:1.2};
mod_wi19_2[3] = {nam:"WIline3",p1x:1,p1y:-1.5,p1z:2,p2x:2,p2y:-8,p2z:4,_siz:1,_sizz:1.2};
mod_wi19_2[4] = {nam:"WIline4",p1x:-1,p1y:-1.5,p1z:2,p2x:-2,p2y:-8,p2z:4,_siz:1,_sizz:1.2};
_global.mod_wi19_3 = new Array();
mod_wi19_3[0] = {nam:"WIline0",p1x:1.5,p1y:-1.5,p1z:2,p2x:2.5,p2y:-3.5,p2z:3,_siz:2,_sizz:1.2};
mod_wi19_3[1] = {nam:"WIline1",p1x:-1.5,p1y:-1.5,p1z:2,p2x:-2.5,p2y:-3.5,p2z:3,_siz:2,_sizz:1.2};
mod_wi19_3[2] = {nam:"WIline2",p1x:1,p1y:-1.5,p1z:1,p2x:2,p2y:-6,p2z:-4,_siz:1,_sizz:1.2};
mod_wi19_3[3] = {nam:"WIline3",p1x:-1,p1y:-1.5,p1z:1,p2x:-2,p2y:-6,p2z:-4,_siz:1,_sizz:1.2};
_global.mod_wi19_4 = new Array();
mod_wi19_4[0] = {nam:"WIline0",p1x:1.5,p1y:-1.5,p1z:2,p2x:2.5,p2y:-3.5,p2z:3,_siz:2,_sizz:1.2};
mod_wi19_4[1] = {nam:"WIline1",p1x:-1.5,p1y:-1.5,p1z:2,p2x:-2.5,p2y:-3.5,p2z:3,_siz:2,_sizz:1.2};
mod_wi19_4[2] = {nam:"WIline2",p1x:1,p1y:-1.5,p1z:1,p2x:2,p2y:-6,p2z:-4,_siz:1,_sizz:1.2};
mod_wi19_4[3] = {nam:"WIline3",p1x:-1,p1y:-1.5,p1z:1,p2x:-2,p2y:-6,p2z:-4,_siz:1,_sizz:1.2};
_global.mod_wi19_5 = new Array();
mod_wi19_5[0] = {nam:"WIline0",p1x:1.5,p1y:-1.5,p1z:2,p2x:2.5,p2y:-3.5,p2z:3,_siz:2,_sizz:1.2};
mod_wi19_5[1] = {nam:"WIline1",p1x:-1.5,p1y:-1.5,p1z:2,p2x:-2.5,p2y:-3.5,p2z:3,_siz:2,_sizz:1.2};
mod_wi19_5[2] = {nam:"WIline2",p1x:1,p1y:-1.5,p1z:1,p2x:2,p2y:-6,p2z:-4,_siz:1,_sizz:1.2};
mod_wi19_5[3] = {nam:"WIline3",p1x:-1,p1y:-1.5,p1z:1,p2x:-2,p2y:-6,p2z:-4,_siz:1,_sizz:1.2};
_global.mod_wi20_1 = new Array();
mod_wi20_1[0] = {nam:"WIline0",p1x:3,p1y:-2,p1z:1.5,p2x:3,p2y:-4,p2z:-5,_siz:2.5,_sizz:0.05};
mod_wi20_1[1] = {nam:"WIline1",p1x:-3,p1y:-2,p1z:1.5,p2x:-3,p2y:-4,p2z:-5,_siz:2.5,_sizz:0.05};
_global.mod_wi20_2 = new Array();
mod_wi20_2[0] = {nam:"WIline0",p1x:3,p1y:-2,p1z:2.5,p2x:3,p2y:-8.5,p2z:4,_siz:2.5,_sizz:0.05};
mod_wi20_2[1] = {nam:"WIline1",p1x:-3,p1y:-2,p1z:2.5,p2x:-3,p2y:-8.5,p2z:4,_siz:2.5,_sizz:0.05};
_global.mod_wi20_3 = new Array();
mod_wi20_3[0] = {nam:"WIline0",p1x:3,p1y:-2,p1z:1.5,p2x:3,p2y:-4,p2z:-5,_siz:2.5,_sizz:0.05};
mod_wi20_3[1] = {nam:"WIline1",p1x:-3,p1y:-2,p1z:1.5,p2x:-3,p2y:-4,p2z:-5,_siz:2.5,_sizz:0.05};
_global.mod_wi20_4 = new Array();
mod_wi20_4[0] = {nam:"WIline0",p1x:3,p1y:-2,p1z:1.5,p2x:3,p2y:-4,p2z:-5,_siz:2.5,_sizz:0.05};
mod_wi20_4[1] = {nam:"WIline1",p1x:-3,p1y:-2,p1z:1.5,p2x:-3,p2y:-4,p2z:-5,_siz:2.5,_sizz:0.05};
_global.mod_wi20_5 = new Array();
mod_wi20_5[0] = {nam:"WIline0",p1x:3,p1y:-2,p1z:1.5,p2x:3,p2y:-4,p2z:-5,_siz:2.5,_sizz:0.05};
mod_wi20_5[1] = {nam:"WIline1",p1x:-3,p1y:-2,p1z:1.5,p2x:-3,p2y:-4,p2z:-5,_siz:2.5,_sizz:0.05};
_global.mod_wi21_1 = new Array();
mod_wi21_1[0] = {nam:"WIline0",p1x:2.5,p1y:-3,p1z:1.5,p2x:2,p2y:-2,p2z:6,_siz:2,_sizz:0.05};
mod_wi21_1[1] = {nam:"WIline1",p1x:-2.5,p1y:-3,p1z:1.5,p2x:-2,p2y:-2,p2z:6,_siz:2,_sizz:0.05};
mod_wi21_1[2] = {nam:"WIline2",p1x:2.5,p1y:-3,p1z:1.5,p2x:3.5,p2y:-5,p2z:-6,_siz:2,_sizz:0.05};
mod_wi21_1[3] = {nam:"WIline3",p1x:-2.5,p1y:-3,p1z:1.5,p2x:-3.5,p2y:-5,p2z:-6,_siz:2,_sizz:0.05};
mod_wi21_1[4] = {nam:"WIline4",p1x:2.5,p1y:-3,p1z:1.5,p2x:3,p2y:-5,p2z:2,_siz:1.5,_sizz:0.05};
mod_wi21_1[5] = {nam:"WIline5",p1x:-2.5,p1y:-3,p1z:1.5,p2x:-3,p2y:-5,p2z:2,_siz:1.5,_sizz:0.05};
mod_wi21_1[6] = {nam:"WIline6",p1x:1,p1y:-2,p1z:1,p2x:-1,p2y:-2,p2z:1,_siz:4,_sizz:1};
_global.mod_wi21_2 = new Array();
mod_wi21_2[0] = {nam:"WIline0",p1x:2.5,p1y:-1,p1z:3,p2x:2,p2y:3,p2z:5,_siz:2,_sizz:0.05};
mod_wi21_2[1] = {nam:"WIline1",p1x:-2.5,p1y:-1,p1z:3,p2x:-2,p2y:3,p2z:5,_siz:2,_sizz:0.05};
mod_wi21_2[2] = {nam:"WIline2",p1x:2.5,p1y:-1,p1z:3,p2x:3,p2y:-9,p2z:2,_siz:2,_sizz:0.05};
mod_wi21_2[3] = {nam:"WIline3",p1x:-2.5,p1y:-1,p1z:3,p2x:-3,p2y:-9,p2z:2,_siz:2,_sizz:0.05};
mod_wi21_2[4] = {nam:"WIline4",p1x:2.5,p1y:-1,p1z:3,p2x:3,p2y:-2,p2z:5,_siz:1.5,_sizz:0.05};
mod_wi21_2[5] = {nam:"WIline5",p1x:-2.5,p1y:-1,p1z:3,p2x:-3,p2y:-2,p2z:5,_siz:1.5,_sizz:0.05};
mod_wi21_2[6] = {nam:"WIline6",p1x:1,p1y:-1,p1z:2,p2x:-1,p2y:-1,p2z:2,_siz:4,_sizz:1};
_global.mod_wi21_3 = new Array();
mod_wi21_3[0] = {nam:"WIline0",p1x:2.5,p1y:-3,p1z:1.5,p2x:2,p2y:-2,p2z:6,_siz:2,_sizz:0.05};
mod_wi21_3[1] = {nam:"WIline1",p1x:-2.5,p1y:-3,p1z:1.5,p2x:-2,p2y:-2,p2z:6,_siz:2,_sizz:0.05};
mod_wi21_3[2] = {nam:"WIline2",p1x:2.5,p1y:-3,p1z:1.5,p2x:3.5,p2y:-5,p2z:-6,_siz:2,_sizz:0.05};
mod_wi21_3[3] = {nam:"WIline3",p1x:-2.5,p1y:-3,p1z:1.5,p2x:-3.5,p2y:-5,p2z:-6,_siz:2,_sizz:0.05};
mod_wi21_3[4] = {nam:"WIline4",p1x:2.5,p1y:-3,p1z:1.5,p2x:3,p2y:-5,p2z:2,_siz:1.5,_sizz:0.05};
mod_wi21_3[5] = {nam:"WIline5",p1x:-2.5,p1y:-3,p1z:1.5,p2x:-3,p2y:-5,p2z:2,_siz:1.5,_sizz:0.05};
mod_wi21_3[6] = {nam:"WIline6",p1x:1,p1y:-2,p1z:1,p2x:-1,p2y:-2,p2z:1,_siz:4,_sizz:1};
_global.mod_wi21_4 = new Array();
mod_wi21_4[0] = {nam:"WIline0",p1x:2.5,p1y:-3,p1z:1.5,p2x:2,p2y:-2,p2z:6,_siz:2,_sizz:0.05};
mod_wi21_4[1] = {nam:"WIline1",p1x:-2.5,p1y:-3,p1z:1.5,p2x:-2,p2y:-2,p2z:6,_siz:2,_sizz:0.05};
mod_wi21_4[2] = {nam:"WIline2",p1x:2.5,p1y:-3,p1z:1.5,p2x:3.5,p2y:-5,p2z:-6,_siz:2,_sizz:0.05};
mod_wi21_4[3] = {nam:"WIline3",p1x:-2.5,p1y:-3,p1z:1.5,p2x:-3.5,p2y:-5,p2z:-6,_siz:2,_sizz:0.05};
mod_wi21_4[4] = {nam:"WIline4",p1x:2.5,p1y:-3,p1z:1.5,p2x:3,p2y:-5,p2z:2,_siz:1.5,_sizz:0.05};
mod_wi21_4[5] = {nam:"WIline5",p1x:-2.5,p1y:-3,p1z:1.5,p2x:-3,p2y:-5,p2z:2,_siz:1.5,_sizz:0.05};
mod_wi21_4[6] = {nam:"WIline6",p1x:1,p1y:-2,p1z:1,p2x:-1,p2y:-2,p2z:1,_siz:4,_sizz:1};
_global.mod_wi21_5 = new Array();
mod_wi21_5[0] = {nam:"WIline0",p1x:2.5,p1y:-3,p1z:1.5,p2x:2,p2y:-2,p2z:6,_siz:2,_sizz:0.05};
mod_wi21_5[1] = {nam:"WIline1",p1x:-2.5,p1y:-3,p1z:1.5,p2x:-2,p2y:-2,p2z:6,_siz:2,_sizz:0.05};
mod_wi21_5[2] = {nam:"WIline2",p1x:2.5,p1y:-3,p1z:1.5,p2x:3.5,p2y:-5,p2z:-6,_siz:2,_sizz:0.05};
mod_wi21_5[3] = {nam:"WIline3",p1x:-2.5,p1y:-3,p1z:1.5,p2x:-3.5,p2y:-5,p2z:-6,_siz:2,_sizz:0.05};
mod_wi21_5[4] = {nam:"WIline4",p1x:2.5,p1y:-3,p1z:1.5,p2x:3,p2y:-5,p2z:2,_siz:1.5,_sizz:0.05};
mod_wi21_5[5] = {nam:"WIline5",p1x:-2.5,p1y:-3,p1z:1.5,p2x:-3,p2y:-5,p2z:2,_siz:1.5,_sizz:0.05};
mod_wi21_5[6] = {nam:"WIline6",p1x:1,p1y:-2,p1z:1,p2x:-1,p2y:-2,p2z:1,_siz:4,_sizz:1};
_global.mod_wi22_1 = new Array();
mod_wi22_1[0] = {nam:"WIline0",p1x:0,p1y:-3,p1z:1.5,p2x:0,p2y:-7,p2z:4,_siz:1.5,_sizz:0.5};
mod_wi22_1[1] = {nam:"WIline1",p1x:-1.5,p1y:-2,p1z:1.5,p2x:-3.5,p2y:-5,p2z:-6,_siz:1.5,_sizz:0.5};
mod_wi22_1[2] = {nam:"WIline2",p1x:1.5,p1y:-2,p1z:1.5,p2x:3.5,p2y:-5,p2z:-6,_siz:1.5,_sizz:0.5};
mod_wi22_1[3] = {nam:"WIline3",p1x:-2.5,p1y:1,p1z:2.5,p2x:-2.5,p2y:-2,p2z:2.5,_siz:1.5,_sizz:1};
mod_wi22_1[4] = {nam:"WIline4",p1x:2.5,p1y:1,p1z:2.5,p2x:2.5,p2y:-2,p2z:2.5,_siz:1.5,_sizz:1};
mod_wi22_1[5] = {nam:"WIline5",p1x:-3.5,p1y:1,p1z:2.5,p2x:-3.5,p2y:-2,p2z:2.5,_siz:1.5,_sizz:1};
mod_wi22_1[6] = {nam:"WIline6",p1x:3.5,p1y:1,p1z:2.5,p2x:3.5,p2y:-2,p2z:2.5,_siz:1.5,_sizz:1};
mod_wi22_1[7] = {nam:"WIline7",p1x:-1.5,p1y:1,p1z:2.5,p2x:-1.5,p2y:-2,p2z:2.5,_siz:1.5,_sizz:1};
mod_wi22_1[8] = {nam:"WIline8",p1x:1.5,p1y:1,p1z:2.5,p2x:1.5,p2y:-2,p2z:2.5,_siz:1.5,_sizz:1};
_global.mod_wi22_2 = new Array();
mod_wi22_2[0] = {nam:"WIline0",p1x:0,p1y:0,p1z:3,p2x:0,p2y:2,p2z:6,_siz:1.5,_sizz:0.5};
mod_wi22_2[1] = {nam:"WIline1",p1x:1.5,p1y:-1,p1z:2,p2x:3.5,p2y:-8,p2z:4,_siz:1.5,_sizz:0.5};
mod_wi22_2[2] = {nam:"WIline2",p1x:-1.5,p1y:-1,p1z:2,p2x:-3.5,p2y:-8,p2z:4,_siz:1.5,_sizz:0.5};
mod_wi22_2[3] = {nam:"WIline3",p1x:-2.5,p1y:1,p1z:2.5,p2x:-2.5,p2y:-2,p2z:2.5,_siz:1.5,_sizz:1};
mod_wi22_2[4] = {nam:"WIline4",p1x:2.5,p1y:1,p1z:2.5,p2x:2.5,p2y:-2,p2z:2.5,_siz:1.5,_sizz:1};
mod_wi22_2[5] = {nam:"WIline5",p1x:-3.5,p1y:1,p1z:2.5,p2x:-3.5,p2y:-2,p2z:2.5,_siz:1.5,_sizz:1};
mod_wi22_2[6] = {nam:"WIline6",p1x:3.5,p1y:1,p1z:2.5,p2x:3.5,p2y:-2,p2z:2.5,_siz:1.5,_sizz:1};
mod_wi22_2[7] = {nam:"WIline7",p1x:-1.5,p1y:1,p1z:2.5,p2x:-1.5,p2y:-2,p2z:2.5,_siz:1.5,_sizz:1};
mod_wi22_2[8] = {nam:"WIline8",p1x:1.5,p1y:1,p1z:2.5,p2x:1.5,p2y:-2,p2z:2.5,_siz:1.5,_sizz:1};
_global.mod_wi22_3 = new Array();
mod_wi22_3[0] = {nam:"WIline0",p1x:0,p1y:-3,p1z:1.5,p2x:0,p2y:-7,p2z:4,_siz:1.5,_sizz:0.5};
mod_wi22_3[1] = {nam:"WIline1",p1x:-1.5,p1y:-2,p1z:1.5,p2x:-3.5,p2y:-5,p2z:-6,_siz:1.5,_sizz:0.5};
mod_wi22_3[2] = {nam:"WIline2",p1x:1.5,p1y:-2,p1z:1.5,p2x:3.5,p2y:-5,p2z:-6,_siz:1.5,_sizz:0.5};
mod_wi22_3[3] = {nam:"WIline3",p1x:-2.5,p1y:1,p1z:2.5,p2x:-2.5,p2y:-2,p2z:2.5,_siz:1.5,_sizz:1};
mod_wi22_3[4] = {nam:"WIline4",p1x:2.5,p1y:1,p1z:2.5,p2x:2.5,p2y:-2,p2z:2.5,_siz:1.5,_sizz:1};
mod_wi22_3[5] = {nam:"WIline5",p1x:-3.5,p1y:1,p1z:2.5,p2x:-3.5,p2y:-2,p2z:2.5,_siz:1.5,_sizz:1};
mod_wi22_3[6] = {nam:"WIline6",p1x:3.5,p1y:1,p1z:2.5,p2x:3.5,p2y:-2,p2z:2.5,_siz:1.5,_sizz:1};
mod_wi22_3[7] = {nam:"WIline7",p1x:-1.5,p1y:1,p1z:2.5,p2x:-1.5,p2y:-2,p2z:2.5,_siz:1.5,_sizz:1};
mod_wi22_3[8] = {nam:"WIline8",p1x:1.5,p1y:1,p1z:2.5,p2x:1.5,p2y:-2,p2z:2.5,_siz:1.5,_sizz:1};
_global.mod_wi22_4 = new Array();
mod_wi22_4[0] = {nam:"WIline0",p1x:0,p1y:-3,p1z:1.5,p2x:0,p2y:-7,p2z:4,_siz:1.5,_sizz:0.5};
mod_wi22_4[1] = {nam:"WIline1",p1x:-1.5,p1y:-2,p1z:1.5,p2x:-3.5,p2y:-5,p2z:-6,_siz:1.5,_sizz:0.5};
mod_wi22_4[2] = {nam:"WIline2",p1x:1.5,p1y:-2,p1z:1.5,p2x:3.5,p2y:-5,p2z:-6,_siz:1.5,_sizz:0.5};
mod_wi22_4[3] = {nam:"WIline3",p1x:-2.5,p1y:1,p1z:2.5,p2x:-2.5,p2y:-2,p2z:2.5,_siz:1.5,_sizz:1};
mod_wi22_4[4] = {nam:"WIline4",p1x:2.5,p1y:1,p1z:2.5,p2x:2.5,p2y:-2,p2z:2.5,_siz:1.5,_sizz:1};
mod_wi22_4[5] = {nam:"WIline5",p1x:-3.5,p1y:1,p1z:2.5,p2x:-3.5,p2y:-2,p2z:2.5,_siz:1.5,_sizz:1};
mod_wi22_4[6] = {nam:"WIline6",p1x:3.5,p1y:1,p1z:2.5,p2x:3.5,p2y:-2,p2z:2.5,_siz:1.5,_sizz:1};
mod_wi22_4[7] = {nam:"WIline7",p1x:-1.5,p1y:1,p1z:2.5,p2x:-1.5,p2y:-2,p2z:2.5,_siz:1.5,_sizz:1};
mod_wi22_4[8] = {nam:"WIline8",p1x:1.5,p1y:1,p1z:2.5,p2x:1.5,p2y:-2,p2z:2.5,_siz:1.5,_sizz:1};
_global.mod_wi22_5 = new Array();
mod_wi22_5[0] = {nam:"WIline0",p1x:0,p1y:-3,p1z:1.5,p2x:0,p2y:-7,p2z:4,_siz:1.5,_sizz:0.5};
mod_wi22_5[1] = {nam:"WIline1",p1x:-1.5,p1y:-2,p1z:1.5,p2x:-3.5,p2y:-5,p2z:-6,_siz:1.5,_sizz:0.5};
mod_wi22_5[2] = {nam:"WIline2",p1x:1.5,p1y:-2,p1z:1.5,p2x:3.5,p2y:-5,p2z:-6,_siz:1.5,_sizz:0.5};
mod_wi22_5[3] = {nam:"WIline3",p1x:-2.5,p1y:1,p1z:2.5,p2x:-2.5,p2y:-2,p2z:2.5,_siz:1.5,_sizz:1};
mod_wi22_5[4] = {nam:"WIline4",p1x:2.5,p1y:1,p1z:2.5,p2x:2.5,p2y:-2,p2z:2.5,_siz:1.5,_sizz:1};
mod_wi22_5[5] = {nam:"WIline5",p1x:-3.5,p1y:1,p1z:2.5,p2x:-3.5,p2y:-2,p2z:2.5,_siz:1.5,_sizz:1};
mod_wi22_5[6] = {nam:"WIline6",p1x:3.5,p1y:1,p1z:2.5,p2x:3.5,p2y:-2,p2z:2.5,_siz:1.5,_sizz:1};
mod_wi22_5[7] = {nam:"WIline7",p1x:-1.5,p1y:1,p1z:2.5,p2x:-1.5,p2y:-2,p2z:2.5,_siz:1.5,_sizz:1};
mod_wi22_5[8] = {nam:"WIline8",p1x:1.5,p1y:1,p1z:2.5,p2x:1.5,p2y:-2,p2z:2.5,_siz:1.5,_sizz:1};
_global.mod_wi23_1 = new Array();
mod_wi23_1[0] = {nam:"WIline0",p1x:0,p1y:-2.5,p1z:1.5,p2x:0,p2y:-4.5,p2z:-4,_siz:2.5,_sizz:0.2};
mod_wi23_1[1] = {nam:"WIline1",p1x:1.5,p1y:-2,p1z:2,p2x:1.5,p2y:-2,p2z:0,_siz:2,_sizz:1};
mod_wi23_1[2] = {nam:"WIline2",p1x:-1.5,p1y:-2,p1z:2,p2x:-1.5,p2y:-2,p2z:0,_siz:2,_sizz:1};
_global.mod_wi23_2 = new Array();
mod_wi23_2[0] = {nam:"WIline0",p1x:0,p1y:-1,p1z:3.5,p2x:0,p2y:-5,p2z:9,_siz:2.5,_sizz:0.2};
mod_wi23_2[1] = {nam:"WIline1",p1x:1.5,p1y:-0.5,p1z:3,p2x:1.5,p2y:-3,p2z:2,_siz:2,_sizz:1};
mod_wi23_2[2] = {nam:"WIline2",p1x:-1.5,p1y:-0.5,p1z:3,p2x:-1.5,p2y:-3,p2z:2,_siz:2,_sizz:1};
_global.mod_wi23_3 = new Array();
mod_wi23_3[0] = {nam:"WIline0",p1x:0,p1y:-2.5,p1z:1.5,p2x:0,p2y:-4.5,p2z:-4,_siz:2.5,_sizz:0.2};
mod_wi23_3[1] = {nam:"WIline1",p1x:1.5,p1y:-2,p1z:2,p2x:1.5,p2y:-2,p2z:0,_siz:2,_sizz:1};
mod_wi23_3[2] = {nam:"WIline2",p1x:-1.5,p1y:-2,p1z:2,p2x:-1.5,p2y:-2,p2z:0,_siz:2,_sizz:1};
_global.mod_wi23_4 = new Array();
mod_wi23_4[0] = {nam:"WIline0",p1x:0,p1y:-2.5,p1z:1.5,p2x:0,p2y:-4.5,p2z:-4,_siz:2.5,_sizz:0.2};
mod_wi23_4[1] = {nam:"WIline1",p1x:1.5,p1y:-2,p1z:2,p2x:1.5,p2y:-2,p2z:0,_siz:2,_sizz:1};
mod_wi23_4[2] = {nam:"WIline2",p1x:-1.5,p1y:-2,p1z:2,p2x:-1.5,p2y:-2,p2z:0,_siz:2,_sizz:1};
_global.mod_wi23_5 = new Array();
mod_wi23_5[0] = {nam:"WIline0",p1x:0,p1y:-2.5,p1z:1.5,p2x:0,p2y:-4.5,p2z:-4,_siz:2.5,_sizz:0.2};
mod_wi23_5[1] = {nam:"WIline1",p1x:1.5,p1y:-2,p1z:2,p2x:1.5,p2y:-2,p2z:0,_siz:2,_sizz:1};
mod_wi23_5[2] = {nam:"WIline2",p1x:-1.5,p1y:-2,p1z:2,p2x:-1.5,p2y:-2,p2z:0,_siz:2,_sizz:1};
_global.mod_wi24_1 = new Array();
mod_wi24_1[0] = {nam:"WIline0",p1x:-2.5,p1y:-2.5,p1z:-3.5,p2x:2,p2y:-2,p2z:3.5,_siz:0.5,_sizz:1};
_global.mod_wi24_2 = new Array();
mod_wi24_2[0] = {nam:"WIline0",p1x:-2.5,p1y:-6,p1z:2.5,p2x:2,p2y:2.5,p2z:3,_siz:0.5,_sizz:1};
_global.mod_wi24_3 = new Array();
mod_wi24_3[0] = {nam:"WIline17",p1x:-2.5,p1y:-2.5,p1z:-3.5,p2x:2,p2y:-2,p2z:3.5,_siz:0.5,_sizz:1};
_global.mod_wi24_4 = new Array();
mod_wi24_4[0] = {nam:"WIline0",p1x:-2.5,p1y:-2.5,p1z:-3.5,p2x:2,p2y:-2,p2z:3.5,_siz:0.5,_sizz:1};
_global.mod_wi24_5 = new Array();
mod_wi24_5[0] = {nam:"WIline0",p1x:-2.5,p1y:-2.5,p1z:-3.5,p2x:2,p2y:-2,p2z:3.5,_siz:0.5,_sizz:1};
_global.mod_wi25_1 = new Array();
mod_wi25_1[0] = {nam:"WIline0",p1x:1,p1y:-1.5,p1z:0,p2x:1,p2y:-4,p2z:4,_siz:0.5,_sizz:0.5};
mod_wi25_1[1] = {nam:"WIline1",p1x:-1,p1y:-1.5,p1z:0,p2x:-1,p2y:-4,p2z:4,_siz:0.5,_sizz:0.5};
mod_wi25_1[2] = {nam:"WIline2",p1x:2,p1y:-2.5,p1z:-1,p2x:2,p2y:-2.5,p2z:6,_siz:3,_sizz:0.1};
mod_wi25_1[3] = {nam:"WIline3",p1x:-2,p1y:-2.5,p1z:-1,p2x:-2,p2y:-2.5,p2z:6,_siz:3,_sizz:0.1};
_global.mod_wi25_2 = new Array();
mod_wi25_2[0] = {nam:"WIline1",p1x:1,p1y:-2,p1z:1,p2x:1,p2y:1,p2z:4.5,_siz:0.5,_sizz:0.5};
mod_wi25_2[1] = {nam:"WIline2",p1x:-1,p1y:-2,p1z:1,p2x:-1,p2y:1,p2z:4.5,_siz:0.5,_sizz:0.5};
mod_wi25_2[3] = {nam:"WIline3",p1x:2,p1y:-3,p1z:2,p2x:2,p2y:3,p2z:5,_siz:3,_sizz:0.1};
mod_wi25_2[4] = {nam:"WIline4",p1x:-2,p1y:-3,p1z:2,p2x:-2,p2y:3,p2z:5,_siz:3,_sizz:0.1};
_global.mod_wi25_3 = new Array();
mod_wi25_3[0] = {nam:"WIline0",p1x:1,p1y:-1.5,p1z:0,p2x:1,p2y:-4,p2z:4,_siz:0.5,_sizz:0.5};
mod_wi25_3[1] = {nam:"WIline1",p1x:-1,p1y:-1.5,p1z:0,p2x:-1,p2y:-4,p2z:4,_siz:0.5,_sizz:0.5};
mod_wi25_3[2] = {nam:"WIline2",p1x:2,p1y:-2.5,p1z:-1,p2x:2,p2y:-2.5,p2z:6,_siz:3,_sizz:0.1};
mod_wi25_3[3] = {nam:"WIline3",p1x:-2,p1y:-2.5,p1z:-1,p2x:-2,p2y:-2.5,p2z:6,_siz:3,_sizz:0.1};
_global.mod_wi25_4 = new Array();
mod_wi25_4[0] = {nam:"WIline0",p1x:1,p1y:-1.5,p1z:0,p2x:1,p2y:-4,p2z:4,_siz:0.5,_sizz:0.5};
mod_wi25_4[1] = {nam:"WIline1",p1x:-1,p1y:-1.5,p1z:0,p2x:-1,p2y:-4,p2z:4,_siz:0.5,_sizz:0.5};
mod_wi25_4[2] = {nam:"WIline2",p1x:2,p1y:-2.5,p1z:-1,p2x:2,p2y:-2.5,p2z:6,_siz:3,_sizz:0.1};
mod_wi25_4[3] = {nam:"WIline3",p1x:-2,p1y:-2.5,p1z:-1,p2x:-2,p2y:-2.5,p2z:6,_siz:3,_sizz:0.1};
_global.mod_wi25_5 = new Array();
mod_wi25_5[0] = {nam:"WIline0",p1x:1,p1y:-1.5,p1z:0,p2x:1,p2y:-4,p2z:4,_siz:0.5,_sizz:0.5};
mod_wi25_5[1] = {nam:"WIline1",p1x:-1,p1y:-1.5,p1z:0,p2x:-1,p2y:-4,p2z:4,_siz:0.5,_sizz:0.5};
mod_wi25_5[2] = {nam:"WIline2",p1x:2,p1y:-2.5,p1z:-1,p2x:2,p2y:-2.5,p2z:6,_siz:3,_sizz:0.1};
mod_wi25_5[3] = {nam:"WIline3",p1x:-2,p1y:-2.5,p1z:-1,p2x:-2,p2y:-2.5,p2z:6,_siz:3,_sizz:0.1};
_global.mod_wi26_1 = new Array();
mod_wi26_1[0] = {nam:"WIline0",p1x:0,p1y:-3,p1z:3.5,p2x:0,p2y:0,p2z:4.5,_siz:5,_sizz:1};
mod_wi26_1[1] = {nam:"WIline1",p1x:-1.5,p1y:-2,p1z:2.5,p2x:-3.5,p2y:-5,p2z:-9,_siz:2.5,_sizz:0.25};
mod_wi26_1[2] = {nam:"WIline2",p1x:1.5,p1y:-2,p1z:2.5,p2x:3.5,p2y:-5,p2z:-9,_siz:2.5,_sizz:0.25};
mod_wi26_1[3] = {nam:"WIline3",p1x:-1.5,p1y:-1,p1z:4.5,p2x:-4.5,p2y:-1,p2z:4.5,_siz:4.5,_sizz:1};
mod_wi26_1[4] = {nam:"WIline4",p1x:1.5,p1y:-1,p1z:4.5,p2x:4.5,p2y:-1,p2z:4.5,_siz:4.5,_sizz:1};
mod_wi26_1[5] = {nam:"WIline5",flag:"fy1",p1x:-4.5,p1y:-1,p1z:3,p2x:-4.5,p2y:-1,p2z:-2.5,_siz:4.5,_sizz:0.5};
mod_wi26_1[6] = {nam:"WIline6",flag:"fy2",p1x:4.5,p1y:-1,p1z:3,p2x:4.5,p2y:-1,p2z:-2.5,_siz:4.5,_sizz:0.5};
_global.mod_wi26_2 = new Array();
mod_wi26_2[0] = {nam:"WIline0",p1x:0,p1y:2,p1z:3,p2x:0,p2y:4,p2z:2,_siz:5,_sizz:1};
mod_wi26_2[1] = {nam:"WIline1",p1x:1.5,p1y:-1,p1z:3,p2x:3.5,p2y:-10,p2z:5,_siz:2.5,_sizz:0.25};
mod_wi26_2[2] = {nam:"WIline2",p1x:-1.5,p1y:-1,p1z:3,p2x:-3.5,p2y:-10,p2z:5,_siz:2.5,_sizz:0.25};
mod_wi26_2[3] = {nam:"WIline3",p1x:-1.5,p1y:4,p1z:2.5,p2x:-4.5,p2y:4,p2z:2.5,_siz:4.5,_sizz:1};
mod_wi26_2[4] = {nam:"WIline4",p1x:1.5,p1y:4,p1z:2.5,p2x:4.5,p2y:4,p2z:2.5,_siz:4.5,_sizz:1};
mod_wi26_2[5] = {nam:"WIline5",flag:"fy1",p1x:-4.5,p1y:3,p1z:1,p2x:-4.5,p2y:-2,p2z:-1.5,_siz:4.5,_sizz:0.5};
mod_wi26_2[6] = {nam:"WIline6",flag:"fy2",p1x:4.5,p1y:3,p1z:1,p2x:4.5,p2y:-2,p2z:-1.5,_siz:4.5,_sizz:0.5};
_global.mod_wi26_3 = new Array();
mod_wi26_3[0] = {nam:"WIline0",p1x:0,p1y:-3,p1z:3.5,p2x:0,p2y:0,p2z:4.5,_siz:5,_sizz:1};
mod_wi26_3[1] = {nam:"WIline1",p1x:-1.5,p1y:-2,p1z:2.5,p2x:-3.5,p2y:-5,p2z:-9,_siz:2.5,_sizz:0.25};
mod_wi26_3[2] = {nam:"WIline2",p1x:1.5,p1y:-2,p1z:2.5,p2x:3.5,p2y:-5,p2z:-9,_siz:2.5,_sizz:0.25};
mod_wi26_3[3] = {nam:"WIline3",p1x:-1.5,p1y:-1,p1z:4.5,p2x:-4.5,p2y:-1,p2z:4.5,_siz:4.5,_sizz:1};
mod_wi26_3[4] = {nam:"WIline4",p1x:1.5,p1y:-1,p1z:4.5,p2x:4.5,p2y:-1,p2z:4.5,_siz:4.5,_sizz:1};
mod_wi26_3[5] = {nam:"WIline5",flag:"fy1",p1x:-4.5,p1y:-1,p1z:3,p2x:-4.5,p2y:-1,p2z:-2.5,_siz:4.5,_sizz:0.5};
mod_wi26_3[6] = {nam:"WIline6",flag:"fy2",p1x:4.5,p1y:-1,p1z:3,p2x:4.5,p2y:-1,p2z:-2.5,_siz:4.5,_sizz:0.5};
_global.mod_wi26_4 = new Array();
mod_wi26_4[0] = {nam:"WIline0",p1x:0,p1y:-3,p1z:3.5,p2x:0,p2y:0,p2z:4.5,_siz:5,_sizz:1};
mod_wi26_4[1] = {nam:"WIline1",p1x:-1.5,p1y:-2,p1z:2.5,p2x:-3.5,p2y:-5,p2z:-9,_siz:2.5,_sizz:0.25};
mod_wi26_4[2] = {nam:"WIline2",p1x:1.5,p1y:-2,p1z:2.5,p2x:3.5,p2y:-5,p2z:-9,_siz:2.5,_sizz:0.25};
mod_wi26_4[3] = {nam:"WIline3",p1x:-1.5,p1y:-1,p1z:4.5,p2x:-4.5,p2y:-1,p2z:4.5,_siz:4.5,_sizz:1};
mod_wi26_4[4] = {nam:"WIline4",p1x:1.5,p1y:-1,p1z:4.5,p2x:4.5,p2y:-1,p2z:4.5,_siz:4.5,_sizz:1};
mod_wi26_4[5] = {nam:"WIline5",flag:"fy1",p1x:-4.5,p1y:-1,p1z:3,p2x:-4.5,p2y:-1,p2z:-2.5,_siz:4.5,_sizz:0.5};
mod_wi26_4[6] = {nam:"WIline6",flag:"fy2",p1x:4.5,p1y:-1,p1z:3,p2x:4.5,p2y:-1,p2z:-2.5,_siz:4.5,_sizz:0.5};
_global.mod_wi26_5 = new Array();
mod_wi26_5[0] = {nam:"WIline0",p1x:0,p1y:-3,p1z:3.5,p2x:0,p2y:0,p2z:4.5,_siz:5,_sizz:1};
mod_wi26_5[1] = {nam:"WIline1",p1x:-1.5,p1y:-2,p1z:2.5,p2x:-3.5,p2y:-5,p2z:-9,_siz:2.5,_sizz:0.25};
mod_wi26_5[2] = {nam:"WIline2",p1x:1.5,p1y:-2,p1z:2.5,p2x:3.5,p2y:-5,p2z:-9,_siz:2.5,_sizz:0.25};
mod_wi26_5[3] = {nam:"WIline3",p1x:-1.5,p1y:-1,p1z:4.5,p2x:-4.5,p2y:-1,p2z:4.5,_siz:4.5,_sizz:1};
mod_wi26_5[4] = {nam:"WIline4",p1x:1.5,p1y:-1,p1z:4.5,p2x:4.5,p2y:-1,p2z:4.5,_siz:4.5,_sizz:1};
mod_wi26_5[5] = {nam:"WIline5",flag:"fy1",p1x:-4.5,p1y:-1,p1z:3,p2x:-4.5,p2y:-1,p2z:-2.5,_siz:4.5,_sizz:0.5};
mod_wi26_5[6] = {nam:"WIline6",flag:"fy2",p1x:4.5,p1y:-1,p1z:3,p2x:4.5,p2y:-1,p2z:-2.5,_siz:4.5,_sizz:0.5};
_global.mod_wi27_1 = new Array();
mod_wi27_1[0] = {nam:"WIline0",p1x:0,p1y:-2.5,p1z:0,p2x:0,p2y:-2.5,p2z:8,_siz:2.5,_sizz:0.1};
mod_wi27_1[1] = {nam:"WIline1",p1x:1.5,p1y:-2,p1z:2,p2x:1.5,p2y:-2,p2z:-1,_siz:2,_sizz:1.5};
mod_wi27_1[2] = {nam:"WIline2",p1x:-1.5,p1y:-2,p1z:2,p2x:-1.5,p2y:-2,p2z:-1,_siz:2,_sizz:1.5};
_global.mod_wi27_2 = new Array();
mod_wi27_2[0] = {nam:"WIline0",p1x:0,p1y:-2,p1z:2,p2x:0,p2y:5,p2z:5.5,_siz:2.5,_sizz:0.1};
mod_wi27_2[1] = {nam:"WIline1",p1x:1.5,p1y:-0.5,p1z:3,p2x:1.5,p2y:-4,p2z:1.5,_siz:2,_sizz:1.5};
mod_wi27_2[2] = {nam:"WIline2",p1x:-1.5,p1y:-0.5,p1z:3,p2x:-1.5,p2y:-4,p2z:1.5,_siz:2,_sizz:1.5};
_global.mod_wi27_3 = new Array();
mod_wi27_3[0] = {nam:"WIline0",p1x:0,p1y:-2.5,p1z:0,p2x:0,p2y:-2.5,p2z:8,_siz:2.5,_sizz:0.1};
mod_wi27_3[1] = {nam:"WIline1",p1x:1.5,p1y:-2,p1z:2,p2x:1.5,p2y:-2,p2z:-1,_siz:2,_sizz:1.5};
mod_wi27_3[2] = {nam:"WIline2",p1x:-1.5,p1y:-2,p1z:2,p2x:-1.5,p2y:-2,p2z:-1,_siz:2,_sizz:1.5};
_global.mod_wi27_4 = new Array();
mod_wi27_4[0] = {nam:"WIline0",p1x:0,p1y:-2.5,p1z:0,p2x:0,p2y:-2.5,p2z:8,_siz:2.5,_sizz:0.1};
mod_wi27_4[1] = {nam:"WIline1",p1x:1.5,p1y:-2,p1z:2,p2x:1.5,p2y:-2,p2z:-1,_siz:2,_sizz:1.5};
mod_wi27_4[2] = {nam:"WIline2",p1x:-1.5,p1y:-2,p1z:2,p2x:-1.5,p2y:-2,p2z:-1,_siz:2,_sizz:1.5};
_global.mod_wi27_5 = new Array();
mod_wi27_5[0] = {nam:"WIline0",p1x:0,p1y:-2.5,p1z:0,p2x:0,p2y:-2.5,p2z:8,_siz:2.5,_sizz:0.1};
mod_wi27_5[1] = {nam:"WIline1",p1x:1.5,p1y:-2,p1z:2,p2x:1.5,p2y:-2,p2z:-1,_siz:2,_sizz:1.5};
mod_wi27_5[2] = {nam:"WIline2",p1x:-1.5,p1y:-2,p1z:2,p2x:-1.5,p2y:-2,p2z:-1,_siz:2,_sizz:1.5};
_global.mod_wi28_1 = new Array();
mod_wi28_1[0] = {nam:"WIline0",p1x:1.2,p1y:-2.5,p1z:1,p2x:3,p2y:-3,p2z:3,_siz:3,_sizz:1};
mod_wi28_1[1] = {nam:"WIline1",p1x:-1.2,p1y:-2.5,p1z:1,p2x:-3,p2y:-3,p2z:3,_siz:3,_sizz:1};
mod_wi28_1[2] = {nam:"WIline2",p1x:0,p1y:-2,p1z:1.5,p2x:0,p2y:-5,p2z:-6,_siz:1.5,_sizz:0.5};
_global.mod_wi28_2 = new Array();
mod_wi28_2[0] = {nam:"WIline0",p1x:1.2,p1y:-1.5,p1z:2.5,p2x:3,p2y:0,p2z:4,_siz:3,_sizz:1};
mod_wi28_2[1] = {nam:"WIline1",p1x:-1.2,p1y:-1.5,p1z:2.5,p2x:-3,p2y:0,p2z:4,_siz:3,_sizz:1};
mod_wi28_2[2] = {nam:"WIline2",p1x:0,p1y:-1,p1z:2,p2x:0,p2y:-8,p2z:4,_siz:1.5,_sizz:0.5};
_global.mod_wi28_3 = new Array();
mod_wi28_3[0] = {nam:"WIline0",p1x:1.2,p1y:-2.5,p1z:1,p2x:3,p2y:-3,p2z:3,_siz:3,_sizz:1};
mod_wi28_3[1] = {nam:"WIline1",p1x:-1.2,p1y:-2.5,p1z:1,p2x:-3,p2y:-3,p2z:3,_siz:3,_sizz:1};
mod_wi28_3[2] = {nam:"WIline2",p1x:0,p1y:-2,p1z:1.5,p2x:0,p2y:-5,p2z:-6,_siz:1.5,_sizz:0.5};
_global.mod_wi28_4 = new Array();
mod_wi28_4[0] = {nam:"WIline0",p1x:1.2,p1y:-2.5,p1z:1,p2x:3,p2y:-3,p2z:3,_siz:3,_sizz:1};
mod_wi28_4[1] = {nam:"WIline1",p1x:-1.2,p1y:-2.5,p1z:1,p2x:-3,p2y:-3,p2z:3,_siz:3,_sizz:1};
mod_wi28_4[2] = {nam:"WIline2",p1x:0,p1y:-2,p1z:1.5,p2x:0,p2y:-5,p2z:-6,_siz:1.5,_sizz:0.5};
_global.mod_wi28_5 = new Array();
mod_wi28_5[0] = {nam:"WIline0",p1x:1.2,p1y:-2.5,p1z:1,p2x:3,p2y:-3,p2z:3,_siz:3,_sizz:1};
mod_wi28_5[1] = {nam:"WIline1",p1x:-1.2,p1y:-2.5,p1z:1,p2x:-3,p2y:-3,p2z:3,_siz:3,_sizz:1};
mod_wi28_5[2] = {nam:"WIline2",p1x:0,p1y:-2,p1z:1.5,p2x:0,p2y:-5,p2z:-6,_siz:1.5,_sizz:0.5};
_global.mod_wi29_1 = new Array();
mod_wi29_1[0] = {nam:"WIline0",p1x:1,p1y:-1.5,p1z:2.5,p2x:1.9,p2y:-3.5,p2z:2.3,_siz:1,_sizz:2};
mod_wi29_1[1] = {nam:"WIline1",p1x:-1,p1y:-1.5,p1z:2.5,p2x:-1.9,p2y:-3.5,p2z:2.3,_siz:1,_sizz:2};
mod_wi29_1[2] = {nam:"WIline2",p1x:1.3,p1y:-2.1,p1z:2,p2x:2,p2y:-4.5,p2z:0.5,_siz:2,_sizz:1};
mod_wi29_1[3] = {nam:"WIline3",p1x:-1.3,p1y:-2.1,p1z:2,p2x:-2,p2y:-4.5,p2z:0.5,_siz:2,_sizz:1};
mod_wi29_1[4] = {nam:"WIline4",p1x:1.6,p1y:-2.7,p1z:2.2,p2x:2.4,p2y:-5.8,p2z:1,_siz:2,_sizz:1};
mod_wi29_1[5] = {nam:"WIline5",p1x:-1.6,p1y:-2.7,p1z:2.2,p2x:-2.4,p2y:-5.8,p2z:1,_siz:2,_sizz:1};
mod_wi29_1[6] = {nam:"WIline6",p1x:1.9,p1y:-3.5,p1z:2.3,p2x:2.8,p2y:-8,p2z:1.5,_siz:2,_sizz:0.2};
mod_wi29_1[7] = {nam:"WIline7",p1x:-1.9,p1y:-3.5,p1z:2.3,p2x:-2.8,p2y:-8,p2z:1.5,_siz:2,_sizz:0.2};
mod_wi29_1[8] = {nam:"WIline8",p1x:0.5,p1y:-1.5,p1z:1,p2x:1,p2y:-6,p2z:-5,_siz:1,_sizz:1.2};
mod_wi29_1[9] = {nam:"WIline9",p1x:-0.5,p1y:-1.5,p1z:1,p2x:-1,p2y:-6,p2z:-5,_siz:1,_sizz:1.2};
_global.mod_wi29_2 = new Array();
mod_wi29_2[0] = {nam:"WIline0",p1x:1,p1y:0,p1z:2.5,p2x:1.9,p2y:-1.5,p2z:4.5,_siz:1,_sizz:2};
mod_wi29_2[1] = {nam:"WIline1",p1x:-1,p1y:0,p1z:2.5,p2x:-1.9,p2y:-1.5,p2z:4.5,_siz:1,_sizz:2};
mod_wi29_2[2] = {nam:"WIline2",p1x:1.3,p1y:-1,p1z:3.4,p2x:2,p2y:-3.2,p2z:3.4,_siz:2,_sizz:1};
mod_wi29_2[3] = {nam:"WIline3",p1x:-1.3,p1y:-1,p1z:3.4,p2x:-2,p2y:-3.2,p2z:3.4,_siz:2,_sizz:1};
mod_wi29_2[4] = {nam:"WIline4",p1x:1.6,p1y:-1.3,p1z:3.7,p2x:2.4,p2y:-4.1,p2z:4.6,_siz:2,_sizz:1};
mod_wi29_2[5] = {nam:"WIline5",p1x:-1.6,p1y:-1.3,p1z:3.7,p2x:-2.4,p2y:-4.1,p2z:4.6,_siz:2,_sizz:1};
mod_wi29_2[6] = {nam:"WIline6",p1x:1.9,p1y:-1.5,p1z:4.5,p2x:2.8,p2y:-6,p2z:5.5,_siz:2,_sizz:0.2};
mod_wi29_2[7] = {nam:"WIline7",p1x:-1.9,p1y:-1.5,p1z:4.5,p2x:-2.8,p2y:-6,p2z:5.5,_siz:2,_sizz:0.2};
mod_wi29_2[8] = {nam:"WIline8",p1x:0.5,p1y:-2,p1z:1.5,p2x:1.5,p2y:-10,p2z:2,_siz:1,_sizz:1.2};
mod_wi29_2[9] = {nam:"WIline9",p1x:-0.5,p1y:-2,p1z:1.5,p2x:-1.5,p2y:-10,p2z:2,_siz:1,_sizz:1.2};
_global.mod_wi29_3 = new Array();
mod_wi29_3[0] = {nam:"WIline0",p1x:1,p1y:-1.5,p1z:2.5,p2x:1.9,p2y:-3.5,p2z:2.3,_siz:1,_sizz:2};
mod_wi29_3[1] = {nam:"WIline1",p1x:-1,p1y:-1.5,p1z:2.5,p2x:-1.9,p2y:-3.5,p2z:2.3,_siz:1,_sizz:2};
mod_wi29_3[2] = {nam:"WIline2",p1x:1.3,p1y:-2.1,p1z:2,p2x:2,p2y:-4.5,p2z:0.5,_siz:2,_sizz:1};
mod_wi29_3[3] = {nam:"WIline3",p1x:-1.3,p1y:-2.1,p1z:2,p2x:-2,p2y:-4.5,p2z:0.5,_siz:2,_sizz:1};
mod_wi29_3[4] = {nam:"WIline4",p1x:1.6,p1y:-2.7,p1z:2.2,p2x:2.4,p2y:-5.8,p2z:1,_siz:2,_sizz:1};
mod_wi29_3[5] = {nam:"WIline5",p1x:-1.6,p1y:-2.7,p1z:2.2,p2x:-2.4,p2y:-5.8,p2z:1,_siz:2,_sizz:1};
mod_wi29_3[6] = {nam:"WIline6",p1x:1.9,p1y:-3.5,p1z:2.3,p2x:2.8,p2y:-8,p2z:1.5,_siz:2,_sizz:0.2};
mod_wi29_3[7] = {nam:"WIline7",p1x:-1.9,p1y:-3.5,p1z:2.3,p2x:-2.8,p2y:-8,p2z:1.5,_siz:2,_sizz:0.2};
mod_wi29_3[8] = {nam:"WIline8",p1x:0.5,p1y:-1.5,p1z:1,p2x:1,p2y:-6,p2z:-5,_siz:1,_sizz:1.2};
mod_wi29_3[9] = {nam:"WIline9",p1x:-0.5,p1y:-1.5,p1z:1,p2x:-1,p2y:-6,p2z:-5,_siz:1,_sizz:1.2};
_global.mod_wi29_4 = new Array();
mod_wi29_4[0] = {nam:"WIline0",p1x:1,p1y:-1.5,p1z:2.5,p2x:1.9,p2y:-3.5,p2z:2.3,_siz:1,_sizz:2};
mod_wi29_4[1] = {nam:"WIline1",p1x:-1,p1y:-1.5,p1z:2.5,p2x:-1.9,p2y:-3.5,p2z:2.3,_siz:1,_sizz:2};
mod_wi29_4[2] = {nam:"WIline2",p1x:1.3,p1y:-2.1,p1z:2,p2x:2.5,p2y:-4.5,p2z:0.5,_siz:2,_sizz:1};
mod_wi29_4[3] = {nam:"WIline3",p1x:-1.3,p1y:-2.1,p1z:2,p2x:-1.5,p2y:-4.5,p2z:0.5,_siz:2,_sizz:1};
mod_wi29_4[4] = {nam:"WIline4",p1x:1.6,p1y:-2.7,p1z:2.2,p2x:2.9,p2y:-5.8,p2z:1,_siz:2,_sizz:1};
mod_wi29_4[5] = {nam:"WIline5",p1x:-1.6,p1y:-2.7,p1z:2.2,p2x:-1.9,p2y:-5.8,p2z:1,_siz:2,_sizz:1};
mod_wi29_4[6] = {nam:"WIline6",p1x:1.9,p1y:-3.5,p1z:2.3,p2x:3.3,p2y:-8,p2z:1.5,_siz:2,_sizz:0.2};
mod_wi29_4[7] = {nam:"WIline7",p1x:-1.9,p1y:-3.5,p1z:2.3,p2x:-2.3,p2y:-8,p2z:1.5,_siz:2,_sizz:0.2};
mod_wi29_4[8] = {nam:"WIline8",p1x:0.5,p1y:-1.5,p1z:1,p2x:1,p2y:-6,p2z:-5,_siz:1,_sizz:1.2};
mod_wi29_4[9] = {nam:"WIline9",p1x:-0.5,p1y:-1.5,p1z:1,p2x:-1,p2y:-6,p2z:-5,_siz:1,_sizz:1.2};
_global.mod_wi29_5 = new Array();
mod_wi29_5[0] = {nam:"WIline0",p1x:1,p1y:-1.5,p1z:2.5,p2x:1.9,p2y:-3.5,p2z:2.3,_siz:1,_sizz:2};
mod_wi29_5[1] = {nam:"WIline1",p1x:-1,p1y:-1.5,p1z:2.5,p2x:-1.9,p2y:-3.5,p2z:2.3,_siz:1,_sizz:2};
mod_wi29_5[2] = {nam:"WIline2",p1x:1.3,p1y:-2.1,p1z:2,p2x:1.5,p2y:-4.5,p2z:0.5,_siz:2,_sizz:1};
mod_wi29_5[3] = {nam:"WIline3",p1x:-1.3,p1y:-2.1,p1z:2,p2x:-2.5,p2y:-4.5,p2z:0.5,_siz:2,_sizz:1};
mod_wi29_5[4] = {nam:"WIline4",p1x:1.6,p1y:-2.7,p1z:2.2,p2x:1.9,p2y:-5.8,p2z:1,_siz:2,_sizz:1};
mod_wi29_5[5] = {nam:"WIline5",p1x:-1.6,p1y:-2.7,p1z:2.2,p2x:-2.9,p2y:-5.8,p2z:1,_siz:2,_sizz:1};
mod_wi29_5[6] = {nam:"WIline6",p1x:1.9,p1y:-3.5,p1z:2.3,p2x:2.3,p2y:-8,p2z:1.5,_siz:2,_sizz:0.2};
mod_wi29_5[7] = {nam:"WIline7",p1x:-1.9,p1y:-3.5,p1z:2.3,p2x:-3.3,p2y:-8,p2z:1.5,_siz:2,_sizz:0.2};
mod_wi29_5[8] = {nam:"WIline8",p1x:0.5,p1y:-1.5,p1z:1,p2x:1,p2y:-6,p2z:-5,_siz:1,_sizz:1.2};
mod_wi29_5[9] = {nam:"WIline9",p1x:-0.5,p1y:-1.5,p1z:1,p2x:-1,p2y:-6,p2z:-5,_siz:1,_sizz:1.2};
_global.mod_wi30_1 = new Array();
mod_wi30_1[0] = {nam:"WIline0",p1x:0,p1y:0,p1z:2.8,p2x:0,p2y:0,p2z:3.5,_siz:3.25,_sizz:1};
mod_wi30_1[1] = {nam:"WIline1",p1x:0,p1y:0,p1z:3.5,p2x:4,p2y:0,p2z:5.5,_siz:1,_sizz:0.1};
mod_wi30_1[2] = {nam:"WIline2",p1x:0,p1y:0,p1z:3.5,p2x:-4,p2y:0,p2z:5.5,_siz:1,_sizz:0.1};
mod_wi30_1[3] = {nam:"WIline3",p1x:2,p1y:0,p1z:4.5,p2x:2,p2y:0,p2z:7,_siz:0.5,_sizz:0.1};
mod_wi30_1[4] = {nam:"WIline4",p1x:-2,p1y:0,p1z:4.5,p2x:-2,p2y:0,p2z:7,_siz:0.5,_sizz:0.1};
_global.mod_wi30_2 = new Array();
mod_wi30_2[0] = {nam:"WIline0",p1x:0,p1y:1,p1z:2,p2x:0,p2y:1.3,p2z:3,_siz:3.25,_sizz:1};
mod_wi30_2[1] = {nam:"WIline1",p1x:0,p1y:1.3,p1z:3,p2x:4,p2y:2,p2z:5,_siz:1,_sizz:0.1};
mod_wi30_2[2] = {nam:"WIline2",p1x:0,p1y:1.3,p1z:3,p2x:-4,p2y:2,p2z:5,_siz:1,_sizz:0.1};
mod_wi30_2[3] = {nam:"WIline3",p1x:2,p1y:1.65,p1z:4,p2x:2,p2y:2.2,p2z:6,_siz:0.5,_sizz:0.1};
mod_wi30_2[4] = {nam:"WIline4",p1x:-2,p1y:1.65,p1z:4,p2x:-2,p2y:2.2,p2z:6,_siz:0.5,_sizz:0.1};
_global.mod_wi30_3 = new Array();
_global.mod_wi30_3 = _global.mod_wi30_1;
_global.mod_wi30_4 = new Array();
_global.mod_wi30_4 = _global.mod_wi30_1;
_global.mod_wi30_5 = new Array();
_global.mod_wi30_5 = _global.mod_wi30_1;
_global.mod_wi31_1 = new Array();
mod_wi31_1[0] = {nam:"WIline0",p1x:0,p1y:-1.5,p1z:0,p2x:0,p2y:-2,p2z:4,_siz:3,_sizz:0.2};
mod_wi31_1[1] = {nam:"WIline1",p1x:-1.5,p1y:-2,p1z:-0.5,p2x:-3.5,p2y:-8,p2z:-5,_siz:2,_sizz:1.2};
mod_wi31_1[2] = {nam:"WIline2",p1x:1.5,p1y:-2,p1z:-0.5,p2x:3.5,p2y:-8,p2z:-5,_siz:2,_sizz:1.2};
mod_wi31_1[3] = {nam:"WIline3",p1x:0.5,p1y:-1.5,p1z:0,p2x:0.5,p2y:-1.5,p2z:5,_siz:1,_sizz:0.5};
mod_wi31_1[4] = {nam:"WIline4",p1x:-0.5,p1y:-1.5,p1z:0,p2x:-0.5,p2y:-1.5,p2z:5,_siz:1,_sizz:0.5};
mod_wi31_1[5] = {nam:"WIline5",p1x:1.5,p1y:-1.5,p1z:0,p2x:2.5,p2y:-1.5,p2z:7,_siz:1.2,_sizz:1};
mod_wi31_1[6] = {nam:"WIline6",p1x:-1.5,p1y:-1.5,p1z:0,p2x:-2.5,p2y:-1.5,p2z:7,_siz:1.2,_sizz:1};
mod_wi31_1[7] = {nam:"WIline7",p1x:2,p1y:-1.5,p1z:3,p2x:2.3,p2y:-1.5,p2z:5,_siz:1.5,_sizz:1};
mod_wi31_1[8] = {nam:"WIline8",p1x:-2,p1y:-1.5,p1z:3,p2x:-2.3,p2y:-1.5,p2z:5,_siz:1.5,_sizz:1};
_global.mod_wi31_2 = new Array();
mod_wi31_2[0] = {nam:"WIline0",p1x:0,p1y:-2,p1z:1.5,p2x:0,p2y:3,p2z:3.5,_siz:3,_sizz:0.2};
mod_wi31_2[1] = {nam:"WIline1",p1x:1.5,p1y:-3,p1z:2,p2x:3.5,p2y:-10,p2z:4,_siz:2,_sizz:1.2};
mod_wi31_2[2] = {nam:"WIline2",p1x:-1.5,p1y:-3,p1z:2,p2x:-3.5,p2y:-10,p2z:4,_siz:2,_sizz:1.2};
mod_wi31_2[3] = {nam:"WIline3",p1x:0.5,p1y:-2,p1z:1.5,p2x:0.5,p2y:4,p2z:3.8,_siz:1,_sizz:0.5};
mod_wi31_2[4] = {nam:"WIline4",p1x:-0.5,p1y:-2,p1z:1.5,p2x:-0.5,p2y:4,p2z:3.8,_siz:1,_sizz:0.5};
mod_wi31_2[5] = {nam:"WIline5",p1x:1.5,p1y:-2,p1z:1.5,p2x:2.5,p2y:6,p2z:4.2,_siz:1.2,_sizz:1};
mod_wi31_2[6] = {nam:"WIline6",p1x:-1.5,p1y:-2,p1z:1.5,p2x:-2.5,p2y:6,p2z:4.2,_siz:1.2,_sizz:1};
mod_wi31_2[7] = {nam:"WIline7",p1x:2,p1y:2.5,p1z:3.3,p2x:2.3,p2y:4.5,p2z:3.8,_siz:1.5,_sizz:1};
mod_wi31_2[8] = {nam:"WIline8",p1x:-2,p1y:2.5,p1z:3.3,p2x:-2.3,p2y:4.5,p2z:3.8,_siz:1.5,_sizz:1};
_global.mod_wi31_3 = new Array();
mod_wi31_3[0] = {nam:"WIline0",p1x:0,p1y:-1.5,p1z:0,p2x:0,p2y:-2,p2z:4,_siz:3,_sizz:0.2};
mod_wi31_3[1] = {nam:"WIline1",p1x:-1.5,p1y:-2,p1z:-0.5,p2x:-3.5,p2y:-8,p2z:-5,_siz:2,_sizz:1.2};
mod_wi31_3[2] = {nam:"WIline2",p1x:1.5,p1y:-2,p1z:-0.5,p2x:3.5,p2y:-8,p2z:-5,_siz:2,_sizz:1.2};
mod_wi31_3[3] = {nam:"WIline3",p1x:0.5,p1y:-1.5,p1z:0,p2x:0.5,p2y:-1.5,p2z:5,_siz:1,_sizz:0.5};
mod_wi31_3[4] = {nam:"WIline4",p1x:-0.5,p1y:-1.5,p1z:0,p2x:-0.5,p2y:-1.5,p2z:5,_siz:1,_sizz:0.5};
mod_wi31_3[5] = {nam:"WIline5",p1x:1.5,p1y:-1.5,p1z:0,p2x:2.5,p2y:-1.5,p2z:7,_siz:1.2,_sizz:1};
mod_wi31_3[6] = {nam:"WIline6",p1x:-1.5,p1y:-1.5,p1z:0,p2x:-2.5,p2y:-1.5,p2z:7,_siz:1.2,_sizz:1};
mod_wi31_3[7] = {nam:"WIline7",p1x:2,p1y:-1.5,p1z:3,p2x:2.3,p2y:-1.5,p2z:5,_siz:1.5,_sizz:1};
mod_wi31_3[8] = {nam:"WIline8",p1x:-2,p1y:-1.5,p1z:3,p2x:-2.3,p2y:-1.5,p2z:5,_siz:1.5,_sizz:1};
_global.mod_wi31_4 = new Array();
mod_wi31_4[0] = {nam:"WIline0",p1x:0,p1y:-1.5,p1z:0,p2x:0,p2y:-2,p2z:4,_siz:3,_sizz:0.2};
mod_wi31_4[1] = {nam:"WIline1",p1x:-1.5,p1y:-2,p1z:-0.5,p2x:-3.5,p2y:-8,p2z:-5,_siz:2,_sizz:1.2};
mod_wi31_4[2] = {nam:"WIline2",p1x:1.5,p1y:-2,p1z:-0.5,p2x:3.5,p2y:-8,p2z:-5,_siz:2,_sizz:1.2};
mod_wi31_4[3] = {nam:"WIline3",p1x:0.5,p1y:-1.5,p1z:0,p2x:0.5,p2y:-1.5,p2z:5,_siz:1,_sizz:0.5};
mod_wi31_4[4] = {nam:"WIline4",p1x:-0.5,p1y:-1.5,p1z:0,p2x:-0.5,p2y:-1.5,p2z:5,_siz:1,_sizz:0.5};
mod_wi31_4[5] = {nam:"WIline5",p1x:1.5,p1y:-1.5,p1z:0,p2x:2.5,p2y:-1.5,p2z:7,_siz:1.2,_sizz:1};
mod_wi31_4[6] = {nam:"WIline6",p1x:-1.5,p1y:-1.5,p1z:0,p2x:-2.5,p2y:-1.5,p2z:7,_siz:1.2,_sizz:1};
mod_wi31_4[7] = {nam:"WIline7",p1x:2,p1y:-1.5,p1z:3,p2x:2.3,p2y:-1.5,p2z:5,_siz:1.5,_sizz:1};
mod_wi31_4[8] = {nam:"WIline8",p1x:-2,p1y:-1.5,p1z:3,p2x:-2.3,p2y:-1.5,p2z:5,_siz:1.5,_sizz:1};
_global.mod_wi31_5 = new Array();
mod_wi31_5[0] = {nam:"WIline0",p1x:0,p1y:-1.5,p1z:0,p2x:0,p2y:-2,p2z:4,_siz:3,_sizz:0.2};
mod_wi31_5[1] = {nam:"WIline1",p1x:-1.5,p1y:-2,p1z:-0.5,p2x:-3.5,p2y:-8,p2z:-5,_siz:2,_sizz:1.2};
mod_wi31_5[2] = {nam:"WIline2",p1x:1.5,p1y:-2,p1z:-0.5,p2x:3.5,p2y:-8,p2z:-5,_siz:2,_sizz:1.2};
mod_wi31_5[3] = {nam:"WIline3",p1x:0.5,p1y:-1.5,p1z:0,p2x:0.5,p2y:-1.5,p2z:5,_siz:1,_sizz:0.5};
mod_wi31_5[4] = {nam:"WIline4",p1x:-0.5,p1y:-1.5,p1z:0,p2x:-0.5,p2y:-1.5,p2z:5,_siz:1,_sizz:0.5};
mod_wi31_5[5] = {nam:"WIline5",p1x:1.5,p1y:-1.5,p1z:0,p2x:2.5,p2y:-1.5,p2z:7,_siz:1.2,_sizz:1};
mod_wi31_5[6] = {nam:"WIline6",p1x:-1.5,p1y:-1.5,p1z:0,p2x:-2.5,p2y:-1.5,p2z:7,_siz:1.2,_sizz:1};
mod_wi31_5[7] = {nam:"WIline7",p1x:2,p1y:-1.5,p1z:3,p2x:2.3,p2y:-1.5,p2z:5,_siz:1.5,_sizz:1};
mod_wi31_5[8] = {nam:"WIline8",p1x:-2,p1y:-1.5,p1z:3,p2x:-2.3,p2y:-1.5,p2z:5,_siz:1.5,_sizz:1};
_global.mod_wi32_1 = new Array();
mod_wi32_1[0] = {nam:"WIline0",p1x:1,p1y:-1.5,p1z:-2,p2x:4,p2y:-2,p2z:-3,_siz:1,_sizz:1.5};
mod_wi32_1[1] = {nam:"WIline1",p1x:-1,p1y:-1.5,p1z:-2,p2x:-4,p2y:-2,p2z:-3,_siz:1,_sizz:1.5};
mod_wi32_1[2] = {nam:"WIline2",flag:"fy1",p1x:3.9,p1y:-2.5,p1z:-2,p2x:3.4,p2y:-2.5,p2z:-10,_siz:2,_sizz:0.5};
mod_wi32_1[3] = {nam:"WIline3",flag:"fy2",p1x:-3.9,p1y:-2.5,p1z:-2,p2x:-3.4,p2y:-2.5,p2z:-10,_siz:2,_sizz:0.5};
mod_wi32_1[4] = {nam:"WIline4",flag:"fy3",p1x:4.6,p1y:-1.5,p1z:-2,p2x:4.1,p2y:-1.5,p2z:-10,_siz:2,_sizz:0.5};
mod_wi32_1[5] = {nam:"WIline5",flag:"fy4",p1x:-4.6,p1y:-1.5,p1z:-2,p2x:-4.1,p2y:-1.5,p2z:-10,_siz:2,_sizz:0.5};
mod_wi32_1[6] = {nam:"WIline6",flag:"fy5",p1x:5.3,p1y:-0.5,p1z:-2,p2x:4.8,p2y:-0.5,p2z:-10,_siz:2,_sizz:0.5};
mod_wi32_1[7] = {nam:"WIline7",flag:"fy6",p1x:-5.3,p1y:-0.5,p1z:-2,p2x:-4.8,p2y:-0.5,p2z:-10,_siz:2,_sizz:0.5};
mod_wi32_1[8] = {nam:"WIline8",flag:"fy7",p1x:6,p1y:0.5,p1z:-2,p2x:5.5,p2y:0.5,p2z:-10,_siz:2,_sizz:0.5};
mod_wi32_1[9] = {nam:"WIline9",flag:"fy8",p1x:-6,p1y:0.5,p1z:-2,p2x:-5.5,p2y:0.5,p2z:-10,_siz:2,_sizz:0.5};
mod_wi32_1[10] = {nam:"WIline10",flag:"fy9",p1x:6.7,p1y:1.5,p1z:-2,p2x:6.2,p2y:1.5,p2z:-10,_siz:2,_sizz:0.5};
mod_wi32_1[11] = {nam:"WIline11",flag:"fy10",p1x:-6.7,p1y:1.5,p1z:-2,p2x:-6.2,p2y:1.5,p2z:-10,_siz:2,_sizz:0.5};
_global.mod_wi32_2 = new Array();
mod_wi32_2[0] = {nam:"WIline0",p1x:1,p1y:-4,p1z:1,p2x:4,p2y:-4.5,p2z:2,_siz:1,_sizz:1.5};
mod_wi32_2[1] = {nam:"WIline1",p1x:-1,p1y:-4,p1z:1,p2x:-4,p2y:-4.5,p2z:2,_siz:1,_sizz:1.5};
mod_wi32_2[2] = {nam:"WIline2",flag:"fy1",p1x:3.9,p1y:-3.5,p1z:3,p2x:3.4,p2y:-11,p2z:1,_siz:2,_sizz:0.5};
mod_wi32_2[3] = {nam:"WIline3",flag:"fy2",p1x:-3.9,p1y:-3.5,p1z:3,p2x:-3.4,p2y:-11,p2z:1,_siz:2,_sizz:0.5};
mod_wi32_2[4] = {nam:"WIline4",flag:"fy3",p1x:4.6,p1y:-3.3,p1z:2,p2x:4.1,p2y:-10.8,p2z:0,_siz:2,_sizz:0.5};
mod_wi32_2[5] = {nam:"WIline5",flag:"fy4",p1x:-4.6,p1y:-3.3,p1z:2,p2x:-4.1,p2y:-10.8,p2z:0,_siz:2,_sizz:0.5};
mod_wi32_2[6] = {nam:"WIline6",flag:"fy5",p1x:5.3,p1y:-3.1,p1z:1,p2x:4.8,p2y:-10.6,p2z:-1,_siz:2,_sizz:0.5};
mod_wi32_2[7] = {nam:"WIline7",flag:"fy6",p1x:-5.3,p1y:-3.1,p1z:1,p2x:-4.8,p2y:-10.6,p2z:-1,_siz:2,_sizz:0.5};
mod_wi32_2[8] = {nam:"WIline8",flag:"fy7",p1x:6,p1y:-2.9,p1z:0,p2x:5.5,p2y:-10.4,p2z:-2,_siz:2,_sizz:0.5};
mod_wi32_2[9] = {nam:"WIline9",flag:"fy8",p1x:-6,p1y:-2.9,p1z:0,p2x:-5.5,p2y:-10.4,p2z:-2,_siz:2,_sizz:0.5};
mod_wi32_2[10] = {nam:"WIline10",flag:"fy9",p1x:6.7,p1y:-2.7,p1z:-1,p2x:6.2,p2y:-10.2,p2z:-3,_siz:2,_sizz:0.5};
mod_wi32_2[11] = {nam:"WIline11",flag:"fy10",p1x:-6.7,p1y:-2.7,p1z:-1,p2x:-6.2,p2y:-10.2,p2z:-3,_siz:2,_sizz:0.5};
_global.mod_wi32_3 = new Array();
mod_wi32_3[0] = {nam:"WIline0",p1x:1,p1y:-1.5,p1z:-2,p2x:4,p2y:-2,p2z:-3,_siz:1,_sizz:1.5};
mod_wi32_3[1] = {nam:"WIline1",p1x:-1,p1y:-1.5,p1z:-2,p2x:-4,p2y:-2,p2z:-3,_siz:1,_sizz:1.5};
mod_wi32_3[2] = {nam:"WIline2",flag:"fy1",p1x:3.9,p1y:-2.5,p1z:-2,p2x:3.4,p2y:-2.5,p2z:-10,_siz:2,_sizz:0.5};
mod_wi32_3[3] = {nam:"WIline3",flag:"fy2",p1x:-3.9,p1y:-2.5,p1z:-2,p2x:-3.4,p2y:-2.5,p2z:-10,_siz:2,_sizz:0.5};
mod_wi32_3[4] = {nam:"WIline4",flag:"fy3",p1x:4.6,p1y:-1.5,p1z:-2,p2x:4.1,p2y:-1.5,p2z:-10,_siz:2,_sizz:0.5};
mod_wi32_3[5] = {nam:"WIline5",flag:"fy4",p1x:-4.6,p1y:-1.5,p1z:-2,p2x:-4.1,p2y:-1.5,p2z:-10,_siz:2,_sizz:0.5};
mod_wi32_3[6] = {nam:"WIline6",flag:"fy5",p1x:5.3,p1y:-0.5,p1z:-2,p2x:4.8,p2y:-0.5,p2z:-10,_siz:2,_sizz:0.5};
mod_wi32_3[7] = {nam:"WIline7",flag:"fy6",p1x:-5.3,p1y:-0.5,p1z:-2,p2x:-4.8,p2y:-0.5,p2z:-10,_siz:2,_sizz:0.5};
mod_wi32_3[8] = {nam:"WIline8",flag:"fy7",p1x:6,p1y:0.5,p1z:-2,p2x:5.5,p2y:0.5,p2z:-10,_siz:2,_sizz:0.5};
mod_wi32_3[9] = {nam:"WIline9",flag:"fy8",p1x:-6,p1y:0.5,p1z:-2,p2x:-5.5,p2y:0.5,p2z:-10,_siz:2,_sizz:0.5};
mod_wi32_3[10] = {nam:"WIline10",flag:"fy9",p1x:6.7,p1y:1.5,p1z:-2,p2x:6.2,p2y:1.5,p2z:-10,_siz:2,_sizz:0.5};
mod_wi32_3[11] = {nam:"WIline11",flag:"fy10",p1x:-6.7,p1y:1.5,p1z:-2,p2x:-6.2,p2y:1.5,p2z:-10,_siz:2,_sizz:0.5};
_global.mod_wi32_4 = new Array();
mod_wi32_4[0] = {nam:"WIline0",p1x:1,p1y:-1.5,p1z:-2,p2x:4,p2y:-2,p2z:-3,_siz:1,_sizz:1.5};
mod_wi32_4[1] = {nam:"WIline1",p1x:-1,p1y:-1.5,p1z:-2,p2x:-4,p2y:-2,p2z:-3,_siz:1,_sizz:1.5};
mod_wi32_4[2] = {nam:"WIline2",flag:"fy1",p1x:3.9,p1y:-2.5,p1z:-2,p2x:6.4,p2y:-2.5,p2z:-9,_siz:2,_sizz:0.5};
mod_wi32_4[3] = {nam:"WIline3",flag:"fy2",p1x:-3.9,p1y:-2.5,p1z:-2,p2x:-3.4,p2y:-2.5,p2z:-10,_siz:2,_sizz:0.5};
mod_wi32_4[4] = {nam:"WIline4",flag:"fy3",p1x:4.6,p1y:-1.5,p1z:-2,p2x:7.1,p2y:-1.5,p2z:-9,_siz:2,_sizz:0.5};
mod_wi32_4[5] = {nam:"WIline5",flag:"fy4",p1x:-4.6,p1y:-1.5,p1z:-2,p2x:-4.1,p2y:-1.5,p2z:-10,_siz:2,_sizz:0.5};
mod_wi32_4[6] = {nam:"WIline6",flag:"fy5",p1x:5.3,p1y:-0.5,p1z:-2,p2x:7.8,p2y:-0.5,p2z:-9,_siz:2,_sizz:0.5};
mod_wi32_4[7] = {nam:"WIline7",flag:"fy6",p1x:-5.3,p1y:-0.5,p1z:-2,p2x:-4.8,p2y:-0.5,p2z:-10,_siz:2,_sizz:0.5};
mod_wi32_4[8] = {nam:"WIline8",flag:"fy7",p1x:6,p1y:0.5,p1z:-2,p2x:8.5,p2y:0.5,p2z:-9,_siz:2,_sizz:0.5};
mod_wi32_4[9] = {nam:"WIline9",flag:"fy8",p1x:-6,p1y:0.5,p1z:-2,p2x:-5.5,p2y:0.5,p2z:-10,_siz:2,_sizz:0.5};
mod_wi32_4[10] = {nam:"WIline10",flag:"fy9",p1x:6.7,p1y:1.5,p1z:-2,p2x:9.2,p2y:1.5,p2z:-9,_siz:2,_sizz:0.5};
mod_wi32_4[11] = {nam:"WIline11",flag:"fy10",p1x:-6.7,p1y:1.5,p1z:-2,p2x:-6.2,p2y:1.5,p2z:-10,_siz:2,_sizz:0.5};
_global.mod_wi32_5 = new Array();
mod_wi32_5[0] = {nam:"WIline0",p1x:1,p1y:-1.5,p1z:-2,p2x:4,p2y:-2,p2z:-3,_siz:1,_sizz:1.5};
mod_wi32_5[1] = {nam:"WIline1",p1x:-1,p1y:-1.5,p1z:-2,p2x:-4,p2y:-2,p2z:-3,_siz:1,_sizz:1.5};
mod_wi32_5[2] = {nam:"WIline2",flag:"fy1",p1x:3.9,p1y:-2.5,p1z:-2,p2x:3.4,p2y:-2.5,p2z:-10,_siz:2,_sizz:0.5};
mod_wi32_5[3] = {nam:"WIline3",flag:"fy2",p1x:-3.9,p1y:-2.5,p1z:-2,p2x:-6.4,p2y:-2.5,p2z:-9,_siz:2,_sizz:0.5};
mod_wi32_5[4] = {nam:"WIline4",flag:"fy3",p1x:4.6,p1y:-1.5,p1z:-2,p2x:4.1,p2y:-1.5,p2z:-10,_siz:2,_sizz:0.5};
mod_wi32_5[5] = {nam:"WIline5",flag:"fy4",p1x:-4.6,p1y:-1.5,p1z:-2,p2x:-7.1,p2y:-1.5,p2z:-9,_siz:2,_sizz:0.5};
mod_wi32_5[6] = {nam:"WIline6",flag:"fy5",p1x:5.3,p1y:-0.5,p1z:-2,p2x:4.8,p2y:-0.5,p2z:-10,_siz:2,_sizz:0.5};
mod_wi32_5[7] = {nam:"WIline7",flag:"fy6",p1x:-5.3,p1y:-0.5,p1z:-2,p2x:-7.8,p2y:-0.5,p2z:-9,_siz:2,_sizz:0.5};
mod_wi32_5[8] = {nam:"WIline8",flag:"fy7",p1x:6,p1y:0.5,p1z:-2,p2x:5.5,p2y:0.5,p2z:-10,_siz:2,_sizz:0.5};
mod_wi32_5[9] = {nam:"WIline9",flag:"fy8",p1x:-6,p1y:0.5,p1z:-2,p2x:-8.5,p2y:0.5,p2z:-9,_siz:2,_sizz:0.5};
mod_wi32_5[10] = {nam:"WIline10",flag:"fy9",p1x:6.7,p1y:1.5,p1z:-2,p2x:6.2,p2y:1.5,p2z:-10,_siz:2,_sizz:0.5};
mod_wi32_5[11] = {nam:"WIline11",flag:"fy10",p1x:-6.7,p1y:1.5,p1z:-2,p2x:-9.2,p2y:1.5,p2z:-9,_siz:2,_sizz:0.5};
_global.mod_wi33_1 = new Array();
mod_wi33_1[0] = {nam:"WIline0",p1x:3,p1y:-3,p1z:-2.5,p2x:8,p2y:-3,p2z:12,_siz:4,_sizz:0.2};
mod_wi33_1[1] = {nam:"WIline1",p1x:-3,p1y:-3,p1z:-2.5,p2x:-8,p2y:-3,p2z:12,_siz:4,_sizz:0.2};
mod_wi33_1[2] = {nam:"WIline2",p1x:3,p1y:-3,p1z:-2.5,p2x:2,p2y:-3,p2z:-6,_siz:4,_sizz:0.8};
mod_wi33_1[3] = {nam:"WIline3",p1x:-3,p1y:-3,p1z:-2.5,p2x:-2,p2y:-3,p2z:-6,_siz:4,_sizz:0.8};
mod_wi33_1[4] = {nam:"WIline4",p1x:1,p1y:-3,p1z:-1.5,p2x:0,p2y:-8,p2z:-4,_siz:4,_sizz:0.1};
mod_wi33_1[5] = {nam:"WIline5",p1x:-1,p1y:-3,p1z:-1.5,p2x:0,p2y:-8,p2z:-4,_siz:4,_sizz:0.1};
_global.mod_wi33_2 = new Array();
mod_wi33_2[0] = {nam:"WIline0",p1x:3,p1y:-3,p1z:2.5,p2x:8,p2y:11,p2z:5,_siz:4,_sizz:0.2};
mod_wi33_2[1] = {nam:"WIline1",p1x:-3,p1y:-3,p1z:2.5,p2x:-8,p2y:11,p2z:5,_siz:4,_sizz:0.2};
mod_wi33_2[2] = {nam:"WIline2",p1x:3,p1y:-3,p1z:2.5,p2x:2,p2y:-6,p2z:2,_siz:4,_sizz:0.8};
mod_wi33_2[3] = {nam:"WIline3",p1x:-3,p1y:-3,p1z:2.5,p2x:-2,p2y:-6,p2z:2,_siz:4,_sizz:0.8};
mod_wi33_2[4] = {nam:"WIline4",p1x:1,p1y:-2,p1z:2,p2x:0,p2y:-6,p2z:6,_siz:4,_sizz:0.1};
mod_wi33_2[5] = {nam:"WIline5",p1x:-1,p1y:-2,p1z:2,p2x:0,p2y:-6,p2z:6,_siz:4,_sizz:0.1};
_global.mod_wi33_3 = new Array();
mod_wi33_3[0] = {nam:"WIline0",p1x:3,p1y:-3,p1z:-2.5,p2x:8,p2y:-3,p2z:12,_siz:4,_sizz:0.2};
mod_wi33_3[1] = {nam:"WIline1",p1x:-3,p1y:-3,p1z:-2.5,p2x:-8,p2y:-3,p2z:12,_siz:4,_sizz:0.2};
mod_wi33_3[2] = {nam:"WIline2",p1x:3,p1y:-3,p1z:-2.5,p2x:2,p2y:-3,p2z:-6,_siz:4,_sizz:0.8};
mod_wi33_3[3] = {nam:"WIline3",p1x:-3,p1y:-3,p1z:-2.5,p2x:-2,p2y:-3,p2z:-6,_siz:4,_sizz:0.8};
mod_wi33_3[4] = {nam:"WIline4",p1x:1,p1y:-3,p1z:-1.5,p2x:0,p2y:-8,p2z:-4,_siz:4,_sizz:0.1};
mod_wi33_3[5] = {nam:"WIline5",p1x:-1,p1y:-3,p1z:-1.5,p2x:0,p2y:-8,p2z:-4,_siz:4,_sizz:0.1};
_global.mod_wi33_4 = new Array();
mod_wi33_4[0] = {nam:"WIline0",p1x:3,p1y:-3,p1z:-2.5,p2x:8,p2y:-3,p2z:12,_siz:4,_sizz:0.2};
mod_wi33_4[1] = {nam:"WIline1",p1x:-3,p1y:-3,p1z:-2.5,p2x:-8,p2y:-3,p2z:12,_siz:4,_sizz:0.2};
mod_wi33_4[2] = {nam:"WIline2",p1x:3,p1y:-3,p1z:-2.5,p2x:2,p2y:-3,p2z:-6,_siz:4,_sizz:0.8};
mod_wi33_4[3] = {nam:"WIline3",p1x:-3,p1y:-3,p1z:-2.5,p2x:-2,p2y:-3,p2z:-6,_siz:4,_sizz:0.8};
mod_wi33_4[4] = {nam:"WIline4",p1x:1,p1y:-3,p1z:-1.5,p2x:0,p2y:-8,p2z:-4,_siz:4,_sizz:0.1};
mod_wi33_4[5] = {nam:"WIline5",p1x:-1,p1y:-3,p1z:-1.5,p2x:0,p2y:-8,p2z:-4,_siz:4,_sizz:0.1};
_global.mod_wi33_5 = new Array();
mod_wi33_5[0] = {nam:"WIline0",p1x:3,p1y:-3,p1z:-2.5,p2x:8,p2y:-3,p2z:12,_siz:4,_sizz:0.2};
mod_wi33_5[1] = {nam:"WIline1",p1x:-3,p1y:-3,p1z:-2.5,p2x:-8,p2y:-3,p2z:12,_siz:4,_sizz:0.2};
mod_wi33_5[2] = {nam:"WIline2",p1x:3,p1y:-3,p1z:-2.5,p2x:2,p2y:-3,p2z:-6,_siz:4,_sizz:0.8};
mod_wi33_5[3] = {nam:"WIline3",p1x:-3,p1y:-3,p1z:-2.5,p2x:-2,p2y:-3,p2z:-6,_siz:4,_sizz:0.8};
mod_wi33_5[4] = {nam:"WIline4",p1x:1,p1y:-3,p1z:-1.5,p2x:0,p2y:-8,p2z:-4,_siz:4,_sizz:0.1};
mod_wi33_5[5] = {nam:"WIline5",p1x:-1,p1y:-3,p1z:-1.5,p2x:0,p2y:-8,p2z:-4,_siz:4,_sizz:0.1};
_global.mod_ma1_1 = new Array();
mod_ma1_1[0] = {nam:"MAline0",p1x:0,p1y:10,p1z:0,p2x:0,p2y:-30,p2z:0,_siz:5,_sizz:1};
mod_ma1_1[1] = {nam:"MAline1",p1x:3.5,p1y:5,p1z:3.5,p2x:3.5,p2y:-10,p2z:3.5,_siz:8,_sizz:1};
mod_ma1_1[2] = {nam:"MAline2",p1x:-3.5,p1y:5,p1z:3.5,p2x:-3.5,p2y:-10,p2z:3.5,_siz:8,_sizz:1};
mod_ma1_1[3] = {nam:"MAline3",p1x:3,p1y:70,p1z:-2,p2x:3,p2y:-2,p2z:-2,_siz:1,_sizz:2};
mod_ma1_1[4] = {nam:"MAline4",p1x:10,p1y:5,p1z:2.5,p2x:10,p2y:-15,p2z:2.5,_siz:8,_sizz:1.2};
mod_ma1_1[5] = {nam:"MAline5",p1x:-10,p1y:5,p1z:2.5,p2x:-10,p2y:-15,p2z:2.5,_siz:8,_sizz:1.2};
mod_ma1_1[6] = {nam:"MAline6",p1x:3.5,p1y:0,p1z:-2.5,p2x:3.5,p2y:-45,p2z:-2.5,_siz:4,_sizz:1.5};
mod_ma1_1[7] = {nam:"MAline7",p1x:-3.5,p1y:0,p1z:-2.5,p2x:-3.5,p2y:-45,p2z:-2.5,_siz:4,_sizz:1.5};
mod_ma1_1[8] = {nam:"MAline8",p1x:3,p1y:1,p1z:-2,p2x:3,p2y:-8,p2z:-2,_siz:3,_sizz:1};
mod_ma1_1[9] = {nam:"MAline9",p1x:-3,p1y:4,p1z:-2,p2x:-3,p2y:-8,p2z:-2,_siz:6,_sizz:0.5};
mod_ma1_1[10] = {nam:"MAline10",p1x:3,p1y:-4,p1z:-2,p2x:8,p2y:3,p2z:-10,_siz:3,_sizz:0.1};
mod_ma1_1[11] = {nam:"MAline11",p1x:-3,p1y:-4,p1z:-2,p2x:-8,p2y:3,p2z:-10,_siz:3,_sizz:0.1};
_global.mod_ma1_2 = new Array();
_global.mod_ma1_2 = _global.mod_ma1_1;
_global.mod_ma2_1 = new Array();
mod_ma2_1[0] = {nam:"MAline0",p1x:0,p1y:0,p1z:0,p2x:0,p2y:-0.1,p2z:0,_siz:7.5,_sizz:1};
mod_ma2_1[1] = {nam:"MAline1",p1x:2,p1y:2,p1z:-3,p2x:2,p2y:-3,p2z:-3,_siz:1.5,_sizz:1.5};
mod_ma2_1[2] = {nam:"MAline2",p1x:-2,p1y:2,p1z:-3,p2x:-2,p2y:-3,p2z:-3,_siz:1.5,_sizz:1.5};
mod_ma2_1[3] = {nam:"MAline3",p1x:2.5,p1y:2,p1z:-3,p2x:-2.5,p2y:2,p2z:-3,_siz:2,_sizz:1};
mod_ma2_1[4] = {nam:"MAline4",p1x:0,p1y:-3,p1z:4,p2x:0,p2y:3,p2z:4,_siz:2,_sizz:1};
mod_ma2_1[5] = {nam:"MAline5",p1x:0,p1y:-5,p1z:4,p2x:0,p2y:10,p2z:4,_siz:1,_sizz:1};
mod_ma2_1[6] = {nam:"MAline6",p1x:2.5,p1y:2,p1z:-3,p2x:4.5,p2y:4,p2z:-0.5,_siz:1,_sizz:0.5};
mod_ma2_1[7] = {nam:"MAline7",p1x:-2.5,p1y:2,p1z:-3,p2x:-4.5,p2y:4,p2z:-0.5,_siz:1,_sizz:0.5};
mod_ma2_1[8] = {nam:"MAline8",p1x:4.5,p1y:4,p1z:-0.5,p2x:4.5,p2y:8,p2z:-0.5,_siz:1,_sizz:1.5};
mod_ma2_1[9] = {nam:"MAline9",p1x:-4.5,p1y:4,p1z:-0.5,p2x:-4.5,p2y:8,p2z:-0.5,_siz:1,_sizz:1.5};
mod_ma2_1[10] = {nam:"MAline10",p1x:4.5,p1y:8,p1z:0.5,p2x:4.5,p2y:12,p2z:0,_siz:1,_sizz:0.1};
mod_ma2_1[11] = {nam:"MAline11",p1x:4.5,p1y:8,p1z:-1.5,p2x:4.5,p2y:12,p2z:-1,_siz:1,_sizz:0.1};
mod_ma2_1[12] = {nam:"MAline12",p1x:-4.5,p1y:8,p1z:0.5,p2x:-4.5,p2y:12,p2z:0,_siz:1,_sizz:0.1};
mod_ma2_1[13] = {nam:"MAline13",p1x:-4.5,p1y:8,p1z:-1.5,p2x:-4.5,p2y:12,p2z:-1,_siz:1,_sizz:0.1};
_global.mod_ma2_2 = new Array();
_global.mod_ma2_2 = _global.mod_ma2_1;
_global.mod_ma3_1 = new Array();
mod_ma3_1[0] = {nam:"MAline0",p1x:0,p1y:0,p1z:0.3,p2x:0.75,p2y:-8.25,p2z:3.75,_siz:2.25,_sizz:0.1};
mod_ma3_1[1] = {nam:"MAline1",p1x:0,p1y:0,p1z:0.3,p2x:-0.75,p2y:-8.25,p2z:3.75,_siz:2.25,_sizz:0.1};
mod_ma3_1[2] = {nam:"MAline2",p1x:0,p1y:-3,p1z:-1.5,p2x:0,p2y:-6,p2z:-7.5,_siz:6,_sizz:0.1};
mod_ma3_1[3] = {nam:"MAline3",p1x:0,p1y:-4.5,p1z:-6.75,p2x:0,p2y:-9,p2z:-26,_siz:7.5,_sizz:0.5};
mod_ma3_1[4] = {nam:"MAline4",p1x:0,p1y:0,p1z:-2.25,p2x:3,p2y:-3,p2z:0,_siz:3,_sizz:1.5};
mod_ma3_1[5] = {nam:"MAline5",p1x:0,p1y:0,p1z:-2.25,p2x:-3,p2y:-3,p2z:0,_siz:3,_sizz:1.5};
mod_ma3_1[6] = {nam:"MAline6",p1x:3,p1y:-8.25,p1z:-7.5,p2x:0.3,p2y:-14.25,p2z:-16,_siz:6,_sizz:0.2};
mod_ma3_1[7] = {nam:"MAline7",p1x:-3,p1y:-8.25,p1z:-7.5,p2x:-0.3,p2y:-14.25,p2z:-16,_siz:6,_sizz:0.2};
mod_ma3_1[8] = {nam:"MAline8",p1x:2.25,p1y:-3,p1z:-3,p2x:3,p2y:-8.25,p2z:-7.5,_siz:3,_sizz:2};
mod_ma3_1[9] = {nam:"MAline9",p1x:-2.25,p1y:-3,p1z:-3,p2x:-3,p2y:-8.25,p2z:-7.5,_siz:3,_sizz:2};
mod_ma3_1[10] = {nam:"MAline10",p1x:3,p1y:-3,p1z:0.75,p2x:9.5,p2y:-3,p2z:5,_siz:3,_sizz:3};
mod_ma3_1[11] = {nam:"MAline11",p1x:-3,p1y:-3,p1z:0.75,p2x:-9.5,p2y:-3,p2z:5,_siz:3,_sizz:3};
mod_ma3_1[12] = {nam:"MAline12",p1x:9.5,p1y:-3,p1z:4,p2x:15.5,p2y:-6,p2z:-9,_siz:9,_sizz:0.1};
mod_ma3_1[13] = {nam:"MAline13",p1x:-9.5,p1y:-3,p1z:4,p2x:-15.5,p2y:-6,p2z:-9,_siz:9,_sizz:0.1};
mod_ma3_1[14] = {nam:"MAline14",p1x:4.5,p1y:-3,p1z:-0.75,p2x:4.5,p2y:2.25,p2z:-2.25,_siz:1.8,_sizz:1.2};
mod_ma3_1[15] = {nam:"MAline15",p1x:-4.5,p1y:-3,p1z:-0.75,p2x:-4.5,p2y:2.25,p2z:-2.25,_siz:1.8,_sizz:1.2};
mod_ma3_1[16] = {nam:"MAline16",p1x:2.25,p1y:-3,p1z:-6,p2x:6,p2y:-3,p2z:-18,_siz:4.5,_sizz:0.7};
mod_ma3_1[17] = {nam:"MAline17",p1x:-2.25,p1y:-3,p1z:-6,p2x:-6,p2y:-3,p2z:-18,_siz:4.5,_sizz:0.7};
mod_ma3_1[18] = {nam:"MAline18",p1x:2.25,p1y:-3,p1z:-6,p2x:6,p2y:-13.5,p2z:-19.5,_siz:1.5,_sizz:1.2};
mod_ma3_1[19] = {nam:"MAline19",p1x:-2.25,p1y:-3,p1z:-6,p2x:-6,p2y:-13.5,p2z:-19.5,_siz:1.5,_sizz:1.2};
_global.mod_ma3_2 = new Array();
mod_ma3_2[0] = {nam:"MAline0",p1x:0,p1y:0,p1z:0.3,p2x:0.75,p2y:-8.25,p2z:3.75,_siz:2.25,_sizz:0.1};
mod_ma3_2[1] = {nam:"MAline1",p1x:0,p1y:0,p1z:0.3,p2x:-0.75,p2y:-8.25,p2z:3.75,_siz:2.25,_sizz:0.1};
mod_ma3_2[2] = {nam:"MAline2",p1x:0,p1y:-3,p1z:-1.5,p2x:0,p2y:-6,p2z:-7.5,_siz:6,_sizz:0.1};
mod_ma3_2[3] = {nam:"MAline3",p1x:0,p1y:-3,p1z:-2.5,p2x:0,p2y:-12,p2z:-10.5,_siz:7.5,_sizz:0.5};
mod_ma3_2[4] = {nam:"MAline4",p1x:0,p1y:0,p1z:-2.25,p2x:3,p2y:-3,p2z:0,_siz:3,_sizz:1.5};
mod_ma3_2[5] = {nam:"MAline5",p1x:0,p1y:0,p1z:-2.25,p2x:-3,p2y:-3,p2z:0,_siz:3,_sizz:1.5};
mod_ma3_2[6] = {nam:"MAline6",p1x:3,p1y:-11.25,p1z:-4.5,p2x:0.3,p2y:-20.25,p2z:-12,_siz:6,_sizz:0.2};
mod_ma3_2[7] = {nam:"MAline7",p1x:-3,p1y:-11.25,p1z:-4.5,p2x:-0.3,p2y:-20.25,p2z:-12,_siz:6,_sizz:0.2};
mod_ma3_2[8] = {nam:"MAline8",p1x:2.25,p1y:-3,p1z:-3,p2x:3,p2y:-11.25,p2z:-4.5,_siz:3,_sizz:2};
mod_ma3_2[9] = {nam:"MAline9",p1x:-2.25,p1y:-3,p1z:-3,p2x:-3,p2y:-11.25,p2z:-4.5,_siz:3,_sizz:2};
mod_ma3_2[10] = {nam:"MAline10",p1x:3,p1y:-3,p1z:0.75,p2x:9,p2y:1.5,p2z:1.5,_siz:3,_sizz:3};
mod_ma3_2[11] = {nam:"MAline11",p1x:-3,p1y:-3,p1z:0.75,p2x:-9,p2y:1.5,p2z:1.5,_siz:3,_sizz:3};
mod_ma3_2[12] = {nam:"MAline12",p1x:9,p1y:1.5,p1z:1.5,p2x:16.5,p2y:-7.5,p2z:-6,_siz:9,_sizz:0.1};
mod_ma3_2[13] = {nam:"MAline13",p1x:-9,p1y:1.5,p1z:1.5,p2x:-16.5,p2y:-7.5,p2z:-6,_siz:9,_sizz:0.1};
mod_ma3_2[14] = {nam:"MAline14",p1x:4.5,p1y:-3,p1z:-0.75,p2x:5.25,p2y:2.25,p2z:-2.25,_siz:1.8,_sizz:1.2};
mod_ma3_2[15] = {nam:"MAline15",p1x:-4.5,p1y:-3,p1z:-0.75,p2x:-5.25,p2y:2.25,p2z:-2.25,_siz:1.8,_sizz:1.2};
mod_ma3_2[16] = {nam:"MAline16",p1x:2.25,p1y:-3,p1z:-3,p2x:6,p2y:-15,p2z:-9,_siz:4.5,_sizz:0.7};
mod_ma3_2[17] = {nam:"MAline17",p1x:-2.25,p1y:-3,p1z:-3,p2x:-6,p2y:-15,p2z:-9,_siz:4.5,_sizz:0.7};
mod_ma3_2[18] = {nam:"MAline18",p1x:2.25,p1y:-3,p1z:-3,p2x:6,p2y:-21,p2z:-9,_siz:1.5,_sizz:1.2};
mod_ma3_2[19] = {nam:"MAline19",p1x:-2.25,p1y:-3,p1z:-3,p2x:-6,p2y:-21,p2z:-9,_siz:1.5,_sizz:1.2};
_global.mod_ma4_1 = new Array();
mod_ma4_1[0] = {nam:"MAline0",p1x:0,p1y:0,p1z:0,p2x:0,p2y:-0.1,p2z:0,_siz:9.5,_sizz:1};
mod_ma4_1[1] = {nam:"MAline1",p1x:3,p1y:2,p1z:-3,p2x:3,p2y:-5,p2z:-3,_siz:2,_sizz:1.5};
mod_ma4_1[2] = {nam:"MAline2",p1x:-3,p1y:2,p1z:-3,p2x:-3,p2y:-5,p2z:-3,_siz:2,_sizz:1.5};
mod_ma4_1[3] = {nam:"MAline3",p1x:4,p1y:2,p1z:-3,p2x:-4,p2y:2,p2z:-3,_siz:2,_sizz:1};
mod_ma4_1[4] = {nam:"MAline4",p1x:0,p1y:-5,p1z:5,p2x:0,p2y:3,p2z:5,_siz:4,_sizz:1};
mod_ma4_1[5] = {nam:"MAline5",p1x:0,p1y:-7,p1z:5,p2x:0,p2y:10,p2z:5,_siz:2,_sizz:1};
mod_ma4_1[6] = {nam:"MAline6",p1x:4,p1y:2,p1z:-3,p2x:4.5,p2y:4,p2z:-0.5,_siz:1,_sizz:0.5};
mod_ma4_1[7] = {nam:"MAline7",p1x:-4,p1y:2,p1z:-3,p2x:-4.5,p2y:4,p2z:-0.5,_siz:1,_sizz:0.5};
mod_ma4_1[8] = {nam:"MAline8",p1x:4.5,p1y:4,p1z:-0.5,p2x:4.5,p2y:8,p2z:-0.5,_siz:2,_sizz:1.5};
mod_ma4_1[9] = {nam:"MAline9",p1x:-4.5,p1y:4,p1z:-0.5,p2x:-4.5,p2y:8,p2z:-0.5,_siz:2,_sizz:1.5};
mod_ma4_1[10] = {nam:"MAline10",p1x:4.5,p1y:8,p1z:0.5,p2x:4.5,p2y:12,p2z:0,_siz:1,_sizz:0.1};
mod_ma4_1[11] = {nam:"MAline11",p1x:4.5,p1y:8,p1z:-1.5,p2x:4.5,p2y:12,p2z:-1,_siz:1,_sizz:0.1};
mod_ma4_1[12] = {nam:"MAline12",p1x:-4.5,p1y:8,p1z:0.5,p2x:-4.5,p2y:12,p2z:0,_siz:1,_sizz:0.1};
mod_ma4_1[13] = {nam:"MAline13",p1x:-4.5,p1y:8,p1z:-1.5,p2x:-4.5,p2y:12,p2z:-1,_siz:1,_sizz:0.1};
mod_ma4_1[14] = {nam:"MAline14",p1x:0,p1y:0,p1z:0,p2x:5,p2y:-5,p2z:3,_siz:4,_sizz:0.01};
mod_ma4_1[15] = {nam:"MAline15",p1x:0,p1y:0,p1z:0,p2x:-5,p2y:-5,p2z:3,_siz:4,_sizz:0.01};
mod_ma4_1[16] = {nam:"MAline16",p1x:0,p1y:0,p1z:0,p2x:5,p2y:5,p2z:3,_siz:4,_sizz:0.01};
mod_ma4_1[17] = {nam:"MAline17",p1x:0,p1y:0,p1z:0,p2x:-5,p2y:5,p2z:3,_siz:4,_sizz:0.01};
_global.mod_ma4_2 = new Array();
_global.mod_ma4_2 = _global.mod_ma4_1;
_global.mod_ma5_1 = new Array();
mod_ma5_1[0] = {nam:"MAline0",p1x:0,p1y:-1,p1z:5.8,p2x:0,p2y:-1,p2z:6.5,_siz:3.25,_sizz:1};
mod_ma5_1[1] = {nam:"MAline1",p1x:1.5,p1y:-1.5,p1z:2.5,p2x:0,p2y:-2,p2z:-7.5,_siz:6,_sizz:0.3};
mod_ma5_1[2] = {nam:"MAline2",p1x:-1.5,p1y:-1.5,p1z:2.5,p2x:0,p2y:-2,p2z:-7.5,_siz:6,_sizz:0.3};
mod_ma5_1[3] = {nam:"MAline3",p1x:0,p1y:0,p1z:1.5,p2x:0,p2y:-2,p2z:-6.5,_siz:6,_sizz:0.3};
mod_ma5_1[4] = {nam:"MAline4",p1x:2,p1y:1,p1z:1.25,p2x:3,p2y:-1,p2z:3,_siz:3,_sizz:1.5};
mod_ma5_1[5] = {nam:"MAline5",p1x:-2,p1y:1,p1z:1.25,p2x:-3,p2y:-1,p2z:3,_siz:3,_sizz:1.5};
mod_ma5_1[6] = {nam:"MAline6",p1x:2,p1y:1.25,p1z:-6.5,p2x:0.3,p2y:0,p2z:0,_siz:6,_sizz:0.2};
mod_ma5_1[7] = {nam:"MAline7",p1x:-2,p1y:1.25,p1z:-6.5,p2x:-0.3,p2y:0,p2z:0,_siz:6,_sizz:0.2};
mod_ma5_1[8] = {nam:"MAline8",p1x:3.5,p1y:-1.25,p1z:-6.5,p2x:0.3,p2y:-1,p2z:0,_siz:6,_sizz:0.2};
mod_ma5_1[9] = {nam:"MAline9",p1x:-3.5,p1y:-1.25,p1z:-6.5,p2x:-0.3,p2y:-1,p2z:0,_siz:6,_sizz:0.2};
mod_ma5_1[10] = {nam:"MAline10",p1x:0,p1y:-6.25,p1z:-8.5,p2x:3.5,p2y:-1.25,p2z:-6.5,_siz:2,_sizz:3};
mod_ma5_1[11] = {nam:"MAline11",p1x:0,p1y:-6.25,p1z:-8.5,p2x:-3.5,p2y:-1.25,p2z:-6.5,_siz:2,_sizz:3};
mod_ma5_1[12] = {nam:"MAline12",p1x:0,p1y:-6.25,p1z:-8.5,p2x:0,p2y:-1,p2z:-2.5,_siz:2,_sizz:3};
mod_ma5_1[13] = {nam:"MAline13",p1x:4,p1y:-1,p1z:3.2,p2x:6.5,p2y:-1,p2z:4,_siz:4,_sizz:0.5};
mod_ma5_1[14] = {nam:"MAline14",p1x:-4,p1y:-1,p1z:3.2,p2x:-6.5,p2y:-1,p2z:4,_siz:4,_sizz:0.5};
mod_ma5_1[15] = {nam:"MAline15",p1x:5,p1y:-1,p1z:2.2,p2x:5.5,p2y:-1,p2z:-1,_siz:2,_sizz:1};
mod_ma5_1[16] = {nam:"MAline16",p1x:-5,p1y:-1,p1z:2.2,p2x:-5.5,p2y:-1,p2z:-1,_siz:2,_sizz:1};
mod_ma5_1[17] = {nam:"MAline17",p1x:6,p1y:4,p1z:-1,p2x:5.5,p2y:-1,p2z:-1,_siz:3,_sizz:1};
mod_ma5_1[18] = {nam:"MAline18",p1x:-6,p1y:4,p1z:-1,p2x:-5.5,p2y:-1,p2z:-1,_siz:3,_sizz:1};
mod_ma5_1[19] = {nam:"MAline19",p1x:0,p1y:-1,p1z:6.5,p2x:4,p2y:-1,p2z:8.5,_siz:1,_sizz:0.1};
mod_ma5_1[20] = {nam:"MAline20",p1x:0,p1y:-1,p1z:6.5,p2x:-4,p2y:-1,p2z:8.5,_siz:1,_sizz:0.1};
mod_ma5_1[21] = {nam:"MAline21",p1x:2,p1y:-1,p1z:7.5,p2x:2,p2y:-1,p2z:10,_siz:0.5,_sizz:0.1};
mod_ma5_1[22] = {nam:"MAline22",p1x:-2,p1y:-1,p1z:7.5,p2x:-2,p2y:-1,p2z:10,_siz:0.5,_sizz:0.1};
_global.mod_ma5_2 = new Array();
mod_ma5_2[0] = {nam:"MAline0",p1x:0,p1y:0,p1z:5,p2x:0,p2y:0.3,p2z:6,_siz:3.25,_sizz:1};
mod_ma5_2[1] = {nam:"MAline1",p1x:1.5,p1y:-1.5,p1z:2.5,p2x:0,p2y:-11,p2z:-2,_siz:6,_sizz:0.3};
mod_ma5_2[2] = {nam:"MAline2",p1x:-1.5,p1y:-1.5,p1z:2.5,p2x:0,p2y:-11,p2z:-2,_siz:6,_sizz:0.3};
mod_ma5_2[3] = {nam:"MAline3",p1x:0,p1y:-2,p1z:1.5,p2x:0,p2y:-11,p2z:-2,_siz:6,_sizz:0.3};
mod_ma5_2[4] = {nam:"MAline4",p1x:2,p1y:-1,p1z:1,p2x:3,p2y:-1,p2z:3,_siz:3,_sizz:1.5};
mod_ma5_2[5] = {nam:"MAline5",p1x:-2,p1y:-1,p1z:1,p2x:-3,p2y:-1,p2z:3,_siz:3,_sizz:1.5};
mod_ma5_2[6] = {nam:"MAline6",p1x:2,p1y:-9.25,p1z:-4,p2x:0.3,p2y:-3,p2z:2,_siz:6,_sizz:0.2};
mod_ma5_2[7] = {nam:"MAline7",p1x:-2,p1y:-9.25,p1z:-4,p2x:-0.3,p2y:-3,p2z:2,_siz:6,_sizz:0.2};
mod_ma5_2[8] = {nam:"MAline8",p1x:3.5,p1y:-10.25,p1z:-3,p2x:0.3,p2y:-3,p2z:3,_siz:6,_sizz:0.2};
mod_ma5_2[9] = {nam:"MAline9",p1x:-3.5,p1y:-10.25,p1z:-3,p2x:-0.3,p2y:-3,p2z:3,_siz:6,_sizz:0.2};
mod_ma5_2[10] = {nam:"MAline10",p1x:0,p1y:-13,p1z:1,p2x:3.5,p2y:-10.25,p2z:-3,_siz:2,_sizz:3};
mod_ma5_2[11] = {nam:"MAline11",p1x:0,p1y:-13,p1z:1,p2x:-3.5,p2y:-10.25,p2z:-3,_siz:2,_sizz:3};
mod_ma5_2[12] = {nam:"MAline12",p1x:0,p1y:-13,p1z:1,p2x:0,p2y:-5,p2z:0.5,_siz:2,_sizz:2.5};
mod_ma5_2[13] = {nam:"MAline13",p1x:4,p1y:-1,p1z:3.2,p2x:6.5,p2y:-1,p2z:4,_siz:4,_sizz:0.5};
mod_ma5_2[14] = {nam:"MAline14",p1x:-4,p1y:-1,p1z:3.2,p2x:-6.5,p2y:-1,p2z:4,_siz:4,_sizz:0.5};
mod_ma5_2[15] = {nam:"MAline15",p1x:5,p1y:-1,p1z:2.2,p2x:5.5,p2y:-1,p2z:-1,_siz:2,_sizz:1};
mod_ma5_2[16] = {nam:"MAline16",p1x:-5,p1y:-1,p1z:2.2,p2x:-5.5,p2y:-1,p2z:-1,_siz:2,_sizz:1};
mod_ma5_2[17] = {nam:"MAline17",p1x:6,p1y:4,p1z:-1,p2x:5.5,p2y:-1,p2z:-1,_siz:3,_sizz:1};
mod_ma5_2[18] = {nam:"MAline18",p1x:-6,p1y:4,p1z:-1,p2x:-5.5,p2y:-1,p2z:-1,_siz:3,_sizz:1};
mod_ma5_2[19] = {nam:"MAline19",p1x:0,p1y:0.3,p1z:6,p2x:4,p2y:1,p2z:8,_siz:1,_sizz:0.1};
mod_ma5_2[20] = {nam:"MAline20",p1x:0,p1y:0.3,p1z:6,p2x:-4,p2y:1,p2z:8,_siz:1,_sizz:0.1};
mod_ma5_2[21] = {nam:"MAline21",p1x:2,p1y:0.65,p1z:7,p2x:2,p2y:1.2,p2z:9,_siz:0.5,_sizz:0.1};
mod_ma5_2[22] = {nam:"MAline22",p1x:-2,p1y:0.65,p1z:7,p2x:-2,p2y:1.2,p2z:9,_siz:0.5,_sizz:0.1};
_global.mod_ma6_1 = new Array();
mod_ma6_1[0] = {nam:"MAline0",p1x:0,p1y:0,p1z:2,p2x:0,p2y:-4,p2z:2,_siz:2.25,_sizz:0.1};
mod_ma6_1[1] = {nam:"MAline1",p1x:0,p1y:0,p1z:2,p2x:0,p2y:-3,p2z:4,_siz:0.5,_sizz:1};
mod_ma6_1[2] = {nam:"MAline2",p1x:0,p1y:-7,p1z:1.5,p2x:0,p2y:-1,p2z:16.5,_siz:6,_sizz:0.2};
mod_ma6_1[3] = {nam:"MAline3",p1x:0,p1y:0,p1z:-2.25,p2x:3,p2y:-3,p2z:0,_siz:3,_sizz:1.5};
mod_ma6_1[4] = {nam:"MAline4",p1x:0,p1y:0,p1z:-2.25,p2x:-3,p2y:-3,p2z:0,_siz:3,_sizz:1.5};
mod_ma6_1[5] = {nam:"MAline5",p1x:0,p1y:-1.5,p1z:-6.75,p2x:0,p2y:1,p2z:-10,_siz:7.5,_sizz:0.5};
mod_ma6_1[6] = {nam:"MAline6",p1x:4,p1y:-10.25,p1z:-7.5,p2x:1.5,p2y:-16.25,p2z:-14,_siz:6,_sizz:0.5};
mod_ma6_1[7] = {nam:"MAline7",p1x:-4,p1y:-10.25,p1z:-7.5,p2x:-1.5,p2y:-16.25,p2z:-14,_siz:6,_sizz:0.5};
mod_ma6_1[8] = {nam:"MAline8",p1x:2.25,p1y:-3,p1z:-3,p2x:4,p2y:-10.25,p2z:-7.5,_siz:3,_sizz:2};
mod_ma6_1[9] = {nam:"MAline9",p1x:-2.25,p1y:-3,p1z:-3,p2x:-4,p2y:-10.25,p2z:-7.5,_siz:3,_sizz:2};
mod_ma6_1[10] = {nam:"MAline10",p1x:1.5,p1y:-3,p1z:-6,p2x:4,p2y:-10.25,p2z:-7.5,_siz:6,_sizz:0.8};
mod_ma6_1[11] = {nam:"MAline11",p1x:-1.5,p1y:-3,p1z:-6,p2x:-4,p2y:-10.25,p2z:-7.5,_siz:6,_sizz:0.8};
mod_ma6_1[12] = {nam:"MAline12",p1x:0,p1y:-3,p1z:-3,p2x:0,p2y:-16.25,p2z:-14,_siz:6,_sizz:0.5};
mod_ma6_1[13] = {nam:"MAline13",p1x:3.25,p1y:-3,p1z:-6,p2x:4,p2y:-2,p2z:-10,_siz:4.5,_sizz:1.4};
mod_ma6_1[14] = {nam:"MAline14",p1x:-3.25,p1y:-3,p1z:-6,p2x:-4,p2y:-2,p2z:-10,_siz:4.5,_sizz:1.4};
mod_ma6_1[15] = {nam:"MAline15",p1x:4,p1y:-3,p1z:0.75,p2x:14.5,p2y:-3,p2z:2,_siz:7,_sizz:0.3};
mod_ma6_1[16] = {nam:"MAline16",p1x:-4,p1y:-3,p1z:0.75,p2x:-14.5,p2y:-3,p2z:2,_siz:7,_sizz:0.3};
mod_ma6_1[17] = {nam:"MAline17",p1x:14,p1y:-4,p1z:1,p2x:14,p2y:-1,p2z:1,_siz:2,_sizz:1.2};
mod_ma6_1[18] = {nam:"MAline18",p1x:-14,p1y:-4,p1z:1,p2x:-14,p2y:-1,p2z:1,_siz:2,_sizz:1.2};
mod_ma6_1[19] = {nam:"MAline19",p1x:2.25,p1y:-5,p1z:-6,p2x:6,p2y:-13.5,p2z:-22.5,_siz:4,_sizz:1.2};
mod_ma6_1[20] = {nam:"MAline20",p1x:-2.25,p1y:-5,p1z:-6,p2x:-6,p2y:-13.5,p2z:-22.5,_siz:4,_sizz:1.2};
_global.mod_ma6_2 = new Array();
mod_ma6_2[0] = {nam:"MAline0",p1x:0,p1y:0,p1z:2,p2x:0,p2y:-4,p2z:2,_siz:2.25,_sizz:0.1};
mod_ma6_2[1] = {nam:"MAline1",p1x:0,p1y:0,p1z:2,p2x:0,p2y:-3,p2z:4,_siz:0.5,_sizz:1};
mod_ma6_2[2] = {nam:"MAline2",p1x:0,p1y:-6,p1z:2,p2x:0,p2y:10,p2z:4,_siz:6,_sizz:0.2};
mod_ma6_2[3] = {nam:"MAline3",p1x:0,p1y:0,p1z:-2.25,p2x:3,p2y:-3,p2z:0,_siz:3,_sizz:1.5};
mod_ma6_2[4] = {nam:"MAline4",p1x:0,p1y:0,p1z:-2.25,p2x:-3,p2y:-3,p2z:0,_siz:3,_sizz:1.5};
mod_ma6_2[5] = {nam:"MAline5",p1x:0,p1y:-1.5,p1z:-6.75,p2x:0,p2y:1,p2z:-10,_siz:7.5,_sizz:0.5};
mod_ma6_2[6] = {nam:"MAline6",p1x:4,p1y:-11.25,p1z:-4.5,p2x:1.5,p2y:-17,p2z:-10,_siz:6,_sizz:0.5};
mod_ma6_2[7] = {nam:"MAline7",p1x:-4,p1y:-11.25,p1z:-4.5,p2x:-1.5,p2y:-17,p2z:-10,_siz:6,_sizz:0.5};
mod_ma6_2[8] = {nam:"MAline8",p1x:2.25,p1y:-3,p1z:-3,p2x:4,p2y:-11.25,p2z:-4.5,_siz:3,_sizz:2};
mod_ma6_2[9] = {nam:"MAline9",p1x:-2.25,p1y:-3,p1z:-3,p2x:-4,p2y:-11.25,p2z:-4.5,_siz:3,_sizz:2};
mod_ma6_2[10] = {nam:"MAline10",p1x:1.5,p1y:-3,p1z:-6,p2x:4,p2y:-11.25,p2z:-4.5,_siz:6,_sizz:0.8};
mod_ma6_2[11] = {nam:"MAline11",p1x:-1.5,p1y:-3,p1z:-6,p2x:-4,p2y:-11.25,p2z:-4.5,_siz:6,_sizz:0.8};
mod_ma6_2[12] = {nam:"MAline12",p1x:0,p1y:-3,p1z:-3,p2x:0,p2y:-17,p2z:-10,_siz:6,_sizz:0.5};
mod_ma6_2[13] = {nam:"MAline13",p1x:3.25,p1y:-3,p1z:-6,p2x:4,p2y:-2,p2z:-10,_siz:4.5,_sizz:1.4};
mod_ma6_2[14] = {nam:"MAline14",p1x:-3.25,p1y:-3,p1z:-6,p2x:-4,p2y:-2,p2z:-10,_siz:4.5,_sizz:1.4};
mod_ma6_2[15] = {nam:"MAline15",p1x:4,p1y:-3,p1z:0.75,p2x:14.5,p2y:-3,p2z:2,_siz:7,_sizz:0.3};
mod_ma6_2[16] = {nam:"MAline16",p1x:-4,p1y:-3,p1z:0.75,p2x:-14.5,p2y:-3,p2z:2,_siz:7,_sizz:0.3};
mod_ma6_2[17] = {nam:"MAline17",p1x:14,p1y:-4,p1z:1,p2x:14,p2y:-1,p2z:1,_siz:2,_sizz:1.2};
mod_ma6_2[18] = {nam:"MAline18",p1x:-14,p1y:-4,p1z:1,p2x:-14,p2y:-1,p2z:1,_siz:2,_sizz:1.2};
mod_ma6_2[19] = {nam:"MAline19",p1x:2.25,p1y:-5,p1z:-6,p2x:6,p2y:-20,p2z:-12.5,_siz:4,_sizz:1.2};
mod_ma6_2[20] = {nam:"MAline20",p1x:-2.25,p1y:-5,p1z:-6,p2x:-6,p2y:-20,p2z:-12.5,_siz:4,_sizz:1.2};
_global.mod_ma7_1 = new Array();
mod_ma7_1[0] = {nam:"MAline0",p1x:4,p1y:0,p1z:0,p2x:-4,p2y:0,p2z:0,_siz:7,_sizz:1};
mod_ma7_1[1] = {nam:"MAline1",p1x:5,p1y:0,p1z:0,p2x:5,p2y:-4,p2z:0,_siz:1.5,_sizz:1.5};
mod_ma7_1[2] = {nam:"MAline2",p1x:-5,p1y:0,p1z:0,p2x:-5,p2y:-4,p2z:0,_siz:1.5,_sizz:1.5};
mod_ma7_1[3] = {nam:"MAline3",p1x:0,p1y:0,p1z:-1,p2x:0,p2y:4,p2z:-3,_siz:5,_sizz:0.1};
mod_ma7_1[4] = {nam:"MAline4",p1x:5,p1y:-2,p1z:4,p2x:5,p2y:2,p2z:4,_siz:2.5,_sizz:1};
mod_ma7_1[5] = {nam:"MAline5",p1x:5,p1y:-3,p1z:4,p2x:5,p2y:8,p2z:4,_siz:1,_sizz:1};
mod_ma7_1[6] = {nam:"MAline6",p1x:5,p1y:1,p1z:-3,p2x:5.5,p2y:4,p2z:-3.5,_siz:1,_sizz:1};
mod_ma7_1[7] = {nam:"MAline7",p1x:-5,p1y:1,p1z:-3,p2x:-5.5,p2y:4,p2z:-3.5,_siz:1,_sizz:1};
mod_ma7_1[8] = {nam:"MAline8",p1x:5.5,p1y:4,p1z:-3.5,p2x:5.5,p2y:6,p2z:-3.5,_siz:1.5,_sizz:1};
mod_ma7_1[9] = {nam:"MAline9",p1x:-5.5,p1y:4,p1z:-3.5,p2x:-5.5,p2y:6,p2z:-3.5,_siz:1.5,_sizz:1};
mod_ma7_1[10] = {nam:"MAline10",p1x:5.5,p1y:6,p1z:-2.5,p2x:5.5,p2y:8,p2z:-3,_siz:1,_sizz:0.2};
mod_ma7_1[11] = {nam:"MAline11",p1x:5.5,p1y:6,p1z:-4.5,p2x:5.5,p2y:8,p2z:-4,_siz:1,_sizz:0.2};
mod_ma7_1[12] = {nam:"MAline12",p1x:-5.5,p1y:6,p1z:-2.5,p2x:-5.5,p2y:8,p2z:-3,_siz:1,_sizz:0.2};
mod_ma7_1[13] = {nam:"MAline13",p1x:-5.5,p1y:6,p1z:-4.5,p2x:-5.5,p2y:8,p2z:-4,_siz:1,_sizz:0.2};
mod_ma7_1[14] = {nam:"MAline14",p1x:0,p1y:0,p1z:0,p2x:0,p2y:0,p2z:4.5,_siz:2,_sizz:1};
mod_ma7_1[15] = {nam:"MAline15",p1x:-1,p1y:1,p1z:4,p2x:-1,p2y:-1,p2z:4,_siz:3,_sizz:0.9};
mod_ma7_1[16] = {nam:"MAline16",p1x:-6,p1y:-4,p1z:2,p2x:-6,p2y:5,p2z:2,_siz:1,_sizz:1};
mod_ma7_1[17] = {nam:"MAline17",p1x:-6,p1y:-2,p1z:1,p2x:-6,p2y:7,p2z:1,_siz:0.8,_sizz:1};
_global.mod_ma7_2 = new Array();
_global.mod_ma7_2 = _global.mod_ma7_1;
_global.mod_ma8_1 = new Array();
mod_ma8_1[0] = {nam:"MAline0",p1x:0,p1y:5,p1z:0,p2x:0,p2y:45,p2z:-3,_siz:20,_sizz:0.8};
mod_ma8_1[1] = {nam:"MAline1",p1x:10,p1y:0,p1z:-5,p2x:10,p2y:40,p2z:-5,_siz:20,_sizz:0.8};
mod_ma8_1[2] = {nam:"MAline2",p1x:-10,p1y:0,p1z:-5,p2x:-10,p2y:40,p2z:-5,_siz:20,_sizz:0.8};
mod_ma8_1[3] = {nam:"MAline3",p1x:10,p1y:40,p1z:-5,p2x:0,p2y:60,p2z:-5,_siz:16,_sizz:0.5};
mod_ma8_1[4] = {nam:"MAline4",p1x:-10,p1y:40,p1z:-5,p2x:0,p2y:60,p2z:-5,_siz:16,_sizz:0.5};
mod_ma8_1[5] = {nam:"MAline5",p1x:0,p1y:5,p1z:0,p2x:0,p2y:-25,p2z:15,_siz:15,_sizz:0.8};
mod_ma8_1[6] = {nam:"MAline6",p1x:0,p1y:-25,p1z:15,p2x:0,p2y:-40,p2z:15,_siz:15,_sizz:1};
mod_ma8_1[7] = {nam:"MAline7",p1x:0,p1y:-38,p1z:15,p2x:0,p2y:-38,p2z:20,_siz:10,_sizz:1};
mod_ma8_1[8] = {nam:"MAline8",p1x:5,p1y:-38,p1z:13,p2x:20,p2y:-40,p2z:-5,_siz:8,_sizz:1};
mod_ma8_1[9] = {nam:"MAline9",p1x:-5,p1y:-38,p1z:13,p2x:-20,p2y:-40,p2z:-5,_siz:8,_sizz:1};
mod_ma8_1[10] = {nam:"MAline10",p1x:20,p1y:-30,p1z:-5,p2x:20,p2y:-50,p2z:-5,_siz:15,_sizz:1};
mod_ma8_1[11] = {nam:"MAline11",p1x:25,p1y:-30,p1z:-8,p2x:25,p2y:-50,p2z:-8,_siz:15,_sizz:1};
mod_ma8_1[12] = {nam:"MAline12",p1x:15,p1y:-30,p1z:-8,p2x:15,p2y:-50,p2z:-8,_siz:15,_sizz:1};
mod_ma8_1[13] = {nam:"MAline13",p1x:-20,p1y:-30,p1z:-5,p2x:-20,p2y:-50,p2z:-5,_siz:15,_sizz:1};
mod_ma8_1[14] = {nam:"MAline14",p1x:-25,p1y:-30,p1z:-8,p2x:-25,p2y:-50,p2z:-8,_siz:15,_sizz:1};
mod_ma8_1[15] = {nam:"MAline15",p1x:-15,p1y:-30,p1z:-8,p2x:-15,p2y:-50,p2z:-8,_siz:15,_sizz:1};
mod_ma8_1[16] = {nam:"MAline16",p1x:3,p1y:-10,p1z:10,p2x:3,p2y:10,p2z:12,_siz:2,_sizz:1};
mod_ma8_1[17] = {nam:"MAline17",p1x:-3,p1y:-10,p1z:10,p2x:-3,p2y:10,p2z:12,_siz:2,_sizz:1};
_global.mod_ma8_2 = new Array();
_global.mod_ma8_2 = _global.mod_ma8_1;
_global.mod_ma9_1 = new Array();
mod_ma9_1[0] = {nam:"MAline0",p1x:0,p1y:0,p1z:2,p2x:0,p2y:4,p2z:1,_siz:2,_sizz:0.1};
mod_ma9_1[1] = {nam:"MAline1",p1x:1.5,p1y:0,p1z:-1,p2x:0.5,p2y:8,p2z:0,_siz:2,_sizz:0.2};
mod_ma9_1[2] = {nam:"MAline2",p1x:-1.5,p1y:0,p1z:-1,p2x:-0.5,p2y:8,p2z:0,_siz:2,_sizz:0.2};
mod_ma9_1[3] = {nam:"MAline3",p1x:0,p1y:0,p1z:0,p2x:0,p2y:10,p2z:0,_siz:3,_sizz:0.3};
mod_ma9_1[4] = {nam:"MAline4",p1x:0,p1y:3,p1z:0,p2x:3,p2y:0,p2z:0,_siz:2,_sizz:1};
mod_ma9_1[5] = {nam:"MAline5",p1x:0,p1y:3,p1z:0,p2x:-3,p2y:0,p2z:0,_siz:2,_sizz:1};
mod_ma9_1[6] = {nam:"MAline6",p1x:2,p1y:-2,p1z:1.5,p2x:2,p2y:-7,p2z:1.5,_siz:2,_sizz:2};
mod_ma9_1[7] = {nam:"MAline7",p1x:-2,p1y:-2,p1z:1.5,p2x:-2,p2y:-7,p2z:1.5,_siz:2,_sizz:2};
mod_ma9_1[8] = {nam:"MAline8",p1x:2,p1y:-7,p1z:1.5,p2x:2,p2y:-9,p2z:1.5,_siz:4,_sizz:0.75};
mod_ma9_1[9] = {nam:"MAline9",p1x:-2,p1y:-7,p1z:1.5,p2x:-2,p2y:-9,p2z:1.5,_siz:4,_sizz:0.75};
mod_ma9_1[10] = {nam:"MAline10",p1x:1,p1y:2,p1z:-1,p2x:1,p2y:-4,p2z:-1,_siz:1.5,_sizz:1.2};
mod_ma9_1[11] = {nam:"MAline11",p1x:-1,p1y:2,p1z:-1,p2x:-1,p2y:-4,p2z:-1,_siz:1.5,_sizz:1.2};
mod_ma9_1[12] = {nam:"MAline12",p1x:0,p1y:0,p1z:2,p2x:0,p2y:-9,p2z:5,_siz:2.5,_sizz:0.2};
mod_ma9_1[13] = {nam:"MAline13",p1x:2,p1y:0,p1z:0,p2x:4,p2y:-4,p2z:0,_siz:2,_sizz:1};
mod_ma9_1[14] = {nam:"MAline14",p1x:-2,p1y:0,p1z:0,p2x:-4,p2y:-4,p2z:0,_siz:2,_sizz:1};
mod_ma9_1[15] = {nam:"MAline15",p1x:0,p1y:-2,p1z:0,p2x:8,p2y:-6,p2z:0,_siz:3,_sizz:0.01};
mod_ma9_1[16] = {nam:"MAline16",p1x:0,p1y:-2,p1z:0,p2x:-8,p2y:-6,p2z:0,_siz:3,_sizz:0.01};
mod_ma9_1[17] = {nam:"MAline17",p1x:2,p1y:-2,p1z:-1.5,p2x:2,p2y:8,p2z:-1.5,_siz:2,_sizz:0.5};
_global.mod_ma9_2 = new Array();
_global.mod_ma9_2 = _global.mod_ma9_1;
_global.mod_ma10_1 = new Array();
mod_ma10_1[0] = {nam:"MAline0",p1x:0,p1y:-40,p1z:0,p2x:7.5,p2y:100,p2z:-5,_siz:25,_sizz:0.1};
mod_ma10_1[1] = {nam:"MAline1",p1x:0,p1y:-40,p1z:0,p2x:-7.5,p2y:100,p2z:-5,_siz:25,_sizz:0.1};
mod_ma10_1[2] = {nam:"MAline2",p1x:0,p1y:0,p1z:0,p2x:0,p2y:75,p2z:-2.5,_siz:10,_sizz:1};
mod_ma10_1[3] = {nam:"MAline3",p1x:0,p1y:0,p1z:5,p2x:0,p2y:50,p2z:2.5,_siz:7.5,_sizz:1};
mod_ma10_1[4] = {nam:"MAline4",p1x:2.5,p1y:75,p1z:-3,p2x:2.5,p2y:85,p2z:-3,_siz:7.5,_sizz:1};
mod_ma10_1[5] = {nam:"MAline5",p1x:-2.5,p1y:75,p1z:-3,p2x:-2.5,p2y:85,p2z:-3,_siz:7.5,_sizz:1};
mod_ma10_1[6] = {nam:"MAline6",p1x:10,p1y:10,p1z:5,p2x:7.5,p2y:-50,p2z:5,_siz:10,_sizz:1};
mod_ma10_1[7] = {nam:"MAline7",p1x:-10,p1y:10,p1z:5,p2x:-7.5,p2y:-50,p2z:5,_siz:10,_sizz:1};
mod_ma10_1[8] = {nam:"MAline8",p1x:10,p1y:10,p1z:-5,p2x:7.5,p2y:-50,p2z:-5,_siz:10,_sizz:1};
mod_ma10_1[9] = {nam:"MAline9",p1x:-10,p1y:10,p1z:-5,p2x:-7.5,p2y:-50,p2z:-5,_siz:10,_sizz:1};
mod_ma10_1[10] = {nam:"MAline10",p1x:0,p1y:5,p1z:15,p2x:0,p2y:-5,p2z:15,_siz:10,_sizz:1};
mod_ma10_1[11] = {nam:"MAline11",p1x:0,p1y:2.5,p1z:10,p2x:0,p2y:-2.5,p2z:10,_siz:7.5,_sizz:1};
mod_ma10_1[12] = {nam:"MAline12",p1x:15,p1y:5,p1z:0,p2x:15,p2y:-5,p2z:0,_siz:10,_sizz:1};
mod_ma10_1[13] = {nam:"MAline13",p1x:-15,p1y:5,p1z:0,p2x:-15,p2y:-5,p2z:0,_siz:10,_sizz:1};
mod_ma10_1[14] = {nam:"MAline14",p1x:7.5,p1y:100,p1z:-5,p2x:-7.5,p2y:100,p2z:-5,_siz:2.5,_sizz:1};
mod_ma10_1[15] = {nam:"MAline15",p1x:2.5,p1y:85,p1z:-2,p2x:2.5,p2y:100,p2z:-2,_siz:1,_sizz:1};
mod_ma10_1[16] = {nam:"MAline16",p1x:-2.5,p1y:85,p1z:-2,p2x:-2.5,p2y:100,p2z:-2,_siz:1,_sizz:1};
mod_ma10_1[17] = {nam:"MAline17",p1x:2.5,p1y:50,p1z:5,p2x:2.5,p2y:65,p2z:5,_siz:1,_sizz:1};
mod_ma10_1[18] = {nam:"MAline18",p1x:-2.5,p1y:50,p1z:5,p2x:-2.5,p2y:65,p2z:5,_siz:1,_sizz:1};
_global.mod_ma10_2 = new Array();
_global.mod_ma10_2 = _global.mod_ma10_1;
_global.mod_ma11_1 = new Array();
mod_ma11_1[0] = {nam:"MAline0",p1x:0,p1y:-40,p1z:-5,p2x:0,p2y:20,p2z:-5,_siz:25,_sizz:1};
mod_ma11_1[1] = {nam:"MAline1",p1x:0,p1y:-40,p1z:5,p2x:0,p2y:30,p2z:5,_siz:25,_sizz:1};
mod_ma11_1[2] = {nam:"MAline2",p1x:20,p1y:5,p1z:0,p2x:0,p2y:5,p2z:0,_siz:30,_sizz:0.1};
mod_ma11_1[3] = {nam:"MAline3",p1x:-20,p1y:5,p1z:0,p2x:0,p2y:5,p2z:0,_siz:30,_sizz:0.11};
mod_ma11_1[4] = {nam:"MAline4",p1x:20,p1y:70,p1z:-10,p2x:20,p2y:30,p2z:-10,_siz:25,_sizz:1};
mod_ma11_1[5] = {nam:"MAline5",p1x:-20,p1y:70,p1z:-10,p2x:-20,p2y:30,p2z:-10,_siz:25,_sizz:1};
mod_ma11_1[6] = {nam:"MAline6",p1x:20,p1y:-65,p1z:-10,p2x:20,p2y:-30,p2z:-10,_siz:25,_sizz:1};
mod_ma11_1[7] = {nam:"MAline7",p1x:-20,p1y:-65,p1z:-10,p2x:-20,p2y:-30,p2z:-10,_siz:25,_sizz:1};
mod_ma11_1[8] = {nam:"MAline8",p1x:0,p1y:0,p1z:10,p2x:0,p2y:-5,p2z:25,_siz:15,_sizz:1};
mod_ma11_1[9] = {nam:"MAline9",p1x:3,p1y:12,p1z:28,p2x:3,p2y:-12,p2z:30,_siz:10,_sizz:1.5};
mod_ma11_1[10] = {nam:"MAline10",p1x:-3,p1y:12,p1z:28,p2x:-3,p2y:-12,p2z:30,_siz:10,_sizz:1.5};
mod_ma11_1[11] = {nam:"MAline11",p1x:0,p1y:-5,p1z:28,p2x:20,p2y:-5,p2z:28,_siz:10,_sizz:0.1};
mod_ma11_1[12] = {nam:"MAline12",p1x:0,p1y:-5,p1z:28,p2x:-20,p2y:-5,p2z:28,_siz:10,_sizz:0.1};
mod_ma11_1[13] = {nam:"MAline13",p1x:10,p1y:-30,p1z:15,p2x:50,p2y:-35,p2z:20,_siz:10,_sizz:0.1};
mod_ma11_1[14] = {nam:"MAline14",p1x:-10,p1y:-30,p1z:15,p2x:-50,p2y:-35,p2z:20,_siz:10,_sizz:0.1};
_global.mod_ma11_2 = new Array();
_global.mod_ma11_2 = _global.mod_ma11_1;
_global.mod_ma12_1 = new Array();
mod_ma12_1[0] = {nam:"MAline0",p1x:0,p1y:0,p1z:-0.2,p2x:0,p2y:0,p2z:0.5,_siz:3.25,_sizz:1};
mod_ma12_1[1] = {nam:"MAline1",p1x:0,p1y:0,p1z:0.5,p2x:4,p2y:0,p2z:2.5,_siz:1,_sizz:0.1};
mod_ma12_1[2] = {nam:"MAline2",p1x:0,p1y:0,p1z:0.5,p2x:-4,p2y:0,p2z:2.5,_siz:1,_sizz:0.1};
mod_ma12_1[3] = {nam:"MAline3",p1x:2,p1y:0,p1z:1.5,p2x:2,p2y:0,p2z:4,_siz:0.5,_sizz:0.1};
mod_ma12_1[4] = {nam:"MAline4",p1x:-2,p1y:0,p1z:1.5,p2x:-2,p2y:0,p2z:4,_siz:0.5,_sizz:0.1};
_global.mod_ma12_2 = new Array();
mod_ma12_2[0] = {nam:"MAline0",p1x:0,p1y:0,p1z:-1,p2x:0,p2y:0.3,p2z:0,_siz:3.25,_sizz:1};
mod_ma12_2[1] = {nam:"MAline1",p1x:0,p1y:0.3,p1z:0,p2x:4,p2y:1,p2z:2,_siz:1,_sizz:0.1};
mod_ma12_2[2] = {nam:"MAline2",p1x:0,p1y:0.3,p1z:0,p2x:-4,p2y:1,p2z:2,_siz:1,_sizz:0.1};
mod_ma12_2[3] = {nam:"MAline3",p1x:2,p1y:0.65,p1z:1,p2x:2,p2y:1.2,p2z:3,_siz:0.5,_sizz:0.1};
mod_ma12_2[4] = {nam:"MAline4",p1x:-2,p1y:0.65,p1z:1,p2x:-2,p2y:1.2,p2z:3,_siz:0.5,_sizz:0.1};
_global.mod_ma13_1 = new Array();
mod_ma13_1[0] = {nam:"MAline0",p1x:0,p1y:0,p1z:1.5,p2x:0,p2y:-2,p2z:-6.5,_siz:1,_sizz:1};
mod_ma13_1[1] = {nam:"MAline1",p1x:1.5,p1y:-1.5,p1z:2.5,p2x:0,p2y:-2,p2z:-7.5,_siz:6,_sizz:0.3};
mod_ma13_1[2] = {nam:"MAline2",p1x:-1.5,p1y:-1.5,p1z:2.5,p2x:0,p2y:-2,p2z:-7.5,_siz:6,_sizz:0.3};
mod_ma13_1[3] = {nam:"MAline3",p1x:0,p1y:0,p1z:1.5,p2x:0,p2y:-2,p2z:-6.5,_siz:6,_sizz:0.3};
mod_ma13_1[4] = {nam:"MAline4",p1x:2,p1y:1,p1z:1.25,p2x:3,p2y:-1,p2z:3,_siz:3,_sizz:1.5};
mod_ma13_1[5] = {nam:"MAline5",p1x:-2,p1y:1,p1z:1.25,p2x:-3,p2y:-1,p2z:3,_siz:3,_sizz:1.5};
mod_ma13_1[6] = {nam:"MAline6",p1x:2,p1y:1.25,p1z:-6.5,p2x:0.3,p2y:0,p2z:0,_siz:6,_sizz:0.2};
mod_ma13_1[7] = {nam:"MAline7",p1x:-2,p1y:1.25,p1z:-6.5,p2x:-0.3,p2y:0,p2z:0,_siz:6,_sizz:0.2};
mod_ma13_1[8] = {nam:"MAline8",p1x:3.5,p1y:-1.25,p1z:-6.5,p2x:0.3,p2y:-1,p2z:0,_siz:6,_sizz:0.2};
mod_ma13_1[9] = {nam:"MAline9",p1x:-3.5,p1y:-1.25,p1z:-6.5,p2x:-0.3,p2y:-1,p2z:0,_siz:6,_sizz:0.2};
mod_ma13_1[10] = {nam:"MAline10",p1x:0,p1y:-6.25,p1z:-8.5,p2x:3.5,p2y:-1.25,p2z:-6.5,_siz:2,_sizz:3};
mod_ma13_1[11] = {nam:"MAline11",p1x:0,p1y:-6.25,p1z:-8.5,p2x:-3.5,p2y:-1.25,p2z:-6.5,_siz:2,_sizz:3};
mod_ma13_1[12] = {nam:"MAline12",p1x:0,p1y:-6.25,p1z:-8.5,p2x:0,p2y:-1,p2z:-2.5,_siz:2,_sizz:3};
mod_ma13_1[13] = {nam:"MAline13",p1x:4,p1y:-1,p1z:3.2,p2x:6.5,p2y:-1,p2z:4,_siz:4,_sizz:0.5};
mod_ma13_1[14] = {nam:"MAline14",p1x:-4,p1y:-1,p1z:3.2,p2x:-6.5,p2y:-1,p2z:4,_siz:4,_sizz:0.5};
mod_ma13_1[15] = {nam:"MAline15",p1x:5,p1y:-1,p1z:2.2,p2x:5.5,p2y:-1,p2z:-1,_siz:2,_sizz:1};
mod_ma13_1[16] = {nam:"MAline16",p1x:-5,p1y:-1,p1z:2.2,p2x:-5.5,p2y:-1,p2z:-1,_siz:2,_sizz:1};
mod_ma13_1[17] = {nam:"MAline17",p1x:6,p1y:4,p1z:-1,p2x:5.5,p2y:-1,p2z:-1,_siz:3,_sizz:1};
mod_ma13_1[18] = {nam:"MAline18",p1x:-6,p1y:4,p1z:-1,p2x:-5.5,p2y:-1,p2z:-1,_siz:3,_sizz:1};
_global.mod_ma13_2 = new Array();
mod_ma13_2[0] = {nam:"MAline0",p1x:0,p1y:-2,p1z:1.5,p2x:0,p2y:-11,p2z:-2,_siz:1,_sizz:1};
mod_ma13_2[1] = {nam:"MAline1",p1x:1.5,p1y:-1.5,p1z:2.5,p2x:0,p2y:-11,p2z:-2,_siz:6,_sizz:0.3};
mod_ma13_2[2] = {nam:"MAline2",p1x:-1.5,p1y:-1.5,p1z:2.5,p2x:0,p2y:-11,p2z:-2,_siz:6,_sizz:0.3};
mod_ma13_2[3] = {nam:"MAline3",p1x:0,p1y:-2,p1z:1.5,p2x:0,p2y:-11,p2z:-2,_siz:6,_sizz:0.3};
mod_ma13_2[4] = {nam:"MAline4",p1x:2,p1y:-1,p1z:1,p2x:3,p2y:-1,p2z:3,_siz:3,_sizz:1.5};
mod_ma13_2[5] = {nam:"MAline5",p1x:-2,p1y:-1,p1z:1,p2x:-3,p2y:-1,p2z:3,_siz:3,_sizz:1.5};
mod_ma13_2[6] = {nam:"MAline6",p1x:2,p1y:-9.25,p1z:-4,p2x:0.3,p2y:-3,p2z:2,_siz:6,_sizz:0.2};
mod_ma13_2[7] = {nam:"MAline7",p1x:-2,p1y:-9.25,p1z:-4,p2x:-0.3,p2y:-3,p2z:2,_siz:6,_sizz:0.2};
mod_ma13_2[8] = {nam:"MAline8",p1x:3.5,p1y:-10.25,p1z:-3,p2x:0.3,p2y:-3,p2z:3,_siz:6,_sizz:0.2};
mod_ma13_2[9] = {nam:"MAline9",p1x:-3.5,p1y:-10.25,p1z:-3,p2x:-0.3,p2y:-3,p2z:3,_siz:6,_sizz:0.2};
mod_ma13_2[10] = {nam:"MAline10",p1x:0,p1y:-13,p1z:1,p2x:3.5,p2y:-10.25,p2z:-3,_siz:2,_sizz:3};
mod_ma13_2[11] = {nam:"MAline11",p1x:0,p1y:-13,p1z:1,p2x:-3.5,p2y:-10.25,p2z:-3,_siz:2,_sizz:3};
mod_ma13_2[12] = {nam:"MAline12",p1x:0,p1y:-13,p1z:1,p2x:0,p2y:-5,p2z:0.5,_siz:2,_sizz:2.5};
mod_ma13_2[13] = {nam:"MAline13",p1x:4,p1y:-1,p1z:3.2,p2x:6.5,p2y:-1,p2z:4,_siz:4,_sizz:0.5};
mod_ma13_2[14] = {nam:"MAline14",p1x:-4,p1y:-1,p1z:3.2,p2x:-6.5,p2y:-1,p2z:4,_siz:4,_sizz:0.5};
mod_ma13_2[15] = {nam:"MAline15",p1x:5,p1y:-1,p1z:2.2,p2x:5.5,p2y:-1,p2z:-1,_siz:2,_sizz:1};
mod_ma13_2[16] = {nam:"MAline16",p1x:-5,p1y:-1,p1z:2.2,p2x:-5.5,p2y:-1,p2z:-1,_siz:2,_sizz:1};
mod_ma13_2[17] = {nam:"MAline17",p1x:6,p1y:4,p1z:-1,p2x:5.5,p2y:-1,p2z:-1,_siz:3,_sizz:1};
mod_ma13_2[18] = {nam:"MAline18",p1x:-6,p1y:4,p1z:-1,p2x:-5.5,p2y:-1,p2z:-1,_siz:3,_sizz:1};
_global.mod_ma14_1 = new Array();
mod_ma14_1[0] = {nam:"MAline0",p1x:0,p1y:-3,p1z:2,p2x:0,p2y:4,p2z:1,_siz:3,_sizz:0.2};
mod_ma14_1[1] = {nam:"MAline1",p1x:1.5,p1y:0,p1z:-1,p2x:0.5,p2y:8,p2z:0,_siz:2,_sizz:0.2};
mod_ma14_1[2] = {nam:"MAline2",p1x:-1.5,p1y:0,p1z:-1,p2x:-0.5,p2y:8,p2z:0,_siz:2,_sizz:0.2};
mod_ma14_1[3] = {nam:"MAline3",p1x:0,p1y:0,p1z:0,p2x:0,p2y:10,p2z:0,_siz:3,_sizz:0.3};
mod_ma14_1[4] = {nam:"MAline4",p1x:0,p1y:3,p1z:0,p2x:3,p2y:0,p2z:0,_siz:2,_sizz:1};
mod_ma14_1[5] = {nam:"MAline5",p1x:0,p1y:3,p1z:0,p2x:-3,p2y:0,p2z:0,_siz:2,_sizz:1};
mod_ma14_1[6] = {nam:"MAline6",p1x:2,p1y:-4,p1z:1.5,p2x:2,p2y:-11,p2z:1.5,_siz:3,_sizz:1.5};
mod_ma14_1[7] = {nam:"MAline7",p1x:-2,p1y:-4,p1z:1.5,p2x:-2,p2y:-11,p2z:1.5,_siz:3,_sizz:1.5};
mod_ma14_1[8] = {nam:"MAline8",p1x:2,p1y:-11,p1z:-1.5,p2x:2,p2y:-5,p2z:-1,_siz:3,_sizz:1.2};
mod_ma14_1[9] = {nam:"MAline9",p1x:-2,p1y:-11,p1z:-1.5,p2x:-2,p2y:-5,p2z:-1,_siz:3,_sizz:1.2};
mod_ma14_1[10] = {nam:"MAline10",p1x:1,p1y:2,p1z:-1,p2x:1,p2y:-4,p2z:-1,_siz:1.5,_sizz:1.2};
mod_ma14_1[11] = {nam:"MAline11",p1x:-1,p1y:2,p1z:-1,p2x:-1,p2y:-4,p2z:-1,_siz:1.5,_sizz:1.2};
mod_ma14_1[12] = {nam:"MAline12",p1x:-2,p1y:0,p1z:0,p2x:-2,p2y:-2,p2z:4,_siz:2.5,_sizz:0.1};
mod_ma14_1[13] = {nam:"MAline13",p1x:2,p1y:0,p1z:0,p2x:2,p2y:-2,p2z:4,_siz:2.5,_sizz:0.1};
mod_ma14_1[14] = {nam:"MAline14",p1x:2,p1y:0,p1z:0,p2x:4,p2y:-4,p2z:0,_siz:2,_sizz:1};
mod_ma14_1[15] = {nam:"MAline15",p1x:-2,p1y:0,p1z:0,p2x:-4,p2y:-4,p2z:0,_siz:2,_sizz:1};
mod_ma14_1[16] = {nam:"MAline16",p1x:0,p1y:-2,p1z:0,p2x:8,p2y:-6,p2z:0,_siz:3,_sizz:0.01};
mod_ma14_1[17] = {nam:"MAline17",p1x:0,p1y:-2,p1z:0,p2x:-8,p2y:-6,p2z:0,_siz:3,_sizz:0.01};
_global.mod_ma14_2 = new Array();
_global.mod_ma14_2 = _global.mod_ma14_1;
_global.mod_ma15_1 = new Array();
mod_ma15_1[0] = {nam:"MAline0",p1x:0,p1y:-1,p1z:0,p2x:0,p2y:4,p2z:1,_siz:3,_sizz:0.2};
mod_ma15_1[1] = {nam:"MAline1",p1x:1.5,p1y:0,p1z:-1,p2x:0.5,p2y:8,p2z:0,_siz:2,_sizz:0.2};
mod_ma15_1[2] = {nam:"MAline2",p1x:-1.5,p1y:0,p1z:-1,p2x:-0.5,p2y:8,p2z:0,_siz:2,_sizz:0.2};
mod_ma15_1[3] = {nam:"MAline3",p1x:0,p1y:0,p1z:0,p2x:0,p2y:14,p2z:0,_siz:3,_sizz:0.3};
mod_ma15_1[4] = {nam:"MAline4",p1x:0,p1y:3,p1z:0,p2x:3,p2y:0,p2z:0,_siz:2,_sizz:1};
mod_ma15_1[5] = {nam:"MAline5",p1x:0,p1y:3,p1z:0,p2x:-3,p2y:0,p2z:0,_siz:2,_sizz:1};
mod_ma15_1[6] = {nam:"MAline6",p1x:2,p1y:-2,p1z:2,p2x:2,p2y:-6,p2z:2.5,_siz:4,_sizz:1};
mod_ma15_1[7] = {nam:"MAline7",p1x:-2,p1y:-2,p1z:2,p2x:-2,p2y:-6,p2z:2.5,_siz:4,_sizz:1};
mod_ma15_1[8] = {nam:"MAline8",p1x:2,p1y:-11,p1z:-1,p2x:2,p2y:-5,p2z:-1,_siz:3,_sizz:1.2};
mod_ma15_1[9] = {nam:"MAline9",p1x:-2,p1y:-11,p1z:-1,p2x:-2,p2y:-5,p2z:-1,_siz:3,_sizz:1.2};
mod_ma15_1[10] = {nam:"MAline10",p1x:3.5,p1y:-3,p1z:3,p2x:4,p2y:2,p2z:4,_siz:0.8,_sizz:1};
mod_ma15_1[11] = {nam:"MAline11",p1x:-3.5,p1y:-3,p1z:3,p2x:-4,p2y:2,p2z:4,_siz:0.8,_sizz:1};
mod_ma15_1[12] = {nam:"MAline12",p1x:3.5,p1y:-3,p1z:2,p2x:4,p2y:2.5,p2z:2,_siz:0.8,_sizz:1};
mod_ma15_1[13] = {nam:"MAline13",p1x:-3.5,p1y:-3,p1z:2,p2x:-4,p2y:2.5,p2z:2,_siz:0.8,_sizz:1};
mod_ma15_1[14] = {nam:"MAline14",p1x:2,p1y:0,p1z:0,p2x:4,p2y:-4,p2z:0,_siz:2,_sizz:1};
mod_ma15_1[15] = {nam:"MAline15",p1x:-2,p1y:0,p1z:0,p2x:-4,p2y:-4,p2z:0,_siz:2,_sizz:1};
mod_ma15_1[16] = {nam:"MAline16",p1x:0,p1y:-8,p1z:0,p2x:8,p2y:-5,p2z:0,_siz:3,_sizz:0.01};
mod_ma15_1[17] = {nam:"MAline17",p1x:0,p1y:-8,p1z:0,p2x:-8,p2y:-5,p2z:0,_siz:3,_sizz:0.01};
mod_ma15_1[18] = {nam:"MAline18",p1x:-3,p1y:0,p1z:0,p2x:-3,p2y:10,p2z:0,_siz:4,_sizz:0.5};
mod_ma15_1[19] = {nam:"MAline19",p1x:3,p1y:0,p1z:0,p2x:3,p2y:10,p2z:0,_siz:4,_sizz:0.5};
_global.mod_ma15_2 = new Array();
_global.mod_ma15_2 = _global.mod_ma15_1;
_global.mod_ma16_1 = new Array();
mod_ma16_1[0] = {nam:"MAline0",p1x:0,p1y:0.5,p1z:1,p2x:0,p2y:4,p2z:2,_siz:2,_sizz:0.1};
mod_ma16_1[1] = {nam:"MAline1",p1x:0,p1y:0,p1z:1,p2x:0,p2y:-4,p2z:0,_siz:3,_sizz:0.05};
mod_ma16_1[2] = {nam:"MAline2",p1x:1,p1y:0,p1z:0.5,p2x:-1,p2y:0,p2z:0.5,_siz:3,_sizz:1};
mod_ma16_1[3] = {nam:"MAline3",p1x:1,p1y:-1,p1z:1,p2x:8,p2y:0,p2z:2,_siz:2.5,_sizz:0.05};
mod_ma16_1[4] = {nam:"MAline4",p1x:-1,p1y:-1,p1z:1,p2x:-8,p2y:0,p2z:2,_siz:2.5,_sizz:0.05};
mod_ma16_1[5] = {nam:"MAline5",p1x:1,p1y:-3.5,p1z:0.5,p2x:8,p2y:0,p2z:2,_siz:2.5,_sizz:0.05};
mod_ma16_1[6] = {nam:"MAline6",p1x:-1,p1y:-3.5,p1z:0.5,p2x:-8,p2y:0,p2z:2,_siz:2.5,_sizz:0.05};
mod_ma16_1[7] = {nam:"MAline7",p1x:0,p1y:0,p1z:1,p2x:0,p2y:-14,p2z:1,_siz:2,_sizz:0.1};
mod_ma16_1[8] = {nam:"MAline8",p1x:2,p1y:-1,p1z:2,p2x:1,p2y:-5,p2z:2,_siz:2.5,_sizz:0.5};
mod_ma16_1[9] = {nam:"MAline9",p1x:-2,p1y:-1,p1z:2,p2x:-1,p2y:-5,p2z:2,_siz:2.5,_sizz:0.5};
mod_ma16_1[10] = {nam:"MAline10",p1x:2,p1y:-1,p1z:2,p2x:2,p2y:3.5,p2z:1,_siz:2,_sizz:0.1};
mod_ma16_1[11] = {nam:"MAline11",p1x:-2,p1y:-1,p1z:2,p2x:-2,p2y:3.5,p2z:1,_siz:2,_sizz:0.1};
mod_ma16_1[12] = {nam:"MAline12",p1x:-3,p1y:-0.5,p1z:-1,p2x:-3,p2y:-0.5,p2z:1.5,_siz:1.5,_sizz:1.2};
mod_ma16_1[13] = {nam:"MAline13",p1x:3,p1y:-0.5,p1z:-1,p2x:3,p2y:-0.5,p2z:1.5,_siz:1.5,_sizz:1.2};
mod_ma16_1[14] = {nam:"MAline14",p1x:-3,p1y:-0.5,p1z:-1,p2x:-3,p2y:3,p2z:-1.5,_siz:1.5,_sizz:1.2};
mod_ma16_1[15] = {nam:"MAline15",p1x:3,p1y:-0.5,p1z:-1,p2x:3,p2y:3,p2z:-1.5,_siz:1.5,_sizz:1.2};
mod_ma16_1[16] = {nam:"MAline16",p1x:-3.5,p1y:3,p1z:-1.5,p2x:-3.5,p2y:6,p2z:-1.5,_siz:1,_sizz:0.2};
mod_ma16_1[17] = {nam:"MAline17",p1x:3.5,p1y:3,p1z:-1.5,p2x:3.5,p2y:6,p2z:-1.5,_siz:1,_sizz:0.2};
mod_ma16_1[18] = {nam:"MAline18",p1x:-2.5,p1y:3,p1z:-1.5,p2x:-2.5,p2y:6,p2z:-1.5,_siz:1,_sizz:0.2};
mod_ma16_1[19] = {nam:"MAline19",p1x:2.5,p1y:3,p1z:-1.5,p2x:2.5,p2y:6,p2z:-1.5,_siz:1,_sizz:0.2};
_global.mod_ma16_2 = new Array();
_global.mod_ma16_2 = _global.mod_ma16_1;
_global.mod_ma17_1 = new Array();
mod_ma17_1[0] = {nam:"MAline0",p1x:0,p1y:6.5,p1z:2,p2x:0,p2y:-3,p2z:2,_siz:2.5,_sizz:1};
mod_ma17_1[1] = {nam:"MAline1",p1x:0,p1y:-3,p1z:2,p2x:0,p2y:-6.5,p2z:5,_siz:2,_sizz:0.5};
mod_ma17_1[2] = {nam:"MAline2",p1x:1,p1y:6.5,p1z:1.5,p2x:1,p2y:8,p2z:1.5,_siz:0.5,_sizz:1};
mod_ma17_1[3] = {nam:"MAline3",p1x:-1,p1y:6.5,p1z:1.5,p2x:-1,p2y:8,p2z:1.5,_siz:0.5,_sizz:1};
mod_ma17_1[4] = {nam:"MAline4",p1x:0,p1y:0.5,p1z:0.5,p2x:0,p2y:2.5,p2z:0.5,_siz:2,_sizz:0.7};
mod_ma17_1[5] = {nam:"MAline5",p1x:0,p1y:0,p1z:0.5,p2x:0,p2y:-4,p2z:0.5,_siz:3,_sizz:0.5};
mod_ma17_1[6] = {nam:"MAline6",p1x:1,p1y:0,p1z:0,p2x:-1,p2y:0,p2z:0,_siz:3,_sizz:1};
mod_ma17_1[7] = {nam:"LAline7",p1x:-1.5,p1y:-5,p1z:3,p2x:-1,p2y:1.5,p2z:2,_siz:2.5,_sizz:0.1};
mod_ma17_1[8] = {nam:"LAline8",p1x:-2.5,p1y:-5,p1z:3,p2x:-1,p2y:1.5,p2z:2,_siz:2.5,_sizz:0.1};
mod_ma17_1[9] = {nam:"LAline9",p1x:1.5,p1y:-5,p1z:3,p2x:1,p2y:1.5,p2z:2,_siz:2.5,_sizz:0.1};
mod_ma17_1[10] = {nam:"LAline10",p1x:2.5,p1y:-5,p1z:3,p2x:1,p2y:1.5,p2z:2,_siz:2.5,_sizz:0.1};
mod_ma17_1[11] = {nam:"LGline11",p1x:1.5,p1y:-3.5,p1z:1,p2x:2,p2y:-3,p2z:-2,_siz:1.5,_sizz:0.8};
mod_ma17_1[12] = {nam:"LGline12",p1x:-1.5,p1y:-3.5,p1z:1,p2x:-2,p2y:-3,p2z:-2,_siz:1.5,_sizz:0.8};
mod_ma17_1[13] = {nam:"LGline13",p1x:4,p1y:1,p1z:-4,p2x:2,p2y:-3,p2z:-2,_siz:2.5,_sizz:0.8};
mod_ma17_1[14] = {nam:"LGline14",p1x:-4,p1y:1,p1z:-4,p2x:-2,p2y:-3,p2z:-2,_siz:2.5,_sizz:0.8};
_global.mod_ma17_2 = new Array();
_global.mod_ma17_2 = _global.mod_ma17_1;
_global.mod_ma18_1 = new Array();
mod_ma18_1[0] = {nam:"MAline0",p1x:2.25,p1y:0,p1z:0,p2x:0,p2y:-13,p2z:-1.5,_siz:6,_sizz:0.05};
mod_ma18_1[1] = {nam:"MAline1",p1x:-2.25,p1y:0,p1z:0,p2x:0,p2y:-13,p2z:-1.5,_siz:6,_sizz:0.05};
mod_ma18_1[2] = {nam:"MAline2",p1x:0,p1y:1.5,p1z:0,p2x:0,p2y:-13,p2z:-1.5,_siz:6,_sizz:0.05};
mod_ma18_1[3] = {nam:"MAline3",p1x:0,p1y:-1.5,p1z:2,p2x:0,p2y:-13,p2z:-1.5,_siz:3,_sizz:0.05};
mod_ma18_1[4] = {nam:"MAline4",p1x:2,p1y:2,p1z:-2,p2x:3,p2y:4,p2z:-3,_siz:2,_sizz:1.5};
mod_ma18_1[5] = {nam:"MAline5",p1x:-2,p1y:2,p1z:-2,p2x:-3,p2y:4,p2z:-3,_siz:2,_sizz:1.5};
mod_ma18_1[6] = {nam:"MAline6",p1x:3.5,p1y:4,p1z:-4,p2x:4,p2y:6,p2z:-5,_siz:1,_sizz:0.5};
mod_ma18_1[7] = {nam:"MAline7",p1x:-3.5,p1y:4,p1z:-4,p2x:-4,p2y:6,p2z:-5,_siz:1,_sizz:0.5};
mod_ma18_1[8] = {nam:"MAline8",p1x:2.5,p1y:4,p1z:-4,p2x:2,p2y:6,p2z:-5,_siz:1,_sizz:0.5};
mod_ma18_1[9] = {nam:"MAline9",p1x:-2.5,p1y:4,p1z:-4,p2x:-2,p2y:6,p2z:-5,_siz:1,_sizz:0.5};
mod_ma18_1[10] = {nam:"MAline10",p1x:3,p1y:4,p1z:-2,p2x:3,p2y:7,p2z:-2,_siz:1,_sizz:0.5};
mod_ma18_1[11] = {nam:"MAline11",p1x:-3,p1y:4,p1z:-2,p2x:-3,p2y:7,p2z:-2,_siz:1,_sizz:0.5};
_global.mod_ma18_2 = new Array();
_global.mod_ma18_2 = _global.mod_ma18_1;
_global.mod_ma19_1 = new Array();
mod_ma19_1[0] = {nam:"MAline0",p1x:0,p1y:1,p1z:1.5,p2x:0,p2y:4,p2z:1,_siz:2,_sizz:0.1};
mod_ma19_1[1] = {nam:"MAline1",p1x:1.5,p1y:0,p1z:-1,p2x:0.5,p2y:8,p2z:0,_siz:2,_sizz:0.2};
mod_ma19_1[2] = {nam:"MAline2",p1x:-1.5,p1y:0,p1z:-1,p2x:-0.5,p2y:8,p2z:0,_siz:2,_sizz:0.2};
mod_ma19_1[3] = {nam:"MAline3",p1x:0,p1y:0,p1z:0,p2x:0,p2y:10,p2z:0,_siz:3,_sizz:0.3};
mod_ma19_1[4] = {nam:"MAline4",p1x:0,p1y:3,p1z:0,p2x:3,p2y:0,p2z:0,_siz:2,_sizz:1};
mod_ma19_1[5] = {nam:"MAline5",p1x:0,p1y:3,p1z:0,p2x:-3,p2y:0,p2z:0,_siz:2,_sizz:1};
mod_ma19_1[6] = {nam:"MAline6",p1x:1.5,p1y:2,p1z:-2,p2x:1.5,p2y:-5,p2z:-2,_siz:2,_sizz:2};
mod_ma19_1[7] = {nam:"MAline7",p1x:-1.5,p1y:2,p1z:-2,p2x:-1.5,p2y:-5,p2z:-2,_siz:2,_sizz:2};
mod_ma19_1[8] = {nam:"MAline8",p1x:1.5,p1y:-5,p1z:-2,p2x:1.5,p2y:-9,p2z:-2,_siz:4,_sizz:0.75};
mod_ma19_1[9] = {nam:"MAline9",p1x:-1.5,p1y:-5,p1z:-2,p2x:-1.5,p2y:-9,p2z:-2,_siz:4,_sizz:0.75};
mod_ma19_1[10] = {nam:"MAline10",p1x:1,p1y:2,p1z:-1,p2x:1,p2y:-4,p2z:-1,_siz:1.5,_sizz:1.2};
mod_ma19_1[11] = {nam:"MAline11",p1x:-1,p1y:2,p1z:-1,p2x:-1,p2y:-4,p2z:-1,_siz:1.5,_sizz:1.2};
mod_ma19_1[12] = {nam:"MAline12",p1x:0,p1y:0,p1z:1,p2x:0,p2y:-6,p2z:4,_siz:2.5,_sizz:0.2};
mod_ma19_1[13] = {nam:"MAline13",p1x:2,p1y:0,p1z:0,p2x:4,p2y:-4,p2z:0,_siz:2,_sizz:1};
mod_ma19_1[14] = {nam:"MAline14",p1x:-2,p1y:0,p1z:0,p2x:-4,p2y:-4,p2z:0,_siz:2,_sizz:1};
mod_ma19_1[15] = {nam:"MAline15",p1x:0,p1y:-2,p1z:0,p2x:7,p2y:-6,p2z:0,_siz:3,_sizz:0.5};
mod_ma19_1[16] = {nam:"MAline16",p1x:0,p1y:-2,p1z:0,p2x:-7,p2y:-6,p2z:0,_siz:3,_sizz:0.5};
mod_ma19_1[17] = {nam:"MAline17",p1x:7,p1y:-6,p1z:0,p2x:10,p2y:-5,p2z:0,_siz:1.5,_sizz:0.01};
mod_ma19_1[18] = {nam:"MAline18",p1x:-7,p1y:-6,p1z:0,p2x:-10,p2y:-5,p2z:0,_siz:1.5,_sizz:0.01};
mod_ma19_1[19] = {nam:"MAline19",p1x:2,p1y:0,p1z:0,p2x:3,p2y:-5,p2z:0,_siz:4,_sizz:0.8};
mod_ma19_1[20] = {nam:"MAline20",p1x:-2,p1y:0,p1z:0,p2x:-3,p2y:-5,p2z:0,_siz:4,_sizz:0.8};
mod_ma19_1[21] = {nam:"MAline21",p1x:3,p1y:-3.5,p1z:1,p2x:3,p2y:4,p2z:3,_siz:0.8,_sizz:1};
mod_ma19_1[22] = {nam:"MAline22",p1x:-3,p1y:-3.5,p1z:1,p2x:-3,p2y:4,p2z:3,_siz:0.8,_sizz:1};
_global.mod_ma19_2 = new Array();
_global.mod_ma19_2 = _global.mod_ma19_1;
_global.mod_ma20_1 = new Array();
mod_ma20_1[0] = {nam:"MAline0",p1x:0,p1y:-5,p1z:-5,p2x:0,p2y:-4,p2z:0,_siz:6,_sizz:0.5};
mod_ma20_1[1] = {nam:"MAline1",p1x:0,p1y:-2,p1z:0,p2x:0,p2y:-2,p2z:1,_siz:2.25,_sizz:1};
mod_ma20_1[2] = {nam:"MAline2",p1x:0,p1y:-3,p1z:-1.5,p2x:0,p2y:-6,p2z:-7.5,_siz:6,_sizz:0.1};
mod_ma20_1[3] = {nam:"MAline3",p1x:0,p1y:-2,p1z:-5,p2x:0,p2y:1,p2z:-14,_siz:7,_sizz:0.05};
mod_ma20_1[4] = {nam:"MAline4",p1x:0,p1y:0,p1z:-2.25,p2x:3,p2y:-3,p2z:0,_siz:4,_sizz:1.5};
mod_ma20_1[5] = {nam:"MAline5",p1x:0,p1y:0,p1z:-2.25,p2x:-3,p2y:-3,p2z:0,_siz:4,_sizz:1.5};
mod_ma20_1[6] = {nam:"MAline6",p1x:3,p1y:-8.25,p1z:-4.5,p2x:0,p2y:-15.25,p2z:-13,_siz:6,_sizz:0.01};
mod_ma20_1[7] = {nam:"MAline7",p1x:-3,p1y:-8.25,p1z:-4.5,p2x:0,p2y:-15.25,p2z:-13,_siz:6,_sizz:0.01};
mod_ma20_1[8] = {nam:"MAline8",p1x:2.25,p1y:-3,p1z:0,p2x:3,p2y:-8.25,p2z:-4.5,_siz:3,_sizz:2};
mod_ma20_1[9] = {nam:"MAline9",p1x:-2.25,p1y:-3,p1z:0,p2x:-3,p2y:-8.25,p2z:-4.5,_siz:3,_sizz:2};
mod_ma20_1[10] = {nam:"MAline10",p1x:0,p1y:-1,p1z:1,p2x:2,p2y:-2,p2z:3.5,_siz:0.5,_sizz:0.5};
mod_ma20_1[11] = {nam:"MAline11",p1x:0,p1y:-1,p1z:1,p2x:-2,p2y:-2,p2z:3.5,_siz:0.5,_sizz:0.5};
mod_ma20_1[12] = {nam:"MAline12",p1x:6,p1y:-3,p1z:1,p2x:12.5,p2y:-6,p2z:-14,_siz:9,_sizz:0.1};
mod_ma20_1[13] = {nam:"MAline13",p1x:-6,p1y:-3,p1z:1,p2x:-12.5,p2y:-6,p2z:-14,_siz:9,_sizz:0.1};
mod_ma20_1[14] = {nam:"MAline14",p1x:4.5,p1y:-3,p1z:-0.75,p2x:4.5,p2y:2.25,p2z:-2.25,_siz:1.8,_sizz:1.2};
mod_ma20_1[15] = {nam:"MAline15",p1x:-4.5,p1y:-3,p1z:-0.75,p2x:-4.5,p2y:2.25,p2z:-2.25,_siz:1.8,_sizz:1.2};
mod_ma20_1[16] = {nam:"MAline16",p1x:2,p1y:-3,p1z:-8,p2x:3,p2y:-5,p2z:-12,_siz:3.5,_sizz:1.2};
mod_ma20_1[17] = {nam:"MAline17",p1x:-2,p1y:-3,p1z:-8,p2x:-3,p2y:-5,p2z:-12,_siz:3.5,_sizz:1.2};
mod_ma20_1[18] = {nam:"MAline18",p1x:3,p1y:-5,p1z:-12,p2x:4,p2y:-10,p2z:-19,_siz:4,_sizz:1.5};
mod_ma20_1[19] = {nam:"MAline19",p1x:-3,p1y:-5,p1z:-12,p2x:-4,p2y:-10,p2z:-19,_siz:4,_sizz:1.5};
_global.mod_ma20_2 = new Array();
mod_ma20_2[0] = {nam:"MAline0",p1x:0,p1y:-5,p1z:0,p2x:0,p2y:1,p2z:1,_siz:6,_sizz:0.5};
mod_ma20_2[1] = {nam:"MAline1",p1x:0,p1y:0,p1z:-1,p2x:0,p2y:1,p2z:0,_siz:2.25,_sizz:1};
mod_ma20_2[2] = {nam:"MAline2",p1x:0,p1y:-3,p1z:-1.5,p2x:0,p2y:-6,p2z:-7.5,_siz:6,_sizz:0.1};
mod_ma20_2[3] = {nam:"MAline3",p1x:0,p1y:-4,p1z:-5,p2x:0,p2y:-9,p2z:-12.5,_siz:7,_sizz:0.05};
mod_ma20_2[4] = {nam:"MAline4",p1x:0,p1y:0,p1z:-2.25,p2x:3,p2y:-3,p2z:0,_siz:4,_sizz:1.5};
mod_ma20_2[5] = {nam:"MAline5",p1x:0,p1y:0,p1z:-2.25,p2x:-3,p2y:-3,p2z:0,_siz:4,_sizz:1.5};
mod_ma20_2[6] = {nam:"MAline6",p1x:3,p1y:-8.25,p1z:-2.5,p2x:0,p2y:-19.25,p2z:-5,_siz:6,_sizz:0.01};
mod_ma20_2[7] = {nam:"MAline7",p1x:-3,p1y:-8.25,p1z:-2.5,p2x:0,p2y:-19.25,p2z:-5,_siz:6,_sizz:0.01};
mod_ma20_2[8] = {nam:"MAline8",p1x:2.25,p1y:0,p1z:-3,p2x:3,p2y:-8.25,p2z:-2.5,_siz:3,_sizz:2};
mod_ma20_2[9] = {nam:"MAline9",p1x:-2.25,p1y:0,p1z:-3,p2x:-3,p2y:-8.25,p2z:-2.5,_siz:3,_sizz:2};
mod_ma20_2[10] = {nam:"MAline10",p1x:0,p1y:1.5,p1z:-0.5,p2x:2,p2y:2,p2z:3,_siz:0.5,_sizz:0.5};
mod_ma20_2[11] = {nam:"MAline11",p1x:0,p1y:1.5,p1z:-0.5,p2x:-2,p2y:2,p2z:3,_siz:0.5,_sizz:0.5};
mod_ma20_2[12] = {nam:"MAline12",p1x:6,p1y:-1.5,p1z:1.5,p2x:13.5,p2y:-13.5,p2z:-7,_siz:9,_sizz:0.1};
mod_ma20_2[13] = {nam:"MAline13",p1x:-6,p1y:-1.5,p1z:1.5,p2x:-13.5,p2y:-13.5,p2z:-7,_siz:9,_sizz:0.1};
mod_ma20_2[14] = {nam:"MAline14",p1x:4.5,p1y:-3,p1z:-0.75,p2x:5.25,p2y:2.25,p2z:-2.25,_siz:1.8,_sizz:1.2};
mod_ma20_2[15] = {nam:"MAline15",p1x:-4.5,p1y:-3,p1z:-0.75,p2x:-5.25,p2y:2.25,p2z:-2.25,_siz:1.8,_sizz:1.2};
mod_ma20_2[16] = {nam:"MAline16",p1x:2,p1y:-3,p1z:-3,p2x:3,p2y:-10,p2z:-9,_siz:3.5,_sizz:1.2};
mod_ma20_2[17] = {nam:"MAline17",p1x:-2,p1y:-3,p1z:-3,p2x:-3,p2y:-10,p2z:-9,_siz:3.5,_sizz:1.2};
mod_ma20_2[18] = {nam:"MAline18",p1x:3,p1y:-10,p1z:-9,p2x:4,p2y:-19,p2z:-13,_siz:4,_sizz:1.5};
mod_ma20_2[19] = {nam:"MAline19",p1x:-3,p1y:-10,p1z:-9,p2x:-4,p2y:-19,p2z:-13,_siz:4,_sizz:1.5};
_global.mod_ma21_1 = new Array();
mod_ma21_1[0] = {nam:"MAline0",p1x:0,p1y:1,p1z:1.5,p2x:0,p2y:4,p2z:1,_siz:2,_sizz:0.1};
mod_ma21_1[1] = {nam:"MAline1",p1x:1.5,p1y:0,p1z:-1,p2x:0.5,p2y:8,p2z:0,_siz:2,_sizz:0.2};
mod_ma21_1[2] = {nam:"MAline2",p1x:-1.5,p1y:0,p1z:-1,p2x:-0.5,p2y:8,p2z:0,_siz:2,_sizz:0.2};
mod_ma21_1[3] = {nam:"MAline3",p1x:0,p1y:0,p1z:0,p2x:0,p2y:10,p2z:0,_siz:3,_sizz:0.1};
mod_ma21_1[4] = {nam:"MAline4",p1x:0,p1y:3,p1z:0,p2x:3,p2y:0,p2z:0,_siz:2,_sizz:1};
mod_ma21_1[5] = {nam:"MAline5",p1x:0,p1y:3,p1z:0,p2x:-3,p2y:0,p2z:0,_siz:2,_sizz:1};
mod_ma21_1[6] = {nam:"MAline6",p1x:3.5,p1y:1,p1z:-2,p2x:3.5,p2y:-5,p2z:-2,_siz:2,_sizz:2};
mod_ma21_1[7] = {nam:"MAline7",p1x:-3.5,p1y:1,p1z:-2,p2x:-3.5,p2y:-5,p2z:-2,_siz:2,_sizz:2};
mod_ma21_1[8] = {nam:"MAline8",p1x:3,p1y:0,p1z:1,p2x:3,p2y:-6,p2z:4,_siz:2.5,_sizz:0.2};
mod_ma21_1[9] = {nam:"MAline9",p1x:-3,p1y:0,p1z:1,p2x:-3,p2y:-6,p2z:4,_siz:2.5,_sizz:0.2};
mod_ma21_1[10] = {nam:"MAline10",p1x:1,p1y:2,p1z:-1,p2x:1,p2y:-4,p2z:-1,_siz:2,_sizz:1.2};
mod_ma21_1[11] = {nam:"MAline11",p1x:-1,p1y:2,p1z:-1,p2x:-1,p2y:-4,p2z:-1,_siz:2,_sizz:1.2};
mod_ma21_1[13] = {nam:"MAline13",p1x:2,p1y:0,p1z:0,p2x:4,p2y:-4,p2z:0,_siz:2,_sizz:1};
mod_ma21_1[14] = {nam:"MAline14",p1x:-2,p1y:0,p1z:0,p2x:-4,p2y:-4,p2z:0,_siz:2,_sizz:1};
mod_ma21_1[15] = {nam:"MAline15",p1x:0,p1y:2,p1z:-1,p2x:0,p2y:-1,p2z:-1,_siz:4,_sizz:1};
_global.mod_ma21_2 = new Array();
_global.mod_ma21_2 = _global.mod_ma21_1;
_global.mod_ma22_1 = new Array();
mod_ma22_1[0] = {nam:"MAline0",p1x:1,p1y:0.5,p1z:-0.5,p2x:-1,p2y:0.5,p2z:-0.5,_siz:2.5,_sizz:1};
mod_ma22_1[1] = {nam:"MAline1",p1x:1,p1y:-0.2,p1z:0.9,p2x:0.8,p2y:-3,p2z:-0.5,_siz:2.5,_sizz:1};
mod_ma22_1[2] = {nam:"MAline2",p1x:-1,p1y:-0.2,p1z:0.9,p2x:-0.8,p2y:-3,p2z:-0.5,_siz:2.5,_sizz:1};
mod_ma22_1[3] = {nam:"MAline3",p1x:0,p1y:0.5,p1z:0,p2x:0,p2y:-4,p2z:-1.5,_siz:3,_sizz:0.7};
mod_ma22_1[4] = {nam:"MAline4",p1x:1.2,p1y:-4,p1z:-1.5,p2x:-1.2,p2y:-4,p2z:-1.5,_siz:2,_sizz:1};
mod_ma22_1[5] = {nam:"MAline5",p1x:1,p1y:-4,p1z:-1.5,p2x:3.5,p2y:-6.8,p2z:-1.5,_siz:1.5,_sizz:0.8};
mod_ma22_1[6] = {nam:"MAline6",p1x:-1,p1y:-4,p1z:-1.5,p2x:-3.5,p2y:-6.8,p2z:-1.5,_siz:1.5,_sizz:0.8};
mod_ma22_1[7] = {nam:"MAline7",p1x:5.5,p1y:-10,p1z:-1.5,p2x:3.5,p2y:-6.8,p2z:-1.5,_siz:2.5,_sizz:0.8};
mod_ma22_1[8] = {nam:"MAline8",p1x:-5.5,p1y:-10,p1z:-1.5,p2x:-3.5,p2y:-6.8,p2z:-1.5,_siz:2.5,_sizz:0.8};
mod_ma22_1[9] = {nam:"MAline9",p1x:2,p1y:2,p1z:-1,p2x:2,p2y:-0.5,p2z:0.5,_siz:1.5,_sizz:1.2};
mod_ma22_1[10] = {nam:"MAline10",p1x:2,p1y:2,p1z:-1,p2x:2,p2y:6,p2z:-1,_siz:1.5,_sizz:1.2};
mod_ma22_1[11] = {nam:"MAline11",p1x:2,p1y:4,p1z:-0.5,p2x:2,p2y:12,p2z:-0.5,_siz:1.5,_sizz:0.5};
_global.mod_ma22_2 = _global.mod_ma22_1;
_global.mod_ma23_1 = new Array();
mod_ma23_1[0] = {nam:"MAline0",p1x:0,p1y:2,p1z:0.5,p2x:-0.5,p2y:-6,p2z:2,_siz:2,_sizz:0.1};
mod_ma23_1[1] = {nam:"MAline1",p1x:1.5,p1y:0,p1z:-1,p2x:0.5,p2y:6,p2z:0,_siz:2,_sizz:0.2};
mod_ma23_1[2] = {nam:"MAline2",p1x:-1.5,p1y:0,p1z:-1,p2x:-0.5,p2y:6,p2z:0,_siz:2,_sizz:0.2};
mod_ma23_1[3] = {nam:"MAline3",p1x:0,p1y:0,p1z:0,p2x:0,p2y:8,p2z:0,_siz:3,_sizz:0.1};
mod_ma23_1[4] = {nam:"MAline4",p1x:0,p1y:3,p1z:0,p2x:3,p2y:0,p2z:0,_siz:2,_sizz:1};
mod_ma23_1[5] = {nam:"MAline5",p1x:0,p1y:3,p1z:0,p2x:-3,p2y:0,p2z:0,_siz:2,_sizz:1};
mod_ma23_1[6] = {nam:"MAline6",p1x:3,p1y:1,p1z:-3,p2x:3,p2y:-5,p2z:-3,_siz:3,_sizz:1.5};
mod_ma23_1[7] = {nam:"MAline7",p1x:-3,p1y:1,p1z:-3,p2x:-3,p2y:-5,p2z:-3,_siz:3,_sizz:1.5};
mod_ma23_1[8] = {nam:"MAline8",p1x:3,p1y:-2,p1z:0,p2x:3,p2y:-6,p2z:3,_siz:2.5,_sizz:0.2};
mod_ma23_1[9] = {nam:"MAline9",p1x:-3,p1y:-2,p1z:0,p2x:-3,p2y:-6,p2z:3,_siz:2.5,_sizz:0.2};
mod_ma23_1[10] = {nam:"MAline10",p1x:2,p1y:2,p1z:-1,p2x:2,p2y:-4,p2z:-1,_siz:3,_sizz:1.2};
mod_ma23_1[11] = {nam:"MAline11",p1x:-2,p1y:2,p1z:-1,p2x:-2,p2y:-4,p2z:-1,_siz:3,_sizz:1.2};
mod_ma23_1[13] = {nam:"MAline13",p1x:2,p1y:0,p1z:0,p2x:4,p2y:-4,p2z:0,_siz:2,_sizz:1};
mod_ma23_1[14] = {nam:"MAline14",p1x:-2,p1y:0,p1z:0,p2x:-4,p2y:-4,p2z:0,_siz:2,_sizz:1};
mod_ma23_1[15] = {nam:"MAline15",p1x:0,p1y:6,p1z:-2.5,p2x:0,p2y:-4,p2z:-3,_siz:0.5,_sizz:10};
mod_ma23_1[16] = {nam:"MAline16",p1x:0,p1y:12,p1z:-3,p2x:0,p2y:-3,p2z:-5,_siz:0.5,_sizz:3};
_global.mod_ma23_2 = new Array();
_global.mod_ma23_2 = _global.mod_ma23_1;
_global.mod_ma24_1 = new Array();
mod_ma24_1[0] = {nam:"MAline0",p1x:0,p1y:-1,p1z:1,p2x:0,p2y:4,p2z:1,_siz:3,_sizz:0.2};
mod_ma24_1[1] = {nam:"MAline1",p1x:1.5,p1y:0,p1z:-1,p2x:0.5,p2y:6,p2z:0,_siz:2,_sizz:0.2};
mod_ma24_1[2] = {nam:"MAline2",p1x:-1.5,p1y:0,p1z:-1,p2x:-0.5,p2y:6,p2z:0,_siz:2,_sizz:0.2};
mod_ma24_1[3] = {nam:"MAline3",p1x:0,p1y:0,p1z:0,p2x:0,p2y:6,p2z:0,_siz:3,_sizz:0.5};
mod_ma24_1[4] = {nam:"MAline4",p1x:0,p1y:3,p1z:0,p2x:3,p2y:0,p2z:0,_siz:2,_sizz:1};
mod_ma24_1[5] = {nam:"MAline5",p1x:0,p1y:3,p1z:0,p2x:-3,p2y:0,p2z:0,_siz:2,_sizz:1};
mod_ma24_1[6] = {nam:"MAline6",p1x:2,p1y:12,p1z:2,p2x:1.5,p2y:-6,p2z:1,_siz:0.5,_sizz:8};
mod_ma24_1[7] = {nam:"MAline7",p1x:-2,p1y:12,p1z:2,p2x:-1.5,p2y:-6,p2z:1,_siz:0.5,_sizz:8};
mod_ma24_1[8] = {nam:"MAline8",p1x:2,p1y:-5,p1z:0,p2x:2,p2y:-2,p2z:-0.5,_siz:3,_sizz:1.2};
mod_ma24_1[9] = {nam:"MAline9",p1x:-2,p1y:-5,p1z:0,p2x:-2,p2y:-2,p2z:-0.5,_siz:3,_sizz:1.2};
mod_ma24_1[10] = {nam:"MAline10",p1x:1.5,p1y:-6,p1z:1,p2x:2,p2y:-12,p2z:2,_siz:4,_sizz:0.2};
mod_ma24_1[11] = {nam:"MAline11",p1x:-1.5,p1y:-6,p1z:1,p2x:-2,p2y:-12,p2z:2,_siz:4,_sizz:0.2};
mod_ma24_1[12] = {nam:"MAline12",p1x:-1,p1y:-7,p1z:1,p2x:-3,p2y:-9,p2z:5,_siz:3,_sizz:0.01};
mod_ma24_1[13] = {nam:"MAline13",p1x:1,p1y:-7,p1z:1,p2x:3,p2y:-9,p2z:5,_siz:3,_sizz:0.01};
mod_ma24_1[14] = {nam:"MAline14",p1x:3,p1y:0,p1z:0,p2x:2,p2y:-4,p2z:0,_siz:2,_sizz:1};
mod_ma24_1[15] = {nam:"MAline15",p1x:-3,p1y:0,p1z:0,p2x:-2,p2y:-4,p2z:0,_siz:2,_sizz:1};
mod_ma24_1[16] = {nam:"MAline16",p1x:2,p1y:-6,p1z:0,p2x:9,p2y:6,p2z:0,_siz:4,_sizz:0.01};
mod_ma24_1[17] = {nam:"MAline17",p1x:-2,p1y:-6,p1z:0,p2x:-9,p2y:6,p2z:0,_siz:4,_sizz:0.01};
_global.mod_ma24_2 = new Array();
_global.mod_ma24_2 = _global.mod_ma24_1;
_global.mod_shd1_1 = new Array();
_global.mod_shd1_2 = new Array();
_global.mod_shd1_3 = new Array();
_global.mod_shd2_1 = new Array();
mod_shd2_1[0] = {nam:"Shdline0",p1x:-4,p1y:0,p1z:-1,p2x:-4,p2y:1.5,p2z:0.5,_siz:3,_sizz:1};
mod_shd2_1[1] = {nam:"Shdline1",p1x:-4,p1y:0,p1z:-1,p2x:-4,p2y:1.5,p2z:-2.5,_siz:3,_sizz:1};
mod_shd2_1[3] = {nam:"Shdline3",p1x:-4,p1y:3,p1z:-1,p2x:-4,p2y:1.5,p2z:0.5,_siz:3,_sizz:1};
mod_shd2_1[4] = {nam:"Shdline4",p1x:-4,p1y:3,p1z:-1,p2x:-4,p2y:1.5,p2z:-2.5,_siz:3,_sizz:1};
_global.mod_shd2_2 = new Array();
mod_shd2_2[0] = {nam:"Shdline0",p1x:0,p1y:3,p1z:-2,p2x:-3,p2y:3,p2z:-2,_siz:3,_sizz:1};
mod_shd2_2[1] = {nam:"Shdline1",p1x:-3,p1y:3,p1z:0,p2x:-3,p2y:3,p2z:-2,_siz:3,_sizz:1};
mod_shd2_2[3] = {nam:"Shdline3",p1x:0,p1y:3,p1z:-2,p2x:0,p2y:3,p2z:0,_siz:3,_sizz:1};
mod_shd2_2[4] = {nam:"Shdline4",p1x:-3,p1y:3,p1z:0,p2x:0,p2y:3,p2z:0,_siz:3,_sizz:1};
_global.mod_shd2_3 = new Array();
_global.mod_shd2_3 = _global.mod_shd2_1;
_global.mod_shd3_1 = new Array();
mod_shd3_1[0] = {nam:"Shdline0",p1x:-4,p1y:0,p1z:-1,p2x:-4,p2y:0.5,p2z:3.5,_siz:2,_sizz:0.8};
mod_shd3_1[1] = {nam:"Shdline1",p1x:-4,p1y:0,p1z:-1,p2x:-4,p2y:0.5,p2z:-5.5,_siz:2,_sizz:0.8};
mod_shd3_1[3] = {nam:"Shdline3",p1x:-4,p1y:3,p1z:-1,p2x:-4,p2y:2.5,p2z:3.5,_siz:2,_sizz:0.8};
mod_shd3_1[4] = {nam:"Shdline4",p1x:-4,p1y:3,p1z:-1,p2x:-4,p2y:2.5,p2z:-5.5,_siz:2,_sizz:0.8};
mod_shd3_1[5] = {nam:"Shdline5",p1x:-4,p1y:1.5,p1z:-5.5,p2x:-4,p2y:1.5,p2z:3.5,_siz:1.6,_sizz:1};
_global.mod_shd3_2 = new Array();
mod_shd3_2[0] = {nam:"Shdline0",p1x:0.5,p1y:3,p1z:-2,p2x:-3.5,p2y:3,p2z:-4.9,_siz:2,_sizz:0.8};
mod_shd3_2[1] = {nam:"Shdline1",p1x:-2,p1y:3,p1z:0.5,p2x:-4.9,p2y:3,p2z:-3.5,_siz:2,_sizz:0.8};
mod_shd3_2[3] = {nam:"Shdline3",p1x:0.5,p1y:3,p1z:-2,p2x:2.9,p2y:3,p2z:1.5,_siz:2,_sizz:0.8};
mod_shd3_2[4] = {nam:"Shdline4",p1x:-2,p1y:3,p1z:0.5,p2x:1.5,p2y:3,p2z:2.9,_siz:2,_sizz:0.8};
mod_shd3_2[5] = {nam:"Shdline5",p1x:-4.2,p1y:3,p1z:-4.2,p2x:2.2,p2y:3,p2z:2.2,_siz:1.6,_sizz:1};
_global.mod_shd3_3 = new Array();
mod_shd3_3[0] = {nam:"Shdline0",p1x:-4,p1y:2.5,p1z:0.5,p2x:-4,p2y:7,p2z:0,_siz:2,_sizz:0.8};
mod_shd3_3[1] = {nam:"Shdline1",p1x:-4,p1y:2.5,p1z:0.5,p2x:-4,p2y:-2,p2z:0,_siz:2,_sizz:0.8};
mod_shd3_3[3] = {nam:"Shdline3",p1x:-4,p1y:2.5,p1z:-2.5,p2x:-4,p2y:7,p2z:-2,_siz:2,_sizz:0.8};
mod_shd3_3[4] = {nam:"Shdline4",p1x:-4,p1y:2.5,p1z:-2.5,p2x:-4,p2y:-2,p2z:-2,_siz:2,_sizz:0.8};
mod_shd3_3[5] = {nam:"Shdline5",p1x:-4,p1y:7,p1z:-1,p2x:-4,p2y:-2,p2z:-1,_siz:1.6,_sizz:1};
_global.mod_shd4_1 = new Array();
mod_shd4_1[0] = {nam:"Shdline0",p1x:-4,p1y:0,p1z:0,p2x:-4,p2y:0.5,p2z:3.5,_siz:1.5,_sizz:0.8};
mod_shd4_1[1] = {nam:"Shdline1",p1x:-4,p1y:0,p1z:0,p2x:-4,p2y:0.5,p2z:-5.5,_siz:1.5,_sizz:0.8};
mod_shd4_1[3] = {nam:"Shdline3",p1x:-4,p1y:3,p1z:0,p2x:-4,p2y:2.5,p2z:3.5,_siz:1.5,_sizz:0.8};
mod_shd4_1[4] = {nam:"Shdline4",p1x:-4,p1y:3,p1z:0,p2x:-4,p2y:2.5,p2z:-5.5,_siz:1.5,_sizz:0.8};
mod_shd4_1[5] = {nam:"Shdline5",p1x:-4,p1y:1.5,p1z:-5,p2x:-4,p2y:1.5,p2z:3,_siz:2,_sizz:1};
_global.mod_shd4_2 = new Array();
mod_shd4_2[0] = {nam:"Shdline0",p1x:1.2,p1y:3,p1z:-1.3,p2x:-3.5,p2y:3,p2z:-4.9,_siz:1.5,_sizz:0.8};
mod_shd4_2[1] = {nam:"Shdline1",p1x:-1.3,p1y:3,p1z:1.2,p2x:-4.9,p2y:3,p2z:-3.5,_siz:1.5,_sizz:0.8};
mod_shd4_2[3] = {nam:"Shdline3",p1x:1.2,p1y:3,p1z:-1.3,p2x:2.9,p2y:3,p2z:1.5,_siz:1.5,_sizz:0.8};
mod_shd4_2[4] = {nam:"Shdline4",p1x:-1.3,p1y:3,p1z:1.2,p2x:1.5,p2y:3,p2z:2.9,_siz:1.5,_sizz:0.8};
mod_shd4_2[5] = {nam:"Shdline5",p1x:-3.85,p1y:3,p1z:-3.85,p2x:1.85,p2y:3,p2z:1.85,_siz:2,_sizz:1};
_global.mod_shd4_3 = new Array();
mod_shd4_3[0] = {nam:"Shdline0",p1x:-4,p1y:1.5,p1z:0.5,p2x:-4,p2y:7,p2z:0,_siz:1.5,_sizz:0.8};
mod_shd4_3[1] = {nam:"Shdline1",p1x:-4,p1y:1.5,p1z:0.5,p2x:-4,p2y:-2,p2z:0,_siz:1.5,_sizz:0.8};
mod_shd4_3[3] = {nam:"Shdline3",p1x:-4,p1y:1.5,p1z:-2.5,p2x:-4,p2y:7,p2z:-2,_siz:1.5,_sizz:0.8};
mod_shd4_3[4] = {nam:"Shdline4",p1x:-4,p1y:1.5,p1z:-2.5,p2x:-4,p2y:-2,p2z:-2,_siz:1.5,_sizz:0.8};
mod_shd4_3[5] = {nam:"Shdline5",p1x:-4,p1y:6.5,p1z:-1,p2x:-4,p2y:-1.5,p2z:-1,_siz:2,_sizz:1};
_global.mod_shd5_1 = new Array();
mod_shd5_1[0] = {nam:"Shdline0",p1x:-4,p1y:0.5,p1z:0,p2x:-4,p2y:0.5,p2z:3.5,_siz:1.5,_sizz:0.8};
mod_shd5_1[1] = {nam:"Shdline1",p1x:-4,p1y:0,p1z:0,p2x:-4,p2y:0.5,p2z:-5.5,_siz:1.5,_sizz:0.8};
mod_shd5_1[3] = {nam:"Shdline3",p1x:-4,p1y:2.5,p1z:0,p2x:-4,p2y:2.5,p2z:3.5,_siz:1.5,_sizz:0.8};
mod_shd5_1[4] = {nam:"Shdline4",p1x:-4,p1y:3,p1z:0,p2x:-4,p2y:2.5,p2z:-5.5,_siz:1.5,_sizz:0.8};
mod_shd5_1[5] = {nam:"Shdline5",p1x:-4,p1y:1.5,p1z:-5,p2x:-4,p2y:1.5,p2z:3,_siz:2,_sizz:1};
_global.mod_shd5_2 = new Array();
mod_shd5_2[0] = {nam:"Shdline0",p1x:1.2,p1y:3,p1z:-1.3,p2x:-3.5,p2y:3,p2z:-4.9,_siz:1.5,_sizz:0.8};
mod_shd5_2[1] = {nam:"Shdline1",p1x:-1.3,p1y:3,p1z:1.2,p2x:-4.9,p2y:3,p2z:-3.5,_siz:1.5,_sizz:0.8};
mod_shd5_2[3] = {nam:"Shdline3",p1x:0.85,p1y:3,p1z:-0.95,p2x:2.9,p2y:3,p2z:1.5,_siz:1.5,_sizz:0.8};
mod_shd5_2[4] = {nam:"Shdline4",p1x:-0.95,p1y:3,p1z:0.85,p2x:1.5,p2y:3,p2z:2.9,_siz:1.5,_sizz:0.8};
mod_shd5_2[5] = {nam:"Shdline5",p1x:-3.85,p1y:3,p1z:-3.85,p2x:1.85,p2y:3,p2z:1.85,_siz:2,_sizz:1};
_global.mod_shd5_3 = new Array();
mod_shd5_3[0] = {nam:"Shdline0",p1x:-4,p1y:1.5,p1z:0.5,p2x:-4,p2y:7,p2z:0,_siz:1.5,_sizz:0.8};
mod_shd5_3[1] = {nam:"Shdline1",p1x:-4,p1y:1.5,p1z:0,p2x:-4,p2y:-2,p2z:0,_siz:1.5,_sizz:0.8};
mod_shd5_3[3] = {nam:"Shdline3",p1x:-4,p1y:1.5,p1z:-2.5,p2x:-4,p2y:7,p2z:-2,_siz:1.5,_sizz:0.8};
mod_shd5_3[4] = {nam:"Shdline4",p1x:-4,p1y:1.5,p1z:-2,p2x:-4,p2y:-2,p2z:-2,_siz:1.5,_sizz:0.8};
mod_shd5_3[5] = {nam:"Shdline5",p1x:-4,p1y:6.5,p1z:-1,p2x:-4,p2y:-1.5,p2z:-1,_siz:2,_sizz:1};
_global.mod_shd6_1 = new Array();
mod_shd6_1[0] = {nam:"Shdline0",p1x:-4,p1y:0.5,p1z:0,p2x:-4,p2y:-0.5,p2z:3.5,_siz:1.5,_sizz:0.1};
mod_shd6_1[1] = {nam:"Shdline1",p1x:-4,p1y:-0.5,p1z:0,p2x:-4,p2y:1.5,p2z:-5.5,_siz:2,_sizz:0.8};
mod_shd6_1[3] = {nam:"Shdline3",p1x:-4,p1y:2.5,p1z:0,p2x:-4,p2y:3.5,p2z:3.5,_siz:1.5,_sizz:0.1};
mod_shd6_1[4] = {nam:"Shdline4",p1x:-4,p1y:3.5,p1z:0,p2x:-4,p2y:1.5,p2z:-5.5,_siz:2,_sizz:0.8};
mod_shd6_1[5] = {nam:"Shdline5",p1x:-4,p1y:1.5,p1z:-9,p2x:-4,p2y:1.5,p2z:1,_siz:0.3,_sizz:10};
_global.mod_shd6_2 = new Array();
mod_shd6_2[0] = {nam:"Shdline0",p1x:1.55,p1y:3,p1z:-1.65,p2x:-4.2,p2y:3,p2z:-4.2,_siz:2,_sizz:0.8};
mod_shd6_2[1] = {nam:"Shdline1",p1x:-1.65,p1y:3,p1z:1.55,p2x:-4.2,p2y:3,p2z:-4.2,_siz:2,_sizz:0.8};
mod_shd6_2[3] = {nam:"Shdline3",p1x:0.85,p1y:3,p1z:-0.95,p2x:3.6,p2y:3,p2z:0.8,_siz:1.5,_sizz:0.1};
mod_shd6_2[4] = {nam:"Shdline4",p1x:-0.95,p1y:3,p1z:0.85,p2x:0.8,p2y:3,p2z:3.6,_siz:1.5,_sizz:0.1};
mod_shd6_2[5] = {nam:"Shdline5",p1x:-6.75,p1y:3,p1z:-6.75,p2x:0.45,p2y:3,p2z:0.45,_siz:0.3,_sizz:10};
_global.mod_shd6_3 = new Array();
mod_shd6_3[0] = {nam:"Shdline0",p1x:-4,p1y:0,p1z:0.5,p2x:-4,p2y:-3.5,p2z:1,_siz:1.5,_sizz:0.1};
mod_shd6_3[1] = {nam:"Shdline1",p1x:-4,p1y:0,p1z:1,p2x:-4,p2y:5.5,p2z:-1,_siz:2,_sizz:0.8};
mod_shd6_3[3] = {nam:"Shdline3",p1x:-4,p1y:0,p1z:-2.5,p2x:-4,p2y:-3.5,p2z:-3,_siz:1.5,_sizz:0.1};
mod_shd6_3[4] = {nam:"Shdline4",p1x:-4,p1y:0,p1z:-3,p2x:-4,p2y:5.5,p2z:-1,_siz:2,_sizz:0.8};
mod_shd6_3[5] = {nam:"Shdline5",p1x:-4,p1y:9,p1z:-1,p2x:-4,p2y:-1,p2z:-1,_siz:0.3,_sizz:10};
_global.mod_shd7_1 = new Array();
mod_shd7_1[0] = {nam:"Shdline0",p1x:-4,p1y:0,p1z:0,p2x:-4,p2y:0.5,p2z:3.5,_siz:1.5,_sizz:0.8};
mod_shd7_1[1] = {nam:"Shdline1",p1x:-4,p1y:0.5,p1z:0,p2x:-4,p2y:1,p2z:-6.5,_siz:1.5,_sizz:0.5};
mod_shd7_1[3] = {nam:"Shdline3",p1x:-4,p1y:3,p1z:0,p2x:-4,p2y:2.5,p2z:3.5,_siz:1.5,_sizz:0.8};
mod_shd7_1[4] = {nam:"Shdline4",p1x:-4,p1y:2.5,p1z:0,p2x:-4,p2y:2,p2z:-6.5,_siz:1.5,_sizz:0.5};
mod_shd7_1[5] = {nam:"Shdline5",p1x:-4,p1y:1.5,p1z:-5,p2x:-4,p2y:1.5,p2z:3,_siz:1,_sizz:2};
_global.mod_shd7_2 = new Array();
mod_shd7_2[0] = {nam:"Shdline0",p1x:-0.1,p1y:3,p1z:-0.95,p2x:-5.55,p2y:3,p2z:-5.25,_siz:1.5,_sizz:0.5};
mod_shd7_2[1] = {nam:"Shdline1",p1x:-1.95,p1y:3,p1z:0.95,p2x:-6.25,p2y:3,p2z:-4.55,_siz:1.5,_sizz:0.5};
mod_shd7_2[3] = {nam:"Shdline3",p1x:0.2,p1y:3,p1z:-1.3,p2x:1.9,p2y:3,p2z:1.5,_siz:1.5,_sizz:0.8};
mod_shd7_2[4] = {nam:"Shdline4",p1x:-2.3,p1y:3,p1z:1.2,p2x:0.5,p2y:3,p2z:2.9,_siz:1.5,_sizz:0.8};
mod_shd7_2[5] = {nam:"Shdline5",p1x:-4.85,p1y:3,p1z:-3.85,p2x:0.85,p2y:3,p2z:1.85,_siz:1,_sizz:2};
_global.mod_shd7_3 = new Array();
mod_shd7_3[0] = {nam:"Shdline0",p1x:-4,p1y:0,p1z:0.5,p2x:-4,p2y:-3.5,p2z:0,_siz:1.5,_sizz:0.8};
mod_shd7_3[1] = {nam:"Shdline1",p1x:-4,p1y:0,p1z:0,p2x:-4,p2y:6.5,p2z:-0.5,_siz:1.5,_sizz:0.5};
mod_shd7_3[3] = {nam:"Shdline3",p1x:-4,p1y:0,p1z:-2.5,p2x:-4,p2y:-3.5,p2z:-2,_siz:1.5,_sizz:0.8};
mod_shd7_3[4] = {nam:"Shdline4",p1x:-4,p1y:0,p1z:-2,p2x:-4,p2y:6.5,p2z:-1.5,_siz:1.5,_sizz:0.5};
mod_shd7_3[5] = {nam:"Shdline5",p1x:-4,p1y:5,p1z:-1,p2x:-4,p2y:-3,p2z:-1,_siz:1,_sizz:2};
_global.mod_shd8_1 = new Array();
mod_shd8_1[0] = {nam:"Shdline0",p1x:1.5,p1y:-2.5,p1z:1.5,p2x:-4,p2y:-2,p2z:4,_siz:2,_sizz:0.1};
mod_shd8_1[1] = {nam:"Shdline1",p1x:-1.5,p1y:-2.5,p1z:-1.5,p2x:-4,p2y:-2,p2z:4,_siz:2,_sizz:0.1};
mod_shd8_1[2] = {nam:"Shdline2",p1x:1.5,p1y:-2.5,p1z:1.5,p2x:4,p2y:-2,p2z:-4,_siz:2,_sizz:0.1};
mod_shd8_1[3] = {nam:"Shdline3",p1x:-1.5,p1y:-2.5,p1z:-1.5,p2x:4,p2y:-2,p2z:-4,_siz:2,_sizz:0.1};
mod_shd8_1[4] = {nam:"Shdline4",p1x:0,p1y:-2.5,p1z:0,p2x:4,p2y:-2,p2z:-4,_siz:2.5,_sizz:0.1};
mod_shd8_1[5] = {nam:"Shdline5",p1x:0,p1y:-2.5,p1z:0,p2x:-4,p2y:-2,p2z:4,_siz:2.5,_sizz:0.1};
_global.mod_shd8_2 = new Array();
mod_shd8_2[0] = {nam:"Shdline0",p1x:-3,p1y:3.5,p1z:1.5,p2x:2.5,p2y:3,p2z:4,_siz:2,_sizz:0.1};
mod_shd8_2[1] = {nam:"Shdline1",p1x:0,p1y:3.5,p1z:-1.5,p2x:2.5,p2y:3,p2z:4,_siz:2,_sizz:0.1};
mod_shd8_2[2] = {nam:"Shdline2",p1x:-3,p1y:3.5,p1z:1.5,p2x:-5.5,p2y:3,p2z:-4,_siz:2,_sizz:0.1};
mod_shd8_2[3] = {nam:"Shdline3",p1x:0,p1y:3.5,p1z:-1.5,p2x:-5.5,p2y:3,p2z:-4,_siz:2,_sizz:0.1};
mod_shd8_2[4] = {nam:"Shdline4",p1x:-1.5,p1y:3.5,p1z:0,p2x:-5.5,p2y:3,p2z:-4,_siz:2.5,_sizz:0.1};
mod_shd8_2[5] = {nam:"Shdline5",p1x:-1.5,p1y:3.5,p1z:0,p2x:2.5,p2y:3,p2z:4,_siz:2.5,_sizz:0.1};
_global.mod_shd8_3 = new Array();
mod_shd8_3[0] = {nam:"Shdline0",p1x:1.5,p1y:-2.5,p1z:1.5,p2x:-4,p2y:-2,p2z:4,_siz:2,_sizz:0.1};
mod_shd8_3[1] = {nam:"Shdline1",p1x:-1.5,p1y:-2.5,p1z:-1.5,p2x:-4,p2y:-2,p2z:4,_siz:2,_sizz:0.1};
mod_shd8_3[2] = {nam:"Shdline2",p1x:1.5,p1y:-2.5,p1z:1.5,p2x:4,p2y:-2,p2z:-4,_siz:2,_sizz:0.1};
mod_shd8_3[3] = {nam:"Shdline3",p1x:-1.5,p1y:-2.5,p1z:-1.5,p2x:4,p2y:-2,p2z:-4,_siz:2,_sizz:0.1};
mod_shd8_3[4] = {nam:"Shdline4",p1x:0,p1y:-2.5,p1z:0,p2x:4,p2y:-2,p2z:-4,_siz:2.5,_sizz:0.1};
mod_shd8_3[5] = {nam:"Shdline5",p1x:0,p1y:-2.5,p1z:0,p2x:-4,p2y:-2,p2z:4,_siz:2.5,_sizz:0.1};
_global.mod_shd9_1 = new Array();
mod_shd9_1[0] = {nam:"Shdline0",p1x:-4.5,p1y:0.5,p1z:2,p2x:-4.5,p2y:0.5,p2z:-6,_siz:4,_sizz:1};
mod_shd9_1[1] = {nam:"Shdline1",p1x:-4.5,p1y:3,p1z:2,p2x:-4.5,p2y:3,p2z:-6,_siz:4,_sizz:1};
_global.mod_shd9_2 = new Array();
mod_shd9_2[0] = {nam:"Shdline0",p1x:0,p1y:3,p1z:2,p2x:0,p2y:3,p2z:-6,_siz:4,_sizz:1};
mod_shd9_2[1] = {nam:"Shdline1",p1x:-2.5,p1y:3,p1z:2,p2x:-2.5,p2y:3,p2z:-6,_siz:4,_sizz:1};
_global.mod_shd9_3 = new Array();
mod_shd9_3[0] = {nam:"Shdline0",p1x:-4.5,p1y:0.5,p1z:2,p2x:-4.5,p2y:0.5,p2z:-6,_siz:4,_sizz:1};
mod_shd9_3[1] = {nam:"Shdline1",p1x:-4.5,p1y:3,p1z:2,p2x:-4.5,p2y:3,p2z:-6,_siz:4,_sizz:1};
_global.mod_shd10_1 = new Array();
mod_shd10_1[0] = {nam:"Shdline0",p1x:-5,p1y:-5,p1z:2,p2x:-4,p2y:2.5,p2z:-2.5,_siz:1,_sizz:4};
_global.mod_shd10_2 = new Array();
mod_shd10_2[0] = {nam:"Shdline0",p1x:-8,p1y:0,p1z:-1,p2x:0,p2y:5,p2z:-1,_siz:1,_sizz:4};
_global.mod_shd10_3 = new Array();
mod_shd10_3[0] = {nam:"Shdline0",p1x:-5,p1y:-5,p1z:2,p2x:-4,p2y:2.5,p2z:-2.5,_siz:1,_sizz:4};
_global.mod_shd11_1 = new Array();
mod_shd11_1[0] = {nam:"Shdline0",p1x:-4,p1y:-1,p1z:0,p2x:-4,p2y:5,p2z:-0.5,_siz:2,_sizz:0.5};
mod_shd11_1[1] = {nam:"Shdline1",p1x:-4,p1y:-1,p1z:-2,p2x:-4,p2y:5,p2z:-1.5,_siz:2,_sizz:0.5};
mod_shd11_1[2] = {nam:"Shdline2",p1x:-4,p1y:7,p1z:-1,p2x:-4,p2y:-1,p2z:-1,_siz:1.5,_sizz:1};
_global.mod_shd11_2 = new Array();
mod_shd11_2[0] = {nam:"Shdline0",p1x:-4,p1y:2,p1z:0,p2x:0.5,p2y:6,p2z:-0.5,_siz:2,_sizz:0.5};
mod_shd11_2[1] = {nam:"Shdline1",p1x:-4,p1y:2,p1z:-2,p2x:0.5,p2y:6,p2z:-1.5,_siz:2,_sizz:0.5};
mod_shd11_2[2] = {nam:"Shdline2",p1x:2,p1y:7,p1z:-1,p2x:-4,p2y:2,p2z:-1,_siz:1.5,_sizz:1};
_global.mod_shd11_3 = new Array();
mod_shd11_3[0] = {nam:"Shdline0",p1x:-4,p1y:-1,p1z:0,p2x:-4,p2y:5,p2z:-0.5,_siz:2,_sizz:0.5};
mod_shd11_3[1] = {nam:"Shdline1",p1x:-4,p1y:-1,p1z:-2,p2x:-4,p2y:5,p2z:-1.5,_siz:2,_sizz:0.5};
mod_shd11_3[2] = {nam:"Shdline2",p1x:-4,p1y:7,p1z:-1,p2x:-4,p2y:-1,p2z:-1,_siz:1.5,_sizz:1};
_global.mod_shd12_1 = new Array();
mod_shd12_1[0] = {nam:"Shdline0",p1x:-4.5,p1y:-2,p1z:1,p2x:-3.5,p2y:5.5,p2z:-3.5,_siz:3,_sizz:0.1};
_global.mod_shd12_2 = new Array();
mod_shd12_2[0] = {nam:"Shdline0",p1x:-5,p1y:2,p1z:-1,p2x:3,p2y:7,p2z:-1,_siz:3,_sizz:0.1};
_global.mod_shd12_3 = new Array();
mod_shd12_3[0] = {nam:"Shdline0",p1x:-4.5,p1y:-2,p1z:-1,p2x:-3.5,p2y:7,p2z:-1,_siz:3,_sizz:0.1};
_global.mod_shd13_1 = new Array();
mod_shd13_1[0] = {nam:"Shdline0",p1x:-4,p1y:0,p1z:-2,p2x:-4,p2y:1,p2z:4.5,_siz:1.5,_sizz:0.5};
mod_shd13_1[1] = {nam:"Shdline1",p1x:-4,p1y:0,p1z:0,p2x:-4,p2y:1,p2z:-6.5,_siz:1.5,_sizz:0.5};
mod_shd13_1[2] = {nam:"Shdline2",p1x:-4,p1y:3,p1z:-2,p2x:-4,p2y:2,p2z:4.5,_siz:1.5,_sizz:0.5};
mod_shd13_1[3] = {nam:"Shdline3",p1x:-4,p1y:3,p1z:0,p2x:-4,p2y:2,p2z:-6.5,_siz:1.5,_sizz:0.5};
mod_shd13_1[4] = {nam:"Shdline4",p1x:-4,p1y:1.5,p1z:-5,p2x:-4,p2y:1.5,p2z:3,_siz:1,_sizz:1};
_global.mod_shd13_2 = new Array();
mod_shd13_2[0] = {nam:"Shdline0",p1x:-1,p1y:3,p1z:0.5,p2x:-7.5,p2y:3,p2z:-0.5,_siz:1.5,_sizz:0.5};
mod_shd13_2[1] = {nam:"Shdline1",p1x:-3,p1y:3,p1z:0.5,p2x:3.5,p2y:3,p2z:-0.5,_siz:1.5,_sizz:0.5};
mod_shd13_2[2] = {nam:"Shdline2",p1x:-1,p1y:3,p1z:-2.5,p2x:-7.5,p2y:3,p2z:-1.5,_siz:1.5,_sizz:0.5};
mod_shd13_2[3] = {nam:"Shdline3",p1x:-3,p1y:3,p1z:-2.5,p2x:3.5,p2y:3,p2z:-1.5,_siz:1.5,_sizz:0.5};
mod_shd13_2[4] = {nam:"Shdline4",p1x:2,p1y:3,p1z:-1,p2x:-6,p2y:3,p2z:-1,_siz:1,_sizz:1};
_global.mod_shd13_3 = new Array();
mod_shd13_3[0] = {nam:"Shdline0",p1x:-4,p1y:2,p1z:0.5,p2x:-4,p2y:-4.5,p2z:-0.5,_siz:1.5,_sizz:0.5};
mod_shd13_3[1] = {nam:"Shdline1",p1x:-4,p1y:0,p1z:0.5,p2x:-4,p2y:6.5,p2z:-0.5,_siz:1.5,_sizz:0.5};
mod_shd13_3[2] = {nam:"Shdline2",p1x:-4,p1y:2,p1z:-2.5,p2x:-4,p2y:-4.5,p2z:-1.5,_siz:1.5,_sizz:0.5};
mod_shd13_3[3] = {nam:"Shdline3",p1x:-4,p1y:0,p1z:-2.5,p2x:-4,p2y:6.5,p2z:-1.5,_siz:1.5,_sizz:0.5};
mod_shd13_3[4] = {nam:"Shdline4",p1x:-4,p1y:5,p1z:-1,p2x:-4,p2y:-3,p2z:-1,_siz:1,_sizz:1};
_global.mod_shd14_1 = new Array();
mod_shd14_1[0] = {nam:"Shdline0",p1x:-3,p1y:-1,p1z:2,p2x:-2.5,p2y:-2,p2z:5.5,_siz:1.5,_sizz:0.1};
mod_shd14_1[1] = {nam:"Shdline1",p1x:-3,p1y:-2,p1z:2,p2x:-5,p2y:-1,p2z:-5.5,_siz:2,_sizz:0.1};
mod_shd14_1[3] = {nam:"Shdline3",p1x:-3,p1y:1,p1z:2,p2x:-2.5,p2y:2,p2z:5.5,_siz:1.5,_sizz:0.1};
mod_shd14_1[4] = {nam:"Shdline4",p1x:-3,p1y:2,p1z:2,p2x:-5,p2y:1,p2z:-5.5,_siz:2,_sizz:0.1};
mod_shd14_1[5] = {nam:"Shdline5",p1x:-6,p1y:0,p1z:-9,p2x:-3,p2y:0,p2z:3,_siz:0.3,_sizz:10};
_global.mod_shd14_2 = new Array();
mod_shd14_2[0] = {nam:"Shdline0",p1x:-3,p1y:1,p1z:2,p2x:-4,p2y:0.5,p2z:5,_siz:1.5,_sizz:0.1};
mod_shd14_2[1] = {nam:"Shdline1",p1x:-4,p1y:1,p1z:2,p2x:-3,p2y:5,p2z:-5,_siz:2,_sizz:0.1};
mod_shd14_2[3] = {nam:"Shdline3",p1x:-1,p1y:1,p1z:2,p2x:-1,p2y:0.5,p2z:5,_siz:1.5,_sizz:0.1};
mod_shd14_2[4] = {nam:"Shdline4",p1x:0,p1y:1,p1z:2,p2x:-1,p2y:5,p2z:-5,_siz:2,_sizz:0.1};
mod_shd14_2[5] = {nam:"Shdline5",p1x:-2,p1y:7,p1z:-8,p2x:-2,p2y:1,p2z:3,_siz:0.3,_sizz:10};
_global.mod_shd14_3 = new Array();
mod_shd14_3[0] = {nam:"Shdline0",p1x:-4,p1y:0,p1z:2.5,p2x:-4,p2y:-3.5,p2z:3,_siz:1.5,_sizz:0.1};
mod_shd14_3[1] = {nam:"Shdline1",p1x:-4,p1y:0,p1z:3,p2x:-4,p2y:7.5,p2z:2,_siz:2,_sizz:0.1};
mod_shd14_3[3] = {nam:"Shdline3",p1x:-4,p1y:0,p1z:-0.5,p2x:-4,p2y:-3.5,p2z:-1,_siz:1.5,_sizz:0.1};
mod_shd14_3[4] = {nam:"Shdline4",p1x:-4,p1y:0,p1z:-1,p2x:-4,p2y:7.5,p2z:0,_siz:2,_sizz:0.1};
mod_shd14_3[5] = {nam:"Shdline5",p1x:-4,p1y:11,p1z:1,p2x:-4,p2y:-1,p2z:1,_siz:0.3,_sizz:10};
_global.hx_78s = new Object();
hx_78s._protype = "hx_78s";
hx_78s.$NAME = "囧达·里";
hx_78s.$TYPE = "HX-78S";
hx_78s._type = "MS";
hx_78s._size = "M";
hx_78s.maxHP = 4500;
hx_78s.maxEN = 4500;
hx_78s._DF = 900;
hx_78s.speedlv = 80;
hx_78s.subpowlv = 80;
hx_78s.turnlv = 80;
hx_78s.locklv = 90;
hx_78s._defeq = null;
hx_78s._atteq = "NTR";
hx_78s.wp1 = "Boomerang_1";
hx_78s.wp2 = "BmachinegunX8_0r";
hx_78s.wp3 = "BcannonX5_0";
hx_78s.wp4 = "TJ911_12r";
hx_78s.wp5 = "HPHL_0";
hx_78s.wp6 = "LBsword_0";
hx_78s.wp7 = "Lfunnal_1";
hx_78s.wp8 = "RefDBCcannon_0";
hx_78s.BDmod = "mod_bd1";
hx_78s.LGmod = "mod_lg1";
hx_78s.LAmod = null;
hx_78s.RAmod = "mod_ra1";
hx_78s.WImod = "mod_wi30";
hx_78s.SHDmod = null;
hx_78s.MAmod = null;
hx_78s.mod = new Array();
if(_global[hx_78s.BDmod + "_1"] != undefined)
{
   hx_78s.mod = hx_78s.mod.concat(_global[hx_78s.BDmod + "_1"]);
}
if(_global[hx_78s.LGmod + "_1"] != undefined)
{
   hx_78s.mod = hx_78s.mod.concat(_global[hx_78s.LGmod + "_1"]);
}
if(_global[hx_78s.LAmod + "_1"] != undefined)
{
   hx_78s.mod = hx_78s.mod.concat(_global[hx_78s.LAmod + "_1"]);
}
if(_global[hx_78s.RAmod + "_1"] != undefined)
{
   hx_78s.mod = hx_78s.mod.concat(_global[hx_78s.RAmod + "_1"]);
}
if(_global[hx_78s.WImod + "_1"] != undefined)
{
   hx_78s.mod = hx_78s.mod.concat(_global[hx_78s.WImod + "_1"]);
}
if(_global[hx_78s.SHDmod + "_1"] != undefined)
{
   hx_78s.mod = hx_78s.mod.concat(_global[hx_78s.SHDmod + "_1"]);
}
_global.TJ911_12r = new Object();
TJ911_12r.$NAME = "转晕你";
TJ911_12r.damlv = 490;
TJ911_12r.ddspeedlv = 50;
TJ911_12r.dstlv = 2800;
TJ911_12r.maxforce = 3000;
TJ911_12r.ct = 150;
TJ911_12r.maxcn = 0;
TJ911_12r.maxcnn = 0;
TJ911_12r.en = 200;
TJ911_12r.fn = 1;
TJ911_12r.fsiz = 7;
TJ911_12r.ftype = "tuji";
TJ911_12r.fclass = "EX";
TJ911_12r.fx = 3;
TJ911_12r.fy = 8;
TJ911_12r.fz = -1;
TJ911_12r.fsound = "gjk";
TJ911_12r.wpmod = new Array();
TJ911_12r.wpmod[0] = {nam:"WPline0",p1x:3,p1y:3,p1z:-1,p2x:3,p2y:3,p2z:-1.5,_siz:1.5,_sizz:1,_glow:1};
_global.BmachinegunX8_0r = new Object();
BmachinegunX8_0r.$NAME = "囧弹幕";
BmachinegunX8_0r.damlv = 280;
BmachinegunX8_0r.ddspeedlv = 140;
BmachinegunX8_0r.dstlv = 2500;
BmachinegunX8_0r.maxforce = 3000;
BmachinegunX8_0r.ct = 3;
BmachinegunX8_0r.lct = 2;
BmachinegunX8_0r.maxcn = 8000;
BmachinegunX8_0r.maxcnn = Infinity;
BmachinegunX8_0r.en = 0;
BmachinegunX8_0r.fn = 8;
BmachinegunX8_0r.mod = null;
BmachinegunX8_0r.fsiz = 0.3;
BmachinegunX8_0r.ftype = "cartridgeX";
BmachinegunX8_0r.fclass = "shoot";
BmachinegunX8_0r.fx = 0;
BmachinegunX8_0r.fy = 5;
BmachinegunX8_0r.fz = 0;
BmachinegunX8_0r.fsound = "minigun";
_global.egx_04r = new Object();
egx_04r._protype = "egx_04r";
egx_04r.$NAME = "角马·改";
egx_04r.$TYPE = "EGX-04r";
egx_04r._type = "MS";
egx_04r._size = "M";
egx_04r.maxHP = 2900;
egx_04r.maxEN = 3930;
egx_04r._DF = 280;
egx_04r.speedlv = 75;
egx_04r.subpowlv = 80;
egx_04r.turnlv = 60;
egx_04r.locklv = 70;
egx_04r._defeq = null;
egx_04r._atteq = null;
egx_04r.wp1 = "LRgun_0";
egx_04r.wp2 = "BmachinegunX2_0";
egx_04r.wp3 = "Bsniper_1";
egx_04r.wp4 = "BsniperEX_0";
egx_04r.wp5 = "Boomerang_0";
egx_04r.wp6 = "DBsaber_0";
egx_04r.wp7 = "FLfunnal_0";
egx_04r.wp8 = "FunnalEX_0";
egx_04r.BDmod = "mod_bd4";
egx_04r.LGmod = "mod_lg3";
egx_04r.LAmod = "mod_la3";
egx_04r.RAmod = "mod_ra3";
egx_04r.WImod = "mod_wi4";
egx_04r.MAmod = null;
egx_04r.mod = new Array();
if(_global[egx_04r.BDmod + "_1"] != undefined)
{
   egx_04r.mod = egx_04r.mod.concat(_global[egx_04r.BDmod + "_1"]);
}
if(_global[egx_04r.LGmod + "_1"] != undefined)
{
   egx_04r.mod = egx_04r.mod.concat(_global[egx_04r.LGmod + "_1"]);
}
if(_global[egx_04r.LAmod + "_1"] != undefined)
{
   egx_04r.mod = egx_04r.mod.concat(_global[egx_04r.LAmod + "_1"]);
}
if(_global[egx_04r.RAmod + "_1"] != undefined)
{
   egx_04r.mod = egx_04r.mod.concat(_global[egx_04r.RAmod + "_1"]);
}
if(_global[egx_04r.WImod + "_1"] != undefined)
{
   egx_04r.mod = egx_04r.mod.concat(_global[egx_04r.WImod + "_1"]);
}
_global.egx_04 = new Object();
egx_04._protype = "egx_04";
egx_04.$NAME = "角马";
egx_04.$TYPE = "EGX-04";
egx_04._type = "MS";
egx_04._size = "M";
egx_04.maxHP = 2360;
egx_04.maxEN = 3050;
egx_04._DF = 220;
egx_04.speedlv = 60;
egx_04.subpowlv = 75;
egx_04.turnlv = 30;
egx_04.locklv = 50;
egx_04._defeq = null;
egx_04._atteq = null;
egx_04.wp1 = "Wvulcan_0";
egx_04.wp2 = "Bmachinegun_0";
egx_04.wp3 = "DBCcannon_2";
egx_04.wp4 = "QiShe_5";
egx_04.wp5 = "Hrod_1";
egx_04.wp6 = "BsaberX2_0";
egx_04.wp7 = "null";
egx_04.wp8 = "null";
egx_04.BDmod = "mod_bd3";
egx_04.LGmod = "mod_lg3";
egx_04.LAmod = "mod_la3";
egx_04.RAmod = "mod_ra3";
egx_04.WImod = "mod_wi3";
egx_04.MAmod = null;
egx_04.mod = new Array();
if(_global[egx_04.BDmod + "_1"] != undefined)
{
   egx_04.mod = egx_04.mod.concat(_global[egx_04.BDmod + "_1"]);
}
if(_global[egx_04.LGmod + "_1"] != undefined)
{
   egx_04.mod = egx_04.mod.concat(_global[egx_04.LGmod + "_1"]);
}
if(_global[egx_04.LAmod + "_1"] != undefined)
{
   egx_04.mod = egx_04.mod.concat(_global[egx_04.LAmod + "_1"]);
}
if(_global[egx_04.RAmod + "_1"] != undefined)
{
   egx_04.mod = egx_04.mod.concat(_global[egx_04.RAmod + "_1"]);
}
if(_global[egx_04.WImod + "_1"] != undefined)
{
   egx_04.mod = egx_04.mod.concat(_global[egx_04.WImod + "_1"]);
}
_global.eg_03 = new Object();
eg_03._protype = "eg_03";
eg_03.$NAME = "鸡皮三";
eg_03.$TYPE = "EG-03";
eg_03._type = "MA";
eg_03._size = "L";
eg_03.maxHP = 8300;
eg_03.maxEN = 4150;
eg_03._DF = 665;
eg_03.speedlv = 81;
eg_03.subpowlv = 31;
eg_03.turnlv = 20;
eg_03.locklv = 80;
eg_03._defeq = "IF";
eg_03._atteq = null;
eg_03.coreUnit = "eg_03s";
eg_03.wp1 = "MmissileX5_0";
eg_03.wp2 = "Brifle_0";
eg_03.wp3 = "MMlauncher_0";
eg_03.wp4 = "TJ911_1";
eg_03.wp5 = "Cbomb_0";
eg_03.wp6 = "LBswordX2_0";
eg_03.wp7 = "HMPcannon_0";
eg_03.wp8 = "SPcannon_1";
eg_03.BDmod = null;
eg_03.LGmod = null;
eg_03.LAmod = null;
eg_03.RAmod = null;
eg_03.WImod = null;
eg_03.MAmod = "mod_ma1";
eg_03.mod = new Array();
if(_global[eg_03.MAmod + "_1"] != undefined)
{
   eg_03.mod = eg_03.mod.concat(_global[eg_03.MAmod + "_1"]);
}
_global.eg_03s = new Object();
eg_03s._protype = "eg_03s";
eg_03s.$NAME = "雄蕊";
eg_03s.$TYPE = "EG-03s";
eg_03s._type = "MS";
eg_03s._size = "M";
eg_03s.maxHP = 2400;
eg_03s.maxEN = 2000;
eg_03s._DF = 320;
eg_03s.speedlv = 50;
eg_03s.subpowlv = 48;
eg_03s.turnlv = 60;
eg_03s.locklv = 50;
eg_03s._defeq = null;
eg_03s._atteq = null;
eg_03s.wp1 = "Hvulcan_0";
eg_03s.wp2 = "Brifle_0";
eg_03s.wp3 = "Dbazooka_0";
eg_03s.wp4 = "QiShe_0";
eg_03s.wp5 = "null";
eg_03s.wp6 = "Bsword_0";
eg_03s.wp7 = "null";
eg_03s.wp8 = "null";
eg_03s.BDmod = "mod_bd1";
eg_03s.LGmod = "mod_lg1";
eg_03s.LAmod = "mod_la1";
eg_03s.RAmod = "mod_ra1";
eg_03s.WImod = "mod_wi16";
eg_03s.SHDmod = "mod_shd5";
eg_03s.MAmod = null;
eg_03s.mod = new Array();
if(_global[eg_03s.BDmod + "_1"] != undefined)
{
   eg_03s.mod = eg_03s.mod.concat(_global[eg_03s.BDmod + "_1"]);
}
if(_global[eg_03s.LGmod + "_1"] != undefined)
{
   eg_03s.mod = eg_03s.mod.concat(_global[eg_03s.LGmod + "_1"]);
}
if(_global[eg_03s.LAmod + "_1"] != undefined)
{
   eg_03s.mod = eg_03s.mod.concat(_global[eg_03s.LAmod + "_1"]);
}
if(_global[eg_03s.RAmod + "_1"] != undefined)
{
   eg_03s.mod = eg_03s.mod.concat(_global[eg_03s.RAmod + "_1"]);
}
if(_global[eg_03s.WImod + "_1"] != undefined)
{
   eg_03s.mod = eg_03s.mod.concat(_global[eg_03s.WImod + "_1"]);
}
if(_global[eg_03s.SHDmod + "_1"] != undefined)
{
   eg_03s.mod = eg_03s.mod.concat(_global[eg_03s.SHDmod + "_1"]);
}
_global.gb_79 = new Object();
gb_79._protype = "gb_79";
gb_79.$NAME = "钢球";
gb_79.$TYPE = "GB-79";
gb_79._type = "MP";
gb_79._size = "S";
gb_79.maxHP = 1150;
gb_79.maxEN = 920;
gb_79._DF = 120;
gb_79.speedlv = 30;
gb_79.subpowlv = 45;
gb_79.turnlv = 20;
gb_79.locklv = 23;
gb_79._defeq = null;
gb_79._atteq = null;
gb_79.wp1 = "Hrod_0";
gb_79.wp2 = "Vulcan_0";
gb_79.wp3 = "Cannon150_0";
gb_79.wp4 = "TJ911_11";
gb_79.wp5 = "null";
gb_79.wp6 = "null";
gb_79.wp7 = "null";
gb_79.wp8 = "null";
gb_79.BDmod = null;
gb_79.LGmod = null;
gb_79.LAmod = null;
gb_79.RAmod = null;
gb_79.WImod = null;
gb_79.MAmod = "mod_ma2";
gb_79.mod = new Array();
if(_global[gb_79.MAmod + "_1"] != undefined)
{
   gb_79.mod = gb_79.mod.concat(_global[gb_79.MAmod + "_1"]);
}
_global.gb_79r = new Object();
gb_79r._protype = "gb_79r";
gb_79r.$NAME = "最终决战型钢球";
gb_79r.$TYPE = "GB-79r";
gb_79r._type = "MA";
gb_79r._size = "M";
gb_79r.maxHP = 1250;
gb_79r.maxEN = 3520;
gb_79r._DF = 250;
gb_79r.speedlv = 76;
gb_79r.subpowlv = 87;
gb_79r.turnlv = 45;
gb_79r.locklv = 85;
gb_79r._defeq = null;
gb_79r._atteq = null;
gb_79r.wp1 = "MmissileX2_0";
gb_79r.wp2 = "Vulcan_0";
gb_79r.wp3 = "MPcannon_0";
gb_79r.wp4 = "TJ911_6";
gb_79r.wp5 = "BIfunnal_0";
gb_79r.wp6 = "DBCcannon_1";
gb_79r.wp7 = "ParaFunnal_0";
gb_79r.wp8 = "TJ911_12";
gb_79r.BDmod = null;
gb_79r.LGmod = null;
gb_79r.LAmod = null;
gb_79r.RAmod = null;
gb_79r.WImod = null;
gb_79r.MAmod = "mod_ma4";
gb_79r.mod = new Array();
if(_global[gb_79r.MAmod + "_1"] != undefined)
{
   gb_79r.mod = gb_79r.mod.concat(_global[gb_79r.MAmod + "_1"]);
}
_global.hx_78_2 = new Object();
hx_78_2._protype = "hx_78_2";
hx_78_2.$NAME = "元祖";
hx_78_2.$TYPE = "HX-78-2";
hx_78_2._type = "MS";
hx_78_2._size = "M";
hx_78_2.maxHP = 2100;
hx_78_2.maxEN = 2250;
hx_78_2._DF = 265;
hx_78_2.speedlv = 40;
hx_78_2.subpowlv = 53;
hx_78_2.turnlv = 50;
hx_78_2.locklv = 30;
hx_78_2._defeq = null;
hx_78_2._atteq = null;
hx_78_2.wp1 = "Hvulcan_0";
hx_78_2.wp2 = "Brifle_0";
hx_78_2.wp3 = "Bazooka_0";
hx_78_2.wp4 = "QiShe_1";
hx_78_2.wp5 = "null";
hx_78_2.wp6 = "Bsword_0";
hx_78_2.wp7 = "Mhammer_0";
hx_78_2.wp8 = "null";
hx_78_2.BDmod = "mod_bd1";
hx_78_2.LGmod = "mod_lg1";
hx_78_2.LAmod = "mod_la1";
hx_78_2.RAmod = "mod_ra1";
hx_78_2.WImod = "mod_wi6";
hx_78_2.SHDmod = "mod_shd4";
hx_78_2.MAmod = null;
hx_78_2.mod = new Array();
if(_global[hx_78_2.BDmod + "_1"] != undefined)
{
   hx_78_2.mod = hx_78_2.mod.concat(_global[hx_78_2.BDmod + "_1"]);
}
if(_global[hx_78_2.LGmod + "_1"] != undefined)
{
   hx_78_2.mod = hx_78_2.mod.concat(_global[hx_78_2.LGmod + "_1"]);
}
if(_global[hx_78_2.LAmod + "_1"] != undefined)
{
   hx_78_2.mod = hx_78_2.mod.concat(_global[hx_78_2.LAmod + "_1"]);
}
if(_global[hx_78_2.RAmod + "_1"] != undefined)
{
   hx_78_2.mod = hx_78_2.mod.concat(_global[hx_78_2.RAmod + "_1"]);
}
if(_global[hx_78_2.WImod + "_1"] != undefined)
{
   hx_78_2.mod = hx_78_2.mod.concat(_global[hx_78_2.WImod + "_1"]);
}
if(_global[hx_78_2.SHDmod + "_1"] != undefined)
{
   hx_78_2.mod = hx_78_2.mod.concat(_global[hx_78_2.SHDmod + "_1"]);
}
_global.hx_78_2r = new Object();
hx_78_2r._protype = "hx_78_2r";
hx_78_2r.$NAME = "白色恶魔";
hx_78_2r.$TYPE = "HX-78-2";
hx_78_2r._type = "MS";
hx_78_2r._size = "M";
hx_78_2r.maxHP = 2200;
hx_78_2r.maxEN = 2550;
hx_78_2r._DF = 265;
hx_78_2r.speedlv = 50;
hx_78_2r.subpowlv = 55;
hx_78_2r.turnlv = 55;
hx_78_2r.locklv = 50;
hx_78_2r._defeq = null;
hx_78_2r._atteq = null;
hx_78_2r.coreUnit = "hx_78_2b";
hx_78_2r.wp1 = "Hvulcan_0";
hx_78_2r.wp2 = "Brifle_0";
hx_78_2r.wp3 = "Dbazooka_0";
hx_78_2r.wp4 = "QiShe_1";
hx_78_2r.wp5 = "null";
hx_78_2r.wp6 = "Haxe_3";
hx_78_2r.wp7 = "Mhammer_0";
hx_78_2r.wp8 = "null";
hx_78_2r.BDmod = "mod_bd1";
hx_78_2r.LGmod = "mod_lg1";
hx_78_2r.LAmod = "mod_la1";
hx_78_2r.RAmod = "mod_ra1";
hx_78_2r.WImod = "mod_wi6";
hx_78_2r.SHDmod = "mod_shd4";
hx_78_2r.MAmod = null;
hx_78_2r.mod = new Array();
if(_global[hx_78_2r.BDmod + "_1"] != undefined)
{
   hx_78_2r.mod = hx_78_2r.mod.concat(_global[hx_78_2r.BDmod + "_1"]);
}
if(_global[hx_78_2r.LGmod + "_1"] != undefined)
{
   hx_78_2r.mod = hx_78_2r.mod.concat(_global[hx_78_2r.LGmod + "_1"]);
}
if(_global[hx_78_2r.LAmod + "_1"] != undefined)
{
   hx_78_2r.mod = hx_78_2r.mod.concat(_global[hx_78_2r.LAmod + "_1"]);
}
if(_global[hx_78_2r.RAmod + "_1"] != undefined)
{
   hx_78_2r.mod = hx_78_2r.mod.concat(_global[hx_78_2r.RAmod + "_1"]);
}
if(_global[hx_78_2r.WImod + "_1"] != undefined)
{
   hx_78_2r.mod = hx_78_2r.mod.concat(_global[hx_78_2r.WImod + "_1"]);
}
if(_global[hx_78_2r.SHDmod + "_1"] != undefined)
{
   hx_78_2r.mod = hx_78_2r.mod.concat(_global[hx_78_2r.SHDmod + "_1"]);
}
_global.hx_78_2b = new Object();
hx_78_2b._protype = "hx_78_2b";
hx_78_2b.$NAME = "白色恶魔最终形态";
hx_78_2b.$TYPE = "HX-78-2";
hx_78_2b._type = "TMS";
hx_78_2b._size = "M";
hx_78_2b.maxHP = 2100;
hx_78_2b.maxEN = 3250;
hx_78_2b._DF = 465;
hx_78_2b.speedlv = 70;
hx_78_2b.subpowlv = 73;
hx_78_2b.turnlv = 70;
hx_78_2b.locklv = 75;
hx_78_2b._DF2 = 465;
hx_78_2b.speedlv2 = 80;
hx_78_2b.subpowlv2 = 60;
hx_78_2b.turnlv2 = 70;
hx_78_2b.locklv2 = 75;
hx_78_2b._defeq = null;
hx_78_2b._atteq = null;
hx_78_2b.wp1 = "Boomerang_0";
hx_78_2b.wp2 = "Brifle_2";
hx_78_2b.wp3 = "Mhammer_0";
hx_78_2b.wp4 = "TJ911_9";
hx_78_2b.wp5 = "null";
hx_78_2b.wp6 = "Bsword_1";
hx_78_2b.wp7 = "null";
hx_78_2b.wp8 = "null";
hx_78_2b.BDmod = "mod_bd31";
hx_78_2b.LGmod = "mod_lg1";
hx_78_2b.LAmod = null;
hx_78_2b.RAmod = "mod_ra1";
hx_78_2b.WImod = "mod_wi6";
hx_78_2b.SHDmod = null;
hx_78_2b.MAmod = "mod_ma22";
hx_78_2b.mod = new Array();
if(_global[hx_78_2b.BDmod + "_1"] != undefined)
{
   hx_78_2b.mod = hx_78_2b.mod.concat(_global[hx_78_2b.BDmod + "_1"]);
}
if(_global[hx_78_2b.LGmod + "_1"] != undefined)
{
   hx_78_2b.mod = hx_78_2b.mod.concat(_global[hx_78_2b.LGmod + "_1"]);
}
if(_global[hx_78_2b.LAmod + "_1"] != undefined)
{
   hx_78_2b.mod = hx_78_2b.mod.concat(_global[hx_78_2b.LAmod + "_1"]);
}
if(_global[hx_78_2b.RAmod + "_1"] != undefined)
{
   hx_78_2b.mod = hx_78_2b.mod.concat(_global[hx_78_2b.RAmod + "_1"]);
}
if(_global[hx_78_2b.WImod + "_1"] != undefined)
{
   hx_78_2b.mod = hx_78_2b.mod.concat(_global[hx_78_2b.WImod + "_1"]);
}
if(_global[hx_78_2b.SHDmod + "_1"] != undefined)
{
   hx_78_2b.mod = hx_78_2b.mod.concat(_global[hx_78_2b.SHDmod + "_1"]);
}
_global.mx_06 = new Object();
mx_06._protype = "mx_06";
mx_06.$NAME = "宅古";
mx_06.$TYPE = "MX-06";
mx_06._type = "MS";
mx_06._size = "M";
mx_06.maxHP = 1520;
mx_06.maxEN = 1445;
mx_06._DF = 180;
mx_06.speedlv = 36;
mx_06.subpowlv = 38;
mx_06.turnlv = 35;
mx_06.locklv = 15;
mx_06._defeq = null;
mx_06._atteq = null;
mx_06.wp1 = "Haxe_0";
mx_06.wp2 = "Mgun120_0";
mx_06.wp3 = "Cannon150_1";
mx_06.wp4 = "TJ911_5";
mx_06.wp5 = "null";
mx_06.wp6 = "Bazooka_0";
mx_06.wp7 = "MmissileX3_0";
mx_06.wp8 = "null";
mx_06.BDmod = "mod_bd6";
mx_06.LGmod = "mod_lg5";
mx_06.LAmod = "mod_la6";
mx_06.RAmod = "mod_ra5";
mx_06.WImod = null;
mx_06.MAmod = null;
mx_06.mod = new Array();
if(_global[mx_06.BDmod + "_1"] != undefined)
{
   mx_06.mod = mx_06.mod.concat(_global[mx_06.BDmod + "_1"]);
}
if(_global[mx_06.LGmod + "_1"] != undefined)
{
   mx_06.mod = mx_06.mod.concat(_global[mx_06.LGmod + "_1"]);
}
if(_global[mx_06.LAmod + "_1"] != undefined)
{
   mx_06.mod = mx_06.mod.concat(_global[mx_06.LAmod + "_1"]);
}
if(_global[mx_06.RAmod + "_1"] != undefined)
{
   mx_06.mod = mx_06.mod.concat(_global[mx_06.RAmod + "_1"]);
}
if(_global[mx_06.WImod + "_1"] != undefined)
{
   mx_06.mod = mx_06.mod.concat(_global[mx_06.WImod + "_1"]);
}
_global.mx_07 = new Object();
mx_07._protype = "mx_07";
mx_07.$NAME = "力克古夫";
mx_07.$TYPE = "MX-07";
mx_07._type = "MS";
mx_07._size = "M";
mx_07.maxHP = 1620;
mx_07.maxEN = 1900;
mx_07._DF = 210;
mx_07.speedlv = 33;
mx_07.subpowlv = 39;
mx_07.turnlv = 50;
mx_07.locklv = 20;
mx_07._defeq = null;
mx_07._atteq = null;
mx_07.wp1 = "Hsaber_0";
mx_07.wp2 = "Mgun105_0";
mx_07.wp3 = "Hrod_1";
mx_07.wp4 = "TJ911_12";
mx_07.wp5 = "null";
mx_07.wp6 = "null";
mx_07.wp7 = "null";
mx_07.wp8 = "null";
mx_07.BDmod = "mod_bd10";
mx_07.LGmod = "mod_lg5";
mx_07.LAmod = "mod_la7";
mx_07.RAmod = "mod_ra7";
mx_07.WImod = null;
mx_07.SHDmod = "mod_shd11";
mx_07.MAmod = null;
mx_07.mod = new Array();
if(_global[mx_07.BDmod + "_1"] != undefined)
{
   mx_07.mod = mx_07.mod.concat(_global[mx_07.BDmod + "_1"]);
}
if(_global[mx_07.LGmod + "_1"] != undefined)
{
   mx_07.mod = mx_07.mod.concat(_global[mx_07.LGmod + "_1"]);
}
if(_global[mx_07.LAmod + "_1"] != undefined)
{
   mx_07.mod = mx_07.mod.concat(_global[mx_07.LAmod + "_1"]);
}
if(_global[mx_07.RAmod + "_1"] != undefined)
{
   mx_07.mod = mx_07.mod.concat(_global[mx_07.RAmod + "_1"]);
}
if(_global[mx_07.WImod + "_1"] != undefined)
{
   mx_07.mod = mx_07.mod.concat(_global[mx_07.WImod + "_1"]);
}
if(_global[mx_07.SHDmod + "_1"] != undefined)
{
   mx_07.mod = mx_07.mod.concat(_global[mx_07.SHDmod + "_1"]);
}
_global.mx_09 = new Object();
mx_09._protype = "mx_09";
mx_09.$NAME = "力克多目";
mx_09.$TYPE = "MX-09";
mx_09._type = "MS";
mx_09._size = "M";
mx_09.maxHP = 1640;
mx_09.maxEN = 2250;
mx_09._DF = 220;
mx_09.speedlv = 32;
mx_09.subpowlv = 43;
mx_09.turnlv = 16;
mx_09.locklv = 15;
mx_09._defeq = null;
mx_09._atteq = null;
mx_09.wp1 = "DBCcannon_2";
mx_09.wp2 = "Bbazooka_0";
mx_09.wp3 = "Dbazooka_0";
mx_09.wp4 = "TJ911_7";
mx_09.wp5 = "null";
mx_09.wp6 = "Hsaber_1";
mx_09.wp7 = "null";
mx_09.wp8 = "null";
mx_09.BDmod = "mod_bd11";
mx_09.LGmod = "mod_lg2";
mx_09.LAmod = "mod_la12";
mx_09.RAmod = "mod_ra12";
mx_09.WImod = "mod_wi24";
mx_09.MAmod = null;
mx_09.mod = new Array();
if(_global[mx_09.BDmod + "_1"] != undefined)
{
   mx_09.mod = mx_09.mod.concat(_global[mx_09.BDmod + "_1"]);
}
if(_global[mx_09.LGmod + "_1"] != undefined)
{
   mx_09.mod = mx_09.mod.concat(_global[mx_09.LGmod + "_1"]);
}
if(_global[mx_09.LAmod + "_1"] != undefined)
{
   mx_09.mod = mx_09.mod.concat(_global[mx_09.LAmod + "_1"]);
}
if(_global[mx_09.RAmod + "_1"] != undefined)
{
   mx_09.mod = mx_09.mod.concat(_global[mx_09.RAmod + "_1"]);
}
if(_global[mx_09.WImod + "_1"] != undefined)
{
   mx_09.mod = mx_09.mod.concat(_global[mx_09.WImod + "_1"]);
}
_global.mx_14 = new Object();
mx_14._protype = "mx_14";
mx_14.$NAME = "蛹式";
mx_14.$TYPE = "MX-14";
mx_14._type = "MS";
mx_14._size = "M";
mx_14.maxHP = 1820;
mx_14.maxEN = 1975;
mx_14._DF = 250;
mx_14.speedlv = 38;
mx_14.subpowlv = 53;
mx_14.turnlv = 50;
mx_14.locklv = 43;
mx_14._defeq = null;
mx_14._atteq = null;
mx_14.wp1 = "DBsaber_1";
mx_14.wp2 = "BeamgunX3_0";
mx_14.wp3 = "Bsniper_0";
mx_14.wp4 = "TJ911_4";
mx_14.wp5 = "null";
mx_14.wp6 = "Mgun90_0";
mx_14.wp7 = "Bazooka_0";
mx_14.wp8 = "null";
mx_14.BDmod = "mod_bd13";
mx_14.LGmod = "mod_lg5";
mx_14.LAmod = "mod_la16";
mx_14.RAmod = "mod_ra16";
mx_14.WImod = null;
mx_14.SHDmod = "mod_shd8";
mx_14.MAmod = null;
mx_14.mod = new Array();
if(_global[mx_14.BDmod + "_1"] != undefined)
{
   mx_14.mod = mx_14.mod.concat(_global[mx_14.BDmod + "_1"]);
}
if(_global[mx_14.LGmod + "_1"] != undefined)
{
   mx_14.mod = mx_14.mod.concat(_global[mx_14.LGmod + "_1"]);
}
if(_global[mx_14.LAmod + "_1"] != undefined)
{
   mx_14.mod = mx_14.mod.concat(_global[mx_14.LAmod + "_1"]);
}
if(_global[mx_14.RAmod + "_1"] != undefined)
{
   mx_14.mod = mx_14.mod.concat(_global[mx_14.RAmod + "_1"]);
}
if(_global[mx_14.WImod + "_1"] != undefined)
{
   mx_14.mod = mx_14.mod.concat(_global[mx_14.WImod + "_1"]);
}
if(_global[mx_14.SHDmod + "_1"] != undefined)
{
   mx_14.mod = mx_14.mod.concat(_global[mx_14.SHDmod + "_1"]);
}
_global.igm_79 = new Object();
igm_79._protype = "igm_79";
igm_79.$NAME = "积木";
igm_79.$TYPE = "IGM-79";
igm_79._type = "MS";
igm_79._size = "M";
igm_79.maxHP = 1490;
igm_79.maxEN = 1850;
igm_79._DF = 170;
igm_79.speedlv = 35;
igm_79.subpowlv = 30;
igm_79.turnlv = 40;
igm_79.locklv = 20;
igm_79._defeq = null;
igm_79._atteq = null;
igm_79.wp1 = "Hvulcan_0";
igm_79.wp2 = "Mgun90_0";
igm_79.wp3 = "Bazooka_0";
igm_79.wp4 = "TJ911_7";
igm_79.wp5 = "null";
igm_79.wp6 = "Bsword_0";
igm_79.wp7 = "MmissileX4_0";
igm_79.wp8 = "null";
igm_79.BDmod = "mod_bd12";
igm_79.LGmod = "mod_lg1";
igm_79.LAmod = "mod_la1";
igm_79.RAmod = "mod_ra1";
igm_79.SHDmod = "mod_shd4";
igm_79.WImod = null;
igm_79.MAmod = null;
igm_79.mod = new Array();
if(_global[igm_79.BDmod + "_1"] != undefined)
{
   igm_79.mod = igm_79.mod.concat(_global[igm_79.BDmod + "_1"]);
}
if(_global[igm_79.LGmod + "_1"] != undefined)
{
   igm_79.mod = igm_79.mod.concat(_global[igm_79.LGmod + "_1"]);
}
if(_global[igm_79.LAmod + "_1"] != undefined)
{
   igm_79.mod = igm_79.mod.concat(_global[igm_79.LAmod + "_1"]);
}
if(_global[igm_79.RAmod + "_1"] != undefined)
{
   igm_79.mod = igm_79.mod.concat(_global[igm_79.RAmod + "_1"]);
}
if(_global[igm_79.WImod + "_1"] != undefined)
{
   igm_79.mod = igm_79.mod.concat(_global[igm_79.WImod + "_1"]);
}
if(_global[igm_79.SHDmod + "_1"] != undefined)
{
   igm_79.mod = igm_79.mod.concat(_global[igm_79.SHDmod + "_1"]);
}
_global.igm_89 = new Object();
igm_89._protype = "igm_89";
igm_89.$NAME = "积钢";
igm_89.$TYPE = "IGM-89";
igm_89._type = "MS";
igm_89._size = "M";
igm_89.maxHP = 2490;
igm_89.maxEN = 2850;
igm_89._DF = 210;
igm_89.speedlv = 55;
igm_89.subpowlv = 50;
igm_89.turnlv = 60;
igm_89.locklv = 40;
igm_89._defeq = null;
igm_89._atteq = null;
igm_89.wp1 = "Hvulcan_1";
igm_89.wp2 = "Brifle_0";
igm_89.wp3 = "MmissileX3_0";
igm_89.wp4 = "TJ911_3";
igm_89.wp5 = "CbombX4_0";
igm_89.wp6 = "Bsword_0";
igm_89.wp7 = "null";
igm_89.wp8 = "null";
igm_89.BDmod = "mod_bd25";
igm_89.LGmod = "mod_lg7";
igm_89.LAmod = "mod_la12";
igm_89.RAmod = "mod_ra12";
igm_89.WImod = "mod_wi10";
igm_89.SHDmod = "mod_shd5";
igm_89.MAmod = null;
igm_89.mod = new Array();
if(_global[igm_89.BDmod + "_1"] != undefined)
{
   igm_89.mod = igm_89.mod.concat(_global[igm_89.BDmod + "_1"]);
}
if(_global[igm_89.LGmod + "_1"] != undefined)
{
   igm_89.mod = igm_89.mod.concat(_global[igm_89.LGmod + "_1"]);
}
if(_global[igm_89.LAmod + "_1"] != undefined)
{
   igm_89.mod = igm_89.mod.concat(_global[igm_89.LAmod + "_1"]);
}
if(_global[igm_89.RAmod + "_1"] != undefined)
{
   igm_89.mod = igm_89.mod.concat(_global[igm_89.RAmod + "_1"]);
}
if(_global[igm_89.WImod + "_1"] != undefined)
{
   igm_89.mod = igm_89.mod.concat(_global[igm_89.WImod + "_1"]);
}
if(_global[igm_89.SHDmod + "_1"] != undefined)
{
   igm_89.mod = igm_89.mod.concat(_global[igm_89.SHDmod + "_1"]);
}
_global.igm_89s = new Object();
igm_89s._protype = "igm_89s";
igm_89s.$NAME = "积钢队长";
igm_89s.$TYPE = "IGM-89S";
igm_89s._type = "MS";
igm_89s._size = "M";
igm_89s.maxHP = 2990;
igm_89s.maxEN = 2850;
igm_89s._DF = 440;
igm_89s.speedlv = 78;
igm_89s.subpowlv = 85;
igm_89s.turnlv = 75;
igm_89s.locklv = 67;
igm_89s._defeq = null;
igm_89s._atteq = null;
igm_89s.coreUnit = "igm_89sr";
igm_89s.wp1 = "MmissileX3_0";
igm_89s.wp2 = "Hvulcan_2";
igm_89s.wp3 = "Cannon150_2";
igm_89s.wp4 = "TJ911_7";
igm_89s.wp5 = "SmissileX3_0";
igm_89s.wp6 = "Bsword_1";
igm_89s.wp7 = "Shootgun_0";
igm_89s.wp8 = "QiShe_4";
igm_89s.BDmod = "mod_bd25";
igm_89s.LGmod = "mod_lg5";
igm_89s.LAmod = "mod_la12";
igm_89s.RAmod = "mod_ra12";
igm_89s.WImod = "mod_wi22";
igm_89s.MAmod = null;
igm_89s.mod = new Array();
if(_global[igm_89s.BDmod + "_1"] != undefined)
{
   igm_89s.mod = igm_89s.mod.concat(_global[igm_89s.BDmod + "_1"]);
}
if(_global[igm_89s.LGmod + "_1"] != undefined)
{
   igm_89s.mod = igm_89s.mod.concat(_global[igm_89s.LGmod + "_1"]);
}
if(_global[igm_89s.LAmod + "_1"] != undefined)
{
   igm_89s.mod = igm_89s.mod.concat(_global[igm_89s.LAmod + "_1"]);
}
if(_global[igm_89s.RAmod + "_1"] != undefined)
{
   igm_89s.mod = igm_89s.mod.concat(_global[igm_89s.RAmod + "_1"]);
}
if(_global[igm_89s.WImod + "_1"] != undefined)
{
   igm_89s.mod = igm_89s.mod.concat(_global[igm_89s.WImod + "_1"]);
}
_global.igm_89sr = new Object();
igm_89sr._protype = "igm_89sr";
igm_89sr.$NAME = "队长";
igm_89sr.$TYPE = "IGM-89S";
igm_89sr._type = "MS";
igm_89sr._size = "M";
igm_89sr.maxHP = 3990;
igm_89sr.maxEN = 3850;
igm_89sr._DF = 540;
igm_89sr.speedlv = 83;
igm_89sr.subpowlv = 90;
igm_89sr.turnlv = 80;
igm_89sr.locklv = 72;
igm_89sr._defeq = null;
igm_89sr._atteq = null;
igm_89sr.wp1 = "Boomerang_0";
igm_89sr.wp2 = "Hvulcan_2";
igm_89sr.wp3 = "Bsaber_1";
igm_89sr.wp4 = "TJ911_10";
igm_89sr.wp5 = "null";
igm_89sr.wp6 = "null";
igm_89sr.wp7 = "null";
igm_89sr.wp8 = "null";
igm_89sr.BDmod = "mod_bd25";
igm_89sr.LGmod = "mod_lg5";
igm_89sr.LAmod = "mod_la12";
igm_89sr.RAmod = "mod_ra12";
igm_89sr.WImod = null;
igm_89sr.MAmod = null;
igm_89sr.mod = new Array();
if(_global[igm_89sr.BDmod + "_1"] != undefined)
{
   igm_89sr.mod = igm_89sr.mod.concat(_global[igm_89sr.BDmod + "_1"]);
}
if(_global[igm_89sr.LGmod + "_1"] != undefined)
{
   igm_89sr.mod = igm_89sr.mod.concat(_global[igm_89sr.LGmod + "_1"]);
}
if(_global[igm_89sr.LAmod + "_1"] != undefined)
{
   igm_89sr.mod = igm_89sr.mod.concat(_global[igm_89sr.LAmod + "_1"]);
}
if(_global[igm_89sr.RAmod + "_1"] != undefined)
{
   igm_89sr.mod = igm_89sr.mod.concat(_global[igm_89sr.RAmod + "_1"]);
}
if(_global[igm_89sr.WImod + "_1"] != undefined)
{
   igm_89sr.mod = igm_89sr.mod.concat(_global[igm_89sr.WImod + "_1"]);
}
_global.hx_93 = new Object();
hx_93._protype = "hx_93";
hx_93.$NAME = "牛";
hx_93.$TYPE = "HX-93";
hx_93._type = "MS";
hx_93._size = "M";
hx_93.maxHP = 3130;
hx_93.maxEN = 4535;
hx_93._DF = 415;
hx_93.speedlv = 85;
hx_93.subpowlv = 68;
hx_93.turnlv = 65;
hx_93.locklv = 89;
hx_93._defeq = null;
hx_93._atteq = null;
hx_93.wp1 = "Hvulcan_0";
hx_93.wp2 = "Brifle_2";
hx_93.wp3 = "FIfunnal_0";
hx_93.wp4 = "FunnalEX_0";
hx_93.wp5 = "MmissileX2_0";
hx_93.wp6 = "Bsword_0";
hx_93.wp7 = "Bazooka_1";
hx_93.wp8 = "TJ911_4";
hx_93.BDmod = "mod_bd1";
hx_93.LGmod = "mod_lg1";
hx_93.LAmod = "mod_la1";
hx_93.RAmod = "mod_ra1";
hx_93.WImod = "mod_wi11";
hx_93.SHDmod = "mod_shd7";
hx_93.MAmod = null;
hx_93.mod = new Array();
if(_global[hx_93.BDmod + "_1"] != undefined)
{
   hx_93.mod = hx_93.mod.concat(_global[hx_93.BDmod + "_1"]);
}
if(_global[hx_93.LGmod + "_1"] != undefined)
{
   hx_93.mod = hx_93.mod.concat(_global[hx_93.LGmod + "_1"]);
}
if(_global[hx_93.LAmod + "_1"] != undefined)
{
   hx_93.mod = hx_93.mod.concat(_global[hx_93.LAmod + "_1"]);
}
if(_global[hx_93.RAmod + "_1"] != undefined)
{
   hx_93.mod = hx_93.mod.concat(_global[hx_93.RAmod + "_1"]);
}
if(_global[hx_93.WImod + "_1"] != undefined)
{
   hx_93.mod = hx_93.mod.concat(_global[hx_93.WImod + "_1"]);
}
if(_global[hx_93.SHDmod + "_1"] != undefined)
{
   hx_93.mod = hx_93.mod.concat(_global[hx_93.SHDmod + "_1"]);
}
_global.hx_93_2 = new Object();
hx_93_2._protype = "hx_93_2";
hx_93_2.$NAME = "海牛";
hx_93_2.$TYPE = "HX-93-2";
hx_93_2._type = "MS";
hx_93_2._size = "M";
hx_93_2.maxHP = 3530;
hx_93_2.maxEN = 4720;
hx_93_2._DF = 430;
hx_93_2.speedlv = 84;
hx_93_2.subpowlv = 67;
hx_93_2.turnlv = 75;
hx_93_2.locklv = 91;
hx_93_2._defeq = null;
hx_93_2._atteq = null;
hx_93_2.wp1 = "Bsword_1";
hx_93_2.wp2 = "Brifle_2";
hx_93_2.wp3 = "Bazooka_1";
hx_93_2.wp4 = "QiShe_0";
hx_93_2.wp5 = "Hvulcan_0";
hx_93_2.wp6 = "MBcannon_0";
hx_93_2.wp7 = "FIfunnal_0";
hx_93_2.wp8 = "FunnalEX_0";
hx_93_2.BDmod = "mod_bd1";
hx_93_2.LGmod = "mod_lg1";
hx_93_2.LAmod = "mod_la1";
hx_93_2.RAmod = "mod_ra1";
hx_93_2.WImod = "mod_wi9";
hx_93_2.SHDmod = "mod_shd7";
hx_93_2.MAmod = null;
hx_93_2.mod = new Array();
if(_global[hx_93_2.BDmod + "_1"] != undefined)
{
   hx_93_2.mod = hx_93_2.mod.concat(_global[hx_93_2.BDmod + "_1"]);
}
if(_global[hx_93_2.LGmod + "_1"] != undefined)
{
   hx_93_2.mod = hx_93_2.mod.concat(_global[hx_93_2.LGmod + "_1"]);
}
if(_global[hx_93_2.LAmod + "_1"] != undefined)
{
   hx_93_2.mod = hx_93_2.mod.concat(_global[hx_93_2.LAmod + "_1"]);
}
if(_global[hx_93_2.RAmod + "_1"] != undefined)
{
   hx_93_2.mod = hx_93_2.mod.concat(_global[hx_93_2.RAmod + "_1"]);
}
if(_global[hx_93_2.WImod + "_1"] != undefined)
{
   hx_93_2.mod = hx_93_2.mod.concat(_global[hx_93_2.WImod + "_1"]);
}
if(_global[hx_93_2.SHDmod + "_1"] != undefined)
{
   hx_93_2.mod = hx_93_2.mod.concat(_global[hx_93_2.SHDmod + "_1"]);
}
_global.mxn_04_2 = new Object();
mxn_04_2._protype = "mxn_04_2";
mxn_04_2.$NAME = "夜莺";
mxn_04_2.$TYPE = "MXN-04-2";
mxn_04_2._type = "MS";
mxn_04_2._size = "M";
mxn_04_2.maxHP = 4900;
mxn_04_2.maxEN = 5200;
mxn_04_2._DF = 540;
mxn_04_2.speedlv = 90;
mxn_04_2.subpowlv = 57;
mxn_04_2.turnlv = 68;
mxn_04_2.locklv = 87;
mxn_04_2._defeq = null;
mxn_04_2._atteq = null;
mxn_04_2.wp1 = "MmissileX3_1";
mxn_04_2.wp2 = "Bshootgun_0";
mxn_04_2.wp3 = "MPcannon_1";
mxn_04_2.wp4 = "QiShe_1";
mxn_04_2.wp5 = "Wclaw_1";
mxn_04_2.wp6 = "BsaberX4_0";
mxn_04_2.wp7 = "FunnalX5_0";
mxn_04_2.wp8 = "FunnalEX_0";
mxn_04_2.BDmod = "mod_Sbd1";
mxn_04_2.LGmod = "mod_Slg1";
mxn_04_2.LAmod = "mod_Sla1";
mxn_04_2.RAmod = "mod_Sra1";
mxn_04_2.WImod = "mod_Swi1";
mxn_04_2.SHDmod = "mod_shd6";
mxn_04_2.MAmod = null;
mxn_04_2.mod = new Array();
if(_global[mxn_04_2.BDmod + "_1"] != undefined)
{
   mxn_04_2.mod = mxn_04_2.mod.concat(_global[mxn_04_2.BDmod + "_1"]);
}
if(_global[mxn_04_2.LGmod + "_1"] != undefined)
{
   mxn_04_2.mod = mxn_04_2.mod.concat(_global[mxn_04_2.LGmod + "_1"]);
}
if(_global[mxn_04_2.LAmod + "_1"] != undefined)
{
   mxn_04_2.mod = mxn_04_2.mod.concat(_global[mxn_04_2.LAmod + "_1"]);
}
if(_global[mxn_04_2.RAmod + "_1"] != undefined)
{
   mxn_04_2.mod = mxn_04_2.mod.concat(_global[mxn_04_2.RAmod + "_1"]);
}
if(_global[mxn_04_2.WImod + "_1"] != undefined)
{
   mxn_04_2.mod = mxn_04_2.mod.concat(_global[mxn_04_2.WImod + "_1"]);
}
if(_global[mxn_04_2.SHDmod + "_1"] != undefined)
{
   mxn_04_2.mod = mxn_04_2.mod.concat(_global[mxn_04_2.SHDmod + "_1"]);
}
_global.emx_002 = new Object();
emx_002._protype = "emx_002";
emx_002.$NAME = "螳螂";
emx_002.$TYPE = "EMX-002";
emx_002._type = "MA";
emx_002._size = "L";
emx_002.maxHP = 6300;
emx_002.maxEN = 3980;
emx_002._DF = 625;
emx_002.speedlv = 75;
emx_002.subpowlv = 45;
emx_002.turnlv = 60;
emx_002.locklv = 66;
emx_002._defeq = "IF";
emx_002._atteq = null;
emx_002.wp1 = "MmissileX3_0";
emx_002.wp2 = "BcannonX6_0";
emx_002.wp3 = "Wincom_1";
emx_002.wp4 = "TJ911_2";
emx_002.wp5 = "MPcannon_1";
emx_002.wp6 = "LBswordX2_0";
emx_002.wp7 = "Wclaw_0";
emx_002.wp8 = "TJ911_12";
emx_002.BDmod = null;
emx_002.LGmod = null;
emx_002.LAmod = null;
emx_002.RAmod = null;
emx_002.WImod = null;
emx_002.MAmod = "mod_ma3";
emx_002.mod = new Array();
if(_global[emx_002.MAmod + "_1"] != undefined)
{
   emx_002.mod = emx_002.mod.concat(_global[emx_002.MAmod + "_1"]);
}
_global.mxn_02 = new Object();
mxn_02._protype = "mxn_02";
mxn_02.$NAME = "囧号";
mxn_02.$TYPE = "MXN-02";
mxn_02._type = "HMS";
mxn_02._size = "M";
mxn_02.maxHP = 3140;
mxn_02.maxEN = 3030;
mxn_02._DF = 275;
mxn_02.speedlv = 50;
mxn_02.subpowlv = 38;
mxn_02.turnlv = 12;
mxn_02.locklv = 70;
mxn_02._defeq = null;
mxn_02._atteq = null;
mxn_02.coreUnit = "mxn_02s";
mxn_02.wp1 = "BcannonX2_1";
mxn_02.wp2 = "BcannonX5_0";
mxn_02.wp3 = "MPcannon_0";
mxn_02.wp4 = "QiShe_1";
mxn_02.wp5 = "null";
mxn_02.wp6 = "Wincom_0";
mxn_02.wp7 = "DBCcannon_0";
mxn_02.wp8 = "null";
mxn_02.BDmod = null;
mxn_02.LGmod = null;
mxn_02.LAmod = null;
mxn_02.RAmod = null;
mxn_02.WImod = null;
mxn_02.MAmod = "mod_ma5";
mxn_02.mod = new Array();
if(_global[mxn_02.MAmod + "_1"] != undefined)
{
   mxn_02.mod = mxn_02.mod.concat(_global[mxn_02.MAmod + "_1"]);
}
_global.mxn_02s = new Object();
mxn_02s._protype = "mxn_02s";
mxn_02s.$NAME = "囧头";
mxn_02s.$TYPE = "MXN-02S";
mxn_02s._type = "MP";
mxn_02s._size = "S";
mxn_02s.maxHP = 1500;
mxn_02s.maxEN = 2250;
mxn_02s._DF = 135;
mxn_02s.speedlv = 63;
mxn_02s.subpowlv = 75;
mxn_02s.turnlv = 72;
mxn_02s.locklv = 66;
mxn_02s._defeq = null;
mxn_02s._atteq = null;
mxn_02s.wp1 = "DBCcannon_1";
mxn_02s.wp2 = "MBcannon_1";
mxn_02s.wp3 = "MPcannon_2";
mxn_02s.wp4 = "TJ911_8";
mxn_02s.wp5 = "null";
mxn_02s.wp6 = "null";
mxn_02s.wp7 = "null";
mxn_02s.wp8 = "null";
mxn_02s.BDmod = null;
mxn_02s.LGmod = null;
mxn_02s.LAmod = null;
mxn_02s.RAmod = null;
mxn_02s.WImod = null;
mxn_02s.MAmod = "mod_ma12";
mxn_02s.mod = new Array();
if(_global[mxn_02s.MAmod + "_1"] != undefined)
{
   mxn_02s.mod = mxn_02s.mod.concat(_global[mxn_02s.MAmod + "_1"]);
}
_global.eg_02 = new Object();
eg_02._protype = "eg_02";
eg_02.$NAME = "鸡皮二";
eg_02.$TYPE = "EG-02";
eg_02._type = "MS";
eg_02._size = "M";
eg_02.maxHP = 2600;
eg_02.maxEN = 2900;
eg_02._DF = 420;
eg_02.speedlv = 56;
eg_02.subpowlv = 47;
eg_02.turnlv = 56;
eg_02.locklv = 53;
eg_02._defeq = null;
eg_02._atteq = null;
eg_02.wp1 = "Hvulcan_0";
eg_02.wp2 = "Bbazooka_0";
eg_02.wp3 = "Abazooka_0";
eg_02.wp4 = "TJ911_4";
eg_02.wp5 = "null";
eg_02.wp6 = "Bsaber_0";
eg_02.wp7 = "MmissileX3_0";
eg_02.wp8 = "null";
eg_02.BDmod = "mod_bd2";
eg_02.LGmod = "mod_lg2";
eg_02.LAmod = "mod_la1";
eg_02.RAmod = "mod_ra1";
eg_02.WImod = "mod_wi2";
eg_02.SHDmod = "mod_shd9";
eg_02.MAmod = null;
eg_02.mod = new Array();
if(_global[eg_02.BDmod + "_1"] != undefined)
{
   eg_02.mod = eg_02.mod.concat(_global[eg_02.BDmod + "_1"]);
}
if(_global[eg_02.LGmod + "_1"] != undefined)
{
   eg_02.mod = eg_02.mod.concat(_global[eg_02.LGmod + "_1"]);
}
if(_global[eg_02.LAmod + "_1"] != undefined)
{
   eg_02.mod = eg_02.mod.concat(_global[eg_02.LAmod + "_1"]);
}
if(_global[eg_02.RAmod + "_1"] != undefined)
{
   eg_02.mod = eg_02.mod.concat(_global[eg_02.RAmod + "_1"]);
}
if(_global[eg_02.WImod + "_1"] != undefined)
{
   eg_02.mod = eg_02.mod.concat(_global[eg_02.WImod + "_1"]);
}
if(_global[eg_02.SHDmod + "_1"] != undefined)
{
   eg_02.mod = eg_02.mod.concat(_global[eg_02.SHDmod + "_1"]);
}
_global.eg_01 = new Object();
eg_01._protype = "eg_01";
eg_01.$NAME = "鸡皮一";
eg_01.$TYPE = "EG-01";
eg_01._type = "MS";
eg_01._size = "M";
eg_01.maxHP = 2200;
eg_01.maxEN = 3000;
eg_01._DF = 290;
eg_01.speedlv = 65;
eg_01.subpowlv = 53;
eg_01.turnlv = 68;
eg_01.locklv = 50;
eg_01._defeq = null;
eg_01._atteq = null;
eg_01.wp1 = "Hvulcan_0";
eg_01.wp2 = "Brifle_0";
eg_01.wp3 = "Bsniper_0";
eg_01.wp4 = "TJ911_3";
eg_01.wp5 = "null";
eg_01.wp6 = "Bsword_0";
eg_01.wp7 = "null";
eg_01.wp8 = "null";
eg_01.BDmod = "mod_bd1";
eg_01.LGmod = "mod_lg1";
eg_01.LAmod = "mod_la13";
eg_01.RAmod = "mod_ra13";
eg_01.WImod = "mod_wi1";
eg_01.SHDmod = "mod_shd5";
eg_01.MAmod = null;
eg_01.mod = new Array();
if(_global[eg_01.BDmod + "_1"] != undefined)
{
   eg_01.mod = eg_01.mod.concat(_global[eg_01.BDmod + "_1"]);
}
if(_global[eg_01.LGmod + "_1"] != undefined)
{
   eg_01.mod = eg_01.mod.concat(_global[eg_01.LGmod + "_1"]);
}
if(_global[eg_01.LAmod + "_1"] != undefined)
{
   eg_01.mod = eg_01.mod.concat(_global[eg_01.LAmod + "_1"]);
}
if(_global[eg_01.RAmod + "_1"] != undefined)
{
   eg_01.mod = eg_01.mod.concat(_global[eg_01.RAmod + "_1"]);
}
if(_global[eg_01.WImod + "_1"] != undefined)
{
   eg_01.mod = eg_01.mod.concat(_global[eg_01.WImod + "_1"]);
}
if(_global[eg_01.SHDmod + "_1"] != undefined)
{
   eg_01.mod = eg_01.mod.concat(_global[eg_01.SHDmod + "_1"]);
}
_global.emx_004 = new Object();
emx_004._protype = "emx_004";
emx_004.$NAME = "纯白卡";
emx_004.$TYPE = "EMX-004";
emx_004._type = "MS";
emx_004._size = "M";
emx_004.maxHP = 2320;
emx_004.maxEN = 3145;
emx_004._DF = 250;
emx_004.speedlv = 78;
emx_004.subpowlv = 68;
emx_004.turnlv = 24;
emx_004.locklv = 80;
emx_004._defeq = null;
emx_004._atteq = null;
emx_004.wp1 = "Hrod_1";
emx_004.wp2 = "BeamgunX2_0";
emx_004.wp3 = "Funnal_0";
emx_004.wp4 = "FunnalEX_0";
emx_004.wp5 = "null";
emx_004.wp6 = "BsaberX2_0";
emx_004.wp7 = "null";
emx_004.wp8 = "TJ911_12";
emx_004.BDmod = "mod_bd5";
emx_004.LGmod = "mod_lg4";
emx_004.LAmod = "mod_la4";
emx_004.RAmod = "mod_ra4";
emx_004.WImod = "mod_wi5";
emx_004.MAmod = null;
emx_004.mod = new Array();
if(_global[emx_004.BDmod + "_1"] != undefined)
{
   emx_004.mod = emx_004.mod.concat(_global[emx_004.BDmod + "_1"]);
}
if(_global[emx_004.LGmod + "_1"] != undefined)
{
   emx_004.mod = emx_004.mod.concat(_global[emx_004.LGmod + "_1"]);
}
if(_global[emx_004.LAmod + "_1"] != undefined)
{
   emx_004.mod = emx_004.mod.concat(_global[emx_004.LAmod + "_1"]);
}
if(_global[emx_004.RAmod + "_1"] != undefined)
{
   emx_004.mod = emx_004.mod.concat(_global[emx_004.RAmod + "_1"]);
}
if(_global[emx_004.WImod + "_1"] != undefined)
{
   emx_004.mod = emx_004.mod.concat(_global[emx_004.WImod + "_1"]);
}
_global.emx_004g = new Object();
emx_004g._protype = "emx_004g";
emx_004g.$NAME = "亮卡";
emx_004g.$TYPE = "EMX-004G";
emx_004g._type = "MS";
emx_004g._size = "M";
emx_004g.maxHP = 2450;
emx_004g.maxEN = 3300;
emx_004g._DF = 230;
emx_004g.speedlv = 71;
emx_004g.subpowlv = 62;
emx_004g.turnlv = 33;
emx_004g.locklv = 57;
emx_004g._defeq = null;
emx_004g._atteq = null;
emx_004g.wp1 = "Bsaber_0";
emx_004g.wp2 = "BeamgunX2_0";
emx_004g.wp3 = "Funnal_0";
emx_004g.wp4 = "TJ911_4";
emx_004g.wp5 = "null";
emx_004g.wp6 = "BcannonX2_1";
emx_004g.wp7 = "null";
emx_004g.wp8 = "null";
emx_004g.BDmod = "mod_bd29";
emx_004g.LGmod = "mod_lg4";
emx_004g.LAmod = "mod_la4";
emx_004g.RAmod = "mod_ra4";
emx_004g.WImod = "mod_wi5";
emx_004g.MAmod = null;
emx_004g.mod = new Array();
if(_global[emx_004g.BDmod + "_1"] != undefined)
{
   emx_004g.mod = emx_004g.mod.concat(_global[emx_004g.BDmod + "_1"]);
}
if(_global[emx_004g.LGmod + "_1"] != undefined)
{
   emx_004g.mod = emx_004g.mod.concat(_global[emx_004g.LGmod + "_1"]);
}
if(_global[emx_004g.LAmod + "_1"] != undefined)
{
   emx_004g.mod = emx_004g.mod.concat(_global[emx_004g.LAmod + "_1"]);
}
if(_global[emx_004g.RAmod + "_1"] != undefined)
{
   emx_004g.mod = emx_004g.mod.concat(_global[emx_004g.RAmod + "_1"]);
}
if(_global[emx_004g.WImod + "_1"] != undefined)
{
   emx_004g.mod = emx_004g.mod.concat(_global[emx_004g.WImod + "_1"]);
}
_global.sp_02a = new Object();
sp_02a._protype = "sp_02a";
sp_02a.$NAME = "钢桶";
sp_02a.$TYPE = "SP-02A";
sp_02a._type = "MP";
sp_02a._size = "S";
sp_02a.maxHP = 1210;
sp_02a.maxEN = 890;
sp_02a._DF = 110;
sp_02a.speedlv = 32;
sp_02a.subpowlv = 40;
sp_02a.turnlv = 35;
sp_02a.locklv = 26;
sp_02a._defeq = null;
sp_02a._atteq = null;
sp_02a.wp1 = "MmissileX1_0";
sp_02a.wp2 = "Mgun75_0";
sp_02a.wp3 = "BazookaX2_0";
sp_02a.wp4 = "TJ911_7";
sp_02a.wp5 = "null";
sp_02a.wp6 = "null";
sp_02a.wp7 = "null";
sp_02a.wp8 = "null";
sp_02a.BDmod = null;
sp_02a.LGmod = null;
sp_02a.LAmod = null;
sp_02a.RAmod = null;
sp_02a.WImod = null;
sp_02a.MAmod = "mod_ma7";
sp_02a.mod = new Array();
if(_global[sp_02a.MAmod + "_1"] != undefined)
{
   sp_02a.mod = sp_02a.mod.concat(_global[sp_02a.MAmod + "_1"]);
}
_global.mz_333 = new Object();
mz_333._protype = "mz_333";
mz_333.$NAME = "猥琐龙";
mz_333.$TYPE = "MZ-333";
mz_333._type = "MA";
mz_333._size = "L";
mz_333.maxHP = 7100;
mz_333.maxEN = 4980;
mz_333._DF = 525;
mz_333.speedlv = 68;
mz_333.subpowlv = 46;
mz_333.turnlv = 25;
mz_333.locklv = 52;
mz_333._defeq = "IF";
mz_333._atteq = null;
mz_333.wp1 = "MmissileX5_0";
mz_333.wp2 = "DBCcannon_0";
mz_333.wp3 = "MPcannon_0";
mz_333.wp4 = "RefDBCcannon_0";
mz_333.wp5 = "Dincom_0";
mz_333.wp6 = "HDBCcannon_0";
mz_333.wp7 = "FunnalX5_0";
mz_333.wp8 = "FunnalEX_0";
mz_333.BDmod = null;
mz_333.LGmod = null;
mz_333.LAmod = null;
mz_333.RAmod = null;
mz_333.WImod = null;
mz_333.MAmod = "mod_ma6";
mz_333.mod = new Array();
if(_global[mz_333.MAmod + "_1"] != undefined)
{
   mz_333.mod = mz_333.mod.concat(_global[mz_333.MAmod + "_1"]);
}
_global.mxz_06 = new Object();
mxz_06._protype = "mxz_06";
mxz_06.$NAME = "贼头";
mxz_06.$TYPE = "MXZ-06";
mxz_06._type = "TMS";
mxz_06._size = "M";
mxz_06.maxHP = 2760;
mxz_06.maxEN = 3400;
mxz_06._DF = 260;
mxz_06.speedlv = 70;
mxz_06.subpowlv = 64;
mxz_06.turnlv = 72;
mxz_06.locklv = 60;
mxz_06._DF2 = 305;
mxz_06.speedlv2 = 88;
mxz_06.subpowlv2 = 6;
mxz_06.turnlv2 = 39;
mxz_06.locklv2 = 60;
mxz_06._defeq = null;
mxz_06._atteq = null;
mxz_06.wp1 = "Hvulcan_0";
mxz_06.wp2 = "Brifle_1";
mxz_06.wp3 = "Bsniper_0";
mxz_06.wp4 = "TJ911_0";
mxz_06.wp5 = "MmissileX2_0";
mxz_06.wp6 = "Bsaber_0";
mxz_06.wp7 = "null";
mxz_06.wp8 = "SBsword_0";
mxz_06.BDmod = "mod_bd8";
mxz_06.LGmod = "mod_lg7";
mxz_06.LAmod = "mod_la9";
mxz_06.RAmod = "mod_ra9";
mxz_06.WImod = "mod_wi8";
mxz_06.SHDmod = "mod_shd10";
mxz_06.MAmod = "mod_ma9";
mxz_06.mod = new Array();
if(_global[mxz_06.BDmod + "_1"] != undefined)
{
   mxz_06.mod = mxz_06.mod.concat(_global[mxz_06.BDmod + "_1"]);
}
if(_global[mxz_06.LGmod + "_1"] != undefined)
{
   mxz_06.mod = mxz_06.mod.concat(_global[mxz_06.LGmod + "_1"]);
}
if(_global[mxz_06.LAmod + "_1"] != undefined)
{
   mxz_06.mod = mxz_06.mod.concat(_global[mxz_06.LAmod + "_1"]);
}
if(_global[mxz_06.RAmod + "_1"] != undefined)
{
   mxz_06.mod = mxz_06.mod.concat(_global[mxz_06.RAmod + "_1"]);
}
if(_global[mxz_06.WImod + "_1"] != undefined)
{
   mxz_06.mod = mxz_06.mod.concat(_global[mxz_06.WImod + "_1"]);
}
if(_global[mxz_06.SHDmod + "_1"] != undefined)
{
   mxz_06.mod = mxz_06.mod.concat(_global[mxz_06.SHDmod + "_1"]);
}
_global.sm_04 = new Object();
sm_04._protype = "sm_04";
sm_04.$NAME = "木塞巡洋舰";
sm_04.$TYPE = "SM-04";
sm_04._type = "SC";
sm_04._size = "L";
sm_04.maxHP = 7560;
sm_04.maxEN = 5650;
sm_04._DF = 470;
sm_04.speedlv = 35;
sm_04.subpowlv = 15;
sm_04.turnlv = 58;
sm_04.locklv = 16;
sm_04._defeq = null;
sm_04._atteq = null;
sm_04.wp1 = "BmachinegunX8_0";
sm_04.wp2 = "BcannonX2_2";
sm_04.wp3 = "SmissileX1_0";
sm_04.wp4 = "QiShe_0";
sm_04.wp5 = "FlyDog_0";
sm_04.wp7 = "null";
sm_04.wp7 = "null";
sm_04.wp8 = "null";
sm_04.BDmod = null;
sm_04.LGmod = null;
sm_04.LAmod = null;
sm_04.RAmod = null;
sm_04.WImod = null;
sm_04.MAmod = "mod_ma8";
sm_04.mod = new Array();
if(_global[sm_04.MAmod + "_1"] != undefined)
{
   sm_04.mod = sm_04.mod.concat(_global[sm_04.MAmod + "_1"]);
}
_global.egx_04rFA = new Object();
egx_04rFA._protype = "egx_04rFA";
egx_04rFA.$NAME = "全装甲角马·改";
egx_04rFA.$TYPE = "EGX-04rFA";
egx_04rFA._type = "MS";
egx_04rFA._size = "M";
egx_04rFA.maxHP = 3450;
egx_04rFA.maxEN = 3650;
egx_04rFA._DF = 720;
egx_04rFA.speedlv = 72;
egx_04rFA.subpowlv = 70;
egx_04rFA.turnlv = 30;
egx_04rFA.locklv = 60;
egx_04rFA._defeq = "IF";
egx_04rFA._atteq = null;
egx_04rFA.coreUnit = "egx_04r";
egx_04rFA.wp1 = "BmachinegunX4_0";
egx_04rFA.wp2 = "BcannonX2_0";
egx_04rFA.wp3 = "BBcannon_0";
egx_04rFA.wp4 = "QiShe_3";
egx_04rFA.wp5 = "Wvulcan_0";
egx_04rFA.wp6 = "BsaberX2_0";
egx_04rFA.wp7 = "Gfunnal_0";
egx_04rFA.wp8 = "SBswordX2_0";
egx_04rFA.BDmod = "mod_bd4";
egx_04rFA.LGmod = "mod_lg2";
egx_04rFA.LAmod = "mod_la9";
egx_04rFA.RAmod = "mod_ra10";
egx_04rFA.WImod = "mod_wi4";
egx_04rFA.SHDmod = "mod_shd10";
egx_04rFA.MAmod = null;
egx_04rFA.mod = new Array();
if(_global[egx_04rFA.BDmod + "_1"] != undefined)
{
   egx_04rFA.mod = egx_04rFA.mod.concat(_global[egx_04rFA.BDmod + "_1"]);
}
if(_global[egx_04rFA.LGmod + "_1"] != undefined)
{
   egx_04rFA.mod = egx_04rFA.mod.concat(_global[egx_04rFA.LGmod + "_1"]);
}
if(_global[egx_04rFA.LAmod + "_1"] != undefined)
{
   egx_04rFA.mod = egx_04rFA.mod.concat(_global[egx_04rFA.LAmod + "_1"]);
}
if(_global[egx_04rFA.RAmod + "_1"] != undefined)
{
   egx_04rFA.mod = egx_04rFA.mod.concat(_global[egx_04rFA.RAmod + "_1"]);
}
if(_global[egx_04rFA.WImod + "_1"] != undefined)
{
   egx_04rFA.mod = egx_04rFA.mod.concat(_global[egx_04rFA.WImod + "_1"]);
}
if(_global[egx_04rFA.SHDmod + "_1"] != undefined)
{
   egx_04rFA.mod = egx_04rFA.mod.concat(_global[egx_04rFA.SHDmod + "_1"]);
}
_global.mzl_70 = new Object();
mzl_70._protype = "mzl_70";
mzl_70.$NAME = "麦哲伦巡洋舰";
mzl_70.$TYPE = "MZL-70";
mzl_70._type = "SC";
mzl_70._size = "L";
mzl_70.maxHP = 7050;
mzl_70.maxEN = 5280;
mzl_70._DF = 435;
mzl_70.speedlv = 38;
mzl_70.subpowlv = 10;
mzl_70.turnlv = 60;
mzl_70.locklv = 35;
mzl_70._defeq = null;
mzl_70._atteq = null;
mzl_70.wp1 = "BmachinegunX8_0";
mzl_70.wp2 = "BcannonX2_2";
mzl_70.wp3 = "MmissileX5_0";
mzl_70.wp4 = "QiShe_0";
mzl_70.wp5 = "FlyDog_0";
mzl_70.wp6 = "null";
mzl_70.wp7 = "null";
mzl_70.wp8 = "null";
mzl_70.BDmod = null;
mzl_70.LGmod = null;
mzl_70.LAmod = null;
mzl_70.RAmod = null;
mzl_70.WImod = null;
mzl_70.MAmod = "mod_ma10";
mzl_70.mod = new Array();
if(_global[mzl_70.MAmod + "_1"] != undefined)
{
   mzl_70.mod = mzl_70.mod.concat(_global[mzl_70.MAmod + "_1"]);
}
_global.sb_79 = new Object();
sb_79._protype = "sb_79";
sb_79.$NAME = "Silver Base";
sb_79.$TYPE = "SB-79";
sb_79._type = "SC";
sb_79._size = "L";
sb_79.maxHP = 9150;
sb_79.maxEN = 6680;
sb_79._DF = 550;
sb_79.speedlv = 45;
sb_79.subpowlv = 20;
sb_79.turnlv = 64;
sb_79.locklv = 25;
sb_79._defeq = null;
sb_79._atteq = null;
sb_79.wp1 = "BmachinegunX8_0";
sb_79.wp2 = "BcannonX2_2";
sb_79.wp3 = "SmissileX1_0";
sb_79.wp4 = "QiShe_0";
sb_79.wp5 = "FlyDog_0";
sb_79.wp7 = "null";
sb_79.wp7 = "MmissileX5_0";
sb_79.wp8 = "null";
sb_79.BDmod = null;
sb_79.LGmod = null;
sb_79.LAmod = null;
sb_79.RAmod = null;
sb_79.WImod = null;
sb_79.MAmod = "mod_ma11";
sb_79.mod = new Array();
if(_global[sb_79.MAmod + "_1"] != undefined)
{
   sb_79.mod = sb_79.mod.concat(_global[sb_79.MAmod + "_1"]);
}
_global.hx_178 = new Object();
hx_178._protype = "hx_178";
hx_178.$NAME = "马克兔";
hx_178.$TYPE = "HX-178";
hx_178._type = "MS";
hx_178._size = "M";
hx_178.maxHP = 2600;
hx_178.maxEN = 2750;
hx_178._DF = 320;
hx_178.speedlv = 50;
hx_178.subpowlv = 50;
hx_178.turnlv = 58;
hx_178.locklv = 50;
hx_178._defeq = null;
hx_178._atteq = null;
hx_178.wp1 = "Hvulcan_0";
hx_178.wp2 = "Brifle_1";
hx_178.wp3 = "SBazooka_0";
hx_178.wp4 = "QiShe_1";
hx_178.wp5 = "null";
hx_178.wp6 = "Bsaber_0";
hx_178.wp7 = "null";
hx_178.wp8 = "null";
hx_178.BDmod = "mod_bd1";
hx_178.LGmod = "mod_lg1";
hx_178.LAmod = "mod_la12";
hx_178.RAmod = "mod_ra12";
hx_178.WImod = "mod_wi10";
hx_178.SHDmod = "mod_shd5";
hx_178.MAmod = null;
hx_178.mod = new Array();
if(_global[hx_178.BDmod + "_1"] != undefined)
{
   hx_178.mod = hx_178.mod.concat(_global[hx_178.BDmod + "_1"]);
}
if(_global[hx_178.LGmod + "_1"] != undefined)
{
   hx_178.mod = hx_178.mod.concat(_global[hx_178.LGmod + "_1"]);
}
if(_global[hx_178.LAmod + "_1"] != undefined)
{
   hx_178.mod = hx_178.mod.concat(_global[hx_178.LAmod + "_1"]);
}
if(_global[hx_178.RAmod + "_1"] != undefined)
{
   hx_178.mod = hx_178.mod.concat(_global[hx_178.RAmod + "_1"]);
}
if(_global[hx_178.WImod + "_1"] != undefined)
{
   hx_178.mod = hx_178.mod.concat(_global[hx_178.WImod + "_1"]);
}
if(_global[hx_178.SHDmod + "_1"] != undefined)
{
   hx_178.mod = hx_178.mod.concat(_global[hx_178.SHDmod + "_1"]);
}
_global.mxa_0011 = new Object();
mxa_0011._protype = "mxa_0011";
mxa_0011.$NAME = "EX-SOO";
mxa_0011.$TYPE = "MXA-0011";
mxa_0011._type = "TMS";
mxa_0011._size = "M";
mxa_0011.maxHP = 2820;
mxa_0011.maxEN = 3750;
mxa_0011._DF = 315;
mxa_0011.speedlv = 78;
mxa_0011.subpowlv = 86;
mxa_0011.turnlv = 76;
mxa_0011.locklv = 66;
mxa_0011._DF2 = 315;
mxa_0011.speedlv2 = 90;
mxa_0011.subpowlv2 = 4;
mxa_0011.turnlv2 = 45;
mxa_0011.locklv2 = 66;
mxa_0011._defeq = "IF";
mxa_0011._atteq = null;
mxa_0011.wp1 = "Bsword_0";
mxa_0011.wp2 = "Brifle_1";
mxa_0011.wp3 = "Bsniper_0";
mxa_0011.wp4 = "QiShe_0";
mxa_0011.wp5 = "Cbomb_0";
mxa_0011.wp6 = "BcannonX2_0";
mxa_0011.wp7 = "Wincom_2";
mxa_0011.wp8 = "RefDBCcannon_0";
mxa_0011.BDmod = "mod_bd8";
mxa_0011.LGmod = "mod_lg8";
mxa_0011.LAmod = "mod_la14";
mxa_0011.RAmod = "mod_ra14";
mxa_0011.WImod = "mod_wi12";
mxa_0011.MAmod = "mod_ma15";
mxa_0011.mod = new Array();
if(_global[mxa_0011.BDmod + "_1"] != undefined)
{
   mxa_0011.mod = mxa_0011.mod.concat(_global[mxa_0011.BDmod + "_1"]);
}
if(_global[mxa_0011.LGmod + "_1"] != undefined)
{
   mxa_0011.mod = mxa_0011.mod.concat(_global[mxa_0011.LGmod + "_1"]);
}
if(_global[mxa_0011.LAmod + "_1"] != undefined)
{
   mxa_0011.mod = mxa_0011.mod.concat(_global[mxa_0011.LAmod + "_1"]);
}
if(_global[mxa_0011.RAmod + "_1"] != undefined)
{
   mxa_0011.mod = mxa_0011.mod.concat(_global[mxa_0011.RAmod + "_1"]);
}
if(_global[mxa_0011.WImod + "_1"] != undefined)
{
   mxa_0011.mod = mxa_0011.mod.concat(_global[mxa_0011.WImod + "_1"]);
}
_global.mxz_010 = new Object();
mxz_010._protype = "mxz_010";
mxz_010.$NAME = "大波贼头";
mxz_010.$TYPE = "MXZ-010";
mxz_010._type = "TMS";
mxz_010._size = "M";
mxz_010.maxHP = 3620;
mxz_010.maxEN = 3530;
mxz_010._DF = 395;
mxz_010.speedlv = 75;
mxz_010.subpowlv = 40;
mxz_010.turnlv = 52;
mxz_010.locklv = 60;
mxz_010._DF2 = 345;
mxz_010.speedlv2 = 85;
mxz_010.subpowlv2 = 10;
mxz_010.turnlv2 = 34;
mxz_010.locklv2 = 60;
mxz_010._defeq = null;
mxz_010._atteq = null;
mxz_010.wp1 = "Hvulcan_0";
mxz_010.wp2 = "BrifleX2_0";
mxz_010.wp3 = "MmissileX5_0";
mxz_010.wp4 = "SPcannon_0";
mxz_010.wp5 = "null";
mxz_010.wp6 = "Bsaber_1";
mxz_010.wp7 = "BazookaX2_1";
mxz_010.wp8 = "SBsword_0";
mxz_010.BDmod = "mod_bd2";
mxz_010.LGmod = "mod_lg8";
mxz_010.LAmod = "mod_la15";
mxz_010.RAmod = "mod_ra15";
mxz_010.WImod = "mod_wi13";
mxz_010.MAmod = "mod_ma14";
mxz_010.mod = new Array();
if(_global[mxz_010.BDmod + "_1"] != undefined)
{
   mxz_010.mod = mxz_010.mod.concat(_global[mxz_010.BDmod + "_1"]);
}
if(_global[mxz_010.LGmod + "_1"] != undefined)
{
   mxz_010.mod = mxz_010.mod.concat(_global[mxz_010.LGmod + "_1"]);
}
if(_global[mxz_010.LAmod + "_1"] != undefined)
{
   mxz_010.mod = mxz_010.mod.concat(_global[mxz_010.LAmod + "_1"]);
}
if(_global[mxz_010.RAmod + "_1"] != undefined)
{
   mxz_010.mod = mxz_010.mod.concat(_global[mxz_010.RAmod + "_1"]);
}
if(_global[mxz_010.WImod + "_1"] != undefined)
{
   mxz_010.mod = mxz_010.mod.concat(_global[mxz_010.WImod + "_1"]);
}
_global.fmx_003 = new Object();
fmx_003._protype = "fmx_003";
fmx_003.$NAME = "奥胖";
fmx_003.$TYPE = "FMX-003";
fmx_003._type = "MS";
fmx_003._size = "M";
fmx_003.maxHP = 3720;
fmx_003.maxEN = 4450;
fmx_003._DF = 440;
fmx_003.speedlv = 87;
fmx_003.subpowlv = 42;
fmx_003.turnlv = 32;
fmx_003.locklv = 74;
fmx_003._defeq = null;
fmx_003._atteq = null;
fmx_003.wp1 = "DBCcannon_2";
fmx_003.wp2 = "Brifle_1";
fmx_003.wp3 = "Bbazooka_1";
fmx_003.wp4 = "TJ911_10";
fmx_003.wp5 = "null";
fmx_003.wp6 = "BsaberX4_0";
fmx_003.wp7 = "null";
fmx_003.wp8 = "QiShe_1";
fmx_003.BDmod = "mod_bd14";
fmx_003.LGmod = "mod_lg4";
fmx_003.LAmod = "mod_la12";
fmx_003.RAmod = "mod_ra12";
fmx_003.WImod = null;
fmx_003.MAmod = null;
fmx_003.mod = new Array();
if(_global[fmx_003.BDmod + "_1"] != undefined)
{
   fmx_003.mod = fmx_003.mod.concat(_global[fmx_003.BDmod + "_1"]);
}
if(_global[fmx_003.LGmod + "_1"] != undefined)
{
   fmx_003.mod = fmx_003.mod.concat(_global[fmx_003.LGmod + "_1"]);
}
if(_global[fmx_003.LAmod + "_1"] != undefined)
{
   fmx_003.mod = fmx_003.mod.concat(_global[fmx_003.LAmod + "_1"]);
}
if(_global[fmx_003.RAmod + "_1"] != undefined)
{
   fmx_003.mod = fmx_003.mod.concat(_global[fmx_003.RAmod + "_1"]);
}
if(_global[fmx_003.WImod + "_1"] != undefined)
{
   fmx_003.mod = fmx_003.mod.concat(_global[fmx_003.WImod + "_1"]);
}
_global.mxn_100 = new Object();
mxn_100._protype = "mxn_100";
mxn_100.$NAME = "一百";
mxn_100.$TYPE = "MXN-100";
mxn_100._type = "MS";
mxn_100._size = "M";
mxn_100.maxHP = 2300;
mxn_100.maxEN = 3050;
mxn_100._DF = 195;
mxn_100.speedlv = 63;
mxn_100.subpowlv = 58;
mxn_100.turnlv = 56;
mxn_100.locklv = 58;
mxn_100._defeq = null;
mxn_100._atteq = null;
mxn_100.wp1 = "Hvulcan_0";
mxn_100.wp2 = "Brifle_1";
mxn_100.wp3 = "HMPcannon_2";
mxn_100.wp4 = "TJ911_10";
mxn_100.wp5 = "null";
mxn_100.wp6 = "BsaberX2_0";
mxn_100.wp7 = "SBazooka_0";
mxn_100.wp8 = "null";
mxn_100.BDmod = "mod_bd15";
mxn_100.LGmod = "mod_lg1";
mxn_100.LAmod = "mod_la1";
mxn_100.RAmod = "mod_ra1";
mxn_100.WImod = "mod_wi15";
mxn_100.MAmod = null;
mxn_100.mod = new Array();
if(_global[mxn_100.BDmod + "_1"] != undefined)
{
   mxn_100.mod = mxn_100.mod.concat(_global[mxn_100.BDmod + "_1"]);
}
if(_global[mxn_100.LGmod + "_1"] != undefined)
{
   mxn_100.mod = mxn_100.mod.concat(_global[mxn_100.LGmod + "_1"]);
}
if(_global[mxn_100.LAmod + "_1"] != undefined)
{
   mxn_100.mod = mxn_100.mod.concat(_global[mxn_100.LAmod + "_1"]);
}
if(_global[mxn_100.RAmod + "_1"] != undefined)
{
   mxn_100.mod = mxn_100.mod.concat(_global[mxn_100.RAmod + "_1"]);
}
if(_global[mxn_100.WImod + "_1"] != undefined)
{
   mxn_100.mod = mxn_100.mod.concat(_global[mxn_100.WImod + "_1"]);
}
_global.rmx_106 = new Object();
rmx_106._protype = "rmx_106";
rmx_106.$NAME = "高宅古";
rmx_106.$TYPE = "RMX-106";
rmx_106._type = "MS";
rmx_106._size = "M";
rmx_106.maxHP = 1720;
rmx_106.maxEN = 2035;
rmx_106._DF = 240;
rmx_106.speedlv = 40;
rmx_106.subpowlv = 41;
rmx_106.turnlv = 52;
rmx_106.locklv = 22;
rmx_106._defeq = null;
rmx_106._atteq = null;
rmx_106.wp1 = "MmissileX1_0";
rmx_106.wp2 = "Brifle_1";
rmx_106.wp3 = "Bsniper_0";
rmx_106.wp4 = "TJ911_5";
rmx_106.wp5 = "null";
rmx_106.wp6 = "Bsword_0";
rmx_106.wp7 = "null";
rmx_106.wp8 = "null";
rmx_106.BDmod = "mod_bd6";
rmx_106.LGmod = "mod_lg5";
rmx_106.LAmod = "mod_la6";
rmx_106.RAmod = "mod_ra5";
rmx_106.WImod = "mod_wi10";
rmx_106.MAmod = null;
rmx_106.mod = new Array();
if(_global[rmx_106.BDmod + "_1"] != undefined)
{
   rmx_106.mod = rmx_106.mod.concat(_global[rmx_106.BDmod + "_1"]);
}
if(_global[rmx_106.LGmod + "_1"] != undefined)
{
   rmx_106.mod = rmx_106.mod.concat(_global[rmx_106.LGmod + "_1"]);
}
if(_global[rmx_106.LAmod + "_1"] != undefined)
{
   rmx_106.mod = rmx_106.mod.concat(_global[rmx_106.LAmod + "_1"]);
}
if(_global[rmx_106.RAmod + "_1"] != undefined)
{
   rmx_106.mod = rmx_106.mod.concat(_global[rmx_106.RAmod + "_1"]);
}
if(_global[rmx_106.WImod + "_1"] != undefined)
{
   rmx_106.mod = rmx_106.mod.concat(_global[rmx_106.WImod + "_1"]);
}
_global.hx_139 = new Object();
hx_139._protype = "hx_139";
hx_139.$NAME = "旱墨蜡笔";
hx_139.$TYPE = "HX-139";
hx_139._type = "TMS";
hx_139._size = "M";
hx_139.maxHP = 2320;
hx_139.maxEN = 2745;
hx_139._DF = 260;
hx_139.speedlv = 55;
hx_139.subpowlv = 50;
hx_139.turnlv = 60;
hx_139.locklv = 50;
hx_139._DF2 = 245;
hx_139.speedlv2 = 68;
hx_139.subpowlv2 = 50;
hx_139.turnlv2 = 39;
hx_139.locklv2 = 50;
hx_139._defeq = null;
hx_139._atteq = null;
hx_139.wp1 = "Hrod_2";
hx_139.wp2 = "BeamgunX2_0";
hx_139.wp3 = "LBrifle_0";
hx_139.wp4 = "TJ911_12";
hx_139.wp5 = "null";
hx_139.wp6 = "Bsword_0";
hx_139.wp7 = "null";
hx_139.wp8 = "null";
hx_139.BDmod = "mod_bd16";
hx_139.LGmod = "mod_lg1";
hx_139.LAmod = "mod_la16";
hx_139.RAmod = "mod_ra16";
hx_139.WImod = "mod_wi17";
hx_139.MAmod = "mod_ma16";
hx_139.mod = new Array();
if(_global[hx_139.BDmod + "_1"] != undefined)
{
   hx_139.mod = hx_139.mod.concat(_global[hx_139.BDmod + "_1"]);
}
if(_global[hx_139.LGmod + "_1"] != undefined)
{
   hx_139.mod = hx_139.mod.concat(_global[hx_139.LGmod + "_1"]);
}
if(_global[hx_139.LAmod + "_1"] != undefined)
{
   hx_139.mod = hx_139.mod.concat(_global[hx_139.LAmod + "_1"]);
}
if(_global[hx_139.RAmod + "_1"] != undefined)
{
   hx_139.mod = hx_139.mod.concat(_global[hx_139.RAmod + "_1"]);
}
if(_global[hx_139.WImod + "_1"] != undefined)
{
   hx_139.mod = hx_139.mod.concat(_global[hx_139.WImod + "_1"]);
}
_global.emx_003 = new Object();
emx_003._protype = "emx_003";
emx_003.$NAME = "加沙";
emx_003.$TYPE = "EMX-003";
emx_003._type = "TMS";
emx_003._size = "M";
emx_003.maxHP = 1900;
emx_003.maxEN = 2745;
emx_003._DF = 250;
emx_003.speedlv = 60;
emx_003.subpowlv = 50;
emx_003.turnlv = 60;
emx_003.locklv = 36;
emx_003._DF2 = 245;
emx_003.speedlv2 = 65;
emx_003.subpowlv2 = 40;
emx_003.turnlv2 = 30;
emx_003.locklv2 = 50;
emx_003._defeq = null;
emx_003._atteq = null;
emx_003.wp1 = "DBCcannon_2";
emx_003.wp2 = "Brifle_1";
emx_003.wp3 = "MPcannon_3";
emx_003.wp4 = "TJ911_3";
emx_003.wp5 = "null";
emx_003.wp6 = "Bsword_0";
emx_003.wp7 = "null";
emx_003.wp8 = "null";
emx_003.BDmod = "mod_bd17";
emx_003.LGmod = "mod_lg1";
emx_003.LAmod = "mod_la17";
emx_003.RAmod = "mod_ra17";
emx_003.WImod = "mod_wi18";
emx_003.MAmod = "mod_ma17";
emx_003.mod = new Array();
if(_global[emx_003.BDmod + "_1"] != undefined)
{
   emx_003.mod = emx_003.mod.concat(_global[emx_003.BDmod + "_1"]);
}
if(_global[emx_003.LGmod + "_1"] != undefined)
{
   emx_003.mod = emx_003.mod.concat(_global[emx_003.LGmod + "_1"]);
}
if(_global[emx_003.LAmod + "_1"] != undefined)
{
   emx_003.mod = emx_003.mod.concat(_global[emx_003.LAmod + "_1"]);
}
if(_global[emx_003.RAmod + "_1"] != undefined)
{
   emx_003.mod = emx_003.mod.concat(_global[emx_003.RAmod + "_1"]);
}
if(_global[emx_003.WImod + "_1"] != undefined)
{
   emx_003.mod = emx_003.mod.concat(_global[emx_003.WImod + "_1"]);
}
_global.nrs_055 = new Object();
nrs_055._protype = "nrs_055";
nrs_055.$NAME = "烈狗";
nrs_055.$TYPE = "NRS-055";
nrs_055._type = "TMS";
nrs_055._size = "M";
nrs_055.maxHP = 2900;
nrs_055.maxEN = 3045;
nrs_055._DF = 370;
nrs_055.speedlv = 60;
nrs_055.subpowlv = 54;
nrs_055.turnlv = 50;
nrs_055.locklv = 77;
nrs_055._DF2 = 505;
nrs_055.speedlv2 = 70;
nrs_055.subpowlv2 = 20;
nrs_055.turnlv2 = 45;
nrs_055.locklv2 = 77;
nrs_055._defeq = null;
nrs_055._atteq = null;
nrs_055.wp1 = "DBCcannon_1";
nrs_055.wp2 = "Brifle_1";
nrs_055.wp3 = "MPcannon_3";
nrs_055.wp4 = "TJ911_4";
nrs_055.wp5 = "null";
nrs_055.wp6 = "Bsword_0";
nrs_055.wp7 = "null";
nrs_055.wp8 = "null";
nrs_055.BDmod = "mod_bd18";
nrs_055.LGmod = "mod_lg5";
nrs_055.LAmod = "mod_la9";
nrs_055.RAmod = "mod_ra9";
nrs_055.WImod = null;
nrs_055.SHDmod = "mod_shd10";
nrs_055.MAmod = "mod_ma18";
nrs_055.mod = new Array();
if(_global[nrs_055.BDmod + "_1"] != undefined)
{
   nrs_055.mod = nrs_055.mod.concat(_global[nrs_055.BDmod + "_1"]);
}
if(_global[nrs_055.LGmod + "_1"] != undefined)
{
   nrs_055.mod = nrs_055.mod.concat(_global[nrs_055.LGmod + "_1"]);
}
if(_global[nrs_055.LAmod + "_1"] != undefined)
{
   nrs_055.mod = nrs_055.mod.concat(_global[nrs_055.LAmod + "_1"]);
}
if(_global[nrs_055.RAmod + "_1"] != undefined)
{
   nrs_055.mod = nrs_055.mod.concat(_global[nrs_055.RAmod + "_1"]);
}
if(_global[nrs_055.WImod + "_1"] != undefined)
{
   nrs_055.mod = nrs_055.mod.concat(_global[nrs_055.WImod + "_1"]);
}
if(_global[nrs_055.SHDmod + "_1"] != undefined)
{
   nrs_055.mod = nrs_055.mod.concat(_global[nrs_055.SHDmod + "_1"]);
}
_global.mxn_04 = new Object();
mxn_04._protype = "mxn_04";
mxn_04.$NAME = "山楂饼";
mxn_04.$TYPE = "MXN-04";
mxn_04._type = "MS";
mxn_04._size = "M";
mxn_04.maxHP = 3450;
mxn_04.maxEN = 4400;
mxn_04._DF = 500;
mxn_04.speedlv = 85;
mxn_04.subpowlv = 61;
mxn_04.turnlv = 65;
mxn_04.locklv = 87;
mxn_04._defeq = null;
mxn_04._atteq = null;
mxn_04.wp1 = "MmissileX3_1";
mxn_04.wp2 = "Brifle_2";
mxn_04.wp3 = "FunnalX3_0";
mxn_04.wp4 = "FunnalEX_0";
mxn_04.wp5 = "Boomerang_0";
mxn_04.wp6 = "BsaberX2_0";
mxn_04.wp7 = "DBCcannon_1";
mxn_04.wp8 = "TJ911_10";
mxn_04.BDmod = "mod_bd19";
mxn_04.LGmod = "mod_lg5";
mxn_04.LAmod = "mod_la9";
mxn_04.RAmod = "mod_ra9";
mxn_04.WImod = "mod_wi19";
mxn_04.SHDmod = "mod_shd6";
mxn_04.MAmod = null;
mxn_04.mod = new Array();
if(_global[mxn_04.BDmod + "_1"] != undefined)
{
   mxn_04.mod = mxn_04.mod.concat(_global[mxn_04.BDmod + "_1"]);
}
if(_global[mxn_04.LGmod + "_1"] != undefined)
{
   mxn_04.mod = mxn_04.mod.concat(_global[mxn_04.LGmod + "_1"]);
}
if(_global[mxn_04.LAmod + "_1"] != undefined)
{
   mxn_04.mod = mxn_04.mod.concat(_global[mxn_04.LAmod + "_1"]);
}
if(_global[mxn_04.RAmod + "_1"] != undefined)
{
   mxn_04.mod = mxn_04.mod.concat(_global[mxn_04.RAmod + "_1"]);
}
if(_global[mxn_04.WImod + "_1"] != undefined)
{
   mxn_04.mod = mxn_04.mod.concat(_global[mxn_04.WImod + "_1"]);
}
if(_global[mxn_04.SHDmod + "_1"] != undefined)
{
   mxn_04.mod = mxn_04.mod.concat(_global[mxn_04.SHDmod + "_1"]);
}
_global.mxn_03 = new Object();
mxn_03._protype = "mxn_03";
mxn_03.$NAME = "鹦鹉";
mxn_03.$TYPE = "MXN-03";
mxn_03._type = "MS";
mxn_03._size = "M";
mxn_03.maxHP = 3150;
mxn_03.maxEN = 3900;
mxn_03._DF = 430;
mxn_03.speedlv = 76;
mxn_03.subpowlv = 60;
mxn_03.turnlv = 65;
mxn_03.locklv = 67;
mxn_03._defeq = null;
mxn_03._atteq = null;
mxn_03.wp1 = "MmissileX3_1";
mxn_03.wp2 = "Bmachinegun_0";
mxn_03.wp3 = "FunnalX3_0";
mxn_03.wp4 = "TJ911_3";
mxn_03.wp5 = "null";
mxn_03.wp6 = "Bsaber_0";
mxn_03.wp7 = "BcannonX5_1";
mxn_03.wp8 = "null";
mxn_03.BDmod = "mod_bd24";
mxn_03.LGmod = "mod_lg5";
mxn_03.LAmod = "mod_la21";
mxn_03.RAmod = "mod_ra21";
mxn_03.WImod = null;
mxn_03.SHDmod = "mod_shd2";
mxn_03.MAmod = null;
mxn_03.mod = new Array();
if(_global[mxn_03.BDmod + "_1"] != undefined)
{
   mxn_03.mod = mxn_03.mod.concat(_global[mxn_03.BDmod + "_1"]);
}
if(_global[mxn_03.LGmod + "_1"] != undefined)
{
   mxn_03.mod = mxn_03.mod.concat(_global[mxn_03.LGmod + "_1"]);
}
if(_global[mxn_03.LAmod + "_1"] != undefined)
{
   mxn_03.mod = mxn_03.mod.concat(_global[mxn_03.LAmod + "_1"]);
}
if(_global[mxn_03.RAmod + "_1"] != undefined)
{
   mxn_03.mod = mxn_03.mod.concat(_global[mxn_03.RAmod + "_1"]);
}
if(_global[mxn_03.WImod + "_1"] != undefined)
{
   mxn_03.mod = mxn_03.mod.concat(_global[mxn_03.WImod + "_1"]);
}
if(_global[mxn_03.SHDmod + "_1"] != undefined)
{
   mxn_03.mod = mxn_03.mod.concat(_global[mxn_03.SHDmod + "_1"]);
}
_global.emx_102 = new Object();
emx_102._protype = "emx_102";
emx_102.$NAME = "紫砂";
emx_102.$TYPE = "EMX-102";
emx_102._type = "MS";
emx_102._size = "M";
emx_102.maxHP = 2080;
emx_102.maxEN = 2415;
emx_102._DF = 275;
emx_102.speedlv = 50;
emx_102.subpowlv = 45;
emx_102.turnlv = 37;
emx_102.locklv = 48;
emx_102._defeq = null;
emx_102._atteq = null;
emx_102.wp1 = "MmissileX2_0";
emx_102.wp2 = "DBCcannon_1";
emx_102.wp3 = "MmissileX8_0";
emx_102.wp4 = "TJ911_7";
emx_102.wp5 = "Buvulcan_0";
emx_102.wp6 = "Bsword_0";
emx_102.wp7 = "null";
emx_102.wp8 = "null";
emx_102.BDmod = "mod_bd23";
emx_102.LGmod = "mod_lg4";
emx_102.LAmod = "mod_la1";
emx_102.RAmod = "mod_ra1";
emx_102.WImod = null;
emx_102.MAmod = null;
emx_102.mod = new Array();
if(_global[emx_102.BDmod + "_1"] != undefined)
{
   emx_102.mod = emx_102.mod.concat(_global[emx_102.BDmod + "_1"]);
}
if(_global[emx_102.LGmod + "_1"] != undefined)
{
   emx_102.mod = emx_102.mod.concat(_global[emx_102.LGmod + "_1"]);
}
if(_global[emx_102.LAmod + "_1"] != undefined)
{
   emx_102.mod = emx_102.mod.concat(_global[emx_102.LAmod + "_1"]);
}
if(_global[emx_102.RAmod + "_1"] != undefined)
{
   emx_102.mod = emx_102.mod.concat(_global[emx_102.RAmod + "_1"]);
}
if(_global[emx_102.WImod + "_1"] != undefined)
{
   emx_102.mod = emx_102.mod.concat(_global[emx_102.WImod + "_1"]);
}
_global.emx_103 = new Object();
emx_103._protype = "emx_103";
emx_103.$NAME = "蛤蟆";
emx_103.$TYPE = "EMX-103";
emx_103._type = "MS";
emx_103._size = "M";
emx_103.maxHP = 2920;
emx_103.maxEN = 3085;
emx_103._DF = 375;
emx_103.speedlv = 68;
emx_103.subpowlv = 90;
emx_103.turnlv = 45;
emx_103.locklv = 56;
emx_103._defeq = null;
emx_103._atteq = null;
emx_103.wp1 = "Bsaber_0";
emx_103.wp2 = "BeamgunX2_0";
emx_103.wp3 = "Wincom_3";
emx_103.wp4 = "TJ911_10";
emx_103.wp5 = "null";
emx_103.wp6 = "BcannonX3_0";
emx_103.wp7 = "null";
emx_103.wp8 = "null";
emx_103.BDmod = "mod_bd20";
emx_103.LGmod = "mod_lg5";
emx_103.LAmod = "mod_la18";
emx_103.RAmod = "mod_ra18";
emx_103.WImod = null;
emx_103.SHDmod = "mod_shd2";
emx_103.MAmod = null;
emx_103.mod = new Array();
if(_global[emx_103.BDmod + "_1"] != undefined)
{
   emx_103.mod = emx_103.mod.concat(_global[emx_103.BDmod + "_1"]);
}
if(_global[emx_103.LGmod + "_1"] != undefined)
{
   emx_103.mod = emx_103.mod.concat(_global[emx_103.LGmod + "_1"]);
}
if(_global[emx_103.LAmod + "_1"] != undefined)
{
   emx_103.mod = emx_103.mod.concat(_global[emx_103.LAmod + "_1"]);
}
if(_global[emx_103.RAmod + "_1"] != undefined)
{
   emx_103.mod = emx_103.mod.concat(_global[emx_103.RAmod + "_1"]);
}
if(_global[emx_103.WImod + "_1"] != undefined)
{
   emx_103.mod = emx_103.mod.concat(_global[emx_103.WImod + "_1"]);
}
if(_global[emx_103.SHDmod + "_1"] != undefined)
{
   emx_103.mod = emx_103.mod.concat(_global[emx_103.SHDmod + "_1"]);
}
_global.emx_104 = new Object();
emx_104._protype = "emx_104";
emx_104.$NAME = "阿甲甲";
emx_104.$TYPE = "EMX-104";
emx_104._type = "MS";
emx_104._size = "M";
emx_104.maxHP = 2750;
emx_104.maxEN = 2940;
emx_104._DF = 275;
emx_104.speedlv = 55;
emx_104.subpowlv = 75;
emx_104.turnlv = 54;
emx_104.locklv = 50;
emx_104._defeq = null;
emx_104._atteq = null;
emx_104.wp1 = "Mgun90_0";
emx_104.wp2 = "Bmachinegun_0";
emx_104.wp3 = "MmissileX3_0";
emx_104.wp4 = "QiShe_2";
emx_104.wp5 = "null";
emx_104.wp6 = "Bsword_1";
emx_104.wp7 = "Hrod_1";
emx_104.wp8 = "null";
emx_104.BDmod = "mod_bd21";
emx_104.LGmod = "mod_lg3";
emx_104.LAmod = "mod_la19";
emx_104.RAmod = "mod_ra19";
emx_104.WImod = "mod_wi20";
emx_104.MAmod = null;
emx_104.mod = new Array();
if(_global[emx_104.BDmod + "_1"] != undefined)
{
   emx_104.mod = emx_104.mod.concat(_global[emx_104.BDmod + "_1"]);
}
if(_global[emx_104.LGmod + "_1"] != undefined)
{
   emx_104.mod = emx_104.mod.concat(_global[emx_104.LGmod + "_1"]);
}
if(_global[emx_104.LAmod + "_1"] != undefined)
{
   emx_104.mod = emx_104.mod.concat(_global[emx_104.LAmod + "_1"]);
}
if(_global[emx_104.RAmod + "_1"] != undefined)
{
   emx_104.mod = emx_104.mod.concat(_global[emx_104.RAmod + "_1"]);
}
if(_global[emx_104.WImod + "_1"] != undefined)
{
   emx_104.mod = emx_104.mod.concat(_global[emx_104.WImod + "_1"]);
}
_global.emx_107 = new Object();
emx_107._protype = "emx_107";
emx_107.$NAME = "隆非";
emx_107.$TYPE = "EMX-107";
emx_107._type = "MS";
emx_107._size = "M";
emx_107.maxHP = 2750;
emx_107.maxEN = 3050;
emx_107._DF = 250;
emx_107.speedlv = 62;
emx_107.subpowlv = 73;
emx_107.turnlv = 56;
emx_107.locklv = 58;
emx_107._defeq = null;
emx_107._atteq = null;
emx_107.wp1 = "CbombX4_0";
emx_107.wp2 = "Brifle_1";
emx_107.wp3 = "BcannonX5_1";
emx_107.wp4 = "QiShe_0";
emx_107.wp5 = "null";
emx_107.wp6 = "Bsword_0";
emx_107.wp7 = "MmissileX3_0";
emx_107.wp8 = "null";
emx_107.BDmod = "mod_bd22";
emx_107.LGmod = "mod_lg3";
emx_107.LAmod = "mod_la20";
emx_107.RAmod = "mod_ra20";
emx_107.WImod = "mod_wi21";
emx_107.SHDmod = "mod_shd3";
emx_107.MAmod = null;
emx_107.mod = new Array();
if(_global[emx_107.BDmod + "_1"] != undefined)
{
   emx_107.mod = emx_107.mod.concat(_global[emx_107.BDmod + "_1"]);
}
if(_global[emx_107.LGmod + "_1"] != undefined)
{
   emx_107.mod = emx_107.mod.concat(_global[emx_107.LGmod + "_1"]);
}
if(_global[emx_107.LAmod + "_1"] != undefined)
{
   emx_107.mod = emx_107.mod.concat(_global[emx_107.LAmod + "_1"]);
}
if(_global[emx_107.RAmod + "_1"] != undefined)
{
   emx_107.mod = emx_107.mod.concat(_global[emx_107.RAmod + "_1"]);
}
if(_global[emx_107.WImod + "_1"] != undefined)
{
   emx_107.mod = emx_107.mod.concat(_global[emx_107.WImod + "_1"]);
}
if(_global[emx_107.SHDmod + "_1"] != undefined)
{
   emx_107.mod = emx_107.mod.concat(_global[emx_107.SHDmod + "_1"]);
}
_global.rqz_91 = new Object();
rqz_91._protype = "rqz_91";
rqz_91.$NAME = "灵格斯";
rqz_91.$TYPE = "RQZ-91";
rqz_91._type = "MS";
rqz_91._size = "M";
rqz_91.maxHP = 2570;
rqz_91.maxEN = 3300;
rqz_91._DF = 260;
rqz_91.speedlv = 65;
rqz_91.subpowlv = 67;
rqz_91.turnlv = 65;
rqz_91.locklv = 68;
rqz_91._defeq = null;
rqz_91._atteq = null;
rqz_91.wp1 = "Hvulcan_0";
rqz_91.wp2 = "Brifle_1";
rqz_91.wp3 = "MmissileX3_0";
rqz_91.wp4 = "TJ911_3";
rqz_91.wp5 = "CbombX4_0";
rqz_91.wp6 = "Bsaber_0";
rqz_91.wp7 = "null";
rqz_91.wp8 = "null";
rqz_91.BDmod = "mod_bd8";
rqz_91.LGmod = "mod_lg7";
rqz_91.LAmod = "mod_la12";
rqz_91.RAmod = "mod_ra12";
rqz_91.WImod = "mod_wi22";
rqz_91.SHDmod = "mod_shd7";
rqz_91.MAmod = null;
rqz_91.mod = new Array();
if(_global[rqz_91.BDmod + "_1"] != undefined)
{
   rqz_91.mod = rqz_91.mod.concat(_global[rqz_91.BDmod + "_1"]);
}
if(_global[rqz_91.LGmod + "_1"] != undefined)
{
   rqz_91.mod = rqz_91.mod.concat(_global[rqz_91.LGmod + "_1"]);
}
if(_global[rqz_91.LAmod + "_1"] != undefined)
{
   rqz_91.mod = rqz_91.mod.concat(_global[rqz_91.LAmod + "_1"]);
}
if(_global[rqz_91.RAmod + "_1"] != undefined)
{
   rqz_91.mod = rqz_91.mod.concat(_global[rqz_91.RAmod + "_1"]);
}
if(_global[rqz_91.WImod + "_1"] != undefined)
{
   rqz_91.mod = rqz_91.mod.concat(_global[rqz_91.WImod + "_1"]);
}
if(_global[rqz_91.SHDmod + "_1"] != undefined)
{
   rqz_91.mod = rqz_91.mod.concat(_global[rqz_91.SHDmod + "_1"]);
}
_global.rqz_91bws = new Object();
rqz_91bws._protype = "rqz_91bws";
rqz_91bws.$NAME = "灵格斯BWS";
rqz_91bws.$TYPE = "RQZ-91BWS";
rqz_91bws._type = "MA";
rqz_91bws._size = "M";
rqz_91bws.maxHP = 1750;
rqz_91bws.maxEN = 2520;
rqz_91bws._DF = 250;
rqz_91bws.speedlv = 83;
rqz_91bws.subpowlv = 10;
rqz_91bws.turnlv = 41;
rqz_91bws.locklv = 68;
rqz_91bws._defeq = null;
rqz_91bws._atteq = null;
rqz_91bws.coreUnit = "rqz_91";
rqz_91bws.wp1 = "Hvulcan_0";
rqz_91bws.wp2 = "BcannonX2_0";
rqz_91bws.wp3 = "MPcannon_1";
rqz_91bws.wp4 = "TJ911_7";
rqz_91bws.wp5 = "CbombX4_0";
rqz_91bws.wp6 = "null";
rqz_91bws.wp7 = "null";
rqz_91bws.wp8 = "BaoJa_0";
rqz_91bws.BDmod = null;
rqz_91bws.LGmod = null;
rqz_91bws.LAmod = null;
rqz_91bws.RAmod = null;
rqz_91bws.WImod = null;
rqz_91bws.MAmod = "mod_ma19";
rqz_91bws.mod = new Array();
if(_global[rqz_91bws.MAmod + "_1"] != undefined)
{
   rqz_91bws.mod = rqz_91bws.mod.concat(_global[rqz_91bws.MAmod + "_1"]);
}
_global.mz_000 = new Object();
mz_000._protype = "mz_000";
mz_000.$NAME = "昆曼沙";
mz_000.$TYPE = "MZ-000";
mz_000._type = "HMS";
mz_000._size = "L";
mz_000.maxHP = 6900;
mz_000.maxEN = 4140;
mz_000._DF = 565;
mz_000.speedlv = 55;
mz_000.subpowlv = 25;
mz_000.turnlv = 43;
mz_000.locklv = 71;
mz_000._defeq = "IF";
mz_000._atteq = null;
mz_000.wp1 = "DBCcannon_0";
mz_000.wp2 = "BcannonX5_1";
mz_000.wp3 = "HMPcannon_1";
mz_000.wp4 = "FunnalEX_0";
mz_000.wp5 = "Bsaber_1";
mz_000.wp6 = "HDBCcannon_0";
mz_000.wp7 = "FunnalX5_1";
mz_000.wp8 = "null";
mz_000.BDmod = null;
mz_000.LGmod = null;
mz_000.LAmod = null;
mz_000.RAmod = null;
mz_000.WImod = null;
mz_000.MAmod = "mod_ma20";
mz_000.mod = new Array();
if(_global[mz_000.MAmod + "_1"] != undefined)
{
   mz_000.mod = mz_000.mod.concat(_global[mz_000.MAmod + "_1"]);
}
_global.mz_666 = new Object();
mz_666._protype = "mz_666";
mz_666.$NAME = "青椒";
mz_666.$TYPE = "MZ-666";
mz_666._type = "MS";
mz_666._size = "M";
mz_666.maxHP = 5100;
mz_666.maxEN = 4560;
mz_666._DF = 740;
mz_666.speedlv = 78;
mz_666.subpowlv = 37;
mz_666.turnlv = 59;
mz_666.locklv = 67;
mz_666._defeq = null;
mz_666._atteq = null;
mz_666.wp1 = "DBCcannon_0";
mz_666.wp2 = "BeamgunX2_2";
mz_666.wp3 = "MPcannon_1";
mz_666.wp4 = "TJ911_4";
mz_666.wp5 = "null";
mz_666.wp6 = "Bsaber_1";
mz_666.wp7 = "FunnalX5_1";
mz_666.wp8 = "FunnalEX_0";
mz_666.BDmod = "mod_Sbd2";
mz_666.LGmod = "mod_Slg2";
mz_666.LAmod = "mod_Sla2";
mz_666.RAmod = "mod_Sra2";
mz_666.WImod = "mod_Swi2";
mz_666.MAmod = null;
mz_666.mod = new Array();
if(_global[mz_666.BDmod + "_1"] != undefined)
{
   mz_666.mod = mz_666.mod.concat(_global[mz_666.BDmod + "_1"]);
}
if(_global[mz_666.LGmod + "_1"] != undefined)
{
   mz_666.mod = mz_666.mod.concat(_global[mz_666.LGmod + "_1"]);
}
if(_global[mz_666.LAmod + "_1"] != undefined)
{
   mz_666.mod = mz_666.mod.concat(_global[mz_666.LAmod + "_1"]);
}
if(_global[mz_666.RAmod + "_1"] != undefined)
{
   mz_666.mod = mz_666.mod.concat(_global[mz_666.RAmod + "_1"]);
}
if(_global[mz_666.WImod + "_1"] != undefined)
{
   mz_666.mod = mz_666.mod.concat(_global[mz_666.WImod + "_1"]);
}
_global.mxa_099 = new Object();
mxa_099._protype = "mxa_099";
mxa_099.$NAME = "呆鸭丝";
mxa_099.$TYPE = "MXA-099";
mxa_099._type = "MS";
mxa_099._size = "M";
mxa_099.maxHP = 2000;
mxa_099.maxEN = 2600;
mxa_099._DF = 250;
mxa_099.speedlv = 48;
mxa_099.subpowlv = 48;
mxa_099.turnlv = 60;
mxa_099.locklv = 35;
mxa_099._defeq = null;
mxa_099._atteq = null;
mxa_099.wp1 = "Hvulcan_0";
mxa_099.wp2 = "BeamgunX2_1";
mxa_099.wp3 = "Bazooka_0";
mxa_099.wp4 = "TJ911_7";
mxa_099.wp5 = "null";
mxa_099.wp6 = "Bsaber_0";
mxa_099.wp7 = "null";
mxa_099.wp8 = "null";
mxa_099.BDmod = "mod_bd11";
mxa_099.LGmod = "mod_lg4";
mxa_099.LAmod = "mod_la12";
mxa_099.RAmod = "mod_ra12";
mxa_099.WImod = "mod_wi25";
mxa_099.MAmod = null;
mxa_099.mod = new Array();
if(_global[mxa_099.BDmod + "_1"] != undefined)
{
   mxa_099.mod = mxa_099.mod.concat(_global[mxa_099.BDmod + "_1"]);
}
if(_global[mxa_099.LGmod + "_1"] != undefined)
{
   mxa_099.mod = mxa_099.mod.concat(_global[mxa_099.LGmod + "_1"]);
}
if(_global[mxa_099.LAmod + "_1"] != undefined)
{
   mxa_099.mod = mxa_099.mod.concat(_global[mxa_099.LAmod + "_1"]);
}
if(_global[mxa_099.RAmod + "_1"] != undefined)
{
   mxa_099.mod = mxa_099.mod.concat(_global[mxa_099.RAmod + "_1"]);
}
if(_global[mxa_099.WImod + "_1"] != undefined)
{
   mxa_099.mod = mxa_099.mod.concat(_global[mxa_099.WImod + "_1"]);
}
_global.hx_0 = new Object();
hx_0._protype = "hx_0";
hx_0.$NAME = "毒叫兽";
hx_0.$TYPE = "HX-0";
hx_0._type = "MS";
hx_0._size = "M";
hx_0.maxHP = 3800;
hx_0.maxEN = 3650;
hx_0._DF = 405;
hx_0.speedlv = 70;
hx_0.subpowlv = 73;
hx_0.turnlv = 70;
hx_0.locklv = 50;
hx_0._defeq = null;
hx_0._atteq = null;
hx_0.coreUnit = "hx_0ntr";
hx_0.wp1 = "Hvulcan_0";
hx_0.wp2 = "LBrifle_1";
hx_0.wp3 = "Bazooka_1";
hx_0.wp4 = "TJ911_3";
hx_0.wp5 = "null";
hx_0.wp6 = "Bsaber_0";
hx_0.wp7 = "null";
hx_0.wp8 = "BaoJa_0";
hx_0.BDmod = "mod_bd9";
hx_0.LGmod = "mod_lg1";
hx_0.LAmod = "mod_la1";
hx_0.RAmod = "mod_ra1";
hx_0.WImod = null;
hx_0.SHDmod = "mod_shd4";
hx_0.MAmod = null;
hx_0.mod = new Array();
if(_global[hx_0.BDmod + "_1"] != undefined)
{
   hx_0.mod = hx_0.mod.concat(_global[hx_0.BDmod + "_1"]);
}
if(_global[hx_0.LGmod + "_1"] != undefined)
{
   hx_0.mod = hx_0.mod.concat(_global[hx_0.LGmod + "_1"]);
}
if(_global[hx_0.LAmod + "_1"] != undefined)
{
   hx_0.mod = hx_0.mod.concat(_global[hx_0.LAmod + "_1"]);
}
if(_global[hx_0.RAmod + "_1"] != undefined)
{
   hx_0.mod = hx_0.mod.concat(_global[hx_0.RAmod + "_1"]);
}
if(_global[hx_0.WImod + "_1"] != undefined)
{
   hx_0.mod = hx_0.mod.concat(_global[hx_0.WImod + "_1"]);
}
if(_global[hx_0.SHDmod + "_1"] != undefined)
{
   hx_0.mod = hx_0.mod.concat(_global[hx_0.SHDmod + "_1"]);
}
_global.hx_0ntr = new Object();
hx_0ntr._protype = "hx_0ntr";
hx_0ntr.$NAME = "幼女控";
hx_0ntr.$TYPE = "HX-0";
hx_0ntr._type = "MS";
hx_0ntr._size = "M";
hx_0ntr.maxHP = 3800;
hx_0ntr.maxEN = 4850;
hx_0ntr._DF = 365;
hx_0ntr.speedlv = 80;
hx_0ntr.subpowlv = 83;
hx_0ntr.turnlv = 80;
hx_0ntr.locklv = 80;
hx_0ntr._defeq = null;
hx_0ntr._atteq = "NTR";
hx_0ntr.wp1 = "Bvulcan_0";
hx_0ntr.wp2 = "LBrifle_1";
hx_0ntr.wp3 = "Bazooka_1";
hx_0ntr.wp4 = "TJ911_10";
hx_0ntr.wp5 = "null";
hx_0ntr.wp6 = "Bsword_1";
hx_0ntr.wp7 = "Shootgun_0";
hx_0ntr.wp8 = "QiShe_1";
hx_0ntr.BDmod = "mod_bd27";
hx_0ntr.LGmod = "mod_lg3";
hx_0ntr.LAmod = "mod_la12";
hx_0ntr.RAmod = "mod_ra12";
hx_0ntr.WImod = "mod_wi6";
hx_0ntr.SHDmod = "mod_shd13";
hx_0ntr.MAmod = null;
hx_0ntr.mod = new Array();
if(_global[hx_0ntr.BDmod + "_1"] != undefined)
{
   hx_0ntr.mod = hx_0ntr.mod.concat(_global[hx_0ntr.BDmod + "_1"]);
}
if(_global[hx_0ntr.LGmod + "_1"] != undefined)
{
   hx_0ntr.mod = hx_0ntr.mod.concat(_global[hx_0ntr.LGmod + "_1"]);
}
if(_global[hx_0ntr.LAmod + "_1"] != undefined)
{
   hx_0ntr.mod = hx_0ntr.mod.concat(_global[hx_0ntr.LAmod + "_1"]);
}
if(_global[hx_0ntr.RAmod + "_1"] != undefined)
{
   hx_0ntr.mod = hx_0ntr.mod.concat(_global[hx_0ntr.RAmod + "_1"]);
}
if(_global[hx_0ntr.WImod + "_1"] != undefined)
{
   hx_0ntr.mod = hx_0ntr.mod.concat(_global[hx_0ntr.WImod + "_1"]);
}
if(_global[hx_0ntr.SHDmod + "_1"] != undefined)
{
   hx_0ntr.mod = hx_0ntr.mod.concat(_global[hx_0ntr.SHDmod + "_1"]);
}
_global.hx_0fa = new Object();
hx_0fa._protype = "hx_0fa";
hx_0fa.$NAME = "重装毒叫兽";
hx_0fa.$TYPE = "HX-0FA";
hx_0fa._type = "MS";
hx_0fa._size = "M";
hx_0fa.maxHP = 4470;
hx_0fa.maxEN = 5250;
hx_0fa._DF = 560;
hx_0fa.speedlv = 84;
hx_0fa.subpowlv = 78;
hx_0fa.turnlv = 75;
hx_0fa.locklv = 90;
hx_0fa._defeq = null;
hx_0fa._atteq = "NTR";
hx_0fa.coreUnit = "hx_0ntr";
hx_0fa.wp1 = "BmachinegunX4_0";
hx_0fa.wp2 = "LBrifle_1";
hx_0fa.wp3 = "SmissileX3_0";
hx_0fa.wp4 = "QiShe_0";
hx_0fa.wp5 = "MmissileX3_0";
hx_0fa.wp6 = "Bsaber_0";
hx_0fa.wp7 = "SHfunnal_0";
hx_0fa.wp8 = "TJ911_3";
hx_0fa.BDmod = "mod_bd27";
hx_0fa.LGmod = "mod_lg5";
hx_0fa.LAmod = "mod_la22";
hx_0fa.RAmod = "mod_ra22";
hx_0fa.WImod = "mod_wi31";
hx_0fa.SHDmod = "mod_shd1";
hx_0fa.MAmod = null;
hx_0fa.mod = new Array();
if(_global[hx_0fa.BDmod + "_1"] != undefined)
{
   hx_0fa.mod = hx_0fa.mod.concat(_global[hx_0fa.BDmod + "_1"]);
}
if(_global[hx_0fa.LGmod + "_1"] != undefined)
{
   hx_0fa.mod = hx_0fa.mod.concat(_global[hx_0fa.LGmod + "_1"]);
}
if(_global[hx_0fa.LAmod + "_1"] != undefined)
{
   hx_0fa.mod = hx_0fa.mod.concat(_global[hx_0fa.LAmod + "_1"]);
}
if(_global[hx_0fa.RAmod + "_1"] != undefined)
{
   hx_0fa.mod = hx_0fa.mod.concat(_global[hx_0fa.RAmod + "_1"]);
}
if(_global[hx_0fa.WImod + "_1"] != undefined)
{
   hx_0fa.mod = hx_0fa.mod.concat(_global[hx_0fa.WImod + "_1"]);
}
if(_global[hx_0fa.SHDmod + "_1"] != undefined)
{
   hx_0fa.mod = hx_0fa.mod.concat(_global[hx_0fa.SHDmod + "_1"]);
}
_global.rqz_95 = new Object();
rqz_95._protype = "rqz_95";
rqz_95.$NAME = "亮贼";
rqz_95.$TYPE = "RQZ-95";
rqz_95._type = "TMS";
rqz_95._size = "M";
rqz_95.maxHP = 2580;
rqz_95.maxEN = 2950;
rqz_95._DF = 210;
rqz_95.speedlv = 61;
rqz_95.subpowlv = 57;
rqz_95.turnlv = 54;
rqz_95.locklv = 53;
rqz_95._DF2 = 270;
rqz_95.speedlv2 = 78;
rqz_95.subpowlv2 = 6;
rqz_95.turnlv2 = 45;
rqz_95.locklv2 = 53;
rqz_95._defeq = null;
rqz_95._atteq = null;
rqz_95.wp1 = "Hvulcan_0";
rqz_95.wp2 = "Bmachinegun_0";
rqz_95.wp3 = "Bbazooka_1";
rqz_95.wp4 = "TJ911_4";
rqz_95.wp5 = "null";
rqz_95.wp6 = "Bsword_0";
rqz_95.wp7 = "MmissileX3_0";
rqz_95.wp8 = "null";
rqz_95.BDmod = "mod_bd28";
rqz_95.LGmod = "mod_lg3";
rqz_95.LAmod = "mod_la9";
rqz_95.RAmod = "mod_ra9";
rqz_95.WImod = "mod_wi27";
rqz_95.SHDmod = "mod_shd12";
rqz_95.MAmod = "mod_ma23";
rqz_95.mod = new Array();
if(_global[rqz_95.BDmod + "_1"] != undefined)
{
   rqz_95.mod = rqz_95.mod.concat(_global[rqz_95.BDmod + "_1"]);
}
if(_global[rqz_95.LGmod + "_1"] != undefined)
{
   rqz_95.mod = rqz_95.mod.concat(_global[rqz_95.LGmod + "_1"]);
}
if(_global[rqz_95.LAmod + "_1"] != undefined)
{
   rqz_95.mod = rqz_95.mod.concat(_global[rqz_95.LAmod + "_1"]);
}
if(_global[rqz_95.RAmod + "_1"] != undefined)
{
   rqz_95.mod = rqz_95.mod.concat(_global[rqz_95.RAmod + "_1"]);
}
if(_global[rqz_95.WImod + "_1"] != undefined)
{
   rqz_95.mod = rqz_95.mod.concat(_global[rqz_95.WImod + "_1"]);
}
if(_global[rqz_95.SHDmod + "_1"] != undefined)
{
   rqz_95.mod = rqz_95.mod.concat(_global[rqz_95.SHDmod + "_1"]);
}
_global.mxa_005 = new Object();
mxa_005._protype = "mxa_005";
mxa_005.$NAME = "没打死";
mxa_005.$TYPE = "MXA-005";
mxa_005._type = "TMA";
mxa_005._size = "M";
mxa_005.maxHP = 1880;
mxa_005.maxEN = 2450;
mxa_005._DF = 210;
mxa_005.speedlv = 58;
mxa_005.subpowlv = 10;
mxa_005.turnlv = 45;
mxa_005.locklv = 42;
mxa_005._DF2 = 160;
mxa_005.speedlv2 = 47;
mxa_005.subpowlv2 = 45;
mxa_005.turnlv2 = 51;
mxa_005.locklv2 = 42;
mxa_005._defeq = null;
mxa_005._atteq = null;
mxa_005.wp1 = "Hvulcan_0";
mxa_005.wp2 = "BeamgunX2_1";
mxa_005.wp3 = "HPHL_0";
mxa_005.wp4 = "TJ911_6";
mxa_005.wp5 = "null";
mxa_005.wp6 = "Bsword_0";
mxa_005.wp7 = "null";
mxa_005.wp8 = "null";
mxa_005.BDmod = "mod_bd28";
mxa_005.LGmod = "mod_lg4";
mxa_005.LAmod = "mod_la12";
mxa_005.RAmod = "mod_ra12";
mxa_005.WImod = "mod_wi27";
mxa_005.MAmod = "mod_ma21";
mxa_005.mod = new Array();
if(_global[mxa_005.MAmod + "_1"] != undefined)
{
   mxa_005.mod = mxa_005.mod.concat(_global[mxa_005.MAmod + "_1"]);
}
_global.emx_129 = new Object();
emx_129._protype = "emx_129";
emx_129.$NAME = "基拉·足卤";
emx_129.$TYPE = "EMX-129";
emx_129._type = "MS";
emx_129._size = "M";
emx_129.maxHP = 2620;
emx_129.maxEN = 2445;
emx_129._DF = 280;
emx_129.speedlv = 51;
emx_129.subpowlv = 59;
emx_129.turnlv = 55;
emx_129.locklv = 45;
emx_129._defeq = null;
emx_129._atteq = null;
emx_129.wp1 = "MmissileX2_0";
emx_129.wp2 = "Bmachinegun_0";
emx_129.wp3 = "LBrifle_0";
emx_129.wp4 = "TJ911_5";
emx_129.wp5 = "null";
emx_129.wp6 = "Haxe_1";
emx_129.wp7 = "Mgun120_0";
emx_129.wp8 = "null";
emx_129.BDmod = "mod_bd6";
emx_129.LGmod = "mod_lg5";
emx_129.LAmod = "mod_la6";
emx_129.RAmod = "mod_ra5";
emx_129.WImod = "mod_wi28";
emx_129.MAmod = null;
emx_129.mod = new Array();
if(_global[emx_129.BDmod + "_1"] != undefined)
{
   emx_129.mod = emx_129.mod.concat(_global[emx_129.BDmod + "_1"]);
}
if(_global[emx_129.LGmod + "_1"] != undefined)
{
   emx_129.mod = emx_129.mod.concat(_global[emx_129.LGmod + "_1"]);
}
if(_global[emx_129.LAmod + "_1"] != undefined)
{
   emx_129.mod = emx_129.mod.concat(_global[emx_129.LAmod + "_1"]);
}
if(_global[emx_129.RAmod + "_1"] != undefined)
{
   emx_129.mod = emx_129.mod.concat(_global[emx_129.RAmod + "_1"]);
}
if(_global[emx_129.WImod + "_1"] != undefined)
{
   emx_129.mod = emx_129.mod.concat(_global[emx_129.WImod + "_1"]);
}
_global.men_06s = new Object();
men_06s._protype = "men_06s";
men_06s.$NAME = "新安州";
men_06s.$TYPE = "MEN-06S";
men_06s._type = "MS";
men_06s._size = "M";
men_06s.maxHP = 3950;
men_06s.maxEN = 4450;
men_06s._DF = 500;
men_06s.speedlv = 87;
men_06s.subpowlv = 71;
men_06s.turnlv = 84;
men_06s.locklv = 87;
men_06s._defeq = null;
men_06s._atteq = "NTR";
men_06s.wp1 = "Bvulcan_0";
men_06s.wp2 = "Brifle_2";
men_06s.wp3 = "SBazooka_1";
men_06s.wp4 = "QiShe_1";
men_06s.wp5 = "MmissileX3_1";
men_06s.wp6 = "Bsaber_1";
men_06s.wp7 = "Boomerang_0";
men_06s.wp8 = "TJ911_10";
men_06s.BDmod = "mod_bd30";
men_06s.LGmod = "mod_lg5";
men_06s.LAmod = "mod_la20";
men_06s.RAmod = "mod_ra20";
men_06s.WImod = "mod_wi29";
men_06s.SHDmod = "mod_shd6";
men_06s.MAmod = null;
men_06s.mod = new Array();
if(_global[men_06s.BDmod + "_1"] != undefined)
{
   men_06s.mod = men_06s.mod.concat(_global[men_06s.BDmod + "_1"]);
}
if(_global[men_06s.LGmod + "_1"] != undefined)
{
   men_06s.mod = men_06s.mod.concat(_global[men_06s.LGmod + "_1"]);
}
if(_global[men_06s.LAmod + "_1"] != undefined)
{
   men_06s.mod = men_06s.mod.concat(_global[men_06s.LAmod + "_1"]);
}
if(_global[men_06s.RAmod + "_1"] != undefined)
{
   men_06s.mod = men_06s.mod.concat(_global[men_06s.RAmod + "_1"]);
}
if(_global[men_06s.WImod + "_1"] != undefined)
{
   men_06s.mod = men_06s.mod.concat(_global[men_06s.WImod + "_1"]);
}
if(_global[men_06s.SHDmod + "_1"] != undefined)
{
   men_06s.mod = men_06s.mod.concat(_global[men_06s.SHDmod + "_1"]);
}
_global.hx_77 = new Object();
hx_77._protype = "hx_77";
hx_77.$NAME = "钢炮";
hx_77.$TYPE = "HX-77";
hx_77._type = "MS";
hx_77._size = "M";
hx_77.maxHP = 1520;
hx_77.maxEN = 1850;
hx_77._DF = 210;
hx_77.speedlv = 35;
hx_77.subpowlv = 35;
hx_77.turnlv = 40;
hx_77.locklv = 40;
hx_77._defeq = null;
hx_77._atteq = null;
hx_77.wp1 = "Hvulcan_0";
hx_77.wp2 = "Brifle_0";
hx_77.wp3 = "CannonX2_0";
hx_77.wp4 = "TJ911_7";
hx_77.wp5 = "null";
hx_77.wp6 = "Bsword_0";
hx_77.wp7 = "Cbazooka_0";
hx_77.wp8 = "null";
hx_77.BDmod = "mod_bd6";
hx_77.LGmod = "mod_lg6";
hx_77.LAmod = "mod_la1";
hx_77.RAmod = "mod_ra1";
hx_77.SHDmod = null;
hx_77.WImod = "mod_wi7";
hx_77.MAmod = null;
hx_77.mod = new Array();
if(_global[hx_77.BDmod + "_1"] != undefined)
{
   hx_77.mod = hx_77.mod.concat(_global[hx_77.BDmod + "_1"]);
}
if(_global[hx_77.LGmod + "_1"] != undefined)
{
   hx_77.mod = hx_77.mod.concat(_global[hx_77.LGmod + "_1"]);
}
if(_global[hx_77.LAmod + "_1"] != undefined)
{
   hx_77.mod = hx_77.mod.concat(_global[hx_77.LAmod + "_1"]);
}
if(_global[hx_77.RAmod + "_1"] != undefined)
{
   hx_77.mod = hx_77.mod.concat(_global[hx_77.RAmod + "_1"]);
}
if(_global[hx_77.WImod + "_1"] != undefined)
{
   hx_77.mod = hx_77.mod.concat(_global[hx_77.WImod + "_1"]);
}
if(_global[hx_77.SHDmod + "_1"] != undefined)
{
   hx_77.mod = hx_77.mod.concat(_global[hx_77.SHDmod + "_1"]);
}
_global.gnt_0000 = new Object();
gnt_0000._protype = "gnt_0000";
gnt_0000.$NAME = "00Q";
gnt_0000.$TYPE = "GNT-0000";
gnt_0000._type = "MS";
gnt_0000._size = "M";
gnt_0000.maxHP = 3550;
gnt_0000.maxEN = 5050;
gnt_0000._DF = 400;
gnt_0000.speedlv = 89;
gnt_0000.subpowlv = 76;
gnt_0000.turnlv = 84;
gnt_0000.locklv = 72;
gnt_0000._defeq = null;
gnt_0000._atteq = null;
gnt_0000.wp1 = "Bvulcan_0";
gnt_0000.wp2 = "GNrifle_0";
gnt_0000.wp3 = "GNfunnalX6_0";
gnt_0000.wp4 = "SPcannon_0";
gnt_0000.wp5 = "null";
gnt_0000.wp6 = "GNsaber_0";
gnt_0000.wp7 = "LBsword_0";
gnt_0000.wp8 = "TJ911_10";
gnt_0000.BDmod = "mod_bd26";
gnt_0000.LGmod = "mod_lg7";
gnt_0000.LAmod = "mod_la1";
gnt_0000.RAmod = "mod_ra1";
gnt_0000.WImod = null;
gnt_0000.SHDmod = "mod_shd14";
gnt_0000.MAmod = null;
gnt_0000.mod = new Array();
if(_global[gnt_0000.BDmod + "_1"] != undefined)
{
   gnt_0000.mod = gnt_0000.mod.concat(_global[gnt_0000.BDmod + "_1"]);
}
if(_global[gnt_0000.LGmod + "_1"] != undefined)
{
   gnt_0000.mod = gnt_0000.mod.concat(_global[gnt_0000.LGmod + "_1"]);
}
if(_global[gnt_0000.LAmod + "_1"] != undefined)
{
   gnt_0000.mod = gnt_0000.mod.concat(_global[gnt_0000.LAmod + "_1"]);
}
if(_global[gnt_0000.RAmod + "_1"] != undefined)
{
   gnt_0000.mod = gnt_0000.mod.concat(_global[gnt_0000.RAmod + "_1"]);
}
if(_global[gnt_0000.WImod + "_1"] != undefined)
{
   gnt_0000.mod = gnt_0000.mod.concat(_global[gnt_0000.WImod + "_1"]);
}
if(_global[gnt_0000.SHDmod + "_1"] != undefined)
{
   gnt_0000.mod = gnt_0000.mod.concat(_global[gnt_0000.SHDmod + "_1"]);
}
_global.gn_010 = new Object();
gn_010._protype = "gn_010";
gn_010.$NAME = "ZABANYA";
gn_010.$TYPE = "GN-010";
gn_010._type = "MS";
gn_010._size = "M";
gn_010.maxHP = 3750;
gn_010.maxEN = 4350;
gn_010._DF = 540;
gn_010.speedlv = 77;
gn_010.subpowlv = 71;
gn_010.turnlv = 74;
gn_010.locklv = 98;
gn_010._defeq = null;
gn_010._atteq = null;
gn_010.wp1 = "Bsaber_0";
gn_010.wp2 = "GNLrifle_0";
gn_010.wp3 = "GNfunnalX5_0";
gn_010.wp4 = "FunnalEX_0";
gn_010.wp5 = "GNgunX2_0";
gn_010.wp6 = "Bsniper_1";
gn_010.wp7 = "MmissileX8_0";
gn_010.wp8 = "BsniperEX_0";
gn_010.BDmod = "mod_bd26";
gn_010.LGmod = "mod_lg9";
gn_010.LAmod = "mod_la9";
gn_010.RAmod = "mod_ra9";
gn_010.WImod = "mod_wi32";
gn_010.SHDmod = null;
gn_010.MAmod = null;
gn_010.mod = new Array();
if(_global[gn_010.BDmod + "_1"] != undefined)
{
   gn_010.mod = gn_010.mod.concat(_global[gn_010.BDmod + "_1"]);
}
if(_global[gn_010.LGmod + "_1"] != undefined)
{
   gn_010.mod = gn_010.mod.concat(_global[gn_010.LGmod + "_1"]);
}
if(_global[gn_010.LAmod + "_1"] != undefined)
{
   gn_010.mod = gn_010.mod.concat(_global[gn_010.LAmod + "_1"]);
}
if(_global[gn_010.RAmod + "_1"] != undefined)
{
   gn_010.mod = gn_010.mod.concat(_global[gn_010.RAmod + "_1"]);
}
if(_global[gn_010.WImod + "_1"] != undefined)
{
   gn_010.mod = gn_010.mod.concat(_global[gn_010.WImod + "_1"]);
}
if(_global[gn_010.SHDmod + "_1"] != undefined)
{
   gn_010.mod = gn_010.mod.concat(_global[gn_010.SHDmod + "_1"]);
}
_global.gn_011 = new Object();
gn_011._protype = "gn_011";
gn_011.$NAME = "HARUTE";
gn_011.$TYPE = "GN-011";
gn_011._type = "TMS";
gn_011._size = "M";
gn_011.maxHP = 3150;
gn_011.maxEN = 4050;
gn_011._DF = 290;
gn_011.speedlv = 87;
gn_011.subpowlv = 75;
gn_011.turnlv = 80;
gn_011.locklv = 80;
gn_011._DF2 = 345;
gn_011.speedlv2 = 95;
gn_011.subpowlv2 = 30;
gn_011.turnlv2 = 34;
gn_011.locklv2 = 80;
gn_011._defeq = null;
gn_011._atteq = null;
gn_011.wp1 = "Bvulcan_0";
gn_011.wp2 = "GNmachinegunX2_0";
gn_011.wp3 = "BcannonX2_2";
gn_011.wp4 = "QiShe_1";
gn_011.wp5 = "null";
gn_011.wp6 = "GNsaberX2_0";
gn_011.wp7 = "MmissileX8_0";
gn_011.wp8 = "TJ911_10";
gn_011.BDmod = "mod_bd7";
gn_011.LGmod = "mod_lg9";
gn_011.LAmod = "mod_la20";
gn_011.RAmod = "mod_ra20";
gn_011.WImod = "mod_wi33";
gn_011.SHDmod = null;
gn_011.MAmod = "mod_ma24";
gn_011.mod = new Array();
if(_global[gn_011.BDmod + "_1"] != undefined)
{
   gn_011.mod = gn_011.mod.concat(_global[gn_011.BDmod + "_1"]);
}
if(_global[gn_011.LGmod + "_1"] != undefined)
{
   gn_011.mod = gn_011.mod.concat(_global[gn_011.LGmod + "_1"]);
}
if(_global[gn_011.LAmod + "_1"] != undefined)
{
   gn_011.mod = gn_011.mod.concat(_global[gn_011.LAmod + "_1"]);
}
if(_global[gn_011.RAmod + "_1"] != undefined)
{
   gn_011.mod = gn_011.mod.concat(_global[gn_011.RAmod + "_1"]);
}
if(_global[gn_011.WImod + "_1"] != undefined)
{
   gn_011.mod = gn_011.mod.concat(_global[gn_011.WImod + "_1"]);
}
if(_global[gn_011.SHDmod + "_1"] != undefined)
{
   gn_011.mod = gn_011.mod.concat(_global[gn_011.SHDmod + "_1"]);
}
_global.cb_002 = new Object();
cb_002._protype = "cb_002";
cb_002.$NAME = "RAPHAEL";
cb_002.$TYPE = "CB-002";
cb_002._type = "MS";
cb_002._size = "M";
cb_002.maxHP = 4300;
cb_002.maxEN = 4900;
cb_002._DF = 520;
cb_002.speedlv = 80;
cb_002.subpowlv = 68;
cb_002.turnlv = 64;
cb_002.locklv = 79;
cb_002._defeq = null;
cb_002._atteq = null;
cb_002.wp1 = "Bsaber_0";
cb_002.wp2 = "Brifle_2";
cb_002.wp3 = "Lfunnal_0";
cb_002.wp4 = "SPcannon_0";
cb_002.wp5 = "null";
cb_002.wp6 = "GNcannon_0";
cb_002.wp7 = "BBcannon_0";
cb_002.wp8 = "null";
cb_002.BDmod = "mod_bd26";
cb_002.LGmod = "mod_lg7";
cb_002.LAmod = "mod_la12";
cb_002.RAmod = "mod_ra12";
cb_002.WImod = "mod_wi26";
cb_002.SHDmod = null;
cb_002.MAmod = null;
cb_002.mod = new Array();
if(_global[cb_002.BDmod + "_1"] != undefined)
{
   cb_002.mod = cb_002.mod.concat(_global[cb_002.BDmod + "_1"]);
}
if(_global[cb_002.LGmod + "_1"] != undefined)
{
   cb_002.mod = cb_002.mod.concat(_global[cb_002.LGmod + "_1"]);
}
if(_global[cb_002.LAmod + "_1"] != undefined)
{
   cb_002.mod = cb_002.mod.concat(_global[cb_002.LAmod + "_1"]);
}
if(_global[cb_002.RAmod + "_1"] != undefined)
{
   cb_002.mod = cb_002.mod.concat(_global[cb_002.RAmod + "_1"]);
}
if(_global[cb_002.WImod + "_1"] != undefined)
{
   cb_002.mod = cb_002.mod.concat(_global[cb_002.WImod + "_1"]);
}
if(_global[cb_002.SHDmod + "_1"] != undefined)
{
   cb_002.mod = cb_002.mod.concat(_global[cb_002.SHDmod + "_1"]);
}
_global.mxn_101 = new Object();
mxn_101._protype = "mxn_101";
mxn_101.$NAME = "德尔塔";
mxn_101.$TYPE = "MXN-101";
mxn_101._type = "TMS";
mxn_101._size = "M";
mxn_101.maxHP = 2800;
mxn_101.maxEN = 3550;
mxn_101._DF = 235;
mxn_101.speedlv = 72;
mxn_101.subpowlv = 61;
mxn_101.turnlv = 66;
mxn_101.locklv = 69;
mxn_101._DF2 = 305;
mxn_101.speedlv2 = 84;
mxn_101.subpowlv2 = 9;
mxn_101.turnlv2 = 41;
mxn_101.locklv2 = 69;
mxn_101._defeq = null;
mxn_101._atteq = null;
mxn_101.wp1 = "Hvulcan_0";
mxn_101.wp2 = "Brifle_1";
mxn_101.wp3 = "LBrifle_1";
mxn_101.wp4 = "TJ911_3";
mxn_101.wp5 = "MmissileX2_0";
mxn_101.wp6 = "BsaberX2_0";
mxn_101.wp7 = "SBazooka_0";
mxn_101.wp8 = "QiShe_0";
mxn_101.BDmod = "mod_bd15";
mxn_101.LGmod = "mod_lg1";
mxn_101.LAmod = "mod_la1";
mxn_101.RAmod = "mod_ra1";
mxn_101.WImod = "mod_wi15";
mxn_101.SHDmod = "mod_shd12";
mxn_101.MAmod = "mod_ma9";
mxn_101.mod = new Array();
if(_global[mxn_101.BDmod + "_1"] != undefined)
{
   mxn_101.mod = mxn_101.mod.concat(_global[mxn_101.BDmod + "_1"]);
}
if(_global[mxn_101.LGmod + "_1"] != undefined)
{
   mxn_101.mod = mxn_101.mod.concat(_global[mxn_101.LGmod + "_1"]);
}
if(_global[mxn_101.LAmod + "_1"] != undefined)
{
   mxn_101.mod = mxn_101.mod.concat(_global[mxn_101.LAmod + "_1"]);
}
if(_global[mxn_101.RAmod + "_1"] != undefined)
{
   mxn_101.mod = mxn_101.mod.concat(_global[mxn_101.RAmod + "_1"]);
}
if(_global[mxn_101.WImod + "_1"] != undefined)
{
   mxn_101.mod = mxn_101.mod.concat(_global[mxn_101.WImod + "_1"]);
}
var maxmdb = new Array();
maxmdb.push("phix_0");
maxmdb.push("hx_78_2");
maxmdb.push("gb_79");
maxmdb.push("sp_02a");
maxmdb.push("mx_06");
maxmdb.push("mx_07");
maxmdb.push("igm_79");
maxmdb.push("mx_09");
maxmdb.push("hx_77");
maxmdb.push("mx_14");
maxmdb.push("mxn_02");
maxmdb.push("hx_78_2r");
maxmdb.push("eg_01");
maxmdb.push("eg_02");
maxmdb.push("egx_04");
maxmdb.push("gb_79r");
maxmdb.push("emx_002");
maxmdb.push("eg_03");
maxmdb.push("rmx_106");
maxmdb.push("mxa_099");
maxmdb.push("mxa_005");
maxmdb.push("hx_178");
maxmdb.push("mxn_100");
maxmdb.push("mxz_06");
maxmdb.push("hx_139");
maxmdb.push("nrs_055");
maxmdb.push("emx_003");
maxmdb.push("emx_004");
maxmdb.push("fmx_003");
maxmdb.push("mxz_010");
maxmdb.push("emx_102");
maxmdb.push("emx_103");
maxmdb.push("emx_104");
maxmdb.push("emx_107");
maxmdb.push("emx_004g");
maxmdb.push("mxa_0011");
maxmdb.push("mz_000");
maxmdb.push("igm_89");
maxmdb.push("rqz_91bws");
maxmdb.push("mxn_03");
maxmdb.push("hx_93");
maxmdb.push("mxn_04");
maxmdb.push("hx_93_2");
maxmdb.push("mxn_04_2");
maxmdb.push("mz_333");
maxmdb.push("emx_129");
maxmdb.push("rqz_95");
maxmdb.push("igm_89s");
maxmdb.push("mxn_101");
maxmdb.push("mz_666");
maxmdb.push("men_06s");
maxmdb.push("hx_0");
maxmdb.push("hx_0fa");
maxmdb.push("egx_04r");
maxmdb.push("egx_04rFA");
maxmdb.push("sm_04");
maxmdb.push("mzl_70");
maxmdb.push("sb_79");
maxmdb.push("hx_78s");
maxmdb.push("gnt_0000");
maxmdb.push("gn_010");
maxmdb.push("gn_011");
maxmdb.push("cb_002");
var q = 1;
while(q <= 20)
{
   maxmdb.push("phix_" + q);
   q++;
}
var msmdb = new Array();
var bossmdb = new Array();
var Zindex = 0;
var dataTmp = "";
