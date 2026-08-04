onClipEvent(load){
   this.gotoAndStop("OFF");
   if(_global.autoQUA)
   {
      this.gotoAndStop("AUTO");
   }
   else if(_global.jumpFrame)
   {
      this.gotoAndStop("ON");
   }
   else
   {
      this.gotoAndStop("OFF");
   }
   this.doON = function()
   {
      _global.jumpFrame = true;
      _global.Cmr.isShow = 1;
      _global.autoQUA = false;
   };
   this.doOFF = function()
   {
      _global.jumpFrame = false;
      _global.Cmr.isShow = 0;
      _global.autoQUA = false;
   };
   this.doAUTO = function()
   {
      _global.autoQUA = true;
      _global.jumpFrame = false;
      _global.Cmr.isShow = 0;
   };
}
