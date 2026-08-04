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
         root.Sound_box.music_gpxn1.stop("gpxn1");
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
            this._sW = this._parent[mst].shotw;
            this._sH = this._parent[mst].shoth;
            var _loc6_ = new Object();
            _loc6_ = moveobj(this._parent[mst].objz,this.fx,this.fy + 0.5 * this._siz,this.fz);
            this._sZ = _loc6_.z;
            this._sX = _loc6_.x;
            this._sY = _loc6_.y;
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
            this.mz();
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
            _loc6_ = new Object();
            _loc6_ = moveobj(this._parent[mst].objz,this.fx,this.fy + 0.5 * this._siz,this.fz);
            this._sZ = _loc6_.z;
            this._sX = _loc6_.x;
            this._sY = _loc6_.y;
         }
         else
         {
            this.removeMovieClip();
         }
         var _loc7_ = false;
         var _loc10_ = mdx - this._sX;
         var _loc9_ = mdy - this._sY;
         var _loc8_ = mdz - this._sZ;
         var _loc5_ = new Object();
         _loc5_ = _global.sToc(_loc10_,_loc9_,_loc8_,this._parent[mst]._sW,this._parent[mst]._sH,this._parent[mst]._sR);
         if(_loc5_.y > 0 && Math.abs(_loc5_.x) < _global.Cmr.wrees * _loc5_.y && Math.abs(_loc5_.z) < _global.Cmr.hrees * _loc5_.y)
         {
            _loc7_ = true;
         }
         if(_loc7_)
         {
            this._alpha = 100;
            t = 0;
            if(EXon)
            {
               this._parent[mst].SPcap += 5000;
            }
            this._siz = this.sz;
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
      if(t >= 45)
      {
         if(EXon && this._parent[mst].weaponCD < 60)
         {
            this._parent[mst].weaponCD = 60;
         }
         this._parent[mst]["weapon" + this._parent[mst].weaponow].t = this._parent[mst]["weapon" + this._parent[mst].weaponow].ct;
         this._parent[mst]["weapon" + this._parent[mst].weaponow].ggCD1();
         _parent[mst].weaponhold = false;
         this.removeMovieClip();
      }
      else
      {
         t++;
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
            var _loc3_ = new Object();
            _loc3_ = moveobj(this._parent[mst].objz,this.fx,this.fy + 0.5 * this._siz,this.fz);
            this._sZ = _loc3_.z;
            this._sX = _loc3_.x;
            this._sY = _loc3_.y;
            var _loc5_ = mdx - this._sX;
            var _loc4_ = mdy - this._sY;
            var _loc6_ = mdz - this._sZ;
            this._sW = Math.atan2(_loc5_,_loc4_);
            this._sH = Math.atan2(_loc6_,distance(0,0,_loc5_,_loc4_));
         }
         else
         {
            this.removeMovieClip();
         }
         if(t % 3 == 0)
         {
            snd("fyp");
            if(this._parent[this.tgt].AI != undefined)
            {
               this._parent[this.tgt].AI.ongp(this._name);
            }
            if(this._parent[tgt]._type == "ff")
            {
               this._parent.attachMovie("dd_gsX",_name + "ddq" + t,this._parent.getNextHighestDepth(),{_sX:_sX,_sY:_sY,_sZ:_sZ,_sW:_sW,_sH:_sH,_slo:random(20) + 10,_siz:this.sz,dam:this.dam});
               this._parent[tgt].bofg = 5;
            }
            else
            {
               this._parent.attachMovie("dd_gsX",_name + "ddq" + t,this._parent.getNextHighestDepth(),{_sX:_sX,_sY:_sY,_sZ:_sZ,_sW:_sW + (random(10) - 5) * 0.001 * 3.141592653589793,_sH:_sH + (random(10) - 5) * 0.001 * 3.141592653589793,_slo:random(20) + 10,_siz:this.sz,dam:this.dam});
            }
            this._parent[_name + "ddq" + t].mst = this.mst;
            this._parent[_name + "ddq" + t].tgt = this.tgt;
            this._parent[_name + "ddq" + t].speed = this.speed;
            this._parent[_name + "ddq" + t].maxforce = this.maxforce;
            this._parent[_name + "ddq" + t].beamEXon = this.EXon;
         }
         this.mz();
      }
   }
}
function mz()
{
   if(_parent[tgt]._type == "ff" || _parent[tgt] == undefined)
   {
      var _loc12_ = null;
      var _loc6_ = this.maxforce;
      if(_parent[mst].onkf == 0)
      {
         for(var _loc15_ in _root.cmrs)
         {
            if(_root.cmrs[_loc15_]._type != "ff" && _root.cmrs[_loc15_]._force == this.tgt_force)
            {
               var _loc10_ = _root.cmrs[_loc15_]._sX - this._sX;
               var _loc9_ = _root.cmrs[_loc15_]._sY - this._sY;
               var _loc8_ = _root.cmrs[_loc15_]._sZ - this._sZ;
               var _loc11_ = dist_3d(0,0,0,_loc10_,_loc9_,_loc8_);
               var _loc7_ = false;
               var _loc5_ = new Object();
               _loc5_ = _global.sToc(_loc10_,_loc9_,_loc8_,this._parent[mst]._sW,this._parent[mst]._sH,this._parent[mst]._sR);
               if(_loc5_.y > 0 && Math.abs(_loc5_.x) < _global.Cmr.wrees * _loc5_.y && Math.abs(_loc5_.z) < _global.Cmr.hrees * _loc5_.y)
               {
                  _loc7_ = true;
               }
               if(_loc7_ && _loc11_ < _loc6_)
               {
                  _loc12_ = _loc15_;
                  _loc6_ = _loc11_;
               }
            }
         }
      }
      for(_loc15_ in _root.cmrs)
      {
         if(_root.cmrs[_loc15_]._type == "ff" && _root.cmrs[_loc15_]._force == this.tgt_force && this._parent[_loc15_].bofg == 0)
         {
            _loc10_ = _root.cmrs[_loc15_]._sX - this._sX;
            _loc9_ = _root.cmrs[_loc15_]._sY - this._sY;
            _loc8_ = _root.cmrs[_loc15_]._sZ - this._sZ;
            _loc11_ = dist_3d(0,0,0,_loc10_,_loc9_,_loc8_);
            _loc7_ = false;
            _loc5_ = new Object();
            _loc5_ = _global.sToc(_loc10_,_loc9_,_loc8_,this._parent[mst]._sW,this._parent[mst]._sH,this._parent[mst]._sR);
            if(_loc5_.y > 0 && Math.abs(_loc5_.x) < _global.Cmr.wrees * _loc5_.y && Math.abs(_loc5_.z) < _global.Cmr.hrees * _loc5_.y)
            {
               _loc7_ = true;
            }
            if(_loc7_ && _loc11_ < _loc6_)
            {
               _loc12_ = _loc15_;
               _loc6_ = _loc11_;
            }
         }
      }
      this.tgt = _loc12_;
   }
   if(_parent[tgt] != undefined)
   {
      var _loc14_ = null;
      var _loc22_ = false;
      var _loc16_ = false;
      if(tgt == _root.jiemiam.mst)
      {
         _root.jiemiam.hkxsq[mst].jiantou.fs = true;
      }
      var _loc21_ = _parent[tgt]._sX - this._sX;
      var _loc20_ = _parent[tgt]._sY - this._sY;
      var _loc18_ = _parent[tgt]._sZ - this._sZ;
      var _loc19_ = dist_3d(0,0,0,_loc21_,_loc20_,_loc18_);
      if(this._parent[mst].tgt == this.tgt)
      {
         _loc14_ = _loc19_ / speed;
         _loc22_ = this._parent[mst].lockon;
         _loc16_ = this._parent[mst].covon;
      }
      else
      {
         var _loc13_ = new Object();
         _loc13_ = _global.sToc(_loc21_,_loc20_,_loc18_,this._parent[mst]._sW,this._parent[mst]._sH,this._parent[mst]._sR);
         if(_loc13_.y > 0 && Math.abs(_loc13_.x) < _global.Cmr.wrees * _loc13_.y && Math.abs(_loc13_.z) < _global.Cmr.hrees * _loc13_.y)
         {
            _loc16_ = true;
         }
         else
         {
            _loc16_ = false;
         }
         _loc14_ = _loc19_ / speed;
         _loc22_ = false;
      }
      var _loc25_ = _parent[tgt].v._sX;
      var _loc24_ = _parent[tgt].v._sY;
      var _loc23_ = _parent[tgt].v._sZ;
      if(_loc16_)
      {
         mdx = _loc25_ * (_loc14_ + 3) + _parent[tgt]._sX;
         mdy = _loc24_ * (_loc14_ + 3) + _parent[tgt]._sY;
         mdz = _loc23_ * (_loc14_ + 3) + _parent[tgt]._sZ;
         if(EXon)
         {
            mdx += random(201) - 100;
            mdy += random(201) - 100;
            mdz += random(201) - 100;
         }
      }
      else
      {
         var _loc17_ = new Object();
         _loc17_ = _global.cTos(0,maxforce,0,this._sW,this._sH,0);
         mdx = _loc17_.x + this._parent[mst]._sX;
         mdy = _loc17_.y + this._parent[mst]._sY;
         mdz = _loc17_.z + this._parent[mst]._sZ;
      }
   }
   else
   {
      _loc17_ = new Object();
      _loc17_ = _global.cTos(0,maxforce,0,this._sW,this._sH,0);
      mdx = _loc17_.x + this._parent[mst]._sX;
      mdy = _loc17_.y + this._parent[mst]._sY;
      mdz = _loc17_.z + this._parent[mst]._sZ;
   }
}
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
   t = 25;
}
else
{
   snd("gpxn1");
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
