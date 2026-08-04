function randomra()
{
   rx = random(401);
   if(rx < 200)
   {
      rx -= 400;
   }
   ry = random(401);
   if(ry < 200)
   {
      ry -= 400;
   }
   rz = random(401);
   if(rz < 200)
   {
      rz -= 400;
   }
   var _loc2_ = 2.5 - _parent[mst]._SP / 5000;
   rx *= _loc2_;
   ry *= _loc2_;
   rz *= _loc2_;
}
function shouxian()
{
   var _loc3_ = 1;
   while(_loc3_ <= 9)
   {
      _parent[_name + "wj"].linelist[_loc3_].remove();
      _loc3_ = _loc3_ + 1;
   }
   _parent[_name + "wj"].linelist[0]._sX = this._sX;
   _parent[_name + "wj"].linelist[0]._sY = this._sY;
   _parent[_name + "wj"].linelist[0]._sZ = this._sZ;
   var _loc4_ = new Object();
   _loc4_ = moveobj(this._parent[mst].objz,this.fx,this.fy,this.fz);
   _parent[_name + "wj"].linelist[0]._sX2 = _loc4_.x;
   _parent[_name + "wj"].linelist[0]._sY2 = _loc4_.y;
   _parent[_name + "wj"].linelist[0]._sZ2 = _loc4_.z;
}
function ts()
{
   if(!stopAll)
   {
      if(this.bofg > 0)
      {
         this.bofg = this.bofg - 1;
      }
      t++;
      if(t > 10)
      {
         _parent[tgt].onkillff(this._name);
      }
      if(this._parent[this.mst] != undefined)
      {
         var _loc3_ = 0;
         while(_loc3_ <= 9)
         {
            var _loc4_ = _parent[_name + "wj"].linelist[_loc3_].lv / 10;
            var _loc5_ = (_parent[_name + "wj"].linelist[_loc3_].lv + 1) / 10;
            _parent[_name + "wj"].linelist[_loc3_]._sX += _loc4_ * _parent[this.mst].v._sX * _loc4_ + this.v._sX * (1 - _loc4_);
            _parent[_name + "wj"].linelist[_loc3_]._sY += _loc4_ * _parent[this.mst].v._sY * _loc4_ + this.v._sY * (1 - _loc4_);
            _parent[_name + "wj"].linelist[_loc3_]._sZ += _loc4_ * _parent[this.mst].v._sZ * _loc4_ + this.v._sZ * (1 - _loc4_);
            _parent[_name + "wj"].linelist[_loc3_]._sX2 += _loc5_ * _parent[this.mst].v._sX * _loc5_ + this.v._sX * (1 - _loc5_);
            _parent[_name + "wj"].linelist[_loc3_]._sY2 += _loc5_ * _parent[this.mst].v._sY * _loc5_ + this.v._sY * (1 - _loc5_);
            _parent[_name + "wj"].linelist[_loc3_]._sZ2 += _loc5_ * _parent[this.mst].v._sZ * _loc5_ + this.v._sZ * (1 - _loc5_);
            if(_parent[_name + "wj"].linelist[_loc3_].lv == 9)
            {
               var _loc6_ = new Object();
               _loc6_ = moveobj(this._parent[mst].objz,this.fx,this.fy,this.fz);
               _parent[_name + "wj"].linelist[_loc3_]._sX2 = _loc6_.x;
               _parent[_name + "wj"].linelist[_loc3_]._sY2 = _loc6_.y;
               _parent[_name + "wj"].linelist[_loc3_]._sZ2 = _loc6_.z;
            }
            _loc3_ = _loc3_ + 1;
         }
      }
      else
      {
         _parent[_name + "wj"].removeMovieClip();
         this.removeMovieClip();
      }
      if(t >= maxt)
      {
         onEnterFrame = function()
         {
            back();
         };
      }
      else if(t == axt + 10)
      {
         axt = t;
         randomra();
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
      if(this._parent[this.mst] != undefined)
      {
         var _loc4_ = 0;
         while(_loc4_ <= 9)
         {
            var _loc5_ = _parent[_name + "wj"].linelist[_loc4_].lv / 10;
            var _loc6_ = (_parent[_name + "wj"].linelist[_loc4_].lv + 1) / 10;
            _parent[_name + "wj"].linelist[_loc4_]._sX += _loc5_ * _parent[this.mst].v._sX * _loc5_ + this.v._sX * (1 - _loc5_);
            _parent[_name + "wj"].linelist[_loc4_]._sY += _loc5_ * _parent[this.mst].v._sY * _loc5_ + this.v._sY * (1 - _loc5_);
            _parent[_name + "wj"].linelist[_loc4_]._sZ += _loc5_ * _parent[this.mst].v._sZ * _loc5_ + this.v._sZ * (1 - _loc5_);
            _parent[_name + "wj"].linelist[_loc4_]._sX2 += _loc6_ * _parent[this.mst].v._sX * _loc6_ + this.v._sX * (1 - _loc6_);
            _parent[_name + "wj"].linelist[_loc4_]._sY2 += _loc6_ * _parent[this.mst].v._sY * _loc6_ + this.v._sY * (1 - _loc6_);
            _parent[_name + "wj"].linelist[_loc4_]._sZ2 += _loc6_ * _parent[this.mst].v._sZ * _loc6_ + this.v._sZ * (1 - _loc6_);
            if(_parent[_name + "wj"].linelist[_loc4_].lv == 9)
            {
               var _loc7_ = new Object();
               _loc7_ = moveobj(this._parent[mst].objz,this.fx,this.fy,this.fz);
               _parent[_name + "wj"].linelist[_loc4_]._sX2 = _loc7_.x;
               _parent[_name + "wj"].linelist[_loc4_]._sY2 = _loc7_.y;
               _parent[_name + "wj"].linelist[_loc4_]._sZ2 = _loc7_.z;
            }
            _loc4_ = _loc4_ + 1;
         }
      }
      else
      {
         _parent[_name + "wj"].removeMovieClip();
         this.removeMovieClip();
      }
      _parent[tgt].onkillff(this._name);
      if(t >= maxt || !backmst)
      {
         onEnterFrame = function()
         {
            back();
         };
      }
      else if(this._parent[this.tgt] != undefined && this._parent[this.mst]._zt == "nor")
      {
         var _loc9_ = _parent[tgt]._sX + rx - this._sX;
         var _loc8_ = _parent[tgt]._sY + ry - this._sY;
         var _loc11_ = _parent[tgt]._sZ + rz - this._sZ;
         var _loc12_ = dist_3d(0,0,0,_loc9_,_loc8_,_loc11_);
         dst = _loc12_;
         this._sW = Math.atan2(_loc9_,_loc8_);
         this._sH = Math.atan2(_loc11_,distance(0,0,_loc9_,_loc8_));
         var _loc10_ = speed / dst;
         if(this.bofg == 0)
         {
            v._sZ = _loc11_ * _loc10_ * 0.2 + v._sZ * 0.8;
            v._sY = _loc8_ * _loc10_ * 0.2 + v._sY * 0.8;
            v._sX = _loc9_ * _loc10_ * 0.2 + v._sX * 0.8;
         }
         if(_loc12_ < 200 || _loc12_ < 1000 && t >= axt + 30)
         {
            this.axt = this.t;
            if(this.tgt == _root.jiemiam.mst)
            {
               _root.jiemiam.hkxsq[this._name].jiantou.play();
            }
            basex = v._sX;
            basey = v._sY;
            basez = v._sZ;
            v._sZ = 0;
            v._sX = 0;
            v._sY = 0;
            onEnterFrame = function()
            {
               shoot();
            };
         }
      }
      else if(this._parent[this.mst]._zt == "nor")
      {
         this.tgt = this.tgt_main;
         if(this._parent[this.tgt] == undefined)
         {
            onEnterFrame = function()
            {
               back();
            };
         }
      }
   }
}
function shoot()
{
   if(!stopAll)
   {
      if(this.bofg > 0)
      {
         this.bofg = this.bofg - 1;
      }
      t++;
      _parent[tgt].onkillff(this._name);
      if(this._parent[this.mst] != undefined)
      {
         var _loc5_ = 0;
         while(_loc5_ <= 9)
         {
            var _loc7_ = _parent[_name + "wj"].linelist[_loc5_].lv / 10;
            var _loc8_ = (_parent[_name + "wj"].linelist[_loc5_].lv + 1) / 10;
            _parent[_name + "wj"].linelist[_loc5_]._sX += _loc7_ * _parent[this.mst].v._sX * _loc7_ + this.v._sX * (1 - _loc7_);
            _parent[_name + "wj"].linelist[_loc5_]._sY += _loc7_ * _parent[this.mst].v._sY * _loc7_ + this.v._sY * (1 - _loc7_);
            _parent[_name + "wj"].linelist[_loc5_]._sZ += _loc7_ * _parent[this.mst].v._sZ * _loc7_ + this.v._sZ * (1 - _loc7_);
            _parent[_name + "wj"].linelist[_loc5_]._sX2 += _loc8_ * _parent[this.mst].v._sX * _loc8_ + this.v._sX * (1 - _loc8_);
            _parent[_name + "wj"].linelist[_loc5_]._sY2 += _loc8_ * _parent[this.mst].v._sY * _loc8_ + this.v._sY * (1 - _loc8_);
            _parent[_name + "wj"].linelist[_loc5_]._sZ2 += _loc8_ * _parent[this.mst].v._sZ * _loc8_ + this.v._sZ * (1 - _loc8_);
            if(_parent[_name + "wj"].linelist[_loc5_].lv == 9)
            {
               var _loc6_ = new Object();
               _loc6_ = moveobj(this._parent[mst].objz,this.fx,this.fy,this.fz);
               _parent[_name + "wj"].linelist[_loc5_]._sX2 = _loc6_.x;
               _parent[_name + "wj"].linelist[_loc5_]._sY2 = _loc6_.y;
               _parent[_name + "wj"].linelist[_loc5_]._sZ2 = _loc6_.z;
            }
            _loc5_ = _loc5_ + 1;
         }
      }
      else
      {
         _parent[_name + "wj"].removeMovieClip();
         this.removeMovieClip();
      }
      if(t == axt + 10)
      {
         if(this._parent[this.tgt] != undefined && this._parent[this.mst]._zt == "nor")
         {
            _root.jiemiam.hkxsq[this._name].jiantou.gotoAndStop(1);
            mz();
            if(this.fn > 2)
            {
               snd("s_wlp");
            }
            else
            {
               snd("gsqs");
            }
            var _loc10_ = new Object();
            var _loc9_ = 0;
            while(_loc9_ < this.fn)
            {
               _loc6_ = _global.moveobj(this,(_loc9_ - (this.fn - 1) / 2) * 5,0,0);
               _loc10_ = _global.moveobj(this,(_loc9_ - (this.fn - 1) / 2) * 10,500,0);
               var _loc12_ = _loc10_.x - _loc6_.x;
               var _loc11_ = _loc10_.y - _loc6_.y;
               var _loc13_ = _loc10_.z - _loc6_.z;
               var _loc14_ = Math.atan2(_loc12_,_loc11_);
               var _loc15_ = Math.atan2(_loc13_,distance(0,0,_loc12_,_loc11_));
               this._parent.attachMovie("dd_fygsX",_name + _loc9_ + "ddq" + t,this._parent.getNextHighestDepth(),{_sX:_loc6_.x,_sY:_loc6_.y,_sZ:_loc6_.z,_sW:_loc14_,_sH:_loc15_,_slo:random(20) + 10,_siz:1.5,dam:this.dam});
               this._parent[_name + _loc9_ + "ddq" + t].mst = this.mst;
               this._parent[_name + _loc9_ + "ddq" + t].tgt = this.tgt;
               _loc9_ = _loc9_ + 1;
            }
            this._parent[this.tgt].AI.onfy(this._name);
            this.tson = false;
         }
      }
      if(t == axt + 15)
      {
         this.tson = true;
         axt = t;
         v._sX = basex;
         v._sY = basey;
         v._sZ = basez;
         onEnterFrame = function()
         {
            ts();
         };
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
      _parent[tgt].onkillff(this._name);
      if(this._parent[this.mst] != undefined || !backmst)
      {
         var _loc4_ = _parent[mst]._sX - this._sX;
         var _loc3_ = _parent[mst]._sY - this._sY;
         var _loc6_ = _parent[mst]._sZ - this._sZ;
         var _loc7_ = dist_3d(0,0,0,_loc4_,_loc3_,_loc6_);
         dst = _loc7_;
         this._sW = Math.atan2(- _loc4_,- _loc3_);
         this._sH = Math.atan2(- _loc6_,distance(0,0,- _loc4_,- _loc3_));
         if(dst > 200)
         {
            var _loc5_ = 2 * speed / dst;
            if(this.bofg == 0)
            {
               v._sZ = _loc6_ * _loc5_ * 0.2 + v._sZ * 0.8;
               v._sY = _loc3_ * _loc5_ * 0.2 + v._sY * 0.8;
               v._sX = _loc4_ * _loc5_ * 0.2 + v._sX * 0.8;
            }
         }
         else
         {
            this.axt = this.t;
            onEnterFrame = function()
            {
               over();
            };
         }
         shouxian();
      }
      else
      {
         _parent[_name + "wj"].removeMovieClip();
         this.removeMovieClip();
      }
   }
}
function over()
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
         var _loc6_ = _parent[mst]._sX - this._sX;
         var _loc5_ = _parent[mst]._sY - this._sY;
         var _loc4_ = _parent[mst]._sZ - this._sZ;
         dst = dist_3d(0,0,0,_loc6_,_loc5_,_loc4_);
         this._sW = _parent[mst]._sW;
         this._sH = _parent[mst]._sH;
         var _loc3_ = 100 - dst;
         if(_loc3_ < 50)
         {
            _loc3_ = 50;
         }
         _loc3_ = _loc3_ * 0.01 + 0.05;
         if(this.bofg == 0)
         {
            v._sX = _loc3_ * (_loc6_ + _parent[mst].v._sX);
            v._sY = _loc3_ * (_loc5_ + _parent[mst].v._sY);
            v._sZ = _loc3_ * (_loc4_ + _parent[mst].v._sZ);
         }
         shouxian();
         if(dst < 5)
         {
            this._parent[mst][this.wpname].ln = this._parent[mst][this.wpname].ln + 1;
            _parent[_name + "wj"].removeMovieClip();
            this.removeMovieClip();
         }
      }
      else
      {
         _parent[_name + "wj"].removeMovieClip();
         this.removeMovieClip();
      }
   }
}
function mz()
{
   var _loc4_ = _parent[tgt]._sX - this._sX;
   var _loc3_ = _parent[tgt]._sY - this._sY;
   var _loc5_ = _parent[tgt]._sZ - this._sZ;
   dst = dist_3d(0,0,0,_loc4_,_loc3_,_loc5_);
   var _loc6_ = (dst + 100) / 100;
   _loc4_ += _parent[tgt].v._sX * _loc6_;
   _loc3_ += _parent[tgt].v._sY * _loc6_;
   _loc5_ += _parent[tgt].v._sZ * _loc6_;
   var _loc7_ = Math.atan2(_loc4_,_loc3_);
   var _loc8_ = Math.atan2(_loc5_,distance(0,0,_loc4_,_loc3_));
   this._sH = _loc8_;
   this._sW = _loc7_;
}
var bofg = 0;
var _HP = 600;
var _type = "ff";
var hypt = 0;
var _size = "S";
var fclss = "shoot";
var mst;
var tgt;
var tgt_main = this.tgt;
var _force = this._parent[mst]._force;
var tgt_force = this._parent[this.tgt]._force;
if(this.tgt_force == undefined)
{
   this.tgt_force = 0;
}
var dam;
var v = new Object();
var speed;
var maxforce;
var dst = maxforce;
var maxt = maxforce / speed;
var t = 0;
var axt = 0;
var bxt = 0;
var fx;
var fy;
var fz;
var basex = 0;
var basey = 0;
var basez = 0;
var rx = 0;
var ry = 0;
var rz = 0;
var fn;
var wpname;
var onlock = null;
var tson = true;
var backmst = true;
this.attachMovie("AIfy","AI",this.getNextHighestDepth());
this.AI.onfy = function(fy)
{
   this._parent.tgt = fy;
   this._parent._parent[this._parent.tgt].onlock = this._parent._name;
   if(this._parent.tson)
   {
      this._parent.axt = this._parent.t;
      this._parent.onEnterFrame = function()
      {
         this.ts();
      };
   }
};
if(this._parent[tgt]._type == "ff")
{
   _parent[tgt].onlock = this._name;
}
_global.SimpList[this._name] = this;
_root.jiemiam.addff(this._name);
randomra();
v._sZ = speed * Math.sin(this._sH);
var ss = speed * Math.cos(this._sH);
v._sX = ss * Math.sin(this._sW);
v._sY = ss * Math.cos(this._sW);
this._sZ += this.v._sZ;
this._sX += this.v._sX;
this._sY += this.v._sY;
_parent.attachMovie("ctrline",_name + "wj",_parent.getNextHighestDepth(),{mst1:mst,mst2:this._name});
var tt = 0;
while(tt <= 9)
{
   var nl = _parent[_name + "wj"].newsline({_sX:this._sX,_sY:this._sY,_sZ:this._sZ,_sX2:this._sX,_sY2:this._sY,_sZ2:this._sZ,_siz:0.5});
   _parent[_name + "wj"].linelist[nl].lv = nl;
   tt++;
}
this._sZ += this.v._sZ;
this._sX += this.v._sX;
this._sY += this.v._sY;
this.mainact = function()
{
   this._sZ += this.v._sZ;
   this._sX += this.v._sX;
   this._sY += this.v._sY;
};
onEnterFrame = function()
{
   ts();
};
