function holdme()
{
   if(!stopAll)
   {
      if(tgt == _root.jiemiam.mst)
      {
         _root.jiemiam.hkxsq[mst].jiantou.play();
      }
      t++;
      if(this._parent[mst].bofg > 0 || this.cancle || this._parent[mst]._EN < this._parent[mst]["weapon" + this._parent[mst].weaponow].en)
      {
         _parent[mst].weaponhold = false;
         this._parent[mst]["weapon" + this._parent[mst].weaponow].t = this._parent[mst]["weapon" + this._parent[mst].weaponow].ct;
         root.Sound_box.music_gpxn2.stop("gpxn2");
         this.removeMovieClip();
      }
      else if(t < 30)
      {
         if(_parent[mst].onkf == 0 && _parent[mst].firectrlmode != "AUTO")
         {
            this.cancle = true;
         }
         this._siz = this.sz * 0.05 * t;
         if(t % 2 == 1)
         {
            this._alpha = 100;
         }
         else
         {
            this._alpha = 0;
         }
         if(_parent[mst] != undefined)
         {
            if(EXon)
            {
               this._parent[mst].spEX = 30;
               this._parent[mst].doHy(30);
            }
            this._parent[mst].atton = 5;
            this._parent[mst]["weapon" + this._parent[mst].weaponow].xpmax = 30;
            this._parent[mst]["weapon" + this._parent[mst].weaponow].xpon = true;
            this._parent[mst].AMBAC = -5;
            this._parent[mst].turnto(this._parent[this.tgt]);
            this._parent[mst].AMBAC = 0;
            this._sW = this._parent[mst]._sW;
            this._sH = this._parent[mst]._sH;
            var _loc7_ = new Object();
            _loc7_ = moveobj(this._parent[mst].objz,this.fx,this.fy + 0.5 * this._siz,this.fz);
            this._sZ = _loc7_.z;
            this._sX = _loc7_.x;
            this._sY = _loc7_.y;
         }
         else
         {
            this.removeMovieClip();
         }
         if(t == 27)
         {
            if(this._parent[this.tgt].AI != undefined)
            {
               this._parent[this.tgt].AI.ongp(this._name);
            }
            if(_parent[tgt] != undefined)
            {
               var _loc6_ = null;
               var _loc8_ = false;
               if(this._parent[mst].tgt == this.tgt)
               {
                  _loc6_ = this._parent[mst].htime;
                  _loc8_ = this._parent[mst].lockon;
               }
               else
               {
                  var _loc13_ = _parent[tgt]._sX - this._sX;
                  var _loc12_ = _parent[tgt]._sY - this._sY;
                  var _loc10_ = _parent[tgt]._sZ - this._sZ;
                  var _loc11_ = dist_3d(0,0,0,_loc13_,_loc12_,_loc10_);
                  _loc6_ = _loc11_ / speed;
                  _loc8_ = true;
               }
               if(tgt == _root.jiemiam.mst)
               {
                  _root.jiemiam.hkxsq[mst].jiantou.fs = true;
               }
               var _loc19_ = _parent[tgt].v._sX;
               var _loc18_ = _parent[tgt].v._sY;
               var _loc17_ = _parent[tgt].v._sZ;
               if(_loc8_)
               {
                  mdx = _loc19_ * (_loc6_ + 3) + _parent[tgt]._sX;
                  mdy = _loc18_ * (_loc6_ + 3) + _parent[tgt]._sY;
                  mdz = _loc17_ * (_loc6_ + 3) + _parent[tgt]._sZ;
               }
               else
               {
                  _loc7_ = new Object();
                  _loc7_ = _global.cTos(0,maxforce,0,this._parent[mst].shotw,this._parent[mst].shoth,0);
                  mdx = _loc7_.x + this._parent[mst]._sX;
                  mdy = _loc7_.y + this._parent[mst]._sY;
                  mdz = _loc7_.z + this._parent[mst]._sZ;
               }
            }
            else
            {
               _loc7_ = new Object();
               _loc7_ = _global.cTos(0,maxforce,0,this._parent[mst].shotw,this._parent[mst].shoth,0);
               mdx = _loc7_.x + this._parent[mst]._sX;
               mdy = _loc7_.y + this._parent[mst]._sY;
               mdz = _loc7_.z + this._parent[mst]._sZ;
            }
         }
      }
      else
      {
         if(_parent[mst] != undefined)
         {
            this._parent[mst]["weapon" + this._parent[mst].weaponow].xpmax = 30;
            this._parent[mst]["weapon" + this._parent[mst].weaponow].xpon = true;
            this._parent[mst].AMBAC = -5;
            this._parent[mst].turnto(this._parent[this.tgt]);
            this._parent[mst].AMBAC = 0;
            this._sW = this._parent[mst]._sW;
            this._sH = this._parent[mst]._sH;
            _loc7_ = new Object();
            _loc7_ = moveobj(this._parent[mst].objz,this.fx,this.fy + 0.5 * this._siz,this.fz);
            this._sZ = _loc7_.z;
            this._sX = _loc7_.x;
            this._sY = _loc7_.y;
         }
         else
         {
            this.removeMovieClip();
         }
         var _loc9_ = false;
         var _loc16_ = mdx - this._sX;
         var _loc15_ = mdy - this._sY;
         var _loc14_ = mdz - this._sZ;
         var _loc5_ = new Object();
         _loc5_ = _global.sToc(_loc16_,_loc15_,_loc14_,this._parent[mst]._sW,this._parent[mst]._sH,this._parent[mst]._sR);
         if(_loc5_.y > 0 && Math.abs(_loc5_.x) < _global.Cmr.wrees * _loc5_.y && Math.abs(_loc5_.z) < _global.Cmr.hrees * _loc5_.y)
         {
            _loc9_ = true;
         }
         if(_loc9_)
         {
            this._alpha = 100;
            t = 0;
            this._siz = this.sz;
            if(EXon)
            {
               this._parent[mst].SPcap += 5000;
            }
            snd("sgsp");
            this._parent[mst]._EN -= this._parent[mst]["weapon" + this._parent[mst].weaponow].en;
            onEnterFrame = function()
            {
               fsme();
            };
         }
         else
         {
            this._parent[mst]["weapon" + this._parent[mst].weaponow].t = this._parent[mst]["weapon" + this._parent[mst].weaponow].ct;
            _parent[mst].weaponhold = false;
            this.removeMovieClip();
         }
      }
   }
}
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
      if(_parent[mst] != undefined)
      {
         this._parent[mst].atton = 5;
         if(EXon)
         {
            this._parent[mst].spEX = 30;
            this._parent[mst].doHy(30);
         }
         this._parent[mst]["weapon" + this._parent[mst].weaponow].xpmax = 30;
         this._parent[mst]["weapon" + this._parent[mst].weaponow].xpon = true;
         this._parent[mst].AMBAC = 5;
         this._parent[mst].vX = 0;
         this._parent[mst].vY = 0;
         this._parent[mst].vZ = 0;
         var _loc6_ = mdx - this._parent[mst]._sX;
         var _loc5_ = mdy - this._parent[mst]._sY;
         var _loc7_ = mdz - this._parent[mst]._sZ;
         var _loc11_ = dist_3d(0,0,0,_loc6_,_loc5_,_loc7_);
         this._parent[mst]._sW = Math.atan2(_loc6_,_loc5_);
         this._parent[mst]._sH = Math.atan2(_loc7_,distance(0,0,_loc6_,_loc5_));
         this._sW = this._parent[mst]._sW;
         this._sH = this._parent[mst]._sH;
         var _loc8_ = new Object();
         _loc8_ = moveobj(this._parent[mst].objz,this.fx,this.fy + 0.5 * this._siz,this.fz);
         this._sZ = _loc8_.z;
         this._sX = _loc8_.x;
         this._sY = _loc8_.y;
      }
      else
      {
         this.removeMovieClip();
      }
      if(EXon || this._sizz > 5)
      {
         this._sizz = 5;
      }
      else
      {
         this._sizz += 0.2;
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
            _loc7_ = _parent[tgt]._sZ - this._sZ;
            var _loc9_ = dist_3d(0,0,0,_loc6_,_loc5_,_loc7_);
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
            hit++;
            if(this._parent[tgt]._type == "ff")
            {
               this._parent[tgt].onhit(this.dam,this.mst);
               if(this._parent[tgt] != undefined)
               {
                  if(t % 3 == 0)
                  {
                     this._parent.attachMovie("bo_2",this._name + "bo" + this.tgt + t,this._parent.getNextHighestDepth(),{_sX:0.2 * _loc4_._sX + 0.8 * _parent[tgt]._sX,_sY:0.2 * _loc4_._sY + 0.8 * _parent[tgt]._sY,_sZ:0.2 * _loc4_._sZ + 0.8 * _parent[tgt]._sZ,mst:this.tgt});
                  }
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
                  this._parent.attachMovie("bo_1",this._name + "bo" + this.tgt + t,this._parent.getNextHighestDepth(),{_sX:0.2 * _loc4_._sX + 0.8 * _parent[tgt]._sX,_sY:0.2 * _loc4_._sY + 0.8 * _parent[tgt]._sY,_sZ:0.2 * _loc4_._sZ + 0.8 * _parent[tgt]._sZ,mst:this.tgt});
               }
               else
               {
                  this._parent[tgt].onhit(this.dam,this.mst);
                  this._parent.attachMovie("bo_2",this._name + "bo" + this.tgt + t,this._parent.getNextHighestDepth(),{_sX:0.2 * _loc4_._sX + 0.8 * _parent[tgt]._sX,_sY:0.2 * _loc4_._sY + 0.8 * _parent[tgt]._sY,_sZ:0.2 * _loc4_._sZ + 0.8 * _parent[tgt]._sZ,mst:this.tgt});
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
      if(t >= maxt || hit >= 20)
      {
         if(EXon && this._parent[mst].weaponCD < 60)
         {
            this._parent[mst].weaponCD = 60;
         }
         _parent[mst].weaponhold = false;
         this._parent[mst]["weapon" + this._parent[mst].weaponow].t = this._parent[mst]["weapon" + this._parent[mst].weaponow].ct;
         this._parent[mst]["weapon" + this._parent[mst].weaponow].ggCD1();
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
                           this._parent.attachMovie("bo_2",this._name + "bo" + this.tgt + t,this._parent.getNextHighestDepth(),{_sX:0.2 * _loc4_._sX + 0.8 * _parent[_loc20_]._sX,_sY:0.2 * _loc4_._sY + 0.8 * _parent[_loc20_]._sY,_sZ:0.2 * _loc4_._sZ + 0.8 * _parent[_loc20_]._sZ,mst:this.tgt});
                        }
                     }
                  }
                  else if(this._parent[_loc20_].hitbo())
                  {
                     this._parent[_loc20_].onhit(this.dam,this.mst);
                     this._parent.attachMovie("bo_1",this._name + "bo" + _loc20_ + t,this._parent.getNextHighestDepth(),{_sX:0.2 * _loc4_._sX + 0.8 * _parent[_loc20_]._sX,_sY:0.2 * _loc4_._sY + 0.8 * _parent[_loc20_]._sY,_sZ:0.2 * _loc4_._sZ + 0.8 * _parent[_loc20_]._sZ,mst:_loc20_});
                  }
                  else
                  {
                     this._parent[_loc20_].onhit(this.dam,this.mst);
                     this._parent.attachMovie("bo_2",this._name + "bo" + _loc20_ + t,this._parent.getNextHighestDepth(),{_sX:0.2 * _loc4_._sX + 0.8 * _parent[_loc20_]._sX,_sY:0.2 * _loc4_._sY + 0.8 * _parent[_loc20_]._sY,_sZ:0.2 * _loc4_._sZ + 0.8 * _parent[_loc20_]._sZ,mst:_loc20_});
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
var mdx = null;
var mdy = null;
var mdz = null;
this._slo = 1;
var t = 0;
var hq = 10;
var hit = 0;
if(this._parent[tgt]._size == "L")
{
   this.hq = 15;
}
else if(this._parent[tgt]._size == "S")
{
   this.hq = 5;
}
if(this._parent[tgt]._type == "ff")
{
   t = 15;
}
else
{
   snd("gpxn2");
}
var cancle = false;
var EXon;
if(EXon)
{
   this._parent.attachMovie("ob_skill","xl" + this._name,this._parent.getNextHighestDepth(),{_sX:this._parent[mst]._sX,_sY:this._parent[mst]._sY,_sZ:this._parent[mst]._sZ,mst:this.mst});
}
onEnterFrame = function()
{
   holdme();
};
