onClipEvent(load){
   this.hit = function()
   {
      if(this._parent.barvis._xscale > 0)
      {
         this._parent.barvis._xscale--;
      }
      _global.Cmr.VisibleLV = Math.round(0.8 * this._parent.barvis._xscale) + 5;
      snd("bthit");
   };
   this.hold = function()
   {
      if(this._parent.barvis._xscale > 0)
      {
         this._parent.barvis._xscale--;
      }
      _global.Cmr.VisibleLV = Math.round(0.8 * this._parent.barvis._xscale) + 5;
   };
}
