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
         play();
         v._sZ = speed * Math.sin(this._sH);
         var _loc4_ = speed * Math.cos(this._sH);
         v._sX = _loc4_ * Math.sin(this._sW);
         v._sY = _loc4_ * Math.cos(this._sW);
         _global.snd(this.fsound);
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
      if(t >= maxt)
      {
         this.removeMovieClip();
      }
      else
      {
         if(tx_wj)
         {
            if(maxt - t < 10)
            {
               var _loc12_ = _parent[_name + "wj"].newsline({_sX:this._sX,_sY:this._sY,_sZ:this._sZ,_sX2:this._sX - v._sX,_sY2:this._sY - v._sY,_sZ2:this._sZ - v._sZ,t:maxt - t,_siz:this.fsiz * (maxt - t) / 5,_sizz:1,sz:this.fsiz * 2});
               if(_loc12_ > 0)
               {
                  _parent[_name + "wj"].linelist[_loc12_]._LN = _loc12_ - 1;
               }
               _parent[_name + "wj"].linelist[_loc12_].onEntF = function()
               {
                  this.t = this.t - 1;
                  if(this.t < 10)
                  {
                     this._siz = this.sz * this.t / 10;
                     if(this.t <= 0)
                     {
                        this.remove();
                     }
                  }
                  else
                  {
                     this.t = this.t - 1;
                     this._siz = this.sz;
                     this._sizz = 1;
                  }
               };
            }
            else
            {
               var _loc18_ = maxt - t;
               if(_loc18_ > 100)
               {
                  _loc18_ = 100;
               }
               if((this.t - 1) % wjlv == 0)
               {
                  _loc12_ = _parent[_name + "wj"].newsline({_sX:this._sX,_sY:this._sY,_sZ:this._sZ,_sX2:this._sX - v._sX,_sY2:this._sY - v._sY,_sZ2:this._sZ - v._sZ,t:_loc18_,_siz:this.fsiz * 4,_sizz:0.5,sz:this.fsiz * 2});
                  if(_loc12_ > 0)
                  {
                     _parent[_name + "wj"].linelist[_loc12_]._LN = _loc12_ - 1;
                  }
                  _parent[_name + "wj"].linelist[_loc12_].onEntF = function()
                  {
                     this.t = this.t - 1;
                     if(this.t < 10)
                     {
                        this._siz = this.sz * this.t / 10;
                        if(this.t <= 0)
                        {
                           this.remove();
                        }
                     }
                     else
                     {
                        this.t = this.t - 1;
                        this._siz = this.sz;
                        this._sizz = 1;
                     }
                  };
               }
               else
               {
                  _parent[_name + "wj"].linelist[_parent[_name + "wj"].linelist.length - 1]._sX = this._sX;
                  _parent[_name + "wj"].linelist[_parent[_name + "wj"].linelist.length - 1]._sY = this._sY;
                  _parent[_name + "wj"].linelist[_parent[_name + "wj"].linelist.length - 1]._sZ = this._sZ;
               }
            }
         }
         else
         {
            _parent.attachMovie("wjline",_name + "wj" + t,_parent.getNextHighestDepth(),{_sX:this._sX,_sY:this._sY,_sZ:this._sZ,_sX2:this._sX - v._sX,_sY2:this._sY - v._sY,_sZ2:this._sZ - v._sZ,t:10,_siz:this.fsiz * 4,_sizz:0.5});
         }
         if(this._parent[this.tgt] != undefined)
         {
            var _loc17_ = _parent[tgt]._sX - this._sX;
            var _loc14_ = _parent[tgt]._sY - this._sY;
            var _loc13_ = _parent[tgt]._sZ - this._sZ;
            var _loc5_ = dist_3d(0,0,0,_loc17_,_loc14_,_loc13_);
            if(_loc5_ < 300)
            {
               this._parent[this.tgt].AI.onfd(this._name,_loc5_);
            }
            if(t > 10 && rgs >= 0.5)
            {
               _parent[tgt].onkillff(this._name);
            }
            if(_loc5_ < 300)
            {
               intt++;
               if(this._parent[this._parent[tgt].infd] == undefined)
               {
                  this._parent[tgt].infd = this._name;
               }
               if(this.tgt == _root.jiemiam.mst)
               {
                  _root.jiemiam.hkxsq[this._name].jiantou.play();
               }
               if(this._parent[tgt]._type == "ff")
               {
                  if(this.fsiz > 2 && _loc5_ < 200)
                  {
                     zdEXF();
                  }
                  else if(_loc5_ < 60)
                  {
                     this._parent[tgt].onhit(this.dam,this.mst);
                     subhit();
                     this._parent.attachMovie(this.bot,this._name + "bo",this._parent.getNextHighestDepth(),{_sX:this._sX,_sY:this._sY,_sZ:this._sZ,mst:this.tgt});
                     this.removeMovieClip();
                  }
               }
               else if(_loc5_ < this.hq)
               {
                  if(this.fsiz > 2)
                  {
                     zdEXF();
                  }
                  else
                  {
                     var _loc9_ = new Object();
                     if(this._parent[tgt].shdon >= 0)
                     {
                        var _loc23_ = this._sX - this._parent[tgt]._sX;
                        var _loc22_ = this._sY - this._parent[tgt]._sY;
                        var _loc21_ = this._sZ - this._parent[tgt]._sZ;
                        _loc9_ = _global.sToc(_loc23_,_loc22_,_loc21_,this._parent[tgt].objz._sW,this._parent[tgt].objz._sH,this._parent[tgt].objz._sR);
                     }
                     else
                     {
                        _loc9_.y = 0;
                     }
                     if(_loc9_.y > 5 && this._parent[tgt].doSHD(this.dam))
                     {
                        snd("snd_launch3");
                        this._parent[tgt].vZ += 0.1 * v._sZ;
                        this._parent[tgt].vX += 0.1 * v._sX;
                        this._parent[tgt].vY += 0.1 * v._sY;
                     }
                     else
                     {
                        this._parent[tgt].hitbo();
                        this._parent[tgt].onhit(this.dam,this.mst);
                     }
                     subhit();
                     this._parent.attachMovie(this.bot,this._name + "bo",this._parent.getNextHighestDepth(),{_sX:this._sX,_sY:this._sY,_sZ:this._sZ,mst:this.tgt});
                     this.removeMovieClip();
                  }
               }
            }
            else
            {
               intt = 0;
               _root.jiemiam.hkxsq[this._name].jiantou.gotoAndStop(1);
            }
            if(dst < _loc5_ && _loc5_ < 60 + this.hq * 2)
            {
               dst = _loc5_;
               if((this.bofg == 0 || maxt - t <= 45) && dst < 60 || rgs <= 0 || this.fsiz > 1 || rg > 1)
               {
                  if(this.fsiz > 2)
                  {
                     zdEXF();
                  }
                  else
                  {
                     subhit();
                     this._parent.attachMovie(this.bot,this._name + "bo",this._parent.getNextHighestDepth(),{_sX:this._sX,_sY:this._sY,_sZ:this._sZ,mst:this.tgt});
                     this.removeMovieClip();
                  }
               }
               else
               {
                  this.bofg = 5;
               }
            }
            else
            {
               dst = _loc5_;
               if(this._parent[tgt]._type == "ff" && this._parent[tgt].fclss == "boom")
               {
                  var _loc7_ = speed / dst;
                  this.v._sZ = _loc13_ * _loc7_ * 0.25 + this.v._sZ * 0.75;
                  this.v._sY = _loc14_ * _loc7_ * 0.25 + this.v._sY * 0.75;
                  this.v._sX = _loc17_ * _loc7_ * 0.25 + this.v._sX * 0.75;
                  this._sW = Math.atan2(this.v._sX,this.v._sY);
                  this._sH = Math.atan2(this.v._sZ,distance(0,0,this.v._sX,this.v._sY));
               }
               else if(this.bofg == 0)
               {
                  if(rgs <= 0)
                  {
                     rg = 0.2;
                  }
                  this.rgx = 0;
                  var _loc6_ = 30 - t;
                  if(_loc6_ < 15)
                  {
                     _loc6_ = 15;
                  }
                  _loc9_ = new Object();
                  _loc9_ = _global.sToc(_loc17_,_loc14_,_loc13_,this._sW,this._sH,this._sR);
                  var _loc15_ = Math.atan2(_loc9_.x,_loc9_.y);
                  var _loc16_ = Math.atan2(_loc9_.z,distance(0,0,_loc9_.x,_loc9_.y));
                  var _loc8_ = distance(0,0,_loc15_,_loc16_);
                  var _loc10_ = (dst + 400) / 600;
                  if(_loc10_ > 2)
                  {
                     _loc10_ = 2;
                  }
                  else if(_loc10_ < 1)
                  {
                     _loc10_ = 1;
                  }
                  var _loc19_ = undefined;
                  if(this.zdt == 0 && _loc8_ > _loc10_ * 3.141592653589793 / _loc6_ || _loc8_ > 3.141592653589793 / _loc6_ && dst < 200)
                  {
                     if(rg < 1)
                     {
                        this.rw += _loc15_ * (3.141592653589793 / _loc6_) / _loc8_ - this.rw;
                        this.rh += _loc16_ * (3.141592653589793 / _loc6_) / _loc8_ - this.rh;
                        rgs--;
                        _global.objrotate(this,rg * this.rw,rg * this.rh,0);
                     }
                     else
                     {
                        this.rw += _loc15_ * (3.141592653589793 / _loc6_) / _loc8_ - this.rw;
                        this.rh += _loc16_ * (3.141592653589793 / _loc6_) / _loc8_ - this.rh;
                        rgs--;
                        _global.objrotate(this,this.rw,this.rh,0);
                     }
                     _loc19_ = false;
                  }
                  else
                  {
                     if(this.zdt == 0)
                     {
                        this.zdt = random(5) * (random(4) + 1);
                        var _loc24_ = (random(3) - 1) * 3.141592653589793 / _loc6_;
                     }
                     else
                     {
                        _loc24_ = 0;
                     }
                     if(t < 30)
                     {
                        this.rw *= 0.8;
                        this.rh *= 0.8;
                     }
                     else
                     {
                        this.rw *= 0.7;
                        this.rh *= 0.7;
                     }
                     _global.objrotate(this,this.rw,this.rh,_loc24_);
                     _loc19_ = true;
                  }
                  if(this.zdt > 0)
                  {
                     this.zdt = this.zdt - 1;
                  }
                  if(dst > 150)
                  {
                     _loc7_ = rg * 0.4;
                  }
                  else
                  {
                     _loc7_ = rg * 0.2;
                  }
                  var _loc11_ = speed;
                  if(_loc19_ && dst > 10 * speed || maxt - t <= 20)
                  {
                     _loc11_ *= 2;
                  }
                  else if(intt > 30)
                  {
                     _loc11_ *= 1.5;
                  }
                  v._sZ = _loc11_ * Math.sin(this._sH) * _loc7_ + v._sZ * (1 - _loc7_);
                  var _loc20_ = _loc11_ * Math.cos(this._sH);
                  v._sX = _loc20_ * Math.sin(this._sW) * _loc7_ + v._sX * (1 - _loc7_);
                  v._sY = _loc20_ * Math.cos(this._sW) * _loc7_ + v._sY * (1 - _loc7_);
               }
            }
         }
      }
   }
}
function subhit()
{
   for(var _loc14_ in _root.cmrs)
   {
      if(_root.cmrs[_loc14_]._force == this.tgt_force)
      {
         if(_loc14_ != this.tgt)
         {
            var _loc10_ = _parent[_loc14_]._sX - this._sX;
            var _loc9_ = _parent[_loc14_]._sY - this._sY;
            var _loc7_ = _parent[_loc14_]._sZ - this._sZ;
            var _loc8_ = dist_3d(0,0,0,_loc10_,_loc9_,_loc7_);
            var _loc6_ = undefined;
            if(this.t <= 10)
            {
               _loc6_ = 10;
            }
            else
            {
               _loc6_ = this.hq;
            }
            if(_loc8_ < _loc6_)
            {
               if(this._parent[_loc14_]._type == "ff")
               {
                  this._parent[_loc14_].onhit(this.dam,this.mst);
               }
               else
               {
                  var _loc5_ = new Object();
                  if(this._parent[_loc14_].shdon >= 0)
                  {
                     var _loc13_ = this._sX - this._parent[_loc14_]._sX;
                     var _loc12_ = this._sY - this._parent[_loc14_]._sY;
                     var _loc11_ = this._sZ - this._parent[_loc14_]._sZ;
                     _loc5_ = _global.sToc(_loc13_,_loc12_,_loc11_,this._parent[_loc14_].objz._sW,this._parent[_loc14_].objz._sH,this._parent[_loc14_].objz._sR);
                  }
                  else
                  {
                     _loc5_.y = 0;
                  }
                  if(_loc5_.y > 5 && this._parent[_loc14_].doSHD(this.dam))
                  {
                     snd("snd_launch3");
                  }
                  else
                  {
                     this._parent[_loc14_].hitbo();
                     this._parent[_loc14_].onhit(this.dam,this.mst);
                  }
               }
            }
         }
      }
   }
}
function zdEXF()
{
   this._parent.attachMovie("dd_bomb",this._name + "EX_" + EXon,this._parent.getNextHighestDepth(),{_sX:this._sX,_sY:this._sY,_sZ:this._sZ,dam:this.dam});
   this._parent[this._name + "EX_" + EXon].mst = this.mst;
   this._parent[this._name + "EX_" + EXon].tgt = this.tgt;
   this.removeMovieClip();
}
stop();
var bofg = 0;
var _HP = 0;
var _type;
var hypt = 0;
var _size = "S";
var fclss = "boom";
var mst;
var tgt;
var _force = this._parent[mst]._force;
var dam;
var v = new Object();
var speed;
var fsiz;
var rg;
var rgs = 150;
var rw = 0;
var rh = 0;
var maxforce;
var dst = maxforce;
var maxt = maxforce / speed;
var hitime;
if(hitime == null)
{
   hitime = maxt + 30;
}
var t;
var intt = 0;
if(t == null)
{
   t = 0;
}
var fsound;
var hq = 30;
var bot = "bo_3";
if(this.fsiz > 2)
{
   this.bot = "bo_8";
   this.hq += 200;
   this.rgs = 50;
}
else if(this.fsiz > 1)
{
   this.bot = "bo_8";
   this.hq = 80;
   this.rgs = 100;
}
var wjlv;
var onlock = null;
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
_parent.attachMovie("slineteam",_name + "wj",_parent.getNextHighestDepth());
if(this._parent[tgt]._type == "ff")
{
   if(this._parent[tgt].tgt == this.mst)
   {
      _parent[tgt].onlock = this._name;
      if(this._parent[tgt].fclss == "shoot" || this._parent[tgt].fclss == "gd")
      {
         _parent[tgt].tgt = this._name;
         if(this._parent[tgt].tson)
         {
            _parent[tgt].axt = _parent[tgt].t;
            _parent[tgt].onEnterFrame = function()
            {
               this.ts();
            };
         }
      }
      else if(this._parent[tgt].fclss == "boom")
      {
         _parent[tgt].tgt = this._name;
      }
   }
}
this.mainact = function()
{
   this._sZ += this.v._sZ;
   this._sX += this.v._sX;
   this._sY += this.v._sY;
};
if(t >= 0)
{
   play();
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
var zdt = 0;
