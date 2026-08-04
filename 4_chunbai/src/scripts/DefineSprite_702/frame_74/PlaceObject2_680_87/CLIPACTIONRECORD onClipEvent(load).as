onClipEvent(load){
   if(_global.tx_rock)
   {
      this.gotoAndStop("ON");
   }
   else
   {
      this.gotoAndStop("OFF");
   }
   this.doON = function()
   {
      _global.tx_rock = true;
   };
   this.doOFF = function()
   {
      _global.tx_rock = false;
   };
}
