function doit()
{
   this.axt = 0;
   if(_parent[mst] != undefined)
   {
      if(_parent[tgt] != undefined)
      {
         var _loc15_ = _parent[tgt]._sX - this._parent[mst]._sX;
         var _loc14_ = _parent[tgt]._sY - this._parent[mst]._sY;
         var _loc12_ = _parent[tgt]._sZ - this._parent[mst]._sZ;
         var _loc13_ = dist_3d(0,0,0,_loc15_,_loc14_,_loc12_);
         this.dstS = _loc13_;
      }
      this._parent[mst].AMBAC = 5;
      var _loc9_ = new Object();
      _loc9_ = moveobj(this._parent[mst].objz,this.fx,this.fy + 0.5 * this._siz,this.fz);
      this._sZ = _loc9_.z;
      this._sX = _loc9_.x;
      this._sY = _loc9_.y;
      this._slo = this.maxforce;
      this._siz = this.sz;
      this._alpha = 100;
   }
   else
   {
      this.removeMovieClip();
   }
   if(_parent[tgt] != undefined)
   {
      var _loc10_ = 5;
      var _loc18_ = _parent[tgt].v._sX;
      var _loc17_ = _parent[tgt].v._sY;
      var _loc16_ = _parent[tgt].v._sZ;
      mdx = _loc18_ * _loc10_ + _parent[tgt]._sX;
      mdy = _loc17_ * _loc10_ + _parent[tgt]._sY;
      mdz = _loc16_ * _loc10_ + _parent[tgt]._sZ;
   }
   else
   {
      _loc9_ = new Object();
      _loc9_ = _global.cTos(0,maxforce,0,this._parent[mst]._sW,this._parent[mst]._sH,this._parent[mst]._sR);
      mdx = _loc9_.x + this._parent[mst]._sX;
      mdy = _loc9_.y + this._parent[mst]._sY;
      mdz = _loc9_.z + this._parent[mst]._sZ;
   }
   var _loc11_ = false;
   var _loc8_ = mdx - this._sX;
   var _loc7_ = mdy - this._sY;
   var _loc6_ = mdz - this._sZ;
   var _loc4_ = new Object();
   _loc4_ = _global.sToc(_loc8_,_loc7_,_loc6_,this._parent[mst]._sW,this._parent[mst]._sH,this._parent[mst]._sR);
   if(_loc4_.y > 0 && _loc4_.x < 0.5 * _loc4_.y && - _loc4_.x < 0.5 * _loc4_.y && _loc4_.z < 0.375 * _loc4_.y && - _loc4_.z < 0.375 * _loc4_.y)
   {
      _loc11_ = true;
   }
   _loc9_ = new Object();
   _loc9_ = _global.cTos(0,this._slo,0,this._sW,this._sH,this._sR);
   this.rdx = _loc9_.x;
   this.rdy = _loc9_.y;
   this.rdz = _loc9_.z;
   this._parent.attachMovie("bo_jy",this._name + "_tx",this._parent.getNextHighestDepth(),{_sX:this._sX,_sY:this._sY,_sZ:this._sZ,_sW:0,_sH:0,_sR:0});
   this._parent[this._name + "_tx"].mst = this._name;
   this._parent[this._name + "_tx"].tgt = this.tgt;
   snd("beam4");
   if(_loc11_)
   {
      var _loc5_ = new Object();
      _loc5_ = _global.sToc(_loc8_,_loc7_,_loc6_,this._sW,this._sH,this._sR);
      this.wwill = Math.atan2(_loc5_.x,_loc5_.y);
      this.hwill = Math.atan2(_loc5_.z,_global.distance(0,0,_loc5_.x,_loc5_.y));
      this._alpha = 100;
      t = 0;
      this._siz = this.sz;
      onEnterFrame = function()
      {
         fsme();
      };
   }
   else
   {
      _loc9_ = new Object();
      _loc9_ = _global.cTos(0,maxforce,0,this._parent[mst]._sW,this._parent[mst]._sH,this._parent[mst]._sR);
      mdx = _loc9_.x + this._parent[mst]._sX;
      mdy = _loc9_.y + this._parent[mst]._sY;
      mdz = _loc9_.z + this._parent[mst]._sZ;
      _loc8_ = mdx - this._sX;
      _loc7_ = mdy - this._sY;
      _loc6_ = mdz - this._sZ;
      _loc5_ = new Object();
      _loc5_ = _global.sToc(_loc8_,_loc7_,_loc6_,this._sW,this._sH,this._sR);
      this.wwill = Math.atan2(_loc5_.x,_loc5_.y);
      this.hwill = Math.atan2(_loc5_.z,_global.distance(0,0,_loc5_.x,_loc5_.y));
      this._alpha = 100;
      t = 0;
      this._siz = this.sz;
      onEnterFrame = function()
      {
         fsme();
      };
   }
}
function holdme()
{
   if(!stopAll)
   {
      t++;
      this._siz += this.sz * 0.05;
      if(this._siz > this.sz)
      {
         this._siz = this.sz;
      }
      if(t % 2 == 1)
      {
         this._alpha = 100;
         this._sizz = 0.1;
      }
      else
      {
         this._alpha = 50;
         this._sizz = 0.1;
      }
      if(_parent[mst] != undefined)
      {
         var _loc4_ = new Object();
         _loc4_ = rotateobj(this._parent[mst].objz,this.fw,this.fh,this.fr);
         this._sW = _loc4_.w;
         this._sH = _loc4_.h;
         var _loc3_ = new Object();
         _loc3_ = moveobj(this._parent[mst].objz,this.fx,this.fy + 0.5 * this._siz,this.fz);
         this._sZ = _loc3_.z;
         this._sX = _loc3_.x;
         this._sY = _loc3_.y;
         this._slo += 0.2 * this.speed;
         if(this._slo > 0.2 * this.maxforce)
         {
            this._slo = 0.2 * this.maxforce;
         }
      }
      else
      {
         this.removeMovieClip();
      }
      if(t == 2)
      {
         tt++;
         doit();
      }
   }
}
function fsme()
{
   if(!stopAll)
   {
      t++;
      this._sizz = 0.1;
      if(_parent[mst] != undefined)
      {
         this._parent[mst].AMBAC = 5;
         var _loc10_ = new Object();
         _loc10_ = moveobj(this._parent[mst].objz,this.fx,this.fy + 0.5 * this._siz,this.fz);
         this._sZ = _loc10_.z;
         this._sX = _loc10_.x;
         this._sY = _loc10_.y;
         if(t <= 5)
         {
            if(_parent[tgt] != undefined)
            {
               if(t <= 2)
               {
                  var _loc15_ = _parent[tgt].v._sX;
                  var _loc14_ = _parent[tgt].v._sY;
                  var _loc13_ = _parent[tgt].v._sZ;
                  mdx = _loc15_ * (5 - t) + _parent[tgt]._sX;
                  mdy = _loc14_ * (5 - t) + _parent[tgt]._sY;
                  mdz = _loc13_ * (5 - t) + _parent[tgt]._sZ;
               }
               var _loc9_ = mdx - this._sX;
               var _loc8_ = mdy - this._sY;
               var _loc7_ = mdz - this._sZ;
               var _loc5_ = new Object();
               _loc5_ = _global.sToc(_loc9_,_loc8_,_loc7_,this._parent[mst]._sW,this._parent[mst]._sH,this._parent[mst]._sR);
               if(_loc5_.y > 0 && _loc5_.x < 0.5 * _loc5_.y && - _loc5_.x < 0.5 * _loc5_.y && _loc5_.z < 0.375 * _loc5_.y && - _loc5_.z < 0.375 * _loc5_.y)
               {
                  if(t == 2)
                  {
                     if(this._parent[this.tgt].AI != undefined)
                     {
                        this._parent[this.tgt].AI.ongd(this._name);
                     }
                  }
                  var _loc6_ = new Object();
                  _loc6_ = _global.sToc(_loc9_,_loc8_,_loc7_,this._sW,this._sH,this._sR);
                  this.wwill = Math.atan2(_loc6_.x,_loc6_.y);
                  this.hwill = Math.atan2(_loc6_.z,_global.distance(0,0,_loc6_.x,_loc6_.y));
               }
               else
               {
                  _loc10_ = new Object();
                  _loc10_ = _global.cTos(0,maxforce,0,this._parent[mst]._sW,this._parent[mst]._sH,this._parent[mst]._sR);
                  mdx = _loc10_.x + this._parent[mst]._sX;
                  mdy = _loc10_.y + this._parent[mst]._sY;
                  mdz = _loc10_.z + this._parent[mst]._sZ;
                  _loc9_ = mdx - this._sX;
                  _loc8_ = mdy - this._sY;
                  _loc7_ = mdz - this._sZ;
                  _loc6_ = new Object();
                  _loc6_ = _global.sToc(_loc9_,_loc8_,_loc7_,this._sW,this._sH,this._sR);
                  this.wwill = Math.atan2(_loc6_.x,_loc6_.y);
                  this.hwill = Math.atan2(_loc6_.z,_global.distance(0,0,_loc6_.x,_loc6_.y));
               }
            }
            else
            {
               _loc10_ = new Object();
               _loc10_ = _global.cTos(0,maxforce,0,this._parent[mst]._sW,this._parent[mst]._sH,this._parent[mst]._sR);
               mdx = _loc10_.x + this._parent[mst]._sX;
               mdy = _loc10_.y + this._parent[mst]._sY;
               mdz = _loc10_.z + this._parent[mst]._sZ;
               _loc9_ = mdx - this._sX;
               _loc8_ = mdy - this._sY;
               _loc7_ = mdz - this._sZ;
               _loc6_ = new Object();
               _loc6_ = _global.sToc(_loc9_,_loc8_,_loc7_,this._sW,this._sH,this._sR);
               this.wwill = Math.atan2(_loc6_.x,_loc6_.y);
               this.hwill = Math.atan2(_loc6_.z,_global.distance(0,0,_loc6_.x,_loc6_.y));
            }
            var _loc12_ = this.wwill / (6 - t);
            var _loc11_ = this.hwill / (6 - t);
            _global.objrotate(this,_loc12_,_loc11_,0);
         }
         else
         {
            _global.objrotate(this,wwill,hwill,0);
         }
         this._parent[this._name + "_tx"]._alpha = 75;
         this._parent[this._name + "_tx"]._sX = this._sX;
         this._parent[this._name + "_tx"]._sY = this._sY;
         this._parent[this._name + "_tx"]._sZ = this._sZ;
         this._parent[this._name + "_tx"].A_x = 0;
         this._parent[this._name + "_tx"].A_y = 0;
         this._parent[this._name + "_tx"].A_z = 0;
         this._parent[this._name + "_tx"].B_x = this.rdx;
         this._parent[this._name + "_tx"].B_y = this.rdy;
         this._parent[this._name + "_tx"].B_z = this.rdz;
         _loc10_ = new Object();
         _loc10_ = _global.cTos(0,this._slo,0,this._sW,this._sH,this._sR);
         this.rdx = _loc10_.x;
         this.rdy = _loc10_.y;
         this.rdz = _loc10_.z;
         this._parent[this._name + "_tx"].C_x = this.rdx;
         this._parent[this._name + "_tx"].C_y = this.rdy;
         this._parent[this._name + "_tx"].C_z = this.rdz;
      }
      else
      {
         this.removeMovieClip();
      }
      var _loc4_ = hitobj(this._parent[tgt],this.hq + 0.5 * _siz);
      if(_loc4_ != null && _loc4_ != undefined)
      {
         this.hit = this.hit + 1;
         if(this._parent[tgt]._type == "ff")
         {
            this._parent[tgt].onhit(this.dam,this.mst);
            if(this._parent[tgt] != undefined)
            {
               this._parent.attachMovie("bo_2",this._name + "bo" + this.hit + this.tgt + t,this._parent.getNextHighestDepth(),{_sX:0.5 * (_loc4_._sX + _parent[tgt]._sX),_sY:0.5 * (_loc4_._sY + _parent[tgt]._sY),_sZ:0.5 * (_loc4_._sZ + _parent[tgt]._sZ),mst:this.tgt});
            }
         }
         else if(this._parent[tgt].hitbo())
         {
            this._parent[tgt].onhit(this.dam,this.mst);
            this._parent.attachMovie("bo_1",this._name + "bo" + this.hit + this.tgt + t,this._parent.getNextHighestDepth(),{_sX:0.5 * (_loc4_._sX + _parent[tgt]._sX),_sY:0.5 * (_loc4_._sY + _parent[tgt]._sY),_sZ:0.5 * (_loc4_._sZ + _parent[tgt]._sZ),mst:this.tgt});
         }
         else
         {
            this._parent[tgt].onhit(this.dam,this.mst);
            this._parent.attachMovie("bo_2",this._name + "bo" + this.hit + this.tgt + t,this._parent.getNextHighestDepth(),{_sX:0.5 * (_loc4_._sX + _parent[tgt]._sX),_sY:0.5 * (_loc4_._sY + _parent[tgt]._sY),_sZ:0.5 * (_loc4_._sZ + _parent[tgt]._sZ),mst:this.tgt});
         }
      }
      subhit();
      if(t >= maxt)
      {
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
      if(_alpha < 1)
      {
         if(tt > 0)
         {
            this.removeMovieClip();
         }
         else
         {
            this._alpha = 100;
            this._slo = 1;
            this._siz = this.sz * 0.05;
            this.t = 0;
            this.fw = (random(10) - 5) * 0.1 * 3.141592653589793;
            this.fh = (random(10) - 5) * 0.1 * 3.141592653589793;
            this.fr = 0;
            onEnterFrame = function()
            {
               holdme();
            };
         }
      }
      if(_parent[mst] != undefined)
      {
         var _loc4_ = new Object();
         _loc4_ = moveobj(this._parent[mst].objz,this.fx,this.fy + 0.5 * this._siz,this.fz);
         this._sZ = _loc4_.z;
         this._sX = _loc4_.x;
         this._sY = _loc4_.y;
      }
      else
      {
         this.removeMovieClip();
      }
      _alpha = _alpha - 20;
      this._parent[this._name + "_tx"]._sX = this._sX;
      this._parent[this._name + "_tx"]._sY = this._sY;
      this._parent[this._name + "_tx"]._sZ = this._sZ;
      _loc4_ = new Object();
      _loc4_ = _global.cTos(0,this._slo,0,this._sW,this._sH,this._sR);
      this.rdx = _loc4_.x;
      this.rdy = _loc4_.y;
      this.rdz = _loc4_.z;
      this._parent[this._name + "_tx"].C_x = this.rdx;
      this._parent[this._name + "_tx"].C_y = this.rdy;
      this._parent[this._name + "_tx"].C_z = this.rdz;
   }
}
function subhit()
{
   for(var _loc8_ in _root.cmrs)
   {
      if(_root.cmrs[_loc8_]._force == this.tgt_force)
      {
         if(_loc8_ != this.tgt)
         {
            var _loc4_ = hitobj(this._parent[_loc8_],0.5 * _siz + 5);
            if(_loc4_ != null && _loc4_ != undefined)
            {
               this.hit = this.hit + 1;
               if(this._parent[_loc8_]._type == "ff")
               {
                  this._parent[_loc8_].onhit(this.dam,this.mst);
                  if(this._parent[_loc8_] != undefined)
                  {
                     this._parent.attachMovie("bo_2",this._name + "bo" + this.hit + _loc8_ + t,this._parent.getNextHighestDepth(),{_sX:0.5 * (_loc4_._sX + _parent[_loc8_]._sX),_sY:0.5 * (_loc4_._sY + _parent[_loc8_]._sY),_sZ:0.5 * (_loc4_._sZ + _parent[_loc8_]._sZ),mst:this.tgt});
                  }
               }
               else if(this._parent[_loc8_].hitbo())
               {
                  this._parent[_loc8_].onhit(this.dam,this.mst);
                  this._parent.attachMovie("bo_1",this._name + "bo" + this.hit + _loc8_ + t,this._parent.getNextHighestDepth(),{_sX:0.5 * (_loc4_._sX + _parent[_loc8_]._sX),_sY:0.5 * (_loc4_._sY + _parent[_loc8_]._sY),_sZ:0.5 * (_loc4_._sZ + _parent[_loc8_]._sZ),mst:_loc8_});
               }
               else
               {
                  this._parent[_loc8_].onhit(this.dam,this.mst);
                  this._parent.attachMovie("bo_2",this._name + "bo" + this.hit + _loc8_ + t,this._parent.getNextHighestDepth(),{_sX:0.5 * (_loc4_._sX + _parent[_loc8_]._sX),_sY:0.5 * (_loc4_._sY + _parent[_loc8_]._sY),_sZ:0.5 * (_loc4_._sZ + _parent[_loc8_]._sZ),mst:_loc8_});
               }
            }
         }
      }
   }
}
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
var maxt = 10;
var hit = 0;
var tt = 0;
var sz = this._siz;
var br;
var fx;
var fy;
var fz;
var fw;
var fh;
var fr;
var mdx = null;
var mdy = null;
var mdz = null;
var rdx = null;
var rdy = null;
var rdz = null;
this._slo = 1;
var _sR = 0;
var t;
if(t == null)
{
   t = 0;
}
this._siz = this.sz * 0.05;
var dstS = 0;
this.speed = this.maxforce / 30;
var hq = 10;
if(this._parent[tgt]._size == "L")
{
   this.hq = 15;
}
else if(this._parent[tgt]._size == "S")
{
   this.hq = 5;
}
var wwill = 0;
var hwill = 0;
onEnterFrame = function()
{
   holdme();
};
