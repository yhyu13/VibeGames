function randomra()
{
   rx = random(601);
   if(rx < 300)
   {
      rx -= 600;
   }
   ry = random(601);
   if(ry < 300)
   {
      ry -= 600;
   }
   rz = random(601);
   if(rz < 300)
   {
      rz -= 600;
   }
   ax = random(11) - 5;
   ay = random(11) - 5;
   az = random(11) - 5;
}
function bs()
{
   if(!stopAll)
   {
      if(this.bofg > 0)
      {
         this.bofg = this.bofg - 1;
      }
      t++;
      if(this._parent[this.mst] != undefined)
      {
         v._sZ = this._parent[this.mst].v._sZ;
         v._sX = this._parent[this.mst].v._sX;
         v._sY = this._parent[this.mst].v._sY;
      }
      else
      {
         v._sZ = 0;
         v._sX = 0;
         v._sY = 0;
      }
      if(t >= 0)
      {
         play();
         this._sZ = this._parent[this.mst]._sZ;
         this._sX = this._parent[this.mst]._sX;
         this._sY = this._parent[this.mst]._sY;
         randomra();
         v._sZ = speed * Math.sin(this._sH);
         var _loc4_ = speed * Math.cos(this._sH);
         v._sX = _loc4_ * Math.sin(this._sW);
         v._sY = _loc4_ * Math.cos(this._sW);
         _global.snd(this.fsound);
         this._type = "ff";
         _global.SimpList[this._name] = this;
         _root.jiemiam.addff(this._name);
         onEnterFrame = function()
         {
            ts();
         };
      }
   }
}
function zd()
{
   if(!stopAll)
   {
      if(this.bofg > 0)
      {
         this.bofg = this.bofg - 1;
      }
      if(this._parent[this.mst]._zt == "nor")
      {
         if(_parent[mst].onkf > 0)
         {
            this.onkff = true;
         }
         if(this._parent[this.mst].ntact < 0)
         {
            if(this.actmode == "hold")
            {
               this.actmode = "qishe";
            }
         }
      }
      t++;
      if(t >= maxt)
      {
         axt = t;
         onEnterFrame = function()
         {
            ts();
         };
      }
      else if(this._parent[this.mst] != undefined)
      {
         var _loc6_ = _parent[mst]._sX + 0.2 * rx - this._sX;
         var _loc5_ = _parent[mst]._sY + 0.2 * ry - this._sY;
         var _loc7_ = _parent[mst]._sZ + 0.2 * rz - this._sZ;
         dst = dist_3d(0,0,0,_loc6_,_loc5_,_loc7_);
         if(dst > 200)
         {
            _parent.attachMovie("wjline",_name + "wj" + t,_parent.getNextHighestDepth(),{_sX:this._sX,_sY:this._sY,_sZ:this._sZ,_sX2:this._sX - v._sX,_sY2:this._sY - v._sY,_sZ2:this._sZ - v._sZ,t:4,_siz:4,_sizz:0.5});
            var _loc8_ = Math.atan2(_loc6_,_loc5_);
            var _loc9_ = Math.atan2(_loc7_,distance(0,0,_loc6_,_loc5_));
            var _loc10_ = minangle(this._sH,_loc9_);
            if(_loc10_ > 0.3141592653589793)
            {
               this._sH += 0.3141592653589793;
            }
            else if(_loc10_ < -0.3141592653589793)
            {
               this._sH += -0.3141592653589793;
            }
            else
            {
               this._sH = _loc9_;
            }
            var _loc11_ = minangle(this._sW,_loc8_);
            if(_loc11_ > 0.3141592653589793)
            {
               this._sW += 0.3141592653589793;
            }
            else if(_loc11_ < -0.3141592653589793)
            {
               this._sW += -0.3141592653589793;
            }
            else
            {
               this._sW = _loc8_;
            }
            this._sR = this._parent[this.mst]._sR;
            if(this.bofg == 0)
            {
               v._sZ = speed * Math.sin(this._sH) * 0.25 + v._sZ * 0.75;
               var _loc12_ = speed * Math.cos(this._sH);
               v._sX = _loc12_ * Math.sin(this._sW) * 0.25 + v._sX * 0.75;
               v._sY = _loc12_ * Math.cos(this._sW) * 0.25 + v._sY * 0.75;
            }
         }
         else
         {
            if(dst < 50)
            {
               if(t % 2 == 0)
               {
                  _parent.attachMovie("wjline2",_name + "wj" + t,_parent.getNextHighestDepth(),{_sX:this._sX,_sY:this._sY,_sZ:this._sZ,_sX2:this._sX - 0.1,_sY2:this._sY - 0.1,_sZ2:this._sZ - 0.1,_siz:8,_sizz:1});
               }
            }
            else
            {
               _parent.attachMovie("wjline",_name + "wj" + t,_parent.getNextHighestDepth(),{_sX:this._sX,_sY:this._sY,_sZ:this._sZ,_sX2:this._sX - v._sX,_sY2:this._sY - v._sY,_sZ2:this._sZ - v._sZ,t:4,_siz:4,_sizz:0.5});
            }
            this._sH = this._parent[this.mst].shoth;
            this._sW = this._parent[this.mst].shotw;
            this._sR = this._parent[this.mst]._sR;
            if(this.bofg == 0)
            {
               v._sX = 0.5 * (_loc6_ + _parent[mst].v._sX);
               v._sY = 0.5 * (_loc5_ + _parent[mst].v._sY);
               v._sZ = 0.5 * (_loc7_ + _parent[mst].v._sZ);
            }
            if(dst < 50)
            {
               if(this.onkff)
               {
                  if(_parent[tgt]._type == "ff")
                  {
                     var _loc15_ = _parent[tgt]._sX - this._sX;
                     var _loc14_ = _parent[tgt]._sY - this._sY;
                     var _loc13_ = _parent[tgt]._sZ - this._sZ;
                     tdst = dist_3d(0,0,0,_loc15_,_loc14_,_loc13_);
                     if(tdst < 4000)
                     {
                        axt = t;
                        basex = v._sX;
                        basey = v._sY;
                        basez = v._sZ;
                        v._sZ = 0;
                        v._sX = 0;
                        v._sY = 0;
                        onEnterFrame = function()
                        {
                           shoot();
                        };
                     }
                  }
                  else
                  {
                     for(var _loc4_ in _root.cmrs)
                     {
                        if(_root.cmrs[_loc4_]._type == "ff" && _root.cmrs[_loc4_].tgt == this.mst)
                        {
                           if(_parent[_root.cmrs[_loc4_].onlock] == undefined || _root.cmrs[_loc4_].onlock == this._name)
                           {
                              this.tgt = _loc4_;
                              _loc15_ = _parent[tgt]._sX - this._sX;
                              _loc14_ = _parent[tgt]._sY - this._sY;
                              _loc13_ = _parent[tgt]._sZ - this._sZ;
                              tdst = dist_3d(0,0,0,_loc15_,_loc14_,_loc13_);
                              if(tdst < 4000)
                              {
                                 axt = t;
                                 basex = v._sX;
                                 basey = v._sY;
                                 basez = v._sZ;
                                 v._sZ = 0;
                                 v._sX = 0;
                                 v._sY = 0;
                                 onEnterFrame = function()
                                 {
                                    shoot();
                                 };
                              }
                              _parent[tgt].onlock = this._name;
                              break;
                           }
                        }
                     }
                     this.onkff = false;
                  }
               }
               else if(this.actmode == "qishe" && t >= axt + 10)
               {
                  _loc15_ = this._parent[this._parent[mst].tgt]._sX - this._sX;
                  _loc14_ = this._parent[this._parent[mst].tgt]._sY - this._sY;
                  _loc13_ = this._parent[this._parent[mst].tgt]._sZ - this._sZ;
                  tdst = dist_3d(0,0,0,_loc15_,_loc14_,_loc13_);
                  if(tdst < 4000 && this._parent[this.mst].covon)
                  {
                     axt = t;
                     this.qstgt = this._parent[mst].tgt;
                     if(this.qstgt == _root.jiemiam.mst)
                     {
                        _root.jiemiam.hkxsq[this._name].jiantou.play();
                     }
                     this.qishelock = this._parent[this.mst].lockon;
                     onEnterFrame = function()
                     {
                        qishe();
                     };
                  }
                  else
                  {
                     this.actmode = "hold";
                  }
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
function ts()
{
   if(!stopAll)
   {
      if(this.bofg > 0)
      {
         this.bofg = this.bofg - 1;
      }
      if(this._parent[this.mst]._zt == "nor")
      {
         if(_parent[mst].onkf > 0)
         {
            this.onkff = true;
         }
         if(this._parent[this.mst].ntact < 0)
         {
            if(this.actmode == "hold")
            {
               this.actmode = "qishe";
            }
         }
      }
      t++;
      _parent.attachMovie("wjline",_name + "wj" + t,_parent.getNextHighestDepth(),{_sX:this._sX,_sY:this._sY,_sZ:this._sZ,_sX2:this._sX - v._sX,_sY2:this._sY - v._sY,_sZ2:this._sZ - v._sZ,t:4,_siz:4,_sizz:0.5});
      if(this.bofg == 0)
      {
         v._sZ += az;
         v._sX += ax;
         v._sY += ay;
      }
      var _loc3_ = Math.round(_parent[mst]._SP / 1000);
      if(t >= axt + 15 - _loc3_)
      {
         if(_parent[mst]._SP >= 10000 || this.onkff)
         {
            maxt = t + maxforce / speed;
         }
         if(t >= maxt)
         {
            onEnterFrame = function()
            {
               back();
            };
         }
         else
         {
            axt = t;
            randomra();
            onEnterFrame = function()
            {
               zd();
            };
         }
      }
   }
}
function shoot()
{
   if(!stopAll)
   {
      if(this.bofg > 0)
      {
         this.bofg = this.bofg - 1;
      }
      if(this._parent[this.mst]._zt == "nor")
      {
         if(_parent[mst].onkf > 0)
         {
            this.onkff = true;
         }
         if(this._parent[this.mst].ntact < 0)
         {
            if(this.actmode == "hold")
            {
               this.actmode = "qishe";
            }
         }
      }
      t++;
      if(t == axt + 10)
      {
         if(this._parent[this.tgt] != undefined && this._parent[this.mst]._zt == "nor")
         {
            _root.jiemiam.hkxsq[this._name].jiantou.gotoAndStop(1);
            mz();
            var _loc5_ = new Object();
            _loc5_ = _global.moveobj(this.objz,0,5,0);
            this._parent.attachMovie("dd_fySsbeam",this._name + "ddp" + t,this._parent.getNextHighestDepth(),{_sX:_loc5_.x,_sY:_loc5_.y,_sZ:_loc5_.z,_sW:this.objz._sW,_sH:this.objz._sH,_siz:30,_alpha:0});
            this._parent[this._name + "ddp" + t].mst = this.mst;
            this._parent[this._name + "ddp" + t].mstff = this._name;
            this._parent[this._name + "ddp" + t].tgt = this.tgt;
            this._parent[this._name + "ddp" + t].dam = this.dam;
            this._parent[this.tgt].AI.ongp(this._name);
            this.tson = false;
         }
      }
      if(t == axt + 35)
      {
         if(this.actmode == "qishe")
         {
            this.actmode = "hold";
         }
         this.tson = true;
         axt = t;
         v._sX = basex;
         v._sY = basey;
         v._sZ = basez;
         onEnterFrame = function()
         {
            ts();
         };
      }
   }
}
function qishe()
{
   if(!stopAll)
   {
      if(this.bofg > 0)
      {
         this.bofg = this.bofg - 1;
      }
      if(this._parent[this.mst]._zt == "nor")
      {
         if(_parent[mst].onkf > 0)
         {
            this.onkff = true;
         }
         if(this._parent[this.mst].ntact < 0)
         {
            if(this.actmode == "hold")
            {
               this.actmode = "qishe";
            }
         }
      }
      t++;
      if(this.bofg == 0)
      {
         v._sX *= 0.75;
         v._sY *= 0.75;
         v._sZ *= 0.75;
      }
      if(this._parent[this.mst]._zt == "nor" && t < axt + 10)
      {
         this._sH = this._parent[this.mst].shoth;
         this._sW = this._parent[this.mst].shotw;
         this._sR = this._parent[this.mst]._sR;
      }
      else if(t == axt + 10)
      {
         if(this._parent[this.qstgt] != undefined && this._parent[this.mst]._zt == "nor")
         {
            _root.jiemiam.hkxsq[this._name].jiantou.gotoAndStop(1);
            if(this.qishelock)
            {
               var _loc6_ = this._parent[this.qstgt]._sX - this._sX;
               var _loc5_ = this._parent[this.qstgt]._sY - this._sY;
               var _loc8_ = this._parent[this.qstgt]._sZ - this._sZ;
            }
            else
            {
               _loc6_ = this._parent[this.qstgt]._sX - this._sX + 0.2 * rx;
               _loc5_ = this._parent[this.qstgt]._sY - this._sY + 0.2 * ry;
               _loc8_ = this._parent[this.qstgt]._sZ - this._sZ + 0.2 * rz;
            }
            dst = dist_3d(0,0,0,_loc6_,_loc5_,_loc8_);
            var _loc9_ = (dst + random(40) * 20) / 400;
            _loc6_ += this._parent[this.qstgt].v._sX * _loc9_;
            _loc5_ += this._parent[this.qstgt].v._sY * _loc9_;
            _loc8_ += this._parent[this.qstgt].v._sZ * _loc9_;
            var _loc10_ = Math.atan2(_loc6_,_loc5_);
            var _loc11_ = Math.atan2(_loc8_,distance(0,0,_loc6_,_loc5_));
            this._sH = _loc11_;
            this._sW = _loc10_;
            var _loc7_ = new Object();
            _loc7_ = _global.moveobj(this.objz,0,5,0);
            this._parent.attachMovie("dd_fySsbeam",this._name + "ddp" + t,this._parent.getNextHighestDepth(),{_sX:_loc7_.x,_sY:_loc7_.y,_sZ:_loc7_.z,_sW:this.objz._sW,_sH:this.objz._sH,_siz:30,_alpha:0});
            this._parent[this._name + "ddp" + t].mst = this.mst;
            this._parent[this._name + "ddp" + t].mstff = this._name;
            this._parent[this._name + "ddp" + t].tgt = this.qstgt;
            this._parent[this._name + "ddp" + t].dam = this.dam;
            this._parent[this.qstgt].AI.ongp(this._name);
            this.tson = false;
         }
      }
      if(t == axt + 35)
      {
         if(this.actmode == "qishe")
         {
            this.actmode = "hold";
         }
         this.tson = true;
         axt = t;
         randomra();
         onEnterFrame = function()
         {
            zd();
         };
      }
   }
}
function back()
{
   if(!stopAll)
   {
      if(this.bofg > 0)
      {
         this.bofg = this.bofg - 1;
      }
      t++;
      _parent[tgt].onkillff(this._name);
      if(this.backmst && this._parent[this.mst] != undefined)
      {
         _parent.attachMovie("wjline",_name + "wj" + t,_parent.getNextHighestDepth(),{_sX:this._sX,_sY:this._sY,_sZ:this._sZ,_sX2:this._sX - v._sX,_sY2:this._sY - v._sY,_sZ2:this._sZ - v._sZ,t:4,_siz:4,_sizz:0.5});
         var _loc5_ = _parent[mst]._sX - this._sX;
         var _loc4_ = _parent[mst]._sY - this._sY;
         var _loc6_ = _parent[mst]._sZ - this._sZ;
         dst = dist_3d(0,0,0,_loc5_,_loc4_,_loc6_);
         if(dst > 200)
         {
            var _loc7_ = Math.atan2(_loc5_,_loc4_);
            var _loc8_ = Math.atan2(_loc6_,distance(0,0,_loc5_,_loc4_));
            var _loc9_ = minangle(this._sH,_loc8_);
            if(_loc9_ > 0.3141592653589793)
            {
               this._sH += 0.3141592653589793;
            }
            else if(_loc9_ < -0.3141592653589793)
            {
               this._sH += -0.3141592653589793;
            }
            else
            {
               this._sH = _loc8_;
            }
            var _loc10_ = minangle(this._sW,_loc7_);
            if(_loc10_ > 0.3141592653589793)
            {
               this._sW += 0.3141592653589793;
            }
            else if(_loc10_ < -0.3141592653589793)
            {
               this._sW += -0.3141592653589793;
            }
            else
            {
               this._sW = _loc7_;
            }
            this._sR = this._parent[this.mst]._sR;
            if(this.bofg == 0)
            {
               v._sZ = speed * Math.sin(this._sH) * 0.25 + v._sZ * 0.75;
               var _loc11_ = speed * Math.cos(this._sH);
               v._sX = _loc11_ * Math.sin(this._sW) * 0.25 + v._sX * 0.75;
               v._sY = _loc11_ * Math.cos(this._sW) * 0.25 + v._sY * 0.75;
            }
         }
         else
         {
            this._sW = _parent[mst]._sW;
            this._sH = _parent[mst]._sH;
            var _loc3_ = 100 - dst;
            if(_loc3_ < 50)
            {
               _loc3_ = 50;
            }
            _loc3_ = _loc3_ * 0.01 + 0.05;
            if(this.bofg == 0)
            {
               v._sX = _loc3_ * (_loc5_ + _parent[mst].v._sX);
               v._sY = _loc3_ * (_loc4_ + _parent[mst].v._sY);
               v._sZ = _loc3_ * (_loc6_ + _parent[mst].v._sZ);
            }
            if(dst < 5)
            {
               this._parent[mst][this.wpname].ln = this._parent[mst][this.wpname].ln + 1;
               this.removeMovieClip();
            }
         }
      }
      else
      {
         this.removeMovieClip();
      }
   }
}
function mz()
{
   var _loc4_ = _parent[tgt]._sX - this._sX;
   var _loc3_ = _parent[tgt]._sY - this._sY;
   var _loc5_ = _parent[tgt]._sZ - this._sZ;
   dst = dist_3d(0,0,0,_loc4_,_loc3_,_loc5_);
   var _loc6_ = (dst + 200) / 400;
   _loc4_ += _parent[tgt].v._sX * _loc6_;
   _loc3_ += _parent[tgt].v._sY * _loc6_;
   _loc5_ += _parent[tgt].v._sZ * _loc6_;
   var _loc7_ = Math.atan2(_loc4_,_loc3_);
   var _loc8_ = Math.atan2(_loc5_,distance(0,0,_loc4_,_loc3_));
   this._sH = _loc8_;
   this._sW = _loc7_;
   this._sR = this._parent[this.mst]._sR;
}
stop();
var bofg = 0;
var _HP = 0;
var _type;
var hypt = 0;
var _size = "S";
var fclss = "shoot";
var mst;
var tgt;
var qstgt;
var tgt_main = this.tgt;
var _force = this._parent[mst]._force;
var tgt_force = this._parent[this.tgt]._force;
if(this.tgt_force == undefined)
{
   this.tgt_force = 0;
}
var dam;
var v = new Object();
var basex = 0;
var basey = 0;
var basez = 0;
var speed;
var maxforce;
var maxt = maxforce / speed;
var dst = maxforce;
var axt = 0;
var t;
if(t == null)
{
   t = 0;
}
var fsiz;
var fsound;
var rx = 0;
var ry = 0;
var rz = 0;
var ax = 0;
var ay = 0;
var az = 0;
var actmode;
var wpname;
var onlock = null;
var onkff = false;
var qishelock = false;
var tson = true;
var fyid;
var backmst;
this.attachMovie("AIfy","AI",this.getNextHighestDepth());
this.AI.onfy = function(fy)
{
   if(this._parent.tson)
   {
      this._parent.axt = this._parent.t;
      this._parent.onEnterFrame = function()
      {
         this.ts();
      };
   }
};
if(this._parent[tgt]._type == "ff")
{
   _parent[tgt].onlock = this._name;
}
else
{
   this.tgt = null;
   this.tgt_main = null;
}
this.mainact = function()
{
   this._sZ += v._sZ;
   this._sX += v._sX;
   this._sY += v._sY;
};
if(t >= 0)
{
   play();
   randomra();
   v._sZ = speed * Math.sin(this._sH);
   var ss = speed * Math.cos(this._sH);
   v._sX = ss * Math.sin(this._sW);
   v._sY = ss * Math.cos(this._sW);
   this._sZ += this.v._sZ;
   this._sX += this.v._sX;
   this._sY += this.v._sY;
   _global.snd(this.fsound);
   this._type = "ff";
   _global.SimpList[this._name] = this;
   _root.jiemiam.addff(this._name);
   onEnterFrame = function()
   {
      ts();
   };
}
else
{
   onEnterFrame = function()
   {
      bs();
   };
}
