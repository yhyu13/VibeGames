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
   rt = random(80);
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
         _root.jiemiam.addff(this._name);
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
            var _loc20_ = dist_3d(0,0,0,_loc19_,_loc18_,_loc17_);
            if(_loc20_ > maxforce)
            {
               onEnterFrame = function()
               {
                  back();
               };
            }
         }
         var _loc8_ = _parent[tgt]._sX - this._sX;
         var _loc7_ = _parent[tgt]._sY - this._sY;
         var _loc10_ = _parent[tgt]._sZ - this._sZ;
         var _loc14_ = dist_3d(0,0,0,_loc8_,_loc7_,_loc10_);
         if(t > 10)
         {
            _parent[tgt].onkillff(this._name);
         }
         var _loc5_ = new Object();
         _loc5_ = _global.sToc(_loc8_,_loc7_,_loc10_,this._sW,this._sH,this._sR);
         if(_loc5_.y > 0 && Math.abs(_loc5_.x) < 0.5 * _global.Cmr.wrees * _loc5_.y && Math.abs(_loc5_.z) < 0.5 * _global.Cmr.hrees * _loc5_.y)
         {
            this.covon = true;
         }
         dst = _loc14_;
         if(_loc14_ < 1000)
         {
            if(t % 180 <= 45 && t % 30 <= 15)
            {
               if(t % 3 == 0 && this.covon)
               {
                  if(_parent[tgt].AI != undefined)
                  {
                     _parent[tgt].AI.onshoot(this._name);
                  }
                  if(this.tgt == _root.jiemiam.mst)
                  {
                     _root.jiemiam.hkxsq[this._name].jiantou.play();
                  }
                  var _loc16_ = (dst + 20) / 50;
                  _loc8_ += _parent[tgt].v._sX * _loc16_;
                  _loc7_ += _parent[tgt].v._sY * _loc16_;
                  _loc10_ += _parent[tgt].v._sZ * _loc16_;
                  cw = Math.atan2(_loc8_,_loc7_);
                  ch = Math.atan2(_loc10_,distance(0,0,_loc8_,_loc7_));
                  snd("machine1");
                  this._parent.attachMovie("dd_cartridge",_name + "dd" + t,this._parent.getNextHighestDepth(),{_sX:this._sX,_sY:this._sY,_sZ:this._sZ,_sW:cw,_sH:ch,_slo:30,_siz:0.01,_sizz:80,dam:this.dam});
                  this._parent[_name + "dd" + t].mst = this._name;
                  this._parent[_name + "dd" + t].tgt = this.tgt;
                  this._parent[_name + "dd" + t].maxforce = 1500;
                  this._parent[_name + "dd" + t].speed = 50;
               }
            }
            else if(t % 180 >= 135 && t % 30 >= 15)
            {
               if(t % 10 == 0 && this.covon)
               {
                  if(this.tgt == _root.jiemiam.mst)
                  {
                     _root.jiemiam.hkxsq[this._name].jiantou.play();
                  }
                  snd("zdfs");
                  _loc16_ = dst / 50;
                  this._parent.attachMovie("dd_zd",_name + "dd" + t,this._parent.getNextHighestDepth(),{_sX:this._sX,_sY:this._sY,_sZ:this._sZ,_sW:this._sW + (random(10) - 5) * 0.001 * 3.141592653589793,_sH:this._sH + (random(10) - 5) * 0.002 * 3.141592653589793,htime:_loc16_,_siz:2,dam:this.dam,_slo:4,_sizz:0.3});
                  this._parent[_name + "dd" + t].mst = this._name;
                  this._parent[_name + "dd" + t].tgt = this.tgt;
                  this._parent[_name + "dd" + t].maxforce = 2000;
                  this._parent[_name + "dd" + t].speed = 50;
                  this._parent[_name + "dd" + t].fsiz = 1;
                  this._parent[_name + "dd" + t].rx = random(25) - 12;
                  this._parent[_name + "dd" + t].ry = random(25) - 12;
                  this._parent[_name + "dd" + t].rz = random(25) - 12;
               }
            }
         }
         else
         {
            _root.jiemiam.hkxsq[this._name].jiantou.gotoAndStop(1);
         }
         if(_loc14_ < 150)
         {
            this.bofg = 30;
         }
         else if(this.bofg == 0 || t % 90 > rt && t % 90 <= rt + 10)
         {
            var _loc9_ = 60 - t;
            if(_loc9_ < 30)
            {
               _loc9_ = 30;
            }
            var _loc11_ = Math.atan2(_loc5_.x,_loc5_.y);
            var _loc12_ = Math.atan2(_loc5_.z,distance(0,0,_loc5_.x,_loc5_.y));
            var _loc13_ = distance(0,0,_loc11_,_loc12_);
            if(_loc13_ > 3.141592653589793 / _loc9_)
            {
               _loc11_ *= 3.141592653589793 / _loc9_ / _loc13_;
               _loc12_ *= 3.141592653589793 / _loc9_ / _loc13_;
            }
            _global.objrotate(this,_loc11_,_loc12_,0);
            if(dst > 250)
            {
               var _loc6_ = rg * 0.4;
            }
            else
            {
               _loc6_ = rg * 0.2;
            }
            v._sZ = speed * Math.sin(this._sH) * _loc6_ + v._sZ * (1 - _loc6_);
            var _loc15_ = speed * Math.cos(this._sH);
            v._sX = _loc15_ * Math.sin(this._sW) * _loc6_ + v._sX * (1 - _loc6_);
            v._sY = _loc15_ * Math.cos(this._sW) * _loc6_ + v._sY * (1 - _loc6_);
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
      if(this._parent[this.mst] == undefined)
      {
         this.removeMovieClip();
      }
      if(!backmst)
      {
         this.removeMovieClip();
      }
      var _loc13_ = _parent[mst]._sX - this._sX;
      var _loc12_ = _parent[mst]._sY - this._sY;
      var _loc11_ = _parent[mst]._sZ - this._sZ;
      var _loc15_ = dist_3d(0,0,0,_loc13_,_loc12_,_loc11_);
      dst = _loc15_;
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
         else if(dst < speed + 50)
         {
            this._parent[mst][this.wpname].ln = this._parent[mst][this.wpname].ln + 1;
            this.removeMovieClip();
         }
      }
      var _loc6_ = new Object();
      _loc6_ = _global.sToc(_loc13_,_loc12_,_loc11_,this._sW,this._sH,this._sR);
      _root.jiemiam.hkxsq[this._name].jiantou.gotoAndStop(1);
      if(this.bofg == 0)
      {
         var _loc10_ = 15;
         var _loc7_ = Math.atan2(_loc6_.x,_loc6_.y);
         var _loc8_ = Math.atan2(_loc6_.z,distance(0,0,_loc6_.x,_loc6_.y));
         var _loc9_ = distance(0,0,_loc7_,_loc8_);
         if(_loc9_ > 3.141592653589793 / _loc10_)
         {
            _loc7_ *= 3.141592653589793 / _loc10_ / _loc9_;
            _loc8_ *= 3.141592653589793 / _loc10_ / _loc9_;
         }
         _global.objrotate(this,_loc7_,_loc8_,0);
         var _loc5_ = 0.4;
         v._sZ = 2 * speed * Math.sin(this._sH) * _loc5_ + v._sZ * (1 - _loc5_);
         var _loc14_ = 2 * speed * Math.cos(this._sH);
         v._sX = _loc14_ * Math.sin(this._sW) * _loc5_ + v._sX * (1 - _loc5_);
         v._sY = _loc14_ * Math.cos(this._sW) * _loc5_ + v._sY * (1 - _loc5_);
      }
   }
}
stop();
var bofg = 0;
var _HP = 1000;
var _type;
var hypt = 0;
var _size = "S";
var fclss = "unit";
var mst;
var tgt;
var tgt_main = this.tgt;
var _force = this._parent[mst]._force;
var tgt_force = this._parent[this.tgt]._force;
var dam;
var v = new Object();
var speed;
var fsiz;
var rg;
var rw = 0;
var rh = 0;
var maxforce;
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
var wpname;
var backmst = true;
randomra();
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
   _root.jiemiam.addff(this._name);
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
