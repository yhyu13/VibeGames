onClipEvent(load){
   if(this._parent.viewMS._type == "TMA" && !this._parent.TSon || this._parent.viewMS._type == "TMS" && this._parent.TSon)
   {
      if(this._parent.viewMS.coreUnit != null)
      {
         this.mk.gotoAndStop(1);
      }
      else
      {
         this.mk.gotoAndStop(2);
      }
      this.gotoAndStop("M2");
   }
   else if(this._parent.viewMS._type == "TMS" && !this._parent.TSon || this._parent.viewMS._type == "TMA" && this._parent.TSon)
   {
      if(this._parent.viewMS.coreUnit != null)
      {
         this.mk.gotoAndStop(1);
      }
      else
      {
         this.mk.gotoAndStop(2);
      }
      this.gotoAndStop("M1");
   }
   else
   {
      if(this._parent.viewMS.coreUnit != null)
      {
         this.mk.gotoAndStop(3);
      }
      else
      {
         this.mk.gotoAndStop(4);
      }
      this.gotoAndStop("M0");
   }
   if(_parent.viewMS._protype != _global[_global.Player.MS]._protype)
   {
      this.btM0._visible = true;
   }
   else
   {
      this.btM0._visible = false;
   }
   this.doM1 = function()
   {
      this._parent.TSon = !this._parent.TSon;
      this.gotoAndStop("M1");
      this._parent.shower.showit();
   };
   this.doM2 = function()
   {
      this._parent.TSon = !this._parent.TSon;
      this.gotoAndStop("M2");
      this._parent.shower.showit();
   };
   this.doM3 = function()
   {
      this._parent.viewMS = _global[this._parent.viewMS.coreUnit];
      this._parent.TSon = false;
      this._parent.shower.showit();
   };
   this.doM0 = function()
   {
      this._parent.viewMS = _global[_global.Player.MS];
      this._parent.TSon = false;
      this._parent.shower.showit();
   };
}
