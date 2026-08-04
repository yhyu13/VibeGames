function holdme()
{
   if(!stopAll)
   {
      t++;
      if(t > 150)
      {
         if(this._parent[mst].weaponCD < 60)
         {
            this._parent[mst].weaponCD = 60;
         }
         _parent[mst].weaponhold = false;
         this._parent[mst]["weapon" + this._parent[mst].weaponow].t = this._parent[mst]["weapon" + this._parent[mst].weaponow].ct;
         this.removeMovieClip();
      }
      else if(_parent[mst] != undefined)
      {
         this._parent[mst]["weapon" + this._parent[mst].weaponow].xpon = true;
         this._parent[mst].atton = 5;
         this._parent[mst].fenshenon = true;
         this._parent[mst].spEX = 30;
         this._alpha = 100;
         if(this._slo > 0)
         {
            this._sZ += this.basez;
            this._sX += this.basex;
            this._sY += this.basey;
            this._slo += speed;
         }
         else
         {
            this._alpha = 0;
         }
         if(this._slo > maxforce)
         {
            this._parent.attachMovie("line",this._name + "s" + t,this._parent.getNextHighestDepth(),{_sX:this._sX,_sY:this._sY,_sZ:this._sZ,_slo:this._slo,_sW:this._sW,_sH:this._sH,_siz:this._siz,_sizz:this._sizz,speed:this.speed});
            this._parent[this._name + "s" + t].onEnterFrame = function()
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
            this._slo = -1;
            this._sX2 = null;
            this._sY2 = null;
            this._sZ2 = null;
         }
         if(this._slo < 0 && this.shooton)
         {
            var _loc5_ = new Object();
            _loc5_ = moveobj(this._parent[mst].objz,this.fx,this.fy + 0.5 * this._siz,this.fz);
            this._sZ = _loc5_.z;
            this._sX = _loc5_.x;
            this._sY = _loc5_.y;
            this._slo = 1;
            snd("gsqs");
            this._sW = this._parent[mst].shotw;
            this._sH = this._parent[mst].shoth;
            if(this._parent[this.mst].v != undefined)
            {
               this.basex = this._parent[this.mst].v._sX;
               this.basey = this._parent[this.mst].v._sY;
               this.basez = this._parent[this.mst].v._sZ;
            }
            if(this._parent[mst].covon)
            {
               if(this._parent[this.tgt].AI != undefined)
               {
                  this._parent[this.tgt].AI.onshoot(this.mst);
               }
            }
         }
         this.shooton = false;
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
               }
               else
               {
                  this._parent[tgt].onhit(this.dam,this.mst);
                  this._parent.attachMovie("bo_8",this._name + "bo" + this.tgt + t,this._parent.getNextHighestDepth(),{_sX:_loc3_._sX,_sY:_loc3_._sY,_sZ:_loc3_._sZ,mst:this.tgt});
                  this._parent[tgt].hitbo(90);
                  if(_parent[tgt].spEX == 0)
                  {
                     this._parent[tgt].weaponCD = 150;
                     _parent[tgt].vX = 0;
                     _parent[tgt].vY = 0;
                     _parent[tgt].vZ = 0;
                  }
                  mz = true;
                  this._parent[mst].SPcap += 5000;
                  t = 0;
                  this._parent.attachMovie("line",this._name + "s" + t,this._parent.getNextHighestDepth(),{_sX:this._sX,_sY:this._sY,_sZ:this._sZ,_slo:this._slo,_sW:this._sW,_sH:this._sH,_siz:this._siz,_sizz:this._sizz,speed:this.speed});
                  this._parent[this._name + "s" + t].onEnterFrame = function()
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
                  this._parent.attachMovie("ob_skill","xl" + this._name,this._parent.getNextHighestDepth(),{_sX:this._parent[mst]._sX,_sY:this._parent[mst]._sY,_sZ:this._parent[mst]._sZ,mst:this.mst});
                  onEnterFrame = function()
                  {
                     overme();
                  };
               }
            }
         }
      }
      else
      {
         this.removeMovieClip();
      }
   }
}
function overme()
{
   if(!stopAll)
   {
      t++;
      if(t > 150)
      {
         if(this._parent[mst].weaponCD < 60)
         {
            this._parent[mst].weaponCD = 60;
         }
         this._parent[mst]["weapon" + this._parent[mst].weaponow].t = this._parent[mst]["weapon" + this._parent[mst].weaponow].ct;
         _parent[mst].weaponhold = false;
         this.removeMovieClip();
      }
      if(this._parent[mst] != undefined)
      {
         this._alpha = 0;
         this._parent[mst].AMBAC = -5;
         this._parent[mst].turnto(this._parent[this.tgt]);
         this._parent[mst].AMBAC = 10;
         this._parent[mst].weaponCD = 30;
         this._parent[mst].doHy(30);
         this._parent[mst].spEX = 30;
         if(t < 30 && this._parent[mst].dst > 2000)
         {
            this._parent[mst].vZ = this._parent[mst].maxspeed * Math.sin(this._parent[mst]._sH);
            var _loc4_ = this._parent[mst].maxspeed * Math.cos(this._parent[mst]._sH);
            this._parent[mst].vX = _loc4_ * Math.sin(this._parent[mst]._sW);
            this._parent[mst].vY = _loc4_ * Math.cos(this._parent[mst]._sW);
         }
         if(this._parent[this.tgt] != undefined && mz && retujii > 0)
         {
            this._parent[mst]._rW = 0;
            this._parent[mst]._rH = 0;
            this._parent[mst]._rR = 0;
            if(t >= 30)
            {
               if(fsiz < 1)
               {
                  quandan();
               }
               else
               {
                  tujiit();
               }
            }
            else if(tgt == _root.jiemiam.mst)
            {
               _root.jiemiam.hkxsq[mst].jiantou.play();
            }
            this._parent[mst].vZ -= 0.5 * this._parent[mst].v._sZ;
            this._parent[mst].vX -= 0.5 * this._parent[mst].v._sX;
            this._parent[mst].vY -= 0.5 * this._parent[mst].v._sY;
         }
         else
         {
            if(this._parent[mst].weaponCD < 60)
            {
               this._parent[mst].weaponCD = 60;
            }
            this._parent[mst]["weapon" + this._parent[mst].weaponow].t = this._parent[mst]["weapon" + this._parent[mst].weaponow].ct;
            _parent[mst].weaponhold = false;
            this.removeMovieClip();
         }
      }
      else
      {
         this.removeMovieClip();
      }
   }
}
function hits()
{
   if(this._parent[mst].ntact == 0)
   {
      this._parent[mst].ntact = -5;
   }
   if(fsiz == 1 && t == 10)
   {
      var _loc5_ = _parent[tgt]._sX - this._parent[mst]._sX;
      var _loc4_ = _parent[tgt]._sY - this._parent[mst]._sY;
      var _loc7_ = _parent[tgt]._sZ - this._parent[mst]._sZ;
      dst = dist_3d(0,0,0,_loc5_,_loc4_,_loc7_);
      var _loc8_ = (dst + 200) / 200;
      _loc5_ += _parent[tgt].v._sX * _loc8_;
      _loc4_ += _parent[tgt].v._sY * _loc8_;
      _loc7_ += _parent[tgt].v._sZ * _loc8_;
      var _loc9_ = Math.atan2(_loc5_,_loc4_);
      var _loc10_ = Math.atan2(_loc7_,distance(0,0,_loc5_,_loc4_));
      var _loc6_ = new Object();
      _loc6_ = _global.moveobj(this._parent[mst].objz,this.fx,this.fy,this.fz);
      snd("gsqs");
      this._parent.attachMovie("dd_fygs",_name + retujii + "dd" + t,this._parent.getNextHighestDepth(),{_sX:_loc6_.x,_sY:_loc6_.y,_sZ:_loc6_.z,_sW:_loc9_,_sH:_loc10_,_slo:random(20) + 10,_siz:2,dam:this.dam});
      this._parent[_name + retujii + "dd" + t].mst = this.mst;
      this._parent[_name + retujii + "dd" + t].tgt = this.tgt;
      this._parent[_name + retujii + "dd" + t].basex = this._parent[mst].v._sX;
      this._parent[_name + retujii + "dd" + t].basey = this._parent[mst].v._sY;
      this._parent[_name + retujii + "dd" + t].basez = this._parent[mst].v._sZ;
      this._parent[mst].atton = 5;
   }
   if(fsiz == 2 && t >= 8)
   {
      if(t % 2 == 0)
      {
         _loc5_ = _parent[tgt]._sX - this._parent[mst]._sX;
         _loc4_ = _parent[tgt]._sY - this._parent[mst]._sY;
         _loc7_ = _parent[tgt]._sZ - this._parent[mst]._sZ;
         dst = dist_3d(0,0,0,_loc5_,_loc4_,_loc7_);
         _loc8_ = (dst + 60) / 90;
         _loc5_ += (_parent[tgt].v._sX - _parent[mst].v._sX) * _loc8_;
         _loc4_ += (_parent[tgt].v._sY - _parent[mst].v._sY) * _loc8_;
         _loc7_ += (_parent[tgt].v._sZ - _parent[mst].v._sZ) * _loc8_;
         _loc9_ = Math.atan2(_loc5_,_loc4_);
         _loc10_ = Math.atan2(_loc7_,distance(0,0,_loc5_,_loc4_));
         _loc6_ = new Object();
         _loc6_ = _global.moveobj(this._parent[mst].objz,this.fx,this.fy,this.fz);
         snd("minigun1");
         this._parent.attachMovie("dd_cartridge",_name + retujii + "dd" + t,this._parent.getNextHighestDepth(),{_sX:_loc6_.x,_sY:_loc6_.y,_sZ:_loc6_.z,_sW:_loc9_,_sH:_loc10_,_slo:90,_siz:0.01,_sizz:80,dam:this.dam});
         this._parent[_name + retujii + "dd" + t].mst = this.mst;
         this._parent[_name + retujii + "dd" + t].tgt = this.tgt;
         this._parent[_name + retujii + "dd" + t].maxforce = 1500;
         this._parent[_name + retujii + "dd" + t].speed = 90;
         if(this.fn > 1)
         {
            _loc6_ = _global.moveobj(this._parent[mst].objz,- this.fx,this.fy,this.fz);
            this._parent.attachMovie("dd_cartridge",_name + retujii + "ddd" + t,this._parent.getNextHighestDepth(),{_sX:_loc6_.x,_sY:_loc6_.y,_sZ:_loc6_.z,_sW:_loc9_,_sH:_loc10_,_slo:90,_siz:0.01,_sizz:80,dam:this.dam});
            this._parent[_name + retujii + "ddd" + t].mst = this.mst;
            this._parent[_name + retujii + "ddd" + t].tgt = this.tgt;
            this._parent[_name + retujii + "ddd" + t].maxforce = 1500;
            this._parent[_name + retujii + "ddd" + t].speed = 90;
         }
         this._parent[mst].atton = 5;
      }
   }
   if(fsiz == 3 && t >= 9 && t % 3 == 0)
   {
      _loc5_ = _parent[tgt]._sX - this._parent[mst]._sX;
      _loc4_ = _parent[tgt]._sY - this._parent[mst]._sY;
      _loc7_ = _parent[tgt]._sZ - this._parent[mst]._sZ;
      dst = dist_3d(0,0,0,_loc5_,_loc4_,_loc7_);
      _loc8_ = (dst + 100) / 100;
      _loc5_ += _parent[tgt].v._sX * _loc8_;
      _loc4_ += _parent[tgt].v._sY * _loc8_;
      _loc7_ += _parent[tgt].v._sZ * _loc8_;
      _loc9_ = Math.atan2(_loc5_,_loc4_);
      _loc10_ = Math.atan2(_loc7_,distance(0,0,_loc5_,_loc4_));
      _loc6_ = new Object();
      _loc6_ = _global.moveobj(this._parent[mst].objz,this.fx,this.fy,this.fz);
      snd("gsq");
      this._parent.attachMovie("dd_fygsX",_name + retujii + "dd" + t,this._parent.getNextHighestDepth(),{_sX:_loc6_.x,_sY:_loc6_.y,_sZ:_loc6_.z,_sW:_loc9_,_sH:_loc10_,_slo:random(20) + 10,_siz:0.5,dam:this.dam});
      this._parent[_name + retujii + "dd" + t].mst = this.mst;
      this._parent[_name + retujii + "dd" + t].tgt = this.tgt;
      this._parent[_name + retujii + "dd" + t].basex = this._parent[mst].v._sX;
      this._parent[_name + retujii + "dd" + t].basey = this._parent[mst].v._sY;
      this._parent[_name + retujii + "dd" + t].basez = this._parent[mst].v._sZ;
      this._parent[mst].atton = 5;
   }
   if(fsiz == 4 && t >= 12 && t % 3 == 0)
   {
      _loc5_ = _parent[tgt]._sX - this._parent[mst]._sX;
      _loc4_ = _parent[tgt]._sY - this._parent[mst]._sY;
      _loc7_ = _parent[tgt]._sZ - this._parent[mst]._sZ;
      dst = dist_3d(0,0,0,_loc5_,_loc4_,_loc7_);
      _loc8_ = (dst + 50) / 50;
      _loc5_ += _parent[tgt].v._sX * _loc8_;
      _loc4_ += _parent[tgt].v._sY * _loc8_;
      _loc7_ += _parent[tgt].v._sZ * _loc8_;
      _loc9_ = Math.atan2(_loc5_,_loc4_);
      _loc10_ = Math.atan2(_loc7_,distance(0,0,_loc5_,_loc4_));
      _loc6_ = new Object();
      _loc6_ = _global.moveobj(this._parent[mst].objz,this.fx,this.fy,this.fz);
      snd("zdfs");
      this._parent.attachMovie("dd_zd",_name + "dd" + t,this._parent.getNextHighestDepth(),{_sX:_loc6_.x,_sY:_loc6_.y,_sZ:_loc6_.z,_sW:_loc9_ + (random(10) - 5) * 0.001 * 3.141592653589793,_sH:_loc10_ + (random(10) - 5) * 0.001 * 3.141592653589793,htime:30,_siz:2,dam:this.dam,_slo:4,_sizz:0.3});
      this._parent[_name + "dd" + t].mst = this.mst;
      this._parent[_name + "dd" + t].tgt = this.tgt;
      this._parent[_name + "dd" + t].maxforce = 2000;
      this._parent[_name + "dd" + t].speed = 50;
      this._parent[_name + "dd" + t].fsiz = 2;
      this._parent[_name + "dd" + t].rx = random(25) - 12;
      this._parent[_name + "dd" + t].ry = random(25) - 12;
      this._parent[_name + "dd" + t].rz = random(25) - 12;
      this._parent[mst].atton = 5;
   }
}
function quandan()
{
   if(this._parent[mst].ntact == 0)
   {
      this._parent[mst].ntact = -5;
   }
   if(t % 10 == 0 && t % 60 >= 30)
   {
      var _loc10_ = _parent[tgt]._sX - this._parent[mst]._sX;
      var _loc6_ = _parent[tgt]._sY - this._parent[mst]._sY;
      var _loc5_ = _parent[tgt]._sZ - this._parent[mst]._sZ;
      dst = dist_3d(0,0,0,_loc10_,_loc6_,_loc5_);
      var _loc7_ = (dst + 200) / 200;
      _loc10_ += _parent[tgt].v._sX * _loc7_;
      _loc6_ += _parent[tgt].v._sY * _loc7_;
      _loc5_ += _parent[tgt].v._sZ * _loc7_;
      var _loc8_ = Math.atan2(_loc10_,_loc6_);
      var _loc9_ = Math.atan2(_loc5_,distance(0,0,_loc10_,_loc6_));
      var _loc4_ = new Object();
      _loc4_ = _global.moveobj(this._parent[mst].objz,this.fx,this.fy,this.fz);
      snd("gsqs");
      this._parent.attachMovie("dd_fygs",_name + "dd" + t,this._parent.getNextHighestDepth(),{_sX:_loc4_.x,_sY:_loc4_.y,_sZ:_loc4_.z,_sW:_loc8_,_sH:_loc9_,_slo:random(20) + 10,_siz:2,dam:this.dam});
      this._parent[_name + "dd" + t].mst = this.mst;
      this._parent[_name + "dd" + t].tgt = this.tgt;
      this._parent[_name + "dd" + t].basex = this._parent[mst].v._sX;
      this._parent[_name + "dd" + t].basey = this._parent[mst].v._sY;
      this._parent[_name + "dd" + t].basez = this._parent[mst].v._sZ;
      this._parent[mst].atton = 5;
   }
   if(t % 5 == 0 && t % 60 < 30)
   {
      snd("zdfs");
      _loc10_ = _parent[tgt]._sX - this._parent[mst]._sX;
      _loc6_ = _parent[tgt]._sY - this._parent[mst]._sY;
      _loc5_ = _parent[tgt]._sZ - this._parent[mst]._sZ;
      dst = dist_3d(0,0,0,_loc10_,_loc6_,_loc5_);
      _loc7_ = 10 + dst / 75;
      _loc4_ = _global.moveobj(this._parent[mst].objz,this.fx,this.fy,this.fz);
      this._parent.attachMovie("dd_zd",_name + "dd" + t,this._parent.getNextHighestDepth(),{_sX:_loc4_.x,_sY:_loc4_.y,_sZ:_loc4_.z,_sW:this._parent[mst]._sW + (random(10) - 5) * 0.002 * 3.141592653589793,_sH:this._parent[mst]._sH + (random(10) - 5) * 0.002 * 3.141592653589793,htime:_loc7_,_siz:2,dam:this.dam,_slo:4,_sizz:0.3});
      this._parent[_name + "dd" + t].mst = this.mst;
      this._parent[_name + "dd" + t].tgt = this.tgt;
      this._parent[_name + "dd" + t].maxforce = 3000;
      this._parent[_name + "dd" + t].speed = 75;
      this._parent[_name + "dd" + t].fsiz = 2;
      this._parent[_name + "dd" + t].rx = random(25) - 12;
      this._parent[_name + "dd" + t].ry = random(25) - 12;
      this._parent[_name + "dd" + t].rz = random(25) - 12;
      this._parent[mst].atton = 5;
   }
}
function tujiit()
{
   if(_parent[mst] != undefined)
   {
      this.t = 0;
      if(_parent[tgt] != undefined)
      {
         var _loc5_ = _parent[tgt]._sX - _parent[mst]._sX;
         var _loc4_ = _parent[tgt]._sY - _parent[mst]._sY;
         var _loc3_ = _parent[tgt]._sZ - _parent[mst]._sZ;
         this.dst = dist_3d(0,0,0,_loc5_,_loc4_,_loc3_);
      }
      this._parent[mst].GDon = true;
      onEnterFrame = function()
      {
         tuji();
      };
   }
   else
   {
      this.removeMovieClip();
   }
}
function retuji()
{
   if(!stopAll)
   {
      t++;
      if(_parent[mst] != undefined)
      {
         this._parent[mst].fenshenon = true;
         this._sX = this._parent[mst]._sX;
         this._sY = this._parent[mst]._sY;
         this._sZ = this._parent[mst]._sZ;
         this._parent[mst].doHy(30);
         this._parent[mst].spEX = 30;
         this._parent[mst].weaponCD = 30;
         this._parent[mst].scmrfg = -5;
         this._parent[mst].scmrtgt = tgt;
         this._parent[mst].scmrtgtd = 0.3;
         hits();
         if(t == 5)
         {
            if(this._parent[mst]._type == "TMS" || this._parent[mst]._type == "MS")
            {
               this._parent[mst].AMBAC = -30;
               this._parent[mst].doAMBAC(this._parent[this.tgt]);
            }
            else
            {
               var _loc4_ = new Object();
               _loc4_ = _global.sToc(_parent[tgt]._sX - this._parent[mst]._sX,_parent[tgt]._sY - this._parent[mst]._sY,_parent[tgt]._sZ - this._parent[mst]._sZ,this._parent[mst]._sW,this._parent[mst]._sH,this._parent[mst]._sR);
               this._parent[mst].wwill = Math.atan2(_loc4_.x,_loc4_.y);
               this._parent[mst].hwill = Math.atan2(_loc4_.z,_global.distance(0,0,_loc4_.x,_loc4_.y));
               this._parent[mst].AMBAC = 10;
            }
         }
         else if(t > 10)
         {
            this._parent[mst].AMBAC = -5;
            this._parent[mst].turnto(this._parent[this.tgt]);
            this._parent[mst].AMBAC = 10;
         }
         else if(t < 5)
         {
            this._parent[mst].AMBAC = 5;
            this._parent[mst].vZ = this._parent[mst].maxspeed * Math.sin(this._parent[mst]._sH);
            var _loc5_ = this._parent[mst].maxspeed * Math.cos(this._parent[mst]._sH);
            this._parent[mst].vX = _loc5_ * Math.sin(this._parent[mst]._sW);
            this._parent[mst].vY = _loc5_ * Math.cos(this._parent[mst]._sW);
         }
         if(t == 15)
         {
            retujii--;
            if(retujii > 0)
            {
               t = 0;
               tujiit();
            }
            else
            {
               this.t = 0;
               onEnterFrame = function()
               {
                  overme();
               };
            }
         }
      }
      else
      {
         this.removeMovieClip();
      }
   }
}
function tuji()
{
   if(!stopAll)
   {
      if(t > 150 || _parent[tgt] == undefined || this._parent[mst].tgt != this.tgt || this._parent[mst]._zt == "broken")
      {
         this.t = 0;
         mz = false;
         onEnterFrame = function()
         {
            overme();
         };
      }
      else if(!_parent[mst].GDon)
      {
         if(mz)
         {
            this.t = 0;
            onEnterFrame = function()
            {
               retuji();
            };
         }
         else
         {
            this.t = 0;
            onEnterFrame = function()
            {
               overme();
            };
         }
      }
      t++;
      if(_parent[mst] != undefined)
      {
         this._parent[mst].fenshenon = true;
         if(retujii < 6)
         {
            this._parent[mst].scmrfg = -5;
            this._parent[mst].scmrtgt = tgt;
            this._parent[mst].scmrtgtd = 0.3;
         }
         this._sX = this._parent[mst]._sX;
         this._sY = this._parent[mst]._sY;
         this._sZ = this._parent[mst]._sZ;
         this._parent[mst].doHy(30);
         this._parent[mst].spEX = 30;
         this._parent[mst].weaponCD = 30;
         var _loc5_ = _parent[tgt]._sX - _parent[mst]._sX;
         var _loc4_ = _parent[tgt]._sY - _parent[mst]._sY;
         var _loc3_ = _parent[tgt]._sZ - _parent[mst]._sZ;
         this.dst = dist_3d(0,0,0,_loc5_,_loc4_,_loc3_);
         if(this.dst <= 300)
         {
            if(this._parent[this.tgt].AI != undefined)
            {
               this._parent[this.tgt].AI.ongd(this._name);
            }
         }
         if(this.dst <= 100)
         {
            this.t = 0;
            this._parent[tgt].hitbo(60);
            _parent[mst].GDon = false;
            if(retujii > 0)
            {
               onEnterFrame = function()
               {
                  retuji();
               };
            }
            else
            {
               onEnterFrame = function()
               {
                  overme();
               };
            }
         }
      }
      else
      {
         this.removeMovieClip();
      }
   }
}
this._glow = this._siz * 0.5;
var boi = 0;
var mst;
var tgt;
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
var fn;
var fsiz;
if(fsiz == null)
{
   fsiz == 1;
}
this._slo = 1;
this._sR = 0;
var t = 0;
var hq = 10;
var mz = false;
var shooton = true;
if(this._parent[tgt]._size == "L")
{
   this.hq = 15;
}
else if(this._parent[tgt]._size == "S")
{
   this.hq = 5;
}
var cancle = false;
var basex = 0;
var basey = 0;
var basez = 0;
if(this._parent[this.mst].v != undefined)
{
   this.basex = this._parent[this.mst].v._sX;
   this.basey = this._parent[this.mst].v._sY;
   this.basez = this._parent[this.mst].v._sZ;
}
onEnterFrame = function()
{
   holdme();
};
snd("gsqs");
var retujii = 6;
