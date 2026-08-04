on(release){
   if(des(des("phixcat",unHex(ikey),0),unHex("0x" + isn),0) == "phixcat")
   {
      this.gotoAndStop("good");
      _root.UnlockSave();
   }
   else
   {
      this.gotoAndStop("bad");
   }
}
