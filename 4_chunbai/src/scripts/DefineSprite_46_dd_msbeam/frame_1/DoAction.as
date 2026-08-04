function fsme()
{
   if(!stopAll)
   {
      t++;
      this._slo += speed;
      if(_parent[mst] != undefined)
      {
         this._parent[mst].atton = 5;
         this._parent[mst].AMBAC = 5;
         var _loc7_ = new Object();
         _loc7_ = moveobj(this._parent[mst].objz,this.fx,this.fy + 0.5 * this._siz,this.fz);
         this._sZ = _loc7_.z;
         this._sX = _loc7_.x;
         this._sY = _loc7_.y;
         var _loc10_ = mdx - this._sX;
         var _loc9_ = mdy - this._sY;
         var _loc11_ = mdz - this._sZ;
         this._sW = Math.atan2(_loc10_,_loc9_);
         this._sH = Math.atan2(_loc11_,distance(0,0,_loc10_,_loc9_));
      }
      else
      {
         this.removeMovieClip();
      }
      if(this._parent[tgt].I_Fon)
      {
         var _loc5_ = hitobj(this._parent[tgt],this._parent[tgt].IFsiz);
         if(_loc5_ != null && _loc5_ != undefined)
         {
            this._parent[tgt].doIF();
            var _loc4_ = 0;
            while(_loc4_ <= 2)
            {
               this._parent.attachMovie("bo_beam",this._name + "ss" + boi,this._parent.getNextHighestDepth(),{_sX:_loc5_._sX,_sY:_loc5_._sY,_sZ:_loc5_._sZ,_sW:3.141592653589793 + this._sW + (random(10) - 5) * 0.05 * 3.141592653589793,_sH:- this._sH + (random(10) - 5) * 0.05 * 3.141592653589793,_slo:random(20) + 5,_siz:this._siz,_sizz:0.1});
               boi++;
               _loc4_ = _loc4_ + 1;
            }
            this._sX2 = _loc5_._sX;
            this._sY2 = _loc5_._sY;
            this._sZ2 = _loc5_._sZ;
            this._slo = dist_3d(this._sX,this._sY,this._sZ,this._sX2,this._sY2,this._sZ2);
         }
         subhit();
      }
      else
      {
         _loc5_ = hitobj(this._parent[tgt],this.hq + 0.5 * _siz);
         if(_loc5_ != null && _loc5_ != undefined)
         {
            mdx = _loc5_._sX;
            mdy = _loc5_._sY;
            mdz = _loc5_._sZ;
            this.ft = this.ft - 1;
            if(this._parent[tgt]._type == "ff")
            {
               this._parent[tgt].onhit(this.dam,this.mst);
               if(this._parent[tgt] != undefined)
               {
                  if(t % 3 == 0)
                  {
                     this._parent.attachMovie("bo_2",this._name + "bo" + this.tgt + t,this._parent.getNextHighestDepth(),{_sX:0.5 * (_loc5_._sX + _parent[tgt]._sX),_sY:0.5 * (_loc5_._sY + _parent[tgt]._sY),_sZ:0.5 * (_loc5_._sZ + _parent[tgt]._sZ),mst:this.tgt});
                  }
                  mdx += _parent[tgt].v._sX;
                  mdy += _parent[tgt].v._sY;
                  mdz += _parent[tgt].v._sZ;
                  _parent[tgt].v._sX = 0;
                  _parent[tgt].v._sY = 0;
                  _parent[tgt].v._sZ = 0;
               }
            }
            else
            {
               var _loc8_ = new Object();
               if(this._parent[tgt].shdon >= 0)
               {
                  var _loc14_ = this._sX - this._parent[tgt]._sX;
                  var _loc13_ = this._sY - this._parent[tgt]._sY;
                  var _loc12_ = this._sZ - this._parent[tgt]._sZ;
                  _loc8_ = _global.sToc(_loc14_,_loc13_,_loc12_,this._parent[tgt].objz._sW,this._parent[tgt].objz._sH,this._parent[tgt].objz._sR);
               }
               else
               {
                  _loc8_.y = 0;
               }
               if(_loc8_.y > 5 && this._parent[tgt].doSHD(3 * this.dam))
               {
                  snd("snd_launch3");
                  this._sX2 = _loc5_._sX;
                  this._sY2 = _loc5_._sY;
                  this._sZ2 = _loc5_._sZ;
                  this._slo = dist_3d(this._sX,this._sY,this._sZ,this._sX2,this._sY2,this._sZ2);
                  this._parent.attachMovie("bo_2",this._name + "bo" + this.tgt + t,this._parent.getNextHighestDepth(),{_sX:_loc5_._sX,_sY:_loc5_._sY,_sZ:_loc5_._sZ,mst:this.tgt});
               }
               else
               {
                  if(this._parent[tgt].hitbo())
                  {
                     this._parent[tgt].onhit(this.dam,this.mst);
                     this._parent.attachMovie("bo_1",this._name + "bo" + this.tgt + t,this._parent.getNextHighestDepth(),{_sX:0.5 * (_loc5_._sX + _parent[tgt]._sX),_sY:0.5 * (_loc5_._sY + _parent[tgt]._sY),_sZ:0.5 * (_loc5_._sZ + _parent[tgt]._sZ),mst:this.tgt});
                  }
                  else
                  {
                     this._parent[tgt].onhit(this.dam,this.mst);
                     this._parent.attachMovie("bo_2",this._name + "bo" + this.tgt + t,this._parent.getNextHighestDepth(),{_sX:0.5 * (_loc5_._sX + _parent[tgt]._sX),_sY:0.5 * (_loc5_._sY + _parent[tgt]._sY),_sZ:0.5 * (_loc5_._sZ + _parent[tgt]._sZ),mst:this.tgt});
                  }
                  mdx += _parent[tgt].vX;
                  mdy += _parent[tgt].vY;
                  mdz += _parent[tgt].vZ;
               }
            }
         }
         subhit();
      }
      if(t >= maxt || ft <= 0)
      {
         _parent[mst].weaponhold = false;
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
      if(_alpha < 10)
      {
         this.removeMovieClip();
      }
      this._slo += speed;
      this._alpha = 0.9 * this._alpha;
   }
}
function subhit()
{
   for(var _loc19_ in _root.cmrs)
   {
      if(_root.cmrs[_loc19_]._force == this.tgt_force)
      {
         if(_loc19_ != this.tgt)
         {
            if(this._parent[_loc19_].I_Fon)
            {
               var _loc5_ = hitobj(this._parent[_loc19_],this._parent[_loc19_].IFsiz);
               if(_loc5_ != null && _loc5_ != undefined)
               {
                  this._parent[_loc19_].doIF();
                  var _loc6_ = 0;
                  while(_loc6_ <= 2)
                  {
                     this._parent.attachMovie("bo_beam",this._name + "ss" + boi,this._parent.getNextHighestDepth(),{_sX:_loc5_._sX,_sY:_loc5_._sY,_sZ:_loc5_._sZ,_sW:3.141592653589793 + this._sW + (random(10) - 5) * 0.05 * 3.141592653589793,_sH:- this._sH + (random(10) - 5) * 0.05 * 3.141592653589793,_slo:random(20) + 5,_siz:this._siz,_sizz:0.1});
                     boi++;
                     _loc6_ = _loc6_ + 1;
                  }
                  this._sX2 = _loc5_._sX;
                  this._sY2 = _loc5_._sY;
                  this._sZ2 = _loc5_._sZ;
                  this._slo = dist_3d(this._sX,this._sY,this._sZ,this._sX2,this._sY2,this._sZ2);
               }
            }
            else
            {
               _loc5_ = hitobj(this._parent[_loc19_],0.5 * _siz + 5);
               if(_loc5_ != null && _loc5_ != undefined)
               {
                  if(this._parent[_loc19_]._type == "ff")
                  {
                     this._parent[_loc19_].onhit(this.dam,this.mst);
                     if(this._parent[_loc19_] != undefined)
                     {
                        _parent[_loc19_].v._sX = 0;
                        _parent[_loc19_].v._sY = 0;
                        _parent[_loc19_].v._sZ = 0;
                        if(t % 3 == 0)
                        {
                           this._parent.attachMovie("bo_2",this._name + "bo" + _loc19_ + t,this._parent.getNextHighestDepth(),{_sX:0.5 * (_loc5_._sX + _parent[_loc19_]._sX),_sY:0.5 * (_loc5_._sY + _parent[_loc19_]._sY),_sZ:0.5 * (_loc5_._sZ + _parent[_loc19_]._sZ),mst:this.tgt});
                        }
                     }
                  }
                  else
                  {
                     var _loc8_ = new Object();
                     if(this._parent[_loc19_].shdon >= 0)
                     {
                        var _loc15_ = this._sX - this._parent[_loc19_]._sX;
                        var _loc14_ = this._sY - this._parent[_loc19_]._sY;
                        var _loc13_ = this._sZ - this._parent[_loc19_]._sZ;
                        _loc8_ = _global.sToc(_loc15_,_loc14_,_loc13_,this._parent[_loc19_].objz._sW,this._parent[_loc19_].objz._sH,this._parent[_loc19_].objz._sR);
                     }
                     else
                     {
                        _loc8_.y = 0;
                     }
                     if(_loc8_.y > 5 && this._parent[_loc19_].doSHD(this.dam))
                     {
                        snd("snd_launch3");
                        this._sX2 = _loc5_._sX;
                        this._sY2 = _loc5_._sY;
                        this._sZ2 = _loc5_._sZ;
                        this._slo = dist_3d(this._sX,this._sY,this._sZ,this._sX2,this._sY2,this._sZ2);
                     }
                     else if(this._parent[_loc19_].hitbo())
                     {
                        this._parent[_loc19_].onhit(this.dam,this.mst);
                        this._parent.attachMovie("bo_1",this._name + "bo" + _loc19_ + t,this._parent.getNextHighestDepth(),{_sX:0.5 * (_loc5_._sX + _parent[_loc19_]._sX),_sY:0.5 * (_loc5_._sY + _parent[_loc19_]._sY),_sZ:0.5 * (_loc5_._sZ + _parent[_loc19_]._sZ),mst:_loc19_});
                     }
                     else
                     {
                        this._parent[_loc19_].onhit(this.dam,this.mst);
                        this._parent.attachMovie("bo_2",this._name + "bo" + _loc19_ + t,this._parent.getNextHighestDepth(),{_sX:0.5 * (_loc5_._sX + _parent[_loc19_]._sX),_sY:0.5 * (_loc5_._sY + _parent[_loc19_]._sY),_sZ:0.5 * (_loc5_._sZ + _parent[_loc19_]._sZ),mst:_loc19_});
                     }
                  }
               }
            }
         }
      }
   }
}
this._glow = this._siz * 0.5;
var boi = 0;
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
var mdx;
var mdy;
var mdz;
var ft = 3;
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
onEnterFrame = function()
{
   fsme();
};
