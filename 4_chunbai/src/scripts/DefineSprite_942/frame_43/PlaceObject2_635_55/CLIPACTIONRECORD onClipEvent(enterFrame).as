onClipEvent(enterFrame){
   if(_parent.TSon && this._parent.viewMS.locklv2 != null)
   {
      this._xscale += 0.5 * (this._parent.viewMS.locklv2 - this._xscale);
      this._parent.txt_lock = this._parent.viewMS.locklv2;
   }
   else
   {
      this._xscale += 0.5 * (this._parent.viewMS.locklv - this._xscale);
      this._parent.txt_lock = this._parent.viewMS.locklv;
   }
}
