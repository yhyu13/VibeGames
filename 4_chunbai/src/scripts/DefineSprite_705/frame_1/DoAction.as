function mmove()
{
   _X = _root._xmouse;
   _Y = _root._ymouse;
}
function doint()
{
   this._visible = true;
   onMouseMove = function()
   {
      mmove();
   };
   this.onEnterFrame = function()
   {
      Mouse.hide();
      if(MWflg > 0)
      {
         MWflg--;
      }
      mmove();
   };
   this.gotoAndStop(2);
}
function selectmode(num)
{
   if(num == 0)
   {
      mouseListener.onMouseWheel = null;
      this.gotoAndStop(2);
      this._visible = true;
      this.doit = null;
      _global.stopAll = false;
      _root.jiemiam.gotoAndStop("emp");
   }
   else if(num == 1)
   {
      this.Msetx = 0;
      this.Msety = 0;
      this.CModflg = 0;
      mouseListener.onMouseWheel = function(delta)
      {
         if(MKmod)
         {
            if(MWflg == 0)
            {
               var _loc4_ = undefined;
               if(delta > 0)
               {
                  _loc4_ = 1;
               }
               else
               {
                  _loc4_ = -1;
               }
               var _loc2_ = _root.cmrs[mst].weaponFnow;
               var _loc3_ = 1;
               while(_loc3_ <= 4)
               {
                  _loc2_ -= _loc4_;
                  if(_loc2_ <= 0)
                  {
                     _loc2_ = 4;
                  }
                  else if(_loc2_ >= 5)
                  {
                     _loc2_ = 1;
                  }
                  if(_root.cmrs[mst].selectweaponF(_loc2_))
                  {
                     snd("hwq");
                     break;
                  }
                  _loc3_ = _loc3_ + 1;
               }
               MWflg = 5;
            }
         }
      };
      onMouseDown = function()
      {
         if(getTimer() - MDt >= 500)
         {
            MDt = getTimer();
         }
         onMouseHode = function()
         {
            if(MKmod)
            {
               _root.cmrs[this.mst].doweapon();
            }
            if(MHodeflg >= 0)
            {
               MHodeflg--;
            }
         };
         onMouseUp = function()
         {
            onMouseHode = null;
            MHodeflg = 5;
         };
      };
      this._visible = true;
      this.doit = function()
      {
         mode1();
      };
      this.gotoAndStop(4);
      Cmr.tgt = this.mst;
      _root.jiemiam._visible = true;
      if(_root.cmrs[this.mst]._size != "L")
      {
         Cmr.moveandroat = function()
         {
            this.mode1(_root.cmrs[this.tgt],0,- Cmr.BD,10,0.5);
         };
         this.CModflg = 0;
      }
      else
      {
         Cmr.moveandroat = function()
         {
            this.mode1(_root.cmrs[this.tgt],0,-4 * Cmr.BD,10,0.25);
         };
         this.CModflg = 1;
      }
   }
   else if(num == 2)
   {
      mouseListener.onMouseWheel = null;
      onMouseDown = function()
      {
         if(getTimer() - MDt >= 500)
         {
            MDt = getTimer();
         }
         onMouseHode = function()
         {
            if(MHodeflg < 0)
            {
               var _loc5_ = this._x - _root.cmrs._x - Cmr._cw * 0.5;
               var _loc6_ = Cmr._ch * 0.5 - (this._y - _root.cmrs._y);
               var _loc4_ = Cmr.Zoom;
               objrotate(_global.Cmr,0.1 * Math.atan2(_loc5_,_loc4_),0.1 * Math.atan2(_loc6_,distance(0,0,_loc5_,_loc4_)),0);
               this.gotoAndStop(3);
            }
            else
            {
               MHodeflg--;
            }
         };
         onMouseUp = function()
         {
            this.gotoAndStop(2);
            onMouseHode = null;
            MHodeflg = 5;
         };
      };
      this._visible = true;
      this.doit = function()
      {
         mode2();
      };
      this.gotoAndStop(2);
      _root.jiemiam._visible = false;
      Cmr.tgt = null;
      Cmr.moveandroat = null;
   }
   else if(num == 3)
   {
      mouseListener.onMouseWheel = null;
      onMouseDown = function()
      {
         if(getTimer() - MDt >= 500)
         {
            MDt = getTimer();
         }
         onMouseHode = function()
         {
            if(MHodeflg < 0)
            {
               this.gotoAndStop(3);
            }
            else
            {
               MHodeflg--;
            }
         };
         onMouseUp = function()
         {
            this.gotoAndStop(2);
            onMouseHode = null;
            MHodeflg = 5;
         };
      };
      this._visible = true;
      this.doit = function()
      {
         if(Key.isDown(13))
         {
            if(!EnisDown)
            {
               if(!stopAll)
               {
                  this.sp = _root.Bgm_box.music_3.position;
                  bgm(0);
                  stopAllSounds();
                  this.selectmode(2);
                  _root.ztbar.gotoAndStop(2);
               }
               else
               {
                  _root.Bgm_box.music_3.start(0.001 * this.sp);
                  _root.Bgm_box.music_3.onSoundComplete = function()
                  {
                     bgm(3,0);
                     _root.Bgm_box.music_3.onSoundComplete = null;
                  };
                  this.selectmode(3);
                  _root.ztbar.gotoAndStop(1);
               }
            }
            EnisDown = true;
         }
         else
         {
            EnisDown = false;
         }
         if(Key.isDown(KEYMAP.func_3))
         {
            if(this.switchflg)
            {
               if(this.CModflg == 0)
               {
                  _root.jiemiam._visible = true;
                  Cmr.moveandroat = function()
                  {
                     this.mode1(_root.cmrs[this.tgt],0,-4 * Cmr.BD,10,0.25);
                  };
                  this.CModflg = 1;
               }
               else if(this.CModflg == 1)
               {
                  _root.jiemiam._visible = false;
                  _global.Cmr.moveandroat = function()
                  {
                     this.mode2(_root.cmrs[this.tgt],100,200);
                  };
                  this.CModflg = -1;
               }
               else if(this.CModflg == -1)
               {
                  _root.jiemiam._visible = true;
                  Cmr.moveandroat = function()
                  {
                     this.mode1(_root.cmrs[this.tgt],0,- Cmr.BD,10,0.5);
                  };
                  this.CModflg = 0;
               }
            }
            this.switchflg = false;
         }
         else
         {
            this.switchflg = true;
         }
         if(Key.isDown(KEYMAP.func_1))
         {
            if(!ZisDown)
            {
               delete _root.cmrs[this.mst].AI;
               _root.ctrl.selectmode(1);
            }
            ZisDown = true;
         }
         else
         {
            ZisDown = false;
         }
      };
      this.gotoAndStop(2);
      Cmr.tgt = this.mst;
      if(this.CModflg == 1)
      {
         _root.jiemiam._visible = true;
         Cmr.moveandroat = function()
         {
            this.mode1(_root.cmrs[this.tgt],0,-4 * Cmr.BD,10,0.25);
         };
         this.CModflg = 1;
      }
      else if(this.CModflg == -1)
      {
         _root.jiemiam._visible = false;
         _global.Cmr.moveandroat = function()
         {
            this.mode2(_root.cmrs[this.tgt],100,200);
         };
         this.CModflg = -1;
      }
      else if(this.CModflg == 0)
      {
         _root.jiemiam._visible = true;
         Cmr.moveandroat = function()
         {
            this.mode1(_root.cmrs[this.tgt],0,- Cmr.BD,10,0.5);
         };
         this.CModflg = 0;
      }
   }
}
function mode1()
{
   if(Key.isDown(KEYMAP.func_2))
   {
      if(!XisDown)
      {
         MKmod = !MKmod;
      }
      XisDown = true;
   }
   else
   {
      XisDown = false;
   }
   _root.cmrs[this.mst].xunhangon = false;
   if(MKmod)
   {
      this._visible = !_root.jiemiam.sniperHUD._visible;
      var _loc11_ = undefined;
      if(Key.isDown(KEYMAP.move_1) && Key.isDown(KEYMAP.move_2))
      {
         _loc11_ = 0;
      }
      else if(Key.isDown(KEYMAP.move_1))
      {
         _loc11_ = 1;
      }
      else if(Key.isDown(KEYMAP.move_2))
      {
         _loc11_ = -1;
      }
      else
      {
         _loc11_ = 0;
      }
      var _loc10_ = undefined;
      if(Key.isDown(KEYMAP.move_3) && Key.isDown(KEYMAP.move_4))
      {
         _loc10_ = 0;
      }
      else if(Key.isDown(KEYMAP.move_3))
      {
         _loc10_ = -1;
      }
      else if(Key.isDown(KEYMAP.move_4))
      {
         _loc10_ = 1;
      }
      else
      {
         _loc10_ = 0;
      }
      var _loc12_ = undefined;
      if(Key.isDown(KEYMAP.move_5) && Key.isDown(KEYMAP.move_6))
      {
         _loc12_ = 0;
      }
      else if(Key.isDown(KEYMAP.move_5))
      {
         _loc12_ = 1;
      }
      else if(Key.isDown(KEYMAP.move_6))
      {
         _loc12_ = -1;
      }
      else
      {
         _loc12_ = 0;
      }
      var _loc15_ = undefined;
      var _loc14_ = undefined;
      if(Key.isDown(KEYMAP.move_f2))
      {
         _loc14_ = true;
      }
      else
      {
         _loc14_ = false;
      }
      if(Key.isDown(KEYMAP.move_f1))
      {
         _loc15_ = true;
      }
      else
      {
         _loc15_ = false;
      }
      _root.cmrs[this.mst].dopow(_loc11_,_loc10_,_loc12_,_loc14_,_loc15_);
      _root.cmrs[this.mst].setwill(this._x - _root.cmrs._x - Cmr._cw * 0.5,this._y - _root.cmrs._y - Cmr._ch * 0.5);
   }
   else
   {
      if(_root.cmrs[this.mst].FDon > 0)
      {
         this.xunhangT();
      }
      else if(Key.isDown(KEYMAP.move_f1) || Key.isDown(KEYMAP.move_f2) || this.xunhangon || _root.cmrs[this.mst].onkf == 0 && _root.cmrs[_root.cmrs[this.mst].tgt] == undefined)
      {
         _root.cmrs[this.mst].xunhangon = true;
         this.xunhangM();
         this.autoST();
      }
      else
      {
         this.xunhangT();
      }
      if(Key.isDown(KEYMAP.switchWPT))
      {
         if(_root.cmrs[this.mst].weaponTeam == 0)
         {
            if(_root.cmrs[this.mst].switchweaponT())
            {
               snd("hwq");
            }
         }
      }
      else if(_root.cmrs[this.mst].weaponTeam == 1)
      {
         if(_root.cmrs[this.mst].switchweaponT())
         {
            snd("hwq");
         }
      }
      if(Key.isDown(KEYMAP.selectTGT) || _root.cmrs[_root.cmrs[mst].tgt] == undefined || _root.cmrs[_root.cmrs[mst].tgt]._zt == "broken")
      {
         if(this.weaponReady == 0)
         {
            var _loc9_ = null;
            var _loc4_ = Infinity;
            for(var _loc13_ in _global.UnitList)
            {
               if(_root.cmrs[mst].tgt != _loc13_ && _global.UnitList[_loc13_]._force != _root.cmrs[this.mst]._force && _global.UnitList[_loc13_]._zt != "broken")
               {
                  var _loc8_ = _global.UnitList[_loc13_]._sX - _root.cmrs[mst]._sX;
                  var _loc7_ = _global.UnitList[_loc13_]._sY - _root.cmrs[mst]._sY;
                  var _loc6_ = _global.UnitList[_loc13_]._sZ - _root.cmrs[mst]._sZ;
                  var _loc5_ = _global.dist_3d(0,0,0,_loc8_,_loc7_,_loc6_);
                  if(_global.UnitList[_loc13_]._sc > 0)
                  {
                     _loc5_ *= 0.5;
                  }
                  if(_loc5_ < _loc4_)
                  {
                     _loc4_ = _loc5_;
                     _loc9_ = _loc13_;
                  }
               }
            }
            for(_loc13_ in _global.SimpList)
            {
               if(_root.cmrs[mst].tgt != _loc13_ && _global.SimpList[_loc13_].canlock && _global.SimpList[_loc13_]._force != _root.cmrs[this.mst]._force)
               {
                  _loc8_ = _global.SimpList[_loc13_]._sX - _root.cmrs[mst]._sX;
                  _loc7_ = _global.SimpList[_loc13_]._sY - _root.cmrs[mst]._sY;
                  _loc6_ = _global.SimpList[_loc13_]._sZ - _root.cmrs[mst]._sZ;
                  _loc5_ = _global.dist_3d(0,0,0,_loc8_,_loc7_,_loc6_);
                  if(_loc5_ < _loc4_)
                  {
                     _loc4_ = _loc5_;
                     _loc9_ = _loc13_;
                  }
               }
            }
            if(_loc9_ != null && _root.cmrs[this.mst].tgt != _root.cmrs[this.mst].gettgt(_loc9_))
            {
               snd("lockff");
               this.weaponReady = 15;
            }
         }
      }
      else if(Key.isDown(KEYMAP.selectAndPlayWP_1))
      {
         if(_root.cmrs[this.mst].weaponFnow == 1 && this.weaponReady == 0)
         {
            _root.cmrs[this.mst].doweapon();
         }
         else if(_root.cmrs[this.mst].selectweaponF(1))
         {
            snd("hwq");
            this.weaponReady = 5;
         }
      }
      else if(Key.isDown(KEYMAP.selectAndPlayWP_2))
      {
         if(_root.cmrs[this.mst].weaponFnow == 2 && this.weaponReady == 0)
         {
            _root.cmrs[this.mst].doweapon();
         }
         else if(_root.cmrs[this.mst].selectweaponF(2))
         {
            snd("hwq");
            this.weaponReady = 5;
         }
      }
      else if(Key.isDown(KEYMAP.selectAndPlayWP_3))
      {
         if(_root.cmrs[this.mst].weaponFnow == 3 && this.weaponReady == 0)
         {
            _root.cmrs[this.mst].doweapon();
         }
         else if(_root.cmrs[this.mst].selectweaponF(3))
         {
            snd("hwq");
            this.weaponReady = 5;
         }
      }
      else if(Key.isDown(KEYMAP.selectAndPlayWP_4))
      {
         if(_root.cmrs[this.mst].weaponFnow == 4 && this.weaponReady == 0)
         {
            _root.cmrs[this.mst].doweapon();
         }
         else if(_root.cmrs[this.mst].selectweaponF(4))
         {
            snd("hwq");
            this.weaponReady = 5;
         }
      }
      else
      {
         this.weaponReady = 0;
      }
   }
   if(this.weaponReady > 0)
   {
      this.weaponReady = this.weaponReady - 1;
   }
   onMouseHode();
   onMouseDhits();
   if(!MKmod || _root.cmrs[mst].stopow || _root.cmrs[mst].GDon || _root.cmrs[mst].scmrfg != 0)
   {
      this.gotoAndStop(2);
   }
   else
   {
      this.gotoAndStop(4);
      this.mouseTGT();
   }
   if(Key.isDown(192) && _global.Player.ID == "phixcatz")
   {
      _root.cmrs[this.mst]._SP = 10000;
   }
   if(Key.isDown(13))
   {
      if(!EnisDown)
      {
         if(!stopAll)
         {
            this.sp = _root.Bgm_box.music_3.position;
            bgm(0);
            stopAllSounds();
            this.selectmode(2);
            _root.jiemiam._visible = false;
            _root.ztbar.gotoAndStop(2);
         }
         else
         {
            _root.Bgm_box.music_3.start(0.001 * this.sp);
            _root.Bgm_box.music_3.onSoundComplete = function()
            {
               bgm(3,0);
               _root.Bgm_box.music_3.onSoundComplete = null;
            };
            this.selectmode(1);
            _root.jiemiam._visible = true;
            _root.ztbar.gotoAndStop(1);
         }
      }
      EnisDown = true;
   }
   else
   {
      EnisDown = false;
   }
   if(Key.isDown(KEYMAP.func_1))
   {
      if(!ZisDown)
      {
         _root.cmrs[this.mst].firectrl = function()
         {
            this.fireauto();
         };
         _root.cmrs[this.mst].firectrlmode = "AUTO";
         if(_root.cmrs[this.mst]._type == "SC")
         {
            _root.cmrs[this.mst].AI = new clazz.AIcraft_phix(this.mst);
         }
         else
         {
            _root.cmrs[this.mst].AI = new clazz.AI_phix(this.mst);
         }
         _root.ctrl.selectmode(3);
      }
      ZisDown = true;
   }
   else
   {
      ZisDown = false;
   }
   if(Key.isDown(KEYMAP.selectWP_1))
   {
      if(this.switchflg)
      {
         if(_root.cmrs[this.mst].weaponFnow != 1)
         {
            if(_root.cmrs[this.mst].selectweaponF(1))
            {
               snd("hwq");
            }
         }
         else if(_root.cmrs[this.mst].switchweaponT())
         {
            snd("hwq");
         }
      }
      this.switchflg = false;
   }
   else if(Key.isDown(KEYMAP.selectWP_2))
   {
      if(this.switchflg)
      {
         if(_root.cmrs[this.mst].weaponFnow != 2)
         {
            if(_root.cmrs[this.mst].selectweaponF(2))
            {
               snd("hwq");
            }
         }
         else if(_root.cmrs[this.mst].switchweaponT())
         {
            snd("hwq");
         }
      }
      this.switchflg = false;
   }
   else if(Key.isDown(KEYMAP.selectWP_3))
   {
      if(this.switchflg)
      {
         if(_root.cmrs[this.mst].weaponFnow != 3)
         {
            if(_root.cmrs[this.mst].selectweaponF(3))
            {
               snd("hwq");
            }
         }
         else if(_root.cmrs[this.mst].switchweaponT())
         {
            snd("hwq");
         }
      }
      this.switchflg = false;
   }
   else if(Key.isDown(KEYMAP.selectWP_4))
   {
      if(this.switchflg)
      {
         if(_root.cmrs[this.mst].weaponFnow != 4)
         {
            if(_root.cmrs[this.mst].selectweaponF(4))
            {
               snd("hwq");
            }
         }
         else if(_root.cmrs[this.mst].switchweaponT())
         {
            snd("hwq");
         }
      }
      this.switchflg = false;
   }
   else if(MKmod && Key.isDown(4))
   {
      if(this.switchflg)
      {
         if(_root.cmrs[this.mst].switchweaponT())
         {
            snd("hwq");
         }
      }
      this.switchflg = false;
   }
   else if(Key.isDown(KEYMAP.func_3))
   {
      if(this.switchflg)
      {
         if(this.CModflg == 0)
         {
            Cmr.moveandroat = function()
            {
               this.mode1(_root.cmrs[this.tgt],0,-4 * Cmr.BD,10,0.25);
            };
            this.CModflg = 1;
         }
         else if(this.CModflg != 0)
         {
            Cmr.moveandroat = function()
            {
               this.mode1(_root.cmrs[this.tgt],0,- Cmr.BD,10,0.5);
            };
            this.CModflg = 0;
         }
      }
      this.switchflg = false;
   }
   else
   {
      this.switchflg = true;
   }
   if(Key.isDown(KEYMAP.castSkill))
   {
      _root.cmrs[this.mst].CastSkill();
   }
}
function mode2()
{
   onMouseHode();
   onMouseDhits();
   if(Key.isDown(13))
   {
      if(!EnisDown)
      {
         if(!stopAll)
         {
            this.sp = _root.Bgm_box.music_3.position;
            bgm(0);
            stopAllSounds();
            this.selectmode(2);
            _root.jiemiam._visible = false;
            _root.ztbar.gotoAndStop(2);
         }
         else
         {
            _root.Bgm_box.music_3.start(0.001 * this.sp);
            _root.Bgm_box.music_3.onSoundComplete = function()
            {
               bgm(3,0);
               _root.Bgm_box.music_3.onSoundComplete = null;
            };
            if(_root.cmrs[this.mst].AI == undefined)
            {
               this.selectmode(1);
            }
            else
            {
               this.selectmode(3);
            }
            _root.ztbar.gotoAndStop(1);
         }
      }
      EnisDown = true;
   }
   else
   {
      EnisDown = false;
   }
   if(Key.isDown(KEYMAP.func_1))
   {
      if(ZisDown)
      {
      }
      ZisDown = true;
   }
   else
   {
      ZisDown = false;
   }
   var _loc5_ = undefined;
   if(Key.isDown(KEYMAP.move_1) && Key.isDown(KEYMAP.move_2))
   {
      _loc5_ = 0;
   }
   else if(Key.isDown(KEYMAP.move_1))
   {
      _loc5_ = 5;
   }
   else if(Key.isDown(KEYMAP.move_2))
   {
      _loc5_ = -5;
   }
   else
   {
      _loc5_ = 0;
   }
   var _loc4_ = undefined;
   if(Key.isDown(KEYMAP.move_3) && Key.isDown(KEYMAP.move_4))
   {
      _loc4_ = 0;
   }
   else if(Key.isDown(KEYMAP.move_3))
   {
      _loc4_ = -5;
   }
   else if(Key.isDown(KEYMAP.move_4))
   {
      _loc4_ = 5;
   }
   else
   {
      _loc4_ = 0;
   }
   var _loc6_ = undefined;
   if(Key.isDown(KEYMAP.move_5) && Key.isDown(KEYMAP.move_6))
   {
      _loc6_ = 0;
   }
   else if(Key.isDown(KEYMAP.move_5))
   {
      _loc6_ = 5;
   }
   else if(Key.isDown(KEYMAP.move_6))
   {
      _loc6_ = -5;
   }
   else
   {
      _loc6_ = 0;
   }
   objmove(_global.Cmr,_loc4_,_loc5_,_loc6_);
}
function Cturnto(tgt)
{
   if(tgt._sX != undefined)
   {
      var _loc9_ = new Object();
      _loc9_ = _global.sToc(tgt._sX - _root.cmrs[this.mst]._sX,tgt._sY - _root.cmrs[this.mst]._sY,tgt._sZ - _root.cmrs[this.mst]._sZ,_root.cmrs[this.mst]._sW,_root.cmrs[this.mst]._sH,_root.cmrs[this.mst]._sR);
      var _loc5_ = _loc9_.x;
      var _loc4_ = _loc9_.z;
      var _loc10_ = _loc9_.y;
      var _loc8_ = _global.Cmr.Zoom / _loc10_;
      if(_loc8_ < 0)
      {
         _loc8_ = - _loc8_;
         _loc10_ = - _global.Cmr.Zoom;
      }
      else
      {
         _loc10_ = _global.Cmr.Zoom;
      }
      _loc5_ *= _loc8_;
      _loc4_ *= _loc8_;
      var _loc13_ = undefined;
      var _loc12_ = undefined;
      var _loc7_ = Math.abs(_global.Cmr.wree * _global.Cmr.Zoom / _loc5_);
      var _loc6_ = Math.abs(_global.Cmr.hree * _global.Cmr.Zoom / _loc4_);
      if(_loc7_ < 1 || _loc6_ < 1)
      {
         if(Math.abs(_loc7_) < Math.abs(_loc6_))
         {
            _loc13_ = _loc5_ * _loc7_;
            _loc12_ = (- _loc4_) * _loc7_;
         }
         else
         {
            _loc13_ = _loc5_ * _loc6_;
            _loc12_ = (- _loc4_) * _loc6_;
         }
      }
      else if(_loc10_ < 0)
      {
         if(_loc5_ == 0 && _loc4_ == 0)
         {
            _loc13_ = 0;
            _loc12_ = (- _global.Cmr.hree) * _global.Cmr.Zoom;
         }
         else if(Math.abs(_loc7_) < Math.abs(_loc6_))
         {
            _loc13_ = _loc5_ * _loc7_;
            _loc12_ = (- _loc4_) * _loc7_;
         }
         else
         {
            _loc13_ = _loc5_ * _loc6_;
            _loc12_ = (- _loc4_) * _loc6_;
         }
      }
      else
      {
         _loc13_ = _loc5_;
         _loc12_ = - _loc4_;
      }
   }
   else
   {
      _loc13_ = 0;
      _loc12_ = 0;
      this.Msetx = 0;
      this.Msety = 0;
   }
   if(!isNaN(_loc13_) && !isNaN(_loc12_))
   {
      this.Msetx += (_loc13_ - this.Msetx) * 0.5;
      this.Msety += (_loc12_ - this.Msety) * 0.5;
   }
   else
   {
      trace("ctrl");
   }
   _root.cmrs[this.mst].setwill(this.Msetx,this.Msety);
}
function Cturnback(tgt)
{
   if(tgt._sX != undefined)
   {
      var _loc9_ = new Object();
      _loc9_ = _global.sToc(tgt._sX - _root.cmrs[this.mst]._sX,tgt._sY - _root.cmrs[this.mst]._sY,tgt._sZ - _root.cmrs[this.mst]._sZ,_root.cmrs[this.mst]._sW,_root.cmrs[this.mst]._sH,_root.cmrs[this.mst]._sR);
      var _loc5_ = - _loc9_.x;
      var _loc4_ = - _loc9_.z;
      var _loc10_ = - _loc9_.y;
      var _loc8_ = _global.Cmr.Zoom / _loc10_;
      if(_loc8_ < 0)
      {
         _loc8_ = - _loc8_;
         _loc10_ = - _global.Cmr.Zoom;
      }
      else
      {
         _loc10_ = _global.Cmr.Zoom;
      }
      _loc5_ *= _loc8_;
      _loc4_ *= _loc8_;
      var _loc13_ = undefined;
      var _loc12_ = undefined;
      var _loc7_ = Math.abs(_global.Cmr.wree * _global.Cmr.Zoom / _loc5_);
      var _loc6_ = Math.abs(_global.Cmr.hree * _global.Cmr.Zoom / _loc4_);
      if(_loc7_ < 1 || _loc6_ < 1)
      {
         if(Math.abs(_loc7_) < Math.abs(_loc6_))
         {
            _loc13_ = _loc5_ * _loc7_;
            _loc12_ = (- _loc4_) * _loc7_;
         }
         else
         {
            _loc13_ = _loc5_ * _loc6_;
            _loc12_ = (- _loc4_) * _loc6_;
         }
      }
      else if(_loc10_ < 0)
      {
         if(_loc5_ == 0 && _loc4_ == 0)
         {
            _loc13_ = 0;
            _loc12_ = (- _global.Cmr.hree) * _global.Cmr.Zoom;
         }
         else if(Math.abs(_loc7_) < Math.abs(_loc6_))
         {
            _loc13_ = _loc5_ * _loc7_;
            _loc12_ = (- _loc4_) * _loc7_;
         }
         else
         {
            _loc13_ = _loc5_ * _loc6_;
            _loc12_ = (- _loc4_) * _loc6_;
         }
      }
      else
      {
         _loc13_ = _loc5_;
         _loc12_ = - _loc4_;
      }
   }
   else
   {
      _loc13_ = 0;
      _loc12_ = 0;
      this.Msetx = 0;
      this.Msety = 0;
   }
   if(!isNaN(_loc13_) && !isNaN(_loc12_))
   {
      this.Msetx += (_loc13_ - this.Msetx) * 0.5;
      this.Msety += (_loc12_ - this.Msety) * 0.5;
   }
   else
   {
      trace("ctrl");
   }
   _root.cmrs[this.mst].setwill(this.Msetx,this.Msety);
}
function xunhangM()
{
   if(!(Key.isDown(KEYMAP.move_1) && Key.isDown(KEYMAP.move_2)))
   {
      if(Key.isDown(KEYMAP.move_1))
      {
         this.Msety += 0.5 * (200 - this.Msety);
         if(Math.abs(200 - this.Msety) < 1)
         {
            this.Msety = 200;
         }
      }
      else if(Key.isDown(KEYMAP.move_2))
      {
         this.Msety += 0.5 * (-200 - this.Msety);
         if(Math.abs(-200 - this.Msety) < 1)
         {
            this.Msety = -200;
         }
      }
      else
      {
         this.Msety *= 0.5;
         if(Math.abs(this.Msety) < 1)
         {
            this.Msety = 0;
         }
      }
   }
   if(!(Key.isDown(KEYMAP.move_3) && Key.isDown(KEYMAP.move_4)))
   {
      if(Key.isDown(KEYMAP.move_3))
      {
         this.Msetx += 0.5 * (-300 - this.Msetx);
         if(Math.abs(-300 - this.Msetx) < 1)
         {
            this.Msetx = -300;
         }
      }
      else if(Key.isDown(KEYMAP.move_4))
      {
         this.Msetx += 0.5 * (300 - this.Msetx);
         if(Math.abs(300 - this.Msetx) < 1)
         {
            this.Msetx = 300;
         }
      }
      else
      {
         this.Msetx *= 0.5;
         if(Math.abs(this.Msetx) < 1)
         {
            this.Msetx = 0;
         }
      }
   }
   var _loc3_ = undefined;
   if(Key.isDown(KEYMAP.move_3) && Key.isDown(KEYMAP.move_4))
   {
      _loc3_ = 0;
   }
   else if(Key.isDown(KEYMAP.move_3))
   {
      _loc3_ = -1;
   }
   else if(Key.isDown(KEYMAP.move_4))
   {
      _loc3_ = 1;
   }
   else
   {
      _loc3_ = 0;
   }
   var _loc4_ = undefined;
   if(Key.isDown(KEYMAP.move_5) && Key.isDown(KEYMAP.move_6))
   {
      _loc4_ = 0;
   }
   else if(Key.isDown(KEYMAP.move_5))
   {
      _loc4_ = 1;
   }
   else if(Key.isDown(KEYMAP.move_6))
   {
      _loc4_ = -1;
   }
   else
   {
      _loc4_ = 0;
   }
   var _loc6_ = undefined;
   var _loc5_ = undefined;
   if(Key.isDown(KEYMAP.move_f2))
   {
      _loc5_ = true;
   }
   else
   {
      _loc5_ = false;
   }
   if(Key.isDown(KEYMAP.move_f1))
   {
      _loc6_ = true;
   }
   else
   {
      _loc6_ = false;
   }
   _root.cmrs[this.mst].dopow(1,_loc3_,_loc4_,_loc5_,_loc6_);
   _root.cmrs[this.mst].setwill(this.Msetx,this.Msety);
}
function xunhangT()
{
   var _loc4_ = undefined;
   if(Key.isDown(KEYMAP.move_1) && Key.isDown(KEYMAP.move_2))
   {
      _loc4_ = 0;
   }
   else if(Key.isDown(KEYMAP.move_1))
   {
      _loc4_ = 1;
   }
   else if(Key.isDown(KEYMAP.move_2))
   {
      _loc4_ = -1;
   }
   else
   {
      _loc4_ = 0;
   }
   var _loc3_ = undefined;
   if(Key.isDown(KEYMAP.move_3) && Key.isDown(KEYMAP.move_4))
   {
      _loc3_ = 0;
   }
   else if(Key.isDown(KEYMAP.move_3))
   {
      _loc3_ = -1;
   }
   else if(Key.isDown(KEYMAP.move_4))
   {
      _loc3_ = 1;
   }
   else
   {
      _loc3_ = 0;
   }
   var _loc5_ = undefined;
   if(Key.isDown(KEYMAP.move_5) && Key.isDown(KEYMAP.move_6))
   {
      _loc5_ = 0;
   }
   else if(Key.isDown(KEYMAP.move_5))
   {
      _loc5_ = 1;
   }
   else if(Key.isDown(KEYMAP.move_6))
   {
      _loc5_ = -1;
   }
   else
   {
      _loc5_ = 0;
   }
   var _loc7_ = undefined;
   var _loc6_ = undefined;
   if(Key.isDown(KEYMAP.move_f2))
   {
      _loc6_ = true;
   }
   else
   {
      _loc6_ = false;
   }
   if(Key.isDown(KEYMAP.move_f1))
   {
      _loc7_ = true;
   }
   else
   {
      _loc7_ = false;
   }
   _root.cmrs[this.mst].dopow(_loc4_,_loc3_,_loc5_,_loc6_,_loc7_);
   if(_root.cmrs[this.mst].onkf == 0 || _root.cmrs[_root.cmrs[this.mst].fftgt] == undefined)
   {
      this.Cturnto(_root.cmrs[_root.cmrs[this.mst].tgt]);
   }
   else if(_root.cmrs[this.mst].Tran_type == 1 && _root.cmrs[this.mst].Main_type == "F")
   {
      if(_root.cmrs[_root.cmrs[this.mst].fftgt].fclss == "sboom" && _root.cmrs[this.mst].onkf == 0)
      {
         this.Cturnback(_root.cmrs[_root.cmrs[this.mst].fftgt]);
      }
      else
      {
         this.Cturnto(_root.cmrs[_root.cmrs[this.mst].fftgt]);
      }
   }
   else
   {
      this.Cturnto(_root.cmrs[_root.cmrs[this.mst].fftgt]);
   }
}
function autoST()
{
   _root.cmrs[this.mst].aotufirework = true;
   if(_root.cmrs[_root.cmrs[mst].tgt] != undefined)
   {
      if(!_root.cmrs[this.mst].dston || !_root.cmrs[this.mst].covon || _root.cmrs[_root.cmrs[mst].tgt]._zt == "broken")
      {
         var _loc11_ = null;
         var _loc4_ = Infinity;
         var _loc10_ = false;
         for(var _loc12_ in _global.UnitList)
         {
            if(_global.UnitList[_loc12_]._sc > 0)
            {
               if(_global.UnitList[_loc12_]._force != _root.cmrs[this.mst]._force && _global.UnitList[_loc12_]._zt != "broken")
               {
                  var _loc6_ = distance(this.Msetx + Cmr._cw * 0.5 + _root.cmrs._x,this.Msety + Cmr._ch * 0.5 + _root.cmrs._y,_global.UnitList[_loc12_]._sx,_global.UnitList[_loc12_]._sy);
                  if(_loc6_ < 200)
                  {
                     var _loc9_ = _global.UnitList[_loc12_]._sX - _root.cmrs[mst]._sX;
                     var _loc8_ = _global.UnitList[_loc12_]._sY - _root.cmrs[mst]._sY;
                     var _loc7_ = _global.UnitList[_loc12_]._sZ - _root.cmrs[mst]._sZ;
                     var _loc5_ = _global.dist_3d(0,0,0,_loc9_,_loc8_,_loc7_);
                     if(_loc5_ < _loc4_)
                     {
                        _loc4_ = _loc5_;
                        _loc11_ = _loc12_;
                        _loc10_ = true;
                     }
                  }
               }
            }
         }
         if(!_loc10_)
         {
            for(_loc12_ in _global.SimpList)
            {
               if(_global.SimpList[_loc12_]._sc > 0)
               {
                  if(_global.SimpList[_loc12_].canlock && _global.SimpList[_loc12_]._force != _root.cmrs[this.mst]._force)
                  {
                     fd = distance(this.Msetx + Cmr._cw * 0.5 + _root.cmrs._x,this.Msety + Cmr._ch * 0.5 + _root.cmrs._y,_global.SimpList[_loc12_]._sx,_global.SimpList[_loc12_]._sy);
                     if(fd < 200)
                     {
                        _loc9_ = _global.SimpList[_loc12_]._sX - _root.cmrs[mst]._sX;
                        _loc8_ = _global.SimpList[_loc12_]._sY - _root.cmrs[mst]._sY;
                        _loc7_ = _global.SimpList[_loc12_]._sZ - _root.cmrs[mst]._sZ;
                        _loc5_ = _global.dist_3d(0,0,0,_loc9_,_loc8_,_loc7_);
                        if(_loc5_ < _loc4_)
                        {
                           _loc4_ = _loc5_;
                           _loc11_ = _loc12_;
                           _loc10_ = true;
                        }
                     }
                  }
               }
            }
         }
         if(_loc10_)
         {
            if(_root.cmrs[this.mst].tgt != _root.cmrs[this.mst].gettgt(_loc11_))
            {
               snd("lockff");
            }
         }
      }
   }
   else
   {
      _loc11_ = null;
      _loc4_ = Infinity;
      _loc10_ = false;
      for(_loc12_ in _global.UnitList)
      {
         if(_global.UnitList[_loc12_]._sc > 0)
         {
            if(_global.UnitList[_loc12_]._force != _root.cmrs[this.mst]._force && _global.UnitList[_loc12_]._zt != "broken")
            {
               fd = distance(this.Msetx + Cmr._cw * 0.5 + _root.cmrs._x,this.Msety + Cmr._ch * 0.5 + _root.cmrs._y,_global.UnitList[_loc12_]._sx,_global.UnitList[_loc12_]._sy);
               if(fd < 200)
               {
                  _loc9_ = _global.UnitList[_loc12_]._sX - _root.cmrs[mst]._sX;
                  _loc8_ = _global.UnitList[_loc12_]._sY - _root.cmrs[mst]._sY;
                  _loc7_ = _global.UnitList[_loc12_]._sZ - _root.cmrs[mst]._sZ;
                  _loc5_ = _global.dist_3d(0,0,0,_loc9_,_loc8_,_loc7_);
                  if(_loc5_ < _loc4_)
                  {
                     _loc4_ = _loc5_;
                     _loc11_ = _loc12_;
                     _loc10_ = true;
                  }
               }
            }
         }
      }
      if(!_loc10_)
      {
         for(_loc12_ in _global.SimpList)
         {
            if(_global.SimpList[_loc12_]._sc > 0)
            {
               if(_global.SimpList[_loc12_].canlock && _global.SimpList[_loc12_]._force != _root.cmrs[this.mst]._force)
               {
                  fd = distance(this.Msetx + Cmr._cw * 0.5 + _root.cmrs._x,this.Msety + Cmr._ch * 0.5 + _root.cmrs._y,_global.SimpList[_loc12_]._sx,_global.SimpList[_loc12_]._sy);
                  if(fd < 200)
                  {
                     _loc9_ = _global.SimpList[_loc12_]._sX - _root.cmrs[mst]._sX;
                     _loc8_ = _global.SimpList[_loc12_]._sY - _root.cmrs[mst]._sY;
                     _loc7_ = _global.SimpList[_loc12_]._sZ - _root.cmrs[mst]._sZ;
                     _loc5_ = _global.dist_3d(0,0,0,_loc9_,_loc8_,_loc7_);
                     if(_loc5_ < _loc4_)
                     {
                        _loc4_ = _loc5_;
                        _loc11_ = _loc12_;
                        _loc10_ = true;
                     }
                  }
               }
            }
         }
      }
      if(_loc10_)
      {
         if(_root.cmrs[this.mst].tgt != _root.cmrs[this.mst].gettgt(_loc11_))
         {
            snd("lockff");
         }
      }
   }
}
function mouseTGT()
{
   if(_root.cmrs[_root.cmrs[mst].tgt] != undefined && _root.cmrs[_root.cmrs[mst].tgt]._sc > 0)
   {
      var _loc4_ = distance(this._x,this._y,_root.cmrs[_root.cmrs[mst].tgt]._sx,_root.cmrs[_root.cmrs[mst].tgt]._sy);
      if(_loc4_ > 60 || !_root.cmrs[this.mst].dston || !_root.cmrs[this.mst].covon || _root.cmrs[_root.cmrs[mst].tgt]._zt == "broken")
      {
         var _loc12_ = null;
         var _loc5_ = Infinity;
         var _loc11_ = false;
         for(var _loc13_ in _global.UnitList)
         {
            if(_global.UnitList[_loc13_]._sc > 0)
            {
               if(_global.UnitList[_loc13_]._force != _root.cmrs[this.mst]._force && _global.UnitList[_loc13_]._zt != "broken")
               {
                  var _loc7_ = distance(this._x,this._y,_global.UnitList[_loc13_]._sx,_global.UnitList[_loc13_]._sy);
                  if(_loc7_ < 30)
                  {
                     var _loc10_ = _global.UnitList[_loc13_]._sX - _root.cmrs[mst]._sX;
                     var _loc9_ = _global.UnitList[_loc13_]._sY - _root.cmrs[mst]._sY;
                     var _loc8_ = _global.UnitList[_loc13_]._sZ - _root.cmrs[mst]._sZ;
                     var _loc6_ = _global.dist_3d(0,0,0,_loc10_,_loc9_,_loc8_);
                     if(_loc6_ < _loc5_)
                     {
                        _loc5_ = _loc6_;
                        _loc12_ = _loc13_;
                        _loc11_ = true;
                     }
                  }
               }
            }
         }
         if(!_loc11_)
         {
            for(_loc13_ in _global.SimpList)
            {
               if(_global.SimpList[_loc13_]._sc > 0)
               {
                  if(_global.SimpList[_loc13_].canlock && _global.SimpList[_loc13_]._force != _root.cmrs[this.mst]._force)
                  {
                     _loc4_ = distance(this._x,this._y,_global.SimpList[_loc13_]._sx,_global.SimpList[_loc13_]._sy);
                     if(_loc4_ < 30)
                     {
                        _loc10_ = _global.SimpList[_loc13_]._sX - _root.cmrs[mst]._sX;
                        _loc9_ = _global.SimpList[_loc13_]._sY - _root.cmrs[mst]._sY;
                        _loc8_ = _global.SimpList[_loc13_]._sZ - _root.cmrs[mst]._sZ;
                        _loc6_ = _global.dist_3d(0,0,0,_loc10_,_loc9_,_loc8_);
                        if(_loc6_ < _loc5_)
                        {
                           _loc5_ = _loc6_;
                           _loc12_ = _loc13_;
                           _loc11_ = true;
                        }
                     }
                  }
               }
            }
         }
         if(_loc11_)
         {
            if(_root.cmrs[this.mst].tgt != _root.cmrs[this.mst].gettgt(_loc12_))
            {
               snd("lockff");
            }
         }
      }
   }
   else
   {
      _loc12_ = null;
      _loc5_ = Infinity;
      _loc11_ = false;
      for(_loc13_ in _global.UnitList)
      {
         if(_global.UnitList[_loc13_]._sc > 0)
         {
            if(_global.UnitList[_loc13_]._force != _root.cmrs[this.mst]._force && _global.UnitList[_loc13_]._zt != "broken")
            {
               _loc4_ = distance(this._x,this._y,_global.UnitList[_loc13_]._sx,_global.UnitList[_loc13_]._sy);
               if(_loc4_ < 30)
               {
                  _loc10_ = _global.UnitList[_loc13_]._sX - _root.cmrs[mst]._sX;
                  _loc9_ = _global.UnitList[_loc13_]._sY - _root.cmrs[mst]._sY;
                  _loc8_ = _global.UnitList[_loc13_]._sZ - _root.cmrs[mst]._sZ;
                  _loc6_ = _global.dist_3d(0,0,0,_loc10_,_loc9_,_loc8_);
                  if(_loc6_ < _loc5_)
                  {
                     _loc5_ = _loc6_;
                     _loc12_ = _loc13_;
                     _loc11_ = true;
                  }
               }
            }
         }
      }
      if(!_loc11_)
      {
         for(_loc13_ in _global.SimpList)
         {
            if(_global.SimpList[_loc13_]._sc > 0)
            {
               if(_global.SimpList[_loc13_].canlock && _global.SimpList[_loc13_]._force != _root.cmrs[this.mst]._force)
               {
                  _loc4_ = distance(this._x,this._y,_global.SimpList[_loc13_]._sx,_global.SimpList[_loc13_]._sy);
                  if(_loc4_ < 30)
                  {
                     _loc10_ = _global.SimpList[_loc13_]._sX - _root.cmrs[mst]._sX;
                     _loc9_ = _global.SimpList[_loc13_]._sY - _root.cmrs[mst]._sY;
                     _loc8_ = _global.SimpList[_loc13_]._sZ - _root.cmrs[mst]._sZ;
                     _loc6_ = _global.dist_3d(0,0,0,_loc10_,_loc9_,_loc8_);
                     if(_loc6_ < _loc5_)
                     {
                        _loc5_ = _loc6_;
                        _loc12_ = _loc13_;
                        _loc11_ = true;
                     }
                  }
               }
            }
         }
      }
      if(_loc11_)
      {
         if(_root.cmrs[this.mst].tgt != _root.cmrs[this.mst].gettgt(_loc12_))
         {
            snd("lockff");
         }
      }
   }
}
var mst;
var onMouseHode = null;
var MHodeflg = 5;
var onMouseDhits = null;
var CModflg = 0;
var MDt = 0;
var doit = null;
var ZisDown = false;
var XisDown = false;
var switchflg = true;
var MWflg = 0;
var mouseListener = new Object();
mouseListener.onMouseWheel = null;
Mouse.addListener(mouseListener);
doint();
var mmmove = setInterval(mmove,20);
var weaponReady = 0;
var MKmod = true;
var xunhangon = false;
var Msetx = 0;
var Msety = 0;
