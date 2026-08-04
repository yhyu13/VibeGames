onClipEvent(load){
   this.hit = function()
   {
      if(this._parent.bar11._xscale < 100)
      {
         this._parent.bar11._xscale = this._parent.bar11._xscale + 1;
      }
      _root.sndVol = this._parent.bar11._xscale;
      _root.SoundS.setVolume(_root.sndVol);
      snd("bthit");
   };
   this.hold = function()
   {
      if(this._parent.bar11._xscale < 100)
      {
         this._parent.bar11._xscale = this._parent.bar11._xscale + 1;
      }
      _root.sndVol = this._parent.bar11._xscale;
      _root.SoundS.setVolume(_root.sndVol);
   };
}
