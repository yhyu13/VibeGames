on(release){
   _root.gameINT();
   _root.gameSave();
   _root.settgts();
   _parent.msite = "[" + _root.msmdb.length + "/" + (_root.msmdb.length + _root.bossmdb.length) + "]";
   gotoAndStop(2);
}
