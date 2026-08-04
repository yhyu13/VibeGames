function holdme()
{
   if(!stopAll)
   {
      if(tgt == _root.jiemiam.mst)
      {
         _root.jiemiam.hkxsq[mst].jiantou.play();
      }
      t++;
      if(!EXon && (this._parent[mst].bofg > 0 || this.cancle) || this._parent[mst]._EN < this._parent[mst]["weapon" + this._parent[mst].weaponow].en)
      {
         _parent[mst].weaponhold = false;
         this._parent[mst]["weapon" + this._parent[mst].weaponow].t = this._parent[mst]["weapon" + this._parent[mst].weaponow].ct;
         if(shootfin)
         {
            this._parent[mst]["weapon" + this._parent[mst].weaponow].ggCD1();
         }
         root.Sound_box.music_sniper.stop("sniper");
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
               this._parent[mst].AMBAC = -5;
               this._parent[mst].turnto(this._parent[this.tgt]);
               this._parent[mst].AMBAC = 10;
            }
            else
            {
               this._parent[mst].AMBAC = -5;
               this._parent[mst].turnto(this._parent[this.tgt]);
               this._parent[mst].AMBAC = 0;
            }
            this._parent[mst].atton = 5;
            this._parent[mst]["weapon" + this._parent[mst].weaponow].xpmax = 30;
            this._parent[mst]["weapon" + this._parent[mst].weaponow].xpon = true;
            this._sW = this._parent[mst].shotw;
            this._sH = this._parent[mst].shoth;
            var _loc14_ = new Object();
            _loc14_ = moveobj(this._parent[mst].objz,this.fx,this.fy + 0.5 * this._siz,this.fz);
            this._sZ = _loc14_.z;
            this._sX = _loc14_.x;
            this._sY = _loc14_.y;
            if(this._parent[mst].dst > 5000)
            {
               this._parent[mst].scmrfg = 30;
               if(this.perfectlock)
               {
                  this._parent[mst].scmrfg = 40;
               }
            }
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
            if(_parent[tgt] == undefined)
            {
               for(var _loc13_ in _root.cmrs)
               {
                  if(_root.cmrs[_loc13_]._type == "ff" && _root.cmrs[_loc13_]._force == this.tgt_force)
                  {
                     var _loc9_ = _root.cmrs[_loc13_]._sX - this._sX;
                     var _loc8_ = _root.cmrs[_loc13_]._sY - this._sY;
                     var _loc7_ = _root.cmrs[_loc13_]._sZ - this._sZ;
                     var _loc10_ = dist_3d(0,0,0,_loc9_,_loc8_,_loc7_);
                     var _loc6_ = false;
                     var _loc5_ = new Object();
                     _loc5_ = _global.sToc(_loc9_,_loc8_,_loc7_,this._parent[mst]._sW,this._parent[mst]._sH,this._parent[mst]._sR);
                     if(_loc5_.y > 0 && Math.abs(_loc5_.x) < _global.Cmr.wrees * _loc5_.y && Math.abs(_loc5_.z) < _global.Cmr.hrees * _loc5_.y)
                     {
                        _loc6_ = true;
                     }
                     if(_loc6_ && _loc10_ < this.maxforce)
                     {
                        this.tgt = _loc13_;
                        break;
                     }
                  }
               }
               for(_loc13_ in _root.cmrs)
               {
                  if(_root.cmrs[_loc13_]._type != "ff" && _root.cmrs[_loc13_]._force == this.tgt_force)
                  {
                     _loc9_ = _root.cmrs[_loc13_]._sX - this._sX;
                     _loc8_ = _root.cmrs[_loc13_]._sY - this._sY;
                     _loc7_ = _root.cmrs[_loc13_]._sZ - this._sZ;
                     _loc10_ = dist_3d(0,0,0,_loc9_,_loc8_,_loc7_);
                     _loc6_ = false;
                     _loc5_ = new Object();
                     _loc5_ = _global.sToc(_loc9_,_loc8_,_loc7_,this._parent[mst]._sW,this._parent[mst]._sH,this._parent[mst]._sR);
                     if(_loc5_.y > 0 && Math.abs(_loc5_.x) < _global.Cmr.wrees * _loc5_.y && Math.abs(_loc5_.z) < _global.Cmr.hrees * _loc5_.y)
                     {
                        _loc6_ = true;
                     }
                     if(_loc6_ && _loc10_ < this.maxforce)
                     {
                        this.tgt = _loc13_;
                        break;
                     }
                  }
               }
            }
            if(_parent[tgt] != undefined)
            {
               var _loc12_ = null;
               var _loc15_ = false;
               if(this._parent[mst].tgt == this.tgt && !EXon)
               {
                  _loc12_ = this._parent[mst].htime;
                  _loc15_ = this._parent[mst].lockon;
               }
               else
               {
                  var _loc20_ = _parent[tgt]._sX - this._sX;
                  var _loc19_ = _parent[tgt]._sY - this._sY;
                  var _loc17_ = _parent[tgt]._sZ - this._sZ;
                  var _loc18_ = dist_3d(0,0,0,_loc20_,_loc19_,_loc17_);
                  _loc12_ = _loc18_ / speed;
                  _loc15_ = true;
               }
               if(tgt == _root.jiemiam.mst)
               {
                  _root.jiemiam.hkxsq[mst].jiantou.fs = true;
               }
               var _loc26_ = _parent[tgt].v._sX;
               var _loc25_ = _parent[tgt].v._sY;
               var _loc24_ = _parent[tgt].v._sZ;
               if(_loc15_)
               {
                  mdx = _loc26_ * (_loc12_ + 3) + _parent[tgt]._sX;
                  mdy = _loc25_ * (_loc12_ + 3) + _parent[tgt]._sY;
                  mdz = _loc24_ * (_loc12_ + 3) + _parent[tgt]._sZ;
               }
               else
               {
                  _loc14_ = new Object();
                  _loc14_ = _global.cTos(0,maxforce,0,this._sW,this._sH,0);
                  mdx = _loc14_.x + this._parent[mst]._sX;
                  mdy = _loc14_.y + this._parent[mst]._sY;
                  mdz = _loc14_.z + this._parent[mst]._sZ;
               }
            }
            else
            {
               _loc14_ = new Object();
               _loc14_ = _global.cTos(0,maxforce,0,this._sW,this._sH,0);
               mdx = _loc14_.x + this._parent[mst]._sX;
               mdy = _loc14_.y + this._parent[mst]._sY;
               mdz = _loc14_.z + this._parent[mst]._sZ;
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
            this._sW = this._parent[mst].shotw;
            this._sH = this._parent[mst].shoth;
            _loc14_ = new Object();
            _loc14_ = moveobj(this._parent[mst].objz,this.fx,this.fy + 0.5 * this._siz,this.fz);
            this._sZ = _loc14_.z;
            this._sX = _loc14_.x;
            this._sY = _loc14_.y;
         }
         else
         {
            this.removeMovieClip();
         }
         var _loc16_ = false;
         var _loc23_ = mdx - this._sX;
         var _loc22_ = mdy - this._sY;
         var _loc21_ = mdz - this._sZ;
         var _loc11_ = new Object();
         _loc11_ = _global.sToc(_loc23_,_loc22_,_loc21_,this._parent[mst]._sW,this._parent[mst]._sH,this._parent[mst]._sR);
         if(_loc11_.y > 0 && Math.abs(_loc11_.x) < _global.Cmr.wrees * _loc11_.y && Math.abs(_loc11_.z) < _global.Cmr.hrees * _loc11_.y)
         {
            _loc16_ = true;
         }
         if(_loc16_)
         {
            shootfin = true;
            root.Sound_box.music_sniper.stop("sniper");
            snd("sniperf");
            this._alpha = 100;
            t = 0;
            this._siz = this.sz;
            this.hiton = true;
            if(EXon)
            {
               this._parent[mst].SPcap += 1000;
            }
            this._parent[mst]._EN -= this._parent[mst]["weapon" + this._parent[mst].weaponow].en;
            this._glow = this._siz * 0.5;
            onEnterFrame = function()
            {
               fsme();
            };
         }
         else if(EXon)
         {
            this._parent[mst].AMBAC = -30;
            this._parent[mst].doAMBAC(this._parent[this.tgt]);
            t = 26;
         }
         else
         {
            this._parent[mst]["weapon" + this._parent[mst].weaponow].t = this._parent[mst]["weapon" + this._parent[mst].weaponow].ct;
            if(shootfin)
            {
               this._parent[mst]["weapon" + this._parent[mst].weaponow].ggCD1();
            }
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
      this._slo += speed;
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
         this._parent[mst].AMBAC = 5;
         var _loc6_ = new Object();
         _loc6_ = moveobj(this._parent[mst].objz,this.fx,this.fy + 0.5 * this._siz,this.fz);
         this._sZ = _loc6_.z;
         this._sX = _loc6_.x;
         this._sY = _loc6_.y;
         if(_parent[tgt] != undefined)
         {
            var _loc11_ = _parent[tgt]._sX;
            var _loc9_ = _parent[tgt]._sY;
            var _loc7_ = _parent[tgt]._sZ;
         }
         else
         {
            _loc11_ = mdx;
            _loc9_ = mdy;
            _loc7_ = mdz;
         }
         var _loc10_ = _loc11_ - this._sX;
         var _loc8_ = _loc9_ - this._sY;
         var _loc13_ = _loc7_ - this._sZ;
         var _loc14_ = dist_3d(0,0,0,_loc10_,_loc8_,_loc13_);
         var _loc5_ = _loc14_ / maxforce;
         if(this._parent[mst].dst > 5000)
         {
            this._parent[mst].scmrfg = 30;
            if(this.perfectlock)
            {
               this._parent[mst].scmrfg = 40;
               _loc5_ = 1;
            }
         }
         _loc10_ = (1 - _loc5_) * mdx + _loc5_ * _loc11_ - this._sX;
         _loc8_ = (1 - _loc5_) * mdy + _loc5_ * _loc9_ - this._sY;
         _loc13_ = (1 - _loc5_) * mdz + _loc5_ * _loc7_ - this._sZ;
         this._sW = Math.atan2(_loc10_,_loc8_);
         this._sH = Math.atan2(_loc13_,distance(0,0,_loc10_,_loc8_));
      }
      else
      {
         this._parent.attachMovie("line",this._name + "s" + this.fn,this._parent.getNextHighestDepth(),{_sX:this._sX,_sY:this._sY,_sZ:this._sZ,_sW:this._sW,_sH:this._sH,_slo:this._slo,_siz:this._siz,_sizz:this._sizz,speed:this.speed});
         this._parent[this._name + "s" + this.fn].onEnterFrame = function()
         {
            if(!stopAll)
            {
               if(this._alpha < 1)
               {
                  this.removeMovieClip();
               }
               this._slo += speed;
               this._alpha = 0.9 * this._alpha;
            }
         };
         this.removeMovieClip();
      }
      if(this._parent[tgt].I_Fon)
      {
         var _loc12_ = hitobj(this._parent[tgt],this._parent[tgt].IFsiz);
         if(_loc12_ != null && _loc12_ != undefined)
         {
            this._parent[tgt].doIF();
            var _loc3_ = 0;
            while(_loc3_ <= 2)
            {
               this._parent.attachMovie("bo_beam",this._name + "ss" + boi,this._parent.getNextHighestDepth(),{_sX:_loc12_._sX,_sY:_loc12_._sY,_sZ:_loc12_._sZ,_sW:3.141592653589793 + this._sW + (random(10) - 5) * 0.05 * 3.141592653589793,_sH:- this._sH + (random(10) - 5) * 0.05 * 3.141592653589793,_slo:random(20) + 5,_siz:this._siz,_sizz:0.1});
               boi++;
               _loc3_ = _loc3_ + 1;
            }
            this._sX2 = _loc12_._sX;
            this._sY2 = _loc12_._sY;
            this._sZ2 = _loc12_._sZ;
            this._slo = dist_3d(this._sX,this._sY,this._sZ,this._sX2,this._sY2,this._sZ2);
         }
      }
      else if(this.hiton)
      {
         _loc12_ = hitobj(this._parent[tgt],this.hq + 0.5 * _siz);
         if(_loc12_ != null && _loc12_ != undefined)
         {
            this.hiton = false;
            if(this._parent[tgt]._type == "ff")
            {
               this._parent[tgt].onhit(this.dam,this.mst);
               if(this._parent[tgt] != undefined)
               {
                  this._parent.attachMovie("bo_2",this._name + "bo" + this.tgt + t,this._parent.getNextHighestDepth(),{_sX:_loc12_._sX,_sY:_loc12_._sY,_sZ:_loc12_._sZ,mst:this.tgt});
               }
            }
            else
            {
               if(this._parent[tgt].hitbo())
               {
                  this._parent[tgt].onhit(this.dam,this.mst);
                  this._parent.attachMovie("bo_1",this._name + "bo" + this.tgt + t,this._parent.getNextHighestDepth(),{_sX:_loc12_._sX,_sY:_loc12_._sY,_sZ:_loc12_._sZ,mst:this.tgt});
               }
               else
               {
                  this._parent[tgt].onhit(this.dam,this.mst);
                  this._parent.attachMovie("bo_2",this._name + "bo" + this.tgt + t,this._parent.getNextHighestDepth(),{_sX:_loc12_._sX,_sY:_loc12_._sY,_sZ:_loc12_._sZ,mst:this.tgt});
               }
               if(_parent[tgt].hypt == 0)
               {
                  mdx += _parent[tgt].vX;
                  mdy += _parent[tgt].vY;
                  mdz += _parent[tgt].vZ;
               }
            }
         }
      }
      else
      {
         _loc12_ = hitobj(this._parent[tgt],this.hq + _siz);
         if(_loc12_ != null && _loc12_ != undefined)
         {
            if(this._parent[tgt]._type != "ff")
            {
               if(_parent[tgt].hypt == 0)
               {
                  mdx += _parent[tgt].vX;
                  mdy += _parent[tgt].vY;
                  mdz += _parent[tgt].vZ;
               }
            }
         }
      }
      if(t >= maxt)
      {
         this.overme();
      }
   }
}
function overme()
{
   this._parent.attachMovie("line",this._name + "s" + this.fn,this._parent.getNextHighestDepth(),{_sX:this._sX,_sY:this._sY,_sZ:this._sZ,_slo:this._slo,_sW:this._sW,_sH:this._sH,_siz:this._siz,_sizz:this._sizz,speed:this.speed});
   this._parent[this._name + "s" + this.fn].onEnterFrame = function()
   {
      if(!stopAll)
      {
         if(this._alpha < 10)
         {
            this.removeMovieClip();
         }
         this._alpha = 0.9 * this._alpha;
      }
   };
   this.fn = this.fn - 1;
   if(this.fn <= 0)
   {
      if(EXon && this._parent[mst].weaponCD < 60)
      {
         this._parent[mst].weaponCD = 60;
      }
      this._parent[mst]["weapon" + this._parent[mst].weaponow].t = this._parent[mst]["weapon" + this._parent[mst].weaponow].ct;
      this._parent[mst]["weapon" + this._parent[mst].weaponow].ggCD1();
      _parent[mst].weaponhold = false;
      this.onEnterFrame = function()
      {
         this.removeMovieClip();
      };
   }
   else
   {
      this._slo = 0.1;
      this.t = 26;
      this.perfectlock = false;
      this._parent[mst]["weapon" + this._parent[mst].weaponow].xpmax = 30;
      this._parent[mst]["weapon" + this._parent[mst].weaponow].xpon = true;
      this._glow = 0;
      this.onEnterFrame = function()
      {
         holdme();
      };
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
var fn;
var mdx = null;
var mdy = null;
var mdz = null;
var hiton = true;
this._slo = 0.1;
var t = 0;
var hq = 10;
var perfectlock = false;
if(this._parent[tgt]._size == "L")
{
   this.hq = 15;
}
else if(this._parent[tgt]._size == "S")
{
   this.hq = 5;
}
if(this._parent[mst].scmrfg > 25)
{
   snd("sniper");
   this.perfectlock = this._parent[mst].perfectlock;
}
else if(this._parent[tgt]._type == "ff")
{
   t = 26;
}
else
{
   snd("sniper");
}
var cancle = false;
var shootfin = false;
var EXon;
if(EXon)
{
   this._parent.attachMovie("ob_skill","xl" + this._name,this._parent.getNextHighestDepth(),{_sX:this._parent[mst]._sX,_sY:this._parent[mst]._sY,_sZ:this._parent[mst]._sZ,mst:this.mst});
}
onEnterFrame = function()
{
   holdme();
};
