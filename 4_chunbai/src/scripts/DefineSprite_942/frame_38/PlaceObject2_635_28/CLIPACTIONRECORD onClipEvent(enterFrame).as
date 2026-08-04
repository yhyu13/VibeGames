onClipEvent(enterFrame){
   this._xscale += 0.5 * (this._parent.viewMS.maxEN / 50 - this._xscale);
   if(this._xscale > 100)
   {
      this._xscale = 100;
   }
   this._parent.txt_en = this._parent.viewMS.maxEN;
}
