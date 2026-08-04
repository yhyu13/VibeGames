function Code2Ascii(Code)
{
   if(Code >= 65 && Code <= 90 || Code >= 48 && Code <= 57)
   {
      return String.fromCharCode(Code);
   }
   if(Code >= 96 && Code <= 105)
   {
      return String.fromCharCode(Code - 48);
   }
   if(Code == 106 || Code == 107 || Code == 109 || Code == 110 || Code == 101)
   {
      return String.fromCharCode(Code - 64);
   }
   if(Code == 32)
   {
      return "Spc";
   }
   if(Code == 37)
   {
      return "Lef";
   }
   if(Code == 38)
   {
      return "Up";
   }
   if(Code == 39)
   {
      return "Rig";
   }
   if(Code == 40)
   {
      return "Dow";
   }
   return null;
}
stop();
var keycode;
onEnterFrame = function()
{
   this.keyname = Code2Ascii(_global.KEYMAP[_name]);
   this.keycode = _global.KEYMAP[_name];
};
onRelease = function()
{
   for(var _loc3_ in _global.KEYMAP)
   {
      _parent[_loc3_].gotoAndStop(1);
   }
   gotoAndStop(2);
   onRelease = null;
   onEnterFrame = null;
};
