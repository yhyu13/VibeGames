function doit()
{
   _alpha = _alpha - 10;
   this.t = 0;
   this.mz = false;
   this.tgt = _parent[mst].tgt;
   if(_parent[tgt] != undefined)
   {
      var _loc5_ = _parent[tgt]._sX - _parent[mst]._sX;
      var _loc4_ = _parent[tgt]._sY - _parent[mst]._sY;
      var _loc3_ = _parent[tgt]._sZ - _parent[mst]._sZ;
      this.dst = dist_3d(0,0,0,_loc5_,_loc4_,_loc3_);
   }
   this._parent[mst].modact(0,0,0,0,0);
   onEnterFrame = function()
   {
      fsme();
   };
}
function holdme()
{
   if(!stopAll)
   {
      t++;
      if(_parent[mst] != undefined)
      {
         if(this._parent[mst]._type == "TMA")
         {
            this._parent[mst][wpname]._zt = "hide";
            this._parent[mst][wpname].wpmodon = false;
         }
         else if(this._parent[this._name + "tx"] != undefined)
         {
            this._parent[mst][wpname].wpmodon = false;
         }
         else
         {
            this._parent[mst][wpname].wpmodon = true;
         }
         if(_parent[mst].weaponow != this.wpi)
         {
            this.removeMovieClip();
         }
         var _loc4_ = new Object();
         _loc4_ = rotateobj(this._parent[mst].objz,this.fw,this.fh,this.fr);
         this._sW = _loc4_.w;
         this._sH = _loc4_.h;
         var _loc3_ = new Object();
         _loc3_ = moveobj(this._parent[mst].objz,this.fx,this.fy,this.fz);
         this._sZ = _loc3_.z;
         this._sX = _loc3_.x;
         this._sY = _loc3_.y;
      }
      else
      {
         this.removeMovieClip();
      }
   }
}
function fsme()
{
   if(!stopAll)
   {
      t++;
      if(this._parent[this._name + "tx"] != undefined)
      {
         this._parent[mst][wpname].wpmodon = false;
      }
      else
      {
         this._parent[mst][wpname].wpmodon = true;
      }
      if(_parent[mst] != undefined)
      {
         var _loc7_ = _parent[tgt]._sX - _parent[mst]._sX;
         var _loc6_ = _parent[tgt]._sY - _parent[mst]._sY;
         var _loc9_ = _parent[tgt]._sZ - _parent[mst]._sZ;
         this.dst = dist_3d(0,0,0,_loc7_,_loc6_,_loc9_);
         if(this.dst <= 300)
         {
            if(this._parent[this.tgt].AI != undefined)
            {
               this._parent[this.tgt].AI.ongd(this._name);
            }
         }
         if(this.dst > 90 + 10 * this.sz)
         {
            var _loc8_ = new Object();
            _loc8_ = rotateobj(this._parent[mst].objz,this.fw,this.fh,this.fr);
            this._sW = _loc8_.w;
            this._sH = _loc8_.h;
         }
         else
         {
            this._sW = Math.atan2(_loc7_,_loc6_);
            this._sH = Math.atan2(_loc9_,_global.distance(0,0,_loc7_,_loc6_));
            if(this._parent[this._name + "tx"] == undefined)
            {
               this.mz = true;
               this._parent[mst].GDdd = 5;
               if(this.wptx == "tx_dbs" || this.wptx == "tx_bs1")
               {
                  snd("bs1");
                  this._parent.attachMovie(this.wptx,this._name + "tx",this._parent.getNextHighestDepth(),{_sX:this._parent[mst]._sX,_sY:this._parent[mst]._sY,_sZ:this._parent[mst]._sZ,mst:this.mst});
                  this._parent[this._name + "tx"].sz = this.sz;
               }
               else if(this.wptx == "tx_bs2")
               {
                  snd("bs1");
                  this._parent.attachMovie("tx_bs1",this._name + "tx",this._parent.getNextHighestDepth(),{_sX:this._parent[mst]._sX,_sY:this._parent[mst]._sY,_sZ:this._parent[mst]._sZ,mst:this.mst});
                  this._parent[this._name + "tx"].sz = this.sz;
               }
            }
            if(this._parent[this._name + "tx2"] == undefined && this.wptx == "tx_bs2")
            {
               this.mz = true;
               this._parent[mst].GDdd = 5;
               this._parent.attachMovie("tx_bs2",this._name + "tx2",this._parent.getNextHighestDepth(),{_sX:this._parent[mst]._sX,_sY:this._parent[mst]._sY,_sZ:this._parent[mst]._sZ,mst:this.mst});
               this._parent[this._name + "tx2"].sz = this.sz;
            }
         }
         var _loc5_ = new Object();
         _loc5_ = moveobj(this._parent[mst].objz,this.fx,this.fy,this.fz);
         this._sZ = _loc5_.z;
         this._sX = _loc5_.x;
         this._sY = _loc5_.y;
      }
      else
      {
         this.removeMovieClip();
      }
      var _loc10_ = hitobj(this._parent[tgt],this.hq + _siz - 5);
      if(_loc10_ != null && _loc10_ != undefined)
      {
         _parent[mst].GDon = false;
         if(this._parent[tgt]._type == "ff")
         {
            this._parent[tgt].onhit(this.dam,this.mst);
            this._parent.attachMovie("bo_7",this._name + "bo",this._parent.getNextHighestDepth(),{_sX:0.5 * (this._sX + this._parent[tgt]._sX),_sY:0.5 * (this._sY + this._parent[tgt]._sY),_sZ:0.5 * (this._sZ + this._parent[tgt]._sZ),mst:this.tgt});
         }
         else if(_parent[tgt].hypt == 0)
         {
            if(this._parent[tgt].GDdd > 0)
            {
               if(this._parent[this.mst + "pk" + this.tgt] == undefined && this._parent[this.tgt + "pk" + this.mst] == undefined)
               {
                  this._parent.attachMovie("ob_pd",this.mst + "pk" + this.tgt,this._parent.getNextHighestDepth(),{_sX:0.5 * (this._parent[mst]._sX + this._parent[tgt]._sX),_sY:0.5 * (this._parent[mst]._sY + this._parent[tgt]._sY),_sZ:0.5 * (this._parent[mst]._sZ + this._parent[tgt]._sZ),_sW:this._parent[mst]._sW,_sH:this._parent[mst]._sH,_sR:this._parent[mst]._sR,tgt1:this.mst,tgt2:this.tgt});
                  snd("snd_gjk2");
               }
            }
            else
            {
               this._parent[tgt].weaponCD = 30;
               this._parent[tgt].vZ = 0.5 * this._parent[mst].v._sZ;
               this._parent[tgt].vX = 0.5 * this._parent[mst].v._sX;
               this._parent[tgt].vY = 0.5 * this._parent[mst].v._sY;
               this._parent[tgt].hitbo();
               var _loc4_ = this.dam;
               if(this._parent[mst]._EN < this._parent[mst][this.wpname].en)
               {
                  _loc4_ = Math.round(_loc4_ * this._parent[mst]._EN / this._parent[mst][this.wpname].en);
               }
               this._parent[tgt].onhit(_loc4_,this.mst);
               if(this.wptx == "tx_dbs" || this.wptx == "tx_bs2")
               {
                  this._parent[tgt].onhit(_loc4_,this.mst);
               }
               this._parent.attachMovie("bo_7",this._name + "bo",this._parent.getNextHighestDepth(),{_sX:0.5 * (this._sX + this._parent[tgt]._sX),_sY:0.5 * (this._sY + this._parent[tgt]._sY),_sZ:0.5 * (this._sZ + this._parent[tgt]._sZ),mst:this.tgt});
            }
         }
      }
      if(t > this.maxt || !_parent[mst].GDon || _parent[tgt] == undefined || this._parent[mst].bofg > 0 || this._parent[mst].tgt != this.tgt || _parent[tgt].hypt != 0)
      {
         if(this.mz)
         {
            this._parent[mst]._EN -= this._parent[mst][this.wpname].en;
            if(this._parent[mst]._EN < 0)
            {
               this._parent[mst]._EN = 0;
            }
            this._parent[mst][this.wpname].t = this._parent[mst][this.wpname].ct;
         }
         _parent[mst].weaponhold = false;
         _parent[mst].GDon = false;
         onEnterFrame = function()
         {
            holdme();
         };
      }
   }
}
var mst;
var tgt;
var dam;
var sz = this._siz;
this._sizz = 0.1;
var fx;
var fy;
var fz;
var fw;
var fh;
var fr;
var dst = 10000;
this._slo = 10 * this.sz;
var t = 0;
var maxforce;
var maxt = 2;
var hq = 20;
var wpi;
var wpname;
var wptx;
var mz = false;
if(this._parent[tgt]._size == "L")
{
   this.hq = 25;
}
else if(this._parent[tgt]._size == "S")
{
   this.hq = 15;
}
if(this._parent[mst]._type == "TMA")
{
   this._parent[mst][wpname]._zt = "hide";
   this._parent[mst][wpname].wpmodon = false;
}
else if(this._parent[this._name + "tx"] != undefined)
{
   this._parent[mst][wpname].wpmodon = false;
}
else
{
   this._parent[mst][wpname].wpmodon = true;
}
if(_parent[mst].weaponhold)
{
   this.tgt = this._parent[mst].tgt;
   doit();
}
else
{
   onEnterFrame = function()
   {
      holdme();
   };
}
