if(tx_rock)
{
   _root.cmrs._x = random(11) - 5;
   _root.cmrs._y = random(11) - 5;
   _root.mbj._x = _root.cmrs._x;
   _root.mbj._y = _root.cmrs._y;
   _root.jiemiam._x = Cmr._cw * 0.5 + _root.cmrs._x;
   _root.jiemiam._y = Cmr._ch * 0.5 + _root.cmrs._y;
   _root.flasher.play();
   onEnterFrame = function()
   {
      _root.cmrs._x += -1.9 * _root.cmrs._x;
      _root.cmrs._y += -1.9 * _root.cmrs._y;
      _root.mbj._x = _root.cmrs._x;
      _root.mbj._y = _root.cmrs._y;
      _root.jiemiam._x = Cmr._cw * 0.5 + _root.cmrs._x;
      _root.jiemiam._y = Cmr._ch * 0.5 + _root.cmrs._y;
   };
}
