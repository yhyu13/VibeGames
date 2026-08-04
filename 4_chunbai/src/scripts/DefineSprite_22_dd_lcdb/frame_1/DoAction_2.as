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
      else if(this._parent[this.tgt] != undefined && this._parent[this.mst]._zt == "nor")
      {
         var _loc9_ = _parent[tgt]._sX - this._sX;
         var _loc8_ = _parent[tgt]._sY - this._sY;
         var _loc10_ = _parent[tgt]._sZ - this._sZ;
         var _loc11_ = dist_3d(0,0,0,_loc9_,_loc8_,_loc10_);
         dst = _loc11_;
         if(this._parent[this.mst].htime != null)
         {
            this._sW = Math.atan2(_loc9_,_loc8_);
            this._sH = Math.atan2(_loc10_,distance(0,0,_loc9_,_loc8_));
            var _loc7_ = speed / dst;
            if(_loc7_ > 1)
            {
               _loc7_ = 0.9;
            }
            v._sZ = _loc10_ * _loc7_ * 0.2 + v._sZ * 0.8;
            v._sY = _loc8_ * _loc7_ * 0.2 + v._sY * 0.8;
            v._sX = _loc9_ * _loc7_ * 0.2 + v._sX * 0.8;
         }
         if(_loc11_ < 100)
         {
            if(this._parent[this.tgt].AI != undefined)
            {
               this._parent[this.tgt].AI.ongd(this._name);
            }
         }
         if(_loc11_ < 10 || mz)
         {
            if(this._parent[tgt]._type == "ff")
            {
               this._parent[tgt].onhit(this.dam,this.mst);
               this._parent.attachMovie("bo_7",this._name + "bo",this._parent.getNextHighestDepth(),{_sX:0.5 * (this._sX + this._parent[tgt]._sX),_sY:0.5 * (this._sY + this._parent[tgt]._sY),_sZ:0.5 * (this._sZ + this._parent[tgt]._sZ),mst:this.tgt});
            }
            else if(_parent[tgt].hypt <= 0)
            {
               snd("gjk");
               if(EXon)
               {
                  this.axt = this.t;
                  onEnterFrame = function()
                  {
                     catchtgt();
                  };
               }
               else
               {
                  this._parent[this.mst].AI.doGDLJ();
                  this.axt = this.t;
                  if(this.dam > 0)
                  {
                     onEnterFrame = function()
                     {
                        hit();
                     };
                  }
                  else
                  {
                     onEnterFrame = function()
                     {
                        catchtgt();
                     };
                  }
               }
            }
         }
      }
   }
}
function catchtgt()
{
   if(!stopAll)
   {
      t++;
      if(this.t >= this.axt + 120 || EXon && !mz || _parent[tgt].hypt > 0)
      {
         onEnterFrame = function()
         {
            back();
         };
      }
      if(this._parent[this.tgt] != undefined && this._parent[this.mst]._zt == "nor")
      {
         this._parent[this.tgt].weaponCD = 30;
         var _loc4_ = _parent[tgt]._sX - this._sX;
         var _loc3_ = _parent[tgt]._sY - this._sY;
         var _loc6_ = _parent[tgt]._sZ - this._sZ;
         var _loc7_ = dist_3d(0,0,0,_loc4_,_loc3_,_loc6_);
         dst = _loc7_;
         this._sW = Math.atan2(_loc4_,_loc3_);
         this._sH = Math.atan2(_loc6_,distance(0,0,_loc4_,_loc3_));
         if(this._parent[this.mst].covon || EXon)
         {
            if(EXon)
            {
               v._sZ = 0;
               v._sY = 0;
               v._sX = 0;
            }
            else if(dst > 5)
            {
               var _loc5_ = (dst - 5) / dst;
               v._sZ = _loc6_ * _loc5_;
               v._sY = _loc3_ * _loc5_;
               v._sX = _loc4_ * _loc5_;
            }
         }
         else
         {
            onEnterFrame = function()
            {
               back();
            };
         }
         this._parent[tgt].hitbo();
      }
      else
      {
         onEnterFrame = function()
         {
            back();
         };
      }
      if(this._parent[this.mst] != undefined || !backmst)
      {
         shouxian();
      }
      else
      {
         _parent[_name + "wj"].removeMovieClip();
         this.removeMovieClip();
      }
   }
}
function hit()
{
   if(!stopAll)
   {
      t++;
      if(this.t == this.axt + 10)
      {
         snd("dj");
      }
      if(this.t >= this.axt + 60 || this._parent[mst].bofg > 0 || _parent[tgt].hypt > 0)
      {
         onEnterFrame = function()
         {
            back();
         };
      }
      if(this._parent[this.tgt] != undefined && this._parent[this.mst]._zt == "nor")
      {
         this._parent[this.tgt].weaponCD = 30;
         var _loc5_ = _parent[tgt]._sX - this._sX;
         var _loc4_ = _parent[tgt]._sY - this._sY;
         var _loc7_ = _parent[tgt]._sZ - this._sZ;
         var _loc8_ = dist_3d(0,0,0,_loc5_,_loc4_,_loc7_);
         dst = _loc8_;
         this._sW = Math.atan2(_loc5_,_loc4_);
         this._sH = Math.atan2(_loc7_,distance(0,0,_loc5_,_loc4_));
         if(this._parent[this.mst].covon)
         {
            if(dst > 5)
            {
               var _loc6_ = (dst - 5) / dst;
               v._sZ = _loc7_ * _loc6_;
               v._sY = _loc4_ * _loc6_;
               v._sX = _loc5_ * _loc6_;
            }
         }
         else
         {
            _root.Sound_box.music_dj.stop("dj");
            onEnterFrame = function()
            {
               back();
            };
         }
         this._parent[tgt].hitbo();
         this._parent[tgt].onhit(this.dam,this.mst);
         this._parent.attachMovie("bo_2",this._name + "bo" + this.tgt + t,this._parent.getNextHighestDepth(),{_sX:0.5 * (this._sX + this._parent[tgt]._sX),_sY:0.5 * (this._sY + this._parent[tgt]._sY),_sZ:0.5 * (this._sZ + this._parent[tgt]._sZ),mst:this.tgt});
      }
      else
      {
         _root.Sound_box.music_dj.stop("dj");
         onEnterFrame = function()
         {
            back();
         };
      }
      if(this._parent[this.mst] != undefined || !backmst)
      {
         shouxian();
      }
      else
      {
         _root.Sound_box.music_dj.stop("dj");
         _parent[_name + "wj"].removeMovieClip();
         this.removeMovieClip();
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
         v._sX = _loc3_ * (_loc6_ + _parent[mst].v._sX);
         v._sY = _loc3_ * (_loc5_ + _parent[mst].v._sY);
         v._sZ = _loc3_ * (_loc4_ + _parent[mst].v._sZ);
         shouxian();
         if(dst < 5)
         {
            if(!EXon)
            {
               this._parent[mst][this.wpname].t = this._parent[mst][this.wpname].ct;
            }
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
var wpname;
var backmst = true;
var EXon = false;
var mz = false;
if(wpname == null)
{
   EXon = true;
}
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
