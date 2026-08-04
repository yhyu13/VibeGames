class clazz.battle_phix
{
   var BTdata;
   var mode2;
   var tgt;
   var $NAME = "bt";
   var mst = null;
   var t = 0;
   var axt = 0;
   var battleTask = null;
   var zdi = 0;
   var BTtgt = 0;
   var _sX = 0;
   var _sY = 0;
   var _sZ = 0;
   var _sW = 0;
   var _sH = 0;
   var _sR = 0;
   function battle_phix(battledata)
   {
      this.linkdata(battledata);
   }
   function doit()
   {
      this.battleTask();
      this.t = this.t + 1;
   }
   function linkdata(battledata)
   {
      this.$NAME = battledata.$NAME;
      this.BTdata = new Object();
      var _loc5_ = undefined;
      var _loc4_ = 1;
      while(_loc4_ <= 8)
      {
         if(battledata["ms_" + _loc4_] != null)
         {
            this.BTdata["ms_" + _loc4_] = new Object();
            this.BTdata["ms_" + _loc4_].msPILOT = battledata["ms_" + _loc4_].msPILOT;
            this.BTdata["ms_" + _loc4_].msDATA = _global[battledata["ms_" + _loc4_].msdata];
            this.BTdata["ms_" + _loc4_].msTYPE = _global[battledata["ms_" + _loc4_].msdata].$TYPE;
            this.BTdata["ms_" + _loc4_].msNAME = _global[battledata["ms_" + _loc4_].msdata].$NAME;
            this.BTdata["ms_" + _loc4_]._protype = _global[battledata["ms_" + _loc4_].msdata]._protype;
            _loc5_ = _global[battledata["ms_" + _loc4_].msdata]._type;
            this.BTdata["ms_" + _loc4_].zt = "alive";
            this.BTdata["ms_" + _loc4_].dam = 0;
            this.BTdata["ms_" + _loc4_].behits = 0;
            this.BTdata["ms_" + _loc4_].kill = 0;
            this.BTdata["ms_" + _loc4_].killff = 0;
            this.BTdata["ms_" + _loc4_].broken = 0;
            this.BTdata["ms_" + _loc4_]._bX = battledata["ms_" + _loc4_]._bX;
            this.BTdata["ms_" + _loc4_]._bY = battledata["ms_" + _loc4_]._bY;
            this.BTdata["ms_" + _loc4_]._bZ = battledata["ms_" + _loc4_]._bZ;
            if(_loc5_ == "SC")
            {
               _root.cmrs.attachMovie("unit_craft","ms_" + _loc4_,_root.cmrs.getNextHighestDepth(),{_sX:this.BTdata["ms_" + _loc4_]._bX,_sY:this.BTdata["ms_" + _loc4_]._bY,_sZ:this.BTdata["ms_" + _loc4_]._bZ,_sW:0});
            }
            else
            {
               _root.cmrs.attachMovie("unit_ms","ms_" + _loc4_,_root.cmrs.getNextHighestDepth(),{_sX:this.BTdata["ms_" + _loc4_]._bX,_sY:this.BTdata["ms_" + _loc4_]._bY,_sZ:this.BTdata["ms_" + _loc4_]._bZ,_sW:0});
            }
            _root.cmrs["ms_" + _loc4_]._Skill = battledata["ms_" + _loc4_].skn;
            _root.cmrs["ms_" + _loc4_].linkdata(this.BTdata["ms_" + _loc4_].msDATA);
            _root.cmrs["ms_" + _loc4_]._pilot = this.BTdata["ms_" + _loc4_].msPILOT;
            _root.cmrs["ms_" + _loc4_]._lv = battledata["ms_" + _loc4_]._lv;
            _root.cmrs["ms_" + _loc4_].ctrlmode = battledata["ms_" + _loc4_].ctrlmode;
            if(battledata["ms_" + _loc4_].ctrlmode == "player")
            {
               this.mst = "ms_" + _loc4_;
               _root.ctrl.mst = "ms_" + _loc4_;
               _root.jiemiam.mst = "ms_" + _loc4_;
               _root.jiemiam._visible = true;
               _root.cmrs["ms_" + _loc4_]._Skill = _global.Player.skn;
            }
            else if(_loc5_ == "SC")
            {
               _root.cmrs["ms_" + _loc4_].AI = new clazz.AIcraft_phix("ms_" + _loc4_);
            }
            else
            {
               _root.cmrs["ms_" + _loc4_].AI = new clazz.AI_phix("ms_" + _loc4_);
            }
            this.BTdata["ms_" + _loc4_]._force = battledata["ms_" + _loc4_]._force;
            if(this.BTdata["ms_" + _loc4_]._force == 2)
            {
               this.BTtgt = this.BTtgt + 1;
            }
            _root.cmrs["ms_" + _loc4_]._force = battledata["ms_" + _loc4_]._force;
         }
         _loc4_ = _loc4_ + 1;
      }
      this.battleTask = function()
      {
         this[battledata.Task]();
      };
      if(this.mst == null)
      {
         _root.ctrl.mst = "ms_1";
         _root.jiemiam.mst = "ms_1";
         _root.jiemiam._visible = true;
         _root.ctrl.selectmode(3);
      }
      else
      {
         _root.ctrl.selectmode(1);
      }
   }
   function battlestart()
   {
      _root.onEnterFrame = function()
      {
         if(_root.ztbar._currentframe == 2)
         {
            _global.stopAll = true;
         }
         else
         {
            _global.stopAll = false;
         }
         if(!_global.stopAll)
         {
            _global.Battle.doit();
            _root.ctrl.doit();
            for(var _loc4_ in _global.UnitList)
            {
               _global.UnitList[_loc4_].AI.doit();
            }
            _global.Cmr.shows();
            for(_loc4_ in _global.UnitList)
            {
               _global.UnitList[_loc4_].mainsys();
            }
            _global.Cmr.moveandroat();
            _root.jiemiam.doit();
            _global.Battle._sX = 0;
            _global.Battle._sY = 0;
            _global.Battle._sZ = 0;
            var _loc3_ = 0;
            for(_loc4_ in _global.UnitList)
            {
               _global.UnitList[_loc4_].firectrl();
               _global.Battle._sX += _global.UnitList[_loc4_]._sX;
               _global.Battle._sY += _global.UnitList[_loc4_]._sY;
               _global.Battle._sZ += _global.UnitList[_loc4_]._sZ;
               _loc3_ = _loc3_ + 1;
            }
            if(_loc3_ > 0)
            {
               _global.Battle._sX /= _loc3_;
               _global.Battle._sY /= _loc3_;
               _global.Battle._sZ /= _loc3_;
            }
            else
            {
               _global.Battle._sX = 0;
               _global.Battle._sY = 0;
               _global.Battle._sZ = 0;
            }
         }
         else
         {
            _root.ctrl.doit();
            _global.Cmr.shows();
            _global.Cmr.moveandroat();
         }
      };
   }
   function battleover()
   {
      if(this.mst != null)
      {
         if(this.BTdata[this.mst].zt != "lost")
         {
            stopAllSounds();
            _root.gotoAndStop("return");
            _root.onEnterFrame = null;
         }
         else
         {
            _root.jiemiam._visible = true;
            _root.jiemiam.attachMovie("sysdown","sysdowna",_root.jiemiam.getNextHighestDepth(),{_y:50});
            _global.Cmr.moveandroat = function()
            {
               this.mode2(_global.Battle,100,15000);
            };
         }
      }
      else
      {
         _root.gotoAndStop("home");
      }
   }
   function mslost(msid)
   {
      if(_global.Cmr.tgt == msid)
      {
         _root.flasher.play();
         _global.bgm(0);
         _root.Sound_box.music_fly.stop("fly");
         _root.ctrl.selectmode(0);
         _global.Cmr.moveandroat = function()
         {
            this.mode2(_root.cmrs[this.tgt],200,500);
         };
      }
      if(_root.cmrs[msid]._force == 2)
      {
         this.BTtgt = this.BTtgt - 1;
      }
      if(this.BTtgt == 0 || this.mst == msid)
      {
         this.axt = this.t;
         this.battleTask = function()
         {
            if(this.t > 160 + this.axt)
            {
               this.battleover();
               this.battleTask = null;
            }
         };
      }
      this.BTdata[msid].zt = "lost";
   }
   function onevsone()
   {
      if(this.t >= 8100)
      {
         if(_root.jiemiam.timeovera == undefined)
         {
            _root.jiemiam.attachMovie("timeover","timeovera",_root.jiemiam.getNextHighestDepth(),{_x:200,_y:-230});
         }
         _root.jiemiam.timeovera.lst = Math.round((9000 - this.t) / 30);
      }
      if(this.t >= 9000)
      {
         this.battleover();
         this.battleTask = null;
      }
   }
}
