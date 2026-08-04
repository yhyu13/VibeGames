function randomra()
{
   rx = random(301);
   if(rx < 150)
   {
      rx -= 300;
   }
   ry = random(301);
   if(ry < 150)
   {
      ry -= 300;
   }
   rz = random(301);
   if(rz < 150)
   {
      rz -= 300;
   }
   ax = random(11) - 5;
   ay = random(11) - 5;
   az = random(11) - 5;
   var _loc2_ = 2.5 - _parent[mst]._SP / 5000;
   rx *= _loc2_;
   ry *= _loc2_;
   rz *= _loc2_;
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
         if((this._parent[this.mst].ntact > 0 || this._parent[mst][this.wpname].qn > 0) && this.actmode != "tuji" && this._parent[mst].dst < this._parent[mst][this.wpname].dstlv && _parent[_parent[mst].tgt] != undefined)
         {
            maxt = t + maxforce / speed;
            this._parent[mst][this.wpname].qn--;
            if(this._parent[this.mst].ntact <= 5)
            {
               this._parent[this.mst].ntact = 0;
            }
            this.actmode = "tuji";
            this.tgt = this._parent[this.mst].tgt;
            this.tgt_main = this.tgt;
            if(this._parent[tgt]._type == "ff")
            {
               _parent[tgt].onlock = this._name;
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
      else if(this.actmode == "hold" || this.actmode == "qishe")
      {
         if(this._parent[this.mst] != undefined)
         {
            var _loc5_ = _parent[mst]._sX + 0.2 * rx - this._sX;
            var _loc4_ = _parent[mst]._sY + 0.2 * ry - this._sY;
            var _loc6_ = _parent[mst]._sZ + 0.2 * rz - this._sZ;
            dst = dist_3d(0,0,0,_loc5_,_loc4_,_loc6_);
            if(dst > 200)
            {
               _parent.attachMovie("wjline",_name + "wj" + t,_parent.getNextHighestDepth(),{_sX:this._sX,_sY:this._sY,_sZ:this._sZ,_sX2:this._sX - v._sX,_sY2:this._sY - v._sY,_sZ2:this._sZ - v._sZ,t:4,_siz:4,_sizz:0.5});
               var _loc14_ = Math.atan2(_loc5_,_loc4_);
               var _loc15_ = Math.atan2(_loc6_,distance(0,0,_loc5_,_loc4_));
               var _loc8_ = minangle(this._sH,_loc15_);
               if(_loc8_ > 0.3141592653589793)
               {
                  this._sH += 0.3141592653589793;
               }
               else if(_loc8_ < -0.3141592653589793)
               {
                  this._sH += -0.3141592653589793;
               }
               else
               {
                  this._sH = _loc15_;
               }
               var _loc9_ = minangle(this._sW,_loc14_);
               if(_loc9_ > 0.3141592653589793)
               {
                  this._sW += 0.3141592653589793;
               }
               else if(_loc9_ < -0.3141592653589793)
               {
                  this._sW += -0.3141592653589793;
               }
               else
               {
                  this._sW = _loc14_;
               }
               if(this.bofg == 0)
               {
                  v._sZ = speed * Math.sin(this._sH) * 0.25 + v._sZ * 0.75;
                  var _loc10_ = speed * Math.cos(this._sH);
                  v._sX = _loc10_ * Math.sin(this._sW) * 0.25 + v._sX * 0.75;
                  v._sY = _loc10_ * Math.cos(this._sW) * 0.25 + v._sY * 0.75;
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
               if(this.bofg == 0)
               {
                  v._sX = 0.5 * (_loc5_ + _parent[mst].v._sX);
                  v._sY = 0.5 * (_loc4_ + _parent[mst].v._sY);
                  v._sZ = 0.5 * (_loc6_ + _parent[mst].v._sZ);
               }
               if(dst < 50)
               {
                  if(this.onkff)
                  {
                     if(_parent[tgt]._type == "ff")
                     {
                        if(this._parent[tgt].fclss == "shoot" || this._parent[tgt].fclss == "gd")
                        {
                           this.actmode = "tuji";
                        }
                        var _loc13_ = _parent[tgt]._sX - this._sX;
                        var _loc12_ = _parent[tgt]._sY - this._sY;
                        var _loc11_ = _parent[tgt]._sZ - this._sZ;
                        tdst = dist_3d(0,0,0,_loc13_,_loc12_,_loc11_);
                        if(tdst < 1000)
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
                        for(var _loc7_ in _root.cmrs)
                        {
                           if(_root.cmrs[_loc7_]._type == "ff" && _root.cmrs[_loc7_].tgt == this.mst)
                           {
                              if(_parent[_root.cmrs[_loc7_].onlock] == undefined || _root.cmrs[_loc7_].onlock == this._name)
                              {
                                 this.tgt = _loc7_;
                                 if(this._parent[tgt].fclss == "shoot" || this._parent[tgt].fclss == "gd")
                                 {
                                    this.actmode = "tuji";
                                 }
                                 _loc13_ = _parent[tgt]._sX - this._sX;
                                 _loc12_ = _parent[tgt]._sY - this._sY;
                                 _loc11_ = _parent[tgt]._sZ - this._sZ;
                                 tdst = dist_3d(0,0,0,_loc13_,_loc12_,_loc11_);
                                 if(tdst < 1000)
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
                     _loc13_ = this._parent[this._parent[mst].tgt]._sX - this._sX;
                     _loc12_ = this._parent[this._parent[mst].tgt]._sY - this._sY;
                     _loc11_ = this._parent[this._parent[mst].tgt]._sZ - this._sZ;
                     tdst = dist_3d(0,0,0,_loc13_,_loc12_,_loc11_);
                     if(tdst < 1000 && this._parent[this.mst].covon)
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
      else
      {
         _parent[tgt].onkillff(this._name);
         _parent.attachMovie("wjline",_name + "wj" + t,_parent.getNextHighestDepth(),{_sX:this._sX,_sY:this._sY,_sZ:this._sZ,_sX2:this._sX - v._sX,_sY2:this._sY - v._sY,_sZ2:this._sZ - v._sZ,t:4,_siz:4,_sizz:0.5});
         if(this._parent[this.tgt] != undefined && this._parent[this.mst]._zt == "nor")
         {
            if(this._parent[tgt]._type == "ff")
            {
               this.shooton = true;
               _parent[tgt].onlock = this._name;
            }
            _loc5_ = _parent[tgt]._sX + rx - this._sX;
            _loc4_ = _parent[tgt]._sY + ry - this._sY;
            _loc6_ = _parent[tgt]._sZ + rz - this._sZ;
            dst = dist_3d(0,0,0,_loc5_,_loc4_,_loc6_);
            if(dst > 200)
            {
               _loc14_ = Math.atan2(_loc5_,_loc4_);
               _loc15_ = Math.atan2(_loc6_,distance(0,0,_loc5_,_loc4_));
               _loc8_ = minangle(this._sH,_loc15_);
               if(_loc8_ > 0.3141592653589793)
               {
                  this._sH += 0.3141592653589793;
               }
               else if(_loc8_ < -0.3141592653589793)
               {
                  this._sH += -0.3141592653589793;
               }
               else
               {
                  this._sH = _loc15_;
               }
               _loc9_ = minangle(this._sW,_loc14_);
               if(_loc9_ > 0.3141592653589793)
               {
                  this._sW += 0.3141592653589793;
               }
               else if(_loc9_ < -0.3141592653589793)
               {
                  this._sW += -0.3141592653589793;
               }
               else
               {
                  this._sW = _loc14_;
               }
               if(this.bofg == 0)
               {
                  v._sZ = speed * Math.sin(this._sH) * 0.25 + v._sZ * 0.75;
                  _loc10_ = speed * Math.cos(this._sH);
                  v._sX = _loc10_ * Math.sin(this._sW) * 0.25 + v._sX * 0.75;
                  v._sY = _loc10_ * Math.cos(this._sW) * 0.25 + v._sY * 0.75;
               }
            }
            else
            {
               if(this.bofg == 0)
               {
                  v._sX = 0.5 * (_loc5_ + _parent[tgt].v._sX);
                  v._sY = 0.5 * (_loc4_ + _parent[tgt].v._sY);
                  v._sZ = 0.5 * (_loc6_ + _parent[tgt].v._sZ);
               }
               _loc5_ = this._parent[this.tgt]._sX - this._sX;
               _loc4_ = this._parent[this.tgt]._sY - this._sY;
               _loc6_ = this._parent[this.tgt]._sZ - this._sZ;
               _loc14_ = Math.atan2(_loc5_,_loc4_);
               _loc15_ = Math.atan2(_loc6_,distance(0,0,_loc5_,_loc4_));
               this._sH = _loc15_;
               this._sW = _loc14_;
            }
            if(dst < 50 || this._parent[tgt]._type == "ff" && t >= axt + 10 && dst < 1000)
            {
               if(this._parent[tgt]._type == "ff")
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
               else if(_parent[mst].ntcd == 0 || _parent[mst].ntcd > 15)
               {
                  if(_parent[mst].ntcd == 0)
                  {
                     _parent[mst].ntcd = 20;
                  }
                  else
                  {
                     _parent[mst].ntcd--;
                  }
                  axt = t;
                  if(this.tgt == _root.jiemiam.mst)
                  {
                     _root.jiemiam.hkxsq[this._name].jiantou.play();
                  }
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
         }
         else if(this._parent[this.mst]._zt == "nor")
         {
            if(this.onkff)
            {
               for(_loc7_ in _root.cmrs)
               {
                  if(_root.cmrs[_loc7_]._type == "ff" && _root.cmrs[_loc7_].tgt == this.mst)
                  {
                     if(_parent[_root.cmrs[_loc7_].onlock] == undefined || _root.cmrs[_loc7_].onlock == this._name)
                     {
                        this.tgt = _loc7_;
                        axt = t;
                        onEnterFrame = function()
                        {
                           ts();
                        };
                        _parent[tgt].onlock = this._name;
                        break;
                     }
                  }
               }
            }
            if(this._parent[this.tgt] == undefined)
            {
               this.tgt = this.tgt_main;
            }
            if(this._parent[this.tgt] == undefined)
            {
               onEnterFrame = function()
               {
                  back();
               };
            }
         }
         if(t == axt + 30)
         {
            axt = t;
            onEnterFrame = function()
            {
               ts();
            };
         }
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
         if((this._parent[this.mst].ntact > 0 || this._parent[mst][this.wpname].qn > 0) && this.actmode != "tuji" && this._parent[mst].dst < this._parent[mst][this.wpname].dstlv && _parent[_parent[mst].tgt] != undefined)
         {
            maxt = t + maxforce / speed;
            this._parent[mst][this.wpname].qn--;
            if(this._parent[this.mst].ntact <= 5)
            {
               this._parent[this.mst].ntact = 0;
            }
            this.actmode = "tuji";
            this.tgt = this._parent[this.mst].tgt;
            this.tgt_main = this.tgt;
            if(this._parent[tgt]._type == "ff")
            {
               _parent[tgt].onlock = this._name;
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
         if(this.actmode != "tuji")
         {
            if(_parent[mst]._SP >= 10000 || this.onkff)
            {
               maxt = t + 300;
            }
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
         if((this._parent[this.mst].ntact > 0 || this._parent[mst][this.wpname].qn > 0) && this.actmode != "tuji" && this._parent[mst].dst < this._parent[mst][this.wpname].dstlv && _parent[_parent[mst].tgt] != undefined)
         {
            maxt = t + maxforce / speed;
            this._parent[mst][this.wpname].qn--;
            if(this._parent[this.mst].ntact <= 5)
            {
               this._parent[this.mst].ntact = 0;
            }
            this.actmode = "tuji";
            this.tgt = this._parent[this.mst].tgt;
            this.tgt_main = this.tgt;
            if(this._parent[tgt]._type == "ff")
            {
               _parent[tgt].onlock = this._name;
            }
         }
      }
      t++;
      if(this.actmode == "tuji")
      {
         _parent[tgt].onkillff(this._name);
      }
      _parent.attachMovie("wjline",_name + "wj" + t,_parent.getNextHighestDepth(),{_sX:this._sX,_sY:this._sY,_sZ:this._sZ,_sX2:this._sX - v._sX,_sY2:this._sY - v._sY,_sZ2:this._sZ - v._sZ,t:4,_siz:4,_sizz:0.5});
      var _loc4_ = 15;
      if(t == axt + 10)
      {
         if(this._parent[this.tgt] != undefined && this._parent[this.mst]._zt == "nor")
         {
            _root.jiemiam.hkxsq[this._name].jiantou.gotoAndStop(1);
            _loc4_ = mz();
            v._sZ = 150 * Math.sin(this._sH);
            var _loc5_ = 150 * Math.cos(this._sH);
            v._sX = _loc5_ * Math.sin(this._sW);
            v._sY = _loc5_ * Math.cos(this._sW);
            snd("snd_launch0");
            this._parent.attachMovie("dd_fygj",_name + "ddq" + t,this._parent.getNextHighestDepth(),{_sX:_sX,_sY:_sY,_sZ:_sZ,_sW:_sW,_sH:_sH,_slo:10,_siz:1.5,dam:this.dam});
            this._parent[_name + "ddq" + t].mst = this.mst;
            this._parent[_name + "ddq" + t].tgt = this.tgt;
            this._parent[_name + "ddq" + t].maxforce = (_loc4_ + 3) * 150;
            this._parent[_name + "ddq" + t].bst = this._name;
            this._parent[this.tgt].AI.onfy(this._name);
            this.tson = false;
         }
      }
      if(t >= axt + _loc4_ + 3)
      {
         if(this.actmode == "tuji")
         {
            this.shooton = true;
         }
         else
         {
            this.actmode = "hold";
         }
         this.tson = true;
         axt = t;
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
         if((this._parent[this.mst].ntact > 0 || this._parent[mst][this.wpname].qn > 0) && this.actmode != "tuji" && this._parent[mst].dst < this._parent[mst][this.wpname].dstlv && _parent[_parent[mst].tgt] != undefined)
         {
            maxt = t + maxforce / speed;
            this._parent[mst][this.wpname].qn--;
            if(this._parent[this.mst].ntact <= 5)
            {
               this._parent[this.mst].ntact = 0;
            }
            this.actmode = "tuji";
            this.tgt = this._parent[this.mst].tgt;
            this.tgt_main = this.tgt;
            if(this._parent[tgt]._type == "ff")
            {
               _parent[tgt].onlock = this._name;
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
      }
      else if(t == axt + 10)
      {
         if(this._parent[this.qstgt] != undefined && this._parent[this.mst]._zt == "nor")
         {
            _root.jiemiam.hkxsq[this._name].jiantou.gotoAndStop(1);
            if(this.qishelock)
            {
               var _loc5_ = this._parent[this.qstgt]._sX - this._sX;
               var _loc4_ = this._parent[this.qstgt]._sY - this._sY;
               var _loc6_ = this._parent[this.qstgt]._sZ - this._sZ;
            }
            else
            {
               _loc5_ = this._parent[this.qstgt]._sX - this._sX + random(51) - 25;
               _loc4_ = this._parent[this.qstgt]._sY - this._sY + random(51) - 25;
               _loc6_ = this._parent[this.qstgt]._sZ - this._sZ + random(51) - 25;
            }
            dst = dist_3d(0,0,0,_loc5_,_loc4_,_loc6_);
            var _loc7_ = (dst + random(40) * 10) / 200;
            _loc5_ += this._parent[this.qstgt].v._sX * _loc7_;
            _loc4_ += this._parent[this.qstgt].v._sY * _loc7_;
            _loc6_ += this._parent[this.qstgt].v._sZ * _loc7_;
            var _loc8_ = Math.atan2(_loc5_,_loc4_);
            var _loc9_ = Math.atan2(_loc6_,distance(0,0,_loc5_,_loc4_));
            this._sH = _loc9_;
            this._sW = _loc8_;
            snd("fyp");
            this._parent.attachMovie("dd_fygs",_name + "ddq" + t,this._parent.getNextHighestDepth(),{_sX:_sX,_sY:_sY,_sZ:_sZ,_sW:_sW,_sH:_sH,_slo:random(20) + 10,_siz:1.5,dam:this.dam,_alpha:0});
            this._parent[_name + "ddq" + t].mst = this.mst;
            this._parent[_name + "ddq" + t].tgt = this.qstgt;
            this._parent[this.qstgt].AI.onfy(this._name);
            this.tson = false;
         }
      }
      if(t == axt + 15)
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
      if(_parent[mst]._SP >= 10000)
      {
         maxt = t + 300;
         this.actmode == "hold";
         axt = t;
         this.tgt = null;
         this.tgt_main = null;
         randomra();
         onEnterFrame = function()
         {
            zd();
         };
      }
      else if(this.backmst && this._parent[this.mst] != undefined)
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
               this._parent[mst][this.wpname].showit();
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
   var _loc5_ = _parent[tgt]._sX - this._sX;
   var _loc3_ = _parent[tgt]._sY - this._sY;
   var _loc6_ = _parent[tgt]._sZ - this._sZ;
   dst = dist_3d(0,0,0,_loc5_,_loc3_,_loc6_);
   var _loc4_ = (dst + 150) / 150;
   _loc5_ += _parent[tgt].v._sX * _loc4_;
   _loc3_ += _parent[tgt].v._sY * _loc4_;
   _loc6_ += _parent[tgt].v._sZ * _loc4_;
   var _loc7_ = Math.atan2(_loc5_,_loc3_);
   var _loc8_ = Math.atan2(_loc6_,distance(0,0,_loc5_,_loc3_));
   this._sH = _loc8_;
   this._sW = _loc7_;
   return _loc4_;
}
stop();
var bofg = 0;
var _HP = 0;
var _type;
var hypt = 0;
var _size = "S";
var fclss = "gd";
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
var shooton = false;
var tson = true;
var fyid;
var backmst;
this.attachMovie("AIfy","AI",this.getNextHighestDepth());
this.AI.onfy = function(fy)
{
   if(this._parent.actmode == "tuji")
   {
      this._parent.tgt = fy;
      this._parent._parent[this._parent.tgt].onlock = this._parent._name;
   }
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
else if(this.actmode == "hold")
{
   this.tgt = null;
   this.tgt_main = null;
   maxt = 300;
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
