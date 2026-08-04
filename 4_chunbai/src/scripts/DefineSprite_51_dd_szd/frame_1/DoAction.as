function subhit()
{
   for(var _loc13_ in _root.cmrs)
   {
      if(_root.cmrs[_loc13_]._force == this.tgt_force)
      {
         if(_loc13_ != this.tgt)
         {
            var _loc9_ = _parent[_loc13_]._sX - this._sX;
            var _loc8_ = _parent[_loc13_]._sY - this._sY;
            var _loc6_ = _parent[_loc13_]._sZ - this._sZ;
            var _loc7_ = dist_3d(0,0,0,_loc9_,_loc8_,_loc6_);
            if(_loc7_ < this.hq)
            {
               if(this._parent[_loc13_]._type == "ff")
               {
                  this._parent[_loc13_].onhit(this.dam,this.mst);
               }
               else
               {
                  var _loc5_ = new Object();
                  if(this._parent[_loc13_].shdon >= 0)
                  {
                     var _loc12_ = this._sX - this._parent[_loc13_]._sX;
                     var _loc11_ = this._sY - this._parent[_loc13_]._sY;
                     var _loc10_ = this._sZ - this._parent[_loc13_]._sZ;
                     _loc5_ = _global.sToc(_loc12_,_loc11_,_loc10_,this._parent[_loc13_].objz._sW,this._parent[_loc13_].objz._sH,this._parent[_loc13_].objz._sR);
                  }
                  else
                  {
                     _loc5_.y = 0;
                  }
                  if(_loc5_.y > 5 && this._parent[_loc13_].doSHD(this.dam))
                  {
                     snd("snd_launch3");
                     this._parent[_loc13_].vZ += 0.1 * v._sZ;
                     this._parent[_loc13_].vX += 0.1 * v._sX;
                     this._parent[_loc13_].vY += 0.1 * v._sY;
                  }
                  else
                  {
                     this._parent[_loc13_].vZ += 0.1 * v._sZ;
                     this._parent[_loc13_].vX += 0.1 * v._sX;
                     this._parent[_loc13_].vY += 0.1 * v._sY;
                     this._parent[_loc13_].hitbo();
                     this._parent[_loc13_].onhit(this.dam,this.mst);
                  }
               }
            }
         }
      }
   }
}
function zdEX()
{
   this._parent.attachMovie(this.bot,this._name + "bo",this._parent.getNextHighestDepth(),{_sX:this._sX,_sY:this._sY,_sZ:this._sZ,mst:this.tgt});
   var _loc2_ = 0;
   while(_loc2_ < 10)
   {
      this._parent.attachMovie("dd_zdEX",this._name + "EX_" + _loc2_,this._parent.getNextHighestDepth(),{_sX:this._sX,_sY:this._sY,_sZ:this._sZ,_sW:this._sW + (random(10) - 5) * 0.02 * 3.141592653589793,_sH:this._sH + (random(10) - 5) * 0.02 * 3.141592653589793,_slo:1,_siz:1,_sizz:0.01,dam:this.dam,htime:5 + random(15)});
      this._parent[this._name + "EX_" + _loc2_].mst = this.mst;
      this._parent[this._name + "EX_" + _loc2_].tgt = this.tgt;
      this._parent[this._name + "EX_" + _loc2_].speed = 50;
      this._parent[this._name + "EX_" + _loc2_].maxforce = 2000;
      _loc2_ = _loc2_ + 1;
   }
   this.removeMovieClip();
}
function zdEXF()
{
   this._parent.attachMovie("dd_bomb",this._name + "EX_F",this._parent.getNextHighestDepth(),{_sX:this._sX,_sY:this._sY,_sZ:this._sZ,dam:this.dam});
   this._parent[this._name + "EX_F"].mst = this.mst;
   this._parent[this._name + "EX_F"].tgt = this.tgt;
   this.removeMovieClip();
}
var mst;
var tgt;
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
var fsiz;
var hq = 30;
if(this._parent[tgt]._size == "L")
{
   this.hq = 40;
}
else if(this._parent[tgt]._size == "S")
{
   this.hq = 25;
}
var bot = "bo_5";
var fsiz;
if(this.fsiz > 1)
{
   this.bot = "bo_8";
   this.hq += 50;
   this.rgs = 80;
}
if(this._parent[this.mst].v != undefined)
{
   this.v._sX = this._parent[this.mst].v._sX;
   this.v._sY = this._parent[this.mst].v._sY;
   this.v._sZ = this._parent[this.mst].v._sZ;
}
var rx;
var ry;
var rz;
this.v._sZ += speed * Math.sin(this._sH);
var ss = speed * Math.cos(this._sH);
this.v._sX += ss * Math.sin(this._sW);
this.v._sY += ss * Math.cos(this._sW);
if(htime == null || htime > maxt)
{
   htime = maxt + random(10);
}
else
{
   htime + random(5);
}
onEnterFrame = function()
{
   if(!stopAll)
   {
      t++;
      this._sZ += this.v._sZ;
      this._sX += this.v._sX;
      this._sY += this.v._sY;
      _parent.attachMovie("wjline3",_name + "wj" + t,_parent.getNextHighestDepth(),{_sX:this._sX,_sY:this._sY,_sZ:this._sZ,_sX2:this._sX - v._sX,_sY2:this._sY - v._sY,_sZ2:this._sZ - v._sZ,t:6,_siz:2,_sizz:1});
      if(_parent[tgt] != undefined)
      {
         var _loc7_ = _parent[tgt]._sX - this._sX;
         var _loc6_ = _parent[tgt]._sY - this._sY;
         var _loc5_ = _parent[tgt]._sZ - this._sZ;
         this.dst = dist_3d(0,0,0,_loc7_,_loc6_,_loc5_);
         if(dst < 200)
         {
            if(this._parent[this.tgt].AI != undefined)
            {
               this._parent[this.tgt].AI.onzd(this._name);
            }
         }
         var _loc8_ = (dst + speed) / speed;
         _loc7_ += _parent[tgt].v._sX * _loc8_ + rx;
         _loc6_ += _parent[tgt].v._sY * _loc8_ + ry;
         _loc5_ += _parent[tgt].v._sZ * _loc8_ + rz;
         var _loc13_ = dist_3d(0,0,0,_loc7_,_loc6_,_loc5_);
         var _loc4_ = speed / _loc13_;
         var _loc10_ = _loc4_ * _loc5_ - v._sZ;
         var _loc12_ = _loc4_ * _loc7_ - v._sX;
         var _loc11_ = _loc4_ * _loc6_ - v._sY;
         if(this._parent[this.mst].htime != null || dist_3d(0,0,0,_loc12_,_loc11_,_loc10_) < speed * 0.5)
         {
            _loc4_ = 1 / (t + 5);
            v._sZ += _loc10_ * _loc4_;
            v._sX += _loc12_ * _loc4_;
            v._sY += _loc11_ * _loc4_;
            this._sW = Math.atan2(v._sX,v._sY);
            this._sH = Math.atan2(v._sZ,distance(0,0,v._sX,v._sY));
         }
      }
      if(dst < this.hq)
      {
         if(this._parent[tgt]._type == "ff")
         {
            this._parent[tgt].onhit(this.dam,this.mst);
         }
         else
         {
            var _loc9_ = new Object();
            if(this._parent[tgt].shdon >= 0)
            {
               var _loc16_ = this._sX - this._parent[tgt]._sX;
               var _loc15_ = this._sY - this._parent[tgt]._sY;
               var _loc14_ = this._sZ - this._parent[tgt]._sZ;
               _loc9_ = _global.sToc(_loc16_,_loc15_,_loc14_,this._parent[tgt].objz._sW,this._parent[tgt].objz._sH,this._parent[tgt].objz._sR);
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
               this._parent[tgt].vZ += 0.1 * v._sZ;
               this._parent[tgt].vX += 0.1 * v._sX;
               this._parent[tgt].vY += 0.1 * v._sY;
               this._parent[tgt].hitbo();
               this._parent[tgt].onhit(this.dam,this.mst);
            }
         }
         subhit();
      }
      else if(t > htime)
      {
         subhit();
         zdEX();
      }
      if(dst < 200)
      {
         zdEX();
      }
   }
};
