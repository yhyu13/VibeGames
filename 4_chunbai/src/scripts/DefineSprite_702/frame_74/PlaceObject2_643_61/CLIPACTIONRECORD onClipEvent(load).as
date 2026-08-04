onClipEvent(load){
   this.hit = function()
   {
      if(this._parent.bar111._xscale > 0)
      {
         this._parent.bar111._xscale--;
      }
      _root.vocVol = this._parent.bar111._xscale;
      _root.VoiceS.setVolume(_root.vocVol);
      snd("bthit");
   };
   this.hold = function()
   {
      if(this._parent.bar111._xscale > 0)
      {
         this._parent.bar111._xscale--;
      }
      _root.vocVol = this._parent.bar111._xscale;
      _root.VoiceS.setVolume(_root.vocVol);
   };
}
