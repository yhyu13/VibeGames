onClipEvent(load){
   this.hit = function()
   {
      if(this._parent.bar1._xscale < 100)
      {
         this._parent.bar1._xscale = this._parent.bar1._xscale + 1;
      }
      _root.bgmVol = this._parent.bar1._xscale;
      _root.BgmS.setVolume(_root.bgmVol);
      snd("bthit");
   };
   this.hold = function()
   {
      if(this._parent.bar1._xscale < 100)
      {
         this._parent.bar1._xscale = this._parent.bar1._xscale + 1;
      }
      _root.bgmVol = this._parent.bar1._xscale;
      _root.BgmS.setVolume(_root.bgmVol);
   };
}
