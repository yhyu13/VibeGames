function randomra()
{
   rx = random(601);
   if(rx < 300)
   {
      rx -= 600;
   }
   ry = random(601);
   if(ry < 300)
   {
      ry -= 600;
   }
   rz = random(601);
   if(rz < 300)
   {
      rz -= 600;
   }
   this.ws = random(3) - 1;
   this.ad = random(3) - 1;
   this.rf = random(3) - 1;
   if(ws == 1)
   {
      this.modact(2,2,2,1,1,1,1);
   }
   else if(ws == -1)
   {
      this.modact(1,3,3,1,1,1,1);
   }
   else if(ad == 1)
   {
      this.modact(1,5,5,1,1,1,1);
   }
   else if(ad == -1)
   {
      this.modact(1,4,4,1,1,1,1);
   }
   else
   {
      this.modact(1,1,1,1,1,1,1);
   }
   var _loc8_ = 10000;
   var _loc9_ = null;
   for(var _loc10_ in _root.cmrs)
   {
      if(_root.cmrs[_loc10_]._force == this.tgt_force)
      {
         var _loc7_ = _parent[_loc10_]._sX - this._sX;
         var _loc6_ = _parent[_loc10_]._sY - this._sY;
         var _loc5_ = _parent[_loc10_]._sZ - this._sZ;
         var _loc4_ = dist_3d(0,0,0,_loc7_,_loc6_,_loc5_);
         if(_loc4_ < _loc8_)
         {
            _loc8_ = _loc4_;
            _loc9_ = _loc10_;
         }
      }
   }
   if(_loc9_ != null && (this._parent[this.tgt] == undefined || random(5) == 0))
   {
      this.tgt = _loc9_;
      this.tgt_main = _loc9_;
   }
}
function bs()
{
   if(!stopAll)
   {
      if(this.bofg > 0)
      {
         this.bofg = this.bofg - 1;
      }
      t++;
      if(this._parent[this.mst] != undefined)
      {
         v._sZ = this._parent[this.mst].v._sZ;
         v._sX = this._parent[this.mst].v._sX;
         v._sY = this._parent[this.mst].v._sY;
      }
      else
      {
         v._sZ = 0;
         v._sX = 0;
         v._sY = 0;
      }
      if(t >= 0)
      {
         v._sZ = speed * Math.sin(this._sH);
         var _loc4_ = speed * Math.cos(this._sH);
         v._sX = _loc4_ * Math.sin(this._sW);
         v._sY = _loc4_ * Math.cos(this._sW);
         this._type = "ff";
         _global.SimpList[this._name] = this;
         _root.jiemiam.addtgt(this._name);
         onEnterFrame = function()
         {
            zd();
         };
      }
   }
}
function zd()
{
   if(!stopAll)
   {
      if(this.bofg > 0)
      {
         this.bofg = this.bofg - 1;
      }
      t++;
      if(t % 5 == 0)
      {
         if(random(6) == 0)
         {
            randomra();
         }
      }
      this.covon = false;
      if(this._parent[this.tgt] == undefined)
      {
         if(this._parent[this.tgt_main] != undefined)
         {
            this.tgt = this.tgt_main;
         }
         else
         {
            onEnterFrame = function()
            {
               back();
            };
         }
      }
      else
      {
         if(_parent[mst] != undefined)
         {
            var _loc19_ = _parent[mst]._sX - this._sX;
            var _loc18_ = _parent[mst]._sY - this._sY;
            var _loc17_ = _parent[mst]._sZ - this._sZ;
         }
         else
         {
            _loc19_ = _global.Battle._sX - this._sX;
            _loc18_ = _global.Battle._sY - this._sY;
            _loc17_ = _global.Battle._sZ - this._sZ;
         }
         var _loc20_ = dist_3d(0,0,0,_loc19_,_loc18_,_loc17_);
         if(_loc20_ > maxforce)
         {
            onEnterFrame = function()
            {
               back();
            };
         }
         var _loc7_ = _parent[tgt]._sX - this._sX;
         var _loc6_ = _parent[tgt]._sY - this._sY;
         var _loc9_ = _parent[tgt]._sZ - this._sZ;
         var _loc14_ = dist_3d(0,0,0,_loc7_,_loc6_,_loc9_);
         if(t > 10)
         {
            _parent[tgt].onkillff(this._name);
         }
         var _loc4_ = new Object();
         _loc4_ = _global.sToc(_loc7_,_loc6_,_loc9_,this._sW,this._sH,this._sR);
         if(_loc4_.y > 0 && Math.abs(_loc4_.x) < 0.5 * _global.Cmr.wrees * _loc4_.y && Math.abs(_loc4_.z) < 0.5 * _global.Cmr.hrees * _loc4_.y)
         {
            this.covon = true;
         }
         dst = _loc14_;
         if(_loc14_ < 2000)
         {
            if(t % 180 <= 45 && t % 30 <= 15)
            {
               if(t % 3 == 0 && this.covon)
               {
                  if(_parent[tgt].AI != undefined)
                  {
                     _parent[tgt].AI.onshoot(this._name);
                  }
                  var _loc16_ = (dst + 20) / 50;
                  _loc7_ += _parent[tgt].v._sX * _loc16_;
                  _loc6_ += _parent[tgt].v._sY * _loc16_;
                  _loc9_ += _parent[tgt].v._sZ * _loc16_;
                  cw = Math.atan2(_loc7_,_loc6_);
                  ch = Math.atan2(_loc9_,distance(0,0,_loc7_,_loc6_));
                  snd("machine1");
                  this._parent.attachMovie("dd_cartridge",_name + "dd" + t,this._parent.getNextHighestDepth(),{_sX:this._sX,_sY:this._sY,_sZ:this._sZ,_sW:cw,_sH:ch,_slo:30,_siz:0.01,_sizz:80,dam:this.dam});
                  this._parent[_name + "dd" + t].mst = this._name;
                  this._parent[_name + "dd" + t].tgt = this.tgt;
                  this._parent[_name + "dd" + t].maxforce = 2500;
                  this._parent[_name + "dd" + t].speed = 50;
               }
            }
            else if(t % 180 >= 135 && t % 30 >= 15)
            {
               if(t % 10 == 0 && this.covon)
               {
                  snd("zdfs");
                  _loc16_ = dst / 50;
                  this._parent.attachMovie("dd_zd",_name + "dd" + t,this._parent.getNextHighestDepth(),{_sX:this._sX,_sY:this._sY,_sZ:this._sZ,_sW:this._sW + (random(10) - 5) * 0.001 * 3.141592653589793,_sH:this._sH + (random(10) - 5) * 0.002 * 3.141592653589793,htime:_loc16_,_siz:2,dam:this.dam,_slo:4,_sizz:0.3});
                  this._parent[_name + "dd" + t].mst = this._name;
                  this._parent[_name + "dd" + t].tgt = this.tgt;
                  this._parent[_name + "dd" + t].maxforce = 2500;
                  this._parent[_name + "dd" + t].speed = 50;
                  this._parent[_name + "dd" + t].fsiz = 1;
                  this._parent[_name + "dd" + t].rx = random(25) - 12;
                  this._parent[_name + "dd" + t].ry = random(25) - 12;
                  this._parent[_name + "dd" + t].rz = random(25) - 12;
               }
            }
         }
         if(_loc14_ < 1500)
         {
            if(this.bofg == 0 || t % 90 > rt && t % 90 <= rt + 10)
            {
               var _loc8_ = 60 - t;
               if(_loc8_ < 30)
               {
                  _loc8_ = 30;
               }
               var _loc11_ = Math.atan2(_loc4_.x,_loc4_.y);
               var _loc12_ = Math.atan2(_loc4_.z,distance(0,0,_loc4_.x,_loc4_.y));
               var _loc13_ = distance(0,0,_loc11_,_loc12_);
               if(_loc13_ > 3.141592653589793 / _loc8_)
               {
                  _loc11_ *= 3.141592653589793 / _loc8_ / _loc13_;
                  _loc12_ *= 3.141592653589793 / _loc8_ / _loc13_;
               }
               _global.objrotate(this,_loc11_,_loc12_,0);
               var _loc10_ = new Object();
               _loc10_ = _global.getobjv(this,speed * this.ad * 0.5,speed * this.ws,speed * this.rf * 0.5);
               var _loc5_ = rg * 0.2;
               v._sZ = _loc10_.z * _loc5_ + v._sZ * (1 - _loc5_);
               v._sX = _loc10_.x * _loc5_ + v._sX * (1 - _loc5_);
               v._sY = _loc10_.y * _loc5_ + v._sY * (1 - _loc5_);
            }
         }
         else if(this.bofg == 0 || t % 90 > rt && t % 90 <= rt + 10)
         {
            this.modact(2,2,2,1,1,1,1);
            _loc8_ = 60 - t;
            if(_loc8_ < 30)
            {
               _loc8_ = 30;
            }
            _loc11_ = Math.atan2(_loc4_.x,_loc4_.y);
            _loc12_ = Math.atan2(_loc4_.z,distance(0,0,_loc4_.x,_loc4_.y));
            _loc13_ = distance(0,0,_loc11_,_loc12_);
            if(_loc13_ > 3.141592653589793 / _loc8_)
            {
               _loc11_ *= 3.141592653589793 / _loc8_ / _loc13_;
               _loc12_ *= 3.141592653589793 / _loc8_ / _loc13_;
            }
            _global.objrotate(this,_loc11_,_loc12_,0);
            if(dst > 250)
            {
               _loc5_ = rg * 0.4;
            }
            else
            {
               _loc5_ = rg * 0.2;
            }
            v._sZ = speed * Math.sin(this._sH) * _loc5_ + v._sZ * (1 - _loc5_);
            var _loc15_ = speed * Math.cos(this._sH);
            v._sX = _loc15_ * Math.sin(this._sW) * _loc5_ + v._sX * (1 - _loc5_);
            v._sY = _loc15_ * Math.cos(this._sW) * _loc5_ + v._sY * (1 - _loc5_);
         }
      }
   }
}
function back()
{
   if(!stopAll)
   {
      if(this.bofg > 0)
      {
         this.bofg = this.bofg - 1;
      }
      t++;
      if(this._parent[this.mst] != undefined && backmst)
      {
         var _loc12_ = _parent[mst]._sX - this._sX;
         var _loc11_ = _parent[mst]._sY - this._sY;
         var _loc10_ = _parent[mst]._sZ - this._sZ;
         var _loc14_ = dist_3d(0,0,0,_loc12_,_loc11_,_loc10_);
         dst = _loc14_;
         if(dst < 0.5 * maxforce)
         {
            if(this._parent[this.tgt] != undefined)
            {
               onEnterFrame = function()
               {
                  zd();
               };
            }
            else if(this._parent[this.tgt_main] != undefined)
            {
               this.tgt = this.tgt_main;
               onEnterFrame = function()
               {
                  zd();
               };
            }
         }
         var _loc5_ = new Object();
         _loc5_ = _global.sToc(_loc12_,_loc11_,_loc10_,this._sW,this._sH,this._sR);
         if(this.bofg == 0)
         {
            var _loc9_ = 15;
            var _loc6_ = Math.atan2(_loc5_.x,_loc5_.y);
            var _loc7_ = Math.atan2(_loc5_.z,distance(0,0,_loc5_.x,_loc5_.y));
            var _loc8_ = distance(0,0,_loc6_,_loc7_);
            if(_loc8_ > 3.141592653589793 / _loc9_)
            {
               _loc6_ *= 3.141592653589793 / _loc9_ / _loc8_;
               _loc7_ *= 3.141592653589793 / _loc9_ / _loc8_;
            }
            _global.objrotate(this,_loc6_,_loc7_,0);
            if(dst > 250)
            {
               var _loc4_ = 0.2;
               v._sZ = 2 * speed * Math.sin(this._sH) * _loc4_ + v._sZ * (1 - _loc4_);
               var _loc13_ = 2 * speed * Math.cos(this._sH);
               v._sX = _loc13_ * Math.sin(this._sW) * _loc4_ + v._sX * (1 - _loc4_);
               v._sY = _loc13_ * Math.cos(this._sW) * _loc4_ + v._sY * (1 - _loc4_);
            }
            else if(t % 10 == 0 && random(6) == 0)
            {
               randomra();
               onEnterFrame = function()
               {
                  zd();
               };
            }
         }
      }
      else if(t % 10 == 0 && random(6) == 0)
      {
         randomra();
         onEnterFrame = function()
         {
            zd();
         };
      }
   }
}
stop();
var bofg = 0;
var fclss = "unit";
var mst;
var tgt;
var tgt_main = this.tgt;
var _force;
var tgt_force;
var dam;
var v = new Object();
var rg;
var rw = 0;
var rh = 0;
var maxforce = 5000;
var dst = maxforce;
var maxt = maxforce / speed;
var t;
if(t == null)
{
   t = 0;
}
var covon = false;
var fsound;
var hq = 30;
var onlock = null;
var rx = 0;
var ry = 0;
var rz = 0;
var rt = 0;
var ws = 0;
var ad = 0;
var rf = 0;
var backmst = true;
randomra();
v._sZ = 0;
v._sX = 0;
v._sY = 0;
this._sZ += this.v._sZ;
this._sX += this.v._sX;
this._sY += this.v._sY;
this.attachMovie("AIfy","AI",this.getNextHighestDepth());
this.AI.onshoot = function(msid)
{
   this.bofg = 5;
};
if(this._parent[tgt]._type == "ff")
{
   if(this._parent[tgt].tgt == this.mst)
   {
      if(this._parent[tgt].fclss == "shoot" || this._parent[tgt].fclss == "gd")
      {
         _parent[tgt].tgt = this._name;
      }
   }
   tgt_main = _parent[tgt].mst;
}
this.mainact = function()
{
   this._sZ += this.v._sZ;
   this._sX += this.v._sX;
   this._sY += this.v._sY;
};
if(t >= 0)
{
   v._sZ = speed * Math.sin(this._sH);
   var ss = speed * Math.cos(this._sH);
   v._sX = ss * Math.sin(this._sW);
   v._sY = ss * Math.cos(this._sW);
   _global.snd(this.fsound);
   this._type = "ff";
   _global.SimpList[this._name] = this;
   _root.jiemiam.addtgt(this._name);
   onEnterFrame = function()
   {
      zd();
   };
}
else
{
   onEnterFrame = function()
   {
      bs();
   };
}
