onClipEvent(enterFrame){
   if(_root.cmrs[this._parent._parent.mst]["weapon" + (this._parent.sn - 4)]._zt != "nor")
   {
      this.gotoAndStop(3);
   }
   else if(_root.cmrs[this._parent._parent.mst]["weapon" + (this._parent.sn - 4)].t == 0 && _root.cmrs[this._parent._parent.mst].weaponCD <= 3)
   {
      this.gotoAndStop(1);
   }
   else
   {
      this.gotoAndStop(2);
   }
}
