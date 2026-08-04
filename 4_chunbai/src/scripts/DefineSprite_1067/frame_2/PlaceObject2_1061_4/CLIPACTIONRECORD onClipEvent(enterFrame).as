onClipEvent(enterFrame){
   if(_root.cmrs[this._parent._parent.mst]["weapon" + this._parent.sn]._zt != "nor")
   {
      this.gotoAndStop(3);
   }
   else if(_root.cmrs[this._parent._parent.mst].weaponCD > 3)
   {
      this.gotoAndStop(2);
   }
   else
   {
      this.gotoAndStop(1);
   }
}
