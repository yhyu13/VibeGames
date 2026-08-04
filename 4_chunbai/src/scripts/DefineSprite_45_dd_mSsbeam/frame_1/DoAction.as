function fsme()
{
   if(!stopAll)
   {
      t++;
      if(t % 2 == 1)
      {
         this._alpha = 100;
      }
      else
      {
         this._alpha = 50;
      }
      this._sizz = 1 + 0.5 * this._slo / speed;
      if(this._sizz > 10)
      {
         this._sizz = 10;
      }
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
         var _loc6_ = mdx - this._sX;
         var _loc5_ = mdy - this._sY;
         var _loc8_ = mdz - this._sZ;
         this._sW = Math.atan2(_loc6_,_loc5_);
         this._sH = Math.atan2(_loc8_,distance(0,0,_loc6_,_loc5_));
      }
      else
      {
         this.removeMovieClip();
      }
      if(this._parent[tgt].I_Fon)
      {
         var _loc4_ = hitobj(this._parent[tgt],this._parent[tgt].IFsiz);
         if(_loc4_ != null && _loc4_ != undefined)
         {
            this._parent[tgt].doIF();
            var _loc3_ = 0;
            while(_loc3_ <= 2)
            {
               this._parent.attachMovie("bo_beam",this._name + "ss" + boi,this._parent.getNextHighestDepth(),{_sX:_loc4_._sX,_sY:_loc4_._sY,_sZ:_loc4_._sZ,_sW:3.141592653589793 + this._sW + (random(10) - 5) * 0.05 * 3.141592653589793,_sH:- this._sH + (random(10) - 5) * 0.05 * 3.141592653589793,_slo:random(20) + 5,_siz:this._siz,_sizz:0.1,_alpha:50});
               boi++;
               _loc3_ = _loc3_ + 1;
            }
            if(this._sizz * this._siz < 10)
            {
               this._sX2 = _loc4_._sX;
               this._sY2 = _loc4_._sY;
               this._sZ2 = _loc4_._sZ;
               this._slo = dist_3d(this._sX,this._sY,this._sZ,this._sX2,this._sY2,this._sZ2);
            }
         }
         subhit();
      }
      else
      {
         if(_parent[tgt] != undefined)
         {
            _loc6_ = _parent[tgt]._sX - this._sX;
            _loc5_ = _parent[tgt]._sY - this._sY;
            _loc8_ = _parent[tgt]._sZ - this._sZ;
            var _loc9_ = dist_3d(0,0,0,_loc6_,_loc5_,_loc8_);
            if(_loc9_ > this._slo)
            {
               var _loc10_ = 0.5 * _siz * this._sizz;
            }
            else
            {
               _loc10_ = 0.5 * _siz * (1 + (this._sizz - 1) * _loc9_ / this._slo);
            }
            _loc4_ = hitobj(this._parent[tgt],this.hq + _loc10_);
         }
         else
         {
            _loc4_ = null;
         }
         if(_loc4_ != null && _loc4_ != undefined)
         {
            mdx = _loc4_._sX;
            mdy = _loc4_._sY;
            mdz = _loc4_._sZ;
            if(this._parent[tgt]._type == "ff")
            {
               this._parent[tgt].onhit(this.dam,this.mst);
               if(this._parent[tgt] != undefined)
               {
                  if(t % 3 == 0)
                  {
                     this._parent.attachMovie("bo_2",this._name + "bo" + this.tgt + t,this._parent.getNextHighestDepth(),{_sX:0.5 * (_loc4_._sX + _parent[tgt]._sX),_sY:0.5 * (_loc4_._sY + _parent[tgt]._sY),_sZ:0.5 * (_loc4_._sZ + _parent[tgt]._sZ),mst:this.tgt});
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
               if(this._parent[tgt].hitbo())
               {
                  this._parent[tgt].onhit(this.dam,this.mst);
                  this._parent.attachMovie("bo_1",this._name + "bo" + this.tgt + t,this._parent.getNextHighestDepth(),{_sX:0.5 * (_loc4_._sX + _parent[tgt]._sX),_sY:0.5 * (_loc4_._sY + _parent[tgt]._sY),_sZ:0.5 * (_loc4_._sZ + _parent[tgt]._sZ),mst:this.tgt});
               }
               else
               {
                  this._parent[tgt].onhit(this.dam,this.mst);
                  this._parent.attachMovie("bo_2",this._name + "bo" + this.tgt + t,this._parent.getNextHighestDepth(),{_sX:0.5 * (_loc4_._sX + _parent[tgt]._sX),_sY:0.5 * (_loc4_._sY + _parent[tgt]._sY),_sZ:0.5 * (_loc4_._sZ + _parent[tgt]._sZ),mst:this.tgt});
               }
               if(_parent[tgt].hypt == 0)
               {
                  mdx += _parent[tgt].vX;
                  mdy += _parent[tgt].vY;
                  mdz += _parent[tgt].vZ;
               }
            }
         }
         subhit();
      }
      if(t >= maxt)
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
   for(var _loc20_ in _root.cmrs)
   {
      if(_root.cmrs[_loc20_]._force == this.tgt_force)
      {
         if(_loc20_ != this.tgt)
         {
            if(this._parent[_loc20_].I_Fon)
            {
               var _loc4_ = hitobj(this._parent[_loc20_],this._parent[_loc20_].IFsiz);
               if(_loc4_ != null && _loc4_ != undefined)
               {
                  this._parent[_loc20_].doIF();
                  var _loc5_ = 0;
                  while(_loc5_ <= 2)
                  {
                     this._parent.attachMovie("bo_beam",this._name + "ss" + boi,this._parent.getNextHighestDepth(),{_sX:_loc4_._sX,_sY:_loc4_._sY,_sZ:_loc4_._sZ,_sW:3.141592653589793 + this._sW + (random(10) - 5) * 0.05 * 3.141592653589793,_sH:- this._sH + (random(10) - 5) * 0.05 * 3.141592653589793,_slo:random(20) + 5,_siz:this._siz,_sizz:0.1,_alpha:50});
                     boi++;
                     _loc5_ = _loc5_ + 1;
                  }
                  if(this._sizz * this._siz < 10)
                  {
                     this._sX2 = _loc4_._sX;
                     this._sY2 = _loc4_._sY;
                     this._sZ2 = _loc4_._sZ;
                     this._slo = dist_3d(this._sX,this._sY,this._sZ,this._sX2,this._sY2,this._sZ2);
                  }
               }
            }
            else
            {
               var _loc16_ = _parent[_loc20_]._sX - this._sX;
               var _loc15_ = _parent[_loc20_]._sY - this._sY;
               var _loc14_ = _parent[_loc20_]._sZ - this._sZ;
               var _loc7_ = dist_3d(0,0,0,_loc16_,_loc15_,_loc14_);
               if(_loc7_ > this._slo)
               {
                  var _loc13_ = 0.5 * _siz * this._sizz;
               }
               else
               {
                  _loc13_ = 0.5 * _siz * (1 + (this._sizz - 1) * _loc7_ / this._slo);
               }
               _loc4_ = hitobj(this._parent[_loc20_],5 + _loc13_);
               if(_loc4_ != null && _loc4_ != undefined)
               {
                  if(this._parent[_loc20_]._type == "ff")
                  {
                     this._parent[_loc20_].onhit(this.dam,this.mst);
                     if(this._parent[_loc20_] != undefined)
                     {
                        _parent[_loc20_].v._sX = 0;
                        _parent[_loc20_].v._sY = 0;
                        _parent[_loc20_].v._sZ = 0;
                        if(t % 3 == 0)
                        {
                           this._parent.attachMovie("bo_2",this._name + "bo" + _loc20_ + t,this._parent.getNextHighestDepth(),{_sX:0.5 * (_loc4_._sX + _parent[_loc20_]._sX),_sY:0.5 * (_loc4_._sY + _parent[_loc20_]._sY),_sZ:0.5 * (_loc4_._sZ + _parent[_loc20_]._sZ),mst:this.tgt});
                        }
                     }
                  }
                  else if(this._parent[_loc20_].hitbo())
                  {
                     this._parent[_loc20_].onhit(this.dam,this.mst);
                     this._parent.attachMovie("bo_1",this._name + "bo" + _loc20_ + t,this._parent.getNextHighestDepth(),{_sX:0.5 * (_loc4_._sX + _parent[_loc20_]._sX),_sY:0.5 * (_loc4_._sY + _parent[_loc20_]._sY),_sZ:0.5 * (_loc4_._sZ + _parent[_loc20_]._sZ),mst:_loc20_});
                  }
                  else
                  {
                     this._parent[_loc20_].onhit(this.dam,this.mst);
                     this._parent.attachMovie("bo_2",this._name + "bo" + _loc20_ + t,this._parent.getNextHighestDepth(),{_sX:0.5 * (_loc4_._sX + _parent[_loc20_]._sX),_sY:0.5 * (_loc4_._sY + _parent[_loc20_]._sY),_sZ:0.5 * (_loc4_._sZ + _parent[_loc20_]._sZ),mst:_loc20_});
                  }
               }
            }
         }
      }
   }
}
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
