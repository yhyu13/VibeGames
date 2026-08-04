onClipEvent(load){
   this.hit = function()
   {
      if(this._parent.bar11._xscale > 0)
      {
         this._parent.bar11._xscale--;
      }
      _root.sndVol = this._parent.bar11._xscale;
      _root.SoundS.setVolume(_root.bgmVol);
      snd("bthit");
   };
   this.hold = function()
   {
      if(this._parent.bar11._xscale > 0)
      {
         this._parent.bar11._xscale--;
      }
      _root.sndVol = this._parent.bar11._xscale;
      _root.SoundS.setVolume(_root.bgmVol);
   };
}
