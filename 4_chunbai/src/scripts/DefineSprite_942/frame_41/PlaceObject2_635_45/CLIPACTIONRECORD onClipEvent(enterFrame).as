onClipEvent(enterFrame){
   if(_parent.TSon && this._parent.viewMS.subpowlv2 != null)
   {
      this._xscale += 0.5 * (this._parent.viewMS.subpowlv2 - this._xscale);
      this._parent.txt_pow = this._parent.viewMS.subpowlv2;
   }
   else
   {
      this._xscale += 0.5 * (this._parent.viewMS.subpowlv - this._xscale);
      this._parent.txt_pow = this._parent.viewMS.subpowlv;
   }
}
