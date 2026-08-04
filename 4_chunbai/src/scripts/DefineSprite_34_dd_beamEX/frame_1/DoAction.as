function overme()
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
var maxt = 5;
var maxlong;
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
   if(!stopAll)
   {
      t++;
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
               this._parent.attachMovie("bo_beam",this._name + "ss" + boi,this._parent.getNextHighestDepth(),{_sX:_loc3_._sX,_sY:_loc3_._sY,_sZ:_loc3_._sZ,_sW:3.141592653589793 + this._sW + (random(10) - 5) * 0.05 * 3.141592653589793,_sH:- this._sH + (random(10) - 5) * 0.05 * 3.141592653589793,_slo:random(20) + 5,_siz:this._siz,_sizz:0.1});
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
               var _loc10_ = new Object();
               if(this._parent[tgt].shdon >= 0)
               {
                  var _loc13_ = this._sX - this._parent[tgt]._sX;
                  var _loc12_ = this._sY - this._parent[tgt]._sY;
                  var _loc11_ = this._sZ - this._parent[tgt]._sZ;
                  _loc10_ = _global.sToc(_loc13_,_loc12_,_loc11_,this._parent[tgt].objz._sW,this._parent[tgt].objz._sH,this._parent[tgt].objz._sR);
               }
               else
               {
                  _loc10_.y = 0;
               }
               if(_loc10_.y > 5 && this._parent[tgt].doSHD(this.dam))
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
                  this._parent[tgt].onhit(this.dam,this.mst);
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
