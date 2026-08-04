function mz()
{
   var _loc4_ = _parent[tgt]._sX - this._sX;
   var _loc3_ = _parent[tgt]._sY - this._sY;
   var _loc5_ = _parent[tgt]._sZ - this._sZ;
   dst = dist_3d(0,0,0,_loc4_,_loc3_,_loc5_);
   if(dst < 500)
   {
      if(this._parent[this.tgt].AI != undefined)
      {
         this._parent[this.tgt].AI.onzd(this._name);
      }
   }
   else
   {
      var _loc6_ = (dst + 100) / speed;
      _loc4_ += _parent[tgt].v._sX * _loc6_;
      _loc3_ += _parent[tgt].v._sY * _loc6_;
      _loc5_ += _parent[tgt].v._sZ * _loc6_;
      var _loc9_ = Math.atan2(_loc4_,_loc3_);
      var _loc10_ = Math.atan2(_loc5_,distance(0,0,_loc4_,_loc3_));
      this._sH = _loc10_;
      this._sW = _loc9_;
      var _loc8_ = speed * Math.sin(this._sH);
      var _loc7_ = speed * Math.cos(this._sH);
      var _loc12_ = _loc7_ * Math.sin(this._sW);
      var _loc11_ = _loc7_ * Math.cos(this._sW);
      this.v._sX = 0.8 * this.v._sX + 0.2 * _loc12_;
      this.v._sY = 0.8 * this.v._sY + 0.2 * _loc11_;
      this.v._sZ = 0.8 * this.v._sZ + 0.2 * _loc8_;
   }
}
var mst;
var tgt;
var dam;
var basex = 0;
var basey = 0;
var basez = 0;
var speed;
var maxforce;
var maxt = maxforce / speed;
var t = 0;
var perfectlock = false;
var hq = 10;
if(this._parent[tgt]._size == "L")
{
   this.hq = 15;
}
else if(this._parent[tgt]._size == "S")
{
   this.hq = 5;
}
if(this._parent[this.mst].v != undefined)
{
   this.basex = this._parent[this.mst].v._sX;
   this.basey = this._parent[this.mst].v._sY;
   this.basez = this._parent[this.mst].v._sZ;
}
this.basez += speed * Math.sin(this._sH);
var ss = speed * Math.cos(this._sH);
this.basex += ss * Math.sin(this._sW);
this.basey += ss * Math.cos(this._sW);
this._parent.attachMovie("bo_9",this._name + "bofs",this._parent.getNextHighestDepth(),{_sX:this._sX,_sY:this._sY,_sZ:this._sZ,mst:this.mst});
if(this._parent[mst].scmrfg > 25)
{
   this.perfectlock = this._parent[mst].perfectlock;
}
onEnterFrame = function()
{
   if(!stopAll)
   {
      if(t >= maxt)
      {
         this.removeMovieClip();
      }
      else
      {
         t++;
         if(this.perfectlock && _parent[mst] != undefined && this._parent[mst].scmrfg > 25)
         {
            this._parent[mst].scmrfg = 40;
            this._sW = Math.atan2(this._parent[this.mst].tgtdc._sX,this._parent[this.mst].tgtdc._sY);
            this._sH = Math.atan2(this._parent[this.mst].tgtdc._sZ,_global.distance(0,0,this._parent[this.mst].tgtdc._sX,this._parent[this.mst].tgtdc._sY));
            this.basez = this._parent[this.mst]._sZ + speed * t * Math.sin(this._sH) - this._sZ;
            var _loc5_ = speed * t * Math.cos(this._sH);
            this.basex = this._parent[this.mst]._sX + _loc5_ * Math.sin(this._sW) - this._sX;
            this.basey = this._parent[this.mst]._sY + _loc5_ * Math.cos(this._sW) - this._sY;
         }
         else
         {
            this.perfectlock = false;
         }
         this._sZ += this.basez;
         this._sX += this.basex;
         this._sY += this.basey;
      }
      var _loc4_ = new Object();
      _loc4_ = hitobj(this._parent[tgt],this.hq);
      if(_loc4_ != null && _loc4_ != undefined)
      {
         if(this._parent[tgt]._type == "ff")
         {
            this._parent[tgt].onhit(this.dam,this.mst);
            if(this._parent[tgt] != undefined)
            {
               if(this._sizz >= 300)
               {
                  this._parent.attachMovie("bo_5",this._name + "bo" + this.tgt + t,this._parent.getNextHighestDepth(),{_sX:_loc4_._sX,_sY:_loc4_._sY,_sZ:_loc4_._sZ,mst:this.tgt});
               }
               else if(this._sizz >= 100)
               {
                  this._parent.attachMovie("bo_1",this._name + "bo" + this.tgt + t,this._parent.getNextHighestDepth(),{_sX:_loc4_._sX,_sY:_loc4_._sY,_sZ:_loc4_._sZ,mst:this.tgt});
               }
               else
               {
                  this._parent.attachMovie("bo_0",this._name + "bo" + this.tgt + t,this._parent.getNextHighestDepth(),{_sX:_loc4_._sX,_sY:_loc4_._sY,_sZ:_loc4_._sZ,mst:this.tgt});
               }
            }
         }
         else if(this._parent[tgt].bofg == 0)
         {
            this._parent[tgt].onhit(this.dam,this.mst);
            this._parent[tgt].hitbo();
            if(this._sizz >= 300)
            {
               this._parent.attachMovie("bo_5",this._name + "bo" + this.tgt + t,this._parent.getNextHighestDepth(),{_sX:_loc4_._sX,_sY:_loc4_._sY,_sZ:_loc4_._sZ,mst:this.tgt});
            }
            else if(this._sizz >= 100)
            {
               this._parent.attachMovie("bo_1",this._name + "bo" + this.tgt + t,this._parent.getNextHighestDepth(),{_sX:_loc4_._sX,_sY:_loc4_._sY,_sZ:_loc4_._sZ,mst:this.tgt});
            }
            else
            {
               this._parent.attachMovie("bo_0",this._name + "bo" + this.tgt + t,this._parent.getNextHighestDepth(),{_sX:_loc4_._sX,_sY:_loc4_._sY,_sZ:_loc4_._sZ,mst:this.tgt});
            }
         }
         else
         {
            this._parent[tgt].onhit(this.dam,this.mst);
            if(this._sizz >= 300)
            {
               this._parent.attachMovie("bo_5",this._name + "bo" + this.tgt + t,this._parent.getNextHighestDepth(),{_sX:_loc4_._sX,_sY:_loc4_._sY,_sZ:_loc4_._sZ,mst:this.tgt});
            }
            else if(this._sizz >= 100)
            {
               this._parent.attachMovie("bo_1",this._name + "bo" + this.tgt + t,this._parent.getNextHighestDepth(),{_sX:_loc4_._sX,_sY:_loc4_._sY,_sZ:_loc4_._sZ,mst:this.tgt});
            }
            else
            {
               this._parent.attachMovie("bo_0",this._name + "bo" + this.tgt + t,this._parent.getNextHighestDepth(),{_sX:_loc4_._sX,_sY:_loc4_._sY,_sZ:_loc4_._sZ,mst:this.tgt});
            }
         }
         if(t > 10)
         {
            onEnterFrame = function()
            {
               this.removeMovieClip();
            };
         }
      }
   }
};
var hih = new Object();
hih = hitobj(this._parent[tgt],this.hq);
if(hih != null && hih != undefined)
{
   if(this._parent[tgt]._type == "ff")
   {
      this._parent[tgt].onhit(this.dam,this.mst);
      if(this._parent[tgt] != undefined)
      {
         if(this._sizz >= 300)
         {
            this._parent.attachMovie("bo_5",this._name + "bo" + this.tgt + t,this._parent.getNextHighestDepth(),{_sX:hih._sX,_sY:hih._sY,_sZ:hih._sZ,mst:this.tgt});
         }
         else if(this._sizz >= 100)
         {
            this._parent.attachMovie("bo_1",this._name + "bo" + this.tgt + t,this._parent.getNextHighestDepth(),{_sX:hih._sX,_sY:hih._sY,_sZ:hih._sZ,mst:this.tgt});
         }
         else
         {
            this._parent.attachMovie("bo_0",this._name + "bo" + this.tgt + t,this._parent.getNextHighestDepth(),{_sX:hih._sX,_sY:hih._sY,_sZ:hih._sZ,mst:this.tgt});
         }
      }
   }
   else if(this._parent[tgt].bofg == 0)
   {
      this._parent[tgt].onhit(this.dam,this.mst);
      this._parent[tgt].hitbo();
      if(this._sizz >= 300)
      {
         this._parent.attachMovie("bo_5",this._name + "bo" + this.tgt + t,this._parent.getNextHighestDepth(),{_sX:hih._sX,_sY:hih._sY,_sZ:hih._sZ,mst:this.tgt});
      }
      else if(this._sizz >= 100)
      {
         this._parent.attachMovie("bo_1",this._name + "bo" + this.tgt + t,this._parent.getNextHighestDepth(),{_sX:hih._sX,_sY:hih._sY,_sZ:hih._sZ,mst:this.tgt});
      }
      else
      {
         this._parent.attachMovie("bo_0",this._name + "bo" + this.tgt + t,this._parent.getNextHighestDepth(),{_sX:hih._sX,_sY:hih._sY,_sZ:hih._sZ,mst:this.tgt});
      }
   }
   else
   {
      this._parent[tgt].onhit(this.dam,this.mst);
      if(this._sizz >= 300)
      {
         this._parent.attachMovie("bo_5",this._name + "bo" + this.tgt + t,this._parent.getNextHighestDepth(),{_sX:hih._sX,_sY:hih._sY,_sZ:hih._sZ,mst:this.tgt});
      }
      else if(this._sizz >= 100)
      {
         this._parent.attachMovie("bo_1",this._name + "bo" + this.tgt + t,this._parent.getNextHighestDepth(),{_sX:hih._sX,_sY:hih._sY,_sZ:hih._sZ,mst:this.tgt});
      }
      else
      {
         this._parent.attachMovie("bo_0",this._name + "bo" + this.tgt + t,this._parent.getNextHighestDepth(),{_sX:hih._sX,_sY:hih._sY,_sZ:hih._sZ,mst:this.tgt});
      }
   }
}
