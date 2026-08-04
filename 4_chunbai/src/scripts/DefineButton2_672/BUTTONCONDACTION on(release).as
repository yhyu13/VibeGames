on(release){
   if(this.t < 9)
   {
      this.t = this.t + 1;
      gotoAndStop(2);
   }
   else
   {
      this.t = 0;
      snd("gjk");
      _root.msdbmax();
      _root.gameSave();
      _root.settgts();
      _parent.msite = "[" + _root.msmdb.length + "/" + (_root.msmdb.length + _root.bossmdb.length) + "]";
      gotoAndStop(2);
   }
}
