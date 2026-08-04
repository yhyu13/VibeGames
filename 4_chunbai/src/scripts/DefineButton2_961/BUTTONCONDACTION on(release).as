on(release){
   if(_root.msmdb[this._parent["ng" + this.msid] - 1] != undefined)
   {
      this._parent["ng" + this.msid]--;
      btcs["ms_" + this.msid].msdata = _root.msmdb[this._parent["ng" + this.msid]];
      this._parent["dg" + this.msid] = _global[btcs["ms_" + this.msid].msdata].$NAME;
      this._parent["dgtxt" + this.msid].textColor = 13434624;
   }
}
