onClipEvent(enterFrame){
   this._xscale += 0.5 * (this._parent.viewMS.maxEN / 50 - 100 - this._xscale);
   this._visible = true;
   if(this._xscale > 100)
   {
      this._xscale = 100;
   }
   else if(this._xscale <= 0)
   {
      this._visible = false;
   }
}
