var mst;
this.onEnterFrame = function()
{
   mst = this._parent.mst;
   if(_root.cmrs[this._parent.mst].AI == undefined)
   {
      this._parent.Daglist._visible = false;
   }
   else
   {
      this._parent.Daglist._visible = true;
   }
   if(_parent.sniperHUD._visible || _root.cmrs[this._parent.mst].GDon || _root.cmrs[this._parent.mst].scmrfg != 0)
   {
      this._visible = false;
      this.gotoAndStop(2);
   }
   else
   {
      this._x = _root.cmrs[this._parent.mst].ctrl_x;
      this._y = _root.cmrs[this._parent.mst].ctrl_y;
      if(_root.cmrs[this.mst].firectrlmode == "AUTO")
      {
         if(_root.cmrs[this.mst]["weapon" + _root.cmrs[this.mst].weaponow].lockmod == 0)
         {
            this.gotoAndStop(3);
         }
         else if(_root.cmrs[this.mst]["weapon" + _root.cmrs[this.mst].weaponow].lockmod == 1)
         {
            this.gotoAndStop(4);
         }
         else
         {
            this.gotoAndStop(5);
         }
      }
      else if(_root.cmrs[this.mst].firectrlmode == "MANUAL")
      {
         if(_root.cmrs[this.mst]["weapon" + _root.cmrs[this.mst].weaponow].lockmod == 3)
         {
            this.gotoAndStop(5);
         }
         else
         {
            this.gotoAndStop(2);
         }
      }
      this._visible = true;
   }
};
