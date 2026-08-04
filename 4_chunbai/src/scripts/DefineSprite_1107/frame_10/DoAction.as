if(_root.cmrs[this._parent.mst].weaponhold)
{
   gotoAndStop("lop4");
   play();
}
else if(_root.cmrs[this._parent.mst]["weapon" + _root.cmrs[this._parent.mst].weaponow]._zt != "nor")
{
   _root.Sound_box.music_du.stop("du");
   gotoAndStop("lop3");
   play();
   _root.voice.vc("cannot");
}
else if(_root.cmrs[this._parent.mst].lockon)
{
   gotoAndStop("lop2");
   play();
}
else
{
   snd("bit");
   _root.Sound_box.music_du.stop("du");
   gotoAndStop("lop1");
   play();
}
