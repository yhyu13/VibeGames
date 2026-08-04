if(_root.cmrs[this._parent.mst].weaponhold)
{
   gotoAndStop("lop4");
   play();
}
else if(_root.cmrs[this._parent.mst]["weapon" + _root.cmrs[this._parent.mst].weaponow]._zt != "nor")
{
   gotoAndStop("lop3");
   play();
}
else if(_root.cmrs[this._parent.mst].lockon)
{
   _root.music_du.start(0,999);
   gotoAndStop("lop2");
   play();
}
else
{
   snd("bit");
   gotoAndStop("lop1");
   play();
}
