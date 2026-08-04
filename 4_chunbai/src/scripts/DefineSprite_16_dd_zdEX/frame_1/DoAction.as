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
var hq = 30;
if(this._parent[tgt]._size == "L")
{
   this.hq = 40;
}
else if(this._parent[tgt]._size == "S")
{
   this.hq = 25;
}
var rx = random(101) - 50;
var ry = random(101) - 50;
var rz = random(101) - 50;
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
      if(_parent[tgt] != undefined)
      {
         var _loc7_ = _parent[tgt]._sX - this._sX;
         var _loc6_ = _parent[tgt]._sY - this._sY;
         var _loc5_ = _parent[tgt]._sZ - this._sZ;
         this.dst = dist_3d(0,0,0,_loc7_,_loc6_,_loc5_);
         if(dst < 300)
         {
            if(this._parent[this.tgt].AI != undefined)
            {
               this._parent[this.tgt].AI.onfd(this._name,dst);
            }
         }
      }
      if(this._slo > -100)
      {
         this._slo -= 50;
      }
      if(dst < this.hq)
      {
         if(this._parent[tgt]._type == "ff")
         {
            this._parent[tgt].onhit(this.dam,this.mst);
         }
         else
         {
            var _loc4_ = new Object();
            if(this._parent[tgt].shdon >= 0)
            {
               var _loc10_ = this._sX - this._parent[tgt]._sX;
               var _loc9_ = this._sY - this._parent[tgt]._sY;
               var _loc8_ = this._sZ - this._parent[tgt]._sZ;
               _loc4_ = _global.sToc(_loc10_,_loc9_,_loc8_,this._parent[tgt].objz._sW,this._parent[tgt].objz._sH,this._parent[tgt].objz._sR);
            }
            else
            {
               _loc4_.y = 0;
            }
            if(_loc4_.y > 5 && this._parent[tgt].doSHD(this.dam))
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
         this._parent.attachMovie("bo_5",this._name + "bo",this._parent.getNextHighestDepth(),{_sX:this._sX,_sY:this._sY,_sZ:this._sZ,mst:this.tgt});
         this.removeMovieClip();
      }
      else if(t > htime)
      {
         subhit();
         this.removeMovieClip();
      }
   }
};
