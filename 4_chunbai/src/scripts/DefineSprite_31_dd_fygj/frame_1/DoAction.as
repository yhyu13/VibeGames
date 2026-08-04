function overme()
{
   this.removeMovieClip();
}
var mst;
var tgt;
var bst;
var dam;
var basex = 0;
var basey = 0;
var basez = 0;
var speed = 150;
var maxforce;
var maxt = maxforce / speed;
var maxlong = 500;
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
this._alpha = 0;
onEnterFrame = function()
{
   if(!stopAll)
   {
      t++;
      if(this._slo < maxlong)
      {
         this._slo += speed;
         this._sZ += this.basez;
         this._sX += this.basex;
         this._sY += this.basey;
      }
      else
      {
         this._sZ += speed * Math.sin(this._sH) + this.basez;
         var _loc5_ = speed * Math.cos(this._sH);
         this._sX += _loc5_ * Math.sin(this._sW) + this.basex;
         this._sY += _loc5_ * Math.cos(this._sW) + this.basey;
      }
      var _loc3_ = new Object();
      _loc3_ = hitobj(this._parent[tgt],this.hq);
      if(_loc3_ != null && _loc3_ != undefined)
      {
         if(this._parent[tgt]._type == "ff")
         {
            this._parent[tgt].onhit(this.dam,this.mst);
            this._parent.attachMovie("bo_7",this._name + "bo" + this.tgt + t,this._parent.getNextHighestDepth(),{_sX:_loc3_._sX,_sY:_loc3_._sY,_sZ:_loc3_._sZ,mst:this.tgt});
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
            var _loc4_ = new Object();
            if(this._parent[tgt].shdon >= 0)
            {
               var _loc8_ = this._sX - this._parent[tgt]._sX;
               var _loc7_ = this._sY - this._parent[tgt]._sY;
               var _loc6_ = this._sZ - this._parent[tgt]._sZ;
               _loc4_ = _global.sToc(_loc8_,_loc7_,_loc6_,this._parent[tgt].objz._sW,this._parent[tgt].objz._sH,this._parent[tgt].objz._sR);
            }
            else
            {
               _loc4_.y = 0;
            }
            if(_loc4_.y > 5 && this._parent[tgt].doSHD(this.dam))
            {
               snd("snd_launch3");
               this._parent.attachMovie("bo_2",this._name + "bo" + this.tgt + t,this._parent.getNextHighestDepth(),{_sX:_loc3_._sX,_sY:_loc3_._sY,_sZ:_loc3_._sZ,mst:this.tgt});
            }
            else
            {
               this._parent[tgt].onhit(this.dam,this.mst);
               this._parent[tgt].hitbo();
               this._parent.attachMovie("bo_7",this._name + "bo" + this.tgt + t,this._parent.getNextHighestDepth(),{_sX:_loc3_._sX,_sY:_loc3_._sY,_sZ:_loc3_._sZ,mst:this.tgt});
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
      if(t >= maxt || this._parent[bst] == undefined)
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
