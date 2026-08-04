function showff(ff)
{
   if(!this.hkxsq[ff].showon && this.sff == 0)
   {
      this.hkxsq[ff].showme();
      this.sff = 2;
      this.ntfl.playit(1);
   }
}
function doit()
{
   if(_root.cmrs[mst] != undefined)
   {
      this.timer = Math.round(Battle.t / 30);
      var _loc5_ = this.timer % 10;
      var _loc6_ = this.timer % 60 - _loc5_;
      var _loc7_ = this.timer % 600 - _loc6_ - _loc5_;
      var _loc10_ = this.timer % 6000 - _loc7_ - _loc6_ - _loc5_;
      this.timer1 = _loc5_;
      this.timer2 = _loc6_ / 10;
      this.timer3 = _loc7_ / 60;
      this.timer4 = _loc10_ / 600;
      if(_root.cmrs[mst]._SP < 10000)
      {
         this.wpbar.gotoAndStop(_root.cmrs[mst].weaponFnow + 1);
      }
      else
      {
         this.wpbar.gotoAndStop(_root.cmrs[mst].weaponFnow + 5);
      }
      this.wpF1.sn = _root.cmrs[mst].weaponF1;
      this.wpF1.swit();
      this.wpF2.sn = _root.cmrs[mst].weaponF2;
      this.wpF2.swit();
      this.wpF3.sn = _root.cmrs[mst].weaponF3;
      this.wpF3.swit();
      this.wpF4.sn = _root.cmrs[mst].weaponF4;
      this.wpF4.swit();
      if(_root.cmrs[mst].weaponFnow == 4 || _root.cmrs[mst]._SP == 10000)
      {
         var _loc3_ = 1;
         while(_loc3_ <= 4)
         {
            this["wpF" + _loc3_]._x = 40 * _loc3_ - 100;
            _loc3_ = _loc3_ + 1;
         }
         this.wpF4._visible = true;
      }
      else
      {
         _loc3_ = 1;
         while(_loc3_ <= 4)
         {
            this["wpF" + _loc3_]._x = 40 * _loc3_ - 80;
            _loc3_ = _loc3_ + 1;
         }
         this.wpF4._visible = false;
      }
      if(_root.cmrs[mst]["weapon" + _root.cmrs[mst].weaponow]._zt == "loading")
      {
         this.wpbar.wpcn = "";
         this.wpbar.loadbar._x = -150 + 150 * _root.cmrs[mst]["weapon" + _root.cmrs[mst].weaponow].lnt / _root.cmrs[mst]["weapon" + _root.cmrs[mst].weaponow].lct;
         if(_root.cmrs[mst]["weapon" + _root.cmrs[mst].weaponow].ln != null)
         {
            if(_root.cmrs[mst]["weapon" + _root.cmrs[mst].weaponow].ln >= 1000)
            {
               this.wpbar.wpln = "999";
            }
            else
            {
               this.wpbar.wpln = _root.cmrs[mst]["weapon" + _root.cmrs[mst].weaponow].ln;
            }
         }
         else
         {
            this.wpbar.wpln = "";
         }
      }
      else
      {
         this.wpbar.loadbar._x = -200;
         if(_root.cmrs[mst]["weapon" + _root.cmrs[mst].weaponow].ln != null)
         {
            this.wpbar.wpcn = _root.cmrs[mst]["weapon" + _root.cmrs[mst].weaponow].cn + " / " + _root.cmrs[mst]["weapon" + _root.cmrs[mst].weaponow].maxcn;
            if(_root.cmrs[mst]["weapon" + _root.cmrs[mst].weaponow].ln >= 1000)
            {
               this.wpbar.wpln = "999";
            }
            else
            {
               this.wpbar.wpln = _root.cmrs[mst]["weapon" + _root.cmrs[mst].weaponow].ln;
            }
         }
         else
         {
            this.wpbar.wpcn = "";
            this.wpbar.wpln = "";
         }
      }
      if(_root.cmrs[mst]["weapon" + _root.cmrs[mst].weaponow].xp > 0)
      {
         var _loc9_ = _root.cmrs[mst]["weapon" + _root.cmrs[mst].weaponow].xp / _root.cmrs[mst]["weapon" + _root.cmrs[mst].weaponow].xpmax;
         if(_loc9_ == 1)
         {
            this.xpc.gotoAndStop(2);
         }
         else
         {
            this.xpc.gotoAndStop(1);
         }
         if(_loc9_ > 0.1)
         {
            this.xpc._visible = true;
         }
         this.xpc.bar._yscale = _loc9_ * 100;
      }
      else if(_root.cmrs[mst]["weapon" + _root.cmrs[mst].weaponow].xp < 0)
      {
         this.xpc.gotoAndStop(3);
         this.xpc.bar.gotoAndStop(1);
         _loc9_ = _root.cmrs[mst]["weapon" + _root.cmrs[mst].weaponow].xp / _root.cmrs[mst]["weapon" + _root.cmrs[mst].weaponow].xpmax;
         this.xpc._visible = true;
         this.xpc.bar._yscale = _loc9_ * 100;
      }
      else
      {
         this.xpc._visible = false;
      }
      if(_root.cmrs[mst].bofg == 1 && root.cmrs[mst]._zt != "broken")
      {
         _root.voice.vc("hurt" + random(3));
      }
      if(_root.cmrs[mst].atton > 0 && this.mstatton <= 0)
      {
         _root.voice.vc("att" + random(3));
      }
      this.mstatton = _root.cmrs[mst].atton;
      if(_root.cmrs[mst].hits > 1)
      {
         this.hitsinfo._visible = true;
         if(this.hitsinfo.hits != _root.cmrs[mst].hits)
         {
            this.hitsinfo.hits = _root.cmrs[mst].hits;
            this.hitsinfo.gotoAndPlay(1);
         }
      }
      else
      {
         if(this.hitsinfo.hits > 1)
         {
            _root.voice.vc("hits" + random(3));
         }
         this.hitsinfo._visible = false;
         this.hitsinfo.hits = 0;
      }
      if(_root.cmrs[mst].fpow > 0)
      {
         var _loc8_ = 1 + Math.round(5 * _root.cmrs[mst].fpow / _root.cmrs[mst].maxpow);
         if(this.power._currentframe == 1 && _loc8_ >= 2)
         {
            snd("rush");
         }
         this.power._visible = true;
         this.power.gotoAndStop(_loc8_);
      }
      else
      {
         this.power._visible = false;
      }
      if(_root.cmrs[mst].xpow != 0 || _root.cmrs[mst].ypow != 0 || _root.cmrs[mst].zpow != 0)
      {
         if(!this.flysdon)
         {
            this.flysdon = true;
            sndloop("fly");
         }
      }
      else
      {
         this.flysdon = false;
         _root.Sound_box.music_fly.stop("fly");
      }
      this._SKILL.text = _root.words_sk[_root.cmrs[mst]._Skillon];
      this.speed = Math.round(30 * _root.cmrs[mst].v._pt);
      this.mstsp = Math.floor(0.02 * _root.cmrs[mst]._SP);
      this.mstpilot = _root.cmrs[mst]._pilot;
      this.ms_info1.text = _root.cmrs[mst].$NAME;
      this.wp_info1.text = _root.cmrs[mst]["weapon" + _root.cmrs[mst].weaponow].$NAME;
      if(_root.cmrs[_root.cmrs[mst].tgt]._pilot != undefined)
      {
         this.tgtSKILL.text = _root.words_sk[_root.cmrs[_root.cmrs[mst].tgt]._Skillon];
         this.tgtsp = Math.floor(0.02 * _root.cmrs[_root.cmrs[mst].tgt]._SP);
         this.tgtpilot = _root.cmrs[_root.cmrs[mst].tgt]._pilot;
      }
      else
      {
         this.tgtSKILL.text = "";
         this.tgtsp = "";
         this.tgtpilot = "No Target";
      }
      this.mst_hp._xscale = 100 * _root.cmrs[mst]._HP / _root.cmrs[mst].maxHP;
      this.hp_text = _root.cmrs[mst].maxHP + " \\" + _root.cmrs[mst]._HP;
      if(this._hpr._xscale > this.mst_hp._xscale)
      {
         this._hpr._xscale -= 1;
      }
      else
      {
         this._hpr._xscale = this.mst_hp._xscale;
      }
      this.mst_en._xscale = 100 * _root.cmrs[mst]._EN / _root.cmrs[mst].maxEN;
      this.en_text = _root.cmrs[mst]._EN + " / " + _root.cmrs[mst].maxEN;
      this._enr._xscale = this.mst_en._xscale + 100 * _root.cmrs[mst].ENcap / _root.cmrs[mst].maxEN;
      if(_root.cmrs[mst].scmrfg > 25)
      {
         sniperHUD._visible = true;
         if(_root.cmrs[mst].scmrfg > 35)
         {
            sniperHUD.gotoAndStop(3);
         }
         else if(_root.cmrs[mst].perfectlock && _root.cmrs[mst].atton == 0)
         {
            sniperHUD.gotoAndStop(2);
         }
         else
         {
            sniperHUD.gotoAndStop(1);
         }
      }
      else
      {
         sniperHUD._visible = false;
      }
      for(var _loc4_ in this.hkxsq)
      {
         this.hkxsq[_loc4_].doit();
      }
   }
   else
   {
      _root.Sound_box.music_fly.stop("fly");
   }
}
function addtgt(msid)
{
   if(this.hkxsq[msid] == undefined)
   {
      this.rada.attachMovie("rada_tgt",msid,this.rada.getNextHighestDepth(),{_x:0.005 * _root.cmrs[msid]._cX,_y:-0.005 * _root.cmrs[msid]._cY});
      this.rada[msid].onEnterFrame = function()
      {
         if(_root.cmrs[this._name]._force != _root.cmrs[this._parent._parent.mst]._force)
         {
            this._visible = true;
            if(_root.cmrs[this._name] == undefined)
            {
               this.over = true;
            }
            else
            {
               this._x = 0.01 * _root.cmrs[this._name]._cX;
               this._y = -0.01 * _root.cmrs[this._name]._cY;
            }
         }
         else
         {
            this._visible = false;
         }
      };
      this.hkxsq.attachMovie("tgtdan",msid,this.hkxsq.getNextHighestDepth(),{_visible:false});
      this.hkxsq[msid].onEnterFrame = function()
      {
         if(_root.cmrs[this._name] == undefined)
         {
            this.removeMovieClip();
         }
      };
      this.hkxsq[msid].doit = function()
      {
         if(_root.cmrs[this._name]._force != _root.cmrs[this._parent._parent.mst]._force)
         {
            this._visible = true;
            if(_root.cmrs[this._name]._cY > 5 && _root.cmrs[this._name]._sx < Cmr._cw && _root.cmrs[this._name]._sx > 0 && _root.cmrs[this._name]._sy < Cmr._ch && _root.cmrs[this._name]._sy > 0)
            {
               this._visible = true;
               this._x = _root.cmrs[this._name]._sx - Cmr._cw * 0.5;
               this._y = _root.cmrs[this._name]._sy - Cmr._ch * 0.5;
               if(this._name == _root.cmrs[this._parent._parent.mst].tgt)
               {
                  this.main.tgt = _root.cmrs[this._name]._pilot + " " + _root.cmrs[this._name].$NAME;
                  this._hpbar._xscale = 0.1 * _root.cmrs[this._name]._HP;
                  this._hpbor._width = 0.02 * _root.cmrs[this._name].maxHP + 2;
                  this.main.dst = Math.round(_root.cmrs[this._parent._parent.mst].dst);
                  if(_root.cmrs[this._parent._parent.mst].dston)
                  {
                     this.main.txt_dst.textColor = 16711680;
                  }
                  else
                  {
                     this.main.txt_dst.textColor = 16776960;
                  }
                  if(_root.cmrs[mst].GDon && _root.cmrs[mst].scmrfg == 0)
                  {
                     this.GDlock._visible = true;
                  }
                  else
                  {
                     this.GDlock._visible = false;
                  }
                  if(_root.cmrs[this._parent._parent.mst].lockon && !sniperHUD._visible && _root.cmrs[mst]["weapon" + _root.cmrs[mst].weaponow].lockmod == 0)
                  {
                     this.gotoAndStop(2);
                  }
                  else
                  {
                     this.gotoAndStop(1);
                     if(sniperHUD._visible || _root.cmrs[this._parent._parent.mst].htime == null || _root.cmrs[this._parent._parent.mst].firectrlmode != "AUTO")
                     {
                        this.lock._visible = false;
                     }
                     else if(_root.cmrs[mst]["weapon" + _root.cmrs[mst].weaponow].lockmod == 0)
                     {
                        this.lock._visible = true;
                        this.lock._x = _root.cmrs[this._name]._sc * _root.cmrs[this._parent._parent.mst].rx;
                        this.lock._y = (- _root.cmrs[this._name]._sc) * _root.cmrs[this._parent._parent.mst].rz;
                     }
                     else
                     {
                        this.lock._visible = false;
                     }
                  }
               }
               else
               {
                  this.main.tgt = _root.cmrs[this._name]._pilot + " " + _root.cmrs[this._name].$NAME;
                  this._hpbar._xscale = 0.1 * _root.cmrs[this._name]._HP;
                  this._hpbor._width = 0.02 * _root.cmrs[this._name].maxHP + 2;
                  this.main.dst = "";
                  this.lock._visible = false;
                  this.gotoAndStop(4);
               }
            }
            else
            {
               this._visible = true;
               this.gotoAndStop(3);
               if(this._name == _root.cmrs[this._parent._parent.mst].tgt)
               {
                  if(_root.cmrs[this._parent._parent.mst].dston)
                  {
                     this.main.txt_dst.textColor = 16711680;
                  }
                  else
                  {
                     this.main.txt_dst.textColor = 16776960;
                  }
                  this.main.tgt = _root.cmrs[this._name]._pilot + " " + _root.cmrs[this._name].$NAME;
                  this._hpbar._xscale = 0.1 * _root.cmrs[this._name]._HP;
                  this._hpbor._width = 0.02 * _root.cmrs[this._name].maxHP + 2;
                  this.main.dst = Math.round(_root.cmrs[this._parent._parent.mst].dst);
                  this.jiantou.lockr._visible = true;
               }
               else
               {
                  this.main.tgt = _root.cmrs[this._name]._pilot + " " + _root.cmrs[this._name].$NAME;
                  this._hpbar._xscale = 0.1 * _root.cmrs[this._name]._HP;
                  this._hpbor._width = 0.02 * _root.cmrs[this._name].maxHP + 2;
                  this.main.dst = "";
                  this.jiantou.lockr._visible = false;
               }
               var _loc3_ = Math.atan2(- _root.cmrs[this._name]._cZ,_root.cmrs[this._name]._cX);
               this._x = 150 * Math.cos(_loc3_);
               this._y = 150 * Math.sin(_loc3_);
               this.jiantou._rotation = _loc3_ * 180 / 3.141592653589793;
            }
         }
         else
         {
            this._visible = true;
            if(_root.cmrs[this._name]._cY > 5 && _root.cmrs[this._name]._sx < Cmr._cw && _root.cmrs[this._name]._sx > 0 && _root.cmrs[this._name]._sy < Cmr._ch && _root.cmrs[this._name]._sy > 0)
            {
               this._visible = true;
               this._x = _root.cmrs[this._name]._sx - Cmr._cw * 0.5;
               this._y = _root.cmrs[this._name]._sy - Cmr._ch * 0.5;
               if(this._name == this._parent._parent.mst)
               {
                  this._visible = false;
               }
               else
               {
                  this.main.tgt = _root.cmrs[this._name]._pilot + " " + _root.cmrs[this._name].$NAME;
                  this._hpbar._xscale = 0.1 * _root.cmrs[this._name]._HP;
                  this._hpbor._width = 0.02 * _root.cmrs[this._name].maxHP + 2;
                  this.main.dst = "";
                  this.lock._visible = false;
                  this.gotoAndStop(5);
               }
            }
            else
            {
               this._visible = true;
               this.gotoAndStop(6);
               if(this._name == this._parent._parent.mst)
               {
                  this._visible = false;
               }
               else
               {
                  this.main.tgt = _root.cmrs[this._name]._pilot + " " + _root.cmrs[this._name].$NAME;
                  this._hpbar._xscale = 0.1 * _root.cmrs[this._name]._HP;
                  this._hpbor._width = 0.02 * _root.cmrs[this._name].maxHP + 2;
                  this.main.dst = "";
                  _loc3_ = Math.atan2(- _root.cmrs[this._name]._cZ,_root.cmrs[this._name]._cX);
                  this._x = 150 * Math.cos(_loc3_);
                  this._y = 150 * Math.sin(_loc3_);
                  this.jiantou._rotation = _loc3_ * 180 / 3.141592653589793;
                  if(this._name == _root.cmrs[this._parent._parent.mst].tgt)
                  {
                     this.jiantou.lockr._visible = true;
                  }
                  else
                  {
                     this.jiantou.lockr._visible = false;
                  }
               }
            }
         }
      };
   }
}
function addff(ffid)
{
   if(this.hkxsq[ffid] == undefined)
   {
      this.rada.attachMovie("rada_tgt",ffid,this.rada.getNextHighestDepth(),{_x:0.005 * _root.cmrs[ffid]._cX,_y:-0.005 * _root.cmrs[ffid]._cY});
      this.rada[ffid].onEnterFrame = function()
      {
         if(_root.cmrs[this._name]._force != _root.cmrs[this._parent._parent.mst]._force)
         {
            this._visible = true;
            if(_root.cmrs[this._name] == undefined)
            {
               this.over = true;
            }
            else
            {
               this._x = 0.01 * _root.cmrs[this._name]._cX;
               this._y = -0.01 * _root.cmrs[this._name]._cY;
            }
         }
         else
         {
            this._visible = false;
         }
      };
      if(_root.cmrs[ffid].fclss == "sboom")
      {
         this.hkxsq.attachMovie("hddan",ffid,this.hkxsq.getNextHighestDepth());
      }
      else
      {
         this.hkxsq.attachMovie("fodan",ffid,this.hkxsq.getNextHighestDepth());
      }
   }
}
var mst;
var mstatton = 0;
var sff = 0;
var flysdon = false;
