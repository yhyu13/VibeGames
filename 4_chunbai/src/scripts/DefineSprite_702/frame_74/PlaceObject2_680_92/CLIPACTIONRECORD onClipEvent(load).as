onClipEvent(load){
   if(_global.tx_wj)
   {
      this.gotoAndStop("ON");
   }
   else
   {
      this.gotoAndStop("OFF");
   }
   this.doON = function()
   {
      _global.tx_wj = true;
   };
   this.doOFF = function()
   {
      _global.tx_wj = false;
   };
}
