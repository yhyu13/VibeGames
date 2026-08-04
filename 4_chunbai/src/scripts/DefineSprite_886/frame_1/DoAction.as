function reset()
{
   var _loc2_ = 1;
   while(_loc2_ <= 12)
   {
      this["sk" + _loc2_].textColor = 3355443;
      this["skb" + _loc2_]._visible = false;
      _loc2_ = _loc2_ + 1;
   }
}
this.skm._x = this["skb" + _global.Player.skn]._x;
this.skm._y = this["skb" + _global.Player.skn]._y;
