this.e1 = _global.Battle.BTdata.ms_1.msTYPE;
if(Battle.BTdata.ms_1.zt != "lost" && Battle.BTtgt == 0)
{
   _global.Player.lostBT--;
   _global.Player.winBT = _global.Player.winBT + 1;
   this.e2 = "Mission Complete";
}
else
{
   this.e2 = "Mission Fail";
}
var rat;
if(Player.winBT <= 0)
{
   rat = 0;
}
else
{
   rat = Math.round(Player.winBT / (Player.winBT + Player.lostBT) * 100);
}
var temp = "";
temp += "战斗耗时                 " + Math.round(Battle.t / 30) + "s" + "\n";
temp += "有效攻击输出             " + _global.Battle.BTdata[_global.Battle.mst].dam + "\n";
temp += "击坠                     " + _global.Battle.BTdata[_global.Battle.mst].kill + "\n";
temp += "见切                     " + _global.Battle.BTdata[_global.Battle.mst].killff + "\n";
temp += "被弹                     " + _global.Battle.BTdata[_global.Battle.mst].behits + "\n";
temp += "损伤                     " + _global.Battle.BTdata[_global.Battle.mst].broken + "%" + "\n";
temp += "战斗记录                 " + Player.winBT + "胜 " + Player.lostBT + "负  胜率" + rat + "%";
bbt1._visible = true;
bbt2._visible = false;
if(this.e2 == "Mission Complete")
{
   if(_root.endBattle)
   {
      if(_root.bossmdb.length >= 1)
      {
         var i = 0;
         while(i <= _root.bossmdb.length - 1)
         {
            if(_root.bossmdb[i] == _global.Battle.BTdata.ms_2._protype)
            {
               _root.msmdb.push(_root.bossmdb[i]);
               _root.bossmdb.splice(i,1);
               temp += "\r\r" + _global.Battle.BTdata.ms_2.msTYPE + " 入手！！！";
            }
            i++;
         }
      }
      bbt2._visible = true;
      bbt1._visible = false;
   }
   else
   {
      _root.tgtmdb.splice(_root.ctgtf,1);
      _root.passtgt = _root.passtgt + 1;
   }
}
var xjx = _root.getJX();
if(xjx > _global.Player.JX)
{
   _global.Player.JX = xjx;
   temp += "\r\r你被晋升至 " + _root.traceJX(xjx) + " !!!";
}
delete xjx;
_root.gameSave();
