onClipEvent(enterFrame){
   if(_root.cmrs[this._parent._parent.mst]["weapon" + this._parent.sn].ct >= 10)
   {
      var frm = _root.cmrs[this._parent._parent.mst]["weapon" + this._parent.sn].t / _root.cmrs[this._parent._parent.mst]["weapon" + this._parent.sn].ct;
      frm *= 360;
      if(frm <= 180)
      {
         this.cd1._rotation = 0;
         this.cd2._rotation = 180 - frm;
      }
      else
      {
         this.cd1._rotation = 180 - frm;
         this.cd2._rotation = 0;
      }
   }
   else
   {
      this.cd1._rotation = 0;
      this.cd2._rotation = 180;
   }
}
