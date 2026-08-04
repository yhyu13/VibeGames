onClipEvent(enterFrame){
   if(_global[this._parent._parent.viewMS.wp1].ftype == undefined)
   {
      this.gotoAndStop(1);
   }
   else
   {
      this.gotoAndStop(_global[this._parent._parent.viewMS.wp1].ftype);
   }
}
