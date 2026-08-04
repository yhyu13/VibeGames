function bo()
{
   if(this.bofg > 0)
   {
      this.bofg = this.bofg - 1;
   }
   t++;
   if(this.hq < 2000)
   {
      this.hq += 20;
   }
   else
   {
      this.hq += 20;
      _root.jiemiam.hkxsq[this._name].removeMovieClip();
      this.onEnterFrame = function()
      {
         if(this._sc != null)
         {
            this._parent[this._name + "bo_r"]._x = this._sx;
            this._parent[this._name + "bo_r"]._y = this._sy;
            this._parent[this._name + "bo_r"]._xscale = this._sc * this.hq;
            this._parent[this._name + "bo_r"]._yscale = this._sc * this.hq;
            this._parent[this._name + "bo_x"]._x = this._sx;
            this._parent[this._name + "bo_x"]._y = this._sy;
            this._parent[this._name + "bo_x"]._xscale = 0.5 * this._sc * (150 + this.hq);
            this._parent[this._name + "bo_x"]._yscale = 0.5 * this._sc * (150 + this.hq);
            if(t % 2 == 1)
            {
               this._parent[this._name + "bo_r"]._alpha = this.fv;
               this._parent[this._name + "bo_x"]._alpha = this.fv;
            }
            else
            {
               this._parent[this._name + "bo_r"]._alpha = 0.5 * this.fv;
               this._parent[this._name + "bo_x"]._alpha = 0.5 * this.fv;
            }
         }
         else
         {
            this._parent[this._name + "bo_r"]._alpha = 0;
            this._parent[this._name + "bo_x"]._alpha = 0;
         }
         if(!stopAll)
         {
            over();
         }
      };
   }
   if(this._parent[this.mst].AI != undefined)
   {
      this._parent[this.mst].AI.tuili(this._name);
   }
   if(_parent[tgt] != undefined)
   {
      var _loc6_ = _parent[tgt]._sX - this._sX;
      var _loc5_ = _parent[tgt]._sY - this._sY;
      var _loc4_ = _parent[tgt]._sZ - this._sZ;
      this.dst = dist_3d(0,0,0,_loc6_,_loc5_,_loc4_);
      if(this.dst < 1500 + this.hq)
      {
         if(this._parent[this.tgt].AI != undefined)
         {
            this._parent[this.tgt].AI.onhd(this._name,this.dst);
         }
         if(this.tgt == _root.jiemiam.mst)
         {
            _root.jiemiam.hkxsq[this._name].jiantou.play();
         }
      }
      else
      {
         _root.jiemiam.hkxsq[this._name].jiantou.gotoAndStop(1);
      }
      if(dst < this.hq)
      {
         if(this._parent[tgt]._type == "ff")
         {
            this._parent[tgt].onhit(this.dam,this.mst);
         }
         else
         {
            this._parent[tgt].hitbo();
            this._parent[tgt].onhit(this.dam,this.mst);
            this._parent.attachMovie("bo_2",this._name + "bo" + this.tgt + t,this._parent.getNextHighestDepth(),{_sX:this._parent[tgt]._sX + random(11) - 5,_sY:this._parent[tgt]._sY + random(11) - 5,_sZ:this._parent[tgt]._sZ + random(11) - 5,mst:this.tgt});
         }
      }
   }
   subhit();
}
function over()
{
   if(this.bofg > 0)
   {
      this.bofg = this.bofg - 1;
   }
   t++;
   this.fv -= 10;
   if(this.fv > 5)
   {
      this.hq += 10;
   }
   else
   {
      this._parent[this._name + "bo_r"].removeMovieClip();
      this._parent[this._name + "bo_x"].removeMovieClip();
      this.removeMovieClip();
   }
}
function subhit()
{
   for(var _loc8_ in _root.cmrs)
   {
      if(_root.cmrs[_loc8_]._force != undefined)
      {
         if(_loc8_ != this.tgt)
         {
            var _loc7_ = _parent[_loc8_]._sX - this._sX;
            var _loc6_ = _parent[_loc8_]._sY - this._sY;
            var _loc5_ = _parent[_loc8_]._sZ - this._sZ;
            var _loc4_ = dist_3d(0,0,0,_loc7_,_loc6_,_loc5_);
            if(_loc4_ < 1500 + this.hq)
            {
               if(this._parent[_loc8_].AI != undefined)
               {
                  this._parent[_loc8_].AI.onhd(this._name,_loc4_);
               }
            }
            if(_loc4_ < this.hq)
            {
               if(this._parent[_loc8_]._type == "ff")
               {
                  this._parent[_loc8_].onhit(this.dam,this.mst);
               }
               else
               {
                  this._parent[_loc8_].hitbo();
                  this._parent[_loc8_].onhit(this.dam,this.mst);
                  this._parent.attachMovie("bo_2",this._name + "bo" + _loc8_ + t,this._parent.getNextHighestDepth(),{_sX:this._parent[_loc8_]._sX + random(11) - 5,_sY:this._parent[_loc8_]._sY + random(11) - 5,_sZ:this._parent[_loc8_]._sZ + random(11) - 5,mst:_loc8_});
               }
            }
         }
      }
   }
}
var bofg = 0;
var _HP = 0;
var _type = "ff";
var hypt = 0;
var _size = "S";
var fclss = "sboom";
var mst;
var tgt;
var _force = this._parent[mst]._force;
var tgt_force = this._parent[this.tgt]._force;
if(this.tgt_force == undefined)
{
   this.tgt_force = 0;
}
var dam;
var v = new Object();
v._sX = 0;
v._sY = 0;
v._sZ = 0;
var htime;
var speed;
var maxforce;
var maxt = maxforce / speed;
var dst = maxforce;
var t = 0;
var hq = 10;
var wjlv;
var onlock = null;
if(this._parent[this.mst].v != undefined)
{
   this.v._sX = this._parent[this.mst].v._sX;
   this.v._sY = this._parent[this.mst].v._sY;
   this.v._sZ = this._parent[this.mst].v._sZ;
}
this.v._sZ += speed * Math.sin(this._sH);
var ss = speed * Math.cos(this._sH);
this.v._sX += ss * Math.sin(this._sW);
this.v._sY += ss * Math.cos(this._sW);
this._sZ += this.v._sZ;
this._sX += this.v._sX;
this._sY += this.v._sY;
_global.SimpList[this._name] = this;
_root.jiemiam.addff(this._name);
this.mainact = function()
{
   this._sZ += this.v._sZ;
   this._sX += this.v._sX;
   this._sY += this.v._sY;
};
onEnterFrame = function()
{
   if(!stopAll)
   {
      if(this.bofg > 0)
      {
         this.bofg = this.bofg - 1;
      }
      t++;
      _parent.attachMovie("wjline3",_name + "wj" + t,_parent.getNextHighestDepth(),{_sX:this._sX,_sY:this._sY,_sZ:this._sZ,_sX2:this._sX - v._sX,_sY2:this._sY - v._sY,_sZ2:this._sZ - v._sZ,t:6,_siz:4,_sizz:1});
      if(_parent[tgt] != undefined)
      {
         var _loc12_ = _parent[tgt]._sX - this._sX;
         var _loc11_ = _parent[tgt]._sY - this._sY;
         var _loc10_ = _parent[tgt]._sZ - this._sZ;
         this.dst = dist_3d(0,0,0,_loc12_,_loc11_,_loc10_);
         if(dst < 5000)
         {
            _parent[tgt].onkillff(this._name);
            if(this.mst != _root.jiemiam.mst)
            {
               _root.jiemiam.hkxsq[this._name].gotoAndStop(2);
            }
            if(dst < 2500)
            {
               if(this.mst != _root.jiemiam.mst)
               {
                  _root.jiemiam.hkxsq[this._name].jiantou.play();
               }
            }
            else
            {
               _root.jiemiam.hkxsq[this._name].jiantou.gotoAndStop(1);
            }
         }
         for(var _loc9_ in _root.cmrs)
         {
            if(_root.cmrs[_loc9_]._force != undefined)
            {
               var _loc7_ = _parent[_loc9_]._sX - this._sX;
               var _loc6_ = _parent[_loc9_]._sY - this._sY;
               var _loc5_ = _parent[_loc9_]._sZ - this._sZ;
               var _loc4_ = dist_3d(0,0,0,_loc7_,_loc6_,_loc5_);
               if(_loc4_ < 1500)
               {
                  if(this._parent[_loc9_].AI != undefined)
                  {
                     this._parent[_loc9_].AI.onhd(this._name,_loc4_);
                  }
               }
            }
         }
         if(t > 5)
         {
            if(this._parent[this.mst].AI != undefined)
            {
               this._parent[this.mst].AI.tuili(this._name);
            }
            var _loc13_ = (dst + speed) / speed;
            _loc12_ += _parent[tgt].v._sX * _loc13_;
            _loc11_ += _parent[tgt].v._sY * _loc13_;
            _loc10_ += _parent[tgt].v._sZ * _loc13_;
            var _loc17_ = dst;
            var _loc8_ = speed / _loc17_;
            var _loc14_ = _loc8_ * _loc10_ - v._sZ;
            var _loc16_ = _loc8_ * _loc12_ - v._sX;
            var _loc15_ = _loc8_ * _loc11_ - v._sY;
            if(this._parent[this.mst].htime != null || dist_3d(0,0,0,_loc16_,_loc15_,_loc14_) < speed * 0.5)
            {
               _loc8_ = 1 / (t + 5);
               v._sZ += _loc14_ * _loc8_;
               v._sX += _loc16_ * _loc8_;
               v._sY += _loc15_ * _loc8_;
               this._sW = Math.atan2(v._sX,v._sY);
               this._sH = Math.atan2(v._sZ,distance(0,0,v._sX,v._sY));
            }
         }
      }
      if(htime == null || htime > maxt)
      {
         htime = maxt - 1;
      }
      if(t > htime && t > 30)
      {
         this.hq = 100;
         this._type = null;
         this.onhit = function()
         {
         };
         this._alpha = 0;
         snd("sgsp");
         this._type = null;
         this.v._sZ = 0;
         this.v._sX = 0;
         this.v._sY = 0;
         this._parent.attachMovie("hd_r",this._name + "bo_r",this._parent.getNextHighestDepth(),{_alpha:0});
         this._parent.attachMovie("hd_x",this._name + "bo_x",this._parent.getNextHighestDepth(),{_alpha:0});
         this.onEnterFrame = function()
         {
            if(this._sc > 0)
            {
               this._parent[this._name + "bo_r"]._x = this._sx;
               this._parent[this._name + "bo_r"]._y = this._sy;
               this._parent[this._name + "bo_r"]._xscale = this._sc * this.hq;
               this._parent[this._name + "bo_r"]._yscale = this._sc * this.hq;
               this._parent[this._name + "bo_x"]._x = this._sx;
               this._parent[this._name + "bo_x"]._y = this._sy;
               this._parent[this._name + "bo_x"]._xscale = 0.5 * this._sc * (150 + this.hq);
               this._parent[this._name + "bo_x"]._yscale = 0.5 * this._sc * (150 + this.hq);
               if(t % 2 == 1)
               {
                  this._parent[this._name + "bo_r"]._alpha = 100;
                  this._parent[this._name + "bo_x"]._alpha = 100;
               }
               else
               {
                  this._parent[this._name + "bo_r"]._alpha = 50;
                  this._parent[this._name + "bo_x"]._alpha = 50;
               }
            }
            else
            {
               this._parent[this._name + "bo_r"]._alpha = 0;
               this._parent[this._name + "bo_x"]._alpha = 0;
            }
            if(!stopAll)
            {
               bo();
            }
         };
      }
   }
};
var fv = 100;
