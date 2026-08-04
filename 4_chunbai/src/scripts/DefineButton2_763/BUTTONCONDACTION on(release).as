on(release){
   if(_root.setMS(txt.text,_global[_parent.mslist[_parent.nowms]]))
   {
      _parent.shower.showit();
      _root.gameSave();
   }
}
