onClipEvent(enterFrame){
   if(_root.cmrs[this._parent._parent.mst]["weapon" + this._parent.sn].ftype != undefined)
   {
      this.gotoAndStop(_root.cmrs[this._parent._parent.mst]["weapon" + this._parent.sn].ftype);
   }
}
