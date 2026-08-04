function overme()
{
   if(this._alpha <= 0)
   {
      this.removeMovieClip();
   }
   else
   {
      t++;
      this._slo += speed;
      this._sZ += this._parent[mst].v._sZ;
      this._sX += this._parent[mst].v._sX;
      this._sY += this._parent[mst].v._sY;
      this._alpha -= 10;
   }
}
function beamEX()
{
   if(this._parent[tgt] != undefined)
   {
      var _loc3_ = new Object();
      var _loc4_ = new Object();
      var _loc2_ = 200;
      if(EXon == 1)
      {
         _loc3_.x = this._uX;
         _loc3_.y = this._uY;
         _loc3_.z = this._uZ;
      }
      else
      {
         _loc3_.x = this._parent[this._name + "EX_" + (EXon - 1)]._uX;
         _loc3_.y = this._parent[this._name + "EX_" + (EXon - 1)]._uY;
         _loc3_.z = this._parent[this._name + "EX_" + (EXon - 1)]._uZ;
      }
      _loc2_ = dist_3d(this._parent[tgt]._sX,this._parent[tgt]._sY,this._parent[tgt]._sZ,_loc3_.x,_loc3_.y,_loc3_.z);
      if(_loc2_ > 200)
      {
         _loc2_ = 200;
      }
      if(this._parent[tgt] != undefined)
      {
         if(EXon % 2 == 0)
         {
            _loc4_.x = 0.01 * (_loc2_ + random(2 * _loc2_) - _loc2_) + this._parent[tgt]._sX;
            _loc4_.y = 0.01 * (_loc2_ + random(2 * _loc2_) - _loc2_) + this._parent[tgt]._sY;
            _loc4_.z = 0.01 * (_loc2_ + random(2 * _loc2_) - _loc2_) + this._parent[tgt]._sZ;
         }
         else
         {
            _loc4_.x = _loc2_ + random(2 * _loc2_) - _loc2_ + this._parent[tgt]._sX;
            _loc4_.y = _loc2_ + random(2 * _loc2_) - _loc2_ + this._parent[tgt]._sY;
            _loc4_.z = _loc2_ + random(2 * _loc2_) - _loc2_ + this._parent[tgt]._sZ;
         }
      }
      var _loc6_ = Math.atan2(_loc4_.x - _loc3_.x,_loc4_.y - _loc3_.y);
      var _loc5_ = Math.atan2(_loc4_.z - _loc3_.z,distance(0,0,_loc4_.x - _loc3_.x,_loc4_.y - _loc3_.y));
      this._parent.attachMovie("dd_beamEX",this._name + "EX_" + EXon,this._parent.getNextHighestDepth(),{_sX:_loc3_.x,_sY:_loc3_.y,_sZ:_loc3_.z,_sW:_loc6_,_sH:_loc5_,_slo:random(200) + _loc2_ * 2,_siz:this._siz});
      this._parent[this._name + "EX_" + EXon].mst = this.mst;
      this._parent[this._name + "EX_" + EXon].tgt = this.tgt;
      this._parent[this._name + "EX_" + EXon].dam = this.dam;
      EXon++;
   }
   else
   {
      EXon = 0;
   }
}
if(_siz > 1)
{
   this._glow = this._siz * 0.5;
}
var boi = 0;
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
var hq = 10;
var beamEXon;
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
   if(!stopAll)
   {
      t++;
      this._slo += speed;
      this._sZ += this._parent[mst].v._sZ;
      this._sX += this._parent[mst].v._sX;
      this._sY += this._parent[mst].v._sY;
      if(this.beamEXon && t > 5)
      {
         if(EXon > 0 && EXon <= 10 && t % 3 == 0)
         {
            beamEX();
         }
         else if(this._parent[tgt] != undefined)
         {
            var _loc13_ = dist_3d(this._parent[tgt]._sX,this._parent[tgt]._sY,this._parent[tgt]._sZ,this._uX,this._uY,this._uZ);
            if(_loc13_ < 400)
            {
               EXon = 1;
               beamEX();
            }
         }
      }
      var _loc3_ = new Object();
      if(this._parent[tgt].I_Fon)
      {
         _loc3_ = hitobj(this._parent[tgt],this._parent[tgt].IFsiz);
         if(_loc3_ != null && _loc3_ != undefined)
         {
            this._parent[tgt].doIF();
            var _loc4_ = 0;
            while(_loc4_ <= 5)
            {
               this._parent.attachMovie("bo_beam",this._name + "ss" + boi,this._parent.getNextHighestDepth(),{_sX:_loc3_._sX,_sY:_loc3_._sY,_sZ:_loc3_._sZ,_sW:3.141592653589793 + this._sW + (random(10) - 5) * 0.1 * 3.141592653589793,_sH:- this._sH + (random(10) - 5) * 0.1 * 3.141592653589793,_slo:random(20) + 5,_siz:this._siz,_sizz:0.1});
               boi++;
               _loc4_ = _loc4_ + 1;
            }
            this._sX2 = _loc3_._sX;
            this._sY2 = _loc3_._sY;
            this._sZ2 = _loc3_._sZ;
            this.onEnterFrame = function()
            {
               if(!stopAll)
               {
                  if(this._alpha <= 0)
                  {
                     this.removeMovieClip();
                  }
                  else
                  {
                     t++;
                     this._alpha -= 10;
                  }
               }
            };
         }
      }
      else
      {
         _loc3_ = hitobj(this._parent[tgt],this.hq);
         if(_loc3_ != null && _loc3_ != undefined)
         {
            if(this._parent[tgt]._type == "ff")
            {
               this._parent[tgt].onhit(this.dam,this.mst);
               if(this._parent[tgt] != undefined)
               {
                  this._parent.attachMovie("bo_2",this._name + "bo" + this.tgt + t,this._parent.getNextHighestDepth(),{_sX:_loc3_._sX,_sY:_loc3_._sY,_sZ:_loc3_._sZ,mst:this.tgt});
               }
               onEnterFrame = function()
               {
                  if(!stopAll)
                  {
                     this.overme();
                  }
               };
            }
            else
            {
               var _loc9_ = new Object();
               if(this._parent[tgt].shdon >= 0)
               {
                  var _loc12_ = this._sX - this._parent[tgt]._sX;
                  var _loc11_ = this._sY - this._parent[tgt]._sY;
                  var _loc10_ = this._sZ - this._parent[tgt]._sZ;
                  _loc9_ = _global.sToc(_loc12_,_loc11_,_loc10_,this._parent[tgt].objz._sW,this._parent[tgt].objz._sH,this._parent[tgt].objz._sR);
               }
               else
               {
                  _loc9_.y = 0;
               }
               if(_loc9_.y > 5 && this._parent[tgt].doSHD(this.dam))
               {
                  snd("snd_launch3");
                  this._sX2 = _loc3_._sX;
                  this._sY2 = _loc3_._sY;
                  this._sZ2 = _loc3_._sZ;
                  this._parent.attachMovie("bo_2",this._name + "bo" + this.tgt + t,this._parent.getNextHighestDepth(),{_sX:_loc3_._sX,_sY:_loc3_._sY,_sZ:_loc3_._sZ,mst:this.tgt});
                  this.onEnterFrame = function()
                  {
                     if(!stopAll)
                     {
                        if(this._alpha <= 0)
                        {
                           this.removeMovieClip();
                        }
                        else
                        {
                           t++;
                           this._alpha -= 10;
                        }
                     }
                  };
               }
               else if(this._parent[tgt].bofg == 0)
               {
                  this._parent[tgt].onhit(this.dam,this.mst);
                  this._parent[tgt].hitbo();
                  this._parent.attachMovie("bo_1",this._name + "bo" + this.tgt + t,this._parent.getNextHighestDepth(),{_sX:_loc3_._sX,_sY:_loc3_._sY,_sZ:_loc3_._sZ,mst:this.tgt});
                  onEnterFrame = function()
                  {
                     if(!stopAll)
                     {
                        this.overme();
                     }
                  };
               }
               else
               {
                  this._parent[tgt].onhit(this.dam,this.mst,false);
                  this._parent.attachMovie("bo_2",this._name + "bo" + this.tgt + t,this._parent.getNextHighestDepth(),{_sX:_loc3_._sX,_sY:_loc3_._sY,_sZ:_loc3_._sZ,mst:this.tgt});
                  onEnterFrame = function()
                  {
                     if(!stopAll)
                     {
                        this.overme();
                     }
                  };
               }
            }
         }
      }
      if(t >= maxt)
      {
         this._sZ += this._parent[mst].v._sZ;
         this._sX += this._parent[mst].v._sX;
         this._sY += this._parent[mst].v._sY;
         onEnterFrame = function()
         {
            if(!stopAll)
            {
               this.overme();
            }
         };
      }
   }
};
var EXon = 0;
