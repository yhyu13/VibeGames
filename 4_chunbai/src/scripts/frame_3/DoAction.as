function SaveOption()
{
   var _loc3_ = SharedObject.getLocal("phix_SL097_save");
   _loc3_.data.Optsaved97 = true;
   _loc3_.data.bgmVol = _root.bgmVol;
   _loc3_.data.sndVol = _root.sndVol;
   _loc3_.data.vocVol = _root.vocVol;
   _loc3_.data.tx_liz = _global.tx_liz;
   _loc3_.data.tx_rock = _global.tx_rock;
   _loc3_.data.tx_wj = _global.tx_wj;
   _loc3_.data.autoQUA = _global.autoQUA;
   _loc3_.data.jumpFrame = _global.jumpFrame;
   _loc3_.data.VisibleLV = _global.Cmr.VisibleLV;
   _loc3_.data.BGon = _global.BGon;
   _loc3_.data.QUA = _root._quality;
   _loc3_.data.KEYMAP = _global.KEYMAP;
   _loc3_.data.Unlock = printHex(des("xima" + root.bgmVol,"xima",1));
}
function OptLoad()
{
   var _loc3_ = SharedObject.getLocal("phix_SL097_save");
   if(_loc3_.data.bgmVol != null)
   {
      _root.bgmVol = _loc3_.data.bgmVol;
   }
   if(_loc3_.data.Optsaved97 == null)
   {
      return false;
   }
   _root.bgmVol = _loc3_.data.bgmVol;
   _root.sndVol = _loc3_.data.sndVol;
   _root.vocVol = _loc3_.data.vocVol;
   _global.tx_liz = _loc3_.data.tx_liz;
   _global.tx_rock = _loc3_.data.tx_rock;
   _global.tx_wj = _loc3_.data.tx_wj;
   _global.autoQUA = _loc3_.data.autoQUA;
   _global.jumpFrame = _loc3_.data.jumpFrame;
   _global.Cmr.VisibleLV = _loc3_.data.VisibleLV;
   _global.BGon = _loc3_.data.BGon;
   _root._quality = _loc3_.data.QUA;
   for(var _loc4_ in _global.KEYMAP)
   {
      if(_loc3_.data.KEYMAP[_loc4_] != null)
      {
         _global.KEYMAP[_loc4_] = _loc3_.data.KEYMAP[_loc4_];
      }
   }
   return true;
}
function gameSave()
{
   var _loc3_ = SharedObject.getLocal("phix_SL097_save");
   _loc3_.data.saved97 = true;
   _loc3_.data.player_ID = _global.Player.ID;
   _loc3_.data.player_winBT = _global.Player.winBT;
   _loc3_.data.player_lostBT = _global.Player.lostBT;
   _loc3_.data.player_JX = _global.Player.JX;
   _loc3_.data.MSdata = _global.MSdata;
   _loc3_.data.msmdb = _root.msmdb;
}
function gameLoad()
{
   var _loc3_ = SharedObject.getLocal("phix_SL097_save");
   if(_loc3_.data.saved97 == null)
   {
      return false;
   }
   _global.Player.ID = _loc3_.data.player_ID;
   _global.Player.winBT = _loc3_.data.player_winBT;
   _global.Player.lostBT = _loc3_.data.player_lostBT;
   _global.Player.JX = _loc3_.data.player_JX;
   _global.MSdata = _loc3_.data.MSdata;
   _root.msmdb = _loc3_.data.msmdb;
   _root.msdbdebug();
   return true;
}
function clearSave()
{
   var _loc1_ = SharedObject.getLocal("phix_SL097_save");
   _loc1_.clear();
   _loc1_.flush();
   return true;
}
function islockSave()
{
   var _loc1_ = SharedObject.getLocal("phix_SL097_save");
   if(des("xima" + root.bgmVol,unHex(_loc1_.data.Unlock),0) == "xima")
   {
      return false;
   }
   return true;
}
function UnlockSave()
{
   var _loc2_ = SharedObject.getLocal("phix_SL097_save");
   _loc2_.data.Unlock = printHex(des("xima" + root.bgmVol,"xima",1));
   _loc2_.data.bgmVol = _root.bgmVol;
   _loc2_.flush();
}
