onClipEvent(load){
   this.hit = function()
   {
      if(this._parent.bar111._xscale < 100)
      {
         this._parent.bar111._xscale = this._parent.bar111._xscale + 1;
      }
      _root.vocVol = this._parent.bar111._xscale;
      _root.VoiceS.setVolume(_root.vocVol);
      snd("bthit");
   };
   this.hold = function()
   {
      if(this._parent.bar111._xscale < 100)
      {
         this._parent.bar111._xscale = this._parent.bar111._xscale + 1;
      }
      _root.vocVol = this._parent.bar111._xscale;
      _root.VoiceS.setVolume(_root.vocVol);
   };
}
