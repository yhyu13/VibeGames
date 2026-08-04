function holdme()
{
   if(!stopAll)
   {
      if(tgt == _root.jiemiam.mst)
      {
         _root.jiemiam.hkxsq[mst].jiantou.play();
      }
      t++;
      if(this._parent[mst].bofg > 0 || this.cancle || this._parent[mst]._EN < this._parent[mst]["weapon" + this._parent[mst].weaponow].en)
      {
         _parent[mst].weaponhold = false;
         this._parent[mst]["weapon" + this._parent[mst].weaponow].t = this._parent[mst]["weapon" + this._parent[mst].weaponow].ct;
         root.Sound_box.music_gpxn2.stop("gpxn2");
         this.removeMovieClip();
      }
      else if(t < 30)
      {
         if(_parent[mst].onkf == 0 && _parent[mst].firectrlmode != "AUTO")
         {
            this.cancle = true;
         }
         if(this._siz < this.sz)
         {
            this._siz += this.sz * 0.02;
         }
         if(t % 2 == 1)
         {
            this._alpha = 100;
         }
         else
         {
            this._alpha = 0;
         }
         if(_parent[mst] != undefined)
         {
            this._parent[mst].atton = 5;
            this._parent[mst]["weapon" + this._parent[mst].weaponow].xpmax = 30;
            this._parent[mst]["weapon" + this._parent[mst].weaponow].xpon = true;
            this._parent[mst].AMBAC = -5;
            this._parent[mst].turnto(this._parent[this.tgt]);
            this._parent[mst].AMBAC = 0;
            this._sW = this._parent[mst]._sW;
            this._sH = this._parent[mst]._sH;
            var _loc7_ = new Object();
            _loc7_ = moveobj(this._parent[mst].objz,this.fx,this.fy + 0.5 * this._siz,this.fz);
            this._sZ = _loc7_.z;
            this._sX = _loc7_.x;
            this._sY = _loc7_.y;
            this.vZ = this._parent[mst].v._sZ;
            this.vX = this._parent[mst].v._sX;
            this.vY = this._parent[mst].v._sY;
         }
         else
         {
            this.removeMovieClip();
         }
      }
      else
      {
         if(_parent[tgt] != undefined)
         {
            var _loc6_ = null;
            var _loc8_ = false;
            if(this._parent[mst].tgt == this.tgt)
            {
               _loc6_ = this._parent[mst].htime;
               _loc8_ = this._parent[mst].lockon;
            }
            else
            {
               var _loc14_ = _parent[tgt]._sX - this._sX;
               var _loc13_ = _parent[tgt]._sY - this._sY;
               var _loc12_ = _parent[tgt]._sZ - this._sZ;
               var _loc9_ = dist_3d(0,0,0,_loc14_,_loc13_,_loc12_);
               _loc6_ = _loc9_ / speed;
               _loc8_ = true;
            }
            if(tgt == _root.jiemiam.mst)
            {
               _root.jiemiam.hkxsq[mst].jiantou.fs = true;
            }
            var _loc20_ = _parent[tgt].v._sX;
            var _loc19_ = _parent[tgt].v._sY;
            var _loc18_ = _parent[tgt].v._sZ;
            if(_loc8_)
            {
               mdx = _loc20_ * _loc6_ + _parent[tgt]._sX;
               mdy = _loc19_ * _loc6_ + _parent[tgt]._sY;
               mdz = _loc18_ * _loc6_ + _parent[tgt]._sZ;
            }
            else
            {
               _loc7_ = new Object();
               _loc7_ = _global.cTos(0,maxforce,0,this._parent[mst].shotw,this._parent[mst].shoth,0);
               mdx = _loc7_.x + this._parent[mst]._sX;
               mdy = _loc7_.y + this._parent[mst]._sY;
               mdz = _loc7_.z + this._parent[mst]._sZ;
            }
         }
         else
         {
            _loc7_ = new Object();
            _loc7_ = _global.cTos(0,maxforce,0,this._parent[mst].shotw,this._parent[mst].shoth,0);
            mdx = _loc7_.x + this._parent[mst]._sX;
            mdy = _loc7_.y + this._parent[mst]._sY;
            mdz = _loc7_.z + this._parent[mst]._sZ;
         }
         if(_parent[mst] != undefined)
         {
            this._parent[mst]["weapon" + this._parent[mst].weaponow].xpmax = 30;
            this._parent[mst]["weapon" + this._parent[mst].weaponow].xpon = true;
            this._parent[mst].AMBAC = -5;
            this._parent[mst].turnto(this._parent[this.tgt]);
            this._parent[mst].AMBAC = 0;
            _loc7_ = new Object();
            _loc7_ = moveobj(this._parent[mst].objz,this.fx,this.fy + 0.5 * this._siz,this.fz);
            this._sZ = _loc7_.z;
            this._sX = _loc7_.x;
            this._sY = _loc7_.y;
            _loc14_ = mdx - this._sX;
            _loc13_ = mdy - this._sY;
            _loc12_ = mdz - this._sZ;
            this._sW = Math.atan2(_loc14_,_loc13_);
            this._sH = Math.atan2(_loc12_,distance(0,0,_loc14_,_loc13_));
            this.vZ = speed * Math.sin(this._sH);
            var _loc11_ = speed * Math.cos(this._sH);
            this.vX = _loc11_ * Math.sin(this._sW);
            this.vY = _loc11_ * Math.cos(this._sW);
         }
         else
         {
            this.removeMovieClip();
         }
         var _loc10_ = false;
         var _loc17_ = mdx - this._sX;
         var _loc16_ = mdy - this._sY;
         var _loc15_ = mdz - this._sZ;
         var _loc5_ = new Object();
         _loc5_ = _global.sToc(_loc17_,_loc16_,_loc15_,this._parent[mst]._sW,this._parent[mst]._sH,this._parent[mst]._sR);
         if(_loc5_.y > 0 && Math.abs(_loc5_.x) < _global.Cmr.wrees * _loc5_.y && Math.abs(_loc5_.z) < _global.Cmr.hrees * _loc5_.y)
         {
            _loc10_ = true;
         }
         if(_loc10_)
         {
            this._alpha = 100;
            t = 0;
            this._siz = this.sz;
            snd("beam4");
            _parent[mst].weaponhold = false;
            this._parent[mst]["weapon" + this._parent[mst].weaponow].t = this._parent[mst]["weapon" + this._parent[mst].weaponow].ct;
            this._parent[mst]["weapon" + this._parent[mst].weaponow].ggCD1();
            this._parent[mst]._EN -= this._parent[mst]["weapon" + this._parent[mst].weaponow].en;
            onEnterFrame = function()
            {
               fsme();
            };
         }
         else
         {
            this._parent[mst]["weapon" + this._parent[mst].weaponow].t = this._parent[mst]["weapon" + this._parent[mst].weaponow].ct;
            _parent[mst].weaponhold = false;
            this.removeMovieClip();
         }
      }
      if(_parent[tgt] != undefined)
      {
         _loc14_ = _parent[tgt]._sX - this._sX;
         _loc13_ = _parent[tgt]._sY - this._sY;
         _loc12_ = _parent[tgt]._sZ - this._sZ;
         this.dst = dist_3d(0,0,0,_loc14_,_loc13_,_loc12_);
         if(_loc9_ < this.hq + 0.5 * _siz)
         {
            if(this._parent[tgt]._type == "ff")
            {
               this._parent[tgt].onhit(this.dam,this.mst);
               if(this._parent[tgt] != undefined)
               {
                  if(t % 3 == 0)
                  {
                     this._parent.attachMovie("bo_2",this._name + "bo" + this.tgt + t,this._parent.getNextHighestDepth(),{_sX:0.8 * (this._sX + _parent[tgt]._sX),_sY:0.8 * (this._sY + _parent[tgt]._sY),_sZ:0.8 * (this._sZ + _parent[tgt]._sZ),mst:this.tgt});
                  }
               }
            }
            else if(this._parent[tgt].hitbo())
            {
               this._parent[tgt].onhit(this.dam,this.mst);
               this._parent.attachMovie("bo_1",this._name + "bo" + this.tgt + t,this._parent.getNextHighestDepth(),{_sX:0.8 * (this._sX + _parent[tgt]._sX),_sY:0.8 * (this._sY + _parent[tgt]._sY),_sZ:0.8 * (this._sZ + _parent[tgt]._sZ),mst:this.tgt});
            }
            else
            {
               this._parent[tgt].onhit(this.dam,this.mst);
               this._parent.attachMovie("bo_2",this._name + "bo" + this.tgt + t,this._parent.getNextHighestDepth(),{_sX:0.8 * (this._sX + _parent[tgt]._sX),_sY:0.8 * (this._sY + _parent[tgt]._sY),_sZ:0.8 * (this._sZ + _parent[tgt]._sZ),mst:this.tgt});
            }
         }
      }
      subhit();
   }
}
function fsme()
{
   if(!stopAll)
   {
      t++;
      if(this._siz < this.sz)
      {
         this._siz += this.sz * 0.02;
      }
      if(t % 2 == 1)
      {
         this._alpha = 100;
      }
      else
      {
         this._alpha = 50;
      }
      this._sZ += this.vZ;
      this._sX += this.vX;
      this._sY += this.vY;
      if(_parent[tgt] != undefined)
      {
         var _loc5_ = _parent[tgt]._sX - this._sX;
         var _loc4_ = _parent[tgt]._sY - this._sY;
         var _loc3_ = _parent[tgt]._sZ - this._sZ;
         this.dst = dist_3d(0,0,0,_loc5_,_loc4_,_loc3_);
         if(this.dst < 30 * this.speed)
         {
            if(this._parent[this.tgt].AI != undefined)
            {
               this._parent[this.tgt].AI.onhd(this._name);
            }
         }
         if(dst < this.hq + 0.5 * _siz)
         {
            if(this._parent[tgt]._type == "ff")
            {
               this._parent[tgt].onhit(this.dam,this.mst);
               if(this._parent[tgt] != undefined)
               {
                  _parent[tgt].v._sX = 2 * this.vX;
                  _parent[tgt].v._sY = 2 * this.vY;
                  _parent[tgt].v._sZ = 2 * this.vZ;
                  if(t % 3 == 0)
                  {
                     this._parent.attachMovie("bo_2",this._name + "bo" + this.tgt + t,this._parent.getNextHighestDepth(),{_sX:0.8 * (this._sX + _parent[tgt]._sX),_sY:0.8 * (this._sY + _parent[tgt]._sY),_sZ:0.8 * (this._sZ + _parent[tgt]._sZ),mst:this.tgt});
                  }
               }
            }
            else
            {
               if(this._parent[tgt].hitbo())
               {
                  this._parent[tgt].onhit(this.dam,this.mst);
                  this._parent.attachMovie("bo_1",this._name + "bo" + this.tgt + t,this._parent.getNextHighestDepth(),{_sX:0.8 * (this._sX + _parent[tgt]._sX),_sY:0.8 * (this._sY + _parent[tgt]._sY),_sZ:0.8 * (this._sZ + _parent[tgt]._sZ),mst:this.tgt});
               }
               else
               {
                  this._parent[tgt].onhit(this.dam,this.mst);
                  this._parent.attachMovie("bo_2",this._name + "bo" + this.tgt + t,this._parent.getNextHighestDepth(),{_sX:0.8 * (this._sX + _parent[tgt]._sX),_sY:0.8 * (this._sY + _parent[tgt]._sY),_sZ:0.8 * (this._sZ + _parent[tgt]._sZ),mst:this.tgt});
               }
               if(this._parent[tgt]._size != "L" || this._parent[this.tgt].hypt == 0)
               {
                  _parent[tgt].vX = 2 * this.vX;
                  _parent[tgt].vY = 2 * this.vY;
                  _parent[tgt].vZ = 2 * this.vZ;
               }
            }
         }
      }
      subhit();
      if(t >= maxt)
      {
         t = 0;
         onEnterFrame = function()
         {
            overme();
         };
      }
   }
}
function overme()
{
   if(!stopAll)
   {
      if(this.t > 10)
      {
         this.removeMovieClip();
      }
      t++;
      if(t % 2 == 1)
      {
         this._alpha = 100 - 10 * t;
      }
      else
      {
         this._alpha = 50 - 5 * t;
      }
      this._sZ += this.vZ;
      this._sX += this.vX;
      this._sY += this.vY;
      this._siz = 1 * this._siz;
   }
}
function subhit()
{
   for(var _loc7_ in _root.cmrs)
   {
      if(_root.cmrs[_loc7_]._force == this.tgt_force)
      {
         if(_loc7_ != this.tgt)
         {
            var _loc6_ = _parent[_loc7_]._sX - this._sX;
            var _loc5_ = _parent[_loc7_]._sY - this._sY;
            var _loc4_ = _parent[_loc7_]._sZ - this._sZ;
            this.dst = dist_3d(0,0,0,_loc6_,_loc5_,_loc4_);
            if(dst < this.hq + 0.5 * _siz)
            {
               if(this._parent[_loc7_]._type == "ff")
               {
                  this._parent[_loc7_].onhit(this.dam,this.mst);
                  if(this._parent[_loc7_] != undefined)
                  {
                     _parent[_loc7_].v._sX = 2 * this.vX;
                     _parent[_loc7_].v._sY = 2 * this.vY;
                     _parent[_loc7_].v._sZ = 2 * this.vZ;
                     if(t % 3 == 0)
                     {
                        this._parent.attachMovie("bo_2",this._name + "bo" + this.tgt + t,this._parent.getNextHighestDepth(),{_sX:0.8 * (this._sX + _parent[_loc7_]._sX),_sY:0.8 * (this._sY + _parent[_loc7_]._sY),_sZ:0.8 * (this._sZ + _parent[_loc7_]._sZ),mst:this.tgt});
                     }
                  }
               }
               else if(this._parent[_loc7_]._type == "dd")
               {
                  this.vZ = 0;
                  this.vX = 0;
                  this.vY = 0;
                  this.t = 0;
                  this.onEnterFrame = function()
                  {
                     this.overme();
                  };
                  _parent[_loc7_].vX = 0;
                  _parent[_loc7_].vY = 0;
                  _parent[_loc7_].vZ = 0;
                  _parent[_loc7_].t = 0;
                  _parent[_loc7_].onEnterFrame = function()
                  {
                     this.overme();
                  };
               }
               else
               {
                  if(this._parent[_loc7_].hitbo())
                  {
                     this._parent[_loc7_].onhit(this.dam,this.mst);
                     this._parent.attachMovie("bo_1",this._name + "bo" + _loc7_ + t,this._parent.getNextHighestDepth(),{_sX:0.8 * (this._sX + _parent[_loc7_]._sX),_sY:0.8 * (this._sY + _parent[_loc7_]._sY),_sZ:0.8 * (this._sZ + _parent[_loc7_]._sZ),mst:_loc7_});
                  }
                  else
                  {
                     this._parent[_loc7_].onhit(this.dam,this.mst);
                     this._parent.attachMovie("bo_2",this._name + "bo" + _loc7_ + t,this._parent.getNextHighestDepth(),{_sX:0.8 * (this._sX + _parent[_loc7_]._sX),_sY:0.8 * (this._sY + _parent[_loc7_]._sY),_sZ:0.8 * (this._sZ + _parent[_loc7_]._sZ),mst:_loc7_});
                  }
                  if(this._parent[_loc7_]._size != "L" || this._parent[this.tgt].hypt == 0)
                  {
                     _parent[_loc7_].vX = 2 * this.vX;
                     _parent[_loc7_].vY = 2 * this.vY;
                     _parent[_loc7_].vZ = 2 * this.vZ;
                  }
               }
            }
         }
      }
   }
}
var _type = "dd";
var mst;
var tgt;
var tgt_force = this._parent[this.tgt]._force;
if(this.tgt_force == undefined)
{
   this.tgt_force = 0;
}
var dam;
var speed;
var maxforce;
var maxt = maxforce / speed;
var sz = this._siz;
var fx;
var fy;
var fz;
var mdx = null;
var mdy = null;
var mdz = null;
var vX;
var vY;
var vZ;
this._slo = 1;
var t = 0;
var hq = 10;
if(this._parent[tgt]._size == "L")
{
   this.hq = 15;
}
else if(this._parent[tgt]._size == "S")
{
   this.hq = 5;
}
snd("gpxn2");
this._siz = this.sz * 0.02;
var cancle = false;
onEnterFrame = function()
{
   holdme();
};
