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
      if(_parent[mstff] != undefined)
      {
         this._sW += 0.1 * (this._parent[mstff]._sW - this._sW);
         this._sH += 0.1 * (this._parent[mstff]._sH - this._sH);
         var _loc6_ = new Object();
         _loc6_ = moveobj(this._parent[mstff],this.fx,this.fy + 0.5 * this._siz,this.fz);
         this._sZ = _loc6_.z;
         this._sX = _loc6_.x;
         this._sY = _loc6_.y;
      }
      else
      {
         this.removeMovieClip();
      }
      this._slo += speed;
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
            if(this._siz < 10)
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
         _loc4_ = hitobj(this._parent[tgt],this.hq + 0.5 * _siz);
         if(_loc4_ != null && _loc4_ != undefined)
         {
            if(this._parent[tgt]._type == "ff")
            {
               this._parent[tgt].onhit(this.dam,this.mst);
               if(this._parent[tgt] != undefined)
               {
                  _parent[tgt].v._sX = 0;
                  _parent[tgt].v._sY = 0;
                  _parent[tgt].v._sZ = 0;
                  if(t % 3 == 0)
                  {
                     this._parent.attachMovie("bo_2",this._name + "bo" + this.tgt + t,this._parent.getNextHighestDepth(),{_sX:0.5 * (_loc4_._sX + _parent[tgt]._sX),_sY:0.5 * (_loc4_._sY + _parent[tgt]._sY),_sZ:0.5 * (_loc4_._sZ + _parent[tgt]._sZ),mst:this.tgt});
                  }
               }
            }
            else if(this._parent[tgt].hitbo())
            {
               this._parent[tgt].onhit(this.dam,this.mst);
               this._parent.attachMovie("bo_1",this._name + "bo" + this.tgt + t,this._parent.getNextHighestDepth(),{_sX:0.5 * (_loc4_._sX + _parent[tgt]._sX),_sY:0.5 * (_loc4_._sY + _parent[tgt]._sY),_sZ:0.5 * (_loc4_._sZ + _parent[tgt]._sZ),mst:this.tgt});
            }
            else
            {
               this._parent[tgt].onhit(this.dam,this.mst);
               this._parent.attachMovie("bo_2",this._name + "bo" + this.tgt + t,this._parent.getNextHighestDepth(),{_sX:0.5 * (_loc4_._sX + _parent[tgt]._sX),_sY:0.5 * (_loc4_._sY + _parent[tgt]._sY),_sZ:0.5 * (_loc4_._sZ + _parent[tgt]._sZ),mst:this.tgt});
            }
         }
         subhit();
      }
      if(t >= maxt)
      {
         this._alpha = 100;
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
   for(var _loc15_ in _root.cmrs)
   {
      if(_root.cmrs[_loc15_]._force == this.tgt_force)
      {
         if(_loc15_ != this.tgt)
         {
            if(this._parent[_loc15_].I_Fon)
            {
               var _loc4_ = hitobj(this._parent[_loc15_],this._parent[_loc15_].IFsiz);
               if(_loc4_ != null && _loc4_ != undefined)
               {
                  this._parent[_loc15_].doIF();
                  var _loc5_ = 0;
                  while(_loc5_ <= 2)
                  {
                     this._parent.attachMovie("bo_beam",this._name + "ss" + boi,this._parent.getNextHighestDepth(),{_sX:_loc4_._sX,_sY:_loc4_._sY,_sZ:_loc4_._sZ,_sW:3.141592653589793 + this._sW + (random(10) - 5) * 0.05 * 3.141592653589793,_sH:- this._sH + (random(10) - 5) * 0.05 * 3.141592653589793,_slo:random(20) + 5,_siz:this._siz,_sizz:0.1,_alpha:50});
                     boi++;
                     _loc5_ = _loc5_ + 1;
                  }
                  if(this._siz < 10)
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
               _loc4_ = hitobj(this._parent[_loc15_],0.5 * _siz + 5);
               if(_loc4_ != null && _loc4_ != undefined)
               {
                  if(this._parent[_loc15_]._type == "ff")
                  {
                     this._parent[_loc15_].onhit(this.dam,this.mst);
                     if(this._parent[_loc15_] != undefined)
                     {
                        _parent[_loc15_].v._sX = 0;
                        _parent[_loc15_].v._sY = 0;
                        _parent[_loc15_].v._sZ = 0;
                        if(t % 3 == 0)
                        {
                           this._parent.attachMovie("bo_2",this._name + "bo" + this.tgt + t,this._parent.getNextHighestDepth(),{_sX:0.5 * (_loc4_._sX + _parent[_loc15_]._sX),_sY:0.5 * (_loc4_._sY + _parent[_loc15_]._sY),_sZ:0.5 * (_loc4_._sZ + _parent[_loc15_]._sZ),mst:this.tgt});
                        }
                     }
                  }
                  else if(this._parent[_loc15_].hitbo())
                  {
                     this._parent[_loc15_].onhit(this.dam,this.mst);
                     this._parent.attachMovie("bo_1",this._name + "bo" + _loc15_ + t,this._parent.getNextHighestDepth(),{_sX:0.5 * (_loc4_._sX + _parent[_loc15_]._sX),_sY:0.5 * (_loc4_._sY + _parent[_loc15_]._sY),_sZ:0.5 * (_loc4_._sZ + _parent[_loc15_]._sZ),mst:_loc15_});
                  }
                  else
                  {
                     this._parent[_loc15_].onhit(this.dam,this.mst);
                     this._parent.attachMovie("bo_2",this._name + "bo" + _loc15_ + t,this._parent.getNextHighestDepth(),{_sX:0.5 * (_loc4_._sX + _parent[_loc15_]._sX),_sY:0.5 * (_loc4_._sY + _parent[_loc15_]._sY),_sZ:0.5 * (_loc4_._sZ + _parent[_loc15_]._sZ),mst:_loc15_});
                  }
               }
            }
         }
      }
   }
}
var boi = 0;
var mst;
var mstff;
var tgt;
var tgt_force = this._parent[this.tgt]._force;
if(this.tgt_force == undefined)
{
   this.tgt_force = 0;
}
var dam;
var speed = 200;
var maxforce = 6000;
var maxt = maxforce / speed;
var sz = this._siz;
var fx = 0;
var fy = 5;
var fz = 0;
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
this._alpha = 100;
t = 0;
this._siz = this.sz;
if(_parent[mstff] != undefined)
{
   snd("gsp");
   this._sW = this._parent[mstff]._sW;
   this._sH = this._parent[mstff]._sH;
   var cd = new Object();
   cd = moveobj(this._parent[mstff],this.fx,this.fy + 0.5 * this._siz,this.fz);
   this._sZ = cd.z;
   this._sX = cd.x;
   this._sY = cd.y;
   onEnterFrame = function()
   {
      fsme();
   };
}
else
{
   this.removeMovieClip();
}
