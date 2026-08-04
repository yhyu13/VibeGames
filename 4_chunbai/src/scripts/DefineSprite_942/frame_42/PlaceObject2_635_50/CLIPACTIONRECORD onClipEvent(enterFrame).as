onClipEvent(enterFrame){
   if(_parent.TSon && this._parent.viewMS.turnlv2 != null)
   {
      this._xscale += 0.5 * (this._parent.viewMS.turnlv2 - this._xscale);
      this._parent.txt_turn = this._parent.viewMS.turnlv2;
   }
   else
   {
      this._xscale += 0.5 * (this._parent.viewMS.turnlv - this._xscale);
      this._parent.txt_turn = this._parent.viewMS.turnlv;
   }
}
