onClipEvent(load){
   this.hit = function()
   {
      if(this._parent.barvis._xscale < 100)
      {
         this._parent.barvis._xscale = this._parent.barvis._xscale + 1;
      }
      _global.Cmr.VisibleLV = Math.round(0.8 * this._parent.barvis._xscale) + 5;
      snd("bthit");
   };
   this.hold = function()
   {
      if(this._parent.barvis._xscale < 100)
      {
         this._parent.barvis._xscale = this._parent.barvis._xscale + 1;
      }
      _global.Cmr.VisibleLV = Math.round(0.8 * this._parent.barvis._xscale) + 5;
   };
}
