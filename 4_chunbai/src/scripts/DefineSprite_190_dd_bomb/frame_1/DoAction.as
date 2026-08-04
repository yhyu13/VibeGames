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
            if(_loc4_ < 500 + this.hq)
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
                  if(this._parent[_loc8_].fclss == "boom" && this._parent[_loc8_].fsiz > 2)
                  {
                     this._parent[_loc8_].zdEXF();
                  }
                  else
                  {
                     this._parent[_loc8_].onhit(this.dam,this.mst);
                  }
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
var maxt = 60;
var dst;
var t = 0;
var at = 10;
var hq = 30;
var fv = 100;
onEnterFrame = function()
{
   if(!stopAll)
   {
      t++;
      hq += 20;
      if(hq > 400)
      {
         hq = 400;
      }
      this.b_r._xscale = 10 * this.hq;
      this.b_r._yscale = 10 * this.hq;
      this.b_x._xscale = 5 * this.hq;
      this.b_x._yscale = 5 * this.hq;
      if(t % 2 == 1)
      {
         this.b_x._alpha = this.fv;
         this.b_r._alpha = this.fv;
      }
      else
      {
         this.b_x._alpha = 0.5 * this.fv;
         this.b_r._alpha = 0.5 * this.fv;
      }
      if(t > maxt)
      {
         this.fv -= 10;
      }
      else
      {
         if(_parent[tgt] != undefined)
         {
            var _loc5_ = _parent[tgt]._sX - this._sX;
            var _loc4_ = _parent[tgt]._sY - this._sY;
            var _loc3_ = _parent[tgt]._sZ - this._sZ;
            this.dst = dist_3d(0,0,0,_loc5_,_loc4_,_loc3_);
            if(this.dst < 500 + this.hq)
            {
               if(this._parent[this.tgt].AI != undefined)
               {
                  this._parent[this.tgt].AI.onhd(this._name,this.dst);
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
                  this._parent[tgt].hitbo();
                  this._parent[tgt].onhit(this.dam,this.mst);
                  this._parent.attachMovie("bo_2",this._name + "bo" + this.tgt + t,this._parent.getNextHighestDepth(),{_sX:this._parent[tgt]._sX + random(11) - 5,_sY:this._parent[tgt]._sY + random(11) - 5,_sZ:this._parent[tgt]._sZ + random(11) - 5,mst:this.tgt});
               }
            }
         }
         subhit();
      }
      if(t > maxt + 10)
      {
         this.removeMovieClip();
      }
   }
};
