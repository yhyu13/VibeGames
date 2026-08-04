ctrl.doint();
onEnterFrame = null;
_global.Cmr._sX = 0;
_global.Cmr._sY = 0;
_global.Cmr._sZ = 0;
_global.Cmr._sH = 0;
_global.Cmr._sW = 0;
_global.Cmr._sR = 0;
_global.Player.lostBT = _global.Player.lostBT + 1;
_global.btcs = new Object();
var endBattle = false;
var ctgt;
var ctgtf;
if(_root.tgtmdb.length >= 1 && this.passtgt <= 5)
{
   if(_root.bossmdb.length == 0)
   {
      xmb._._visible = true;
   }
   else
   {
      xmb._visible = false;
   }
   btcs.$NAME = "test";
   btcs.Task = "onevsone";
   btcs.ms_1 = new Object();
   btcs.ms_1 = {_force:1,skn:_global.Player.skn,msPILOT:_global.Player.ID,msdata:_global.Player.MS,ctrlmode:"player",_lv:9,_bX:0,_bY:-6000,_bZ:-10};
   this.ctgt = random(_root.tgtmdb.length);
   this.ctgtf = this.ctgt;
   btcs.ms_2 = new Object();
   var fn = random(13);
   var na = random(13);
   btcs.ms_2 = {_force:2,skn:na,msPILOT:_root.words_fna[fn] + _root.words_na[na],msdata:_root.tgtmdb[ctgt],ctrlmode:"ai",_lv:jlv,_bX:0 + random(100),_bY:6000,_bZ:-50 + random(100)};
   if((_root.tgtmdb.length == 1 || this.passtgt == 5) && _root.bossmdb.length == 0)
   {
      endBattle = true;
   }
}
else
{
   xmb._visible = false;
   btcs.$NAME = "test";
   btcs.Task = "onevsone";
   btcs.ms_1 = new Object();
   btcs.ms_1 = {_force:1,skn:_global.Player.skn,msPILOT:_global.Player.ID,msdata:_global.Player.MS,ctrlmode:"player",_lv:9,_bX:0,_bY:-6000,_bZ:-10};
   btcs.ms_2 = new Object();
   var fn = random(13);
   var na = random(13);
   btcs.ms_2 = {_force:2,skn:na,msPILOT:_root.words_fna[fn] + _root.words_na[na],msdata:_root.bossmdb[0],ctrlmode:"ai",_lv:jlv,_bX:0,_bY:6000,_bZ:-10};
   endBattle = true;
}
_root.gameSave();
