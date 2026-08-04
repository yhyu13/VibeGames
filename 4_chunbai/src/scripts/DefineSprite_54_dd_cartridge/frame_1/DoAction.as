var mst;
var tgt;
var dam;
var basex;
var basey;
var basez;
var speed;
var maxforce;
var maxt = maxforce / speed;
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
if(this.basex == null || this.basez == null || this.basez == null)
{
   if(this._parent[this.mst].v != undefined)
   {
      this.basex = this._parent[this.mst].v._sX;
      this.basey = this._parent[this.mst].v._sY;
      this.basez = this._parent[this.mst].v._sZ;
   }
   else
   {
      this.basex = 0;
      this.basey = 0;
      this.basez = 0;
   }
}
this.basez += speed * Math.sin(this._sH);
var ss = speed * Math.cos(this._sH);
this.basex += ss * Math.sin(this._sW);
this.basey += ss * Math.cos(this._sW);
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
         this._sZ += this.basez;
         this._sX += this.basex;
         this._sY += this.basey;
      }
      var _loc3_ = new Object();
      _loc3_ = hitobj(this._parent[tgt],this.hq);
      if(_loc3_ != null && _loc3_ != undefined)
      {
         if(this._parent[tgt]._type == "ff")
         {
            this._parent[tgt].onhit(this.dam,this.mst);
            if(this._parent[tgt] != undefined)
            {
               if(this._sizz >= 300)
               {
                  this._parent.attachMovie("bo_5",this._name + "bo" + this.tgt + t,this._parent.getNextHighestDepth(),{_sX:_loc3_._sX,_sY:_loc3_._sY,_sZ:_loc3_._sZ,mst:this.tgt});
               }
               else if(this._sizz >= 100)
               {
                  this._parent.attachMovie("bo_1",this._name + "bo" + this.tgt + t,this._parent.getNextHighestDepth(),{_sX:_loc3_._sX,_sY:_loc3_._sY,_sZ:_loc3_._sZ,mst:this.tgt});
               }
               else
               {
                  this._parent.attachMovie("bo_0",this._name + "bo" + this.tgt + t,this._parent.getNextHighestDepth(),{_sX:_loc3_._sX,_sY:_loc3_._sY,_sZ:_loc3_._sZ,mst:this.tgt});
               }
            }
         }
         else
         {
            var _loc4_ = new Object();
            if(this._parent[tgt].shdon >= 0)
            {
               var _loc7_ = this._sX - this._parent[tgt]._sX;
               var _loc6_ = this._sY - this._parent[tgt]._sY;
               var _loc5_ = this._sZ - this._parent[tgt]._sZ;
               _loc4_ = _global.sToc(_loc7_,_loc6_,_loc5_,this._parent[tgt].objz._sW,this._parent[tgt].objz._sH,this._parent[tgt].objz._sR);
            }
            else
            {
               _loc4_.y = 0;
            }
            if(_loc4_.y > 5 && this._parent[tgt].doSHD(this.dam))
            {
               snd("bo3");
               if(this._sizz >= 300)
               {
                  this._parent.attachMovie("bo_5",this._name + "bo" + this.tgt + t,this._parent.getNextHighestDepth(),{_sX:_loc3_._sX,_sY:_loc3_._sY,_sZ:_loc3_._sZ,mst:this.tgt});
               }
               else if(this._sizz >= 100)
               {
                  this._parent.attachMovie("bo_1",this._name + "bo" + this.tgt + t,this._parent.getNextHighestDepth(),{_sX:_loc3_._sX,_sY:_loc3_._sY,_sZ:_loc3_._sZ,mst:this.tgt});
               }
               else
               {
                  this._parent.attachMovie("bo_0",this._name + "bo" + this.tgt + t,this._parent.getNextHighestDepth(),{_sX:_loc3_._sX,_sY:_loc3_._sY,_sZ:_loc3_._sZ,mst:this.tgt});
               }
            }
            else if(this._parent[tgt].bofg == 0)
            {
               this._parent[tgt].onhit(this.dam,this.mst);
               this._parent[tgt].hitbo();
               if(this._sizz >= 300)
               {
                  this._parent.attachMovie("bo_5",this._name + "bo" + this.tgt + t,this._parent.getNextHighestDepth(),{_sX:_loc3_._sX,_sY:_loc3_._sY,_sZ:_loc3_._sZ,mst:this.tgt});
               }
               else if(this._sizz >= 100)
               {
                  this._parent.attachMovie("bo_1",this._name + "bo" + this.tgt + t,this._parent.getNextHighestDepth(),{_sX:_loc3_._sX,_sY:_loc3_._sY,_sZ:_loc3_._sZ,mst:this.tgt});
               }
               else
               {
                  this._parent.attachMovie("bo_0",this._name + "bo" + this.tgt + t,this._parent.getNextHighestDepth(),{_sX:_loc3_._sX,_sY:_loc3_._sY,_sZ:_loc3_._sZ,mst:this.tgt});
               }
            }
            else
            {
               this._parent[tgt].onhit(this.dam,this.mst);
               if(this._sizz >= 300)
               {
                  this._parent.attachMovie("bo_5",this._name + "bo" + this.tgt + t,this._parent.getNextHighestDepth(),{_sX:_loc3_._sX,_sY:_loc3_._sY,_sZ:_loc3_._sZ,mst:this.tgt});
               }
               else if(this._sizz >= 100)
               {
                  this._parent.attachMovie("bo_1",this._name + "bo" + this.tgt + t,this._parent.getNextHighestDepth(),{_sX:_loc3_._sX,_sY:_loc3_._sY,_sZ:_loc3_._sZ,mst:this.tgt});
               }
               else
               {
                  this._parent.attachMovie("bo_0",this._name + "bo" + this.tgt + t,this._parent.getNextHighestDepth(),{_sX:_loc3_._sX,_sY:_loc3_._sY,_sZ:_loc3_._sZ,mst:this.tgt});
               }
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
