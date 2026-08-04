function intKEYMAP()
{
   KEYMAP.move_1 = 87;
   KEYMAP.move_2 = 83;
   KEYMAP.move_3 = 65;
   KEYMAP.move_4 = 68;
   KEYMAP.move_5 = 82;
   KEYMAP.move_6 = 70;
   KEYMAP.move_f1 = 81;
   KEYMAP.move_f2 = 69;
   KEYMAP.selectWP_1 = 49;
   KEYMAP.selectWP_2 = 50;
   KEYMAP.selectWP_3 = 51;
   KEYMAP.selectWP_4 = 52;
   KEYMAP.func_1 = 90;
   KEYMAP.func_2 = 88;
   KEYMAP.func_3 = 67;
   KEYMAP.selectAndPlayWP_1 = 85;
   KEYMAP.selectAndPlayWP_2 = 73;
   KEYMAP.selectAndPlayWP_3 = 74;
   KEYMAP.selectAndPlayWP_4 = 75;
   KEYMAP.selectTGT = 76;
   KEYMAP.castSkill = 32;
   KEYMAP.switchWPT = 79;
}
_global.Cmr = new Object();
_global.KEYMAP = new Object();
intKEYMAP();
_global.stopAll = false;
var bgmVol;
var sndVol;
var vocVol;
OptLoad();
if(!_root.islockSave())
{
}
if(this.bgmVol == null)
{
   this.bgmVol = 40 + random(20);
}
if(this.sndVol == null)
{
   this.sndVol = this.bgmVol;
}
if(this.vocVol == null)
{
   this.vocVol = this.bgmVol;
}
if(_global.tx_liz == null)
{
   _global.tx_liz = true;
}
if(_global.tx_rock == null)
{
   _global.tx_rock = true;
}
if(_global.tx_wj == null)
{
   _global.tx_wj = true;
}
if(_global.autoQUA == null)
{
   _global.autoQUA = true;
}
if(_global.BGon == null)
{
   _global.BGon = true;
}
_global.objmove = function(obj, px, py, pz)
{
   var _loc2_ = new Object();
   _loc2_ = cTos(px,py,pz,obj._sW,obj._sH,obj._sR);
   obj._sX += _loc2_.x;
   obj._sY += _loc2_.y;
   obj._sZ += _loc2_.z;
};
_global.moveobj = function(obj, px, py, pz)
{
   var _loc1_ = new Object();
   _loc1_ = cTos(px,py,pz,obj._sW,obj._sH,obj._sR);
   _loc1_.x += obj._sX;
   _loc1_.y += obj._sY;
   _loc1_.z += obj._sZ;
   return _loc1_;
};
_global.getobjv = function(obj, px, py, pz)
{
   var _loc1_ = new Object();
   _loc1_ = cTos(px,py,pz,obj._sW,obj._sH,obj._sR);
   return _loc1_;
};
_global.objrotate = function(obj, pw, ph, pr)
{
   var _loc12_ = 0;
   var _loc10_ = 1;
   var _loc8_ = 0;
   var _loc11_ = 0;
   var _loc9_ = 0;
   var _loc6_ = 1;
   var _loc2_ = new Object();
   _loc2_ = cTos(_loc12_,_loc10_,_loc8_,pw,ph,pr);
   _loc2_ = cTos(_loc2_.x,_loc2_.y,_loc2_.z,obj._sW,obj._sH,obj._sR);
   var _loc1_ = new Object();
   _loc1_ = cTos(_loc11_,_loc9_,_loc6_,pw,ph,pr);
   _loc1_ = cTos(_loc1_.x,_loc1_.y,_loc1_.z,obj._sW,obj._sH,obj._sR);
   var _loc4_ = Math.atan2(_loc2_.x,_loc2_.y);
   var _loc5_ = Math.atan2(_loc2_.z,_loc2_.y / Math.cos(_loc4_));
   _loc1_ = sToc(_loc1_.x,_loc1_.y,_loc1_.z,_loc4_,_loc5_,0);
   var _loc7_ = Math.atan2(- _loc1_.x,_loc1_.z);
   obj._sW = _loc4_;
   obj._sH = _loc5_;
   obj._sR = _loc7_;
};
_global.rotateobj = function(obj, pw, ph, pr)
{
   var _loc12_ = 0;
   var _loc10_ = 1;
   var _loc8_ = 0;
   var _loc11_ = 0;
   var _loc9_ = 0;
   var _loc6_ = 1;
   var _loc2_ = new Object();
   _loc2_ = cTos(_loc12_,_loc10_,_loc8_,pw,ph,pr);
   _loc2_ = cTos(_loc2_.x,_loc2_.y,_loc2_.z,obj._sW,obj._sH,obj._sR);
   var _loc1_ = new Object();
   _loc1_ = cTos(_loc11_,_loc9_,_loc6_,pw,ph,pr);
   _loc1_ = cTos(_loc1_.x,_loc1_.y,_loc1_.z,obj._sW,obj._sH,obj._sR);
   var _loc4_ = Math.atan2(_loc2_.x,_loc2_.y);
   var _loc5_ = Math.atan2(_loc2_.z,_loc2_.y / Math.cos(_loc4_));
   _loc1_ = sToc(_loc1_.x,_loc1_.y,_loc1_.z,_loc4_,_loc5_,0);
   var _loc7_ = Math.atan2(- _loc1_.x,_loc1_.z);
   return {w:_loc4_,h:_loc5_,r:_loc7_};
};
_global.Cmr._sX = 0;
_global.Cmr._sY = 0;
_global.Cmr._sZ = 0;
_global.Cmr._sH = 0;
_global.Cmr._sW = 0;
_global.Cmr._sR = 0;
_global.Cmr._ch = 500;
_global.Cmr._cw = 800;
_global.Cmr.Zoom = 500;
_global.Cmr.hree = 0.5 * _global.Cmr._ch / _global.Cmr.Zoom;
_global.Cmr.wree = 0.5 * _global.Cmr._cw / _global.Cmr.Zoom;
_global.Cmr.hrees = 0.4 * _global.Cmr._ch / _global.Cmr.Zoom;
_global.Cmr.wrees = 0.4 * _global.Cmr._cw / _global.Cmr.Zoom;
if(_global.Cmr.VisibleLV == null)
{
   _global.Cmr.VisibleLV = 30;
}
_global.Cmr.BD = 0.1 * _global.Cmr.Zoom;
_global.Cmr.setcmr = function(cx, cy, cz, ch, cw)
{
   Cmr._sX = cx;
   Cmr._sY = cy;
   Cmr._sZ = cz;
   Cmr._sH = ch;
   Cmr._sW = cw;
};
_global.Cmr.isShow = 0;
if(_global.jumpFrame == null)
{
   _global.jumpFrame = false;
   _global.Cmr.isShow = 0;
}
else if(_global.jumpFrame)
{
   _global.Cmr.isShow = 1;
}
else
{
   _global.Cmr.isShow = 0;
}
_global.Cmr.shows = function()
{
   if(_root.cmrs[this.tgt].v._pt > 10 && _global.cmrmode == 1)
   {
      _root.liztx._visible = true;
      for(var _loc4_ in _root.liztx)
      {
         _root.liztx[_loc4_].playit();
         _root.liztx[_loc4_].showcmr();
      }
   }
   else
   {
      _root.liztx._visible = false;
   }
   for(var _loc6_ in _root.cmrs)
   {
      _root.cmrs[_loc6_].showcmr();
   }
   for(var _loc5_ in _root.mbj)
   {
      _root.mbj[_loc5_].showcmr();
   }
};
_global.Cmr.moveandroat = function()
{
   this.mode1(_root.cmrs[this.tgt],0,- Cmr.BD,10,0.5);
};
_global.Cmr.v = new Object();
_global.Cmr.v._sX = 0;
_global.Cmr.v._sY = 0;
_global.Cmr.v._sZ = 0;
_global.Cmr.tgt;
_global.cmrfg = 0;
_global.cmrmode = 0;
var GDt = 0;
_global.Cmr.mode1 = function(tgt, lx, ly, lz, vee)
{
   _global.cmrmode = 1;
   var _loc10_ = tgt._name;
   if(tgt != undefined)
   {
      if(tgt.scmrfg < 0)
      {
         this.mode3(tgt,200,4000);
         this.tgt = _loc10_;
         return null;
      }
      if(tgt.scmrfg != undefined && tgt.scmrfg > 0)
      {
         vee = 1;
         if(tgt.scmrfg > 25)
         {
            var _loc4_ = new Object();
            if(tgt.scmrfg > 35 && tgt._parent[tgt.tgt] != undefined)
            {
               _loc4_._sX = tgt._sX + tgt._parent[tgt.tgt].v._sX - tgt.v._sX;
               _loc4_._sY = tgt._sY + tgt._parent[tgt.tgt].v._sY - tgt.v._sY;
               _loc4_._sZ = tgt._sZ + tgt._parent[tgt.tgt].v._sZ - tgt.v._sZ;
            }
            else
            {
               _loc4_._sX = tgt._sX;
               _loc4_._sY = tgt._sY;
               _loc4_._sZ = tgt._sZ;
            }
            _loc4_._rR = 0;
            _loc4_._rH = 0;
            _loc4_._rW = 0;
            _loc4_._sR = tgt._sR;
            _loc4_._sW = Math.atan2(tgt.tgtdc._sX,tgt.tgtdc._sY);
            _loc4_._sH = Math.atan2(tgt.tgtdc._sZ,_global.distance(0,0,tgt.tgtdc._sX,tgt.tgtdc._sY));
            ly = tgt.dst - 200;
            lz = 0;
            tgt = new Object();
            tgt = _loc4_;
         }
         else if(tgt.hypt > 0)
         {
            ly = -4 * Cmr.BD;
            _loc4_ = new Object();
            _loc4_._sW = tgt._sW;
            _loc4_._sH = tgt._sH - 0.031415926535897934 * _global.cmrfg;
            _global.cmrfg = _global.cmrfg + 1;
            if(_global.cmrfg > 20)
            {
               _global.cmrfg = 20;
            }
            _loc4_._sR = tgt._sR;
            _loc4_._sX = tgt._sX;
            _loc4_._sY = tgt._sY;
            _loc4_._sZ = tgt._sZ;
            _loc4_._rR = 0;
            _loc4_._rH = 0;
            _loc4_._rW = 0;
            tgt = new Object();
            tgt = _loc4_;
            vee = 0.5;
         }
      }
      else
      {
         _global.cmrfg = 0;
      }
      if(vee == null)
      {
         vee = 0.5;
      }
      if(GDt > 0)
      {
         GDt--;
      }
      if(tgt._rR != 0)
      {
         var _loc9_ = Math.abs(tgt._rR / 3.141592653589793) + 1;
         var _loc16_ = Math.cos(tgt._rR);
         var _loc13_ = Math.sin(tgt._rR);
         var _loc15_ = _loc9_ * (lx * _loc16_ - lz * _loc13_);
         var _loc12_ = _loc9_ * (lx * _loc13_ + lz * _loc16_);
         var _loc8_ = moveobj(tgt,_loc15_,ly,_loc12_);
      }
      else if(tgt._rH != 0)
      {
         _loc9_ = Math.abs(tgt._rH / 3.141592653589793) + 1;
         _loc16_ = Math.cos(tgt._rH);
         _loc13_ = Math.sin(tgt._rH);
         var _loc14_ = ly - _loc9_ * lz * _loc13_;
         _loc12_ = _loc9_ * lz * _loc16_;
         _loc8_ = moveobj(tgt,lx,_loc14_,_loc12_);
      }
      else
      {
         _loc8_ = moveobj(tgt,lx,ly,lz);
      }
      this.v._sZ = (_loc8_.z - this._sZ) * vee;
      this.v._sX = (_loc8_.x - this._sX) * vee;
      this.v._sY = (_loc8_.y - this._sY) * vee;
      this.v._pt = dist_3d(0,0,0,this.v._sX,this.v._sY,this.v._sZ);
      this._sZ += this.v._sZ;
      this._sX += this.v._sX;
      this._sY += this.v._sY;
      this._sW = tgt._sW;
      this._sH = tgt._sH;
      this._sR = tgt._sR;
   }
   this.tgt = _loc10_;
};
_global.Cmr.mode2 = function(tgt, r1, r2)
{
   if(r1 == null)
   {
      r1 = 100;
   }
   if(r2 == null)
   {
      r2 = 200;
   }
   _global.cmrmode = 2;
   var _loc20_ = tgt._name;
   if(tgt != undefined)
   {
      var _loc18_ = tgt._sX - _global.Battle._sX;
      var _loc17_ = tgt._sY - _global.Battle._sY;
      var _loc16_ = tgt._sZ - _global.Battle._sZ;
      var _loc12_ = dist_3d(0,0,0,_loc18_,_loc17_,_loc16_);
      r1 += 2 * _loc12_;
      r2 += 2 * _loc12_;
      var _loc7_ = _global.Battle._sX - this._sX;
      var _loc6_ = _global.Battle._sY - this._sY;
      var _loc4_ = _global.Battle._sZ - this._sZ;
      var _loc5_ = dist_3d(0,0,0,_loc7_,_loc6_,_loc4_);
      if(_loc5_ > r2)
      {
         var _loc9_ = -0.05 * (-1 + r2 / _loc5_);
         this.v._sZ = _loc9_ * _loc4_ + this.v._sZ * 0.9;
         this.v._sX = _loc9_ * _loc7_ + this.v._sX * 0.9;
         this.v._sY = _loc9_ * _loc6_ + this.v._sY * 0.9;
      }
      else if(_loc5_ < r1)
      {
         _loc9_ = -0.05 * (-1 + r1 / _loc5_);
         this.v._sZ = _loc9_ * _loc4_ + this.v._sZ * 0.9;
         this.v._sX = _loc9_ * _loc7_ + this.v._sX * 0.9;
         this.v._sY = _loc9_ * _loc6_ + this.v._sY * 0.9;
      }
      else
      {
         this.v._sZ *= 0.5;
         this.v._sX *= 0.5;
         this.v._sY *= 0.5;
      }
      this.v._pt = dist_3d(0,0,0,this.v._sX,this.v._sY,this.v._sZ);
      this._sZ += this.v._sZ;
      this._sX += this.v._sX;
      this._sY += this.v._sY;
      var _loc3_ = new Object();
      _loc3_ = sToc(_loc7_,_loc6_,_loc4_,this._sW,this._sH,this._sR);
      var _loc14_ = _loc3_.x;
      var _loc21_ = _loc3_.z;
      var _loc13_ = _loc3_.y;
      var _loc19_ = Math.atan2(_loc14_,_loc13_);
      var _loc15_ = Math.atan2(_loc21_,distance(0,0,_loc14_,_loc13_));
      objrotate(this,_loc19_,_loc15_,0);
   }
   this.tgt = _loc20_;
};
_global.Cmr.mode3 = function(tgt, r1, r2)
{
   if(r1 == null)
   {
      r1 = 100;
   }
   if(r2 == null)
   {
      r2 = 200;
   }
   var _loc16_ = tgt._name;
   _global.cmrmode = 3;
   if(tgt != undefined)
   {
      if(tgt._parent[tgt.scmrtgt] != undefined)
      {
         var _loc14_ = (1 - tgt.scmrtgtd) * tgt._parent[tgt.scmrtgt]._sX + tgt.scmrtgtd * tgt._sX - this._sX;
         var _loc12_ = (1 - tgt.scmrtgtd) * tgt._parent[tgt.scmrtgt]._sY + tgt.scmrtgtd * tgt._sY - this._sY;
         var _loc11_ = (1 - tgt.scmrtgtd) * tgt._parent[tgt.scmrtgt]._sZ + tgt.scmrtgtd * tgt._sZ - this._sZ;
         var _loc5_ = dist_3d(0,0,0,_loc14_,_loc12_,_loc11_);
         if(_loc5_ > r2)
         {
            var _loc6_ = -0.05 * (-1 + r2 / _loc5_);
            this.v._sZ = _loc6_ * _loc11_ + this.v._sZ * 0.9;
            this.v._sX = _loc6_ * _loc14_ + this.v._sX * 0.9;
            this.v._sY = _loc6_ * _loc12_ + this.v._sY * 0.9;
         }
         else if(_loc5_ < r1)
         {
            _loc6_ = -0.05 * (-1 + r1 / _loc5_);
            this.v._sZ = _loc6_ * _loc11_ + this.v._sZ * 0.9;
            this.v._sX = _loc6_ * _loc14_ + this.v._sX * 0.9;
            this.v._sY = _loc6_ * _loc12_ + this.v._sY * 0.9;
         }
         else
         {
            this.v._sZ *= 0.5;
            this.v._sX *= 0.5;
            this.v._sY *= 0.5;
         }
      }
      else
      {
         _loc14_ = tgt._sX - this._sX;
         _loc12_ = tgt._sY - this._sY;
         _loc11_ = tgt._sZ - this._sZ;
         this.v._sZ *= 0.5;
         this.v._sX *= 0.5;
         this.v._sY *= 0.5;
      }
      this.v._pt = dist_3d(0,0,0,this.v._sX,this.v._sY,this.v._sZ);
      this._sZ += this.v._sZ;
      this._sX += this.v._sX;
      this._sY += this.v._sY;
      var _loc4_ = new Object();
      _loc4_ = sToc(_loc14_,_loc12_,_loc11_,this._sW,this._sH,this._sR);
      var _loc10_ = _loc4_.x;
      var _loc17_ = _loc4_.z;
      var _loc9_ = _loc4_.y;
      var _loc15_ = Math.atan2(_loc10_,_loc9_);
      var _loc13_ = Math.atan2(_loc17_,distance(0,0,_loc10_,_loc9_));
      objrotate(this,_loc15_,_loc13_,0);
   }
   this.tgt = _loc16_;
};
_global.Cmr.mode4 = function(tgt, lx, ly, lz, vee)
{
   if(vee == null)
   {
      vee = 1;
   }
   var _loc17_ = tgt._name;
   _global.cmrmode = 1;
   if(tgt != undefined)
   {
      if(tgt._parent[tgt.tgt] != undefined)
      {
         var _loc11_ = tgt._parent[tgt.tgt]._sX - tgt._sX;
         var _loc9_ = tgt._parent[tgt.tgt]._sY - tgt._sY;
         var _loc8_ = tgt._parent[tgt.tgt]._sZ - tgt._sZ;
         var _loc18_ = dist_3d(0,0,0,_loc11_,_loc9_,_loc8_);
         var _loc5_ = new Object();
         _loc5_ = _global.sToc(_loc11_,_loc9_,_loc8_,tgt._sW,tgt._sH,tgt._sR);
         var _loc7_ = _loc5_.x;
         var _loc14_ = _loc5_.z;
         var _loc6_ = _loc5_.y;
         var _loc12_ = Math.atan2(_loc7_,_loc6_);
         var _loc13_ = Math.atan2(_loc14_,_global.distance(0,0,_loc7_,_loc6_));
         var _loc16_ = new Object();
         _loc16_ = rotateobj(tgt,_loc12_,_loc13_,0);
         _loc5_ = _global.sToc(_loc11_,_loc9_,_loc8_,this._sW,this._sH,this._sR);
         _loc7_ = _loc5_.x;
         _loc14_ = _loc5_.z;
         _loc6_ = _loc5_.y;
         _loc12_ = Math.atan2(_loc7_,_loc6_);
         _loc13_ = Math.atan2(_loc14_,_global.distance(0,0,_loc7_,_loc6_));
         objrotate(this,0.2 * _loc12_,0.2 * _loc13_,0);
         this._sR = _loc16_.r;
      }
      var _loc4_ = new Object();
      _loc4_._sW = this._sW;
      _loc4_._sH = this._sH;
      _loc4_._sR = this._sR;
      _loc4_._sX = tgt._sX;
      _loc4_._sY = tgt._sY;
      _loc4_._sZ = tgt._sZ;
      _loc4_._rR = 0;
      _loc4_._rH = 0;
      _loc4_._rW = 0;
      var _loc15_ = moveobj(_loc4_,lx,ly,lz);
      this.v._sZ = (_loc15_.z - this._sZ) * vee;
      this.v._sX = (_loc15_.x - this._sX) * vee;
      this.v._sY = (_loc15_.y - this._sY) * vee;
      this.v._pt = dist_3d(0,0,0,this.v._sX,this.v._sY,this.v._sZ);
      this._sZ += this.v._sZ;
      this._sX += this.v._sX;
      this._sY += this.v._sY;
   }
   this.tgt = _loc17_;
};
