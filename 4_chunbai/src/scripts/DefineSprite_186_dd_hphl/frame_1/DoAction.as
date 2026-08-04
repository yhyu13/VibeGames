var mst;
var tgt;
var hftgt = mst;
var wpname;
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
var GDdst = maxforce;
var t = 0;
var at = 10;
var hq = 30;
var mz = false;
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
if(htime == null || htime > maxt)
{
   htime = maxt + random(10);
}
else
{
   htime + random(5);
}
this._parent.attachMovie("tx_hl",this._name + "bofs",this._parent.getNextHighestDepth(),{_sX:this._sX,_sY:this._sY,_sZ:this._sZ,mst:this.mst});
onEnterFrame = function()
{
   if(!stopAll)
   {
      this.rt._rotation += 10;
      t++;
      this._sZ += this.v._sZ;
      this._sX += this.v._sX;
      this._sY += this.v._sY;
      if(this.tgt == this.hftgt && !mz)
      {
         this.removeMovieClip();
      }
      if(t > at)
      {
         if(_parent[tgt] != undefined)
         {
            var _loc15_ = _parent[tgt]._sX - this._sX;
            var _loc14_ = _parent[tgt]._sY - this._sY;
            var _loc13_ = _parent[tgt]._sZ - this._sZ;
            this.dst = dist_3d(0,0,0,_loc15_,_loc14_,_loc13_);
            var _loc12_ = new Object();
            _loc12_ = _global.sToc(_loc15_,_loc14_,_loc13_,this._sW,this._sH,this._sR);
            if(_loc12_.y > 0 || this.tgt == this.hftgt)
            {
               if(this.dst == 0)
               {
                  this.dst = 1;
               }
               if(this.dst < this.GDdst)
               {
                  this.GDdst = this.dst;
               }
               this.GDdst -= this.speed;
               var _loc10_ = 1 - this.GDdst / this.dst;
               this.v._sX = _loc10_ * (_parent[this.tgt]._sX - this._sX);
               this.v._sY = _loc10_ * (_parent[this.tgt]._sY - this._sY);
               this.v._sZ = _loc10_ * (_parent[this.tgt]._sZ - this._sZ);
            }
            else
            {
               at = t + 10;
               this.tgt = this.hftgt;
               _loc15_ = _parent[tgt]._sX - this._sX;
               _loc14_ = _parent[tgt]._sY - this._sY;
               _loc13_ = _parent[tgt]._sZ - this._sZ;
               this.GDdst = dist_3d(0,0,0,_loc15_,_loc14_,_loc13_);
            }
            if(dst < 200 && this.tgt != this.hftgt)
            {
               if(this._parent[this.tgt].AI != undefined)
               {
                  this._parent[this.tgt].AI.ongd(this._name);
               }
            }
         }
         else if(_parent[this.hftgt] != undefined)
         {
            at = t + 10;
            this.tgt = this.hftgt;
            _loc15_ = _parent[tgt]._sX - this._sX;
            _loc14_ = _parent[tgt]._sY - this._sY;
            _loc13_ = _parent[tgt]._sZ - this._sZ;
            this.GDdst = dist_3d(0,0,0,_loc15_,_loc14_,_loc13_);
            this.dst = this.GDdst;
         }
         else
         {
            this.removeMovieClip();
         }
      }
      else if(_parent[tgt] != undefined)
      {
         _loc15_ = _parent[tgt]._sX - this._sX;
         _loc14_ = _parent[tgt]._sY - this._sY;
         _loc13_ = _parent[tgt]._sZ - this._sZ;
         this.dst = dist_3d(0,0,0,_loc15_,_loc14_,_loc13_);
      }
      else if(_parent[this.hftgt] != undefined)
      {
         at = t + 10;
         this.tgt = this.hftgt;
         _loc15_ = _parent[tgt]._sX - this._sX;
         _loc14_ = _parent[tgt]._sY - this._sY;
         _loc13_ = _parent[tgt]._sZ - this._sZ;
         this.GDdst = dist_3d(0,0,0,_loc15_,_loc14_,_loc13_);
         this.dst = this.GDdst;
      }
      else
      {
         this.removeMovieClip();
      }
      if(dst < this.hq && t > at)
      {
         if(this.tgt != this.hftgt)
         {
            if(this._parent[tgt]._type == "ff")
            {
               this._parent[tgt].onhit(this.dam,this.mst);
               this._parent.attachMovie("bo_7",this._name + "bo",this._parent.getNextHighestDepth(),{_sX:0.5 * (this._sX + this._parent[tgt]._sX),_sY:0.5 * (this._sY + this._parent[tgt]._sY),_sZ:0.5 * (this._sZ + this._parent[tgt]._sZ),mst:this.tgt});
            }
            else
            {
               var _loc11_ = new Object();
               if(this._parent[tgt].shdon >= 0)
               {
                  var _loc18_ = this._sX - this._parent[tgt]._sX;
                  var _loc17_ = this._sY - this._parent[tgt]._sY;
                  var _loc16_ = this._sZ - this._parent[tgt]._sZ;
                  _loc11_ = _global.sToc(_loc18_,_loc17_,_loc16_,this._parent[tgt].objz._sW,this._parent[tgt].objz._sH,this._parent[tgt].objz._sR);
               }
               else
               {
                  _loc11_.y = 0;
               }
               if(_loc11_.y > 5 && this._parent[tgt].doSHD(this.dam))
               {
                  snd("snd_launch3");
                  this._parent.attachMovie("bo_2",this._name + "bo",this._parent.getNextHighestDepth(),{_sX:0.5 * (this._sX + this._parent[tgt]._sX),_sY:0.5 * (this._sY + this._parent[tgt]._sY),_sZ:0.5 * (this._sZ + this._parent[tgt]._sZ),mst:this.tgt});
               }
               else
               {
                  this._parent[tgt].vZ += 0.1 * v._sZ;
                  this._parent[tgt].vX += 0.1 * v._sX;
                  this._parent[tgt].vY += 0.1 * v._sY;
                  this._parent[tgt].hitbo();
                  this._parent[tgt].onhit(this.dam,this.mst);
                  this._parent.attachMovie("bo_7",this._name + "bo",this._parent.getNextHighestDepth(),{_sX:0.5 * (this._sX + this._parent[tgt]._sX),_sY:0.5 * (this._sY + this._parent[tgt]._sY),_sZ:0.5 * (this._sZ + this._parent[tgt]._sZ),mst:this.tgt});
               }
               mz = true;
               var _loc8_ = 0;
               for(var _loc9_ in _global.UnitList)
               {
                  if(_global.UnitList[_loc9_]._force == _parent[mst]._force)
                  {
                     var _loc4_ = _global.UnitList[_loc9_]._sX - this._sX;
                     var _loc7_ = _global.UnitList[_loc9_]._sY - this._sY;
                     var _loc6_ = _global.UnitList[_loc9_]._sZ - this._sZ;
                     var _loc5_ = dist_3d(0,0,0,_loc4_,_loc7_,_loc6_);
                     if(_loc5_ < 4000)
                     {
                        if(_global.UnitList[_loc9_].maxHP - _global.UnitList[_loc9_]._HP > _loc8_)
                        {
                           _loc8_ = global.UnitList[_loc9_].maxHP - _global.UnitList[_loc9_]._HP;
                           this.hftgt = _loc9_;
                        }
                     }
                  }
               }
            }
            at = t + 10;
            this.tgt = this.hftgt;
            _loc15_ = _parent[tgt]._sX - this._sX;
            _loc14_ = _parent[tgt]._sY - this._sY;
            _loc13_ = _parent[tgt]._sZ - this._sZ;
            this.GDdst = dist_3d(0,0,0,_loc15_,_loc14_,_loc13_);
         }
         else
         {
            snd("snd_hphf");
            this._parent[this.hftgt]._HP += this.dam * 4;
            if(this._parent[this.hftgt]._HP > this._parent[this.hftgt].maxHP)
            {
               this._parent[this.hftgt]._HP = this._parent[this.hftgt].maxHP;
            }
            this.removeMovieClip();
         }
      }
      if(t > at + maxt + 10)
      {
         this.removeMovieClip();
      }
   }
};
