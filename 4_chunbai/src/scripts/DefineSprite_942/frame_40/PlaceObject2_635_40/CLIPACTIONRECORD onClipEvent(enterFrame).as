onClipEvent(enterFrame){
   if(_parent.TSon && this._parent.viewMS.speedlv2 != null)
   {
      this._xscale += 0.5 * (this._parent.viewMS.speedlv2 - this._xscale);
      this._parent.txt_speed = this._parent.viewMS.speedlv2;
   }
   else
   {
      this._xscale += 0.5 * (this._parent.viewMS.speedlv - this._xscale);
      this._parent.txt_speed = this._parent.viewMS.speedlv;
   }
}
