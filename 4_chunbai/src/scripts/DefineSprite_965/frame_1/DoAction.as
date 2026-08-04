function playit()
{
   if(this.msid % 2 == 1)
   {
      if(this.nc == 1)
      {
         this.gotoAndStop(2);
         var _loc5_ = random(13);
         var _loc4_ = random(13);
         btcs["ms_" + msid] = {_force:1,skn:_loc4_,msPILOT:_root.words_fna[_loc5_] + _root.words_na[_loc4_],msdata:_root.msmdb[this._parent["ng" + msid]],ctrlmode:"ai",_lv:jlv,_bX:-50 + random(100),_bY:-6000,_bZ:-50 + random(100)};
         this._parent["dg" + this.msid] = _global[btcs["ms_" + this.msid].msdata].$NAME;
      }
      if(this.nc == 2)
      {
         this.gotoAndStop(3);
         _loc5_ = random(13);
         _loc4_ = random(13);
         btcs["ms_" + msid] = {_force:2,skn:_loc4_,msPILOT:_root.words_fna[_loc5_] + _root.words_na[_loc4_],msdata:_root.msmdb[this._parent["ng" + msid]],ctrlmode:"ai",_lv:jlv,_bX:-50 + random(100),_bY:6000,_bZ:-50 + random(100)};
         this._parent["dg" + this.msid] = _global[btcs["ms_" + this.msid].msdata].$NAME;
      }
      if(this.nc == 3)
      {
         this.gotoAndStop(1);
         btcs["ms_" + msid] = null;
         this._parent["dg" + this.msid] = "";
      }
   }
   else
   {
      if(this.nc == 1)
      {
         this.gotoAndStop(3);
         _loc5_ = random(13);
         _loc4_ = random(13);
         btcs["ms_" + msid] = {_force:2,skn:_loc4_,msPILOT:_root.words_fna[_loc5_] + _root.words_na[_loc4_],msdata:_root.msmdb[this._parent["ng" + msid]],ctrlmode:"ai",_lv:jlv,_bX:-50 + random(100),_bY:6000,_bZ:-50 + random(100)};
         this._parent["dg" + this.msid] = _global[btcs["ms_" + this.msid].msdata].$NAME;
      }
      if(this.nc == 3)
      {
         this.gotoAndStop(2);
         _loc5_ = random(13);
         _loc4_ = random(13);
         btcs["ms_" + msid] = {_force:1,skn:_loc4_,msPILOT:_root.words_fna[_loc5_] + _root.words_na[_loc4_],msdata:_root.msmdb[this._parent["ng" + msid]],ctrlmode:"ai",_lv:jlv,_bX:-50 + random(100),_bY:-6000,_bZ:-50 + random(100)};
         this._parent["dg" + this.msid] = _global[btcs["ms_" + this.msid].msdata].$NAME;
      }
      if(this.nc == 2)
      {
         this.gotoAndStop(1);
         btcs["ms_" + msid] = null;
         this._parent["dg" + this.msid] = "";
      }
   }
}
var nc;
var msid;
