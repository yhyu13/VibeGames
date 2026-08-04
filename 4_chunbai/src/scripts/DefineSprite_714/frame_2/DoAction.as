stop();
Key.addListener(this);
this.onKeyDown = function()
{
   if(Code2Ascii(Key.getCode()) != null)
   {
      for(var _loc4_ in _global.KEYMAP)
      {
         if(_global.KEYMAP[_loc4_] == Key.getCode())
         {
            _global.KEYMAP[_loc4_] = _global.KEYMAP[_name];
         }
      }
      _global.KEYMAP[_name] = Key.getCode();
      _root.SaveOption();
      gotoAndStop(1);
      this.onKeyDown = null;
      Key.addListener(this);
   }
};
onRelease = function()
{
   gotoAndStop(1);
};
