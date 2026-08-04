var skn = _global.Player.skn;
onEnterFrame = function()
{
   this._visible = this._parent["skb" + _global.Player.skn]._visible;
   this._x = this._parent["skb" + _global.Player.skn]._x;
   this._y = this._parent["skb" + _global.Player.skn]._y;
   this.sk.text = this._parent["sk" + _global.Player.skn].text;
   if(this.skn != _global.Player.skn)
   {
      this._parent.info.gotoAndStop(_global.Player.skn + 1);
      this._parent.info.t = 30;
      this._parent.info._alpha = 100;
      if(this.skn == 4 || _global.Player.skn == 4 || this.skn == 6 || _global.Player.skn == 6)
      {
         var _loc3_ = new Object();
         _loc3_ = _global[this._parent._parent.viewMS["wp" + this._parent._parent.wpinfo._currentframe]];
         if(_loc3_.ftype == "fds" || _loc3_.ftype == "fd" || _loc3_.ftype == "fy" || _loc3_.ftype == "fyGD")
         {
            this._parent._parent.wpinfo.loadata();
         }
         if(_loc3_.ftype == "beam" || _loc3_.ftype == "msbeam")
         {
            this._parent._parent.wpinfo.loadata();
         }
      }
   }
   this.skn = _global.Player.skn;
};
