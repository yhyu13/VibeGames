function gameINT()
{
   _root.msdbint();
   _global.Player.ID = null;
   _global.Player.winBT = 0;
   _global.Player.lostBT = 0;
   _global.Player.JX = 0;
   _global.MSdata = "";
}
function playerNEW(id)
{
   _root.gameINT();
   _global.Player.ID = id;
}
function traceJX(i)
{
   if(i == 7)
   {
      return "上校";
   }
   if(i == 6)
   {
      return "中校";
   }
   if(i == 5)
   {
      return "少校";
   }
   if(i == 4)
   {
      return "上尉";
   }
   if(i == 3)
   {
      return "中尉";
   }
   if(i == 2)
   {
      return "少尉";
   }
   if(i == 1)
   {
      return "杂兵";
   }
   if(i == 0)
   {
      return "新兵";
   }
   return null;
}
function getJX()
{
   var _loc2_ = undefined;
   if(Player.winBT <= 0)
   {
      _loc2_ = 0;
   }
   else
   {
      _loc2_ = Math.round(Player.winBT / (Player.winBT + Player.lostBT) * 100);
   }
   var _loc3_ = _root.msmdb.length + 0.1 * _loc2_ - 11;
   if(_loc3_ > 5 && _loc2_ >= 80)
   {
      return 7;
   }
   if(_loc3_ > 4 && _loc2_ >= 70)
   {
      return 6;
   }
   if(_loc3_ > 3 && _loc2_ >= 60)
   {
      return 5;
   }
   if(_loc3_ > 2 && _loc2_ >= 50)
   {
      return 4;
   }
   if(_loc3_ > 1 && _loc2_ >= 40)
   {
      return 3;
   }
   if(_loc3_ > 0 && _loc2_ >= 30)
   {
      return 2;
   }
   if(_root.msmdb.length > 1)
   {
      return 1;
   }
   return 0;
}
function settgts()
{
   this.passtgt = 0;
   this.tgtmdb = new Array();
   var _loc5_ = 0;
   var _loc4_ = 1;
   while(_loc4_ <= _root.msmdb.length - 1)
   {
      if(_global[_root.msmdb[_loc4_]] != undefined)
      {
         this.tgtmdb[_loc5_] = _root.msmdb[_loc4_];
         _loc5_ = _loc5_ + 1;
      }
      _loc4_ = _loc4_ + 1;
   }
}
var words_fna = new Array();
this.words_fna[0] = "赵";
this.words_fna[1] = "钱";
this.words_fna[2] = "孙";
this.words_fna[3] = "李";
this.words_fna[4] = "周";
this.words_fna[5] = "吴";
this.words_fna[6] = "郑";
this.words_fna[7] = "王";
this.words_fna[8] = "孔";
this.words_fna[9] = "于";
this.words_fna[10] = "马";
this.words_fna[11] = "张";
this.words_fna[12] = "郭";
var words_na = new Array();
this.words_na[0] = "刚";
this.words_na[1] = "盾";
this.words_na[2] = "哥";
this.words_na[3] = "锁";
this.words_na[4] = "仓";
this.words_na[5] = "蛋";
this.words_na[6] = "熊";
this.words_na[7] = "庄";
this.words_na[8] = "姐";
this.words_na[9] = "修";
this.words_na[10] = "铁";
this.words_na[11] = "发";
this.words_na[12] = "醒";
var words_sk = new Array();
this.words_sk[0] = "";
this.words_sk[1] = "◇";
this.words_sk[2] = "¶";
this.words_sk[3] = "㈩";
this.words_sk[4] = "▥";
this.words_sk[5] = "♣";
this.words_sk[6] = "☀";
this.words_sk[7] = "▽";
this.words_sk[8] = "☢";
this.words_sk[9] = "♨";
this.words_sk[10] = "◆";
this.words_sk[11] = "☆";
this.words_sk[12] = "★";
_global.Player = new Object();
_global.Player.skn = 1;
var passtgt = 0;
var tgtmdb = new Array();
gameINT();
gameLoad();
var q = 0;
while(q <= 20)
{
   this.randomMS(q);
   q++;
}
if(MSdata != "" && MSdata != null)
{
   _root.setMS(MSdata,_global.phix_0);
}
else
{
   _global.MSdata = _global.phix_0.dataStr;
   _root.setMS(MSdata,_global.phix_0);
}
var xjx = getJX();
if(xjx > _global.Player.JX)
{
   _global.Player.JX = xjx;
}
delete xjx;
var i = 0;
while(i <= _root.msmdb.length - 1)
{
   if(_global[_root.msmdb[i]] == undefined)
   {
      _root.msmdb.splice(i,1);
   }
   i++;
}
var j = 0;
while(j <= _root.bossmdb.length - 1)
{
   if(_global[_root.bossmdb[j]] == undefined)
   {
      _root.bossmdb.splice(j,1);
   }
   j++;
}
if(_root.msmdb.length < 1)
{
   _root.msdbint();
}
settgts();
_global.jlv = 0;
