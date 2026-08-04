onClipEvent(load){
   if(_global.tx_liz)
   {
      this.gotoAndStop("ON");
   }
   else
   {
      this.gotoAndStop("OFF");
   }
   this.doON = function()
   {
      _global.tx_liz = true;
   };
   this.doOFF = function()
   {
      _global.tx_liz = false;
   };
}
