on(release){
   if(this.e2 == "Mission Complete")
   {
      _root.gotoAndStop("ready");
   }
   else
   {
      _root.gotoAndStop("replay");
   }
}
