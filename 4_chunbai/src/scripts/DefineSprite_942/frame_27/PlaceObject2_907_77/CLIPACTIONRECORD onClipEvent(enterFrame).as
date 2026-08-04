onClipEvent(enterFrame){
   this.i = 10 * (this._parent.nowpage - 1) + this.n;
   if(i <= this._parent.mslist.length - 1)
   {
      if(i == this._parent.nowms)
      {
         this.gotoAndStop(2);
      }
      else
      {
         this.gotoAndStop(1);
      }
      this.$type = _global[this._parent.mslist[i]].$TYPE;
      this.$name = _global[this._parent.mslist[i]].$NAME;
   }
   else if(i <= _root.msmdb.length + _root.bossmdb.length - 1)
   {
      this.gotoAndStop(3);
      this.$type = _global[_root.bossmdb[i - this._parent.mslist.length]].$TYPE;
      this.$name = _global[_root.bossmdb[i - this._parent.mslist.length]].$NAME;
   }
   else
   {
      this.gotoAndStop(4);
   }
}
