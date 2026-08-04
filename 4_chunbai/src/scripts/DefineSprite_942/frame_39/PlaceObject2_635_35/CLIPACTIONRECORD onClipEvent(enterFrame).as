onClipEvent(enterFrame){
   if(_parent.TSon && this._parent.viewMS._DF2 != null)
   {
      this._xscale += 0.5 * (this._parent.viewMS._DF2 / 10 - this._xscale);
      this._parent.txt_df = this._parent.viewMS._DF2;
   }
   else
   {
      this._xscale += 0.5 * (this._parent.viewMS._DF / 10 - this._xscale);
      this._parent.txt_df = this._parent.viewMS._DF;
   }
}
