function showme()
{
   showon = true;
   this.gotoAndStop(2);
}
function doit()
{
   if(_root.cmrs[this._name]._cY > 5 && _root.cmrs[this._name]._sx < Cmr._cw && _root.cmrs[this._name]._sx > 0 && _root.cmrs[this._name]._sy < Cmr._ch && _root.cmrs[this._name]._sy > 0)
   {
      this._x = _root.cmrs[this._name]._sx - Cmr._cw * 0.5;
      this._y = _root.cmrs[this._name]._sy - Cmr._ch * 0.5;
      this.main._visible = true;
      this.jiantou._visible = false;
      this.jiantou2._visible = true;
   }
   else
   {
      var _loc3_ = Math.atan2(- _root.cmrs[this._name]._cZ,_root.cmrs[this._name]._cX);
      this._x = 150 * Math.cos(_loc3_);
      this._y = 150 * Math.sin(_loc3_);
      this.jiantou._rotation = _loc3_ * 180 / 3.141592653589793;
      this.main._visible = false;
      this.jiantou._visible = true;
      this.jiantou2._visible = false;
   }
}
stop();
this.main._visible = false;
this.jiantou._visible = false;
this.jiantou2._visible = false;
onEnterFrame = function()
{
   if(!stopAll)
   {
      if(_root.cmrs[this._name] == undefined)
      {
         this.removeMovieClip();
      }
   }
};
var showon = false;
