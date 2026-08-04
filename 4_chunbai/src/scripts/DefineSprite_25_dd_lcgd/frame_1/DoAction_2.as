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
function att()
{
   if(!stopAll)
   {
      t++;
      if(this._parent[this.mst] != undefined || !backmst)
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
      if(t >= maxt)
      {
         onEnterFrame = function()
         {
            back();
         };
      }
      else if(this._parent[this.tgt] != undefined && this._parent[this.mst]._zt == "nor")
      {
         var _loc10_ = _parent[tgt]._sX - this._sX;
         var _loc9_ = _parent[tgt]._sY - this._sY;
         var _loc12_ = _parent[tgt]._sZ - this._sZ;
         var _loc13_ = dist_3d(0,0,0,_loc10_,_loc9_,_loc12_);
         dst = _loc13_;
         if(this._parent[this.mst].htime != null)
         {
            this._sW = Math.atan2(_loc10_,_loc9_);
            this._sH = Math.atan2(_loc12_,distance(0,0,_loc10_,_loc9_));
            var _loc11_ = speed / dst;
            v._sZ = _loc12_ * _loc11_ * 0.2 + v._sZ * 0.8;
            v._sY = _loc9_ * _loc11_ * 0.2 + v._sY * 0.8;
            v._sX = _loc10_ * _loc11_ * 0.2 + v._sX * 0.8;
         }
         if(_loc13_ < 100)
         {
            if(this._parent[this.tgt].AI != undefined)
            {
               this._parent[this.tgt].AI.ongd(this._name);
            }
         }
         if(_loc13_ < 10)
         {
            if(this._parent[tgt]._type == "ff")
            {
               this._parent[tgt].onhit(this.dam,this.mst);
               this._parent.attachMovie("bo_7",this._name + "bo",this._parent.getNextHighestDepth(),{_sX:0.5 * (this._sX + this._parent[tgt]._sX),_sY:0.5 * (this._sY + this._parent[tgt]._sY),_sZ:0.5 * (this._sZ + this._parent[tgt]._sZ),mst:this.tgt});
            }
            else
            {
               this._parent[tgt].hitbo();
               this._parent[tgt].onhit(this.dam,this.mst);
               if(_parent[tgt].hypt == 0)
               {
                  this._parent[tgt].vZ += 0.5 * v._sZ;
                  this._parent[tgt].vX += 0.5 * v._sX;
                  this._parent[tgt].vY += 0.5 * v._sY;
                  this._parent.attachMovie("bo_7",this._name + "bo",this._parent.getNextHighestDepth(),{_sX:0.5 * (this._sX + this._parent[tgt]._sX),_sY:0.5 * (this._sY + this._parent[tgt]._sY),_sZ:0.5 * (this._sZ + this._parent[tgt]._sZ),mst:this.tgt});
                  if(this._parent[tgt]._size != "L" && this.fsiz > 1)
                  {
                     this._parent[tgt].hypt = -5;
                     this._parent[this.mst].AI.doGDLJ();
                     mz = true;
                     this._parent[this.tgt].Bindtgt = this;
                     this._parent[this.tgt].Bind_X = 0;
                     this._parent[this.tgt].Bind_Y = 0;
                     this._parent[this.tgt].Bind_Z = 0;
                     var _loc8_ = new Object();
                     _loc8_ = _global.aToa(this._parent[tgt]._sW,this._parent[tgt]._sH,this._parent[tgt]._sR,this._sW,this._sH,this._sR);
                     this.CsW = _loc8_.w;
                     this.CsH = _loc8_.h;
                     this.CsR = _loc8_.r;
                     this._parent[this.tgt].Bind_W = this.CsW;
                     this._parent[this.tgt].Bind_H = this.CsH;
                     this._parent[this.tgt].Bind_R = this.CsR;
                  }
               }
            }
            onEnterFrame = function()
            {
               back();
            };
         }
      }
   }
}
function back()
{
   if(!stopAll)
   {
      t++;
      if(this._parent[this.mst] != undefined || !backmst)
      {
         if(this._parent[this.tgt] != undefined && _parent[tgt].hypt <= 0)
         {
            if(mz)
            {
               this._parent[tgt].hypt = -5;
               this._parent[this.tgt].Bindtgt = this;
               this._parent[this.tgt].Bind_X = 0;
               this._parent[this.tgt].Bind_Y = 0;
               this._parent[this.tgt].Bind_Z = 0;
               this._parent[this.tgt].Bind_W = this.CsW;
               this._parent[this.tgt].Bind_H = this.CsH;
               this._parent[this.tgt].Bind_R = this.CsR;
            }
         }
         var _loc4_ = _parent[mst]._sX - this._sX;
         var _loc3_ = _parent[mst]._sY - this._sY;
         var _loc6_ = _parent[mst]._sZ - this._sZ;
         var _loc7_ = dist_3d(0,0,0,_loc4_,_loc3_,_loc6_);
         dst = _loc7_;
         this._sW = Math.atan2(- _loc4_,- _loc3_);
         this._sH = Math.atan2(- _loc6_,distance(0,0,- _loc4_,- _loc3_));
         if(dst > 200)
         {
            var _loc5_ = speed / dst;
            v._sZ = _loc6_ * _loc5_ * 0.2 + v._sZ * 0.8;
            v._sY = _loc3_ * _loc5_ * 0.2 + v._sY * 0.8;
            v._sX = _loc4_ * _loc5_ * 0.2 + v._sX * 0.8;
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
      t++;
      if(this._parent[this.mst] != undefined || !backmst)
      {
         if(this._parent[this.tgt] != undefined && _parent[tgt].hypt <= 0)
         {
            if(mz)
            {
               this._parent[tgt].hypt = -5;
               this._parent[this.tgt].Bindtgt = this;
               this._parent[this.tgt].Bind_X = 0;
               this._parent[this.tgt].Bind_Y = 0;
               this._parent[this.tgt].Bind_Z = 0;
               this._parent[this.tgt].Bind_W = this.CsW;
               this._parent[this.tgt].Bind_H = this.CsH;
               this._parent[this.tgt].Bind_R = this.CsR;
            }
         }
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
         if(mz && t < this.axt + 30)
         {
            v._sX = _parent[mst].v._sX;
            v._sY = _parent[mst].v._sY;
            v._sZ = _parent[mst].v._sZ;
         }
         else
         {
            v._sX = _loc3_ * (_loc6_ + _parent[mst].v._sX);
            v._sY = _loc3_ * (_loc5_ + _parent[mst].v._sY);
            v._sZ = _loc3_ * (_loc4_ + _parent[mst].v._sZ);
         }
         shouxian();
         if(dst < 5)
         {
            this._parent[mst][this.wpname].t = this._parent[mst][this.wpname].ct;
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
this._visibleDst = 30;
var _HP = 0;
var mst;
var tgt;
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
var CsW = ccd.w;
var CsH = ccd.h;
var CsR = ccd.r;
var wpname;
var backmst = true;
var fsiz;
var mz = false;
v._sZ = speed * Math.sin(this._sH);
var ss = speed * Math.cos(this._sH);
v._sX = ss * Math.sin(this._sW);
v._sY = ss * Math.cos(this._sW);
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
   att();
};
