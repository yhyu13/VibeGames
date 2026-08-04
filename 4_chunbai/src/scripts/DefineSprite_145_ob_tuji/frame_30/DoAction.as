function doit()
{
   if(_parent[mst] != undefined)
   {
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
         fsme();
      };
   }
   else
   {
      this.removeMovieClip();
   }
}
function redo()
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
         this._parent[mst].spEX = 30;
         this._parent[mst].doHy(30);
         this._parent[mst].weaponCD = 30;
         this._parent[mst].scmrfg = -5;
         this._parent[mst].scmrtgt = tgt;
         this._parent[mst].scmrtgtd = 0.3;
         if(this.tujifalse)
         {
            this.tujifalse = false;
            this._parent[mst].vX *= 0.5;
            this._parent[mst].vZ *= 0.5;
            this._parent[mst].vZ *= 0.5;
         }
         if(t == this.at + 5)
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
         else if(t > this.at + 10)
         {
            this._parent[mst].AMBAC = -5;
            this._parent[mst].turnto(this._parent[this.tgt]);
            this._parent[mst].AMBAC = 10;
         }
         else if(t < this.at + 5)
         {
            this._parent[mst].AMBAC = 5;
            this._parent[mst].vZ = this._parent[mst].maxspeed * Math.sin(this._parent[mst]._sH);
            var _loc5_ = this._parent[mst].maxspeed * Math.cos(this._parent[mst]._sH);
            this._parent[mst].vX = _loc5_ * Math.sin(this._parent[mst]._sW);
            this._parent[mst].vY = _loc5_ * Math.cos(this._parent[mst]._sW);
         }
         if(t == this.at + 15)
         {
            this.at = this.t;
            doit();
         }
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
      if(t > this.maxt || _parent[tgt] == undefined || this._parent[mst].tgt != this.tgt || this._parent[mst]._zt == "broken")
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
            this.at = this.t;
            this.tujifalse = true;
            onEnterFrame = function()
            {
               redo();
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
      if(t > 210)
      {
         redoi = 0;
      }
      if(_parent[mst] != undefined)
      {
         if(mz)
         {
            this._parent[mst].fenshenon = true;
            this._parent[mst].scmrfg = -5;
            this._parent[mst].scmrtgt = tgt;
            this._parent[mst].scmrtgtd = 0.3;
         }
         this._sX = this._parent[mst]._sX;
         this._sY = this._parent[mst]._sY;
         this._sZ = this._parent[mst]._sZ;
         this._parent[mst].spEX = 30;
         this._parent[mst].doHy(30);
         this._parent[mst].weaponCD = 30;
         var _loc7_ = _parent[tgt]._sX - _parent[mst]._sX;
         var _loc6_ = _parent[tgt]._sY - _parent[mst]._sY;
         var _loc5_ = _parent[tgt]._sZ - _parent[mst]._sZ;
         this.dst = dist_3d(0,0,0,_loc7_,_loc6_,_loc5_);
         if(this.dst <= 300)
         {
            if(this._parent[this.tgt].AI != undefined)
            {
               this._parent[this.tgt].AI.ongd(this._name);
            }
            if(gjopen)
            {
               this._parent[mst].GDdd = 5;
            }
         }
         if(this.dst <= this.hq || mz && this.dst <= this.hq + this.txsz * 10)
         {
            mz = false;
            if(fsiz == 6 && redoi > 0)
            {
               mz = true;
               this._parent[mst].SPcap += 1000;
               this._parent[tgt].onhit(this.dam,this.mst);
               this._parent[mst].atton = 5;
               if(_parent[tgt].hypt <= 0)
               {
                  this._parent[tgt].vZ = 0;
                  this._parent[tgt].vX = 0;
                  this._parent[tgt].vY = 0;
                  this._parent[tgt].hitbo(90);
                  this._parent[tgt].weaponCD = 90;
                  this._parent.attachMovie("bo_7",this._name + "bo" + redoi,this._parent.getNextHighestDepth(),{_sX:0.5 * (this._sX + this._parent[tgt]._sX),_sY:0.5 * (this._sY + this._parent[tgt]._sY),_sZ:0.5 * (this._sZ + this._parent[tgt]._sZ),mst:this.tgt});
               }
               else if(this._parent[tgt].GDdd > 0)
               {
                  if(this._parent[this.mst + "pk" + this.tgt] == undefined && this._parent[this.tgt + "pk" + this.mst] == undefined)
                  {
                     this._parent.attachMovie("ob_pd",this.mst + "pk" + this.tgt,this._parent.getNextHighestDepth(),{_sX:0.5 * (this._parent[mst]._sX + this._parent[tgt]._sX),_sY:0.5 * (this._parent[mst]._sY + this._parent[tgt]._sY),_sZ:0.5 * (this._parent[mst]._sZ + this._parent[tgt]._sZ),_sW:this._parent[mst]._sW,_sH:this._parent[mst]._sH,_sR:this._parent[mst]._sR,tgt1:this.mst,tgt2:this.tgt});
                     snd("snd_gjk2");
                  }
               }
               else
               {
                  this._parent.attachMovie("bo_7",this._name + "bo" + redoi,this._parent.getNextHighestDepth(),{_sX:0.5 * (this._sX + this._parent[tgt]._sX),_sY:0.5 * (this._sY + this._parent[tgt]._sY),_sZ:0.5 * (this._sZ + this._parent[tgt]._sZ),mst:this.tgt});
               }
               if(this._parent[mst]._type == "TMA")
               {
                  this._parent[mst].AMBAC = -30;
                  this._parent[mst].doTran();
               }
               else if(this._parent[mst]._type != "TMA")
               {
                  if(this.wptx == "tx_axe2")
                  {
                     gjopen = true;
                     this._parent.attachMovie("tx_axe",_name + redoi + "jy" + t,this._parent.getNextHighestDepth(),{_sX:this._parent[mst]._sX,_sY:this._parent[mst]._sY,_sZ:this._parent[mst]._sZ,mst:this.mst});
                     this._parent[_name + redoi + "jy" + t].sz = this.txsz;
                     this._parent.attachMovie("tx_axe",_name + redoi + "jyy" + t,this._parent.getNextHighestDepth(),{_sX:this._parent[mst]._sX,_sY:this._parent[mst]._sY,_sZ:this._parent[mst]._sZ,mst:this.mst});
                     this._parent[_name + redoi + "jyy" + t].sz = this.txsz;
                  }
                  else if(this.wptx == "tx_bs2")
                  {
                     gjopen = true;
                     this._parent.attachMovie("tx_bs1",_name + redoi + "jy" + t,this._parent.getNextHighestDepth(),{_sX:this._parent[mst]._sX,_sY:this._parent[mst]._sY,_sZ:this._parent[mst]._sZ,mst:this.mst});
                     this._parent[_name + redoi + "jy" + t].sz = this.txsz;
                     this._parent.attachMovie("tx_bs2",_name + redoi + "jyy" + t,this._parent.getNextHighestDepth(),{_sX:this._parent[mst]._sX,_sY:this._parent[mst]._sY,_sZ:this._parent[mst]._sZ,mst:this.mst});
                     this._parent[_name + redoi + "jyy" + t].sz = this.txsz;
                  }
                  else if(this.wptx != null)
                  {
                     gjopen = true;
                     this._parent.attachMovie(this.wptx,_name + redoi + "jy" + t,this._parent.getNextHighestDepth(),{_sX:this._parent[mst]._sX,_sY:this._parent[mst]._sY,_sZ:this._parent[mst]._sZ,mst:this.mst});
                     this._parent[_name + redoi + "jy" + t].sz = this.txsz;
                  }
               }
               this.at = this.t;
               redoi--;
               _parent[mst].GDon = false;
               onEnterFrame = function()
               {
                  redo();
               };
            }
            else
            {
               if(this._parent[tgt]._type == "ff")
               {
                  this._parent[tgt].onhit(this.dam,this.mst);
                  this._parent.attachMovie("bo_7",this._name + "bo" + t,this._parent.getNextHighestDepth(),{_sX:0.5 * (this._sX + this._parent[tgt]._sX),_sY:0.5 * (this._sY + this._parent[tgt]._sY),_sZ:0.5 * (this._sZ + this._parent[tgt]._sZ),mst:this.tgt});
               }
               else
               {
                  if(fsiz < 1)
                  {
                     this._parent[tgt].onhit(this.dam,this.mst);
                  }
                  if(_parent[tgt].hypt == 0)
                  {
                     this._parent[tgt].vZ = 0;
                     this._parent[tgt].vX = 0;
                     this._parent[tgt].vY = 0;
                     this._parent[tgt].hitbo();
                     this._parent[tgt].hypt = -5;
                     this._parent.attachMovie("bo_7",this._name + "bo" + t,this._parent.getNextHighestDepth(),{_sX:0.5 * (this._sX + this._parent[tgt]._sX),_sY:0.5 * (this._sY + this._parent[tgt]._sY),_sZ:0.5 * (this._sZ + this._parent[tgt]._sZ),mst:this.tgt});
                     mz = true;
                     this._parent[mst].SPcap += 5000;
                     this._parent[this.tgt].Bindtgt = this._parent[mst].objz;
                     this._parent[this.tgt].Bind_X = this.fx;
                     this._parent[this.tgt].Bind_Y = this.fy + 5;
                     this._parent[this.tgt].Bind_Z = this.fz;
                     var _loc4_ = new Object();
                     _loc4_ = _global.aToa(this._parent[tgt]._sW,this._parent[tgt]._sH,this._parent[tgt]._sR,this._parent[mst].objz._sW,this._parent[mst].objz._sH,this._parent[mst].objz._sR);
                     this.CsW = _loc4_.w;
                     this.CsH = _loc4_.h;
                     this.CsR = _loc4_.r;
                     this._parent[this.tgt].Bind_W = this.CsW;
                     this._parent[this.tgt].Bind_H = this.CsH;
                     this._parent[this.tgt].Bind_R = this.CsR;
                  }
               }
               this.t = 0;
               _parent[mst].GDon = false;
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
function overme()
{
   if(!stopAll)
   {
      t++;
      if(t > 90)
      {
         if(fsiz >= 1)
         {
            if(this._parent[mst].weaponCD < 60)
            {
               this._parent[mst].weaponCD = 60;
            }
            this._parent[mst][this.wpname].t = this._parent[mst][this.wpname].ct;
            _parent[mst].weaponhold = false;
         }
         this.removeMovieClip();
      }
      if(this._parent[mst] != undefined)
      {
         this._sX = this._parent[mst]._sX;
         this._sY = this._parent[mst]._sY;
         this._sZ = this._parent[mst]._sZ;
         this._parent[mst].spEX = 30;
         this._parent[mst].AMBAC = 5;
         this._parent[mst].doHy(30);
         this._parent[mst].weaponCD = 30;
         if(fsiz < 6)
         {
            this._parent[mst]._rW = 0;
            this._parent[mst]._rH = 0;
            this._parent[mst]._rR = 0;
         }
         if(this._parent[this.tgt] != undefined && mz && this._parent[this.tgt].hypt <= 0)
         {
            this._parent[this.tgt].weaponCD = 30;
            this._parent[this.tgt].hypt = -5;
            this._parent[this.tgt].scmrfg = -5;
            this._parent[this.tgt].scmrtgt = this.mst;
            this._parent[this.tgt].scmrtgtd = 0.1;
            if(t == 30)
            {
               if(fsiz >= 1 && fsiz != 6)
               {
                  if(this._parent[mst]._type == "TMA" && fsiz > 1)
                  {
                     this._parent[mst].AMBAC = -30;
                     this._parent[mst].doTran();
                  }
                  launch();
               }
               else
               {
                  t = 60;
                  this._parent[mst][this.wpname].t = this._parent[mst][this.wpname].ct;
                  _parent[mst].weaponhold = false;
                  if(this._parent[mst].weaponCD < 60)
                  {
                     this._parent[mst].weaponCD = 60;
                  }
               }
            }
            this._parent[tgt].hitbo();
            if(fsiz >= 1)
            {
               this._parent[mst].scmrfg = 5;
            }
            if(fsiz == 7)
            {
               this._parent[mst].scmrfg = -5;
               this._parent[mst].scmrtgt = this.tgt;
               this._parent[mst].scmrtgtd = 1;
               if(this._parent[tgt]._size != "L")
               {
                  this._parent[mst].vZ -= 0.5 * this._parent[mst].v._sZ;
                  this._parent[mst].vX -= 0.5 * this._parent[mst].v._sX;
                  this._parent[mst].vY -= 0.5 * this._parent[mst].v._sY;
               }
               else
               {
                  this._parent[mst].vZ = -0.5 * this._parent[mst].maxspeed * Math.sin(this._parent[mst]._sH);
                  var _loc5_ = -0.5 * this._parent[mst].maxspeed * Math.cos(this._parent[mst]._sH);
                  this._parent[mst].vX = _loc5_ * Math.sin(this._parent[mst]._sW);
                  this._parent[mst].vY = _loc5_ * Math.cos(this._parent[mst]._sW);
               }
               this._parent.attachMovie("bo_2",this._name + "zbo" + t,this._parent.getNextHighestDepth(),{_sX:this._parent[this.tgt]._sX + random(11) - 5,_sY:this._parent[this.tgt]._sY + random(11) - 5,_sZ:this._parent[this.tgt]._sZ + random(11) - 5,mst:this.tgt});
               if(dbmz)
               {
                  if(t % 10 == 9)
                  {
                     this._parent[tgt].onhit(this.dam,this.mst);
                     this._parent[mst]._rW -= 6.283185307179586;
                     this._parent[mst].atton = 5;
                  }
                  if(t % 3 == 0 && t < 60)
                  {
                     snd("snd_launch0");
                  }
               }
               if(dbmz && t < 70)
               {
                  this._parent[this.tgt].Bindtgt = this._parent[mst].objz;
                  this._parent[this.tgt].Bind_Y = this._parent[this.tgt].Bind_Y;
                  this._parent[this._name + "_lcdb"]._sX = this._parent[this.tgt]._sX;
                  this._parent[this._name + "_lcdb"]._sY = this._parent[this.tgt]._sY;
                  this._parent[this._name + "_lcdb"]._sZ = this._parent[this.tgt]._sZ;
                  this._parent[this._name + "_lcdb"].shouxian();
               }
               else
               {
                  this._parent[this._name + "_lcdb"].mz = false;
                  this._parent[this.tgt].scmrtgtd = 0.8;
                  this._parent[this.tgt].Bindtgt = this._parent[mst];
                  if(t < 70)
                  {
                     this._parent[this.tgt].Bind_Y += 25;
                  }
                  else
                  {
                     this._parent[this.tgt].Bind_Y += 50;
                  }
               }
               this._parent[this.tgt].Bind_X = this.fx;
               this._parent[this.tgt].Bind_Z = this.fz;
               this._parent[this.tgt].Bind_W = this.CsW;
               this._parent[this.tgt].Bind_H = this.CsH;
               this._parent[this.tgt].Bind_R = this.CsR;
               if(t == 8)
               {
                  dbmz = true;
                  this._parent[this._name + "_lcdb"].mz = true;
               }
               if(t == 5)
               {
                  var _loc4_ = new Object();
                  _loc4_ = _global.moveobj(this._parent[mst].objz,this.fx,this.fy,this.fz);
                  this._parent.attachMovie("dd_lcdb",this._name + "_lcdb",this._parent.getNextHighestDepth(),{_sX:_loc4_.x,_sY:_loc4_.y,_sZ:_loc4_.z,_sW:this._parent[mst].objz._sW,_sH:this._parent[mst].objz._sH,_alpha:0});
                  this._parent[this._name + "_lcdb"].mst = this.mst;
                  this._parent[this._name + "_lcdb"].tgt = this.tgt;
                  this._parent[this._name + "_lcdb"].dam = 0;
                  this._parent[this._name + "_lcdb"].maxforce = 10000;
                  this._parent[this._name + "_lcdb"].speed = 55;
                  this._parent[this._name + "_lcdb"].linelist = this.LCDBmod;
                  this._parent[this._name + "_lcdb"].fx = this.fx;
                  this._parent[this._name + "_lcdb"].fy = this.fy;
                  this._parent[this._name + "_lcdb"].fz = this.fz;
               }
            }
            else if(fsiz == 6)
            {
               if(t < 60)
               {
                  if(t % 10 == 1)
                  {
                     this._parent[tgt].onhit(this.dam,this.mst);
                     this._parent[mst]._rH -= 6.283185307179586;
                     this._parent[mst].atton = 5;
                  }
                  this._parent[mst].vZ -= 0.5 * this._parent[mst].v._sZ;
                  this._parent[mst].vX -= 0.5 * this._parent[mst].v._sX;
                  this._parent[mst].vY -= 0.5 * this._parent[mst].v._sY;
                  this._parent[this.tgt].Bindtgt = this._parent[mst].objz;
                  this._parent[this.tgt].Bind_X = this.fx;
                  this._parent[this.tgt].Bind_Y = this.fy + 5;
                  this._parent[this.tgt].Bind_Z = this.fz;
                  this._parent[this.tgt].Bind_W = this.CsW;
                  this._parent[this.tgt].Bind_H = this.CsH;
                  this._parent[this.tgt].Bind_R = this.CsR;
               }
               else if(t >= 60)
               {
                  lasthit();
                  if(t <= 70)
                  {
                     this._parent[this.tgt].scmrtgtd = 0.1;
                  }
                  else
                  {
                     this._parent[this.tgt].scmrtgtd = 0.9;
                  }
                  this._parent[mst].vZ -= 0.5 * this._parent[mst].v._sZ;
                  this._parent[mst].vX -= 0.5 * this._parent[mst].v._sX;
                  this._parent[mst].vY -= 0.5 * this._parent[mst].v._sY;
                  this._parent[this.tgt].Bindtgt = this._parent[mst];
                  this._parent[this.tgt].Bind_X = this.fx;
                  this._parent[this.tgt].Bind_Y += 10;
                  this._parent[this.tgt].Bind_Z = this.fz;
                  this._parent[this.tgt].Bind_W = this.CsW;
                  this._parent[this.tgt].Bind_H = this.CsH;
                  this._parent[this.tgt].Bind_R = this.CsR;
               }
            }
            else if(fsiz == 5)
            {
               this._parent[this.tgt].scmrtgtd = 0.7;
               this._parent[mst].scmrfg = -5;
               this._parent[mst].scmrtgt = this.tgt;
               this._parent[mst].scmrtgtd = 0.8;
               if(this._parent[tgt]._size != "L")
               {
                  this._parent[mst].scmrtgtd = 0.3;
                  this._parent[mst].vZ -= 0.5 * this._parent[mst].v._sZ;
                  this._parent[mst].vX -= 0.5 * this._parent[mst].v._sX;
                  this._parent[mst].vY -= 0.5 * this._parent[mst].v._sY;
               }
               else
               {
                  this._parent[mst].scmrtgtd = 0.8;
                  this._parent[mst].vZ = -0.5 * this._parent[mst].maxspeed * Math.sin(this._parent[mst]._sH);
                  _loc5_ = -0.5 * this._parent[mst].maxspeed * Math.cos(this._parent[mst]._sH);
                  this._parent[mst].vX = _loc5_ * Math.sin(this._parent[mst]._sW);
                  this._parent[mst].vY = _loc5_ * Math.cos(this._parent[mst]._sW);
               }
               this._parent.attachMovie("bo_2",this._name + "zbo" + t,this._parent.getNextHighestDepth(),{_sX:this._parent[this.tgt]._sX + random(11) - 5,_sY:this._parent[this.tgt]._sY + random(11) - 5,_sZ:this._parent[this.tgt]._sZ + random(11) - 5,mst:this.tgt});
               this._parent[this.tgt].Bindtgt = this._parent[mst].objz;
               this._parent[this.tgt].Bind_X = this.fx;
               if(this._parent[this.tgt].Bind_Y > 500)
               {
                  this._parent[mst].vZ = 0;
                  this._parent[mst].vX = 0;
                  this._parent[mst].vY = 0;
                  this._parent[this.tgt].Bind_Y = this._parent[this.tgt].Bind_Y;
               }
               else
               {
                  this._parent[this.tgt].Bind_Y += 0.5 * this._parent[mst].maxspeed;
               }
               this._parent[this.tgt].Bind_Z = this.fz;
               this._parent[this.tgt].Bind_W = this.CsW;
               this._parent[this.tgt].Bind_H = this.CsH;
               this._parent[this.tgt].Bind_R = this.CsR;
               if(t > 30)
               {
                  hits();
               }
            }
            else if(t <= 30)
            {
               if(fsiz == 4 && this._parent[mst]._type != "TMA")
               {
                  t = 31;
               }
               if(this._parent[tgt]._size != "L")
               {
                  this._parent[mst].vZ = 0.5 * this._parent[mst].maxspeed * Math.sin(this._parent[mst]._sH);
                  _loc5_ = 0.5 * this._parent[mst].maxspeed * Math.cos(this._parent[mst]._sH);
                  this._parent[mst].vX = _loc5_ * Math.sin(this._parent[mst]._sW);
                  this._parent[mst].vY = _loc5_ * Math.cos(this._parent[mst]._sW);
               }
               else
               {
                  this._parent[mst].vZ -= 0.5 * this._parent[mst].v._sZ;
                  this._parent[mst].vX -= 0.5 * this._parent[mst].v._sX;
                  this._parent[mst].vY -= 0.5 * this._parent[mst].v._sY;
               }
               this._parent.attachMovie("bo_2",this._name + "zbo" + t,this._parent.getNextHighestDepth(),{_sX:this._parent[this.tgt]._sX + random(11) - 5,_sY:this._parent[this.tgt]._sY + random(11) - 5,_sZ:this._parent[this.tgt]._sZ + random(11) - 5,mst:this.tgt});
               this._parent[this.tgt].Bindtgt = this._parent[mst].objz;
               this._parent[this.tgt].Bind_X = this.fx;
               this._parent[this.tgt].Bind_Y = this.fy + 5;
               this._parent[this.tgt].Bind_Z = this.fz;
               this._parent[this.tgt].Bind_W = this.CsW;
               this._parent[this.tgt].Bind_H = this.CsH;
               this._parent[this.tgt].Bind_R = this.CsR;
            }
            else if(fsiz >= 1 && t <= 60 && fsiz != 6)
            {
               hits();
               this._parent[mst].vZ -= 0.5 * this._parent[mst].v._sZ;
               this._parent[mst].vX -= 0.5 * this._parent[mst].v._sX;
               this._parent[mst].vY -= 0.5 * this._parent[mst].v._sY;
               this._parent[this.tgt].Bindtgt = this._parent[mst].objz;
               this._parent[this.tgt].Bind_X = this.fx;
               this._parent[this.tgt].Bind_Y = this.fy + 5;
               this._parent[this.tgt].Bind_Z = this.fz;
               this._parent[this.tgt].Bind_W = this.CsW;
               this._parent[this.tgt].Bind_H = this.CsH;
               this._parent[this.tgt].Bind_R = this.CsR;
            }
            else if(fsiz >= 1 && t > 60)
            {
               this._parent[this.tgt].scmrtgtd = 0.5;
               lasthit();
               this._parent[mst].vZ -= 0.5 * this._parent[mst].v._sZ;
               this._parent[mst].vX -= 0.5 * this._parent[mst].v._sX;
               this._parent[mst].vY -= 0.5 * this._parent[mst].v._sY;
               this._parent[this.tgt].Bindtgt = this._parent[mst].objz;
               this._parent[this.tgt].Bind_X = this.fx;
               this._parent[this.tgt].Bind_Y += 10;
               this._parent[this.tgt].Bind_Z = this.fz;
               this._parent[this.tgt].Bind_W = this.CsW;
               this._parent[this.tgt].Bind_H = this.CsH;
               this._parent[this.tgt].Bind_R = this.CsR;
            }
            else
            {
               this._parent[mst].vZ = 0.5 * this._parent[mst].maxspeed * Math.sin(this._parent[mst]._sH);
               _loc5_ = 0.5 * this._parent[mst].maxspeed * Math.cos(this._parent[mst]._sH);
               this._parent[mst].vX = _loc5_ * Math.sin(this._parent[mst]._sW);
               this._parent[mst].vY = _loc5_ * Math.cos(this._parent[mst]._sW);
            }
         }
         else if(t > 30)
         {
            this._parent[mst][this.wpname].t = this._parent[mst][this.wpname].ct;
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
function launch()
{
   if(fsiz == 1)
   {
      var _loc3_ = new Object();
      _loc3_ = _global.moveobj(this._parent[mst].objz,this.fx,this.fy,this.fz);
      this._parent.attachMovie("dd_tjSsbeam",this._name + "_dd",this._parent.getNextHighestDepth(),{_sX:_loc3_.x,_sY:_loc3_.y,_sZ:_loc3_.z,_sW:this._parent[mst].objz._sW,_sH:this._parent[mst].objz._sH,_siz:10,_alpha:0});
      this._parent[this._name + "_dd"].mst = this.mst;
      this._parent[this._name + "_dd"].tgt = this.tgt;
      this._parent[this._name + "_dd"].dam = this.dam;
      this._parent[this._name + "_dd"].maxforce = 10000;
      this._parent[this._name + "_dd"].speed = 500;
      this._parent[this._name + "_dd"].fx = this.fx;
      this._parent[this._name + "_dd"].fy = this.fy;
      this._parent[this._name + "_dd"].fz = this.fz;
      this._parent[mst].atton = 5;
   }
}
function hits()
{
   if(fsiz == 2 && t % 10 == 1)
   {
      var _loc3_ = new Object();
      _loc3_ = _global.moveobj(this._parent[mst].objz,this.fx,this.fy,this.fz);
      snd("gsqs");
      this._parent.attachMovie("dd_fygs",_name + "dd" + t,this._parent.getNextHighestDepth(),{_sX:_loc3_.x,_sY:_loc3_.y,_sZ:_loc3_.z,_sW:this._parent[mst].objz._sW + (random(10) - 5) * 0.001 * 3.141592653589793,_sH:this._parent[mst].objz._sH + (random(10) - 5) * 0.001 * 3.141592653589793,_slo:random(20) + 10,_siz:2,dam:this.dam});
      this._parent[_name + "dd" + t].mst = this.mst;
      this._parent[_name + "dd" + t].tgt = this.tgt;
      this._parent[_name + "dd" + t].basex = this._parent[mst].v._sX;
      this._parent[_name + "dd" + t].basey = this._parent[mst].v._sY;
      this._parent[_name + "dd" + t].basez = this._parent[mst].v._sZ;
      this._parent[mst].atton = 5;
   }
   if(fsiz == 3 && t % 2 == 0)
   {
      _loc3_ = new Object();
      _loc3_ = _global.moveobj(this._parent[mst].objz,this.fx,this.fy,this.fz);
      snd("minigun1");
      this._parent.attachMovie("dd_cartridge",_name + "dd" + t,this._parent.getNextHighestDepth(),{_sX:_loc3_.x,_sY:_loc3_.y,_sZ:_loc3_.z,_sW:this._parent[mst].objz._sW,_sH:this._parent[mst].objz._sH,_slo:30,_siz:0.01,_sizz:80,dam:this.dam});
      this._parent[_name + "dd" + t].mst = this.mst;
      this._parent[_name + "dd" + t].tgt = this.tgt;
      this._parent[_name + "dd" + t].maxforce = 1500;
      this._parent[_name + "dd" + t].speed = 30;
      if(this.fn > 1)
      {
         _loc3_ = _global.moveobj(this._parent[mst].objz,- this.fx,this.fy,this.fz);
         this._parent.attachMovie("dd_cartridge",_name + "ddd" + t,this._parent.getNextHighestDepth(),{_sX:_loc3_.x,_sY:_loc3_.y,_sZ:_loc3_.z,_sW:this._parent[mst].objz._sW,_sH:this._parent[mst].objz._sH,_slo:30,_siz:0.01,_sizz:80,dam:this.dam});
         this._parent[_name + "ddd" + t].mst = this.mst;
         this._parent[_name + "ddd" + t].tgt = this.tgt;
         this._parent[_name + "ddd" + t].maxforce = 1500;
         this._parent[_name + "ddd" + t].speed = 30;
      }
      this._parent[mst].atton = 5;
   }
   if(fsiz == 4)
   {
      if(t % 10 == 0)
      {
         snd("gjk");
         if(this.wptx == "tx_axe2")
         {
            this._parent.attachMovie("tx_axe",_name + redoi + "jy" + t,this._parent.getNextHighestDepth(),{_sX:this._parent[mst]._sX,_sY:this._parent[mst]._sY,_sZ:this._parent[mst]._sZ,mst:this.mst});
            this._parent[_name + redoi + "jy" + t].sz = this.txsz;
            this._parent.attachMovie("tx_axe",_name + redoi + "jyy" + t,this._parent.getNextHighestDepth(),{_sX:this._parent[mst]._sX,_sY:this._parent[mst]._sY,_sZ:this._parent[mst]._sZ,mst:this.mst});
            this._parent[_name + redoi + "jyy" + t].sz = this.txsz;
         }
         else if(this.wptx == "tx_bs2")
         {
            this._parent.attachMovie("tx_bs1",_name + redoi + "jy" + t,this._parent.getNextHighestDepth(),{_sX:this._parent[mst]._sX,_sY:this._parent[mst]._sY,_sZ:this._parent[mst]._sZ,mst:this.mst});
            this._parent[_name + redoi + "jy" + t].sz = this.txsz;
            this._parent.attachMovie("tx_bs2",_name + redoi + "jyy" + t,this._parent.getNextHighestDepth(),{_sX:this._parent[mst]._sX,_sY:this._parent[mst]._sY,_sZ:this._parent[mst]._sZ,mst:this.mst});
            this._parent[_name + redoi + "jyy" + t].sz = this.txsz;
         }
         else if(this.wptx != null)
         {
            this._parent.attachMovie(this.wptx,_name + redoi + "jy" + t,this._parent.getNextHighestDepth(),{_sX:this._parent[mst]._sX,_sY:this._parent[mst]._sY,_sZ:this._parent[mst]._sZ,mst:this.mst});
            this._parent[_name + redoi + "jy" + t].sz = this.txsz;
         }
         this._parent[tgt].onhit(this.dam,this.mst);
         this._parent[mst].atton = 5;
      }
   }
   if(fsiz == 5)
   {
      if(this._parent[mst].ntact <= 0)
      {
         this._parent[mst].ntact = -5;
      }
      if(t % 5 == 0 && t <= 45)
      {
         snd("zdfs");
         _loc3_ = _global.moveobj(this._parent[mst].objz,this.fx,this.fy,this.fz);
         this._parent.attachMovie("dd_zd",_name + "dd" + t,this._parent.getNextHighestDepth(),{_sX:_loc3_.x,_sY:_loc3_.y,_sZ:_loc3_.z,_sW:this._parent[mst].objz._sW + (random(10) - 5) * 0.001 * 3.141592653589793,_sH:this._parent[mst].objz._sH + (random(10) - 5) * 0.001 * 3.141592653589793,htime:30,_siz:2,dam:this.dam,_slo:4,_sizz:0.3});
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
      if(t % 3 == 2 && t <= 58 && t >= 45)
      {
         this._parent.attachMovie("dd_fd",_name + "ddd" + t,this._parent.getNextHighestDepth(),{_sX:this._parent[mst]._sX,_sY:this._parent[mst]._sY,_sZ:this._parent[mst]._sZ,_sW:this._parent[mst]._sW + 0.5 * (random(25) - 12) * 3.141592653589793 / 20,_sH:this._parent[mst]._sH + 0.5 * (random(25) - 12) * 3.141592653589793 / 20});
         this._parent[_name + "ddd" + t].mst = this.mst;
         this._parent[_name + "ddd" + t].tgt = this.tgt;
         this._parent[_name + "ddd" + t].dam = this.dam;
         this._parent[_name + "ddd" + t].maxforce = 3000;
         this._parent[_name + "ddd" + t].speed = 20;
         this._parent[_name + "ddd" + t].rg = 1;
         this._parent[_name + "ddd" + t].fsiz = 1;
         this._parent[_name + "ddd" + t].fsound = "fd";
         this._parent[_name + "ddd" + t].wjlv = 3;
         this._parent[_name + "ddd" + t].linelist = FDmod;
         this._parent[mst].atton = 5;
      }
   }
}
function lasthit()
{
   if(fsiz == 2 && t == 61)
   {
      this._parent[this.tgt].scmrtgtd = 0.5;
      var _loc3_ = new Object();
      _loc3_ = _global.moveobj(this._parent[mst].objz,this.fx,this.fy,this.fz);
      snd("gsqs");
      this._parent.attachMovie("dd_msbeam",_name + "dd" + t,this._parent.getNextHighestDepth(),{_sX:_loc3_.x,_sY:_loc3_.y,_sZ:_loc3_.z,_sW:this._parent[mst].objz._sW,_sH:this._parent[mst].objz._sH,_slo:random(20) + 10,_siz:4,dam:this.dam});
      this._parent[_name + "dd" + t].mst = this.mst;
      this._parent[_name + "dd" + t].tgt = this.tgt;
      this._parent[_name + "dd" + t].maxforce = 5000;
      this._parent[_name + "dd" + t].speed = 250;
      this._parent[_name + "dd" + t].fx = this.fx;
      this._parent[_name + "dd" + t].fy = this.fy;
      this._parent[_name + "dd" + t].fz = this.fz;
      _loc3_ = _global.cTos(0,500,0,this._parent[mst]._sW,this._parent[mst]._sH,0);
      this._parent[_name + "dd" + t].mdx = _loc3_.x + this._parent[mst]._sX;
      this._parent[_name + "dd" + t].mdy = _loc3_.y + this._parent[mst]._sY;
      this._parent[_name + "dd" + t].mdz = _loc3_.z + this._parent[mst]._sZ;
      this._parent[mst].atton = 5;
   }
   if(fsiz == 3 && t % 2 == 0)
   {
      this._parent[this.tgt].scmrtgtd = 0.5;
      _loc3_ = new Object();
      _loc3_ = _global.moveobj(this._parent[mst].objz,this.fx,this.fy,this.fz);
      snd("minigun1");
      this._parent.attachMovie("dd_cartridge",_name + "dd" + t,this._parent.getNextHighestDepth(),{_sX:_loc3_.x,_sY:_loc3_.y,_sZ:_loc3_.z,_sW:this._parent[mst].objz._sW,_sH:this._parent[mst].objz._sH,_slo:30,_siz:0.01,_sizz:80,dam:this.dam});
      this._parent[_name + "dd" + t].mst = this.mst;
      this._parent[_name + "dd" + t].tgt = this.tgt;
      this._parent[_name + "dd" + t].maxforce = 1500;
      this._parent[_name + "dd" + t].speed = 30;
      if(this.fn > 1)
      {
         _loc3_ = _global.moveobj(this._parent[mst].objz,- this.fx,this.fy,this.fz);
         this._parent.attachMovie("dd_cartridge",_name + "ddd" + t,this._parent.getNextHighestDepth(),{_sX:_loc3_.x,_sY:_loc3_.y,_sZ:_loc3_.z,_sW:this._parent[mst].objz._sW,_sH:this._parent[mst].objz._sH,_slo:30,_siz:0.01,_sizz:80,dam:this.dam});
         this._parent[_name + "ddd" + t].mst = this.mst;
         this._parent[_name + "ddd" + t].tgt = this.tgt;
         this._parent[_name + "ddd" + t].maxforce = 1500;
         this._parent[_name + "ddd" + t].speed = 30;
      }
      this._parent[mst].atton = 5;
   }
   if(fsiz == 4 && t == 75)
   {
      this._parent[this.tgt].scmrtgtd = 0.5;
      snd("snd_hxb");
      _loc3_ = new Object();
      _loc3_ = _global.moveobj(this._parent[mst].objz,this.fx,this.fy,this.fz);
      this._parent.attachMovie("dd_hlgj",_name + "dd" + t,this._parent.getNextHighestDepth(),{_sX:_loc3_.x,_sY:_loc3_.y,_sZ:_loc3_.z,_sW:this._parent[mst].objz._sW,_sH:this._parent[mst].objz._sH,dam:this.dam});
      this._parent[_name + "dd" + t].mst = this.mst;
      this._parent[_name + "dd" + t].tgt = this.tgt;
      this._parent[_name + "dd" + t].maxforce = 1500;
      this._parent[_name + "dd" + t].speed = 30;
      this._parent[mst].atton = 5;
   }
   if(fsiz == 6 && t == 60)
   {
      snd("gjk");
      this._parent[tgt].onhit(this.dam,this.mst);
      this._parent[mst]._rH -= 6.283185307179586;
      this._parent[mst].atton = 5;
   }
}
stop();
if(tgt == _root.jiemiam.mst)
{
   _root.jiemiam.hkxsq[mst].jiantou.fs = true;
}
var CsW = 0;
var CsH = 0;
var CsR = 0;
this.doit();
var redoi = 5;
var at = 0;
var tujifalse = false;
var gjopen = false;
var FDmod = new Array();
FDmod[0] = {nam:"line0",p1x:0,p1y:2,p1z:0,p2x:0,p2y:6,p2z:0,_siz:1.5,_sizz:1};
FDmod[1] = {nam:"line1",p1x:0,p1y:2,p1z:0,p2x:3,p2y:0,p2z:0,_siz:1.5,_sizz:0.1};
FDmod[2] = {nam:"line2",p1x:0,p1y:2,p1z:0,p2x:-3,p2y:0,p2z:0,_siz:1.5,_sizz:0.1};
FDmod[3] = {nam:"line3",p1x:0,p1y:2,p1z:0,p2x:0,p2y:0,p2z:3,_siz:1.5,_sizz:0.1};
FDmod[4] = {nam:"line4",p1x:0,p1y:2,p1z:0,p2x:0,p2y:0,p2z:-3,_siz:1.5,_sizz:0.1};
var LCDBmod = new Array();
LCDBmod[0] = {nam:"line0",p1x:0,p1y:0,p1z:0,p2x:0,p2y:1,p2z:0,_siz:1,_sizz:1.2};
LCDBmod[1] = {nam:"line1",p1x:0,p1y:1,p1z:0,p2x:1.3,p2y:1.3,p2z:0,_siz:0.15,_sizz:0.2};
LCDBmod[2] = {nam:"line2",p1x:0,p1y:1,p1z:0,p2x:-1.3,p2y:1.3,p2z:0,_siz:0.15,_sizz:0.2};
LCDBmod[3] = {nam:"line3",p1x:0,p1y:1,p1z:0,p2x:0,p2y:1.3,p2z:1.3,_siz:0.15,_sizz:0.2};
LCDBmod[4] = {nam:"line4",p1x:0,p1y:1,p1z:0,p2x:0,p2y:1.3,p2z:-1.3,_siz:0.15,_sizz:0.2};
