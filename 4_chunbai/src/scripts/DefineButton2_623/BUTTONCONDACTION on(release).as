on(release){
   if(this.idtxt.text != null && this.idtxt.text != "")
   {
      _root.playerNEW(this.idtxt.text);
      var q = 0;
      while(q <= 20)
      {
         _root.randomMS(q);
         q++;
      }
      _global.MSdata = _global.phix_0.dataStr;
      _root.setMS(MSdata,_global.phix_0);
      _root.gameSave();
      gotoAndStop(1);
      _root.settgts();
      _root.gotoAndStop("firstplay");
   }
}
