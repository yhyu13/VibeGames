function addtgts()
{
   for(var _loc3_ in _global.UnitList)
   {
      this.addtgt(_loc3_);
   }
}
function addtgt(msid)
{
   if(this[msid] == undefined)
   {
      this.attachMovie("unitdan",msid,this.getNextHighestDepth(),{_visible:false});
      this[msid].onEnterFrame = function()
      {
         if(_root.cmrs[this._name] == undefined || _root.jiemiam._visible || stopAll)
         {
            this.removeMovieClip();
         }
         this.doit();
      };
      this[msid].doit = function()
      {
         if(_root.cmrs[this._name]._force == 1)
         {
            if(_root.cmrs[this._name]._cY > 5 && _root.cmrs[this._name]._sx < Cmr._cw && _root.cmrs[this._name]._sx > 0 && _root.cmrs[this._name]._sy < Cmr._ch && _root.cmrs[this._name]._sy > 0)
            {
               this.gotoAndStop(1);
               this._visible = true;
               this._x = _root.cmrs[this._name]._sx - Cmr._cw * 0.5;
               this._y = _root.cmrs[this._name]._sy - Cmr._ch * 0.5;
               this.$TYPE = _root.cmrs[this._name].$TYPE;
               this._hpbar._xscale = 0.1 * _root.cmrs[this._name]._HP;
               this._hpbor._width = 0.02 * _root.cmrs[this._name].maxHP + 2;
               this.lock._visible = false;
            }
            else
            {
               this._visible = false;
            }
         }
         else if(_root.cmrs[this._name]._force == 2)
         {
            if(_root.cmrs[this._name]._cY > 5 && _root.cmrs[this._name]._sx < Cmr._cw && _root.cmrs[this._name]._sx > 0 && _root.cmrs[this._name]._sy < Cmr._ch && _root.cmrs[this._name]._sy > 0)
            {
               this.gotoAndStop(3);
               this._visible = true;
               this._x = _root.cmrs[this._name]._sx - Cmr._cw * 0.5;
               this._y = _root.cmrs[this._name]._sy - Cmr._ch * 0.5;
               this.$TYPE = _root.cmrs[this._name].$TYPE;
               this._hpbar._xscale = 0.1 * _root.cmrs[this._name]._HP;
               this._hpbor._width = 0.02 * _root.cmrs[this._name].maxHP + 2;
               this.lock._visible = false;
            }
            else
            {
               this._visible = false;
            }
         }
         else
         {
            this._visible = false;
         }
      };
   }
}
this.onEnterFrame = function()
{
   if(!_root.jiemiam._visible && !stopAll)
   {
      addtgts();
   }
};
